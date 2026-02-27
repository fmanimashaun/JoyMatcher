# Dashboard Feature Specification

**Version:** 1.0.0
**Last Updated:** 2026-02-27
**Status:** Complete
**Page Route:** `/app/dashboard`
**Access Level:** Authenticated users only (Free, Premium, VIP)

---

## 1. Page Purpose & User Goals

### Primary Purpose
The dashboard is the central hub for authenticated users, providing an at-a-glance overview of their profile status, tier completion progress, active connections, and platform activity. It serves as the home base after login.

### User Goals
- **New users:** Understand next steps for profile completion and tier progression
- **Active users:** Monitor recent Show Interest activity, messages, and connection status
- **Premium/VIP users:** Track subscription status and tier completion progress
- **All users:** Quick navigation to key platform features (Discover, Messages, Profile)

### Success Metrics
- Time to first action: <30 seconds (user navigates to Discover, Tier completion, or Messages)
- Tier completion rate: Track users who click "Complete Tier X" from dashboard
- Engagement rate: Daily active users returning to dashboard
- Navigation patterns: Track which sections drive the most clicks

---

## 2. Layout & Wireframe Description

### Overall Structure
```
┌─────────────────────────────────────────┐
│         Navigation Header               │
├─────────────────────────────────────────┤
│         Welcome Section                 │
│  [User name, avatar, subscription]      │
├─────────────────────────────────────────┤
│         Tier Progress Section           │
│  [Progress bar, completed tiers, CTA]   │
├─────────────────────────────────────────┤
│         Quick Stats Grid                │
│  [Show Interests | Connections | Msgs]  │
├─────────────────────────────────────────┤
│         Recent Activity Feed            │
│  [Show Interest received, messages]     │
├─────────────────────────────────────────┤
│         Recommended Actions             │
│  [Complete Tier X, Browse Matches]      │
├─────────────────────────────────────────┤
│         Footer                          │
└─────────────────────────────────────────┘
```

### Viewport Considerations
- **Desktop (≥1024px):** 2-column layout (main content + sidebar with quick stats)
- **Tablet (768px-1023px):** Single column, stacked sections
- **Mobile (320px-767px):** Single column, compact cards, sticky navigation

---

## 3. Component Breakdown

### 3.1 Welcome Section

**Content:**
- User's display name
- Profile photo (with upload/edit link)
- Subscription badge (Free, Premium, VIP)
- Last active timestamp
- Quick action buttons: "Edit Profile", "View Profile as Others See It"

**HTML Structure:**
```html
<section class="bg-white border-b border-jm-gray-200 py-8">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="flex flex-col md:flex-row items-center md:items-start gap-6">
      <!-- Profile Photo -->
      <div class="relative">
        <img
          src="/images/avatars/user-123.jpg"
          alt="Emmanuel A."
          class="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-jm-purple object-cover"
        />
        <button
          type="button"
          class="absolute bottom-0 right-0 bg-jm-purple hover:bg-jm-purple-dark text-white p-2 rounded-full shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-jm-purple focus:ring-offset-2"
          aria-label="Change profile photo"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 9a2 2 012-2h.93a2 2 001.664-.89l.812-1.22A2 2 0110.07 4h3.86a2 2 011.664.89l.812 1.22A2 2 0018.07 7H19a2 2 012 2v9a2 2 01-2 2H5a2 2 01-2-2V9z"/>
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 13a3 3 11-6 3 3 016z"/>
          </svg>
        </button>
      </div>

      <!-- User Info -->
      <div class="flex-1 text-center md:text-left space-y-3">
        <!-- Name & Subscription -->
        <div class="space-y-2">
          <h1 class="font-serif text-3xl md:text-4xl font-bold text-jm-gray-900">
            Welcome back, Emmanuel!
          </h1>
          <div class="flex items-center justify-center md:justify-start gap-3">
            <!-- Subscription Badge -->
            <span class="inline-flex items-center gap-1 bg-jm-purple/10 text-jm-purple px-3 py-1 rounded-full text-sm font-medium">
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 20 20">
                <path fill-rule="evenodd" d="M11.3 1.046A1 1 0112 2v5h4a1 1 01.82 1.573l-7 10A1 1 018 18v-5H4a1 1 01-.82-1.573l7-10a1 1 011.12-.38z" clip-rule="evenodd"/>
              </svg>
              Premium Member
            </span>
            <!-- Last Active -->
            <span class="font-sans text-sm text-jm-gray-500">
              Last active: Today at 2:30 PM
            </span>
          </div>
        </div>

        <!-- Quick Actions -->
        <div class="flex flex-wrap items-center justify-center md:justify-start gap-3">
          <a
            href="/app/profile/edit"
            class="border-2 border-jm-purple hover:border-jm-purple-dark text-jm-purple hover:text-jm-purple-dark hover:bg-jm-purple/5 font-sans font-medium text-sm px-4 py-2 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-jm-purple focus:ring-offset-2"
          >
            Edit Profile
          </a>
          <a
            href="/app/profile/me/preview"
            class="text-jm-purple hover:text-jm-purple-dark font-sans font-medium text-sm px-4 py-2 rounded-md hover:bg-jm-purple/10 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-jm-purple focus:ring-offset-1"
          >
            View as Others See It
          </a>
        </div>
      </div>
    </div>
  </div>
</section>
```

**Behavior:**
- Profile photo click opens full-size preview
- Change photo button opens file upload modal
- "Edit Profile" navigates to `/app/profile/edit`
- "View as Others See It" shows profile with current EDT = 1 (public view)

---

### 3.2 Tier Progress Section

**Content:**
- Overall tier completion percentage
- Visual progress bar (0-100%, based on completed tiers / subscription ceiling)
- List of tiers with status (Completed, In Progress, Locked, Upgrade Required)
- Primary CTA: "Complete Next Tier" or "Unlock More Tiers" (if ceiling hit)

**HTML Structure:**
```html
<section class="bg-gradient-to-br from-jm-purple-deep/5 via-white to-jm-coral/5 py-8">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="bg-white rounded-xl shadow-md border border-jm-gray-200 p-6 space-y-6">
      <!-- Header -->
      <div class="flex items-center justify-between">
        <h2 class="font-serif text-2xl font-bold text-jm-gray-900">
          Your Profile Progress
        </h2>
        <span class="font-sans text-lg font-semibold text-jm-purple">
          60% Complete
        </span>
      </div>

      <!-- Progress Bar -->
      <div class="space-y-2">
        <div class="w-full bg-jm-gray-200 rounded-full h-4 overflow-hidden">
          <div
            class="bg-gradient-jm h-4 rounded-full transition-all duration-500 ease-out"
            style="width: 60%"
            role="progressbar"
            aria-valuenow="60"
            aria-valuemin="0"
            aria-valuemax="100"
          ></div>
        </div>
        <p class="font-sans text-sm text-jm-gray-600">
          3 of 5 tiers completed. Complete Tier 4 to unlock deeper connections.
        </p>
      </div>

      <!-- Tier List -->
      <div class="grid grid-cols-1 md:grid-cols-5 gap-4">
        <!-- Tier 1: Completed -->
        <div class="bg-jm-success/10 border-2 border-jm-success rounded-lg p-4 space-y-2">
          <div class="flex items-center justify-between">
            <span class="font-sans text-xs font-semibold text-jm-success uppercase tracking-wide">Tier 1</span>
            <svg class="w-5 h-5 text-jm-success" fill="currentColor" viewBox="0 20 20">
              <path fill-rule="evenodd" d="M10 18a8 8 100-16 8 8 000 16zm3.707-9.293a1 1 00-1.414-1.414L9 10.586 7.707 9.293a1 1 00-1.414 1.414l2 2a1 1 001.414l4-4z" clip-rule="evenodd"/>
            </svg>
          </div>
          <h3 class="font-sans text-sm font-semibold text-jm-gray-900">
            Identity & Intent
          </h3>
          <p class="font-sans text-xs text-jm-gray-600">
            Completed Feb 10, 2026
          </p>
        </div>

        <!-- Tier 2: Completed -->
        <div class="bg-jm-success/10 border-2 border-jm-success rounded-lg p-4 space-y-2">
          <div class="flex items-center justify-between">
            <span class="font-sans text-xs font-semibold text-jm-success uppercase tracking-wide">Tier 2</span>
            <svg class="w-5 h-5 text-jm-success" fill="currentColor" viewBox="0 20 20">
              <path fill-rule="evenodd" d="M10 18a8 8 100-16 8 8 000 16zm3.707-9.293a1 1 00-1.414-1.414L9 10.586 7.707 9.293a1 1 00-1.414 1.414l2 2a1 1 001.414l4-4z" clip-rule="evenodd"/>
            </svg>
          </div>
          <h3 class="font-sans text-sm font-semibold text-jm-gray-900">
            Lifestyle
          </h3>
          <p class="font-sans text-xs text-jm-gray-600">
            Completed Feb 15, 2026
          </p>
        </div>

        <!-- Tier 3: Completed -->
        <div class="bg-jm-success/10 border-2 border-jm-success rounded-lg p-4 space-y-2">
          <div class="flex items-center justify-between">
            <span class="font-sans text-xs font-semibold text-jm-success uppercase tracking-wide">Tier 3</span>
            <svg class="w-5 h-5 text-jm-success" fill="currentColor" viewBox="0 20 20">
              <path fill-rule="evenodd" d="M10 18a8 8 100-16 8 8 000 16zm3.707-9.293a1 1 00-1.414-1.414L9 10.586 7.707 9.293a1 1 00-1.414 1.414l2 2a1 1 001.414l4-4z" clip-rule="evenodd"/>
            </svg>
          </div>
          <h3 class="font-sans text-sm font-semibold text-jm-gray-900">
            Family & Relationships
          </h3>
          <p class="font-sans text-xs text-jm-gray-600">
            Completed Feb 20, 2026
          </p>
        </div>

        <!-- Tier 4: In Progress -->
        <div class="bg-jm-warning/10 border-2 border-jm-warning rounded-lg p-4 space-y-2">
          <div class="flex items-center justify-between">
            <span class="font-sans text-xs font-semibold text-jm-warning uppercase tracking-wide">Tier 4</span>
            <svg class="w-5 h-5 text-jm-warning animate-pulse" fill="currentColor" viewBox="0 20 20">
              <path fill-rule="evenodd" d="M10 18a8 8 100-16 8 8 000 16zm1-12a1 1 10-2v4a1 1 00.293.707l2.828 2.829a1 1 101.415-1.415L11 9.586V6z" clip-rule="evenodd"/>
            </svg>
          </div>
          <h3 class="font-sans text-sm font-semibold text-jm-gray-900">
            Health & Compatibility
          </h3>
          <a href="/app/tier/4" class="inline-block font-sans text-xs text-jm-warning hover:text-jm-warning/80 font-medium underline mt-1">
            Complete Now →
          </a>
        </div>

        <!-- Tier 5: Locked (VIP Required) -->
        <div class="bg-jm-gray-100 border-2 border-jm-gray-300 border-dashed rounded-lg p-4 space-y-2 opacity-60">
          <div class="flex items-center justify-between">
            <span class="font-sans text-xs font-semibold text-jm-gray-500 uppercase tracking-wide">Tier 5</span>
            <svg class="w-5 h-5 text-jm-gray-500" fill="currentColor" viewBox="0 20 20">
              <path fill-rule="evenodd" d="M5 9V7a5 5 0110v2a2 2 012 2v5a2 2 01-2 2H5a2 2 01-2-2v-5a2 2 012-2zm8-2v2H7V7a3 3 016z" clip-rule="evenodd"/>
            </svg>
          </div>
          <h3 class="font-sans text-sm font-semibold text-jm-gray-700">
            Verified Identity
          </h3>
          <p class="font-sans text-xs text-jm-gray-500">
            VIP membership required
          </p>
        </div>
      </div>

      <!-- Primary CTA -->
      <div class="pt-4 border-t border-jm-gray-200">
        <a
          href="/app/tier/4"
          class="block w-full md:w-auto md:inline-block bg-gradient-jm hover:bg-gradient-jm-hover text-white font-sans font-semibold text-center px-8 py-3 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-jm-coral focus:ring-offset-2"
        >
          Complete Tier 4 Now
        </a>
      </div>
    </div>
  </div>
</section>
```

**Behavior:**
- Tier cards are clickable (completed tiers open view mode, in-progress/accessible tiers open edit mode)
- Locked tiers show upgrade modal when clicked
- Progress bar animates on page load
- Subscription ceiling enforcement: Free users see Tier 3-5 as locked with "Upgrade to Premium" CTA

---

### 3.3 Quick Stats Grid

**Content:**
- **Show Interests Sent:** Count of pending Show Interest requests
- **Connections:** Count of accepted Show Interest (mutual connections)
- **Unread Messages:** Count of unread messages
- **Profile Views:** Count of times profile was viewed (last 7 days)

**HTML Structure:**
```html
<section class="py-8">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
      <!-- Show Interests Sent -->
      <div class="bg-white rounded-lg shadow-sm border border-jm-gray-200 p-6 space-y-2 hover:shadow-md transition-shadow duration-200">
        <div class="flex items-center justify-between">
          <svg class="w-8 h-8 text-jm-purple" fill="none" stroke="currentColor" viewBox="0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 000 6.364L12 20.364l7.682-7.682a4.5 4.5 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 00-6.364z"/>
          </svg>
          <span class="font-sans text-3xl font-bold text-jm-gray-900">3</span>
        </div>
        <p class="font-sans text-sm font-medium text-jm-gray-600">
          Show Interests Sent
        </p>
        <a href="/app/interests" class="inline-block font-sans text-xs text-jm-purple hover:text-jm-purple-dark font-medium underline">
          View All →
        </a>
      </div>

      <!-- Connections -->
      <div class="bg-white rounded-lg shadow-sm border border-jm-gray-200 p-6 space-y-2 hover:shadow-md transition-shadow duration-200">
        <div class="flex items-center justify-between">
          <svg class="w-8 h-8 text-jm-success" fill="none" stroke="currentColor" viewBox="0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 00-5.356-1.857M17 20H7m10v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0a5.002 5.002 019.288M15 7a3 3 11-6 3 3 016zm6 3a2 2 11-4 2 2 014zM7 10a2 2 11-4 2 2 014z"/>
          </svg>
          <span class="font-sans text-3xl font-bold text-jm-gray-900">12</span>
        </div>
        <p class="font-sans text-sm font-medium text-jm-gray-600">
          Connections
        </p>
        <a href="/app/connections" class="inline-block font-sans text-xs text-jm-purple hover:text-jm-purple-dark font-medium underline">
          View All →
        </a>
      </div>

      <!-- Unread Messages -->
      <div class="bg-white rounded-lg shadow-sm border border-jm-gray-200 p-6 space-y-2 hover:shadow-md transition-shadow duration-200">
        <div class="flex items-center justify-between">
          <svg class="w-8 h-8 text-jm-coral" fill="none" stroke="currentColor" viewBox="0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 002.22L21 8M5 19h14a2 2 002-2V7a2 2 00-2-2H5a2 2 00-2 2v10a2 2 002 2z"/>
          </svg>
          <span class="font-sans text-3xl font-bold text-jm-gray-900">5</span>
        </div>
        <p class="font-sans text-sm font-medium text-jm-gray-600">
          Unread Messages
        </p>
        <a href="/app/messages" class="inline-block font-sans text-xs text-jm-purple hover:text-jm-purple-dark font-medium underline">
          View All →
        </a>
      </div>

      <!-- Profile Views -->
      <div class="bg-white rounded-lg shadow-sm border border-jm-gray-200 p-6 space-y-2 hover:shadow-md transition-shadow duration-200">
        <div class="flex items-center justify-between">
          <svg class="w-8 h-8 text-jm-info" fill="none" stroke="currentColor" viewBox="0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 11-6 3 3 016z"/>
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477-8.268-2.943-9.542-7z"/>
          </svg>
          <span class="font-sans text-3xl font-bold text-jm-gray-900">28</span>
        </div>
        <p class="font-sans text-sm font-medium text-jm-gray-600">
          Profile Views (7 days)
        </p>
        <span class="inline-block font-sans text-xs text-jm-gray-500">
          +4 from last week
        </span>
      </div>
    </div>
  </div>
</section>
```

**Behavior:**
- Stat cards are clickable, navigating to relevant section
- Numbers animate on page load (count-up effect)
- "View All" links open relevant pages

---

### 3.4 Recent Activity Feed

**Content:**
- Last 5 activity items:
  - Show Interest received (with user name, photo, timestamp)
  - Show Interest accepted/declined
  - New message received
  - Tier completion milestone
  - Detail request received/accepted
- "View All Activity" link

**HTML Structure:**
```html
<section class="py-8 bg-jm-gray-50">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="bg-white rounded-xl shadow-md border border-jm-gray-200 p-6 space-y-6">
      <!-- Header -->
      <div class="flex items-center justify-between">
        <h2 class="font-serif text-2xl font-bold text-jm-gray-900">
          Recent Activity
        </h2>
        <a href="/app/activity" class="font-sans text-sm text-jm-purple hover:text-jm-purple-dark font-medium underline">
          View All Activity →
        </a>
      </div>

      <!-- Activity List -->
      <div class="space-y-4">
        <!-- Activity Item 1: Show Interest Received -->
        <div class="flex items-start gap-4 p-4 rounded-lg hover:bg-jm-gray-50 transition-colors duration-200">
          <img
            src="/images/avatars/user-456.jpg"
            alt="Chidinma O."
            class="w-12 h-12 rounded-full border-2 border-jm-purple object-cover flex-shrink-0"
          />
          <div class="flex-1 space-y-1">
            <p class="font-sans text-sm text-jm-gray-900">
              <a href="/app/profile/456" class="font-semibold text-jm-purple hover:text-jm-purple-dark">Chidinma O.</a> sent you Show Interest
            </p>
            <p class="font-sans text-xs text-jm-gray-500">
              2 hours ago
            </p>
          </div>
          <a
            href="/app/interests/received"
            class="bg-gradient-jm hover:bg-gradient-jm-hover text-white font-sans font-medium text-sm px-4 py-2 rounded-lg transition-all duration-200 shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-jm-coral focus:ring-offset-2"
          >
            Respond
          </a>
        </div>

        <!-- Activity Item 2: Show Interest Accepted -->
        <div class="flex items-start gap-4 p-4 rounded-lg">
          <div class="w-12 h-12 rounded-full bg-jm-success/10 flex items-center justify-center flex-shrink-0">
            <svg class="w-6 h-6 text-jm-success" fill="currentColor" viewBox="0 20 20">
              <path fill-rule="evenodd" d="M10 18a8 8 100-16 8 8 000 16zm3.707-9.293a1 1 00-1.414-1.414L9 10.586 7.707 9.293a1 1 00-1.414 1.414l2 2a1 1 001.414l4-4z" clip-rule="evenodd"/>
            </svg>
          </div>
          <div class="flex-1 space-y-1">
            <p class="font-sans text-sm text-jm-gray-900">
              Your Show Interest to <a href="/app/profile/789" class="font-semibold text-jm-purple hover:text-jm-purple-dark">Folake A.</a> was accepted!
            </p>
            <p class="font-sans text-xs text-jm-gray-500">
              5 hours ago
            </p>
          </div>
          <a
            href="/app/messages/789"
            class="border-2 border-jm-purple hover:border-jm-purple-dark text-jm-purple hover:text-jm-purple-dark hover:bg-jm-purple/5 font-sans font-medium text-sm px-4 py-2 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-jm-purple focus:ring-offset-2"
          >
            Message
          </a>
        </div>

        <!-- Activity Item 3: New Message -->
        <div class="flex items-start gap-4 p-4 rounded-lg hover:bg-jm-gray-50 transition-colors duration-200">
          <img
            src="/images/avatars/user-234.jpg"
            alt="Amara T."
            class="w-12 h-12 rounded-full border-2 border-jm-purple object-cover flex-shrink-0"
          />
          <div class="flex-1 space-y-1">
            <p class="font-sans text-sm text-jm-gray-900">
              <a href="/app/profile/234" class="font-semibold text-jm-purple hover:text-jm-purple-dark">Amara T.</a> sent you a message
            </p>
            <p class="font-sans text-xs text-jm-gray-600">
              "Hi Emmanuel, I saw your profile and..."
            </p>
            <p class="font-sans text-xs text-jm-gray-500">
              1 day ago
            </p>
          </div>
          <a
            href="/app/messages/234"
            class="text-jm-purple hover:text-jm-purple-dark font-sans font-medium text-sm px-4 py-2 rounded-md hover:bg-jm-purple/10 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-jm-purple focus:ring-offset-1"
          >
            Reply
          </a>
        </div>

        <!-- Activity Item 4: Tier Completion -->
        <div class="flex items-start gap-4 p-4 rounded-lg">
          <div class="w-12 h-12 rounded-full bg-jm-warning/10 flex items-center justify-center flex-shrink-0">
            <svg class="w-6 h-6 text-jm-warning" fill="currentColor" viewBox="0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902l1.07 3.292a1 1 00.95.69h3.462c.969 1.371 1.24.588 1.81l-2.8 2.034a1 1 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 00-1.175l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 00.951-.69l1.07-3.292z"/>
            </svg>
          </div>
          <div class="flex-1 space-y-1">
            <p class="font-sans text-sm text-jm-gray-900">
              You completed <span class="font-semibold">Tier 3: Relationships & Family</span>
            </p>
            <p class="font-sans text-xs text-jm-gray-500">
              3 days ago
            </p>
          </div>
        </div>

        <!-- Activity Item 5: Detail Request Received -->
        <div class="flex items-start gap-4 p-4 rounded-lg hover:bg-jm-gray-50 transition-colors duration-200">
          <img
            src="/images/avatars/user-567.jpg"
            alt="Ngozi M."
            class="w-12 h-12 rounded-full border-2 border-jm-purple object-cover flex-shrink-0"
          />
          <div class="flex-1 space-y-1">
            <p class="font-sans text-sm text-jm-gray-900">
              <a href="/app/profile/567" class="font-semibold text-jm-purple hover:text-jm-purple-dark">Ngozi M.</a> requested Tier 3 details
            </p>
            <p class="font-sans text-xs text-jm-gray-500">
              4 days ago
            </p>
          </div>
          <a
            href="/app/requests/567"
            class="border-2 border-jm-purple hover:border-jm-purple-dark text-jm-purple hover:text-jm-purple-dark hover:bg-jm-purple/5 font-sans font-medium text-sm px-4 py-2 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-jm-purple focus:ring-offset-2"
          >
            Review
          </a>
        </div>
      </div>
    </div>
  </div>
</section>
```

**Behavior:**
- Activity items are interactive (clicking opens relevant page)
- Unread items have subtle highlight background
- Action buttons context-specific (Respond, Message, Review)
- Real-time updates via polling or WebSocket (in production)

---

### 3.5 Recommended Actions Section

**Content:**
- Contextual recommendations based on user state:
  - **Incomplete Tier:** "Complete Tier X to unlock more matches"
  - **No Show Interests Sent:** "Browse matches and send your first Show Interest"
  - **Subscription Ceiling Hit:** "Upgrade to Premium/VIP to unlock higher tiers"
  - **Profile Photo Missing:** "Upload a profile photo to increase visibility"

**HTML Structure:**
```html
<section class="py-8">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="bg-gradient-to-br from-jm-purple-deep/5 via-white to-jm-coral/5 rounded-xl shadow-sm border border-jm-gray-200 p-6 space-y-4">
      <h2 class="font-serif text-xl font-bold text-jm-gray-900">
        Recommended for You
      </h2>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <!-- Recommendation 1: Complete Tier 4 -->
        <div class="bg-white rounded-lg border-2 border-jm-warning p-4 space-y-3">
          <div class="flex items-start gap-3">
            <div class="w-10 h-10 rounded-full bg-jm-warning/10 flex items-center justify-center flex-shrink-0">
              <svg class="w-5 h-5 text-jm-warning" fill="currentColor" viewBox="0 20 20">
                <path fill-rule="evenodd" d="M18 10a8 8 11-16 8 8 0116zm-7-4a1 1 11-2 1 1 012zM9 9a1 1 000 2v3a1 1 001 1h1a1 1 100-2v-3a1 1 00-1-1H9z" clip-rule="evenodd"/>
              </svg>
            </div>
            <div class="flex-1 space-y-1">
              <h3 class="font-sans text-sm font-semibold text-jm-gray-900">
                Complete Tier 4: Health & Compatibility
              </h3>
              <p class="font-sans text-xs text-jm-gray-600">
                Unlock marriage-level transparency and access Premium matches who have completed Tier 4.
              </p>
            </div>
          </div>
          <a
            href="/app/tier/4"
            class="block w-full bg-jm-warning hover:bg-jm-warning/90 text-white font-sans font-semibold text-center px-4 py-2 rounded-lg transition-all duration-200 shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-jm-warning focus:ring-offset-2"
          >
            Complete Tier 4
          </a>
        </div>

        <!-- Recommendation 2: Browse Matches -->
        <div class="bg-white rounded-lg border-2 border-jm-purple p-4 space-y-3">
          <div class="flex items-start gap-3">
            <div class="w-10 h-10 rounded-full bg-jm-purple/10 flex items-center justify-center flex-shrink-0">
              <svg class="w-5 h-5 text-jm-purple" fill="currentColor" viewBox="0 20 20">
                <path d="M9 6a3 3 11-6 3 3 016zM17 6a3 3 11-6 3 3 016zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 00-1.5-4.33A5 5 0119 16v1h-6.07zM6 11a5 5 015 5v1H1v-1a5 5 015-5z"/>
              </svg>
            </div>
            <div class="flex-1 space-y-1">
              <h3 class="font-sans text-sm font-semibold text-jm-gray-900">
                Discover Compatible Matches
              </h3>
              <p class="font-sans text-xs text-jm-gray-600">
                Browse profiles of marriage-minded professionals who match your preferences.
              </p>
            </div>
          </div>
          <a
            href="/app/discover"
            class="block w-full bg-gradient-jm hover:bg-gradient-jm-hover text-white font-sans font-semibold text-center px-4 py-2 rounded-lg transition-all duration-200 shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-jm-coral focus:ring-offset-2"
          >
            Browse Matches
          </a>
        </div>
      </div>
    </div>
  </div>
</section>
```

**Behavior:**
- Recommendations dynamically generated based on user state
- Dismissed recommendations don't reappear for 7 days
- CTA buttons navigate to relevant pages

---

## 4. User Interactions & Flows

### 4.1 First-Time User (Tier 1 Complete, No Tier 2)

**Flow:**
1. User logs in for the first time
2. Dashboard shows:
   - Welcome message with name
   - Tier progress at 20% (1/5 tiers complete)
   - Recommended action: "Complete Tier 2: Lifestyle & Background"
   - Quick stats show 0 across all metrics
3. User clicks "Complete Tier 2"
4. Navigates to `/app/tier/2`

### 4.2 Active Premium User (Tier 3 Complete, Tier 4 In Progress)

**Flow:**
1. User logs in
2. Dashboard shows:
   - Tier progress at 60% (3/5 tiers complete)
   - Quick stats: 3 Show Interests sent, 12 connections, 5 unread messages
   - Recent activity: 2 new Show Interest received, 1 message
3. User clicks "Respond" on Show Interest notification
4. Navigates to `/app/interests/received` with specific request highlighted

### 4.3 VIP User (All Tiers Complete)

**Flow:**
1. VIP user logs in
2. Dashboard shows:
   - Tier progress at 100% (5/5 tiers complete with Verified badge)
   - VIP-specific stats: "3 curated introductions this week"
   - Recommended action: "Review new curated matches from your matchmaker"
3. User clicks "View Curated Matches"
4. Navigates to `/app/vip/introductions`

---

## 5. EDT/Tier Logic

### EDT Calculation for Dashboard Display

**Not directly applicable to dashboard**, but tier completion status affects:
- Which tiers are visible/editable
- Subscription ceiling enforcement (Free users see Tier 3-5 as locked)
- Profile completeness percentage calculation

**Formula:**
```javascript
profileCompletenessPercentage = (completedTiers.length / subscriptionCeiling) * 100
```

**Examples:**
- Free user (ceiling = 2): Completed Tier 1 → 50% complete
- Premium user (ceiling = 4): Completed Tiers 1-3 → 75% complete
- VIP user (ceiling = 5): Completed Tiers 1-5 → 100% complete

---

## 6. Subscription Tier Ceiling Enforcement

### Free User Dashboard

- **Tier Progress:** Shows Tier 1-2 as accessible, Tier 3-5 as locked with "Upgrade to Premium" badge
- **Recommended Actions:** Includes "Upgrade to Premium to unlock Tier 3-4"
- **Quick Stats:** All stats available (no subscription gating)

### Premium User Dashboard

- **Tier Progress:** Shows Tier 1-4 as accessible, Tier 5 as locked with "Apply for VIP"
- **Recommended Actions:** Includes "Complete Tier 4" if not done, "Apply for VIP" if Tier 4 complete
- **Quick Stats:** All stats available

### VIP User Dashboard

- **Tier Progress:** All tiers accessible, Tier 5 shows "Verified" badge when complete
- **Recommended Actions:** VIP-specific actions like "Review curated introductions"
- **Quick Stats:** Includes VIP-specific metrics

---

## 7. State Management Requirements

### Global State (JavaScript)

```javascript
const dashboardState = {
  currentUser: {
    id: 1,
    displayName: "Emmanuel A.",
    profilePhoto: "/images/avatars/user-123.jpg",
    subscription: "premium", // free | premium | vip
    subscriptionCeiling: 4,
    completedTiers: [1, 2, 3],
    maxCompletedTier: 3,
    lastActive: new Date(),
    country: "NG"
  },
  stats: {
    showInterestsSent: 3,
    connections: 12,
    unreadMessages: 5,
    profileViews: 28
  },
  recentActivity: [
    {
      id: "activity-1",
      type: "show_interest_received",
      fromUserId: 456,
      fromUserName: "Chidinma O.",
      fromUserPhoto: "/images/avatars/user-456.jpg",
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      actionUrl: "/app/interests/received"
    },
    // ... more activity items
  ],
  recommendations: [
    {
      id: "rec-1",
      type: "complete_tier",
      tierNumber: 4,
      title: "Complete Tier 4: Health & Compatibility",
      description: "Unlock marriage-level transparency...",
      ctaText: "Complete Tier 4",
      ctaUrl: "/app/tier/4"
    },
    {
      id: "rec-2",
      type: "browse_matches",
      title: "Discover Compatible Matches",
      description: "Browse profiles of marriage-minded professionals...",
      ctaText: "Browse Matches",
      ctaUrl: "/app/discover"
    }
  ]
};
```

### State Updates

**On Page Load:**
```javascript
function loadDashboard() {
  // Fetch user data
  const user = AppState.users.get(AppState.currentUser.id);

  // Calculate stats
  const stats = calculateUserStats(user.id);

  // Fetch recent activity
  const activity = getRecentActivity(user.id, 5);

  // Generate recommendations
  const recommendations = generateRecommendations(user);

  // Render dashboard
  renderDashboard(user, stats, activity, recommendations);
}
```

**On Tier Completion:**
```javascript
// Triggered when user completes a tier
function onTierCompleted(tierNumber) {
  // Update user state
  currentUser.completedTiers.push(tierNumber);
  currentUser.maxCompletedTier = Math.max(...currentUser.completedTiers);

  // Recalculate progress percentage
  const percentage = (currentUser.completedTiers.length / currentUser.subscriptionCeiling) * 100;

  // Update UI
  updateTierProgress(percentage);
  addActivityItem({
    type: "tier_completed",
    tierNumber: tierNumber,
    timestamp: new Date()
  });

  // Refresh recommendations
  refreshRecommendations();
}
```

---

## 8. Accessibility Requirements

### WCAG 2.1 AA Compliance

**Keyboard Navigation:**
- All interactive elements accessible via Tab key
- Focus indicators visible (2px purple ring)
- Logical tab order (top to bottom, left to right)

**Screen Reader Support:**
- All images have descriptive alt text
- Activity feed items announced via `aria-live="polite"` region
- Stats cards use `aria-label` for context ("3 Show Interests sent")

**Color Contrast:**
- Text on white: 4.5:1 minimum (WCAG AA)
- Button text on gradient: 4.5:1 minimum
- Disabled states meet contrast requirements

**Semantic HTML:**
- Proper heading hierarchy (H1 → H2 → H3)
- `<nav>`, `<main>`, `<section>` landmarks
- Lists for activity feed and tier list

---

## 9. Mobile Responsive Behavior

### Breakpoints

**Mobile (320px-767px):**
- Single column layout
- Welcome section: Profile photo centered, name/stats stacked
- Tier progress: Tier cards stack vertically
- Quick stats: 2-column grid (2x2)
- Activity feed: Full-width cards
- Sticky bottom navigation for quick actions

**Tablet (768px-1023px):**
- Welcome section: 2-column (photo + info)
- Tier progress: 3-column grid for tier cards
- Quick stats: 4-column grid
- Activity feed: Full-width cards

**Desktop (≥1024px):**
- Welcome section: Full layout with photo left, info right
- Tier progress: 5-column grid (one per tier)
- Quick stats: 4-column grid
- Activity feed: Full-width cards with horizontal layout

### Mobile-Specific Enhancements

**Touch Targets:**
- Minimum 44x44px for all interactive elements
- Increased padding on mobile buttons

**Sticky Elements:**
- Bottom navigation bar on mobile (Discover, Messages, Profile)
- Top header sticky on scroll

---

## 10. Performance Optimization

### Image Optimization
- Profile photos: Lazy-loaded, WebP with JPG fallback
- Avatar thumbnails: Max 100x100px, optimized
- Hero images: Responsive srcset

### Data Loading
- Dashboard data fetched in single API call
- Activity feed paginated (load more on scroll)
- Stats cached for 5 minutes

### Animation Performance
- Use CSS transforms for animations (GPU-accelerated)
- Avoid layout thrashing
- Debounce scroll events

---

## 11. Error Handling

### Network Errors
- Show error banner: "Unable to load dashboard. Please refresh the page."
- Retry button triggers reload
- Offline mode: Show cached data with "Last updated" timestamp

### Empty States
- No activity: "You don't have any recent activity yet. Browse matches to get started!"
- No connections: "You haven't connected with anyone yet. Send Show Interest to start building connections."
- No messages: "No messages yet. When someone accepts your Show Interest, messaging unlocks!"

---

## 12. Success States

### Page Load Success
- Dashboard loads in <2 seconds
- Stats animate on load (count-up effect)
- Progress bar fills smoothly

### User Actions
- Tier completion: Show success toast, update progress bar, add to activity feed
- Show Interest response: Update stats, add to activity feed, show success modal

---

## 13. Related Documentation

- [Tier System](../../Global%20Context/tier_system.md) - Tier definitions and EDT logic
- [Subscription Tier Ceiling](../../Technical%20Specifications/subscription_tier_ceiling.md) - Subscription enforcement
- [Show Interest Flow](../../Technical%20Specifications/show_interest_flow.md) - Show Interest mechanics
- [HTML Implementation Guide](../../Design%20System/html_implementation_guide.md) - Component patterns
- [Discover Spec](discover_spec.md) - Browse/discover page
- [Profile View Spec](profile_view_spec.md) - Profile viewing page

---

**Document Owner:** Product Lead & Design Lead
**Last Updated:** 2026-02-27
**Status:** Complete — Ready for Implementation
**Estimated Development Time:** 30-40 hours
