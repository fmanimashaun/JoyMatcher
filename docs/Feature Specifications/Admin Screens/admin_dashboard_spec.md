# Admin Dashboard Feature Specification

**Version:** 1.0.0
**Last Updated:** 2026-02-27
**Status:** Complete - Ready for Implementation
**Classification:** Admin Feature Specification

---

## Overview

The Admin Dashboard is the central hub for all administrative operations on the JoyMatcher platform. It provides role-specific views and metrics tailored to each admin role (Super Admin, Moderator, VIP Coordinator, VIP Expert), enabling efficient platform management, content moderation, VIP coordination, and system oversight.

**Document Purpose:** This specification provides complete implementation details for the Admin Dashboard, including layouts, components, data requirements, permissions, and HTML/Tailwind examples.

---

## Admin Role Access

### Access Matrix

| Admin Role | Access Level | Dashboard View |
|------------|--------------|----------------|
| Super Admin | Full Access | Platform-wide metrics, all admin functions |
| Moderator | Moderation Only | Reports queue, photo moderation, profile reviews |
| VIP Coordinator | VIP Management | VIP applications, verifications, expert assignments |
| VIP Expert | Assigned Clients Only | Client list, search matches, consultation notes |
| Data Protection Officer | Data Management | Deletion requests, audit logs, compliance metrics |
| Support Agent | Support Only | Ticket queue, FAQs, basic user info |

**Authentication Required:** All admin dashboard access requires authentication via `/admin/login` with role-based redirect to appropriate dashboard.

---

## Page Purpose & Admin Goals

### Super Admin Dashboard Goals
- **Oversight:** Monitor platform health (users, engagement, revenue)
- **Decision-Making:** Identify trends, flag issues, allocate resources
- **Escalation Management:** Review escalated cases from Moderators/VIP Coordinators
- **Admin Management:** Monitor admin performance, create/edit admin accounts

### Moderator Dashboard Goals
- **Content Safety:** Quickly review and resolve reports, photos, profiles
- **Efficiency:** Process moderation queue with minimal clicks
- **Escalation:** Identify cases requiring Super Admin intervention

### VIP Coordinator Dashboard Goals
- **VIP Pipeline:** Manage VIP applications, verifications, assignments
- **Expert Oversight:** Monitor freelance expert performance
- **Quality Control:** Ensure high-touch service standards

### VIP Expert Dashboard Goals
- **Client Focus:** Access assigned VIP clients' full profiles
- **Match Discovery:** Search platform-wide Tier 1-2 data for potential matches
- **Consent Management:** Request Tier 3-5 access from potential matches
- **Performance Tracking:** View own success rate, earnings, client satisfaction

---

## Layout & Wireframe Description

### Common Layout Structure (All Dashboards)

```
┌─────────────────────────────────────────────────────────────────┐
│ TOP NAVIGATION BAR                                              │
│ Logo | Dashboard Name | Role Badge | Profile Menu | Logout     │
├──────────────┬──────────────────────────────────────────────────┤
│              │                                                  │
│   SIDEBAR    │          MAIN CONTENT AREA                      │
│   NAVIGATION │                                                  │
│              │   ┌────────────────────────────────────────┐    │
│   - Dashboard│   │  METRIC CARDS ROW                      │    │
│   - Reports  │   │  [Card 1] [Card 2] [Card 3] [Card 4]  │    │
│   - Users    │   └────────────────────────────────────────┘    │
│   - Settings │                                                  │
│              │   ┌────────────────────────────────────────┐    │
│   QUICK      │   │  PRIORITY QUEUE / ACTION ITEMS         │    │
│   ACTIONS    │   │  🔴 Critical (3)                       │    │
│              │   │  🟠 High (12)                          │    │
│              │   │  🟡 Medium (25)                        │    │
│              │   └────────────────────────────────────────┘    │
│              │                                                  │
│              │   ┌────────────────────────────────────────┐    │
│              │   │  DATA TABLE / CHART                    │    │
│              │   │  (Role-specific content)               │    │
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

**Components:**
- Logo (links to dashboard home)
- Dashboard title (e.g., "Super Admin Dashboard")
- Role badge (e.g., "Super Admin" with purple gradient background)
- Notifications bell icon (with unread count)
- Profile dropdown menu
- Logout button

**HTML/Tailwind Example:**

```html
<!-- Top Navigation Bar -->
<header class="bg-white border-b border-jm-gray-200 sticky top-0 z-50 shadow-sm">
  <nav class="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
    <div class="flex items-center justify-between h-16">
      <!-- Left: Logo + Dashboard Title -->
      <div class="flex items-center gap-6">
        <a href="/admin/dashboard" class="flex items-center gap-3">
          <img src="/images/logo.svg" alt="JoyMatcher Admin" class="h-8 w-8" />
          <span class="font-serif text-lg font-bold text-jm-gray-900 hidden md:inline">
            Admin Portal
          </span>
        </a>

        <!-- Role Badge -->
        <span class="
          bg-gradient-jm text-white
          px-3 py-1 rounded-full
          text-xs font-semibold
          shadow-sm
        ">
          Super Admin
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
            id="admin-profile-button"
          >
            <img
              src="/images/admin/admin-avatar.jpg"
              alt="Admin profile"
              class="w-9 h-9 rounded-full border-2 border-jm-purple"
            />
            <span class="font-sans text-sm font-medium text-jm-gray-700 hidden md:inline">
              John Doe
            </span>
            <svg class="w-4 h-4 text-jm-gray-600" fill="currentColor" viewBox="0 20 20">
              <path fill-rule="evenodd" d="M5.293 7.293a1 1 011.414L10 10.586l3.293-3.293a1 1 111.414 1.414l-4 4a1 1 01-1.414l-4-4a1 1 010-1.414z" clip-rule="evenodd"/>
            </svg>
          </button>

          <!-- Dropdown Menu (hidden by default, toggle with JS) -->
          <div
            id="admin-profile-dropdown"
            class="
              hidden absolute right-0 mt-2 w-56
              bg-white rounded-lg shadow-lg border border-jm-gray-200
              py-2 z-50
            "
          >
            <a href="/admin/account/settings" class="block px-4 py-2 text-sm text-jm-gray-700 hover:bg-jm-gray-50 transition-colors">
              Account Settings
            </a>
            <a href="/admin/account/security" class="block px-4 py-2 text-sm text-jm-gray-700 hover:bg-jm-gray-50 transition-colors">
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

**Purpose:** Primary navigation to admin functions

**Components:**
- Dashboard link (active state)
- Role-specific menu items
- Quick action buttons
- Collapse/expand toggle (mobile)

**Super Admin Navigation Items:**
- Dashboard
- Users (All)
- VIP Management
- Moderation
- Reports
- Analytics
- Settings
- Audit Logs

**Moderator Navigation Items:**
- Dashboard
- Reports Queue
- Photo Moderation
- Profile Reviews
- Flagged Messages
- My Performance

**VIP Coordinator Navigation Items:**
- Dashboard
- VIP Applications
- Tier 5 Verifications
- Expert Management
- VIP Analytics

**VIP Expert Navigation Items:**
- Dashboard
- My Clients
- Search Matches
- Consultation Notes
- My Performance

**HTML/Tailwind Example:**

```html
<!-- Sidebar Navigation -->
<aside class="
  w-64 bg-white border-r border-jm-gray-200
  h-screen sticky top-16 overflow-y-auto
  hidden lg:block
">
  <nav class="p-4 space-y-2" aria-label="Admin navigation">
    <!-- Dashboard (Active) -->
    <a
      href="/admin/dashboard"
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

    <!-- Reports Queue -->
    <a
      href="/admin/moderation/reports"
      class="
        flex items-center gap-3 px-4 py-3 rounded-lg
        text-jm-gray-700 hover:bg-jm-gray-50 hover:text-jm-purple
        transition-all duration-200
        relative
      "
    >
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464L3.34 16c-.77 1.333.192 3 1.732 3z"/>
      </svg>
      Reports Queue
      <!-- Pending Badge -->
      <span class="
        ml-auto bg-jm-error text-white
        text-xs font-bold px-2 py-1 rounded-full
      ">
        12
      </span>
    </a>

    <!-- Photo Moderation -->
    <a
      href="/admin/moderation/photos"
      class="
        flex items-center gap-3 px-4 py-3 rounded-lg
        text-jm-gray-700 hover:bg-jm-gray-50 hover:text-jm-purple
        transition-all duration-200
      "
    >
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 012.828L16 16m-2-2l1.586-1.586a2 2 012.828L20 14m-6-6h.01M6 20h12a2 2 002-2V6a2 2 00-2-2H6a2 2 00-2 2v12a2 2 002 2z"/>
      </svg>
      Photo Moderation
      <span class="ml-auto bg-jm-warning text-white text-xs font-bold px-2 py-1 rounded-full">
        45
      </span>
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
        Create Admin
      </button>
    </div>
  </nav>
</aside>
```

---

### 3. Metric Cards Row

**Purpose:** Display key performance indicators (KPIs) at a glance

**Super Admin Metrics:**
- Total Users (with % growth)
- Active Users (last 7 days)
- Revenue (monthly recurring)
- VIP Members

**Moderator Metrics:**
- Reports Pending
- Reports Resolved Today
- Average Resolution Time
- Photos Pending

**VIP Coordinator Metrics:**
- VIP Applications Pending
- VIP Members Active
- Tier 5 Verifications Pending
- Successful Matches This Month

**VIP Expert Metrics:**
- Assigned Clients
- Introductions This Month
- Success Rate
- Earnings This Month

**HTML/Tailwind Example:**

```html
<!-- Metric Cards Row -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
  <!-- Metric Card 1: Total Users -->
  <div class="
    bg-white rounded-xl shadow-sm border border-jm-gray-200
    p-6 space-y-3
    hover:shadow-md transition-shadow duration-200
  ">
    <div class="flex items-center justify-between">
      <h3 class="font-sans text-sm font-medium text-jm-gray-600">
        Total Users
      </h3>
      <div class="bg-jm-purple/10 p-2 rounded-lg">
        <svg class="w-5 h-5 text-jm-purple" fill="currentColor" viewBox="0 20 20">
          <path d="M9 6a3 3 11-6 3 3 016zM17 6a3 3 11-6 3 3 016zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 00-1.5-4.33A5 5 0119 16v1h-6.07zM6 11a5 5 015 5v1H1v-1a5 5 015-5z"/>
        </svg>
      </div>
    </div>
    <div class="space-y-1">
      <p class="font-serif text-3xl font-bold text-jm-gray-900">
        2,847
      </p>
      <p class="font-sans text-xs text-jm-success flex items-center gap-1">
        <svg class="w-3 h-3" fill="currentColor" viewBox="0 20 20">
          <path fill-rule="evenodd" d="M12 7a1 1 110-2h5a1 1 011 1v5a1 1 11-2V8.414l-4.293 4.293a1 1 01-1.414L8 10.414l-4.293 4.293a1 1 01-1.414-1.414l5-5a1 1 011.414L11 10.586 14.586 7H12z" clip-rule="evenodd"/>
        </svg>
        +12% vs last month
      </p>
    </div>
  </div>

  <!-- Metric Card 2: Active Users -->
  <div class="
    bg-white rounded-xl shadow-sm border border-jm-gray-200
    p-6 space-y-3
    hover:shadow-md transition-shadow duration-200
  ">
    <div class="flex items-center justify-between">
      <h3 class="font-sans text-sm font-medium text-jm-gray-600">
        Active (7d)
      </h3>
      <div class="bg-jm-success/10 p-2 rounded-lg">
        <svg class="w-5 h-5 text-jm-success" fill="currentColor" viewBox="0 20 20">
          <path fill-rule="evenodd" d="M10 18a8 8 100-16 8 8 000 16zm3.707-9.293a1 1 00-1.414-1.414L9 10.586 7.707 9.293a1 1 00-1.414 1.414l2 2a1 1 001.414l4-4z" clip-rule="evenodd"/>
        </svg>
      </div>
    </div>
    <div class="space-y-1">
      <p class="font-serif text-3xl font-bold text-jm-gray-900">
        1,284
      </p>
      <p class="font-sans text-xs text-jm-gray-500">
        45% of total users
      </p>
    </div>
  </div>

  <!-- Metric Card 3: Revenue -->
  <div class="
    bg-white rounded-xl shadow-sm border border-jm-gray-200
    p-6 space-y-3
    hover:shadow-md transition-shadow duration-200
  ">
    <div class="flex items-center justify-between">
      <h3 class="font-sans text-sm font-medium text-jm-gray-600">
        MRR
      </h3>
      <div class="bg-jm-coral/10 p-2 rounded-lg">
        <svg class="w-5 h-5 text-jm-coral" fill="currentColor" viewBox="0 20 20">
          <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 .114-.07.34-.433.582a2.305 2.305 01-.567.267z"/>
          <path fill-rule="evenodd" d="M10 18a8 8 100-16 8 8 000 16zm1-13a1 1 10-2v.092a4.535 4.535 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 102v-.092a4.535 4.535 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0011 9.092V7.151c.391.127.68.317.843.504a1 1 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clip-rule="evenodd"/>
        </svg>
      </div>
    </div>
    <div class="space-y-1">
      <p class="font-serif text-3xl font-bold text-jm-gray-900">
        ₦1.2M
      </p>
      <p class="font-sans text-xs text-jm-success flex items-center gap-1">
        <svg class="w-3 h-3" fill="currentColor" viewBox="0 20 20">
          <path fill-rule="evenodd" d="M12 7a1 1 110-2h5a1 1 011 1v5a1 1 11-2V8.414l-4.293 4.293a1 1 01-1.414L8 10.414l-4.293 4.293a1 1 01-1.414-1.414l5-5a1 1 011.414L11 10.586 14.586 7H12z" clip-rule="evenodd"/>
        </svg>
        +8% vs last month
      </p>
    </div>
  </div>

  <!-- Metric Card 4: VIP Members -->
  <div class="
    bg-white rounded-xl shadow-sm border border-jm-gray-200
    p-6 space-y-3
    hover:shadow-md transition-shadow duration-200
  ">
    <div class="flex items-center justify-between">
      <h3 class="font-sans text-sm font-medium text-jm-gray-600">
        VIP Members
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
      <p class="font-sans text-xs text-jm-gray-500">
        3 pending verifications
      </p>
    </div>
  </div>
</div>
```

---

### 4. Priority Queue / Action Items

**Purpose:** Display urgent items requiring immediate admin attention

**Super Admin Priority Items:**
- Escalated reports requiring permanent ban decision
- Admin account creation requests
- VIP churn alerts (high-value cancellations)
- System alerts (security, performance)

**Moderator Priority Items:**
- Critical reports (harassment, threats, explicit content)
- High-priority reports (scams, fake profiles)
- Photos pending >24 hours
- Flagged messages

**VIP Coordinator Priority Items:**
- VIP applications pending >3 days
- Tier 5 verifications pending >48 hours
- Expert reassignment requests
- VIP client complaints

**VIP Expert Priority Items:**
- Client consultation scheduled today
- Tier access request responses
- Client messages unanswered >24 hours
- Introduction feedback pending

**HTML/Tailwind Example:**

```html
<!-- Priority Queue Section -->
<div class="bg-white rounded-xl shadow-sm border border-jm-gray-200 p-6 mb-8">
  <div class="flex items-center justify-between mb-6">
    <h2 class="font-serif text-xl font-bold text-jm-gray-900">
      Priority Queue
    </h2>
    <span class="font-sans text-sm text-jm-gray-600">
      15 items requiring attention
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
      All (15)
    </button>
    <button class="
      font-sans text-sm font-medium
      text-jm-gray-600 hover:text-jm-purple
      px-4 py-2
      transition-colors duration-200
    ">
      Critical (3)
    </button>
    <button class="
      font-sans text-sm font-medium
      text-jm-gray-600 hover:text-jm-purple
      px-4 py-2
      transition-colors duration-200
    ">
      High (7)
    </button>
    <button class="
      font-sans text-sm font-medium
      text-jm-gray-600 hover:text-jm-purple
      px-4 py-2
      transition-colors duration-200
    ">
      Medium (5)
    </button>
  </div>

  <!-- Priority Items List -->
  <div class="space-y-4">
    <!-- Critical Priority Item -->
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
            🔴 CRITICAL
          </span>
          <span class="font-sans text-xs text-jm-gray-500">
            2 hours ago
          </span>
        </div>
        <h3 class="font-sans text-sm font-semibold text-jm-gray-900 mb-1">
          Harassment Report - User #12345
        </h3>
        <p class="font-sans text-sm text-jm-gray-600 mb-2">
          Multiple harassment reports against same user. Pattern detected across 3 victims.
          Requires permanent ban decision.
        </p>
        <div class="flex items-center gap-2">
          <button class="
            bg-jm-error hover:bg-jm-error/90
            text-white font-sans font-medium text-xs
            px-3 py-1.5 rounded-md
            transition-all duration-200
            focus:outline-none focus:ring-2 focus:ring-jm-error focus:ring-offset-2
          ">
            Review Now
          </button>
          <button class="
            text-jm-gray-600 hover:text-jm-gray-900
            font-sans font-medium text-xs
            px-3 py-1.5
            transition-colors duration-200
          ">
            Dismiss
          </button>
        </div>
      </div>
    </div>

    <!-- High Priority Item -->
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
            🟠 HIGH
          </span>
          <span class="font-sans text-xs text-jm-gray-500">
            4 hours ago
          </span>
        </div>
        <h3 class="font-sans text-sm font-semibold text-jm-gray-900 mb-1">
          VIP Tier 5 Verification Pending - 3 Days
        </h3>
        <p class="font-sans text-sm text-jm-gray-600 mb-2">
          Chidinma O. (ID: 78901) submitted Tier 5 verification 3 days ago. Target: <48 hours.
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

    <!-- Medium Priority Item -->
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
            🟡 MEDIUM
          </span>
          <span class="font-sans text-xs text-jm-gray-500">
            1 day ago
          </span>
        </div>
        <h3 class="font-sans text-sm font-semibold text-jm-gray-900 mb-1">
          Photo Moderation Queue - 45 Photos Pending
        </h3>
        <p class="font-sans text-sm text-jm-gray-600 mb-2">
          Photo moderation queue has grown to 45 photos. Target: <20 pending.
        </p>
        <div class="flex items-center gap-2">
          <button class="
            bg-jm-info hover:bg-jm-info/90
            text-white font-sans font-medium text-xs
            px-3 py-1.5 rounded-md
            transition-all duration-200
            focus:outline-none focus:ring-2 focus:ring-jm-info focus:ring-offset-2
          ">
            Start Moderating
          </button>
        </div>
      </div>
    </div>
  </div>

  <!-- View All Link -->
  <div class="mt-6 pt-4 border-t border-jm-gray-200 text-center">
    <a
      href="/admin/priority-queue"
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

### 5. Role-Specific Content Areas

#### Super Admin: Platform Analytics Chart

```html
<!-- Platform Analytics Chart -->
<div class="bg-white rounded-xl shadow-sm border border-jm-gray-200 p-6 mb-8">
  <div class="flex items-center justify-between mb-6">
    <h2 class="font-serif text-xl font-bold text-jm-gray-900">
      Platform Growth
    </h2>
    <div class="flex items-center gap-2">
      <select class="
        font-sans text-sm
        border border-jm-gray-300 rounded-md
        px-3 py-2
        focus:outline-none focus:ring-2 focus:ring-jm-purple focus:border-jm-purple
      ">
        <option>Last 7 Days</option>
        <option>Last 30 Days</option>
        <option>Last 90 Days</option>
        <option>Last 12 Months</option>
      </select>
    </div>
  </div>

  <!-- Chart Placeholder (use Chart.js or similar) -->
  <div class="h-80 bg-jm-gray-50 rounded-lg flex items-center justify-center">
    <p class="font-sans text-sm text-jm-gray-500">
      [Chart: User Growth Over Time]
    </p>
  </div>

  <!-- Chart Legend -->
  <div class="flex items-center justify-center gap-6 mt-6">
    <div class="flex items-center gap-2">
      <div class="w-3 h-3 rounded-full bg-jm-purple"></div>
      <span class="font-sans text-xs text-jm-gray-600">Total Users</span>
    </div>
    <div class="flex items-center gap-2">
      <div class="w-3 h-3 rounded-full bg-jm-coral"></div>
      <span class="font-sans text-xs text-jm-gray-600">Active Users</span>
    </div>
    <div class="flex items-center gap-2">
      <div class="w-3 h-3 rounded-full bg-jm-success"></div>
      <span class="font-sans text-xs text-jm-gray-600">Premium Users</span>
    </div>
  </div>
</div>
```

#### Moderator: Recent Reports Table

```html
<!-- Recent Reports Table -->
<div class="bg-white rounded-xl shadow-sm border border-jm-gray-200 overflow-hidden">
  <div class="p-6 border-b border-jm-gray-200">
    <h2 class="font-serif text-xl font-bold text-jm-gray-900">
      Recent Reports
    </h2>
  </div>

  <!-- Table -->
  <div class="overflow-x-auto">
    <table class="w-full">
      <thead class="bg-jm-gray-50">
        <tr>
          <th class="px-6 py-3 text-left font-sans text-xs font-semibold text-jm-gray-600 uppercase tracking-wide">
            Report ID
          </th>
          <th class="px-6 py-3 text-left font-sans text-xs font-semibold text-jm-gray-600 uppercase tracking-wide">
            Type
          </th>
          <th class="px-6 py-3 text-left font-sans text-xs font-semibold text-jm-gray-600 uppercase tracking-wide">
            Reported User
          </th>
          <th class="px-6 py-3 text-left font-sans text-xs font-semibold text-jm-gray-600 uppercase tracking-wide">
            Severity
          </th>
          <th class="px-6 py-3 text-left font-sans text-xs font-semibold text-jm-gray-600 uppercase tracking-wide">
            Time
          </th>
          <th class="px-6 py-3 text-left font-sans text-xs font-semibold text-jm-gray-600 uppercase tracking-wide">
            Actions
          </th>
        </tr>
      </thead>
      <tbody class="divide-y divide-jm-gray-200">
        <tr class="hover:bg-jm-gray-50 transition-colors duration-150">
          <td class="px-6 py-4 whitespace-nowrap font-sans text-sm text-jm-gray-900">
            #4821
          </td>
          <td class="px-6 py-4 whitespace-nowrap font-sans text-sm text-jm-gray-700">
            Harassment
          </td>
          <td class="px-6 py-4 whitespace-nowrap font-sans text-sm text-jm-gray-700">
            Emeka T. (ID: 44556)
          </td>
          <td class="px-6 py-4 whitespace-nowrap">
            <span class="inline-flex items-center gap-1 bg-jm-error/10 text-jm-error px-2 py-1 rounded-md text-xs font-semibold">
              Critical
            </span>
          </td>
          <td class="px-6 py-4 whitespace-nowrap font-sans text-sm text-jm-gray-500">
            2 hours ago
          </td>
          <td class="px-6 py-4 whitespace-nowrap">
            <button class="
              bg-jm-purple hover:bg-jm-purple-dark
              text-white font-sans font-medium text-xs
              px-3 py-1.5 rounded-md
              transition-all duration-200
              focus:outline-none focus:ring-2 focus:ring-jm-purple focus:ring-offset-1
            ">
              Review
            </button>
          </td>
        </tr>
        <!-- More rows... -->
      </tbody>
    </table>
  </div>

  <!-- Pagination -->
  <div class="p-4 border-t border-jm-gray-200 flex items-center justify-between">
    <p class="font-sans text-sm text-jm-gray-600">
      Showing 1-10 of 47 reports
    </p>
    <div class="flex items-center gap-2">
      <button class="
        px-3 py-1 rounded-md
        border border-jm-gray-300
        font-sans text-sm text-jm-gray-600
        hover:bg-jm-gray-50
        disabled:opacity-50 disabled:cursor-not-allowed
      " disabled>
        Previous
      </button>
      <button class="
        px-3 py-1 rounded-md
        bg-jm-purple text-white
        font-sans text-sm font-medium
      ">
        1
      </button>
      <button class="
        px-3 py-1 rounded-md
        border border-jm-gray-300
        font-sans text-sm text-jm-gray-600
        hover:bg-jm-gray-50
      ">
        2
      </button>
      <button class="
        px-3 py-1 rounded-md
        border border-jm-gray-300
        font-sans text-sm text-jm-gray-600
        hover:bg-jm-gray-50
      ">
        3
      </button>
      <button class="
        px-3 py-1 rounded-md
        border border-jm-gray-300
        font-sans text-sm text-jm-gray-600
        hover:bg-jm-gray-50
      ">
        Next
      </button>
    </div>
  </div>
</div>
```

---

## Admin Actions & Workflows

### Super Admin Actions
1. **View Platform Metrics:** Real-time dashboard updates (auto-refresh every 30 seconds)
2. **Escalation Review:** Review cases escalated by Moderators/VIP Coordinators
3. **Admin Management:** Create, edit, suspend, delete admin accounts
4. **Analytics Export:** Download reports (CSV, PDF)
5. **System Settings:** Modify platform settings (pricing, features, email templates)

### Moderator Actions
1. **Review Report:** Click "Review" → View report details → Take action (warn, suspend, escalate)
2. **Moderate Photo:** Click photo → Approve/Reject/Request Re-upload
3. **Escalate Case:** Click "Escalate to Super Admin" → Add notes → Submit
4. **View User Profile:** Click user ID → View full profile (all tiers)

### VIP Coordinator Actions
1. **Review VIP Application:** Click application → Review 18 questions → Approve/Reject
2. **Verify Tier 5:** Review ID + Video KYC → Approve/Reject
3. **Assign Expert:** Select expert from dropdown → Add coordinator notes → Assign
4. **Monitor Expert Performance:** View expert dashboard → Review metrics → Take action (coaching, reassignment, termination)

### VIP Expert Actions
1. **View Assigned Clients:** Click client card → View full profile (all 5 tiers)
2. **Search Matches:** Use filters (age, location, religion) → Browse Tier 1-2 data platform-wide
3. **Request Tier Access:** Click "Request Access" → Select tier level → Submit request
4. **Create Introduction Proposal:** Select match → Write introduction notes → Submit to VIP client

---

## Permissions & Authorization Checks

### Backend Authorization Middleware

```javascript
// Permission check middleware
function requireRole(allowedRoles) {
  return async (req, res, next) => {
    const admin = req.admin; // From auth token

    if (!allowedRoles.includes(admin.role)) {
      await logSecurityEvent({
        event: 'unauthorized_access_attempt',
        adminId: admin.id,
        attemptedRoute: req.path,
        ipAddress: req.ip
      });

      return res.status(403).json({
        error: 'Access Denied',
        message: `Your role (${admin.role}) cannot access this resource`
      });
    }

    next();
  };
}

// Route protection example
app.get('/admin/dashboard',
  authenticateAdmin, // Verify session/token
  requireRole(['superAdmin', 'moderator', 'vipCoordinator', 'vipExpert']),
  async (req, res) => {
    // Serve role-specific dashboard
    const dashboardData = await getDashboardData(req.admin.role);
    res.render('admin/dashboard', { data: dashboardData });
  }
);
```

### Frontend Permission Checks

```javascript
// JavaScript: Hide/show UI elements based on admin role
const adminRole = document.body.dataset.adminRole; // Set via server-side template

if (adminRole === 'moderator') {
  // Hide VIP management links
  document.querySelectorAll('[data-permission="vip-management"]').forEach(el => {
    el.style.display = 'none';
  });
}

if (adminRole === 'vipExpert') {
  // Show only assigned clients
  // Enforce data isolation on frontend (backend is authoritative)
  document.querySelectorAll('[data-permission="platform-wide-users"]').forEach(el => {
    el.style.display = 'none';
  });
}
```

---

## Audit Logging Requirements

**ALL admin actions must be logged** to an immutable audit trail.

### Log Structure

```javascript
const AuditLog = {
  timestamp: Date,
  adminId: ObjectId,
  adminRole: String,
  action: String, // e.g., 'view_dashboard', 'approve_vip_application'
  targetId: ObjectId, // User/resource affected (if applicable)
  targetType: String, // 'user', 'vipApplication', 'report', etc.
  ipAddress: String,
  userAgent: String,
  details: Object, // Action-specific metadata
  result: String // 'success', 'denied', 'error'
};
```

### Example Log Entries

```javascript
// Example 1: Super Admin views dashboard
{
  timestamp: "2026-02-27T10:30:00Z",
  adminId: "admin_001",
  adminRole: "superAdmin",
  action: "view_dashboard",
  targetId: null,
  targetType: null,
  ipAddress: "192.168.1.100",
  userAgent: "Mozilla/5.0...",
  details: {
    dashboardType: "super_admin",
    metricsViewed: ["total_users", "revenue", "active_users"]
  },
  result: "success"
}

// Example 2: VIP Coordinator approves VIP application
{
  timestamp: "2026-02-27T11:15:00Z",
  adminId: "admin_003",
  adminRole: "vipCoordinator",
  action: "approve_vip_application",
  targetId: "vipApp_12345",
  targetType: "vipApplication",
  ipAddress: "10.0.0.50",
  userAgent: "Mozilla/5.0...",
  details: {
    applicantUserId: "user_78901",
    approvalNotes: "Excellent candidate, serious intent",
    tier5Unlocked: true
  },
  result: "success"
}

// Example 3: Moderator attempts to access VIP data (denied)
{
  timestamp: "2026-02-27T12:00:00Z",
  adminId: "admin_005",
  adminRole: "moderator",
  action: "view_vip_applications",
  targetId: null,
  targetType: "vipApplication",
  ipAddress: "192.168.1.105",
  userAgent: "Mozilla/5.0...",
  details: {
    attemptedUrl: "/admin/vip/applications"
  },
  result: "denied"
}
```

### Audit Log Retention
- **Retention Period:** 7 years (legal compliance)
- **Storage:** Immutable append-only database
- **Access:** Super Admin and Data Protection Officer only
- **Review:** Quarterly access reviews by Super Admin

---

## Accessibility Requirements

**WCAG 2.1 AA Compliance:**

1. **Keyboard Navigation**
   - All interactive elements accessible via Tab key
   - Skip navigation link for screen readers
   - Visible focus indicators on all focusable elements

2. **Screen Reader Support**
   - ARIA labels on all icons and icon-only buttons
   - ARIA live regions for dynamic content updates (e.g., priority queue)
   - Semantic HTML (nav, main, aside, section, article)

3. **Color Contrast**
   - Minimum 4.5:1 for normal text
   - Minimum 3:1 for large text (18px+)
   - Don't rely on color alone to convey information (use icons + text)

4. **Responsive Design**
   - Works on mobile, tablet, desktop
   - Minimum viewport width: 320px
   - Touch-friendly targets (minimum 44x44px)

5. **Form Accessibility**
   - Labels associated with inputs
   - Error messages announced to screen readers
   - Required fields indicated

**HTML Example:**

```html
<!-- Accessible Button -->
<button
  type="button"
  class="p-2 rounded-full text-jm-gray-600 hover:text-jm-purple"
  aria-label="Notifications"
  aria-describedby="notification-count"
>
  <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 24 24">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0118 14.158V11a6.002 6.002 00-4-5.659V5a2 2 10-4v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6v1a3 3 11-6v-1m6H9"/>
  </svg>
  <span id="notification-count" class="sr-only">5 unread notifications</span>
  <span class="absolute top-0 right-0 bg-jm-error text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-white">
    5
  </span>
</button>

<!-- Screen Reader Only Text -->
<span class="sr-only">
  <!-- Tailwind: sr-only class for screen reader only content -->
  Current page: Dashboard
</span>
```

---

## Error Handling

### Frontend Error Handling

**Scenario 1: API Request Fails**

```javascript
// JavaScript: Fetch dashboard data
async function loadDashboardData() {
  try {
    const response = await fetch('/admin/api/dashboard-data', {
      headers: {
        'Authorization': `Bearer ${sessionToken}`
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    renderDashboard(data);
  } catch (error) {
    console.error('Dashboard load failed:', error);

    // Show user-friendly error message
    showErrorNotification(
      'Unable to load dashboard',
      'Please refresh the page. If the problem persists, contact support.'
    );
  }
}
```

**Scenario 2: Session Expired**

```javascript
// JavaScript: Check session validity
function checkSession() {
  fetch('/admin/api/session-check')
    .then(response => {
      if (response.status === 401) {
        // Session expired
        window.location.href = '/admin/login?session_expired=true';
      }
    });
}

// Check session every 5 minutes
setInterval(checkSession, 5 * 60 * 1000);
```

**HTML: Error Notification Component**

```html
<!-- Error Notification (Toast) -->
<div
  id="error-notification"
  class="
    fixed top-4 right-4 z-50
    bg-white border-l-4 border-jm-error
    rounded-lg shadow-lg
    p-4 max-w-md
    hidden
  "
  role="alert"
  aria-live="assertive"
>
  <div class="flex items-start gap-3">
    <svg class="w-5 h-5 text-jm-error flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 20 20">
      <path fill-rule="evenodd" d="M10 18a8 8 100-16 8 8 000 16zM8.707 7.293a1 1 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 101.414 1.414L10 11.414l1.293 1.293a1 1 001.414-1.414L11.414 10l1.293-1.293a1 1 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"/>
    </svg>
    <div class="flex-1">
      <h4 class="font-sans text-sm font-semibold text-jm-error mb-1">
        Error Loading Dashboard
      </h4>
      <p class="font-sans text-sm text-jm-gray-700">
        Unable to load dashboard data. Please refresh the page.
      </p>
    </div>
    <button
      type="button"
      class="text-jm-gray-400 hover:text-jm-gray-600"
      aria-label="Close notification"
      onclick="closeErrorNotification()"
    >
      <svg class="w-5 h-5" fill="currentColor" viewBox="0 20 20">
        <path fill-rule="evenodd" d="M4.293 4.293a1 1 011.414L10 8.586l4.293-4.293a1 1 111.414 1.414L11.414 10l4.293 4.293a1 1 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 01-1.414-1.414L8.586 10 4.293 5.707a1 1 010-1.414z" clip-rule="evenodd"/>
      </svg>
    </button>
  </div>
</div>
```

### Backend Error Handling

**Scenario 1: Invalid Admin Role**

```javascript
// Backend: Handle invalid role access
app.get('/admin/dashboard', authenticateAdmin, async (req, res) => {
  try {
    const admin = req.admin;

    // Validate admin role
    const validRoles = ['superAdmin', 'moderator', 'vipCoordinator', 'vipExpert'];
    if (!validRoles.includes(admin.role)) {
      return res.status(403).render('admin/error', {
        errorCode: 403,
        errorTitle: 'Access Denied',
        errorMessage: 'Your account does not have permission to access this page.',
        supportEmail: 'support@joymatcher.com'
      });
    }

    // Load dashboard data
    const dashboardData = await getDashboardData(admin.role);
    res.render('admin/dashboard', { data: dashboardData });

  } catch (error) {
    console.error('Dashboard error:', error);
    res.status(500).render('admin/error', {
      errorCode: 500,
      errorTitle: 'Server Error',
      errorMessage: 'An unexpected error occurred. Please try again.',
      supportEmail: 'support@joymatcher.com'
    });
  }
});
```

**Scenario 2: Database Connection Failure**

```javascript
// Backend: Handle database errors
async function getDashboardData(adminRole) {
  try {
    const data = await db.dashboards.findOne({ role: adminRole });
    return data;
  } catch (error) {
    console.error('Database error:', error);

    // Log to error tracking service (e.g., Sentry)
    logToSentry(error, { context: 'getDashboardData', adminRole });

    // Return fallback data or throw
    throw new DatabaseError('Unable to retrieve dashboard data');
  }
}
```

---

## HTML/Tailwind Complete Example: Super Admin Dashboard

```html
<!DOCTYPE html>
<html lang="en" data-admin-role="superAdmin">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Super Admin Dashboard - JoyMatcher Admin</title>
  <link rel="stylesheet" href="/css/tailwind.css">
  <link rel="stylesheet" href="/css/admin.css">
</head>
<body class="bg-jm-gray-50 font-sans">
  <!-- Skip Navigation for Screen Readers -->
  <a href="#main-content" class="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-jm-purple focus:text-white focus:rounded-md">
    Skip to main content
  </a>

  <!-- Top Navigation Bar -->
  <header class="bg-white border-b border-jm-gray-200 sticky top-0 z-50 shadow-sm">
    <nav class="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <div class="flex items-center gap-6">
          <a href="/admin/dashboard" class="flex items-center gap-3">
            <img src="/images/logo.svg" alt="JoyMatcher Admin" class="h-8 w-8" />
            <span class="font-serif text-lg font-bold text-jm-gray-900 hidden md:inline">
              Admin Portal
            </span>
          </a>
          <span class="bg-gradient-jm text-white px-3 py-1 rounded-full text-xs font-semibold shadow-sm">
            Super Admin
          </span>
        </div>
        <div class="flex items-center gap-4">
          <button type="button" class="relative p-2 rounded-full text-jm-gray-600 hover:text-jm-purple hover:bg-jm-gray-100 transition-all duration-200" aria-label="Notifications">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0118 14.158V11a6.002 6.002 00-4-5.659V5a2 2 10-4v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6v1a3 3 11-6v-1m6H9"/>
            </svg>
            <span class="absolute top-0 right-0 bg-jm-error text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-white">5</span>
          </button>
          <div class="relative">
            <button type="button" class="flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-jm-purple rounded-full">
              <img src="/images/admin/admin-avatar.jpg" alt="Admin profile" class="w-9 h-9 rounded-full border-2 border-jm-purple" />
              <span class="font-sans text-sm font-medium text-jm-gray-700 hidden md:inline">John Doe</span>
              <svg class="w-4 h-4 text-jm-gray-600" fill="currentColor" viewBox="0 20 20">
                <path fill-rule="evenodd" d="M5.293 7.293a1 1 011.414L10 10.586l3.293-3.293a1 1 111.414 1.414l-4 4a1 1 01-1.414l-4-4a1 1 010-1.414z" clip-rule="evenodd"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  </header>

  <!-- Main Layout -->
  <div class="flex">
    <!-- Sidebar Navigation -->
    <aside class="w-64 bg-white border-r border-jm-gray-200 h-screen sticky top-16 overflow-y-auto hidden lg:block">
      <nav class="p-4 space-y-2" aria-label="Admin navigation">
        <a href="/admin/dashboard" class="flex items-center gap-3 px-4 py-3 rounded-lg bg-jm-purple/10 text-jm-purple font-medium border-l-4 border-jm-purple" aria-current="page">
          <svg class="w-5 h-5" fill="currentColor" viewBox="0 20 20">
            <path d="M10.707 2.293a1 1 00-1.414l-7 7a1 1 001.414 1.414L4 10.414V17a1 1 001 1h2a1 1 001-1v-2a1 1 011-1h2a1 1 011 1v2a1 1 001 1h2a1 1 001-1v-6.586l.293.293a1 1 001.414-1.414l-7-7z"/>
          </svg>
          Dashboard
        </a>
        <a href="/admin/users" class="flex items-center gap-3 px-4 py-3 rounded-lg text-jm-gray-700 hover:bg-jm-gray-50 hover:text-jm-purple transition-all duration-200">
          <svg class="w-5 h-5" fill="currentColor" viewBox="0 20 20">
            <path d="M9 6a3 3 11-6 3 3 016zM17 6a3 3 11-6 3 3 016zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 00-1.5-4.33A5 5 0119 16v1h-6.07zM6 11a5 5 015 5v1H1v-1a5 5 015-5z"/>
          </svg>
          Users
        </a>
        <a href="/admin/vip" class="flex items-center gap-3 px-4 py-3 rounded-lg text-jm-gray-700 hover:bg-jm-gray-50 hover:text-jm-purple transition-all duration-200">
          <svg class="w-5 h-5" fill="currentColor" viewBox="0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902l1.07 3.292a1 1 00.95.69h3.462c.969 1.371 1.24.588 1.81l-2.8 2.034a1 1 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 00-1.175l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 00.951-.69l1.07-3.292z"/>
          </svg>
          VIP Management
        </a>
      </nav>
    </aside>

    <!-- Main Content -->
    <main id="main-content" class="flex-1 p-6 lg:p-8" role="main">
      <!-- Page Header -->
      <div class="mb-8">
        <h1 class="font-serif text-3xl font-bold text-jm-gray-900 mb-2">
          Super Admin Dashboard
        </h1>
        <p class="font-sans text-base text-jm-gray-600">
          Welcome back, John. Here's what's happening with the platform today.
        </p>
      </div>

      <!-- Metric Cards Row -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <!-- Metric Card 1 -->
        <div class="bg-white rounded-xl shadow-sm border border-jm-gray-200 p-6 space-y-3 hover:shadow-md transition-shadow duration-200">
          <div class="flex items-center justify-between">
            <h3 class="font-sans text-sm font-medium text-jm-gray-600">Total Users</h3>
            <div class="bg-jm-purple/10 p-2 rounded-lg">
              <svg class="w-5 h-5 text-jm-purple" fill="currentColor" viewBox="0 20 20">
                <path d="M9 6a3 3 11-6 3 3 016zM17 6a3 3 11-6 3 3 016zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 00-1.5-4.33A5 5 0119 16v1h-6.07zM6 11a5 5 015 5v1H1v-1a5 5 015-5z"/>
              </svg>
            </div>
          </div>
          <div class="space-y-1">
            <p class="font-serif text-3xl font-bold text-jm-gray-900">2,847</p>
            <p class="font-sans text-xs text-jm-success flex items-center gap-1">
              <svg class="w-3 h-3" fill="currentColor" viewBox="0 20 20">
                <path fill-rule="evenodd" d="M12 7a1 1 110-2h5a1 1 011 1v5a1 1 11-2V8.414l-4.293 4.293a1 1 01-1.414L8 10.414l-4.293 4.293a1 1 01-1.414-1.414l5-5a1 1 011.414L11 10.586 14.586 7H12z" clip-rule="evenodd"/>
              </svg>
              +12% vs last month
            </p>
          </div>
        </div>

        <!-- More metric cards... (see Component Breakdown section above) -->
      </div>

      <!-- Priority Queue -->
      <div class="bg-white rounded-xl shadow-sm border border-jm-gray-200 p-6 mb-8">
        <div class="flex items-center justify-between mb-6">
          <h2 class="font-serif text-xl font-bold text-jm-gray-900">Priority Queue</h2>
          <span class="font-sans text-sm text-jm-gray-600">15 items requiring attention</span>
        </div>
        <!-- Priority items (see Component Breakdown section above) -->
      </div>
    </main>
  </div>

  <!-- JavaScript -->
  <script src="/js/admin-dashboard.js"></script>
</body>
</html>
```

---

## Related Documentation

- [Admin Architecture](../../Admin%20System/admin_architecture.md) - Overall admin system design
- [Admin Roles & Permissions](../../Admin%20System/admin_roles_permissions.md) - Permission matrices
- [HTML Implementation Guide](../../Design%20System/html_implementation_guide.md) - Tailwind patterns
- [Accessibility Patterns](../../Design%20System/accessibility_patterns.md) - WCAG compliance

---

**Document Owner:** Product Lead & Engineering Lead
**Last Reviewed:** 2026-02-27
**Next Review:** Weekly during implementation
**Implementation Priority:** P0 (Critical - Required for MVP)
