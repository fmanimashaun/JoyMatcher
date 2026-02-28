# State Management — JavaScript Prototype Specification

**Version:** 1.0.0
**Last Updated:** 2026-02-26
**Status:** Technical Reference - Authoritative
**Document Type:** Technical Specification

---

## Table of Contents

1. [Overview](#1-overview)
2. [Architecture Philosophy](#2-architecture-philosophy)
3. [Global State Structure](#3-global-state-structure)
4. [User State Model](#4-user-state-model)
5. [Relationship State Model](#5-relationship-state-model)
6. [EDT Calculation Functions](#6-edt-calculation-functions)
7. [State Management Functions](#7-state-management-functions)
8. [Storage Strategy](#8-storage-strategy)
9. [State Synchronization](#9-state-synchronization)
10. [Error Handling](#10-error-handling)
11. [Performance Considerations](#11-performance-considerations)
12. [Testing Strategy](#12-testing-strategy)

---

## 1. Overview

### Purpose

This document defines the complete JavaScript state management system for the JoyMatcher HTML/CSS/JS prototype. It provides the foundation for simulating user interactions, tier logic, EDT calculations, and relationship management without a backend.

### Scope

This specification covers:
- Client-side state objects and data structures
- State initialization and persistence
- EDT calculation algorithms
- Relationship state management
- Tier completion tracking
- Subscription state handling

### Key Requirements

1. **No Backend Dependency**: All state management must work entirely in the browser
2. **Persistence**: State must survive page refreshes using localStorage
3. **Real-Time Calculations**: EDT and eligibility checks must be instant
4. **Data Integrity**: State transitions must maintain consistency
5. **Future-Proof**: Structure must be easily portable to backend implementation

---

## 2. Architecture Philosophy

### Design Principles

**Principle 1: Single Source of Truth**
- Each piece of state has exactly one authoritative location
- Derived state is calculated, never duplicated
- EDT is always computed, never manually set

**Principle 2: Immutable Updates**
- State updates create new objects rather than mutating existing ones
- History tracking is built into update patterns
- Rollback capability for critical operations

**Principle 3: Separation of Concerns**
- User state is independent of relationship state
- Subscription state is separate from tier completion
- UI state is separate from business logic state

**Principle 4: Defensive Programming**
- All state access goes through getter functions
- All state updates go through setter functions
- Invalid states are caught before propagation

---

## 3. Global State Structure

### State Container

```javascript
// Global state object (prototype only - in production this would be Redux/Context)
const AppState = {
  // Current logged-in user
  currentUser: null,

  // All users in the system (simulated database)
  users: new Map(),

  // All relationships (pairwise connections)
  relationships: new Map(),

  // Show Interest queue and history
  showInterests: new Map(),

  // Message threads
  messages: new Map(),

  // VIP applications
  vipApplications: new Map(),

  // System configuration
  config: {
    cooldownPeriodDays: 90,
    tierFields: {}, // Defined below
    subscriptionCeilings: {
      free: 2,
      premium: 4,
      vip: 5
    },
    pricing: {
      NG: {
        premium: { monthly: 18000, quarterly: 45000 },
        vip: { monthly: 200000 }
      },
      OTHER: {
        premium: { monthly: 18, quarterly: 45 },
        vip: { monthly: 500 }
      }
    }
  },

  // Audit logs
  auditLogs: [],

  // Session state
  session: {
    isAuthenticated: false,
    loginTimestamp: null,
    lastActivity: null
  }
};
```

### Initialization

```javascript
/**
 * Initialize application state from localStorage or create new state
 */
function initializeAppState() {
  const savedState = localStorage.getItem('joyMatcherState');

  if (savedState) {
    try {
      const parsed = JSON.parse(savedState);

      // Restore Maps from serialized arrays
      AppState.users = new Map(parsed.users);
      AppState.relationships = new Map(parsed.relationships);
      AppState.showInterests = new Map(parsed.showInterests);
      AppState.messages = new Map(parsed.messages);
      AppState.vipApplications = new Map(parsed.vipApplications);
      AppState.auditLogs = parsed.auditLogs || [];

      // Restore current user
      if (parsed.currentUserId) {
        AppState.currentUser = AppState.users.get(parsed.currentUserId);
        AppState.session.isAuthenticated = true;
        AppState.session.lastActivity = new Date();
      }

      console.log('State restored from localStorage');
    } catch (error) {
      console.error('Failed to restore state:', error);
      createDefaultState();
    }
  } else {
    createDefaultState();
  }
}

/**
 * Create default state with demo users (for prototype)
 */
function createDefaultState() {
  // Create demo users for testing
  const demoUsers = [
    createUser({
      email: 'demo@joymatcher.com',
      displayName: 'Demo User',
      subscription: 'premium',
      country: 'NG'
    }),
    createUser({
      email: 'sarah@example.com',
      displayName: 'Sarah Johnson',
      subscription: 'premium',
      country: 'US'
    }),
    createUser({
      email: 'david@example.com',
      displayName: 'David Okonkwo',
      subscription: 'free',
      country: 'NG'
    })
  ];

  demoUsers.forEach(user => {
    AppState.users.set(user.id, user);
  });

  console.log('Default state created with demo users');
}

/**
 * Persist current state to localStorage
 */
function persistState() {
  try {
    const serializable = {
      currentUserId: AppState.currentUser?.id,
      users: Array.from(AppState.users.entries()),
      relationships: Array.from(AppState.relationships.entries()),
      showInterests: Array.from(AppState.showInterests.entries()),
      messages: Array.from(AppState.messages.entries()),
      vipApplications: Array.from(AppState.vipApplications.entries()),
      auditLogs: AppState.auditLogs.slice(-1000) // Keep last 1000 logs
    };

    localStorage.setItem('joyMatcherState', JSON.stringify(serializable));
    console.log('State persisted to localStorage');
  } catch (error) {
    console.error('Failed to persist state:', error);

    // If quota exceeded, clear old audit logs and retry
    if (error.name === 'QuotaExceededError') {
      AppState.auditLogs = AppState.auditLogs.slice(-100);
      persistState();
    }
  }
}
```

---

## 4. User State Model

### User Object Structure

```javascript
/**
 * Complete user state object
 */
const UserSchema = {
  // Identity
  id: String,                    // UUID
  email: String,                 // Unique, validated
  emailVerified: Boolean,        // Email verification status
  createdAt: Date,              // Account creation timestamp
  lastLoginAt: Date,            // Last successful login

  // Subscription
  subscription: String,          // 'free' | 'premium' | 'vip'
  subscriptionStartDate: Date,  // When current subscription started
  subscriptionEndDate: Date,    // When subscription expires (null for free)
  subscriptionCeiling: Number,  // 2 for free, 4 for premium, 5 for vip

  // Tier Completion Status
  completedTiers: Array,        // [1, 2] = completed Tier 1 and 2
  maxCompletedTier: Number,     // Highest tier completed (computed)
  tierCompletionDates: Object,  // { 1: Date, 2: Date, ... }

  // Tier Data (actual form data)
  tierData: {
    tier1: Object,              // Tier 1 fields
    tier2: Object,              // Tier 2 fields
    tier3: Object,              // Tier 3 fields
    tier4: Object,              // Tier 4 fields
    tier5: Object               // Tier 5 fields
  },

  // Profile
  displayName: String,          // From Tier 1
  dateOfBirth: Date,           // From Tier 1
  age: Number,                 // Computed from DOB
  gender: String,              // From Tier 1
  profilePhoto: String,        // Base64 or URL
  profilePhotoVerified: Boolean, // Liveness check passed

  // Location (from Tier 1)
  city: String,
  state: String,
  country: String,             // ISO code (NG, US, etc.)

  // VIP Status
  isVIP: Boolean,              // VIP member
  vipApplicationStatus: String, // 'none' | 'pending' | 'approved' | 'rejected'
  vipApplicationDate: Date,    // When applied for VIP
  tier5Verified: Boolean,      // KYC complete
  tier5VerificationDate: Date, // When Tier 5 was verified

  // Privacy Settings
  profileVisible: Boolean,     // VIP can make profile invisible
  browsingMode: String,        // 'normal' | 'invisible' (VIP only)

  // Activity Tracking
  lastActive: Date,            // Last app activity
  profileViews: Number,        // Total profile views
  showInterestsSent: Number,   // Total Show Interests sent
  showInterestsReceived: Number, // Total received

  // Moderation
  accountStatus: String,       // 'active' | 'suspended' | 'banned' | 'deleted'
  suspensionReason: String,    // If suspended
  reportCount: Number,         // Number of reports against this user

  // Metadata
  version: Number,             // For schema migrations
  updatedAt: Date             // Last update timestamp
};
```

### User Creation Function

```javascript
/**
 * Create a new user with default values
 * @param {Object} userData - Initial user data
 * @returns {Object} Complete user object
 */
function createUser(userData) {
  const userId = generateUUID();
  const now = new Date();

  const user = {
    // Identity
    id: userId,
    email: userData.email,
    emailVerified: false,
    createdAt: now,
    lastLoginAt: now,

    // Subscription
    subscription: userData.subscription || 'free',
    subscriptionStartDate: now,
    subscriptionEndDate: null,
    subscriptionCeiling: getSubscriptionCeiling(userData.subscription || 'free'),

    // Tier Completion
    completedTiers: [],
    maxCompletedTier: 0,
    tierCompletionDates: {},

    // Tier Data
    tierData: {
      tier1: null,
      tier2: null,
      tier3: null,
      tier4: null,
      tier5: null
    },

    // Profile (populated from Tier 1)
    displayName: userData.displayName || null,
    dateOfBirth: null,
    age: null,
    gender: null,
    profilePhoto: null,
    profilePhotoVerified: false,

    // Location
    city: null,
    state: null,
    country: userData.country || 'NG',

    // VIP Status
    isVIP: userData.subscription === 'vip',
    vipApplicationStatus: 'none',
    vipApplicationDate: null,
    tier5Verified: false,
    tier5VerificationDate: null,

    // Privacy
    profileVisible: true,
    browsingMode: 'normal',

    // Activity
    lastActive: now,
    profileViews: 0,
    showInterestsSent: 0,
    showInterestsReceived: 0,

    // Moderation
    accountStatus: 'active',
    suspensionReason: null,
    reportCount: 0,

    // Metadata
    version: 1,
    updatedAt: now
  };

  // Log user creation
  logAuditEvent({
    eventType: 'user_created',
    userId: userId,
    timestamp: now,
    details: { email: userData.email, subscription: user.subscription }
  });

  return user;
}

/**
 * Get subscription ceiling for a subscription type
 * @param {String} subscription - 'free' | 'premium' | 'vip'
 * @returns {Number} Maximum tier accessible
 */
function getSubscriptionCeiling(subscription) {
  return AppState.config.subscriptionCeilings[subscription] || 2;
}
```

### Tier Completion Functions

```javascript
/**
 * Mark a tier as completed for a user
 * @param {String} userId - User ID
 * @param {Number} tier - Tier number (1-5)
 * @param {Object} tierData - Form data for the tier
 * @returns {Boolean} Success status
 */
function completeTier(userId, tier, tierData) {
  const user = AppState.users.get(userId);
  if (!user) {
    console.error('User not found:', userId);
    return false;
  }

  // Validate tier is within subscription ceiling
  if (tier > user.subscriptionCeiling) {
    console.error('Tier exceeds subscription ceiling:', tier, '>', user.subscriptionCeiling);
    return false;
  }

  // Validate previous tier is completed (must complete in order)
  if (tier > 1 && !user.completedTiers.includes(tier - 1)) {
    console.error('Previous tier not completed:', tier - 1);
    return false;
  }

  // Validate tier data
  if (!validateTierData(tier, tierData)) {
    console.error('Invalid tier data for tier:', tier);
    return false;
  }

  const now = new Date();

  // Update tier data
  user.tierData[`tier${tier}`] = tierData;

  // Add to completed tiers if not already present
  if (!user.completedTiers.includes(tier)) {
    user.completedTiers.push(tier);
    user.completedTiers.sort(); // Keep sorted
  }

  // Update completion date
  user.tierCompletionDates[tier] = now;

  // Recalculate max completed tier
  user.maxCompletedTier = Math.max(...user.completedTiers);

  // If Tier 1, update profile fields
  if (tier === 1) {
    user.displayName = tierData.displayName;
    user.dateOfBirth = new Date(tierData.dateOfBirth);
    user.age = calculateAge(user.dateOfBirth);
    user.gender = tierData.gender;
    user.city = tierData.city;
    user.state = tierData.state;
    user.country = tierData.country;
    user.profilePhoto = tierData.profilePhoto;
    user.profilePhotoVerified = tierData.livenessCheckPassed || false;
  }

  // Update metadata
  user.updatedAt = now;

  // Log event
  logAuditEvent({
    eventType: 'tier_completed',
    userId: userId,
    timestamp: now,
    details: { tier, maxCompletedTier: user.maxCompletedTier }
  });

  // Update all relationships to recalculate EDT
  recalculateAllEDTsForUser(userId);

  // Persist state
  persistState();

  console.log(`User ${userId} completed Tier ${tier}`);
  return true;
}

/**
 * Validate tier data completeness
 * @param {Number} tier - Tier number
 * @param {Object} data - Tier data to validate
 * @returns {Boolean} Valid or not
 */
function validateTierData(tier, data) {
  if (!data || typeof data !== 'object') return false;

  const requiredFields = getTierRequiredFields(tier);

  for (const field of requiredFields) {
    if (data[field] === null || data[field] === undefined || data[field] === '') {
      console.error(`Missing required field for Tier ${tier}:`, field);
      return false;
    }
  }

  return true;
}

/**
 * Get required fields for a tier
 * @param {Number} tier - Tier number
 * @returns {Array} Array of required field names
 */
function getTierRequiredFields(tier) {
  const fields = {
    1: [
      'legalFirstName', 'displayName', 'dateOfBirth', 'gender',
      'city', 'state', 'country', 'faith', 'relationshipIntent', 'profilePhoto'
    ],
    2: [
      'height', 'bodyType', 'educationLevel', 'employmentStatus',
      'occupationCategory', 'workMode', 'smoking', 'alcohol',
      'exerciseFrequency', 'languages'
    ],
    3: [
      'maritalHistory', 'numberOfChildren', 'willingnessToHaveChildren',
      'marriageTimeline', 'familyInvolvement', 'familyDealBreakers'
    ],
    4: [
      'genotype', 'bloodGroup', 'healthConditions',
      'fertilityDisclosures', 'healthLifestyle',
      'coreNonNegotiablesReligion', 'coreNonNegotiablesRelocation',
      'coreNonNegotiablesChildren'
    ],
    5: [
      'governmentId', 'idType', 'idNumber', 'idExpiry',
      'idCountry', 'videoVerification', 'truthDeclaration'
    ]
  };

  return fields[tier] || [];
}

/**
 * Calculate age from date of birth
 * @param {Date} dob - Date of birth
 * @returns {Number} Age in years
 */
function calculateAge(dob) {
  const today = new Date();
  let age = today.getFullYear() - dob.getFullYear();
  const monthDiff = today.getMonth() - dob.getMonth();

  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
    age--;
  }

  return age;
}
```

---

## 5. Relationship State Model

### Relationship Object Structure

```javascript
/**
 * Relationship between two users (pairwise)
 */
const RelationshipSchema = {
  // Identity
  id: String,                   // UUID
  userId1: String,              // First user ID (alphabetically first)
  userId2: String,              // Second user ID

  // Show Interest Status
  showInterestStatus: String,   // 'none' | 'sent' | 'accepted' | 'declined' | 'cooldown'
  showInterestInitiator: String, // User ID who sent Show Interest
  showInterestSentAt: Date,     // When Show Interest was sent
  showInterestRespondedAt: Date, // When recipient responded
  showInterestCooldownEnds: Date, // If declined, cooldown end date

  // Tier Sharing (EDT inputs)
  user1MaxCompletedTier: Number, // Cached from user1.maxCompletedTier
  user2MaxCompletedTier: Number, // Cached from user2.maxCompletedTier
  sharedTierByUser1: Number,    // What User 1 has shared with User 2
  sharedTierByUser2: Number,    // What User 2 has shared with User 1

  // Effective Disclosure Tier (calculated)
  edt: Number,                  // Current EDT (0-5)
  edtLastCalculated: Date,      // When EDT was last calculated

  // EDT History
  edtHistory: Array,            // [{ edt, timestamp, trigger }]

  // Detail Requests
  detailRequests: Array,        // History of tier detail requests
  lastRequestAt: Date,          // Last detail request timestamp

  // Messaging
  messagesUnlocked: Boolean,    // Can they message each other?
  conversationStartedAt: Date,  // When first message sent
  lastMessageAt: Date,          // Last message timestamp
  messageCount: Number,         // Total messages exchanged

  // Tier Awareness
  tierWarningShownToUser1: Boolean, // Has User 1 seen tier warning?
  tierWarningShownToUser2: Boolean, // Has User 2 seen tier warning?
  tierWarningAcknowledgedByUser1At: Date,
  tierWarningAcknowledgedByUser2At: Date,

  // Revocations
  revocations: Array,           // History of tier revocations
  lastRevocationAt: Date,       // Last revocation timestamp

  // Metadata
  createdAt: Date,             // When relationship created
  updatedAt: Date,             // Last update
  version: Number              // For schema migrations
};
```

### Relationship Creation

```javascript
/**
 * Create or get relationship between two users
 * @param {String} userId1 - First user ID
 * @param {String} userId2 - Second user ID
 * @returns {Object} Relationship object
 */
function getOrCreateRelationship(userId1, userId2) {
  // Ensure consistent ordering (alphabetically)
  const [id1, id2] = [userId1, userId2].sort();
  const relationshipId = `${id1}_${id2}`;

  // Check if relationship exists
  let relationship = AppState.relationships.get(relationshipId);

  if (!relationship) {
    // Create new relationship
    const now = new Date();
    const user1 = AppState.users.get(id1);
    const user2 = AppState.users.get(id2);

    if (!user1 || !user2) {
      console.error('One or both users not found:', id1, id2);
      return null;
    }

    relationship = {
      // Identity
      id: relationshipId,
      userId1: id1,
      userId2: id2,

      // Show Interest
      showInterestStatus: 'none',
      showInterestInitiator: null,
      showInterestSentAt: null,
      showInterestRespondedAt: null,
      showInterestCooldownEnds: null,

      // Tier Sharing (initially only Tier 1 visible)
      user1MaxCompletedTier: user1.maxCompletedTier,
      user2MaxCompletedTier: user2.maxCompletedTier,
      sharedTierByUser1: 1, // Always start with Tier 1 shared (public)
      sharedTierByUser2: 1,

      // EDT
      edt: 1, // Start at Tier 1 (public info)
      edtLastCalculated: now,
      edtHistory: [
        { edt: 1, timestamp: now, trigger: 'relationship_created' }
      ],

      // Detail Requests
      detailRequests: [],
      lastRequestAt: null,

      // Messaging
      messagesUnlocked: false,
      conversationStartedAt: null,
      lastMessageAt: null,
      messageCount: 0,

      // Tier Awareness
      tierWarningShownToUser1: false,
      tierWarningShownToUser2: false,
      tierWarningAcknowledgedByUser1At: null,
      tierWarningAcknowledgedByUser2At: null,

      // Revocations
      revocations: [],
      lastRevocationAt: null,

      // Metadata
      createdAt: now,
      updatedAt: now,
      version: 1
    };

    AppState.relationships.set(relationshipId, relationship);

    logAuditEvent({
      eventType: 'relationship_created',
      relationshipId: relationshipId,
      userId1: id1,
      userId2: id2,
      timestamp: now
    });

    persistState();
  }

  return relationship;
}

/**
 * Get relationship ID from two user IDs
 * @param {String} userId1
 * @param {String} userId2
 * @returns {String} Relationship ID
 */
function getRelationshipId(userId1, userId2) {
  const [id1, id2] = [userId1, userId2].sort();
  return `${id1}_${id2}`;
}
```

---

## 6. EDT Calculation Functions

### Core EDT Calculation

```javascript
/**
 * Calculate Effective Disclosure Tier for a relationship
 * EDT = Math.min(user1MaxTier, user2MaxTier, sharedByUser1, sharedByUser2)
 *
 * @param {String} relationshipId - Relationship ID
 * @returns {Number} Calculated EDT (0-5)
 */
function calculateEDT(relationshipId) {
  const relationship = AppState.relationships.get(relationshipId);

  if (!relationship) {
    console.error('Relationship not found:', relationshipId);
    return 0;
  }

  const user1 = AppState.users.get(relationship.userId1);
  const user2 = AppState.users.get(relationship.userId2);

  if (!user1 || !user2) {
    console.error('One or both users not found in relationship:', relationshipId);
    return 0;
  }

  // Update cached completion values
  relationship.user1MaxCompletedTier = user1.maxCompletedTier;
  relationship.user2MaxCompletedTier = user2.maxCompletedTier;

  // Calculate EDT (lowest of 4 values)
  const edt = Math.min(
    user1.maxCompletedTier,
    user2.maxCompletedTier,
    relationship.sharedTierByUser1,
    relationship.sharedTierByUser2
  );

  // Update EDT if changed
  if (edt !== relationship.edt) {
    const previousEDT = relationship.edt;
    relationship.edt = edt;
    relationship.edtLastCalculated = new Date();

    // Add to history
    relationship.edtHistory.push({
      edt: edt,
      previousEDT: previousEDT,
      timestamp: new Date(),
      trigger: 'recalculated',
      snapshot: {
        user1MaxTier: user1.maxCompletedTier,
        user2MaxTier: user2.maxCompletedTier,
        sharedByUser1: relationship.sharedTierByUser1,
        sharedByUser2: relationship.sharedTierByUser2
      }
    });

    // Log EDT change
    logAuditEvent({
      eventType: 'edt_updated',
      relationshipId: relationshipId,
      previousEDT: previousEDT,
      newEDT: edt,
      timestamp: new Date(),
      details: {
        userId1: relationship.userId1,
        userId2: relationship.userId2
      }
    });

    relationship.updatedAt = new Date();
    persistState();

    console.log(`EDT updated for ${relationshipId}: ${previousEDT} → ${edt}`);
  }

  return edt;
}

/**
 * Recalculate EDT for all relationships involving a user
 * Called when user completes a new tier
 * @param {String} userId - User ID
 */
function recalculateAllEDTsForUser(userId) {
  const relationshipIds = getRelationshipIdsForUser(userId);

  relationshipIds.forEach(relationshipId => {
    calculateEDT(relationshipId);
  });

  console.log(`Recalculated ${relationshipIds.length} EDTs for user ${userId}`);
}

/**
 * Get all relationship IDs involving a user
 * @param {String} userId - User ID
 * @returns {Array} Array of relationship IDs
 */
function getRelationshipIdsForUser(userId) {
  const relationshipIds = [];

  AppState.relationships.forEach((relationship, relationshipId) => {
    if (relationship.userId1 === userId || relationship.userId2 === userId) {
      relationshipIds.push(relationshipId);
    }
  });

  return relationshipIds;
}
```

### EDT Enforcement Functions

```javascript
/**
 * Get visible tier data for a user viewing another user's profile
 * Enforces EDT by filtering out higher-tier data
 *
 * @param {String} viewerId - User viewing the profile
 * @param {String} profileOwnerId - User whose profile is being viewed
 * @returns {Object} Filtered profile data
 */
function getVisibleProfileData(viewerId, profileOwnerId) {
  // Can't view own profile through this function
  if (viewerId === profileOwnerId) {
    const user = AppState.users.get(profileOwnerId);
    return user ? { ...user } : null;
  }

  // Get relationship
  const relationshipId = getRelationshipId(viewerId, profileOwnerId);
  const relationship = AppState.relationships.get(relationshipId);

  if (!relationship) {
    console.error('Relationship not found:', relationshipId);
    return null;
  }

  // Calculate current EDT
  const edt = calculateEDT(relationshipId);

  // Get profile owner's data
  const profileOwner = AppState.users.get(profileOwnerId);

  if (!profileOwner) {
    console.error('Profile owner not found:', profileOwnerId);
    return null;
  }

  // Build visible data object based on EDT
  const visibleData = {
    // Always visible
    id: profileOwner.id,
    displayName: profileOwner.displayName,
    age: profileOwner.age,
    profilePhoto: profileOwner.profilePhoto,
    lastActive: profileOwner.lastActive,
    tier5Verified: profileOwner.tier5Verified, // Badge visible, details not

    // EDT-gated tier data
    tier1: edt >= 1 ? profileOwner.tierData.tier1 : null,
    tier2: edt >= 2 ? profileOwner.tierData.tier2 : null,
    tier3: edt >= 3 ? profileOwner.tierData.tier3 : null,
    tier4: edt >= 4 ? profileOwner.tierData.tier4 : null,
    tier5Badge: profileOwner.tier5Verified, // Badge always visible
    tier5Data: edt >= 5 ? profileOwner.tierData.tier5 : null, // Details only if EDT 5

    // Metadata
    currentEDT: edt,
    maxPossibleEDT: Math.min(
      profileOwner.maxCompletedTier,
      AppState.users.get(viewerId).maxCompletedTier
    ),

    // Relationship context
    relationshipStatus: relationship.showInterestStatus,
    messagesUnlocked: relationship.messagesUnlocked
  };

  return visibleData;
}

/**
 * Check if viewer can see specific tier data
 * @param {String} viewerId - User viewing
 * @param {String} profileOwnerId - User being viewed
 * @param {Number} tier - Tier to check
 * @returns {Boolean} Can view or not
 */
function canViewTier(viewerId, profileOwnerId, tier) {
  const relationshipId = getRelationshipId(viewerId, profileOwnerId);
  const relationship = AppState.relationships.get(relationshipId);

  if (!relationship) return false;

  const edt = calculateEDT(relationshipId);
  return edt >= tier;
}
```

---

## 7. State Management Functions

### Tier Sharing Functions

```javascript
/**
 * Update tier sharing for a relationship
 * @param {String} userId - User updating their sharing
 * @param {String} otherUserId - Other user in relationship
 * @param {Number} newSharedTier - New tier level to share (1-5)
 * @returns {Boolean} Success status
 */
function updateTierSharing(userId, otherUserId, newSharedTier) {
  const user = AppState.users.get(userId);

  if (!user) {
    console.error('User not found:', userId);
    return false;
  }

  // Validate new shared tier
  if (newSharedTier < 0 || newSharedTier > 5) {
    console.error('Invalid tier:', newSharedTier);
    return false;
  }

  // Can't share tier higher than completed
  if (newSharedTier > user.maxCompletedTier) {
    console.error('Cannot share tier higher than completed:', newSharedTier, '>', user.maxCompletedTier);
    return false;
  }

  // Get relationship
  const relationshipId = getRelationshipId(userId, otherUserId);
  const relationship = AppState.relationships.get(relationshipId);

  if (!relationship) {
    console.error('Relationship not found:', relationshipId);
    return false;
  }

  // Determine which user is updating
  const isUser1 = relationship.userId1 === userId;
  const sharedTierKey = isUser1 ? 'sharedTierByUser1' : 'sharedTierByUser2';
  const previousSharedTier = relationship[sharedTierKey];

  // Update shared tier
  relationship[sharedTierKey] = newSharedTier;
  relationship.updatedAt = new Date();

  // Log if this is a revocation (downgrade)
  if (newSharedTier < previousSharedTier) {
    relationship.revocations.push({
      revokedBy: userId,
      previousTier: previousSharedTier,
      newTier: newSharedTier,
      timestamp: new Date(),
      reason: 'user_initiated'
    });
    relationship.lastRevocationAt = new Date();

    logAuditEvent({
      eventType: 'tier_revoked',
      relationshipId: relationshipId,
      userId: userId,
      previousTier: previousSharedTier,
      newTier: newSharedTier,
      timestamp: new Date()
    });
  } else {
    logAuditEvent({
      eventType: 'tier_sharing_updated',
      relationshipId: relationshipId,
      userId: userId,
      previousTier: previousSharedTier,
      newTier: newSharedTier,
      timestamp: new Date()
    });
  }

  // Recalculate EDT
  const newEDT = calculateEDT(relationshipId);

  persistState();

  console.log(`User ${userId} updated tier sharing to ${newSharedTier}, new EDT: ${newEDT}`);
  return true;
}

/**
 * Revoke tier access in a relationship
 * Symmetric revocation: both users lose access to higher tiers
 * @param {String} userId - User revoking access
 * @param {String} otherUserId - Other user in relationship
 * @param {Number} newSharedTier - New tier level (downgrade)
 * @returns {Boolean} Success status
 */
function revokeTierAccess(userId, otherUserId, newSharedTier) {
  // Use same function, but with explicit logging as revocation
  return updateTierSharing(userId, otherUserId, newSharedTier);
}
```

### Subscription Management

```javascript
/**
 * Upgrade user subscription
 * @param {String} userId - User ID
 * @param {String} newSubscription - 'premium' | 'vip'
 * @param {Number} durationMonths - Subscription duration
 * @returns {Boolean} Success status
 */
function upgradeSubscription(userId, newSubscription, durationMonths = 1) {
  const user = AppState.users.get(userId);

  if (!user) {
    console.error('User not found:', userId);
    return false;
  }

  const validSubscriptions = ['free', 'premium', 'vip'];
  if (!validSubscriptions.includes(newSubscription)) {
    console.error('Invalid subscription:', newSubscription);
    return false;
  }

  const previousSubscription = user.subscription;
  const now = new Date();

  // Update subscription
  user.subscription = newSubscription;
  user.subscriptionCeiling = getSubscriptionCeiling(newSubscription);
  user.subscriptionStartDate = now;

  // Calculate end date
  const endDate = new Date(now);
  endDate.setMonth(endDate.getMonth() + durationMonths);
  user.subscriptionEndDate = endDate;

  // Update VIP status
  if (newSubscription === 'vip') {
    user.isVIP = true;
  }

  user.updatedAt = now;

  // Log event
  logAuditEvent({
    eventType: 'subscription_upgraded',
    userId: userId,
    previousSubscription: previousSubscription,
    newSubscription: newSubscription,
    durationMonths: durationMonths,
    timestamp: now
  });

  // Recalculate all EDTs (subscription ceiling may affect them)
  recalculateAllEDTsForUser(userId);

  persistState();

  console.log(`User ${userId} upgraded from ${previousSubscription} to ${newSubscription}`);
  return true;
}

/**
 * Downgrade user subscription (e.g., expiry)
 * @param {String} userId - User ID
 * @param {String} newSubscription - 'free' | 'premium'
 * @returns {Boolean} Success status
 */
function downgradeSubscription(userId, newSubscription) {
  const user = AppState.users.get(userId);

  if (!user) {
    console.error('User not found:', userId);
    return false;
  }

  const previousSubscription = user.subscription;
  const previousCeiling = user.subscriptionCeiling;
  const now = new Date();

  // Update subscription
  user.subscription = newSubscription;
  user.subscriptionCeiling = getSubscriptionCeiling(newSubscription);
  user.subscriptionEndDate = null;

  // Update VIP status
  if (newSubscription !== 'vip') {
    user.isVIP = false;
  }

  // Cap completed tiers at new ceiling
  if (user.subscriptionCeiling < previousCeiling) {
    user.completedTiers = user.completedTiers.filter(tier => tier <= user.subscriptionCeiling);
    user.maxCompletedTier = Math.max(...user.completedTiers, 0);

    // Clear tier data above ceiling
    for (let tier = user.subscriptionCeiling + 1; tier <= 5; tier++) {
      user.tierData[`tier${tier}`] = null;
      delete user.tierCompletionDates[tier];
    }
  }

  user.updatedAt = now;

  // Log event
  logAuditEvent({
    eventType: 'subscription_downgraded',
    userId: userId,
    previousSubscription: previousSubscription,
    newSubscription: newSubscription,
    timestamp: now
  });

  // Recalculate all EDTs (ceiling change affects EDT)
  recalculateAllEDTsForUser(userId);

  persistState();

  console.log(`User ${userId} downgraded from ${previousSubscription} to ${newSubscription}`);
  return true;
}
```

---

## 8. Storage Strategy

### LocalStorage Management

```javascript
/**
 * Storage configuration
 */
const StorageConfig = {
  key: 'joyMatcherState',
  version: 1,
  maxAuditLogs: 1000,
  persistDebounceMs: 500 // Debounce rapid updates
};

/**
 * Debounced persist function
 */
let persistTimeout = null;

function debouncedPersist() {
  if (persistTimeout) {
    clearTimeout(persistTimeout);
  }

  persistTimeout = setTimeout(() => {
    persistState();
  }, StorageConfig.persistDebounceMs);
}

/**
 * Clear all state (for development/testing)
 */
function clearAllState() {
  localStorage.removeItem(StorageConfig.key);

  // Reset AppState
  AppState.currentUser = null;
  AppState.users = new Map();
  AppState.relationships = new Map();
  AppState.showInterests = new Map();
  AppState.messages = new Map();
  AppState.vipApplications = new Map();
  AppState.auditLogs = [];
  AppState.session = {
    isAuthenticated: false,
    loginTimestamp: null,
    lastActivity: null
  };

  console.log('All state cleared');
}

/**
 * Export state as JSON (for debugging)
 */
function exportState() {
  const state = {
    users: Array.from(AppState.users.entries()),
    relationships: Array.from(AppState.relationships.entries()),
    showInterests: Array.from(AppState.showInterests.entries()),
    messages: Array.from(AppState.messages.entries()),
    vipApplications: Array.from(AppState.vipApplications.entries()),
    auditLogs: AppState.auditLogs
  };

  return JSON.stringify(state, null, 2);
}

/**
 * Import state from JSON (for debugging)
 */
function importState(jsonString) {
  try {
    const state = JSON.parse(jsonString);

    AppState.users = new Map(state.users);
    AppState.relationships = new Map(state.relationships);
    AppState.showInterests = new Map(state.showInterests);
    AppState.messages = new Map(state.messages);
    AppState.vipApplications = new Map(state.vipApplications);
    AppState.auditLogs = state.auditLogs || [];

    persistState();

    console.log('State imported successfully');
    return true;
  } catch (error) {
    console.error('Failed to import state:', error);
    return false;
  }
}
```

---

## 9. State Synchronization

### Cross-Tab Communication

```javascript
/**
 * Listen for storage changes across tabs
 */
window.addEventListener('storage', (event) => {
  if (event.key === StorageConfig.key) {
    console.log('State updated in another tab, reloading...');

    // Reload state from localStorage
    initializeAppState();

    // Trigger UI update event
    window.dispatchEvent(new CustomEvent('stateUpdated', {
      detail: { source: 'storage_event' }
    }));
  }
});

/**
 * Custom event for state updates
 */
function notifyStateUpdate(eventType, details = {}) {
  window.dispatchEvent(new CustomEvent('stateUpdated', {
    detail: {
      eventType,
      timestamp: new Date(),
      ...details
    }
  }));
}
```

---

## 10. Error Handling

### State Validation

```javascript
/**
 * Validate entire AppState integrity
 * @returns {Array} Array of validation errors
 */
function validateAppState() {
  const errors = [];

  // Validate users
  AppState.users.forEach((user, userId) => {
    if (user.id !== userId) {
      errors.push(`User ID mismatch: ${userId} !== ${user.id}`);
    }

    if (user.completedTiers.length > 0 && user.maxCompletedTier !== Math.max(...user.completedTiers)) {
      errors.push(`User ${userId}: maxCompletedTier inconsistent`);
    }

    if (user.subscription === 'vip' && !user.isVIP) {
      errors.push(`User ${userId}: VIP subscription but isVIP = false`);
    }
  });

  // Validate relationships
  AppState.relationships.forEach((relationship, relationshipId) => {
    const expectedId = getRelationshipId(relationship.userId1, relationship.userId2);
    if (relationshipId !== expectedId) {
      errors.push(`Relationship ID mismatch: ${relationshipId} !== ${expectedId}`);
    }

    if (relationship.edt > relationship.user1MaxCompletedTier ||
        relationship.edt > relationship.user2MaxCompletedTier) {
      errors.push(`Relationship ${relationshipId}: EDT exceeds completed tiers`);
    }
  });

  return errors;
}

/**
 * Attempt to repair state inconsistencies
 */
function repairAppState() {
  console.log('Attempting to repair state...');

  let repairCount = 0;

  // Repair users
  AppState.users.forEach((user, userId) => {
    // Recalculate maxCompletedTier
    const correctMax = user.completedTiers.length > 0
      ? Math.max(...user.completedTiers)
      : 0;

    if (user.maxCompletedTier !== correctMax) {
      user.maxCompletedTier = correctMax;
      repairCount++;
    }

    // Sync VIP status
    if (user.subscription === 'vip' && !user.isVIP) {
      user.isVIP = true;
      repairCount++;
    } else if (user.subscription !== 'vip' && user.isVIP) {
      user.isVIP = false;
      repairCount++;
    }
  });

  // Recalculate all EDTs
  AppState.relationships.forEach((relationship, relationshipId) => {
    const oldEDT = relationship.edt;
    calculateEDT(relationshipId);
    if (oldEDT !== relationship.edt) {
      repairCount++;
    }
  });

  if (repairCount > 0) {
    persistState();
    console.log(`Repaired ${repairCount} state inconsistencies`);
  } else {
    console.log('No repairs needed');
  }

  return repairCount;
}
```

---

## 11. Performance Considerations

### Optimization Strategies

**1. EDT Caching**
- EDT is cached in relationship object
- Only recalculated on triggers (tier completion, sharing change)
- Avoids expensive recalculation on every profile view

**2. Debounced Persistence**
- Rapid state changes debounced before localStorage write
- Reduces localStorage quota pressure
- Batches updates for better performance

**3. Indexed Lookups**
- Use Map for O(1) lookup of users and relationships
- Avoid array iteration for state access
- Relationship ID pattern ensures fast pairwise lookup

**4. Lazy Loading**
- Only load visible tier data on demand
- Filter tier data at read time, not store time
- Reduces memory footprint

**5. Audit Log Trimming**
- Keep only last 1000 audit logs in localStorage
- Older logs can be exported/archived
- Prevents quota exceeded errors

---

## 12. Testing Strategy

### Unit Tests Required

```javascript
/**
 * Test Suite: State Management
 */

// User State Tests
describe('User State Management', () => {
  test('createUser creates valid user object', () => {
    const user = createUser({ email: 'test@example.com', subscription: 'free' });
    expect(user.id).toBeDefined();
    expect(user.subscription).toBe('free');
    expect(user.subscriptionCeiling).toBe(2);
  });

  test('completeTier updates user state correctly', () => {
    const user = createUser({ email: 'test@example.com', subscription: 'premium' });
    const tierData = { /* valid tier 1 data */ };
    const result = completeTier(user.id, 1, tierData);
    expect(result).toBe(true);
    expect(user.completedTiers).toContain(1);
    expect(user.maxCompletedTier).toBe(1);
  });

  test('completeTier enforces subscription ceiling', () => {
    const user = createUser({ email: 'test@example.com', subscription: 'free' });
    const tierData = { /* valid tier 3 data */ };
    const result = completeTier(user.id, 3, tierData);
    expect(result).toBe(false); // Free ceiling is 2
  });
});

// Relationship State Tests
describe('Relationship State Management', () => {
  test('getOrCreateRelationship creates relationship with correct ordering', () => {
    const user1 = createUser({ email: 'user1@example.com' });
    const user2 = createUser({ email: 'user2@example.com' });

    const rel1 = getOrCreateRelationship(user1.id, user2.id);
    const rel2 = getOrCreateRelationship(user2.id, user1.id);

    expect(rel1.id).toBe(rel2.id); // Same relationship regardless of order
  });

  test('relationship starts with EDT = 1', () => {
    const user1 = createUser({ email: 'user1@example.com' });
    const user2 = createUser({ email: 'user2@example.com' });

    const rel = getOrCreateRelationship(user1.id, user2.id);
    expect(rel.edt).toBe(1);
  });
});

// EDT Tests
describe('EDT Calculation', () => {
  test('calculateEDT returns minimum of 4 values', () => {
    const user1 = createUser({ email: 'user1@example.com', subscription: 'premium' });
    const user2 = createUser({ email: 'user2@example.com', subscription: 'premium' });

    completeTier(user1.id, 1, { /* tier 1 data */ });
    completeTier(user1.id, 2, { /* tier 2 data */ });
    completeTier(user1.id, 3, { /* tier 3 data */ });

    completeTier(user2.id, 1, { /* tier 1 data */ });
    completeTier(user2.id, 2, { /* tier 2 data */ });

    const rel = getOrCreateRelationship(user1.id, user2.id);
    updateTierSharing(user1.id, user2.id, 3);
    updateTierSharing(user2.id, user1.id, 2);

    const edt = calculateEDT(rel.id);
    expect(edt).toBe(2); // User2's max completed tier limits it
  });

  test('EDT updates when user completes new tier', () => {
    const user1 = createUser({ email: 'user1@example.com', subscription: 'premium' });
    const user2 = createUser({ email: 'user2@example.com', subscription: 'premium' });

    completeTier(user1.id, 1, { /* tier 1 data */ });
    completeTier(user2.id, 1, { /* tier 1 data */ });

    const rel = getOrCreateRelationship(user1.id, user2.id);
    let edt = calculateEDT(rel.id);
    expect(edt).toBe(1);

    // User2 completes Tier 2
    completeTier(user2.id, 2, { /* tier 2 data */ });
    updateTierSharing(user2.id, user1.id, 2);

    edt = calculateEDT(rel.id);
    expect(edt).toBe(1); // Still 1 because User1 hasn't completed Tier 2

    // User1 completes Tier 2
    completeTier(user1.id, 2, { /* tier 2 data */ });
    updateTierSharing(user1.id, user2.id, 2);

    edt = calculateEDT(rel.id);
    expect(edt).toBe(2); // Now both have completed and shared Tier 2
  });
});

// Tier Sharing Tests
describe('Tier Sharing Management', () => {
  test('updateTierSharing prevents sharing above completed tier', () => {
    const user1 = createUser({ email: 'user1@example.com', subscription: 'premium' });
    const user2 = createUser({ email: 'user2@example.com', subscription: 'premium' });

    completeTier(user1.id, 1, { /* tier 1 data */ });
    completeTier(user1.id, 2, { /* tier 2 data */ });

    const result = updateTierSharing(user1.id, user2.id, 3);
    expect(result).toBe(false); // Can't share Tier 3 (not completed)
  });

  test('revokeTierAccess logs revocation', () => {
    const user1 = createUser({ email: 'user1@example.com', subscription: 'premium' });
    const user2 = createUser({ email: 'user2@example.com', subscription: 'premium' });

    completeTier(user1.id, 1, { /* tier 1 data */ });
    completeTier(user1.id, 2, { /* tier 2 data */ });
    completeTier(user1.id, 3, { /* tier 3 data */ });

    const rel = getOrCreateRelationship(user1.id, user2.id);
    updateTierSharing(user1.id, user2.id, 3);

    // Revoke down to Tier 2
    revokeTierAccess(user1.id, user2.id, 2);

    expect(rel.revocations.length).toBe(1);
    expect(rel.revocations[0].previousTier).toBe(3);
    expect(rel.revocations[0].newTier).toBe(2);
  });
});

// Subscription Tests
describe('Subscription Management', () => {
  test('upgradeSubscription updates ceiling', () => {
    const user = createUser({ email: 'test@example.com', subscription: 'free' });

    upgradeSubscription(user.id, 'premium', 1);

    expect(user.subscription).toBe('premium');
    expect(user.subscriptionCeiling).toBe(4);
  });

  test('downgradeSubscription caps completed tiers', () => {
    const user = createUser({ email: 'test@example.com', subscription: 'premium' });

    completeTier(user.id, 1, { /* tier 1 data */ });
    completeTier(user.id, 2, { /* tier 2 data */ });
    completeTier(user.id, 3, { /* tier 3 data */ });

    downgradeSubscription(user.id, 'free');

    expect(user.subscription).toBe('free');
    expect(user.subscriptionCeiling).toBe(2);
    expect(user.completedTiers).toEqual([1, 2]);
    expect(user.maxCompletedTier).toBe(2);
    expect(user.tierData.tier3).toBeNull();
  });
});
```

---

## Utility Functions

### Helper Functions

```javascript
/**
 * Generate UUID v4
 * @returns {String} UUID
 */
function generateUUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

/**
 * Log audit event
 * @param {Object} event - Event details
 */
function logAuditEvent(event) {
  AppState.auditLogs.push({
    id: generateUUID(),
    ...event,
    timestamp: event.timestamp || new Date()
  });

  // Trim if exceeds max
  if (AppState.auditLogs.length > StorageConfig.maxAuditLogs) {
    AppState.auditLogs = AppState.auditLogs.slice(-StorageConfig.maxAuditLogs);
  }
}

/**
 * Get audit logs for a user
 * @param {String} userId - User ID
 * @param {Number} limit - Max number of logs to return
 * @returns {Array} Array of audit log entries
 */
function getAuditLogsForUser(userId, limit = 100) {
  return AppState.auditLogs
    .filter(log => log.userId === userId || log.details?.userId === userId)
    .slice(-limit)
    .reverse();
}

/**
 * Get audit logs for a relationship
 * @param {String} relationshipId - Relationship ID
 * @param {Number} limit - Max number of logs
 * @returns {Array} Array of audit log entries
 */
function getAuditLogsForRelationship(relationshipId, limit = 100) {
  return AppState.auditLogs
    .filter(log => log.relationshipId === relationshipId)
    .slice(-limit)
    .reverse();
}
```

---

## Related Documentation

- [EDT Specification](../Global%20Context/edt_specification.md) - Complete EDT rules
- [Tier System](../Global%20Context/tier_system.md) - Tier definitions
- [Show Interest Flow](show_interest_flow.md) - Show Interest implementation
- [Request Details Flow](request_details_flow.md) - Detail request logic
- [Data Models](data_models.md) - Backend database schema

---

**Document Owner:** Engineering Lead
**Technical Reviewer:** Senior Frontend Engineer
**Last Reviewed:** 2026-02-26
**Next Review:** 2026-05-26 (Quarterly)
