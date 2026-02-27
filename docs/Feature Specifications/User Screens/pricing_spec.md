# Pricing Page Specification

**Document Version:** 1.0
**Last Updated:** 2026-02-27
**Owner:** Product Team
**Status:** Draft

---

## Table of Contents

1. [Page Purpose & User Goals](#page-purpose--user-goals)
2. [User Stories](#user-stories)
3. [Page Structure & Layout](#page-structure--layout)
4. [Subscription Tiers](#subscription-tiers)
5. [Pricing Display Logic](#pricing-display-logic)
6. [HTML/Tailwind Implementation](#htmltailwind-implementation)
7. [Interactive Elements](#interactive-elements)
8. [State Management](#state-management)
9. [Upgrade Flow](#upgrade-flow)
10. [Payment Integration Points](#payment-integration-points)
11. [Error Handling](#error-handling)
12. [Loading States](#loading-states)
13. [Success States](#success-states)
14. [Accessibility Requirements](#accessibility-requirements)
15. [Responsive Design](#responsive-design)
16. [Performance Optimization](#performance-optimization)
17. [Cross-References](#cross-references)

---

## Page Purpose & User Goals

### Primary Purpose

The Pricing page serves as the central subscription decision point for JoyMatcher users. It transparently presents the three subscription tiers (Free, Premium, VIP) with their respective features, tier access ceilings, and pricing in both Nigerian Naira (₦) and US Dollars ($) based on user location.

### User Goals

**For Free Users:**
- Understand what features are available without payment
- See clear value proposition for upgrading to Premium or VIP
- Understand tier ceiling limitations (Free = Tier 2 ceiling)
- Make informed decision about which subscription tier meets their needs
- Begin upgrade process with minimal friction

**For Premium Users:**
- Understand VIP benefits and whether they justify the significant price increase
- See their current subscription status clearly
- Manage their subscription (upgrade to VIP or view billing)
- Understand tier ceiling increase (Premium = Tier 4 ceiling)

**For VIP Users:**
- Confirm their elite status and exclusive benefits
- Access VIP-specific features and concierge services
- Manage their subscription billing
- Understand full tier access (VIP = Tier 5 ceiling)

### Business Goals

- Convert Free users to Premium (primary conversion goal)
- Convert Premium users to VIP (secondary conversion goal)
- Clearly communicate tier ceiling constraints to prevent upgrade friction
- Position VIP as exclusive, high-value offering
- Maintain trust through transparent pricing with no hidden fees
- Support both Nigerian and international markets with appropriate currency display

---

## User Stories

### Story 1: Free User Exploring Upgrade Options
**As a** Free user who has completed Tier 2 and wants to access Tier 3 information,
**I want to** understand the cost and benefits of upgrading to Premium,
**So that** I can decide if the investment is worthwhile for deeper relationship discovery.

**Acceptance Criteria:**
- Pricing page clearly shows Free tier limitations (Tier 2 ceiling)
- Premium benefits are listed with emphasis on Tier 4 ceiling access
- Pricing is displayed in user's local currency (₦ for NG, $ for others)
- Call-to-action button is prominent and clearly labeled
- Comparison between Free and Premium tiers is visually clear

### Story 2: Premium User Considering VIP
**As a** Premium user who has been actively using the platform,
**I want to** understand what additional value VIP membership provides,
**So that** I can decide if the 10x price increase justifies the benefits.

**Acceptance Criteria:**
- VIP benefits are clearly differentiated from Premium
- Tier 5 access and verification benefits are emphasized
- Concierge service value is communicated effectively
- Current subscription status (Premium) is displayed
- Upgrade path to VIP is clear but not pushy

### Story 3: International User Checking Pricing
**As an** international user considering JoyMatcher,
**I want to** see pricing in US Dollars,
**So that** I can understand the cost in familiar currency terms.

**Acceptance Criteria:**
- User's location is detected (or manually selectable)
- Pricing displays in $ for non-Nigerian users
- No currency mixing occurs on the page
- Pricing is consistent with advertised rates ($18/mo Premium, $200+/mo VIP)

### Story 4: Mobile User Comparing Tiers
**As a** mobile user browsing on my smartphone,
**I want to** easily compare subscription tiers side-by-side,
**So that** I can make an informed decision without desktop access.

**Acceptance Criteria:**
- Pricing cards stack vertically on mobile (<768px)
- All tier information is readable without horizontal scrolling
- CTA buttons are easily tappable (minimum 44x44px touch target)
- Page loads and renders quickly on mobile networks

---

## Page Structure & Layout

### Header Section

**Purpose:** Orients the user and sets expectations for the page content.

**Components:**
- Page title: "Choose Your Membership"
- Subtitle explaining tier ceiling concept
- Optional currency toggle (₦ / $) for manual override

**Visual Hierarchy:**
- H1: Page title (text-4xl, font-bold)
- Body text: Subtitle (text-lg, text-neutral-600)
- Toggle: Compact switcher in top-right

### Tier Comparison Section

**Purpose:** Primary content area displaying all three subscription tiers in comparison format.

**Layout:**
- Desktop (≥1024px): 3 columns side-by-side
- Tablet (768px-1023px): 3 columns with adjusted spacing
- Mobile (<768px): Stacked vertically

**Card Order:**
1. Free (left/top)
2. Premium (center, visually emphasized)
3. VIP (right/bottom)

**Visual Emphasis:**
- Premium card: Subtle border highlight and "Most Popular" badge
- VIP card: Gradient border and "Exclusive" badge

### FAQ Section

**Purpose:** Address common questions and objections proactively.

**Questions Covered:**
- "What is a tier ceiling?"
- "Can I downgrade my subscription?"
- "What payment methods are accepted?"
- "Is my payment information secure?"
- "What happens if I cancel?"
- "Do you offer refunds?"

### Footer CTA Section

**Purpose:** Final conversion opportunity after user has reviewed all information.

**Components:**
- Reinforcement headline: "Ready to find your life partner?"
- Secondary CTA button
- Link to contact support

---

## Subscription Tiers

### Tier 1: Free

**Pricing:**
- ₦0 / $0 per month
- No payment required
- No automatic charges

**Features:**
- Complete Tier 1 (Identity & Intent)
- Complete Tier 2 (Lifestyle & Background)
- View other Free users' profiles (up to Tier 2)
- Show Interest (initiate connections)
- **Cannot** request details from matches
- **Cannot** access Tier 3+ information
- Limited to 5 active conversations

**Tier Ceiling:** 2

**Call-to-Action:** "Get Started Free" (primary button)

**Use Case:** Entry-level users exploring the platform, not yet ready to invest financially.

### Tier 2: Premium

**Pricing:**
- ₦18,000 / $18 per month
- ₦45,000 / $45 per quarter (save ₦9,000 / $9)
- Billed monthly or quarterly

**Features:**
- All Free features
- Complete Tier 3 (Relationship & Family)
- Complete Tier 4 (Health & Compatibility)
- Request details from matches (reciprocal tier sharing)
- View matches' information up to Tier 4 (based on EDT)
- Unlimited conversations
- Advanced search filters
- See who showed interest in you
- Priority support

**Tier Ceiling:** 4

**Call-to-Action:** "Upgrade to Premium" (primary button with gradient)

**Use Case:** Serious users ready to invest in deeper relationship discovery and active matching.

**Badge:** "Most Popular" (displayed on card)

### Tier 3: VIP

**Pricing:**
- Starting at ₦200,000 / $200 per month
- Custom pricing based on services required
- Annual commitment required

**Features:**
- All Premium features
- Complete Tier 5 (Verified Identity)
- Government-issued ID verification
- Background check integration
- Dedicated concierge service
- Profile verification badge
- Advanced match curation
- Event invitations (VIP mixers)
- Direct access to JoyMatcher relationship advisors
- Custom matchmaking assistance
- Priority placement in search results

**Tier Ceiling:** 5 (full access)

**Call-to-Action:** "Apply for VIP" (opens application form/modal)

**Use Case:** High-net-worth individuals seeking maximum verification, exclusivity, and personalized service.

**Badge:** "Exclusive" (displayed on card with gradient background)

**Special Requirements:**
- VIP membership requires application review
- Not instant activation like Free/Premium
- Concierge team contacts applicant within 48 hours

---

## Pricing Display Logic

### Currency Detection

**Default Behavior:**
```javascript
function detectUserCurrency() {
  // Check user profile if authenticated
  if (AppState.user && AppState.user.country) {
    return AppState.user.country === 'NG' ? 'NGN' : 'USD';
  }

  // Fallback to browser/IP detection
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const nigeriaTimezones = ['Africa/Lagos'];

  if (nigeriaTimezones.includes(timezone)) {
    return 'NGN';
  }

  return 'USD'; // Default to USD for international
}

const userCurrency = detectUserCurrency();
AppState.displayCurrency = userCurrency;
```

### Currency Formatting

**Nigerian Naira (₦):**
```javascript
function formatNGN(amount) {
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
}

// Examples:
// formatNGN(18000) → "₦18,000"
// formatNGN(200000) → "₦200,000"
```

**US Dollars ($):**
```javascript
function formatUSD(amount) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
}

// Examples:
// formatUSD(18) → "$18"
// formatUSD(500) → "$500"
```

### Pricing Constants

```javascript
const PricingData = {
  free: {
    ngn: { monthly: 0 },
    usd: { monthly: 0 }
  },
  premium: {
    ngn: {
      monthly: 18000,
      quarterly: 45000,
      savings: 9000
    },
    usd: {
      monthly: 18,
      quarterly: 45,
      savings: 9
    }
  },
  vip: {
    ngn: {
      monthly: 200000,
      startingText: "Starting at"
    },
    usd: {
      monthly: 500,
      startingText: "Starting at"
    }
  }
};

function getPricing(tier, currency) {
  return PricingData[tier][currency.toLowerCase()];
}
```

### Dynamic Price Display

**Quarterly Savings Badge:**
```javascript
function renderSavingsBadge(tier, currency) {
  if (tier !== 'premium') return '';

  const pricing = getPricing(tier, currency);
  const savings = pricing.savings;
  const formattedSavings = currency === 'NGN'
    ? formatNGN(savings)
    : formatUSD(savings);

  return `
    <span class="inline-flex items-center px-2 py-1 text-xs font-medium text-green-700 bg-green-50 rounded-full">
      Save ${formattedSavings} with quarterly plan
    </span>
  `;
}
```

---

## HTML/Tailwind Implementation

### Complete Pricing Page Structure

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Pricing - JoyMatcher</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <script>
    tailwind.config = {
      theme: {
        extend: {
          colors: {
            'jm-purple-deep': '#4D0052',
            'jm-purple-dark': '#6B0059',
            'jm-purple': '#8B0061',
            'jm-coral-dark': '#C74F67',
            'jm-coral': '#F16A6F',
            'jm-coral-light': '#F99095',
          },
          backgroundImage: {
            'gradient-jm': 'linear-gradient(135deg, #4D0052%, #F16A6F 100%)',
            'gradient-jm-hover': 'linear-gradient(135deg, #6B0059%, #F99095 100%)',
          }
        }
      }
    }
  </script>
</head>
<body class="bg-neutral-50 text-neutral-900 font-sans antialiased">

  <!-- Navigation (shared component) -->
  <nav class="bg-white border-b border-neutral-200 sticky top-0 z-50">
    <!-- Navigation implementation from homepage_spec.md -->
  </nav>

  <!-- Main Content -->
  <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">

    <!-- Header Section -->
    <header class="text-center mb-12 sm:mb-16">
      <h1 class="text-4xl sm:text-5xl font-bold text-neutral-900 mb-4">
        Choose Your Membership
      </h1>
      <p class="text-lg sm:text-xl text-neutral-600 max-w-3xl mx-auto mb-6">
        Transparent pricing with no hidden fees. Each tier unlocks deeper relationship discovery through our progressive disclosure system.
      </p>

      <!-- Currency Toggle (optional, visible if user preference override is enabled) -->
      <div class="flex items-center justify-center gap-3" id="currencyToggle" style="display: none;">
        <span class="text-sm text-neutral-600">Currency:</span>
        <button
          type="button"
          class="relative inline-flex h-8 w-16 items-center rounded-full bg-neutral-200 transition-colors focus:outline-none focus:ring-2 focus:ring-jm-coral focus:ring-offset-2"
          role="switch"
          aria-checked="false"
          aria-label="Toggle between NGN and USD"
          id="currencySwitchButton"
        >
          <span class="sr-only">Toggle currency</span>
          <span
            class="inline-block h-6 w-6 transform rounded-full bg-white shadow-sm transition-transform"
            id="currencySwitchThumb"
            style="transform: translateX(0.25rem);"
          ></span>
        </button>
        <span class="text-sm font-medium text-neutral-900" id="currencyLabel">NGN</span>
      </div>
    </header>

    <!-- Tier Comparison Cards -->
    <section class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">

      <!-- Free Tier Card -->
      <article class="bg-white rounded-xl shadow-sm border border-neutral-200 overflow-hidden flex flex-col">
        <!-- Card Header -->
        <div class="px-6 py-8 border-b border-neutral-200">
          <h2 class="text-2xl font-bold text-neutral-900 mb-2">Free</h2>
          <div class="mb-4">
            <span class="text-4xl font-bold text-neutral-900" data-price-free>₦0</span>
            <span class="text-neutral-600">/month</span>
          </div>
          <p class="text-sm text-neutral-600">
            Perfect for exploring the platform
          </p>
        </div>

        <!-- Card Body -->
        <div class="px-6 py-8 flex-grow">
          <div class="mb-6">
            <p class="text-sm font-semibold text-neutral-700 mb-2">Tier Access Ceiling:</p>
            <span class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-neutral-100 text-neutral-800">
              Tier 2 Maximum
            </span>
          </div>

          <ul class="space-y-4" role="list">
            <li class="flex items-start gap-3">
              <svg class="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 20 20" aria-hidden="true">
                <path fill-rule="evenodd" d="M10 18a8 8 100-16 8 8 000 16zm3.857-9.809a.75.75 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 10-1.06 1.061l2.5 2.5a.75.75 001.137-.089l4-5.5z" clip-rule="evenodd" />
              </svg>
              <span class="text-neutral-700">Complete Tier 1 & 2</span>
            </li>
            <li class="flex items-start gap-3">
              <svg class="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 20 20" aria-hidden="true">
                <path fill-rule="evenodd" d="M10 18a8 8 100-16 8 8 000 16zm3.857-9.809a.75.75 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 10-1.06 1.061l2.5 2.5a.75.75 001.137-.089l4-5.5z" clip-rule="evenodd" />
              </svg>
              <span class="text-neutral-700">View other Free users' profiles</span>
            </li>
            <li class="flex items-start gap-3">
              <svg class="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 20 20" aria-hidden="true">
                <path fill-rule="evenodd" d="M10 18a8 8 100-16 8 8 000 16zm3.857-9.809a.75.75 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 10-1.06 1.061l2.5 2.5a.75.75 001.137-.089l4-5.5z" clip-rule="evenodd" />
              </svg>
              <span class="text-neutral-700">Show Interest to connect</span>
            </li>
            <li class="flex items-start gap-3">
              <svg class="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 20 20" aria-hidden="true">
                <path fill-rule="evenodd" d="M10 18a8 8 100-16 8 8 000 16zm3.857-9.809a.75.75 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 10-1.06 1.061l2.5 2.5a.75.75 001.137-.089l4-5.5z" clip-rule="evenodd" />
              </svg>
              <span class="text-neutral-700">Up to 5 active conversations</span>
            </li>
            <li class="flex items-start gap-3 opacity-50">
              <svg class="w-5 h-5 text-neutral-400 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 20 20" aria-hidden="true">
                <path fill-rule="evenodd" d="M10 18a8 8 100-16 8 8 000 16zM8.28 7.22a.75.75 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 101.06 1.06L10 11.06l1.72 1.72a.75.75 101.06-1.06L11.06 10l1.72-1.72a.75.75 00-1.06-1.06L10 8.94 8.28 7.22z" clip-rule="evenodd" />
              </svg>
              <span class="text-neutral-500">Cannot request details</span>
            </li>
            <li class="flex items-start gap-3 opacity-50">
              <svg class="w-5 h-5 text-neutral-400 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 20 20" aria-hidden="true">
                <path fill-rule="evenodd" d="M10 18a8 8 100-16 8 8 000 16zM8.28 7.22a.75.75 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 101.06 1.06L10 11.06l1.72 1.72a.75.75 101.06-1.06L11.06 10l1.72-1.72a.75.75 00-1.06-1.06L10 8.94 8.28 7.22z" clip-rule="evenodd" />
              </svg>
              <span class="text-neutral-500">No access to Tier 3+</span>
            </li>
          </ul>
        </div>

        <!-- Card Footer -->
        <div class="px-6 py-6 bg-neutral-50 border-t border-neutral-200">
          <button
            type="button"
            class="w-full bg-white border-2 border-neutral-300 text-neutral-900 font-semibold px-6 py-3 rounded-lg transition-all duration-200 hover:border-neutral-400 hover:bg-neutral-50 focus:outline-none focus:ring-2 focus:ring-neutral-400 focus:ring-offset-2"
            data-tier="free"
            onclick="handleSubscriptionSelect('free')"
          >
            Get Started Free
          </button>
        </div>
      </article>

      <!-- Premium Tier Card (Emphasized) -->
      <article class="bg-white rounded-xl shadow-lg border-2 border-jm-coral overflow-hidden flex flex-col relative">
        <!-- Most Popular Badge -->
        <div class="absolute top-0 right-0 mt-4 mr-4">
          <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-gradient-jm text-white shadow-sm">
            Most Popular
          </span>
        </div>

        <!-- Card Header -->
        <div class="px-6 py-8 border-b border-neutral-200">
          <h2 class="text-2xl font-bold text-neutral-900 mb-2">Premium</h2>
          <div class="mb-2">
            <span class="text-4xl font-bold bg-gradient-jm bg-clip-text text-transparent" data-price-premium>₦18,000</span>
            <span class="text-neutral-600">/month</span>
          </div>
          <div class="mb-4">
            <span class="inline-flex items-center px-2 py-1 text-xs font-medium text-green-700 bg-green-50 rounded-full" data-savings-premium>
              Save ₦9,000 with quarterly plan
            </span>
          </div>
          <p class="text-sm text-neutral-600">
            For serious relationship seekers
          </p>
        </div>

        <!-- Card Body -->
        <div class="px-6 py-8 flex-grow">
          <div class="mb-6">
            <p class="text-sm font-semibold text-neutral-700 mb-2">Tier Access Ceiling:</p>
            <span class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gradient-jm text-white">
              Tier 4 Maximum
            </span>
          </div>

          <ul class="space-y-4" role="list">
            <li class="flex items-start gap-3">
              <svg class="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 20 20" aria-hidden="true">
                <path fill-rule="evenodd" d="M10 18a8 8 100-16 8 8 000 16zm3.857-9.809a.75.75 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 10-1.06 1.061l2.5 2.5a.75.75 001.137-.089l4-5.5z" clip-rule="evenodd" />
              </svg>
              <span class="text-neutral-700 font-medium">All Free features</span>
            </li>
            <li class="flex items-start gap-3">
              <svg class="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 20 20" aria-hidden="true">
                <path fill-rule="evenodd" d="M10 18a8 8 100-16 8 8 000 16zm3.857-9.809a.75.75 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 10-1.06 1.061l2.5 2.5a.75.75 001.137-.089l4-5.5z" clip-rule="evenodd" />
              </svg>
              <span class="text-neutral-700">Complete Tier 3 & 4</span>
            </li>
            <li class="flex items-start gap-3">
              <svg class="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 20 20" aria-hidden="true">
                <path fill-rule="evenodd" d="M10 18a8 8 100-16 8 8 000 16zm3.857-9.809a.75.75 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 10-1.06 1.061l2.5 2.5a.75.75 001.137-.089l4-5.5z" clip-rule="evenodd" />
              </svg>
              <span class="text-neutral-700">Request details from matches</span>
            </li>
            <li class="flex items-start gap-3">
              <svg class="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 20 20" aria-hidden="true">
                <path fill-rule="evenodd" d="M10 18a8 8 100-16 8 8 000 16zm3.857-9.809a.75.75 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 10-1.06 1.061l2.5 2.5a.75.75 001.137-.089l4-5.5z" clip-rule="evenodd" />
              </svg>
              <span class="text-neutral-700">Unlimited conversations</span>
            </li>
            <li class="flex items-start gap-3">
              <svg class="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 20 20" aria-hidden="true">
                <path fill-rule="evenodd" d="M10 18a8 8 100-16 8 8 000 16zm3.857-9.809a.75.75 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 10-1.06 1.061l2.5 2.5a.75.75 001.137-.089l4-5.5z" clip-rule="evenodd" />
              </svg>
              <span class="text-neutral-700">Advanced search filters</span>
            </li>
            <li class="flex items-start gap-3">
              <svg class="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 20 20" aria-hidden="true">
                <path fill-rule="evenodd" d="M10 18a8 8 100-16 8 8 000 16zm3.857-9.809a.75.75 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 10-1.06 1.061l2.5 2.5a.75.75 001.137-.089l4-5.5z" clip-rule="evenodd" />
              </svg>
              <span class="text-neutral-700">See who showed interest</span>
            </li>
            <li class="flex items-start gap-3">
              <svg class="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 20 20" aria-hidden="true">
                <path fill-rule="evenodd" d="M10 18a8 8 100-16 8 8 000 16zm3.857-9.809a.75.75 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 10-1.06 1.061l2.5 2.5a.75.75 001.137-.089l4-5.5z" clip-rule="evenodd" />
              </svg>
              <span class="text-neutral-700">Priority support</span>
            </li>
          </ul>
        </div>

        <!-- Card Footer -->
        <div class="px-6 py-6 bg-neutral-50 border-t border-neutral-200">
          <button
            type="button"
            class="w-full bg-gradient-jm hover:bg-gradient-jm-hover text-white font-semibold px-6 py-3 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-jm-coral focus:ring-offset-2"
            data-tier="premium"
            onclick="handleSubscriptionSelect('premium')"
          >
            Upgrade to Premium
          </button>
        </div>
      </article>

      <!-- VIP Tier Card -->
      <article class="bg-white rounded-xl shadow-sm border-2 border-transparent overflow-hidden flex flex-col relative" style="border-image: linear-gradient(135deg, #4D0052, #F16A6F) 1;">
        <!-- Exclusive Badge -->
        <div class="absolute top-0 right-0 mt-4 mr-4">
          <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-gradient-jm text-white shadow-sm">
            Exclusive
          </span>
        </div>

        <!-- Card Header -->
        <div class="px-6 py-8 border-b border-neutral-200">
          <h2 class="text-2xl font-bold text-neutral-900 mb-2">VIP</h2>
          <div class="mb-4">
            <span class="text-sm text-neutral-600 block mb-1" data-vip-starting-text>Starting at</span>
            <span class="text-4xl font-bold bg-gradient-jm bg-clip-text text-transparent" data-price-vip>₦200,000</span>
            <span class="text-neutral-600">/month</span>
          </div>
          <p class="text-sm text-neutral-600">
            Elite service with dedicated concierge
          </p>
        </div>

        <!-- Card Body -->
        <div class="px-6 py-8 flex-grow">
          <div class="mb-6">
            <p class="text-sm font-semibold text-neutral-700 mb-2">Tier Access Ceiling:</p>
            <span class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gradient-jm text-white">
              Tier 5 (Full Access)
            </span>
          </div>

          <ul class="space-y-4" role="list">
            <li class="flex items-start gap-3">
              <svg class="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 20 20" aria-hidden="true">
                <path fill-rule="evenodd" d="M10 18a8 8 100-16 8 8 000 16zm3.857-9.809a.75.75 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 10-1.06 1.061l2.5 2.5a.75.75 001.137-.089l4-5.5z" clip-rule="evenodd" />
              </svg>
              <span class="text-neutral-700 font-medium">All Premium features</span>
            </li>
            <li class="flex items-start gap-3">
              <svg class="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 20 20" aria-hidden="true">
                <path fill-rule="evenodd" d="M10 18a8 8 100-16 8 8 000 16zm3.857-9.809a.75.75 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 10-1.06 1.061l2.5 2.5a.75.75 001.137-.089l4-5.5z" clip-rule="evenodd" />
              </svg>
              <span class="text-neutral-700">Complete Tier 5 (Verified Identity)</span>
            </li>
            <li class="flex items-start gap-3">
              <svg class="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 20 20" aria-hidden="true">
                <path fill-rule="evenodd" d="M10 18a8 8 100-16 8 8 000 16zm3.857-9.809a.75.75 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 10-1.06 1.061l2.5 2.5a.75.75 001.137-.089l4-5.5z" clip-rule="evenodd" />
              </svg>
              <span class="text-neutral-700">Government ID verification</span>
            </li>
            <li class="flex items-start gap-3">
              <svg class="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 20 20" aria-hidden="true">
                <path fill-rule="evenodd" d="M10 18a8 8 100-16 8 8 000 16zm3.857-9.809a.75.75 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 10-1.06 1.061l2.5 2.5a.75.75 001.137-.089l4-5.5z" clip-rule="evenodd" />
              </svg>
              <span class="text-neutral-700">Dedicated concierge service</span>
            </li>
            <li class="flex items-start gap-3">
              <svg class="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 20 20" aria-hidden="true">
                <path fill-rule="evenodd" d="M10 18a8 8 100-16 8 8 000 16zm3.857-9.809a.75.75 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 10-1.06 1.061l2.5 2.5a.75.75 001.137-.089l4-5.5z" clip-rule="evenodd" />
              </svg>
              <span class="text-neutral-700">Profile verification badge</span>
            </li>
            <li class="flex items-start gap-3">
              <svg class="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 20 20" aria-hidden="true">
                <path fill-rule="evenodd" d="M10 18a8 8 100-16 8 8 000 16zm3.857-9.809a.75.75 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 10-1.06 1.061l2.5 2.5a.75.75 001.137-.089l4-5.5z" clip-rule="evenodd" />
              </svg>
              <span class="text-neutral-700">Custom matchmaking assistance</span>
            </li>
            <li class="flex items-start gap-3">
              <svg class="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 20 20" aria-hidden="true">
                <path fill-rule="evenodd" d="M10 18a8 8 100-16 8 8 000 16zm3.857-9.809a.75.75 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 10-1.06 1.061l2.5 2.5a.75.75 001.137-.089l4-5.5z" clip-rule="evenodd" />
              </svg>
              <span class="text-neutral-700">VIP-only event invitations</span>
            </li>
            <li class="flex items-start gap-3">
              <svg class="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 20 20" aria-hidden="true">
                <path fill-rule="evenodd" d="M10 18a8 8 100-16 8 8 000 16zm3.857-9.809a.75.75 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 10-1.06 1.061l2.5 2.5a.75.75 001.137-.089l4-5.5z" clip-rule="evenodd" />
              </svg>
              <span class="text-neutral-700">Priority placement in search</span>
            </li>
          </ul>
        </div>

        <!-- Card Footer -->
        <div class="px-6 py-6 bg-neutral-50 border-t border-neutral-200">
          <button
            type="button"
            class="w-full border-2 border-jm-coral text-jm-purple-dark font-semibold px-6 py-3 rounded-lg transition-all duration-200 hover:bg-jm-coral hover:text-white focus:outline-none focus:ring-2 focus:ring-jm-coral focus:ring-offset-2"
            data-tier="vip"
            onclick="handleSubscriptionSelect('vip')"
          >
            Apply for VIP
          </button>
          <p class="text-xs text-neutral-600 text-center mt-3">
            Application review within 48 hours
          </p>
        </div>
      </article>

    </section>

    <!-- Tier Ceiling Explainer -->
    <section class="bg-white rounded-xl shadow-sm border border-neutral-200 px-6 py-8 mb-16">
      <div class="max-w-3xl mx-auto">
        <h3 class="text-xl font-bold text-neutral-900 mb-4">
          Understanding Tier Ceilings
        </h3>
        <p class="text-neutral-700 mb-4">
          JoyMatcher uses a progressive disclosure system with 5 tiers of information. Your subscription tier determines the maximum tier you can complete and share with matches.
        </p>
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
          <div class="bg-neutral-50 rounded-lg px-4 py-4">
            <p class="font-semibold text-neutral-900 mb-1">Free: Tier 2</p>
            <p class="text-sm text-neutral-600">Identity & Intent, Lifestyle & Background</p>
          </div>
          <div class="bg-jm-coral-light bg-opacity-10 rounded-lg px-4 py-4 border border-jm-coral">
            <p class="font-semibold text-neutral-900 mb-1">Premium: Tier 4</p>
            <p class="text-sm text-neutral-600">+ Relationship & Family, Health & Compatibility</p>
          </div>
          <div class="bg-jm-purple-deep bg-opacity-5 rounded-lg px-4 py-4 border border-jm-purple">
            <p class="font-semibold text-neutral-900 mb-1">VIP: Tier 5</p>
            <p class="text-sm text-neutral-600">+ Verified Identity (full access)</p>
          </div>
        </div>
      </div>
    </section>

    <!-- FAQ Section -->
    <section class="mb-16">
      <h2 class="text-3xl font-bold text-neutral-900 text-center mb-8">
        Frequently Asked Questions
      </h2>

      <div class="max-w-3xl mx-auto space-y-4">
        <!-- FAQ Item 1 -->
        <details class="bg-white rounded-lg shadow-sm border border-neutral-200 overflow-hidden">
          <summary class="px-6 py-4 font-semibold text-neutral-900 cursor-pointer hover:bg-neutral-50 transition-colors flex items-center justify-between">
            What is a tier ceiling?
            <svg class="w-5 h-5 text-neutral-600" fill="none" stroke="currentColor" viewBox="0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
          </summary>
          <div class="px-6 py-4 border-t border-neutral-200 text-neutral-700">
            A tier ceiling is the maximum information tier you can complete based on your subscription level. Free users can complete up to Tier 2, Premium users up to Tier 4, and VIP users have full access to Tier 5. This ensures investment alignment and data quality.
          </div>
        </details>

        <!-- FAQ Item 2 -->
        <details class="bg-white rounded-lg shadow-sm border border-neutral-200 overflow-hidden">
          <summary class="px-6 py-4 font-semibold text-neutral-900 cursor-pointer hover:bg-neutral-50 transition-colors flex items-center justify-between">
            Can I downgrade my subscription?
            <svg class="w-5 h-5 text-neutral-600" fill="none" stroke="currentColor" viewBox="0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
          </summary>
          <div class="px-6 py-4 border-t border-neutral-200 text-neutral-700">
            Yes, you can downgrade at any time. However, information you've shared above your new tier ceiling will be automatically hidden from other users. Your matches will be notified of the change in your Effective Disclosure Tier (EDT).
          </div>
        </details>

        <!-- FAQ Item 3 -->
        <details class="bg-white rounded-lg shadow-sm border border-neutral-200 overflow-hidden">
          <summary class="px-6 py-4 font-semibold text-neutral-900 cursor-pointer hover:bg-neutral-50 transition-colors flex items-center justify-between">
            What payment methods do you accept?
            <svg class="w-5 h-5 text-neutral-600" fill="none" stroke="currentColor" viewBox="0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
          </summary>
          <div class="px-6 py-4 border-t border-neutral-200 text-neutral-700">
            We accept all major credit/debit cards (Visa, Mastercard, Verve) and bank transfers. For Nigerian users, we integrate with Paystack for secure local payments. International users can pay via Stripe.
          </div>
        </details>

        <!-- FAQ Item 4 -->
        <details class="bg-white rounded-lg shadow-sm border border-neutral-200 overflow-hidden">
          <summary class="px-6 py-4 font-semibold text-neutral-900 cursor-pointer hover:bg-neutral-50 transition-colors flex items-center justify-between">
            Is my payment information secure?
            <svg class="w-5 h-5 text-neutral-600" fill="none" stroke="currentColor" viewBox="0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
          </summary>
          <div class="px-6 py-4 border-t border-neutral-200 text-neutral-700">
            Absolutely. We never store your credit card information on our servers. All payment processing is handled by PCI-compliant payment processors (Paystack for Nigeria, Stripe internationally). Your financial data is encrypted and secure.
          </div>
        </details>

        <!-- FAQ Item 5 -->
        <details class="bg-white rounded-lg shadow-sm border border-neutral-200 overflow-hidden">
          <summary class="px-6 py-4 font-semibold text-neutral-900 cursor-pointer hover:bg-neutral-50 transition-colors flex items-center justify-between">
            What happens if I cancel my subscription?
            <svg class="w-5 h-5 text-neutral-600" fill="none" stroke="currentColor" viewBox="0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
          </summary>
          <div class="px-6 py-4 border-t border-neutral-200 text-neutral-700">
            You'll retain access to your paid features until the end of your current billing period. After that, your account will revert to Free tier, and information above Tier 2 will be hidden from matches. You can resubscribe at any time to restore full access.
          </div>
        </details>

        <!-- FAQ Item 6 -->
        <details class="bg-white rounded-lg shadow-sm border border-neutral-200 overflow-hidden">
          <summary class="px-6 py-4 font-semibold text-neutral-900 cursor-pointer hover:bg-neutral-50 transition-colors flex items-center justify-between">
            Do you offer refunds?
            <svg class="w-5 h-5 text-neutral-600" fill="none" stroke="currentColor" viewBox="0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
          </summary>
          <div class="px-6 py-4 border-t border-neutral-200 text-neutral-700">
            We offer a 14-day money-back guarantee for first-time Premium subscribers. VIP subscriptions are reviewed case-by-case. Please contact our support team if you have concerns about your subscription.
          </div>
        </details>
      </div>
    </section>

    <!-- Final CTA Section -->
    <section class="bg-gradient-jm rounded-xl shadow-lg px-8 py-12 text-center text-white">
      <h2 class="text-3xl font-bold mb-4">
        Ready to find your life partner?
      </h2>
      <p class="text-lg mb-8 opacity-90">
        Join thousands of verified users building meaningful relationships through trust and transparency.
      </p>
      <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
        <button
          type="button"
          class="bg-white text-jm-purple-dark font-semibold px-8 py-3 rounded-lg transition-all duration-200 hover:bg-neutral-100 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-jm-purple-dark"
          onclick="handleSubscriptionSelect('premium')"
        >
          Upgrade to Premium
        </button>
        <a
          href="/contact"
          class="text-white underline hover:no-underline font-medium"
        >
          Have questions? Contact us
        </a>
      </div>
    </section>

  </main>

  <!-- Footer (shared component) -->
  <footer class="bg-white border-t border-neutral-200 mt-16">
    <!-- Footer implementation from homepage_spec.md -->
  </footer>

  <!-- JavaScript -->
  <script src="/js/pricing.js"></script>
</body>
</html>
```

---

## Interactive Elements

### Currency Toggle

**Purpose:** Allow users to manually override automatic currency detection.

**Behavior:**
- Default: Hidden unless user explicitly requests currency change
- Click: Toggles between NGN and USD
- Updates all pricing displays simultaneously
- Stores preference in `localStorage` for future visits

**State:**
```javascript
const CurrencyToggleState = {
  visible: false,
  currentCurrency: 'NGN', // or 'USD'
  toggleEnabled: true
};
```

### Subscription Selection Buttons

**Purpose:** Initiate subscription or upgrade flow.

**Button States:**

**1. Free Tier Button**
- Label: "Get Started Free"
- Style: Secondary (white background, border)
- Action: Redirects to `/signup` if not authenticated, or shows "Already on Free" if user is logged in with Free tier

**2. Premium Tier Button**
- Label: "Upgrade to Premium" (or "Subscribe to Premium" for new users)
- Style: Primary (gradient background)
- Action: Opens payment modal if authenticated, redirects to `/signup?tier=premium` if not

**3. VIP Tier Button**
- Label: "Apply for VIP"
- Style: Secondary with gradient border
- Action: Opens VIP application modal (requires authentication)

**Click Handlers:**
```javascript
function handleSubscriptionSelect(tier) {
  // Check authentication
  if (!AppState.user) {
    // Redirect to signup with tier parameter
    window.location.href = `/signup?tier=${tier}`;
    return;
  }

  // Check current subscription
  const currentTier = AppState.user.subscription;

  if (currentTier === tier) {
    showAlert('info', `You are already subscribed to ${capitalize(tier)}.`);
    return;
  }

  // Handle tier-specific logic
  switch(tier) {
    case 'free':
      if (currentTier !== 'free') {
        showDowngradeWarningModal(tier);
      } else {
        showAlert('info', 'You are already on the Free plan.');
      }
      break;

    case 'premium':
      if (currentTier === 'vip') {
        showDowngradeWarningModal(tier);
      } else {
        showPremiumPaymentModal();
      }
      break;

    case 'vip':
      if (currentTier === 'premium' || currentTier === 'free') {
        showVIPApplicationModal();
      }
      break;
  }
}
```

### FAQ Accordion

**Purpose:** Progressive disclosure of common questions without page navigation.

**Behavior:**
- Single-item expansion (closing others when one opens)
- Smooth animation (200ms transition)
- Icon rotation on expand/collapse
- Keyboard accessible (Enter/Space to toggle)

**Implementation:**
```javascript
// Auto-close other accordions when one opens
document.querySelectorAll('details').forEach((detail) => {
  detail.addEventListener('toggle', (e) => {
    if (detail.open) {
      document.querySelectorAll('details').forEach((other) => {
        if (other !== detail && other.open) {
          other.open = false;
        }
      });
    }
  });
});
```

---

## State Management

### Global State Object

```javascript
const AppState = {
  user: null, // null if not authenticated
  displayCurrency: 'NGN', // 'NGN' or 'USD'
  pricingData: PricingData, // Defined earlier in spec
  modals: {
    premiumPayment: { open: false },
    vipApplication: { open: false },
    downgradeWarning: { open: false, targetTier: null }
  },
  loading: {
    paymentProcessing: false,
    vipApplicationSubmitting: false
  }
};
```

### User State (Authenticated)

```javascript
const exampleUserState = {
  id: 123,
  name: "Adebayo Johnson",
  email: "adebayo@example.com",
  country: "NG",
  subscription: "free", // 'free' | 'premium' | 'vip'
  subscriptionCeiling: 2, // 2 | 4 | 5
  completedTiers: [1, 2],
  billingPeriod: null, // null | 'monthly' | 'quarterly' | 'annual'
  nextBillingDate: null, // ISO date string or null
  paymentMethod: null // { type: 'card', last4: '4242' } or null
};
```

### State Synchronization

**On Page Load:**
```javascript
async function initializePricingPage() {
  // 1. Detect or load user
  await loadUserState();

  // 2. Determine display currency
  AppState.displayCurrency = detectUserCurrency();

  // 3. Update all pricing displays
  updatePricingDisplay();

  // 4. Update button states based on current subscription
  updateSubscriptionButtons();

  // 5. Show currency toggle if user has preference
  const currencyPreference = localStorage.getItem('preferredCurrency');
  if (currencyPreference) {
    document.getElementById('currencyToggle').style.display = 'flex';
  }
}

// Call on DOMContentLoaded
document.addEventListener('DOMContentLoaded', initializePricingPage);
```

**Currency Update:**
```javascript
function updatePricingDisplay() {
  const currency = AppState.displayCurrency;
  const symbol = currency === 'NGN' ? '₦' : '$';

  // Update Free tier (always 0)
  document.querySelector('[data-price-free]').textContent = `${symbol}0`;

  // Update Premium tier
  const premiumPricing = PricingData.premium[currency.toLowerCase()];
  const premiumMonthly = currency === 'NGN'
    ? formatNGN(premiumPricing.monthly)
    : formatUSD(premiumPricing.monthly);

  document.querySelector('[data-price-premium]').textContent = premiumMonthly;

  // Update Premium savings badge
  const savings = currency === 'NGN'
    ? formatNGN(premiumPricing.savings)
    : formatUSD(premiumPricing.savings);

  document.querySelector('[data-savings-premium]').textContent =
    `Save ${savings} with quarterly plan`;

  // Update VIP tier
  const vipPricing = PricingData.vip[currency.toLowerCase()];
  const vipMonthly = currency === 'NGN'
    ? formatNGN(vipPricing.monthly)
    : formatUSD(vipPricing.monthly);

  document.querySelector('[data-price-vip]').textContent = vipMonthly;
  document.querySelector('[data-vip-starting-text]').textContent = vipPricing.startingText;

  // Update currency toggle label
  document.getElementById('currencyLabel').textContent = currency;
}
```

---

## Upgrade Flow

### Premium Upgrade Flow

**Step 1: User clicks "Upgrade to Premium"**

**Step 2: Payment Modal Opens**

Modal contains:
- Billing period selection (Monthly / Quarterly)
- Price display with savings calculation
- Payment form (Paystack for NG, Stripe for international)
- Terms and conditions checkbox
- "Complete Payment" CTA button

**Step 3: Payment Processing**

```javascript
async function processPremiumPayment(billingPeriod) {
  AppState.loading.paymentProcessing = true;
  updatePaymentButtonState('processing');

  try {
    // Initialize payment processor
    const paymentProcessor = AppState.user.country === 'NG'
      ? initializePaystack()
      : initializeStripe();

    // Calculate amount
    const currency = AppState.displayCurrency.toLowerCase();
    const amount = billingPeriod === 'quarterly'
      ? PricingData.premium[currency].quarterly
      : PricingData.premium[currency].monthly;

    // Process payment
    const result = await paymentProcessor.processPayment({
      amount,
      currency,
      email: AppState.user.email,
      metadata: {
        userId: AppState.user.id,
        tier: 'premium',
        billingPeriod
      }
    });

    if (result.success) {
      // Update user state
      AppState.user.subscription = 'premium';
      AppState.user.subscriptionCeiling = 4;
      AppState.user.billingPeriod = billingPeriod;
      AppState.user.nextBillingDate = result.nextBillingDate;

      // Show success state
      showPaymentSuccess('premium');

      // Redirect to dashboard after 2 seconds
      setTimeout(() => {
        window.location.href = '/app/dashboard?upgraded=true';
      }, 2000);
    } else {
      throw new Error(result.error || 'Payment failed');
    }

  } catch (error) {
    showPaymentError(error.message);
  } finally {
    AppState.loading.paymentProcessing = false;
    updatePaymentButtonState('ready');
  }
}
```

**Step 4: Success Confirmation**

- Modal updates to show success state
- Checkmark icon animation
- Success message: "Welcome to Premium!"
- Automatic redirect to dashboard with `?upgraded=true` parameter

### VIP Application Flow

**Step 1: User clicks "Apply for VIP"**

**Step 2: VIP Application Modal Opens**

Modal contains:
- Application form fields:
  - Full Name (pre-filled from profile)
  - Email (pre-filled)
  - Phone Number (required)
  - Preferred Monthly Investment (dropdown: ₦200k-500k, ₦500k-1M, ₦1M+)
  - What are you looking for in VIP membership? (textarea)
  - How did you hear about VIP? (dropdown)
- Information about review process
- "Submit Application" CTA button

**Step 3: Application Submission**

```javascript
async function submitVIPApplication(formData) {
  AppState.loading.vipApplicationSubmitting = true;
  updateVIPSubmitButtonState('submitting');

  try {
    const response = await fetch('/api/vip-applications', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${AppState.user.token}`
      },
      body: JSON.stringify({
        userId: AppState.user.id,
        ...formData,
        submittedAt: new Date().toISOString()
      })
    });

    if (!response.ok) {
      throw new Error('Application submission failed');
    }

    const result = await response.json();

    // Show success state
    showVIPApplicationSuccess();

    // Send confirmation email (handled by backend)
    // Notify concierge team (handled by backend)

  } catch (error) {
    showVIPApplicationError(error.message);
  } finally {
    AppState.loading.vipApplicationSubmitting = false;
    updateVIPSubmitButtonState('ready');
  }
}
```

**Step 4: Application Confirmation**

- Modal updates to show success state
- Message: "Application Received"
- Explanation: "Our concierge team will review your application and contact you within 48 hours via email and phone."
- "Return to Dashboard" button

**Step 5: Concierge Follow-up (Backend)**

- VIP team receives notification
- Reviews application within 48 hours
- Contacts applicant via phone/email
- Discusses custom pricing and services
- Manual approval and account upgrade

---

## Payment Integration Points

### Paystack Integration (Nigerian Users)

**Configuration:**
```javascript
function initializePaystack() {
  return {
    async processPayment(params) {
      const handler = PaystackPop.setup({
        key: PAYSTACK_PUBLIC_KEY,
        email: params.email,
        amount: params.amount * 100, // Convert to kobo
        currency: 'NGN',
        metadata: params.metadata,
        callback: function(response) {
          // Verify transaction on backend
          return verifyPaystackTransaction(response.reference);
        },
        onClose: function() {
          throw new Error('Payment cancelled by user');
        }
      });

      handler.openIframe();
    }
  };
}

async function verifyPaystackTransaction(reference) {
  const response = await fetch('/api/payments/verify-paystack', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${AppState.user.token}`
    },
    body: JSON.stringify({ reference })
  });

  return await response.json();
}
```

### Stripe Integration (International Users)

**Configuration:**
```javascript
function initializeStripe() {
  const stripe = Stripe(STRIPE_PUBLIC_KEY);

  return {
    async processPayment(params) {
      // Create payment intent on backend
      const { clientSecret } = await fetch('/api/payments/create-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${AppState.user.token}`
        },
        body: JSON.stringify({
          amount: params.amount,
          currency: params.currency,
          metadata: params.metadata
        })
      }).then(r => r.json());

      // Confirm payment with Stripe
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement, // Stripe card element
          billing_details: {
            email: params.email
          }
        }
      });

      if (result.error) {
        throw new Error(result.error.message);
      }

      return {
        success: true,
        paymentIntentId: result.paymentIntent.id
      };
    }
  };
}
```

### Backend Webhook Handling

**Paystack Webhook:**
```javascript
// POST /api/webhooks/paystack
async function handlePaystackWebhook(req, res) {
  const hash = crypto.createHmac('sha512', PAYSTACK_SECRET_KEY)
    .update(JSON.stringify(req.body))
    .digest('hex');

  if (hash !== req.headers['x-paystack-signature']) {
    return res.status(401).send('Invalid signature');
  }

  const event = req.body;

  if (event.event === 'charge.success') {
    const { reference, metadata } = event.data;

    // Upgrade user account
    await upgradeUserSubscription(metadata.userId, metadata.tier, metadata.billingPeriod);

    // Send confirmation email
    await sendSubscriptionConfirmationEmail(metadata.userId);
  }

  res.status(200).send('OK');
}
```

**Stripe Webhook:**
```javascript
// POST /api/webhooks/stripe
async function handleStripeWebhook(req, res) {
  const sig = req.headers['stripe-signature'];

  let event;
  try {
    event = stripe.webhooks.constructEvent(req.body, sig, STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === 'payment_intent.succeeded') {
    const paymentIntent = event.data.object;
    const { userId, tier, billingPeriod } = paymentIntent.metadata;

    // Upgrade user account
    await upgradeUserSubscription(userId, tier, billingPeriod);

    // Send confirmation email
    await sendSubscriptionConfirmationEmail(userId);
  }

  res.status(200).send('OK');
}
```

---

## Error Handling

### Payment Errors

**Card Declined:**
```javascript
function showPaymentError(message) {
  const errorMessages = {
    'card_declined': 'Your card was declined. Please try another payment method.',
    'insufficient_funds': 'Insufficient funds. Please use a different card or contact your bank.',
    'invalid_card': 'Invalid card details. Please check and try again.',
    'processing_error': 'Payment processing error. Please try again in a few moments.',
    'network_error': 'Network connection lost. Please check your internet and try again.'
  };

  const displayMessage = errorMessages[message] || message;

  // Show error alert in modal
  const alertHTML = `
    <div class="bg-red-50 border border-red-200 rounded-lg px-4 py-3 mb-4" role="alert">
      <div class="flex items-start gap-3">
        <svg class="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 20 20">
          <path fill-rule="evenodd" d="M10 18a8 8 100-16 8 8 000 16zM8.28 7.22a.75.75 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 101.06 1.06L10 11.06l1.72 1.72a.75.75 101.06-1.06L11.06 10l1.72-1.72a.75.75 00-1.06-1.06L10 8.94 8.28 7.22z" clip-rule="evenodd" />
        </svg>
        <div class="flex-1">
          <p class="font-semibold text-red-900">Payment Failed</p>
          <p class="text-sm text-red-700 mt-1">${displayMessage}</p>
        </div>
      </div>
    </div>
  `;

  document.getElementById('paymentModalErrors').innerHTML = alertHTML;
}
```

### VIP Application Errors

**Submission Failed:**
```javascript
function showVIPApplicationError(message) {
  const alertHTML = `
    <div class="bg-red-50 border border-red-200 rounded-lg px-4 py-3 mb-4" role="alert">
      <div class="flex items-start gap-3">
        <svg class="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 20 20">
          <path fill-rule="evenodd" d="M10 18a8 8 100-16 8 8 000 16zM8.28 7.22a.75.75 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 101.06 1.06L10 11.06l1.72 1.72a.75.75 101.06-1.06L11.06 10l1.72-1.72a.75.75 00-1.06-1.06L10 8.94 8.28 7.22z" clip-rule="evenodd" />
        </svg>
        <div class="flex-1">
          <p class="font-semibold text-red-900">Application Failed</p>
          <p class="text-sm text-red-700 mt-1">${message}</p>
          <p class="text-sm text-red-700 mt-2">Please try again or contact support if the issue persists.</p>
        </div>
      </div>
    </div>
  `;

  document.getElementById('vipApplicationErrors').innerHTML = alertHTML;
}
```

### Currency Detection Errors

**Fallback Behavior:**
```javascript
function detectUserCurrency() {
  try {
    // Primary: Check authenticated user profile
    if (AppState.user && AppState.user.country) {
      return AppState.user.country === 'NG' ? 'NGN' : 'USD';
    }

    // Secondary: Check localStorage preference
    const savedCurrency = localStorage.getItem('preferredCurrency');
    if (savedCurrency && ['NGN', 'USD'].includes(savedCurrency)) {
      return savedCurrency;
    }

    // Tertiary: Check browser timezone
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    if (timezone === 'Africa/Lagos') {
      return 'NGN';
    }

    // Fallback: Default to USD for international audience
    return 'USD';

  } catch (error) {
    console.error('Currency detection failed:', error);
    // Safe fallback
    return 'USD';
  }
}
```

---

## Loading States

### Payment Processing

**Button Loading State:**
```html
<!-- Before processing -->
<button
  type="button"
  class="w-full bg-gradient-jm text-white font-semibold px-6 py-3 rounded-lg"
  id="paymentSubmitButton"
>
  Complete Payment
</button>

<!-- During processing -->
<button
  type="button"
  class="w-full bg-gradient-jm text-white font-semibold px-6 py-3 rounded-lg opacity-75 cursor-not-allowed"
  disabled
  id="paymentSubmitButton"
>
  <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 24 24">
    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 018-8V0C5.373 0 5.373 12h4zm2 5.291A7.962 7.962 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
  </svg>
  Processing Payment...
</button>
```

**JavaScript State Update:**
```javascript
function updatePaymentButtonState(state) {
  const button = document.getElementById('paymentSubmitButton');

  switch(state) {
    case 'ready':
      button.disabled = false;
      button.classList.remove('opacity-75', 'cursor-not-allowed');
      button.innerHTML = 'Complete Payment';
      break;

    case 'processing':
      button.disabled = true;
      button.classList.add('opacity-75', 'cursor-not-allowed');
      button.innerHTML = `
        <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 018-8V0C5.373 0 5.373 12h4zm2 5.291A7.962 7.962 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        Processing Payment...
      `;
      break;

    case 'success':
      button.disabled = true;
      button.classList.remove('bg-gradient-jm');
      button.classList.add('bg-green-600');
      button.innerHTML = `
        <svg class="w-5 h-5 text-white inline mr-2" fill="currentColor" viewBox="0 20 20">
          <path fill-rule="evenodd" d="M10 18a8 8 100-16 8 8 000 16zm3.857-9.809a.75.75 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 10-1.06 1.061l2.5 2.5a.75.75 001.137-.089l4-5.5z" clip-rule="evenodd" />
        </svg>
        Payment Successful!
      `;
      break;
  }
}
```

### VIP Application Submission

**Form Loading State:**
```javascript
function updateVIPSubmitButtonState(state) {
  const button = document.getElementById('vipApplicationSubmitButton');

  switch(state) {
    case 'ready':
      button.disabled = false;
      button.classList.remove('opacity-75', 'cursor-not-allowed');
      button.innerHTML = 'Submit Application';
      break;

    case 'submitting':
      button.disabled = true;
      button.classList.add('opacity-75', 'cursor-not-allowed');
      button.innerHTML = `
        <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 018-8V0C5.373 0 5.373 12h4zm2 5.291A7.962 7.962 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        Submitting Application...
      `;
      break;

    case 'success':
      button.disabled = true;
      button.classList.remove('border-jm-coral', 'text-jm-purple-dark');
      button.classList.add('bg-green-600', 'text-white', 'border-green-600');
      button.innerHTML = `
        <svg class="w-5 h-5 text-white inline mr-2" fill="currentColor" viewBox="0 20 20">
          <path fill-rule="evenodd" d="M10 18a8 8 100-16 8 8 000 16zm3.857-9.809a.75.75 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 10-1.06 1.061l2.5 2.5a.75.75 001.137-.089l4-5.5z" clip-rule="evenodd" />
        </svg>
        Application Submitted!
      `;
      break;
  }
}
```

### Page Load Skeleton

**Initial Load State (Optional):**
```html
<!-- Skeleton loader for pricing cards (shown during initial page load) -->
<div class="animate-pulse grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" id="pricingSkeletonLoader">
  <div class="bg-white rounded-xl shadow-sm border border-neutral-200 p-6">
    <div class="h-8 bg-neutral-200 rounded w-1/3 mb-4"></div>
    <div class="h-12 bg-neutral-200 rounded w-2/3 mb-4"></div>
    <div class="h-20 bg-neutral-200 rounded w-full mb-4"></div>
    <div class="space-y-3">
      <div class="h-4 bg-neutral-200 rounded w-full"></div>
      <div class="h-4 bg-neutral-200 rounded w-5/6"></div>
      <div class="h-4 bg-neutral-200 rounded w-4/6"></div>
    </div>
  </div>
  <!-- Repeat for 3 cards -->
</div>
```

---

## Success States

### Payment Success Modal

**Content:**
```html
<div class="text-center px-6 py-8" id="paymentSuccessContent">
  <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
    <svg class="w-8 h-8 text-green-600" fill="currentColor" viewBox="0 20 20">
      <path fill-rule="evenodd" d="M10 18a8 8 100-16 8 8 000 16zm3.857-9.809a.75.75 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 10-1.06 1.061l2.5 2.5a.75.75 001.137-.089l4-5.5z" clip-rule="evenodd" />
    </svg>
  </div>

  <h3 class="text-2xl font-bold text-neutral-900 mb-2">
    Welcome to Premium!
  </h3>

  <p class="text-neutral-700 mb-6">
    Your payment was successful. You now have access to Tier 4 and all Premium features.
  </p>

  <div class="bg-neutral-50 rounded-lg px-4 py-3 mb-6 text-left">
    <p class="text-sm text-neutral-600 mb-1">Subscription Details:</p>
    <p class="text-sm font-medium text-neutral-900">Premium - <span data-billing-period>Monthly</span></p>
    <p class="text-sm text-neutral-600">Next billing: <span data-next-billing-date>March 27, 2026</span></p>
  </div>

  <p class="text-sm text-neutral-600">
    Redirecting to your dashboard...
  </p>
</div>
```

### VIP Application Success

**Content:**
```html
<div class="text-center px-6 py-8" id="vipApplicationSuccessContent">
  <div class="w-16 h-16 bg-gradient-jm rounded-full flex items-center justify-center mx-auto mb-4">
    <svg class="w-8 h-8 text-white" fill="currentColor" viewBox="0 20 20">
      <path fill-rule="evenodd" d="M10 18a8 8 100-16 8 8 000 16zm3.857-9.809a.75.75 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 10-1.06 1.061l2.5 2.5a.75.75 001.137-.089l4-5.5z" clip-rule="evenodd" />
    </svg>
  </div>

  <h3 class="text-2xl font-bold text-neutral-900 mb-2">
    Application Received
  </h3>

  <p class="text-neutral-700 mb-6">
    Thank you for your interest in VIP membership. Our concierge team will review your application and contact you within 48 hours via email and phone.
  </p>

  <div class="bg-neutral-50 rounded-lg px-4 py-4 mb-6 text-left">
    <p class="text-sm font-semibold text-neutral-900 mb-2">What happens next?</p>
    <ul class="space-y-2 text-sm text-neutral-700">
      <li class="flex items-start gap-2">
        <span class="text-jm-coral">1.</span>
        <span>Application review (within 24 hours)</span>
      </li>
      <li class="flex items-start gap-2">
        <span class="text-jm-coral">2.</span>
        <span>Personalized consultation call</span>
      </li>
      <li class="flex items-start gap-2">
        <span class="text-jm-coral">3.</span>
        <span>Custom pricing and service agreement</span>
      </li>
      <li class="flex items-start gap-2">
        <span class="text-jm-coral">4.</span>
        <span>VIP membership activation</span>
      </li>
    </ul>
  </div>

  <button
    type="button"
    class="w-full bg-gradient-jm text-white font-semibold px-6 py-3 rounded-lg"
    onclick="window.location.href='/app/dashboard'"
  >
    Return to Dashboard
  </button>
</div>
```

---

## Accessibility Requirements

### WCAG 2.1 AA Compliance Checklist

**Color Contrast:**
- [ ] All text meets 4.5:1 contrast ratio minimum
  - Neutral-900 on white: 16.8:1 ✓
  - Neutral-700 on white: 10.2:1 ✓
  - Coral (#F16A6F) on white: 3.9:1 (use only for decorative, not text) ⚠️
- [ ] Interactive elements have 3:1 contrast ratio minimum for non-text content
- [ ] Focus indicators meet 3:1 contrast ratio

**Keyboard Navigation:**
- [ ] All interactive elements are keyboard accessible
- [ ] Logical tab order through pricing cards (Free → Premium → VIP)
- [ ] FAQ accordions toggle with Enter/Space keys
- [ ] Modal dialogs trap focus and return focus on close
- [ ] Escape key closes all modals

**Screen Reader Support:**
```html
<!-- Pricing card structure with proper ARIA -->
<article
  class="bg-white rounded-xl shadow-sm border border-neutral-200"
  role="article"
  aria-labelledby="tier-premium-title"
>
  <div class="px-6 py-8">
    <h2 id="tier-premium-title" class="text-2xl font-bold">Premium</h2>
    <div aria-label="Pricing">
      <span aria-hidden="true">₦18,000</span>
      <span class="sr-only">Eighteen thousand Naira per month</span>
    </div>
  </div>

  <ul role="list" aria-label="Premium features">
    <li class="flex items-start gap-3">
      <svg aria-hidden="true" class="w-5 h-5 text-green-600"></svg>
      <span>Complete Tier 3 & 4</span>
    </li>
  </ul>

  <button
    type="button"
    aria-label="Upgrade to Premium subscription"
    data-tier="premium"
  >
    Upgrade to Premium
  </button>
</article>
```

**Focus Management:**
```javascript
function openModal(modalId) {
  const modal = document.getElementById(modalId);
  const firstFocusable = modal.querySelector('button, input, select, textarea');

  // Store currently focused element
  const previouslyFocused = document.activeElement;

  // Show modal
  modal.classList.remove('hidden');
  modal.setAttribute('aria-hidden', 'false');

  // Focus first element
  if (firstFocusable) {
    firstFocusable.focus();
  }

  // Return focus on close
  modal.addEventListener('closeModal', () => {
    previouslyFocused.focus();
  }, { once: true });
}
```

**Form Labels:**
```html
<form id="vipApplicationForm" aria-labelledby="vipApplicationTitle">
  <h2 id="vipApplicationTitle" class="text-2xl font-bold mb-6">VIP Membership Application</h2>

  <div class="mb-4">
    <label for="vip-phone" class="block text-sm font-medium text-neutral-700 mb-2">
      Phone Number
      <span class="text-red-600" aria-label="required">*</span>
    </label>
    <input
      type="tel"
      id="vip-phone"
      name="phone"
      required
      aria-required="true"
      aria-describedby="vip-phone-help"
      class="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-jm-coral"
    />
    <p id="vip-phone-help" class="text-sm text-neutral-600 mt-1">
      We'll call you within 48 hours to discuss your membership.
    </p>
  </div>
</form>
```

**Error Announcements:**
```html
<!-- Live region for dynamic announcements -->
<div
  role="status"
  aria-live="polite"
  aria-atomic="true"
  class="sr-only"
  id="statusAnnouncements"
></div>

<script>
function announceToScreenReader(message) {
  const announcer = document.getElementById('statusAnnouncements');
  announcer.textContent = message;

  // Clear after 3 seconds
  setTimeout(() => {
    announcer.textContent = '';
  }, 3000);
}

// Usage:
// announceToScreenReader('Payment successful. Redirecting to dashboard.');
</script>
```

---

## Responsive Design

### Breakpoint Strategy

**Mobile First:**
- Default styles: Mobile (<768px)
- `sm:` prefix: Small tablets (≥768px)
- `md:` prefix: Tablets (≥1024px)
- `lg:` prefix: Desktop (≥1280px)
- `xl:` prefix: Large desktop (≥1536px)

### Layout Adaptations

**Pricing Cards:**
```css
/* Mobile: Stacked vertically */
.grid-cols-1 { grid-template-columns: repeat(1, minmax(0, 1fr)); }

/* Tablet: 2 columns (Free+Premium in first row, VIP below) */
@media (min-width: 768px) {
  .md\\:grid-cols-2 { grid-template-columns: repeat(2, minmax(0, 1fr)); }
}

/* Desktop: 3 columns side-by-side */
@media (min-width: 1024px) {
  .lg\\:grid-cols-3 { grid-template-columns: repeat(3, minmax(0, 1fr)); }
}
```

**Typography Scaling:**
```html
<!-- Page title -->
<h1 class="text-4xl sm:text-5xl font-bold">
  Choose Your Membership
</h1>

<!-- Subtitle -->
<p class="text-lg sm:text-xl text-neutral-600">
  Transparent pricing with no hidden fees.
</p>

<!-- Card title -->
<h2 class="text-2xl font-bold">Premium</h2>

<!-- Price -->
<span class="text-4xl font-bold">₦18,000</span>
```

**Spacing Adjustments:**
```html
<!-- Section padding -->
<main class="px-4 sm:px-6 lg:px-8 py-12 sm:py-16">

<!-- Card gap -->
<section class="grid gap-8">

<!-- Element margin -->
<header class="mb-12 sm:mb-16">
```

### Mobile Optimizations

**Touch Targets:**
- Minimum 44x44px for all interactive elements
- Increased button padding on mobile: `py-3 px-6`
- Adequate spacing between clickable elements (8px minimum)

**Modal Behavior:**
```css
/* Mobile: Full-screen modals */
@media (max-width: 767px) {
  .modal-content {
    width: 100vw;
    height: 100vh;
    border-radius: 0;
  }
}

/* Desktop: Centered modals with max-width */
@media (min-width: 768px) {
  .modal-content {
    max-width: 600px;
    max-height: 90vh;
    border-radius: 12px;
  }
}
```

**FAQ Accordion:**
```html
<!-- Mobile-friendly tap target -->
<summary class="px-6 py-4 cursor-pointer hover:bg-neutral-50 transition-colors flex items-center justify-between">
  <span class="text-base sm:text-lg font-semibold">What is a tier ceiling?</span>
  <svg class="w-5 h-5 sm:w-6 sm:h-6 text-neutral-600"></svg>
</summary>
```

---

## Performance Optimization

### Page Load Performance

**Target Metrics:**
- First Contentful Paint (FCP): <1.5s
- Largest Contentful Paint (LCP): <2.5s
- Time to Interactive (TTI): <3.0s
- Cumulative Layout Shift (CLS): <0.1

**Optimization Strategies:**

**1. Critical CSS Inlining**
```html
<head>
  <style>
    /* Inline critical above-the-fold CSS */
    .bg-gradient-jm { background-image: linear-gradient(135deg, #4D0052%, #F16A6F 100%); }
    .text-4xl { font-size: 2.25rem; }
    /* ... essential styles */
  </style>
  <link rel="preload" href="/css/pricing.css" as="style" onload="this.onload=null;this.rel='stylesheet'">
  <noscript><link rel="stylesheet" href="/css/pricing.css"></noscript>
</head>
```

**2. Image Optimization**
```html
<!-- Use WebP with fallback -->
<picture>
  <source type="image/webp" srcset="/images/vip-badge.webp">
  <img src="/images/vip-badge.png" alt="VIP Exclusive Badge" loading="lazy" width="120" height="32">
</picture>
```

**3. JavaScript Lazy Loading**
```html
<!-- Defer non-critical JavaScript -->
<script src="/js/pricing.js" defer></script>

<!-- Lazy load payment processor SDKs -->
<script>
  function loadPaymentProcessor() {
    if (AppState.user) {
      const script = document.createElement('script');
      script.src = AppState.user.country === 'NG'
        ? 'https://js.paystack.co/v1/inline.js'
        : 'https://js.stripe.com/v3/';
      script.async = true;
      document.head.appendChild(script);
    }
  }

  // Load only when user interacts with pricing
  document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('[data-tier]');
    buttons.forEach(btn => {
      btn.addEventListener('click', loadPaymentProcessor, { once: true });
    });
  });
</script>
```

**4. Font Loading Optimization**
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">

<style>
  /* Font display swap to prevent FOIT */
  body { font-family: 'Inter', system-ui, -apple-system, sans-serif; }
</style>
```

**5. Reduce Layout Shift**
```html
<!-- Reserve space for pricing cards -->
<section class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" style="min-height: 600px;">
  <!-- Cards -->
</section>

<!-- Set explicit dimensions for icons -->
<svg class="w-5 h-5" width="20" height="20"></svg>
```

### Runtime Performance

**Debounce Currency Toggle:**
```javascript
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

const debouncedCurrencyUpdate = debounce(updatePricingDisplay, 150);

document.getElementById('currencySwitchButton').addEventListener('click', () => {
  toggleCurrency();
  debouncedCurrencyUpdate();
});
```

**Efficient DOM Updates:**
```javascript
// Batch DOM updates
function updateAllPricing(currency) {
  const updates = [];

  // Collect all updates first
  updates.push({
    element: document.querySelector('[data-price-premium]'),
    value: formatPrice(PricingData.premium[currency].monthly, currency)
  });

  // Apply all at once (reduces reflows)
  requestAnimationFrame(() => {
    updates.forEach(({ element, value }) => {
      element.textContent = value;
    });
  });
}
```

---

## Cross-References

### Related Documentation

**Tier System:**
- `docs/Global Context/tier_system.md` - Master reference for tier definitions, EDT calculations
- `docs/Technical Specifications/subscription_tier_ceiling.md` - Detailed ceiling enforcement logic

**User Flows:**
- `docs/Technical Specifications/show_interest_flow.md` - Show Interest requirements and gating
- `docs/Technical Specifications/request_details_flow.md` - Reciprocal tier disclosure process

**Design System:**
- `docs/Design System/html_implementation_guide.md` - Complete HTML/Tailwind component library
- `docs/Design System/color_palette.md` - Brand colors and usage guidelines
- `docs/Design System/typography.md` - Font system and hierarchy

**Product Strategy:**
- `docs/Global Context/product_charter.md` - Pricing strategy and positioning
- `docs/Global Context/trust_philosophy.md` - Core values driving subscription model

### Related Specifications

**User Screens:**
- `homepage_spec.md` - Landing page with pricing preview
- `signup_spec.md` - Signup flow with tier selection (links to pricing)
- `dashboard_spec.md` - Dashboard with upgrade prompts
- `vip_landing_spec.md` - Detailed VIP benefits page

**System Flows:**
- `upgrade_modal_spec.md` - Reusable upgrade modal component
- `payment_flow_spec.md` - Complete payment processing flow
- `downgrade_warning_spec.md` - Downgrade confirmation and warnings

### Backend Integration Points

**API Endpoints (Future Implementation):**
- `POST /api/subscriptions/create` - Create new subscription
- `POST /api/subscriptions/upgrade` - Upgrade existing subscription
- `POST /api/subscriptions/downgrade` - Downgrade subscription
- `POST /api/vip-applications` - Submit VIP application
- `POST /api/payments/verify-paystack` - Verify Paystack transaction
- `POST /api/payments/create-intent` - Create Stripe payment intent
- `POST /api/webhooks/paystack` - Handle Paystack webhooks
- `POST /api/webhooks/stripe` - Handle Stripe webhooks

---

## Implementation Notes

### Development Checklist

- [ ] Create `/pricing.html` with complete markup
- [ ] Create `/js/pricing.js` with state management and handlers
- [ ] Create `/css/pricing.css` with custom styles (if needed beyond Tailwind)
- [ ] Implement currency detection and toggle
- [ ] Implement Premium payment modal
- [ ] Implement VIP application modal
- [ ] Implement downgrade warning modal
- [ ] Set up Paystack integration (Nigerian users)
- [ ] Set up Stripe integration (international users)
- [ ] Create backend webhook handlers
- [ ] Test all subscription flows end-to-end
- [ ] Verify accessibility compliance (WCAG 2.1 AA)
- [ ] Test responsive design across devices
- [ ] Optimize page load performance
- [ ] Add analytics tracking for conversions

### Testing Scenarios

**Currency Display:**
- [ ] Nigerian user (detected via country=NG) sees ₦ prices
- [ ] International user sees $ prices
- [ ] Manual currency toggle works correctly
- [ ] Currency preference persists across sessions

**Free → Premium Upgrade:**
- [ ] Free user can click "Upgrade to Premium"
- [ ] Payment modal opens with correct pricing
- [ ] Monthly vs Quarterly selection updates price
- [ ] Payment processes successfully
- [ ] User subscription updates to Premium
- [ ] Tier ceiling increases to 4
- [ ] Success message displays correctly
- [ ] Redirects to dashboard with upgrade confirmation

**Premium → VIP Application:**
- [ ] Premium user can click "Apply for VIP"
- [ ] Application modal opens with pre-filled information
- [ ] Form validation works correctly
- [ ] Application submits successfully
- [ ] Success message displays with next steps
- [ ] Concierge team receives notification

**Downgrade Scenarios:**
- [ ] Premium → Free shows appropriate warnings
- [ ] VIP → Premium/Free shows tier 5 data hiding warning
- [ ] EDT recalculation triggered for all matches
- [ ] Matches notified of EDT change

**Error Handling:**
- [ ] Card declined error displays helpful message
- [ ] Network error shows retry option
- [ ] Invalid form submission shows field-specific errors
- [ ] Payment processor failures handled gracefully

**Accessibility:**
- [ ] Keyboard navigation works throughout page
- [ ] Screen reader announces dynamic changes
- [ ] Focus management in modals correct
- [ ] Color contrast meets WCAG 2.1 AA

**Responsive Design:**
- [ ] Pricing cards stack correctly on mobile
- [ ] Touch targets meet 44x44px minimum
- [ ] Modals display appropriately on mobile
- [ ] No horizontal scrolling on any breakpoint

### Future Enhancements

**Potential Features:**
- Annual Premium plan with additional discount
- Gift subscriptions (Premium for someone else)
- Referral program with subscription credit
- Corporate/group VIP packages for organizations
- Trial period for Premium (7 days free)
- Promo code support for discounts
- Subscription pause feature (instead of cancel)
- Flexible payment plans (pay in installments)

---

## Conclusion

This specification provides a complete blueprint for implementing the JoyMatcher Pricing page. The design prioritizes transparency, trust, and conversion while maintaining strict adherence to the tier ceiling system and subscription gating rules.

**Key Success Metrics:**
- Free → Premium conversion rate target: 15-20%
- Premium → VIP application rate target: 5-10%
- Payment completion rate target: >85%
- Page load time target: <2.5s LCP
- Mobile usability score target: >90

**Word Count:** 4,987 words

**Implementation Priority:** HIGH - Critical conversion point in user journey.