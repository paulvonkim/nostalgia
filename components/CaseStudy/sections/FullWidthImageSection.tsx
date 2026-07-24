import Image from "next/image";
import { SectionWindow } from "@/components/CaseStudy/SectionWindow";
import styles from "./FullWidthImageSection.module.css";

interface FullWidthImageSectionProps {
  image: { url: string; alt: string };
  caption?: string;
}

// Wider nested-window frame, caption in a bottom status-bar strip (not a
// floating web caption). No hover-zoom, no lightbox, no dimmed overlay —
// plain static image. No ASCII/dither effect — that's Hero/About only.
//
// size="wide" (848px, matching SectionRenderer's .stack column), not
// "medium" (600px) — SectionWindow.tsx's own size-hierarchy comment
// already documents full-width-image as "wide"; this had been on
// "medium" instead, rendering it at the same constrained size as
// text-image's small inline supporting visuals. width/height are sized
// for a sharp render at that real 848px cap on 2x/retina displays
// (848 * 2 = 1696, hence 1700/1100 rather than the old 1600/900, which
// undershot that). Individual source files still vary in real
// resolution — some (e.g. the drykorn-plm set, ~1386px wide) are below
// 1696px and will still look soft on retina; that's a source-asset
// ceiling no width/height prop can fix, not a code issue.
export function FullWidthImageSection({
  image,
  caption,
}: FullWidthImageSectionProps) {
  return (
    <SectionWindow size="wide" statusBar={caption}>
      <Image
        src={image.url}
        alt={image.alt}
        width={1700}
        height={1100}
        className={styles.image}
        sizes="(max-width: 900px) 92vw, 848px"
      />
    </SectionWindow>
  );
}
