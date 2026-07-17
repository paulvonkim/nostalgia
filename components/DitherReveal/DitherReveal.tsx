"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import styles from "./DitherReveal.module.css";

// Must match the opacity-crossfade duration in DitherReveal.module.css —
// the grain-pulse overlay is only meant to be visible for the span of that
// transition, on both hover-in and hover-out, so it's driven by a matching
// timeout rather than a pure-CSS :hover trigger (a spike-then-settle
// animation can't reverse symmetrically off :hover alone).
const TRANSITION_MS = 450;

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
  const [isTransitioning, setIsTransitioning] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  function pulseGrain() {
    setIsTransitioning(true);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(
      () => setIsTransitioning(false),
      TRANSITION_MS,
    );
  }

  return (
    <div
      className={`${styles.wrapper} ${isTransitioning ? styles.transitioning : ""} ${className ?? ""}`}
      style={{ aspectRatio: `${width} / ${height}` }}
      onPointerEnter={pulseGrain}
      onPointerLeave={pulseGrain}
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
      <span className={styles.grain} aria-hidden="true" />
    </div>
  );
}
