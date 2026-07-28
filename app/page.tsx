import { DesktopIcons } from "@/components/Desktop/DesktopIcons";
import { Hero } from "@/components/Home/Hero";
import { Navbar } from "@/components/Navbar/Navbar";
import { Window } from "@/components/Window/Window";
import styles from "./page.module.css";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className={styles.desktop}>
        <DesktopIcons />
        <Window title="Home" scrollbar={false}>
          <Hero />
        </Window>
      </main>
    </>
  );
}
