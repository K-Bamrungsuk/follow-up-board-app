---
name: Nordic Operational CRM
colors:
  surface: '#faf8ff'
  surface-dim: '#d2d9f4'
  surface-bright: '#faf8ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f2f3ff'
  surface-container: '#eaedff'
  surface-container-high: '#e2e7ff'
  surface-container-highest: '#dae2fd'
  on-surface: '#131b2e'
  on-surface-variant: '#464555'
  inverse-surface: '#283044'
  inverse-on-surface: '#eef0ff'
  outline: '#777587'
  outline-variant: '#c7c4d8'
  surface-tint: '#4d44e3'
  primary: '#3525cd'
  on-primary: '#ffffff'
  primary-container: '#4f46e5'
  on-primary-container: '#dad7ff'
  inverse-primary: '#c3c0ff'
  secondary: '#006591'
  on-secondary: '#ffffff'
  secondary-container: '#39b8fd'
  on-secondary-container: '#004666'
  tertiary: '#005338'
  on-tertiary: '#ffffff'
  tertiary-container: '#006e4b'
  on-tertiary-container: '#67f4b7'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#e2dfff'
  primary-fixed-dim: '#c3c0ff'
  on-primary-fixed: '#0f0069'
  on-primary-fixed-variant: '#3323cc'
  secondary-fixed: '#c9e6ff'
  secondary-fixed-dim: '#89ceff'
  on-secondary-fixed: '#001e2f'
  on-secondary-fixed-variant: '#004c6e'
  tertiary-fixed: '#6ffbbe'
  tertiary-fixed-dim: '#4edea3'
  on-tertiary-fixed: '#002113'
  on-tertiary-fixed-variant: '#005236'
  background: '#faf8ff'
  on-background: '#131b2e'
  surface-variant: '#dae2fd'
typography:
  display-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 36px
    fontWeight: '700'
    lineHeight: 44px
    letterSpacing: -0.025em
  display-lg-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 36px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
    letterSpacing: -0.015em
  headline-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '600'
    lineHeight: 24px
    letterSpacing: -0.01em
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  body-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 16px
  label-md:
    fontFamily: Inter
    fontSize: 13px
    fontWeight: '500'
    lineHeight: 18px
  label-sm:
    fontFamily: Inter
    fontSize: 11px
    fontWeight: '600'
    lineHeight: 14px
    letterSpacing: 0.025em
  metric-value:
    fontFamily: Plus Jakarta Sans
    fontSize: 30px
    fontWeight: '700'
    lineHeight: 36px
    letterSpacing: -0.02em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1.5rem
  gutter-mobile: 0.75rem
  margin: 2rem
  margin-mobile: 1rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2rem
  space-2xl: 3rem
---

## Brand & Style

This design system embodies Scandinavian functionalism refined for mission-critical B2B pipeline execution: restrained, hyper-legible, frictionless, and orderly. The interface prioritizes cognitive clarity and rapid task recovery over ornamentation. Every element directly serves information scent, pipeline hygiene, or action velocity.

Key design attributes:
- **Pragmatic Elegance:** Generous negative space paired with micro-density in high-frequency data matrices.
- **Architectural Neutrality:** Surfaces recede through crisp slate-tinted off-whites, allowing multi-stage follow-up statuses (leads, progress, urgent tasks, resolutions) to stand out cleanly without visual exhaustion.
- **Calm Authority:** Subtle, high-precision hairline borders combined with soft ambient light, eschewing loud gradients or heavy dropshadows in favor of crisp spatial hierarchy.

## Colors

The palette employs a functional status-driven model built on a foundational matrix of slate and cool grays, anchored by an authoritative indigo primary:

- **Primary Canvas & Surfaces:** Main application backdrop uses `#F8FAFC`, with nested panels and cards rendered in `#FFFFFF`. Sub-tier surfaces (table headers, search rails, inactive control wells) employ `#F1F5F9`.
- **Borders & Dividers:** Subtle structural lines use `#E2E8F0` for card borders, interior table dividers, and input strokes, switching to `#CBD5E1` for hover states.
- **Text & Content Hierarchy:**
  - High Emphasis (Headings, primary values): `#0F172A`
  - Medium Emphasis (Body, table content, labels): `#334155`
  - Low Emphasis (Secondary metadata, timestamps, placeholders): `#64748B`
  - Disabled / Muted (Inactive icons, structural rules): `#94A3B8`
- **Functional Pipeline Semantics:**
  - **Primary Action / Core Identity:** Deep Indigo `#4F46E5` (Hover: `#4338CA`)
  - **New / Active Lead:** Sky Blue `#0EA5E9` (Background pill: `#F0F9FF`, Border: `#BAE6FD`, Text: `#0369A1`)
  - **In Progress / Pending:** Warm Amber `#F59E0B` (Background pill: `#FFFBEB`, Border: `#FDE68A`, Text: `#B45309`)
  - **Success / Closed Won / Done:** Emerald `#10B981` (Background pill: `#ECFDF5`, Border: `#A7F3D0`, Text: `#047857`)
  - **Urgent / Overdue / Warning:** Rose Red `#EF4444` (Background pill: `#FEF2F2`, Border: `#FECACA`, Text: `#B91C1C`)

## Typography

The typography pairs **Plus Jakarta Sans** for structural orientation and key numerical KPIs with **Inter** for dense transactional interfaces, table records, and form fields.

Guidelines:
- **Numbers & Currencies:** Use `tabular-nums` for all table columns, metric counters, and timestamps to eliminate visual jitter across adjacent records.
- **Status Badges & Micro-tags:** `label-sm` must be rendered in uppercase or title-case with slight positive tracking (`+0.025em`) to ensure legibility on colored tint surfaces.
- **Reading Hierarchy:** Headings over 20px enforce negative tracking (`-0.015em` to `-0.025em`) to achieve a balanced, modern Nordic editorial feel.

## Layout & Spacing

This design system uses an adaptable fluid-grid system optimized for widescreen CRM views, balanced by strict viewport ceilings to prevent line lengths from exceeding ergonomic limits:

- **Desktop (1280px+):** Fixed 260px collapsible navigation rail, fluid main stage (max-width `1600px`), 12-column layout with `1.5rem` gutters and `2rem` page padding.
- **Tablet (768px - 1279px):** Navigation rail collapses into an icon-only dock (72px) or off-canvas drawer. The grid drops to 8 columns with `1rem` gutters. Slide-overs adapt to a fixed 480px width or 60% viewport width.
- **Mobile (<768px):** Single-column stack with `1rem` edge margins. Table views transition to record-card lists; complex filters move to a bottom-sheet modal.

Rhythm is based on an 8pt base unit (sub-divided to 4pt for micro-alignments such as badge padding, icon-text pairings, and table cell heights).

## Elevation & Depth

Visual separation relies on clean surface layering reinforced by hairline outlines (`#E2E8F0`) and diffused, slate-tinted shadows. Heavy drop shadows and glossy skeuomorphism are strictly avoided.

Elevation Tiers:
- **Base Canvas (`elevation-0`):** `#F8FAFC`. Completely flat; houses structural page backgrounds.
- **Card & Data Panels (`elevation-1`):** `#FFFFFF`, hairline border `1px solid #E2E8F0`, shadow `0 1px 3px 0 rgba(15, 23, 42, 0.04), 0 1px 2px -1px rgba(15, 23, 42, 0.02)`.
- **Card Hover / Dragged States (`elevation-2`):** `#FFFFFF`, hairline border `1px solid #CBD5E1`, shadow `0 4px 6px -1px rgba(15, 23, 42, 0.07), 0 2px 4px -2px rgba(15, 23, 42, 0.04)`.
- **Dropdowns, Popovers & Context Menus (`elevation-3`):** `#FFFFFF`, border `1px solid #E2E8F0`, shadow `0 10px 15px -3px rgba(15, 23, 42, 0.08), 0 4px 6px -4px rgba(15, 23, 42, 0.03)`.
- **Slide-overs & Modals (`elevation-4`):** `#FFFFFF`, backdrop overlay `rgba(15, 23, 42, 0.45)` with `backdrop-filter: blur(4px)`, shadow `0 20px 25px -5px rgba(15, 23, 42, 0.1), 0 8px 10px -6px rgba(15, 23, 42, 0.04)`.

## Shapes

The design uses a clean, architectural shape language:
- **Standard UI Elements (`0.5rem` / 8px):** Form inputs, buttons, standard card panels, contextual flyouts, and metric widgets.
- **Large Containers (`1rem` / 16px):** Slide-over drawers, dialog modals, and primary application shell panels.
- **Status Pills, Avatars & Micro-Chips:** Full pill curvature (`9999px`) to immediately signal interactive filters and follow-up status badges.
- **Strict Regularity:** Do not mix soft and sharp elements in the same card view. Inputs nested inside a card (`0.5rem`) must maintain consistent radii with their sibling elements.

## Components

### Metric KPI Cards
- Standard layout: 16px internal padding (`space-md`), white background, subtle border `#E2E8F0`.
- Structure: Top row contains KPI label (`label-md` in `#64748B`) and optional icon or period badge. Center displays numerical value using `metric-value` (`#0F172A`). Bottom row shows comparative delta trend pills (e.g., `+12.4% vs last week` with Emerald `#10B981` text and micro arrow).

### Data Tables & Status Badges
- Headers: 36px height, surface `#F8FAFC`, bottom border `1px solid #E2E8F0`, uppercase `label-sm` text in `#64748B`.
- Rows: 52px default height (44px compact view), `#FFFFFF` surface with `#F8FAFC` zebra-hover. Bottom hairline divider `1px solid #F1F5F9`.
- Status Badges: Height 22px, `rounded-full`, padding `2px 8px`, `label-sm`. Always rendered with tinted background and matching text:
  - *Lead / New:* `#F0F9FF` background, `#0369A1` text, `#BAE6FD` border.
  - *In Progress:* `#FFFBEB` background, `#B45309` text, `#FDE68A` border.
  - *Urgent / Overdue:* `#FEF2F2` background, `#B91C1C` text, `#FECACA` border.
  - *Done / Won:* `#ECFDF5` background, `#047857` text, `#A7F3D0` border.

### Buttons & Interactive Controls
- **Primary:** Solid `#4F46E5`, text `#FFFFFF`, hover `#4338CA`, active `#3730A3`. Height: 38px, radius `0.5rem`.
- **Secondary / Outline:** Background `#FFFFFF`, border `1px solid #E2E8F0`, text `#334155`, hover background `#F8FAFC` and border `#CBD5E1`.
- **Ghost / Action Trigger:** Background transparent, text `#64748B`, hover `#F1F5F9`, text hover `#0F172A`.

### Form Inputs & Search/Filter Bars
- Base: Height 38px, radius `0.5rem`, border `1px solid #E2E8F0`, background `#FFFFFF`, text `#0F172A`, placeholder `#94A3B8`.
- Focus State: Border color `#4F46E5`, outline `2px solid rgba(79, 70, 229, 0.15)`.
- Global Filter Bar: Combines unified search (`38px`) with inline filter tags, clear-all action, and sort selectors in a horizontal layout.

### Slide-Over Drawers (Contact Details & Follow-up Actions)
- Dimensions: 540px desktop width, docked flush right, full height.
- Header: Sticky top bar with lead name, quick stage badge switcher, and close action.
- Content Stack: Activity timeline with color-coded follow-up milestones (call, email, meeting), quick-note rich text input, and upcoming scheduled interactions.
- Footer: Sticky action area with primary update button and secondary rescheduling actions.

### Tabs & Navigation Switches
- Segmented style: Height 36px, background `#F1F5F9`, border radius `0.5rem`, padding `2px`.
- Active segment: Background `#FFFFFF`, text `#0F172A`, box shadow `0 1px 2px rgba(15, 23, 42, 0.06)`, radius `6px`. Inactive text `#64748B`.