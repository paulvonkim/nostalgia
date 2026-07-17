import Image from "next/image";

// Impressum icon — public/images/home/stamp.svg. A stamp, not a hard
// drive: "Impressum" is German for imprint, the same word as the mark a
// physical stamp leaves — the icon plays on the term's own etymology
// rather than reusing the classic-Mac hard-drive convention.
export function StampIcon() {
  return (
    <Image
      src="/images/home/stamp.svg"
      alt=""
      width={28}
      height={28}
      unoptimized
    />
  );
}
