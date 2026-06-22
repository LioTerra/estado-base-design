import { useEffect } from "react";
import certificateModel from "./assets/certificado-modelo.webp";

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
    font-weight:    400;
    letter-spacing: -0.015em;
    line-height:    1.15;
    color:          var(--fg);
  }
  .eb-lp h2 { text-align: center; }

  /* ── Layout ── */
  .eb-container   { width: 100%; margin-inline: auto; padding-inline: 1.5rem; }
  @media (min-width: 768px) { .eb-container { padding-inline: 2.5rem; } }
  .eb-container-3xl { max-width: 48rem; }
  .eb-container-6xl { max-width: 72rem; }

  .eb-section { padding-block: 6rem; }
  @media (min-width: 768px) { .eb-section { padding-block: 8rem; } }
  .eb-section,
  .eb-testimonials-section {
    scroll-margin-top: 5rem;
  }

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
    font-weight:    400;
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
  .eb-topbar-link {
    color:           var(--fg);
    text-decoration: none;
    font-size:       12px;
    letter-spacing:  0.08em;
    text-transform:  uppercase;
  }
  .eb-topbar-link:hover { color: var(--accent); }

  /* ── Hero ── */
  .eb-hero { padding-block: 4rem 4.5rem; }
  @media (min-width: 768px) { .eb-hero { padding-block: 4rem 5rem; } }
  .eb-hero-grid {
    display: grid;
    gap:     3rem;
    align-items: center;
    max-width: 64rem;
    margin-inline: auto;
    text-align: center;
  }
  .eb-hero-grid > div {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .eb-section h2,
  .eb-testimonials-section h2,
  .eb-final-cta h2 {
    text-transform: uppercase;
  }
  .eb-hero h1 { font-size: clamp(36px, 5vw, 58px); margin-block: 1.5rem 1.25rem; }
  .eb-hero h1 strong { font-weight: 700; }
  .eb-hero h1 em {
    font-style: italic;
    font-weight: 400;
  }
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
    justify-content: center;
    gap:         0.5rem 1rem;
    font-size:   14px;
    color:       var(--muted-fg);
    margin-bottom: 2.5rem;
  }
  .eb-dot { color: var(--border); }
  .eb-hero-actions {
    display:     flex;
    flex-direction: column;
    gap:         0.9rem;
    align-items: center;
    justify-content: center;
    width: 100%;
  }
  @media (min-width: 640px) {
    .eb-hero-actions {
      flex-direction: row;
      flex-wrap: wrap;
    }
  }
  .eb-hero-subtitle {
    font-family: 'Playfair Display', ui-serif, Georgia, serif;
    font-size: clamp(24px, 3vw, 34px);
    font-style: italic;
    line-height: 1.25;
    color: var(--accent);
    margin-bottom: 1.25rem;
  }
  .eb-hero-professor {
    font-size: 15px;
    color: var(--fg);
    margin-bottom: 1.25rem;
  }
  .eb-lede { margin-inline: auto; }
  .eb-hero-note {
    font-size: 13px;
    color:     var(--muted-fg);
    flex-basis: 100%;
    text-align: center;
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

  /* ── Bio ── */
  .eb-bio {
    display:    grid;
    gap:        3rem;
    align-items:center;
    justify-items: center;
  }
  @media (min-width: 800px) {
    .eb-bio {
      grid-template-columns: minmax(15rem, 0.7fr) minmax(0, 1fr);
      justify-items: stretch;
    }
  }
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
  .eb-bio-text {
    text-align: center;
  }
  .eb-bio-text .eb-prose {
    margin-inline: auto;
    text-align: center;
  }
  .eb-professor-subtitle {
    font-family: 'Playfair Display', ui-serif, Georgia, serif;
    font-size: clamp(20px, 2.5vw, 28px);
    font-style: italic;
    color: var(--accent);
    text-align: center;
    margin: -0.75rem auto 2.5rem;
  }
  .eb-professor-photo {
    width: 15rem;
    height: 15rem;
    border-radius: 9999px;
    border: 2px solid var(--border);
    object-fit: cover;
    object-position: center top;
  }
  @media (max-width: 799px) {
    .eb-professor-photo {
      width: 11rem;
      height: 11rem;
    }
  }
  .eb-professor-badges {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 0.5rem;
    margin: 0 auto 1.75rem;
  }
  .eb-professor-badge {
    border: 1px solid var(--border);
    padding: 0.125rem 0.5rem;
    font-family: 'Inter', ui-sans-serif, system-ui, sans-serif;
    font-size: 11px;
    font-weight: 500;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--fg);
  }
  .eb-professor-copy {
    max-width: 58ch;
    margin: 0 auto 2rem;
    font-size: 16px;
    line-height: 1.7;
    color: var(--fg);
    text-align: left;
  }
  .eb-professor-stat {
    text-align: center;
    font-family: 'Playfair Display', ui-serif, Georgia, serif;
    font-size: 2rem;
    color: var(--primary);
  }
  .eb-professor-stat span {
    display: block;
    font-family: 'Inter', ui-sans-serif, system-ui, sans-serif;
    font-size: 13px;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--muted-fg);
    margin-top: 0.35rem;
  }
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

  /* ── Aulas ── */
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
  .eb-encontro-num {
    font-size: 18px;
    font-weight: 700;
    color: var(--fg);
    letter-spacing: 0;
    text-transform: none;
  }
  .eb-encontro-label {
    display: block;
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: var(--primary);
    margin-bottom: 0.6rem;
  }
  .eb-encontro h3  { font-size: 20px; font-weight: 400; margin-bottom: 0.75rem; }
  .eb-encontro p   { font-size: 15px; color: var(--muted-fg); line-height: 1.65; }
  .eb-encontro p + p { margin-top: 1rem; }
  @media (max-width: 640px) {
    .eb-encontro {
      grid-template-columns: 1fr;
      gap: 0.75rem;
      padding-block: 2rem;
    }
  }

  /* ── Testimonials continuous marquee ── */
  .eb-testimonials-section {
    padding:    0 0 2rem;
    background: linear-gradient(180deg, var(--bg) 0%, var(--secondary) 45%, var(--bg) 100%);
  }
  .eb-testimonials-section .eb-section-head { margin-bottom: 2rem; }
  .eb-testimonials-viewport {
    overflow: hidden;
    padding: 1.5rem 0 2rem;
    -webkit-mask-image: linear-gradient(90deg, transparent, black 7%, black 93%, transparent);
            mask-image: linear-gradient(90deg, transparent, black 7%, black 93%, transparent);
  }
  .eb-testimonials-track {
    display: flex;
    width: max-content;
    animation: eb-testimonials-scroll 50s linear infinite;
    will-change: transform;
  }
  .eb-testimonials-group {
    display: flex;
    gap: 1.5rem;
    padding-left: 1.5rem;
  }
  .eb-testimonials-viewport:hover .eb-testimonials-track {
    animation-play-state: paused;
  }
  @keyframes eb-testimonials-scroll {
    from { transform: translateX(0); }
    to { transform: translateX(-50%); }
  }
  @media (prefers-reduced-motion: reduce) {
    .eb-testimonials-track { animation: none; }
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
    height:        440px;
    object-fit:    cover;
    border-radius: 12px;
  }
  @media (max-width: 480px) {
    .eb-testimonial { flex-basis: 270px; padding: 0.5rem; }
    .eb-testimonial-image { height: 430px; }
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
  .eb-pricing-wrap h2 em {
    font-family: 'Playfair Display', ui-serif, Georgia, serif;
    font-style: italic;
    font-weight: 400;
  }
  .eb-pricing-grid {
    display:   grid;
    gap:       3rem;
    align-items:start;
  }
  @media (min-width: 640px) { .eb-pricing-grid { grid-template-columns: 1fr 1fr; } }
  .eb-price-label      { font-size: 12px; letter-spacing: 0.1em; text-transform: uppercase; color: var(--muted-fg); margin-bottom: 0.5rem; }
  .eb-price-amount {
    font-family: 'Playfair Display', serif;
    font-size: clamp(34px, 10vw, 48px);
    font-weight: 400;
    letter-spacing: -0.02em;
    white-space: nowrap;
  }
  .eb-investment-subtitle {
    font-family: 'Playfair Display', ui-serif, Georgia, serif;
    font-size: 22px;
    font-style: italic;
    text-align: center;
    color: var(--accent);
    margin: -2rem auto 3rem;
  }
  .eb-offer-panel {
    position: relative;
    background: var(--accent);
    color: var(--accent-fg);
    padding: 2rem;
  }
  .eb-offer-panel * { color: inherit; }
  .eb-lot-badge {
    display: inline-block;
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--primary);
  }
  .eb-old-price {
    font-size: 14px;
    margin: 1.25rem 0 0.75rem;
    opacity: 0.62;
  }
  .eb-lot-price {
    display: grid;
    gap: 0.35rem;
  }
  .eb-lot-price strong {
    font-family: 'Playfair Display', ui-serif, Georgia, serif;
    font-size: clamp(48px, 8vw, 72px);
    font-weight: 400;
    line-height: 1;
  }
  .eb-lot-price em { font-size: 14px; opacity: 0.8; }
  .eb-lot-terms { margin-top: 1rem; font-size: 14px; line-height: 1.55; }
  .eb-referral {
    border: 1px solid var(--primary);
    background: var(--bg);
    padding: 1.5rem;
    margin-top: 1rem;
  }
  .eb-referral-value {
    font-family: 'Playfair Display', ui-serif, Georgia, serif;
    font-size: 36px;
    color: var(--accent);
  }
  .eb-referral strong {
    display: block;
    font-size: 11px;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    margin-block: 0.35rem;
  }
  .eb-referral p { font-size: 14px; color: var(--muted-fg); line-height: 1.55; }
  .eb-referral + .eb-btn { margin-top: 1rem; }
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

  /* ── Brief additions ── */
  .eb-certificate {
    background: var(--secondary);
  }
  .eb-certificate-row {
    display: grid;
    gap: 2.5rem;
    align-items: center;
  }
  @media (min-width: 800px) {
    .eb-certificate-row {
      grid-template-columns: minmax(0, 1fr) minmax(20rem, 0.78fr);
      gap: 4rem;
    }
  }
  .eb-certificate h2 {
    font-size: clamp(28px, 4vw, 40px);
    margin-bottom: 0.85rem;
  }
  .eb-certificate p {
    font-size: 18px;
    line-height: 1.65;
    color: var(--fg);
    max-width: 68ch;
  }
  .eb-certificate-figure { margin: 0; }
  .eb-certificate-image {
    display: block;
    width: 100%;
    height: auto;
    border: 1px solid var(--primary);
    border-radius: var(--radius);
    box-shadow: 0 18px 40px rgba(28,26,46,0.14);
  }
  .eb-certificate-caption {
    margin-top: 0.7rem;
    font-size: 12px;
    color: var(--muted-fg);
    text-align: center;
  }
  .eb-proposal-head {
    max-width: 70ch;
    margin-bottom: 4rem;
  }
  .eb-proposal-head h2 {
    font-size: clamp(32px, 5vw, 52px);
    margin-block: 1.5rem 2rem;
  }
  .eb-proposal-head h2 em {
    color: var(--accent);
  }
  .eb-featured-testimonial {
    padding-block: 5rem;
  }
  @media (min-width: 768px) { .eb-featured-testimonial { padding-block: 7rem; } }
  .eb-featured-quote {
    max-width: 58rem;
    margin: 0 auto;
  }
  .eb-featured-quote blockquote {
    margin: 0;
    font-family: 'Playfair Display', ui-serif, Georgia, serif;
    font-size: clamp(28px, 4vw, 44px);
    line-height: 1.22;
    color: var(--fg);
  }
  .eb-featured-quote figcaption {
    margin-top: 2rem;
    font-size: 14px;
    color: var(--muted-fg);
  }
  .eb-featured-quote strong {
    display: block;
    color: var(--fg);
    font-size: 16px;
    font-weight: 500;
  }
  .eb-guarantee {
    margin-top: 1rem;
    font-size: 14px;
    line-height: 1.55;
    color: var(--muted-fg);
  }

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
  .eb-footer-contact {
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem 1rem;
  }
`;

// ─── Course config ───────────────────────────────────────────────────────────
// Única fonte de verdade para dados da turma. Quando os dados reais chegarem,
// edite SOMENTE aqui — nada mais no arquivo precisa mudar.
const COURSE = {
  datesLabel: "12, 19 e 26 de agosto",
  registrationMessage:
    "Inscrições abertas até agosto. Primeiros compradores com condições especiais de primeiro lote.",
  spotsLabel: "vagas limitadas",
  // Enquanto for '#', CTAs da landing só ancoram na seção de inscrição.
  checkoutUrl: "#",
  // Formato (dependente da turma)
  meetings: "3 aulas ao vivo, semanais",
  // Meta Pixel — colar o ID quando o pixel for criado no Gerenciador de Eventos.
  metaPixelId: "", // TBD
};

const LESSONS = [
  {
    label: "Aula 1",
    meetingLabel: "Encontro 01 · Dia 12 de agosto",
    title: "O debate nature vs. nurture",
    paragraphs: [
      "Em nosso primeiro encontro, abordaremos uma pergunta que atravessou os séculos, desde a Grécia Antiga até a ciência contemporânea: o que forma a nossa personalidade?",
      "Por que algumas pessoas são extrovertidas — adoram festas, shows e multidões — enquanto outras consideram essas situações insuportáveis? Por que algumas são organizadas e disciplinadas, e outras vivem no improviso e procrastinação? Por que algumas atravessam a vida com uma propensão à alegria e resiliência, e outras convivem com uma tristeza quase crônica?",
      "Neste encontro, aprenderemos que a ciência contemporânea — especialmente a partir do fim do século XX — nos conduziu a uma concepção amplíssima sobre as forças que moldam a personalidade. Além das experiências de vida, falaremos sobre o efeito de condições pré-natais, como a inflamação durante a gestação; sobre diferenças genéticas e efeitos epigenéticos; e sobre como tudo isso predispõe as crianças a certos tipos de experiência ao longo da vida.",
      "O debate nature vs. nurture (natureza vs. criação) é o tema central da nossa aula inaugural.",
    ],
  },
  {
    label: "Aula 2",
    meetingLabel: "Encontro 02 · Dia 19 de agosto",
    title: "A mensuração da personalidade e os Big Five",
    paragraphs: [
      "No nosso segundo encontro, o tema central será a mensuração da personalidade: como a combinação de 3 elementos — a teoria dos traços, a estatística e a hipótese lexical — deram fundamento ao modelo mais influente da psicologia contemporânea: o modelo dos cinco grandes fatores da personalidade (Big Five model).",
      "No Big Five, a personalidade é descrita como um conjunto enorme de pequenos traços que se associam em grandes dimensões. Com isso, a discussão conduzida na primeira aula, sobre os efeitos da genética, da epigenética e da criação, será ampliada a partir do emprego dessa ferramenta descritiva oriunda da psicologia.",
      "Os cinco grandes fatores serão explicados desde o princípio, para que o aluno tenha total capacidade de interpretar a pesquisa empírica contemporânea e compreender, por conta própria, o raciocínio por trás do modelo mais estabelecido e famoso da área.",
    ],
  },
  {
    label: "Aula 3",
    meetingLabel: "Encontro 03 · Dia 26 de agosto",
    title: "Implicações dos traços e suas bases biológicas",
    paragraphs: [
      "No nosso terceiro e último encontro, nosso objetivo terá dois lados: estudar as implicações dos traços na vida das pessoas e investigar as bases biológicas a eles relacionadas.",
      "Para cada uma das cinco dimensões, analisaremos os mecanismos biológicos subjacentes mais plausíveis — de sistemas de recompensa a circuitos de ameaça — e o que significa, na prática, pontuar muito alto ou muito baixo em cada traço.",
      "Assim, a ferramenta descritiva construída na segunda aula ganha profundidade: deixamos de apenas descrever a personalidade para compreender suas raízes e seus efeitos concretos na vida humana.",
      "Ao final, exploraremos como outras características conhecidas — como a Dark Triad (narcisismo, maquiavelismo e psicopatia) — podem ser entendidas como determinadas configurações dos cinco grandes fatores, fechando o curso com as ferramentas para que o aluno interprete, por conta própria, qualquer perfil de personalidade.",
    ],
  },
];

// ─── Meta Pixel (scaffold) ───────────────────────────────────────────────────
// Não faz nada enquanto COURSE.metaPixelId estiver vazio.
type MetaPixelFunction = ((...args: unknown[]) => void) & {
  callMethod?: (...args: unknown[]) => void;
  push: MetaPixelFunction;
  loaded: boolean;
  version: string;
  queue: unknown[][];
};

declare global {
  interface Window {
    fbq?: MetaPixelFunction;
    _fbq?: MetaPixelFunction;
  }
}

function useMetaPixel(pixelId: string) {
  useEffect(() => {
    if (!pixelId || typeof window === "undefined" || window.fbq) return;
    const fbq = ((...args: unknown[]) => {
      if (fbq.callMethod) fbq.callMethod(...args);
      else fbq.queue.push(args);
    }) as MetaPixelFunction;
    fbq.push = fbq;
    fbq.loaded = true;
    fbq.version = "2.0";
    fbq.queue = [];
    window.fbq = fbq;
    window._fbq = fbq;
    const s = document.createElement("script");
    s.async = true;
    s.src = "https://connect.facebook.net/en_US/fbevents.js";
    document.head.appendChild(s);
    fbq("init", pixelId);
    fbq("track", "PageView");
  }, [pixelId]);
}

function trackInitiateCheckout() {
  window.fbq?.("track", "InitiateCheckout");
}

function smoothScrollTo(targetId: string, duration = 1100) {
  const target = document.getElementById(targetId);
  if (!target) return;

  const header = document.querySelector<HTMLElement>(".eb-topbar");
  const headerOffset = header?.getBoundingClientRect().height ?? 0;
  const startPosition = window.scrollY;
  const targetPosition = target.getBoundingClientRect().top + startPosition - headerOffset;

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    window.scrollTo(0, targetPosition);
    return;
  }

  const distance = targetPosition - startPosition;
  let startTime: number | null = null;

  const easeInOutCubic = (progress: number) =>
    progress < 0.5 ? 4 * progress * progress * progress : 1 - Math.pow(-2 * progress + 2, 3) / 2;

  const step = (now: number) => {
    if (startTime === null) startTime = now;
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / duration, 1);
    window.scrollTo(0, startPosition + distance * easeInOutCubic(progress));

    if (progress < 1) requestAnimationFrame(step);
  };

  requestAnimationFrame(step);
}

function handleAnchorClick(event: React.MouseEvent<HTMLAnchorElement>, targetId: string) {
  event.preventDefault();
  smoothScrollTo(targetId);
}

// ─── Data ────────────────────────────────────────────────────────────────────
// Replace these with your real content (or wire up to a CMS / props)

const TESTIMONIAL_IMAGES = [
  {
    src: "/depoimento-novo-1.jpeg",
    alt: "Print de depoimento de alunas no WhatsApp sobre a aula",
  },
  {
    src: "/depoimento-novo-2.jpeg",
    alt: "Print de depoimento de alunas no WhatsApp agradecendo pelo aprendizado",
  },
  {
    src: "/depoimento-novo-3.jpeg",
    alt: "Print de depoimento de aluna no WhatsApp sobre o curso de neurociências",
  },
  {
    src: "/depoimento-novo-4.jpeg",
    alt: "Print de depoimento de aluna no WhatsApp sobre didática e qualidade do encontro",
  },
];

// ─── Tiny sub-components ─────────────────────────────────────────────────────

function Divider() {
  return (
    <div className="eb-container eb-container-6xl">
      <div className="eb-divider" />
    </div>
  );
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return <span className="eb-eyebrow">{children}</span>;
}

function signupHref() {
  return COURSE.checkoutUrl === "#" ? "#inscricao" : COURSE.checkoutUrl;
}

function signupTargetProps() {
  return COURSE.checkoutUrl === "#" ? {} : { target: "_blank", rel: "noopener" };
}

function SignupLink({
  children,
  className = "eb-btn eb-btn-primary",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const isInternal = COURSE.checkoutUrl === "#";

  return (
    <a
      href={signupHref()}
      className={className}
      onClick={(event) => {
        trackInitiateCheckout();
        if (isInternal) handleAnchorClick(event, "inscricao");
      }}
      {...signupTargetProps()}
    >
      {children}
    </a>
  );
}

function PaymentLink({
  children,
  className = "eb-btn eb-btn-primary",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <a href="/pagamento" className={className} onClick={trackInitiateCheckout}>
      {children}
    </a>
  );
}

// ─── Testimonials ────────────────────────────────────────────────────────────

function Testimonials() {
  return (
    <section className="eb-testimonials-section">
      <div className="eb-container eb-container-6xl">
        <div className="eb-section-head">
          <Eyebrow>Quem já estudou</Eyebrow>
          <h2 style={{ marginTop: "1.5rem" }}>Depoimentos de alunos</h2>
        </div>
      </div>
      <div className="eb-testimonials-viewport">
        <div className="eb-testimonials-track">
          {[false, true].map((duplicate) => (
            <div
              key={duplicate ? "duplicate" : "original"}
              className="eb-testimonials-group"
              aria-hidden={duplicate || undefined}
            >
              {TESTIMONIAL_IMAGES.map((item) => (
                <figure key={item.src} className="eb-testimonial">
                  <img
                    className="eb-testimonial-image"
                    src={item.src}
                    alt={item.alt}
                    loading="lazy"
                  />
                </figure>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── FAQ (accordion-ready; currently static) ─────────────────────────────────

const FAQ_ITEMS = [
  {
    q: "Para quem é este curso?",
    a: "Para estudantes e profissionais que querem compreender a personalidade a partir de psicologia, genética comportamental e neurociência — sem depender de explicações rasas ou modelos pop.",
  },
  {
    q: "Preciso ter formação prévia em psicologia?",
    a: "Não. O curso parte dos fundamentos, mas mantém densidade suficiente para quem já estuda ou trabalha na área. O conteúdo foi construído para funcionar nos dois casos.",
  },
  {
    q: "As aulas ficam gravadas?",
    a: "Sim. Você terá acesso às gravações após cada encontro, para rever com calma ou acompanhar caso não possa estar ao vivo.",
  },
  {
    q: "Há material de apoio?",
    a: "Sim. Cada aula acompanha material escrito de revisão — organizado para facilitar a retomada dos conceitos sem depender só da memória.",
  },
  {
    q: "O curso oferece certificado?",
    a: "Sim. O certificado de participação é enviado por e-mail após a conclusão do curso.",
  },
  {
    q: "Como funciona o pagamento?",
    a: "A inscrição pode ser paga por cartão de crédito ou boleto direto no site. Para pagar via PIX com desconto, fale diretamente pelo WhatsApp.",
  },
  {
    q: "As aulas são ao vivo — como acesso?",
    a: "Pelo Google Meet. O link é enviado por e-mail após a confirmação do pagamento.",
  },
];

// ─── Main component ───────────────────────────────────────────────────────────

export default function LandingPage() {
  useMetaPixel(COURSE.metaPixelId);

  return (
    <>
      {/* Scoped styles — move to globals.css if you prefer */}
      <style dangerouslySetInnerHTML={{ __html: BRAND_STYLES }} />

      <div className="eb-lp">
        {/* ── TOP BAR ─────────────────────────────────────────────────────── */}
        <header className="eb-topbar">
          <div className="eb-container eb-container-6xl">
            <div className="eb-topbar-inner">
              <div className="eb-wordmark">
                Vicente <em>Cotanda</em>
              </div>
              <div className="eb-topbar-meta" aria-label="Resumo da turma">
                <span>{COURSE.meetings}</span>
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
                <h1>Personalidade</h1>
                <p className="eb-hero-subtitle">Desenvolvimento, Big Five e Psicopatologia</p>
                <p className="eb-hero-professor">com Prof. Me. Vicente Cotanda</p>
                <div className="eb-hero-meta">
                  <span>
                    <strong>{COURSE.datesLabel}</strong>
                  </span>
                  <span className="eb-dot" aria-hidden>
                    ·
                  </span>
                  <span>
                    <strong>{COURSE.spotsLabel}</strong>
                  </span>
                </div>
                <div className="eb-hero-actions">
                  <SignupLink>Quero entrar na turma</SignupLink>
                  <a
                    href="#conteudo"
                    className="eb-btn eb-btn-secondary"
                    onClick={(event) => handleAnchorClick(event, "conteudo")}
                  >
                    Ver conteúdo
                  </a>
                  <span className="eb-hero-note">Aulas ao vivo, gravações e certificado.</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── PROGRAMAÇÃO ─────────────────────────────────────────────────── */}
        <section className="eb-section" id="conteudo">
          <div className="eb-container eb-container-6xl">
            <div className="eb-section-head">
              <Eyebrow>Programação</Eyebrow>
              <h2 style={{ marginTop: "1.5rem" }}>A programação das aulas</h2>
              <p className="eb-lede" style={{ margin: "1rem auto 0" }}>
                19h45 às 21h00 · via Google Meet
              </p>
            </div>
            <div className="eb-encontros">
              {LESSONS.map((lesson) => (
                <div key={lesson.label} className="eb-encontro">
                  <span className="eb-encontro-num">{lesson.label}</span>
                  <div>
                    <span className="eb-encontro-label">{lesson.meetingLabel}</span>
                    <h3>{lesson.title}</h3>
                    {lesson.paragraphs.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <Divider />

        {/* ── PROFESSOR ───────────────────────────────────────────────────── */}
        <section className="eb-section">
          <div className="eb-container eb-container-6xl">
            <div className="eb-bio">
              <img
                src="/vicente-foto.jpg"
                alt="Prof. Me. Vicente Cotanda"
                className="eb-professor-photo"
              />
              <div className="eb-bio-text">
                <div className="eb-bio-label">Sobre o professor</div>
                <h2>Prof. Me. Vicente Cotanda</h2>
                <p className="eb-professor-subtitle">
                  Pesquisador em psicologia, genética comportamental e neuroimagem
                </p>
                <div className="eb-professor-badges" aria-label="Credenciais e afiliações">
                  <span className="eb-professor-badge">Mestrado em filosofia</span>
                  <span className="eb-professor-badge">CAPES-PDSE</span>
                  <span className="eb-professor-badge">InsCer-RS</span>
                  <span className="eb-professor-badge">Nathan Kline Institute</span>
                  <span className="eb-professor-badge">Palestrante</span>
                </div>
                <p className="eb-professor-copy">
                  Mestre em filosofia com a dissertação{" "}
                  <em>"An Interdisciplinary Analysis of Behavioral Genetics"</em>, aprovada com
                  louvor. Bolsista CAPES-PDSE, pesquisador do Instituto do Cérebro do Rio Grande do
                  Sul em colaboração com o Nathan Kline Institute, em New York, e palestrante nas
                  áreas de genética comportamental, neuroimagem e interdisciplinaridade na
                  psicologia.
                </p>
                <div className="eb-professor-stat">
                  200+
                  <span>alunos certificados em aulas online</span>
                </div>
              </div>
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
              <div className="eb-pricing-label">Investimento · Prof Vicente Cotanda</div>
              <h2>Entre na próxima turma</h2>
              <p className="eb-investment-subtitle">Curso completo · 3 encontros ao vivo</p>
              <div className="eb-pricing-grid">
                <div>
                  <div className="eb-price-label">O que está incluso</div>
                  <ul className="eb-price-checklist">
                    <li>Gravação das aulas completas por 12 meses</li>
                    <li>Certificado assinado</li>
                    <li>Material exclusivo para estudo e revisão</li>
                    <li>Descontos em eventos futuros</li>
                  </ul>
                  <div className="eb-price-meta">
                    <span>
                      Datas: <strong>{COURSE.datesLabel}</strong>
                    </span>
                    <span>
                      Horário: <strong>19h45 às 21h00</strong>
                    </span>
                    <span>
                      Plataforma: <strong>Google Meet</strong>
                    </span>
                  </div>
                </div>
                <div>
                  <div className="eb-offer-panel">
                    <span className="eb-lot-badge">1º LOTE</span>
                    <p className="eb-old-price">
                      De <s>R$ 1.299,00</s> por
                    </p>
                    <div className="eb-lot-price">
                      <strong>R$ 979,00</strong>
                      <em>no Pix, à vista</em>
                    </div>
                    <p className="eb-lot-terms">
                      ou em até <strong>9x sem juros</strong> no cartão. Condições de primeiro lote.
                    </p>
                  </div>
                  <div className="eb-referral">
                    <div className="eb-referral-value">R$ 150 de volta</div>
                    <strong>Indique e ganhe</strong>
                    <p>Traga um(a) colega que se inscreva e receba R$ 150 de volta.</p>
                  </div>
                  <PaymentLink className="eb-btn eb-btn-primary eb-btn-wide">
                    Inscrever-se
                  </PaymentLink>
                  <p className="eb-price-includes" style={{ marginTop: "1rem", marginBottom: 0 }}>
                    {COURSE.registrationMessage}
                  </p>
                  <p className="eb-guarantee">
                    Garantia incondicional de 7 dias — pagamento processado via Mercado Pago.
                    <br />
                    Se não for para você, devolvemos integralmente.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <Divider />

        {/* ── CERTIFICADO ───────────────────────────────────────────────────── */}
        <section className="eb-section eb-certificate">
          <div className="eb-container eb-container-6xl">
            <div className="eb-certificate-row">
              <div>
                <h2>Você sai com certificado</h2>
                <p>
                  Ao concluir as três aulas, você recebe um certificado de conclusão por e-mail,
                  emitido em seu nome, com carga horária de 6 horas. Válido para registro em
                  atividades complementares e desenvolvimento profissional.
                </p>
              </div>
              <figure className="eb-certificate-figure">
                <img
                  className="eb-certificate-image"
                  src={certificateModel}
                  alt="Modelo do certificado de conclusão do curso"
                  loading="lazy"
                />
                <figcaption className="eb-certificate-caption">
                  Modelo ilustrativo do certificado.
                </figcaption>
              </figure>
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
                <h2>
                  Antes de
                  <br />
                  se inscrever.
                </h2>
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

        <Divider />

        {/* ── CTA FINAL ───────────────────────────────────────────────────── */}
        <section className="eb-final-cta">
          <div className="eb-container eb-container-3xl">
            <p className="eb-final-cta-eyebrow">Próxima turma confirmada:</p>
            <h2>
              Aulas em
              <br />
              <em>{COURSE.datesLabel}.</em>
            </h2>
            <SignupLink>Quero entrar na turma</SignupLink>
            <div className="eb-final-cta-vagas">{COURSE.registrationMessage}</div>
          </div>
        </section>

        {/* ── FOOTER ──────────────────────────────────────────────────────── */}
        <footer className="eb-footer">
          <div className="eb-container eb-container-6xl">
            <div className="eb-footer-inner">
              <div className="eb-wordmark">
                Vicente <em>Cotanda</em>
              </div>
              <div className="eb-footer-contact" aria-label="Contato">
                <a href="mailto:vdcotanda@gmail.com">vdcotanda@gmail.com</a>
                <a href="tel:+5551993545506">+55 51 99354-5506</a>
              </div>
              <span>© 2026 Vicente Cotanda Cursos. Todos os direitos reservados.</span>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
