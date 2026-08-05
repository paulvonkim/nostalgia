import { aboutCards } from "@/data/about-cards";
import styles from "./About.module.css";
import { AboutCard } from "./AboutCard";
import { AboutHeader } from "./AboutHeader";

export function About() {
  return (
    <div className={styles.about}>
      <AboutHeader />
      <div className={styles.grid}>
        {aboutCards.map((card, index) => (
          <AboutCard key={card.id} card={card} index={index} />
        ))}
      </div>
    </div>
  );
}
