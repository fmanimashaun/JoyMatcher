# Right to Deletion (GDPR Article 17 / NDPR Section 26)

**Version:** 1.0.0
**Effective Date:** 2026-02-26
**Last Updated:** 2026-02-26
**Compliance:** GDPR Article 17, NDPR Section 26, CCPA

---

## Introduction

Under GDPR (European Union), NDPR (Nigeria), and CCPA (California), you have the **right to request deletion** of your personal data (also known as the "Right to Be Forgotten").

This document explains:
- How to request deletion
- What gets deleted
- What gets anonymized (and why)
- Exceptions where we may retain data
- Technical implementation of deletion
- Timeline and confirmation

---

## 1. Your Right to Deletion

### 1.1 Legal Basis

**GDPR Article 17 (EU):**
> The data subject shall have the right to obtain from the controller the erasure of personal data concerning him or her without undue delay.

**NDPR Section 26 (Nigeria):**
> A data subject is entitled to request for and obtain from the data controller, at any time and free of charge: (a) rectification and updating of his personal data; (b) blocking of his personal data from further processing; (c) deletion of his personal data.

**CCPA (California):**
> Consumers have the right to request that a business delete any personal information about the consumer which the business has collected.

---

### 1.2 When You Can Request Deletion

You may request deletion at any time, for any reason, including:
- You no longer want to use JoyMatcher
- You found a relationship elsewhere
- You're uncomfortable with data retention
- You want to exercise your privacy rights

**No explanation is required.**

---

### 1.3 Exceptions (When We May Refuse Deletion)

We may refuse or delay deletion if:
1. **Legal obligation:** Required to retain data by law (e.g., tax records, court orders)
2. **Legal claims:** Data is needed to defend or pursue legal claims
3. **Public interest:** Data is necessary for public health, scientific research, or archival purposes (rare)
4. **Contractual necessity:** Data is required to fulfill an ongoing contract (e.g., active subscription)

**If we refuse deletion, we will explain why and provide evidence of the legal basis.**

---

## 2. How to Request Deletion

### 2.1 Self-Service Deletion (Recommended)

**For most users, self-service is fastest:**

1. Log in to your JoyMatcher account
2. Navigate to [Account Settings](app/account)
3. Click [Delete Account](app/account/delete-account)
4. Review warning message (deletion is irreversible)
5. Confirm deletion (may require password re-entry)
6. You will receive a confirmation email

**Timeline:** Deletion begins immediately; personal data removed within 30 days.

---

### 2.2 Email Request (If You Cannot Log In)

If you cannot access your account (forgotten password, locked account):

**Email:** dpo@joymatcher.com (Data Protection Officer)

**Subject:** Right to Deletion Request

**Include:**
- Your full name
- Email address associated with account
- Reason for deletion (optional)
- Proof of identity (to prevent fraudulent deletion requests):
  - Government-issued ID (passport, driver's license, national ID)
  - Selfie holding your ID next to your face
  - Or answer to security questions (e.g., "What was your last subscription payment amount?")

**Timeline:** We will respond within **7 business days** with confirmation or request for additional verification.

---

### 2.3 Third-Party Request (On Behalf of Someone Else)

You may request deletion on behalf of:
- A minor (if you are the parent/guardian)
- A deceased person (if you are the executor of their estate)
- Someone incapacitated (if you have legal power of attorney)

**Required Documentation:**
- Proof of your identity (government-issued ID)
- Proof of relationship (birth certificate, death certificate, power of attorney, court order)
- Proof of the data subject's identity

**Email:** dpo@joymatcher.com

**Timeline:** 14 business days (requires legal verification)

---

## 3. What Gets Deleted

### 3.1 Personal Identifiable Information (PII)

**Immediately upon deletion:**
- ✅ Full name (first and last)
- ✅ Email address
- ✅ Phone number
- ✅ Date of birth
- ✅ Profile photos
- ✅ VIP Tier 5 documents (government ID, video verification)

**Deletion method:** Hard delete (overwritten with random data)

---

### 3.2 Profile Data (All Tiers)

**Deleted within 30 days:**
- ✅ Tier 1 data (location, occupation, relationship intent, religious identity)
- ✅ Tier 2 data (lifestyle, background, income range)
- ✅ Tier 3 data (marriage history, family structure, desire for children)
- ✅ Tier 4 data (health status, genotype, compatibility preferences)
- ✅ Tier 5 data (verified identity, KYC documents)

**Deletion method:** Hard delete from production database; soft delete (flagged as deleted) in backups for 90 days, then overwritten

---

### 3.3 Messages & Interactions

**Deleted within 30 days:**
- ✅ Message content sent by you
- ✅ Message content received by you (from your inbox)
- ✅ Show Interest requests sent/received
- ✅ Request-for-Information history
- ✅ Tier access granted/revoked
- ✅ Block and report submissions (your identity removed, but report content may remain for safety patterns)

**Note:** Messages you sent will be removed from other users' inboxes. They will see:
> "This message has been deleted because the sender's account was removed."

---

### 3.4 Subscription & Billing Data

**Retained (see Section 4.2 for why):**
- ⚠️ Subscription history (anonymized: "User [ID-XXXX] purchased Premium on 2026-01-15")
- ⚠️ Payment records (anonymized: "Transaction [ID-YYYY] for ₦18,000 on 2026-01-15")
- ⚠️ Refund requests (anonymized)

**Why retained:** Tax compliance, fraud detection, financial audits (legally required to retain for 7 years)

**Anonymization:** Your name, email, and personal details are removed; only anonymized transaction IDs remain.

---

### 3.5 Support Tickets & Reports

**Deleted within 30 days:**
- ✅ Support ticket content (your inquiries)
- ✅ Your personal details in tickets

**Retained (anonymized):**
- ⚠️ Report submissions you filed against other users (for safety pattern detection)
  - Your identity is removed
  - Report content remains (e.g., "Anonymous user reported harassment from User X on 2026-02-15")

**Why retained:** Safety analytics, identifying repeat offenders, legal investigations

---

### 3.6 Photos & Media

**Deleted immediately:**
- ✅ All profile photos (removed from CDN and backups)
- ✅ VIP video verification recordings
- ✅ Photos shared in messages

**Deletion method:** Hard delete from storage; CDN cache purged within 24 hours

---

### 3.7 VIP Expert Notes (If Applicable)

**Deleted within 90 days:**
- ✅ Concierge notes created by your assigned VIP expert
- ✅ Introduction proposals
- ✅ Consultation session notes

**Why 90 days:** Allows VIP expert to complete final billing and handover; notes deleted after grace period

---

## 4. What Gets Anonymized (Not Deleted)

### 4.1 Anonymization Definition

**Anonymization** means removing all personally identifiable information (PII) while retaining statistical or operational data.

**Example:**
- **Before:** "Chioma Okafor (chioma@email.com) completed Tier 3 on 2026-02-20"
- **After:** "User [ID-12345] completed Tier 3 on 2026-02-20"

**Anonymized data cannot be traced back to you.**

---

### 4.2 Data Retained (Anonymized) & Why

#### Subscription Records (7 Years)
**Data:**
- Transaction IDs
- Subscription tier purchased
- Purchase date
- Payment method type (e.g., "credit card" not card number)

**Why retained:**
- Tax compliance (required by Nigerian tax law and international financial regulations)
- Fraud detection (identify patterns of fraudulent subscriptions)
- Financial audits (investor/regulatory oversight)

**Legal basis:** Legal obligation (tax law), legitimate interest (fraud prevention)

---

#### Platform Analytics (7 Years)
**Data:**
- "User [ID-XXXX] viewed 15 profiles on 2026-02-25"
- "User [ID-YYYY] completed Tier 2 on 2026-02-15"
- "User [ID-ZZZZ] upgraded to Premium on 2026-01-10"

**Why retained:**
- Product improvement (understand user behavior)
- Business analytics (conversion rates, tier completion rates)
- Security analytics (detect bot activity, spam patterns)

**Legal basis:** Legitimate interest (business operations)

---

#### Safety & Moderation Logs (7 Years)
**Data:**
- "Anonymous user reported harassment from User [ID-AAAA] on 2026-02-20"
- "User [ID-BBBB] was suspended for policy violation on 2026-01-15"
- "Photo approval queue: User [ID-CCCC] uploaded photo on 2026-02-18, approved by Moderator [ID-DDDD]"

**Why retained:**
- Identify repeat offenders (if User [ID-AAAA] is reported again, moderators see prior history)
- Legal defense (evidence for disputes, lawsuits, law enforcement requests)
- Pattern detection (identify systemic harassment or fraud rings)

**Legal basis:** Legal obligation (law enforcement cooperation), legitimate interest (platform safety)

---

#### Audit Logs (7 Years)
**Data:**
- "Admin [ID-EEEE] suspended User [ID-FFFF] on 2026-02-25 at 14:30 UTC"
- "User [ID-GGGG] revoked Tier 3 access from User [ID-HHHH] on 2026-02-15"

**Why retained:**
- Accountability (track admin actions for oversight)
- Compliance audits (demonstrate GDPR/NDPR compliance)
- Dispute resolution (evidence for appeals, legal claims)

**Legal basis:** Legal obligation (regulatory audits), legitimate interest (accountability)

---

#### Match Success Data (Indefinite, Anonymized)
**Data:**
- "Two users (IDs [ID-IIII] and [ID-JJJJ]) matched on 2026-02-10, both reported relationship success on 2026-05-15"

**Why retained:**
- Success rate analytics (measure platform effectiveness)
- Matchmaking algorithm improvement (what factors predict success?)

**Legal basis:** Legitimate interest (business operations, product improvement)

**Note:** This data is fully anonymized and cannot identify you.

---

## 5. Technical Implementation of Deletion

### 5.1 Deletion Workflow

**Phase 1: Immediate Soft Delete (Day 0)**
- Your account is flagged as "deleted"
- Your profile is hidden from discovery immediately
- You cannot log in
- Show Interest requests are canceled
- Active conversations are frozen
- Subscription is canceled

**Phase 2: Grace Period (Days 1-30)**
- Data remains in database but is inaccessible
- Allows account recovery if you change your mind (contact dpo@joymatcher.com within 30 days)
- Scheduled backups still contain your data (encrypted)

**Phase 3: Hard Delete (Day 30)**
- Personal data is permanently deleted from production database
- Photos removed from CDN
- Messages removed from other users' inboxes
- Tier data deleted

**Phase 4: Backup Purge (Days 31-90)**
- Scheduled backups are rotated out
- Old backups containing your data are overwritten
- Anonymization applied to retained data

**Phase 5: Anonymization Complete (Day 90)**
- All personal data deleted or anonymized
- Only statistical, anonymized data remains
- Deletion is irreversible

---

### 5.2 Database Schema for Anonymization

**Before Deletion:**
```sql
-- Users Table
{
  id: "user_12345",
  firstName: "Chioma",
  lastName: "Okafor",
  email: "chioma@email.com",
  phone: "+234-800-1234567",
  dateOfBirth: "1992-05-15",
  deletedAt: null
}
```

**After Anonymization (Day 90):**
```sql
-- Users Table
{
  id: "user_12345", // ID retained for referential integrity
  firstName: "[DELETED]",
  lastName: "[DELETED]",
  email: "deleted_user_12345@anonymized.local", // Placeholder
  phone: null,
  dateOfBirth: null, // Overwritten
  deletedAt: "2026-02-26T10:00:00Z"
}
```

**Anonymized Transaction Record:**
```sql
-- Transactions Table
{
  transactionId: "txn_67890",
  userId: "user_12345", // Anonymous ID, cannot be linked to real person
  amount: 18000,
  currency: "NGN",
  subscriptionTier: "premium",
  createdAt: "2026-01-15T12:00:00Z"
}
```

**Anonymized Analytics Record:**
```sql
-- Analytics Events Table
{
  eventId: "evt_11111",
  userId: "user_12345", // Anonymous ID
  eventType: "tier_completed",
  eventData: { tier: 3 },
  timestamp: "2026-02-20T08:30:00Z"
}
```

---

### 5.3 Symmetric Deletion (Tier Access)

**When you delete your account:**
- Users who had access to your tiers lose that access immediately
- Users who you had access to retain their data (your deletion doesn't affect them)

**Example:**
- You granted User A access to your Tier 3 → User A can no longer see your data (deleted)
- User A granted you access to their Tier 3 → User A's data remains (they must delete their own account)

---

## 6. Confirmation & Verification

### 6.1 Deletion Confirmation Email

After requesting deletion, you will receive:

**Subject:** Your JoyMatcher Account Deletion Request

**Content:**
```
Hello [Your Name],

We have received your request to delete your JoyMatcher account.

What happens next:
- Your profile is now hidden from discovery
- You cannot log in
- Your data will be permanently deleted within 30 days
- Anonymization will be complete within 90 days

If this was a mistake, you have 30 days to contact us at dpo@joymatcher.com to recover your account.

After 30 days, deletion is irreversible.

Timeline:
- Day 0 (Today): Profile hidden, account deactivated
- Day 30: Personal data deleted
- Day 90: Anonymization complete

Thank you for being part of JoyMatcher.

— JoyMatcher Team
```

---

### 6.2 Deletion Completion Email (Day 30)

**Subject:** Your JoyMatcher Data Has Been Deleted

**Content:**
```
Hello,

Your personal data has been permanently deleted from JoyMatcher as of [Date].

What was deleted:
✅ Name, email, phone number
✅ Profile photos
✅ Tier data (1-5)
✅ Messages and conversation history
✅ Show Interest history

What was anonymized (retained for legal compliance):
⚠️ Subscription records (anonymized transaction IDs)
⚠️ Platform analytics (anonymized usage data)

Anonymization will be complete within 90 days.

If you have questions, contact: dpo@joymatcher.com

— JoyMatcher Team
```

---

## 7. Frequently Asked Questions (FAQ)

### 7.1 Can I recover my account after deletion?

**Yes, if within 30 days.**
- Email dpo@joymatcher.com within 30 days of deletion request
- We will reactivate your account if verification succeeds
- After 30 days, deletion is irreversible

---

### 7.2 Will other users be notified that I deleted my account?

**No.**
- Other users will not receive a notification
- Your profile will simply disappear from their matches
- Messages you sent will show: "This message has been deleted because the sender's account was removed."

---

### 7.3 Can I delete my account but keep my subscription active?

**No.**
- Deletion cancels your subscription immediately
- You will not receive a refund for partial months (per [Terms of Service](terms_of_service.md))

---

### 7.4 What happens to my VIP expert if I'm a VIP member?

- Your assigned VIP expert will be notified of your account closure
- They will lose access to your data within 90 days
- Any consultation notes will be deleted within 90 days

---

### 7.5 Can I delete specific data without deleting my account?

**Yes, for some data:**
- **Photos:** Delete from [Edit Profile](app/profile/me/edit)
- **Messages:** Cannot delete individual messages (delete conversation)
- **Tier data:** Cannot delete individual tier fields (tiers are atomic)
- **Subscription history:** Cannot delete (required for financial compliance)

**To delete all data:** You must delete your entire account.

---

### 7.6 Will my testimonial be removed if I delete my account?

**Yes, if your testimonial is published:**
- We will remove your name, photo, and identifying details
- The story may remain as "Anonymous Success Story" (if you consent to anonymous usage)
- If you do not consent to anonymous usage, the entire testimonial will be removed

**Contact:** testimonials@joymatcher.com

---

### 7.7 What if I'm under investigation for a policy violation?

**Deletion may be delayed:**
- If your account is under investigation for harassment, fraud, or serious violations
- We may retain data for up to 6 months while investigation is ongoing
- You will be notified if retention is required

**Legal basis:** Legal obligation (law enforcement cooperation), legitimate interest (platform safety)

---

### 7.8 Can I delete someone else's account?

**No, unless:**
- You are a parent/guardian of a minor (must provide proof)
- You are executor of a deceased person's estate (must provide death certificate)
- You have legal power of attorney (must provide court order)

**To report another user's account for violations:** Use [Safety Center](app/safety/report)

---

## 8. Related Rights

### 8.1 Right to Data Portability (Before Deletion)

Before deleting, you may want to **export your data:**
- Navigate to [Account Settings > Data Export](app/account/data-export)
- Download a copy of your data in JSON, CSV, or PDF format
- Includes: Profile data, messages, interaction history

---

### 8.2 Right to Restrict Processing (Alternative to Deletion)

If you don't want to delete but want to limit data usage:
- Navigate to [Account Settings > Privacy](app/account/privacy)
- Options:
  - Pause account (hide profile, stop matching)
  - Disable analytics tracking
  - Opt out of marketing emails

---

## 9. Contact & Support

For deletion requests, questions, or concerns:

**Data Protection Officer**
- Email: dpo@joymatcher.com
- Response time: 7 business days

**General Privacy Inquiries**
- Email: privacy@joymatcher.com

**Urgent Safety Issues**
- Email: safety@joymatcher.com

---

## 10. Complaints & Regulatory Authority

If you believe we violated your right to deletion:

**Nigeria:**
- National Information Technology Development Agency (NITDA)
- Website: nitda.gov.ng
- Email: info@nitda.gov.ng

**EU:**
- Your national Data Protection Authority (DPA)
- Find your DPA: ec.europa.eu/justice/data-protection

**California:**
- California Attorney General's Office
- Website: oag.ca.gov

---

## Related Documentation

- [Privacy Policy](privacy_policy.md) - Full data protection policy
- [Terms of Service](terms_of_service.md) - Legal agreement
- [Data Management Policy](data_management.md) - Technical data handling
- [Community Guidelines](community_guidelines.md) - Behavioral standards

---

**Last Updated:** 2026-02-26
**Effective Date:** 2026-02-26
**Version:** 1.0.0

---

**Document Owner:** Data Protection Officer
**Legal Review:** Legal Counsel
**Technical Review:** Engineering Lead
**Last Reviewed:** 2026-02-26
**Next Review:** 2026-08-26 (Semi-Annual)
