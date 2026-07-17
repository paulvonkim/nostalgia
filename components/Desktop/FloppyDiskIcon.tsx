// Classic 3.5" floppy silhouette: square body with the notched top-right
// corner, a dark metal shutter (with a small cutout for the slide tab),
// and a label area. Hand-designed, fixed white/black palette.
export function FloppyDiskIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M3 2H17L21 6V21H3Z"
        fill="#fff"
        stroke="#000"
        strokeWidth="1.5"
        strokeLinejoin="round"
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
        strokeWidth="1"
      />
    </svg>
  );
}
