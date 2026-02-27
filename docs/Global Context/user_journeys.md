# User Journeys — Complete Flows

**Version:** 1.0.0
**Last Updated:** 2026-02-26
**Status:** Complete

---

## Overview

This document maps complete end-to-end user journeys for all subscription tiers and key scenarios on JoyMatcher.

---

## JOURNEY 1: Free User — Exploration Phase

**Persona:** New user (Chioma or Kwame)
**Goal:** Explore platform, understand value, decide if worth upgrading

### Flow Diagram

```
Anonymous Visitor
    ↓
Homepage (/) → Reads value props, "How It Works", "Pricing"
    ↓
Sign Up (/signup) → Email, password, basic info
    ↓
Email Verification → Clicks link in email
    ↓
Tier 1 Onboarding (/onboarding/tier-1) → MANDATORY
    ├── Legal first name (internal only)
    ├── Display name
    ├── Date of birth (age calculated)
    ├── Gender
    ├── City & State
    ├── Nationality
    ├── Faith/belief orientation
    ├── Relationship intent
    ├── Primary profile photo
    └── Liveness check (blink or turn head)
    ↓
Account Activated → Redirected to Dashboard
    ↓
Dashboard (/app/dashboard)
    ├── Welcome message
    ├── Tier progress: "Tier 1 of 5 complete"
    ├── Prompt: "Complete Tier 2 to unlock Premium eligibility"
    └── CTA: "Browse Matches" or "Complete Tier 2"
    ↓
Discovers (/app/discover)
    ├── Sees other Free users (Tier 1 only - public)
    ├── Can view Tier 1 information: name, age, location, faith, intent
    ├── Cannot see Tier 2+ information (locked)
    ├── Limited to browsing only Free users
    └── Show Interest button (can only send to other Free users)
    ↓
Views Profile (/app/profile/:id)
    ├── Tier 1 information visible
    ├── Tier 2+ sections show "🔒 Complete Tier 2 to unlock"
    └── Cannot request details (Free users have no request button)
    ↓
Sends Show Interest (to Free user)
    ├── Tier awareness warning: "You'll both see Tier 1 only"
    ├── User acknowledges limitations
    └── Show Interest sent
    ↓
**Decision Point:**
    ├── Interest declined → 3-month cooldown
    └── Interest accepted → Messaging unlocks
    ↓
Messages (/app/messages)
    ├── Can chat with accepted match
    ├── Both see only Tier 1 information
    ├── Conversation limited by lack of depth
    └── Realizes need for deeper compatibility data
    ↓
Completes Tier 2 (/onboarding/tier-2)
    ├── Height, body type, education, occupation, work mode
    ├── Lifestyle habits, languages
    └── Takes ~10 minutes
    ↓
Dashboard shows: "✅ Tier 2 Complete! You're now eligible for Premium"
    ↓
**Decision Point:**
    ├── Continue Free → Can request Tier 2 from other Free users (but most aren't completing Tier 2)
    └── Upgrade to Premium → Unlock Tier 3-4, request details feature
```

### Key Insights

**Friction Points (By Design):**
- Limited to Free users only (can't contact Premium/VIP)
- No request details feature
- Cannot see or complete Tier 3+ (subscription ceiling)
- Most serious users upgrade quickly (Free is exploration only)

**Conversion Triggers:**
- Sees interesting Premium user → "Upgrade to show interest"
- Matched Free user won't complete Tier 2 → Realizes serious users are Premium
- Conversations lack depth → Needs Tier 3-4 data to assess compatibility

---

## JOURNEY 2: Premium User — Serious Search Phase

**Persona:** Marriage-minded professional (Chioma or Kwame)
**Goal:** Find compatible life partner within 6-12 months

### Flow Diagram

```
Free User (Tier 2 complete)
    ↓
Sees Upgrade Prompt → "Unlock Tier 3-4 and request details from matches"
    ↓
Pricing Page (/pricing) → ₦18,000/month or ₦45,000/quarter
    ├── Views Premium benefits
    ├── Sees quarterly billing default (commitment signal)
    └── Decides pricing validates seriousness (filter)
    ↓
Upgrade (/app/account/upgrade)
    ├── Selects Premium tier
    ├── Chooses quarterly billing (₦45,000)
    ├── Enters payment details (card or bank transfer)
    └── Payment processed
    ↓
Subscription Active → Redirected to Tier 3 onboarding
    ↓
Completes Tier 3 (/onboarding/tier-3) → ~15 minutes
    ├── Marital history
    ├── Children status and custody
    ├── Willingness to have children
    ├── Marriage timeline expectation (1-2 years)
    ├── Family involvement expectations
    └── Family-related deal-breakers
    ↓
Dashboard shows: "✅ Tier 3 Complete! You can now request relationship/family info"
    ├── Prompt: "Complete Tier 4 for health/compatibility transparency"
    └── CTA: "Complete Tier 4 Now"
    ↓
Completes Tier 4 (/onboarding/tier-4) → ~15 minutes
    ├── Reads health disclaimer (accepts 3 checkboxes)
    ├── Genotype (critical for Nigerian marriages)
    ├── Blood group
    ├── Health conditions (self-declared)
    ├── Fertility disclosures
    ├── Core non-negotiables (religion, relocation, children)
    └── Warning if genotype AS (potential incompatibility alert later)
    ↓
Dashboard: "🎉 Tier 4 Complete! You're now eligible for VIP. Full transparency unlocked!"
    ↓
Discovery (/app/discover) → Enhanced browsing
    ├── Can now browse Free AND Premium users
    ├── Filters by education, tier completion, diaspora status
    ├── Sees Tier 1 information publicly
    ├── Tier 2+ information shows "Request to view" buttons
    └── Verified Identity badges (Tier 5) catch attention
    ↓
Views Premium User Profile (/app/profile/:id)
    ├── EDT status banner: "You're both at Tier 4. You could see Tier 1-4 if you both share."
    ├── Tier 1 visible (public)
    ├── Tier 2-4 locked: "🔒 Request Tier X to view"
    └── Tier 5 verified badge visible (if user has it)
    ↓
Sends Show Interest to Premium User
    ├── Tier awareness warning: "This user completed Tier 4. You'll see Tier 1 initially."
    ├── "After acceptance, you can request Tier 2-4"
    └── Show Interest sent
    ↓
Interest Accepted → Messaging unlocks
    ↓
Messages (/app/messages/:id)
    ├── Initial conversation based on Tier 1 information
    ├── Good rapport after 3-4 messages
    └── Wants to discuss family/children before meeting
    ↓
Requests Tier 3 (Request Details Modal)
    ├── Selects "Request Tier 3"
    ├── Offers "Tier 3" in return (reciprocity)
    ├── Confirmation: "If accepted, I will share Tier 3 and request Tier 3"
    └── Request sent
    ↓
Match Reviews Request
    ├── Sees: "They're offering Tier 3, requesting Tier 3"
    ├── Options: Share exactly | Share less | Share more | Decline
    ├── Decides to share exactly (Tier 3)
    └── Accepts
    ↓
EDT Updated to 3
    ├── Both users now see Tier 1-3 from each other
    ├── Marital history visible
    ├── Children status visible (both want children)
    ├── Marriage timeline aligned (both within 1-2 years)
    ├── Family involvement expectations understood
    └── Conversation deepens with transparency
    ↓
After 1 week of messaging → Requests Tier 4
    ├── Discusses health transparency importance (genotype)
    ├── Both accept Tier 4 sharing
    └── EDT updated to 4
    ↓
Sees Genotype → Both AA (compatible)
    ├── Health compatibility confirmed
    ├── Deal-breakers aligned
    └── Decides to move forward
    ↓
Schedules Video Call (external - WhatsApp/Zoom)
    ├── Video chemistry confirmed
    ├── Discusses cross-border logistics (if diaspora)
    └── Agrees to meet in person
    ↓
**Relationship Progression:**
    ├── 2 months dating exclusively
    ├── Deactivates profile (in relationship)
    ├── Pauses subscription (can reactivate if needed)
    └── After 6 months → Engaged
    ↓
Success Exit Flow (/app/success/marriage-intent)
    ├── Confirms engagement
    ├── Provides testimonial consent
    ├── Chooses: "Feature on Testimonials page (first names only)"
    ├── Writes testimonial
    └── Account deactivated (success!)
```

### Key Insights

**Value Delivered:**
- Request details feature enables negotiated transparency
- EDT ensures fairness (reciprocal disclosure)
- Tier 3-4 data addresses marriage-level decisions early
- Genotype compatibility critical for Nigerian users
- Premium-to-Premium interactions are higher quality

**Time to Success:**
- Avg. 6-10 months from signup to relationship
- 10-15 Show Interests sent on average
- 3-5 conversations at EDT 3+
- 1-2 progress to EDT 4 and beyond

---

## JOURNEY 3: VIP User — Concierge Service

**Persona:** High-profile professional (Dr. Amara)
**Goal:** Find compatible partner with complete privacy and expert curation

### Flow Diagram

```
Premium User (Tier 4 complete)
    ↓
Sees VIP Prompt → "Apply for VIP membership for curated introductions"
    ↓
VIP Application (/app/vip/application)
    ├── 18-question intent screening questionnaire
    ├── Section 1: Commitment & Intent
    │   ├── Why applying for VIP?
    │   ├── Marriage timeline?
    │   ├── Top 3 qualities in partner?
    │   └── Previous relationship history?
    ├── Section 2: Privacy & Discretion
    │   ├── Need profile privacy? (Yes/No)
    │   ├── Why discretion needed? (e.g., public figure)
    │   └── Professional reputation concerns?
    ├── Section 3: Matchmaking Preferences
    │   ├── Age range for partner
    │   ├── Location preferences (home/diaspora/open)
    │   ├── Faith requirements
    │   └── Education level preferences
    ├── Section 4: Service Expectations
    │   ├── Expected introductions per month (2-3 / 4-5 / 6-8)
    │   ├── Preferred communication (video/phone/email)
    │   └── Willing to do consultation sessions? (Yes/No)
    ├── Section 5: Verification Readiness
    │   ├── Ready for ID verification? (Yes/Not yet)
    │   ├── Comfortable with video verification? (Yes/No)
    │   └── Agree to truth declaration? (Yes/No)
    ├── Section 6: Financial Commitment
    │   ├── Can commit ₦200,000/month for 3+ months? (Yes/Need to consider)
    │   └── Preferred billing (Monthly/Quarterly/Annually)
    └── Submit Application
    ↓
Application Status (/app/vip/application-status)
    ├── "Application received. Review within 3-5 business days."
    └── Waits for VIP Coordinator review
    ↓
VIP Coordinator Reviews Application (/admin/vip/applications/:id)
    ├── Reviews all 18 questionnaire responses
    ├── Checks user's tier completion (must be Tier 4)
    ├── Reviews activity patterns (time on platform, engagement)
    ├── Checks for red flags (reports, suspicious activity)
    ├── Assesses intent sincerity
    └── **Decision:** Approve / Reject / Request more info
    ↓
Application Approved → Email notification sent
    ├── "Congratulations! Your VIP application has been approved."
    ├── "Next step: Complete Tier 5 verification"
    └── Link to /app/vip/verification
    ↓
Tier 5 Verification (/app/vip/verification)
    ├── **Step 1: Government ID Upload**
    │   ├── Select document type (National ID / Passport / Driver's License)
    │   ├── Enter ID number (masked after entry)
    │   ├── Expiry date
    │   ├── Upload front image
    │   ├── Upload back image (if applicable)
    │   └── System checks: Format valid, not expired, name matches
    ├── **Step 2: Live Video Verification**
    │   ├── Instructions shown
    │   ├── Randomized challenge generated: "Blink twice" or "Turn head left"
    │   ├── Record 30-second video
    │   ├── System performs face match (photo vs. video)
    │   └── Automated checks passed
    ├── **Step 3: Truth Declaration**
    │   ├── Reads full declaration text
    │   ├── "I declare all information is truthful"
    │   ├── "Falsifying information = permanent ban"
    │   ├── Types full name (signature)
    │   └── Date auto-filled
    └── Submit for Manual Review
    ↓
VIP Coordinator Manual KYC Review (/admin/vip/verifications/:id)
    ├── Views uploaded ID images
    ├── Verifies ID is legitimate (not fake)
    ├── Watches video, confirms liveness challenge completed
    ├── Confirms face match (photo vs. video)
    ├── Checks for duplicate IDs in system
    ├── Reviews fraud indicators
    └── **Decision:** Approve Tier 5 / Reject / Request resubmission
    ↓
Tier 5 Approved → VIP Status Activated
    ├── Email: "✓ Tier 5 Verified! Your VIP status is active."
    ├── Verified Identity badge added to profile (public)
    └── Matchmaking expert assigned
    ↓
VIP Coordinator Assigns Expert (/admin/vip/assignments)
    ├── Reviews available experts (capacity, specialization)
    ├── Matches VIP to best-fit expert
    │   ├── Expert specializes in diaspora matches → Good fit for Dr. Amara
    │   ├── Expert has <10 active clients (capacity available)
    │   └── Expert has 85%+ satisfaction rating
    ├── Assignment created
    └── Expert notified: "New VIP client assigned: VIP-1234"
    ↓
Expert Receives Assignment (/admin/vip-expert/dashboard)
    ├── Sees new client in "My Clients" list
    ├── Views client profile (all 5 tiers visible)
    ├── Reviews VIP application responses
    └── Prepares for intake session
    ↓
VIP Concierge Intake (/app/vip/intake)
    ├── Receives email from expert: "Schedule your intake session"
    ├── Books 1-hour video call
    ├── Intake questionnaire pre-filled (from VIP application)
    ├── **Intake Session (Video Call):**
    │   ├── Expert introduces service
    │   ├── Deep dive into preferences beyond questionnaire
    │   ├── Discusses deal-breakers and must-haves
    │   ├── Reviews relationship history lessons
    │   ├── Assesses communication style
    │   ├── Sets expectations (2-3 introductions per month)
    │   └── Confirms privacy settings (disable browsing)
    ├── Post-session: Expert adds detailed notes
    └── VIP profile set to invisible (no longer in discovery)
    ↓
Expert Searches Compatible Matches (/admin/vip-expert/client/:id)
    ├── Searches VIP + Premium Tier 4 pool
    ├── Applies filters based on VIP's preferences:
    │   ├── Age 35-42
    │   ├── Education: Master's+
    │   ├── Location: Nigeria or UK-based
    │   ├── Faith: Christian
    │   ├── Diaspora: Open to relocation
    ├── Reviews 10-12 potential matches
    ├── Manually evaluates compatibility (not just filters)
    ├── Selects top 2 matches
    └── Prepares introduction proposals
    ↓
Expert Creates Introduction Proposal
    ├── Writes personalized introduction note for VIP
    ├── **Introduction Note Example:**
    │   "I'd like to introduce you to [First Name], 38, based in Lagos.
    │    He's a tech entrepreneur with a Master's in Computer Science.
    │    Like you, he values faith and family. He's open to relocation
    │    for the right partner and is serious about marriage within
    │    1-2 years. His genotype is AA (compatible with yours).
    │    I believe his ambition and cultural values align with yours."
    ├── Submits proposal to VIP for review
    └── Waits for VIP approval
    ↓
VIP Reviews Introduction (/app/vip/introductions)
    ├── Sees expert's note and match summary (Tier 1-4)
    ├── Reviews match's full profile
    ├── **Decision:** Interested / Not a match / Ask expert
    └── Approves introduction
    ↓
Expert Contacts Match (via platform message)
    ├── Explains VIP service (match may not know VIP user is on platform)
    ├── Shares VIP's profile summary (with consent)
    ├── Asks if interested in introduction
    └── Match agrees
    ↓
Expert Facilitates Introduction
    ├── Sends formal introduction email to both parties
    ├── Provides context on why good match
    ├── Offers to facilitate first conversation
    └── Both parties begin messaging
    ↓
VIP & Match Conversation (/app/messages/:id)
    ├── EDT = 4 (expert pre-negotiated sharing)
    ├── Expert monitors early messages (supportive, not intrusive)
    ├── After 1 week of positive messaging, expert checks in
    └── Expert available for coaching if needed
    ↓
**Relationship Progression:**
    ├── Video call scheduled (external)
    ├── In-person meeting arranged
    ├── Expert provides ongoing support
    ├── After 3 months → Serious relationship
    └── After 8 months → Engaged
    ↓
Success Exit Flow
    ├── Expert marked introduction as "successful" (triggers payment)
    ├── VIP provides testimonial (featured in "VIP Success Stories")
    └── Account deactivated with gratitude message
```

### Key Insights

**VIP Value:**
- No time wasted browsing
- Pre-vetted, high-quality introductions only
- Expert curation vs. algorithmic matching
- Complete privacy (profile invisible)
- Human support throughout journey
- Success rate: 60-70% find partner within 12 months

**Expert Payment Trigger:**
- Successful introduction = both parties exchange 3+ messages AND relationship active 7+ days
- Expert earns ₦50,000 per successful introduction
- Avg. 2-3 successful introductions per VIP client = ₦100,000-₦150,000 per client

---

## JOURNEY 4: Admin — Content Moderation Flow

**Persona:** Moderator (handling user report)
**Goal:** Review and resolve report fairly and quickly

### Flow Diagram

```
User Reports Inappropriate Content (/app/safety/report)
    ↓
Report Submitted
    ├── Reporter: User A
    ├── Reported: User B
    ├── Type: "Inappropriate messages"
    ├── Description: "User sent unsolicited explicit content"
    ├── Evidence: Screenshot attached
    └── Severity: "Urgent (safety concern)"
    ↓
Report Appears in Queue (/admin/reports)
    ├── Moderator sees new report (priority: urgent)
    ├── Report ID: #12345
    ├── Status: "New"
    └── Assigned to: Moderator_003
    ↓
Moderator Opens Report (/admin/reports/12345)
    ├── **Reviews Context:**
    │   ├── Reporter profile (credibility check)
    │   ├── Reported user profile
    │   ├── Relationship status (Show Interest accepted, messaging active)
    │   ├── Conversation thread (flagged messages visible)
    │   └── Screenshot evidence
    ├── **Investigates:**
    │   ├── Views reported user's recent activity
    │   ├── Checks for previous reports against same user
    │   ├── Searches for pattern (has user sent similar messages to others?)
    │   └── Reviews community guidelines violations
    ├── **Assessment:**
    │   ├── Violation confirmed: Explicit unsolicited content
    │   ├── Severity: High (sexual harassment)
    │   ├── First offense for this user
    │   └── Decision: 14-day suspension + final warning
    ↓
Moderator Takes Action
    ├── Selects: "Suspend user (14 days)"
    ├── Reason: "Sexual harassment - explicit unsolicited content"
    ├── Adds internal note: "First offense, but severe. If repeated → escalate for permanent ban."
    ├── Confirms action
    └── System processes suspension
    ↓
System Actions (Automated)
    ├── User B's account suspended (cannot log in for 14 days)
    ├── Email sent to User B: "Account suspended for policy violation"
    ├── Reported messages deleted from conversation
    ├── User A notified: "Action taken on your report. Thank you."
    ├── Audit log entry created
    └── Report status: "Resolved"
    ↓
**If User B Appeals Suspension:**
    ├── Appeal submitted via email: support@joymatcher.com
    ├── Super Admin reviews appeal (/admin/safety/appeals)
    ├── Reviews original report, moderator decision, evidence
    ├── **Decision:** Uphold suspension / Reduce / Overturn
    └── User notified of appeal result
    ↓
**If User B Repeats Violation After Suspension:**
    ├── New report filed by different user
    ├── Moderator sees: "Previous suspension for sexual harassment"
    ├── Escalates to Super Admin for permanent ban
    ├── Super Admin reviews and approves ban
    └── User B permanently banned (cannot create new account - email blacklisted)
```

---

## JOURNEY 5: Cross-Border Relationship

**Personas:** Chioma (diaspora, Toronto) & Kwame (home-based, Lagos)
**Goal:** Navigate cross-border relationship to marriage

### Flow Highlights

```
Both users complete Tier 1-4
    ↓
Chioma (Toronto) discovers Kwame (Lagos)
    ├── Sees "Diaspora" and "Open to relocation" indicators
    ├── Time zone displayed: GMT+1 (Lagos)
    └── Sends Show Interest
    ↓
Kwame accepts → Messaging begins
    ↓
Request Tier 3 → Family expectations aligned
    ├── Both want children
    ├── Marriage timeline: 1-2 years
    ├── Family involvement: High (both value family approval)
    └── Cross-border openness: Chioma willing to move back to Lagos in 2-3 years
    ↓
Request Tier 4 → Health compatibility confirmed
    ├── Both AA genotype (compatible)
    ├── Relocation: Kwame open to 1 year long-distance, then Chioma relocates
    └── Deal-breakers aligned
    ↓
Video calls (2-3x per week across time zones)
    ↓
Chioma visits Lagos → Meet in person
    ├── Meets Kwame's family (important cultural step)
    └── Chemistry confirmed
    ↓
6 months long-distance → Kwame visits Toronto
    ├── Meets Chioma's family
    └── Proposal
    ↓
Engaged → Chioma begins planning relocation
    ↓
Success Exit → Both deactivate accounts
    ├── Testimonial: "From Toronto to Lagos — Found love across borders"
    └── Featured in "Cross-Border Success Stories"
```

---

## JOURNEY 6: VIP Expert — Managing Assigned Clients

**Persona:** Matchmaking Expert (freelance contractor)
**Goal:** Successfully match VIP clients, earn payment

### Flow Diagram

```
Expert Receives Assignment Notification
    ↓
Logs into VIP Expert Portal (/admin/vip-expert/dashboard)
    ├── Sees: "New client assigned: VIP-1234"
    ├── Client count: 5/10 (capacity)
    └── Opens client profile
    ↓
Reviews Client Profile (/admin/vip-expert/client/VIP-1234)
    ├── Views all 5 tiers (full access for matchmaking)
    ├── Reads VIP application responses (18 questions)
    ├── Understands preferences, deal-breakers, relationship history
    └── Prepares intake session questions
    ↓
Schedules & Conducts Intake Session
    ├── 1-hour video call (Google Meet/Zoom)
    ├── Builds rapport with VIP client
    ├── Deep dives beyond questionnaire
    ├── Takes detailed notes (private, visible only to expert)
    └── Sets expectations (2-3 introductions per month)
    ↓
Searches Compatible Matches
    ├── Uses platform's search for assigned client
    ├── Filters: VIP + Premium Tier 4 users only
    ├── Applies client preferences
    ├── Manually reviews 10-15 potential matches
    └── Shortlists top 2 matches
    ↓
Creates Introduction Proposal
    ├── Writes personalized introduction note
    ├── Submits to VIP client for approval
    └── Awaits client decision
    ↓
**If Client Approves:**
    ├── Expert contacts match (via platform)
    ├── Match agrees to introduction
    ├── Expert facilitates introduction (email + platform message)
    └── Monitors early conversations
    ↓
**Tracking Outcome:**
    ├── If 3+ messages exchanged AND relationship active 7+ days → **Success**
    ├── If match declines or ghosted → Not counted
    └── Success triggers payment (₦50,000)
    ↓
Monthly Performance Review
    ├── Expert dashboard (/admin/vip-expert/performance)
    ├── This month: 3 successful introductions = ₦150,000
    ├── Client satisfaction rating: 4.7/5.0
    └── Payment processed on 5th of next month
    ↓
**If Expert Underperforms (<50% success rate or <4.0 satisfaction):**
    ├── VIP Coordinator reviews performance
    ├── Expert receives coaching or improvement plan
    ├── If no improvement → Clients reassigned, expert removed
```

---

## Related Documentation

- [Sitemap](sitemap.md) - All pages and routes
- [Tier System](tier_system.md) - Tier rules and logic
- [User Personas](user_personas.md) - Detailed persona profiles

---

**Document Owner:** Product Lead & UX Lead
**Last Reviewed:** 2026-02-26
**Next Review:** 2026-05-26 (Quarterly)
