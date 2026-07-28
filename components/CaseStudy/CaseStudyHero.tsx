import Image from "next/image";
import { Tag } from "@/components/Tag/Tag";
import type { CaseStudy } from "@/data/case-studies";
import { HERO_IMAGE_DIMENSIONS } from "@/data/hero-image-dimensions";
import styles from "./CaseStudyHero.module.css";

interface CaseStudyHeroProps {
  study: CaseStudy;
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
// Size: the hero image shares the same 848px capped, centered column as
// everything else on this page (title/description, tags, byline, notice,
// and the section images further down) — not larger than those, even
// though it's the first/most prominent thing on the page.
export function CaseStudyHero({ study }: CaseStudyHeroProps) {
  const notices = (study.sections ?? []).filter(
    (section) => section.type === "notice",
  );
  const dimensions = HERO_IMAGE_DIMENSIONS[study.id];

  return (
    <div className={styles.hero}>
      <div className={styles.column}>
        <div className={styles.textBlock}>
          <h1 className={styles.title}>{study.title}</h1>
          <p className={styles.description}>{study.description}</p>
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
            <Tag key={tag} className={styles.tag}>
              {tag}
            </Tag>
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
          width={dimensions.width}
          height={dimensions.height}
          priority
          className={styles.image}
          sizes="(max-width: 900px) 92vw, 848px"
        />
      </div>
    </div>
  );
}
