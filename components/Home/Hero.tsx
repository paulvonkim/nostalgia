import { Button } from "@/components/Button/Button";
import { DitherReveal } from "@/components/DitherReveal/DitherReveal";
import styles from "./Hero.module.css";

export function Hero() {
  return (
    <div className={styles.hero}>
      <div className={styles.copy}>
        <h1 className={styles.wordmark}>Paul Kim</h1>
        <p className={styles.pitch}>
          <span className={styles.pitchLine}>
            I create experiences built on research,
          </span>
          <br />
          <span className={styles.pitchLine}>
            driven by people, and shaped by over a decade
          </span>
          <br />
          <span className={styles.pitchLine}>
            translating complexity into systems that work.
          </span>
        </p>
        <div className={styles.cta}>
          <Button href="/work">Open My Work</Button>
        </div>
      </div>
      <DitherReveal
        className={styles.portrait}
        defaultSrc="/images/paul/ascii-img.png"
        hoverSrc="/images/paul/ascii-img-light.png"
        alt="Portrait of Paul Kim"
        width={3600}
        height={3240}
        sizes="260px"
        priority
      />
    </div>
  );
}
