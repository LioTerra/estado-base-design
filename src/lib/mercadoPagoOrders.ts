const MERCADO_PAGO_ORDERS_URL = "https://api.mercadopago.com/v1/orders";
const COURSE_AMOUNT = "979.00";

type Identification = {
  type: string;
  number: string;
};

type Payer = {
  email: string;
  firstName?: string;
  lastName?: string;
  identification?: Identification;
  address?: {
    zipCode: string;
    streetName: string;
    streetNumber: string;
    neighborhood: string;
    city: string;
    state: string;
  };
};

type CardOrderRequest = {
  paymentType: "card";
  paymentMethodId: string;
  paymentMethodType: "credit_card" | "debit_card";
  token: string;
  installments: number;
  payer: Payer & { identification: Identification };
};

type PixOrderRequest = {
  paymentType: "pix";
  payer: Payer;
};

type BoletoOrderRequest = {
  paymentType: "boleto";
  payer: Payer & {
    firstName: string;
    lastName: string;
    identification: Identification;
    address: NonNullable<Payer["address"]>;
  };
};

type OrderRequest = CardOrderRequest | PixOrderRequest | BoletoOrderRequest;

type MercadoPagoPaymentMethod = {
  id?: string;
  type?: string;
  ticket_url?: string;
  qr_code?: string;
  qr_code_base64?: string;
  digitable_line?: string;
};

type MercadoPagoOrder = {
  id?: string;
  status?: string;
  status_detail?: string;
  message?: string;
  transactions?: {
    payments?: Array<{
      status?: string;
      status_detail?: string;
      payment_method?: MercadoPagoPaymentMethod;
    }>;
  };
};

function clean(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function digits(value: unknown) {
  return clean(value).replace(/\D/g, "");
}

function parsePayer(value: unknown): Payer {
  const payer = value && typeof value === "object" ? (value as Record<string, unknown>) : {};
  const identification =
    payer.identification && typeof payer.identification === "object"
      ? (payer.identification as Record<string, unknown>)
      : {};
  const address =
    payer.address && typeof payer.address === "object"
      ? (payer.address as Record<string, unknown>)
      : {};

  return {
    email: clean(payer.email).toLowerCase(),
    firstName: clean(payer.firstName),
    lastName: clean(payer.lastName),
    identification: {
      type: clean(identification.type) || "CPF",
      number: digits(identification.number),
    },
    address: {
      zipCode: digits(address.zipCode),
      streetName: clean(address.streetName),
      streetNumber: clean(address.streetNumber),
      neighborhood: clean(address.neighborhood),
      city: clean(address.city),
      state: clean(address.state).toUpperCase(),
    },
  };
}

function parseOrderRequest(value: unknown): OrderRequest | null {
  if (!value || typeof value !== "object") return null;

  const input = value as Record<string, unknown>;
  const payer = parsePayer(input.payer);

  if (!payer.email || !payer.email.includes("@")) return null;

  if (input.paymentType === "pix") {
    return { paymentType: "pix", payer };
  }

  if (input.paymentType === "card") {
    const paymentMethodType = clean(input.paymentMethodType);
    const installments = Number(input.installments);

    if (
      !clean(input.paymentMethodId) ||
      !clean(input.token) ||
      !payer.identification?.number ||
      !["credit_card", "debit_card"].includes(paymentMethodType) ||
      !Number.isInteger(installments) ||
      installments < 1 ||
      installments > 9
    ) {
      return null;
    }

    return {
      paymentType: "card",
      paymentMethodId: clean(input.paymentMethodId),
      paymentMethodType: paymentMethodType as "credit_card" | "debit_card",
      token: clean(input.token),
      installments,
      payer: payer as CardOrderRequest["payer"],
    };
  }

  if (input.paymentType === "boleto") {
    const address = payer.address;
    if (
      !payer.firstName ||
      !payer.lastName ||
      !payer.identification?.number ||
      !address?.zipCode ||
      !address.streetName ||
      !address.streetNumber ||
      !address.neighborhood ||
      !address.city ||
      address.state.length !== 2
    ) {
      return null;
    }

    return {
      paymentType: "boleto",
      payer: payer as BoletoOrderRequest["payer"],
    };
  }

  return null;
}

function buildOrderBody(order: OrderRequest) {
  const payer = {
    email: order.payer.email,
    ...(order.payer.firstName ? { first_name: order.payer.firstName } : {}),
    ...(order.payer.lastName ? { last_name: order.payer.lastName } : {}),
    ...(order.payer.identification?.number
      ? {
          identification: {
            type: order.payer.identification.type,
            number: order.payer.identification.number,
          },
        }
      : {}),
    ...(order.payer.address?.zipCode
      ? {
          address: {
            zip_code: order.payer.address.zipCode,
            street_name: order.payer.address.streetName,
            street_number: order.payer.address.streetNumber,
            neighborhood: order.payer.address.neighborhood,
            city: order.payer.address.city,
            state: order.payer.address.state,
          },
        }
      : {}),
  };

  const paymentMethod =
    order.paymentType === "card"
      ? {
          id: order.paymentMethodId,
          type: order.paymentMethodType,
          token: order.token,
          installments: order.installments,
        }
      : order.paymentType === "pix"
        ? { id: "pix", type: "bank_transfer" }
        : { id: "boleto", type: "ticket" };

  return {
    type: "online",
    processing_mode: "automatic",
    external_reference: `curso_personalidade_${crypto.randomUUID()}`,
    total_amount: COURSE_AMOUNT,
    description: "Personalidade e Neurociência - Curso Online",
    payer,
    transactions: {
      payments: [
        {
          amount: COURSE_AMOUNT,
          payment_method: paymentMethod,
          ...(order.paymentType === "pix" ? { expiration_time: "P1D" } : {}),
          ...(order.paymentType === "boleto" ? { expiration_time: "P3D" } : {}),
        },
      ],
    },
  };
}

export async function createMercadoPagoOrder(request: Request) {
  const requestOrigin = new URL(request.url).origin;
  const originHeader = request.headers.get("Origin");

  if (originHeader && originHeader !== requestOrigin) {
    return Response.json({ error: "Origem da requisição inválida." }, { status: 403 });
  }

  const accessToken = process.env.MP_ACCESS_TOKEN;
  if (!accessToken) {
    return Response.json({ error: "O pagamento ainda não está configurado." }, { status: 503 });
  }

  let input: unknown;
  try {
    input = await request.json();
  } catch {
    return Response.json({ error: "Dados de pagamento inválidos." }, { status: 400 });
  }

  const order = parseOrderRequest(input);
  if (!order) {
    return Response.json(
      { error: "Revise os dados informados e tente novamente." },
      { status: 400 },
    );
  }

  const response = await fetch(MERCADO_PAGO_ORDERS_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
      "X-Idempotency-Key": crypto.randomUUID(),
    },
    body: JSON.stringify(buildOrderBody(order)),
  });

  const data = (await response.json()) as MercadoPagoOrder;
  const payment = data.transactions?.payments?.[0];

  if (!response.ok || !data.id) {
    console.error("Mercado Pago order creation failed", {
      status: response.status,
      statusDetail: data.status_detail,
      message: data.message,
    });

    return Response.json(
      { error: "O Mercado Pago não conseguiu processar a solicitação." },
      { status: 502 },
    );
  }

  return Response.json(
    {
      order_id: data.id,
      status: data.status,
      status_detail: data.status_detail,
      payment_status: payment?.status,
      payment_status_detail: payment?.status_detail,
      ticket_url: payment?.payment_method?.ticket_url,
      qr_code: payment?.payment_method?.qr_code,
      qr_code_base64: payment?.payment_method?.qr_code_base64,
      digitable_line: payment?.payment_method?.digitable_line,
    },
    { headers: { "Cache-Control": "no-store" } },
  );
}
