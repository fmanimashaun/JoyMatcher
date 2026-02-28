# VIP Expert Dashboard Feature Specification

**Version:** 1.0.0
**Last Updated:** 2026-02-27
**Status:** Complete - Ready for Implementation
**Classification:** Admin Feature Specification

---

## Overview

The VIP Expert Dashboard is the specialized interface for freelance VIP Experts to manage their assigned VIP clients, search for compatible matches, create introduction proposals, provide relationship coaching, and track client satisfaction. VIP Experts operate within strict data isolation constraints and must respect the tiered consent model when accessing VIP client profiles.

**Document Purpose:** This specification provides complete implementation details for the VIP Expert Dashboard, including layouts, tiered consent access controls, introduction workflows, client management, performance tracking, HTML/Tailwind examples, and conflict-of-interest prevention.

---

## Admin Role Access

### Access Matrix

| Admin Role | Access Level | Permitted Actions |
|------------|--------------|-------------------|
| VIP Expert | VIP Expert Access Only | Manage assigned clients, search matches, create introductions, provide coaching |
| Super Admin | Full Access (Oversight) | View all expert dashboards, monitor performance, reassign clients |
| VIP Coordinator | Oversight Access | View expert performance, review introduction proposals, resolve conflicts |
| Moderator | No Access | Cannot access VIP Expert dashboard |
| Data Protection Officer | No Access | No access to VIP matchmaking functions |
| Support Agent | No Access | Cannot access VIP Expert dashboard |

**Critical Constraint:** VIP Experts can ONLY access data for their assigned VIP clients. They have NO access to Free or Premium users, and NO access to VIP clients assigned to other experts.

---

## Page Purpose & Admin Goals

### VIP Expert Goals

1. **Client Management:** Understand assigned VIP clients' preferences, deal-breakers, and marriage vision
2. **Match Search:** Search JoyMatcher platform for compatible VIP matches for assigned clients
3. **Tiered Access Requests:** Request access to higher tiers of potential matches (respecting consent model)
4. **Introduction Proposals:** Create thoughtful introduction proposals for VIP Coordinator approval
5. **Coaching:** Provide ongoing relationship coaching and support to assigned clients
6. **Performance Tracking:** Monitor own performance metrics (acceptance rate, client satisfaction)
7. **Conflict Avoidance:** System automatically prevents expert from being assigned to both parties in a potential match

---

## Layout & Wireframe Description

### Page Structure

```
┌─────────────────────────────────────────────────────────────────┐
│ TOP NAVIGATION BAR                                              │
│ Logo | VIP Expert Dashboard | Expert Badge | Profile | Logout   │
├──────────────┬──────────────────────────────────────────────────┤
│              │                                                  │
│   SIDEBAR    │          MAIN CONTENT AREA                      │
│   NAVIGATION │                                                  │
│              │   ┌────────────────────────────────────────┐    │
│   - Dashboard│   │  METRIC CARDS ROW                      │    │
│   - Clients  │   │  [Clients] [Intros] [Accepted] [Rating]│   │
│   - Search   │   └────────────────────────────────────────┘    │
│   - Intros   │                                                  │
│   - Performance│  ┌────────────────────────────────────────┐   │
│              │   │  ASSIGNED CLIENTS LIST                 │    │
│   CLIENT     │   │  ┌──────────────────────────────┐      │    │
│   QUICK LIST │   │  │ Chidinma O. (31, Lagos)      │      │    │
│   (Active)   │   │  │ Tier 4 | Active              │      │    │
│              │   │  │ Last contact: 2 days ago     │      │    │
│   - Client 1 │   │  │ [View Profile] [Search]      │      │    │
│   - Client 2 │   │  └──────────────────────────────┘      │    │
│   - Client 3 │   │  ┌──────────────────────────────┐      │    │
│   - Client 4 │   │  │ Emmanuel A. (34, Lagos)      │      │    │
│              │   │  │ Tier 3 | Active              │      │    │
│              │   │  │ Last contact: 5 days ago     │      │    │
│              │   │  │ [View Profile] [Search]      │      │    │
│              │   │  └──────────────────────────────┘      │    │
│              │   └────────────────────────────────────────┘    │
│              │                                                  │
└──────────────┴──────────────────────────────────────────────────┘
```

### Responsive Behavior

- **Desktop (≥1024px):** Sidebar + Main Content (2-column layout)
- **Tablet (768px-1023px):** Collapsible sidebar, full-width main content
- **Mobile (<768px):** Bottom tab navigation, full-width content

---

## VIP Expert Tiered Consent Model

### Core Principle

**VIP Experts MUST respect the tiered consent model when accessing potential match profiles.**

Even though VIP Experts are facilitating introductions on behalf of VIP clients, they cannot access higher tiers of potential matches without explicit consent from those users.

### Tiered Access Flow

```
┌─────────────────────────────────────────────────────────────────┐
│              VIP EXPERT TIERED ACCESS FLOW                      │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  1. Expert searches for matches for VIP Client A               │
│     │                                                           │
│     ├─> System shows potential matches based on Client A's     │
│     │   preferences                                             │
│     │                                                           │
│     └─> Expert can view:                                       │
│         ├─> Tier 1 data (always visible - public)             │
│         └─> Tier 2+ data ONLY if Client B has granted access  │
│                                                                 │
│  2. Expert wants to see Client B's Tier 3 data                │
│     │                                                           │
│     ├─> Expert clicks "Request Details Access"                │
│     │                                                           │
│     ├─> System sends request to Client B:                     │
│     │   "VIP Expert [Name] (working on behalf of a VIP client) │
│     │   is requesting access to your Tier 3 data for           │
│     │   potential introduction. Grant access?"                 │
│     │                                                           │
│     └─> Client B Decides:                                      │
│         ├─> GRANT → Expert can now view Tier 3                │
│         └─> DENY → Expert cannot access Tier 3                │
│                                                                 │
│  3. Expert reviews granted tier data                          │
│     │                                                           │
│     ├─> Assess compatibility                                  │
│     │                                                           │
│     └─> If compatible → Create introduction proposal          │
│                                                                 │
│  4. VIP Coordinator reviews introduction proposal             │
│     │                                                           │
│     ├─> Check for conflict of interest (both clients          │
│     │   assigned to same expert)                              │
│     │                                                           │
│     ├─> If conflict → Reassign one client to another expert  │
│     │                                                           │
│     └─> If no conflict → Approve introduction                │
│                                                                 │
│  5. Introduction facilitated                                  │
│     │                                                           │
│     ├─> Expert A manages Client A                             │
│     ├─> Expert B manages Client B (if reassigned)             │
│     └─> Experts collaborate on introduction logistics         │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### Access Rules

| Tier | VIP Expert Access | Notes |
|------|-------------------|-------|
| Tier 1 | Always Visible | Public data (age, location, occupation category, religious identity) |
| Tier 2 | Requires Consent | Lifestyle, faith details, personality, hobbies |
| Tier 3 | Requires Consent | Relationships, family, marriage vision |
| Tier 4 | Requires Consent | Financial, health, background |
| Tier 5 | Never Accessible | Identity verification (VIP Coordinator only) |

**Exception:** VIP Experts can view ALL tiers (1-4) of their assigned VIP clients without additional consent (client already consented by choosing VIP service).

---

## Component Breakdown

### 1. Top Navigation Bar

**Purpose:** Global navigation, role identification, expert profile

**HTML/Tailwind Example:**

```html
<!-- Top Navigation Bar -->
<header class="bg-white border-b border-jm-gray-200 sticky top-0 z-50 shadow-sm">
  <nav class="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
    <div class="flex items-center justify-between h-16">
      <!-- Left: Logo + Dashboard Title -->
      <div class="flex items-center gap-6">
        <a href="/expert/dashboard" class="flex items-center gap-3">
          <img src="/images/logo.svg" alt="JoyMatcher VIP" class="h-8 w-8" />
          <span class="font-serif text-lg font-bold text-jm-gray-900 hidden md:inline">
            VIP Expert
          </span>
        </a>

        <!-- Expert Badge -->
        <span class="
          bg-gradient-jm text-white
          px-3 py-1 rounded-full
          text-xs font-semibold
          shadow-sm
          flex items-center gap-1
        ">
          <svg class="w-3 h-3" fill="currentColor" viewBox="0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902l1.07 3.292a1 1 00.95.69h3.462c.969 1.371 1.24.588 1.81l-2.8 2.034a1 1 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 00-1.175l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 00.951-.69l1.07-3.292z"/>
          </svg>
          VIP Expert
        </span>

        <!-- Performance Badge -->
        <div class="hidden lg:flex items-center gap-2 text-sm text-jm-gray-600">
          <svg class="w-4 h-4 text-jm-success" fill="currentColor" viewBox="0 20 20">
            <path fill-rule="evenodd" d="M10 18a8 8 100-16 8 8 000 16zm3.707-9.293a1 1 00-1.414-1.414L9 10.586 7.707 9.293a1 1 00-1.414 1.414l2 2a1 1 001.414l4-4z" clip-rule="evenodd"/>
          </svg>
          <span class="font-medium">4.9★ Rating</span>
        </div>
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
            bg-jm-success text-white
            text-xs font-bold
            w-5 h-5 flex items-center justify-center
            rounded-full border-2 border-white
          ">
            2
          </span>
        </button>

        <!-- Profile Dropdown -->
        <div class="relative">
          <button
            type="button"
            class="flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-jm-purple rounded-full"
            aria-label="Account menu"
            id="expert-profile-button"
          >
            <img
              src="/images/experts/chiamaka.jpg"
              alt="Chiamaka Nwosu"
              class="w-9 h-9 rounded-full border-2 border-jm-purple"
            />
            <span class="font-sans text-sm font-medium text-jm-gray-700 hidden md:inline">
              Chiamaka Nwosu
            </span>
            <svg class="w-4 h-4 text-jm-gray-600" fill="currentColor" viewBox="0 20 20">
              <path fill-rule="evenodd" d="M5.293 7.293a1 1 011.414L10 10.586l3.293-3.293a1 1 111.414 1.414l-4 4a1 1 01-1.414l-4-4a1 1 010-1.414z" clip-rule="evenodd"/>
            </svg>
          </button>

          <!-- Dropdown Menu -->
          <div
            id="expert-profile-dropdown"
            class="
              hidden absolute right-0 mt-2 w-56
              bg-white rounded-lg shadow-lg border border-jm-gray-200
              py-2 z-50
            "
          >
            <a href="/expert/account/profile" class="block px-4 py-2 text-sm text-jm-gray-700 hover:bg-jm-gray-50 transition-colors">
              My Profile
            </a>
            <a href="/expert/account/performance" class="block px-4 py-2 text-sm text-jm-gray-700 hover:bg-jm-gray-50 transition-colors">
              Performance Metrics
            </a>
            <a href="/expert/account/payments" class="block px-4 py-2 text-sm text-jm-gray-700 hover:bg-jm-gray-50 transition-colors">
              Payments & Earnings
            </a>
            <div class="border-t border-jm-gray-200 my-2"></div>
            <a href="/expert/logout" class="block px-4 py-2 text-sm text-jm-error hover:bg-jm-error/5 transition-colors">
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

**Purpose:** Primary navigation to expert functions

**HTML/Tailwind Example:**

```html
<!-- Sidebar Navigation -->
<aside class="
  w-64 bg-white border-r border-jm-gray-200
  h-screen sticky top-16 overflow-y-auto
  hidden lg:block
">
  <nav class="p-4 space-y-2" aria-label="VIP Expert navigation">
    <!-- Dashboard (Active) -->
    <a
      href="/expert/dashboard"
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

    <!-- My Clients -->
    <a
      href="/expert/clients"
      class="
        flex items-center gap-3 px-4 py-3 rounded-lg
        text-jm-gray-700 hover:bg-jm-gray-50 hover:text-jm-purple
        transition-all duration-200
      "
    >
      <svg class="w-5 h-5" fill="currentColor" viewBox="0 20 20">
        <path d="M9 6a3 3 11-6 3 3 016zM17 6a3 3 11-6 3 3 016zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 00-1.5-4.33A5 5 0119 16v1h-6.07zM6 11a5 5 015 5v1H1v-1a5 5 015-5z"/>
      </svg>
      My Clients
      <span class="ml-auto bg-jm-purple text-white text-xs font-bold px-2 py-0.5 rounded-full">
        5
      </span>
    </a>

    <!-- Search Matches -->
    <a
      href="/expert/search"
      class="
        flex items-center gap-3 px-4 py-3 rounded-lg
        text-jm-gray-700 hover:bg-jm-gray-50 hover:text-jm-purple
        transition-all duration-200
      "
    >
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 11-14 7 7 0114z"/>
      </svg>
      Search Matches
    </a>

    <!-- Introduction Proposals -->
    <a
      href="/expert/introductions"
      class="
        flex items-center gap-3 px-4 py-3 rounded-lg
        text-jm-gray-700 hover:bg-jm-gray-50 hover:text-jm-purple
        transition-all duration-200
      "
    >
      <svg class="w-5 h-5" fill="currentColor" viewBox="0 20 20">
        <path fill-rule="evenodd" d="M3.172 5.172a4 4 015.656L10 6.343l1.172-1.171a4 4 115.656 5.656L10 17.657l-6.828-6.829a4 4 010-5.656z" clip-rule="evenodd"/>
      </svg>
      Introductions
      <span class="ml-auto text-xs text-jm-gray-500">3 pending</span>
    </a>

    <!-- Performance -->
    <a
      href="/expert/performance"
      class="
        flex items-center gap-3 px-4 py-3 rounded-lg
        text-jm-gray-700 hover:bg-jm-gray-50 hover:text-jm-purple
        transition-all duration-200
      "
    >
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 00-2-2H5a2 2 00-2 2v6a2 2 002 2h2a2 2 002-2zm0V9a2 2 012-2h2a2 2 012 2v10m-6a2 2 002 2h2a2 2 002-2m0V5a2 2 012-2h2a2 2 012 2v14a2 2 01-2 2h-2a2 2 01-2-2z"/>
      </svg>
      Performance
    </a>

    <!-- Divider -->
    <div class="border-t border-jm-gray-200 my-4"></div>

    <!-- Active Clients Quick List -->
    <div class="px-4 py-2">
      <h3 class="font-sans text-xs font-semibold text-jm-gray-500 uppercase tracking-wide mb-3">
        Active Clients
      </h3>
      <div class="space-y-2">
        <!-- Client 1 -->
        <a
          href="/expert/clients/78901"
          class="
            block px-3 py-2 rounded-lg
            text-jm-gray-700 hover:bg-jm-gray-50
            transition-colors duration-200
          "
        >
          <p class="font-sans text-sm font-medium">Chidinma O.</p>
          <p class="font-sans text-xs text-jm-gray-500">31, Lagos | Tier 4</p>
        </a>

        <!-- Client 2 -->
        <a
          href="/expert/clients/78902"
          class="
            block px-3 py-2 rounded-lg
            text-jm-gray-700 hover:bg-jm-gray-50
            transition-colors duration-200
          "
        >
          <p class="font-sans text-sm font-medium">Blessing I.</p>
          <p class="font-sans text-xs text-jm-gray-500">29, Abuja | Tier 3</p>
        </a>

        <!-- Client 3 -->
        <a
          href="/expert/clients/78903"
          class="
            block px-3 py-2 rounded-lg
            text-jm-gray-700 hover:bg-jm-gray-50
            transition-colors duration-200
          "
        >
          <p class="font-sans text-sm font-medium">Adaeze M.</p>
          <p class="font-sans text-xs text-jm-gray-500">33, Lagos | Tier 4</p>
        </a>
      </div>
    </div>
  </nav>
</aside>
```

---

### 3. Metric Cards Row

**Purpose:** Display key expert performance metrics

**HTML/Tailwind Example:**

```html
<!-- Metric Cards Row -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
  <!-- Metric Card 1: Active Clients -->
  <div class="bg-white rounded-xl shadow-sm border border-jm-gray-200 p-6 space-y-3">
    <div class="flex items-center justify-between">
      <h3 class="font-sans text-sm font-medium text-jm-gray-600">
        Active Clients
      </h3>
      <div class="bg-jm-purple/10 p-2 rounded-lg">
        <svg class="w-5 h-5 text-jm-purple" fill="currentColor" viewBox="0 20 20">
          <path d="M9 6a3 3 11-6 3 3 016zM17 6a3 3 11-6 3 3 016zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 00-1.5-4.33A5 5 0119 16v1h-6.07zM6 11a5 5 015 5v1H1v-1a5 5 015-5z"/>
        </svg>
      </div>
    </div>
    <div class="space-y-1">
      <p class="font-serif text-3xl font-bold text-jm-gray-900">
        5
      </p>
      <p class="font-sans text-xs text-jm-gray-500">
        Capacity: 5 / 6
      </p>
    </div>
  </div>

  <!-- Metric Card 2: Introductions This Month -->
  <div class="bg-white rounded-xl shadow-sm border border-jm-gray-200 p-6 space-y-3">
    <div class="flex items-center justify-between">
      <h3 class="font-sans text-sm font-medium text-jm-gray-600">
        Introductions (Month)
      </h3>
      <div class="bg-jm-success/10 p-2 rounded-lg">
        <svg class="w-5 h-5 text-jm-success" fill="currentColor" viewBox="0 20 20">
          <path fill-rule="evenodd" d="M3.172 5.172a4 4 015.656L10 6.343l1.172-1.171a4 4 115.656 5.656L10 17.657l-6.828-6.829a4 4 010-5.656z" clip-rule="evenodd"/>
        </svg>
      </div>
    </div>
    <div class="space-y-1">
      <p class="font-serif text-3xl font-bold text-jm-gray-900">
        14
      </p>
      <p class="font-sans text-xs text-jm-gray-500">
        Target: 2-3 per client/month
      </p>
    </div>
  </div>

  <!-- Metric Card 3: Acceptance Rate -->
  <div class="bg-white rounded-xl shadow-sm border border-jm-gray-200 p-6 space-y-3">
    <div class="flex items-center justify-between">
      <h3 class="font-sans text-sm font-medium text-jm-gray-600">
        Acceptance Rate
      </h3>
      <div class="bg-jm-success/10 p-2 rounded-lg">
        <svg class="w-5 h-5 text-jm-success" fill="currentColor" viewBox="0 20 20">
          <path fill-rule="evenodd" d="M10 18a8 8 100-16 8 8 000 16zm3.707-9.293a1 1 00-1.414-1.414L9 10.586 7.707 9.293a1 1 00-1.414 1.414l2 2a1 1 001.414l4-4z" clip-rule="evenodd"/>
        </svg>
      </div>
    </div>
    <div class="space-y-1">
      <p class="font-serif text-3xl font-bold text-jm-gray-900">
        79%
      </p>
      <p class="font-sans text-xs text-jm-success flex items-center gap-1">
        <svg class="w-3 h-3" fill="currentColor" viewBox="0 20 20">
          <path fill-rule="evenodd" d="M12 7a1 1 110-2h5a1 1 011 1v5a1 1 11-2V8.414l-4.293 4.293a1 1 01-1.414L8 10.414l-4.293 4.293a1 1 01-1.414-1.414l5-5a1 1 011.414L11 10.586 14.586 7H12z" clip-rule="evenodd"/>
        </svg>
        Above 60% target
      </p>
    </div>
  </div>

  <!-- Metric Card 4: Client Satisfaction -->
  <div class="bg-white rounded-xl shadow-sm border border-jm-gray-200 p-6 space-y-3">
    <div class="flex items-center justify-between">
      <h3 class="font-sans text-sm font-medium text-jm-gray-600">
        Client Satisfaction
      </h3>
      <div class="bg-gradient-jm p-2 rounded-lg">
        <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902l1.07 3.292a1 1 00.95.69h3.462c.969 1.371 1.24.588 1.81l-2.8 2.034a1 1 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 00-1.175l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 00.951-.69l1.07-3.292z"/>
        </svg>
      </div>
    </div>
    <div class="space-y-1">
      <p class="font-serif text-3xl font-bold text-jm-gray-900">
        4.9
      </p>
      <p class="font-sans text-xs text-jm-gray-500">
        out of 5.0 stars
      </p>
    </div>
  </div>
</div>
```

---

### 4. Assigned Clients List

**Purpose:** Display assigned VIP clients with quick actions

**HTML/Tailwind Example:**

```html
<!-- Assigned Clients List -->
<div class="bg-white rounded-xl shadow-sm border border-jm-gray-200 mb-8">
  <div class="p-6 border-b border-jm-gray-200">
    <h2 class="font-serif text-xl font-bold text-jm-gray-900">
      My Assigned Clients
    </h2>
    <p class="font-sans text-sm text-jm-gray-600 mt-1">
      5 active clients | Capacity: 5/6
    </p>
  </div>

  <div class="divide-y divide-jm-gray-200">
    <!-- Client 1 -->
    <article class="p-6 hover:bg-jm-gray-50 transition-colors duration-200">
      <div class="flex items-start gap-4">
        <!-- Client Photo -->
        <div class="flex-shrink-0">
          <img
            src="/images/vip/chidinma.jpg"
            alt="Chidinma O."
            class="w-16 h-16 rounded-full border-2 border-jm-purple object-cover"
          />
        </div>

        <!-- Client Details -->
        <div class="flex-1 min-w-0 space-y-3">
          <div class="flex items-start justify-between">
            <div>
              <h3 class="font-sans text-lg font-semibold text-jm-gray-900">
                Chidinma O., 31
              </h3>
              <div class="flex items-center gap-3 mt-1 text-sm text-jm-gray-600">
                <span class="flex items-center gap-1">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 01-2.827l-4.244-4.243a8 8 1111.314z"/>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 11-6 3 3 016z"/>
                  </svg>
                  Lagos, Nigeria
                </span>
                <span class="flex items-center gap-1">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0112 15c-3.183-6.22-.62-9-1.745M16 6V4a2 2 00-2-2h-4a2 2 00-2 2v2m4 6h.01M5 20h14a2 2 002-2V8a2 2 00-2-2H5a2 2 00-2 2v10a2 2 002 2z"/>
                  </svg>
                  Product Manager
                </span>
              </div>
            </div>

            <!-- Status Badge -->
            <div class="flex items-center gap-2">
              <span class="inline-flex items-center gap-1 bg-jm-success/10 text-jm-success px-2 py-1 rounded-md text-xs font-semibold">
                <span class="w-2 h-2 bg-jm-success rounded-full"></span>
                Active
              </span>
              <span class="inline-flex items-center gap-1 bg-jm-purple/10 text-jm-purple px-2 py-1 rounded-md text-xs font-semibold">
                Tier 4 Complete
              </span>
            </div>
          </div>

          <!-- Client Summary -->
          <div class="bg-jm-gray-50 rounded-lg p-4 space-y-2">
            <div class="grid grid-cols-2 gap-3 text-sm">
              <div>
                <span class="font-medium text-jm-gray-600">VIP Tier:</span>
                <span class="text-jm-gray-900 ml-1">3-Month (expires May 26)</span>
              </div>
              <div>
                <span class="font-medium text-jm-gray-600">Assigned:</span>
                <span class="text-jm-gray-900 ml-1">Feb 10, 2026 (15 days ago)</span>
              </div>
            </div>
            <div class="text-sm">
              <span class="font-medium text-jm-gray-600">Ideal Partner:</span>
              <p class="text-jm-gray-900 mt-1">
                32-38, professional, family-oriented, emotionally intelligent. Christian (practicing).
                Must want children.
              </p>
            </div>
            <div class="text-sm">
              <span class="font-medium text-jm-gray-600">Last Contact:</span>
              <span class="text-jm-gray-900 ml-1">2 days ago (Weekly check-in call)</span>
            </div>
          </div>

          <!-- Quick Stats -->
          <div class="grid grid-cols-3 gap-4">
            <div class="text-center p-3 bg-white rounded-lg border border-jm-gray-200">
              <p class="font-serif text-2xl font-bold text-jm-gray-900">8</p>
              <p class="font-sans text-xs text-jm-gray-600">Introductions Sent</p>
            </div>
            <div class="text-center p-3 bg-white rounded-lg border border-jm-gray-200">
              <p class="font-serif text-2xl font-bold text-jm-gray-900">5</p>
              <p class="font-sans text-xs text-jm-gray-600">Accepted</p>
            </div>
            <div class="text-center p-3 bg-white rounded-lg border border-jm-gray-200">
              <p class="font-serif text-2xl font-bold text-jm-gray-900">2</p>
              <p class="font-sans text-xs text-jm-gray-600">Active Conversations</p>
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
              Search Matches
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
            <button class="
              text-jm-purple hover:text-jm-purple-dark
              font-sans font-medium text-sm
              px-3 py-2.5
              transition-colors duration-200
            ">
              Contact Client
            </button>
          </div>
        </div>
      </div>
    </article>

    <!-- Client 2 (similar structure) -->
    <!-- ... -->
  </div>
</div>
```

---

## Tiered Access Request Modal

**Purpose:** Request access to higher tiers of potential match profiles

**HTML/Tailwind Example:**

```html
<!-- Tiered Access Request Modal -->
<div
  id="tier-access-request-modal"
  class="
    fixed inset-0 bg-jm-gray-900/50 backdrop-blur-sm z-50
    flex items-center justify-center p-4
  "
  role="dialog"
  aria-modal="true"
  aria-labelledby="tier-access-title"
>
  <div class="
    bg-white rounded-2xl shadow-2xl
    w-full max-w-2xl
    max-h-[90vh] overflow-y-auto
  ">
    <!-- Modal Header -->
    <div class="p-6 border-b border-jm-gray-200">
      <div class="flex items-start justify-between">
        <div class="pr-10">
          <h2 id="tier-access-title" class="font-serif text-2xl font-bold text-jm-gray-900">
            Request Tier Access
          </h2>
          <p class="font-sans text-sm text-jm-gray-600 mt-1">
            Request access to Emmanuel A.'s higher tier data
          </p>
        </div>
        <button
          type="button"
          class="
            p-2 rounded-full
            text-jm-gray-600 hover:text-jm-gray-900 hover:bg-jm-gray-100
            transition-all duration-200
            focus:outline-none focus:ring-2 focus:ring-jm-purple
          "
          aria-label="Close modal"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>
      </div>
    </div>

    <!-- Modal Body -->
    <div class="p-6 space-y-6">
      <!-- Context Info -->
      <div class="bg-jm-info/10 border-l-4 border-jm-info p-4 rounded-r-lg">
        <div class="flex items-start gap-3">
          <svg class="w-5 h-5 text-jm-info flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 20 20">
            <path fill-rule="evenodd" d="M18 10a8 8 11-16 8 8 0116zm-7-4a1 1 11-2 1 1 012zM9 9a1 1 000 2v3a1 1 001 1h1a1 1 100-2v-3a1 1 00-1-1H9z" clip-rule="evenodd"/>
          </svg>
          <div class="flex-1">
            <h4 class="font-sans text-sm font-semibold text-jm-info mb-1">
              Tiered Consent Model
            </h4>
            <p class="font-sans text-sm text-jm-gray-700">
              You're requesting access on behalf of your client <strong>Chidinma O.</strong>
              Emmanuel A. will be notified and can choose to grant or deny access.
            </p>
          </div>
        </div>
      </div>

      <!-- Current Access Level -->
      <div>
        <h3 class="font-sans text-sm font-semibold text-jm-gray-700 mb-3">
          Current Access Level
        </h3>
        <div class="bg-jm-gray-50 rounded-lg p-4">
          <div class="flex items-center gap-2 mb-2">
            <span class="inline-flex items-center gap-1 bg-jm-success/10 text-jm-success px-2 py-1 rounded-md text-xs font-semibold">
              <svg class="w-3 h-3" fill="currentColor" viewBox="0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 100-16 8 8 000 16zm3.707-9.293a1 1 00-1.414-1.414L9 10.586 7.707 9.293a1 1 00-1.414 1.414l2 2a1 1 001.414l4-4z" clip-rule="evenodd"/>
              </svg>
              Tier 1 - Accessible
            </span>
          </div>
          <p class="font-sans text-sm text-jm-gray-600">
            You can currently view: Age, Gender, Location, Occupation Category, Religious Identity
          </p>
        </div>
      </div>

      <!-- Select Tier to Request -->
      <div>
        <label class="block font-sans text-sm font-medium text-jm-gray-700 mb-3">
          Select Tier Level to Request
        </label>
        <div class="space-y-3">
          <!-- Tier 2 Option -->
          <div class="border-2 border-jm-gray-200 rounded-lg p-4 hover:border-jm-purple cursor-pointer transition-all duration-200">
            <div class="flex items-start gap-3">
              <input
                type="radio"
                id="tier-2"
                name="tier-request"
                value="2"
                class="w-5 h-5 mt-0.5 text-jm-purple focus:ring-2 focus:ring-jm-purple/20"
              />
              <label for="tier-2" class="flex-1 cursor-pointer">
                <div class="flex items-center gap-2 mb-1">
                  <span class="font-sans text-base font-semibold text-jm-gray-900">
                    Tier 2: Lifestyle & Faith
                  </span>
                  <span class="inline-flex items-center gap-1 bg-jm-warning/10 text-jm-warning px-2 py-1 rounded-md text-xs font-semibold">
                    Locked
                  </span>
                </div>
                <p class="font-sans text-sm text-jm-gray-600">
                  Denominational preference, prayer habits, scripture engagement, personality type, hobbies
                </p>
              </label>
            </div>
          </div>

          <!-- Tier 3 Option -->
          <div class="border-2 border-jm-purple bg-jm-purple/5 rounded-lg p-4 cursor-pointer transition-all duration-200">
            <div class="flex items-start gap-3">
              <input
                type="radio"
                id="tier-3"
                name="tier-request"
                value="3"
                class="w-5 h-5 mt-0.5 text-jm-purple focus:ring-2 focus:ring-jm-purple/20"
                checked
              />
              <label for="tier-3" class="flex-1 cursor-pointer">
                <div class="flex items-center gap-2 mb-1">
                  <span class="font-sans text-base font-semibold text-jm-gray-900">
                    Tier 3: Relationships & Family
                  </span>
                  <span class="inline-flex items-center gap-1 bg-jm-warning/10 text-jm-warning px-2 py-1 rounded-md text-xs font-semibold">
                    Locked
                  </span>
                </div>
                <p class="font-sans text-sm text-jm-gray-600">
                  Relationship history, marriage vision, family goals, deal-breakers
                </p>
              </label>
            </div>
          </div>

          <!-- Tier 4 Option -->
          <div class="border-2 border-jm-gray-200 rounded-lg p-4 hover:border-jm-purple cursor-pointer transition-all duration-200">
            <div class="flex items-start gap-3">
              <input
                type="radio"
                id="tier-4"
                name="tier-request"
                value="4"
                class="w-5 h-5 mt-0.5 text-jm-purple focus:ring-2 focus:ring-jm-purple/20"
              />
              <label for="tier-4" class="flex-1 cursor-pointer">
                <div class="flex items-center gap-2 mb-1">
                  <span class="font-sans text-base font-semibold text-jm-gray-900">
                    Tier 4: Financial & Health
                  </span>
                  <span class="inline-flex items-center gap-1 bg-jm-warning/10 text-jm-warning px-2 py-1 rounded-md text-xs font-semibold">
                    Locked
                  </span>
                </div>
                <p class="font-sans text-sm text-jm-gray-600">
                  Income range, financial goals, health status, background check consent
                </p>
              </label>
            </div>
          </div>
        </div>
      </div>

      <!-- Request Message (Optional) -->
      <div>
        <label class="block font-sans text-sm font-medium text-jm-gray-700 mb-2">
          Optional Message to Emmanuel A.
        </label>
        <textarea
          rows="4"
          placeholder="Explain why you're requesting access (e.g., potential compatibility with one of my clients)..."
          class="
            w-full px-4 py-3 rounded-lg
            border-2 border-jm-gray-300 focus:border-jm-purple focus:ring-2 focus:ring-jm-purple/20
            font-sans text-base text-jm-gray-900 placeholder:text-jm-gray-400
            focus:outline-none
            resize-vertical
          "
        ></textarea>
        <p class="font-sans text-xs text-jm-gray-500 mt-1">
          A thoughtful message may increase the likelihood of approval.
        </p>
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
        Send Request
      </button>
    </div>
  </div>
</div>
```

---

## Permissions & Authorization Checks

### Backend Authorization Middleware

```javascript
// VIP Expert permission check
function requireVIPExpert(req, res, next) {
  const admin = req.admin;

  // Only VIP Expert and Super Admin have access
  if (admin.role === 'vipExpert' || admin.role === 'superAdmin') {
    return next();
  }

  await logSecurityEvent({
    event: 'unauthorized_expert_access',
    adminId: admin.id,
    attemptedRoute: req.path,
    ipAddress: req.ip
  });

  return res.status(403).json({
    error: 'Access Denied',
    message: `Your role (${admin.role}) cannot access VIP Expert functions`
  });
}

// Data isolation check - Expert can only access assigned clients
async function checkClientAssignment(req, res, next) {
  const expertId = req.admin.id;
  const clientId = req.params.clientId;

  const assignment = await VIPAssignment.findOne({
    expertId: expertId,
    vipUserId: clientId,
    status: 'active'
  });

  if (!assignment) {
    await logSecurityEvent({
      event: 'unauthorized_client_access',
      expertId: expertId,
      attemptedClientId: clientId,
      ipAddress: req.ip
    });

    return res.status(403).json({
      error: 'Access Denied',
      message: 'You are not assigned to this client'
    });
  }

  req.clientAssignment = assignment;
  return next();
}

// Tiered access check
async function checkTierAccess(req, res, next) {
  const expertId = req.admin.id;
  const targetUserId = req.params.userId;
  const requestedTier = req.body.tier;

  // Check if expert's client has granted tier access to target user
  const tierAccess = await TierAccessGrant.findOne({
    grantorUserId: targetUserId,
    granteeType: 'vipExpert',
    granteeId: expertId,
    tier: requestedTier,
    status: 'granted'
  });

  if (!tierAccess) {
    return res.status(403).json({
      error: 'Access Denied',
      message: `User has not granted you access to Tier ${requestedTier}. Request access first.`
    });
  }

  return next();
}
```

---

## State Management Requirements

### Expert Dashboard State Object

```javascript
const vipExpertState = {
  // Expert profile
  expert: {
    expertId: 'exp_003',
    name: 'Chiamaka Nwosu',
    performanceRating: 4.9,
    activeClients: 5,
    capacity: 6,
    successRate: 0.74,
  },

  // Assigned clients
  assignedClients: [
    {
      vipUserId: 'user_78901',
      name: 'Chidinma O.',
      age: 31,
      location: 'Lagos',
      tierCompleted: 4,
      vipTier: '3-month',
      vipExpiresAt: '2026-05-26',
      assignedAt: '2026-02-10',
      lastContact: '2026-02-25',
      introductionsSent: 8,
      introductionsAccepted: 5,
      activeConversations: 2,
    },
  ],

  // Performance metrics
  metrics: {
    introductionsThisMonth: 14,
    acceptanceRate: 0.79,
    clientSatisfaction: 4.9,
    successfulMatches: 2,
  },

  // Tier access requests (pending)
  tierAccessRequests: [
    {
      requestId: 'tier_req_001',
      targetUserId: 'user_44556',
      requestedTier: 3,
      onBehalfOfClientId: 'user_78901',
      requestedAt: '2026-02-27T10:00:00Z',
      status: 'pending',
    },
  ],
};
```

---

## Audit Logging Requirements

**ALL VIP Expert actions must be logged.**

### Log Structure

```javascript
const VIPExpertAuditLog = {
  timestamp: Date,
  expertId: ObjectId,
  action: String, // 'view_client_profile', 'request_tier_access', 'create_introduction'
  targetId: ObjectId,
  targetType: String, // 'vipUser', 'tierAccessRequest', 'introduction'
  clientId: ObjectId, // On behalf of which client
  details: Object,
  ipAddress: String,
  userAgent: String,
  result: String, // 'success', 'denied', 'error'
};
```

### Example Log Entry

```javascript
{
  timestamp: "2026-02-27T11:00:00Z",
  expertId: "exp_003",
  action: "request_tier_access",
  targetId: "user_44556",
  targetType: "vipUser",
  clientId: "user_78901",
  details: {
    requestedTier: 3,
    onBehalfOfClient: "Chidinma O.",
    targetUser: "Emmanuel A.",
    message: "Potential compatibility based on shared values and marriage timeline"
  },
  ipAddress: "10.0.0.45",
  userAgent: "Mozilla/5.0...",
  result: "success"
}
```

---

## Accessibility Requirements

**WCAG 2.1 AA Compliance:**

1. **Keyboard Navigation:** Full keyboard access to all client cards and actions
2. **Screen Reader Support:** ARIA labels on client status, tier access indicators
3. **Color Contrast:** Minimum 4.5:1 for all text
4. **Focus Indicators:** Visible focus rings on all interactive elements
5. **Form Labels:** All inputs properly labeled

---

## Related Documentation

- [Admin Architecture](../../Admin%20System/admin_architecture.md) - Overall admin system design
- [Admin Roles & Permissions](../../Admin%20System/admin_roles_permissions.md) - Permission matrices
- [VIP Coordination](../../Admin%20System/vip_coordination.md) - VIP management procedures
- [VIP Expert Isolation](../../Admin%20System/vip_expert_isolation.md) - Data isolation implementation
- [Tier System](../../Global%20Context/tier_system.md) - Tier definitions
- [HTML Implementation Guide](../../Design%20System/html_implementation_guide.md) - Tailwind patterns
- [VIP Coordination Dashboard Spec](vip_coordination_dashboard_spec.md) - Coordinator-side dashboard

---

**Document Owner:** Product Lead & VIP Services Lead
**Last Reviewed:** 2026-02-27
**Next Review:** Weekly during implementation
**Implementation Priority:** P0 (Critical - Required for VIP MVP)
