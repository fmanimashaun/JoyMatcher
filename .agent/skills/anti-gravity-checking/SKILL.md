---
name: Anti-Gravity Rule Checking
description: Prevent system exploitation through 6 core principles - no shortcuts to depth, no cold contact, no ceiling bypass, no spam, no VIP abuse, safety enforcement.
---

# Anti-Gravity Rule Checking Skill

## Goal

Prevent users from circumventing JoyMatcher's trust-based architecture.

## 6 Core Principles

### 1. No Shortcuts to Depth
```javascript
if (requestedViewTier > currentUser.completedTier) {
  blockAccess('Complete previous tiers first');
}
```

### 2. No Cold Contact
```javascript
if (relationship.status !== 'accepted') {
  disableMessaging();
}
```

### 3. No Subscription Ceiling Bypass
```javascript
if (user.subscription === 'free' && attemptedTier > 2) {
  showUpgradePrompt('Premium required for Tier 3+');
}
```

### 4. No Spam or Harassment
```javascript
if (relationship.status === 'declined' && Date.now() < relationship.cooldownUntil) {
  disableShowInterest();
  displayCountdown(relationship.cooldownUntil);
}
```

### 5. No VIP Privilege Abuse
```javascript
if (user.subscription === 'vip') {
  redirectToVIPDashboard();
}
```

### 6. Safety Enforcement
```javascript
const consequences = {
  1: 'Warning',
  2: '30-90 day suspension',
  3: 'Permanent ban + device block'
};
```

## Constraints

### MUST DO:
- ✅ Enforce all 6 principles
- ✅ Log violations
- ✅ Escalate consequences

### MUST NOT DO:
- ❌ Allow bypassing any principle
- ❌ Skip violation logging

## References

- Master: `docs/Safety & Compliance/anti_gravity_rules.md`
