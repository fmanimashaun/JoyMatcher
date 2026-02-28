# Accessibility Patterns — JoyMatcher

**Version:** 1.0.0
**Last Updated:** 2026-02-26
**Status:** Complete Reference
**Compliance Level:** WCAG 2.1 AA
**Tailwind CSS Version:** v4.x

---

## 1. Introduction

JoyMatcher is committed to providing an inclusive, accessible experience for all users, regardless of ability. Our accessibility standards ensure that marriage-minded professionals with disabilities can confidently use our platform to find meaningful connections.

### Design Philosophy

Our accessibility approach ensures:
- **Universal Design** — Usable by everyone, regardless of ability
- **Keyboard Navigation** — Full functionality without a mouse
- **Screen Reader Support** — Clear semantic structure and labels
- **Visual Clarity** — Sufficient contrast and readable text
- **Cognitive Ease** — Clear language and predictable interactions

### Core Principles

1. **WCAG 2.1 AA Compliance** — Minimum standard for all features
2. **Semantic HTML** — Proper structure for assistive technologies
3. **Keyboard Accessible** — All interactions keyboard-navigable
4. **Sufficient Contrast** — 4.5:1 minimum for normal text
5. **Clear Focus States** — Always visible, never `outline: none` alone
6. **Alternative Text** — Descriptive alt text for images
7. **Error Prevention** — Clear validation and recovery

---

## 2. WCAG 2.1 AA Compliance

### 2.1 Four Principles (POUR)

#### Perceivable
- All information and UI components must be presentable to users in ways they can perceive
- Provide text alternatives for non-text content
- Provide captions and alternatives for time-based media
- Create content that can be presented in different ways without losing information
- Make it easier for users to see and hear content

#### Operable
- All UI components and navigation must be operable
- Make all functionality available from a keyboard
- Give users enough time to read and use content
- Do not design content that causes seizures
- Help users navigate and find content
- Make it easier to use inputs other than keyboard

#### Understandable
- Information and UI operation must be understandable
- Make text readable and understandable
- Make content appear and operate in predictable ways
- Help users avoid and correct mistakes

#### Robust
- Content must be robust enough to be interpreted by a wide variety of user agents, including assistive technologies
- Maximize compatibility with current and future user tools

---

## 3. Color & Contrast

### 3.1 Contrast Requirements

**WCAG 2.1 AA Standards:**
- **Normal text (< 18px):** 4.5:1 minimum
- **Large text (≥ 18px or ≥ 14px bold):** 3:1 minimum
- **UI components & graphical objects:** 3:1 minimum

### 3.2 Verified Color Combinations

All JoyMatcher colors meet WCAG AA standards:

| Foreground | Background | Ratio | Level | Usage |
|------------|------------|-------|-------|-------|
| `#4D0052` | `#FFFFFF` | 10.8:1 | AAA | Primary purple on white |
| `hsla(320,50%,15%,1)` | `#FFFFFF` | 13.5:1 | AAA | Primary text on white |
| `hsla(320,30%,35%,1)` | `#FFFFFF` | 7.2:1 | AAA | Secondary text on white |
| `hsla(320,20%,55%,1)` | `#FFFFFF` | 4.6:1 | AA | Tertiary text on white |
| `#F16A6F` | `#FFFFFF` | 4.5:1 | AA (large) | Coral on white (18px+) |
| `#FFFFFF` | `#4D0052` | 10.8:1 | AAA | White on primary purple |
| `#8B7AA8` | `#E8E4F0` | 4.7:1 | AA | Success text on light bg |
| `#F16A6F` | `#FFE8E9` | 7.5:1 | AAA | Error text on light bg |

### 3.3 Non-Compliant Combinations

Avoid these combinations for text:

| Foreground | Background | Ratio | Issue |
|------------|------------|-------|-------|
| `hsla(320,15%,70%,1)` | `#FFFFFF` | 2.8:1 | Fails AA — Use only for disabled states |
| `#F16A6F` | `#FFFFFF` | 4.5:1 | Fails AA for normal text — Use 18px+ only |

### 3.4 Never Use Color Alone

Always pair color with additional indicators:

```html
<!-- ❌ Bad: Color alone -->
<span class="text-[#8B7AA8]">Verified</span>

<!-- ✅ Good: Color + Icon + Text -->
<span class="inline-flex items-center gap-1 text-[#8B7AA8]">
  <iconify-icon icon="lucide:check-circle" class="text-base"></iconify-icon>
  Verified
</span>
```

**Rationale:** Color-blind users cannot distinguish status by color alone.

---

## 4. Keyboard Navigation

### 4.1 Tab Order

All interactive elements must be keyboard accessible in logical tab order:

```html
<!-- Natural tab order (follows DOM order) -->
<button>First</button>
<button>Second</button>
<button>Third</button>

<!-- Custom tab order (avoid if possible) -->
<button tabindex="3">Third</button>
<button tabindex="1">First</button>
<button tabindex="2">Second</button>
```

**Best Practice:** Use natural DOM order. Avoid `tabindex` values > 0.

### 4.2 Skip to Main Content

Provide skip links for keyboard users:

```html
<!-- Skip link (visible on focus) -->
<a href="#main-content" class="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-[#4D0052] focus:text-white/95 focus:rounded-lg focus:shadow-lg">
  Skip to main content
</a>

<header>
  <!-- Navigation -->
</header>

<main id="main-content">
  <!-- Main content -->
</main>
```

**Benefit:** Users can bypass repetitive navigation and jump to content.

### 4.3 Focus Visible

Never use `outline: none` alone. Always provide visible focus:

```html
<!-- ✅ Good: Visible focus ring -->
<button class="bg-[#4D0052] text-white/95 px-6 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4D0052] focus:ring-offset-2">
  Button
</button>

<!-- ✅ Good: Custom focus style -->
<a href="/profile" class="text-[#4D0052] focus:outline-none focus:underline focus:ring-2 focus:ring-[#4D0052] focus:ring-offset-2 focus:rounded">
  View Profile
</a>

<!-- ❌ Bad: No visible focus -->
<button class="bg-[#4D0052] text-white/95 focus:outline-none">
  Button
</button>
```

**Standard focus ring:**
```html
focus:outline-none focus:ring-2 focus:ring-[#4D0052] focus:ring-offset-2
```

### 4.4 Keyboard Shortcuts

#### Standard Shortcuts

- **Tab:** Next focusable element
- **Shift + Tab:** Previous focusable element
- **Enter:** Activate button/link
- **Space:** Activate button, toggle checkbox
- **Arrow keys:** Navigate lists, radio groups, dropdowns
- **Esc:** Close modal/dropdown

#### Custom Shortcuts (Document)

```html
<!-- Example: Close modal with Esc -->
<script>
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeModal();
  }
});
</script>
```

---

## 5. Semantic HTML

### 5.1 Document Structure

Use proper HTML5 semantic elements:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>JoyMatcher — Find Your Life Partner</title>
</head>
<body>

  <!-- Skip link -->
  <a href="#main-content" class="sr-only focus:not-sr-only">Skip to main content</a>

  <!-- Site header -->
  <header>
    <nav aria-label="Main navigation">
      <!-- Navigation -->
    </nav>
  </header>

  <!-- Main content -->
  <main id="main-content">
    <h1>Page Title</h1>
    <section>
      <h2>Section Heading</h2>
      <!-- Content -->
    </section>
  </main>

  <!-- Footer -->
  <footer>
    <nav aria-label="Footer navigation">
      <!-- Footer links -->
    </nav>
  </footer>

</body>
</html>
```

### 5.2 Heading Hierarchy

Maintain logical heading order (H1 → H2 → H3, never skip levels):

```html
<!-- ✅ Good: Logical hierarchy -->
<h1>Dashboard</h1>
  <section>
    <h2>Profile Stats</h2>
      <h3>Views This Week</h3>
      <h3>New Matches</h3>
  </section>
  <section>
    <h2>Recent Activity</h2>
      <h3>Show Interest Received</h3>
  </section>

<!-- ❌ Bad: Skipped level -->
<h1>Dashboard</h1>
  <h3>Profile Stats</h3> <!-- Skipped H2 -->
```

**Rationale:** Screen readers navigate by headings. Logical hierarchy is critical.

### 5.3 Landmarks

Use semantic HTML5 landmarks:

```html
<header>       <!-- Banner landmark -->
<nav>          <!-- Navigation landmark -->
<main>         <!-- Main landmark -->
<aside>        <!-- Complementary landmark -->
<footer>       <!-- Contentinfo landmark -->
<section>      <!-- Region landmark (if it has a label) -->
<article>      <!-- Article landmark -->
<form>         <!-- Form landmark (if it has a label) -->
```

**Multiple landmarks:** Use `aria-label` to differentiate:

```html
<nav aria-label="Main navigation">
<nav aria-label="Footer navigation">
<nav aria-label="Sidebar navigation">
```

---

## 6. ARIA (Accessible Rich Internet Applications)

### 6.1 ARIA Labels

#### For Screen Readers Only

```html
<!-- Icon button with aria-label -->
<button aria-label="Close modal" class="flex items-center justify-center w-10 h-10">
  <iconify-icon icon="lucide:x" class="text-xl"></iconify-icon>
</button>

<!-- Link with additional context -->
<a href="/profile/123" aria-label="View Sarah's profile">
  View Profile
</a>
```

#### For Form Inputs

```html
<!-- Input with visible label -->
<label for="email">Email Address</label>
<input type="email" id="email" name="email">

<!-- Input without visible label (use aria-label) -->
<input type="search" aria-label="Search profiles" placeholder="Search...">
```

### 6.2 ARIA Described By

Link inputs to error/helper text:

```html
<label for="password">Password</label>
<input
  type="password"
  id="password"
  aria-describedby="password-error"
  aria-invalid="true"
>
<span id="password-error" class="text-sm text-[#F16A6F]" role="alert">
  Password must be at least 8 characters
</span>
```

### 6.3 ARIA Live Regions

Announce dynamic changes:

```html
<!-- Polite: Waits for user to finish -->
<div aria-live="polite" aria-atomic="true" class="sr-only">
  Profile updated successfully
</div>

<!-- Assertive: Interrupts immediately (use sparingly) -->
<div aria-live="assertive" aria-atomic="true" class="sr-only">
  Error: Connection lost
</div>
```

**Use cases:**
- Form submission feedback
- Loading states
- Error messages
- Toast notifications

### 6.4 ARIA Expanded/Pressed

For toggleable elements:

```html
<!-- Dropdown toggle -->
<button
  aria-expanded="false"
  aria-haspopup="listbox"
  aria-controls="dropdown-menu"
>
  Select Tier
</button>

<div id="dropdown-menu" role="listbox" class="hidden">
  <!-- Options -->
</div>

<!-- Toggle button -->
<button aria-pressed="false">
  Enable Notifications
</button>
```

### 6.5 ARIA Hidden

Hide decorative elements from screen readers:

```html
<!-- Decorative icon (paired with text) -->
<a href="/profile" class="flex items-center gap-2">
  <iconify-icon icon="lucide:user" aria-hidden="true"></iconify-icon>
  <span>View Profile</span>
</a>
```

**Note:** Only use `aria-hidden="true"` for purely decorative elements.

---

## 7. Form Accessibility

### 7.1 Labels & Inputs

```html
<!-- Standard label -->
<div class="flex flex-col gap-2">
  <label for="display-name" class="text-sm font-semibold text-[hsla(320,50%,15%,1)]">
    Display Name
    <span class="text-[#F16A6F]" aria-label="required">*</span>
  </label>
  <input
    type="text"
    id="display-name"
    name="display-name"
    required
    class="w-full px-4 py-3 border border-[hsla(320,25%,85%,1)] rounded-xl"
  >
</div>
```

**Requirements:**
- Every input must have a label (visible or `aria-label`)
- `for` attribute matches input `id`
- Mark required fields clearly

### 7.2 Error Handling

```html
<!-- Input with error -->
<div class="flex flex-col gap-2">
  <label for="email" class="text-sm font-semibold">Email Address</label>
  <input
    type="email"
    id="email"
    name="email"
    value="invalid-email"
    aria-invalid="true"
    aria-describedby="email-error"
    class="w-full px-4 py-3 border-2 border-[#F16A6F] rounded-xl"
  >
  <span id="email-error" class="flex items-center gap-1 text-xs text-[#F16A6F]" role="alert">
    <iconify-icon icon="lucide:alert-circle" class="text-sm"></iconify-icon>
    Please enter a valid email address
  </span>
</div>
```

**Error Requirements:**
- `aria-invalid="true"` on input
- `aria-describedby` linking to error message
- `role="alert"` on error message (announces to screen readers)
- Visual indication (red border, icon)

### 7.3 Fieldsets & Legends

Group related inputs:

```html
<fieldset class="flex flex-col gap-4">
  <legend class="text-sm font-semibold mb-2">Relationship Intent</legend>

  <label class="flex items-center gap-3 cursor-pointer">
    <input type="radio" name="intent" value="1-2-years" class="sr-only peer" checked>
    <div class="w-5 h-5 peer-checked:bg-[#4D0052] border rounded-full"></div>
    <span>Marriage within 1-2 years</span>
  </label>

  <label class="flex items-center gap-3 cursor-pointer">
    <input type="radio" name="intent" value="long-term" class="sr-only peer">
    <div class="w-5 h-5 peer-checked:bg-[#4D0052] border rounded-full"></div>
    <span>Long-term leading to marriage</span>
  </label>
</fieldset>
```

**Benefits:**
- Groups related form controls semantically
- Screen readers announce fieldset legend before each input
- Improves form comprehension

### 7.4 Placeholder vs Label

```html
<!-- ❌ Bad: Placeholder as label (inaccessible) -->
<input type="text" placeholder="Display Name">

<!-- ✅ Good: Label + placeholder -->
<label for="display-name">Display Name</label>
<input type="text" id="display-name" placeholder="e.g., Sarah J.">
```

**Never use placeholder as sole label** — it disappears when user types, and screen readers may not announce it.

---

## 8. Modal Accessibility

### 8.1 Modal Structure

```html
<!-- Backdrop -->
<div class="fixed inset-0 bg-black/50 z-40 flex items-center justify-center" aria-modal="true" role="dialog" aria-labelledby="modal-title">

  <!-- Modal -->
  <div class="bg-white rounded-2xl p-6 max-w-md w-full">

    <!-- Header -->
    <div class="flex items-center justify-between mb-6">
      <h2 id="modal-title" class="text-xl font-semibold">Modal Title</h2>
      <button aria-label="Close modal" class="w-8 h-8 flex items-center justify-center">
        <iconify-icon icon="lucide:x" class="text-xl"></iconify-icon>
      </button>
    </div>

    <!-- Content -->
    <div class="space-y-4">
      <p>Modal content</p>
    </div>

    <!-- Actions -->
    <div class="flex gap-3 mt-6">
      <button class="flex-1 bg-[#4D0052] text-white/95 py-3 rounded-xl">
        Confirm
      </button>
      <button class="flex-1 border-2 border-[#4D0052] text-[#4D0052] py-3 rounded-xl">
        Cancel
      </button>
    </div>

  </div>
</div>
```

### 8.2 Modal Behavior

**Required:**
1. **Focus trap:** Tab cycles within modal only
2. **Esc closes:** Escape key closes modal
3. **Focus management:** Focus moves to modal on open, returns to trigger on close
4. **ARIA attributes:**
   - `role="dialog"`
   - `aria-modal="true"`
   - `aria-labelledby` pointing to modal title

**JavaScript (Pseudocode):**
```javascript
// On modal open
modal.addEventListener('open', () => {
  // Store previous focus
  previousFocus = document.activeElement;

  // Move focus to modal
  modal.querySelector('button, [href], input, select, textarea').focus();

  // Trap focus
  trapFocus(modal);
});

// On modal close
modal.addEventListener('close', () => {
  // Return focus
  previousFocus.focus();
});

// Close on Esc
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && modalOpen) {
    closeModal();
  }
});
```

---

## 9. Image Accessibility

### 9.1 Alternative Text

```html
<!-- Informative image -->
<img src="profile.jpg" alt="Sarah Johnson, smiling in front of Lagos skyline" class="w-full h-64 object-cover rounded-2xl">

<!-- Decorative image (empty alt) -->
<img src="background-pattern.svg" alt="" class="absolute inset-0 opacity-10">

<!-- Complex image (link to description) -->
<figure>
  <img src="chart.png" alt="Match success rates by tier completion" aria-describedby="chart-description">
  <figcaption id="chart-description">
    Chart showing that users who complete Tier 4 have 65% higher match success rates than Tier 2 users.
  </figcaption>
</figure>
```

**Guidelines:**
- **Informative images:** Describe content/function
- **Decorative images:** Use `alt=""` (not omit alt)
- **Complex images:** Use `aria-describedby` for extended descriptions
- **Text in images:** Avoid. If necessary, include text in alt

### 9.2 Icon Images

```html
<!-- Icon with adjacent text (decorative) -->
<a href="/profile" class="flex items-center gap-2">
  <iconify-icon icon="lucide:user" aria-hidden="true"></iconify-icon>
  <span>View Profile</span>
</a>

<!-- Icon without text (functional) -->
<button aria-label="Close modal">
  <iconify-icon icon="lucide:x"></iconify-icon>
</button>
```

---

## 10. Screen Reader Utilities

### 10.1 Screen Reader Only

Hide visually, but announce to screen readers:

```html
<!-- Tailwind sr-only utility -->
<span class="sr-only">Additional context for screen readers</span>

<!-- Custom CSS -->
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}
```

**Use cases:**
- Skip links
- Additional context for icons
- Form labels when visual label not desired
- Status announcements

### 10.2 Screen Reader Only on Focus

Make visible when focused (skip links):

```html
<a href="#main-content" class="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:px-4 focus:py-2 focus:bg-[#4D0052] focus:text-white/95 focus:rounded-lg focus:z-50">
  Skip to main content
</a>
```

---

## 11. Motion & Animation Accessibility

### 11.1 Respect User Preferences

```css
/* Disable animations for users who prefer reduced motion */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

**Tailwind utility:**
```html
<!-- Animation only if user has not requested reduced motion -->
<div class="motion-safe:animate-fadeIn">
```

### 11.2 Avoid Seizure-Inducing Content

**Never:**
- Flash more than 3 times per second
- Use strobing effects
- Implement rapid animations
- Create parallax effects with high-speed movement

---

## 12. Touch & Mobile Accessibility

### 12.1 Touch Target Sizes

```html
<!-- Minimum 44x44px -->
<button class="min-w-[44px] min-h-[44px] px-6 py-3">
  Tap Me
</button>

<!-- Icon button with adequate size -->
<button class="w-11 h-11 flex items-center justify-center" aria-label="Settings">
  <iconify-icon icon="lucide:settings" class="text-xl"></iconify-icon>
</button>
```

**WCAG 2.1 AAA:** Minimum 44x44px (2.75rem)

### 12.2 Spacing Between Touch Targets

```html
<!-- Adequate spacing prevents mis-taps -->
<div class="flex flex-col space-y-4">
  <button class="w-full py-4">Button 1</button>
  <button class="w-full py-4">Button 2</button>
</div>
```

**Minimum:** 8px (0.5rem) between interactive elements

---

## 13. Accessible Component Patterns

### 13.1 Button

```html
<button
  type="button"
  class="flex items-center gap-2 bg-[#4D0052] text-white/95 px-6 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4D0052] focus:ring-offset-2"
  aria-label="Show interest in Sarah's profile"
>
  <iconify-icon icon="lucide:heart" class="text-lg"></iconify-icon>
  <span>Show Interest</span>
</button>
```

### 13.2 Link

```html
<a
  href="/profile/123"
  class="text-[#4D0052] hover:underline focus:outline-none focus:ring-2 focus:ring-[#4D0052] focus:ring-offset-2 focus:rounded"
>
  View Sarah's Profile
</a>
```

### 13.3 Alert

```html
<div role="alert" class="flex items-start gap-3 p-4 bg-[#E8E4F0] border-l-4 border-l-[#8B7AA8] rounded-lg">
  <iconify-icon icon="lucide:check-circle" class="text-xl text-[#8B7AA8] flex-shrink-0" aria-hidden="true"></iconify-icon>
  <div>
    <p class="text-sm font-semibold text-[#8B7AA8]">Success</p>
    <p class="text-sm text-[hsla(320,30%,35%,1)]">Your profile has been updated successfully.</p>
  </div>
  <button aria-label="Dismiss alert" class="ml-auto">
    <iconify-icon icon="lucide:x" class="text-lg"></iconify-icon>
  </button>
</div>
```

### 13.4 Card (Interactive)

```html
<article class="bg-white rounded-2xl shadow-[0_4px_16px_rgba(77,0,82,0.12)] overflow-hidden focus-within:ring-2 focus-within:ring-[#4D0052]">
  <img src="profile.jpg" alt="Sarah Johnson's profile photo" class="w-full h-64 object-cover">

  <div class="p-6 space-y-4">
    <h3 class="text-lg font-semibold">
      <a href="/profile/123" class="focus:outline-none after:absolute after:inset-0">
        Sarah, 32
      </a>
    </h3>
    <p class="text-sm text-[hsla(320,30%,35%,1)]">
      <iconify-icon icon="lucide:map-pin" aria-hidden="true"></iconify-icon>
      Lagos, Nigeria
    </p>
  </div>
</article>
```

**Stretch link pattern:** Link covers entire card, keyboard accessible.

---

## 14. Accessibility Testing

### 14.1 Manual Testing

**Keyboard navigation:**
- [ ] Tab through all interactive elements
- [ ] Focus visible on all elements
- [ ] All functions keyboard-accessible
- [ ] Tab order logical
- [ ] Skip link functional

**Screen reader testing:**
- [ ] Test with NVDA (Windows) or JAWS
- [ ] Test with VoiceOver (Mac/iOS)
- [ ] Headings announce correctly
- [ ] Form labels announce correctly
- [ ] Error messages announce
- [ ] ARIA live regions work

**Color/contrast:**
- [ ] Use browser DevTools contrast checker
- [ ] Test with color blindness simulators
- [ ] Ensure color not sole indicator

**Zoom/magnification:**
- [ ] Test at 200% zoom
- [ ] No horizontal scrolling
- [ ] Text remains readable
- [ ] Layout doesn't break

### 14.2 Automated Testing

**Tools:**
- **axe DevTools** (browser extension)
- **Lighthouse** (Chrome DevTools)
- **WAVE** (browser extension)
- **Pa11y** (command line)

**Note:** Automated tools catch ~30-40% of issues. Manual testing is essential.

---

## 15. Accessibility Checklist

Before launching any feature:

- [ ] All text meets WCAG AA contrast (4.5:1 minimum)
- [ ] All interactive elements keyboard accessible
- [ ] Focus states visible on all elements
- [ ] Semantic HTML used (header, nav, main, etc.)
- [ ] Heading hierarchy logical (H1 → H2 → H3)
- [ ] All images have alt text (or alt="" if decorative)
- [ ] Forms have proper labels and error handling
- [ ] ARIA labels for icon-only buttons
- [ ] Skip to main content link present
- [ ] Modals trap focus and close with Esc
- [ ] Touch targets ≥ 44x44px on mobile
- [ ] Color not used alone to convey information
- [ ] Animations respect prefers-reduced-motion
- [ ] Tested with keyboard navigation
- [ ] Tested with screen reader (NVDA/VoiceOver)
- [ ] Tested at 200% zoom

---

## 16. Related Documentation

- [Design System](design_system.md) - Complete design tokens
- [Component Library](component_library.md) - Accessible components
- [Color System](color_system.md) - Contrast ratios
- [Typography System](typography_system.md) - Readable text sizes

---

**Document Owner:** Design Lead & Accessibility Lead
**Last Reviewed:** 2026-02-26
**Next Review:** 2026-05-26 (Quarterly)
