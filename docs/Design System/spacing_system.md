# Spacing System — JoyMatcher

**Version:** 1.0.0
**Last Updated:** 2026-02-26
**Status:** Complete Reference
**Tailwind CSS Version:** v4.x

---

## 1. Introduction

JoyMatcher's spacing system creates visual hierarchy, breathing room, and editorial quality through generous, intentional spacing. Our structured approach to margins, padding, and gaps reflects the premium, trust-based nature of our platform.

### Design Philosophy

Our spacing conveys:
- **Editorial Quality** — Generous whitespace like premium publications
- **Visual Hierarchy** — Clear relationships between elements
- **Breathing Room** — Uncluttered, focused experiences
- **Professional Polish** — Refined, deliberate layouts
- **Trust-Building** — Space signals quality and attention to detail

### Core Principles

1. **Consistent Scale** — Predefined spacing values for harmony
2. **Generous Leading** — More space than typical apps (editorial aesthetic)
3. **Intentional Density** — Tight spacing for related elements, relaxed for sections
4. **Responsive Adaptation** — Spacing scales appropriately on mobile
5. **Whitespace as Design Element** — Space is not empty, it's intentional

---

## 2. Spacing Scale

Our spacing system uses a progression that balances practicality with visual harmony.

| Name | Value (px) | Value (rem) | Tailwind Classes | Usage |
|------|------------|-------------|------------------|-------|
| 0 | 0px | 0rem | `m-0`, `p-0`, `gap-0` | Remove spacing |
| 1 | 4px | 0.25rem | `m-1`, `p-1`, `gap-1` | Micro spacing |
| 2 | 8px | 0.5rem | `m-2`, `p-2`, `gap-2` | Tiny spacing |
| 3 | **12px** | **0.75rem** | `m-3`, `p-3`, `gap-3` | **Tight** — Icon-text gaps |
| 4 | 16px | 1rem | `m-4`, `p-4`, `gap-4` | Standard small |
| 5 | **20px** | **1.25rem** | `m-5`, `p-5`, `gap-5` | **Compact** — Related elements |
| 6 | 24px | 1.5rem | `m-6`, `p-6`, `gap-6` | Card padding |
| 8 | **32px** | **2rem** | `m-8`, `p-8`, `gap-8` | **Standard** — List items, cards |
| 10 | 40px | 2.5rem | `m-10`, `p-10`, `gap-10` | Medium sections |
| 12 | **48px** | **3rem** | `m-12`, `p-12`, `gap-12` | **Relaxed** — Large containers |
| 16 | **64px** | **4rem** | `m-16`, `p-16`, `gap-16` | **Section** — Major divisions |
| 20 | 80px | 5rem | `m-20`, `p-20`, `gap-20` | Hero sections |
| 24 | 96px | 6rem | `m-24`, `p-24`, `gap-24` | Extra large sections |
| 32 | 128px | 8rem | `m-32`, `p-32`, `gap-32` | Maximum spacing |

**Highlighted values** are our core semantic spacing tokens.

---

## 3. Semantic Spacing Tokens

### 3.1 Tight Spacing (12px / 0.75rem)

**Value:** `gap-3`, `space-x-3`, `space-y-3`

**Usage:**
- Icon-text pairs in buttons
- Inline badges next to text
- Small chip groups
- Compact form elements

**Example:**
```html
<!-- Button with icon and text -->
<button class="flex items-center gap-3 px-6 py-3">
  <iconify-icon icon="lucide:heart" class="text-lg"></iconify-icon>
  <span>Show Interest</span>
</button>

<!-- Badge next to heading -->
<div class="flex items-center gap-3">
  <h3 class="text-lg font-semibold">Sarah, 32</h3>
  <span class="px-2 py-1 bg-[#E8E4F0] text-[#8B7AA8] rounded-full text-xs">Verified</span>
</div>
```

---

### 3.2 Compact Spacing (20px / 1.25rem)

**Value:** `gap-5`, `space-x-5`, `space-y-5`

**Usage:**
- Form field spacing
- Related small elements
- Card internal sections
- Navigation item spacing

**Example:**
```html
<!-- Form fields -->
<form class="space-y-5">
  <div class="flex flex-col gap-2">
    <label>Display Name</label>
    <input type="text">
  </div>
  <div class="flex flex-col gap-2">
    <label>Email</label>
    <input type="email">
  </div>
</form>

<!-- Navigation items -->
<nav class="flex items-center gap-5">
  <a href="/discover">Discover</a>
  <a href="/matches">Matches</a>
  <a href="/messages">Messages</a>
</nav>
```

---

### 3.3 Standard Spacing (32px / 2rem)

**Value:** `gap-8`, `space-x-8`, `space-y-8`

**Usage:**
- List item separation
- Card stacking
- Section internal spacing
- Grid column gaps

**Example:**
```html
<!-- Card grid -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
  <div class="bg-white rounded-2xl p-6">Card 1</div>
  <div class="bg-white rounded-2xl p-6">Card 2</div>
  <div class="bg-white rounded-2xl p-6">Card 3</div>
</div>

<!-- List items -->
<ul class="space-y-8">
  <li>Profile 1</li>
  <li>Profile 2</li>
  <li>Profile 3</li>
</ul>
```

---

### 3.4 Relaxed Spacing (48px / 3rem)

**Value:** `gap-12`, `space-x-12`, `space-y-12`

**Usage:**
- Large container spacing
- Section internal divisions
- Hero-to-content transitions
- Major card separations

**Example:**
```html
<!-- Hero to content -->
<section class="py-20 space-y-12">
  <div class="text-center">
    <h1 class="text-5xl font-bold">Find Your Life Partner</h1>
  </div>
  <div class="grid grid-cols-3 gap-8">
    <!-- Feature cards -->
  </div>
</section>

<!-- Sidebar navigation -->
<nav class="space-y-12">
  <div class="space-y-2">
    <!-- Main nav group -->
  </div>
  <div class="space-y-2">
    <!-- Secondary nav group -->
  </div>
</nav>
```

---

### 3.5 Section Spacing (64px / 4rem)

**Value:** `gap-16`, `space-x-16`, `space-y-16`

**Usage:**
- Major page sections
- Hero-to-body transitions
- Feature section separations
- Landing page divisions

**Example:**
```html
<!-- Landing page sections -->
<main class="space-y-16">
  <section class="py-20">
    <!-- Hero section -->
  </section>
  <section class="py-16">
    <!-- Features section -->
  </section>
  <section class="py-16">
    <!-- Pricing section -->
  </section>
</main>
```

---

## 4. Layout Patterns

### 4.1 Container Padding

#### Cards

```html
<!-- Standard card padding -->
<div class="bg-white rounded-2xl p-6 space-y-4">
  <h3 class="text-lg font-semibold">Card Title</h3>
  <p class="text-base">Card content</p>
</div>

<!-- Large card padding -->
<div class="bg-white rounded-2xl p-8 space-y-6">
  <h2 class="text-2xl font-bold">Premium Feature</h2>
  <p class="text-base">Extended content</p>
</div>
```

**Guideline:**
- Small cards: `p-4` (16px)
- Standard cards: `p-6` (24px)
- Large cards: `p-8` (32px)
- Hero cards: `p-12` (48px)

#### Modals

```html
<!-- Modal padding -->
<div class="bg-white rounded-2xl p-6 space-y-6 max-w-md">
  <div class="flex items-center justify-between">
    <h2 class="text-xl font-semibold">Modal Title</h2>
    <button aria-label="Close">×</button>
  </div>
  <div class="space-y-4">
    <!-- Modal content -->
  </div>
  <div class="flex gap-3">
    <!-- Modal actions -->
  </div>
</div>
```

**Standard modal:** `p-6` with `space-y-6` for sections

#### Page Containers

```html
<!-- Main content area -->
<main class="px-12 py-8">
  <!-- Page content -->
</main>

<!-- Without sidebars (marketing pages) -->
<main class="px-30 py-16 max-w-7xl mx-auto">
  <!-- Wide content -->
</main>
```

**Guidelines:**
- **With sidebars:** `px-8` to `px-16`
- **Without sidebars (marketing):** `px-30` to `px-80`
- **Vertical padding:** `py-8` to `py-16`

---

### 4.2 Vertical Rhythm (Stack Spacing)

Use Tailwind's `space-y-*` utilities for consistent vertical rhythm:

```html
<!-- Form vertical spacing -->
<form class="space-y-6">
  <div class="space-y-2">
    <label>Field 1</label>
    <input type="text">
  </div>
  <div class="space-y-2">
    <label>Field 2</label>
    <input type="text">
  </div>
  <button>Submit</button>
</form>

<!-- Content sections -->
<article class="space-y-8">
  <h1>Article Title</h1>
  <p>First paragraph</p>
  <p>Second paragraph</p>
  <h2>Subheading</h2>
  <p>Third paragraph</p>
</article>
```

**Pattern:**
- **Field groups:** `space-y-2` (8px) between label and input
- **Form sections:** `space-y-6` (24px) between field groups
- **Content paragraphs:** `space-y-4` (16px) between paragraphs
- **Major sections:** `space-y-8` (32px) between content blocks

---

### 4.3 Horizontal Rhythm (Inline Spacing)

Use `gap-*` for flex/grid layouts, `space-x-*` for inline elements:

```html
<!-- Flexbox with gap -->
<div class="flex items-center gap-4">
  <img src="avatar.jpg" class="w-12 h-12 rounded-full">
  <div>
    <h3 class="font-semibold">Sarah Johnson</h3>
    <p class="text-sm">Lagos, Nigeria</p>
  </div>
</div>

<!-- Inline buttons -->
<div class="flex items-center gap-3">
  <button class="bg-[#4D0052] text-white/95 px-6 py-3">Primary</button>
  <button class="border-2 border-[#4D0052] text-[#4D0052] px-6 py-3">Secondary</button>
</div>

<!-- Navigation -->
<nav class="flex items-center gap-8">
  <a href="/discover">Discover</a>
  <a href="/matches">Matches</a>
  <a href="/messages">Messages</a>
</nav>
```

**Guidelines:**
- **Tight inline:** `gap-2` (8px) — Icon-text pairs
- **Compact inline:** `gap-3` (12px) — Buttons, badges
- **Standard inline:** `gap-4` (16px) — Related elements
- **Relaxed inline:** `gap-8` (32px) — Navigation items

---

## 5. Grid Spacing

### 5.1 Card Grids

```html
<!-- Profile card grid -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
  <div class="bg-white rounded-2xl p-6">Profile 1</div>
  <div class="bg-white rounded-2xl p-6">Profile 2</div>
  <div class="bg-white rounded-2xl p-6">Profile 3</div>
</div>

<!-- Compact grid -->
<div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
  <div class="bg-white rounded-lg p-4">Item 1</div>
  <div class="bg-white rounded-lg p-4">Item 2</div>
</div>

<!-- Wide grid -->
<div class="grid grid-cols-1 md:grid-cols-2 gap-12">
  <div class="bg-white rounded-2xl p-8">Feature 1</div>
  <div class="bg-white rounded-2xl p-8">Feature 2</div>
</div>
```

**Guidelines:**
- **Dense grids (4+ columns):** `gap-4` to `gap-6` (16-24px)
- **Standard grids (2-3 columns):** `gap-8` (32px)
- **Sparse grids (1-2 columns):** `gap-12` (48px)

---

### 5.2 Row & Column Gaps

```html
<!-- Different row/column gaps -->
<div class="grid grid-cols-3 gap-x-8 gap-y-12">
  <!-- 32px between columns, 48px between rows -->
</div>

<!-- Responsive grid spacing -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-10">
  <!-- Spacing increases with screen size -->
</div>
```

---

## 6. Component-Specific Spacing

### 6.1 Buttons

```html
<!-- Standard button padding -->
<button class="px-6 py-3">
  Button Text
</button>

<!-- Compact button -->
<button class="px-4 py-2 text-sm">
  Compact
</button>

<!-- Large button -->
<button class="px-8 py-4 text-lg">
  Large Button
</button>

<!-- Icon button -->
<button class="w-10 h-10">
  <iconify-icon icon="lucide:settings"></iconify-icon>
</button>
```

**Standard padding:**
- **Horizontal:** `px-6` (24px)
- **Vertical:** `py-3` (12px)
- **Icon-text gap:** `gap-2` (8px)

### 6.2 Input Fields

```html
<!-- Text input -->
<input type="text" class="px-4 py-3 border rounded-xl">

<!-- Textarea -->
<textarea class="px-4 py-3 border rounded-xl"></textarea>

<!-- Select -->
<select class="px-4 py-3 pr-10 border rounded-xl">
  <option>Option 1</option>
</select>
```

**Standard padding:**
- **Horizontal:** `px-4` (16px)
- **Vertical:** `py-3` (12px)
- Matches button padding for visual consistency

### 6.3 Navigation

```html
<!-- Horizontal navigation -->
<nav class="px-12 py-4 flex items-center gap-8">
  <a href="/">Logo</a>
  <a href="/discover">Discover</a>
  <a href="/matches">Matches</a>
</nav>

<!-- Vertical navigation -->
<nav class="px-4 py-6 space-y-2">
  <a href="/dashboard" class="px-4 py-3">Dashboard</a>
  <a href="/discover" class="px-4 py-3">Discover</a>
  <a href="/matches" class="px-4 py-3">Matches</a>
</nav>
```

**Guidelines:**
- **Nav container:** `px-12 py-4` (horizontal), `px-4 py-6` (vertical)
- **Nav items:** `px-4 py-3`
- **Nav item gaps:** `gap-8` (horizontal), `space-y-2` (vertical)

### 6.4 Cards

```html
<!-- Standard profile card -->
<div class="bg-white rounded-2xl shadow-[0_4px_16px_rgba(77,0,82,0.12)] overflow-hidden">
  <img src="profile.jpg" class="w-full h-64 object-cover">
  <div class="p-6 space-y-4">
    <h3 class="text-lg font-semibold">Sarah, 32</h3>
    <p class="text-sm">Lagos, Nigeria</p>
    <button class="w-full py-3">Show Interest</button>
  </div>
</div>

<!-- Horizontal card -->
<div class="bg-white rounded-2xl shadow-[0_4px_16px_rgba(77,0,82,0.12)] flex gap-6 p-6">
  <img src="profile.jpg" class="w-32 h-32 rounded-xl object-cover">
  <div class="flex-1 space-y-3">
    <h3 class="text-lg font-semibold">Michael, 35</h3>
    <p class="text-sm">Accra, Ghana</p>
  </div>
</div>
```

**Card padding:**
- **Standard:** `p-6` (24px)
- **Large:** `p-8` (32px)
- **Internal spacing:** `space-y-4` (16px)

---

## 7. Responsive Spacing

### 7.1 Mobile-First Approach

Start with smaller spacing on mobile, increase on larger screens:

```html
<!-- Responsive container padding -->
<div class="px-6 md:px-12 lg:px-20">
  <!-- 24px mobile, 48px tablet, 80px desktop -->
</div>

<!-- Responsive grid gaps -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-10">
  <!-- 24px mobile, 32px tablet, 40px desktop -->
</div>

<!-- Responsive section spacing -->
<section class="py-12 md:py-16 lg:py-20">
  <!-- 48px mobile, 64px tablet, 80px desktop -->
</section>
```

### 7.2 Breakpoint Guidelines

| Element | Mobile (<640px) | Tablet (640-1024px) | Desktop (>1024px) |
|---------|-----------------|---------------------|-------------------|
| Page padding | `px-6` (24px) | `px-12` (48px) | `px-20` (80px) |
| Section padding | `py-12` (48px) | `py-16` (64px) | `py-20` (80px) |
| Card grid gap | `gap-6` (24px) | `gap-8` (32px) | `gap-10` (40px) |
| Hero padding | `py-16` (64px) | `py-20` (80px) | `py-24` (96px) |

### 7.3 Touch Target Spacing

On mobile, ensure sufficient spacing for touch targets:

```html
<!-- Minimum 44x44px touch targets -->
<button class="min-w-[44px] min-h-[44px] px-6 py-3">
  Button
</button>

<!-- List items with adequate spacing -->
<ul class="space-y-4">
  <li><button class="w-full py-4 text-left">List item 1</button></li>
  <li><button class="w-full py-4 text-left">List item 2</button></li>
</ul>
```

**Minimum touch target:** 44x44px (WCAG 2.1 AAA guideline)

---

## 8. Negative Spacing

Use negative margins sparingly for overlapping effects:

```html
<!-- Overlapping avatar -->
<div class="relative">
  <img src="cover.jpg" class="w-full h-48 object-cover">
  <img src="avatar.jpg" class="absolute -bottom-8 left-6 w-16 h-16 rounded-full border-4 border-white">
</div>

<!-- Card overlap -->
<div class="relative -mt-16 mx-6">
  <div class="bg-white rounded-2xl p-6 shadow-[0_4px_16px_rgba(77,0,82,0.12)]">
    Overlapping card
  </div>
</div>
```

**Use cases:**
- Avatar overlaps
- Card overlays on hero images
- Sticky headers with overlap
- Creative layouts

**Caution:** Can break responsive layouts—test thoroughly.

---

## 9. Optical Spacing Adjustments

Sometimes mathematical spacing needs visual adjustment:

### 9.1 Text Alignment

```html
<!-- Icon appears too far from text due to font metrics -->
<div class="flex items-center gap-3">
  <iconify-icon icon="lucide:heart" class="text-lg -mr-0.5"></iconify-icon>
  <span>Slightly closer to icon</span>
</div>

<!-- Large headings need tighter spacing above -->
<h1 class="text-5xl font-bold -mt-2">
  Visually centered
</h1>
```

### 9.2 Button Icon Alignment

```html
<!-- Icon in button appears too low -->
<button class="flex items-center gap-2 px-6 py-3">
  <iconify-icon icon="lucide:check" class="text-lg -mt-px"></iconify-icon>
  <span>Optically aligned</span>
</button>
```

**Guideline:** Use `-mt-px`, `-mb-px`, `-ml-0.5`, `-mr-0.5` for micro-adjustments (1-2px).

---

## 10. Spacing Anti-Patterns

### Never Do

- ❌ Use arbitrary spacing values (prefer scale)
- ❌ Mix spacing units (px, rem, em inconsistently)
- ❌ Ignore responsive spacing (same on all screens)
- ❌ Overcrowd elements (insufficient breathing room)
- ❌ Create excessive whitespace (wasteful, not intentional)
- ❌ Use negative spacing without testing responsiveness
- ❌ Forget touch target sizes on mobile (< 44px)

### Always Do

- ✅ Use predefined spacing scale
- ✅ Test spacing on multiple screen sizes
- ✅ Ensure minimum 44x44px touch targets
- ✅ Use consistent spacing patterns within components
- ✅ Provide generous section spacing (editorial quality)
- ✅ Test optical alignment for icons and text
- ✅ Document custom spacing decisions

---

## 11. Spacing Checklist

Before launching any page:

- [ ] Spacing values from predefined scale (no arbitrary values)
- [ ] Responsive spacing scales appropriately (mobile → desktop)
- [ ] Touch targets ≥ 44x44px on mobile
- [ ] Consistent vertical rhythm (space-y-* utilities)
- [ ] Card grids use appropriate gap spacing
- [ ] Section divisions clear and generous
- [ ] Form fields have adequate spacing
- [ ] Navigation items easily tappable
- [ ] Modal padding comfortable (not cramped)
- [ ] Hero sections have breathing room

---

## 12. Common Spacing Patterns

### 12.1 Profile Card Stack

```html
<div class="space-y-8">
  <div class="bg-white rounded-2xl shadow-[0_4px_16px_rgba(77,0,82,0.12)] overflow-hidden">
    <img src="profile1.jpg" class="w-full h-64 object-cover">
    <div class="p-6 space-y-4">
      <h3 class="text-lg font-semibold">Sarah, 32</h3>
      <p class="text-sm">Lagos, Nigeria</p>
      <button class="w-full py-3">Show Interest</button>
    </div>
  </div>

  <div class="bg-white rounded-2xl shadow-[0_4px_16px_rgba(77,0,82,0.12)] overflow-hidden">
    <img src="profile2.jpg" class="w-full h-64 object-cover">
    <div class="p-6 space-y-4">
      <h3 class="text-lg font-semibold">Michael, 35</h3>
      <p class="text-sm">Accra, Ghana</p>
      <button class="w-full py-3">Show Interest</button>
    </div>
  </div>
</div>
```

**Spacing:**
- Card-to-card: `space-y-8` (32px)
- Internal sections: `space-y-4` (16px)
- Card padding: `p-6` (24px)

### 12.2 Form Layout

```html
<form class="space-y-6">
  <div class="space-y-2">
    <label class="text-sm font-semibold">Display Name</label>
    <input type="text" class="w-full px-4 py-3 border rounded-xl">
    <span class="text-xs">This is how others will see you</span>
  </div>

  <div class="space-y-2">
    <label class="text-sm font-semibold">Email</label>
    <input type="email" class="w-full px-4 py-3 border rounded-xl">
    <span class="text-xs">We'll never share your email</span>
  </div>

  <button class="w-full py-3 bg-[#4D0052] text-white/95 rounded-xl">
    Continue
  </button>
</form>
```

**Spacing:**
- Form sections: `space-y-6` (24px)
- Field group internal: `space-y-2` (8px)
- Input padding: `px-4 py-3` (16px/12px)

### 12.3 Dashboard Layout

```html
<div class="px-12 py-8 space-y-8">
  <h1 class="text-3xl font-semibold">Dashboard</h1>

  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
    <div class="bg-white rounded-2xl p-6 space-y-4">
      <h3 class="text-lg font-semibold">Profile Views</h3>
      <p class="text-4xl font-bold text-[#4D0052]">127</p>
    </div>

    <div class="bg-white rounded-2xl p-6 space-y-4">
      <h3 class="text-lg font-semibold">Matches</h3>
      <p class="text-4xl font-bold text-[#4D0052]">8</p>
    </div>

    <div class="bg-white rounded-2xl p-6 space-y-4">
      <h3 class="text-lg font-semibold">Messages</h3>
      <p class="text-4xl font-bold text-[#4D0052]">12</p>
    </div>
  </div>

  <div class="bg-white rounded-2xl p-6 space-y-6">
    <h2 class="text-xl font-semibold">Recent Activity</h2>
    <ul class="space-y-4">
      <li class="flex items-center gap-4">
        <img src="avatar1.jpg" class="w-12 h-12 rounded-full">
        <div>
          <p class="font-semibold">Sarah viewed your profile</p>
          <p class="text-sm text-[hsla(320,30%,35%,1)]">2 hours ago</p>
        </div>
      </li>
      <li class="flex items-center gap-4">
        <img src="avatar2.jpg" class="w-12 h-12 rounded-full">
        <div>
          <p class="font-semibold">Michael sent Show Interest</p>
          <p class="text-sm text-[hsla(320,30%,35%,1)]">5 hours ago</p>
        </div>
      </li>
    </ul>
  </div>
</div>
```

**Spacing:**
- Page padding: `px-12 py-8` (48px/32px)
- Section spacing: `space-y-8` (32px)
- Card grid gap: `gap-8` (32px)
- Card padding: `p-6` (24px)
- Card internal: `space-y-4` (16px)
- List items: `space-y-4` (16px)

---

## 13. Related Documentation

- [Design System](design_system.md) - Complete design tokens
- [Component Library](component_library.md) - Spacing in components
- [Typography System](typography_system.md) - Text spacing and line height
- [Responsive Design](responsive_design.md) - Responsive spacing patterns

---

**Document Owner:** Design Lead
**Last Reviewed:** 2026-02-26
**Next Review:** 2026-05-26 (Quarterly)
