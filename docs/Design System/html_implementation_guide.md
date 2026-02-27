# HTML Implementation Guide

**Version:** 1.0.0
**Last Updated:** 2026-02-27
**Status:** Specification Complete
**Target Framework:** HTML5 + Tailwind CSS v4

---

## Overview

This guide provides complete HTML implementation patterns for all JoyMatcher components, following the design system specifications. All examples use Tailwind CSS v4 utility classes aligned with the JoyMatcher brand identity.

**Companion Documents:**
- [Design System](design_system.md) - Overall design principles
- [Component Library](component_library.md) - Component specifications
- [Accessibility Patterns](accessibility_patterns.md) - WCAG 2.1 AA compliance

---

## Brand Colors (Tailwind Config)

### Primary Gradient (#4D0052 → #F16A6F)

```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        // Primary brand colors (from logo gradient)
        'jm-purple-deep': '#4D0052',      // Deep purple (gradient start)
        'jm-purple-dark': '#6B0059',      // Dark purple
        'jm-purple': '#8B0061',           // Mid purple
        'jm-coral-dark': '#C74F67',       // Dark coral
        'jm-coral': '#F16A6F',            // Coral (gradient end)
        'jm-coral-light': '#F99095',      // Light coral

        // Neutral palette
        'jm-gray-50': '#F9FAFB',
        'jm-gray-100': '#F3F4F6',
        'jm-gray-200': '#E5E7EB',
        'jm-gray-300': '#D1D5DB',
        'jm-gray-400': '#9CA3AF',
        'jm-gray-500': '#6B7280',
        'jm-gray-600': '#4B5563',
        'jm-gray-700': '#374151',
        'jm-gray-800': '#1F2937',
        'jm-gray-900': '#111827',

        // Semantic colors
        'jm-success': '#10B981',
        'jm-warning': '#F59E0B',
        'jm-error': '#EF4444',
        'jm-info': '#3B82F6',
      },
      backgroundImage: {
        'gradient-jm': 'linear-gradient(135deg, #4D0052%, #F16A6F 100%)',
        'gradient-jm-hover': 'linear-gradient(135deg, #6B0059%, #F99095 100%)',
      },
      fontFamily: {
        'serif': ['Georgia', 'serif'],
        'sans': ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
};
```

---

## Typography System

### Heading Styles

```html
<!-- H1 - Page Title -->
<h1 class="font-serif text-4xl md:text-5xl font-bold text-jm-gray-900 leading-tight mb-6">
  Find Your Life Partner
</h1>

<!-- H2 - Section Heading -->
<h2 class="font-serif text-3xl md:text-4xl font-bold text-jm-gray-900 leading-snug mb-4">
  How JoyMatcher Works
</h2>

<!-- H3 - Subsection Heading -->
<h3 class="font-serif text-2xl md:text-3xl font-semibold text-jm-gray-800 leading-snug mb-3">
  Tier-Based Disclosure
</h3>

<!-- H4 - Component Heading -->
<h4 class="font-serif text-xl md:text-2xl font-semibold text-jm-gray-800 leading-normal mb-2">
  Complete Your Profile
</h4>

<!-- H5 - Small Heading -->
<h5 class="font-sans text-lg font-semibold text-jm-gray-700 leading-normal mb-2">
  Profile Settings
</h5>

<!-- H6 - Micro Heading -->
<h6 class="font-sans text-base font-semibold text-jm-gray-700 leading-normal mb-1">
  Account Details
</h6>
```

### Body Text Styles

```html
<!-- Body Large -->
<p class="font-sans text-lg text-jm-gray-700 leading-relaxed mb-4">
  JoyMatcher uses a progressive tier system that lets you share information gradually,
  building trust before revealing sensitive details.
</p>

<!-- Body Default -->
<p class="font-sans text-base text-jm-gray-700 leading-relaxed mb-4">
  Complete each tier to unlock deeper connections with matches who share your values.
</p>

<!-- Body Small -->
<p class="font-sans text-sm text-jm-gray-600 leading-relaxed mb-3">
  Tier 2 data is shared only with users you explicitly grant access to.
</p>

<!-- Caption / Helper Text -->
<span class="font-sans text-xs text-jm-gray-500 leading-normal">
  Last updated: February 26, 2026
</span>
```

---

## Buttons

### Primary Button (Gradient)

```html
<!-- Primary Button -->
<button
  type="button"
  class="
    bg-gradient-jm hover:bg-gradient-jm-hover
    text-white font-sans font-semibold
    px-6 py-3 rounded-lg
    transition-all duration-200
    shadow-md hover:shadow-lg
    focus:outline-none focus:ring-2 focus:ring-jm-coral focus:ring-offset-2
    disabled:opacity-50 disabled:cursor-not-allowed
  "
>
  Show Interest
</button>

<!-- Primary Button Large -->
<button
  type="button"
  class="
    bg-gradient-jm hover:bg-gradient-jm-hover
    text-white font-sans font-semibold text-lg
    px-8 py-4 rounded-lg
    transition-all duration-200
    shadow-md hover:shadow-lg
    focus:outline-none focus:ring-2 focus:ring-jm-coral focus:ring-offset-2
    w-full md:w-auto
  "
>
  Get Started
</button>

<!-- Primary Button Small -->
<button
  type="button"
  class="
    bg-gradient-jm hover:bg-gradient-jm-hover
    text-white font-sans font-medium text-sm
    px-4 py-2 rounded-md
    transition-all duration-200
    shadow-sm hover:shadow-md
    focus:outline-none focus:ring-2 focus:ring-jm-coral focus:ring-offset-1
  "
>
  Send Request
</button>
```

### Secondary Button (Outline)

```html
<!-- Secondary Button -->
<button
  type="button"
  class="
    border-2 border-jm-purple hover:border-jm-purple-dark
    text-jm-purple hover:text-jm-purple-dark hover:bg-jm-purple/5
    font-sans font-semibold
    px-6 py-3 rounded-lg
    transition-all duration-200
    focus:outline-none focus:ring-2 focus:ring-jm-purple focus:ring-offset-2
    disabled:opacity-50 disabled:cursor-not-allowed
  "
>
  Learn More
</button>
```

### Tertiary Button (Ghost)

```html
<!-- Tertiary Button -->
<button
  type="button"
  class="
    text-jm-purple hover:text-jm-purple-dark hover:bg-jm-purple/10
    font-sans font-medium
    px-4 py-2 rounded-md
    transition-all duration-200
    focus:outline-none focus:ring-2 focus:ring-jm-purple focus:ring-offset-1
  "
>
  Skip for Now
</button>
```

### Icon Button

```html
<!-- Icon Button -->
<button
  type="button"
  class="
    p-2 rounded-full
    text-jm-gray-600 hover:text-jm-purple hover:bg-jm-purple/10
    transition-all duration-200
    focus:outline-none focus:ring-2 focus:ring-jm-purple focus:ring-offset-1
  "
  aria-label="Close modal"
>
  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 24 24">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
  </svg>
</button>
```

---

## Form Controls

### Text Input

```html
<!-- Text Input -->
<div class="space-y-2">
  <label
    for="email"
    class="block font-sans text-sm font-medium text-jm-gray-700"
  >
    Email Address
  </label>
  <input
    type="email"
    id="email"
    name="email"
    placeholder="you@example.com"
    class="
      w-full px-4 py-3 rounded-lg
      border-2 border-jm-gray-300 focus:border-jm-purple focus:ring-2 focus:ring-jm-purple/20
      font-sans text-base text-jm-gray-900 placeholder:text-jm-gray-400
      transition-all duration-200
      focus:outline-none
      disabled:bg-jm-gray-100 disabled:cursor-not-allowed
    "
    required
  />
  <p class="font-sans text-xs text-jm-gray-500">
    We'll never share your email with anyone else.
  </p>
</div>

<!-- Text Input with Error -->
<div class="space-y-2">
  <label
    for="email-error"
    class="block font-sans text-sm font-medium text-jm-gray-700"
  >
    Email Address
  </label>
  <input
    type="email"
    id="email-error"
    name="email"
    value="invalid-email"
    class="
      w-full px-4 py-3 rounded-lg
      border-2 border-jm-error focus:border-jm-error focus:ring-2 focus:ring-jm-error/20
      font-sans text-base text-jm-gray-900
      transition-all duration-200
      focus:outline-none
    "
    aria-invalid="true"
    aria-describedby="email-error-message"
  />
  <p id="email-error-message" class="font-sans text-sm text-jm-error flex items-start gap-1">
    <svg class="w-4 h-4 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 20 20">
      <path fill-rule="evenodd" d="M18 10a8 8 11-16 8 8 0116zm-7 4a1 1 11-2 1 1 012zm-1-9a1 1 00-1 1v4a1 1 102V6a1 1 00-1-1z" clip-rule="evenodd"/>
    </svg>
    Please enter a valid email address.
  </p>
</div>

<!-- Text Input with Success -->
<div class="space-y-2">
  <label
    for="email-success"
    class="block font-sans text-sm font-medium text-jm-gray-700"
  >
    Email Address
  </label>
  <input
    type="email"
    id="email-success"
    name="email"
    value="user@example.com"
    class="
      w-full px-4 py-3 rounded-lg
      border-2 border-jm-success focus:border-jm-success focus:ring-2 focus:ring-jm-success/20
      font-sans text-base text-jm-gray-900
      transition-all duration-200
      focus:outline-none
    "
    aria-describedby="email-success-message"
  />
  <p id="email-success-message" class="font-sans text-sm text-jm-success flex items-start gap-1">
    <svg class="w-4 h-4 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 20 20">
      <path fill-rule="evenodd" d="M10 18a8 8 100-16 8 8 000 16zm3.707-9.293a1 1 00-1.414-1.414L9 10.586 7.707 9.293a1 1 00-1.414 1.414l2 2a1 1 001.414l4-4z" clip-rule="evenodd"/>
    </svg>
    Email is available!
  </p>
</div>
```

### Select Dropdown

```html
<!-- Select Dropdown -->
<div class="space-y-2">
  <label
    for="relationship-intent"
    class="block font-sans text-sm font-medium text-jm-gray-700"
  >
    Relationship Intent
  </label>
  <select
    id="relationship-intent"
    name="relationship_intent"
    class="
      w-full px-4 py-3 rounded-lg
      border-2 border-jm-gray-300 focus:border-jm-purple focus:ring-2 focus:ring-jm-purple/20
      font-sans text-base text-jm-gray-900
      transition-all duration-200
      focus:outline-none
      appearance-none
      bg-white
      cursor-pointer
    "
    style="background-image: url('data:image/svg+xml;charset=UTF-8,%3csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 20 20%27 fill=%27%236B7280%27%3e%3cpath fill-rule=%27evenodd%27 d=%27M5.293 7.293a1 1 011.414L10 10.586l3.293-3.293a1 1 111.414 1.414l-4 4a1 1 01-1.414l-4-4a1 1 010-1.414z%27 clip-rule=%27evenodd%27/%3e%3c/svg%3e'); background-position: right 0.75rem center; background-repeat: no-repeat; background-size: 1.25rem;"
    required
  >
    <option value="" disabled selected>Select your intent</option>
    <option value="marriage">Marriage</option>
    <option value="long-term">Long-term committed relationship</option>
    <option value="exploring">Exploring (open to marriage)</option>
  </select>
</div>
```

### Checkbox

```html
<!-- Checkbox -->
<div class="flex items-start gap-3">
  <input
    type="checkbox"
    id="terms"
    name="terms"
    class="
      w-5 h-5 mt-0.5
      rounded border-2 border-jm-gray-300
      text-jm-purple focus:ring-2 focus:ring-jm-purple/20 focus:ring-offset-0
      transition-all duration-200
      cursor-pointer
    "
    required
  />
  <label
    for="terms"
    class="font-sans text-sm text-jm-gray-700 cursor-pointer"
  >
    I agree to the <a href="/legal/terms-of-service" class="text-jm-purple hover:text-jm-purple-dark underline font-medium">Terms of Service</a> and <a href="/legal/privacy-policy" class="text-jm-purple hover:text-jm-purple-dark underline font-medium">Privacy Policy</a>
  </label>
</div>
```

### Radio Buttons

```html
<!-- Radio Group -->
<fieldset class="space-y-3">
  <legend class="block font-sans text-sm font-medium text-jm-gray-700 mb-3">
    Gender Identity
  </legend>

  <div class="flex items-center gap-3">
    <input
      type="radio"
      id="gender-male"
      name="gender"
      value="male"
      class="
        w-5 h-5
        border-2 border-jm-gray-300
        text-jm-purple focus:ring-2 focus:ring-jm-purple/20 focus:ring-offset-0
        transition-all duration-200
        cursor-pointer
      "
    />
    <label for="gender-male" class="font-sans text-base text-jm-gray-700 cursor-pointer">
      Male
    </label>
  </div>

  <div class="flex items-center gap-3">
    <input
      type="radio"
      id="gender-female"
      name="gender"
      value="female"
      class="
        w-5 h-5
        border-2 border-jm-gray-300
        text-jm-purple focus:ring-2 focus:ring-jm-purple/20 focus:ring-offset-0
        transition-all duration-200
        cursor-pointer
      "
    />
    <label for="gender-female" class="font-sans text-base text-jm-gray-700 cursor-pointer">
      Female
    </label>
  </div>

  <div class="flex items-center gap-3">
    <input
      type="radio"
      id="gender-other"
      name="gender"
      value="other"
      class="
        w-5 h-5
        border-2 border-jm-gray-300
        text-jm-purple focus:ring-2 focus:ring-jm-purple/20 focus:ring-offset-0
        transition-all duration-200
        cursor-pointer
      "
    />
    <label for="gender-other" class="font-sans text-base text-jm-gray-700 cursor-pointer">
      Other / Prefer not to say
    </label>
  </div>
</fieldset>
```

### Textarea

```html
<!-- Textarea -->
<div class="space-y-2">
  <label
    for="bio"
    class="block font-sans text-sm font-medium text-jm-gray-700"
  >
    About You
  </label>
  <textarea
    id="bio"
    name="bio"
    rows="5"
    placeholder="Share a bit about yourself, your values, and what you're looking for..."
    class="
      w-full px-4 py-3 rounded-lg
      border-2 border-jm-gray-300 focus:border-jm-purple focus:ring-2 focus:ring-jm-purple/20
      font-sans text-base text-jm-gray-900 placeholder:text-jm-gray-400
      transition-all duration-200
      focus:outline-none
      resize-vertical
    "
    maxlength="500"
  ></textarea>
  <p class="font-sans text-xs text-jm-gray-500 text-right">
    0 / 500 characters
  </p>
</div>
```

---

## Cards

### Profile Card

```html
<!-- Profile Card -->
<article class="
  bg-white rounded-xl shadow-md hover:shadow-lg
  transition-all duration-200
  overflow-hidden
  border border-jm-gray-200
">
  <!-- Card Image -->
  <div class="relative aspect-[3/4] bg-jm-gray-100">
    <img
      src="/images/profiles/user-123.jpg"
      alt="Chidinma O., 31, Lagos"
      class="w-full h-full object-cover"
    />
    <!-- Verified Badge -->
    <div class="absolute top-3 right-3 bg-jm-success text-white px-2 py-1 rounded-full flex items-center gap-1 text-xs font-medium shadow-md">
      <svg class="w-3 h-3" fill="currentColor" viewBox="0 20 20">
        <path fill-rule="evenodd" d="M6.267 3.455a3.066 3.066 001.745-.723 3.066 3.066 013.976 3.066 3.066 001.745.723 3.066 3.066 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 010 3.976 3.066 3.066 00-.723 1.745 3.066 3.066 01-2.812 2.812 3.066 3.066 00-1.745.723 3.066 3.066 01-3.976 3.066 3.066 00-1.745-.723 3.066 3.066 01-2.812-2.812 3.066 3.066 00-.723-1.745 3.066 3.066 010-3.976 3.066 3.066 00.723-1.745 3.066 3.066 012.812-2.812zm7.44 5.252a1 1 00-1.414-1.414L9 10.586 7.707 9.293a1 1 00-1.414 1.414l2 2a1 1 001.414l4-4z" clip-rule="evenodd"/>
      </svg>
      Verified
    </div>
  </div>

  <!-- Card Content -->
  <div class="p-5 space-y-3">
    <!-- Name & Age -->
    <h3 class="font-serif text-xl font-semibold text-jm-gray-900">
      Chidinma O., 31
    </h3>

    <!-- Location & Occupation -->
    <div class="space-y-1 text-sm text-jm-gray-600">
      <div class="flex items-center gap-2">
        <svg class="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 01-2.827l-4.244-4.243a8 8 1111.314z"/>
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 11-6 3 3 016z"/>
        </svg>
        Lagos, Nigeria
      </div>
      <div class="flex items-center gap-2">
        <svg class="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0112 15c-3.183-6.22-.62-9-1.745M16 6V4a2 2 00-2-2h-4a2 2 00-2 2v2m4 6h.01M5 20h14a2 2 002-2V8a2 2 00-2-2H5a2 2 00-2 2v10a2 2 002 2z"/>
        </svg>
        Product Manager
      </div>
    </div>

    <!-- Tier Progress -->
    <div class="pt-2 border-t border-jm-gray-200">
      <div class="flex items-center justify-between text-xs text-jm-gray-500 mb-2">
        <span>Tier Progress</span>
        <span class="font-medium text-jm-purple">Tier 3 Complete</span>
      </div>
      <div class="w-full bg-jm-gray-200 rounded-full h-2">
        <div class="bg-gradient-jm h-2 rounded-full" style="width: 60%"></div>
      </div>
    </div>

    <!-- Action Button -->
    <button class="
      w-full bg-gradient-jm hover:bg-gradient-jm-hover
      text-white font-sans font-semibold
      px-4 py-3 rounded-lg
      transition-all duration-200
      shadow-sm hover:shadow-md
      focus:outline-none focus:ring-2 focus:ring-jm-coral focus:ring-offset-2
    ">
      Show Interest
    </button>
  </div>
</article>
```

### Tier Card

```html
<!-- Tier Card (Completed) -->
<div class="
  bg-white rounded-xl shadow-sm
  border-2 border-jm-success
  p-6 space-y-4
">
  <!-- Header -->
  <div class="flex items-start justify-between">
    <div class="space-y-1">
      <h3 class="font-serif text-xl font-semibold text-jm-gray-900">
        Tier 1: Identity & Intent
      </h3>
      <p class="font-sans text-sm text-jm-gray-600">
        Public information
      </p>
    </div>
    <!-- Status Badge -->
    <span class="bg-jm-success/10 text-jm-success px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1">
      <svg class="w-3 h-3" fill="currentColor" viewBox="0 20 20">
        <path fill-rule="evenodd" d="M10 18a8 8 100-16 8 8 000 16zm3.707-9.293a1 1 00-1.414-1.414L9 10.586 7.707 9.293a1 1 00-1.414 1.414l2 2a1 1 001.414l4-4z" clip-rule="evenodd"/>
      </svg>
      Completed
    </span>
  </div>

  <!-- Fields List -->
  <ul class="space-y-2">
    <li class="flex items-center gap-2 text-sm text-jm-gray-700">
      <svg class="w-4 h-4 text-jm-success flex-shrink-0" fill="currentColor" viewBox="0 20 20">
        <path fill-rule="evenodd" d="M10 18a8 8 100-16 8 8 000 16zm3.707-9.293a1 1 00-1.414-1.414L9 10.586 7.707 9.293a1 1 00-1.414 1.414l2 2a1 1 001.414l4-4z" clip-rule="evenodd"/>
      </svg>
      Age & Gender
    </li>
    <li class="flex items-center gap-2 text-sm text-jm-gray-700">
      <svg class="w-4 h-4 text-jm-success flex-shrink-0" fill="currentColor" viewBox="0 20 20">
        <path fill-rule="evenodd" d="M10 18a8 8 100-16 8 8 000 16zm3.707-9.293a1 1 00-1.414-1.414L9 10.586 7.707 9.293a1 1 00-1.414 1.414l2 2a1 1 001.414l4-4z" clip-rule="evenodd"/>
      </svg>
      Location
    </li>
    <li class="flex items-center gap-2 text-sm text-jm-gray-700">
      <svg class="w-4 h-4 text-jm-success flex-shrink-0" fill="currentColor" viewBox="0 20 20">
        <path fill-rule="evenodd" d="M10 18a8 8 100-16 8 8 000 16zm3.707-9.293a1 1 00-1.414-1.414L9 10.586 7.707 9.293a1 1 00-1.414 1.414l2 2a1 1 001.414l4-4z" clip-rule="evenodd"/>
      </svg>
      Relationship Intent
    </li>
    <li class="flex items-center gap-2 text-sm text-jm-gray-700">
      <svg class="w-4 h-4 text-jm-success flex-shrink-0" fill="currentColor" viewBox="0 20 20">
        <path fill-rule="evenodd" d="M10 18a8 8 100-16 8 8 000 16zm3.707-9.293a1 1 00-1.414-1.414L9 10.586 7.707 9.293a1 1 00-1.414 1.414l2 2a1 1 001.414l4-4z" clip-rule="evenodd"/>
      </svg>
      Religious Identity
    </li>
    <li class="flex items-center gap-2 text-sm text-jm-gray-700">
      <svg class="w-4 h-4 text-jm-success flex-shrink-0" fill="currentColor" viewBox="0 20 20">
        <path fill-rule="evenodd" d="M10 18a8 8 100-16 8 8 000 16zm3.707-9.293a1 1 00-1.414-1.414L9 10.586 7.707 9.293a1 1 00-1.414 1.414l2 2a1 1 001.414l4-4z" clip-rule="evenodd"/>
      </svg>
      Occupation Category
    </li>
  </ul>
</div>

<!-- Tier Card (Locked) -->
<div class="
  bg-jm-gray-50 rounded-xl shadow-sm
  border-2 border-jm-gray-300 border-dashed
  p-6 space-y-4
  opacity-60
">
  <!-- Header -->
  <div class="flex items-start justify-between">
    <div class="space-y-1">
      <h3 class="font-serif text-xl font-semibold text-jm-gray-700">
        Tier 3: Relationships & Family
      </h3>
      <p class="font-sans text-sm text-jm-gray-500">
        Premium required
      </p>
    </div>
    <!-- Lock Icon -->
    <div class="bg-jm-gray-300 p-2 rounded-full">
      <svg class="w-5 h-5 text-jm-gray-600" fill="currentColor" viewBox="0 20 20">
        <path fill-rule="evenodd" d="M5 9V7a5 5 0110v2a2 2 012 2v5a2 2 01-2 2H5a2 2 01-2-2v-5a2 2 012-2zm8-2v2H7V7a3 3 016z" clip-rule="evenodd"/>
      </svg>
    </div>
  </div>

  <!-- Upgrade CTA -->
  <div class="pt-2 border-t border-jm-gray-300">
    <button class="
      w-full border-2 border-jm-purple hover:border-jm-purple-dark
      text-jm-purple hover:text-jm-purple-dark hover:bg-jm-purple/5
      font-sans font-semibold
      px-4 py-2 rounded-lg
      transition-all duration-200
      focus:outline-none focus:ring-2 focus:ring-jm-purple focus:ring-offset-2
    ">
      Upgrade to Premium
    </button>
  </div>
</div>
```

---

## Alerts & Notifications

### Tier Awareness Warning

```html
<!-- Warning Alert -->
<div
  role="alert"
  class="
    bg-jm-warning/10 border-l-4 border-jm-warning
    p-4 rounded-r-lg
    flex items-start gap-3
  "
>
  <svg class="w-5 h-5 text-jm-warning flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 20 20">
    <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 11-2 1 1 012zm-1-8a1 1 00-1 1v3a1 1 002V6a1 1 00-1-1z" clip-rule="evenodd"/>
  </svg>
  <div class="flex-1">
    <h4 class="font-sans text-sm font-semibold text-jm-warning mb-1">
      Tier Awareness Warning
    </h4>
    <p class="font-sans text-sm text-jm-gray-700">
      You are about to show interest in <strong>Emmanuel A.</strong>, who has completed Tier 4.
      You have only completed Tier 2. They may see this as a mismatch in seriousness.
    </p>
    <p class="font-sans text-xs text-jm-gray-600 mt-2">
      Consider completing Tier 3-4 before showing interest to demonstrate your commitment.
    </p>
  </div>
</div>
```

### Success Notification

```html
<!-- Success Alert -->
<div
  role="alert"
  class="
    bg-jm-success/10 border-l-4 border-jm-success
    p-4 rounded-r-lg
    flex items-start gap-3
  "
>
  <svg class="w-5 h-5 text-jm-success flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 20 20">
    <path fill-rule="evenodd" d="M10 18a8 8 100-16 8 8 000 16zm3.707-9.293a1 1 00-1.414-1.414L9 10.586 7.707 9.293a1 1 00-1.414 1.414l2 2a1 1 001.414l4-4z" clip-rule="evenodd"/>
  </svg>
  <div class="flex-1">
    <h4 class="font-sans text-sm font-semibold text-jm-success mb-1">
      Interest Sent Successfully
    </h4>
    <p class="font-sans text-sm text-jm-gray-700">
      Your interest has been sent to <strong>Chidinma O.</strong>
      You'll be notified when she responds.
    </p>
  </div>
</div>
```

### Error Notification

```html
<!-- Error Alert -->
<div
  role="alert"
  class="
    bg-jm-error/10 border-l-4 border-jm-error
    p-4 rounded-r-lg
    flex items-start gap-3
  "
>
  <svg class="w-5 h-5 text-jm-error flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 20 20">
    <path fill-rule="evenodd" d="M10 18a8 8 100-16 8 8 000 16zM8.707 7.293a1 1 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 101.414 1.414L10 11.414l1.293 1.293a1 1 001.414-1.414L11.414 10l1.293-1.293a1 1 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"/>
  </svg>
  <div class="flex-1">
    <h4 class="font-sans text-sm font-semibold text-jm-error mb-1">
      Subscription Required
    </h4>
    <p class="font-sans text-sm text-jm-gray-700">
      You need a Premium subscription to access Tier 3 data.
    </p>
    <button class="mt-2 text-jm-error hover:text-jm-error/80 font-medium text-sm underline">
      Upgrade Now
    </button>
  </div>
</div>
```

---

## Modal

```html
<!-- Modal Overlay -->
<div
  id="modal-overlay"
  class="fixed inset-0 bg-jm-gray-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
  role="dialog"
  aria-modal="true"
  aria-labelledby="modal-title"
>
  <!-- Modal Container -->
  <div class="
    bg-white rounded-2xl shadow-2xl
    w-full max-w-md
    max-h-[90vh] overflow-y-auto
    relative
  ">
    <!-- Close Button -->
    <button
      type="button"
      class="
        absolute top-4 right-4
        p-2 rounded-full
        text-jm-gray-600 hover:text-jm-gray-900 hover:bg-jm-gray-100
        transition-all duration-200
        focus:outline-none focus:ring-2 focus:ring-jm-purple focus:ring-offset-2
      "
      aria-label="Close modal"
    >
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
      </svg>
    </button>

    <!-- Modal Content -->
    <div class="p-6 space-y-4">
      <!-- Modal Header -->
      <div class="pr-10">
        <h2 id="modal-title" class="font-serif text-2xl font-bold text-jm-gray-900">
          Request Details Access
        </h2>
        <p class="font-sans text-sm text-jm-gray-600 mt-1">
          Request access to Emmanuel A.'s Tier 3 data
        </p>
      </div>

      <!-- Modal Body -->
      <div class="space-y-4">
        <p class="font-sans text-base text-jm-gray-700">
          You are requesting access to Emmanuel's Tier 3 data (Relationships & Family).
          In return, you must grant Emmanuel access to your Tier 3 data.
        </p>

        <!-- Tier Selection -->
        <div class="bg-jm-gray-50 rounded-lg p-4 space-y-3">
          <h3 class="font-sans text-sm font-semibold text-jm-gray-700">
            Select tier level to share:
          </h3>
          <div class="flex items-center gap-3">
            <input
              type="radio"
              id="tier-3"
              name="tier"
              value="3"
              class="w-5 h-5 text-jm-purple focus:ring-2 focus:ring-jm-purple/20"
              checked
            />
            <label for="tier-3" class="font-sans text-base text-jm-gray-700">
              Tier 3: Relationships & Family
            </label>
          </div>
        </div>
      </div>

      <!-- Modal Footer -->
      <div class="flex gap-3 pt-4 border-t border-jm-gray-200">
        <button
          type="button"
          class="
            flex-1 border-2 border-jm-gray-300 hover:border-jm-gray-400
            text-jm-gray-700 hover:text-jm-gray-900 hover:bg-jm-gray-50
            font-sans font-medium
            px-4 py-3 rounded-lg
            transition-all duration-200
            focus:outline-none focus:ring-2 focus:ring-jm-gray-400 focus:ring-offset-2
          "
        >
          Cancel
        </button>
        <button
          type="button"
          class="
            flex-1 bg-gradient-jm hover:bg-gradient-jm-hover
            text-white font-sans font-semibold
            px-4 py-3 rounded-lg
            transition-all duration-200
            shadow-sm hover:shadow-md
            focus:outline-none focus:ring-2 focus:ring-jm-coral focus:ring-offset-2
          "
        >
          Send Request
        </button>
      </div>
    </div>
  </div>
</div>
```

---

## Badge Components

```html
<!-- Verified Badge -->
<span class="inline-flex items-center gap-1 bg-jm-success/10 text-jm-success px-2 py-1 rounded-full text-xs font-medium">
  <svg class="w-3 h-3" fill="currentColor" viewBox="0 20 20">
    <path fill-rule="evenodd" d="M6.267 3.455a3.066 3.066 001.745-.723 3.066 3.066 013.976 3.066 3.066 001.745.723 3.066 3.066 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 010 3.976 3.066 3.066 00-.723 1.745 3.066 3.066 01-2.812 2.812 3.066 3.066 00-1.745.723 3.066 3.066 01-3.976 3.066 3.066 00-1.745-.723 3.066 3.066 01-2.812-2.812 3.066 3.066 00-.723-1.745 3.066 3.066 010-3.976 3.066 3.066 00.723-1.745 3.066 3.066 012.812-2.812zm7.44 5.252a1 1 00-1.414-1.414L9 10.586 7.707 9.293a1 1 00-1.414 1.414l2 2a1 1 001.414l4-4z" clip-rule="evenodd"/>
  </svg>
  Verified
</span>

<!-- VIP Badge -->
<span class="inline-flex items-center gap-1 bg-gradient-jm text-white px-3 py-1 rounded-full text-xs font-semibold shadow-sm">
  <svg class="w-3 h-3" fill="currentColor" viewBox="0 20 20">
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902l1.07 3.292a1 1 00.95.69h3.462c.969 1.371 1.24.588 1.81l-2.8 2.034a1 1 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 00-1.175l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 00.951-.69l1.07-3.292z"/>
  </svg>
  VIP Member
</span>

<!-- Premium Badge -->
<span class="inline-flex items-center gap-1 bg-jm-purple/10 text-jm-purple px-2 py-1 rounded-full text-xs font-medium">
  <svg class="w-3 h-3" fill="currentColor" viewBox="0 20 20">
    <path fill-rule="evenodd" d="M11.3 1.046A1 1 0112 2v5h4a1 1 01.82 1.573l-7 10A1 1 018 18v-5H4a1 1 01-.82-1.573l7-10a1 1 011.12-.38z" clip-rule="evenodd"/>
  </svg>
  Premium
</span>

<!-- Tier Badge -->
<span class="inline-flex items-center gap-1 bg-jm-gray-100 text-jm-gray-700 px-2 py-1 rounded-md text-xs font-medium">
  Tier 3 Complete
</span>
```

---

## Progress Indicators

### Tier Progress Bar

```html
<!-- Tier Progress -->
<div class="space-y-3">
  <div class="flex items-center justify-between">
    <span class="font-sans text-sm font-medium text-jm-gray-700">
      Profile Completion
    </span>
    <span class="font-sans text-sm font-semibold text-jm-purple">
      60% Complete
    </span>
  </div>

  <!-- Progress Bar -->
  <div class="w-full bg-jm-gray-200 rounded-full h-3 overflow-hidden">
    <div
      class="bg-gradient-jm h-3 rounded-full transition-all duration-500 ease-out"
      style="width: 60%"
      role="progressbar"
      aria-valuenow="60"
      aria-valuemin="0"
      aria-valuemax="100"
    ></div>
  </div>

  <!-- Tier Checkpoints -->
  <div class="flex items-center justify-between text-xs text-jm-gray-500">
    <span class="font-medium text-jm-success">Tier 1 ✓</span>
    <span class="font-medium text-jm-success">Tier 2 ✓</span>
    <span class="font-medium text-jm-success">Tier 3 ✓</span>
    <span class="font-medium text-jm-gray-400">Tier 4</span>
    <span class="font-medium text-jm-gray-400">Tier 5</span>
  </div>
</div>
```

---

## Loading States

### Spinner

```html
<!-- Loading Spinner -->
<div class="flex items-center justify-center p-8">
  <svg
    class="animate-spin h-8 w-8 text-jm-purple"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 24 24"
  >
    <circle
      class="opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      stroke-width="4"
    ></circle>
    <path
      class="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 018-8V0C5.373 0 5.373 12h4zm2 5.291A7.962 7.962 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
    ></path>
  </svg>
</div>

<!-- Loading Skeleton (Profile Card) -->
<div class="bg-white rounded-xl shadow-md p-6 space-y-4 animate-pulse">
  <div class="aspect-[3/4] bg-jm-gray-300 rounded-lg"></div>
  <div class="space-y-3">
    <div class="h-6 bg-jm-gray-300 rounded w-3/4"></div>
    <div class="h-4 bg-jm-gray-200 rounded w-1/2"></div>
    <div class="h-4 bg-jm-gray-200 rounded w-2/3"></div>
    <div class="h-10 bg-jm-gray-300 rounded-lg"></div>
  </div>
</div>
```

---

## Navigation

### Top Navigation Bar

```html
<!-- Navigation Header -->
<header class="bg-white border-b border-jm-gray-200 sticky top-0 z-40 shadow-sm">
  <nav class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-label="Main navigation">
    <div class="flex items-center justify-between h-16">
      <!-- Logo -->
      <a href="/" class="flex items-center gap-3 focus:outline-none focus:ring-2 focus:ring-jm-purple rounded-md">
        <img src="/images/logo.svg" alt="JoyMatcher" class="h-8 w-8" />
        <span class="font-serif text-xl font-bold text-jm-gray-900">
          JoyMatcher
        </span>
      </a>

      <!-- Desktop Navigation -->
      <div class="hidden md:flex items-center gap-8">
        <a
          href="/app/discover"
          class="font-sans text-sm font-medium text-jm-gray-700 hover:text-jm-purple transition-colors"
        >
          Discover
        </a>
        <a
          href="/app/interests"
          class="font-sans text-sm font-medium text-jm-gray-700 hover:text-jm-purple transition-colors relative"
        >
          Interests
          <!-- Notification Badge -->
          <span class="absolute -top-1 -right-2 bg-jm-error text-white text-xs font-semibold w-5 h-5 flex items-center justify-center rounded-full">
            3
          </span>
        </a>
        <a
          href="/app/messages"
          class="font-sans text-sm font-medium text-jm-gray-700 hover:text-jm-purple transition-colors"
        >
          Messages
        </a>

        <!-- Account Dropdown -->
        <div class="relative">
          <button
            type="button"
            class="flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-jm-purple rounded-full"
            aria-label="Account menu"
            aria-expanded="false"
          >
            <img
              src="/images/avatars/user.jpg"
              alt="Your profile"
              class="w-9 h-9 rounded-full border-2 border-jm-purple"
            />
            <svg class="w-4 h-4 text-jm-gray-600" fill="currentColor" viewBox="0 20 20">
              <path fill-rule="evenodd" d="M5.293 7.293a1 1 011.414L10 10.586l3.293-3.293a1 1 111.414 1.414l-4 4a1 1 01-1.414l-4-4a1 1 010-1.414z" clip-rule="evenodd"/>
            </svg>
          </button>

          <!-- Dropdown Menu (hidden by default, shown with JS) -->
          <div class="
            hidden absolute right-0 mt-2 w-56
            bg-white rounded-lg shadow-lg border border-jm-gray-200
            py-1 z-50
          ">
            <a
              href="/app/profile/me"
              class="block px-4 py-2 text-sm text-jm-gray-700 hover:bg-jm-gray-50 transition-colors"
            >
              My Profile
            </a>
            <a
              href="/app/account/tiers"
              class="block px-4 py-2 text-sm text-jm-gray-700 hover:bg-jm-gray-50 transition-colors"
            >
              Tier Progress
            </a>
            <a
              href="/app/account/subscription"
              class="block px-4 py-2 text-sm text-jm-gray-700 hover:bg-jm-gray-50 transition-colors"
            >
              Subscription
            </a>
            <a
              href="/app/settings"
              class="block px-4 py-2 text-sm text-jm-gray-700 hover:bg-jm-gray-50 transition-colors"
            >
              Settings
            </a>
            <div class="border-t border-jm-gray-200 my-1"></div>
            <a
              href="/logout"
              class="block px-4 py-2 text-sm text-jm-error hover:bg-jm-error/5 transition-colors"
            >
              Log Out
            </a>
          </div>
        </div>
      </div>

      <!-- Mobile Menu Button -->
      <button
        type="button"
        class="md:hidden p-2 rounded-md text-jm-gray-600 hover:text-jm-purple hover:bg-jm-gray-100 focus:outline-none focus:ring-2 focus:ring-jm-purple"
        aria-label="Toggle menu"
        aria-expanded="false"
      >
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
        </svg>
      </button>
    </div>
  </nav>
</header>
```

---

## Footer

```html
<!-- Footer -->
<footer class="bg-jm-gray-900 text-jm-gray-300">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
      <!-- Brand Column -->
      <div class="space-y-4">
        <div class="flex items-center gap-3">
          <img src="/images/logo-white.svg" alt="JoyMatcher" class="h-8 w-8" />
          <span class="font-serif text-xl font-bold text-white">
            JoyMatcher
          </span>
        </div>
        <p class="font-sans text-sm text-jm-gray-400">
          Trust-based matchmaking for marriage-minded professionals.
        </p>
      </div>

      <!-- Platform Column -->
      <div class="space-y-4">
        <h3 class="font-sans text-sm font-semibold text-white uppercase tracking-wide">
          Platform
        </h3>
        <ul class="space-y-2">
          <li>
            <a href="/how-it-works" class="font-sans text-sm hover:text-white transition-colors">
              How It Works
            </a>
          </li>
          <li>
            <a href="/pricing" class="font-sans text-sm hover:text-white transition-colors">
              Pricing
            </a>
          </li>
          <li>
            <a href="/safety" class="font-sans text-sm hover:text-white transition-colors">
              Safety
            </a>
          </li>
          <li>
            <a href="/success-stories" class="font-sans text-sm hover:text-white transition-colors">
              Success Stories
            </a>
          </li>
        </ul>
      </div>

      <!-- Legal Column -->
      <div class="space-y-4">
        <h3 class="font-sans text-sm font-semibold text-white uppercase tracking-wide">
          Legal
        </h3>
        <ul class="space-y-2">
          <li>
            <a href="/legal/terms-of-service" class="font-sans text-sm hover:text-white transition-colors">
              Terms of Service
            </a>
          </li>
          <li>
            <a href="/legal/privacy-policy" class="font-sans text-sm hover:text-white transition-colors">
              Privacy Policy
            </a>
          </li>
          <li>
            <a href="/legal/community-guidelines" class="font-sans text-sm hover:text-white transition-colors">
              Community Guidelines
            </a>
          </li>
          <li>
            <a href="/legal/accessibility-statement" class="font-sans text-sm hover:text-white transition-colors">
              Accessibility
            </a>
          </li>
        </ul>
      </div>

      <!-- Contact Column -->
      <div class="space-y-4">
        <h3 class="font-sans text-sm font-semibold text-white uppercase tracking-wide">
          Contact
        </h3>
        <ul class="space-y-2">
          <li>
            <a href="/contact" class="font-sans text-sm hover:text-white transition-colors">
              Contact Us
            </a>
          </li>
          <li>
            <a href="/faq" class="font-sans text-sm hover:text-white transition-colors">
              FAQ
            </a>
          </li>
          <li>
            <a href="mailto:support@joymatcher.com" class="font-sans text-sm hover:text-white transition-colors">
              support@joymatcher.com
            </a>
          </li>
        </ul>
      </div>
    </div>

    <!-- Bottom Bar -->
    <div class="mt-12 pt-8 border-t border-jm-gray-800">
      <p class="font-sans text-sm text-jm-gray-500 text-center">
        © 2026 JoyMatcher. All rights reserved.
      </p>
    </div>
  </div>
</footer>
```

---

## Accessibility Checklist

When implementing HTML components, ensure:

- ✅ **Semantic HTML:** Use proper heading hierarchy (H1 → H2 → H3), lists, nav, main, footer
- ✅ **ARIA Labels:** Add `aria-label`, `aria-describedby`, `aria-invalid` where needed
- ✅ **Keyboard Navigation:** All interactive elements accessible via Tab key
- ✅ **Focus Indicators:** Visible focus rings on all focusable elements
- ✅ **Color Contrast:** Minimum 4.5:1 for normal text, 3:1 for large text (WCAG AA)
- ✅ **Alt Text:** Descriptive alt text for all images (not decorative)
- ✅ **Form Labels:** Every input has associated label
- ✅ **Error Messages:** Announced to screen readers via `aria-live` or `aria-describedby`
- ✅ **Skip Navigation:** "Skip to main content" link for screen readers
- ✅ **Responsive:** Works on mobile, tablet, desktop (min 320px width)

---

## Related Documentation

- [Design System](design_system.md) - Overall design principles
- [Component Library](component_library.md) - Component specifications
- [Accessibility Patterns](accessibility_patterns.md) - WCAG 2.1 AA compliance
- [Color System](color_system.md) - Color palette details
- [Typography System](typography_system.md) - Font scales and usage
- [Responsive Design](responsive_design.md) - Breakpoints and layouts

---

**Document Owner:** Design Lead & Frontend Lead
**Last Updated:** 2026-02-27
**Next Review:** Weekly during implementation
