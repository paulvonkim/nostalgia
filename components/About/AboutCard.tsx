import Image from "next/image";
import { HoverGrainImage } from "@/components/GrainPulse/HoverGrainImage";
import type { AboutCard as AboutCardData } from "@/data/about-cards";
import styles from "./AboutCard.module.css";

interface AboutCardProps {
  card: AboutCardData;
}

// Static tile — image, heading, caption. No tags, no CTA (those live in
// AboutHeader only), but heading/caption reuse CaseStudyCard's hover
// color treatment (see AboutCard.module.css).
export function AboutCard({ card }: AboutCardProps) {
  return (
    <div className={styles.card}>
      <div className={styles.imageFrame}>
        <HoverGrainImage className={styles.imageStage}>
          <Image
            src={card.imageUrl}
            alt={card.imageAlt}
            fill
            className={styles.image}
            sizes="(max-width: 560px) 92vw, (max-width: 900px) 46vw, 30vw"
          />
        </HoverGrainImage>
      </div>
      <h3 className={styles.heading}>{card.heading}</h3>
      <p className={styles.caption}>{card.caption}</p>
    </div>
  );
}
