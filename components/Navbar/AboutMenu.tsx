"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import styles from "./Navbar.module.css";

interface AboutMenuProps {
  /** See WorkMenu.tsx for the full dropdown/panel rationale. Panel mode
   * has no trigger/toggle — everything renders flat, matching the
   * panel's exact specified structure (which also adds an Impressum row
   * here, not present in the desktop dropdown — Impressum's only other
   * home was the desktop icon, hidden at this width). */
  variant?: "dropdown" | "panel";
  onNavigate?: () => void;
}

export function AboutMenu({
  variant = "dropdown",
  onNavigate,
}: AboutMenuProps) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    function handlePointerDown(event: PointerEvent) {
      if (!wrapRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  if (variant === "panel") {
    return (
      <div className={styles.panelSection}>
        <Link
          href="/about"
          className={`${styles.panelItem} ${pathname === "/about" ? styles.panelItemActive : ""}`}
          onClick={onNavigate}
        >
          About
        </Link>
        {/* Indented sub-list, matching the Case Study #1–4 treatment
         * under "All Selected Work" (WorkMenu.tsx) — same .panelSubList
         * class, so indent/font size/weight match exactly rather than
         * being a separately-tuned approximation. No divider above this
         * (removed) — the indentation alone now signals these are
         * children of "About", the same way it does for WorkMenu. */}
        <div className={styles.panelSubList}>
          {/* Same href/download/target/rel as the Resume/LinkedIn desktop
           * icons (DesktopIcons.tsx) — see that file's own comment for why
           * target="_blank" matters here specifically (cross-origin
           * download attribute quirk). */}
          <a
            href="https://drive.google.com/file/d/11tgcmzgHXf3XKYph3ogQ1XzA2qJUyqbS/view?usp=sharing"
            download
            target="_blank"
            rel="noopener noreferrer"
            className={styles.panelItem}
            onClick={onNavigate}
          >
            Download Resume
          </a>
          <a
            href="https://www.linkedin.com/in/-paulkim"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.panelItem}
            onClick={onNavigate}
          >
            Connect to LinkedIn
          </a>
          <Link
            href="/impressum"
            className={`${styles.panelItem} ${pathname === "/impressum" ? styles.panelItemActive : ""}`}
            onClick={onNavigate}
          >
            Impressum
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.menuWrap} ref={wrapRef}>
      <button
        type="button"
        className={`${styles.navItem} ${open ? styles.navItemOpen : ""}`}
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
      >
        About
      </button>
      {open && (
        <div className={styles.menu} role="menu">
          <Link
            href="/about"
            role="menuitem"
            className={`${styles.menuItem} ${pathname === "/about" ? styles.menuItemActive : ""}`}
            onClick={() => setOpen(false)}
          >
            About me
          </Link>
          <div className={styles.menuDivider} />
          {/* Same href/download/target/rel as the Resume/LinkedIn desktop
           * icons (DesktopIcons.tsx) — same "get in touch" pair, same
           * destinations, just reachable from the navbar too now.
           * target="_blank" matters here specifically: this href is
           * cross-origin (Google Drive), and the `download` attribute is
           * only honored by browsers for same-origin URLs — without a
           * new tab, clicking this just navigated away from the
           * portfolio in the same tab instead of downloading anything. */}
          <a
            href="https://drive.google.com/file/d/11tgcmzgHXf3XKYph3ogQ1XzA2qJUyqbS/view?usp=sharing"
            download
            target="_blank"
            rel="noopener noreferrer"
            role="menuitem"
            className={styles.menuItem}
            onClick={() => setOpen(false)}
          >
            Download Resume
          </a>
          <a
            href="https://www.linkedin.com/in/-paulkim"
            target="_blank"
            rel="noopener noreferrer"
            role="menuitem"
            className={styles.menuItem}
            onClick={() => setOpen(false)}
          >
            Connect on LinkedIn
          </a>
        </div>
      )}
    </div>
  );
}
