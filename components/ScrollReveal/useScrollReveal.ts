"use client";

import { useEffect, useRef, useState } from "react";

// Same shape as useGrainPulse: a ref to attach plus the state it drives.
// unobserve() (not disconnect()) after the first reveal — this observer
// is shared across every SectionWindow/AboutCard on the page, so tearing
// the whole thing down per-element would be wasteful; disconnect() only
// happens on unmount, same as Window.tsx's own ResizeObserver cleanup.
export function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setIsVisible(true);
      return;
    }

    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(element);
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -80px 0px" },
    );
    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return { ref, isVisible };
}
