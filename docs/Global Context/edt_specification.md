# Effective Disclosure Tier (EDT) — Complete Specification

**Version:** 1.0.0
**Last Updated:** 2026-02-26
**Status:** Complete - Technical Reference

---

## Overview

The **Effective Disclosure Tier (EDT)** is the cornerstone of JoyMatcher's trust-based architecture. It enforces reciprocal transparency by ensuring users can only view information they've disclosed themselves.

**Core Principle:**
> **EDT = the lowest fully completed and shared tier between two users.**

---

## 1. Canonical Definition

### Mathematical Formula

```javascript
EDT = Math.min(
  userA.maxCompletedTier,    // Highest tier User A has completed
  userB.maxCompletedTier,    // Highest tier User B has completed
  sharedTierByUserA,          // Tier User A has shared with User B
  sharedTierByUserB           // Tier User B has shared with User A
)
```

### Plain Language

The EDT between two users is determined by four values:
1. What User A has completed
2. What User B has completed
3. What User A has chosen to share with User B
4. What User B has chosen to share with User A

**The lowest of these four values becomes the EDT.**

---

## 2. Why EDT Matters

### Prevents Exploitation
- Users cannot view information they haven't disclosed themselves
- No "free-riding" on others' transparency
- Reciprocal vulnerability builds trust

### Enforces Fairness
- Both users see the same depth of information from each other
- Asymmetry is impossible by design
- Revocation affects both parties equally

### Protects Privacy
- Higher-tier data automatically hidden if EDT is lower
- One-to-one sharing (pairwise relationships)
- Revocable at any time

---

## 3. EDT Calculation Examples

### Example 1: Basic Symmetric Sharing

**User A:**
- Completed Tier: 3
- Shared with User B: 3

**User B:**
- Completed Tier: 3
- Shared with User A: 3

**EDT Calculation:**
```
EDT = Math.min(3, 3, 3, 3) = 3
```

**Result:**
- Both users see Tier 1-3 information from each other
- ✅ Perfect reciprocity

---

### Example 2: Asymmetric Completion

**User A (Premium):**
- Completed Tier: 4
- Shared with User B: 4

**User B (Free):**
- Completed Tier: 2
- Shared with User A: 2

**EDT Calculation:**
```
EDT = Math.min(4, 2, 4, 2) = 2
      (User B's max completed tier is the lowest)
```

**Result:**
- Both users see **only Tier 1-2** from each other
- User A's Tier 3-4 disclosure is "wasted" until User B upgrades
- ✅ System enforces that User B cannot see Tier 3-4 (hasn't completed it)

**Key Insight:** User A can share Tier 4, but User B cannot see it because User B hasn't completed Tier 4 themselves.

---

### Example 3: Cautious Sharing

**User A:**
- Completed Tier: 4
- Shared with User B: **2** (being cautious, not sharing full depth yet)

**User B:**
- Completed Tier: 3
- Shared with User A: 3

**EDT Calculation:**
```
EDT = Math.min(4, 3, 2, 3) = 2
      (User A's shared tier limits it)
```

**Result:**
- Both users see **only Tier 1-2** from each other
- Even though User B shared Tier 3, User A's sharing limit of Tier 2 constrains the EDT
- ✅ User B doesn't get rewarded for sharing more than User A (fairness)

---

### Example 4: Progressive Unlocking (Negotiation)

**Initial State:**
- User A: Completed 3, Shared 2
- User B: Completed 2, Shared 2
- **EDT = 2**

**User A requests Tier 3 from User B, offering Tier 3 in exchange.**

**User B's options:**
1. Decline (EDT stays 2)
2. Accept but can't (User B hasn't completed Tier 3 yet)
3. Upgrade to Premium, complete Tier 3, then accept

**If User B chooses option 3:**
- User B completes Tier 3, shares Tier 3 with User A
- User A shares Tier 3 with User B (as promised)
- **New EDT = 3**

**Result:**
- Both users now see Tier 1-3 from each other
- ✅ Successful negotiation through reciprocal completion and sharing

---

### Example 5: Subscription Ceiling Blocks EDT

**User A (Premium):**
- Completed Tier: 4
- Shared with User B: 4

**User B (Free - subscription ceiling = Tier 2):**
- Completed Tier: 2
- Shared with User A: 2
- **Cannot complete Tier 3+** (requires Premium)

**EDT Calculation:**
```
EDT = Math.min(4, 2, 4, 2) = 2
```

**Result:**
- Both see only Tier 1-2
- User B sees upgrade prompt: "Upgrade to Premium to unlock Tier 3-4 and view this user's deeper information"
- ✅ Subscription ceiling enforced through EDT

---

### Example 6: Revocation (Instant and Symmetric)

**Current State:**
- User A: Completed 4, Shared 4
- User B: Completed 4, Shared 4
- **EDT = 4** (both seeing Tier 1-4)

**User A feels uncomfortable, revokes Tier 4, downgrades to Tier 2.**

**System Actions (Instant):**
1. User A's Tier 3-4 data hidden from User B
2. User B's Tier 3-4 data hidden from User A (symmetric revocation)
3. **New EDT = 2**
4. Both users notified: "Disclosure level adjusted. EDT is now 2."

**Result:**
- Both users now see only Tier 1-2 from each other
- ✅ Revocation is instant, symmetric, and fair
- Neither user retains access to higher-tier data

**Important:** User B didn't choose to revoke, but was affected symmetrically (fairness principle).

---

### Example 7: VIP to Free Interaction

**User A (VIP):**
- Completed Tier: 5
- Shared with User B: 5
- Tier 5 verified badge visible

**User B (Free):**
- Completed Tier: 2
- Shared with User A: 2

**EDT Calculation:**
```
EDT = Math.min(5, 2, 5, 2) = 2
```

**Result:**
- **Both see only Tier 1-2** from each other
- VIP User A sees very limited information from Free User B
- Free User B cannot see VIP User A's Tier 3-5 data
- **However:** User A's Tier 5 verified badge is still visible (public trust signal)

**Key Insight:** VIP status doesn't bypass EDT. VIP users are bound by the same reciprocity rules.

**Tier Awareness Warning (shown to VIP before sending Show Interest to Free user):**
> ⚠️ **VIP to Free Interaction Warning**
>
> This user has only completed Tier 2 and is on the Free plan.
>
> **You will see VERY limited information:**
> - Tier 1 only: Identity & Intent
> - No lifestyle data (Tier 2) unless you explicitly request and they share
> - No Tier 3-5 data available until they upgrade to Premium
>
> **Consider:**
> - Free users cannot request details from you
> - They may not be as invested as Premium/VIP users
> - Tier ceiling limits their transparency capacity
>
> [Proceed with Show Interest] [Cancel]

---

## 4. EDT Edge Cases

### Edge Case 1: One User Has Not Shared Anything

**User A:**
- Completed Tier: 3
- Shared with User B: 0 (hasn't shared yet)

**User B:**
- Completed Tier: 3
- Shared with User A: 3

**EDT Calculation:**
```
EDT = Math.min(3, 3, 0, 3) = 0
```

**Result:**
- **No information visible** between users (EDT = 0)
- User B sees only User A's Tier 1 public information
- User A cannot see User B's Tier 3 data despite User B sharing it

**Resolution:** User A must share at least Tier 1 to unlock any EDT.

---

### Edge Case 2: Subscription Mismatch Limiting EDT

**User A (VIP):**
- Completed Tier: 5
- Subscript ceiling: Tier 5
- Shared with User B: 5

**User B (Premium):**
- Completed Tier: 4
- Subscription ceiling: Tier 4 (cannot complete Tier 5 without VIP)
- Shared with User A: 4

**EDT Calculation:**
```
EDT = Math.min(5, 4, 5, 4) = 4
```

**Result:**
- Both see Tier 1-4 from each other
- User A's Tier 5 data invisible to User B (User B hasn't completed Tier 5)
- ✅ Subscription ceiling respected through EDT

---

### Edge Case 3: Partial Revocation During Conversation

**Current State:**
- Both users at EDT = 4 (actively messaging about marriage plans)

**User A revokes Tier 4, downgrades to Tier 3.**

**System Actions:**
1. Immediately hides Tier 4 data from both users
2. New EDT = 3
3. Conversation continues, but health/compatibility data vanishes

**UI Impact:**
- Tier 4 fields on profile replaced with: "🔒 Tier 4 information no longer shared"
- Previous messages referencing Tier 4 data remain visible (conversation history preserved)
- Users can still discuss Tier 1-3 information

**Notification to User B:**
> "User A has adjusted their disclosure level. You both now see Tier 1-3 information. Tier 4 data is no longer visible."

---

### Edge Case 4: Both Users Revoke Simultaneously

**Current State:**
- EDT = 3

**User A and User B both revoke Tier 3 at nearly the same time (within seconds).**

**System Actions:**
1. Process revocations in timestamp order
2. First revocation: EDT → 2, hide Tier 3 from both
3. Second revocation: EDT already 2, no change
4. Log both revocations

**Result:**
- EDT = 2 (final state)
- Both revocations honored, symmetric effect maintained

---

## 5. EDT State Management (Technical Implementation)

### Data Model

```javascript
// Relationship model between two users
const Relationship = {
  userId1: ObjectId,
  userId2: ObjectId,

  // Tier completion status (cached for performance)
  user1MaxCompletedTier: 3,
  user2MaxCompletedTier: 4,

  // Shared tiers (one-to-one, pairwise)
  sharedTierByUser1: 3,  // What User 1 has shared with User 2
  sharedTierByUser2: 3,  // What User 2 has shared with User 1

  // Calculated EDT (cached, recalculated on change)
  edt: 3,

  // Audit trail
  edtHistory: [
    { edt: 2, timestamp: "2026-02-01T10:00:00Z", trigger: "tier_completed" },
    { edt: 3, timestamp: "2026-02-15T14:30:00Z", trigger: "details_requested_accepted" }
  ],

  // Revocation log
  revocations: [
    {
      revokedBy: "user1_id",
      previousTier: 4,
      newTier: 3,
      timestamp: "2026-02-20T09:00:00Z",
      reason: "user_initiated"
    }
  ],

  // Show Interest status
  showInterestStatus: "accepted", // none | sent | accepted | declined | cooldown

  // Messaging
  messagesUnlocked: true,

  // Timestamps
  createdAt: Date,
  lastUpdatedAt: Date
};
```

---

### EDT Recalculation Triggers

EDT must be recalculated whenever:

1. **User completes a new tier**
   - Example: User B completes Tier 3 → EDT may increase

2. **User shares or updates shared tier**
   - Example: User A upgrades from sharing Tier 2 to Tier 3 → EDT may increase

3. **User revokes tier access**
   - Example: User A downgrades from Tier 4 to Tier 2 → EDT decreases

4. **Subscription changes affect tier ceiling**
   - Example: User B downgrades from Premium to Free → maxCompletedTier capped at 2 → EDT may decrease

---

### EDT Calculation Function (JavaScript)

```javascript
function calculateEDT(relationship) {
  const user1 = getUserById(relationship.userId1);
  const user2 = getUserById(relationship.userId2);

  // Get max completed tier for each user
  const user1MaxTier = Math.max(...user1.completedTiers);
  const user2MaxTier = Math.max(...user2.completedTiers);

  // Get shared tiers
  const shared1 = relationship.sharedTierByUser1;
  const shared2 = relationship.sharedTierByUser2;

  // Calculate EDT (lowest of 4 values)
  const edt = Math.min(user1MaxTier, user2MaxTier, shared1, shared2);

  // Update relationship if EDT changed
  if (edt !== relationship.edt) {
    relationship.edt = edt;
    relationship.lastUpdatedAt = new Date();

    // Log EDT change
    relationship.edtHistory.push({
      edt: edt,
      timestamp: new Date(),
      trigger: "recalculated"
    });

    // Save to database
    await relationship.save();

    // Notify both users
    notifyUsers(user1, user2, `EDT updated to ${edt}`);
  }

  return edt;
}
```

---

### Real-Time EDT Enforcement (Query Filter)

When User A views User B's profile, the system must filter visible data by EDT:

```javascript
function getVisibleProfileData(viewerId, profileOwnerId) {
  // Get relationship
  const relationship = await Relationship.findOne({
    $or: [
      { userId1: viewerId, userId2: profileOwnerId },
      { userId1: profileOwnerId, userId2: viewerId }
    ]
  });

  // Calculate current EDT
  const edt = calculateEDT(relationship);

  // Get profile owner's data
  const profileOwner = await User.findById(profileOwnerId);

  // Filter tier data by EDT
  const visibleData = {
    tier1: edt >= 1 ? profileOwner.tierData.tier1 : null,
    tier2: edt >= 2 ? profileOwner.tierData.tier2 : null,
    tier3: edt >= 3 ? profileOwner.tierData.tier3 : null,
    tier4: edt >= 4 ? profileOwner.tierData.tier4 : null,
    tier5: edt >= 5 ? profileOwner.tierData.tier5 : null
  };

  // Always show Tier 5 badge (public trust signal)
  if (profileOwner.tier5Verified) {
    visibleData.tier5Badge = true; // Badge visible, KYC details not
  }

  return {
    ...visibleData,
    currentEDT: edt,
    maxPossibleEDT: Math.min(
      Math.max(...viewer.completedTiers),
      Math.max(...profileOwner.completedTiers)
    )
  };
}
```

---

## 6. EDT UI Indicators

### Profile View EDT Status Banner

**At top of every profile view:**

```
┌──────────────────────────────────────────────────────────┐
│ ℹ️ You're both seeing Tier 3 information                │
│                                                          │
│ EDT (Effective Disclosure Tier) = 3                     │
│                                                          │
│ What this means:                                         │
│ ✅ You see Tier 1-3 from this user                      │
│ 🔒 Tier 4-5 information is locked                       │
│                                                          │
│ To unlock more:                                          │
│ • Complete higher tiers yourself                        │
│ • Request more details (if Premium/VIP)                 │
│                                                          │
│ [Request More Details]                                   │
└──────────────────────────────────────────────────────────┘
```

---

### EDT Progress Indicator

Visual representation of EDT on profile cards:

```
User A (You): ●●●●○ (Tier 4 completed)
User B (Them): ●●●○○ (Tier 3 completed)
━━━━━━━━━━━━━━━━━━━━━━
EDT:          ●●●○○ (Tier 3)

Legend:
● = Tier completed and shared
○ = Tier locked or not shared
```

---

### Locked Tier Sections (On Profile)

**Tier 3 Section (When EDT < 3):**

```
┌──────────────────────────────────────────────────────────┐
│ 🔒 Relationship & Family Readiness (Tier 3)              │
│                                                          │
│ This information is locked.                              │
│                                                          │
│ Why? This user has completed Tier 3, but:               │
│ • You have not completed Tier 3 yourself, OR            │
│ • They have not shared Tier 3 with you yet              │
│                                                          │
│ What you'll unlock:                                      │
│ • Marital history and children status                   │
│ • Marriage timeline expectations                        │
│ • Family involvement preferences                        │
│ • Family-related deal-breakers                          │
│                                                          │
│ [Complete Tier 3 Now] [Request Tier 3]                  │
└──────────────────────────────────────────────────────────┘
```

---

## 7. EDT and Show Interest Flow

### Before Sending Show Interest

**Tier Awareness Warning** displays current EDT projection:

```
You're about to send Show Interest to:
[User Name], 32, Premium Member

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
⚠️ TIER AWARENESS

This user has completed: Tier 3
You have completed: Tier 2

If they accept, you will see:
✅ Tier 1 information (Identity & Intent)
✅ Tier 2 information (Lifestyle)
🔒 Tier 3 information (locked - you haven't completed it)

Current EDT projection: 2
Maximum possible EDT (if you both complete all tiers): 3

To unlock Tier 3:
1. Upgrade to Premium (if Free)
2. Complete Tier 3 yourself
3. Request Tier 3 from this user

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

☑️ I understand the tier limitations

[Send Show Interest] [Cancel]
```

This warning manages expectations **before** interaction begins.

---

## 8. EDT and Request Details Flow

### Request Details Modal (Premium/VIP Only)

**User A (Tier 4 complete) wants to request Tier 3 from User B (Tier 3 complete):**

```
┌──────────────────────────────────────────────────────────┐
│ Request More Details from [User Name]                    │
│                                                          │
│ Current EDT: 2                                           │
│                                                          │
│ Step 1: What tier do you want to request?               │
│ ◯ Tier 2 (Lifestyle)                                    │
│ ● Tier 3 (Relationship & Family)                        │
│ ◯ Tier 4 (Health & Compatibility)                       │
│                                                          │
│ Step 2: What tier will you share in return?             │
│ ◯ Tier 2                                                │
│ ● Tier 3 (Recommended for fair exchange)               │
│ ◯ Tier 4                                                │
│                                                          │
│ Preview Impact:                                          │
│ If accepted:                                             │
│ • You will share: Tier 3                                │
│ • You will request: Tier 3                              │
│ • New EDT will be: 3                                    │
│                                                          │
│ ☑️ I agree to share my Tier 3 information               │
│                                                          │
│ [Send Request] [Cancel]                                 │
└──────────────────────────────────────────────────────────┘
```

---

### User B Receives Request

```
┌──────────────────────────────────────────────────────────┐
│ [User Name] wants to exchange information with you       │
│                                                          │
│ They're offering: Tier 3                                 │
│ They're requesting: Tier 3                               │
│                                                          │
│ Your options:                                            │
│ ● Share exactly what they requested (Tier 3)            │
│ ◯ Share less (Tier 2)                                   │
│ ◯ Share more (Tier 4)                                   │
│ ◯ Decline request                                       │
│                                                          │
│ Impact Preview:                                          │
│ If you share Tier 3:                                     │
│ • New EDT: 3                                            │
│ • You will see their: Tier 1-3                          │
│ • They will see your: Tier 1-3                          │
│                                                          │
│ [Accept & Share] [Decline]                              │
└──────────────────────────────────────────────────────────┘
```

---

## 9. EDT Audit Logging

### Every EDT Change Must Be Logged

**Audit Log Entry Example:**

```javascript
{
  eventType: "edt_updated",
  relationshipId: "rel_12345",
  userId1: "user_A_id",
  userId2: "user_B_id",

  // EDT values
  previousEDT: 2,
  newEDT: 3,

  // Trigger
  trigger: "details_request_accepted",
  triggerDetails: {
    requestedBy: "user_A_id",
    requestedTier: 3,
    offeredTier: 3,
    acceptedBy: "user_B_id",
    sharedTier: 3
  },

  // Timestamp
  timestamp: "2026-02-26T10:30:00Z",

  // Snapshot of state
  snapshot: {
    user1CompletedTiers: [1, 2, 3, 4],
    user2CompletedTiers: [1, 2, 3],
    sharedTierByUser1: 3,
    sharedTierByUser2: 3
  }
}
```

### Why Audit Logging Matters
- Dispute resolution (if users claim asymmetry)
- Debugging EDT calculation issues
- Analytics (track EDT progression patterns)
- Compliance (GDPR requires transparency logs)

---

## 10. EDT Performance Optimization

### Caching Strategy

**Problem:** Calculating EDT on every profile view is expensive (4 database queries).

**Solution:** Cache EDT in the Relationship model, recalculate only on triggers.

```javascript
// Cached EDT in Relationship model
{
  edt: 3,  // Cached value
  lastRecalculated: "2026-02-26T10:30:00Z"
}

// Recalculate only when:
// 1. User completes new tier
// 2. User shares/revokes tier
// 3. Subscription changes
```

**Trade-off:** Slight delay in EDT update (eventual consistency) vs. real-time performance.

**Mitigation:** Recalculate EDT in background job within 1-2 seconds of trigger event.

---

## 11. EDT Testing Scenarios

### Unit Tests Required

1. **Symmetric Completion and Sharing**
   - Both users complete and share Tier 3 → EDT = 3

2. **Asymmetric Completion**
   - User A (Tier 4), User B (Tier 2) → EDT = 2

3. **Cautious Sharing**
   - User A completes Tier 4 but shares only Tier 2 → EDT limited by sharing

4. **Subscription Ceiling**
   - Free user cannot push EDT above 2 (ceiling)

5. **Revocation Symmetry**
   - User A revokes Tier 4 → Both users lose Tier 4 access

6. **Progressive Unlocking**
   - User B completes Tier 3 mid-relationship → EDT increases from 2 to 3

7. **Zero Sharing Edge Case**
   - User A hasn't shared anything → EDT = 0

8. **VIP to Free Interaction**
   - VIP (Tier 5) to Free (Tier 2) → EDT = 2

---

## 12. Related Documentation

- [Tier System](tier_system.md) - Master tier specification
- [Request Details Flow](../Technical%20Specifications/request_details_flow.md) - Technical implementation
- [State Management](../Technical%20Specifications/state_management.md) - Data models

---

**Document Owner:** Engineering Lead
**Technical Reviewer:** Senior Backend Engineer
**Last Reviewed:** 2026-02-26
**Next Review:** 2026-05-26 (Quarterly)
