---
name: EDT Calculation
description: Calculate and enforce Effective Disclosure Tier (EDT) using the formula min(yourCompleted, theirCompleted, youShared, theyShared) to ensure reciprocal transparency.
---

# EDT Calculation Skill

## Goal

Calculate EDT correctly and enforce profile visibility based on EDT value, ensuring reciprocal transparency and symmetric revocation.

## When to Trigger

- Rendering profile views
- Handling tier sharing changes
- Implementing revocation logic
- Building tier request modals
- Calculating visible content

## Formula

```javascript
function calculateEDT(currentUser, otherUser, relationship) {
  return Math.min(
    currentUser.completedTier,                    // What you've completed
    otherUser.completedTier,                      // What they've completed
    relationship.sharedTierByCurrentUser,         // What you're sharing
    relationship.sharedTierByOtherUser            // What they're sharing
  );
}
```

**EDT is the MINIMUM of all four values**

## Instructions

### Enforcement Points

1. **Profile View:** Only show sections up to EDT
2. **Locked State:** Gray overlay + lock icon + upgrade CTA
3. **Dynamic Recalculation:** On ANY tier change
4. **Symmetric Revocation:** If A revokes from B, B loses A's tier too

### Implementation

```javascript
function ProfileView({ profile, EDT }) {
  return (
    <div>
      {[1, 2, 3, 4, 5].map(tier => (
        <TierSection
          key={tier}
          tier={tier}
          locked={tier > EDT}  // Lock tiers above EDT
          data={profile[`tier${tier}`]}
        />
      ))}
    </div>
  );
}
```

## Examples

**Scenario 1:** You completed 4, they completed 3, you share 3, they share 2
→ EDT = min(4, 3, 3, 2) = **2**

**Scenario 2:** After revocation - You share 2, they FORCED to 2
→ EDT = **2** (symmetric)

## Constraints

### MUST DO:
- ✅ Use min() of all four values
- ✅ Recalculate on any tier change
- ✅ Enforce symmetric revocation
- ✅ Lock tiers above EDT (not just hide)
- ✅ Validate server-side

### MUST NOT DO:
- ❌ Use max instead of min
- ❌ Forget to recalculate dynamically
- ❌ Only validate client-side
- ❌ Non-symmetric revocation
- ❌ Hide instead of block locked tiers

## Self-Test

**Q1:** You completed 4, they completed 3, you share 2, they share 4. EDT?
**A:** 2 (minimum of all four)

**Q2:** Can you see Tier 3 if EDT = 2?
**A:** NO - Only Tier 1-2 visible

**Q3:** If you revoke Tier 3, do they lose your Tier 3 too?
**A:** YES - Symmetric revocation

**✅ Pass all 3 = Skill validated**

## References

- Master: `docs/Global Context/edt_specification.md`
- Tier System: `docs/Global Context/tier_system.md`
