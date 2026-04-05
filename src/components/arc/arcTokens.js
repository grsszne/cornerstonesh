// Arc design tokens — references to --arc-* CSS variables in globals.css
export const T = {
  surfacePage:   "var(--arc-surface-page)",
  surfaceCard:   "var(--arc-surface-card)",
  textPrimary:   "var(--arc-text-primary)",
  textSecondary: "var(--arc-text-secondary)",
  textTertiary:  "var(--arc-text-tertiary)",
  borderSubtle:  "var(--arc-border-subtle)",
  borderDefault: "var(--arc-border-default)",
};

export const SECTION = {
  wrap: {
    background: T.surfacePage,
    color: T.textPrimary,
    fontFamily: "'Ronzino', Georgia, serif",
  },
  inner: {
    maxWidth: 920,
    margin: "0 auto",
    padding: "clamp(140px, 18vw, 220px) clamp(24px, 5vw, 56px)",
    textAlign: "center",
  },
};

export const BUTTON = {
  primary: {
    display: "inline-block",
    padding: "14px 26px",
    background: T.textPrimary,
    color: T.surfacePage,
    border: "none",
    borderRadius: 4,
    fontFamily: "'Ronzino', Georgia, serif",
    fontSize: 14,
    fontWeight: 500,
    textDecoration: "none",
    cursor: "pointer",
    transition: "opacity 120ms ease",
  },
  ghost: {
    display: "inline-block",
    padding: "14px 26px",
    background: "transparent",
    color: T.textPrimary,
    border: `1px solid ${T.borderDefault}`,
    borderRadius: 4,
    fontFamily: "'Ronzino', Georgia, serif",
    fontSize: 14,
    fontWeight: 500,
    textDecoration: "none",
    cursor: "pointer",
    transition: "border-color 120ms ease",
  },
};

export const TYPE = {
  displayXL: { fontSize: "clamp(48px, 6.5vw, 88px)", fontWeight: 300, letterSpacing: "-0.028em", lineHeight: 1.05 },
  displayL:  { fontSize: "clamp(38px, 5vw, 64px)",   fontWeight: 300, letterSpacing: "-0.025em", lineHeight: 1.08 },
  displayM:  { fontSize: "clamp(28px, 3.6vw, 44px)", fontWeight: 300, letterSpacing: "-0.02em",  lineHeight: 1.12 },
  body:      { fontSize: 18, fontWeight: 400, lineHeight: 1.55, color: T.textSecondary },
  bodyLg:    { fontSize: 20, fontWeight: 400, lineHeight: 1.5,  color: T.textSecondary, letterSpacing: "-0.005em" },
};
