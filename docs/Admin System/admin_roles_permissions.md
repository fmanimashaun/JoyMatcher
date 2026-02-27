# Admin Roles & Permissions Matrix

**Version:** 1.0.0
**Last Updated:** 2026-02-26
**Status:** Specification Complete

---

## Permission Matrix Overview

This document provides detailed permission matrices for all admin roles in the JoyMatcher platform. Each permission is explicitly defined with allow/deny status.

---

## Permission Categories

### User Management (UM)
- `UM.view_all` - View all user profiles
- `UM.view_vip_only` - View only VIP users
- `UM.view_assigned_only` - View only assigned users
- `UM.edit_profile` - Edit user profile data
- `UM.suspend_temp` - Temporarily suspend users (max 30 days)
- `UM.suspend_indefinite` - Indefinitely suspend users
- `UM.ban_permanent` - Permanently ban users
- `UM.delete_account` - Delete user accounts
- `UM.view_tier_data` - View user tier completion data
- `UM.reset_tier` - Reset tier completion status

### Admin Management (AM)
- `AM.view_admins` - View admin list
- `AM.create_admin` - Create new admin accounts
- `AM.edit_admin` - Edit admin roles and permissions
- `AM.delete_admin` - Delete admin accounts
- `AM.assign_roles` - Assign roles to admins

### VIP Management (VIP)
- `VIP.view_applications` - View VIP applications queue
- `VIP.approve_application` - Approve/reject VIP applications
- `VIP.verify_tier5` - Review Tier 5 ID verification
- `VIP.view_all_vip` - View all VIP users
- `VIP.view_assigned_vip` - View only assigned VIP clients
- `VIP.assign_to_expert` - Assign VIP clients to experts
- `VIP.reassign_vip` - Reassign VIP to different expert
- `VIP.manage_experts` - Add/remove freelance experts
- `VIP.set_expert_rates` - Set payment rates for experts
- `VIP.process_payments` - Process expert payments

### Content Moderation (CM)
- `CM.view_reports` - View user reports queue
- `CM.resolve_reports` - Resolve reports
- `CM.moderate_photos` - Approve/reject photos
- `CM.moderate_profiles` - Review and edit profiles
- `CM.view_flagged_messages` - View flagged messages
- `CM.delete_content` - Delete inappropriate content

### Data Management (DM)
- `DM.export_user_data` - Export user data (GDPR)
- `DM.delete_user_data` - Process deletion requests
- `DM.anonymize_data` - Anonymize deleted user data
- `DM.view_audit_logs` - View admin action logs
- `DM.manage_retention_policies` - Set data retention rules

### Analytics (AN)
- `AN.view_platform_analytics` - View all platform metrics
- `AN.view_vip_analytics` - View VIP-specific metrics
- `AN.view_moderation_analytics` - View moderation metrics
- `AN.view_own_performance` - View own performance only
- `AN.export_reports` - Export analytics reports

### Settings & Configuration (SET)
- `SET.view_settings` - View platform settings
- `SET.edit_settings` - Edit platform settings
- `SET.manage_pricing` - Set subscription pricing
- `SET.manage_features` - Enable/disable features
- `SET.manage_email_templates` - Edit notification templates

### Content Publishing (PUB)
- `PUB.create_blog_post` - Create blog posts
- `PUB.edit_blog_post` - Edit blog posts
- `PUB.publish_blog_post` - Publish blog posts
- `PUB.delete_blog_post` - Delete blog posts
- `PUB.approve_testimonial` - Approve user testimonials
- `PUB.edit_testimonial` - Edit testimonial content
- `PUB.unpublish_testimonial` - Remove published testimonials

### Support (SUP)
- `SUP.view_tickets` - View support tickets
- `SUP.respond_tickets` - Respond to support tickets
- `SUP.escalate_tickets` - Escalate tickets to other roles
- `SUP.manage_faq` - Edit FAQ content

---

## Complete Permission Matrix

| Permission | Super Admin | Moderator | VIP Coordinator | VIP Expert | Data Officer | Support Agent |
|------------|-------------|-----------|-----------------|------------|--------------|---------------|
| **User Management** |
| UM.view_all | ✅ | ✅ | ❌ | ❌ | ✅ | ⚠️ Tier 1 only |
| UM.view_vip_only | ✅ | ❌ | ✅ | ❌ | ❌ | ❌ |
| UM.view_assigned_only | ✅ | ❌ | ❌ | ✅ | ❌ | ❌ |
| UM.edit_profile | ✅ | ✅ | ⚠️ VIP only | ⚠️ Assigned only | ❌ | ❌ |
| UM.suspend_temp | ✅ | ✅ (≤30 days) | ❌ | ❌ | ❌ | ❌ |
| UM.suspend_indefinite | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ |
| UM.ban_permanent | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ |
| UM.delete_account | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ |
| UM.view_tier_data | ✅ | ✅ | ⚠️ VIP only | ⚠️ Assigned only | ✅ | ❌ |
| UM.reset_tier | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ |
| **Admin Management** |
| AM.view_admins | ✅ | ❌ | ⚠️ Experts only | ❌ | ❌ | ❌ |
| AM.create_admin | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ |
| AM.edit_admin | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ |
| AM.delete_admin | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ |
| AM.assign_roles | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ |
| **VIP Management** |
| VIP.view_applications | ✅ | ❌ | ✅ | ❌ | ❌ | ❌ |
| VIP.approve_application | ✅ | ❌ | ✅ | ❌ | ❌ | ❌ |
| VIP.verify_tier5 | ✅ | ❌ | ✅ | ❌ | ❌ | ❌ |
| VIP.view_all_vip | ✅ | ❌ | ✅ | ❌ | ❌ | ❌ |
| VIP.view_assigned_vip | ✅ | ❌ | ✅ | ✅ | ❌ | ❌ |
| VIP.assign_to_expert | ✅ | ❌ | ✅ | ❌ | ❌ | ❌ |
| VIP.reassign_vip | ✅ | ❌ | ✅ | ❌ | ❌ | ❌ |
| VIP.manage_experts | ✅ | ❌ | ✅ | ❌ | ❌ | ❌ |
| VIP.set_expert_rates | ✅ | ❌ | ✅ | ❌ | ❌ | ❌ |
| VIP.process_payments | ✅ | ❌ | ✅ | ❌ | ❌ | ❌ |
| **Content Moderation** |
| CM.view_reports | ✅ | ✅ | ⚠️ VIP-related only | ❌ | ❌ | ❌ |
| CM.resolve_reports | ✅ | ✅ | ⚠️ VIP-related only | ❌ | ❌ | ❌ |
| CM.moderate_photos | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ |
| CM.moderate_profiles | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ |
| CM.view_flagged_messages | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ |
| CM.delete_content | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ |
| **Data Management** |
| DM.export_user_data | ✅ | ❌ | ❌ | ❌ | ✅ | ❌ |
| DM.delete_user_data | ✅ | ❌ | ❌ | ❌ | ✅ | ❌ |
| DM.anonymize_data | ✅ | ❌ | ❌ | ❌ | ✅ | ❌ |
| DM.view_audit_logs | ✅ | ❌ | ❌ | ❌ | ✅ | ❌ |
| DM.manage_retention_policies | ✅ | ❌ | ❌ | ❌ | ✅ | ❌ |
| **Analytics** |
| AN.view_platform_analytics | ✅ | ❌ | ❌ | ❌ | ⚠️ Data metrics only | ❌ |
| AN.view_vip_analytics | ✅ | ❌ | ✅ | ❌ | ❌ | ❌ |
| AN.view_moderation_analytics | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ |
| AN.view_own_performance | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| AN.export_reports | ✅ | ❌ | ⚠️ VIP only | ❌ | ✅ | ❌ |
| **Settings & Configuration** |
| SET.view_settings | ✅ | ❌ | ❌ | ❌ | ⚠️ Data policies only | ❌ |
| SET.edit_settings | ✅ | ❌ | ❌ | ❌ | ⚠️ Data policies only | ❌ |
| SET.manage_pricing | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ |
| SET.manage_features | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ |
| SET.manage_email_templates | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ |
| **Content Publishing** |
| PUB.create_blog_post | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ |
| PUB.edit_blog_post | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ |
| PUB.publish_blog_post | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ |
| PUB.delete_blog_post | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ |
| PUB.approve_testimonial | ✅ | ❌ | ⚠️ View VIP testimonials | ❌ | ❌ | ❌ |
| PUB.edit_testimonial | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ |
| PUB.unpublish_testimonial | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ |
| **Support** |
| SUP.view_tickets | ✅ | ⚠️ Moderation-related only | ⚠️ VIP-related only | ❌ | ⚠️ Data-related only | ✅ |
| SUP.respond_tickets | ✅ | ⚠️ Moderation-related only | ⚠️ VIP-related only | ❌ | ⚠️ Data-related only | ✅ |
| SUP.escalate_tickets | ✅ | ✅ | ✅ | ❌ | ✅ | ✅ |
| SUP.manage_faq | ✅ | ❌ | ❌ | ❌ | ❌ | ✅ |

**Legend:**
- ✅ Full permission
- ❌ No permission
- ⚠️ Limited/conditional permission (see notes)

---

## Role-Specific Permission Details

### Super Admin

**Full Access To:**
- All users (Free, Premium, VIP)
- All admin accounts
- All reports and moderation queues
- All VIP applications and verifications
- All analytics and financial data
- All platform settings
- All content (blog, testimonials)
- All data management functions

**Restrictions:** None

**Special Powers:**
- Can override any decision by other admins
- Can create and delete admin accounts
- Can permanently ban users
- Can process refunds and financial adjustments
- Can access audit logs

---

### Moderator

**Full Access To:**
- All Free and Premium user profiles (all tiers)
- All user reports queue
- Photo moderation queue
- Profile content review
- Flagged messages
- Moderation analytics

**Limited Access:**
- Can suspend users temporarily (max 30 days)
- Can edit profiles (remove inappropriate content only)
- Cannot access VIP users or applications
- Cannot access financial data

**Must Escalate To Super Admin:**
- Permanent bans
- VIP-related issues
- Legal threats or serious safety concerns
- Refund requests

**Typical Workflow:**
1. Review report from user
2. Investigate (view profiles, messages if flagged)
3. Make decision:
   - No action (report unfounded)
   - Warning (logged)
   - Content removal
   - 7/14/30 day suspension
   - Escalate for permanent ban

---

### VIP Coordinator

**Full Access To:**
- All VIP applications (pending, approved, rejected)
- All VIP user profiles (all 5 tiers)
- Tier 5 verification queue (ID, video KYC)
- All freelance experts (performance, assignments, payments)
- VIP analytics (revenue, satisfaction, churn)
- VIP success stories

**Limited Access:**
- Cannot access Free/Premium users
- Cannot moderate non-VIP content
- Cannot manage other admin roles
- Cannot delete user data (only Data Officer can)

**Cannot Do:**
- Permanently ban VIP users (must escalate to Super Admin)
- Access platform-wide financial data (only VIP revenue)
- Change platform settings

**Typical Workflow:**
1. Review new VIP application (18-question questionnaire)
2. Screen for intent and seriousness
3. Approve or reject with reason
4. If approved → Review Tier 5 verification when submitted
5. Verify ID documents and video KYC
6. If verified → Assign to appropriate freelance expert
7. Monitor expert performance monthly
8. Reassign if client satisfaction drops
9. Process expert payments monthly

---

### VIP Expert (Freelance)

**Full Access To:**
- Assigned VIP clients only (all 5 tiers)
- Client intake questionnaires
- Client preferences and deal-breakers
- Client session notes (own notes only)
- Own performance metrics
- Own earnings history

**Tiered Access for Potential Matches (Searching on Behalf of VIP Client):**
- ✅ **Tier 1-2:** Can browse ALL platform users' public/request-based data
  - Use this to identify potential matches
  - Filter by location, age, religion, occupation, etc.
  - Create shortlist of compatible profiles
- ⚠️ **Tier 3-5:** REQUIRES explicit consent from potential match
  - Expert submits "Tier Access Request" on behalf of VIP client
  - Potential match receives notification and can approve/decline
  - Potential match controls which tier level to share (3, 4, or 5)
  - If approved, expert can review deeper data to assess compatibility
  - Consent can be revoked at any time by potential match

**Strictly Prohibited:**
- Viewing unassigned VIP clients
- Viewing other experts' clients
- Accessing Tier 3-5 of potential matches WITHOUT explicit consent
- Messaging potential matches directly (must go through VIP client introduction)
- Viewing reports or moderation queues
- Accessing platform analytics (except own performance)
- Viewing other experts' performance or earnings
- Editing platform settings
- Creating admin accounts

**Data Isolation Enforcement:**
```javascript
// Example: Expert attempting to view unassigned VIP
GET /admin/vip-expert/client/12345

// Backend check:
const assignment = await VIPAssignment.findOne({
  expertId: req.admin.id,
  vipUserId: 12345,
  status: 'active'
});

if (!assignment) {
  return res.status(403).json({
    error: 'Access Denied: This client is not assigned to you'
  });
}
```

**Typical Workflow:**
1. Receive assignment notification from VIP Coordinator
2. Review VIP client profile (all 5 tiers)
3. Schedule onboarding session (video call)
4. Conduct intake session (understand preferences, deal-breakers)
5. **Search Phase:** Browse platform-wide Tier 1-2 data to identify potential matches
6. Narrow to 5-10 best matches based on Tier 1-2 compatibility
7. **Consent Phase:** Submit Tier 3-5 access requests to top 3-5 potential matches
8. Wait for potential matches to approve/decline requests (may take 1-3 days)
9. **Review Phase:** Review approved Tier 3-5 data to confirm deeper compatibility
10. Create personalized introduction proposal for VIP client (1-2 best matches)
11. Submit proposal to VIP client for approval
12. If VIP client approves, facilitate curated introduction between both parties
13. **Coaching Phase:** Provide ongoing coaching and feedback after introduction
9. Monitor early conversations
10. Track outcome (successful match = payment)
11. Provide ongoing support and follow-up sessions

---

### Data Protection Officer

**Full Access To:**
- Data deletion requests queue
- Data export requests (GDPR/NDPR)
- Anonymization queue
- Audit logs (all admin actions)
- Data retention policy settings
- Legal holds (court-ordered data preservation)

**Limited Access:**
- Can view user profiles (for deletion verification)
- Can view data metrics analytics
- Cannot moderate content
- Cannot access VIP matching
- Cannot access financial data

**Cannot Do:**
- Suspend or ban users
- Edit user profiles (except for data deletion)
- Approve VIP applications
- Access matchmaking functions

**Typical Workflow:**
1. Receive data deletion request from user
2. Verify request authenticity (email confirmation)
3. Check for legal holds or pending investigations
4. Process 7-day cooling-off period
5. Execute anonymization script
6. Verify data removed from production database
7. Preserve minimal data for legal compliance (email hash, billing records)
8. Send confirmation to user
9. Log deletion in audit trail

---

### Support Agent

**Full Access To:**
- Support ticket queue
- User profiles (Tier 1 only, for context)
- Subscription status (to answer billing questions)
- FAQ content management

**Limited Access:**
- Cannot see Tier 2-5 data
- Cannot edit user profiles
- Cannot suspend or ban users
- Cannot access financial data beyond subscription status

**Cannot Do:**
- Resolve moderation issues (escalate to Moderator)
- Access VIP information (escalate to VIP Coordinator)
- Process data deletion (escalate to Data Officer)
- Make technical changes (escalate to Engineering)

**Must Escalate:**
- Content moderation concerns → Moderator
- VIP service questions → VIP Coordinator
- Data/privacy requests → Data Protection Officer
- Technical bugs → Engineering team
- Legal threats → Super Admin

**Typical Workflow:**
1. Receive support ticket (email, in-app)
2. Categorize: Billing, Technical, Moderation, VIP, Data
3. If can resolve (password reset, FAQ question) → Resolve
4. If cannot resolve → Escalate to appropriate role
5. Track ticket status
6. Follow up with user

---

## Permission Enforcement Technical Implementation

### Backend Middleware

```javascript
// Permission check middleware
function requirePermission(permission) {
  return async (req, res, next) => {
    const admin = req.admin; // From auth token

    // Super Admin bypasses all checks
    if (admin.role === 'superAdmin') {
      return next();
    }

    // Get role permissions from config
    const rolePermissions = adminRoles[admin.role].permissions;

    // Check if permission is granted
    if (!rolePermissions.includes(permission)) {
      await logSecurityEvent({
        event: 'permission_denied',
        adminId: admin.id,
        attemptedPermission: permission,
        ipAddress: req.ip
      });

      return res.status(403).json({
        error: 'Permission Denied',
        message: `Your role (${admin.role}) does not have ${permission} permission`,
        requiredRole: getMinimumRoleForPermission(permission)
      });
    }

    next();
  };
}

// Usage example
app.delete('/admin/users/:id',
  authenticateAdmin,
  requirePermission('UM.delete_account'),
  async (req, res) => {
    // Delete user logic
  }
);
```

### VIP Expert Data Isolation

```javascript
// Special middleware for VIP Expert isolation
function enforceVIPExpertIsolation(req, res, next) {
  const admin = req.admin;

  // Only apply to VIP Experts
  if (admin.role !== 'vipExpert') {
    return next();
  }

  // Extract requested VIP client ID
  const requestedClientId = req.params.clientId || req.query.clientId;

  if (!requestedClientId) {
    return next(); // No specific client requested, continue
  }

  // Check assignment
  VIPAssignment.findOne({
    expertId: admin.id,
    vipUserId: requestedClientId,
    status: 'active'
  }).then(assignment => {
    if (!assignment) {
      logSecurityEvent({
        event: 'unauthorized_vip_access_attempt',
        expertId: admin.id,
        attemptedClientId: requestedClientId,
        ipAddress: req.ip
      });

      return res.status(403).json({
        error: 'Access Denied',
        message: 'This VIP client is not assigned to you'
      });
    }
    next();
  });
}

// Apply to all VIP expert routes
app.use('/admin/vip-expert/*',
  authenticateAdmin,
  enforceVIPExpertIsolation
);
```

---

## Audit Logging

All permission checks are logged for security audits:

```javascript
const AuditLog = {
  timestamp: Date,
  adminId: ObjectId,
  adminRole: String,
  action: String, // 'permission_granted', 'permission_denied'
  permission: String, // e.g., 'UM.ban_permanent'
  targetId: ObjectId, // User/resource affected
  ipAddress: String,
  userAgent: String,
  result: String // 'success', 'denied', 'error'
};

// Example log entries
{
  timestamp: "2026-02-26T10:30:00Z",
  adminId: "admin_003",
  adminRole: "moderator",
  action: "permission_denied",
  permission: "UM.ban_permanent",
  targetId: "user_12345",
  ipAddress: "192.168.1.100",
  userAgent: "Mozilla/5.0...",
  result: "denied"
}

{
  timestamp: "2026-02-26T10:31:00Z",
  adminId: "admin_003",
  adminRole: "moderator",
  action: "escalation_created",
  permission: "UM.ban_permanent",
  targetId: "user_12345",
  escalatedTo: "admin_001",
  reason: "Repeated harassment after 2 suspensions",
  result: "escalated"
}
```

---

## Permission Review Process

### Quarterly Access Review (Required)
1. Super Admin generates report of all admin accounts
2. Review each admin's role and last login date
3. Verify admin still requires current permission level
4. Deactivate inactive admins (>90 days no login)
5. Document review in audit log

### Annual Recertification (Required)
1. All admins must recertify their access needs
2. Complete training update (policy changes)
3. Acknowledge acceptable use policy
4. Failure to recertify = account suspended until completed

### Permission Change Requests
1. Admin requests permission change (e.g., Moderator → VIP Coordinator)
2. Manager approves request
3. Super Admin reviews and approves
4. Training requirement (if new permissions)
5. Permission granted
6. All actions logged

---

## Related Documentation

- [Admin Architecture](admin_architecture.md) - Overall admin system design
- [VIP Expert Isolation](vip_expert_isolation.md) - Technical isolation implementation
- [Moderation Workflows](moderation_workflows.md) - Moderation procedures
- [Security & Compliance](../Safety%20&%20Compliance/legal_compliance.md) - Security standards

---

**Document Owner:** Engineering Lead
**Compliance Owner:** Data Protection Officer
**Last Reviewed:** 2026-02-26
**Next Review:** 2026-05-26 (Quarterly)
