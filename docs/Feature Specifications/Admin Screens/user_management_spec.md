# User Management Feature Specification

**Version:** 1.0.0
**Last Updated:** 2026-02-27
**Status:** Complete - Ready for Implementation
**Classification:** Admin Feature Specification

---

## Overview

The User Management screen provides admin staff with comprehensive tools to search, view, edit, suspend, and ban user accounts. This interface is essential for content moderation, account verification, policy enforcement, and customer support.

**Document Purpose:** This specification provides complete implementation details for the User Management interface, including search/filter functionality, user detail views, moderation actions, and role-based permissions.

---

## Admin Role Access

### Access Matrix

| Admin Role | Access Level | Permitted Actions |
|------------|--------------|-------------------|
| Super Admin | All Users (Free, Premium, VIP) | View, Edit, Suspend (indefinite), Ban (permanent), Delete |
| Moderator | All Users (Free, Premium) | View (all tiers), Edit (content removal only), Suspend (max 30 days) |
| VIP Coordinator | VIP Users Only | View (all tiers), Edit (VIP-related data), Cannot suspend/ban |
| VIP Expert | Assigned Clients Only | View (assigned VIP clients, all 5 tiers), Cannot edit/suspend/ban |
| Data Protection Officer | All Users (data context) | View (for data requests), Delete (data deletion only), Export |
| Support Agent | All Users (limited view) | View (Tier 1 only), Cannot edit/suspend/ban |

**Critical:** VIP Experts can ONLY access their assigned clients. Attempting to access unassigned users returns 403 Forbidden.

---

## Page Purpose & Admin Goals

### Super Admin Goals
- **Platform Oversight:** Monitor user account health, identify problematic accounts
- **Policy Enforcement:** Ban users who violate terms of service after escalation
- **Data Management:** Process deletion requests, export user data for legal compliance
- **Account Recovery:** Assist users with account issues (locked accounts, lost access)

### Moderator Goals
- **Content Moderation:** Review and edit user profiles for policy compliance
- **Temporary Actions:** Suspend users for violations (max 30 days)
- **Pattern Detection:** Identify repeat offenders, escalate for permanent bans
- **User Search:** Quickly find users by ID, name, email for report investigation

### VIP Coordinator Goals
- **VIP Management:** View and edit VIP user data (applications, verifications)
- **Quality Assurance:** Ensure VIP profiles are complete and accurate
- **Expert Assignment:** View VIP user details to assign appropriate matchmakers

### Support Agent Goals
- **User Assistance:** View basic user info (Tier 1) to answer support questions
- **Account Verification:** Confirm user identity for password reset requests
- **Escalation:** Identify issues requiring moderator or technical intervention

---

## Layout & Wireframe Description

### Page Structure

```
┌─────────────────────────────────────────────────────────────────┐
│ HEADER: User Management                                         │
│ Breadcrumb: Dashboard > User Management                         │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│ ┌─────────────────────────────────────────────────────────────┐│
│ │ SEARCH & FILTER BAR                                         ││
│ │ [Search: ID, Name, Email]  [Filters: ▼] [Export] [Actions]││
│ └─────────────────────────────────────────────────────────────┘│
│                                                                 │
│ ┌─────────────────────────────────────────────────────────────┐│
│ │ USER LIST TABLE                                             ││
│ │                                                             ││
│ │ ☑ | Photo | Name | Email | Subscription | Tier | Status   ││
│ │ ☑ | [img] | Chi O.| chi@...| Premium     | T3  | Active   ││
│ │ ☑ | [img] | Emeka | em@... | Free        | T2  | Suspended││
│ │ ☑ | [img] | Ngozi | ng@... | VIP         | T5  | Active   ││
│ │                                                             ││
│ │ [Pagination: 1 2 3 ... Next]                               ││
│ └─────────────────────────────────────────────────────────────┘│
│                                                                 │
│ [Bulk Actions: Suspend Selected | Export Selected]             │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### User Detail View (Modal/Separate Page)

```
┌─────────────────────────────────────────────────────────────────┐
│ ← Back to User List                                   [Actions ▼]│
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│ ┌──────────────┐  Chidinma Okafor (ID: 78901)                 │
│ │              │  chi.okafor@example.com                       │
│ │ [User Photo] │  📱 +234-803-XXX-XXXX                         │
│ │              │  📍 Lagos, Nigeria                            │
│ └──────────────┘  ✅ Verified                                  │
│                                                                 │
│ ┌─────────────────────────────────────────────────────────────┐│
│ │ ACCOUNT INFO                                                ││
│ │ Joined: Feb 1, 2026 | Last Active: 2 hours ago             ││
│ │ Subscription: Premium | Billing: ₦18,000/month             ││
│ │ Tier Progress: Tier 3 Complete (60%)                       ││
│ └─────────────────────────────────────────────────────────────┘│
│                                                                 │
│ ┌─────────────────────────────────────────────────────────────┐│
│ │ TIER DATA (Expandable Sections)                            ││
│ │ ▼ Tier 1: Identity & Intent [Complete]                     ││
│ │ ▶ Tier 2: Lifestyle & Faith [Complete]                     ││
│ │ ▶ Tier 3: Relationships & Family [Complete]                ││
│ │ ▶ Tier 4: Health & Finances [Incomplete]                   ││
│ │ ▶ Tier 5: Verification [Locked]                            ││
│ └─────────────────────────────────────────────────────────────┘│
│                                                                 │
│ ┌─────────────────────────────────────────────────────────────┐│
│ │ ACTIVITY LOG                                                ││
│ │ • Showed interest in Emeka A. (1 hour ago)                 ││
│ │ • Updated Tier 3 response (3 hours ago)                    ││
│ │ • Logged in from mobile app (5 hours ago)                  ││
│ └─────────────────────────────────────────────────────────────┘│
│                                                                 │
│ ┌─────────────────────────────────────────────────────────────┐│
│ │ ADMIN ACTIONS                                               ││
│ │ [Edit Profile] [Suspend User] [Reset Password] [View Reports]││
│ └─────────────────────────────────────────────────────────────┘│
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## Component Breakdown

### 1. Page Header

**Purpose:** Identify current page, provide context

**Components:**
- Page title ("User Management")
- Breadcrumb navigation
- Quick stats (total users, active, suspended)

**HTML/Tailwind Example:**

```html
<!-- Page Header -->
<div class="mb-8">
  <!-- Breadcrumb -->
  <nav class="flex items-center gap-2 mb-4" aria-label="Breadcrumb">
    <a
      href="/admin/dashboard"
      class="font-sans text-sm text-jm-gray-600 hover:text-jm-purple transition-colors"
    >
      Dashboard
    </a>
    <svg class="w-4 h-4 text-jm-gray-400" fill="currentColor" viewBox="0 20 20">
      <path fill-rule="evenodd" d="M7.293 14.707a1 1 010-1.414L10.586 10 7.293 6.707a1 1 011.414-1.414l4 4a1 1 010 1.414l-4 4a1 1 01-1.414z" clip-rule="evenodd"/>
    </svg>
    <span class="font-sans text-sm font-medium text-jm-gray-900">
      User Management
    </span>
  </nav>

  <!-- Page Title & Stats -->
  <div class="flex items-center justify-between flex-wrap gap-4">
    <div>
      <h1 class="font-serif text-3xl font-bold text-jm-gray-900 mb-2">
        User Management
      </h1>
      <p class="font-sans text-sm text-jm-gray-600">
        Manage user accounts, profiles, and moderation actions
      </p>
    </div>

    <!-- Quick Stats -->
    <div class="flex items-center gap-6">
      <div class="text-center">
        <p class="font-serif text-2xl font-bold text-jm-gray-900">2,847</p>
        <p class="font-sans text-xs text-jm-gray-600">Total Users</p>
      </div>
      <div class="text-center">
        <p class="font-serif text-2xl font-bold text-jm-success">1,284</p>
        <p class="font-sans text-xs text-jm-gray-600">Active (7d)</p>
      </div>
      <div class="text-center">
        <p class="font-serif text-2xl font-bold text-jm-warning">12</p>
        <p class="font-sans text-xs text-jm-gray-600">Suspended</p>
      </div>
    </div>
  </div>
</div>
```

---

### 2. Search & Filter Bar

**Purpose:** Find users quickly by ID, name, email, or filters

**Components:**
- Search input (text search)
- Filter dropdowns (subscription, tier, status, verification)
- Export button
- Bulk action menu

**Search Capabilities:**
- Search by User ID (exact match)
- Search by Name (partial match, case-insensitive)
- Search by Email (partial match)
- Search by Phone Number (for Super Admin only)

**Filter Options:**
- **Subscription:** All | Free | Premium | VIP
- **Tier Progress:** All | Tier 1 | Tier 2 | Tier 3 | Tier 4 | Tier 5
- **Account Status:** All | Active | Suspended | Banned | Deactivated
- **Verification:** All | Verified | Unverified
- **Joined Date:** All Time | Last 7 Days | Last 30 Days | Last 90 Days | Custom Range
- **Last Active:** All | Active (7d) | Inactive (7-30d) | Dormant (>30d)

**HTML/Tailwind Example:**

```html
<!-- Search & Filter Bar -->
<div class="bg-white rounded-xl shadow-sm border border-jm-gray-200 p-6 mb-6">
  <div class="flex flex-col lg:flex-row gap-4">
    <!-- Search Input -->
    <div class="flex-1">
      <label for="user-search" class="sr-only">Search users</label>
      <div class="relative">
        <input
          type="text"
          id="user-search"
          name="search"
          placeholder="Search by ID, name, or email..."
          class="
            w-full pl-10 pr-4 py-3 rounded-lg
            border-2 border-jm-gray-300 focus:border-jm-purple focus:ring-2 focus:ring-jm-purple/20
            font-sans text-base text-jm-gray-900 placeholder:text-jm-gray-400
            transition-all duration-200
            focus:outline-none
          "
        />
        <svg
          class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-jm-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 24 24"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 11-14 7 7 0114z"/>
        </svg>
      </div>
    </div>

    <!-- Filter Dropdowns -->
    <div class="flex items-center gap-3 flex-wrap">
      <!-- Subscription Filter -->
      <select
        class="
          px-4 py-3 rounded-lg
          border-2 border-jm-gray-300 focus:border-jm-purple focus:ring-2 focus:ring-jm-purple/20
          font-sans text-sm text-jm-gray-700
          focus:outline-none
          cursor-pointer
        "
        aria-label="Filter by subscription"
      >
        <option value="">All Subscriptions</option>
        <option value="free">Free</option>
        <option value="premium">Premium</option>
        <option value="vip">VIP</option>
      </select>

      <!-- Status Filter -->
      <select
        class="
          px-4 py-3 rounded-lg
          border-2 border-jm-gray-300 focus:border-jm-purple focus:ring-2 focus:ring-jm-purple/20
          font-sans text-sm text-jm-gray-700
          focus:outline-none
          cursor-pointer
        "
        aria-label="Filter by status"
      >
        <option value="">All Statuses</option>
        <option value="active">Active</option>
        <option value="suspended">Suspended</option>
        <option value="banned">Banned</option>
      </select>

      <!-- Tier Filter -->
      <select
        class="
          px-4 py-3 rounded-lg
          border-2 border-jm-gray-300 focus:border-jm-purple focus:ring-2 focus:ring-jm-purple/20
          font-sans text-sm text-jm-gray-700
          focus:outline-none
          cursor-pointer
        "
        aria-label="Filter by tier"
      >
        <option value="">All Tiers</option>
        <option value="1">Tier 1</option>
        <option value="2">Tier 2</option>
        <option value="3">Tier 3</option>
        <option value="4">Tier 4</option>
        <option value="5">Tier 5</option>
      </select>

      <!-- Export Button -->
      <button
        type="button"
        class="
          border-2 border-jm-gray-300 hover:border-jm-purple
          text-jm-gray-700 hover:text-jm-purple hover:bg-jm-purple/5
          font-sans font-medium text-sm
          px-4 py-3 rounded-lg
          transition-all duration-200
          focus:outline-none focus:ring-2 focus:ring-jm-purple focus:ring-offset-2
          inline-flex items-center gap-2
        "
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 003 3h10a3 3 003-3v-1m-4-4l-4 4m0l-4-4m4 4V4"/>
        </svg>
        Export
      </button>

      <!-- Clear Filters Button -->
      <button
        type="button"
        class="
          text-jm-purple hover:text-jm-purple-dark hover:bg-jm-purple/10
          font-sans font-medium text-sm
          px-4 py-3 rounded-lg
          transition-all duration-200
          focus:outline-none focus:ring-2 focus:ring-jm-purple focus:ring-offset-1
        "
      >
        Clear Filters
      </button>
    </div>
  </div>

  <!-- Active Filters Display -->
  <div class="flex items-center gap-2 mt-4 flex-wrap" id="active-filters">
    <!-- Example Active Filter Tags -->
    <span class="
      inline-flex items-center gap-2
      bg-jm-purple/10 text-jm-purple
      px-3 py-1 rounded-full
      text-xs font-medium
    ">
      Premium
      <button type="button" aria-label="Remove filter" class="hover:text-jm-purple-dark">
        <svg class="w-3 h-3" fill="currentColor" viewBox="0 20 20">
          <path fill-rule="evenodd" d="M4.293 4.293a1 1 011.414L10 8.586l4.293-4.293a1 1 111.414 1.414L11.414 10l4.293 4.293a1 1 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 01-1.414-1.414L8.586 10 4.293 5.707a1 1 010-1.414z" clip-rule="evenodd"/>
        </svg>
      </button>
    </span>
    <span class="
      inline-flex items-center gap-2
      bg-jm-purple/10 text-jm-purple
      px-3 py-1 rounded-full
      text-xs font-medium
    ">
      Tier 3
      <button type="button" aria-label="Remove filter">
        <svg class="w-3 h-3" fill="currentColor" viewBox="0 20 20">
          <path fill-rule="evenodd" d="M4.293 4.293a1 1 011.414L10 8.586l4.293-4.293a1 1 111.414 1.414L11.414 10l4.293 4.293a1 1 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 01-1.414-1.414L8.586 10 4.293 5.707a1 1 010-1.414z" clip-rule="evenodd"/>
        </svg>
      </button>
    </span>
  </div>
</div>
```

---

### 3. User List Table

**Purpose:** Display users matching search/filter criteria

**Columns (configurable per admin role):**
- **Checkbox:** Select for bulk actions
- **Photo:** User profile photo (thumbnail)
- **Name:** Full name
- **ID:** User ID (clickable)
- **Email:** Email address
- **Subscription:** Free | Premium | VIP (badge)
- **Tier Progress:** Tier 1-5 (progress indicator)
- **Account Status:** Active | Suspended | Banned (badge)
- **Last Active:** Relative time (e.g., "2 hours ago")
- **Actions:** Quick action menu (View, Edit, Suspend)

**Role-Based Column Visibility:**

| Column | Super Admin | Moderator | VIP Coordinator | Support Agent |
|--------|-------------|-----------|-----------------|---------------|
| Photo | ✅ | ✅ | ✅ | ✅ |
| Name | ✅ | ✅ | ✅ | ✅ |
| ID | ✅ | ✅ | ✅ | ✅ |
| Email | ✅ | ✅ | ✅ (VIP only) | ⚠️ Partially hidden |
| Phone | ✅ | ❌ | ✅ (VIP only) | ❌ |
| Subscription | ✅ | ✅ | ✅ | ✅ |
| Tier Progress | ✅ | ✅ | ✅ (VIP only) | ❌ |
| Account Status | ✅ | ✅ | ✅ | ✅ |
| Last Active | ✅ | ✅ | ✅ | ✅ |

**HTML/Tailwind Example:**

```html
<!-- User List Table -->
<div class="bg-white rounded-xl shadow-sm border border-jm-gray-200 overflow-hidden">
  <!-- Table Header -->
  <div class="p-6 border-b border-jm-gray-200 flex items-center justify-between">
    <h2 class="font-serif text-xl font-bold text-jm-gray-900">
      Users
    </h2>
    <div class="flex items-center gap-3">
      <span class="font-sans text-sm text-jm-gray-600">
        Showing 1-20 of 2,847 users
      </span>
      <!-- View Options -->
      <div class="flex items-center gap-1 bg-jm-gray-100 rounded-lg p-1">
        <button
          type="button"
          class="
            p-2 rounded-md
            bg-white text-jm-purple shadow-sm
            transition-all duration-200
          "
          aria-label="Table view"
        >
          <svg class="w-4 h-4" fill="currentColor" viewBox="0 20 20">
            <path fill-rule="evenodd" d="M3 4a1 1 011-1h12a1 1 110 2H4a1 1 01-1-1zm0 4a1 1 011-1h12a1 1 110 2H4a1 1 01-1-1zm0 4a1 1 011-1h12a1 1 110 2H4a1 1 01-1-1zm0 4a1 1 011-1h12a1 1 110 2H4a1 1 01-1-1z" clip-rule="evenodd"/>
          </svg>
        </button>
        <button
          type="button"
          class="
            p-2 rounded-md
            text-jm-gray-600 hover:text-jm-purple
            transition-all duration-200
          "
          aria-label="Grid view"
        >
          <svg class="w-4 h-4" fill="currentColor" viewBox="0 20 20">
            <path d="M5 3a2 2 00-2 2v2a2 2 002 2h2a2 2 002-2V5a2 2 00-2-2H5zM5 11a2 2 00-2 2v2a2 2 002 2h2a2 2 002-2v-2a2 2 00-2-2H5zM11 5a2 2 012-2h2a2 2 012 2v2a2 2 01-2 2h-2a2 2 01-2-2V5zM11 13a2 2 012-2h2a2 2 012 2v2a2 2 01-2 2h-2a2 2 01-2-2v-2z"/>
          </svg>
        </button>
      </div>
    </div>
  </div>

  <!-- Bulk Actions Bar (shown when items selected) -->
  <div class="bg-jm-purple/10 border-b border-jm-purple/20 p-4 hidden" id="bulk-actions-bar">
    <div class="flex items-center justify-between">
      <p class="font-sans text-sm font-medium text-jm-purple">
        <span id="selected-count">3</span> users selected
      </p>
      <div class="flex items-center gap-2">
        <button
          type="button"
          class="
            bg-jm-warning hover:bg-jm-warning/90
            text-white font-sans font-medium text-sm
            px-4 py-2 rounded-lg
            transition-all duration-200
            focus:outline-none focus:ring-2 focus:ring-jm-warning focus:ring-offset-2
          "
        >
          Suspend Selected
        </button>
        <button
          type="button"
          class="
            border-2 border-jm-gray-300 hover:border-jm-gray-400
            text-jm-gray-700 hover:text-jm-gray-900
            font-sans font-medium text-sm
            px-4 py-2 rounded-lg
            transition-all duration-200
            focus:outline-none focus:ring-2 focus:ring-jm-gray-400 focus:ring-offset-2
          "
        >
          Export Selected
        </button>
        <button
          type="button"
          class="
            text-jm-gray-600 hover:text-jm-gray-900
            font-sans font-medium text-sm
            px-4 py-2
            transition-colors duration-200
          "
        >
          Deselect All
        </button>
      </div>
    </div>
  </div>

  <!-- Table -->
  <div class="overflow-x-auto">
    <table class="w-full">
      <thead class="bg-jm-gray-50 border-b border-jm-gray-200">
        <tr>
          <th class="px-6 py-3 text-left w-12">
            <input
              type="checkbox"
              class="
                w-4 h-4 rounded
                border-2 border-jm-gray-300
                text-jm-purple focus:ring-2 focus:ring-jm-purple/20
                cursor-pointer
              "
              aria-label="Select all users"
            />
          </th>
          <th class="px-6 py-3 text-left font-sans text-xs font-semibold text-jm-gray-600 uppercase tracking-wide">
            User
          </th>
          <th class="px-6 py-3 text-left font-sans text-xs font-semibold text-jm-gray-600 uppercase tracking-wide">
            ID
          </th>
          <th class="px-6 py-3 text-left font-sans text-xs font-semibold text-jm-gray-600 uppercase tracking-wide">
            Email
          </th>
          <th class="px-6 py-3 text-left font-sans text-xs font-semibold text-jm-gray-600 uppercase tracking-wide">
            Subscription
          </th>
          <th class="px-6 py-3 text-left font-sans text-xs font-semibold text-jm-gray-600 uppercase tracking-wide">
            Tier
          </th>
          <th class="px-6 py-3 text-left font-sans text-xs font-semibold text-jm-gray-600 uppercase tracking-wide">
            Status
          </th>
          <th class="px-6 py-3 text-left font-sans text-xs font-semibold text-jm-gray-600 uppercase tracking-wide">
            Last Active
          </th>
          <th class="px-6 py-3 text-right font-sans text-xs font-semibold text-jm-gray-600 uppercase tracking-wide">
            Actions
          </th>
        </tr>
      </thead>
      <tbody class="divide-y divide-jm-gray-200">
        <!-- User Row 1 -->
        <tr class="hover:bg-jm-gray-50 transition-colors duration-150">
          <td class="px-6 py-4">
            <input
              type="checkbox"
              class="
                w-4 h-4 rounded
                border-2 border-jm-gray-300
                text-jm-purple focus:ring-2 focus:ring-jm-purple/20
                cursor-pointer
              "
              aria-label="Select user Chidinma O."
            />
          </td>
          <td class="px-6 py-4">
            <div class="flex items-center gap-3">
              <img
                src="/images/users/user-78901.jpg"
                alt=""
                class="w-10 h-10 rounded-full object-cover border border-jm-gray-200"
              />
              <div>
                <p class="font-sans text-sm font-semibold text-jm-gray-900">
                  Chidinma O.
                </p>
                <p class="font-sans text-xs text-jm-gray-500">
                  31, Lagos
                </p>
              </div>
            </div>
          </td>
          <td class="px-6 py-4">
            <a
              href="/admin/users/78901"
              class="font-mono text-xs text-jm-purple hover:text-jm-purple-dark underline"
            >
              78901
            </a>
          </td>
          <td class="px-6 py-4">
            <p class="font-sans text-sm text-jm-gray-700">
              chi.okafor@example.com
            </p>
          </td>
          <td class="px-6 py-4">
            <span class="inline-flex items-center gap-1 bg-jm-purple/10 text-jm-purple px-2 py-1 rounded-md text-xs font-semibold">
              <svg class="w-3 h-3" fill="currentColor" viewBox="0 20 20">
                <path fill-rule="evenodd" d="M11.3 1.046A1 1 0112 2v5h4a1 1 01.82 1.573l-7 10A1 1 018 18v-5H4a1 1 01-.82-1.573l7-10a1 1 011.12-.38z" clip-rule="evenodd"/>
              </svg>
              Premium
            </span>
          </td>
          <td class="px-6 py-4">
            <div class="flex items-center gap-2">
              <span class="font-sans text-xs text-jm-gray-600">Tier 3</span>
              <div class="w-16 bg-jm-gray-200 rounded-full h-1.5">
                <div class="bg-gradient-jm h-1.5 rounded-full" style="width: 60%"></div>
              </div>
            </div>
          </td>
          <td class="px-6 py-4">
            <span class="inline-flex items-center gap-1 bg-jm-success/10 text-jm-success px-2 py-1 rounded-md text-xs font-semibold">
              <span class="w-1.5 h-1.5 rounded-full bg-jm-success"></span>
              Active
            </span>
          </td>
          <td class="px-6 py-4">
            <p class="font-sans text-sm text-jm-gray-500">
              2 hours ago
            </p>
          </td>
          <td class="px-6 py-4 text-right">
            <div class="relative inline-block text-left">
              <button
                type="button"
                class="
                  p-2 rounded-md
                  text-jm-gray-600 hover:text-jm-purple hover:bg-jm-gray-100
                  transition-all duration-200
                  focus:outline-none focus:ring-2 focus:ring-jm-purple focus:ring-offset-1
                "
                aria-label="Actions menu"
              >
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 20 20">
                  <path d="M10 6a2 2 110-4 2 2 010 4zM10 12a2 2 110-4 2 2 010 4zM10 18a2 2 110-4 2 2 010 4z"/>
                </svg>
              </button>
              <!-- Dropdown menu (toggle with JS) -->
            </div>
          </td>
        </tr>

        <!-- User Row 2: Suspended -->
        <tr class="hover:bg-jm-gray-50 transition-colors duration-150 bg-jm-warning/5">
          <td class="px-6 py-4">
            <input
              type="checkbox"
              class="w-4 h-4 rounded border-2 border-jm-gray-300 text-jm-purple cursor-pointer"
            />
          </td>
          <td class="px-6 py-4">
            <div class="flex items-center gap-3">
              <img
                src="/images/users/user-44556.jpg"
                alt=""
                class="w-10 h-10 rounded-full object-cover border border-jm-gray-200 opacity-60"
              />
              <div>
                <p class="font-sans text-sm font-semibold text-jm-gray-900">
                  Emeka T.
                </p>
                <p class="font-sans text-xs text-jm-gray-500">
                  34, Abuja
                </p>
              </div>
            </div>
          </td>
          <td class="px-6 py-4">
            <a
              href="/admin/users/44556"
              class="font-mono text-xs text-jm-purple hover:text-jm-purple-dark underline"
            >
              44556
            </a>
          </td>
          <td class="px-6 py-4">
            <p class="font-sans text-sm text-jm-gray-700">
              emeka.t@example.com
            </p>
          </td>
          <td class="px-6 py-4">
            <span class="inline-flex items-center gap-1 bg-jm-gray-100 text-jm-gray-600 px-2 py-1 rounded-md text-xs font-semibold">
              Free
            </span>
          </td>
          <td class="px-6 py-4">
            <div class="flex items-center gap-2">
              <span class="font-sans text-xs text-jm-gray-600">Tier 2</span>
              <div class="w-16 bg-jm-gray-200 rounded-full h-1.5">
                <div class="bg-gradient-jm h-1.5 rounded-full" style="width: 40%"></div>
              </div>
            </div>
          </td>
          <td class="px-6 py-4">
            <span class="inline-flex items-center gap-1 bg-jm-warning/10 text-jm-warning px-2 py-1 rounded-md text-xs font-semibold">
              <svg class="w-3 h-3" fill="currentColor" viewBox="0 20 20">
                <path fill-rule="evenodd" d="M13.477 14.89A6 6 015.11 6.524l8.367 8.368zm1.414-1.414L6.524 5.11a6 6 018.367 8.367zM18 10a8 8 11-16 8 8 0116z" clip-rule="evenodd"/>
              </svg>
              Suspended
            </span>
          </td>
          <td class="px-6 py-4">
            <p class="font-sans text-sm text-jm-gray-500">
              5 days ago
            </p>
          </td>
          <td class="px-6 py-4 text-right">
            <button
              type="button"
              class="p-2 rounded-md text-jm-gray-600 hover:text-jm-purple hover:bg-jm-gray-100"
            >
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 20 20">
                <path d="M10 6a2 2 110-4 2 2 010 4zM10 12a2 2 110-4 2 2 010 4zM10 18a2 2 110-4 2 2 010 4z"/>
              </svg>
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
      Showing <span class="font-medium">1-20</span> of <span class="font-medium">2,847</span> users
    </p>
    <div class="flex items-center gap-2">
      <button
        class="
          px-3 py-2 rounded-md
          border border-jm-gray-300
          font-sans text-sm text-jm-gray-600
          hover:bg-jm-gray-50
          disabled:opacity-50 disabled:cursor-not-allowed
          transition-colors duration-200
        "
        disabled
      >
        Previous
      </button>
      <button class="px-3 py-2 rounded-md bg-jm-purple text-white font-sans text-sm font-medium">
        1
      </button>
      <button class="px-3 py-2 rounded-md border border-jm-gray-300 font-sans text-sm text-jm-gray-600 hover:bg-jm-gray-50">
        2
      </button>
      <button class="px-3 py-2 rounded-md border border-jm-gray-300 font-sans text-sm text-jm-gray-600 hover:bg-jm-gray-50">
        3
      </button>
      <span class="px-2 text-jm-gray-500">...</span>
      <button class="px-3 py-2 rounded-md border border-jm-gray-300 font-sans text-sm text-jm-gray-600 hover:bg-jm-gray-50">
        143
      </button>
      <button class="px-3 py-2 rounded-md border border-jm-gray-300 font-sans text-sm text-jm-gray-600 hover:bg-jm-gray-50">
        Next
      </button>
    </div>
  </div>
</div>
```

---

### 4. User Detail View

**Purpose:** View and edit individual user account information

**Access:** Click user row or ID → Opens detail view (modal or separate page)

**Sections:**
1. **User Header:** Photo, name, contact info, verification status
2. **Account Info:** Join date, last active, subscription, billing, tier progress
3. **Tier Data:** Expandable accordion for each tier (Tier 1-5)
4. **Activity Log:** Recent user actions (last 20 events)
5. **Admin Notes:** Private notes visible only to admins
6. **Moderation History:** Past warnings, suspensions, bans
7. **Admin Actions:** Edit, Suspend, Ban, Reset Password, Delete

**HTML/Tailwind Example (User Detail Page):**

```html
<!-- User Detail Page -->
<div class="max-w-5xl mx-auto p-6 lg:p-8">
  <!-- Back Navigation -->
  <div class="mb-6">
    <a
      href="/admin/users"
      class="
        inline-flex items-center gap-2
        font-sans text-sm font-medium text-jm-purple hover:text-jm-purple-dark
        transition-colors duration-200
      "
    >
      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
      </svg>
      Back to User List
    </a>
  </div>

  <!-- User Header Card -->
  <div class="bg-white rounded-xl shadow-sm border border-jm-gray-200 p-6 mb-6">
    <div class="flex items-start justify-between mb-6">
      <div class="flex items-start gap-6">
        <!-- User Photo -->
        <img
          src="/images/users/user-78901.jpg"
          alt="Chidinma Okafor"
          class="w-24 h-24 rounded-full object-cover border-2 border-jm-purple"
        />

        <!-- User Info -->
        <div>
          <div class="flex items-center gap-3 mb-2">
            <h1 class="font-serif text-2xl font-bold text-jm-gray-900">
              Chidinma Okafor
            </h1>
            <span class="inline-flex items-center gap-1 bg-jm-success/10 text-jm-success px-2 py-1 rounded-full text-xs font-semibold">
              <svg class="w-3 h-3" fill="currentColor" viewBox="0 20 20">
                <path fill-rule="evenodd" d="M6.267 3.455a3.066 3.066 001.745-.723 3.066 3.066 013.976 3.066 3.066 001.745.723 3.066 3.066 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 010 3.976 3.066 3.066 00-.723 1.745 3.066 3.066 01-2.812 2.812 3.066 3.066 00-1.745.723 3.066 3.066 01-3.976 3.066 3.066 00-1.745-.723 3.066 3.066 01-2.812-2.812 3.066 3.066 00-.723-1.745 3.066 3.066 010-3.976 3.066 3.066 00.723-1.745 3.066 3.066 012.812-2.812zm7.44 5.252a1 1 00-1.414-1.414L9 10.586 7.707 9.293a1 1 00-1.414 1.414l2 2a1 1 001.414l4-4z" clip-rule="evenodd"/>
              </svg>
              Verified
            </span>
          </div>

          <div class="space-y-1 text-sm text-jm-gray-600">
            <p class="flex items-center gap-2">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 002.22L21 8M5 19h14a2 2 002-2V7a2 2 00-2-2H5a2 2 00-2 2v10a2 2 002 2z"/>
              </svg>
              chi.okafor@example.com
            </p>
            <p class="flex items-center gap-2">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 012-2h3.28a1 1 01.948.684l1.498 4.493a1 1 01-.502 1.21l-2.257 1.13a11.042 11.042 005.516 5.516l1.13-2.257a1 1 011.21-.502l4.493 1.498a1 1 01.684.949V19a2 2 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
              </svg>
              +234-803-XXX-XXXX
            </p>
            <p class="flex items-center gap-2">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 01-2.827l-4.244-4.243a8 8 1111.314z"/>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 11-6 3 3 016z"/>
              </svg>
              Lagos, Nigeria
            </p>
            <p class="flex items-center gap-2">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H5a2 2 00-2 2v9a2 2 002 2h14a2 2 002-2V8a2 2 00-2-2h-5m-4V5a2 2 114v1m-4a2 2 104m-5 8a2 2 100-4 2 2 000 4zm0c1.306 2.417.835 2.83 2M9 14a3.001 3.001 00-2.83 2M15 11h3m-3 4h2"/>
              </svg>
              User ID: 78901
            </p>
          </div>
        </div>
      </div>

      <!-- Actions Dropdown -->
      <div class="relative">
        <button
          type="button"
          class="
            bg-gradient-jm hover:bg-gradient-jm-hover
            text-white font-sans font-semibold text-sm
            px-4 py-2 rounded-lg
            inline-flex items-center gap-2
            transition-all duration-200
            shadow-sm hover:shadow-md
            focus:outline-none focus:ring-2 focus:ring-jm-coral focus:ring-offset-2
          "
        >
          Actions
          <svg class="w-4 h-4" fill="currentColor" viewBox="0 20 20">
            <path fill-rule="evenodd" d="M5.293 7.293a1 1 011.414L10 10.586l3.293-3.293a1 1 111.414 1.414l-4 4a1 1 01-1.414l-4-4a1 1 010-1.414z" clip-rule="evenodd"/>
          </svg>
        </button>
        <!-- Dropdown menu (toggle with JS) -->
      </div>
    </div>
  </div>

  <!-- Account Info Card -->
  <div class="bg-white rounded-xl shadow-sm border border-jm-gray-200 p-6 mb-6">
    <h2 class="font-serif text-xl font-bold text-jm-gray-900 mb-4">
      Account Information
    </h2>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <h3 class="font-sans text-sm font-medium text-jm-gray-600 mb-2">
          Account Status
        </h3>
        <div class="space-y-2">
          <p class="font-sans text-sm text-jm-gray-900">
            <span class="text-jm-gray-600">Joined:</span> February 1, 2026
          </p>
          <p class="font-sans text-sm text-jm-gray-900">
            <span class="text-jm-gray-600">Last Active:</span> 2 hours ago
          </p>
          <p class="font-sans text-sm text-jm-gray-900">
            <span class="text-jm-gray-600">Status:</span>
            <span class="inline-flex items-center gap-1 bg-jm-success/10 text-jm-success px-2 py-1 rounded-md text-xs font-semibold ml-2">
              Active
            </span>
          </p>
        </div>
      </div>

      <div>
        <h3 class="font-sans text-sm font-medium text-jm-gray-600 mb-2">
          Subscription & Billing
        </h3>
        <div class="space-y-2">
          <p class="font-sans text-sm text-jm-gray-900">
            <span class="text-jm-gray-600">Plan:</span>
            <span class="inline-flex items-center gap-1 bg-jm-purple/10 text-jm-purple px-2 py-1 rounded-md text-xs font-semibold ml-2">
              Premium
            </span>
          </p>
          <p class="font-sans text-sm text-jm-gray-900">
            <span class="text-jm-gray-600">Billing:</span> ₦18,000/month
          </p>
          <p class="font-sans text-sm text-jm-gray-900">
            <span class="text-jm-gray-600">Next Billing:</span> March 1, 2026
          </p>
          <p class="font-sans text-sm text-jm-gray-900">
            <span class="text-jm-gray-600">Payment Method:</span> Card ending •••• 4242
          </p>
        </div>
      </div>
    </div>

    <!-- Tier Progress -->
    <div class="mt-6 pt-6 border-t border-jm-gray-200">
      <h3 class="font-sans text-sm font-medium text-jm-gray-600 mb-3">
        Tier Progress
      </h3>
      <div class="space-y-3">
        <div class="flex items-center justify-between">
          <span class="font-sans text-sm text-jm-gray-700">
            Tier 3 Complete (60%)
          </span>
          <a
            href="#tier-data"
            class="font-sans text-xs font-medium text-jm-purple hover:text-jm-purple-dark underline"
          >
            View Details
          </a>
        </div>
        <div class="w-full bg-jm-gray-200 rounded-full h-2">
          <div class="bg-gradient-jm h-2 rounded-full transition-all duration-500" style="width: 60%"></div>
        </div>
        <div class="flex items-center justify-between text-xs text-jm-gray-500">
          <span class="font-medium text-jm-success">Tier 1 ✓</span>
          <span class="font-medium text-jm-success">Tier 2 ✓</span>
          <span class="font-medium text-jm-success">Tier 3 ✓</span>
          <span class="font-medium text-jm-gray-400">Tier 4</span>
          <span class="font-medium text-jm-gray-400">Tier 5</span>
        </div>
      </div>
    </div>
  </div>

  <!-- Tier Data Accordion -->
  <div id="tier-data" class="bg-white rounded-xl shadow-sm border border-jm-gray-200 p-6 mb-6">
    <h2 class="font-serif text-xl font-bold text-jm-gray-900 mb-4">
      Tier Data
    </h2>

    <!-- Tier 1 (Expanded) -->
    <div class="border border-jm-gray-200 rounded-lg mb-3">
      <button
        type="button"
        class="
          w-full flex items-center justify-between
          p-4 text-left
          hover:bg-jm-gray-50 transition-colors duration-200
        "
        aria-expanded="true"
        aria-controls="tier-1-content"
      >
        <div class="flex items-center gap-3">
          <svg class="w-5 h-5 text-jm-gray-600 transition-transform duration-200" fill="currentColor" viewBox="0 20 20">
            <path fill-rule="evenodd" d="M5.293 7.293a1 1 011.414L10 10.586l3.293-3.293a1 1 111.414 1.414l-4 4a1 1 01-1.414l-4-4a1 1 010-1.414z" clip-rule="evenodd"/>
          </svg>
          <span class="font-sans text-sm font-semibold text-jm-gray-900">
            Tier 1: Identity & Intent
          </span>
        </div>
        <span class="inline-flex items-center gap-1 bg-jm-success/10 text-jm-success px-2 py-1 rounded-md text-xs font-semibold">
          Complete
        </span>
      </button>
      <div id="tier-1-content" class="p-4 pt-0 border-t border-jm-gray-200">
        <div class="space-y-4">
          <div>
            <p class="font-sans text-xs font-medium text-jm-gray-600 mb-1">Age & Gender</p>
            <p class="font-sans text-sm text-jm-gray-900">31, Female</p>
          </div>
          <div>
            <p class="font-sans text-xs font-medium text-jm-gray-600 mb-1">Location</p>
            <p class="font-sans text-sm text-jm-gray-900">Lagos, Nigeria</p>
          </div>
          <div>
            <p class="font-sans text-xs font-medium text-jm-gray-600 mb-1">Relationship Intent</p>
            <p class="font-sans text-sm text-jm-gray-900">Marriage</p>
          </div>
          <div>
            <p class="font-sans text-xs font-medium text-jm-gray-600 mb-1">Religious Identity</p>
            <p class="font-sans text-sm text-jm-gray-900">Christian (non-denominational)</p>
          </div>
          <div>
            <p class="font-sans text-xs font-medium text-jm-gray-600 mb-1">Occupation Category</p>
            <p class="font-sans text-sm text-jm-gray-900">Technology / Product Management</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Tier 2 (Collapsed) -->
    <div class="border border-jm-gray-200 rounded-lg mb-3">
      <button
        type="button"
        class="
          w-full flex items-center justify-between
          p-4 text-left
          hover:bg-jm-gray-50 transition-colors duration-200
        "
        aria-expanded="false"
        aria-controls="tier-2-content"
      >
        <div class="flex items-center gap-3">
          <svg class="w-5 h-5 text-jm-gray-600 transform -rotate-90 transition-transform duration-200" fill="currentColor" viewBox="0 20 20">
            <path fill-rule="evenodd" d="M5.293 7.293a1 1 011.414L10 10.586l3.293-3.293a1 1 111.414 1.414l-4 4a1 1 01-1.414l-4-4a1 1 010-1.414z" clip-rule="evenodd"/>
          </svg>
          <span class="font-sans text-sm font-semibold text-jm-gray-900">
            Tier 2: Lifestyle & Faith
          </span>
        </div>
        <span class="inline-flex items-center gap-1 bg-jm-success/10 text-jm-success px-2 py-1 rounded-md text-xs font-semibold">
          Complete
        </span>
      </button>
      <div id="tier-2-content" class="hidden p-4 pt-0 border-t border-jm-gray-200">
        <!-- Tier 2 content (similar structure to Tier 1) -->
      </div>
    </div>

    <!-- More tiers... -->
  </div>

  <!-- Activity Log -->
  <div class="bg-white rounded-xl shadow-sm border border-jm-gray-200 p-6 mb-6">
    <h2 class="font-serif text-xl font-bold text-jm-gray-900 mb-4">
      Recent Activity
    </h2>
    <div class="space-y-4">
      <!-- Activity Item -->
      <div class="flex items-start gap-4">
        <div class="bg-jm-purple/10 p-2 rounded-lg">
          <svg class="w-4 h-4 text-jm-purple" fill="currentColor" viewBox="0 20 20">
            <path fill-rule="evenodd" d="M3.172 5.172a4 4 015.656L10 6.343l1.172-1.171a4 4 115.656 5.656L10 17.657l-6.828-6.829a4 4 010-5.656z" clip-rule="evenodd"/>
          </svg>
        </div>
        <div class="flex-1 min-w-0">
          <p class="font-sans text-sm text-jm-gray-900 mb-1">
            Showed interest in <strong>Emeka A.</strong>
          </p>
          <p class="font-sans text-xs text-jm-gray-500">
            1 hour ago
          </p>
        </div>
      </div>

      <!-- More activity items... -->
    </div>
  </div>

  <!-- Admin Actions -->
  <div class="bg-white rounded-xl shadow-sm border border-jm-gray-200 p-6">
    <h2 class="font-serif text-xl font-bold text-jm-gray-900 mb-4">
      Admin Actions
    </h2>
    <div class="flex items-center gap-3 flex-wrap">
      <button class="
        bg-gradient-jm hover:bg-gradient-jm-hover
        text-white font-sans font-semibold text-sm
        px-4 py-2 rounded-lg
        transition-all duration-200
        shadow-sm hover:shadow-md
        focus:outline-none focus:ring-2 focus:ring-jm-coral focus:ring-offset-2
      ">
        Edit Profile
      </button>
      <button class="
        bg-jm-warning hover:bg-jm-warning/90
        text-white font-sans font-semibold text-sm
        px-4 py-2 rounded-lg
        transition-all duration-200
        shadow-sm hover:shadow-md
        focus:outline-none focus:ring-2 focus:ring-jm-warning focus:ring-offset-2
      ">
        Suspend User
      </button>
      <button class="
        border-2 border-jm-gray-300 hover:border-jm-gray-400
        text-jm-gray-700 hover:text-jm-gray-900
        font-sans font-medium text-sm
        px-4 py-2 rounded-lg
        transition-all duration-200
        focus:outline-none focus:ring-2 focus:ring-jm-gray-400 focus:ring-offset-2
      ">
        Reset Password
      </button>
      <button class="
        border-2 border-jm-gray-300 hover:border-jm-gray-400
        text-jm-gray-700 hover:text-jm-gray-900
        font-sans font-medium text-sm
        px-4 py-2 rounded-lg
        transition-all duration-200
        focus:outline-none focus:ring-2 focus:ring-jm-gray-400 focus:ring-offset-2
      ">
        View Reports
      </button>
      <button class="
        border-2 border-jm-error hover:border-jm-error/80
        text-jm-error hover:text-jm-error/80
        font-sans font-medium text-sm
        px-4 py-2 rounded-lg
        transition-all duration-200
        focus:outline-none focus:ring-2 focus:ring-jm-error focus:ring-offset-2
      ">
        Delete Account
      </button>
    </div>
  </div>
</div>
```

---

## Admin Actions & Workflows

### 1. Search User Workflow

**Goal:** Find specific user by ID, name, or email

**Steps:**
1. Admin enters search query in search bar
2. System searches:
   - User ID (exact match)
   - Name (partial match, case-insensitive)
   - Email (partial match)
3. Results display in table
4. Admin clicks user row → Opens detail view

**Backend Query:**

```javascript
// Search users
async function searchUsers(query, adminRole) {
  const searchQuery = {
    $or: [
      { userId: query }, // Exact ID match
      { name: { $regex: query, $options: 'i' } }, // Name partial match
      { email: { $regex: query, $options: 'i' } } // Email partial match
    ]
  };

  // Apply role-based filters
  if (adminRole === 'vipCoordinator') {
    searchQuery.subscription = 'vip'; // VIP Coordinator sees VIP users only
  } else if (adminRole === 'vipExpert') {
    // VIP Expert sees assigned clients only
    const assignedClientIds = await getAssignedClientIds(adminId);
    searchQuery.userId = { $in: assignedClientIds };
  }

  const users = await User.find(searchQuery)
    .select('userId name email subscription tierProgress status lastActive')
    .limit(20);

  return users;
}
```

---

### 2. Suspend User Workflow

**Goal:** Temporarily suspend user for policy violation

**Permitted Roles:**
- Super Admin: Indefinite suspension
- Moderator: Max 30 days suspension
- VIP Coordinator: Cannot suspend

**Steps:**
1. Admin clicks "Suspend User" button
2. Suspension modal opens
3. Admin selects:
   - Duration (7, 14, 30 days, indefinite)
   - Reason (dropdown: Harassment, Inappropriate Content, Scam, etc.)
   - Additional notes (text area)
4. Admin clicks "Confirm Suspension"
5. System:
   - Logs out user from all devices
   - Hides profile from discover
   - Freezes conversations
   - Sends suspension email to user
   - Logs action to audit trail
6. Admin sees confirmation

**HTML: Suspension Modal**

```html
<!-- Suspend User Modal -->
<div
  id="suspend-modal"
  class="
    fixed inset-0 bg-jm-gray-900/50 backdrop-blur-sm z-50
    flex items-center justify-center p-4
  "
  role="dialog"
  aria-modal="true"
  aria-labelledby="suspend-modal-title"
>
  <div class="
    bg-white rounded-2xl shadow-2xl
    w-full max-w-lg
    max-h-[90vh] overflow-y-auto
  ">
    <div class="p-6 space-y-6">
      <!-- Modal Header -->
      <div>
        <h2 id="suspend-modal-title" class="font-serif text-2xl font-bold text-jm-gray-900 mb-2">
          Suspend User
        </h2>
        <p class="font-sans text-sm text-jm-gray-600">
          Temporarily suspend <strong>Chidinma Okafor</strong> (ID: 78901)
        </p>
      </div>

      <!-- Form -->
      <form class="space-y-4">
        <!-- Duration -->
        <div>
          <label class="block font-sans text-sm font-medium text-jm-gray-700 mb-2">
            Suspension Duration
          </label>
          <div class="space-y-2">
            <label class="flex items-center gap-3 cursor-pointer">
              <input
                type="radio"
                name="duration"
                value="7"
                class="w-4 h-4 text-jm-purple focus:ring-2 focus:ring-jm-purple/20"
              />
              <span class="font-sans text-sm text-jm-gray-700">7 days</span>
            </label>
            <label class="flex items-center gap-3 cursor-pointer">
              <input
                type="radio"
                name="duration"
                value="14"
                class="w-4 h-4 text-jm-purple focus:ring-2 focus:ring-jm-purple/20"
                checked
              />
              <span class="font-sans text-sm text-jm-gray-700">14 days</span>
            </label>
            <label class="flex items-center gap-3 cursor-pointer">
              <input
                type="radio"
                name="duration"
                value="30"
                class="w-4 h-4 text-jm-purple focus:ring-2 focus:ring-jm-purple/20"
              />
              <span class="font-sans text-sm text-jm-gray-700">30 days</span>
            </label>
            <!-- Super Admin only -->
            <label class="flex items-center gap-3 cursor-pointer" data-role-required="superAdmin">
              <input
                type="radio"
                name="duration"
                value="indefinite"
                class="w-4 h-4 text-jm-purple focus:ring-2 focus:ring-jm-purple/20"
              />
              <span class="font-sans text-sm text-jm-gray-700">Indefinite (pending review)</span>
            </label>
          </div>
        </div>

        <!-- Reason -->
        <div>
          <label for="suspend-reason" class="block font-sans text-sm font-medium text-jm-gray-700 mb-2">
            Reason
          </label>
          <select
            id="suspend-reason"
            name="reason"
            class="
              w-full px-4 py-3 rounded-lg
              border-2 border-jm-gray-300 focus:border-jm-purple focus:ring-2 focus:ring-jm-purple/20
              font-sans text-base text-jm-gray-900
              focus:outline-none
            "
            required
          >
            <option value="">Select reason</option>
            <option value="harassment">Harassment</option>
            <option value="inappropriate_content">Inappropriate Content</option>
            <option value="scam">Scam/Fraud</option>
            <option value="fake_profile">Fake Profile</option>
            <option value="spam">Spam</option>
            <option value="other">Other</option>
          </select>
        </div>

        <!-- Additional Notes -->
        <div>
          <label for="suspend-notes" class="block font-sans text-sm font-medium text-jm-gray-700 mb-2">
            Additional Notes (Internal)
          </label>
          <textarea
            id="suspend-notes"
            name="notes"
            rows="4"
            placeholder="Add any additional context for this suspension..."
            class="
              w-full px-4 py-3 rounded-lg
              border-2 border-jm-gray-300 focus:border-jm-purple focus:ring-2 focus:ring-jm-purple/20
              font-sans text-base text-jm-gray-900 placeholder:text-jm-gray-400
              focus:outline-none
              resize-vertical
            "
          ></textarea>
        </div>

        <!-- Warning -->
        <div class="bg-jm-warning/10 border-l-4 border-jm-warning p-4 rounded-r-lg">
          <p class="font-sans text-sm text-jm-gray-700">
            <strong>Warning:</strong> This action will immediately log the user out from all devices,
            hide their profile, and freeze their conversations. The user will receive an email notification.
          </p>
        </div>
      </form>

      <!-- Modal Footer -->
      <div class="flex gap-3">
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
          onclick="closeSuspendModal()"
        >
          Cancel
        </button>
        <button
          type="submit"
          class="
            flex-1 bg-jm-warning hover:bg-jm-warning/90
            text-white font-sans font-semibold
            px-4 py-3 rounded-lg
            transition-all duration-200
            shadow-sm hover:shadow-md
            focus:outline-none focus:ring-2 focus:ring-jm-warning focus:ring-offset-2
          "
        >
          Suspend User
        </button>
      </div>
    </div>
  </div>
</div>
```

---

### 3. Ban User Workflow (Super Admin Only)

**Goal:** Permanently ban user for severe policy violations

**Steps:**
1. Super Admin clicks "Ban User" button
2. Ban confirmation modal opens (requires password re-entry for critical action)
3. Super Admin selects:
   - Reason (dropdown)
   - Additional notes
4. Super Admin re-enters password
5. Super Admin clicks "Confirm Permanent Ban"
6. System:
   - Permanently bans user
   - Processes pro-rata refund (if Premium/VIP)
   - Sends final notification email
   - Marks data for anonymization (30-day grace period)
   - Logs action to audit trail
7. Super Admin sees confirmation

---

### 4. Edit Profile Workflow

**Goal:** Edit user profile data (correct errors, remove inappropriate content)

**Permitted Roles:**
- Super Admin: Edit all fields
- Moderator: Remove inappropriate content only
- VIP Coordinator: Edit VIP-related fields only

**Steps:**
1. Admin clicks "Edit Profile" button
2. Edit modal opens with form fields
3. Admin modifies fields
4. Admin clicks "Save Changes"
5. System:
   - Validates changes
   - Updates user profile
   - Logs action to audit trail
   - Sends email notification to user (if significant changes)
6. Admin sees confirmation

---

## Permissions & Authorization Checks

### Backend Authorization Middleware

```javascript
// Check if admin can view user
function canViewUser(admin, user) {
  if (admin.role === 'superAdmin') return true;
  if (admin.role === 'moderator') return true;
  if (admin.role === 'vipCoordinator' && user.subscription === 'vip') return true;
  if (admin.role === 'vipExpert') {
    // Check assignment
    const isAssigned = VIPAssignment.exists({
      expertId: admin.id,
      vipUserId: user.id,
      status: 'active'
    });
    return isAssigned;
  }
  if (admin.role === 'supportAgent') return true; // Limited view (Tier 1 only)
  if (admin.role === 'dataOfficer') return true; // Data context only

  return false;
}

// Check if admin can edit user
function canEditUser(admin, user) {
  if (admin.role === 'superAdmin') return true;
  if (admin.role === 'moderator') return true; // Content removal only
  if (admin.role === 'vipCoordinator' && user.subscription === 'vip') return true;
  return false;
}

// Check if admin can suspend user
function canSuspendUser(admin, user) {
  if (admin.role === 'superAdmin') return true;
  if (admin.role === 'moderator') return true; // Max 30 days
  return false;
}

// Check if admin can permanently ban user
function canBanUser(admin, user) {
  return admin.role === 'superAdmin';
}
```

---

## Audit Logging Requirements

**ALL user management actions must be logged.**

### Log Structure

```javascript
const UserManagementAuditLog = {
  timestamp: Date,
  adminId: ObjectId,
  adminRole: String,
  action: String, // 'view_user', 'edit_user', 'suspend_user', 'ban_user', etc.
  targetUserId: ObjectId,
  ipAddress: String,
  userAgent: String,
  details: Object, // Action-specific metadata
  result: String // 'success', 'denied', 'error'
};
```

### Example Log Entries

```javascript
// View user
{
  timestamp: "2026-02-27T10:30:00Z",
  adminId: "admin_005",
  adminRole: "moderator",
  action: "view_user",
  targetUserId: "user_78901",
  ipAddress: "192.168.1.105",
  userAgent: "Mozilla/5.0...",
  details: { viewType: "detail_page" },
  result: "success"
}

// Suspend user
{
  timestamp: "2026-02-27T11:45:00Z",
  adminId: "admin_005",
  adminRole: "moderator",
  action: "suspend_user",
  targetUserId: "user_44556",
  ipAddress: "192.168.1.105",
  userAgent: "Mozilla/5.0...",
  details: {
    duration: 14,
    reason: "harassment",
    notes: "Multiple unwanted messages after Show Interest declined",
    suspendUntil: "2026-03-13T11:45:00Z"
  },
  result: "success"
}

// Ban user (Super Admin)
{
  timestamp: "2026-02-27T14:00:00Z",
  adminId: "admin_001",
  adminRole: "superAdmin",
  action: "ban_user_permanent",
  targetUserId: "user_44556",
  ipAddress: "10.0.0.10",
  userAgent: "Mozilla/5.0...",
  details: {
    reason: "pattern_of_harassment",
    previousSuspensions: 3,
    refundProcessed: true,
    refundAmount: "₦12,000"
  },
  result: "success"
}
```

---

## Accessibility Requirements

**WCAG 2.1 AA Compliance:**

1. **Keyboard Navigation:** All interactive elements accessible via Tab key
2. **Screen Reader Support:** ARIA labels on all icon buttons, table headers properly labeled
3. **Color Contrast:** Minimum 4.5:1 for normal text
4. **Focus Indicators:** Visible focus rings on all focusable elements
5. **Semantic HTML:** Proper heading hierarchy, table structure

**Example:**

```html
<!-- Accessible Table -->
<table>
  <caption class="sr-only">User list with account information and actions</caption>
  <thead>
    <tr>
      <th scope="col">User</th>
      <th scope="col">ID</th>
      <th scope="col">Email</th>
      <!-- More headers -->
    </tr>
  </thead>
  <tbody>
    <!-- Rows -->
  </tbody>
</table>

<!-- Screen Reader Only Text -->
<span class="sr-only">User ID: 78901</span>
```

---

## Error Handling

### Frontend Error Handling

```javascript
// Search users
async function searchUsers(query) {
  try {
    const response = await fetch(`/admin/api/users/search?q=${encodeURIComponent(query)}`, {
      headers: {
        'Authorization': `Bearer ${sessionToken}`
      }
    });

    if (response.status === 403) {
      showErrorNotification('Access Denied', 'You do not have permission to view this user.');
      return;
    }

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const users = await response.json();
    renderUserTable(users);
  } catch (error) {
    console.error('User search failed:', error);
    showErrorNotification('Search Failed', 'Unable to search users. Please try again.');
  }
}
```

---

## Related Documentation

- [Admin Architecture](../../Admin%20System/admin_architecture.md) - Overall admin system design
- [Admin Roles & Permissions](../../Admin%20System/admin_roles_permissions.md) - Permission matrices
- [Moderation Workflows](../../Admin%20System/moderation_workflows.md) - Moderation procedures
- [HTML Implementation Guide](../../Design%20System/html_implementation_guide.md) - Tailwind patterns

---

**Document Owner:** Product Lead & Engineering Lead
**Last Reviewed:** 2026-02-27
**Next Review:** Weekly during implementation
**Implementation Priority:** P0 (Critical - Required for MVP)
