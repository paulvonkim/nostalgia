import { About } from "@/components/About/About";
import { Navbar } from "@/components/Navbar/Navbar";
import { Window } from "@/components/Window/Window";
import styles from "./page.module.css";

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className={styles.desktop}>
        <Window title="About" size="case-study">
          <About />
        </Window>
      </main>
    </>
  );
}
