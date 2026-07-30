"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { Clock } from "@/components/Clock/Clock";
import { AboutMenu } from "./AboutMenu";
import { DiamondMark } from "./DiamondMark";
import styles from "./Navbar.module.css";
import { ThemeMenu } from "./ThemeMenu";
import { WorkMenu } from "./WorkMenu";

// ≤1024px only (see the matching @media queries in Navbar.module.css):
// .nav (WorkMenu/AboutMenu/ThemeMenu) and Clock are hidden by CSS, the
// diamond logo swaps for plain text, and this hamburger + full-screen
// panel take over. Above 1024px isMenuOpen is simply never set true
// (the button that would set it is display: none there), so desktop
// behavior is untouched.
export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Body-scroll lock while the panel covers the screen — not explicitly
  // requested, but without it the page underneath still scrolls behind
  // the fixed panel, which reads as a bug on a full-screen overlay.
  useEffect(() => {
    if (!isMenuOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isMenuOpen]);

  // Explicit reset here, not just via the scroll-lock effect's own
  // cleanup above — that cleanup fires reliably on a plain toggle, but
  // this component gets freshly mounted per page (every page.tsx renders
  // its own <Navbar/>, there's no shared layout instance), so a Link
  // click that both closes the panel and navigates can't be trusted to
  // let the old instance's cleanup win the race against the new page's
  // own mount/paint. This runs unconditionally and synchronously instead
  // of waiting on that timing. useCallback so its identity is stable —
  // otherwise the Escape-key effect below would need to tear down and
  // re-add its listener on every render, not just when isMenuOpen flips.
  const closeMenu = useCallback(() => {
    document.body.style.overflow = "";
    setIsMenuOpen(false);
  }, []);

  const toggleMenu = useCallback(() => {
    if (isMenuOpen) {
      closeMenu();
    } else {
      setIsMenuOpen(true);
    }
  }, [isMenuOpen, closeMenu]);

  useEffect(() => {
    if (!isMenuOpen) return;
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") closeMenu();
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isMenuOpen, closeMenu]);

  return (
    <header className={styles.navbar}>
      <div className={styles.left}>
        <Link href="/" className={styles.logo} aria-label="Home">
          <span className={styles.logoIcon}>
            <DiamondMark />
          </span>
          <span className={styles.logoText}>Paul&apos;s Portfolio</span>
        </Link>
        <nav className={styles.nav}>
          <WorkMenu />
          <AboutMenu />
          <ThemeMenu />
        </nav>
      </div>

      <div className={styles.clockWrap}>
        <Clock />
      </div>

      <button
        type="button"
        className={styles.hamburger}
        aria-haspopup="true"
        aria-expanded={isMenuOpen}
        aria-label="Menu"
        onClick={toggleMenu}
      >
        <span className={styles.hamburgerBars} aria-hidden="true">
          <span className={styles.hamburgerBar} />
          <span className={styles.hamburgerBar} />
          <span className={styles.hamburgerBar} />
        </span>
      </button>

      {isMenuOpen && (
        <div className={styles.panel}>
          {/* Dedicated close control, not just the hamburger re-tapped —
           * .panel's z-index sits below .navbar's on paper, but this is
           * here because that wasn't reliably reaching the hamburger in
           * practice. Fixed position (see .panelClose) so it stays put
           * regardless of the panel's own scroll. */}
          <button
            type="button"
            className={styles.panelClose}
            aria-label="Close menu"
            onClick={closeMenu}
          >
            ×
          </button>
          <WorkMenu variant="panel" onNavigate={closeMenu} />
          <AboutMenu variant="panel" onNavigate={closeMenu} />
          <div className={styles.panelDivider} />
          <ThemeMenu variant="panel" onNavigate={closeMenu} />
        </div>
      )}
    </header>
  );
}
