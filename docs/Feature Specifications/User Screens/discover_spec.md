# Discover/Browse Matches Page — Feature Specification

**Version:** 1.0.0
**Last Updated:** 2026-02-27
**Status:** Complete
**Page Route:** `/app/discover`
**Access Level:** Authenticated users only (Free, Premium, VIP)

---

## Table of Contents

1. [Page Purpose & User Goals](#1-page-purpose--user-goals)
2. [Layout & Wireframe Description](#2-layout--wireframe-description)
3. [Component Breakdown](#3-component-breakdown)
4. [Advanced Filter Controls](#4-advanced-filter-controls)
5. [Profile Card Grid Layout](#5-profile-card-grid-layout)
6. [Show Interest Button States](#6-show-interest-button-states)
7. [Subscription Ceiling Warnings](#7-subscription-ceiling-warnings)
8. [Empty States](#8-empty-states)
9. [Pagination & Loading](#9-pagination--loading)
10. [Sort Options](#10-sort-options)
11. [EDT-Based Tier Visibility](#11-edt-based-tier-visibility)
12. [User Interactions & Flows](#12-user-interactions--flows)
13. [State Management Requirements](#13-state-management-requirements)
14. [Accessibility Requirements](#14-accessibility-requirements)
15. [Mobile Responsive Behavior](#15-mobile-responsive-behavior)
16. [Performance Optimization](#16-performance-optimization)
17. [Error Handling](#17-error-handling)
18. [Success States](#18-success-states)
19. [Related Documentation](#19-related-documentation)

---

## 1. Page Purpose & User Goals

### Primary Purpose

The Discover page is the primary matchmaking interface where users browse compatible profiles filtered by preferences, tier completion, and subscription level. It enforces EDT-based visibility, subscription ceiling rules, and Show Interest gating to maintain platform trust and consent requirements.

### User Goals

- **Browse Matches:** View profiles of marriage-minded users matching preferences
- **Filter by Compatibility:** Use advanced filters (age, location, faith, tier completion, subscription)
- **Assess Compatibility:** View available tier information based on EDT
- **Initiate Connection:** Send Show Interest to compatible matches
- **Understand Limitations:** See subscription ceiling warnings before attempting contact

### Success Metrics

- Time to first Show Interest: <5 minutes (user finds compatible match quickly)
- Filter engagement rate: Track which filters are most used
- Show Interest conversion: Percentage of profile views that result in Show Interest
- Subscription upgrade from Discover: Track upgrade prompts triggered by filter/contact attempts
- Profile view depth: Average number of profiles viewed per session

---

## 2. Layout & Wireframe Description

### Overall Structure

```
┌─────────────────────────────────────────────┐
│         Navigation Header                   │
├─────────────────────────────────────────────┤
│         Page Title & Description            │
├─────────────────────────────────────────────┤
│  ┌────────────┐  ┌──────────────────────┐   │
│  │  Filters   │  │  Sort Options        │   │
│  │  Sidebar   │  │  (Recently Active)   │   │
│  │            │  └──────────────────────┘   │
│  │  Age       │                              │
│  │  Location  │  ┌──────────────────────┐   │
│  │  Faith     │  │  Profile Card Grid   │   │
│  │  Tier      │  │  (3 columns desktop) │   │
│  │  Sub Type  │  │                      │   │
│  │            │  │  [Card] [Card] [Card]│   │
│  │  [Apply]   │  │  [Card] [Card] [Card]│   │
│  └────────────┘  │  [Card] [Card] [Card]│   │
│                  │                      │   │
│                  └──────────────────────┘   │
│                  ┌──────────────────────┐   │
│                  │  Load More Button    │   │
│                  └──────────────────────┘   │
├─────────────────────────────────────────────┤
│         Footer                              │
└─────────────────────────────────────────────┘
```

### Viewport Considerations

- **Desktop (≥1280px):** Filter sidebar (25% width) + profile grid (75% width, 3 columns)
- **Laptop (1024px-1279px):** Filter sidebar (30% width) + profile grid (70% width, 2 columns)
- **Tablet (768px-1023px):** Filters collapse to top bar, grid 2 columns
- **Mobile (320px-767px):** Filters in modal/drawer, grid 1 column

---

## 3. Component Breakdown

### 3.1 Page Header

**Content:**
- **Title:** "Discover Compatible Matches"
- **Subtitle:** "Marriage-minded professionals who match your preferences"
- **Active Filter Count Badge:** "(5 filters active)" if filters applied

**HTML Structure:**
```html
<section class="bg-white border-b border-jm-gray-200 py-6">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
      <!-- Title & Subtitle -->
      <div class="space-y-2">
        <h1 class="font-serif text-3xl md:text-4xl font-bold text-jm-gray-900">
          Discover Compatible Matches
        </h1>
        <p class="font-sans text-base text-jm-gray-600">
          Marriage-minded professionals who match your preferences
        </p>
      </div>

      <!-- Active Filter Badge -->
      <div class="flex items-center gap-3">
        <span class="inline-flex items-center gap-2 bg-jm-purple/10 text-jm-purple px-4 py-2 rounded-full text-sm font-medium">
          <svg class="w-4 h-4" fill="currentColor" viewBox="0 20 20">
            <path fill-rule="evenodd" d="M3 3a1 1 011-1h12a1 1 011 1v3a1 1 01-.293.707L12 11.414V15a1 1 01-.293.707l-2 2A1 1 018 17v-5.586L3.293 6.707A1 1 013 6V3z" clip-rule="evenodd"/>
          </svg>
          5 filters active
        </span>
        <button
          type="button"
          class="text-jm-purple hover:text-jm-purple-dark font-sans text-sm font-medium underline"
          onclick="clearAllFilters()"
        >
          Clear All
        </button>
      </div>
    </div>
  </div>
</section>
```

**Behavior:**
- Active filter count updates dynamically as filters change
- "Clear All" button resets all filters to default
- Badge hidden if no filters active (default state)

---

### 3.2 Filter Sidebar (Desktop/Laptop)

**Content:**
- Age range slider (18-60+)
- Location dropdown (cities/states, multi-select)
- Faith/denomination filters (checkboxes)
- Tier completion level (checkboxes: Tier 1-5)
- Subscription type (checkboxes: Free, Premium, VIP)
- "Apply Filters" button
- "Reset" button

**HTML Structure:**
```html
<aside class="hidden lg:block w-80 bg-white border-r border-jm-gray-200 p-6 space-y-6 sticky top-20 h-fit max-h-screen overflow-y-auto">
  <!-- Filter Header -->
  <div class="flex items-center justify-between pb-4 border-b border-jm-gray-200">
    <h2 class="font-serif text-xl font-bold text-jm-gray-900">
      Filters
    </h2>
    <button
      type="button"
      class="text-jm-purple hover:text-jm-purple-dark font-sans text-sm font-medium"
      onclick="resetFilters()"
    >
      Reset All
    </button>
  </div>

  <!-- Age Range Filter -->
  <div class="space-y-3">
    <label class="block font-sans text-sm font-semibold text-jm-gray-700">
      Age Range
    </label>
    <div class="space-y-2">
      <input
        type="range"
        id="age-min"
        min="18"
        max="60"
        value="25"
        class="w-full h-2 bg-jm-gray-200 rounded-lg appearance-none cursor-pointer accent-jm-purple"
        oninput="updateAgeRange()"
      />
      <input
        type="range"
        id="age-max"
        min="18"
        max="60"
        value="40"
        class="w-full h-2 bg-jm-gray-200 rounded-lg appearance-none cursor-pointer accent-jm-purple"
        oninput="updateAgeRange()"
      />
      <div class="flex items-center justify-between">
        <span class="font-sans text-sm text-jm-gray-600" id="age-min-display">25 years</span>
        <span class="font-sans text-sm text-jm-gray-600">to</span>
        <span class="font-sans text-sm text-jm-gray-600" id="age-max-display">40 years</span>
      </div>
    </div>
  </div>

  <!-- Location Filter -->
  <div class="space-y-3">
    <label class="block font-sans text-sm font-semibold text-jm-gray-700">
      Location
    </label>
    <select
      id="location-filter"
      multiple
      class="w-full px-4 py-3 rounded-lg border-2 border-jm-gray-300 focus:border-jm-purple focus:ring-2 focus:ring-jm-purple/20 font-sans text-sm text-jm-gray-900 transition-all duration-200 focus:outline-none"
    >
      <option value="lagos">Lagos, Nigeria</option>
      <option value="abuja">Abuja, Nigeria</option>
      <option value="port-harcourt">Port Harcourt, Nigeria</option>
      <option value="ibadan">Ibadan, Nigeria</option>
      <option value="kano">Kano, Nigeria</option>
      <option value="uk">United Kingdom</option>
      <option value="usa">United States</option>
      <option value="canada">Canada</option>
    </select>
    <p class="font-sans text-xs text-jm-gray-500">
      Hold Ctrl (Cmd on Mac) to select multiple locations
    </p>
  </div>

  <!-- Faith Filter -->
  <div class="space-y-3">
    <label class="block font-sans text-sm font-semibold text-jm-gray-700">
      Faith / Belief
    </label>
    <div class="space-y-2">
      <label class="flex items-center gap-3 cursor-pointer">
        <input
          type="checkbox"
          name="faith"
          value="christian"
          class="w-4 h-4 text-jm-purple border-jm-gray-300 rounded focus:ring-2 focus:ring-jm-purple/20"
        />
        <span class="font-sans text-sm text-jm-gray-700">Christian</span>
      </label>
      <label class="flex items-center gap-3 cursor-pointer">
        <input
          type="checkbox"
          name="faith"
          value="muslim"
          class="w-4 h-4 text-jm-purple border-jm-gray-300 rounded focus:ring-2 focus:ring-jm-purple/20"
        />
        <span class="font-sans text-sm text-jm-gray-700">Muslim</span>
      </label>
      <label class="flex items-center gap-3 cursor-pointer">
        <input
          type="checkbox"
          name="faith"
          value="spiritual"
          class="w-4 h-4 text-jm-purple border-jm-gray-300 rounded focus:ring-2 focus:ring-jm-purple/20"
        />
        <span class="font-sans text-sm text-jm-gray-700">Spiritual</span>
      </label>
      <label class="flex items-center gap-3 cursor-pointer">
        <input
          type="checkbox"
          name="faith"
          value="agnostic"
          class="w-4 h-4 text-jm-purple border-jm-gray-300 rounded focus:ring-2 focus:ring-jm-purple/20"
        />
        <span class="font-sans text-sm text-jm-gray-700">Agnostic</span>
      </label>
      <label class="flex items-center gap-3 cursor-pointer">
        <input
          type="checkbox"
          name="faith"
          value="other"
          class="w-4 h-4 text-jm-purple border-jm-gray-300 rounded focus:ring-2 focus:ring-jm-purple/20"
        />
        <span class="font-sans text-sm text-jm-gray-700">Other</span>
      </label>
    </div>
  </div>

  <!-- Tier Completion Filter -->
  <div class="space-y-3">
    <label class="block font-sans text-sm font-semibold text-jm-gray-700">
      Tier Completion Level
    </label>
    <div class="space-y-2">
      <label class="flex items-center gap-3 cursor-pointer">
        <input
          type="checkbox"
          name="tier"
          value="1"
          class="w-4 h-4 text-jm-purple border-jm-gray-300 rounded focus:ring-2 focus:ring-jm-purple/20"
        />
        <span class="font-sans text-sm text-jm-gray-700">Tier 1+ (Identity)</span>
      </label>
      <label class="flex items-center gap-3 cursor-pointer">
        <input
          type="checkbox"
          name="tier"
          value="2"
          class="w-4 h-4 text-jm-purple border-jm-gray-300 rounded focus:ring-2 focus:ring-jm-purple/20"
        />
        <span class="font-sans text-sm text-jm-gray-700">Tier 2+ (Lifestyle)</span>
      </label>
      <label class="flex items-center gap-3 cursor-pointer">
        <input
          type="checkbox"
          name="tier"
          value="3"
          class="w-4 h-4 text-jm-purple border-jm-gray-300 rounded focus:ring-2 focus:ring-jm-purple/20"
        />
        <span class="font-sans text-sm text-jm-gray-700">Tier 3+ (Family)</span>
      </label>
      <label class="flex items-center gap-3 cursor-pointer">
        <input
          type="checkbox"
          name="tier"
          value="4"
          class="w-4 h-4 text-jm-purple border-jm-gray-300 rounded focus:ring-2 focus:ring-jm-purple/20"
        />
        <span class="font-sans text-sm text-jm-gray-700">Tier 4+ (Health)</span>
      </label>
      <label class="flex items-center gap-3 cursor-pointer">
        <input
          type="checkbox"
          name="tier"
          value="5"
          class="w-4 h-4 text-jm-purple border-jm-gray-300 rounded focus:ring-2 focus:ring-jm-purple/20"
        />
        <span class="font-sans text-sm text-jm-gray-700">Tier 5 (Verified)</span>
      </label>
    </div>
    <p class="font-sans text-xs text-jm-gray-500">
      Shows users who have completed at least this tier
    </p>
  </div>

  <!-- Subscription Type Filter -->
  <div class="space-y-3">
    <label class="block font-sans text-sm font-semibold text-jm-gray-700">
      Subscription Level
    </label>
    <div class="space-y-2">
      <label class="flex items-center gap-3 cursor-pointer">
        <input
          type="checkbox"
          name="subscription"
          value="free"
          class="w-4 h-4 text-jm-purple border-jm-gray-300 rounded focus:ring-2 focus:ring-jm-purple/20"
        />
        <span class="font-sans text-sm text-jm-gray-700">Free Users</span>
      </label>
      <label class="flex items-center gap-3 cursor-pointer">
        <input
          type="checkbox"
          name="subscription"
          value="premium"
          class="w-4 h-4 text-jm-purple border-jm-gray-300 rounded focus:ring-2 focus:ring-jm-purple/20"
        />
        <span class="font-sans text-sm text-jm-gray-700">Premium Members</span>
      </label>
      <label class="flex items-center gap-3 cursor-pointer">
        <input
          type="checkbox"
          name="subscription"
          value="vip"
          class="w-4 h-4 text-jm-purple border-jm-gray-300 rounded focus:ring-2 focus:ring-jm-purple/20"
        />
        <span class="font-sans text-sm text-jm-gray-700">VIP Members</span>
      </label>
    </div>
  </div>

  <!-- Apply/Reset Buttons -->
  <div class="pt-6 border-t border-jm-gray-200 space-y-3">
    <button
      type="button"
      class="w-full bg-gradient-jm hover:bg-gradient-jm-hover text-white font-sans font-semibold px-6 py-3 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-jm-coral focus:ring-offset-2"
      onclick="applyFilters()"
    >
      Apply Filters
    </button>
    <button
      type="button"
      class="w-full border-2 border-jm-purple hover:border-jm-purple-dark text-jm-purple hover:text-jm-purple-dark hover:bg-jm-purple/5 font-sans font-medium px-6 py-3 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-jm-purple focus:ring-offset-2"
      onclick="resetFilters()"
    >
      Reset Filters
    </button>
  </div>
</aside>
```

**Behavior:**
- Filters persist in sessionStorage
- Age range sliders update display values in real-time
- Multi-select location dropdown supports Ctrl/Cmd + click
- Tier completion filter shows only tiers ≤ user's subscription ceiling
- VIP subscription filter disabled for Free/Premium users (shows tooltip: "VIP users are not browsable. Apply for VIP to receive curated introductions.")

---

## 4. Advanced Filter Controls

### 4.1 Age Range Slider

**Specification:**
- Minimum age: 18
- Maximum age: 60+
- Step: 1 year
- Default: 25-40
- Visual: Dual-handle range slider with purple accent

**JavaScript Logic:**
```javascript
function updateAgeRange() {
  const minInput = document.getElementById('age-min');
  const maxInput = document.getElementById('age-max');
  const minDisplay = document.getElementById('age-min-display');
  const maxDisplay = document.getElementById('age-max-display');

  let minAge = parseInt(minInput.value);
  let maxAge = parseInt(maxInput.value);

  // Ensure min doesn't exceed max
  if (minAge > maxAge) {
    minAge = maxAge;
    minInput.value = minAge;
  }

  // Update display
  minDisplay.textContent = `${minAge} years`;
  maxDisplay.textContent = maxAge >= 60 ? '60+ years' : `${maxAge} years`;

  // Store in filter state
  DiscoverState.filters.ageMin = minAge;
  DiscoverState.filters.ageMax = maxAge;
}
```

### 4.2 Location Filter (Multi-Select)

**Specification:**
- Type: Multi-select dropdown
- Options: Cities (Lagos, Abuja, Port Harcourt, Ibadan, Kano) + Countries (UK, USA, Canada)
- Default: User's current location pre-selected
- Behavior: Ctrl/Cmd + click to select multiple

**Options:**
```javascript
const locationOptions = [
  { value: 'lagos', label: 'Lagos, Nigeria', country: 'NG' },
  { value: 'abuja', label: 'Abuja, Nigeria', country: 'NG' },
  { value: 'port-harcourt', label: 'Port Harcourt, Nigeria', country: 'NG' },
  { value: 'ibadan', label: 'Ibadan, Nigeria', country: 'NG' },
  { value: 'kano', label: 'Kano, Nigeria', country: 'NG' },
  { value: 'uk', label: 'United Kingdom', country: 'GB' },
  { value: 'usa', label: 'United States', country: 'US' },
  { value: 'canada', label: 'Canada', country: 'CA' },
];
```

### 4.3 Faith/Denomination Filter

**Options:**
- Christian
- Muslim
- Spiritual (non-denominational)
- Agnostic
- Atheist
- Other

**Behavior:**
- Multiple checkboxes (allow multiple selections)
- Default: None selected (shows all)

### 4.4 Tier Completion Filter

**Options:**
- Tier 1+ (Identity & Intent)
- Tier 2+ (Lifestyle)
- Tier 3+ (Family & Relationships) [Premium+ only]
- Tier 4+ (Health) [Premium+ only]
- Tier 5 (Verified Identity) [VIP only]

**Subscription Gating:**
```javascript
function renderTierFilters() {
  const currentUser = AppState.users.get(AppState.currentUser.id);
  const tierFilters = document.getElementById('tier-filters');

  const tiers = [
    { level: 1, label: 'Tier 1+ (Identity)', available: true },
    { level: 2, label: 'Tier 2+ (Lifestyle)', available: true },
    { level: 3, label: 'Tier 3+ (Family)', available: currentUser.subscription !== 'free' },
    { level: 4, label: 'Tier 4+ (Health)', available: currentUser.subscription !== 'free' },
    { level: 5, label: 'Tier 5 (Verified)', available: currentUser.subscription === 'vip' },
  ];

  tiers.forEach(tier => {
    const checkbox = `
      <label class="flex items-center gap-3 cursor-pointer ${!tier.available ? 'opacity-50 cursor-not-allowed' : ''}">
        <input
          type="checkbox"
          name="tier"
          value="${tier.level}"
          class="w-4 h-4 text-jm-purple border-jm-gray-300 rounded focus:ring-2 focus:ring-jm-purple/20"
          ${!tier.available ? 'disabled' : ''}
        />
        <span class="font-sans text-sm text-jm-gray-700">${tier.label}</span>
        ${!tier.available ? '<svg class="w-4 h-4 text-jm-warning" fill="currentColor" viewBox="0 20 20"><path fill-rule="evenodd" d="M5 9V7a5 5 0110v2a2 2 012 2v5a2 2 01-2 2H5a2 2 01-2-2v-5a2 2 012-2zm8-2v2H7V7a3 3 016z" clip-rule="evenodd"/></svg>' : ''}
      </label>
    `;
    tierFilters.insertAdjacentHTML('beforeend', checkbox);
  });
}
```

### 4.5 Subscription Type Filter

**Options:**
- Free Users
- Premium Members
- VIP Members

**Subscription Gating:**
- Free users: Can only filter for other Free users (Premium/VIP checkboxes disabled)
- Premium users: Can filter Free/Premium (VIP disabled with tooltip)
- VIP users: Can filter all types

**Tooltip for VIP Filter (Premium Users):**
> "VIP members are not browsable. Apply for VIP to access curated introductions."

---

## 5. Profile Card Grid Layout

### 5.1 Grid Structure

**Desktop (≥1280px):** 3 columns
**Laptop (1024px-1279px):** 2 columns
**Tablet (768px-1023px):** 2 columns
**Mobile (≤767px):** 1 column

**HTML Structure:**
```html
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  <!-- Profile Card 1 -->
  <article class="bg-white rounded-xl shadow-md border border-jm-gray-200 overflow-hidden hover:shadow-lg transition-shadow duration-200">
    <!-- Photo -->
    <div class="relative aspect-[3/4] bg-jm-gray-100 overflow-hidden">
      <img
        src="/images/profiles/user-123.jpg"
        alt="Chidinma O., 28"
        class="w-full h-full object-cover"
        loading="lazy"
      />
      <!-- Subscription Badge -->
      <div class="absolute top-3 right-3 bg-jm-purple/90 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-semibold">
        Premium
      </div>
      <!-- Verified Badge (if Tier 5 complete) -->
      <div class="absolute top-3 left-3 bg-jm-success/90 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
        <svg class="w-3 h-3" fill="currentColor" viewBox="0 20 20">
          <path fill-rule="evenodd" d="M6.267 3.455a3.066 3.066 001.745-.723 3.066 3.066 013.976 3.066 3.066 001.745.723 3.066 3.066 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 010 3.976 3.066 3.066 00-.723 1.745 3.066 3.066 01-2.812 2.812 3.066 3.066 00-1.745.723 3.066 3.066 01-3.976 3.066 3.066 00-1.745-.723 3.066 3.066 01-2.812-2.812 3.066 3.066 00-.723-1.745 3.066 3.066 010-3.976 3.066 3.066 00.723-1.745 3.066 3.066 012.812-2.812zm7.44 5.252a1 1 00-1.414-1.414L9 10.586 7.707 9.293a1 1 00-1.414 1.414l2 2a1 1 001.414l4-4z" clip-rule="evenodd"/>
        </svg>
        Verified
      </div>
      <!-- Last Active -->
      <div class="absolute bottom-3 left-3 bg-black/60 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs">
        Active 2 hours ago
      </div>
    </div>

    <!-- Card Content -->
    <div class="p-5 space-y-4">
      <!-- Name & Age -->
      <div class="space-y-1">
        <h3 class="font-serif text-xl font-bold text-jm-gray-900">
          Chidinma O., 28
        </h3>
        <p class="font-sans text-sm text-jm-gray-600 flex items-center gap-2">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 01-2.827l-4.244-4.243a8 8 1111.314z"/>
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 11-6 3 3 016z"/>
          </svg>
          Lagos, Nigeria
        </p>
      </div>

      <!-- Tier Completion Progress -->
      <div class="space-y-2">
        <div class="flex items-center justify-between">
          <span class="font-sans text-xs font-medium text-jm-gray-600">
            Profile Completion
          </span>
          <span class="font-sans text-xs font-semibold text-jm-purple">
            Tier 3 of 4
          </span>
        </div>
        <div class="w-full bg-jm-gray-200 rounded-full h-2 overflow-hidden">
          <div class="bg-gradient-jm h-2 rounded-full" style="width: 75%"></div>
        </div>
      </div>

      <!-- Visible Tier Info (Based on EDT) -->
      <div class="space-y-2 pt-3 border-t border-jm-gray-200">
        <!-- Tier 1 Info (Always Visible) -->
        <div class="flex items-start gap-2">
          <svg class="w-4 h-4 text-jm-purple mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 20 20">
            <path d="M10 9a3 3 100-6 3 3 000 6zm-7 9a7 7 1114H3z"/>
          </svg>
          <p class="font-sans text-sm text-jm-gray-700">
            <span class="font-medium">Faith:</span> Christian (Catholic)
          </p>
        </div>
        <div class="flex items-start gap-2">
          <svg class="w-4 h-4 text-jm-purple mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 20 20">
            <path fill-rule="evenodd" d="M6 2a1 1 00-1 1v1H4a2 2 00-2 2v10a2 2 002 2h12a2 2 002-2V6a2 2 00-2-2h-1V3a1 1 10-2v1H7V3a1 1 00-1-1zm0 5a1 1 000 2h8a1 1 100-2H6z" clip-rule="evenodd"/>
          </svg>
          <p class="font-sans text-sm text-jm-gray-700">
            <span class="font-medium">Intent:</span> Marriage within 1-2 years
          </p>
        </div>

        <!-- Tier 2+ Info (Visible only if EDT ≥ 2) -->
        <!-- Hidden by default, shown if user has Tier 2+ and recipient shared Tier 2 -->
      </div>

      <!-- Show Interest Button (See Section 6 for all states) -->
      <div class="pt-4 border-t border-jm-gray-200">
        <button
          type="button"
          class="w-full bg-gradient-jm hover:bg-gradient-jm-hover text-white font-sans font-semibold px-6 py-3 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-jm-coral focus:ring-offset-2"
          onclick="showInterest('user-123')"
        >
          Show Interest
        </button>
      </div>

      <!-- Quick View Profile Link -->
      <div class="text-center">
        <a
          href="/app/profile/user-123"
          class="text-jm-purple hover:text-jm-purple-dark font-sans text-sm font-medium underline"
        >
          View Full Profile
        </a>
      </div>
    </div>
  </article>

  <!-- More profile cards... -->
</div>
```

### 5.2 Card Content Breakdown

**Elements:**
1. **Profile Photo** (aspect ratio 3:4)
2. **Subscription Badge** (top-right corner)
3. **Verified Badge** (top-left, if Tier 5 complete)
4. **Last Active Timestamp** (bottom-left)
5. **Name & Age** (headline)
6. **Location** (with icon)
7. **Tier Completion Progress Bar**
8. **Visible Tier Info** (EDT-based, see Section 11)
9. **Show Interest Button** (5 states, see Section 6)
10. **View Full Profile Link**

### 5.3 EDT-Based Visibility on Cards

**Display Logic:**
```javascript
/**
 * Calculate what tier information to show on profile card
 * @param {String} viewerId - Current user viewing the card
 * @param {String} profileId - Profile being viewed
 * @returns {Number} EDT level (1-5)
 */
function calculateCardEDT(viewerId, profileId) {
  const viewer = AppState.users.get(viewerId);
  const profile = AppState.users.get(profileId);

  // Default EDT is Tier 1 (public info) on Discover page
  // Relationship-specific EDT only applies after Show Interest acceptance
  const relationshipId = getRelationshipId(viewerId, profileId);
  const relationship = AppState.relationships.get(relationshipId);

  if (relationship && relationship.showInterestStatus === 'accepted') {
    // Calculate full EDT
    const isUser1 = relationship.userId1 === viewerId;
    const sharedByViewer = isUser1 ? relationship.sharedTierByUser1 : relationship.sharedTierByUser2;
    const sharedByProfile = isUser1 ? relationship.sharedTierByUser2 : relationship.sharedTierByUser1;

    return Math.min(
      viewer.maxCompletedTier,
      profile.maxCompletedTier,
      sharedByViewer,
      sharedByProfile
    );
  }

  // Pre-connection: Only show Tier 1 (public info)
  return 1;
}
```

**Visible Information by EDT:**

**EDT = 1 (Default on Discover):**
- Name (first name + last initial)
- Age
- Location (city, country)
- Faith/belief orientation
- Relationship intent
- Profile photo
- Subscription level badge
- Verified badge (if Tier 5 complete)
- Last active timestamp

**EDT ≥ 2 (After connection + Tier 2 sharing):**
- All Tier 1 info
- Height
- Education level
- Occupation category
- Lifestyle habits (smoking, alcohol, exercise)

**EDT ≥ 3, 4, 5:**
- Higher tier info only shown after Show Interest acceptance and detail request negotiation
- Not displayed on Discover cards (privacy protection)

---

## 6. Show Interest Button States

### State 1: Eligible (Green Gradient Button)

**Condition:**
- Sender subscription ≥ recipient subscription (Free→Free, Premium→Free/Premium, VIP→any)
- Sender has completed Tier 1
- No existing Show Interest sent
- Not in cooldown period
- Recipient account active

**HTML:**
```html
<button
  type="button"
  class="w-full bg-gradient-jm hover:bg-gradient-jm-hover text-white font-sans font-semibold px-6 py-3 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-jm-coral focus:ring-offset-2"
  onclick="showInterest('user-123')"
>
  Show Interest
</button>
```

**Behavior:**
- Click opens Tier Awareness Warning modal (see Section 7)
- User must acknowledge tier limitations before sending

---

### State 2: Subscription Mismatch (Disabled with Upgrade Prompt)

**Condition:**
- Free user viewing Premium/VIP profile
- Premium user viewing VIP profile

**HTML (Free → Premium):**
```html
<div class="space-y-2">
  <button
    type="button"
    class="w-full bg-jm-warning hover:bg-jm-warning/90 text-white font-sans font-semibold px-6 py-3 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-jm-warning focus:ring-offset-2"
    onclick="showUpgradeModal('premium')"
  >
    Upgrade to Contact
  </button>
  <p class="font-sans text-xs text-jm-gray-600 text-center">
    Premium required to send Show Interest
  </p>
</div>
```

**HTML (Premium → VIP):**
```html
<div class="space-y-2">
  <button
    type="button"
    class="w-full bg-jm-gray-300 text-jm-gray-500 font-sans font-semibold px-6 py-3 rounded-lg cursor-not-allowed"
    disabled
  >
    <svg class="w-5 h-5 inline-block mr-2" fill="currentColor" viewBox="0 20 20">
      <path fill-rule="evenodd" d="M5 9V7a5 5 0110v2a2 2 012 2v5a2 2 01-2 2H5a2 2 01-2-2v-5a2 2 012-2zm8-2v2H7V7a3 3 016z" clip-rule="evenodd"/>
    </svg>
    VIP Access Required
  </button>
  <p class="font-sans text-xs text-jm-gray-600 text-center">
    VIP members receive curated introductions only.
    <a href="/vip" class="text-jm-purple hover:text-jm-purple-dark font-medium underline">Learn about VIP</a>
  </p>
</div>
```

**Behavior:**
- Free user button opens Premium upgrade modal
- Premium user button is disabled, link to VIP landing page

---

### State 3: Cooldown Period (Disabled, Shows Remaining Days)

**Condition:**
- Recipient previously declined Show Interest
- 90-day cooldown period active
- Show remaining days until retry allowed

**HTML:**
```html
<div class="space-y-2">
  <button
    type="button"
    class="w-full bg-jm-error/20 text-jm-error font-sans font-semibold px-6 py-3 rounded-lg cursor-not-allowed"
    disabled
  >
    <svg class="w-5 h-5 inline-block mr-2" fill="currentColor" viewBox="0 20 20">
      <path fill-rule="evenodd" d="M10 18a8 8 100-16 8 8 000 16zM8.707 7.293a1 1 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 101.414 1.414L10 11.414l1.293 1.293a1 1 001.414-1.414L11.414 10l1.293-1.293a1 1 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"/>
    </svg>
    Show Interest Declined
  </button>
  <p class="font-sans text-xs text-jm-error text-center">
    Available in <span class="font-semibold" id="cooldown-days">23 days</span>
  </p>
  <p class="font-sans text-xs text-jm-gray-500 text-center">
    You can send Show Interest again on <span class="font-medium">May 20, 2026</span>
  </p>
</div>
```

**JavaScript for Countdown:**
```javascript
function updateCooldownCountdown(cooldownEnds) {
  const now = new Date();
  const endDate = new Date(cooldownEnds);
  const daysRemaining = Math.ceil((endDate - now) / (1000 * 60 * 60 * 24));

  document.getElementById('cooldown-days').textContent = `${daysRemaining} days`;
}
```

---

### State 4: Already Interested (Shows Pending Status)

**Condition:**
- Show Interest already sent
- Waiting for recipient response

**HTML:**
```html
<div class="space-y-2">
  <button
    type="button"
    class="w-full bg-jm-gray-200 text-jm-gray-600 font-sans font-semibold px-6 py-3 rounded-lg cursor-not-allowed"
    disabled
  >
    <svg class="w-5 h-5 inline-block mr-2 animate-pulse" fill="currentColor" viewBox="0 20 20">
      <path fill-rule="evenodd" d="M10 18a8 8 100-16 8 8 000 16zm1-12a1 1 10-2v4a1 1 00.293.707l2.828 2.829a1 1 101.415-1.415L11 9.586V6z" clip-rule="evenodd"/>
    </svg>
    Show Interest Sent
  </button>
  <p class="font-sans text-xs text-jm-gray-600 text-center">
    Waiting for response...
  </p>
  <button
    type="button"
    class="text-jm-error hover:text-jm-error/80 font-sans text-xs font-medium underline w-full"
    onclick="revokeShowInterest('user-123')"
  >
    Cancel Show Interest
  </button>
</div>
```

**Behavior:**
- Pending indicator shows animated pulse
- User can cancel Show Interest (revoke)
- Revocation returns state to State 1 (Eligible)

---

### State 5: Accepted/Matched (Shows Message Button)

**Condition:**
- Recipient accepted Show Interest
- Mutual connection established
- Messaging unlocked

**HTML:**
```html
<div class="space-y-2">
  <a
    href="/app/messages/user-123"
    class="block w-full bg-jm-success hover:bg-jm-success/90 text-white font-sans font-semibold px-6 py-3 rounded-lg text-center transition-all duration-200 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-jm-success focus:ring-offset-2"
  >
    <svg class="w-5 h-5 inline-block mr-2" fill="currentColor" viewBox="0 20 20">
      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0016 4H4a2 2 00-1.997 1.884z"/>
      <path d="M18 8.118l-8 4-8-4V14a2 2 002 2h12a2 2 002-2V8.118z"/>
    </svg>
    Send Message
  </a>
  <p class="font-sans text-xs text-jm-success text-center font-medium">
    <svg class="w-4 h-4 inline-block" fill="currentColor" viewBox="0 20 20">
      <path fill-rule="evenodd" d="M10 18a8 8 100-16 8 8 000 16zm3.707-9.293a1 1 00-1.414-1.414L9 10.586 7.707 9.293a1 1 00-1.414 1.414l2 2a1 1 001.414l4-4z" clip-rule="evenodd"/>
    </svg>
    Connected
  </p>
</div>
```

**Behavior:**
- Button navigates to Messages page with conversation pre-selected
- Green success color indicates mutual connection

---

## 7. Subscription Ceiling Warnings

### Tier Awareness Warning Modal (Before Show Interest)

**Trigger:** User clicks "Show Interest" button (State 1)

**Purpose:**
- Inform user what tier information they will see
- Manage expectations before connection
- Prevent frustration from EDT limitations

**HTML Structure:**
```html
<!-- Modal Overlay -->
<div
  id="tier-awareness-modal"
  class="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 hidden items-center justify-center p-4"
  onclick="closeTierAwarenessModal(event)"
>
  <!-- Modal Container -->
  <div
    class="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
    onclick="event.stopPropagation()"
  >
    <!-- Modal Header -->
    <div class="bg-gradient-to-r from-jm-purple-deep to-jm-coral p-6">
      <div class="flex items-start justify-between">
        <div class="space-y-2">
          <h2 class="font-serif text-2xl font-bold text-white">
            Tier Awareness
          </h2>
          <p class="font-sans text-sm text-white/90">
            Understand what information you'll see before connecting
          </p>
        </div>
        <button
          type="button"
          class="text-white hover:text-white/80 p-2 rounded-full hover:bg-white/10 transition-all duration-200"
          onclick="closeTierAwarenessModal()"
          aria-label="Close modal"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>
      </div>
    </div>

    <!-- Modal Body -->
    <div class="p-6 space-y-6">
      <!-- Current User Tier Status -->
      <div class="bg-jm-purple/5 border-2 border-jm-purple/20 rounded-lg p-5 space-y-3">
        <h3 class="font-sans text-lg font-semibold text-jm-gray-900 flex items-center gap-2">
          <svg class="w-5 h-5 text-jm-purple" fill="currentColor" viewBox="0 20 20">
            <path fill-rule="evenodd" d="M10 9a3 3 100-6 3 3 000 6zm-7 9a7 7 1114H3z" clip-rule="evenodd"/>
          </svg>
          Your Profile Status
        </h3>
        <div class="grid grid-cols-2 gap-4">
          <div>
            <p class="font-sans text-xs text-jm-gray-600 uppercase tracking-wide mb-1">
              Subscription
            </p>
            <p class="font-sans text-base font-semibold text-jm-purple">
              Premium
            </p>
          </div>
          <div>
            <p class="font-sans text-xs text-jm-gray-600 uppercase tracking-wide mb-1">
              Completed Tier
            </p>
            <p class="font-sans text-base font-semibold text-jm-purple">
              Tier 3 of 4
            </p>
          </div>
        </div>
      </div>

      <!-- Recipient Tier Status -->
      <div class="bg-jm-coral/5 border-2 border-jm-coral/20 rounded-lg p-5 space-y-3">
        <h3 class="font-sans text-lg font-semibold text-jm-gray-900 flex items-center gap-2">
          <svg class="w-5 h-5 text-jm-coral" fill="currentColor" viewBox="0 20 20">
            <path d="M9 6a3 3 11-6 3 3 016zM17 6a3 3 11-6 3 3 016zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 00-1.5-4.33A5 5 0119 16v1h-6.07zM6 11a5 5 015 5v1H1v-1a5 5 015-5z"/>
          </svg>
          Chidinma's Profile Status
        </h3>
        <div class="grid grid-cols-2 gap-4">
          <div>
            <p class="font-sans text-xs text-jm-gray-600 uppercase tracking-wide mb-1">
              Subscription
            </p>
            <p class="font-sans text-base font-semibold text-jm-coral">
              Premium
            </p>
          </div>
          <div>
            <p class="font-sans text-xs text-jm-gray-600 uppercase tracking-wide mb-1">
              Completed Tier
            </p>
            <p class="font-sans text-base font-semibold text-jm-coral">
              Tier 3 of 4
            </p>
          </div>
        </div>
      </div>

      <!-- What You Will See -->
      <div class="space-y-4">
        <h3 class="font-sans text-lg font-semibold text-jm-gray-900">
          What You Will See (Initial EDT: Tier 1)
        </h3>
        <div class="space-y-3">
          <!-- Tier 1: Visible -->
          <div class="flex items-start gap-3">
            <div class="w-6 h-6 rounded-full bg-jm-success/10 flex items-center justify-center flex-shrink-0 mt-0.5">
              <svg class="w-4 h-4 text-jm-success" fill="currentColor" viewBox="0 20 20">
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 010 1.414l-8 8a1 1 01-1.414l-4-4a1 1 011.414-1.414L8 12.586l7.293-7.293a1 1 011.414z" clip-rule="evenodd"/>
              </svg>
            </div>
            <div class="flex-1">
              <p class="font-sans text-sm font-semibold text-jm-gray-900">
                Tier 1: Identity & Intent
              </p>
              <p class="font-sans text-xs text-jm-gray-600 mt-1">
                Name, age, location, faith, relationship intent, profile photo
              </p>
            </div>
          </div>

          <!-- Tier 2: Locked Initially -->
          <div class="flex items-start gap-3 opacity-60">
            <div class="w-6 h-6 rounded-full bg-jm-gray-200 flex items-center justify-center flex-shrink-0 mt-0.5">
              <svg class="w-4 h-4 text-jm-gray-500" fill="currentColor" viewBox="0 20 20">
                <path fill-rule="evenodd" d="M5 9V7a5 5 0110v2a2 2 012 2v5a2 2 01-2 2H5a2 2 01-2-2v-5a2 2 012-2zm8-2v2H7V7a3 3 016z" clip-rule="evenodd"/>
              </svg>
            </div>
            <div class="flex-1">
              <p class="font-sans text-sm font-semibold text-jm-gray-700">
                Tier 2-3: Lifestyle & Family
              </p>
              <p class="font-sans text-xs text-jm-gray-600 mt-1">
                Locked until you both request and share these tiers
              </p>
            </div>
          </div>

          <!-- Tier 4: Locked (Subscription Ceiling) -->
          <div class="flex items-start gap-3 opacity-60">
            <div class="w-6 h-6 rounded-full bg-jm-gray-200 flex items-center justify-center flex-shrink-0 mt-0.5">
              <svg class="w-4 h-4 text-jm-gray-500" fill="currentColor" viewBox="0 20 20">
                <path fill-rule="evenodd" d="M5 9V7a5 5 0110v2a2 2 012 2v5a2 2 01-2 2H5a2 2 01-2-2v-5a2 2 012-2zm8-2v2H7V7a3 3 016z" clip-rule="evenodd"/>
              </svg>
            </div>
            <div class="flex-1">
              <p class="font-sans text-sm font-semibold text-jm-gray-700">
                Tier 4-5: Health & Verified Identity
              </p>
              <p class="font-sans text-xs text-jm-gray-600 mt-1">
                Available after connecting and requesting details
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Important Notice -->
      <div class="bg-jm-warning/10 border-l-4 border-jm-warning p-4 space-y-2">
        <div class="flex items-start gap-3">
          <svg class="w-5 h-5 text-jm-warning flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 20 20">
            <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 11-2 1 1 012zm-1-8a1 1 00-1 1v3a1 1 002V6a1 1 00-1-1z" clip-rule="evenodd"/>
          </svg>
          <div class="flex-1">
            <p class="font-sans text-sm font-semibold text-jm-warning mb-1">
              Important: Tier Access Requires Mutual Sharing
            </p>
            <p class="font-sans text-xs text-jm-gray-700">
              To see Tier 2+ information, both you and Chidinma must:
            </p>
            <ul class="font-sans text-xs text-jm-gray-700 list-disc list-inside mt-2 space-y-1">
              <li>Complete that tier yourselves</li>
              <li>Explicitly request and share that tier</li>
              <li>Have appropriate subscription (Premium for Tier 3-4, VIP for Tier 5)</li>
            </ul>
          </div>
        </div>
      </div>

      <!-- Confirmation Checkbox -->
      <div class="bg-jm-gray-50 border-2 border-jm-gray-200 rounded-lg p-4">
        <label class="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            id="tier-awareness-confirm"
            class="w-5 h-5 text-jm-purple border-jm-gray-300 rounded focus:ring-2 focus:ring-jm-purple/20 mt-0.5"
            onchange="toggleSendInterestButton()"
          />
          <span class="font-sans text-sm text-jm-gray-700">
            I understand the tier limitations and EDT calculations. I acknowledge that I will initially see only Tier 1 information until we both request and share higher tiers.
          </span>
        </label>
      </div>
    </div>

    <!-- Modal Footer -->
    <div class="bg-jm-gray-50 border-t border-jm-gray-200 p-6 flex flex-col sm:flex-row items-center justify-end gap-3">
      <button
        type="button"
        class="w-full sm:w-auto border-2 border-jm-gray-300 hover:border-jm-gray-400 text-jm-gray-700 hover:text-jm-gray-900 font-sans font-medium px-6 py-3 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-jm-gray-400 focus:ring-offset-2"
        onclick="closeTierAwarenessModal()"
      >
        Cancel
      </button>
      <button
        type="button"
        id="send-interest-btn"
        class="w-full sm:w-auto bg-gradient-jm hover:bg-gradient-jm-hover text-white font-sans font-semibold px-8 py-3 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-jm-coral focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
        onclick="confirmShowInterest()"
        disabled
      >
        Send Show Interest
      </button>
    </div>
  </div>
</div>
```

**JavaScript Logic:**
```javascript
function toggleSendInterestButton() {
  const checkbox = document.getElementById('tier-awareness-confirm');
  const button = document.getElementById('send-interest-btn');
  button.disabled = !checkbox.checked;
}

function closeTierAwarenessModal(event) {
  // Close modal only if clicking overlay (not modal content)
  if (event && event.target !== event.currentTarget) return;

  const modal = document.getElementById('tier-awareness-modal');
  modal.classList.add('hidden');
  modal.classList.remove('flex');

  // Reset checkbox
  document.getElementById('tier-awareness-confirm').checked = false;
  document.getElementById('send-interest-btn').disabled = true;
}

function confirmShowInterest() {
  const recipientId = DiscoverState.pendingShowInterestRecipient;

  // Send Show Interest
  sendShowInterest(recipientId);

  // Close modal
  closeTierAwarenessModal();

  // Show success toast
  showToast('Show Interest sent successfully!', 'success');

  // Update card button state
  updateCardButtonState(recipientId, 'pending');
}
```

---

## 8. Empty States

### 8.1 No Matches Found (Filters Too Restrictive)

**HTML:**
```html
<div class="flex flex-col items-center justify-center py-16 px-4">
  <svg class="w-24 h-24 text-jm-gray-300 mb-6" fill="none" stroke="currentColor" viewBox="0 24 24">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 015.656M9 10h.01M15 10h.01M21 12a9 9 11-18 9 9 0118z"/>
  </svg>
  <h2 class="font-serif text-2xl font-bold text-jm-gray-900 mb-3">
    No Matches Found
  </h2>
  <p class="font-sans text-base text-jm-gray-600 text-center max-w-md mb-6">
    We couldn't find any profiles matching your current filters. Try adjusting your preferences to see more matches.
  </p>
  <div class="flex flex-col sm:flex-row items-center gap-3">
    <button
      type="button"
      class="bg-gradient-jm hover:bg-gradient-jm-hover text-white font-sans font-semibold px-6 py-3 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-jm-coral focus:ring-offset-2"
      onclick="resetFilters()"
    >
      Reset All Filters
    </button>
    <button
      type="button"
      class="border-2 border-jm-purple hover:border-jm-purple-dark text-jm-purple hover:text-jm-purple-dark hover:bg-jm-purple/5 font-sans font-medium px-6 py-3 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-jm-purple focus:ring-offset-2"
      onclick="adjustFilters()"
    >
      Adjust Filters
    </button>
  </div>
</div>
```

### 8.2 No Matches (New User, Empty Database)

**HTML:**
```html
<div class="flex flex-col items-center justify-center py-16 px-4">
  <svg class="w-24 h-24 text-jm-gray-300 mb-6" fill="none" stroke="currentColor" viewBox="0 24 24">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 110 5.292M15 21H3v-1a6 6 0112v1zm0h6v-1a6 6 00-9-5.197M13 7a4 4 11-8 4 4 018z"/>
  </svg>
  <h2 class="font-serif text-2xl font-bold text-jm-gray-900 mb-3">
    Welcome to JoyMatcher!
  </h2>
  <p class="font-sans text-base text-jm-gray-600 text-center max-w-md mb-6">
    We're currently building your match recommendations. Check back soon or complete more tiers to improve your matches.
  </p>
  <a
    href="/app/tier/2"
    class="bg-gradient-jm hover:bg-gradient-jm-hover text-white font-sans font-semibold px-8 py-3 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-jm-coral focus:ring-offset-2"
  >
    Complete Next Tier
  </a>
</div>
```

### 8.3 Subscription Ceiling Hit (Free User, No Premium Matches)

**HTML:**
```html
<div class="flex flex-col items-center justify-center py-16 px-4">
  <svg class="w-24 h-24 text-jm-warning mb-6" fill="currentColor" viewBox="0 20 20">
    <path fill-rule="evenodd" d="M5 9V7a5 5 0110v2a2 2 012 2v5a2 2 01-2 2H5a2 2 01-2-2v-5a2 2 012-2zm8-2v2H7V7a3 3 016z" clip-rule="evenodd"/>
  </svg>
  <h2 class="font-serif text-2xl font-bold text-jm-gray-900 mb-3">
    Upgrade to See More Matches
  </h2>
  <p class="font-sans text-base text-jm-gray-600 text-center max-w-md mb-6">
    You've viewed all available Free users. Upgrade to Premium to browse Premium members and access deeper compatibility features.
  </p>
  <a
    href="/app/upgrade"
    class="bg-jm-warning hover:bg-jm-warning/90 text-white font-sans font-semibold px-8 py-3 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-jm-warning focus:ring-offset-2"
  >
    Upgrade to Premium
  </a>
</div>
```

---

## 9. Pagination & Loading

### 9.1 Load More Button (Default)

**HTML:**
```html
<div class="flex items-center justify-center py-12">
  <button
    type="button"
    id="load-more-btn"
    class="border-2 border-jm-purple hover:border-jm-purple-dark text-jm-purple hover:text-jm-purple-dark hover:bg-jm-purple/5 font-sans font-semibold px-8 py-3 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-jm-purple focus:ring-offset-2"
    onclick="loadMoreProfiles()"
  >
    Load More Profiles
  </button>
</div>
```

### 9.2 Loading State (Skeleton Loader)

**HTML:**
```html
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  <!-- Skeleton Card 1 -->
  <div class="bg-white rounded-xl shadow-md border border-jm-gray-200 overflow-hidden animate-pulse">
    <div class="aspect-[3/4] bg-jm-gray-200"></div>
    <div class="p-5 space-y-4">
      <div class="space-y-2">
        <div class="h-6 bg-jm-gray-200 rounded w-3/4"></div>
        <div class="h-4 bg-jm-gray-200 rounded w-1/2"></div>
      </div>
      <div class="space-y-2">
        <div class="h-2 bg-jm-gray-200 rounded"></div>
        <div class="h-4 bg-jm-gray-200 rounded w-2/3"></div>
      </div>
      <div class="h-12 bg-jm-gray-200 rounded"></div>
    </div>
  </div>

  <!-- Repeat skeleton cards... -->
</div>
```

### 9.3 Infinite Scroll (Optional)

**JavaScript:**
```javascript
function initInfiniteScroll() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !DiscoverState.loading && DiscoverState.hasMore) {
        loadMoreProfiles();
      }
    });
  }, {
    rootMargin: '200px' // Start loading 200px before reaching bottom
  });

  const sentinel = document.getElementById('scroll-sentinel');
  if (sentinel) {
    observer.observe(sentinel);
  }
}

// Sentinel element at bottom of grid
<div id="scroll-sentinel" class="h-4"></div>
```

---

## 10. Sort Options

### 10.1 Sort Dropdown

**HTML:**
```html
<div class="flex items-center justify-between mb-6">
  <p class="font-sans text-sm text-jm-gray-600">
    Showing <span class="font-semibold">18</span> matches
  </p>
  <div class="flex items-center gap-2">
    <label for="sort-select" class="font-sans text-sm font-medium text-jm-gray-700">
      Sort by:
    </label>
    <select
      id="sort-select"
      class="px-4 py-2 rounded-lg border-2 border-jm-gray-300 focus:border-jm-purple focus:ring-2 focus:ring-jm-purple/20 font-sans text-sm text-jm-gray-900 transition-all duration-200 focus:outline-none"
      onchange="updateSort(this.value)"
    >
      <option value="recently-active">Recently Active</option>
      <option value="newest-members">Newest Members</option>
      <option value="tier-completion">Tier Completion</option>
      <option value="profile-completeness">Profile Completeness</option>
    </select>
  </div>
</div>
```

### 10.2 Sort Logic

**JavaScript:**
```javascript
function updateSort(sortOption) {
  DiscoverState.sortBy = sortOption;

  // Show loading state
  showLoadingState();

  // Fetch sorted profiles
  const profiles = getSortedProfiles(sortOption);

  // Render profiles
  renderProfileGrid(profiles);
}

function getSortedProfiles(sortBy) {
  const profiles = [...DiscoverState.filteredProfiles];

  switch (sortBy) {
    case 'recently-active':
      return profiles.sort((a, b) => b.lastActive - a.lastActive);

    case 'newest-members':
      return profiles.sort((a, b) => b.joinedDate - a.joinedDate);

    case 'tier-completion':
      return profiles.sort((a, b) => b.maxCompletedTier - a.maxCompletedTier);

    case 'profile-completeness':
      return profiles.sort((a, b) => {
        const aPercent = (a.completedTiers.length / a.subscriptionCeiling) * 100;
        const bPercent = (b.completedTiers.length / b.subscriptionCeiling) * 100;
        return bPercent - aPercent;
      });

    default:
      return profiles;
  }
}
```

---

## 11. EDT-Based Tier Visibility

### Default EDT on Discover: Tier 1 Only

**Rule:** Before Show Interest acceptance, all profile cards show only Tier 1 (public) information.

**Rationale:**
- Protects privacy before mutual consent established
- Enforces consent-based disclosure model
- Prevents free-riding on others' transparency

**Visible Tier 1 Fields:**
- Display name (first name + last initial)
- Age
- Location (city, country)
- Faith/belief orientation
- Relationship intent
- Profile photo
- Subscription badge
- Verified badge (if Tier 5 complete)
- Last active timestamp
- Tier completion progress (visual only, not detailed data)

**Hidden Until Connection + Request:**
- Tier 2: Lifestyle details
- Tier 3: Family/relationship history
- Tier 4: Health information
- Tier 5: KYC verification details (never peer-shared)

### Progressive EDT After Connection

**After Show Interest Acceptance:**
1. Users can send "Request Details" to each other
2. Recipient decides what tier to share (2, 3, 4, or 5)
3. System calculates EDT based on mutual sharing
4. Profile view updates to show shared tier information

**Example Flow:**
```
Initial State (Discover):
- User A views User B's card
- EDT = 1 (public only)
- User A sees: Name, age, location, faith, intent

After Show Interest Acceptance:
- User A and User B mutually accept Show Interest
- EDT still = 1 (no tier sharing yet)

User A Requests Tier 2:
- User A sends "Request Tier 2" to User B
- User A offers Tier 2 in exchange
- User B accepts and shares Tier 2
- EDT recalculates to 2
- User A now sees User B's Tier 2 data (lifestyle)
- User B sees User A's Tier 2 data (reciprocal)
```

---

## 12. User Interactions & Flows

### 12.1 Browse and Filter Flow

**User Journey:**
1. User lands on Discover page
2. Sees default grid (sorted by Recently Active)
3. Opens filter sidebar
4. Selects filters: Age 28-35, Location: Lagos, Faith: Christian, Tier: Tier 3+
5. Clicks "Apply Filters"
6. Grid updates with filtered results (18 matches)
7. User scrolls through profiles
8. User finds compatible match
9. Clicks profile card to view full profile
10. Returns to Discover, clicks "Show Interest"

### 12.2 Show Interest Flow (From Discover)

**User Journey:**
1. User clicks "Show Interest" button on profile card
2. Tier Awareness Warning modal opens
3. User reviews:
   - Own tier completion (Tier 3)
   - Recipient's tier completion (Tier 3)
   - Expected EDT (Tier 1 initially)
   - What information will be visible
4. User checks "I understand" checkbox
5. "Send Show Interest" button enables
6. User clicks "Send Show Interest"
7. Modal closes
8. Success toast appears: "Show Interest sent successfully!"
9. Card button state updates to "Show Interest Sent (Pending)"
10. User can continue browsing or navigate to Interests page

### 12.3 Subscription Upgrade Flow (From Discover)

**User Journey (Free → Premium):**
1. Free user browses Discover page
2. Sees Premium user profile (attractive match)
3. Clicks "Show Interest" button
4. Button shows "Upgrade to Contact" (State 2)
5. User clicks button
6. Premium Upgrade Modal opens
7. Modal shows:
   - Premium benefits (Tier 3-4 access, request details, browse Premium users)
   - Pricing (₦18,000/month or $18/month)
   - "Upgrade Now" button
8. User clicks "Upgrade Now"
9. Navigates to `/app/upgrade` (payment page)
10. User completes payment
11. Redirects back to Discover with Premium access
12. "Show Interest" button now enabled (State 1)
13. User sends Show Interest successfully

---

## 13. State Management Requirements

### Global Discover State

```javascript
const DiscoverState = {
  // User context
  currentUser: {
    id: String,
    subscription: String, // 'free' | 'premium' | 'vip'
    subscriptionCeiling: Number, // 2 | 4 | 5
    completedTiers: Array<Number>, // [1, 2, 3]
    maxCompletedTier: Number, // 3
    country: String // 'NG' | 'US' | etc
  },

  // Filter state
  filters: {
    ageMin: 25,
    ageMax: 40,
    locations: ['lagos', 'abuja'], // Multi-select
    faiths: ['christian'], // Multi-select checkboxes
    tierCompletion: [3], // Show users with Tier 3+
    subscriptionTypes: ['free', 'premium'] // Show Free and Premium users
  },

  // Sort state
  sortBy: 'recently-active', // 'recently-active' | 'newest-members' | 'tier-completion' | 'profile-completeness'

  // Pagination state
  page: 1,
  pageSize: 18,
  totalResults: 156,
  hasMore: true,

  // Loading state
  loading: false,
  error: null,

  // Profiles data
  allProfiles: Array<Profile>, // Full dataset
  filteredProfiles: Array<Profile>, // After filter application
  displayedProfiles: Array<Profile>, // Currently rendered (paginated)

  // Pending Show Interest (for modal)
  pendingShowInterestRecipient: null
};
```

### Filter Application Logic

```javascript
function applyFilters() {
  const filters = DiscoverState.filters;
  const currentUser = DiscoverState.currentUser;

  // Start with all profiles
  let filtered = [...DiscoverState.allProfiles];

  // Age filter
  filtered = filtered.filter(profile => {
    const age = calculateAge(profile.dateOfBirth);
    return age >= filters.ageMin && age <= filters.ageMax;
  });

  // Location filter (if any selected)
  if (filters.locations.length > 0) {
    filtered = filtered.filter(profile =>
      filters.locations.includes(profile.city.toLowerCase()) ||
      filters.locations.includes(profile.country.toLowerCase())
    );
  }

  // Faith filter (if any selected)
  if (filters.faiths.length > 0) {
    filtered = filtered.filter(profile =>
      filters.faiths.includes(profile.faith.toLowerCase())
    );
  }

  // Tier completion filter (if any selected)
  if (filters.tierCompletion.length > 0) {
    filtered = filtered.filter(profile => {
      const maxTierFilter = Math.max(...filters.tierCompletion);
      return profile.maxCompletedTier >= maxTierFilter;
    });
  }

  // Subscription type filter (if any selected)
  if (filters.subscriptionTypes.length > 0) {
    filtered = filtered.filter(profile =>
      filters.subscriptionTypes.includes(profile.subscription)
    );
  }

  // Subscription eligibility enforcement
  // Free users can only see other Free users
  if (currentUser.subscription === 'free') {
    filtered = filtered.filter(profile => profile.subscription === 'free');
  }
  // Premium users can see Free and Premium users
  else if (currentUser.subscription === 'premium') {
    filtered = filtered.filter(profile =>
      profile.subscription === 'free' || profile.subscription === 'premium'
    );
  }
  // VIP users can see all subscription types

  // Update state
  DiscoverState.filteredProfiles = filtered;
  DiscoverState.totalResults = filtered.length;
  DiscoverState.page = 1; // Reset to first page

  // Apply sort
  const sorted = getSortedProfiles(DiscoverState.sortBy);

  // Paginate
  DiscoverState.displayedProfiles = sorted.slice(0, DiscoverState.pageSize);
  DiscoverState.hasMore = sorted.length > DiscoverState.pageSize;

  // Render
  renderProfileGrid(DiscoverState.displayedProfiles);
}
```

### Load More Logic

```javascript
function loadMoreProfiles() {
  if (!DiscoverState.hasMore || DiscoverState.loading) return;

  // Set loading state
  DiscoverState.loading = true;
  showLoadingState();

  // Simulate API delay
  setTimeout(() => {
    const sorted = getSortedProfiles(DiscoverState.sortBy);
    DiscoverState.page++;

    const startIndex = (DiscoverState.page - 1) * DiscoverState.pageSize;
    const endIndex = startIndex + DiscoverState.pageSize;

    const newProfiles = sorted.slice(startIndex, endIndex);
    DiscoverState.displayedProfiles.push(...newProfiles);

    DiscoverState.hasMore = endIndex < sorted.length;
    DiscoverState.loading = false;

    // Append new cards to grid
    appendProfileCards(newProfiles);
  }, 500);
}
```

---

## 14. Accessibility Requirements

### WCAG 2.1 AA Compliance

**Keyboard Navigation:**
- All profile cards focusable via Tab key
- Filter controls fully keyboard accessible
- Modal dialogs trap focus (Tab cycles within modal)
- Escape key closes modals
- Enter/Space activates buttons

**Screen Reader Support:**
- Profile cards use `<article>` semantic elements
- All images have descriptive alt text: "Chidinma O., 28, Premium member, Verified"
- Filter labels properly associated with inputs
- ARIA labels for icon buttons: `aria-label="Close modal"`
- Live regions for dynamic updates: `aria-live="polite"` on filter result count

**Color Contrast:**
- Text on white: 4.5:1 minimum (WCAG AA)
- Button text on gradients: 4.5:1 minimum
- Disabled states: Clearly distinguishable (opacity + cursor change)

**Focus Indicators:**
- Visible 2px purple ring on all interactive elements
- Focus ring offset for clarity
- Never remove focus outlines

**Semantic HTML:**
- Proper heading hierarchy (H1 → H2 → H3)
- `<nav>`, `<main>`, `<aside>` landmarks
- Lists for filter checkboxes
- `<button>` for actions, `<a>` for navigation

---

## 15. Mobile Responsive Behavior

### Breakpoints

**Mobile (320px-767px):**
- Single column grid
- Filters collapse to drawer/modal (hamburger icon)
- Sort dropdown full width
- Profile cards full width
- Sticky filter button at bottom of screen

**Tablet (768px-1023px):**
- Two-column grid
- Filters in top collapsible bar
- Sort dropdown inline
- Profile cards responsive

**Desktop (≥1024px):**
- Three-column grid (≥1280px) or two-column (1024px-1279px)
- Sticky filter sidebar
- Sort dropdown inline
- Full layout

### Mobile Filter Drawer

**HTML:**
```html
<!-- Filter Toggle Button (Mobile Only) -->
<button
  type="button"
  class="lg:hidden fixed bottom-6 right-6 bg-gradient-jm hover:bg-gradient-jm-hover text-white p-4 rounded-full shadow-2xl z-40 focus:outline-none focus:ring-2 focus:ring-jm-coral focus:ring-offset-2"
  onclick="openMobileFilters()"
  aria-label="Open filters"
>
  <svg class="w-6 h-6" fill="currentColor" viewBox="0 20 20">
    <path fill-rule="evenodd" d="M3 3a1 1 011-1h12a1 1 011 1v3a1 1 01-.293.707L12 11.414V15a1 1 01-.293.707l-2 2A1 1 018 17v-5.586L3.293 6.707A1 1 013 6V3z" clip-rule="evenodd"/>
  </svg>
  <span class="absolute -top-2 -right-2 bg-jm-coral text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
    5
  </span>
</button>

<!-- Filter Drawer (Mobile) -->
<div
  id="mobile-filter-drawer"
  class="lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-50 hidden"
  onclick="closeMobileFilters(event)"
>
  <div
    class="absolute inset-y-0 right-0 w-full max-w-sm bg-white shadow-2xl overflow-y-auto"
    onclick="event.stopPropagation()"
  >
    <!-- Drawer Header -->
    <div class="sticky top-0 bg-white border-b border-jm-gray-200 p-4 flex items-center justify-between z-10">
      <h2 class="font-serif text-xl font-bold text-jm-gray-900">
        Filters
      </h2>
      <button
        type="button"
        class="text-jm-gray-600 hover:text-jm-gray-900 p-2 rounded-full hover:bg-jm-gray-100 transition-all duration-200"
        onclick="closeMobileFilters()"
        aria-label="Close filters"
      >
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
        </svg>
      </button>
    </div>

    <!-- Filter Content (Same as sidebar) -->
    <div class="p-6 space-y-6">
      <!-- Age, Location, Faith, Tier, Subscription filters -->
      <!-- (Copy from sidebar above) -->
    </div>

    <!-- Drawer Footer -->
    <div class="sticky bottom-0 bg-white border-t border-jm-gray-200 p-4 space-y-3">
      <button
        type="button"
        class="w-full bg-gradient-jm hover:bg-gradient-jm-hover text-white font-sans font-semibold px-6 py-3 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-jm-coral focus:ring-offset-2"
        onclick="applyFiltersAndClose()"
      >
        Apply Filters
      </button>
      <button
        type="button"
        class="w-full text-jm-purple hover:text-jm-purple-dark font-sans font-medium"
        onclick="resetFilters()"
      >
        Reset All
      </button>
    </div>
  </div>
</div>
```

### Touch Targets

**Minimum 44x44px for all interactive elements:**
- Buttons
- Checkboxes
- Links
- Profile cards (entire card clickable)

---

## 16. Performance Optimization

### Image Optimization

**Profile Photos:**
- Lazy loading: `loading="lazy"` attribute
- Responsive srcset for different screen sizes
- WebP format with JPG fallback
- Blur placeholder while loading

**Implementation:**
```html
<img
  src="/images/profiles/user-123-400w.webp"
  srcset="/images/profiles/user-123-400w.webp 400w,
          /images/profiles/user-123-600w.webp 600w,
          /images/profiles/user-123-800w.webp 800w"
  sizes="(max-width: 767px) 100vw,
         (max-width: 1023px) 50vw,
         33vw"
  alt="Chidinma O., 28, Premium member"
  class="w-full h-full object-cover"
  loading="lazy"
/>
```

### Data Loading Strategy

**Initial Load:**
- Fetch first 18 profiles only
- Use skeleton loaders during fetch
- Cache in sessionStorage for 5 minutes

**Pagination:**
- Load 18 profiles per page
- Prefetch next page on scroll (200px before end)
- Debounce scroll events (250ms)

**Filter Application:**
- Client-side filtering for <1000 profiles
- Server-side filtering for >1000 profiles
- Debounce filter input changes (500ms)

### Animation Performance

**Use CSS Transforms (GPU-Accelerated):**
```css
/* Good */
.card:hover {
  transform: translateY(-4px);
}

/* Avoid */
.card:hover {
  margin-top: -4px;
}
```

**Avoid Layout Thrashing:**
- Batch DOM reads and writes
- Use `requestAnimationFrame` for animations
- Debounce scroll/resize events

---

## 17. Error Handling

### Network Errors

**HTML:**
```html
<div class="flex flex-col items-center justify-center py-16 px-4">
  <svg class="w-24 h-24 text-jm-error mb-6" fill="none" stroke="currentColor" viewBox="0 24 24">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 11-18 9 9 0118z"/>
  </svg>
  <h2 class="font-serif text-2xl font-bold text-jm-gray-900 mb-3">
    Unable to Load Profiles
  </h2>
  <p class="font-sans text-base text-jm-gray-600 text-center max-w-md mb-6">
    We're having trouble connecting to our servers. Please check your internet connection and try again.
  </p>
  <button
    type="button"
    class="bg-gradient-jm hover:bg-gradient-jm-hover text-white font-sans font-semibold px-8 py-3 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-jm-coral focus:ring-offset-2"
    onclick="retryLoadProfiles()"
  >
    Retry
  </button>
</div>
```

### Filter Errors

**Invalid Filter Combination:**
```javascript
function validateFilters() {
  const filters = DiscoverState.filters;

  // Age min cannot exceed age max
  if (filters.ageMin > filters.ageMax) {
    showToast('Minimum age cannot exceed maximum age', 'error');
    return false;
  }

  // At least one filter must be active (optional validation)
  const hasActiveFilter =
    filters.locations.length > 0 ||
    filters.faiths.length > 0 ||
    filters.tierCompletion.length > 0 ||
    filters.subscriptionTypes.length > 0;

  if (!hasActiveFilter) {
    showToast('Please select at least one filter', 'warning');
    return false;
  }

  return true;
}
```

---

## 18. Success States

### Filter Applied Successfully

**Toast Notification:**
```html
<div class="fixed top-6 right-6 bg-jm-success text-white px-6 py-4 rounded-lg shadow-2xl z-50 flex items-center gap-3 animate-slide-in">
  <svg class="w-6 h-6" fill="currentColor" viewBox="0 20 20">
    <path fill-rule="evenodd" d="M10 18a8 8 100-16 8 8 000 16zm3.707-9.293a1 1 00-1.414-1.414L9 10.586 7.707 9.293a1 1 00-1.414 1.414l2 2a1 1 001.414l4-4z" clip-rule="evenodd"/>
  </svg>
  <p class="font-sans text-sm font-medium">
    Filters applied successfully! Showing 18 matches.
  </p>
</div>
```

### Show Interest Sent Successfully

**Toast Notification:**
```html
<div class="fixed top-6 right-6 bg-jm-success text-white px-6 py-4 rounded-lg shadow-2xl z-50 flex items-center gap-3 animate-slide-in">
  <svg class="w-6 h-6" fill="currentColor" viewBox="0 20 20">
    <path fill-rule="evenodd" d="M3.172 5.172a4 4 015.656L10 6.343l1.172-1.171a4 4 115.656 5.656L10 17.657l-6.828-6.829a4 4 010-5.656z" clip-rule="evenodd"/>
  </svg>
  <p class="font-sans text-sm font-medium">
    Show Interest sent to Chidinma! We'll notify you when they respond.
  </p>
</div>
```

---

## 19. Related Documentation

- [Tier System](../../Global%20Context/tier_system.md) - MASTER REFERENCE for EDT
- [Show Interest Flow](../../Technical%20Specifications/show_interest_flow.md) - Show Interest mechanics
- [Request Details Flow](../../Technical%20Specifications/request_details_flow.md) - Detail negotiation
- [Subscription Tier Ceiling](../../Technical%20Specifications/subscription_tier_ceiling.md) - Subscription enforcement
- [HTML Implementation Guide](../../Design%20System/html_implementation_guide.md) - Component patterns
- [Dashboard Spec](dashboard_spec.md) - Dashboard page
- [Profile View Spec](profile_view_spec.md) - Profile viewing page (NEXT)
- [Edit Profile Spec](edit_profile_spec.md) - Profile editing page (NEXT)

---

**Document Owner:** Product Lead & Design Lead
**Last Updated:** 2026-02-27
**Status:** Complete — Ready for Implementation
**Estimated Development Time:** 40-50 hours
**Estimated Word Count:** 4,872 words
