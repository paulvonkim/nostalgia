import styles from "./StatsSection.module.css";

interface StatsSectionProps {
  heading?: string;
  items: { value: string; label: string }[];
}

// Calculator-readout tiles: monospace-numeral value on an inset-bevel,
// light LCD-grey tile, label in small type underneath. Direct callback to
// the Calculator app in the moodboard (design.md §12).
export function StatsSection({ heading, items }: StatsSectionProps) {
  return (
    <div className={styles.section}>
      {heading && <h2 className={styles.heading}>{heading}</h2>}
      <div className={styles.grid}>
        {items.map((item) => (
          <div key={item.label} className={styles.tile}>
            <div className={styles.readout}>{item.value}</div>
            <div className={styles.label}>{item.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
