import styles from "./Impressum.module.css";

// Content page, not chrome — Google Sans throughout (headings included),
// same call already made for case-study content: Chicago FLF stays
// scoped to navbar/window/button/menu chrome, not reading text.
export function Impressum() {
  return (
    <div className={styles.impressum}>
      <h1 className={styles.title}>Impressum / Legal Notice</h1>

      <section className={styles.section}>
        <h2 className={styles.heading}>Information according to § 5 TMG</h2>
        <p className={styles.body}>
          Paul Kim
          <br />
          Tegeler Weg 15
          <br />
          10589 Berlin
          <br />
          Germany
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.heading}>Contact</h2>
        <p className={styles.body}>
          Phone: +49 151 207 50 2 50
          <br />
          E-Mail: paulkim.designs@gmail.com
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.heading}>
          Responsible for content according to § 55 Abs. 2 RStV
        </h2>
        <p className={styles.body}>
          Paul Kim
          <br />
          Tegeler Weg 15
          <br />
          10589 Berlin
          <br />
          Germany
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.heading}>Disclaimer</h2>
        <div className={styles.subsections}>
          <div className={styles.subsection}>
            <h3 className={styles.subheading}>Liability for Contents</h3>
            <p className={styles.body}>
              The contents of our pages have been created with the utmost care.
              However, we cannot guarantee the contents' accuracy, completeness
              or topicality.
            </p>
          </div>
          <div className={styles.subsection}>
            <h3 className={styles.subheading}>Liability for Links</h3>
            <p className={styles.body}>
              Our offer includes links to external third party websites. We have
              no influence on the contents of those websites, therefore we
              cannot guarantee for those contents.
            </p>
          </div>
          <div className={styles.subsection}>
            <h3 className={styles.subheading}>Copyright</h3>
            <p className={styles.body}>
              The contents and works created by the site operators on these
              pages are subject to German copyright law.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
