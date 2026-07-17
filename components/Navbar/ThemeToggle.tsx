"use client";

import { useState } from "react";
import styles from "./Navbar.module.css";

export function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark" | null>(null);

  function toggle() {
    const next = theme === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    setTheme(next);
  }

  return (
    <button type="button" className={styles.navItem} onClick={toggle}>
      Theme
    </button>
  );
}
