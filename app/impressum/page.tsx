import { Impressum } from "@/components/Impressum/Impressum";
import { Navbar } from "@/components/Navbar/Navbar";
import { Window } from "@/components/Window/Window";
import styles from "./page.module.css";

export default function ImpressumPage() {
  return (
    <>
      <Navbar />
      <main className={styles.desktop}>
        <Window title="Impressum" size="about-impressum">
          <Impressum />
        </Window>
      </main>
    </>
  );
}
