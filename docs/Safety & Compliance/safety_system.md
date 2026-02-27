# Safety System Architecture

**Version:** 1.0.0
**Last Updated:** 2026-02-26
**Status:** Complete Specification
**Applies To:** All user types (Free, Premium, VIP)

---

## 1. Executive Summary

JoyMatcher's safety system is a comprehensive, multi-layered infrastructure designed to protect users in a trust-based matchmaking environment focused on serious, marriage-oriented relationships. This document specifies the complete reporting, blocking, and anti-harassment architecture, workflows, and UI specifications required to maintain platform integrity while respecting the tier-based disclosure model.

Unlike casual dating platforms, JoyMatcher's safety system must account for:
- Deep personal disclosure (health, family history, verified identity)
- Investment-based trust relationships
- VIP concierge matchmaking with human intermediaries
- Marriage-oriented user expectations
- Cross-tier interaction complexity

---

## 2. Safety System Philosophy

### 2.1 Core Principles

1. **Prevention First**: Proactive detection before harm occurs
2. **User Autonomy**: Users control their safety boundaries
3. **Swift Response**: Automated + human review within SLA
4. **Privacy Preservation**: Reports never expose reporter identity
5. **Proportional Action**: Penalties match severity and patterns
6. **Transparency**: Clear communication of actions and outcomes
7. **Tier-Aware**: Safety measures respect EDT and disclosure rules

### 2.2 Safety vs. Trust Model Integration

The safety system operates independently but respects:
- EDT visibility rules (blocking does not bypass tier restrictions)
- Show Interest gating (blocking prevents future interest)
- Cooldown periods (safety overrides standard cooldowns)
- VIP concierge flow (reports escalate to matchmakers)

---

## 3. Reporting System Architecture

### 3.1 Report Categories

#### 3.1.1 Primary Categories

| Category | Description | Severity | Auto-Action | Human Review Required |
|----------|-------------|----------|-------------|----------------------|
| **Harassment** | Unwanted contact, aggressive behavior | High | Temp restrict messaging | Yes |
| **Inappropriate Content** | Photos, messages violating guidelines | High | Content removed | Yes |
| **Scam/Fraud** | Financial solicitation, catfishing | Critical | Account suspended | Yes |
| **Impersonation** | Fake identity, stolen photos | Critical | Account suspended | Yes |
| **Hate Speech** | Discriminatory language | Critical | Account suspended | Yes |
| **Sexual Misconduct** | Unwanted advances, explicit content | Critical | Account suspended | Yes |
| **Safety Concern** | Threats, violence | Critical | Account suspended + escalation | Yes (Priority) |
| **Spam** | Repetitive messages, promotional content | Medium | Rate limit | No (automated) |
| **Profile Misrepresentation** | False information in tiers | Medium | Flag for verification | Yes |
| **Other** | Issues not covered above | Low | Queue for review | Yes |

#### 3.1.2 Subcategories by Context

**Message-Based Reports:**
- Harassing messages
- Inappropriate language
- Unsolicited explicit content
- Financial solicitation
- External contact requests (bypassing platform)
- Threats or intimidation

**Profile-Based Reports:**
- Inappropriate photos
- False information
- Suspected stolen photos
- Age misrepresentation
- Marital status misrepresentation
- Verification fraud

**Behavior-Based Reports:**
- Persistent unwanted contact
- Coordinated harassment
- Stalking behavior
- Off-platform harassment mention

---

### 3.2 Report Submission Flow

#### 3.2.1 Entry Points

Users can report from:
1. **Profile View**: Flag icon in header
2. **Message Thread**: Three-dot menu → "Report"
3. **Show Interest Notification**: Report option before accepting
4. **Search/Discovery**: Flag on profile card
5. **Safety Center**: General report without context

#### 3.2.2 Report Form Specification

```
┌─────────────────────────────────────────┐
│ Report [User Display Name]              │
├─────────────────────────────────────────┤
│                                         │
│ Why are you reporting this person?     │
│                                         │
│ ○ Harassment or bullying               │
│ ○ Inappropriate photos or messages     │
│ ○ Scam or fraud attempt                │
│ ○ Fake profile or impersonation        │
│ ○ Hate speech or discrimination        │
│ ○ Sexual misconduct                    │
│ ○ Safety concern or threat             │
│ ○ Spam                                 │
│ ○ False profile information            │
│ ○ Other                                │
│                                         │
│ [Next]                                  │
└─────────────────────────────────────────┘
```

**Step 2: Context Details**

```
┌─────────────────────────────────────────┐
│ Provide Details (Optional)              │
├─────────────────────────────────────────┤
│                                         │
│ ┌─────────────────────────────────────┐ │
│ │ Help us understand what happened... │ │
│ │                                     │ │
│ │                                     │ │
│ │                                     │ │
│ └─────────────────────────────────────┘ │
│ 0/500 characters                        │
│                                         │
│ □ Block this person                     │
│ □ Delete our conversation               │
│                                         │
│ [Back]              [Submit Report]     │
└─────────────────────────────────────────┘
```

**Step 3: Confirmation**

```
┌─────────────────────────────────────────┐
│         Report Submitted                │
├─────────────────────────────────────────┤
│                                         │
│ Thank you for helping keep JoyMatcher  │
│ safe. Our team will review this report │
│ within 24 hours.                        │
│                                         │
│ Your safety is important:               │
│                                         │
│ • This person cannot see your report   │
│ • You can block them anytime           │
│ • We'll update you on actions taken    │
│                                         │
│ Report ID: #SAFE-20260226-A8F2         │
│                                         │
│ [View Safety Center]  [Done]            │
└─────────────────────────────────────────┘
```

#### 3.2.3 Data Captured in Report

```javascript
const reportSchema = {
  reportId: "SAFE-20260226-A8F2",
  timestamp: "2026-02-26T14:32:00Z",

  // Reporter Information
  reporterId: 12345,
  reporterSubscription: "premium",
  reporterCompletedTier: 3,

  // Reported User Information
  reportedUserId: 67890,
  reportedUserSubscription: "free",
  reportedUserCompletedTier: 2,

  // Relationship Context
  relationshipStatus: "accepted", // none | pending | accepted | declined | cooldown
  effectiveDisclosureTier: 2,
  messageHistory: true,
  messageCount: 24,
  conversationDuration: "8 days",

  // Report Details
  category: "harassment",
  subcategory: "persistent_unwanted_contact",
  description: "User text content...",
  reportSource: "message_thread", // profile_view | message_thread | notification | discovery

  // Actions Taken by Reporter
  blockedAtReport: true,
  deletedConversation: false,

  // Evidence (Automated Capture)
  messageSnapshot: [
    { id: 1234, timestamp: "...", content: "..." },
    { id: 1235, timestamp: "...", content: "..." }
  ],
  profileSnapshot: { /* profile data at time of report */ },

  // Review Status
  reviewStatus: "pending", // pending | in_review | resolved | escalated
  assignedReviewer: null,
  resolutionAction: null,
  resolutionNotes: null,
  closedAt: null
};
```

---

### 3.3 Report Review Workflow

#### 3.3.1 Triage Process

**Automated Triage (Immediate):**
1. System checks for critical keywords
2. Pattern matching against known violations
3. Cross-references with previous reports
4. Assigns priority score (1-5)

**Priority Levels:**
- **P1 (Critical)**: Safety threats, violence → Review within 1 hour
- **P2 (High)**: Sexual misconduct, scams → Review within 4 hours
- **P3 (Medium)**: Harassment, inappropriate content → Review within 24 hours
- **P4 (Low)**: Profile issues, spam → Review within 72 hours
- **P5 (Routine)**: Other → Review within 7 days

**Auto-Actions Pending Review:**
- P1-P2: Temporary message restriction (24 hours)
- P1 + keyword match: Temporary account suspension
- Multiple reports (3+): Escalate to P2, restrict messaging

#### 3.3.2 Human Review Process

**Review Dashboard Fields:**
```
┌─────────────────────────────────────────────────────┐
│ Report #SAFE-20260226-A8F2          [Priority: P2]  │
├─────────────────────────────────────────────────────┤
│                                                     │
│ Category: Harassment (Persistent unwanted contact) │
│ Reported: 2 hours ago                              │
│                                                     │
│ REPORTER                    REPORTED USER          │
│ User #12345                 User #67890            │
│ Premium, Tier 3            Free, Tier 2            │
│ EDT: 2                                             │
│ Message History: 24 messages over 8 days          │
│                                                     │
│ REPORTER DESCRIPTION:                              │
│ "Despite declining their advances and asking them │
│ to stop, they continue messaging daily..."         │
│                                                     │
│ MESSAGE CONTEXT (Last 5):                          │
│ [Message list with timestamps]                     │
│                                                     │
│ PROFILE SNAPSHOT:                                  │
│ [Profile data at time of report]                   │
│                                                     │
│ HISTORY:                                           │
│ • 2 previous reports (different users)            │
│ • 1 previous warning (spam, 30 days ago)          │
│                                                     │
│ RECOMMENDED ACTION: ⚠ 7-day suspension             │
│                                                     │
│ REVIEWER ACTIONS:                                  │
│ ○ No violation - dismiss                          │
│ ○ Warning (first offense)                         │
│ ○ 24-hour restriction                             │
│ ○ 7-day suspension                                │
│ ○ 30-day suspension                               │
│ ○ Permanent ban                                   │
│ ○ Escalate to senior review                       │
│                                                     │
│ Reviewer Notes:                                    │
│ ┌───────────────────────────────────────────────┐ │
│ │                                               │ │
│ └───────────────────────────────────────────────┘ │
│                                                     │
│ □ Notify reporter of outcome                       │
│ □ Send warning to reported user                    │
│                                                     │
│ [Submit Decision]                                   │
└─────────────────────────────────────────────────────┘
```

**Reviewer Checklist:**
- [ ] Review full conversation context
- [ ] Check reporter's report history (false reports?)
- [ ] Check reported user's violation history
- [ ] Assess severity against guidelines
- [ ] Consider pattern vs. isolated incident
- [ ] Verify EDT and tier completion (for context)
- [ ] Document decision rationale
- [ ] Select appropriate penalty
- [ ] Queue user notification

---

### 3.4 Enforcement Actions

#### 3.4.1 Penalty Progression

**First Offense:**
- **Minor (spam, single inappropriate message)**: Warning
- **Moderate (harassment, inappropriate photo)**: 24-hour restriction
- **Severe (scam, sexual misconduct)**: 7-day suspension
- **Critical (threats, safety concerns)**: Permanent ban

**Repeat Offenses:**
- 2nd offense: Escalate one level
- 3rd offense: 30-day suspension minimum
- 4th offense: Permanent ban

#### 3.4.2 Restriction Types

| Action | Messaging | Discovery | Profile Visibility | Tier Access | Duration |
|--------|-----------|-----------|-------------------|-------------|----------|
| **Warning** | ✓ | ✓ | ✓ | ✓ | Permanent record |
| **Message Restriction** | ✗ | ✓ | ✓ | ✓ | 24 hours - 7 days |
| **Account Suspension** | ✗ | ✗ | Hidden | ✓ (read-only) | 7-30 days |
| **Permanent Ban** | ✗ | ✗ | Deleted | ✗ | Permanent |

#### 3.4.3 User Notifications

**Warning Notification:**
```
┌─────────────────────────────────────────┐
│      Community Guidelines Warning       │
├─────────────────────────────────────────┤
│                                         │
│ We received a report about your recent │
│ activity on JoyMatcher.                │
│                                         │
│ Issue: Inappropriate messaging         │
│                                         │
│ What this means:                       │
│ • This is an official warning          │
│ • No restrictions at this time         │
│ • Future violations may result in      │
│   suspension or ban                    │
│                                         │
│ What you should do:                    │
│ • Review our Community Guidelines      │
│ • Be respectful in all interactions   │
│ • Report issues rather than retaliate  │
│                                         │
│ This warning remains on your record.   │
│                                         │
│ [Review Guidelines]  [I Understand]     │
└─────────────────────────────────────────┘
```

**Suspension Notification:**
```
┌─────────────────────────────────────────┐
│       Account Temporarily Suspended     │
├─────────────────────────────────────────┤
│                                         │
│ Your account has been suspended for    │
│ violating our Community Guidelines.    │
│                                         │
│ Violation: Harassment                  │
│ Duration: 7 days                       │
│ Ends: March 5, 2026                    │
│                                         │
│ During suspension:                     │
│ • You cannot send or receive messages  │
│ • Your profile is hidden from discovery│
│ • You can view your data (read-only)   │
│                                         │
│ After suspension:                      │
│ • Your account will be automatically   │
│   restored                             │
│ • Further violations will result in    │
│   permanent ban                        │
│                                         │
│ If you believe this is an error:       │
│ [Appeal This Decision]                  │
│                                         │
│ [Close]                                 │
└─────────────────────────────────────────┘
```

---

## 4. Blocking System

### 4.1 Block Types

**User-Initiated Block:**
- Can block anyone, anytime
- No reason required
- Immediate effect
- Reversible

**System-Initiated Block:**
- Applied after suspension/ban
- Prevents circumvention
- Not reversible by user
- Documented in admin panel

### 4.2 Block Flow

**Initiation Points:**
1. Profile view → Three-dot menu → Block
2. Message thread → Three-dot menu → Block
3. Report submission → Checkbox option
4. Show Interest → Decline + Block

**Confirmation Modal:**
```
┌─────────────────────────────────────────┐
│ Block [User Display Name]?              │
├─────────────────────────────────────────┤
│                                         │
│ Blocking means:                        │
│                                         │
│ • They can't message you               │
│ • They can't see your profile          │
│ • You won't see their profile          │
│ • Your conversation will be hidden     │
│                                         │
│ You can unblock them later from        │
│ Settings → Blocked Users.              │
│                                         │
│ □ Also delete our conversation         │
│                                         │
│ [Cancel]              [Block]           │
└─────────────────────────────────────────┘
```

### 4.3 Block Effects

**For Blocker:**
- Blocked user disappears from discovery
- Conversation hidden (not deleted unless chosen)
- Show Interest from blocked user automatically declined
- No notifications about blocked user

**For Blocked User:**
- Cannot find blocker in search/discovery
- Cannot send Show Interest
- Cannot message (if previously connected)
- No indication they were blocked (sees profile as "unavailable")

**System Behavior:**
- EDT calculation skipped (no relationship)
- Cooldown timer removed (block supersedes)
- Previous tier sharing revoked
- Analytics tracked but user-agnostic

### 4.4 Block Management

**Blocked Users List:**
```
┌─────────────────────────────────────────┐
│ Settings → Privacy → Blocked Users      │
├─────────────────────────────────────────┤
│                                         │
│ You have blocked 3 users                │
│                                         │
│ ┌─────────────────────────────────────┐ │
│ │ [User Photo]                        │ │
│ │ Display Name                        │ │
│ │ Blocked: Jan 15, 2026              │ │
│ │                     [Unblock]       │ │
│ └─────────────────────────────────────┘ │
│                                         │
│ ┌─────────────────────────────────────┐ │
│ │ [User Photo]                        │ │
│ │ Display Name                        │ │
│ │ Blocked: Feb 3, 2026               │ │
│ │                     [Unblock]       │ │
│ └─────────────────────────────────────┘ │
│                                         │
│ ┌─────────────────────────────────────┐ │
│ │ [User Photo]                        │ │
│ │ Display Name                        │ │
│ │ Blocked: Feb 20, 2026              │ │
│ │                     [Unblock]       │ │
│ └─────────────────────────────────────┘ │
│                                         │
└─────────────────────────────────────────┘
```

**Unblock Confirmation:**
```
┌─────────────────────────────────────────┐
│ Unblock [User Display Name]?            │
├─────────────────────────────────────────┤
│                                         │
│ They will be able to:                  │
│ • See your profile again               │
│ • Send you Show Interest               │
│ • Message you (if previously connected)│
│                                         │
│ You can block them again anytime.      │
│                                         │
│ [Cancel]              [Unblock]         │
└─────────────────────────────────────────┘
```

---

## 5. Anti-Harassment Infrastructure

### 5.1 Harassment Detection Patterns

**Message-Level Detection:**
- Excessive message frequency (>10/day to same user)
- Repeated messages after no response (>5)
- Keyword matching (explicit, threatening, financial)
- External contact requests (phone, social media, email)
- Copy-paste patterns (same message to multiple users)

**Behavior-Level Detection:**
- Multiple declined Show Interests (>5 in 24 hours)
- Multiple reports from different users (>2 in 7 days)
- Profile view stalking (same profile >20 times/day)
- Creating multiple accounts (device fingerprinting)
- Rapid account creation after ban

### 5.2 Automated Interventions

**Rate Limiting:**
```javascript
const rateLimits = {
  showInterest: {
    free: { max: 5, period: "24h" },
    premium: { max: 20, period: "24h" },
    vip: { max: 50, period: "24h" }
  },
  messages: {
    firstMessage: { max: 1, period: "1h", perUser: true },
    unansweredMessages: { max: 3, perUser: true, resetOnReply: true },
    totalMessages: { max: 100, period: "24h" }
  },
  profileViews: {
    sameProfile: { max: 20, period: "24h", perUser: true }
  },
  detailRequests: {
    max: 10,
    period: "24h"
  }
};
```

**Progressive Cooldowns:**
- 1st rate limit hit: 15-minute cooldown
- 2nd hit (within 24h): 1-hour cooldown
- 3rd hit (within 7 days): 24-hour cooldown
- 4th hit: Escalate to review

**Automated Warnings:**
```
┌─────────────────────────────────────────┐
│         Slow Down                       │
├─────────────────────────────────────────┤
│                                         │
│ You're sending Show Interest very      │
│ frequently. Take time to review        │
│ profiles carefully.                    │
│                                         │
│ Quality connections matter more than   │
│ quantity.                              │
│                                         │
│ You can send more in: 15 minutes      │
│                                         │
│ [Okay]                                  │
└─────────────────────────────────────────┘
```

### 5.3 Cross-Platform Protection

**Device Fingerprinting:**
- Track device ID, browser fingerprint, IP address
- Flag suspicious patterns (VPN hopping, emulator use)
- Cross-reference with banned accounts

**Photo Verification:**
- Reverse image search on uploaded photos
- Flag stock photos, celebrity photos, stolen images
- Require new photo if duplicate found elsewhere

**Email/Phone Verification:**
- Limit accounts per email/phone (max 3 lifetime)
- Require re-verification after multiple reports
- Flag disposable email services

---

## 6. VIP-Specific Safety

### 6.1 Enhanced Vetting

VIP users undergo:
- Tier 5 identity verification (mandatory)
- Background check option (recommended)
- Concierge interview (intent screening)
- Enhanced photo verification
- Social proof validation (LinkedIn, etc.)

### 6.2 Concierge-Mediated Reports

**VIP Report Flow:**
1. VIP reports via platform or direct to concierge
2. Concierge reviews immediately (1-hour SLA)
3. Concierge contacts VIP for additional context
4. Expedited resolution (same-day)
5. Personal follow-up from concierge

**VIP Protection Features:**
- Priority report review
- Direct concierge escalation
- Enhanced privacy (hidden from free users automatically)
- Pre-screening of introductions
- Verified identity badge (deters scammers)

---

## 7. Safety Center (User Hub)

### 7.1 Safety Center Structure

```
┌─────────────────────────────────────────┐
│         Safety Center                   │
├─────────────────────────────────────────┤
│                                         │
│ Your Safety                             │
│ ├─ Safety Tips                          │
│ ├─ Report Abuse                         │
│ ├─ My Reports (2 active)                │
│ └─ Blocked Users (3)                    │
│                                         │
│ Guidelines                              │
│ ├─ Community Guidelines                 │
│ ├─ Photo Guidelines                     │
│ └─ Messaging Guidelines                 │
│                                         │
│ Resources                               │
│ ├─ First Date Safety                    │
│ ├─ Recognizing Scams                    │
│ ├─ Privacy Best Practices               │
│ └─ Emergency Resources                  │
│                                         │
│ Support                                 │
│ └─ Contact Support Team                 │
│                                         │
└─────────────────────────────────────────┘
```

### 7.2 My Reports Dashboard

```
┌─────────────────────────────────────────┐
│ My Reports                              │
├─────────────────────────────────────────┤
│                                         │
│ Active Reports (2)                      │
│                                         │
│ ┌─────────────────────────────────────┐ │
│ │ Report #SAFE-20260226-A8F2          │ │
│ │ Category: Harassment                │ │
│ │ Status: Under Review                │ │
│ │ Submitted: Feb 26, 2026             │ │
│ │                                     │ │
│ │ We're reviewing this report and will│ │
│ │ update you within 24 hours.         │ │
│ └─────────────────────────────────────┘ │
│                                         │
│ ┌─────────────────────────────────────┐ │
│ │ Report #SAFE-20260224-B3D1          │ │
│ │ Category: Inappropriate Content     │ │
│ │ Status: Resolved                    │ │
│ │ Submitted: Feb 24, 2026             │ │
│ │                                     │ │
│ │ ✓ Action taken: Content removed and│ │
│ │   user warned.                      │ │
│ └─────────────────────────────────────┘ │
│                                         │
│ Closed Reports (1)                      │
│ [View All]                              │
│                                         │
└─────────────────────────────────────────┘
```

---

## 8. Technical Implementation

### 8.1 Database Schema

```sql
-- Reports Table
CREATE TABLE safety_reports (
  report_id VARCHAR(50) PRIMARY KEY,
  reporter_user_id INTEGER NOT NULL,
  reported_user_id INTEGER NOT NULL,
  category VARCHAR(50) NOT NULL,
  subcategory VARCHAR(50),
  description TEXT,
  report_source VARCHAR(50),

  -- Context
  relationship_status VARCHAR(20),
  effective_disclosure_tier INTEGER,
  message_count INTEGER,
  conversation_duration_days INTEGER,

  -- Evidence
  message_snapshot JSONB,
  profile_snapshot JSONB,

  -- Actions
  blocked_at_report BOOLEAN DEFAULT FALSE,
  deleted_conversation BOOLEAN DEFAULT FALSE,

  -- Review
  review_status VARCHAR(20) DEFAULT 'pending',
  priority_level INTEGER,
  assigned_reviewer_id INTEGER,
  reviewed_at TIMESTAMP,
  resolution_action VARCHAR(50),
  resolution_notes TEXT,

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  FOREIGN KEY (reporter_user_id) REFERENCES users(id),
  FOREIGN KEY (reported_user_id) REFERENCES users(id),
  FOREIGN KEY (assigned_reviewer_id) REFERENCES admin_users(id)
);

-- Blocks Table
CREATE TABLE user_blocks (
  id SERIAL PRIMARY KEY,
  blocker_user_id INTEGER NOT NULL,
  blocked_user_id INTEGER NOT NULL,
  block_type VARCHAR(20) NOT NULL, -- 'user_initiated' | 'system_initiated'
  reason VARCHAR(100),
  deleted_conversation BOOLEAN DEFAULT FALSE,

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  FOREIGN KEY (blocker_user_id) REFERENCES users(id),
  FOREIGN KEY (blocked_user_id) REFERENCES users(id),
  UNIQUE (blocker_user_id, blocked_user_id)
);

-- Violations Table
CREATE TABLE user_violations (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL,
  report_id VARCHAR(50),
  violation_type VARCHAR(50) NOT NULL,
  severity VARCHAR(20) NOT NULL, -- 'minor' | 'moderate' | 'severe' | 'critical'

  -- Enforcement
  action_taken VARCHAR(50) NOT NULL, -- 'warning' | 'restriction' | 'suspension' | 'ban'
  restriction_start TIMESTAMP,
  restriction_end TIMESTAMP,

  -- Details
  violation_notes TEXT,
  reviewer_id INTEGER,
  appealed BOOLEAN DEFAULT FALSE,
  appeal_outcome VARCHAR(50),

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (report_id) REFERENCES safety_reports(report_id),
  FOREIGN KEY (reviewer_id) REFERENCES admin_users(id)
);

-- Rate Limiting Tracking
CREATE TABLE rate_limit_events (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL,
  action_type VARCHAR(50) NOT NULL,
  target_user_id INTEGER,
  timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  FOREIGN KEY (user_id) REFERENCES users(id)
);
```

### 8.2 API Endpoints

```javascript
// Report Submission
POST /api/safety/reports
{
  reportedUserId: 67890,
  category: "harassment",
  subcategory: "persistent_unwanted_contact",
  description: "...",
  blockUser: true,
  deleteConversation: false
}

// Get User Reports
GET /api/safety/reports/me
Response: [{ reportId, status, category, createdAt, outcome }]

// Block User
POST /api/safety/blocks
{
  blockedUserId: 67890,
  deleteConversation: true
}

// Unblock User
DELETE /api/safety/blocks/:blockedUserId

// Get Blocked Users
GET /api/safety/blocks/me
Response: [{ userId, displayName, blockedAt, photoUrl }]

// Check If Blocked (Internal)
GET /api/safety/blocks/check?userId=67890&targetUserId=12345
Response: { isBlocked: true, direction: "user_blocked_target" }

// Rate Limit Check (Internal)
POST /api/safety/rate-limit/check
{
  userId: 12345,
  action: "show_interest",
  targetUserId: 67890
}
Response: { allowed: true, remaining: 3, resetAt: "..." }
```

### 8.3 Frontend State Management

```javascript
// Safety Store (Redux/Context)
const safetyState = {
  blockedUsers: [
    { userId: 67890, displayName: "...", blockedAt: "...", photoUrl: "..." }
  ],
  myReports: [
    {
      reportId: "SAFE-20260226-A8F2",
      status: "under_review",
      category: "harassment",
      submittedAt: "...",
      outcome: null
    }
  ],
  rateLimits: {
    showInterest: { remaining: 3, resetAt: "..." },
    messages: { remaining: 97, resetAt: "..." }
  }
};

// Safety Middleware (Check before actions)
const safetyMiddleware = (action) => {
  switch (action.type) {
    case "SEND_SHOW_INTEREST":
      // Check if user is blocked
      if (isBlocked(action.targetUserId)) {
        return { error: "Cannot send to blocked user" };
      }
      // Check rate limit
      if (!checkRateLimit("show_interest")) {
        return { error: "Rate limit exceeded", resetAt: "..." };
      }
      break;

    case "SEND_MESSAGE":
      // Check if blocked
      // Check if EDT allows messaging
      // Check message rate limit
      // Check for harassment patterns
      break;
  }
};
```

---

## 9. Analytics & Monitoring

### 9.1 Safety Metrics Dashboard

**Key Performance Indicators:**
- Reports per 1000 active users (target: <5)
- Average resolution time (target: <24h for P3)
- Reporter satisfaction (post-resolution survey)
- False positive rate (appeals upheld / total actions)
- Repeat offender rate
- Block rate by user type (free/premium/vip)

**Trend Monitoring:**
- Report volume over time
- Category distribution
- Platform vs. off-platform escalation
- Harassment pattern emergence

### 9.2 Alert Triggers

**Automated Alerts:**
- P1 report submitted → Slack/email to safety team
- Multiple reports (3+) on same user → Escalate priority
- VIP report → Immediate concierge notification
- Keyword match (violence, suicide) → Immediate review + external resource alert
- Spike in reports (>50% increase week-over-week) → Investigate cause

---

## 10. Compliance & Legal

### 10.1 Report Retention

- Active reports: Indefinitely (legal compliance)
- Resolved reports: 7 years (litigation hold)
- Appeals: 7 years
- Automated logs: 1 year

### 10.2 Law Enforcement Requests

Process documented in `legal_compliance.md`.

**Summary:**
- Valid subpoena required
- Legal team review mandatory
- User notification (unless prohibited)
- Documented chain of custody

---

## 11. User Education

### 11.1 Safety Tips (Onboarding)

During Tier 1 completion:
```
┌─────────────────────────────────────────┐
│      Welcome to JoyMatcher              │
├─────────────────────────────────────────┤
│                                         │
│ Your safety is our priority.           │
│                                         │
│ Remember to:                           │
│ ✓ Keep conversations on platform       │
│ ✓ Never share financial information    │
│ ✓ Meet in public for first dates       │
│ ✓ Report suspicious behavior           │
│ ✓ Trust your instincts                 │
│                                         │
│ [Learn More]              [Continue]    │
└─────────────────────────────────────────┘
```

### 11.2 In-App Prompts

**Before Sharing Tier 4 (Health Data):**
```
⚠️ You're about to share sensitive health information.
Only share with people you trust. You can revoke
access anytime.
```

**Before Meeting Offline:**
```
💡 First date tips:
• Meet in a public place
• Tell a friend your plans
• Keep your phone charged
• Trust your instincts
```

---

## 12. Future Enhancements

### 12.1 Phase 2 Features

- **AI-Assisted Moderation**: NLP models for harassment detection
- **Photo Verification**: Advanced deepfake detection
- **Behavioral Biometrics**: Typing patterns, interaction rhythms
- **Peer Review System**: Trusted users flag content
- **Safety Score**: User-specific risk assessment

### 12.2 Phase 3 Features

- **Video Call Safety**: In-app video with recording consent
- **Background Checks**: Optional paid service
- **Mutual Contact Verification**: LinkedIn/social proof integration
- **Safety Circle**: Share date details with trusted contacts

---

## 13. Implementation Checklist

### Phase 1: Core Safety (Launch)
- [ ] Report submission flow (all categories)
- [ ] Block/unblock functionality
- [ ] Admin review dashboard
- [ ] Automated triage system
- [ ] Rate limiting infrastructure
- [ ] Email notifications (warnings, suspensions)
- [ ] Safety Center page
- [ ] Basic analytics dashboard

### Phase 2: Enhanced Protection (Post-Launch)
- [ ] Harassment pattern detection
- [ ] Device fingerprinting
- [ ] Photo reverse search
- [ ] VIP concierge integration
- [ ] Appeal system
- [ ] Safety tips in onboarding

### Phase 3: Advanced Features (6 Months)
- [ ] AI moderation
- [ ] Behavioral analytics
- [ ] Cross-platform detection
- [ ] Background check integration

---

## Appendix A: Community Guidelines (Summary)

**Respect & Safety:**
- Treat all users with respect
- No harassment, bullying, or threats
- Respect boundaries and consent
- Report concerning behavior

**Authenticity:**
- Use real photos and information
- No impersonation or catfishing
- Complete tiers truthfully
- Verify identity when eligible

**Communication:**
- Keep conversations appropriate
- No spam or solicitation
- No external contact requests before consent
- No financial requests

**Privacy:**
- Respect user privacy
- No sharing of private information
- No screenshots or recording without consent

---

## Appendix B: Reviewer Training Manual

**(Separate document: `reviewer_training.md`)**

Key topics:
- Understanding tier system and EDT
- Recognizing harassment patterns
- Cultural sensitivity in review
- Trauma-informed response
- Escalation criteria
- Documentation standards

---

**Document Control**
Owner: Trust & Safety Team
Review Cycle: Quarterly
Next Review: 2026-05-26
Classification: Internal

---

**Related Documentation:**
- `content_moderation.md` - Photo and profile review
- `spam_detection.md` - Automated pattern detection
- `legal_compliance.md` - Legal framework
- `data_management.md` - Data retention and deletion
