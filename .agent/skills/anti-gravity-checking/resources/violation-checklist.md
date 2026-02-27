# Anti-Gravity Rule Violation Checklist

Use this checklist to validate implementations against all anti-gravity rules.

## Principle 1: No Shortcuts to Depth

- [ ] Can users view Tier 3 without completing Tier 2? (should be NO)
- [ ] Can users view higher tier than they've completed? (should be NO)
- [ ] Can users request Tier 4 while only sharing Tier 1? (should be NO)
- [ ] Is EDT calculation enforced on profile views? (should be YES)
- [ ] Are locked tiers actually inaccessible? (should be YES)

## Principle 2: No Cold Contact

- [ ] Can users message without Show Interest acceptance? (should be NO)
- [ ] Is Show Interest mutual acceptance required? (should be YES)
- [ ] Can users share external contact before EDT ≥ 2? (should be NO)
- [ ] Are profile comments/likes disabled? (should be YES)
- [ ] Is messaging input disabled for non-accepted? (should be YES)

## Principle 3: No Subscription Ceiling Bypass

- [ ] Can free users complete Tier 3? (should be NO)
- [ ] Can Premium users complete Tier 5? (should be NO)
- [ ] Do completed tiers persist after downgrade? (should be YES)
- [ ] Can downgraded users share higher tiers with NEW matches? (should be NO)
- [ ] Is multi-account detection active? (should be YES)

## Principle 4: No Spam or Harassment

- [ ] Is 3-month cooldown enforced after decline? (should be YES)
- [ ] Can users create new accounts to bypass cooldown? (should be NO)
- [ ] Does profile change reset cooldown? (should be NO)
- [ ] Is device fingerprinting active? (should be YES)
- [ ] Can users send multiple Show Interest after decline? (should be NO)

## Principle 5: No VIP Privilege Abuse

- [ ] Can VIP users self-serve browse? (should be NO)
- [ ] Can VIP initiate with Free/Premium users? (should be NO)
- [ ] Can VIP experts access unassigned clients? (should be NO)
- [ ] Are expert violations logged? (should be YES)
- [ ] Is 3-strike suspension enforced for experts? (should be YES)

## Principle 6: Safety Enforcement

- [ ] Is 3-strike ban system active? (should be YES)
- [ ] Is reverse image search active for profiles? (should be YES)
- [ ] Is commercial activity detection active? (should be YES)
- [ ] Is data scraping prevented? (should be YES)
- [ ] Are harassment reports escalated properly? (should be YES)

## Consequences Validation

- [ ] First violation: Warning issued? (should be YES)
- [ ] Second violation: 30-90 day suspension? (should be YES)
- [ ] Third violation: Permanent ban + device block? (should be YES)
- [ ] Are consequences escalating properly? (should be YES)
- [ ] Are all violations logged? (should be YES)

## Pass Criteria

**All checkboxes must be checked (passing) before deployment.**

If ANY checkbox fails, the feature violates anti-gravity rules and must be fixed.
