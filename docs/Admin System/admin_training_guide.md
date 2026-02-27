# Admin Training & Onboarding Guide

**Version:** 1.0.0
**Last Updated:** 2026-02-26
**Status:** Specification Complete
**Classification:** Training Manual

---

## Overview

This comprehensive training guide covers onboarding procedures, training materials, and certification requirements for all JoyMatcher admin roles. Every admin must complete role-specific training before receiving access to production systems.

---

## Training Philosophy

### Core Principles

1. **Competence Before Access**
   - No admin receives production access until certified
   - Training completion is mandatory, not optional
   - Regular recertification ensures knowledge retention

2. **Role-Based Learning**
   - Training is tailored to specific role responsibilities
   - Admins learn what they need, not everything
   - Advanced training available for growth opportunities

3. **Hands-On Practice**
   - Theory + practical exercises + shadowing
   - Sandbox environment for safe experimentation
   - Real scenarios with guidance before solo work

4. **Continuous Learning**
   - Quarterly policy updates
   - Monthly knowledge-sharing sessions
   - Annual recertification requirement

---

## Training Requirements by Role

### Summary Matrix

| Role | Onboarding Duration | Mandatory Training Hours | Certification Exams | Shadowing Period | Recertification |
|------|---------------------|-------------------------|---------------------|------------------|-----------------|
| Super Admin | 5 days | 40 hours | 3 exams | N/A (founders) | Annual |
| Moderator | 3 days | 24 hours | 2 exams | 5 days | Annual |
| VIP Coordinator | 4 days | 32 hours | 3 exams | 7 days | Annual |
| VIP Expert | 2 days | 16 hours | 2 exams | 3 client observations | Bi-annual |
| Data Protection Officer | 3 days | 24 hours | 2 exams | N/A | Annual |
| Support Agent | 1 day | 8 hours | 1 exam | 3 days | Annual |

---

## General Admin Training (All Roles)

### Module 1: Platform Overview & Mission (2 hours)

**Learning Objectives:**
- Understand JoyMatcher's purpose and differentiation
- Grasp the trust-based matchmaking philosophy
- Recognize the marriage-intent context
- Appreciate the responsibility of admin roles

**Content:**

#### 1.1 Product Vision
```
JoyMatcher is NOT a dating app.

It is relationship infrastructure for marriage-minded professionals.

Key Differentiators:
├─ Trust-based (progressive disclosure via tiers)
├─ Consent-first (Show Interest gating)
├─ Investment-filtered (paid tiers unlock features)
├─ Marriage-oriented (not casual dating)
└─ VIP-curated (high-touch matchmaking service)

Admin Responsibility:
Every decision you make affects real people seeking life partners.
Quality over quantity. Trust over convenience.
```

#### 1.2 Product Walkthrough
- Hands-on exploration of user flows
- Experience both Free and Premium features
- Understand tier progression (1-5)
- Test Show Interest and messaging mechanics

**Exercise:**
Create a test user account and complete Tiers 1-3. Reflect on:
- What makes the tier system feel trustworthy?
- Where might users get frustrated?
- How does EDT (Effective Disclosure Tier) work in practice?

#### 1.3 Community Standards
- Review Community Guidelines
- Understand what content is appropriate vs. inappropriate
- Learn the balance between strict moderation and user autonomy
- Discuss gray areas and escalation

**Assessment:**
Multiple choice quiz (10 questions, 80% to pass)

---

### Module 2: Admin System Architecture (1 hour)

**Learning Objectives:**
- Understand role-based access control
- Know your role's permissions and limitations
- Recognize when to escalate
- Understand audit logging importance

**Content:**

#### 2.1 Role Hierarchy
```
Super Admin
    │
    ├── Moderator
    ├── VIP Coordinator
    │       └── VIP Expert (ISOLATED)
    ├── Data Protection Officer
    └── Support Agent
```

#### 2.2 Your Role's Permissions
- What you CAN do
- What you CANNOT do (and why)
- When to escalate to higher roles
- Consequences of permission violations

#### 2.3 Data Security Basics
- Why everything is logged
- Importance of data privacy
- Consequences of data breaches
- Your personal responsibility

**Assessment:**
Scenario-based quiz (5 scenarios, identify correct action)

---

### Module 3: Security & Compliance (1 hour)

**Learning Objectives:**
- Understand data protection laws (GDPR, NDPR)
- Recognize security threats
- Follow security best practices
- Handle sensitive information correctly

**Content:**

#### 3.1 Data Protection Laws
- GDPR basics (for international users)
- NDPR basics (for Nigerian users)
- User rights: access, deletion, portability
- Admin obligations

#### 3.2 Security Best Practices
- Strong password requirements
- Two-factor authentication (when required)
- Secure session management
- Recognizing phishing attempts
- Reporting security concerns

#### 3.3 Handling Sensitive Data
- What constitutes PII (Personally Identifiable Information)
- When you can access user data
- How to discuss user data internally
- Anonymization in discussions

**Exercise:**
Case study: A user requests their data. Walk through the proper procedure.

**Assessment:**
Security quiz (15 questions, 85% to pass)

---

### Module 4: Communication & Escalation (1 hour)

**Learning Objectives:**
- Communicate professionally with users
- Know when and how to escalate
- Document decisions clearly
- Handle difficult conversations

**Content:**

#### 4.1 Professional Communication
```
✅ DO:
- Use respectful, clear language
- Provide specific reasons for decisions
- Offer next steps or solutions
- Show empathy while maintaining boundaries

❌ DON'T:
- Use emotional or judgmental language
- Make promises you can't keep
- Share personal opinions as policy
- Engage in arguments with users
```

#### 4.2 Escalation Protocols
```
Escalate to Higher Role When:
├─ Situation exceeds your permissions
├─ You're uncertain about correct action
├─ User requests manager review
├─ Legal or safety concerns arise
└─ Pattern you haven't seen before

How to Escalate:
1. Document the situation thoroughly
2. Include your analysis and recommendation
3. Attach all relevant evidence
4. Use formal escalation tool (not casual chat)
5. Follow up to close the loop
```

#### 4.3 Documentation Standards
- What to log in audit trail
- How to write internal notes
- Creating clear escalation reports
- Maintaining user privacy in documentation

**Exercise:**
Practice writing escalation reports for 3 scenarios

---

## Role-Specific Training

---

## Moderator Training (24 hours total)

### Module 1: Content Moderation Fundamentals (4 hours)

**Learning Objectives:**
- Identify policy violations accurately
- Balance safety with user autonomy
- Apply moderation standards consistently
- Recognize unconscious bias

**Content:**

#### 1.1 Photo Moderation Standards
```
Approve: Professional, casual, clear face, appropriate attire
Reject: Sexually suggestive, face obscured, poor quality, group photos
Request Re-upload: Borderline quality, lighting issues
```

**Practice:**
Review 50 sample photos and make decisions. Trainer reviews for accuracy.

Target: >90% accuracy

#### 1.2 Profile Content Review
- Identifying inappropriate content
- Recognizing copy-paste responses
- Spotting scam indicators
- Handling cultural sensitivities

**Practice:**
Review 20 flagged profiles. Identify issues and recommend actions.

#### 1.3 Bias Awareness Training
```
Common Biases:
├─ Attractiveness bias (approving attractive profiles more leniently)
├─ Cultural bias (misunderstanding cultural expressions)
├─ Gender bias (different standards for men vs. women)
└─ Confirmation bias (seeing violations where you expect them)

Mitigation:
- Follow written standards, not gut feeling
- Request peer review for borderline cases
- Document reasoning for decisions
- Regular calibration sessions with team
```

**Assessment:**
Moderation simulation (20 items, must achieve 85% accuracy)

---

### Module 2: Report Handling & Investigation (6 hours)

**Learning Objectives:**
- Investigate user reports thoroughly
- Distinguish valid from invalid reports
- Take appropriate enforcement actions
- Communicate decisions to users

**Content:**

#### 2.1 Report Types & Severity
| Report Type | Severity | Response Time | Typical Action |
|-------------|----------|---------------|----------------|
| Harassment | Critical | <2 hours | Suspension |
| Explicit Content | Critical | <2 hours | Content removal + warning |
| Scam | High | <4 hours | Investigation + possible ban |
| Inappropriate Message | Medium | <12 hours | Warning |
| Profile Complaint | Low | <24 hours | Review profile |

#### 2.2 Investigation Process
```
Step 1: Review reporter's account (credibility check)
Step 2: Review reported user's account (history check)
Step 3: Examine evidence (messages, photos, behavior)
Step 4: Determine if violation occurred
Step 5: Select appropriate action
Step 6: Document decision with reasoning
Step 7: Notify both parties
Step 8: Monitor for retaliation
```

**Practice Scenarios:**

**Scenario 1: Harassment Report**
```
Reporter: "User sent me 5 messages after I declined Show Interest.
He called me rude and said I led him on."

Task: Investigate and determine appropriate action.

Evidence Provided:
- Message screenshots (5 messages over 2 days)
- Show Interest timeline
- Previous reports against reported user (1 warning, 60 days ago)

What do you do?
```

**Trainer evaluates:**
- Investigation thoroughness
- Decision appropriateness
- Communication quality
- Documentation clarity

#### 2.3 Enforcement Actions
```
Warning (First minor offense)
├─ Email sent to user
├─ Logged in account history
└─ No access restrictions

7-Day Suspension (Second offense or moderate violation)
├─ Cannot log in
├─ Profile hidden
├─ Email explains reason and duration
└─ Auto-reactivates after period

14-Day Suspension (Third offense or serious violation)
├─ Same as 7-day
└─ Final warning included

30-Day Suspension (Fourth offense or very serious)
├─ Same as above
└─ Escalate to Super Admin for permanent ban consideration

Permanent Ban (Pattern of violations or severe single incident)
├─ Super Admin only
├─ Account permanently deactivated
├─ Refund issued if subscriber
└─ IP and payment method flagged
```

**Exercise:**
For each scenario, select appropriate enforcement action and justify.

**Assessment:**
Case study exam (10 reports, must handle correctly, 80% to pass)

---

### Module 3: Scam Detection (4 hours)

**Learning Objectives:**
- Recognize common romance scam patterns
- Identify fake profiles (catfishing)
- Investigate suspicious activity
- Protect users from financial loss

**Content:**

#### 3.1 Romance Scam Patterns
```
Red Flags:
├─ Moves to external communication quickly (WhatsApp, email)
├─ Professes love very quickly ("love bombing")
├─ Elaborate sob stories (sick family, business emergency)
├─ Requests for money, gift cards, cryptocurrency
├─ Avoids video calls or in-person meetings
├─ Claims to be overseas (military, business trip)
├─ Too good to be true (wealthy, attractive, perfect match)
└─ Profile photos look professional/model-like
```

#### 3.2 Investigation Tools
- Reverse image search (Google Images, TinEye)
- IP address analysis
- Payment method verification
- Message pattern analysis
- Cross-referencing reported scammers

**Practice:**
```
Suspicious Profile Review Exercise:

Profile: "Dr. Sarah Johnson"
Age: 32
Location: Lagos
Occupation: Surgeon
Photos: 5 professional photos (suspiciously polished)
Joined: 2 days ago
Tier Progress: Tier 4 completed (very fast)

Investigation Steps:
1. Reverse image search all 5 photos
2. Review tier responses for authenticity
3. Check IP address location
4. Review message history (if any)
5. Compare with known scammer database

Your Task: Determine if profile is legitimate or scam.
Document findings and recommend action.
```

**Trainer provides:**
- Image search results
- IP data
- Sample messages
- Scammer database hits

**Moderator must:**
- Analyze all evidence
- Make determination
- Write suspension notice (if scam)
- Document for future reference

#### 3.3 User Protection
- Warning users who were contacted
- Preventing scammer re-registration
- Reporting to authorities (when warranted)
- Documenting patterns for platform improvements

**Assessment:**
Scam detection exam (5 profiles to evaluate, must correctly identify all scams)

---

### Module 4: Crisis Management (4 hours)

**Learning Objectives:**
- Recognize crisis situations
- Respond appropriately to threats
- Escalate urgent situations
- Maintain composure under pressure

**Content:**

#### 4.1 Crisis Situations
```
IMMEDIATE ESCALATION REQUIRED:
├─ Threats of violence or self-harm
├─ Child safety concerns
├─ Sexual assault reports
├─ Trafficking indicators
├─ Doxxing (publishing private info)
└─ Organized harassment campaigns
```

#### 4.2 Response Protocols
```
For Threats of Violence:
1. Take screenshot of threat immediately
2. Suspend threatening user immediately
3. Escalate to Super Admin (mark URGENT)
4. Contact platform legal counsel
5. Document thoroughly
6. Preserve all evidence
7. If imminent threat, advise victim to contact police

Do NOT:
- Dismiss or downplay threats
- Delay action to "investigate further"
- Engage with threatening user
- Promise confidentiality (safety overrides privacy)
```

#### 4.3 De-escalation Techniques
- Remaining calm
- Active listening
- Acknowledging concerns
- Providing clear next steps
- Setting boundaries professionally

**Scenario Training:**
```
Scenario: User calls support line screaming about another user
who "threatened to come to her house."

Role-play:
Trainer plays upset user.
Moderator must:
1. Calm user down
2. Get essential information
3. Take immediate protective action
4. Escalate appropriately
5. Follow up with user

Evaluation:
- Did moderator stay calm?
- Was immediate action taken?
- Was escalation appropriate?
- Was user reassured?
```

**Assessment:**
Crisis response simulation (must pass all scenarios)

---

### Module 5: Shadowing & Mentorship (5 days)

**Structure:**
- Days 1-2: Observe senior moderator handling reports
- Days 3-4: Handle reports with senior moderator reviewing
- Day 5: Solo moderation with spot checks

**Shadowing Checklist:**
- [ ] Observed 20+ photo moderation decisions
- [ ] Observed 10+ report investigations
- [ ] Observed 5+ suspension decisions
- [ ] Observed 2+ escalations to Super Admin
- [ ] Handled 10+ cases solo with approval
- [ ] Received feedback on communication style
- [ ] Practiced documentation standards

**Certification Requirements:**
- Trainer signs off on shadowing completion
- Final moderation exam (20 items, 85% accuracy)
- Communication assessment (reviewed suspension notices)

---

## VIP Coordinator Training (32 hours total)

### Module 1: VIP Service Philosophy (4 hours)

**Learning Objectives:**
- Understand VIP value proposition
- Grasp white-glove service expectations
- Recognize quality over quantity approach
- Appreciate trust through verification

**Content:**

#### 1.1 What VIP Means at JoyMatcher
```
VIP is NOT:
- Paying for priority in discovery feed
- Unlimited matches
- Guaranteed success

VIP IS:
- Dedicated expert matchmaker (human)
- Carefully curated introductions (2-3/month)
- Personalized relationship coaching
- Tier 5 verification (mutual safety)
- Access to verified VIP pool

Price: ₦200,000 - ₦600,000 (Nigeria) / $200 - $1,500 (International)

Expectation: High-touch, low-volume, high-quality
```

#### 1.2 Coordinator Responsibilities
- Application review and approval
- Tier 5 verification
- Expert assignment
- Quality monitoring
- Client satisfaction tracking
- Expert performance management
- Success story documentation

#### 1.3 Success Metrics
```
VIP Success Metrics:
├─ Client Satisfaction: Target >4.5 / 5.0
├─ Expert Performance: Target >60% acceptance rate
├─ Match Success: Target 20% of VIPs engaged within 12 months
├─ Churn Rate: Target <15% (renewals at 85%+)
└─ Response Time: Target <24 hours for all VIP inquiries
```

**Exercise:**
Review 3 real VIP success stories. Identify factors that contributed to success.

---

### Module 2: Application Review Process (6 hours)

**Learning Objectives:**
- Evaluate VIP applications objectively
- Identify serious vs. casual applicants
- Recognize red flags
- Communicate decisions professionally

**Content:**

#### 2.1 Application Evaluation Rubric
```
Scoring (out of 5.0):

Seriousness of Intent (40%):
├─ Clear marriage timeline
├─ Realistic expectations
├─ Demonstrates emotional readiness
└─ Understands VIP service value

Profile Quality (20%):
├─ Complete tier progression
├─ Thoughtful, specific responses
├─ Consistent across tiers
└─ Professional presentation

Compatibility (20%):
├─ Fits existing VIP pool
├─ Realistic partner preferences
├─ Geographic feasibility
└─ Age-appropriate expectations

Communication (10%):
├─ Professional language
├─ Respectful tone
├─ Clear articulation
└─ No red flags (demands, entitlement)

Verification Potential (10%):
├─ Profile seems authentic
├─ No scam indicators
├─ Stable employment/background
└─ Likely to pass Tier 5 verification

Approval Threshold: 3.5 / 5.0
```

#### 2.2 Practice Application Reviews
```
Exercise: Review 10 sample applications

For each:
1. Score using rubric
2. Write approval/rejection reasoning
3. Draft response to applicant
4. Identify any concerns

Applications include:
- Clear approvals (score >4.0)
- Clear rejections (score <3.0)
- Borderline cases (score 3.0-3.5)

Trainer provides feedback on:
- Scoring accuracy
- Decision rationale
- Communication quality
```

#### 2.3 Handling Borderline Cases
```
When application scores 3.0-3.5:

Option 1: Request Additional Information
"Thank you for your application. To ensure VIP matchmaking is the
right fit, could you please clarify:
1. [Specific question about intent]
2. [Specific question about expectations]
Please respond within 5 days."

Option 2: Conditional Approval
"Your application is approved with one note: [concern]. Let's discuss
this during your onboarding session with your matchmaker."

Option 3: Reject with Re-application Invitation
"We're not moving forward at this time due to [reason]. You're welcome
to reapply in [timeframe] after [specific action]."
```

**Assessment:**
Application review exam (10 applications, must score within 0.5 points of trainer, 80% accuracy)

---

### Module 3: Tier 5 Verification (8 hours)

**Learning Objectives:**
- Verify government-issued IDs accurately
- Conduct video KYC reviews
- Recognize fake documents
- Handle verification failures professionally

**Content:**

#### 3.1 ID Verification Training
```
Accepted Documents:
✅ International Passport
✅ Driver's License (with photo)
✅ National ID Card
✅ Government Employee ID (with verification seal)

❌ NOT Accepted:
❌ Student ID
❌ Work ID (private company)
❌ Expired documents
❌ Photocopies (must be original photo)
```

#### 3.2 Document Authenticity Checks
```
Red Flags for Fake IDs:
├─ Poor print quality or pixelation
├─ Misaligned text or logos
├─ Missing security features (holograms, watermarks)
├─ Inconsistent fonts
├─ Spelling errors on government doc
├─ Photo looks photoshopped onto document
├─ Shadows/lighting inconsistent
└─ Document corners look edited
```

**Practice:**
```
Exercise: Review 20 ID documents

10 legitimate IDs
10 fake or manipulated IDs

For each:
1. Identify as legitimate or fake
2. If fake, identify red flags
3. Compare photo with profile photos
4. Check name and DOB match

Target: >95% accuracy (must catch all fakes)
```

#### 3.3 Video KYC Review
```
Video Requirements:
├─ User says full name clearly
├─ User says current date
├─ User says 6-digit verification code
├─ User's face is clearly visible throughout
├─ Video is recorded in real-time (not pre-recorded)
└─ User appears to be alone (not coached)

Red Flags:
├─ Face in video doesn't match ID photo
├─ Video has editing cuts
├─ User is reading from script (too rehearsed)
├─ Someone else is visible off-camera
├─ Audio is dubbed or lip-sync is off
└─ Deepfake indicators (unnatural movements)
```

**Practice:**
```
Exercise: Review 15 video KYC submissions

10 legitimate videos
5 problematic videos (fake, pre-recorded, wrong person)

For each:
1. Verify spoken information matches
2. Compare face to ID and profile photos
3. Check for editing or manipulation
4. Approve or reject with reason

Target: 100% accuracy (must catch all fakes)
```

#### 3.4 Handling Verification Failures
```
Common Failure Scenarios:

1. Photo Doesn't Match
"We were unable to verify your identity as your current photos don't
match your ID. Please upload recent photos that show your current
appearance."

2. Document Expired
"Your ID has expired. Please upload a current government-issued ID."

3. Poor Video Quality
"Your video quality was insufficient for verification. Please record
in good lighting with your face clearly visible."

4. Suspected Fake Document
(Escalate to Super Admin. Do NOT accuse user directly.)
"We require additional verification. Our team will contact you within
24 hours."

Allow 3 verification attempts. After 3 failures, escalate.
```

**Assessment:**
Verification exam (20 IDs + 10 videos, must achieve >95% accuracy)

---

### Module 4: Expert Management (8 hours)

**Learning Objectives:**
- Assign VIPs to best-fit experts
- Monitor expert performance
- Handle underperforming experts
- Process expert payments

**Content:**

#### 4.1 Expert Assignment Strategy
```
Consider:
├─ Expert specialization (demographics, faith, location)
├─ Current workload (avoid overloading)
├─ Performance history (prioritize high performers)
├─ Client preferences (if expressed)
└─ Availability (expert must have capacity)

Target: 4-6 active clients per expert
Sweet spot: 5 clients per expert
```

**Practice:**
```
Exercise: Assign 5 new VIPs to expert pool

Given:
- 5 VIP client profiles
- 3 available experts with stats

For each VIP:
1. Review profile and preferences
2. Review expert specializations and performance
3. Select best-fit expert
4. Write assignment note to expert
5. Write welcome email to VIP

Trainer evaluates assignment logic and communication.
```

#### 4.2 Performance Monitoring
```
Monthly Review Checklist:
├─ Introductions sent (target: 2-3 per client per month)
├─ Acceptance rate (target: >60%)
├─ Client satisfaction scores (target: >4.5)
├─ Response time to clients (target: <24 hours)
├─ Session attendance rate (target: >95%)
└─ Successful matches (target: >1 per month)

Performance Tiers:
├─ Excellent (>4.7 satisfaction, >70% acceptance) → Bonus
├─ Good (4.3-4.7 satisfaction, 60-70% acceptance) → Continue
├─ Needs Improvement (<4.3 or <60%) → Performance Improvement Plan
└─ Poor (<4.0 or <50%) → Reassign clients, possible termination
```

#### 4.3 Performance Improvement Plans
```
When to Implement PIP:
- Expert below performance targets for 2 consecutive months
- Client complaints about expert
- Multiple reassignment requests

PIP Structure (60 days):
├─ Specific performance goals
├─ Weekly check-ins with coordinator
├─ Training/coaching support
├─ Reduced client load
└─ Clear consequences if goals not met

Example Goals:
- Improve acceptance rate from 45% to >55% within 30 days
- Improve satisfaction from 4.1 to >4.4 within 60 days
- Respond to all client messages within 24 hours (100% compliance)
```

**Practice:**
```
Exercise: Create Performance Improvement Plan

Given:
- Expert with declining performance (3.9 satisfaction, 48% acceptance)
- Client feedback: "Not responsive, matches don't fit my preferences"

Task:
1. Identify specific issues
2. Set measurable goals
3. Outline support provided
4. Draft PIP document
5. Schedule review timeline

Trainer evaluates comprehensiveness and feasibility.
```

#### 4.4 Payment Processing
```
Expert Payment Model:
├─ ₦50,000 per successful match
├─ Successful = Both parties message 3+ times AND active 7+ days
├─ Bonus: +₦10,000 if client satisfaction >4.5
├─ Penalty: -₦10,000 if acceptance rate <50%

Payment Timing: 5th of following month

Coordinator Responsibilities:
1. Review match success criteria
2. Calculate payments
3. Approve payouts
4. Send payment confirmations
5. Document for accounting
```

**Exercise:**
Calculate monthly payments for 3 experts based on performance data.

---

### Module 5: Shadowing & Mentorship (7 days)

**Structure:**
- Days 1-2: Shadow senior coordinator reviewing applications and verifications
- Days 3-4: Shadow expert assignment process and monthly reviews
- Days 5-6: Handle applications and verifications with oversight
- Day 7: Full day of solo work with spot checks

**Shadowing Checklist:**
- [ ] Observed 10+ application reviews
- [ ] Observed 10+ ID verifications
- [ ] Observed 5+ video KYC reviews
- [ ] Observed 3+ expert assignments
- [ ] Observed 2+ expert performance reviews
- [ ] Handled 5+ applications solo with approval
- [ ] Handled 5+ verifications solo with approval
- [ ] Created 2+ expert assignments with approval

**Certification:**
- Complete all shadowing requirements
- Pass application review exam (85%)
- Pass verification exam (95%)
- Senior coordinator approval
- Super Admin final sign-off

---

## VIP Expert Training (16 hours total)

### Module 1: Matchmaking Philosophy (3 hours)

**Learning Objectives:**
- Understand quality-over-quantity approach
- Learn JoyMatcher's matching methodology
- Recognize the importance of client rapport
- Appreciate the weight of your recommendations

**Content:**

#### 1.1 What Makes a Good Match?
```
NOT just:
- Physical attraction
- Checklist compatibility
- Similar backgrounds

BUT:
- Values alignment (faith, family, life goals)
- Complementary communication styles
- Shared vision for marriage
- Emotional maturity compatibility
- Realistic mutual expectations
```

#### 1.2 The Expert's Role
```
You are NOT:
- A dating coach (though coaching is part of it)
- An order-taker (doing what client says without guidance)
- A miracle worker (can't force chemistry)

You ARE:
- A trusted advisor
- A curator of high-quality introductions
- A relationship coach
- An accountability partner
- A client advocate
```

#### 1.3 Success Metrics
```
Your Success is Measured By:
├─ Introduction acceptance rate (target: >60%)
├─ Client satisfaction rating (target: >4.5 / 5.0)
├─ Successful matches (target: 2-3 per quarter)
├─ Client engagement (active participation in process)
└─ Professional conduct (timely, respectful, confidential)

Payment:
- ₦50,000 per successful match
- Bonus for high satisfaction
- Payment monthly (5th of month)
```

---

### Module 2: Client Onboarding (4 hours)

**Learning Objectives:**
- Conduct effective onboarding sessions
- Extract deep client insights
- Build trust and rapport quickly
- Set realistic expectations

**Content:**

#### 2.1 The Onboarding Session (60-90 minutes)
```
Structure:

1. Introduction & Rapport Building (10 min)
├─ Introduce yourself and background
├─ Explain your role and process
└─ Set session expectations

2. Deep Dive: Client's Story (20 min)
├─ Past relationships: What worked? What didn't?
├─ Emotional patterns: How do you handle conflict?
├─ Growth journey: How have you evolved?
└─ Readiness: Why marriage now?

3. Ideal Partner Exploration (20 min)
├─ Go beyond surface traits
├─ Uncover underlying values
├─ Challenge unrealistic expectations gently
└─ Identify true deal-breakers vs. preferences

4. Process & Expectations (10 min)
├─ How matching works
├─ Timeline (2-3 introductions per month)
├─ Client's role in success
└─ Communication expectations

5. Q&A & Next Steps (10 min)
├─ Address concerns
├─ Schedule first check-in
└─ Encourage openness
```

#### 2.2 Key Questions to Ask
```
Past Relationships:
- "What patterns do you notice in your past relationships?"
- "What have you learned about yourself from past breakups?"
- "What would your ex say was the reason things didn't work?"

Emotional Readiness:
- "How do you handle disagreements with people you care about?"
- "What does vulnerability mean to you in a relationship?"
- "How do you know when you're ready to commit?"

Ideal Partner:
- "Beyond the checklist, what feeling do you want with your partner?"
- "What's one thing you need in a partner that's non-negotiable?"
- "What would you be willing to compromise on?"

Marriage Vision:
- "What does a typical weeknight look like in your ideal marriage?"
- "How do you envision decision-making in your marriage?"
- "What role does extended family play in your marriage vision?"
```

**Practice:**
```
Exercise: Mock Onboarding Sessions

Trainer plays VIP client.
Expert conducts full onboarding session.

Scenarios:
1. Client with clear vision (easy)
2. Client with vague/unrealistic expectations (challenging)
3. Client with past trauma affecting readiness (sensitive)

Trainer evaluates:
- Rapport building
- Question quality
- Active listening
- Expectation setting
- Professionalism
```

---

### Module 3: Match Search & Curation (4 hours)

**Learning Objectives:**
- Use platform search tools effectively
- Evaluate compatibility beyond surface level
- Create compelling introduction proposals
- Handle client feedback on matches

**Content:**

#### 3.1 Search Strategy
```
Start Broad, Then Refine:

Step 1: Apply Hard Filters
├─ Age range (client's stated range)
├─ Location (geographic compatibility)
├─ Tier completion (minimum Tier 4)
├─ Subscription (Premium or VIP only)
└─ Deal-breakers (smoking, wants kids, etc.)

Step 2: Review Profiles for Values Alignment
├─ Faith compatibility
├─ Family values
├─ Life goals (career, travel, lifestyle)
└─ Communication style (from tier responses)

Step 3: Assess Realistic Compatibility
├─ Would they realistically be attracted to each other?
├─ Do their expectations align?
├─ Are there obvious incompatibilities?
└─ What's the unique value proposition for each?

Step 4: Select Top 3 Matches
├─ Different enough to give client options
├─ All high-quality (not 1 great + 2 fillers)
└─ Each with clear rationale for match
```

#### 3.2 Creating Introduction Proposals
```
Proposal Structure:

1. Summary (2-3 sentences)
"I'd like to introduce you to Tunde, a 35-year-old architect in Lagos.
He shares your Christian faith and values family deeply. I think
you'd appreciate his thoughtful communication style."

2. Why This Match Makes Sense (3-4 points)
├─ Values alignment
├─ Lifestyle compatibility
├─ Personality complement
└─ Shared interests/goals

3. Honest Considerations (1-2 points)
"While Tunde is introverted like you, he's working on being more
socially confident. This might be something to explore together."

4. Next Steps
"If you'd like to meet Tunde, I'll reach out to him and facilitate
an introduction. Let me know your thoughts!"
```

**Practice:**
```
Exercise: Create 3 Introduction Proposals

Given:
- VIP client profile (detailed)
- 10 potential matches (profiles)

Task:
1. Select 3 best matches
2. Write introduction proposal for each
3. Explain why you rejected other 7

Trainer evaluates:
- Match quality
- Proposal persuasiveness
- Honesty about considerations
- Rejection reasoning
```

#### 3.3 Handling Feedback
```
Client Declines All 3 Matches:

Good Response:
"Thank you for the feedback. I understand these weren't quite right.
Let's discuss what specifically didn't resonate so I can refine
my search. Can we schedule a quick call this week?"

Bad Response:
"I spent hours on these matches. Can you be more specific about
what you want?"

Client Accepts Match:
1. Reach out to match to gauge interest
2. If match is interested, facilitate introduction
3. Provide both with conversation starter tips
4. Check in after 3 days
5. Monitor conversation progress
```

---

### Module 4: Data Privacy & Confidentiality (3 hours)

**CRITICAL:** VIP Experts are external contractors with access to sensitive data.

**Learning Objectives:**
- Understand legal obligations (NDAs)
- Recognize what constitutes a privacy breach
- Follow data handling protocols strictly
- Understand consequences of violations

**Content:**

#### 4.1 What You Can Access (and Why It's Restricted)
```
You CAN Access:
├─ Your assigned VIP clients (full profiles)
├─ Potential matches FOR your clients (to evaluate compatibility)
├─ Your performance metrics
└─ Your payment history

You CANNOT Access:
├─ Other experts' clients
├─ Unassigned VIP users
├─ Free or Premium users (except as matches)
├─ Platform-wide data or analytics
└─ Other experts' performance or earnings
```

#### 4.2 Data Isolation Enforcement
```
Technical Safeguards:
- All your queries are filtered to assigned clients only
- Attempting to access unauthorized data triggers alerts
- System logs all data access
- VIP Coordinator monitors access patterns

Your Responsibilities:
- Only access data for legitimate matchmaking purposes
- Never share client information outside platform
- Never screenshot or download client data
- Never discuss clients by name outside secure channels
```

#### 4.3 Confidentiality Scenarios
```
Scenario 1: You recognize a VIP client in public
Action: Do NOT acknowledge them unless they acknowledge you first.
Rationale: They may not want others to know they use matchmaking service.

Scenario 2: Friend asks if you know of any single professionals
Action: Do NOT share client information, even anonymously.
Rationale: Clients expect complete confidentiality.

Scenario 3: Journalist wants to interview you about matchmaking
Action: Refer to VIP Coordinator. Do NOT discuss specific clients.
Rationale: Media requires approval and client consent.

Scenario 4: Family member asks about your work
Action: Speak generally about matchmaking. Do NOT share identifiable details.
Rationale: Confidentiality extends to personal relationships.
```

#### 4.4 Breach Consequences
```
First Violation (Accidental):
- Warning
- Retraining required
- Monitoring increased

Second Violation:
- Suspension
- Clients reassigned
- Performance review

Third Violation or Intentional Breach:
- Contract termination
- Forfeiture of unpaid earnings
- Legal action (breach of NDA)
- Potential criminal prosecution (data protection laws)

The platform monitors all access. Don't test the system.
```

**Assessment:**
- Confidentiality exam (20 scenarios, 100% required to pass)
- Sign NDA and confidentiality agreement
- Acknowledge understanding of consequences

---

### Module 5: Shadowing & Certification (3 client observations)

**Structure:**
Expert observes senior expert with 3 different clients:
1. **Onboarding Session:** See how rapport is built
2. **Match Presentation:** See how matches are introduced
3. **Coaching Session:** See how relationship guidance is provided

**Certification Process:**
- Complete all training modules
- Pass confidentiality exam (100%)
- Complete 3 shadowing observations
- Conduct 1 mock onboarding (trainer plays client)
- Receive first client assignment (under close monitoring)

---

## Support Agent Training (8 hours total)

### Module 1: Platform Basics (2 hours)
- User flows and features
- Subscription tiers
- Common user questions
- Escalation protocols

### Module 2: Customer Service Skills (3 hours)
- Professional communication
- Active listening
- De-escalation techniques
- Empathy while maintaining boundaries

### Module 3: Ticketing System & Tools (2 hours)
- Using support ticket system
- Categorizing and prioritizing tickets
- Documentation standards
- SLA compliance

### Module 4: Shadowing (1 day)
- Observe 20+ ticket responses
- Handle 10 tickets with oversight

---

## Recertification Requirements

### Annual Recertification (All Roles)

**Due:** Anniversary of initial certification

**Requirements:**
1. **Policy Update Training (2 hours)**
   - Review all policy changes from past year
   - New feature training
   - Updated procedures

2. **Refresher Quiz (1 hour)**
   - 50 questions covering core responsibilities
   - Must score 80% or retake training

3. **Performance Review (30 minutes)**
   - Manager reviews performance metrics
   - Discusses areas for improvement
   - Sets goals for next year

4. **Security Retraining (1 hour)**
   - Updated security threats
   - New compliance requirements
   - Incident case studies

**Total Time:** 4.5 hours

**Failure to Recertify:**
- Grace period: 30 days
- After 30 days: Account suspended until recertified
- After 60 days: Account deactivated (must complete full onboarding again)

---

## Training Resources

### Internal Knowledge Base
```
Location: admin.joymatcher.com/training

Contents:
├─ Training Modules (video + text)
├─ Policy Documents
├─ Decision Flowcharts
├─ Template Library (messages, reports, etc.)
├─ FAQ for Admins
├─ Escalation Guides
└─ Case Studies
```

### Monthly Knowledge Sharing Sessions

**Format:**
- 1 hour, monthly
- All admins invited (role-specific breakouts)
- Topics: New policies, case studies, Q&A

**Topics Rotate:**
- Jan: Moderation best practices
- Feb: VIP success stories and lessons
- Mar: Security and compliance updates
- Apr: Cross-functional collaboration
- (etc.)

### Peer Mentorship Program

**Structure:**
- New admins paired with senior admin in same role
- Monthly check-ins for first 6 months
- Open channel for questions
- Mentor receives bonus for successful mentee development

---

## Training Evaluation

### Measuring Training Effectiveness

**Metrics:**
- Time to certification (target: Within role-specific timeframe)
- First-attempt pass rate on exams (target: >80%)
- Post-training performance (target: Meet role benchmarks within 90 days)
- Training satisfaction surveys (target: >4.5 / 5.0)

**Continuous Improvement:**
- Quarterly review of training materials
- Incorporate common mistakes into training
- Update based on new features/policies
- Solicit feedback from recent trainees

---

## Related Documentation

- [Admin Architecture](admin_architecture.md) - Overall admin system design
- [Admin Roles & Permissions](admin_roles_permissions.md) - Permission matrices
- [Moderation Workflows](moderation_workflows.md) - Detailed moderation procedures
- [VIP Coordination](vip_coordination.md) - VIP management procedures
- [VIP Expert Isolation](vip_expert_isolation.md) - Data security for experts

---

**Document Owner:** Learning & Development Lead
**Training Coordinator:** Senior Admin (rotating quarterly)
**Last Reviewed:** 2026-02-26
**Next Review:** 2026-05-26 (Quarterly)
