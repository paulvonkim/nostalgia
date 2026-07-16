# paulkim.eu — Design System & Decision Log

Source of truth for the redesign. Updated continuously as decisions are made.
Case study *content* is out of scope here — this covers shell, chrome, interaction, and visual language only.

Last updated: 2026-07-16

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
6. **Hover interactions must degrade without hover.** Touch devices have no hover state. Every hover-dependent interaction (ASCII reveal, item-list hover, image enlarge) needs a deliberate touch equivalent or graceful fallback, decided per-component — never assumed away. This does not block deferring mobile layout itself, but it does mean interaction dependencies must be tracked now.

---

## 3. Structural Model

- **Single window architecture.** One window on screen at all times. Navigating (Work / About / case studies) swaps the window's title and content — it does not spawn additional windows.
- **The window is draggable.** The visitor can move the single window around the desktop plane. Dragging is a physical/tactile detail, not a multi-window management system.
- **Fixed navbar**, always visible above the desktop plane: logo mark (diamond) — Work — About — Theme — live clock (right-aligned). The diamond mark is the Apple-menu equivalent: it's the home button, turns blue on hover.
- **Desktop plane**: the colored area behind/around the window. A small set of utility elements float here outside the window frame (currently: a version tag, an Impressum link).
- **No desktop icon grid.** Navigation is via the navbar text links only, not double-clickable desktop icons — unless we decide otherwise later.

### Resolved
No close/zoom/minimize boxes — not designed, not needed. Navigation lives entirely in the navbar, with the single exception of Impressum, which lives on the hard drive desktop icon. Title bar chrome is styling only, not functional controls.

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

---

## 5. Typography

- **Chicago FLF** — large text, UI chrome, headings, navbar, buttons, labels.
- **Inter** — body copy, paragraph text inside case studies. (Chicago is a bitmap UI face — deliberately not used for long-form reading.)
- **Textura** — deferred. Was proposed for the hero as a deliberate era-collision; dropped for now, may revisit once the hero is actually being designed.

Sizes/scale: not yet defined — TBD as we design real pages.

---

## 6. Interaction Patterns

- **ASCII/dithered hover-reveal.** Confirmed as an intentional recurring pattern, not limited to the profile photo — images resolve from ASCII/dither into a cleaner state on hover.
- **Draggable window.** Physical drag interaction on the single window.
- **Live clock.** Navbar, top-right, functioning. Displays time only — no location.

---

## 7. Component Inventory (from reference assets — states not yet finalized)

- **Window chrome**: title bar with brick-pattern flanking the title text, bordered content area, scrollbar.
- **Scrollbar**: track, thumb, up/down arrow buttons. Multiple reference variants shown — exact anatomy (thumb position states, arrow behavior) TBD.
- **CTA button**: default (grey platter), pressed/hover, and a dashed focus ring state for keyboard navigation. Focus ring confirmed as a keep — real accessibility value.
- **Item list**: default, disabled/greyed, plus two distinct interactive states (not competing) — magenta fill and black fill. Proposed mapping (pending confirmation): magenta = hover (transient), black = active/selected (permanent). See open question #5.
- **Navbar**: diamond logomark, text nav (Work / About / Theme), live clock right-aligned.
- **Desktop icon**: a single hard drive icon on the desktop plane, opening the Impressum page — a direct repurpose of the classic Mac desktop convention (hard drive icon, always present) for something every site needs but rarely gives real presence to.

---

## 8. Retired / Out of Scope

- ConsiousCode, IKEA Design System, Periphery Studios — being removed from the live portfolio (per existing case-study skill rules). Not part of this visual redesign's concern, noted here only so nothing gets rebuilt for them by mistake.

---

## 9. Open Questions Log

| # | Question | Status |
|---|---|---|
| 1 | Window close/zoom/minimize boxes | **Resolved** — none. Navigation lives in navbar; Impressum via hard drive icon |
| 2 | Bold vs. subtle color mapping within each case pair | **Tentative** — bold = content accent, subtle = desktop wash. To be tested against a real build |
| 3 | Interaction between visitor's accent color and case identity color | **Resolved** — accent color is global-chrome-only, does not apply inside case studies. Neutrals apply everywhere |
| 4 | Clock "location" | **Resolved** — time only, no location |
| 5 | Item list magenta vs. black — which is hover, which is active/selected? | Proposed: magenta = hover, black = active/selected. Awaiting confirmation. |
| 6 | Floating "version tag" element | **Resolved** — dropped. Replaced by a hard drive desktop icon that opens Impressum |
| 7 | Trash icon — classic desktop pair to the hard drive icon, no meaningful use identified yet | Open, low priority — fine to leave unused |
| 8 | Case-color mapping for the four cases | **Resolved** — see §11 |
| 9 | SectionRenderer visual treatment per section type (`text`, `text-image`, `full-width-image`, `before-after`, `stats`, `video`, `notice`) | Open — next design task. `notice` confirmed as a dialog-box treatment |

---

## 10. Tech Stack & Project Structure

- **Framework**: Next.js (App Router), TypeScript.
- **Styling**: CSS Modules + a global `tokens.css` of custom properties (colors, type scale, spacing, border/bevel values). Not Tailwind — the pixel-precise bevels, insets, and bitmap type this system needs are easier to hand-roll against tokens than to fight through a utility framework.
- **Fonts**: `next/font/local` for Chicago FLF (public domain revival by Robin Casady of Susan Kare's original — free for commercial and personal use, TTF/WOFF available) and Inter via `next/font/google`. Textura deferred, not yet sourced.
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

- **`text`** — No device. Chicago FLF heading, Inter body. No decoration needed — the headings already carry the weight.
- **`text-image`** — Image in a small nested window: mini title bar (using `image.alt` or a short caption as title), same border language as the main `Window` component, smaller scale.
- **`full-width-image`** — Wider nested-window frame. Caption lives in a bottom status-bar strip (Photoshop 1.0 info-bar reference), not a floating web caption. **Interaction**: hover-to-enlarge in place, not a lightbox — image scales up modestly where it sits, fast/snappy transition (~100–150ms, no ease bounce), no dimmed overlay. Needs a touch fallback before mobile design (see Principle 6).
- **`before-after`** — Two small windows side by side, equal scale, titled with the existing `before.label` / `after.label` data fields. Reuses the `Window` component twice — no new component needed.
- **`stats`** — New component: digit tiles styled like a calculator readout (monospace numerals, inset bevel, light LCD-grey background), label in small type underneath. Direct callback to the Calculator app in the moodboard.
- **`video`** — Same nested-window frame as `text-image`. Native video controls (not fake QuickTime chrome — that tips into gimmick). Optional caption below in system font.
- **`notice`** — Dialog-box treatment (confirmed earlier), not a literal 1:1 alert replica.

Cross-cutting: the ASCII/dither hover-reveal (confirmed earlier for the hero photo) applies to every static image across `text-image`, `full-width-image`, and both `before-after` images — a system-wide motif, not a one-off.

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
