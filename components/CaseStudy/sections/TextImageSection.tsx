import Image from "next/image";
import { SectionWindow } from "@/components/CaseStudy/SectionWindow";
import styles from "./TextImageSection.module.css";

interface TextImageSectionProps {
  heading: string;
  body: string;
  image: { url: string; alt: string };
}

// Image in a small nested window, same border language as the main
// Window, smaller scale. No title bar — the image's alt text is
// accessibility metadata, not display copy, so it isn't put on screen as
// a (truncating, single-line) window title. No ASCII/dither effect —
// that's Hero/About only.
export function TextImageSection({
  heading,
  body,
  image,
}: TextImageSectionProps) {
  return (
    <div className={styles.section}>
      <div className={styles.text}>
        <h2 className={styles.heading}>{heading}</h2>
        <p className={styles.body}>{body}</p>
      </div>
      <div className={styles.imageCol}>
        <SectionWindow size="medium">
          <Image
            src={image.url}
            alt={image.alt}
            width={800}
            height={600}
            className={styles.image}
            sizes="(max-width: 900px) 92vw, 440px"
          />
        </SectionWindow>
      </div>
    </div>
  );
}
