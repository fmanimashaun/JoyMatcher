# Login Page Specification

**Document Version:** 1.0
**Last Updated:** 2026-02-27
**Owner:** Product Team
**Status:** Draft

---

## Table of Contents

1. [Page Purpose & User Goals](#page-purpose--user-goals)
2. [User Stories](#user-stories)
3. [Page Structure & Layout](#page-structure--layout)
4. [Login Form](#login-form)
5. [Password Reset Flow](#password-reset-flow)
6. [HTML/Tailwind Implementation](#htmltailwind-implementation)
7. [Form Validation Rules](#form-validation-rules)
8. [Error Handling](#error-handling)
9. [Loading States](#loading-states)
10. [Success States](#success-states)
11. [State Management](#state-management)
12. [Authentication Flow](#authentication-flow)
13. [Session Management](#session-management)
14. [Security Considerations](#security-considerations)
15. [Accessibility Requirements](#accessibility-requirements)
16. [Responsive Design](#responsive-design)
17. [Performance Optimization](#performance-optimization)
18. [Cross-References](#cross-references)

---

## Page Purpose & User Goals

### Primary Purpose

The Login page serves as the authentication gateway for returning JoyMatcher users. It provides a secure, frictionless way for verified users to access their accounts while maintaining robust security measures to protect user data and prevent unauthorized access.

### User Goals

**For Returning Users:**
- Sign in quickly with email and password
- Access account securely on any device
- Reset forgotten passwords easily
- Understand authentication errors clearly
- Feel confident their account is secure

**For Users with Login Issues:**
- Recover account access through password reset
- Understand why login failed (wrong password vs. account issues)
- Contact support if unable to access account
- Maintain trust in platform security

### Business Goals

- Prevent unauthorized account access
- Maintain session security across devices
- Reduce support tickets through clear error messaging
- Track login patterns for security monitoring
- Enable seamless authenticated experience after login
- Protect user data through secure authentication

---

## User Stories

### Story 1: Returning User Sign In
**As a** verified JoyMatcher user,
**I want to** sign in to my account with my email and password,
**So that** I can access my matches, messages, and profile.

**Acceptance Criteria:**
- Login form accepts email and password
- Successful login redirects to dashboard
- Authentication state persists across sessions
- "Remember me" option extends session duration
- User can toggle password visibility

### Story 2: User Forgot Password
**As a** user who forgot my password,
**I want to** reset it through my email,
**So that** I can regain access to my account.

**Acceptance Criteria:**
- "Forgot password?" link prominently displayed
- Password reset form accepts email address
- Reset email sent within 30 seconds
- Reset link valid for 1 hour
- New password meets security requirements
- Success confirmation before redirect to login

### Story 3: User with Multiple Failed Attempts
**As a** user who entered wrong password multiple times,
**I want to** understand what went wrong and how to proceed,
**So that** I don't get locked out of my account.

**Acceptance Criteria:**
- Clear error message after failed attempt
- Account locked after 5 failed attempts (15-minute cooldown)
- Lockout message explains duration and alternatives
- Password reset option offered after 3 failed attempts
- Lockout applies per account, not per device/IP

### Story 4: User on Mobile Device
**As a** mobile user accessing JoyMatcher on my phone,
**I want to** sign in easily without desktop,
**So that** I can check messages and matches on the go.

**Acceptance Criteria:**
- Form optimized for mobile touch input
- Password field supports password managers
- Touch-friendly buttons (minimum 44x44px)
- No horizontal scrolling required
- Fast load time on mobile networks

---

## Page Structure & Layout

### Visual Design Philosophy

**Focused and Minimal:**
- Single-purpose page (authentication only)
- No distracting elements or marketing content
- Clear visual hierarchy
- Professional, trustworthy aesthetic
- Security indicators visible (HTTPS, privacy messaging)

**Centered Card Layout:**
```
┌──────────────────────────────────────┐
│  [JoyMatcher Logo]                   │
│                                      │
│  ┌──────────────────────────────┐  │
│  │                              │  │
│  │   Sign In to JoyMatcher     │  │
│  │                              │  │
│  │   [Email Input]             │  │
│  │   [Password Input]          │  │
│  │   [Remember Me] [Forgot?]   │  │
│  │   [Sign In Button]          │  │
│  │                              │  │
│  │   [Alternative: Sign Up]     │  │
│  │                              │  │
│  └──────────────────────────────┘  │
│                                      │
│  [Footer: Help Link]                │
└──────────────────────────────────────┘
```

### Layout Dimensions

**Desktop (≥1024px):**
- Centered card: max-width 450px
- Vertical centering with flexbox
- Adequate whitespace around card

**Tablet (768px-1023px):**
- Centered card with padding
- Comfortable touch targets

**Mobile (<768px):**
- Full-width card with minimal padding
- Touch-optimized input fields
- Stacked layout

---

## Login Form

### Page Header

**Headline:** "Sign In to JoyMatcher"
**Subheadline:** "Welcome back! Sign in to continue your journey."

### Form Fields

**1. Email Address**
- Label: "Email Address"
- Input type: `email`
- Autocomplete: `email`
- Placeholder: "you@example.com"
- Required: Yes
- Validation: Valid email format
- Help text: None

**2. Password**
- Label: "Password"
- Input type: `password`
- Autocomplete: `current-password`
- Placeholder: "••••••••"
- Required: Yes
- Validation: Not empty
- Toggle: Show/hide password button
- Help text: None

**3. Remember Me**
- Label: "Remember me"
- Input type: `checkbox`
- Default: Unchecked
- Behavior: Extends session from 1 day to 30 days

**4. Forgot Password Link**
- Label: "Forgot password?"
- Position: Right-aligned next to "Remember me"
- Action: Opens password reset modal or navigates to reset page

### Submit Button

**Label:** "Sign In"
**Style:** Primary (gradient background)
**Behavior:**
- Disabled until both email and password are filled
- Shows loading spinner during authentication
- Updates to success state on completion

### Alternative Actions

**Don't have an account?**
"Don't have an account? <a href="/signup">Sign up</a>"

**Need help?**
"Questions? <a href="/contact">Contact support</a>"

---

## Password Reset Flow

### Step 1: Request Password Reset

**Trigger:** User clicks "Forgot password?" link

**Modal/Page Content:**

**Headline:** "Reset Your Password"
**Body:** "Enter your email address and we'll send you a link to reset your password."

**Form:**
- Email address input (required, validated)
- "Send Reset Link" button
- "Back to Sign In" link

**Behavior:**
```javascript
async function handlePasswordResetRequest(email) {
  // Validate email
  const emailValidation = validateEmail(email);
  if (!emailValidation.valid) {
    showFieldError('reset-email', emailValidation.error);
    return;
  }

  updateResetButtonState('sending');

  try {
    const response = await fetch('/api/auth/request-password-reset', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email })
    });

    // Always show success (prevent email enumeration)
    showPasswordResetEmailSent(email);

  } catch (error) {
    showFormError('Unable to send reset email. Please try again.');
  } finally {
    updateResetButtonState('ready');
  }
}
```

**Security Note:** Always show success message regardless of whether email exists in database (prevents email enumeration attack).

### Step 2: Email Sent Confirmation

**Visual State:**
- Envelope icon
- Headline: "Check Your Email"
- Body: "If an account exists for [email], you'll receive a password reset link shortly."
- Note: "Didn't receive the email? Check your spam folder or <button>try again</button>."

### Step 3: Password Reset Link

**Email Subject:** "Reset Your JoyMatcher Password"

**Email Body (HTML):**
```html
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: 'Inter', sans-serif; color: #1F2937; }
    .container { max-width: 600px; margin: 0 auto; padding: 40px 20px; }
    .button { display: inline-block; background: linear-gradient(135deg, #4D0052, #F16A6F); color: white; padding: 14px 32px; text-decoration: none; border-radius: 8px; font-weight: 600; }
  </style>
</head>
<body>
  <div class="container">
    <h1>Reset Your Password</h1>
    <p>You requested to reset your JoyMatcher password. Click the button below to set a new password:</p>
    <div style="text-align: center; margin: 32px 0;">
      <a href="[Reset Link]" class="button">Reset My Password</a>
    </div>
    <p style="font-size: 14px; color: #6B7280;">Or copy and paste this link: [Reset Link]</p>
    <p style="font-size: 14px; color: #6B7280; margin-top: 24px;">
      This link will expire in 1 hour. If you didn't request this, you can safely ignore this email.
    </p>
  </div>
</body>
</html>
```

### Step 4: Set New Password Page

**Endpoint:** `GET /reset-password?token=[reset_token]`

**Page Content:**

**Headline:** "Set New Password"
**Body:** "Enter your new password below."

**Form:**
1. New Password (input with strength indicator)
2. Confirm New Password
3. "Reset Password" button

**Validation:**
- Password must meet security requirements (8+ chars, uppercase, lowercase, number)
- Passwords must match
- Token must be valid and not expired

**Success Behavior:**
```javascript
async function handlePasswordReset(token, newPassword) {
  updateResetButtonState('processing');

  try {
    const response = await fetch('/api/auth/reset-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token, newPassword })
    });

    const result = await response.json();

    if (!response.ok) {
      if (result.error === 'token_expired') {
        showTokenExpiredError();
        return;
      }
      throw new Error(result.error || 'Password reset failed');
    }

    showPasswordResetSuccess();

    // Redirect to login after 2 seconds
    setTimeout(() => {
      window.location.href = '/login?reset=success';
    }, 2000);

  } catch (error) {
    showFormError(error.message);
  } finally {
    updateResetButtonState('ready');
  }
}
```

### Step 5: Success Confirmation

**Visual State:**
- Checkmark icon
- Headline: "Password Reset Successful"
- Body: "Your password has been updated. You can now sign in with your new password."
- Auto-redirect: "Redirecting to sign in..."

---

## HTML/Tailwind Implementation

### Complete Login Page

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Sign In - JoyMatcher</title>
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

    <!-- Login Card -->
    <div class="w-full max-w-md bg-white rounded-xl shadow-lg border border-neutral-200 px-8 py-10">

      <!-- Success Alert (if redirected from password reset) -->
      <div id="successAlert" class="mb-6 hidden">
        <div class="bg-green-50 border border-green-200 rounded-lg px-4 py-3" role="alert">
          <div class="flex items-start gap-3">
            <svg class="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 20 20">
              <path fill-rule="evenodd" d="M10 18a8 8 100-16 8 8 000 16zm3.857-9.809a.75.75 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 10-1.06 1.061l2.5 2.5a.75.75 001.137-.089l4-5.5z" clip-rule="evenodd" />
            </svg>
            <p class="text-sm text-green-700">Password reset successful. You can now sign in with your new password.</p>
          </div>
        </div>
      </div>

      <!-- Header -->
      <header class="mb-8 text-center">
        <h1 class="text-3xl font-bold text-neutral-900 mb-3">
          Sign In to JoyMatcher
        </h1>
        <p class="text-neutral-600">
          Welcome back! Sign in to continue your journey.
        </p>
      </header>

      <!-- Login Form -->
      <form id="loginForm" novalidate>

        <!-- Email Address -->
        <div class="mb-4">
          <label for="email" class="block text-sm font-medium text-neutral-700 mb-2">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            autocomplete="email"
            required
            class="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-jm-coral focus:border-transparent transition-all"
            placeholder="you@example.com"
            aria-required="true"
          >
          <p id="email-error" class="text-sm text-red-600 mt-1 hidden" role="alert"></p>
        </div>

        <!-- Password -->
        <div class="mb-4">
          <label for="password" class="block text-sm font-medium text-neutral-700 mb-2">
            Password
          </label>
          <div class="relative">
            <input
              type="password"
              id="password"
              name="password"
              autocomplete="current-password"
              required
              class="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-jm-coral focus:border-transparent transition-all pr-12"
              placeholder="••••••••"
              aria-required="true"
            >
            <button
              type="button"
              class="absolute right-3 top-1/2 transform -translate-y-1/2 text-neutral-600 hover:text-neutral-900 transition-colors"
              onclick="togglePasswordVisibility('password')"
              aria-label="Toggle password visibility"
            >
              <svg id="password-hide-icon" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 11-6 3 3 016z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477-8.268-2.943-9.542-7z" />
              </svg>
              <svg id="password-show-icon" class="w-5 h-5 hidden" fill="none" stroke="currentColor" viewBox="0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0112 19c-4.478-8.268-2.943-9.543-7a9.97 9.97 011.563-3.029m5.858.908a3 3 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0A9.953 9.953 0112 5c4.478 8.268 2.943 9.543 7a10.025 10.025 01-4.132 5.411m0L21 21" />
              </svg>
            </button>
          </div>
          <p id="password-error" class="text-sm text-red-600 mt-1 hidden" role="alert"></p>
        </div>

        <!-- Remember Me & Forgot Password -->
        <div class="flex items-center justify-between mb-6">
          <label class="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              id="rememberMe"
              name="rememberMe"
              class="w-4 h-4 text-jm-coral border-neutral-300 rounded focus:ring-2 focus:ring-jm-coral"
            >
            <span class="text-sm text-neutral-700">Remember me</span>
          </label>

          <button
            type="button"
            class="text-sm text-jm-coral hover:underline font-medium"
            onclick="openForgotPasswordModal()"
          >
            Forgot password?
          </button>
        </div>

        <!-- Submit Button -->
        <button
          type="submit"
          id="submitButton"
          class="w-full bg-gradient-jm hover:bg-gradient-jm-hover text-white font-semibold px-6 py-3 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-jm-coral focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Sign In
        </button>

        <!-- Form-level Error Display -->
        <div id="form-error" class="mt-4 hidden" role="alert">
          <div class="bg-red-50 border border-red-200 rounded-lg px-4 py-3">
            <div class="flex items-start gap-3">
              <svg class="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 100-16 8 8 000 16zM8.28 7.22a.75.75 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 101.06 1.06L10 11.06l1.72 1.72a.75.75 101.06-1.06L11.06 10l1.72-1.72a.75.75 00-1.06-1.06L10 8.94 8.28 7.22z" clip-rule="evenodd" />
              </svg>
              <div class="flex-1">
                <p id="form-error-title" class="text-sm font-semibold text-red-900"></p>
                <p id="form-error-message" class="text-sm text-red-700 mt-1"></p>
              </div>
            </div>
          </div>
        </div>

      </form>

      <!-- Alternative Actions -->
      <div class="mt-6 text-center">
        <p class="text-sm text-neutral-600">
          Don't have an account? <a href="/signup" class="text-jm-coral hover:underline font-medium">Sign up</a>
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

  <!-- Forgot Password Modal -->
  <div id="forgotPasswordModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 hidden z-50" role="dialog" aria-modal="true" aria-labelledby="forgotPasswordTitle">
    <div class="bg-white rounded-xl shadow-xl max-w-md w-full p-8">
      <div class="flex items-center justify-between mb-6">
        <h2 id="forgotPasswordTitle" class="text-2xl font-bold text-neutral-900">Reset Your Password</h2>
        <button
          type="button"
          class="text-neutral-600 hover:text-neutral-900"
          onclick="closeForgotPasswordModal()"
          aria-label="Close modal"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <p class="text-neutral-700 mb-6">
        Enter your email address and we'll send you a link to reset your password.
      </p>

      <form id="forgotPasswordForm">
        <div class="mb-4">
          <label for="reset-email" class="block text-sm font-medium text-neutral-700 mb-2">
            Email Address
          </label>
          <input
            type="email"
            id="reset-email"
            name="reset-email"
            required
            class="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-jm-coral"
            placeholder="you@example.com"
          >
          <p id="reset-email-error" class="text-sm text-red-600 mt-1 hidden" role="alert"></p>
        </div>

        <button
          type="submit"
          id="resetSubmitButton"
          class="w-full bg-gradient-jm hover:bg-gradient-jm-hover text-white font-semibold px-6 py-3 rounded-lg transition-all mb-3"
        >
          Send Reset Link
        </button>

        <button
          type="button"
          class="w-full text-neutral-700 hover:text-neutral-900 font-medium"
          onclick="closeForgotPasswordModal()"
        >
          Back to Sign In
        </button>
      </form>
    </div>
  </div>

  <!-- Screen Reader Announcements -->
  <div role="status" aria-live="polite" aria-atomic="true" class="sr-only" id="statusAnnouncements"></div>

  <script src="/js/login.js"></script>
</body>
</html>
```

---

## Form Validation Rules

### Email Validation

```javascript
function validateEmail(value) {
  const trimmed = value.trim().toLowerCase();

  if (trimmed.length === 0) {
    return { valid: false, error: 'Email address is required' };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(trimmed)) {
    return { valid: false, error: 'Please enter a valid email address' };
  }

  return { valid: true, value: trimmed };
}
```

### Password Validation (Login)

```javascript
function validateLoginPassword(value) {
  if (value.length === 0) {
    return { valid: false, error: 'Password is required' };
  }

  // For login, we don't enforce complexity (user may have old password)
  return { valid: true };
}
```

### New Password Validation (Reset)

```javascript
function validateNewPassword(value) {
  if (value.length === 0) {
    return { valid: false, error: 'Password is required' };
  }

  if (value.length < 8) {
    return { valid: false, error: 'Password must be at least 8 characters' };
  }

  const hasUppercase = /[A-Z]/.test(value);
  const hasLowercase = /[a-z]/.test(value);
  const hasNumber = /\d/.test(value);

  if (!hasUppercase || !hasLowercase || !hasNumber) {
    return {
      valid: false,
      error: 'Password must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number'
    };
  }

  return { valid: true };
}
```

---

## Error Handling

### Login Error States

**1. Invalid Credentials**
```javascript
const LoginErrors = {
  INVALID_CREDENTIALS: {
    title: 'Sign In Failed',
    message: 'Incorrect email or password. Please try again.',
    suggestion: 'Forgot your password? <button onclick="openForgotPasswordModal()">Reset it here</button>.'
  },

  ACCOUNT_NOT_VERIFIED: {
    title: 'Email Not Verified',
    message: 'Please verify your email address before signing in.',
    suggestion: '<a href="/resend-verification">Resend verification email</a>.'
  },

  ACCOUNT_LOCKED: {
    title: 'Account Temporarily Locked',
    message: 'Too many failed login attempts. Your account is locked for 15 minutes.',
    suggestion: 'Try again later or <button onclick="openForgotPasswordModal()">reset your password</button>.'
  },

  ACCOUNT_SUSPENDED: {
    title: 'Account Suspended',
    message: 'Your account has been suspended. Please contact support for assistance.',
    suggestion: '<a href="/contact">Contact support</a>.'
  },

  SERVER_ERROR: {
    title: 'Something Went Wrong',
    message: 'We encountered an error signing you in. Please try again.',
    suggestion: 'If the problem persists, <a href="/contact">contact support</a>.'
  },

  NETWORK_ERROR: {
    title: 'Connection Error',
    message: 'Unable to connect to JoyMatcher. Please check your internet connection.',
    suggestion: null
  }
};

function showLoginError(errorCode) {
  const error = LoginErrors[errorCode] || LoginErrors.SERVER_ERROR;

  document.getElementById('form-error-title').textContent = error.title;
  document.getElementById('form-error-message').innerHTML = error.message;

  if (error.suggestion) {
    document.getElementById('form-error-message').innerHTML += `<br><br>${error.suggestion}`;
  }

  document.getElementById('form-error').classList.remove('hidden');
  document.getElementById('form-error').scrollIntoView({ behavior: 'smooth', block: 'nearest' });

  announceToScreenReader(`${error.title}: ${error.message}`);
}
```

### Failed Attempt Tracking

```javascript
const LoginAttemptTracker = {
  attempts: 0,
  maxAttempts: 5,
  lockoutDuration: 15 * 60 * 1000, // 15 minutes

  recordFailedAttempt(email) {
    this.attempts++;

    if (this.attempts >= 3 && this.attempts < this.maxAttempts) {
      // Show password reset suggestion
      const suggestion = document.createElement('div');
      suggestion.className = 'mt-2 text-sm text-neutral-700';
      suggestion.innerHTML = 'Having trouble? <button onclick="openForgotPasswordModal()" class="text-jm-coral hover:underline">Reset your password</button>.';
      document.getElementById('form-error').appendChild(suggestion);
    }

    if (this.attempts >= this.maxAttempts) {
      // Lock account
      this.lockAccount(email);
    }
  },

  async lockAccount(email) {
    await fetch('/api/auth/lock-account', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, duration: this.lockoutDuration })
    });

    showLoginError('ACCOUNT_LOCKED');
  },

  reset() {
    this.attempts = 0;
  }
};
```

---

## Loading States

### Sign In Button Loading

```javascript
function updateSubmitButtonState(state) {
  const button = document.getElementById('submitButton');

  switch(state) {
    case 'ready':
      button.disabled = false;
      button.innerHTML = 'Sign In';
      break;

    case 'signing-in':
      button.disabled = true;
      button.innerHTML = `
        <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 018-8V0C5.373 0 5.373 12h4zm2 5.291A7.962 7.962 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        Signing In...
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
        Signed In!
      `;
      break;
  }
}
```

---

## Success States

### Successful Login

```javascript
async function handleLoginSuccess(response) {
  // Update button state
  updateSubmitButtonState('success');

  // Store authentication token
  const storage = document.getElementById('rememberMe').checked
    ? localStorage
    : sessionStorage;

  storage.setItem('authToken', response.token);
  storage.setItem('user', JSON.stringify(response.user));

  // Set cookie for HTTP-only sessions
  document.cookie = `sessionToken=${response.sessionToken}; path=/; ${document.getElementById('rememberMe').checked ? 'max-age=2592000' : ''}; SameSite=Strict; Secure`;

  // Update global state
  AppState.user = response.user;
  AppState.authenticated = true;

  // Announce to screen reader
  announceToScreenReader('Sign in successful. Redirecting to dashboard.');

  // Wait 500ms to show success state
  await new Promise(resolve => setTimeout(resolve, 500));

  // Redirect to dashboard (or redirect URL if present)
  const urlParams = new URLSearchParams(window.location.search);
  const redirectUrl = urlParams.get('redirect') || '/app/dashboard';

  window.location.href = redirectUrl;
}
```

---

## State Management

### Login State Object

```javascript
const LoginState = {
  formData: {
    email: '',
    password: '',
    rememberMe: false
  },
  validation: {
    email: { valid: false, error: null },
    password: { valid: false, error: null }
  },
  submission: {
    inProgress: false,
    error: null
  },
  failedAttempts: 0
};
```

### Form Submission Handler

```javascript
async function handleLoginFormSubmit(event) {
  event.preventDefault();

  // Clear previous errors
  clearFormError();
  clearFieldError('email');
  clearFieldError('password');

  // Collect form data
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const rememberMe = document.getElementById('rememberMe').checked;

  // Validate
  const emailValidation = validateEmail(email);
  const passwordValidation = validateLoginPassword(password);

  if (!emailValidation.valid) {
    showFieldError('email', emailValidation.error);
    return;
  }

  if (!passwordValidation.valid) {
    showFieldError('password', passwordValidation.error);
    return;
  }

  // Update state
  LoginState.submission.inProgress = true;
  updateSubmitButtonState('signing-in');

  try {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: emailValidation.value,
        password,
        rememberMe
      })
    });

    const result = await response.json();

    if (!response.ok) {
      // Handle specific error codes
      LoginAttemptTracker.recordFailedAttempt(email);
      showLoginError(result.error || 'INVALID_CREDENTIALS');
      throw new Error(result.error || 'Login failed');
    }

    // Success
    LoginAttemptTracker.reset();
    await handleLoginSuccess(result);

  } catch (error) {
    updateSubmitButtonState('ready');
  } finally {
    LoginState.submission.inProgress = false;
  }
}

// Attach handler
document.getElementById('loginForm').addEventListener('submit', handleLoginFormSubmit);
```

---

## Authentication Flow

### Session Token Management

**Token Storage:**
- **Remember Me Checked:** Token stored in `localStorage` (30-day expiration)
- **Remember Me Unchecked:** Token stored in `sessionStorage` (expires on browser close)
- **HTTP-Only Cookie:** Parallel session cookie for backend validation

**Token Refresh:**
```javascript
async function refreshAuthToken() {
  const currentToken = localStorage.getItem('authToken') || sessionStorage.getItem('authToken');

  if (!currentToken) return null;

  try {
    const response = await fetch('/api/auth/refresh-token', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${currentToken}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      // Token invalid, clear and redirect to login
      clearAuthState();
      window.location.href = '/login';
      return null;
    }

    const result = await response.json();

    // Update stored token
    const storage = localStorage.getItem('authToken') ? localStorage : sessionStorage;
    storage.setItem('authToken', result.token);

    return result.token;

  } catch (error) {
    console.error('Token refresh failed:', error);
    return null;
  }
}
```

### Logout Implementation

```javascript
async function handleLogout() {
  try {
    // Notify backend
    await fetch('/api/auth/logout', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('authToken') || sessionStorage.getItem('authToken')}`
      }
    });

  } catch (error) {
    console.error('Logout request failed:', error);
  } finally {
    // Clear local state regardless of API success
    clearAuthState();
    window.location.href = '/login';
  }
}

function clearAuthState() {
  localStorage.removeItem('authToken');
  localStorage.removeItem('user');
  sessionStorage.removeItem('authToken');
  sessionStorage.removeItem('user');

  // Clear cookies
  document.cookie = 'sessionToken=; path=/; max-age=0';

  AppState.user = null;
  AppState.authenticated = false;
}
```

---

## Session Management

### Session Duration

**Standard Session (Remember Me Unchecked):**
- Duration: Until browser closes
- Storage: `sessionStorage`
- Cookie: Session cookie (no max-age)

**Extended Session (Remember Me Checked):**
- Duration: 30 days
- Storage: `localStorage`
- Cookie: Persistent cookie (max-age: 2592000 seconds)

### Session Security

**Automatic Logout:**
- Inactive sessions logged out after 24 hours (server-side)
- Token expiration enforced
- Concurrent session limit: 3 devices maximum

**Security Headers:**
```javascript
// Set secure session cookie
function setSessionCookie(token, rememberMe) {
  const maxAge = rememberMe ? 'max-age=2592000' : '';
  document.cookie = `sessionToken=${token}; path=/; ${maxAge}; SameSite=Strict; Secure; HttpOnly`;
}
```

---

## Security Considerations

### Password Security

**Transmission:** Always use HTTPS (redirect HTTP to HTTPS)
**Hashing:** bcrypt with minimum 10 rounds (server-side)
**Storage:** Never log or store plaintext passwords

### Brute Force Protection

**Rate Limiting:**
- Maximum 5 failed attempts per account per 15 minutes
- Account locked for 15 minutes after 5 failures
- CAPTCHA after 3 failed attempts (optional enhancement)

**IP-Based Throttling:**
- Maximum 20 login attempts per IP per hour
- Temporary IP block after excessive failures

### CSRF Protection

**Token Validation:**
- CSRF tokens required for all POST requests
- Tokens validated server-side
- Tokens rotated after successful authentication

**SameSite Cookies:**
```javascript
// All cookies set with SameSite=Strict
document.cookie = `sessionToken=${token}; SameSite=Strict; Secure; HttpOnly`;
```

### XSS Prevention

**Input Sanitization:**
- All user input sanitized before display
- Content Security Policy (CSP) headers enforced
- No inline JavaScript execution

**Output Encoding:**
```javascript
function sanitizeHTML(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}
```

---

## Accessibility Requirements

### WCAG 2.1 AA Compliance

**Form Labels:**
- All inputs have associated labels
- Error messages linked via `aria-describedby`
- Required fields marked with `aria-required="true"`

**Keyboard Navigation:**
- Logical tab order
- Enter key submits form
- Escape key closes modals
- Password toggle accessible via keyboard

**Screen Reader Support:**
```html
<!-- Live region for dynamic announcements -->
<div role="status" aria-live="polite" aria-atomic="true" class="sr-only" id="statusAnnouncements"></div>

<script>
function announceToScreenReader(message) {
  const announcer = document.getElementById('statusAnnouncements');
  announcer.textContent = message;
  setTimeout(() => { announcer.textContent = ''; }, 3000);
}
</script>
```

**Focus Management:**
```javascript
function openForgotPasswordModal() {
  const modal = document.getElementById('forgotPasswordModal');
  modal.classList.remove('hidden');
  modal.setAttribute('aria-hidden', 'false');

  // Focus first input
  document.getElementById('reset-email').focus();
}

function closeForgotPasswordModal() {
  const modal = document.getElementById('forgotPasswordModal');
  modal.classList.add('hidden');
  modal.setAttribute('aria-hidden', 'true');

  // Return focus to trigger
  document.querySelector('[onclick="openForgotPasswordModal()"]').focus();
}
```

---

## Responsive Design

### Breakpoint Strategy

**Mobile (<768px):**
- Full-width login card with minimal padding
- Touch-friendly input fields (min-height: 48px)
- Stacked "Remember me" and "Forgot password" on small screens

**Tablet (768px-1023px):**
- Centered card with comfortable padding
- Side-by-side "Remember me" and "Forgot password"

**Desktop (≥1024px):**
- Centered card (max-width: 450px)
- Optimal spacing and typography

### Mobile Optimizations

**Touch Targets:**
- All interactive elements minimum 44x44px
- Adequate spacing between buttons
- Password visibility toggle easily tappable

**Input Optimization:**
```html
<!-- Email input with mobile-optimized keyboard -->
<input
  type="email"
  autocomplete="email"
  inputmode="email"
  ...
>

<!-- Password input supports password managers -->
<input
  type="password"
  autocomplete="current-password"
  ...
>
```

---

## Performance Optimization

### Page Load Performance

**Target Metrics:**
- First Contentful Paint: <1.0s
- Time to Interactive: <2.0s
- Total Page Size: <50KB (excluding fonts)

**Optimization Strategies:**

1. **Critical CSS Inlining**
2. **JavaScript Deferral**
3. **Font Loading Optimization**
4. **Minimal Dependencies** (no external libraries)

### Runtime Performance

**Debounced Validation:**
```javascript
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

const debouncedEmailValidation = debounce(validateEmail, 300);
```

---

## Cross-References

### Related Documentation

**Authentication System:**
- `docs/Technical Specifications/authentication_flow.md` - Complete auth architecture
- `docs/Technical Specifications/session_management.md` - Session handling

**Design System:**
- `docs/Design System/html_implementation_guide.md` - Form components

**Security:**
- `docs/Safety & Compliance/security_best_practices.md` - Security guidelines

### Related Specifications

**User Screens:**
- `signup_spec.md` - New user registration
- `dashboard_spec.md` - Post-login destination

### Backend Integration

**API Endpoints:**
- `POST /api/auth/login` - Authenticate user
- `POST /api/auth/logout` - End session
- `POST /api/auth/refresh-token` - Refresh authentication token
- `POST /api/auth/request-password-reset` - Request password reset email
- `POST /api/auth/reset-password` - Set new password
- `POST /api/auth/lock-account` - Lock account after failed attempts

---

## Conclusion

This specification provides comprehensive implementation details for the JoyMatcher login page, ensuring secure, accessible, and user-friendly authentication while maintaining strict security standards to protect user accounts and data.

**Word Count:** 4,968 words

**Implementation Priority:** CRITICAL - Primary authentication gateway.