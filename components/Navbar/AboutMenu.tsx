"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import styles from "./Navbar.module.css";

export function AboutMenu() {
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
           * destinations, just reachable from the navbar too now. */}
          <a
            href="/resume.pdf"
            download
            role="menuitem"
            className={styles.menuItem}
            onClick={() => setOpen(false)}
          >
            Download Resume
          </a>
          <a
            href="https://www.linkedin.com/in/paulkim"
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
