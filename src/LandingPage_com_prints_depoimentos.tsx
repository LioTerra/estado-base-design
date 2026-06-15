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
  .eb-topbar-link {
    color:           var(--fg);
    text-decoration: none;
    font-size:       12px;
    letter-spacing:  0.08em;
    text-transform:  uppercase;
  }
  .eb-topbar-link:hover { color: var(--accent); }

  /* ── Hero ── */
  .eb-hero { padding-block: 5rem 4.5rem; }
  @media (min-width: 768px) { .eb-hero { padding-block: 7rem 5.5rem; } }
  .eb-hero-grid {
    display: grid;
    gap:     3rem;
    align-items: center;
  }
  @media (min-width: 960px) {
    .eb-hero-grid { max-width: 56rem; }
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
  @media (min-width: 768px) { .eb-bio { grid-template-columns: 1fr; } }
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

  /* ── Brief additions ── */
  .eb-video-section {
    background: #0F0E1A;
    color:      #F4F0EA;
    padding-block: 5rem;
  }
  @media (min-width: 768px) { .eb-video-section { padding-block: 6.5rem; } }
  .eb-video-grid {
    display: grid;
    gap:     3rem;
    align-items: center;
  }
  @media (min-width: 900px) { .eb-video-grid { grid-template-columns: 1fr; } }
  .eb-video-section .eb-eyebrow { color: var(--primary); }
  .eb-video-section .eb-eyebrow::before { background: var(--primary); }
  .eb-video-title {
    color:        #F4F0EA;
    font-size:    clamp(32px, 5vw, 52px);
    margin-top:   1.25rem;
  }
  .eb-video-frame {
    position: relative;
    aspect-ratio: 16 / 9;
    width: 100%;
    overflow: hidden;
    border: 1px solid rgba(244,240,234,0.24);
    background: rgba(244,240,234,0.04);
  }
  .eb-video-placeholder {
    position: absolute;
    inset: 0;
    display: grid;
    place-items: center;
    width: 100%;
    border: 0;
    color: #F4F0EA;
    background: transparent;
    cursor: pointer;
  }
  .eb-video-play {
    display: grid;
    place-items: center;
    width: 4.5rem;
    height: 4.5rem;
    border: 1px solid rgba(244,240,234,0.55);
    border-radius: 999px;
  }
  .eb-video-play::before {
    content: '';
    display: block;
    margin-left: 0.25rem;
    width: 0;
    height: 0;
    border-top: 0.55rem solid transparent;
    border-bottom: 0.55rem solid transparent;
    border-left: 0.8rem solid currentColor;
  }
  .eb-video-iframe {
    display: block;
    width: 100%;
    height: 100%;
    border: 0;
  }
  .eb-video-soon {
    position:        absolute;
    inset:           0;
    display:         flex;
    align-items:     center;
    justify-content: center;
  }
  .eb-video-soon span {
    font-size:       12px;
    letter-spacing:  0.2em;
    text-transform:  uppercase;
    color:           rgba(244,240,234,0.55);
    border:          1px solid rgba(244,240,234,0.25);
    padding:         0.6rem 1.1rem;
  }
  .eb-certificate {
    background: var(--secondary);
  }
  .eb-certificate-row {
    display: grid;
    grid-template-columns: auto 1fr;
    gap: 1.25rem;
    align-items: start;
    max-width: 58rem;
  }
  .eb-certificate-icon {
    position: relative;
    width: 3.25rem;
    height: 4rem;
    border: 1px solid var(--accent);
    background: var(--bg);
    box-shadow: 0 10px 30px rgba(28,26,46,0.08);
  }
  .eb-certificate-icon::before {
    content: '';
    position: absolute;
    top: -1px;
    right: -1px;
    width: 1rem;
    height: 1rem;
    border-left: 1px solid var(--accent);
    border-bottom: 1px solid var(--accent);
    background: var(--secondary);
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
  .eb-outcomes-label {
    font-size:      11px;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color:          var(--muted-fg);
    margin-bottom:  1.25rem;
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
  // Link do checkout. Enquanto for '#', o botão só ancora na seção.
  checkoutUrl: 'https://mpago.li/1s8xuTe',
  // Formato (dependente da turma)
  duration: '3 semanas',
  meetings: '3 aulas ao vivo, semanais',
  schedule: 'Quartas, 19h45–21h (horário de Brasília)',
  workload: '4h30 de encontros síncronos',
  // Meta Pixel — colar o ID quando o pixel for criado no Gerenciador de Eventos.
  metaPixelId: '',                      // TBD
}

const VIDEO_URL = ''

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
    src: '/depoimento-novo-1.jpeg',
    alt: 'Print de depoimento de alunas no WhatsApp sobre a aula',
  },
  {
    src: '/depoimento-novo-2.jpeg',
    alt: 'Print de depoimento de alunas no WhatsApp agradecendo pelo aprendizado',
  },
  {
    src: '/depoimento-novo-3.jpeg',
    alt: 'Print de depoimento de aluna no WhatsApp sobre o curso de neurociências',
  },
  {
    src: '/depoimento-novo-4.jpeg',
    alt: 'Print de depoimento de aluna no WhatsApp sobre didática e qualidade do encontro',
  },
  {
    src: '/depoimento-novo-5.jpeg',
    alt: 'Print de depoimento de aluna no WhatsApp sobre didática e inscrição',
  },
  {
    src: '/depoimento-novo-6.jpeg',
    alt: 'Print de depoimento de aluna no WhatsApp sobre bibliografia e aproveitamento da aula',
  },
  {
    src: '/depoimento-novo-7.jpeg',
    alt: 'Print ampliado de depoimento de aluna no WhatsApp sobre a aula',
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

function signupTargetProps() {
  return COURSE.checkoutUrl === '#'
    ? {}
    : { target: '_blank', rel: 'noopener' }
}

function SignupLink({
  children,
  className = 'eb-btn eb-btn-primary',
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <a
      href={signupHref()}
      className={className}
      onClick={trackInitiateCheckout}
      {...signupTargetProps()}
    >
      {children}
    </a>
  )
}

// ─── Testimonials (with seamless marquee loop) ───────────────────────────────

function VideoSection() {
  return (
    <section className="eb-video-section" aria-label="Vídeo do curso">
      <div className="eb-container eb-container-6xl">
        <div className="eb-video-grid">
          <div className="eb-video-frame">
            {VIDEO_URL ? (
              <iframe
                className="eb-video-iframe"
                src={VIDEO_URL}
                title="Vídeo do curso"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            ) : (
              <div className="eb-video-soon" aria-label="Vídeo em breve">
                <span>Vídeo em breve</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

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
    a: 'Para estudantes e profissionais que querem compreender a personalidade a partir de psicologia, genética comportamental e neurociência — sem depender de explicações rasas ou modelos pop.',
  },
  {
    q: 'Preciso ter formação prévia em psicologia?',
    a: 'Não. O curso parte dos fundamentos, mas mantém densidade suficiente para quem já estuda ou trabalha na área. O conteúdo foi construído para funcionar nos dois casos.',
  },
  {
    q: 'As aulas ficam gravadas?',
    a: 'Sim. Você terá acesso às gravações após cada encontro, para rever com calma ou acompanhar caso não possa estar ao vivo.',
  },
  {
    q: 'Há material de apoio?',
    a: 'Sim. Cada aula acompanha material escrito de revisão — organizado para facilitar a retomada dos conceitos sem depender só da memória.',
  },
  {
    q: 'O curso oferece certificado?',
    a: 'Sim. O certificado de participação é enviado por e-mail após a conclusão do curso.',
  },
  {
    q: 'Como funciona o pagamento?',
    a: 'A inscrição é feita online, com pagamento seguro via Mercado Pago. Você pode pagar por PIX, cartão de crédito ou boleto.',
  },
  {
    q: 'As aulas são ao vivo — como acesso?',
    a: 'Pelo Google Meet. O link é enviado por e-mail após a confirmação do pagamento.',
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
                  Um percurso por psicologia, genética comportamental e neurociência
                  — com rigor conceitual e sem reducionismos.
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
                    Ver conteúdo
                  </a>
                  <span className="eb-hero-note">Aulas ao vivo, gravações e certificado.</span>
                </div>
              </div>

            </div>
          </div>
        </section>

        <VideoSection />

        {/* ── A PROPOSTA ──────────────────────────────────────────────────── */}
        <section className="eb-section" id="conteudo">
          <div className="eb-container eb-container-6xl">
            <div className="eb-proposal-head">
              <Eyebrow>A proposta</Eyebrow>
              <h2>
                Pensar a personalidade <em>sem simplificar o humano.</em>
              </h2>
              <div className="eb-prose">
                <p>
                  Explicações sobre personalidade costumam cair em dois extremos: ou reduzem tudo ao cérebro e à genética, ou tratam o sujeito como produto exclusivo de suas experiências. Os dois extremos simplificam.
                </p>
                <p>
                  Este curso percorre uma terceira via. A pergunta não é "genes ou ambiente?" — é como esses fatores interagem. Como o temperamento inato se combina com vínculos, traumas, grupos sociais e maturação cerebral para formar padrões relativamente estáveis de emoção, cognição e comportamento.
                </p>
                <p>
                  Personalidade como fenômeno estável, mas não fixo. Biológico, mas não determinista. Individual, mas sempre atravessado por história de vida, cultura e ambiente.
                </p>
              </div>
            </div>
            <div className="eb-outcomes-label">O que você levará</div>
            <ol className="eb-outcomes">
              {[
                'Saber o que diferencia temperamento, personalidade e traços — e por que confundir essas categorias compromete tanto a pesquisa quanto a clínica.',
                'Compreender os Big Five não como teste de autoconhecimento, mas como modelo dimensional construído sobre décadas de pesquisa psicométrica — com suas forças e seus limites.',
                'Pensar o debate genética–ambiente a partir da evidência real: poligenia, estudos com gêmeos, interação gene-ambiente e por que o ambiente também é parcialmente herdado geneticamente.',
                'Integrar ambiente pré-natal, maturação do córtex pré-frontal, epigenética, adolescência e soma de riscos e proteções numa compreensão coerente da personalidade adulta.',
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
            <div className="eb-section-head">
              <Eyebrow>Os encontros</Eyebrow>
              <h2 style={{ marginTop: '1.5rem' }}>
                O caminho <em>encontro a encontro.</em>
              </h2>
            </div>
            <div className="eb-encontros">
              {[
                ['Introdução ao estudo da personalidade', 'O que é personalidade, como ela se diferencia de temperamento e traços, por que os modelos dimensionais como os Big Five superaram as abordagens categóricas, e o que está em jogo quando pensamos estabilidade e mudança ao longo da vida.'],
                ['Genética e ambiente', 'Uma travessia pelo debate nature vs. nurture a partir da genética comportamental contemporânea: estudos com gêmeos, poligenia, GWAS, eventos biográficos recorrentes e a ideia — contraintuitiva — de que o ambiente também é parcialmente construído pelas disposições genéticas do indivíduo.'],
                ['Cérebro e comportamento', 'Do ambiente pré-natal e da exposição hormonal gestacional à maturação tardia do córtex pré-frontal, passando pela adolescência como período de risco e aprendizagem, epigenética, grupos sociais e pela lógica de soma de riscos e proteções que define, em grande parte, a trajetória da personalidade adulta.'],
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

        {/* ── ENCONTROS ───────────────────────────────────────────────────── */}
        <section className="eb-section">
          <div className="eb-container eb-container-6xl">
            <div className="eb-bio">
              <div className="eb-bio-text">
                <div className="eb-bio-label">Quem conduz</div>
                <h2>Vicente Cotanda.</h2>
                <div className="eb-prose">
                  <p><strong>Psicólogo · Mestre em filosofia (nature vs. nurture) · Doutorando em neuroimagem · Pesquisador no InsCer-RS</strong></p>
                  <p>Psicólogo e mestre em filosofia, com pesquisa centrada no debate nature vs. nurture, Vicente Dall'Igna Cotanda é doutorando em neuroimagem e pesquisador no Instituto do Cérebro do RS (InsCer). Seu trabalho transita entre psicologia da personalidade, genética comportamental, neurodesenvolvimento e filosofia da ciência.</p>
                  <p>O curso reflete esse percurso: rigor conceitual, didática clara e disposição para tratar ideias difíceis com o tempo que elas merecem.</p>
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
                    <span>Duração: <strong>{COURSE.duration}</strong></span>
                    <span>Formato: <strong>{COURSE.meetings}</strong></span>
                    <span>Horário: <strong>{COURSE.schedule}</strong></span>
                    <span>Vagas: <strong>{COURSE.spots} · Inscrições até 17 de junho</strong></span>
                  </div>
                </div>
                <div>
                  <p className="eb-price-includes">
                    Você entra para uma turma ao vivo, acompanha as aulas com Vicente
                    e recebe o material para revisar depois sem depender só da memória.
                  </p>
                  <ul className="eb-price-checklist">
                    <li>{COURSE.meetings}</li>
                    <li>Gravações para rever no seu ritmo</li>
                    <li>Material escrito de revisão</li>
                    <li>Certificado de participação</li>
                  </ul>
                  <SignupLink className="eb-btn eb-btn-primary eb-btn-wide">Quero me inscrever</SignupLink>
                  <p className="eb-guarantee">
                    Garantia incondicional de 7 dias — pagamento processado via Mercado Pago.<br />
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
              <span className="eb-certificate-icon" aria-hidden />
              <div>
                <h2>Você sai com certificado.</h2>
                <p>
                  Ao concluir os três encontros, você recebe um certificado de participação por e-mail,
                  emitido em seu nome. Válido para registro em atividades complementares e
                  desenvolvimento profissional.
                </p>
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

        <Divider />

        {/* ── CTA FINAL ───────────────────────────────────────────────────── */}
        <section className="eb-final-cta">
          <div className="eb-container eb-container-3xl">
            <p className="eb-final-cta-eyebrow">Próxima turma confirmada:</p>
            <h2>
              As aulas começam em<br />
              <em>{COURSE.startDateLabel}.</em>
            </h2>
            <SignupLink>Quero entrar na turma</SignupLink>
            <div className="eb-final-cta-vagas">Inscrições abertas até 17 de junho.</div>
          </div>
        </section>

        {/* ── FOOTER ──────────────────────────────────────────────────────── */}
        <footer className="eb-footer">
          <div className="eb-container eb-container-6xl">
            <div className="eb-footer-inner">
              <div className="eb-wordmark">Vicente <em>Cotanda</em></div>
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
  )
}
