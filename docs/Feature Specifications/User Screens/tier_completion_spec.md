# Tier Completion Flow Feature Specification

**Version:** 1.0.0
**Last Updated:** 2026-02-27
**Status:** Complete
**Page Route:** `/app/tier/{tier_number}` (1-5)
**Access Level:** Authenticated users only (subscription-gated for Tier 3-5)

---

## 1. Page Purpose & User Goals

### Primary Purpose
The Tier Completion pages guide users through progressive disclosure by collecting tier-specific information in a structured, clear format. Each tier completion unlocks access to view matching tiers from other users.

### User Goals
- **New users:** Understand what information is required for each tier and why
- **Completing users:** Fill out tier forms efficiently with clear field labels and validation
- **Returning users:** Edit previously completed tier information
- **Premium/VIP users:** Progress through higher tiers (3-5) to unlock deeper connections

### Success Metrics
- Tier completion rate: >80% for Tier 1-2, >60% for Tier 3-4, >40% for Tier 5
- Time to complete: Tier 1 <10min, Tier 2 <15min, Tier 3-4 <20min each
- Form abandonment rate: <20% per tier
- Validation error rate: <5% (clear field labels prevent errors)

---

## 2. Tier-by-Tier Content Structure

### 2.1 Tier 1: Identity & Intent

**Purpose:** Establish baseline identity and relationship intent

**Required Fields:**
- Legal First Name (text input, not publicly displayed)
- Display Name (text input, public)
- Date of Birth (date picker, age derived)
- Gender (dropdown: Male, Female, Other, Prefer not to say)
- City (autocomplete text input)
- State/Province (autocomplete text input)
- Country (dropdown)
- Faith/Belief Orientation (dropdown: Christian, Muslim, Spiritual, Agnostic, Atheist, Other)
- Relationship Intent (radio: "Marriage within 1-2 years" | "Long-term leading to marriage")
- Primary Profile Photo (image upload with liveness check)

**Liveness Check:**
- User must complete simple challenge: "Blink twice" or "Turn head left"
- Prevents static photo uploads
- Not full KYC (that's Tier 5)

**HTML Structure (Tier 1 Form):**
```html
<form id="tier-1-form" class="space-y-8" novalidate>
  <!-- Progress Header -->
  <div class="bg-white sticky top-16 z-30 shadow-sm border-b border-jm-gray-200 py-4">
    <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between">
        <div class="space-y-1">
          <h1 class="font-serif text-2xl md:text-3xl font-bold text-jm-gray-900">
            Tier 1: Identity & Intent
          </h1>
          <p class="font-sans text-sm text-jm-gray-600">
            Public information (visible to all users)
          </p>
        </div>
        <span class="font-sans text-sm font-semibold text-jm-purple">
          Step 1 of 5
        </span>
      </div>
      <!-- Progress Bar -->
      <div class="w-full bg-jm-gray-200 rounded-full h-2 mt-3">
        <div class="bg-gradient-jm h-2 rounded-full transition-all duration-500" style="width: 20%"></div>
      </div>
    </div>
  </div>

  <!-- Form Content -->
  <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
    <!-- Section: Basic Identity -->
    <section class="bg-white rounded-xl shadow-md border border-jm-gray-200 p-6 space-y-6">
      <h2 class="font-serif text-xl font-semibold text-jm-gray-900 border-b border-jm-gray-200 pb-3">
        Basic Identity
      </h2>

      <!-- Legal First Name -->
      <div class="space-y-2">
        <label for="legal-first-name" class="block font-sans text-sm font-medium text-jm-gray-700">
          Legal First Name <span class="text-jm-error">*</span>
        </label>
        <input
          type="text"
          id="legal-first-name"
          name="legal_first_name"
          placeholder="Emmanuel"
          class="w-full px-4 py-3 rounded-lg border-2 border-jm-gray-300 focus:border-jm-purple focus:ring-2 focus:ring-jm-purple/20 font-sans text-base text-jm-gray-900 placeholder:text-jm-gray-400 transition-all duration-200 focus:outline-none"
          required
        />
        <p class="font-sans text-xs text-jm-gray-500">
          Not publicly displayed. Used for verification only.
        </p>
      </div>

      <!-- Display Name -->
      <div class="space-y-2">
        <label for="display-name" class="block font-sans text-sm font-medium text-jm-gray-700">
          Display Name <span class="text-jm-error">*</span>
        </label>
        <input
          type="text"
          id="display-name"
          name="display_name"
          placeholder="Emmanuel A."
          class="w-full px-4 py-3 rounded-lg border-2 border-jm-gray-300 focus:border-jm-purple focus:ring-2 focus:ring-jm-purple/20 font-sans text-base text-jm-gray-900 placeholder:text-jm-gray-400 transition-all duration-200 focus:outline-none"
          required
        />
        <p class="font-sans text-xs text-jm-gray-500">
          How other users will see your name on your profile.
        </p>
      </div>

      <!-- Date of Birth -->
      <div class="space-y-2">
        <label for="date-of-birth" class="block font-sans text-sm font-medium text-jm-gray-700">
          Date of Birth <span class="text-jm-error">*</span>
        </label>
        <input
          type="date"
          id="date-of-birth"
          name="date_of_birth"
          class="w-full px-4 py-3 rounded-lg border-2 border-jm-gray-300 focus:border-jm-purple focus:ring-2 focus:ring-jm-purple/20 font-sans text-base text-jm-gray-900 transition-all duration-200 focus:outline-none"
          required
        />
        <p class="font-sans text-xs text-jm-gray-500">
          Your age will be displayed publicly. Must be 18 or older.
        </p>
      </div>

      <!-- Gender -->
      <div class="space-y-2">
        <label for="gender" class="block font-sans text-sm font-medium text-jm-gray-700">
          Gender <span class="text-jm-error">*</span>
        </label>
        <select
          id="gender"
          name="gender"
          class="w-full px-4 py-3 rounded-lg border-2 border-jm-gray-300 focus:border-jm-purple focus:ring-2 focus:ring-jm-purple/20 font-sans text-base text-jm-gray-900 transition-all duration-200 focus:outline-none appearance-none bg-white cursor-pointer"
          required
        >
          <option value="" disabled selected>Select your gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other / Prefer not to say</option>
        </select>
      </div>
    </section>

    <!-- Section: Location -->
    <section class="bg-white rounded-xl shadow-md border border-jm-gray-200 p-6 space-y-6">
      <h2 class="font-serif text-xl font-semibold text-jm-gray-900 border-b border-jm-gray-200 pb-3">
        Location
      </h2>

      <!-- City -->
      <div class="space-y-2">
        <label for="city" class="block font-sans text-sm font-medium text-jm-gray-700">
          City <span class="text-jm-error">*</span>
        </label>
        <input
          type="text"
          id="city"
          name="city"
          placeholder="Lagos"
          list="cities"
          class="w-full px-4 py-3 rounded-lg border-2 border-jm-gray-300 focus:border-jm-purple focus:ring-2 focus:ring-jm-purple/20 font-sans text-base text-jm-gray-900 placeholder:text-jm-gray-400 transition-all duration-200 focus:outline-none"
          required
        />
        <datalist id="cities">
          <option value="Lagos">
          <option value="Abuja">
          <option value="Port Harcourt">
          <option value="Kano">
          <option value="Ibadan">
        </datalist>
      </div>

      <!-- State/Province -->
      <div class="space-y-2">
        <label for="state" class="block font-sans text-sm font-medium text-jm-gray-700">
          State/Province <span class="text-jm-error">*</span>
        </label>
        <input
          type="text"
          id="state"
          name="state"
          placeholder="Lagos State"
          class="w-full px-4 py-3 rounded-lg border-2 border-jm-gray-300 focus:border-jm-purple focus:ring-2 focus:ring-jm-purple/20 font-sans text-base text-jm-gray-900 placeholder:text-jm-gray-400 transition-all duration-200 focus:outline-none"
          required
        />
      </div>

      <!-- Country -->
      <div class="space-y-2">
        <label for="country" class="block font-sans text-sm font-medium text-jm-gray-700">
          Country <span class="text-jm-error">*</span>
        </label>
        <select
          id="country"
          name="country"
          class="w-full px-4 py-3 rounded-lg border-2 border-jm-gray-300 focus:border-jm-purple focus:ring-2 focus:ring-jm-purple/20 font-sans text-base text-jm-gray-900 transition-all duration-200 focus:outline-none appearance-none bg-white cursor-pointer"
          required
        >
          <option value="" disabled selected>Select your country</option>
          <option value="NG">Nigeria</option>
          <option value="GH">Ghana</option>
          <option value="US">United States</option>
          <option value="GB">United Kingdom</option>
          <option value="CA">Canada</option>
        </select>
      </div>
    </section>

    <!-- Section: Relationship Intent -->
    <section class="bg-white rounded-xl shadow-md border border-jm-gray-200 p-6 space-y-6">
      <h2 class="font-serif text-xl font-semibold text-jm-gray-900 border-b border-jm-gray-200 pb-3">
        Relationship Intent
      </h2>

      <!-- Faith/Belief Orientation -->
      <div class="space-y-2">
        <label for="faith" class="block font-sans text-sm font-medium text-jm-gray-700">
          Faith/Belief Orientation <span class="text-jm-error">*</span>
        </label>
        <select
          id="faith"
          name="faith"
          class="w-full px-4 py-3 rounded-lg border-2 border-jm-gray-300 focus:border-jm-purple focus:ring-2 focus:ring-jm-purple/20 font-sans text-base text-jm-gray-900 transition-all duration-200 focus:outline-none appearance-none bg-white cursor-pointer"
          required
        >
          <option value="" disabled selected>Select your faith</option>
          <option value="christian">Christian</option>
          <option value="muslim">Muslim</option>
          <option value="spiritual">Spiritual (non-religious)</option>
          <option value="agnostic">Agnostic</option>
          <option value="atheist">Atheist</option>
          <option value="other">Other</option>
        </select>
      </div>

      <!-- Relationship Intent -->
      <fieldset class="space-y-3">
        <legend class="block font-sans text-sm font-medium text-jm-gray-700 mb-3">
          Relationship Intent <span class="text-jm-error">*</span>
        </legend>

        <div class="flex items-center gap-3">
          <input
            type="radio"
            id="intent-marriage"
            name="relationship_intent"
            value="marriage"
            class="w-5 h-5 border-2 border-jm-gray-300 text-jm-purple focus:ring-2 focus:ring-jm-purple/20 focus:ring-offset-0 transition-all duration-200 cursor-pointer"
            required
          />
          <label for="intent-marriage" class="font-sans text-base text-jm-gray-700 cursor-pointer">
            Marriage within 1-2 years
          </label>
        </div>

        <div class="flex items-center gap-3">
          <input
            type="radio"
            id="intent-long-term"
            name="relationship_intent"
            value="long_term"
            class="w-5 h-5 border-2 border-jm-gray-300 text-jm-purple focus:ring-2 focus:ring-jm-purple/20 focus:ring-offset-0 transition-all duration-200 cursor-pointer"
            required
          />
          <label for="intent-long-term" class="font-sans text-base text-jm-gray-700 cursor-pointer">
            Long-term committed relationship leading to marriage
          </label>
        </div>
      </fieldset>
    </section>

    <!-- Section: Profile Photo -->
    <section class="bg-white rounded-xl shadow-md border border-jm-gray-200 p-6 space-y-6">
      <h2 class="font-serif text-xl font-semibold text-jm-gray-900 border-b border-jm-gray-200 pb-3">
        Profile Photo
      </h2>

      <div class="space-y-4">
        <p class="font-sans text-sm text-jm-gray-600">
          Upload a clear, recent photo of yourself. We'll verify it with a simple liveness check.
        </p>

        <!-- Photo Upload -->
        <div class="flex flex-col items-center gap-4">
          <div class="w-40 h-40 rounded-full border-4 border-jm-gray-300 overflow-hidden bg-jm-gray-100 flex items-center justify-center">
            <svg class="w-16 h-16 text-jm-gray-400" fill="none" stroke="currentColor" viewBox="0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 11-8 4 4 018zM12 14a7 7 00-7 7h14a7 7 00-7-7z"/>
            </svg>
          </div>

          <label
            for="profile-photo"
            class="bg-gradient-jm hover:bg-gradient-jm-hover text-white font-sans font-semibold px-6 py-3 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg cursor-pointer focus-within:outline-none focus-within:ring-2 focus-within:ring-jm-coral focus-within:ring-offset-2"
          >
            Upload Photo
            <input
              type="file"
              id="profile-photo"
              name="profile_photo"
              accept="image/*"
              class="sr-only"
              required
            />
          </label>
        </div>

        <!-- Liveness Check (triggered after photo upload) -->
        <div id="liveness-check" class="hidden bg-jm-warning/10 border-2 border-jm-warning rounded-lg p-4">
          <h3 class="font-sans text-sm font-semibold text-jm-warning mb-2">
            Liveness Check Required
          </h3>
          <p class="font-sans text-sm text-jm-gray-700 mb-3">
            To verify this is a real photo, please complete a simple challenge.
          </p>
          <button
            type="button"
            id="start-liveness-check"
            class="bg-jm-warning hover:bg-jm-warning/90 text-white font-sans font-semibold px-4 py-2 rounded-lg transition-all duration-200 shadow-sm hover:shadow-md"
          >
            Start Liveness Check
          </button>
        </div>
      </div>
    </section>

    <!-- Form Actions -->
    <div class="sticky bottom-0 bg-white border-t border-jm-gray-200 shadow-lg py-4">
      <div class="flex flex-col md:flex-row gap-3 justify-end">
        <button
          type="button"
          class="border-2 border-jm-gray-300 hover:border-jm-gray-400 text-jm-gray-700 hover:text-jm-gray-900 hover:bg-jm-gray-50 font-sans font-medium px-8 py-3 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-jm-gray-400 focus:ring-offset-2"
        >
          Save as Draft
        </button>
        <button
          type="submit"
          class="bg-gradient-jm hover:bg-gradient-jm-hover text-white font-sans font-semibold px-8 py-3 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-jm-coral focus:ring-offset-2"
        >
          Complete Tier 1
        </button>
      </div>
    </div>
  </div>
</form>
```

---

### 2.2 Tier 2: Lifestyle & Background

**Purpose:** Early practical compatibility screening

**Required Fields:**
- Height (dropdown: cm or ft/in)
- Body Type (dropdown)
- Education Level (dropdown)
- Field of Study (text input if applicable)
- Employment Status (dropdown)
- Occupation Category (dropdown)
- Industry (text input)
- Work Mode (radio: Onsite, Remote, Hybrid)
- Smoking (dropdown)
- Alcohol (dropdown)
- Exercise Frequency (dropdown)
- Primary Languages (multi-select checkboxes)

**Consistency Checks:**
- If "Student" → Must have education as ongoing
- If "Between jobs" → Flag if duration seems suspicious
- If "Remote" work → Validate against occupation

---

### 2.3 Tier 3: Relationship & Family Context

**Purpose:** Determine marriage readiness and life alignment

**Subscription Requirement:** Premium or VIP

**Required Fields:**
- Marital History (dropdown)
- Number of Children (dropdown)
- Custody Status (dropdown, conditional on children >0)
- Children Living With You (radio, conditional)
- Willingness to Have Children (radio)
- Marriage Timeline Expectation (radio)
- Family Involvement Expectations (textarea, 500 char max)
- Family-Related Deal Breakers (textarea, 500 char max)

**Subscription Ceiling Check:**
```javascript
// Before rendering Tier 3 form
if (currentUser.subscription === 'free') {
  showUpgradeModal('premium', 3);
  // Block access to form
}
```

---

### 2.4 Tier 4: Health & Long-Term Compatibility

**Purpose:** Support marriage-level decisions with health transparency

**Subscription Requirement:** Premium or VIP

**Required Fields:**
- Genotype (dropdown with "Prefer not to say")
- Blood Group (dropdown)
- Self-Declared Health Conditions (checkboxes + textarea)
- Fertility-Related Disclosures (radio)
- Health-Related Lifestyle Factors (checkboxes)
- Core Non-Negotiables: Religion (radio)
- Core Non-Negotiables: Relocation (radio)
- Core Non-Negotiables: Children (radio)

**Health Disclaimer (Must Accept Before Form Access):**
```html
<div class="bg-jm-warning/10 border-2 border-jm-warning rounded-lg p-6 space-y-4">
  <h2 class="font-serif text-xl font-semibold text-jm-warning">
    Health Data Disclaimer
  </h2>
  <p class="font-sans text-sm text-jm-gray-700">
    Before accessing Tier 4, please read and accept the following:
  </p>

  <div class="space-y-3">
    <label class="flex items-start gap-3">
      <input type="checkbox" id="disclaimer-1" class="w-5 h-5 mt-0.5" required />
      <span class="font-sans text-sm text-jm-gray-700">
        I understand health data is self-declared and not medically verified
      </span>
    </label>

    <label class="flex items-start gap-3">
      <input type="checkbox" id="disclaimer-2" class="w-5 h-5 mt-0.5" required />
      <span class="font-sans text-sm text-jm-gray-700">
        I will only view this data from others if I complete and share my own Tier 4
      </span>
    </label>

    <label class="flex items-start gap-3">
      <input type="checkbox" id="disclaimer-3" class="w-5 h-5 mt-0.5" required />
      <span class="font-sans text-sm text-jm-gray-700">
        I understand this information is critical for marriage decisions (e.g., genotype compatibility)
      </span>
    </label>

    <label class="flex items-start gap-3">
      <input type="checkbox" id="disclaimer-4" class="w-5 h-5 mt-0.5" required />
      <span class="font-sans text-sm text-jm-gray-700">
        I will not share others' health information without their explicit consent
      </span>
    </label>
  </div>

  <button
    type="button"
    id="accept-disclaimer"
    class="w-full bg-jm-warning hover:bg-jm-warning/90 text-white font-sans font-semibold px-6 py-3 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
    disabled
  >
    Accept and Continue to Tier 4
  </button>
</div>
```

**Genotype Compatibility Warning:**
```javascript
// After form submission, if both users are AS
if (currentUser.genotype === 'AS' && otherUser.genotype === 'AS') {
  showCompatibilityWarning({
    type: 'genotype',
    message: 'Both you and [Name] have AS genotype. This combination carries risk for sickle cell disease in children. Please consult a medical professional before proceeding.',
    severity: 'high',
    blocking: false // Warning, not blocking
  });
}
```

---

### 2.5 Tier 5: Verified Identity & Elite Trust (VIP Only)

**Purpose:** Eliminate impersonation and fraud; enable concierge matchmaking

**Subscription Requirement:** VIP only

**Required Fields:**
- Government-Issued ID (file upload: front + back)
- ID Type (dropdown: National ID, Passport, Driver's License)
- ID Number (text input, masked after verification)
- ID Expiry Date (date picker)
- Country of Issue (dropdown)
- Live Video Verification (video upload, 30 seconds max)
- Randomized Liveness Challenge (system-generated prompt)
- Face Match Confirmation (automated + manual review)
- Truth & Accountability Declaration (signature field: typed full name)

**Verification Process:**
1. User uploads government ID
2. System performs automated checks (expiry, format, name consistency)
3. User records video with randomized challenge ("Blink twice", "Turn head left", "Say your name and today's date")
4. System performs face match (photo vs. video)
5. VIP Coordinator performs manual review
6. User signs truth declaration
7. If all checks pass → Tier 5 approved (24-48 hours)

---

## 3. Form Validation

### Client-Side Validation (JavaScript)

```javascript
/**
 * Validate Tier 1 form before submission
 */
function validateTier1Form() {
  const form = document.getElementById('tier-1-form');
  const errors = [];

  // Legal First Name
  const legalName = form.legal_first_name.value.trim();
  if (!legalName) {
    errors.push({ field: 'legal_first_name', message: 'Legal first name is required' });
  } else if (legalName.length < 2) {
    errors.push({ field: 'legal_first_name', message: 'Legal first name must be at least 2 characters' });
  }

  // Date of Birth (must be 18+)
  const dob = new Date(form.date_of_birth.value);
  const age = calculateAge(dob);
  if (age < 18) {
    errors.push({ field: 'date_of_birth', message: 'You must be at least 18 years old' });
  }

  // Profile Photo (must be uploaded and liveness check passed)
  if (!form.profile_photo.files.length) {
    errors.push({ field: 'profile_photo', message: 'Profile photo is required' });
  }

  if (!AppState.livenessCheckPassed) {
    errors.push({ field: 'profile_photo', message: 'Please complete the liveness check' });
  }

  // Display errors
  if (errors.length > 0) {
    displayValidationErrors(errors);
    return false;
  }

  return true;
}
```

### Server-Side Validation (Backend)

- Re-validate all fields on backend
- Check for duplicate entries (email, phone)
- Verify liveness check result
- Sanitize user input (XSS prevention)
- Store tier data securely

---

## 4. Accessibility Requirements

### WCAG 2.1 AA Compliance

**Form Labels:**
- Every input has associated `<label>` with `for` attribute
- Required fields marked with `*` and explained in form header

**Error Messages:**
- Announced to screen readers via `aria-live="polite"`
- Error summary at top of form with jump links to error fields
- Individual field errors use `aria-describedby`

**Keyboard Navigation:**
- All form controls accessible via Tab key
- Submit button last in tab order
- Focus indicators visible (2px purple ring)

---

## 5. Related Documentation

- [Tier System](../../Global%20Context/tier_system.md) - MASTER REFERENCE for tier definitions
- [Subscription Tier Ceiling](../../Technical%20Specifications/subscription_tier_ceiling.md) - Ceiling enforcement
- [Dashboard Spec](dashboard_spec.md) - User dashboard with tier progress
- [HTML Implementation Guide](../../Design%20System/html_implementation_guide.md) - Component patterns

---

**Document Owner:** Product Lead & Engineering Lead
**Last Updated:** 2026-02-27
**Status:** Complete — Ready for Implementation
**Estimated Development Time:** 50-70 hours (all 5 tiers)
