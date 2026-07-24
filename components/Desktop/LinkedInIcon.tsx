import Image from "next/image";

// Custom "in" glyph (public/images/home/linkedin-outlined.svg), supplied
// directly to replace the earlier reshaped version of LinkedIn's
// published mark — no bordered-square frame this time, just the glyph
// itself with its own 2px stroke, natively 49x49. Rendered here at
// 28x28 like the other two desktop icons for the same optical
// footprint, but note the stroke won't land at a literal 2px on screen:
// between this SVG's own scale-down (28/49) and .glyph's separate
// transform: scale(2) in DesktopIcon.module.css, the 2px stroke in the
// source renders at roughly 2.3px. Left as given rather than
// recalculated, since the value was provided explicitly.
export function LinkedInIcon() {
  return (
    <Image
      src="/images/home/linkedin-outlined.svg"
      alt=""
      width={28}
      height={28}
      unoptimized
    />
  );
}
