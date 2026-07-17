import Link from "next/link";
import { caseStudies } from "@/data/case-studies";
import styles from "./ProjectNavigation.module.css";

interface ProjectNavigationProps {
  currentId: string;
}

// Wraparound prev/next logic ported from design-reference/old-page.tsx's
// ProjectNavigation — filters hidden cases, wraps to the last case when on
// the first and to the first when on the last. Visual treatment below is
// new; none of the old component's styling was reused.
export function ProjectNavigation({ currentId }: ProjectNavigationProps) {
  const visibleStudies = caseStudies.filter((study) => !study.hidden);
  if (visibleStudies.length < 2) return null;

  const currentIndex = visibleStudies.findIndex(
    (study) => study.id === currentId,
  );
  const prevStudy =
    currentIndex > 0
      ? visibleStudies[currentIndex - 1]
      : visibleStudies[visibleStudies.length - 1];
  const nextStudy =
    currentIndex < visibleStudies.length - 1
      ? visibleStudies[currentIndex + 1]
      : visibleStudies[0];

  return (
    <nav className={styles.nav} aria-label="Case study navigation">
      <Link href={`/work/${prevStudy.id}`} className={styles.link}>
        <span className={styles.arrow} aria-hidden="true">
          ←
        </span>
        <span className={styles.text}>
          <span className={styles.label}>Previous</span>
          <span className={styles.title}>{prevStudy.title}</span>
        </span>
      </Link>
      <Link
        href={`/work/${nextStudy.id}`}
        className={`${styles.link} ${styles.next}`}
      >
        <span className={styles.text}>
          <span className={styles.label}>Next</span>
          <span className={styles.title}>{nextStudy.title}</span>
        </span>
        <span className={styles.arrow} aria-hidden="true">
          →
        </span>
      </Link>
    </nav>
  );
}
