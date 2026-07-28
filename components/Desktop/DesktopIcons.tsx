import { DesktopIcon } from "./DesktopIcon";
import styles from "./DesktopIcons.module.css";
import { FloppyDiskIcon } from "./FloppyDiskIcon";
import { LinkedInIcon } from "./LinkedInIcon";
import { StampIcon } from "./StampIcon";

// Classic Mac auto-arrange, split across the viewport: Resume + LinkedIn
// (a "get in touch" pair) top-right; Impressum — a legal notice, not part
// of that grouping — bottom-right instead, the same distance from the
// bottom edge as Resume is from the top.
export function DesktopIcons() {
  return (
    <>
      <div className={styles.topGroup}>
        <DesktopIcon
          icon={<FloppyDiskIcon />}
          label="Resume"
          href="https://drive.google.com/file/d/11tgcmzgHXf3XKYph3ogQ1XzA2qJUyqbS/view?usp=sharing"
          download
          target="_blank"
          rel="noopener noreferrer"
        />
        <DesktopIcon
          icon={<LinkedInIcon />}
          label="LinkedIn"
          href="https://www.linkedin.com/in/-paulkim"
          target="_blank"
          rel="noopener noreferrer"
        />
      </div>
      <div className={styles.bottomGroup}>
        <DesktopIcon icon={<StampIcon />} label="Impressum" href="/impressum" />
      </div>
    </>
  );
}
