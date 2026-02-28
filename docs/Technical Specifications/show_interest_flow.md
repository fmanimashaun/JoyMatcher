# Show Interest Flow — Technical Implementation

**Version:** 1.0.0
**Last Updated:** 2026-02-26
**Status:** Technical Reference - Authoritative
**Document Type:** Technical Specification

---

## Table of Contents

1. [Overview](#1-overview)
2. [Core Rules](#2-core-rules)
3. [Eligibility Matrix](#3-eligibility-matrix)
4. [Show Interest State Machine](#4-show-interest-state-machine)
5. [Tier Awareness Warning](#5-tier-awareness-warning)
6. [Technical Implementation](#6-technical-implementation)
7. [Cooldown Enforcement](#7-cooldown-enforcement)
8. [UI Components](#8-ui-components)
9. [Edge Cases](#9-edge-cases)
10. [Testing Scenarios](#10-testing-scenarios)

---

## 1. Overview

### Purpose

The Show Interest flow is the gatekeeper for all user interactions on JoyMatcher. It enforces:
- Consent-based communication (no cold messaging)
- Subscription-based access control
- Tier awareness before interaction
- Anti-harassment cooldown periods
- Investment filtering through pricing

### Philosophy

> **No interaction occurs without mutual interest.**

This rule prevents:
- Unsolicited messages
- Entitlement behavior
- Harassment
- Low-effort browsing

### Key Requirements

1. **Mutual Consent Required**: Messaging only after Show Interest acceptance
2. **Tier Awareness Mandatory**: Users must see tier limitations before sending
3. **Subscription Gating**: Free cannot message Premium, Premium cannot message VIP
4. **Cooldown Enforcement**: 90-day block after decline
5. **EDT Projection**: Show expected visibility level before interaction

---

## 2. Core Rules

### Rule 1: Subscription Eligibility

**Eligibility Matrix:**

| Sender ↓ / Recipient → | Free | Premium | VIP |
|------------------------|------|---------|-----|
| **Free**               | ✅   | ❌      | ❌  |
| **Premium**            | ✅   | ✅      | ❌  |
| **VIP**                | ✅   | ✅      | ✅  |

**Enforcement:**
- Only VIP users can send Show Interest to other VIP users
- Premium users are blocked from contacting VIP users
- Free users can only contact other Free users

**Rationale:**
- VIP is curated, high-trust environment
- Prevents low-investment users from accessing high-investment users
- Pricing acts as a filter

### Rule 2: Tier Awareness Warning

**Before sending Show Interest, sender MUST:**
1. See Tier Awareness Warning modal
2. Understand what tier information they will see
3. Understand what tier information is locked
4. Acknowledge understanding by checking box
5. Explicitly confirm by clicking "Send Show Interest"

**This warning is non-dismissible and mandatory.**

### Rule 3: Cooldown After Decline

**If recipient declines Show Interest:**
- Sender is blocked from retrying for **90 days** (3 months)
- Cooldown is system-enforced, automatic reset
- No manual override (prevents harassment)
- Sender sees clear message with date when they can retry

**This prevents:**
- Repeated unwanted contact
- Harassment through persistent Show Interest sends
- Gaming the system by retrying immediately

### Rule 4: No Messaging Without Acceptance

**Until Show Interest is accepted:**
- ❌ No messaging
- ❌ No detail requests
- ❌ No further contact except revoking Show Interest
- ✅ Can view public profile (Tier 1) only

**After acceptance:**
- ✅ Unlimited messaging
- ✅ Detail requests allowed (if Premium/VIP)
- ✅ Full relationship features unlocked

---

## 3. Eligibility Matrix

### Detailed Eligibility Checks

```javascript
/**
 * Subscription eligibility matrix
 */
const ShowInterestEligibility = {
  free: {
    canSendTo: ['free'],
    blockedFrom: ['premium', 'vip']
  },
  premium: {
    canSendTo: ['free', 'premium'],
    blockedFrom: ['vip']
  },
  vip: {
    canSendTo: ['free', 'premium', 'vip'],
    blockedFrom: []
  }
};

/**
 * Check if sender can send Show Interest to recipient
 * @param {String} senderId - User sending Show Interest
 * @param {String} recipientId - User receiving Show Interest
 * @returns {Object} { eligible: Boolean, reason: String }
 */
function canSendShowInterest(senderId, recipientId) {
  const sender = AppState.users.get(senderId);
  const recipient = AppState.users.get(recipientId);

  if (!sender || !recipient) {
    return { eligible: false, reason: 'USER_NOT_FOUND' };
  }

  // Can't send to self
  if (senderId === recipientId) {
    return { eligible: false, reason: 'CANNOT_SEND_TO_SELF' };
  }

  // Check account status
  if (sender.accountStatus !== 'active') {
    return { eligible: false, reason: 'SENDER_ACCOUNT_INACTIVE' };
  }

  if (recipient.accountStatus !== 'active') {
    return { eligible: false, reason: 'RECIPIENT_ACCOUNT_INACTIVE' };
  }

  // Check if sender has completed Tier 1
  if (!sender.completedTiers.includes(1)) {
    return { eligible: false, reason: 'SENDER_TIER1_INCOMPLETE' };
  }

  // Check if recipient has completed Tier 1
  if (!recipient.completedTiers.includes(1)) {
    return { eligible: false, reason: 'RECIPIENT_TIER1_INCOMPLETE' };
  }

  // Check subscription eligibility
  const senderSubscription = sender.subscription;
  const recipientSubscription = recipient.subscription;

  const eligibility = ShowInterestEligibility[senderSubscription];

  if (!eligibility.canSendTo.includes(recipientSubscription)) {
    return {
      eligible: false,
      reason: 'SUBSCRIPTION_MISMATCH',
      details: {
        senderSubscription,
        recipientSubscription,
        requiredSubscription: recipientSubscription === 'vip' ? 'vip' : 'premium'
      }
    };
  }

  // Check existing relationship status
  const relationshipId = getRelationshipId(senderId, recipientId);
  const relationship = AppState.relationships.get(relationshipId);

  if (relationship) {
    switch (relationship.showInterestStatus) {
      case 'sent':
        // Already sent, waiting for response
        if (relationship.showInterestInitiator === senderId) {
          return { eligible: false, reason: 'ALREADY_SENT' };
        } else {
          // Recipient sent to sender, sender should accept/decline instead
          return { eligible: false, reason: 'RECEIVED_SHOW_INTEREST' };
        }

      case 'accepted':
        return { eligible: false, reason: 'ALREADY_ACCEPTED' };

      case 'cooldown':
        // Check if cooldown period has ended
        if (new Date() < relationship.showInterestCooldownEnds) {
          return {
            eligible: false,
            reason: 'IN_COOLDOWN',
            details: {
              cooldownEnds: relationship.showInterestCooldownEnds
            }
          };
        }
        // Cooldown expired, can send again
        break;

      case 'declined':
        // Should be in cooldown, but check anyway
        return { eligible: false, reason: 'DECLINED' };

      default:
        // Status is 'none' or unrecognized, can proceed
        break;
    }
  }

  // Check if recipient is VIP with invisible profile
  if (recipient.isVIP && !recipient.profileVisible) {
    return {
      eligible: false,
      reason: 'PROFILE_INVISIBLE',
      details: {
        message: 'This VIP member has made their profile invisible. They can only be contacted through concierge introductions.'
      }
    };
  }

  // All checks passed
  return { eligible: true, reason: 'ELIGIBLE' };
}
```

### Eligibility Check UI States

**State 1: Eligible**
```
Button State: "Show Interest" (enabled, primary color)
```

**State 2: Subscription Mismatch (Free → Premium)**
```
Button State: "Upgrade to Contact" (enabled, premium color)
Tooltip: "Upgrade to Premium to send Show Interest to Premium users"
```

**State 3: Subscription Mismatch (Premium → VIP)**
```
Button State: "VIP Access Required" (disabled, grayed out)
Tooltip: "Only VIP members can send Show Interest to VIP users. Complete Tier 4 and apply for VIP membership."
Link: "Learn About VIP"
```

**State 4: Already Sent**
```
Button State: "Show Interest Sent" (disabled, muted)
Message: "Waiting for response..."
```

**State 5: In Cooldown**
```
Button State: "Show Interest Declined" (disabled, red)
Message: "You can send Show Interest again on [Date]"
Countdown: "23 days remaining"
```

**State 6: Profile Invisible**
```
Button State: (hidden)
Message: "This VIP member prefers curated introductions through our concierge service."
Link: "Apply for VIP"
```

---

## 4. Show Interest State Machine

### State Diagram

```
[none]
  ↓
  | User A sends Show Interest
  ↓
[sent] (initiator: User A)
  ↓
  ├─→ User B accepts → [accepted] → Messages unlocked
  ├─→ User B declines → [declined] → [cooldown] (90 days)
  └─→ User A revokes → [none]

[cooldown]
  ↓
  | 90 days pass
  ↓
[none] (can send again)
```

### State Transitions

```javascript
/**
 * Show Interest state transitions
 */
const ShowInterestStates = {
  none: 'none',           // No Show Interest interaction
  sent: 'sent',           // Show Interest sent, awaiting response
  accepted: 'accepted',   // Show Interest accepted, messaging unlocked
  declined: 'declined',   // Show Interest declined
  cooldown: 'cooldown'    // In cooldown period after decline
};

/**
 * Valid state transitions
 */
const ValidTransitions = {
  none: ['sent'],
  sent: ['accepted', 'declined', 'none'], // 'none' = sender revokes
  accepted: [], // Terminal state (no transitions)
  declined: ['cooldown'],
  cooldown: ['none'] // After cooldown expires
};
```

---

## 5. Tier Awareness Warning

### Warning Modal Structure

```javascript
/**
 * Generate Tier Awareness Warning content
 * @param {String} senderId - User sending Show Interest
 * @param {String} recipientId - User receiving Show Interest
 * @returns {Object} Warning modal content
 */
function generateTierAwarenessWarning(senderId, recipientId) {
  const sender = AppState.users.get(senderId);
  const recipient = AppState.users.get(recipientId);

  if (!sender || !recipient) return null;

  // Calculate projected EDT
  const relationship = getOrCreateRelationship(senderId, recipientId);
  const projectedEDT = Math.min(
    sender.maxCompletedTier,
    recipient.maxCompletedTier,
    1, // Initially only Tier 1 shared
    1
  );

  // Build tier visibility breakdown
  const tierVisibility = [
    {
      tier: 1,
      name: 'Identity & Intent',
      visible: projectedEDT >= 1,
      fields: ['Name', 'Age', 'Location', 'Faith', 'Relationship Intent', 'Photo']
    },
    {
      tier: 2,
      name: 'Lifestyle & Background',
      visible: projectedEDT >= 2,
      fields: ['Height', 'Education', 'Occupation', 'Lifestyle Habits', 'Languages']
    },
    {
      tier: 3,
      name: 'Relationship & Family',
      visible: projectedEDT >= 3,
      fields: ['Marital History', 'Children', 'Marriage Timeline', 'Family Expectations']
    },
    {
      tier: 4,
      name: 'Health & Compatibility',
      visible: projectedEDT >= 4,
      fields: ['Genotype', 'Blood Group', 'Health Conditions', 'Core Non-Negotiables']
    },
    {
      tier: 5,
      name: 'Verified Identity',
      visible: projectedEDT >= 5,
      fields: ['KYC Verified Badge']
    }
  ];

  // Check what sender needs to unlock more
  const unlockRequirements = [];

  // If sender hasn't completed tiers
  for (let tier = 2; tier <= 5; tier++) {
    if (!sender.completedTiers.includes(tier) && recipient.maxCompletedTier >= tier) {
      // Check subscription requirement
      if (tier > sender.subscriptionCeiling) {
        const requiredSubscription = tier <= 2 ? 'free' : tier <= 4 ? 'premium' : 'vip';
        unlockRequirements.push({
          tier,
          reason: 'subscription',
          requiredSubscription,
          message: `Upgrade to ${requiredSubscription.charAt(0).toUpperCase() + requiredSubscription.slice(1)} to unlock Tier ${tier}`
        });
      } else {
        unlockRequirements.push({
          tier,
          reason: 'completion',
          message: `Complete Tier ${tier} yourself to view their Tier ${tier} information`
        });
      }
    }
  }

  return {
    recipientName: recipient.displayName,
    recipientAge: recipient.age,
    recipientSubscription: recipient.subscription,
    recipientMaxTier: recipient.maxCompletedTier,
    recipientVerified: recipient.tier5Verified,

    senderMaxTier: sender.maxCompletedTier,
    senderSubscription: sender.subscription,

    projectedEDT,
    tierVisibility,
    unlockRequirements,

    warningText: generateWarningText(sender, recipient, projectedEDT),
    acknowledgeRequired: true
  };
}

/**
 * Generate warning text based on EDT projection
 * @param {Object} sender
 * @param {Object} recipient
 * @param {Number} projectedEDT
 * @returns {String} Warning text
 */
function generateWarningText(sender, recipient, projectedEDT) {
  if (projectedEDT === 1) {
    return `${recipient.displayName} has completed Tier ${recipient.maxCompletedTier}, but you will initially see only Tier 1 (basic information). To view more, you must complete higher tiers yourself and request access.`;
  } else if (projectedEDT < recipient.maxCompletedTier) {
    return `${recipient.displayName} has completed up to Tier ${recipient.maxCompletedTier}. You will see Tier 1-${projectedEDT} initially. To unlock more information, complete higher tiers yourself and request access.`;
  } else {
    return `${recipient.displayName} has completed Tier ${recipient.maxCompletedTier}. If they accept your Show Interest and share their information, you will see Tier 1-${projectedEDT}.`;
  }
}
```

### Warning Modal UI

```html
<!-- Tier Awareness Warning Modal -->
<div class="modal tier-awareness-warning">
  <div class="modal-content">
    <div class="modal-header">
      <h2>⚠️ Tier Awareness</h2>
      <p class="subtitle">Understand what you'll see before connecting</p>
    </div>

    <div class="modal-body">
      <!-- Recipient Info -->
      <div class="recipient-card">
        <img src="[recipientPhoto]" alt="[recipientName]">
        <div class="recipient-info">
          <h3>[recipientName], [age]</h3>
          <p class="subscription-badge">[Subscription] Member</p>
          <p class="tier-badge">Completed Tier [maxTier]</p>
          <span class="verified-badge" *if="tier5Verified">✓ Verified Identity</span>
        </div>
      </div>

      <!-- EDT Projection -->
      <div class="edt-projection">
        <h4>If they accept, you will see:</h4>
        <div class="edt-meter">
          <div class="edt-fill" style="width: [projectedEDT * 20]%"></div>
          <span class="edt-label">Tier 1-[projectedEDT]</span>
        </div>
      </div>

      <!-- Tier Visibility Breakdown -->
      <div class="tier-visibility-list">
        <div class="tier-item" *for="tier in tierVisibility">
          <div class="tier-header">
            <span class="tier-icon" *if="tier.visible">✅</span>
            <span class="tier-icon" *if="!tier.visible">🔒</span>
            <span class="tier-name">Tier [tier.tier]: [tier.name]</span>
          </div>
          <ul class="tier-fields" *if="tier.visible">
            <li *for="field in tier.fields">[field]</li>
          </ul>
          <p class="tier-locked-message" *if="!tier.visible">
            This tier is locked. [Unlock requirement message]
          </p>
        </div>
      </div>

      <!-- Warning Text -->
      <div class="warning-message">
        <p>[warningText]</p>
      </div>

      <!-- Unlock Requirements (if any) -->
      <div class="unlock-requirements" *if="unlockRequirements.length > 0">
        <h4>To unlock more information:</h4>
        <ul>
          <li *for="requirement in unlockRequirements">
            [requirement.message]
          </li>
        </ul>
      </div>

      <!-- Special VIP Warning (if VIP → Free) -->
      <div class="vip-warning" *if="senderSubscription === 'vip' && recipientSubscription === 'free'">
        <p class="warning-strong">
          ⚠️ <strong>VIP Note:</strong> This user is on the Free plan with limited tier completion. You will see very minimal information even if they accept.
        </p>
      </div>

      <!-- Acknowledgment Checkbox -->
      <label class="acknowledgment">
        <input type="checkbox" id="tierAwarenessAcknowledge" required>
        I understand the tier limitations and what information I will see
      </label>
    </div>

    <div class="modal-footer">
      <button class="btn-secondary" onclick="closeTierAwarenessModal()">Cancel</button>
      <button
        class="btn-primary"
        id="sendShowInterestBtn"
        disabled
        onclick="confirmSendShowInterest()"
      >
        Send Show Interest
      </button>
    </div>
  </div>
</div>

<script>
// Enable button only when checkbox is checked
document.getElementById('tierAwarenessAcknowledge').addEventListener('change', function() {
  document.getElementById('sendShowInterestBtn').disabled = !this.checked;
});
</script>
```

---

## 6. Technical Implementation

### Send Show Interest Function

```javascript
/**
 * Send Show Interest from sender to recipient
 * @param {String} senderId - User sending Show Interest
 * @param {String} recipientId - User receiving Show Interest
 * @param {Boolean} tierAwarenessAcknowledged - User acknowledged tier warning
 * @returns {Object} { success: Boolean, reason: String, data: Object }
 */
function sendShowInterest(senderId, recipientId, tierAwarenessAcknowledged = false) {
  // Validate eligibility
  const eligibility = canSendShowInterest(senderId, recipientId);

  if (!eligibility.eligible) {
    return {
      success: false,
      reason: eligibility.reason,
      details: eligibility.details
    };
  }

  // Enforce tier awareness acknowledgment
  if (!tierAwarenessAcknowledged) {
    return {
      success: false,
      reason: 'TIER_AWARENESS_NOT_ACKNOWLEDGED',
      warningData: generateTierAwarenessWarning(senderId, recipientId)
    };
  }

  const sender = AppState.users.get(senderId);
  const recipient = AppState.users.get(recipientId);
  const now = new Date();

  // Get or create relationship
  const relationship = getOrCreateRelationship(senderId, recipientId);

  // Update relationship state
  relationship.showInterestStatus = 'sent';
  relationship.showInterestInitiator = senderId;
  relationship.showInterestSentAt = now;
  relationship.showInterestRespondedAt = null;
  relationship.updatedAt = now;

  // Determine which user acknowledged tier warning
  if (relationship.userId1 === senderId) {
    relationship.tierWarningShownToUser1 = true;
    relationship.tierWarningAcknowledgedByUser1At = now;
  } else {
    relationship.tierWarningShownToUser2 = true;
    relationship.tierWarningAcknowledgedByUser2At = now;
  }

  // Update sender stats
  sender.showInterestsSent++;
  sender.lastActive = now;
  sender.updatedAt = now;

  // Update recipient stats
  recipient.showInterestsReceived++;
  recipient.updatedAt = now;

  // Log event
  logAuditEvent({
    eventType: 'show_interest_sent',
    senderId: senderId,
    recipientId: recipientId,
    relationshipId: relationship.id,
    timestamp: now
  });

  // Persist state
  persistState();

  // Trigger notification to recipient (in prototype, just log)
  console.log(`Show Interest notification sent to ${recipient.email}`);

  return {
    success: true,
    reason: 'SENT',
    data: {
      relationshipId: relationship.id,
      recipientName: recipient.displayName,
      sentAt: now
    }
  };
}
```

### Accept Show Interest Function

```javascript
/**
 * Accept Show Interest
 * @param {String} recipientId - User accepting (who received Show Interest)
 * @param {String} senderId - User who sent Show Interest
 * @returns {Object} { success: Boolean, reason: String, data: Object }
 */
function acceptShowInterest(recipientId, senderId) {
  const recipient = AppState.users.get(recipientId);
  const sender = AppState.users.get(senderId);

  if (!recipient || !sender) {
    return { success: false, reason: 'USER_NOT_FOUND' };
  }

  // Get relationship
  const relationshipId = getRelationshipId(senderId, recipientId);
  const relationship = AppState.relationships.get(relationshipId);

  if (!relationship) {
    return { success: false, reason: 'RELATIONSHIP_NOT_FOUND' };
  }

  // Validate current state
  if (relationship.showInterestStatus !== 'sent') {
    return { success: false, reason: 'INVALID_STATE', currentState: relationship.showInterestStatus };
  }

  // Validate recipient is the one who received Show Interest
  if (relationship.showInterestInitiator !== senderId) {
    return { success: false, reason: 'INVALID_INITIATOR' };
  }

  const now = new Date();

  // Update relationship state
  relationship.showInterestStatus = 'accepted';
  relationship.showInterestRespondedAt = now;
  relationship.messagesUnlocked = true; // Unlock messaging
  relationship.updatedAt = now;

  // Update users
  recipient.lastActive = now;
  sender.lastActive = now;

  // Log event
  logAuditEvent({
    eventType: 'show_interest_accepted',
    senderId: senderId,
    recipientId: recipientId,
    relationshipId: relationship.id,
    timestamp: now
  });

  // Persist state
  persistState();

  // Trigger notification to sender
  console.log(`Show Interest acceptance notification sent to ${sender.email}`);

  return {
    success: true,
    reason: 'ACCEPTED',
    data: {
      relationshipId: relationship.id,
      senderName: sender.displayName,
      messagesUnlocked: true,
      acceptedAt: now
    }
  };
}
```

### Decline Show Interest Function

```javascript
/**
 * Decline Show Interest
 * @param {String} recipientId - User declining (who received Show Interest)
 * @param {String} senderId - User who sent Show Interest
 * @returns {Object} { success: Boolean, reason: String, data: Object }
 */
function declineShowInterest(recipientId, senderId) {
  const recipient = AppState.users.get(recipientId);
  const sender = AppState.users.get(senderId);

  if (!recipient || !sender) {
    return { success: false, reason: 'USER_NOT_FOUND' };
  }

  // Get relationship
  const relationshipId = getRelationshipId(senderId, recipientId);
  const relationship = AppState.relationships.get(relationshipId);

  if (!relationship) {
    return { success: false, reason: 'RELATIONSHIP_NOT_FOUND' };
  }

  // Validate current state
  if (relationship.showInterestStatus !== 'sent') {
    return { success: false, reason: 'INVALID_STATE', currentState: relationship.showInterestStatus };
  }

  // Validate recipient is the one who received Show Interest
  if (relationship.showInterestInitiator !== senderId) {
    return { success: false, reason: 'INVALID_INITIATOR' };
  }

  const now = new Date();

  // Calculate cooldown end date (90 days from now)
  const cooldownEnd = new Date(now);
  cooldownEnd.setDate(cooldownEnd.getDate() + AppState.config.cooldownPeriodDays);

  // Update relationship state
  relationship.showInterestStatus = 'cooldown';
  relationship.showInterestRespondedAt = now;
  relationship.showInterestCooldownEnds = cooldownEnd;
  relationship.messagesUnlocked = false; // Ensure messaging blocked
  relationship.updatedAt = now;

  // Update users
  recipient.lastActive = now;
  sender.lastActive = now;

  // Log event
  logAuditEvent({
    eventType: 'show_interest_declined',
    senderId: senderId,
    recipientId: recipientId,
    relationshipId: relationship.id,
    cooldownEnds: cooldownEnd,
    timestamp: now
  });

  // Persist state
  persistState();

  // Trigger notification to sender (optional, can be silent decline)
  console.log(`Show Interest declined, sender ${sender.email} in cooldown until ${cooldownEnd}`);

  return {
    success: true,
    reason: 'DECLINED',
    data: {
      relationshipId: relationship.id,
      cooldownEnds: cooldownEnd,
      cooldownDays: AppState.config.cooldownPeriodDays,
      declinedAt: now
    }
  };
}
```

### Revoke Show Interest Function

```javascript
/**
 * Revoke Show Interest (sender cancels before recipient responds)
 * @param {String} senderId - User revoking
 * @param {String} recipientId - User who received Show Interest
 * @returns {Object} { success: Boolean, reason: String }
 */
function revokeShowInterest(senderId, recipientId) {
  const sender = AppState.users.get(senderId);
  const recipient = AppState.users.get(recipientId);

  if (!sender || !recipient) {
    return { success: false, reason: 'USER_NOT_FOUND' };
  }

  // Get relationship
  const relationshipId = getRelationshipId(senderId, recipientId);
  const relationship = AppState.relationships.get(relationshipId);

  if (!relationship) {
    return { success: false, reason: 'RELATIONSHIP_NOT_FOUND' };
  }

  // Validate current state
  if (relationship.showInterestStatus !== 'sent') {
    return { success: false, reason: 'INVALID_STATE', currentState: relationship.showInterestStatus };
  }

  // Validate sender is the one who sent Show Interest
  if (relationship.showInterestInitiator !== senderId) {
    return { success: false, reason: 'NOT_INITIATOR' };
  }

  const now = new Date();

  // Reset relationship to 'none'
  relationship.showInterestStatus = 'none';
  relationship.showInterestInitiator = null;
  relationship.showInterestSentAt = null;
  relationship.showInterestRespondedAt = null;
  relationship.updatedAt = now;

  // Log event
  logAuditEvent({
    eventType: 'show_interest_revoked',
    senderId: senderId,
    recipientId: recipientId,
    relationshipId: relationship.id,
    timestamp: now
  });

  // Persist state
  persistState();

  console.log(`Show Interest revoked by sender ${sender.email}`);

  return {
    success: true,
    reason: 'REVOKED',
    data: {
      relationshipId: relationship.id,
      revokedAt: now
    }
  };
}
```

---

## 7. Cooldown Enforcement

### Cooldown State Management

```javascript
/**
 * Check if cooldown period has ended
 * @param {String} relationshipId - Relationship ID
 * @returns {Boolean} Cooldown active or not
 */
function isCooldownActive(relationshipId) {
  const relationship = AppState.relationships.get(relationshipId);

  if (!relationship) return false;

  if (relationship.showInterestStatus !== 'cooldown') {
    return false;
  }

  const now = new Date();

  // Check if cooldown has expired
  if (now >= relationship.showInterestCooldownEnds) {
    // Cooldown expired, reset to 'none'
    relationship.showInterestStatus = 'none';
    relationship.showInterestCooldownEnds = null;
    relationship.updatedAt = now;

    logAuditEvent({
      eventType: 'cooldown_expired',
      relationshipId: relationshipId,
      timestamp: now
    });

    persistState();

    return false; // No longer in cooldown
  }

  return true; // Still in cooldown
}

/**
 * Get cooldown remaining time
 * @param {String} relationshipId - Relationship ID
 * @returns {Object} { active: Boolean, daysRemaining: Number, endsAt: Date }
 */
function getCooldownStatus(relationshipId) {
  const relationship = AppState.relationships.get(relationshipId);

  if (!relationship || relationship.showInterestStatus !== 'cooldown') {
    return { active: false, daysRemaining: 0, endsAt: null };
  }

  const now = new Date();
  const endsAt = relationship.showInterestCooldownEnds;

  if (now >= endsAt) {
    // Expired
    return { active: false, daysRemaining: 0, endsAt: null };
  }

  // Calculate days remaining
  const msRemaining = endsAt - now;
  const daysRemaining = Math.ceil(msRemaining / (1000 * 60 * 60 * 24));

  return {
    active: true,
    daysRemaining,
    endsAt
  };
}
```

### Cooldown UI Display

```javascript
/**
 * Generate cooldown UI message
 * @param {String} senderId - User in cooldown
 * @param {String} recipientId - User who declined
 * @returns {String} HTML message
 */
function generateCooldownMessage(senderId, recipientId) {
  const relationshipId = getRelationshipId(senderId, recipientId);
  const cooldownStatus = getCooldownStatus(relationshipId);

  if (!cooldownStatus.active) {
    return null;
  }

  const recipient = AppState.users.get(recipientId);
  const endsAtFormatted = cooldownStatus.endsAt.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return `
    <div class="cooldown-message">
      <h3>❌ Show Interest Declined</h3>
      <p>${recipient.displayName} declined your Show Interest.</p>
      <p class="cooldown-timer">
        You can send Show Interest again on <strong>${endsAtFormatted}</strong>
      </p>
      <p class="cooldown-countdown">
        ${cooldownStatus.daysRemaining} day${cooldownStatus.daysRemaining !== 1 ? 's' : ''} remaining
      </p>
    </div>
  `;
}
```

---

## 8. UI Components

### Show Interest Button States

```javascript
/**
 * Get Show Interest button state for UI
 * @param {String} currentUserId - Logged-in user
 * @param {String} profileUserId - Profile being viewed
 * @returns {Object} Button configuration
 */
function getShowInterestButtonState(currentUserId, profileUserId) {
  const eligibility = canSendShowInterest(currentUserId, profileUserId);

  if (!eligibility.eligible) {
    switch (eligibility.reason) {
      case 'SUBSCRIPTION_MISMATCH':
        const requiredSub = eligibility.details.requiredSubscription;
        return {
          label: requiredSub === 'vip' ? 'VIP Access Required' : 'Upgrade to Contact',
          enabled: requiredSub !== 'vip', // Can upgrade to Premium, but not to VIP via button
          action: requiredSub === 'vip' ? 'showVIPInfo' : 'showUpgradeModal',
          className: 'btn-upgrade',
          tooltip: requiredSub === 'vip'
            ? 'Only VIP members can contact VIP users'
            : 'Upgrade to Premium to send Show Interest to Premium users'
        };

      case 'ALREADY_SENT':
        return {
          label: 'Show Interest Sent',
          enabled: false,
          action: null,
          className: 'btn-disabled btn-sent',
          tooltip: 'Waiting for response...'
        };

      case 'ALREADY_ACCEPTED':
        return {
          label: 'Connected',
          enabled: false,
          action: 'openMessages',
          className: 'btn-success',
          tooltip: 'You can message this user'
        };

      case 'IN_COOLDOWN':
        const cooldownStatus = getCooldownStatus(getRelationshipId(currentUserId, profileUserId));
        return {
          label: 'Show Interest Declined',
          enabled: false,
          action: null,
          className: 'btn-disabled btn-cooldown',
          tooltip: `You can try again on ${cooldownStatus.endsAt.toLocaleDateString()}`
        };

      case 'RECEIVED_SHOW_INTEREST':
        return {
          label: 'Respond to Show Interest',
          enabled: true,
          action: 'showRespondModal',
          className: 'btn-primary btn-respond',
          tooltip: 'This user has sent you Show Interest. Accept or decline.'
        };

      case 'PROFILE_INVISIBLE':
        return {
          label: null,
          enabled: false,
          action: null,
          className: 'btn-hidden',
          message: 'This VIP member prefers curated introductions. Apply for VIP to be matched.'
        };

      default:
        return {
          label: 'Cannot Send Show Interest',
          enabled: false,
          action: null,
          className: 'btn-disabled',
          tooltip: eligibility.reason
        };
    }
  }

  // Eligible
  return {
    label: 'Show Interest',
    enabled: true,
    action: 'showTierAwarenessWarning',
    className: 'btn-primary btn-show-interest',
    tooltip: 'Send Show Interest to start a conversation'
  };
}
```

---

## 9. Edge Cases

### Edge Case 1: Cooldown Expiry Mid-Session

**Scenario:** User views profile while in cooldown, cooldown expires during session.

**Solution:**
- UI polls cooldown status every 60 seconds
- When expired, button state updates automatically
- User can send Show Interest without page refresh

```javascript
// Poll cooldown status
setInterval(() => {
  const relationshipId = getRelationshipId(currentUserId, viewingProfileId);
  if (isCooldownActive(relationshipId) === false) {
    // Cooldown expired, update UI
    updateShowInterestButton(currentUserId, viewingProfileId);
  }
}, 60000); // Check every 60 seconds
```

### Edge Case 2: Simultaneous Show Interest

**Scenario:** User A sends Show Interest to User B at the same time User B sends to User A.

**Solution:**
- Both Show Interests succeed
- Both relationships show "sent" initially
- When either user views the other's profile, they see "Respond to Show Interest" instead of "Sent"
- First to accept unlocks messaging for both

```javascript
// Handle simultaneous Show Interest
if (relationship.showInterestStatus === 'sent' && relationship.showInterestInitiator !== currentUserId) {
  // Current user received Show Interest while viewing profile
  // Show respond options instead of "Sent" status
  return {
    label: 'Respond to Show Interest',
    action: 'showRespondModal'
  };
}
```

### Edge Case 3: Subscription Downgrade During Cooldown

**Scenario:** Premium user declines Free user's Show Interest (cooldown starts). Free user upgrades to Premium during cooldown. Cooldown should remain.

**Solution:**
- Cooldown is independent of subscription status
- Upgrading subscription does not reset cooldown
- Cooldown must expire naturally (90 days)

### Edge Case 4: Recipient Account Deleted During Sent State

**Scenario:** User A sends Show Interest to User B. User B deletes account before responding.

**Solution:**
- When User B's account is deleted, all their relationships are marked as "inactive"
- User A sees message: "This user is no longer available"
- Show Interest is automatically revoked (status → 'none')

```javascript
// Handle deleted account
if (recipient.accountStatus === 'deleted') {
  relationship.showInterestStatus = 'none';
  relationship.showInterestInitiator = null;
  return {
    label: 'User Unavailable',
    enabled: false,
    message: 'This user is no longer available on JoyMatcher'
  };
}
```

---

## 10. Testing Scenarios

### Test Suite: Show Interest Flow

```javascript
describe('Show Interest Flow', () => {
  test('Free user can send Show Interest to Free user', () => {
    const user1 = createUser({ email: 'free1@example.com', subscription: 'free' });
    const user2 = createUser({ email: 'free2@example.com', subscription: 'free' });

    completeTier(user1.id, 1, { /* tier 1 data */ });
    completeTier(user2.id, 1, { /* tier 1 data */ });

    const result = sendShowInterest(user1.id, user2.id, true);
    expect(result.success).toBe(true);
  });

  test('Free user CANNOT send Show Interest to Premium user', () => {
    const user1 = createUser({ email: 'free@example.com', subscription: 'free' });
    const user2 = createUser({ email: 'premium@example.com', subscription: 'premium' });

    completeTier(user1.id, 1, { /* tier 1 data */ });
    completeTier(user2.id, 1, { /* tier 1 data */ });

    const eligibility = canSendShowInterest(user1.id, user2.id);
    expect(eligibility.eligible).toBe(false);
    expect(eligibility.reason).toBe('SUBSCRIPTION_MISMATCH');
  });

  test('Premium user CANNOT send Show Interest to VIP user', () => {
    const user1 = createUser({ email: 'premium@example.com', subscription: 'premium' });
    const user2 = createUser({ email: 'vip@example.com', subscription: 'vip' });

    completeTier(user1.id, 1, { /* tier 1 data */ });
    completeTier(user2.id, 1, { /* tier 1 data */ });

    const eligibility = canSendShowInterest(user1.id, user2.id);
    expect(eligibility.eligible).toBe(false);
    expect(eligibility.reason).toBe('SUBSCRIPTION_MISMATCH');
  });

  test('VIP user CAN send Show Interest to VIP user', () => {
    const user1 = createUser({ email: 'vip1@example.com', subscription: 'vip' });
    const user2 = createUser({ email: 'vip2@example.com', subscription: 'vip' });

    completeTier(user1.id, 1, { /* tier 1 data */ });
    completeTier(user2.id, 1, { /* tier 1 data */ });

    const result = sendShowInterest(user1.id, user2.id, true);
    expect(result.success).toBe(true);
  });

  test('Tier Awareness Warning must be acknowledged', () => {
    const user1 = createUser({ email: 'user1@example.com', subscription: 'premium' });
    const user2 = createUser({ email: 'user2@example.com', subscription: 'premium' });

    completeTier(user1.id, 1, { /* tier 1 data */ });
    completeTier(user2.id, 1, { /* tier 1 data */ });

    const result = sendShowInterest(user1.id, user2.id, false); // Not acknowledged
    expect(result.success).toBe(false);
    expect(result.reason).toBe('TIER_AWARENESS_NOT_ACKNOWLEDGED');
  });

  test('Accept Show Interest unlocks messaging', () => {
    const user1 = createUser({ email: 'user1@example.com', subscription: 'premium' });
    const user2 = createUser({ email: 'user2@example.com', subscription: 'premium' });

    completeTier(user1.id, 1, { /* tier 1 data */ });
    completeTier(user2.id, 1, { /* tier 1 data */ });

    sendShowInterest(user1.id, user2.id, true);

    const result = acceptShowInterest(user2.id, user1.id);
    expect(result.success).toBe(true);
    expect(result.data.messagesUnlocked).toBe(true);

    const rel = AppState.relationships.get(getRelationshipId(user1.id, user2.id));
    expect(rel.showInterestStatus).toBe('accepted');
    expect(rel.messagesUnlocked).toBe(true);
  });

  test('Decline Show Interest triggers 90-day cooldown', () => {
    const user1 = createUser({ email: 'user1@example.com', subscription: 'premium' });
    const user2 = createUser({ email: 'user2@example.com', subscription: 'premium' });

    completeTier(user1.id, 1, { /* tier 1 data */ });
    completeTier(user2.id, 1, { /* tier 1 data */ });

    sendShowInterest(user1.id, user2.id, true);

    const result = declineShowInterest(user2.id, user1.id);
    expect(result.success).toBe(true);

    const rel = AppState.relationships.get(getRelationshipId(user1.id, user2.id));
    expect(rel.showInterestStatus).toBe('cooldown');

    const cooldownEnd = new Date(rel.showInterestCooldownEnds);
    const now = new Date();
    const daysDiff = Math.ceil((cooldownEnd - now) / (1000 * 60 * 60 * 24));
    expect(daysDiff).toBe(90);
  });

  test('Cannot send Show Interest while in cooldown', () => {
    const user1 = createUser({ email: 'user1@example.com', subscription: 'premium' });
    const user2 = createUser({ email: 'user2@example.com', subscription: 'premium' });

    completeTier(user1.id, 1, { /* tier 1 data */ });
    completeTier(user2.id, 1, { /* tier 1 data */ });

    sendShowInterest(user1.id, user2.id, true);
    declineShowInterest(user2.id, user1.id);

    // Try to send again (should fail - in cooldown)
    const eligibility = canSendShowInterest(user1.id, user2.id);
    expect(eligibility.eligible).toBe(false);
    expect(eligibility.reason).toBe('IN_COOLDOWN');
  });

  test('Sender can revoke Show Interest before response', () => {
    const user1 = createUser({ email: 'user1@example.com', subscription: 'premium' });
    const user2 = createUser({ email: 'user2@example.com', subscription: 'premium' });

    completeTier(user1.id, 1, { /* tier 1 data */ });
    completeTier(user2.id, 1, { /* tier 1 data */ });

    sendShowInterest(user1.id, user2.id, true);

    const result = revokeShowInterest(user1.id, user2.id);
    expect(result.success).toBe(true);

    const rel = AppState.relationships.get(getRelationshipId(user1.id, user2.id));
    expect(rel.showInterestStatus).toBe('none');
  });
});
```

---

## Related Documentation

- [State Management](state_management.md) - Core state models
- [EDT Specification](../Global%20Context/edt_specification.md) - EDT calculation rules
- [Tier System](../Global%20Context/tier_system.md) - Tier definitions
- [Request Details Flow](request_details_flow.md) - Tier disclosure negotiation

---

**Document Owner:** Engineering Lead
**Technical Reviewer:** Senior Frontend Engineer
**Last Reviewed:** 2026-02-26
**Next Review:** 2026-05-26 (Quarterly)
