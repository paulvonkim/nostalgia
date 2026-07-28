"use client";

import Image from "next/image";
import { GrainPulse } from "@/components/GrainPulse/GrainPulse";
import { useGrainPulse } from "@/components/GrainPulse/useGrainPulse";
import styles from "./DitherReveal.module.css";

interface DitherRevealProps {
  defaultSrc: string;
  hoverSrc: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  /** Passed straight to next/image; defaults to a sensible fixed-ish size. */
  sizes?: string;
  /** Mark true when this is above-the-fold / the LCP candidate. */
  priority?: boolean;
}

// Generic ASCII/dither hover-reveal (design.md §6): shows a dithered/ASCII
// state by default, resolves to a clean image on hover. Not hardcoded to
// the hero portrait — reused for case study images later. width/height are
// the image's natural pixels, used only to fix the aspect ratio (no layout
// shift); rendered size is controlled by the parent via CSS.
export function DitherReveal({
  defaultSrc,
  hoverSrc,
  alt,
  width,
  height,
  className,
  sizes = "(max-width: 640px) 90vw, 400px",
  priority = false,
}: DitherRevealProps) {
  const { isTransitioning, onPointerEnter, onPointerLeave } = useGrainPulse();

  return (
    <div
      className={`${styles.wrapper} ${className ?? ""}`}
      style={{ aspectRatio: `${width} / ${height}` }}
      onPointerEnter={onPointerEnter}
      onPointerLeave={onPointerLeave}
    >
      <Image
        src={defaultSrc}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        className={`${styles.image} ${styles.default}`}
      />
      <Image
        src={hoverSrc}
        alt=""
        aria-hidden="true"
        fill
        sizes={sizes}
        className={`${styles.image} ${styles.hover}`}
      />
      <GrainPulse active={isTransitioning} />
    </div>
  );
}
