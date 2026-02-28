# Tier System — Complete Specification

**Version:** 1.0.0
**Last Updated:** 2026-02-26
**Status:** MASTER REFERENCE - Authoritative

---

## CRITICAL: This Document is Authoritative

This is the **single source of truth** for JoyMatcher's tier system. All implementation, UI, and business logic must align with this specification. Any conflicts between this document and other documentation should be resolved in favor of this document.

---

## 1. Platform Mission

This platform exists to support **serious, long-term relationships and marriage**.

It is **NOT** a dating app.
It is **relationship infrastructure** built on:
- Trust
- Reciprocity
- Verification
- Intentional investment

The system is deliberately designed to:
- Slow people down
- Prevent entitlement
- Require consent before interaction
- Require investment before depth
- Protect high-trust and verified users

**Core Philosophy:**
> **Depth is earned. Access is matched. Seriousness is demonstrated, not claimed.**

---

## 2. Global Non-Negotiable Rules

These rules apply everywhere, without exception:

1. **No optional fields inside any tier** - All fields are mandatory
2. **A tier is either fully completed or locked** - No partial completion
3. **Subscription controls eligibility ceilings** - Cannot complete tiers above subscription
4. **You can only view tiers you have fully completed** - No previews
5. **Effective Disclosure Tier (EDT) governs visibility** - Always enforced
6. **Higher-tier data is invisible to lower tiers** - Absolute rule
7. **Disclosure is one-to-one, never global** - Pairwise relationships
8. **Access is revocable at any time** - Instant effect
9. **Revocation is instant and symmetric** - Both parties affected equally
10. **VIP is a managed service, not browsing** - Concierge only

**Any feature that violates these rules is invalid by design.**

---

## 3. Tier Architecture

| Tier | Name | Meaning | Subscription Required |
|------|------|---------|----------------------|
| Tier 1 | Identity & Intent | Who you are, what you want | All (Free+) |
| Tier 2 | Lifestyle Compatibility | How you live | All (Free+) |
| Tier 3 | Relationship & Family Readiness | Marriage readiness | Premium+ |
| Tier 4 | Health & Long-Term Compatibility | Marriage-level decisions | Premium+ |
| Tier 5 | Verified Identity & Elite Trust | KYC verified | VIP only |

### Key Principle
> **Unlocking a tier requires 100% disclosure of that tier.**
> Partial disclosure does not exist.

---

## 4. TIER 1 — Identity & Intent (Mandatory Baseline)

### Purpose
Confirm a real human being with clear relationship intent.

### Subscription Requirement
**All users** (Free, Premium, VIP)

### Required Details (ALL REQUIRED)

| Field | Type | Notes |
|-------|------|-------|
| Legal First Name | Text | Internal only, not displayed publicly |
| Display Name | Text | Public, how others see you |
| Date of Birth | Date | Age derived and displayed |
| Gender | Dropdown | Male, Female, Other |
| City | Text | With autocomplete |
| State/Province | Text | With autocomplete |
| Country | Dropdown | Nationality |
| Faith/Belief Orientation | Dropdown | Christian, Muslim, Spiritual, Agnostic, Atheist, Other |
| Relationship Intent | Radio | "Marriage within 1-2 years" or "Long-term leading to marriage" |
| Primary Profile Photo | Image Upload | With basic liveness check |

### Liveness Check (Mandatory)
- User must complete simple challenge: "Blink twice" or "Turn head left"
- Prevents static photo uploads
- Not full KYC (that's Tier 5), just basic verification

### Completion Criteria
- All fields completed
- Liveness check passed
- Photo meets quality standards (not blurry, face visible)

### Visibility
**Public** for all active users (except VIPs who set profile to invisible)

### Enables
- Account activation
- Discovery by other users
- Ability to browse matches
- Eligibility to complete Tier 2

### What This Tier Shows Others
- Display name and age
- Location (city, country)
- Nationality
- Faith/belief orientation
- Relationship intent
- Primary photo
- "Active [timeframe]" status

---

## 5. TIER 2 — Lifestyle & Personal Background

### Purpose
Early, practical compatibility screening (lifestyle alignment).

### Subscription Requirement
**All users** (Free, Premium, VIP)

### Required Details (ALL REQUIRED)

| Field | Type | Notes |
|-------|------|-------|
| Height | Dropdown | cm or ft/in |
| Body Type | Dropdown | Slim, Athletic, Average, Curvy, Plus-size |
| Education Level | Dropdown | High School, Bachelor's, Master's, PhD, Other |
| Field of Study | Text | If applicable |
| Employment Status | Dropdown | Employed, Self-employed, Student, Between jobs |
| Occupation Category | Dropdown | Tech, Healthcare, Finance, Education, Legal, etc. |
| Industry | Text | Specific industry within category |
| Work Mode | Radio | Onsite, Remote, Hybrid |
| Smoking | Dropdown | Never, Occasionally, Regularly, Prefer not to say |
| Alcohol | Dropdown | Never, Socially, Regularly, Prefer not to say |
| Exercise Frequency | Dropdown | Never, 1-2x/week, 3-5x/week, Daily |
| Primary Languages | Multi-select | English, Yoruba, Igbo, Hausa, French, Spanish, etc. |

### Consistency Checks
- If "Student" → Must have education as ongoing
- If "Between jobs" → Flag if duration seems suspicious
- If "Remote" work → Validate against occupation (some fields cannot be remote)

### Completion Criteria
- All fields completed
- Consistency checks passed

### Visibility
**Private, request-based, reciprocal only**

Key Change: Tier 2 is NOT publicly visible. Users must explicitly request Tier 2 information from each other.

### Enables
- **Premium eligibility** (cannot subscribe to Premium without Tier 2 complete)
- Tier 3 eligibility (if Premium subscription active)

### What This Tier Shows (When Shared)
- Physical attributes (height, body type)
- Education and career details
- Lifestyle habits (smoking, alcohol, exercise)
- Languages spoken
- Work arrangement

---

## 6. TIER 3 — Relationship History & Family Context

### Purpose
Determine marriage readiness and life alignment.

### Subscription Requirement
**Premium or VIP** (Free users cannot complete or view Tier 3)

### Required Details (ALL REQUIRED)

| Field | Type | Notes |
|-------|------|-------|
| Marital History | Dropdown | Never married, Divorced, Widowed, Separated |
| Number of Children | Dropdown | 0, 1, 2, 3, 4+ |
| Custody Status | Dropdown | Full custody, Shared custody, No custody (if children > 0) |
| Children Living With You | Radio | Yes, No, Shared arrangement |
| Willingness to Have Children | Radio | Want children, Have children want more, Open to discussion, Child-free by choice |
| Marriage Timeline Expectation | Radio | Within 1-2 years, 3-5 years, Flexible, Need to discuss with partner |
| Family Involvement Expectations | Textarea | 500 char max - How involved should families be? |
| Family-Related Deal Breakers | Textarea | 500 char max - Any non-negotiables regarding family? |

### Consistency Checks
- If "Never married" → Cannot have "Divorced" history
- If "0 children" → Custody question skipped
- If "Child-free by choice" + "Want children" → Warning: "These selections conflict"
- If "Want children" + Age >45 → Warning prompt (not blocking)

### Completion Criteria
- All fields completed
- Consistency checks passed
- User acknowledges sensitivity of information

### Visibility
**Explicit, reciprocal, logged consent only**

### Enables
- Tier 4 eligibility
- Ability to request Tier 3 from other Premium users
- Deeper compatibility assessment

### What This Tier Shows (When Shared)
- Marital history and children status
- Custody arrangements
- Willingness to have (more) children
- Marriage timeline and readiness
- Family involvement expectations
- Family-related boundaries

---

## 7. TIER 4 — Health & Long-Term Compatibility

### Purpose
Support marriage-level decisions responsibly with health transparency.

### Subscription Requirement
**Premium or VIP** (Free users cannot complete or view Tier 4)

### Required Details (ALL REQUIRED)

| Field | Type | Notes |
|-------|------|-------|
| Genotype | Dropdown | AA, AS, SS, AC, SC, CC, Prefer not to say |
| Blood Group | Dropdown | A+, A-, B+, B-, O+, O-, AB+, AB-, Unknown |
| Self-Declared Health Conditions | Checkboxes + Textarea | None, Hypertension, Diabetes, Asthma, Other (describe) |
| Fertility-Related Disclosures | Radio | No known issues, Disclosed in profile, Prefer to discuss privately |
| Health-Related Lifestyle Factors | Checkboxes | Regular checkups, Active lifestyle, Managing chronic condition, Prefer not to say |
| Core Non-Negotiables: Religion | Radio | Must share same faith, Open to interfaith, Flexible |
| Core Non-Negotiables: Relocation | Radio | Must stay in current city, Open to relocation, Partner must relocate, Flexible |
| Core Non-Negotiables: Children | Radio | Must have children, Open to discussion, Must not have children |

### Health Disclaimer (Must Accept Before Form Access)
User must check all boxes:
- [ ] I understand health data is self-declared and not medically verified
- [ ] I will only view this data from others if I complete and share my own Tier 4
- [ ] I understand this information is critical for marriage decisions (e.g., genotype compatibility)
- [ ] I will not share others' health information without their explicit consent

### Genotype Compatibility Warning
If user is AS and views another AS user's Tier 4:
> ⚠️ **Genotype Incompatibility Alert**
> Both you and [Name] have AS genotype. This combination carries risk for sickle cell disease in children. Please consult a medical professional before proceeding.

(Warning displayed, but not blocking - users make informed decision)

### Completion Criteria
- All fields completed
- Mandatory disclaimers accepted
- User acknowledges sensitivity and legal implications

### Visibility
**Highly restricted, explicit reciprocal consent, fully logged**

> ⚠️ Health data is **self-declared** and **not medically verified**.
> Platform is not liable for accuracy of health disclosures.

### Enables
- **VIP assessment eligibility** (cannot apply for VIP without Tier 4 complete)
- Highest level of compatibility assessment
- Marriage-level transparency

### What This Tier Shows (When Shared)
- Genotype and blood group
- Self-declared health conditions
- Fertility-related information
- Health-related lifestyle
- Core non-negotiables (religion, relocation, children)

---

## 8. TIER 5 — Verified Identity & Elite Trust (VIP Only)

### Purpose
Eliminate impersonation and fraud; enable concierge matchmaking.

### Subscription Requirement
**VIP only** (Application-based, manual approval required)

### Required Details (ALL REQUIRED)

| Field | Type | Notes |
|-------|------|-------|
| Government-Issued ID | File Upload | National ID, Passport, Driver's License |
| ID Type | Dropdown | National ID, International Passport, Driver's License |
| ID Number | Text | Masked after verification |
| ID Expiry Date | Date | Must be valid |
| Country of Issue | Dropdown | Must match nationality |
| Live Video Verification | Video Upload | 30 seconds max |
| Randomized Liveness Challenge | System-generated | "Blink twice", "Turn head left", "Say your name and today's date" |
| Face Match Confirmation | Automated + Manual | Photo ↔ Video comparison |
| Name Consistency Check | Automated | Legal name on ID matches account |
| Manual KYC Review | Admin Action | VIP Coordinator review |
| Truth & Accountability Declaration | Signature Field | Typed full name |

### Verification Process
1. User uploads government ID (front and back if applicable)
2. System performs automated checks:
   - ID is not expired
   - ID format matches country standards
   - Name consistency (ID vs. account)
3. User records video with randomized liveness challenge
4. System performs face match (photo vs. video)
5. VIP Coordinator performs manual review:
   - Verifies ID is legitimate (not fake)
   - Confirms face match
   - Checks for duplicate IDs in system
   - Reviews for fraud indicators
6. User signs truth declaration:
   > "I, [Full Name], declare that all information provided to JoyMatcher is truthful and accurate. I understand that falsifying information results in permanent ban and potential legal action. I agree to JoyMatcher's verification and privacy policies."
7. If all checks pass → Tier 5 approved
8. If checks fail → Tier 5 rejected with reason

### Verification Timeline
- Target: 24-48 hours for manual review
- User notified via email when approved or rejected

### Completion Criteria
- All documents submitted
- Automated checks passed
- Manual KYC review approved
- Truth declaration signed
- Trust & Safety team approval

### Visibility

**Public:**
- ✓ "Verified Identity" badge (visible to all users)
- Tooltip: "Government ID verified, KYC approved"

**Private (Never Shared Peer-to-Peer):**
- Government ID images
- ID number
- Video verification
- KYC review notes
- Only accessible to: Super Admin, VIP Coordinator, Data Protection Officer

### Enables
- **VIP status activation**
- Curated introductions from matchmaking expert
- One-to-one matchmaking expert sessions
- Complete profile privacy (invisible browsing)
- Highest trust level on platform

### What This Tier Shows Others
- Public: Verified Identity badge only
- Private: No KYC details shared (privacy protected)

---

## 9. Subscription Structure (Strictly Enforced)

| Subscription | Max Tier | Monthly Price | Quarterly Price | Positioning |
|--------------|----------|---------------|-----------------|-------------|
| Free | Tier 2 | ₦0 / $0 | N/A | Exploration |
| Premium | Tier 4 | ₦18,000 / $18 | ₦45,000 / $45 | Serious & Transparent |
| VIP | Tier 5 | ₦200,000+ / $200+ | N/A | Verified & Concierge |

### Critical Rules

1. **Subscription Ceiling**
   - Users **cannot unlock tiers above their subscription ceiling**
   - Free users attempting to complete Tier 3 → Upgrade prompt shown
   - Premium users cannot complete Tier 5 (VIP application required)

2. **Tier-to-Subscription Unlock**
   - Completing Tier 2 unlocks Premium eligibility
   - Completing Tier 4 unlocks VIP application eligibility
   - Cannot skip tiers

3. **Pricing Philosophy**
   - Pricing is a **filter**, not a promotion
   - No public discounts
   - No VIP discounts
   - No influencer codes
   - Only quiet annual savings allowed

4. **Currency Localization**
   - Nigerian users → **₦ only**
   - Non-Nigerian users → **USD only**
   - Never show both currencies together

---

## 10. Effective Disclosure Tier (EDT) — System Backbone

### Canonical Rule

> **EDT = the lowest fully completed and shared tier between two users.**

EDT alone determines **what each user can see**, at all times.

### Calculation Formula

```javascript
EDT = Math.min(
  userA.maxCompletedTier,
  userB.maxCompletedTier,
  sharedTierByUserA,
  sharedTierByUserB
)
```

### Examples

**Example 1: Basic EDT**
- User A: Completed Tier 3, shared Tier 2 with User B
- User B: Completed Tier 2, shared Tier 2 with User A
- **EDT = 2** (lowest value)
- Both see Tier 1-2 only

**Example 2: Asymmetric Completion**
- User A: Completed Tier 4, shared Tier 4 with User B
- User B: Completed Tier 2, shared Tier 2 with User A
- **EDT = 2** (User B's max completed tier)
- Both see Tier 1-2 only (User A's Tier 3-4 sharing is ignored because User B hasn't completed those tiers)

**Example 3: Progressive Unlocking**
- Initial: User A (Tier 3), User B (Tier 2) → EDT = 2
- Later: User B completes Tier 3, shares Tier 3 with User A → EDT = 3
- Both now see Tier 1-3

**Example 4: Revocation**
- Current: User A and User B both shared Tier 3 → EDT = 3
- User A feels uncomfortable, revokes Tier 3, downgrades to Tier 2
- System immediately downgrades User B's view to Tier 2
- **New EDT = 2**
- Revocation is instant and symmetric

---

## 11. Investment-for-Visibility Rule

### Core Principle
> **Depth requires matching depth.**

If a user shares deeper information with you:

You **cannot view it** unless:
1. You are subscription-eligible (Free users cannot see Tier 3+), **AND**
2. You have fully completed that tier yourself

### No Exceptions
- No previews
- No partial unlocks
- No free access
- No "just this once"

### Example Scenario
- Premium User A (completed Tier 4) shares Tier 4 with Free User B
- Free User B (completed Tier 2) **CANNOT see** User A's Tier 4
- Reason: Free subscription ceiling is Tier 2
- User B sees upgrade prompt: "Upgrade to Premium and complete Tier 4 to view"

---

## 12. Request-of-Information System

### Eligibility Rules

A user may:
- Request tiers **≤ their completed tier**
- Offer tiers **≤ their completed tier**
- View tiers **≤ their completed tier AND subscription ceiling**

### Who Can Request Details?

| User Type | Can Request Details? | Notes |
|-----------|---------------------|-------|
| Free | ❌ No | Cannot request any tier info |
| Premium | ✅ Yes | Can request Tier 2, 3, 4 |
| VIP | ✅ Yes | Can request Tier 2, 3, 4, 5 |

**Important:** Free users have no "Request Details" button at all.

---

### Request Initiation (User A)

User A selects:
1. **Requested Tier (X)** - What tier they want from User B
2. **Auto-Share Tier (Y)** - What tier they'll share in return

**Constraints:**
- X ≤ User A's completed tier
- Y ≤ User A's completed tier
- Default: Y = X (fair exchange)

**Confirmation Shown:**
> "If accepted, I will share Tier Y and request Tier X."

---

### Request Review (User B)

User B sees:
- **Requested Tier (X)** - What User A wants
- **Offered Tier (Y)** - What User A is offering

User B may:
- **Share exactly** what User A requested (Tier X)
- **Share less** (Tier X-1 or lower)
- **Share more** (Tier X+1 or higher, up to B's completed tier)
- **Decline** request entirely

**No auto-accept.** User B must explicitly decide.

---

### System Application

1. User B makes decision (accept, share less/more, decline)
2. System records both users' shared tiers
3. System calculates new EDT
4. System applies visibility instantly
5. Both users notified of outcome

---

### Request Logging

All requests are logged:
```javascript
{
  requestId: "req_12345",
  requestedBy: "userA_id",
  requestedFrom: "userB_id",
  requestedTier: 3,
  offeredTier: 3,
  response: "accepted", // accepted | declined | shared_less | shared_more
  sharedTier: 3, // What User B actually shared
  newEDT: 3,
  timestamp: "2026-02-26T10:30:00Z"
}
```

---

## 13. Worked Examples (Edge Cases)

### Example A: Symmetric Completion, Full Sharing
- User A: Completed Tier 3, shares Tier 3
- User B: Completed Tier 3, shares Tier 3
- **EDT = 3**
- Both see Tier 1-3
- ✅ Perfect reciprocity

### Example B: Asymmetric Completion
- User A: Completed Tier 4, shares Tier 4
- User B: Completed Tier 2, shares Tier 2
- **EDT = 2** (User B's limit)
- Both see Tier 1-2 only
- User A's Tier 3-4 wasted until User B upgrades

### Example C: Partial Sharing
- User A: Completed Tier 4, shares Tier 2 with User B (being cautious)
- User B: Completed Tier 3, shares Tier 3 with User A
- **EDT = 2** (User A's shared tier limits it)
- Both see Tier 1-2 only

### Example D: Negotiation
- Initial: User A shares Tier 2, User B shares Tier 2 → EDT = 2
- User A requests Tier 3 from User B, offers Tier 3
- User B accepts, shares Tier 3
- User A shares Tier 3 as promised
- **New EDT = 3**
- Successful negotiation

### Example E: Asymmetric Negotiation
- User A (Tier 4) requests Tier 4 from User B, offers Tier 4
- User B (Tier 2) cannot share Tier 4 (hasn't completed it)
- User B declines request
- **EDT remains 2**
- Request fails due to completion gap

### Example F: Subscription Ceiling Block
- Free User A requests Tier 3 from Premium User B
- System blocks request: "Free users cannot request Tier 3. Upgrade to Premium."
- **EDT remains at Tier 1-2 max**
- Subscription ceiling enforced

### Example G: Revocation Mid-Conversation
- Current: Both users at EDT = 3 (actively messaging)
- User A feels uncomfortable, revokes Tier 3, downgrades to Tier 2
- System immediately:
  - Hides User A's Tier 3 data from User B
  - Hides User B's Tier 3 data from User A (symmetric)
  - **New EDT = 2**
  - Conversation continues, but Tier 3 data vanishes
- User B notified: "User A has adjusted their disclosure level. EDT is now 2."

### Example H: VIP to Free Interaction
- VIP User (Tier 5, all data complete) sends Show Interest to Free User (Tier 2)
- System shows VIP warning: "This user has only completed Tier 2. You will see very limited information."
- If VIP proceeds and Free user accepts:
  - **EDT = 2** (Free user's limit)
  - VIP sees only Tier 1-2 from Free user
  - Free user sees only Tier 1-2 from VIP (despite VIP completing Tier 5)
- VIP's Tier 5 verified badge still visible (trust signal)

---

## 14. One-to-One Disclosure & Revocation

### Pairwise Relationships
- Disclosure is **pairwise** (A ↔ B)
- Never global
- User A sharing Tier 3 with User B does NOT share it with User C
- Each relationship has independent EDT

### Revocation Rule

If one user downgrades their shared tier:
- System **immediately** downgrades the other user's view symmetrically
- Both parties affected equally (fairness principle)
- No grace period (instant effect)
- Cannot be undone (must re-request)

### Example
- Current state: User A and User B both sharing Tier 4 → EDT = 4
- User A revokes, downgrades to Tier 2
- System immediately:
  - User A's Tier 3-4 data hidden from User B
  - User B's Tier 3-4 data hidden from User A (symmetric)
  - New EDT = 2
  - Both notified of change

### Logging
All revocations logged:
```javascript
{
  action: "tier_revocation",
  revokedBy: "userA_id",
  affectedUser: "userB_id",
  previousEDT: 4,
  newEDT: 2,
  timestamp: "2026-02-26T10:30:00Z",
  reason: "user_initiated" // Optional
}
```

---

## 15. Show Interest Gate (No Unsolicited Contact)

### Core Rule
> **No interaction occurs without mutual interest.**

### Show Interest Flow

1. User clicks **Show Interest** on profile
2. **Tier-Awareness Warning** shown (see below)
3. User confirms understanding
4. Show Interest sent to recipient
5. Recipient **Accepts** or **Declines**

**Until accepted:**
- ❌ No messaging
- ❌ No detail requests
- ❌ No further contact

### Tier-Awareness Warning

**Purpose:** Manage expectations before interaction begins.

**Content:**
> ⚠️ **Tier Awareness**
>
> [Name] is a [Subscription Level] user who has completed Tier [X].
>
> **You WILL see:** Tier 1 [list fields], Tier 2 [list fields if applicable]
>
> **You will NOT see:** Tier 3, 4, 5 [greyed out]
>
> **To view deeper information, you must:**
> 1. Complete those tiers yourself
> 2. Have appropriate subscription (Premium for Tier 3-4, VIP for Tier 5)
>
> **If they accept your Show Interest:**
> - You can message them
> - You can request deeper tier information (if Premium/VIP)
> - EDT will determine what you both see

**User must check:**
- [ ] I understand the tier limitations

**Buttons:**
- "Send Show Interest" | "Cancel"

---

### Cool-Off Rule (Anti-Harassment)

If recipient **declines** Show Interest:
- Sender cannot retry for **3 months** (90 days)
- System-enforced, automatic reset
- Cooldown prevents harassment

**UI for sender:**
> ❌ Show Interest Declined
>
> You can send Show Interest again on [Date 3 months from now].

---

## 16. Show Interest Eligibility Matrix

| Sender ↓ / Recipient → | Free | Premium | VIP |
|------------------------|------|---------|-----|
| **Free** | ✅ | ❌ | ❌ |
| **Premium** | ✅ | ✅ | ❌ |
| **VIP** | ✅ | ✅ | ✅ |

### Rules
- **Only VIP can initiate toward VIP**
- **Premium CANNOT send Show Interest to VIP users**
- **Free can only send to other Free users**

### Blocked Attempt UI

**Scenario:** Premium user tries to send Show Interest to VIP user

> 🔒 **Upgrade Required**
>
> VIP users can only receive Show Interest from other VIP members.
>
> **To connect with VIP users:**
> 1. Complete Tier 4
> 2. Apply for VIP membership
> 3. Complete Tier 5 verification
>
> [Apply for VIP] [Maybe Later]

---

## 17. Messaging Rules

### Unlocking Messages
- Messaging unlocks **only after Show Interest acceptance**
- Unlimited messaging once unlocked
- Messaging never bypasses tier rules (EDT still applies)

### First Message Prompt

**Shown before sending first message:**
> 💬 **Start with Respect**
>
> Our community values thoughtful communication.
> Inappropriate messages will be reviewed and may result in suspension.
>
> [Community Guidelines]
>
> [I Understand]

### Message Safety Features
- Keyword detection for inappropriate content
- Reporting system (zero tolerance for harassment)
- Blocking (instant, bilateral)

---

## 18. Request-for-More-Details Availability

| User Type | Can Request Details? | When Button Appears |
|-----------|---------------------|---------------------|
| Free | ❌ | Never |
| Premium | ✅ | After Show Interest acceptance |
| VIP | ✅ | After Show Interest acceptance |

**Important:**
- Button completely hidden for Free users
- Appears only after mutual interest established
- Requires subscription (Premium or VIP)

---

## 19. VIP Concierge Matchmaking Service

### Philosophy
> **VIP is service, not browsing.**

VIP users **disable browsing** and receive curated introductions from matchmaking experts.

### VIP Flow

1. **Application**
   - Complete 18-question intent screening questionnaire
   - VIP Coordinator reviews application
   - Approve or reject with reason

2. **Intent Screening**
   - Why applying for VIP?
   - Marriage timeline?
   - Privacy needs?
   - Matchmaking preferences?

3. **Tier 5 Verification**
   - Upload government ID
   - Complete live video verification
   - Manual KYC review by VIP Coordinator
   - Signed truth & accountability declaration

4. **Manual Approval**
   - Trust & Safety team review
   - Background check (if applicable)
   - Approval decision

5. **Concierge Onboarding**
   - Assigned matchmaking expert
   - One-to-one intake session (video call)
   - Deep dive into preferences, values, deal-breakers
   - Relationship history and lessons learned

6. **Profile Privacy**
   - Option to disable browsing (profile invisible)
   - Expert searches on VIP's behalf

7. **Curated Introductions**
   - Expert actively sources matches from verified Tier 4-5 pool
   - Human compatibility review
   - Personalized introduction notes
   - Expert facilitates first conversation

### What VIP Is NOT
- ❌ Not "invisible browsing"
- ❌ Not self-service with extra features
- ❌ Not algorithmic matching

### What VIP IS
- ✅ White-glove personal service
- ✅ Expert human curation
- ✅ Complete profile privacy
- ✅ Pre-vetted, quality introductions only

---

## 20. Pricing & Currency Rules

### Currency Localization

**Nigerian Users:**
- See **₦ only**
- Free: ₦0
- Premium: ₦18,000/month or ₦45,000/quarter
- VIP: From ₦200,000/month (application-based)

**Non-Nigerian Users:**
- See **USD only**
- Free: $0
- Premium: $18/month or $45/quarter
- VIP: From $500/month (application-based)

**Never show both currencies together.**

### Pricing Philosophy
- Pricing is a **filter**, not a promotion
- High pricing signals seriousness
- Filters casual users early
- No public discounts
- No VIP discounts
- No influencer codes
- ✅ Quiet annual savings only (not advertised)

---

## 21. Upgrade Modal Copy (Contextual)

### When Free User Hits Tier 2 Ceiling

**Short:**
> 🔒 **Premium Required**
> Complete Tier 3 to unlock relationship and family information.

**Long:**
> You've completed Tier 2. To continue building trust and compatibility:
>
> **Upgrade to Premium** (₦18,000/month)
> - Complete Tiers 3 & 4
> - Request deeper information from matches
> - Send Show Interest to Premium users
> - Unlock marriage-level compatibility
>
> [Upgrade to Premium] [Maybe Later]

### When Premium User Views VIP-Only Feature

> 🔒 **VIP Service**
>
> VIP members receive personally curated introductions from matchmaking experts.
>
> **Requirements:**
> - Complete Tier 4 (✅ You've done this)
> - Apply for VIP membership
> - Complete Tier 5 verification
> - From ₦200,000/month
>
> [Apply for VIP] [Learn More]

### When User Tries to View Higher Tier Without Completion

> 🔒 **Complete Tier [X] to Unlock**
>
> This user has shared Tier [X] information.
> To view it, you must complete Tier [X] yourself.
>
> **What you'll need to share:**
> [List of Tier X fields]
>
> **Time estimate:** ~15 minutes
>
> [Complete Tier X Now] [Maybe Later]

---

## 22. Analytics & Enforcement Signals

### Track These Events

**Tier Completion:**
- `tier_1_completed`
- `tier_2_completed`
- `tier_3_completed`
- `tier_4_completed`
- `tier_5_completed`

**Show Interest:**
- `show_interest_sent`
- `show_interest_accepted`
- `show_interest_declined`
- `cooldown_enforced`
- `tier_warning_shown`
- `tier_warning_acknowledged`

**Messaging:**
- `chat_unlocked`
- `first_message_sent`
- `conversation_active`

**Request Details:**
- `details_requested`
- `details_request_accepted`
- `details_request_declined`
- `edt_updated`

**Subscription:**
- `upgrade_prompt_shown`
- `upgrade_completed`
- `subscription_ceiling_hit`

**Revocation:**
- `tier_revoked`
- `revocation_applied`
- `edt_downgraded`

### Success Indicators

**Good:**
- Lower expectation mismatch (tier warnings working)
- Longer conversations (quality over quantity)
- Higher quality upgrades (users understand value)
- VIP retention (85%+ for 6+ months)
- Low harassment reports (<1%)

**Bad:**
- High cooldown enforcement rate (users spamming Show Interest)
- High upgrade prompt abandonment (pricing too high or value unclear)
- High Tier 3-4 abandonment (too invasive)
- High VIP churn (service quality issues)

---

## 23. Final System Identity

### This is NOT Entertainment

This is **trust-based matchmaking infrastructure**.

### Core Philosophy (Repeated for Emphasis)

> **If someone wants depth, they must stand fully in that depth.**

- No shortcuts
- No asymmetry
- No free-riding
- No exploitation

### Success Definition

**Users leave to get married.**

That's the ultimate success metric.

---

## 24. Tier Progression Summary

```
Free User Journey:
Signup → Tier 1 (mandatory) → Browse Free users → Complete Tier 2 → Premium eligible

Premium User Journey:
Upgrade → Complete Tier 3 (relationship) → Request details → Complete Tier 4 (health) → VIP eligible

VIP User Journey:
Apply → Tier 5 verification → Concierge onboarding → Curated introductions → Expert support
```

---

## Related Documentation

- [Product Charter](product_charter.md) - Mission and positioning
- [EDT Specification](edt_specification.md) - Detailed EDT calculation
- [User Journeys](user_journeys.md) - Complete user flows
- [Show Interest Flow](../Technical%20Specifications/show_interest_flow.md) - Technical implementation
- [Request Details Flow](../Technical%20Specifications/request_details_flow.md) - Negotiation logic

---

**Document Owner:** Product Lead & Engineering Lead
**Technical Owner:** Engineering Lead
**Last Reviewed:** 2026-02-26
**Next Review:** 2026-05-26 (Quarterly)

**This document is AUTHORITATIVE. Any conflicts with other documentation should be resolved in favor of this document.**
