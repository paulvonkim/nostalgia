// Classic 3.5" floppy silhouette: square body with the notched top-right
// corner, a dark metal shutter (with a small cutout for the slide tab),
// and a label area. Hand-designed, fixed white/black palette.
//
// Rendered at 28x28 (viewBox stays a 24-unit coordinate system for the
// artwork itself) to match StampIcon/LinkedInIcon's optical size — this
// used to render at a native 24px while the other two rendered at 28px,
// the main reason the three didn't read as one set.
//
// strokeWidth 0.857 (6/7), not a round number: DesktopIcon.module.css's
// .glyph applies its own separate transform: scale(2) on top of this
// SVG's own viewBox-to-28px scaling (28/24, ≈1.167x) — total scale
// ≈2.333x. 0.857 × 2.333 ≈ 2, a true 2px stroke as actually rendered on
// screen. (First pass missed that outer scale(2) and only matched the
// *other* icons' raw stroke-width attributes, which — for the same
// reason — were themselves rendering at 4px, not 2px; see stamp.svg /
// linkedin-outlined.svg, both corrected to stroke-width 1 alongside
// this.) No strokeLinejoin: default miter gives sharp (0-radius)
// corners, same as the other two.
export function FloppyDiskIcon() {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M3 2H17L21 6V21H3Z"
        fill="#fff"
        stroke="#000"
        strokeWidth="0.857"
      />
      <rect x="7" y="3" width="9" height="6" fill="#000" />
      <rect x="12" y="3" width="2" height="3" fill="#fff" />
      <rect
        x="5"
        y="13"
        width="14"
        height="7"
        fill="#fff"
        stroke="#000"
        strokeWidth="0.857"
      />
    </svg>
  );
}
