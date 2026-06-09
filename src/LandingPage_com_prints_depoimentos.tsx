import { useEffect, useRef } from 'react'

// ─── Brand tokens ────────────────────────────────────────────────────────────
// Add these to your globals.css / styles.css under :root if you prefer;
// otherwise they're scoped to this component via the wrapper div below.
const BRAND_STYLES = `
  .eb-lp {
    --bg:        #F7F3EE;
    --fg:        #1C1A2E;
    --primary:   #C9963A;
    --primary-fg:#1C1A2E;
    --secondary: #EDE8DF;
    --muted-fg:  #605C77;
    --accent:    #7A1E1E;
    --accent-fg: #F4F0EA;
    --border:    #D9D0C4;
    --radius:    0.125rem;

    background:              var(--bg);
    color:                   var(--fg);
    font-family:             'Inter', ui-sans-serif, system-ui, sans-serif;
    font-size:               17px;
    line-height:             1.65;
    -webkit-font-smoothing:  antialiased;
    text-rendering:          optimizeLegibility;
  }

  .eb-lp ::selection { background: var(--primary); color: var(--primary-fg); }

  .eb-lp h1, .eb-lp h2, .eb-lp h3 {
    font-family:    'Playfair Display', ui-serif, Georgia, serif;
    font-weight:    500;
    letter-spacing: -0.015em;
    line-height:    1.15;
    color:          var(--fg);
  }

  /* ── Layout ── */
  .eb-container   { width: 100%; margin-inline: auto; padding-inline: 1.5rem; }
  @media (min-width: 768px) { .eb-container { padding-inline: 2.5rem; } }
  .eb-container-3xl { max-width: 48rem; }
  .eb-container-6xl { max-width: 72rem; }

  .eb-section { padding-block: 6rem; }
  @media (min-width: 768px) { .eb-section { padding-block: 8rem; } }

  .eb-divider { height: 1px; background: var(--border); }

  /* ── Eyebrow ── */
  .eb-eyebrow {
    display:         inline-flex;
    align-items:     center;
    gap:             0.75rem;
    font-size:       11px;
    font-weight:     500;
    letter-spacing:  0.22em;
    text-transform:  uppercase;
    color:           var(--muted-fg);
  }
  .eb-eyebrow::before {
    content: '';
    display: block;
    width:   2rem;
    height:  1px;
    background: var(--accent);
  }

  /* ── Section head ── */
  .eb-section-head            { text-align: center; margin-bottom: 4rem; }
  .eb-section-head .eb-eyebrow{ margin-bottom: 2rem; }
  .eb-section-head h2         { font-size: clamp(32px, 5vw, 48px); }
  .eb-section-head h2 em      { color: var(--accent); }

  /* ── Prose ── */
  .eb-prose { font-size: 18px; line-height: 1.7; color: var(--fg); max-width: 68ch; }
  .eb-prose p + p { margin-top: 1.25em; }

  /* ── Topbar ── */
  .eb-topbar {
    border-bottom:    2px solid var(--accent);
    background:       rgba(247,243,238,0.85);
    backdrop-filter:  blur(12px);
    position:         sticky;
    top:              0;
    z-index:          40;
    padding-block:    0.75rem;
  }
  .eb-wordmark {
    font-family:    'Playfair Display', serif;
    font-size:      20px;
    font-weight:    500;
    letter-spacing: -0.01em;
    color:          var(--fg);
  }
  .eb-wordmark em { color: var(--accent); font-style: normal; }
  .eb-topbar-inner {
    display:         flex;
    align-items:     center;
    justify-content: space-between;
    gap:             1rem;
  }
  .eb-topbar-meta {
    display:        none;
    align-items:    center;
    gap:            1rem;
    font-size:      12px;
    color:          var(--muted-fg);
    letter-spacing: 0.04em;
  }
  @media (min-width: 720px) {
    .eb-topbar-meta { display: flex; }
  }

  /* ── Hero ── */
  .eb-hero { padding-block: 5rem 4.5rem; }
  @media (min-width: 768px) { .eb-hero { padding-block: 7rem 5.5rem; } }
  .eb-hero-grid {
    display: grid;
    gap:     3rem;
    align-items: center;
  }
  @media (min-width: 960px) {
    .eb-hero-grid { grid-template-columns: minmax(0, 1.2fr) 390px; }
  }
  .eb-hero h1 { font-size: clamp(40px, 7vw, 68px); margin-block: 1.5rem 1.25rem; }
  .eb-hero h1 em { color: var(--accent); }
  .eb-lede {
    font-size:    19px;
    line-height:  1.6;
    color:        var(--muted-fg);
    max-width:    56ch;
    margin-bottom:2rem;
  }
  .eb-hero-meta {
    display:     flex;
    flex-wrap:   wrap;
    gap:         0.5rem 1rem;
    font-size:   14px;
    color:       var(--muted-fg);
    margin-bottom: 2.5rem;
  }
  .eb-dot { color: var(--border); }
  .eb-hero-actions {
    display:     flex;
    flex-wrap:   wrap;
    gap:         0.9rem;
    align-items: center;
  }
  .eb-hero-note {
    font-size: 13px;
    color:     var(--muted-fg);
  }
  .eb-offer-card {
    border:     1px solid var(--border);
    background: rgba(237,232,223,0.72);
    padding:    2rem;
    box-shadow: 0 18px 45px rgba(28,26,46,0.08);
  }
  .eb-offer-kicker {
    font-size:      11px;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color:          var(--accent);
    margin-bottom:  1.25rem;
  }
  .eb-offer-price {
    font-family:    'Playfair Display', serif;
    font-size:      54px;
    line-height:    1;
    letter-spacing: -0.02em;
    color:          var(--fg);
    margin-bottom:  0.45rem;
  }
  .eb-offer-sub {
    font-size:     14px;
    color:         var(--muted-fg);
    margin-bottom: 1.5rem;
  }
  .eb-offer-rows {
    display:       grid;
    border-top:    1px solid var(--border);
    border-bottom: 1px solid var(--border);
    margin-bottom: 1.5rem;
  }
  .eb-offer-row {
    display:         flex;
    justify-content: space-between;
    gap:             1rem;
    padding-block:   0.8rem;
    font-size:       14px;
    border-bottom:   1px solid var(--border);
  }
  .eb-offer-row:last-child { border-bottom: none; }
  .eb-offer-row span:first-child { color: var(--muted-fg); }
  .eb-offer-row strong { text-align: right; }
  .eb-offer-footnote {
    margin-top:  0.9rem;
    font-size:   12px;
    color:       var(--muted-fg);
    line-height: 1.45;
  }
  .eb-trust-strip {
    padding-block: 1.3rem;
    background:    var(--secondary);
    border-block:  1px solid var(--border);
  }
  .eb-trust-grid {
    display: grid;
    gap:     1rem;
  }
  @media (min-width: 760px) {
    .eb-trust-grid { grid-template-columns: repeat(3, 1fr); }
  }
  .eb-trust-item {
    display:     flex;
    gap:         0.8rem;
    align-items: baseline;
    font-size:   14px;
    color:       var(--muted-fg);
  }
  .eb-trust-item strong {
    font-family: 'Playfair Display', serif;
    font-size:   24px;
    color:       var(--accent);
    white-space: nowrap;
  }

  /* ── Buttons ── */
  .eb-btn {
    display:         inline-flex;
    align-items:     center;
    gap:             0.5rem;
    padding:         0.875rem 1.75rem;
    font-size:       14px;
    font-weight:     500;
    letter-spacing:  0.06em;
    text-transform:  uppercase;
    border:          none;
    cursor:          pointer;
    border-radius:   var(--radius);
    text-decoration: none;
    transition:      background 0.15s, transform 0.1s;
  }
  .eb-btn:active { transform: translateY(1px); }
  .eb-btn-primary {
    background: var(--accent);
    color:      var(--accent-fg);
  }
  .eb-btn-primary:hover { background: #6a1a1a; }
  .eb-btn-secondary {
    background: transparent;
    color:      var(--fg);
    box-shadow: inset 0 0 0 1px var(--border);
  }
  .eb-btn-secondary:hover { box-shadow: inset 0 0 0 1px var(--accent); color: var(--accent); }
  .eb-btn-small {
    padding:    0.62rem 1rem;
    font-size:  11px;
  }
  .eb-btn-wide { justify-content: center; width: 100%; }

  /* ── Audience ── */
  .eb-audience-grid {
    display: grid;
    gap:     1.25rem;
    margin-top: 3rem;
  }
  @media (min-width: 760px) {
    .eb-audience-grid { grid-template-columns: repeat(3, 1fr); }
  }
  .eb-audience-item {
    border-top: 1px solid var(--border);
    padding-top: 1.25rem;
  }
  .eb-audience-item strong {
    display:       block;
    font-size:     18px;
    line-height:   1.35;
    margin-bottom: 0.6rem;
  }
  .eb-audience-item p {
    font-size:   14px;
    line-height: 1.55;
    color:       var(--muted-fg);
  }
  .eb-proof-note {
    margin-top: 3rem;
    padding:    1.25rem 1.4rem;
    border-left: 3px solid var(--accent);
    background: var(--secondary);
    font-size:  15px;
    color:      var(--fg);
  }

  /* ── Outcomes ── */
  .eb-outcomes { list-style: none; display: grid; gap: 0; }
  .eb-outcomes li {
    display:       grid;
    grid-template-columns: 4rem 1fr;
    gap:           1.5rem;
    align-items:   start;
    padding-block: 2rem;
    border-bottom: 1px solid var(--border);
  }
  .eb-outcomes li:last-child { border-bottom: none; }
  .eb-outcome-num {
    font-family:    'Playfair Display', serif;
    font-size:      13px;
    letter-spacing: 0.1em;
    color:          var(--accent);
    padding-top:    0.2em;
  }
  .eb-outcomes li p { font-size: 18px; line-height: 1.55; }

  /* ── Bio ── */
  .eb-bio {
    display:    grid;
    gap:        4rem;
    align-items:start;
  }
  @media (min-width: 768px) { .eb-bio { grid-template-columns: 280px 1fr; } }
  .eb-bio-photo {
    aspect-ratio:  3/4;
    background:    var(--secondary);
    border:        1px solid var(--border);
    display:       flex;
    align-items:   flex-end;
    padding:       1rem;
  }
  .eb-bio-photo-label { font-size: 11px; color: var(--muted-fg); letter-spacing: 0.1em; }
  .eb-bio-caption { font-size: 12px; color: var(--muted-fg); margin-top: 0.75rem; }
  .eb-bio-label {
    font-size:      11px;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color:          var(--muted-fg);
    margin-bottom:  1rem;
  }
  .eb-bio-text h2 { font-size: clamp(28px, 4vw, 40px); margin-bottom: 1.75rem; }
  .eb-bio-card {
    border:     1px solid var(--border);
    background: var(--secondary);
    padding:    2rem;
  }
  .eb-bio-card-label {
    font-size:      11px;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color:          var(--muted-fg);
    margin-bottom:  1.1rem;
  }
  .eb-bio-card strong {
    display:     block;
    font-family: 'Playfair Display', serif;
    font-size:   30px;
    line-height: 1.12;
    color:       var(--fg);
  }
  .eb-bio-card ul {
    list-style: none;
    margin-top: 1.5rem;
    display:    grid;
    gap:        0.8rem;
    font-size:  14px;
    color:      var(--muted-fg);
  }
  .eb-bio-card li::before {
    content: '— ';
    color:   var(--accent);
  }

  /* ── Formato ── */
  .eb-formato {
    display:    grid;
    gap:        4rem;
    align-items:start;
  }
  @media (min-width: 768px) { .eb-formato { grid-template-columns: 1fr 1fr; } }
  .eb-formato h2 { font-size: clamp(28px, 4vw, 40px); margin-top: 1rem; }
  .eb-formato-row {
    display:       grid;
    grid-template-columns: 1fr 1fr;
    gap:           1rem;
    padding-block: 1rem;
    border-bottom: 1px solid var(--border);
    font-size:     16px;
  }
  .eb-formato-row:first-child { border-top: 1px solid var(--border); }
  .eb-formato-row dt { color: var(--muted-fg); font-size: 13px; }

  /* ── Encontros ── */
  .eb-encontros { display: grid; gap: 0; }
  .eb-encontro {
    display:       grid;
    grid-template-columns: 140px 1fr;
    gap:           2rem;
    padding-block: 2.5rem;
    border-bottom: 1px solid var(--border);
  }
  .eb-encontro:first-child { border-top: 1px solid var(--border); }
  .eb-encontro-num { font-size: 12px; letter-spacing: 0.12em; color: var(--muted-fg); padding-top: 0.3em; }
  .eb-encontro h3  { font-size: 20px; font-weight: 500; margin-bottom: 0.75rem; }
  .eb-encontro p   { font-size: 15px; color: var(--muted-fg); line-height: 1.55; }

  /* ── Testimonials marquee ── */
  .eb-testimonials-section {
    position:   relative;
    padding:    1rem 0 2rem;
    background: linear-gradient(180deg, var(--bg) 0%, var(--secondary) 45%, var(--bg) 100%);
  }
  .eb-testimonials-viewport {
    position:    relative;
    overflow:    hidden;
    padding:     3rem 0;
    -webkit-mask-image: linear-gradient(90deg, transparent, black 7%, black 93%, transparent);
            mask-image: linear-gradient(90deg, transparent, black 7%, black 93%, transparent);
  }
  .eb-testimonials-bg {
    position: absolute; inset: 0; pointer-events: none; z-index: 0; overflow: hidden;
  }
  .eb-blob {
    position:      absolute;
    border-radius: 50%;
    filter:        blur(70px);
    will-change:   transform;
  }
  .eb-blob-1 {
    width: 460px; height: 460px;
    background: radial-gradient(circle, rgba(201,150,58,0.22), transparent 70%);
    top: -100px; left: 8%;
    animation: eb-blob-1 18s ease-in-out infinite alternate;
  }
  .eb-blob-2 {
    width: 500px; height: 500px;
    background: radial-gradient(circle, rgba(122,30,30,0.14), transparent 70%);
    bottom: -140px; right: 10%;
    animation: eb-blob-2 22s ease-in-out infinite alternate;
  }
  .eb-blob-3 {
    width: 380px; height: 380px;
    background: radial-gradient(circle, rgba(201,150,58,0.1), transparent 70%);
    top: 28%; left: 50%;
    transform: translateX(-50%);
    animation: eb-blob-3 25s ease-in-out infinite alternate;
  }
  @keyframes eb-blob-1 {
    from { transform: translate(0,0) scale(1); }
    to   { transform: translate(60px,40px) scale(1.1); }
  }
  @keyframes eb-blob-2 {
    from { transform: translate(0,0) scale(1); }
    to   { transform: translate(-70px,-30px) scale(1.05); }
  }
  @keyframes eb-blob-3 {
    from { transform: translate(-50%,0) scale(1); }
    to   { transform: translate(calc(-50% + 50px),30px) scale(0.9); }
  }
  .eb-testimonials-track {
    position:   relative;
    z-index:    1;
    display:    flex;
    gap:        1.5rem;
    width:      max-content;
    padding:    0 1.5rem;
    animation:  eb-scroll 50s linear infinite;
    will-change:transform;
  }
  .eb-testimonials-viewport:hover .eb-testimonials-track { animation-play-state: paused; }
  @keyframes eb-scroll {
    from { transform: translateX(0); }
    to   { transform: translateX(-50%); }
  }
  @media (prefers-reduced-motion: reduce) {
    .eb-testimonials-track { animation: none; }
    .eb-blob { animation: none; }
  }
  .eb-testimonial {
    flex:              0 0 320px;
    position:          relative;
    padding:           0.65rem;
    border-radius:     18px;
    background:        rgba(247,243,238,0.38);
    -webkit-backdrop-filter: blur(22px) saturate(150%);
            backdrop-filter: blur(22px) saturate(150%);
    box-shadow:
      inset 0 1px 0 rgba(255,255,255,0.7),
      inset 0 -1px 0 rgba(28,26,46,0.05),
      0 12px 36px rgba(28,26,46,0.12),
      0 2px 6px rgba(28,26,46,0.04);
  }
  .eb-testimonial::before {
    content: '';
    position:      absolute;
    inset:         0;
    border-radius: inherit;
    padding:       1px;
    background:    linear-gradient(135deg,
      rgba(122,30,30,0.55) 0%,
      rgba(201,150,58,0.65) 35%,
      rgba(255,255,255,0.85) 60%,
      rgba(122,30,30,0.45) 100%
    );
    -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
            mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
    -webkit-mask-composite: xor;
            mask-composite: exclude;
    pointer-events: none;
  }
  .eb-testimonial-image {
    display:       block;
    width:         100%;
    height:        540px;
    object-fit:    contain;
    border-radius: 12px;
    background:    #101818;
  }
  @media (max-width: 480px) {
    .eb-testimonial { flex: 0 0 270px; padding: 0.5rem; }
    .eb-testimonial-image { height: 500px; }
  }

  /* ── Pricing ── */
  .eb-pricing-wrap {
    border:     1px solid var(--border);
    padding:    3rem;
    max-width:  60rem;
    margin:     0 auto;
    background: linear-gradient(180deg, rgba(237,232,223,0.74), rgba(247,243,238,0.92));
    box-shadow: 0 22px 60px rgba(28,26,46,0.1);
  }
  @media (max-width: 640px) { .eb-pricing-wrap { padding: 2rem 1.5rem; } }
  .eb-pricing-label {
    font-size:      11px;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color:          var(--muted-fg);
    margin-bottom:  1.5rem;
  }
  .eb-pricing-wrap h2 {
    font-size:    clamp(32px, 5vw, 52px);
    margin-bottom:3rem;
  }
  .eb-pricing-wrap h2 em { color: var(--accent); }
  .eb-pricing-grid {
    display:   grid;
    gap:       3rem;
    align-items:start;
  }
  @media (min-width: 640px) { .eb-pricing-grid { grid-template-columns: 1fr 1fr; } }
  .eb-price-label      { font-size: 12px; letter-spacing: 0.1em; text-transform: uppercase; color: var(--muted-fg); margin-bottom: 0.5rem; }
  .eb-price-amount     { font-family: 'Playfair Display', serif; font-size: 48px; font-weight: 500; letter-spacing: -0.02em; }
  .eb-price-installments { font-size: 14px; color: var(--muted-fg); margin-top: 0.5rem; }
  .eb-price-includes   { font-size: 15px; color: var(--muted-fg); margin-bottom: 1.75rem; line-height: 1.55; }
  .eb-price-secure     { font-size: 11px; letter-spacing: 0.1em; text-transform: uppercase; color: var(--muted-fg); margin-top: 0.75rem; }
  .eb-price-checklist {
    list-style: none;
    display:    grid;
    gap:        0.7rem;
    margin:     1.4rem 0 1.8rem;
    font-size:  14px;
    color:      var(--fg);
  }
  .eb-price-checklist li::before {
    content: '✓';
    color:   var(--accent);
    margin-right: 0.55rem;
  }
  .eb-price-meta {
    display:       grid;
    gap:           0.55rem;
    margin-top:    1.3rem;
    padding-top:   1.3rem;
    border-top:    1px solid var(--border);
    font-size:     13px;
    color:         var(--muted-fg);
  }
  .eb-price-meta strong { color: var(--fg); }

  /* ── FAQ ── */
  .eb-faq-grid {
    display:    grid;
    gap:        4rem;
    align-items:start;
  }
  @media (min-width: 768px) { .eb-faq-grid { grid-template-columns: 240px 1fr; } }
  .eb-faq-grid h2 { font-size: clamp(28px, 4vw, 40px); margin-top: 1rem; }
  .eb-faq-item + .eb-faq-item { border-top: 1px solid var(--border); }
  .eb-faq-q { font-size: 17px; font-weight: 500; padding-block: 1.5rem; }
  .eb-faq-a { font-size: 15px; color: var(--muted-fg); padding-bottom: 1.5rem; line-height: 1.6; }

  /* ── Final CTA ── */
  .eb-final-cta {
    text-align:  center;
    padding-block:6rem;
    background:  var(--accent);
    color:       var(--accent-fg);
  }
  @media (min-width: 768px) { .eb-final-cta { padding-block: 8rem; } }
  .eb-final-cta h2     { color: var(--accent-fg); font-size: clamp(32px, 5vw, 52px); margin-block: 1rem 2.5rem; }
  .eb-final-cta h2 em  { color: var(--primary); }
  .eb-final-cta-eyebrow{ font-size: 12px; letter-spacing: 0.2em; text-transform: uppercase; opacity: 0.65; }
  .eb-final-cta .eb-btn-primary {
    background: var(--accent-fg);
    color:      var(--accent);
  }
  .eb-final-cta .eb-btn-primary:hover { background: #e8e2da; }
  .eb-final-cta-vagas  { margin-top: 1.5rem; font-size: 12px; text-transform: uppercase; letter-spacing: 0.18em; opacity: 0.55; }

  /* ── Footer ── */
  .eb-footer { border-top: 1px solid var(--border); padding-block: 2.5rem; }
  .eb-footer-inner {
    display:         flex;
    flex-wrap:       wrap;
    align-items:     center;
    justify-content: space-between;
    gap:             1rem;
    font-size:       13px;
    color:           var(--muted-fg);
  }
  .eb-footer a { color: inherit; text-decoration: underline; text-underline-offset: 3px; }
`

// ─── Course config ───────────────────────────────────────────────────────────
// Única fonte de verdade para dados da turma. Quando os dados reais chegarem,
// edite SOMENTE aqui — nada mais no arquivo precisa mudar.
const COURSE = {
  // Data de início da turma (label exibida na página)
  startDateLabel: '18 de junho',        // TBD — placeholder
  // Vagas
  spots: 40,                            // TBD — placeholder
  // Preço
  priceLabel: 'R$ 149',                 // TBD — placeholder
  maxInstallments: 12,
  // Link do checkout Hotmart. Enquanto for '#', o botão só ancora na seção.
  checkoutUrl: '#',                     // TBD — colar URL do checkout
  // Formato (dependente da turma)
  duration: '3 semanas',
  meetings: '3 aulas ao vivo, semanais',
  schedule: 'Quartas, 19h30–21h (horário de Brasília)',
  workload: '4h30 de encontros síncronos',
  // Meta Pixel — colar o ID quando o pixel for criado no Gerenciador de Eventos.
  metaPixelId: '',                      // TBD
}

// ─── Meta Pixel (scaffold) ───────────────────────────────────────────────────
// Não faz nada enquanto COURSE.metaPixelId estiver vazio.
declare global {
  interface Window { fbq?: (...args: unknown[]) => void; _fbq?: unknown }
}

function useMetaPixel(pixelId: string) {
  useEffect(() => {
    if (!pixelId || typeof window === 'undefined' || window.fbq) return
    const fbq: any = function (...args: unknown[]) {
      fbq.callMethod ? fbq.callMethod(...args) : fbq.queue.push(args)
    }
    fbq.push = fbq
    fbq.loaded = true
    fbq.version = '2.0'
    fbq.queue = []
    window.fbq = fbq
    window._fbq = fbq
    const s = document.createElement('script')
    s.async = true
    s.src = 'https://connect.facebook.net/en_US/fbevents.js'
    document.head.appendChild(s)
    fbq('init', pixelId)
    fbq('track', 'PageView')
  }, [pixelId])
}

function trackInitiateCheckout() {
  window.fbq?.('track', 'InitiateCheckout')
}

// ─── Data ────────────────────────────────────────────────────────────────────
// Replace these with your real content (or wire up to a CMS / props)

const TESTIMONIAL_IMAGES = [
  {
    src: '/depoimento-1.webp',
    alt: 'Print de depoimento de aluno no WhatsApp 1',
  },
  {
    src: '/depoimento-2.webp',
    alt: 'Print de depoimento de aluno no WhatsApp 2',
  },
  {
    src: '/depoimento-3.webp',
    alt: 'Print de depoimento de aluno no WhatsApp 3',
  },
  {
    src: '/depoimento-4.webp',
    alt: 'Print de depoimento de aluno no WhatsApp 4',
  },
  {
    src: '/depoimento-5.webp',
    alt: 'Print de depoimento de aluno no WhatsApp 5',
  },
  {
    src: '/depoimento-6.webp',
    alt: 'Print de depoimento de aluno no WhatsApp 6',
  },
  {
    src: '/depoimento-7.webp',
    alt: 'Print de depoimento de aluno no WhatsApp 7',
  },
  {
    src: '/depoimento-8.webp',
    alt: 'Print de depoimento de aluno no WhatsApp 8',
  }
]

// ─── Tiny sub-components ─────────────────────────────────────────────────────

function Divider() {
  return (
    <div className="eb-container eb-container-6xl">
      <div className="eb-divider" />
    </div>
  )
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return <span className="eb-eyebrow">{children}</span>
}

function signupHref() {
  return COURSE.checkoutUrl === '#' ? '#inscricao' : COURSE.checkoutUrl
}

function SignupLink({
  children,
  className = 'eb-btn eb-btn-primary',
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <a href={signupHref()} className={className} onClick={trackInitiateCheckout}>
      {children} <span aria-hidden>→</span>
    </a>
  )
}

// ─── Testimonials (with seamless marquee loop) ───────────────────────────────

function Testimonials() {
  const trackRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const track = trackRef.current
    if (!track) return
    const originals = Array.from(track.querySelectorAll('.eb-testimonial'))
    // Clone for seamless loop
    originals.forEach(orig => {
      const clone = orig.cloneNode(true) as HTMLElement
      clone.setAttribute('aria-hidden', 'true')
      track.appendChild(clone)
    })
  }, [])

  return (
    <section className="eb-testimonials-section">
      <div className="eb-container eb-container-6xl">
        <div className="eb-section-head">
          <Eyebrow>Quem já estudou</Eyebrow>
          <h2 style={{ marginTop: '1.5rem' }}>Sobre a experiência.</h2>
        </div>
      </div>
      <div className="eb-testimonials-viewport">
        <div className="eb-testimonials-bg" aria-hidden>
          <div className="eb-blob eb-blob-1" />
          <div className="eb-blob eb-blob-2" />
          <div className="eb-blob eb-blob-3" />
        </div>
        <div className="eb-testimonials-track" ref={trackRef}>
          {TESTIMONIAL_IMAGES.map((item, i) => (
            <figure key={i} className="eb-testimonial">
              <img className="eb-testimonial-image" src={item.src} alt={item.alt} loading="lazy" />
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── FAQ (accordion-ready; currently static) ─────────────────────────────────

const FAQ_ITEMS = [
  {
    q: 'Para quem é este curso?',
    a: 'Para estudantes e profissionais interessados em compreender a personalidade a partir de psicologia, neurociência, genética comportamental e desenvolvimento humano.',
  },
  {
    q: 'Preciso ter formação prévia em psicologia?',
    a: 'Não. O curso parte dos fundamentos, mas mantém densidade suficiente para quem já estuda ou trabalha na área.',
  },
  {
    q: 'As aulas ficam gravadas?',
    a: 'Sim. A turma terá acesso às gravações após os encontros, para rever com calma ou acompanhar caso não possa estar ao vivo.',
  },
  {
    q: 'Há material de apoio?',
    a: 'Sim. Cada aula acompanha material escrito de revisão, organizado para facilitar a retomada dos conceitos principais.',
  },
  {
    q: 'O curso oferece certificado?',
    a: 'Sim. O certificado de participação fica disponível para quem concluir o percurso dentro da plataforma.',
  },
  {
    q: 'Como funciona o pagamento?',
    a: 'A inscrição é feita online, com pagamento seguro pela Hotmart, podendo ser parcelada no cartão.',
  },
]

// ─── Main component ───────────────────────────────────────────────────────────

export default function LandingPage() {
  useMetaPixel(COURSE.metaPixelId)

  return (
    <>
      {/* Scoped styles — move to globals.css if you prefer */}
      <style dangerouslySetInnerHTML={{ __html: BRAND_STYLES }} />

      {/* Google Fonts — add to your <head> / layout if not already there */}
      <style dangerouslySetInnerHTML={{ __html: `@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Inter:wght@300;400;500;600&display=swap');` }} />

      <div className="eb-lp">

        {/* ── TOP BAR ─────────────────────────────────────────────────────── */}
        <header className="eb-topbar">
          <div className="eb-container eb-container-6xl">
            <div className="eb-topbar-inner">
              <div className="eb-wordmark">Vicente <em>Cotanda</em></div>
              <div className="eb-topbar-meta" aria-label="Resumo da turma">
                <span>{COURSE.meetings}</span>
                <span className="eb-dot" aria-hidden>·</span>
                <span>{COURSE.priceLabel}</span>
                <SignupLink className="eb-btn eb-btn-primary eb-btn-small">Inscrever</SignupLink>
              </div>
            </div>
          </div>
        </header>

        {/* ── HERO ────────────────────────────────────────────────────────── */}
        <section className="eb-hero">
          <div className="eb-container eb-container-6xl">
            <div className="eb-hero-grid">
              <div>
                <Eyebrow>Curso online ao vivo · Psicologia e neurociência</Eyebrow>
                <h1>Entenda personalidade sem cair em explicação rasa.</h1>
                <p className="eb-lede">
                  Um curso direto e bem guiado para entender traços, temperamento,
                  genética, ambiente e neurodesenvolvimento na formação da personalidade.
                </p>
                <div className="eb-hero-meta">
                  <span>com <strong>Vicente Cotanda</strong></span>
                  <span className="eb-dot" aria-hidden>·</span>
                  <span>começa em <strong>{COURSE.startDateLabel}</strong></span>
                  <span className="eb-dot" aria-hidden>·</span>
                  <span><strong>{COURSE.spots}</strong> vagas</span>
                </div>
                <div className="eb-hero-actions">
                  <SignupLink>Quero entrar na turma</SignupLink>
                  <a href="#conteudo" className="eb-btn eb-btn-secondary">
                    Ver conteúdo <span aria-hidden>↓</span>
                  </a>
                  <span className="eb-hero-note">Aulas ao vivo, gravações e certificado.</span>
                </div>
              </div>

              <aside className="eb-offer-card" aria-label="Resumo da inscrição">
                <div className="eb-offer-kicker">Próxima turma</div>
                <div className="eb-offer-price">{COURSE.priceLabel}</div>
                <div className="eb-offer-sub">
                  ou em até {COURSE.maxInstallments} parcelas no cartão
                </div>
                <div className="eb-offer-rows">
                  <div className="eb-offer-row">
                    <span>Início</span>
                    <strong>{COURSE.startDateLabel}</strong>
                  </div>
                  <div className="eb-offer-row">
                    <span>Formato</span>
                    <strong>{COURSE.meetings}</strong>
                  </div>
                  <div className="eb-offer-row">
                    <span>Horário</span>
                    <strong>{COURSE.schedule}</strong>
                  </div>
                  <div className="eb-offer-row">
                    <span>Vagas</span>
                    <strong>{COURSE.spots}</strong>
                  </div>
                </div>
                <SignupLink className="eb-btn eb-btn-primary eb-btn-wide">Garantir vaga</SignupLink>
                <p className="eb-offer-footnote">
                  Inclui encontros ao vivo, gravações, material de revisão e certificado.
                </p>
              </aside>
            </div>
          </div>
        </section>

        <section className="eb-trust-strip" aria-label="Resumo do curso">
          <div className="eb-container eb-container-6xl">
            <div className="eb-trust-grid">
              <div className="eb-trust-item"><strong>3</strong><span>encontros ao vivo para organizar o tema sem enrolação.</span></div>
              <div className="eb-trust-item"><strong>4h30</strong><span>de aula, com gravação e material escrito para revisar.</span></div>
              <div className="eb-trust-item"><strong>{COURSE.spots}</strong><span>vagas para uma turma enxuta, com começo definido.</span></div>
            </div>
          </div>
        </section>

        <Divider />

        {/* ── PARA QUEM É ─────────────────────────────────────────────────── */}
        <section className="eb-section">
          <div className="eb-container eb-container-6xl">
            <div className="eb-section-head">
              <Eyebrow>Para quem</Eyebrow>
              <h2 style={{ marginTop: '1.5rem' }}>
                Feito para quem precisa de mapa, não de frase pronta.
              </h2>
            </div>
            <div className="eb-audience-grid">
              <div className="eb-audience-item">
                <strong>Você estuda comportamento humano.</strong>
                <p>Psicologia, neurociência, educação, clínica ou desenvolvimento pessoal com rigor.</p>
              </div>
              <div className="eb-audience-item">
                <strong>Você quer entender diferenças individuais.</strong>
                <p>Traços, temperamento, genética e ambiente sem cair em determinismo barato.</p>
              </div>
              <div className="eb-audience-item">
                <strong>Você gosta de aula densa, mas clara.</strong>
                <p>Um percurso organizado, com começo, meio e fim, para sair com repertório aplicável.</p>
              </div>
            </div>
            <div className="eb-proof-note">
              A promessa aqui não é transformar personalidade em fórmula. É te dar uma lente mais precisa para observar como estabilidade, mudança, corpo, história e contexto se combinam.
            </div>
          </div>
        </section>

        <Divider />

        {/* ── A VIRADA ────────────────────────────────────────────────────── */}
        <section className="eb-section">
          <div className="eb-container eb-container-3xl">
            <div className="eb-section-head">
              <Eyebrow>A virada</Eyebrow>
              <h2 style={{ marginTop: '1.5rem' }}>
                O que muda quando você entende <em>a formação dos traços.</em>
              </h2>
            </div>
            <div className="eb-prose">
              <p>
                A virada é sair da pergunta rasa — “isso vem dos genes ou do ambiente?” —
                e aprender a observar como disposições inatas, experiências repetidas,
                vínculos, riscos, proteções e maturação cerebral se combinam na trajetória
                de uma pessoa.
              </p>
            </div>
          </div>
        </section>

        <Divider />

        {/* ── OUTCOMES ────────────────────────────────────────────────────── */}
        <section className="eb-section" id="conteudo">
          <div className="eb-container eb-container-6xl">
            <div className="eb-section-head" style={{ textAlign: 'left', maxWidth: '60ch', marginBottom: '5rem' }}>
              <Eyebrow>O que você levará</Eyebrow>
              <h2 style={{ marginTop: '1.5rem', textAlign: 'left' }}>
                Um mapa para compreender <em>diferenças individuais.</em>
              </h2>
            </div>
            <ol className="eb-outcomes">
              {[
                'Compreender personalidade como padrão relativamente estável de emoções, pensamentos e comportamentos.',
                'Diferenciar temperamento, personalidade e traços psicológicos sem confundir categorias com dimensões.',
                'Entender a lógica dos Big Five e por que modelos dimensionais ganharam força na psicologia contemporânea.',
                'Pensar o debate genética versus ambiente a partir de interações reais, e não de falsas oposições.',
                'Reconhecer como experiências recorrentes, vínculos, traumas e proteções participam da trajetória de desenvolvimento.',
                'Integrar cérebro, infância, adolescência, epigenética e ambiente na compreensão da personalidade adulta.',
              ].map((text, i) => (
                <li key={i}>
                  <span className="eb-outcome-num">0{i + 1}</span>
                  <p>{text}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <Divider />

        {/* ── BIO ─────────────────────────────────────────────────────────── */}
        <section className="eb-section">
          <div className="eb-container eb-container-6xl">
            <div className="eb-bio">
              <aside className="eb-bio-card" aria-label="Credenciais de Vicente Cotanda">
                <div className="eb-bio-card-label">Quem conduz</div>
                <strong>Vicente Dall'Igna Cotanda</strong>
                <ul>
                  <li>Psicólogo e mestre</li>
                  <li>Doutorando em Neurociências no InsCer-RS</li>
                  <li>Pesquisa e ensino com foco em personalidade, comportamento e desenvolvimento</li>
                </ul>
              </aside>
              <div className="eb-bio-text">
                <div className="eb-bio-label">Sobre quem conduz</div>
                <h2>Vicente Cotanda.</h2>
                <div className="eb-prose">
                  <p>Psicólogo e mestre, Vicente Dall'Igna Cotanda é doutorando em Neurociências no InsCer-RS.</p>
                  <p>Sua condução combina psicologia da personalidade, genética comportamental, neurodesenvolvimento e clínica, com atenção especial às pontes entre pesquisa empírica e compreensão humana.</p>
                  <p>O curso preserva esse estilo: rigor conceitual, didática clara e tempo suficiente para que ideias difíceis sejam realmente assimiladas.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <Divider />

        {/* ── FORMATO ─────────────────────────────────────────────────────── */}
        <section className="eb-section">
          <div className="eb-container eb-container-6xl">
            <div className="eb-formato">
              <div>
                <div className="eb-bio-label">Formato</div>
                <h2>Como o curso<br />acontece.</h2>
              </div>
              <dl>
                {[
                  ['Duração',       COURSE.duration],
                  ['Encontros',     COURSE.meetings],
                  ['Dia e horário', COURSE.schedule],
                  ['Carga horária', COURSE.workload],
                  ['Material',      'Resumo escrito e gravação de cada aula'],
                  ['Certificado',   'Certificado de participação incluso'],
                ].map(([k, v]) => (
                  <div key={k} className="eb-formato-row">
                    <dt>{k}</dt>
                    <dd>{v}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </section>

        <Divider />

        {/* ── ENCONTROS ───────────────────────────────────────────────────── */}
        <section className="eb-section">
          <div className="eb-container eb-container-6xl">
            <div className="eb-section-head">
              <Eyebrow>Os encontros</Eyebrow>
              <h2 style={{ marginTop: '1.5rem' }}>
                O caminho <em>encontro a encontro.</em>
              </h2>
            </div>
            <div className="eb-encontros">
              {[
                ['Introdução ao estudo da personalidade', 'O que é personalidade, como diferenciar temperamento e traços, por que modelos dimensionais como os Big Five se tornaram centrais e o que está em jogo quando pensamos estabilidade e mudança ao longo da vida.'],
                ['Genética e ambiente', 'Uma travessia pelo debate nature versus nurture, genética comportamental, estudos com gêmeos, poligenia, eventos biográficos recorrentes e a ideia de que o ambiente também é parcialmente construído pelas disposições do indivíduo.'],
                ['Cérebro e comportamento', 'Do ambiente pré-natal à adolescência, passando por maturação do córtex pré-frontal, risco, grupos sociais, epigenética e pela soma de riscos e proteções que participa da formação da personalidade adulta.'],
              ].map(([titulo, desc], i) => (
                <div key={i} className="eb-encontro">
                  <span className="eb-encontro-num">Encontro 0{i + 1}</span>
                  <div>
                    <h3>{titulo}</h3>
                    <p>{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <Divider />

        {/* ── DEPOIMENTOS ─────────────────────────────────────────────────── */}
        <Testimonials />

        <Divider />

        {/* ── PREÇO ───────────────────────────────────────────────────────── */}
        <section className="eb-section" id="inscricao">
          <div className="eb-container eb-container-6xl">
            <div className="eb-pricing-wrap">
              <div className="eb-pricing-label">Inscrição</div>
              <h2>
                Entre na próxima turma<br />
                <em>com tudo organizado.</em>
              </h2>
              <div className="eb-pricing-grid">
                <div>
                  <div className="eb-price-label">Valor</div>
                  <div className="eb-price-amount">{COURSE.priceLabel}</div>
                  <div className="eb-price-installments">ou em até {COURSE.maxInstallments} parcelas no cartão</div>
                  <div className="eb-price-meta">
                    <span>Início: <strong>{COURSE.startDateLabel}</strong></span>
                    <span>Formato: <strong>{COURSE.meetings}</strong></span>
                    <span>Vagas: <strong>{COURSE.spots}</strong></span>
                  </div>
                </div>
                <div>
                  <p className="eb-price-includes">
                    Você entra para uma turma ao vivo, acompanha as aulas com Vicente
                    e recebe o material para revisar depois sem depender só da memória.
                  </p>
                  <ul className="eb-price-checklist">
                    <li>3 encontros ao vivo</li>
                    <li>Gravações para rever no seu ritmo</li>
                    <li>Material escrito de revisão</li>
                    <li>Certificado de participação</li>
                  </ul>
                  <SignupLink className="eb-btn eb-btn-primary eb-btn-wide">Quero garantir minha vaga</SignupLink>
                  <div className="eb-price-secure">Pagamento seguro · processado pela Hotmart</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <Divider />

        {/* ── FAQ ─────────────────────────────────────────────────────────── */}
        <section className="eb-section">
          <div className="eb-container eb-container-6xl">
            <div className="eb-faq-grid">
              <div>
                <div className="eb-bio-label">Perguntas</div>
                <h2>Antes de<br />se inscrever.</h2>
              </div>
              <dl>
                {FAQ_ITEMS.map((item, i) => (
                  <div key={i} className="eb-faq-item">
                    <dt className="eb-faq-q">{item.q}</dt>
                    <dd className="eb-faq-a">{item.a}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </section>

        {/* ── CTA FINAL ───────────────────────────────────────────────────── */}
        <section className="eb-final-cta">
          <div className="eb-container eb-container-3xl">
            <p className="eb-final-cta-eyebrow">Próxima turma confirmada:</p>
            <h2>
              As aulas começam em<br />
              <em>{COURSE.startDateLabel}.</em>
            </h2>
            <SignupLink>Quero entrar na turma</SignupLink>
            <div className="eb-final-cta-vagas">{COURSE.spots} vagas disponíveis</div>
          </div>
        </section>

        {/* ── FOOTER ──────────────────────────────────────────────────────── */}
        <footer className="eb-footer">
          <div className="eb-container eb-container-6xl">
            <div className="eb-footer-inner">
              <div className="eb-wordmark">Vicente <em>Cotanda</em></div>
              <a href="mailto:contato@vicentecotanda.com.br">contato@vicentecotanda.com.br</a>
              <span>© 2026 Vicente Cotanda Cursos. Todos os direitos reservados.</span>
            </div>
          </div>
        </footer>

      </div>
    </>
  )
}
