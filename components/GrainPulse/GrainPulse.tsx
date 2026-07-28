import styles from "./GrainPulse.module.css";

interface GrainPulseProps {
  /** Drives the pulse animation — pass useGrainPulse()'s isTransitioning. */
  active: boolean;
}

// Presentational half of the grain-pulse mechanism (see useGrainPulse for
// the timing/trigger logic). Must be placed inside a position: relative
// ancestor sized to the area it should cover.
export function GrainPulse({ active }: GrainPulseProps) {
  return (
    <span
      className={`${styles.grain} ${active ? styles.transitioning : ""}`}
      aria-hidden="true"
    />
  );
}
