"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { caseStudies } from "@/data/case-studies";
import styles from "./Navbar.module.css";

// Same filter/order as CaseStudyList — the visible-cases list this menu
// offers should match what "All Work" itself shows.
const visibleCases = caseStudies.filter((study) => !study.hidden);

export function WorkMenu() {
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
        Work
      </button>
      {open && (
        <div className={styles.menu} role="menu">
          <Link
            href="/work"
            role="menuitem"
            className={`${styles.menuItem} ${pathname === "/work" ? styles.menuItemActive : ""}`}
            onClick={() => setOpen(false)}
          >
            All Selected Work
          </Link>
          <div className={styles.menuDivider} />
          {visibleCases.map((study, index) => {
            const href = `/work/${study.id}`;
            return (
              <Link
                key={study.id}
                href={href}
                role="menuitem"
                className={`${styles.menuItem} ${pathname === href ? styles.menuItemActive : ""}`}
                onClick={() => setOpen(false)}
              >
                Case Study #{index + 1}
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
