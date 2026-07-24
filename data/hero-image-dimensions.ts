// Real hero-image pixel dimensions per case, shared by CaseStudyCard (Work
// overview) and CaseStudyHero (case study detail page) — both render the
// same hero photo without `fill`, so both need its true width/height for
// next/image's srcset generation. A placeholder/guessed ratio here (e.g.
// the previous 1600x1200 on CaseStudyHero, a 4:3 guess against photos that
// are actually ~1.75:1) causes two real problems: next/image derives its
// srcset ceiling from the declared width, so an inaccurate one can cap
// resolution below what the source actually supports even on a large
// display, and it distorts the layout-shift-prevention aspect ratio.
export const HERO_IMAGE_DIMENSIONS: Record<
  string,
  { width: number; height: number }
> = {
  "arco-agent": { width: 2068, height: 1182 },
  "drykorn-plm": { width: 2068, height: 1192 },
  "drykorn-suits-system": { width: 3108, height: 1791 },
  "arco-rules": { width: 3120, height: 1770 },
};
