import Image from "next/image";

// LinkedIn's actual published brand asset (public/images/home/linkedin-outlined.svg),
// not a hand-drawn approximation — rendered as-is, unmodified, per brand guidelines.
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
