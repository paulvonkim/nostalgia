import Link from "next/link";
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
  const content = (
    <>
      <span className={styles.glyph}>{icon}</span>
      <span className={styles.label}>{label}</span>
    </>
  );

  // Plain internal navigation (Impressum) goes through next/link — a
  // plain <a> here means a full page reload, and since theme is
  // deliberately never persisted (design.md: dark only ever applies via
  // explicit toggle, never remembered), a reload always lands back on
  // light regardless of what the visitor had set. download (Resume) and
  // external targets (LinkedIn) genuinely need a plain <a>; Link doesn't
  // support either meaningfully.
  if (download || target) {
    return (
      <a
        href={href}
        download={download}
        target={target}
        rel={rel}
        className={styles.icon}
      >
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className={styles.icon}>
      {content}
    </Link>
  );
}
