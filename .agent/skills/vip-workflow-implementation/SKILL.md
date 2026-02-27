---
name: VIP Workflow Implementation
description: Implement 10-step VIP lifecycle from application to service. VIP cannot self-serve browse - expert handles all matching.
---

# VIP Workflow Implementation Skill

## Goal

Implement complete 10-step VIP workflow. VIP users cannot self-serve - expert handles everything.

## 10-Step VIP Flow

1. Premium user completes Tier 4 → VIP application unlocked
2. Submit 18-question application → VIP Coordinator reviews
3. Application approved/rejected → Notification sent
4. If approved: Tier 5 unlocked
5. Upload ID + Video KYC → VIP Coordinator verifies
6. Verification approved → Payment unlocked
7. Payment (₦200K+/$200+) → VIP status activated
8. VIP Coordinator assigns to expert
9. Expert conducts 60-90min onboarding
10. Expert searches matches, creates introductions

## Key Rules

```javascript
// Rule 1: Must complete Tier 4 first
if (user.completedTier < 4) {
  hideVIPApplication();
}

// Rule 2: Cannot skip to payment
if (user.vipApplicationStatus !== 'approved') {
  blockPayment();
}

// Rule 3: Expert isolation (ABSOLUTE)
if (!expert.assignedClients.includes(vipId)) {
  blockAccess('Not assigned to this client');
}

// Rule 4: VIP cannot self-serve
if (user.subscription === 'vip') {
  redirectTo('/app/vip-dashboard');
}
```

## Constraints

### MUST DO:
- ✅ Enforce 10-step sequence
- ✅ Block VIP self-serve browsing
- ✅ Expert isolation

### MUST NOT DO:
- ❌ Allow skipping application
- ❌ Allow VIP self-serve
- ❌ Violate expert isolation

## References

- Master: `docs/Admin System/vip_coordination.md`
- Workflow: `docs/Technical Specifications/vip_application_workflow.md`
