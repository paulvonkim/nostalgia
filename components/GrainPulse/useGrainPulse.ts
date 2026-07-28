"use client";

import { useRef, useState } from "react";

// durationMs must match --grain-duration in styles/tokens.css — the
// grain-pulse overlay is only meant to be visible for the span of the
// crossfade/filter transition it's paired with, on both hover-in and
// hover-out, so it's driven by a matching timeout rather than a
// pure-CSS :hover trigger (a spike-then-settle animation can't reverse
// symmetrically off :hover alone).
export function useGrainPulse(durationMs = 450) {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  function pulse() {
    setIsTransitioning(true);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(
      () => setIsTransitioning(false),
      durationMs,
    );
  }

  return {
    isTransitioning,
    onPointerEnter: pulse,
    onPointerLeave: pulse,
  };
}
