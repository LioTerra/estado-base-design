# Fixes: dark mode palette + mobile nav

Two scoped changes. No layout, typography, or design-system decisions altered beyond what's listed.

## 1. Brand-aligned dark mode (`src/styles.css`)

The `.dark` block currently holds default shadcn slate/blue tokens — completely off-brand. Replace it with a warm, deep counterpart of the light palette so that if dark mode ever activates (OS preference, future toggle, embedded contexts), it still reads as Estado Base.

New `.dark` tokens (oklch, same hue family as light):

- `--background`: `oklch(0.14 0.012 60)` — deep warm near-black
- `--foreground`: `oklch(0.94 0.012 80)` — cream
- `--card` / `--popover`: `oklch(0.17 0.012 60)`
- `--card-foreground` / `--popover-foreground`: `oklch(0.94 0.012 80)`
- `--primary`: `oklch(0.65 0.14 40)` — terracotta, slightly lifted for contrast on dark
- `--primary-foreground`: `oklch(0.14 0.012 60)`
- `--secondary`: `oklch(0.22 0.012 60)`
- `--secondary-foreground`: `oklch(0.94 0.012 80)`
- `--muted`: `oklch(0.20 0.012 60)`
- `--muted-foreground`: `oklch(0.70 0.012 75)`
- `--accent`: same as primary
- `--accent-foreground`: `oklch(0.14 0.012 60)`
- `--border`: `oklch(0.28 0.012 60)`
- `--input`: `oklch(0.24 0.012 60)`
- `--ring`: `oklch(0.65 0.14 40)`
- `--destructive`: `oklch(0.55 0.20 27)`
- Sidebar tokens: mirror the same scheme.
- Chart tokens: leave as-is (not used on the site yet; not worth bikeshedding).

Light mode tokens are untouched.

## 2. Mobile hamburger menu (`src/components/site-header.tsx`)

Currently nav links are `hidden sm:inline-block` with no fallback below 640px — on the user's 677px viewport the links do show, but at <640px there's nothing. Add a hamburger that mirrors the editorial feel (thin lines, no shadcn button chrome).

Approach:

- Add a `useState` for `open`.
- On `< sm`: show a square icon button (right side) using `lucide-react`'s `Menu` / `X` icons, 1px border, `rounded-none` to match `--radius: 0.125rem`, terracotta on hover.
- Desktop nav stays exactly as it is (`hidden sm:inline-flex`).
- When open, render a full-width panel below the header bar (`sm:hidden`), background `bg-background`, top border, links stacked vertically with generous spacing (`py-4`, serif-adjacent treatment consistent with the rest of the header). Each link closes the menu on click.
- Lock body scroll while open is overkill here — just let the panel push content; it's a short list.
- Close automatically on route change by listening to `useLocation()` in a `useEffect`.

No new dependencies — `lucide-react` is already in the stack.

## Files touched

- `src/styles.css` — rewrite `.dark` block only.
- `src/components/site-header.tsx` — add mobile menu state, button, and panel; keep desktop nav identical.

Nothing else changes.