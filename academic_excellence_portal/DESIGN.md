---
name: Academic Excellence Portal
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
  on-surface-variant: '#444651'
  inverse-surface: '#283044'
  inverse-on-surface: '#eef0ff'
  outline: '#757682'
  outline-variant: '#c5c5d3'
  surface-tint: '#4059aa'
  primary: '#00236f'
  on-primary: '#ffffff'
  primary-container: '#1e3a8a'
  on-primary-container: '#90a8ff'
  inverse-primary: '#b6c4ff'
  secondary: '#904d00'
  on-secondary: '#ffffff'
  secondary-container: '#fe932c'
  on-secondary-container: '#663500'
  tertiary: '#002e44'
  on-tertiary: '#ffffff'
  tertiary-container: '#004565'
  on-tertiary-container: '#36b6fb'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#dce1ff'
  primary-fixed-dim: '#b6c4ff'
  on-primary-fixed: '#00164e'
  on-primary-fixed-variant: '#264191'
  secondary-fixed: '#ffdcc3'
  secondary-fixed-dim: '#ffb77d'
  on-secondary-fixed: '#2f1500'
  on-secondary-fixed-variant: '#6e3900'
  tertiary-fixed: '#c9e6ff'
  tertiary-fixed-dim: '#89ceff'
  on-tertiary-fixed: '#001e2f'
  on-tertiary-fixed-variant: '#004c6e'
  background: '#faf8ff'
  on-background: '#131b2e'
  surface-variant: '#dae2fd'
typography:
  display-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 32px
    fontWeight: '800'
    lineHeight: 40px
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 26px
    fontWeight: '800'
    lineHeight: 34px
    letterSpacing: -0.01em
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 32px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 20px
    fontWeight: '700'
    lineHeight: 28px
  headline-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 24px
  title-md:
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
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 18px
  label-lg:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.01em
  label-md:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.02em
  label-sm:
    fontFamily: Inter
    fontSize: 11px
    fontWeight: '700'
    lineHeight: 14px
    letterSpacing: 0.04em
  data-mono:
    fontFamily: Inter
    fontSize: 13px
    fontWeight: '500'
    lineHeight: 18px
    letterSpacing: -0.01em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1rem
  gutter-tablet: 1.5rem
  gutter-desktop: 2rem
  margin: 1rem
  margin-tablet: 2rem
  margin-desktop: 3rem
  space-2xs: 0.25rem
  space-xs: 0.5rem
  space-sm: 0.75rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2rem
  space-2xl: 3rem
---

## Brand & Style

The design system projects institutional credibility, quiet warmth, and administrative clarity. Serving parents, teachers, and students within rural and semi-urban India, the interface prioritizes high-contrast legibility, friction-free daily utility (attendance checks, fee payments, report cards), and a dignified institutional presence.

The visual direction combines **Modern Corporate Precision** with subtle **Academic Traditionalism**:
- Deep, reassuring navy and royal oxford foundations convey permanence and institutional trust.
- Amber-gold accents introduce celebration, merit, and high-visibility touchpoints for awards and urgent actions.
- Tactile, crisp white cards rest against softly calibrated slate-alabaster surfaces, avoiding clinical coldness while maximizing daylight legibility on budget-to-midrange mobile screens.
- Interaction states favor deliberate, high-feedback micro-transitions (subtle scale, crisp border transitions) to instill confidence during critical transactional tasks such as fee submission and record tracking.

## Colors

The color architecture ensures strict hierarchy and unambiguous semantic feedback across everyday educational tasks.

### Core Swatches
- **Primary Brand (`#1E3A8A`)**: Oxford Blue. Used for major app bars, active bottom navigation states, primary buttons, and institutional headers.
- **Deep Navy (`#0F172A`)**: Base neutral tone for high-contrast primary typography and midnight-toned structural chrome.
- **Academic Gold Accent (`#D97706` / `#F59E0B`)**: Used selectively for academic merit emblems, topper badges, primary conversion buttons (e.g., "Pay Fees Now"), and star ratings.
- **Sky Informational (`#0EA5E9`)**: Reserved for general administrative circulars, scheduled timetable changes, and non-blocking notifications.

### Semantic Status Tones
- **Present / Paid / Cleared (`#10B981`)**: Unambiguous emerald indicator paired with 10% opacity tints for background badges.
- **Absent / Overdue / Critical Alert (`#EF4444`)**: High-visibility crimson indicating student absence, fee arrears, or immediate administrative alerts.
- **Pending / Upcoming (`#F59E0B`)**: Amber gold signifying evaluation in progress or upcoming tests.

### Surface Tonalities
- **Canvas Base**: `#F8FAFC` to reduce glare under harsh ambient lighting.
- **Muted Surface / Inset Containers**: `#F1F5F9` for table zebra-striping, inactive filter bars, and card headers.
- **Elevated Surface**: `#FFFFFF` for interactive cards, modals, and sheets.
- **Structural Dividing Line**: `#E2E8F0` for card borders, form outlines, and divider rules.

## Typography

The type system pairs **Plus Jakarta Sans** for headings and badges with **Inter** for dense transactional reading, timetables, and numerical data tables.

- **Plus Jakarta Sans** carries rounded geometry and high x-height, lending personality to school honors, section headers, and names without sacrificing structure.
- **Inter** handles high-density data matrices: admission register numbers, grade sheets, fee receipts, and dates. Tabular lining numbers (`tnum`) must be enforced for fee summaries and attendance counts to guarantee vertical column alignment.
- Never use display styles below 18px. For student rank pills and status badges, use `label-sm` with uppercase transformation and explicit tracking.

## Layout & Spacing

A mobile-first fluid layout drives all views, anchored by an 8-point spatial cadence (with 4px half-steps for compact UI like chips and table rows).

### Viewport Architecture
- **Mobile (<640px)**: Single column with a base edge margin of `1rem` (16px) and gutters of `1rem`. Content relies on vertical stacked cards and fixed bottom navigation to allow single-thumb operation.
- **Tablet (640px–1023px)**: 8-column layout with `1.5rem` gutters and `2rem` outer margins. Left-hand drawer replaces bottom navigation; student profiles switch to split-pane master-detail views.
- **Desktop (≥1024px)**: 12-column fixed-max layout clamped to 1280px container width. Margins expand dynamically; side rails accommodate multi-student selector matrices and analytical dashboards.

### Vertical Rhythm
- Section headings: `space-lg` bottom clearance.
- Adjacent form inputs: `space-md` separation.
- Component internals (cards, containers): `space-md` on mobile, scaling to `space-lg` on tablets and desktops.

## Elevation & Depth

Visual hierarchy uses **tonal layer separation combined with hairline low-contrast outlines** rather than deep, heavy drop shadows. This preserves render performance on low-spec hardware and prevents muddy contrasts in high ambient glare.

### Layer Tiers
- **Tier 0 (Canvas Base)**: Flat `#F8FAFC`. Zero elevation.
- **Tier 1 (Surface Cards & Lists)**: Pure White `#FFFFFF` with a 1px solid `#E2E8F0` border and an ambient shadow:
  - `box-shadow: 0 1px 3px 0 rgba(15, 23, 42, 0.05), 0 1px 2px -1px rgba(15, 23, 42, 0.05)`
- **Tier 2 (Interactive Floating Elements / Menus / Dropdowns)**:
  - `box-shadow: 0 4px 6px -1px rgba(15, 23, 42, 0.08), 0 2px 4px -2px rgba(15, 23, 42, 0.04)`
  - Border: 1px solid `#CBD5E1`.
- **Tier 3 (Modal Sheets & Bottom Trays)**:
  - Surface `#FFFFFF` rising from viewport bottom with top border radius.
  - Backdrop: `rgba(15, 23, 42, 0.5)` with `backdrop-filter: blur(4px)`.
  - Ambient elevation: `0 20px 25px -5px rgba(15, 23, 42, 0.15)`.

### Pressed & Active States
Buttons and clickable cards must flatten elevation when pressed (drop-shadow removed, background darkened by 4%) to provide instantaneous tactile confirmation.

## Shapes

The design system enforces a **Rounded (`2`)** geometric profile. This strikes a balance between institutional structure and approachable school community interfaces:

- **Standard Elements (0.5rem / 8px)**: Input fields, card shells, dropdown menus, table containers, and notification banners.
- **Large Containers (1rem / 16px)**: Modals, student profile identity blocks, report card widgets, and bottom drawer top-corners.
- **Full Pill (`9999px`)**: Interactive tab filters, student roll number badges, attendance state tags, action icons, and primary CTAs.

## Components

### 1. Buttons
- **Primary Institutional**: Solid `#1E3A8A` with `#FFFFFF` text. Height 48px on mobile for generous touch targets. Border radius: 8px. Font: `label-lg`.
- **Primary Accent (Action / Payment)**: Solid `#D97706` with `#FFFFFF` text for immediate conversion items (e.g., "Pay Online", "Apply Leave").
- **Secondary / Outlined**: Transparent background, 1.5px border `#CBD5E1`, text `#0F172A`. Active state fills with `#F1F5F9`.
- **Destructive**: Soft red wash `#FEE2E2` with crimson `#EF4444` label.

### 2. Student ID Chip & Institutional Badges
- **ID Chip**: Compact component featuring a 32px circular student avatar or photo, student name in `label-md`, class/section pill (e.g., "VIII-B"), and roll number in `data-mono`. Background `#F1F5F9`, border 1px `#E2E8F0`.
- **Academic Merit Badge**: Amber gradient background (`#F59E0B` to `#D97706`), crisp white typography with star icon prefix. Pill rounded (`9999px`), padding `4px 10px`.

### 3. Interactive Pill Filters
- Horizontally scrollable row with hidden scrollbars for mobile screens.
- **Unselected**: `#FFFFFF` background, `#64748B` text, 1px `#E2E8F0` border.
- **Selected**: Oxford Blue `#1E3A8A` background, `#FFFFFF` text, bold weight, zero border.

### 4. Status Indicators
- Always pair color with an explicit semantic label and an icon for complete accessibility.
- **Present**: Pill badge `#ECFDF5`, text `#065F46`, filled dot `#10B981`.
- **Absent**: Pill badge `#FEF2F2`, text `#991B1B`, filled dot `#EF4444`.
- **Notice / Circular**: Pill badge `#F0F9FF`, text `#075985`, info icon `#0EA5E9`.

### 5. Input Fields
- Height 48px. Base state: `#FFFFFF` fill, 1px `#CBD5E1` border, `#0F172A` text.
- Focus state: Border transitions to `#1E3A8A` with a 3px outer glow ring (`rgba(30, 58, 138, 0.12)`).
- Permanent floating label style in `label-sm` to maintain clarity during autofill.

### 6. Cards & Lists
- **Dashboard Cards**: Pure White surface, 16px internal padding, `#E2E8F0` outline. Sub-sections within cards delimited by `#F8FAFC` background panels.
- **Data Lists**: Flush layout with 1px bottom border dividers; chevron indicator on tap targets. Every list item has minimum height of 56px to ensure thumb precision.

### 7. Bottom Tab Navigation Bar
- Fixed height: 64px + safe area inset at viewport bottom.
- Background: `#FFFFFF` with 1px top border `#E2E8F0`.
- 4 to 5 fixed destinations: Home, Academics, Fees, Notices, Profile.
- Active item uses `#1E3A8A` tint with a 4px horizontal pill-indicator bar at the top edge; inactive items use `#64748B`.

### 8. Modal Sheets (Bottom Trays)
- Native drag-handle bar (`#CBD5E1`, 36px wide, 4px thick) centered at top.
- Maximum height capped at 85vh with internal scrolling.
- Sticky action bar pinned to the base of the sheet for rapid one-handed submission.