---
name: Admin RBAC Verification
description: Implement role-based access control with absolute VIP Expert isolation (can ONLY access assigned clients). 3 violations = automatic suspension.
---

# Admin RBAC Verification Skill

## Goal

Enforce admin role hierarchy with ABSOLUTE VIP Expert isolation.

## Role Hierarchy

1. **Super Admin** - Full control (except expert isolation override)
2. **Moderator** - Content safety (NO VIP coordination access)
3. **VIP Coordinator** - VIP lifecycle (NO unassigned VIP access)
4. **VIP Expert** - Assigned clients ONLY (ZERO exceptions)
5. **Data Protection Officer** - GDPR/NDPR compliance
6. **Support Agent** - Customer support (NO admin functions)

## Critical Isolation Rule

```javascript
// VIP Expert data isolation (ABSOLUTE)
function canExpertAccessVIP(expertId, vipId) {
  const assignment = VIPAssignment.findOne({
    expertId, vipId, status: 'active'
  });

  if (!assignment) {
    logUnauthorizedAccess(expertId, vipId);
    incrementViolationCount(expertId);
    return false;
  }
  return true;
}

// 3 violations = suspension
if (expert.violationCount >= 3) {
  suspendExpert(expert.id);
  notifySuperAdmin('Expert isolation violation: 3 strikes');
}
```

## Constraints

### MUST DO:
- ✅ Enforce expert isolation at DB, API, UI layers
- ✅ Log all access attempts
- ✅ Suspend after 3 violations

### MUST NOT DO:
- ❌ Allow expert access to unassigned clients
- ❌ Allow Super Admin to override expert isolation
- ❌ Skip audit logging

## References

- Master: `docs/Admin System/admin_architecture.md`
- Isolation: `docs/Admin System/vip_expert_isolation.md`
