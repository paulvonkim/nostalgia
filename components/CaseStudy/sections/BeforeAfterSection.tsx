import Image from "next/image";
import { SectionWindow } from "@/components/CaseStudy/SectionWindow";
import styles from "./BeforeAfterSection.module.css";

interface BeforeAfterSectionProps {
  heading: string;
  before: { image: string; label: string };
  after: { image: string; label: string };
}

// Two small windows side by side, equal scale, each titled with its own
// before.label / after.label field.
export function BeforeAfterSection({
  heading,
  before,
  after,
}: BeforeAfterSectionProps) {
  return (
    <div className={styles.section}>
      <h2 className={styles.heading}>{heading}</h2>
      <div className={styles.pair}>
        {[before, after].map((side) => (
          <div key={side.label} className={styles.col}>
            <SectionWindow title={side.label} size="medium">
              <Image
                src={side.image}
                alt={side.label}
                width={700}
                height={525}
                className={styles.image}
                sizes="(max-width: 900px) 46vw, 340px"
              />
            </SectionWindow>
          </div>
        ))}
      </div>
    </div>
  );
}
