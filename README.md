# JoyMatcher

**A Trust-Based Matchmaking Platform for Marriage-Minded Nigerians**

> Consent-driven • Investment-filtered • Reciprocity-enforced • Marriage-oriented • Verification-aware • VIP-curated

---

## 🎯 Project Overview

JoyMatcher is a premium matchmaking platform designed specifically for marriage-minded Nigerian professionals (both home-based and diaspora). Unlike traditional dating apps, JoyMatcher uses a **progressive disclosure system** with **5 tiers of information** that users control and share based on mutual trust and reciprocity.

### Key Differentiators

- **Progressive Disclosure:** 5-tier system (public → private) that users control
- **EDT (Effective Disclosure Tier):** Automatic calculation of what you can see based on mutual sharing
- **Subscription Gating:** Free users limited to Tier 2, Premium to Tier 4, VIP to Tier 5
- **Show Interest Rules:** Explicit consent required before messaging
- **VIP Concierge Service:** Expert matchmakers with tiered consent model
- **Marriage-Oriented:** Long-term relationships and marriage as explicit goals

---

## 📊 Project Status

### Documentation: ✅ 100% Complete (82 files, ~404,300 words)

All specification documents are complete and production-ready:

- ✅ **Global Context** (6 files) - Product charter, tier system, user personas
- ✅ **Admin System** (6 files) - 6 admin roles with RBAC, VIP Expert workflows
- ✅ **Safety & Compliance** (15 files) - GDPR/NDPR/CCPA legal documentation
- ✅ **Design System** (9 files) - Tailwind CSS v4 + HTML implementation + mobile (iOS/Android)
- ✅ **Technical Specifications** (9 files) - Rails 8 architecture, database models, API specs
- ✅ **Marketing & Content** (5 files) - Testimonials, blog, content strategy
- ✅ **Feature Specs - User Screens** (14 files) - All user-facing pages with HTML/Tailwind examples
- ✅ **Feature Specs - Admin Screens** (7 files) - All admin interfaces with role-based access

### Prototype: 🚧 In Progress (25/30 pages - 83%)

- ✅ **Foundational Files:** Tailwind config, state management, components
- ✅ **Public Pages:** Homepage, How It Works, Pricing, Signup, Login, VIP Landing
- ⏳ **App Pages:** Dashboard, Discover, Profile View, Messages, Interests (coming soon)
- ⏳ **Admin Pages:** User Management, VIP Coordination, Moderation (coming soon)

### Agent Skills: ✅ Complete (11 skills)

Skill system in `.agent/skills/` following Google Antigravity format:

- ✅ **Mandatory Prerequisites:** documentation-consultation, brain-update
- ✅ **Core Business Logic:** tier-system-enforcement, edt-calculation, show-interest-gating, subscription-tier-logic
- ✅ **Admin & Safety:** admin-rbac-verification, anti-gravity-checking
- ✅ **Development:** rails-development, design-system-application, vip-workflow-implementation

### Brain System: ✅ Ready

Implementation memory system in `/brain/` for Rails 8 development tracking:

- ✅ **State Tracking:** planned.md, in-progress.md, completed.md
- ✅ **Decisions:** Architectural decision documentation
- ✅ **Learnings:** Implementation insights and lessons
- ✅ **Templates:** Brain file templates for feature documentation

### Rails 8 Development: ⏳ Ready to Begin

- ✅ **Stack Finalized:** Rails 8.1.2 + Hotwire + CanCanCan + Solid Queue/Cache/Cable
- ✅ **Documentation Complete:** CLAUDE.md v2.2.0, RULES.md v1.1.0
- ⏳ **Phase 1 - Rails Foundation:** Starting next

---

## 🚀 Quick Start

### View the Prototype

```bash
# Option 1: Python HTTP Server (Simplest)
cd prototype
python -m http.server 8000
# Open http://localhost:8000

# Option 2: NPM Live Server (Auto-reload)
cd prototype
npm install
npm start
# Opens http://localhost:3000 automatically
```

### Explore the Documentation

```bash
# View documentation status
cat docs/DOCUMENTATION_STATUS.md

# View all documentation files
cat docs/DOCUMENTATION_INDEX.md

# Start with the master reference
cat "docs/Global Context/tier_system.md"
```

---

## 📁 Project Structure

```
JoyMatcher/
├── README.md                    # This file (project overview)
├── CLAUDE.md                    # System contract for AI implementation (v2.2.0)
├── RULES.md                     # System contract for Antigravity IDE (v1.1.0)
│
├── .agent/                      # Agent skills system (Google Antigravity format)
│   └── skills/                  # 11 skills for development automation
│       ├── README.md            # Skills overview and dependencies
│       ├── documentation-consultation/
│       ├── brain-update/
│       ├── tier-system-enforcement/
│       ├── edt-calculation/
│       ├── show-interest-gating/
│       ├── subscription-tier-logic/
│       ├── admin-rbac-verification/
│       ├── anti-gravity-checking/
│       ├── rails-development/
│       ├── design-system-application/
│       └── vip-workflow-implementation/
│
├── brain/                       # Implementation memory for Rails 8 development
│   ├── README.md                # Brain structure overview
│   ├── state/
│   │   ├── planned.md           # 8-phase roadmap (12 features)
│   │   ├── in-progress.md       # Active work tracking
│   │   └── completed.md         # Completed features
│   ├── decisions/               # Architectural decision docs
│   └── learnings/               # Implementation insights
│
├── docs/                        # Complete documentation suite (82 files)
│   ├── DOCUMENTATION_STATUS.md  # Completion tracking
│   ├── DOCUMENTATION_INDEX.md   # File index with descriptions
│   ├── Global Context/          # Product charter, tier system, user personas
│   ├── Admin System/            # Admin roles, VIP workflows, moderation
│   ├── Safety & Compliance/     # Legal docs (GDPR/NDPR/CCPA)
│   ├── Design System/           # Tailwind CSS v4, HTML guide, mobile design
│   ├── Technical Specifications/ # Rails 8, database, API specs
│   ├── Marketing & Content/     # Testimonials, blog, social media
│   ├── Feature Specifications/
│   │   ├── User Screens/        # 14 user-facing page specs
│   │   └── Admin Screens/       # 7 admin interface specs
│   └── legacy/                  # Archived earlier documents
│
└── prototype/                   # HTML/CSS/JS prototype (25/30 pages)
    ├── README.md                # Prototype-specific documentation
    ├── index.html               # Homepage
    ├── how-it-works.html        # Tier system explanation
    ├── pricing.html             # Subscription plans
    ├── signup.html              # User registration
    ├── login.html               # Authentication
    ├── vip.html                 # VIP membership landing
    ├── css/
    │   └── styles.css           # Tailwind + custom styles
    ├── js/
    │   ├── state.js             # Global state management
    │   ├── signup.js            # Signup form logic
    │   ├── login.js             # Login form logic
    │   └── vip.js               # VIP page interactions
    ├── components/
    │   ├── navigation.html      # Reusable navigation
    │   ├── footer.html          # Reusable footer
    │   └── modals.html          # Modal templates
    ├── tailwind.config.js       # Tailwind CSS configuration
    └── package.json             # NPM scripts
```

---

## 🎨 Design System

### Brand Identity

- **Colors:** #4D0052 (deep purple) → #F16A6F (coral pink) gradient
- **Typography:** Georgia (serif) for headings, Inter (sans-serif) for body
- **Framework:** Tailwind CSS v4
- **Aesthetic:** Professional, calm, trust-oriented (not playful dating app)

### Technology Stack

**Production (Rails 8.1.2):**
- **Framework:** Ruby on Rails 8.1.2 with Ruby 3.3+
- **Database:** PostgreSQL 16+
- **Authentication:** BCrypt (has_secure_password)
- **Authorization:** CanCanCan (admin RBAC)
- **Frontend:** Hotwire (Turbo Drive + Turbo Frames + Turbo Streams + Stimulus)
- **ViewComponents:** Reusable UI components
- **Styling:** Tailwind CSS v4 (same design tokens as prototype)
- **Asset Pipeline:** Propshaft
- **JavaScript:** Importmap-rails (ESM)
- **Forms:** SimpleForm
- **Pagination:** Pagy
- **State Machines:** AASM
- **Jobs:** Solid Queue (Rails 8 default)
- **Cache:** Solid Cache (database-backed)
- **WebSockets:** Solid Cable (Rails 8 default)
- **Storage:** ActiveStorage (S3-compatible)
- **Payments:** Stripe
- **Observability:** OpenTelemetry
- **Deployment:** Kamal

**Prototype (React 19.2.0):**
- React 19.2.0 (visual reference only)
- Tailwind CSS v4
- Vite 6.0.11

**Mobile (Planned):**
- iOS (Swift + SwiftUI)
- Android (Kotlin + Jetpack Compose)
- RESTful API + WebSocket for real-time

---

## 🔑 Core Concepts

### 5-Tier Progressive Disclosure System

| Tier | Name | Access | Subscription Required |
|------|------|--------|----------------------|
| **1** | Identity & Intent | Public (all users) | Free |
| **2** | Personal Values | Reciprocal request | Free |
| **3** | Family & Background | Reciprocal request | Premium |
| **4** | Health & Wellbeing | Reciprocal request | Premium |
| **5** | Financial & Verified | KYC required | VIP |

### EDT (Effective Disclosure Tier)

**Formula:**
```
EDT = Math.min(
  userA.maxCompletedTier,
  userB.maxCompletedTier,
  sharedTierByUserA,
  sharedTierByUserB
)
```

**Example:**
- You completed Tier 4 (Premium)
- They completed Tier 3 (Premium)
- You shared Tier 2 with them
- They shared Tier 3 with you
- **Result: EDT = 2** (you can see each other's Tier 1-2 data only)

### Subscription Tiers

| Plan | Price (NGN) | Price (USD) | Tier Ceiling | Show Interest To |
|------|-------------|-------------|--------------|------------------|
| **Free** | ₦0 | $0 | Tier 2 | Free only |
| **Premium** | ₦18,000/mo | $18/mo | Tier 4 | Free, Premium |
| **VIP** | ₦200,000+ | $200+ | Tier 5 | Anyone |

**Quarterly Discount:** ₦45,000 ($45) for 3 months (save ₦9,000 / $9)

---

## 🛡️ Safety & Compliance

### Legal Compliance

- ✅ **GDPR** (EU) compliant
- ✅ **NDPR** (Nigeria) compliant
- ✅ **CCPA** (California) compliant
- ✅ **WCAG 2.1 Level AA** accessibility target

### Key Safety Features

- **Zero-tolerance harassment policy**
- **Right to deletion** (30-day grace period, GDPR Article 17)
- **7-year anonymized data retention** for compliance
- **Tier 5 KYC verification** (government ID + video selfie)
- **Content moderation** (photo approval, message flagging)
- **Spam detection** (rate limiting, pattern analysis)

---

## 👥 Admin System

### 6 Admin Roles

1. **Super Admin** - Full platform access
2. **Moderator** - Content moderation, user reports
3. **Customer Success** - User support, account management
4. **VIP Coordinator** - VIP application review, expert assignment
5. **VIP Expert** (Freelance) - Matchmaking for assigned VIP clients only
6. **Billing Admin** - Payments, refunds, subscriptions

### VIP Expert Key Features

**Tiered Consent Model:**
- ✅ Browse Tier 1-2 of ALL users publicly (for matchmaking)
- ⚠️ Tier 3-5 requires explicit consent from potential matches

**Conflict-of-Interest Policy:**
- One expert CANNOT handle two VIP clients interested in each other
- VIP Coordinator must reassign one client to another expert

**Complete Data Isolation:**
- VIP Experts (freelancers) can ONLY access their assigned clients
- Separate VIP Expert Portal (not main admin panel)

---

## 📚 Key Documentation Files

### Start Here

1. **[docs/DOCUMENTATION_STATUS.md](docs/DOCUMENTATION_STATUS.md)** - Overview of all 82 files
2. **[docs/Global Context/tier_system.md](docs/Global%20Context/tier_system.md)** - MASTER REFERENCE for tier logic
3. **[docs/Global Context/product_charter.md](docs/Global%20Context/product_charter.md)** - Product vision and philosophy
4. **[CLAUDE.md](CLAUDE.md)** - System contract for AI-assisted implementation (v2.2.0)
5. **[RULES.md](RULES.md)** - System contract for Antigravity IDE (v1.1.0)
6. **[.agent/skills/README.md](.agent/skills/README.md)** - Agent skills overview (11 skills)
7. **[brain/README.md](brain/README.md)** - Brain system for implementation tracking

### Technical Implementation

- **[docs/Technical Specifications/rails_architecture.md](docs/Technical%20Specifications/rails_architecture.md)** - Rails 8 setup
- **[docs/Technical Specifications/data_models.md](docs/Technical%20Specifications/data_models.md)** - Database schema
- **[docs/Technical Specifications/api_specifications.md](docs/Technical%20Specifications/api_specifications.md)** - RESTful API

### Design & UI

- **[docs/Design System/html_implementation_guide.md](docs/Design%20System/html_implementation_guide.md)** - Complete HTML/Tailwind examples
- **[docs/Design System/mobile_design_system.md](docs/Design%20System/mobile_design_system.md)** - iOS/Android native components

### Feature Specifications

- **[docs/Feature Specifications/User Screens/](docs/Feature%20Specifications/User%20Screens/)** - 14 user-facing page specs
- **[docs/Feature Specifications/Admin Screens/](docs/Feature%20Specifications/Admin%20Screens/)** - 7 admin interface specs

---

## 🧪 Testing

### Demo Users (Pre-loaded in prototype)

```javascript
// Free User
email: "free@demo.com"
password: "password123"
// Tier 2 ceiling, can only Show Interest to Free users

// Premium User
email: "premium@demo.com"
password: "password123"
// Tier 4 ceiling, can Show Interest to Free/Premium

// VIP User
email: "vip@demo.com"
password: "password123"
// Tier 5 full access, can Show Interest to anyone
```

### Test EDT Calculation

Open browser console on any prototype page:

```javascript
// Calculate EDT between User 1 and User 2
const edt = calculateEDT(1, 2);
console.log(`EDT: ${edt}`);

// Check if User 1 can send Show Interest to User 2
const canSend = AppState.canSendShowInterest(1, 2);
console.log(`Can send: ${canSend.eligible}`);
if (!canSend.eligible) {
  console.log(`Reason: ${canSend.reason}`);
}
```

---

## 🚧 Development Status

### Phase 1: Documentation ✅ COMPLETE

- [x] Product specifications (6 files)
- [x] Admin system documentation (6 files)
- [x] Legal compliance (15 files)
- [x] Design system (9 files)
- [x] Technical specifications (9 files)
- [x] Feature specifications (21 files)
- [x] Final audit

### Phase 2: HTML Prototype 🚧 IN PROGRESS

- [x] Foundational setup (Tailwind, state, components)
- [x] Public pages (6 pages)
- [ ] App pages (8 pages) - **NEXT**
- [ ] Admin pages (7 pages)

### Phase 3: Rails 8 Backend ⏳ READY TO BEGIN

**Phase 1: Rails Foundation**
- [ ] Rails 8.1.2 project setup (PostgreSQL, Tailwind, Hotwire)
- [ ] User model & authentication (BCrypt)
- [ ] Tier system models (User tier tracking, TierSharing)

**Phase 2: Core Business Logic**
- [ ] EDT calculation (Effective Disclosure Tier)
- [ ] Show Interest flow (ShowInterest model, mutual acceptance, cooldown)
- [ ] Subscription logic (Stripe integration, tier ceilings)

**Phase 3: Admin System**
- [ ] Admin RBAC with CanCanCan (6 roles, VIP Expert isolation)
- [ ] VIP workflow (application, Tier 5 verification, expert assignment)

**Phase 4: Communication**
- [ ] Messaging system (Turbo Streams, real-time)
- [ ] Notifications (Action Cable integration)

**Phase 5: UI & Polish**
- [ ] ViewComponents library (locked states, button variants, cards)
- [ ] Design system implementation (jm-* tokens, accessibility)

See [brain/state/planned.md](brain/state/planned.md) for complete 8-phase roadmap.

### Phase 4: Mobile Apps ⏳ PLANNED

- [ ] iOS app (Swift + SwiftUI)
- [ ] Android app (Kotlin + Compose)
- [ ] RESTful API integration
- [ ] Real-time messaging (WebSocket)

---

## 🤝 Contributing

This is a proprietary project. External contributions are not accepted at this time.

---

## 📞 Support

For questions or issues:

- **Documentation:** See `docs/` directory
- **Prototype:** See `prototype/README.md`
- **Technical Specs:** See `docs/Technical Specifications/`

---

## 📝 License

**Copyright © 2026 JoyMatcher Limited. All rights reserved.**

This project is proprietary and not licensed for external use.

---

## 🎯 Next Steps

1. **View the Prototype:**
   ```bash
   cd prototype
   python -m http.server 8000
   # Open http://localhost:8000
   ```

2. **Read the Documentation:**
   Start with `docs/DOCUMENTATION_STATUS.md` for overview

3. **Review the Tier System:**
   Read `docs/Global Context/tier_system.md` (MASTER REFERENCE)

4. **Explore Feature Specs:**
   See `docs/Feature Specifications/` for complete page specifications

---

**Built with careful attention to trust, consent, and marriage-oriented matchmaking.**
