# Signup Page Specification

**Document Version:** 1.0
**Last Updated:** 2026-02-27
**Owner:** Product Team
**Status:** Draft

---

## Table of Contents

1. [Page Purpose & User Goals](#page-purpose--user-goals)
2. [User Stories](#user-stories)
3. [Signup Flow Overview](#signup-flow-overview)
4. [Page Structure & Layout](#page-structure--layout)
5. [Step 1: Account Creation](#step-1-account-creation)
6. [Step 2: Email Verification](#step-2-email-verification)
7. [Step 3: Initial Profile Setup](#step-3-initial-profile-setup)
8. [HTML/Tailwind Implementation](#htmltailwind-implementation)
9. [Form Validation Rules](#form-validation-rules)
10. [Error Handling](#error-handling)
11. [Loading States](#loading-states)
12. [Success States](#success-states)
13. [State Management](#state-management)
14. [Accessibility Requirements](#accessibility-requirements)
15. [Responsive Design](#responsive-design)
16. [Security Considerations](#security-considerations)
17. [Performance Optimization](#performance-optimization)
18. [Cross-References](#cross-references)

---

## Page Purpose & User Goals

### Primary Purpose

The Signup page is the first step in the JoyMatcher user journey. It collects essential account information, verifies email addresses, and guides new users through initial profile setup while clearly communicating the platform's trust-based, marriage-oriented positioning.

### User Goals

**For New Users:**
- Create an account quickly and easily
- Understand what JoyMatcher is and how it differs from casual dating apps
- Verify their email address to ensure account security
- Set up basic profile information (Tier 1)
- Choose appropriate subscription tier based on their needs
- Feel confident that their data is secure and private

**For Users with Referral/Tier Parameter:**
- Sign up with pre-selected subscription tier (from pricing page)
- Understand tier ceiling implications before committing
- Complete account creation with selected tier in context

### Business Goals

- Convert visitors into registered users
- Collect verified email addresses for communication
- Set clear expectations about platform values (marriage-oriented, trust-based)
- Encourage Premium subscription selection during signup
- Ensure data quality through mandatory email verification
- Reduce signup abandonment through clear, progressive steps
- Establish trust through security messaging and transparent process

---

## User Stories

### Story 1: First-Time User Discovering JoyMatcher
**As a** first-time visitor to JoyMatcher,
**I want to** create an account with minimal friction,
**So that** I can explore the platform and start meeting verified matches.

**Acceptance Criteria:**
- Signup form requires only essential information (name, email, password)
- Clear messaging explains platform values upfront
- Password requirements are visible and validated in real-time
- Form can be completed in under 2 minutes
- Progress indicator shows current step and remaining steps

### Story 2: User Coming from Pricing Page
**As a** user who decided to upgrade to Premium from the pricing page,
**I want to** create my account with Premium tier pre-selected,
**So that** I don't have to repeat my subscription choice.

**Acceptance Criteria:**
- URL parameter `?tier=premium` pre-selects Premium subscription
- Tier selection is clearly visible but can be changed
- Pricing information is reiterated during signup
- Payment is deferred until after email verification

### Story 3: User Verifying Email Address
**As a** user who just created an account,
**I want to** receive a verification email immediately and complete verification easily,
**So that** I can access my account and start using JoyMatcher.

**Acceptance Criteria:**
- Verification email sent within 30 seconds of signup
- Email contains clear call-to-action button
- Verification link is valid for 24 hours
- User is notified when email is verified successfully
- Expired verification links can request new email

### Story 4: User Completing Initial Profile Setup
**As a** newly verified user,
**I want to** complete my basic profile (Tier 1) during onboarding,
**So that** I can start browsing matches immediately.

**Acceptance Criteria:**
- Tier 1 fields are presented in logical, digestible groups
- Form includes helpful tooltips explaining why each field matters
- All fields are optional except those marked required
- User can save progress and continue later
- Completion of Tier 1 unlocks access to dashboard

---

## Signup Flow Overview

### Three-Step Process

**Step 1: Account Creation**
- User enters basic account details (name, email, password)
- Optional: Select subscription tier (Free/Premium/VIP)
- Submit account creation form
- Account created in "pending verification" state

**Step 2: Email Verification**
- System sends verification email to provided address
- User clicks verification link in email
- System confirms email ownership
- Account status updated to "verified"

**Step 3: Initial Profile Setup (Tier 1)**
- User completes mandatory Tier 1 fields
- Optional: Continue to Tier 2 (if desired)
- Profile becomes visible to other users
- User redirected to Dashboard

### Flow Diagram

```
[Landing Page] → [Signup: Account Creation]
                           ↓
                    [Email Sent Confirmation]
                           ↓
                    [User Opens Email]
                           ↓
                    [Click Verification Link]
                           ↓
                    [Email Verified Success]
                           ↓
                    [Profile Setup: Tier 1]
                           ↓
                    [Dashboard]
```

### State Transitions

```javascript
const SignupStates = {
  ACCOUNT_CREATION: 'account_creation',
  EMAIL_SENT: 'email_sent',
  EMAIL_VERIFIED: 'email_verified',
  PROFILE_SETUP: 'profile_setup',
  COMPLETE: 'complete'
};

const UserAccountStates = {
  PENDING_VERIFICATION: 'pending_verification',
  VERIFIED: 'verified',
  ACTIVE: 'active', // After Tier 1 completion
  SUSPENDED: 'suspended'
};
```

---

## Page Structure & Layout

### Visual Design Philosophy

**Clean and Trustworthy:**
- Minimal distractions (no sidebar ads or extraneous content)
- Professional typography and spacing
- Calming color palette (JoyMatcher purple/coral gradient used sparingly)
- Security indicators visible (SSL lock icon, privacy messaging)

**Progress-Oriented:**
- Clear step indicator (Step 1 of 3)
- Visual feedback for completed steps
- Contextual help text for each section
- Forward momentum (always show next action)

### Layout Structure

**Centered Card Design:**
```
┌──────────────────────────────────────┐
│  [JoyMatcher Logo]                   │
│                                      │
│  ┌──────────────────────────────┐  │
│  │                              │  │
│  │   [Progress: Step 1 of 3]   │  │
│  │                              │  │
│  │   [Form Title]              │  │
│  │   [Form Fields]             │  │
│  │   [Submit Button]           │  │
│  │                              │  │
│  │   [Alternative Action]       │  │
│  │                              │  │
│  └──────────────────────────────┘  │
│                                      │
│  [Footer: Privacy Policy, Terms]    │
└──────────────────────────────────────┘
```

**Responsive Adaptations:**
- Desktop (≥1024px): Centered card (max-width: 500px)
- Tablet (768px-1023px): Centered card with padding
- Mobile (<768px): Full-width form with minimal padding

---

## Step 1: Account Creation

### Page Title & Messaging

**Headline:**
"Create Your JoyMatcher Account"

**Subheadline:**
"Join a community of verified individuals seeking meaningful, marriage-oriented relationships built on trust and transparency."

### Form Fields

**1. Full Name**
- Label: "Full Name"
- Input type: `text`
- Placeholder: "Adebayo Johnson"
- Required: Yes
- Validation: Minimum 2 characters, maximum 100 characters, letters and spaces only
- Help text: "Use your real name. This builds trust with potential matches."

**2. Email Address**
- Label: "Email Address"
- Input type: `email`
- Placeholder: "you@example.com"
- Required: Yes
- Validation: Valid email format, not already registered
- Help text: "We'll send you a verification link. Check your inbox."

**3. Password**
- Label: "Password"
- Input type: `password`
- Placeholder: "••••••••"
- Required: Yes
- Validation: Minimum 8 characters, at least 1 uppercase, 1 lowercase, 1 number
- Help text: Real-time password strength indicator
- Toggle: Show/hide password button

**4. Confirm Password**
- Label: "Confirm Password"
- Input type: `password`
- Placeholder: "••••••••"
- Required: Yes
- Validation: Must match password field exactly
- Help text: None

**5. Country**
- Label: "Country"
- Input type: `select`
- Options: Nigeria (default), other countries
- Required: Yes
- Validation: Must select a country
- Help text: "Determines pricing currency and local features."

**6. Subscription Tier Selection**
- Label: "Choose Your Membership"
- Input type: Radio buttons (enhanced visual cards)
- Options: Free (default), Premium, VIP
- Required: No (defaults to Free)
- Help text: "You can upgrade anytime. See pricing details."
- Link: "View full pricing" (modal or link to /pricing)

**7. Terms and Privacy Agreement**
- Label: "I agree to the Terms of Service and Privacy Policy"
- Input type: `checkbox`
- Required: Yes
- Validation: Must be checked to proceed
- Links: Terms of Service, Privacy Policy (open in new tab)

### Subscription Tier Cards (Visual Selection)

```html
<fieldset class="mb-6">
  <legend class="text-sm font-semibold text-neutral-700 mb-3">Choose Your Membership</legend>
  <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">

    <!-- Free Tier Card -->
    <label class="relative flex cursor-pointer">
      <input type="radio" name="tier" value="free" class="sr-only peer" checked>
      <div class="flex-1 border-2 border-neutral-300 rounded-lg p-4 peer-checked:border-jm-coral peer-checked:bg-jm-coral peer-checked:bg-opacity-5 transition-all">
        <p class="font-semibold text-neutral-900 mb-1">Free</p>
        <p class="text-sm text-neutral-600 mb-2">Tier 2 access</p>
        <p class="text-2xl font-bold text-neutral-900">₦0</p>
      </div>
    </label>

    <!-- Premium Tier Card -->
    <label class="relative flex cursor-pointer">
      <input type="radio" name="tier" value="premium" class="sr-only peer">
      <div class="flex-1 border-2 border-neutral-300 rounded-lg p-4 peer-checked:border-jm-coral peer-checked:bg-jm-coral peer-checked:bg-opacity-5 transition-all relative">
        <span class="absolute -top-2 -right-2 bg-gradient-jm text-white text-xs font-semibold px-2 py-1 rounded-full">Popular</span>
        <p class="font-semibold text-neutral-900 mb-1">Premium</p>
        <p class="text-sm text-neutral-600 mb-2">Tier 4 access</p>
        <p class="text-2xl font-bold text-neutral-900">₦18,000<span class="text-sm font-normal">/mo</span></p>
      </div>
    </label>

    <!-- VIP Tier Card -->
    <label class="relative flex cursor-pointer">
      <input type="radio" name="tier" value="vip" class="sr-only peer">
      <div class="flex-1 border-2 border-neutral-300 rounded-lg p-4 peer-checked:border-jm-coral peer-checked:bg-jm-coral peer-checked:bg-opacity-5 transition-all">
        <p class="font-semibold text-neutral-900 mb-1">VIP</p>
        <p class="text-sm text-neutral-600 mb-2">Tier 5 access</p>
        <p class="text-2xl font-bold text-neutral-900">₦200k+<span class="text-sm font-normal">/mo</span></p>
      </div>
    </label>

  </div>
  <p class="text-sm text-neutral-600 mt-2">
    <a href="/pricing" target="_blank" class="text-jm-coral hover:underline">View full pricing details</a>
  </p>
</fieldset>
```

### Submit Button

**Label:** "Create Account"
**Style:** Primary (gradient background)
**Behavior:**
- Disabled until all required fields are valid
- Shows loading spinner during submission
- Updates to success state on completion

### Alternative Actions

**Already Have an Account?**
"Already have an account? <a href="/login">Sign in</a>"

**Need Help?**
"Questions? <a href="/contact">Contact support</a>"

---

## Step 2: Email Verification

### Email Sent Confirmation Page

**Visual State:**
- Check mark icon (not completed yet, just envelope icon)
- Headline: "Check Your Inbox"
- Body: "We've sent a verification email to [user's email]. Click the link in the email to verify your account and continue."

**Actions Available:**
1. "Didn't receive the email? <button>Resend verification email</button>"
2. "Wrong email address? <a href="/signup">Start over</a>"

**Auto-Refresh:**
- Page checks for verification status every 10 seconds
- If verified (user clicked link in another tab), auto-redirects to Step 3

### Verification Email Content

**Subject:** "Verify Your JoyMatcher Account"

**Body (HTML):**
```html
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: 'Inter', sans-serif; color: #1F2937; }
    .container { max-width: 600px; margin: 0 auto; padding: 40px 20px; }
    .header { text-align: center; margin-bottom: 32px; }
    .logo { height: 40px; }
    .button { display: inline-block; background: linear-gradient(135deg, #4D0052, #F16A6F); color: white; padding: 14px 32px; text-decoration: none; border-radius: 8px; font-weight: 600; }
    .footer { margin-top: 32px; text-align: center; font-size: 14px; color: #6B7280; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <img src="[JoyMatcher Logo URL]" alt="JoyMatcher" class="logo">
    </div>

    <h1 style="font-size: 24px; font-weight: bold; margin-bottom: 16px;">
      Welcome to JoyMatcher, [User's Name]!
    </h1>

    <p style="font-size: 16px; line-height: 1.6; margin-bottom: 24px;">
      Thank you for creating your account. To get started, please verify your email address by clicking the button below:
    </p>

    <div style="text-align: center; margin: 32px 0;">
      <a href="[Verification Link]" class="button">
        Verify My Email
      </a>
    </div>

    <p style="font-size: 14px; color: #6B7280; margin-bottom: 16px;">
      Or copy and paste this link into your browser:
    </p>
    <p style="font-size: 14px; color: #6B7280; word-break: break-all;">
      [Verification Link]
    </p>

    <div class="footer">
      <p>This link will expire in 24 hours.</p>
      <p>If you didn't create this account, you can safely ignore this email.</p>
      <p style="margin-top: 16px;">
        <a href="[Privacy Policy URL]" style="color: #F16A6F;">Privacy Policy</a> •
        <a href="[Terms URL]" style="color: #F16A6F;">Terms of Service</a>
      </p>
    </div>
  </div>
</body>
</html>
```

### Verification Link Handler

**Endpoint:** `GET /verify-email?token=[verification_token]`

**Behavior:**
```javascript
async function handleEmailVerification(token) {
  try {
    // 1. Validate token format
    if (!isValidToken(token)) {
      return showVerificationError('invalid_token');
    }

    // 2. Verify token with backend
    const response = await fetch(`/api/auth/verify-email`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token })
    });

    const result = await response.json();

    if (!response.ok) {
      if (result.error === 'token_expired') {
        return showVerificationError('expired', result.email);
      }
      throw new Error(result.error || 'Verification failed');
    }

    // 3. Store authentication token
    localStorage.setItem('authToken', result.authToken);
    AppState.user = result.user;

    // 4. Show success message
    showVerificationSuccess();

    // 5. Redirect to profile setup after 2 seconds
    setTimeout(() => {
      window.location.href = '/signup/profile-setup';
    }, 2000);

  } catch (error) {
    showVerificationError('server_error', error.message);
  }
}
```

### Verification Success Page

**Visual State:**
- Large checkmark icon (animated)
- Headline: "Email Verified!"
- Body: "Your email has been successfully verified. Let's set up your profile."
- Auto-redirect: "Redirecting in 2 seconds..."
- Manual action: "Continue to Profile Setup" button

### Verification Error States

**1. Invalid Token**
- Message: "This verification link is invalid. Please check your email for the correct link or request a new one."
- Action: "Resend verification email" button

**2. Expired Token**
- Message: "This verification link has expired (valid for 24 hours). We can send you a new one."
- Action: "Send new verification email" button (pre-fills email address)

**3. Already Verified**
- Message: "This email has already been verified. You can sign in to your account."
- Action: "Go to Sign In" button

---

## Step 3: Initial Profile Setup

### Page Title & Messaging

**Headline:**
"Complete Your Profile"

**Subheadline:**
"Let's start with Tier 1: Identity & Intent. This information helps us connect you with compatible matches who share your relationship goals."

### Tier 1 Field Groups

**Reference:** See `docs/Global Context/tier_system.md` for complete Tier 1 field definitions.

**Group 1: Basic Information**

1. **Gender**
   - Radio buttons: Male, Female
   - Required: Yes

2. **Date of Birth**
   - Date picker (day, month, year dropdowns)
   - Required: Yes
   - Validation: Must be 18+ years old

3. **Location**
   - Select dropdown: Nigerian states or countries
   - Required: Yes

**Group 2: Relationship Intent**

4. **Looking For**
   - Radio buttons: Marriage, Serious Relationship Leading to Marriage
   - Required: Yes

5. **Timeline**
   - Select dropdown: Within 1 year, 1-2 years, 2-3 years, 3+ years, Open to the right person
   - Required: Yes

6. **Previous Marriages**
   - Radio buttons: Never married, Divorced, Widowed
   - Required: Yes

7. **Children**
   - Radio buttons: No children, Have children
   - If "Have children": Number of children (number input)
   - Required: Yes

**Group 3: About You**

8. **Headline**
   - Text input (max 100 characters)
   - Example: "Faith-focused professional seeking lifelong partner"
   - Required: No
   - Help text: "A brief statement about who you are and what you're looking for."

9. **Bio**
   - Textarea (max 500 characters)
   - Required: Yes (minimum 50 characters)
   - Character counter shown
   - Help text: "Tell potential matches about yourself, your values, and what you're looking for in a partner."

**Group 4: Religious Affiliation**

10. **Religion**
    - Select dropdown: Christianity, Islam, Other, Prefer not to say
    - Required: Yes

11. **Religious Commitment**
    - Select dropdown: Very important, Somewhat important, Not important
    - Required: Yes

### Form Layout

**Progressive Disclosure:**
- Fields grouped into collapsible sections
- One section open at a time
- Visual indicator of completion for each section
- "Save & Continue" after each section

**Save Behavior:**
- Auto-save every 30 seconds (draft state)
- Manual save button at bottom of each section
- User can return later to complete (progress saved)

### Completion Actions

**Primary CTA:** "Complete Tier 1 & Go to Dashboard"
- Validates all required fields
- Saves profile data
- Updates user account status to "active"
- Redirects to dashboard with welcome message

**Secondary Option:** "Skip for now, I'll complete this later"
- Saves partial progress
- Redirects to dashboard
- Dashboard shows prominent "Complete Your Profile" banner
- User cannot view other profiles until Tier 1 is complete

---

## HTML/Tailwind Implementation

### Complete Signup Page (Step 1: Account Creation)

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Sign Up - JoyMatcher</title>
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

  <div class="min-h-screen flex flex-col items-center justify-center px-4 py-12">

    <!-- Logo -->
    <div class="mb-8">
      <a href="/">
        <img src="/images/joymatcher-logo.svg" alt="JoyMatcher" class="h-10">
      </a>
    </div>

    <!-- Signup Card -->
    <div class="w-full max-w-md bg-white rounded-xl shadow-lg border border-neutral-200 px-8 py-10">

      <!-- Progress Indicator -->
      <div class="mb-8">
        <div class="flex items-center justify-between mb-2">
          <span class="text-sm font-medium text-neutral-700">Step 1 of 3</span>
          <span class="text-sm text-neutral-600">Account Creation</span>
        </div>
        <div class="w-full bg-neutral-200 rounded-full h-2">
          <div class="bg-gradient-jm h-2 rounded-full transition-all duration-300" style="width: 33%;"></div>
        </div>
      </div>

      <!-- Header -->
      <header class="mb-8 text-center">
        <h1 class="text-3xl font-bold text-neutral-900 mb-3">
          Create Your Account
        </h1>
        <p class="text-neutral-600">
          Join verified individuals seeking meaningful, marriage-oriented relationships.
        </p>
      </header>

      <!-- Signup Form -->
      <form id="signupForm" novalidate>

        <!-- Full Name -->
        <div class="mb-4">
          <label for="fullName" class="block text-sm font-medium text-neutral-700 mb-2">
            Full Name <span class="text-red-600">*</span>
          </label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            required
            class="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-jm-coral focus:border-transparent transition-all"
            placeholder="Adebayo Johnson"
            aria-required="true"
            aria-describedby="fullName-help"
          >
          <p id="fullName-help" class="text-sm text-neutral-600 mt-1">
            Use your real name. This builds trust with potential matches.
          </p>
          <p id="fullName-error" class="text-sm text-red-600 mt-1 hidden" role="alert"></p>
        </div>

        <!-- Email Address -->
        <div class="mb-4">
          <label for="email" class="block text-sm font-medium text-neutral-700 mb-2">
            Email Address <span class="text-red-600">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            class="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-jm-coral focus:border-transparent transition-all"
            placeholder="you@example.com"
            aria-required="true"
            aria-describedby="email-help"
          >
          <p id="email-help" class="text-sm text-neutral-600 mt-1">
            We'll send you a verification link. Check your inbox.
          </p>
          <p id="email-error" class="text-sm text-red-600 mt-1 hidden" role="alert"></p>
        </div>

        <!-- Password -->
        <div class="mb-4">
          <label for="password" class="block text-sm font-medium text-neutral-700 mb-2">
            Password <span class="text-red-600">*</span>
          </label>
          <div class="relative">
            <input
              type="password"
              id="password"
              name="password"
              required
              class="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-jm-coral focus:border-transparent transition-all pr-12"
              placeholder="••••••••"
              aria-required="true"
              aria-describedby="password-help"
            >
            <button
              type="button"
              class="absolute right-3 top-1/2 transform -translate-y-1/2 text-neutral-600 hover:text-neutral-900"
              onclick="togglePasswordVisibility('password')"
              aria-label="Toggle password visibility"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 11-6 3 3 016z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477-8.268-2.943-9.542-7z" />
              </svg>
            </button>
          </div>
          <!-- Password Strength Indicator -->
          <div id="password-strength" class="mt-2 hidden">
            <div class="flex items-center gap-2 mb-1">
              <div class="flex-1 h-2 bg-neutral-200 rounded-full overflow-hidden">
                <div id="password-strength-bar" class="h-full transition-all duration-300" style="width: 0%;"></div>
              </div>
              <span id="password-strength-text" class="text-xs font-medium"></span>
            </div>
          </div>
          <p id="password-help" class="text-sm text-neutral-600 mt-1">
            At least 8 characters with 1 uppercase, 1 lowercase, and 1 number.
          </p>
          <p id="password-error" class="text-sm text-red-600 mt-1 hidden" role="alert"></p>
        </div>

        <!-- Confirm Password -->
        <div class="mb-4">
          <label for="confirmPassword" class="block text-sm font-medium text-neutral-700 mb-2">
            Confirm Password <span class="text-red-600">*</span>
          </label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            required
            class="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-jm-coral focus:border-transparent transition-all"
            placeholder="••••••••"
            aria-required="true"
          >
          <p id="confirmPassword-error" class="text-sm text-red-600 mt-1 hidden" role="alert"></p>
        </div>

        <!-- Country -->
        <div class="mb-6">
          <label for="country" class="block text-sm font-medium text-neutral-700 mb-2">
            Country <span class="text-red-600">*</span>
          </label>
          <select
            id="country"
            name="country"
            required
            class="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-jm-coral focus:border-transparent transition-all appearance-none bg-white"
            aria-required="true"
            aria-describedby="country-help"
          >
            <option value="">Select your country</option>
            <option value="NG" selected>Nigeria</option>
            <option value="US">United States</option>
            <option value="GB">United Kingdom</option>
            <option value="CA">Canada</option>
            <option value="OTHER">Other</option>
          </select>
          <p id="country-help" class="text-sm text-neutral-600 mt-1">
            Determines pricing currency and local features.
          </p>
          <p id="country-error" class="text-sm text-red-600 mt-1 hidden" role="alert"></p>
        </div>

        <!-- Subscription Tier Selection -->
        <fieldset class="mb-6">
          <legend class="text-sm font-semibold text-neutral-700 mb-3">Choose Your Membership</legend>
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">

            <!-- Free Tier -->
            <label class="relative flex cursor-pointer">
              <input type="radio" name="tier" value="free" class="sr-only peer" checked>
              <div class="flex-1 border-2 border-neutral-300 rounded-lg p-3 peer-checked:border-jm-coral peer-checked:bg-jm-coral peer-checked:bg-opacity-5 transition-all hover:border-neutral-400">
                <p class="font-semibold text-neutral-900 text-sm mb-1">Free</p>
                <p class="text-xs text-neutral-600 mb-2">Tier 2 access</p>
                <p class="text-xl font-bold text-neutral-900">₦0</p>
              </div>
            </label>

            <!-- Premium Tier -->
            <label class="relative flex cursor-pointer">
              <input type="radio" name="tier" value="premium" class="sr-only peer" id="tier-premium">
              <div class="flex-1 border-2 border-neutral-300 rounded-lg p-3 peer-checked:border-jm-coral peer-checked:bg-jm-coral peer-checked:bg-opacity-5 transition-all hover:border-neutral-400 relative">
                <span class="absolute -top-2 -right-2 bg-gradient-jm text-white text-xs font-semibold px-2 py-0.5 rounded-full">Popular</span>
                <p class="font-semibold text-neutral-900 text-sm mb-1">Premium</p>
                <p class="text-xs text-neutral-600 mb-2">Tier 4 access</p>
                <p class="text-xl font-bold text-neutral-900">₦18k<span class="text-xs font-normal">/mo</span></p>
              </div>
            </label>

            <!-- VIP Tier -->
            <label class="relative flex cursor-pointer">
              <input type="radio" name="tier" value="vip" class="sr-only peer">
              <div class="flex-1 border-2 border-neutral-300 rounded-lg p-3 peer-checked:border-jm-coral peer-checked:bg-jm-coral peer-checked:bg-opacity-5 transition-all hover:border-neutral-400">
                <p class="font-semibold text-neutral-900 text-sm mb-1">VIP</p>
                <p class="text-xs text-neutral-600 mb-2">Tier 5 access</p>
                <p class="text-xl font-bold text-neutral-900">₦200k+<span class="text-xs font-normal">/mo</span></p>
              </div>
            </label>

          </div>
          <p class="text-sm text-neutral-600 mt-2">
            <a href="/pricing" target="_blank" class="text-jm-coral hover:underline">View full pricing details</a>
          </p>
        </fieldset>

        <!-- Terms Agreement -->
        <div class="mb-6">
          <label class="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              id="termsAgreement"
              name="termsAgreement"
              required
              class="mt-1 w-4 h-4 text-jm-coral border-neutral-300 rounded focus:ring-2 focus:ring-jm-coral"
              aria-required="true"
            >
            <span class="text-sm text-neutral-700">
              I agree to the <a href="/terms" target="_blank" class="text-jm-coral hover:underline">Terms of Service</a> and <a href="/privacy" target="_blank" class="text-jm-coral hover:underline">Privacy Policy</a>
              <span class="text-red-600">*</span>
            </span>
          </label>
          <p id="termsAgreement-error" class="text-sm text-red-600 mt-1 hidden" role="alert"></p>
        </div>

        <!-- Submit Button -->
        <button
          type="submit"
          id="submitButton"
          class="w-full bg-gradient-jm hover:bg-gradient-jm-hover text-white font-semibold px-6 py-3 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-jm-coral focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Create Account
        </button>

        <!-- Form-level Error Display -->
        <div id="form-error" class="mt-4 hidden" role="alert">
          <div class="bg-red-50 border border-red-200 rounded-lg px-4 py-3">
            <div class="flex items-start gap-3">
              <svg class="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 100-16 8 8 000 16zM8.28 7.22a.75.75 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 101.06 1.06L10 11.06l1.72 1.72a.75.75 101.06-1.06L11.06 10l1.72-1.72a.75.75 00-1.06-1.06L10 8.94 8.28 7.22z" clip-rule="evenodd" />
              </svg>
              <p id="form-error-message" class="text-sm text-red-700"></p>
            </div>
          </div>
        </div>

      </form>

      <!-- Alternative Actions -->
      <div class="mt-6 text-center">
        <p class="text-sm text-neutral-600">
          Already have an account? <a href="/login" class="text-jm-coral hover:underline font-medium">Sign in</a>
        </p>
      </div>

    </div>

    <!-- Footer Links -->
    <div class="mt-8 text-center">
      <p class="text-sm text-neutral-600">
        Questions? <a href="/contact" class="text-jm-coral hover:underline">Contact support</a>
      </p>
    </div>

  </div>

  <script src="/js/signup.js"></script>
</body>
</html>
```

---

## Form Validation Rules

### Real-Time Validation

**Validation Triggers:**
- `onblur`: Validate when user leaves field
- `oninput`: For password strength indicator
- `onsubmit`: Final validation before submission

### Field-Specific Validation

**Full Name:**
```javascript
function validateFullName(value) {
  const trimmed = value.trim();

  if (trimmed.length === 0) {
    return { valid: false, error: 'Full name is required' };
  }

  if (trimmed.length < 2) {
    return { valid: false, error: 'Name must be at least 2 characters' };
  }

  if (trimmed.length > 100) {
    return { valid: false, error: 'Name must be less than 100 characters' };
  }

  // Only letters, spaces, hyphens, apostrophes
  const nameRegex = /^[a-zA-Z\s\-']+$/;
  if (!nameRegex.test(trimmed)) {
    return { valid: false, error: 'Name can only contain letters, spaces, hyphens, and apostrophes' };
  }

  return { valid: true };
}
```

**Email:**
```javascript
function validateEmail(value) {
  const trimmed = value.trim().toLowerCase();

  if (trimmed.length === 0) {
    return { valid: false, error: 'Email address is required' };
  }

  // RFC 5322 compliant email regex (simplified)
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(trimmed)) {
    return { valid: false, error: 'Please enter a valid email address' };
  }

  // Additional validation: Check for disposable email domains (optional)
  const disposableDomains = ['tempmail.com', '10minutemail.com', 'guerrillamail.com'];
  const domain = trimmed.split('@')[1];
  if (disposableDomains.includes(domain)) {
    return { valid: false, error: 'Please use a permanent email address' };
  }

  return { valid: true, value: trimmed };
}
```

**Password:**
```javascript
function validatePassword(value) {
  if (value.length === 0) {
    return { valid: false, error: 'Password is required', strength: null };
  }

  if (value.length < 8) {
    return { valid: false, error: 'Password must be at least 8 characters', strength: 'weak' };
  }

  const hasUppercase = /[A-Z]/.test(value);
  const hasLowercase = /[a-z]/.test(value);
  const hasNumber = /\d/.test(value);
  const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(value);

  if (!hasUppercase || !hasLowercase || !hasNumber) {
    return {
      valid: false,
      error: 'Password must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number',
      strength: 'weak'
    };
  }

  // Calculate strength
  let strength = 'weak';
  if (value.length >= 12 && hasSpecial) {
    strength = 'strong';
  } else if (value.length >= 10) {
    strength = 'medium';
  }

  return { valid: true, strength };
}

function updatePasswordStrengthIndicator(strength) {
  const strengthBar = document.getElementById('password-strength-bar');
  const strengthText = document.getElementById('password-strength-text');
  const strengthContainer = document.getElementById('password-strength');

  if (!strength) {
    strengthContainer.classList.add('hidden');
    return;
  }

  strengthContainer.classList.remove('hidden');

  const strengthConfig = {
    weak: { width: '33%', color: '#EF4444', text: 'Weak' },
    medium: { width: '66%', color: '#F59E0B', text: 'Medium' },
    strong: { width: '100%', color: '#10B981', text: 'Strong' }
  };

  const config = strengthConfig[strength];
  strengthBar.style.width = config.width;
  strengthBar.style.backgroundColor = config.color;
  strengthText.textContent = config.text;
  strengthText.style.color = config.color;
}
```

**Confirm Password:**
```javascript
function validateConfirmPassword(password, confirmPassword) {
  if (confirmPassword.length === 0) {
    return { valid: false, error: 'Please confirm your password' };
  }

  if (password !== confirmPassword) {
    return { valid: false, error: 'Passwords do not match' };
  }

  return { valid: true };
}
```

**Country:**
```javascript
function validateCountry(value) {
  if (!value || value === '') {
    return { valid: false, error: 'Please select your country' };
  }

  const validCountries = ['NG', 'US', 'GB', 'CA', 'OTHER'];
  if (!validCountries.includes(value)) {
    return { valid: false, error: 'Invalid country selection' };
  }

  return { valid: true };
}
```

**Terms Agreement:**
```javascript
function validateTermsAgreement(checked) {
  if (!checked) {
    return { valid: false, error: 'You must agree to the Terms of Service and Privacy Policy to continue' };
  }

  return { valid: true };
}
```

### Form-Level Validation

```javascript
function validateSignupForm(formData) {
  const errors = {};

  // Validate all fields
  const fullNameResult = validateFullName(formData.fullName);
  if (!fullNameResult.valid) errors.fullName = fullNameResult.error;

  const emailResult = validateEmail(formData.email);
  if (!emailResult.valid) errors.email = emailResult.error;

  const passwordResult = validatePassword(formData.password);
  if (!passwordResult.valid) errors.password = passwordResult.error;

  const confirmPasswordResult = validateConfirmPassword(formData.password, formData.confirmPassword);
  if (!confirmPasswordResult.valid) errors.confirmPassword = confirmPasswordResult.error;

  const countryResult = validateCountry(formData.country);
  if (!countryResult.valid) errors.country = countryResult.error;

  const termsResult = validateTermsAgreement(formData.termsAgreement);
  if (!termsResult.valid) errors.termsAgreement = termsResult.error;

  return {
    valid: Object.keys(errors).length === 0,
    errors
  };
}
```

---

## Error Handling

### Field-Level Errors

**Display Pattern:**
```javascript
function showFieldError(fieldName, errorMessage) {
  const field = document.getElementById(fieldName);
  const errorElement = document.getElementById(`${fieldName}-error`);

  // Add error styling to field
  field.classList.add('border-red-500', 'focus:ring-red-500');
  field.classList.remove('border-neutral-300', 'focus:ring-jm-coral');
  field.setAttribute('aria-invalid', 'true');

  // Show error message
  errorElement.textContent = errorMessage;
  errorElement.classList.remove('hidden');

  // Announce to screen readers
  announceToScreenReader(`Error: ${errorMessage}`);
}

function clearFieldError(fieldName) {
  const field = document.getElementById(fieldName);
  const errorElement = document.getElementById(`${fieldName}-error`);

  // Remove error styling
  field.classList.remove('border-red-500', 'focus:ring-red-500');
  field.classList.add('border-neutral-300', 'focus:ring-jm-coral');
  field.setAttribute('aria-invalid', 'false');

  // Hide error message
  errorElement.classList.add('hidden');
}
```

### Form-Level Errors

**Backend Validation Errors:**
```javascript
const BackendErrors = {
  EMAIL_ALREADY_EXISTS: 'This email address is already registered. <a href="/login">Sign in instead?</a>',
  INVALID_EMAIL_FORMAT: 'Please enter a valid email address.',
  WEAK_PASSWORD: 'Password does not meet security requirements.',
  SERVER_ERROR: 'We encountered an error creating your account. Please try again.',
  NETWORK_ERROR: 'Network connection lost. Please check your internet and try again.',
  RATE_LIMIT_EXCEEDED: 'Too many signup attempts. Please try again in a few minutes.'
};

function showFormError(errorCode, customMessage = null) {
  const formError = document.getElementById('form-error');
  const formErrorMessage = document.getElementById('form-error-message');

  const message = customMessage || BackendErrors[errorCode] || errorCode;

  formErrorMessage.innerHTML = message;
  formError.classList.remove('hidden');

  // Scroll to error
  formError.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

  // Announce to screen readers
  announceToScreenReader(`Form error: ${message}`);
}

function clearFormError() {
  document.getElementById('form-error').classList.add('hidden');
}
```

---

## Loading States

### Submit Button Loading State

```javascript
function updateSubmitButtonState(state) {
  const button = document.getElementById('submitButton');

  switch(state) {
    case 'ready':
      button.disabled = false;
      button.innerHTML = 'Create Account';
      break;

    case 'submitting':
      button.disabled = true;
      button.innerHTML = `
        <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 018-8V0C5.373 0 5.373 12h4zm2 5.291A7.962 7.962 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        Creating Account...
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
        Account Created!
      `;
      break;
  }
}
```

### Email Verification Page Loading

**Checking Verification Status:**
```html
<div class="flex items-center justify-center gap-3 text-neutral-600">
  <svg class="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 24 24">
    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 018-8V0C5.373 0 5.373 12h4zm2 5.291A7.962 7.962 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
  </svg>
  <span>Checking verification status...</span>
</div>
```

---

## Success States

### Account Created Success

**Transition to Email Sent Page:**
```javascript
async function handleSignupSuccess(response) {
  // Update button to success state
  updateSubmitButtonState('success');

  // Store temporary signup data
  sessionStorage.setItem('pendingVerification', JSON.stringify({
    email: response.email,
    userId: response.userId,
    createdAt: new Date().toISOString()
  }));

  // Wait 1 second to show success state
  await new Promise(resolve => setTimeout(resolve, 1000));

  // Redirect to email verification page
  window.location.href = '/signup/verify-email';
}
```

### Email Verified Success

```html
<div class="text-center px-8 py-12">
  <!-- Animated Checkmark -->
  <div class="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce-once">
    <svg class="w-10 h-10 text-green-600" fill="currentColor" viewBox="0 20 20">
      <path fill-rule="evenodd" d="M10 18a8 8 100-16 8 8 000 16zm3.857-9.809a.75.75 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 10-1.06 1.061l2.5 2.5a.75.75 001.137-.089l4-5.5z" clip-rule="evenodd" />
    </svg>
  </div>

  <h2 class="text-3xl font-bold text-neutral-900 mb-3">
    Email Verified!
  </h2>

  <p class="text-neutral-700 mb-8">
    Your email has been successfully verified. Let's set up your profile.
  </p>

  <p class="text-sm text-neutral-600 mb-6">
    Redirecting in <span id="countdown">2</span> seconds...
  </p>

  <button
    type="button"
    class="bg-gradient-jm text-white font-semibold px-8 py-3 rounded-lg hover:bg-gradient-jm-hover transition-all"
    onclick="window.location.href='/signup/profile-setup'"
  >
    Continue to Profile Setup
  </button>
</div>
```

---

## State Management

### Signup Flow State

```javascript
const SignupFlowState = {
  currentStep: 'account_creation', // account_creation | email_verification | profile_setup
  formData: {
    fullName: '',
    email: '',
    password: '',
    country: 'NG',
    tier: 'free',
    termsAgreement: false
  },
  validation: {
    fullName: { valid: false, error: null },
    email: { valid: false, error: null },
    password: { valid: false, error: null },
    confirmPassword: { valid: false, error: null },
    country: { valid: true, error: null },
    termsAgreement: { valid: false, error: null }
  },
  submission: {
    inProgress: false,
    error: null
  },
  verification: {
    emailSent: false,
    verified: false,
    checkingStatus: false
  }
};
```

### Form Submission Handler

```javascript
async function handleSignupFormSubmit(event) {
  event.preventDefault();

  // Clear previous errors
  clearFormError();
  Object.keys(SignupFlowState.validation).forEach(clearFieldError);

  // Collect form data
  const formData = {
    fullName: document.getElementById('fullName').value,
    email: document.getElementById('email').value,
    password: document.getElementById('password').value,
    confirmPassword: document.getElementById('confirmPassword').value,
    country: document.getElementById('country').value,
    tier: document.querySelector('input[name="tier"]:checked').value,
    termsAgreement: document.getElementById('termsAgreement').checked
  };

  // Validate form
  const validationResult = validateSignupForm(formData);

  if (!validationResult.valid) {
    // Show field-specific errors
    Object.entries(validationResult.errors).forEach(([field, error]) => {
      showFieldError(field, error);
    });
    return;
  }

  // Update state and UI
  SignupFlowState.submission.inProgress = true;
  updateSubmitButtonState('submitting');

  try {
    // Submit to backend
    const response = await fetch('/api/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        fullName: formData.fullName,
        email: formData.email,
        password: formData.password,
        country: formData.country,
        tier: formData.tier
      })
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || 'Signup failed');
    }

    // Handle success
    await handleSignupSuccess(result);

  } catch (error) {
    // Handle errors
    SignupFlowState.submission.error = error.message;
    showFormError(error.message);
    updateSubmitButtonState('ready');

  } finally {
    SignupFlowState.submission.inProgress = false;
  }
}

// Attach handler
document.getElementById('signupForm').addEventListener('submit', handleSignupFormSubmit);
```

---

## Accessibility Requirements

### WCAG 2.1 AA Compliance

**Form Labels:**
- All form fields have associated `<label>` elements
- Labels include visible required indicators (*)
- `aria-required="true"` on required fields
- `aria-describedby` links to help text

**Error Handling:**
- Errors displayed visibly near fields
- `aria-invalid="true"` set on invalid fields
- Error messages have `role="alert"`
- Screen reader announcements for dynamic errors

**Keyboard Navigation:**
- Logical tab order through form
- Submit on Enter key
- Password visibility toggle keyboard accessible
- Radio buttons navigable with arrow keys

**Screen Reader Support:**
```html
<!-- Live region for announcements -->
<div role="status" aria-live="polite" aria-atomic="true" class="sr-only" id="statusAnnouncements"></div>

<!-- Example usage -->
<script>
function announceToScreenReader(message) {
  const announcer = document.getElementById('statusAnnouncements');
  announcer.textContent = message;
  setTimeout(() => { announcer.textContent = ''; }, 3000);
}
</script>
```

---

## Responsive Design

### Mobile (<768px)

- Full-width form card with minimal padding
- Stacked tier selection cards (vertical)
- Touch-friendly input fields (min-height: 48px)
- Adequate spacing between form fields (mb-4)

### Tablet (768px-1023px)

- Centered form card with comfortable padding
- Tier cards can display in grid (2 columns)
- Slightly larger typography

### Desktop (≥1024px)

- Centered form card (max-width: 500px)
- Tier cards in 3-column grid
- Optimal line lengths for readability

---

## Security Considerations

### Password Security

**Hashing:** All passwords hashed with bcrypt (minimum 10 rounds) before storage

**Transmission:** HTTPS only, passwords never logged

**Storage:** Never store plaintext passwords or confirmation passwords

### Email Verification

**Token Security:**
- Cryptographically secure random tokens (32 bytes minimum)
- Tokens stored hashed in database
- Single-use tokens (invalidated after verification)
- 24-hour expiration

**Rate Limiting:**
- Maximum 5 signup attempts per IP per hour
- Maximum 3 verification email resends per email per hour

### CSRF Protection

- CSRF tokens included in all state-changing requests
- SameSite cookie attribute set to 'Strict'

---

## Performance Optimization

### Page Load Performance

- Critical CSS inlined
- JavaScript deferred
- Form validation logic loaded on demand
- Password strength calculation debounced

### Form Validation Performance

- Real-time validation debounced (300ms)
- Async email uniqueness check after valid format confirmed
- Client-side validation before server submission

---

## Cross-References

### Related Documentation

**Tier System:**
- `docs/Global Context/tier_system.md` - Tier 1 field definitions

**Design System:**
- `docs/Design System/html_implementation_guide.md` - Form components

**Product Strategy:**
- `docs/Global Context/product_charter.md` - Pricing tiers

### Related Specifications

- `login_spec.md` - Login page
- `pricing_spec.md` - Subscription selection
- `edit_profile_spec.md` - Profile completion (Tier 1+)

### Backend Integration

**API Endpoints:**
- `POST /api/auth/signup` - Create account
- `POST /api/auth/verify-email` - Verify email token
- `POST /api/auth/resend-verification` - Resend verification email

---

## Conclusion

This specification provides complete implementation details for the JoyMatcher signup flow, ensuring a smooth, accessible, and secure onboarding experience that aligns with the platform's trust-based, marriage-oriented values.

**Word Count:** 4,912 words

**Implementation Priority:** CRITICAL - Primary user entry point.