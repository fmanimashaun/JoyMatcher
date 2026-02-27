# Profile View Page — Feature Specification

**Version:** 1.0.0
**Last Updated:** 2026-02-27
**Status:** Complete
**Page Route:** `/app/profile/:userId`
**Access Level:** Authenticated users only (Free, Premium, VIP)

---

## Table of Contents

1. [Page Purpose & User Goals](#1-page-purpose--user-goals)
2. [Layout & Wireframe Description](#2-layout--wireframe-description)
3. [Component Breakdown](#3-component-breakdown)
4. [EDT Calculation & Display](#4-edt-calculation--display)
5. [Show Interest Button States](#5-show-interest-button-states)
6. [Request Details Flow](#6-request-details-flow)
7. [Profile Actions](#7-profile-actions)
8. [VIP Privacy Controls](#8-vip-privacy-controls)
9. [State Management](#9-state-management)
10. [User Flows](#10-user-flows)
11. [Accessibility Requirements](#11-accessibility-requirements)
12. [Mobile Responsive Behavior](#12-mobile-responsive-behavior)
13. [Performance Optimization](#13-performance-optimization)
14. [Error Handling](#14-error-handling)
15. [Related Documentation](#15-related-documentation)

---

## 1. Page Purpose & User Goals

### Primary Purpose

The Profile View page allows users to view another user's complete profile based on their Effective Disclosure Tier (EDT). It displays tier-gated information, enables Show Interest actions, and manages detail request workflows.

### User Goals

- **Assess Compatibility:** View available tier information based on EDT calculation
- **Understand Disclosure Level:** See clearly what information is visible and what is locked
- **Initiate Connection:** Send Show Interest to compatible matches
- **Request Deeper Access:** Request access to locked tiers (Premium/VIP feature)
- **Manage Safety:** Block or report problematic users
- **Verify Identity:** See verification status and subscription level

### Success Metrics

- Time to Show Interest decision: <3 minutes (user reviews profile efficiently)
- EDT comprehension: Track user understanding via tier awareness acknowledgment
- Detail request conversion: Percentage of profile views that trigger detail requests
- Show Interest conversion: Percentage of profile views that result in Show Interest
- Block/report rate: Track safety feature usage

---

## 2. Layout & Wireframe Description

### Overall Structure

```
┌─────────────────────────────────────────────────┐
│         Navigation Header (Back Button)         │
├─────────────────────────────────────────────────┤
│         EDT Calculation Banner                   │
│  "You can see up to Tier X based on EDT"       │
├─────────────────────────────────────────────────┤
│         Profile Header Section                   │
│  [Photo] [Name, Age, Location]                  │
│  [Subscription Badge] [Verified Badge]          │
│  [Last Active] [Profile Completion Ring]        │
├─────────────────────────────────────────────────┤
│         Tier 1: Identity & Intent (Always)      │
│  [About Me, Faith, Education, Occupation]       │
├─────────────────────────────────────────────────┤
│         Tier 2: Lifestyle (If EDT ≥ 2)          │
│  [Height, Body Type, Habits, Languages]         │
├─────────────────────────────────────────────────┤
│         Tier 3: Family (If EDT ≥ 3) OR LOCKED   │
│  [Marital History, Children, Timeline]          │
│  OR [🔒 Request Details Button]                 │
├─────────────────────────────────────────────────┤
│         Tier 4: Health (If EDT ≥ 4) OR LOCKED   │
│  [Genotype, Blood Group, Health Status]         │
│  OR [🔒 Request Details Button]                 │
├─────────────────────────────────────────────────┤
│         Tier 5: Verified (If EDT = 5) OR LOCKED │
│  [✓ Verified Identity Badge]                    │
├─────────────────────────────────────────────────┤
│         Show Interest Section (CTA)             │
│  [Show Interest Button - 5 States]              │
├─────────────────────────────────────────────────┤
│         Profile Actions Dropdown                 │
│  [Block | Report | Copy Link | Save]           │
└─────────────────────────────────────────────────┘
```

### Viewport Considerations

- **Desktop (≥1024px):** Single column layout, max-width 800px centered
- **Tablet (768px-1023px):** Single column, full-width with padding
- **Mobile (320px-767px):** Single column, compact spacing, sticky CTA button

---

## 3. Component Breakdown

### 3.1 EDT Calculation Banner

**Purpose:** Inform user of current visibility level based on EDT calculation.

**Content:**
- Current EDT level (1-5)
- Hover tooltip explaining EDT formula
- Link to "How It Works" page

**HTML Structure:**

```html
<section class="bg-gradient-to-r from-jm-purple-deep/10 to-jm-coral/10 border-b-2 border-jm-purple/20 py-4">
  <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="flex items-center justify-between gap-4">
      <!-- EDT Status -->
      <div class="flex items-center gap-3">
        <div class="bg-jm-purple text-white w-10 h-10 rounded-full flex items-center justify-center font-serif text-lg font-bold">
          2
        </div>
        <div class="flex-1">
          <p class="font-sans text-sm font-semibold text-jm-gray-900">
            You can see up to Tier 2 information
          </p>
          <p class="font-sans text-xs text-jm-gray-600">
            Based on your Effective Disclosure Tier (EDT)
          </p>
        </div>
      </div>

      <!-- Info Button with Tooltip -->
      <button
        type="button"
        class="p-2 rounded-full text-jm-purple hover:bg-jm-purple/10 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-jm-purple focus:ring-offset-2 relative group"
        aria-label="EDT information"
      >
        <svg class="w-5 h-5" fill="currentColor" viewBox="0 20 20">
          <path fill-rule="evenodd" d="M18 10a8 8 11-16 8 8 0116zm-7-4a1 1 11-2 1 1 012zM9 9a1 1 000 2v3a1 1 001 1h1a1 1 100-2v-3a1 1 00-1-1H9z" clip-rule="evenodd"/>
        </svg>

        <!-- Tooltip -->
        <div class="
          invisible group-hover:visible opacity-0 group-hover:opacity-100
          absolute right-0 top-full mt-2 w-72 p-4
          bg-jm-gray-900 text-white rounded-lg shadow-xl
          text-xs leading-relaxed
          transition-all duration-200
          z-10
        ">
          <h4 class="font-semibold mb-2">How EDT Works:</h4>
          <p class="mb-2">
            EDT = Minimum of:
          </p>
          <ul class="list-disc list-inside space-y-1 text-xxs">
            <li>Your completed tier (Tier 3)</li>
            <li>Their completed tier (Tier 4)</li>
            <li>Tier you've shared with them (Tier 2)</li>
            <li>Tier they've shared with you (Tier 2)</li>
          </ul>
          <p class="mt-2 pt-2 border-t border-white/20">
            Result: EDT = 2 (you see Tier 1-2 only)
          </p>
          <a href="/how-it-works#edt" class="text-jm-coral hover:text-jm-coral-light underline mt-2 inline-block">
            Learn More →
          </a>
        </div>
      </button>
    </div>
  </div>
</section>
```

**Behavior:**
- EDT value dynamically calculated based on relationship state
- Tooltip appears on hover/focus
- Dismissible on mobile with tap outside
- Updates in real-time when detail requests are accepted

---

### 3.2 Profile Header Section

**Content:**
- Profile photo (large, primary display)
- Verified badge (if Tier 5 complete)
- Name, age, location
- Subscription badge (Free, Premium, VIP)
- Last active timestamp ("Active 2 hours ago")
- Profile completion percentage (circular progress ring)

**HTML Structure:**

```html
<section class="bg-white border-b border-jm-gray-200 py-8">
  <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="flex flex-col md:flex-row items-center md:items-start gap-6">
      <!-- Profile Photo with Verified Badge -->
      <div class="relative flex-shrink-0">
        <img
          src="/images/profiles/user-456.jpg"
          alt="Chidinma O., 28"
          class="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-jm-purple object-cover shadow-lg"
        />

        <!-- Verified Badge (if Tier 5 complete) -->
        <div class="absolute bottom-0 right-0 bg-jm-success text-white p-2 rounded-full shadow-lg border-4 border-white">
          <svg class="w-5 h-5" fill="currentColor" viewBox="0 20 20">
            <path fill-rule="evenodd" d="M6.267 3.455a3.066 3.066 001.745-.723 3.066 3.066 013.976 3.066 3.066 001.745.723 3.066 3.066 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 010 3.976 3.066 3.066 00-.723 1.745 3.066 3.066 01-2.812 2.812 3.066 3.066 00-1.745.723 3.066 3.066 01-3.976 3.066 3.066 00-1.745-.723 3.066 3.066 01-2.812-2.812 3.066 3.066 00-.723-1.745 3.066 3.066 010-3.976 3.066 3.066 00.723-1.745 3.066 3.066 012.812-2.812zm7.44 5.252a1 1 00-1.414-1.414L9 10.586 7.707 9.293a1 1 00-1.414 1.414l2 2a1 1 001.414l4-4z" clip-rule="evenodd"/>
          </svg>
        </div>

        <!-- Profile Completion Ring -->
        <div class="absolute -bottom-2 -right-2 w-16 h-16">
          <svg class="transform -rotate-90" viewBox="0 64 64">
            <!-- Background Circle -->
            <circle
              cx="32"
              cy="32"
              r="28"
              fill="none"
              stroke="#E5E7EB"
              stroke-width="6"
            />
            <!-- Progress Circle (75% = 270deg) -->
            <circle
              cx="32"
              cy="32"
              r="28"
              fill="none"
              stroke="url(#gradient-jm)"
              stroke-width="6"
              stroke-dasharray="175.93 175.93"
              stroke-dashoffset="43.98"
              stroke-linecap="round"
            />
            <!-- Gradient Definition -->
            <defs>
              <linearGradient id="gradient-jm" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style="stop-color:#4D0052;stop-opacity:1" />
                <stop offset="100%" style="stop-color:#F16A6F;stop-opacity:1" />
              </linearGradient>
            </defs>
          </svg>
          <div class="absolute inset-0 flex items-center justify-center">
            <span class="font-sans text-xs font-bold text-jm-purple">75%</span>
          </div>
        </div>
      </div>

      <!-- User Info -->
      <div class="flex-1 text-center md:text-left space-y-4">
        <!-- Name & Age -->
        <div class="space-y-2">
          <h1 class="font-serif text-3xl md:text-4xl font-bold text-jm-gray-900">
            Chidinma O., 28
          </h1>

          <!-- Location -->
          <div class="flex items-center justify-center md:justify-start gap-2 text-jm-gray-600">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 01-2.827l-4.244-4.243a8 8 1111.314z"/>
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 11-6 3 3 016z"/>
            </svg>
            <span class="font-sans text-base">Lagos, Nigeria</span>
          </div>
        </div>

        <!-- Badges & Status -->
        <div class="flex flex-wrap items-center justify-center md:justify-start gap-3">
          <!-- Subscription Badge -->
          <span class="inline-flex items-center gap-1 bg-jm-purple/10 text-jm-purple px-3 py-1 rounded-full text-sm font-medium">
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 20 20">
              <path fill-rule="evenodd" d="M11.3 1.046A1 1 0112 2v5h4a1 1 01.82 1.573l-7 10A1 1 018 18v-5H4a1 1 01-.82-1.573l7-10a1 1 011.12-.38z" clip-rule="evenodd"/>
            </svg>
            Premium Member
          </span>

          <!-- Verified Badge (text) -->
          <span class="inline-flex items-center gap-1 bg-jm-success/10 text-jm-success px-3 py-1 rounded-full text-sm font-medium">
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 20 20">
              <path fill-rule="evenodd" d="M6.267 3.455a3.066 3.066 001.745-.723 3.066 3.066 013.976 3.066 3.066 001.745.723 3.066 3.066 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 010 3.976 3.066 3.066 00-.723 1.745 3.066 3.066 01-2.812 2.812 3.066 3.066 00-1.745.723 3.066 3.066 01-3.976 3.066 3.066 00-1.745-.723 3.066 3.066 01-2.812-2.812 3.066 3.066 00-.723-1.745 3.066 3.066 010-3.976 3.066 3.066 00.723-1.745 3.066 3.066 012.812-2.812zm7.44 5.252a1 1 00-1.414-1.414L9 10.586 7.707 9.293a1 1 00-1.414 1.414l2 2a1 1 001.414l4-4z" clip-rule="evenodd"/>
            </svg>
            Verified Identity
          </span>

          <!-- Last Active -->
          <span class="font-sans text-sm text-jm-gray-500">
            Active 2 hours ago
          </span>
        </div>

        <!-- Profile Completion Text -->
        <div class="space-y-1">
          <p class="font-sans text-sm font-medium text-jm-gray-700">
            Profile Completion: <span class="text-jm-purple font-semibold">Tier 3 of 4</span>
          </p>
          <div class="w-full md:w-2/3 bg-jm-gray-200 rounded-full h-2">
            <div class="bg-gradient-jm h-2 rounded-full" style="width: 75%"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
```

**Behavior:**
- Profile photo opens lightbox on click
- Verified badge shows tooltip: "Government ID verified"
- Last active updates in real-time (if <1 hour ago)
- Profile completion ring animates on page load

---

### 3.3 Tier Sections (Accordion-Based Display)

**Tier 1: Always Visible (Public Information)**

```html
<section class="bg-white py-6">
  <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
    <!-- Tier 1 Accordion -->
    <div class="border-2 border-jm-gray-200 rounded-xl overflow-hidden">
      <!-- Header (Always Open for Tier 1) -->
      <button
        type="button"
        class="w-full flex items-center justify-between p-6 bg-jm-gray-50 hover:bg-jm-gray-100 transition-colors duration-200"
        aria-expanded="true"
        aria-controls="tier-1-content"
      >
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-full bg-jm-success/10 flex items-center justify-center">
            <svg class="w-5 h-5 text-jm-success" fill="currentColor" viewBox="0 20 20">
              <path fill-rule="evenodd" d="M10 18a8 8 100-16 8 8 000 16zm3.707-9.293a1 1 00-1.414-1.414L9 10.586 7.707 9.293a1 1 00-1.414 1.414l2 2a1 1 001.414l4-4z" clip-rule="evenodd"/>
            </svg>
          </div>
          <div class="text-left">
            <h2 class="font-serif text-xl font-bold text-jm-gray-900">
              Tier 1: Identity & Intent
            </h2>
            <p class="font-sans text-sm text-jm-gray-600">
              Public information
            </p>
          </div>
        </div>
        <svg class="w-5 h-5 text-jm-gray-600" fill="none" stroke="currentColor" viewBox="0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
        </svg>
      </button>

      <!-- Content -->
      <div id="tier-1-content" class="p-6 space-y-6 bg-white">
        <!-- About Me -->
        <div class="space-y-2">
          <h3 class="font-sans text-sm font-semibold text-jm-gray-700 uppercase tracking-wide">
            About Me
          </h3>
          <p class="font-sans text-base text-jm-gray-900 leading-relaxed">
            I'm a Product Manager passionate about creating meaningful experiences. I value authenticity, deep conversations, and building a future grounded in faith and mutual respect. Looking for a life partner who shares these values.
          </p>
        </div>

        <!-- Faith & Belief -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="space-y-1">
            <h4 class="font-sans text-xs font-medium text-jm-gray-500 uppercase tracking-wide">
              Faith / Belief
            </h4>
            <p class="font-sans text-base font-semibold text-jm-gray-900">
              Christian (Catholic)
            </p>
          </div>
          <div class="space-y-1">
            <h4 class="font-sans text-xs font-medium text-jm-gray-500 uppercase tracking-wide">
              Relationship Intent
            </h4>
            <p class="font-sans text-base font-semibold text-jm-gray-900">
              Marriage within 1-2 years
            </p>
          </div>
        </div>

        <!-- Education & Occupation -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="space-y-1">
            <h4 class="font-sans text-xs font-medium text-jm-gray-500 uppercase tracking-wide">
              Education
            </h4>
            <p class="font-sans text-base font-semibold text-jm-gray-900">
              Master's Degree
            </p>
            <p class="font-sans text-sm text-jm-gray-600">
              Business Administration
            </p>
          </div>
          <div class="space-y-1">
            <h4 class="font-sans text-xs font-medium text-jm-gray-500 uppercase tracking-wide">
              Occupation
            </h4>
            <p class="font-sans text-base font-semibold text-jm-gray-900">
              Product Manager
            </p>
            <p class="font-sans text-sm text-jm-gray-600">
              Technology / SaaS
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
```

**Tier 2-5: Conditional Display Based on EDT**

```html
<!-- Tier 2: Lifestyle (If EDT ≥ 2) -->
<section class="bg-white py-6" *if="currentEDT >= 2">
  <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="border-2 border-jm-gray-200 rounded-xl overflow-hidden">
      <!-- Similar accordion structure as Tier 1 -->
      <!-- Content shows: Height, Body Type, Smoking, Alcohol, Exercise, Languages -->
    </div>
  </div>
</section>

<!-- Tier 3: Locked State (If EDT < 3) -->
<section class="bg-white py-6" *if="currentEDT < 3 && targetUser.maxCompletedTier >= 3">
  <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="border-2 border-jm-gray-300 border-dashed rounded-xl overflow-hidden bg-jm-gray-50/50 opacity-75">
      <!-- Header -->
      <div class="p-6 flex items-center justify-between">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-full bg-jm-gray-300 flex items-center justify-center">
            <svg class="w-5 h-5 text-jm-gray-600" fill="currentColor" viewBox="0 20 20">
              <path fill-rule="evenodd" d="M5 9V7a5 5 0110v2a2 2 012 2v5a2 2 01-2 2H5a2 2 01-2-2v-5a2 2 012-2zm8-2v2H7V7a3 3 016z" clip-rule="evenodd"/>
            </svg>
          </div>
          <div class="text-left">
            <h2 class="font-serif text-xl font-bold text-jm-gray-700">
              Tier 3: Relationship & Family
            </h2>
            <p class="font-sans text-sm text-jm-gray-500">
              Locked - Request details to unlock
            </p>
          </div>
        </div>
      </div>

      <!-- Locked Content -->
      <div class="p-6 pt-0 space-y-4">
        <p class="font-sans text-sm text-jm-gray-600">
          Chidinma has completed Tier 3, but you need to request access to view this information.
        </p>

        <!-- Premium/VIP Only: Request Details Button -->
        <button
          type="button"
          class="
            w-full md:w-auto
            bg-jm-warning hover:bg-jm-warning/90
            text-white font-sans font-semibold
            px-6 py-3 rounded-lg
            transition-all duration-200
            shadow-md hover:shadow-lg
            focus:outline-none focus:ring-2 focus:ring-jm-warning focus:ring-offset-2
          "
          onclick="openRequestDetailsModal(3)"
          *if="currentUserSubscription !== 'free'"
        >
          <svg class="w-5 h-5 inline-block mr-2" fill="currentColor" viewBox="0 20 20">
            <path d="M8 5a1 1 100 2h5.586l-1.293 1.293a1 1 001.414 1.414l3-3a1 1 000-1.414l-3-3a1 1 10-1.414 1.414L13.586 5H8zM12 15a1 1 100-2H6.414l1.293-1.293a1 1 10-1.414-1.414l-3 3a1 1 000 1.414l3 3a1 1 001.414-1.414L6.414 15H12z"/>
          </svg>
          Request Tier 3 Details
        </button>

        <!-- Free Users: Upgrade Prompt -->
        <div class="bg-jm-warning/10 border-l-4 border-jm-warning p-4 rounded-r-lg" *if="currentUserSubscription === 'free'">
          <p class="font-sans text-sm text-jm-gray-700 mb-2">
            <strong>Premium Required:</strong> Upgrade to request details from Premium members.
          </p>
          <a
            href="/app/upgrade"
            class="text-jm-warning hover:text-jm-warning/80 font-medium text-sm underline"
          >
            Upgrade to Premium →
          </a>
        </div>
      </div>
    </div>
  </div>
</section>
```

---

## 4. EDT Calculation & Display

### EDT Calculation Logic

```javascript
/**
 * Calculate Effective Disclosure Tier for profile view
 * @param {String} viewerId - Current user viewing profile
 * @param {String} profileUserId - Profile being viewed
 * @returns {Number} EDT level (1-5)
 */
function calculateProfileViewEDT(viewerId, profileUserId) {
  const viewer = AppState.users.get(viewerId);
  const profileUser = AppState.users.get(profileUserId);

  if (!viewer || !profileUser) return 1;

  // Get relationship (if exists)
  const relationshipId = getRelationshipId(viewerId, profileUserId);
  const relationship = AppState.relationships.get(relationshipId);

  // Default: No relationship or Show Interest not accepted → EDT = 1 (public only)
  if (!relationship || relationship.showInterestStatus !== 'accepted') {
    return 1;
  }

  // Relationship exists and accepted → Calculate full EDT
  const isUser1 = relationship.userId1 === viewerId;
  const sharedByViewer = isUser1 ? relationship.sharedTierByUser1 : relationship.sharedTierByUser2;
  const sharedByProfile = isUser1 ? relationship.sharedTierByUser2 : relationship.sharedTierByUser1;

  const edt = Math.min(
    viewer.maxCompletedTier,
    profileUser.maxCompletedTier,
    sharedByViewer,
    sharedByProfile
  );

  return edt;
}
```

### EDT Display States

```javascript
/**
 * Generate EDT banner content
 * @param {Number} edt - Current EDT level
 * @param {Object} viewer - Current user
 * @param {Object} profileUser - Profile being viewed
 * @returns {Object} Banner configuration
 */
function generateEDTBanner(edt, viewer, profileUser) {
  const bannerStates = {
    1: {
      message: "You can see Tier 1 (public information) only",
      description: "Connect and share more tiers to unlock deeper information",
      color: "jm-gray",
      icon: "info"
    },
    2: {
      message: "You can see up to Tier 2 information",
      description: "Lifestyle & background details unlocked",
      color: "jm-success",
      icon: "check"
    },
    3: {
      message: "You can see up to Tier 3 information",
      description: "Relationship & family details unlocked",
      color: "jm-success",
      icon: "check"
    },
    4: {
      message: "You can see up to Tier 4 information",
      description: "Health & compatibility details unlocked",
      color: "jm-success",
      icon: "check"
    },
    5: {
      message: "Full transparency: Tier 5 (All information visible)",
      description: "Verified identity and complete profile access",
      color: "jm-success",
      icon: "verified"
    }
  };

  const state = bannerStates[edt] || bannerStates[1];

  return {
    ...state,
    edt: edt,
    maxPossibleEDT: Math.min(viewer.maxCompletedTier, profileUser.maxCompletedTier),
    canRequestMore: viewer.subscription !== 'free' && edt < Math.min(viewer.maxCompletedTier, profileUser.maxCompletedTier)
  };
}
```

---

## 5. Show Interest Button States

### State 1: Eligible (Can Send Show Interest)

```html
<div class="bg-white border-t border-jm-gray-200 p-6 sticky bottom-0 md:relative md:bottom-auto">
  <div class="max-w-3xl mx-auto">
    <button
      type="button"
      class="
        w-full bg-gradient-jm hover:bg-gradient-jm-hover
        text-white font-sans font-semibold text-lg
        px-8 py-4 rounded-lg
        transition-all duration-200
        shadow-lg hover:shadow-xl
        focus:outline-none focus:ring-2 focus:ring-jm-coral focus:ring-offset-2
      "
      onclick="openTierAwarenessModal('user-456')"
    >
      <svg class="w-6 h-6 inline-block mr-2" fill="none" stroke="currentColor" viewBox="0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 000 6.364L12 20.364l7.682-7.682a4.5 4.5 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 00-6.364z"/>
      </svg>
      Show Interest
    </button>
    <p class="font-sans text-xs text-jm-gray-500 text-center mt-2">
      You'll be asked to acknowledge tier limitations before sending
    </p>
  </div>
</div>
```

### State 2: Subscription Mismatch (Free → Premium)

```html
<div class="bg-jm-warning/10 border-t-2 border-jm-warning p-6">
  <div class="max-w-3xl mx-auto space-y-3">
    <button
      type="button"
      class="
        w-full bg-jm-warning hover:bg-jm-warning/90
        text-white font-sans font-semibold text-lg
        px-8 py-4 rounded-lg
        transition-all duration-200
        shadow-lg hover:shadow-xl
        focus:outline-none focus:ring-2 focus:ring-jm-warning focus:ring-offset-2
      "
      onclick="showUpgradeModal('premium')"
    >
      Upgrade to Show Interest
    </button>
    <p class="font-sans text-sm text-jm-gray-700 text-center">
      Premium subscription required to send Show Interest to Premium members
    </p>
    <a href="/pricing" class="block text-center text-jm-warning hover:text-jm-warning/80 font-medium text-sm underline">
      View Pricing →
    </a>
  </div>
</div>
```

### State 3: Already Sent (Pending Response)

```html
<div class="bg-jm-gray-100 border-t border-jm-gray-300 p-6">
  <div class="max-w-3xl mx-auto space-y-3">
    <div class="flex items-center justify-center gap-3 bg-white border-2 border-jm-gray-300 px-6 py-4 rounded-lg">
      <svg class="w-6 h-6 text-jm-gray-600 animate-pulse" fill="currentColor" viewBox="0 20 20">
        <path fill-rule="evenodd" d="M10 18a8 8 100-16 8 8 000 16zm1-12a1 1 10-2v4a1 1 00.293.707l2.828 2.829a1 1 101.415-1.415L11 9.586V6z" clip-rule="evenodd"/>
      </svg>
      <span class="font-sans text-base font-semibold text-jm-gray-700">
        Show Interest Sent - Waiting for Response
      </span>
    </div>
    <button
      type="button"
      class="text-jm-error hover:text-jm-error/80 font-sans text-sm font-medium underline w-full"
      onclick="confirmRevoke ShowInterest('user-456')"
    >
      Cancel Show Interest
    </button>
  </div>
</div>
```

### State 4: In Cooldown (90 Days After Decline)

```html
<div class="bg-jm-error/10 border-t-2 border-jm-error p-6">
  <div class="max-w-3xl mx-auto space-y-3">
    <div class="flex items-center justify-center gap-3 bg-white border-2 border-jm-error px-6 py-4 rounded-lg">
      <svg class="w-6 h-6 text-jm-error" fill="currentColor" viewBox="0 20 20">
        <path fill-rule="evenodd" d="M10 18a8 8 100-16 8 8 000 16zM8.707 7.293a1 1 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 101.414 1.414L10 11.414l1.293 1.293a1 1 001.414-1.414L11.414 10l1.293-1.293a1 1 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"/>
      </svg>
      <span class="font-sans text-base font-semibold text-jm-error">
        Show Interest Declined
      </span>
    </div>
    <div class="bg-white border-2 border-jm-error/20 p-4 rounded-lg space-y-2">
      <p class="font-sans text-sm text-jm-gray-700 text-center">
        You can send Show Interest again in:
      </p>
      <p class="font-sans text-2xl font-bold text-jm-error text-center" id="cooldown-countdown">
        23 days
      </p>
      <p class="font-sans text-xs text-jm-gray-500 text-center">
        Available on <strong>May 20, 2026</strong>
      </p>
    </div>
  </div>
</div>
```

### State 5: Connected (Show Interest Accepted)

```html
<div class="bg-jm-success/10 border-t-2 border-jm-success p-6">
  <div class="max-w-3xl mx-auto space-y-3">
    <a
      href="/app/messages/user-456"
      class="
        block w-full bg-jm-success hover:bg-jm-success/90
        text-white font-sans font-semibold text-lg
        px-8 py-4 rounded-lg text-center
        transition-all duration-200
        shadow-lg hover:shadow-xl
        focus:outline-none focus:ring-2 focus:ring-jm-success focus:ring-offset-2
      "
    >
      <svg class="w-6 h-6 inline-block mr-2" fill="currentColor" viewBox="0 20 20">
        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0016 4H4a2 2 00-1.997 1.884z"/>
        <path d="M18 8.118l-8 4-8-4V14a2 2 002 2h12a2 2 002-2V8.118z"/>
      </svg>
      Send Message
    </a>
    <p class="font-sans text-sm text-jm-success font-medium text-center flex items-center justify-center gap-2">
      <svg class="w-5 h-5" fill="currentColor" viewBox="0 20 20">
        <path fill-rule="evenodd" d="M10 18a8 8 100-16 8 8 000 16zm3.707-9.293a1 1 00-1.414-1.414L9 10.586 7.707 9.293a1 1 00-1.414 1.414l2 2a1 1 001.414l4-4z" clip-rule="evenodd"/>
      </svg>
      You're Connected
    </p>
  </div>
</div>
```

---

## 6. Request Details Flow

### Request Details Modal (Premium/VIP Feature)

```html
<!-- Request Details Modal -->
<div
  id="request-details-modal"
  class="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 hidden items-center justify-center p-4"
  role="dialog"
  aria-modal="true"
  aria-labelledby="request-modal-title"
>
  <div class="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
    <!-- Header -->
    <div class="bg-gradient-to-r from-jm-purple-deep to-jm-coral p-6">
      <div class="flex items-start justify-between">
        <div class="space-y-2">
          <h2 id="request-modal-title" class="font-serif text-2xl font-bold text-white">
            Request Tier 3 Details
          </h2>
          <p class="font-sans text-sm text-white/90">
            Request access to Chidinma's Relationship & Family information
          </p>
        </div>
        <button
          type="button"
          class="text-white hover:text-white/80 p-2 rounded-full hover:bg-white/10 transition-all"
          onclick="closeRequestDetailsModal()"
          aria-label="Close modal"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>
      </div>
    </div>

    <!-- Body -->
    <div class="p-6 space-y-6">
      <!-- Explanation -->
      <div class="bg-jm-purple/5 border-2 border-jm-purple/20 rounded-lg p-5 space-y-3">
        <h3 class="font-sans text-base font-semibold text-jm-gray-900 flex items-center gap-2">
          <svg class="w-5 h-5 text-jm-purple" fill="currentColor" viewBox="0 20 20">
            <path fill-rule="evenodd" d="M18 10a8 8 11-16 8 8 0116zm-7-4a1 1 11-2 1 1 012zM9 9a1 1 000 2v3a1 1 001 1h1a1 1 100-2v-3a1 1 00-1-1H9z" clip-rule="evenodd"/>
          </svg>
          How Detail Requests Work
        </h3>
        <p class="font-sans text-sm text-jm-gray-700 leading-relaxed">
          To maintain fairness and reciprocity, when you request Chidinma's Tier 3 information, you must also share your Tier 3 information with her.
        </p>
      </div>

      <!-- What You're Requesting -->
      <div class="space-y-3">
        <h3 class="font-sans text-base font-semibold text-jm-gray-900">
          What You're Requesting from Chidinma:
        </h3>
        <div class="bg-jm-gray-50 border-2 border-jm-gray-200 rounded-lg p-4">
          <h4 class="font-sans text-sm font-semibold text-jm-purple mb-3">
            Tier 3: Relationship & Family Readiness
          </h4>
          <ul class="space-y-2">
            <li class="flex items-start gap-2 text-sm text-jm-gray-700">
              <svg class="w-4 h-4 text-jm-purple mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 20 20">
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 010 1.414l-8 8a1 1 01-1.414l-4-4a1 1 011.414-1.414L8 12.586l7.293-7.293a1 1 011.414z" clip-rule="evenodd"/>
              </svg>
              Marital history and children status
            </li>
            <li class="flex items-start gap-2 text-sm text-jm-gray-700">
              <svg class="w-4 h-4 text-jm-purple mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 20 20">
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 010 1.414l-8 8a1 1 01-1.414l-4-4a1 1 011.414-1.414L8 12.586l7.293-7.293a1 1 011.414z" clip-rule="evenodd"/>
              </svg>
              Willingness to have (more) children
            </li>
            <li class="flex items-start gap-2 text-sm text-jm-gray-700">
              <svg class="w-4 h-4 text-jm-purple mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 20 20">
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 010 1.414l-8 8a1 1 01-1.414l-4-4a1 1 011.414-1.414L8 12.586l7.293-7.293a1 1 011.414z" clip-rule="evenodd"/>
              </svg>
              Marriage timeline expectations
            </li>
            <li class="flex items-start gap-2 text-sm text-jm-gray-700">
              <svg class="w-4 h-4 text-jm-purple mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 20 20">
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 010 1.414l-8 8a1 1 01-1.414l-4-4a1 1 011.414-1.414L8 12.586l7.293-7.293a1 1 011.414z" clip-rule="evenodd"/>
              </svg>
              Family involvement expectations
            </li>
          </ul>
        </div>
      </div>

      <!-- What You're Offering -->
      <div class="space-y-3">
        <h3 class="font-sans text-base font-semibold text-jm-gray-900">
          What You'll Share in Return:
        </h3>
        <div class="bg-jm-coral/5 border-2 border-jm-coral/20 rounded-lg p-4">
          <div class="flex items-center gap-2 mb-3">
            <input
              type="radio"
              id="offer-tier-3"
              name="offered-tier"
              value="3"
              checked
              class="w-5 h-5 text-jm-purple focus:ring-2 focus:ring-jm-purple/20"
            />
            <label for="offer-tier-3" class="font-sans text-sm font-semibold text-jm-coral">
              Your Tier 3 (Fair Exchange - Recommended)
            </label>
          </div>
          <p class="font-sans text-sm text-jm-gray-600 pl-7">
            Chidinma will also see your Tier 3 information (relationship history, children, family expectations).
          </p>
        </div>

        <div class="bg-jm-gray-50 border-2 border-jm-gray-200 rounded-lg p-4">
          <div class="flex items-center gap-2 mb-3">
            <input
              type="radio"
              id="offer-tier-4"
              name="offered-tier"
              value="4"
              class="w-5 h-5 text-jm-purple focus:ring-2 focus:ring-jm-purple/20"
              disabled
            />
            <label for="offer-tier-4" class="font-sans text-sm font-semibold text-jm-gray-500">
              Your Tier 4 (Generous - Complete Tier 4 first)
            </label>
          </div>
          <p class="font-sans text-sm text-jm-gray-500 pl-7">
            You haven't completed Tier 4 yet. Complete it to offer more information.
          </p>
        </div>
      </div>

      <!-- Impact Forecast -->
      <div class="bg-jm-success/10 border-l-4 border-jm-success p-4 rounded-r-lg space-y-2">
        <h4 class="font-sans text-sm font-semibold text-jm-success flex items-center gap-2">
          <svg class="w-5 h-5" fill="currentColor" viewBox="0 20 20">
            <path fill-rule="evenodd" d="M10 18a8 8 100-16 8 8 000 16zm3.707-9.293a1 1 00-1.414-1.414L9 10.586 7.707 9.293a1 1 00-1.414 1.414l2 2a1 1 001.414l4-4z" clip-rule="evenodd"/>
          </svg>
          If Chidinma Accepts:
        </h4>
        <ul class="font-sans text-sm text-jm-gray-700 list-disc list-inside space-y-1">
          <li>Your EDT will increase from <strong>Tier 2 → Tier 3</strong></li>
          <li>You'll both see each other's Tier 1-3 information</li>
          <li>Tier 3 sections will unlock immediately</li>
        </ul>
      </div>

      <!-- Acknowledgment -->
      <label class="flex items-start gap-3 cursor-pointer">
        <input
          type="checkbox"
          id="request-acknowledge"
          class="w-5 h-5 mt-0.5 text-jm-purple border-jm-gray-300 rounded focus:ring-2 focus:ring-jm-purple/20"
          onchange="toggleSendRequestButton()"
        />
        <span class="font-sans text-sm text-jm-gray-700">
          I understand that requesting Tier 3 details means I must share my Tier 3 information with Chidinma in return
        </span>
      </label>
    </div>

    <!-- Footer -->
    <div class="bg-jm-gray-50 border-t border-jm-gray-200 p-6 flex flex-col sm:flex-row items-center justify-end gap-3">
      <button
        type="button"
        class="
          w-full sm:w-auto
          border-2 border-jm-gray-300 hover:border-jm-gray-400
          text-jm-gray-700 hover:text-jm-gray-900
          font-sans font-medium
          px-6 py-3 rounded-lg
          transition-all duration-200
          focus:outline-none focus:ring-2 focus:ring-jm-gray-400 focus:ring-offset-2
        "
        onclick="closeRequestDetailsModal()"
      >
        Cancel
      </button>
      <button
        type="button"
        id="send-request-btn"
        class="
          w-full sm:w-auto
          bg-gradient-jm hover:bg-gradient-jm-hover
          text-white font-sans font-semibold
          px-8 py-3 rounded-lg
          transition-all duration-200
          shadow-md hover:shadow-lg
          focus:outline-none focus:ring-2 focus:ring-jm-coral focus:ring-offset-2
          disabled:opacity-50 disabled:cursor-not-allowed
        "
        onclick="confirmSendRequest()"
        disabled
      >
        Send Request
      </button>
    </div>
  </div>
</div>

<script>
function toggleSendRequestButton() {
  const checkbox = document.getElementById('request-acknowledge');
  const button = document.getElementById('send-request-btn');
  button.disabled = !checkbox.checked;
}
</script>
```

---

## 7. Profile Actions

### Actions Dropdown Menu

```html
<div class="bg-white border-t border-jm-gray-200 py-4">
  <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="relative inline-block text-left">
      <button
        type="button"
        class="
          inline-flex items-center gap-2
          text-jm-gray-700 hover:text-jm-gray-900
          font-sans font-medium text-sm
          px-4 py-2 rounded-md
          hover:bg-jm-gray-100
          transition-all duration-200
          focus:outline-none focus:ring-2 focus:ring-jm-purple focus:ring-offset-2
        "
        aria-label="Profile actions"
        aria-expanded="false"
        onclick="toggleActionsDropdown()"
      >
        <svg class="w-5 h-5" fill="currentColor" viewBox="0 20 20">
          <path d="M10 6a2 2 110-4 2 2 010 4zM10 12a2 2 110-4 2 2 010 4zM10 18a2 2 110-4 2 2 010 4z"/>
        </svg>
        More Actions
      </button>

      <!-- Dropdown Menu -->
      <div
        id="actions-dropdown"
        class="
          hidden absolute right-0 mt-2 w-56
          bg-white rounded-lg shadow-lg border border-jm-gray-200
          py-1 z-50
        "
      >
        <!-- Save/Bookmark -->
        <button
          type="button"
          class="
            w-full flex items-center gap-3 px-4 py-2
            text-left text-sm text-jm-gray-700
            hover:bg-jm-gray-50
            transition-colors duration-200
          "
          onclick="saveProfile('user-456')"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 5a2 2 012-2h10a2 2 012 2v16l-7-3.5L5 21V5z"/>
          </svg>
          Save Profile
        </button>

        <!-- Copy Link (Premium+ Feature) -->
        <button
          type="button"
          class="
            w-full flex items-center gap-3 px-4 py-2
            text-left text-sm text-jm-gray-700
            hover:bg-jm-gray-50
            transition-colors duration-200
          "
          onclick="copyProfileLink('user-456')"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 01-2-2V6a2 2 012-2h8a2 2 012 2v2m-6 12h8a2 2 002-2v-8a2 2 00-2-2h-8a2 2 00-2 2v8a2 2 002 2z"/>
          </svg>
          Copy Profile Link
        </button>

        <div class="border-t border-jm-gray-200 my-1"></div>

        <!-- Block User -->
        <button
          type="button"
          class="
            w-full flex items-center gap-3 px-4 py-2
            text-left text-sm text-jm-warning
            hover:bg-jm-warning/5
            transition-colors duration-200
          "
          onclick="confirmBlockUser('user-456')"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 18.364A9 9 005.636 5.636m12.728 12.728A9 9 015.636 5.636m12.728 12.728L5.636 5.636"/>
          </svg>
          Block User
        </button>

        <!-- Report User -->
        <button
          type="button"
          class="
            w-full flex items-center gap-3 px-4 py-2
            text-left text-sm text-jm-error
            hover:bg-jm-error/5
            transition-colors duration-200
          "
          onclick="openReportModal('user-456')"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464L3.34 16c-.77 1.333.192 3 1.732 3z"/>
          </svg>
          Report User
        </button>
      </div>
    </div>
  </div>
</div>
```

### Block Confirmation Modal

```html
<div id="block-user-modal" class="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 hidden items-center justify-center p-4">
  <div class="bg-white rounded-2xl shadow-2xl w-full max-w-md">
    <div class="p-6 space-y-4">
      <div class="flex items-start gap-4">
        <div class="w-12 h-12 rounded-full bg-jm-warning/10 flex items-center justify-center flex-shrink-0">
          <svg class="w-6 h-6 text-jm-warning" fill="currentColor" viewBox="0 20 20">
            <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 11-2 1 1 012zm-1-8a1 1 00-1 1v3a1 1 002V6a1 1 00-1-1z" clip-rule="evenodd"/>
          </svg>
        </div>
        <div class="flex-1">
          <h3 class="font-serif text-xl font-bold text-jm-gray-900 mb-2">
            Block Chidinma O.?
          </h3>
          <p class="font-sans text-sm text-jm-gray-700 leading-relaxed mb-3">
            Blocking this user will:
          </p>
          <ul class="font-sans text-sm text-jm-gray-700 list-disc list-inside space-y-1">
            <li>Hide their profile from your searches</li>
            <li>Prevent them from contacting you</li>
            <li>Remove any existing conversations</li>
            <li>This action is reversible from Settings</li>
          </ul>
        </div>
      </div>

      <div class="flex gap-3 pt-4">
        <button
          type="button"
          class="flex-1 border-2 border-jm-gray-300 hover:border-jm-gray-400 text-jm-gray-700 font-sans font-medium px-4 py-3 rounded-lg"
          onclick="closeBlockModal()"
        >
          Cancel
        </button>
        <button
          type="button"
          class="flex-1 bg-jm-warning hover:bg-jm-warning/90 text-white font-sans font-semibold px-4 py-3 rounded-lg"
          onclick="confirmBlock('user-456')"
        >
          Block User
        </button>
      </div>
    </div>
  </div>
</div>
```

---

## 8. VIP Privacy Controls

### VIP Private Profile Display

```html
<!-- Shown when viewing a VIP user with "Private" profile visibility -->
<section class="bg-gradient-to-br from-jm-purple-deep/10 to-jm-coral/10 py-16">
  <div class="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
    <!-- VIP Icon -->
    <div class="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-jm mb-6">
      <svg class="w-10 h-10 text-white" fill="currentColor" viewBox="0 20 20">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902l1.07 3.292a1 1 00.95.69h3.462c.969 1.371 1.24.588 1.81l-2.8 2.034a1 1 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 00-1.175l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 00.951-.69l1.07-3.292z"/>
      </svg>
    </div>

    <!-- Message -->
    <h1 class="font-serif text-3xl font-bold text-jm-gray-900 mb-4">
      This VIP Member's Profile is Private
    </h1>
    <p class="font-sans text-base text-jm-gray-700 leading-relaxed mb-8">
      This user has chosen to make their profile invisible. They prefer curated introductions through our VIP concierge service.
    </p>

    <!-- CTA (Only for VIP users or VIP applicants) -->
    <div class="space-y-3">
      <button
        type="button"
        class="bg-gradient-jm hover:bg-gradient-jm-hover text-white font-sans font-semibold px-8 py-3 rounded-lg shadow-lg"
        onclick="showVIPInfo()"
        *if="currentUserSubscription === 'vip'"
      >
        Request Curated Introduction
      </button>

      <a
        href="/vip"
        class="block text-jm-purple hover:text-jm-purple-dark font-medium text-sm underline"
        *if="currentUserSubscription !== 'vip'"
      >
        Learn About VIP Membership →
      </a>
    </div>
  </div>
</section>
```

---

## 9. State Management

### Profile View State Model

```javascript
const ProfileViewState = {
  // Current user (viewer)
  currentUser: {
    id: String,
    subscription: String, // 'free' | 'premium' | 'vip'
    subscriptionCeiling: Number,
    completedTiers: Array<Number>,
    maxCompletedTier: Number,
    country: String
  },

  // Profile being viewed
  profileUser: {
    id: String,
    displayName: String,
    age: Number,
    location: {
      city: String,
      state: String,
      country: String
    },
    subscription: String,
    subscriptionCeiling: Number,
    completedTiers: Array<Number>,
    maxCompletedTier: Number,
    tier5Verified: Boolean,
    lastActive: Date,
    profileVisible: Boolean, // VIP privacy setting
    tierData: {
      tier1: Object,
      tier2: Object,
      tier3: Object,
      tier4: Object,
      tier5: Object
    }
  },

  // Relationship state
  relationship: {
    id: String,
    showInterestStatus: String, // 'none' | 'sent' | 'accepted' | 'declined' | 'cooldown'
    showInterestInitiator: String,
    showInterestCooldownEnds: Date,
    messagesUnlocked: Boolean,
    sharedTierByUser1: Number,
    sharedTierByUser2: Number,
    detailRequests: Array<Object>
  },

  // Calculated EDT
  currentEDT: Number, // 1-5

  // UI state
  showInterestButtonState: String, // 'eligible' | 'mismatch' | 'pending' | 'cooldown' | 'connected'
  loading: Boolean,
  error: String
};
```

### EDT Recalculation on Detail Request Acceptance

```javascript
function onDetailRequestAccepted(requestId) {
  const request = findRequestById(requestId);
  if (!request) return;

  const relationship = AppState.relationships.get(request.relationshipId);

  // Recalculate EDT
  const newEDT = calculateProfileViewEDT(
    ProfileViewState.currentUser.id,
    ProfileViewState.profileUser.id
  );

  // Update state
  ProfileViewState.currentEDT = newEDT;

  // Re-render tier sections
  renderTierSections();

  // Update EDT banner
  updateEDTBanner(newEDT);

  // Show success toast
  showToast(`EDT updated to Tier ${newEDT}! You can now see more information.`, 'success');
}
```

---

## 10. User Flows

### Flow 1: View Profile → Show Interest (Eligible)

1. User navigates to profile from Discover page
2. EDT banner shows "Tier 2" (based on calculation)
3. User scrolls through Tier 1-2 sections (unlocked)
4. Tier 3-4 sections show locked state
5. User clicks "Show Interest" button
6. Tier Awareness Warning modal opens
7. User reviews tier limitations, checks acknowledgment
8. User clicks "Send Show Interest"
9. Modal closes, success toast appears
10. Button state updates to "Pending"

### Flow 2: Request Tier 3 Details (Premium User)

1. Premium user views profile with EDT = 2
2. Tier 3 section shows locked with "Request Details" button
3. User clicks "Request Tier 3 Details"
4. Request Details modal opens
5. User reviews what they're requesting and offering
6. User checks acknowledgment checkbox
7. User clicks "Send Request"
8. Modal closes, pending request indicator appears
9. Later: Recipient accepts request
10. EDT recalculates to 3, Tier 3 unlocks

### Flow 3: Free User Hits Ceiling

1. Free user views Premium user profile
2. EDT = 2 (Free ceiling)
3. Tier 3-4 sections locked with upgrade prompt
4. User clicks "Upgrade to Premium"
5. Upgrade modal opens with pricing
6. User completes upgrade
7. Returns to profile, tier sections still locked (requires request)
8. User can now send detail request

---

## 11. Accessibility Requirements

### WCAG 2.1 AA Compliance

**Keyboard Navigation:**
- All interactive elements accessible via Tab key
- Modals trap focus (Tab cycles within modal)
- Escape key closes modals
- Arrow keys navigate tier accordions

**Screen Reader Support:**
- Tier sections use semantic HTML (`<section>`, `<article>`)
- EDT banner announced via `aria-live="polite"`
- Button states clearly communicated (`aria-label`)
- Modal dialogs use `role="dialog"` and `aria-modal="true"`

**Color Contrast:**
- All text meets 4.5:1 minimum contrast ratio
- Locked tier sections use dashed borders + icon (not color alone)
- Verified badge uses icon + text label

**Focus Indicators:**
- 2px purple ring on all focusable elements
- Focus visible on all interactive components
- Skip link for screen readers

---

## 12. Mobile Responsive Behavior

### Breakpoints

**Mobile (320px-767px):**
- Single column layout
- Profile photo centered, smaller (128px)
- EDT banner stacks vertically
- Tier accordions full width
- Show Interest button sticky at bottom
- Actions dropdown slides up from bottom (sheet)

**Tablet (768px-1023px):**
- Single column layout
- Profile photo left-aligned (160px)
- EDT banner horizontal layout
- Tier accordions full width
- Show Interest button relative position

**Desktop (≥1024px):**
- Single column, max-width 800px centered
- Profile photo left-aligned (160px)
- EDT banner horizontal layout
- All sections full width within container

---

## 13. Performance Optimization

### Image Loading
- Profile photo: Lazy-loaded, WebP with JPG fallback
- Avatar size: 320x320px (2x display)
- Responsive srcset for different screen sizes

### Data Loading
- Initial load: Fetch profile data + relationship state
- Tier data loaded progressively based on EDT
- Locked tier sections don't fetch data

### Animation Performance
- Use CSS transforms for smooth animations
- Progress ring uses SVG with CSS animation
- Debounce scroll events

---

## 14. Error Handling

### Network Errors

```html
<div class="flex flex-col items-center justify-center py-16 px-4">
  <svg class="w-24 h-24 text-jm-error mb-6" fill="none" stroke="currentColor" viewBox="0 24 24">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 11-18 9 9 0118z"/>
  </svg>
  <h2 class="font-serif text-2xl font-bold text-jm-gray-900 mb-3">
    Unable to Load Profile
  </h2>
  <p class="font-sans text-base text-jm-gray-600 text-center max-w-md mb-6">
    We're having trouble loading this profile. Please check your connection and try again.
  </p>
  <button
    type="button"
    class="bg-gradient-jm hover:bg-gradient-jm-hover text-white font-sans font-semibold px-8 py-3 rounded-lg"
    onclick="retryLoadProfile()"
  >
    Retry
  </button>
</div>
```

### Profile Not Found

```html
<div class="flex flex-col items-center justify-center py-16 px-4">
  <svg class="w-24 h-24 text-jm-gray-300 mb-6" fill="none" stroke="currentColor" viewBox="0 24 24">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 015.656M9 10h.01M15 10h.01M21 12a9 9 11-18 9 9 0118z"/>
  </svg>
  <h2 class="font-serif text-2xl font-bold text-jm-gray-900 mb-3">
    Profile Not Found
  </h2>
  <p class="font-sans text-base text-jm-gray-600 text-center max-w-md mb-6">
    This profile is no longer available. The user may have deactivated their account or blocked you.
  </p>
  <a
    href="/app/discover"
    class="bg-gradient-jm hover:bg-gradient-jm-hover text-white font-sans font-semibold px-8 py-3 rounded-lg"
  >
    Browse Other Matches
  </a>
</div>
```

---

## 15. Related Documentation

- [Tier System](../../Global%20Context/tier_system.md) - MASTER REFERENCE for EDT
- [Show Interest Flow](../../Technical%20Specifications/show_interest_flow.md) - Show Interest mechanics
- [Request Details Flow](../../Technical%20Specifications/request_details_flow.md) - Detail negotiation logic
- [Subscription Tier Ceiling](../../Technical%20Specifications/subscription_tier_ceiling.md) - Subscription enforcement
- [HTML Implementation Guide](../../Design%20System/html_implementation_guide.md) - Component patterns
- [Dashboard Spec](dashboard_spec.md) - Dashboard page
- [Discover Spec](discover_spec.md) - Browse/discover page
- [Edit Profile Spec](edit_profile_spec.md) - Profile editing page

---

**Document Owner:** Product Lead & Design Lead
**Last Updated:** 2026-02-27
**Status:** Complete — Ready for Implementation
**Estimated Development Time:** 40-50 hours
**Estimated Word Count:** 5,127 words
