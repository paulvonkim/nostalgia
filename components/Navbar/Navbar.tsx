import Link from "next/link";
import { Clock } from "@/components/Clock/Clock";
import { DiamondMark } from "./DiamondMark";
import styles from "./Navbar.module.css";
import { ThemeToggle } from "./ThemeToggle";

export function Navbar() {
  return (
    <header className={styles.navbar}>
      <div className={styles.left}>
        <Link href="/" className={styles.logo} aria-label="Home">
          <DiamondMark />
        </Link>
        <nav className={styles.nav}>
          <Link href="/work" className={styles.navItem}>
            Work
          </Link>
          <Link href="/about" className={styles.navItem}>
            About
          </Link>
          <ThemeToggle />
        </nav>
      </div>
      <Clock />
    </header>
  );
}
