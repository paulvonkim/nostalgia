import Image from "next/image";
import { Button } from "@/components/Button/Button";
import type { CaseStudy } from "@/data/case-studies";
import { HERO_IMAGE_DIMENSIONS } from "@/data/hero-image-dimensions";
import styles from "./CaseStudyCard.module.css";

interface CaseStudyCardProps {
  study: CaseStudy;
  /** Only the first (above-the-fold) card should set this — see
   * components/Work/CaseStudyList.tsx. */
  priority?: boolean;
}

// Bordered card, nested bordered image frame — the folder-tab hover-reveal
// shape is gone (dropped per earlier redesign direction). Real per-case
// width/height (same dimensions CaseStudyHero uses), object-fit: contain,
// no `fill` — the complete photo always renders, nothing cropped or masked.
//
// The card itself is inert (a div, not a link) — the Button below is the
// only real navigation target, both because it can't nest inside a link
// (it renders its own <a>) and because that's the reference's own model:
// a static panel you read, with one explicit "open" action.
export function CaseStudyCard({ study, priority = false }: CaseStudyCardProps) {
  const dimensions = HERO_IMAGE_DIMENSIONS[study.id];
  return (
    <div className={styles.card}>
      <div className={styles.imageFrame}>
        <Image
          src={study.imageUrl}
          alt={study.title}
          width={dimensions.width}
          height={dimensions.height}
          priority={priority}
          className={styles.image}
          sizes="(max-width: 640px) 92vw, 46vw"
        />
      </div>
      <div className={styles.content}>
        <h2 className={styles.title}>{study.title}</h2>
        <p className={styles.description}>{study.description}</p>
        <div className={styles.tags}>
          {study.tags.map((tag) => (
            <span key={tag} className={styles.tag}>
              {tag}
            </span>
          ))}
        </div>
        <div className={styles.footer}>
          <Button href={`/work/${study.id}`}>View Case Study</Button>
        </div>
      </div>
    </div>
  );
}
