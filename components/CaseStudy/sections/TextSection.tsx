import styles from "./TextSection.module.css";

interface TextSectionProps {
  heading: string;
  body: string;
}

// No device — Chicago FLF heading, Inter body, nothing else.
export function TextSection({ heading, body }: TextSectionProps) {
  return (
    <div className={styles.section}>
      <h2 className={styles.heading}>{heading}</h2>
      <p className={styles.body}>{body}</p>
    </div>
  );
}
