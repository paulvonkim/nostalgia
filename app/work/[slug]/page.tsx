import { notFound } from "next/navigation";
import { CaseStudyHero } from "@/components/CaseStudy/CaseStudyHero";
import { ProjectNavigation } from "@/components/CaseStudy/ProjectNavigation";
import { SectionRenderer } from "@/components/CaseStudy/SectionRenderer";
import { Navbar } from "@/components/Navbar/Navbar";
import { Window } from "@/components/Window/Window";
import { caseStudies, getCaseStudyById } from "@/data/case-studies";
import styles from "./page.module.css";

interface CaseStudyPageProps {
  params: Promise<{ slug: string }>;
}

export default async function CaseStudyPage({ params }: CaseStudyPageProps) {
  const { slug } = await params;
  const study = getCaseStudyById(slug);

  if (!study || study.hidden) notFound();

  // `notice` sections are pulled out and rendered early by CaseStudyHero —
  // excluded here so they don't also appear further down the page.
  const bodySections = (study.sections ?? []).filter(
    (section) => section.type !== "notice",
  );

  // The window title bar shows a number, not the real title — that's
  // already the <h1> right below in CaseStudyHero, and repeating it in
  // the chrome above was redundant. Numbered by position among the
  // visible case studies, the same order CaseStudyList/WorkMenu use.
  const visibleCases = caseStudies.filter((s) => !s.hidden);
  const caseNumber = visibleCases.findIndex((s) => s.id === study.id) + 1;

  return (
    <>
      <Navbar />
      <main className={styles.desktop}>
        <Window title={`Case Study #${caseNumber}`} size="case-study">
          <CaseStudyHero study={study} />
          <div className={styles.body}>
            <SectionRenderer sections={bodySections} />
            <ProjectNavigation currentId={study.id} />
          </div>
        </Window>
      </main>
    </>
  );
}
