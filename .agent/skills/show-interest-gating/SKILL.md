---
name: Show Interest Gating
description: Enforce consent-based interaction gating requiring mutual Show Interest acceptance before messaging, with 3-month cooldown after decline and 5/month limit for free users.
---

# Show Interest Gating Skill

## Goal

Enforce consent-based interaction: no cold messaging, mutual acceptance required, 3-month cooldown after decline.

## When to Trigger

- Building Show Interest UI
- Implementing message interfaces
- Creating cooldown displays
- Handling subscription limits

## Core Rules

1. Must send Show Interest before messaging
2. Both parties must mutually accept
3. 3-month cooldown after decline
4. Free users: 5 Show Interest/month
5. Premium/VIP: Unlimited
6. Cannot bypass with new account (device fingerprinting)

## Instructions

```javascript
// Before messaging
if (relationship.status !== 'accepted') {
  messageInput.disabled = true;
  showWarning('Send Show Interest first');
}

// Cooldown check
if (relationship.status === 'declined') {
  const cooldownEnd = new Date(relationship.declinedAt);
  cooldownEnd.setMonth(cooldownEnd.getMonth() + 3);

  if (Date.now() < cooldownEnd) {
    showInterestButton.disabled = true;
    displayCountdown(cooldownEnd);
  }
}

// Free tier limit
if (user.subscription === 'free' && user.showInterestSentThisMonth >= 5) {
  showInterestButton.disabled = true;
  showUpgradePrompt();
}
```

## Constraints

### MUST DO:
- ✅ Block messaging without mutual acceptance
- ✅ Enforce 3-month cooldown
- ✅ Limit free users to 5/month
- ✅ Device fingerprinting for multi-account

### MUST NOT DO:
- ❌ Allow cold messaging
- ❌ Skip cooldown enforcement
- ❌ Allow cooldown reset via profile changes

## Self-Test

**Q1:** Can users message before mutual acceptance?
**A:** NO

**Q2:** Cooldown duration after decline?
**A:** 3 months

**Q3:** Free user Show Interest limit?
**A:** 5 per month

**✅ Pass all 3 = Skill validated**

## References

- Master: `docs/Technical Specifications/show_interest_flow.md`
- Anti-Gravity: `docs/Safety & Compliance/anti_gravity_rules.md` (Rule B1-B4)
