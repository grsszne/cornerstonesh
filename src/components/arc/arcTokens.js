// Arc design tokens — references to --arc-* CSS variables in globals.css
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
  providerOpenai:    "var(--arc-provider-openai)",
  providerAnthropic: "var(--arc-provider-anthropic)",
  providerGoogle:    "var(--arc-provider-google)",
};

export const SECTION = {
  wrap: {
    background: T.surfacePage,
    color: T.textPrimary,
    fontFamily: "'Ronzino', Georgia, serif",
  },
  inner: {
    maxWidth: 1120,
    margin: "0 auto",
    padding: "clamp(120px, 16vw, 200px) clamp(24px, 5vw, 56px)",
  },
};

// Minimal button — inverted primary, Arc's signature CTA
export const BUTTON = {
  primary: {
    display: "inline-block",
    padding: "14px 24px",
    background: T.textPrimary,
    color: T.surfacePage,
    border: "none",
    borderRadius: 4,
    fontFamily: "'Ronzino', Georgia, serif",
    fontSize: 13,
    fontWeight: 500,
    letterSpacing: 0,
    textDecoration: "none",
    cursor: "pointer",
    transition: "opacity 120ms ease",
  },
  ghost: {
    display: "inline-block",
    padding: "14px 24px",
    background: "transparent",
    color: T.textPrimary,
    border: `1px solid ${T.borderDefault}`,
    borderRadius: 4,
    fontFamily: "'Ronzino', Georgia, serif",
    fontSize: 13,
    fontWeight: 500,
    letterSpacing: 0,
    textDecoration: "none",
    cursor: "pointer",
    transition: "border-color 120ms ease",
  },
};

// Display typography — single source of truth
export const TYPE = {
  displayXL: { fontSize: "clamp(56px, 8vw, 112px)", fontWeight: 300, letterSpacing: "-0.03em",  lineHeight: 1.02 },
  displayL:  { fontSize: "clamp(42px, 5.6vw, 72px)", fontWeight: 300, letterSpacing: "-0.025em", lineHeight: 1.05 },
  displayM:  { fontSize: "clamp(32px, 4.2vw, 54px)", fontWeight: 300, letterSpacing: "-0.02em",  lineHeight: 1.08 },
  body:      { fontSize: 17, fontWeight: 400, lineHeight: 1.55, color: T.textSecondary },
  bodyLg:    { fontSize: 19, fontWeight: 400, lineHeight: 1.5,  color: T.textSecondary, letterSpacing: "-0.005em" },
};
