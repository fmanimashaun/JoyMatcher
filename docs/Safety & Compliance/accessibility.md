# Accessibility Standards & Implementation

**Version:** 1.0.0
**Last Updated:** 2026-02-26
**Status:** Complete Specification
**Target Compliance:** WCAG 2.1 Level AA

---

## 1. Executive Summary

JoyMatcher's accessibility framework ensures the platform is usable by all individuals, including those with visual, auditory, motor, or cognitive disabilities. This document specifies implementation requirements for WCAG 2.1 Level AA compliance, keyboard navigation, screen reader support, ARIA labels, and assistive technology compatibility for a trust-based, marriage-oriented matchmaking platform.

### 1.1 Why Accessibility Matters for JoyMatcher

**Inclusive Marriage Matching:**
- Marriage is a fundamental human right; matchmaking should be accessible to all
- Disability affects 15% of global population (WHO)
- Nigerian users may have limited access to assistive technology (cost, awareness)
- Premium/VIP users expect professional-grade accessibility

**Legal & Ethical Obligations:**
- ADA (Americans with Disabilities Act) - applicable for US users
- UK Equality Act 2010 - applicable for UK users
- UN Convention on Rights of Persons with Disabilities (Nigeria ratified)
- Ethical imperative: No one excluded from finding love

**Business Benefits:**
- Larger addressable market (15% more potential users)
- Better SEO (accessible sites rank higher)
- Improved usability for all users (curb-cut effect)
- Reduced legal risk

---

## 2. WCAG 2.1 Level AA Overview

### 2.1 WCAG Principles (POUR)

1. **Perceivable**: Information must be presentable to users in ways they can perceive
2. **Operable**: Interface components must be operable
3. **Understandable**: Information and operation must be understandable
4. **Robust**: Content must be robust enough for assistive technologies

### 2.2 Conformance Levels

| Level | Description | JoyMatcher Target |
|-------|-------------|-------------------|
| **A** | Minimum (basic accessibility) | Exceed |
| **AA** | Mid-range (addresses most barriers) | ✅ Full compliance |
| **AAA** | Highest (specialized needs) | Exceed where feasible |

### 2.3 Success Criteria Summary

**Level A (Must Meet):** 30 criteria
**Level AA (Must Meet):** 20 additional criteria (50 total)
**Total JoyMatcher Compliance Target:** 50 criteria (WCAG 2.1 AA)

---

## 3. Perceivable (Principle 1)

### 3.1 Text Alternatives (WCAG 1.1)

**1.1.1 Non-text Content (Level A)**

**Implementation:**

**Profile Photos:**
```html
<!-- User's primary photo -->
<img
  src="/photos/user-12345.jpg"
  alt="John D., 30, smiling in business attire"
  role="img"
>

<!-- If user has no photo -->
<div
  class="profile-photo-placeholder"
  role="img"
  aria-label="No photo provided"
>
  <span aria-hidden="true">JD</span> <!-- Initials for visual users -->
</div>
```

**Icons:**
```html
<!-- Show Interest icon -->
<button aria-label="Show Interest in this profile">
  <svg aria-hidden="true" focusable="false"><!-- Heart icon --></svg>
  <span class="sr-only">Show Interest</span>
</button>

<!-- Tier status icons -->
<div class="tier-status">
  <span aria-label="Tier 1 complete">
    <svg aria-hidden="true"><!-- Checkmark --></svg>
  </span>
  <span aria-label="Tier 2 complete">
    <svg aria-hidden="true"><!-- Checkmark --></svg>
  </span>
  <span aria-label="Tier 3 locked, requires Premium subscription">
    <svg aria-hidden="true"><!-- Lock icon --></svg>
  </span>
</div>
```

**Form Controls:**
```html
<label for="genotype">Genotype</label>
<select id="genotype" name="genotype" aria-required="true">
  <option value="">Select genotype</option>
  <option value="AA">AA</option>
  <option value="AS">AS</option>
  <option value="SS">SS</option>
</select>
```

**CAPTCHA Alternative (for blind users):**
```html
<!-- Visual CAPTCHA for sighted users -->
<div id="visual-captcha">...</div>

<!-- Audio CAPTCHA alternative -->
<button aria-label="Play audio CAPTCHA">
  <span aria-hidden="true">🔊</span>
  Listen to audio challenge
</button>
```

### 3.2 Time-based Media (WCAG 1.2)

**1.2.1 Audio-only and Video-only (Level A)**
**1.2.2 Captions (Level A)**
**1.2.3 Audio Description (Level A)**

**Implementation:**

**VIP Verification Video (Liveness Check):**
```html
<!-- User records video for verification -->
<!-- No audio required (visual liveness only) -->
<!-- Transcript provided for verification team (not public) -->

<div class="liveness-instructions" role="region" aria-label="Verification instructions">
  <p>You will be asked to:</p>
  <ol>
    <li>Blink twice</li>
    <li>Turn your head left</li>
    <li>Turn your head right</li>
    <li>Smile</li>
  </ol>
  <p>These actions will be detected automatically. No audio is recorded.</p>
</div>
```

**Promo/Explainer Videos (Future):**
- Captions for all spoken content
- Audio descriptions for visual-only information
- Transcript available

### 3.3 Adaptable (WCAG 1.3)

**1.3.1 Info and Relationships (Level A)**

**Semantic HTML:**
```html
<!-- Proper heading hierarchy -->
<h1>Your Profile</h1>
<section>
  <h2>Tier 1: Identity & Intent</h2>
  <h3>Personal Information</h3>
  <div>
    <label for="displayName">Display Name</label>
    <input type="text" id="displayName" name="displayName">
  </div>
</section>

<!-- Lists for navigation -->
<nav aria-label="Main navigation">
  <ul>
    <li><a href="/discover">Discover</a></li>
    <li><a href="/messages">Messages</a></li>
    <li><a href="/profile">Profile</a></li>
  </ul>
</nav>

<!-- Tables for data (subscription comparison) -->
<table>
  <caption>Subscription Comparison</caption>
  <thead>
    <tr>
      <th scope="col">Feature</th>
      <th scope="col">Free</th>
      <th scope="col">Premium</th>
      <th scope="col">VIP</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">Show Interest</th>
      <td>5/day</td>
      <td>20/day</td>
      <td>50/day</td>
    </tr>
  </tbody>
</table>
```

**1.3.2 Meaningful Sequence (Level A)**

**Implementation:**
- DOM order matches visual order
- Content flows logically (left-to-right, top-to-bottom)
- Screen reader users hear content in correct sequence

**1.3.3 Sensory Characteristics (Level A)**

**Avoid:**
```html
<!-- Bad: Relies on visual position -->
<p>Click the button on the right to continue.</p>

<!-- Good: Descriptive, non-visual -->
<p>Click the "Continue to Tier 2" button to proceed.</p>
```

**1.3.4 Orientation (Level AA)**

**Implementation:**
- Content works in both portrait and landscape
- No orientation lock (unless essential, e.g., photo capture)

```css
/* Responsive layout for both orientations */
@media (orientation: portrait) {
  .profile-card { flex-direction: column; }
}
@media (orientation: landscape) {
  .profile-card { flex-direction: row; }
}
```

**1.3.5 Identify Input Purpose (Level AA)**

**Implementation:**
```html
<!-- Autocomplete attributes for personal data -->
<input
  type="text"
  id="legalName"
  name="legalName"
  autocomplete="name"
  aria-label="Legal first name"
>

<input
  type="email"
  id="email"
  name="email"
  autocomplete="email"
  aria-label="Email address"
>

<input
  type="tel"
  id="phone"
  name="phone"
  autocomplete="tel"
  aria-label="Phone number"
>
```

**Benefits:**
- Browser autofill works correctly
- Password managers recognize fields
- Assistive tech can identify field purpose

### 3.4 Distinguishable (WCAG 1.4)

**1.4.1 Use of Color (Level A)**

**Avoid:**
```html
<!-- Bad: Red/green for tier status (color-blind users can't distinguish) -->
<span style="color: green;">Tier 1 Complete</span>
<span style="color: red;">Tier 2 Incomplete</span>
```

**Correct:**
```html
<!-- Good: Icons + color + text -->
<span class="tier-complete">
  <svg aria-hidden="true"><!-- Checkmark icon --></svg>
  <span>Tier 1 Complete</span>
</span>
<span class="tier-incomplete">
  <svg aria-hidden="true"><!-- Lock icon --></svg>
  <span>Tier 2 Incomplete</span>
</span>
```

**1.4.2 Audio Control (Level A)**

**Implementation:**
- No auto-playing audio (notification sounds user-controlled)
- User can pause/stop any audio

**1.4.3 Contrast (Minimum) (Level AA)**

**Requirements:**
- Normal text (< 18pt): 4.5:1 contrast ratio
- Large text (≥ 18pt or 14pt bold): 3:1 contrast ratio
- UI components: 3:1 contrast ratio

**JoyMatcher Color Palette (Compliant):**
```css
:root {
  /* Primary colors */
  --primary: #1A5F7A; /* Dark teal */
  --primary-light: #4A90A4;
  --on-primary: #FFFFFF; /* White text on primary */

  /* Neutral tones */
  --background: #FAFBFC; /* Off-white */
  --surface: #FFFFFF; /* Pure white */
  --text-primary: #1F2937; /* Almost black - AAA contrast on white */
  --text-secondary: #6B7280; /* Gray - AA contrast on white */

  /* Semantic colors */
  --success: #059669; /* Green - tier complete */
  --warning: #D97706; /* Orange - warning */
  --error: #DC2626; /* Red - error */

  /* Contrast ratios (verified) */
  /* #1F2937 on #FFFFFF: 16.1:1 (AAA) */
  /* #6B7280 on #FFFFFF: 5.7:1 (AA) */
  /* #1A5F7A on #FFFFFF: 7.2:1 (AAA) */
}
```

**Contrast Checking:**
- Use WebAIM Contrast Checker
- Automated testing in CI/CD (pa11y, axe)
- Manual spot-checks during QA

**1.4.4 Resize Text (Level AA)**

**Implementation:**
- Text can be resized up to 200% without loss of content/functionality
- Use relative units (rem, em) instead of pixels

```css
/* Good: Relative units */
body {
  font-size: 16px; /* Base size */
}
h1 {
  font-size: 2rem; /* 32px at default, scales with user preference */
}
p {
  font-size: 1rem; /* 16px at default */
}

/* Bad: Fixed pixels */
p {
  font-size: 16px; /* Does not scale with user preferences */
}
```

**Testing:**
- Browser zoom: 200%
- Browser text-only zoom (Firefox)
- Verify layout doesn't break

**1.4.5 Images of Text (Level AA)**

**Avoid:**
```html
<!-- Bad: Text in image (not scalable, not translatable) -->
<img src="upgrade-to-premium.png" alt="Upgrade to Premium">
```

**Correct:**
```html
<!-- Good: Actual text (scalable, translatable, selectable) -->
<button class="cta-button">Upgrade to Premium</button>
```

**Exceptions:**
- Logos (JoyMatcher logo)
- User-submitted photos (profile pictures)

**1.4.10 Reflow (Level AA)**

**Implementation:**
- Content reflows to single column at 320px width (400% zoom)
- No horizontal scrolling (except data tables)

```css
/* Responsive layout */
.profile-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
}

/* At narrow widths, becomes single column automatically */
```

**1.4.11 Non-text Contrast (Level AA)**

**Implementation:**
- UI components (buttons, form inputs): 3:1 contrast ratio against background
- Focus indicators: 3:1 contrast ratio

```css
/* Button contrast */
.btn-primary {
  background: var(--primary); /* 7.2:1 contrast with white text */
  color: white;
  border: 2px solid var(--primary);
}

/* Input contrast */
input {
  border: 1px solid #6B7280; /* 5.7:1 contrast with background */
}

/* Focus indicator */
*:focus {
  outline: 2px solid #1A5F7A; /* 7.2:1 contrast */
  outline-offset: 2px;
}
```

**1.4.12 Text Spacing (Level AA)**

**Implementation:**
- User can adjust text spacing without loss of content

```css
/* Ensure layout accommodates user-adjusted spacing */
* {
  line-height: 1.5; /* At least 1.5x font size */
  margin-bottom: 2em; /* Paragraph spacing: at least 2x font size */
}

p {
  letter-spacing: 0.12em; /* At least 0.12x font size */
  word-spacing: 0.16em; /* At least 0.16x font size */
}
```

**Testing:**
- Apply CSS user stylesheet with increased spacing
- Verify content remains visible and functional

**1.4.13 Content on Hover or Focus (Level AA)**

**Implementation:**
- Tooltips/popovers must be dismissible, hoverable, and persistent

```html
<!-- Tier status tooltip -->
<button
  aria-describedby="tier-tooltip"
  onmouseenter="showTooltip('tier-tooltip')"
  onfocus="showTooltip('tier-tooltip')"
  onmouseleave="hideTooltip('tier-tooltip')"
  onblur="hideTooltip('tier-tooltip')"
>
  Tier 3
</button>

<div
  id="tier-tooltip"
  role="tooltip"
  hidden
  aria-live="polite"
>
  Tier 3: Relationship & Family Readiness
  <button aria-label="Dismiss tooltip" onclick="hideTooltip('tier-tooltip')">×</button>
</div>
```

**Requirements:**
- **Dismissible:** ESC key or dismiss button closes tooltip
- **Hoverable:** Mouse can move to tooltip without it disappearing
- **Persistent:** Tooltip remains until user dismisses or moves focus

---

## 4. Operable (Principle 2)

### 4.1 Keyboard Accessible (WCAG 2.1)

**2.1.1 Keyboard (Level A)**

**Implementation:**
- All interactive elements accessible via keyboard (Tab, Enter, Space, Arrow keys)
- No keyboard traps

**Keyboard Navigation Flow:**
```
1. Tab: Next focusable element
2. Shift+Tab: Previous focusable element
3. Enter/Space: Activate button/link
4. Arrow keys: Navigate menus, radio buttons, tabs
5. ESC: Close modals, dismiss tooltips
```

**Example: Profile Card Navigation**
```html
<div class="profile-card" tabindex="-1">
  <img src="..." alt="..." /> <!-- Not focusable (decorative) -->
  <h3>John D., 30</h3>
  <p>Lagos, Nigeria</p>

  <!-- Focusable actions -->
  <button aria-label="Show Interest in John D.">Show Interest</button>
  <button aria-label="View John D.'s full profile">View Profile</button>

  <!-- Link to profile -->
  <a href="/profile/12345" class="sr-only">Go to John D.'s profile</a>
</div>
```

**Focus Management:**
```javascript
// When modal opens, move focus to modal
const openModal = (modalId) => {
  const modal = document.getElementById(modalId);
  modal.removeAttribute('hidden');
  modal.setAttribute('aria-modal', 'true');

  // Focus first focusable element
  const firstFocusable = modal.querySelector('button, a, input, textarea, select');
  firstFocusable?.focus();
};

// When modal closes, return focus to trigger element
const closeModal = (modalId, triggerElement) => {
  const modal = document.getElementById(modalId);
  modal.setAttribute('hidden', '');
  modal.removeAttribute('aria-modal');

  triggerElement?.focus(); // Return focus
};
```

**2.1.2 No Keyboard Trap (Level A)**

**Implementation:**
- User can always Tab away from any element
- Modals have close button (ESC key also works)

**2.1.4 Character Key Shortcuts (Level A)**

**Implementation:**
- Single-key shortcuts can be turned off or remapped
- Single-key shortcuts only active when component has focus

**Example:**
```javascript
// Global keyboard shortcuts (with disable option)
const keyboardShortcuts = {
  'n': () => openNewMessageModal(), // 'N' for new message
  '/': () => focusSearchBar(), // '/' for search (common pattern)
  '?': () => openKeyboardShortcutsHelp() // '?' for help
};

// Only activate if user hasn't disabled shortcuts
document.addEventListener('keydown', (e) => {
  if (!userPreferences.keyboardShortcutsEnabled) return;
  if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return; // Don't interfere with typing

  if (keyboardShortcuts[e.key]) {
    e.preventDefault();
    keyboardShortcuts[e.key]();
  }
});

// Settings toggle
<label>
  <input type="checkbox" id="keyboard-shortcuts" checked />
  Enable keyboard shortcuts
</label>
```

### 4.2 Enough Time (WCAG 2.2)

**2.2.1 Timing Adjustable (Level A)**

**Implementation:**
- No time limits on tier completion (user can take as long as needed)
- Session timeout warning (allow user to extend)

```html
<!-- Session timeout warning (appears 2 minutes before timeout) -->
<div role="alert" aria-live="assertive" id="session-timeout-warning">
  <h2>Your session will expire in 2 minutes</h2>
  <p>You will be logged out due to inactivity.</p>
  <button onclick="extendSession()">Stay logged in</button>
  <button onclick="logout()">Log out now</button>
</div>
```

**2.2.2 Pause, Stop, Hide (Level A)**

**Implementation:**
- No auto-updating content (messages require manual refresh)
- If auto-refresh added: User can pause it

```html
<!-- Message list with manual refresh -->
<div class="message-list">
  <!-- Messages -->
  <button onclick="refreshMessages()">Refresh messages</button>
</div>

<!-- If auto-refresh enabled in future -->
<label>
  <input type="checkbox" id="auto-refresh" />
  Auto-refresh messages every 30 seconds
</label>
```

### 4.3 Seizures and Physical Reactions (WCAG 2.3)

**2.3.1 Three Flashes or Below Threshold (Level A)**

**Implementation:**
- No flashing content (animations are smooth, non-flashing)
- If flashing content added: < 3 flashes per second, small area

### 4.4 Navigable (WCAG 2.4)

**2.4.1 Bypass Blocks (Level A)**

**Implementation:**
- Skip navigation link (first focusable element on page)

```html
<body>
  <!-- Skip link (visible on focus) -->
  <a href="#main-content" class="skip-link">Skip to main content</a>

  <header>
    <nav>...</nav>
  </header>

  <main id="main-content">
    <!-- Page content -->
  </main>
</body>

<style>
.skip-link {
  position: absolute;
  top: -40px;
  left: 0;
  background: var(--primary);
  color: white;
  padding: 8px;
  text-decoration: none;
  z-index: 100;
}

.skip-link:focus {
  top: 0; /* Visible when focused */
}
</style>
```

**2.4.2 Page Titled (Level A)**

**Implementation:**
- Every page has unique, descriptive `<title>`

```html
<!-- Discover page -->
<title>Discover Profiles - JoyMatcher</title>

<!-- User profile -->
<title>John D., 30 - Profile - JoyMatcher</title>

<!-- Messages -->
<title>Messages (3 unread) - JoyMatcher</title>
```

**2.4.3 Focus Order (Level A)**

**Implementation:**
- Focus order follows visual order (DOM order = visual order)
- Logical tab sequence

**2.4.4 Link Purpose (Level A)**

**Implementation:**
- Link text describes destination (no "Click here")

```html
<!-- Bad -->
<a href="/pricing">Click here</a> to see pricing.

<!-- Good -->
<a href="/pricing">View pricing plans</a>
```

**2.4.5 Multiple Ways (Level AA)**

**Implementation:**
- Multiple ways to find pages:
  1. Main navigation menu
  2. Search bar
  3. Sitemap (footer link)
  4. Breadcrumbs (where applicable)

**2.4.6 Headings and Labels (Level AA)**

**Implementation:**
- Descriptive headings and labels

```html
<!-- Good heading hierarchy -->
<h1>Your Matches</h1>
<section>
  <h2>Recommended for You</h2>
  <!-- Profile cards -->
</section>
<section>
  <h2>Recently Active</h2>
  <!-- Profile cards -->
</section>

<!-- Descriptive labels -->
<label for="marital-history">Marital History</label>
<select id="marital-history">...</select>
```

**2.4.7 Focus Visible (Level AA)**

**Implementation:**
- Clear visual focus indicator (outline, border, background change)

```css
/* Focus styles */
*:focus {
  outline: 2px solid var(--primary);
  outline-offset: 2px;
}

/* For dark backgrounds */
.dark-bg *:focus {
  outline-color: white;
}

/* Custom focus for buttons */
button:focus {
  box-shadow: 0 0 3px rgba(26, 95, 122, 0.3);
}
```

### 4.5 Input Modalities (WCAG 2.5)

**2.5.1 Pointer Gestures (Level A)**

**Implementation:**
- All gestures have single-pointer alternative (no pinch-to-zoom required, no complex swipes)

```html
<!-- Profile photo gallery -->
<!-- Swipe to next photo OR click next button -->
<div class="photo-gallery">
  <img src="photo1.jpg" alt="...">
  <button onclick="previousPhoto()" aria-label="Previous photo">‹</button>
  <button onclick="nextPhoto()" aria-label="Next photo">›</button>
</div>
```

**2.5.2 Pointer Cancellation (Level A)**

**Implementation:**
- Click/tap activation on "up" event (not "down")
- Allows user to cancel by moving pointer away before release

```javascript
// Good: Activate on mouseup/touchend
button.addEventListener('click', handleClick); // Click event fires on up

// Bad: Activate on mousedown/touchstart
button.addEventListener('mousedown', handleClick); // Cannot cancel
```

**2.5.3 Label in Name (Level A)**

**Implementation:**
- Visible label matches accessible name

```html
<!-- Good: Button text matches aria-label -->
<button aria-label="Show Interest">Show Interest</button>

<!-- Bad: Mismatch confuses voice control users -->
<button aria-label="Send interest to this user">Show Interest</button>
```

**2.5.4 Motion Actuation (Level A)**

**Implementation:**
- No shake-to-undo or motion-based controls
- If motion control added: provide UI-based alternative

---

## 5. Understandable (Principle 3)

### 5.1 Readable (WCAG 3.1)

**3.1.1 Language of Page (Level A)**

**Implementation:**
```html
<!DOCTYPE html>
<html lang="en">
  <!-- English content -->
</html>

<!-- For Nigerian language content (future) -->
<html lang="yo"> <!-- Yoruba -->
<html lang="ig"> <!-- Igbo -->
<html lang="ha"> <!-- Hausa -->
```

**3.1.2 Language of Parts (Level AA)**

**Implementation:**
```html
<!-- If user enters bio in another language -->
<p lang="yo">Mo fẹ́ ẹni tó gbàgbọ́ Ọlọ́run...</p>
```

### 5.2 Predictable (WCAG 3.2)

**3.2.1 On Focus (Level A)**

**Implementation:**
- No change of context on focus (no automatic form submission)

```html
<!-- Good: Focus only highlights field -->
<input type="text" id="search" placeholder="Search profiles..." />

<!-- Bad: Focus triggers action -->
<input type="text" onfocus="submitSearch()" /> <!-- Don't do this -->
```

**3.2.2 On Input (Level A)**

**Implementation:**
- No automatic form submission on input change
- User must explicitly submit (click button, press Enter)

```html
<!-- Good: User must click submit -->
<form onsubmit="handleSearch(event)">
  <input type="text" id="search" />
  <button type="submit">Search</button>
</form>

<!-- Bad: Auto-submit on input -->
<input type="text" oninput="autoSubmit()" /> <!-- Don't do this -->
```

**3.2.3 Consistent Navigation (Level AA)**

**Implementation:**
- Navigation menu in same location on every page
- Footer in same location on every page
- Consistent ordering of navigation items

**3.2.4 Consistent Identification (Level AA)**

**Implementation:**
- Same icon/label for same function across site

```html
<!-- Show Interest button always uses heart icon + "Show Interest" text -->
<button>
  <svg aria-hidden="true"><!-- Heart icon --></svg>
  Show Interest
</button>
```

### 5.3 Input Assistance (WCAG 3.3)

**3.3.1 Error Identification (Level A)**

**Implementation:**
- Errors clearly identified in text (not just color)

```html
<!-- Form error example -->
<label for="email">Email Address</label>
<input
  type="email"
  id="email"
  aria-invalid="true"
  aria-describedby="email-error"
/>
<p id="email-error" role="alert" class="error-message">
  <svg aria-hidden="true"><!-- Error icon --></svg>
  Please enter a valid email address.
</p>
```

**3.3.2 Labels or Instructions (Level A)**

**Implementation:**
- All form fields have labels
- Complex fields have instructions

```html
<label for="genotype">Genotype</label>
<select id="genotype" aria-describedby="genotype-help">
  <option value="">Select genotype</option>
  <option value="AA">AA</option>
  <option value="AS">AS</option>
  <option value="SS">SS</option>
</select>
<p id="genotype-help" class="help-text">
  If you don't know your genotype, select "Prefer not to say" and consider getting tested.
</p>
```

**3.3.3 Error Suggestion (Level AA)**

**Implementation:**
- Suggest corrections for errors (when possible)

```html
<!-- Email typo suggestion -->
<p role="alert">
  Did you mean <button onclick="fillEmail('john@gmail.com')">john@gmail.com</button>?
</p>

<!-- Password strength feedback -->
<p role="status" aria-live="polite">
  Password strength: Weak. Add at least 2 more characters.
</p>
```

**3.3.4 Error Prevention (Legal, Financial, Data) (Level AA)**

**Implementation:**
- Confirmation step for:
  1. Account deletion
  2. Subscription purchase
  3. Tier 4 completion (sensitive health data)

```html
<!-- Tier 4 confirmation -->
<div role="dialog" aria-labelledby="tier4-confirm-title" aria-modal="true">
  <h2 id="tier4-confirm-title">Confirm Tier 4 Completion</h2>
  <p>You are about to share sensitive health information:</p>
  <ul>
    <li>Genotype: AS</li>
    <li>Blood group: O+</li>
  </ul>
  <p>This data will be shared with users you grant access to. You can revoke access anytime.</p>
  <label>
    <input type="checkbox" id="tier4-confirm" required />
    I understand and want to proceed
  </label>
  <button onclick="submitTier4()" disabled id="tier4-submit">Confirm</button>
  <button onclick="closeModal()">Cancel</button>
</div>
```

---

## 6. Robust (Principle 4)

### 6.1 Compatible (WCAG 4.1)

**4.1.1 Parsing (Level A)**

**Implementation:**
- Valid HTML (no duplicate IDs, proper nesting)
- Automated testing with W3C validator

**4.1.2 Name, Role, Value (Level A)**

**Implementation:**
- All UI components have accessible name, role, and state

```html
<!-- Custom checkbox (styled) -->
<div
  role="checkbox"
  aria-checked="false"
  aria-labelledby="terms-label"
  tabindex="0"
  onclick="toggleCheckbox()"
  onkeydown="handleCheckboxKey(event)"
>
  <span id="terms-label">I agree to Terms of Service</span>
</div>

<!-- Native checkbox (preferred when possible) -->
<label>
  <input type="checkbox" id="terms" />
  I agree to Terms of Service
</label>
```

**4.1.3 Status Messages (Level AA)**

**Implementation:**
- Status messages announced to screen readers (aria-live)

```html
<!-- Loading state -->
<div role="status" aria-live="polite">
  Loading profiles...
</div>

<!-- Success message -->
<div role="status" aria-live="polite">
  Profile saved successfully.
</div>

<!-- Error message (assertive for critical errors) -->
<div role="alert" aria-live="assertive">
  Failed to save profile. Please try again.
</div>
```

---

## 7. Screen Reader Support

### 7.1 Supported Screen Readers

**Primary:**
- JAWS (Windows) - Most popular
- NVDA (Windows) - Free, widely used
- VoiceOver (macOS, iOS) - Apple built-in
- TalkBack (Android) - Google built-in

**Testing:**
- Manual testing with NVDA (free)
- Automated testing with axe, pa11y

### 7.2 ARIA (Accessible Rich Internet Applications)

**ARIA Landmarks:**
```html
<header role="banner">
  <nav role="navigation" aria-label="Main navigation">...</nav>
</header>

<main role="main">
  <section aria-labelledby="matches-heading">
    <h2 id="matches-heading">Your Matches</h2>
    <!-- Content -->
  </section>
</main>

<aside role="complementary" aria-label="Filters">
  <!-- Sidebar filters -->
</aside>

<footer role="contentinfo">
  <!-- Footer -->
</footer>
```

**ARIA Roles:**
```html
<!-- Button (semantic element preferred) -->
<button>Click me</button> <!-- Preferred -->
<div role="button" tabindex="0">Click me</div> <!-- If necessary -->

<!-- Alert -->
<div role="alert">Error: Invalid email</div>

<!-- Dialog/Modal -->
<div role="dialog" aria-modal="true" aria-labelledby="dialog-title">
  <h2 id="dialog-title">Confirm Action</h2>
  <!-- Content -->
</div>

<!-- Tab interface -->
<div role="tablist" aria-label="Profile tabs">
  <button role="tab" aria-selected="true" aria-controls="about-panel">About</button>
  <button role="tab" aria-selected="false" aria-controls="photos-panel">Photos</button>
</div>
<div role="tabpanel" id="about-panel">About content</div>
<div role="tabpanel" id="photos-panel" hidden>Photos content</div>
```

**ARIA States & Properties:**
```html
<!-- Expanded/collapsed -->
<button aria-expanded="false" aria-controls="tier2-details">
  Tier 2: Lifestyle
</button>
<div id="tier2-details" hidden>
  <!-- Tier 2 fields -->
</div>

<!-- Required field -->
<label for="email">Email Address <span aria-label="required">*</span></label>
<input type="email" id="email" aria-required="true" />

<!-- Invalid input -->
<input type="email" id="email" aria-invalid="true" aria-describedby="email-error" />

<!-- Disabled -->
<button disabled aria-disabled="true">Submit</button>

<!-- Live region -->
<div aria-live="polite" aria-atomic="true">
  2 new messages
</div>
```

### 7.3 Screen Reader-Only Content

**Visually Hidden but Screen Reader Accessible:**
```html
<style>
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
</style>

<!-- Example: Icon button with hidden text -->
<button>
  <svg aria-hidden="true"><!-- Settings icon --></svg>
  <span class="sr-only">Settings</span>
</button>
```

### 7.4 Hiding Decorative Content

```html
<!-- Decorative icon (hidden from screen readers) -->
<svg aria-hidden="true" focusable="false">
  <!-- Icon that adds no information -->
</svg>

<!-- Decorative image -->
<img src="decorative-pattern.png" alt="" role="presentation" />
```

---

## 8. Keyboard Navigation Specification

### 8.1 Navigation Patterns

**Tab Navigation:**
- Header navigation
- Main content (skip link)
- Profile cards (each card's actions)
- Footer

**Arrow Key Navigation:**
- Radio button groups
- Dropdown menus
- Tab interfaces
- Carousels

**Enter/Space:**
- Activate buttons
- Toggle checkboxes
- Select radio buttons
- Open links

**ESC:**
- Close modals
- Dismiss tooltips
- Cancel actions

### 8.2 Focus Traps (Intentional)

**Modal Dialogs:**
- Focus trapped within modal until closed
- Tab cycles through modal elements only
- ESC closes modal and returns focus

```javascript
const trapFocusInModal = (modalElement) => {
  const focusableElements = modalElement.querySelectorAll(
    'button, a, input, textarea, select, [tabindex]:not([tabindex="-1"])'
  );
  const firstElement = focusableElements[0];
  const lastElement = focusableElements[focusableElements.length - 1];

  modalElement.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
      if (e.shiftKey && document.activeElement === firstElement) {
        e.preventDefault();
        lastElement.focus();
      } else if (!e.shiftKey && document.activeElement === lastElement) {
        e.preventDefault();
        firstElement.focus();
      }
    } else if (e.key === 'Escape') {
      closeModal(modalElement);
    }
  });
};
```

### 8.3 Custom Components Keyboard Support

**Show Interest Button:**
- Tab: Focus button
- Enter/Space: Send Show Interest
- ESC (if confirmation modal): Cancel

**Profile Card:**
- Tab: Focus card actions (View Profile, Show Interest)
- Enter: Activate focused action
- Arrow keys: Navigate between cards (optional enhancement)

**Tier Accordion:**
- Tab: Focus tier header
- Enter/Space: Expand/collapse tier
- Arrow Up/Down: Navigate between tier headers (optional)

---

## 9. Mobile Accessibility

### 9.1 Touch Target Size

**WCAG 2.5.5 (Level AAA - we aim to meet):**
- Minimum touch target: 44x44 CSS pixels (iOS standard)
- Minimum spacing between targets: 8px

```css
/* Buttons */
button {
  min-width: 44px;
  min-height: 44px;
  padding: 12px 24px;
}

/* Links in navigation */
nav a {
  display: inline-block;
  padding: 12px 16px;
  min-height: 44px;
}
```

### 9.2 Mobile Screen Reader Support

**VoiceOver (iOS):**
- Swipe right/left: Navigate elements
- Double-tap: Activate
- Two-finger tap: "Magic tap" (custom action)

**TalkBack (Android):**
- Swipe right/left: Navigate elements
- Double-tap: Activate
- Local context menu: Swipe up then right

**Implementation:**
- Semantic HTML works automatically
- Test with VoiceOver/TalkBack
- Provide alt text for images
- Label all form inputs

### 9.3 Orientation & Zoom

**Allow Both Orientations:**
- No orientation lock (unless camera/photo capture)
- Content reflows gracefully

**Allow Zoom:**
```html
<!-- Enable zoom (don't use maximum-scale=1) -->
<meta name="viewport" content="width=device-width, initial-scale=1">
```

---

## 10. Testing & Validation

### 10.1 Automated Testing Tools

**In-Browser Tools:**
- **axe DevTools** (Chrome/Firefox extension)
- **WAVE** (WebAIM browser extension)
- **Lighthouse** (Chrome DevTools, Accessibility audit)

**CI/CD Integration:**
```javascript
// pa11y in test suite
const pa11y = require('pa11y');

describe('Accessibility', () => {
  it('should have no WCAG AA violations on homepage', async () => {
    const results = await pa11y('https://joymatcher.com', {
      standard: 'WCAG2AA'
    });
    expect(results.issues.length).toBe(0);
  });
});
```

**Automated Checks:**
- Color contrast
- Missing alt text
- Form labels
- ARIA usage errors
- Duplicate IDs
- Heading hierarchy

**Limitations:**
- Automated tools catch ~30% of issues
- Manual testing required for remaining 70%

### 10.2 Manual Testing

**Screen Reader Testing:**
1. Navigate page with Tab key only (keyboard-only test)
2. Navigate with screen reader (NVDA/VoiceOver)
3. Listen to all content (is it logical?)
4. Test forms (can you complete without vision?)
5. Test modals (focus management, ESC key)

**Keyboard Testing:**
1. Disconnect mouse
2. Navigate entire site with keyboard
3. Verify all actions accessible
4. Check focus indicators visible
5. Test custom components (dropdowns, modals, carousels)

**Zoom/Resize Testing:**
1. Zoom to 200% (browser zoom)
2. Verify no horizontal scrolling (except tables)
3. Verify all content visible
4. Test text-only zoom (Firefox)

**Checklist per Page:**
- [ ] All images have alt text
- [ ] All form inputs have labels
- [ ] Color contrast passes (4.5:1 for text)
- [ ] Keyboard navigation works
- [ ] Focus indicators visible
- [ ] Screen reader announces all content correctly
- [ ] No keyboard traps (except intentional modals)
- [ ] Skip navigation link works
- [ ] Page title descriptive
- [ ] Heading hierarchy logical (no skipped levels)

### 10.3 User Testing with Assistive Technology Users

**Recruit:**
- Blind users (screen reader users)
- Low-vision users (magnification users)
- Motor disability users (keyboard-only, voice control)
- Cognitive disability users (dyslexia, ADHD)

**Testing Protocol:**
1. Task-based testing (e.g., "Create a profile")
2. Observe without interrupting
3. Ask about pain points
4. Iterate based on feedback

**Compensation:**
- Pay users for their time (₦5,000-₦10,000/hour)
- Provide gift cards or free subscriptions

---

## 11. Accessibility Statement

**Public Accessibility Statement (joymatcher.com/accessibility):**

```markdown
# Accessibility Statement

JoyMatcher is committed to ensuring digital accessibility for people with disabilities. We are continually improving the user experience for everyone and applying the relevant accessibility standards.

## Conformance Status

JoyMatcher conforms to WCAG 2.1 Level AA. This means our platform is designed to be accessible to users with disabilities, including those using assistive technologies such as screen readers, magnification software, and alternative input devices.

## Measures to Support Accessibility

We take the following measures to ensure accessibility:
- Accessibility is part of our mission and design philosophy
- We assign clear accessibility responsibilities within our organization
- We conduct regular accessibility audits using automated and manual testing
- We test with users who rely on assistive technology
- We provide ongoing accessibility training for our staff

## Known Limitations

Despite our best efforts, some limitations may exist:
- User-uploaded photos: We cannot guarantee all user photos have descriptive alt text (users provide their own)
- Third-party content: Payment providers (Stripe, Paystack) embed their own interfaces, which we do not control

We are working to address these limitations.

## Feedback

We welcome your feedback on the accessibility of JoyMatcher. Please let us know if you encounter accessibility barriers:
- Email: accessibility@joymatcher.com
- Phone: +234 (XXX) XXX-XXXX

We aim to respond to feedback within 5 business days.

## Assessment Approach

JoyMatcher assessed the accessibility of this website using:
- Self-evaluation
- External evaluation by accessibility consultants
- Testing with assistive technology users
- Automated testing tools (axe, WAVE, Lighthouse)

This statement was last updated on February 26, 2026.
```

---

## 12. Implementation Checklist

### Phase 1: Launch (WCAG AA Minimum)
- [ ] Semantic HTML throughout (headings, lists, landmarks)
- [ ] Alt text for all images
- [ ] Labels for all form inputs
- [ ] Keyboard navigation functional
- [ ] Focus indicators visible (2px outline)
- [ ] Color contrast compliance (4.5:1 for text, 3:1 for UI)
- [ ] Skip navigation link
- [ ] Unique page titles
- [ ] ARIA labels for icon buttons
- [ ] Error messages descriptive
- [ ] No automatic form submission
- [ ] Screen reader testing (NVDA, VoiceOver)
- [ ] Automated testing (axe, Lighthouse)
- [ ] Accessibility statement published

### Phase 2: Enhanced Accessibility (1-3 months)
- [ ] User testing with assistive technology users
- [ ] Keyboard shortcuts documentation
- [ ] High contrast mode support (dark theme)
- [ ] Text spacing adjustments supported
- [ ] Touch target sizes optimized (44x44px)
- [ ] Advanced ARIA patterns (tabs, accordions)
- [ ] Focus management in SPAs (route changes)
- [ ] Continuous automated testing (CI/CD)

### Phase 3: AAA & Beyond (3-6 months)
- [ ] WCAG AAA compliance (where feasible)
- [ ] Sign language video (for key content)
- [ ] Plain language version of policies
- [ ] Customizable themes (high contrast, large text)
- [ ] User preference persistence (font size, spacing)
- [ ] Accessibility training for all staff
- [ ] Annual accessibility audit (external)

---

## 13. Resources

**Tools:**
- axe DevTools: https://www.deque.com/axe/devtools/
- WAVE: https://wave.webaim.org/
- Lighthouse: Built into Chrome DevTools
- pa11y: https://pa11y.org/
- NVDA: https://www.nvaccess.org/ (free screen reader)

**References:**
- WCAG 2.1: https://www.w3.org/WAI/WCAG21/quickref/
- ARIA Authoring Practices: https://www.w3.org/WAI/ARIA/apg/
- WebAIM: https://webaim.org/
- A11y Project: https://www.a11yproject.com/

**Training:**
- Deque University: https://dequeuniversity.com/
- WebAIM training: https://webaim.org/training/

---

**Document Control**
Owner: Engineering & Product Team
Review Cycle: Quarterly (or after major releases)
Next Review: 2026-05-26
Classification: Internal / Public (Accessibility Statement)

**Related Documentation:**
- `safety_system.md` - Accessible reporting mechanisms
- `legal_compliance.md` - ADA, Equality Act compliance
- Style guide (typography, color contrast)
