"use client";

import Image from "next/image";
import { HoverGrainImage } from "@/components/GrainPulse/HoverGrainImage";
import reveal from "@/components/ScrollReveal/ScrollReveal.module.css";
import { useScrollReveal } from "@/components/ScrollReveal/useScrollReveal";
import type { AboutCard as AboutCardData } from "@/data/about-cards";
import styles from "./AboutCard.module.css";

interface AboutCardProps {
  card: AboutCardData;
  /** Position in the grid — staggers each card's reveal so a row cascades
   * in instead of popping together. Capped at 240ms so a long row doesn't
   * leave the last card waiting a beat after the rest have settled. */
  index: number;
}

// Static tile — image, heading, caption. No tags, no CTA (those live in
// AboutHeader only), but heading/caption reuse CaseStudyCard's hover
// color treatment (see AboutCard.module.css).
export function AboutCard({ card, index }: AboutCardProps) {
  const { ref, isVisible } = useScrollReveal();
  return (
    <div
      ref={ref}
      className={`${styles.card} ${isVisible ? reveal.visible : reveal.hidden}`}
      style={{ transitionDelay: `${Math.min(index * 80, 240)}ms` }}
    >
      <div className={styles.imageFrame}>
        <HoverGrainImage className={styles.imageStage}>
          <Image
            src={card.imageUrl}
            alt={card.imageAlt}
            fill
            className={styles.image}
            sizes="(max-width: 560px) 92vw, (max-width: 900px) 46vw, 30vw"
          />
        </HoverGrainImage>
      </div>
      <h3 className={styles.heading}>{card.heading}</h3>
      <p className={styles.caption}>{card.caption}</p>
    </div>
  );
}
