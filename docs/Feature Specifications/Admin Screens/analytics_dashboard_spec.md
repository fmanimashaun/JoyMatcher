# Analytics & Metrics Dashboard Feature Specification

**Version:** 1.0.0
**Last Updated:** 2026-02-27
**Status:** Complete - Ready for Implementation
**Classification:** Admin Feature Specification

---

## Overview

The Analytics & Metrics Dashboard is the centralized interface for monitoring JoyMatcher platform health, user behavior, engagement metrics, conversion funnels, revenue tracking, and safety indicators. It provides Super Admins and authorized stakeholders with real-time and historical data visualization, trend analysis, cohort tracking, and actionable insights to inform product strategy and operational decisions.

**Document Purpose:** This specification provides complete implementation details for the Analytics Dashboard, including metric definitions, data visualization components, filtering capabilities, export functionality, HTML/Tailwind examples, and integration with backend analytics systems.

---

## Admin Role Access

### Access Matrix

| Admin Role | Access Level | Permitted Views |
|------------|--------------|-----------------|
| Super Admin | Full Access | All metrics, all users, all time periods, export capabilities |
| VIP Coordinator | VIP Metrics Only | VIP conversion, VIP retention, VIP revenue, VIP satisfaction |
| Moderator | Safety Metrics Only | Reports trends, moderation velocity, violation patterns |
| VIP Expert | No Access | Cannot access analytics dashboard |
| Data Protection Officer | No Access | Cannot access analytics (privacy concerns) |
| Support Agent | No Access | Cannot access analytics |

**Data Export:**
- Super Admin: Full export (CSV, PDF)
- VIP Coordinator: VIP-specific export only
- Moderator: Safety-specific export only

---

## Page Purpose & Admin Goals

### Super Admin Goals

1. **Platform Health Monitoring:** Track user growth, engagement, retention, and churn
2. **Revenue Tracking:** Monitor subscription revenue, VIP revenue, conversion rates
3. **Safety Oversight:** Identify safety trends, moderation effectiveness, violation patterns
4. **Product Insights:** Understand feature usage, tier completion rates, user behavior
5. **Growth Analysis:** Track acquisition channels, conversion funnels, retention cohorts
6. **VIP Performance:** Monitor VIP satisfaction, VIP matches, VIP churn
7. **Strategic Planning:** Data-driven decision making for product roadmap and operations

---

## Layout & Wireframe Description

### Page Structure

```
┌─────────────────────────────────────────────────────────────────┐
│ TOP NAVIGATION BAR                                              │
│ Logo | Analytics Dashboard | Super Admin Badge | Profile        │
├──────────────┬──────────────────────────────────────────────────┤
│              │                                                  │
│   SIDEBAR    │          MAIN CONTENT AREA                      │
│   NAVIGATION │                                                  │
│              │   ┌────────────────────────────────────────┐    │
│ ▼ Overview   │   │  DATE RANGE SELECTOR & FILTERS         │    │
│  - Platform  │   │  [Last 7d] [Last 30d] [Custom] [Export]│   │
│  - Users     │   └────────────────────────────────────────┘    │
│  - Revenue   │                                                  │
│  - Safety    │   ┌────────────────────────────────────────┐    │
│              │   │  KEY METRICS ROW                       │    │
│ ▼ Metrics    │   │  [Users] [Revenue] [Engagement] [MRR]  │    │
│  - Growth    │   └────────────────────────────────────────┘    │
│  - Engagement│                                                  │
│  - Retention │   ┌────────────────────────────────────────┐    │
│  - Revenue   │   │  CHARTS & VISUALIZATIONS               │    │
│  - VIP       │   │  [Line Chart] [Bar Chart] [Pie Chart]  │    │
│  - Safety    │   └────────────────────────────────────────┘    │
│              │                                                  │
│ ▼ Reports    │   ┌────────────────────────────────────────┐    │
│  - Weekly    │   │  DATA TABLES                           │    │
│  - Monthly   │   │  [Detailed breakdowns with sorting]    │    │
│  - Custom    │   └────────────────────────────────────────┘    │
│              │                                                  │
└──────────────┴──────────────────────────────────────────────────┘
```

### Responsive Behavior

- **Desktop (≥1024px):** Sidebar + Main Content (2-column layout)
- **Tablet (768px-1023px):** Collapsible sidebar, full-width content, stacked charts
- **Mobile (<768px):** Bottom tab navigation, single-column layout

---

## Component Breakdown

### 1. Date Range Selector & Filters

**Purpose:** Control time period and data filters for all analytics views

**HTML/Tailwind Example:**

```html
<!-- Date Range Selector & Filters -->
<div class="bg-white rounded-xl shadow-sm border border-jm-gray-200 p-6 mb-6">
  <div class="flex items-center justify-between gap-4 flex-wrap">
    <!-- Date Range Buttons -->
    <div class="flex items-center gap-2">
      <button class="
        px-4 py-2 rounded-lg
        text-jm-gray-700 hover:bg-jm-gray-100
        font-sans font-medium text-sm
        transition-all duration-200
        focus:outline-none focus:ring-2 focus:ring-jm-purple
      ">
        Today
      </button>
      <button class="
        px-4 py-2 rounded-lg
        bg-jm-purple/10 text-jm-purple border border-jm-purple/20
        font-sans font-semibold text-sm
        transition-all duration-200
        focus:outline-none focus:ring-2 focus:ring-jm-purple
      ">
        Last 7 Days
      </button>
      <button class="
        px-4 py-2 rounded-lg
        text-jm-gray-700 hover:bg-jm-gray-100
        font-sans font-medium text-sm
        transition-all duration-200
        focus:outline-none focus:ring-2 focus:ring-jm-purple
      ">
        Last 30 Days
      </button>
      <button class="
        px-4 py-2 rounded-lg
        text-jm-gray-700 hover:bg-jm-gray-100
        font-sans font-medium text-sm
        transition-all duration-200
        focus:outline-none focus:ring-2 focus:ring-jm-purple
      ">
        Last 90 Days
      </button>

      <!-- Custom Date Range -->
      <div class="relative">
        <button class="
          px-4 py-2 rounded-lg
          border border-jm-gray-300 hover:border-jm-gray-400
          text-jm-gray-700 hover:text-jm-gray-900
          font-sans font-medium text-sm
          flex items-center gap-2
          transition-all duration-200
          focus:outline-none focus:ring-2 focus:ring-jm-purple
        ">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 002-2V7a2 2 00-2-2H5a2 2 00-2 2v12a2 2 002 2z"/>
          </svg>
          Custom Range
        </button>
      </div>
    </div>

    <!-- Comparison & Export -->
    <div class="flex items-center gap-2">
      <!-- Compare Period Toggle -->
      <button class="
        px-4 py-2 rounded-lg
        border border-jm-gray-300 hover:border-jm-purple
        text-jm-gray-700 hover:text-jm-purple
        font-sans font-medium text-sm
        flex items-center gap-2
        transition-all duration-200
        focus:outline-none focus:ring-2 focus:ring-jm-purple
      ">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 00-2-2H5a2 2 00-2 2v6a2 2 002 2h2a2 2 002-2zm0V9a2 2 012-2h2a2 2 012 2v10m-6a2 2 002 2h2a2 2 002-2m0V5a2 2 012-2h2a2 2 012 2v14a2 2 01-2 2h-2a2 2 01-2-2z"/>
        </svg>
        Compare Period
      </button>

      <!-- Export Dropdown -->
      <div class="relative">
        <button class="
          px-4 py-2 rounded-lg
          bg-gradient-jm hover:bg-gradient-jm-hover
          text-white font-sans font-semibold text-sm
          flex items-center gap-2
          transition-all duration-200
          shadow-sm hover:shadow-md
          focus:outline-none focus:ring-2 focus:ring-jm-coral focus:ring-offset-2
        ">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 003 3h10a3 3 003-3v-1m-4-4l-4 4m0l-4-4m4 4V4"/>
          </svg>
          Export
        </button>
      </div>
    </div>
  </div>

  <!-- Active Filters Display -->
  <div class="flex items-center gap-2 mt-4">
    <span class="font-sans text-sm text-jm-gray-600">Active Filters:</span>
    <span class="inline-flex items-center gap-1 bg-jm-purple/10 text-jm-purple px-3 py-1 rounded-full text-xs font-medium">
      Last 7 Days
      <button class="hover:text-jm-purple-dark">
        <svg class="w-3 h-3" fill="currentColor" viewBox="0 20 20">
          <path fill-rule="evenodd" d="M4.293 4.293a1 1 011.414L10 8.586l4.293-4.293a1 1 111.414 1.414L11.414 10l4.293 4.293a1 1 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 01-1.414-1.414L8.586 10 4.293 5.707a1 1 010-1.414z" clip-rule="evenodd"/>
        </svg>
      </button>
    </span>
  </div>
</div>
```

---

### 2. Key Metrics Row

**Purpose:** Display critical metrics at a glance with trend indicators

**HTML/Tailwind Example:**

```html
<!-- Key Metrics Row -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
  <!-- Metric Card 1: Total Active Users -->
  <div class="bg-white rounded-xl shadow-sm border border-jm-gray-200 p-6 space-y-3">
    <div class="flex items-center justify-between">
      <h3 class="font-sans text-sm font-medium text-jm-gray-600">
        Total Active Users
      </h3>
      <div class="bg-jm-purple/10 p-2 rounded-lg">
        <svg class="w-5 h-5 text-jm-purple" fill="currentColor" viewBox="0 20 20">
          <path d="M9 6a3 3 11-6 3 3 016zM17 6a3 3 11-6 3 3 016zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 00-1.5-4.33A5 5 0119 16v1h-6.07zM6 11a5 5 015 5v1H1v-1a5 5 015-5z"/>
        </svg>
      </div>
    </div>
    <div class="space-y-2">
      <p class="font-serif text-4xl font-bold text-jm-gray-900">
        2,847
      </p>
      <div class="flex items-center gap-2">
        <span class="inline-flex items-center gap-1 bg-jm-success/10 text-jm-success px-2 py-1 rounded-md text-xs font-semibold">
          <svg class="w-3 h-3" fill="currentColor" viewBox="0 20 20">
            <path fill-rule="evenodd" d="M12 7a1 1 110-2h5a1 1 011 1v5a1 1 11-2V8.414l-4.293 4.293a1 1 01-1.414L8 10.414l-4.293 4.293a1 1 01-1.414-1.414l5-5a1 1 011.414L11 10.586 14.586 7H12z" clip-rule="evenodd"/>
          </svg>
          +12.3%
        </span>
        <span class="font-sans text-xs text-jm-gray-500">
          vs previous period
        </span>
      </div>
      <p class="font-sans text-xs text-jm-gray-500">
        Active in last 7 days
      </p>
    </div>
  </div>

  <!-- Metric Card 2: Monthly Recurring Revenue (MRR) -->
  <div class="bg-white rounded-xl shadow-sm border border-jm-gray-200 p-6 space-y-3">
    <div class="flex items-center justify-between">
      <h3 class="font-sans text-sm font-medium text-jm-gray-600">
        Monthly Recurring Revenue
      </h3>
      <div class="bg-jm-success/10 p-2 rounded-lg">
        <svg class="w-5 h-5 text-jm-success" fill="none" stroke="currentColor" viewBox="0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 2.08.402 2.599 1M12 8V7m0 1v8m0v1m0-1c-1.11-2.08-.402-2.599-1M21 12a9 9 11-18 9 9 0118z"/>
        </svg>
      </div>
    </div>
    <div class="space-y-2">
      <p class="font-serif text-4xl font-bold text-jm-gray-900">
        ₦1.2M
      </p>
      <div class="flex items-center gap-2">
        <span class="inline-flex items-center gap-1 bg-jm-success/10 text-jm-success px-2 py-1 rounded-md text-xs font-semibold">
          <svg class="w-3 h-3" fill="currentColor" viewBox="0 20 20">
            <path fill-rule="evenodd" d="M12 7a1 1 110-2h5a1 1 011 1v5a1 1 11-2V8.414l-4.293 4.293a1 1 01-1.414L8 10.414l-4.293 4.293a1 1 01-1.414-1.414l5-5a1 1 011.414L11 10.586 14.586 7H12z" clip-rule="evenodd"/>
          </svg>
          +8.7%
        </span>
        <span class="font-sans text-xs text-jm-gray-500">
          vs last month
        </span>
      </div>
      <p class="font-sans text-xs text-jm-gray-500">
        Premium + VIP subscriptions
      </p>
    </div>
  </div>

  <!-- Metric Card 3: Engagement Rate -->
  <div class="bg-white rounded-xl shadow-sm border border-jm-gray-200 p-6 space-y-3">
    <div class="flex items-center justify-between">
      <h3 class="font-sans text-sm font-medium text-jm-gray-600">
        Platform Engagement
      </h3>
      <div class="bg-jm-info/10 p-2 rounded-lg">
        <svg class="w-5 h-5 text-jm-info" fill="currentColor" viewBox="0 20 20">
          <path fill-rule="evenodd" d="M3.172 5.172a4 4 015.656L10 6.343l1.172-1.171a4 4 115.656 5.656L10 17.657l-6.828-6.829a4 4 010-5.656z" clip-rule="evenodd"/>
        </svg>
      </div>
    </div>
    <div class="space-y-2">
      <p class="font-serif text-4xl font-bold text-jm-gray-900">
        68%
      </p>
      <div class="flex items-center gap-2">
        <span class="inline-flex items-center gap-1 bg-jm-warning/10 text-jm-warning px-2 py-1 rounded-md text-xs font-semibold">
          <svg class="w-3 h-3" fill="currentColor" viewBox="0 20 20">
            <path fill-rule="evenodd" d="M3.293 9.707a1 1 010-1.414l6-6a1 1 011.414l6 6a1 1 01-1.414 1.414L11 5.414V17a1 1 11-2V5.414L4.707 9.707a1 1 01-1.414z" clip-rule="evenodd"/>
          </svg>
          -2.1%
        </span>
        <span class="font-sans text-xs text-jm-gray-500">
          vs previous week
        </span>
      </div>
      <p class="font-sans text-xs text-jm-gray-500">
        DAU / MAU ratio
      </p>
    </div>
  </div>

  <!-- Metric Card 4: Conversion Rate -->
  <div class="bg-white rounded-xl shadow-sm border border-jm-gray-200 p-6 space-y-3">
    <div class="flex items-center justify-between">
      <h3 class="font-sans text-sm font-medium text-jm-gray-600">
        Free → Premium
      </h3>
      <div class="bg-gradient-jm p-2 rounded-lg">
        <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 20 20">
          <path d="M2 11a1 1 011-1h2a1 1 011 1v5a1 1 01-1 1H3a1 1 01-1-1v-5zM8 7a1 1 011-1h2a1 1 011 1v9a1 1 01-1 1H9a1 1 01-1-1V7zM14 4a1 1 011-1h2a1 1 011 1v12a1 1 01-1 1h-2a1 1 01-1-1V4z"/>
        </svg>
      </div>
    </div>
    <div class="space-y-2">
      <p class="font-serif text-4xl font-bold text-jm-gray-900">
        4.2%
      </p>
      <div class="flex items-center gap-2">
        <span class="inline-flex items-center gap-1 bg-jm-success/10 text-jm-success px-2 py-1 rounded-md text-xs font-semibold">
          <svg class="w-3 h-3" fill="currentColor" viewBox="0 20 20">
            <path fill-rule="evenodd" d="M12 7a1 1 110-2h5a1 1 011 1v5a1 1 11-2V8.414l-4.293 4.293a1 1 01-1.414L8 10.414l-4.293 4.293a1 1 01-1.414-1.414l5-5a1 1 011.414L11 10.586 14.586 7H12z" clip-rule="evenodd"/>
          </svg>
          +0.5%
        </span>
        <span class="font-sans text-xs text-jm-gray-500">
          vs last month
        </span>
      </div>
      <p class="font-sans text-xs text-jm-gray-500">
        30-day conversion
      </p>
    </div>
  </div>
</div>
```

---

### 3. Charts & Visualizations

**Purpose:** Display trends, patterns, and distributions visually

**HTML/Tailwind Example (Chart Container):**

```html
<!-- Charts Section -->
<div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
  <!-- User Growth Chart -->
  <div class="bg-white rounded-xl shadow-sm border border-jm-gray-200 p-6">
    <div class="flex items-center justify-between mb-4">
      <div>
        <h3 class="font-sans text-lg font-semibold text-jm-gray-900">
          User Growth
        </h3>
        <p class="font-sans text-sm text-jm-gray-600">
          New signups vs active users
        </p>
      </div>
      <!-- Chart Type Selector -->
      <div class="flex items-center gap-2">
        <button class="p-2 rounded-lg bg-jm-purple/10 text-jm-purple" aria-label="Line chart">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 01-1 1H5a1 1 01-1-1V4z"/>
          </svg>
        </button>
        <button class="p-2 rounded-lg text-jm-gray-400 hover:bg-jm-gray-100" aria-label="Bar chart">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 00-2-2H5a2 2 00-2 2v6a2 2 002 2h2a2 2 002-2zm0V9a2 2 012-2h2a2 2 012 2v10m-6a2 2 002 2h2a2 2 002-2m0V5a2 2 012-2h2a2 2 012 2v14a2 2 01-2 2h-2a2 2 01-2-2z"/>
          </svg>
        </button>
      </div>
    </div>

    <!-- Chart Canvas (placeholder - integrate Chart.js or similar) -->
    <div class="h-80 bg-jm-gray-50 rounded-lg flex items-center justify-center">
      <canvas id="user-growth-chart" class="w-full h-full"></canvas>
      <!-- Fallback text if JavaScript disabled -->
      <noscript>
        <p class="font-sans text-sm text-jm-gray-600">
          Chart visualization requires JavaScript
        </p>
      </noscript>
    </div>

    <!-- Chart Legend -->
    <div class="flex items-center justify-center gap-6 mt-4">
      <div class="flex items-center gap-2">
        <span class="w-3 h-3 rounded-full bg-jm-purple"></span>
        <span class="font-sans text-sm text-jm-gray-700">New Signups</span>
      </div>
      <div class="flex items-center gap-2">
        <span class="w-3 h-3 rounded-full bg-jm-coral"></span>
        <span class="font-sans text-sm text-jm-gray-700">Active Users</span>
      </div>
    </div>
  </div>

  <!-- Revenue Breakdown (Pie Chart) -->
  <div class="bg-white rounded-xl shadow-sm border border-jm-gray-200 p-6">
    <div class="flex items-center justify-between mb-4">
      <div>
        <h3 class="font-sans text-lg font-semibold text-jm-gray-900">
          Revenue Breakdown
        </h3>
        <p class="font-sans text-sm text-jm-gray-600">
          By subscription type
        </p>
      </div>
    </div>

    <!-- Chart Canvas -->
    <div class="h-80 bg-jm-gray-50 rounded-lg flex items-center justify-center">
      <canvas id="revenue-breakdown-chart" class="w-full h-full"></canvas>
    </div>

    <!-- Revenue Summary -->
    <div class="grid grid-cols-3 gap-4 mt-4">
      <div class="text-center">
        <div class="flex items-center justify-center gap-2 mb-1">
          <span class="w-3 h-3 rounded-full bg-jm-purple"></span>
          <span class="font-sans text-xs font-medium text-jm-gray-600">Premium</span>
        </div>
        <p class="font-sans text-lg font-bold text-jm-gray-900">₦720K</p>
        <p class="font-sans text-xs text-jm-gray-500">60%</p>
      </div>
      <div class="text-center">
        <div class="flex items-center justify-center gap-2 mb-1">
          <span class="w-3 h-3 rounded-full bg-gradient-jm"></span>
          <span class="font-sans text-xs font-medium text-jm-gray-600">VIP</span>
        </div>
        <p class="font-sans text-lg font-bold text-jm-gray-900">₦360K</p>
        <p class="font-sans text-xs text-jm-gray-500">30%</p>
      </div>
      <div class="text-center">
        <div class="flex items-center justify-center gap-2 mb-1">
          <span class="w-3 h-3 rounded-full bg-jm-coral"></span>
          <span class="font-sans text-xs font-medium text-jm-gray-600">Quarterly</span>
        </div>
        <p class="font-sans text-lg font-bold text-jm-gray-900">₦120K</p>
        <p class="font-sans text-xs text-jm-gray-500">10%</p>
      </div>
    </div>
  </div>
</div>

<!-- Full-Width Chart: Tier Completion Funnel -->
<div class="bg-white rounded-xl shadow-sm border border-jm-gray-200 p-6 mb-8">
  <div class="flex items-center justify-between mb-4">
    <div>
      <h3 class="font-sans text-lg font-semibold text-jm-gray-900">
        Tier Completion Funnel
      </h3>
      <p class="font-sans text-sm text-jm-gray-600">
        User progression through tier system
      </p>
    </div>
  </div>

  <!-- Funnel Visualization -->
  <div class="space-y-3">
    <!-- Tier 1 -->
    <div>
      <div class="flex items-center justify-between mb-1">
        <span class="font-sans text-sm font-medium text-jm-gray-700">Tier 1: Identity & Intent</span>
        <span class="font-sans text-sm font-semibold text-jm-gray-900">2,847 (100%)</span>
      </div>
      <div class="w-full bg-jm-gray-200 rounded-full h-8 overflow-hidden">
        <div class="bg-gradient-jm h-8 rounded-full flex items-center justify-center text-white text-xs font-semibold" style="width: 100%">
          100%
        </div>
      </div>
    </div>

    <!-- Tier 2 -->
    <div>
      <div class="flex items-center justify-between mb-1">
        <span class="font-sans text-sm font-medium text-jm-gray-700">Tier 2: Lifestyle & Faith</span>
        <span class="font-sans text-sm font-semibold text-jm-gray-900">2,136 (75%)</span>
      </div>
      <div class="w-full bg-jm-gray-200 rounded-full h-8 overflow-hidden">
        <div class="bg-gradient-jm h-8 rounded-full flex items-center justify-center text-white text-xs font-semibold" style="width: 75%">
          75%
        </div>
      </div>
    </div>

    <!-- Tier 3 -->
    <div>
      <div class="flex items-center justify-between mb-1">
        <span class="font-sans text-sm font-medium text-jm-gray-700">Tier 3: Relationships & Family</span>
        <span class="font-sans text-sm font-semibold text-jm-gray-900">1,281 (45%)</span>
      </div>
      <div class="w-full bg-jm-gray-200 rounded-full h-8 overflow-hidden">
        <div class="bg-gradient-jm h-8 rounded-full flex items-center justify-center text-white text-xs font-semibold" style="width: 45%">
          45%
        </div>
      </div>
    </div>

    <!-- Tier 4 -->
    <div>
      <div class="flex items-center justify-between mb-1">
        <span class="font-sans text-sm font-medium text-jm-gray-700">Tier 4: Financial & Health</span>
        <span class="font-sans text-sm font-semibold text-jm-gray-900">569 (20%)</span>
      </div>
      <div class="w-full bg-jm-gray-200 rounded-full h-8 overflow-hidden">
        <div class="bg-gradient-jm h-8 rounded-full flex items-center justify-center text-white text-xs font-semibold" style="width: 20%">
          20%
        </div>
      </div>
    </div>

    <!-- Tier 5 (VIP Only) -->
    <div>
      <div class="flex items-center justify-between mb-1">
        <span class="font-sans text-sm font-medium text-jm-gray-700">Tier 5: ID Verification (VIP)</span>
        <span class="font-sans text-sm font-semibold text-jm-gray-900">47 (1.7%)</span>
      </div>
      <div class="w-full bg-jm-gray-200 rounded-full h-8 overflow-hidden">
        <div class="bg-gradient-jm h-8 rounded-full flex items-center justify-center text-white text-xs font-semibold" style="width: 1.7%">
          1.7%
        </div>
      </div>
    </div>
  </div>

  <!-- Drop-off Analysis -->
  <div class="mt-6 pt-6 border-t border-jm-gray-200">
    <h4 class="font-sans text-sm font-semibold text-jm-gray-700 mb-3">
      Drop-off Analysis
    </h4>
    <div class="grid grid-cols-4 gap-4">
      <div class="bg-jm-warning/10 rounded-lg p-3 text-center">
        <p class="font-sans text-xs text-jm-gray-600 mb-1">Tier 1 → 2</p>
        <p class="font-serif text-2xl font-bold text-jm-warning">25%</p>
      </div>
      <div class="bg-jm-warning/10 rounded-lg p-3 text-center">
        <p class="font-sans text-xs text-jm-gray-600 mb-1">Tier 2 → 3</p>
        <p class="font-serif text-2xl font-bold text-jm-warning">40%</p>
      </div>
      <div class="bg-jm-error/10 rounded-lg p-3 text-center">
        <p class="font-sans text-xs text-jm-gray-600 mb-1">Tier 3 → 4</p>
        <p class="font-serif text-2xl font-bold text-jm-error">56%</p>
      </div>
      <div class="bg-jm-success/10 rounded-lg p-3 text-center">
        <p class="font-sans text-xs text-jm-gray-600 mb-1">Tier 4 → 5</p>
        <p class="font-serif text-2xl font-bold text-jm-success">8%</p>
      </div>
    </div>
  </div>
</div>
```

---

## Metric Definitions

### Growth Metrics

| Metric | Definition | Calculation |
|--------|------------|-------------|
| **Total Users** | All registered users | Count of all user accounts |
| **Active Users (DAU)** | Daily active users | Users who logged in today |
| **Active Users (MAU)** | Monthly active users | Users who logged in in last 30 days |
| **New Signups** | New user registrations | Count of new accounts created |
| **User Growth Rate** | Percentage increase in users | ((Current - Previous) / Previous) × 100 |
| **Engagement Rate** | DAU/MAU ratio | (DAU / MAU) × 100 |

### Revenue Metrics

| Metric | Definition | Calculation |
|--------|------------|-------------|
| **MRR** | Monthly Recurring Revenue | Sum of all active subscriptions (normalized to monthly) |
| **ARR** | Annual Recurring Revenue | MRR × 12 |
| **ARPU** | Average Revenue Per User | Total Revenue / Total Active Users |
| **LTV** | Lifetime Value | ARPU × Average Customer Lifetime (months) |
| **Churn Rate** | Percentage of subscribers lost | (Churned Subscribers / Total Subscribers) × 100 |
| **Conversion Rate** | Free → Premium conversion | (Premium Signups / Free Users) × 100 |

### Engagement Metrics

| Metric | Definition | Calculation |
|--------|------------|-------------|
| **Tier Completion Rate** | % completing each tier | (Users Completing Tier X / Total Users) × 100 |
| **Show Interest Sent** | Average per user | Total Show Interest Requests / Active Users |
| **Message Activity** | Average messages per user | Total Messages / Active Users |
| **Session Duration** | Average time per session | Total Session Time / Total Sessions |
| **Profile Views** | Average profile views | Total Profile Views / Active Users |

### Safety Metrics

| Metric | Definition | Calculation |
|--------|------------|-------------|
| **Reports Filed** | User reports submitted | Count of all reports |
| **Report Resolution Time** | Average time to resolve | Average of (Resolution Time - Submission Time) |
| **Moderation Velocity** | Reports resolved per day | Total Reports Resolved / Days |
| **Violation Rate** | % of reports with violations | (Reports with Action / Total Reports) × 100 |
| **User Warnings** | Warnings issued | Count of warning actions |
| **Suspensions** | Suspensions issued | Count of suspension actions |

---

## State Management Requirements

### Analytics State Object

```javascript
const analyticsState = {
  // Date range
  dateRange: {
    startDate: '2026-02-20',
    endDate: '2026-02-27',
    preset: 'last_7_days', // 'today', 'last_7_days', 'last_30_days', 'custom'
    compareEnabled: false,
    comparePeriod: null,
  },

  // Key metrics
  metrics: {
    totalUsers: 2847,
    totalUsersChange: 0.123, // +12.3%
    mrr: 1200000, // ₦1.2M
    mrrChange: 0.087, // +8.7%
    engagementRate: 0.68, // 68%
    engagementRateChange: -0.021, // -2.1%
    conversionRate: 0.042, // 4.2%
    conversionRateChange: 0.005, // +0.5%
  },

  // Charts data
  charts: {
    userGrowth: {
      labels: ['Feb 20', 'Feb 21', 'Feb 22', 'Feb 23', 'Feb 24', 'Feb 25', 'Feb 26', 'Feb 27'],
      datasets: [
        {
          label: 'New Signups',
          data: [23, 31, 28, 35, 29, 33, 27, 30],
          borderColor: '#8B0061',
        },
        {
          label: 'Active Users',
          data: [2650, 2680, 2710, 2745, 2770, 2810, 2830, 2847],
          borderColor: '#F16A6F',
        },
      ],
    },

    revenueBreakdown: {
      labels: ['Premium', 'VIP', 'Quarterly'],
      data: [720000, 360000, 120000],
      colors: ['#8B0061', '#F16A6F', '#F99095'],
    },

    tierFunnel: [
      { tier: 1, users: 2847, percentage: 100 },
      { tier: 2, users: 2136, percentage: 75 },
      { tier: 3, users: 1281, percentage: 45 },
      { tier: 4, users: 569, percentage: 20 },
      { tier: 5, users: 47, percentage: 1.7 },
    ],
  },

  // Filters
  filters: {
    userType: 'all', // 'all', 'free', 'premium', 'vip'
    location: 'all', // 'all', 'lagos', 'abuja', etc.
    gender: 'all', // 'all', 'male', 'female'
  },
};
```

---

## Permissions & Authorization Checks

### Backend Authorization Middleware

```javascript
// Analytics access check
function requireAnalyticsAccess(req, res, next) {
  const admin = req.admin;

  // Super Admin has full access
  if (admin.role === 'superAdmin') {
    req.analyticsScope = 'full';
    return next();
  }

  // VIP Coordinator has VIP-only access
  if (admin.role === 'vipCoordinator') {
    req.analyticsScope = 'vip_only';
    return next();
  }

  // Moderator has safety-only access
  if (admin.role === 'moderator') {
    req.analyticsScope = 'safety_only';
    return next();
  }

  // Others have no access
  await logSecurityEvent({
    event: 'unauthorized_analytics_access',
    adminId: admin.id,
    attemptedRoute: req.path,
    ipAddress: req.ip
  });

  return res.status(403).json({
    error: 'Access Denied',
    message: `Your role (${admin.role}) cannot access analytics`
  });
}

// Metric filtering based on scope
function filterMetricsByScope(metrics, scope) {
  if (scope === 'full') {
    return metrics; // All metrics
  }

  if (scope === 'vip_only') {
    return {
      vipUsers: metrics.vipUsers,
      vipRevenue: metrics.vipRevenue,
      vipSatisfaction: metrics.vipSatisfaction,
      vipMatches: metrics.vipMatches,
    };
  }

  if (scope === 'safety_only') {
    return {
      reportsTotal: metrics.reportsTotal,
      reportsResolved: metrics.reportsResolved,
      moderationVelocity: metrics.moderationVelocity,
      violationRate: metrics.violationRate,
    };
  }

  return {};
}
```

---

## Accessibility Requirements

**WCAG 2.1 AA Compliance:**

1. **Keyboard Navigation:** All filters, chart controls, and exports accessible via keyboard
2. **Screen Reader Support:** ARIA labels on chart canvases, metric cards
3. **Color Contrast:** Minimum 4.5:1 for all text, chart labels
4. **Alternative Text:** Data tables as alternative to charts for screen readers
5. **Focus Indicators:** Visible focus rings on all interactive elements

---

## Related Documentation

- [Admin Architecture](../../Admin%20System/admin_architecture.md) - Overall admin system design
- [Admin Roles & Permissions](../../Admin%20System/admin_roles_permissions.md) - Permission matrices
- [Tier System](../../Global%20Context/tier_system.md) - Tier definitions
- [Subscription Model](../../Global%20Context/subscription_model.md) - Revenue tracking
- [HTML Implementation Guide](../../Design%20System/html_implementation_guide.md) - Tailwind patterns

---

**Document Owner:** Product Lead & Data Lead
**Last Reviewed:** 2026-02-27
**Next Review:** Bi-weekly during implementation
**Implementation Priority:** P1 (High - Required for data-driven decision making)
