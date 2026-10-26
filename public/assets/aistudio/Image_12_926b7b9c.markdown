---
name: DevCritique Minimal
colors:
  surface: '#0f131c'
  surface-dim: '#0f131c'
  surface-bright: '#353943'
  surface-container-lowest: '#0a0e17'
  surface-container-low: '#181b25'
  surface-container: '#1c1f29'
  surface-container-high: '#262a34'
  surface-container-highest: '#31353f'
  on-surface: '#dfe2ef'
  on-surface-variant: '#c7c4d7'
  inverse-surface: '#dfe2ef'
  inverse-on-surface: '#2c303a'
  outline: '#908fa0'
  outline-variant: '#464554'
  surface-tint: '#c0c1ff'
  primary: '#c0c1ff'
  on-primary: '#1000a9'
  primary-container: '#8083ff'
  on-primary-container: '#0d0096'
  inverse-primary: '#494bd6'
  secondary: '#d0bcff'
  on-secondary: '#3c0091'
  secondary-container: '#571bc1'
  on-secondary-container: '#c4abff'
  tertiary: '#ffb783'
  on-tertiary: '#4f2500'
  tertiary-container: '#d97721'
  on-tertiary-container: '#452000'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#e1e0ff'
  primary-fixed-dim: '#c0c1ff'
  on-primary-fixed: '#07006c'
  on-primary-fixed-variant: '#2f2ebe'
  secondary-fixed: '#e9ddff'
  secondary-fixed-dim: '#d0bcff'
  on-secondary-fixed: '#23005c'
  on-secondary-fixed-variant: '#5516be'
  tertiary-fixed: '#ffdcc5'
  tertiary-fixed-dim: '#ffb783'
  on-tertiary-fixed: '#301400'
  on-tertiary-fixed-variant: '#703700'
  background: '#0f131c'
  on-background: '#dfe2ef'
  surface-variant: '#31353f'
typography:
  headline-xl:
    fontFamily: Plus Jakarta Sans
    fontSize: 36px
    fontWeight: '700'
    lineHeight: 44px
  headline-xl-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 34px
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 30px
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 26px
  headline-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '600'
    lineHeight: 22px
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
  label-lg:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 18px
  label-md:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
  label-sm:
    fontFamily: Inter
    fontSize: 10px
    fontWeight: '600'
    lineHeight: 12px
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  gutter: 1rem
  gutter-mobile: 0.75rem
  margin: 1.25rem
  margin-mobile: 1rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2rem
---

## Brand & Style

This design system targets software engineers, product architects, and engineering leaders seeking high-signal technical appraisals without marketing fluff. The aesthetic is ultra-minimalist, editorial-tech, and razor-sharp. 

The emotional signature is objective clarity, analytical authority, and frictionless utility. The design balances a stark monochrome foundation with high-precision accents to maintain extreme informational density without visual fatigue. Visual clutter is stripped away in favor of razor-thin structural borders, precise spatial pacing, and disciplined micro-interactions.

## Colors

The palette is engineered around an obsidian dark mode base (`#090D16`), supported by cold slate neutrals for layered surfaces and dividers. The core interaction accent is an electric indigo (`#6366F1`), paired with an electric violet (`#8B5CF6`) reserved specifically for automated telemetry, consensus metrics, and AI assistant badges.

### Color Tokens & Hierarchy
- **Canvas Base**: `#090D16` — Deep slate-black canvas background.
- **Surface Elevation 1**: `#0F172A` — Primary container cards and structural surfaces.
- **Surface Elevation 2**: `#1E293B` — Secondary interactive surfaces, hover states, and input tracks.
- **Surface Elevation 3 / Border Default**: `#334155` — Structural hairpins, inactive icons, and ghost boundaries.
- **Text Primary**: `#F8FAFC` — Pure contrast headline and body readability.
- **Text Secondary**: `#94A3B8` — Metadata, metrics labels, and timestamps.
- **Text Tertiary**: `#64748B` — Structural placeholders, hints, and disabled indicators.
- **Accent Primary (Electric Indigo)**: `#6366F1` — Interactive affordances, active nav tabs, primary actions.
- **Accent Secondary (Electric Violet)**: `#8B5CF6` — AI synthesis indicators, machine-generated verdict badges.
- **Functional Semantics**:
  - Critical/Error: `#F43F5E`
  - Success/Verified: `#10B981`
  - Warning/Caution: `#F59E0B`

## Typography

Typography establishes strict hierarchy across metric-dense layouts. Plus Jakarta Sans lends a crisp, geometric, modern edge to headings without straying into consumer novelty. Inter handles continuous prose, tabular metrics, and metadata with optimal pixel clarity at small screen widths.

Numeric readouts, benchmark percentages, and code-adjacent identifiers leverage tabular figures (`tnum`) to maintain vertical alignment throughout rating comparisons.

## Layout & Spacing

The layout is built for mobile ergonomics, employing a strict 4-column fluid mobile grid switching to an 8-column layout on larger tablet viewport form factors.

- Outer screen margins are locked to `1rem` on narrow viewports to maximize line length for code and review reviews, expanding to `1.25rem` on larger mobile viewports.
- Structural component padding strictly defaults to `space-md` (`1rem`) internally for compact cards, and `space-lg` (`1.5rem`) for standalone summary cards.
- Content reflow prioritizes single-thumb vertical scrolling. Complex comparison tables convert into horizontally swipeable, pinned-header cards on screens under 600px wide.

## Elevation & Depth

This system intentionally eliminates traditional heavy drop shadows in favor of subtle luminance tiers and crisp hairline outlines. 

- **Tonal Layers**: Visual hierarchy is constructed by stacking surface values (`#090D16` base canvas -> `#0F172A` card layer -> `#1E293B` nested inner element).
- **Hairline Outlines**: Elements use a consistent `1px` border of `rgba(255, 255, 255, 0.08)` or `#334155`. 
- **Subtle Glow Elevation**: Interactive focus states and highlighted AI features utilize a soft, directional ambient glow: `0 0 16px -4px rgba(99, 102, 241, 0.25)`.
- **Top App Bar & Bottom Navigation**: Structured with a frosted surface (`#090D16` at 85% opacity with `backdrop-filter: blur(12px)`) bound by a single `1px` border separator.

## Shapes

The geometric framework is tuned to level 1 ("Soft"), favoring an engineered, architectural feel:
- Standard buttons, text fields, cards, and bottom sheets: `0.25rem` (4px).
- Larger container surfaces and modal overlays: `0.5rem` (8px).
- Badges, status pills, and toggle indicators remain tightly contained pills with `9999px` radius to clearly differentiate metadata tags from interactive square cards.

## Components

### Buttons
- **Primary**: Solid background `#6366F1`, label `#FFFFFF` in `label-lg`, height 44px, border radius 4px. Active state scales subtly to `0.98`.
- **Secondary / Ghost**: Transparent background, border `1px solid #334155`, label `#F8FAFC`.
- **Icon Action Buttons**: 40x40px interactive hit area, centered 20px vector icons, background `#0F172A`, border `1px solid rgba(255, 255, 255, 0.08)`.

### Navigation
- **Top App Bar**: 56px fixed height, frosted backdrop, centered platform logo or screen title in `headline-sm`, left action (nav drawer/back chevron), right action (search or filter).
- **Bottom Navigation Bar**: 64px fixed height plus device safe area. 4 or 5 primary tabs with 20px icons, 10px labels (`label-sm`). Inactive icons `#64748B`; active icon `#6366F1` accented with a top 2px indicator bar.

### Cards & Review Modules
- **Software Review Card**: Background `#0F172A`, border `1px solid rgba(255, 255, 255, 0.08)`, 16px padding. Displays software identity, version tag, consensus score pill (e.g., `9.4/10`), pros/cons bullet fragments, and reviewer credential tag.
- **Metric Micro-Card**: Background `#1E293B`, compact 8px padding, numeric readout in `headline-sm` with tabular spacing.

### AI Assistant Badges & Syntheses
- **AI Verdict Badge**: Pill shape, background `rgba(139, 92, 246, 0.12)`, border `1px solid rgba(139, 92, 246, 0.35)`, text `#8B5CF6` in `label-sm`, prepended by a 12px spark icon.
- **AI Summary Card**: Inset block featuring a left border accent (`2px solid #8B5CF6`) and subtle gradient wash across `#0F172A`.

### Inputs & Search Fields
- 44px height, background `#0F172A`, border `1px solid #334155`. 
- Placeholder text in `#64748B`. Focused state border shifts to `#6366F1` with zero drop shadow.

### Status & Feedback States
- **Loading State**: Content skeletons render in `#1E293B` with a shimmer pass in `rgba(255, 255, 255, 0.04)`.
- **Empty State**: Centered minimalist wireframe glyph (`#334155`), followed by `headline-sm` header and single secondary trigger button.
- **Error State**: Non-blocking toast or banner with `#0F172A` background, `1px solid #F43F5E`, error description in `body-sm`, and an immediate "Retry" inline action.