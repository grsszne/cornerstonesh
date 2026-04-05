// Arc design tokens — references to --arc-* CSS variables in globals.css
// Mirrors the token system used by the real Arc app at /home/arc/

export const T = {
  surfacePage:       "var(--arc-surface-page)",
  surfaceCard:       "var(--arc-surface-card)",
  surfaceRaised:     "var(--arc-surface-raised)",
  textPrimary:       "var(--arc-text-primary)",
  textSecondary:     "var(--arc-text-secondary)",
  textTertiary:      "var(--arc-text-tertiary)",
  borderSubtle:      "var(--arc-border-subtle)",
  borderDefault:     "var(--arc-border-default)",
  statusHealthy:     "var(--arc-status-healthy)",
  statusWarning:     "var(--arc-status-warning)",
  statusError:       "var(--arc-status-error)",
  providerOpenai:    "var(--arc-provider-openai)",
  providerAnthropic: "var(--arc-provider-anthropic)",
  providerGoogle:    "var(--arc-provider-google)",
};

export const SWATCH = {
  clay:  { bg: "var(--arc-clay-bg)",  fg: "var(--arc-clay-fg)"  },
  moss:  { bg: "var(--arc-moss-bg)",  fg: "var(--arc-moss-fg)"  },
  ochre: { bg: "var(--arc-ochre-bg)", fg: "var(--arc-ochre-fg)" },
  dusk:  { bg: "var(--arc-dusk-bg)",  fg: "var(--arc-dusk-fg)"  },
  slate: { bg: "var(--arc-slate-bg)", fg: "var(--arc-slate-fg)" },
  mauve: { bg: "var(--arc-mauve-bg)", fg: "var(--arc-mauve-fg)" },
  pine:  { bg: "var(--arc-pine-bg)",  fg: "var(--arc-pine-fg)"  },
  stone: { bg: "var(--arc-stone-bg)", fg: "var(--arc-stone-fg)" },
  sand:  { bg: "var(--arc-sand-bg)",  fg: "var(--arc-sand-fg)"  },
};

// Arc's typography scale (Ronzino serif throughout via font-sans/font-mono)
export const TYPE = {
  // Display headlines — page-scale
  displayXL: { fontSize: "clamp(52px, 7.5vw, 96px)", fontWeight: 300, letterSpacing: "-0.025em", lineHeight: 1.02 },
  displayL:  { fontSize: "clamp(40px, 5.5vw, 68px)",  fontWeight: 300, letterSpacing: "-0.022em", lineHeight: 1.05 },
  displayM:  { fontSize: "clamp(32px, 4.2vw, 52px)",  fontWeight: 300, letterSpacing: "-0.02em",  lineHeight: 1.08 },

  // Body
  body:      { fontSize: "16px", fontWeight: 400, letterSpacing: "0",       lineHeight: 1.55 },
  bodySm:    { fontSize: "13px", fontWeight: 400, letterSpacing: "0",       lineHeight: 1.55 },
  bodyLg:    { fontSize: "19px", fontWeight: 400, letterSpacing: "-0.005em", lineHeight: 1.5 },

  // The signature Arc eyebrow label — mono, uppercase, letter-spaced
  eyebrow:   { fontSize: "10px",  fontWeight: 500, letterSpacing: "0.14em", textTransform: "uppercase" },
  metaLabel: { fontSize: "9px",   fontWeight: 500, letterSpacing: "0.12em", textTransform: "uppercase" },
  statLabel: { fontSize: "10.5px", fontWeight: 500, letterSpacing: "0.06em", textTransform: "uppercase" },
};

// Shared section chrome
export const SECTION = {
  wrap: {
    background: T.surfacePage,
    color: T.textPrimary,
    fontFamily: "'Ronzino', Georgia, serif",
    borderTop: `1px solid ${T.borderSubtle}`,
  },
  inner: {
    maxWidth: 1180,
    margin: "0 auto",
    padding: "clamp(96px, 12vw, 160px) clamp(24px, 5vw, 56px)",
  },
};

// Tiny helper: the Arc pill (same visual as UseCasePill in the real app)
export function pillStyle(color = "stone", size = "sm") {
  const s = SWATCH[color] || SWATCH.stone;
  return {
    display: "inline-flex",
    alignItems: "center",
    gap: size === "md" ? 5 : 4,
    padding: size === "md" ? "3px 9px" : "2px 7px",
    borderRadius: 4,
    background: s.bg,
    fontSize: size === "md" ? 11 : 10,
    letterSpacing: "0.04em",
    color: s.fg,
    whiteSpace: "nowrap",
    fontFamily: "'Ronzino', Georgia, serif",
  };
}

export function dotStyle(color = "stone", size = 4) {
  const s = SWATCH[color] || SWATCH.stone;
  return {
    display: "inline-block",
    width: size,
    height: size,
    borderRadius: "50%",
    background: s.fg,
    flexShrink: 0,
  };
}
