import { Navbar } from "@/components/Navbar/Navbar";
import { Window } from "@/components/Window/Window";
import { CaseStudyList } from "@/components/Work/CaseStudyList";
import styles from "./page.module.css";

export default function Work() {
  return (
    <>
      <Navbar />
      <main className={styles.desktop}>
        <Window title="Selected Work" size="work">
          <CaseStudyList />
        </Window>
      </main>
    </>
  );
}
