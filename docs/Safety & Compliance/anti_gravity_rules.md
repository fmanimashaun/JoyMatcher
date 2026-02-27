# Anti-Gravity Rules: Preventing System Exploitation

**Version:** 1.0.0
**Last Updated:** 2026-02-27
**Status:** Draft
**Classification:** Security Critical

---

## Overview

**Anti-gravity rules** are guardrails that prevent users from circumventing JoyMatcher's trust-based architecture. These rules enforce friction, maintain consent gates, and prevent abuse of the progressive disclosure system.

The name "anti-gravity" reflects that these rules prevent users from taking shortcuts or "floating above" the intentional friction designed to protect the community.

---

## Philosophy

JoyMatcher is **intentionally difficult** compared to traditional dating apps. This difficulty:
- Filters out non-serious users
- Protects users from harassment
- Ensures investment demonstrates intent
- Maintains platform quality

**Anti-gravity rules enforce this intentional friction.**

---

## Core Anti-Gravity Principles

### 1. No Shortcuts to Depth
**Rule:** You cannot access deep information without reciprocal depth sharing.

**Violations Prevented:**
- ❌ Viewing Tier 3 without completing Tier 2
- ❌ Requesting Tier 4 details while only sharing Tier 1
- ❌ Bypassing EDT calculation
- ❌ Exploiting tier revocation to peek at data

**Enforcement:**
- EDT must gate all profile visibility
- Tier request must show YOUR shared tier prominently
- Revocation is symmetric (if you revoke, you lose access too)

---

### 2. No Cold Contact
**Rule:** All communication must be consent-gated through Show Interest.

**Violations Prevented:**
- ❌ Messaging without mutual Show Interest acceptance
- ❌ Commenting on profiles directly
- ❌ Sending friend requests or connection invites
- ❌ Direct email/phone contact through platform

**Enforcement:**
- Message input disabled until mutual acceptance
- No comments, likes, or reactions on profiles
- Contact info only visible after EDT unlock (Tier 2+)
- Platform never exposes email/phone to other users

---

### 3. No Subscription Ceiling Bypass
**Rule:** Your subscription tier limits your tier completion depth.

**Violations Prevented:**
- ❌ Free users completing Tier 3+
- ❌ Premium users completing Tier 5 (VIP only)
- ❌ Upgrading just to view, then downgrading
- ❌ Creating multiple accounts to bypass limits

**Enforcement:**
- Hard stops at tier ceiling (Free: Tier 2, Premium: Tier 4)
- Completed tiers remain even after downgrade (but cannot share higher)
- Multi-account detection and blocking
- Grace period before tier sharing revoked on downgrade

---

### 4. No Spam or Harassment Through Repetition
**Rule:** If someone declines, you must respect cooldown periods.

**Violations Prevented:**
- ❌ Sending multiple Show Interest requests after decline
- ❌ Creating new accounts to re-contact declined user
- ❌ Using different photos/info to evade blocks
- ❌ Sending Show Interest immediately after cooldown

**Enforcement:**
- 3-month cooldown after Show Interest decline
- Profile changes don't reset cooldown
- Blocked users cannot create new accounts (device fingerprinting)
- VIP Experts monitored for repeat unwanted introductions

---

### 5. No VIP Privilege Abuse
**Rule:** VIP status does not grant browsing privileges or direct contact rights.

**Violations Prevented:**
- ❌ VIP users cold-contacting Free/Premium users
- ❌ VIP experts browsing unassigned clients
- ❌ VIP experts sharing client info with other experts
- ❌ Using VIP to bypass Show Interest requirement

**Enforcement:**
- VIP users must go through expert (no self-serve browsing)
- Expert data isolation (database, API, UI layers)
- Audit logs track all expert access attempts
- VIP cannot initiate with users below their tier (Premium/Free)

---

## Specific Anti-Gravity Rules by Area

### A. Profile & Tier System

#### Rule A1: Mandatory Sequential Completion
**What:** Cannot skip tiers. Must complete Tier 1 before Tier 2, etc.

**Why:** Prevents users from cherry-picking easy questions and skipping hard ones.

**Enforcement:**
```javascript
// Cannot share Tier 3 without completing Tier 2
if (requestedShareTier > currentUser.completedTier) {
  throw new Error('Complete previous tiers first');
}

// Cannot complete Tier N without Tier N-1
if (attemptedTier > currentUser.completedTier + 1) {
  throw new Error('Complete tiers sequentially');
}
```

**Consequence:** Tier completion disabled until previous tier finished.

---

#### Rule A2: No Empty Tier Sharing
**What:** Cannot share a tier you haven't completed.

**Why:** Prevents users from promising depth they don't have.

**Enforcement:**
```javascript
if (sharedTier > completedTier) {
  throw new Error('Cannot share incomplete tier');
}
```

**Consequence:** Share tier selector disabled for incomplete tiers.

---

#### Rule A3: Symmetric Revocation
**What:** Revoking tier access from someone revokes their access to YOUR tier too.

**Why:** Prevents one-sided exploitation (viewing theirs, hiding yours).

**Enforcement:**
```javascript
// If User A revokes Tier 3 from User B:
relationship.sharedTierByUserA = 2; // User A drops to Tier 2
relationship.sharedTierByUserB = Math.min(
  relationship.sharedTierByUserB,
  2
); // User B forced to Tier 2 or lower
```

**Consequence:** Warning modal before revocation: "They will lose your Tier 3 too."

---

#### Rule A4: No Tier Inflation
**What:** Cannot claim to have completed tiers you haven't.

**Why:** Prevents fake profiles inflating their perceived depth.

**Enforcement:**
- Tier completion tracked server-side
- Profile badge shows actual completed tier
- Cannot manually edit tier progress
- Tier completion requires passing validation

**Consequence:** Inaccurate tier claims result in profile suspension.

---

### B. Show Interest & Interaction

#### Rule B1: Cooldown Enforcement
**What:** 3-month cooldown after Show Interest decline.

**Why:** Prevents harassment through repeated requests.

**Enforcement:**
```javascript
const relationship = {
  status: 'declined',
  declinedAt: '2026-02-01',
  cooldownUntil: '2026-05-01', // 3 months later
};

if (Date.now() < relationship.cooldownUntil) {
  throw new Error('Cooldown period active');
}
```

**Consequence:** Show Interest button disabled, countdown displayed.

---

#### Rule B2: Mutual Acceptance Required
**What:** Both parties must accept Show Interest before messaging unlocks.

**Why:** Prevents one-sided unwanted contact.

**Enforcement:**
```javascript
if (relationship.status !== 'accepted') {
  messageInput.disabled = true;
  showWarning('Send Show Interest first');
}
```

**Consequence:** Message interface locked until mutual acceptance.

---

#### Rule B3: No Interest Spam
**What:** Free users limited to 5 Show Interest requests per month.

**Why:** Prevents spam/scattergun approach, encourages selectivity.

**Enforcement:**
```javascript
if (user.subscription === 'free' && user.showInterestSentThisMonth >= 5) {
  throw new Error('Monthly limit reached. Upgrade for unlimited.');
}
```

**Consequence:** Show Interest button replaced with upgrade prompt.

---

#### Rule B4: No Block Evasion
**What:** Blocked users cannot view or contact blocker, even with new accounts.

**Why:** Protects victims from persistent harassers.

**Enforcement:**
- Device fingerprinting (IP, browser, OS)
- Email domain checking
- Phone number verification
- Facial recognition on profile photos
- Block status persists across account deletions

**Consequence:** New accounts from blocked devices are flagged for review.

---

### C. Subscription & Payments

#### Rule C1: No Tier Downgrade Abuse
**What:** Downgrading subscription doesn't erase completed tiers, but limits NEW sharing.

**Why:** Prevents users from upgrading, completing tiers, then downgrading.

**Enforcement:**
```javascript
// User completes Tier 4 on Premium, downgrades to Free
user.completedTier = 4; // Remains 4
user.sharedTier = Math.min(user.sharedTier, 2); // Can only share up to Tier 2

// For NEW matches
maxShareableTier = getSubscriptionCeiling(user.subscription); // 2 for Free
```

**Consequence:** Cannot share Tier 3+ with new matches after downgrading to Free.

**Grace Period:** 30 days after downgrade before tier sharing revoked for existing matches.

---

#### Rule C2: No Refund Exploitation
**What:** Refund requests do not restore downgraded access.

**Why:** Prevents cycle of subscribe → complete → downgrade → refund → repeat.

**Enforcement:**
- Refunds must be requested within 7 days
- Completed tier data retained but not shareable after refund
- Cannot re-purchase same subscription for 30 days after refund
- Repeat refund requests flagged for fraud review

**Consequence:** Multiple refunds result in payment method ban.

---

#### Rule C3: No Multi-Account Farming
**What:** Cannot create multiple accounts to bypass subscription limits.

**Why:** Prevents abuse of free tier limits and VIP application process.

**Enforcement:**
- Email verification required
- Phone number verification (one number = one account)
- Device fingerprinting
- IP address monitoring
- Duplicate profile photo detection

**Consequence:** Duplicate accounts suspended, primary account warned.

---

### D. VIP & Expert System

#### Rule D1: No Self-Serve VIP Browsing
**What:** VIP users cannot browse and message on their own. Must go through expert.

**Why:** VIP is a concierge service, not premium browsing access.

**Enforcement:**
```javascript
if (user.subscription === 'vip') {
  discoverPage.disabled = true;
  showMessage('Your expert handles match searching. Check VIP Dashboard.');
}
```

**Consequence:** Discover page redirects to VIP dashboard.

---

#### Rule D2: VIP Cannot Initiate with Lower Tiers
**What:** VIP users cannot send Show Interest to Free/Premium users.

**Why:** Maintains tier hierarchy and prevents VIP "slumming."

**Enforcement:**
```javascript
if (currentUser.subscription === 'vip' && targetUser.subscription !== 'vip') {
  showWarning('VIP users can only match with other VIP members.');
  showInterestButton.disabled = true;
}
```

**Consequence:** Show Interest button disabled, upgrade prompt shown to target user.

---

#### Rule D3: Expert Data Isolation (Zero Exceptions)
**What:** VIP Experts can ONLY access assigned clients. No search, no browse.

**Why:** Protects VIP clients from freelance expert data breaches.

**Enforcement:**
- Database queries filtered by VIPAssignment table
- API endpoints validate assignment before returning data
- UI hides unassigned client navigation
- Audit logs track all access attempts
- Automatic suspension after 3 unauthorized access attempts

**Consequence:** Expert account suspended, clients reassigned.

See [vip_expert_isolation.md](../Admin%20System/vip_expert_isolation.md) for technical implementation.

---

#### Rule D4: No Expert Client Poaching
**What:** Experts cannot contact ex-clients after assignment ends.

**Why:** Prevents experts from recruiting clients outside the platform.

**Enforcement:**
- Expert contracts prohibit external contact
- Clients warned that experts are platform contractors
- Client contact info never exposed to experts
- Communication only through platform

**Consequence:** Expert contract termination, legal action for violations.

---

### E. Safety & Moderation

#### Rule E1: Zero Tolerance for Harassment
**What:** Repeated unwanted contact results in immediate suspension.

**Why:** Protects users from persistent harassment.

**Violations:**
- Multiple Show Interest requests after block
- Abusive messages
- Creating new accounts to contact blocker
- Off-platform stalking/contact

**Enforcement:**
- First report: Warning + 30-day suspension
- Second report: 90-day suspension
- Third report: Permanent ban + device block

**Appeal:** Users can appeal bans, but burden of proof is on them.

---

#### Rule E2: No Fake Profiles or Catfishing
**What:** Profile photos must be of the user, not stock photos or someone else.

**Why:** Prevents deception and catfishing.

**Enforcement:**
- Reverse image search on uploaded photos
- Moderator photo review
- Tier 5 Video KYC for VIP (face match)
- User reports trigger re-verification

**Consequence:**
- First offense: Photo rejected, warning issued
- Second offense: Account suspended pending verification
- Third offense: Permanent ban

---

#### Rule E3: No Commercial Activity
**What:** Platform is for matchmaking only, not business networking or promotion.

**Why:** Prevents spam and maintains focus on relationships.

**Violations:**
- Promoting businesses in profile
- Selling services via messages
- Multi-level marketing recruitment
- Affiliate link sharing

**Enforcement:**
- Automated keyword detection ("buy," "join my team," "business opportunity")
- User reports trigger review
- Profile bio scanned for commercial language

**Consequence:**
- First offense: Profile edit required
- Second offense: 30-day suspension
- Third offense: Permanent ban

---

#### Rule E4: No Cross-Platform Solicitation
**What:** Cannot share social media handles, phone, or external contact before EDT unlocks it.

**Why:** Prevents circumventing Show Interest requirement.

**Enforcement:**
- Contact info fields only visible at Tier 2+ EDT
- Messages scanned for phone numbers, Instagram handles, etc.
- Sharing external contact info in messages triggers warning

**Consequence:**
- First offense: Warning, message edited/removed
- Repeat offenses: Account suspension

---

### F. Data & Privacy

#### Rule F1: No Data Scraping
**What:** Automated access to profiles is prohibited.

**Why:** Protects user privacy and prevents competitive intelligence gathering.

**Enforcement:**
- Rate limiting on API endpoints
- CAPTCHA on profile views (if suspicious activity)
- Bot detection (headless browser detection)
- IP blocking for scraping patterns

**Consequence:** IP ban, legal action for commercial scraping.

---

#### Rule F2: No Profile Data Export for Marketing
**What:** User profile data cannot be exported by admins for marketing purposes.

**Why:** GDPR/NDPR compliance, user trust.

**Enforcement:**
- Admin data export requires Data Protection Officer approval
- Audit logs track all data exports
- Export limited to anonymized analytics only
- Individual user data exports only for account deletion requests

**Consequence:** Admin termination for unauthorized data export.

---

#### Rule F3: Right to Deletion with Grace Period
**What:** Users can request account deletion, but there's a 30-day grace period.

**Why:** Prevents impulsive deletions, allows recovery from hacking.

**Enforcement:**
```javascript
// User requests deletion
user.deletionRequestedAt = Date.now();
user.deletionScheduledFor = Date.now() + (30 * 24 * 60 * 60 * 1000); // 30 days

// During grace period
user.accountStatus = 'pending_deletion';
user.profileVisible = false; // Hidden from discover
user.messagesDisabled = true; // Cannot send/receive

// After 30 days
deleteUserData(user.id);
```

**Consequence:** Account hidden but recoverable for 30 days.

See [right_to_deletion.md](right_to_deletion.md) for full procedure.

---

## Implementation Checklist

### Frontend (React Prototype)
- [ ] EDT calculation enforced on all profile views
- [ ] Show Interest button disabled during cooldown
- [ ] Tier completion UI respects subscription ceiling
- [ ] VIP users cannot access Discover page
- [ ] Symmetric revocation warning modal

### Backend (Rails Production)
- [ ] Database-level EDT filtering
- [ ] Cooldown enforcement in relationship model
- [ ] Subscription ceiling validation
- [ ] VIP Expert isolation middleware
- [ ] Device fingerprinting for multi-account detection

### Moderation Tools
- [ ] Reverse image search integration
- [ ] Automated keyword detection for spam/commercial
- [ ] Block evasion detection dashboard
- [ ] Expert isolation violation alerts
- [ ] Audit log viewer for security team

---

## Monitoring & Alerts

### Real-Time Alerts (Notify Super Admin)
1. **VIP Expert Isolation Violation** - Expert attempts to access unassigned client
2. **Multi-Account Creation** - Same device/phone creates multiple accounts
3. **Block Evasion Attempt** - Blocked user creates new account
4. **Tier Ceiling Bypass Attempt** - Free user tries to complete Tier 3

### Daily Reports
1. Show Interest decline patterns (detect harassment)
2. Refund request patterns (detect fraud)
3. Profile photo rejection rates (detect fake profiles)
4. Downgrade-then-refund patterns (detect exploitation)

### Monthly Audits
1. Expert access logs (verify isolation compliance)
2. Subscription downgrade patterns (detect tier completion farming)
3. Cooldown violation attempts (detect persistent harassers)
4. Data export logs (verify GDPR compliance)

---

## Consequences Matrix

| Violation Type | First Offense | Second Offense | Third Offense |
|----------------|---------------|----------------|---------------|
| **Cooldown bypass** | Warning | 30-day suspension | Permanent ban |
| **Fake profile/catfish** | Photo rejection + warning | Account suspension | Permanent ban |
| **Harassment** | Warning + 30-day suspension | 90-day suspension | Permanent ban + device block |
| **Commercial activity** | Profile edit required | 30-day suspension | Permanent ban |
| **Multi-accounting** | Duplicate accounts deleted | Primary account suspended | Permanent ban |
| **VIP Expert isolation violation** | Account suspended | Contract terminated | Legal action |
| **Data scraping** | IP warning | IP ban | Legal action |
| **Refund exploitation** | Refund processed | 30-day purchase cooldown | Payment method ban |

---

## Related Documentation

- [Safety System](safety_system.md) - Reporting and blocking
- [Content Moderation](content_moderation.md) - Photo/profile review
- [VIP Expert Isolation](../Admin%20System/vip_expert_isolation.md) - Technical isolation
- [Tier System](../Global%20Context/tier_system.md) - Tier definitions and EDT
- [Show Interest Flow](../Technical%20Specifications/show_interest_flow.md) - Interaction gating

---

## Revision History

| Date | Version | Changes |
|------|---------|---------|
| 2026-02-27 | 1.0.0 | Initial comprehensive anti-gravity rules |

---

**Document Owner:** Security & Trust Team
**Legal Review:** Data Protection Officer
**Last Reviewed:** 2026-02-27
**Next Review:** 2026-03-27 (Monthly for security-critical docs)
