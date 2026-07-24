import Link from "next/link";
import { Clock } from "@/components/Clock/Clock";
import { AboutMenu } from "./AboutMenu";
import { DiamondMark } from "./DiamondMark";
import styles from "./Navbar.module.css";
import { ThemeMenu } from "./ThemeMenu";
import { WorkMenu } from "./WorkMenu";

export function Navbar() {
  return (
    <header className={styles.navbar}>
      <div className={styles.left}>
        <Link href="/" className={styles.logo} aria-label="Home">
          <DiamondMark />
        </Link>
        <nav className={styles.nav}>
          <WorkMenu />
          <AboutMenu />
          <ThemeMenu />
        </nav>
      </div>
      <Clock />
    </header>
  );
}
