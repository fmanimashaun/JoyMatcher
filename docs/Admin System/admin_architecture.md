# Admin System Architecture

**Version:** 1.0.0
**Last Updated:** 2026-02-26
**Status:** Specification Complete

---

## Overview

JoyMatcher's admin system is designed with role-based access control (RBAC) to manage platform operations, content moderation, VIP services, and data compliance. The system separates concerns across four distinct admin roles, with special emphasis on data isolation for external contractors (VIP Experts).

---

## Core Principles

### 1. Separation of Concerns
- **Moderation** (content safety) is separate from **VIP management** (high-touch service)
- **Data compliance** is separate from **day-to-day operations**
- **Super Admin** has oversight of all functions

### 2. Data Isolation for External Contractors
- VIP Experts (freelance matchmakers) can ONLY access their assigned clients
- No platform-wide user browsing for external contractors
- No access to reports, moderation, or financial data (except their own earnings)

### 3. Audit Trail
- All admin actions are logged with timestamp, admin ID, and IP address
- Logs are immutable and retained for 7 years (compliance)
- Regular audit reviews by Super Admin

### 4. Principle of Least Privilege
- Each role has minimum permissions needed for their function
- Permissions cannot be escalated without Super Admin approval
- Temporary permission grants are logged and time-limited

---

## Admin Role Hierarchy

```
┌─────────────────────────────────────────────────────────────┐
│                        Super Admin                          │
│                    (Full platform control)                  │
└────────────┬──────────────────────────────┬─────────────────┘
             │                              │
   ┌─────────▼────────┐         ┌──────────▼──────────┐
   │    Moderator     │         │  VIP Coordinator    │
   │  (Content Safety)│         │ (VIP Management)    │
   └──────────────────┘         └──────────┬──────────┘
                                           │
                                ┌──────────▼──────────┐
                                │   VIP Expert        │
                                │ (Assigned Clients)  │
                                │   [ISOLATED]        │
                                └─────────────────────┘
```

**Note:** Data Protection Officer and Support Agent report to Super Admin but are not in the management hierarchy.

---

## Admin Roles Detailed

### 1. Super Admin

**Access Level:** Global
**Count:** 1-3 (founders/executives only)
**Authentication:** Email/Password + 2FA (mandatory)

**Permissions:**
- ✅ View, edit, suspend, ban, delete any user
- ✅ Create, edit, delete admin accounts
- ✅ Assign roles and permissions
- ✅ Approve/reject VIP applications
- ✅ Assign VIP clients to experts
- ✅ Manage freelance experts (hire, fire, payment)
- ✅ View all reports and moderation queues
- ✅ Access all analytics (users, revenue, engagement)
- ✅ Manage platform settings (pricing, features)
- ✅ Approve testimonials for publication
- ✅ Publish blog posts
- ✅ Process data deletion requests
- ✅ Export user data (for legal/compliance)

**Restrictions:** None

**Use Cases:**
- Strategic platform decisions
- Handling escalated moderation cases (permanent bans)
- Managing admin team
- Financial oversight
- Legal compliance oversight

---

### 2. Moderator

**Access Level:** Platform-wide users (not VIP-specific)
**Count:** 2-5 (depending on scale)
**Authentication:** Email/Password + 2FA (optional but recommended)

**Permissions:**
- ✅ View user profiles (all tiers)
- ✅ Edit user profiles (correct errors, remove inappropriate content)
- ✅ Suspend users (temporary, up to 30 days)
- ✅ View and resolve reports
- ✅ Moderate photos (approve, reject, delete)
- ✅ Moderate profile content
- ✅ Flag messages for review (cannot read all messages, only flagged)
- ✅ View safety patterns (spam, harassment indicators)
- ✅ View moderation analytics

**Restrictions:**
- ❌ Cannot permanently ban users (must escalate to Super Admin)
- ❌ Cannot access VIP applications or Tier 5 data
- ❌ Cannot access financial data
- ❌ Cannot manage other admins
- ❌ Cannot approve testimonials or publish blog posts
- ❌ Cannot delete user data (only content removal)

**Use Cases:**
- Daily content moderation (photos, profiles)
- Responding to user reports
- Temporary account suspensions for policy violations
- Identifying and blocking spam/harassment patterns

**Escalation Triggers:**
- User requires permanent ban → Escalate to Super Admin
- VIP user involved in report → Escalate to VIP Coordinator
- Legal threat or serious safety concern → Escalate to Super Admin

---

### 3. VIP Coordinator

**Access Level:** VIP users only (all VIP data)
**Count:** 1-2 (internal employees)
**Authentication:** Email/Password + 2FA (mandatory)

**Permissions:**
- ✅ View all VIP applications
- ✅ Approve/reject VIP applications
- ✅ Review Tier 5 verifications (ID, video KYC)
- ✅ Assign VIP clients to freelance experts
- ✅ Reassign VIP clients (if expert underperforms)
- ✅ Manage freelance expert pool (add, remove, set rates)
- ✅ View expert performance metrics
- ✅ Process expert payments
- ✅ View VIP-related reports
- ✅ View VIP success stories
- ✅ Access VIP analytics (revenue, satisfaction, conversions)

**Restrictions:**
- ❌ Cannot access regular (Free/Premium) users
- ❌ Cannot moderate non-VIP content
- ❌ Cannot manage other admins
- ❌ Cannot delete user data
- ❌ Limited financial access (VIP revenue only, not platform-wide)

**Use Cases:**
- Reviewing VIP applications (intent screening)
- Verifying Tier 5 identity documents
- Assigning VIP clients to best-fit experts
- Monitoring expert performance and quality
- Processing expert payments
- Handling VIP-specific complaints

**Workflow Example:**
1. Premium user completes Tier 4 and applies for VIP
2. VIP Coordinator reviews application questionnaire (18 questions)
3. If approved → User proceeds to Tier 5 verification
4. User uploads ID and video → Coordinator reviews
5. If verified → Coordinator assigns client to available expert
6. Expert begins onboarding and matchmaking
7. Coordinator monitors expert performance monthly

---

### 4. VIP Expert (Freelance Matchmaker)

**Access Level:** ASSIGNED CLIENTS (full data) + TIERED CONSENT for potential matches
**Count:** 5-20 (scalable, contract-based)
**Authentication:** Email/Password (no 2FA required for contractors)

**Permissions:**

**For Assigned VIP Clients:**
- ✅ View assigned VIP clients' full profile (Tiers 1-5)
- ✅ View client intake questionnaires and preferences
- ✅ Add private notes to client profiles
- ✅ Schedule and conduct consultation sessions
- ✅ View own performance metrics (success rate, earnings)
- ✅ View own payment history

**For Potential Matches (Searching on Behalf of VIP Client):**
- ✅ **Tier 1-2 Access:** Can browse ALL platform users' Tier 1-2 data (public/request-based data)
  - Use this to identify potential matches for VIP clients
  - Compare Tier 1-2 against VIP client preferences
  - Create shortlist of compatible profiles
- ⚠️ **Tier 3-5 Access:** REQUIRES explicit consent from potential match
  - Expert submits "Tier Access Request" on behalf of VIP client
  - Potential match receives notification: "A VIP matchmaking expert is considering you for an introduction. Allow access to Tier [3/4/5]?"
  - Potential match can approve/decline
  - Potential match controls which tier level to share (reciprocity principle applies)
  - If approved, expert can review Tier 3-5 to assess compatibility
- ✅ Create introduction proposals for approved matches
- ✅ Facilitate first conversations between VIP and match

**Restrictions (CRITICAL):**
- ❌ **CANNOT** see other experts' clients (full isolation between experts)
- ❌ **CANNOT** see unassigned VIP users (only their own assigned clients)
- ❌ **CANNOT** access Tier 3-5 of potential matches WITHOUT explicit consent
- ❌ **CANNOT** access reports or moderation tools
- ❌ **CANNOT** access financial data (except own earnings)
- ❌ **CANNOT** suspend, ban, or edit user accounts
- ❌ **CANNOT** view admin settings or platform-wide analytics
- ✅ **CAN** message potential matches on behalf of VIP client (after VIP client selects them from curated list)
  - Expert facilitates initial contact and conversation
  - Expert represents VIP client until VIP is ready to engage directly

**Data Isolation Enforcement:**
- **Assigned clients:** Database queries filter by `expertId` + `assignedClientIds`
- **Potential matches (Tier 1-2):** Can query all active users (public tier data)
- **Potential matches (Tier 3-5):** Requires `ConsentRequest` approval + tier level check
- UI shows "My Clients" (assigned list) + "Search Matches" (Tier 1-2 browse)
- Attempting to access Tier 3-5 without consent returns 403 Forbidden
- All data access and consent requests are logged and audited

**Payment Model:**
- Paid per successful introduction (₦50,000 per accepted match)
- Successful = Both parties exchange 3+ messages and relationship active for 7+ days
- Calculated monthly, paid by 5th of following month
- Bonus for high client satisfaction (>4.5/5.0)

**Use Cases:**
- Conducting VIP client onboarding sessions (understand preferences, deal-breakers)
- Browsing Tier 1-2 data of all platform users to identify potential matches
- Submitting Tier 3-5 access requests to potential matches on behalf of VIP client
- Reviewing approved Tier 3-5 data to assess deeper compatibility
- Curating 3-5 final profiles to present to VIP client
- **Messaging selected prospects on behalf of VIP client** (after VIP client selects from curated list)
- Facilitating initial conversation exchanges until VIP client is ready to engage directly
- Coordinating direct introductions between VIP client and approved prospects
- Handing off conversation when VIP client is ready to take over
- Providing ongoing relationship coaching, feedback, and check-ins
- Tracking client progress and satisfaction ratings

**Workflow Example:**
1. VIP Expert reviews VIP client's preferences (e.g., "25-35, Christian, Lagos, wants children")
2. Expert searches platform Tier 1-2 data → finds 10 potential matches
3. Expert narrows to 5 best matches based on Tier 1-2 compatibility
4. Expert submits Tier 3-4 access requests to these 5 potential matches
5. 3 potential matches approve Tier 3-4 access; 2 decline
6. Expert reviews approved Tier 3-4 data → confirms strong compatibility
7. **Expert curates 3-5 final profiles and presents to VIP client**
8. **VIP client reviews profiles → selects 1-2 they're interested in**
9. **Expert reaches out to selected prospects on behalf of VIP client:**
   - Sends initial introduction message (e.g., "Hi [Name], I'm working with a client who shares your values and would love to connect...")
   - Facilitates conversation exchange
   - Gauges interest from prospect
   - Coordinates logistics (when to introduce, how to frame introduction)
10. **Once prospect shows interest → Expert coordinates direct introduction**
11. **VIP client is ready to engage directly → Expert hands off conversation**
12. VIP client and prospect continue independently
13. Expert provides ongoing coaching, feedback, and check-ins

**Quality Control:**
- Client satisfaction ratings (VIP rates expert after each introduction)
- Introduction acceptance rate tracked
- Coordinator reviews performance quarterly
- Poor performance (<50% acceptance rate or <4.0 rating) = reassignment or termination

---

### 5. Data Protection Officer (Optional, for compliance)

**Access Level:** Data management only
**Count:** 1 (can be combined with Super Admin role initially)
**Authentication:** Email/Password + 2FA (mandatory)

**Permissions:**
- ✅ View data deletion requests
- ✅ Process data anonymization
- ✅ Export user data (GDPR/NDPR compliance)
- ✅ Manage data retention policies
- ✅ View audit logs
- ✅ Respond to legal/compliance requests

**Restrictions:**
- ❌ Cannot moderate content
- ❌ Cannot access VIP matchmaking
- ❌ Cannot manage users (beyond data deletion)
- ❌ Cannot access financial data

**Use Cases:**
- Processing right-to-deletion requests
- Responding to data export requests
- Ensuring GDPR/NDPR compliance
- Managing anonymization workflows
- Coordinating with legal counsel

---

### 6. Support Agent (Customer Service)

**Access Level:** Limited user view
**Count:** 3-10 (scalable with user growth)
**Authentication:** Email/Password (no 2FA required)

**Permissions:**
- ✅ View user profiles (Tier 1 only, for context)
- ✅ View and respond to support tickets
- ✅ View subscription status (to answer billing questions)
- ✅ Send password reset emails
- ✅ Manage FAQ content

**Restrictions:**
- ❌ Cannot see Tier 2-5 data
- ❌ Cannot edit user profiles
- ❌ Cannot suspend or ban users
- ❌ Cannot access reports or moderation
- ❌ Cannot access financial data
- ❌ Cannot access VIP information

**Escalation:**
- Technical issues → Engineering team
- Moderation concerns → Moderator
- VIP service questions → VIP Coordinator
- Legal/data requests → Data Protection Officer

---

## Admin Panel Access URLs

### Separate Authentication Domains
- **User App:** `joymatcher.com`
- **Admin Panel:** `admin.joymatcher.com` (separate subdomain for security)

### Role-Specific Dashboards

**Super Admin:**
- `/admin/dashboard` (full metrics)

**Moderator:**
- `/admin/moderation/dashboard` (reports, photos queue)

**VIP Coordinator:**
- `/admin/vip/dashboard` (applications, assignments)

**VIP Expert:**
- `/admin/vip-expert/dashboard` (assigned clients only)

**Data Protection Officer:**
- `/admin/data/dashboard` (deletion requests)

**Support Agent:**
- `/admin/support/dashboard` (tickets queue)

---

## Admin Creation & Management

### Creating New Admins (Super Admin only)

**Process:**
1. Navigate to `/admin/settings/admins`
2. Click "Add New Admin"
3. Fill form:
   - Email (must be unique)
   - Full name
   - Role (dropdown: Moderator, VIP Coordinator, etc.)
   - Department (optional)
   - Start date
4. System generates temporary password
5. Email sent to new admin with credentials + password reset link
6. Admin must reset password on first login
7. 2FA setup prompt (mandatory for Super Admin, VIP Coordinator, Data Officer)

**Audit Log Entry:**
```json
{
  "action": "admin_created",
  "performedBy": "admin_001",
  "timestamp": "2026-02-26T10:30:00Z",
  "details": {
    "newAdminId": "admin_015",
    "role": "moderator",
    "email": "moderator@joymatcher.com"
  }
}
```

---

### Editing Admin Permissions

**Process:**
1. Navigate to `/admin/settings/admins/:id`
2. Click "Edit Permissions"
3. Options:
   - Change role (dropdown)
   - Suspend admin (temporary)
   - Revoke access (permanent)
   - Reset password
4. Confirm change (requires Super Admin password re-entry)
5. System logs change
6. Email notification sent to affected admin

**Important:** Role changes take effect immediately (no grace period).

---

### Admin Suspension/Removal

**Suspension** (Temporary):
- Used for: Admin on leave, under investigation, policy violation
- Duration: 7, 14, 30 days, or indefinite
- Admin cannot log in during suspension
- Re-activation requires Super Admin approval

**Removal** (Permanent):
- Used for: Termination, role elimination, security breach
- Admin account deactivated
- Email credentials invalidated
- Audit logs preserved (admin actions remain traceable)
- Cannot be undone (must create new account if rehired)

---

## Security Measures

### Authentication
- Email/password with bcrypt hashing (cost factor: 12)
- 2FA via authenticator app (TOTP) for sensitive roles
- Password requirements: 12+ chars, mixed case, numbers, symbols
- Password expiry: 90 days for admins
- Failed login lockout: 5 attempts = 30-minute lockout

### Session Management
- Session timeout: 60 minutes of inactivity
- Auto-logout on browser close
- Single session per admin (new login invalidates old session)
- IP address tracking (unusual location = email alert)

### Audit Logging
- All admin actions logged to immutable append-only database
- Logs include: Action, admin ID, timestamp, IP address, user agent, before/after state
- Retention: 7 years (legal compliance)
- Accessible only to Super Admin and Data Protection Officer

### Access Reviews
- Quarterly access reviews (Super Admin verifies all admin accounts)
- Annual certification (admins confirm they need current permissions)
- Immediate revocation upon role change or termination

---

## Admin Performance Metrics

### Moderators
- Reports resolved per day (target: 10-20)
- Average resolution time (target: <2 hours for urgent, <24 hours for standard)
- False positive rate (incorrect suspensions)
- Escalation rate (% of cases escalated to Super Admin)

### VIP Coordinators
- VIP applications reviewed per week (target: 5-10)
- Tier 5 verification turnaround time (target: <48 hours)
- Expert assignment quality (client satisfaction with assigned expert)
- VIP churn rate (% of VIPs who cancel within 3 months)

### VIP Experts (Freelance)
- Introduction acceptance rate (target: >60%)
- Client satisfaction rating (target: >4.5/5.0)
- Successful matches per month (target: 2-3)
- Session attendance rate (% of scheduled sessions held)
- Response time to client messages (target: <24 hours)

---

## Admin Training Requirements

### All Admins (Mandatory)
- Platform overview and mission training (2 hours)
- Role-specific permissions training (1 hour)
- Security and data protection training (1 hour)
- Community guidelines and moderation standards (2 hours)
- Audit trail and compliance training (1 hour)

### Role-Specific Training

**Moderators:**
- Content moderation best practices (4 hours)
- Handling sensitive reports (harassment, threats)
- De-escalation techniques
- Legal boundaries (defamation, privacy)

**VIP Coordinators:**
- VIP service standards (2 hours)
- Tier 5 verification procedures (2 hours)
- Expert management and quality control (2 hours)
- High-touch customer service (1 hour)

**VIP Experts:**
- Matchmaking methodology (4 hours)
- Client communication best practices (2 hours)
- Data privacy and confidentiality (2 hours, CRITICAL)
- Conflict of interest policy (1 hour)
- Payment and performance tracking (1 hour)

---

## Future Enhancements

### Planned (Phase 2)
- Machine learning flagging for moderation (reduce manual review)
- Expert performance predictive analytics
- Automated VIP-to-expert matching algorithm
- Mobile admin app (for moderators on-the-go)

### Under Consideration
- Multi-level approval workflows (require 2 admins for sensitive actions)
- Admin activity heatmaps (detect unusual patterns)
- Real-time collaboration tools (multiple moderators on same case)
- Expert community forum (for knowledge sharing, isolated from clients)

---

## Related Documentation

- [Admin Roles & Permissions](admin_roles_permissions.md) - Detailed permission matrices
- [VIP Expert Isolation](vip_expert_isolation.md) - Technical implementation of data isolation
- [Moderation Workflows](moderation_workflows.md) - Step-by-step moderation processes
- [VIP Coordination](vip_coordination.md) - VIP management procedures

---

**Document Owner:** Product Lead
**Technical Owner:** Engineering Lead
**Last Reviewed:** 2026-02-26
**Next Review:** 2026-05-26 (Quarterly)
