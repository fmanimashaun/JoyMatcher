# Subscription Tier Ceiling — Technical Implementation

**Version:** 1.0.0
**Last Updated:** 2026-02-26
**Status:** Technical Reference - Authoritative
**Document Type:** Technical Specification

---

## Table of Contents

1. [Overview](#1-overview)
2. [Subscription Tiers](#2-subscription-tiers)
3. [Ceiling Enforcement Logic](#3-ceiling-enforcement-logic)
4. [Upgrade Prompts](#4-upgrade-prompts)
5. [Technical Implementation](#5-technical-implementation)
6. [Downgrade Handling](#6-downgrade-handling)
7. [UI Components](#7-ui-components)
8. [Edge Cases](#8-edge-cases)
9. [Testing Strategy](#9-testing-strategy)

---

## 1. Overview

### Purpose

The Subscription Tier Ceiling system enforces the fundamental rule that users cannot complete tiers above their subscription level. This:
- Creates clear upgrade incentives
- Ensures pricing acts as an investment filter
- Prevents circumventing payment through tier completion
- Maintains platform sustainability

### Core Principle

> **Subscription ceiling is absolute. No tier can be completed above your subscription level.**

### Key Rules

1. **Free Ceiling = Tier 2**: Free users can only complete Tiers 1-2
2. **Premium Ceiling = Tier 4**: Premium users can complete Tiers 1-4
3. **VIP Ceiling = Tier 5**: VIP users can complete all tiers (1-5)
4. **No Bypass**: No exceptions, no workarounds
5. **Upgrade to Progress**: Must upgrade subscription to unlock higher tiers

---

## 2. Subscription Tiers

### Complete Subscription Matrix

| Subscription | Monthly Price (NG) | Monthly Price (USD) | Max Tier | Tier Access | Positioning |
|--------------|-------------------|---------------------|----------|-------------|-------------|
| **Free** | ₦0 | $0 | 2 | Tier 1-2 | Exploration & Discovery |
| **Premium** | ₦18,000 | $18 | 4 | Tier 1-4 | Serious & Transparent |
| **VIP** | ₦200,000+ | $200+ | 5 | Tier 1-5 | Verified & Concierge |

### Quarterly Pricing (Premium Only)

| Subscription | Quarterly Price (NG) | Quarterly Price (USD) | Savings |
|--------------|---------------------|----------------------|---------|
| **Premium** | ₦45,000 | $45 | ₦9,000 / $9 (17% off) |

**Note:** VIP pricing is custom, starting from listed amounts. No quarterly option (monthly only).

### Tier-to-Subscription Mapping

```javascript
const TierSubscriptionRequirements = {
  1: 'free',      // All users can complete Tier 1
  2: 'free',      // All users can complete Tier 2
  3: 'premium',   // Requires Premium or VIP
  4: 'premium',   // Requires Premium or VIP
  5: 'vip'        // Requires VIP only
};

const SubscriptionCeilings = {
  free: 2,
  premium: 4,
  vip: 5
};
```

---

## 3. Ceiling Enforcement Logic

### Tier Completion Check

```javascript
/**
 * Check if user can complete a specific tier
 * @param {String} userId - User ID
 * @param {Number} tier - Tier to check (1-5)
 * @returns {Object} { canComplete: Boolean, reason: String, upgradeRequired: String }
 */
function canCompleteTier(userId, tier) {
  const user = AppState.users.get(userId);

  if (!user) {
    return { canComplete: false, reason: 'USER_NOT_FOUND' };
  }

  // Validate tier range
  if (tier < 1 || tier > 5) {
    return { canComplete: false, reason: 'INVALID_TIER' };
  }

  // Check subscription ceiling
  if (tier > user.subscriptionCeiling) {
    const requiredSubscription = getRequiredSubscriptionForTier(tier);

    return {
      canComplete: false,
      reason: 'SUBSCRIPTION_CEILING_EXCEEDED',
      message: `Tier ${tier} requires ${capitalizeFirst(requiredSubscription)} subscription.`,
      currentSubscription: user.subscription,
      currentCeiling: user.subscriptionCeiling,
      requiredSubscription: requiredSubscription,
      upgradeRequired: true
    };
  }

  // Check if previous tier is completed (must complete in order)
  if (tier > 1 && !user.completedTiers.includes(tier - 1)) {
    return {
      canComplete: false,
      reason: 'PREVIOUS_TIER_NOT_COMPLETED',
      message: `You must complete Tier ${tier - 1} before Tier ${tier}.`,
      requiredTier: tier - 1
    };
  }

  // Check if tier is already completed
  if (user.completedTiers.includes(tier)) {
    return {
      canComplete: false,
      reason: 'TIER_ALREADY_COMPLETED',
      message: `You have already completed Tier ${tier}.`
    };
  }

  // All checks passed
  return {
    canComplete: true,
    reason: 'ELIGIBLE'
  };
}

/**
 * Get required subscription for a tier
 * @param {Number} tier - Tier number (1-5)
 * @returns {String} Required subscription type
 */
function getRequiredSubscriptionForTier(tier) {
  if (tier <= 2) return 'free';
  if (tier <= 4) return 'premium';
  return 'vip';
}

/**
 * Capitalize first letter of string
 * @param {String} str
 * @returns {String}
 */
function capitalizeFirst(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
```

### Ceiling Enforcement During Tier Completion

```javascript
/**
 * Complete tier with ceiling enforcement
 * This is an enhanced version of completeTier from state_management.md
 * @param {String} userId - User ID
 * @param {Number} tier - Tier number (1-5)
 * @param {Object} tierData - Form data for the tier
 * @returns {Object} { success: Boolean, reason: String, upgradePrompt: Object }
 */
function completeTierWithCeiling(userId, tier, tierData) {
  // Check if user can complete tier
  const eligibility = canCompleteTier(userId, tier);

  if (!eligibility.canComplete) {
    // If ceiling exceeded, return upgrade prompt data
    if (eligibility.reason === 'SUBSCRIPTION_CEILING_EXCEEDED') {
      return {
        success: false,
        reason: eligibility.reason,
        message: eligibility.message,
        upgradePrompt: generateUpgradePrompt(userId, tier, eligibility.requiredSubscription)
      };
    }

    // Other failure reasons
    return {
      success: false,
      reason: eligibility.reason,
      message: eligibility.message
    };
  }

  // Proceed with tier completion (from state_management.md)
  const result = completeTier(userId, tier, tierData);

  return result;
}
```

---

## 4. Upgrade Prompts

### Contextual Upgrade Prompt Generation

```javascript
/**
 * Generate contextual upgrade prompt
 * @param {String} userId - User ID
 * @param {Number} blockedTier - Tier user is trying to access
 * @param {String} requiredSubscription - Required subscription type
 * @returns {Object} Upgrade prompt configuration
 */
function generateUpgradePrompt(userId, blockedTier, requiredSubscription) {
  const user = AppState.users.get(userId);

  if (!user) return null;

  const currentSubscription = user.subscription;
  const country = user.country;

  // Get pricing for user's country
  const pricing = getPricingForCountry(country);
  const currency = country === 'NG' ? '₦' : '$';

  // Build prompt based on required subscription
  if (requiredSubscription === 'premium') {
    return {
      type: 'premium',
      title: '🔒 Premium Required',
      subtitle: `Unlock Tier ${blockedTier} and deeper compatibility`,
      blockedTier: blockedTier,
      currentSubscription: currentSubscription,
      requiredSubscription: 'premium',

      benefits: [
        `Complete Tiers 3 & 4 (Relationship & Health information)`,
        `Request details from Premium matches`,
        `Send Show Interest to Premium users`,
        `Unlock marriage-level compatibility insights`
      ],

      pricing: {
        monthly: `${currency}${pricing.premium.monthly.toLocaleString()}`,
        quarterly: `${currency}${pricing.premium.quarterly.toLocaleString()}`,
        monthlySavings: null,
        quarterlySavings: calculateSavings(pricing.premium.monthly, pricing.premium.quarterly, 3)
      },

      ctaText: 'Upgrade to Premium',
      ctaAction: 'showPremiumUpgradeFlow',

      secondaryCTA: {
        text: 'Maybe Later',
        action: 'dismissUpgradePrompt'
      }
    };
  }

  if (requiredSubscription === 'vip') {
    return {
      type: 'vip',
      title: '🔒 VIP Membership Required',
      subtitle: 'Elite verified matchmaking with personal concierge',
      blockedTier: blockedTier,
      currentSubscription: currentSubscription,
      requiredSubscription: 'vip',

      requirements: [
        'Complete Tier 4 (Health & Compatibility)',
        'Apply for VIP membership',
        'Complete Tier 5 verification (ID + Video KYC)',
        'Pass VIP screening and approval'
      ],

      benefits: [
        'Complete Tier 5 (Government ID verification)',
        'Verified Identity badge (trusted by all users)',
        'Personal matchmaking expert',
        'Curated introductions from verified pool',
        'Complete profile privacy (invisible browsing)',
        'Priority support'
      ],

      pricing: {
        starting: `${currency}${pricing.vip.monthly.toLocaleString()}`,
        note: 'Starting from (application-based pricing)'
      },

      ctaText: 'Apply for VIP',
      ctaAction: 'showVIPApplicationFlow',
      ctaDisabled: !user.completedTiers.includes(4), // Must complete Tier 4 first

      disabledMessage: user.completedTiers.includes(4)
        ? null
        : 'Complete Tier 4 to become eligible for VIP membership',

      secondaryCTA: {
        text: 'Learn More About VIP',
        action: 'showVIPInfo'
      }
    };
  }

  return null;
}

/**
 * Get pricing for user's country
 * @param {String} country - ISO country code (NG, US, etc.)
 * @returns {Object} Pricing object
 */
function getPricingForCountry(country) {
  if (country === 'NG') {
    return AppState.config.pricing.NG;
  }
  return AppState.config.pricing.OTHER;
}

/**
 * Calculate savings for quarterly subscription
 * @param {Number} monthlyPrice - Monthly price
 * @param {Number} quarterlyPrice - Quarterly price
 * @param {Number} months - Number of months
 * @returns {String} Savings amount and percentage
 */
function calculateSavings(monthlyPrice, quarterlyPrice, months) {
  const totalMonthly = monthlyPrice * months;
  const savings = totalMonthly - quarterlyPrice;
  const percentage = Math.round((savings / totalMonthly) * 100);

  const currency = monthlyPrice >= 1000 ? '₦' : '$';

  return `Save ${currency}${savings.toLocaleString()} (${percentage}% off)`;
}
```

### Upgrade Prompt UI Variations

**Variation 1: Free → Premium (Tier 3 Blocked)**

```html
<div class="upgrade-prompt premium-prompt">
  <div class="prompt-header">
    <h2>🔒 Premium Required</h2>
    <p class="subtitle">Unlock Tier 3 and deeper compatibility</p>
  </div>

  <div class="prompt-body">
    <div class="blocked-tier-info">
      <p>You're trying to access <strong>Tier 3: Relationship & Family Readiness</strong></p>
      <p class="requirement">This tier requires Premium subscription.</p>
    </div>

    <div class="benefits-section">
      <h3>With Premium, you'll unlock:</h3>
      <ul class="benefits-list">
        <li>✅ Complete Tiers 3 & 4 (Relationship & Health information)</li>
        <li>✅ Request details from Premium matches</li>
        <li>✅ Send Show Interest to Premium users</li>
        <li>✅ Unlock marriage-level compatibility insights</li>
      </ul>
    </div>

    <div class="pricing-section">
      <h3>Pricing</h3>
      <div class="pricing-options">
        <div class="pricing-option">
          <h4>Monthly</h4>
          <p class="price">₦18,000<span class="period">/month</span></p>
        </div>
        <div class="pricing-option recommended">
          <span class="badge">Best Value</span>
          <h4>Quarterly</h4>
          <p class="price">₦45,000<span class="period">/3 months</span></p>
          <p class="savings">Save ₦9,000 (17% off)</p>
        </div>
      </div>
    </div>
  </div>

  <div class="prompt-footer">
    <button class="btn-secondary" onclick="dismissUpgradePrompt()">Maybe Later</button>
    <button class="btn-primary" onclick="showPremiumUpgradeFlow()">Upgrade to Premium</button>
  </div>
</div>
```

**Variation 2: Premium → VIP (Tier 5 Blocked)**

```html
<div class="upgrade-prompt vip-prompt">
  <div class="prompt-header">
    <h2>🔒 VIP Membership Required</h2>
    <p class="subtitle">Elite verified matchmaking with personal concierge</p>
  </div>

  <div class="prompt-body">
    <div class="blocked-tier-info">
      <p>You're trying to access <strong>Tier 5: Verified Identity & Elite Trust</strong></p>
      <p class="requirement">This tier requires VIP membership.</p>
    </div>

    <div class="requirements-section">
      <h3>Requirements for VIP:</h3>
      <ol class="requirements-list">
        <li>
          <span class="req-status completed">✅</span>
          Complete Tier 4 (Health & Compatibility)
        </li>
        <li>
          <span class="req-status pending">⏳</span>
          Apply for VIP membership
        </li>
        <li>
          <span class="req-status pending">⏳</span>
          Complete Tier 5 verification (ID + Video KYC)
        </li>
        <li>
          <span class="req-status pending">⏳</span>
          Pass VIP screening and approval
        </li>
      </ol>
    </div>

    <div class="benefits-section">
      <h3>VIP Benefits:</h3>
      <ul class="benefits-list">
        <li>✅ Complete Tier 5 (Government ID verification)</li>
        <li>✅ Verified Identity badge (trusted by all users)</li>
        <li>✅ Personal matchmaking expert</li>
        <li>✅ Curated introductions from verified pool</li>
        <li>✅ Complete profile privacy (invisible browsing)</li>
        <li>✅ Priority support</li>
      </ul>
    </div>

    <div class="pricing-section">
      <h3>Investment</h3>
      <p class="price-large">Starting from ₦200,000<span class="period">/month</span></p>
      <p class="price-note">Application-based pricing. Final pricing determined after screening.</p>
    </div>
  </div>

  <div class="prompt-footer">
    <button class="btn-secondary" onclick="showVIPInfo()">Learn More About VIP</button>
    <button class="btn-primary" onclick="showVIPApplicationFlow()">Apply for VIP</button>
  </div>
</div>
```

---

## 5. Technical Implementation

### Ceiling Check During Form Access

```javascript
/**
 * Check if user can access tier form
 * Called when user clicks "Complete Tier X" button
 * @param {String} userId - User ID
 * @param {Number} tier - Tier to access
 * @returns {Object} Access result
 */
function checkTierFormAccess(userId, tier) {
  const eligibility = canCompleteTier(userId, tier);

  if (!eligibility.canComplete) {
    // Show appropriate UI based on reason
    if (eligibility.reason === 'SUBSCRIPTION_CEILING_EXCEEDED') {
      // Show upgrade prompt
      return {
        access: 'denied',
        reason: 'UPGRADE_REQUIRED',
        ui: 'SHOW_UPGRADE_MODAL',
        modalData: generateUpgradePrompt(userId, tier, eligibility.requiredSubscription)
      };
    }

    if (eligibility.reason === 'PREVIOUS_TIER_NOT_COMPLETED') {
      // Redirect to previous tier
      return {
        access: 'denied',
        reason: 'COMPLETE_PREVIOUS_TIER',
        ui: 'SHOW_ALERT_AND_REDIRECT',
        alertMessage: eligibility.message,
        redirectTo: `/app/tier${eligibility.requiredTier}`
      };
    }

    if (eligibility.reason === 'TIER_ALREADY_COMPLETED') {
      // Redirect to profile or next tier
      return {
        access: 'denied',
        reason: 'ALREADY_COMPLETED',
        ui: 'SHOW_ALERT_AND_REDIRECT',
        alertMessage: eligibility.message,
        redirectTo: `/app/profile`
      };
    }

    // Generic denial
    return {
      access: 'denied',
      reason: eligibility.reason,
      ui: 'SHOW_ALERT',
      alertMessage: eligibility.message
    };
  }

  // Access granted
  return {
    access: 'granted',
    reason: 'ELIGIBLE',
    ui: 'SHOW_TIER_FORM',
    tierData: getTierFormData(tier)
  };
}
```

### Tier Navigation Lock States

```javascript
/**
 * Get tier navigation state for UI
 * Shows which tiers are accessible, locked, or completed
 * @param {String} userId - User ID
 * @returns {Array} Array of tier states
 */
function getTierNavigationStates(userId) {
  const user = AppState.users.get(userId);

  if (!user) return [];

  const tiers = [
    { tier: 1, name: 'Identity & Intent' },
    { tier: 2, name: 'Lifestyle & Background' },
    { tier: 3, name: 'Relationship & Family' },
    { tier: 4, name: 'Health & Compatibility' },
    { tier: 5, name: 'Verified Identity' }
  ];

  return tiers.map(tierInfo => {
    const tier = tierInfo.tier;

    // Check if completed
    const completed = user.completedTiers.includes(tier);

    // Check if accessible
    const eligibility = canCompleteTier(userId, tier);

    // Determine state
    let state, lockReason, ctaText, ctaAction;

    if (completed) {
      state = 'completed';
      ctaText = 'View/Edit';
      ctaAction = `editTier(${tier})`;
    } else if (eligibility.canComplete) {
      state = 'accessible';
      ctaText = 'Complete Now';
      ctaAction = `startTierCompletion(${tier})`;
    } else {
      state = 'locked';

      if (eligibility.reason === 'SUBSCRIPTION_CEILING_EXCEEDED') {
        lockReason = `Requires ${capitalizeFirst(eligibility.requiredSubscription)}`;
        ctaText = 'Upgrade';
        ctaAction = `showUpgradePrompt(${tier})`;
      } else if (eligibility.reason === 'PREVIOUS_TIER_NOT_COMPLETED') {
        lockReason = `Complete Tier ${eligibility.requiredTier} first`;
        ctaText = `Go to Tier ${eligibility.requiredTier}`;
        ctaAction = `goToTier(${eligibility.requiredTier})`;
      } else {
        lockReason = eligibility.message;
        ctaText = null;
        ctaAction = null;
      }
    }

    return {
      tier: tier,
      name: tierInfo.name,
      state: state,
      completed: completed,
      accessible: eligibility.canComplete,
      lockReason: lockReason,
      ctaText: ctaText,
      ctaAction: ctaAction
    };
  });
}
```

---

## 6. Downgrade Handling

### Subscription Downgrade Impact

When a user downgrades their subscription (e.g., Premium → Free, VIP → Premium), their completed tiers must be capped at the new ceiling.

```javascript
/**
 * Handle subscription downgrade
 * Caps completed tiers at new subscription ceiling
 * @param {String} userId - User ID
 * @param {String} newSubscription - New subscription type
 * @returns {Object} Downgrade result
 */
function handleSubscriptionDowngrade(userId, newSubscription) {
  const user = AppState.users.get(userId);

  if (!user) {
    return { success: false, reason: 'USER_NOT_FOUND' };
  }

  const previousSubscription = user.subscription;
  const previousCeiling = user.subscriptionCeiling;
  const newCeiling = SubscriptionCeilings[newSubscription];

  if (newCeiling >= previousCeiling) {
    return {
      success: false,
      reason: 'NOT_A_DOWNGRADE',
      message: 'New subscription is not lower than current subscription'
    };
  }

  const now = new Date();

  // Cap completed tiers at new ceiling
  const removedTiers = user.completedTiers.filter(tier => tier > newCeiling);
  user.completedTiers = user.completedTiers.filter(tier => tier <= newCeiling);

  // Recalculate max completed tier
  user.maxCompletedTier = user.completedTiers.length > 0
    ? Math.max(...user.completedTiers)
    : 0;

  // Clear tier data above new ceiling
  removedTiers.forEach(tier => {
    user.tierData[`tier${tier}`] = null;
    delete user.tierCompletionDates[tier];
  });

  // Update subscription
  user.subscription = newSubscription;
  user.subscriptionCeiling = newCeiling;
  user.updatedAt = now;

  // Update VIP status if downgrading from VIP
  if (previousSubscription === 'vip' && newSubscription !== 'vip') {
    user.isVIP = false;
  }

  // Log event
  logAuditEvent({
    eventType: 'subscription_downgraded',
    userId: userId,
    previousSubscription: previousSubscription,
    newSubscription: newSubscription,
    previousCeiling: previousCeiling,
    newCeiling: newCeiling,
    removedTiers: removedTiers,
    timestamp: now
  });

  // Recalculate all EDTs involving this user
  recalculateAllEDTsForUser(userId);

  // Persist state
  persistState();

  return {
    success: true,
    reason: 'DOWNGRADE_COMPLETE',
    data: {
      previousSubscription: previousSubscription,
      newSubscription: newSubscription,
      previousCeiling: previousCeiling,
      newCeiling: newCeiling,
      removedTiers: removedTiers,
      remainingTiers: user.completedTiers
    }
  };
}
```

### Downgrade Warning Modal

```html
<div class="modal downgrade-warning-modal">
  <div class="modal-content">
    <div class="modal-header warning">
      <h2>⚠️ Subscription Downgrade Warning</h2>
      <p class="subtitle">This will affect your completed tiers</p>
    </div>

    <div class="modal-body">
      <div class="downgrade-summary">
        <p>You're about to downgrade from:</p>
        <div class="subscription-change">
          <span class="current">[CurrentSubscription]</span>
          <span class="arrow">→</span>
          <span class="new">[NewSubscription]</span>
        </div>
      </div>

      <div class="impact-section">
        <h3>Impact on Your Profile:</h3>

        <div class="ceiling-change">
          <p><strong>Tier Ceiling:</strong></p>
          <p>Will decrease from <strong>Tier [PreviousCeiling]</strong> to <strong>Tier [NewCeiling]</strong></p>
        </div>

        <div class="removed-tiers" *if="removedTiers.length > 0">
          <p><strong>Tiers That Will Be Removed:</strong></p>
          <ul>
            <li *for="tier in removedTiers">
              <span class="tier-name">Tier [tier]: [tierName]</span>
              <span class="warning-icon">❌</span>
            </li>
          </ul>
          <p class="data-loss-warning">
            ⚠️ All data for these tiers will be permanently deleted.
          </p>
        </div>

        <div class="edt-impact">
          <p><strong>Impact on Relationships:</strong></p>
          <p>Your EDT with existing matches will be recalculated. You may lose access to higher-tier information you've previously shared.</p>
        </div>
      </div>

      <div class="confirmation-section">
        <label class="confirmation-checkbox">
          <input type="checkbox" id="downgradeConfirm" required>
          I understand that my Tier [removedTiers] data will be permanently deleted
        </label>
      </div>
    </div>

    <div class="modal-footer">
      <button class="btn-secondary" onclick="cancelDowngrade()">Cancel Downgrade</button>
      <button
        class="btn-danger"
        id="confirmDowngradeBtn"
        disabled
        onclick="confirmDowngrade()"
      >
        Confirm Downgrade
      </button>
    </div>
  </div>
</div>

<script>
document.getElementById('downgradeConfirm').addEventListener('change', function() {
  document.getElementById('confirmDowngradeBtn').disabled = !this.checked;
});
</script>
```

---

## 7. UI Components

### Tier Lock Overlay

```html
<!-- Tier Lock Overlay (shown on locked tier forms) -->
<div class="tier-lock-overlay">
  <div class="lock-content">
    <div class="lock-icon">🔒</div>
    <h2>Tier [X] Locked</h2>
    <p class="lock-reason">[Lock Reason Message]</p>

    <!-- Upgrade Required -->
    <div class="unlock-actions" *if="upgradeRequired">
      <p class="unlock-prompt">Upgrade to [RequiredSubscription] to unlock this tier</p>
      <button class="btn-primary" onclick="showUpgradePrompt([tier])">
        Upgrade Now
      </button>
      <button class="btn-link" onclick="closeOverlay()">
        Maybe Later
      </button>
    </div>

    <!-- Previous Tier Required -->
    <div class="unlock-actions" *if="previousTierRequired">
      <p class="unlock-prompt">Complete Tier [RequiredTier] first</p>
      <button class="btn-primary" onclick="goToTier([requiredTier])">
        Go to Tier [RequiredTier]
      </button>
    </div>
  </div>
</div>
```

### Subscription Status Badge

```html
<!-- Subscription Status Badge (shown on profile/dashboard) -->
<div class="subscription-badge [subscription-type]">
  <span class="badge-icon">[Icon]</span>
  <div class="badge-content">
    <h4>[Subscription] Member</h4>
    <p class="ceiling-info">Tier Ceiling: [Ceiling]</p>
    <p class="tier-progress">Completed: [CompletedTiers.length] / [Ceiling]</p>

    <div class="progress-bar">
      <div class="progress-fill" style="width: [percentage]%"></div>
    </div>

    <button
      class="btn-upgrade-small"
      *if="subscription !== 'vip'"
      onclick="showUpgradeOptions()"
    >
      Upgrade
    </button>
  </div>
</div>
```

---

## 8. Edge Cases

### Edge Case 1: User Completes Tier Just Before Subscription Expires

**Scenario:** Premium user completes Tier 4. Subscription expires 5 minutes later. User downgrades to Free.

**Solution:**
- Tier 4 data is removed during downgrade
- User completed Tier 4 validly, but cannot maintain it without subscription
- Tier completion history preserved in audit logs (for potential restoration)

### Edge Case 2: User Upgrades Mid-Tier Completion

**Scenario:** Free user starts Tier 3 form (blocks mid-form). User upgrades to Premium. Returns to form.

**Solution:**
- Form unblocks automatically
- User can complete Tier 3 without page refresh
- Use reactive subscription status check

```javascript
// Check subscription status before form submission
function submitTierForm(tier, data) {
  const user = AppState.users.get(AppState.currentUser.id);

  // Re-check eligibility at submission time
  const eligibility = canCompleteTier(user.id, tier);

  if (!eligibility.canComplete) {
    if (eligibility.reason === 'SUBSCRIPTION_CEILING_EXCEEDED') {
      showUpgradePrompt(user.id, tier, eligibility.requiredSubscription);
      return false;
    }

    alert(eligibility.message);
    return false;
  }

  // Proceed with tier completion
  return completeTierWithCeiling(user.id, tier, data);
}
```

### Edge Case 3: Free User Views Premium User Profile (Ceiling Mismatch)

**Scenario:** Free user (ceiling 2) views Premium user (ceiling 4) who has shared Tier 4.

**Solution:**
- EDT respects Free user's ceiling (EDT = 2 max)
- Free user sees Tier 1-2 only
- Tier 3-4 sections show lock overlay with upgrade prompt

---

## 9. Testing Strategy

### Test Suite: Subscription Tier Ceiling

```javascript
describe('Subscription Tier Ceiling', () => {
  test('Free user cannot complete Tier 3', () => {
    const user = createUser({ email: 'free@example.com', subscription: 'free' });

    completeTier(user.id, 1, { /* tier 1 data */ });
    completeTier(user.id, 2, { /* tier 2 data */ });

    const eligibility = canCompleteTier(user.id, 3);
    expect(eligibility.canComplete).toBe(false);
    expect(eligibility.reason).toBe('SUBSCRIPTION_CEILING_EXCEEDED');
    expect(eligibility.requiredSubscription).toBe('premium');
  });

  test('Premium user can complete Tier 3 and 4', () => {
    const user = createUser({ email: 'premium@example.com', subscription: 'premium' });

    completeTier(user.id, 1, { /* tier 1 data */ });
    completeTier(user.id, 2, { /* tier 2 data */ });

    const eligibility3 = canCompleteTier(user.id, 3);
    expect(eligibility3.canComplete).toBe(true);

    completeTier(user.id, 3, { /* tier 3 data */ });

    const eligibility4 = canCompleteTier(user.id, 4);
    expect(eligibility4.canComplete).toBe(true);
  });

  test('Premium user cannot complete Tier 5', () => {
    const user = createUser({ email: 'premium@example.com', subscription: 'premium' });

    completeTier(user.id, 1, { /* tier 1 data */ });
    completeTier(user.id, 2, { /* tier 2 data */ });
    completeTier(user.id, 3, { /* tier 3 data */ });
    completeTier(user.id, 4, { /* tier 4 data */ });

    const eligibility = canCompleteTier(user.id, 5);
    expect(eligibility.canComplete).toBe(false);
    expect(eligibility.reason).toBe('SUBSCRIPTION_CEILING_EXCEEDED');
    expect(eligibility.requiredSubscription).toBe('vip');
  });

  test('VIP user can complete all tiers', () => {
    const user = createUser({ email: 'vip@example.com', subscription: 'vip' });

    completeTier(user.id, 1, { /* tier 1 data */ });
    completeTier(user.id, 2, { /* tier 2 data */ });
    completeTier(user.id, 3, { /* tier 3 data */ });
    completeTier(user.id, 4, { /* tier 4 data */ });

    const eligibility5 = canCompleteTier(user.id, 5);
    expect(eligibility5.canComplete).toBe(true);

    const result = completeTier(user.id, 5, { /* tier 5 data */ });
    expect(result.success).toBe(true);
  });

  test('Subscription downgrade removes higher tiers', () => {
    const user = createUser({ email: 'premium@example.com', subscription: 'premium' });

    completeTier(user.id, 1, { /* tier 1 data */ });
    completeTier(user.id, 2, { /* tier 2 data */ });
    completeTier(user.id, 3, { /* tier 3 data */ });
    completeTier(user.id, 4, { /* tier 4 data */ });

    expect(user.completedTiers).toEqual([1, 2, 3, 4]);

    // Downgrade to Free
    const downgradeResult = handleSubscriptionDowngrade(user.id, 'free');
    expect(downgradeResult.success).toBe(true);

    expect(user.completedTiers).toEqual([1, 2]);
    expect(user.maxCompletedTier).toBe(2);
    expect(user.tierData.tier3).toBeNull();
    expect(user.tierData.tier4).toBeNull();
  });

  test('Upgrade prompt generated for ceiling block', () => {
    const user = createUser({ email: 'free@example.com', subscription: 'free', country: 'NG' });

    completeTier(user.id, 1, { /* tier 1 data */ });
    completeTier(user.id, 2, { /* tier 2 data */ });

    const eligibility = canCompleteTier(user.id, 3);
    expect(eligibility.canComplete).toBe(false);

    const prompt = generateUpgradePrompt(user.id, 3, 'premium');
    expect(prompt.type).toBe('premium');
    expect(prompt.blockedTier).toBe(3);
    expect(prompt.currentSubscription).toBe('free');
    expect(prompt.requiredSubscription).toBe('premium');
    expect(prompt.pricing.monthly).toBe('₦18,000');
  });

  test('Tier navigation reflects ceiling', () => {
    const user = createUser({ email: 'free@example.com', subscription: 'free' });

    completeTier(user.id, 1, { /* tier 1 data */ });
    completeTier(user.id, 2, { /* tier 2 data */ });

    const navStates = getTierNavigationStates(user.id);

    expect(navStates[0].state).toBe('completed'); // Tier 1
    expect(navStates[1].state).toBe('completed'); // Tier 2
    expect(navStates[2].state).toBe('locked');    // Tier 3
    expect(navStates[2].lockReason).toContain('Premium');
    expect(navStates[3].state).toBe('locked');    // Tier 4
    expect(navStates[4].state).toBe('locked');    // Tier 5
  });
});
```

---

## Related Documentation

- [Tier System](../Global%20Context/tier_system.md) - Complete tier definitions
- [State Management](state_management.md) - State models and functions
- [VIP Application Workflow](vip_application_workflow.md) - VIP upgrade process
- [Request Details Flow](request_details_flow.md) - EDT and tier sharing

---

**Document Owner:** Engineering Lead & Product Lead
**Technical Reviewer:** Senior Frontend Engineer
**Last Reviewed:** 2026-02-26
**Next Review:** 2026-05-26 (Quarterly)
