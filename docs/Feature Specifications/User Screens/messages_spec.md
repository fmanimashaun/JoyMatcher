# Messages Feature Specification

**Version:** 1.0.0
**Last Updated:** 2026-02-27
**Status:** Complete
**Page Route:** `/app/messages` (index), `/app/messages/:conversation_id` (conversation view)
**Access Level:** Authenticated users only (requires accepted Show Interest)

---

## 1. Page Purpose & User Goals

### Primary Purpose
The Messages page provides real-time chat functionality for users who have mutually accepted Show Interest requests. It enables ongoing communication while respecting tier-based disclosure rules and EDT constraints.

### User Goals
- **View all active conversations:** See list of all users they can message
- **Send and receive messages in real-time:** Instant communication without page refresh
- **Maintain context:** Access conversation history and EDT-appropriate profile information
- **Manage conversations:** Archive, mute, or report problematic conversations
- **Respect privacy:** EDT rules apply to all profile information shown in conversations

### Success Metrics
- Message delivery time: <500ms (real-time)
- Message read receipt accuracy: >98%
- Conversation engagement: Average 8+ messages per conversation
- User satisfaction: <2% harassment reports
- Real-time connectivity: >95% uptime for Action Cable

---

## 2. Layout & Wireframe Description

### Overall Structure (Desktop)
```
┌─────────────────────────────────────────────────────────────┐
│                    Navigation Header                         │
├──────────────────────┬──────────────────────────────────────┤
│  Conversations List  │      Active Conversation View        │
│  [Sidebar]           │      [Main Content Area]             │
│                      │                                       │
│  - Search            │  - Conversation Header               │
│  - Filters           │    (Name, EDT badge, online status)  │
│  - Conversation 1    │                                       │
│  - Conversation 2    │  - Message History                   │
│  - Conversation 3    │    (Scrollable, paginated)           │
│  - ...               │                                       │
│                      │  - Typing Indicator                  │
│                      │                                       │
│                      │  - Message Input Form                │
│                      │    (Textarea + Send button)          │
└──────────────────────┴──────────────────────────────────────┘
```

### Mobile Structure
```
┌─────────────────────────────────────┐
│      Navigation Header              │
├─────────────────────────────────────┤
│  Conversations List (Full Width)    │
│  OR                                 │
│  Active Conversation (Full Width)   │
│                                     │
│  [Toggle between list and chat]     │
└─────────────────────────────────────┘
```

### Viewport Considerations
- **Desktop (≥1024px):** Split view (sidebar + main), 30/70 width ratio
- **Tablet (768px-1023px):** Split view (sidebar + main), 40/60 width ratio
- **Mobile (320px-767px):** Single view toggle, full-width conversation or list

---

## 3. Component Breakdown

### 3.1 Conversations List (Sidebar)

**Content:**
- Search bar (filter by name)
- Filter controls (All, Unread, Archived)
- List of conversations with:
  - Partner profile photo
  - Partner name + last initial
  - Last message preview (truncated)
  - Timestamp (relative: "2m ago", "1h ago", "Yesterday")
  - Unread indicator badge
  - Online/offline status dot
  - EDT tier level badge

**HTML Structure:**
```html
<!-- Conversations List Sidebar -->
<aside class="
  w-full md:w-80 lg:w-96
  bg-white border-r border-jm-gray-200
  flex flex-col h-[calc(100vh-64px)]
">
  <!-- Search Bar -->
  <div class="p-4 border-b border-jm-gray-200">
    <div class="relative">
      <svg class="absolute left-3 top-3 w-5 h-5 text-jm-gray-400" fill="none" stroke="currentColor" viewBox="0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 11-14 7 7 0114z"/>
      </svg>
      <input
        type="search"
        placeholder="Search conversations..."
        class="
          w-full pl-10 pr-4 py-2 rounded-lg
          border-2 border-jm-gray-300 focus:border-jm-purple focus:ring-2 focus:ring-jm-purple/20
          font-sans text-sm text-jm-gray-900 placeholder:text-jm-gray-400
          transition-all duration-200
          focus:outline-none
        "
        aria-label="Search conversations"
      />
    </div>
  </div>

  <!-- Filter Tabs -->
  <div class="flex items-center gap-2 px-4 py-3 border-b border-jm-gray-200">
    <button
      type="button"
      class="px-3 py-1 rounded-md font-sans text-sm font-medium text-white bg-gradient-jm"
      aria-pressed="true"
    >
      All
    </button>
    <button
      type="button"
      class="px-3 py-1 rounded-md font-sans text-sm font-medium text-jm-gray-700 hover:bg-jm-gray-100"
      aria-pressed="false"
    >
      Unread (3)
    </button>
    <button
      type="button"
      class="px-3 py-1 rounded-md font-sans text-sm font-medium text-jm-gray-700 hover:bg-jm-gray-100"
      aria-pressed="false"
    >
      Archived
    </button>
  </div>

  <!-- Conversations List (Scrollable) -->
  <div class="flex-1 overflow-y-auto">
    <!-- Conversation Item (Active) -->
    <article
      class="
        flex items-start gap-3 p-4
        bg-jm-purple/5 border-l-4 border-jm-purple
        hover:bg-jm-purple/10
        cursor-pointer transition-colors
      "
      role="button"
      tabindex="0"
      aria-label="Conversation with Chidinma O."
    >
      <!-- Profile Photo -->
      <div class="relative flex-shrink-0">
        <img
          src="/images/profiles/user-123.jpg"
          alt="Chidinma O."
          class="w-12 h-12 rounded-full object-cover"
        />
        <!-- Online Status Dot -->
        <span
          class="absolute bottom-0 right-0 w-3 h-3 bg-jm-success border-2 border-white rounded-full"
          aria-label="Online"
        ></span>
      </div>

      <!-- Conversation Info -->
      <div class="flex-1 min-w-0">
        <div class="flex items-start justify-between gap-2 mb-1">
          <h3 class="font-sans text-sm font-semibold text-jm-gray-900 truncate">
            Chidinma O.
          </h3>
          <time class="font-sans text-xs text-jm-gray-500 flex-shrink-0">
            2m ago
          </time>
        </div>

        <!-- EDT Badge -->
        <div class="flex items-center gap-2 mb-1">
          <span class="inline-flex items-center gap-1 bg-jm-gray-100 text-jm-gray-700 px-2 py-0.5 rounded-md text-xs font-medium">
            EDT: Tier 3
          </span>
          <span class="inline-flex items-center gap-1 bg-jm-success/10 text-jm-success px-2 py-0.5 rounded-full text-xs font-medium">
            <svg class="w-3 h-3" fill="currentColor" viewBox="0 20 20">
              <path fill-rule="evenodd" d="M6.267 3.455a3.066 3.066 001.745-.723 3.066 3.066 013.976 3.066 3.066 001.745.723 3.066 3.066 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 010 3.976 3.066 3.066 00-.723 1.745 3.066 3.066 01-2.812 2.812 3.066 3.066 00-1.745.723 3.066 3.066 01-3.976 3.066 3.066 00-1.745-.723 3.066 3.066 01-2.812-2.812 3.066 3.066 00-.723-1.745 3.066 3.066 010-3.976 3.066 3.066 00.723-1.745 3.066 3.066 012.812-2.812zm7.44 5.252a1 1 00-1.414-1.414L9 10.586 7.707 9.293a1 1 00-1.414 1.414l2 2a1 1 001.414l4-4z" clip-rule="evenodd"/>
            </svg>
            Verified
          </span>
        </div>

        <!-- Last Message Preview -->
        <p class="font-sans text-sm text-jm-gray-600 truncate">
          That sounds great! I'd love to hear more about...
        </p>

        <!-- Unread Badge -->
        <div class="flex items-center gap-2 mt-1">
          <span class="bg-jm-purple text-white text-xs font-semibold px-2 py-0.5 rounded-full">
            2 new
          </span>
        </div>
      </div>
    </article>

    <!-- Conversation Item (Inactive, No Unread) -->
    <article
      class="
        flex items-start gap-3 p-4
        hover:bg-jm-gray-50
        cursor-pointer transition-colors
      "
      role="button"
      tabindex="0"
      aria-label="Conversation with Emmanuel A."
    >
      <!-- Profile Photo -->
      <div class="relative flex-shrink-0">
        <img
          src="/images/profiles/user-456.jpg"
          alt="Emmanuel A."
          class="w-12 h-12 rounded-full object-cover"
        />
        <!-- Offline Status Dot -->
        <span
          class="absolute bottom-0 right-0 w-3 h-3 bg-jm-gray-400 border-2 border-white rounded-full"
          aria-label="Offline"
        ></span>
      </div>

      <!-- Conversation Info -->
      <div class="flex-1 min-w-0">
        <div class="flex items-start justify-between gap-2 mb-1">
          <h3 class="font-sans text-sm font-semibold text-jm-gray-900 truncate">
            Emmanuel A.
          </h3>
          <time class="font-sans text-xs text-jm-gray-500 flex-shrink-0">
            1h ago
          </time>
        </div>

        <!-- EDT Badge -->
        <div class="flex items-center gap-2 mb-1">
          <span class="inline-flex items-center gap-1 bg-jm-gray-100 text-jm-gray-700 px-2 py-0.5 rounded-md text-xs font-medium">
            EDT: Tier 2
          </span>
        </div>

        <!-- Last Message Preview -->
        <p class="font-sans text-sm text-jm-gray-600 truncate">
          Thanks for sharing that. I appreciate your openness.
        </p>
      </div>
    </article>

    <!-- Empty State (No Conversations) -->
    <div class="flex flex-col items-center justify-center h-full p-8 text-center">
      <svg class="w-16 h-16 text-jm-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
      </svg>
      <h3 class="font-serif text-lg font-semibold text-jm-gray-900 mb-2">
        No Conversations Yet
      </h3>
      <p class="font-sans text-sm text-jm-gray-600 mb-4">
        Start connecting by sending Show Interest to profiles you like
      </p>
      <a
        href="/app/discover"
        class="
          bg-gradient-jm hover:bg-gradient-jm-hover
          text-white font-sans font-semibold
          px-6 py-3 rounded-lg
          transition-all duration-200
          shadow-md hover:shadow-lg
        "
      >
        Discover Matches
      </a>
    </div>
  </div>
</aside>
```

**Behavior:**
- Click conversation → Load conversation in main area (desktop) or navigate to conversation page (mobile)
- Search filters conversations in real-time (client-side or debounced API)
- Unread badge updates in real-time via Action Cable
- Online status updates every 30 seconds
- Scroll to load more (pagination for 50+ conversations)

---

### 3.2 Conversation Header

**Content:**
- Partner profile photo
- Partner name + last initial
- EDT tier level badge
- Online/offline status
- Last seen timestamp (if offline)
- Actions menu (View Profile, Mute, Archive, Report, Block)

**HTML Structure:**
```html
<!-- Conversation Header -->
<header class="
  flex items-center justify-between gap-4
  bg-white border-b border-jm-gray-200
  px-6 py-4
  sticky top-16 z-30
">
  <!-- Left: Partner Info -->
  <div class="flex items-center gap-3 flex-1 min-w-0">
    <!-- Back Button (Mobile Only) -->
    <button
      type="button"
      class="md:hidden p-2 rounded-full text-jm-gray-600 hover:text-jm-purple hover:bg-jm-gray-100"
      aria-label="Back to conversations list"
      onclick="history.back()"
    >
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
      </svg>
    </button>

    <!-- Profile Photo -->
    <div class="relative flex-shrink-0">
      <img
        src="/images/profiles/user-123.jpg"
        alt="Chidinma O."
        class="w-12 h-12 rounded-full object-cover"
      />
      <!-- Online Status Dot -->
      <span
        class="absolute bottom-0 right-0 w-3 h-3 bg-jm-success border-2 border-white rounded-full"
        aria-label="Online"
      ></span>
    </div>

    <!-- Partner Name & Status -->
    <div class="flex-1 min-w-0">
      <h2 class="font-serif text-lg font-semibold text-jm-gray-900 truncate">
        Chidinma O.
      </h2>
      <div class="flex items-center gap-2 flex-wrap">
        <!-- EDT Badge -->
        <span class="inline-flex items-center gap-1 bg-jm-gray-100 text-jm-gray-700 px-2 py-0.5 rounded-md text-xs font-medium">
          EDT: Tier 3
        </span>
        <!-- Verified Badge -->
        <span class="inline-flex items-center gap-1 bg-jm-success/10 text-jm-success px-2 py-0.5 rounded-full text-xs font-medium">
          <svg class="w-3 h-3" fill="currentColor" viewBox="0 20 20">
            <path fill-rule="evenodd" d="M6.267 3.455a3.066 3.066 001.745-.723 3.066 3.066 013.976 3.066 3.066 001.745.723 3.066 3.066 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 010 3.976 3.066 3.066 00-.723 1.745 3.066 3.066 01-2.812 2.812 3.066 3.066 00-1.745.723 3.066 3.066 01-3.976 3.066 3.066 00-1.745-.723 3.066 3.066 01-2.812-2.812 3.066 3.066 00-.723-1.745 3.066 3.066 010-3.976 3.066 3.066 00.723-1.745 3.066 3.066 012.812-2.812zm7.44 5.252a1 1 00-1.414-1.414L9 10.586 7.707 9.293a1 1 00-1.414 1.414l2 2a1 1 001.414l4-4z" clip-rule="evenodd"/>
          </svg>
          Verified
        </span>
        <!-- Online Status Text -->
        <span class="font-sans text-xs text-jm-success font-medium">
          Active now
        </span>
      </div>
    </div>
  </div>

  <!-- Right: Actions Menu -->
  <div class="flex items-center gap-2 flex-shrink-0">
    <!-- View Profile Button -->
    <a
      href="/app/profile/123"
      class="
        hidden sm:inline-flex items-center gap-2
        border-2 border-jm-purple hover:border-jm-purple-dark
        text-jm-purple hover:text-jm-purple-dark hover:bg-jm-purple/5
        font-sans font-medium text-sm
        px-4 py-2 rounded-lg
        transition-all duration-200
        focus:outline-none focus:ring-2 focus:ring-jm-purple focus:ring-offset-2
      "
    >
      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 11-8 4 4 018zM12 14a7 7 00-7 7h14a7 7 00-7-7z"/>
      </svg>
      View Profile
    </a>

    <!-- Actions Dropdown -->
    <div class="relative">
      <button
        type="button"
        class="
          p-2 rounded-full
          text-jm-gray-600 hover:text-jm-purple hover:bg-jm-gray-100
          transition-all duration-200
          focus:outline-none focus:ring-2 focus:ring-jm-purple focus:ring-offset-1
        "
        aria-label="Conversation actions"
        aria-expanded="false"
      >
        <svg class="w-5 h-5" fill="currentColor" viewBox="0 20 20">
          <path d="M10 6a2 2 110-4 2 2 010 4zM10 12a2 2 110-4 2 2 010 4zM10 18a2 2 110-4 2 2 010 4z"/>
        </svg>
      </button>

      <!-- Dropdown Menu (hidden by default) -->
      <div class="
        hidden absolute right-0 mt-2 w-56
        bg-white rounded-lg shadow-lg border border-jm-gray-200
        py-1 z-40
      ">
        <a
          href="/app/profile/123"
          class="flex items-center gap-2 px-4 py-2 text-sm text-jm-gray-700 hover:bg-jm-gray-50 transition-colors"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 11-8 4 4 018zM12 14a7 7 00-7 7h14a7 7 00-7-7z"/>
          </svg>
          View Profile
        </a>
        <button
          type="button"
          class="w-full flex items-center gap-2 px-4 py-2 text-sm text-jm-gray-700 hover:bg-jm-gray-50 transition-colors text-left"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.586 15H4a1 1 01-1-1v-4a1 1 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" clip-rule="evenodd"/>
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 14l2-2m0l2-2m-2 2l-2-2m2 2l2 2"/>
          </svg>
          Mute Notifications
        </button>
        <button
          type="button"
          class="w-full flex items-center gap-2 px-4 py-2 text-sm text-jm-gray-700 hover:bg-jm-gray-50 transition-colors text-left"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 8h14M5 8a2 2 110-4h14a2 2 110 4M5 8v10a2 2 002 2h10a2 2 002-2V8m-9 4h4"/>
          </svg>
          Archive Conversation
        </button>
        <div class="border-t border-jm-gray-200 my-1"></div>
        <button
          type="button"
          class="w-full flex items-center gap-2 px-4 py-2 text-sm text-jm-error hover:bg-jm-error/5 transition-colors text-left"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464L3.34 16c-.77 1.333.192 3 1.732 3z"/>
          </svg>
          Report User
        </button>
        <button
          type="button"
          class="w-full flex items-center gap-2 px-4 py-2 text-sm text-jm-error hover:bg-jm-error/5 transition-colors text-left"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 18.364A9 9 005.636 5.636m12.728 12.728A9 9 015.636 5.636m12.728 12.728L5.636 5.636"/>
          </svg>
          Block User
        </button>
      </div>
    </div>
  </div>
</header>
```

---

### 3.3 Message History (Chat Area)

**Content:**
- Scrollable message list (reverse chronological, bottom = newest)
- Date dividers (Today, Yesterday, March 15)
- Sent messages (right-aligned, gradient background)
- Received messages (left-aligned, gray background)
- Read receipts (seen/delivered)
- Timestamp (hover for full date/time)
- Loading spinner for older messages (pagination)

**HTML Structure:**
```html
<!-- Message History Container -->
<div
  id="messages-container"
  class="
    flex-1 overflow-y-auto
    bg-jm-gray-50
    px-4 md:px-6 py-4
    space-y-4
  "
  role="log"
  aria-live="polite"
  aria-label="Message history"
>
  <!-- Date Divider -->
  <div class="flex items-center justify-center my-6">
    <span class="bg-jm-gray-200 text-jm-gray-600 font-sans text-xs font-medium px-3 py-1 rounded-full">
      Today
    </span>
  </div>

  <!-- Received Message -->
  <div class="flex items-start gap-3 max-w-3xl">
    <!-- Partner Photo (Small) -->
    <img
      src="/images/profiles/user-123.jpg"
      alt="Chidinma O."
      class="w-8 h-8 rounded-full object-cover flex-shrink-0"
    />

    <!-- Message Bubble -->
    <div class="flex-1">
      <div class="bg-white rounded-2xl rounded-tl-none px-4 py-3 shadow-sm">
        <p class="font-sans text-sm text-jm-gray-900 leading-relaxed">
          Hi! Thank you for your interest. I'd love to learn more about your values and what you're looking for.
        </p>
      </div>
      <!-- Timestamp -->
      <time class="font-sans text-xs text-jm-gray-500 ml-4 mt-1 block">
        10:32 AM
      </time>
    </div>
  </div>

  <!-- Sent Message -->
  <div class="flex items-start gap-3 max-w-3xl ml-auto justify-end">
    <!-- Message Bubble -->
    <div class="flex-1 flex flex-col items-end">
      <div class="bg-gradient-jm rounded-2xl rounded-tr-none px-4 py-3 shadow-sm">
        <p class="font-sans text-sm text-white leading-relaxed">
          Hi Chidinma! I really appreciate your openness on your profile. I'm looking for someone who shares similar faith values and family-oriented goals.
        </p>
      </div>
      <!-- Timestamp + Read Receipt -->
      <div class="flex items-center gap-2 mr-4 mt-1">
        <time class="font-sans text-xs text-jm-gray-500">
          10:35 AM
        </time>
        <!-- Read Receipt (Double Check) -->
        <svg class="w-4 h-4 text-jm-success" fill="currentColor" viewBox="0 20 20">
          <path fill-rule="evenodd" d="M16.707 5.293a1 1 010 1.414l-8 8a1 1 01-1.414l-4-4a1 1 011.414-1.414L8 12.586l7.293-7.293a1 1 011.414z" clip-rule="evenodd"/>
          <path fill-rule="evenodd" d="M14.707 5.293a1 1 010 1.414l-6 6a1 1 01-1.414l-2-2a1 1 011.414-1.414L8 10.586l5.293-5.293a1 1 011.414z" clip-rule="evenodd"/>
        </svg>
      </div>
    </div>
  </div>

  <!-- Date Divider (Yesterday) -->
  <div class="flex items-center justify-center my-6">
    <span class="bg-jm-gray-200 text-jm-gray-600 font-sans text-xs font-medium px-3 py-1 rounded-full">
      Yesterday
    </span>
  </div>

  <!-- Sent Message (Delivered, Not Read) -->
  <div class="flex items-start gap-3 max-w-3xl ml-auto justify-end">
    <div class="flex-1 flex flex-col items-end">
      <div class="bg-gradient-jm rounded-2xl rounded-tr-none px-4 py-3 shadow-sm">
        <p class="font-sans text-sm text-white leading-relaxed">
          I saw that you completed Tier 3. I'd be interested in learning more about your family values when you're comfortable sharing.
        </p>
      </div>
      <div class="flex items-center gap-2 mr-4 mt-1">
        <time class="font-sans text-xs text-jm-gray-500">
          8:45 PM
        </time>
        <!-- Delivered Receipt (Single Check) -->
        <svg class="w-4 h-4 text-jm-gray-400" fill="currentColor" viewBox="0 20 20">
          <path fill-rule="evenodd" d="M16.707 5.293a1 1 010 1.414l-8 8a1 1 01-1.414l-4-4a1 1 011.414-1.414L8 12.586l7.293-7.293a1 1 011.414z" clip-rule="evenodd"/>
        </svg>
      </div>
    </div>
  </div>

  <!-- Load More Button (Pagination) -->
  <div class="flex items-center justify-center py-4">
    <button
      type="button"
      class="
        text-jm-purple hover:text-jm-purple-dark hover:bg-jm-purple/10
        font-sans font-medium text-sm
        px-4 py-2 rounded-md
        transition-all duration-200
        focus:outline-none focus:ring-2 focus:ring-jm-purple focus:ring-offset-1
      "
      onclick="loadOlderMessages()"
    >
      Load Earlier Messages
    </button>
  </div>

  <!-- Scroll Anchor (for auto-scroll to bottom) -->
  <div id="messages-end" aria-hidden="true"></div>
</div>
```

**Behavior:**
- Auto-scroll to bottom when new message arrives (if user is near bottom)
- Maintain scroll position when loading older messages (pagination)
- Date dividers appear automatically
- Read receipts update in real-time
- Hover over timestamp shows full date/time tooltip
- Long messages wrap gracefully
- Links in messages are clickable (auto-detected)

---

### 3.4 Typing Indicator

**Content:**
- "Chidinma is typing..." text
- Animated dots (three dots, pulsing)

**HTML Structure:**
```html
<!-- Typing Indicator (shown when partner is typing) -->
<div
  id="typing-indicator"
  class="flex items-center gap-3 max-w-3xl px-4 md:px-6 py-2 hidden"
  role="status"
  aria-live="polite"
>
  <!-- Partner Photo (Small) -->
  <img
    src="/images/profiles/user-123.jpg"
    alt="Chidinma O."
    class="w-8 h-8 rounded-full object-cover flex-shrink-0"
  />

  <!-- Typing Text -->
  <div class="bg-white rounded-2xl rounded-tl-none px-4 py-3 shadow-sm flex items-center gap-2">
    <span class="font-sans text-sm text-jm-gray-600 italic">
      Chidinma is typing
    </span>
    <!-- Animated Dots -->
    <span class="flex gap-1">
      <span class="w-2 h-2 bg-jm-gray-400 rounded-full animate-pulse" style="animation-delay: 0s"></span>
      <span class="w-2 h-2 bg-jm-gray-400 rounded-full animate-pulse" style="animation-delay: 0.2s"></span>
      <span class="w-2 h-2 bg-jm-gray-400 rounded-full animate-pulse" style="animation-delay: 0.4s"></span>
    </span>
  </div>
</div>
```

**Behavior:**
- Appears when partner starts typing (via Action Cable)
- Disappears after 3 seconds of inactivity or when partner sends message
- Only visible to conversation participants

---

### 3.5 Message Input Form

**Content:**
- Multi-line textarea (auto-expanding)
- Character counter (max 1000 characters)
- Send button (gradient, disabled when empty)
- Emoji picker (optional, future enhancement)
- File attachment (optional, future enhancement)

**HTML Structure:**
```html
<!-- Message Input Form -->
<form
  id="message-form"
  class="
    bg-white border-t border-jm-gray-200
    px-4 md:px-6 py-4
  "
  data-controller="message-form"
  data-action="submit->message-form#send keydown->message-form#handleTyping"
>
  <!-- Input Container -->
  <div class="flex items-end gap-3">
    <!-- Textarea -->
    <div class="flex-1">
      <textarea
        id="message-input"
        name="content"
        rows="1"
        placeholder="Type your message..."
        maxlength="1000"
        class="
          w-full px-4 py-3 rounded-lg
          border-2 border-jm-gray-300 focus:border-jm-purple focus:ring-2 focus:ring-jm-purple/20
          font-sans text-base text-jm-gray-900 placeholder:text-jm-gray-400
          transition-all duration-200
          focus:outline-none
          resize-none
          max-h-32 overflow-y-auto
        "
        data-message-form-target="input"
        aria-label="Message input"
        required
      ></textarea>

      <!-- Character Counter -->
      <div class="flex items-center justify-between mt-2">
        <p class="font-sans text-xs text-jm-gray-500">
          <span data-message-form-target="charCount">0</span> / 1000 characters
        </p>

        <!-- Community Guidelines Reminder (First Message Only) -->
        <a
          href="/legal/community-guidelines"
          class="font-sans text-xs text-jm-purple hover:text-jm-purple-dark underline"
          target="_blank"
        >
          Community Guidelines
        </a>
      </div>
    </div>

    <!-- Send Button -->
    <button
      type="submit"
      class="
        bg-gradient-jm hover:bg-gradient-jm-hover
        text-white font-sans font-semibold
        p-4 rounded-lg
        transition-all duration-200
        shadow-md hover:shadow-lg
        focus:outline-none focus:ring-2 focus:ring-jm-coral focus:ring-offset-2
        disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none
        flex-shrink-0
      "
      aria-label="Send message"
      disabled
      data-message-form-target="submitButton"
    >
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0v-8"/>
      </svg>
    </button>
  </div>
</form>
```

**Behavior:**
- Textarea auto-expands as user types (max 4 rows)
- Send button disabled when textarea is empty or only whitespace
- Enter key sends message (Shift+Enter adds line break)
- Character counter updates in real-time
- Form clears after successful send
- Optimistic UI update (message appears immediately before server confirmation)

---

## 4. User Interactions & Flows

### 4.1 Viewing Conversations List

**Flow:**
1. User navigates to `/app/messages`
2. System loads all conversations (paginated, 20 per page)
3. User sees list sorted by most recent activity
4. Unread conversations shown at top with badge
5. User can filter by "All", "Unread", or "Archived"

**Success State:**
- Conversations load within 500ms
- Unread counts accurate
- Online status indicators real-time

### 4.2 Opening a Conversation

**Flow:**
1. User clicks conversation from list
2. Desktop: Conversation loads in right panel
3. Mobile: Navigate to `/app/messages/:conversation_id`
4. System loads last 50 messages
5. Auto-scroll to bottom (most recent)
6. EDT badge shown in header
7. Message input becomes active

**Success State:**
- Messages load within 1 second
- Scroll position at bottom
- EDT restrictions applied to profile data
- User can immediately start typing

### 4.3 Sending a Message

**Flow:**
1. User types in textarea
2. System sends typing indicator to partner (via Action Cable)
3. User presses Enter or clicks Send
4. Message appears immediately (optimistic UI)
5. System sends message to server
6. Server broadcasts message via Action Cable
7. Partner receives message in real-time
8. Read receipt updates when partner opens conversation

**Success State:**
- Message appears within 100ms (optimistic)
- Server confirmation within 500ms
- Partner receives within 500ms
- Read receipt updates within 2 seconds

### 4.4 Receiving a Message

**Flow:**
1. Partner sends message
2. Server broadcasts via Action Cable
3. User's client receives message
4. If conversation is open: Message appears at bottom
5. If conversation is closed: Unread badge increments
6. Browser notification sent (if enabled)
7. Read receipt sent automatically when user views

**Success State:**
- Message appears within 500ms
- Unread count updates immediately
- Notification respects user preferences

### 4.5 Requesting More Details (EDT Escalation)

**Flow:**
1. User realizes they want deeper tier access
2. User clicks partner name in header → View Profile
3. Profile page shows locked sections (EDT restricted)
4. User clicks "Request Details" button (Premium/VIP only)
5. Request Details modal opens (see interests_spec.md)
6. User selects tier to request
7. System sends request
8. Partner receives notification in Messages
9. Partner approves or declines
10. EDT updates, unlocking new profile sections

**Success State:**
- Request sent within 500ms
- Partner notified via message + email
- EDT updates immediately after approval
- Both users see updated profile data

---

## 5. Real-Time Messaging Implementation

### 5.1 Action Cable Architecture (Rails 8)

**Reference:** See `rails_architecture.md` for complete implementation

**Key Components:**
- **ConversationChannel:** WebSocket channel for each conversation
- **Turbo Streams:** Real-time message broadcasting
- **Presence Tracking:** Online/offline status via Redis
- **Typing Indicators:** Ephemeral messages via Action Cable

**Channel Subscription (JavaScript):**
```javascript
// app/javascript/controllers/conversation_controller.js
import { Controller } from "@hotwired/stimulus"
import { createConsumer } from "@rails/actioncable"

export default class extends Controller {
  static targets = ["messages", "input", "submitButton", "typingIndicator"]

  connect() {
    this.conversationId = this.element.dataset.conversationId
    this.currentUserId = this.element.dataset.currentUserId

    // Subscribe to conversation channel
    this.consumer = createConsumer()
    this.channel = this.consumer.subscriptions.create(
      {
        channel: "ConversationChannel",
        conversation_id: this.conversationId
      },
      {
        connected: () => {
          console.log("Connected to ConversationChannel")
        },

        disconnected: () => {
          console.log("Disconnected from ConversationChannel")
        },

        received: (data) => {
          if (data.type === "message") {
            this.handleNewMessage(data)
          } else if (data.type === "typing") {
            this.handleTypingIndicator(data)
          } else if (data.type === "presence") {
            this.handlePresenceUpdate(data)
          }
        }
      }
    )

    // Auto-scroll to bottom on load
    this.scrollToBottom()
  }

  disconnect() {
    if (this.channel) {
      this.channel.unsubscribe()
    }
  }

  send(event) {
    event.preventDefault()

    const content = this.inputTarget.value.trim()

    if (!content) {
      return
    }

    // Optimistic UI update
    this.appendMessage({
      id: `temp-${Date.now()}`,
      content: content,
      sender_id: this.currentUserId,
      created_at: new Date().toISOString(),
      read: false,
      pending: true
    })

    // Send via Action Cable
    this.channel.perform("speak", { content: content })

    // Clear input
    this.inputTarget.value = ""
    this.updateCharCount()
    this.toggleSubmitButton()
    this.stopTypingIndicator()
  }

  handleTyping(event) {
    // Don't trigger on Enter (submits form)
    if (event.key === "Enter" && !event.shiftKey) {
      return
    }

    // Send typing indicator
    if (!this.isTyping) {
      this.isTyping = true
      this.channel.perform("receive", {
        type: "typing",
        typing: true
      })
    }

    // Clear previous timeout
    clearTimeout(this.typingTimeout)

    // Stop typing indicator after 3 seconds
    this.typingTimeout = setTimeout(() => {
      this.stopTypingIndicator()
    }, 3000)

    // Update character count
    this.updateCharCount()

    // Enable/disable submit button
    this.toggleSubmitButton()
  }

  stopTypingIndicator() {
    if (this.isTyping) {
      this.isTyping = false
      this.channel.perform("receive", {
        type: "typing",
        typing: false
      })
    }
  }

  handleNewMessage(data) {
    // Remove optimistic message if exists
    const tempMessage = document.getElementById(`message-temp-${data.id}`)
    if (tempMessage) {
      tempMessage.remove()
    }

    // Append confirmed message
    this.appendMessage(data.message)

    // Scroll to bottom if near bottom
    if (this.isNearBottom()) {
      this.scrollToBottom()
    }

    // Send read receipt if conversation is visible
    if (document.visibilityState === "visible") {
      this.channel.perform("mark_read", { message_id: data.message.id })
    }
  }

  handleTypingIndicator(data) {
    if (data.user_id === this.currentUserId) {
      return // Ignore own typing indicator
    }

    if (data.typing) {
      this.typingIndicatorTarget.classList.remove("hidden")
    } else {
      this.typingIndicatorTarget.classList.add("hidden")
    }
  }

  handlePresenceUpdate(data) {
    // Update online/offline status in header
    const statusDot = document.getElementById("presence-status")
    const statusText = document.getElementById("presence-text")

    if (data.status === "online") {
      statusDot.classList.remove("bg-jm-gray-400")
      statusDot.classList.add("bg-jm-success")
      statusText.textContent = "Active now"
      statusText.classList.remove("text-jm-gray-500")
      statusText.classList.add("text-jm-success")
    } else {
      statusDot.classList.remove("bg-jm-success")
      statusDot.classList.add("bg-jm-gray-400")
      statusText.textContent = `Last seen ${data.last_seen}`
      statusText.classList.remove("text-jm-success")
      statusText.classList.add("text-jm-gray-500")
    }
  }

  appendMessage(message) {
    // Create message element
    const messageHTML = this.buildMessageHTML(message)
    this.messagesTarget.insertAdjacentHTML("beforeend", messageHTML)
  }

  buildMessageHTML(message) {
    const isSent = message.sender_id === parseInt(this.currentUserId)
    const alignClass = isSent ? "ml-auto justify-end" : ""
    const bubbleClass = isSent
      ? "bg-gradient-jm text-white rounded-tr-none"
      : "bg-white text-jm-gray-900 rounded-tl-none"

    return `
      <div class="flex items-start gap-3 max-w-3xl ${alignClass}" id="message-${message.id}">
        ${!isSent ? `<img src="${message.sender_avatar}" class="w-8 h-8 rounded-full" />` : ""}
        <div class="flex-1 ${isSent ? "flex flex-col items-end" : ""}">
          <div class="${bubbleClass} rounded-2xl px-4 py-3 shadow-sm">
            <p class="font-sans text-sm leading-relaxed">${this.escapeHTML(message.content)}</p>
          </div>
          <time class="font-sans text-xs text-jm-gray-500 ${isSent ? "mr-4" : "ml-4"} mt-1 block">
            ${this.formatTime(message.created_at)}
          </time>
        </div>
      </div>
    `
  }

  updateCharCount() {
    const charCount = this.inputTarget.value.length
    const charCountElement = document.querySelector("[data-message-form-target='charCount']")
    if (charCountElement) {
      charCountElement.textContent = charCount
    }
  }

  toggleSubmitButton() {
    const content = this.inputTarget.value.trim()
    this.submitButtonTarget.disabled = !content
  }

  scrollToBottom() {
    const messagesEnd = document.getElementById("messages-end")
    if (messagesEnd) {
      messagesEnd.scrollIntoView({ behavior: "smooth" })
    }
  }

  isNearBottom() {
    const container = this.messagesTarget
    const threshold = 150 // pixels from bottom
    return container.scrollHeight - container.scrollTop - container.clientHeight < threshold
  }

  escapeHTML(text) {
    const div = document.createElement("div")
    div.textContent = text
    return div.innerHTML
  }

  formatTime(timestamp) {
    const date = new Date(timestamp)
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true
    })
  }
}
```

### 5.2 Backend Implementation (Rails)

**ConversationChannel:**
```ruby
# app/channels/conversation_channel.rb
class ConversationChannel < ApplicationCable::Channel
  def subscribed
    conversation = Conversation.find(params[:conversation_id])

    # Authorize user
    reject unless current_user.conversations.include?(conversation)

    stream_for conversation

    # Broadcast presence (online)
    ConversationChannel.broadcast_to(
      conversation,
      type: "presence",
      user_id: current_user.id,
      user_name: current_user.display_name,
      status: "online"
    )
  end

  def unsubscribed
    conversation = Conversation.find(params[:conversation_id])

    # Broadcast presence (offline)
    ConversationChannel.broadcast_to(
      conversation,
      type: "presence",
      user_id: current_user.id,
      status: "offline",
      last_seen: Time.current.strftime("%I:%M %p")
    )
  end

  def speak(data)
    conversation = Conversation.find(params[:conversation_id])

    message = conversation.messages.create!(
      sender: current_user,
      content: data["content"]
    )

    # Broadcast message to both users
    ConversationChannel.broadcast_to(
      conversation,
      type: "message",
      message: MessageSerializer.new(message).as_json
    )

    # Send email notification if recipient is offline
    recipient = conversation.other_participant(current_user)
    SendMessageNotificationJob.perform_later(message.id) unless recipient.online?
  end

  def receive(data)
    # Handle typing indicators (ephemeral, not persisted)
    conversation = Conversation.find(params[:conversation_id])

    if data["type"] == "typing"
      ConversationChannel.broadcast_to(
        conversation,
        type: "typing",
        user_id: current_user.id,
        user_name: current_user.display_name,
        typing: data["typing"]
      )
    end
  end

  def mark_read(data)
    message = Message.find(data["message_id"])

    # Update read_at timestamp
    message.update(read_at: Time.current) if message.read_at.nil?

    # Broadcast read receipt to sender
    conversation = message.conversation
    ConversationChannel.broadcast_to(
      conversation,
      type: "read_receipt",
      message_id: message.id,
      read_by: current_user.id
    )
  end
end
```

### 5.3 Message Model

```ruby
# app/models/message.rb
class Message < ApplicationRecord
  belongs_to :conversation
  belongs_to :sender, class_name: "User"

  validates :content, presence: true, length: { maximum: 1000 }

  scope :unread, -> { where(read_at: nil) }
  scope :recent, -> { order(created_at: :desc).limit(50) }

  # Keyword filtering (profanity, harassment)
  before_validation :check_content_safety

  private

  def check_content_safety
    # Basic profanity filter (enhance with AI moderation)
    forbidden_words = %w[badword1 badword2] # Replace with actual list

    forbidden_words.each do |word|
      if content&.downcase&.include?(word)
        errors.add(:content, "contains inappropriate language")
        return false
      end
    end
  end
end
```

---

## 6. EDT/Tier Logic

### 6.1 EDT Enforcement in Messages

**Key Rule:** EDT determines what profile information is visible in conversation header and profile link.

**EDT Display:**
- **Header Badge:** "EDT: Tier X" shown prominently
- **Profile Link:** Opens profile with EDT-restricted sections
- **Tier Change Notification:** If EDT changes mid-conversation, notify both users

**Example:**
- User A (Tier 3 completed) + User B (Tier 2 completed) = **EDT 2**
- User A can see User B's Tier 1-2 data only
- User A's Tier 3 data hidden from User B
- If User B completes Tier 3 and shares with User A → **EDT 3**
- Both users notified: "EDT updated to Tier 3"

### 6.2 Request Details from Messages

**Flow:**
1. User realizes they want deeper information about partner
2. Click "View Profile" in conversation header
3. Profile shows locked sections (EDT restricted)
4. Click "Request Details" button (Premium/VIP only)
5. Request Details modal opens
6. User selects tier to request and share
7. Partner receives notification in **Messages** (system message)
8. Partner reviews request in dedicated notification or modal
9. Partner approves/declines
10. EDT updates immediately
11. System message appears in conversation: "EDT updated to Tier X"

**System Message HTML:**
```html
<!-- System Message (EDT Update) -->
<div class="flex items-center justify-center my-6">
  <div class="bg-jm-purple/10 border border-jm-purple rounded-lg px-4 py-3 max-w-md text-center">
    <p class="font-sans text-sm text-jm-purple font-medium">
      🎉 EDT updated to Tier 3
    </p>
    <p class="font-sans text-xs text-jm-gray-600 mt-1">
      You can now view each other's Tier 3 information
    </p>
    <a
      href="/app/profile/123"
      class="inline-block mt-2 text-jm-purple hover:text-jm-purple-dark font-medium text-sm underline"
    >
      View Updated Profile
    </a>
  </div>
</div>
```

---

## 7. Accessibility Requirements

### WCAG 2.1 AA Compliance

**Keyboard Navigation:**
- All interactive elements accessible via Tab key
- Arrow keys navigate between conversations (list)
- Enter key opens conversation
- Escape key closes modals

**Screen Reader Support:**
- Conversation list: `role="list"`, `aria-label="Conversations"`
- Each conversation: `role="button"`, `aria-label="Conversation with [Name]"`
- Message history: `role="log"`, `aria-live="polite"`
- Message input: `aria-label="Message input"`
- Typing indicator: `role="status"`, `aria-live="polite"`

**Color Contrast:**
- Text on white: 4.5:1 minimum (WCAG AA)
- Text on gradient: 4.5:1 minimum (white text on dark gradient)
- Focus indicators: 3:1 minimum

**Focus Indicators:**
- Visible focus ring on all interactive elements
- High contrast focus outline (2px solid)

**Alternative Text:**
- Profile photos: `alt="[Name]"`
- Icons: `aria-label` for screen readers

**Form Labels:**
- Message input: Associated label (visually hidden if needed)
- Search input: `aria-label="Search conversations"`

---

## 8. Mobile Responsive Behavior

### Breakpoints

**Mobile (320px-767px):**
- Single view toggle (list OR conversation, not both)
- Back button in conversation header
- Full-width message input
- Sticky conversation header
- Pull-to-refresh older messages

**Tablet (768px-1023px):**
- Split view (40/60 ratio)
- Sidebar collapsible
- Message input full width

**Desktop (≥1024px):**
- Split view (30/70 ratio)
- Fixed sidebar
- Message input constrained to conversation width

### Mobile-Specific Enhancements

**Touch Targets:**
- Minimum 44x44px for all interactive elements
- Increased padding on mobile

**Swipe Gestures:**
- Swipe right on conversation → Back to list (mobile)
- Swipe left on conversation item → Archive/Delete options

**Mobile Navigation:**
- Sticky header with back button
- Bottom navigation bar (optional)

---

## 9. State Management

### Global State (JavaScript)

```javascript
const messagesPageState = {
  conversations: [], // List of conversations
  activeConversationId: null, // Currently open conversation
  messages: {}, // Messages by conversation ID
  unreadCounts: {}, // Unread counts by conversation ID
  onlineUsers: new Set(), // Set of online user IDs
  typingUsers: {}, // Typing status by conversation ID
  filters: {
    searchQuery: "",
    filter: "all" // all | unread | archived
  },
  pagination: {
    hasMore: false,
    loading: false,
    offset: 0
  }
}
```

### State Updates

**New Message Received:**
```javascript
function handleNewMessage(conversationId, message) {
  // Add message to state
  if (!messagesPageState.messages[conversationId]) {
    messagesPageState.messages[conversationId] = []
  }
  messagesPageState.messages[conversationId].push(message)

  // Update unread count (if conversation not active)
  if (messagesPageState.activeConversationId !== conversationId) {
    messagesPageState.unreadCounts[conversationId] =
      (messagesPageState.unreadCounts[conversationId] || 0) + 1
  }

  // Update conversation order (move to top)
  const conversation = messagesPageState.conversations.find(c => c.id === conversationId)
  if (conversation) {
    conversation.lastMessageAt = message.created_at
    conversation.lastMessagePreview = message.content
    sortConversations()
  }

  // Trigger UI update
  updateConversationsList()
  if (messagesPageState.activeConversationId === conversationId) {
    appendMessageToUI(message)
  }
}
```

**Typing Indicator:**
```javascript
function handleTypingIndicator(conversationId, userId, typing) {
  if (typing) {
    messagesPageState.typingUsers[conversationId] = userId
  } else {
    delete messagesPageState.typingUsers[conversationId]
  }

  // Update UI
  if (messagesPageState.activeConversationId === conversationId) {
    toggleTypingIndicator(typing)
  }
}
```

---

## 10. Error Handling

### Message Send Failures

**Scenario:** User sends message, but server returns error (network failure, validation error)

**Solution:**
1. Optimistic UI update shows message immediately
2. If server returns error within 5 seconds:
   - Add red "!" icon next to message
   - Show retry button
   - Tooltip: "Message failed to send. Retry?"
3. User clicks retry → Re-attempt send
4. If retry fails → Offer "Delete" option

**Error Message HTML:**
```html
<!-- Failed Message with Retry -->
<div class="flex items-start gap-3 max-w-3xl ml-auto justify-end">
  <div class="flex-1 flex flex-col items-end">
    <div class="bg-gradient-jm rounded-2xl rounded-tr-none px-4 py-3 shadow-sm opacity-60">
      <p class="font-sans text-sm text-white leading-relaxed">
        This is a failed message.
      </p>
    </div>
    <div class="flex items-center gap-2 mr-4 mt-1">
      <!-- Error Icon -->
      <svg class="w-4 h-4 text-jm-error" fill="currentColor" viewBox="0 20 20">
        <path fill-rule="evenodd" d="M18 10a8 8 11-16 8 8 0116zm-7 4a1 1 11-2 1 1 012zm-1-9a1 1 00-1 1v4a1 1 102V6a1 1 00-1-1z" clip-rule="evenodd"/>
      </svg>
      <!-- Retry Button -->
      <button
        type="button"
        class="font-sans text-xs text-jm-error hover:text-jm-error/80 underline"
        onclick="retryMessage(messageId)"
      >
        Retry
      </button>
    </div>
  </div>
</div>
```

### Connection Failures

**Scenario:** WebSocket connection drops (network issue, server restart)

**Solution:**
1. Show banner at top: "Reconnecting..."
2. Attempt reconnection (exponential backoff: 1s, 2s, 4s, 8s)
3. If reconnection succeeds: Hide banner, sync missed messages
4. If reconnection fails after 5 attempts: Show error banner + manual refresh button

**Reconnecting Banner:**
```html
<!-- Reconnecting Banner -->
<div
  id="connection-status-banner"
  class="bg-jm-warning/20 border-b border-jm-warning text-jm-warning px-4 py-2 text-center hidden"
  role="alert"
>
  <p class="font-sans text-sm font-medium">
    ⚠️ Reconnecting to server...
  </p>
</div>

<!-- Connection Failed Banner -->
<div
  id="connection-failed-banner"
  class="bg-jm-error/20 border-b border-jm-error text-jm-error px-4 py-2 text-center hidden"
  role="alert"
>
  <p class="font-sans text-sm font-medium">
    ❌ Connection lost. <button class="underline font-semibold" onclick="location.reload()">Refresh page</button>
  </p>
</div>
```

### Validation Errors

**Scenario:** User submits message with prohibited content (profanity, spam)

**Solution:**
1. Server returns 422 Unprocessable Entity
2. Show error message below textarea
3. Message not sent, remains in textarea
4. User can edit and retry

**Validation Error HTML:**
```html
<!-- Validation Error (Below Textarea) -->
<p class="font-sans text-sm text-jm-error flex items-start gap-1 mt-2">
  <svg class="w-4 h-4 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 20 20">
    <path fill-rule="evenodd" d="M18 10a8 8 11-16 8 8 0116zm-7 4a1 1 11-2 1 1 012zm-1-9a1 1 00-1 1v4a1 1 102V6a1 1 00-1-1z" clip-rule="evenodd"/>
  </svg>
  Your message contains inappropriate language. Please revise and try again.
</p>
```

---

## 11. Success States

### Message Sent Successfully

**Visual Feedback:**
1. Optimistic UI: Message appears immediately (pending state)
2. Server confirmation: Pending indicator removed
3. Delivered: Single gray checkmark
4. Read: Double green checkmark

### Conversation Loaded

**Visual Feedback:**
1. Loading skeleton (3-5 placeholder messages)
2. Messages fade in smoothly
3. Auto-scroll to bottom
4. "Load Earlier Messages" button appears (if more messages exist)

### Real-Time Message Received

**Visual Feedback:**
1. Message appears at bottom with smooth animation
2. Auto-scroll if user near bottom
3. Unread badge updates (if conversation not active)
4. Browser notification (if enabled)

---

## 12. Loading States

### Conversations List Loading

```html
<!-- Loading Skeleton (Conversations List) -->
<div class="flex-1 overflow-y-auto p-4 space-y-4 animate-pulse">
  <div class="flex items-start gap-3">
    <div class="w-12 h-12 bg-jm-gray-300 rounded-full"></div>
    <div class="flex-1 space-y-2">
      <div class="h-4 bg-jm-gray-300 rounded w-3/4"></div>
      <div class="h-3 bg-jm-gray-200 rounded w-1/2"></div>
    </div>
  </div>
  <div class="flex items-start gap-3">
    <div class="w-12 h-12 bg-jm-gray-300 rounded-full"></div>
    <div class="flex-1 space-y-2">
      <div class="h-4 bg-jm-gray-300 rounded w-3/4"></div>
      <div class="h-3 bg-jm-gray-200 rounded w-1/2"></div>
    </div>
  </div>
  <div class="flex items-start gap-3">
    <div class="w-12 h-12 bg-jm-gray-300 rounded-full"></div>
    <div class="flex-1 space-y-2">
      <div class="h-4 bg-jm-gray-300 rounded w-3/4"></div>
      <div class="h-3 bg-jm-gray-200 rounded w-1/2"></div>
    </div>
  </div>
</div>
```

### Messages Loading

```html
<!-- Loading Skeleton (Messages) -->
<div class="flex-1 overflow-y-auto px-6 py-4 space-y-4 animate-pulse">
  <!-- Received Message Skeleton -->
  <div class="flex items-start gap-3 max-w-3xl">
    <div class="w-8 h-8 bg-jm-gray-300 rounded-full"></div>
    <div class="flex-1 space-y-2">
      <div class="h-20 bg-jm-gray-300 rounded-2xl rounded-tl-none w-3/4"></div>
      <div class="h-3 bg-jm-gray-200 rounded w-16 ml-4"></div>
    </div>
  </div>
  <!-- Sent Message Skeleton -->
  <div class="flex items-start gap-3 max-w-3xl ml-auto justify-end">
    <div class="flex-1 space-y-2 flex flex-col items-end">
      <div class="h-20 bg-jm-gray-300 rounded-2xl rounded-tr-none w-3/4"></div>
      <div class="h-3 bg-jm-gray-200 rounded w-16 mr-4"></div>
    </div>
  </div>
</div>
```

---

## 13. Performance Optimization

### Message Pagination
- Load last 50 messages initially
- "Load Earlier Messages" button for older messages
- Infinite scroll (optional)
- Cache messages in IndexedDB (offline support)

### Real-Time Optimization
- Debounce typing indicator (send max 1 every 2 seconds)
- Batch read receipts (send max 1 every 5 seconds)
- WebSocket reconnection with exponential backoff

### Image Optimization
- Profile photos: 100x100px thumbnails
- Lazy load images in conversation list

---

## 14. Related Documentation

- [Interests Spec](interests_spec.md) - Show Interest flow and notifications
- [Subscription Upgrade Spec](subscription_upgrade_spec.md) - Premium features unlocked
- [Rails Architecture](../../Technical%20Specifications/rails_architecture.md) - Action Cable implementation
- [Tier System](../../Global%20Context/tier_system.md) - EDT rules
- [Request Details Flow](../../Technical%20Specifications/request_details_flow.md) - EDT escalation

---

**Document Owner:** Product Lead & Frontend Lead
**Last Updated:** 2026-02-27
**Status:** Complete — Ready for Implementation
**Estimated Development Time:** 80-100 hours
