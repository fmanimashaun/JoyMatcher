# Data Management & Retention

**Version:** 1.0.0
**Last Updated:** 2026-02-26
**Status:** Complete Specification
**Applies To:** All user data across all tiers and system logs

---

## 1. Executive Summary

JoyMatcher's data management framework defines comprehensive data retention policies, anonymization procedures, deletion workflows, and backup strategies for a trust-based matchmaking platform. This document ensures compliance with GDPR, NDPR, and industry best practices while respecting the unique requirements of tier-based disclosure, sensitive health data, verified identity documents, and marriage-oriented user expectations.

Key considerations for JoyMatcher's data management:
- Tier-based data with varying sensitivity levels (Tier 4 health, Tier 5 biometric)
- One-to-one disclosure relationships (pairwise data sharing)
- Revocable consent model (users can downgrade tiers)
- Legal retention requirements (financial records, legal holds)
- Cross-border data storage (Nigeria, EU, US)
- VIP identity verification artifacts
- User expectation of data permanence vs. right to erasure

---

## 2. Data Classification

### 2.1 Data Categories by Sensitivity

| Category | Examples | Sensitivity | Retention | Encryption |
|----------|----------|-------------|-----------|------------|
| **Public Data** | Display name, age, city, gender | Low | Account lifetime | In transit only |
| **Personal Data** | Legal name, email, phone, DOB | Medium | Account lifetime + 30 days | At rest + in transit |
| **Lifestyle Data** | Tier 2 (education, occupation, lifestyle) | Medium | Account lifetime + 30 days | At rest + in transit |
| **Relationship Data** | Tier 3 (marital history, children, family) | High | Account lifetime + 30 days | At rest + in transit |
| **Health Data** | Tier 4 (genotype, blood group, conditions) | Critical | Account lifetime + 30 days | At rest + in transit + access control |
| **Biometric Data** | Tier 5 (ID photos, face verification) | Critical | 90 days post-verification | At rest + in transit + access control |
| **Financial Data** | Payment methods (tokenized), transactions | High | 7 years (legal requirement) | At rest + in transit + PCI DSS |
| **Communication Data** | Messages, Show Interest records | Medium | Account lifetime + 30 days | At rest + in transit |
| **Behavioral Data** | Profile views, search history, clicks | Low | 2 years (analytics) | Aggregated only |
| **Security Data** | Audit logs, security events, reports | Medium | 3 years (compliance) | At rest + in transit |
| **Moderation Data** | Reports, violations, content flags | High | 7 years (legal claims) | At rest + in transit |

### 2.2 Data Storage Locations

**Primary Database (PostgreSQL):**
- User profiles (Tier 1-5 data)
- Relationships and EDT calculations
- Messages
- Subscriptions

**Encrypted Storage (AWS S3 / Google Cloud Storage):**
- Profile photos
- Tier 5 verification photos (separate, highly restricted bucket)
- Government ID scans (encrypted at rest, auto-delete after 90 days)

**Caching Layer (Redis):**
- Session data
- Rate limiting counters
- Real-time presence
- **Retention:** Ephemeral (seconds to hours), no persistent storage

**Analytics (Mixpanel / Google Analytics):**
- Anonymized behavioral data
- Aggregate statistics
- **Retention:** 2 years

**Logs (CloudWatch / ELK):**
- Application logs
- Security logs
- Audit trails
- **Retention:** 3 years

**Backups:**
- See Section 8: Backup & Disaster Recovery

---

## 3. Data Retention Policies

### 3.1 Active Account Data

**Retention:** Indefinitely while account is active

**Rationale:** Users expect their profiles to persist, especially given investment in tier completion and subscription payments.

**Data Included:**
- All tier data (1-5)
- Messages
- Show Interest history
- Photos
- Subscription history

### 3.2 Inactive Account Data

**Inactive Definition:** No login for 24 months

**Retention Policy:**
- **24-30 months:** Account remains active (no action)
- **30 months:** Email notification ("Your account will be deactivated in 60 days")
- **32 months:** Final notification ("Your account will be deactivated in 7 days")
- **32.5 months:** Account soft-deleted (see Section 4.2)

**Exceptions:**
- Active subscription: Account never auto-deactivated while paying
- Legal hold: Account cannot be deleted while under investigation

### 3.3 Deleted Account Data

**User-Initiated Deletion:**
- See Section 4: Data Deletion Workflows

**Retention After Deletion:**
- Personal data: 30 days (soft delete period), then permanently deleted
- Financial records: 7 years (legal requirement)
- Legal/moderation records: 7 years (litigation hold)
- Anonymized analytics: 2 years

### 3.4 Specific Data Types

#### 3.4.1 Messages

**Active Conversations:**
- Retained indefinitely while both accounts active
- If one user deletes account: Other user's messages retained (sender identity anonymized)

**Deleted Conversations (User Action):**
- Soft delete: 30 days (user can undo)
- Hard delete: After 30 days or immediate if user confirms

**Reported Messages:**
- Retained for 7 years (evidence for moderation/legal)

#### 3.4.2 Photos

**Profile Photos:**
- Retained while account active
- Deleted 30 days after account deletion

**Verification Photos (Tier 5):**
- Government ID scans: Deleted 90 days after verification approved
- Selfie with ID: Deleted 90 days after verification approved
- Liveness video: Deleted 90 days after verification approved
- **Metadata retained:** Verification status, date, reviewer (no images)

**Rejected Photos:**
- Deleted 90 days after rejection (appeal window)
- If appealed and re-approved: Retained as profile photo

#### 3.4.3 Health Data (Tier 4)

**Active Account:**
- Retained indefinitely (critical for compatibility matching)
- User can edit or revoke sharing anytime

**Deleted Account:**
- Deleted after 30-day soft delete period
- No anonymization (health data is meaningless without context)

**Special Consideration:**
- GDPR Art. 9 (special category data) allows shorter retention
- Users can request immediate deletion (bypass 30-day period)

#### 3.4.4 Financial Records

**Transactions:**
- Retained for 7 years (tax, audit, fraud investigation)
- Cannot be deleted by user request

**Payment Methods:**
- Tokenized card data: Retained while active subscription
- Deleted 30 days after subscription ends
- Never store raw card numbers (PCI DSS compliance)

**Invoices:**
- Retained for 7 years (tax compliance)
- Available to user via Settings → Billing History

#### 3.4.5 Audit Logs

**Security Logs:**
- Login attempts, IP addresses, device fingerprints
- Retained for 3 years (security investigation)

**Data Access Logs:**
- Who viewed whose tier data, when (EDT compliance)
- Retained for 3 years (GDPR accountability)

**Admin Actions:**
- Account suspensions, content moderation, data access by staff
- Retained for 7 years (legal compliance)

#### 3.4.6 Legal & Moderation Records

**Reports (Safety):**
- Retained for 7 years (litigation hold)
- Evidence (screenshots, messages): 7 years

**Violations:**
- Warnings, suspensions, bans: 7 years
- Appeals: 7 years

**Law Enforcement Requests:**
- Requests and responses: 10 years

---

## 4. Data Deletion Workflows

### 4.1 User-Initiated Deletion (GDPR Right to Erasure)

#### 4.1.1 Account Deletion Flow

**User Experience:**
```
Settings → Privacy → Delete My Account

┌─────────────────────────────────────────┐
│      Delete Your Account                │
├─────────────────────────────────────────┤
│                                         │
│ Are you sure you want to delete your   │
│ account? This action cannot be undone. │
│                                         │
│ What will happen:                      │
│ • Your profile will be hidden          │
│   immediately                          │
│ • Your data will be permanently        │
│   deleted in 30 days                   │
│ • You can cancel within 30 days        │
│                                         │
│ What will be deleted:                  │
│ • All profile information (Tiers 1-5)  │
│ • Photos                               │
│ • Messages (for you; others keep       │
│   their copy with your name removed)   │
│ • Show Interest history                │
│ • Subscription (you can cancel first   │
│   to avoid charges)                    │
│                                         │
│ What will NOT be deleted:              │
│ • Financial records (legal requirement)│
│ • Safety reports (if you reported      │
│   someone or were reported)            │
│                                         │
│ ┌─────────────────────────────────────┐ │
│ │ Type DELETE to confirm              │ │
│ └─────────────────────────────────────┘ │
│                                         │
│ [Cancel]              [Delete Account]  │
└─────────────────────────────────────────┘
```

**Confirmation Email:**
```
Subject: Your JoyMatcher Account Has Been Deactivated

Dear [User],

Your account has been deactivated as requested.

What happens next:
• Your profile is hidden from all users immediately
• Your data will be permanently deleted on March 28, 2026 (30 days)
• You can reactivate anytime before then by logging in

If you did not request this, log in immediately to cancel the deletion.

Questions? Contact support@joymatcher.com

- JoyMatcher Team
```

#### 4.1.2 Backend Deletion Process

**Immediate Actions (Soft Delete):**
```javascript
const softDeleteAccount = async (userId) => {
  const deleteDate = new Date();
  deleteDate.setDate(deleteDate.getDate() + 30); // 30 days from now

  await db.users.update({
    where: { id: userId },
    data: {
      status: "deleted",
      deletedAt: new Date(),
      permanentDeleteAt: deleteDate,
      // Anonymize immediately visible data
      displayName: "Deleted User",
      bio: null,
      primaryPhoto: null
    }
  });

  // Hide from discovery
  await searchIndex.removeUser(userId);

  // Revoke all tier sharing
  await revokeAllTierSharing(userId);

  // Cancel active subscriptions
  await cancelSubscription(userId);

  // Notify connected users
  await notifyConnectedUsers(userId, "This user has deleted their account.");

  // Schedule permanent deletion job
  await scheduleJob("permanentDelete", { userId }, deleteDate);

  // Audit log
  await logAudit({
    userId,
    action: "account_soft_deleted",
    triggeredBy: "user",
    permanentDeleteAt: deleteDate
  });

  // Send confirmation email
  await sendEmail(user.email, "accountDeletionConfirmation", { deleteDate });
};
```

**30 Days Later (Hard Delete):**
```javascript
const permanentDeleteAccount = async (userId) => {
  // Verify still marked for deletion (user didn't reactivate)
  const user = await db.users.findUnique({ where: { id: userId } });
  if (user.status !== "deleted") {
    console.log("User reactivated, skipping deletion");
    return;
  }

  // Delete personal data
  await deleteUserPersonalData(userId);

  // Delete photos
  await deleteUserPhotos(userId);

  // Anonymize messages (keep for other users)
  await anonymizeUserMessages(userId);

  // Delete behavioral data
  await deleteUserBehavioralData(userId);

  // Retain financial records (7 years) and moderation records (7 years)
  // These are NOT deleted

  // Mark user as permanently deleted
  await db.users.update({
    where: { id: userId },
    data: {
      email: null,
      phone: null,
      legalName: null,
      // Keep userId for foreign key integrity
      permanentlyDeletedAt: new Date()
    }
  });

  // Audit log
  await logAudit({
    userId,
    action: "account_permanently_deleted",
    triggeredBy: "automated_job"
  });

  // Send final confirmation email (if email still valid)
  if (user.email) {
    await sendEmail(user.email, "accountPermanentlyDeleted");
  }
};
```

#### 4.1.3 Immediate Deletion (GDPR Exceptional Cases)

**User Request:**
```
"I need my data deleted immediately due to safety concerns."
```

**Process:**
1. User contacts support@joymatcher.com
2. Support verifies identity (challenge question, email verification)
3. Legal/DPO reviews request (GDPR Art. 17 grounds)
4. If approved: Immediate hard delete (bypass 30-day period)
5. User notified within 24 hours

**Valid Grounds for Immediate Deletion:**
- Safety threat (stalking, harassment, doxxing)
- Data processed unlawfully
- Legal obligation to erase

### 4.2 Specific Data Deletion Requests (Partial Deletion)

#### 4.2.1 Delete Specific Tier Data

**User Request:**
```
"I want to delete my Tier 4 health data but keep my account."
```

**Process:**
1. User goes to Settings → Privacy → Manage Tier Data
2. Selects Tier 4 → "Delete Tier Data"
3. Confirmation: "This will downgrade your EDT with all users. You can re-enter this data later."
4. Tier 4 data deleted, tier marked incomplete
5. EDT recalculated for all relationships
6. Connected users notified: "X has updated their profile sharing."

**Implementation:**
```javascript
const deleteTierData = async (userId, tier) => {
  // Delete tier-specific data
  await db[`tier${tier}`].delete({ where: { userId } });

  // Mark tier as incomplete
  await db.users.update({
    where: { id: userId },
    data: { [`tier${tier}Complete`]: false }
  });

  // Recalculate EDT for all relationships
  const relationships = await db.relationships.findMany({
    where: { OR: [{ userAId: userId }, { userBId: userId }] }
  });

  for (const rel of relationships) {
    await recalculateEDT(rel.id);
  }

  // Audit log
  await logAudit({
    userId,
    action: `tier_${tier}_data_deleted`,
    triggeredBy: "user"
  });
};
```

#### 4.2.2 Delete Specific Messages/Conversations

**User Action:**
- Delete single message: Message marked deleted (still visible to recipient)
- Delete conversation: All messages in thread soft-deleted for 30 days

**Implementation:**
```javascript
const deleteConversation = async (userId, conversationId) => {
  // Soft delete for 30 days
  await db.messages.updateMany({
    where: {
      conversationId,
      OR: [{ senderId: userId }, { recipientId: userId }]
    },
    data: {
      deletedBy: userId,
      deletedAt: new Date(),
      permanentDeleteAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
    }
  });

  // After 30 days, messages truly deleted (for that user only)
  // Other user still sees messages unless they also delete
};
```

#### 4.2.3 Delete Specific Photos

**User Action:**
- User deletes photo from profile

**Implementation:**
```javascript
const deletePhoto = async (userId, photoId) => {
  const photo = await db.photos.findUnique({ where: { id: photoId } });

  // Remove from profile
  await db.photos.update({
    where: { id: photoId },
    data: { deletedAt: new Date() }
  });

  // Delete from storage (after 30 days, in case of accidental deletion)
  await scheduleJob("deletePhotoFromStorage", { photoUrl: photo.url }, 30 * 24 * 60 * 60 * 1000);

  // Audit log
  await logAudit({
    userId,
    action: "photo_deleted",
    photoId,
    photoUrl: photo.url
  });
};
```

### 4.3 System-Initiated Deletion (Automated)

**Triggers:**
- Inactive accounts (32.5 months)
- Temporary data expiration (verification photos, 90 days)
- Retention policy expiration (logs, 3 years)

**Process:**
- Automated job runs daily
- Identifies data eligible for deletion
- Executes deletion (hard delete, no recovery)
- Logs action

**Example Job:**
```javascript
const cleanupExpiredVerificationPhotos = async () => {
  const cutoffDate = new Date();
  cutoffDate.setDate(cutoffDate.getDate() - 90); // 90 days ago

  const expiredPhotos = await db.verificationPhotos.findMany({
    where: {
      verificationStatus: "approved",
      verifiedAt: { lt: cutoffDate },
      deletedAt: null
    }
  });

  for (const photo of expiredPhotos) {
    // Delete from storage
    await s3.deleteObject({ Bucket: "verification-photos", Key: photo.s3Key });

    // Mark as deleted in DB (retain metadata)
    await db.verificationPhotos.update({
      where: { id: photo.id },
      data: {
        s3Key: null,
        photoUrl: null,
        deletedAt: new Date(),
        deletionReason: "retention_policy_90_days"
      }
    });

    // Audit log
    await logAudit({
      userId: photo.userId,
      action: "verification_photo_auto_deleted",
      reason: "90_day_retention_policy"
    });
  }

  console.log(`Deleted ${expiredPhotos.length} expired verification photos`);
};
```

---

## 5. Data Anonymization

### 5.1 Anonymization vs. Pseudonymization

**Pseudonymization (GDPR Art. 4(5)):**
- Replace identifiable data with pseudonyms
- Reversible with key (still considered personal data)
- Used for analytics, testing

**Anonymization:**
- Irreversibly remove identifiable data
- No longer personal data (GDPR does not apply)
- Used for aggregate statistics, long-term research

### 5.2 When to Anonymize

**Scenarios:**
1. User deletes account → Anonymize messages (for other users' view)
2. User deletes account → Anonymize moderation records (retain evidence, remove identity)
3. Analytics → Pseudonymize user IDs
4. External data sharing (research) → Fully anonymize

### 5.3 Anonymization Procedures

#### 5.3.1 Message Anonymization (Account Deletion)

**Goal:** Other users keep their conversation history, but sender's identity is removed

**Process:**
```javascript
const anonymizeUserMessages = async (userId) => {
  // Update messages sent by deleted user
  await db.messages.updateMany({
    where: { senderId: userId },
    data: {
      senderDisplayName: "Deleted User",
      senderPhoto: null,
      senderAnonymized: true
    }
  });

  // DO NOT delete message content (recipient owns their copy)

  // Audit log
  await logAudit({
    userId,
    action: "messages_anonymized",
    messageCount: /* count */
  });
};
```

**User Experience (Recipient View):**
```
Conversation with Deleted User

[Deleted User]: Hi, I saw you enjoy hiking...
You: Thanks! Yes, I love Yankari...
[Deleted User]: Me too! Have you been recently?
```

#### 5.3.2 Analytics Data Pseudonymization

**Goal:** Enable analytics without exposing user identities

**Process:**
```javascript
const pseudonymizeForAnalytics = (userId) => {
  // Generate stable pseudonym (deterministic hash)
  const pseudonym = crypto.createHash('sha256')
    .update(userId + SALT)
    .digest('hex');

  return pseudonym; // e.g., "a3b5c7d9..."
};

// Send to analytics platform
mixpanel.track("profile_view", {
  distinct_id: pseudonymizeForAnalytics(userId),
  subscription: user.subscription,
  completedTier: user.completedTier,
  // No name, email, or directly identifiable data
});
```

**Key Properties:**
- Same user → Same pseudonym (consistent tracking)
- Pseudonym → Cannot reverse to user ID (without key)
- GDPR still applies (pseudonymization is not anonymization)

#### 5.3.3 Full Anonymization (Research Data Export)

**Goal:** Share data with researchers, fully anonymized

**Process:**
```javascript
const anonymizeForResearch = async () => {
  const anonymizedData = await db.users.findMany({
    where: { consentedToResearch: true },
    select: {
      // NO identifiers
      ageGroup: true, // e.g., "25-30" instead of exact age
      gender: true,
      city: false, // Too specific, use region
      region: true, // e.g., "South West Nigeria"
      completedTiers: true,
      subscription: true,
      accountAge: true,
      messageCount: true,
      // Aggregated, no personal content
    }
  });

  // Further processing
  const fullyAnonymized = anonymizedData.map(user => ({
    ageGroup: user.ageGroup,
    gender: user.gender,
    region: user.region,
    completedTiers: user.completedTiers,
    subscription: user.subscription,
    accountAge: Math.floor(user.accountAge / (30 * 24 * 60 * 60 * 1000)), // Account age in months
    messageCount: Math.floor(user.messageCount / 10) * 10 // Round to nearest 10
  }));

  return fullyAnonymized;
};
```

**k-Anonymity Test:**
- Ensure each record is indistinguishable from at least k-1 other records
- k=5 minimum for research data

#### 5.3.4 Moderation Record Anonymization

**Goal:** Retain evidence for legal purposes, remove identifiable data after 7 years

**Process:**
```javascript
const anonymizeModerationRecords = async () => {
  const cutoffDate = new Date();
  cutoffDate.setFullYear(cutoffDate.getFullYear() - 7); // 7 years ago

  const oldRecords = await db.safetyReports.findMany({
    where: { createdAt: { lt: cutoffDate } }
  });

  for (const record of oldRecords) {
    await db.safetyReports.update({
      where: { id: record.id },
      data: {
        reporterUserId: null,
        reportedUserId: null,
        reporterName: null,
        reportedUserName: null,
        // Keep category, resolution for statistics
        anonymized: true
      }
    });
  }

  console.log(`Anonymized ${oldRecords.length} moderation records`);
};
```

---

## 6. Data Portability (GDPR Art. 20)

### 6.1 Data Export Format

**JSON Export (Machine-Readable):**
```json
{
  "exportDate": "2026-02-26T14:30:00Z",
  "userId": 12345,
  "profile": {
    "tier1": {
      "legalName": "John Doe",
      "displayName": "John D.",
      "dateOfBirth": "1995-05-15",
      "gender": "male",
      "city": "Lagos",
      "state": "Lagos",
      "nationality": "Nigerian",
      "faith": "Christian",
      "relationshipIntent": "marriage"
    },
    "tier2": { /* ... */ },
    "tier3": { /* ... */ },
    "tier4": { /* ... */ },
    "tier5": {
      "verificationStatus": "approved",
      "verifiedAt": "2026-01-15T10:00:00Z",
      "verifiedIdentityBadge": true
      // NO ID photos/documents (deleted after 90 days)
    }
  },
  "photos": [
    {
      "id": 1,
      "url": "https://photos.joymatcher.com/users/12345/photo1.jpg",
      "uploadedAt": "2026-01-10T12:00:00Z",
      "primary": true
    }
  ],
  "messages": [
    {
      "conversationId": 101,
      "otherUser": "Jane S.",
      "messages": [
        { "timestamp": "...", "from": "me", "content": "..." },
        { "timestamp": "...", "from": "them", "content": "..." }
      ]
    }
  ],
  "showInterestHistory": [
    {
      "sentTo": "User #67890",
      "sentAt": "2026-02-01T10:00:00Z",
      "status": "accepted"
    }
  ],
  "subscriptionHistory": [
    {
      "plan": "premium",
      "startDate": "2026-01-01",
      "endDate": "2026-04-01",
      "amount": "₦45,000"
    }
  ],
  "consentRecords": [
    {
      "consentType": "tier_4_completion",
      "consentDate": "2026-02-15T14:00:00Z",
      "consentText": "I consent to sharing health information..."
    }
  ]
}
```

**CSV Export (Non-Technical Users):**
- Separate CSV files for each category (profile, messages, etc.)
- Flattened structure

### 6.2 Export Request Process

**User Experience:**
```
Settings → Privacy → Download My Data

┌─────────────────────────────────────────┐
│      Download Your Data                 │
├─────────────────────────────────────────┤
│                                         │
│ Request a copy of your data in machine-│
│ readable format (JSON) or CSV.         │
│                                         │
│ What's included:                       │
│ • Profile information (Tiers 1-5)      │
│ • Photos                               │
│ • Messages                             │
│ • Show Interest history                │
│ • Subscription history                 │
│ • Consent records                      │
│                                         │
│ Format:                                │
│ ○ JSON (machine-readable)              │
│ ○ CSV (spreadsheet-friendly)           │
│                                         │
│ Delivery:                              │
│ We'll email you a download link within │
│ 7 days.                                │
│                                         │
│ [Request Data Export]                   │
└─────────────────────────────────────────┘
```

**Backend Process:**
```javascript
const generateDataExport = async (userId, format) => {
  // Queue job (long-running)
  await queue.add("dataExport", { userId, format });

  // Job executes:
  // 1. Collect all user data
  const userData = await collectUserData(userId);

  // 2. Format (JSON or CSV)
  const exportFile = format === "json"
    ? JSON.stringify(userData, null, 2)
    : convertToCSV(userData);

  // 3. Upload to secure temporary storage
  const fileUrl = await uploadToSecureStorage(exportFile, userId);

  // 4. Send email with download link (expires in 7 days)
  await sendEmail(user.email, "dataExportReady", {
    downloadUrl: fileUrl,
    expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
  });

  // 5. Auto-delete file after 7 days
  await scheduleJob("deleteExportFile", { fileUrl }, 7 * 24 * 60 * 60 * 1000);
};
```

**SLA:** 7 days (faster than GDPR's 30 days)

---

## 7. Data Access Controls

### 7.1 Role-Based Access Control (RBAC)

**Roles:**

| Role | Access Level | Can Access |
|------|--------------|------------|
| **User** | Own data only | Own profile, messages, photos |
| **Customer Support (L1)** | Limited | User profile (Tier 1-2), messages (if reported), subscription status |
| **Customer Support (L2)** | Moderate | + Tier 3-4 (if user consents for support), moderation history |
| **Trust & Safety** | High | All user data (for safety investigations), reports, violations |
| **Verification Team** | High | Tier 5 verification data (ID photos, liveness videos) |
| **DPO** | Full | All data (for compliance, data subject requests) |
| **Engineering (Production)** | None | No direct database access (logs only, pseudonymized) |
| **Engineering (Staging/Dev)** | Anonymized test data | Synthetic or fully anonymized data |

### 7.2 Access Logging

**All Staff Access Logged:**
```javascript
const logStaffAccess = {
  accessId: "ACC-20260226-A1B2",
  timestamp: "2026-02-26T14:30:00Z",
  staffUserId: 999,
  staffRole: "trust_and_safety",
  targetUserId: 12345,
  dataAccessed: ["tier3", "tier4", "messages"],
  reason: "Safety investigation - Report #SAFE-20260226-X",
  ipAddress: "102.88.34.12",
  approved: true, // Requires manager approval for sensitive data
  approvedBy: 1000
};
```

**Audit Review:**
- Random sampling: 10% of accesses reviewed monthly
- Anomaly detection: Unusual access patterns (bulk access, off-hours)
- Annual full audit

### 7.3 Data Minimization

**Principle:** Only collect and access data necessary for specific purpose

**Implementation:**
- Customer support cannot access Tier 4 health data unless user explicitly consents (for support case)
- Verification team cannot access messages or relationship data
- Analytics team receives only pseudonymized/aggregated data

---

## 8. Backup & Disaster Recovery

### 8.1 Backup Strategy

**Database Backups (PostgreSQL):**
- **Frequency:** Continuous (Write-Ahead Log streaming)
- **Full backups:** Daily (automated, encrypted)
- **Retention:**
  - Daily backups: 30 days
  - Weekly backups: 12 weeks (3 months)
  - Monthly backups: 12 months
  - Yearly backups: 7 years (compliance)

**File Storage Backups (Photos, Documents):**
- **Frequency:** Continuous (S3 versioning enabled)
- **Retention:** Same as database
- **Replication:** Multi-region (Lagos + Frankfurt for EU users)

**Logs & Analytics:**
- **Frequency:** Daily
- **Retention:** 3 years

### 8.2 Backup Encryption

**At Rest:**
- AES-256 encryption (AWS S3 / Google Cloud Storage default)
- Encryption keys managed by cloud provider KMS

**In Transit:**
- TLS 1.3 for all backup transfers

### 8.3 Disaster Recovery

**Recovery Time Objective (RTO):** 4 hours (maximum downtime)

**Recovery Point Objective (RPO):** 1 hour (maximum data loss)

**Process:**
1. Incident detected (monitoring alert)
2. Assess impact (data corruption, outage, security breach)
3. Activate disaster recovery plan
4. Restore from backup (most recent clean backup)
5. Validate data integrity
6. Bring systems online
7. Communicate with users (status page, email)
8. Post-mortem analysis

### 8.4 Backup Deletion (User Account Deletion)

**Challenge:** User deletes account, but data exists in backups

**GDPR Position:**
- Backups are exempt from immediate deletion (Art. 17(3)(b) - technical impossibility)
- Backups expire naturally per retention policy (30 days, 3 months, etc.)
- Users informed of backup retention in privacy policy

**User Notification:**
```
Important: Your data may remain in backups for up to 90 days, after which it will be automatically deleted as backups expire.
```

---

## 9. Data Breach Response (Data-Specific)

### 9.1 Breach Assessment

**Questions:**
1. What data was accessed/exposed?
2. How many users affected?
3. Sensitivity level (Tier 1-5)?
4. Was data encrypted?
5. External exposure or internal only?

**Risk Levels:**
- **Low:** Anonymized data, encrypted data (no decryption key exposed)
- **Medium:** Tier 1-2 data, limited user count (<100)
- **High:** Tier 3-4 data, large user count (>100)
- **Critical:** Tier 5 biometric data, financial data, or any breach with external exposure

### 9.2 Breach Notification (Data-Specific)

**Example (Tier 4 Health Data Breach):**
```
Subject: Important Security Notice - JoyMatcher

Dear [User],

We are writing to inform you of a security incident that affected your account.

What Happened:
On February 26, 2026, unauthorized access to our database occurred due to a software vulnerability. We immediately secured the system and launched an investigation.

What Information Was Accessed:
• Your Tier 4 health information (genotype, blood group)
• Email address and name (NO financial data)

What We're Doing:
• We have secured the vulnerability
• We have notified NITDA and ICO (data protection authorities)
• We are offering free identity monitoring for 1 year
• We have implemented additional security measures

What You Should Do:
• Be cautious of phishing emails (we will never ask for passwords)
• Consider changing your password (Settings → Security)
• Monitor your account for unusual activity
• Contact us with concerns: security@joymatcher.com

Your Rights:
• You have the right to lodge a complaint with NITDA (Nigeria) or ICO (UK)
• You can request a full data export to see what data we hold

We sincerely apologize for this incident. Your trust is paramount, and we are committed to protecting your information.

Sincerely,
[CEO Name]
JoyMatcher
```

---

## 10. Cross-Border Data Considerations

### 10.1 Data Residency

**Current Setup:**
- Nigerian users: Data stored in AWS Africa (Cape Town) or Lagos (when available)
- EU users: Data stored in AWS EU (Frankfurt)
- US users: Data stored in AWS US East (Virginia)

**Rationale:**
- Minimize latency
- Comply with potential localization requirements
- Facilitate local law enforcement cooperation

### 10.2 Data Transfer Mechanisms

**Nigeria → EU/US:**
- Standard Contractual Clauses (SCCs) with AWS, Google
- Encryption in transit (TLS 1.3)
- User consent (informed of transfers in Privacy Policy)

**EU → Nigeria:**
- Adequate safeguards (SCCs, encryption)
- GDPR Art. 49 derogations (performance of contract, explicit consent)

---

## 11. Implementation Checklist

### Phase 1: Launch
- [ ] Database retention policies configured (automated cleanup jobs)
- [ ] User deletion flow (soft delete → hard delete)
- [ ] Data export functionality (JSON format)
- [ ] Backup strategy implemented (daily backups, 30-day retention)
- [ ] Access controls (RBAC) enforced
- [ ] Audit logging (staff access, user actions)
- [ ] Privacy Policy (retention policies disclosed)

### Phase 2: Post-Launch (1-3 months)
- [ ] CSV export format (non-technical users)
- [ ] Anonymization procedures (messages, moderation records)
- [ ] Verification photo auto-deletion (90-day job)
- [ ] Inactive account cleanup (32.5-month job)
- [ ] Data portability testing (GDPR compliance)
- [ ] Backup restoration testing (disaster recovery drill)

### Phase 3: Advanced (3-6 months)
- [ ] Advanced anonymization (k-anonymity for research)
- [ ] Cross-region replication (disaster recovery)
- [ ] Automated backup verification (integrity checks)
- [ ] User data dashboard (view own data access logs)

---

## 12. Code Examples

### 12.1 Deletion Job (Cron)

```javascript
// Run daily at 2 AM
cron.schedule("0 2 * * *", async () => {
  console.log("Running data cleanup jobs...");

  // 1. Permanent account deletion (30 days after soft delete)
  await permanentDeleteExpiredAccounts();

  // 2. Verification photo cleanup (90 days after verification)
  await cleanupExpiredVerificationPhotos();

  // 3. Soft-deleted message cleanup (30 days)
  await permanentDeleteExpiredMessages();

  // 4. Expired data export files (7 days)
  await deleteExpiredExportFiles();

  // 5. Old audit logs (3 years)
  await archiveOldAuditLogs();

  console.log("Data cleanup complete.");
});
```

### 12.2 Data Export Function

```javascript
const generateUserDataExport = async (userId) => {
  const user = await db.users.findUnique({
    where: { id: userId },
    include: {
      tier1: true,
      tier2: true,
      tier3: true,
      tier4: true,
      tier5: true,
      photos: true,
      sentMessages: true,
      receivedMessages: true,
      showInterestSent: true,
      showInterestReceived: true,
      subscriptions: true,
      consents: true
    }
  });

  const exportData = {
    exportDate: new Date().toISOString(),
    userId: user.id,
    profile: {
      tier1: user.tier1,
      tier2: user.tier2,
      tier3: user.tier3,
      tier4: user.tier4,
      tier5: {
        verificationStatus: user.tier5?.verificationStatus,
        verifiedAt: user.tier5?.verifiedAt,
        // NO ID photos (deleted after 90 days)
      }
    },
    photos: user.photos.map(p => ({
      id: p.id,
      url: p.url,
      uploadedAt: p.createdAt,
      primary: p.primary
    })),
    messages: formatMessages(user.sentMessages, user.receivedMessages),
    showInterestHistory: formatShowInterest(user.showInterestSent, user.showInterestReceived),
    subscriptionHistory: user.subscriptions,
    consentRecords: user.consents
  };

  return exportData;
};
```

### 12.3 Anonymization Function

```javascript
const anonymizeUserData = async (userId) => {
  // Messages: Replace sender identity
  await db.messages.updateMany({
    where: { senderId: userId },
    data: {
      senderDisplayName: "Deleted User",
      senderPhoto: null,
      senderAnonymized: true
    }
  });

  // Show Interest: Anonymize sender
  await db.showInterest.updateMany({
    where: { senderId: userId },
    data: { senderAnonymized: true }
  });

  // Profile Views: Remove viewer identity
  await db.profileViews.updateMany({
    where: { viewerId: userId },
    data: { viewerAnonymized: true }
  });

  // Audit logs: Retain for compliance, but flag as anonymized
  await db.auditLogs.updateMany({
    where: { userId },
    data: { userAnonymized: true }
  });

  console.log(`User ${userId} data anonymized`);
};
```

---

## 13. User Communication Examples

### 13.1 Inactive Account Warning

```
Subject: Your JoyMatcher Account - Action Required

Hi [User],

We noticed you haven't logged into JoyMatcher in over 30 months.

To keep your account active, please log in within the next 60 days.

If you don't log in:
• Your account will be deactivated on April 28, 2026
• Your data will be permanently deleted 30 days later

Want to keep your account? Simply log in: [Login Link]

Questions? Contact support@joymatcher.com

- JoyMatcher Team
```

### 13.2 Data Export Ready

```
Subject: Your JoyMatcher Data Export is Ready

Hi [User],

Your data export is ready for download.

Download your data: [Secure Link]

This link expires in 7 days (March 5, 2026).

What's included:
• Profile information (Tiers 1-5)
• Photos
• Messages
• Subscription history
• Consent records

Need help? Contact support@joymatcher.com

- JoyMatcher Team
```

---

**Document Control**
Owner: Legal & Engineering Team
Review Cycle: Quarterly
Next Review: 2026-05-26
Classification: Internal

**Related Documentation:**
- `legal_compliance.md` - GDPR, NDPR compliance
- `safety_system.md` - Content moderation and safety
- `accessibility.md` - User access considerations
