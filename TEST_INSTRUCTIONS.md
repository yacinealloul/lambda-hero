# Take-Home Test — Lambda Hero Section

## Overview

Reconstruct the **hero section** of [lambda.ai](https://lambda.ai) as a pixel-perfect React component.

You have **1 hour**.

---

## What's in this folder

| File | What it is |
|------|------------|
| `artifacts/source_html.html` | The extracted DOM structure of the section |
| `artifacts/styles_css.css` | The extracted CSS — all design tokens, fonts, and component styles |
| `artifacts/screenshot.png` | Reference screenshot of the target output |
| `guidelines.json` | Design system overview — colors, typography, spacing |

**The CSS file is your source of truth.** Every value you need is in there. Do not guess or invent values.

---

## AI Tool Rules

**This test must be completed using [Claude Code](https://claude.ai/code) only.**

- You must use Claude Code (the CLI tool) as your AI assistant throughout the test
- No other AI tools are permitted — not ChatGPT, Copilot, Cursor, v0, Bolt, or any other assistant
- Your prompting approach, how you communicate the task to Claude, and how you guide it toward the correct output are all part of what we are assessing
- The quality of your prompts matters as much as the final output

---

## Requirements

### Framework
- **React** is required
- You may use any React framework or router: **Next.js, Vite + React Router, TanStack Router, Remix**, etc.
- Tailwind CSS is required — the extracted CSS is written in plain CSS and it should be converted into Tailwind CSS

### What to build
Reconstruct the hero section exactly as shown in `artifacts/screenshot.png`. It includes:

1. **Full-screen layout** — the section fills (or nearly fills) the viewport height
2. **Animated background** — the streaking light/particle animation behind the heading
3. **Eyebrow text** — "Supercomputers for training and inference"
4. **Main heading** — "The Superintelligence Cloud" with a specific letter animation (study the screenshot closely — certain letters use a different font)
5. **Two CTA buttons** — "Launch GPU instance" and "Talk to our team" with distinct styles

### The heading animation
Look at the screenshot carefully. The heading is not static — specific letters render in a different typeface. The CSS file contains everything you need to understand and implement this effect. The implementation is up to you.

---

## What "visually perfect" means

The reconstruction must match the original so closely that a designer reviewing both side by side would not be able to tell which is the original.

- **Colors, gradients, and shadows** match exactly
- **Typography** (font family, size, weight, line height, letter spacing) matches exactly
- **Spacing and padding** between elements matches exactly
- **Layout and alignment** match exactly
- **Component shapes** (border radius, proportions) match exactly
- **Hover states** on buttons behave consistently with the original
- The section is **responsive** — it should work across screen sizes

---

## Submission

1. Complete your implementation
2. Zip the project folder **without `node_modules`**
3. Upload the zip to the Google Drive link shared with you

---

## Using the live website

**You must visit [lambda.ai](https://lambda.ai) and study the hero section directly** — particularly for the heading animation. The screenshot alone is not enough to fully understand how it works. Open the browser DevTools, watch the animation in the Elements panel, inspect how the font changes, observe the timing, and look at the network tab for animation assets.

The provided CSS package covers the core design system and component styles, but the live site is the authoritative reference for anything you can't find in the extracted files — animation timing, interaction behaviour, network assets, or any detail that's unclear from the static screenshot.

Use DevTools freely: inspect computed styles, copy values, monitor network requests. There are no restrictions on what you observe. The goal is to match the original as closely as possible — how thoroughly you investigate the live site is part of what we're evaluating.

---

## Tips

- Start with the CSS variables in `styles_css.css` — they define the entire design system
- The fonts are loaded from a CDN — the `@font-face` declarations in the CSS file include the URLs
- The background animation JSON is publicly accessible from Lambda's CDN
- If you can't find a specific value in the extracted CSS, inspect it directly on the live site
- `guidelines.json` has a breakdown of the section structure if you need orientation
- Use the screenshot and the live site as your primary visual references throughout
