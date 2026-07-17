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
export function FullWidthImageSection({
  image,
  caption,
}: FullWidthImageSectionProps) {
  return (
    <SectionWindow size="medium" statusBar={caption}>
      <Image
        src={image.url}
        alt={image.alt}
        width={1600}
        height={900}
        className={styles.image}
        sizes="(max-width: 900px) 92vw, 1120px"
      />
    </SectionWindow>
  );
}
