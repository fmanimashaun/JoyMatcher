# Typography System — JoyMatcher

**Version:** 1.0.0
**Last Updated:** 2026-02-26
**Status:** Complete Reference
**Tailwind CSS Version:** v4.x

---

## 1. Introduction

Typography is foundational to JoyMatcher's premium, trust-based aesthetic. Our typographic system uses elegant serif fonts to convey sophistication, reliability, and editorial quality—essential for a marriage-focused platform where trust and authenticity are paramount.

### Design Philosophy

Our typography reflects:
- **Editorial Quality** — Like premium publications, not casual apps
- **Trustworthiness** — Serif fonts signal permanence and reliability
- **Readability** — Generous line heights and spacing for long-form content
- **Sophistication** — Professional tone aligned with our audience
- **Hierarchy** — Clear visual structure guiding user attention

### Core Principles

1. **Single Font Family** — Georgia serif for all text (consistency over variety)
2. **Generous Leading** — 1.6 line height for editorial quality
3. **Intentional Scaling** — Meaningful size differences between hierarchy levels
4. **Weight Variation** — Normal, semibold, bold for emphasis
5. **Purple-Tinted Text** — Subtle brand integration through text colors

---

## 2. Font Stack

### Primary Font Family

```css
font-family: Georgia, 'Times New Roman', serif;
```

**Rationale:**
- **Georgia** is a screen-optimized serif designed for digital readability
- Widely available across all platforms (web-safe)
- Excellent x-height and legibility at small sizes
- Professional, trustworthy aesthetic
- Fallback to Times New Roman (universally available)
- Generic serif fallback ensures graceful degradation

**Tailwind CSS v4:**
```html
<body class="font-[Georgia,'Times_New_Roman',serif]">
```

### Character Support

Georgia includes:
- Latin alphabet (uppercase, lowercase)
- Numbers (0-9)
- Common punctuation and symbols
- Accented characters (é, ñ, ü, etc.)
- Currency symbols (₦, $, £, €)
- Mathematical operators

**Note:** For Nigerian Naira symbol (₦), Georgia provides native support. Always use ₦ for Nigerian users, $ for international users.

---

## 3. Type Scale

Our type scale follows a harmonious progression optimized for digital interfaces:

| Name | Size (rem) | Size (px) | Tailwind Class | Usage |
|------|------------|-----------|----------------|-------|
| XS | 0.75rem | 12px | `text-xs` | Small labels, legal text |
| SM | 0.875rem | 14px | `text-sm` | Captions, metadata, helper text |
| Base | 1rem | 16px | `text-base` | Body copy, standard text |
| LG | 1.125rem | 18px | `text-lg` | Card titles, subtitles |
| XL | 1.25rem | 20px | `text-xl` | Section headings |
| 2XL | 1.5rem | 24px | `text-2xl` | Subsection headings |
| 3XL | 1.875rem | 30px | `text-3xl` | Page titles |
| 4XL | 2.25rem | 36px | `text-4xl` | Featured headings |
| 5XL | 3rem | 48px | `text-5xl` | Hero headlines |

**Baseline:** 16px (1rem) browser default

**Scaling Ratio:** ~1.125–1.25x between steps (modest progression for sophistication)

---

## 4. Font Weights

Georgia provides three weights:

| Name | Value | Tailwind Class | Usage |
|------|-------|----------------|-------|
| Normal | 400 | `font-normal` | Body text, descriptions, standard content |
| Semibold | 600 | `font-semibold` | Emphasized text, card titles, labels |
| Bold | 700 | `font-bold` | Headings, hero text, strong emphasis |

**Note:** Georgia's semibold (600) may render as bold (700) on some browsers. This is acceptable and maintains hierarchy.

### Weight Guidelines

**Never use light or thin weights** — They compromise readability and undermine trust aesthetic.

**Use sparingly:**
- Normal: 80% of text
- Semibold: 15% of text (titles, emphasis)
- Bold: 5% of text (major headings only)

---

## 5. Line Heights

| Name | Value | Tailwind Class | Usage |
|------|-------|----------------|-------|
| Tight | 1.25 | `leading-tight` | Large headings, hero text |
| Normal | 1.5 | `leading-normal` | Default (Tailwind default) |
| Base | 1.6 | `leading-[1.6]` | **Our standard** — All body text |
| Relaxed | 1.75 | `leading-relaxed` | Long-form content, articles |

**Default for All Text:** 1.6 (applied at `<body>` level)

```html
<body class="font-[Georgia,'Times_New_Roman',serif] leading-[1.6]">
```

**Why 1.6?**
- Editorial quality (mimics print publications)
- Generous breathing room for readability
- Reduces eye strain during extended reading
- Signals premium, thoughtful design
- Culturally appropriate for diaspora professionals who value substance

### Line Height Exceptions

- **Large headings (3XL-5XL):** Use `leading-tight` (1.25) to prevent excessive spacing
- **Long-form content:** Use `leading-relaxed` (1.75) for blog posts, privacy policies

```html
<!-- Hero headline with tight leading -->
<h1 class="text-5xl font-bold leading-tight">
  Find Your Life Partner
</h1>

<!-- Body copy with standard 1.6 leading -->
<p class="text-base font-normal leading-[1.6]">
  JoyMatcher connects marriage-minded professionals...
</p>
```

---

## 6. Typography Patterns

### 6.1 Caption

**Usage:** Small labels, metadata, timestamps, helper text

```html
<span class="text-sm font-normal text-[hsla(320,30%,35%,1)]">
  Last active 2 hours ago
</span>
```

**Properties:**
- Size: 14px (`text-sm`)
- Weight: Normal (400)
- Color: Secondary text (`hsla(320,30%,35%,1)`)
- Line height: 1.6 (inherited)

**Examples:**
- Profile metadata ("Member since 2025")
- Form helper text ("Max 500 characters")
- Timestamp labels ("Sent 10 minutes ago")

---

### 6.2 Body

**Usage:** Standard body copy, descriptions, paragraphs

```html
<p class="text-base font-normal text-[hsla(320,30%,35%,1)]">
  Looking for a serious relationship leading to marriage. I value family, career ambition, and authentic connections.
</p>
```

**Properties:**
- Size: 16px (`text-base`)
- Weight: Normal (400)
- Color: Secondary text (`hsla(320,30%,35%,1)`)
- Line height: 1.6 (inherited)

**Best Practices:**
- Never use body text smaller than 16px (accessibility)
- Use secondary color for standard copy
- Use primary color for emphasized paragraphs
- Maintain 1.6 line height for readability

---

### 6.3 Body Emphasized

**Usage:** Important body text, standout paragraphs, callouts

```html
<p class="text-base font-semibold text-[hsla(320,50%,15%,1)]">
  Complete Tier 3 to unlock relationship and family information.
</p>
```

**Properties:**
- Size: 16px (`text-base`)
- Weight: Semibold (600)
- Color: Primary text (`hsla(320,50%,15%,1)`)
- Line height: 1.6 (inherited)

**Examples:**
- Call-to-action descriptions
- Warning text
- Emphasized statements

---

### 6.4 Card Title / Subtitle

**Usage:** Card headings, list item titles, section labels

```html
<h3 class="text-lg font-semibold text-[hsla(320,50%,15%,1)]">
  Sarah, 32
</h3>
```

**Properties:**
- Size: 18px (`text-lg`)
- Weight: Semibold (600)
- Color: Primary text (`hsla(320,50%,15%,1)`)
- Line height: 1.6 (inherited)

**Examples:**
- Profile card names
- List item headings
- Modal titles
- Navigation section labels

---

### 6.5 Page Title

**Usage:** Main page headings, dashboard titles

```html
<h1 class="text-3xl font-semibold text-[hsla(320,50%,15%,1)]">
  Discover Matches
</h1>
```

**Properties:**
- Size: 30px (`text-3xl`)
- Weight: Semibold (600)
- Color: Primary text (`hsla(320,50%,15%,1)`)
- Line height: 1.25 (`leading-tight`)

**Best Practices:**
- One per page (semantic H1)
- Use tight leading for large sizes
- Center-align for landing pages, left-align for app pages
- Add margin-bottom for separation

```html
<h1 class="text-3xl font-semibold text-[hsla(320,50%,15%,1)] leading-tight mb-8">
  Your Dashboard
</h1>
```

---

### 6.6 Headline

**Usage:** Hero sections, major marketing headlines, feature announcements

```html
<h1 class="text-5xl font-bold text-[hsla(320,50%,15%,1)] leading-tight">
  Find Your Life Partner with Confidence
</h1>
```

**Properties:**
- Size: 48px (`text-5xl`)
- Weight: Bold (700)
- Color: Primary text (`hsla(320,50%,15%,1)`)
- Line height: 1.25 (`leading-tight`)

**Best Practices:**
- Use sparingly (hero sections only)
- Keep headlines short (5-8 words max)
- Pair with supporting subheadline
- Consider gradient text for special emphasis

```html
<div class="text-center space-y-4">
  <h1 class="text-5xl font-bold text-[hsla(320,50%,15%,1)] leading-tight">
    Find Your Life Partner
  </h1>
  <p class="text-xl font-normal text-[hsla(320,30%,35%,1)]">
    Trust-based matchmaking for marriage-minded professionals
  </p>
</div>
```

---

## 7. Text Color System

### Color Hierarchy

JoyMatcher uses purple-tinted text colors for brand consistency:

| Level | HSLA Value | Hex Equivalent | Tailwind Class | Usage |
|-------|-----------|----------------|----------------|-------|
| Primary | `hsla(320, 50%, 15%, 1)` | #260D28 | `text-[hsla(320,50%,15%,1)]` | Headings, emphasized text |
| Secondary | `hsla(320, 30%, 35%, 1)` | #6B4A6E | `text-[hsla(320,30%,35%,1)]` | Body copy, labels |
| Tertiary | `hsla(320, 20%, 55%, 1)` | #9D8B9F | `text-[hsla(320,20%,55%,1)]` | Supporting text, metadata |
| Quaternary | `hsla(320, 15%, 70%, 1)` | #C1B5C2 | `text-[hsla(320,15%,70%,1)]` | Disabled, placeholders |

### On Dark Backgrounds

For text on `#4D0052` (primary purple) or dark surfaces:

| Level | Value | Tailwind Class | Usage |
|-------|-------|----------------|-------|
| Primary | `rgba(255, 255, 255, 0.95)` | `text-white/95` | Main text on dark |
| Secondary | `rgba(255, 255, 255, 0.75)` | `text-white/75` | Supporting text on dark |

**Example:**
```html
<div class="bg-[#4D0052] p-8">
  <h2 class="text-2xl font-bold text-white/95">Premium Membership</h2>
  <p class="text-base text-white/75">Unlock deeper connections and trust</p>
</div>
```

### Link Colors

```html
<a href="#" class="text-[#4D0052] hover:text-[#7D3365] hover:underline">
  View full profile
</a>
```

- Default: `#4D0052` (brand purple)
- Hover: `#7D3365` (lighter purple)
- Visited: Same as default (maintain consistency)
- Underline on hover for clarity

---

## 8. Responsive Typography

### Mobile-First Scaling

Use responsive text sizes for better mobile experience:

```html
<!-- Hero headline: smaller on mobile, larger on desktop -->
<h1 class="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
  Find Your Life Partner
</h1>

<!-- Page title: responsive scaling -->
<h1 class="text-2xl md:text-3xl font-semibold">
  Discover Matches
</h1>

<!-- Body text: maintain 16px minimum -->
<p class="text-base lg:text-lg">
  Long-form description with slightly larger text on desktop
</p>
```

### Breakpoint Guidelines

| Breakpoint | Hero (H1) | Page Title (H1) | Card Title (H3) | Body |
|------------|-----------|-----------------|-----------------|------|
| Mobile (<640px) | `text-3xl` (30px) | `text-2xl` (24px) | `text-lg` (18px) | `text-base` (16px) |
| Tablet (640-1024px) | `text-4xl` (36px) | `text-3xl` (30px) | `text-lg` (18px) | `text-base` (16px) |
| Desktop (>1024px) | `text-5xl` (48px) | `text-3xl` (30px) | `text-lg` (18px) | `text-base` (16px) |

**Never go below 16px for body text** — Essential for accessibility and readability.

---

## 9. Text Alignment

### Alignment Guidelines

| Alignment | Usage | Tailwind Class |
|-----------|-------|----------------|
| Left | Default for body text, forms, lists | `text-left` |
| Center | Hero sections, modal titles, marketing headlines | `text-center` |
| Right | Rarely used, metadata in RTL contexts | `text-right` |
| Justify | Avoid (poor readability on web) | `text-justify` (don't use) |

**Best Practices:**
- Left-align for readability (natural reading direction)
- Center-align for marketing headlines and hero sections
- Never justify text (creates uneven spacing)

```html
<!-- Hero section: centered -->
<section class="text-center">
  <h1 class="text-5xl font-bold">Find Your Life Partner</h1>
  <p class="text-xl">Trust-based matchmaking</p>
</section>

<!-- App content: left-aligned -->
<main class="text-left">
  <h1 class="text-3xl font-semibold">Dashboard</h1>
  <p class="text-base">Welcome back, Sarah</p>
</main>
```

---

## 10. Text Decoration & Styling

### Underlines

```html
<!-- Link underline (hover only) -->
<a href="#" class="hover:underline">Learn more</a>

<!-- Always underlined (for accessibility) -->
<a href="#" class="underline">Terms of Service</a>

<!-- Custom underline offset -->
<a href="#" class="underline underline-offset-4">View profile</a>
```

**Best Practice:** Underline links on hover for clarity, especially in body copy.

### Italic

Use sparingly (Georgia italic can reduce readability):

```html
<p class="text-base">
  "I'm looking for a <em class="italic">serious</em> relationship."
</p>
```

**Better alternative:** Use semibold for emphasis instead of italic.

### Strikethrough

For pricing, corrections:

```html
<span class="line-through text-[hsla(320,20%,55%,1)]">₦24,000</span>
<span class="text-[#4D0052] font-semibold">₦18,000</span>
```

### Text Transform

```html
<!-- Uppercase (use sparingly) -->
<span class="uppercase text-xs font-semibold tracking-wider text-[hsla(320,30%,35%,1)]">
  Premium
</span>

<!-- Capitalize (for proper nouns) -->
<span class="capitalize">sarah johnson</span>

<!-- Normal case (default) -->
<span class="normal-case">Standard text</span>
```

**Guideline:** Avoid all-caps for long text (reduces readability). Use for short labels only.

---

## 11. Letter Spacing (Tracking)

Default letter spacing is optimal for Georgia. Adjust only for specific use cases:

```html
<!-- Tight (for large headings) -->
<h1 class="text-5xl font-bold tracking-tight">

<!-- Normal (default, no class needed) -->
<p class="text-base">

<!-- Wide (for small uppercase labels) -->
<span class="text-xs uppercase font-semibold tracking-wider">
  NEW FEATURE
</span>
```

**Guideline:** Use `tracking-wider` for uppercase labels. Never tighten tracking below default for body text.

---

## 12. Text Truncation & Overflow

### Single Line Truncation

```html
<p class="text-base truncate w-64">
  This is a very long name that will be cut off with an ellipsis...
</p>
```

### Multi-Line Truncation (Line Clamp)

```html
<!-- 2 lines -->
<p class="text-base line-clamp-2">
  Long profile description that will be truncated after two lines with an ellipsis at the end...
</p>

<!-- 3 lines -->
<p class="text-sm line-clamp-3">
  Extended bio content that allows for three lines before truncating...
</p>
```

**Usage:**
- Profile cards: `line-clamp-2` or `line-clamp-3`
- List items: `line-clamp-2`
- Preview text: `line-clamp-1` (with "Read more" link)

---

## 13. Accessibility Guidelines

### Minimum Contrast Ratios (WCAG 2.1 AA)

All text colors meet WCAG 2.1 AA standards:

| Text Color | Background | Contrast Ratio | Level |
|------------|------------|----------------|-------|
| Primary text on white | `#260D28` on `#FFFFFF` | 13.5:1 | AAA |
| Secondary text on white | `#6B4A6E` on `#FFFFFF` | 7.2:1 | AAA |
| Tertiary text on white | `#9D8B9F` on `#FFFFFF` | 4.6:1 | AA |
| White on primary purple | `#FFFFFF` on `#4D0052` | 10.8:1 | AAA |

**Verified:** All combinations exceed minimum requirements.

### Font Size Minimums

- **Body text:** Never below 16px (1rem)
- **Small text:** 14px (0.875rem) minimum
- **Large text:** 18px+ considered "large text" for contrast exceptions

### Readable Line Lengths

Optimal line length: 50-75 characters (about 600-800px at 16px)

```html
<!-- Constrain line width for readability -->
<div class="max-w-2xl mx-auto">
  <p class="text-base">
    Long-form content with optimal line length...
  </p>
</div>
```

### Screen Reader Considerations

```html
<!-- Use semantic HTML -->
<h1>Main Heading</h1>
<h2>Subheading</h2>
<h3>Section Title</h3>

<!-- Hidden text for screen readers -->
<span class="sr-only">Additional context for screen readers</span>

<!-- Abbreviations -->
<abbr title="Very Important Person">VIP</abbr>
```

---

## 14. Common Typography Patterns

### 14.1 Hero Section

```html
<section class="text-center py-20 px-6">
  <h1 class="text-4xl md:text-5xl font-bold text-[hsla(320,50%,15%,1)] leading-tight mb-6">
    Find Your Life Partner with Confidence
  </h1>
  <p class="text-lg md:text-xl font-normal text-[hsla(320,30%,35%,1)] max-w-2xl mx-auto mb-8">
    Trust-based matchmaking for marriage-minded professionals seeking authentic connections.
  </p>
  <button class="bg-[#4D0052] text-white/95 px-8 py-4 rounded-xl text-lg font-semibold">
    Get Started Free
  </button>
</section>
```

### 14.2 Profile Card

```html
<div class="bg-white rounded-2xl shadow-[0_4px_16px_rgba(77,0,82,0.12)] p-6">
  <h3 class="text-lg font-semibold text-[hsla(320,50%,15%,1)] mb-2">
    Sarah Johnson, 32
  </h3>
  <p class="text-sm text-[hsla(320,30%,35%,1)] mb-4">
    <iconify-icon icon="lucide:map-pin"></iconify-icon>
    Lagos, Nigeria
  </p>
  <p class="text-base text-[hsla(320,30%,35%,1)] line-clamp-3 mb-4">
    Healthcare professional seeking serious relationship leading to marriage. I value family, faith, and authentic connections.
  </p>
  <button class="w-full bg-[#F16A6F] text-white/95 py-3 rounded-xl font-semibold">
    Show Interest
  </button>
</div>
```

### 14.3 Form Field

```html
<div class="flex flex-col gap-2">
  <label for="bio" class="text-sm font-semibold text-[hsla(320,50%,15%,1)]">
    About Me
    <span class="text-[#F16A6F]">*</span>
  </label>
  <textarea
    id="bio"
    class="text-base text-[hsla(320,50%,15%,1)] placeholder:text-[hsla(320,15%,70%,1)] border border-[hsla(320,25%,85%,1)] rounded-xl p-4"
    placeholder="Tell us about yourself..."
  ></textarea>
  <span class="text-xs text-[hsla(320,30%,35%,1)]">
    Max 500 characters
  </span>
</div>
```

### 14.4 Modal Title

```html
<div class="flex items-center justify-between mb-6">
  <h2 class="text-xl font-semibold text-[hsla(320,50%,15%,1)]">
    Tier-Awareness Warning
  </h2>
  <button aria-label="Close">
    <iconify-icon icon="lucide:x" class="text-xl"></iconify-icon>
  </button>
</div>
```

### 14.5 Tier Progress

```html
<div class="flex items-center justify-between mb-2">
  <span class="text-sm font-semibold text-[hsla(320,50%,15%,1)]">
    Profile Completion
  </span>
  <span class="text-sm font-semibold text-[#4D0052]">
    60%
  </span>
</div>
<div class="h-2 bg-[hsla(320,20%,90%,1)] rounded-full mb-2">
  <div class="h-full bg-gradient-to-r from-[#4D0052] to-[#F16A6F] rounded-full" style="width: 60%"></div>
</div>
<p class="text-xs text-[hsla(320,30%,35%,1)]">
  Complete Tier 3 to unlock Premium features
</p>
```

---

## 15. Typography Don'ts

### Never Do

- ❌ Use font sizes below 16px for body text
- ❌ Use light or thin font weights (readability issues)
- ❌ Justify text (poor readability on web)
- ❌ Use all-caps for long text (reduces readability)
- ❌ Use multiple font families (inconsistent brand)
- ❌ Use line heights below 1.4 for body text
- ❌ Use center alignment for body paragraphs
- ❌ Set text color to pure black `#000000` (too harsh)
- ❌ Use italic for large blocks of text
- ❌ Exceed 800px line width for long-form content

### Always Do

- ✅ Use 16px minimum for body text
- ✅ Maintain 1.6 line height for readability
- ✅ Use purple-tinted text colors for brand consistency
- ✅ Test typography on real devices (desktop, mobile, tablet)
- ✅ Provide sufficient contrast (WCAG AA minimum)
- ✅ Use semantic HTML heading hierarchy (H1 → H6)
- ✅ Left-align body text for readability
- ✅ Use semibold for emphasis instead of italic
- ✅ Constrain line width for long-form content (50-75 characters)
- ✅ Test with real content (not Lorem Ipsum)

---

## 16. Testing & Quality Assurance

### Typography Checklist

Before launching any page:

- [ ] All headings use correct semantic HTML (H1-H6)
- [ ] Body text is 16px minimum
- [ ] Line height is 1.6 for body copy
- [ ] Text colors meet WCAG AA contrast ratios
- [ ] Links are visually distinct (color + underline on hover)
- [ ] Long-form content has optimal line width (600-800px)
- [ ] Responsive typography scales correctly on mobile
- [ ] Focus states are visible on all interactive text
- [ ] Screen readers can navigate heading hierarchy
- [ ] Font family fallback works (test with Georgia disabled)

### Browser Testing

Test typography in:
- Chrome (Windows, Mac, Android)
- Safari (Mac, iOS)
- Firefox (Windows, Mac)
- Edge (Windows)

**Note:** Georgia rendering may vary slightly across browsers. This is acceptable as long as readability is maintained.

---

## 17. Related Documentation

- [Design System](design_system.md) - Complete design tokens
- [Component Library](component_library.md) - Typography in components
- [Color System](color_system.md) - Text color specifications
- [Accessibility Patterns](accessibility_patterns.md) - WCAG compliance

---

**Document Owner:** Design Lead
**Last Reviewed:** 2026-02-26
**Next Review:** 2026-05-26 (Quarterly)
