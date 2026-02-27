---
name: Tier System Enforcement
description: Implement and enforce JoyMatcher's progressive disclosure 5-tier system with sequential completion, subscription ceilings, and tier sharing rules.
---

# Tier System Enforcement Skill

## Goal

Correctly implement JoyMatcher's 5-tier progressive disclosure system, enforcing sequential completion, subscription-based tier ceilings, and preventing users from sharing incomplete tiers.

## When to Trigger

- Building tier completion forms/workflows
- Implementing profile views with tier sections
- Creating upgrade prompts
- Handling tier sharing UI
- Validating tier requests

## Core Knowledge

### 5-Tier System

**Tier 1: Basic Information**
- Name, age, location, occupation

**Tier 2: Lifestyle & Values**
- Faith, hobbies, habits, smoking/drinking

**Tier 3: Family & Future**
- Marriage vision, children, relocation willingness

**Tier 4: Past & Personality**
- Relationship history, deal-breakers, communication style

**Tier 5: Verification (VIP only)**
- Government ID + Video KYC

## Instructions

### Rule 1: Sequential Completion Only

```javascript
// MUST complete tiers in order (1 → 2 → 3 → 4 → 5)
if (attemptedTier > currentUser.completedTier + 1) {
  throw new Error('Complete tiers sequentially');
}
```

**Why:** Prevents cherry-picking easy questions and skipping hard ones.

### Rule 2: Cannot Share Incomplete Tier

```javascript
// Cannot share a tier you haven't completed
if (sharedTier > completedTier) {
  throw new Error('Cannot share incomplete tier');
}
```

**Why:** Prevents promising depth you don't have.

### Rule 3: Subscription Ceiling

```javascript
// Subscription limits max tier completion
const ceilings = {
  free: 2,      // Can only complete Tier 1-2
  premium: 4,   // Can only complete Tier 1-4
  vip: 5        // Can complete all tiers including verification
};

if (attemptedTier > ceilings[user.subscription]) {
  throw new Error('Subscription tier ceiling reached');
}
```

**Why:** Investment demonstrates seriousness.

## Implementation Pattern

### Tier Completion Form

```javascript
function TierCompletionForm({ tier, user }) {
  // Check if user can complete this tier
  if (tier > user.completedTier + 1) {
    return <LockedMessage>Complete Tier {tier - 1} first</LockedMessage>;
  }

  // Check subscription ceiling
  const ceiling = { free: 2, premium: 4, vip: 5 }[user.subscription];
  if (tier > ceiling) {
    return <UpgradePrompt tier={tier} subscription={user.subscription} />;
  }

  // Allow tier completion
  return <TierForm tier={tier} />;
}
```

## Examples

### Example 1: Free user tries to complete Tier 3
**Result:** Show upgrade prompt "Premium required for Tier 3+"

### Example 2: User tries to skip Tier 2 and complete Tier 3
**Result:** Block with message "Complete Tier 2 first"

### Example 3: User downgrades from Premium to Free
**Result:** completedTier remains 4, but can only share Tier 1-2 with NEW matches

## Constraints

### MUST DO:
- ✅ Enforce sequential completion (no skipping)
- ✅ Enforce subscription ceilings
- ✅ Block sharing of incomplete tiers
- ✅ Show clear locked state visuals
- ✅ Display upgrade prompts at ceiling
- ✅ Validate on both client AND server

### MUST NOT DO:
- ❌ Allow tier skipping
- ❌ Ignore subscription ceiling
- ❌ Allow sharing incomplete tiers
- ❌ Show locked tiers same as unlocked
- ❌ Only validate client-side

## Validation Checklist

- [ ] Can users skip tiers? (should be NO)
- [ ] Can users share incomplete tiers? (should be NO)
- [ ] Does subscription ceiling block higher tiers? (should be YES)
- [ ] Are locked tiers visually distinct? (should be YES)
- [ ] Do upgrade prompts appear at ceiling? (should be YES)

## Self-Test

**Q1:** Can a free user complete Tier 3?
**A:** NO - Free ceiling is Tier 2

**Q2:** Can you complete Tier 4 without completing Tier 3?
**A:** NO - Must complete sequentially

**Q3:** Can you share Tier 3 without completing it?
**A:** NO - Cannot share incomplete tier

**✅ Pass all 3 = Skill validated**

## References

- Master Reference: `docs/Global Context/tier_system.md`
- Subscription Limits: `docs/Technical Specifications/subscription_tier_ceiling.md`
- Anti-Gravity Rules: `docs/Safety & Compliance/anti_gravity_rules.md` (Rule A1-A4)
