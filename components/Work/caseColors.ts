// Bold/subtle pairs per design.md §4/§11 — bold = full card background,
// subtle = highlight-box background behind title/description.
export const CASE_COLORS: Record<string, { bold: string; subtle: string }> = {
  "arco-agent": {
    bold: "var(--color-case-navy)",
    subtle: "var(--color-case-ice-blue)",
  },
  "drykorn-plm": {
    bold: "var(--color-case-charcoal)",
    subtle: "var(--color-case-cream)",
  },
  "drykorn-suits-system": {
    bold: "var(--color-case-brown)",
    subtle: "var(--color-case-tan)",
  },
  "arco-rules": {
    bold: "var(--color-case-deep-green)",
    subtle: "var(--color-case-blush)",
  },
};
