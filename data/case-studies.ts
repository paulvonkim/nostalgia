export type Section =
  | { type: "text"; heading: string; body: string }
  | {
      type: "text-image";
      heading: string;
      body: string;
      image: { url: string; alt: string };
    }
  | {
      type: "full-width-image";
      image: { url: string; alt: string };
      caption?: string;
    }
  | {
      type: "before-after";
      heading: string;
      before: { image: string; label: string };
      after: { image: string; label: string };
    }
  | {
      type: "stats";
      heading?: string;
      items: { value: string; label: string }[];
    }
  | { type: "video"; heading?: string; url: string; caption?: string }
  | { type: "notice"; body: string };

export interface CaseStudy {
  id: string;
  hidden?: boolean;
  title: string;
  description: string;
  imageUrl: string;
  tags: string[];
  featured?: boolean;
  duration?: string;
  role?: string;
  tools?: string[];
  collaboration?: string[];
  methods?: string[];
  skills?: string[];
  heroBackground?: string;
  heroGradient?: string;
  heroBorderColor?: string;
  accentColor?: string;
  sections?: Section[];
}

export const caseStudies: CaseStudy[] = [
  {
    id: "arco-agent",
    title: "Designing for an agent that doesn't exist yet",
    description:
      "A B2B SaaS transitioning from document management to agentic automation.",
    imageUrl: "/images/case-studies/arco-agent/hero-img.png",
    heroBackground: "#1a0a2e",
    heroGradient: "linear-gradient(to bottom, #2d1b69, #0a0a0a)",
    accentColor: "#7c3aed",
    tags: ["Product Design", "Agentic SaaS", "OOUX"],
    featured: true,
    role: "Product Designer (Sole Designer)",
    tools: ["Figma", "FigJam", "Claude Code", "VS Code", "Shadcn/ui"],
    collaboration: ["Product Leadership"],
    methods: ["OOUX", "ORCA", "Prototype validation", "Whiteboarding"],
    sections: [
      {
        type: "notice",
        body: "Company and product anonymised to protect confidentiality. Design decisions and visual assets reflect work done in role.",
      },
      {
        type: "text",
        heading: "The product had a pipeline. It needed a mental model.",
        body: "Arco was transitioning from a document management tool to an agentic SaaS, a product where AI handles the full document lifecycle from inflow to distribution. The technical architecture was clear. The user-facing logic wasn't clear.\n\nAs the sole designer, the task was to define what this product should feel like to use, not just what it should do. This happened in close collaboration with product leadership: weekly sessions of whiteboarding, discussing direction, and stress-testing assumptions together.",
      },
      {
        type: "text",
        heading: "Starting with objects, not screens",
        body: "Before touching any UI, an OOUX analysis mapped the product's core objects and their relationships. The central finding: the document is the primary object. Extractions, automations, and outflow are things that happen to a document, not parallel concepts of equal weight.\n\nThis had a direct consequence for navigation. The direction coming out of leadership organised the product around pipeline stages as the primary frame. The analysis showed that pipeline stages are system states, not user-facing objects. A user thinks in documents. The product should too.\n\nThis reframing became the foundation for every design decision that followed.",
      },
      // {
      //   type: "full-width-image",
      //   image: {
      //     url: "/images/case-studies/arco-agent/ooux-map.png",
      //     alt: "OOUX map showing Document as primary object with nested relationships",
      //   },
      // },
      {
        type: "text",
        heading: "A working prototype, not a slide deck",
        body: "The design vision was validated by building it. A React proof of concept developed with Claude Code and VS Code, covering the full scope of the product's feature areas. Building with Claude Code made it possible to validate the object model in a working product, not just a clickable prototype. The architectural argument became testable, a necessary step before bringing the vision back to leadership and into power user testing.",
      },
      {
        type: "video",
        url: "/images/case-studies/arco-agent/prototype-screens.mp4",
        caption:
          "document-first home screen prototype showing navigation between documents and pipeline stages",
      },
      {
        type: "text",
        heading: "The agent works. The user decides.",
        body: "The home screen is where architectural decisions become visible. Organising a product around pipeline stages puts the system's logic in front of the user. Organising it around the agent's work and the documents that need attention puts the user's job first.\n\nThree questions drove the design: what did the agent handle while you were away, what needs a decision right now, and what does the document landscape look like. Every element on the screen answers one of these. Nothing else appears.",
      },
      {
        type: "full-width-image",
        image: {
          url: "/images/case-studies/arco-agent/arco-landing.png",
          alt: "Redesigned document-first home screen",
        },
      },
      {
        type: "text",
        heading: "A foundation, not a concept",
        body: "The OOUX analysis, prototype, and redesigned architecture gave the product team a concrete foundation to move from. Not a concept, a tested, working design direction ready for power user validation and management sign-off.\n\nThe work reduced architectural ambiguity across the product's core feature areas, gave product leadership a shared reference point for prioritisation, and established a navigation model that scales as the agent layer grows.",
      },
      {
        type: "text",
        heading: "Validating the direction",
        body: "To pressure-test the architecture before leadership sign-off, I designed and ran an internal survey across commercial stakeholders. The finding: confidence in the agentic extraction model as a revenue-generating direction was high, and the document-first navigation mapped closely to how the sales team already described the product to customers.\n\nThe design vision moved forward to power user testing with internal alignment already established, not as a proposal to debate, but as a shared reference point to build from.",
      },
    ],
  },
  {
    id: "drykorn-plm",
    title: "Toward a single source of truth",
    description:
      "Enterprise PLM implementation across 45 stakeholders, from fragmented spreadsheets to a single source of truth.",
    imageUrl: "/images/case-studies/drykorn-plm/hero-img.png",
    accentColor: "hsl(0, 70%, 55%)",
    heroGradient: "linear-gradient(to bottom, #1a0000, #0a0a0a)",
    tags: ["Service Design", "Change Management", "PLM"],
    featured: true,
    role: "Product Manager & Key User",
    tools: ["Centric 8 PLM", "ERP", "Excel"],
    collaboration: [
      "C-Level",
      "Design Teams",
      "Purchasing",
      "Production",
      "Supply chain",
      "Sales",
      "PLM Consultants",
    ],
    methods: [
      "Stakeholder research & requirements gathering",
      "Workflow design",
      "Workshop facilitation",
      "Change management",
      "Stakeholder management",
    ],
    sections: [
      /* {
        type: "notice",
        body: "Work completed at Drykorn between 2019 and 2022. Some process details have been generalised.",
      }, */
      {
        type: "text",
        heading: "No data, no decision",
        body: "At Drykorn, product development ran on spreadsheets, a legacy ERP, and trust. Trust that the numbers were current. Trust that the handoff was clean. It rarely was. The same problem looked different depending on where you sat.",
      },
      {
        type: "full-width-image",
        image: {
          url: "/images/case-studies/drykorn-plm/quotes.png",
          alt: "Quote mosaic",
        },
      },
      {
        type: "text",
        heading: "The cost of fragmentation",
        body: "Product Developers copied spreadsheet columns into a legacy ERP by hand. Sales data came from SQL queries that were sometimes days old. A mistake in a PM-to-PD handoff wouldn't surface until weeks later, in production, or worse, at market.\n\nThe source of truth didn't exist. Everyone was working from their own version of the same product.",
      },
      {
        type: "full-width-image",
        image: {
          url: "/images/case-studies/drykorn-plm/service-blueprint.png",
          alt: "Diagram showing service blueprint of the PLM implementation, with touchpoints across departments and external consultants",
        },
      },
      {
        type: "text",
        heading: "45 stakeholders, one system",
        body: "The PLM implementation touched every function: C-level, design, purchasing, production, sales. As one of three Key Users in a team of 12, the work spanned requirement gathering, workflow design, training, and change management across all of them.\n\nThe challenge wasn't the software. It was getting 45 people who had never shared a single source of truth to trust one.",
      },
      {
        type: "full-width-image",
        image: {
          url: "/images/case-studies/drykorn-plm/roadmap.png",
          alt: "Roadmap diagram showing phases of the PLM implementation, from requirement gathering through to training and change management",
        },
      },
      {
        type: "text",
        heading: "Making 45 people trust something new",
        body: "Rollout happened in phases. The core functions: design, purchasing, production, sales went first. Business intelligence and supply chain followed as the system proved itself.\n\nThe training model was deliberate. Super Users were trained first so they could train their own teams. That meant the knowledge transferred with context, not just instructions. Weekly alignment meetings kept everyone moving at the same pace.\n\nAt the strategic level, product demos with C-level and key stakeholders kept the vision visible and decisions moving. At the operational level, workshops gathered the domain-specific requirements that made the system actually usable. Separate sessions for menswear and womenswear captured the attributes each category needed for PIM integration.",
      },
      {
        type: "full-width-image",
        image: {
          url: "/images/case-studies/drykorn-plm/metrics.png",
          alt: "Project metrics showing 100% of products in the system within six months of rollout, and 0% errors in handoffs between PM and PD after one year",
        },
      },
      {
        type: "text",
        heading: "The decision that made everything else work",
        body: "Product color codes had shifted every season, the same code referencing a different color the following year. Clean data was impossible without fixing the foundation first.\n\nAfter several sessions and an open discussion with C-level and all stakeholders, one rule was established: four digit codes only, one fixed reference per color, permanently. A full department pushed back. The data made the argument.",
      },
      {
        type: "full-width-image",
        image: {
          url: "/images/case-studies/drykorn-plm/color-codes.png",
          alt: "Before and after showing the same code pointing to different references across seasons versus the fixed one-to-one relationship",
        },
      },
      {
        type: "text",
        heading: "Where design thinking came from",
        body: "Three years of requirement gathering, workflow design, and change management across an entire organisation kept pointing to the same instinct: the process itself could be better. Not just the software, not just the data, but the way work flowed between people, the points where things broke down, the moments where a clearer structure would have saved hours of friction.\n\nThat instinct is design thinking. Recognising it led directly to a transition into design, not as a change of direction, but as finding the discipline for something already there: designing the systems that connect people, process, and outcome.",
      },
    ],
  },
  {
    id: "arco-design-system",
    hidden: true,
    title: "A design system the next tools can read",
    description:
      "A sprawling Figma workspace with no single source of truth. Three team members who had never worked together. Half a day a week to fix it.",
    imageUrl: "/images/case-studies/arco-ds/hero-img.png",
    heroBackground: "#0a1f1e",
    heroBorderColor: "rgba(13, 148, 136, 0.3)",
    accentColor: "#0d9488",
    tags: ["Design Systems", "Token Architecture", "B2B SaaS", "AI Tooling"],
    featured: true,
    role: "Product Designer (Sole Designer)",
    tools: ["Figma", "Storybook", "Notion", "Claude Code"],
    collaboration: ["Cross-functional (Engineering, Product)"],
    methods: [
      "Design system audit",
      "Token architecture",
      "Component inventory",
    ],
    sections: [
      {
        type: "notice",
        body: "Company and product anonymised to protect confidentiality. Design decisions and visual assets reflect work done in role.",
      },
      {
        type: "text",
        heading: "The job wasn't just to clean it up",
        body: "A sprawling Figma workspace with no single source of truth. Three team members who had never worked together. A design library touched by multiple designers over time with no single owner.\n\nHalf a day a week to fix it.\n\nThe job wasn't just to clean it up. It was to build something the whole team and the AI tools coming next could rely on. That required a roadmap before a single token was touched.",
      },
      {
        type: "text",
        heading: "Start with a roadmap, not a fix",
        body: "The first decision was to resist the urge to start fixing immediately. Without understanding the full scope, any fix would be local and temporary. A full design system roadmap was defined first, from synthesising existing work through to governance, giving the team a shared picture of where the system needed to go and in what order.",
      },
      {
        type: "full-width-image",
        image: {
          url: "/images/case-studies/arco-ds/roadmap.png",
          alt: "Weekly schedule showing Friday split between Design Vision and Design System work",
        },
        caption: "Friday was the constraint. Half a day, every week.",
      },
      {
        type: "text",
        heading: "The audit",
        body: "Interface inventory. Gap analysis. A sprawling workspace, 20 hours, three categories of findings: redundant components, components needing updates, and components that should have been variants.\n\nThe token naming convention, color-text-secondary-disabled, was chosen with the frontend developer for continuity and machine readability. Both engineers and AI tooling can parse it without ambiguity. The architecture moved from styles to variables, making tokens readable by Figma MCP, Claude Code, and Figma Make.\n\n86% of tokens reached consistency between Figma and Storybook. The component layer remains in progress.",
      },
      {
        type: "full-width-image",
        image: {
          url: "/images/case-studies/arco-ds/variables-panel.png",
          alt: "Variables panel in Figma showing token architecture with semantic categories and states",
        },
        caption: "The roadmap defined before a single token was touched.",
      },
      {
        type: "text-image",
        heading: "System foundations",
        body: "The file architecture was planned for scale: Foundations, Components, and Patterns as separate concerns, each publishable as a library to feature files. Voice guidelines were aligned with the existing marketing design system for cross-surface consistency.\n\nDesign principles and a shared glossary were initiated, work that was later deprioritised as the team and roadmap evolved.",
        image: {
          url: "/images/case-studies/arco-ds/variable-matrix.png",
          alt: "Variable type matrix showing token architecture across semantic categories",
        },
      },
      {
        type: "text-image",
        heading: "A system the next generation of tools can read",
        body: "A components.md file was created as a structured reference, readable by Claude Code and compatible with Figma Make. The architecture is in place. The pipeline between design system and AI-assisted production is being built in the open.",
        image: {
          url: "/images/case-studies/arco-ds/foundations-diagram.png",
          alt: "System foundations diagram showing Foundations, Components and Patterns architecture",
        },
      },
      {
        type: "text-image",
        heading: "What was built in half a day a week",
        body: "Half a day a week. That was the constraint. In that time: a full roadmap, a token architecture at 86% consistency between Figma and Storybook, and a pipeline between design and AI-assisted production that didn't exist before. The system is not finished. But it has a direction, and the next designer who touches it will know exactly where they are.",
        image: {
          url: "/images/case-studies/arco-ds/annotations.png",
          alt: "Figma variables panel showing token structure",
        },
      },
    ],
  },
  {
    id: "drykorn-suits-system",
    title: "Listening to customers to rebuild the suit as a system",
    description:
      "A declining category rebuilt through field research. Still in the range, still growing, years later.",
    imageUrl: "/images/case-studies/suits/hero-img.png",
    accentColor: "hsl(210, 20%, 35%)",
    heroGradient: "linear-gradient(to bottom, #111827, #030712)",
    tags: ["Service Design", "Field Research", "Systems Design"],
    featured: true,
    role: "Product Manager, Menswear",
    collaboration: [
      "C-Level",
      "Business Development",
      "Purchasing",
      "Supply Chain",
      "Product Development",
      "Sales",
      "Sales Agents",
      "Department Store Buyers",
    ],
    methods: [
      "Sales data analysis",
      "Contextual store research",
      "Customer and non-customer interviews",
      "Channel and frontline interviews",
      "Service blueprinting",
      "Multi-season iteration",
    ],
    sections: [
      /* {
        type: "notice",
        body: "Work completed at Drykorn between 2015 and 2022. Some process details have been generalised.",
      }, */
      {
        type: "text",
        heading:
          "The category that built the brand was the one losing customers.",
        body: "Suits were what people associated with Drykorn menswear. Own sales data and department-store analytics showed a sustained decline, in line with what competitors were seeing across Germany. Letting the category drift was not an option.",
      },
      {
        type: "text",
        heading: "The stores knew things the numbers did not.",
        body: "Before changing a single product, I spent two full days at the Berlin flagship with customers and sales advisors, and ran intercept conversations with potential customers in other shops across the city. The sales team and EU agents had been fielding signals for a while. B2B buyer conversations at exhibitions and input from the head of ecommerce completed the picture.",
      },
      {
        type: "full-width-image",
        image: {
          url: "/images/case-studies/suits/ecosystem-map.svg",
          alt: "Research ecosystem map grouping the people I spoke to into sales data, in-store field research, and trade and digital channels, all converging on one reframe.",
        },
      },
      {
        type: "text",
        heading: "The problem was not demand. What a suit meant had changed.",
        body: "The research contradicted the hypothesis that fewer people needed suits. Customers still wanted a business or occasion look, but work culture had shifted toward something more relaxed, and the existing Baukasten of stiff, skinny-cut suits in black, blue, and occasional grey had not moved with it. The product was answering a question people had stopped asking.",
      },
      {
        type: "full-width-image",
        image: {
          url: "/images/case-studies/suits/reframe.svg",
          alt: "Old-logic versus new-need comparison, four paired rows showing what the Baukasten assumed against what customers actually wanted, resolving in the reframe that demand had shifted rather than vanished.",
        },
      },
      {
        type: "text",
        heading: "Two modular systems for a changed way of dressing.",
        body: "The answer was not one updated suit. It was two systems for two different needs. Split-Suit covered the business occasion: 2-way stretch wool with developed micro designs, a peak-lapel blazer and a shawl-collar tuxedo option, both built to combine with slim suit trousers on bestseller fits. Free-Suit covered the casual business look: a deconstructed make without horsehair or heavy padding, a notch lapel, stretch fabrics across linen, cotton, and wool, paired with chino and pleated-tapered trousers in the full collection colour range.\n\nI owned both systems end to end, from style design and fabric sourcing to fit handover, accessories, and branding.",
      },
      {
        type: "full-width-image",
        image: {
          url: "/images/case-studies/suits/system-diagram.svg",
          alt: "Combinatorial system diagram showing Split-Suit and Free-Suit as small sets of named pieces that resolve into many complete looks.",
        },
      },
      {
        type: "text",
        heading: "Different factories. One suit.",
        body: "The hardest problem was not the garment, it was making the modular promise hold in production. Blazers and trousers made in separate factories risk visible mismatch in colour and texture. The fix was a single bulk fabric allocated centrally across factories, so top and bottom stayed identical, with delivery synchronised so retail received complete sets rather than orphaned pieces and could sell the suit as a unit.",
      },
      {
        type: "full-width-image",
        image: {
          url: "/images/case-studies/suits/service-blueprint.svg",
          alt: "Frontstage and backstage service blueprint. The customer browses, combines, chooses, and receives a complete suit; backstage, one centrally allocated bulk fabric flows through coordinated production and synchronised delivery, the decision that makes the frontstage promise true.",
        },
      },
      {
        type: "text",
        heading: "Retail needed a language to sell something new.",
        // Booklet spread (supporting visual) not built yet. Text-only until it is.
        body: "A modular suit only works if the person selling it can explain it. I created booklets for the sales team and EU agents covering fits, combinations, and fabric and detail callouts, giving everyone the same vocabulary from the showroom to the shop floor.",
      },
      {
        type: "text",
        heading: "Each season taught the next one.",
        // Season timeline (supporting visual) not built yet. Text-only until it is.
        body: "Summer brought pleated shorts and all-over collection prints, extending Free-Suit into warmer months. Split-Suit grew into Drynamic: bi-stretch, water-repellent, breathable, giving the business system an athleisure character. Conversations with the head of ecommerce and department-store buyers shaped styles built for digital imagery and a younger audience, and every season fed back into the brief for the next.",
      },
      {
        type: "text",
        heading: "Still running. Now core.",
        body: "The system launched in FW2017 with a modest first-season uplift and grew from there while competitors pulled back from the category. It expanded from two systems into a broader modular family and moved from a seasonal test into the pre-collection as a permanent core line. The longevity is the evidence: a declining category, rebuilt on research, still in the range years later.",
      },
      // Outcome stat tiles, held until figures are confirmed. Fill values, then place this block above the coda.
      // {
      //   type: "stats",
      //   items: [
      //     { value: "", label: "Seasons running since FW2017" },
      //     { value: "", label: "Modular styles developed" },
      //     { value: "", label: "Category share shift" },
      //   ],
      // },
      {
        type: "text",
        heading: "A product problem, solved as a service problem.",
        body: "The garments were designed, but what made them succeed was the system around them: the research that found the real need, the supply logic that made the product trustworthy, and the sales enablement that gave retail the tools to sell it.",
      },
    ],
  },
  {
    id: "arco-rules",
    title:
      "Configuration design for an agentic system where a wrong rule is a silent failure",
    description:
      "A B2B SaaS document processing product, anonymised. Sole designer, inherited mid-development.",
    imageUrl: "/images/case-studies/arco/hero-img.png",
    tags: ["Feature Design", "B2B SaaS", "JTBD"],
    featured: false,
    role: "Product Designer (Sole Designer)",
    tools: ["Figma", "FigJam", "Shadcn/ui", "Notion"],
    collaboration: ["Cross-functional (Engineering, Product)"],
    methods: ["Jobs to be Done", "Usability testing", "Sales & CS interviews"],
    heroBackground: "#1a1040",
    heroGradient: "linear-gradient(to bottom, #431407, #0a0a0a)",
    heroBorderColor: "rgba(124, 58, 237, 0.3)",
    accentColor: "#ea580c",
    sections: [
      {
        type: "notice",
        body: "Company and product anonymised to protect confidentiality. Design decisions and visual assets reflect work done in role.",
      },
      {
        type: "text",
        heading: "The problem before the problem",
        body: "The feature had no design when I got involved, only an engineering deadline and a rough concept: checkboxes. For a configuration surface with four rule types and three states each, checkboxes meant a save button, 100+ fields on screen, and no visible relationship between what a user set and what the agent would do. The risk wasn't bad UI. It was a user confidently configuring the wrong thing, the agent learning from it, and the user only discovering the mistake weeks later when their dataset was incomplete. By then, restarting would be the only option.\n\nThat's the problem the design had to solve before any component decisions were made.",
      },
      {
        type: "text",
        heading: "The job was clear",
        body: "When configuring rules, users need to immediately understand what each rule does and what happens if they change it. No surprises downstream. With that established, the design decision was deliberate: build something familiar. A configuration component drawing on patterns users already knew from the existing system, covering full functionality without overwhelming.",
      },
      {
        type: "text",
        heading: "The configuration problem",
        body: "The configuration page was the hardest problem. Four rule types, three states each, and a configuration summary that needed to stay visible without interrupting the flow.\n\nThe original approach stepped users through configuration sequentially. The rebuilt version keeps all three states visible at once through tab navigation: active, inactive, excluded. Users immediately understand the consequences of each rule. Every rule affects two things: what gets extracted now and how the agent learns for next time.",
      },
      {
        type: "full-width-image",
        image: {
          url: "/images/case-studies/arco/rules-page.png",
          alt: "Arco rules configuration page showing field list with active, inactive and excluded states",
        },
      },
      {
        type: "text",
        heading: "What changes when a rule changes",
        body: "The hardest design problem wasn't the configuration layout. It was consequence visibility. Every rule in this system does two things simultaneously: it controls what gets extracted now, and it shapes what the agent learns for future extractions. A user who changes a rule without understanding both effects doesn't just affect one session. They affect every session until they catch it, and in a document processing workflow, catching it means auditing output, not reading an error message.\n\nThe consequence modal surfaces exactly what stops, what pauses, and what gets retained before a user commits. Destructive actions require explicit confirmation. This wasn't a safety pattern added at the end. It was the structural requirement that shaped the entire page. The tab navigation keeping all three states visible at once came from the same logic: if users can only see one state at a time, they can't reason about the relationship between them.",
      },
      {
        type: "video",
        url: "/images/case-studies/arco/rules-screen.mp4",
        caption:
          "Consequence modal showing the effects of excluding a field from extractions",
      },
      {
        type: "text",
        heading: "Memory as a rule",
        body: "One rule type stands apart. The memory rule draws from and writes to a list of known values used for fuzzy matching during extraction. Users can view and edit that list directly from the configuration page.",
      },
      {
        type: "full-width-image",
        image: {
          url: "/images/case-studies/arco/memory-modal.png",
          alt: "Memory list modal showing known values for invoice number fuzzy matching",
        },
      },
      {
        type: "text",
        heading: "Beta and what it confirmed",
        body: "The full feature shipped as beta. Scope was deliberate. Ship what real users could validate, hold back what needed more time.\n\nThe rule-based configuration component did not exist in the library before this feature. Introducing a new pattern into a shared system is a commitment. If it fails with users, it creates debt everywhere it's been adopted. Validating it before broader adoption was the right call.\n\nBeta feedback confirmed the core architecture held. Friction surfaced in onboarding, users needed better instructions for interactions that weren't yet intuitive, not in the configuration itself. That distinction mattered: onboarding friction is addressable with copy and guidance. Structural confusion in the configuration would have required a rebuild. It held.",
      },
    ],
  },
];

export function getCaseStudyById(id: string): CaseStudy | undefined {
  return caseStudies.find((study) => study.id === id);
}
