import Image from "next/image";
import { Button } from "@/components/Button/Button";
import { Tag } from "@/components/Tag/Tag";
import styles from "./AboutHeader.module.css";

const TAGS = [
  "Product Design",
  "Design System",
  "Cross-Functional",
  "AI-Native",
];

export function AboutHeader() {
  return (
    <div className={styles.header}>
      <div className={styles.imageFrame}>
        <Image
          src="/images/paul/profile-pic.png"
          alt="Paul Kim"
          width={852}
          height={865}
          priority
          className={styles.image}
          sizes="(max-width: 560px) 92vw, (max-width: 900px) 46vw, 30vw"
        />
      </div>
      <div className={styles.info}>
        <h1 className={styles.name}>Paul Kim</h1>
        <p className={styles.bio}>
          Korean-German. Designing experiences with a systems focus and a soft
          spot for the analog. A decade in fashion, now 3+ years in digital
          product design. Inspired by stories and AI-assisted craft.
        </p>
        <div className={styles.tags}>
          {TAGS.map((tag) => (
            <Tag key={tag}>{tag}</Tag>
          ))}
        </div>
        <Button href="mailto:paulkim.designs@gmail.com">Contact Me</Button>
      </div>
    </div>
  );
}
