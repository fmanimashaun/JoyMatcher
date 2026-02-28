# Content Moderation Queue Feature Specification

**Version:** 1.0.0
**Last Updated:** 2026-02-27
**Status:** Complete - Ready for Implementation
**Classification:** Admin Feature Specification

---

## Overview

The Content Moderation Queue is the primary interface for Moderators to review and action flagged content on the JoyMatcher platform. It consolidates photo reviews, profile content reviews, user reports, flagged messages, and scam detection into a unified, priority-driven workflow. The queue ensures timely response to safety issues while maintaining the trust-based, marriage-focused community.

**Document Purpose:** This specification provides complete implementation details for the Moderation Queue, including layouts, priority systems, decision workflows, response time tracking, HTML/Tailwind examples, and integration with moderation workflows.

---

## Admin Role Access

### Access Matrix

| Admin Role | Access Level | Permitted Actions |
|------------|--------------|-------------------|
| Super Admin | Full Access | All moderation functions + ban authority + policy override |
| Moderator | Moderation Only | Review content, issue warnings, suspend users (≤30 days) |
| VIP Coordinator | No Access | Cannot access moderation queue (VIP-specific only) |
| VIP Expert | No Access | Cannot access moderation queue |
| Data Protection Officer | Limited Access | View user content for deletion requests only |
| Support Agent | Read-Only | View reports, cannot action |

**Escalation Authority:**
- Moderators can handle warnings, content removal, suspensions ≤30 days
- Permanent bans require Super Admin approval via escalation

---

## Page Purpose & Admin Goals

### Moderator Goals

1. **Rapid Triage:** Quickly identify and prioritize critical safety issues (harassment, explicit content, scams)
2. **Accurate Decisions:** Make consistent, fair moderation decisions aligned with community guidelines
3. **Timely Response:** Meet response time targets (Critical: 2h, High: 4h, Medium: 12h, Low: 24h)
4. **Pattern Detection:** Identify repeat offenders and emerging safety threats
5. **Quality Assurance:** Maintain low false positive rate (<5%) and low appeal overturn rate (<10%)
6. **Documentation:** Log all decisions with clear rationale for audit trail

---

## Layout & Wireframe Description

### Page Structure

```
┌─────────────────────────────────────────────────────────────────┐
│ TOP NAVIGATION BAR                                              │
│ Logo | Moderation Queue | Role Badge | Profile | Logout         │
├──────────────┬──────────────────────────────────────────────────┤
│              │                                                  │
│   SIDEBAR    │          MAIN CONTENT AREA                      │
│   FILTERS    │                                                  │
│              │   ┌────────────────────────────────────────┐    │
│ ▼ Queue Type │   │  METRIC CARDS ROW                      │    │
│  - All       │   │  [Pending] [Today] [Avg Time] [Accuracy]│   │
│  - Photos    │   └────────────────────────────────────────┘    │
│  - Profiles  │                                                  │
│  - Reports   │   ┌────────────────────────────────────────┐    │
│  - Messages  │   │  PRIORITY TABS                         │    │
│              │   │  [All] [Critical] [High] [Med] [Low]   │    │
│ ▼ Priority   │   └────────────────────────────────────────┘    │
│  - Critical  │                                                  │
│  - High      │   ┌────────────────────────────────────────┐    │
│  - Medium    │   │  MODERATION QUEUE LIST                 │    │
│  - Low       │   │  ┌──────────────────────────────┐      │    │
│              │   │  │ [Item 1 - Critical]          │      │    │
│ ▼ Status     │   │  │ Photo Review - Explicit      │      │    │
│  - Pending   │   │  │ 2 hours ago | [Review]       │      │    │
│  - Actioned  │   │  └──────────────────────────────┘      │    │
│  - Escalated │   │  ┌──────────────────────────────┐      │    │
│              │   │  │ [Item 2 - High]              │      │    │
│              │   │  │ Report - Harassment          │      │    │
│              │   │  │ 4 hours ago | [Review]       │      │    │
│              │   │  └──────────────────────────────┘      │    │
│              │   └────────────────────────────────────────┘    │
│              │                                                  │
└──────────────┴──────────────────────────────────────────────────┘
```

### Responsive Behavior

- **Desktop (≥1024px):** Sidebar filters + Main queue (2-column layout)
- **Tablet (768px-1023px):** Collapsible sidebar, full-width queue
- **Mobile (<768px):** Bottom tab navigation, filters in modal

---

## Component Breakdown

### 1. Top Navigation Bar

**Purpose:** Global navigation, role identification, notification alerts

**HTML/Tailwind Example:**

```html
<!-- Top Navigation Bar -->
<header class="bg-white border-b border-jm-gray-200 sticky top-0 z-50 shadow-sm">
  <nav class="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
    <div class="flex items-center justify-between h-16">
      <!-- Left: Logo + Page Title -->
      <div class="flex items-center gap-6">
        <a href="/admin/moderation/queue" class="flex items-center gap-3">
          <img src="/images/logo.svg" alt="JoyMatcher" class="h-8 w-8" />
          <span class="font-serif text-lg font-bold text-jm-gray-900 hidden md:inline">
            Moderation Queue
          </span>
        </a>

        <!-- Role Badge -->
        <span class="
          bg-jm-info/10 text-jm-info
          px-3 py-1 rounded-full
          text-xs font-semibold
          border border-jm-info/20
        ">
          Moderator
        </span>
      </div>

      <!-- Right: Alerts + Stats + Profile -->
      <div class="flex items-center gap-4">
        <!-- Critical Alert Badge -->
        <div class="
          flex items-center gap-2 px-3 py-1.5 rounded-full
          bg-jm-error/10 border border-jm-error/20
          text-jm-error text-xs font-semibold
        ">
          <span class="w-2 h-2 bg-jm-error rounded-full animate-pulse"></span>
          3 Critical
        </div>

        <!-- Today's Stats -->
        <div class="hidden md:flex items-center gap-2 text-sm text-jm-gray-600">
          <svg class="w-4 h-4" fill="currentColor" viewBox="0 20 20">
            <path fill-rule="evenodd" d="M10 18a8 8 100-16 8 8 000 16zm3.707-9.293a1 1 00-1.414-1.414L9 10.586 7.707 9.293a1 1 00-1.414 1.414l2 2a1 1 001.414l4-4z" clip-rule="evenodd"/>
          </svg>
          <span class="font-medium">18 today</span>
        </div>

        <!-- Profile Dropdown -->
        <div class="relative">
          <button
            type="button"
            class="flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-jm-purple rounded-full"
            aria-label="Account menu"
            id="moderator-profile-button"
          >
            <img
              src="/images/admin/moderator-avatar.jpg"
              alt="Moderator profile"
              class="w-9 h-9 rounded-full border-2 border-jm-info"
            />
            <svg class="w-4 h-4 text-jm-gray-600" fill="currentColor" viewBox="0 20 20">
              <path fill-rule="evenodd" d="M5.293 7.293a1 1 011.414L10 10.586l3.293-3.293a1 1 111.414 1.414l-4 4a1 1 01-1.414l-4-4a1 1 010-1.414z" clip-rule="evenodd"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  </nav>
</header>
```

---

### 2. Sidebar Filters

**Purpose:** Filter moderation queue by type, priority, and status

**HTML/Tailwind Example:**

```html
<!-- Sidebar Filters -->
<aside class="
  w-64 bg-white border-r border-jm-gray-200
  h-screen sticky top-16 overflow-y-auto
  hidden lg:block
">
  <div class="p-4 space-y-6">
    <!-- Queue Type Filter -->
    <div>
      <h3 class="font-sans text-xs font-semibold text-jm-gray-500 uppercase tracking-wide mb-3">
        Queue Type
      </h3>
      <div class="space-y-1">
        <button class="
          w-full flex items-center justify-between px-3 py-2 rounded-lg
          bg-jm-purple/10 text-jm-purple font-medium text-sm
          transition-all duration-200
        ">
          <span>All Items</span>
          <span class="bg-jm-purple text-white text-xs font-bold px-2 py-0.5 rounded-full">
            47
          </span>
        </button>
        <button class="
          w-full flex items-center justify-between px-3 py-2 rounded-lg
          text-jm-gray-700 hover:bg-jm-gray-50 text-sm
          transition-all duration-200
        ">
          <span>Photo Reviews</span>
          <span class="text-xs text-jm-gray-500">12</span>
        </button>
        <button class="
          w-full flex items-center justify-between px-3 py-2 rounded-lg
          text-jm-gray-700 hover:bg-jm-gray-50 text-sm
          transition-all duration-200
        ">
          <span>Profile Reviews</span>
          <span class="text-xs text-jm-gray-500">8</span>
        </button>
        <button class="
          w-full flex items-center justify-between px-3 py-2 rounded-lg
          text-jm-gray-700 hover:bg-jm-gray-50 text-sm
          transition-all duration-200
        ">
          <span>User Reports</span>
          <span class="bg-jm-error text-white text-xs font-bold px-2 py-0.5 rounded-full">
            15
          </span>
        </button>
        <button class="
          w-full flex items-center justify-between px-3 py-2 rounded-lg
          text-jm-gray-700 hover:bg-jm-gray-50 text-sm
          transition-all duration-200
        ">
          <span>Flagged Messages</span>
          <span class="text-xs text-jm-gray-500">7</span>
        </button>
        <button class="
          w-full flex items-center justify-between px-3 py-2 rounded-lg
          text-jm-gray-700 hover:bg-jm-gray-50 text-sm
          transition-all duration-200
        ">
          <span>Scam Detection</span>
          <span class="bg-jm-warning text-white text-xs font-bold px-2 py-0.5 rounded-full">
            5
          </span>
        </button>
      </div>
    </div>

    <!-- Priority Filter -->
    <div class="pt-4 border-t border-jm-gray-200">
      <h3 class="font-sans text-xs font-semibold text-jm-gray-500 uppercase tracking-wide mb-3">
        Priority Level
      </h3>
      <div class="space-y-1">
        <button class="
          w-full flex items-center justify-between px-3 py-2 rounded-lg
          text-jm-gray-700 hover:bg-jm-gray-50 text-sm
          transition-all duration-200
        ">
          <div class="flex items-center gap-2">
            <span class="w-2 h-2 bg-jm-error rounded-full"></span>
            <span>Critical</span>
          </div>
          <span class="bg-jm-error text-white text-xs font-bold px-2 py-0.5 rounded-full">
            3
          </span>
        </button>
        <button class="
          w-full flex items-center justify-between px-3 py-2 rounded-lg
          text-jm-gray-700 hover:bg-jm-gray-50 text-sm
          transition-all duration-200
        ">
          <div class="flex items-center gap-2">
            <span class="w-2 h-2 bg-jm-warning rounded-full"></span>
            <span>High</span>
          </div>
          <span class="text-xs text-jm-gray-500">15</span>
        </button>
        <button class="
          w-full flex items-center justify-between px-3 py-2 rounded-lg
          text-jm-gray-700 hover:bg-jm-gray-50 text-sm
          transition-all duration-200
        ">
          <div class="flex items-center gap-2">
            <span class="w-2 h-2 bg-jm-info rounded-full"></span>
            <span>Medium</span>
          </div>
          <span class="text-xs text-jm-gray-500">20</span>
        </button>
        <button class="
          w-full flex items-center justify-between px-3 py-2 rounded-lg
          text-jm-gray-700 hover:bg-jm-gray-50 text-sm
          transition-all duration-200
        ">
          <div class="flex items-center gap-2">
            <span class="w-2 h-2 bg-jm-gray-400 rounded-full"></span>
            <span>Low</span>
          </div>
          <span class="text-xs text-jm-gray-500">9</span>
        </button>
      </div>
    </div>

    <!-- Status Filter -->
    <div class="pt-4 border-t border-jm-gray-200">
      <h3 class="font-sans text-xs font-semibold text-jm-gray-500 uppercase tracking-wide mb-3">
        Status
      </h3>
      <div class="space-y-1">
        <button class="
          w-full flex items-center justify-between px-3 py-2 rounded-lg
          text-jm-gray-700 hover:bg-jm-gray-50 text-sm
          transition-all duration-200
        ">
          <span>Pending</span>
          <span class="text-xs text-jm-gray-500">47</span>
        </button>
        <button class="
          w-full flex items-center justify-between px-3 py-2 rounded-lg
          text-jm-gray-700 hover:bg-jm-gray-50 text-sm
          transition-all duration-200
        ">
          <span>Actioned Today</span>
          <span class="text-xs text-jm-gray-500">18</span>
        </button>
        <button class="
          w-full flex items-center justify-between px-3 py-2 rounded-lg
          text-jm-gray-700 hover:bg-jm-gray-50 text-sm
          transition-all duration-200
        ">
          <span>Escalated</span>
          <span class="text-xs text-jm-gray-500">2</span>
        </button>
      </div>
    </div>

    <!-- Quick Actions -->
    <div class="pt-4 border-t border-jm-gray-200">
      <h3 class="font-sans text-xs font-semibold text-jm-gray-500 uppercase tracking-wide mb-3">
        Quick Actions
      </h3>
      <button class="
        w-full bg-jm-gray-100 hover:bg-jm-gray-200
        text-jm-gray-700 font-sans font-medium text-sm
        px-4 py-2 rounded-lg
        transition-all duration-200
        focus:outline-none focus:ring-2 focus:ring-jm-gray-400
      ">
        Reset All Filters
      </button>
    </div>
  </div>
</aside>
```

---

### 3. Metric Cards Row

**Purpose:** Display key moderation performance metrics

**HTML/Tailwind Example:**

```html
<!-- Metric Cards Row -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
  <!-- Metric Card 1: Pending Items -->
  <div class="bg-white rounded-xl shadow-sm border border-jm-gray-200 p-6 space-y-3">
    <div class="flex items-center justify-between">
      <h3 class="font-sans text-sm font-medium text-jm-gray-600">
        Pending Items
      </h3>
      <div class="bg-jm-warning/10 p-2 rounded-lg">
        <svg class="w-5 h-5 text-jm-warning" fill="currentColor" viewBox="0 20 20">
          <path fill-rule="evenodd" d="M10 18a8 8 100-16 8 8 000 16zm1-12a1 1 10-2v4a1 1 00.293.707l2.828 2.829a1 1 101.415-1.415L11 9.586V6z" clip-rule="evenodd"/>
        </svg>
      </div>
    </div>
    <div class="space-y-1">
      <p class="font-serif text-3xl font-bold text-jm-gray-900">
        47
      </p>
      <p class="font-sans text-xs text-jm-error flex items-center gap-1">
        <svg class="w-3 h-3" fill="currentColor" viewBox="0 20 20">
          <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 11-2 1 1 012zm-1-8a1 1 00-1 1v3a1 1 002V6a1 1 00-1-1z" clip-rule="evenodd"/>
        </svg>
        3 critical (urgent)
      </p>
    </div>
  </div>

  <!-- Metric Card 2: Resolved Today -->
  <div class="bg-white rounded-xl shadow-sm border border-jm-gray-200 p-6 space-y-3">
    <div class="flex items-center justify-between">
      <h3 class="font-sans text-sm font-medium text-jm-gray-600">
        Resolved Today
      </h3>
      <div class="bg-jm-success/10 p-2 rounded-lg">
        <svg class="w-5 h-5 text-jm-success" fill="currentColor" viewBox="0 20 20">
          <path fill-rule="evenodd" d="M10 18a8 8 100-16 8 8 000 16zm3.707-9.293a1 1 00-1.414-1.414L9 10.586 7.707 9.293a1 1 00-1.414 1.414l2 2a1 1 001.414l4-4z" clip-rule="evenodd"/>
        </svg>
      </div>
    </div>
    <div class="space-y-1">
      <p class="font-serif text-3xl font-bold text-jm-gray-900">
        18
      </p>
      <p class="font-sans text-xs text-jm-gray-500">
        Target: 20 per day
      </p>
    </div>
  </div>

  <!-- Metric Card 3: Avg Response Time -->
  <div class="bg-white rounded-xl shadow-sm border border-jm-gray-200 p-6 space-y-3">
    <div class="flex items-center justify-between">
      <h3 class="font-sans text-sm font-medium text-jm-gray-600">
        Avg Response Time
      </h3>
      <div class="bg-jm-success/10 p-2 rounded-lg">
        <svg class="w-5 h-5 text-jm-success" fill="currentColor" viewBox="0 20 20">
          <path fill-rule="evenodd" d="M10 18a8 8 100-16 8 8 000 16zm1-12a1 1 10-2v4a1 1 00.293.707l2.828 2.829a1 1 101.415-1.415L11 9.586V6z" clip-rule="evenodd"/>
        </svg>
      </div>
    </div>
    <div class="space-y-1">
      <p class="font-serif text-3xl font-bold text-jm-gray-900">
        1.2h
      </p>
      <p class="font-sans text-xs text-jm-success flex items-center gap-1">
        <svg class="w-3 h-3" fill="currentColor" viewBox="0 20 20">
          <path fill-rule="evenodd" d="M3.293 9.707a1 1 010-1.414l6-6a1 1 011.414l6 6a1 1 01-1.414 1.414L11 5.414V17a1 1 11-2V5.414L4.707 9.707a1 1 01-1.414z" clip-rule="evenodd"/>
        </svg>
        15% faster than target
      </p>
    </div>
  </div>

  <!-- Metric Card 4: Decision Accuracy -->
  <div class="bg-white rounded-xl shadow-sm border border-jm-gray-200 p-6 space-y-3">
    <div class="flex items-center justify-between">
      <h3 class="font-sans text-sm font-medium text-jm-gray-600">
        Decision Accuracy
      </h3>
      <div class="bg-jm-success/10 p-2 rounded-lg">
        <svg class="w-5 h-5 text-jm-success" fill="currentColor" viewBox="0 20 20">
          <path d="M9 2a1 1 000 2h2a1 1 100-2H9z"/><path fill-rule="evenodd" d="M4 5a2 2 012-2 3 3 003 3h2a3 3 003-3 2 2 012 2v11a2 2 01-2 2H6a2 2 01-2-2V5zm9.707 5.707a1 1 00-1.414-1.414L9 12.586l-1.293-1.293a1 1 00-1.414 1.414l2 2a1 1 001.414l4-4z" clip-rule="evenodd"/>
        </svg>
      </div>
    </div>
    <div class="space-y-1">
      <p class="font-serif text-3xl font-bold text-jm-gray-900">
        97%
      </p>
      <p class="font-sans text-xs text-jm-gray-500">
        3% appeal overturn
      </p>
    </div>
  </div>
</div>
```

---

### 4. Moderation Queue List

**Purpose:** Display individual moderation items sorted by priority and timestamp

**HTML/Tailwind Example:**

```html
<!-- Moderation Queue List -->
<div class="bg-white rounded-xl shadow-sm border border-jm-gray-200">
  <!-- Queue Header -->
  <div class="p-6 border-b border-jm-gray-200">
    <div class="flex items-center justify-between">
      <h2 class="font-serif text-xl font-bold text-jm-gray-900">
        Moderation Queue
      </h2>
      <div class="flex items-center gap-3">
        <!-- Sort Dropdown -->
        <select class="
          px-3 py-2 rounded-lg border border-jm-gray-300
          font-sans text-sm text-jm-gray-700
          focus:outline-none focus:ring-2 focus:ring-jm-purple focus:border-jm-purple
        ">
          <option>Sort: Priority (High → Low)</option>
          <option>Sort: Oldest First</option>
          <option>Sort: Newest First</option>
        </select>
      </div>
    </div>
  </div>

  <!-- Queue Items -->
  <div class="divide-y divide-jm-gray-200">
    <!-- Critical: Harassment Report -->
    <article class="p-6 hover:bg-jm-gray-50 transition-colors duration-200">
      <div class="flex items-start gap-4">
        <!-- Priority Indicator -->
        <div class="flex-shrink-0">
          <span class="
            inline-flex items-center justify-center
            w-10 h-10 rounded-full
            bg-jm-error/10 border-2 border-jm-error
          ">
            <svg class="w-5 h-5 text-jm-error" fill="currentColor" viewBox="0 20 20">
              <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 11-2 1 1 012zm-1-8a1 1 00-1 1v3a1 1 002V6a1 1 00-1-1z" clip-rule="evenodd"/>
            </svg>
          </span>
        </div>

        <!-- Item Content -->
        <div class="flex-1 min-w-0 space-y-3">
          <!-- Header -->
          <div class="flex items-start justify-between gap-4">
            <div class="space-y-1">
              <div class="flex items-center gap-2">
                <span class="
                  inline-flex items-center gap-1
                  bg-jm-error/10 text-jm-error
                  px-2 py-1 rounded-md
                  text-xs font-semibold uppercase
                ">
                  Critical
                </span>
                <span class="
                  inline-flex items-center gap-1
                  bg-jm-gray-100 text-jm-gray-700
                  px-2 py-1 rounded-md
                  text-xs font-medium
                ">
                  User Report
                </span>
                <span class="font-sans text-xs text-jm-gray-500">
                  2 hours ago
                </span>
              </div>
              <h3 class="font-sans text-base font-semibold text-jm-gray-900">
                Harassment Report: Multiple unwanted messages
              </h3>
            </div>

            <!-- Response Time Indicator -->
            <div class="flex-shrink-0">
              <span class="
                inline-flex items-center gap-1
                bg-jm-error/10 text-jm-error
                px-2 py-1 rounded-md
                text-xs font-semibold
              ">
                <svg class="w-3 h-3" fill="currentColor" viewBox="0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 100-16 8 8 000 16zm1-12a1 1 10-2v4a1 1 00.293.707l2.828 2.829a1 1 101.415-1.415L11 9.586V6z" clip-rule="evenodd"/>
                </svg>
                Target: <2h
              </span>
            </div>
          </div>

          <!-- Report Details -->
          <div class="bg-jm-gray-50 rounded-lg p-4 space-y-2">
            <div class="grid grid-cols-2 gap-3 text-sm">
              <div>
                <span class="font-medium text-jm-gray-600">Reporter:</span>
                <span class="text-jm-gray-900 ml-1">Ngozi M. (ID: 11223)</span>
              </div>
              <div>
                <span class="font-medium text-jm-gray-600">Reported User:</span>
                <span class="text-jm-gray-900 ml-1">Emeka T. (ID: 44556)</span>
              </div>
            </div>
            <div class="text-sm">
              <span class="font-medium text-jm-gray-600">Reason:</span>
              <p class="text-jm-gray-900 mt-1">
                "This user sent me multiple messages after I declined his Show Interest request.
                He called me rude and said I wasted his time. I feel uncomfortable."
              </p>
            </div>
            <div class="text-sm">
              <span class="font-medium text-jm-gray-600">Evidence:</span>
              <span class="text-jm-gray-900 ml-1">4 messages attached</span>
            </div>
          </div>

          <!-- Action Buttons -->
          <div class="flex items-center gap-3">
            <button class="
              bg-gradient-jm hover:bg-gradient-jm-hover
              text-white font-sans font-semibold text-sm
              px-5 py-2.5 rounded-lg
              transition-all duration-200
              shadow-sm hover:shadow-md
              focus:outline-none focus:ring-2 focus:ring-jm-coral focus:ring-offset-2
            ">
              Review Report
            </button>
            <button class="
              border-2 border-jm-gray-300 hover:border-jm-gray-400
              text-jm-gray-700 hover:text-jm-gray-900
              font-sans font-medium text-sm
              px-5 py-2.5 rounded-lg
              transition-all duration-200
              focus:outline-none focus:ring-2 focus:ring-jm-gray-400 focus:ring-offset-2
            ">
              View User Profiles
            </button>
            <button class="
              text-jm-purple hover:text-jm-purple-dark
              font-sans font-medium text-sm
              px-3 py-2.5
              transition-colors duration-200
            ">
              Escalate to Super Admin
            </button>
          </div>
        </div>
      </div>
    </article>

    <!-- High: Inappropriate Photo -->
    <article class="p-6 hover:bg-jm-gray-50 transition-colors duration-200">
      <div class="flex items-start gap-4">
        <!-- Priority Indicator -->
        <div class="flex-shrink-0">
          <span class="
            inline-flex items-center justify-center
            w-10 h-10 rounded-full
            bg-jm-warning/10 border-2 border-jm-warning
          ">
            <svg class="w-5 h-5 text-jm-warning" fill="currentColor" viewBox="0 20 20">
              <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 11-2 1 1 012zm-1-8a1 1 00-1 1v3a1 1 002V6a1 1 00-1-1z" clip-rule="evenodd"/>
            </svg>
          </span>
        </div>

        <!-- Item Content -->
        <div class="flex-1 min-w-0 space-y-3">
          <!-- Header -->
          <div class="flex items-start justify-between gap-4">
            <div class="space-y-1">
              <div class="flex items-center gap-2">
                <span class="
                  inline-flex items-center gap-1
                  bg-jm-warning/10 text-jm-warning
                  px-2 py-1 rounded-md
                  text-xs font-semibold uppercase
                ">
                  High
                </span>
                <span class="
                  inline-flex items-center gap-1
                  bg-jm-gray-100 text-jm-gray-700
                  px-2 py-1 rounded-md
                  text-xs font-medium
                ">
                  Photo Review
                </span>
                <span class="font-sans text-xs text-jm-gray-500">
                  4 hours ago
                </span>
              </div>
              <h3 class="font-sans text-base font-semibold text-jm-gray-900">
                Photo Review: Potentially inappropriate content
              </h3>
            </div>

            <!-- Response Time Indicator -->
            <div class="flex-shrink-0">
              <span class="
                inline-flex items-center gap-1
                bg-jm-success/10 text-jm-success
                px-2 py-1 rounded-md
                text-xs font-semibold
              ">
                <svg class="w-3 h-3" fill="currentColor" viewBox="0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 100-16 8 8 000 16zm3.707-9.293a1 1 00-1.414-1.414L9 10.586 7.707 9.293a1 1 00-1.414 1.414l2 2a1 1 001.414l4-4z" clip-rule="evenodd"/>
                </svg>
                On track (<4h)
              </span>
            </div>
          </div>

          <!-- Photo Preview -->
          <div class="flex items-start gap-4">
            <div class="w-32 h-32 bg-jm-gray-100 rounded-lg overflow-hidden">
              <img
                src="/images/flagged-photos/photo-12345.jpg"
                alt="Flagged photo"
                class="w-full h-full object-cover blur-sm"
              />
            </div>
            <div class="flex-1 space-y-2">
              <div class="text-sm">
                <span class="font-medium text-jm-gray-600">User:</span>
                <span class="text-jm-gray-900 ml-1">Sarah M. (ID: 99887)</span>
              </div>
              <div class="text-sm">
                <span class="font-medium text-jm-gray-600">Photo Type:</span>
                <span class="text-jm-gray-900 ml-1">Primary Profile Photo</span>
              </div>
              <div class="text-sm">
                <span class="font-medium text-jm-gray-600">Uploaded:</span>
                <span class="text-jm-gray-900 ml-1">2026-02-27 08:30 AM</span>
              </div>
              <div class="text-sm">
                <span class="font-medium text-jm-gray-600">Flag Reason:</span>
                <span class="text-jm-gray-900 ml-1">Suggestive pose detected by AI</span>
              </div>
            </div>
          </div>

          <!-- Action Buttons -->
          <div class="flex items-center gap-3">
            <button class="
              bg-gradient-jm hover:bg-gradient-jm-hover
              text-white font-sans font-semibold text-sm
              px-5 py-2.5 rounded-lg
              transition-all duration-200
              shadow-sm hover:shadow-md
              focus:outline-none focus:ring-2 focus:ring-jm-coral focus:ring-offset-2
            ">
              Review Photo
            </button>
            <button class="
              border-2 border-jm-success hover:border-jm-success/80
              text-jm-success hover:text-jm-success/80
              font-sans font-medium text-sm
              px-5 py-2.5 rounded-lg
              transition-all duration-200
              focus:outline-none focus:ring-2 focus:ring-jm-success focus:ring-offset-2
            ">
              Quick Approve
            </button>
            <button class="
              border-2 border-jm-error hover:border-jm-error/80
              text-jm-error hover:text-jm-error/80
              font-sans font-medium text-sm
              px-5 py-2.5 rounded-lg
              transition-all duration-200
              focus:outline-none focus:ring-2 focus:ring-jm-error focus:ring-offset-2
            ">
              Quick Reject
            </button>
          </div>
        </div>
      </div>
    </article>

    <!-- Medium: Profile Content Flag -->
    <article class="p-6 hover:bg-jm-gray-50 transition-colors duration-200">
      <div class="flex items-start gap-4">
        <!-- Priority Indicator -->
        <div class="flex-shrink-0">
          <span class="
            inline-flex items-center justify-center
            w-10 h-10 rounded-full
            bg-jm-info/10 border-2 border-jm-info
          ">
            <svg class="w-5 h-5 text-jm-info" fill="currentColor" viewBox="0 20 20">
              <path fill-rule="evenodd" d="M18 10a8 8 11-16 8 8 0116zm-7-4a1 1 11-2 1 1 012zM9 9a1 1 000 2v3a1 1 001 1h1a1 1 100-2v-3a1 1 00-1-1H9z" clip-rule="evenodd"/>
            </svg>
          </span>
        </div>

        <!-- Item Content -->
        <div class="flex-1 min-w-0 space-y-3">
          <!-- Header -->
          <div class="flex items-start justify-between gap-4">
            <div class="space-y-1">
              <div class="flex items-center gap-2">
                <span class="
                  inline-flex items-center gap-1
                  bg-jm-info/10 text-jm-info
                  px-2 py-1 rounded-md
                  text-xs font-semibold uppercase
                ">
                  Medium
                </span>
                <span class="
                  inline-flex items-center gap-1
                  bg-jm-gray-100 text-jm-gray-700
                  px-2 py-1 rounded-md
                  text-xs font-medium
                ">
                  Profile Review
                </span>
                <span class="font-sans text-xs text-jm-gray-500">
                  8 hours ago
                </span>
              </div>
              <h3 class="font-sans text-base font-semibold text-jm-gray-900">
                Profile Content: Banned keyword detected
              </h3>
            </div>

            <!-- Response Time Indicator -->
            <div class="flex-shrink-0">
              <span class="
                inline-flex items-center gap-1
                bg-jm-success/10 text-jm-success
                px-2 py-1 rounded-md
                text-xs font-semibold
              ">
                On track (<12h)
              </span>
            </div>
          </div>

          <!-- Profile Content -->
          <div class="bg-jm-gray-50 rounded-lg p-4 space-y-2">
            <div class="text-sm">
              <span class="font-medium text-jm-gray-600">User:</span>
              <span class="text-jm-gray-900 ml-1">Chidi A. (ID: 67890)</span>
            </div>
            <div class="text-sm">
              <span class="font-medium text-jm-gray-600">Flagged Field:</span>
              <span class="text-jm-gray-900 ml-1">Tier 3: Why Marriage Now?</span>
            </div>
            <div class="text-sm">
              <span class="font-medium text-jm-gray-600">Flagged Content:</span>
              <p class="text-jm-gray-900 mt-1 bg-white p-3 rounded border border-jm-warning">
                "I'm ready to settle down and build a family.
                <span class="bg-jm-warning/20 font-semibold">Contact me on WhatsApp: +234...</span>"
              </p>
            </div>
            <div class="text-sm">
              <span class="font-medium text-jm-gray-600">Flag Reason:</span>
              <span class="text-jm-gray-900 ml-1">Contact information detected (violates guidelines)</span>
            </div>
          </div>

          <!-- Action Buttons -->
          <div class="flex items-center gap-3">
            <button class="
              bg-gradient-jm hover:bg-gradient-jm-hover
              text-white font-sans font-semibold text-sm
              px-5 py-2.5 rounded-lg
              transition-all duration-200
              shadow-sm hover:shadow-md
              focus:outline-none focus:ring-2 focus:ring-jm-coral focus:ring-offset-2
            ">
              Review & Edit
            </button>
            <button class="
              border-2 border-jm-gray-300 hover:border-jm-gray-400
              text-jm-gray-700 hover:text-jm-gray-900
              font-sans font-medium text-sm
              px-5 py-2.5 rounded-lg
              transition-all duration-200
              focus:outline-none focus:ring-2 focus:ring-jm-gray-400 focus:ring-offset-2
            ">
              View Full Profile
            </button>
          </div>
        </div>
      </div>
    </article>
  </div>

  <!-- Pagination -->
  <div class="p-6 border-t border-jm-gray-200">
    <div class="flex items-center justify-between">
      <p class="font-sans text-sm text-jm-gray-600">
        Showing <span class="font-medium">1-20</span> of <span class="font-medium">47</span> items
      </p>
      <div class="flex items-center gap-2">
        <button class="
          px-3 py-2 rounded-lg border border-jm-gray-300
          text-jm-gray-400 cursor-not-allowed
        " disabled>
          Previous
        </button>
        <button class="
          px-3 py-2 rounded-lg border border-jm-gray-300
          text-jm-gray-700 hover:bg-jm-gray-50
          font-medium
        ">
          1
        </button>
        <button class="
          px-3 py-2 rounded-lg border border-jm-gray-300
          text-jm-gray-700 hover:bg-jm-gray-50
        ">
          2
        </button>
        <button class="
          px-3 py-2 rounded-lg border border-jm-gray-300
          text-jm-gray-700 hover:bg-jm-gray-50
        ">
          3
        </button>
        <button class="
          px-3 py-2 rounded-lg border border-jm-gray-300
          bg-jm-purple text-white hover:bg-jm-purple-dark
        ">
          Next
        </button>
      </div>
    </div>
  </div>
</div>
```

---

## Interactive Elements & State Behavior

### Response Time Tracking

**Priority-Based Targets:**

| Priority | Target Response Time | SLA Breach Alert |
|----------|---------------------|------------------|
| Critical | 2 hours | Alert at 1.5 hours |
| High | 4 hours | Alert at 3 hours |
| Medium | 12 hours | Alert at 10 hours |
| Low | 24 hours | Alert at 20 hours |

**Visual Indicators:**

- **On Track:** Green badge
- **Approaching SLA:** Yellow badge (80% of target)
- **SLA Breach:** Red badge + priority escalation

---

## Form Validation Rules

### Photo Review

- **Decision Required:** Must select Approve, Reject, or Request Re-upload
- **Rejection Reason:** Required if Reject selected
- **Re-upload Guidance:** Required if Request Re-upload selected

### User Report Review

- **Action Required:** Must select action (No Action, Warning, Suspension, Escalate)
- **Moderator Notes:** Required for all actions (min 20 characters)
- **Suspension Duration:** Required if Suspension selected (7, 14, or 30 days)
- **Escalation Reason:** Required if Escalate selected

---

## Workflow Diagrams

### Photo Review Workflow

```
User Uploads Photo
       │
       ├─> AI Pre-Scan (NSFW detection, face detection)
       │
       ├─> PASS → Auto-approve (low-risk)
       │
       ├─> FAIL → Add to Moderation Queue (HIGH priority)
       │
       ↓
Moderator Reviews Photo
       │
       ├─> APPROVE → Photo goes live
       │
       ├─> REJECT → Photo deleted, user notified with reason
       │
       └─> REQUEST RE-UPLOAD → Photo deleted, user receives guidance
```

### User Report Workflow

```
User Submits Report
       │
       ├─> Auto-Priority Assignment
       │   ├─> Harassment/Threats → CRITICAL
       │   ├─> Explicit Content → CRITICAL
       │   ├─> Scam/Fraud → HIGH
       │   └─> Other → MEDIUM/LOW
       │
       ↓
Moderator Investigates
       │
       ├─> Review Reporter History
       ├─> Review Reported User History
       ├─> Examine Evidence
       │
       ↓
Moderator Decision
       │
       ├─> NO VIOLATION → Close report, notify reporter
       │
       ├─> MINOR VIOLATION → Edit content + warning
       │
       ├─> MODERATE VIOLATION → Suspension (7-30 days)
       │
       └─> SEVERE VIOLATION → Escalate to Super Admin for permanent ban
```

---

## Permissions & Authorization Checks

### Backend Authorization Middleware

```javascript
// Moderator permission check
function requireModerator(req, res, next) {
  const admin = req.admin;

  // Super Admin and Moderator have access
  if (admin.role === 'superAdmin' || admin.role === 'moderator') {
    return next();
  }

  await logSecurityEvent({
    event: 'unauthorized_moderation_access',
    adminId: admin.id,
    attemptedRoute: req.path,
    ipAddress: req.ip
  });

  return res.status(403).json({
    error: 'Access Denied',
    message: `Your role (${admin.role}) cannot access moderation functions`
  });
}

// Action-level authorization
function checkModerationAuthority(req, res, next) {
  const admin = req.admin;
  const { action } = req.body;

  // Only Super Admin can issue permanent bans
  if (action === 'permanent_ban' && admin.role !== 'superAdmin') {
    return res.status(403).json({
      error: 'Insufficient Permissions',
      message: 'Only Super Admins can issue permanent bans. Please escalate this case.'
    });
  }

  return next();
}
```

---

## State Management Requirements

### Queue State Object

```javascript
const moderationQueueState = {
  // Filters
  filters: {
    queueType: 'all', // 'all', 'photos', 'profiles', 'reports', 'messages', 'scams'
    priority: 'all', // 'all', 'critical', 'high', 'medium', 'low'
    status: 'pending', // 'pending', 'actioned', 'escalated'
  },

  // Metrics
  metrics: {
    pendingTotal: 47,
    pendingCritical: 3,
    resolvedToday: 18,
    avgResponseTime: '1.2h',
    decisionAccuracy: 0.97,
  },

  // Queue items
  items: [
    {
      id: 'mod_queue_001',
      type: 'user_report',
      priority: 'critical',
      reporterId: 'user_11223',
      reportedUserId: 'user_44556',
      reason: 'harassment',
      evidence: ['msg_78901', 'msg_78902', 'msg_78903', 'msg_78904'],
      timestamp: '2026-02-27T08:00:00Z',
      status: 'pending',
      assignedTo: 'admin_moderator_001',
      targetResponseTime: '2026-02-27T10:00:00Z',
    },
  ],

  // Moderator stats (current session)
  moderatorStats: {
    itemsReviewedToday: 18,
    avgDecisionTime: '4.2min',
    accuracyScore: 0.97,
  },
};
```

---

## Audit Logging Requirements

**ALL moderation actions must be logged.**

### Log Structure

```javascript
const ModerationAuditLog = {
  timestamp: Date,
  moderatorId: ObjectId,
  action: String, // 'approve_photo', 'reject_photo', 'suspend_user', 'escalate_report'
  targetId: ObjectId,
  targetType: String, // 'photo', 'profile', 'user', 'report'
  decision: String, // 'approved', 'rejected', 'suspended', 'escalated'
  reason: String,
  evidence: [ObjectId],
  notes: String,
  ipAddress: String,
  userAgent: String,
  result: String, // 'success', 'error'
};
```

### Example Log Entry

```javascript
{
  timestamp: "2026-02-27T10:30:00Z",
  moderatorId: "admin_moderator_001",
  action: "suspend_user",
  targetId: "user_44556",
  targetType: "user",
  decision: "suspended",
  reason: "harassment",
  evidence: ["report_4821", "msg_78901", "msg_78902", "msg_78903"],
  notes: "User sent multiple unwanted messages after Show Interest declined. Disrespectful tone. First suspension.",
  suspensionDuration: 14, // days
  ipAddress: "10.0.0.15",
  userAgent: "Mozilla/5.0...",
  result: "success"
}
```

---

## Accessibility Requirements

**WCAG 2.1 AA Compliance:**

1. **Keyboard Navigation:** Full keyboard access to all queue items and actions
2. **Screen Reader Support:** ARIA labels on priority indicators, time warnings
3. **Color Contrast:** Minimum 4.5:1 for all text
4. **Focus Indicators:** Visible focus rings on all interactive elements
5. **Status Announcements:** Screen reader announcements for queue updates

---

## Error Handling

### Frontend Error Handling

```javascript
// Photo review submission
async function submitPhotoReview(photoId, decision, reason) {
  try {
    const response = await fetch(`/admin/moderation/photos/${photoId}/review`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${sessionToken}`
      },
      body: JSON.stringify({ decision, reason })
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const result = await response.json();
    showSuccessNotification('Photo Reviewed', `Decision: ${decision}`);
    removeFromQueue(photoId);
    refreshMetrics();
  } catch (error) {
    console.error('Photo review failed:', error);
    showErrorNotification('Error', 'Unable to submit photo review. Please try again.');
  }
}
```

---

## Loading States

```html
<!-- Loading Skeleton for Queue Item -->
<div class="p-6 animate-pulse">
  <div class="flex items-start gap-4">
    <div class="w-10 h-10 bg-jm-gray-300 rounded-full"></div>
    <div class="flex-1 space-y-3">
      <div class="h-4 bg-jm-gray-300 rounded w-3/4"></div>
      <div class="h-20 bg-jm-gray-200 rounded"></div>
      <div class="flex gap-3">
        <div class="h-10 bg-jm-gray-300 rounded-lg w-32"></div>
        <div class="h-10 bg-jm-gray-200 rounded-lg w-32"></div>
      </div>
    </div>
  </div>
</div>
```

---

## Success States

```html
<!-- Success Toast Notification -->
<div
  role="alert"
  class="
    fixed bottom-4 right-4 z-50
    bg-white rounded-lg shadow-lg border-l-4 border-jm-success
    p-4 flex items-start gap-3
    animate-slide-in-right
  "
>
  <svg class="w-5 h-5 text-jm-success flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 20 20">
    <path fill-rule="evenodd" d="M10 18a8 8 100-16 8 8 000 16zm3.707-9.293a1 1 00-1.414-1.414L9 10.586 7.707 9.293a1 1 00-1.414 1.414l2 2a1 1 001.414l4-4z" clip-rule="evenodd"/>
  </svg>
  <div class="flex-1">
    <h4 class="font-sans text-sm font-semibold text-jm-success mb-1">
      Photo Approved
    </h4>
    <p class="font-sans text-sm text-jm-gray-700">
      Photo has been approved and is now live on user's profile.
    </p>
  </div>
  <button class="text-jm-gray-400 hover:text-jm-gray-600">
    <svg class="w-4 h-4" fill="currentColor" viewBox="0 20 20">
      <path fill-rule="evenodd" d="M4.293 4.293a1 1 011.414L10 8.586l4.293-4.293a1 1 111.414 1.414L11.414 10l4.293 4.293a1 1 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 01-1.414-1.414L8.586 10 4.293 5.707a1 1 010-1.414z" clip-rule="evenodd"/>
    </svg>
  </button>
</div>
```

---

## Related Documentation

- [Admin Architecture](../../Admin%20System/admin_architecture.md) - Overall admin system design
- [Admin Roles & Permissions](../../Admin%20System/admin_roles_permissions.md) - Permission matrices
- [Moderation Workflows](../../Admin%20System/moderation_workflows.md) - Detailed moderation procedures
- [HTML Implementation Guide](../../Design%20System/html_implementation_guide.md) - Tailwind patterns
- [Reports Review Spec](reports_review_spec.md) - User reports interface

---

**Document Owner:** Product Lead & Community Lead
**Last Reviewed:** 2026-02-27
**Next Review:** Weekly during implementation
**Implementation Priority:** P0 (Critical - Required for Platform Safety)
