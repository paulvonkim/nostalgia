import styles from "./DiamondMark.module.css";

/**
 * Faceted gem mark. Geometry (silhouette + internal facet-line rects) was
 * traced pixel-by-pixel from the dithered bitmap in
 * design-reference/components/Home.png — table, three crown facets, a
 * girdle band, and pavilion facets converging to a point — then snapped to
 * two flat tones (fill / outline) to remove the source's anti-aliasing.
 * The two tones are CSS custom properties so the default-grey / hover-blue
 * swap is one style change, not two raster assets.
 */
export function DiamondMark() {
  return (
    <svg
      className={styles.diamondMark}
      viewBox="18 19 44 33"
      aria-hidden="true"
      focusable="false"
    >
      <path
        className={styles.fill}
        d="M28 20 L28 21 L25 22 L25 24 L22 25 L22 27 L20 28 L20 30 L22 31 L22 33 L25 34 L25 36 L28 37 L28 39 L30.5 40 L30.5 41 L33 42 L33 44 L36 45 L36 47 L39 48 L39 49 L40 50 L41 49 L41 48 L44 47 L44 45 L47 44 L47 42 L49.5 41 L49.5 40 L52 39 L52 37 L55 36 L55 34 L58 33 L58 31 L60 30 L60 28 L58 27 L58 25 L55 24 L55 22 L52 21 L52 20 Z"
      />
      <g className={styles.outline}>
        <rect x="28" y="20" width="25" height="2" />
        <rect x="25" y="22" width="31" height="1" />
        <rect x="25" y="23" width="3" height="2" />
        <rect x="36" y="23" width="3" height="2" />
        <rect x="42" y="23" width="3" height="2" />
        <rect x="53" y="23" width="3" height="2" />
        <rect x="22" y="25" width="8" height="1" />
        <rect x="34" y="25" width="5" height="1" />
        <rect x="42" y="25" width="5" height="1" />
        <rect x="50" y="25" width="9" height="1" />
        <rect x="22" y="26" width="4" height="2" />
        <rect x="28" y="26" width="3" height="2" />
        <rect x="34" y="26" width="2" height="2" />
        <rect x="44" y="26" width="3" height="2" />
        <rect x="50" y="26" width="3" height="2" />
        <rect x="55" y="26" width="4" height="2" />
        <rect x="20" y="28" width="3" height="3" />
        <rect x="31" y="28" width="3" height="3" />
        <rect x="47" y="28" width="3" height="3" />
        <rect x="58" y="28" width="3" height="3" />
        <rect x="22" y="31" width="37" height="3" />
        <rect x="25" y="34" width="3" height="2" />
        <rect x="31" y="34" width="5" height="2" />
        <rect x="44" y="34" width="6" height="2" />
        <rect x="53" y="34" width="3" height="2" />
        <rect x="25" y="36" width="6" height="1" />
        <rect x="36" y="36" width="3" height="1" />
        <rect x="42" y="36" width="3" height="1" />
        <rect x="50" y="36" width="6" height="1" />
        <rect x="28" y="37" width="3" height="2" />
        <rect x="36" y="37" width="3" height="2" />
        <rect x="42" y="37" width="3" height="2" />
        <rect x="50" y="37" width="3" height="2" />
        <rect x="28" y="39" width="6" height="1" />
        <rect x="36" y="39" width="3" height="1" />
        <rect x="42" y="39" width="3" height="1" />
        <rect x="47" y="39" width="6" height="1" />
        <rect x="30" y="40" width="4" height="2" />
        <rect x="36" y="40" width="3" height="2" />
        <rect x="42" y="40" width="3" height="2" />
        <rect x="47" y="40" width="3" height="2" />
        <rect x="33" y="42" width="3" height="2" />
        <rect x="39" y="42" width="3" height="2" />
        <rect x="44" y="42" width="4" height="2" />
        <rect x="33" y="44" width="15" height="1" />
        <rect x="36" y="45" width="9" height="3" />
        <rect x="39" y="48" width="3" height="2" />
      </g>
    </svg>
  );
}
