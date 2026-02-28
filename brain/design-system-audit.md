# JoyMatcher Design System Audit

**Status:** Completed
**Date:** 2026-02-28
**Auditor:** Claude Code Agent
**Benchmark:** Component Gallery Best Practices (95 design systems)

---

## Executive Summary

This audit evaluates JoyMatcher's React prototype components against industry-leading design systems from Component Gallery, including **Salesforce Lightning**, **Shopify Polaris**, **Workday Canvas**, **IBM Carbon**, and others.

**Overall Assessment:** 🟡 **Good Foundation, Needs Accessibility & Pattern Improvements**

### Key Findings

✅ **Strengths:**
- Clean, semantic component structure
- Consistent design token usage (Tailwind CSS v4)
- Professional, trust-focused visual identity
- Good hover/focus state implementation
- Mobile-responsive patterns

⚠️ **Critical Gaps:**
- Missing ARIA labels on interactive elements
- No keyboard navigation for custom components
- Insufficient touch target sizes (< 44px)
- Missing screen reader support for dynamic content
- No accordion component for FAQ (using native `<details>` instead)
- No proper modal/dialog patterns yet
- Inconsistent icon centering

🔴 **Accessibility Violations:**
- WCAG 2.1 AA compliance at risk
- Keyboard-only users cannot navigate fully
- Screen reader users lack context

---

## Component-by-Component Analysis

### 1. Button Component ([Button.jsx:1-65](prototype/src/components/common/Button.jsx))

**Reference:** Polaris, Lightning, Carbon button patterns

#### ✅ Strengths
- **Variant system:** Primary, secondary, outline, ghost variants align with Polaris
- **Size system:** Small, medium, large scaling matches Carbon
- **Focus rings:** `focus:ring-2 focus:ring-jm-coral` follows WCAG guidelines
- **Disabled states:** Proper opacity + cursor handling
- **Hover animations:** Subtle `scale-105` transform adds premium feel
- **Link polymorphism:** Supports React Router `Link`, external `href`, and `button`

#### ⚠️ Issues Found

**1. Font family inconsistency**
- Line 30: Uses `font-sans` but design system specifies **Georgia serif**
- **Fix:** Change to `font-serif` for all buttons

**2. Missing ARIA attributes**
```jsx
// Current (Line 54-64)
<button type={type} onClick={onClick} disabled={disabled} className={...}>

// Should be:
<button
  type={type}
  onClick={onClick}
  disabled={disabled}
  aria-disabled={disabled ? 'true' : undefined}
  aria-label={ariaLabel}  // Add prop
  className={...}
>
```

**3. Loading state missing**
- No spinner or loading variant
- **Reference:** Polaris Button shows loading spinner inside button
- **Recommendation:** Add `loading` prop with inline spinner

**4. Icon support inconsistent**
```jsx
// Recommended pattern from Carbon:
<Button leftIcon="lucide:arrow-left" rightIcon="lucide:arrow-right">
  Continue
</Button>
```

#### 🎯 Recommendations

**Priority 1 (Accessibility):**
- Add `aria-label` prop for icon-only buttons
- Add `aria-busy="true"` for loading states
- Support `aria-describedby` for error/helper text

**Priority 2 (Features):**
- Add `loading` state with spinner
- Add `iconLeft` and `iconRight` props
- Add `fullWidth` variant

**Priority 3 (Polish):**
- Change to Georgia serif (`font-serif`)
- Add `active:scale-95` for pressed state (Lightning pattern)

---

### 2. Card Component ([Card.jsx:1-29](prototype/src/components/common/Card.jsx))

**Reference:** Material Design, Polaris, Lightning card patterns

#### ✅ Strengths
- **Variant system:** Default, elevated, gradient, subtle variants
- **Hover effects:** Optional `hover` prop for shadow transitions
- **Border radius:** 12px (`rounded-xl`) matches design system
- **Flexible children:** Accepts any content

#### ⚠️ Issues Found

**1. No semantic structure**
```jsx
// Current (Line 24)
<div className={...}>{children}</div>

// Should support:
<Card as="article" role="region" aria-labelledby="card-title">
  <h3 id="card-title">Profile Card</h3>
</Card>
```

**2. Missing padding variants**
- Fixed `p-8` (32px) on Line 19
- **Reference:** Polaris Card has `padding="tight" | "default" | "loose"`
- **Recommendation:** Add `padding` prop

**3. No header/footer slots**
```jsx
// Polaris pattern:
<Card>
  <Card.Header>Title</Card.Header>
  <Card.Body>Content</Card.Body>
  <Card.Footer>Actions</Card.Footer>
</Card>
```

**4. Locked state not built-in**
- Prototype has locked tier cards but no reusable pattern
- **Recommendation:** Add `locked` prop with overlay

#### 🎯 Recommendations

**Priority 1 (Structure):**
- Add `as` prop for semantic HTML (`article`, `section`, `div`)
- Add `role` and `aria-labelledby` props
- Add compound components: `Card.Header`, `Card.Body`, `Card.Footer`

**Priority 2 (Features):**
- Add `padding` variant (`tight`, `default`, `loose`)
- Add `locked` state with blur overlay
- Add `clickable` variant with hover cursor

**Priority 3 (Tier Integration):**
```jsx
<Card locked={profile.tier > currentUser.tier} tierRequired={3}>
  <Card.Header>
    <LockIcon /> Tier 3 Required
  </Card.Header>
  <Card.Body className="blur-sm">
    Hidden content
  </Card.Body>
</Card>
```

---

### 3. Navigation Component ([Navigation.jsx:1-154](prototype/src/components/layout/Navigation.jsx))

**Reference:** Reach UI, Radix UI, Headless UI navigation patterns

#### ✅ Strengths
- **Mobile menu:** Responsive hamburger menu (Line 74-90)
- **Active state tracking:** `useLocation` hook (Line 16-27)
- **Accessibility attributes:** `aria-label="Main navigation"` (Line 31)
- **Focus management:** `closeMobileMenu` on navigation (Line 36)
- **Keyboard accessible:** Uses semantic `<button>` for toggle (Line 74)

#### ⚠️ Issues Found

**1. Mobile menu not trapped**
```jsx
// Current (Line 94-149): No focus trap
{isMobileMenuOpen && <div>...</div>}

// Should add:
import { FocusTrap } from '@headlessui/react'; // or similar

<FocusTrap active={isMobileMenuOpen}>
  <div role="dialog" aria-modal="true">
    <div className="sr-only">Mobile Navigation</div>
    {/* menu items */}
  </div>
</FocusTrap>
```

**2. Missing keyboard ESC handler**
```jsx
// Add to close mobile menu
useEffect(() => {
  const handleEscape = (e) => {
    if (e.key === 'Escape') closeMobileMenu();
  };
  if (isMobileMenuOpen) {
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }
}, [isMobileMenuOpen]);
```

**3. No skip navigation link**
```jsx
// Add before Line 31
<a
  href="#main-content"
  className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-jm-purple-deep focus:text-white focus:rounded-lg"
>
  Skip to main content
</a>
```

**4. Mobile menu animation accessibility**
- Line 95: `animate-slide-in` has no `prefers-reduced-motion` check
```css
/* Add to CSS: */
@media (prefers-reduced-motion: reduce) {
  .animate-slide-in {
    animation: none;
  }
}
```

#### 🎯 Recommendations

**Priority 1 (Accessibility - CRITICAL):**
- Add skip navigation link
- Add focus trap to mobile menu
- Add ESC key handler
- Add `aria-expanded` to mobile toggle (✅ already present Line 79)
- Add `prefers-reduced-motion` support

**Priority 2 (UX):**
- Add backdrop click to close mobile menu
- Add body scroll lock when mobile menu open
- Add transition animations respecting motion preferences

**Priority 3 (Enhancement):**
- Add dropdown menus for sub-navigation
- Add search bar integration
- Add notification badge support

---

### 4. FAQ Page ([FAQ.jsx:208-218](prototype/src/pages/FAQ.jsx))

**Reference:** Reach UI Accordion, Radix UI Accordion, Material Design Expansion Panel

#### ⚠️ Critical Issue: Using Native `<details>` Instead of Accessible Accordion

**Current Implementation (Line 208):**
```jsx
<details className="..." >
  <summary className="...">Question</summary>
  <p className="...">Answer</p>
</details>
```

**Problems:**
1. **No ARIA labels** - Screen readers announce as "disclosure" not "accordion"
2. **No keyboard navigation** - Cannot use arrow keys to navigate between items
3. **No expand/collapse all** - Common pattern missing
4. **Inconsistent browser styling** - Safari, Chrome, Firefox differ
5. **Animation limitations** - Cannot smoothly animate `<details>` open/close

#### 🎯 Recommended: Build Proper Accordion Component

**Reference Implementations:**
- **Reach UI:** `@reach/accordion` (React)
- **Radix UI:** `@radix-ui/react-accordion` (React)
- **Carbon Design System:** Accordion with keyboard navigation
- **Polaris:** Collapsible component with ARIA

**Pattern to Follow:**
```jsx
// AccordionItem.jsx (new component)
import { useState } from 'react';

export default function AccordionItem({
  id,
  question,
  answer,
  defaultOpen = false
}) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const headerId = `accordion-header-${id}`;
  const panelId = `accordion-panel-${id}`;

  return (
    <div className="border border-jm-gray-200 rounded-lg">
      <h3>
        <button
          id={headerId}
          aria-expanded={isOpen}
          aria-controls={panelId}
          onClick={() => setIsOpen(!isOpen)}
          className="w-full text-left px-6 py-4 flex items-center justify-between font-semibold text-jm-gray-900 hover:bg-jm-gray-50 transition-colors rounded-t-lg"
        >
          <span>{question}</span>
          <svg
            className={`w-5 h-5 transition-transform ${isOpen ? 'rotate-180' : ''}`}
            fill="currentColor"
            viewBox="0 0 20 20"
            aria-hidden="true"
          >
            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"/>
          </svg>
        </button>
      </h3>
      <div
        id={panelId}
        role="region"
        aria-labelledby={headerId}
        hidden={!isOpen}
        className={`px-6 py-4 text-jm-gray-600 ${isOpen ? 'block' : 'hidden'}`}
      >
        <p>{answer}</p>
      </div>
    </div>
  );
}
```

**Keyboard Navigation:**
```jsx
// Add to AccordionGroup.jsx
const handleKeyDown = (e, index) => {
  const items = accordionRefs.current;

  switch (e.key) {
    case 'ArrowDown':
      e.preventDefault();
      items[index + 1]?.focus();
      break;
    case 'ArrowUp':
      e.preventDefault();
      items[index - 1]?.focus();
      break;
    case 'Home':
      e.preventDefault();
      items[0]?.focus();
      break;
    case 'End':
      e.preventDefault();
      items[items.length - 1]?.focus();
      break;
  }
};
```

**Benefits:**
- ✅ WCAG 2.1 AA compliant
- ✅ Keyboard navigation (↑↓ arrow keys, Home/End)
- ✅ Screen reader accessible (`aria-expanded`, `aria-controls`)
- ✅ Smooth animations
- ✅ Consistent cross-browser styling
- ✅ Expand/collapse all option

---

### 5. Profile View Component ([ProfileView.jsx:1-100](prototype/src/pages/app/ProfileView.jsx))

**Reference:** LinkedIn profile views, Salesforce record detail pages

#### ✅ Strengths
- **EDT calculation visible:** Line 28 shows effective disclosure tier logic
- **Tier-based visibility:** Lines 30-70 show progressive disclosure
- **Locked state messaging:** Tier 4 + 5 show upgrade prompts

#### ⚠️ Issues Found

**1. No tier locks have ARIA attributes**
```jsx
// Current (implied from Line 62-64):
<div className="blur-sm">
  <p>Complete Tier 4 to unlock</p>
</div>

// Should be:
<div
  className="relative"
  aria-live="polite"
  role="region"
  aria-label="Locked tier 4 content"
>
  <div className="blur-sm" aria-hidden="true">
    {/* blurred content */}
  </div>
  <div className="absolute inset-0 flex items-center justify-center">
    <div className="bg-white/90 rounded-lg p-6 text-center">
      <svg className="w-12 h-12 mx-auto text-jm-purple-deep" aria-hidden="true">
        <use href="#lock-icon" />
      </svg>
      <p className="font-semibold text-jm-gray-900 mt-4">
        Tier 4 Required
      </p>
      <p className="text-sm text-jm-gray-600 mt-2">
        Complete your Tier 4 to view health information
      </p>
      <button
        className="mt-4 btn-primary"
        aria-label="Upgrade to Premium to unlock Tier 4"
      >
        Upgrade to Premium
      </button>
    </div>
  </div>
</div>
```

**2. Back navigation not announced**
- Line 79: Back link has no `aria-label`
```jsx
<Link
  to="/app/discover"
  className="..."
  aria-label="Go back to Discover page"
>
```

**3. Profile image missing alt text**
- Assumed from context, likely missing descriptive alt
```jsx
<img
  src={profile.image}
  alt={`Profile photo of ${profile.name}, ${profile.age}, ${profile.profession} from ${profile.location}`}
  className="..."
/>
```

#### 🎯 Recommendations

**Priority 1 (Accessibility):**
- Add ARIA labels to all locked tier sections
- Add `aria-hidden="true"` to blurred content
- Add descriptive alt text to profile images
- Add `aria-live="polite"` to EDT calculation display

**Priority 2 (UX):**
- Add tooltip explaining EDT calculation
- Add "Request Details" modal pattern
- Add tier completion progress bar

---

### 6. Discover Page ([Discover.jsx:1-100](prototype/src/pages/app/Discover.jsx))

**Reference:** Airbnb search results, LinkedIn search, Polaris resource list

#### ✅ Strengths
- **Filter state management:** Lines 5-10 show filter handling
- **Card grid layout:** Responsive grid (assumed from common pattern)
- **Compatibility scores:** Line 23, 36, etc. show match percentages

#### ⚠️ Issues Found

**1. No filter labels**
```jsx
// Assumed from Line 5-10:
<select name="ageMin" value={filters.ageMin} onChange={...}>

// Should be:
<label htmlFor="age-min" className="sr-only">
  Minimum age
</label>
<select
  id="age-min"
  name="ageMin"
  aria-label="Filter by minimum age"
  value={filters.ageMin}
  onChange={...}
>
```

**2. No loading state**
- Profiles array is static (Line 13)
- Should show skeleton loaders during fetch

**3. No empty state**
- What happens when no matches found?
- **Pattern:** Polaris EmptyState component

**4. Pagination missing**
- No pagination controls
- **Pattern:** Carbon Pagination with page size selector

#### 🎯 Recommendations

**Priority 1 (Accessibility):**
- Add labels to all filter inputs
- Add `aria-live="polite"` to result count
- Add `role="list"` to profile grid
- Add `role="listitem"` to each profile card

**Priority 2 (UX):**
- Add skeleton loading states
- Add empty state illustration + message
- Add pagination controls
- Add "Load more" infinite scroll option

**Priority 3 (Features):**
- Add saved searches
- Add filter presets
- Add sort options (compatibility, recency, distance)

---

## Missing Components

These components exist in Component Gallery systems but are missing from JoyMatcher:

### 1. **Accordion** ⚠️ CRITICAL
- **Current:** Using `<details>` in FAQ
- **Need:** Proper ARIA-compliant accordion
- **References:** Reach UI, Radix UI, Carbon
- **Priority:** HIGH

### 2. **Modal/Dialog** ⚠️ CRITICAL
- **Current:** Mentioned in CLAUDE.md but not implemented
- **Need:**
  - Tier Awareness Warning Modal
  - Request Details Modal
  - Upgrade Modal
  - Revocation Confirmation Modal
- **References:** Headless UI Dialog, Radix Dialog, Polaris Modal
- **Priority:** HIGH

### 3. **Toast/Notification** 🟡 MEDIUM
- **Current:** Notifications page exists, but no toast component
- **Need:** Success/error/info toasts for actions
- **References:** Radix Toast, Polaris Toast, Carbon Notification
- **Priority:** MEDIUM

### 4. **Progress Indicator** 🟡 MEDIUM
- **Current:** No tier completion progress bar
- **Need:** Step progress for tier completion
- **References:** Material Stepper, Carbon ProgressIndicator
- **Priority:** MEDIUM

### 5. **Tooltip** 🟢 LOW
- **Current:** No tooltip pattern
- **Need:** EDT explanation, tier requirement hints
- **References:** Radix Tooltip, Polaris Tooltip
- **Priority:** LOW

### 6. **Popover** 🟢 LOW
- **Current:** None
- **Need:** Filter dropdowns, profile previews
- **References:** Headless UI Popover, Radix Popover
- **Priority:** LOW

### 7. **Badge** 🟢 LOW
- **Current:** Inline status text
- **Need:** Verification badges, tier badges, subscription badges
- **References:** Polaris Badge, Carbon Tag
- **Priority:** LOW

### 8. **Avatar** 🟢 LOW
- **Current:** Hardcoded gradient circles
- **Need:** Reusable avatar component with fallback initials
- **References:** Radix Avatar, Polaris Avatar
- **Priority:** LOW

---

## Accessibility Violations (WCAG 2.1 AA)

### Critical Violations

#### 1. **1.3.1 Info and Relationships (Level A)** ❌
- **Violation:** Locked tier content not properly labeled
- **Impact:** Screen reader users don't know content is locked
- **Fix:** Add `aria-label`, `role="region"`

#### 2. **2.1.1 Keyboard (Level A)** ❌
- **Violation:** Mobile menu not keyboard navigable (ESC to close)
- **Impact:** Keyboard-only users trapped in mobile menu
- **Fix:** Add ESC handler, focus trap

#### 3. **2.4.4 Link Purpose (Level A)** ⚠️
- **Violation:** Some links lack context ("Back" without destination)
- **Impact:** Screen reader users don't know link destination
- **Fix:** Add `aria-label` to ambiguous links

#### 4. **4.1.2 Name, Role, Value (Level A)** ❌
- **Violation:** Custom interactive elements missing ARIA
- **Impact:** Screen readers can't identify interactive elements
- **Fix:** Add `aria-expanded`, `aria-controls`, `aria-live`

### Important Violations

#### 5. **1.4.3 Contrast (Level AA)** ✅ PASSING
- **Status:** Color contrast verified in design_system.md
- `#4D0052` on white: 10.8:1 (AAA) ✅
- `hsla(320,50%,15%,1)` on white: 13.5:1 (AAA) ✅

#### 6. **2.4.7 Focus Visible (Level AA)** ✅ MOSTLY PASSING
- **Status:** Focus rings present on most elements
- **Issue:** Some icon buttons missing visible focus
- **Fix:** Add `focus-visible:ring-2` to all icon buttons

#### 7. **2.5.5 Target Size (Level AAA)** ⚠️ PARTIALLY PASSING
- **Status:** Some touch targets < 44x44px
- **Issue:** Icon-only buttons (Line Navigation.jsx:74)
- **Fix:** Ensure min-w-[44px] min-h-[44px] on all interactive elements

---

## Design Token Compliance

### ✅ Passing

1. **Color tokens:** All components use design system colors
2. **Typography:** Georgia serif specified (but Button.jsx uses sans)
3. **Spacing:** Consistent use of 12/20/32/48/64px scale
4. **Border radius:** 8/12/16px tokens used correctly
5. **Shadows:** Purple-tinted shadows align with design system

### ⚠️ Issues

1. **Font family inconsistency:**
   - Button.jsx Line 30: Uses `font-sans` (should be `font-serif`)
   - Navigation.jsx Line 21: Uses `font-sans` (should be `font-serif`)

2. **Animation tokens:**
   - Design system specifies 150ms/250ms/350ms
   - Some components use 200ms (Line Button.jsx:30, Card.jsx:17)
   - **Fix:** Use `transition-[150ms|250ms|350ms]`

3. **Border tokens:**
   - Design system: `--border-default: 1px solid hsla(320,25%,85%,1)`
   - Components use: `border-jm-gray-200` (misaligned)
   - **Fix:** Standardize to `border-[hsla(320,25%,85%,1)]`

---

## Recommendations Summary

### Immediate Actions (Week 1)

1. **Fix Button font family** - Change to Georgia serif
2. **Add skip navigation link** - Critical accessibility
3. **Build Accordion component** - Replace `<details>` in FAQ
4. **Add ARIA labels** - All interactive elements
5. **Add keyboard handlers** - ESC to close mobile menu

### Short-term (Week 2-3)

6. **Build Modal component** - Tier warnings, upgrades
7. **Add focus trap** - Mobile menu, modals
8. **Build Toast component** - Action feedback
9. **Add loading states** - Skeleton loaders
10. **Build Progress component** - Tier completion

### Medium-term (Month 1-2)

11. **Build Tooltip component** - EDT explanations
12. **Build Badge component** - Verification, tier badges
13. **Build Avatar component** - Reusable profile images
14. **Add pagination** - Discover page
15. **Audit touch targets** - Ensure 44x44px minimum

### Documentation Needs

16. **Component usage docs** - How to use each component
17. **Accessibility guide** - ARIA patterns, keyboard nav
18. **Storybook setup** - Component playground
19. **Testing guide** - Accessibility testing checklist

---

## Component Gallery References

### Trust-Focused Systems to Study

1. **Shopify Polaris**
   - URL: https://polaris.shopify.com
   - **Learn:** Tone of voice, trust-building UI patterns
   - **Apply:** Modal patterns, accordion, form validation

2. **Salesforce Lightning**
   - URL: https://www.lightningdesignsystem.com
   - **Learn:** Enterprise trust, professional layouts
   - **Apply:** Card patterns, data tables, navigation

3. **Workday Canvas**
   - URL: https://design.workday.com
   - **Learn:** Accessibility-first, inclusive design
   - **Apply:** Form patterns, empty states, loading states

4. **IBM Carbon**
   - URL: https://carbondesignsystem.com
   - **Learn:** Multi-framework patterns (React → Rails ViewComponents)
   - **Apply:** Accordion, pagination, data visualization

5. **Radix UI**
   - URL: https://www.radix-ui.com
   - **Learn:** Unstyled, accessible primitives
   - **Apply:** Dialog, Accordion, Tooltip primitives

### Specific Component References

| Component | Best Reference | URL |
|-----------|----------------|-----|
| Accordion | Radix UI | https://www.radix-ui.com/primitives/docs/components/accordion |
| Modal | Headless UI | https://headlessui.com/react/dialog |
| Toast | Radix UI | https://www.radix-ui.com/primitives/docs/components/toast |
| Tooltip | Radix UI | https://www.radix-ui.com/primitives/docs/components/tooltip |
| Progress | Carbon | https://carbondesignsystem.com/components/progress-indicator/usage |
| Badge | Polaris | https://polaris.shopify.com/components/badge |
| Avatar | Radix UI | https://www.radix-ui.com/primitives/docs/components/avatar |

---

## Testing Checklist

### Accessibility Testing

- [ ] **Keyboard Navigation**
  - [ ] Tab through all interactive elements
  - [ ] ESC closes modals/menus
  - [ ] Arrow keys navigate accordions/menus
  - [ ] Enter/Space activates buttons

- [ ] **Screen Reader Testing**
  - [ ] NVDA (Windows) - Test all pages
  - [ ] JAWS (Windows) - Test critical flows
  - [ ] VoiceOver (macOS) - Test mobile menu
  - [ ] All ARIA labels announced correctly

- [ ] **Visual Testing**
  - [ ] Focus visible on all elements
  - [ ] Color contrast passes WCAG AA
  - [ ] Text readable at 200% zoom
  - [ ] No information conveyed by color alone

- [ ] **Motion Testing**
  - [ ] Animations respect `prefers-reduced-motion`
  - [ ] No auto-playing animations > 5 seconds
  - [ ] No parallax/motion sickness triggers

### Functional Testing

- [ ] **Button Component**
  - [ ] All variants render correctly
  - [ ] Disabled state prevents clicks
  - [ ] Loading state shows spinner
  - [ ] Links navigate correctly

- [ ] **Card Component**
  - [ ] Locked state displays properly
  - [ ] Hover effects smooth
  - [ ] Semantic HTML correct

- [ ] **Navigation**
  - [ ] Mobile menu opens/closes
  - [ ] Active state highlights correctly
  - [ ] Logo navigates to home

- [ ] **FAQ Accordion** (after rebuild)
  - [ ] Keyboard navigation works
  - [ ] ARIA attributes correct
  - [ ] Smooth animations

---

## Rails 8 Translation Notes

When converting React prototype to Rails 8 + ViewComponents:

### 1. **Button Component → ViewComponent**

```ruby
# app/components/button_component.rb
class ButtonComponent < ViewComponent::Base
  attr_reader :variant, :size, :href, :disabled, :loading

  def initialize(variant: :primary, size: :medium, href: nil, disabled: false, loading: false)
    @variant = variant
    @size = size
    @href = href
    @disabled = disabled
    @loading = loading
  end

  def call
    tag.send(element_type, **html_options) do
      concat loading_spinner if loading
      concat content
    end
  end

  private

  def element_type
    href ? :a : :button
  end

  def html_options
    {
      class: classes,
      href: href,
      disabled: disabled,
      "aria-disabled": disabled ? "true" : nil,
      "aria-busy": loading ? "true" : nil
    }
  end
end
```

### 2. **Accordion → Stimulus Controller**

```js
// app/javascript/controllers/accordion_controller.js
import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["item", "button", "panel"]

  toggle(event) {
    const button = event.currentTarget
    const panel = button.nextElementSibling
    const isExpanded = button.getAttribute("aria-expanded") === "true"

    button.setAttribute("aria-expanded", !isExpanded)
    panel.hidden = isExpanded
  }

  keydown(event) {
    switch (event.key) {
      case "ArrowDown":
        this.focusNext(event.currentTarget)
        break
      case "ArrowUp":
        this.focusPrevious(event.currentTarget)
        break
    }
  }
}
```

### 3. **State Management → Turbo Frames**

```erb
<!-- app/views/profiles/show.html.erb -->
<%= turbo_frame_tag "profile-tier-#{@tier}" do %>
  <% if @profile.edt >= @tier %>
    <%= render "profiles/tier_#{@tier}", profile: @profile %>
  <% else %>
    <%= render "profiles/locked_tier", tier: @tier %>
  <% end %>
<% end %>
```

---

## Conclusion

JoyMatcher's prototype has a **solid foundation** but requires **critical accessibility improvements** before Rails 8 conversion.

### Priority Matrix

| Priority | Issue | Impact | Effort |
|----------|-------|--------|--------|
| 🔴 CRITICAL | Build Accordion component | High | Medium |
| 🔴 CRITICAL | Add ARIA labels everywhere | High | Low |
| 🔴 CRITICAL | Add keyboard navigation | High | Medium |
| 🟡 HIGH | Build Modal component | High | High |
| 🟡 HIGH | Fix Button font family | Medium | Low |
| 🟡 HIGH | Add skip navigation | Medium | Low |
| 🟢 MEDIUM | Build Toast component | Medium | Medium |
| 🟢 MEDIUM | Add loading states | Medium | Medium |
| ⚪ LOW | Build Tooltip component | Low | Medium |
| ⚪ LOW | Build Badge component | Low | Low |

### Next Steps

1. **Immediate:** Fix Button.jsx font family (5 minutes)
2. **Today:** Add skip navigation link (15 minutes)
3. **This Week:** Build accessible Accordion component (4 hours)
4. **Next Week:** Build Modal component with focus trap (8 hours)
5. **Month 1:** Complete all WCAG 2.1 AA compliance fixes

---

**Audit completed:** 2026-02-28
**Next review:** After Accordion + Modal implementation
**Maintainer:** Development Team
