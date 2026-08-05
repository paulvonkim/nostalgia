import type { ReactNode } from "react";
import styles from "./SectionWindow.module.css";

const SIZE_CLASS = {
  compact: "", // 480px cap — before-after's twin windows
  medium: "medium", // ~600px cap — text-image's supporting/inline visuals
  wide: "wide", // full 848px content column — full-width-image, video
} as const;

interface SectionWindowProps {
  /** Omit to render without a top title bar — full-width-image and video
   * both use this; any caption for either goes below the window as plain
   * text (FullWidthImageSection/VideoSection's own .caption), not chrome. */
  title?: string;
  /** Size hierarchy (design.md): hero image is largest, full-width-image
   * ("wide") is the next tier down at the full 848px column, text-image
   * ("medium") is smaller still so it doesn't compete for attention,
   * before-after's twin windows stay "compact" (default). */
  size?: keyof typeof SIZE_CLASS;
  children: ReactNode;
}

// Static, non-draggable chrome frame sharing the main Window component's
// border language (border-width/color tokens, brick-pattern title-bar
// flanks) at a smaller nested scale. Not the actual Window component: that
// one owns viewport-relative drag/clamp state sized for being the single
// on-screen window, which doesn't translate to many small frames nested
// inside a scrolling case study body.
export function SectionWindow({
  title,
  size = "compact",
  children,
}: SectionWindowProps) {
  const sizeClass = SIZE_CLASS[size];
  return (
    <div className={`${styles.outer} ${sizeClass ? styles[sizeClass] : ""}`}>
      <div className={styles.inner}>
        {title && (
          <div className={styles.titleBar}>
            <span className={styles.flank} aria-hidden="true" />
            <span className={styles.title}>{title}</span>
            <span className={styles.flank} aria-hidden="true" />
          </div>
        )}
        <div className={styles.body}>{children}</div>
      </div>
    </div>
  );
}
