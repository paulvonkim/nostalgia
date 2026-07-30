"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./Navbar.module.css";

type Theme = "light" | "dark";

interface ThemeMenuProps {
  /** See WorkMenu.tsx for the full dropdown/panel rationale. Not part of
   * the panel's explicitly itemized structure, but included anyway —
   * without it there'd be no way to reach dark mode at all on mobile/
   * tablet, since the desktop dropdown this replaces is hidden here. */
  variant?: "dropdown" | "panel";
  onNavigate?: () => void;
}

// No persistence — matches design.md: dark is never automatic and never
// remembered across loads, only ever applied via this explicit control.
// null here just means "no explicit choice made yet this load", which
// displays identically to "light" (the default appearance).
export function ThemeMenu({
  variant = "dropdown",
  onNavigate,
}: ThemeMenuProps) {
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
    onNavigate?.();
  }

  const active = theme ?? "light";

  if (variant === "panel") {
    return (
      <div className={styles.panelSection}>
        {/* .menuItemActive, not .panelItemActive — reuses the existing
         * black-background/white-text active treatment (same as the
         * desktop dropdown's selected state) rather than the route-active
         * blue text WorkMenu/AboutMenu use, since this isn't "the page
         * you're on", it's a selected toggle state. */}
        <button
          type="button"
          className={`${styles.panelItem} ${active === "light" ? styles.menuItemActive : ""}`}
          onClick={() => selectTheme("light")}
        >
          Light
        </button>
        <button
          type="button"
          className={`${styles.panelItem} ${active === "dark" ? styles.menuItemActive : ""}`}
          onClick={() => selectTheme("dark")}
        >
          Dark
        </button>
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
