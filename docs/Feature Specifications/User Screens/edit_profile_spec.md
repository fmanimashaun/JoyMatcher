# Edit Profile Page — Feature Specification

**Version:** 1.0.0
**Last Updated:** 2026-02-27
**Status:** Complete
**Page Route:** `/app/profile/edit`
**Access Level:** Authenticated users only (Free, Premium, VIP)

---

## Table of Contents

1. [Page Purpose & User Goals](#1-page-purpose--user-goals)
2. [Layout & Navigation Structure](#2-layout--navigation-structure)
3. [Tab Navigation System](#3-tab-navigation-system)
4. [Profile Photo Management](#4-profile-photo-management)
5. [Tier Edit Forms](#5-tier-edit-forms)
6. [Tier Revocation Controls](#6-tier-revocation-controls)
7. [Privacy Settings](#7-privacy-settings)
8. [Account Settings](#8-account-settings)
9. [Preview Mode](#9-preview-mode)
10. [Danger Zone](#10-danger-zone)
11. [State Management](#11-state-management)
12. [Form Validation](#12-form-validation)
13. [Error Handling](#13-error-handling)
14. [Accessibility Requirements](#14-accessibility-requirements)
15. [Mobile Responsive Behavior](#15-mobile-responsive-behavior)
16. [Related Documentation](#16-related-documentation)

---

## 1. Page Purpose & User Goals

### Primary Purpose

The Edit Profile page enables users to manage their tier data, profile photo, privacy settings, and account preferences. It provides complete control over information disclosure, tier revocation, and profile visibility.

### User Goals

- **Update Tier Information:** Edit completed tier data (fix typos, update preferences)
- **Manage Profile Photo:** Upload, crop, change, or delete profile picture
- **Control Access:** Revoke tier access from specific users
- **Configure Privacy:** Control profile visibility and activity status
- **Manage Account:** Update email, password, notification preferences
- **Preview Profile:** See how others view their profile at different EDT levels
- **Account Termination:** Delete account or suspend profile temporarily

### Success Metrics

- Profile edit completion rate: <5 minutes average time
- Photo upload success rate: >95%
- Tier revocation comprehension: Track user understanding via confirmation acknowledgments
- Privacy setting adoption: Track % of VIP users using private mode
- Account deletion friction: Track drop-off at each step

---

## 2. Layout & Navigation Structure

### Overall Structure

```
┌─────────────────────────────────────────────────┐
│         Navigation Header (Back to Profile)     │
├─────────────────────────────────────────────────┤
│         Page Title & Profile Photo Section      │
│  [Change Photo Button] [Preview Mode Button]   │
├─────────────────────────────────────────────────┤
│         Tab Navigation Bar                      │
│  [Tier 1] [Tier 2] [Tier 3] [Tier 4] [Tier 5] │
│  [Privacy Settings] [Account Settings]          │
├─────────────────────────────────────────────────┤
│         Active Tab Content (Forms/Settings)     │
│  [Form Fields OR Settings Controls]             │
│  [Save Changes] [Cancel] [Discard Changes]      │
├─────────────────────────────────────────────────┤
│         Danger Zone Section (Account Only)      │
│  [Delete Account] [Suspend Account]             │
└─────────────────────────────────────────────────┘
```

### Viewport Considerations

- **Desktop (≥1024px):** Single column, max-width 900px centered, tab bar horizontal
- **Tablet (768px-1023px):** Single column, full-width with padding, tab bar scrollable
- **Mobile (320px-767px):** Single column, compact spacing, tab bar scrollable with indicators

---

## 3. Tab Navigation System

### Tab Structure & States

```html
<section class="bg-white border-b border-jm-gray-200 sticky top-16 z-30 shadow-sm">
  <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
    <!-- Tab Navigation -->
    <nav class="flex overflow-x-auto no-scrollbar gap-2 py-4" role="tablist" aria-label="Profile sections">
      <!-- Tier 1 Tab -->
      <button
        type="button"
        role="tab"
        aria-selected="true"
        aria-controls="tier1-panel"
        id="tier1-tab"
        class="
          flex-shrink-0 px-5 py-3 rounded-lg font-sans text-sm font-medium
          transition-all duration-200
          bg-gradient-jm text-white shadow-md
        "
        onclick="switchTab('tier1')"
      >
        <div class="flex items-center gap-2">
          <svg class="w-4 h-4" fill="currentColor" viewBox="0 20 20">
            <path fill-rule="evenodd" d="M10 18a8 8 100-16 8 8 000 16zm3.707-9.293a1 1 00-1.414-1.414L9 10.586 7.707 9.293a1 1 00-1.414 1.414l2 2a1 1 001.414l4-4z" clip-rule="evenodd"/>
          </svg>
          Tier 1
        </div>
      </button>

      <!-- Tier 2 Tab -->
      <button
        type="button"
        role="tab"
        aria-selected="false"
        aria-controls="tier2-panel"
        id="tier2-tab"
        class="
          flex-shrink-0 px-5 py-3 rounded-lg font-sans text-sm font-medium
          transition-all duration-200
          bg-jm-gray-100 text-jm-gray-700 hover:bg-jm-gray-200
        "
        onclick="switchTab('tier2')"
      >
        <div class="flex items-center gap-2">
          <svg class="w-4 h-4" fill="currentColor" viewBox="0 20 20">
            <path fill-rule="evenodd" d="M10 18a8 8 100-16 8 8 000 16zm3.707-9.293a1 1 00-1.414-1.414L9 10.586 7.707 9.293a1 1 00-1.414 1.414l2 2a1 1 001.414l4-4z" clip-rule="evenodd"/>
          </svg>
          Tier 2
        </div>
      </button>

      <!-- Tier 3 Tab (Premium+ only) -->
      <button
        type="button"
        role="tab"
        aria-selected="false"
        aria-controls="tier3-panel"
        id="tier3-tab"
        class="
          flex-shrink-0 px-5 py-3 rounded-lg font-sans text-sm font-medium
          transition-all duration-200
          bg-jm-gray-100 text-jm-gray-700 hover:bg-jm-gray-200
        "
        onclick="switchTab('tier3')"
        *if="userSubscription !== 'free'"
      >
        <div class="flex items-center gap-2">
          <svg class="w-4 h-4" fill="currentColor" viewBox="0 20 20">
            <path fill-rule="evenodd" d="M10 18a8 8 100-16 8 8 000 16zm3.707-9.293a1 1 00-1.414-1.414L9 10.586 7.707 9.293a1 1 00-1.414 1.414l2 2a1 1 001.414l4-4z" clip-rule="evenodd"/>
          </svg>
          Tier 3
        </div>
      </button>

      <!-- Tier 4 Tab (Premium+ only) -->
      <button
        type="button"
        role="tab"
        aria-selected="false"
        aria-controls="tier4-panel"
        id="tier4-tab"
        class="
          flex-shrink-0 px-5 py-3 rounded-lg font-sans text-sm font-medium
          transition-all duration-200
          bg-jm-gray-100 text-jm-gray-700 hover:bg-jm-gray-200
        "
        onclick="switchTab('tier4')"
        *if="userSubscription !== 'free'"
      >
        <div class="flex items-center gap-2">
          <svg class="w-4 h-4" fill="currentColor" viewBox="0 20 20">
            <path fill-rule="evenodd" d="M10 18a8 8 100-16 8 8 000 16zm3.707-9.293a1 1 00-1.414-1.414L9 10.586 7.707 9.293a1 1 00-1.414 1.414l2 2a1 1 001.414l4-4z" clip-rule="evenodd"/>
          </svg>
          Tier 4
        </div>
      </button>

      <!-- Tier 5 Tab (VIP only) -->
      <button
        type="button"
        role="tab"
        aria-selected="false"
        aria-controls="tier5-panel"
        id="tier5-tab"
        class="
          flex-shrink-0 px-5 py-3 rounded-lg font-sans text-sm font-medium
          transition-all duration-200
          bg-gradient-jm text-white hover:bg-gradient-jm-hover
        "
        onclick="switchTab('tier5')"
        *if="userSubscription === 'vip'"
      >
        <div class="flex items-center gap-2">
          <svg class="w-4 h-4" fill="currentColor" viewBox="0 20 20">
            <path fill-rule="evenodd" d="M6.267 3.455a3.066 3.066 001.745-.723 3.066 3.066 013.976 3.066 3.066 001.745.723 3.066 3.066 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 010 3.976 3.066 3.066 00-.723 1.745 3.066 3.066 01-2.812 2.812 3.066 3.066 00-1.745.723 3.066 3.066 01-3.976 3.066 3.066 00-1.745-.723 3.066 3.066 01-2.812-2.812 3.066 3.066 00-.723-1.745 3.066 3.066 010-3.976 3.066 3.066 00.723-1.745 3.066 3.066 012.812-2.812zm7.44 5.252a1 1 00-1.414-1.414L9 10.586 7.707 9.293a1 1 00-1.414 1.414l2 2a1 1 001.414l4-4z" clip-rule="evenodd"/>
          </svg>
          Tier 5 (VIP)
        </div>
      </button>

      <!-- Divider -->
      <div class="flex-shrink-0 w-px bg-jm-gray-300 mx-2"></div>

      <!-- Privacy Settings Tab -->
      <button
        type="button"
        role="tab"
        aria-selected="false"
        aria-controls="privacy-panel"
        id="privacy-tab"
        class="
          flex-shrink-0 px-5 py-3 rounded-lg font-sans text-sm font-medium
          transition-all duration-200
          bg-jm-gray-100 text-jm-gray-700 hover:bg-jm-gray-200
        "
        onclick="switchTab('privacy')"
      >
        <div class="flex items-center gap-2">
          <svg class="w-4 h-4" fill="currentColor" viewBox="0 20 20">
            <path fill-rule="evenodd" d="M5 9V7a5 5 0110v2a2 2 012 2v5a2 2 01-2 2H5a2 2 01-2-2v-5a2 2 012-2zm8-2v2H7V7a3 3 016z" clip-rule="evenodd"/>
          </svg>
          Privacy
        </div>
      </button>

      <!-- Account Settings Tab -->
      <button
        type="button"
        role="tab"
        aria-selected="false"
        aria-controls="account-panel"
        id="account-tab"
        class="
          flex-shrink-0 px-5 py-3 rounded-lg font-sans text-sm font-medium
          transition-all duration-200
          bg-jm-gray-100 text-jm-gray-700 hover:bg-jm-gray-200
        "
        onclick="switchTab('account')"
      >
        <div class="flex items-center gap-2">
          <svg class="w-4 h-4" fill="currentColor" viewBox="0 20 20">
            <path fill-rule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98a1.532 1.532 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 2.978a1.532 1.532 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 012.287.947c.379 1.561 2.6 1.561 2.978a1.533 1.533 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 01.947-2.287c1.561-.379 1.561-2.6-2.978a1.532 1.532 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 01-2.287-.947zM10 13a3 3 100-6 3 3 000 6z" clip-rule="evenodd"/>
          </svg>
          Account
        </div>
      </button>
    </nav>
  </div>
</section>
```

### Tab Switching Logic

```javascript
/**
 * Switch between profile tabs
 * @param {String} tabId - Tab identifier (tier1, tier2, privacy, account, etc.)
 */
function switchTab(tabId) {
  // Check for unsaved changes
  if (EditProfileState.unsavedChanges) {
    showUnsavedChangesWarning(tabId);
    return;
  }

  // Update tab states
  const allTabs = document.querySelectorAll('[role="tab"]');
  const allPanels = document.querySelectorAll('[role="tabpanel"]');

  allTabs.forEach(tab => {
    tab.setAttribute('aria-selected', 'false');
    tab.classList.remove('bg-gradient-jm', 'text-white', 'shadow-md');
    tab.classList.add('bg-jm-gray-100', 'text-jm-gray-700', 'hover:bg-jm-gray-200');
  });

  allPanels.forEach(panel => {
    panel.classList.add('hidden');
  });

  // Activate selected tab
  const activeTab = document.getElementById(`${tabId}-tab`);
  const activePanel = document.getElementById(`${tabId}-panel`);

  if (activeTab && activePanel) {
    activeTab.setAttribute('aria-selected', 'true');
    activeTab.classList.add('bg-gradient-jm', 'text-white', 'shadow-md');
    activeTab.classList.remove('bg-jm-gray-100', 'text-jm-gray-700', 'hover:bg-jm-gray-200');
    activePanel.classList.remove('hidden');

    // Update state
    EditProfileState.currentTab = tabId;

    // Scroll to top of content
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Save tab preference
    localStorage.setItem('lastEditProfileTab', tabId);
  }
}
```

---

## 4. Profile Photo Management

### Photo Upload Section

```html
<section class="bg-white py-8 border-b border-jm-gray-200">
  <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="flex flex-col md:flex-row items-center md:items-start gap-8">
      <!-- Current Photo Display -->
      <div class="relative flex-shrink-0">
        <img
          id="current-profile-photo"
          src="/images/profiles/user-123.jpg"
          alt="Your profile photo"
          class="w-40 h-40 rounded-full border-4 border-jm-purple object-cover shadow-lg"
        />

        <!-- Delete Photo Button -->
        <button
          type="button"
          class="
            absolute bottom-0 right-0
            bg-jm-error hover:bg-jm-error/90
            text-white p-2 rounded-full
            shadow-lg border-4 border-white
            transition-all duration-200
            focus:outline-none focus:ring-2 focus:ring-jm-error focus:ring-offset-2
          "
          onclick="confirmDeletePhoto()"
          aria-label="Delete profile photo"
        >
          <svg class="w-5 h-5" fill="currentColor" viewBox="0 20 20">
            <path fill-rule="evenodd" d="M9 2a1 1 00-.894.553L7.382 4H4a1 1 000 2v10a2 2 002 2h8a2 2 002-2V6a1 1 100-2h-3.382l-.724-1.447A1 1 0011 2H9zM7 8a1 1 012v6a1 1 11-2V8zm5-1a1 1 00-1 1v6a1 1 102V8a1 1 00-1-1z" clip-rule="evenodd"/>
          </svg>
        </button>
      </div>

      <!-- Upload Controls -->
      <div class="flex-1 space-y-6">
        <div class="space-y-2">
          <h2 class="font-serif text-2xl font-bold text-jm-gray-900">
            Profile Photo
          </h2>
          <p class="font-sans text-sm text-jm-gray-600">
            Your profile photo is the first thing others see. Make it count!
          </p>
        </div>

        <!-- Upload Guidelines -->
        <div class="bg-jm-gray-50 border-2 border-jm-gray-200 rounded-lg p-4 space-y-2">
          <h3 class="font-sans text-sm font-semibold text-jm-gray-900">
            Photo Guidelines:
          </h3>
          <ul class="space-y-1 text-sm text-jm-gray-700">
            <li class="flex items-start gap-2">
              <svg class="w-4 h-4 text-jm-success mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 20 20">
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 010 1.414l-8 8a1 1 01-1.414l-4-4a1 1 011.414-1.414L8 12.586l7.293-7.293a1 1 011.414z" clip-rule="evenodd"/>
              </svg>
              Clear, recent photo of your face (no sunglasses)
            </li>
            <li class="flex items-start gap-2">
              <svg class="w-4 h-4 text-jm-success mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 20 20">
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 010 1.414l-8 8a1 1 01-1.414l-4-4a1 1 011.414-1.414L8 12.586l7.293-7.293a1 1 011.414z" clip-rule="evenodd"/>
              </svg>
              Solo photo only (no group photos)
            </li>
            <li class="flex items-start gap-2">
              <svg class="w-4 h-4 text-jm-success mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 20 20">
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 010 1.414l-8 8a1 1 01-1.414l-4-4a1 1 011.414-1.414L8 12.586l7.293-7.293a1 1 011.414z" clip-rule="evenodd"/>
              </svg>
              Minimum resolution: 400x400 pixels
            </li>
            <li class="flex items-start gap-2">
              <svg class="w-4 h-4 text-jm-success mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 20 20">
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 010 1.414l-8 8a1 1 01-1.414l-4-4a1 1 011.414-1.414L8 12.586l7.293-7.293a1 1 011.414z" clip-rule="evenodd"/>
              </svg>
              Accepted formats: JPG, PNG (max 5MB)
            </li>
          </ul>
        </div>

        <!-- Upload Button -->
        <div class="flex gap-3">
          <label
            for="photo-upload"
            class="
              cursor-pointer inline-flex items-center gap-2
              bg-gradient-jm hover:bg-gradient-jm-hover
              text-white font-sans font-semibold
              px-6 py-3 rounded-lg
              transition-all duration-200
              shadow-md hover:shadow-lg
              focus-within:outline-none focus-within:ring-2 focus-within:ring-jm-coral focus-within:ring-offset-2
            "
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 012.828L16 16m-2-2l1.586-1.586a2 2 012.828L20 14m-6-6h.01M6 20h12a2 2 002-2V6a2 2 00-2-2H6a2 2 00-2 2v12a2 2 002 2z"/>
            </svg>
            Change Photo
            <input
              type="file"
              id="photo-upload"
              accept="image/jpeg,image/png"
              class="sr-only"
              onchange="handlePhotoUpload(event)"
            />
          </label>

          <button
            type="button"
            class="
              inline-flex items-center gap-2
              border-2 border-jm-gray-300 hover:border-jm-gray-400
              text-jm-gray-700 hover:text-jm-gray-900
              font-sans font-medium
              px-6 py-3 rounded-lg
              transition-all duration-200
              focus:outline-none focus:ring-2 focus:ring-jm-gray-400 focus:ring-offset-2
            "
            onclick="openPreviewModal()"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 11-6 3 3 016z"/>
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477-8.268-2.943-9.542-7z"/>
            </svg>
            Preview as Others See It
          </button>
        </div>
      </div>
    </div>
  </div>
</section>
```

### Photo Crop Modal

```html
<!-- Photo Crop Modal -->
<div
  id="photo-crop-modal"
  class="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 hidden items-center justify-center p-4"
  role="dialog"
  aria-modal="true"
  aria-labelledby="crop-modal-title"
>
  <div class="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
    <!-- Header -->
    <div class="bg-jm-gray-900 text-white p-6">
      <h2 id="crop-modal-title" class="font-serif text-2xl font-bold">
        Crop Your Photo
      </h2>
      <p class="font-sans text-sm text-jm-gray-300 mt-1">
        Adjust the crop area to show your best angle
      </p>
    </div>

    <!-- Body -->
    <div class="p-6 space-y-6">
      <!-- Crop Area -->
      <div class="bg-jm-gray-900 rounded-lg overflow-hidden relative" style="min-height: 400px;">
        <img
          id="crop-preview-image"
          src=""
          alt="Photo to crop"
          class="max-w-full max-h-[500px] mx-auto"
        />
        <!-- Crop overlay rendered by Cropper.js or similar -->
      </div>

      <!-- Crop Controls -->
      <div class="flex items-center justify-center gap-4">
        <button
          type="button"
          class="p-2 rounded-full hover:bg-jm-gray-100 transition-colors"
          onclick="rotateCrop(-90)"
          aria-label="Rotate left"
        >
          <svg class="w-6 h-6 text-jm-gray-700" fill="none" stroke="currentColor" viewBox="0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h10a8 8 018 8v2M3 10l6 6m-6-6l6-6"/>
          </svg>
        </button>
        <button
          type="button"
          class="p-2 rounded-full hover:bg-jm-gray-100 transition-colors"
          onclick="rotateCrop(90)"
          aria-label="Rotate right"
        >
          <svg class="w-6 h-6 text-jm-gray-700" fill="none" stroke="currentColor" viewBox="0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 10H11a8 8 00-8 8v2m18-10l-6 6m6-6l-6-6"/>
          </svg>
        </button>
        <button
          type="button"
          class="p-2 rounded-full hover:bg-jm-gray-100 transition-colors"
          onclick="zoomCrop(1.1)"
          aria-label="Zoom in"
        >
          <svg class="w-6 h-6 text-jm-gray-700" fill="none" stroke="currentColor" viewBox="0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 11-14 7 7 0114zM10 7v6m3-3H7"/>
          </svg>
        </button>
        <button
          type="button"
          class="p-2 rounded-full hover:bg-jm-gray-100 transition-colors"
          onclick="zoomCrop(0.9)"
          aria-label="Zoom out"
        >
          <svg class="w-6 h-6 text-jm-gray-700" fill="none" stroke="currentColor" viewBox="0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 11-14 7 7 0114zM13 10H7"/>
          </svg>
        </button>
      </div>

      <!-- Aspect Ratio Info -->
      <div class="bg-jm-purple/5 border-2 border-jm-purple/20 rounded-lg p-4 text-center">
        <p class="font-sans text-sm text-jm-gray-700">
          Photo will be cropped to <strong>1:1 aspect ratio</strong> (square) for optimal display
        </p>
      </div>
    </div>

    <!-- Footer -->
    <div class="bg-jm-gray-50 border-t border-jm-gray-200 p-6 flex flex-col sm:flex-row items-center justify-end gap-3">
      <button
        type="button"
        class="w-full sm:w-auto border-2 border-jm-gray-300 hover:border-jm-gray-400 text-jm-gray-700 font-sans font-medium px-6 py-3 rounded-lg"
        onclick="closeCropModal()"
      >
        Cancel
      </button>
      <button
        type="button"
        class="w-full sm:w-auto bg-gradient-jm hover:bg-gradient-jm-hover text-white font-sans font-semibold px-8 py-3 rounded-lg shadow-md"
        onclick="confirmCrop()"
      >
        Apply & Save
      </button>
    </div>
  </div>
</div>
```

---

## 5. Tier Edit Forms

### Tier 1 Edit Form (Example)

```html
<div id="tier1-panel" role="tabpanel" aria-labelledby="tier1-tab" class="bg-white py-8">
  <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
    <form id="tier1-form" onsubmit="saveTierChanges(event, 1)">
      <!-- Form Header -->
      <div class="mb-8">
        <h1 class="font-serif text-3xl font-bold text-jm-gray-900 mb-2">
          Tier 1: Identity & Intent
        </h1>
        <p class="font-sans text-base text-jm-gray-600">
          This information is <strong>publicly visible</strong> to all JoyMatcher users.
        </p>
      </div>

      <!-- About Me -->
      <div class="space-y-2 mb-6">
        <label for="about-me" class="block font-sans text-sm font-medium text-jm-gray-700">
          About Me <span class="text-jm-error">*</span>
        </label>
        <textarea
          id="about-me"
          name="about_me"
          rows="6"
          placeholder="Share a brief introduction about yourself, your values, and what you're looking for..."
          class="
            w-full px-4 py-3 rounded-lg
            border-2 border-jm-gray-300 focus:border-jm-purple focus:ring-2 focus:ring-jm-purple/20
            font-sans text-base text-jm-gray-900 placeholder:text-jm-gray-400
            transition-all duration-200
            focus:outline-none
            resize-vertical
          "
          maxlength="1000"
          required
          oninput="updateCharacterCount('about-me', 'about-me-count', 1000)"
        >I'm a Product Manager passionate about creating meaningful experiences...</textarea>
        <div class="flex items-center justify-between text-xs text-jm-gray-500">
          <span>Share your authentic self</span>
          <span id="about-me-count">287 / 1000 characters</span>
        </div>
      </div>

      <!-- Faith/Belief -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div class="space-y-2">
          <label for="faith" class="block font-sans text-sm font-medium text-jm-gray-700">
            Faith / Belief <span class="text-jm-error">*</span>
          </label>
          <select
            id="faith"
            name="faith"
            class="
              w-full px-4 py-3 rounded-lg
              border-2 border-jm-gray-300 focus:border-jm-purple focus:ring-2 focus:ring-jm-purple/20
              font-sans text-base text-jm-gray-900
              transition-all duration-200
              focus:outline-none
              appearance-none bg-white cursor-pointer
            "
            style="background-image: url('data:image/svg+xml;charset=UTF-8,%3csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 20 20%27 fill=%27%236B7280%27%3e%3cpath fill-rule=%27evenodd%27 d=%27M5.293 7.293a1 1 011.414L10 10.586l3.293-3.293a1 1 111.414 1.414l-4 4a1 1 01-1.414l-4-4a1 1 010-1.414z%27 clip-rule=%27evenodd%27/%3e%3c/svg%3e'); background-position: right 0.75rem center; background-repeat: no-repeat; background-size: 1.25rem;"
            required
            onchange="markFormDirty()"
          >
            <option value="" disabled>Select your faith</option>
            <option value="christian-catholic" selected>Christian (Catholic)</option>
            <option value="christian-protestant">Christian (Protestant)</option>
            <option value="christian-pentecostal">Christian (Pentecostal)</option>
            <option value="muslim-sunni">Muslim (Sunni)</option>
            <option value="muslim-shia">Muslim (Shia)</option>
            <option value="spiritual">Spiritual (not religious)</option>
            <option value="agnostic">Agnostic</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div class="space-y-2">
          <label for="relationship-intent" class="block font-sans text-sm font-medium text-jm-gray-700">
            Relationship Intent <span class="text-jm-error">*</span>
          </label>
          <select
            id="relationship-intent"
            name="relationship_intent"
            class="
              w-full px-4 py-3 rounded-lg
              border-2 border-jm-gray-300 focus:border-jm-purple focus:ring-2 focus:ring-jm-purple/20
              font-sans text-base text-jm-gray-900
              transition-all duration-200
              focus:outline-none
              appearance-none bg-white cursor-pointer
            "
            style="background-image: url('data:image/svg+xml;charset=UTF-8,%3csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 20 20%27 fill=%27%236B7280%27%3e%3cpath fill-rule=%27evenodd%27 d=%27M5.293 7.293a1 1 011.414L10 10.586l3.293-3.293a1 1 111.414 1.414l-4 4a1 1 01-1.414l-4-4a1 1 010-1.414z%27 clip-rule=%27evenodd%27/%3e%3c/svg%3e'); background-position: right 0.75rem center; background-repeat: no-repeat; background-size: 1.25rem;"
            required
            onchange="markFormDirty()"
          >
            <option value="" disabled>Select your intent</option>
            <option value="marriage-1-2-years" selected>Marriage within 1-2 years</option>
            <option value="marriage-6-12-months">Marriage within 6-12 months</option>
            <option value="marriage-open-timeline">Marriage (open timeline)</option>
            <option value="long-term-committed">Long-term committed relationship</option>
            <option value="exploring">Exploring (open to marriage)</option>
          </select>
        </div>
      </div>

      <!-- Education & Occupation -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div class="space-y-2">
          <label for="education-level" class="block font-sans text-sm font-medium text-jm-gray-700">
            Education Level <span class="text-jm-error">*</span>
          </label>
          <select
            id="education-level"
            name="education_level"
            class="w-full px-4 py-3 rounded-lg border-2 border-jm-gray-300 focus:border-jm-purple focus:ring-2 focus:ring-jm-purple/20 font-sans text-base text-jm-gray-900"
            required
            onchange="markFormDirty()"
          >
            <option value="" disabled>Select education level</option>
            <option value="high-school">High School / Secondary</option>
            <option value="associate">Associate Degree</option>
            <option value="bachelors">Bachelor's Degree</option>
            <option value="masters" selected>Master's Degree</option>
            <option value="phd">PhD / Doctorate</option>
            <option value="professional">Professional Degree (MD, JD, etc.)</option>
          </select>
        </div>

        <div class="space-y-2">
          <label for="education-field" class="block font-sans text-sm font-medium text-jm-gray-700">
            Field of Study
          </label>
          <input
            type="text"
            id="education-field"
            name="education_field"
            placeholder="e.g., Business Administration"
            value="Business Administration"
            class="w-full px-4 py-3 rounded-lg border-2 border-jm-gray-300 focus:border-jm-purple focus:ring-2 focus:ring-jm-purple/20 font-sans text-base text-jm-gray-900"
            onchange="markFormDirty()"
          />
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div class="space-y-2">
          <label for="occupation" class="block font-sans text-sm font-medium text-jm-gray-700">
            Occupation <span class="text-jm-error">*</span>
          </label>
          <input
            type="text"
            id="occupation"
            name="occupation"
            placeholder="e.g., Product Manager"
            value="Product Manager"
            class="w-full px-4 py-3 rounded-lg border-2 border-jm-gray-300 focus:border-jm-purple focus:ring-2 focus:ring-jm-purple/20 font-sans text-base text-jm-gray-900"
            required
            onchange="markFormDirty()"
          />
        </div>

        <div class="space-y-2">
          <label for="industry" class="block font-sans text-sm font-medium text-jm-gray-700">
            Industry <span class="text-jm-error">*</span>
          </label>
          <select
            id="industry"
            name="industry"
            class="w-full px-4 py-3 rounded-lg border-2 border-jm-gray-300 focus:border-jm-purple focus:ring-2 focus:ring-jm-purple/20 font-sans text-base text-jm-gray-900"
            required
            onchange="markFormDirty()"
          >
            <option value="" disabled>Select industry</option>
            <option value="technology-saas" selected>Technology / SaaS</option>
            <option value="finance">Finance / Banking</option>
            <option value="healthcare">Healthcare / Medical</option>
            <option value="education">Education</option>
            <option value="legal">Legal / Law</option>
            <option value="engineering">Engineering</option>
            <option value="creative">Creative / Design / Media</option>
            <option value="consulting">Consulting</option>
            <option value="government">Government / Public Sector</option>
            <option value="other">Other</option>
          </select>
        </div>
      </div>

      <!-- Form Actions -->
      <div class="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-jm-gray-200">
        <button
          type="button"
          class="
            w-full sm:w-auto
            text-jm-error hover:text-jm-error/80
            font-sans font-medium text-sm
            underline
          "
          onclick="resetForm(1)"
        >
          Discard Changes
        </button>

        <div class="flex gap-3 w-full sm:w-auto">
          <a
            href="/app/profile/me"
            class="
              flex-1 sm:flex-none
              border-2 border-jm-gray-300 hover:border-jm-gray-400
              text-jm-gray-700 hover:text-jm-gray-900
              font-sans font-medium
              px-6 py-3 rounded-lg text-center
              transition-all duration-200
            "
          >
            Cancel
          </a>
          <button
            type="submit"
            class="
              flex-1 sm:flex-none
              bg-gradient-jm hover:bg-gradient-jm-hover
              text-white font-sans font-semibold
              px-8 py-3 rounded-lg
              shadow-md hover:shadow-lg
              transition-all duration-200
            "
          >
            Save Changes
          </button>
        </div>
      </div>
    </form>
  </div>
</div>
```

---

## 6. Tier Revocation Controls

### Revoke Access Section

```html
<section class="bg-white py-8 border-t border-jm-gray-200">
  <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="space-y-6">
      <!-- Section Header -->
      <div class="space-y-2">
        <h2 class="font-serif text-2xl font-bold text-jm-gray-900">
          Manage Tier Access
        </h2>
        <p class="font-sans text-base text-jm-gray-600">
          You can revoke access to your Tier 3 information from specific users. This will lower their EDT and hide this tier from them.
        </p>
      </div>

      <!-- Users with Access List -->
      <div class="space-y-4">
        <h3 class="font-sans text-sm font-semibold text-jm-gray-700 uppercase tracking-wide">
          Users with Tier 3 Access:
        </h3>

        <!-- User Card (Example) -->
        <div class="bg-jm-gray-50 border-2 border-jm-gray-200 rounded-lg p-5">
          <div class="flex items-start justify-between gap-4">
            <!-- User Info -->
            <div class="flex items-center gap-4">
              <img
                src="/images/profiles/user-456.jpg"
                alt="Emmanuel A."
                class="w-14 h-14 rounded-full border-2 border-jm-purple object-cover"
              />
              <div>
                <h4 class="font-sans text-base font-semibold text-jm-gray-900">
                  Emmanuel A., 32
                </h4>
                <p class="font-sans text-sm text-jm-gray-600">
                  Lagos, Nigeria
                </p>
                <p class="font-sans text-xs text-jm-gray-500 mt-1">
                  Current EDT: Tier 3 • Shared since Feb 15, 2026
                </p>
              </div>
            </div>

            <!-- Revoke Button -->
            <button
              type="button"
              class="
                flex-shrink-0
                border-2 border-jm-warning hover:border-jm-warning/80 hover:bg-jm-warning/5
                text-jm-warning hover:text-jm-warning/80
                font-sans font-medium text-sm
                px-4 py-2 rounded-lg
                transition-all duration-200
              "
              onclick="confirmRevokeTierAccess('user-456', 3)"
            >
              Revoke Tier 3
            </button>
          </div>
        </div>

        <!-- Another User Card -->
        <div class="bg-jm-gray-50 border-2 border-jm-gray-200 rounded-lg p-5">
          <div class="flex items-start justify-between gap-4">
            <div class="flex items-center gap-4">
              <img
                src="/images/profiles/user-789.jpg"
                alt="Adanna K."
                class="w-14 h-14 rounded-full border-2 border-jm-purple object-cover"
              />
              <div>
                <h4 class="font-sans text-base font-semibold text-jm-gray-900">
                  Adanna K., 29
                </h4>
                <p class="font-sans text-sm text-jm-gray-600">
                  Abuja, Nigeria
                </p>
                <p class="font-sans text-xs text-jm-gray-500 mt-1">
                  Current EDT: Tier 3 • Shared since Jan 28, 2026
                </p>
              </div>
            </div>
            <button
              type="button"
              class="
                flex-shrink-0
                border-2 border-jm-warning hover:border-jm-warning/80 hover:bg-jm-warning/5
                text-jm-warning hover:text-jm-warning/80
                font-sans font-medium text-sm
                px-4 py-2 rounded-lg
                transition-all duration-200
              "
              onclick="confirmRevokeTierAccess('user-789', 3)"
            >
              Revoke Tier 3
            </button>
          </div>
        </div>

        <!-- No Access State -->
        <div class="bg-jm-gray-50 border-2 border-jm-gray-200 border-dashed rounded-lg p-8 text-center" *if="noUsersWithAccess">
          <svg class="w-12 h-12 text-jm-gray-300 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 110 5.292M15 21H3v-1a6 6 0112v1zm0h6v-1a6 6 00-9-5.197M13 7a4 4 11-8 4 4 018z"/>
          </svg>
          <p class="font-sans text-sm text-jm-gray-600">
            No users have access to your Tier 3 information yet
          </p>
        </div>
      </div>
    </div>
  </div>
</section>
```

### Revoke Confirmation Modal

```html
<div id="revoke-tier-modal" class="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 hidden items-center justify-center p-4">
  <div class="bg-white rounded-2xl shadow-2xl w-full max-w-md">
    <div class="p-6 space-y-4">
      <!-- Icon & Title -->
      <div class="flex items-start gap-4">
        <div class="w-12 h-12 rounded-full bg-jm-warning/10 flex items-center justify-center flex-shrink-0">
          <svg class="w-6 h-6 text-jm-warning" fill="currentColor" viewBox="0 20 20">
            <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 11-2 1 1 012zm-1-8a1 1 00-1 1v3a1 1 002V6a1 1 00-1-1z" clip-rule="evenodd"/>
          </svg>
        </div>
        <div class="flex-1">
          <h3 class="font-serif text-xl font-bold text-jm-gray-900 mb-2">
            Revoke Tier 3 Access from Emmanuel A.?
          </h3>
          <p class="font-sans text-sm text-jm-gray-700 leading-relaxed mb-3">
            This will:
          </p>
          <ul class="font-sans text-sm text-jm-gray-700 list-disc list-inside space-y-1 mb-4">
            <li>Hide your Tier 3 information from Emmanuel</li>
            <li>Lower your EDT from Tier 3 → Tier 2</li>
            <li>Emmanuel will be notified of this change</li>
            <li>You can re-share later if you change your mind</li>
          </ul>
          <div class="bg-jm-purple/5 border-2 border-jm-purple/20 rounded-lg p-3">
            <p class="font-sans text-xs text-jm-gray-700 leading-relaxed">
              <strong>Note:</strong> Emmanuel will still have access to your Tier 1-2 information. This only revokes Tier 3 access.
            </p>
          </div>
        </div>
      </div>

      <!-- Acknowledgment -->
      <label class="flex items-start gap-3 cursor-pointer">
        <input
          type="checkbox"
          id="revoke-acknowledge"
          class="w-5 h-5 mt-0.5 text-jm-purple border-jm-gray-300 rounded focus:ring-2 focus:ring-jm-purple/20"
          onchange="toggleRevokeButton()"
        />
        <span class="font-sans text-sm text-jm-gray-700">
          I understand that this will lower my EDT with Emmanuel to Tier 2
        </span>
      </label>

      <!-- Actions -->
      <div class="flex gap-3 pt-4">
        <button
          type="button"
          class="flex-1 border-2 border-jm-gray-300 hover:border-jm-gray-400 text-jm-gray-700 font-sans font-medium px-4 py-3 rounded-lg"
          onclick="closeRevokeModal()"
        >
          Cancel
        </button>
        <button
          type="button"
          id="confirm-revoke-btn"
          class="flex-1 bg-jm-warning hover:bg-jm-warning/90 text-white font-sans font-semibold px-4 py-3 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
          onclick="confirmRevoke('user-456', 3)"
          disabled
        >
          Revoke Access
        </button>
      </div>
    </div>
  </div>
</div>
```

---

## 7. Privacy Settings

### Privacy Settings Tab

```html
<div id="privacy-panel" role="tabpanel" aria-labelledby="privacy-tab" class="hidden bg-white py-8">
  <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="space-y-8">
      <!-- Section Header -->
      <div class="space-y-2">
        <h1 class="font-serif text-3xl font-bold text-jm-gray-900">
          Privacy Settings
        </h1>
        <p class="font-sans text-base text-jm-gray-600">
          Control who can see your profile and activity
        </p>
      </div>

      <!-- VIP Profile Visibility (VIP Only) -->
      <div class="bg-gradient-to-r from-jm-purple-deep/5 to-jm-coral/5 border-2 border-jm-purple/20 rounded-xl p-6 space-y-4" *if="userSubscription === 'vip'">
        <div class="flex items-start gap-4">
          <div class="w-12 h-12 rounded-full bg-gradient-jm flex items-center justify-center flex-shrink-0">
            <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902l1.07 3.292a1 1 00.95.69h3.462c.969 1.371 1.24.588 1.81l-2.8 2.034a1 1 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 00-1.175l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 00.951-.69l1.07-3.292z"/>
            </svg>
          </div>
          <div class="flex-1">
            <h2 class="font-sans text-lg font-bold text-jm-gray-900 mb-2">
              VIP Profile Visibility
            </h2>
            <p class="font-sans text-sm text-jm-gray-700 leading-relaxed mb-4">
              As a VIP member, you can make your profile completely private. Only users you've been introduced to by your VIP concierge will be able to view your profile.
            </p>
            <div class="flex items-center gap-4">
              <label class="flex items-center gap-3 cursor-pointer">
                <input
                  type="radio"
                  name="vip-visibility"
                  value="public"
                  checked
                  class="w-5 h-5 text-jm-purple focus:ring-2 focus:ring-jm-purple/20"
                  onchange="updateVIPVisibility('public')"
                />
                <span class="font-sans text-base text-jm-gray-900">
                  Public (visible in Discover)
                </span>
              </label>
              <label class="flex items-center gap-3 cursor-pointer">
                <input
                  type="radio"
                  name="vip-visibility"
                  value="private"
                  class="w-5 h-5 text-jm-purple focus:ring-2 focus:ring-jm-purple/20"
                  onchange="updateVIPVisibility('private')"
                />
                <span class="font-sans text-base text-jm-gray-900">
                  Private (curated only)
                </span>
              </label>
            </div>
          </div>
        </div>
      </div>

      <!-- Discover Visibility -->
      <div class="space-y-4">
        <div class="flex items-start justify-between gap-6">
          <div class="flex-1">
            <h3 class="font-sans text-base font-semibold text-jm-gray-900 mb-1">
              Show me in Discover results
            </h3>
            <p class="font-sans text-sm text-jm-gray-600">
              Allow other users to find your profile when browsing matches
            </p>
          </div>
          <!-- Toggle Switch -->
          <label class="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              id="discover-visibility"
              checked
              class="sr-only peer"
              onchange="updatePrivacySetting('discoverVisibility', this.checked)"
            />
            <div class="w-14 h-8 bg-jm-gray-300 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-jm-purple peer-focus:ring-offset-2 rounded-full peer peer-checked:after:translate-x-6 peer-checked:after:border-white after:content-[''] after:absolute after:top-1 after:left-1 after:bg-white after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-jm-purple"></div>
          </label>
        </div>
      </div>

      <div class="border-t border-jm-gray-200 pt-6">
        <div class="flex items-start justify-between gap-6">
          <div class="flex-1">
            <h3 class="font-sans text-base font-semibold text-jm-gray-900 mb-1">
              Allow others to find me by name
            </h3>
            <p class="font-sans text-sm text-jm-gray-600">
              Let users search for your profile using your name (first name only)
            </p>
          </div>
          <label class="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              id="name-search"
              checked
              class="sr-only peer"
              onchange="updatePrivacySetting('nameSearch', this.checked)"
            />
            <div class="w-14 h-8 bg-jm-gray-300 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-jm-purple peer-focus:ring-offset-2 rounded-full peer peer-checked:after:translate-x-6 peer-checked:after:border-white after:content-[''] after:absolute after:top-1 after:left-1 after:bg-white after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-jm-purple"></div>
          </label>
        </div>
      </div>

      <div class="border-t border-jm-gray-200 pt-6">
        <div class="flex items-start justify-between gap-6">
          <div class="flex-1">
            <h3 class="font-sans text-base font-semibold text-jm-gray-900 mb-1">
              Show when I was last active
            </h3>
            <p class="font-sans text-sm text-jm-gray-600">
              Display "Active X hours ago" on your profile
            </p>
          </div>
          <label class="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              id="activity-status"
              checked
              class="sr-only peer"
              onchange="updatePrivacySetting('activityStatus', this.checked)"
            />
            <div class="w-14 h-8 bg-jm-gray-300 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-jm-purple peer-focus:ring-offset-2 rounded-full peer peer-checked:after:translate-x-6 peer-checked:after:border-white after:content-[''] after:absolute after:top-1 after:left-1 after:bg-white after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-jm-purple"></div>
          </label>
        </div>
      </div>

      <div class="border-t border-jm-gray-200 pt-6">
        <div class="flex items-start justify-between gap-6">
          <div class="flex-1">
            <h3 class="font-sans text-base font-semibold text-jm-gray-900 mb-1">
              Show profile completion percentage
            </h3>
            <p class="font-sans text-sm text-jm-gray-600">
              Let others see how much of your profile is completed
            </p>
          </div>
          <label class="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              id="profile-completion"
              checked
              class="sr-only peer"
              onchange="updatePrivacySetting('profileCompletion', this.checked)"
            />
            <div class="w-14 h-8 bg-jm-gray-300 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-jm-purple peer-focus:ring-offset-2 rounded-full peer peer-checked:after:translate-x-6 peer-checked:after:border-white after:content-[''] after:absolute after:top-1 after:left-1 after:bg-white after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-jm-purple"></div>
          </label>
        </div>
      </div>

      <!-- Auto-Save Notice -->
      <div class="bg-jm-success/10 border-l-4 border-jm-success p-4 rounded-r-lg flex items-start gap-3">
        <svg class="w-5 h-5 text-jm-success flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 20 20">
          <path fill-rule="evenodd" d="M10 18a8 8 100-16 8 8 000 16zm3.707-9.293a1 1 00-1.414-1.414L9 10.586 7.707 9.293a1 1 00-1.414 1.414l2 2a1 1 001.414l4-4z" clip-rule="evenodd"/>
        </svg>
        <p class="font-sans text-sm text-jm-gray-700">
          All privacy settings are saved automatically
        </p>
      </div>
    </div>
  </div>
</div>
```

---

## 8. Account Settings

### Account Settings Tab

```html
<div id="account-panel" role="tabpanel" aria-labelledby="account-tab" class="hidden bg-white py-8">
  <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="space-y-12">
      <!-- Section Header -->
      <div class="space-y-2">
        <h1 class="font-serif text-3xl font-bold text-jm-gray-900">
          Account Settings
        </h1>
        <p class="font-sans text-base text-jm-gray-600">
          Manage your account credentials and preferences
        </p>
      </div>

      <!-- Email Section -->
      <div class="space-y-4">
        <h2 class="font-sans text-lg font-bold text-jm-gray-900">
          Email Address
        </h2>
        <div class="space-y-2">
          <label for="current-email" class="block font-sans text-sm font-medium text-jm-gray-700">
            Current Email
          </label>
          <input
            type="email"
            id="current-email"
            value="chidinma.o@example.com"
            disabled
            class="w-full px-4 py-3 rounded-lg border-2 border-jm-gray-300 bg-jm-gray-100 font-sans text-base text-jm-gray-600 cursor-not-allowed"
          />
        </div>
        <button
          type="button"
          class="border-2 border-jm-purple hover:border-jm-purple-dark text-jm-purple hover:text-jm-purple-dark hover:bg-jm-purple/5 font-sans font-medium px-6 py-3 rounded-lg"
          onclick="openChangeEmailModal()"
        >
          Change Email Address
        </button>
      </div>

      <!-- Password Section -->
      <div class="space-y-4 border-t border-jm-gray-200 pt-8">
        <h2 class="font-sans text-lg font-bold text-jm-gray-900">
          Password
        </h2>
        <p class="font-sans text-sm text-jm-gray-600">
          Last changed: <strong>45 days ago</strong>
        </p>
        <button
          type="button"
          class="border-2 border-jm-purple hover:border-jm-purple-dark text-jm-purple hover:text-jm-purple-dark hover:bg-jm-purple/5 font-sans font-medium px-6 py-3 rounded-lg"
          onclick="openChangePasswordModal()"
        >
          Change Password
        </button>
      </div>

      <!-- Notification Preferences -->
      <div class="space-y-6 border-t border-jm-gray-200 pt-8">
        <h2 class="font-sans text-lg font-bold text-jm-gray-900">
          Notification Preferences
        </h2>

        <!-- Email Notifications -->
        <div class="space-y-4">
          <div class="flex items-start justify-between gap-6">
            <div class="flex-1">
              <h3 class="font-sans text-base font-semibold text-jm-gray-900 mb-1">
                Email Notifications
              </h3>
              <p class="font-sans text-sm text-jm-gray-600">
                Receive email updates for Show Interest, messages, and matches
              </p>
            </div>
            <label class="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                id="email-notifications"
                checked
                class="sr-only peer"
                onchange="updateNotificationSetting('email', this.checked)"
              />
              <div class="w-14 h-8 bg-jm-gray-300 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-jm-purple peer-focus:ring-offset-2 rounded-full peer peer-checked:after:translate-x-6 peer-checked:after:border-white after:content-[''] after:absolute after:top-1 after:left-1 after:bg-white after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-jm-purple"></div>
            </label>
          </div>

          <div class="flex items-start justify-between gap-6">
            <div class="flex-1">
              <h3 class="font-sans text-base font-semibold text-jm-gray-900 mb-1">
                Push Notifications
              </h3>
              <p class="font-sans text-sm text-jm-gray-600">
                Receive browser push notifications for real-time updates
              </p>
            </div>
            <label class="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                id="push-notifications"
                class="sr-only peer"
                onchange="updateNotificationSetting('push', this.checked)"
              />
              <div class="w-14 h-8 bg-jm-gray-300 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-jm-purple peer-focus:ring-offset-2 rounded-full peer peer-checked:after:translate-x-6 peer-checked:after:border-white after:content-[''] after:absolute after:top-1 after:left-1 after:bg-white after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-jm-purple"></div>
            </label>
          </div>

          <div class="flex items-start justify-between gap-6">
            <div class="flex-1">
              <h3 class="font-sans text-base font-semibold text-jm-gray-900 mb-1">
                SMS Notifications
              </h3>
              <p class="font-sans text-sm text-jm-gray-600">
                Receive text message alerts for critical updates
              </p>
            </div>
            <label class="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                id="sms-notifications"
                class="sr-only peer"
                onchange="updateNotificationSetting('sms', this.checked)"
              />
              <div class="w-14 h-8 bg-jm-gray-300 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-jm-purple peer-focus:ring-offset-2 rounded-full peer peer-checked:after:translate-x-6 peer-checked:after:border-white after:content-[''] after:absolute after:top-1 after:left-1 after:bg-white after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-jm-purple"></div>
            </label>
          </div>
        </div>
      </div>

      <!-- Data Export (GDPR) -->
      <div class="space-y-4 border-t border-jm-gray-200 pt-8">
        <h2 class="font-sans text-lg font-bold text-jm-gray-900">
          Data Export
        </h2>
        <p class="font-sans text-sm text-jm-gray-600">
          Download all your data from JoyMatcher in JSON format (GDPR compliance)
        </p>
        <button
          type="button"
          class="border-2 border-jm-gray-300 hover:border-jm-gray-400 text-jm-gray-700 hover:text-jm-gray-900 font-sans font-medium px-6 py-3 rounded-lg"
          onclick="requestDataExport()"
        >
          Request Data Export
        </button>
      </div>
    </div>
  </div>
</div>
```

---

## 9. Preview Mode

### Preview Mode Modal

```html
<div id="preview-mode-modal" class="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 hidden items-center justify-center p-4">
  <div class="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
    <!-- Header -->
    <div class="sticky top-0 bg-jm-gray-900 text-white p-6 flex items-center justify-between z-10">
      <div>
        <h2 class="font-serif text-2xl font-bold">
          Preview: Your Profile as Others See It
        </h2>
        <p class="font-sans text-sm text-jm-gray-300 mt-1">
          Adjust EDT slider to simulate different access levels
        </p>
      </div>
      <button
        type="button"
        class="text-white hover:text-white/80 p-2 rounded-full hover:bg-white/10"
        onclick="closePreviewModal()"
        aria-label="Close preview"
      >
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
        </svg>
      </button>
    </div>

    <!-- EDT Slider Control -->
    <div class="bg-gradient-to-r from-jm-purple-deep/10 to-jm-coral/10 border-b-2 border-jm-purple/20 p-6">
      <div class="space-y-4">
        <label for="edt-slider" class="block font-sans text-sm font-semibold text-jm-gray-900">
          Simulated EDT Level: <span id="edt-slider-value" class="text-jm-purple">1</span>
        </label>
        <input
          type="range"
          id="edt-slider"
          min="1"
          max="5"
          value="1"
          class="w-full h-3 bg-jm-gray-300 rounded-lg appearance-none cursor-pointer accent-jm-purple"
          oninput="updatePreviewEDT(this.value)"
        />
        <div class="flex items-center justify-between text-xs text-jm-gray-600">
          <span>Tier 1 (Public)</span>
          <span>Tier 2</span>
          <span>Tier 3</span>
          <span>Tier 4</span>
          <span>Tier 5 (Full Access)</span>
        </div>
      </div>
    </div>

    <!-- Preview Content (Simulated Profile View) -->
    <div class="p-6">
      <div id="preview-content" class="space-y-6">
        <!-- Profile header, tier sections based on EDT slider value -->
        <!-- This content is dynamically generated based on EDT slider -->
      </div>
    </div>
  </div>
</div>
```

---

## 10. Danger Zone

### Danger Zone Section (Account Tab)

```html
<div class="bg-jm-error/5 border-2 border-jm-error/20 rounded-xl p-6 space-y-6 mt-12">
  <div class="space-y-2">
    <h2 class="font-sans text-xl font-bold text-jm-error flex items-center gap-2">
      <svg class="w-6 h-6" fill="currentColor" viewBox="0 20 20">
        <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 11-2 1 1 012zm-1-8a1 1 00-1 1v3a1 1 002V6a1 1 00-1-1z" clip-rule="evenodd"/>
      </svg>
      Danger Zone
    </h2>
    <p class="font-sans text-sm text-jm-gray-700">
      Irreversible actions that permanently affect your account
    </p>
  </div>

  <!-- Suspend Account -->
  <div class="border-t border-jm-error/20 pt-6">
    <div class="space-y-3">
      <h3 class="font-sans text-base font-semibold text-jm-gray-900">
        Suspend Account Temporarily
      </h3>
      <p class="font-sans text-sm text-jm-gray-700">
        Hide your profile for 1-6 months. You can reactivate anytime during this period.
      </p>
      <button
        type="button"
        class="border-2 border-jm-warning hover:border-jm-warning/80 text-jm-warning hover:text-jm-warning/80 hover:bg-jm-warning/5 font-sans font-medium px-6 py-3 rounded-lg"
        onclick="openSuspendAccountModal()"
      >
        Suspend Account
      </button>
    </div>
  </div>

  <!-- Delete Account -->
  <div class="border-t border-jm-error/20 pt-6">
    <div class="space-y-3">
      <h3 class="font-sans text-base font-semibold text-jm-error">
        Delete Account Permanently
      </h3>
      <p class="font-sans text-sm text-jm-gray-700">
        <strong>This action cannot be undone.</strong> All your data, conversations, and connections will be permanently deleted.
      </p>
      <button
        type="button"
        class="bg-jm-error hover:bg-jm-error/90 text-white font-sans font-semibold px-6 py-3 rounded-lg shadow-md"
        onclick="openDeleteAccountModal()"
      >
        Delete My Account
      </button>
    </div>
  </div>
</div>
```

### Delete Account Confirmation Modal

```html
<div id="delete-account-modal" class="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 hidden items-center justify-center p-4">
  <div class="bg-white rounded-2xl shadow-2xl w-full max-w-lg">
    <div class="p-6 space-y-6">
      <!-- Icon & Title -->
      <div class="flex items-start gap-4">
        <div class="w-14 h-14 rounded-full bg-jm-error/10 flex items-center justify-center flex-shrink-0">
          <svg class="w-8 h-8 text-jm-error" fill="currentColor" viewBox="0 20 20">
            <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 11-2 1 1 012zm-1-8a1 1 00-1 1v3a1 1 002V6a1 1 00-1-1z" clip-rule="evenodd"/>
          </svg>
        </div>
        <div class="flex-1">
          <h3 class="font-serif text-2xl font-bold text-jm-error mb-3">
            Delete Your Account?
          </h3>
          <p class="font-sans text-sm text-jm-gray-700 leading-relaxed mb-4">
            <strong>This action is permanent and cannot be undone.</strong>
          </p>
          <p class="font-sans text-sm text-jm-gray-700 leading-relaxed mb-4">
            Deleting your account will:
          </p>
          <ul class="font-sans text-sm text-jm-gray-700 list-disc list-inside space-y-2 mb-4">
            <li>Permanently delete all your profile data (Tier 1-5)</li>
            <li>Remove all your conversations and messages</li>
            <li>Cancel any active subscription (no refunds)</li>
            <li>Remove all your connections and Show Interest history</li>
            <li>Delete your account within 30 days (grace period)</li>
          </ul>
          <div class="bg-jm-warning/10 border-l-4 border-jm-warning p-4 rounded-r-lg mb-4">
            <p class="font-sans text-sm text-jm-gray-700 leading-relaxed">
              <strong>Grace Period:</strong> You have 30 days to change your mind. After 30 days, all data will be permanently deleted and cannot be recovered.
            </p>
          </div>
        </div>
      </div>

      <!-- Data Export Reminder -->
      <div class="bg-jm-purple/5 border-2 border-jm-purple/20 rounded-lg p-4">
        <p class="font-sans text-sm text-jm-gray-700 leading-relaxed mb-3">
          Before deleting, would you like to export your data?
        </p>
        <button
          type="button"
          class="border-2 border-jm-purple hover:border-jm-purple-dark text-jm-purple hover:text-jm-purple-dark hover:bg-jm-purple/5 font-sans font-medium px-4 py-2 rounded-lg text-sm"
          onclick="requestDataExport()"
        >
          Export My Data First
        </button>
      </div>

      <!-- Password Verification -->
      <div class="space-y-2">
        <label for="delete-password" class="block font-sans text-sm font-medium text-jm-gray-700">
          Enter your password to confirm <span class="text-jm-error">*</span>
        </label>
        <input
          type="password"
          id="delete-password"
          placeholder="Your password"
          class="w-full px-4 py-3 rounded-lg border-2 border-jm-gray-300 focus:border-jm-error focus:ring-2 focus:ring-jm-error/20 font-sans text-base"
          required
        />
      </div>

      <!-- Final Acknowledgment -->
      <label class="flex items-start gap-3 cursor-pointer">
        <input
          type="checkbox"
          id="delete-acknowledge"
          class="w-5 h-5 mt-0.5 text-jm-error border-jm-gray-300 rounded focus:ring-2 focus:ring-jm-error/20"
          onchange="toggleDeleteButton()"
        />
        <span class="font-sans text-sm text-jm-gray-700">
          I understand that this action is permanent and cannot be undone. I want to delete my account and all associated data.
        </span>
      </label>

      <!-- Actions -->
      <div class="flex gap-3 pt-4">
        <button
          type="button"
          class="flex-1 border-2 border-jm-gray-300 hover:border-jm-gray-400 text-jm-gray-700 font-sans font-medium px-4 py-3 rounded-lg"
          onclick="closeDeleteAccountModal()"
        >
          Cancel
        </button>
        <button
          type="button"
          id="confirm-delete-btn"
          class="flex-1 bg-jm-error hover:bg-jm-error/90 text-white font-sans font-semibold px-4 py-3 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
          onclick="confirmDeleteAccount()"
          disabled
        >
          Delete My Account
        </button>
      </div>
    </div>
  </div>
</div>
```

---

## 11. State Management

### Edit Profile State Model

```javascript
const EditProfileState = {
  currentTab: 'tier1', // tier1, tier2, tier3, tier4, tier5, privacy, account
  unsavedChanges: false,
  formData: {
    tier1: { /* tier 1 form fields */ },
    tier2: { /* tier 2 form fields */ },
    tier3: { /* tier 3 form fields */ },
    tier4: { /* tier 4 form fields */ },
    tier5: { /* tier 5 form fields */ }
  },
  photoUpload: {
    file: null,
    cropArea: { x: 0, y: 0, width: 400, height: 400 },
    preview: null
  },
  privacySettings: {
    vipVisibility: 'public', // 'public' | 'private' (VIP only)
    discoverVisibility: true,
    nameSearch: true,
    activityStatus: true,
    profileCompletion: true
  },
  notificationSettings: {
    email: true,
    push: false,
    sms: false
  }
};

/**
 * Mark form as dirty (has unsaved changes)
 */
function markFormDirty() {
  EditProfileState.unsavedChanges = true;
  showUnsavedIndicator();
}

/**
 * Show unsaved changes warning when navigating away
 * @param {String} targetTab - Tab user is trying to navigate to
 */
function showUnsavedChangesWarning(targetTab) {
  const confirmLeave = confirm(
    "You have unsaved changes. Are you sure you want to leave this page? Your changes will be lost."
  );

  if (confirmLeave) {
    EditProfileState.unsavedChanges = false;
    switchTab(targetTab);
  }
}
```

---

## 12. Form Validation

### Client-Side Validation

```javascript
/**
 * Validate tier form before submission
 * @param {Number} tier - Tier number (1-5)
 * @returns {Object} { valid: Boolean, errors: Array }
 */
function validateTierForm(tier) {
  const errors = [];

  // Get form data
  const formElement = document.getElementById(`tier${tier}-form`);
  const formData = new FormData(formElement);

  // Common validations
  const aboutMe = formData.get('about_me');
  if (aboutMe && aboutMe.length < 50) {
    errors.push({
      field: 'about_me',
      message: 'About Me must be at least 50 characters'
    });
  }

  const faith = formData.get('faith');
  if (!faith) {
    errors.push({
      field: 'faith',
      message: 'Faith/Belief is required'
    });
  }

  // Tier-specific validations
  if (tier === 3) {
    const hasChildren = formData.get('has_children');
    if (!hasChildren) {
      errors.push({
        field: 'has_children',
        message: 'Please specify if you have children'
      });
    }
  }

  return {
    valid: errors.length === 0,
    errors: errors
  };
}

/**
 * Display validation errors
 * @param {Array} errors - Array of error objects
 */
function displayValidationErrors(errors) {
  errors.forEach(error => {
    const field = document.getElementById(error.field);
    if (field) {
      field.classList.add('border-jm-error');

      // Create error message element
      const errorEl = document.createElement('p');
      errorEl.id = `${error.field}-error`;
      errorEl.className = 'font-sans text-sm text-jm-error mt-1';
      errorEl.textContent = error.message;

      field.parentElement.appendChild(errorEl);
    }
  });

  // Scroll to first error
  if (errors.length > 0) {
    const firstErrorField = document.getElementById(errors[0].field);
    if (firstErrorField) {
      firstErrorField.scrollIntoView({ behavior: 'smooth', block: 'center' });
      firstErrorField.focus();
    }
  }
}
```

---

## 13. Error Handling

### Save Error Modal

```html
<div id="save-error-modal" class="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 hidden items-center justify-center p-4">
  <div class="bg-white rounded-2xl shadow-2xl w-full max-w-md">
    <div class="p-6 space-y-4">
      <div class="flex items-start gap-4">
        <div class="w-12 h-12 rounded-full bg-jm-error/10 flex items-center justify-center flex-shrink-0">
          <svg class="w-6 h-6 text-jm-error" fill="currentColor" viewBox="0 20 20">
            <path fill-rule="evenodd" d="M10 18a8 8 100-16 8 8 000 16zM8.707 7.293a1 1 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 101.414 1.414L10 11.414l1.293 1.293a1 1 001.414-1.414L11.414 10l1.293-1.293a1 1 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"/>
          </svg>
        </div>
        <div class="flex-1">
          <h3 class="font-serif text-xl font-bold text-jm-error mb-2">
            Failed to Save Changes
          </h3>
          <p class="font-sans text-sm text-jm-gray-700 leading-relaxed">
            We couldn't save your changes. This might be due to:
          </p>
          <ul class="font-sans text-sm text-jm-gray-700 list-disc list-inside space-y-1 my-3">
            <li>Network connection issues</li>
            <li>Invalid form data</li>
            <li>Session timeout</li>
          </ul>
          <p class="font-sans text-sm text-jm-gray-700 leading-relaxed">
            Please try again. If the problem persists, contact support.
          </p>
        </div>
      </div>

      <div class="flex gap-3 pt-4">
        <button
          type="button"
          class="flex-1 border-2 border-jm-gray-300 hover:border-jm-gray-400 text-jm-gray-700 font-sans font-medium px-4 py-3 rounded-lg"
          onclick="closeSaveErrorModal()"
        >
          Cancel
        </button>
        <button
          type="button"
          class="flex-1 bg-gradient-jm hover:bg-gradient-jm-hover text-white font-sans font-semibold px-4 py-3 rounded-lg"
          onclick="retrySave()"
        >
          Try Again
        </button>
      </div>
    </div>
  </div>
</div>
```

---

## 14. Accessibility Requirements

### WCAG 2.1 AA Compliance

**Keyboard Navigation:**
- Tab navigation between form fields and controls
- Tab bar fully keyboard-accessible (Arrow keys navigate tabs)
- Form submission via Enter key
- Modal dialogs trap focus

**Screen Reader Support:**
- Form labels properly associated with inputs
- Error messages announced via `aria-live="assertive"`
- Toggle switches have accessible labels
- Tab panels use `role="tabpanel"` with `aria-labelledby`

**Color Contrast:**
- All text meets 4.5:1 minimum contrast
- Form validation errors use icon + color + text
- Danger zone uses icon + color + text

**Focus Indicators:**
- 2px ring on all focusable elements
- Visible focus on tab switches
- Form inputs show focus state

---

## 15. Mobile Responsive Behavior

### Mobile (320px-767px)
- Single column layout
- Tab bar horizontal scroll with snap points
- Sticky tab bar below header
- Profile photo upload: Full-width layout
- Form fields: Full width, stacked
- Save button: Fixed at bottom, full width

### Tablet (768px-1023px)
- Single column layout
- Tab bar horizontal scroll (if needed)
- Profile photo: Left-aligned
- Form fields: Grid layout where appropriate

### Desktop (≥1024px)
- Max-width 900px container
- Tab bar horizontal, no scroll
- Profile photo: Left-aligned, larger
- Form fields: 2-column grid

---

## 16. Related Documentation

- [Profile View Spec](profile_view_spec.md) - Profile viewing page
- [Dashboard Spec](dashboard_spec.md) - Dashboard page
- [Tier System](../../Global%20Context/tier_system.md) - MASTER REFERENCE for tiers
- [Privacy & Consent](../../Global%20Context/privacy_and_consent.md) - Privacy rules
- [HTML Implementation Guide](../../Design%20System/html_implementation_guide.md) - Component patterns
- [Request Details Flow](../../Technical%20Specifications/request_details_flow.md) - Detail sharing logic
- [Show Interest Flow](../../Technical%20Specifications/show_interest_flow.md) - Connection mechanics

---

**Document Owner:** Product Lead & Design Lead
**Last Updated:** 2026-02-27
**Status:** Complete — Ready for Implementation
**Estimated Development Time:** 50-60 hours
**Estimated Word Count:** 5,438 words
