# Content Moderation Workflows

**Version:** 1.0.0
**Last Updated:** 2026-02-26
**Status:** Specification Complete
**Classification:** Operational Guide

---

## Overview

This document provides comprehensive, step-by-step workflows for content moderation on the JoyMatcher platform. Moderators are responsible for ensuring platform safety, enforcing community guidelines, and maintaining the trust-based environment that defines JoyMatcher.

---

## Core Moderation Principles

### 1. Trust-Preserving Moderation
- **Goal:** Remove harmful content while preserving authentic human connection
- **Approach:** Trust users' intentions unless evidence proves otherwise
- **Standard:** When in doubt, issue a warning before taking punitive action

### 2. Marriage-Intent Context
- **Remember:** JoyMatcher is for marriage-minded professionals
- **Higher Bar:** Expectations for respectful communication are higher than casual dating apps
- **Profile Standards:** Profiles must reflect serious marriage intent

### 3. Escalation Culture
- **Empowerment:** Moderators can handle most situations
- **Humility:** Escalate when unsure, especially for edge cases
- **Support:** Super Admin provides backup for complex decisions

### 4. Response Time Targets

| Report Type | Target Response Time | Maximum Response Time |
|-------------|---------------------|----------------------|
| Critical (harassment, threats, explicit content) | 2 hours | 4 hours |
| High (inappropriate photos, scams) | 4 hours | 12 hours |
| Medium (profile content, minor complaints) | 12 hours | 24 hours |
| Low (feature requests, general feedback) | 24 hours | 48 hours |

---

## Moderation Dashboard

### Queue Overview

```
┌────────────────────────────────────────────────────────────┐
│                  MODERATION DASHBOARD                      │
├────────────────────────────────────────────────────────────┤
│                                                            │
│  Pending Reports: 12          Photo Queue: 45             │
│  Flagged Messages: 3          Profile Reviews: 8          │
│                                                            │
│  Your Stats Today:                                         │
│  ├─ Reports Resolved: 18                                  │
│  ├─ Photos Approved: 67                                   │
│  ├─ Warnings Issued: 3                                    │
│  └─ Suspensions: 1                                        │
│                                                            │
├────────────────────────────────────────────────────────────┤
│                     PRIORITY QUEUE                         │
├────────────────────────────────────────────────────────────┤
│  🔴 CRITICAL (0)                                          │
│  🟠 HIGH (3)                                              │
│  🟡 MEDIUM (7)                                            │
│  🟢 LOW (2)                                               │
└────────────────────────────────────────────────────────────┘
```

### Navigation

- **Reports Queue** (`/admin/moderation/reports`)
- **Photo Moderation** (`/admin/moderation/photos`)
- **Profile Reviews** (`/admin/moderation/profiles`)
- **Flagged Messages** (`/admin/moderation/messages`)
- **User Search** (`/admin/moderation/users/search`)

---

## Workflow 1: Photo Moderation

### Overview
All user photos must be manually reviewed before appearing on profiles. This ensures quality, authenticity, and safety standards.

### Photo Approval Standards

**✅ APPROVE if:**
- Clear face photo (primary photo must show face)
- Well-lit and in focus
- User is fully clothed
- Professional or casual setting
- No suggestive poses
- No filters that obscure identity (beauty filters OK)
- No group photos (where user is unclear)
- Photo appears authentic (not stock photo)

**❌ REJECT if:**
- No face visible or face obscured
- Blurry or poor quality
- Sexually suggestive (cleavage, underwear, bedroom poses)
- Shirtless photos (men or women)
- Photos of children only (child present with adult is OK)
- Memes, cartoons, or non-human subjects
- Watermarks from other dating sites
- Screenshots or heavily edited photos
- Group photos where user is unclear
- Weapons visible
- Drugs or alcohol prominently featured
- Offensive gestures or symbols

**⚠️ REQUEST RE-UPLOAD if:**
- Acceptable but low quality
- Lighting too dark
- Angle makes verification difficult
- User is wearing sunglasses (OK for secondary photos, not primary)

### Step-by-Step Process

#### 1. Access Photo Queue

```
Navigate: Admin Dashboard → Photo Moderation
Filter: Pending Review
Sort: Oldest First
```

#### 2. Review Individual Photo

For each photo in queue:

```
┌────────────────────────────────────────────────────────────┐
│  PHOTO REVIEW                                              │
├────────────────────────────────────────────────────────────┤
│                                                            │
│  User: Amara O. (ID: 12345)                               │
│  Subscription: Premium                                     │
│  Photo Type: Primary Profile Photo                        │
│  Uploaded: 2026-02-26 08:30 AM                            │
│                                                            │
│  ┌──────────────────────────────────────────────┐        │
│  │                                               │        │
│  │            [PHOTO PREVIEW]                    │        │
│  │                                               │        │
│  └──────────────────────────────────────────────┘        │
│                                                            │
│  Previous Photos: 2 approved, 0 rejected                  │
│  Profile Status: Active                                   │
│  Account Standing: Good                                   │
│                                                            │
├────────────────────────────────────────────────────────────┤
│  ACTIONS:                                                  │
│  [ Approve ]  [ Reject ]  [ Request Re-upload ]           │
│                                                            │
│  Rejection Reason:                                        │
│  [ ] Face not visible                                     │
│  [ ] Inappropriate content                                │
│  [ ] Poor quality                                         │
│  [ ] Not a photo of user                                  │
│  [ ] Other: _____________________                         │
└────────────────────────────────────────────────────────────┘
```

#### 3. Make Decision

**If APPROVE:**
1. Click "Approve"
2. Photo goes live on user's profile
3. User receives notification: "Your photo has been approved"

**If REJECT:**
1. Select rejection reason (required)
2. Click "Reject"
3. Photo is deleted
4. User receives notification with reason
5. User can upload a replacement

**If REQUEST RE-UPLOAD:**
1. Select "Request Re-upload"
2. Add specific guidance (e.g., "Please upload a clearer photo with better lighting")
3. Photo is deleted
4. User receives notification with guidance

#### 4. Handle Edge Cases

**Borderline Sexy (e.g., form-fitting dress, beach photo):**
- If clothing is appropriate and not overtly sexual → Approve
- If pose is suggestive or primary focus is body → Reject
- If unsure → Request opinion from another moderator or escalate

**Cultural Attire (e.g., hijab, traditional wear):**
- Always approve if face is visible and meets other standards
- Respect cultural and religious expressions
- If face fully covered → Request photo showing face

**Professional Headshots:**
- Always approve (encouraged)
- Exception: Watermarked photos from other sites → Reject

#### 5. Log Decision

System automatically logs:
- Moderator ID
- Decision (approve/reject/request re-upload)
- Reason (if rejected)
- Timestamp
- User ID and photo ID

---

## Workflow 2: Profile Content Review

### Overview
Profile text content (bio, tier responses) must be reviewed for:
- Appropriateness
- Authenticity
- Marriage intent alignment
- Community guideline compliance

### Profile Review Triggers

Profiles are flagged for review when:
1. **Automatic Triggers:**
   - Contains banned keywords (profanity, sexual terms, scam indicators)
   - Unusually short responses (<10 words for Tier 2+ questions)
   - Copy-pasted responses detected (same text across multiple fields)
   - External contact info detected (phone, email, social media handles)
   - Links to external websites
2. **User Reports:**
   - Another user reports profile as inappropriate
   - Multiple users skip/block this user (pattern detection)
3. **Random Audit:**
   - 5% of all profiles randomly selected for quality assurance

### Profile Approval Standards

**✅ APPROVE if:**
- Responses are thoughtful and authentic
- Content reflects marriage intent
- Grammar is reasonable (not perfect, but understandable)
- Tone is respectful and professional
- Personal details seem genuine
- No red flags for scams or inappropriate behavior

**❌ REJECT/EDIT if:**
- Profanity or vulgar language
- Sexual or suggestive content
- Contact information (phone, email, social media)
- Links to external sites
- Promotional content or spam
- Discriminatory or offensive statements
- Obvious lies or catfishing indicators
- Requests for money or financial information
- Copy-pasted generic responses

### Step-by-Step Process

#### 1. Access Profile Review Queue

```
Navigate: Admin Dashboard → Profile Reviews
Filter: Flagged Profiles
Sort: Priority (Critical → Low)
```

#### 2. Review Flagged Profile

```
┌────────────────────────────────────────────────────────────┐
│  PROFILE REVIEW: Chidi A. (ID: 67890)                     │
├────────────────────────────────────────────────────────────┤
│  Flag Reason: Banned keyword detected ("contact me")       │
│  Tier Progress: Tier 3 completed                           │
│  Subscription: Free                                        │
│  Account Age: 14 days                                      │
│  Reports: 0                                                │
│                                                            │
├────────────────────────────────────────────────────────────┤
│  TIER 1: BASIC INFO                                        │
│  ├─ Age: 32                                               │
│  ├─ Location: Lagos, Nigeria                              │
│  └─ Occupation: Software Engineer                         │
│                                                            │
│  TIER 2: LIFESTYLE & FAITH                                │
│  ├─ Religious Views: Christian (practicing)               │
│  ├─ Denominational Preference: Open to all                │
│  └─ Prayer Habits: "I pray daily and attend church        │
│     weekly. Faith is the foundation of my life."          │
│                                                            │
│  TIER 3: MARRIAGE VISION                                  │
│  ├─ Why Marriage Now: "I'm ready to settle down and       │
│     build a family. Contact me on WhatsApp: +234..."      │
│  └─ FLAGGED TEXT: "Contact me on WhatsApp"                │
│                                                            │
│  ├─ Ideal Marriage: "A partnership built on mutual        │
│     respect, love, and shared faith in God."              │
│  └─ Deal Breakers: "Someone who doesn't respect my        │
│     faith or isn't ready for commitment."                 │
└────────────────────────────────────────────────────────────┘
```

#### 3. Make Decision

**Case 1: Minor Violation (Contact Info)**
- **Action:** Edit out the violation
- **Process:**
  1. Click "Edit Profile"
  2. Remove contact information: "I'm ready to settle down and build a family."
  3. Click "Save Changes"
  4. Click "Approve Profile"
  5. Send warning to user:

```
Subject: Profile Updated - Community Guidelines Reminder

Hi Chidi,

We've reviewed your profile and removed contact information you included.

On JoyMatcher, we ask that you don't share phone numbers, email addresses,
or social media handles in your profile. This protects your privacy and
ensures all connections happen through our secure platform.

Your updated profile is now live. Please review our Community Guidelines
to avoid future issues.

Best regards,
JoyMatcher Moderation Team
```

**Case 2: Major Violation (Inappropriate Content)**
- **Action:** Reject profile + issue warning
- **Process:**
  1. Click "Reject Profile"
  2. Select rejection reason
  3. Choose warning level: First Warning
  4. Click "Send Warning"
  5. User must re-write flagged content before profile goes live

**Case 3: Scam/Safety Concern**
- **Action:** Suspend user + escalate
- **Process:**
  1. Click "Suspend User"
  2. Duration: 30 days (or indefinite)
  3. Reason: "Suspected scam activity"
  4. Click "Escalate to Super Admin"
  5. Add notes with evidence
  6. Super Admin will review for permanent ban

#### 4. Handle Ambiguous Cases

**Example: Aggressive but Not Vulgar**

User writes: "I don't have time for games. If you're not serious, swipe left."

**Analysis:**
- Tone is harsh but not offensive
- Message reflects marriage intent (seriousness)
- No rule violation

**Decision:** Approve, but add private note suggesting softer tone in next review cycle

**Example: Cultural Misunderstanding**

User writes: "I want a submissive wife who respects her husband."

**Analysis:**
- May reflect cultural/religious views (common in some contexts)
- Could be interpreted as sexist by others
- Not explicitly violating guidelines

**Decision:**
- If part of broader respectful profile → Approve
- If rest of profile is problematic → Add note for monitoring
- If multiple reports → Consider asking user to rephrase for clarity

---

## Workflow 3: Handling User Reports

### Report Types & Severity

| Report Type | Severity | Initial Response |
|-------------|----------|------------------|
| Harassment/Threats | CRITICAL | Immediate review, potential suspension |
| Explicit Content | CRITICAL | Immediate content removal |
| Scam/Fraud | HIGH | Investigate, suspend if confirmed |
| Fake Profile/Catfish | HIGH | Investigate, request verification |
| Inappropriate Messages | MEDIUM | Review messages, warn user |
| Profile Misrepresentation | MEDIUM | Request profile correction |
| General Rudeness | LOW | Document, warn if pattern emerges |
| Feature Complaint | LOW | Forward to product team |

### Step-by-Step Process

#### 1. Receive Report

```
┌────────────────────────────────────────────────────────────┐
│  NEW REPORT RECEIVED                                       │
├────────────────────────────────────────────────────────────┤
│  Report ID: #4821                                          │
│  Severity: HIGH                                            │
│  Type: Harassment                                          │
│                                                            │
│  Reporter: Ngozi M. (ID: 11223)                           │
│  Reported User: Emeka T. (ID: 44556)                      │
│  Date: 2026-02-26 11:45 AM                                │
│                                                            │
│  Reason: "This user sent me multiple messages after I     │
│  declined his Show Interest request. He called me rude    │
│  and said I wasted his time. I feel uncomfortable."       │
│                                                            │
│  Evidence: 4 messages attached                            │
└────────────────────────────────────────────────────────────┘
```

#### 2. Investigate

**Step 2.1: Review Reporter's Account**
- Check reporter's history (are they a serial reporter?)
- Review reporter's standing (good account vs. problematic)
- Look for context: Did reporter provoke the situation?

**Step 2.2: Review Reported User's Account**
- Check user's history (previous reports? warnings? suspensions?)
- Review user's profile (any red flags?)
- Check user's activity (message patterns, interaction quality)

**Step 2.3: Examine Evidence**

```
Message Thread:

[Emeka → Ngozi, Feb 24, 10:30 AM]
"Hi Ngozi, I'd like to get to know you better. Would you like to
connect?"

[System: Ngozi declined the Show Interest request]

[Emeka → Ngozi, Feb 24, 11:15 AM]
"Why did you decline? I took time to read your profile."

[Emeka → Ngozi, Feb 24, 2:45 PM]
"At least have the courtesy to reply."

[Emeka → Ngozi, Feb 25, 9:00 AM]
"You're rude. Women like you waste people's time on here."

[Emeka → Ngozi, Feb 26, 10:30 AM]
"I see you're still online. Too good to reply to me?"
```

**Analysis:**
- ✅ Reporter did not provoke
- ✅ Reporter correctly declined and did not respond
- ❌ Reported user sent multiple messages after decline
- ❌ Reported user was disrespectful and accusatory
- ❌ Reported user appears to be monitoring reporter's activity
- **Verdict:** Harassment confirmed

#### 3. Take Action

**For Confirmed Harassment:**

1. **Immediate Actions:**
   - Block reported user from contacting reporter
   - Hide reporter's profile from reported user's discover feed
   - Send automatic "Report Received" confirmation to reporter

2. **Moderator Actions:**

```
Action: Temporary Suspension
Duration: 14 days
Reason: Harassment of another user

User Notification:
─────────────────────────────────────────────────
Your account has been suspended for 14 days due to harassment
of another user.

What happened:
You sent multiple unwanted messages to a user after they declined
your Show Interest request. The messages were disrespectful and
constituted harassment.

Community guideline violated:
"Respect others' boundaries. A declined Show Interest means the
person is not interested. Do not contact them further."

What this means:
- Your account is suspended until March 12, 2026
- You cannot log in during this period
- Your profile is hidden from all users
- Your existing connections will not be able to message you

What happens next:
After the suspension ends, your account will be reactivated.
However, any further violations will result in permanent removal
from JoyMatcher.

If you believe this suspension was made in error, you can appeal
by contacting support@joymatcher.com.
─────────────────────────────────────────────────
```

3. **Reporter Notification:**

```
Subject: Report #4821 Update - Action Taken

Hi Ngozi,

Thank you for reporting the harassment you experienced. We take
these reports seriously and have taken action.

Action taken:
- The user has been suspended
- They can no longer contact you
- Your profile is hidden from them

You are safe to continue using JoyMatcher. The user will not be
able to see or contact you again.

If you experience any further issues, please don't hesitate to
report them.

Best regards,
JoyMatcher Moderation Team
```

4. **Update Report Record:**
   - Status: Resolved
   - Action Taken: 14-day suspension
   - Moderator: [Your ID]
   - Resolution Time: 1 hour 23 minutes
   - Notes: Clear harassment case, first violation for user

#### 4. Handle Edge Cases

**Case: Mutual Argument**

If both users were disrespectful:
1. Issue warnings to both parties
2. Block them from contacting each other
3. Document the incident
4. Monitor both accounts for future issues

**Case: False Report**

If investigation reveals no violation:
1. Close report as "No Action Needed"
2. Send explanation to reporter
3. If reporter has pattern of false reports → Issue warning to reporter
4. Document for future reference

**Case: Unsure if Violation**

If borderline case:
1. Consult with another moderator (peer review)
2. If still unsure → Escalate to Super Admin
3. Document reasoning for decision
4. Use decision as precedent for future similar cases

---

## Workflow 4: Flagged Message Review

### Context
Moderators cannot read all messages (privacy). Only messages that are flagged by:
1. User reports
2. Automated keyword detection
3. Pattern detection (spam, repeated identical messages)

### Review Process

#### 1. Access Flagged Message

```
┌────────────────────────────────────────────────────────────┐
│  FLAGGED MESSAGE REVIEW                                    │
├────────────────────────────────────────────────────────────┤
│  Message ID: msg_78901                                     │
│  From: Tunde K. (ID: 99887)                               │
│  To: Blessing I. (ID: 33445)                              │
│  Date: 2026-02-26 3:15 PM                                 │
│  Flag Reason: Sexual keyword detected                      │
│                                                            │
│  ┌─────────────────────────────────────────────────────┐ │
│  │ MESSAGE CONTENT:                                     │ │
│  │                                                       │ │
│  │ "Hi Blessing, I really enjoyed our conversation. I  │ │
│  │ think we have great chemistry. Would you like to    │ │
│  │ meet for coffee this weekend? I'd love to get to    │ │
│  │ know you better in person."                         │ │
│  └─────────────────────────────────────────────────────┘ │
│                                                            │
│  Context: 8 messages exchanged in conversation             │
│  Relationship Status: Show Interest accepted, active chat │
│  Flagged Keyword: "chemistry" (false positive)             │
└────────────────────────────────────────────────────────────┘
```

#### 2. Review Context

**Check:**
- ✅ Is keyword used in appropriate context?
- ✅ Is relationship between users consensual?
- ✅ Is this part of ongoing conversation or cold message?
- ✅ Any other red flags?

**In this case:**
- "Chemistry" used in normal conversation context (not sexual)
- Both users engaged in conversation
- Request to meet is appropriate (after rapport established)
- **Decision:** False positive → Approve message

#### 3. Handle Actual Violations

**Example: Explicit Message**

```
Message Content:
"Hey beautiful, you look sexy in that dress. I want to [EXPLICIT CONTENT]..."

Decision: DELETE + WARN USER
```

**Process:**
1. Delete message immediately
2. Issue warning to sender:

```
Subject: Community Guidelines Violation - Warning

Your message to [User] has been removed for violating our community
guidelines. Explicit sexual content is not permitted on JoyMatcher.

This is your first warning. Future violations will result in suspension
or permanent ban.

JoyMatcher is a marriage-focused platform. We expect all communication
to be respectful and appropriate.
```

3. Notify recipient (optional, if they didn't see message):

```
A message sent to you was removed by our moderation team for violating
community guidelines. You did not see the message and do not need to
take any action.
```

#### 4. Pattern Detection

If user has sent similar messages to multiple people:
1. Review all flagged messages from user
2. If pattern confirmed → Suspend user
3. Notify all recipients (if messages were seen)
4. Document pattern for future reference

---

## Workflow 5: Suspension Management

### Suspension Levels

| Level | Duration | Used For | Next Violation |
|-------|----------|----------|----------------|
| Warning | 0 days | First minor offense | 7-day suspension |
| Short | 7 days | Second minor offense or first moderate | 14-day suspension |
| Medium | 14 days | Third offense or first serious | 30-day suspension |
| Long | 30 days | Fourth offense or serious violation | Escalate to Super Admin |
| Indefinite | Until review | Severe violation pending investigation | Permanent ban |

### Suspension Process

#### 1. Determine Appropriate Level

**Consider:**
- Severity of violation
- User's history (previous warnings/suspensions)
- Intent (malicious vs. ignorant)
- Impact on other users
- Context and circumstances

#### 2. Execute Suspension

```
Navigate: Admin Dashboard → User Profile → [User ID]
Click: "Account Actions" → "Suspend User"

┌────────────────────────────────────────────────────────────┐
│  SUSPEND USER: Emeka T. (ID: 44556)                       │
├────────────────────────────────────────────────────────────┤
│  Duration:                                                 │
│  ○ 7 days                                                  │
│  ● 14 days                                                 │
│  ○ 30 days                                                 │
│  ○ Indefinite (pending review)                            │
│                                                            │
│  Reason: (Select one)                                      │
│  ● Harassment of another user                             │
│  ○ Inappropriate content                                  │
│  ○ Scam/fraud activity                                    │
│  ○ Fake profile                                           │
│  ○ Other: ______________                                  │
│                                                            │
│  Additional Notes (internal):                             │
│  ┌──────────────────────────────────────────────┐        │
│  │ User sent multiple unwanted messages after   │        │
│  │ Show Interest declined. Disrespectful tone.  │        │
│  │ First suspension. See Report #4821.          │        │
│  └──────────────────────────────────────────────┘        │
│                                                            │
│  ☑ Block user from contacting reporter                   │
│  ☑ Send suspension notification to user                  │
│  ☑ Log action in audit trail                             │
│                                                            │
│  [ Cancel ]                    [ Confirm Suspension ]     │
└────────────────────────────────────────────────────────────┘
```

#### 3. What Happens During Suspension

**Immediate Effects:**
- User is logged out of all devices
- Cannot log back in (login shows suspension notice)
- Profile is hidden from all users
- Existing conversations are frozen (no new messages)
- User's active Show Interest requests are canceled
- Subscription continues (not paused) but features are inaccessible

**User Experience:**

```
When attempting to log in:

┌────────────────────────────────────────────────────────────┐
│                  ACCOUNT SUSPENDED                         │
├────────────────────────────────────────────────────────────┤
│  Your JoyMatcher account has been suspended until:         │
│  March 12, 2026 at 2:30 PM                                │
│                                                            │
│  Reason: Harassment of another user                        │
│                                                            │
│  During suspension:                                        │
│  - You cannot access your account                         │
│  - Your profile is hidden from other users                │
│  - You cannot send or receive messages                    │
│                                                            │
│  Your account will be automatically reactivated after      │
│  the suspension period ends. Please review our Community   │
│  Guidelines to avoid future violations.                    │
│                                                            │
│  [View Community Guidelines]  [Appeal Suspension]         │
└────────────────────────────────────────────────────────────┘
```

#### 4. Post-Suspension Monitoring

After suspension ends:
1. User can log back in
2. Profile becomes visible again
3. Flag account for monitoring (60-day watch period)
4. If another violation within 60 days → Escalate severity
5. If no violations for 90 days → Clear suspension history

---

## Workflow 6: Escalation to Super Admin

### When to Escalate

**MUST ESCALATE:**
- Permanent ban recommendation
- VIP user violations
- Legal threats or concerns
- Safety threats (violence, self-harm)
- Complex gray-area cases
- Disputes over moderation decisions
- Suspected organized fraud/scam rings

**OPTIONAL ESCALATE:**
- Unusual patterns you can't explain
- High-profile users (influencers, public figures)
- Cases where you're uncertain
- Requests for second opinion

### Escalation Process

#### 1. Prepare Escalation Report

```
Navigate: Admin Dashboard → Escalations → Create New

┌────────────────────────────────────────────────────────────┐
│  ESCALATION TO SUPER ADMIN                                 │
├────────────────────────────────────────────────────────────┤
│  Priority:                                                 │
│  ● Critical (respond within 2 hours)                       │
│  ○ High (respond within 24 hours)                         │
│  ○ Medium (respond within 3 days)                         │
│  ○ Low (respond when available)                           │
│                                                            │
│  Category:                                                 │
│  ● Permanent ban recommendation                           │
│  ○ VIP user issue                                         │
│  ○ Legal/safety concern                                   │
│  ○ Gray area/uncertain                                    │
│  ○ Appeal review                                          │
│                                                            │
│  User(s) Involved:                                        │
│  - Emeka T. (ID: 44556) [Reported User]                   │
│  - Ngozi M. (ID: 11223) [Reporter]                       │
│                                                            │
│  Summary:                                                  │
│  ┌──────────────────────────────────────────────┐        │
│  │ User Emeka has been suspended twice in the   │        │
│  │ past 60 days (7 days, then 14 days). Now     │        │
│  │ another harassment report with similar       │        │
│  │ pattern. Recommend permanent ban. User has   │        │
│  │ Premium subscription ($18/month).             │        │
│  └──────────────────────────────────────────────┘        │
│                                                            │
│  Evidence Attached:                                       │
│  ☑ Report #4821 (latest harassment)                      │
│  ☑ Report #4156 (previous harassment, 45 days ago)       │
│  ☑ Report #3847 (previous warning, 60 days ago)          │
│  ☑ Message screenshots                                   │
│                                                            │
│  Your Recommendation:                                     │
│  Permanent ban due to pattern of harassment across        │
│  multiple users. User has not improved behavior despite   │
│  escalating suspensions.                                  │
│                                                            │
│  [ Cancel ]                    [ Submit Escalation ]      │
└────────────────────────────────────────────────────────────┘
```

#### 2. Super Admin Reviews

Super Admin receives notification and reviews:
1. Moderator's summary
2. All evidence
3. User's full history
4. Financial implications (if paying subscriber)

#### 3. Super Admin Decision

**Option 1: Approve Recommendation**
- Super Admin executes permanent ban
- User is refunded pro-rata subscription (if Premium/VIP)
- User receives final notification
- All of user's data is marked for review (potential deletion request)

**Option 2: Modify Recommendation**
- Super Admin suggests alternative action
- Example: 30-day suspension + final warning instead of ban
- Moderator executes modified action

**Option 3: Reject Recommendation**
- Super Admin explains reasoning
- Case closed with documentation
- Moderator learns from decision

#### 4. Feedback Loop

Super Admin provides feedback:
```
Escalation #582 Decision: APPROVED

Action Taken: Permanent ban

Feedback to Moderator:
Great work documenting the pattern. Your escalation was timely and
well-supported. In the future, you can handle similar cases (pattern
of harassment + multiple suspensions) with more confidence.

Keep up the good work!
```

---

## Workflow 7: Scam Detection & Prevention

### Common Scam Indicators

**Profile Red Flags:**
- Stock photos or model photos (reverse image search)
- Vague or generic profile responses
- Claims of wealth or high status without verification
- Recently created account with Tier 3-4 completion (rushed)
- Location inconsistencies (says Lagos but IP shows US)

**Message Red Flags:**
- Moves to external communication quickly (WhatsApp, email)
- Love bombing (intense affection too soon)
- Sob stories (sick relative, business emergency)
- Requests for money or financial help
- Asks for gift cards, crypto, wire transfers
- Pressures for quick decision making
- Avoids video calls or meeting in person

### Investigation Process

#### 1. Profile Analysis

```
Suspicious Profile Detected:

User: "Jennifer Williams" (ID: 55443)
Age: 29
Location: Lagos
Occupation: International Business Consultant
Photos: 5 professional photos (suspiciously polished)
Joined: 3 days ago
Tier Progress: Tier 4 completed (very fast)
Subscription: Premium (paid with foreign card)
```

**Check:**
1. Reverse image search all photos
2. Review tier responses for copy-paste patterns
3. Check if responses match claimed background
4. Verify IP address matches claimed location
5. Review message history (if any reports)

#### 2. Findings

```
Reverse Image Search: 3 of 5 photos found on Instagram (different person)
IP Address: United States (claimed Lagos)
Tier Responses: Generic, no specific Nigeria references
Card: US-issued card
Messages: Contacted 12 Premium/VIP men in 3 days
```

**Verdict:** Likely scam profile (catfishing + potential romance scam)

#### 3. Take Action

**Immediate:**
1. Suspend account immediately (indefinite)
2. Hide profile from all users
3. Send warning to all users contacted:

```
Subject: Safety Alert

Hi [User],

We've identified a suspicious account that recently contacted you.
The account has been suspended pending investigation.

If you shared any personal information or were asked for money,
please report it to support@joymatcher.com immediately.

Safety tips:
- Never send money to someone you haven't met
- Be cautious of profiles with only professional photos
- Video chat before meeting in person
- Report suspicious behavior immediately

Stay safe,
JoyMatcher Security Team
```

4. **Flag IP and payment method** (prevent re-registration)
5. **Report to payment processor** (if fraudulent card)

#### 4. Document & Share

Add to **Scam Database:**
- Profile details
- Photos used (for future reverse image matching)
- Message patterns
- IP addresses
- Payment methods

---

## Workflow 8: Appeal Handling

### Appeal Process

Users can appeal:
- Suspensions
- Content removals
- Photo rejections
- Permanent bans (within 30 days)

#### 1. Receive Appeal

```
┌────────────────────────────────────────────────────────────┐
│  APPEAL RECEIVED                                           │
├────────────────────────────────────────────────────────────┤
│  Appeal ID: #221                                           │
│  User: Emeka T. (ID: 44556)                               │
│  Appealing: 14-day suspension                             │
│  Suspension Reason: Harassment                            │
│  Original Moderator: [You]                                │
│  Date: 2026-02-27 10:00 AM                                │
│                                                            │
│  User's Statement:                                        │
│  ┌──────────────────────────────────────────────┐        │
│  │ I don't think I did anything wrong. I was    │        │
│  │ just trying to get a response from Ngozi. I  │        │
│  │ spent time reading her profile and felt she  │        │
│  │ owed me an explanation for declining. I       │        │
│  │ didn't mean to harass her, I just wanted to  │        │
│  │ know why. This suspension is unfair.          │        │
│  └──────────────────────────────────────────────┘        │
└────────────────────────────────────────────────────────────┘
```

#### 2. Review Appeal

**Re-examine:**
1. Original report and evidence
2. Your decision and reasoning
3. User's appeal statement
4. Any new information

**In this case:**
- User doesn't understand boundary violation
- User believes they're entitled to explanation
- User doesn't show remorse or understanding
- **Decision:** Deny appeal

#### 3. Respond to Appeal

```
Subject: Appeal #221 Decision - Suspension Upheld

Hi Emeka,

Thank you for your appeal. We've reviewed your case and the suspension
will remain in place.

Here's why:

When someone declines a Show Interest request, they are not obligated
to provide an explanation. On JoyMatcher, "no" is a complete answer.

After Ngozi declined, you sent her 4 additional messages over 2 days,
including calling her rude and accusing her of wasting your time. This
constitutes harassment.

We understand you may have been frustrated, but the appropriate response
to a decline is to move on respectfully. Pressuring someone for an
explanation is not acceptable.

Your suspension will end on March 12, 2026. We encourage you to review
our Community Guidelines before returning to the platform.

Best regards,
JoyMatcher Moderation Team
```

#### 4. Alternative Outcome: Appeal Granted

If upon review you find you made an error:

```
Subject: Appeal #221 Decision - Suspension Reversed

Hi [User],

Thank you for your appeal. After reviewing your case, we've determined
that the suspension was not warranted. Your account has been reactivated.

We apologize for the inconvenience. [Brief explanation of what was
reconsidered]

Your account is now fully active. Thank you for being part of JoyMatcher.
```

---

## Quality Assurance & Performance

### Moderator Performance Metrics

**Tracked Metrics:**
- Reports resolved per day
- Average resolution time
- False positive rate (incorrect decisions)
- Escalation rate (% of cases escalated)
- Appeal overturn rate (appeals that reverse your decision)
- User satisfaction with moderation (via surveys)

**Target Benchmarks:**
- Resolution Time: <2 hours (critical), <24 hours (standard)
- False Positive Rate: <5%
- Escalation Rate: 10-15% (healthy balance)
- Appeal Overturn Rate: <10%

### Peer Review Process

**Weekly Calibration:**
- All moderators review 5 random cases from colleagues
- Discuss decisions and reasoning
- Identify areas for improvement
- Build consensus on edge cases

**Monthly Audit:**
- Super Admin randomly selects 20 decisions per moderator
- Reviews for quality and consistency
- Provides feedback and training

---

## Tools & Resources

### Quick Reference: Decision Tree

```
Report Received
     │
     ├─ Clear Violation?
     │  ├─ Yes → Take action (warn/suspend/delete)
     │  └─ No → Investigate further
     │
     ├─ User History?
     │  ├─ First offense → Warning or short suspension
     │  ├─ Repeat offender → Longer suspension
     │  └─ Pattern → Escalate for ban
     │
     ├─ Severity?
     │  ├─ Minor → Warning
     │  ├─ Moderate → 7-14 day suspension
     │  ├─ Serious → 30 day suspension
     │  └─ Severe → Escalate for permanent ban
     │
     └─ Unsure? → Escalate to Super Admin
```

### Moderation Templates

See: `/admin/moderation/templates` for pre-written messages for common scenarios

---

## Related Documentation

- [Admin Architecture](admin_architecture.md) - Overall admin system design
- [Admin Roles & Permissions](admin_roles_permissions.md) - Permission matrices
- [VIP Expert Isolation](vip_expert_isolation.md) - VIP-specific moderation
- [Community Guidelines](../Legal/community_guidelines.md) - User-facing rules

---

**Document Owner:** Community Lead
**Training Owner:** Senior Moderator
**Last Reviewed:** 2026-02-26
**Next Review:** 2026-04-26 (Every 2 months)
