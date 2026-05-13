# Lambda Hero — Recreation

Pixel-perfect recreation of the [lambda.ai](https://lambda.ai) hero section, built as a take-home test.

## Stack

- **Next.js 16** (App Router) + **React 19** + **TypeScript**
- **Tailwind CSS v4** with `@theme inline` exposing Lambda's design tokens
- **Motion** (`motion/react`, formerly Framer Motion) for all animations
- **shadcn** for primitives + `cn()` utility
- **Unicorn Studio** (WebGL) for the background — using Lambda's actual scene JSON, not a recreation

## Project structure

```
src/
├── app/
│   ├── layout.tsx                ← Root layout: Header + AgentRail + page wrapper
│   ├── page.tsx                  ← Home page (renders <Hero />)
│   └── globals.css               ← Tailwind + Lambda tokens (colors, fonts, spacing,
│                                    chromatic shadows) + utility classes ported from
│                                    the original CSS (`.lambda-h1-large`, `.lambda-btn`, …)
│
├── components/
│   ├── effects/                  ← Visual / animation primitives, framework-agnostic
│   │   ├── background-animation.tsx  ← Wraps the Unicorn Studio scene + Motion fade-in
│   │   ├── font-swap.tsx             ← Single-letter font-swap island (pixel/highlight
│   │   │                                cycling; disabled under prefers-reduced-motion)
│   │   └── hyper-text.tsx            ← Scramble-on-mount text effect
│   │
│   ├── layout/                   ← Site chrome — header, nav, drawers, brand mark
│   │   ├── header.tsx                ← Top-level orchestrator: state, hover tracking,
│   │   │                                composes LeftCluster / RightCluster / mobile
│   │   ├── nav-config.ts             ← Pure data + types (NAV_ITEMS, GET_STARTED_MENU)
│   │   ├── mega-menu.tsx             ← Desktop dropdown panel + columns + helpers
│   │   │                                (DottedDivider, LinkList, MegaColumnStatic)
│   │   ├── mobile-menu.tsx           ← Mobile drawer + hamburger/X toggle + accordion
│   │   ├── logo.tsx                  ← Inline SVG wordmark
│   │   └── agent-terminal-rail.tsx   ← Fixed right-edge rail (panel icon + vertical
│   │                                    "// LAMBDA AGENT TERMINAL //" text)
│   │
│   ├── marketing/                ← Hero section pieces — domain components
│   │   ├── hero.tsx                  ← Section shell, assembles the 4 parts below
│   │   ├── eyebrow.tsx               ← "Supercomputers for training and inference"
│   │   ├── hero-title.tsx            ← "The Superintelligence Cloud" + 3 FontSwap letters
│   │   └── cta-buttons.tsx           ← "Launch GPU instance" + "Talk to our team"
│   │
│   └── ui/                       ← shadcn primitives
│       └── button.tsx
│
└── lib/
    └── utils.ts                  ← cn() — class merging helper

public/
└── motion/
    └── superintelligence-II-1.json  ← Lambda's actual Unicorn Studio scene
                                        (7-layer WebGL shader stack)

artifacts/                        ← Reference material (provided with the test)
├── source_html.html
├── styles_css.css
└── screenshot.png
```

## Conventions

- **Tokens over hardcoded values.** Colors, fonts, spacing, and the chromatic
  shadows live in `globals.css` as CSS custom properties and are exposed to
  Tailwind via `@theme inline`. Components reference them through arbitrary
  values like `text-[color:var(--color-shell)]`.
- **One file per component.** Larger components are split into helpers in the
  same file when they are not reused (e.g. `LeftCluster` lives inside
  `header.tsx` because it has no other consumer).
- **Data is separated from rendering.** Navigation structure is in
  `nav-config.ts`, not inlined.
- **Effects are stateless visual primitives.** Anything in `effects/` can be
  dropped into any page without coupling.
- **Accessibility first.** `sr-only` labels on the animated heading,
  `aria-expanded` on toggles, `aria-modal` on the mobile drawer,
  `useReducedMotion()` short-circuits both the canvas and the letter cycling.

## Responsive breakpoints

| Breakpoint | What changes |
|------------|--------------|
| `< md` (< 768px) | Mobile drawer with accordion submenus, hamburger toggle |
| `md → lg` | Full desktop nav (logo + tabs + login + CTA), no agent rail |
| `lg+` (≥ 1024px) | Adds the right-edge agent terminal rail; header reserves 40px |

Hero typography scales at 480 / 768 / 1024 / 1280 px breakpoints — matching the
exact values from the provided `styles_css.css`.
