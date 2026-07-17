import Image from "next/image";
import type { CSSProperties } from "react";
import { CASE_COLORS } from "@/components/Work/caseColors";
import type { CaseStudy } from "@/data/case-studies";
import styles from "./CaseStudyHero.module.css";

interface CaseStudyHeroProps {
  study: CaseStudy;
}

interface CaseColorStyle extends CSSProperties {
  "--case-bold": string;
  "--case-subtle": string;
}

const BYLINE_FIELDS: {
  label: string;
  values: (study: CaseStudy) => string[] | undefined;
}[] = [
  { label: "Role", values: (s) => (s.role ? [s.role] : undefined) },
  { label: "Team", values: (s) => s.collaboration },
  { label: "Methods", values: (s) => s.methods },
  { label: "Tools", values: (s) => s.tools },
];

// Hero/shell only (design.md §12) — the other section types (text,
// text-image, full-width-image, before-after, stats, video) are rendered
// separately by SectionRenderer. Notice sections are pulled out of
// `study.sections` and shown here; the rest of `sections` is ignored here.
//
// Order: title/description → byline → tags → notice → hero image →
// content sections (the last of those is SectionRenderer, rendered by the
// page after this component). The hero image renders AFTER the notice,
// not before it.
//
// Size hierarchy: the hero image is the largest element on the page, so it
// spans the full window content width. Everything else (title/description,
// tags, byline, notice) shares the same 848px capped, centered column as
// the section content below it.
export function CaseStudyHero({ study }: CaseStudyHeroProps) {
  const colors = CASE_COLORS[study.id];
  const colorStyle: CaseColorStyle = {
    "--case-bold": colors.bold,
    "--case-subtle": colors.subtle,
  };
  const notices = (study.sections ?? []).filter(
    (section) => section.type === "notice",
  );

  return (
    <div className={styles.hero} style={colorStyle}>
      <div className={styles.column}>
        <div className={styles.textBlock}>
          <h1 className={styles.title}>
            <span className={styles.titleHighlight}>{study.title}</span>
          </h1>
          <p className={styles.description}>
            <span className={styles.descriptionHighlight}>
              {study.description}
            </span>
          </p>
        </div>

        <dl className={styles.byline}>
          {BYLINE_FIELDS.map(({ label, values }) => {
            const list = values(study);
            if (!list || list.length === 0) return null;
            return (
              <div key={label} className={styles.bylineRow}>
                <dt className={styles.bylineLabel}>{label}</dt>
                <dd className={styles.bylineValue}>{list.join(", ")}</dd>
              </div>
            );
          })}
        </dl>

        <div className={styles.tags}>
          {study.tags.map((tag) => (
            <span key={tag} className={styles.tag}>
              {tag}
            </span>
          ))}
        </div>

        {notices.map((notice) => (
          <div key={notice.body} className={styles.notice}>
            <span className={styles.noticeLabel}>Notice</span>
            <p className={styles.noticeBody}>{notice.body}</p>
          </div>
        ))}
      </div>

      <div className={styles.imageWrap}>
        <Image
          src={study.imageUrl}
          alt={study.title}
          width={1600}
          height={1200}
          priority
          className={styles.image}
          sizes="(max-width: 900px) 92vw, 1120px"
        />
      </div>
    </div>
  );
}
