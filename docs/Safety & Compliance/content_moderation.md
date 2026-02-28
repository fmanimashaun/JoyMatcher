# Content Moderation System

**Version:** 1.0.0
**Last Updated:** 2026-02-26
**Status:** Complete Specification
**Applies To:** All user-generated content (photos, profiles, messages)

---

## 1. Executive Summary

JoyMatcher's content moderation system ensures all user-generated content adheres to community guidelines while respecting the platform's marriage-oriented, trust-based model. This document specifies photo moderation standards, profile moderation procedures, automated detection systems, manual review workflows, and tier-specific content requirements.

Given JoyMatcher's unique context—deep personal disclosure including health data, verified identities, and investment-based access—content moderation must balance:
- Protecting vulnerable disclosures (Tier 3-5 data)
- Preventing exploitation and scams
- Maintaining professional, marriage-oriented tone
- Enabling authentic self-presentation
- Detecting fraud and impersonation

---

## 2. Moderation Philosophy

### 2.1 Core Principles

1. **Trust-Aligned**: Moderation reinforces platform trust model
2. **Tier-Aware**: Higher tiers require stricter verification
3. **Context-Sensitive**: Marriage context differs from casual dating
4. **Consent-Protective**: No content bypasses tier/EDT rules
5. **Proactive**: Automated + human review before publication
6. **Transparent**: Clear guidelines, consistent enforcement
7. **Appealable**: Users can contest moderation decisions

### 2.2 Moderation Scope

**In Scope:**
- Profile photos (primary + additional)
- Tier 1-5 text responses
- Bio/about sections
- Messages between users
- VIP verification artifacts

**Out of Scope (Different Systems):**
- User reports (covered in `safety_system.md`)
- Payment fraud (financial team)
- Account verification (identity team)

---

## 3. Photo Moderation Standards

### 3.1 Photo Categories

#### 3.1.1 Primary Profile Photo

**Purpose**: First impression, identity representation, liveness check

**Requirements:**
- Clear view of face (>50% of frame)
- Solo photo (no group shots)
- Taken within last 2 years
- Well-lit and in focus
- User is looking at camera (or near-camera)
- No sunglasses, masks, or obstructions (medical exceptions allowed)
- No children visible (user's own children allowed if face obscured)
- No nudity or revealing clothing
- No text overlays, filters that obscure features
- Minimum resolution: 800x800px

**Automatic Rejection:**
- Multiple people in photo
- Face not visible
- Cartoon, anime, celebrity photo
- Stock photo (detected via reverse search)
- Explicit content
- Image quality too low (<400x400px)

#### 3.1.2 Additional Photos (Tier 1+)

Users can upload up to 6 additional photos.

**Requirements:**
- At least one additional clear face photo
- Activity/lifestyle photos allowed
- Group photos allowed (user must be identifiable)
- Travel, hobby, pet photos allowed
- Same content standards as primary photo

**Prohibited:**
- Sexually suggestive poses or clothing
- Bathroom mirror selfies (discouraged, not banned)
- Excessive filters (Snapchat dog ears, etc.)
- Memes or screenshots
- Photos of text/documents
- Photos with contact information visible

#### 3.1.3 Tier 5 Verification Photos

**Purpose**: Government ID verification + liveness check

**Requirements:**
- Government-issued ID (passport, driver's license, national ID)
- Live selfie holding ID next to face
- Video liveness check (blink, turn head)
- Face match between ID, selfie, and profile photo
- ID details readable (name, DOB, photo)

**Security:**
- Encrypted storage
- Never displayed to other users
- Accessed only by verification team
- Auto-deleted after verification (metadata retained)

---

### 3.2 Photo Review Workflow

#### 3.2.1 Automated Pre-Check (Instant)

All uploaded photos pass through:

```javascript
const automatedPhotoChecks = [
  // Technical Quality
  { check: "minResolution", params: { width: 800, height: 800 } },
  { check: "maxFileSize", params: { size: 10 * 1024 * 1024 } }, // 10MB
  { check: "validFormat", params: { formats: ["jpg", "jpeg", "png", "heic"] } },

  // Content Detection (ML Models)
  { check: "faceDetection", params: { minConfidence: 0.7, requiredForPrimary: true } },
  { check: "nudityDetection", params: { maxScore: 0.3 } },
  { check: "violenceDetection", params: { maxScore: 0.2 } },
  { check: "textOverlay", params: { maxCoverage: 0.2 } },
  { check: "multipleFaces", params: { allowedForPrimary: false } },

  // Fraud Detection
  { check: "reverseImageSearch", params: { maxMatches: 0 } },
  { check: "stockPhotoDetection", params: { confidence: 0.8 } },
  { check: "deepfakeDetection", params: { confidence: 0.7 } },

  // Policy Checks
  { check: "minorDetection", params: { maxConfidence: 0.1 } },
  { check: "celebrityDetection", params: { confidence: 0.9 } }
];
```

**Outcomes:**
- **Auto-Approve**: All checks passed, no flags → Published immediately
- **Flag for Review**: Borderline scores → Manual review queue
- **Auto-Reject**: Critical violations → Rejected with reason

**Auto-Approval Rate Target**: >80% of photos

#### 3.2.2 Manual Review Queue

Flagged photos enter moderation queue with priority levels:

**Priority Levels:**
- **P1 (Critical)**: Potential CSAM, violence → Review within 1 hour, escalate immediately
- **P2 (High)**: Nudity, impersonation → Review within 4 hours
- **P3 (Standard)**: Quality issues, multiple faces → Review within 24 hours
- **P4 (Low)**: Minor flags → Review within 72 hours

**Reviewer Dashboard:**
```
┌─────────────────────────────────────────────────────┐
│ Photo Review Queue                    [P2 High: 3]  │
├─────────────────────────────────────────────────────┤
│                                                     │
│ User #12345 - Primary Photo          Flagged: 2h ago│
│                                                     │
│ [Large Photo Preview]                              │
│                                                     │
│ Flagged for: Nudity Detection (Score: 0.42)       │
│                                                     │
│ User Context:                                      │
│ • Free account, Tier 1 incomplete                 │
│ • 1st photo upload                                │
│ • No previous violations                          │
│                                                     │
│ Detection Details:                                 │
│ • Nudity: 0.42 (threshold: 0.30)                  │
│ • Face confidence: 0.95                           │
│ • Resolution: 1200x1200                           │
│ • No reverse search matches                       │
│                                                     │
│ ○ Approve                                          │
│ ○ Reject - Inappropriate content                  │
│ ○ Reject - Quality issues                         │
│ ○ Reject - Not user                               │
│ ○ Escalate to senior reviewer                     │
│                                                     │
│ Reviewer Notes:                                    │
│ ┌───────────────────────────────────────────────┐ │
│ │                                               │ │
│ └───────────────────────────────────────────────┘ │
│                                                     │
│ [Submit Decision]                                   │
└─────────────────────────────────────────────────────┘
```

**Reviewer Training Focus:**
- Recognizing context (beach photo vs. inappropriate)
- Cultural sensitivity (dress standards vary)
- False positive patterns
- Stock photo identification
- Impersonation detection
- Deepfake indicators

#### 3.2.3 Rejection Notifications

```
┌─────────────────────────────────────────┐
│      Photo Could Not Be Approved        │
├─────────────────────────────────────────┤
│                                         │
│ Your photo was reviewed and does not   │
│ meet our photo guidelines.             │
│                                         │
│ Reason: Face not clearly visible       │
│                                         │
│ Photo Guidelines:                      │
│ • Clear, recent photo of your face     │
│ • No sunglasses or obstructions        │
│ • Solo photo (for primary)             │
│ • Appropriate clothing                 │
│ • No text overlays                     │
│                                         │
│ Please upload a different photo.       │
│                                         │
│ [Review Guidelines]  [Upload New Photo] │
└─────────────────────────────────────────┘
```

**Rejection Reasons (User-Facing):**
- Face not clearly visible
- Multiple people in photo
- Photo appears to be filtered or edited excessively
- Inappropriate content
- Image quality too low
- Photo appears to be of someone else

**Rejection Reasons (Internal):**
- Stock photo detected
- Celebrity/public figure
- Reverse search match
- Nudity score: 0.42
- Minor detected with confidence >0.8
- Deepfake indicators

---

### 3.3 Special Photo Categories

#### 3.3.1 Lifestyle Photos (Hobbies, Travel)

**Allowed:**
- Gym/fitness photos (appropriate attire)
- Travel/vacation photos
- Hobby photos (cooking, sports, art)
- Professional/work environment photos
- Pet photos

**Guidelines:**
- Must be appropriate for professional context
- No swimsuit photos as primary photo
- Beach/pool photos allowed if tasteful
- Gym photos must show appropriate coverage

#### 3.3.2 Cultural & Religious Dress

**Respect for Diversity:**
- Hijab, niqab, turban, yarmulke, etc. allowed
- Face visibility requirement relaxed if cultural/religious
- Alternative verification method for Tier 5 (video call)
- Clear communication about tier unlock implications

#### 3.3.3 Photos with Children

**Strict Policy:**
- User's own children: Allowed if child's face is obscured (emoji, blur)
- Other people's children: Never allowed
- School/daycare photos: Not allowed
- Pregnancy photos: Allowed (relevant to Tier 3 disclosure)

**Enforcement:**
- Automated minor detection
- Manual review required
- Zero tolerance for CSAM (immediate law enforcement referral)

---

## 4. Profile Content Moderation

### 4.1 Tier-by-Tier Moderation

#### 4.1.1 Tier 1: Identity & Intent

**Fields Requiring Moderation:**
- Display name
- Bio/about section
- Faith/belief orientation (free text)

**Display Name Rules:**
- 2-30 characters
- Letters, spaces, hyphens only
- No numbers (exceptions: cultural names)
- No titles (Dr., Mr., Mrs.)
- No special characters (@, #, $)
- No contact information
- No offensive language
- No celebrity/brand names

**Bio Section Rules:**
- Max 500 characters
- No contact information (email, phone, social media handles)
- No external links
- No solicitation (business, religious conversion, financial)
- No copy-paste templated bios flagged as spam
- Must be relevant to dating/relationships
- No NSFW language

**Automated Checks:**
```javascript
const tier1Checks = {
  displayName: [
    { pattern: /\d{3,}/, reject: "Contact info suspected" },
    { pattern: /@|#|\$/, reject: "Special characters not allowed" },
    { pattern: /Dr\.|Mr\.|Mrs\.|CEO/, reject: "No titles" },
    { wordlist: offensiveWords, reject: "Inappropriate language" }
  ],
  bio: [
    { pattern: emailRegex, reject: "No contact information" },
    { pattern: phoneRegex, reject: "No contact information" },
    { pattern: urlRegex, reject: "No external links" },
    { pattern: /cash\s*app|venmo|paypal/i, reject: "No payment requests" },
    { pattern: /telegram|whatsapp|snapchat|instagram/i, reject: "No social media handles" },
    { checkPlagiarism: true, threshold: 0.8, flag: "Potential copy-paste bio" }
  ]
};
```

#### 4.1.2 Tier 2: Lifestyle & Background

**Fields Requiring Moderation:**
- Occupation category (free text option)
- Lifestyle indicators (free text explanations)

**Moderation Focus:**
- Verify occupation matches category
- Flag vague/evasive answers
- Detect inconsistencies with Tier 1 data
- Check for financial solicitation hints

**Examples:**
- ✅ "Software Engineer at tech startup"
- ✅ "Self-employed consultant"
- ❌ "CEO of my own business (contact me for details)"
- ❌ "Ask me 😉"
- ❌ "None of your business"

#### 4.1.3 Tier 3: Relationship & Family

**Moderation Focus:**
- Verify consistency (e.g., "never married" but "2 children")
- Flag evasive answers in mandatory fields
- Detect concerning patterns (rushed marriage timeline, controlling language)
- Review family-related deal breakers for hate speech

**Sensitive Content:**
- Divorce mentioned: No judgment, ensure respectful
- Custody issues: Ensure no identifying info about children
- Family deal breakers: Flag discriminatory language

#### 4.1.4 Tier 4: Health & Long-Term

**Critical Moderation:**
- Medical misinformation (e.g., "genotype doesn't matter")
- Pressure language ("you must accept my condition")
- Stigmatizing language about health conditions
- Falsified health claims

**Manual Review Required:**
- All Tier 4 completions reviewed by specialized team
- Health-trained moderators
- Verify disclaimers accepted
- Check for inconsistencies

#### 4.1.5 Tier 5: Verified Identity

**Verification Team Review:**
- Government ID verification
- Face match between ID, selfie, video
- Name consistency across documents
- Liveness check validation
- KYC compliance

**Rejection Reasons:**
- ID expired or invalid
- Face mismatch (confidence <0.85)
- ID appears forged or altered
- Name inconsistency
- Liveness check failed
- Underage (DOB shows <21 years)

---

### 4.2 Profile Consistency Checks

#### 4.2.1 Cross-Tier Validation

**Automated Consistency Rules:**
```javascript
const consistencyChecks = [
  {
    rule: "ageMatchesDOB",
    check: (tier1, derived) => {
      const dobAge = calculateAge(tier1.dateOfBirth);
      return dobAge === derived.displayAge;
    }
  },
  {
    rule: "locationConsistency",
    check: (tier1, tier2) => {
      // If occupation is location-specific, verify against residence
      if (tier2.workMode === "onsite" && tier2.occupationCity) {
        return tier2.occupationCity === tier1.city;
      }
      return true;
    }
  },
  {
    rule: "childrenMaritalStatus",
    check: (tier3) => {
      if (tier3.numberOfChildren > 0 && tier3.maritalHistory === "never_married") {
        return { flag: true, reason: "Children without marriage history" };
      }
      return { flag: false };
    }
  },
  {
    rule: "timelineRealism",
    check: (tier3) => {
      if (tier3.marriageTimeline === "within_3_months") {
        return { flag: true, reason: "Unusually rushed timeline - verify intent" };
      }
      return { flag: false };
    }
  }
];
```

**Flagged Inconsistencies:**
- Manual review required before Tier completion
- User prompted to clarify
- Tier remains locked until resolved

#### 4.2.2 Update Moderation

**Profile Updates:**
- Photo changes: Full re-moderation
- Tier edits (after completion): Flagged for review
- Bio changes: Automated checks + periodic sampling

**Suspicious Pattern Detection:**
- Frequent photo changes (>5/month): Flag for impersonation check
- Tier downgrades: Review reason (data revocation is normal)
- Multiple name changes: Flag for verification

---

## 5. Message Content Moderation

### 5.1 Real-Time Message Filtering

**Automated Block (Message Not Sent):**
- Contact information (phone, email, social media)
- External links (unless whitelisted domains)
- Payment requests
- Explicit sexual content
- Hate speech keywords
- Threats or violence language

**Automated Flag (Message Sent, Flagged for Review):**
- Borderline inappropriate language
- Repetitive message patterns (copy-paste)
- Excessive capitalization
- Financial discussion (context-dependent)

**User Experience:**
```
┌─────────────────────────────────────────┐
│ Message Could Not Be Sent               │
├─────────────────────────────────────────┤
│                                         │
│ Your message contains content that     │
│ violates our messaging guidelines.     │
│                                         │
│ Issue: Contact information             │
│                                         │
│ Please keep conversations on JoyMatcher│
│ until you're both comfortable sharing  │
│ personal contact details.              │
│                                         │
│ [Edit Message]              [Cancel]    │
└─────────────────────────────────────────┘
```

### 5.2 Message Review Triggers

**Automatic Review Triggers:**
- User reports message
- Keyword match (threats, scams)
- Pattern detection (harassment)
- Multiple users report same sender

**Review SLA:**
- P1 (Safety concern): 1 hour
- P2 (Harassment, explicit): 4 hours
- P3 (Spam, inappropriate): 24 hours

### 5.3 Contextual Moderation

**Marriage Context Exceptions:**
- "Children": Normal discussion (not CSAM)
- "Family": Expected topic
- "Money": Financial compatibility discussion allowed (vs. solicitation)
- "Health": Tier 4 discussions expected
- "Religion": Core compatibility factor

**Moderator Training:**
- Recognize normal marriage-oriented conversations
- Distinguish between compatibility discussion and harassment
- Understand cultural context
- Avoid over-moderation

---

## 6. Automated Moderation Technology

### 6.1 Machine Learning Models

#### 6.1.1 Image Classification

**Models Deployed:**
```javascript
const imageModels = {
  nudityDetection: {
    model: "NudeNet v2.0",
    classes: ["safe", "partially_nude", "nude"],
    threshold: 0.3,
    vendor: "AWS Rekognition / Custom"
  },
  faceDetection: {
    model: "MTCNN",
    minConfidence: 0.7,
    detectLandmarks: true
  },
  objectDetection: {
    model: "YOLOv8",
    detectedObjects: ["person", "child", "weapon", "drugs"]
  },
  textDetection: {
    model: "EasyOCR",
    languages: ["en", "yo", "ig", "ha"],
    flagThreshold: 0.2 // % of image covered by text
  },
  deepfakeDetection: {
    model: "XceptionNet",
    threshold: 0.7
  }
};
```

#### 6.1.2 Text Classification

**NLP Models:**
```javascript
const textModels = {
  toxicityDetection: {
    model: "Perspective API",
    attributes: [
      "TOXICITY",
      "SEVERE_TOXICITY",
      "IDENTITY_ATTACK",
      "INSULT",
      "PROFANITY",
      "THREAT",
      "SEXUALLY_EXPLICIT"
    ],
    thresholds: {
      auto_reject: 0.9,
      flag_for_review: 0.6
    }
  },
  contactInfoExtraction: {
    patterns: [
      { type: "email", regex: /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/ },
      { type: "phone", regex: /(\+?\d{1,3}[-.\s]?)?(\(?\d{3}\)?[-.\s]?)?\d{3}[-.\s]?\d{4}/ },
      { type: "social", regex: /@[a-zA-Z0-9_.]{3,30}/ },
      { type: "url", regex: /https?:\/\/[^\s]+/ }
    ]
  },
  spamDetection: {
    model: "FastText Classifier",
    features: ["repetitive_phrases", "promotional_language", "urgency_keywords"]
  },
  languageDetection: {
    model: "langdetect",
    supportedLanguages: ["en", "yo", "ig", "ha"],
    flagUnsupported: true
  }
};
```

### 6.2 Reverse Image Search

**Implementation:**
```javascript
const reverseImageSearch = async (imageUrl) => {
  const results = await Promise.all([
    // Search major databases
    googleReverseImageSearch(imageUrl),
    tineye(imageUrl),

    // Check stock photo databases
    shutterstock.search(imageHash(imageUrl)),
    getty.search(imageHash(imageUrl)),

    // Check social media (limited access)
    facebookImageSearch(imageUrl),

    // Internal database (previous rejections, known scammers)
    internalDatabase.search(imageHash(imageUrl))
  ]);

  const matches = results.flat().filter(r => r.similarity > 0.85);

  if (matches.length > 0) {
    return {
      isMatch: true,
      sources: matches.map(m => m.source),
      similarity: Math.max(...matches.map(m => m.similarity))
    };
  }

  return { isMatch: false };
};
```

### 6.3 Fraud Detection

**Signals:**
- Email domain (disposable email check)
- Device fingerprint (multiple accounts)
- IP address (VPN/proxy detection, geolocation mismatch)
- Behavior patterns (rapid completion, suspicious answers)
- Payment method (stolen card indicators)

**Fraud Score Calculation:**
```javascript
const calculateFraudScore = (user) => {
  let score = 0;

  // Email checks
  if (isDisposableEmail(user.email)) score += 20;
  if (!emailDomainHasMXRecord(user.email)) score += 15;

  // Device checks
  const deviceAccounts = getAccountsByDevice(user.deviceId);
  if (deviceAccounts.length > 3) score += 25;

  // IP checks
  if (isVPN(user.ipAddress)) score += 10;
  if (ipCountry !== user.selectedCountry) score += 15;

  // Behavior checks
  if (user.tierCompletionSpeed < 5 * 60) score += 20; // <5 min
  if (user.profilePhotoMatches.length > 0) score += 30;

  // Historical checks
  if (user.previousBans > 0) score += 50;

  return {
    score, // 0-100
    risk: score > 70 ? "high" : score > 40 ? "medium" : "low",
    flags: [...] // Detailed breakdown
  };
};
```

**Actions by Fraud Score:**
- 0-40 (Low): Auto-approve
- 41-70 (Medium): Flag for review, limit features (e.g., no Show Interest until review)
- 71+ (High): Suspend registration, manual review required

---

## 7. Manual Review Operations

### 7.1 Moderation Team Structure

**Team Roles:**
- **L1 Reviewers**: Basic photo/profile review (80% of volume)
- **L2 Reviewers**: Complex cases, appeals, escalations (15% of volume)
- **L3 Senior Reviewers**: Policy decisions, training, quality assurance (5% of volume)
- **Verification Specialists**: Tier 5 ID verification (dedicated team)
- **Health Moderators**: Tier 4 review (specialized training)

**Team Size (Launch Estimate):**
- 100 active users/day: 1 L1 reviewer (part-time)
- 1,000 active users/day: 2 L1, 1 L2 (full-time)
- 10,000 active users/day: 10 L1, 3 L2, 1 L3 (full-time)

**Coverage:**
- 24/7 monitoring for P1 issues
- Business hours (8am-8pm WAT) for P2-P4
- On-call rotation for after-hours escalations

### 7.2 Review Tools & Interface

**Moderation Dashboard Features:**
- Queue management (priority-based)
- Side-by-side comparison (profile photo vs. verification photo)
- Full user context (tier progress, subscription, history)
- Reverse image search integration
- One-click actions (approve, reject, escalate)
- Batch actions (multiple photos from same user)
- Quality assurance sampling
- Performance metrics (accuracy, speed)

**Reviewer Efficiency Tools:**
- Keyboard shortcuts
- Auto-tagging of common rejection reasons
- Saved notes/templates
- Similar case lookup
- AI-suggested decisions (reviewers override)

### 7.3 Quality Assurance

**QA Process:**
- Random sampling: 10% of decisions re-reviewed by L2
- Targeted sampling: 100% of unusual decisions (overrides of AI recommendation)
- Appeal review: All appeals reviewed by different reviewer
- Calibration sessions: Weekly team review of edge cases

**Reviewer Performance Metrics:**
- Accuracy rate (target: >95% agreement with QA)
- Review speed (target: <2 minutes/item for L1)
- Escalation rate (target: 5-10% of volume)
- Appeal overturn rate (target: <10%)

---

## 8. Appeals Process

### 8.1 Appeal Submission

**User Experience:**
```
┌─────────────────────────────────────────┐
│      Photo Rejected                     │
├─────────────────────────────────────────┤
│                                         │
│ Reason: Face not clearly visible       │
│                                         │
│ If you believe this decision was made  │
│ in error, you can submit an appeal.    │
│                                         │
│ [Upload Different Photo]  [Appeal]      │
└─────────────────────────────────────────┘
```

**Appeal Form:**
```
┌─────────────────────────────────────────┐
│ Appeal Photo Rejection                  │
├─────────────────────────────────────────┤
│                                         │
│ [Rejected Photo Preview]               │
│                                         │
│ Rejection Reason:                      │
│ Face not clearly visible               │
│                                         │
│ Why do you think this decision was     │
│ incorrect?                             │
│                                         │
│ ┌─────────────────────────────────────┐ │
│ │ My face is clearly visible in this │ │
│ │ photo. The lighting is natural and │ │
│ │ I am facing the camera...          │ │
│ │                                     │ │
│ └─────────────────────────────────────┘ │
│ 0/300 characters                        │
│                                         │
│ [Cancel]              [Submit Appeal]   │
└─────────────────────────────────────────┘
```

### 8.2 Appeal Review Process

**SLA:**
- Appeals reviewed within 48 hours
- Reviewed by different reviewer than original
- L2 reviewer minimum

**Outcomes:**
- **Overturn**: Photo approved, user notified
- **Uphold**: Original decision stands, detailed explanation provided
- **Partial**: Alternative solution offered (e.g., "crop to show face better")

**Overturn Rate Monitoring:**
- Target: <10% appeals overturned
- >15% overturn rate: Reviewer retraining required
- Chronic low-quality reviewer: Reassignment or termination

---

## 9. Content Policies by Category

### 9.1 Prohibited Content (Zero Tolerance)

**Illegal Content:**
- Child sexual abuse material (CSAM)
- Terrorist content
- Human trafficking
- Drug trafficking
- Illegal weapons

**Enforcement:**
- Immediate account termination
- Content reported to NCMEC (US law) / INTERPOL
- User reported to law enforcement
- IP ban, device ban
- No appeal

### 9.2 Restricted Content (Moderate, Context-Dependent)

**Sexual Content:**
- Nudity: Banned
- Sexually suggestive: Allowed if tasteful (e.g., formal wear showing décolletage)
- Explicit language: Banned in public profile, flagged in messages
- Solicitation: Banned

**Violent Content:**
- Gore, graphic violence: Banned
- Weapons: Flagged (context: military service, hunting hobby OK)
- Threats: Banned

**Hateful Content:**
- Racial slurs: Banned
- Religious hate: Banned
- Gender discrimination: Flagged (context: stating preferences OK, hate speech not OK)
- Homophobia/transphobia: Banned

**Misinformation:**
- Health misinformation: Flagged in Tier 4 (reviewer education)
- Scam/fraud: Banned
- Impersonation: Banned

### 9.3 Discouraged Content (Soft Guidance)

**Low-Quality Content:**
- Blurry photos: Rejected with suggestion to retake
- Group photos as primary: Rejected with guidance
- Excessive filters: Soft warning, allowed if face visible
- Meme culture in bio: Discouraged ("Keep it authentic")

---

## 10. Tier-Specific Moderation Workflows

### 10.1 Tier 1 Activation

**User Journey:**
1. User completes all Tier 1 fields
2. User uploads primary photo
3. Photo enters moderation queue
4. Automated checks (instant)
   - Pass: Approve immediately
   - Fail (critical): Reject immediately
   - Borderline: Flag for manual review
5. Manual review (if flagged): <24h SLA
6. Decision communicated to user
7. If approved: Tier 1 unlocked, account activated
8. If rejected: User prompted to upload new photo

**Expedited Review (Optional Paid Feature):**
- $5 fee for 1-hour review SLA
- Available for users in time-sensitive situations (e.g., event-based matching)

### 10.2 Tier 4 Activation

**Enhanced Review Process:**
1. User completes all Tier 4 fields (health data)
2. Automated consistency checks
3. Manual review by health-trained moderator
4. Review checklist:
   - [ ] Disclaimers accepted (self-declared data)
   - [ ] No medical misinformation
   - [ ] No stigmatizing language
   - [ ] Consistency with Tier 3 (e.g., health conditions affect family planning)
   - [ ] No red flags (pressure, manipulation)
5. Approved: Tier 4 unlocked
6. Flagged: User contacted for clarification
7. Rejected: Specific guidance provided

**Health Moderator Training:**
- Understanding genotype compatibility (AS, AA, SS)
- Common health conditions in Nigeria (sickle cell, diabetes, hypertension)
- Recognizing stigma language
- Cultural sensitivity
- Trauma-informed moderation

### 10.3 Tier 5 Verification

**Verification Workflow:**
1. User submits government ID photo
2. User completes liveness check (selfie + video)
3. Automated checks:
   - ID validity (format, expiration)
   - Face detection on ID
   - Face match (ID photo ↔ selfie ↔ video ↔ profile)
   - Liveness verification (blink, head turn)
4. Manual review by verification specialist:
   - [ ] ID appears authentic (not forged)
   - [ ] Face match confidence >85%
   - [ ] Name consistency (ID ↔ profile legal name)
   - [ ] Age verification (DOB matches Tier 1)
   - [ ] Liveness check passed
5. Decision:
   - Approved: Tier 5 unlocked, "Verified" badge displayed
   - Rejected: Specific reason provided, allow re-attempt
6. ID artifacts encrypted and stored (90-day retention for compliance, then deleted)

**Fraud Indicators:**
- ID photo looks scanned/photocopied (not original)
- Face match confidence <70%
- Liveness check anomalies
- Inconsistent name (Anglicized vs. legal name OK if explained)
- ID from suspicious issuing authority

---

## 11. VIP Content Moderation

### 11.1 Enhanced Standards

**VIP Profile Review:**
- 100% manual review (no auto-approve)
- Enhanced fraud checks
- Social proof validation (LinkedIn, professional profiles)
- Background check integration (optional, with consent)
- Concierge interview (intent verification)

**VIP Photo Standards:**
- Professional-quality photos encouraged
- Minimum 3 photos required
- Lifestyle photos expected
- Verification mandatory (Tier 5)

### 11.2 Concierge Mediation

**VIP Moderation Issues:**
- Concierge notified of any moderation flags
- Personal follow-up with VIP user
- Discreet resolution (vs. automated messages)
- Higher bar for rejection (benefit of doubt)

**Example:**
- Standard user: Borderline photo → Rejected with standard message
- VIP user: Borderline photo → Concierge reviews, calls VIP to discuss, suggests alternative photo, offers professional photo shoot referral

---

## 12. Technical Implementation

### 12.1 Moderation Pipeline Architecture

```javascript
// Photo Upload Flow
const photoModerationPipeline = async (photoFile, userId, photoType) => {

  // Step 1: Upload to staging storage
  const stagingUrl = await uploadToStaging(photoFile);

  // Step 2: Automated checks
  const automatedResults = await runAutomatedChecks(stagingUrl, {
    checks: [
      "minResolution",
      "faceDetection",
      "nudityDetection",
      "reverseImageSearch",
      "textOverlay",
      "violenceDetection",
      "minorDetection"
    ]
  });

  // Step 3: Decision logic
  if (automatedResults.criticalViolation) {
    // Auto-reject
    await notifyUser(userId, {
      status: "rejected",
      reason: automatedResults.rejectionReason
    });
    await deleteFromStaging(stagingUrl);
    return { status: "rejected", auto: true };
  }

  if (automatedResults.needsReview) {
    // Queue for manual review
    const reviewId = await createReviewTask({
      userId,
      photoUrl: stagingUrl,
      photoType,
      flags: automatedResults.flags,
      priority: automatedResults.priority
    });

    await notifyUser(userId, {
      status: "pending_review",
      estimatedTime: "24 hours"
    });

    return { status: "pending_review", reviewId };
  }

  // Auto-approve
  const productionUrl = await moveToProduction(stagingUrl);
  await updateUserProfile(userId, { [photoType]: productionUrl });
  await notifyUser(userId, {
    status: "approved"
  });

  return { status: "approved", auto: true, url: productionUrl };
};
```

### 12.2 Database Schema

```sql
-- Content Moderation Table
CREATE TABLE content_moderation_reviews (
  review_id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL,
  content_type VARCHAR(50) NOT NULL, -- 'profile_photo' | 'additional_photo' | 'tier_content' | 'message'
  content_id VARCHAR(255),
  content_url TEXT,
  content_text TEXT,

  -- Automated Analysis
  automated_checks JSONB, -- Full results from ML models
  automated_decision VARCHAR(20), -- 'approve' | 'reject' | 'flag_review'

  -- Manual Review
  review_status VARCHAR(20) DEFAULT 'pending', -- 'pending' | 'in_review' | 'completed'
  priority_level INTEGER,
  assigned_reviewer_id INTEGER,
  reviewed_at TIMESTAMP,
  review_decision VARCHAR(20), -- 'approve' | 'reject'
  rejection_reason VARCHAR(100),
  reviewer_notes TEXT,

  -- Quality Assurance
  qa_sampled BOOLEAN DEFAULT FALSE,
  qa_reviewer_id INTEGER,
  qa_outcome VARCHAR(20), -- 'agree' | 'disagree'

  -- Appeal
  appeal_submitted BOOLEAN DEFAULT FALSE,
  appeal_text TEXT,
  appeal_decision VARCHAR(20),
  appeal_reviewed_at TIMESTAMP,

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (assigned_reviewer_id) REFERENCES admin_users(id),
  FOREIGN KEY (qa_reviewer_id) REFERENCES admin_users(id)
);

-- Content Violations Log
CREATE TABLE content_violations (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL,
  review_id INTEGER,
  violation_type VARCHAR(50) NOT NULL,
  severity VARCHAR(20) NOT NULL, -- 'minor' | 'moderate' | 'severe' | 'critical'
  content_type VARCHAR(50),

  action_taken VARCHAR(50), -- 'warning' | 'content_removed' | 'account_suspended' | 'account_banned'
  action_duration INTERVAL,

  reviewer_id INTEGER,
  notes TEXT,

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (review_id) REFERENCES content_moderation_reviews(review_id),
  FOREIGN KEY (reviewer_id) REFERENCES admin_users(id)
);

-- Fraud Detection Signals
CREATE TABLE fraud_signals (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL,
  signal_type VARCHAR(50) NOT NULL,
  signal_value TEXT,
  confidence_score DECIMAL(3,2),
  detected_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  FOREIGN KEY (user_id) REFERENCES users(id)
);
```

### 12.3 API Endpoints

```javascript
// Submit content for moderation
POST /api/moderation/submit
{
  contentType: "profile_photo",
  file: <binary>,
  userId: 12345
}

// Get moderation status
GET /api/moderation/status/:contentId
Response: { status: "approved" | "pending_review" | "rejected", reason?: "..." }

// Submit appeal
POST /api/moderation/appeal
{
  reviewId: 789,
  appealText: "..."
}

// Manual review action (admin only)
POST /api/moderation/review/:reviewId
{
  decision: "approve" | "reject",
  reason: "...",
  notes: "..."
}
```

---

## 13. Performance Metrics & SLAs

### 13.1 Key Performance Indicators

**Moderation Speed:**
- Auto-approval rate: >80%
- Manual review SLA compliance: >95%
- Average review time: <2 minutes (L1), <5 minutes (L2)

**Moderation Quality:**
- Reviewer accuracy: >95%
- Appeal overturn rate: <10%
- User satisfaction (post-review survey): >80%

**Content Quality:**
- Profile completion rate: >85% (Tier 1)
- Photo rejection rate: <15%
- Policy violation rate: <2% of users

### 13.2 Monitoring & Alerting

**Real-Time Alerts:**
- P1 content detected → Immediate Slack/SMS to on-call
- Review queue backlog >100 items → Notify team lead
- Reviewer accuracy drop <90% → Notify QA team
- Appeal overturn rate spike >20% → Notify policy team

**Daily Reports:**
- Total reviews completed
- Category breakdown
- Rejection reasons distribution
- Reviewer performance summary

**Weekly Reports:**
- Trend analysis (rejection rate over time)
- Policy effectiveness (are guidelines clear?)
- Emerging patterns (new scam tactics)
- Training needs identification

---

## 14. Compliance & Legal

### 14.1 CSAM Reporting

**Mandatory Reporting:**
- Any detected CSAM → Report to NCMEC (CyberTipline) within 24 hours
- User account immediately terminated
- Content preserved for law enforcement
- Documented chain of custody

**Process:**
```
1. Detection (automated or manual)
2. Immediate content preservation (separate secure storage)
3. Escalate to designated CSAM coordinator
4. File report with NCMEC/INTERPOL
5. Terminate user account
6. Document all actions
7. Respond to law enforcement requests
8. Periodic compliance audit
```

### 14.2 Content Retention

**Approved Content:**
- Stored indefinitely (while account active)
- Deleted within 30 days of account deletion

**Rejected Content:**
- Stored for 90 days (appeal window)
- Deleted after 90 days (unless under investigation)

**Violation Evidence:**
- Stored for 7 years (legal compliance)
- Encrypted at rest
- Access logged and audited

---

## 15. User Education & Transparency

### 15.1 Photo Guidelines Page

**Accessible from:**
- Photo upload screen
- Settings → Help
- Rejection notification

**Content:**
- Examples of good vs. bad photos (annotated)
- Common rejection reasons
- Tips for taking great profile photos
- Cultural/religious accommodation info
- Appeal process explanation

### 15.2 Content Policy Transparency

**Community Guidelines:**
- Written in plain language (no legalese)
- Examples for clarity
- Updated regularly
- Available in English + Nigerian languages (Yoruba, Igbo, Hausa)

**Moderation Transparency Report (Quarterly):**
- Total content reviewed
- Approval/rejection rates
- Most common violations
- Policy changes
- CSAM reports filed (aggregate only)

---

## 16. Future Enhancements

### 16.1 Phase 2 (Post-Launch)

- **AI-Powered Suggestions**: "Your photo is a bit dark. Try retaking in better lighting."
- **In-App Photo Editing**: Basic crop/rotate/brightness tools
- **Professional Photo Review**: Optional paid service for feedback before submission
- **Video Profile Support**: 15-second intro videos (additional moderation layer)

### 16.2 Phase 3 (Advanced)

- **Deepfake Detection v2**: More sophisticated models
- **3D Face Matching**: Liveness + depth sensing
- **Blockchain Verification**: Immutable identity verification records
- **User Reputation Scores**: Trust-based moderation prioritization

---

## 17. Implementation Checklist

### Phase 1: Launch
- [ ] Automated photo checks (ML models)
- [ ] Manual review dashboard
- [ ] Reviewer training program
- [ ] Photo guidelines page
- [ ] Appeal process
- [ ] Basic fraud detection
- [ ] Tier 5 verification workflow

### Phase 2: Post-Launch (1-3 months)
- [ ] QA sampling system
- [ ] Performance metrics dashboard
- [ ] Reviewer performance tracking
- [ ] Enhanced fraud detection (device fingerprinting)
- [ ] Message content filtering
- [ ] Reverse image search integration

### Phase 3: Scale (3-6 months)
- [ ] AI-powered review suggestions
- [ ] Video profile support
- [ ] Advanced deepfake detection
- [ ] Multi-language support
- [ ] Transparency reporting

---

**Document Control**
Owner: Trust & Safety Team
Review Cycle: Quarterly
Next Review: 2026-05-26
Classification: Internal

**Related Documentation:**
- `safety_system.md` - Reporting and blocking
- `spam_detection.md` - Automated pattern detection
- `legal_compliance.md` - Legal framework
- `data_management.md` - Data retention
