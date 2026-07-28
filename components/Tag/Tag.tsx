import type { ReactNode } from "react";
import styles from "./Tag.module.css";

interface TagProps {
  children: ReactNode;
  className?: string;
}

// Shared pill/tag chrome — was duplicated (byte-for-byte, mostly) between
// CaseStudyCard and CaseStudyHero before being pulled out here so the
// About page could reuse it too, rather than becoming a third copy.
export function Tag({ children, className }: TagProps) {
  return <span className={`${styles.tag} ${className ?? ""}`}>{children}</span>;
}
