import type { ReactNode } from "react";
import styles from "./DesktopIcon.module.css";

interface DesktopIconProps {
  icon: ReactNode;
  label: string;
  href: string;
  download?: boolean | string;
  target?: string;
  rel?: string;
}

// Single click opens/downloads/navigates — no double-click requirement,
// a deliberate departure from the literal classic-Mac convention. Press
// feedback (icon scale + label invert) is pure CSS :active, so it's
// necessarily brief — exactly as long as the click itself.
export function DesktopIcon({
  icon,
  label,
  href,
  download,
  target,
  rel,
}: DesktopIconProps) {
  return (
    <a
      href={href}
      download={download}
      target={target}
      rel={rel}
      className={styles.icon}
    >
      <span className={styles.glyph}>{icon}</span>
      <span className={styles.label}>{label}</span>
    </a>
  );
}
