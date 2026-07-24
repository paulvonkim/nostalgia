"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./Navbar.module.css";

type Theme = "light" | "dark";

// No persistence — matches design.md: dark is never automatic and never
// remembered across loads, only ever applied via this explicit control.
// null here just means "no explicit choice made yet this load", which
// displays identically to "light" (the default appearance).
export function ThemeMenu() {
  const [open, setOpen] = useState(false);
  const [theme, setTheme] = useState<Theme | null>(null);
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

  function selectTheme(next: Theme) {
    document.documentElement.setAttribute("data-theme", next);
    setTheme(next);
    setOpen(false);
  }

  const active = theme ?? "light";

  return (
    <div className={styles.menuWrap} ref={wrapRef}>
      <button
        type="button"
        className={`${styles.navItem} ${open ? styles.navItemOpen : ""}`}
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
      >
        Theme
      </button>
      {open && (
        <div className={styles.menu} role="menu">
          <button
            type="button"
            role="menuitem"
            className={`${styles.menuItem} ${active === "light" ? styles.menuItemActive : ""}`}
            onClick={() => selectTheme("light")}
          >
            Light
          </button>
          <button
            type="button"
            role="menuitem"
            className={`${styles.menuItem} ${active === "dark" ? styles.menuItemActive : ""}`}
            onClick={() => selectTheme("dark")}
          >
            Dark
          </button>
        </div>
      )}
    </div>
  );
}
