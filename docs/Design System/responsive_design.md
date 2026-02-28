# Responsive Design — JoyMatcher

**Version:** 1.0.0
**Last Updated:** 2026-02-26
**Status:** Complete Reference
**Tailwind CSS Version:** v4.x

---

## 1. Introduction

JoyMatcher's responsive design system ensures a premium, trust-based experience across all devices—from mobile phones to large desktop displays. Our mobile-first approach prioritizes the growing majority of users accessing relationship platforms on mobile devices.

### Design Philosophy

Our responsive design conveys:
- **Mobile-First** — Optimized for mobile, enhanced for larger screens
- **Content Priority** — Essential information always visible
- **Progressive Enhancement** — Additional features on larger screens
- **Touch-Friendly** — Sufficient spacing and target sizes on mobile
- **Consistent Experience** — Brand identity maintained across breakpoints

### Core Principles

1. **Mobile-First Approach** — Design for smallest screen first
2. **Full-Width Utilization** — Use available screen space, never cramp into center
3. **Fluid Layouts** — Flexible grids and containers that expand with viewport
4. **Responsive Typography** — Text scales appropriately
5. **Adaptive Spacing** — Margins/padding adjust by breakpoint
6. **Touch Targets** — Minimum 44x44px on mobile
7. **Performance** — Optimized assets for each breakpoint

### Space Utilization Philosophy

**CRITICAL:** JoyMatcher layouts must utilize the full available screen space. Content should NOT be cramped into a narrow centered column. Instead:

- **App/Dashboard pages:** Full-width layouts with sidebars expanding to fill space
- **Content grids:** Expand columns to use available width (4+ columns on large screens)
- **Cards:** Grow to fill grid cells, not fixed narrow widths
- **Padding scales with viewport:** Larger screens get proportionally more breathing room, but content still fills the space

---

## 2. Breakpoint System

### 2.1 Tailwind Breakpoints

JoyMatcher uses Tailwind's default breakpoints:

| Breakpoint | Prefix | Min Width | Target Devices | Usage |
|------------|--------|-----------|----------------|-------|
| Mobile (default) | None | 0px | Phones (portrait) | Base styles, no prefix needed |
| Small | `sm:` | 640px | Large phones (landscape), small tablets | Minor adjustments |
| Medium | `md:` | 768px | Tablets (portrait) | Tablet-optimized layouts |
| Large | `lg:` | 1024px | Tablets (landscape), small desktops | Desktop layouts begin |
| Extra Large | `xl:` | 1280px | Desktops | Standard desktop experience |
| 2X Large | `2xl:` | 1536px | Large desktops, monitors | Maximum width, enhanced spacing |

### 2.2 Mobile-First Syntax

Tailwind is mobile-first, meaning unprefixed utilities apply to all screen sizes, and prefixed utilities override them at larger breakpoints.

```html
<!-- Mobile: padding 16px, Desktop (lg): padding 48px -->
<div class="p-4 lg:p-12">

<!-- Mobile: 1 column, Tablet: 2 columns, Desktop: 3 columns -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
```

### 2.3 Common Device Targets

| Device Category | Screen Width | Breakpoint | Example Devices |
|-----------------|--------------|------------|-----------------|
| Mobile (Portrait) | 320-640px | Mobile (default) | iPhone SE, iPhone 14, Galaxy S23 |
| Mobile (Landscape) | 640-768px | `sm:` | iPhone 14 Pro Max landscape |
| Tablet (Portrait) | 768-1024px | `md:` | iPad, iPad Mini, Surface Go |
| Tablet (Landscape) | 1024-1280px | `lg:` | iPad Pro landscape |
| Desktop | 1280-1536px | `xl:` | MacBook Air, standard monitors |
| Large Desktop | 1536px+ | `2xl:` | iMac, 27"+ monitors |

---

## 3. Responsive Layout Patterns

### 3.1 Container Width Strategy

**IMPORTANT:** Avoid cramping content into narrow centered columns. Layouts should expand to utilize available screen space.

#### ✅ PREFERRED: Full-Width Layouts (App Pages)

```html
<!-- Dashboard/App pages: Full width with responsive padding -->
<div class="w-full px-4 md:px-6 lg:px-8 xl:px-12">
  <!-- Content expands to fill available width -->
</div>

<!-- With sidebar: Main content fills remaining space -->
<div class="flex w-full">
  <aside class="w-64 flex-shrink-0">Sidebar</aside>
  <main class="flex-1 px-6 lg:px-8">
    <!-- Main content fills ALL remaining space -->
  </main>
</div>
```

#### ✅ Full-Width Grids That Scale

```html
<!-- Grid expands columns based on screen size -->
<div class="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
  <!-- Cards fill the grid, not cramped in center -->
</div>
```

#### ⚠️ LIMITED USE: Centered Containers

Only use `max-w-*` with `mx-auto` for these specific cases:

```html
<!-- ONLY for long-form reading content (articles, privacy policy) -->
<article class="max-w-3xl mx-auto px-6">
  <!-- Readable line length for articles only -->
</article>

<!-- ONLY for modals and focused forms -->
<div class="max-w-md mx-auto">
  <!-- Login form, modal content -->
</div>
```

**When to use max-width (RARELY):**
- `max-w-md` (448px): Modals, login forms only
- `max-w-3xl` (768px): Long-form articles, legal text only
- **NEVER** use max-w-7xl for dashboards — use full width instead

#### ❌ AVOID: Cramped Centered Layouts

```html
<!-- DON'T DO THIS for app pages -->
<div class="max-w-7xl mx-auto px-6">
  <!-- This wastes space on large screens! -->
</div>

<!-- DON'T DO THIS for card grids -->
<div class="max-w-5xl mx-auto">
  <div class="grid grid-cols-3 gap-6">
    <!-- Cards cramped in center, wasting side space -->
  </div>
</div>
```

---

### 3.2 Grid Layouts

#### ✅ PREFERRED: Full-Width Expanding Grids

```html
<!-- Grid scales columns with screen size - FILLS available space -->
<div class="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 md:gap-6">
  <div class="bg-white rounded-2xl p-6">Card 1</div>
  <div class="bg-white rounded-2xl p-6">Card 2</div>
  <div class="bg-white rounded-2xl p-6">Card 3</div>
  <div class="bg-white rounded-2xl p-6">Card 4</div>
  <div class="bg-white rounded-2xl p-6">Card 5</div>
</div>
```

**Column scaling guideline:**
- Mobile (< 640px): 1 column
- Small (640px+): 2 columns
- Large (1024px+): 3 columns
- XL (1280px+): 4 columns
- 2XL (1536px+): 5+ columns

#### Auto-Fill Grid (Best for Dynamic Content)

```html
<!-- Cards automatically fill available space with minimum width -->
<div class="w-full grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-6">
  <!-- Cards expand to fill row, more columns on wider screens -->
</div>
```

**Use `auto-fill`** (not `auto-fit`) to ensure cards don't stretch too wide on large screens with few items.

#### Responsive Gap Sizing

```html
<!-- Gaps scale with viewport -->
<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
```

---

### 3.3 Flexbox Layouts

#### Stack to Row

```html
<!-- Mobile: stacked (column), Desktop: side-by-side (row) -->
<div class="flex flex-col lg:flex-row gap-6 lg:gap-12">
  <div class="flex-1">Left content</div>
  <div class="flex-1">Right content</div>
</div>
```

#### Reverse Order on Mobile

```html
<!-- Desktop: Image left, text right | Mobile: Text first, image below -->
<div class="flex flex-col-reverse lg:flex-row gap-6">
  <div class="lg:w-1/2">
    <h2>Feature Heading</h2>
    <p>Description</p>
  </div>
  <img src="feature.jpg" class="lg:w-1/2 rounded-2xl">
</div>
```

#### Centered on Mobile, Left-Aligned on Desktop

```html
<div class="flex flex-col items-center lg:items-start">
  <h1 class="text-3xl lg:text-5xl">Headline</h1>
  <p class="text-center lg:text-left">Description</p>
</div>
```

---

## 4. Responsive Typography

### 4.1 Text Size Scaling

```html
<!-- Mobile: 24px, Desktop: 48px -->
<h1 class="text-2xl md:text-4xl lg:text-5xl font-bold">
  Find Your Life Partner
</h1>

<!-- Mobile: 30px, Desktop: 30px (no change) -->
<h1 class="text-3xl font-semibold">
  Dashboard
</h1>

<!-- Mobile: 16px, Desktop: 18px (subtle increase) -->
<p class="text-base lg:text-lg">
  Long-form content with slightly larger text on desktop
</p>
```

**Guidelines:**
- **Hero headlines:** Scale significantly (2xl → 5xl)
- **Page titles:** Minimal scaling (2xl → 3xl)
- **Body text:** 16px minimum, subtle scaling (base → lg)
- **Captions:** No scaling (remain sm)

### 4.2 Line Height Adjustments

```html
<!-- Tighter leading on mobile for space efficiency -->
<h1 class="text-4xl leading-tight md:text-5xl md:leading-tight">
  Headline with Consistent Leading
</h1>

<!-- Relaxed leading for long-form on desktop -->
<p class="text-base leading-[1.6] lg:text-lg lg:leading-relaxed">
  Long-form article content
</p>
```

### 4.3 Text Alignment

```html
<!-- Centered on mobile, left-aligned on desktop -->
<h2 class="text-center lg:text-left text-2xl lg:text-3xl">
  Section Heading
</h2>

<!-- Always centered (hero sections) -->
<h1 class="text-center text-3xl md:text-5xl">
  Find Your Match
</h1>
```

---

## 5. Responsive Spacing

### 5.1 Container Padding

```html
<!-- Mobile: 24px, Tablet: 48px, Desktop: 80px -->
<main class="px-6 md:px-12 lg:px-20">

<!-- Mobile: 32px vertical, Desktop: 64px vertical -->
<section class="py-8 md:py-12 lg:py-16">
```

### 5.2 Element Spacing

```html
<!-- Mobile: 32px gap, Desktop: 64px gap -->
<div class="space-y-8 lg:space-y-16">

<!-- Responsive margin bottom -->
<h1 class="mb-6 lg:mb-12">
```

### 5.3 Grid/Flex Gaps

```html
<!-- Mobile: 24px, Desktop: 32px -->
<div class="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">

<!-- Horizontal gap scaling -->
<div class="flex gap-4 md:gap-6 lg:gap-8">
```

**Scaling Pattern:**
- Mobile: Compact spacing (4, 6, 8)
- Tablet: Standard spacing (6, 8, 12)
- Desktop: Relaxed spacing (8, 12, 16)

---

## 6. Responsive Components

### 6.1 Navigation

#### Mobile: Hamburger Menu

```html
<!-- Mobile navigation (hidden on desktop) -->
<button class="lg:hidden flex items-center justify-center w-10 h-10" aria-label="Menu">
  <iconify-icon icon="lucide:menu" class="text-2xl"></iconify-icon>
</button>

<!-- Mobile menu (toggleable) -->
<nav class="lg:hidden fixed inset-0 bg-white z-50 p-6">
  <ul class="space-y-4">
    <li><a href="/discover">Discover</a></li>
    <li><a href="/matches">Matches</a></li>
    <li><a href="/messages">Messages</a></li>
  </ul>
</nav>
```

#### Desktop: Full Navigation

```html
<!-- Desktop navigation (hidden on mobile) -->
<nav class="hidden lg:flex items-center gap-8">
  <a href="/discover">Discover</a>
  <a href="/matches">Matches</a>
  <a href="/messages">Messages</a>
</nav>
```

### 6.2 Cards

#### Vertical on Mobile, Horizontal on Desktop

```html
<div class="flex flex-col md:flex-row gap-6 bg-white rounded-2xl shadow-[0_4px_16px_rgba(77,0,82,0.12)] overflow-hidden">
  <!-- Image: full width on mobile, 1/3 width on desktop -->
  <img src="profile.jpg" class="w-full md:w-48 h-64 md:h-auto object-cover">

  <!-- Content: full width on mobile, 2/3 width on desktop -->
  <div class="p-6 flex-1">
    <h3 class="text-lg font-semibold">Sarah, 32</h3>
    <p class="text-sm">Lagos, Nigeria</p>
  </div>
</div>
```

### 6.3 Modals

#### Full Screen on Mobile, Centered on Desktop

```html
<!-- Backdrop -->
<div class="fixed inset-0 bg-black/50 z-40 flex items-center justify-center p-0 md:p-4">

  <!-- Modal: full screen mobile, max-width desktop -->
  <div class="bg-white w-full h-full md:max-w-md md:h-auto md:rounded-2xl p-6 overflow-y-auto">
    <h2 class="text-xl font-semibold">Modal Title</h2>
    <!-- Modal content -->
  </div>

</div>
```

**Mobile:** Full screen (better focus, no viewport issues)
**Desktop:** Centered with max-width (contextual overlay)

### 6.4 Forms

#### Single Column Mobile, Two Column Desktop

```html
<form class="grid grid-cols-1 lg:grid-cols-2 gap-6">
  <div class="flex flex-col gap-2">
    <label>First Name</label>
    <input type="text" class="px-4 py-3">
  </div>

  <div class="flex flex-col gap-2">
    <label>Last Name</label>
    <input type="text" class="px-4 py-3">
  </div>

  <!-- Full width on both -->
  <div class="flex flex-col gap-2 lg:col-span-2">
    <label>Email</label>
    <input type="email" class="px-4 py-3">
  </div>

  <button class="lg:col-span-2 py-3 bg-[#4D0052] text-white/95">
    Submit
  </button>
</form>
```

---

## 7. Touch-Friendly Mobile Design

### 7.1 Touch Target Sizes

```html
<!-- Minimum 44x44px touch targets -->
<button class="min-w-[44px] min-h-[44px] px-6 py-3">
  Tap Me
</button>

<!-- Icon button with adequate size -->
<button class="w-11 h-11 flex items-center justify-center" aria-label="Settings">
  <iconify-icon icon="lucide:settings" class="text-xl"></iconify-icon>
</button>
```

**WCAG 2.1 AAA Guideline:** Minimum 44x44px (2.75rem)

### 7.2 Spacing Between Tappable Elements

```html
<!-- Adequate spacing prevents mis-taps -->
<div class="flex flex-col space-y-4">
  <button class="w-full py-3">Button 1</button>
  <button class="w-full py-3">Button 2</button>
  <button class="w-full py-3">Button 3</button>
</div>
```

**Minimum:** 8px (0.5rem) between interactive elements

### 7.3 Mobile Form Inputs

```html
<!-- Larger padding for easier interaction -->
<input type="text" class="w-full px-4 py-4 text-base border rounded-xl">

<!-- Select with larger hit area -->
<select class="w-full px-4 py-4 text-base border rounded-xl appearance-none">
```

**Mobile padding:** `py-4` (16px) for comfortable tapping

---

## 8. Hiding & Showing Elements

### 8.1 Show/Hide by Breakpoint

```html
<!-- Show on mobile only -->
<div class="block lg:hidden">
  Mobile-only content
</div>

<!-- Show on desktop only -->
<div class="hidden lg:block">
  Desktop-only content
</div>

<!-- Show on tablet and above -->
<div class="hidden md:block">
  Tablet and desktop content
</div>
```

### 8.2 Visibility vs Display

```html
<!-- Display: none (removes from flow) -->
<div class="hidden lg:block">

<!-- Visibility: hidden (occupies space, invisible) -->
<div class="invisible lg:visible">

<!-- Opacity: 0 (occupies space, fades) -->
<div class="opacity-0 lg:opacity-100 transition">
```

**Use `hidden`/`block`** for responsive layout changes (preferred).

---

## 9. Responsive Images

### 9.1 Fluid Images

```html
<!-- Image scales with container -->
<img src="profile.jpg" class="w-full h-auto rounded-2xl">
```

### 9.2 Responsive Aspect Ratios

```html
<!-- 16:9 aspect ratio on mobile, 4:3 on desktop -->
<div class="relative aspect-video md:aspect-[4/3] overflow-hidden rounded-2xl">
  <img src="hero.jpg" class="absolute inset-0 w-full h-full object-cover">
</div>
```

### 9.3 Responsive srcset

```html
<!-- Serve different image sizes based on screen width -->
<img
  src="profile-medium.jpg"
  srcset="profile-small.jpg 400w, profile-medium.jpg 800w, profile-large.jpg 1200w"
  sizes="(max-width: 640px) 400px, (max-width: 1024px) 800px, 1200px"
  alt="User profile"
  class="w-full h-auto rounded-2xl"
>
```

### 9.4 Lazy Loading

```html
<!-- Defer loading images below fold -->
<img src="profile.jpg" loading="lazy" class="w-full h-auto rounded-2xl">
```

---

## 10. Responsive Utilities Reference

### 10.1 Display

```html
<!-- Hide on mobile, show on desktop -->
<div class="hidden lg:block">

<!-- Show on mobile, hide on desktop -->
<div class="block lg:hidden">

<!-- Flex on mobile, grid on desktop -->
<div class="flex lg:grid">
```

### 10.2 Flexbox Direction

```html
<!-- Column on mobile, row on desktop -->
<div class="flex flex-col lg:flex-row">

<!-- Row on mobile, column on desktop (rare) -->
<div class="flex flex-row lg:flex-col">

<!-- Reverse order -->
<div class="flex flex-col-reverse lg:flex-row">
```

### 10.3 Width

```html
<!-- Full width on mobile, 50% on desktop -->
<div class="w-full lg:w-1/2">

<!-- Fixed width on desktop only -->
<div class="w-full lg:w-96">

<!-- Min/max width responsive -->
<div class="min-w-full lg:min-w-0 max-w-none lg:max-w-2xl">
```

### 10.4 Padding & Margin

```html
<!-- Responsive padding -->
<div class="p-4 md:p-8 lg:p-12">

<!-- Responsive margin -->
<div class="mx-4 md:mx-auto max-w-7xl">

<!-- Individual sides -->
<div class="px-6 md:px-12 py-8 md:py-16">
```

### 10.5 Typography

```html
<!-- Responsive text size -->
<h1 class="text-2xl md:text-4xl lg:text-5xl">

<!-- Responsive font weight -->
<p class="font-normal lg:font-semibold">

<!-- Responsive alignment -->
<p class="text-center lg:text-left">
```

---

## 11. Common Responsive Patterns

### 11.1 Hero Section (Landing Page)

```html
<!-- Hero can be centered for marketing impact, but fills width -->
<section class="w-full py-16 md:py-20 lg:py-24 px-6 md:px-12 lg:px-20">
  <div class="text-center">
    <h1 class="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-6 md:mb-8">
      Find Your Life Partner with Confidence
    </h1>
    <p class="text-lg md:text-xl text-[hsla(320,30%,35%,1)] max-w-2xl mx-auto mb-8">
      Trust-based matchmaking for marriage-minded professionals.
    </p>
    <button class="bg-[#4D0052] text-white/95 px-8 py-4 rounded-xl text-lg font-semibold">
      Get Started Free
    </button>
  </div>
</section>
```

### 11.2 Feature Grid (Full Width)

```html
<!-- Features expand across full width, NOT cramped in center -->
<section class="w-full py-12 md:py-16 lg:py-20 px-6 md:px-8 lg:px-12">
  <h2 class="text-2xl md:text-3xl font-semibold text-center mb-12">
    Why JoyMatcher?
  </h2>

  <!-- Grid expands to fill available space -->
  <div class="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
    <div class="flex flex-col items-center text-center space-y-4 p-6 bg-white rounded-2xl">
      <div class="w-16 h-16 bg-[#4D0052]/10 rounded-xl flex items-center justify-center">
        <iconify-icon icon="lucide:shield-check" class="text-4xl text-[#4D0052]"></iconify-icon>
      </div>
      <h3 class="text-lg font-semibold">Verified Profiles</h3>
      <p class="text-sm text-[hsla(320,30%,35%,1)]">All users undergo identity verification</p>
    </div>

    <div class="flex flex-col items-center text-center space-y-4 p-6 bg-white rounded-2xl">
      <div class="w-16 h-16 bg-[#4D0052]/10 rounded-xl flex items-center justify-center">
        <iconify-icon icon="lucide:lock" class="text-4xl text-[#4D0052]"></iconify-icon>
      </div>
      <h3 class="text-lg font-semibold">Privacy First</h3>
      <p class="text-sm text-[hsla(320,30%,35%,1)]">Your information is always protected</p>
    </div>

    <div class="flex flex-col items-center text-center space-y-4 p-6 bg-white rounded-2xl">
      <div class="w-16 h-16 bg-[#4D0052]/10 rounded-xl flex items-center justify-center">
        <iconify-icon icon="lucide:heart" class="text-4xl text-[#4D0052]"></iconify-icon>
      </div>
      <h3 class="text-lg font-semibold">Serious Connections</h3>
      <p class="text-sm text-[hsla(320,30%,35%,1)]">Marriage-minded professionals only</p>
    </div>

    <div class="flex flex-col items-center text-center space-y-4 p-6 bg-white rounded-2xl">
      <div class="w-16 h-16 bg-[#4D0052]/10 rounded-xl flex items-center justify-center">
        <iconify-icon icon="lucide:users" class="text-4xl text-[#4D0052]"></iconify-icon>
      </div>
      <h3 class="text-lg font-semibold">Curated Matches</h3>
      <p class="text-sm text-[hsla(320,30%,35%,1)]">Quality over quantity approach</p>
    </div>
  </div>
</section>
```

### 11.3 Profile Card Grid (Full Width, Expanding)

```html
<!-- Cards fill available width - more columns on larger screens -->
<div class="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 md:gap-6 px-4 md:px-6 lg:px-8">
  <div class="bg-white rounded-2xl shadow-[0_4px_16px_rgba(77,0,82,0.12)] overflow-hidden">
    <img src="profile1.jpg" class="w-full h-64 object-cover">
    <div class="p-6 space-y-4">
      <h3 class="text-lg font-semibold">Sarah, 32</h3>
      <p class="text-sm text-[hsla(320,30%,35%,1)]">Lagos, Nigeria</p>
      <button class="w-full py-3 bg-[#F16A6F] text-white/95 rounded-xl font-semibold">
        Show Interest
      </button>
    </div>
  </div>
  <!-- More cards fill available columns -->
</div>
```

### 11.4 Dashboard Layout (Full Width with Sidebar)

```html
<!-- Dashboard fills entire viewport -->
<div class="flex w-full min-h-screen">
  <!-- Sidebar: Fixed width -->
  <aside class="w-64 flex-shrink-0 bg-[hsla(320,18%,96%,1)] border-r">
    <!-- Navigation -->
  </aside>

  <!-- Main content: Fills ALL remaining space -->
  <main class="flex-1 p-6 lg:p-8 bg-[hsla(320,12%,98%,1)]">
    <h1 class="text-2xl font-semibold mb-8">Dashboard</h1>

    <!-- Stats grid expands with available space -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
      <div class="bg-white rounded-xl p-6">Stat 1</div>
      <div class="bg-white rounded-xl p-6">Stat 2</div>
      <div class="bg-white rounded-xl p-6">Stat 3</div>
      <div class="bg-white rounded-xl p-6">Stat 4</div>
    </div>

    <!-- Content sections fill width -->
    <div class="grid grid-cols-1 xl:grid-cols-2 gap-6">
      <div class="bg-white rounded-xl p-6">Recent Activity</div>
      <div class="bg-white rounded-xl p-6">Notifications</div>
    </div>
  </main>
</div>
```

---

## 12. Performance Optimization

### 12.1 Mobile-Specific Optimizations

- **Image compression:** Serve smaller images on mobile
- **Lazy loading:** Defer below-fold images
- **Reduce animations:** Disable heavy animations on mobile
- **Touch optimization:** Larger tap targets, simplified interactions

### 12.2 Responsive Image Delivery

```html
<!-- WebP with fallback + srcset -->
<picture>
  <source srcset="profile-small.webp 400w, profile-large.webp 800w" type="image/webp">
  <img src="profile.jpg" srcset="profile-small.jpg 400w, profile-large.jpg 800w"
       sizes="(max-width: 640px) 400px, 800px" alt="Profile">
</picture>
```

### 12.3 Conditional Loading

```html
<!-- Load heavy component only on desktop -->
<div class="hidden lg:block">
  <!-- Desktop-only interactive feature -->
</div>
```

---

## 13. Testing & Quality Assurance

### 13.1 Device Testing

Test on:
- **Mobile:** iPhone SE (375px), iPhone 14 (390px), Galaxy S23 (360px)
- **Tablet:** iPad (768px), iPad Pro (1024px)
- **Desktop:** MacBook Air (1440px), iMac (1920px)

### 13.2 Browser Testing

- Chrome (mobile & desktop)
- Safari (iOS & macOS)
- Firefox (desktop)
- Edge (desktop)

### 13.3 Responsive Checklist

- [ ] All breakpoints tested (mobile, tablet, desktop)
- [ ] Touch targets ≥ 44x44px on mobile
- [ ] Text readable on all screen sizes (no horizontal scroll)
- [ ] Images scale appropriately (no distortion)
- [ ] Navigation accessible on mobile (hamburger menu)
- [ ] Forms usable on mobile (large inputs, adequate spacing)
- [ ] Modals full-screen on mobile, centered on desktop
- [ ] Grid layouts collapse appropriately
- [ ] No horizontal scrolling (overflow issues)
- [ ] Performance optimized (lazy loading, responsive images)

---

## 14. Responsive Design Don'ts

### Never Do

- ❌ **Cramp content into center** — Use full available width
- ❌ **Use max-w-7xl for app pages** — Let dashboards fill the screen
- ❌ **Limit grid columns on large screens** — Scale to 4-5+ columns on 2xl
- ❌ Design desktop-first (always start mobile)
- ❌ Use fixed pixel widths (prefer percentages/flex/grid)
- ❌ Ignore touch target sizes (< 44px on mobile)
- ❌ Make buttons too small on mobile
- ❌ Use hover states as only interaction cue on touch devices
- ❌ Forget to test on real devices (not just browser resize)
- ❌ Use horizontal scrolling for content
- ❌ Ignore landscape orientation on mobile

### Always Do

- ✅ **Fill available space** — Content expands with viewport
- ✅ **Scale grid columns** — More columns on larger screens (4-5+ on 2xl)
- ✅ **Use flex-1** — Let main content fill remaining space after sidebar
- ✅ Design mobile-first, enhance for desktop
- ✅ Use fluid layouts (percentages, flex, grid)
- ✅ Test on real devices (phones, tablets)
- ✅ Ensure touch targets ≥ 44x44px
- ✅ Provide adequate spacing on mobile
- ✅ Optimize images for each breakpoint
- ✅ Test both portrait and landscape orientations
- ✅ Use responsive typography (scaling text sizes)

---

## 15. Related Documentation

- [Design System](design_system.md) - Complete design tokens
- [Component Library](component_library.md) - Responsive components
- [Spacing System](spacing_system.md) - Responsive spacing patterns
- [Typography System](typography_system.md) - Responsive text sizing

---

**Document Owner:** Design Lead & Frontend Lead
**Last Reviewed:** 2026-02-26
**Next Review:** 2026-05-26 (Quarterly)
