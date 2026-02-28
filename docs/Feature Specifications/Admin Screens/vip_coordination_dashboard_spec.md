# VIP Coordination Dashboard Feature Specification

**Version:** 1.0.0
**Last Updated:** 2026-02-27
**Status:** Complete - Ready for Implementation
**Classification:** Admin Feature Specification

---

## Overview

The VIP Coordination Dashboard is the central hub for managing all VIP operations on the JoyMatcher platform. It provides VIP Coordinators with comprehensive tools to review applications, verify identities, assign experts, monitor performance, track success metrics, and manage conflict-of-interest situations. This interface ensures high-touch, white-glove service for all VIP clients.

**Document Purpose:** This specification provides complete implementation details for the VIP Coordination Dashboard, including layouts, components, workflows, conflict-of-interest management, data requirements, permissions, and HTML/Tailwind examples.

---

## Admin Role Access

### Access Matrix

| Admin Role | Access Level | Permitted Actions |
|------------|--------------|-------------------|
| Super Admin | Full Access | All VIP Coordinator functions + financial oversight + expert hiring |
| VIP Coordinator | VIP Management Only | View applications, verify Tier 5, assign experts, monitor performance |
| Moderator | No Access | Cannot access VIP dashboard |
| VIP Expert | No Access | Cannot access coordinator dashboard (has own expert dashboard) |
| Data Protection Officer | Limited Access | View VIP data for deletion requests only |
| Support Agent | No Access | Cannot access VIP operations |

**Critical:** VIP Coordinators CANNOT access regular Free/Premium users. This dashboard is exclusively for VIP management.

---

## Page Purpose & Admin Goals

### VIP Coordinator Goals

1. **Application Management:** Review and approve/reject VIP applications efficiently
2. **Identity Verification:** Verify Tier 5 identity documents and video KYC
3. **Expert Assignment:** Match VIP clients with best-fit freelance experts
4. **Quality Assurance:** Monitor expert performance and client satisfaction
5. **Conflict Management:** Identify and resolve expert conflicts of interest
6. **Success Tracking:** Monitor VIP engagement, matches, and success stories
7. **Financial Oversight:** Track VIP revenue and expert payment processing

---

## Layout & Wireframe Description

### Page Structure

```
┌─────────────────────────────────────────────────────────────────┐
│ TOP NAVIGATION BAR                                              │
│ Logo | VIP Coordinator Dashboard | Role Badge | Profile | Logout│
├──────────────┬──────────────────────────────────────────────────┤
│              │                                                  │
│   SIDEBAR    │          MAIN CONTENT AREA                      │
│   NAVIGATION │                                                  │
│              │   ┌────────────────────────────────────────┐    │
│   - Dashboard│   │  METRIC CARDS ROW                      │    │
│   - Apps     │   │  [VIP Apps] [Verifs] [VIPs] [Experts] │    │
│   - Verifs   │   └────────────────────────────────────────┘    │
│   - Experts  │                                                  │
│   - Analytics│   ┌────────────────────────────────────────┐    │
│              │   │  PRIORITY QUEUE                        │    │
│   QUICK      │   │  🔴 Critical (3)                       │    │
│   ACTIONS    │   │  🟠 High (7)                           │    │
│              │   │  🟡 Medium (12)                        │    │
│              │   └────────────────────────────────────────┘    │
│              │                                                  │
│              │   ┌────────────────────────────────────────┐    │
│              │   │  RECENT ACTIVITY / EXPERT PERFORMANCE  │    │
│              │   │  (Dynamic content based on tab)        │    │
│              │   └────────────────────────────────────────┘    │
│              │                                                  │
└──────────────┴──────────────────────────────────────────────────┘
```

### Responsive Behavior

- **Desktop (≥1024px):** Sidebar + Main Content (2-column layout)
- **Tablet (768px-1023px):** Collapsible sidebar, full-width main content
- **Mobile (<768px):** Bottom tab navigation, full-width content, hamburger menu

---

## Component Breakdown

### 1. Top Navigation Bar

**Purpose:** Global navigation, role identification, account management

**HTML/Tailwind Example:**

```html
<!-- Top Navigation Bar -->
<header class="bg-white border-b border-jm-gray-200 sticky top-0 z-50 shadow-sm">
  <nav class="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
    <div class="flex items-center justify-between h-16">
      <!-- Left: Logo + Dashboard Title -->
      <div class="flex items-center gap-6">
        <a href="/admin/vip/dashboard" class="flex items-center gap-3">
          <img src="/images/logo.svg" alt="JoyMatcher VIP" class="h-8 w-8" />
          <span class="font-serif text-lg font-bold text-jm-gray-900 hidden md:inline">
            VIP Coordinator
          </span>
        </a>

        <!-- Role Badge -->
        <span class="
          bg-gradient-jm text-white
          px-3 py-1 rounded-full
          text-xs font-semibold
          shadow-sm
        ">
          VIP Coordinator
        </span>
      </div>

      <!-- Right: Notifications + Profile -->
      <div class="flex items-center gap-4">
        <!-- Notifications Bell -->
        <button
          type="button"
          class="
            relative p-2 rounded-full
            text-jm-gray-600 hover:text-jm-purple hover:bg-jm-gray-100
            transition-all duration-200
            focus:outline-none focus:ring-2 focus:ring-jm-purple
          "
          aria-label="Notifications"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0118 14.158V11a6.002 6.002 00-4-5.659V5a2 2 10-4v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6v1a3 3 11-6v-1m6H9"/>
          </svg>
          <!-- Notification Badge -->
          <span class="
            absolute top-0 right-0
            bg-jm-error text-white
            text-xs font-bold
            w-5 h-5 flex items-center justify-center
            rounded-full border-2 border-white
          ">
            5
          </span>
        </button>

        <!-- Profile Dropdown -->
        <div class="relative">
          <button
            type="button"
            class="
              flex items-center gap-2
              focus:outline-none focus:ring-2 focus:ring-jm-purple rounded-full
            "
            aria-label="Account menu"
            aria-expanded="false"
            id="vip-coordinator-profile-button"
          >
            <img
              src="/images/admin/coordinator-avatar.jpg"
              alt="Coordinator profile"
              class="w-9 h-9 rounded-full border-2 border-jm-purple"
            />
            <span class="font-sans text-sm font-medium text-jm-gray-700 hidden md:inline">
              Kemi Adeola
            </span>
            <svg class="w-4 h-4 text-jm-gray-600" fill="currentColor" viewBox="0 20 20">
              <path fill-rule="evenodd" d="M5.293 7.293a1 1 011.414L10 10.586l3.293-3.293a1 1 111.414 1.414l-4 4a1 1 01-1.414l-4-4a1 1 010-1.414z" clip-rule="evenodd"/>
            </svg>
          </button>

          <!-- Dropdown Menu -->
          <div
            id="vip-coordinator-profile-dropdown"
            class="
              hidden absolute right-0 mt-2 w-56
              bg-white rounded-lg shadow-lg border border-jm-gray-200
              py-2 z-50
            "
          >
            <a href="/admin/vip/account/settings" class="block px-4 py-2 text-sm text-jm-gray-700 hover:bg-jm-gray-50 transition-colors">
              Account Settings
            </a>
            <a href="/admin/vip/account/security" class="block px-4 py-2 text-sm text-jm-gray-700 hover:bg-jm-gray-50 transition-colors">
              Security & 2FA
            </a>
            <div class="border-t border-jm-gray-200 my-2"></div>
            <a href="/admin/logout" class="block px-4 py-2 text-sm text-jm-error hover:bg-jm-error/5 transition-colors">
              Log Out
            </a>
          </div>
        </div>
      </div>
    </div>
  </nav>
</header>
```

---

### 2. Sidebar Navigation

**Purpose:** Primary navigation to VIP coordination functions

**Navigation Items:**

- Dashboard (active state)
- VIP Applications
- Tier 5 Verifications
- Expert Management
- VIP Analytics
- Success Stories
- Settings

**HTML/Tailwind Example:**

```html
<!-- Sidebar Navigation -->
<aside class="
  w-64 bg-white border-r border-jm-gray-200
  h-screen sticky top-16 overflow-y-auto
  hidden lg:block
">
  <nav class="p-4 space-y-2" aria-label="VIP Coordinator navigation">
    <!-- Dashboard (Active) -->
    <a
      href="/admin/vip/dashboard"
      class="
        flex items-center gap-3 px-4 py-3 rounded-lg
        bg-jm-purple/10 text-jm-purple font-medium
        border-l-4 border-jm-purple
        transition-all duration-200
      "
      aria-current="page"
    >
      <svg class="w-5 h-5" fill="currentColor" viewBox="0 20 20">
        <path d="M10.707 2.293a1 1 00-1.414l-7 7a1 1 001.414 1.414L4 10.414V17a1 1 001 1h2a1 1 001-1v-2a1 1 011-1h2a1 1 011 1v2a1 1 001 1h2a1 1 001-1v-6.586l.293.293a1 1 001.414-1.414l-7-7z"/>
      </svg>
      Dashboard
    </a>

    <!-- VIP Applications -->
    <a
      href="/admin/vip/applications"
      class="
        flex items-center gap-3 px-4 py-3 rounded-lg
        text-jm-gray-700 hover:bg-jm-gray-50 hover:text-jm-purple
        transition-all duration-200
        relative
      "
    >
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 01-2-2V5a2 2 012-2h5.586a1 1 01.707.293l5.414 5.414a1 1 01.293.707V19a2 2 01-2 2z"/>
      </svg>
      VIP Applications
      <!-- Pending Badge -->
      <span class="
        ml-auto bg-jm-warning text-white
        text-xs font-bold px-2 py-1 rounded-full
      ">
        3
      </span>
    </a>

    <!-- Tier 5 Verifications -->
    <a
      href="/admin/vip/verifications"
      class="
        flex items-center gap-3 px-4 py-3 rounded-lg
        text-jm-gray-700 hover:bg-jm-gray-50 hover:text-jm-purple
        transition-all duration-200
      "
    >
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0112 2.944a11.955 11.955 01-8.618 3.04A12.02 12.02 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622-1.042-.133-2.052-.382-3.016z"/>
      </svg>
      Tier 5 Verifications
      <span class="ml-auto bg-jm-error text-white text-xs font-bold px-2 py-1 rounded-full">
        5
      </span>
    </a>

    <!-- Expert Management -->
    <a
      href="/admin/vip/experts"
      class="
        flex items-center gap-3 px-4 py-3 rounded-lg
        text-jm-gray-700 hover:bg-jm-gray-50 hover:text-jm-purple
        transition-all duration-200
      "
    >
      <svg class="w-5 h-5" fill="currentColor" viewBox="0 20 20">
        <path d="M9 6a3 3 11-6 3 3 016zM17 6a3 3 11-6 3 3 016zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 00-1.5-4.33A5 5 0119 16v1h-6.07zM6 11a5 5 015 5v1H1v-1a5 5 015-5z"/>
      </svg>
      Expert Management
    </a>

    <!-- VIP Analytics -->
    <a
      href="/admin/vip/analytics"
      class="
        flex items-center gap-3 px-4 py-3 rounded-lg
        text-jm-gray-700 hover:bg-jm-gray-50 hover:text-jm-purple
        transition-all duration-200
      "
    >
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 00-2-2H5a2 2 00-2 2v6a2 2 002 2h2a2 2 002-2zm0V9a2 2 012-2h2a2 2 012 2v10m-6a2 2 002 2h2a2 2 002-2m0V5a2 2 012-2h2a2 2 012 2v14a2 2 01-2 2h-2a2 2 01-2-2z"/>
      </svg>
      VIP Analytics
    </a>

    <!-- Divider -->
    <div class="border-t border-jm-gray-200 my-4"></div>

    <!-- Quick Actions Section -->
    <div class="px-4 py-2">
      <h3 class="font-sans text-xs font-semibold text-jm-gray-500 uppercase tracking-wide mb-3">
        Quick Actions
      </h3>
      <button class="
        w-full bg-gradient-jm hover:bg-gradient-jm-hover
        text-white font-sans font-semibold text-sm
        px-4 py-2 rounded-lg
        transition-all duration-200
        shadow-sm hover:shadow-md
        focus:outline-none focus:ring-2 focus:ring-jm-coral focus:ring-offset-2
      ">
        Add New Expert
      </button>
    </div>
  </nav>
</aside>
```

---

### 3. Metric Cards Row

**Purpose:** Display key VIP coordination metrics at a glance

**VIP Coordinator Metrics:**
- VIP Applications Pending
- VIP Members Active
- Tier 5 Verifications Pending
- Successful Matches This Month

**HTML/Tailwind Example:**

```html
<!-- Metric Cards Row -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
  <!-- Metric Card 1: VIP Applications Pending -->
  <div class="
    bg-white rounded-xl shadow-sm border border-jm-gray-200
    p-6 space-y-3
    hover:shadow-md transition-shadow duration-200
  ">
    <div class="flex items-center justify-between">
      <h3 class="font-sans text-sm font-medium text-jm-gray-600">
        VIP Applications
      </h3>
      <div class="bg-jm-warning/10 p-2 rounded-lg">
        <svg class="w-5 h-5 text-jm-warning" fill="none" stroke="currentColor" viewBox="0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 01-2-2V5a2 2 012-2h5.586a1 1 01.707.293l5.414 5.414a1 1 01.293.707V19a2 2 01-2 2z"/>
        </svg>
      </div>
    </div>
    <div class="space-y-1">
      <p class="font-serif text-3xl font-bold text-jm-gray-900">
        3
      </p>
      <p class="font-sans text-xs text-jm-gray-500">
        Pending review
      </p>
    </div>
  </div>

  <!-- Metric Card 2: VIP Members Active -->
  <div class="
    bg-white rounded-xl shadow-sm border border-jm-gray-200
    p-6 space-y-3
    hover:shadow-md transition-shadow duration-200
  ">
    <div class="flex items-center justify-between">
      <h3 class="font-sans text-sm font-medium text-jm-gray-600">
        Active VIP Members
      </h3>
      <div class="bg-gradient-jm p-2 rounded-lg">
        <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902l1.07 3.292a1 1 00.95.69h3.462c.969 1.371 1.24.588 1.81l-2.8 2.034a1 1 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 00-1.175l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 00.951-.69l1.07-3.292z"/>
        </svg>
      </div>
    </div>
    <div class="space-y-1">
      <p class="font-serif text-3xl font-bold text-jm-gray-900">
        47
      </p>
      <p class="font-sans text-xs text-jm-success flex items-center gap-1">
        <svg class="w-3 h-3" fill="currentColor" viewBox="0 20 20">
          <path fill-rule="evenodd" d="M12 7a1 1 110-2h5a1 1 011 1v5a1 1 11-2V8.414l-4.293 4.293a1 1 01-1.414L8 10.414l-4.293 4.293a1 1 01-1.414-1.414l5-5a1 1 011.414L11 10.586 14.586 7H12z" clip-rule="evenodd"/>
        </svg>
        +6 this month
      </p>
    </div>
  </div>

  <!-- Metric Card 3: Tier 5 Verifications Pending -->
  <div class="
    bg-white rounded-xl shadow-sm border border-jm-gray-200
    p-6 space-y-3
    hover:shadow-md transition-shadow duration-200
  ">
    <div class="flex items-center justify-between">
      <h3 class="font-sans text-sm font-medium text-jm-gray-600">
        Tier 5 Pending
      </h3>
      <div class="bg-jm-error/10 p-2 rounded-lg">
        <svg class="w-5 h-5 text-jm-error" fill="none" stroke="currentColor" viewBox="0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0112 2.944a11.955 11.955 01-8.618 3.04A12.02 12.02 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622-1.042-.133-2.052-.382-3.016z"/>
        </svg>
      </div>
    </div>
    <div class="space-y-1">
      <p class="font-serif text-3xl font-bold text-jm-gray-900">
        5
      </p>
      <p class="font-sans text-xs text-jm-warning">
        3 pending >48 hours
      </p>
    </div>
  </div>

  <!-- Metric Card 4: Successful Matches -->
  <div class="
    bg-white rounded-xl shadow-sm border border-jm-gray-200
    p-6 space-y-3
    hover:shadow-md transition-shadow duration-200
  ">
    <div class="flex items-center justify-between">
      <h3 class="font-sans text-sm font-medium text-jm-gray-600">
        Matches (This Month)
      </h3>
      <div class="bg-jm-success/10 p-2 rounded-lg">
        <svg class="w-5 h-5 text-jm-success" fill="currentColor" viewBox="0 20 20">
          <path fill-rule="evenodd" d="M3.172 5.172a4 4 015.656L10 6.343l1.172-1.171a4 4 115.656 5.656L10 17.657l-6.828-6.829a4 4 010-5.656z" clip-rule="evenodd"/>
        </svg>
      </div>
    </div>
    <div class="space-y-1">
      <p class="font-serif text-3xl font-bold text-jm-gray-900">
        12
      </p>
      <p class="font-sans text-xs text-jm-gray-500">
        2 engagements
      </p>
    </div>
  </div>
</div>
```

---

### 4. Priority Queue Section

**Purpose:** Display urgent VIP coordination tasks requiring immediate attention

**Priority Items:**
- VIP applications pending >3 days (HIGH)
- Tier 5 verifications pending >48 hours (CRITICAL)
- Expert reassignment requests (MEDIUM)
- VIP client complaints (HIGH)
- Conflict-of-interest alerts (CRITICAL)

**HTML/Tailwind Example:**

```html
<!-- Priority Queue Section -->
<div class="bg-white rounded-xl shadow-sm border border-jm-gray-200 p-6 mb-8">
  <div class="flex items-center justify-between mb-6">
    <h2 class="font-serif text-xl font-bold text-jm-gray-900">
      Priority Queue
    </h2>
    <span class="font-sans text-sm text-jm-gray-600">
      10 items requiring attention
    </span>
  </div>

  <!-- Priority Tabs -->
  <div class="flex items-center gap-4 mb-6 border-b border-jm-gray-200">
    <button class="
      font-sans text-sm font-semibold
      text-jm-purple border-b-2 border-jm-purple
      px-4 py-2 -mb-px
      transition-colors duration-200
    ">
      All (10)
    </button>
    <button class="
      font-sans text-sm font-medium
      text-jm-gray-600 hover:text-jm-purple
      px-4 py-2
      transition-colors duration-200
    ">
      Critical (2)
    </button>
    <button class="
      font-sans text-sm font-medium
      text-jm-gray-600 hover:text-jm-purple
      px-4 py-2
      transition-colors duration-200
    ">
      High (5)
    </button>
    <button class="
      font-sans text-sm font-medium
      text-jm-gray-600 hover:text-jm-purple
      px-4 py-2
      transition-colors duration-200
    ">
      Medium (3)
    </button>
  </div>

  <!-- Priority Items List -->
  <div class="space-y-4">
    <!-- Critical: Conflict of Interest Alert -->
    <div class="
      flex items-start gap-4 p-4 rounded-lg
      border-l-4 border-jm-error bg-jm-error/5
      hover:bg-jm-error/10 transition-colors duration-200
      cursor-pointer
    ">
      <div class="flex-shrink-0">
        <span class="
          inline-flex items-center justify-center
          w-8 h-8 rounded-full
          bg-jm-error text-white
          text-xs font-bold
        ">
          !
        </span>
      </div>
      <div class="flex-1 min-w-0">
        <div class="flex items-center gap-2 mb-1">
          <span class="
            inline-flex items-center gap-1
            bg-jm-error/10 text-jm-error
            px-2 py-1 rounded-md
            text-xs font-semibold
          ">
            CRITICAL
          </span>
          <span class="font-sans text-xs text-jm-gray-500">
            1 hour ago
          </span>
        </div>
        <h3 class="font-sans text-sm font-semibold text-jm-gray-900 mb-1">
          Conflict of Interest Detected - Expert Chiamaka
        </h3>
        <p class="font-sans text-sm text-jm-gray-600 mb-2">
          Expert Chiamaka (exp_003) is assigned to both Chidinma O. and Emmanuel A.,
          who have been matched. Requires immediate reassignment to resolve conflict.
        </p>
        <div class="flex items-center gap-2">
          <button class="
            bg-jm-error hover:bg-jm-error/90
            text-white font-sans font-medium text-xs
            px-3 py-1.5 rounded-md
            transition-all duration-200
            focus:outline-none focus:ring-2 focus:ring-jm-error focus:ring-offset-2
          ">
            Resolve Conflict
          </button>
          <button class="
            text-jm-gray-600 hover:text-jm-gray-900
            font-sans font-medium text-xs
            px-3 py-1.5
            transition-colors duration-200
          ">
            View Details
          </button>
        </div>
      </div>
    </div>

    <!-- High: Tier 5 Verification Overdue -->
    <div class="
      flex items-start gap-4 p-4 rounded-lg
      border-l-4 border-jm-warning bg-jm-warning/5
      hover:bg-jm-warning/10 transition-colors duration-200
      cursor-pointer
    ">
      <div class="flex-shrink-0">
        <span class="
          inline-flex items-center justify-center
          w-8 h-8 rounded-full
          bg-jm-warning text-white
          text-xs font-bold
        ">
          !
        </span>
      </div>
      <div class="flex-1 min-w-0">
        <div class="flex items-center gap-2 mb-1">
          <span class="
            inline-flex items-center gap-1
            bg-jm-warning/10 text-jm-warning
            px-2 py-1 rounded-md
            text-xs font-semibold
          ">
            HIGH
          </span>
          <span class="font-sans text-xs text-jm-gray-500">
            3 days ago
          </span>
        </div>
        <h3 class="font-sans text-sm font-semibold text-jm-gray-900 mb-1">
          Tier 5 Verification Pending - Ngozi M. (3 Days)
        </h3>
        <p class="font-sans text-sm text-jm-gray-600 mb-2">
          Ngozi M. (ID: 11223) submitted Tier 5 verification 3 days ago. Target: <48 hours.
          Review identity documents and video KYC.
        </p>
        <div class="flex items-center gap-2">
          <button class="
            bg-jm-warning hover:bg-jm-warning/90
            text-white font-sans font-medium text-xs
            px-3 py-1.5 rounded-md
            transition-all duration-200
            focus:outline-none focus:ring-2 focus:ring-jm-warning focus:ring-offset-2
          ">
            Review Verification
          </button>
        </div>
      </div>
    </div>

    <!-- Medium: VIP Application Pending -->
    <div class="
      flex items-start gap-4 p-4 rounded-lg
      border-l-4 border-jm-info bg-jm-info/5
      hover:bg-jm-info/10 transition-colors duration-200
      cursor-pointer
    ">
      <div class="flex-shrink-0">
        <span class="
          inline-flex items-center justify-center
          w-8 h-8 rounded-full
          bg-jm-info text-white
          text-xs font-bold
        ">
          i
        </span>
      </div>
      <div class="flex-1 min-w-0">
        <div class="flex items-center gap-2 mb-1">
          <span class="
            inline-flex items-center gap-1
            bg-jm-info/10 text-jm-info
            px-2 py-1 rounded-md
            text-xs font-semibold
          ">
            MEDIUM
          </span>
          <span class="font-sans text-xs text-jm-gray-500">
            2 days ago
          </span>
        </div>
        <h3 class="font-sans text-sm font-semibold text-jm-gray-900 mb-1">
          VIP Application - Tunde K. (2 Days Old)
        </h3>
        <p class="font-sans text-sm text-jm-gray-600 mb-2">
          Tunde K. submitted VIP application 2 days ago. Review 18-question application
          and approve/reject within 3-day target window.
        </p>
        <div class="flex items-center gap-2">
          <button class="
            bg-jm-info hover:bg-jm-info/90
            text-white font-sans font-medium text-xs
            px-3 py-1.5 rounded-md
            transition-all duration-200
            focus:outline-none focus:ring-2 focus:ring-jm-info focus:ring-offset-2
          ">
            Review Application
          </button>
        </div>
      </div>
    </div>
  </div>

  <!-- View All Link -->
  <div class="mt-6 pt-4 border-t border-jm-gray-200 text-center">
    <a
      href="/admin/vip/priority-queue"
      class="
        font-sans text-sm font-medium text-jm-purple hover:text-jm-purple-dark
        inline-flex items-center gap-1
        transition-colors duration-200
      "
    >
      View All Priority Items
      <svg class="w-4 h-4" fill="currentColor" viewBox="0 20 20">
        <path fill-rule="evenodd" d="M10.293 5.293a1 1 011.414l4 4a1 1 010 1.414l-4 4a1 1 01-1.414-1.414L12.586 11H5a1 1 110-2h7.586l-2.293-2.293a1 1 010-1.414z" clip-rule="evenodd"/>
      </svg>
    </a>
  </div>
</div>
```

---

## Conflict-of-Interest Management

### Overview

A critical feature of the VIP Coordination Dashboard is detecting and resolving conflicts of interest when a VIP Expert is assigned to two clients who are matched with each other.

### Conflict Detection Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                  CONFLICT DETECTION FLOW                        │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  1. Expert creates introduction proposal between Client A       │
│     and Client B                                                │
│     │                                                           │
│     ├─> System checks: Are both clients assigned to same       │
│     │   expert?                                                 │
│     │                                                           │
│     └─> YES → CONFLICT DETECTED                                │
│         │                                                       │
│         ├─> Block introduction proposal submission              │
│         ├─> Alert VIP Coordinator (Priority Queue)             │
│         ├─> Notify expert of conflict                          │
│         └─> Trigger reassignment workflow                       │
│                                                                 │
│  2. VIP Coordinator receives conflict alert                    │
│     │                                                           │
│     ├─> Review both client assignments                         │
│     ├─> Decide which client to reassign (typically more        │
│     │   recent assignment)                                      │
│     └─> Select new expert for reassignment                     │
│                                                                 │
│  3. Reassignment Process                                       │
│     │                                                           │
│     ├─> Expert A hands over Client B to Expert B               │
│     ├─> Expert A provides handover notes                       │
│     ├─> Expert B reviews handover and accepts assignment       │
│     ├─> System notifies Client B of expert change              │
│     └─> Conflict resolved                                      │
│                                                                 │
│  4. Introduction Proceeds                                      │
│     │                                                           │
│     ├─> Expert A manages Client A                              │
│     ├─> Expert B manages Client B                              │
│     ├─> Both experts collaborate on introduction logistics     │
│     └─> Introduction facilitated without conflict              │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### Conflict Alert Modal

**HTML/Tailwind Example:**

```html
<!-- Conflict of Interest Alert Modal -->
<div
  id="conflict-alert-modal"
  class="
    fixed inset-0 bg-jm-gray-900/50 backdrop-blur-sm z-50
    flex items-center justify-center p-4
  "
  role="dialog"
  aria-modal="true"
  aria-labelledby="conflict-alert-title"
>
  <div class="
    bg-white rounded-2xl shadow-2xl
    w-full max-w-2xl
    max-h-[90vh] overflow-y-auto
  ">
    <!-- Alert Header -->
    <div class="bg-jm-error/10 border-b-4 border-jm-error p-6">
      <div class="flex items-start gap-4">
        <div class="flex-shrink-0">
          <div class="bg-jm-error p-3 rounded-full">
            <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 20 20">
              <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 11-2 1 1 012zm-1-8a1 1 00-1 1v3a1 1 002V6a1 1 00-1-1z" clip-rule="evenodd"/>
            </svg>
          </div>
        </div>
        <div class="flex-1">
          <h2 id="conflict-alert-title" class="font-serif text-2xl font-bold text-jm-error mb-2">
            Conflict of Interest Detected
          </h2>
          <p class="font-sans text-sm text-jm-gray-700">
            Expert Chiamaka Nwosu is assigned to both clients in this proposed introduction.
            Immediate reassignment required.
          </p>
        </div>
      </div>
    </div>

    <!-- Conflict Details -->
    <div class="p-6 space-y-6">
      <!-- Expert Info -->
      <div class="bg-jm-gray-50 rounded-lg p-4">
        <h3 class="font-sans text-sm font-semibold text-jm-gray-700 mb-3">
          Expert Assignment
        </h3>
        <div class="flex items-center gap-3">
          <img
            src="/images/experts/chiamaka.jpg"
            alt="Chiamaka Nwosu"
            class="w-12 h-12 rounded-full border-2 border-jm-purple"
          />
          <div>
            <p class="font-sans text-base font-semibold text-jm-gray-900">
              Chiamaka Nwosu
            </p>
            <p class="font-sans text-sm text-jm-gray-600">
              Expert ID: exp_003 | 4.9★ Rating
            </p>
          </div>
        </div>
      </div>

      <!-- Conflicting Clients -->
      <div class="space-y-4">
        <h3 class="font-sans text-sm font-semibold text-jm-gray-700">
          Conflicting Client Assignments
        </h3>

        <!-- Client A -->
        <div class="border border-jm-gray-200 rounded-lg p-4">
          <div class="flex items-center justify-between mb-2">
            <div class="flex items-center gap-3">
              <img
                src="/images/vip/chidinma.jpg"
                alt="Chidinma O."
                class="w-10 h-10 rounded-full border border-jm-gray-200"
              />
              <div>
                <p class="font-sans text-sm font-semibold text-jm-gray-900">
                  Chidinma O. (ID: 78901)
                </p>
                <p class="font-sans text-xs text-jm-gray-600">
                  31, Female, Lagos
                </p>
              </div>
            </div>
            <span class="inline-flex items-center gap-1 bg-jm-success/10 text-jm-success px-2 py-1 rounded-md text-xs font-semibold">
              Keep with Chiamaka
            </span>
          </div>
          <p class="font-sans text-xs text-jm-gray-600">
            Assigned: Feb 10, 2026 (15 days ago)
          </p>
        </div>

        <!-- Client B (to be reassigned) -->
        <div class="border-2 border-jm-warning rounded-lg p-4 bg-jm-warning/5">
          <div class="flex items-center justify-between mb-2">
            <div class="flex items-center gap-3">
              <img
                src="/images/vip/emmanuel.jpg"
                alt="Emmanuel A."
                class="w-10 h-10 rounded-full border border-jm-gray-200"
              />
              <div>
                <p class="font-sans text-sm font-semibold text-jm-gray-900">
                  Emmanuel A. (ID: 78902)
                </p>
                <p class="font-sans text-xs text-jm-gray-600">
                  34, Male, Lagos
                </p>
              </div>
            </div>
            <span class="inline-flex items-center gap-1 bg-jm-warning/10 text-jm-warning px-2 py-1 rounded-md text-xs font-semibold">
              Reassign to new expert
            </span>
          </div>
          <p class="font-sans text-xs text-jm-gray-600">
            Assigned: Feb 22, 2026 (3 days ago - most recent)
          </p>
        </div>
      </div>

      <!-- Select New Expert -->
      <div>
        <label class="block font-sans text-sm font-medium text-jm-gray-700 mb-2">
          Select New Expert for Emmanuel A.
        </label>
        <select
          class="
            w-full px-4 py-3 rounded-lg
            border-2 border-jm-gray-300 focus:border-jm-purple focus:ring-2 focus:ring-jm-purple/20
            font-sans text-base text-jm-gray-900
            focus:outline-none
            cursor-pointer
          "
        >
          <option value="">Choose expert...</option>
          <option value="exp_001">Kemi Adeola (4.8★ | 4/6 clients)</option>
          <option value="exp_004" selected>Tolu Bakare (4.6★ | 3/6 clients)</option>
          <option value="exp_005">Bola Ojo (4.7★ | 5/6 clients)</option>
        </select>
        <p class="font-sans text-xs text-jm-gray-500 mt-2">
          Recommended: Tolu Bakare (capacity available, good performance)
        </p>
      </div>

      <!-- Coordinator Notes -->
      <div>
        <label class="block font-sans text-sm font-medium text-jm-gray-700 mb-2">
          Coordinator Notes (visible to new expert)
        </label>
        <textarea
          rows="4"
          placeholder="Add any context for the new expert (e.g., client preferences, why reassignment occurred)..."
          class="
            w-full px-4 py-3 rounded-lg
            border-2 border-jm-gray-300 focus:border-jm-purple focus:ring-2 focus:ring-jm-purple/20
            font-sans text-base text-jm-gray-900 placeholder:text-jm-gray-400
            focus:outline-none
            resize-vertical
          "
        ></textarea>
      </div>
    </div>

    <!-- Modal Footer -->
    <div class="p-6 border-t border-jm-gray-200 flex gap-3">
      <button
        type="button"
        class="
          flex-1 border-2 border-jm-gray-300 hover:border-jm-gray-400
          text-jm-gray-700 hover:text-jm-gray-900
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
        Resolve Conflict & Reassign
      </button>
    </div>
  </div>
</div>
```

---

## Permissions & Authorization Checks

### Backend Authorization Middleware

```javascript
// VIP Coordinator permission check
function requireVIPCoordinator(req, res, next) {
  const admin = req.admin; // From auth token

  // Super Admin and VIP Coordinator have access
  if (admin.role === 'superAdmin' || admin.role === 'vipCoordinator') {
    return next();
  }

  await logSecurityEvent({
    event: 'unauthorized_vip_access_attempt',
    adminId: admin.id,
    attemptedRoute: req.path,
    ipAddress: req.ip
  });

  return res.status(403).json({
    error: 'Access Denied',
    message: `Your role (${admin.role}) cannot access VIP coordination functions`
  });
}

// Route protection example
app.get('/admin/vip/dashboard',
  authenticateAdmin,
  requireVIPCoordinator,
  async (req, res) => {
    const dashboardData = await getVIPDashboardData();
    res.render('admin/vip/dashboard', { data: dashboardData });
  }
);

// Conflict-of-interest detection
app.post('/admin/vip/introduction/create',
  authenticateAdmin,
  requireVIPCoordinator,
  async (req, res) => {
    const { expertId, clientAId, clientBId } = req.body;

    // Check for conflict of interest
    const expertAssignments = await VIPAssignment.find({
      expertId: expertId,
      status: 'active'
    });

    const assignedClientIds = expertAssignments.map(a => a.vipUserId);

    // If expert is assigned to both clients, conflict exists
    if (assignedClientIds.includes(clientAId) && assignedClientIds.includes(clientBId)) {
      await logConflictAlert({
        expertId: expertId,
        clientAId: clientAId,
        clientBId: clientBId,
        detectedBy: req.admin.id,
        timestamp: new Date()
      });

      return res.status(409).json({
        error: 'Conflict of Interest',
        message: 'Expert is assigned to both clients. Reassignment required.',
        conflictDetails: {
          expertId,
          clients: [clientAId, clientBId]
        }
      });
    }

    // No conflict, proceed with introduction
    const introduction = await createIntroduction(req.body);
    res.json({ success: true, introduction });
  }
);
```

---

## State Management Requirements

### Dashboard State Object

```javascript
const vipCoordinatorState = {
  // Dashboard metrics
  metrics: {
    pendingApplications: 3,
    activeVIPMembers: 47,
    pendingVerifications: 5,
    successfulMatchesThisMonth: 12,
    engagementsThisMonth: 2
  },

  // Priority queue
  priorityQueue: [
    {
      id: 'priority_001',
      type: 'conflict_of_interest',
      severity: 'critical',
      expertId: 'exp_003',
      clientAId: 'user_78901',
      clientBId: 'user_78902',
      timestamp: '2026-02-27T09:30:00Z',
      status: 'pending'
    },
    {
      id: 'priority_002',
      type: 'verification_overdue',
      severity: 'high',
      userId: 'user_11223',
      daysOverdue: 3,
      timestamp: '2026-02-24T14:00:00Z',
      status: 'pending'
    }
  ],

  // Expert performance summary
  experts: [
    {
      expertId: 'exp_003',
      name: 'Chiamaka Nwosu',
      activeClients: 5,
      capacity: 6,
      performanceRating: 4.9,
      successRate: 0.74,
      conflictsDetected: 1
    }
  ],

  // Recent activity
  recentActivity: [
    {
      type: 'vip_application_approved',
      userId: 'user_55443',
      timestamp: '2026-02-27T08:00:00Z',
      coordinatorId: 'admin_003'
    }
  ]
};
```

---

## Audit Logging Requirements

**ALL VIP coordination actions must be logged.**

### Log Structure

```javascript
const VIPCoordinationAuditLog = {
  timestamp: Date,
  coordinatorId: ObjectId,
  action: String, // 'approve_vip_application', 'verify_tier5', 'assign_expert', 'resolve_conflict'
  targetId: ObjectId,
  targetType: String, // 'vipApplication', 'vipUser', 'vipExpert', 'conflict'
  ipAddress: String,
  userAgent: String,
  details: Object,
  result: String // 'success', 'denied', 'error'
};
```

### Example Log Entries

```javascript
// Conflict resolution
{
  timestamp: "2026-02-27T10:30:00Z",
  coordinatorId: "admin_003",
  action: "resolve_conflict_of_interest",
  targetId: "conflict_001",
  targetType: "conflict",
  ipAddress: "10.0.0.25",
  userAgent: "Mozilla/5.0...",
  details: {
    expertId: "exp_003",
    clientAId: "user_78901",
    clientBId: "user_78902",
    reassignedClientId: "user_78902",
    newExpertId: "exp_004",
    coordinatorNotes: "Emmanuel reassigned to Tolu for conflict resolution"
  },
  result: "success"
}

// VIP application approval
{
  timestamp: "2026-02-27T11:00:00Z",
  coordinatorId: "admin_003",
  action: "approve_vip_application",
  targetId: "vipApp_12345",
  targetType: "vipApplication",
  ipAddress: "10.0.0.25",
  userAgent: "Mozilla/5.0...",
  details: {
    applicantUserId: "user_55443",
    applicationScore: 4.8,
    approvalNotes: "Excellent application, clear marriage focus"
  },
  result: "success"
}
```

---

## Accessibility Requirements

**WCAG 2.1 AA Compliance:**

1. **Keyboard Navigation:** All interactive elements accessible via Tab key
2. **Screen Reader Support:** ARIA labels on conflict alerts, priority items
3. **Color Contrast:** Minimum 4.5:1 for normal text
4. **Focus Indicators:** Visible focus rings on all focusable elements
5. **Semantic HTML:** Proper heading hierarchy, table structure

---

## Error Handling

### Frontend Error Handling

```javascript
// Conflict resolution error
async function resolveConflict(conflictId, reassignmentData) {
  try {
    const response = await fetch(`/admin/vip/conflicts/${conflictId}/resolve`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${sessionToken}`
      },
      body: JSON.stringify(reassignmentData)
    });

    if (response.status === 409) {
      showErrorNotification(
        'Conflict Still Exists',
        'Selected expert also has a conflict. Choose different expert.'
      );
      return;
    }

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const result = await response.json();
    showSuccessNotification(
      'Conflict Resolved',
      'Client successfully reassigned. Experts notified.'
    );
    refreshPriorityQueue();
  } catch (error) {
    console.error('Conflict resolution failed:', error);
    showErrorNotification('Error', 'Unable to resolve conflict. Please try again.');
  }
}
```

---

## Related Documentation

- [Admin Architecture](../../Admin%20System/admin_architecture.md) - Overall admin system design
- [Admin Roles & Permissions](../../Admin%20System/admin_roles_permissions.md) - Permission matrices
- [VIP Coordination](../../Admin%20System/vip_coordination.md) - VIP management procedures
- [HTML Implementation Guide](../../Design%20System/html_implementation_guide.md) - Tailwind patterns
- [VIP Expert Dashboard Spec](vip_expert_dashboard_spec.md) - Expert-side dashboard

---

**Document Owner:** Product Lead & VIP Services Lead
**Last Reviewed:** 2026-02-27
**Next Review:** Weekly during implementation
**Implementation Priority:** P0 (Critical - Required for VIP MVP)
