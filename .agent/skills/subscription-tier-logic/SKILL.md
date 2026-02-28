---
name: Subscription Tier Logic
description: Enforce subscription-based feature access with Free (Tier 1-2), Premium (Tier 1-4, ₦18K/$18), VIP (Tier 1-5, ₦200K+/$200+). Never mix currencies in UI.
---

# Subscription Tier Logic Skill

## Goal

Enforce subscription-based tier ceilings and feature access. Display correct currency (₦ for NG, $ for others).

## Subscription Matrix

| Feature | Free | Premium | VIP |
|---------|------|---------|-----|
| Tier Completion | 1-2 | 1-4 | 1-5 |
| Show Interest | 5/month | Unlimited | Unlimited (via expert) |
| Self-Serve | ✅ | ✅ | ❌ (expert handles) |
| Matchmaker | ❌ | ❌ | ✅ |

## Currency Rules

```javascript
function getPrice(country, tier) {
  const prices = {
    NG: { premium: '₦18,000', vip: '₦200,000+' },
    default: { premium: '$18', vip: '$200+' }
  };
  const currency = country === 'NG' ? 'NG' : 'default';
  return prices[currency][tier];
}
```

**CRITICAL:** Never mix ₦ and $ in same UI

## Constraints

### MUST DO:
- ✅ Enforce tier ceilings
- ✅ Show correct currency for user's country
- ✅ Block VIP from self-serve browsing

### MUST NOT DO:
- ❌ Mix currencies
- ❌ Allow free users Tier 3+
- ❌ Allow VIP self-serve

## References

- Master: `docs/Technical Specifications/subscription_tier_ceiling.md`
