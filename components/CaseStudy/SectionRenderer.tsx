import type { Section } from "@/data/case-studies";
import styles from "./SectionRenderer.module.css";
import { BeforeAfterSection } from "./sections/BeforeAfterSection";
import { FullWidthImageSection } from "./sections/FullWidthImageSection";
import { StatsSection } from "./sections/StatsSection";
import { TextImageSection } from "./sections/TextImageSection";
import { TextSection } from "./sections/TextSection";
import { VideoSection } from "./sections/VideoSection";

interface SectionRendererProps {
  sections: Section[];
}

// Renders every section in array order. `notice` is intentionally not
// handled here — CaseStudyHero already pulls those out and renders them
// early, right after the hero metadata/tags (design.md §12), so rendering
// them again here would duplicate them further down the page.
export function SectionRenderer({ sections }: SectionRendererProps) {
  return (
    <div className={styles.stack}>
      {sections.map((section, index) => {
        const key = `${section.type}-${index}`;
        switch (section.type) {
          case "text":
            return (
              <TextSection
                key={key}
                heading={section.heading}
                body={section.body}
              />
            );
          case "text-image":
            return (
              <TextImageSection
                key={key}
                heading={section.heading}
                body={section.body}
                image={section.image}
              />
            );
          case "full-width-image":
            return (
              <FullWidthImageSection
                key={key}
                image={section.image}
                caption={section.caption}
              />
            );
          case "before-after":
            return (
              <BeforeAfterSection
                key={key}
                heading={section.heading}
                before={section.before}
                after={section.after}
              />
            );
          case "stats":
            return (
              <StatsSection
                key={key}
                heading={section.heading}
                items={section.items}
              />
            );
          case "video":
            return (
              <VideoSection
                key={key}
                heading={section.heading}
                url={section.url}
                caption={section.caption}
              />
            );
          case "notice":
            return null;
          default:
            return null;
        }
      })}
    </div>
  );
}
