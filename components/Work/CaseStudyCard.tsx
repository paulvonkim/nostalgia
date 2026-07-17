import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import type { CaseStudy } from "@/data/case-studies";
import styles from "./CaseStudyCard.module.css";
import { CASE_COLORS } from "./caseColors";

interface CaseStudyCardProps {
  study: CaseStudy;
  /** Only the first (above-the-fold) card should set this — see
   * components/Work/CaseStudyList.tsx. */
  priority?: boolean;
}

// Case colors are set once here as CSS custom properties and inherited by
// every descendant rule (card fill, title/description/tag highlights). The
// :hover overrides in CaseStudyCard.module.css swap to fixed black/white —
// only the *default* state is per-case, so those two vars are all this
// component needs to hand off to CSS.
interface CaseCardStyle extends CSSProperties {
  "--case-bold": string;
  "--case-subtle": string;
}

export function CaseStudyCard({ study, priority = false }: CaseStudyCardProps) {
  const colors = CASE_COLORS[study.id];
  const cardStyle: CaseCardStyle = {
    "--case-bold": colors.bold,
    "--case-subtle": colors.subtle,
  };

  return (
    <Link href={`/work/${study.id}`} className={styles.card} style={cardStyle}>
      <div className={styles.imageWrap}>
        <Image
          src={study.imageUrl}
          alt={study.title}
          width={1200}
          height={900}
          priority={priority}
          className={styles.image}
          sizes="(max-width: 900px) 92vw, 550px"
        />
      </div>
      <div className={styles.content}>
        <div className={styles.textBlock}>
          {/* Inline + box-decoration-break: clone — each wrapped line gets
           * its own independent, tightly-fit highlight (padding on every
           * side of every line), not one block sized to the widest line. */}
          <h2 className={styles.title}>
            <span className={styles.titleHighlight}>{study.title}</span>
          </h2>
          <p className={styles.description}>
            <span className={styles.descriptionHighlight}>
              {study.description}
            </span>
          </p>
        </div>
        <div className={styles.tags}>
          {study.tags.map((tag) => (
            <span key={tag} className={styles.tag}>
              {tag}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}
