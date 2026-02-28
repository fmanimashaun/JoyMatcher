# Spam Detection & Prevention System

**Version:** 1.0.0
**Last Updated:** 2026-02-26
**Status:** Complete Specification
**Applies To:** All user interactions (messages, Show Interest, profile views)

---

## 1. Executive Summary

JoyMatcher's spam detection system prevents automated abuse, mass messaging, promotional content, and low-quality interactions that degrade the user experience in a trust-based, marriage-oriented matchmaking platform. This document specifies automated pattern detection, rate limiting, keyword detection, and prevention measures designed to maintain platform integrity while allowing genuine users to connect.

Unlike casual dating apps where high-volume messaging might be acceptable, JoyMatcher's spam detection aligns with:
- Intentional, thoughtful relationship-building
- Quality over quantity in connections
- Investment-based trust model (spam wastes investment)
- VIP concierge expectations (zero spam tolerance)
- EDT-based disclosure (spam bypassing consent is critical violation)

---

## 2. Spam Detection Philosophy

### 2.1 Core Principles

1. **Protect User Investment**: Users have paid and disclosed deeply; spam wastes their effort
2. **Maintain Signal Quality**: High spam = low-quality experience = user churn
3. **Preserve Intent**: Marriage-oriented users expect thoughtful interaction
4. **Automated + Human**: ML detection + manual review for edge cases
5. **Graduated Response**: Warning → Rate limit → Restriction → Ban
6. **Minimal False Positives**: Better to miss spam than block genuine users
7. **Transparent Enforcement**: Users understand why limits exist

### 2.2 Spam Categories

| Spam Type | Description | Risk Level | Detection Method |
|-----------|-------------|------------|------------------|
| **Mass Messaging** | Same message to many users | High | Pattern matching, hashing |
| **Promotional Spam** | Advertising, external services | Critical | Keyword detection, URL analysis |
| **Financial Scams** | Money requests, investment schemes | Critical | Keyword + behavior analysis |
| **External Redirection** | Pushing to WhatsApp, Telegram, etc. | High | Contact info extraction |
| **Bot Activity** | Automated account creation, interaction | Critical | Device fingerprinting, behavioral analysis |
| **Profile Spam** | Fake profiles, SEO spam in bios | Medium | Content analysis, fraud signals |
| **Engagement Farming** | Sending interest to everyone | Medium | Acceptance rate tracking |
| **Harassment (Repetitive)** | Unwanted repeated contact | High | Relationship status + message frequency |
| **Low-Effort Spam** | "Hi" to 100 users | Low | Message length + frequency |

---

## 3. Rate Limiting Architecture

### 3.1 Rate Limit Tiers

#### 3.1.1 Free Users

```javascript
const freeLimits = {
  showInterest: {
    max: 5,
    period: "24h",
    resetTime: "00:00 UTC"
  },
  messages: {
    firstMessage: { max: 1, period: "1h", perUser: true },
    unansweredMessages: { max: 3, perUser: true, resetOnReply: true },
    totalDaily: { max: 50, period: "24h" }
  },
  profileViews: {
    sameProfile: { max: 10, period: "24h", perUser: true },
    totalDaily: { max: 100, period: "24h" }
  },
  detailRequests: {
    max: 0, // Not available for free users
    period: "24h"
  }
};
```

**Rationale:**
- Free users get limited capacity to encourage upgrade
- Prevents free account spam farms
- 5 Show Interest/day = thoughtful, not mass outreach
- 3 unanswered messages = prevents harassment

#### 3.1.2 Premium Users

```javascript
const premiumLimits = {
  showInterest: {
    max: 20,
    period: "24h"
  },
  messages: {
    firstMessage: { max: 3, period: "1h", perUser: true },
    unansweredMessages: { max: 5, perUser: true, resetOnReply: true },
    totalDaily: { max: 200, period: "24h" }
  },
  profileViews: {
    sameProfile: { max: 20, period: "24h", perUser: true },
    totalDaily: { max: 500, period: "24h" }
  },
  detailRequests: {
    max: 10,
    period: "24h"
  }
};
```

**Rationale:**
- Premium = serious users, more capacity
- Still capped to prevent abuse
- Higher limits reflect investment

#### 3.1.3 VIP Users

```javascript
const vipLimits = {
  showInterest: {
    max: 50,
    period: "24h"
  },
  messages: {
    firstMessage: { max: 10, period: "1h", perUser: true },
    unansweredMessages: { max: 10, perUser: true, resetOnReply: true },
    totalDaily: { max: 500, period: "24h" }
  },
  profileViews: {
    sameProfile: { max: 50, period: "24h", perUser: true },
    totalDaily: { max: 2000, period: "24h" }
  },
  detailRequests: {
    max: 30,
    period: "24h"
  }
};
```

**Rationale:**
- VIP = verified, trusted, concierge-vetted
- Highest limits (but not unlimited)
- Monitoring still active (even VIPs can violate)

### 3.2 Dynamic Rate Limiting

**Behavior-Based Adjustments:**

```javascript
const calculateDynamicLimit = (user, action) => {
  const baseLimit = rateLimits[user.subscription][action];
  let adjustedLimit = baseLimit.max;

  // Positive signals (increase limit)
  if (user.acceptanceRate > 0.3) adjustedLimit *= 1.2; // High acceptance = quality outreach
  if (user.accountAge > 90 * 24 * 60 * 60 * 1000) adjustedLimit *= 1.1; // Trusted older accounts
  if (user.reportCount === 0) adjustedLimit *= 1.1; // Clean record

  // Negative signals (decrease limit)
  if (user.acceptanceRate < 0.05) adjustedLimit *= 0.5; // Low acceptance = spam?
  if (user.reportCount > 0) adjustedLimit *= 0.7; // Previous violations
  if (user.messageResponseRate < 0.1) adjustedLimit *= 0.6; // Ignored by recipients

  // Floor and ceiling
  adjustedLimit = Math.max(adjustedLimit, baseLimit.max * 0.3); // Never below 30% of base
  adjustedLimit = Math.min(adjustedLimit, baseLimit.max * 1.5); // Never above 150% of base

  return Math.floor(adjustedLimit);
};
```

**User Notification:**
```
┌─────────────────────────────────────────┐
│      Rate Limit Adjusted                │
├─────────────────────────────────────────┤
│                                         │
│ Based on your engagement quality, your │
│ daily Show Interest limit has been     │
│ increased to 25.                       │
│                                         │
│ Keep up the thoughtful connections!    │
│                                         │
│ [Close]                                 │
└─────────────────────────────────────────┘
```

### 3.3 Rate Limit Enforcement

**User Experience (Limit Reached):**

```
┌─────────────────────────────────────────┐
│      Daily Limit Reached                │
├─────────────────────────────────────────┤
│                                         │
│ You've reached your daily limit for    │
│ sending Show Interest (5/5).           │
│                                         │
│ Why limits exist:                      │
│ Quality connections take time. Review  │
│ your sent interests and focus on       │
│ meaningful conversations.              │
│                                         │
│ Your limit resets in: 8 hours 32 mins  │
│                                         │
│ Want to connect with more people?      │
│ [Upgrade to Premium] (20/day)           │
│                                         │
│ [Close]                                 │
└─────────────────────────────────────────┘
```

**Backend Implementation:**

```javascript
const checkRateLimit = async (userId, action, targetUserId = null) => {
  const user = await getUser(userId);
  const limit = calculateDynamicLimit(user, action);
  const period = rateLimits[user.subscription][action].period;

  const key = targetUserId
    ? `rate_limit:${userId}:${action}:${targetUserId}:${period}`
    : `rate_limit:${userId}:${action}:${period}`;

  const count = await redis.get(key) || 0;

  if (count >= limit) {
    const ttl = await redis.ttl(key);
    return {
      allowed: false,
      limit,
      remaining: 0,
      resetAt: Date.now() + ttl * 1000,
      reason: "rate_limit_exceeded"
    };
  }

  await redis.incr(key);
  await redis.expire(key, periodToSeconds(period));

  return {
    allowed: true,
    limit,
    remaining: limit - count - 1,
    resetAt: Date.now() + periodToSeconds(period) * 1000
  };
};
```

---

## 4. Message Spam Detection

### 4.1 Copy-Paste Detection

**Technique: Message Hashing**

```javascript
const detectCopyPasteSpam = async (userId, messageText) => {
  // Normalize message (lowercase, remove punctuation, trim whitespace)
  const normalized = normalizeText(messageText);

  // Generate hash
  const messageHash = crypto.createHash('md5').update(normalized).digest('hex');

  // Check if this user has sent similar message recently
  const recentHashes = await redis.get(`user_messages:${userId}:24h`) || [];

  const duplicateCount = recentHashes.filter(h => h === messageHash).length;

  if (duplicateCount >= 3) {
    return {
      isSpam: true,
      reason: "copy_paste_detected",
      duplicateCount,
      confidence: 0.95
    };
  }

  // Store hash
  recentHashes.push(messageHash);
  await redis.setex(`user_messages:${userId}:24h`, 86400, recentHashes);

  return { isSpam: false };
};
```

**Fuzzy Matching for Variations:**

```javascript
const calculateLevenshteinSimilarity = (str1, str2) => {
  const distance = levenshtein(str1, str2);
  const maxLength = Math.max(str1.length, str2.length);
  return 1 - distance / maxLength;
};

const detectFuzzyDuplicates = (newMessage, recentMessages) => {
  for (const oldMsg of recentMessages) {
    const similarity = calculateLevenshteinSimilarity(newMessage, oldMsg);
    if (similarity > 0.85) {
      return {
        isSpam: true,
        reason: "similar_message_detected",
        similarity,
        confidence: 0.90
      };
    }
  }
  return { isSpam: false };
};
```

**User Warning (First Offense):**

```
┌─────────────────────────────────────────┐
│      Tip: Personalize Your Messages    │
├─────────────────────────────────────────┤
│                                         │
│ We noticed you're sending similar      │
│ messages to multiple people.           │
│                                         │
│ Personalized messages get better       │
│ responses. Reference something from    │
│ their profile to show genuine interest.│
│                                         │
│ [Got It]                                │
└─────────────────────────────────────────┘
```

### 4.2 Low-Effort Message Detection

**Patterns:**

```javascript
const lowEffortPatterns = [
  // Single word
  { pattern: /^(hi|hey|hello|sup|yo)$/i, minOccurrences: 5, threshold: "warning" },

  // Generic greetings
  { pattern: /^(hi there|hey there|hello there|how are you|what's up)$/i, minOccurrences: 3, threshold: "warning" },

  // Copy-paste templates (detected by repetition)
  { pattern: /^(I saw your profile and|I think we'd be a great match|You seem interesting)/, minOccurrences: 5, threshold: "flag" },

  // Emoji-only
  { pattern: /^[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F1E0}-\u{1F1FF}]+$/u, minOccurrences: 3, threshold: "warning" }
];
```

**Scoring System:**

```javascript
const calculateMessageQuality = (message) => {
  let qualityScore = 50; // Baseline

  // Length factors
  if (message.length < 10) qualityScore -= 20;
  if (message.length > 50) qualityScore += 10;
  if (message.length > 100) qualityScore += 20;

  // Content factors
  if (containsQuestion(message)) qualityScore += 15; // Engaged conversation
  if (containsProfileReference(message)) qualityScore += 20; // Personalized
  if (hasProperGrammar(message)) qualityScore += 10;

  // Negative factors
  if (isGenericGreeting(message)) qualityScore -= 15;
  if (containsExternalContact(message)) qualityScore -= 50; // Critical violation

  return Math.max(0, Math.min(100, qualityScore));
};
```

**Quality-Based Rate Adjustment:**

```javascript
// Users with consistently low-quality messages get stricter rate limits
const adjustRateLimitByQuality = async (userId) => {
  const recentMessages = await getRecentMessages(userId, 20);
  const avgQuality = recentMessages.reduce((sum, msg) => sum + msg.qualityScore, 0) / recentMessages.length;

  if (avgQuality < 30) {
    // Reduce daily message limit by 50%
    await setTemporaryRateLimit(userId, "messages", 0.5, "7 days");

    await notifyUser(userId, {
      title: "Message Quality Notice",
      message: "We've noticed your messages could be more engaging. Try personalizing them for better responses.",
      action: "view_tips"
    });
  }
};
```

### 4.3 Contact Information Extraction

**Patterns to Block:**

```javascript
const contactInfoPatterns = {
  phone: [
    /(\+?\d{1,3}[-.\s]?)?(\(?\d{3}\)?[-.\s]?)?\d{3}[-.\s]?\d{4}/g, // US/International
    /0\d{10}/g, // Nigerian format
    /\b\d{4}[\s-]?\d{3}[\s-]?\d{4}\b/g // Generic 11-digit
  ],
  email: [
    /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g
  ],
  socialMedia: [
    /@[a-zA-Z0-9_.]{3,30}/g, // Handles
    /whatsapp/gi,
    /telegram/gi,
    /snapchat/gi,
    /instagram|insta|ig/gi,
    /facebook|fb/gi,
    /twitter|x\.com/gi
  ],
  externalUrls: [
    /https?:\/\/[^\s]+/g,
    /www\.[^\s]+/g,
    /[a-z0-9-]+\.(com|net|org|io)/gi
  ],
  obfuscated: [
    /(\w+)\s*(at|@)\s*(\w+)\s*(dot|\.)\s*(com|net|org)/gi, // "john at gmail dot com"
    /\d{3}[\s-]*\d{3}[\s-]*\d{4}/g, // Spaced phone numbers
    /\w+\s*\[\s*at\s*\]\s*\w+/gi // "john [at] gmail"
  ]
};
```

**Real-Time Blocking:**

```javascript
const detectContactInfo = (message) => {
  const violations = [];

  for (const [type, patterns] of Object.entries(contactInfoPatterns)) {
    for (const pattern of patterns) {
      const matches = message.match(pattern);
      if (matches) {
        violations.push({
          type,
          matches,
          confidence: 0.95
        });
      }
    }
  }

  if (violations.length > 0) {
    return {
      blocked: true,
      reason: "contact_info_detected",
      violations
    };
  }

  return { blocked: false };
};
```

**User Experience (Blocked Message):**

```
┌─────────────────────────────────────────┐
│ Message Could Not Be Sent               │
├─────────────────────────────────────────┤
│                                         │
│ Your message contains contact          │
│ information (phone number).            │
│                                         │
│ Why we block this:                     │
│ • Protect your privacy and safety      │
│ • Ensure conversations stay on platform│
│ • Prevent scams and harassment         │
│                                         │
│ When you're both comfortable, you can  │
│ share contact details naturally in     │
│ your conversation.                     │
│                                         │
│ [Edit Message]              [Cancel]    │
└─────────────────────────────────────────┘
```

### 4.4 Promotional Spam Detection

**Keyword Lists:**

```javascript
const promotionalKeywords = {
  financial: [
    "investment opportunity",
    "make money",
    "passive income",
    "bitcoin",
    "forex",
    "crypto",
    "trading",
    "earn from home",
    "financial freedom",
    "mlm",
    "network marketing"
  ],
  services: [
    "check out my",
    "visit my website",
    "dm me for",
    "promo",
    "discount code",
    "limited time offer",
    "click here",
    "free trial"
  ],
  religious: [
    "join our church",
    "spiritual healing",
    "prophet",
    "miracle service"
  ],
  suspicious: [
    "lonely housewife",
    "sugar daddy",
    "sugar mummy",
    "hook up",
    "one night"
  ]
};

const detectPromotionalContent = (message) => {
  const lowerMessage = message.toLowerCase();
  const detectedKeywords = [];

  for (const [category, keywords] of Object.entries(promotionalKeywords)) {
    for (const keyword of keywords) {
      if (lowerMessage.includes(keyword.toLowerCase())) {
        detectedKeywords.push({ category, keyword });
      }
    }
  }

  if (detectedKeywords.length > 0) {
    return {
      isSpam: true,
      reason: "promotional_content",
      keywords: detectedKeywords,
      confidence: 0.90
    };
  }

  return { isSpam: false };
};
```

**Action: Auto-Block + Flag for Review**

```javascript
if (detectPromotionalContent(message).isSpam) {
  // Block message
  await blockMessage(messageId);

  // Flag user for review
  await createSafetyReport({
    userId,
    category: "spam",
    subcategory: "promotional_content",
    evidence: { message, detectedKeywords },
    autoGenerated: true,
    priority: "P3"
  });

  // Notify user
  await notifyUser(userId, {
    title: "Message Blocked",
    message: "Your message violates our no-promotion policy.",
    action: "review_guidelines"
  });

  // If repeat offense, escalate
  const spamCount = await getUserSpamCount(userId, "7 days");
  if (spamCount >= 3) {
    await restrictUser(userId, "messaging", "24 hours");
  }
}
```

---

## 5. Show Interest Spam Detection

### 5.1 Mass "Show Interest" Patterns

**Detection Logic:**

```javascript
const detectShowInterestSpam = async (userId) => {
  const last24h = Date.now() - 24 * 60 * 60 * 1000;
  const sentInterests = await getShowInterests(userId, { since: last24h });

  const signals = {
    // Volume signals
    totalSent: sentInterests.length,
    acceptanceRate: sentInterests.filter(i => i.status === "accepted").length / sentInterests.length,
    declineRate: sentInterests.filter(i => i.status === "declined").length / sentInterests.length,

    // Pattern signals
    timeSpacing: calculateAverageTimeBetween(sentInterests),
    diversityScore: calculateProfileDiversity(sentInterests), // Are they all similar profiles?

    // Engagement signals
    profileViewBeforeSend: sentInterests.filter(i => i.viewedProfileFirst).length / sentInterests.length,
    messageFollowUpRate: sentInterests.filter(i => i.sentMessageAfterAccept).length / sentInterests.filter(i => i.status === "accepted").length
  };

  // Spam scoring
  let spamScore = 0;

  if (signals.totalSent > 15) spamScore += 20; // High volume
  if (signals.acceptanceRate < 0.1) spamScore += 30; // Very low acceptance
  if (signals.timeSpacing < 60) spamScore += 25; // Less than 1 min apart (bot behavior)
  if (signals.profileViewBeforeSend < 0.3) spamScore += 20; // Not viewing profiles
  if (signals.messageFollowUpRate < 0.2) spamScore += 15; // Not engaging after acceptance

  if (spamScore > 50) {
    return {
      isSpam: true,
      spamScore,
      signals,
      recommendedAction: spamScore > 80 ? "suspend" : "warn"
    };
  }

  return { isSpam: false, spamScore, signals };
};
```

**Automated Response:**

```javascript
const handleShowInterestSpam = async (userId, detection) => {
  if (detection.spamScore > 80) {
    // Severe: Suspend Show Interest for 7 days
    await restrictUser(userId, "show_interest", "7 days");

    await notifyUser(userId, {
      title: "Show Interest Suspended",
      message: "Your Show Interest activity appears automated or spam-like. This feature is suspended for 7 days.",
      details: "Review our guidelines on thoughtful, personalized outreach."
    });

  } else if (detection.spamScore > 50) {
    // Moderate: Warning + reduced limit
    await setTemporaryRateLimit(userId, "show_interest", 0.5, "48 hours");

    await notifyUser(userId, {
      title: "Slow Down",
      message: "You're sending Show Interest very frequently with low engagement. Try reviewing profiles more carefully.",
      tip: "Users who view profiles longer before sending interest get 3x higher acceptance rates."
    });
  }

  // Log for analytics
  await logSpamEvent({
    userId,
    type: "show_interest_spam",
    score: detection.spamScore,
    signals: detection.signals
  });
};
```

### 5.2 Acceptance Rate Monitoring

**Tiered Warnings:**

```javascript
const monitorAcceptanceRate = async (userId) => {
  const sentInterests = await getShowInterests(userId, { limit: 20, order: "recent" });

  if (sentInterests.length < 10) return; // Not enough data

  const acceptanceRate = sentInterests.filter(i => i.status === "accepted").length / sentInterests.length;

  if (acceptanceRate < 0.05) {
    // <5% acceptance rate
    await notifyUser(userId, {
      title: "Tip: Improve Your Connections",
      message: "Your Show Interest acceptance rate is low (5%). Here are some tips:\n\n• Complete higher tiers to show seriousness\n• Add more photos\n• Write a detailed bio\n• Reference something from their profile\n• Review compatibility carefully before sending",
      action: "improve_profile"
    });
  }
};
```

---

## 6. Profile Spam Detection

### 6.1 Fake Profile Indicators

**Automated Scoring:**

```javascript
const detectFakeProfile = async (userId) => {
  const user = await getUser(userId);
  const signals = {};
  let fakeScore = 0;

  // Photo signals
  signals.stockPhoto = await detectStockPhoto(user.primaryPhoto);
  if (signals.stockPhoto) fakeScore += 40;

  signals.celebrityPhoto = await detectCelebrity(user.primaryPhoto);
  if (signals.celebrityPhoto) fakeScore += 50;

  signals.multipleAccountsSamePhoto = await findDuplicatePhotos(user.primaryPhoto);
  if (signals.multipleAccountsSamePhoto.length > 0) fakeScore += 50;

  // Profile content signals
  signals.genericBio = detectGenericBio(user.bio);
  if (signals.genericBio) fakeScore += 15;

  signals.suspiciousName = detectSuspiciousName(user.displayName);
  if (signals.suspiciousName) fakeScore += 10;

  // Behavior signals
  signals.rapidCompletion = user.tier1CompletionTime < 2 * 60 * 1000; // <2 minutes
  if (signals.rapidCompletion) fakeScore += 20;

  signals.noProfileViews = user.profileViewCount === 0 && user.accountAge > 7 * 24 * 60 * 60 * 1000;
  if (signals.noProfileViews) fakeScore += 15;

  // Device/fraud signals
  signals.disposableEmail = await isDisposableEmail(user.email);
  if (signals.disposableEmail) fakeScore += 20;

  signals.vpnUse = await detectVPN(user.ipAddress);
  if (signals.vpnUse) fakeScore += 10;

  signals.multipleAccountsSameDevice = await getAccountsByDevice(user.deviceId);
  if (signals.multipleAccountsSameDevice.length > 3) fakeScore += 30;

  return {
    isFake: fakeScore > 60,
    fakeScore,
    signals,
    recommendedAction: fakeScore > 80 ? "suspend" : fakeScore > 60 ? "flag" : "monitor"
  };
};
```

**Action on Detection:**

```javascript
if (fakeProfile.fakeScore > 80) {
  // Suspend account immediately
  await suspendAccount(userId, "suspected_fake_profile");

  // Notify moderation team
  await createReviewTask({
    userId,
    type: "fake_profile_detection",
    priority: "P2",
    evidence: fakeProfile.signals
  });

} else if (fakeProfile.fakeScore > 60) {
  // Flag for manual review
  await flagAccount(userId, "potential_fake_profile");

  // Restrict until reviewed
  await restrictFeatures(userId, ["show_interest", "messaging"], "until_reviewed");
}
```

### 6.2 SEO/Link Spam in Profiles

**Bio Content Checks:**

```javascript
const detectBioSpam = (bio) => {
  const violations = [];

  // URL detection
  const urls = bio.match(/https?:\/\/[^\s]+/g);
  if (urls) violations.push({ type: "external_url", matches: urls });

  // Keyword stuffing
  const words = bio.toLowerCase().split(/\s+/);
  const uniqueWords = new Set(words);
  if (words.length > 50 && uniqueWords.size / words.length < 0.3) {
    violations.push({ type: "keyword_stuffing", ratio: uniqueWords.size / words.length });
  }

  // Promotional language
  if (detectPromotionalContent(bio).isSpam) {
    violations.push({ type: "promotional_content" });
  }

  return violations.length > 0 ? { isSpam: true, violations } : { isSpam: false };
};
```

---

## 7. Bot Detection

### 7.1 Behavioral Biometrics

**Typing Patterns:**

```javascript
const analyzeTypingPattern = (keystrokeData) => {
  // keystrokeData = [{ key, timestamp, duration }]

  const metrics = {
    averageKeystrokeTime: calculateAverage(keystrokeData.map(k => k.duration)),
    averageTimeBetweenKeys: calculateAverageTimeBetween(keystrokeData),
    typingSpeed: keystrokeData.length / (keystrokeData[keystrokeData.length - 1].timestamp - keystrokeData[0].timestamp),
    pausePatterns: detectPauses(keystrokeData), // Humans pause, bots don't
    correctionRate: detectBackspaces(keystrokeData).length / keystrokeData.length
  };

  // Bot indicators
  const botSignals = [];

  if (metrics.typingSpeed > 10) botSignals.push("superhuman_typing_speed"); // >10 keys/sec
  if (metrics.averageTimeBetweenKeys < 50) botSignals.push("no_natural_variation"); // <50ms
  if (metrics.pausePatterns.length === 0) botSignals.push("no_pauses"); // No thinking pauses
  if (metrics.correctionRate === 0) botSignals.push("no_corrections"); // Perfect typing

  return {
    isBot: botSignals.length >= 2,
    confidence: botSignals.length / 4,
    signals: botSignals,
    metrics
  };
};
```

### 7.2 Mouse Movement Analysis

**Human vs. Bot Patterns:**

```javascript
const analyzeMouseMovement = (mouseEvents) => {
  // mouseEvents = [{ x, y, timestamp, type }]

  const metrics = {
    pathComplexity: calculatePathEntropy(mouseEvents),
    movementSpeed: calculateAverageSpeed(mouseEvents),
    acceleration: calculateAcceleration(mouseEvents),
    curveVariation: calculateCurveVariation(mouseEvents),
    hoverTime: calculateHoverTime(mouseEvents)
  };

  const botSignals = [];

  if (metrics.pathComplexity < 0.3) botSignals.push("straight_lines"); // Bots move in straight lines
  if (metrics.movementSpeed > 1000) botSignals.push("superhuman_speed"); // >1000px/sec
  if (metrics.acceleration === 0) botSignals.push("constant_speed"); // No natural acceleration
  if (metrics.hoverTime < 0.1) botSignals.push("no_hovering"); // No hesitation

  return {
    isBot: botSignals.length >= 2,
    confidence: botSignals.length / 4,
    signals: botSignals
  };
};
```

### 7.3 Device Fingerprinting

**Collection:**

```javascript
const collectDeviceFingerprint = async () => {
  const fingerprint = {
    // Browser
    userAgent: navigator.userAgent,
    language: navigator.language,
    platform: navigator.platform,
    hardwareConcurrency: navigator.hardwareConcurrency,
    deviceMemory: navigator.deviceMemory,

    // Screen
    screenResolution: `${screen.width}x${screen.height}`,
    colorDepth: screen.colorDepth,
    pixelRatio: window.devicePixelRatio,

    // Canvas fingerprint (browser-specific rendering)
    canvasFingerprint: await generateCanvasFingerprint(),

    // WebGL fingerprint
    webglFingerprint: await generateWebGLFingerprint(),

    // Timezone
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    timezoneOffset: new Date().getTimezoneOffset(),

    // Fonts (installed fonts detection)
    installedFonts: await detectInstalledFonts(),

    // Plugins
    plugins: Array.from(navigator.plugins).map(p => p.name)
  };

  return crypto.createHash('sha256').update(JSON.stringify(fingerprint)).digest('hex');
};
```

**Bot Indicators:**

```javascript
const detectBotByDevice = async (fingerprint) => {
  const signals = [];

  // Headless browser indicators
  if (navigator.webdriver) signals.push("webdriver_enabled");
  if (!navigator.plugins || navigator.plugins.length === 0) signals.push("no_plugins");
  if (navigator.languages.length === 0) signals.push("no_languages");

  // Automation tools
  if (window.phantom || window._phantom) signals.push("phantomjs");
  if (window.callPhantom) signals.push("phantomjs_2");
  if (navigator.userAgent.includes("HeadlessChrome")) signals.push("headless_chrome");
  if (document.__webdriver_unwrapped || document.__selenium_unwrapped) signals.push("selenium");

  // Emulator/VM indicators
  if (await detectEmulator()) signals.push("emulator");

  // Multiple accounts same device
  const accountsOnDevice = await getAccountsByFingerprint(fingerprint);
  if (accountsOnDevice.length > 5) signals.push("multiple_accounts");

  return {
    isBot: signals.length >= 2,
    signals,
    confidence: Math.min(signals.length / 3, 1.0)
  };
};
```

---

## 8. Graduated Enforcement

### 8.1 Warning System

**First Offense (Soft Warning):**
```
┌─────────────────────────────────────────┐
│      Tip: Quality Over Quantity         │
├─────────────────────────────────────────┤
│                                         │
│ We noticed you're sending messages     │
│ quickly to many people.                │
│                                         │
│ JoyMatcher is about thoughtful         │
│ connections. Take time to review       │
│ profiles and personalize messages.     │
│                                         │
│ [Got It]              [View Tips]       │
└─────────────────────────────────────────┘
```

**Second Offense (Rate Limit):**
```
┌─────────────────────────────────────────┐
│      Temporary Limit Applied            │
├─────────────────────────────────────────┤
│                                         │
│ Your messaging activity exceeded our   │
│ guidelines for quality engagement.     │
│                                         │
│ Your daily message limit is reduced    │
│ to 25 for the next 48 hours.           │
│                                         │
│ Focus on meaningful conversations with │
│ your existing matches.                 │
│                                         │
│ [Understood]          [Learn More]      │
└─────────────────────────────────────────┘
```

**Third Offense (Temporary Restriction):**
```
┌─────────────────────────────────────────┐
│      Messaging Temporarily Restricted   │
├─────────────────────────────────────────┤
│                                         │
│ Due to repeated guideline violations,  │
│ your messaging is restricted for       │
│ 24 hours.                              │
│                                         │
│ Violation: Mass messaging / spam       │
│ Ends: Feb 27, 2026 at 2:30 PM         │
│                                         │
│ During this time:                      │
│ • You cannot send new messages         │
│ • You can reply to existing threads    │
│ • You can view profiles                │
│                                         │
│ Further violations may result in       │
│ suspension or permanent ban.           │
│                                         │
│ [Review Guidelines]                     │
└─────────────────────────────────────────┘
```

**Fourth Offense (Suspension):**
```
┌─────────────────────────────────────────┐
│      Account Suspended                  │
├─────────────────────────────────────────┤
│                                         │
│ Your account has been suspended for    │
│ 7 days due to repeated spam violations.│
│                                         │
│ Violations:                            │
│ • Feb 20: Mass messaging               │
│ • Feb 23: Copy-paste spam              │
│ • Feb 26: Promotional content          │
│                                         │
│ Suspension ends: March 5, 2026         │
│                                         │
│ Your account will be reviewed before   │
│ reinstatement. Further violations will │
│ result in permanent ban.               │
│                                         │
│ [Appeal Suspension]                     │
└─────────────────────────────────────────┘
```

### 8.2 Penalty Escalation Matrix

| Offense # | Violation Type | Action | Duration | Notes |
|-----------|----------------|--------|----------|-------|
| 1st | Low-effort messages | Soft warning | N/A | Educational |
| 1st | Copy-paste spam | Rate limit (50%) | 48 hours | |
| 1st | Contact info sharing | Hard warning | N/A | + message blocked |
| 1st | Promotional content | Messaging restriction | 24 hours | |
| 2nd | Any spam type | Messaging restriction | 48 hours | |
| 3rd | Any spam type | Account suspension | 7 days | Manual review |
| 4th | Any spam type | Permanent ban | Permanent | No appeal |
| 1st | Bot detected | Permanent ban | Permanent | Critical violation |
| 1st | Scam/fraud | Permanent ban | Permanent | + law enforcement report |

---

## 9. Machine Learning Models

### 9.1 Spam Classification Model

**Training Data:**
```javascript
const trainingData = [
  // Legitimate messages
  { text: "Hi, I noticed you enjoy hiking. Have you been to Yankari recently?", label: "legitimate", features: { length: 68, hasQuestion: true, hasPersonalization: true } },

  // Spam messages
  { text: "Hi", label: "spam", features: { length: 2, hasQuestion: false, hasPersonalization: false } },
  { text: "Join my investment group for passive income!", label: "spam", features: { promotional: true, financial: true } },
  { text: "WhatsApp me on 08012345678", label: "spam", features: { contactInfo: true } }
];
```

**Feature Engineering:**
```javascript
const extractMessageFeatures = (message, userContext) => {
  return {
    // Content features
    length: message.length,
    wordCount: message.split(/\s+/).length,
    avgWordLength: calculateAvgWordLength(message),
    hasQuestion: /\?/.test(message),
    hasGreeting: /^(hi|hey|hello)/i.test(message),
    hasPersonalization: detectPersonalization(message), // References profile

    // Linguistic features
    sentimentScore: analyzeSentiment(message),
    formalityScore: analyzFormality(message),
    complexityScore: analyzeComplexity(message),

    // Spam indicators
    hasContactInfo: detectContactInfo(message).blocked,
    hasPromotion: detectPromotionalContent(message).isSpam,
    hasUrl: /https?:\/\//.test(message),

    // User context
    userSubscription: userContext.subscription,
    userAcceptanceRate: userContext.acceptanceRate,
    userReportCount: userContext.reportCount,
    messagesSentToday: userContext.messagesSentToday,
    accountAge: userContext.accountAge
  };
};
```

**Model Deployment:**
```javascript
const classifyMessage = async (message, userContext) => {
  const features = extractMessageFeatures(message, userContext);

  // Use pre-trained model (e.g., TensorFlow.js, ML.js)
  const prediction = await spamModel.predict(features);

  return {
    isSpam: prediction.confidence > 0.7,
    confidence: prediction.confidence,
    features
  };
};
```

### 9.2 Continuous Learning

**Feedback Loop:**
```javascript
// When user reports message as spam
const handleSpamReport = async (messageId, reporterId) => {
  const message = await getMessage(messageId);

  // Add to training data
  await addTrainingExample({
    text: message.content,
    label: "spam",
    source: "user_report",
    confidence: 1.0
  });

  // Retrain model weekly
  // (Batch job, not real-time)
};

// When message is not reported and gets positive engagement
const handlePositiveEngagement = async (messageId) => {
  const message = await getMessage(messageId);

  // Add to training data
  await addTrainingExample({
    text: message.content,
    label: "legitimate",
    source: "positive_engagement",
    confidence: 0.8
  });
};
```

---

## 10. Analytics & Monitoring

### 10.1 Spam Metrics Dashboard

**Key Metrics:**
- **Spam Detection Rate**: % of messages flagged/blocked
- **False Positive Rate**: % of legitimate messages blocked (from appeals)
- **False Negative Rate**: % of spam that got through (from user reports)
- **Action Distribution**: Warnings / Rate limits / Suspensions / Bans
- **User Churn from Restrictions**: % of users who quit after penalty

**Trend Analysis:**
- Spam volume over time
- Spam by user type (free/premium/vip)
- Most common spam types
- Bot detection trends
- Appeal success rate

### 10.2 Alert Triggers

**Real-Time Alerts:**
- Spam spike (>50% increase in 1 hour) → Investigate cause
- Bot attack detected (>10 bot registrations in 1 hour) → Enable CAPTCHA
- High false positive rate (>5%) → Review detection logic
- Mass account creation from same IP → Block IP temporarily

### 10.3 User Behavior Analysis

**Cohort Analysis:**
- Free users: 15% spam rate
- Premium users: 3% spam rate
- VIP users: <0.5% spam rate

**Insight:** Investment-based model reduces spam naturally

**Acceptance Rate Correlation:**
- Users with <5% acceptance rate: 60% chance of being spam
- Users with >30% acceptance rate: <1% chance of being spam

**Insight:** Acceptance rate is strong spam indicator

---

## 11. User Education

### 11.1 Onboarding Guidance

**During Tier 1 Completion:**
```
┌─────────────────────────────────────────┐
│      Welcome to JoyMatcher              │
├─────────────────────────────────────────┤
│                                         │
│ Tips for success:                      │
│                                         │
│ ✓ Take time to review profiles         │
│ ✓ Personalize your messages            │
│ ✓ Focus on quality over quantity       │
│ ✓ Be patient and thoughtful            │
│                                         │
│ Mass messaging and spam will result in │
│ restrictions.                          │
│                                         │
│ [Got It]                                │
└─────────────────────────────────────────┘
```

### 11.2 Best Practices Guide

**Accessible from:** Settings → Help → Messaging Best Practices

**Content:**
- How to write engaging first messages
- Examples of good vs. bad messages
- Why personalization matters
- Understanding rate limits
- When to share contact information

### 11.3 In-App Tips

**Contextual Prompts:**
- Before sending first message: "Tip: Reference something from their profile"
- After 3 declined Show Interests: "Try completing higher tiers to improve acceptance"
- Before hitting rate limit: "You have 2 Show Interests left today. Use them thoughtfully!"

---

## 12. API Abuse Prevention

### 12.1 API Rate Limiting

**Endpoint-Specific Limits:**

```javascript
const apiLimits = {
  "POST /api/show-interest": {
    free: { max: 5, period: "24h" },
    premium: { max: 20, period: "24h" },
    vip: { max: 50, period: "24h" }
  },
  "POST /api/messages": {
    free: { max: 50, period: "24h" },
    premium: { max: 200, period: "24h" },
    vip: { max: 500, period: "24h" }
  },
  "GET /api/profiles/search": {
    all: { max: 100, period: "1h" }
  },
  "POST /api/auth/login": {
    all: { max: 5, period: "15m" } // Prevent brute force
  }
};
```

**Response (Rate Limit Exceeded):**
```json
HTTP 429 Too Many Requests
{
  "error": "rate_limit_exceeded",
  "message": "You have exceeded the rate limit for this action",
  "limit": 20,
  "remaining": 0,
  "resetAt": "2026-02-27T00:00:00Z"
}
```

### 12.2 API Key Management

**For VIP Concierge Access:**
- Unique API keys per VIP user
- Scoped permissions
- Activity logging
- Automatic revocation on suspicious activity

### 12.3 CAPTCHA Implementation

**Trigger Conditions:**
- Multiple failed login attempts
- Bot detection score >0.7
- Suspicious device fingerprint
- IP address flagged

**Implementation:**
```javascript
const shouldShowCaptcha = async (userId, action) => {
  const riskScore = await calculateRiskScore(userId, action);

  if (riskScore > 0.7) return true;
  if (action === "registration" && await detectBotByDevice()) return true;
  if (action === "login" && await getFailedAttempts(userId) >= 3) return true;

  return false;
};
```

---

## 13. Special Considerations for JoyMatcher

### 13.1 Tier-Aware Spam Detection

**Higher Tiers = Lower Spam Likelihood:**
```javascript
const adjustSpamThreshold = (user) => {
  let threshold = 0.7; // Default spam confidence threshold

  // Tier completion signals seriousness
  if (user.completedTier >= 3) threshold += 0.1;
  if (user.completedTier >= 4) threshold += 0.15;
  if (user.completedTier === 5) threshold += 0.2; // VIP verified

  // Subscription signals investment
  if (user.subscription === "premium") threshold += 0.1;
  if (user.subscription === "vip") threshold += 0.2;

  // Higher threshold = less likely to flag as spam
  return Math.min(threshold, 0.95);
};
```

### 13.2 EDT Respect in Spam Detection

**Spam Cannot Bypass EDT:**
- Even if message is legitimate, if EDT doesn't allow messaging, block
- Rate limits apply after EDT gating (not before)
- Spam detection does not expose restricted tier data

### 13.3 VIP Spam Tolerance

**Zero Tolerance for VIP:**
- VIP users expect zero spam
- Free users spamming VIPs: Immediate ban
- VIP reporting spam: Expedited review (1 hour SLA)
- VIP matches are pre-screened by concierge (spam prevention layer)

---

## 14. Implementation Checklist

### Phase 1: Launch
- [ ] Rate limiting infrastructure (Redis-based)
- [ ] Copy-paste detection (message hashing)
- [ ] Contact info blocking (regex patterns)
- [ ] Promotional keyword detection
- [ ] Low-effort message warnings
- [ ] Show Interest spam detection
- [ ] Graduated enforcement system
- [ ] User education (onboarding tips)

### Phase 2: Post-Launch (1-3 months)
- [ ] ML-based spam classification
- [ ] Behavioral biometrics (typing, mouse)
- [ ] Device fingerprinting
- [ ] Bot detection (headless browser, automation tools)
- [ ] Fake profile detection
- [ ] Dynamic rate limit adjustment
- [ ] Analytics dashboard

### Phase 3: Advanced (3-6 months)
- [ ] Advanced ML models (NLP, deep learning)
- [ ] Real-time clustering (identify spam campaigns)
- [ ] Cross-platform spam detection (same spam across users)
- [ ] Predictive spam scoring (identify before they spam)
- [ ] API abuse prevention enhancements

---

## 15. Testing Strategy

### 15.1 Unit Tests

```javascript
describe("Spam Detection", () => {
  test("detects copy-paste spam", async () => {
    const userId = 123;
    await sendMessage(userId, "Hi, how are you?");
    await sendMessage(userId, "Hi, how are you?");
    await sendMessage(userId, "Hi, how are you?");

    const detection = await detectCopyPasteSpam(userId, "Hi, how are you?");
    expect(detection.isSpam).toBe(true);
  });

  test("blocks contact information", () => {
    const message = "Call me on 08012345678";
    const result = detectContactInfo(message);
    expect(result.blocked).toBe(true);
  });

  test("allows legitimate personalized messages", async () => {
    const message = "Hi, I see you love hiking. Have you been to Yankari?";
    const result = await classifyMessage(message, { subscription: "premium" });
    expect(result.isSpam).toBe(false);
  });
});
```

### 15.2 Integration Tests

- Test rate limiting across different user types
- Test graduated enforcement escalation
- Test EDT + rate limit interaction
- Test VIP spam reporting workflow

### 15.3 Load Tests

- Simulate bot attack (1000 registrations/min)
- Test Redis rate limiting under load
- Test ML model latency (should be <100ms)

---

**Document Control**
Owner: Trust & Safety Team
Review Cycle: Quarterly
Next Review: 2026-05-26
Classification: Internal

**Related Documentation:**
- `safety_system.md` - Reporting and blocking
- `content_moderation.md` - Photo and profile review
- `legal_compliance.md` - Legal framework
- `data_management.md` - Data retention
