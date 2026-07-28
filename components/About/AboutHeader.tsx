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
          fill
          priority
          className={styles.image}
          sizes="(max-width: 560px) 92vw, (max-width: 900px) 46vw, 30vw"
        />
      </div>
      <div className={styles.info}>
        <h1 className={styles.name}>Paul Kim</h1>
        <p className={styles.bio}>
          Korean-German, based in Berlin. Started in fashion, moved into digital
          product design, and somewhere along the way realized the problems were
          always the same just in different materials.
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
