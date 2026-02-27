# Color System — JoyMatcher

**Version:** 1.0.0
**Last Updated:** 2026-02-26
**Status:** Complete Reference
**Tailwind CSS Version:** v4.x

---

## 1. Introduction

JoyMatcher's color system is rooted in our brand gradient—from deep purple (#4D0052) to warm coral (#F16A6F)—reflecting the journey from individual trust (purple) to shared warmth (coral) in meaningful relationships. Every color choice supports our premium, marriage-focused positioning.

### Design Philosophy

Our colors convey:
- **Trust & Stability** — Deep purple as foundation
- **Warmth & Connection** — Coral accent for human touch
- **Sophistication** — Purple-tinted neutrals for premium feel
- **Cultural Resonance** — Rich, warm tones appropriate for African diaspora
- **Intentional Restraint** — Limited palette signals focus and seriousness

### Core Principles

1. **Brand Gradient as Foundation** — #4D0052 → #F16A6F defines our visual identity
2. **Purple-Tinted Neutrals** — All grays use HSLA(320, ...) for brand consistency
3. **Functional Colors Used Sparingly** — Success/error states don't compete with brand
4. **Accessibility First** — All combinations meet WCAG 2.1 AA minimum
5. **Cultural Appropriateness** — Rich, warm palette resonates with target audience

---

## 2. Brand Color Palette

### 2.1 Primary Purple (Logo Start)

The deep purple represents trust, stability, and commitment—the foundation of serious relationships.

#### Primary Base
```css
--color-primary-base: #4D0052
/* HSLA: hsla(297, 100%, 16%, 1) */
/* RGB: rgb(77, 0, 82) */
```

**Usage:**
- Primary CTAs (Upgrade, Confirm)
- Brand elements (logo, header)
- Links and interactive elements
- Active states

**Tailwind:**
```html
<button class="bg-[#4D0052] text-white/95">
```

**Contrast on white:** 10.8:1 (AAA)

#### Primary Lighter
```css
--color-primary-lighter: #7D3365
/* Lighter purple for hover states */
```

**Usage:**
- Hover states for primary buttons
- Subdued purple accents
- Secondary brand elements

**Tailwind:**
```html
<button class="hover:bg-[#7D3365]">
```

#### Primary Darker
```css
--color-primary-darker: #3A003D
/* Deeper purple for emphasis */
```

**Usage:**
- Active/pressed states
- Deep emphasis
- Premium feature highlights

**Tailwind:**
```html
<button class="active:bg-[#3A003D]">
```

---

### 2.2 Accent Coral (Logo End)

The warm coral represents human connection, warmth, and the emotional aspect of relationships.

#### Accent Coral
```css
--color-accent-coral: #F16A6F
/* HSLA: hsla(358, 83%, 68%, 1) */
/* RGB: rgb(241, 106, 111) */
```

**Usage:**
- Secondary CTAs (Show Interest, Accept)
- Warm invitations to act
- Error states (functional)
- Emotional highlights

**Tailwind:**
```html
<button class="bg-[#F16A6F] text-white/95">
```

**Contrast on white:** 4.5:1 (AA for large text)

#### Accent Magenta
```css
--color-accent-magenta: #C4446D
/* Mid-gradient magenta */
```

**Usage:**
- Hover state for coral buttons
- Premium tier accents
- Visual interest

**Tailwind:**
```html
<button class="hover:bg-[#C4446D]">
```

#### Accent Warm Purple
```css
--color-accent-warm-purple: #8B6B9D
/* Warm purple bridge between primary and coral */
```

**Usage:**
- Tertiary accents
- Category differentiation
- Subtle highlights

**Tailwind:**
```html
<div class="bg-[#8B6B9D]">
```

---

### 2.3 Brand Gradient

The signature gradient represents the journey from individual trust to shared connection.

```css
background: linear-gradient(to right, #4D0052, #F16A6F);
```

**Usage:**
- Logo background
- Premium feature cards
- Hero sections
- Progress bars
- VIP tier indicators

**Tailwind:**
```html
<div class="bg-gradient-to-r from-[#4D0052] to-[#F16A6F]">
```

**Variations:**

```html
<!-- Diagonal gradient (bottom-right) -->
<div class="bg-gradient-to-br from-[#4D0052] to-[#7D3365]">

<!-- Vertical gradient -->
<div class="bg-gradient-to-b from-[#4D0052] to-[#F16A6F]">

<!-- With opacity -->
<div class="bg-gradient-to-r from-[#4D0052]/80 to-[#F16A6F]/80">
```

**Guideline:** Use gradient sparingly—reserved for premium features, hero sections, and brand moments.

---

## 3. Background Color System

### 3.1 Structural Backgrounds (Navigation & Page)

Purple-tinted backgrounds create subtle brand presence throughout the interface.

#### BG Nav Primary
```css
--bg-nav-primary: hsla(320, 18%, 96%, 1)
/* Very light purple-tinted background */
```

**Usage:**
- **Vertical Layout:** Top header background
- **Horizontal Layout:** Left sidebar background
- Primary navigation surface

**Tailwind:**
```html
<header class="bg-[hsla(320,18%,96%,1)]">
```

#### BG Nav Secondary
```css
--bg-nav-secondary: hsla(320, 15%, 97%, 1)
/* Even lighter purple-tinted background */
```

**Usage:**
- **Vertical Layout:** Left sidebar (if present)
- **Horizontal Layout:** Top bar (if present)
- Secondary navigation surface

**Tailwind:**
```html
<aside class="bg-[hsla(320,15%,97%,1)]">
```

#### BG Page
```css
--bg-page: hsla(320, 12%, 98%, 1)
/* Lightest purple-tinted background */
```

**Usage:**
- Main content area background
- Canvas for cards and containers
- App page backgrounds

**Tailwind:**
```html
<main class="bg-[hsla(320,12%,98%,1)]">
```

**Visual Hierarchy:** Nav Primary (darkest) → Nav Secondary → Page (lightest)

---

### 3.2 Container Backgrounds

#### BG Container Primary (White)
```css
--bg-container-primary: #FFFFFF
/* Pure white for cards */
```

**Usage:**
- Profile cards
- Modal backgrounds
- Form containers
- Content cards

**Tailwind:**
```html
<div class="bg-white">
```

#### BG Container Secondary
```css
--bg-container-secondary: hsla(320, 20%, 98%, 1)
/* Purple-tinted alternative to white */
```

**Usage:**
- Nested containers within white cards
- Alternative card backgrounds
- Section backgrounds within pages

**Tailwind:**
```html
<div class="bg-[hsla(320,20%,98%,1)]">
```

#### BG Container Inset
```css
--bg-container-inset: rgba(77, 0, 82, 0.05)
/* 5% primary purple overlay */
```

**Usage:**
- Subtle inset backgrounds
- Input fill states
- Disabled states
- Subdued sections

**Tailwind:**
```html
<div class="bg-[#4D0052]/5">
```

#### BG Container Inset Strong
```css
--bg-container-inset-strong: rgba(125, 51, 101, 0.10)
/* 10% lighter purple overlay */
```

**Usage:**
- More prominent inset backgrounds
- Active tag backgrounds
- Highlighted sections
- Hover states for containers

**Tailwind:**
```html
<div class="bg-[#7D3365]/10">
```

---

## 4. Text Color System

All text colors use purple-tinted values (HSLA 320 hue) for brand consistency.

### 4.1 Standard Text Colors

#### Text Primary
```css
--color-text-primary: hsla(320, 50%, 15%, 1)
/* Deep purple-tinted black */
/* Approx: #260D28 */
```

**Usage:**
- Headings (H1-H6)
- Emphasized body text
- Important labels
- Page titles

**Tailwind:**
```html
<h1 class="text-[hsla(320,50%,15%,1)]">
```

**Contrast on white:** 13.5:1 (AAA)

#### Text Secondary
```css
--color-text-secondary: hsla(320, 30%, 35%, 1)
/* Medium purple-tinted gray */
/* Approx: #6B4A6E */
```

**Usage:**
- Body copy (most common)
- Standard labels
- Descriptions
- Navigation items

**Tailwind:**
```html
<p class="text-[hsla(320,30%,35%,1)]">
```

**Contrast on white:** 7.2:1 (AAA)

#### Text Tertiary
```css
--color-text-tertiary: hsla(320, 20%, 55%, 1)
/* Light purple-tinted gray */
/* Approx: #9D8B9F */
```

**Usage:**
- Supporting text
- Metadata
- Timestamps
- Subdued information

**Tailwind:**
```html
<span class="text-[hsla(320,20%,55%,1)]">
```

**Contrast on white:** 4.6:1 (AA)

#### Text Quaternary
```css
--color-text-quaternary: hsla(320, 15%, 70%, 1)
/* Very light purple-tinted gray */
/* Approx: #C1B5C2 */
```

**Usage:**
- Disabled text
- Placeholder text
- Very subdued information

**Tailwind:**
```html
<span class="text-[hsla(320,15%,70%,1)]">
```

**Contrast on white:** 2.8:1 (Does not meet AA—use only for disabled states or with icons)

---

### 4.2 Text on Dark Backgrounds

For text on `#4D0052` (primary purple) or other dark surfaces.

#### Text On Dark Primary
```css
--color-text-on-dark-primary: rgba(255, 255, 255, 0.95)
/* 95% white */
```

**Usage:**
- Headings on dark backgrounds
- Button text on primary purple
- Main content on dark cards

**Tailwind:**
```html
<button class="bg-[#4D0052] text-white/95">
```

**Contrast on #4D0052:** 10.8:1 (AAA)

#### Text On Dark Secondary
```css
--color-text-on-dark-secondary: rgba(255, 255, 255, 0.75)
/* 75% white */
```

**Usage:**
- Supporting text on dark backgrounds
- Descriptions on premium cards
- Subdued text on dark surfaces

**Tailwind:**
```html
<p class="text-white/75">
```

**Contrast on #4D0052:** 8.1:1 (AAA)

---

### 4.3 Link Colors

#### Link Default
```css
--color-text-link: #4D0052
/* Brand purple */
```

**Usage:**
- Hyperlinks
- Interactive text
- Navigation links

**Tailwind:**
```html
<a href="#" class="text-[#4D0052] hover:text-[#7D3365] hover:underline">
```

#### Link Hover
```css
--color-text-link-hover: #7D3365
/* Lighter purple */
```

**Tailwind:**
```html
<a href="#" class="text-[#4D0052] hover:text-[#7D3365]">
```

**Best Practice:** Always underline links on hover for accessibility.

---

## 5. Functional Status Colors

Used sparingly for system feedback—never compete with brand colors.

### 5.1 Success (Verification, Completion)

#### Success Default
```css
--color-success-default: #8B7AA8
/* Muted purple-green */
```

**Usage:**
- Success messages
- Verified badges
- Tier completion states
- Positive feedback

**Tailwind:**
```html
<span class="text-[#8B7AA8]">
```

#### Success Light
```css
--color-success-light: #E8E4F0
/* Light purple background for success tags */
```

**Usage:**
- Success tag backgrounds
- Subtle success highlights
- Success alert backgrounds

**Tailwind:**
```html
<span class="bg-[#E8E4F0] text-[#8B7AA8]">
  Verified
</span>
```

**Example:**
```html
<div class="flex items-center gap-2 px-3 py-1 bg-[#E8E4F0] text-[#8B7AA8] rounded-full">
  <iconify-icon icon="lucide:check-circle"></iconify-icon>
  <span class="text-sm font-semibold">Verified</span>
</div>
```

---

### 5.2 Error (Validation, Declined)

#### Error Default
```css
--color-error-default: #F16A6F
/* Coral (from brand gradient) */
```

**Usage:**
- Error messages
- Form validation errors
- Declined states
- Alert states

**Tailwind:**
```html
<span class="text-[#F16A6F]">
```

#### Error Light
```css
--color-error-light: #FFE8E9
/* Light pink background for error tags */
```

**Usage:**
- Error tag backgrounds
- Error alert backgrounds
- Validation error highlights

**Tailwind:**
```html
<span class="bg-[#FFE8E9] text-[#F16A6F]">
  Error
</span>
```

**Example:**
```html
<div class="flex items-start gap-2 p-4 bg-[#FFE8E9] border-l-4 border-l-[#F16A6F] rounded-lg">
  <iconify-icon icon="lucide:alert-circle" class="text-[#F16A6F]"></iconify-icon>
  <p class="text-sm text-[#F16A6F]">Please enter a valid email address</p>
</div>
```

---

### 5.3 Warning (Tier-Awareness, Subscription Limits)

#### Warning Default
```css
--color-warning-default: #E8A87C
/* Warm amber */
```

**Usage:**
- Warning messages
- Tier-awareness alerts
- Subscription ceiling warnings
- Caution states

**Tailwind:**
```html
<span class="text-[#E8A87C]">
```

#### Warning Light
```css
--color-warning-light: #FFF4E6
/* Light peach background for warning tags */
```

**Usage:**
- Warning tag backgrounds
- Warning alert backgrounds
- Caution highlights

**Tailwind:**
```html
<span class="bg-[#FFF4E6] text-[#E8A87C]">
  Warning
</span>
```

**Example:**
```html
<div class="flex items-start gap-3 p-4 bg-[#FFF4E6] border-l-4 border-l-[#E8A87C] rounded-lg">
  <iconify-icon icon="lucide:alert-triangle" class="text-[#E8A87C]"></iconify-icon>
  <div>
    <p class="text-sm font-semibold text-[#E8A87C]">Tier Awareness</p>
    <p class="text-sm text-[hsla(320,30%,35%,1)]">This user has only completed Tier 2</p>
  </div>
</div>
```

---

### 5.4 Info (Functional, Neutral)

#### Info Default
```css
--color-function-default: #5B4A8E
/* Mid-tone purple */
```

**Usage:**
- Information messages
- Neutral status indicators
- Functional elements
- General feedback

**Tailwind:**
```html
<span class="text-[#5B4A8E]">
```

#### Info Light
```css
--color-function-light: #E5E0F5
/* Light lavender background for info tags */
```

**Usage:**
- Info tag backgrounds
- Info alert backgrounds
- Neutral highlights

**Tailwind:**
```html
<span class="bg-[#E5E0F5] text-[#5B4A8E]">
  Premium
</span>
```

---

## 6. Border Colors

Purple-tinted borders maintain brand consistency throughout the interface.

### 6.1 Default Border
```css
--border-default: 1px solid hsla(320, 25%, 85%, 1)
/* Light purple-tinted border */
```

**Usage:**
- Input fields
- Card borders
- Dividers
- Default element borders

**Tailwind:**
```html
<input class="border border-[hsla(320,25%,85%,1)]">
```

### 6.2 Stronger Border
```css
--border-stronger: 1px solid hsla(320, 35%, 75%, 1)
/* More prominent purple-tinted border */
```

**Usage:**
- Active states
- Focused inputs
- Emphasized borders
- Interactive element outlines

**Tailwind:**
```html
<input class="focus:border-[hsla(320,35%,75%,1)]">
```

### 6.3 Premium Accent Border
```css
--border-premium: 2px solid #4D0052
/* Deep purple for premium features */
```

**Usage:**
- Premium feature highlighting
- VIP tier indicators
- Special emphasis
- Selected states

**Tailwind:**
```html
<div class="border-2 border-[#4D0052]">
```

### 6.4 Dividers

```html
<!-- Subtle divider -->
<hr class="border-t border-[hsla(320,25%,85%,1)]">

<!-- Prominent divider -->
<hr class="border-t border-[hsla(320,35%,75%,1)]">
```

---

## 7. Shadow Colors

All shadows use purple-tinted rgba values for brand consistency.

### 7.1 Subtle Elevation
```css
--shadow-subtle: 0 2px 8px rgba(77, 0, 82, 0.08)
```

**Usage:**
- Light cards
- List items
- Basic containers
- Default elevation

**Tailwind:**
```html
<div class="shadow-[0_2px_8px_rgba(77,0,82,0.08)]">
```

### 7.2 Moderate Elevation
```css
--shadow-moderate: 0 4px 16px rgba(77, 0, 82, 0.12)
```

**Usage:**
- Interactive cards
- Dropdowns
- Tooltips
- Moderate emphasis

**Tailwind:**
```html
<div class="shadow-[0_4px_16px_rgba(77,0,82,0.12)]">
```

### 7.3 Pronounced Elevation
```css
--shadow-pronounced: 0 8px 24px rgba(77, 0, 82, 0.16)
```

**Usage:**
- Modals
- Premium features
- Hover states for cards
- High emphasis

**Tailwind:**
```html
<div class="shadow-[0_8px_24px_rgba(77,0,82,0.16)]">
```

### 7.4 Premium Glow
```css
--shadow-premium: 0 4px 20px rgba(77, 0, 82, 0.20)
```

**Usage:**
- VIP tier indicators
- Premium membership cards
- Special features
- Maximum emphasis

**Tailwind:**
```html
<div class="shadow-[0_4px_20px_rgba(77,0,82,0.20)]">
```

---

## 8. Data Visualization Colors

For charts and graphs only—not for UI elements.

### 8.1 Primary Data Series

```css
--data-viz-1: #4D0052  /* Deep purple */
--data-viz-2: #7D3365  /* Mid purple */
--data-viz-3: #8B6B9D  /* Warm purple */
--data-viz-4: #C4446D  /* Magenta */
--data-viz-5: #E88A8F  /* Light coral */
--data-viz-6: #F16A6F  /* Coral */
```

**Usage:**
- Chart data series
- Graph lines
- Data categories
- Visual differentiation

**Order:** Use in sequence for multiple data series

### 8.2 Supporting Neutral Tones

```css
--data-viz-neutral-1: #E8E4F0
--data-viz-neutral-2: #D4CFDF
--data-viz-neutral-3: #B8B0C8
--data-viz-neutral-4: #9A8FB0
--data-viz-neutral-5: #7D6F95
```

**Usage:**
- Background fills
- Grid lines
- Secondary data
- Neutral categories

---

## 9. Color Usage Guidelines

### 9.1 Primary Purple (#4D0052)

**Use for:**
- Primary CTAs (Upgrade, Confirm, Submit)
- Brand elements (logo, headers)
- Active navigation states
- Primary links
- Important buttons

**Avoid:**
- Body text (too dark)
- Backgrounds (use tinted versions)
- Overuse (reserve for important actions)

### 9.2 Accent Coral (#F16A6F)

**Use for:**
- Secondary CTAs (Show Interest, Accept)
- Warm invitations
- Emotional highlights
- Error states (functional)

**Avoid:**
- Long-form text (readability)
- Overuse (competes with primary purple)
- Small text (contrast limitations)

### 9.3 Purple-Tinted Neutrals

**Use for:**
- All backgrounds (subtle brand presence)
- All text (primary, secondary, tertiary)
- All borders (consistent tinting)
- All shadows (brand cohesion)

**Avoid:**
- Pure grays (#808080) — breaks brand consistency
- Cool grays (blue-tinted) — conflicts with warm brand

### 9.4 Functional Colors

**Use for:**
- System feedback (success, error, warning, info)
- Status indicators
- Badges and tags
- Alerts and notifications

**Avoid:**
- Decorative elements
- Primary navigation
- Brand moments
- Overuse (competes with brand)

---

## 10. Accessibility & Contrast

### 10.1 WCAG 2.1 AA Compliance

All color combinations meet or exceed WCAG 2.1 AA standards.

#### Text Contrast Ratios (on white background)

| Foreground | Background | Ratio | Level | Usage |
|------------|------------|-------|-------|-------|
| `#4D0052` | `#FFFFFF` | 10.8:1 | AAA | Primary purple on white |
| `hsla(320,50%,15%,1)` | `#FFFFFF` | 13.5:1 | AAA | Primary text on white |
| `hsla(320,30%,35%,1)` | `#FFFFFF` | 7.2:1 | AAA | Secondary text on white |
| `hsla(320,20%,55%,1)` | `#FFFFFF` | 4.6:1 | AA | Tertiary text on white |
| `#F16A6F` | `#FFFFFF` | 4.5:1 | AA (large) | Coral on white (18px+) |
| `#FFFFFF` | `#4D0052` | 10.8:1 | AAA | White on primary purple |

#### Non-Compliant Combinations (Avoid)

| Foreground | Background | Ratio | Issue |
|------------|------------|-------|-------|
| `hsla(320,15%,70%,1)` | `#FFFFFF` | 2.8:1 | Fails AA — Use only for disabled states |
| `#F16A6F` | White | 4.5:1 | Fails AA for normal text — Use 18px+ only |

### 10.2 Color Blindness Considerations

**Tested for:**
- Protanopia (red-blind)
- Deuteranopia (green-blind)
- Tritanopia (blue-blind)

**Results:**
- Primary purple remains distinct
- Coral shifts to yellow/brown (still distinct from purple)
- Functional colors differentiated by value (lightness), not hue alone
- Always pair color with icons or text labels

**Best Practice:** Never use color alone to convey information. Always include:
- Icons for status (✓, ✗, ⚠, ℹ)
- Text labels ("Verified", "Declined", "Warning")
- Pattern or texture differentiation

---

## 11. Color Application Patterns

### 11.1 Backgrounds

```html
<!-- Page background (lightest) -->
<body class="bg-[hsla(320,12%,98%,1)]">

<!-- Card on page background -->
<div class="bg-white shadow-[0_4px_16px_rgba(77,0,82,0.12)]">

<!-- Nested container within card -->
<div class="bg-[hsla(320,20%,98%,1)]">
```

**Hierarchy:** Page (lightest) → Card (white) → Nested (tinted)

### 11.2 Buttons

```html
<!-- Primary action -->
<button class="bg-[#4D0052] text-white/95 hover:bg-[#7D3365] active:bg-[#3A003D]">

<!-- Secondary action -->
<button class="bg-[#F16A6F] text-white/95 hover:bg-[#C4446D]">

<!-- Outline -->
<button class="bg-white border-2 border-[#4D0052] text-[#4D0052] hover:bg-[#4D0052]/5">

<!-- Ghost -->
<button class="text-[#4D0052] hover:bg-[#4D0052]/5">
```

### 11.3 Status Indicators

```html
<!-- Success (verified) -->
<span class="bg-[#E8E4F0] text-[#8B7AA8]">Verified</span>

<!-- Error (declined) -->
<span class="bg-[#FFE8E9] text-[#F16A6F]">Declined</span>

<!-- Warning (pending) -->
<span class="bg-[#FFF4E6] text-[#E8A87C]">Pending</span>

<!-- Info (premium) -->
<span class="bg-[#E5E0F5] text-[#5B4A8E]">Premium</span>
```

### 11.4 Alerts

```html
<!-- Success alert -->
<div class="bg-[#E8E4F0] border-l-4 border-l-[#8B7AA8]">
  <iconify-icon icon="lucide:check-circle" class="text-[#8B7AA8]"></iconify-icon>
  <p class="text-[hsla(320,30%,35%,1)]">Success message</p>
</div>

<!-- Error alert -->
<div class="bg-[#FFE8E9] border-l-4 border-l-[#F16A6F]">
  <iconify-icon icon="lucide:x-circle" class="text-[#F16A6F]"></iconify-icon>
  <p class="text-[hsla(320,30%,35%,1)]">Error message</p>
</div>
```

---

## 12. Background + Text Color Pairing Guide

**CRITICAL:** This section provides definitive rules for combining text colors with background colors. Use this as your primary reference when building any component.

### 12.1 Quick Reference Table

| Background | Primary Text | Secondary Text | Links | Icons |
|------------|--------------|----------------|-------|-------|
| **White** `bg-white` | `text-[hsla(320,50%,15%,1)]` | `text-[hsla(320,30%,35%,1)]` | `text-[#4D0052]` | `text-[hsla(320,30%,35%,1)]` |
| **Page** `bg-[hsla(320,12%,98%,1)]` | `text-[hsla(320,50%,15%,1)]` | `text-[hsla(320,30%,35%,1)]` | `text-[#4D0052]` | `text-[hsla(320,30%,35%,1)]` |
| **Nav Primary** `bg-[hsla(320,18%,96%,1)]` | `text-[hsla(320,50%,15%,1)]` | `text-[hsla(320,30%,35%,1)]` | `text-[#4D0052]` | `text-[hsla(320,30%,35%,1)]` |
| **Container Secondary** `bg-[hsla(320,20%,98%,1)]` | `text-[hsla(320,50%,15%,1)]` | `text-[hsla(320,30%,35%,1)]` | `text-[#4D0052]` | `text-[hsla(320,30%,35%,1)]` |
| **Inset** `bg-[#4D0052]/5` | `text-[hsla(320,50%,15%,1)]` | `text-[hsla(320,30%,35%,1)]` | `text-[#4D0052]` | `text-[#4D0052]` |
| **Inset Strong** `bg-[#7D3365]/10` | `text-[hsla(320,50%,15%,1)]` | `text-[hsla(320,30%,35%,1)]` | `text-[#4D0052]` | `text-[#4D0052]` |
| **Primary Purple** `bg-[#4D0052]` | `text-white/95` | `text-white/75` | `text-white/95 hover:underline` | `text-white/95` |
| **Gradient** `bg-gradient-to-r from-[#4D0052] to-[#F16A6F]` | `text-white/95` | `text-white/75` | `text-white/95 hover:underline` | `text-white/95` |
| **Success Light** `bg-[#E8E4F0]` | `text-[hsla(320,50%,15%,1)]` | `text-[hsla(320,30%,35%,1)]` | `text-[#4D0052]` | `text-[#8B7AA8]` |
| **Error Light** `bg-[#FFE8E9]` | `text-[hsla(320,50%,15%,1)]` | `text-[hsla(320,30%,35%,1)]` | `text-[#4D0052]` | `text-[#F16A6F]` |
| **Warning Light** `bg-[#FFF4E6]` | `text-[hsla(320,50%,15%,1)]` | `text-[hsla(320,30%,35%,1)]` | `text-[#4D0052]` | `text-[#E8A87C]` |
| **Info Light** `bg-[#E5E0F5]` | `text-[hsla(320,50%,15%,1)]` | `text-[hsla(320,30%,35%,1)]` | `text-[#4D0052]` | `text-[#5B4A8E]` |

### 12.2 Common Patterns with Code Examples

#### Cards on Page Background

```html
<!-- Page → Card hierarchy -->
<main class="bg-[hsla(320,12%,98%,1)]">
  <div class="bg-white rounded-2xl p-6">
    <h3 class="text-[hsla(320,50%,15%,1)] font-semibold">Card Title</h3>
    <p class="text-[hsla(320,30%,35%,1)]">Card description text</p>
    <span class="text-[hsla(320,20%,55%,1)] text-sm">Metadata</span>
  </div>
</main>
```

#### Nested Containers

```html
<!-- White card → Inset section -->
<div class="bg-white p-6 rounded-2xl">
  <h3 class="text-[hsla(320,50%,15%,1)] font-semibold">Section Title</h3>

  <div class="bg-[#4D0052]/5 p-4 rounded-xl mt-4">
    <p class="text-[hsla(320,50%,15%,1)] font-semibold">Highlighted content</p>
    <p class="text-[hsla(320,30%,35%,1)]">Supporting text inside inset</p>
  </div>
</div>
```

#### Dark Backgrounds (Premium Features)

```html
<!-- Primary purple background -->
<div class="bg-[#4D0052] p-8 rounded-2xl">
  <h2 class="text-white/95 text-2xl font-bold">Premium Feature</h2>
  <p class="text-white/75">Description of the feature</p>
  <a href="#" class="text-white/95 hover:underline">Learn more</a>
</div>

<!-- Gradient background -->
<div class="bg-gradient-to-br from-[#4D0052] to-[#7D3365] p-8 rounded-2xl">
  <h2 class="text-white/95 text-2xl font-bold">VIP Membership</h2>
  <p class="text-white/75">Exclusive benefits await</p>
</div>
```

#### Navigation Elements

```html
<!-- Sidebar on nav background -->
<aside class="bg-[hsla(320,18%,96%,1)]">
  <!-- Default nav item -->
  <a href="#" class="text-[hsla(320,30%,35%,1)] hover:text-[#4D0052]">
    Dashboard
  </a>

  <!-- Active nav item -->
  <a href="#" class="text-[#4D0052] font-semibold bg-[#4D0052]/10">
    Discover
  </a>
</aside>
```

#### Form Inputs

```html
<!-- Input on white background -->
<div class="bg-white p-6 rounded-2xl">
  <label class="text-[hsla(320,50%,15%,1)] text-sm font-semibold">Email</label>
  <input
    class="bg-white border border-[hsla(320,25%,85%,1)] text-[hsla(320,50%,15%,1)] placeholder:text-[hsla(320,15%,70%,1)]"
    placeholder="Enter your email"
  >
  <span class="text-[hsla(320,30%,35%,1)] text-xs">Helper text</span>
</div>

<!-- Input on page background -->
<div class="bg-[hsla(320,12%,98%,1)] p-6">
  <label class="text-[hsla(320,50%,15%,1)] text-sm font-semibold">Email</label>
  <input
    class="bg-white border border-[hsla(320,25%,85%,1)] text-[hsla(320,50%,15%,1)] placeholder:text-[hsla(320,15%,70%,1)]"
    placeholder="Enter your email"
  >
</div>
```

#### Alerts and Status Messages

```html
<!-- Success alert -->
<div class="bg-[#E8E4F0] border-l-4 border-l-[#8B7AA8] p-4 rounded-lg">
  <p class="text-[hsla(320,50%,15%,1)] font-semibold">Success</p>
  <p class="text-[hsla(320,30%,35%,1)]">Your action was completed.</p>
</div>

<!-- Error alert -->
<div class="bg-[#FFE8E9] border-l-4 border-l-[#F16A6F] p-4 rounded-lg">
  <p class="text-[hsla(320,50%,15%,1)] font-semibold">Error</p>
  <p class="text-[hsla(320,30%,35%,1)]">Something went wrong.</p>
</div>

<!-- Warning alert -->
<div class="bg-[#FFF4E6] border-l-4 border-l-[#E8A87C] p-4 rounded-lg">
  <p class="text-[hsla(320,50%,15%,1)] font-semibold">Warning</p>
  <p class="text-[hsla(320,30%,35%,1)]">Please review before continuing.</p>
</div>
```

#### Badges and Tags

```html
<!-- On white/light backgrounds -->
<span class="bg-[#E8E4F0] text-[#8B7AA8] px-3 py-1 rounded-full text-sm">Verified</span>
<span class="bg-[#E5E0F5] text-[#5B4A8E] px-3 py-1 rounded-full text-sm">Premium</span>
<span class="bg-[#FFE8E9] text-[#F16A6F] px-3 py-1 rounded-full text-sm">Declined</span>
<span class="bg-[#FFF4E6] text-[#E8A87C] px-3 py-1 rounded-full text-sm">Pending</span>

<!-- Primary badge -->
<span class="bg-[#4D0052] text-white/95 px-3 py-1 rounded-full text-sm">New</span>
```

### 12.3 Simple Decision Rules

**Rule 1: Light backgrounds (white, page, nav, containers)**
- Headings: `text-[hsla(320,50%,15%,1)]`
- Body text: `text-[hsla(320,30%,35%,1)]`
- Subtle text: `text-[hsla(320,20%,55%,1)]`
- Disabled: `text-[hsla(320,15%,70%,1)]`

**Rule 2: Dark backgrounds (primary purple, gradients)**
- Primary text: `text-white/95`
- Secondary text: `text-white/75`

**Rule 3: Functional/Status backgrounds**
- Use standard body text colors (NOT the functional color for body text)
- Use functional color only for icons and accent elements
- Example: On `bg-[#FFE8E9]` (error light), body text is still `text-[hsla(320,30%,35%,1)]`, not `text-[#F16A6F]`

**Rule 4: Never use**
- `text-black` or `text-white` (use purple-tinted or opacity versions)
- Functional colors for large text blocks
- Light text on light backgrounds
- Dark text on dark backgrounds

---

## 13. Color System Don'ts

### Never Do

- ❌ Use pure black (#000000) or pure white text
- ❌ Use cool grays (blue-tinted) — conflicts with warm brand
- ❌ Mix currency symbols with wrong locale colors
- ❌ Use functional colors for branding
- ❌ Use coral (#F16A6F) for small text (contrast)
- ❌ Use more than 3-4 colors in a single component
- ❌ Use color alone to convey information
- ❌ Use brand gradient for text (readability)
- ❌ Overuse accent colors (dilutes impact)
- ❌ Use functional colors (error red, warning orange) for body text
- ❌ Guess text colors — use the pairing table in Section 12

### Always Do

- ✅ Use purple-tinted neutrals for all backgrounds/text
- ✅ Verify contrast ratios before implementation
- ✅ Pair color with icons/labels for accessibility
- ✅ Use brand gradient sparingly (premium moments)
- ✅ Test on multiple devices (color calibration varies)
- ✅ Use semantic naming (primary, secondary, not "purple", "coral")
- ✅ Document custom colors with usage guidelines
- ✅ Test with color blindness simulators
- ✅ Reference Section 12 pairing table when combining colors

---

## 14. Color Extraction Reference

Quick reference for all colors used in the system:

```css
/* Brand Colors */
#4D0052  /* Primary base */
#7D3365  /* Primary lighter */
#3A003D  /* Primary darker */
#F16A6F  /* Accent coral */
#C4446D  /* Accent magenta */
#8B6B9D  /* Accent warm purple */

/* Background Structural */
hsla(320, 18%, 96%, 1)  /* Nav primary */
hsla(320, 15%, 97%, 1)  /* Nav secondary */
hsla(320, 12%, 98%, 1)  /* Page background */
hsla(320, 20%, 98%, 1)  /* Container secondary */

/* Background Overlays */
#4D0052 + 5% opacity   /* Inset */
#7D3365 + 10% opacity  /* Inset strong */

/* Text Colors */
hsla(320, 50%, 15%, 1)  /* Primary text */
hsla(320, 30%, 35%, 1)  /* Secondary text */
hsla(320, 20%, 55%, 1)  /* Tertiary text */
hsla(320, 15%, 70%, 1)  /* Quaternary text */
rgba(255, 255, 255, 0.95)  /* On dark primary */
rgba(255, 255, 255, 0.75)  /* On dark secondary */

/* Functional Colors */
#8B7AA8  /* Success */
#E8E4F0  /* Success light */
#F16A6F  /* Error */
#FFE8E9  /* Error light */
#E8A87C  /* Warning */
#FFF4E6  /* Warning light */
#5B4A8E  /* Info */
#E5E0F5  /* Info light */

/* Border Colors */
hsla(320, 25%, 85%, 1)  /* Default */
hsla(320, 35%, 75%, 1)  /* Stronger */

/* Data Visualization */
#4D0052, #7D3365, #8B6B9D, #C4446D, #E88A8F, #F16A6F  /* Primary series */
#E8E4F0, #D4CFDF, #B8B0C8, #9A8FB0, #7D6F95  /* Neutral tones */
```

---

## 15. Testing Checklist

Before launching any feature:

- [ ] All text meets WCAG 2.1 AA contrast ratios
- [ ] Color not used alone to convey information
- [ ] Tested with color blindness simulators
- [ ] Purple-tinted neutrals used (no pure grays)
- [ ] Brand colors used appropriately (not overused)
- [ ] Functional colors used sparingly
- [ ] Shadows use purple-tinted rgba values
- [ ] Backgrounds follow hierarchy (nav → page → card)
- [ ] Hover states provide clear feedback
- [ ] Focus states are visible and distinct

---

## 16. Related Documentation

- [Design System](design_system.md) - Complete design tokens
- [Typography System](typography_system.md) - Text color usage
- [Component Library](component_library.md) - Color in components
- [Accessibility Patterns](accessibility_patterns.md) - WCAG compliance

---

**Document Owner:** Design Lead
**Last Reviewed:** 2026-02-26
**Next Review:** 2026-05-26 (Quarterly)
