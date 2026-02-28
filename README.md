# JoyMatcher

**A Trust-Based Matchmaking Platform for Marriage-Minded Nigerians**

> Consent-driven • Investment-filtered • Reciprocity-enforced • Marriage-oriented • Verification-aware • VIP-curated

---

## Table of Contents

- [Overview](#overview)
- [Key Differentiators](#key-differentiators)
- [Project Status](#project-status)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Tech Stack](#tech-stack)
- [Core Concepts](#core-concepts)
- [Admin System](#admin-system)
- [Safety & Compliance](#safety--compliance)
- [Development Roadmap](#development-roadmap)
- [Key Documentation](#key-documentation)
- [License](#license)

---

## Overview

JoyMatcher is a premium matchmaking platform designed specifically for marriage-minded Nigerian professionals — both home-based and diaspora. Unlike traditional dating apps, JoyMatcher uses a **progressive disclosure system** with **5 tiers of information** that users control and share based on mutual trust and reciprocity.

This repository contains the full project: documentation, React prototype, Rails component library, and agent skill system used for AI-assisted development.

---

## Key Differentiators

- **Progressive Disclosure** — 5-tier system (public → private) users control at their own pace
- **EDT (Effective Disclosure Tier)** — Automatic calculation of mutual visibility based on what both parties have shared
- **Subscription Gating** — Free users capped at Tier 2, Premium at Tier 4, VIP unlocks Tier 5
- **Show Interest Requirement** — Explicit consent required before any messaging; no cold outreach
- **VIP Concierge Service** — Expert matchmakers manage introductions on behalf of VIP clients
- **Marriage-Oriented** — Long-term commitment and marriage are the explicit, stated goals

---

## Project Status

### Documentation — ✅ Complete (70+ files)

All specification documents are complete and production-ready:

| Category | Files | Coverage |
|---|---|---|
| Global Context | 6 | Product charter, tier system, user personas, journeys |
| Admin System | 6 | 6 admin roles, RBAC, VIP Expert workflows |
| Safety & Compliance | 15 | GDPR, NDPR, CCPA legal documentation |
| Design System | 9 | Tailwind CSS v4, HTML guide, mobile (iOS/Android) |
| Technical Specifications | 9 | Rails 8 architecture, database models, API specs |
| Marketing & Content | 5 | Testimonials, blog, content strategy |
| Feature Specs — User Screens | 14 | All user-facing pages |
| Feature Specs — Admin Screens | 7 | All admin interfaces |

### React Prototype — ✅ 25/30 Pages (83%)

| Section | Pages | Status |
|---|---|---|
| Public | 10 | ✅ Complete |
| Legal | 4 | ✅ Complete |
| App (Authenticated) | 6/8 | ✅ 6 done — Settings & TierCompletion pending |
| Admin Dashboards | 4 | ✅ Complete |

### Rails Component Library — ✅ 64 Components (100%)

Production-ready component library for Rails 8 located in `/rails_components/`:

| Type | Count | Status |
|---|---|---|
| Form components | 12 | ✅ Complete |
| UI components | 37 | ✅ Complete |
| Stimulus controllers | 15 | ✅ Complete |

### Agent Skills — ✅ 11 Skills

Automation skill system in `.agent/skills/` following Google Antigravity format:

- **Prerequisites:** documentation-consultation, brain-update
- **Core Logic:** tier-system-enforcement, edt-calculation, show-interest-gating, subscription-tier-logic
- **Admin & Safety:** admin-rbac-verification, anti-gravity-checking
- **Development:** rails-development, design-system-application, vip-workflow-implementation

### Rails 8 Production — ⏳ Ready to Begin

- Stack finalized: Rails 8 + Hotwire + CanCanCan + Solid Queue/Cache/Cable
- Component library ready for integration
- Phase 1 (Rails Foundation) is next

---

## Getting Started

### Prerequisites

- Node.js 18+ and npm (for prototype)
- Ruby 3.4.8 (for Rails development)
- PostgreSQL 16+ (for Rails development)

### Run the Prototype

```bash
cd prototype
npm install
npm run dev
# Opens at http://localhost:5173
```

### Run the Rails App (development)

```bash
bundle install
bin/setup
bin/dev
# Opens at http://localhost:3000
```

### Explore the Documentation

```bash
# View documentation index
cat docs/DOCUMENTATION_INDEX.md

# Start with the master tier reference
cat "docs/Global Context/tier_system.md"

# View prototype status
cat prototype/PROTOTYPE_STATUS.md

# View component library
cat rails_components/COMPONENT_INDEX.md
```

### Demo Accounts (Prototype)

| Role | Email | Subscription | Tier Ceiling |
|---|---|---|---|
| Free user | free@demo.com | Free | Tier 2 |
| Premium user | premium@demo.com | Premium | Tier 4 |
| VIP user | vip@demo.com | VIP | Tier 5 |

Password for all: `password123`

---

## Project Structure

```
JoyMatcher/
│
├── README.md                        # This file
├── CLAUDE.md                        # AI implementation contract (v2.2.0)
├── RULES.md                         # Antigravity IDE contract (v1.1.0)
├── INSTALLATION.md                  # Setup and installation guide
│
├── .agent/                          # Agent skill system (Google Antigravity format)
│   └── skills/                      # 11 automation skills
│       ├── README.md
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
├── brain/                           # Implementation memory (Rails 8 progress tracking)
│   ├── README.md
│   ├── component-library-implementation.md
│   ├── design-system-audit.md
│   └── state/
│       ├── completed.md             # Done features
│       ├── in-progress.md           # Active work
│       └── planned.md               # 8-phase roadmap
│
├── docs/                            # Complete documentation suite (70+ files)
│   ├── DOCUMENTATION_INDEX.md
│   ├── DOCUMENTATION_STATUS.md
│   ├── Global Context/              # Product charter, tier system, personas
│   ├── Admin System/                # RBAC, VIP workflows, moderation
│   ├── Safety & Compliance/         # Legal (GDPR/NDPR/CCPA)
│   ├── Design System/               # Tailwind CSS v4, HTML guide, mobile
│   ├── Technical Specifications/    # Rails 8, database schema, API specs
│   ├── Marketing & Content/         # Testimonials, blog, social media
│   └── Feature Specifications/
│       ├── User Screens/            # 14 user-facing page specs
│       └── Admin Screens/           # 7 admin interface specs
│
├── rails_components/                # ✅ Production-ready Rails component library
│   ├── README.md                    # Setup guide (450 lines)
│   ├── COMPONENT_INDEX.md           # Quick reference (250 lines)
│   ├── FINAL_SUMMARY.md
│   ├── forms/                       # 12 form components (ERB partials)
│   ├── ui/                          # 37 UI components (ERB partials)
│   └── stimulus_controllers/        # 15 Stimulus JS controllers
│
└── prototype/                       # React/Vite prototype (25/30 pages)
    ├── README.md
    ├── PROTOTYPE_STATUS.md
    ├── package.json
    ├── vite.config.js
    ├── tailwind.config.js
    ├── src/
    │   ├── App.jsx                  # 25 routes
    │   ├── pages/
    │   │   ├── Home.jsx             # ✅
    │   │   ├── HowItWorks.jsx       # ✅
    │   │   ├── Pricing.jsx          # ✅
    │   │   ├── VIP.jsx              # ✅
    │   │   ├── Safety.jsx           # ✅
    │   │   ├── SuccessStories.jsx   # ✅
    │   │   ├── Contact.jsx          # ✅
    │   │   ├── FAQ.jsx              # ✅
    │   │   ├── Login.jsx            # ✅
    │   │   ├── Signup.jsx           # ✅
    │   │   ├── legal/               # Terms, Privacy, Guidelines, Accessibility ✅
    │   │   ├── app/                 # Dashboard, Discover, ProfileView, Interests, Messages, Notifications ✅
    │   │   └── admin/               # SuperAdmin, Moderator, VIPCoordinator, VIPExpert ✅
    │   └── components/
    │       ├── common/              # Button, Card
    │       └── layout/              # Layout, Navigation, Footer
    └── public/images/               # 50+ assets (profiles, couples, illustrations)
```

---

## Tech Stack

### Production — Rails 8

| Layer | Technology |
|---|---|
| Framework | Ruby on Rails 8 (Ruby 3.4.8) |
| Database | PostgreSQL 16+ |
| Authentication | BCrypt (`has_secure_password`) |
| Authorization | CanCanCan (admin RBAC) |
| Frontend | Hotwire — Turbo Drive, Turbo Frames, Turbo Streams, Stimulus |
| UI Components | ViewComponents + `/rails_components/` library |
| Styling | Tailwind CSS v4 (Propshaft asset pipeline) |
| JavaScript | Importmap-rails (ESM, no bundler) |
| Forms | SimpleForm |
| Pagination | Pagy |
| State Machines | AASM |
| Background Jobs | Solid Queue (Rails 8 default) |
| Caching | Solid Cache (database-backed) |
| WebSockets | Solid Cable (Rails 8 default) |
| File Storage | ActiveStorage (S3-compatible) |
| Payments | Stripe |
| Deployment | Kamal |

### Prototype — React

| Layer | Technology |
|---|---|
| Framework | React 19.2.0 |
| Build Tool | Vite 6.0.11 |
| Styling | Tailwind CSS v4 |
| State | JavaScript in-memory (no backend) |
| Routing | React Router |

### Mobile — Planned

- iOS: Swift + SwiftUI
- Android: Kotlin + Jetpack Compose
- API: RESTful + WebSocket

---

## Core Concepts

### 5-Tier Progressive Disclosure System

| Tier | Name | Who Can Access | Subscription Required |
|---|---|---|---|
| 1 | Identity & Intent | All users | Free |
| 2 | Personal Values | Reciprocal request | Free |
| 3 | Family & Background | Reciprocal request | Premium |
| 4 | Health & Wellbeing | Reciprocal request | Premium |
| 5 | Financial & Verified | KYC + VIP only | VIP |

**Rules:**
- Users cannot share Tier N without completing Tier N-1
- Free users are hard-capped at Tier 2 completion
- Premium users are hard-capped at Tier 4 completion
- Revoking a shared tier is symmetric — if you revoke Tier 3, they lose your Tier 3 too

### EDT — Effective Disclosure Tier

The EDT is the actual level of profile information two users can see from each other. It is always the minimum across four values:

```
EDT = min(
  yourCompletedTier,
  theirCompletedTier,
  tierYouSharedWithThem,
  tierTheySharedWithYou
)
```

**Example:**

| Value | Amount |
|---|---|
| You completed | Tier 4 |
| They completed | Tier 3 |
| You shared with them | Tier 2 |
| They shared with you | Tier 3 |
| **EDT** | **Tier 2** |

### Subscription Tiers

| Plan | Price (NGN) | Price (USD) | Tier Ceiling | Show Interest To |
|---|---|---|---|---|
| Free | ₦0 | $0 | Tier 2 | Free users only |
| Premium | ₦18,000/mo | $18/mo | Tier 4 | Free + Premium |
| Premium Quarterly | ₦45,000/qtr | $45/qtr | Tier 4 | Free + Premium |
| VIP | ₦200,000+ | $200+ | Tier 5 | Anyone |

**Currency rule:** Nigerian users always see ₦. Non-Nigerian users always see $. Never mixed.

### Show Interest Gating

- Users must send a "Show Interest" before viewing a full profile or messaging
- Messaging only unlocks after **both parties** mutually accept
- A declined Show Interest triggers a **3-month cooldown** before re-sending is allowed
- Free users get 5 Show Interests per month; Premium and VIP get unlimited

---

## Admin System

### 6 Admin Roles

| Role | Scope |
|---|---|
| Super Admin | Full platform access |
| Moderator | Content moderation — photos, profiles, user reports |
| VIP Coordinator | VIP applications, Tier 5 verification, expert assignment |
| VIP Expert (Freelance) | Matchmaking — sees **only** their assigned VIP clients |
| Data Protection Officer | GDPR/NDPR compliance oversight |
| Support Agent | Customer support, account management |

### VIP Expert Isolation (Critical)

VIP Experts are freelance contractors with strict data isolation enforced at the database, API, and UI layers:

- Can only access profiles of their explicitly assigned VIP clients
- Cannot search, browse, or view any other users
- Conflict-of-interest policy: one expert cannot manage two VIP clients who are interested in each other

### VIP Workflow

1. Premium user completes Tier 4 → VIP application unlocked
2. 18-question application submitted → VIP Coordinator reviews
3. Application approved → Tier 5 unlocked
4. ID + video KYC uploaded → VIP Coordinator verifies
5. Payment processed → VIP status activated
6. VIP Coordinator assigns expert based on compatibility
7. Expert conducts 60–90 min onboarding session
8. Expert searches matches, creates introductions on client's behalf
9. Monthly check-ins and ongoing coaching

---

## Safety & Compliance

### Legal Standards

| Standard | Status |
|---|---|
| GDPR (EU) | ✅ Compliant |
| NDPR (Nigeria) | ✅ Compliant |
| CCPA (California) | ✅ Compliant |
| WCAG 2.1 AA (Accessibility) | ✅ Target met |

### Key Safety Features

- Zero-tolerance harassment policy
- Right to deletion (30-day grace period, GDPR Article 17)
- 7-year anonymized data retention for legal compliance
- Tier 5 KYC verification (government ID + video selfie)
- Photo and profile moderation before going live
- Spam detection with rate limiting and pattern analysis
- Block and report system on all user interactions

---

## Development Roadmap

### Phase 1: Foundation — ✅ Complete

- [x] 70+ specification documents
- [x] React/Vite prototype (25/30 pages)
- [x] 11 agent skills
- [x] Rails component library (64 components)
- [x] Brain state tracking system

### Phase 2: React Prototype — 🚧 83% Complete

- [x] All public pages (10/10)
- [x] All legal pages (4/4)
- [x] Core app pages (6/8) — Dashboard, Discover, Profile View, Interests, Messages, Notifications
- [x] All admin dashboards (4/4)
- [ ] Settings page
- [ ] Tier Completion page

### Phase 3: Rails 8 Backend — ⏳ Next

**Phase 3.1 — Rails Foundation**
- [ ] Rails 8 project setup (PostgreSQL, Tailwind, Hotwire)
- [ ] User model and authentication (BCrypt)
- [ ] Tier system models and validations

**Phase 3.2 — Core Business Logic**
- [ ] EDT calculation engine
- [ ] Show Interest flow with cooldown enforcement
- [ ] Subscription logic with Stripe

**Phase 3.3 — Admin System**
- [ ] Admin RBAC with CanCanCan
- [ ] VIP workflow (application → verification → assignment)

**Phase 3.4 — Communication**
- [ ] Real-time messaging (Turbo Streams)
- [ ] Notifications (Action Cable)

**Phase 3.5 — UI & Polish**
- [ ] ViewComponents integration
- [ ] Design system tokens
- [ ] WCAG 2.1 AA accessibility pass

### Phase 4: Mobile — ⏳ Planned

- [ ] iOS app (Swift + SwiftUI)
- [ ] Android app (Kotlin + Compose)
- [ ] RESTful API + WebSocket

See [brain/state/planned.md](brain/state/planned.md) for the full 8-phase roadmap.

---

## Key Documentation

### Start Here

| File | Purpose |
|---|---|
| [docs/Global Context/tier_system.md](docs/Global%20Context/tier_system.md) | **MASTER REFERENCE** — tier definitions and rules |
| [docs/Global Context/product_charter.md](docs/Global%20Context/product_charter.md) | Product vision and philosophy |
| [CLAUDE.md](CLAUDE.md) | AI implementation contract (v2.2.0) |
| [docs/DOCUMENTATION_INDEX.md](docs/DOCUMENTATION_INDEX.md) | Index of all 70+ docs |

### Technical Implementation

| File | Purpose |
|---|---|
| [docs/Technical Specifications/rails_architecture.md](docs/Technical%20Specifications/rails_architecture.md) | Rails 8 architecture guide |
| [docs/Technical Specifications/data_models.md](docs/Technical%20Specifications/data_models.md) | Database schema |
| [docs/Technical Specifications/show_interest_flow.md](docs/Technical%20Specifications/show_interest_flow.md) | Show Interest gating logic |
| [docs/Technical Specifications/edt_specification.md](docs/Global%20Context/edt_specification.md) | EDT calculation algorithm |

### Component Library

| File | Purpose |
|---|---|
| [rails_components/README.md](rails_components/README.md) | Setup and usage guide |
| [rails_components/COMPONENT_INDEX.md](rails_components/COMPONENT_INDEX.md) | Quick component reference |

### Design System

| File | Purpose |
|---|---|
| [docs/Design System/design_system.md](docs/Design%20System/design_system.md) | Complete design tokens |
| [docs/Design System/html_implementation_guide.md](docs/Design%20System/html_implementation_guide.md) | HTML/Tailwind implementation examples |
| [docs/Design System/accessibility_patterns.md](docs/Design%20System/accessibility_patterns.md) | WCAG 2.1 AA patterns |

### Feature Specifications

| Path | Purpose |
|---|---|
| [docs/Feature Specifications/User Screens/](docs/Feature%20Specifications/User%20Screens/) | 14 user-facing page specs |
| [docs/Feature Specifications/Admin Screens/](docs/Feature%20Specifications/Admin%20Screens/) | 7 admin interface specs |

---

## Contributing

This is a proprietary project. External contributions are not accepted at this time.

---

## License

**Copyright © 2026 JoyMatcher Limited. All rights reserved.**

This project is proprietary and not licensed for external use.

---

*Built with careful attention to trust, consent, and marriage-oriented matchmaking.*
