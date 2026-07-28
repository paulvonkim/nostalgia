# paulkim.eu — Design System & Decision Log

Source of truth for the redesign. Updated continuously as decisions are made.
Case study *content* is out of scope here — this covers shell, chrome, interaction, and visual language only.

Last updated: 2026-07-17

---

## 1. Concept

A skeuomorphic homage to MacOS 7 and Adobe Photoshop 1.0, reinterpreted for a modern web experience.
Not a literal simulation of a desktop OS, and not a 1:1 skin. The goal is authenticity of *logic*, not just surface texture: every retro detail should be doing real work (navigation, state, feedback), not just decorating.

Audience: design managers and hiring managers evaluating taste and interaction craft. The site can afford friction that rewards curiosity — it does not need to optimize for a 10-second skim.

---

## 2. Design Principles

1. **Homage, not pastiche.** Reference real System 7 / Photoshop 1.0 conventions (title bar chrome, platter buttons, label colors, control panels) but adapt them where literal reproduction would hurt usability or clarity.
2. **Every retro detail earns its place.** If a skeuomorphic element doesn't carry function (state, feedback, or navigation), cut it. The clock exists because System 7's menu bar had one — not just to look busy.
3. **Restraint over full simulation.** This is not a desktop OS the visitor has to learn. One window, fixed navigation, no icon grid to manage.
4. **Accessible by default.** Focus states, contrast, and keyboard navigation are part of the retro vocabulary, not an accessibility bolt-on. (See: dashed focus ring on CTA buttons.)
5. **Case study content is untouched.** This system wraps around existing writing — it does not rewrite it.
6. **Distinguish verified period-accuracy from intentional modern twists, explicitly, per component.** Geometry, materials, and flat construction (borders, radii, grey chrome, no drop shadows) are held to real 90s reference material and measured, not guessed. Color-forward interactivity (filled colored buttons, hover feedback itself) is NOT period-accurate — 90s Mac software had almost no color in UI chrome and no hover concept at all — and is the deliberate modern layer this whole project is built on, not drift to be second-guessed component by component.
7. **Hover interactions must degrade without hover.** Touch devices have no hover state. Every hover-dependent interaction (ASCII reveal, item-list hover, image enlarge) needs a deliberate touch equivalent or graceful fallback, decided per-component — never assumed away. This does not block deferring mobile layout itself, but it does mean interaction dependencies must be tracked now.

---

## 3. Structural Model

- **Single window architecture.** One window on screen at all times. Navigating (Work / About / case studies) swaps the window's title and content — it does not spawn additional windows.
- **The window is draggable.** The visitor can move the single window around the desktop plane. Dragging is a physical/tactile detail, not a multi-window management system.
- **Fixed navbar**, always visible above the desktop plane: logo mark (diamond) — Work — About — Theme — live clock (right-aligned). The diamond mark is the Apple-menu equivalent: it's the home button, turns blue on hover.
- **Desktop plane**: the colored area behind/around the window. Three desktop icons float here in a single column, top-right, matching the classic Mac auto-arrange convention — in order: a floppy disk (triggers the résumé download), the LinkedIn logo (opens LinkedIn in a new tab), and, set apart with an extra gap, a stamp icon (opens Impressum).
- **"About This Site" dialog**: opens from the diamond mark, mirroring the real Mac OS "About This Macintosh" pattern under the Apple menu — thematically precise reuse of an existing component rather than a new nav item. Contains: copyright line, font credit ("Display typeface 'Gossip' by Deborah Khodanovich — gossip.cargo.site"), icon set credit, and a line on the build stack (Next.js, built by Paul Kim). Impressum (stamp icon) stays purely legal — name/contact, no credits mixed in — since legal-notice content needs to stay trivially discoverable from a dedicated, always-present location, not tucked inside a dialog someone has to think to open. Site confirmed not using cookies/tracking, so no cookie notice needed anywhere.
- **Window dragging**: working as intended — bounded so it can't leave the viewport, resets to centered position on every route change (not just hard refresh).
- **Home window title**: "Paul Kim's Portfolio," not "Home" or plain "Paul Kim." Immediately clear to any visitor regardless of familiarity with classic Mac conventions (an earlier "Paul Kim HD" idea was dropped — too reliant on knowing the disk-naming in-joke). Avoids literally repeating the Gossip wordmark text while adding just enough context. Home-specific exception; every other window (Work, About, case study titles) stays a functional wayfinding label.
- **Window sizing**: three cases, not two. Impressum alone uses ~840×640 (readable text-only content) — About used to share this size but outgrew it once it gained a photo grid. Case study pages *and* About use a larger, responsive size — `max-width: min(1200px, 92vw)`, `max-height: min(840px, 85vh)` — since they need room for full-width images and before/after twin windows (case studies) or a header photo plus a 3×2 image grid (About); the `min()` cap keeps drag margin intact on smaller laptop screens rather than filling the viewport edge-to-edge. **Home is not locked to either size** — its size is being tuned iteratively alongside the actual hero content (ASCII portrait, Gossip wordmark, pitch text, CTAs) rather than fixed in advance, since the right size depends on seeing those pieces together. Chrome (borders, title bar, scrollbar) stays visually identical across all sizes — only the scale differs. Centered by default.
- **Desktop icons, resolved.** Not a full icon grid — a single auto-arranged column, top-right of the desktop, top to bottom: Resume, LinkedIn, then Impressum set apart with a bigger gap — Resume/LinkedIn are a "get in touch" pair, Impressum is a legal notice, not part of that grouping. All three open on a single click, not the literal classic-Mac double-click, with a brief press/highlight animation (icon scales down slightly, label inverts to the accent color) for tactile feedback. Primary site navigation is still the navbar; these three are a secondary, desktop-metaphor path to actions that aren't really "pages" (a download, an external link, and the legal notice).
- **Hero CTAs simplified to one.** Download Resume and LinkedIn are no longer hero buttons — they moved to the desktop icons above. The hero now has a single "View My Work →" CTA routing to the Work overview, using the one standard CTA button component (see §7) — not a distinct accent-colored variant.

### Resolved
No close/zoom/minimize boxes — not designed, not needed. Navigation lives entirely in the navbar, with the single exception of Impressum, which lives on the stamp desktop icon. Title bar chrome is styling only, not functional controls.

---

## 4. Color System

### Neutrals
White → light grey → mid grey → dark grey → black. Base system chrome (backgrounds, borders, text).

### Effect colors (system-level accents)
Blue and magenta. Used for system-wide UI chrome — links, selection highlights, focus/active states — independent of which case study is open. This is the default "OS" identity color, e.g. the Home desktop background.

### Case-study color pairs
Four pairs, each a bold + subtle variant:
1. Ice blue / navy
2. Cream / charcoal
3. Blush / deep green
4. Tan / brown

This mirrors the Finder label-color pattern in the reference material (Essential / Hot / In Progress / Cool / Personal file tags) — each case study gets a "label color" that becomes its desktop identity when that case is open. This gives the OS metaphor functional meaning rather than decoration.

### Tentative
Bold color = content accent (headings, tags, borders within case content). Subtle color = desktop wash, by elimination. Not fully confirmed — needs testing against a real built page before it's locked.

### Theme system
Light/dark toggle + one visitor-selectable accent color (middle ground between full Appearance-panel replica and a plain toggle).

### Resolved
Visitor-selectable accent color is scoped to global/system chrome only (Home, About, navbar, general UI outside case studies). It does not apply within case study pages. Inside a case study, color comes entirely from that case's assigned pair (and tonal variations of it) — the visitor's accent choice is overridden there. Neutrals (the light/dark toggle) apply everywhere, including inside case studies, regardless of this.

Dark mode is never automatic (no `prefers-color-scheme` detection) — light is always the default appearance; dark only applies once the visitor explicitly toggles it via the navbar's Theme control.

In dark mode, structural chrome *lines* (window border, title bar pinstripes, scrollbar border) use the neutral scale's light grey, not pure white — pure white against the near-black backgrounds read as too stark/glaring for line work at this scale. Body/paragraph text is likewise an off-white, not pure white, for the same reason (readable text covers far more surface area than a thin border, so full-contrast white felt glaring there too). Small chrome *widgets* with their own fixed neutral fill (CTA buttons, scrollbar arrow buttons/thumb) keep a fixed, non-theme-reactive fill and a fixed contrasting foreground in both themes — deliberately not swapping with light/dark, since their fill was never tied to the theme tokens to begin with.

The ASCII/dither hover-reveal imagery (see §6) is exempt from the theme system entirely — it doesn't invert or otherwise react to light/dark. See §6 for the reasoning.

---

## 5. Typography

- **Chicago FLF** — large text, UI chrome, headings, navbar, buttons, labels.
- **Google Sans** — body copy, paragraph text inside case studies (replaces Inter, 2026-07-17). (Chicago is a bitmap UI face — deliberately not used for long-form reading.) Loaded via a plain `<link>` embed in `app/layout.tsx`'s `<head>` (Google Fonts CSS2 endpoint), not `next/font/google` self-hosting — an explicit, user-provided snippet was used verbatim rather than an independently-sourced/self-hosted equivalent. Variable font; the site uses weight 400, `GRAD 0`, `font-optical-sizing: auto`, applied globally on `body` in `globals.css` since that's the single place `--font-body` is set. Note: the family is literally `"Google Sans"`, a distinct entry from `"Google Sans Flex"` in Google's catalog — the swap request referenced "Flex" by name but the provided code snippet specified plain `"Google Sans"`, which is what was implemented per the instruction to match the given code exactly.
- **Gossip** (by Deborah Khodanovich, `gossip.cargo.site`) — hero typeface (and possibly About page), replacing the deferred Textura placeholder. Not an arbitrary blackletter pairing: Gossip is itself built from Gutenberg's Textura and Susan Kare's Cairo glyphs — the same Kare who designed the original Chicago typeface. This makes the hero's blackletter moment a continuation of the same lineage as the rest of the type system, not a collision between two unrelated eras. Ships in three pixel densities (low/medium/high) — which one reads best at hero scale to be tested once the file is in hand, not decided on paper. Comes with a companion icon set (Kare-sketch-inspired) worth evaluating as a source/reference for the trash desktop icon.
- **Hero treatment direction**: dark, confident, restrained — not theatrical or campy. The blackletter choice itself carries enough distinctiveness; scale and drama don't need to be pushed further. Scoped tightly to hero (and maybe About) only — Chicago FLF and Google Sans remain untouched everywhere else.
- **Hero wordmark confirmed**: "Paul Kim" set in Gossip (Med Square variant, tested at 96pt) as the hero's display type, replacing the earlier generic "Design Portfolio" placeholder heading. Body copy (Google Sans) sits a size smaller alongside it. First mockup reviewed 2026-07-16 (not live code yet) — restrained/elegant read confirmed as the intended target.

### Open question
Should the hero headline enter via the same ASCII/dither hover-reveal motif used for images (resolving from static into the full dark blackletter on load), extending that pattern into typography — or does that stay image-only? Not yet decided.

### Open question — Licensing
No formal license found for Gossip. Creator's stated ask ("please credit me... would love to see it in use") reads as a good-faith invitation, and this use (rendering only, not redistributing the font file, plus credit given) is low-risk — but not verified legal clearance. Recommended: contact the designer directly before shipping, given this is for a professional job-search context.

Sizes/scale: not yet defined — TBD as we design real pages.

---

## 6. Interaction Patterns

- **ASCII/dithered hover-reveal.** Concrete behavior confirmed: reveals the same photo as a clean, undithered JPG — not a different image, not a stylized alternate. **Scope correction**: this is a Hero/About-page pattern only, not a system-wide motif — it does NOT apply to case study images (reverses an earlier note in §12 calling it system-wide across `text-image`, `full-width-image`, and `before-after`).
- **Dither imagery ignores the light/dark theme.** Resolved after an initial attempt to invert the dithered asset's colors in dark mode (so the dots wouldn't vanish against a dark background) was rejected: the portrait should read like a printed photo sitting on the desktop — a fixed physical object unaffected by the surrounding chrome's theme — not an interface element that recolors itself to match. It keeps its native light background and dark dots in both themes.
- **Draggable window.** Physical drag interaction on the single window.
- **Live clock.** Navbar, top-right, functioning. Displays time only — no location.

---

## 7. Component Inventory (from reference assets — states not yet finalized)

- **Window chrome**: title bar with brick-pattern flanking the title text, bordered content area, scrollbar.
- **Scrollbar**: track, thumb, up/down arrow buttons. Multiple reference variants shown — exact anatomy (thumb position states, arrow behavior) TBD.
- **CallToAction button — final, complete component spec** (applies to every CTA button site-wide, not one instance). One button, one component — no primary/secondary/accent-color variants of any kind. A three-variant version (neutral primary/secondary plus an accent-colored third) was built and then dropped as unnecessary complexity; every CTA everywhere now looks identical.
  - **Size**: ~108×30px, or auto-width with equivalent padding for longer labels.
  - **Border & radius, every state, always, same in light and dark mode**: 1px black border, 4–6px corner radius. No drop shadow (verified against a real Photoshop 1.0 dialog screenshot — classic Mac buttons are flat bordered rectangles, no shadow).
  - **Fill**: `#DBDBDB` (`--color-grey-300`) — the button's original fill color from before the primary/secondary/accent split was ever introduced, restored rather than re-guessed. Fixed, identical in both themes.
  - **Hover/active/focus, layered outer-ring model** (an outer wrapper, not a property swap on the button itself, so the core button never resizes — default reserves the same ~2–3px padding/1px black border/white inset-highlight space, transparent, so nothing shifts when a state becomes visible): magenta ring (`#C96FC6`, `--color-effect-magenta`) on hover; accent-blue ring (`--color-effect-blue`) on both `:active` and `:focus-visible` — one shared treatment, not separate states.
- **Item list**: default, disabled/greyed, plus two distinct interactive states (not competing) — magenta fill and black fill. Proposed mapping (pending confirmation): magenta = hover (transient), black = active/selected (permanent). See open question #5.
- **Navbar**: diamond logomark, text nav (Work / About / Theme), live clock right-aligned. Hover state: filled background plus text color change together, matching classic selected-menu-item behavior (see Item list component) — not a text-color-only change. **Icon-to-text optical sizing**: icons must not be sized to literally match adjacent text height — open shapes (like the diamond) read smaller than dense letterforms at the same numeric size. Icons need to run larger (roughly 1.4–1.5× the text's font-size as a starting point) to read as visually equal weight. Judged by eye, not a fixed formula — applies to every icon paired with text (diamond, stamp, trash), not just this one instance.
- **Desktop icons**: three, auto-arranged in a single column from the top-right of the desktop (classic Mac auto-arrange convention, not a full grid). Top to bottom: a floppy disk (triggers the résumé download), the LinkedIn logo (opens LinkedIn in a new tab), then — set apart with a bigger gap — a stamp icon that opens Impressum. The stamp replaces an earlier hard-drive-icon idea: "Impressum" is German for imprint, the same word a physical stamp's mark takes its name from, so the icon plays on the label's own etymology rather than reusing the classic-Mac hard-drive convention for something that was never actually a drive. The gap before it is deliberate — Resume/LinkedIn read as a "get in touch" pair, Impressum is a legal notice and isn't part of that grouping. All three: single click (not the literal double-click), with a brief press/highlight animation — the icon glyph scales down slightly and the label inverts to the accent color — for tactile feedback. The floppy disk and stamp are hand-designed in-house, fixed white fill / black outline in both themes, matching the dithered portrait's "physical object, not theme-reactive chrome" treatment; the LinkedIn icon is LinkedIn's actual published brand asset, used unmodified rather than themed like the others. Labels use a fixed white background / black text (per the impressum.png reference), not theme-reactive either.

---

## 8. Retired / Out of Scope

- ConsiousCode, IKEA Design System, Periphery Studios — being removed from the live portfolio (per existing case-study skill rules). Not part of this visual redesign's concern, noted here only so nothing gets rebuilt for them by mistake.

---

## 9. Open Questions Log

| # | Question | Status |
|---|---|---|
| 1 | Window close/zoom/minimize boxes | **Resolved** — none. Navigation lives in navbar; Impressum via stamp icon |
| 2 | Bold vs. subtle color mapping within each case pair | **Tentative** — bold = content accent, subtle = desktop wash. To be tested against a real build |
| 3 | Interaction between visitor's accent color and case identity color | **Resolved** — accent color is global-chrome-only, does not apply inside case studies. Neutrals apply everywhere |
| 4 | Clock "location" | **Resolved** — time only, no location |
| 5 | Item list magenta vs. black — which is hover, which is active/selected? | Proposed: magenta = hover, black = active/selected. Awaiting confirmation. |
| 6 | Floating "version tag" element | **Resolved** — dropped. Replaced by a stamp desktop icon that opens Impressum |
| 7 | Trash icon — no meaningful use identified yet | Open, low priority — fine to leave unused. Originally conceived as the classic desktop pair to a hard-drive icon; that icon was since replaced by the stamp, so the pairing rationale no longer applies, but the icon itself was never blocking on it |
| 8 | Case-color mapping for the four cases | **Resolved** — see §11 |
| 9 | SectionRenderer visual treatment per section type (`text`, `text-image`, `full-width-image`, `before-after`, `stats`, `video`, `notice`) | **Partially built** — hero shell + `notice` (dialog-box treatment) live on the case study route. `text`, `text-image`, `full-width-image`, `before-after`, `stats`, `video` remain open/unbuilt |

---

## 10. Tech Stack & Project Structure

- **Framework**: Next.js (App Router), TypeScript.
- **Styling**: CSS Modules + a global `tokens.css` of custom properties (colors, type scale, spacing, border/bevel values). Not Tailwind — the pixel-precise bevels, insets, and bitmap type this system needs are easier to hand-roll against tokens than to fight through a utility framework.
- **Fonts**: `next/font/local` for Chicago FLF (public domain revival by Robin Casady of Susan Kare's original — free for commercial and personal use, TTF/WOFF available) and Gossip. Google Sans (body) is loaded via a plain `<link>` embed of the Google Fonts CSS2 endpoint, not `next/font/google` (see §5). Textura deferred, not yet sourced.
- **Linting/formatting**: Biome (one config, lint + format in one tool). Trade-off accepted: no automatic Next.js-specific or react-hooks-specific lint rules — acceptable for a solo project.
- **Case study data**: a typed data file (`/data/cases.ts`) drives the case study routes. Content itself is unchanged and migrated separately from this visual work.

### Proposed folder structure
```
/app
  /page.tsx              → Home
  /work/[slug]/page.tsx  → Case study route, reads from /data/cases.ts
  /about/page.tsx
/components
  Window/
  Navbar/
  Clock/
  Scrollbar/
  Button/
  ItemList/
  ThemeSwitcher/
  DesktopIcon/
/styles
  tokens.css            → design tokens as CSS custom properties
  globals.css
/data
  cases.ts
/public
  /fonts
  /textures              → dither/ASCII pattern assets
```

### Open question — Resolved
~~Do you already have case study content in a portable format...~~ Resolved: real `case-studies.ts` reviewed directly (see §11). Existing schema is solid and will be kept as-is; only rendering changes.

## 11. Existing Codebase — Findings (2026-07-16)

Reviewed the live `case-studies.ts` and `page.tsx`. Notes for the rebuild:

- **Schema confirmed, not redesigned.** `CaseStudy` already has `id, title, description, imageUrl, tags, role, tools, collaboration, methods, sections`, plus a `hidden` flag and a per-case `accentColor`. This schema stays; only the *rendering* changes.
- **Four active cases, matching the plan exactly**: `arco-agent`, `drykorn-plm`, `drykorn-suits-system`, `arco-rules`. `arco-design-system` is present and correctly `hidden: true` — already retired, no action needed.
- **Section types to design for**: `text`, `text-image`, `full-width-image`, `before-after`, `stats`, `video`, `notice`. Current build only actually uses `text`, `text-image`, `full-width-image`, `video`, `notice` — `before-after` and `stats` are defined in the type but unused in content so far. Each needs a retro-system visual treatment; `before-after` and `stats` can be designed on paper first since nothing depends on them yet.
- **Current visual language is the "before" state**: dark gradients per case, Tailwind + shadcn conventions, framer-motion fades, lucide icons. All of this gets replaced by the window/chrome system — the component being rebuilt is `SectionRenderer` plus the page shell, not the data underneath it.

### Open question
Each case currently has one hardcoded accent color (purple, red, teal, slate, orange) baked into `heroBackground`/`heroGradient`/`accentColor`. These don't belong to the retro palette. Proposed mapping onto the four case-study color pairs from `design.md` §4, reasoning per case:

| Case | Proposed pair | Why |
|---|---|---|
| `arco-agent` | Ice blue / navy | Agentic AI product — cool, technical, forward-looking |
| `drykorn-plm` | Cream / charcoal | Enterprise systems, structural, neutral and serious |
| `drykorn-suits-system` | Tan / brown | Fashion/tailoring — warm, tactile |
| `arco-rules` | Blush / deep green | Configuration safety — green reads as "validated," against the risk the case is literally about |

### Resolved
Color mapping confirmed:

| Case | Pair |
|---|---|
| `arco-agent` | Ice blue / navy |
| `drykorn-plm` | Cream / charcoal |
| `drykorn-suits-system` | Tan / brown |
| `arco-rules` | Blush / deep green |

## 12. SectionRenderer — Visual Treatments

Unifying idea: every section type is a native OS container (window, twin windows, dialog, digital readout) — not a generic web card. Keeps case study content speaking the same visual language as the shell.

- **`text`** — No device. Chicago FLF heading, Google Sans body. No decoration needed — the headings already carry the weight.
- **`text-image`** — Image in a small nested window: mini title bar (using `image.alt` or a short caption as title), same border language as the main `Window` component, smaller scale.
- **`full-width-image`** — Wider nested-window frame. Caption lives in a bottom status-bar strip (Photoshop 1.0 info-bar reference), not a floating web caption. **Interaction**: hover-to-enlarge in place, not a lightbox — image scales up modestly where it sits, fast/snappy transition (~100–150ms, no ease bounce), no dimmed overlay. Needs a touch fallback before mobile design (see Principle 6).
- **`before-after`** — Two small windows side by side, equal scale, titled with the existing `before.label` / `after.label` data fields. Reuses the `Window` component twice — no new component needed.
- **`stats`** — New component: digit tiles styled like a calculator readout (monospace numerals, inset bevel, light LCD-grey background), label in small type underneath. Direct callback to the Calculator app in the moodboard.
- **`video`** — Same nested-window frame as `text-image`. Native video controls (not fake QuickTime chrome — that tips into gimmick). Optional caption below in system font.
- **`notice`** — Dialog-box treatment (confirmed earlier), not a literal 1:1 alert replica.

Cross-cutting: the ASCII/dither hover-reveal is scoped to Hero/About only (see §6 scope correction) — case study images (`text-image`, `full-width-image`, `before-after`) do not use it; they render as plain images.

**Hero section (all case study pages)**: uses the same highlight-box treatment as the Work overview cards, not plain text — title in a bold-color-background/white-text box, description in a subtle-color-background/bold-color-text box, zero gap between them (same inline `box-decoration-break: clone` technique, same case color pair as the Work card for that case). Case color usage stays restricted to headings and tags — general body content (byline metadata, section body copy) stays neutral, not case-colored. The anonymization/NDA `notice` section renders early on the page, immediately after the hero metadata/tags block — not buried further down among the other content sections.

### Note on responsiveness sequencing
Desktop-viewport responsiveness (different laptop/monitor widths) is being built in as each component is made, not deferred. Mobile/touch layout remains deferred pending sketches — but see Principle 6: hover-dependent interactions here (image enlarge, ASCII reveal) need a tracked touch fallback before mobile design begins.

## 13. Decision Log

- **2026-07-16** — Skeuomorphic homage confirmed over conceptual reinterpretation. Full OS-desktop simulation rejected in favor of single-window model.
- **2026-07-16** — Textura dropped for hero (may revisit).
- **2026-07-16** — ASCII hover-reveal confirmed as a general interaction pattern.
- **2026-07-16** — Single window, content swaps on navigation; window remains draggable.
- **2026-07-16** — Desktop background color changes per case study's assigned label color.
- **2026-07-16** — Theme system: light/dark toggle + one accent color choice (not full Appearance-panel replica).
- **2026-07-16** — Clock shows time only, no location.
- **2026-07-16** — Item list magenta/black are two distinct states (not competing options), not a single state to pick between.
- **2026-07-16** — Version tag dropped. Desktop gets a single hard drive icon, opening Impressum. Trash icon left unresolved — no forced use.
- **2026-07-16** — Case-color mapping confirmed: arco-agent→ice blue/navy, drykorn-plm→cream/charcoal, drykorn-suits-system→tan/brown, arco-rules→blush/deep green.
- **2026-07-16** — Diamond logo mark confirmed as the home button (Apple-menu equivalent), turns blue on hover.
- **2026-07-16** — `notice` sections confirmed as dialog-box treatment (not a 1:1 replica).
- **2026-07-16** — No window close/zoom/minimize controls. Navigation lives in navbar; Impressum via hard drive desktop icon.
- **2026-07-16** — Bold color tentatively = content accent, subtle = desktop wash. Needs real-build testing.
- **2026-07-16** — Accent color is global-chrome-only; case studies use only their own assigned color and its variations, never the visitor's chosen accent. Neutrals apply universally.
- **2026-07-16** — SectionRenderer treatments confirmed for all section types (§12). `full-width-image` uses hover-to-enlarge in place, not a lightbox — fast/snappy transition, no easing glide.
- **2026-07-16** — Desktop-viewport responsiveness built in as we go, per component. Mobile/touch layout remains deferred, but hover-dependent interactions must be tracked for future touch fallback (Principle 6).
- **2026-07-16** — Hero typeface un-deferred: Gossip (Deborah Khodanovich) selected in place of the placeholder Textura idea — same Textura/Cairo lineage as the rest of the type system, not an arbitrary pairing. License to be verified at source before use.
- **2026-07-16** — Hero wordmark decided: "Paul Kim" in Gossip Med Square, replacing the generic "Design Portfolio" heading. Tone resolved as restrained/dark/confident, not theatrical or campy — the blackletter choice itself carries enough distinctiveness.
- **2026-07-16** — Dark mode is opt-in only, never derived from OS/browser preference — light is always the default appearance.
- **2026-07-16** — Dark-mode chrome-line color (window border, title bar pinstripes, scrollbar border) corrected from pure white to the neutral scale's light grey; body text corrected from pure white to an off-white — both were too high-contrast/glaring against the near-black backgrounds. Fixed-fill chrome widgets (CTA buttons, scrollbar arrow buttons/thumb) keep a fixed fill and fixed contrasting foreground in both themes rather than following the theme tokens.
- **2026-07-16** — Dither/ASCII imagery (hero portrait, and by extension all future case-study images using the same treatment) confirmed theme-independent — reads like a printed photo sitting on the desktop, not an interface element that recolors to match light/dark. An initial attempt to invert it in dark mode was tried and reverted; it now sits on a fixed light-grey ground instead.
- **2026-07-16** — Hero simplified to one CTA: "View My Work →", routing to the Work overview, using the standard CTA button component. Download Resume and LinkedIn are no longer hero buttons.
- **2026-07-16** — Desktop icon grid decision reopened and resolved: not a full grid, but a single auto-arranged column (Hard Drive, Resume, LinkedIn) top-right of the desktop, replacing the two hero buttons that moved here. Single click, not double-click, with a brief press/highlight tactile animation. Icon artwork is hand-designed (no reference bitmap existed for these, unlike the navbar diamond) — fixed white/black, matching the dither imagery's theme-independent treatment.
- **2026-07-16** — CTA button spec corrected in §7 to match the actual current implementation: primary is white/dark-grey (reversing in dark mode), never accent-colored; a new third "accent" variant carries the site accent color for cases like the hero CTA. All three variants share one hover/active/focus ring mechanism — the earlier idea of shade-shifting a colored fill instead of ringing it was tried and dropped.
- **2026-07-16** — CTA button simplified again, this time all the way down to one variant: the primary/secondary/accent-color split (previous entry) is fully retired. Every CTA button site-wide is now identical — fill restored to the component's pre-split original (`#DBDBDB`/`--color-grey-300`), border/radius unchanged and theme-independent, magenta ring on hover, accent-blue ring (shared) on active and keyboard focus. Impressum's hard drive icon was also relabeled "Impressum" (was "Hard Drive"), and the LinkedIn desktop icon now uses LinkedIn's actual published brand asset rather than the hand-designed shared-network-drive icon.
- **2026-07-17** — Hard-drive icon replaced with a stamp: "Impressum" is German for imprint, the same word a physical stamp's mark takes its name from, so the icon now plays on the label's own etymology instead of reusing the classic-Mac hard-drive convention for something that was never actually a drive. Desktop icon order changed to Resume → LinkedIn → Impressum (was Hard Drive → Resume → LinkedIn), with Impressum set apart by a bigger gap since it's a legal notice, not part of the Resume/LinkedIn "get in touch" grouping.
- **2026-07-17** — Case study page hero confirmed to reuse the Work overview card's highlight-box treatment (bold-bg/white-text title, subtle-bg/bold-text description, zero gap) rather than plain text, using each case's own color pair. Case color usage confirmed restricted to headings and tags, not general body content (byline, section copy stay neutral). The `notice` section is confirmed to render early, right after the hero metadata/tags, not buried among later content sections.
- **2026-07-17** — Scope correction: the ASCII/dither hover-reveal is Hero/About only, not a system-wide motif — it does not apply to case study images, reversing the §12 note that called it system-wide across `text-image`/`full-width-image`/`before-after`. Those section types render plain images instead.
- **2026-07-17** — Case study route (`app/work/[slug]/page.tsx`) and hero shell built, reading real data from `data/case-studies.ts` by id. Uses the existing `case-study` Window size. Renders: hero image (full, uncropped), title/description highlight boxes, tags, a Role/Team/Methods/Tools byline (neutral color, skips any field the case doesn't have), and the notice section(s) pulled out of `sections`. The other section-type renderers (`text`, `text-image`, `full-width-image`, `before-after`, `stats`, `video`) are deliberately not built yet — out of scope for this pass.
- **2026-07-17** — Body font swapped sitewide: Inter → Google Sans (see §5). Loaded via a plain `<link>` embed (Google Fonts CSS2 endpoint) in `app/layout.tsx`'s `<head>`, per an explicit user-provided snippet used verbatim rather than a self-hosted `next/font/google` equivalent. `--font-inter` removed from `styles/tokens.css`/`app/layout.tsx` entirely — zero remaining references confirmed via repo-wide grep. Chicago FLF and Gossip (both still `next/font/local`) are unaffected.
- **2026-07-27** — About page built (`app/about/page.tsx`, `components/About/`): header (full-height profile photo, name, bio, tag row, "Contact Me" button) plus a 3×2 grid of square photo tiles (Workspace, Berlin, Pottery, Books, Puppy, Running) reusing the Work overview card's chrome/bevel treatment at a 1:1 aspect ratio instead of case-study's uncropped `contain` fit. About's window size changed from the shared 840×640 About/Impressum size to the case-study size (needs the room for the photo grid); Impressum keeps 840×640 alone, so `Window`'s `size` prop was renamed `"about-impressum"` → `"impressum"`. The tag/pill component, previously duplicated near-verbatim between `CaseStudyCard` and `CaseStudyHero`, was extracted into a shared `components/Tag/Tag.tsx` so About could reuse it too rather than becoming a third copy; both existing usages were migrated to it with no visual change. Static first pass — no hover treatment on the new grid tiles, pending review.
