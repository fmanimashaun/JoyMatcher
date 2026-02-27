# Interests Feature Specification

**Version:** 1.0.0
**Last Updated:** 2026-02-27
**Status:** Complete
**Page Route:** `/app/interests`
**Access Level:** Authenticated users only

---

## 1. Page Purpose & User Goals

### Primary Purpose
The Interests page is the central hub for managing all incoming and outgoing Show Interest requests. It enables users to review potential matches, make decisions on incoming requests, track sent requests, and understand the current state of their relationship-building efforts.

### User Goals
- **Review incoming Show Interest requests:** See who wants to connect
- **Make informed decisions:** Accept or decline requests based on EDT-appropriate profile information
- **Track outgoing requests:** Monitor status of sent Show Interest requests
- **Understand tier mismatches:** See tier completion warnings before accepting
- **Manage cooldowns:** Know when they can retry declined requests
- **Navigate to conversations:** Quick access to accepted matches

### Success Metrics
- Request response time: <24 hours median
- Acceptance rate: 30-40% (healthy selectivity)
- Tier awareness: <10% tier mismatch complaints
- User satisfaction: >80% find process respectful
- Conversation activation: >70% of accepted interests lead to first message within 7 days

---

## 2. Layout & Wireframe Description

### Overall Structure
```
┌─────────────────────────────────────────────────────────────┐
│                    Navigation Header                         │
├─────────────────────────────────────────────────────────────┤
│                    Page Title & Summary                      │
│  "Interests"                                                 │
│  "3 pending, 5 accepted"                                     │
├─────────────────────────────────────────────────────────────┤
│                    Tab Navigation                            │
│  [Received] [Sent] [Accepted]                               │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│                    Active Tab Content                        │
│                                                              │
│  - Received Tab: Pending requests (cards grid)              │
│  - Sent Tab: Outgoing requests status (list)                │
│  - Accepted Tab: Active connections (cards grid)            │
│                                                              │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

### Viewport Considerations
- **Desktop (≥1024px):** 3-column card grid for Received/Accepted tabs, 2-column for Sent tab
- **Tablet (768px-1023px):** 2-column card grid
- **Mobile (320px-767px):** Single column, full-width cards

---

## 3. Component Breakdown

### 3.1 Page Header & Summary

**Content:**
- Page title: "Interests"
- Summary stats: "X pending, Y accepted"
- Optional: Total interest count badge
- CTA: "Discover New Matches" (if no pending interests)

**HTML Structure:**
```html
<!-- Page Header & Summary -->
<div class="bg-white border-b border-jm-gray-200 px-4 sm:px-6 lg:px-8 py-6">
  <div class="max-w-7xl mx-auto">
    <div class="flex items-center justify-between flex-wrap gap-4">
      <!-- Title & Summary -->
      <div>
        <h1 class="font-serif text-3xl md:text-4xl font-bold text-jm-gray-900 mb-2">
          Interests
        </h1>
        <p class="font-sans text-base text-jm-gray-600">
          <span class="font-semibold text-jm-purple">3 pending</span> requests,
          <span class="font-semibold text-jm-success">5 accepted</span> connections
        </p>
      </div>

      <!-- CTA Button -->
      <a
        href="/app/discover"
        class="
          bg-gradient-jm hover:bg-gradient-jm-hover
          text-white font-sans font-semibold
          px-6 py-3 rounded-lg
          transition-all duration-200
          shadow-md hover:shadow-lg
          focus:outline-none focus:ring-2 focus:ring-jm-coral focus:ring-offset-2
        "
      >
        Discover New Matches
      </a>
    </div>
  </div>
</div>
```

---

### 3.2 Tab Navigation

**Content:**
- **Received Tab:** Incoming Show Interest requests (pending review)
- **Sent Tab:** Outgoing Show Interest requests (status tracking)
- **Accepted Tab:** Active connections (unlocked messaging)

**HTML Structure:**
```html
<!-- Tab Navigation -->
<div class="bg-white border-b border-jm-gray-200 px-4 sm:px-6 lg:px-8">
  <div class="max-w-7xl mx-auto">
    <nav class="flex gap-8" aria-label="Interest categories">
      <!-- Received Tab (Active) -->
      <button
        type="button"
        class="
          relative border-b-2 border-jm-purple
          font-sans text-base font-semibold text-jm-purple
          px-1 py-4
          transition-colors
          focus:outline-none focus:ring-2 focus:ring-jm-purple focus:ring-offset-2 rounded-sm
        "
        aria-current="page"
        data-tab="received"
      >
        Received
        <!-- Badge -->
        <span class="ml-2 bg-jm-purple text-white text-xs font-semibold px-2 py-0.5 rounded-full">
          3
        </span>
      </button>

      <!-- Sent Tab (Inactive) -->
      <button
        type="button"
        class="
          relative border-b-2 border-transparent
          font-sans text-base font-medium text-jm-gray-600 hover:text-jm-gray-900 hover:border-jm-gray-300
          px-1 py-4
          transition-colors
          focus:outline-none focus:ring-2 focus:ring-jm-purple focus:ring-offset-2 rounded-sm
        "
        data-tab="sent"
      >
        Sent
        <span class="ml-2 bg-jm-gray-200 text-jm-gray-700 text-xs font-medium px-2 py-0.5 rounded-full">
          7
        </span>
      </button>

      <!-- Accepted Tab (Inactive) -->
      <button
        type="button"
        class="
          relative border-b-2 border-transparent
          font-sans text-base font-medium text-jm-gray-600 hover:text-jm-gray-900 hover:border-jm-gray-300
          px-1 py-4
          transition-colors
          focus:outline-none focus:ring-2 focus:ring-jm-purple focus:ring-offset-2 rounded-sm
        "
        data-tab="accepted"
      >
        Accepted
        <span class="ml-2 bg-jm-success text-white text-xs font-medium px-2 py-0.5 rounded-full">
          5
        </span>
      </button>
    </nav>
  </div>
</div>
```

**Behavior:**
- Click tab → Load corresponding content
- Active tab: Purple underline + purple text
- Badge shows count of items in each tab
- Keyboard navigation: Arrow keys to switch tabs

---

### 3.3 Received Tab (Incoming Requests)

**Content:**
- Grid of profile cards for users who sent Show Interest
- Each card shows:
  - Profile photo
  - Name + last initial
  - Age, location
  - Tier completion badge
  - EDT preview badge
  - Verified badge (if applicable)
  - Accept/Decline buttons
  - "View Profile" link
- Tier Awareness Warning (if tier mismatch)

**HTML Structure:**
```html
<!-- Received Tab Content -->
<div id="received-tab" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
  <!-- Grid Layout -->
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

    <!-- Interest Request Card -->
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
          alt="Chidinma O., 31"
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
      <div class="p-5 space-y-4">
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

        <!-- Tier & EDT Badges -->
        <div class="flex items-center gap-2 flex-wrap">
          <span class="inline-flex items-center gap-1 bg-jm-gray-100 text-jm-gray-700 px-2 py-1 rounded-md text-xs font-medium">
            Tier 3 Complete
          </span>
          <span class="inline-flex items-center gap-1 bg-jm-purple/10 text-jm-purple px-2 py-1 rounded-md text-xs font-medium">
            EDT: Tier 2 (Your max)
          </span>
        </div>

        <!-- Tier Awareness Warning (if mismatch) -->
        <div class="bg-jm-warning/10 border-l-4 border-jm-warning p-3 rounded-r-lg">
          <div class="flex items-start gap-2">
            <svg class="w-4 h-4 text-jm-warning flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 20 20">
              <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 11-2 1 1 012zm-1-8a1 1 00-1 1v3a1 1 002V6a1 1 00-1-1z" clip-rule="evenodd"/>
            </svg>
            <div class="flex-1">
              <p class="font-sans text-xs text-jm-gray-700 leading-relaxed">
                Chidinma has completed Tier 3, but you've only completed Tier 2.
                <a href="/app/tier/3" class="text-jm-purple hover:text-jm-purple-dark font-semibold underline">
                  Complete Tier 3
                </a> to unlock full compatibility.
              </p>
            </div>
          </div>
        </div>

        <!-- Timestamp -->
        <p class="font-sans text-xs text-jm-gray-500">
          Sent 2 hours ago
        </p>

        <!-- Action Buttons -->
        <div class="flex flex-col gap-2 pt-2">
          <button
            type="button"
            class="
              w-full bg-gradient-jm hover:bg-gradient-jm-hover
              text-white font-sans font-semibold
              px-4 py-3 rounded-lg
              transition-all duration-200
              shadow-sm hover:shadow-md
              focus:outline-none focus:ring-2 focus:ring-jm-coral focus:ring-offset-2
            "
            onclick="acceptInterest(123)"
          >
            Accept Interest
          </button>

          <div class="flex gap-2">
            <a
              href="/app/profile/123"
              class="
                flex-1 border-2 border-jm-purple hover:border-jm-purple-dark
                text-jm-purple hover:text-jm-purple-dark hover:bg-jm-purple/5
                font-sans font-medium text-sm
                px-4 py-2 rounded-lg
                transition-all duration-200
                text-center
                focus:outline-none focus:ring-2 focus:ring-jm-purple focus:ring-offset-2
              "
            >
              View Profile
            </a>
            <button
              type="button"
              class="
                flex-1 border-2 border-jm-gray-300 hover:border-jm-gray-400
                text-jm-gray-700 hover:text-jm-gray-900 hover:bg-jm-gray-50
                font-sans font-medium text-sm
                px-4 py-2 rounded-lg
                transition-all duration-200
                focus:outline-none focus:ring-2 focus:ring-jm-gray-400 focus:ring-offset-2
              "
              onclick="declineInterest(123)"
            >
              Decline
            </button>
          </div>
        </div>
      </div>
    </article>

    <!-- Additional Interest Cards... -->

  </div>

  <!-- Empty State (No Pending Requests) -->
  <div class="flex flex-col items-center justify-center py-16 text-center hidden" id="received-empty-state">
    <svg class="w-20 h-20 text-jm-gray-300 mb-6" fill="none" stroke="currentColor" viewBox="0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 000 6.364L12 20.364l7.682-7.682a4.5 4.5 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 00-6.364z"/>
    </svg>
    <h3 class="font-serif text-2xl font-semibold text-jm-gray-900 mb-2">
      No Pending Requests
    </h3>
    <p class="font-sans text-base text-jm-gray-600 max-w-md mb-6">
      You've reviewed all incoming Show Interest requests. Keep discovering new matches!
    </p>
    <a
      href="/app/discover"
      class="
        bg-gradient-jm hover:bg-gradient-jm-hover
        text-white font-sans font-semibold
        px-8 py-4 rounded-lg
        transition-all duration-200
        shadow-md hover:shadow-lg
      "
    >
      Discover Matches
    </a>
  </div>
</div>
```

---

### 3.4 Sent Tab (Outgoing Requests)

**Content:**
- List of users the current user sent Show Interest to
- Status indicators:
  - **Pending:** Yellow dot, "Awaiting response"
  - **Accepted:** Green check, "Accepted" + "Message" CTA
  - **Declined:** Red X, "Declined" + cooldown timer
- Sent timestamp
- "View Profile" link

**HTML Structure:**
```html
<!-- Sent Tab Content -->
<div id="sent-tab" class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 hidden">
  <!-- List Layout -->
  <div class="space-y-4">

    <!-- Sent Interest Item (Pending) -->
    <article class="
      bg-white rounded-lg shadow-sm border border-jm-gray-200
      p-5 flex items-start gap-4
      hover:shadow-md transition-shadow
    ">
      <!-- Profile Photo -->
      <img
        src="/images/profiles/user-456.jpg"
        alt="Emmanuel A."
        class="w-16 h-16 rounded-full object-cover flex-shrink-0"
      />

      <!-- Content -->
      <div class="flex-1 min-w-0">
        <!-- Name & Status -->
        <div class="flex items-start justify-between gap-4 mb-2">
          <div>
            <h3 class="font-serif text-lg font-semibold text-jm-gray-900">
              Emmanuel A., 29
            </h3>
            <p class="font-sans text-sm text-jm-gray-600">
              Lagos, Nigeria • Software Engineer
            </p>
          </div>

          <!-- Status Badge (Pending) -->
          <span class="inline-flex items-center gap-1 bg-jm-warning/10 text-jm-warning px-3 py-1 rounded-full text-xs font-medium flex-shrink-0">
            <svg class="w-3 h-3" fill="currentColor" viewBox="0 20 20">
              <path fill-rule="evenodd" d="M10 18a8 8 100-16 8 8 000 16zm1-12a1 1 10-2v4a1 1 00.293.707l2.828 2.829a1 1 101.415-1.415L11 9.586V6z" clip-rule="evenodd"/>
            </svg>
            Awaiting Response
          </span>
        </div>

        <!-- Tier Info -->
        <div class="flex items-center gap-2 mb-3">
          <span class="inline-flex items-center gap-1 bg-jm-gray-100 text-jm-gray-700 px-2 py-1 rounded-md text-xs font-medium">
            Tier 4 Complete
          </span>
          <span class="inline-flex items-center gap-1 bg-jm-purple/10 text-jm-purple px-2 py-1 rounded-md text-xs font-medium">
            EDT: Tier 3
          </span>
        </div>

        <!-- Timestamp & Action -->
        <div class="flex items-center justify-between flex-wrap gap-3">
          <p class="font-sans text-xs text-jm-gray-500">
            Sent 3 days ago
          </p>
          <a
            href="/app/profile/456"
            class="
              text-jm-purple hover:text-jm-purple-dark
              font-sans font-medium text-sm
              underline
              focus:outline-none focus:ring-2 focus:ring-jm-purple focus:ring-offset-1 rounded
            "
          >
            View Profile
          </a>
        </div>
      </div>
    </article>

    <!-- Sent Interest Item (Accepted) -->
    <article class="
      bg-white rounded-lg shadow-sm border-2 border-jm-success
      p-5 flex items-start gap-4
      hover:shadow-md transition-shadow
    ">
      <!-- Profile Photo -->
      <img
        src="/images/profiles/user-789.jpg"
        alt="Folake A."
        class="w-16 h-16 rounded-full object-cover flex-shrink-0"
      />

      <!-- Content -->
      <div class="flex-1 min-w-0">
        <!-- Name & Status -->
        <div class="flex items-start justify-between gap-4 mb-2">
          <div>
            <h3 class="font-serif text-lg font-semibold text-jm-gray-900">
              Folake A., 28
            </h3>
            <p class="font-sans text-sm text-jm-gray-600">
              Abuja, Nigeria • Marketing Manager
            </p>
          </div>

          <!-- Status Badge (Accepted) -->
          <span class="inline-flex items-center gap-1 bg-jm-success/10 text-jm-success px-3 py-1 rounded-full text-xs font-medium flex-shrink-0">
            <svg class="w-3 h-3" fill="currentColor" viewBox="0 20 20">
              <path fill-rule="evenodd" d="M10 18a8 8 100-16 8 8 000 16zm3.707-9.293a1 1 00-1.414-1.414L9 10.586 7.707 9.293a1 1 00-1.414 1.414l2 2a1 1 001.414l4-4z" clip-rule="evenodd"/>
            </svg>
            Accepted
          </span>
        </div>

        <!-- Tier Info -->
        <div class="flex items-center gap-2 mb-3">
          <span class="inline-flex items-center gap-1 bg-jm-gray-100 text-jm-gray-700 px-2 py-1 rounded-md text-xs font-medium">
            Tier 3 Complete
          </span>
          <span class="inline-flex items-center gap-1 bg-jm-success/10 text-jm-success px-2 py-1 rounded-full text-xs font-medium">
            <svg class="w-3 h-3" fill="currentColor" viewBox="0 20 20">
              <path fill-rule="evenodd" d="M6.267 3.455a3.066 3.066 001.745-.723 3.066 3.066 013.976 3.066 3.066 001.745.723 3.066 3.066 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 010 3.976 3.066 3.066 00-.723 1.745 3.066 3.066 01-2.812 2.812 3.066 3.066 00-1.745.723 3.066 3.066 01-3.976 3.066 3.066 00-1.745-.723 3.066 3.066 01-2.812-2.812 3.066 3.066 00-.723-1.745 3.066 3.066 010-3.976 3.066 3.066 00.723-1.745 3.066 3.066 012.812-2.812zm7.44 5.252a1 1 00-1.414-1.414L9 10.586 7.707 9.293a1 1 00-1.414 1.414l2 2a1 1 001.414l4-4z" clip-rule="evenodd"/>
            </svg>
            Verified
          </span>
        </div>

        <!-- Timestamp & Actions -->
        <div class="flex items-center justify-between flex-wrap gap-3">
          <p class="font-sans text-xs text-jm-gray-500">
            Accepted 1 day ago
          </p>
          <div class="flex items-center gap-3">
            <a
              href="/app/profile/789"
              class="
                text-jm-purple hover:text-jm-purple-dark
                font-sans font-medium text-sm
                underline
                focus:outline-none focus:ring-2 focus:ring-jm-purple focus:ring-offset-1 rounded
              "
            >
              View Profile
            </a>
            <a
              href="/app/messages/789"
              class="
                bg-gradient-jm hover:bg-gradient-jm-hover
                text-white font-sans font-semibold text-sm
                px-4 py-2 rounded-lg
                transition-all duration-200
                shadow-sm hover:shadow-md
                focus:outline-none focus:ring-2 focus:ring-jm-coral focus:ring-offset-2
              "
            >
              Send Message
            </a>
          </div>
        </div>
      </div>
    </article>

    <!-- Sent Interest Item (Declined with Cooldown) -->
    <article class="
      bg-white rounded-lg shadow-sm border border-jm-error/30
      p-5 flex items-start gap-4
      opacity-60
    ">
      <!-- Profile Photo (Grayed Out) -->
      <img
        src="/images/profiles/user-101.jpg"
        alt="Amara O."
        class="w-16 h-16 rounded-full object-cover flex-shrink-0 grayscale"
      />

      <!-- Content -->
      <div class="flex-1 min-w-0">
        <!-- Name & Status -->
        <div class="flex items-start justify-between gap-4 mb-2">
          <div>
            <h3 class="font-serif text-lg font-semibold text-jm-gray-700">
              Amara O., 32
            </h3>
            <p class="font-sans text-sm text-jm-gray-500">
              Port Harcourt, Nigeria • Doctor
            </p>
          </div>

          <!-- Status Badge (Declined) -->
          <span class="inline-flex items-center gap-1 bg-jm-error/10 text-jm-error px-3 py-1 rounded-full text-xs font-medium flex-shrink-0">
            <svg class="w-3 h-3" fill="currentColor" viewBox="0 20 20">
              <path fill-rule="evenodd" d="M10 18a8 8 100-16 8 8 000 16zM8.707 7.293a1 1 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 101.414 1.414L10 11.414l1.293 1.293a1 1 001.414-1.414L11.414 10l1.293-1.293a1 1 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"/>
            </svg>
            Declined
          </span>
        </div>

        <!-- Cooldown Warning -->
        <div class="bg-jm-error/10 border-l-4 border-jm-error p-3 rounded-r-lg mb-3">
          <p class="font-sans text-xs text-jm-gray-700">
            <strong>Cooldown active:</strong> You can send another Show Interest on
            <span class="font-semibold text-jm-error">May 27, 2026</span>
            (87 days remaining).
          </p>
        </div>

        <!-- Timestamp -->
        <p class="font-sans text-xs text-jm-gray-500">
          Declined 3 days ago
        </p>
      </div>
    </article>

  </div>

  <!-- Empty State (No Sent Requests) -->
  <div class="flex flex-col items-center justify-center py-16 text-center hidden" id="sent-empty-state">
    <svg class="w-20 h-20 text-jm-gray-300 mb-6" fill="none" stroke="currentColor" viewBox="0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0v-8"/>
    </svg>
    <h3 class="font-serif text-2xl font-semibold text-jm-gray-900 mb-2">
      No Sent Interests Yet
    </h3>
    <p class="font-sans text-base text-jm-gray-600 max-w-md mb-6">
      Start connecting by sending Show Interest to profiles that match your values.
    </p>
    <a
      href="/app/discover"
      class="
        bg-gradient-jm hover:bg-gradient-jm-hover
        text-white font-sans font-semibold
        px-8 py-4 rounded-lg
        transition-all duration-200
        shadow-md hover:shadow-lg
      "
    >
      Discover Matches
    </a>
  </div>
</div>
```

---

### 3.5 Accepted Tab (Active Connections)

**Content:**
- Grid of profile cards for mutually accepted interests
- Each card shows:
  - Profile photo
  - Name + last initial
  - EDT badge
  - "Message" button
  - "View Profile" link
  - Last message preview (if available)
  - Unread message badge (if applicable)

**HTML Structure:**
```html
<!-- Accepted Tab Content -->
<div id="accepted-tab" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 hidden">
  <!-- Grid Layout -->
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

    <!-- Accepted Connection Card -->
    <article class="
      bg-white rounded-xl shadow-md hover:shadow-lg
      transition-all duration-200
      overflow-hidden
      border-2 border-jm-success
    ">
      <!-- Card Image -->
      <div class="relative aspect-[3/4] bg-jm-gray-100">
        <img
          src="/images/profiles/user-789.jpg"
          alt="Folake A., 28"
          class="w-full h-full object-cover"
        />
        <!-- Verified Badge -->
        <div class="absolute top-3 right-3 bg-jm-success text-white px-2 py-1 rounded-full flex items-center gap-1 text-xs font-medium shadow-md">
          <svg class="w-3 h-3" fill="currentColor" viewBox="0 20 20">
            <path fill-rule="evenodd" d="M6.267 3.455a3.066 3.066 001.745-.723 3.066 3.066 013.976 3.066 3.066 001.745.723 3.066 3.066 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 010 3.976 3.066 3.066 00-.723 1.745 3.066 3.066 01-2.812 2.812 3.066 3.066 00-1.745.723 3.066 3.066 01-3.976 3.066 3.066 00-1.745-.723 3.066 3.066 01-2.812-2.812 3.066 3.066 00-.723-1.745 3.066 3.066 010-3.976 3.066 3.066 00.723-1.745 3.066 3.066 012.812-2.812zm7.44 5.252a1 1 00-1.414-1.414L9 10.586 7.707 9.293a1 1 00-1.414 1.414l2 2a1 1 001.414l4-4z" clip-rule="evenodd"/>
          </svg>
          Verified
        </div>
        <!-- Unread Badge (Top Left) -->
        <div class="absolute top-3 left-3 bg-jm-purple text-white px-2 py-1 rounded-full text-xs font-semibold shadow-md">
          2 new
        </div>
      </div>

      <!-- Card Content -->
      <div class="p-5 space-y-3">
        <!-- Name & Age -->
        <h3 class="font-serif text-xl font-semibold text-jm-gray-900">
          Folake A., 28
        </h3>

        <!-- Location & Occupation -->
        <div class="space-y-1 text-sm text-jm-gray-600">
          <div class="flex items-center gap-2">
            <svg class="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 01-2.827l-4.244-4.243a8 8 1111.314z"/>
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 11-6 3 3 016z"/>
            </svg>
            Abuja, Nigeria
          </div>
          <div class="flex items-center gap-2">
            <svg class="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0112 15c-3.183-6.22-.62-9-1.745M16 6V4a2 2 00-2-2h-4a2 2 00-2 2v2m4 6h.01M5 20h14a2 2 002-2V8a2 2 00-2-2H5a2 2 00-2 2v10a2 2 002 2z"/>
            </svg>
            Marketing Manager
          </div>
        </div>

        <!-- EDT Badge -->
        <div class="flex items-center gap-2">
          <span class="inline-flex items-center gap-1 bg-jm-purple/10 text-jm-purple px-2 py-1 rounded-md text-xs font-medium">
            EDT: Tier 3
          </span>
        </div>

        <!-- Last Message Preview -->
        <div class="pt-2 border-t border-jm-gray-200">
          <p class="font-sans text-sm text-jm-gray-600 italic truncate">
            "Thanks for sharing that! I'd love to..."
          </p>
          <p class="font-sans text-xs text-jm-gray-500 mt-1">
            1 hour ago
          </p>
        </div>

        <!-- Action Buttons -->
        <div class="flex flex-col gap-2 pt-2">
          <a
            href="/app/messages/789"
            class="
              w-full bg-gradient-jm hover:bg-gradient-jm-hover
              text-white font-sans font-semibold
              px-4 py-3 rounded-lg
              transition-all duration-200
              shadow-sm hover:shadow-md
              text-center
              focus:outline-none focus:ring-2 focus:ring-jm-coral focus:ring-offset-2
            "
          >
            Send Message
          </a>
          <a
            href="/app/profile/789"
            class="
              w-full border-2 border-jm-purple hover:border-jm-purple-dark
              text-jm-purple hover:text-jm-purple-dark hover:bg-jm-purple/5
              font-sans font-medium text-sm
              px-4 py-2 rounded-lg
              transition-all duration-200
              text-center
              focus:outline-none focus:ring-2 focus:ring-jm-purple focus:ring-offset-2
            "
          >
            View Profile
          </a>
        </div>
      </div>
    </article>

    <!-- Additional Accepted Cards... -->

  </div>

  <!-- Empty State (No Accepted Connections) -->
  <div class="flex flex-col items-center justify-center py-16 text-center hidden" id="accepted-empty-state">
    <svg class="w-20 h-20 text-jm-gray-300 mb-6" fill="none" stroke="currentColor" viewBox="0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8h2a2 2 012 2v6a2 2 01-2 2h-2v4l-4-4H9a1.994 1.994 01-1.414-.586m0L11 14h4a2 2 002-2V6a2 2 00-2-2H5a2 2 00-2 2v6a2 2 002 2h2v4l.586-.586z"/>
    </svg>
    <h3 class="font-serif text-2xl font-semibold text-jm-gray-900 mb-2">
      No Active Connections Yet
    </h3>
    <p class="font-sans text-base text-jm-gray-600 max-w-md mb-6">
      Accept incoming Show Interest requests to start building meaningful connections.
    </p>
    <a
      href="/app/discover"
      class="
        bg-gradient-jm hover:bg-gradient-jm-hover
        text-white font-sans font-semibold
        px-8 py-4 rounded-lg
        transition-all duration-200
        shadow-md hover:shadow-lg
      "
    >
      Discover Matches
    </a>
  </div>
</div>
```

---

## 4. User Interactions & Flows

### 4.1 Accepting an Interest

**Flow:**
1. User views Received tab
2. User reviews profile card (EDT-appropriate information visible)
3. User clicks "Accept Interest"
4. System checks eligibility (no cooldown violations)
5. **Tier Awareness Modal** shown (if tier mismatch exists)
6. User confirms understanding
7. System creates mutual connection
8. Conversation unlocked (messaging enabled)
9. User redirected to Messages page OR shown success notification
10. Partner receives acceptance notification

**Success State:**
- Interest accepted within 500ms
- Conversation created and accessible
- Partner notified via email + in-app notification
- Card moves to Accepted tab

### 4.2 Declining an Interest

**Flow:**
1. User views Received tab
2. User clicks "Decline" button
3. **Confirmation Modal** shown: "Are you sure you want to decline [Name]?"
4. User confirms decline
5. System applies 3-month cooldown (partner cannot retry for 90 days)
6. Interest removed from Received tab
7. Partner receives decline notification (polite rejection)

**Confirmation Modal HTML:**
```html
<!-- Decline Confirmation Modal -->
<div class="fixed inset-0 bg-jm-gray-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
  <div class="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6">
    <h2 class="font-serif text-2xl font-bold text-jm-gray-900 mb-4">
      Decline Interest?
    </h2>
    <p class="font-sans text-base text-jm-gray-700 mb-6">
      Are you sure you want to decline <strong>Chidinma O.</strong>'s Show Interest request?
    </p>
    <div class="bg-jm-warning/10 border-l-4 border-jm-warning p-3 rounded-r-lg mb-6">
      <p class="font-sans text-sm text-jm-gray-700">
        ⚠️ If you decline, Chidinma cannot send another Show Interest for <strong>3 months</strong>.
      </p>
    </div>

    <div class="flex gap-3">
      <button
        type="button"
        class="flex-1 border-2 border-jm-gray-300 hover:border-jm-gray-400 text-jm-gray-700 hover:text-jm-gray-900 hover:bg-jm-gray-50 font-sans font-medium px-4 py-3 rounded-lg transition-all"
        onclick="closeModal()"
      >
        Cancel
      </button>
      <button
        type="button"
        class="flex-1 bg-jm-error hover:bg-jm-error/90 text-white font-sans font-semibold px-4 py-3 rounded-lg transition-all"
        onclick="confirmDecline(123)"
      >
        Decline Interest
      </button>
    </div>
  </div>
</div>
```

### 4.3 Viewing Sent Interest Status

**Flow:**
1. User navigates to Sent tab
2. System loads all sent interests (paginated)
3. User sees status indicators:
   - **Pending:** Yellow dot, "Awaiting response"
   - **Accepted:** Green check, "Accepted" + "Message" CTA
   - **Declined:** Red X, "Declined" + cooldown timer
4. User can click "View Profile" to see partner's profile (EDT-restricted)
5. If accepted, user can click "Send Message" → redirected to Messages page

**Success State:**
- Status accurate and real-time
- Clear visual distinction between statuses
- CTAs contextual to status

### 4.4 Navigating Between Tabs

**Flow:**
1. User clicks tab button
2. Active tab content hides (fade out)
3. Selected tab content shows (fade in)
4. URL updates (e.g., `/app/interests?tab=sent`)
5. Tab navigation button updates (purple underline + bold)

**Success State:**
- Smooth transition (<300ms)
- No page reload
- Browser back/forward buttons work correctly

---

## 5. EDT/Tier Logic

### 5.1 Tier Awareness Warning

**Trigger:** When user A (Tier 2) accepts/views interest from user B (Tier 4+)

**Warning Content:**
- User B's completed tier level
- Current user's completed tier level
- EDT will be capped at lower tier
- CTA to complete higher tier

**Warning Modal HTML:**
```html
<!-- Tier Awareness Warning Modal -->
<div class="fixed inset-0 bg-jm-gray-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
  <div class="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-6">
    <div class="flex items-start gap-3 mb-4">
      <svg class="w-6 h-6 text-jm-warning flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 20 20">
        <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 11-2 1 1 012zm-1-8a1 1 00-1 1v3a1 1 002V6a1 1 00-1-1z" clip-rule="evenodd"/>
      </svg>
      <div class="flex-1">
        <h2 class="font-serif text-2xl font-bold text-jm-gray-900 mb-2">
          Tier Mismatch Notice
        </h2>
        <p class="font-sans text-base text-jm-gray-700 mb-4">
          <strong>Chidinma O.</strong> has completed <strong>Tier 3</strong>, but you have only completed <strong>Tier 2</strong>.
        </p>

        <div class="bg-jm-purple/10 border-l-4 border-jm-purple p-4 rounded-r-lg mb-4">
          <h3 class="font-sans text-sm font-semibold text-jm-purple mb-2">
            What This Means:
          </h3>
          <ul class="space-y-1 font-sans text-sm text-jm-gray-700">
            <li>• Your EDT will be <strong>Tier 2</strong> (the lower of the two)</li>
            <li>• You'll only see Chidinma's Tier 1-2 information</li>
            <li>• Chidinma will only see your Tier 1-2 information</li>
            <li>• You can request Tier 3 access later (requires completing Tier 3 yourself)</li>
          </ul>
        </div>

        <div class="bg-jm-gray-50 border border-jm-gray-200 rounded-lg p-4">
          <h3 class="font-sans text-sm font-semibold text-jm-gray-900 mb-2">
            Recommendation:
          </h3>
          <p class="font-sans text-sm text-jm-gray-700 mb-3">
            Complete Tier 3 before accepting to unlock full compatibility insights.
          </p>
          <a
            href="/app/tier/3"
            class="inline-block text-jm-purple hover:text-jm-purple-dark font-semibold text-sm underline"
          >
            Complete Tier 3 Now →
          </a>
        </div>
      </div>
    </div>

    <div class="flex gap-3 pt-4 border-t border-jm-gray-200">
      <button
        type="button"
        class="flex-1 border-2 border-jm-gray-300 hover:border-jm-gray-400 text-jm-gray-700 hover:text-jm-gray-900 hover:bg-jm-gray-50 font-sans font-medium px-4 py-3 rounded-lg transition-all"
        onclick="closeModal()"
      >
        Complete Tier 3 First
      </button>
      <button
        type="button"
        class="flex-1 bg-gradient-jm hover:bg-gradient-jm-hover text-white font-sans font-semibold px-4 py-3 rounded-lg transition-all shadow-sm hover:shadow-md"
        onclick="acceptWithTierMismatch(123)"
      >
        Accept Anyway
      </button>
    </div>
  </div>
</div>
```

### 5.2 EDT Display in Cards

**Key Rule:** Always show EDT badge on profile cards in Interests page

**EDT Badge Variations:**
- **EDT matches user's tier:** Green badge, "EDT: Tier X"
- **EDT lower than user's tier:** Yellow badge, "EDT: Tier X (Their max)"
- **EDT lower than partner's tier:** Yellow badge, "EDT: Tier X (Your max)"

---

## 6. Subscription Ceiling Rules

### 6.1 Free User Restrictions

**Show Interest Eligibility:**
- Free users can **send Show Interest to Free users only**
- If Free user tries to send to Premium/VIP → Upgrade prompt shown

**Upgrade Prompt (Free → Premium):**
```html
<!-- Show Interest Blocked (Free to Premium) -->
<div class="fixed inset-0 bg-jm-gray-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
  <div class="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6">
    <h2 class="font-serif text-2xl font-bold text-jm-gray-900 mb-4">
      🔒 Premium Required
    </h2>
    <p class="font-sans text-base text-jm-gray-700 mb-6">
      <strong>Emmanuel A.</strong> is a Premium member. To send Show Interest to Premium users, upgrade to Premium.
    </p>

    <div class="bg-jm-purple/10 border-l-4 border-jm-purple p-4 rounded-r-lg mb-6">
      <h3 class="font-sans text-sm font-semibold text-jm-purple mb-2">
        With Premium, you'll unlock:
      </h3>
      <ul class="space-y-1 font-sans text-sm text-jm-gray-700">
        <li>✅ Send Show Interest to Premium users</li>
        <li>✅ Complete Tiers 3 & 4</li>
        <li>✅ Request deeper details from matches</li>
        <li>✅ Unlock marriage-level compatibility insights</li>
      </ul>
    </div>

    <div class="space-y-3">
      <a
        href="/app/subscription/upgrade"
        class="block w-full bg-gradient-jm hover:bg-gradient-jm-hover text-white font-sans font-semibold px-6 py-3 rounded-lg transition-all text-center shadow-md hover:shadow-lg"
      >
        Upgrade to Premium (₦18,000/mo)
      </a>
      <button
        type="button"
        class="block w-full border-2 border-jm-gray-300 hover:border-jm-gray-400 text-jm-gray-700 hover:text-jm-gray-900 hover:bg-jm-gray-50 font-sans font-medium px-6 py-3 rounded-lg transition-all text-center"
        onclick="closeModal()"
      >
        Maybe Later
      </button>
    </div>
  </div>
</div>
```

### 6.2 Premium User Restrictions

**Show Interest Eligibility:**
- Premium users can send to Free and Premium users
- **Cannot send to VIP users** → Upgrade prompt shown

**Upgrade Prompt (Premium → VIP):**
```html
<!-- Show Interest Blocked (Premium to VIP) -->
<div class="fixed inset-0 bg-jm-gray-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
  <div class="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6">
    <h2 class="font-serif text-2xl font-bold text-jm-gray-900 mb-4">
      🔒 VIP Membership Required
    </h2>
    <p class="font-sans text-base text-jm-gray-700 mb-6">
      <strong>Dr. Amara O.</strong> is a VIP member. VIP members can only receive Show Interest from other VIP members.
    </p>

    <div class="bg-gradient-jm/10 border-l-4 border-jm-purple p-4 rounded-r-lg mb-6">
      <h3 class="font-sans text-sm font-semibold text-jm-purple mb-2">
        VIP Membership Benefits:
      </h3>
      <ul class="space-y-1 font-sans text-sm text-jm-gray-700">
        <li>✅ Connect with verified, high-intent users</li>
        <li>✅ Personal matchmaking expert</li>
        <li>✅ Curated introductions</li>
        <li>✅ Complete Tier 5 (ID verification)</li>
        <li>✅ Profile privacy & invisible browsing</li>
      </ul>
    </div>

    <div class="space-y-3">
      <a
        href="/app/subscription/vip-application"
        class="block w-full bg-gradient-jm hover:bg-gradient-jm-hover text-white font-sans font-semibold px-6 py-3 rounded-lg transition-all text-center shadow-md hover:shadow-lg"
      >
        Apply for VIP Membership
      </a>
      <button
        type="button"
        class="block w-full border-2 border-jm-gray-300 hover:border-jm-gray-400 text-jm-gray-700 hover:text-jm-gray-900 hover:bg-jm-gray-50 font-sans font-medium px-6 py-3 rounded-lg transition-all text-center"
        onclick="closeModal()"
      >
        Learn More About VIP
      </button>
    </div>
  </div>
</div>
```

---

## 7. Accessibility Requirements

### WCAG 2.1 AA Compliance

**Keyboard Navigation:**
- Tab navigation fully keyboard-accessible
- Arrow keys navigate between tabs
- Enter/Space accepts or declines interests

**Screen Reader Support:**
- Tab navigation: `role="tablist"`, `aria-label="Interest categories"`
- Each tab: `role="tab"`, `aria-selected="true/false"`, `aria-controls="[tab-panel-id]"`
- Tab panels: `role="tabpanel"`, `aria-labelledby="[tab-id]"`
- Interest cards: Proper heading hierarchy (H3 for names)

**Color Contrast:**
- All text meets 4.5:1 minimum contrast ratio
- Status badges use sufficient contrast
- Focus indicators visible (2px outline)

**Focus Management:**
- Focus moves to tab panel when tab selected
- Modal focus trapped within modal
- Focus returned to trigger element when modal closes

---

## 8. Mobile Responsive Behavior

### Breakpoints

**Mobile (320px-767px):**
- Single column card grid
- Full-width action buttons
- Sticky page header with summary
- Tab navigation scrollable (horizontal overflow)

**Tablet (768px-1023px):**
- 2-column card grid
- Tab navigation fixed
- Side-by-side action buttons

**Desktop (≥1024px):**
- 3-column card grid (Received/Accepted tabs)
- 2-column for Sent tab (list view)
- Fixed navigation
- Larger profile photos

### Mobile-Specific Enhancements

**Touch Targets:**
- Minimum 44x44px for all buttons
- Increased padding on mobile cards

**Swipe Gestures:**
- Swipe left on card → Quick decline
- Swipe right on card → Quick accept (with confirmation)

---

## 9. State Management

### Global State

```javascript
const interestsPageState = {
  received: [], // Incoming requests
  sent: [], // Outgoing requests
  accepted: [], // Active connections
  activeTab: "received", // received | sent | accepted
  loading: {
    received: false,
    sent: false,
    accepted: false
  },
  filters: {
    sortBy: "recent" // recent | tier_match | location
  }
}
```

### State Updates

**Accept Interest:**
```javascript
function acceptInterest(interestId) {
  // Show tier awareness modal (if needed)
  const tierMismatch = checkTierMismatch(interestId)
  if (tierMismatch) {
    showTierAwarenessModal(interestId)
    return
  }

  // Accept interest
  const interest = interestsPageState.received.find(i => i.id === interestId)
  if (!interest) return

  // Optimistic update
  interest.status = "accepted"
  moveToAcceptedTab(interest)
  removeFromReceivedTab(interest)

  // API call
  fetch(`/api/interests/${interestId}/accept`, { method: "POST" })
    .then(response => response.json())
    .then(data => {
      // Update state with server response
      updateInterestState(data)
      showSuccessNotification("Interest accepted! You can now message each other.")
    })
    .catch(error => {
      // Rollback optimistic update
      rollbackAcceptInterest(interest)
      showErrorNotification("Failed to accept interest. Please try again.")
    })
}
```

---

## 10. Error Handling

### Accept Interest Failures

**Scenario:** User accepts interest, but server returns error

**Solution:**
1. Rollback optimistic UI update
2. Show error notification
3. Keep interest in Received tab
4. Allow retry

### Decline Interest Failures

**Scenario:** User declines interest, but server returns error

**Solution:**
1. Show error notification
2. Keep interest in Received tab
3. Allow retry

### Network Failures

**Scenario:** User loads page, but network fails

**Solution:**
1. Show loading skeleton
2. Retry after 3 seconds
3. If still fails, show error state with manual retry button

---

## 11. Success States

### Interest Accepted

**Visual Feedback:**
1. Card moves from Received to Accepted tab with animation
2. Success notification: "Interest accepted! You can now message [Name]."
3. "Send Message" CTA highlighted
4. Partner receives acceptance notification

### Interest Declined

**Visual Feedback:**
1. Card fades out from Received tab
2. Toast notification: "Interest declined."
3. Cooldown badge appears in partner's Sent tab (if they view it)

---

## 12. Loading States

### Tab Content Loading

```html
<!-- Loading Skeleton (Received Tab) -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
  <div class="bg-white rounded-xl shadow-md overflow-hidden">
    <div class="aspect-[3/4] bg-jm-gray-300"></div>
    <div class="p-5 space-y-3">
      <div class="h-6 bg-jm-gray-300 rounded w-3/4"></div>
      <div class="h-4 bg-jm-gray-200 rounded w-1/2"></div>
      <div class="h-4 bg-jm-gray-200 rounded w-2/3"></div>
      <div class="h-10 bg-jm-gray-300 rounded-lg"></div>
    </div>
  </div>
  <!-- Repeat for 3 cards -->
</div>
```

---

## 13. Performance Optimization

### Pagination
- Load 12 interests per tab initially
- "Load More" button or infinite scroll
- Cache loaded interests in state

### Image Optimization
- Profile photos: 400x600px (card size)
- Lazy load images below fold

---

## 14. Related Documentation

- [Messages Spec](messages_spec.md) - Real-time messaging after acceptance
- [Subscription Upgrade Spec](subscription_upgrade_spec.md) - Upgrade flows for blocked actions
- [Tier System](../../Global%20Context/tier_system.md) - EDT and tier rules
- [Show Interest Flow](../../Technical%20Specifications/show_interest_flow.md) - Backend logic

---

**Document Owner:** Product Lead & Frontend Lead
**Last Updated:** 2026-02-27
**Status:** Complete — Ready for Implementation
**Estimated Development Time:** 60-80 hours
