---
name: spentit-design
description: Use this skill to generate well-branded interfaces and assets for SpentIt — the 100% offline, privacy-first mobile expense tracker — for production or throwaway prototypes/mocks. Contains essential design guidelines, colors, type, fonts, assets, and UI kit components for prototyping.
user-invocable: true
---

# SpentIt Design Skill

Read `readme.md` in this skill first — it is the full design guide (content voice, visual foundations, iconography, and a manifest of every token, component, and screen). Then explore the other files as needed.

**Foundations**

- `styles.css` — link this one file; it imports all tokens and fonts.
- `tokens/` — color, typography, spacing, and font tokens (CSS custom properties).
- `assets/` — app icon and wallet logo.

**Components** (`components/core/`) — React primitives. Each has a `.jsx`, a `.d.ts` props contract, and a `.prompt.md` with a one-liner + usage example. They render off the CSS variables in `styles.css`.

**UI kit** (`ui_kits/spentit-app/`) — a working, interactive recreation of the mobile app. Read these screens to match real layouts before designing new ones.

## How to work

- **Visual artifacts** (slides, mocks, throwaway prototypes): copy the assets and tokens you need into your output folder and produce static/self-contained HTML the user can open. Use the `Icon` component's inline-SVG approach — never runtime icon fonts.
- **Production code**: read the rules here and the source repo ([`jyotiprakashh/spent-it@dev`](https://github.com/jyotiprakashh/spent-it)) to become an expert in the brand, then implement against the real tokens.

## Non-negotiables

- One typeface: **Spline Sans**. One accent: **spring green `#00D09C`**. Everything else monochrome neutral.
- Flat surfaces, 14px card radius, **one shadow** (the FAB). Soft press-shrink motion only.
- Money is always rendered through the `Money` treatment (tabular numerals, −0.2 tracking, ₹ / en-IN).
- **No emoji in product UI.** Outline icons only; solid marks only inside the FAB / selected states.
- Voice: plain, calm, second-person. Privacy stated as fact. Never hype.

If the user invokes this skill without specifics, ask what they want to build, ask a few focused questions, then act as an expert SpentIt designer — outputting HTML artifacts or production code as the task demands.
