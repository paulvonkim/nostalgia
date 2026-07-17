import { caseStudies } from "@/data/case-studies";
import { CaseStudyCard } from "./CaseStudyCard";
import styles from "./CaseStudyList.module.css";

export function CaseStudyList() {
  const visible = caseStudies.filter((study) => !study.hidden);

  return (
    <div className={styles.list}>
      {visible.map((study, index) => (
        <CaseStudyCard key={study.id} study={study} priority={index === 0} />
      ))}
    </div>
  );
}
