# Request Details Flow — Technical Implementation

**Version:** 1.0.0
**Last Updated:** 2026-02-26
**Status:** Technical Reference - Authoritative
**Document Type:** Technical Specification

---

## Table of Contents

1. [Overview](#1-overview)
2. [Core Rules](#2-core-rules)
3. [Eligibility Requirements](#3-eligibility-requirements)
4. [Request Flow States](#4-request-flow-states)
5. [Technical Implementation](#5-technical-implementation)
6. [EDT Update Logic](#6-edt-update-logic)
7. [UI Components](#7-ui-components)
8. [Edge Cases](#8-edge-cases)
9. [Negotiation Scenarios](#9-negotiation-scenarios)
10. [Testing Strategy](#10-testing-strategy)

---

## 1. Overview

### Purpose

The Request Details flow enables reciprocal tier disclosure negotiation between users who have already established mutual interest. It enforces:
- Reciprocity (fair exchange of information)
- Subscription-based tier access control
- EDT-driven visibility updates
- Consent-based disclosure progression

### Philosophy

> **Depth requires matching depth. No free-riding on others' transparency.**

Users can request higher-tier information from matches, but:
1. **Must have completed that tier themselves**
2. **Must offer equivalent or higher tier in exchange**
3. **Must have appropriate subscription level**
4. **Recipient has full control** to accept, modify, or decline

### Key Requirements

1. **Free Users Cannot Request Details**: Only Premium/VIP can request
2. **Completion Gating**: Can only request tiers you've completed
3. **Reciprocal Offering**: Must offer tier disclosure in exchange
4. **Recipient Choice**: Recipient can share exactly, less, or more than requested
5. **EDT Recalculation**: Automatic EDT update after successful exchange
6. **Audit Logging**: All requests/responses logged for transparency

---

## 2. Core Rules

### Rule 1: Request Button Visibility

| User Type | Can Request Details? | When Button Appears |
|-----------|---------------------|---------------------|
| Free      | ❌ Never            | Button hidden       |
| Premium   | ✅ Yes              | After Show Interest acceptance |
| VIP       | ✅ Yes              | After Show Interest acceptance |

**Enforcement:**
- Free users never see "Request More Details" button
- Button only appears after mutual Show Interest acceptance
- Button disabled if all tiers already shared at maximum

### Rule 2: Completion Requirement

**Cannot request tier higher than your own completion:**

```javascript
if (requestedTier > requester.maxCompletedTier) {
  return error("Complete Tier X yourself before requesting it");
}
```

**Example:**
- User A has completed Tier 3
- User A wants to request Tier 4 from User B
- ❌ **Blocked** — User A must complete Tier 4 first

### Rule 3: Subscription Ceiling Enforcement

**Cannot request tier above subscription ceiling:**

```javascript
if (requestedTier > requester.subscriptionCeiling) {
  return error("Upgrade subscription to access Tier X");
}
```

**Example:**
- Free user (ceiling = 2) cannot request Tier 3
- Premium user (ceiling = 4) cannot request Tier 5

### Rule 4: Offering Requirement

**Must offer tier disclosure in exchange:**
- Default: Offer same tier as requested (fair exchange)
- Can offer higher tier (generous)
- Cannot offer lower tier than requested (unfair)

```javascript
if (offeredTier < requestedTier) {
  return error("You must offer at least Tier X in exchange");
}
```

### Rule 5: Recipient Autonomy

**Recipient has full control over response:**
- ✅ Accept and share exactly what was requested
- ✅ Share less than requested (more cautious)
- ✅ Share more than requested (more generous)
- ✅ Decline request entirely

**No auto-acceptance. Explicit decision required.**

---

## 3. Eligibility Requirements

### Requester Eligibility Check

```javascript
/**
 * Check if user can request details from another user
 * @param {String} requesterId - User requesting details
 * @param {String} recipientId - User receiving request
 * @param {Number} requestedTier - Tier being requested (2-5)
 * @returns {Object} { eligible: Boolean, reason: String }
 */
function canRequestDetails(requesterId, recipientId, requestedTier) {
  const requester = AppState.users.get(requesterId);
  const recipient = AppState.users.get(recipientId);

  if (!requester || !recipient) {
    return { eligible: false, reason: 'USER_NOT_FOUND' };
  }

  // Free users cannot request details
  if (requester.subscription === 'free') {
    return {
      eligible: false,
      reason: 'FREE_USERS_CANNOT_REQUEST',
      message: 'Upgrade to Premium to request more details from matches.'
    };
  }

  // Check valid tier range
  if (requestedTier < 2 || requestedTier > 5) {
    return { eligible: false, reason: 'INVALID_TIER' };
  }

  // Check if requester has completed the requested tier
  if (!requester.completedTiers.includes(requestedTier)) {
    return {
      eligible: false,
      reason: 'REQUESTER_TIER_NOT_COMPLETED',
      message: `You must complete Tier ${requestedTier} yourself before requesting it from others.`,
      completionRequired: requestedTier
    };
  }

  // Check subscription ceiling
  if (requestedTier > requester.subscriptionCeiling) {
    return {
      eligible: false,
      reason: 'SUBSCRIPTION_CEILING_EXCEEDED',
      message: `Tier ${requestedTier} requires ${getTierSubscriptionName(requestedTier)} subscription.`,
      upgradeRequired: getTierSubscriptionName(requestedTier)
    };
  }

  // Check if recipient has completed the requested tier
  if (!recipient.completedTiers.includes(requestedTier)) {
    return {
      eligible: false,
      reason: 'RECIPIENT_TIER_NOT_COMPLETED',
      message: `${recipient.displayName} has not completed Tier ${requestedTier} yet.`
    };
  }

  // Check relationship status
  const relationshipId = getRelationshipId(requesterId, recipientId);
  const relationship = AppState.relationships.get(relationshipId);

  if (!relationship) {
    return { eligible: false, reason: 'NO_RELATIONSHIP' };
  }

  // Must have accepted Show Interest
  if (relationship.showInterestStatus !== 'accepted') {
    return {
      eligible: false,
      reason: 'SHOW_INTEREST_NOT_ACCEPTED',
      message: 'You can only request details after connecting with this user.'
    };
  }

  // Check if already sharing at requested tier or higher
  const isUser1 = relationship.userId1 === requesterId;
  const currentlySharedByRecipient = isUser1
    ? relationship.sharedTierByUser2
    : relationship.sharedTierByUser1;

  if (currentlySharedByRecipient >= requestedTier) {
    return {
      eligible: false,
      reason: 'ALREADY_SHARED',
      message: `${recipient.displayName} is already sharing Tier ${currentlySharedByRecipient} with you.`
    };
  }

  // All checks passed
  return { eligible: true, reason: 'ELIGIBLE' };
}

/**
 * Get subscription name for tier
 * @param {Number} tier
 * @returns {String} Subscription name
 */
function getTierSubscriptionName(tier) {
  if (tier <= 2) return 'Free';
  if (tier <= 4) return 'Premium';
  return 'VIP';
}
```

---

## 4. Request Flow States

### Request State Machine

```
[no_request]
  ↓
  | Requester sends detail request
  ↓
[pending] (request sent, awaiting response)
  ↓
  ├─→ Recipient accepts → [accepted] → EDT updated
  ├─→ Recipient shares less → [partial_accepted] → EDT updated
  ├─→ Recipient shares more → [overdelivered] → EDT updated
  ├─→ Recipient declines → [declined] → No EDT change
  └─→ Requester cancels → [cancelled] → No EDT change

[accepted/partial/overdelivered]
  ↓
  | Request completed
  ↓
[no_request] (can send new request for higher tier)
```

### Request Object Structure

```javascript
/**
 * Detail request object (stored in relationship.detailRequests array)
 */
const DetailRequestSchema = {
  id: String,                   // UUID
  requesterId: String,          // User requesting details
  recipientId: String,          // User receiving request
  relationshipId: String,       // Parent relationship

  // Request parameters
  requestedTier: Number,        // Tier requested (2-5)
  offeredTier: Number,          // Tier offered in exchange

  // Response
  status: String,               // 'pending' | 'accepted' | 'declined' | 'cancelled'
  sharedTier: Number,           // What recipient actually shared (if accepted)
  responseMessage: String,      // Optional message from recipient

  // EDT impact
  previousEDT: Number,          // EDT before request
  newEDT: Number,               // EDT after acceptance (null if declined)

  // Timestamps
  createdAt: Date,             // When request was sent
  respondedAt: Date,           // When recipient responded
  expiresAt: Date,             // Request expires after 7 days (optional)

  // Metadata
  version: Number
};
```

---

## 5. Technical Implementation

### Send Detail Request

```javascript
/**
 * Send detail request from requester to recipient
 * @param {String} requesterId - User requesting details
 * @param {String} recipientId - User receiving request
 * @param {Number} requestedTier - Tier to request (2-5)
 * @param {Number} offeredTier - Tier to offer in exchange
 * @returns {Object} { success: Boolean, reason: String, data: Object }
 */
function sendDetailRequest(requesterId, recipientId, requestedTier, offeredTier) {
  // Validate eligibility
  const eligibility = canRequestDetails(requesterId, recipientId, requestedTier);

  if (!eligibility.eligible) {
    return {
      success: false,
      reason: eligibility.reason,
      message: eligibility.message,
      details: eligibility
    };
  }

  const requester = AppState.users.get(requesterId);
  const recipient = AppState.users.get(recipientId);

  // Validate offered tier
  if (offeredTier < requestedTier) {
    return {
      success: false,
      reason: 'OFFERED_TIER_TOO_LOW',
      message: `You must offer at least Tier ${requestedTier} in exchange.`
    };
  }

  if (offeredTier > requester.maxCompletedTier) {
    return {
      success: false,
      reason: 'OFFERED_TIER_NOT_COMPLETED',
      message: `You cannot offer Tier ${offeredTier} because you haven't completed it.`
    };
  }

  // Get relationship
  const relationshipId = getRelationshipId(requesterId, recipientId);
  const relationship = AppState.relationships.get(relationshipId);

  if (!relationship) {
    return { success: false, reason: 'NO_RELATIONSHIP' };
  }

  const now = new Date();

  // Calculate current EDT (before request)
  const previousEDT = calculateEDT(relationshipId);

  // Create detail request object
  const detailRequest = {
    id: generateUUID(),
    requesterId: requesterId,
    recipientId: recipientId,
    relationshipId: relationshipId,

    requestedTier: requestedTier,
    offeredTier: offeredTier,

    status: 'pending',
    sharedTier: null,
    responseMessage: null,

    previousEDT: previousEDT,
    newEDT: null,

    createdAt: now,
    respondedAt: null,
    expiresAt: null, // Optional: set expiry date (e.g., 7 days)

    version: 1
  };

  // Add to relationship's detail requests
  relationship.detailRequests.push(detailRequest);
  relationship.lastRequestAt = now;
  relationship.updatedAt = now;

  // Update requester's activity
  requester.lastActive = now;
  requester.updatedAt = now;

  // Log event
  logAuditEvent({
    eventType: 'detail_request_sent',
    requesterId: requesterId,
    recipientId: recipientId,
    relationshipId: relationshipId,
    requestedTier: requestedTier,
    offeredTier: offeredTier,
    requestId: detailRequest.id,
    timestamp: now
  });

  // Persist state
  persistState();

  // Trigger notification to recipient (in prototype, just log)
  console.log(`Detail request notification sent to ${recipient.email}`);

  return {
    success: true,
    reason: 'REQUEST_SENT',
    data: {
      requestId: detailRequest.id,
      recipientName: recipient.displayName,
      requestedTier: requestedTier,
      offeredTier: offeredTier,
      sentAt: now
    }
  };
}
```

### Accept Detail Request

```javascript
/**
 * Accept detail request (recipient response)
 * @param {String} recipientId - User accepting request
 * @param {String} requestId - Request ID
 * @param {Number} sharedTier - Tier to actually share (can be ≠ requested)
 * @param {String} responseMessage - Optional message to requester
 * @returns {Object} { success: Boolean, reason: String, data: Object }
 */
function acceptDetailRequest(recipientId, requestId, sharedTier, responseMessage = null) {
  // Find request
  let request = null;
  let relationship = null;

  AppState.relationships.forEach((rel) => {
    const found = rel.detailRequests.find(req => req.id === requestId);
    if (found) {
      request = found;
      relationship = rel;
    }
  });

  if (!request) {
    return { success: false, reason: 'REQUEST_NOT_FOUND' };
  }

  // Validate recipient
  if (request.recipientId !== recipientId) {
    return { success: false, reason: 'NOT_RECIPIENT' };
  }

  // Validate request status
  if (request.status !== 'pending') {
    return {
      success: false,
      reason: 'REQUEST_ALREADY_RESPONDED',
      currentStatus: request.status
    };
  }

  const recipient = AppState.users.get(recipientId);
  const requester = AppState.users.get(request.requesterId);

  if (!recipient || !requester) {
    return { success: false, reason: 'USER_NOT_FOUND' };
  }

  // Validate shared tier
  if (sharedTier < 1 || sharedTier > 5) {
    return { success: false, reason: 'INVALID_SHARED_TIER' };
  }

  if (sharedTier > recipient.maxCompletedTier) {
    return {
      success: false,
      reason: 'SHARED_TIER_NOT_COMPLETED',
      message: `You cannot share Tier ${sharedTier} because you haven't completed it.`
    };
  }

  const now = new Date();

  // Update request status
  request.status = 'accepted';
  request.sharedTier = sharedTier;
  request.responseMessage = responseMessage;
  request.respondedAt = now;

  // Update tier sharing in relationship
  const isUser1 = relationship.userId1 === recipientId;

  // Recipient updates their shared tier
  if (isUser1) {
    relationship.sharedTierByUser1 = Math.max(relationship.sharedTierByUser1, sharedTier);
  } else {
    relationship.sharedTierByUser2 = Math.max(relationship.sharedTierByUser2, sharedTier);
  }

  // Requester updates their shared tier (as promised in request)
  if (relationship.userId1 === request.requesterId) {
    relationship.sharedTierByUser1 = Math.max(relationship.sharedTierByUser1, request.offeredTier);
  } else {
    relationship.sharedTierByUser2 = Math.max(relationship.sharedTierByUser2, request.offeredTier);
  }

  // Recalculate EDT
  const newEDT = calculateEDT(relationship.id);
  request.newEDT = newEDT;

  // Update relationship metadata
  relationship.updatedAt = now;

  // Update user activity
  recipient.lastActive = now;
  requester.lastActive = now;

  // Add to EDT history
  relationship.edtHistory.push({
    edt: newEDT,
    previousEDT: request.previousEDT,
    timestamp: now,
    trigger: 'detail_request_accepted',
    details: {
      requestId: requestId,
      requestedTier: request.requestedTier,
      sharedTier: sharedTier,
      offeredTier: request.offeredTier
    }
  });

  // Log event
  logAuditEvent({
    eventType: 'detail_request_accepted',
    requesterId: request.requesterId,
    recipientId: recipientId,
    relationshipId: relationship.id,
    requestId: requestId,
    requestedTier: request.requestedTier,
    sharedTier: sharedTier,
    previousEDT: request.previousEDT,
    newEDT: newEDT,
    timestamp: now
  });

  // Persist state
  persistState();

  // Trigger notification to requester
  console.log(`Detail request acceptance notification sent to ${requester.email}`);

  return {
    success: true,
    reason: 'REQUEST_ACCEPTED',
    data: {
      requestId: requestId,
      requesterName: requester.displayName,
      sharedTier: sharedTier,
      previousEDT: request.previousEDT,
      newEDT: newEDT,
      acceptedAt: now
    }
  };
}
```

### Decline Detail Request

```javascript
/**
 * Decline detail request
 * @param {String} recipientId - User declining request
 * @param {String} requestId - Request ID
 * @param {String} declineReason - Optional reason for decline
 * @returns {Object} { success: Boolean, reason: String, data: Object }
 */
function declineDetailRequest(recipientId, requestId, declineReason = null) {
  // Find request
  let request = null;
  let relationship = null;

  AppState.relationships.forEach((rel) => {
    const found = rel.detailRequests.find(req => req.id === requestId);
    if (found) {
      request = found;
      relationship = rel;
    }
  });

  if (!request) {
    return { success: false, reason: 'REQUEST_NOT_FOUND' };
  }

  // Validate recipient
  if (request.recipientId !== recipientId) {
    return { success: false, reason: 'NOT_RECIPIENT' };
  }

  // Validate request status
  if (request.status !== 'pending') {
    return {
      success: false,
      reason: 'REQUEST_ALREADY_RESPONDED',
      currentStatus: request.status
    };
  }

  const recipient = AppState.users.get(recipientId);
  const requester = AppState.users.get(request.requesterId);

  if (!recipient || !requester) {
    return { success: false, reason: 'USER_NOT_FOUND' };
  }

  const now = new Date();

  // Update request status
  request.status = 'declined';
  request.responseMessage = declineReason;
  request.respondedAt = now;

  // No tier sharing update (declined)
  // No EDT change

  relationship.updatedAt = now;

  // Update user activity
  recipient.lastActive = now;

  // Log event
  logAuditEvent({
    eventType: 'detail_request_declined',
    requesterId: request.requesterId,
    recipientId: recipientId,
    relationshipId: relationship.id,
    requestId: requestId,
    requestedTier: request.requestedTier,
    declineReason: declineReason,
    timestamp: now
  });

  // Persist state
  persistState();

  // Trigger notification to requester (optional - can be silent decline)
  console.log(`Detail request declined by ${recipient.email}`);

  return {
    success: true,
    reason: 'REQUEST_DECLINED',
    data: {
      requestId: requestId,
      recipientName: recipient.displayName,
      declinedAt: now
    }
  };
}
```

### Cancel Detail Request

```javascript
/**
 * Cancel detail request (requester cancels before response)
 * @param {String} requesterId - User cancelling request
 * @param {String} requestId - Request ID
 * @returns {Object} { success: Boolean, reason: String }
 */
function cancelDetailRequest(requesterId, requestId) {
  // Find request
  let request = null;
  let relationship = null;

  AppState.relationships.forEach((rel) => {
    const found = rel.detailRequests.find(req => req.id === requestId);
    if (found) {
      request = found;
      relationship = rel;
    }
  });

  if (!request) {
    return { success: false, reason: 'REQUEST_NOT_FOUND' };
  }

  // Validate requester
  if (request.requesterId !== requesterId) {
    return { success: false, reason: 'NOT_REQUESTER' };
  }

  // Validate request status
  if (request.status !== 'pending') {
    return {
      success: false,
      reason: 'REQUEST_ALREADY_RESPONDED',
      currentStatus: request.status
    };
  }

  const now = new Date();

  // Update request status
  request.status = 'cancelled';
  request.respondedAt = now;

  relationship.updatedAt = now;

  // Log event
  logAuditEvent({
    eventType: 'detail_request_cancelled',
    requesterId: requesterId,
    recipientId: request.recipientId,
    relationshipId: relationship.id,
    requestId: requestId,
    timestamp: now
  });

  // Persist state
  persistState();

  console.log(`Detail request ${requestId} cancelled by requester`);

  return {
    success: true,
    reason: 'REQUEST_CANCELLED',
    data: {
      requestId: requestId,
      cancelledAt: now
    }
  };
}
```

---

## 6. EDT Update Logic

### EDT Recalculation After Acceptance

```javascript
/**
 * Calculate new EDT after detail request acceptance
 * This function is called within acceptDetailRequest
 *
 * @param {Object} relationship - Relationship object
 * @param {Object} request - Detail request object
 * @param {Number} sharedTier - Tier recipient is sharing
 * @returns {Number} New EDT
 */
function calculateEDTAfterRequest(relationship, request, sharedTier) {
  // Update shared tiers
  // Recipient shares sharedTier
  // Requester shares offeredTier (as promised)

  const user1 = AppState.users.get(relationship.userId1);
  const user2 = AppState.users.get(relationship.userId2);

  // Determine who is requester and recipient
  const isUser1Requester = relationship.userId1 === request.requesterId;

  let sharedByUser1, sharedByUser2;

  if (isUser1Requester) {
    // User1 is requester, User2 is recipient
    sharedByUser1 = Math.max(relationship.sharedTierByUser1, request.offeredTier);
    sharedByUser2 = Math.max(relationship.sharedTierByUser2, sharedTier);
  } else {
    // User2 is requester, User1 is recipient
    sharedByUser1 = Math.max(relationship.sharedTierByUser1, sharedTier);
    sharedByUser2 = Math.max(relationship.sharedTierByUser2, request.offeredTier);
  }

  // Calculate new EDT
  const newEDT = Math.min(
    user1.maxCompletedTier,
    user2.maxCompletedTier,
    sharedByUser1,
    sharedByUser2
  );

  return newEDT;
}
```

### EDT Progression Examples

**Example 1: Successful Fair Exchange**

```
Initial State:
- User A: Completed Tier 3, Shared Tier 2
- User B: Completed Tier 3, Shared Tier 2
- EDT = 2

Request:
- User A requests Tier 3, offers Tier 3
- User B accepts, shares Tier 3

New State:
- User A: Shared Tier 3
- User B: Shared Tier 3
- EDT = 3 (both now see Tier 1-3)
```

**Example 2: Recipient Shares Less**

```
Initial State:
- User A: Completed Tier 4, Shared Tier 2
- User B: Completed Tier 3, Shared Tier 2
- EDT = 2

Request:
- User A requests Tier 3, offers Tier 4 (generous)
- User B shares only Tier 2 (cautious, shares less than requested)

New State:
- User A: Shared Tier 4
- User B: Shared Tier 2 (unchanged)
- EDT = 2 (no change, User B didn't share higher tier)
```

**Example 3: Recipient Shares More**

```
Initial State:
- User A: Completed Tier 4, Shared Tier 2
- User B: Completed Tier 4, Shared Tier 2
- EDT = 2

Request:
- User A requests Tier 3, offers Tier 3
- User B shares Tier 4 (generous, shares more than requested)

New State:
- User A: Shared Tier 3
- User B: Shared Tier 4
- EDT = 3 (limited by User A's shared tier)
```

---

## 7. UI Components

### Request Details Modal

```html
<!-- Request Details Modal -->
<div class="modal request-details-modal">
  <div class="modal-content">
    <div class="modal-header">
      <h2>Request More Details from [RecipientName]</h2>
      <p class="subtitle">Exchange information to deepen your connection</p>
    </div>

    <div class="modal-body">
      <!-- Current EDT Status -->
      <div class="current-status">
        <h4>Current Status</h4>
        <p>You're both seeing Tier 1-[currentEDT] information</p>
        <div class="edt-meter">
          <div class="edt-fill" style="width: [currentEDT * 20]%"></div>
        </div>
      </div>

      <!-- Step 1: What to Request -->
      <div class="request-step">
        <h4>Step 1: What tier do you want to request?</h4>
        <div class="tier-options">
          <label *for="tier in availableTiers">
            <input
              type="radio"
              name="requestedTier"
              value="[tier.number]"
              [disabled]="!tier.eligible"
            >
            <div class="tier-card">
              <h5>Tier [tier.number]: [tier.name]</h5>
              <p class="tier-description">[tier.description]</p>
              <ul class="tier-fields-preview">
                <li *for="field in tier.fields">[field]</li>
              </ul>
              <span *if="!tier.eligible" class="tier-locked-reason">
                [tier.lockReason]
              </span>
            </div>
          </label>
        </div>
      </div>

      <!-- Step 2: What to Offer -->
      <div class="offer-step">
        <h4>Step 2: What tier will you share in return?</h4>
        <p class="fairness-note">
          ⚖️ Fair exchange: Offer the same tier you're requesting
        </p>
        <div class="tier-options">
          <label *for="tier in availableTiers">
            <input
              type="radio"
              name="offeredTier"
              value="[tier.number]"
              [disabled]="tier.number < selectedRequestedTier || !tier.completed"
            >
            <div class="tier-card-small">
              <span>Tier [tier.number]</span>
              <span *if="tier.number === selectedRequestedTier" class="badge-recommended">
                Recommended
              </span>
              <span *if="tier.number > selectedRequestedTier" class="badge-generous">
                Generous
              </span>
            </div>
          </label>
        </div>
      </div>

      <!-- Preview Impact -->
      <div class="impact-preview">
        <h4>Preview Impact</h4>
        <p>If accepted:</p>
        <ul>
          <li>You will share: <strong>Tier [selectedOfferedTier]</strong></li>
          <li>You will request: <strong>Tier [selectedRequestedTier]</strong></li>
          <li>New EDT will be: <strong>Tier [projectedNewEDT]</strong></li>
        </ul>
        <p class="impact-note">
          You will both see Tier 1-[projectedNewEDT] information from each other.
        </p>
      </div>

      <!-- Acknowledgment -->
      <label class="acknowledgment">
        <input type="checkbox" id="requestAcknowledge" required>
        I agree to share my Tier [selectedOfferedTier] information in exchange
      </label>
    </div>

    <div class="modal-footer">
      <button class="btn-secondary" onclick="closeRequestModal()">Cancel</button>
      <button
        class="btn-primary"
        id="sendRequestBtn"
        disabled
        onclick="confirmSendRequest()"
      >
        Send Request
      </button>
    </div>
  </div>
</div>

<script>
// Enable button only when acknowledgment checked
document.getElementById('requestAcknowledge').addEventListener('change', function() {
  document.getElementById('sendRequestBtn').disabled = !this.checked;
});
</script>
```

### Respond to Request Modal (Recipient View)

```html
<!-- Respond to Request Modal -->
<div class="modal respond-request-modal">
  <div class="modal-content">
    <div class="modal-header">
      <h2>[RequesterName] wants to exchange information</h2>
      <p class="subtitle">Review their request and decide what to share</p>
    </div>

    <div class="modal-body">
      <!-- Request Details -->
      <div class="request-summary">
        <h4>Their Request</h4>
        <div class="request-card">
          <p><strong>They're offering:</strong> Tier [offeredTier]</p>
          <p><strong>They're requesting:</strong> Tier [requestedTier]</p>
        </div>
      </div>

      <!-- Your Options -->
      <div class="response-options">
        <h4>Your Options</h4>

        <!-- Option 1: Share Exactly -->
        <label class="response-option">
          <input type="radio" name="responseType" value="exact" checked>
          <div class="option-card">
            <h5>✅ Share exactly what they requested (Tier [requestedTier])</h5>
            <p>Fair exchange. You both share the same tier.</p>
            <p class="edt-impact">New EDT: [projectedEDT]</p>
          </div>
        </label>

        <!-- Option 2: Share Less -->
        <label class="response-option">
          <input type="radio" name="responseType" value="less">
          <div class="option-card">
            <h5>⚖️ Share less (Tier [requestedTier - 1])</h5>
            <p>You're being cautious. Share lower tier information.</p>
            <select name="shareLessTier">
              <option *for="tier in lowerTiers" value="[tier]">Tier [tier]</option>
            </select>
            <p class="edt-impact">New EDT: [projectedLowerEDT]</p>
          </div>
        </label>

        <!-- Option 3: Share More -->
        <label class="response-option">
          <input type="radio" name="responseType" value="more">
          <div class="option-card">
            <h5>🎁 Share more (Tier [requestedTier + 1] or higher)</h5>
            <p>You're being generous. Share higher tier information.</p>
            <select name="shareMoreTier">
              <option *for="tier in higherTiers" value="[tier]">Tier [tier]</option>
            </select>
            <p class="edt-impact">New EDT: [projectedHigherEDT]</p>
          </div>
        </label>

        <!-- Option 4: Decline -->
        <label class="response-option">
          <input type="radio" name="responseType" value="decline">
          <div class="option-card option-decline">
            <h5>❌ Decline request</h5>
            <p>You prefer not to share more information at this time.</p>
            <p class="edt-impact">EDT remains: [currentEDT]</p>
          </div>
        </label>
      </div>

      <!-- Optional Message -->
      <div class="response-message">
        <label for="responseMessage">Optional message to [RequesterName]:</label>
        <textarea
          id="responseMessage"
          placeholder="Add a personal note (optional)"
          maxlength="500"
        ></textarea>
      </div>
    </div>

    <div class="modal-footer">
      <button class="btn-secondary" onclick="closeRespondModal()">Cancel</button>
      <button
        class="btn-primary"
        onclick="confirmResponse()"
      >
        Confirm Response
      </button>
    </div>
  </div>
</div>
```

---

## 8. Edge Cases

### Edge Case 1: Simultaneous Requests

**Scenario:** User A requests Tier 3 from User B. Before User B responds, User B requests Tier 3 from User A.

**Solution:**
- Both requests remain valid and pending
- Each user sees both requests in their "Pending Requests" section
- Either can respond independently
- When first request is accepted, EDT updates
- Second request may become obsolete if EDT already reached requested tier

```javascript
// Check if request is still relevant
function isRequestStillRelevant(requestId) {
  const request = findRequestById(requestId);
  if (!request) return false;

  const relationship = AppState.relationships.get(request.relationshipId);
  const currentEDT = calculateEDT(relationship.id);

  // If current EDT already includes requested tier, request is obsolete
  if (currentEDT >= request.requestedTier) {
    return false;
  }

  return true;
}
```

### Edge Case 2: User Downgrades Subscription After Request Sent

**Scenario:** Premium user requests Tier 3. Before recipient responds, requester downgrades to Free (ceiling = 2).

**Solution:**
- Request remains valid (was valid when sent)
- If accepted, EDT calculation will respect new ceiling
- Requester cannot view Tier 3 data despite acceptance
- System shows upgrade prompt to requester

### Edge Case 3: Recipient Completes Higher Tier After Request

**Scenario:** User A requests Tier 3 from User B. User B completes Tier 4 while request is pending.

**Solution:**
- User B can now respond with Tier 3 or 4 (expanded options)
- UI updates recipient's response modal to include new tier option
- User B's generosity is rewarded with flexibility

### Edge Case 4: Multiple Pending Requests

**Scenario:** User A sends multiple tier requests to User B before any are responded to.

**Solution:**
- Allow maximum 1 pending request per relationship
- New request replaces previous pending request (with confirmation)
- Prevents request spam

```javascript
// Check for pending requests before sending new one
function hasPendingRequest(relationshipId, requesterId) {
  const relationship = AppState.relationships.get(relationshipId);
  if (!relationship) return false;

  return relationship.detailRequests.some(
    req => req.status === 'pending' && req.requesterId === requesterId
  );
}
```

---

## 9. Negotiation Scenarios

### Scenario 1: Progressive Disclosure (Successful Negotiation)

**Initial State:**
- User A: Completed Tier 4, Shared Tier 1
- User B: Completed Tier 3, Shared Tier 1
- EDT = 1

**Step 1:**
- User A requests Tier 2, offers Tier 2
- User B accepts, shares Tier 2
- New EDT = 2

**Step 2:**
- User A requests Tier 3, offers Tier 3
- User B accepts, shares Tier 3
- New EDT = 3

**Outcome:** Successful progressive disclosure through mutual negotiation.

### Scenario 2: Asymmetric Completion (Blocked Negotiation)

**Initial State:**
- User A: Completed Tier 4 (Premium)
- User B: Completed Tier 2 (Free)
- EDT = 2

**Attempt:**
- User A requests Tier 3 from User B
- ❌ **Blocked** — User B hasn't completed Tier 3 (requires Premium)

**Resolution:**
- User B must upgrade to Premium and complete Tier 3
- Then User A can request Tier 3 successfully

### Scenario 3: Cautious Recipient (Partial Acceptance)

**Initial State:**
- User A: Completed Tier 4, Shared Tier 2
- User B: Completed Tier 4, Shared Tier 2
- EDT = 2

**Request:**
- User A requests Tier 4, offers Tier 4 (maximum transparency)

**Response:**
- User B feels uncomfortable, shares only Tier 3 (less than requested)

**New State:**
- User A: Shared Tier 4
- User B: Shared Tier 3
- EDT = 3 (limited by User B's caution)

**Outcome:** User A offered full transparency but received partial. EDT still progressed, but not to maximum.

### Scenario 4: Generous Recipient (Over-delivery)

**Initial State:**
- User A: Completed Tier 3, Shared Tier 2
- User B: Completed Tier 4, Shared Tier 2
- EDT = 2

**Request:**
- User A requests Tier 3, offers Tier 3

**Response:**
- User B shares Tier 4 (more than requested, generous)

**New State:**
- User A: Shared Tier 3
- User B: Shared Tier 4
- EDT = 3 (limited by User A's completion, cannot see Tier 4 yet)

**Outcome:** User B was generous, but User A cannot view Tier 4 until completing it themselves.

---

## 10. Testing Strategy

### Test Suite: Request Details Flow

```javascript
describe('Request Details Flow', () => {
  test('Free user cannot request details', () => {
    const user1 = createUser({ email: 'free@example.com', subscription: 'free' });
    const user2 = createUser({ email: 'premium@example.com', subscription: 'premium' });

    completeTier(user1.id, 1, { /* tier 1 */ });
    completeTier(user2.id, 1, { /* tier 1 */ });

    const eligibility = canRequestDetails(user1.id, user2.id, 2);
    expect(eligibility.eligible).toBe(false);
    expect(eligibility.reason).toBe('FREE_USERS_CANNOT_REQUEST');
  });

  test('Cannot request tier not completed', () => {
    const user1 = createUser({ email: 'premium1@example.com', subscription: 'premium' });
    const user2 = createUser({ email: 'premium2@example.com', subscription: 'premium' });

    completeTier(user1.id, 1, { /* tier 1 */ });
    completeTier(user1.id, 2, { /* tier 2 */ });
    completeTier(user2.id, 1, { /* tier 1 */ });
    completeTier(user2.id, 2, { /* tier 2 */ });
    completeTier(user2.id, 3, { /* tier 3 */ });

    // User1 wants Tier 3 but hasn't completed it
    const eligibility = canRequestDetails(user1.id, user2.id, 3);
    expect(eligibility.eligible).toBe(false);
    expect(eligibility.reason).toBe('REQUESTER_TIER_NOT_COMPLETED');
  });

  test('Successful detail request and acceptance', () => {
    const user1 = createUser({ email: 'premium1@example.com', subscription: 'premium' });
    const user2 = createUser({ email: 'premium2@example.com', subscription: 'premium' });

    // Complete tiers
    completeTier(user1.id, 1, { /* tier 1 */ });
    completeTier(user1.id, 2, { /* tier 2 */ });
    completeTier(user1.id, 3, { /* tier 3 */ });

    completeTier(user2.id, 1, { /* tier 1 */ });
    completeTier(user2.id, 2, { /* tier 2 */ });
    completeTier(user2.id, 3, { /* tier 3 */ });

    // Establish relationship
    const rel = getOrCreateRelationship(user1.id, user2.id);
    rel.showInterestStatus = 'accepted';
    rel.messagesUnlocked = true;

    // Send request
    const requestResult = sendDetailRequest(user1.id, user2.id, 3, 3);
    expect(requestResult.success).toBe(true);

    const requestId = requestResult.data.requestId;

    // Accept request
    const acceptResult = acceptDetailRequest(user2.id, requestId, 3);
    expect(acceptResult.success).toBe(true);
    expect(acceptResult.data.newEDT).toBe(3);

    // Verify EDT updated
    const newEDT = calculateEDT(rel.id);
    expect(newEDT).toBe(3);
  });

  test('Recipient shares less than requested', () => {
    const user1 = createUser({ email: 'premium1@example.com', subscription: 'premium' });
    const user2 = createUser({ email: 'premium2@example.com', subscription: 'premium' });

    // Complete tiers
    completeTier(user1.id, 1, { /* tier 1 */ });
    completeTier(user1.id, 2, { /* tier 2 */ });
    completeTier(user1.id, 3, { /* tier 3 */ });

    completeTier(user2.id, 1, { /* tier 1 */ });
    completeTier(user2.id, 2, { /* tier 2 */ });
    completeTier(user2.id, 3, { /* tier 3 */ });

    const rel = getOrCreateRelationship(user1.id, user2.id);
    rel.showInterestStatus = 'accepted';

    // User1 requests Tier 3, offers Tier 3
    const requestResult = sendDetailRequest(user1.id, user2.id, 3, 3);
    const requestId = requestResult.data.requestId;

    // User2 shares only Tier 2 (less than requested)
    const acceptResult = acceptDetailRequest(user2.id, requestId, 2);
    expect(acceptResult.success).toBe(true);

    // EDT should be 2 (limited by User2's sharing)
    const newEDT = calculateEDT(rel.id);
    expect(newEDT).toBe(2);
  });

  test('Recipient shares more than requested', () => {
    const user1 = createUser({ email: 'premium1@example.com', subscription: 'premium' });
    const user2 = createUser({ email: 'premium2@example.com', subscription: 'premium' });

    // Complete tiers
    completeTier(user1.id, 1, { /* tier 1 */ });
    completeTier(user1.id, 2, { /* tier 2 */ });
    completeTier(user1.id, 3, { /* tier 3 */ });

    completeTier(user2.id, 1, { /* tier 1 */ });
    completeTier(user2.id, 2, { /* tier 2 */ });
    completeTier(user2.id, 3, { /* tier 3 */ });
    completeTier(user2.id, 4, { /* tier 4 */ });

    const rel = getOrCreateRelationship(user1.id, user2.id);
    rel.showInterestStatus = 'accepted';

    // User1 requests Tier 3, offers Tier 3
    const requestResult = sendDetailRequest(user1.id, user2.id, 3, 3);
    const requestId = requestResult.data.requestId;

    // User2 shares Tier 4 (more than requested, generous)
    const acceptResult = acceptDetailRequest(user2.id, requestId, 4);
    expect(acceptResult.success).toBe(true);

    // EDT should be 3 (limited by User1's completion)
    const newEDT = calculateEDT(rel.id);
    expect(newEDT).toBe(3);
  });

  test('Decline detail request does not change EDT', () => {
    const user1 = createUser({ email: 'premium1@example.com', subscription: 'premium' });
    const user2 = createUser({ email: 'premium2@example.com', subscription: 'premium' });

    completeTier(user1.id, 1, { /* tier 1 */ });
    completeTier(user1.id, 2, { /* tier 2 */ });
    completeTier(user1.id, 3, { /* tier 3 */ });

    completeTier(user2.id, 1, { /* tier 1 */ });
    completeTier(user2.id, 2, { /* tier 2 */ });
    completeTier(user2.id, 3, { /* tier 3 */ });

    const rel = getOrCreateRelationship(user1.id, user2.id);
    rel.showInterestStatus = 'accepted';

    const initialEDT = calculateEDT(rel.id);

    // User1 requests Tier 3
    const requestResult = sendDetailRequest(user1.id, user2.id, 3, 3);
    const requestId = requestResult.data.requestId;

    // User2 declines
    const declineResult = declineDetailRequest(user2.id, requestId, "Not ready yet");
    expect(declineResult.success).toBe(true);

    // EDT should remain unchanged
    const newEDT = calculateEDT(rel.id);
    expect(newEDT).toBe(initialEDT);
  });
});
```

---

## Related Documentation

- [State Management](state_management.md) - Core state models
- [EDT Specification](../Global%20Context/edt_specification.md) - EDT calculation rules
- [Tier System](../Global%20Context/tier_system.md) - Tier definitions
- [Show Interest Flow](show_interest_flow.md) - Show Interest prerequisites

---

**Document Owner:** Engineering Lead
**Technical Reviewer:** Senior Backend Engineer
**Last Reviewed:** 2026-02-26
**Next Review:** 2026-05-26 (Quarterly)
