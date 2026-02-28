# Legal Compliance Framework

**Version:** 1.0.0
**Last Updated:** 2026-02-26
**Status:** Complete Specification
**Applies To:** All JoyMatcher operations and data processing

---

## 1. Executive Summary

JoyMatcher's legal compliance framework ensures adherence to global and Nigerian data protection regulations, including GDPR (General Data Protection Regulation), NDPR (Nigeria Data Protection Regulation), and other relevant laws governing digital matchmaking services. This document provides comprehensive implementation guidelines, compliance checklists, and procedures for maintaining legal conformity while operating a trust-based, marriage-oriented matchmaking platform.

Given JoyMatcher's unique characteristics—deep personal disclosure including health data, verified identity documentation, cross-border operations (Nigeria + Diaspora), and investment-based trust model—legal compliance must address:
- Sensitive personal data processing (health, biometric, identity documents)
- Cross-border data transfers
- User consent management (tier-based, revocable)
- Age verification and protection
- Data retention and deletion
- Law enforcement cooperation
- Liability management

---

## 2. Regulatory Landscape

### 2.1 Applicable Regulations

#### 2.1.1 Primary Regulations

| Regulation | Jurisdiction | Applicability | Key Requirements |
|------------|--------------|---------------|------------------|
| **NDPR** | Nigeria | All Nigerian users | Consent, data security, breach notification, registration with NITDA |
| **GDPR** | European Union | EU users, Nigerians in EU | Lawful basis, data minimization, right to erasure, DPO requirement |
| **CCPA** | California, USA | California residents | Opt-out rights, data sale disclosure, consumer rights |
| **LGPD** | Brazil | Brazilian users | Similar to GDPR |
| **POPIA** | South Africa | South African users | Similar to GDPR |
| **Common Law** | Nigeria | All operations | Contract law, tort law, criminal law |

#### 2.1.2 Industry-Specific Considerations

**Online Dating Industry:**
- No specific federal regulation in Nigeria (as of 2026)
- General consumer protection laws apply
- Advertising Standards (ARCON)
- National Agency for the Prohibition of Trafficking in Persons (NAPTIP) - Romance scam awareness

**Health Data Processing:**
- Tier 4 includes self-declared health data (genotype, blood group, conditions)
- Not medical data (no HIPAA equivalent in Nigeria)
- Still considered sensitive under NDPR/GDPR

**Financial Transactions:**
- Payment Card Industry Data Security Standard (PCI DSS)
- Central Bank of Nigeria (CBN) guidelines
- Anti-Money Laundering (AML) compliance

---

## 3. GDPR Compliance

### 3.1 Lawful Basis for Processing

**Article 6: Lawful Basis**

| Data Category | Lawful Basis | Documentation |
|---------------|--------------|---------------|
| Tier 1 (Identity & Intent) | Consent + Contract | User agrees to Terms, necessary for service provision |
| Tier 2 (Lifestyle) | Consent | Explicit opt-in for each tier completion |
| Tier 3 (Family) | Consent | Explicit opt-in + special category warning |
| Tier 4 (Health) | Explicit Consent (Art. 9) | Special category data, enhanced consent flow |
| Tier 5 (Verification) | Consent + Legal Obligation | ID verification for fraud prevention |
| Payment Data | Contract + Legal Obligation | Necessary for payment processing, financial records |
| Analytics | Legitimate Interest | Balancing test documented |

**Consent Requirements (Art. 7):**
- ✓ Freely given (no forced bundling)
- ✓ Specific (tier-by-tier consent)
- ✓ Informed (clear language, tier explanations)
- ✓ Unambiguous (affirmative action required)
- ✓ Withdrawable (tier downgrade, account deletion)

**Implementation:**
```javascript
const consentRecord = {
  userId: 12345,
  consentType: "tier_4_completion",
  consentDate: "2026-02-26T14:30:00Z",
  consentMethod: "explicit_checkbox",
  consentText: "I consent to sharing my health information (genotype, blood group, health conditions) as part of Tier 4. I understand this is sensitive data and I can revoke access anytime.",
  ipAddress: "102.88.34.12",
  userAgent: "Mozilla/5.0...",
  documentVersion: "terms_v2.1_privacy_v3.0",
  withdrawnAt: null
};
```

### 3.2 Special Category Data (Article 9)

**Tier 4 Health Data Processing:**

**Lawful Basis:** Explicit consent (Art. 9(2)(a))

**Enhanced Consent Flow:**
```
┌─────────────────────────────────────────┐
│ Tier 4: Health & Long-Term Compatibility│
├─────────────────────────────────────────┤
│                                         │
│ ⚠️ Sensitive Information Notice         │
│                                         │
│ Tier 4 includes health information:    │
│ • Genotype (AA, AS, SS, etc.)          │
│ • Blood group                          │
│ • Health conditions                    │
│                                         │
│ This is sensitive personal data under  │
│ GDPR Article 9 and NDPR.               │
│                                         │
│ Important:                             │
│ • This data is self-declared (not      │
│   medically verified)                  │
│ • Only shared with users you approve   │
│ • You can revoke access anytime        │
│ • We do not share with third parties   │
│                                         │
│ □ I understand and consent to          │
│   processing this sensitive data       │
│                                         │
│ [Cancel]              [Continue]        │
└─────────────────────────────────────────┘
```

**Data Minimization (Art. 5(1)(c)):**
- Only collect health data relevant to compatibility (no medical records)
- No mandatory fields for sensitive conditions (user decides what to share)
- No health data used for advertising or profiling

### 3.3 User Rights (Chapter III)

#### 3.3.1 Right to Access (Art. 15)

**Implementation:**
```
Settings → Privacy → Download My Data

User receives JSON export:
{
  "personalData": { /* Tier 1-5 data */ },
  "activityData": { /* Show Interest, messages, profile views */ },
  "consentRecords": [ /* All consents given */ ],
  "dataSharing": [ /* Who has access to what tier */ ],
  "processingHistory": [ /* Logs of data processing activities */ ]
}
```

**Delivery:** Within 30 days (GDPR), 7 days (NDPR) - we commit to 7 days for both

#### 3.3.2 Right to Rectification (Art. 16)

**Implementation:**
- Users can edit all tier data anytime
- Audit log maintained (old → new values)
- Changes propagate immediately to all shared relationships

#### 3.3.3 Right to Erasure (Art. 17)

**Implementation:**
```
Settings → Privacy → Delete My Account

Two-stage deletion:
1. Soft delete (30-day grace period)
   - Account deactivated
   - Data hidden from other users
   - User can reactivate within 30 days

2. Hard delete (after 30 days, or immediate if requested)
   - All personal data deleted
   - Anonymized data retained for legal compliance (see data_management.md)
   - User notified of completion
```

**Exceptions:**
- Legal obligation (financial records: 7 years)
- Legal claims (active disputes, investigations)
- Backup retention (90 days, then purged)

#### 3.3.4 Right to Data Portability (Art. 20)

**Implementation:**
- JSON export (machine-readable)
- CSV option for non-technical users
- Includes all user-provided data (not derived/inferred data)

#### 3.3.5 Right to Object (Art. 21)

**Implementation:**
- Opt-out of marketing emails (unsubscribe link)
- Opt-out of analytics (Settings → Privacy → Analytics)
- Opt-out of profiling (no automated matching currently, but documented for future)

### 3.4 Data Protection Officer (DPO)

**Requirement:** Mandatory under GDPR Art. 37 (processing special category data at scale)

**Responsibilities:**
- Monitor GDPR/NDPR compliance
- Conduct Data Protection Impact Assessments (DPIAs)
- Serve as point of contact for supervisory authorities
- Train staff on data protection
- Handle data subject requests

**Contact:**
- Email: dpo@joymatcher.com
- Phone: +234 (XXX) XXX-XXXX
- Available in privacy policy and app footer

### 3.5 Data Protection Impact Assessment (DPIA)

**When Required (Art. 35):**
- High risk processing (health data, biometric verification)
- Large-scale processing
- Systematic monitoring

**DPIA Conducted For:**
- Tier 4 health data processing
- Tier 5 biometric verification
- Automated spam detection (potential profiling)
- Cross-border data transfers

**DPIA Template:**
```
1. Description of Processing
   - What data is processed?
   - Why is it processed?
   - Who has access?

2. Necessity and Proportionality
   - Is processing necessary for service?
   - Are there less intrusive alternatives?

3. Risk Assessment
   - What could go wrong?
   - Likelihood and severity
   - Impact on users

4. Mitigation Measures
   - Technical safeguards (encryption, access control)
   - Organizational safeguards (policies, training)
   - User controls (revocation, deletion)

5. Consultation
   - DPO review
   - User feedback (if applicable)
   - Supervisory authority (if high risk)
```

### 3.6 Data Breach Notification (Art. 33-34)

**Breach Response Process:**
```
Incident Detection
  ↓
Immediate Containment (within 1 hour)
  ↓
Assessment (within 4 hours)
  - What data was affected?
  - How many users?
  - Risk level (low/medium/high)
  ↓
Notification Decision
  - Supervisory Authority: 72 hours (if high risk)
  - Affected Users: Without undue delay (if high risk to rights)
  ↓
Documentation
  - Nature of breach
  - Categories and number of data subjects
  - Likely consequences
  - Measures taken/proposed
  ↓
Post-Mortem
  - Root cause analysis
  - Preventive measures
  - Policy updates
```

**Notification Template (User):**
```
Subject: Important Security Notice - JoyMatcher

Dear [User],

We are writing to inform you of a security incident that may have affected your account.

What Happened:
On [Date], we discovered [brief description of breach].

What Information Was Involved:
[Specific data categories: e.g., name, email, Tier 1-2 data. NO financial or Tier 4-5 data was affected.]

What We're Doing:
• We have secured the vulnerability
• We have notified relevant authorities
• We have implemented additional safeguards

What You Should Do:
• Reset your password (if credentials may be compromised)
• Monitor your account for unusual activity
• Contact us if you have concerns: security@joymatcher.com

Your Rights:
You have the right to lodge a complaint with the supervisory authority (NITDA for Nigerian users, ICO for UK users, etc.).

We sincerely apologize for this incident and are committed to protecting your information.

Sincerely,
JoyMatcher Security Team
```

### 3.7 Cross-Border Data Transfers (Art. 44-50)

**Scenario:** Nigerian data transferred to cloud providers (AWS, Google Cloud)

**Mechanism:** Standard Contractual Clauses (SCCs)

**Implementation:**
- Data Processing Agreement (DPA) with all vendors
- SCCs incorporated into contracts
- Documentation of transfer safeguards
- Regular vendor audits

**User Disclosure (Privacy Policy):**
```
International Data Transfers:

Your data may be transferred to and processed in countries outside Nigeria, including:
• United States (cloud hosting: AWS, Google Cloud)
• European Union (CDN: Cloudflare)

We ensure adequate protection through:
• Standard Contractual Clauses (EU Commission approved)
• Encryption in transit and at rest
• Vendor security audits

You have the right to request details about these transfers.
```

---

## 4. NDPR Compliance

### 4.1 Registration with NITDA

**Requirement:** All data controllers and processors in Nigeria must register with NITDA

**Registration Process:**
1. Visit: https://ndpr.nitda.gov.ng/
2. Complete Data Protection Compliance Organization (DPCO) form
3. Submit:
   - Company details
   - Data processing activities description
   - Data security measures
   - DPO contact information
4. Pay registration fee
5. Receive DPCO certificate

**Annual Renewal:** Required

### 4.2 NDPR-Specific Requirements

#### 4.2.1 Consent (NDPR Art. 2.1)

**Must be:**
- Freely given
- Specific and informed
- Unambiguous indication

**Implementation:** Same as GDPR consent mechanism

#### 4.2.2 Data Security (NDPR Art. 2.4)

**Requirements:**
- Technical safeguards (encryption, firewalls, intrusion detection)
- Organizational safeguards (access control, staff training)
- Regular security audits
- Incident response plan

**Documentation:**
- Information Security Policy
- Data Breach Response Plan
- Security audit reports (annual)

#### 4.2.3 Data Subject Rights (NDPR Art. 2.2)

Same as GDPR, but with Nigerian-specific timelines:
- Right to access: 7 days (faster than GDPR's 30 days)
- Right to rectification: Immediate
- Right to erasure: 7 days
- Right to object: Immediate

#### 4.2.4 Data Breach Notification (NDPR Art. 2.5)

**Timeline:** 72 hours to NITDA (same as GDPR)

**Notification to:** nitda-cert@nitda.gov.ng

### 4.3 Localization Requirements

**Current Status (2026):** No data localization mandate in Nigeria (as of Feb 2026)

**Monitoring:** NITDA has discussed data localization; we monitor regulatory developments

**Contingency Plan:**
- If localization required: Deploy Nigeria-specific data center (AWS Lagos region)
- Estimated timeline: 6 months
- Cost impact: Assessed and budgeted

---

## 5. Additional Compliance Areas

### 5.1 Age Verification and Child Protection

**Minimum Age:** 21 years (JoyMatcher policy, exceeds legal minimum of 18)

**Age Verification:**
1. Date of birth required in Tier 1
2. Automated check (rejects <21)
3. Tier 5 ID verification confirms age
4. Periodic re-checks (flag if profile photo appears underage)

**COPPA/Child Protection:**
- No users under 21 allowed
- Automated detection of minors in photos (reject immediately)
- CSAM reporting protocol (see `safety_system.md`)

**Implementation:**
```javascript
const verifyAge = (dateOfBirth) => {
  const age = calculateAge(dateOfBirth);

  if (age < 21) {
    return {
      allowed: false,
      reason: "minimum_age_not_met",
      message: "You must be at least 21 years old to use JoyMatcher."
    };
  }

  if (age > 100) {
    return {
      allowed: false,
      reason: "invalid_age",
      message: "Please enter a valid date of birth."
    };
  }

  return { allowed: true, age };
};
```

### 5.2 Terms of Service & Privacy Policy

#### 5.2.1 Terms of Service Requirements

**Must Include:**
- Service description
- User obligations (accurate information, respectful behavior)
- Prohibited conduct (spam, harassment, scams)
- Intellectual property rights
- Disclaimer of warranties
- Limitation of liability
- Dispute resolution (arbitration clause)
- Governing law (Nigerian law)
- Termination rights
- Amendment process

**Key Clauses:**

**Disclaimer (Health Data):**
```
Health Information Disclaimer:

Tier 4 health information is self-declared by users and is NOT medically verified. JoyMatcher is not a medical service and does not provide medical advice. Users are responsible for:
• Verifying health information independently
• Consulting medical professionals before marriage
• Conducting appropriate genetic counseling if relevant (e.g., genotype compatibility)

JoyMatcher is not liable for inaccurate or incomplete health disclosures.
```

**Limitation of Liability:**
```
To the maximum extent permitted by law, JoyMatcher is not liable for:
• Actions of other users
• Loss or damage from service disruptions
• Third-party content or services
• Decisions made based on profile information

Maximum liability is limited to the amount paid by the user in the 12 months preceding the claim.
```

**Arbitration Clause:**
```
Dispute Resolution:

Any disputes arising from these Terms will be resolved through:
1. Informal negotiation (30 days)
2. Mediation (Lagos Multi-Door Courthouse)
3. Binding arbitration (Lagos Court of Arbitration)

Users waive the right to class action lawsuits.
```

#### 5.2.2 Privacy Policy Requirements

**Must Include (GDPR Art. 13-14, NDPR):**
- Data controller identity and contact details
- DPO contact details
- Purposes of processing
- Lawful basis for processing
- Recipients of data (third parties, vendors)
- International transfers (if applicable)
- Retention periods
- User rights (access, erasure, etc.)
- Right to lodge complaint with supervisory authority
- Automated decision-making (if applicable)

**Implementation:**
- Privacy Policy page (accessible from all pages)
- In-app privacy settings
- Consent checkboxes during Tier completion
- Annual review and updates (notify users of material changes)

### 5.3 Cookie Policy & Tracking

**GDPR ePrivacy Directive Compliance:**

**Cookie Banner:**
```
┌─────────────────────────────────────────┐
│ We use cookies to improve your         │
│ experience. Essential cookies are      │
│ required for the site to function.     │
│                                         │
│ Cookie Preferences:                    │
│ ☑ Essential (required)                 │
│ ☐ Analytics                            │
│ ☐ Marketing                            │
│                                         │
│ [Learn More]  [Reject All]  [Accept All]│
└─────────────────────────────────────────┘
```

**Cookie Categories:**
- **Essential:** Authentication, security, session management (no consent required)
- **Analytics:** Google Analytics, Mixpanel (consent required)
- **Marketing:** Email tracking pixels (consent required)

**Implementation:**
- Cookie consent management platform (CMP)
- Respect "Do Not Track" signals
- Document all cookies in Cookie Policy

### 5.4 Marketing & Communications

**CAN-SPAM Act / NDPR Requirements:**

**Email Marketing:**
- ✓ Unsubscribe link in every email
- ✓ Physical address in footer
- ✓ Accurate "From" and "Subject" lines
- ✓ Clearly identify as advertisement (if applicable)
- ✓ Honor opt-out within 10 business days

**SMS Marketing (Nigeria-specific):**
- Consent required before sending promotional SMS
- Opt-out mechanism ("Reply STOP to opt out")
- NCC guidelines compliance

**In-App Notifications:**
- User can disable all non-essential notifications
- Transactional notifications (e.g., new message) allowed without consent

### 5.5 Accessibility Compliance

**Requirements:**
- Americans with Disabilities Act (ADA) - applicable if serving US users
- Web Content Accessibility Guidelines (WCAG) 2.1 AA - international standard

**Implementation:** See `accessibility.md` for detailed specification

### 5.6 Payment & Financial Compliance

#### 5.6.1 PCI DSS Compliance

**Scope:** Handling payment card data

**Approach:** Minimize scope by using third-party payment processors (Stripe, Paystack)

**Requirements:**
- Never store CVV
- Tokenize card data (Stripe/Paystack handles storage)
- Encrypt payment page (HTTPS/TLS 1.2+)
- Annual security audit (if storing any card data)

**Implementation:**
- Payment form hosted by Stripe/Paystack (iframe or redirect)
- Tokens stored in JoyMatcher database (not raw card numbers)
- PCI SAQ-A (simplest compliance questionnaire)

#### 5.6.2 Anti-Money Laundering (AML)

**Applicability:** VIP subscriptions (₦200,000+)

**Requirements (CBN Guidelines):**
- Know Your Customer (KYC) verification
- Suspicious transaction reporting
- Record keeping (5 years)

**Implementation:**
- Tier 5 verification serves as KYC for VIP
- Large transactions flagged for review (>₦500,000 in 30 days)
- Compliance officer designated

#### 5.6.3 Tax Compliance

**VAT (Value Added Tax):**
- Nigeria: 7.5% VAT on all subscriptions
- EU: VAT varies by country (reverse charge mechanism for B2B)
- US: Sales tax varies by state

**Implementation:**
- Integrate tax calculation API (Stripe Tax, Avalara)
- Display tax-inclusive pricing to Nigerian users
- Issue VAT invoices
- File periodic VAT returns with FIRS (Nigeria)

**Tax Nexus Monitoring:**
- Monitor user locations to determine tax obligations
- Register for tax collection in jurisdictions as required

### 5.7 Intellectual Property

**User-Generated Content:**

**Terms Clause:**
```
Content License:

By uploading content (photos, text), you grant JoyMatcher a non-exclusive, worldwide, royalty-free license to:
• Display your content to other users (in accordance with tier/EDT rules)
• Use for service improvement (e.g., photo moderation AI training)
• Include in marketing materials (with explicit consent, separate from this license)

You retain ownership of your content.
```

**Copyright Infringement (DMCA for US users):**
- Designated Copyright Agent contact: dmca@joymatcher.com
- DMCA takedown process documented
- Counter-notice procedure

**Trademark:**
- "JoyMatcher" trademark registration (Nigeria, US, EU)
- Monitor for infringement
- Enforce against confusingly similar services

---

## 6. Law Enforcement & Legal Requests

### 6.1 Law Enforcement Request Process

**Types of Requests:**
1. Subpoena (civil case)
2. Court order
3. Search warrant (criminal case)
4. Emergency request (imminent harm)

**Response Protocol:**

```
Law Enforcement Request Received
  ↓
Legal Team Review (within 24 hours)
  - Verify authenticity (contact issuing authority)
  - Verify jurisdiction
  - Verify legal sufficiency (valid subpoena, proper scope)
  ↓
Determine Response
  - Comply: Valid request, legally binding
  - Challenge: Overbroad, lacks legal basis
  - Decline: No jurisdiction, insufficient basis
  ↓
User Notification (if legally permitted)
  - Notify user of request
  - Provide copy of request
  - Give user opportunity to challenge (if time permits)
  ↓
Data Production
  - Collect requested data
  - Redact unrelated information
  - Produce in requested format (PDF, CSV, JSON)
  - Certify data authenticity
  ↓
Documentation
  - Log request in Legal Request Register
  - Retain copy of request and response
  - Track outcome (if disclosed)
```

**Legal Request Register:**
```javascript
const legalRequest = {
  requestId: "LEO-2026-0234",
  receivedDate: "2026-02-26",
  requestingAuthority: "Nigeria Police Force, Lagos Command",
  requestType: "court_order",
  caseNumber: "CR/123/2026",
  targetUser: 12345,
  dataRequested: ["profile_data", "messages", "payment_history"],
  legalReview: {
    reviewer: "Jane Doe, Legal Counsel",
    reviewDate: "2026-02-27",
    decision: "comply",
    reasoning: "Valid court order, proper jurisdiction, specific scope"
  },
  userNotified: true,
  userNotifiedDate: "2026-02-27",
  dataProduced: true,
  productionDate: "2026-03-01",
  notes: "User did not challenge. Data produced via secure upload."
};
```

### 6.2 Emergency Requests

**Imminent Harm Standard:**
- Threat to life or safety
- Child abuse
- Terrorism
- Human trafficking

**Process:**
- Expedited review (within 2 hours)
- Can produce data before formal legal process (good faith belief)
- Follow up with formal request (within 48 hours)
- Document thoroughly (justify good faith belief)

### 6.3 Transparency Report

**Published Annually:**
- Number of law enforcement requests
- Types of requests (subpoena, warrant, court order)
- Compliance rate
- User notification rate
- Requests by country

**Example:**
```
JoyMatcher 2025 Transparency Report:

Law Enforcement Requests Received: 12
- Nigeria: 8
- United States: 3
- United Kingdom: 1

Requests by Type:
- Court Orders: 7
- Subpoenas: 3
- Emergency Requests: 2

Compliance Rate: 75% (9 complied, 2 challenged, 1 declined)

User Notification: 83% (10 notified, 2 legal gag order)
```

---

## 7. Liability & Risk Management

### 7.1 Liability Limitations

**Platform vs. Publisher:**
- JoyMatcher is a platform, not a publisher
- Section 230 protection (US) - not liable for user content
- Nigerian equivalent: No specific law, but common law principles apply

**Disclaimer:**
```
User Content Disclaimer:

JoyMatcher is a platform that enables users to connect. We do not:
• Verify all user-provided information (except Tier 5 ID verification)
• Conduct background checks (unless user opts in)
• Guarantee outcomes (marriage, relationships)
• Endorse or approve user content

Users are responsible for their own decisions and actions.
```

### 7.2 Insurance Coverage

**Required Policies:**
- **General Liability Insurance:** $1M coverage (bodily injury, property damage)
- **Professional Liability (E&O):** $2M coverage (errors, omissions, negligence)
- **Cyber Liability Insurance:** $5M coverage (data breaches, cyber attacks)
- **Directors & Officers (D&O):** $1M coverage (management decisions)

**Risk Assessment:**
- Data breach: High likelihood, high impact → Cyber insurance essential
- User harm (physical): Low likelihood, high impact → General liability + strong ToS
- False information: Medium likelihood, medium impact → Disclaimer + verification

### 7.3 Terms Enforcement

**Account Termination:**
- Immediate termination for ToS violations (spam, harassment, fraud)
- User notified of reason
- Right to appeal (within 30 days)
- Data retained per retention policy (see `data_management.md`)

**Legal Action:**
- JoyMatcher reserves right to pursue legal action for severe violations (fraud, defamation)
- Cooperation with law enforcement

---

## 8. Documentation & Record Keeping

### 8.1 Required Documentation

**Compliance Documents:**
- [ ] Privacy Policy (current version)
- [ ] Terms of Service (current version)
- [ ] Cookie Policy (current version)
- [ ] Data Processing Agreements (with all vendors)
- [ ] Standard Contractual Clauses (for international transfers)
- [ ] Data Protection Impact Assessments (Tier 4, Tier 5, spam detection)
- [ ] Information Security Policy
- [ ] Data Breach Response Plan
- [ ] Records of Processing Activities (ROPA)
- [ ] Consent records (per user)
- [ ] Legal Request Register
- [ ] Transparency Report (annual)

**Retention:**
- Policy documents: Indefinitely (version history)
- Consent records: Duration of processing + 7 years
- Legal requests: 10 years
- DPIAs: Duration of processing + 3 years

### 8.2 Records of Processing Activities (ROPA)

**GDPR Art. 30 Requirement:**

**Example Entry:**
```
Processing Activity: Tier 4 Health Data Collection

Purpose: Enable health compatibility matching for marriage readiness
Legal Basis: Explicit consent (GDPR Art. 9(2)(a))
Data Categories: Genotype, blood group, self-declared health conditions
Data Subjects: Premium and VIP users who complete Tier 4
Recipients: Other users (with explicit consent), no third parties
Transfers: None (stored in Nigeria/EU data centers)
Retention: Duration of account + 30 days (soft delete)
Security: Encryption at rest (AES-256), access control, audit logs
DPO: dpo@joymatcher.com
```

### 8.3 Audit Trail

**Logged Events:**
- User consent given/withdrawn
- Tier data access (who viewed what)
- Data subject requests (access, erasure, rectification)
- Security incidents
- Policy changes
- Legal requests
- Admin actions (account suspension, data deletion)

**Retention:** 3 years (compliance audits)

**Implementation:**
```javascript
const auditLog = {
  eventId: "AUD-20260226-A1B2C3",
  timestamp: "2026-02-26T14:30:00Z",
  eventType: "data_access",
  actor: { userId: 12345, role: "user" },
  subject: { userId: 67890 },
  action: "viewed_tier_3_data",
  details: {
    tierShared: 3,
    effectiveDisclosureTier: 3,
    consentStatus: "granted"
  },
  ipAddress: "102.88.34.12",
  userAgent: "Mozilla/5.0..."
};
```

---

## 9. Staff Training & Awareness

### 9.1 Training Requirements

**All Staff:**
- Privacy basics (GDPR/NDPR principles)
- Data security (password management, phishing awareness)
- Incident reporting

**Engineering Team:**
- Secure coding practices
- Privacy by design
- Data minimization
- Encryption standards

**Customer Support:**
- Handling data subject requests
- Identifying security incidents
- Escalation procedures

**Moderation Team:**
- Handling sensitive data (health, identity documents)
- Confidentiality obligations
- Trauma-informed moderation

**Training Schedule:**
- Onboarding: Day 1 (mandatory)
- Annual refresher: All staff
- Ad-hoc: When policies change

### 9.2 Confidentiality Agreements

**Required for:**
- All employees
- Contractors
- Vendors with data access

**Key Clauses:**
- Non-disclosure of user data
- Use only for authorized purposes
- Notification of breaches
- Return/destruction of data upon termination

---

## 10. Vendor & Third-Party Management

### 10.1 Data Processors (GDPR Art. 28)

**Required Agreements:**
- Data Processing Agreement (DPA)
- Standard Contractual Clauses (if outside Nigeria/EU)
- Security commitments
- Sub-processor notification
- Data return/deletion upon termination

**Key Vendors:**
- Cloud hosting: AWS, Google Cloud
- Payment processing: Stripe, Paystack
- Email service: SendGrid, Mailgun
- SMS service: Twilio, Termii
- Analytics: Google Analytics, Mixpanel
- CDN: Cloudflare
- Customer support: Intercom, Zendesk

**Vendor Assessment:**
- [ ] Security certifications (ISO 27001, SOC 2)
- [ ] Privacy policy review
- [ ] Data location/transfers
- [ ] Sub-processor list
- [ ] Incident notification process
- [ ] DPA signed

### 10.2 Service Level Agreements (SLAs)

**Key SLAs:**
- Uptime: 99.9% (AWS, Google Cloud)
- Data breach notification: 24 hours (all vendors)
- Support response time: 4 hours (critical), 24 hours (standard)

---

## 11. Jurisdiction-Specific Considerations

### 11.1 Nigeria

**Key Laws:**
- NDPR (2019)
- Cybercrimes Act (2015)
- Nigerian Communications Commission (NCC) regulations
- Consumer Protection Council (CPC) guidelines

**Regulatory Bodies:**
- NITDA (data protection)
- NCC (telecommunications)
- ARCON (advertising standards)
- FIRS (tax)

**Practical Considerations:**
- Local payment methods (bank transfer, USSD)
- Local customer support (WAT timezone)
- Naira pricing
- Local hosting option (if localization required)

### 11.2 United States

**Key Laws:**
- CAN-SPAM Act
- COPPA (children under 13 - not applicable, our minimum is 21)
- CCPA (California)
- State data breach notification laws (all 50 states)

**Considerations:**
- State-specific laws (California, Virginia, Colorado)
- Section 230 protections
- DMCA safe harbor

### 11.3 European Union

**Key Laws:**
- GDPR
- ePrivacy Directive
- Digital Services Act (DSA)

**Considerations:**
- DPO required (processing special category data at scale)
- GDPR representative (if no EU establishment)
- Cross-border transfer mechanisms

### 11.4 United Kingdom

**Key Laws:**
- UK GDPR (post-Brexit)
- Data Protection Act 2018

**Considerations:**
- ICO registration
- UK-specific transfer mechanisms (post-Brexit)

---

## 12. Incident Response & Crisis Management

### 12.1 Incident Categories

| Incident Type | Severity | Response Time | Escalation |
|---------------|----------|---------------|------------|
| Data breach (large-scale) | Critical | Immediate | CEO, DPO, Legal |
| Data breach (limited) | High | 1 hour | DPO, Legal |
| CSAM detection | Critical | Immediate | CEO, Legal, NCMEC/INTERPOL |
| User harm (physical) | Critical | Immediate | CEO, Legal, Law Enforcement |
| Payment fraud | High | 1 hour | Finance, Legal |
| Service outage | Medium | 1 hour | CTO, Engineering |
| Spam attack | Medium | 4 hours | Trust & Safety |

### 12.2 Crisis Communication

**Stakeholders:**
- Users (affected)
- Regulators (NITDA, ICO)
- Media
- Investors
- Staff

**Communication Plan:**
- Incident notification (users): Within 24 hours
- Public statement (if media coverage): Within 48 hours
- Regulatory notification: 72 hours (GDPR/NDPR)
- Post-incident report: Within 30 days

**Spokesperson:**
- CEO (major incidents)
- DPO (data protection incidents)
- Legal (regulatory matters)

---

## 13. Compliance Monitoring & Audits

### 13.1 Internal Audits

**Schedule:**
- Quarterly: Privacy policy review, consent flow testing
- Semi-annually: Security audit, vendor assessment
- Annually: Full compliance audit, DPIA review

**Audit Checklist:**
- [ ] Privacy policy up to date
- [ ] Consent mechanisms functional
- [ ] Data subject request process working (test)
- [ ] Security controls in place (penetration test)
- [ ] Vendor DPAs signed and current
- [ ] Staff training completed
- [ ] Audit logs reviewed
- [ ] Incident response plan tested (tabletop exercise)

### 13.2 External Audits

**Schedule:**
- Annually: Security audit (ISO 27001, SOC 2)
- As needed: Legal compliance audit (if regulatory inquiry)

**Certifications to Pursue:**
- ISO 27001 (information security)
- SOC 2 Type II (trust services)
- PCI DSS (if storing card data)

### 13.3 Regulatory Inspections

**Preparation:**
- Maintain compliance documentation (up-to-date)
- Designate point of contact (DPO)
- Provide requested information promptly
- Cooperate fully

**Post-Inspection:**
- Implement remediation actions
- Document improvements
- Follow up with regulator

---

## 14. Future Regulatory Developments

### 14.1 Monitoring

**Sources:**
- NITDA website/newsletters
- EU Commission (GDPR updates)
- Industry associations (dating industry)
- Legal counsel updates

**Key Areas to Watch:**
- Nigeria data localization (potential future requirement)
- AI regulation (EU AI Act - affects automated matching)
- Online safety (UK Online Safety Act - content moderation)
- Biometric data regulation (Tier 5 verification)

### 14.2 Adaptability

**Design Principles:**
- Privacy by design (easy to add controls)
- Modular architecture (easy to add consent layers)
- Robust audit logging (demonstrate compliance)
- Regular policy reviews (update as laws change)

---

## 15. Implementation Checklist

### Phase 1: Launch Compliance
- [ ] Privacy Policy drafted and published
- [ ] Terms of Service drafted and published
- [ ] Cookie Policy and banner implemented
- [ ] NDPR registration completed (NITDA)
- [ ] DPO designated and contact published
- [ ] Consent flows implemented (tier-by-tier)
- [ ] Data subject rights processes (access, erasure, rectification)
- [ ] Vendor DPAs signed (AWS, Stripe, etc.)
- [ ] Security measures implemented (encryption, access control)
- [ ] Data breach response plan documented
- [ ] Staff training completed

### Phase 2: Enhanced Compliance (1-3 months)
- [ ] DPIA completed (Tier 4, Tier 5, spam detection)
- [ ] ROPA (Records of Processing Activities) documented
- [ ] Audit logging implemented
- [ ] Legal request process documented
- [ ] Insurance policies obtained
- [ ] Compliance dashboard (monitor consent rates, DSR response times)

### Phase 3: Certification & Audits (3-6 months)
- [ ] External security audit (ISO 27001 or SOC 2)
- [ ] Annual compliance review
- [ ] Transparency report published
- [ ] Regulatory relationship established (NITDA)

---

## 16. Compliance Cost Estimate

**Year 1 (Launch):**
- Legal counsel (policy drafting, DPA review): $15,000
- DPO (external consultant): $20,000
- NDPR registration: ₦50,000
- Insurance (cyber, E&O): $10,000
- Staff training: $5,000
- **Total: ~$50,000**

**Ongoing (Annual):**
- Legal counsel (retainer): $10,000
- DPO: $20,000
- Insurance: $10,000
- External audit: $15,000
- Staff training: $3,000
- **Total: ~$58,000/year**

---

## 17. Key Contacts

**Internal:**
- DPO: dpo@joymatcher.com
- Legal Counsel: legal@joymatcher.com
- Security Team: security@joymatcher.com

**External:**
- NITDA (Nigeria): info@nitda.gov.ng
- ICO (UK): casework@ico.org.uk
- CNIL (France, if EU users): Contact via website

**Legal Requests:**
- Law Enforcement: legal-requests@joymatcher.com
- Subpoena Address: [Physical address]

---

**Document Control**
Owner: Legal & Compliance Team
Review Cycle: Quarterly (or when laws change)
Next Review: 2026-05-26
Classification: Internal

**Related Documentation:**
- `data_management.md` - Data retention and deletion
- `safety_system.md` - User safety and content moderation
- `accessibility.md` - WCAG compliance
- Privacy Policy (external)
- Terms of Service (external)
