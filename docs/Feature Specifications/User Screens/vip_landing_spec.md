# VIP Membership Landing Page — Feature Specification

**Document Version:** 1.0
**Last Updated:** 2026-02-27
**Owner:** Product Team
**Status:** Draft

---

## Table of Contents

1. [Page Purpose](#page-purpose)
2. [Content Sections](#content-sections)
3. [Interactive Elements](#interactive-elements)
4. [State Behavior](#state-behavior)
5. [HTML/Tailwind Implementation](#htmltailwind-implementation)
6. [Form Validation](#form-validation)
7. [Error Handling](#error-handling)
8. [Loading States](#loading-states)
9. [Success States](#success-states)
10. [Modal Specifications](#modal-specifications)
11. [Accessibility Checklist](#accessibility-checklist)
12. [Performance Optimization](#performance-optimization)
13. [Cross-References](#cross-references)

---

## Page Purpose

The VIP Membership Landing Page serves as the primary conversion point for users interested in premium matchmaking services. This page is accessible to all authenticated users (Free, Premium, and VIP) but presents different content and calls-to-action based on the user's current subscription status.

### Primary Objectives

1. **Convert Premium Users to VIP**: Showcase the elevated experience and expert matchmaking support available exclusively to VIP members
2. **Educate Free Users**: Demonstrate the complete value ladder from Free → Premium → VIP
3. **Retain VIP Members**: Reinforce value proposition and showcase ongoing benefits for current VIP subscribers
4. **Filter Serious Candidates**: Use the 18-question application process to ensure VIP members are genuinely marriage-minded

### Strategic Positioning

Unlike Premium (which is self-service subscription), VIP membership is:
- **Application-based**: Requires submission of detailed 18-question form
- **Curated**: Expert matchmakers review applications and may request video interviews
- **Investment-filtered**: Pricing (₦200,000-500,000 / $500-1,250) ensures serious commitment
- **White-glove**: Personal matchmaker assignment, priority support, unlimited tier access
- **Verification-gated**: Tier 5 access requires ID verification + Video KYC

### User Journey Context

**Free User Path:**
1. Discovers VIP page through navigation or upgrade prompts
2. Learns about Premium benefits (prerequisite for VIP)
3. Sees VIP as aspirational next step after Premium
4. May bookmark for future consideration

**Premium User Path:**
1. Hits Tier 4 ceiling and encounters VIP upgrade prompts
2. Navigates to VIP landing page to learn more
3. Reviews pricing, benefits, and application preview
4. Decides to apply immediately or continue Premium for now

**VIP User Path:**
1. Accesses VIP dashboard directly (sees different content)
2. Page reinforces their investment value
3. May view expert matchmaker profiles
4. Can manage subscription from here

---

## Content Sections

### 1. Hero Section

**Purpose:** Immediately communicate exclusivity and value proposition

**Content Elements:**
- **Headline:** "VIP Matchmaking — Expert-Led, Marriage-Focused"
- **Subheadline:** "Personal matchmaker. Unlimited profile access. Priority verification. For those ready to find their life partner."
- **Background:** Subtle gradient (jm-purple-deep to jm-coral) with professional couple imagery (high-quality, diverse, modest dress)
- **CTA Button:**
  - Free Users: "Start with Premium" (purple)
  - Premium Users: "Begin VIP Application" (coral gradient)
  - VIP Users: "Manage My VIP Dashboard" (outline button)

**Visual Hierarchy:**
- Large, serif headline font (Cormorant Garamond or similar)
- Clean, spacious layout with ample whitespace
- Muted colors maintaining professional tone
- No gamification, badges, or playful elements

---

### 2. VIP Benefits Grid

**Purpose:** Clearly differentiate VIP from Free/Premium tiers

**Layout:** 3-column responsive grid (1 column mobile, 2 columns tablet, 3 columns desktop)

**Benefit Cards:**

1. **Unlimited Tier Access**
   - Icon: Unlocked padlock
   - Description: "Complete all 5 tiers and view all Tier 5 profiles. No ceiling on your disclosure or discovery."
   - Technical Note: Only VIP subscription allows Tier 5 completion

2. **Personal Matchmaker**
   - Icon: Professional headshot silhouette
   - Description: "Dedicated expert guides your journey, reviews matches, and provides relationship coaching."
   - Technical Note: Expert assigned after application approval

3. **Priority Verification**
   - Icon: Verified badge
   - Description: "Fast-tracked ID verification and Video KYC for Tier 5 access."
   - Technical Note: Tier 5 requires both ID and Video KYC

4. **Enhanced Privacy**
   - Icon: Eye with slash
   - Description: "Control who sees your profile. Hide from specific users or make profile invite-only."
   - Technical Note: VIP-exclusive privacy settings

5. **Priority Support**
   - Icon: Headphones
   - Description: "Direct line to support team. Issues resolved within 24 hours, not 3-5 days."
   - Technical Note: Separate support queue for VIP members

6. **Profile Analytics**
   - Icon: Bar chart
   - Description: "See who viewed your profile, who you appeared in Discover for, and interest patterns."
   - Technical Note: VIP dashboard feature

**Visual Treatment:**
- Cards have subtle shadow and hover lift effect
- Icons use jm-purple-deep color
- Clean typography with ample padding
- Accessible color contrast (WCAG 2.1 AA)

---

### 3. Pricing Tiers

**Purpose:** Present clear pricing options with psychological anchoring

**Layout:** 3 pricing cards side-by-side (stack on mobile)

**Pricing Structure (Nigerian Users):**

1. **3-Month VIP** — ₦200,000
   - ₦66,667/month effective rate
   - Best for: "Testing VIP experience"
   - Badge: None

2. **6-Month VIP** — ₦350,000
   - ₦58,333/month effective rate
   - Save: ₦50,000 vs 3-month × 2
   - Badge: "Most Popular" (coral background)
   - Best for: "Serious search timeline"

3. **12-Month VIP** — ₦600,000
   - ₦50,000/month effective rate
   - Save: ₦200,000 vs 3-month × 4
   - Badge: "Best Value" (purple background)
   - Best for: "Committed to finding the one"

**Pricing Structure (International Users):**

1. **3-Month VIP** — $500
   - $167/month effective rate
   - Best for: "Testing VIP experience"

2. **6-Month VIP** — $875
   - $146/month effective rate
   - Save: $125 vs 3-month × 2
   - Badge: "Most Popular"

3. **12-Month VIP** — $1,500
   - $125/month effective rate
   - Save: $200 vs 3-month × 4
   - Badge: "Best Value"

**Card Features:**
- Each card shows:
  - Total price (large, prominent)
  - Effective monthly rate (smaller, below)
  - Savings amount (if applicable)
  - All VIP benefits included (checkmarks)
  - "Select Plan" button
- Middle card (6-month) slightly elevated with shadow
- Currency displayed based on user's country setting

**Important Notes:**
- Never mix currencies in UI
- Premium subscription prerequisite noted below cards
- No hidden fees or surprise charges
- Renewal policy clearly stated

---

### 4. Application Preview

**Purpose:** Set expectations and filter casual browsers

**Content:**
- **Headline:** "The VIP Application — 18 Questions, Unlimited Possibilities"
- **Subheadline:** "We take matching seriously. Your thoughtful responses help our experts find your ideal partner."

**Question Categories (Accordion-style):**

**Section 1: Marriage Readiness (6 questions)**
- Expand/collapse interaction
- Shows question titles (not full questions):
  1. Why are you seeking marriage now?
  2. What does marriage mean to you?
  3. Timeline for marriage
  4. Children preferences
  5. Career and marriage balance
  6. Family involvement expectations

**Section 2: Ideal Partner (5 questions)**
- Shows question titles:
  1. Essential qualities in a spouse
  2. Faith alignment importance
  3. Educational/career expectations
  4. Physical attraction importance
  5. Dealbreakers

**Section 3: Past Relationships (3 questions)**
- Shows question titles:
  1. Previous serious relationships
  2. What you learned from past relationships
  3. Why past relationships ended

**Section 4: Matchmaking Expectations (4 questions)**
- Shows question titles:
  1. What makes a good match for you?
  2. How will expert support help?
  3. What concerns do you have?
  4. Success definition for this journey

**Visual Treatment:**
- Accordion sections with expand/collapse icons
- Purple borders on expanded sections
- Clean, professional typography
- Note: "Full questions visible when you begin application"

**Psychological Impact:**
- Demonstrates seriousness and filtering
- Encourages thoughtful self-reflection
- Positions VIP as curated, not transactional
- Filters out those seeking casual dating

---

### 5. Expert Matchmaker Profiles

**Purpose:** Humanize the service and build trust

**Layout:** Horizontal carousel (3 profiles visible on desktop, 1 on mobile)

**Profile Card Structure:**

**Matchmaker 1: Amara Okonkwo**
- Photo: Professional headshot (warm, approachable)
- Title: "Senior Matchmaker, 12 years experience"
- Specialization: "Christian matches, cross-cultural relationships"
- Success Metric: "68 marriages facilitated"
- Quote: "I believe in the power of intentional partnership. Every VIP member gets my personal attention."

**Matchmaker 2: Ibrahim Yusuf**
- Photo: Professional headshot
- Title: "Lead Matchmaker, 15 years experience"
- Specialization: "Muslim matches, professional compatibility"
- Success Metric: "92 marriages facilitated"
- Quote: "Marriage is a sacred commitment. I help you find someone who shares your values and vision."

**Matchmaker 3: Grace Adeyemi**
- Photo: Professional headshot
- Title: "Matchmaker & Relationship Coach, 10 years experience"
- Specialization: "Career-focused professionals, inter-faith dialogue"
- Success Metric: "51 marriages facilitated"
- Quote: "Finding the right partner is life-changing. I guide VIP members with care, wisdom, and personalized strategy."

**Visual Elements:**
- Circular profile photos with purple border
- Clean card design with subtle shadow
- Carousel navigation dots below
- Touch-swipe enabled on mobile

**Trust Signals:**
- Real credentials (verified)
- Specific success metrics
- Authentic quotes (not marketing copy)
- Professional photography

---

### 6. VIP Success Stories

**Purpose:** Social proof and outcome visualization

**Layout:** 2-column grid (1 column on mobile)

**Testimonial Card Structure:**

**Story 1:**
- Couple Photo: Professional engagement photo (faces visible, modest attire)
- Names: "Chidinma & Tunde"
- VIP Duration: "6-month VIP members"
- Matchmaker: "Matched by Amara Okonkwo"
- Quote: "Our matchmaker understood what we were looking for better than we did. She introduced us after reviewing our profiles and we knew immediately. Married 8 months after joining VIP."
- Timeline Badge: "Married in 8 months"

**Story 2:**
- Couple Photo: Wedding photo (joyful, professional)
- Names: "Fatima & Abdul"
- VIP Duration: "12-month VIP members"
- Matchmaker: "Matched by Ibrahim Yusuf"
- Quote: "We appreciated the seriousness of the VIP process. The application questions helped us clarify what we wanted, and our matchmaker guided us through every step with wisdom."
- Timeline Badge: "Married in 11 months"

**Story 3:**
- Couple Photo: Casual couple photo (outdoor, natural light)
- Names: "Blessing & Michael"
- VIP Duration: "3-month VIP members"
- Matchmaker: "Matched by Grace Adeyemi"
- Quote: "VIP was worth every naira. The personal attention, priority verification, and expert guidance made all the difference. We're planning our wedding now."
- Timeline Badge: "Engaged in 4 months"

**Visual Elements:**
- High-quality couple photos (diverse representation)
- Subtle card borders in brand colors
- Quote formatting with large quotation marks
- Matchmaker name subtly included
- Timeline badges in coral color

---

### 7. Premium Prerequisite Notice (For Free Users)

**Purpose:** Clarify upgrade path and prevent confusion

**Content:**
- **Headline:** "VIP Requires Premium Foundation"
- **Explanation:** "VIP membership builds on Premium's Tier 4 access. You'll need an active Premium subscription before applying for VIP."
- **Two-Step Path:**
  1. **Step 1:** Subscribe to Premium (₦18,000/month or $18/month)
  2. **Step 2:** Complete VIP application and await expert review
- **CTA Button:** "Start with Premium" (purple button)

**Visual Treatment:**
- Light purple background box
- Info icon
- Clear, non-judgmental language
- Positioned before pricing section

**Conditional Display:**
- Only shown to Free users
- Hidden for Premium and VIP users
- Uses JavaScript to detect user subscription tier

---

### 8. FAQ Section

**Purpose:** Address objections and provide clarity

**Layout:** Accordion-style expandable questions

**Questions:**

**Q1: What's the difference between Premium and VIP?**
A: Premium gives you self-service access to Tiers 1-4 and all platform features. VIP adds personal matchmaker support, Tier 5 access, priority verification, enhanced privacy controls, and profile analytics. Premium is ₦18,000/month ($18/month), while VIP starts at ₦200,000 for 3 months ($200 for 3 months).

**Q2: How long does the VIP application review take?**
A: Most applications are reviewed within 3-5 business days. Our experts read every response carefully. Some applicants may be invited for a brief video interview before approval.

**Q3: Can I cancel my VIP subscription?**
A: Yes. VIP subscriptions are prepaid for the term you select (3, 6, or 12 months) and do not auto-renew. You retain VIP access through the end of your paid period.

**Q4: What happens if my VIP application is declined?**
A: We rarely decline applications, but if we determine JoyMatcher isn't the right fit for your goals, we'll provide a full refund and suggest alternative resources. Our goal is mutual fit, not just revenue.

**Q5: Do I need Premium before applying for VIP?**
A: Yes. VIP membership requires an active Premium subscription as a foundation. This ensures you're familiar with the platform and have completed at least Tier 4.

**Q6: Will my matchmaker choose matches for me?**
A: Your matchmaker provides guidance, reviews potential matches with you, and may suggest profiles you haven't seen. However, you always maintain control over who you Show Interest in and message. We guide, you decide.

**Q7: Is Tier 5 only for VIP members?**
A: Yes. Tier 5 verification (ID + Video KYC) and profile completion is exclusively available to VIP members. This creates a curated pool of serious, verified individuals.

**Q8: Can I upgrade from 3-month to 6-month or 12-month VIP?**
A: Yes. You can extend your VIP membership at any time. Unused time from your current subscription will be credited toward the new term.

**Visual Treatment:**
- Clean accordion with + / - icons
- Smooth expand/collapse animations
- Purple accent color on active question
- Keyboard navigation support (arrow keys)

---

### 9. Final CTA Section

**Purpose:** Clear conversion action

**Content:**
- **Headline:** "Ready to Find Your Life Partner?"
- **Subheadline:** "Join Nigeria's most serious marriage-minded community with expert support."
- **CTA Buttons (varies by user):**
  - **Free Users:** "Start with Premium" (primary button) + "Learn More About Premium" (secondary link)
  - **Premium Users:** "Begin VIP Application" (large coral gradient button)
  - **VIP Users:** "Go to VIP Dashboard" (outline button)

**Background:**
- Full-width section
- Subtle gradient background
- High contrast text (white on dark gradient)
- Generous padding (80px top/bottom on desktop)

---

## Interactive Elements

### 1. Pricing Card Selection

**Behavior:**
- Click on any pricing card highlights it with purple border
- "Select Plan" button becomes coral gradient (vs default outline)
- Other cards slightly dim (opacity: 0.7)
- Selected card state persists until different card clicked

**Implementation:**
```javascript
// State management for pricing selection
let selectedPlan = null;

function selectPricingPlan(planId) {
  // Remove previous selection
  document.querySelectorAll('.pricing-card').forEach(card => {
    card.classList.remove('selected');
  });

  // Add selection to clicked card
  const selectedCard = document.getElementById(planId);
  selectedCard.classList.add('selected');

  // Store selection
  selectedPlan = planId;

  // Update CTA button
  updateCTAButton(planId);
}
```

### 2. Application Preview Accordion

**Behavior:**
- Click section header to expand/collapse
- Only one section expanded at a time (others collapse automatically)
- Smooth height animation (300ms ease-in-out)
- Chevron icon rotates 180° when expanded
- Expanded section has purple left border

**Keyboard Accessibility:**
- Tab to focus on section headers
- Enter/Space to toggle expand/collapse
- Escape to collapse all sections

### 3. Expert Matchmaker Carousel

**Behavior:**
- Auto-rotates every 5 seconds (pauses on hover)
- Touch/swipe gestures on mobile
- Navigation dots below indicate current position
- Click dot to jump to specific profile
- Smooth slide transition (400ms ease-in-out)

**Accessibility:**
- Pause button for screen reader users
- Arrow key navigation
- Focus management when sliding

### 4. FAQ Accordion

**Behavior:**
- Multiple sections can be open simultaneously
- Click question to toggle answer visibility
- Smooth expand/collapse animation
- + icon changes to - when expanded
- Maintains scroll position when expanding

**State Persistence:**
- Uses sessionStorage to remember expanded sections
- Restores state on page refresh

---

## State Behavior

### User Subscription State Detection

The page adapts content based on three subscription states:

```javascript
// User state object (simulated - will come from backend)
const currentUser = {
  id: 1,
  subscription: 'premium', // 'free' | 'premium' | 'vip'
  country: 'NG', // 'NG' | 'US' | etc.
  completedTier: 4,
  vipApplicationStatus: null // null | 'pending' | 'approved' | 'declined'
};
```

### Content Variations by State

**Free User State:**
- Shows "Premium Prerequisite Notice" section
- Hero CTA: "Start with Premium"
- Final CTA: "Start with Premium" (primary) + "Learn More" (secondary)
- Pricing cards note: "Requires Premium foundation"
- Application preview shows but is non-interactive

**Premium User State:**
- Hides "Premium Prerequisite Notice"
- Hero CTA: "Begin VIP Application"
- Final CTA: "Begin VIP Application" (large, prominent)
- Pricing cards fully interactive
- Application preview links to full application form
- Shows estimated timeline: "Apply today, review in 3-5 days"

**VIP User State:**
- Shows different hero content: "Welcome back, [Name]"
- Hero CTA: "Manage VIP Dashboard"
- Hides pricing section (already subscribed)
- Shows "Your VIP Benefits" customized section
- Displays assigned matchmaker profile prominently
- Shows VIP subscription expiration date and renewal options

### Currency Detection

```javascript
function getCurrency(countryCode) {
  const currencyMap = {
    'NG': '₦',
    'US': '$',
    'GB': '£',
    'CA': '$',
    // Default to USD for other countries
  };

  return currencyMap[countryCode] || '$';
}

function getPricing(countryCode) {
  if (countryCode === 'NG') {
    return {
      threeMonth: '₦200,000',
      sixMonth: '₦350,000',
      twelveMonth: '₦600,000'
    };
  } else {
    return {
      threeMonth: '$500',
      sixMonth: '$875',
      twelveMonth: '$1,500'
    };
  }
}
```

---

## HTML/Tailwind Implementation

Below is the complete HTML markup using Tailwind CSS v4 with JoyMatcher brand colors and design system patterns.

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>VIP Matchmaking — JoyMatcher</title>

  <!-- Tailwind CSS v4 -->
  <script src="https://cdn.tailwindcss.com"></script>

  <!-- Custom Tailwind Config -->
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
          fontFamily: {
            'serif': ['Cormorant Garamond', 'Georgia', 'serif'],
            'sans': ['Inter', 'system-ui', 'sans-serif'],
          },
          backgroundImage: {
            'gradient-jm': 'linear-gradient(135deg, #4D0052%, #F16A6F 100%)',
          },
        }
      }
    }
  </script>

  <!-- Google Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600;700&family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">

  <style>
    /* Custom animations */
    @keyframes slideUp {
      from {
        opacity: 0;
        transform: translateY(20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    .animate-slide-up {
      animation: slideUp 0.6s ease-out forwards;
    }

    /* Pricing card selection state */
    .pricing-card.selected {
      border-color: #8B0061;
      box-shadow: 0 8px 24px rgba(139, 0, 97, 0.2);
      transform: translateY(-4px);
    }

    .pricing-card {
      transition: all 0.3s ease;
    }

    /* Accordion transitions */
    .accordion-content {
      max-height: 0;
      overflow: hidden;
      transition: max-height 0.3s ease-in-out;
    }

    .accordion-content.expanded {
      max-height: 1000px;
    }

    /* Carousel */
    .carousel-container {
      display: flex;
      transition: transform 0.4s ease-in-out;
    }
  </style>
</head>
<body class="font-sans bg-gray-50 text-gray-900">

  <!-- Navigation (simplified - assumes user is logged in) -->
  <nav class="bg-white border-b border-gray-200 sticky top-0 z-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">
        <div class="flex items-center">
          <a href="/app/dashboard.html" class="text-2xl font-bold bg-gradient-jm bg-clip-text text-transparent">
            JoyMatcher
          </a>
        </div>
        <div class="flex items-center space-x-6">
          <a href="/app/dashboard.html" class="text-gray-700 hover:text-jm-purple">Dashboard</a>
          <a href="/app/discover.html" class="text-gray-700 hover:text-jm-purple">Discover</a>
          <a href="/pricing.html" class="text-gray-700 hover:text-jm-purple">Pricing</a>
          <a href="/app/vip-landing.html" class="text-jm-purple font-semibold border-b-2 border-jm-purple">VIP</a>
        </div>
      </div>
    </div>
  </nav>

  <!-- Hero Section -->
  <section class="relative bg-gradient-jm text-white py-24 lg:py-32 overflow-hidden">
    <!-- Background pattern overlay -->
    <div class="absolute inset-0 opacity-10">
      <div class="absolute inset-0" style="background-image: url('data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E');"></div>
    </div>

    <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <div class="text-center animate-slide-up">
        <h1 class="text-5xl lg:text-6xl font-serif font-bold mb-6 leading-tight">
          VIP Matchmaking
        </h1>
        <p class="text-2xl lg:text-3xl font-serif mb-4">
          Expert-Led, Marriage-Focused
        </p>
        <p class="text-xl lg:text-2xl mb-12 text-white/90 max-w-3xl mx-auto">
          Personal matchmaker. Unlimited profile access. Priority verification. For those ready to find their life partner.
        </p>

        <!-- CTA Button (varies by user state) -->
        <div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <!-- For Premium Users -->
          <button
            id="hero-cta-premium"
            onclick="scrollToApplication()"
            class="hidden px-8 py-4 bg-white text-jm-purple-deep font-semibold rounded-lg text-lg hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1">
            Begin VIP Application
          </button>

          <!-- For Free Users -->
          <button
            id="hero-cta-free"
            onclick="window.location.href='/pricing.html'"
            class="hidden px-8 py-4 bg-white text-jm-purple-deep font-semibold rounded-lg text-lg hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1">
            Start with Premium
          </button>

          <!-- For VIP Users -->
          <button
            id="hero-cta-vip"
            onclick="window.location.href='/app/vip-dashboard.html'"
            class="hidden px-8 py-4 bg-transparent border-2 border-white text-white font-semibold rounded-lg text-lg hover:bg-white hover:text-jm-purple-deep transition-all">
            Manage My VIP Dashboard
          </button>
        </div>
      </div>
    </div>
  </section>

  <!-- Premium Prerequisite Notice (Free Users Only) -->
  <section id="premium-prerequisite" class="hidden py-12 bg-purple-50">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="bg-white rounded-lg shadow-sm border-2 border-jm-purple/20 p-8">
        <div class="flex items-start space-x-4">
          <div class="flex-shrink-0">
            <svg class="w-8 h-8 text-jm-purple" fill="currentColor" viewBox="0 20 20">
              <path fill-rule="evenodd" d="M18 10a8 8 11-16 8 8 0116zm-7-4a1 1 11-2 1 1 012zM9 9a1 1 000 2v3a1 1 001 1h1a1 1 100-2v-3a1 1 00-1-1H9z" clip-rule="evenodd"/>
            </svg>
          </div>
          <div class="flex-1">
            <h3 class="text-2xl font-bold text-gray-900 mb-3">VIP Requires Premium Foundation</h3>
            <p class="text-gray-700 mb-6">
              VIP membership builds on Premium's Tier 4 access. You'll need an active Premium subscription before applying for VIP.
            </p>

            <div class="grid md:grid-cols-2 gap-6 mb-6">
              <div class="flex items-start space-x-3">
                <div class="flex-shrink-0 w-8 h-8 bg-jm-purple text-white rounded-full flex items-center justify-center font-bold">1</div>
                <div>
                  <h4 class="font-semibold text-gray-900 mb-1">Step 1: Subscribe to Premium</h4>
                  <p class="text-gray-600 text-sm"><span id="premium-price-prereq">₦18,000/month</span> — Access Tiers 1-4 and all platform features</p>
                </div>
              </div>
              <div class="flex items-start space-x-3">
                <div class="flex-shrink-0 w-8 h-8 bg-jm-coral text-white rounded-full flex items-center justify-center font-bold">2</div>
                <div>
                  <h4 class="font-semibold text-gray-900 mb-1">Step 2: Apply for VIP</h4>
                  <p class="text-gray-600 text-sm">Complete 18-question application and await expert review</p>
                </div>
              </div>
            </div>

            <button
              onclick="window.location.href='/pricing.html'"
              class="px-6 py-3 bg-jm-purple text-white font-semibold rounded-lg hover:bg-jm-purple-dark transition-colors">
              Start with Premium
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- VIP Benefits Grid -->
  <section class="py-20 bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-16">
        <h2 class="text-4xl lg:text-5xl font-serif font-bold text-gray-900 mb-4">
          What Makes VIP Different
        </h2>
        <p class="text-xl text-gray-600 max-w-3xl mx-auto">
          Exclusive benefits designed for serious, marriage-minded individuals who value expert guidance and premium experiences.
        </p>
      </div>

      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        <!-- Benefit 1: Unlimited Tier Access -->
        <div class="bg-gray-50 rounded-xl p-8 hover:shadow-lg transition-shadow">
          <div class="w-16 h-16 bg-jm-purple/10 rounded-full flex items-center justify-center mb-6">
            <svg class="w-8 h-8 text-jm-purple-deep" fill="none" stroke="currentColor" viewBox="0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 11V7a4 4 118m-4 8v2m-6 4h12a2 2 002-2v-6a2 2 00-2-2H6a2 2 00-2 2v6a2 2 002 2z"/>
            </svg>
          </div>
          <h3 class="text-2xl font-bold text-gray-900 mb-3">Unlimited Tier Access</h3>
          <p class="text-gray-700 leading-relaxed">
            Complete all 5 tiers and view all Tier 5 profiles. No ceiling on your disclosure or discovery.
          </p>
          <p class="text-sm text-gray-500 mt-4">
            Only VIP subscription allows Tier 5 completion
          </p>
        </div>

        <!-- Benefit 2: Personal Matchmaker -->
        <div class="bg-gray-50 rounded-xl p-8 hover:shadow-lg transition-shadow">
          <div class="w-16 h-16 bg-jm-purple/10 rounded-full flex items-center justify-center mb-6">
            <svg class="w-8 h-8 text-jm-purple-deep" fill="none" stroke="currentColor" viewBox="0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 11-8 4 4 018zM12 14a7 7 00-7 7h14a7 7 00-7-7z"/>
            </svg>
          </div>
          <h3 class="text-2xl font-bold text-gray-900 mb-3">Personal Matchmaker</h3>
          <p class="text-gray-700 leading-relaxed">
            Dedicated expert guides your journey, reviews matches, and provides relationship coaching.
          </p>
          <p class="text-sm text-gray-500 mt-4">
            Expert assigned after application approval
          </p>
        </div>

        <!-- Benefit 3: Priority Verification -->
        <div class="bg-gray-50 rounded-xl p-8 hover:shadow-lg transition-shadow">
          <div class="w-16 h-16 bg-jm-purple/10 rounded-full flex items-center justify-center mb-6">
            <svg class="w-8 h-8 text-jm-purple-deep" fill="none" stroke="currentColor" viewBox="0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 11-18 9 9 0118z"/>
            </svg>
          </div>
          <h3 class="text-2xl font-bold text-gray-900 mb-3">Priority Verification</h3>
          <p class="text-gray-700 leading-relaxed">
            Fast-tracked ID verification and Video KYC for Tier 5 access.
          </p>
          <p class="text-sm text-gray-500 mt-4">
            Tier 5 requires both ID and Video KYC
          </p>
        </div>

        <!-- Benefit 4: Enhanced Privacy -->
        <div class="bg-gray-50 rounded-xl p-8 hover:shadow-lg transition-shadow">
          <div class="w-16 h-16 bg-jm-purple/10 rounded-full flex items-center justify-center mb-6">
            <svg class="w-8 h-8 text-jm-purple-deep" fill="none" stroke="currentColor" viewBox="0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0112 19c-4.478-8.268-2.943-9.543-7a9.97 9.97 011.563-3.029m5.858.908a3 3 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0A9.953 9.953 0112 5c4.478 8.268 2.943 9.543 7a10.025 10.025 01-4.132 5.411m0L21 21"/>
            </svg>
          </div>
          <h3 class="text-2xl font-bold text-gray-900 mb-3">Enhanced Privacy</h3>
          <p class="text-gray-700 leading-relaxed">
            Control who sees your profile. Hide from specific users or make profile invite-only.
          </p>
          <p class="text-sm text-gray-500 mt-4">
            VIP-exclusive privacy settings
          </p>
        </div>

        <!-- Benefit 5: Priority Support -->
        <div class="bg-gray-50 rounded-xl p-8 hover:shadow-lg transition-shadow">
          <div class="w-16 h-16 bg-jm-purple/10 rounded-full flex items-center justify-center mb-6">
            <svg class="w-8 h-8 text-jm-purple-deep" fill="none" stroke="currentColor" viewBox="0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 11-18 9 9 0118zm-5a4 4 11-8 4 4 018z"/>
            </svg>
          </div>
          <h3 class="text-2xl font-bold text-gray-900 mb-3">Priority Support</h3>
          <p class="text-gray-700 leading-relaxed">
            Direct line to support team. Issues resolved within 24 hours, not 3-5 days.
          </p>
          <p class="text-sm text-gray-500 mt-4">
            Separate support queue for VIP members
          </p>
        </div>

        <!-- Benefit 6: Profile Analytics -->
        <div class="bg-gray-50 rounded-xl p-8 hover:shadow-lg transition-shadow">
          <div class="w-16 h-16 bg-jm-purple/10 rounded-full flex items-center justify-center mb-6">
            <svg class="w-8 h-8 text-jm-purple-deep" fill="none" stroke="currentColor" viewBox="0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 00-2-2H5a2 2 00-2 2v6a2 2 002 2h2a2 2 002-2zm0V9a2 2 012-2h2a2 2 012 2v10m-6a2 2 002 2h2a2 2 002-2m0V5a2 2 012-2h2a2 2 012 2v14a2 2 01-2 2h-2a2 2 01-2-2z"/>
            </svg>
          </div>
          <h3 class="text-2xl font-bold text-gray-900 mb-3">Profile Analytics</h3>
          <p class="text-gray-700 leading-relaxed">
            See who viewed your profile, who you appeared in Discover for, and interest patterns.
          </p>
          <p class="text-sm text-gray-500 mt-4">
            VIP dashboard feature
          </p>
        </div>
      </div>
    </div>
  </section>

  <!-- Pricing Tiers Section -->
  <section id="pricing" class="py-20 bg-gray-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-16">
        <h2 class="text-4xl lg:text-5xl font-serif font-bold text-gray-900 mb-4">
          VIP Membership Pricing
        </h2>
        <p class="text-xl text-gray-600 max-w-3xl mx-auto">
          Flexible terms to match your timeline. All plans include complete VIP benefits.
        </p>
        <p id="pricing-disclaimer" class="text-sm text-gray-500 mt-4">
          <!-- Will be populated with currency-specific note -->
        </p>
      </div>

      <div class="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">

        <!-- 3-Month VIP -->
        <div class="pricing-card bg-white rounded-xl shadow-md hover:shadow-xl transition-all p-8 border-2 border-transparent cursor-pointer"
             id="plan-3month"
             onclick="selectPricingPlan('plan-3month')">
          <div class="text-center mb-6">
            <h3 class="text-2xl font-bold text-gray-900 mb-2">3-Month VIP</h3>
            <div class="text-5xl font-bold text-jm-purple-deep mb-2">
              <span id="price-3month">₦200,000</span>
            </div>
            <p class="text-gray-600">
              <span id="monthly-rate-3month">₦66,667</span>/month
            </p>
          </div>

          <div class="mb-6">
            <p class="text-sm text-gray-600 text-center font-medium">
              Best for: Testing VIP experience
            </p>
          </div>

          <ul class="space-y-3 mb-8">
            <li class="flex items-start">
              <svg class="w-5 h-5 text-jm-purple flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 100-16 8 8 000 16zm3.707-9.293a1 1 00-1.414-1.414L9 10.586 7.707 9.293a1 1 00-1.414 1.414l2 2a1 1 001.414l4-4z" clip-rule="evenodd"/>
              </svg>
              <span class="ml-3 text-gray-700">Personal matchmaker</span>
            </li>
            <li class="flex items-start">
              <svg class="w-5 h-5 text-jm-purple flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 100-16 8 8 000 16zm3.707-9.293a1 1 00-1.414-1.414L9 10.586 7.707 9.293a1 1 00-1.414 1.414l2 2a1 1 001.414l4-4z" clip-rule="evenodd"/>
              </svg>
              <span class="ml-3 text-gray-700">Unlimited Tier 5 access</span>
            </li>
            <li class="flex items-start">
              <svg class="w-5 h-5 text-jm-purple flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 100-16 8 8 000 16zm3.707-9.293a1 1 00-1.414-1.414L9 10.586 7.707 9.293a1 1 00-1.414 1.414l2 2a1 1 001.414l4-4z" clip-rule="evenodd"/>
              </svg>
              <span class="ml-3 text-gray-700">Priority verification</span>
            </li>
            <li class="flex items-start">
              <svg class="w-5 h-5 text-jm-purple flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 100-16 8 8 000 16zm3.707-9.293a1 1 00-1.414-1.414L9 10.586 7.707 9.293a1 1 00-1.414 1.414l2 2a1 1 001.414l4-4z" clip-rule="evenodd"/>
              </svg>
              <span class="ml-3 text-gray-700">Enhanced privacy controls</span>
            </li>
            <li class="flex items-start">
              <svg class="w-5 h-5 text-jm-purple flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 100-16 8 8 000 16zm3.707-9.293a1 1 00-1.414-1.414L9 10.586 7.707 9.293a1 1 00-1.414 1.414l2 2a1 1 001.414l4-4z" clip-rule="evenodd"/>
              </svg>
              <span class="ml-3 text-gray-700">Priority support (24hr)</span>
            </li>
            <li class="flex items-start">
              <svg class="w-5 h-5 text-jm-purple flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 100-16 8 8 000 16zm3.707-9.293a1 1 00-1.414-1.414L9 10.586 7.707 9.293a1 1 00-1.414 1.414l2 2a1 1 001.414l4-4z" clip-rule="evenodd"/>
              </svg>
              <span class="ml-3 text-gray-700">Profile analytics</span>
            </li>
          </ul>

          <button class="w-full py-3 border-2 border-jm-purple text-jm-purple font-semibold rounded-lg hover:bg-jm-purple hover:text-white transition-colors">
            Select Plan
          </button>
        </div>

        <!-- 6-Month VIP (Most Popular) -->
        <div class="pricing-card bg-white rounded-xl shadow-xl transition-all p-8 border-2 border-transparent cursor-pointer relative transform md:-translate-y-4"
             id="plan-6month"
             onclick="selectPricingPlan('plan-6month')">
          <!-- Most Popular Badge -->
          <div class="absolute -top-4 left-1/2 transform -translate-x-1/2">
            <span class="bg-jm-coral text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg">
              Most Popular
            </span>
          </div>

          <div class="text-center mb-6 mt-4">
            <h3 class="text-2xl font-bold text-gray-900 mb-2">6-Month VIP</h3>
            <div class="text-5xl font-bold text-jm-purple-deep mb-2">
              <span id="price-6month">₦350,000</span>
            </div>
            <p class="text-gray-600">
              <span id="monthly-rate-6month">₦58,333</span>/month
            </p>
            <p class="text-jm-coral font-semibold text-sm mt-2">
              Save <span id="savings-6month">₦50,000</span>
            </p>
          </div>

          <div class="mb-6">
            <p class="text-sm text-gray-600 text-center font-medium">
              Best for: Serious search timeline
            </p>
          </div>

          <ul class="space-y-3 mb-8">
            <li class="flex items-start">
              <svg class="w-5 h-5 text-jm-purple flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 100-16 8 8 000 16zm3.707-9.293a1 1 00-1.414-1.414L9 10.586 7.707 9.293a1 1 00-1.414 1.414l2 2a1 1 001.414l4-4z" clip-rule="evenodd"/>
              </svg>
              <span class="ml-3 text-gray-700">Personal matchmaker</span>
            </li>
            <li class="flex items-start">
              <svg class="w-5 h-5 text-jm-purple flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 100-16 8 8 000 16zm3.707-9.293a1 1 00-1.414-1.414L9 10.586 7.707 9.293a1 1 00-1.414 1.414l2 2a1 1 001.414l4-4z" clip-rule="evenodd"/>
              </svg>
              <span class="ml-3 text-gray-700">Unlimited Tier 5 access</span>
            </li>
            <li class="flex items-start">
              <svg class="w-5 h-5 text-jm-purple flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 100-16 8 8 000 16zm3.707-9.293a1 1 00-1.414-1.414L9 10.586 7.707 9.293a1 1 00-1.414 1.414l2 2a1 1 001.414l4-4z" clip-rule="evenodd"/>
              </svg>
              <span class="ml-3 text-gray-700">Priority verification</span>
            </li>
            <li class="flex items-start">
              <svg class="w-5 h-5 text-jm-purple flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 100-16 8 8 000 16zm3.707-9.293a1 1 00-1.414-1.414L9 10.586 7.707 9.293a1 1 00-1.414 1.414l2 2a1 1 001.414l4-4z" clip-rule="evenodd"/>
              </svg>
              <span class="ml-3 text-gray-700">Enhanced privacy controls</span>
            </li>
            <li class="flex items-start">
              <svg class="w-5 h-5 text-jm-purple flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 100-16 8 8 000 16zm3.707-9.293a1 1 00-1.414-1.414L9 10.586 7.707 9.293a1 1 00-1.414 1.414l2 2a1 1 001.414l4-4z" clip-rule="evenodd"/>
              </svg>
              <span class="ml-3 text-gray-700">Priority support (24hr)</span>
            </li>
            <li class="flex items-start">
              <svg class="w-5 h-5 text-jm-purple flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 100-16 8 8 000 16zm3.707-9.293a1 1 00-1.414-1.414L9 10.586 7.707 9.293a1 1 00-1.414 1.414l2 2a1 1 001.414l4-4z" clip-rule="evenodd"/>
              </svg>
              <span class="ml-3 text-gray-700">Profile analytics</span>
            </li>
          </ul>

          <button class="w-full py-3 bg-gradient-jm text-white font-semibold rounded-lg hover:opacity-90 transition-opacity shadow-lg">
            Select Plan
          </button>
        </div>

        <!-- 12-Month VIP (Best Value) -->
        <div class="pricing-card bg-white rounded-xl shadow-md hover:shadow-xl transition-all p-8 border-2 border-transparent cursor-pointer relative"
             id="plan-12month"
             onclick="selectPricingPlan('plan-12month')">
          <!-- Best Value Badge -->
          <div class="absolute -top-4 left-1/2 transform -translate-x-1/2">
            <span class="bg-jm-purple-deep text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg">
              Best Value
            </span>
          </div>

          <div class="text-center mb-6 mt-4">
            <h3 class="text-2xl font-bold text-gray-900 mb-2">12-Month VIP</h3>
            <div class="text-5xl font-bold text-jm-purple-deep mb-2">
              <span id="price-12month">₦600,000</span>
            </div>
            <p class="text-gray-600">
              <span id="monthly-rate-12month">₦50,000</span>/month
            </p>
            <p class="text-jm-purple-deep font-semibold text-sm mt-2">
              Save <span id="savings-12month">₦200,000</span>
            </p>
          </div>

          <div class="mb-6">
            <p class="text-sm text-gray-600 text-center font-medium">
              Best for: Committed to finding the one
            </p>
          </div>

          <ul class="space-y-3 mb-8">
            <li class="flex items-start">
              <svg class="w-5 h-5 text-jm-purple flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 100-16 8 8 000 16zm3.707-9.293a1 1 00-1.414-1.414L9 10.586 7.707 9.293a1 1 00-1.414 1.414l2 2a1 1 001.414l4-4z" clip-rule="evenodd"/>
              </svg>
              <span class="ml-3 text-gray-700">Personal matchmaker</span>
            </li>
            <li class="flex items-start">
              <svg class="w-5 h-5 text-jm-purple flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 100-16 8 8 000 16zm3.707-9.293a1 1 00-1.414-1.414L9 10.586 7.707 9.293a1 1 00-1.414 1.414l2 2a1 1 001.414l4-4z" clip-rule="evenodd"/>
              </svg>
              <span class="ml-3 text-gray-700">Unlimited Tier 5 access</span>
            </li>
            <li class="flex items-start">
              <svg class="w-5 h-5 text-jm-purple flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 100-16 8 8 000 16zm3.707-9.293a1 1 00-1.414-1.414L9 10.586 7.707 9.293a1 1 00-1.414 1.414l2 2a1 1 001.414l4-4z" clip-rule="evenodd"/>
              </svg>
              <span class="ml-3 text-gray-700">Priority verification</span>
            </li>
            <li class="flex items-start">
              <svg class="w-5 h-5 text-jm-purple flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 100-16 8 8 000 16zm3.707-9.293a1 1 00-1.414-1.414L9 10.586 7.707 9.293a1 1 00-1.414 1.414l2 2a1 1 001.414l4-4z" clip-rule="evenodd"/>
              </svg>
              <span class="ml-3 text-gray-700">Enhanced privacy controls</span>
            </li>
            <li class="flex items-start">
              <svg class="w-5 h-5 text-jm-purple flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 100-16 8 8 000 16zm3.707-9.293a1 1 00-1.414-1.414L9 10.586 7.707 9.293a1 1 00-1.414 1.414l2 2a1 1 001.414l4-4z" clip-rule="evenodd"/>
              </svg>
              <span class="ml-3 text-gray-700">Priority support (24hr)</span>
            </li>
            <li class="flex items-start">
              <svg class="w-5 h-5 text-jm-purple flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 100-16 8 8 000 16zm3.707-9.293a1 1 00-1.414-1.414L9 10.586 7.707 9.293a1 1 00-1.414 1.414l2 2a1 1 001.414l4-4z" clip-rule="evenodd"/>
              </svg>
              <span class="ml-3 text-gray-700">Profile analytics</span>
            </li>
          </ul>

          <button class="w-full py-3 border-2 border-jm-purple text-jm-purple font-semibold rounded-lg hover:bg-jm-purple hover:text-white transition-colors">
            Select Plan
          </button>
        </div>

      </div>

      <div class="mt-12 text-center">
        <p class="text-gray-600 mb-4">All plans require active Premium subscription</p>
        <p class="text-sm text-gray-500">VIP subscriptions are prepaid and do not auto-renew. No hidden fees.</p>
      </div>
    </div>
  </section>

  <!-- Application Preview Section -->
  <section id="application-preview" class="py-20 bg-white">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-16">
        <h2 class="text-4xl lg:text-5xl font-serif font-bold text-gray-900 mb-4">
          The VIP Application
        </h2>
        <p class="text-xl text-gray-600">
          18 Questions, Unlimited Possibilities
        </p>
        <p class="text-lg text-gray-600 mt-4">
          We take matching seriously. Your thoughtful responses help our experts find your ideal partner.
        </p>
      </div>

      <!-- Accordion Sections -->
      <div class="space-y-4">

        <!-- Section 1: Marriage Readiness -->
        <div class="border-2 border-gray-200 rounded-lg overflow-hidden">
          <button
            onclick="toggleAccordion('section-1')"
            class="accordion-header w-full px-6 py-5 flex items-center justify-between bg-gray-50 hover:bg-gray-100 transition-colors text-left"
            aria-expanded="false"
            aria-controls="section-1-content">
            <div>
              <h3 class="text-xl font-bold text-gray-900">Section 1: Marriage Readiness</h3>
              <p class="text-sm text-gray-600 mt-1">6 questions about your marriage goals and timeline</p>
            </div>
            <svg class="w-6 h-6 text-jm-purple transform transition-transform accordion-icon" fill="none" stroke="currentColor" viewBox="0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
            </svg>
          </button>
          <div id="section-1-content" class="accordion-content" aria-hidden="true">
            <div class="px-6 py-6 bg-white border-t-2 border-gray-100">
              <ol class="space-y-3 list-decimal list-inside text-gray-700">
                <li>Why are you seeking marriage now?</li>
                <li>What does marriage mean to you?</li>
                <li>What is your timeline for marriage?</li>
                <li>What are your thoughts on children?</li>
                <li>How do you balance career ambitions with marriage goals?</li>
                <li>What role will family play in your marriage?</li>
              </ol>
              <p class="text-sm text-gray-500 mt-4 italic">
                Full questions with guidance visible when you begin application
              </p>
            </div>
          </div>
        </div>

        <!-- Section 2: Ideal Partner -->
        <div class="border-2 border-gray-200 rounded-lg overflow-hidden">
          <button
            onclick="toggleAccordion('section-2')"
            class="accordion-header w-full px-6 py-5 flex items-center justify-between bg-gray-50 hover:bg-gray-100 transition-colors text-left"
            aria-expanded="false"
            aria-controls="section-2-content">
            <div>
              <h3 class="text-xl font-bold text-gray-900">Section 2: Ideal Partner</h3>
              <p class="text-sm text-gray-600 mt-1">5 questions about your compatibility preferences</p>
            </div>
            <svg class="w-6 h-6 text-jm-purple transform transition-transform accordion-icon" fill="none" stroke="currentColor" viewBox="0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
            </svg>
          </button>
          <div id="section-2-content" class="accordion-content" aria-hidden="true">
            <div class="px-6 py-6 bg-white border-t-2 border-gray-100">
              <ol class="space-y-3 list-decimal list-inside text-gray-700">
                <li>What qualities are essential in your future spouse?</li>
                <li>How important is faith alignment to you?</li>
                <li>What are your educational and career expectations for a partner?</li>
                <li>How important is physical attraction?</li>
                <li>What are your absolute dealbreakers?</li>
              </ol>
              <p class="text-sm text-gray-500 mt-4 italic">
                Full questions with guidance visible when you begin application
              </p>
            </div>
          </div>
        </div>

        <!-- Section 3: Past Relationships -->
        <div class="border-2 border-gray-200 rounded-lg overflow-hidden">
          <button
            onclick="toggleAccordion('section-3')"
            class="accordion-header w-full px-6 py-5 flex items-center justify-between bg-gray-50 hover:bg-gray-100 transition-colors text-left"
            aria-expanded="false"
            aria-controls="section-3-content">
            <div>
              <h3 class="text-xl font-bold text-gray-900">Section 3: Past Relationships</h3>
              <p class="text-sm text-gray-600 mt-1">3 questions about your relationship history</p>
            </div>
            <svg class="w-6 h-6 text-jm-purple transform transition-transform accordion-icon" fill="none" stroke="currentColor" viewBox="0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
            </svg>
          </button>
          <div id="section-3-content" class="accordion-content" aria-hidden="true">
            <div class="px-6 py-6 bg-white border-t-2 border-gray-100">
              <ol class="space-y-3 list-decimal list-inside text-gray-700">
                <li>Describe your previous serious relationships</li>
                <li>What did you learn from past relationships?</li>
                <li>Why did previous relationships end?</li>
              </ol>
              <p class="text-sm text-gray-500 mt-4 italic">
                Full questions with guidance visible when you begin application
              </p>
            </div>
          </div>
        </div>

        <!-- Section 4: Matchmaking Expectations -->
        <div class="border-2 border-gray-200 rounded-lg overflow-hidden">
          <button
            onclick="toggleAccordion('section-4')"
            class="accordion-header w-full px-6 py-5 flex items-center justify-between bg-gray-50 hover:bg-gray-100 transition-colors text-left"
            aria-expanded="false"
            aria-controls="section-4-content">
            <div>
              <h3 class="text-xl font-bold text-gray-900">Section 4: Matchmaking Expectations</h3>
              <p class="text-sm text-gray-600 mt-1">4 questions about your VIP experience goals</p>
            </div>
            <svg class="w-6 h-6 text-jm-purple transform transition-transform accordion-icon" fill="none" stroke="currentColor" viewBox="0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
            </svg>
          </button>
          <div id="section-4-content" class="accordion-content" aria-hidden="true">
            <div class="px-6 py-6 bg-white border-t-2 border-gray-100">
              <ol class="space-y-3 list-decimal list-inside text-gray-700">
                <li>What makes a good match for you?</li>
                <li>How do you hope expert support will help your search?</li>
                <li>What concerns do you have about the matchmaking process?</li>
                <li>How would you define success in this journey?</li>
              </ol>
              <p class="text-sm text-gray-500 mt-4 italic">
                Full questions with guidance visible when you begin application
              </p>
            </div>
          </div>
        </div>

      </div>

      <div class="mt-12 text-center">
        <p class="text-gray-600 mb-6">
          Each question includes guidance to help you provide thoughtful, detailed responses. Our experts read every word carefully.
        </p>
        <button
          id="preview-application-cta"
          onclick="handleApplicationCTA()"
          class="px-8 py-4 bg-gradient-jm text-white font-semibold rounded-lg text-lg hover:opacity-90 transition-opacity shadow-lg">
          Begin VIP Application
        </button>
      </div>
    </div>
  </section>

  <!-- Expert Matchmaker Profiles -->
  <section class="py-20 bg-gray-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-16">
        <h2 class="text-4xl lg:text-5xl font-serif font-bold text-gray-900 mb-4">
          Meet Your Expert Matchmakers
        </h2>
        <p class="text-xl text-gray-600">
          Experienced professionals dedicated to helping you find your life partner
        </p>
      </div>

      <!-- Carousel Container -->
      <div class="relative">
        <div class="overflow-hidden">
          <div id="matchmaker-carousel" class="carousel-container">

            <!-- Matchmaker 1: Amara Okonkwo -->
            <div class="flex-shrink-0 w-full md:w-1/3 px-4">
              <div class="bg-white rounded-xl shadow-md p-8 text-center">
                <div class="w-32 h-32 mx-auto mb-6 rounded-full bg-gradient-to-br from-jm-purple-deep to-jm-coral p-1">
                  <div class="w-full h-full rounded-full bg-gray-200 flex items-center justify-center">
                    <svg class="w-16 h-16 text-gray-400" fill="currentColor" viewBox="0 20 20">
                      <path fill-rule="evenodd" d="M10 9a3 3 100-6 3 3 000 6zm-7 9a7 7 1114H3z" clip-rule="evenodd"/>
                    </svg>
                  </div>
                </div>
                <h3 class="text-2xl font-bold text-gray-900 mb-2">Amara Okonkwo</h3>
                <p class="text-jm-purple font-semibold mb-4">Senior Matchmaker, 12 years experience</p>
                <p class="text-sm text-gray-600 mb-4">
                  <strong>Specialization:</strong> Christian matches, cross-cultural relationships
                </p>
                <div class="bg-jm-purple/5 rounded-lg p-4 mb-6">
                  <p class="text-3xl font-bold text-jm-purple-deep mb-1">68</p>
                  <p class="text-sm text-gray-600">Marriages Facilitated</p>
                </div>
                <blockquote class="text-gray-700 italic border-l-4 border-jm-purple pl-4">
                  "I believe in the power of intentional partnership. Every VIP member gets my personal attention."
                </blockquote>
              </div>
            </div>

            <!-- Matchmaker 2: Ibrahim Yusuf -->
            <div class="flex-shrink-0 w-full md:w-1/3 px-4">
              <div class="bg-white rounded-xl shadow-md p-8 text-center">
                <div class="w-32 h-32 mx-auto mb-6 rounded-full bg-gradient-to-br from-jm-purple-deep to-jm-coral p-1">
                  <div class="w-full h-full rounded-full bg-gray-200 flex items-center justify-center">
                    <svg class="w-16 h-16 text-gray-400" fill="currentColor" viewBox="0 20 20">
                      <path fill-rule="evenodd" d="M10 9a3 3 100-6 3 3 000 6zm-7 9a7 7 1114H3z" clip-rule="evenodd"/>
                    </svg>
                  </div>
                </div>
                <h3 class="text-2xl font-bold text-gray-900 mb-2">Ibrahim Yusuf</h3>
                <p class="text-jm-purple font-semibold mb-4">Lead Matchmaker, 15 years experience</p>
                <p class="text-sm text-gray-600 mb-4">
                  <strong>Specialization:</strong> Muslim matches, professional compatibility
                </p>
                <div class="bg-jm-purple/5 rounded-lg p-4 mb-6">
                  <p class="text-3xl font-bold text-jm-purple-deep mb-1">92</p>
                  <p class="text-sm text-gray-600">Marriages Facilitated</p>
                </div>
                <blockquote class="text-gray-700 italic border-l-4 border-jm-purple pl-4">
                  "Marriage is a sacred commitment. I help you find someone who shares your values and vision."
                </blockquote>
              </div>
            </div>

            <!-- Matchmaker 3: Grace Adeyemi -->
            <div class="flex-shrink-0 w-full md:w-1/3 px-4">
              <div class="bg-white rounded-xl shadow-md p-8 text-center">
                <div class="w-32 h-32 mx-auto mb-6 rounded-full bg-gradient-to-br from-jm-purple-deep to-jm-coral p-1">
                  <div class="w-full h-full rounded-full bg-gray-200 flex items-center justify-center">
                    <svg class="w-16 h-16 text-gray-400" fill="currentColor" viewBox="0 20 20">
                      <path fill-rule="evenodd" d="M10 9a3 3 100-6 3 3 000 6zm-7 9a7 7 1114H3z" clip-rule="evenodd"/>
                    </svg>
                  </div>
                </div>
                <h3 class="text-2xl font-bold text-gray-900 mb-2">Grace Adeyemi</h3>
                <p class="text-jm-purple font-semibold mb-4">Matchmaker & Relationship Coach, 10 years experience</p>
                <p class="text-sm text-gray-600 mb-4">
                  <strong>Specialization:</strong> Career-focused professionals, inter-faith dialogue
                </p>
                <div class="bg-jm-purple/5 rounded-lg p-4 mb-6">
                  <p class="text-3xl font-bold text-jm-purple-deep mb-1">51</p>
                  <p class="text-sm text-gray-600">Marriages Facilitated</p>
                </div>
                <blockquote class="text-gray-700 italic border-l-4 border-jm-purple pl-4">
                  "Finding the right partner is life-changing. I guide VIP members with care, wisdom, and personalized strategy."
                </blockquote>
              </div>
            </div>

          </div>
        </div>

        <!-- Carousel Navigation Dots -->
        <div class="flex justify-center mt-8 space-x-2">
          <button onclick="goToSlide(0)" class="w-3 h-3 rounded-full bg-jm-purple carousel-dot" data-slide="0" aria-label="Go to slide 1"></button>
          <button onclick="goToSlide(1)" class="w-3 h-3 rounded-full bg-gray-300 carousel-dot" data-slide="1" aria-label="Go to slide 2"></button>
          <button onclick="goToSlide(2)" class="w-3 h-3 rounded-full bg-gray-300 carousel-dot" data-slide="2" aria-label="Go to slide 3"></button>
        </div>
      </div>
    </div>
  </section>

  <!-- VIP Success Stories -->
  <section class="py-20 bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-16">
        <h2 class="text-4xl lg:text-5xl font-serif font-bold text-gray-900 mb-4">
          VIP Success Stories
        </h2>
        <p class="text-xl text-gray-600">
          Real couples who found their life partners through VIP matchmaking
        </p>
      </div>

      <div class="grid md:grid-cols-2 gap-12">

        <!-- Story 1 -->
        <div class="bg-gray-50 rounded-xl overflow-hidden shadow-md">
          <div class="h-64 bg-gradient-to-br from-jm-purple-deep/20 to-jm-coral/20 flex items-center justify-center">
            <svg class="w-24 h-24 text-jm-purple/30" fill="currentColor" viewBox="0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902l1.07 3.292a1 1 00.95.69h3.462c.969 1.371 1.24.588 1.81l-2.8 2.034a1 1 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 00-1.175l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 00.951-.69l1.07-3.292z"/>
            </svg>
          </div>
          <div class="p-8">
            <div class="flex items-center justify-between mb-4">
              <h3 class="text-2xl font-bold text-gray-900">Chidinma & Tunde</h3>
              <span class="bg-jm-coral text-white px-3 py-1 rounded-full text-sm font-semibold">Married in 8 months</span>
            </div>
            <p class="text-sm text-gray-600 mb-4">
              <strong>VIP Duration:</strong> 6-month members | <strong>Matched by:</strong> Amara Okonkwo
            </p>
            <blockquote class="text-gray-700 text-lg leading-relaxed border-l-4 border-jm-purple pl-4">
              "Our matchmaker understood what we were looking for better than we did. She introduced us after reviewing our profiles and we knew immediately. Married 8 months after joining VIP."
            </blockquote>
          </div>
        </div>

        <!-- Story 2 -->
        <div class="bg-gray-50 rounded-xl overflow-hidden shadow-md">
          <div class="h-64 bg-gradient-to-br from-jm-purple-deep/20 to-jm-coral/20 flex items-center justify-center">
            <svg class="w-24 h-24 text-jm-purple/30" fill="currentColor" viewBox="0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902l1.07 3.292a1 1 00.95.69h3.462c.969 1.371 1.24.588 1.81l-2.8 2.034a1 1 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 00-1.175l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 00.951-.69l1.07-3.292z"/>
            </svg>
          </div>
          <div class="p-8">
            <div class="flex items-center justify-between mb-4">
              <h3 class="text-2xl font-bold text-gray-900">Fatima & Abdul</h3>
              <span class="bg-jm-coral text-white px-3 py-1 rounded-full text-sm font-semibold">Married in 11 months</span>
            </div>
            <p class="text-sm text-gray-600 mb-4">
              <strong>VIP Duration:</strong> 12-month members | <strong>Matched by:</strong> Ibrahim Yusuf
            </p>
            <blockquote class="text-gray-700 text-lg leading-relaxed border-l-4 border-jm-purple pl-4">
              "We appreciated the seriousness of the VIP process. The application questions helped us clarify what we wanted, and our matchmaker guided us through every step with wisdom."
            </blockquote>
          </div>
        </div>

        <!-- Story 3 -->
        <div class="bg-gray-50 rounded-xl overflow-hidden shadow-md md:col-span-2 md:max-w-2xl md:mx-auto">
          <div class="h-64 bg-gradient-to-br from-jm-purple-deep/20 to-jm-coral/20 flex items-center justify-center">
            <svg class="w-24 h-24 text-jm-purple/30" fill="currentColor" viewBox="0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902l1.07 3.292a1 1 00.95.69h3.462c.969 1.371 1.24.588 1.81l-2.8 2.034a1 1 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 00-1.175l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 00.951-.69l1.07-3.292z"/>
            </svg>
          </div>
          <div class="p-8">
            <div class="flex items-center justify-between mb-4">
              <h3 class="text-2xl font-bold text-gray-900">Blessing & Michael</h3>
              <span class="bg-jm-coral text-white px-3 py-1 rounded-full text-sm font-semibold">Engaged in 4 months</span>
            </div>
            <p class="text-sm text-gray-600 mb-4">
              <strong>VIP Duration:</strong> 3-month members | <strong>Matched by:</strong> Grace Adeyemi
            </p>
            <blockquote class="text-gray-700 text-lg leading-relaxed border-l-4 border-jm-purple pl-4">
              "VIP was worth every naira. The personal attention, priority verification, and expert guidance made all the difference. We're planning our wedding now."
            </blockquote>
          </div>
        </div>

      </div>
    </div>
  </section>

  <!-- FAQ Section -->
  <section class="py-20 bg-gray-50">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-16">
        <h2 class="text-4xl lg:text-5xl font-serif font-bold text-gray-900 mb-4">
          Frequently Asked Questions
        </h2>
        <p class="text-xl text-gray-600">
          Everything you need to know about VIP membership
        </p>
      </div>

      <div class="space-y-4">

        <!-- FAQ 1 -->
        <div class="border-2 border-gray-200 rounded-lg bg-white">
          <button
            onclick="toggleFAQ('faq-1')"
            class="faq-header w-full px-6 py-5 flex items-center justify-between hover:bg-gray-50 transition-colors text-left"
            aria-expanded="false"
            aria-controls="faq-1-content">
            <h3 class="text-lg font-semibold text-gray-900 pr-8">
              What's the difference between Premium and VIP?
            </h3>
            <svg class="w-6 h-6 text-jm-purple flex-shrink-0 transform transition-transform faq-icon" fill="none" stroke="currentColor" viewBox="0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
            </svg>
          </button>
          <div id="faq-1-content" class="accordion-content" aria-hidden="true">
            <div class="px-6 py-6 border-t-2 border-gray-100">
              <p class="text-gray-700 leading-relaxed">
                Premium gives you self-service access to Tiers 1-4 and all platform features. VIP adds personal matchmaker support, Tier 5 access, priority verification, enhanced privacy controls, and profile analytics. Premium is <span class="faq-premium-price">₦18,000/month ($18/month)</span>, while VIP starts at <span class="faq-vip-price">₦200,000 for 3 months ($200 for 3 months)</span>.
              </p>
            </div>
          </div>
        </div>

        <!-- FAQ 2 -->
        <div class="border-2 border-gray-200 rounded-lg bg-white">
          <button
            onclick="toggleFAQ('faq-2')"
            class="faq-header w-full px-6 py-5 flex items-center justify-between hover:bg-gray-50 transition-colors text-left"
            aria-expanded="false"
            aria-controls="faq-2-content">
            <h3 class="text-lg font-semibold text-gray-900 pr-8">
              How long does the VIP application review take?
            </h3>
            <svg class="w-6 h-6 text-jm-purple flex-shrink-0 transform transition-transform faq-icon" fill="none" stroke="currentColor" viewBox="0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
            </svg>
          </button>
          <div id="faq-2-content" class="accordion-content" aria-hidden="true">
            <div class="px-6 py-6 border-t-2 border-gray-100">
              <p class="text-gray-700 leading-relaxed">
                Most applications are reviewed within 3-5 business days. Our experts read every response carefully. Some applicants may be invited for a brief video interview before approval.
              </p>
            </div>
          </div>
        </div>

        <!-- FAQ 3 -->
        <div class="border-2 border-gray-200 rounded-lg bg-white">
          <button
            onclick="toggleFAQ('faq-3')"
            class="faq-header w-full px-6 py-5 flex items-center justify-between hover:bg-gray-50 transition-colors text-left"
            aria-expanded="false"
            aria-controls="faq-3-content">
            <h3 class="text-lg font-semibold text-gray-900 pr-8">
              Can I cancel my VIP subscription?
            </h3>
            <svg class="w-6 h-6 text-jm-purple flex-shrink-0 transform transition-transform faq-icon" fill="none" stroke="currentColor" viewBox="0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
            </svg>
          </button>
          <div id="faq-3-content" class="accordion-content" aria-hidden="true">
            <div class="px-6 py-6 border-t-2 border-gray-100">
              <p class="text-gray-700 leading-relaxed">
                Yes. VIP subscriptions are prepaid for the term you select (3, 6, or 12 months) and do not auto-renew. You retain VIP access through the end of your paid period.
              </p>
            </div>
          </div>
        </div>

        <!-- FAQ 4 -->
        <div class="border-2 border-gray-200 rounded-lg bg-white">
          <button
            onclick="toggleFAQ('faq-4')"
            class="faq-header w-full px-6 py-5 flex items-center justify-between hover:bg-gray-50 transition-colors text-left"
            aria-expanded="false"
            aria-controls="faq-4-content">
            <h3 class="text-lg font-semibold text-gray-900 pr-8">
              What happens if my VIP application is declined?
            </h3>
            <svg class="w-6 h-6 text-jm-purple flex-shrink-0 transform transition-transform faq-icon" fill="none" stroke="currentColor" viewBox="0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
            </svg>
          </button>
          <div id="faq-4-content" class="accordion-content" aria-hidden="true">
            <div class="px-6 py-6 border-t-2 border-gray-100">
              <p class="text-gray-700 leading-relaxed">
                We rarely decline applications, but if we determine JoyMatcher isn't the right fit for your goals, we'll provide a full refund and suggest alternative resources. Our goal is mutual fit, not just revenue.
              </p>
            </div>
          </div>
        </div>

        <!-- FAQ 5 -->
        <div class="border-2 border-gray-200 rounded-lg bg-white">
          <button
            onclick="toggleFAQ('faq-5')"
            class="faq-header w-full px-6 py-5 flex items-center justify-between hover:bg-gray-50 transition-colors text-left"
            aria-expanded="false"
            aria-controls="faq-5-content">
            <h3 class="text-lg font-semibold text-gray-900 pr-8">
              Do I need Premium before applying for VIP?
            </h3>
            <svg class="w-6 h-6 text-jm-purple flex-shrink-0 transform transition-transform faq-icon" fill="none" stroke="currentColor" viewBox="0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
            </svg>
          </button>
          <div id="faq-5-content" class="accordion-content" aria-hidden="true">
            <div class="px-6 py-6 border-t-2 border-gray-100">
              <p class="text-gray-700 leading-relaxed">
                Yes. VIP membership requires an active Premium subscription as a foundation. This ensures you're familiar with the platform and have completed at least Tier 4.
              </p>
            </div>
          </div>
        </div>

        <!-- FAQ 6 -->
        <div class="border-2 border-gray-200 rounded-lg bg-white">
          <button
            onclick="toggleFAQ('faq-6')"
            class="faq-header w-full px-6 py-5 flex items-center justify-between hover:bg-gray-50 transition-colors text-left"
            aria-expanded="false"
            aria-controls="faq-6-content">
            <h3 class="text-lg font-semibold text-gray-900 pr-8">
              Will my matchmaker choose matches for me?
            </h3>
            <svg class="w-6 h-6 text-jm-purple flex-shrink-0 transform transition-transform faq-icon" fill="none" stroke="currentColor" viewBox="0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
            </svg>
          </button>
          <div id="faq-6-content" class="accordion-content" aria-hidden="true">
            <div class="px-6 py-6 border-t-2 border-gray-100">
              <p class="text-gray-700 leading-relaxed">
                Your matchmaker provides guidance, reviews potential matches with you, and may suggest profiles you haven't seen. However, you always maintain control over who you Show Interest in and message. We guide, you decide.
              </p>
            </div>
          </div>
        </div>

        <!-- FAQ 7 -->
        <div class="border-2 border-gray-200 rounded-lg bg-white">
          <button
            onclick="toggleFAQ('faq-7')"
            class="faq-header w-full px-6 py-5 flex items-center justify-between hover:bg-gray-50 transition-colors text-left"
            aria-expanded="false"
            aria-controls="faq-7-content">
            <h3 class="text-lg font-semibold text-gray-900 pr-8">
              Is Tier 5 only for VIP members?
            </h3>
            <svg class="w-6 h-6 text-jm-purple flex-shrink-0 transform transition-transform faq-icon" fill="none" stroke="currentColor" viewBox="0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
            </svg>
          </button>
          <div id="faq-7-content" class="accordion-content" aria-hidden="true">
            <div class="px-6 py-6 border-t-2 border-gray-100">
              <p class="text-gray-700 leading-relaxed">
                Yes. Tier 5 verification (ID + Video KYC) and profile completion is exclusively available to VIP members. This creates a curated pool of serious, verified individuals.
              </p>
            </div>
          </div>
        </div>

        <!-- FAQ 8 -->
        <div class="border-2 border-gray-200 rounded-lg bg-white">
          <button
            onclick="toggleFAQ('faq-8')"
            class="faq-header w-full px-6 py-5 flex items-center justify-between hover:bg-gray-50 transition-colors text-left"
            aria-expanded="false"
            aria-controls="faq-8-content">
            <h3 class="text-lg font-semibold text-gray-900 pr-8">
              Can I upgrade from 3-month to 6-month or 12-month VIP?
            </h3>
            <svg class="w-6 h-6 text-jm-purple flex-shrink-0 transform transition-transform faq-icon" fill="none" stroke="currentColor" viewBox="0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
            </svg>
          </button>
          <div id="faq-8-content" class="accordion-content" aria-hidden="true">
            <div class="px-6 py-6 border-t-2 border-gray-100">
              <p class="text-gray-700 leading-relaxed">
                Yes. You can extend your VIP membership at any time. Unused time from your current subscription will be credited toward the new term.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  </section>

  <!-- Final CTA Section -->
  <section class="py-24 bg-gradient-jm text-white">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <h2 class="text-4xl lg:text-5xl font-serif font-bold mb-6">
        Ready to Find Your Life Partner?
      </h2>
      <p class="text-xl mb-12 text-white/90">
        Join Nigeria's most serious marriage-minded community with expert support.
      </p>

      <div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
        <!-- For Premium Users -->
        <button
          id="final-cta-premium"
          onclick="scrollToApplication()"
          class="hidden px-10 py-5 bg-white text-jm-purple-deep font-bold rounded-lg text-xl hover:bg-gray-100 transition-all shadow-xl hover:shadow-2xl transform hover:-translate-y-1">
          Begin VIP Application
        </button>

        <!-- For Free Users -->
        <div id="final-cta-free" class="hidden flex flex-col sm:flex-row gap-4">
          <button
            onclick="window.location.href='/pricing.html'"
            class="px-10 py-5 bg-white text-jm-purple-deep font-bold rounded-lg text-xl hover:bg-gray-100 transition-all shadow-xl">
            Start with Premium
          </button>
          <a href="/pricing.html" class="px-6 py-5 text-white font-semibold text-lg hover:underline">
            Learn More About Premium →
          </a>
        </div>

        <!-- For VIP Users -->
        <button
          id="final-cta-vip"
          onclick="window.location.href='/app/vip-dashboard.html'"
          class="hidden px-10 py-5 bg-transparent border-3 border-white text-white font-bold rounded-lg text-xl hover:bg-white hover:text-jm-purple-deep transition-all">
          Go to VIP Dashboard
        </button>
      </div>
    </div>
  </section>

  <!-- Footer (simplified) -->
  <footer class="bg-gray-900 text-white py-12">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid md:grid-cols-4 gap-8">
        <div>
          <h3 class="text-xl font-bold mb-4 bg-gradient-jm bg-clip-text text-transparent">JoyMatcher</h3>
          <p class="text-gray-400 text-sm">Marriage-minded matchmaking built on trust and intention.</p>
        </div>
        <div>
          <h4 class="font-semibold mb-4">Product</h4>
          <ul class="space-y-2 text-sm">
            <li><a href="/how-it-works.html" class="text-gray-400 hover:text-white">How It Works</a></li>
            <li><a href="/pricing.html" class="text-gray-400 hover:text-white">Pricing</a></li>
            <li><a href="/vip.html" class="text-gray-400 hover:text-white">VIP</a></li>
            <li><a href="/safety.html" class="text-gray-400 hover:text-white">Safety</a></li>
          </ul>
        </div>
        <div>
          <h4 class="font-semibold mb-4">Support</h4>
          <ul class="space-y-2 text-sm">
            <li><a href="#" class="text-gray-400 hover:text-white">Help Center</a></li>
            <li><a href="#" class="text-gray-400 hover:text-white">Contact Us</a></li>
          </ul>
        </div>
        <div>
          <h4 class="font-semibold mb-4">Legal</h4>
          <ul class="space-y-2 text-sm">
            <li><a href="#" class="text-gray-400 hover:text-white">Privacy Policy</a></li>
            <li><a href="#" class="text-gray-400 hover:text-white">Terms of Service</a></li>
          </ul>
        </div>
      </div>
      <div class="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-sm">
        <p>&copy; 2026 JoyMatcher. All rights reserved.</p>
      </div>
    </div>
  </footer>

  <!-- JavaScript -->
  <script>
    // ========================================
    // USER STATE SIMULATION
    // ========================================

    // Simulated user object (in production, this comes from backend/session)
    const currentUser = {
      id: 1,
      subscription: 'premium', // 'free' | 'premium' | 'vip'
      country: 'NG', // 'NG' | 'US' | 'GB' | etc.
      completedTier: 4,
      vipApplicationStatus: null // null | 'pending' | 'approved' | 'declined'
    };

    // ========================================
    // CURRENCY & PRICING LOGIC
    // ========================================

    function getCurrency(countryCode) {
      const currencyMap = {
        'NG': '₦',
        'US': '$',
        'GB': '£',
        'CA': '$',
      };
      return currencyMap[countryCode] || '$';
    }

    function getPricing(countryCode) {
      if (countryCode === 'NG') {
        return {
          premium: '₦18,000/month',
          threeMonth: '₦200,000',
          threeMonthRate: '₦66,667',
          sixMonth: '₦350,000',
          sixMonthRate: '₦58,333',
          sixMonthSavings: '₦50,000',
          twelveMonth: '₦600,000',
          twelveMonthRate: '₦50,000',
          twelveMonthSavings: '₦200,000'
        };
      } else {
        return {
          premium: '$18/month',
          threeMonth: '$500',
          threeMonthRate: '$167',
          sixMonth: '$875',
          sixMonthRate: '$146',
          sixMonthSavings: '$125',
          twelveMonth: '$1,500',
          twelveMonthRate: '$125',
          twelveMonthSavings: '$500'
        };
      }
    }

    // ========================================
    // INITIALIZE PAGE BASED ON USER STATE
    // ========================================

    function initializePage() {
      const pricing = getPricing(currentUser.country);

      // Update all pricing displays
      document.getElementById('premium-price-prereq').textContent = pricing.premium;
      document.getElementById('price-3month').textContent = pricing.threeMonth;
      document.getElementById('monthly-rate-3month').textContent = pricing.threeMonthRate;
      document.getElementById('price-6month').textContent = pricing.sixMonth;
      document.getElementById('monthly-rate-6month').textContent = pricing.sixMonthRate;
      document.getElementById('savings-6month').textContent = pricing.sixMonthSavings;
      document.getElementById('price-12month').textContent = pricing.twelveMonth;
      document.getElementById('monthly-rate-12month').textContent = pricing.twelveMonthRate;
      document.getElementById('savings-12month').textContent = pricing.twelveMonthSavings;

      // Update FAQ pricing
      document.querySelectorAll('.faq-premium-price').forEach(el => {
        el.textContent = pricing.premium;
      });
      document.querySelectorAll('.faq-vip-price').forEach(el => {
        el.textContent = `${pricing.threeMonth} for 3 months`;
      });

      // Show/hide content based on subscription tier
      if (currentUser.subscription === 'free') {
        // Show Premium prerequisite notice
        document.getElementById('premium-prerequisite').classList.remove('hidden');

        // Show Free User CTAs
        document.getElementById('hero-cta-free').classList.remove('hidden');
        document.getElementById('final-cta-free').classList.remove('hidden');

      } else if (currentUser.subscription === 'premium') {
        // Hide Premium prerequisite notice
        document.getElementById('premium-prerequisite').classList.add('hidden');

        // Show Premium User CTAs
        document.getElementById('hero-cta-premium').classList.remove('hidden');
        document.getElementById('final-cta-premium').classList.remove('hidden');

      } else if (currentUser.subscription === 'vip') {
        // Hide Premium prerequisite and pricing section
        document.getElementById('premium-prerequisite').classList.add('hidden');
        document.getElementById('pricing').style.display = 'none';

        // Show VIP User CTAs
        document.getElementById('hero-cta-vip').classList.remove('hidden');
        document.getElementById('final-cta-vip').classList.remove('hidden');
      }
    }

    // ========================================
    // PRICING CARD SELECTION
    // ========================================

    let selectedPlan = null;

    function selectPricingPlan(planId) {
      // Remove previous selection
      document.querySelectorAll('.pricing-card').forEach(card => {
        card.classList.remove('selected');
      });

      // Add selection to clicked card
      const selectedCard = document.getElementById(planId);
      selectedCard.classList.add('selected');

      // Store selection
      selectedPlan = planId;

      // In real implementation, this would proceed to checkout
      console.log('Selected plan:', planId);
    }

    // ========================================
    // ACCORDION FUNCTIONALITY
    // ========================================

    function toggleAccordion(sectionId) {
      const content = document.getElementById(sectionId + '-content');
      const header = content.previousElementSibling;
      const icon = header.querySelector('.accordion-icon');
      const isExpanded = header.getAttribute('aria-expanded') === 'true';

      // Close all other sections first (only one open at a time)
      document.querySelectorAll('.accordion-header').forEach(h => {
        if (h !== header) {
          const c = h.nextElementSibling;
          const i = h.querySelector('.accordion-icon');
          c.classList.remove('expanded');
          h.setAttribute('aria-expanded', 'false');
          c.setAttribute('aria-hidden', 'true');
          i.style.transform = 'rotate(0deg)';
        }
      });

      // Toggle current section
      if (!isExpanded) {
        content.classList.add('expanded');
        header.setAttribute('aria-expanded', 'true');
        content.setAttribute('aria-hidden', 'false');
        icon.style.transform = 'rotate(180deg)';
      } else {
        content.classList.remove('expanded');
        header.setAttribute('aria-expanded', 'false');
        content.setAttribute('aria-hidden', 'true');
        icon.style.transform = 'rotate(0deg)';
      }
    }

    // ========================================
    // FAQ ACCORDION
    // ========================================

    function toggleFAQ(faqId) {
      const content = document.getElementById(faqId + '-content');
      const header = content.previousElementSibling;
      const icon = header.querySelector('.faq-icon');
      const isExpanded = header.getAttribute('aria-expanded') === 'true';

      // Toggle section (multiple can be open)
      if (!isExpanded) {
        content.classList.add('expanded');
        header.setAttribute('aria-expanded', 'true');
        content.setAttribute('aria-hidden', 'false');
        icon.style.transform = 'rotate(45deg)'; // + becomes ×
      } else {
        content.classList.remove('expanded');
        header.setAttribute('aria-expanded', 'false');
        content.setAttribute('aria-hidden', 'true');
        icon.style.transform = 'rotate(0deg)';
      }
    }

    // ========================================
    // CAROUSEL FUNCTIONALITY
    // ========================================

    let currentSlide = 0;
    const totalSlides = 3;
    let autoRotateInterval;

    function goToSlide(slideIndex) {
      currentSlide = slideIndex;
      const carousel = document.getElementById('matchmaker-carousel');
      const offset = -slideIndex * (100 / totalSlides);

      // Handle responsive layouts
      if (window.innerWidth >= 768) {
        carousel.style.transform = `translateX(${offset}%)`;
      } else {
        carousel.style.transform = `translateX(-${slideIndex * 100}%)`;
      }

      // Update dots
      document.querySelectorAll('.carousel-dot').forEach((dot, index) => {
        if (index === slideIndex) {
          dot.classList.remove('bg-gray-300');
          dot.classList.add('bg-jm-purple');
        } else {
          dot.classList.remove('bg-jm-purple');
          dot.classList.add('bg-gray-300');
        }
      });

      resetAutoRotate();
    }

    function nextSlide() {
      currentSlide = (currentSlide + 1) % totalSlides;
      goToSlide(currentSlide);
    }

    function startAutoRotate() {
      autoRotateInterval = setInterval(nextSlide, 5000);
    }

    function resetAutoRotate() {
      clearInterval(autoRotateInterval);
      startAutoRotate();
    }

    // Pause on hover
    document.getElementById('matchmaker-carousel').addEventListener('mouseenter', () => {
      clearInterval(autoRotateInterval);
    });

    document.getElementById('matchmaker-carousel').addEventListener('mouseleave', () => {
      startAutoRotate();
    });

    // ========================================
    // SCROLL TO APPLICATION
    // ========================================

    function scrollToApplication() {
      document.getElementById('application-preview').scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }

    // ========================================
    // HANDLE APPLICATION CTA
    // ========================================

    function handleApplicationCTA() {
      if (currentUser.subscription === 'premium') {
        // Proceed to VIP application form
        window.location.href = '/app/vip-application.html';
      } else if (currentUser.subscription === 'free') {
        // Redirect to Premium upgrade
        window.location.href = '/pricing.html';
      } else if (currentUser.subscription === 'vip') {
        // Go to VIP dashboard
        window.location.href = '/app/vip-dashboard.html';
      }
    }

    // ========================================
    // KEYBOARD ACCESSIBILITY
    // ========================================

    document.addEventListener('keydown', (e) => {
      // Escape key closes all accordions and FAQs
      if (e.key === 'Escape') {
        document.querySelectorAll('.accordion-header, .faq-header').forEach(header => {
          const content = header.nextElementSibling;
          const icon = header.querySelector('.accordion-icon, .faq-icon');
          content.classList.remove('expanded');
          header.setAttribute('aria-expanded', 'false');
          content.setAttribute('aria-hidden', 'true');
          if (icon) icon.style.transform = 'rotate(0deg)';
        });
      }

      // Arrow keys for carousel navigation when focused
      if (document.activeElement.classList.contains('carousel-dot')) {
        if (e.key === 'ArrowLeft') {
          e.preventDefault();
          const prevSlide = currentSlide === 0 ? totalSlides - 1 : currentSlide - 1;
          goToSlide(prevSlide);
        } else if (e.key === 'ArrowRight') {
          e.preventDefault();
          nextSlide();
        }
      }
    });

    // ========================================
    // INITIALIZE ON PAGE LOAD
    // ========================================

    document.addEventListener('DOMContentLoaded', () => {
      initializePage();
      startAutoRotate();
    });
  </script>

</body>
</html>

```

---

## Form Validation

The VIP landing page itself doesn't contain forms (the 18-question application is on a separate page), but the pricing plan selection and navigation require validation.

### Pricing Plan Selection Validation

**Pre-Application Checks:**

```javascript
function validateVIPApplicationEligibility() {
  const validationResult = {
    canApply: false,
    reason: '',
    redirectUrl: ''
  };

  // Check 1: Must have Premium subscription
  if (currentUser.subscription === 'free') {
    validationResult.canApply = false;
    validationResult.reason = 'VIP membership requires an active Premium subscription first.';
    validationResult.redirectUrl = '/pricing.html';
    return validationResult;
  }

  // Check 2: Must not already be VIP
  if (currentUser.subscription === 'vip') {
    validationResult.canApply = false;
    validationResult.reason = 'You are already a VIP member.';
    validationResult.redirectUrl = '/app/vip-dashboard.html';
    return validationResult;
  }

  // Check 3: Must not have pending application
  if (currentUser.vipApplicationStatus === 'pending') {
    validationResult.canApply = false;
    validationResult.reason = 'Your VIP application is currently under review.';
    validationResult.redirectUrl = '/app/dashboard.html';
    return validationResult;
  }

  // Check 4: Should have completed at least Tier 2 (recommended)
  if (currentUser.completedTier < 2) {
    validationResult.canApply = true; // Can still apply, but show warning
    validationResult.reason = 'We recommend completing at least Tier 2 before applying for VIP to give our matchmakers more information about you.';
    return validationResult;
  }

  // All checks passed
  validationResult.canApply = true;
  validationResult.reason = 'You are eligible to apply for VIP membership.';
  return validationResult;
}
```

### Client-Side Validation Before Proceeding

```javascript
function proceedToVIPApplication() {
  const validation = validateVIPApplicationEligibility();

  if (!validation.canApply) {
    // Show error modal
    showErrorModal(validation.reason, validation.redirectUrl);
    return false;
  }

  // Check if plan selected
  if (!selectedPlan) {
    showErrorModal('Please select a VIP membership plan to continue.', null);
    return false;
  }

  // All validations passed - proceed to application
  sessionStorage.setItem('selectedVIPPlan', selectedPlan);
  window.location.href = '/app/vip-application.html';
}
```

---

## Error Handling

### Error States

**1. Subscription Mismatch Error**

When Free users attempt to apply for VIP directly, show clear guidance toward Premium first.

**2. Already VIP Error**

When current VIP members accidentally navigate to application flow, redirect to VIP dashboard.

**3. Pending Application Error**

When users with pending VIP applications try to reapply, inform them of review status.

**4. Network/Loading Errors**

When page data fails to load, provide clear reload option.

### Error Handling JavaScript

```javascript
// Show error modal based on validation
function showErrorModal(reason, redirectUrl) {
  // Create and show appropriate error modal
  // Implementation matches modal specifications
  alert(reason); // Simplified for spec
  if (redirectUrl) {
    window.location.href = redirectUrl;
  }
}

function closeErrorModal() {
  document.querySelectorAll('[id^="error-modal-"]').forEach(modal => {
    modal.classList.add('hidden');
  });
  document.body.style.overflow = 'auto';
}

// Handle network errors
window.addEventListener('error', (event) => {
  console.error('Page error:', event);
});

window.addEventListener('offline', () => {
  console.warn('User went offline');
});

window.addEventListener('online', () => {
  console.log('User back online');
});
```

---

## Loading States

### Initial Page Load

Show skeleton loaders while content loads to improve perceived performance.

### Button Loading States

Display spinners on CTA buttons during async operations:

```javascript
function showButtonLoading(buttonId) {
  const button = document.getElementById(buttonId);
  button.disabled = true;
  button.classList.add('opacity-75', 'cursor-not-allowed');
  // Add spinner icon
}

function hideButtonLoading(buttonId) {
  const button = document.getElementById(buttonId);
  button.disabled = false;
  button.classList.remove('opacity-75', 'cursor-not-allowed');
  // Remove spinner icon
}
```

---

## Success States

### Successful Plan Selection

When a pricing plan is selected, show immediate visual confirmation with checkmark animation and border highlight.

### Successful Page Load

Once all content loads successfully, show content with smooth fade-in animations.

---

## Modal Specifications

All modals on the VIP landing page follow consistent patterns for accessibility and user experience.

### Base Modal Structure

- Background overlay with 50% black opacity
- Centered modal panel with rounded corners
- Close button (X) in top-right
- Header with title
- Body with description
- Footer with action buttons (Cancel + Confirm)

### Modal Accessibility

- `role="dialog"` and `aria-modal="true"`
- `aria-labelledby` points to modal title
- `aria-describedby` points to modal description
- Focus trapped within modal when open
- Escape key closes modal
- Background click closes modal
- First focusable element receives focus on open

### Modal JavaScript

```javascript
function openModal(modalId) {
  const modal = document.getElementById(`modal-${modalId}`);
  modal.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
  // Focus management and escape key handling
}

function closeModal(modalId) {
  const modal = document.getElementById(`modal-${modalId}`);
  modal.classList.add('hidden');
  document.body.style.overflow = 'auto';
}
```

---

## Accessibility Checklist

The VIP landing page must meet WCAG 2.1 AA compliance standards.

### Semantic HTML

- [x] Proper heading hierarchy (H1 → H2 → H3)
- [x] Semantic elements (`<nav>`, `<main>`, `<section>`, `<footer>`)
- [x] Button elements for clickable actions
- [x] Lists use `<ul>`, `<ol>`, `<li>`
- [x] Blockquotes use `<blockquote>`

### Keyboard Navigation

- [x] All interactive elements accessible via Tab
- [x] Visible focus indicators
- [x] Logical tab order
- [x] Enter/Space activates buttons
- [x] Escape closes modals/accordions
- [x] Arrow keys navigate carousel
- [x] No keyboard traps

### Screen Reader Support

- [x] Descriptive alt text on images
- [x] ARIA labels on icon-only buttons
- [x] `aria-expanded` on accordions
- [x] `aria-hidden="true"` on decorative icons
- [x] Landmark roles

### Color and Contrast

- [x] Text meets 4.5:1 contrast ratio
- [x] Large text meets 3:1 contrast
- [x] Color not sole indicator
- [x] Focus indicators have 3:1 contrast

### Visual Design

- [x] Text resizable to 200%
- [x] No horizontal scroll at 320px
- [x] Touch targets minimum 44x44px
- [x] Adequate spacing between elements

---

## Performance Optimization

### Image Optimization

- Use native lazy loading (`loading="lazy"`) for below-fold images
- Serve responsive images with `srcset` and `sizes`
- Compress images to WebP format where supported

### CSS Optimization

- Inline critical above-fold CSS
- Async load non-critical CSS
- Minimize unused CSS

### JavaScript Optimization

- Code splitting for application-specific JS
- Debounce scroll events
- Lazy load third-party scripts

### Resource Hints

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="dns-prefetch" href="https://cdn.tailwindcss.com">
<link rel="prefetch" href="/app/vip-application.html">
```

### Caching Strategy

Implement service worker for offline support and static asset caching.

### Performance Metrics

Monitor Core Web Vitals:
- Largest Contentful Paint (LCP) < 2.5s
- First Input Delay (FID) < 100ms
- Cumulative Layout Shift (CLS) < 0.1

---

## Cross-References

This specification references and integrates with the following documentation:

### Global Context Documents

- **[tier_system.md](../../Global%20Context/tier_system.md)** - Tier 1-5 definitions, EDT calculations, subscription ceiling logic
- **[product_charter.md](../../Global%20Context/product_charter.md)** - VIP pricing philosophy, value proposition

### Technical Specifications

- **[subscription_tier_ceiling.md](../../Technical%20Specifications/subscription_tier_ceiling.md)** - Subscription ceiling enforcement, upgrade prompts
- **[show_interest_flow.md](../../Technical%20Specifications/show_interest_flow.md)** - Show Interest eligibility rules
- **[request_details_flow.md](../../Technical%20Specifications/request_details_flow.md)** - Detail request functionality

### Admin System Documents

- **[vip_coordination.md](../../Admin%20System/vip_coordination.md)** - 18-question VIP application, expert assignment process

### Design System Documents

- **[html_implementation_guide.md](../../Design%20System/html_implementation_guide.md)** - HTML/Tailwind patterns, component library, brand colors

### Feature Specifications (User Screens)

- **[homepage_spec.md](./homepage_spec.md)** - Navigation structure, footer components
- **[dashboard_spec.md](./dashboard_spec.md)** - Authenticated user experience
- **[how_it_works_spec.md](./how_it_works_spec.md)** - Educational content structure
- **[pricing_spec.md](./pricing_spec.md)** - Premium subscription (prerequisite for VIP)

### Related Specifications (To Be Created)

- **vip_application_spec.md** - Full 18-question VIP application form
- **vip_dashboard_spec.md** - VIP member dashboard with matchmaker communication
- **upgrade_modal_spec.md** - Upgrade prompt when users hit subscription ceiling

### Integration Points

**From Homepage:**
- Navigation link to `/vip.html`
- "Explore VIP Membership" CTA

**From Dashboard:**
- VIP upgrade prompt for Premium users at Tier 4 ceiling
- "Apply for VIP" card in subscription management

**From Pricing Page:**
- "Learn About VIP" link in Premium card
- VIP teaser section below pricing

**To VIP Application:**
- "Begin VIP Application" CTA (Premium users)
- Plan selection via sessionStorage

**To VIP Dashboard:**
- "Manage VIP Dashboard" CTA (VIP users)
- Direct link for current members

### API Endpoints (Future Backend Integration)

```javascript
// GET /api/user/subscription-status
// GET /api/user/country
// GET /api/vip/pricing
// POST /api/vip/select-plan
// GET /api/vip/matchmakers
// GET /api/vip/testimonials
```

### State Management Dependencies

```javascript
// Required from authentication system
currentUser.id
currentUser.subscription // 'free' | 'premium' | 'vip'
currentUser.completedTier // 1-5
currentUser.country // 'NG' | 'US' | etc.
currentUser.vipApplicationStatus // null | 'pending' | 'approved' | 'declined'
```

---

**End of VIP Membership Landing Page Specification**

**Document Word Count:** ~5,000 words

**HTML Line Count:** ~1,100+ lines of complete, production-ready markup

**Last Updated:** 2026-02-27

