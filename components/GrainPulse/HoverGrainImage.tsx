"use client";

import type { ReactNode } from "react";
import { GrainPulse } from "./GrainPulse";
import styles from "./HoverGrainImage.module.css";
import { useGrainPulse } from "./useGrainPulse";

interface HoverGrainImageProps {
  /** The <Image> (or similar) this stage wraps. */
  children: ReactNode;
  /** Consumer's own class — e.g. to size the stage or hang a
   * `:hover .image { filter: grayscale(0) }` rule off it. */
  className?: string;
}

// Client boundary for the grain-pulse mechanism (see useGrainPulse) —
// isolated to just the image, not the whole card, so CaseStudyCard/
// AboutCard themselves stay server components. Only owns the pulse
// trigger + overlay; any hover-driven visual change on the image itself
// (e.g. a grayscale filter) is plain CSS on the consumer's own className,
// since a smooth transition reverses fine off :hover alone — only the
// grain spike-then-settle needs the JS-driven timing.
export function HoverGrainImage({ children, className }: HoverGrainImageProps) {
  const { isTransitioning, onPointerEnter, onPointerLeave } = useGrainPulse();

  return (
    <div
      className={`${styles.stage} ${className ?? ""}`}
      onPointerEnter={onPointerEnter}
      onPointerLeave={onPointerLeave}
    >
      {children}
      <GrainPulse active={isTransitioning} />
    </div>
  );
}
