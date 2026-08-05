import Image from "next/image";
import type { CaseStudy } from "@/data/case-studies";
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
// Order: title/description → byline → hero image → notice → content
// sections (the last of those is SectionRenderer, rendered by the page
// after this component). No tags here — the byline (Role/Team/Methods/
// Tools) is the only metadata on this page; tags stay on the Work
// overview cards only.
//
// Size: the hero image shares the same 848px capped, centered column as
// everything else on this page (title/description, byline, notice, and
// the section images further down) — not larger than those, even though
// it's the first/most prominent thing on the page.
export function CaseStudyHero({ study }: CaseStudyHeroProps) {
  const notices = (study.sections ?? []).filter(
    (section) => section.type === "notice",
  );

  return (
    <div className={styles.hero}>
      <div className={styles.column}>
        <div className={styles.textBlock}>
          <h1 className={styles.title}>{study.title}</h1>
          <p className={styles.description}>{study.description}</p>
        </div>

        <div className={styles.balloon}>
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
          {/* Two paths, not one: the fill closes back across the top edge
           * (the segment that tucks under .balloon's own bottom border,
           * hidden — no stroke there), while the stroke path stays open
           * and only draws the two visible outer edges (the curve + the
           * diagonal to the point). Same fill/stroke-split technique used
           * for the old CaseStudyCard folder-tab shape: clip-path can't
           * put a border along a non-rectangular cut, so the border has
           * to be its own separate shape.
           *
           * Curved edge is a single quadratic (Q), one control point,
           * kept strictly inside the start/end bounding box (control
           * (10,20) vs. start (30,2)/end (4,32)) — the earlier cubic's
           * first control point overshot past the start point (34 > 30),
           * which is exactly what produced the curl/loop artifact. */}
          <svg className={styles.tail} viewBox="0 0 44 34" aria-hidden="true">
            <path className={styles.tailFill} d="M30,2 Q10,20 4,32 L8,2 Z" />
            <path className={styles.tailStroke} d="M30,2 Q10,20 4,32 L8,2" />
          </svg>
        </div>
      </div>

      <div className={styles.imageWrap}>
        <Image
          src={study.imageUrl}
          alt={study.title}
          width={study.imageWidth}
          height={study.imageHeight}
          priority
          className={styles.image}
          sizes="(max-width: 900px) 92vw, 848px"
        />
      </div>

      {notices.map((notice) => (
        <div key={notice.body} className={styles.notice}>
          <span className={styles.noticeLabel}>Notice</span>
          <p className={styles.noticeBody}>{notice.body}</p>
        </div>
      ))}
    </div>
  );
}
