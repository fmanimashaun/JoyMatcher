# Icon System — JoyMatcher

**Version:** 1.0.0
**Last Updated:** 2026-02-26
**Status:** Complete Reference
**Icon Library:** Lucide via Iconify
**Tailwind CSS Version:** v4.x

---

## 1. Introduction

JoyMatcher uses Lucide icons via Iconify for a refined, consistent visual language. Lucide provides clean, professional icons that align with our sophisticated, trust-based aesthetic.

### Design Philosophy

Our icons convey:
- **Clarity** — Instantly recognizable, unambiguous meaning
- **Professionalism** — Clean lines, refined aesthetic
- **Consistency** — Uniform stroke width and style
- **Accessibility** — Always paired with text or ARIA labels
- **Brand Alignment** — Simple, elegant, not playful

### Core Principles

1. **Lucide Only** — Single icon library for consistency
2. **Centered in Containers** — Icons in square containers matching icon size
3. **Font Size Control** — Use Tailwind text sizing for icon dimensions
4. **Semantic Usage** — Icons reinforce meaning, never replace text
5. **Accessible** — Always provide context for screen readers

---

## 2. Icon Library: Lucide via Iconify

### 2.1 Why Lucide?

- **Professional aesthetic** — Clean, refined strokes
- **Comprehensive set** — 1000+ icons covering all use cases
- **Consistent design** — Uniform stroke width (2px default)
- **Open source** — MIT license, actively maintained
- **Iconify CDN** — Fast loading, no bundling needed

### 2.2 Implementation

```html
<!-- Include Iconify script once -->
<script src="https://code.iconify.design/iconify-icon/1.0.7/iconify-icon.min.js"></script>

<!-- Use icon -->
<iconify-icon icon="lucide:heart"></iconify-icon>
```

**Prefix:** All Lucide icons use `lucide:` prefix.

---

## 3. Icon Sizing

### 3.1 Size Scale

Use Tailwind's font size utilities to control icon dimensions:

| Size Name | Tailwind Class | Pixel Size | Usage |
|-----------|----------------|------------|-------|
| Extra Small | `text-xs` | 12px | Small badges, inline indicators |
| Small | `text-sm` | 14px | Compact UI, small labels |
| Base | `text-base` | 16px | Default UI icons, inline icons |
| Large | `text-lg` | 18px | Emphasized icons, card icons |
| Extra Large | `text-xl` | 20px | Large interactive icons, buttons |
| 2XL | `text-2xl` | 24px | Feature icons, section headers |
| 3XL | `text-3xl` | 30px | Hero icons, major features |
| 4XL | `text-4xl` | 36px | Spotlight features |
| 5XL | `text-5xl` | 48px | Hero sections, empty states |

### 3.2 Standard Sizing Examples

```html
<!-- Small icon (14px) -->
<iconify-icon icon="lucide:info" class="text-sm"></iconify-icon>

<!-- Base icon (16px) - default for UI -->
<iconify-icon icon="lucide:heart" class="text-base"></iconify-icon>

<!-- Large icon (18px) - emphasized -->
<iconify-icon icon="lucide:check-circle" class="text-lg"></iconify-icon>

<!-- Extra large icon (20px) - buttons -->
<iconify-icon icon="lucide:settings" class="text-xl"></iconify-icon>

<!-- 2XL icon (24px) - feature icons -->
<iconify-icon icon="lucide:shield-check" class="text-2xl"></iconify-icon>

<!-- 3XL icon (30px) - section headers -->
<iconify-icon icon="lucide:crown" class="text-3xl"></iconify-icon>
```

---

## 4. Icon Container Pattern

**Critical:** Always center icons in square containers matching icon size.

### 4.1 Standard Container

```html
<!-- Container matches icon size -->
<div class="flex items-center justify-center bg-transparent w-5 h-5">
  <iconify-icon icon="lucide:heart" class="text-base"></iconify-icon>
</div>
```

**Size mapping:**
- `text-sm` (14px) → Container: `w-3.5 h-3.5` (14px)
- `text-base` (16px) → Container: `w-4 h-4` (16px) or `w-5 h-5` (20px)
- `text-lg` (18px) → Container: `w-5 h-5` (20px)
- `text-xl` (20px) → Container: `w-6 h-6` (24px)
- `text-2xl` (24px) → Container: `w-8 h-8` (32px)

**Guideline:** Container should be slightly larger than icon for visual breathing room.

### 4.2 Icon with Background

```html
<!-- Icon with colored background -->
<div class="flex items-center justify-center bg-[#4D0052]/10 w-10 h-10 rounded-lg">
  <iconify-icon icon="lucide:check-circle" class="text-xl text-[#4D0052]"></iconify-icon>
</div>

<!-- Circular background -->
<div class="flex items-center justify-center bg-[#E8E4F0] w-12 h-12 rounded-full">
  <iconify-icon icon="lucide:star" class="text-2xl text-[#8B7AA8]"></iconify-icon>
</div>
```

---

## 5. Icon Colors

### 5.1 Text Colors

Icons inherit text color by default. Use standard text color utilities:

```html
<!-- Primary text color -->
<iconify-icon icon="lucide:heart" class="text-base text-[hsla(320,50%,15%,1)]"></iconify-icon>

<!-- Secondary text color -->
<iconify-icon icon="lucide:map-pin" class="text-base text-[hsla(320,30%,35%,1)]"></iconify-icon>

<!-- Tertiary text color -->
<iconify-icon icon="lucide:clock" class="text-base text-[hsla(320,20%,55%,1)]"></iconify-icon>

<!-- Brand purple -->
<iconify-icon icon="lucide:check-circle" class="text-lg text-[#4D0052]"></iconify-icon>

<!-- Accent coral -->
<iconify-icon icon="lucide:heart" class="text-lg text-[#F16A6F]"></iconify-icon>

<!-- On dark backgrounds -->
<iconify-icon icon="lucide:crown" class="text-xl text-white/95"></iconify-icon>
```

### 5.2 Functional Colors

```html
<!-- Success (verified) -->
<iconify-icon icon="lucide:check-circle" class="text-lg text-[#8B7AA8]"></iconify-icon>

<!-- Error (declined) -->
<iconify-icon icon="lucide:x-circle" class="text-lg text-[#F16A6F]"></iconify-icon>

<!-- Warning (alert) -->
<iconify-icon icon="lucide:alert-triangle" class="text-lg text-[#E8A87C]"></iconify-icon>

<!-- Info (neutral) -->
<iconify-icon icon="lucide:info" class="text-lg text-[#5B4A8E]"></iconify-icon>
```

---

## 6. Common Icon Use Cases

### 6.1 Inline Icons (Text + Icon)

```html
<!-- Icon before text -->
<div class="flex items-center gap-2">
  <iconify-icon icon="lucide:map-pin" class="text-base text-[hsla(320,30%,35%,1)]"></iconify-icon>
  <span class="text-sm text-[hsla(320,30%,35%,1)]">Lagos, Nigeria</span>
</div>

<!-- Icon after text -->
<div class="flex items-center gap-2">
  <span class="text-base text-[#4D0052]">Learn more</span>
  <iconify-icon icon="lucide:external-link" class="text-base text-[#4D0052]"></iconify-icon>
</div>
```

**Spacing:** `gap-2` (8px) for inline icon-text pairs.

### 6.2 Button Icons

```html
<!-- Button with leading icon -->
<button class="flex items-center gap-2 bg-[#4D0052] text-white/95 px-6 py-3 rounded-xl">
  <iconify-icon icon="lucide:heart" class="text-lg"></iconify-icon>
  <span class="font-semibold">Show Interest</span>
</button>

<!-- Button with trailing icon -->
<button class="flex items-center gap-2 text-[#4D0052] px-4 py-2">
  <span>Continue</span>
  <iconify-icon icon="lucide:arrow-right" class="text-base"></iconify-icon>
</button>

<!-- Icon-only button -->
<button class="flex items-center justify-center w-10 h-10 rounded-lg hover:bg-[#4D0052]/5 transition" aria-label="Settings">
  <iconify-icon icon="lucide:settings" class="text-xl text-[hsla(320,30%,35%,1)]"></iconify-icon>
</button>
```

**Icon Size in Buttons:**
- Standard buttons: `text-lg` (18px)
- Small buttons: `text-base` (16px)
- Large buttons: `text-xl` (20px)
- Icon-only: `text-xl` (20px)

**Accessibility:** Always include `aria-label` for icon-only buttons.

### 6.3 Status Badges

```html
<!-- Verified badge -->
<span class="inline-flex items-center gap-1 px-3 py-1 bg-[#E8E4F0] text-[#8B7AA8] rounded-full text-sm font-semibold">
  <iconify-icon icon="lucide:check-circle" class="text-base"></iconify-icon>
  Verified
</span>

<!-- Premium badge -->
<span class="inline-flex items-center gap-1 px-3 py-1 bg-[#E5E0F5] text-[#5B4A8E] rounded-full text-sm font-semibold">
  <iconify-icon icon="lucide:star" class="text-base"></iconify-icon>
  Premium
</span>

<!-- Declined badge -->
<span class="inline-flex items-center gap-1 px-3 py-1 bg-[#FFE8E9] text-[#F16A6F] rounded-full text-sm font-semibold">
  <iconify-icon icon="lucide:x-circle" class="text-base"></iconify-icon>
  Declined
</span>
```

### 6.4 Navigation Icons

```html
<!-- Sidebar navigation with icons -->
<nav class="space-y-2">
  <a href="/dashboard" class="flex items-center gap-3 px-4 py-3 bg-[#4D0052]/10 text-[#4D0052] font-semibold rounded-lg">
    <iconify-icon icon="lucide:layout-dashboard" class="text-xl"></iconify-icon>
    <span>Dashboard</span>
  </a>

  <a href="/discover" class="flex items-center gap-3 px-4 py-3 text-[hsla(320,30%,35%,1)] hover:bg-[#4D0052]/5 rounded-lg transition">
    <iconify-icon icon="lucide:search" class="text-xl"></iconify-icon>
    <span>Discover</span>
  </a>

  <a href="/matches" class="flex items-center gap-3 px-4 py-3 text-[hsla(320,30%,35%,1)] hover:bg-[#4D0052]/5 rounded-lg transition">
    <iconify-icon icon="lucide:heart" class="text-xl"></iconify-icon>
    <span>Matches</span>
  </a>
</nav>
```

### 6.5 Alert Icons

```html
<!-- Success alert -->
<div class="flex items-start gap-3 p-4 bg-[#E8E4F0] border-l-4 border-l-[#8B7AA8] rounded-lg">
  <iconify-icon icon="lucide:check-circle" class="text-xl text-[#8B7AA8] flex-shrink-0 mt-0.5"></iconify-icon>
  <div>
    <p class="text-sm font-semibold text-[#8B7AA8]">Success</p>
    <p class="text-sm text-[hsla(320,30%,35%,1)]">Your profile has been updated.</p>
  </div>
</div>

<!-- Error alert -->
<div class="flex items-start gap-3 p-4 bg-[#FFE8E9] border-l-4 border-l-[#F16A6F] rounded-lg">
  <iconify-icon icon="lucide:x-circle" class="text-xl text-[#F16A6F] flex-shrink-0 mt-0.5"></iconify-icon>
  <div>
    <p class="text-sm font-semibold text-[#F16A6F]">Error</p>
    <p class="text-sm text-[hsla(320,30%,35%,1)]">Failed to save changes.</p>
  </div>
</div>

<!-- Warning alert -->
<div class="flex items-start gap-3 p-4 bg-[#FFF4E6] border-l-4 border-l-[#E8A87C] rounded-lg">
  <iconify-icon icon="lucide:alert-triangle" class="text-xl text-[#E8A87C] flex-shrink-0 mt-0.5"></iconify-icon>
  <div>
    <p class="text-sm font-semibold text-[#E8A87C]">Warning</p>
    <p class="text-sm text-[hsla(320,30%,35%,1)]">Your subscription expires soon.</p>
  </div>
</div>
```

**Note:** `flex-shrink-0` prevents icon from shrinking, `mt-0.5` aligns icon with text baseline.

### 6.6 Feature Icons

```html
<!-- Feature with large icon -->
<div class="flex flex-col items-center gap-4 text-center">
  <div class="flex items-center justify-center w-16 h-16 bg-[#4D0052]/10 rounded-xl">
    <iconify-icon icon="lucide:shield-check" class="text-4xl text-[#4D0052]"></iconify-icon>
  </div>
  <h3 class="text-lg font-semibold">Verified Profiles</h3>
  <p class="text-sm text-[hsla(320,30%,35%,1)]">All users undergo identity verification</p>
</div>
```

---

## 7. Icon Library Reference

### 7.1 Core UI Icons

| Icon | Iconify Name | Usage |
|------|--------------|-------|
| ❤️ | `lucide:heart` | Show Interest, Matches, Favorites |
| 👤 | `lucide:user` | Profile, Account |
| ⚙️ | `lucide:settings` | Settings, Preferences |
| 🔔 | `lucide:bell` | Notifications |
| 💬 | `lucide:message-circle` | Messages, Chat |
| 🔍 | `lucide:search` | Search, Discover |
| ✓ | `lucide:check` | Confirm, Success |
| ✕ | `lucide:x` | Close, Cancel, Decline |
| ⚠️ | `lucide:alert-triangle` | Warning, Caution |
| ℹ️ | `lucide:info` | Information, Help |
| 📍 | `lucide:map-pin` | Location |
| 💼 | `lucide:briefcase` | Occupation, Work |
| 🏠 | `lucide:home` | Home, Dashboard |
| ➜ | `lucide:arrow-right` | Continue, Next |
| ⬅️ | `lucide:arrow-left` | Back, Previous |
| ⬆️ | `lucide:chevron-up` | Expand, More |
| ⬇️ | `lucide:chevron-down` | Collapse, Dropdown |

### 7.2 Status & Verification Icons

| Icon | Iconify Name | Usage |
|------|--------------|-------|
| ✓ | `lucide:check-circle` | Verified, Completed |
| ✕ | `lucide:x-circle` | Declined, Failed |
| ⏱️ | `lucide:clock` | Pending, Waiting |
| ⭐ | `lucide:star` | Premium, Featured |
| 👑 | `lucide:crown` | VIP, Exclusive |
| 🛡️ | `lucide:shield-check` | Verified, Secure |
| 🔒 | `lucide:lock` | Locked, Premium Required |
| 🔓 | `lucide:unlock` | Unlocked, Accessible |

### 7.3 Action Icons

| Icon | Iconify Name | Usage |
|------|--------------|-------|
| ✏️ | `lucide:edit` | Edit, Modify |
| 🗑️ | `lucide:trash-2` | Delete, Remove |
| ➕ | `lucide:plus` | Add, Create |
| ↗️ | `lucide:external-link` | External link |
| 📤 | `lucide:upload` | Upload |
| 📥 | `lucide:download` | Download |
| 📋 | `lucide:copy` | Copy |
| 🔄 | `lucide:refresh-cw` | Refresh, Reload |
| 👁️ | `lucide:eye` | View, Show |
| 👁️‍🗨️ | `lucide:eye-off` | Hide, Hidden |

### 7.4 Social & Profile Icons

| Icon | Iconify Name | Usage |
|------|--------------|-------|
| 🎂 | `lucide:cake` | Birthday, Age |
| 📚 | `lucide:book-open` | Education |
| ✝️ | `lucide:church` | Faith, Religion |
| 🏋️ | `lucide:dumbbell` | Fitness, Exercise |
| 🍷 | `lucide:wine` | Alcohol preferences |
| 🚬 | `lucide:cigarette` | Smoking preferences |
| 🧬 | `lucide:dna` | Genotype, Health |
| 🩺 | `lucide:heart-pulse` | Health, Medical |
| 👶 | `lucide:baby` | Children, Family |
| 💍 | `lucide:gem` | Marriage, Relationship |

### 7.5 Navigation & Utility

| Icon | Iconify Name | Usage |
|------|--------------|-------|
| 🏠 | `lucide:layout-dashboard` | Dashboard |
| 📊 | `lucide:bar-chart` | Analytics, Stats |
| 📄 | `lucide:file-text` | Documents, Forms |
| 🔗 | `lucide:link` | Link, Connection |
| 📧 | `lucide:mail` | Email |
| 📞 | `lucide:phone` | Phone |
| 🌐 | `lucide:globe` | Website, Language |
| 📅 | `lucide:calendar` | Date, Schedule |
| ⋮ | `lucide:more-vertical` | More options (vertical) |
| ⋯ | `lucide:more-horizontal` | More options (horizontal) |

---

## 8. Accessibility Guidelines

### 8.1 Always Provide Context

**Never use icons alone without text or ARIA labels.**

```html
<!-- ❌ Bad: Icon without context -->
<button>
  <iconify-icon icon="lucide:settings"></iconify-icon>
</button>

<!-- ✅ Good: Icon with visible text -->
<button class="flex items-center gap-2">
  <iconify-icon icon="lucide:settings" class="text-xl"></iconify-icon>
  <span>Settings</span>
</button>

<!-- ✅ Good: Icon with aria-label -->
<button aria-label="Settings">
  <iconify-icon icon="lucide:settings" class="text-xl"></iconify-icon>
</button>
```

### 8.2 Decorative vs Functional Icons

**Decorative icons** (paired with text) don't need ARIA labels:

```html
<!-- Icon is decorative (text provides context) -->
<a href="/profile" class="flex items-center gap-2">
  <iconify-icon icon="lucide:user" class="text-base"></iconify-icon>
  <span>View Profile</span>
</a>
```

**Functional icons** (standalone) require ARIA labels:

```html
<!-- Icon is functional (no text) -->
<button aria-label="Close modal" class="flex items-center justify-center w-10 h-10">
  <iconify-icon icon="lucide:x" class="text-xl"></iconify-icon>
</button>
```

### 8.3 Color + Icon (Not Color Alone)

Never use color alone to convey status—always pair with icon:

```html
<!-- ✅ Good: Color + Icon + Text -->
<div class="flex items-center gap-2">
  <iconify-icon icon="lucide:check-circle" class="text-lg text-[#8B7AA8]"></iconify-icon>
  <span class="text-sm text-[#8B7AA8]">Verified</span>
</div>

<!-- ❌ Bad: Color alone (inaccessible to colorblind users) -->
<span class="text-sm text-[#8B7AA8]">Verified</span>
```

### 8.4 Sufficient Size for Touch

Icons must be at least 44x44px for touch targets:

```html
<!-- ✅ Good: 44x44px touch target -->
<button class="w-11 h-11 flex items-center justify-center" aria-label="Favorite">
  <iconify-icon icon="lucide:heart" class="text-xl"></iconify-icon>
</button>

<!-- ❌ Bad: Too small for touch -->
<button class="w-6 h-6 flex items-center justify-center" aria-label="Favorite">
  <iconify-icon icon="lucide:heart" class="text-base"></iconify-icon>
</button>
```

---

## 9. Icon Animation

### 9.1 Hover Effects

```html
<!-- Icon color change on hover -->
<button class="group flex items-center gap-2">
  <iconify-icon icon="lucide:heart" class="text-lg text-[hsla(320,30%,35%,1)] group-hover:text-[#F16A6F] transition-colors"></iconify-icon>
  <span>Show Interest</span>
</button>

<!-- Icon scale on hover -->
<button class="group flex items-center justify-center w-10 h-10">
  <iconify-icon icon="lucide:settings" class="text-xl group-hover:scale-110 transition-transform"></iconify-icon>
</button>
```

### 9.2 Loading Spinner

```html
<!-- Spinner icon -->
<div class="flex items-center gap-2">
  <iconify-icon icon="lucide:loader-2" class="text-xl animate-spin"></iconify-icon>
  <span>Loading...</span>
</div>
```

### 9.3 Pulsing Icon

```html
<!-- Notification pulse -->
<button class="relative">
  <iconify-icon icon="lucide:bell" class="text-xl"></iconify-icon>
  <span class="absolute -top-1 -right-1 w-3 h-3 bg-[#F16A6F] rounded-full animate-ping"></span>
</button>
```

---

## 10. Third-Party Brand Logos

Use Iconify brand icons for social logins and integrations:

```html
<!-- Google logo (colored) -->
<iconify-icon icon="logos:google-icon" class="text-2xl"></iconify-icon>

<!-- Facebook logo (colored) -->
<iconify-icon icon="logos:facebook" class="text-2xl"></iconify-icon>

<!-- LinkedIn logo (colored) -->
<iconify-icon icon="logos:linkedin-icon" class="text-2xl"></iconify-icon>

<!-- X/Twitter (monochrome) -->
<iconify-icon icon="simple-icons:x" class="text-2xl"></iconify-icon>

<!-- Instagram (colored) -->
<iconify-icon icon="logos:instagram-icon" class="text-2xl"></iconify-icon>
```

**Prefixes:**
- `logos:` — Full-color brand logos
- `simple-icons:` — Monochrome brand icons

---

## 11. Icon System Don'ts

### Never Do

- ❌ Use icons alone without text or ARIA labels
- ❌ Mix icon libraries (stick to Lucide only)
- ❌ Use icons smaller than 16px (readability)
- ❌ Use color alone to convey meaning
- ❌ Make touch targets smaller than 44x44px
- ❌ Use complex, detailed icons (prefer simple)
- ❌ Forget to center icons in containers
- ❌ Use inconsistent icon sizes within components

### Always Do

- ✅ Use Lucide icons via Iconify
- ✅ Center icons in square containers
- ✅ Size icons with Tailwind font classes
- ✅ Provide ARIA labels for standalone icons
- ✅ Pair color with icon for status indicators
- ✅ Test icon touch targets on mobile
- ✅ Use semantic icon names (heart, check, x)
- ✅ Maintain consistent icon sizing across pages

---

## 12. Icon Checklist

Before launching any page:

- [ ] All icons from Lucide library
- [ ] Icons centered in appropriate containers
- [ ] Icon sizes use Tailwind font classes
- [ ] Standalone icons have ARIA labels
- [ ] Touch targets ≥ 44x44px on mobile
- [ ] Status indicators use icon + color + text
- [ ] Icon colors match text color hierarchy
- [ ] Hover states provide clear feedback
- [ ] Loading states use spinner icon
- [ ] No mixed icon libraries

---

## 13. Related Documentation

- [Design System](design_system.md) - Complete design tokens
- [Component Library](component_library.md) - Icons in components
- [Accessibility Patterns](accessibility_patterns.md) - WCAG compliance
- [Color System](color_system.md) - Icon color usage

---

**Document Owner:** Design Lead
**Last Reviewed:** 2026-02-26
**Next Review:** 2026-05-26 (Quarterly)
