import { SectionWindow } from "@/components/CaseStudy/SectionWindow";
import styles from "./VideoSection.module.css";

interface VideoSectionProps {
  heading?: string;
  url: string;
  caption?: string;
}

// Same nested-window frame as full-width-image, same scale — no title bar
// (that was single-line and truncated longer captions; design.md calls for
// plain text below instead, which wraps naturally). Optional heading, if
// present, sits above as a plain section heading; optional caption sits
// below in system font.
export function VideoSection({ heading, url, caption }: VideoSectionProps) {
  return (
    <div className={styles.section}>
      {heading && <h2 className={styles.heading}>{heading}</h2>}
      <SectionWindow size="medium">
        {/* biome-ignore lint/a11y/useMediaCaption: silent screen-capture prototype clips, no dialogue/audio to caption */}
        <video className={styles.video} src={url} controls />
      </SectionWindow>
      {caption && <p className={styles.caption}>{caption}</p>}
    </div>
  );
}
