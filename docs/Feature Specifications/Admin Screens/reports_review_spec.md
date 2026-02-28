# User Reports Review Interface Feature Specification

**Version:** 1.0.0
**Last Updated:** 2026-02-27
**Status:** Complete - Ready for Implementation
**Classification:** Admin Feature Specification

---

## Overview

The User Reports Review Interface is a specialized moderation tool for investigating and actioning user-submitted reports of harassment, inappropriate content, scams, fake profiles, and other safety violations. It provides moderators with comprehensive context, evidence review tools, investigation workflows, and decision-making frameworks aligned with JoyMatcher's trust-based, marriage-focused community standards.

**Document Purpose:** This specification provides complete implementation details for the User Reports Review Interface, including report prioritization, investigation workflows, evidence presentation, decision trees, action buttons, escalation paths, HTML/Tailwind examples, and response time tracking.

---

## Admin Role Access

### Access Matrix

| Admin Role | Access Level | Permitted Actions |
|------------|--------------|-------------------|
| Super Admin | Full Access | All moderation functions + permanent bans + policy override |
| Moderator | Standard Access | Investigate reports, issue warnings, suspend users (≤30 days), escalate |
| VIP Coordinator | No Access | Cannot access user reports |
| VIP Expert | No Access | Cannot access user reports |
| Data Protection Officer | Limited Access | View reports for deletion requests only |
| Support Agent | Read-Only | View reports, cannot action |

**Decision Authority:**
- Moderators: Warnings, content removal, suspensions ≤30 days
- Super Admin: Permanent bans, policy exceptions, appeals

---

## Page Purpose & Admin Goals

### Moderator Goals

1. **Thorough Investigation:** Gather all context (reporter history, reported user history, evidence)
2. **Fair Assessment:** Determine if violation occurred based on community guidelines
3. **Appropriate Action:** Take proportional action (no action, warning, suspension, ban)
4. **User Protection:** Protect victims of harassment, scams, or abuse
5. **Pattern Detection:** Identify repeat offenders and emerging threats
6. **Documentation:** Log decisions with clear rationale for audit trail
7. **Timely Resolution:** Meet response time targets (Critical: 2h, High: 4h, Medium: 12h)

---

## Layout & Wireframe Description

### Page Structure

```
┌─────────────────────────────────────────────────────────────────┐
│ TOP NAVIGATION BAR                                              │
│ Logo | Reports Review | Moderator Badge | Profile | Logout      │
├──────────────┬──────────────────────────────────────────────────┤
│              │                                                  │
│   SIDEBAR    │          MAIN CONTENT AREA                      │
│   NAVIGATION │                                                  │
│              │   ┌────────────────────────────────────────┐    │
│ ▼ Report     │   │  REPORT DETAILS HEADER                 │    │
│   Type       │   │  [Priority] [Type] [Status] [Timestamp]│   │
│  - Harassment│   └────────────────────────────────────────┘    │
│  - Explicit  │                                                  │
│  - Scam      │   ┌────────────────────────────────────────┐    │
│  - Fake      │   │  REPORTER & REPORTED USER INFO         │    │
│  - Other     │   │  [Reporter Card] [Reported User Card]  │    │
│              │   └────────────────────────────────────────┘    │
│ ▼ Priority   │                                                  │
│  - Critical  │   ┌────────────────────────────────────────┐    │
│  - High      │   │  EVIDENCE SECTION                      │    │
│  - Medium    │   │  [Messages/Photos/Profile Content]     │    │
│  - Low       │   └────────────────────────────────────────┘    │
│              │                                                  │
│ ▼ Status     │   ┌────────────────────────────────────────┐    │
│  - Pending   │   │  INVESTIGATION NOTES                   │    │
│  - Reviewed  │   │  [Moderator analysis textarea]         │    │
│  - Actioned  │   └────────────────────────────────────────┘    │
│              │                                                  │
│              │   ┌────────────────────────────────────────┐    │
│              │   │  ACTION BUTTONS                        │    │
│              │   │  [No Action] [Warning] [Suspend] [Ban] │    │
│              │   └────────────────────────────────────────┘    │
│              │                                                  │
└──────────────┴──────────────────────────────────────────────────┘
```

### Responsive Behavior

- **Desktop (≥1024px):** Sidebar + Main Content (2-column layout)
- **Tablet (768px-1023px):** Collapsible sidebar, full-width content
- **Mobile (<768px):** Bottom tab navigation, stacked content

---

## Component Breakdown

### 1. Report Details Header

**Purpose:** Display report priority, type, status, and timeline at a glance

**HTML/Tailwind Example:**

```html
<!-- Report Details Header -->
<div class="bg-white rounded-xl shadow-sm border border-jm-gray-200 p-6 mb-6">
  <div class="flex items-start justify-between mb-4">
    <div class="space-y-2">
      <div class="flex items-center gap-2">
        <!-- Priority Badge -->
        <span class="
          inline-flex items-center gap-1
          bg-jm-error/10 text-jm-error
          px-3 py-1 rounded-md
          text-xs font-semibold uppercase
        ">
          <svg class="w-3 h-3" fill="currentColor" viewBox="0 20 20">
            <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 11-2 1 1 012zm-1-8a1 1 00-1 1v3a1 1 002V6a1 1 00-1-1z" clip-rule="evenodd"/>
          </svg>
          Critical
        </span>

        <!-- Report Type Badge -->
        <span class="
          inline-flex items-center
          bg-jm-gray-100 text-jm-gray-700
          px-3 py-1 rounded-md
          text-xs font-medium
        ">
          Harassment
        </span>

        <!-- Status Badge -->
        <span class="
          inline-flex items-center gap-1
          bg-jm-warning/10 text-jm-warning
          px-3 py-1 rounded-md
          text-xs font-semibold
        ">
          <span class="w-2 h-2 bg-jm-warning rounded-full animate-pulse"></span>
          Under Review
        </span>
      </div>

      <h1 class="font-serif text-2xl font-bold text-jm-gray-900">
        Report #4821: Harassment - Multiple unwanted messages
      </h1>

      <div class="flex items-center gap-4 text-sm text-jm-gray-600">
        <span class="flex items-center gap-1">
          <svg class="w-4 h-4" fill="currentColor" viewBox="0 20 20">
            <path fill-rule="evenodd" d="M10 18a8 8 100-16 8 8 000 16zm1-12a1 1 10-2v4a1 1 00.293.707l2.828 2.829a1 1 101.415-1.415L11 9.586V6z" clip-rule="evenodd"/>
          </svg>
          Submitted: 2 hours ago
        </span>
        <span class="flex items-center gap-1">
          <svg class="w-4 h-4" fill="currentColor" viewBox="0 20 20">
            <path fill-rule="evenodd" d="M10 18a8 8 100-16 8 8 000 16zm1-12a1 1 10-2v4a1 1 00.293.707l2.828 2.829a1 1 101.415-1.415L11 9.586V6z" clip-rule="evenodd"/>
          </svg>
          Target Resolution: <span class="font-semibold text-jm-error">14 minutes remaining</span>
        </span>
      </div>
    </div>

    <!-- Quick Actions -->
    <div class="flex items-center gap-2">
      <button class="
        p-2 rounded-lg
        text-jm-gray-600 hover:text-jm-gray-900 hover:bg-jm-gray-100
        transition-all duration-200
        focus:outline-none focus:ring-2 focus:ring-jm-gray-400
      " aria-label="Print report">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 17h2a2 2 002-2v-4a2 2 00-2-2H5a2 2 00-2 2v4a2 2 002 2h2m2 4h6a2 2 002-2v-4a2 2 00-2-2H9a2 2 00-2 2v4a2 2 002 2zm8-12V5a2 2 00-2-2H9a2 2 00-2 2v4h10z"/>
        </svg>
      </button>
      <button class="
        p-2 rounded-lg
        text-jm-gray-600 hover:text-jm-gray-900 hover:bg-jm-gray-100
        transition-all duration-200
        focus:outline-none focus:ring-2 focus:ring-jm-gray-400
      " aria-label="Share report">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0a3 3 105.367-2.684 3 3 00-5.367 2.684zm0 9.316a3 3 105.368 2.684 3 3 00-5.368-2.684z"/>
        </svg>
      </button>
    </div>
  </div>

  <!-- Response Time Progress Bar -->
  <div class="relative">
    <div class="w-full bg-jm-gray-200 rounded-full h-2 overflow-hidden">
      <div class="bg-jm-error h-2 rounded-full transition-all duration-500" style="width: 88%"></div>
    </div>
    <p class="font-sans text-xs text-jm-gray-500 mt-1">
      88% of 2-hour target time elapsed
    </p>
  </div>
</div>
```

---

### 2. Reporter & Reported User Info Cards

**Purpose:** Display key information about both parties in the report

**HTML/Tailwind Example:**

```html
<!-- Reporter & Reported User Info -->
<div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
  <!-- Reporter Card -->
  <div class="bg-white rounded-xl shadow-sm border border-jm-gray-200 p-6">
    <div class="flex items-center justify-between mb-4">
      <h3 class="font-sans text-sm font-semibold text-jm-gray-600 uppercase tracking-wide">
        Reporter
      </h3>
      <span class="inline-flex items-center gap-1 bg-jm-success/10 text-jm-success px-2 py-1 rounded-md text-xs font-semibold">
        <svg class="w-3 h-3" fill="currentColor" viewBox="0 20 20">
          <path fill-rule="evenodd" d="M10 18a8 8 100-16 8 8 000 16zm3.707-9.293a1 1 00-1.414-1.414L9 10.586 7.707 9.293a1 1 00-1.414 1.414l2 2a1 1 001.414l4-4z" clip-rule="evenodd"/>
        </svg>
        Good Standing
      </span>
    </div>

    <div class="flex items-start gap-4 mb-4">
      <img
        src="/images/users/ngozi.jpg"
        alt="Ngozi M."
        class="w-16 h-16 rounded-full border-2 border-jm-gray-200 object-cover"
      />
      <div class="flex-1">
        <h4 class="font-sans text-lg font-semibold text-jm-gray-900">
          Ngozi M.
        </h4>
        <p class="font-sans text-sm text-jm-gray-600">
          ID: 11223 | 28, Female, Lagos
        </p>
        <p class="font-sans text-sm text-jm-gray-600">
          Premium Member (3 months)
        </p>
      </div>
    </div>

    <div class="bg-jm-gray-50 rounded-lg p-3 space-y-2 text-sm">
      <div class="flex items-center justify-between">
        <span class="text-jm-gray-600">Tier Progress:</span>
        <span class="font-medium text-jm-gray-900">Tier 3 Complete</span>
      </div>
      <div class="flex items-center justify-between">
        <span class="text-jm-gray-600">Account Age:</span>
        <span class="font-medium text-jm-gray-900">6 months</span>
      </div>
      <div class="flex items-center justify-between">
        <span class="text-jm-gray-600">Previous Reports Filed:</span>
        <span class="font-medium text-jm-gray-900">0</span>
      </div>
      <div class="flex items-center justify-between">
        <span class="text-jm-gray-600">Reports Against:</span>
        <span class="font-medium text-jm-gray-900">0</span>
      </div>
      <div class="flex items-center justify-between">
        <span class="text-jm-gray-600">Warnings:</span>
        <span class="font-medium text-jm-success">0</span>
      </div>
    </div>

    <button class="
      w-full mt-4
      border-2 border-jm-gray-300 hover:border-jm-gray-400
      text-jm-gray-700 hover:text-jm-gray-900
      font-sans font-medium text-sm
      px-4 py-2 rounded-lg
      transition-all duration-200
      focus:outline-none focus:ring-2 focus:ring-jm-gray-400
    ">
      View Full Profile
    </button>
  </div>

  <!-- Reported User Card -->
  <div class="bg-white rounded-xl shadow-sm border border-jm-error/20 p-6">
    <div class="flex items-center justify-between mb-4">
      <h3 class="font-sans text-sm font-semibold text-jm-gray-600 uppercase tracking-wide">
        Reported User
      </h3>
      <span class="inline-flex items-center gap-1 bg-jm-warning/10 text-jm-warning px-2 py-1 rounded-md text-xs font-semibold">
        <svg class="w-3 h-3" fill="currentColor" viewBox="0 20 20">
          <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 11-2 1 1 012zm-1-8a1 1 00-1 1v3a1 1 002V6a1 1 00-1-1z" clip-rule="evenodd"/>
        </svg>
        1 Previous Warning
      </span>
    </div>

    <div class="flex items-start gap-4 mb-4">
      <img
        src="/images/users/emeka.jpg"
        alt="Emeka T."
        class="w-16 h-16 rounded-full border-2 border-jm-error/20 object-cover"
      />
      <div class="flex-1">
        <h4 class="font-sans text-lg font-semibold text-jm-gray-900">
          Emeka T.
        </h4>
        <p class="font-sans text-sm text-jm-gray-600">
          ID: 44556 | 33, Male, Lagos
        </p>
        <p class="font-sans text-sm text-jm-gray-600">
          Premium Member (1 month)
        </p>
      </div>
    </div>

    <div class="bg-jm-error/5 rounded-lg p-3 space-y-2 text-sm border border-jm-error/20">
      <div class="flex items-center justify-between">
        <span class="text-jm-gray-600">Tier Progress:</span>
        <span class="font-medium text-jm-gray-900">Tier 2 Complete</span>
      </div>
      <div class="flex items-center justify-between">
        <span class="text-jm-gray-600">Account Age:</span>
        <span class="font-medium text-jm-gray-900">2 months</span>
      </div>
      <div class="flex items-center justify-between">
        <span class="text-jm-gray-600">Previous Reports Filed:</span>
        <span class="font-medium text-jm-gray-900">0</span>
      </div>
      <div class="flex items-center justify-between">
        <span class="text-jm-gray-600">Reports Against:</span>
        <span class="font-medium text-jm-error">2 (1 resolved)</span>
      </div>
      <div class="flex items-center justify-between">
        <span class="text-jm-gray-600">Warnings:</span>
        <span class="font-medium text-jm-warning">1 (45 days ago)</span>
      </div>
    </div>

    <!-- Previous Report Alert -->
    <div class="bg-jm-warning/10 border-l-4 border-jm-warning p-3 rounded-r-lg mt-4">
      <div class="flex items-start gap-2">
        <svg class="w-4 h-4 text-jm-warning flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 20 20">
          <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 11-2 1 1 012zm-1-8a1 1 00-1 1v3a1 1 002V6a1 1 00-1-1z" clip-rule="evenodd"/>
        </svg>
        <div class="flex-1">
          <p class="font-sans text-xs font-semibold text-jm-warning mb-1">
            Previous Violation History
          </p>
          <p class="font-sans text-xs text-jm-gray-700">
            Warning issued 45 days ago for similar behavior (unwanted contact after decline).
          </p>
          <button class="text-jm-warning hover:text-jm-warning/80 font-medium text-xs mt-1 underline">
            View Previous Report #3847
          </button>
        </div>
      </div>
    </div>

    <button class="
      w-full mt-4
      border-2 border-jm-gray-300 hover:border-jm-gray-400
      text-jm-gray-700 hover:text-jm-gray-900
      font-sans font-medium text-sm
      px-4 py-2 rounded-lg
      transition-all duration-200
      focus:outline-none focus:ring-2 focus:ring-jm-gray-400
    ">
      View Full Profile
    </button>
  </div>
</div>
```

---

### 3. Evidence Section

**Purpose:** Display all evidence attached to the report (messages, screenshots, profile content)

**HTML/Tailwind Example:**

```html
<!-- Evidence Section -->
<div class="bg-white rounded-xl shadow-sm border border-jm-gray-200 p-6 mb-6">
  <h3 class="font-sans text-lg font-semibold text-jm-gray-900 mb-4">
    Evidence Attached to Report
  </h3>

  <!-- Report Description -->
  <div class="bg-jm-gray-50 rounded-lg p-4 mb-6">
    <h4 class="font-sans text-sm font-semibold text-jm-gray-700 mb-2">
      Reporter's Description
    </h4>
    <p class="font-sans text-base text-jm-gray-900">
      "This user sent me multiple messages after I declined his Show Interest request.
      He called me rude and said I wasted his time. I feel uncomfortable."
    </p>
  </div>

  <!-- Message Thread Evidence -->
  <div class="space-y-4">
    <h4 class="font-sans text-sm font-semibold text-jm-gray-700">
      Message Thread (4 messages)
    </h4>

    <!-- Message 1 -->
    <div class="bg-jm-gray-50 rounded-lg p-4 border-l-4 border-jm-gray-300">
      <div class="flex items-start justify-between mb-2">
        <span class="font-sans text-xs font-medium text-jm-gray-600">
          Emeka T. → Ngozi M.
        </span>
        <span class="font-sans text-xs text-jm-gray-500">
          Feb 24, 10:30 AM
        </span>
      </div>
      <p class="font-sans text-sm text-jm-gray-900">
        "Hi Ngozi, I'd like to get to know you better. Would you like to connect?"
      </p>
      <div class="mt-2 pt-2 border-t border-jm-gray-200">
        <span class="inline-flex items-center gap-1 bg-jm-success/10 text-jm-success px-2 py-1 rounded-md text-xs font-medium">
          <svg class="w-3 h-3" fill="currentColor" viewBox="0 20 20">
            <path fill-rule="evenodd" d="M10 18a8 8 100-16 8 8 000 16zm3.707-9.293a1 1 00-1.414-1.414L9 10.586 7.707 9.293a1 1 00-1.414 1.414l2 2a1 1 001.414l4-4z" clip-rule="evenodd"/>
          </svg>
          Appropriate initial contact
        </span>
      </div>
    </div>

    <!-- System Event -->
    <div class="bg-jm-info/5 rounded-lg p-3 border-l-4 border-jm-info">
      <div class="flex items-start gap-2">
        <svg class="w-4 h-4 text-jm-info flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 20 20">
          <path fill-rule="evenodd" d="M18 10a8 8 11-16 8 8 0116zm-7-4a1 1 11-2 1 1 012zM9 9a1 1 000 2v3a1 1 001 1h1a1 1 100-2v-3a1 1 00-1-1H9z" clip-rule="evenodd"/>
        </svg>
        <p class="font-sans text-xs text-jm-gray-700">
          <strong>System Event:</strong> Ngozi declined the Show Interest request (Feb 24, 10:45 AM)
        </p>
      </div>
    </div>

    <!-- Message 2 (After Decline) -->
    <div class="bg-jm-warning/5 rounded-lg p-4 border-l-4 border-jm-warning">
      <div class="flex items-start justify-between mb-2">
        <span class="font-sans text-xs font-medium text-jm-gray-600">
          Emeka T. → Ngozi M.
        </span>
        <span class="font-sans text-xs text-jm-gray-500">
          Feb 24, 11:15 AM (30 minutes after decline)
        </span>
      </div>
      <p class="font-sans text-sm text-jm-gray-900">
        "Why did you decline? I took time to read your profile."
      </p>
      <div class="mt-2 pt-2 border-t border-jm-warning/20">
        <span class="inline-flex items-center gap-1 bg-jm-warning/10 text-jm-warning px-2 py-1 rounded-md text-xs font-semibold">
          <svg class="w-3 h-3" fill="currentColor" viewBox="0 20 20">
            <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 11-2 1 1 012zm-1-8a1 1 00-1 1v3a1 1 002V6a1 1 00-1-1z" clip-rule="evenodd"/>
          </svg>
          Boundary violation (contact after decline)
        </span>
      </div>
    </div>

    <!-- Message 3 -->
    <div class="bg-jm-warning/5 rounded-lg p-4 border-l-4 border-jm-warning">
      <div class="flex items-start justify-between mb-2">
        <span class="font-sans text-xs font-medium text-jm-gray-600">
          Emeka T. → Ngozi M.
        </span>
        <span class="font-sans text-xs text-jm-gray-500">
          Feb 24, 2:45 PM (4 hours after decline)
        </span>
      </div>
      <p class="font-sans text-sm text-jm-gray-900">
        "At least have the courtesy to reply."
      </p>
      <div class="mt-2 pt-2 border-t border-jm-warning/20">
        <span class="inline-flex items-center gap-1 bg-jm-warning/10 text-jm-warning px-2 py-1 rounded-md text-xs font-semibold">
          Persistent unwanted contact
        </span>
      </div>
    </div>

    <!-- Message 4 (Escalated) -->
    <div class="bg-jm-error/10 rounded-lg p-4 border-l-4 border-jm-error">
      <div class="flex items-start justify-between mb-2">
        <span class="font-sans text-xs font-medium text-jm-gray-600">
          Emeka T. → Ngozi M.
        </span>
        <span class="font-sans text-xs text-jm-gray-500">
          Feb 25, 9:00 AM (next day)
        </span>
      </div>
      <p class="font-sans text-sm text-jm-gray-900 font-medium">
        "You're rude. Women like you waste people's time on here."
      </p>
      <div class="mt-2 pt-2 border-t border-jm-error/20">
        <span class="inline-flex items-center gap-1 bg-jm-error/10 text-jm-error px-2 py-1 rounded-md text-xs font-semibold">
          <svg class="w-3 h-3" fill="currentColor" viewBox="0 20 20">
            <path fill-rule="evenodd" d="M10 18a8 8 100-16 8 8 000 16zM8.707 7.293a1 1 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 101.414 1.414L10 11.414l1.293 1.293a1 1 001.414-1.414L11.414 10l1.293-1.293a1 1 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"/>
          </svg>
          HARASSMENT (disrespectful, accusatory)
        </span>
      </div>
    </div>

    <!-- Message 5 (Monitoring Behavior) -->
    <div class="bg-jm-error/10 rounded-lg p-4 border-l-4 border-jm-error">
      <div class="flex items-start justify-between mb-2">
        <span class="font-sans text-xs font-medium text-jm-gray-600">
          Emeka T. → Ngozi M.
        </span>
        <span class="font-sans text-xs text-jm-gray-500">
          Feb 26, 10:30 AM (2 days later)
        </span>
      </div>
      <p class="font-sans text-sm text-jm-gray-900 font-medium">
        "I see you're still online. Too good to reply to me?"
      </p>
      <div class="mt-2 pt-2 border-t border-jm-error/20">
        <span class="inline-flex items-center gap-1 bg-jm-error/10 text-jm-error px-2 py-1 rounded-md text-xs font-semibold">
          <svg class="w-3 h-3" fill="currentColor" viewBox="0 20 20">
            <path fill-rule="evenodd" d="M10 18a8 8 100-16 8 8 000 16zM8.707 7.293a1 1 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 101.414 1.414L10 11.414l1.293 1.293a1 1 001.414-1.414L11.414 10l1.293-1.293a1 1 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"/>
          </svg>
          HARASSMENT (monitoring online activity)
        </span>
      </div>
    </div>
  </div>
</div>
```

---

### 4. Investigation Notes & Decision Section

**Purpose:** Allow moderator to document analysis and select appropriate action

**HTML/Tailwind Example:**

```html
<!-- Investigation Notes & Decision Section -->
<div class="bg-white rounded-xl shadow-sm border border-jm-gray-200 p-6 mb-6">
  <h3 class="font-sans text-lg font-semibold text-jm-gray-900 mb-4">
    Investigation & Decision
  </h3>

  <!-- Automated Analysis (AI-assisted) -->
  <div class="bg-jm-info/5 border-l-4 border-jm-info p-4 rounded-r-lg mb-6">
    <div class="flex items-start gap-3">
      <svg class="w-5 h-5 text-jm-info flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 20 20">
        <path fill-rule="evenodd" d="M10 18a8 8 100-16 8 8 000 16zm3.707-9.293a1 1 00-1.414-1.414L9 10.586 7.707 9.293a1 1 00-1.414 1.414l2 2a1 1 001.414l4-4z" clip-rule="evenodd"/>
      </svg>
      <div class="flex-1">
        <h4 class="font-sans text-sm font-semibold text-jm-info mb-2">
          AI-Assisted Analysis
        </h4>
        <ul class="space-y-1 text-sm text-jm-gray-700">
          <li class="flex items-start gap-2">
            <svg class="w-4 h-4 text-jm-error flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 20 20">
              <path fill-rule="evenodd" d="M10 18a8 8 100-16 8 8 000 16zM8.707 7.293a1 1 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 101.414 1.414L10 11.414l1.293 1.293a1 1 001.414-1.414L11.414 10l1.293-1.293a1 1 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"/>
            </svg>
            <span><strong>Harassment pattern detected:</strong> Multiple messages after explicit decline</span>
          </li>
          <li class="flex items-start gap-2">
            <svg class="w-4 h-4 text-jm-error flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 20 20">
              <path fill-rule="evenodd" d="M10 18a8 8 100-16 8 8 000 16zM8.707 7.293a1 1 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 101.414 1.414L10 11.414l1.293 1.293a1 1 001.414-1.414L11.414 10l1.293-1.293a1 1 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"/>
            </svg>
            <span><strong>Negative sentiment:</strong> Disrespectful language detected ("rude", "waste time")</span>
          </li>
          <li class="flex items-start gap-2">
            <svg class="w-4 h-4 text-jm-warning flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 20 20">
              <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 11-2 1 1 012zm-1-8a1 1 00-1 1v3a1 1 002V6a1 1 00-1-1z" clip-rule="evenodd"/>
            </svg>
            <span><strong>Repeat offender:</strong> Similar violation 45 days ago (warning issued)</span>
          </li>
        </ul>
        <p class="font-sans text-xs text-jm-gray-600 mt-3">
          <strong>Recommended Action:</strong> 14-day suspension (moderate violation + repeat offender)
        </p>
      </div>
    </div>
  </div>

  <!-- Moderator Investigation Notes -->
  <div class="mb-6">
    <label class="block font-sans text-sm font-medium text-jm-gray-700 mb-2">
      Moderator Investigation Notes
      <span class="text-jm-error">*</span>
    </label>
    <textarea
      rows="6"
      placeholder="Document your investigation findings, rationale for decision, and any additional context..."
      class="
        w-full px-4 py-3 rounded-lg
        border-2 border-jm-gray-300 focus:border-jm-purple focus:ring-2 focus:ring-jm-purple/20
        font-sans text-base text-jm-gray-900 placeholder:text-jm-gray-400
        focus:outline-none
        resize-vertical
      "
      required
    >User Emeka sent 5 unwanted messages to Ngozi after she declined his Show Interest request. Messages became progressively disrespectful and accusatory. Clear boundary violation.

Reporter (Ngozi) has good standing, no history of false reports.

Reported user (Emeka) received warning 45 days ago for similar behavior (unwanted contact after decline). No improvement shown.

Decision: 14-day suspension warranted due to:
1. Clear harassment pattern (5 messages over 2 days after decline)
2. Disrespectful language ("rude", "waste time")
3. Repeat offender (previous warning)

This is Emeka's second violation. Next violation will be escalated for permanent ban.</textarea>
    <p class="font-sans text-xs text-jm-gray-500 mt-1">
      Required for all decisions (minimum 50 characters)
    </p>
  </div>

  <!-- Decision Action Buttons -->
  <div class="space-y-4">
    <h4 class="font-sans text-sm font-semibold text-jm-gray-700">
      Select Action <span class="text-jm-error">*</span>
    </h4>

    <!-- Action: No Violation -->
    <div class="border-2 border-jm-gray-200 rounded-lg p-4 hover:border-jm-gray-400 cursor-pointer transition-all duration-200">
      <div class="flex items-start gap-3">
        <input
          type="radio"
          id="action-none"
          name="action"
          value="none"
          class="w-5 h-5 mt-0.5 text-jm-purple focus:ring-2 focus:ring-jm-purple/20"
        />
        <label for="action-none" class="flex-1 cursor-pointer">
          <div class="flex items-center gap-2 mb-1">
            <span class="font-sans text-base font-semibold text-jm-gray-900">
              No Violation Found
            </span>
          </div>
          <p class="font-sans text-sm text-jm-gray-600">
            Close report. No action taken against reported user. Notify reporter.
          </p>
        </label>
      </div>
    </div>

    <!-- Action: Warning -->
    <div class="border-2 border-jm-gray-200 rounded-lg p-4 hover:border-jm-warning cursor-pointer transition-all duration-200">
      <div class="flex items-start gap-3">
        <input
          type="radio"
          id="action-warning"
          name="action"
          value="warning"
          class="w-5 h-5 mt-0.5 text-jm-purple focus:ring-2 focus:ring-jm-purple/20"
        />
        <label for="action-warning" class="flex-1 cursor-pointer">
          <div class="flex items-center gap-2 mb-1">
            <span class="font-sans text-base font-semibold text-jm-gray-900">
              Issue Warning
            </span>
            <span class="inline-flex items-center gap-1 bg-jm-warning/10 text-jm-warning px-2 py-1 rounded-md text-xs font-semibold">
              First-time violation
            </span>
          </div>
          <p class="font-sans text-sm text-jm-gray-600">
            Send official warning to user. Log violation. No account restrictions.
          </p>
        </label>
      </div>
    </div>

    <!-- Action: Suspension (SELECTED) -->
    <div class="border-2 border-jm-error bg-jm-error/5 rounded-lg p-4 cursor-pointer">
      <div class="flex items-start gap-3">
        <input
          type="radio"
          id="action-suspend"
          name="action"
          value="suspend"
          class="w-5 h-5 mt-0.5 text-jm-purple focus:ring-2 focus:ring-jm-purple/20"
          checked
        />
        <label for="action-suspend" class="flex-1 cursor-pointer">
          <div class="flex items-center gap-2 mb-1">
            <span class="font-sans text-base font-semibold text-jm-gray-900">
              Suspend User
            </span>
            <span class="inline-flex items-center gap-1 bg-jm-error/10 text-jm-error px-2 py-1 rounded-md text-xs font-semibold">
              Recommended
            </span>
          </div>
          <p class="font-sans text-sm text-jm-gray-600 mb-3">
            Temporarily suspend user account. User cannot log in during suspension.
          </p>

          <!-- Suspension Duration Selector -->
          <div class="bg-white rounded-lg p-3 border border-jm-error/20">
            <label class="block font-sans text-xs font-medium text-jm-gray-700 mb-2">
              Suspension Duration <span class="text-jm-error">*</span>
            </label>
            <select
              class="
                w-full px-3 py-2 rounded-lg
                border-2 border-jm-gray-300 focus:border-jm-purple focus:ring-2 focus:ring-jm-purple/20
                font-sans text-sm text-jm-gray-900
                focus:outline-none
              "
              required
            >
              <option value="">Select duration...</option>
              <option value="7">7 days (minor violation)</option>
              <option value="14" selected>14 days (moderate violation)</option>
              <option value="30">30 days (serious violation)</option>
            </select>
          </div>
        </label>
      </div>
    </div>

    <!-- Action: Escalate for Ban -->
    <div class="border-2 border-jm-gray-200 rounded-lg p-4 hover:border-jm-error cursor-pointer transition-all duration-200">
      <div class="flex items-start gap-3">
        <input
          type="radio"
          id="action-escalate"
          name="action"
          value="escalate"
          class="w-5 h-5 mt-0.5 text-jm-purple focus:ring-2 focus:ring-jm-purple/20"
        />
        <label for="action-escalate" class="flex-1 cursor-pointer">
          <div class="flex items-center gap-2 mb-1">
            <span class="font-sans text-base font-semibold text-jm-gray-900">
              Escalate to Super Admin for Permanent Ban
            </span>
            <span class="inline-flex items-center gap-1 bg-jm-error/10 text-jm-error px-2 py-1 rounded-md text-xs font-semibold">
              Severe violation
            </span>
          </div>
          <p class="font-sans text-sm text-jm-gray-600">
            Escalate to Super Admin for permanent ban consideration. Use for severe violations or repeat offenders.
          </p>
        </label>
      </div>
    </div>
  </div>

  <!-- Submit Actions -->
  <div class="flex items-center gap-3 mt-8 pt-6 border-t border-jm-gray-200">
    <button
      type="button"
      class="
        flex-1 border-2 border-jm-gray-300 hover:border-jm-gray-400
        text-jm-gray-700 hover:text-jm-gray-900
        font-sans font-medium
        px-6 py-3 rounded-lg
        transition-all duration-200
        focus:outline-none focus:ring-2 focus:ring-jm-gray-400 focus:ring-offset-2
      "
    >
      Save as Draft
    </button>
    <button
      type="button"
      class="
        flex-1 bg-gradient-jm hover:bg-gradient-jm-hover
        text-white font-sans font-semibold
        px-6 py-3 rounded-lg
        transition-all duration-200
        shadow-sm hover:shadow-md
        focus:outline-none focus:ring-2 focus:ring-jm-coral focus:ring-offset-2
      "
    >
      Submit Decision & Take Action
    </button>
  </div>
</div>
```

---

## Form Validation Rules

### Required Fields

- **Investigation Notes:** Required, minimum 50 characters
- **Action Selection:** Required (must select one action)
- **Suspension Duration:** Required if "Suspend User" selected
- **Escalation Reason:** Required if "Escalate for Ban" selected

### Validation Errors

```javascript
// Frontend validation
function validateReportReview() {
  const notes = document.getElementById('investigation-notes').value;
  const action = document.querySelector('input[name="action"]:checked');
  const suspensionDuration = document.getElementById('suspension-duration');

  if (!notes || notes.trim().length < 50) {
    showErrorNotification('Validation Error', 'Investigation notes must be at least 50 characters');
    return false;
  }

  if (!action) {
    showErrorNotification('Validation Error', 'Please select an action');
    return false;
  }

  if (action.value === 'suspend' && (!suspensionDuration || !suspensionDuration.value)) {
    showErrorNotification('Validation Error', 'Please select suspension duration');
    return false;
  }

  return true;
}
```

---

## Workflow Diagram

### Report Review Workflow

```
Report Submitted
       │
       ├─> Auto-Priority Assignment (based on type + keywords)
       │
       ↓
Moderator Reviews Evidence
       │
       ├─> Review Reporter History
       ├─> Review Reported User History
       ├─> Examine All Evidence (messages, screenshots)
       ├─> AI-Assisted Analysis (optional guidance)
       │
       ↓
Moderator Makes Decision
       │
       ├─> NO VIOLATION
       │   ├─> Close report
       │   ├─> Notify reporter (no action taken)
       │   └─> Document reason
       │
       ├─> WARNING (First-time minor violation)
       │   ├─> Send warning to user
       │   ├─> Log violation
       │   ├─> Notify reporter (action taken)
       │   └─> Monitor user for 90 days
       │
       ├─> SUSPENSION (Moderate/serious violation or repeat offender)
       │   ├─> Execute suspension (7/14/30 days)
       │   ├─> User logged out, profile hidden
       │   ├─> Block user from contacting reporter
       │   ├─> Notify both parties
       │   └─> Flag for monitoring post-suspension
       │
       └─> ESCALATE FOR BAN (Severe violation or pattern)
           ├─> Create escalation ticket
           ├─> Notify Super Admin
           ├─> Temporary suspension while pending review
           └─> Super Admin makes final decision
```

---

## State Management Requirements

### Report Review State Object

```javascript
const reportReviewState = {
  reportId: 'report_4821',
  type: 'harassment',
  priority: 'critical',
  status: 'under_review',
  submittedAt: '2026-02-27T08:00:00Z',
  targetResponseTime: '2026-02-27T10:00:00Z',

  reporter: {
    userId: 'user_11223',
    name: 'Ngozi M.',
    age: 28,
    accountAge: '6 months',
    subscription: 'premium',
    tierCompleted: 3,
    previousReportsFiled: 0,
    reportsAgainst: 0,
    warnings: 0,
    accountStanding: 'good',
  },

  reportedUser: {
    userId: 'user_44556',
    name: 'Emeka T.',
    age: 33,
    accountAge: '2 months',
    subscription: 'premium',
    tierCompleted: 2,
    previousReportsFiled: 0,
    reportsAgainst: 2,
    warnings: 1,
    accountStanding: 'warning',
    previousViolations: [
      {
        reportId: 'report_3847',
        date: '2026-01-12',
        violation: 'unwanted_contact_after_decline',
        action: 'warning',
      },
    ],
  },

  evidence: {
    description: 'User sent multiple messages after I declined...',
    messages: [
      {
        messageId: 'msg_78901',
        from: 'user_44556',
        to: 'user_11223',
        content: 'Hi Ngozi, I\'d like to get to know you better...',
        timestamp: '2026-02-24T10:30:00Z',
        violation: null,
      },
      {
        messageId: 'msg_78902',
        from: 'user_44556',
        to: 'user_11223',
        content: 'Why did you decline? I took time to read your profile.',
        timestamp: '2026-02-24T11:15:00Z',
        violation: 'boundary_violation',
      },
      {
        messageId: 'msg_78903',
        from: 'user_44556',
        to: 'user_11223',
        content: 'At least have the courtesy to reply.',
        timestamp: '2026-02-24T14:45:00Z',
        violation: 'persistent_contact',
      },
      {
        messageId: 'msg_78904',
        from: 'user_44556',
        to: 'user_11223',
        content: 'You\'re rude. Women like you waste people\'s time on here.',
        timestamp: '2026-02-25T09:00:00Z',
        violation: 'harassment',
      },
    ],
    systemEvents: [
      {
        event: 'show_interest_declined',
        userId: 'user_11223',
        timestamp: '2026-02-24T10:45:00Z',
      },
    ],
  },

  aiAnalysis: {
    harassmentDetected: true,
    sentimentScore: -0.65, // Negative sentiment
    recommendedAction: 'suspend',
    recommendedDuration: 14,
  },

  moderatorDecision: {
    moderatorId: 'admin_moderator_001',
    investigationNotes: 'User Emeka sent 5 unwanted messages...',
    action: 'suspend',
    suspensionDuration: 14,
    decidedAt: '2026-02-27T10:30:00Z',
    executedAt: null,
  },
};
```

---

## Audit Logging Requirements

**ALL report review actions must be logged.**

### Log Structure

```javascript
const ReportAuditLog = {
  timestamp: Date,
  moderatorId: ObjectId,
  action: String, // 'review_report', 'close_report', 'issue_warning', 'suspend_user', 'escalate'
  reportId: ObjectId,
  reportedUserId: ObjectId,
  reporterUserId: ObjectId,
  decision: String,
  reason: String,
  notes: String,
  suspensionDuration: Number, // days (if applicable)
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
  reportId: "report_4821",
  reportedUserId: "user_44556",
  reporterUserId: "user_11223",
  decision: "suspend",
  reason: "harassment",
  notes: "User sent 5 unwanted messages after decline. Disrespectful language. Repeat offender (previous warning 45 days ago).",
  suspensionDuration: 14,
  ipAddress: "10.0.0.15",
  userAgent: "Mozilla/5.0...",
  result: "success"
}
```

---

## Accessibility Requirements

**WCAG 2.1 AA Compliance:**

1. **Keyboard Navigation:** All interactive elements accessible via Tab key
2. **Screen Reader Support:** ARIA labels on priority badges, evidence markers
3. **Color Contrast:** Minimum 4.5:1 for all text
4. **Focus Indicators:** Visible focus rings on all focusable elements
5. **Form Labels:** All inputs properly labeled

---

## Related Documentation

- [Admin Architecture](../../Admin%20System/admin_architecture.md) - Overall admin system design
- [Admin Roles & Permissions](../../Admin%20System/admin_roles_permissions.md) - Permission matrices
- [Moderation Workflows](../../Admin%20System/moderation_workflows.md) - Detailed moderation procedures
- [Moderation Queue Spec](moderation_queue_spec.md) - Queue interface
- [HTML Implementation Guide](../../Design%20System/html_implementation_guide.md) - Tailwind patterns

---

**Document Owner:** Product Lead & Community Lead
**Last Reviewed:** 2026-02-27
**Next Review:** Weekly during implementation
**Implementation Priority:** P0 (Critical - Required for Platform Safety)
