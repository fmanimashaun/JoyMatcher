# Component Library — JoyMatcher

**Version:** 1.0.0
**Last Updated:** 2026-02-26
**Status:** Complete Reference
**Tailwind CSS Version:** v4.x

---

## 1. Introduction

This component library provides reusable UI patterns for JoyMatcher. All components are built with Tailwind CSS v4 utility classes, maintain WCAG 2.1 AA accessibility standards, and reflect our premium, trust-based design aesthetic.

### Design Principles

- **Utility-First:** Use Tailwind classes directly, no custom CSS
- **Accessible:** WCAG 2.1 AA compliant with keyboard navigation
- **Consistent:** Follow design tokens and brand guidelines
- **Responsive:** Mobile-first, adaptable to all screen sizes
- **Semantic:** Proper HTML5 and ARIA markup

### Component Categories

1. **Basic:** Buttons, Tags, Links
2. **Data Entry:** Forms, Inputs, Selects, Toggles
3. **Navigation:** Headers, Menus, Breadcrumbs
4. **Containers:** Cards, Modals, Panels
5. **Feedback:** Alerts, Toasts, Loading States
6. **Data Display:** Tables, Lists, Badges

---

## 2. Basic Components

### 2.1 Buttons

#### Primary Button (Deep Purple)

```html
<button class="flex items-center gap-2 bg-[#4D0052] text-white/95 hover:bg-[#7D3365] active:bg-[#3A003D] px-6 py-3 rounded-xl shadow-[0_2px_8px_rgba(77,0,82,0.12)] transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-[#4D0052] focus:ring-offset-2">
  <span class="whitespace-nowrap font-semibold">Upgrade to Premium</span>
</button>
```

**Accessibility:**
- Sufficient color contrast (10.8:1)
- Visible focus ring
- Min height 44px for touch targets
- Semantic `<button>` element

**States:**
- Default: Deep purple with subtle shadow
- Hover: Lighter purple (`#7D3365`)
- Active: Darker purple (`#3A003D`)
- Focus: Ring with offset
- Disabled: Add `disabled` attribute and `disabled:opacity-50 disabled:cursor-not-allowed`

**Variants:**

```html
<!-- With leading icon -->
<button class="flex items-center gap-2 bg-[#4D0052] text-white/95 hover:bg-[#7D3365] px-6 py-3 rounded-xl shadow-[0_2px_8px_rgba(77,0,82,0.12)] transition">
  <iconify-icon icon="lucide:check" class="text-lg"></iconify-icon>
  <span class="whitespace-nowrap font-semibold">Confirm</span>
</button>

<!-- Full width -->
<button class="w-full flex items-center justify-center gap-2 bg-[#4D0052] text-white/95 hover:bg-[#7D3365] px-6 py-3 rounded-xl shadow-[0_2px_8px_rgba(77,0,82,0.12)] transition">
  <span class="whitespace-nowrap font-semibold">Continue</span>
</button>

<!-- Disabled -->
<button disabled class="flex items-center gap-2 bg-[#4D0052] text-white/95 px-6 py-3 rounded-xl shadow-[0_2px_8px_rgba(77,0,82,0.12)] disabled:opacity-50 disabled:cursor-not-allowed">
  <span class="whitespace-nowrap font-semibold">Processing...</span>
</button>
```

#### Secondary Button (Coral Accent)

```html
<button class="flex items-center gap-2 bg-[#F16A6F] text-white/95 hover:bg-[#C4446D] active:bg-[#C4446D] px-6 py-3 rounded-xl shadow-[0_2px_8px_rgba(241,106,111,0.12)] transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-[#F16A6F] focus:ring-offset-2">
  <span class="whitespace-nowrap font-semibold">Show Interest</span>
</button>
```

**Usage:** Warm, inviting actions (Show Interest, Accept, Connect)

#### Outline Button

```html
<button class="flex items-center gap-2 bg-white border-2 border-[#4D0052] text-[#4D0052] hover:bg-[#4D0052]/5 active:bg-[#4D0052]/10 px-6 py-3 rounded-xl transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-[#4D0052] focus:ring-offset-2">
  <span class="whitespace-nowrap font-semibold">Learn More</span>
</button>
```

**Usage:** Secondary actions, cancel buttons

#### Ghost Button (Text Button)

```html
<button class="flex items-center gap-2 text-[#4D0052] hover:text-[#7D3365] hover:bg-[#4D0052]/5 px-4 py-2 rounded-lg transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-[#4D0052] focus:ring-offset-2">
  <span class="whitespace-nowrap">Skip for now</span>
</button>
```

**Usage:** Tertiary actions, less important options

#### Icon Button

```html
<button class="flex items-center justify-center w-10 h-10 rounded-lg hover:bg-[#4D0052]/5 active:bg-[#4D0052]/10 transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-[#4D0052]" aria-label="Settings">
  <iconify-icon icon="lucide:settings" class="text-xl text-[hsla(320,30%,35%,1)]"></iconify-icon>
</button>
```

**Accessibility:**
- Always include `aria-label` for screen readers
- Minimum 44x44px touch target
- Visible focus ring

#### Loading Button

```html
<button disabled class="flex items-center gap-2 bg-[#4D0052] text-white/95 px-6 py-3 rounded-xl disabled:opacity-75 disabled:cursor-wait">
  <div class="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
  <span class="whitespace-nowrap font-semibold">Processing...</span>
</button>
```

---

### 2.2 Tags & Filters

#### Filter Tags (Radio Group)

```html
<div class="flex gap-3 overflow-x-auto [&::-webkit-scrollbar]:hidden">
  <!-- Tag 1 - Active -->
  <label class="cursor-pointer">
    <input type="radio" name="tier-filter" value="all" class="sr-only peer" checked>
    <div class="px-5 py-2 rounded-full border border-[hsla(320,25%,85%,1)] bg-white text-[hsla(320,30%,35%,1)] peer-checked:bg-[#4D0052] peer-checked:text-white/95 peer-checked:border-[#4D0052] hover:border-[#7D3365] transition-all duration-150 whitespace-nowrap">
      All Users
    </div>
  </label>

  <!-- Tag 2 -->
  <label class="cursor-pointer">
    <input type="radio" name="tier-filter" value="premium" class="sr-only peer">
    <div class="px-5 py-2 rounded-full border border-[hsla(320,25%,85%,1)] bg-white text-[hsla(320,30%,35%,1)] peer-checked:bg-[#4D0052] peer-checked:text-white/95 peer-checked:border-[#4D0052] hover:border-[#7D3365] transition-all duration-150 whitespace-nowrap">
      Premium Only
    </div>
  </label>

  <!-- Tag 3 -->
  <label class="cursor-pointer">
    <input type="radio" name="tier-filter" value="verified" class="sr-only peer">
    <div class="px-5 py-2 rounded-full border border-[hsla(320,25%,85%,1)] bg-white text-[hsla(320,30%,35%,1)] peer-checked:bg-[#4D0052] peer-checked:text-white/95 peer-checked:border-[#4D0052] hover:border-[#7D3365] transition-all duration-150 whitespace-nowrap">
      Verified
    </div>
  </label>
</div>
```

**Accessibility:**
- Hidden radio inputs with `sr-only`
- Keyboard navigable (tab + arrow keys)
- Visual indication of selected state
- Cursor pointer on hover

**Behavior:**
- Horizontal scrollable on mobile
- Single selection (radio group)
- Instant filter application

#### Status Badge

```html
<!-- Success (Verified) -->
<span class="inline-flex items-center gap-1 px-3 py-1 bg-[#E8E4F0] text-[#8B7AA8] rounded-full text-sm font-semibold">
  <iconify-icon icon="lucide:check-circle" class="text-base"></iconify-icon>
  Verified
</span>

<!-- Error (Declined) -->
<span class="inline-flex items-center gap-1 px-3 py-1 bg-[#FFE8E9] text-[#F16A6F] rounded-full text-sm font-semibold">
  <iconify-icon icon="lucide:x-circle" class="text-base"></iconify-icon>
  Declined
</span>

<!-- Warning (Pending) -->
<span class="inline-flex items-center gap-1 px-3 py-1 bg-[#FFF4E6] text-[#E8A87C] rounded-full text-sm font-semibold">
  <iconify-icon icon="lucide:clock" class="text-base"></iconify-icon>
  Pending
</span>

<!-- Info (Premium) -->
<span class="inline-flex items-center gap-1 px-3 py-1 bg-[#E5E0F5] text-[#5B4A8E] rounded-full text-sm font-semibold">
  <iconify-icon icon="lucide:star" class="text-base"></iconify-icon>
  Premium
</span>
```

---

### 2.3 Links

#### Default Link

```html
<a href="#" class="text-[#4D0052] hover:text-[#7D3365] hover:underline transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-[#4D0052] focus:ring-offset-2 rounded">
  View full profile
</a>
```

#### Link with Icon

```html
<a href="#" class="inline-flex items-center gap-2 text-[#4D0052] hover:text-[#7D3365] transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-[#4D0052] focus:ring-offset-2 rounded">
  <span>Learn more about tiers</span>
  <iconify-icon icon="lucide:external-link" class="text-base"></iconify-icon>
</a>
```

#### Breadcrumb Link

```html
<nav aria-label="Breadcrumb" class="flex items-center gap-2 text-sm">
  <a href="/" class="text-[hsla(320,30%,35%,1)] hover:text-[#4D0052] transition">Home</a>
  <iconify-icon icon="lucide:chevron-right" class="text-sm text-[hsla(320,20%,55%,1)]"></iconify-icon>
  <a href="/discover" class="text-[hsla(320,30%,35%,1)] hover:text-[#4D0052] transition">Discover</a>
  <iconify-icon icon="lucide:chevron-right" class="text-sm text-[hsla(320,20%,55%,1)]"></iconify-icon>
  <span class="text-[hsla(320,50%,15%,1)] font-semibold" aria-current="page">Profile</span>
</nav>
```

---

## 3. Data Entry Components

### 3.1 Text Input

#### Standard Input

```html
<div class="flex flex-col gap-2">
  <label for="display-name" class="text-sm font-semibold text-[hsla(320,50%,15%,1)]">
    Display Name
    <span class="text-[#F16A6F]">*</span>
  </label>
  <input
    type="text"
    id="display-name"
    name="display-name"
    placeholder="Enter your display name"
    class="w-full px-4 py-3 bg-white border border-[hsla(320,25%,85%,1)] rounded-xl text-[hsla(320,50%,15%,1)] placeholder:text-[hsla(320,15%,70%,1)] hover:border-[#7D3365] focus:outline-none focus:border-[#7D3365] focus:ring-2 focus:ring-[#4D0052]/20 transition-colors duration-150"
    required
  >
  <span class="text-xs text-[hsla(320,30%,35%,1)]">This is how others will see your name.</span>
</div>
```

**Accessibility:**
- Label with `for` attribute matching input `id`
- Required indicator (asterisk)
- Helper text below input
- Placeholder for additional context
- Visible focus ring

#### Input with Error

```html
<div class="flex flex-col gap-2">
  <label for="email" class="text-sm font-semibold text-[hsla(320,50%,15%,1)]">
    Email Address
    <span class="text-[#F16A6F]">*</span>
  </label>
  <input
    type="email"
    id="email"
    name="email"
    value="invalid-email"
    class="w-full px-4 py-3 bg-white border-2 border-[#F16A6F] rounded-xl text-[hsla(320,50%,15%,1)] focus:outline-none focus:ring-2 focus:ring-[#F16A6F]/20 transition"
    aria-invalid="true"
    aria-describedby="email-error"
  >
  <span id="email-error" class="flex items-center gap-1 text-xs text-[#F16A6F]" role="alert">
    <iconify-icon icon="lucide:alert-circle" class="text-sm"></iconify-icon>
    Please enter a valid email address
  </span>
</div>
```

**Accessibility:**
- `aria-invalid="true"` on input
- `aria-describedby` linking to error message
- `role="alert"` on error message
- Red border indicating error state

#### Input with Success

```html
<div class="flex flex-col gap-2">
  <label for="username" class="text-sm font-semibold text-[hsla(320,50%,15%,1)]">
    Username
  </label>
  <div class="relative">
    <input
      type="text"
      id="username"
      name="username"
      value="joyful_user"
      class="w-full px-4 py-3 pr-10 bg-white border-2 border-[#8B7AA8] rounded-xl text-[hsla(320,50%,15%,1)] focus:outline-none focus:ring-2 focus:ring-[#8B7AA8]/20 transition"
    >
    <iconify-icon icon="lucide:check-circle" class="absolute right-3 top-1/2 -translate-y-1/2 text-xl text-[#8B7AA8]"></iconify-icon>
  </div>
  <span class="flex items-center gap-1 text-xs text-[#8B7AA8]">
    <iconify-icon icon="lucide:check" class="text-sm"></iconify-icon>
    Username is available
  </span>
</div>
```

#### Textarea

```html
<div class="flex flex-col gap-2">
  <label for="bio" class="text-sm font-semibold text-[hsla(320,50%,15%,1)]">
    About Me
    <span class="text-[#F16A6F]">*</span>
  </label>
  <textarea
    id="bio"
    name="bio"
    rows="4"
    placeholder="Tell us about yourself..."
    class="w-full px-4 py-3 bg-white border border-[hsla(320,25%,85%,1)] rounded-xl text-[hsla(320,50%,15%,1)] placeholder:text-[hsla(320,15%,70%,1)] hover:border-[#7D3365] focus:outline-none focus:border-[#7D3365] focus:ring-2 focus:ring-[#4D0052]/20 transition-colors duration-150 resize-y"
    maxlength="500"
    required
  ></textarea>
  <div class="flex justify-between items-center">
    <span class="text-xs text-[hsla(320,30%,35%,1)]">Max 500 characters</span>
    <span class="text-xs text-[hsla(320,20%,55%,1)]">0 / 500</span>
  </div>
</div>
```

---

### 3.2 Select/Dropdown

#### Standard Select

```html
<div class="flex flex-col gap-2">
  <label for="country" class="text-sm font-semibold text-[hsla(320,50%,15%,1)]">
    Country
    <span class="text-[#F16A6F]">*</span>
  </label>
  <div class="relative">
    <select
      id="country"
      name="country"
      class="w-full appearance-none px-4 py-3 pr-10 bg-white border border-[hsla(320,25%,85%,1)] rounded-xl text-[hsla(320,50%,15%,1)] hover:border-[#7D3365] focus:outline-none focus:border-[#7D3365] focus:ring-2 focus:ring-[#4D0052]/20 transition-colors duration-150 cursor-pointer"
      required
    >
      <option value="">Select your country</option>
      <option value="NG">Nigeria</option>
      <option value="GH">Ghana</option>
      <option value="KE">Kenya</option>
      <option value="US">United States</option>
      <option value="UK">United Kingdom</option>
      <option value="CA">Canada</option>
    </select>
    <div class="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
      <iconify-icon icon="lucide:chevron-down" class="text-xl text-[hsla(320,30%,35%,1)]"></iconify-icon>
    </div>
  </div>
</div>
```

**Accessibility:**
- Native `<select>` element (keyboard accessible)
- Custom styled with Tailwind
- Icon positioned absolutely
- Clear focus states

#### Custom Dropdown (Advanced)

```html
<!-- Trigger -->
<button
  type="button"
  class="flex items-center justify-between w-full px-4 py-3 bg-white border border-[hsla(320,25%,85%,1)] rounded-xl text-[hsla(320,30%,35%,1)] hover:border-[#7D3365] focus:outline-none focus:border-[#7D3365] focus:ring-2 focus:ring-[#4D0052]/20 transition cursor-pointer"
  aria-haspopup="listbox"
  aria-expanded="false"
  id="tier-select"
>
  <span>Select tier level</span>
  <iconify-icon icon="lucide:chevron-down" class="text-xl"></iconify-icon>
</button>

<!-- Dropdown Menu (hidden by default) -->
<div
  role="listbox"
  aria-labelledby="tier-select"
  class="hidden absolute mt-2 w-full bg-white border border-[hsla(320,25%,85%,1)] rounded-xl shadow-[0_4px_16px_rgba(77,0,82,0.12)] overflow-hidden z-10"
>
  <div
    role="option"
    tabindex="0"
    class="px-4 py-3 hover:bg-[#4D0052]/5 cursor-pointer transition"
  >
    Tier 1 - Identity & Intent
  </div>
  <div
    role="option"
    tabindex="0"
    class="px-4 py-3 hover:bg-[#4D0052]/5 cursor-pointer transition"
  >
    Tier 2 - Lifestyle
  </div>
  <div
    role="option"
    tabindex="0"
    class="px-4 py-3 hover:bg-[#4D0052]/5 cursor-pointer transition"
  >
    Tier 3 - Relationship
  </div>
</div>
```

**Accessibility:**
- `role="listbox"` and `role="option"`
- `aria-haspopup` and `aria-expanded`
- Keyboard navigation (arrow keys, Enter, Esc)
- Focus management

---

### 3.3 Checkbox

```html
<label class="flex items-center gap-3 cursor-pointer">
  <input type="checkbox" class="sr-only peer" id="agree-terms">
  <div class="w-5 h-5 bg-white border border-[hsla(320,25%,85%,1)] rounded flex items-center justify-center peer-checked:bg-[#4D0052] peer-checked:border-[#4D0052] peer-focus:ring-2 peer-focus:ring-[#4D0052]/20 text-transparent peer-checked:text-white/95 transition">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="w-3 h-3">
      <polyline points="20 6 9 17 4 12"></polyline>
    </svg>
  </div>
  <span class="text-[hsla(320,30%,35%,1)]">
    I agree to the <a href="/terms" class="text-[#4D0052] hover:underline">Terms of Service</a>
  </span>
</label>
```

**Accessibility:**
- Hidden native checkbox with `sr-only`
- Custom styled checkbox using peer utilities
- Visible focus ring
- Semantic label wrapping

**Multi-Checkbox Group:**

```html
<fieldset class="flex flex-col gap-3">
  <legend class="text-sm font-semibold text-[hsla(320,50%,15%,1)] mb-2">
    Interests <span class="text-[#F16A6F]">*</span>
  </legend>

  <label class="flex items-center gap-3 cursor-pointer">
    <input type="checkbox" name="interests" value="travel" class="sr-only peer">
    <div class="w-5 h-5 bg-white border border-[hsla(320,25%,85%,1)] rounded flex items-center justify-center peer-checked:bg-[#4D0052] peer-checked:border-[#4D0052] peer-focus:ring-2 peer-focus:ring-[#4D0052]/20 text-transparent peer-checked:text-white/95 transition">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="w-3 h-3">
        <polyline points="20 6 9 17 4 12"></polyline>
      </svg>
    </div>
    <span class="text-[hsla(320,30%,35%,1)]">Travel & Adventure</span>
  </label>

  <label class="flex items-center gap-3 cursor-pointer">
    <input type="checkbox" name="interests" value="reading" class="sr-only peer">
    <div class="w-5 h-5 bg-white border border-[hsla(320,25%,85%,1)] rounded flex items-center justify-center peer-checked:bg-[#4D0052] peer-checked:border-[#4D0052] peer-focus:ring-2 peer-focus:ring-[#4D0052]/20 text-transparent peer-checked:text-white/95 transition">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="w-3 h-3">
        <polyline points="20 6 9 17 4 12"></polyline>
      </svg>
    </div>
    <span class="text-[hsla(320,30%,35%,1)]">Reading & Literature</span>
  </label>
</fieldset>
```

---

### 3.4 Radio Button

```html
<fieldset class="flex flex-col gap-3">
  <legend class="text-sm font-semibold text-[hsla(320,50%,15%,1)] mb-2">
    Relationship Intent <span class="text-[#F16A6F]">*</span>
  </legend>

  <label class="flex items-center gap-3 cursor-pointer">
    <input type="radio" name="intent" value="1-2-years" class="sr-only peer" checked>
    <div class="w-5 h-5 bg-white border border-[hsla(320,25%,85%,1)] rounded-full flex items-center justify-center peer-checked:bg-[#4D0052] peer-checked:border-[#4D0052] peer-focus:ring-2 peer-focus:ring-[#4D0052]/20 text-transparent peer-checked:text-white/95 transition">
      <svg width="10" height="10" viewBox="0 10 10" fill="currentColor">
        <circle cx="5" cy="5" r="5"/>
      </svg>
    </div>
    <span class="text-[hsla(320,30%,35%,1)]">Marriage within 1-2 years</span>
  </label>

  <label class="flex items-center gap-3 cursor-pointer">
    <input type="radio" name="intent" value="long-term" class="sr-only peer">
    <div class="w-5 h-5 bg-white border border-[hsla(320,25%,85%,1)] rounded-full flex items-center justify-center peer-checked:bg-[#4D0052] peer-checked:border-[#4D0052] peer-focus:ring-2 peer-focus:ring-[#4D0052]/20 text-transparent peer-checked:text-white/95 transition">
      <svg width="10" height="10" viewBox="0 10 10" fill="currentColor">
        <circle cx="5" cy="5" r="5"/>
      </svg>
    </div>
    <span class="text-[hsla(320,30%,35%,1)]">Long-term leading to marriage</span>
  </label>
</fieldset>
```

---

### 3.5 Toggle/Switch

```html
<label class="flex items-center justify-between cursor-pointer">
  <span class="text-[hsla(320,30%,35%,1)]">Enable email notifications</span>
  <div class="relative">
    <input type="checkbox" class="sr-only peer">
    <div class="w-12 h-6 bg-[hsla(320,20%,90%,1)] peer-checked:bg-[#4D0052] rounded-full peer-focus:ring-2 peer-focus:ring-[#4D0052]/20 transition"></div>
    <div class="absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-sm peer-checked:translate-x-6 transition"></div>
  </div>
</label>
```

**Accessibility:**
- Checkbox input (semantic)
- Keyboard accessible
- Visual focus ring
- Clear on/off states

---

### 3.6 Progress Bar

```html
<div class="flex flex-col gap-2">
  <div class="flex justify-between items-center">
    <span class="text-sm font-semibold text-[hsla(320,50%,15%,1)]">Profile Completion</span>
    <span class="text-sm font-semibold text-[#4D0052]">60%</span>
  </div>
  <div class="h-2 bg-[hsla(320,20%,90%,1)] rounded-full overflow-hidden">
    <div class="h-full bg-gradient-to-r from-[#4D0052] to-[#F16A6F] rounded-full transition-all duration-500" style="width: 60%"></div>
  </div>
  <span class="text-xs text-[hsla(320,30%,35%,1)]">Complete Tier 3 to unlock Premium features</span>
</div>
```

**Usage:**
- Tier completion indicators
- Subscription progress
- Multi-step form progress

**Accessibility:**
- Include `role="progressbar"`, `aria-valuenow`, `aria-valuemin`, `aria-valuemax` for screen readers

```html
<div
  role="progressbar"
  aria-valuenow="60"
  aria-valuemin="0"
  aria-valuemax="100"
  class="h-2 bg-[hsla(320,20%,90%,1)] rounded-full overflow-hidden"
>
  <div class="h-full bg-gradient-to-r from-[#4D0052] to-[#F16A6F] rounded-full" style="width: 60%"></div>
</div>
```

---

## 4. Navigation Components

### 4.1 Horizontal Navigation (Header)

```html
<nav class="flex items-center justify-between w-full px-12 py-4 bg-[hsla(320,18%,96%,1)]">
  <!-- Left Section: Logo + Menu -->
  <div class="flex items-center gap-12">
    <!-- Logo -->
    <a href="/" class="flex items-center gap-3">
      <div class="w-10 h-10 bg-gradient-to-br from-[#4D0052] to-[#F16A6F] rounded-lg flex items-center justify-center">
        <iconify-icon icon="lucide:heart" class="text-xl text-white/95"></iconify-icon>
      </div>
      <span class="text-2xl font-bold text-[#4D0052]">JoyMatcher</span>
    </a>

    <!-- Menu Items -->
    <a href="/discover" class="flex items-center gap-2 text-[hsla(320,30%,35%,1)] hover:text-[#4D0052] transition cursor-pointer">
      Discover
    </a>
    <a href="/matches" class="flex items-center gap-2 text-[hsla(320,30%,35%,1)] hover:text-[#4D0052] transition cursor-pointer">
      Matches
    </a>
    <a href="/messages" class="flex items-center gap-2 text-[hsla(320,30%,35%,1)] hover:text-[#4D0052] transition cursor-pointer">
      Messages
    </a>
  </div>

  <!-- Right Section: Notifications + Avatar -->
  <div class="flex items-center gap-6">
    <!-- Notification Icon -->
    <button class="relative flex items-center justify-center w-10 h-10 hover:bg-[#4D0052]/5 rounded-lg transition cursor-pointer" aria-label="Notifications">
      <iconify-icon icon="lucide:bell" class="text-xl text-[hsla(320,30%,35%,1)]"></iconify-icon>
      <!-- Badge (if unread) -->
      <span class="absolute -top-1 -right-1 w-5 h-5 bg-[#F16A6F] rounded-full flex items-center justify-center text-xs text-white/95 font-semibold">
        3
      </span>
    </button>

    <!-- User Avatar -->
    <button class="flex items-center gap-2 cursor-pointer" aria-label="User menu">
      <img src="avatar.jpg" alt="User avatar" class="w-9 h-9 rounded-full border-2 border-[#4D0052]/20 object-cover">
      <iconify-icon icon="lucide:chevron-down" class="text-base text-[hsla(320,30%,35%,1)]"></iconify-icon>
    </button>
  </div>
</nav>
```

---

### 4.2 Vertical Navigation (Sidebar)

```html
<aside class="flex flex-col w-64 h-screen bg-[hsla(320,18%,96%,1)] border-r border-[hsla(320,25%,85%,1)]">
  <!-- Logo -->
  <div class="flex items-center gap-3 px-6 py-6 border-b border-[hsla(320,25%,85%,1)]">
    <div class="w-10 h-10 bg-gradient-to-br from-[#4D0052] to-[#F16A6F] rounded-lg flex items-center justify-center">
      <iconify-icon icon="lucide:heart" class="text-xl text-white/95"></iconify-icon>
    </div>
    <span class="text-xl font-bold text-[#4D0052]">JoyMatcher</span>
  </div>

  <!-- Navigation Items -->
  <nav class="flex-1 px-4 py-6 space-y-2">
    <!-- Active Item -->
    <a href="/dashboard" class="flex items-center gap-3 px-4 py-3 bg-[#4D0052]/10 border-l-[3px] border-l-[#4D0052] text-[#4D0052] font-semibold rounded-r-lg transition">
      <iconify-icon icon="lucide:layout-dashboard" class="text-xl"></iconify-icon>
      <span>Dashboard</span>
    </a>

    <!-- Default Item -->
    <a href="/discover" class="flex items-center gap-3 px-4 py-3 text-[hsla(320,30%,35%,1)] hover:bg-[#4D0052]/5 hover:text-[#4D0052] rounded-lg transition">
      <iconify-icon icon="lucide:search" class="text-xl"></iconify-icon>
      <span>Discover</span>
    </a>

    <a href="/matches" class="flex items-center gap-3 px-4 py-3 text-[hsla(320,30%,35%,1)] hover:bg-[#4D0052]/5 hover:text-[#4D0052] rounded-lg transition">
      <iconify-icon icon="lucide:heart" class="text-xl"></iconify-icon>
      <span>Matches</span>
      <span class="ml-auto px-2 py-0.5 bg-[#F16A6F] text-white/95 text-xs font-semibold rounded-full">5</span>
    </a>

    <a href="/messages" class="flex items-center gap-3 px-4 py-3 text-[hsla(320,30%,35%,1)] hover:bg-[#4D0052]/5 hover:text-[#4D0052] rounded-lg transition">
      <iconify-icon icon="lucide:message-circle" class="text-xl"></iconify-icon>
      <span>Messages</span>
    </a>
  </nav>

  <!-- Bottom Section -->
  <div class="px-4 py-6 border-t border-[hsla(320,25%,85%,1)]">
    <button class="flex items-center gap-3 w-full px-4 py-3 text-[hsla(320,30%,35%,1)] hover:bg-[#4D0052]/5 hover:text-[#4D0052] rounded-lg transition">
      <iconify-icon icon="lucide:settings" class="text-xl"></iconify-icon>
      <span>Settings</span>
    </button>
  </div>
</aside>
```

---

## 5. Container Components

### 5.1 Cards

#### Vertical Profile Card (Image + Text)

```html
<div class="bg-white rounded-2xl shadow-[0_4px_16px_rgba(77,0,82,0.12)] flex flex-col overflow-hidden hover:shadow-[0_8px_24px_rgba(77,0,82,0.16)] transition">
  <!-- Image -->
  <img src="profile.jpg" alt="User profile" class="w-full h-64 object-cover">

  <!-- Content -->
  <div class="flex flex-col gap-4 p-6">
    <!-- Header with Badge -->
    <div class="flex items-center justify-between">
      <h3 class="text-lg font-semibold text-[hsla(320,50%,15%,1)]">Sarah, 32</h3>
      <span class="inline-flex items-center gap-1 px-3 py-1 bg-[#E8E4F0] text-[#8B7AA8] rounded-full text-xs font-semibold">
        <iconify-icon icon="lucide:check-circle" class="text-sm"></iconify-icon>
        Verified
      </span>
    </div>

    <!-- Details -->
    <div class="flex flex-col gap-2">
      <p class="text-sm text-[hsla(320,30%,35%,1)]">
        <iconify-icon icon="lucide:map-pin" class="text-base"></iconify-icon>
        Lagos, Nigeria
      </p>
      <p class="text-sm text-[hsla(320,30%,35%,1)]">
        <iconify-icon icon="lucide:briefcase" class="text-base"></iconify-icon>
        Healthcare Professional
      </p>
    </div>

    <!-- Bio -->
    <p class="text-sm text-[hsla(320,30%,35%,1)] line-clamp-3">
      Looking for a serious relationship leading to marriage. Family-oriented and career-focused...
    </p>

    <!-- Action -->
    <button class="flex items-center justify-center gap-2 bg-[#F16A6F] text-white/95 hover:bg-[#C4446D] px-6 py-3 rounded-xl shadow-[0_2px_8px_rgba(241,106,111,0.12)] transition">
      <iconify-icon icon="lucide:heart" class="text-lg"></iconify-icon>
      <span class="font-semibold">Show Interest</span>
    </button>
  </div>
</div>
```

#### Horizontal Card (Side-by-Side Layout)

```html
<div class="bg-white rounded-2xl shadow-[0_4px_16px_rgba(77,0,82,0.12)] flex gap-6 p-6 hover:shadow-[0_8px_24px_rgba(77,0,82,0.16)] transition">
  <!-- Image -->
  <img src="profile.jpg" alt="User profile" class="rounded-xl h-32 w-32 object-cover flex-shrink-0">

  <!-- Content -->
  <div class="flex flex-col gap-3 flex-1">
    <div class="flex items-center justify-between">
      <h3 class="text-lg font-semibold text-[hsla(320,50%,15%,1)]">Michael, 35</h3>
      <span class="inline-flex items-center gap-1 px-3 py-1 bg-[#E5E0F5] text-[#5B4A8E] rounded-full text-xs font-semibold">
        Premium
      </span>
    </div>

    <p class="text-sm text-[hsla(320,30%,35%,1)] line-clamp-2">
      Tech entrepreneur based in Accra. Looking for a partner who values family and ambition...
    </p>

    <div class="flex items-center gap-4 mt-auto">
      <button class="flex items-center gap-2 bg-[#F16A6F] text-white/95 hover:bg-[#C4446D] px-4 py-2 rounded-lg transition text-sm font-semibold">
        Show Interest
      </button>
      <button class="flex items-center gap-2 text-[#4D0052] hover:text-[#7D3365] transition text-sm">
        View Profile
      </button>
    </div>
  </div>
</div>
```

#### Premium Tier Card (Gradient Background)

```html
<div class="bg-gradient-to-br from-[#4D0052] to-[#7D3365] rounded-2xl flex flex-col gap-6 p-8 shadow-[0_8px_24px_rgba(77,0,82,0.20)]">
  <!-- Icon -->
  <div class="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center">
    <iconify-icon icon="lucide:crown" class="text-3xl text-white/95"></iconify-icon>
  </div>

  <!-- Content -->
  <div class="flex flex-col gap-3">
    <h3 class="text-2xl font-bold text-white/95">Premium Membership</h3>
    <p class="text-base text-white/75">
      Unlock Tiers 3-4, request deeper information, and connect with Premium users seeking serious relationships.
    </p>
  </div>

  <!-- Price -->
  <div class="flex flex-col gap-1">
    <span class="text-4xl font-bold text-white/95">₦18,000</span>
    <span class="text-sm text-white/75">per month</span>
  </div>

  <!-- CTA -->
  <button class="flex items-center justify-center gap-2 bg-[#F16A6F] text-white/95 hover:bg-[#C4446D] px-6 py-3 rounded-xl shadow-[0_2px_8px_rgba(241,106,111,0.12)] transition">
    <span class="font-semibold">Upgrade Now</span>
  </button>
</div>
```

---

### 5.2 Modals

#### Standard Modal

```html
<!-- Backdrop -->
<div class="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 flex items-center justify-center p-4">

  <!-- Modal -->
  <div class="bg-white rounded-2xl shadow-[0_8px_24px_rgba(77,0,82,0.16)] max-w-md w-full p-6 space-y-6 animate-[scaleIn_250ms_ease-out]">

    <!-- Header -->
    <div class="flex items-center justify-between">
      <h2 class="text-xl font-semibold text-[hsla(320,50%,15%,1)]">Confirm Action</h2>
      <button class="w-8 h-8 flex items-center justify-center hover:bg-[#4D0052]/5 rounded-lg transition" aria-label="Close modal">
        <iconify-icon icon="lucide:x" class="text-xl text-[hsla(320,30%,35%,1)]"></iconify-icon>
      </button>
    </div>

    <!-- Content -->
    <div class="space-y-4">
      <p class="text-base text-[hsla(320,30%,35%,1)]">
        Are you sure you want to proceed with this action? This cannot be undone.
      </p>
    </div>

    <!-- Actions -->
    <div class="flex items-center gap-3">
      <button class="flex-1 flex items-center justify-center gap-2 bg-[#4D0052] text-white/95 hover:bg-[#7D3365] px-6 py-3 rounded-xl transition">
        <span class="font-semibold">Confirm</span>
      </button>
      <button class="flex-1 flex items-center justify-center gap-2 bg-white border-2 border-[#4D0052] text-[#4D0052] hover:bg-[#4D0052]/5 px-6 py-3 rounded-xl transition">
        <span class="font-semibold">Cancel</span>
      </button>
    </div>

  </div>
</div>
```

**Accessibility:**
- `role="dialog"` and `aria-modal="true"` on modal
- `aria-labelledby` pointing to title
- Focus trap (prevent Tab from leaving modal)
- ESC key closes modal
- Focus returns to trigger element on close

#### Tier-Awareness Warning Modal

```html
<div class="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 flex items-center justify-center p-4">
  <div role="dialog" aria-modal="true" aria-labelledby="tier-warning-title" class="bg-white rounded-2xl shadow-[0_8px_24px_rgba(77,0,82,0.16)] max-w-lg w-full p-6 space-y-6">

    <!-- Warning Icon -->
    <div class="w-12 h-12 bg-[#FFF4E6] rounded-xl flex items-center justify-center mx-auto">
      <iconify-icon icon="lucide:alert-triangle" class="text-3xl text-[#E8A87C]"></iconify-icon>
    </div>

    <!-- Title -->
    <h2 id="tier-warning-title" class="text-xl font-semibold text-[hsla(320,50%,15%,1)] text-center">
      Tier Awareness
    </h2>

    <!-- Content -->
    <div class="space-y-4">
      <p class="text-base text-[hsla(320,30%,35%,1)]">
        <strong>Sarah</strong> is a <strong>Free user</strong> who has completed <strong>Tier 2</strong>.
      </p>

      <div class="bg-[#4D0052]/5 rounded-xl p-4 space-y-3">
        <div>
          <p class="text-sm font-semibold text-[hsla(320,50%,15%,1)] mb-2">You WILL see:</p>
          <ul class="text-sm text-[hsla(320,30%,35%,1)] space-y-1 list-disc list-inside">
            <li>Tier 1: Identity & Intent</li>
            <li>Tier 2: Lifestyle Compatibility</li>
          </ul>
        </div>

        <div>
          <p class="text-sm font-semibold text-[hsla(320,50%,15%,1)] mb-2">You will NOT see:</p>
          <ul class="text-sm text-[hsla(320,20%,55%,1)] space-y-1 list-disc list-inside">
            <li>Tier 3: Relationship & Family</li>
            <li>Tier 4: Health & Compatibility</li>
            <li>Tier 5: Verified Identity</li>
          </ul>
        </div>
      </div>

      <p class="text-sm text-[hsla(320,30%,35%,1)]">
        To view deeper information, you must complete those tiers yourself and have the appropriate subscription.
      </p>
    </div>

    <!-- Checkbox -->
    <label class="flex items-center gap-3 cursor-pointer">
      <input type="checkbox" class="sr-only peer" required>
      <div class="w-5 h-5 bg-white border border-[hsla(320,25%,85%,1)] rounded flex items-center justify-center peer-checked:bg-[#4D0052] peer-checked:border-[#4D0052] peer-focus:ring-2 peer-focus:ring-[#4D0052]/20 text-transparent peer-checked:text-white/95 transition">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 24 24" fill="none" stroke="currentColor" stroke-width="3" class="w-3 h-3">
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
      </div>
      <span class="text-sm text-[hsla(320,30%,35%,1)]">I understand the tier limitations</span>
    </label>

    <!-- Actions -->
    <div class="flex items-center gap-3">
      <button class="flex-1 bg-[#F16A6F] text-white/95 hover:bg-[#C4446D] px-6 py-3 rounded-xl transition font-semibold">
        Send Show Interest
      </button>
      <button class="px-6 py-3 text-[hsla(320,30%,35%,1)] hover:bg-[#4D0052]/5 rounded-xl transition">
        Cancel
      </button>
    </div>

  </div>
</div>
```

---

## 6. Feedback Components

### 6.1 Alert Messages

#### Success Alert

```html
<div role="alert" class="flex items-start gap-3 p-4 bg-[#E8E4F0] border-l-4 border-l-[#8B7AA8] rounded-lg">
  <iconify-icon icon="lucide:check-circle" class="text-xl text-[#8B7AA8] flex-shrink-0 mt-0.5"></iconify-icon>
  <div class="flex-1">
    <p class="text-sm font-semibold text-[#8B7AA8]">Success</p>
    <p class="text-sm text-[hsla(320,30%,35%,1)]">Your profile has been updated successfully.</p>
  </div>
  <button class="text-[hsla(320,30%,35%,1)] hover:text-[hsla(320,50%,15%,1)]" aria-label="Dismiss alert">
    <iconify-icon icon="lucide:x" class="text-lg"></iconify-icon>
  </button>
</div>
```

#### Error Alert

```html
<div role="alert" class="flex items-start gap-3 p-4 bg-[#FFE8E9] border-l-4 border-l-[#F16A6F] rounded-lg">
  <iconify-icon icon="lucide:x-circle" class="text-xl text-[#F16A6F] flex-shrink-0 mt-0.5"></iconify-icon>
  <div class="flex-1">
    <p class="text-sm font-semibold text-[#F16A6F]">Error</p>
    <p class="text-sm text-[hsla(320,30%,35%,1)]">Failed to save changes. Please try again.</p>
  </div>
  <button class="text-[hsla(320,30%,35%,1)] hover:text-[hsla(320,50%,15%,1)]" aria-label="Dismiss alert">
    <iconify-icon icon="lucide:x" class="text-lg"></iconify-icon>
  </button>
</div>
```

#### Warning Alert

```html
<div role="alert" class="flex items-start gap-3 p-4 bg-[#FFF4E6] border-l-4 border-l-[#E8A87C] rounded-lg">
  <iconify-icon icon="lucide:alert-triangle" class="text-xl text-[#E8A87C] flex-shrink-0 mt-0.5"></iconify-icon>
  <div class="flex-1">
    <p class="text-sm font-semibold text-[#E8A87C]">Warning</p>
    <p class="text-sm text-[hsla(320,30%,35%,1)]">Your subscription expires in 3 days. Renew now to avoid losing access.</p>
  </div>
  <button class="text-[hsla(320,30%,35%,1)] hover:text-[hsla(320,50%,15%,1)]" aria-label="Dismiss alert">
    <iconify-icon icon="lucide:x" class="text-lg"></iconify-icon>
  </button>
</div>
```

#### Info Alert

```html
<div role="alert" class="flex items-start gap-3 p-4 bg-[#E5E0F5] border-l-4 border-l-[#5B4A8E] rounded-lg">
  <iconify-icon icon="lucide:info" class="text-xl text-[#5B4A8E] flex-shrink-0 mt-0.5"></iconify-icon>
  <div class="flex-1">
    <p class="text-sm font-semibold text-[#5B4A8E]">Information</p>
    <p class="text-sm text-[hsla(320,30%,35%,1)]">Complete Tier 3 to unlock Premium features and deeper profile information.</p>
  </div>
  <button class="text-[hsla(320,30%,35%,1)] hover:text-[hsla(320,50%,15%,1)]" aria-label="Dismiss alert">
    <iconify-icon icon="lucide:x" class="text-lg"></iconify-icon>
  </button>
</div>
```

---

### 6.2 Toast Notifications

```html
<!-- Toast Container (fixed position) -->
<div aria-live="polite" class="fixed bottom-6 right-6 z-50 space-y-3">

  <!-- Success Toast -->
  <div class="bg-white border-l-4 border-l-[#8B7AA8] rounded-lg shadow-[0_4px_16px_rgba(77,0,82,0.12)] p-4 flex items-center gap-3 animate-[slideInRight_250ms_ease-out]">
    <iconify-icon icon="lucide:check-circle" class="text-xl text-[#8B7AA8]"></iconify-icon>
    <p class="text-sm text-[hsla(320,30%,35%,1)]">Message sent successfully</p>
    <button class="ml-auto text-[hsla(320,30%,35%,1)] hover:text-[hsla(320,50%,15%,1)]" aria-label="Dismiss">
      <iconify-icon icon="lucide:x" class="text-lg"></iconify-icon>
    </button>
  </div>

</div>
```

**Accessibility:**
- `aria-live="polite"` for screen reader announcements
- Auto-dismiss after 5 seconds
- Manual dismiss button
- Non-intrusive positioning

---

### 6.3 Loading States

#### Spinner

```html
<div class="inline-flex items-center gap-2">
  <div class="w-5 h-5 border-2 border-[#4D0052]/30 border-t-[#4D0052] rounded-full animate-spin"></div>
  <span class="text-sm text-[hsla(320,30%,35%,1)]">Loading...</span>
</div>
```

#### Skeleton Loading (Card)

```html
<div class="bg-white rounded-2xl shadow-[0_4px_16px_rgba(77,0,82,0.12)] p-6 space-y-4 animate-pulse">
  <!-- Image skeleton -->
  <div class="w-full h-48 bg-[hsla(320,20%,90%,1)] rounded-lg"></div>

  <!-- Text skeletons -->
  <div class="space-y-3">
    <div class="h-4 bg-[hsla(320,20%,90%,1)] rounded w-3/4"></div>
    <div class="h-4 bg-[hsla(320,20%,90%,1)] rounded w-1/2"></div>
    <div class="h-4 bg-[hsla(320,20%,90%,1)] rounded w-5/6"></div>
  </div>

  <!-- Button skeleton -->
  <div class="h-12 bg-[hsla(320,20%,90%,1)] rounded-xl w-full"></div>
</div>
```

#### Page Loading Overlay

```html
<div class="fixed inset-0 bg-white/80 backdrop-blur-sm z-50 flex items-center justify-center">
  <div class="flex flex-col items-center gap-4">
    <div class="w-12 h-12 border-4 border-[#4D0052]/30 border-t-[#4D0052] rounded-full animate-spin"></div>
    <p class="text-base font-semibold text-[hsla(320,50%,15%,1)]">Loading your matches...</p>
  </div>
</div>
```

---

## 7. Data Display Components

### 7.1 Lists

#### Simple List

```html
<ul class="space-y-3">
  <li class="flex items-center gap-2 text-[hsla(320,30%,35%,1)]">
    <iconify-icon icon="lucide:check" class="text-base text-[#8B7AA8]"></iconify-icon>
    <span>Access to Premium users</span>
  </li>
  <li class="flex items-center gap-2 text-[hsla(320,30%,35%,1)]">
    <iconify-icon icon="lucide:check" class="text-base text-[#8B7AA8]"></iconify-icon>
    <span>Complete Tiers 3-4</span>
  </li>
  <li class="flex items-center gap-2 text-[hsla(320,30%,35%,1)]">
    <iconify-icon icon="lucide:check" class="text-base text-[#8B7AA8]"></iconify-icon>
    <span>Request deeper information</span>
  </li>
</ul>
```

#### Interactive List (Clickable Items)

```html
<div class="space-y-2">
  <button class="w-full flex items-center justify-between p-4 bg-white border border-[hsla(320,25%,85%,1)] rounded-xl hover:border-[#7D3365] hover:shadow-[0_2px_8px_rgba(77,0,82,0.08)] transition">
    <div class="flex items-center gap-3">
      <img src="avatar.jpg" alt="User" class="w-12 h-12 rounded-full object-cover">
      <div class="text-left">
        <p class="text-sm font-semibold text-[hsla(320,50%,15%,1)]">Sarah Johnson</p>
        <p class="text-xs text-[hsla(320,30%,35%,1)]">Sent Show Interest</p>
      </div>
    </div>
    <iconify-icon icon="lucide:chevron-right" class="text-xl text-[hsla(320,20%,55%,1)]"></iconify-icon>
  </button>
</div>
```

---

## 8. Accessibility Checklist

For all components:

- [ ] Semantic HTML5 elements
- [ ] ARIA labels and roles where needed
- [ ] Keyboard navigation support
- [ ] Visible focus states (never `outline: none` alone)
- [ ] Sufficient color contrast (WCAG AA)
- [ ] Touch target sizes ≥ 44x44px
- [ ] Screen reader announcements for dynamic content
- [ ] Error messages linked with `aria-describedby`
- [ ] Form labels with `for` attributes
- [ ] Alternative text for images

---

## 9. Related Documentation

- [Design System](design_system.md) - Tokens and guidelines
- [Typography System](typography_system.md) - Font specifications
- [Color System](color_system.md) - Color palette details
- [Icon System](icon_system.md) - Icon usage
- [Accessibility Patterns](accessibility_patterns.md) - WCAG compliance

---

**Document Owner:** Design Lead & Frontend Lead
**Last Reviewed:** 2026-02-26
**Next Review:** 2026-05-26 (Quarterly)
