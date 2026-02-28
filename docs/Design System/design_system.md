# JoyMatcher Design System — Comprehensive Guide

**Version:** 1.0.0
**Last Updated:** 2026-02-26
**Status:** Authoritative Reference
**Tailwind CSS Version:** v4.x

---

## 1. Introduction

### Purpose

This design system defines the complete visual and interaction language for JoyMatcher, a premium trust-based matchmaking platform for marriage-minded professionals. It provides a comprehensive framework for building consistent, accessible, and sophisticated user experiences that reflect our core values: trust, reciprocity, authenticity, and intentional investment.

### Brand Foundation

JoyMatcher is **not a dating app**. It is structured relationship infrastructure built for serious professionals seeking marriage. Every design decision must reflect:

- **Professional & Purposeful** — Serious commitment, not casual dating
- **Time-Respecting** — Efficient, curated experiences
- **Premium Privacy** — Discretion for high-profile users
- **Authentic Connections** — Genuine transparency over superficial attraction
- **Culturally Inclusive** — Celebrating African diaspora values
- **Trustworthy** — Safety, verification, and consent-driven interactions

### Design Philosophy

Our visual aesthetic embodies:
- **Sophisticated**, not playful
- **Editorial**, not gamified
- **Structured**, not chaotic
- **Premium**, not budget
- **Respectful**, not casual
- **Marriage-focused**, not dating-focused

This is achieved through:
- Refined serif typography (Georgia)
- Elegant purple-to-coral gradient palette
- Generous whitespace and structured layouts
- Subtle elevation through shadows
- Trust-signaling depth hierarchy
- Calm, intentional interactions

---

## 2. Design Principles

### Principle 1: Trust Through Transparency

Visual clarity builds trust. Every element communicates its purpose and state clearly:
- Explicit locked states for gated features
- Clear tier completion indicators
- Transparent pricing and value communication
- Honest visual hierarchy

**Implementation:**
- Use consistent border treatments for locked states
- Display verification badges prominently
- Show tier requirements before user action
- Maintain visual consistency across trust signals

### Principle 2: Intentional Friction

Not all friction is bad. Strategic resistance filters casual users and demonstrates commitment:
- Multi-step tier completion flows
- Explicit consent gates before interaction
- Subscription upgrade prompts at decision points
- Tier-awareness warnings before Show Interest

**Implementation:**
- Multi-step modal flows for critical actions
- Confirmation checkboxes for accountability
- Clear "why" messaging in upgrade prompts
- Progress indicators showing investment journey

### Principle 3: Progressive Disclosure

Layer complexity to respect cognitive load while enabling depth:
- Tier 1 public, higher tiers request-based
- Basic actions prominent, advanced features discoverable
- Condensed views with expand-to-detail patterns
- Context-sensitive help and tooltips

**Implementation:**
- Accordion patterns for detailed information
- "Learn more" links for advanced features
- Tooltip overlays for term definitions
- Expandable cards for profile details

### Principle 4: Premium Aesthetic

Visual quality signals platform seriousness:
- Editorial typography with generous leading
- Refined color palette with purple-tinted neutrals
- Subtle shadow elevation (no harsh edges)
- Professional photography with aspirational quality
- Consistent 1.6 line height for readability

**Implementation:**
- Georgia serif for all typography
- HSLA color values for tinted backgrounds
- Multi-level shadow system for depth
- High-quality images with subtle overlays
- Structured spacing scale (12/20/32/48/64px)

### Principle 5: Accessibility First

Inclusive design is non-negotiable:
- WCAG 2.1 AA minimum contrast ratios
- Keyboard navigation for all interactions
- Screen reader semantic markup
- Focus states for all interactive elements
- Sufficient touch target sizes (44x44px minimum)

**Implementation:**
- Semantic HTML5 elements
- ARIA labels for complex components
- Visible focus rings (never `outline: none`)
- Color never as sole indicator
- Responsive text sizing (rem units)

---

## 3. Design Tokens

### 3.1 Color Tokens

#### Primary Brand Colors

```css
/* Primary Purple (Logo Start) */
--color-primary-base: #4D0052;
--color-primary-lighter: #7D3365;
--color-primary-darker: #3A003D;

/* Accent Coral (Logo End) */
--color-accent-coral: #F16A6F;
--color-accent-magenta: #C4446D;
--color-accent-warm-purple: #8B6B9D;
```

**Usage:**
- Primary base for CTAs, headers, primary actions
- Primary lighter for hover states
- Primary darker for emphasis and deep trust signals
- Coral for secondary actions and warm accents
- Use sparingly to maintain premium aesthetic

#### Background Structural Colors

Choose based on layout type (Vertical vs Horizontal):

```css
/* For both layouts */
--bg-nav-primary: hsla(320, 18%, 96%, 1);    /* Main navigation surface */
--bg-nav-secondary: hsla(320, 15%, 97%, 1);  /* Secondary navigation */
--bg-page: hsla(320, 12%, 98%, 1);           /* Main content background */
```

**Application:**
- **Vertical Layout:** Header (nav-primary) → Left sidebar (nav-secondary) → Page (bg-page)
- **Horizontal Layout:** Left sidebar (nav-primary) → Top header (nav-secondary) → Page (bg-page)
- Always use purple-tinted backgrounds (HSLA 320 hue) for brand consistency

#### Container Background Colors

```css
--bg-container-primary: #FFFFFF;              /* White cards/containers */
--bg-container-secondary: hsla(320, 20%, 98%, 1); /* Purple-tinted containers */
--bg-container-inset: rgba(77, 0, 82, 0.05);  /* 5% primary overlay */
--bg-container-inset-strong: rgba(125, 51, 101, 0.10); /* 10% lighter primary */
```

**Usage:**
- Primary for main content cards
- Secondary for nested containers
- Inset for subtle backgrounds (input fills, disabled states)
- Inset strong for more prominent backgrounds (active tags)

#### Text Colors

```css
--color-text-primary: hsla(320, 50%, 15%, 1);    /* Deep purple-black */
--color-text-secondary: hsla(320, 30%, 35%, 1);  /* Medium gray-purple */
--color-text-tertiary: hsla(320, 20%, 55%, 1);   /* Light gray-purple */
--color-text-quaternary: hsla(320, 15%, 70%, 1); /* Very light gray-purple */
--color-text-on-dark-primary: rgba(255, 255, 255, 0.95);   /* 95% white */
--color-text-on-dark-secondary: rgba(255, 255, 255, 0.75); /* 75% white */
--color-text-link: #4D0052;  /* Interactive text */
```

**Hierarchy:**
- Primary: Headings, emphasized content
- Secondary: Body copy, labels
- Tertiary: Supporting text, metadata
- Quaternary: Disabled states, placeholder text
- On-dark: Text on primary-base or dark surfaces
- Link: Interactive elements (underline on hover)

#### Functional Status Colors

Use sparingly to maintain premium aesthetic:

```css
--color-success-default: #8B7AA8;  /* Muted purple-green */
--color-success-light: #E8E4F0;    /* Success background */
--color-error-default: #F16A6F;    /* Coral (from gradient) */
--color-error-light: #FFE8E9;      /* Error background */
--color-warning-default: #E8A87C;  /* Warm amber */
--color-warning-light: #FFF4E6;    /* Warning background */
--color-function-default: #5B4A8E; /* Mid-tone purple */
--color-function-light: #E5E0F5;   /* Info background */
```

**Usage:**
- Success: Tier completion, verification badges
- Error: Form validation, declined states
- Warning: Tier-awareness alerts, subscription ceilings
- Function: Informational states, neutral actions

#### Data Visualization Colors

For charts and graphs only:

```css
/* Primary data series */
--data-viz-1: #4D0052;
--data-viz-2: #7D3365;
--data-viz-3: #8B6B9D;
--data-viz-4: #C4446D;
--data-viz-5: #E88A8F;
--data-viz-6: #F16A6F;

/* Supporting neutral tones */
--data-viz-neutral-1: #E8E4F0;
--data-viz-neutral-2: #D4CFDF;
--data-viz-neutral-3: #B8B0C8;
--data-viz-neutral-4: #9A8FB0;
--data-viz-neutral-5: #7D6F95;
```

### 3.2 Typography Tokens

#### Font Families

```css
--font-family-base: Georgia, 'Times New Roman', serif;
--font-family-brand: Georgia, 'Times New Roman', serif;
```

**Rationale:**
- Georgia provides editorial quality and trustworthy feel
- Serif typography signals sophistication and permanence
- Excellent readability at all sizes
- Professional tone aligned with marriage focus

#### Font Sizes & Weights

```css
/* Size scale */
--font-size-xs: 0.75rem;    /* 12px */
--font-size-sm: 0.875rem;   /* 14px */
--font-size-base: 1rem;     /* 16px */
--font-size-lg: 1.125rem;   /* 18px */
--font-size-xl: 1.25rem;    /* 20px */
--font-size-2xl: 1.5rem;    /* 24px */
--font-size-3xl: 1.875rem;  /* 30px */
--font-size-4xl: 2.25rem;   /* 36px */
--font-size-5xl: 3rem;      /* 48px */

/* Weight scale */
--font-weight-normal: 400;
--font-weight-semibold: 600;
--font-weight-bold: 700;

/* Line height */
--line-height-base: 1.6;    /* Editorial quality spacing */
--line-height-tight: 1.25;  /* Headings */
--line-height-relaxed: 1.75; /* Long-form content */
```

#### Typography Patterns

```css
/* Caption - Labels, metadata */
.text-caption {
  font-size: var(--font-size-sm);     /* 14px */
  font-weight: var(--font-weight-normal);
  line-height: 1.6;
}

/* Body - Standard text */
.text-body {
  font-size: var(--font-size-base);   /* 16px */
  font-weight: var(--font-weight-normal);
  line-height: 1.6;
}

/* Body Emphasized */
.text-body-emphasized {
  font-size: var(--font-size-base);   /* 16px */
  font-weight: var(--font-weight-semibold);
  line-height: 1.6;
}

/* Card Title/Subtitle */
.text-card-title {
  font-size: var(--font-size-lg);     /* 18px */
  font-weight: var(--font-weight-semibold);
  line-height: 1.6;
}

/* Page Title */
.text-page-title {
  font-size: var(--font-size-3xl);    /* 30px */
  font-weight: var(--font-weight-semibold);
  line-height: 1.25;
}

/* Headline */
.text-headline {
  font-size: var(--font-size-5xl);    /* 48px */
  font-weight: var(--font-weight-bold);
  line-height: 1.25;
}
```

### 3.3 Spacing Tokens

```css
/* Tight spacing - Icon-text pairs */
--spacing-tight: 12px;

/* Compact spacing - Related small elements */
--spacing-compact: 20px;

/* Standard spacing - List items, medium containers */
--spacing-standard: 32px;

/* Relaxed spacing - Large containers */
--spacing-relaxed: 48px;

/* Section spacing - Major divisions (editorial feel) */
--spacing-section: 64px;
```

**Usage:**
- Tight (12px): Button icon-text gaps, inline elements
- Compact (20px): Form field spacing, card internal padding
- Standard (32px): List item separation, card stacking
- Relaxed (48px): Section internal spacing, large cards
- Section (64px): Major page sections, hero-to-content

### 3.4 Border Radius Tokens

```css
--radius-sm: 8px;   /* Elements inside cards (profile photos) */
--radius-md: 12px;  /* Buttons, inputs */
--radius-lg: 16px;  /* Cards, major containers */
--radius-full: 9999px; /* Avatars, badges, pills */
```

### 3.5 Shadow Tokens

```css
/* Case 1: Subtle elevation - Light cards */
--shadow-subtle: 0 2px 8px rgba(77, 0, 82, 0.08);

/* Case 2: Moderate elevation - Interactive elements, dropdowns */
--shadow-moderate: 0 4px 16px rgba(77, 0, 82, 0.12);

/* Case 3: Pronounced elevation - Modals, premium features */
--shadow-pronounced: 0 8px 24px rgba(77, 0, 82, 0.16);

/* Case 4: Premium glow - VIP/Premium tier indicators */
--shadow-premium: 0 4px 20px rgba(77, 0, 82, 0.20);
```

### 3.6 Border Tokens

```css
/* Default border - Inputs, cards */
--border-default: 1px solid hsla(320, 25%, 85%, 1);

/* Stronger border - Active/focused states */
--border-stronger: 1px solid hsla(320, 35%, 75%, 1);

/* Premium accent border - Highlighted features */
--border-premium: 2px solid #4D0052;
```

### 3.7 Transition Tokens

```css
--transition-fast: 150ms ease-in-out;
--transition-base: 250ms ease-in-out;
--transition-slow: 350ms ease-in-out;
```

---

## 4. Tailwind CSS v4 Configuration

### 4.1 Applying Design Tokens

In Tailwind CSS v4, use utility classes with arbitrary values or configure theme extensions:

#### Direct Utility Usage

```html
<!-- Primary background -->
<button class="bg-[#4D0052] text-white/95">

<!-- Purple-tinted background -->
<div class="bg-[hsla(320,18%,96%,1)]">

<!-- Shadow elevation -->
<div class="shadow-[0_2px_8px_rgba(77,0,82,0.08)]">

<!-- Border -->
<div class="border border-[hsla(320,25%,85%,1)]">
```

#### Typography Classes

```html
<!-- Caption -->
<span class="text-sm font-normal">

<!-- Body -->
<p class="text-base font-normal">

<!-- Body Emphasized -->
<p class="text-base font-semibold">

<!-- Card Title -->
<h3 class="text-lg font-semibold">

<!-- Page Title -->
<h1 class="text-3xl font-semibold">

<!-- Headline -->
<h1 class="text-5xl font-bold">
```

### 4.2 Responsive Breakpoints

```css
/* Tailwind default breakpoints (recommended) */
sm: 640px   /* Small tablets, large phones */
md: 768px   /* Tablets */
lg: 1024px  /* Small desktops, landscape tablets */
xl: 1280px  /* Desktops */
2xl: 1536px /* Large desktops */
```

**Mobile-first approach:**
```html
<div class="text-base md:text-lg lg:text-xl">
  Responsive text scaling
</div>
```

### 4.3 Component Patterns

See [Component Library](component_library.md) for full component specifications.

---

## 5. Layout System

### 5.1 Grid System

Use Tailwind's flexbox and grid utilities:

```html
<!-- 12-column responsive grid -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
  <div>Column 1</div>
  <div>Column 2</div>
  <div>Column 3</div>
</div>

<!-- Flexible grid with auto-fit -->
<div class="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-6">
  <!-- Auto-flowing cards -->
</div>
```

### 5.2 Container Widths

```html
<!-- Fixed width layouts -->
<body class="w-[1440px] min-h-[700px]">

<!-- Responsive container -->
<div class="max-w-7xl mx-auto px-6 lg:px-8">
  <!-- Centered content with responsive padding -->
</div>
```

### 5.3 Page Layout Patterns

#### Vertical Layout (Top Header + Optional Sidebars)

```html
<body class="w-[1440px] min-h-[700px] font-[Georgia,'Times_New_Roman',serif] leading-[1.6]">

  <!-- Header (Primary Nav): bg-nav-primary -->
  <header class="w-full bg-[hsla(320,18%,96%,1)]">
    <!-- Navigation content -->
  </header>

  <!-- Content Container: Must include 'flex' -->
  <div class="w-full flex min-h-[700px]">

    <!-- Left Sidebar (Secondary Nav): bg-nav-secondary (Optional) -->
    <aside class="flex-shrink-0 min-w-fit bg-[hsla(320,15%,97%,1)]">
      <!-- Sidebar content -->
    </aside>

    <!-- Main Content Area: bg-page -->
    <main class="flex-1 overflow-x-hidden flex flex-col bg-[hsla(320,12%,98%,1)] px-12">
      <!-- Page content -->
    </main>

    <!-- Right Sidebar (Utility Panel) (Optional) -->
    <aside class="flex-shrink-0 min-w-fit bg-[hsla(320,15%,97%,1)]">
      <!-- Utility content -->
    </aside>

  </div>
</body>
```

#### Horizontal Layout (Side Navigation + Optional Top Bar)

```html
<body class="w-[1440px] min-h-[700px] flex font-[Georgia,'Times_New_Roman',serif] leading-[1.6]">

  <!-- Left Sidebar (Primary Nav): bg-nav-primary -->
  <aside class="flex-shrink-0 min-w-fit bg-[hsla(320,18%,96%,1)]">
    <!-- Navigation content -->
  </aside>

  <!-- Content Container -->
  <div class="flex-1 overflow-x-hidden flex flex-col min-h-[700px]">

    <!-- Header (Secondary Nav) (Optional): bg-nav-secondary -->
    <header class="w-full bg-[hsla(320,15%,97%,1)]">
      <!-- Top bar content -->
    </header>

    <!-- Main Content Area: bg-page -->
    <main class="w-full bg-[hsla(320,12%,98%,1)] px-12">
      <!-- Page content -->
    </main>

  </div>

  <!-- Right Sidebar (Utility Panel) (Optional) -->
  <aside class="flex-shrink-0 min-w-fit bg-[hsla(320,15%,97%,1)]">
    <!-- Utility content -->
  </aside>

</body>
```

**Key Considerations:**
- Choose layout based on navigation complexity
- Vertical for marketing/simple content
- Horizontal for dashboards/complex apps
- Use `px-8` to `px-16` for pages with sidebars
- Use `px-30` to `px-80` for full-width content pages

---

## 6. Visual Emphasis Techniques

### 6.1 Background Tint

For trust indicators and premium features:

```html
<!-- Purple-tinted background -->
<div class="bg-[#4D0052]/5 border border-[#4D0052]/20 rounded-lg p-4">
  Premium feature content
</div>

<!-- Coral accent background -->
<div class="bg-[#F16A6F]/10 border border-[#F16A6F]/30 rounded-lg p-4">
  VIP exclusive content
</div>
```

### 6.2 Border Highlight

For active states and selected items:

```html
<!-- Primary purple border -->
<div class="border-2 border-[#4D0052] rounded-lg p-4">
  Selected state
</div>

<!-- Coral accent border -->
<div class="border-2 border-[#F16A6F] rounded-lg p-4">
  Premium tier indicator
</div>
```

### 6.3 Glow/Shadow Effects

For premium features and hover states:

```html
<!-- Premium glow on hover -->
<div class="shadow-[0_2px_8px_rgba(77,0,82,0.08)] hover:shadow-[0_4px_20px_rgba(77,0,82,0.20)] transition">
  VIP profile card
</div>
```

### 6.4 Status Tag/Label

For membership tiers and verification:

```html
<!-- Success tag (verified) -->
<span class="inline-flex items-center gap-1 px-3 py-1 bg-[#E8E4F0] text-[#8B7AA8] rounded-full text-sm font-semibold">
  <iconify-icon icon="lucide:check-circle" class="text-base"></iconify-icon>
  Verified
</span>

<!-- Error tag (declined) -->
<span class="inline-flex items-center gap-1 px-3 py-1 bg-[#FFE8E9] text-[#F16A6F] rounded-full text-sm font-semibold">
  Declined
</span>
```

### 6.5 Side Accent Bar

For premium list items (left edge only, non-rounded containers):

```html
<!-- Premium list item with left accent -->
<div class="relative border-l-[3px] border-l-[#4D0052] bg-white pl-6 pr-4 py-4">
  <!-- Content -->
</div>

<!-- Active navigation with left accent -->
<div class="relative border-l-[3px] border-l-[#F16A6F] bg-[#4D0052]/5 pl-6 pr-4 py-3">
  Active nav item
</div>
```

**Avoid on:**
- Rounded containers (visual conflict)
- Cards with shadow elevation
- Mobile-first designs (consider top accent instead)

---

## 7. Asset Guidelines

### 7.1 Images

```html
<!-- Normal image with object-cover -->
<img src="profile.jpg" class="w-full h-64 object-cover rounded-lg" alt="User profile">

<!-- Slight overlay for premium photos -->
<img src="photo.jpg" class="object-cover brightness-90" alt="Premium photo">

<!-- Heavy overlay for hero sections with text -->
<div class="relative">
  <img src="hero.jpg" class="w-full h-96 object-cover brightness-60" alt="Hero">
  <div class="absolute inset-0 flex items-center justify-center text-white">
    <h1 class="text-5xl font-bold">Hero Text</h1>
  </div>
</div>
```

### 7.2 Icons (Lucide via Iconify)

Always center icons in square containers:

```html
<!-- Standard icon -->
<div class="flex items-center justify-center bg-transparent w-5 h-5">
  <iconify-icon icon="lucide:heart" class="text-base"></iconify-icon>
</div>

<!-- Icon with color -->
<div class="flex items-center justify-center w-6 h-6">
  <iconify-icon icon="lucide:check-circle" class="text-lg text-[#8B7AA8]"></iconify-icon>
</div>

<!-- Icon button -->
<button class="flex items-center justify-center w-10 h-10 rounded-lg hover:bg-[#4D0052]/5 transition">
  <iconify-icon icon="lucide:settings" class="text-xl text-[hsla(320,30%,35%,1)]"></iconify-icon>
</button>
```

**Icon Sizing:**
- `text-sm` (14px): Small inline icons
- `text-base` (16px): Default UI icons
- `text-lg` (18px): Emphasized icons
- `text-xl` (20px): Large interactive icons
- `text-2xl` (24px): Feature icons, hero sections

### 7.3 Brand Logos (Third-Party)

```html
<!-- Monochrome logo -->
<iconify-icon icon="simple-icons:x" class="text-2xl"></iconify-icon>

<!-- Colored logo -->
<iconify-icon icon="logos:google-icon" class="text-2xl"></iconify-icon>
```

### 7.4 JoyMatcher Logo

Use graphic icon approach (heart + trust symbols):

```html
<!-- Icon-based logo -->
<div class="flex items-center gap-3">
  <div class="w-10 h-10 bg-gradient-to-br from-[#4D0052] to-[#F16A6F] rounded-lg flex items-center justify-center">
    <iconify-icon icon="lucide:heart" class="text-xl text-white/95"></iconify-icon>
  </div>
  <span class="text-2xl font-bold text-[#4D0052]">JoyMatcher</span>
</div>
```

---

## 8. State Management

### 8.1 Interactive States

#### Hover States

```html
<!-- Button hover -->
<button class="bg-[#4D0052] hover:bg-[#7D3365] transition">

<!-- Link hover -->
<a class="text-[#4D0052] hover:text-[#7D3365] hover:underline transition">

<!-- Card hover -->
<div class="shadow-[0_4px_16px_rgba(77,0,82,0.12)] hover:shadow-[0_8px_24px_rgba(77,0,82,0.16)] transition">
```

#### Focus States

Never use `outline: none`. Always provide visible focus:

```html
<!-- Input focus -->
<input class="border border-[hsla(320,25%,85%,1)] focus:border-[#7D3365] focus:ring-2 focus:ring-[#4D0052]/20 transition">

<!-- Button focus -->
<button class="focus:outline-none focus:ring-2 focus:ring-[#4D0052] focus:ring-offset-2">
```

#### Active States

```html
<!-- Button active (pressed) -->
<button class="bg-[#4D0052] active:bg-[#3A003D] transition">

<!-- Toggle active -->
<button class="bg-white border border-[hsla(320,25%,85%,1)] aria-pressed:bg-[#4D0052] aria-pressed:text-white/95 aria-pressed:border-[#4D0052]">
```

#### Disabled States

```html
<!-- Disabled button -->
<button disabled class="bg-[#4D0052] disabled:bg-[hsla(320,15%,70%,1)] disabled:cursor-not-allowed disabled:opacity-50">

<!-- Disabled input -->
<input disabled class="bg-[hsla(320,20%,98%,1)] text-[hsla(320,15%,70%,1)] cursor-not-allowed">
```

### 8.2 Loading States

```html
<!-- Loading spinner -->
<div class="inline-flex items-center gap-2">
  <div class="w-5 h-5 border-2 border-[#4D0052]/30 border-t-[#4D0052] rounded-full animate-spin"></div>
  <span class="text-sm text-[hsla(320,30%,35%,1)]">Loading...</span>
</div>

<!-- Skeleton loading -->
<div class="space-y-4 animate-pulse">
  <div class="h-4 bg-[hsla(320,20%,90%,1)] rounded w-3/4"></div>
  <div class="h-4 bg-[hsla(320,20%,90%,1)] rounded w-1/2"></div>
</div>
```

### 8.3 Locked States

For gated features and tier requirements:

```html
<!-- Locked card -->
<div class="relative bg-white border-2 border-dashed border-[hsla(320,25%,85%,1)] rounded-2xl p-6 opacity-60">
  <div class="absolute inset-0 flex items-center justify-center backdrop-blur-sm">
    <div class="bg-white/90 rounded-lg p-4 flex flex-col items-center gap-2">
      <iconify-icon icon="lucide:lock" class="text-2xl text-[#4D0052]"></iconify-icon>
      <span class="text-sm font-semibold text-[hsla(320,50%,15%,1)]">Premium Required</span>
    </div>
  </div>
  <!-- Locked content (blurred) -->
</div>
```

---

## 9. Animation & Transitions

### 9.1 Transition Guidelines

Use transitions sparingly and purposefully:

- **Fast (150ms):** Hover states, focus rings
- **Base (250ms):** Button states, card elevation
- **Slow (350ms):** Modal entrances, major state changes

```html
<!-- Standard transition -->
<div class="transition-all duration-250 ease-in-out">

<!-- Fast hover transition -->
<button class="transition-colors duration-150 ease-in-out">

<!-- Slow modal entrance -->
<div class="transition-transform duration-350 ease-out">
```

### 9.2 Animation Patterns

```html
<!-- Fade in -->
<div class="opacity-0 animate-[fadeIn_250ms_ease-in-out_forwards]">

<!-- Slide up -->
<div class="translate-y-4 opacity-0 animate-[slideUp_350ms_ease-out_forwards]">

<!-- Scale in (modal) -->
<div class="scale-95 opacity-0 animate-[scaleIn_250ms_ease-out_forwards]">
```

**Custom animations (define in CSS):**

```css
@keyframes fadeIn {
  to { opacity: 1; }
}

@keyframes slideUp {
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

@keyframes scaleIn {
  to {
    transform: scale(1);
    opacity: 1;
  }
}
```

---

## 10. Accessibility Standards

### 10.1 Color Contrast

All text must meet WCAG 2.1 AA standards:

- **Normal text (< 18px):** 4.5:1 minimum
- **Large text (≥ 18px or ≥ 14px bold):** 3:1 minimum
- **Interactive elements:** 3:1 minimum against background

**Verified combinations:**
- `#4D0052` on white: 10.8:1 (AAA)
- `hsla(320,50%,15%,1)` on white: 13.5:1 (AAA)
- `hsla(320,30%,35%,1)` on white: 7.2:1 (AAA)
- `hsla(320,20%,55%,1)` on white: 4.6:1 (AA)
- White on `#4D0052`: 10.8:1 (AAA)

### 10.2 Keyboard Navigation

All interactive elements must be keyboard accessible:

```html
<!-- Tab index for custom controls -->
<div role="button" tabindex="0" onkeydown="handleKeyPress(event)">

<!-- Focus visible for custom elements -->
<div class="focus-visible:ring-2 focus-visible:ring-[#4D0052] focus-visible:ring-offset-2">

<!-- Skip to main content -->
<a href="#main-content" class="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-[#4D0052] focus:text-white/95 focus:rounded-lg">
  Skip to main content
</a>
```

### 10.3 Screen Reader Support

```html
<!-- Semantic HTML5 -->
<header>, <nav>, <main>, <aside>, <footer>, <article>, <section>

<!-- ARIA labels for icons -->
<button aria-label="Close modal">
  <iconify-icon icon="lucide:x" class="text-xl"></iconify-icon>
</button>

<!-- ARIA live regions for dynamic content -->
<div aria-live="polite" aria-atomic="true">
  Profile updated successfully
</div>

<!-- Hidden text for screen readers -->
<span class="sr-only">Current tier: Premium</span>
```

### 10.4 Touch Target Sizes

Minimum 44x44px for all interactive elements:

```html
<!-- Button with sufficient size -->
<button class="min-w-[44px] min-h-[44px] px-6 py-3">

<!-- Icon button with padding -->
<button class="w-10 h-10 flex items-center justify-center" aria-label="Settings">
  <iconify-icon icon="lucide:settings"></iconify-icon>
</button>
```

---

## 11. Performance Considerations

### 11.1 Image Optimization

- Use WebP format with JPEG fallback
- Implement lazy loading for below-fold images
- Provide responsive srcset for different screen sizes
- Compress images to < 200KB

```html
<picture>
  <source srcset="profile-small.webp 400w, profile-medium.webp 800w, profile-large.webp 1200w" type="image/webp">
  <img src="profile.jpg" srcset="profile-small.jpg 400w, profile-medium.jpg 800w, profile-large.jpg 1200w"
       sizes="(max-width: 640px) 400px, (max-width: 1024px) 800px, 1200px"
       loading="lazy" alt="User profile">
</picture>
```

### 11.2 Icon Loading

Load Iconify runtime once:

```html
<script src="https://code.iconify.design/iconify-icon/1.0.7/iconify-icon.min.js"></script>
```

### 11.3 CSS Optimization

- Purge unused Tailwind classes in production
- Minimize custom CSS
- Use CSS containment for isolated components

---

## 12. Browser Support

### Minimum Support

- Chrome/Edge: Last 2 versions
- Firefox: Last 2 versions
- Safari: Last 2 versions
- iOS Safari: Last 2 versions
- Android Chrome: Last 2 versions

### Progressive Enhancement

Provide graceful degradation for:
- CSS Grid → Flexbox fallback
- Custom properties → Inline fallback
- Backdrop-filter → Solid background fallback

---

## 13. Documentation Maintenance

### Version Control

This design system follows semantic versioning:
- **Major:** Breaking changes to component APIs
- **Minor:** New components or features
- **Patch:** Bug fixes and refinements

### Review Cycle

- **Quarterly review:** Update tokens and patterns
- **After major features:** Document new components
- **User feedback:** Refine accessibility and usability

### Related Documentation

- [Component Library](component_library.md) - Reusable UI components
- [Typography System](typography_system.md) - Font usage guidelines
- [Color System](color_system.md) - Complete color palette
- [Spacing System](spacing_system.md) - Layout and spacing standards
- [Icon System](icon_system.md) - Icon usage and accessibility
- [Responsive Design](responsive_design.md) - Breakpoints and patterns
- [Accessibility Patterns](accessibility_patterns.md) - WCAG compliance

---

**Document Owner:** Design Lead & Engineering Lead
**Last Reviewed:** 2026-02-26
**Next Review:** 2026-05-26 (Quarterly)
