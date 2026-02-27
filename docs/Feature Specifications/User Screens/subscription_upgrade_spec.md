# Subscription Upgrade Feature Specification

**Version:** 1.0.0
**Last Updated:** 2026-02-27
**Status:** Complete
**Page Route:** `/app/subscription/upgrade`
**Access Level:** Authenticated users only

---

## 1. Page Purpose & User Goals

### Primary Purpose
The Subscription Upgrade flow converts Free users to Premium and Premium users to VIP through a clear, transparent, and value-driven upgrade experience. It handles payment collection, subscription management, tier ceiling updates, and ensures users understand the benefits they're unlocking.

### User Goals
- **Understand upgrade benefits:** See exactly what they'll unlock
- **Compare pricing options:** Monthly vs quarterly (Premium only)
- **Complete payment securely:** Trusted payment gateway (Paystack/Stripe)
- **Activate subscription immediately:** Instant access to unlocked features
- **Manage existing subscription:** View current plan, renewal dates, cancellation
- **Understand tier ceilings:** Know which tiers they can now complete

### Success Metrics
- Conversion rate: 15-25% of Free users → Premium within 30 days
- VIP application rate: 5-10% of Premium users within 60 days
- Payment success rate: >95%
- Subscription retention: >70% after 3 months (Premium)
- User satisfaction: <5% churn due to pricing confusion

---

## 2. Layout & Wireframe Description

### Overall Structure
```
┌─────────────────────────────────────────────────────────────┐
│                    Navigation Header                         │
├─────────────────────────────────────────────────────────────┤
│                    Page Title & Current Plan                 │
│  "Upgrade Your Membership"                                   │
│  "Current: Free • Tier Ceiling: 2"                          │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│                    Pricing Comparison Table                  │
│  [Free] [Premium - Highlighted] [VIP]                       │
│                                                              │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│                    Payment Form (if upgrading)               │
│  - Plan selection (Monthly/Quarterly for Premium)           │
│  - Payment method (Card/Bank Transfer)                       │
│  - Billing information                                       │
│  - Terms acceptance                                          │
│  - Submit button                                             │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

### Viewport Considerations
- **Desktop (≥1024px):** Side-by-side pricing cards, payment form in modal or dedicated section
- **Tablet (768px-1023px):** Stacked pricing cards, full-width payment form
- **Mobile (320px-767px):** Single column, sticky CTA, mobile-optimized payment form

---

## 3. Component Breakdown

### 3.1 Page Header & Current Plan Summary

**Content:**
- Page title: "Upgrade Your Membership"
- Current subscription badge
- Current tier ceiling
- Renewal date (if Premium/VIP)
- Cancellation status (if applicable)

**HTML Structure:**
```html
<!-- Page Header & Current Plan -->
<div class="bg-white border-b border-jm-gray-200 px-4 sm:px-6 lg:px-8 py-6">
  <div class="max-w-7xl mx-auto">
    <div class="flex items-center justify-between flex-wrap gap-4">
      <!-- Title & Current Plan -->
      <div>
        <h1 class="font-serif text-3xl md:text-4xl font-bold text-jm-gray-900 mb-2">
          Upgrade Your Membership
        </h1>
        <div class="flex items-center gap-3 flex-wrap">
          <!-- Current Plan Badge -->
          <span class="inline-flex items-center gap-1 bg-jm-gray-100 text-jm-gray-700 px-3 py-1 rounded-md text-sm font-medium">
            Current: Free
          </span>
          <!-- Tier Ceiling Badge -->
          <span class="inline-flex items-center gap-1 bg-jm-purple/10 text-jm-purple px-3 py-1 rounded-md text-sm font-medium">
            Tier Ceiling: 2
          </span>
        </div>
      </div>

      <!-- Manage Subscription Link (if Premium/VIP) -->
      <a
        href="/app/subscription/manage"
        class="
          border-2 border-jm-purple hover:border-jm-purple-dark
          text-jm-purple hover:text-jm-purple-dark hover:bg-jm-purple/5
          font-sans font-medium text-sm
          px-4 py-2 rounded-lg
          transition-all duration-200
          focus:outline-none focus:ring-2 focus:ring-jm-purple focus:ring-offset-2
        "
      >
        Manage Subscription
      </a>
    </div>
  </div>
</div>
```

---

### 3.2 Pricing Comparison Table

**Content:**
- Three pricing tiers: Free, Premium, VIP
- Feature comparison (checkmarks and X marks)
- Monthly and quarterly pricing (Premium)
- VIP application note
- Upgrade CTAs

**HTML Structure:**
```html
<!-- Pricing Comparison Table -->
<section class="py-16 md:py-24 bg-jm-gray-50">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="text-center mb-12">
      <h2 class="font-serif text-3xl md:text-4xl font-bold text-jm-gray-900 mb-4">
        Choose Your Plan
      </h2>
      <p class="font-sans text-lg text-jm-gray-600 max-w-2xl mx-auto">
        Upgrade to unlock deeper compatibility insights and premium features.
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

        <!-- Features -->
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
            Browse Free users
          </li>
          <li class="flex items-start gap-2 text-sm text-jm-gray-700">
            <svg class="w-5 h-5 text-jm-success flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 20 20">
              <path fill-rule="evenodd" d="M10 18a8 8 100-16 8 8 000 16zm3.707-9.293a1 1 00-1.414-1.414L9 10.586 7.707 9.293a1 1 00-1.414 1.414l2 2a1 1 001.414l4-4z" clip-rule="evenodd"/>
            </svg>
            Send Show Interest to Free users
          </li>
          <li class="flex items-start gap-2 text-sm text-jm-gray-700">
            <svg class="w-5 h-5 text-jm-success flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 20 20">
              <path fill-rule="evenodd" d="M10 18a8 8 100-16 8 8 000 16zm3.707-9.293a1 1 00-1.414-1.414L9 10.586 7.707 9.293a1 1 00-1.414 1.414l2 2a1 1 001.414l4-4z" clip-rule="evenodd"/>
            </svg>
            Unlimited messaging
          </li>
          <li class="flex items-start gap-2 text-sm text-jm-gray-400 line-through">
            <svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 20 20">
              <path fill-rule="evenodd" d="M10 18a8 8 100-16 8 8 000 16zM8.707 7.293a1 1 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 101.414 1.414L10 11.414l1.293 1.293a1 1 001.414-1.414L11.414 10l1.293-1.293a1 1 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"/>
            </svg>
            Tier 3-4 access
          </li>
          <li class="flex items-start gap-2 text-sm text-jm-gray-400 line-through">
            <svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 20 20">
              <path fill-rule="evenodd" d="M10 18a8 8 100-16 8 8 000 16zM8.707 7.293a1 1 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 101.414 1.414L10 11.414l1.293 1.293a1 1 001.414-1.414L11.414 10l1.293-1.293a1 1 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"/>
            </svg>
            Request details from Premium
          </li>
        </ul>

        <!-- CTA (Current Plan) -->
        <button
          type="button"
          class="
            w-full border-2 border-jm-gray-300
            text-jm-gray-500
            font-sans font-medium
            px-6 py-3 rounded-lg
            cursor-not-allowed
          "
          disabled
        >
          Current Plan
        </button>
      </div>

      <!-- Premium Tier (Highlighted) -->
      <div class="bg-gradient-jm rounded-xl shadow-lg p-8 space-y-6 relative transform md:scale-105">
        <!-- Most Popular Badge -->
        <div class="absolute top-0 right-0 bg-jm-coral text-white text-xs font-semibold px-3 py-1 rounded-bl-lg rounded-tr-xl">
          Most Popular
        </div>

        <div>
          <h3 class="font-serif text-2xl font-semibold text-white mb-2">Premium</h3>
          <p class="font-sans text-4xl font-bold text-white">₦18,000</p>
          <p class="font-sans text-sm text-white/80">per month</p>
        </div>

        <!-- Features -->
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
            Send Show Interest to Premium users
          </li>
          <li class="flex items-start gap-2 text-sm text-white">
            <svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 20 20">
              <path fill-rule="evenodd" d="M10 18a8 8 100-16 8 8 000 16zm3.707-9.293a1 1 00-1.414-1.414L9 10.586 7.707 9.293a1 1 00-1.414 1.414l2 2a1 1 001.414l4-4z" clip-rule="evenodd"/>
            </svg>
            Marriage-level compatibility insights
          </li>
          <li class="flex items-start gap-2 text-sm text-white/60 line-through">
            <svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 20 20">
              <path fill-rule="evenodd" d="M10 18a8 8 100-16 8 8 000 16zM8.707 7.293a1 1 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 101.414 1.414L10 11.414l1.293 1.293a1 1 001.414-1.414L11.414 10l1.293-1.293a1 1 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"/>
            </svg>
            VIP verification & concierge
          </li>
        </ul>

        <!-- CTA -->
        <button
          type="button"
          class="
            w-full bg-white hover:bg-jm-gray-100
            text-jm-purple font-sans font-semibold
            px-6 py-3 rounded-lg
            transition-all duration-200
            shadow-md hover:shadow-lg
            focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-jm-purple
          "
          onclick="showPremiumPaymentForm()"
        >
          Upgrade to Premium
        </button>

        <!-- Quarterly Option -->
        <p class="text-center text-white/80 text-sm">
          Or save 17% with
          <button
            type="button"
            class="underline font-semibold hover:text-white"
            onclick="showPremiumPaymentForm('quarterly')"
          >
            quarterly billing (₦45,000/3mo)
          </button>
        </p>
      </div>

      <!-- VIP Tier -->
      <div class="bg-white rounded-xl shadow-sm border border-jm-gray-200 p-8 space-y-6">
        <div>
          <h3 class="font-serif text-2xl font-semibold text-jm-gray-900 mb-2">VIP</h3>
          <p class="font-sans text-4xl font-bold text-jm-gray-900">₦200,000+</p>
          <p class="font-sans text-sm text-jm-gray-600">per month</p>
        </div>

        <!-- Features -->
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
            Personal matchmaking expert
          </li>
          <li class="flex items-start gap-2 text-sm text-jm-gray-700">
            <svg class="w-5 h-5 text-jm-success flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 20 20">
              <path fill-rule="evenodd" d="M10 18a8 8 100-16 8 8 000 16zm3.707-9.293a1 1 00-1.414-1.414L9 10.586 7.707 9.293a1 1 00-1.414 1.414l2 2a1 1 001.414l4-4z" clip-rule="evenodd"/>
            </svg>
            Curated introductions
          </li>
          <li class="flex items-start gap-2 text-sm text-jm-gray-700">
            <svg class="w-5 h-5 text-jm-success flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 20 20">
              <path fill-rule="evenodd" d="M10 18a8 8 100-16 8 8 000 16zm3.707-9.293a1 1 00-1.414-1.414L9 10.586 7.707 9.293a1 1 00-1.414 1.414l2 2a1 1 001.414l4-4z" clip-rule="evenodd"/>
            </svg>
            Complete profile privacy
          </li>
          <li class="flex items-start gap-2 text-sm text-jm-gray-700">
            <svg class="w-5 h-5 text-jm-success flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 20 20">
              <path fill-rule="evenodd" d="M10 18a8 8 100-16 8 8 000 16zm3.707-9.293a1 1 00-1.414-1.414L9 10.586 7.707 9.293a1 1 00-1.414 1.414l2 2a1 1 001.414l4-4z" clip-rule="evenodd"/>
            </svg>
            Priority support
          </li>
        </ul>

        <!-- CTA -->
        <a
          href="/app/subscription/vip-application"
          class="
            block w-full border-2 border-jm-purple hover:border-jm-purple-dark
            text-jm-purple hover:text-jm-purple-dark hover:bg-jm-purple/5
            font-sans font-semibold
            px-6 py-3 rounded-lg
            transition-all duration-200
            text-center
            focus:outline-none focus:ring-2 focus:ring-jm-purple focus:ring-offset-2
          "
        >
          Apply for VIP
        </a>

        <!-- VIP Application Note -->
        <p class="text-center text-jm-gray-600 text-xs">
          Application-based. Requires Tier 4 completion.
        </p>
      </div>
    </div>

    <!-- Money-Back Guarantee (Premium) -->
    <div class="mt-12 text-center">
      <div class="inline-flex items-center gap-2 bg-jm-success/10 text-jm-success px-4 py-2 rounded-full text-sm font-medium">
        <svg class="w-5 h-5" fill="currentColor" viewBox="0 20 20">
          <path fill-rule="evenodd" d="M2.166 4.999A11.954 11.954 0010 1.944 11.954 11.954 0017.834 5c.11.65.166 1.32.166 2.001 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 00-1.414-1.414L9 10.586 7.707 9.293a1 1 00-1.414 1.414l2 2a1 1 001.414l4-4z" clip-rule="evenodd"/>
        </svg>
        7-Day Money-Back Guarantee on Premium
      </div>
    </div>
  </div>
</section>
```

---

### 3.3 Payment Form (Premium Upgrade)

**Content:**
- Plan selection (Monthly or Quarterly)
- Pricing summary
- Payment method (Card or Bank Transfer)
- Billing information form
- Terms & conditions acceptance
- Submit button

**HTML Structure:**
```html
<!-- Payment Form Modal/Section -->
<div
  id="payment-form-modal"
  class="fixed inset-0 bg-jm-gray-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 hidden"
  role="dialog"
  aria-modal="true"
  aria-labelledby="payment-form-title"
>
  <div class="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
    <!-- Close Button -->
    <button
      type="button"
      class="absolute top-4 right-4 p-2 rounded-full text-jm-gray-600 hover:text-jm-gray-900 hover:bg-jm-gray-100 transition-all"
      aria-label="Close payment form"
      onclick="closePaymentForm()"
    >
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
      </svg>
    </button>

    <!-- Form Content -->
    <div class="p-8 space-y-6">
      <!-- Header -->
      <div class="pr-10">
        <h2 id="payment-form-title" class="font-serif text-3xl font-bold text-jm-gray-900 mb-2">
          Upgrade to Premium
        </h2>
        <p class="font-sans text-base text-jm-gray-600">
          Complete your upgrade to unlock Tier 3-4 and premium features
        </p>
      </div>

      <!-- Plan Selection -->
      <div class="space-y-3">
        <h3 class="font-sans text-sm font-semibold text-jm-gray-700">
          Select Billing Period
        </h3>

        <!-- Monthly Option -->
        <label class="flex items-start gap-3 p-4 border-2 border-jm-purple rounded-lg cursor-pointer hover:bg-jm-purple/5 transition-colors">
          <input
            type="radio"
            name="billing_period"
            value="monthly"
            class="w-5 h-5 mt-0.5 text-jm-purple focus:ring-2 focus:ring-jm-purple/20"
            checked
          />
          <div class="flex-1">
            <div class="flex items-center justify-between">
              <span class="font-sans text-base font-semibold text-jm-gray-900">
                Monthly
              </span>
              <span class="font-sans text-2xl font-bold text-jm-gray-900">
                ₦18,000
              </span>
            </div>
            <p class="font-sans text-sm text-jm-gray-600 mt-1">
              Billed monthly. Cancel anytime.
            </p>
          </div>
        </label>

        <!-- Quarterly Option (Best Value) -->
        <label class="relative flex items-start gap-3 p-4 border-2 border-jm-gray-300 rounded-lg cursor-pointer hover:border-jm-purple hover:bg-jm-purple/5 transition-colors">
          <!-- Best Value Badge -->
          <div class="absolute -top-3 right-4 bg-jm-coral text-white text-xs font-semibold px-3 py-1 rounded-full">
            Save 17%
          </div>

          <input
            type="radio"
            name="billing_period"
            value="quarterly"
            class="w-5 h-5 mt-0.5 text-jm-purple focus:ring-2 focus:ring-jm-purple/20"
          />
          <div class="flex-1">
            <div class="flex items-center justify-between">
              <span class="font-sans text-base font-semibold text-jm-gray-900">
                Quarterly (3 months)
              </span>
              <div class="text-right">
                <span class="font-sans text-2xl font-bold text-jm-gray-900 block">
                  ₦45,000
                </span>
                <span class="font-sans text-sm text-jm-gray-500 line-through">
                  ₦54,000
                </span>
              </div>
            </div>
            <p class="font-sans text-sm text-jm-gray-600 mt-1">
              Pay once every 3 months. <strong class="text-jm-success">Save ₦9,000!</strong>
            </p>
          </div>
        </label>
      </div>

      <!-- Payment Method Selection -->
      <div class="space-y-3">
        <h3 class="font-sans text-sm font-semibold text-jm-gray-700">
          Payment Method
        </h3>

        <div class="flex gap-3">
          <!-- Card Payment (Default) -->
          <label class="flex-1 flex items-center gap-2 p-4 border-2 border-jm-purple rounded-lg cursor-pointer hover:bg-jm-purple/5 transition-colors">
            <input
              type="radio"
              name="payment_method"
              value="card"
              class="w-5 h-5 text-jm-purple focus:ring-2 focus:ring-jm-purple/20"
              checked
            />
            <svg class="w-8 h-8 text-jm-purple" fill="none" stroke="currentColor" viewBox="0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4h1m-7 4h12a3 3 003-3V8a3 3 00-3-3H6a3 3 00-3 3v8a3 3 003 3z"/>
            </svg>
            <span class="font-sans text-sm font-medium text-jm-gray-900">
              Card
            </span>
          </label>

          <!-- Bank Transfer -->
          <label class="flex-1 flex items-center gap-2 p-4 border-2 border-jm-gray-300 rounded-lg cursor-pointer hover:border-jm-purple hover:bg-jm-purple/5 transition-colors">
            <input
              type="radio"
              name="payment_method"
              value="bank_transfer"
              class="w-5 h-5 text-jm-purple focus:ring-2 focus:ring-jm-purple/20"
            />
            <svg class="w-8 h-8 text-jm-gray-600" fill="none" stroke="currentColor" viewBox="0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z"/>
            </svg>
            <span class="font-sans text-sm font-medium text-jm-gray-900">
              Bank Transfer
            </span>
          </label>
        </div>
      </div>

      <!-- Billing Information (Card Payment) -->
      <div id="card-payment-form" class="space-y-4">
        <h3 class="font-sans text-sm font-semibold text-jm-gray-700">
          Billing Information
        </h3>

        <!-- Email -->
        <div class="space-y-2">
          <label for="billing-email" class="block font-sans text-sm font-medium text-jm-gray-700">
            Email Address
          </label>
          <input
            type="email"
            id="billing-email"
            name="email"
            value="user@example.com"
            class="w-full px-4 py-3 rounded-lg border-2 border-jm-gray-300 focus:border-jm-purple focus:ring-2 focus:ring-jm-purple/20 font-sans text-base text-jm-gray-900 transition-all focus:outline-none"
            required
          />
        </div>

        <!-- Card Details (Paystack Inline) -->
        <div id="paystack-card-container" class="space-y-2">
          <label class="block font-sans text-sm font-medium text-jm-gray-700">
            Card Details
          </label>
          <div class="bg-jm-gray-50 border-2 border-jm-gray-300 rounded-lg p-4">
            <p class="font-sans text-sm text-jm-gray-600 text-center">
              Secure payment powered by <strong>Paystack</strong>
            </p>
            <p class="font-sans text-xs text-jm-gray-500 text-center mt-2">
              Your card details are encrypted and never stored on our servers
            </p>
          </div>
        </div>
      </div>

      <!-- Bank Transfer Instructions (Hidden by default) -->
      <div id="bank-transfer-form" class="space-y-4 hidden">
        <div class="bg-jm-info/10 border-l-4 border-jm-info p-4 rounded-r-lg">
          <h3 class="font-sans text-sm font-semibold text-jm-info mb-2">
            Bank Transfer Instructions
          </h3>
          <p class="font-sans text-sm text-jm-gray-700 mb-3">
            Transfer <strong>₦18,000</strong> to the account below:
          </p>
          <div class="bg-white rounded-lg p-3 space-y-1 font-mono text-sm">
            <p><strong>Bank:</strong> Guaranty Trust Bank (GTBank)</p>
            <p><strong>Account Name:</strong> JoyMatcher Limited</p>
            <p><strong>Account Number:</strong> 0123456789</p>
            <p><strong>Reference:</strong> <span class="text-jm-purple font-bold">JM-USER-12345</span></p>
          </div>
          <p class="font-sans text-xs text-jm-gray-600 mt-3">
            ⚠️ Use the reference code above to ensure your payment is credited correctly.
          </p>
        </div>
      </div>

      <!-- Order Summary -->
      <div class="bg-jm-gray-50 border border-jm-gray-200 rounded-lg p-4 space-y-3">
        <h3 class="font-sans text-sm font-semibold text-jm-gray-700">
          Order Summary
        </h3>
        <div class="flex items-center justify-between font-sans text-sm text-jm-gray-700">
          <span>Premium Subscription (Monthly)</span>
          <span>₦18,000</span>
        </div>
        <div class="flex items-center justify-between font-sans text-sm text-jm-gray-700">
          <span>Processing Fee</span>
          <span>₦0</span>
        </div>
        <div class="pt-3 border-t border-jm-gray-300 flex items-center justify-between">
          <span class="font-sans text-base font-bold text-jm-gray-900">
            Total Due Today
          </span>
          <span class="font-sans text-2xl font-bold text-jm-purple">
            ₦18,000
          </span>
        </div>
      </div>

      <!-- Terms & Conditions -->
      <div class="flex items-start gap-3">
        <input
          type="checkbox"
          id="terms-acceptance"
          name="terms"
          class="w-5 h-5 mt-0.5 rounded border-2 border-jm-gray-300 text-jm-purple focus:ring-2 focus:ring-jm-purple/20"
          required
        />
        <label for="terms-acceptance" class="font-sans text-sm text-jm-gray-700 cursor-pointer">
          I agree to the <a href="/legal/terms-of-service" class="text-jm-purple hover:text-jm-purple-dark underline font-medium" target="_blank">Terms of Service</a>,
          <a href="/legal/privacy-policy" class="text-jm-purple hover:text-jm-purple-dark underline font-medium" target="_blank">Privacy Policy</a>, and
          <a href="/legal/subscription-terms" class="text-jm-purple hover:text-jm-purple-dark underline font-medium" target="_blank">Subscription Terms</a>.
        </label>
      </div>

      <!-- Submit Button -->
      <button
        type="submit"
        class="
          w-full bg-gradient-jm hover:bg-gradient-jm-hover
          text-white font-sans font-semibold text-lg
          px-8 py-4 rounded-lg
          transition-all duration-200
          shadow-md hover:shadow-lg
          focus:outline-none focus:ring-2 focus:ring-jm-coral focus:ring-offset-2
          disabled:opacity-50 disabled:cursor-not-allowed
        "
        onclick="handlePayment()"
      >
        Complete Payment
      </button>

      <!-- Security Notice -->
      <div class="flex items-center justify-center gap-2 text-jm-gray-500 text-xs">
        <svg class="w-4 h-4" fill="currentColor" viewBox="0 20 20">
          <path fill-rule="evenodd" d="M5 9V7a5 5 0110v2a2 2 012 2v5a2 2 01-2 2H5a2 2 01-2-2v-5a2 2 012-2zm8-2v2H7V7a3 3 016z" clip-rule="evenodd"/>
        </svg>
        <span>Secure SSL encrypted payment</span>
      </div>
    </div>
  </div>
</div>
```

---

### 3.4 VIP Application Form

**Content:**
- Pre-qualification check (Tier 4 completion required)
- 18-question intent screening questionnaire
- Motivation statement (why applying)
- Marriage timeline expectations
- Privacy needs
- Matchmaking preferences
- Submit application button

**HTML Structure:**
```html
<!-- VIP Application Page -->
<section class="py-16 bg-jm-gray-50 min-h-screen">
  <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
    <!-- Header -->
    <div class="bg-white rounded-xl shadow-md p-8 mb-8">
      <h1 class="font-serif text-3xl md:text-4xl font-bold text-jm-gray-900 mb-4">
        VIP Membership Application
      </h1>
      <p class="font-sans text-lg text-jm-gray-700 mb-6">
        Apply for personalized matchmaking and verified introductions.
      </p>

      <!-- Requirements Checklist -->
      <div class="bg-jm-purple/10 border-l-4 border-jm-purple p-4 rounded-r-lg">
        <h2 class="font-sans text-sm font-semibold text-jm-purple mb-3">
          Requirements to Apply:
        </h2>
        <ul class="space-y-2">
          <li class="flex items-center gap-2 font-sans text-sm text-jm-gray-700">
            <svg class="w-5 h-5 text-jm-success" fill="currentColor" viewBox="0 20 20">
              <path fill-rule="evenodd" d="M10 18a8 8 100-16 8 8 000 16zm3.707-9.293a1 1 00-1.414-1.414L9 10.586 7.707 9.293a1 1 00-1.414 1.414l2 2a1 1 001.414l4-4z" clip-rule="evenodd"/>
            </svg>
            Complete Tier 4 (Health & Compatibility)
          </li>
          <li class="flex items-center gap-2 font-sans text-sm text-jm-gray-700">
            <svg class="w-5 h-5 text-jm-success" fill="currentColor" viewBox="0 20 20">
              <path fill-rule="evenodd" d="M10 18a8 8 100-16 8 8 000 16zm3.707-9.293a1 1 00-1.414-1.414L9 10.586 7.707 9.293a1 1 00-1.414 1.414l2 2a1 1 001.414l4-4z" clip-rule="evenodd"/>
            </svg>
            Submit 18-question intent screening
          </li>
          <li class="flex items-center gap-2 font-sans text-sm text-jm-gray-700">
            <svg class="w-5 h-5 text-jm-gray-400" fill="currentColor" viewBox="0 20 20">
              <path fill-rule="evenodd" d="M10 18a8 8 100-16 8 8 000 16zM8.707 7.293a1 1 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 101.414 1.414L10 11.414l1.293 1.293a1 1 001.414-1.414L11.414 10l1.293-1.293a1 1 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"/>
            </svg>
            Pass manual VIP Coordinator review
          </li>
          <li class="flex items-center gap-2 font-sans text-sm text-jm-gray-700">
            <svg class="w-5 h-5 text-jm-gray-400" fill="currentColor" viewBox="0 20 20">
              <path fill-rule="evenodd" d="M10 18a8 8 100-16 8 8 000 16zM8.707 7.293a1 1 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 101.414 1.414L10 11.414l1.293 1.293a1 1 001.414-1.414L11.414 10l1.293-1.293a1 1 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"/>
            </svg>
            Complete Tier 5 verification after approval
          </li>
        </ul>
      </div>
    </div>

    <!-- Application Form -->
    <form class="bg-white rounded-xl shadow-md p-8 space-y-6">
      <!-- Question 1: Why VIP? -->
      <div class="space-y-2">
        <label for="why-vip" class="block font-sans text-sm font-medium text-jm-gray-700">
          1. Why are you applying for VIP membership? <span class="text-jm-error">*</span>
        </label>
        <textarea
          id="why-vip"
          name="why_vip"
          rows="4"
          placeholder="Share your motivation for seeking VIP membership..."
          maxlength="500"
          class="w-full px-4 py-3 rounded-lg border-2 border-jm-gray-300 focus:border-jm-purple focus:ring-2 focus:ring-jm-purple/20 font-sans text-base text-jm-gray-900 placeholder:text-jm-gray-400 resize-vertical transition-all focus:outline-none"
          required
        ></textarea>
        <p class="font-sans text-xs text-jm-gray-500 text-right">
          0 / 500 characters
        </p>
      </div>

      <!-- Question 2: Marriage Timeline -->
      <div class="space-y-2">
        <label for="marriage-timeline" class="block font-sans text-sm font-medium text-jm-gray-700">
          2. What is your marriage timeline? <span class="text-jm-error">*</span>
        </label>
        <select
          id="marriage-timeline"
          name="marriage_timeline"
          class="w-full px-4 py-3 rounded-lg border-2 border-jm-gray-300 focus:border-jm-purple focus:ring-2 focus:ring-jm-purple/20 font-sans text-base text-jm-gray-900 bg-white cursor-pointer transition-all focus:outline-none appearance-none"
          style="background-image: url('data:image/svg+xml;charset=UTF-8,%3csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 20 20%27 fill=%27%236B7280%27%3e%3cpath fill-rule=%27evenodd%27 d=%27M5.293 7.293a1 1 011.414L10 10.586l3.293-3.293a1 1 111.414 1.414l-4 4a1 1 01-1.414l-4-4a1 1 010-1.414z%27 clip-rule=%27evenodd%27/%3e%3c/svg%3e'); background-position: right 0.75rem center; background-repeat: no-repeat; background-size: 1.25rem;"
          required
        >
          <option value="" disabled selected>Select timeline</option>
          <option value="within-6-months">Within 6 months</option>
          <option value="within-1-year">Within 1 year</option>
          <option value="within-2-years">Within 2 years</option>
          <option value="flexible">Flexible (when I find the right person)</option>
        </select>
      </div>

      <!-- Question 3-18: Additional screening questions -->
      <!-- (Truncated for brevity - follow similar pattern) -->

      <!-- Submit Button -->
      <div class="pt-6 border-t border-jm-gray-200">
        <button
          type="submit"
          class="w-full bg-gradient-jm hover:bg-gradient-jm-hover text-white font-sans font-semibold text-lg px-8 py-4 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-jm-coral focus:ring-offset-2"
        >
          Submit VIP Application
        </button>
        <p class="font-sans text-sm text-jm-gray-600 text-center mt-4">
          Your application will be reviewed within <strong>48 hours</strong>.
        </p>
      </div>
    </form>
  </div>
</section>
```

---

## 4. User Interactions & Flows

### 4.1 Free → Premium Upgrade Flow

**Flow:**
1. User clicks "Upgrade to Premium" from pricing table
2. Payment form modal opens
3. User selects billing period (Monthly or Quarterly)
4. User selects payment method (Card or Bank Transfer)
5. **Card Payment:**
   - Paystack inline form loads
   - User enters card details
   - User clicks "Complete Payment"
   - Paystack processes payment
   - Success: User redirected to success page
   - Subscription activated immediately
   - Tier ceiling updated to 4
6. **Bank Transfer:**
   - User sees bank account details
   - User makes transfer (outside platform)
   - User marks payment as complete
   - System sends manual verification request to admin
   - Admin approves payment within 24 hours
   - Subscription activated
   - User notified via email

**Success State:**
- Payment confirmed within 10 seconds (card)
- Subscription status updated
- Tier ceiling badge updates
- User can immediately complete Tier 3-4
- Welcome email sent

### 4.2 Premium → VIP Application Flow

**Flow:**
1. User clicks "Apply for VIP" from pricing table
2. System checks Tier 4 completion
3. If incomplete: "Complete Tier 4 first" error shown
4. If complete: VIP application form loads
5. User completes 18-question screening
6. User submits application
7. VIP Coordinator reviews application (manual, 24-48 hours)
8. If approved:
   - User notified via email
   - Tier 5 verification flow triggered
   - Payment link sent (custom pricing)
9. If rejected:
   - User notified with reason
   - Can reapply after 30 days

**Success State:**
- Application submitted successfully
- Confirmation email sent
- User sees "Application under review" status
- Notification sent when approved/rejected

---

## 5. EDT/Tier Logic

### 5.1 Tier Ceiling Updates

**Key Rule:** Subscription upgrade immediately updates tier ceiling

**Update Flow:**
1. User completes payment (Free → Premium)
2. Backend updates `subscription` field → `premium`
3. Backend updates `subscription_ceiling` → `4`
4. User dashboard updates (real-time via WebSocket or page reload)
5. Tier 3-4 unlock notifications shown
6. User can immediately navigate to Tier 3 completion

**Example:**
- Before upgrade: Free user, tier ceiling = 2
- After upgrade: Premium user, tier ceiling = 4
- Tier 3 and Tier 4 forms become accessible

---

## 6. Subscription Ceiling Rules

### 6.1 Enforcement During Upgrade

**Free User Restrictions:**
- Cannot complete Tier 3-4 without upgrading
- "Upgrade to Premium" prompt shown when attempting Tier 3

**Premium User Restrictions:**
- Cannot complete Tier 5 without VIP approval
- "Apply for VIP" prompt shown when attempting Tier 5

### 6.2 Downgrade Handling

**Scenario:** Premium user cancels subscription, downgrades to Free

**Flow:**
1. User cancels Premium subscription
2. Subscription remains active until end of billing period
3. After billing period ends:
   - Subscription downgraded to Free
   - Tier ceiling capped at 2
   - Tier 3-4 data preserved but inaccessible
   - User notified: "Your Premium features have expired"
4. If user re-upgrades within 90 days:
   - Tier 3-4 data restored
   - No re-completion required

---

## 7. Payment Integration

### 7.1 Paystack Integration (Nigeria)

**Implementation:**
```javascript
// app/javascript/controllers/payment_controller.js
import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["submitButton"]

  connect() {
    // Load Paystack inline script
    this.loadPaystackScript()
  }

  loadPaystackScript() {
    const script = document.createElement("script")
    script.src = "https://js.paystack.co/v1/inline.js"
    script.async = true
    document.head.appendChild(script)
  }

  handlePayment(event) {
    event.preventDefault()

    const email = document.getElementById("billing-email").value
    const amount = this.getSelectedPlanAmount() // ₦18,000 or ₦45,000
    const billingPeriod = document.querySelector('input[name="billing_period"]:checked').value

    const handler = PaystackPop.setup({
      key: "pk_test_xxxxxxxxxxxx", // Replace with live key in production
      email: email,
      amount: amount * 100, // Convert to kobo
      currency: "NGN",
      ref: this.generateReference(),
      metadata: {
        user_id: this.element.dataset.userId,
        billing_period: billingPeriod,
        plan: "premium"
      },
      callback: (response) => {
        this.handlePaymentSuccess(response)
      },
      onClose: () => {
        this.handlePaymentCancelled()
      }
    })

    handler.openIframe()
  }

  handlePaymentSuccess(response) {
    // Verify payment on backend
    fetch("/api/subscriptions/verify-payment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRF-Token": document.querySelector("[name=csrf-token]").content
      },
      body: JSON.stringify({
        reference: response.reference
      })
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          // Redirect to success page
          window.location.href = "/app/subscription/success"
        } else {
          this.showErrorNotification("Payment verification failed. Please contact support.")
        }
      })
      .catch(error => {
        this.showErrorNotification("An error occurred. Please try again.")
      })
  }

  handlePaymentCancelled() {
    this.showInfoNotification("Payment cancelled. You can try again anytime.")
  }

  generateReference() {
    return `JM-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
  }

  getSelectedPlanAmount() {
    const billingPeriod = document.querySelector('input[name="billing_period"]:checked').value
    return billingPeriod === "monthly" ? 18000 : 45000
  }

  showErrorNotification(message) {
    // Show toast/banner notification
  }

  showInfoNotification(message) {
    // Show toast/banner notification
  }
}
```

### 7.2 Stripe Integration (International)

**Implementation:**
```javascript
// Similar to Paystack, using Stripe.js
// Replace Paystack-specific code with Stripe equivalents
```

---

## 8. Accessibility Requirements

### WCAG 2.1 AA Compliance

**Keyboard Navigation:**
- All form inputs accessible via Tab
- Radio buttons navigable via Arrow keys
- Submit button accessible via Enter

**Screen Reader Support:**
- Payment form: Proper labels for all inputs
- Error messages: `aria-live="polite"` announcements
- Success messages: `role="status"` announcements

**Color Contrast:**
- All text meets 4.5:1 minimum
- Error states use sufficient contrast

---

## 9. Mobile Responsive Behavior

### Breakpoints

**Mobile (320px-767px):**
- Single column pricing cards
- Stacked payment form
- Full-width CTAs

**Tablet (768px-1023px):**
- 2-column pricing (Free/Premium, VIP below)
- Side-by-side form fields

**Desktop (≥1024px):**
- 3-column pricing grid
- Modal-based payment form

---

## 10. Error Handling

### Payment Failures

**Scenario:** Card payment declined

**Solution:**
1. Paystack returns error
2. Show error notification with reason
3. Allow retry
4. Suggest alternative payment method

### Network Failures

**Scenario:** Payment submitted but network drops

**Solution:**
1. Show reconnecting message
2. Retry verification request
3. If still fails, show support contact

---

## 11. Success States

### Payment Success

**Visual Feedback:**
1. Success page loads with confetti animation
2. "Welcome to Premium!" message
3. Summary of unlocked features
4. CTA: "Complete Tier 3 Now"

---

## 12. Related Documentation

- [Messages Spec](messages_spec.md) - Real-time messaging unlocked
- [Interests Spec](interests_spec.md) - Show Interest eligibility
- [Tier System](../../Global%20Context/tier_system.md) - Tier ceiling rules
- [Subscription Tier Ceiling](../../Technical%20Specifications/subscription_tier_ceiling.md) - Backend implementation

---

**Document Owner:** Product Lead & Engineering Lead
**Last Updated:** 2026-02-27
**Status:** Complete — Ready for Implementation
**Estimated Development Time:** 100-120 hours
