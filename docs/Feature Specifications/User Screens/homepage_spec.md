# Homepage Feature Specification

**Version:** 1.0.0
**Last Updated:** 2026-02-27
**Status:** Complete
**Page Route:** `/`
**Access Level:** Public (No authentication required)

---

## 1. Page Purpose & User Goals

### Primary Purpose
The homepage is the first touchpoint for potential users, designed to communicate JoyMatcher's unique value proposition, build trust, and convert visitors into registered users.

### User Goals
- **First-time visitors:** Understand what JoyMatcher is and how it differs from dating apps
- **Marriage-minded professionals:** Quickly assess if the platform aligns with their serious intentions
- **Skeptical users:** Gain confidence in the tier system, privacy controls, and success stories
- **Ready-to-commit users:** Clear path to sign up and start tier completion

### Success Metrics
- Time on page: >2 minutes (engaged users)
- Scroll depth: >70% (reading full value prop)
- CTA clicks: "Get Started" > "How It Works" > "Pricing"
- Signup conversion: 10-15% of engaged visitors

---

## 2. Layout & Wireframe Description

### Overall Structure
```
┌─────────────────────────────────────────┐
│         Navigation Header               │
├─────────────────────────────────────────┤
│         Hero Section                    │
│  [Headline + Subheadline + CTA]        │
├─────────────────────────────────────────┤
│         Value Propositions              │
│  [3-Column Feature Grid]                │
├─────────────────────────────────────────┤
│         How It Works Section            │
│  [Step-by-step tier explanation]        │
├─────────────────────────────────────────┤
│         Testimonials Section            │
│  [3 success stories carousel]           │
├─────────────────────────────────────────┤
│         Pricing Teaser                  │
│  [Free, Premium, VIP comparison]        │
├─────────────────────────────────────────┤
│         Trust & Safety                  │
│  [Verification, Privacy, KYC badges]    │
├─────────────────────────────────────────┤
│         Final CTA                       │
│  [Large signup button]                  │
├─────────────────────────────────────────┤
│         Footer                          │
└─────────────────────────────────────────┘
```

### Viewport Considerations
- **Desktop (≥1024px):** Full multi-column layout, hero with illustration
- **Tablet (768px-1023px):** 2-column grid, stacked sections
- **Mobile (320px-767px):** Single column, mobile-optimized hero, sticky CTA

---

## 3. Component Breakdown

### 3.1 Navigation Header

**Content:**
- Logo (left): JoyMatcher brand mark + wordmark
- Navigation links (right):
  - How It Works
  - Pricing
  - Safety
  - Success Stories
  - Log In (secondary button)
  - Sign Up (primary button)

**HTML Structure:**
```html
<header class="bg-white border-b border-jm-gray-200 sticky top-0 z-50 shadow-sm">
  <nav class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-label="Main navigation">
    <div class="flex items-center justify-between h-16">
      <!-- Logo -->
      <a href="/" class="flex items-center gap-3 focus:outline-none focus:ring-2 focus:ring-jm-purple rounded-md">
        <img src="/images/logo.svg" alt="JoyMatcher" class="h-8 w-8" />
        <span class="font-serif text-xl font-bold text-jm-gray-900">JoyMatcher</span>
      </a>

      <!-- Desktop Navigation -->
      <div class="hidden md:flex items-center gap-6">
        <a href="/how-it-works" class="font-sans text-sm font-medium text-jm-gray-700 hover:text-jm-purple transition-colors">
          How It Works
        </a>
        <a href="/pricing" class="font-sans text-sm font-medium text-jm-gray-700 hover:text-jm-purple transition-colors">
          Pricing
        </a>
        <a href="/safety" class="font-sans text-sm font-medium text-jm-gray-700 hover:text-jm-purple transition-colors">
          Safety
        </a>
        <a href="/success-stories" class="font-sans text-sm font-medium text-jm-gray-700 hover:text-jm-purple transition-colors">
          Success Stories
        </a>
        <a href="/login" class="font-sans text-sm font-medium text-jm-gray-700 hover:text-jm-purple transition-colors">
          Log In
        </a>
        <a href="/signup" class="bg-gradient-jm hover:bg-gradient-jm-hover text-white font-sans font-semibold px-6 py-2 rounded-lg transition-all duration-200 shadow-sm hover:shadow-md">
          Sign Up
        </a>
      </div>

      <!-- Mobile Menu Button -->
      <button type="button" class="md:hidden p-2 rounded-md text-jm-gray-600 hover:text-jm-purple" aria-label="Toggle menu">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
        </svg>
      </button>
    </div>
  </nav>
</header>
```

**Behavior:**
- Sticky on scroll (stays visible)
- Active state for current page (underline + purple color)
- Mobile: Hamburger menu expands full-screen overlay
- Sign Up button uses primary gradient style

---

### 3.2 Hero Section

**Content:**
- **Headline (H1):** "Find Your Life Partner with Trust-Based Matchmaking"
- **Subheadline:** "Share information gradually, build trust intentionally, and find someone who's as serious about marriage as you are."
- **Primary CTA:** "Get Started" (large button)
- **Secondary CTA:** "See How It Works" (outline button)
- **Hero Image:** Illustration or photo of diverse Nigerian professionals (happy couple, respectful, professional attire)

**HTML Structure:**
```html
<section class="bg-gradient-to-br from-jm-purple-deep/5 via-white to-jm-coral/5 py-16 md:py-24">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
      <!-- Left Column: Text Content -->
      <div class="space-y-8">
        <h1 class="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-jm-gray-900 leading-tight">
          Find Your Life Partner with Trust-Based Matchmaking
        </h1>
        <p class="font-sans text-lg md:text-xl text-jm-gray-700 leading-relaxed">
          Share information gradually, build trust intentionally, and find someone who's as serious about marriage as you are.
        </p>

        <!-- CTAs -->
        <div class="flex flex-col sm:flex-row gap-4">
          <a href="/signup" class="bg-gradient-jm hover:bg-gradient-jm-hover text-white font-sans font-semibold text-lg px-8 py-4 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg text-center">
            Get Started
          </a>
          <a href="/how-it-works" class="border-2 border-jm-purple hover:border-jm-purple-dark text-jm-purple hover:text-jm-purple-dark hover:bg-jm-purple/5 font-sans font-semibold text-lg px-8 py-4 rounded-lg transition-all duration-200 text-center">
            See How It Works
          </a>
        </div>

        <!-- Trust Indicators -->
        <div class="flex flex-wrap items-center gap-6 pt-4 text-sm text-jm-gray-600">
          <div class="flex items-center gap-2">
            <svg class="w-5 h-5 text-jm-success" fill="currentColor" viewBox="0 20 20">
              <path fill-rule="evenodd" d="M2.166 4.999A11.954 11.954 0010 1.944 11.954 11.954 0017.834 5c.11.65.166 1.32.166 2.001 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 00-1.414-1.414L9 10.586 7.707 9.293a1 1 00-1.414 1.414l2 2a1 1 001.414l4-4z" clip-rule="evenodd"/>
            </svg>
            <span>ID Verification</span>
          </div>
          <div class="flex items-center gap-2">
            <svg class="w-5 h-5 text-jm-success" fill="currentColor" viewBox="0 20 20">
              <path fill-rule="evenodd" d="M5 9V7a5 5 0110v2a2 2 012 2v5a2 2 01-2 2H5a2 2 01-2-2v-5a2 2 012-2zm8-2v2H7V7a3 3 016z" clip-rule="evenodd"/>
            </svg>
            <span>Privacy First</span>
          </div>
          <div class="flex items-center gap-2">
            <svg class="w-5 h-5 text-jm-success" fill="currentColor" viewBox="0 20 20">
              <path d="M9 6a3 3 11-6 3 3 016zM17 6a3 3 11-6 3 3 016zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 00-1.5-4.33A5 5 0119 16v1h-6.07zM6 11a5 5 015 5v1H1v-1a5 5 015-5z"/>
            </svg>
            <span>Marriage-Minded</span>
          </div>
        </div>
      </div>

      <!-- Right Column: Hero Image -->
      <div class="hidden lg:block">
        <img src="/images/hero-illustration.svg" alt="Happy couple finding love through JoyMatcher" class="w-full h-auto" />
      </div>
    </div>
  </div>
</section>
```

**Design Notes:**
- Gradient background (subtle purple to coral)
- Hero image should be culturally appropriate (Nigerian context)
- Trust indicators reinforce safety messaging
- Mobile: Single column, image hidden or shown below text

---

### 3.3 Value Propositions Section

**Content:**
3-column feature grid highlighting core differentiators:

1. **Trust-Based Disclosure**
   - Icon: Shield with lock
   - Headline: "Share What You're Comfortable With"
   - Description: "Our tier system lets you control what you share and when. No pressure to reveal everything upfront."

2. **Reciprocal Transparency**
   - Icon: Two-way arrows
   - Headline: "They Share, You Share"
   - Description: "See details only if you've completed the same tier. Fair, balanced, and respectful."

3. **Marriage-Focused Community**
   - Icon: Heart + rings
   - Headline: "Serious About Marriage"
   - Description: "No casual dating. Our members are here for long-term commitment leading to marriage."

**HTML Structure:**
```html
<section class="py-16 md:py-24 bg-white">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="text-center mb-16">
      <h2 class="font-serif text-3xl md:text-4xl font-bold text-jm-gray-900 mb-4">
        Why JoyMatcher is Different
      </h2>
      <p class="font-sans text-lg text-jm-gray-600 max-w-2xl mx-auto">
        We're not a dating app. We're relationship infrastructure built on trust, reciprocity, and verified identity.
      </p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
      <!-- Feature 1 -->
      <div class="bg-jm-gray-50 rounded-xl p-8 text-center space-y-4 hover:shadow-lg transition-shadow duration-200">
        <div class="w-16 h-16 bg-gradient-jm rounded-full flex items-center justify-center mx-auto">
          <svg class="w-8 h-8 text-white" fill="currentColor" viewBox="0 20 20">
            <path fill-rule="evenodd" d="M2.166 4.999A11.954 11.954 0010 1.944 11.954 11.954 0017.834 5c.11.65.166 1.32.166 2.001 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 00-1.414-1.414L9 10.586 7.707 9.293a1 1 00-1.414 1.414l2 2a1 1 001.414l4-4z" clip-rule="evenodd"/>
          </svg>
        </div>
        <h3 class="font-serif text-xl font-semibold text-jm-gray-900">
          Share What You're Comfortable With
        </h3>
        <p class="font-sans text-base text-jm-gray-700 leading-relaxed">
          Our tier system lets you control what you share and when. No pressure to reveal everything upfront.
        </p>
      </div>

      <!-- Feature 2 -->
      <div class="bg-jm-gray-50 rounded-xl p-8 text-center space-y-4 hover:shadow-lg transition-shadow duration-200">
        <div class="w-16 h-16 bg-gradient-jm rounded-full flex items-center justify-center mx-auto">
          <svg class="w-8 h-8 text-white" fill="currentColor" viewBox="0 20 20">
            <path fill-rule="evenodd" d="M12.293 5.293a1 1 011.414l4 4a1 1 010 1.414l-4 4a1 1 01-1.414-1.414L14.586 11H3a1 1 110-2h11.586l-2.293-2.293a1 1 010-1.414z" clip-rule="evenodd"/>
          </svg>
        </div>
        <h3 class="font-serif text-xl font-semibold text-jm-gray-900">
          They Share, You Share
        </h3>
        <p class="font-sans text-base text-jm-gray-700 leading-relaxed">
          See details only if you've completed the same tier. Fair, balanced, and respectful.
        </p>
      </div>

      <!-- Feature 3 -->
      <div class="bg-jm-gray-50 rounded-xl p-8 text-center space-y-4 hover:shadow-lg transition-shadow duration-200">
        <div class="w-16 h-16 bg-gradient-jm rounded-full flex items-center justify-center mx-auto">
          <svg class="w-8 h-8 text-white" fill="currentColor" viewBox="0 20 20">
            <path fill-rule="evenodd" d="M3.172 5.172a4 4 015.656L10 6.343l1.172-1.171a4 4 115.656 5.656L10 17.657l-6.828-6.829a4 4 010-5.656z" clip-rule="evenodd"/>
          </svg>
        </div>
        <h3 class="font-serif text-xl font-semibold text-jm-gray-900">
          Serious About Marriage
        </h3>
        <p class="font-sans text-base text-jm-gray-700 leading-relaxed">
          No casual dating. Our members are here for long-term commitment leading to marriage.
        </p>
      </div>
    </div>
  </div>
</section>
```

---

### 3.4 How It Works Section

**Content:**
Step-by-step explanation of the tier system with visual flow:

**Step 1:** Complete Tier 1 (Identity & Intent)
**Step 2:** Browse matches (see only Tier 1 publicly)
**Step 3:** Show interest & unlock messaging
**Step 4:** Request deeper tiers (2-5) as trust builds
**Step 5:** Both parties control what they share

**HTML Structure:**
```html
<section class="py-16 md:py-24 bg-gradient-to-br from-jm-purple-deep/5 via-white to-jm-coral/5">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="text-center mb-16">
      <h2 class="font-serif text-3xl md:text-4xl font-bold text-jm-gray-900 mb-4">
        How JoyMatcher Works
      </h2>
      <p class="font-sans text-lg text-jm-gray-600 max-w-2xl mx-auto">
        Five tiers of progressive disclosure. Share at your own pace. Build trust before depth.
      </p>
    </div>

    <div class="space-y-12">
      <!-- Step 1 -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div class="space-y-4">
          <span class="inline-block bg-gradient-jm text-white font-bold px-4 py-2 rounded-full text-sm">Step 1</span>
          <h3 class="font-serif text-2xl font-semibold text-jm-gray-900">
            Complete Tier 1: Identity & Intent
          </h3>
          <p class="font-sans text-base text-jm-gray-700 leading-relaxed">
            Share your basic information: name, age, location, faith, and relationship intent. This is public and helps others find you.
          </p>
        </div>
        <div class="bg-white rounded-xl shadow-lg p-6">
          <img src="/images/tier-1-preview.svg" alt="Tier 1 form preview" class="w-full h-auto" />
        </div>
      </div>

      <!-- Step 2 -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div class="space-y-4 md:order-2">
          <span class="inline-block bg-gradient-jm text-white font-bold px-4 py-2 rounded-full text-sm">Step 2</span>
          <h3 class="font-serif text-2xl font-semibold text-jm-gray-900">
            Browse Matches (Tier 1 Only)
          </h3>
          <p class="font-sans text-base text-jm-gray-700 leading-relaxed">
            Discover other users who share your values. You'll only see Tier 1 information initially—respecting everyone's privacy.
          </p>
        </div>
        <div class="bg-white rounded-xl shadow-lg p-6 md:order-1">
          <img src="/images/discover-preview.svg" alt="Discover page preview" class="w-full h-auto" />
        </div>
      </div>

      <!-- Step 3 -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div class="space-y-4">
          <span class="inline-block bg-gradient-jm text-white font-bold px-4 py-2 rounded-full text-sm">Step 3</span>
          <h3 class="font-serif text-2xl font-semibold text-jm-gray-900">
            Show Interest & Unlock Messaging
          </h3>
          <p class="font-sans text-base text-jm-gray-700 leading-relaxed">
            Send a Show Interest request. If accepted, messaging unlocks. No unsolicited messages allowed.
          </p>
        </div>
        <div class="bg-white rounded-xl shadow-lg p-6">
          <img src="/images/show-interest-preview.svg" alt="Show Interest flow" class="w-full h-auto" />
        </div>
      </div>

      <!-- Step 4 -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div class="space-y-4 md:order-2">
          <span class="inline-block bg-gradient-jm text-white font-bold px-4 py-2 rounded-full text-sm">Step 4</span>
          <h3 class="font-serif text-2xl font-semibold text-jm-gray-900">
            Request Deeper Tiers (2-5)
          </h3>
          <p class="font-sans text-base text-jm-gray-700 leading-relaxed">
            As trust builds, request access to lifestyle, family, health, or verified identity information. Both parties must agree.
          </p>
        </div>
        <div class="bg-white rounded-xl shadow-lg p-6 md:order-1">
          <img src="/images/request-details-preview.svg" alt="Request details modal" class="w-full h-auto" />
        </div>
      </div>

      <!-- Step 5 -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div class="space-y-4">
          <span class="inline-block bg-gradient-jm text-white font-bold px-4 py-2 rounded-full text-sm">Step 5</span>
          <h3 class="font-serif text-2xl font-semibold text-jm-gray-900">
            You Control What You Share
          </h3>
          <p class="font-sans text-base text-jm-gray-700 leading-relaxed">
            You can revoke access at any time. Your privacy is always in your hands.
          </p>
        </div>
        <div class="bg-white rounded-xl shadow-lg p-6">
          <img src="/images/privacy-controls-preview.svg" alt="Privacy controls dashboard" class="w-full h-auto" />
        </div>
      </div>
    </div>

    <!-- CTA -->
    <div class="text-center mt-16">
      <a href="/how-it-works" class="inline-block border-2 border-jm-purple hover:border-jm-purple-dark text-jm-purple hover:text-jm-purple-dark hover:bg-jm-purple/5 font-sans font-semibold px-8 py-3 rounded-lg transition-all duration-200">
        Learn More About Tiers
      </a>
    </div>
  </div>
</section>
```

---

### 3.5 Testimonials Section

**Content:**
3 success stories carousel (auto-rotating or manual navigation):

**Testimonial 1:** Chidinma & Kwame (Lagos)
"We connected over shared values on Tier 3. By Tier 4, we knew we were compatible for marriage. Engaged after 8 months!"

**Testimonial 2:** Dr. Amara & Emmanuel (Diaspora Match)
"The VIP concierge service saved me time. My matchmaker understood exactly what I needed. Found my husband in 6 months."

**Testimonial 3:** Folake & Chidi (Cross-Border)
"From Toronto to Lagos—JoyMatcher helped us navigate the distance. The tier system built trust before we even met."

**HTML Structure:**
```html
<section class="py-16 md:py-24 bg-white">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="text-center mb-16">
      <h2 class="font-serif text-3xl md:text-4xl font-bold text-jm-gray-900 mb-4">
        Success Stories
      </h2>
      <p class="font-sans text-lg text-jm-gray-600 max-w-2xl mx-auto">
        Real couples who found love and marriage through JoyMatcher.
      </p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
      <!-- Testimonial 1 -->
      <div class="bg-jm-gray-50 rounded-xl p-8 space-y-4">
        <div class="flex items-center gap-4">
          <div class="flex -space-x-4">
            <img src="/images/testimonials/couple-1a.jpg" alt="Chidinma" class="w-12 h-12 rounded-full border-2 border-white" />
            <img src="/images/testimonials/couple-1b.jpg" alt="Kwame" class="w-12 h-12 rounded-full border-2 border-white" />
          </div>
          <div>
            <h4 class="font-serif text-lg font-semibold text-jm-gray-900">Chidinma & Kwame</h4>
            <p class="font-sans text-sm text-jm-gray-600">Lagos, Nigeria</p>
          </div>
        </div>
        <p class="font-sans text-base text-jm-gray-700 leading-relaxed italic">
          "We connected over shared values on Tier 3. By Tier 4, we knew we were compatible for marriage. Engaged after 8 months!"
        </p>
        <div class="flex items-center gap-2 text-sm text-jm-success font-medium">
          <svg class="w-5 h-5" fill="currentColor" viewBox="0 20 20">
            <path fill-rule="evenodd" d="M10 18a8 8 100-16 8 8 000 16zm3.707-9.293a1 1 00-1.414-1.414L9 10.586 7.707 9.293a1 1 00-1.414 1.414l2 2a1 1 001.414l4-4z" clip-rule="evenodd"/>
          </svg>
          Engaged February 2026
        </div>
      </div>

      <!-- Testimonial 2 -->
      <div class="bg-jm-gray-50 rounded-xl p-8 space-y-4">
        <div class="flex items-center gap-4">
          <div class="flex -space-x-4">
            <img src="/images/testimonials/couple-2a.jpg" alt="Dr. Amara" class="w-12 h-12 rounded-full border-2 border-white" />
            <img src="/images/testimonials/couple-2b.jpg" alt="Emmanuel" class="w-12 h-12 rounded-full border-2 border-white" />
          </div>
          <div>
            <h4 class="font-serif text-lg font-semibold text-jm-gray-900">Dr. Amara & Emmanuel</h4>
            <p class="font-sans text-sm text-jm-gray-600">VIP Members</p>
          </div>
        </div>
        <p class="font-sans text-base text-jm-gray-700 leading-relaxed italic">
          "The VIP concierge service saved me time. My matchmaker understood exactly what I needed. Found my husband in 6 months."
        </p>
        <div class="flex items-center gap-2 text-sm text-jm-success font-medium">
          <svg class="w-5 h-5" fill="currentColor" viewBox="0 20 20">
            <path fill-rule="evenodd" d="M10 18a8 8 100-16 8 8 000 16zm3.707-9.293a1 1 00-1.414-1.414L9 10.586 7.707 9.293a1 1 00-1.414 1.414l2 2a1 1 001.414l4-4z" clip-rule="evenodd"/>
          </svg>
          Married December 2025
        </div>
      </div>

      <!-- Testimonial 3 -->
      <div class="bg-jm-gray-50 rounded-xl p-8 space-y-4">
        <div class="flex items-center gap-4">
          <div class="flex -space-x-4">
            <img src="/images/testimonials/couple-3a.jpg" alt="Folake" class="w-12 h-12 rounded-full border-2 border-white" />
            <img src="/images/testimonials/couple-3b.jpg" alt="Chidi" class="w-12 h-12 rounded-full border-2 border-white" />
          </div>
          <div>
            <h4 class="font-serif text-lg font-semibold text-jm-gray-900">Folake & Chidi</h4>
            <p class="font-sans text-sm text-jm-gray-600">Toronto → Lagos</p>
          </div>
        </div>
        <p class="font-sans text-base text-jm-gray-700 leading-relaxed italic">
          "From Toronto to Lagos—JoyMatcher helped us navigate the distance. The tier system built trust before we even met."
        </p>
        <div class="flex items-center gap-2 text-sm text-jm-success font-medium">
          <svg class="w-5 h-5" fill="currentColor" viewBox="0 20 20">
            <path fill-rule="evenodd" d="M10 18a8 8 100-16 8 8 000 16zm3.707-9.293a1 1 00-1.414-1.414L9 10.586 7.707 9.293a1 1 00-1.414 1.414l2 2a1 1 001.414l4-4z" clip-rule="evenodd"/>
          </svg>
          Engaged January 2026
        </div>
      </div>
    </div>

    <!-- View All Link -->
    <div class="text-center mt-12">
      <a href="/success-stories" class="inline-block text-jm-purple hover:text-jm-purple-dark font-sans font-medium text-base underline">
        View All Success Stories
      </a>
    </div>
  </div>
</section>
```

---

### 3.6 Pricing Teaser Section

**Content:**
Simplified comparison table: Free, Premium, VIP

**HTML Structure:**
```html
<section class="py-16 md:py-24 bg-jm-gray-50">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="text-center mb-16">
      <h2 class="font-serif text-3xl md:text-4xl font-bold text-jm-gray-900 mb-4">
        Choose Your Path
      </h2>
      <p class="font-sans text-lg text-jm-gray-600 max-w-2xl mx-auto">
        Start free. Upgrade when you're ready for deeper connections.
      </p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
      <!-- Free Tier -->
      <div class="bg-white rounded-xl shadow-sm border border-jm-gray-200 p-8 space-y-6">
        <div>
          <h3 class="font-serif text-2xl font-semibold text-jm-gray-900 mb-2">Free</h3>
          <p class="font-sans text-4xl font-bold text-jm-gray-900">₦0</p>
          <p class="font-sans text-sm text-jm-gray-600">Forever free</p>
        </div>
        <ul class="space-y-3">
          <li class="flex items-start gap-2 text-sm text-jm-gray-700">
            <svg class="w-5 h-5 text-jm-success flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 20 20">
              <path fill-rule="evenodd" d="M10 18a8 8 100-16 8 8 000 16zm3.707-9.293a1 1 00-1.414-1.414L9 10.586 7.707 9.293a1 1 00-1.414 1.414l2 2a1 1 001.414l4-4z" clip-rule="evenodd"/>
            </svg>
            Complete Tier 1 & 2
          </li>
          <li class="flex items-start gap-2 text-sm text-jm-gray-700">
            <svg class="w-5 h-5 text-jm-success flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 20 20">
              <path fill-rule="evenodd" d="M10 18a8 8 100-16 8 8 000 16zm3.707-9.293a1 1 00-1.414-1.414L9 10.586 7.707 9.293a1 1 00-1.414 1.414l2 2a1 1 001.414l4-4z" clip-rule="evenodd"/>
            </svg>
            Browse other Free users
          </li>
          <li class="flex items-start gap-2 text-sm text-jm-gray-700">
            <svg class="w-5 h-5 text-jm-success flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 20 20">
              <path fill-rule="evenodd" d="M10 18a8 8 100-16 8 8 000 16zm3.707-9.293a1 1 00-1.414-1.414L9 10.586 7.707 9.293a1 1 00-1.414 1.414l2 2a1 1 001.414l4-4z" clip-rule="evenodd"/>
            </svg>
            Send Show Interest
          </li>
          <li class="flex items-start gap-2 text-sm text-jm-gray-700">
            <svg class="w-5 h-5 text-jm-success flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 20 20">
              <path fill-rule="evenodd" d="M10 18a8 8 100-16 8 8 000 16zm3.707-9.293a1 1 00-1.414-1.414L9 10.586 7.707 9.293a1 1 00-1.414 1.414l2 2a1 1 001.414l4-4z" clip-rule="evenodd"/>
            </svg>
            Unlimited messaging
          </li>
        </ul>
        <a href="/signup" class="block w-full border-2 border-jm-purple hover:border-jm-purple-dark text-jm-purple hover:text-jm-purple-dark hover:bg-jm-purple/5 font-sans font-semibold px-6 py-3 rounded-lg transition-all duration-200 text-center">
          Get Started
        </a>
      </div>

      <!-- Premium Tier -->
      <div class="bg-gradient-jm rounded-xl shadow-lg p-8 space-y-6 relative transform md:scale-105">
        <div class="absolute top-0 right-0 bg-jm-coral text-white text-xs font-semibold px-3 py-1 rounded-bl-lg rounded-tr-xl">
          Most Popular
        </div>
        <div>
          <h3 class="font-serif text-2xl font-semibold text-white mb-2">Premium</h3>
          <p class="font-sans text-4xl font-bold text-white">₦18,000</p>
          <p class="font-sans text-sm text-white/80">per month</p>
        </div>
        <ul class="space-y-3">
          <li class="flex items-start gap-2 text-sm text-white">
            <svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 20 20">
              <path fill-rule="evenodd" d="M10 18a8 8 100-16 8 8 000 16zm3.707-9.293a1 1 00-1.414-1.414L9 10.586 7.707 9.293a1 1 00-1.414 1.414l2 2a1 1 001.414l4-4z" clip-rule="evenodd"/>
            </svg>
            Everything in Free
          </li>
          <li class="flex items-start gap-2 text-sm text-white">
            <svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 20 20">
              <path fill-rule="evenodd" d="M10 18a8 8 100-16 8 8 000 16zm3.707-9.293a1 1 00-1.414-1.414L9 10.586 7.707 9.293a1 1 00-1.414 1.414l2 2a1 1 001.414l4-4z" clip-rule="evenodd"/>
            </svg>
            Complete Tier 3 & 4
          </li>
          <li class="flex items-start gap-2 text-sm text-white">
            <svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 20 20">
              <path fill-rule="evenodd" d="M10 18a8 8 100-16 8 8 000 16zm3.707-9.293a1 1 00-1.414-1.414L9 10.586 7.707 9.293a1 1 00-1.414 1.414l2 2a1 1 001.414l4-4z" clip-rule="evenodd"/>
            </svg>
            Request deeper details
          </li>
          <li class="flex items-start gap-2 text-sm text-white">
            <svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 20 20">
              <path fill-rule="evenodd" d="M10 18a8 8 100-16 8 8 000 16zm3.707-9.293a1 1 00-1.414-1.414L9 10.586 7.707 9.293a1 1 00-1.414 1.414l2 2a1 1 001.414l4-4z" clip-rule="evenodd"/>
            </svg>
            Show Interest to Premium users
          </li>
        </ul>
        <a href="/signup" class="block w-full bg-white hover:bg-jm-gray-100 text-jm-purple font-sans font-semibold px-6 py-3 rounded-lg transition-all duration-200 text-center shadow-md">
          Start Premium
        </a>
      </div>

      <!-- VIP Tier -->
      <div class="bg-white rounded-xl shadow-sm border border-jm-gray-200 p-8 space-y-6">
        <div>
          <h3 class="font-serif text-2xl font-semibold text-jm-gray-900 mb-2">VIP</h3>
          <p class="font-sans text-4xl font-bold text-jm-gray-900">₦200,000+</p>
          <p class="font-sans text-sm text-jm-gray-600">per month</p>
        </div>
        <ul class="space-y-3">
          <li class="flex items-start gap-2 text-sm text-jm-gray-700">
            <svg class="w-5 h-5 text-jm-success flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 20 20">
              <path fill-rule="evenodd" d="M10 18a8 8 100-16 8 8 000 16zm3.707-9.293a1 1 00-1.414-1.414L9 10.586 7.707 9.293a1 1 00-1.414 1.414l2 2a1 1 001.414l4-4z" clip-rule="evenodd"/>
            </svg>
            Everything in Premium
          </li>
          <li class="flex items-start gap-2 text-sm text-jm-gray-700">
            <svg class="w-5 h-5 text-jm-success flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 20 20">
              <path fill-rule="evenodd" d="M10 18a8 8 100-16 8 8 000 16zm3.707-9.293a1 1 00-1.414-1.414L9 10.586 7.707 9.293a1 1 00-1.414 1.414l2 2a1 1 001.414l4-4z" clip-rule="evenodd"/>
            </svg>
            Complete Tier 5 (KYC verified)
          </li>
          <li class="flex items-start gap-2 text-sm text-jm-gray-700">
            <svg class="w-5 h-5 text-jm-success flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 20 20">
              <path fill-rule="evenodd" d="M10 18a8 8 100-16 8 8 000 16zm3.707-9.293a1 1 00-1.414-1.414L9 10.586 7.707 9.293a1 1 00-1.414 1.414l2 2a1 1 001.414l4-4z" clip-rule="evenodd"/>
            </svg>
            Personal matchmaker
          </li>
          <li class="flex items-start gap-2 text-sm text-jm-gray-700">
            <svg class="w-5 h-5 text-jm-success flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 20 20">
              <path fill-rule="evenodd" d="M10 18a8 8 100-16 8 8 000 16zm3.707-9.293a1 1 00-1.414-1.414L9 10.586 7.707 9.293a1 1 00-1.414 1.414l2 2a1 1 001.414l4-4z" clip-rule="evenodd"/>
            </svg>
            Curated introductions
          </li>
        </ul>
        <a href="/pricing" class="block w-full border-2 border-jm-purple hover:border-jm-purple-dark text-jm-purple hover:text-jm-purple-dark hover:bg-jm-purple/5 font-sans font-semibold px-6 py-3 rounded-lg transition-all duration-200 text-center">
          Learn More
        </a>
      </div>
    </div>

    <!-- Full Pricing Link -->
    <div class="text-center mt-12">
      <a href="/pricing" class="inline-block text-jm-purple hover:text-jm-purple-dark font-sans font-medium text-base underline">
        View Full Pricing Details
      </a>
    </div>
  </div>
</section>
```

---

### 3.7 Trust & Safety Section

**Content:**
- ID Verification badge
- Privacy-first badge
- GDPR/NDPR compliant badge

**HTML Structure:**
```html
<section class="py-16 md:py-24 bg-white">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="text-center mb-12">
      <h2 class="font-serif text-3xl md:text-4xl font-bold text-jm-gray-900 mb-4">
        Your Safety is Our Priority
      </h2>
      <p class="font-sans text-lg text-jm-gray-600 max-w-2xl mx-auto">
        We take privacy, verification, and data protection seriously.
      </p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
      <div class="text-center space-y-3">
        <div class="w-16 h-16 bg-jm-success/10 rounded-full flex items-center justify-center mx-auto">
          <svg class="w-8 h-8 text-jm-success" fill="currentColor" viewBox="0 20 20">
            <path fill-rule="evenodd" d="M6.267 3.455a3.066 3.066 001.745-.723 3.066 3.066 013.976 3.066 3.066 001.745.723 3.066 3.066 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 010 3.976 3.066 3.066 00-.723 1.745 3.066 3.066 01-2.812 2.812 3.066 3.066 00-1.745.723 3.066 3.066 01-3.976 3.066 3.066 00-1.745-.723 3.066 3.066 01-2.812-2.812 3.066 3.066 00-.723-1.745 3.066 3.066 010-3.976 3.066 3.066 00.723-1.745 3.066 3.066 012.812-2.812zm7.44 5.252a1 1 00-1.414-1.414L9 10.586 7.707 9.293a1 1 00-1.414 1.414l2 2a1 1 001.414l4-4z" clip-rule="evenodd"/>
          </svg>
        </div>
        <h3 class="font-serif text-lg font-semibold text-jm-gray-900">ID Verification</h3>
        <p class="font-sans text-sm text-jm-gray-600">
          VIP members complete government ID verification and live video checks.
        </p>
      </div>

      <div class="text-center space-y-3">
        <div class="w-16 h-16 bg-jm-success/10 rounded-full flex items-center justify-center mx-auto">
          <svg class="w-8 h-8 text-jm-success" fill="currentColor" viewBox="0 20 20">
            <path fill-rule="evenodd" d="M5 9V7a5 5 0110v2a2 2 012 2v5a2 2 01-2 2H5a2 2 01-2-2v-5a2 2 012-2zm8-2v2H7V7a3 3 016z" clip-rule="evenodd"/>
          </svg>
        </div>
        <h3 class="font-serif text-lg font-semibold text-jm-gray-900">Privacy First</h3>
        <p class="font-sans text-sm text-jm-gray-600">
          You control what you share and with whom. Revoke access anytime.
        </p>
      </div>

      <div class="text-center space-y-3">
        <div class="w-16 h-16 bg-jm-success/10 rounded-full flex items-center justify-center mx-auto">
          <svg class="w-8 h-8 text-jm-success" fill="currentColor" viewBox="0 20 20">
            <path fill-rule="evenodd" d="M2.166 4.999A11.954 11.954 0010 1.944 11.954 11.954 0017.834 5c.11.65.166 1.32.166 2.001 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 00-1.414-1.414L9 10.586 7.707 9.293a1 1 00-1.414 1.414l2 2a1 1 001.414l4-4z" clip-rule="evenodd"/>
          </svg>
        </div>
        <h3 class="font-serif text-lg font-semibold text-jm-gray-900">GDPR/NDPR Compliant</h3>
        <p class="font-sans text-sm text-jm-gray-600">
          Full compliance with Nigerian and European data protection laws.
        </p>
      </div>
    </div>

    <div class="text-center mt-12">
      <a href="/safety" class="inline-block text-jm-purple hover:text-jm-purple-dark font-sans font-medium text-base underline">
        Learn More About Safety
      </a>
    </div>
  </div>
</section>
```

---

### 3.8 Final CTA Section

**Content:**
Large, centered CTA encouraging signup

**HTML Structure:**
```html
<section class="py-16 md:py-24 bg-gradient-to-br from-jm-purple-deep via-jm-purple to-jm-coral text-white">
  <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
    <h2 class="font-serif text-3xl md:text-5xl font-bold leading-tight">
      Ready to Find Your Life Partner?
    </h2>
    <p class="font-sans text-lg md:text-xl opacity-90 max-w-2xl mx-auto">
      Join thousands of marriage-minded professionals who trust JoyMatcher to find meaningful, lasting relationships.
    </p>
    <div class="flex flex-col sm:flex-row gap-4 justify-center">
      <a href="/signup" class="bg-white hover:bg-jm-gray-100 text-jm-purple font-sans font-semibold text-lg px-10 py-4 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl text-center">
        Create Free Account
      </a>
      <a href="/how-it-works" class="border-2 border-white hover:bg-white/10 text-white font-sans font-semibold text-lg px-10 py-4 rounded-lg transition-all duration-200 text-center">
        Learn More
      </a>
    </div>
  </div>
</section>
```

---

### 3.9 Footer

(Use standard footer from HTML Implementation Guide)

---

## 4. User Interactions & Flows

### 4.1 Navigation Interactions

**Scroll Behavior:**
- Sticky header remains visible on scroll
- "Get Started" button remains accessible via sticky nav

**Link Clicks:**
- "How It Works" → `/how-it-works`
- "Pricing" → `/pricing`
- "Safety" → `/safety`
- "Success Stories" → `/success-stories`
- "Log In" → `/login`
- "Sign Up" → `/signup`

**Mobile Menu:**
- Hamburger icon toggles full-screen overlay
- Close button (X) dismisses overlay
- Links auto-close overlay on click

---

### 4.2 Hero Section Interactions

**CTA Buttons:**
- "Get Started" (primary) → `/signup` (direct signup)
- "See How It Works" (secondary) → `/how-it-works` (educational content)

**Trust Indicators:**
- Hoverable tooltips on each badge (optional)
- "ID Verification" → "VIP members complete government ID checks"
- "Privacy First" → "You control all data sharing"
- "Marriage-Minded" → "No casual dating allowed"

---

### 4.3 Testimonials Interactions

**Carousel Controls:**
- Auto-rotate every 5 seconds (optional)
- Manual navigation: Left/Right arrows
- Dot indicators for current slide
- Pause on hover

**Read More:**
- "View All Success Stories" → `/success-stories`

---

### 4.4 Pricing Teaser Interactions

**Card Hover:**
- Subtle shadow lift on hover
- Premium card already elevated (scale-105)

**CTA Buttons:**
- Free "Get Started" → `/signup`
- Premium "Start Premium" → `/signup` (with premium pre-selected)
- VIP "Learn More" → `/pricing` (VIP section)

---

## 5. EDT/Tier Logic

**Not Applicable** (Public page, no authentication required)

---

## 6. Accessibility Requirements

### WCAG 2.1 AA Compliance

**Keyboard Navigation:**
- All links and buttons accessible via Tab key
- Skip-to-content link for screen readers
- Focus indicators visible (2px outline)

**Color Contrast:**
- Text on white: 4.5:1 minimum (WCAG AA)
- Text on gradient: 4.5:1 minimum (white text on dark gradient)
- Link colors meet contrast requirements

**Semantic HTML:**
- H1 only once (hero headline)
- Proper heading hierarchy (H1 → H2 → H3)
- `<nav>`, `<main>`, `<section>`, `<footer>` landmarks

**ARIA Labels:**
- Navigation: `aria-label="Main navigation"`
- Carousel: `aria-label="Success stories"`, `aria-live="polite"`
- Buttons: `aria-label` where text is ambiguous

**Alt Text:**
- All images have descriptive alt text
- Decorative images: `alt=""` (empty)

**Form Labels:**
- Not applicable (no forms on homepage)

---

## 7. Mobile Responsive Behavior

### Breakpoints

**Mobile (320px-767px):**
- Single column layout
- Hero: Text-only (image hidden or below)
- Value props: Stacked cards
- How It Works: Single column, images below text
- Testimonials: Horizontal scroll or stacked
- Pricing: Stacked cards
- Footer: Stacked links

**Tablet (768px-1023px):**
- 2-column grid for value props, testimonials, pricing
- Hero: 2 columns (text + image)
- How It Works: 2 columns (alternating text/image sides)

**Desktop (≥1024px):**
- Full 3-column grids
- Hero: 2 columns (60/40 text/image)
- How It Works: Full alternating layout

### Mobile-Specific Enhancements

**Sticky CTA:**
- On mobile, "Sign Up" button sticks to bottom of viewport after scroll past hero
- Fixed position, full-width, shadow

**Touch Targets:**
- Minimum 44x44px for all interactive elements
- Increased padding on mobile buttons

**Text Sizes:**
- H1: 2rem (mobile) → 3rem (desktop)
- Body: 1rem (mobile) → 1.125rem (desktop)

---

## 8. State Management

### Global State (JavaScript)

```javascript
const homePageState = {
  isMenuOpen: false,           // Mobile menu toggle
  currentTestimonial: 0,       // Testimonial carousel index
  userCountry: "NG",           // Currency detection (₦ vs $)
  scrollPosition: 0            // Track scroll for sticky CTA
};
```

### State Updates

**Menu Toggle:**
```javascript
function toggleMobileMenu() {
  homePageState.isMenuOpen = !homePageState.isMenuOpen;
  // Update DOM: show/hide mobile menu overlay
}
```

**Testimonial Carousel:**
```javascript
function nextTestimonial() {
  homePageState.currentTestimonial = (homePageState.currentTestimonial + 1) % 3;
  // Update DOM: fade transition to next slide
}
```

**Currency Detection:**
```javascript
// Detect user's country via IP or browser locale
if (userCountry === "NG") {
  // Show ₦ pricing
} else {
  // Show $ pricing
}
```

**Sticky CTA (Mobile):**
```javascript
window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  if (scrollY > 800 && window.innerWidth < 768) {
    // Show sticky "Sign Up" button at bottom
  }
});
```

---

## 9. Error Handling

### External Resource Failures

**Image Load Failures:**
- Fallback to placeholder image or background color
- Alt text displayed for screen readers

**Font Load Failures:**
- System font stack fallback (serif: Georgia, sans: Arial)

**JavaScript Failures:**
- Progressive enhancement: Page still functional without JS
- Carousel: Static display of all testimonials (no auto-rotate)
- Mobile menu: Graceful degradation (show all links inline)

---

## 10. Success States

### Page Load Success

**Performance Targets:**
- First Contentful Paint (FCP): <1.8s
- Largest Contentful Paint (LCP): <2.5s
- Time to Interactive (TTI): <3.5s

**Visual Indicators:**
- Hero section loads first (above-the-fold content)
- Images lazy-load below fold
- Smooth fade-in animations for sections (optional)

### User Actions

**CTA Click Success:**
- Immediate visual feedback (button press state)
- Page transition to `/signup` or `/how-it-works`

**Scroll Engagement:**
- Sections fade in as user scrolls (scroll-triggered animations)
- Progress indicator (optional): Shows % of page read

---

## 11. HTML/Tailwind Examples

(All HTML examples provided in Component Breakdown section above)

---

## 12. Analytics & Tracking

### Events to Track

**Page View:**
- `homepage_viewed`
- Track: User country, device type, referrer

**CTA Clicks:**
- `hero_cta_clicked` (button: "Get Started" | "See How It Works")
- `pricing_cta_clicked` (tier: "Free" | "Premium" | "VIP")
- `final_cta_clicked` (button: "Create Free Account" | "Learn More")

**Section Engagement:**
- `section_viewed` (section: "hero" | "value_props" | "how_it_works" | "testimonials" | "pricing")
- Trigger: When section enters viewport (Intersection Observer)

**Navigation Clicks:**
- `nav_link_clicked` (link: "How It Works" | "Pricing" | "Safety" | "Success Stories" | "Log In" | "Sign Up")

**Testimonial Interactions:**
- `testimonial_viewed` (testimonial_id: 1 | 2 | 3)
- `view_all_testimonials_clicked`

**Scroll Depth:**
- Track: 25%, 50%, 75%, 100% scroll depth

---

## 13. SEO Optimization

### Meta Tags

```html
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">

  <!-- Primary Meta Tags -->
  <title>JoyMatcher — Trust-Based Matchmaking for Marriage-Minded Professionals</title>
  <meta name="title" content="JoyMatcher — Trust-Based Matchmaking for Marriage-Minded Professionals">
  <meta name="description" content="Find your life partner with JoyMatcher's progressive tier system. Share information gradually, build trust intentionally, and connect with serious marriage-minded professionals in Nigeria and the diaspora.">
  <meta name="keywords" content="marriage matchmaking Nigeria, serious dating Nigeria, verified matchmaking, Nigerian diaspora dating, KYC verified dating, trust-based matchmaking">

  <!-- Open Graph / Facebook -->
  <meta property="og:type" content="website">
  <meta property="og:url" content="https://joymatcher.com/">
  <meta property="og:title" content="JoyMatcher — Trust-Based Matchmaking for Marriage-Minded Professionals">
  <meta property="og:description" content="Find your life partner with JoyMatcher's progressive tier system. Share information gradually, build trust intentionally.">
  <meta property="og:image" content="https://joymatcher.com/images/og-image.jpg">

  <!-- Twitter -->
  <meta property="twitter:card" content="summary_large_image">
  <meta property="twitter:url" content="https://joymatcher.com/">
  <meta property="twitter:title" content="JoyMatcher — Trust-Based Matchmaking for Marriage-Minded Professionals">
  <meta property="twitter:description" content="Find your life partner with JoyMatcher's progressive tier system. Share information gradually, build trust intentionally.">
  <meta property="twitter:image" content="https://joymatcher.com/images/twitter-image.jpg">

  <!-- Canonical URL -->
  <link rel="canonical" href="https://joymatcher.com/">

  <!-- Favicon -->
  <link rel="icon" type="image/png" href="/images/favicon.png">

  <!-- Schema.org Markup -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "JoyMatcher",
    "url": "https://joymatcher.com",
    "description": "Trust-based matchmaking platform for marriage-minded professionals",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://joymatcher.com/search?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  }
  </script>
</head>
```

### Structured Data

**Organization Schema:**
```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "JoyMatcher",
  "url": "https://joymatcher.com",
  "logo": "https://joymatcher.com/images/logo.png",
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+234-XXX-XXX-XXXX",
    "contactType": "Customer Support",
    "email": "support@joymatcher.com"
  },
  "sameAs": [
    "https://twitter.com/joymatcher",
    "https://instagram.com/joymatcher"
  ]
}
```

---

## 14. Performance Optimization

### Image Optimization

**Formats:**
- WebP with PNG/JPG fallback
- SVG for icons and illustrations
- Lazy loading for below-fold images

**Compression:**
- Hero image: <200KB (1920x1080)
- Profile images: <50KB (600x800)
- Icons: SVG or optimized PNG

**Responsive Images:**
```html
<picture>
  <source srcset="/images/hero-large.webp" type="image/webp" media="(min-width: 1024px)">
  <source srcset="/images/hero-medium.webp" type="image/webp" media="(min-width: 768px)">
  <source srcset="/images/hero-small.webp" type="image/webp">
  <img src="/images/hero-large.jpg" alt="Hero image" loading="lazy">
</picture>
```

### CSS Optimization

**Critical CSS:**
- Inline above-the-fold styles in `<head>`
- Defer non-critical CSS

**Tailwind Purging:**
- Remove unused utility classes in production build
- Expected CSS size: <50KB (gzipped)

### JavaScript Optimization

**Code Splitting:**
- Load carousel JS only if testimonials section visible
- Defer analytics scripts

**Minification:**
- Minify all JS and CSS
- Use Brotli compression

---

## 15. Related Documentation

- [How It Works Spec](how_it_works_spec.md) - Detailed tier system explanation
- [Pricing Spec](pricing_spec.md) - Full pricing comparison
- [Signup Spec](signup_spec.md) - User registration flow
- [Design System](../../Design%20System/design_system.md) - Brand guidelines
- [HTML Implementation Guide](../../Design%20System/html_implementation_guide.md) - Component patterns

---

**Document Owner:** Product Lead & Design Lead
**Last Updated:** 2026-02-27
**Status:** Complete — Ready for Implementation
**Estimated Development Time:** 40-60 hours
