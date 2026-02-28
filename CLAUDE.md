# Trust-Based Matchmaking Platform — System Contract for Claude

**Version:** 2.0.0
**Last Updated:** 2026-02-27
**Purpose:** Guide Claude in building JoyMatcher prototype aligned with documentation

---

## ⚠️ CRITICAL: Read This First

**This React prototype is NOT production code.**

- **Production:** Will be built with **Rails 8** from scratch
- **Prototype:** React/Vite for rapid UI/UX validation only
- **Purpose:** Visual reference, user testing, design system documentation

**Do NOT port React code to Rails** - rebuild with Rails conventions.

---

# 1. Mandatory Rule: Read `docs/` Before Anything

Before generating **any code**, Claude must:

1. **Read the entire `docs/` directory** (70+ files)
2. **Extract and understand:**
   - Product philosophy and positioning
   - 5-tier progressive disclosure system
   - Effective Disclosure Tier (EDT) calculation
   - Show Interest gating mechanism
   - Subscription tier logic and ceilings
   - VIP concierge workflow
   - Admin RBAC and data isolation
   - Safety and compliance requirements

3. **Build mental model of:**
   - User journeys (Free → Premium → VIP)
   - Tier completion flows
   - EDT enforcement in UI
   - Show Interest → Message unlock
   - VIP application → verification → assignment
   - Admin role permissions and isolation

Claude must **NOT** start implementation until it confirms alignment with documentation.

---

## 1.1 Documentation Structure (Single Source of Truth)

### 📁 Global Context (Foundation)
**Read FIRST for core system understanding:**
- `product_charter.md` - Mission, positioning, brand voice
- `tier_system.md` - **MASTER REFERENCE** for 5-tier system
- `edt_specification.md` - EDT calculation algorithm
- `user_personas.md` - Primary users (Chioma & Kwame)
- `user_journeys.md` - Complete user flows
- `sitemap.md` - All 70+ pages mapped

### 📁 Admin System
**Critical for admin dashboard implementation:**
- `admin_architecture.md` - Complete RBAC design ✅
- `admin_roles_permissions.md` - Permission matrices ✅
- `vip_expert_isolation.md` - Freelance expert data isolation ✅
- `moderation_workflows.md` - Content moderation procedures ✅
- `vip_coordination.md` - VIP management workflows ✅

### 📁 Safety & Compliance
**Non-negotiable requirements:**
- `safety_system.md` - Reporting, blocking, anti-harassment
- `content_moderation.md` - Photo/profile moderation
- `legal_compliance.md` - GDPR, NDPR compliance
- `data_management.md` - Data retention and deletion
- `terms_of_service.md` - Legal terms
- `privacy_policy.md` - Privacy compliance
- `community_guidelines.md` - User conduct rules

### 📁 Technical Specifications
**Implementation details:**
- `show_interest_flow.md` - Show Interest gating logic
- `request_details_flow.md` - Reciprocal tier negotiation
- `subscription_tier_ceiling.md` - Subscription-to-tier mapping
- `vip_application_workflow.md` - VIP screening process
- `tier5_verification_procedure.md` - ID + Video KYC
- `data_models.md` - Database schema
- `rails_architecture.md` - Rails 8 production architecture

### 📁 Design System
**Visual standards:**
- `design_system.md` - Comprehensive Tailwind CSS v4 system
- `component_library.md` - Reusable components
- `typography_system.md` - Font scales and usage
- `color_system.md` - Brand color palette
- `spacing_system.md` - Layout grids
- `responsive_design.md` - Breakpoints
- `accessibility_patterns.md` - WCAG 2.1 AA compliance

### 📁 Feature Specifications
**Screen-by-screen specs:**
- `User Screens/*.md` - 15+ user-facing screens
- `Admin Screens/*.md` - 8+ admin dashboards
- Each file contains detailed wireframes and logic

### 📁 Marketing & Content
**Public-facing content:**
- `testimonials_system.md` - Success story management
- `blog_architecture.md` - Blog platform
- `content_strategy.md` - Marketing guidelines
- `social_media_guidelines.md` - Social sharing rules

---

## 1.2 Required Pre-Implementation Output

Before writing any code, Claude must output:

✅ **Read the brain FIRST (MANDATORY)**
- `brain/state/completed.md` - What's already built?
- `brain/state/in-progress.md` - What's being worked on?
- `brain/state/planned.md` - What's next in roadmap?
- Relevant `brain/XX-feature-name.md` implementation files

✅ **Summary of system understanding**
- Key principles (trust-based, marriage-focused, consent-driven)
- Tier system overview (1-5 tiers, EDT formula)
- Subscription tiers (Free, Premium, VIP)
- Admin roles (Super Admin, Moderator, VIP Coordinator, VIP Expert)

✅ **Identified key flows**
- Signup → Tier completion → Discover → Show Interest → Messages
- Free → Premium upgrade path
- Premium → VIP application → verification → expert assignment
- Admin moderation → report review → action taken

✅ **Identified constraints**
- EDT must gate all profile visibility
- Show Interest required before messaging
- Subscription ceiling prevents tier completion
- VIP Expert CANNOT see unassigned clients
- No cold messaging allowed
- 3-month cooldown on Show Interest decline

✅ **Any ambiguities found in docs**
- Ask clarifying questions before proceeding

✅ **Implementation plan**
- Page build order
- Component reuse strategy
- State simulation approach

✅ **Update brain/state/in-progress.md** - Mark feature as in-progress

Only after this confirmation may implementation begin.

---

# 2. Project Purpose

This project is a **high-fidelity React prototype** for:

✅ Simulating user flows (signup → match → conversation)
✅ Validating tier logic (EDT calculation, visibility rules)
✅ Testing consent gating (Show Interest requirement)
✅ Prototyping disclosure reciprocity (tier request/share)
✅ Demonstrating upgrade friction (subscription ceilings)
✅ Positioning VIP authority (concierge vs self-serve)

**NOT production code** - uses:
- Simulated JavaScript state (no backend)
- No authentication system
- No database
- No real payments
- No API calls

**Production will be Rails 8** - this is validation/reference only.

---

# 3. Source of Truth Hierarchy

If conflicts occur:

1. **`docs/` folder is authoritative** - always defers to documentation
2. **Product philosophy overrides UI preference** - trust > convenience
3. **Tier rules override UX convenience** - EDT is non-negotiable
4. **Consent rules override growth optimization** - Show Interest required
5. **Admin isolation overrides convenience** - VIP Expert sees ONLY assigned

Claude must **never weaken trust rules for simplicity.**

---

# 4. Project Structure (Current Implementation)

```plaintext
/project-root
│
├── docs/                           ← Single source of truth (70+ files)
│   ├── Global Context/
│   ├── Admin System/
│   ├── Safety & Compliance/
│   ├── Technical Specifications/
│   ├── Design System/
│   ├── Feature Specifications/
│   └── Marketing & Content/
│
├── .agent/skills/                  ← Agent skills (Google Antigravity format)
│   ├── documentation-consultation/   ← Skill #1 (PREREQUISITE)
│   ├── brain-update/                 ← Skill #2 (MANDATORY before/after implementation)
│   ├── tier-system-enforcement/      ← Skill #3
│   ├── edt-calculation/              ← Skill #4 (with scripts/)
│   ├── show-interest-gating/         ← Skill #5
│   ├── subscription-tier-logic/      ← Skill #6
│   ├── admin-rbac-verification/      ← Skill #7
│   ├── anti-gravity-checking/        ← Skill #8 (with resources/)
│   ├── rails-development/            ← Skill #9 (Rails 8 + Hotwire)
│   ├── design-system-application/    ← Skill #10 (with assets/)
│   └── vip-workflow-implementation/  ← Skill #11
│
├── brain/                          ← Implementation memory (Rails 8 progress)
│   ├── README.md                      ← Brain structure and purpose
│   ├── XX-feature-name.md             ← Implementation files
│   ├── decisions/                     ← Architectural decisions
│   ├── learnings/                     ← Lessons learned
│   └── state/
│       ├── completed.md               ← ✅ Done features
│       ├── in-progress.md             ← 🔄 Current work
│       └── planned.md                 ← ⏳ Roadmap (Phase 1-8)
│
├── rails_components/               ← ✅ Rails Component Library (64 components)
│   ├── README.md                      ← Setup and usage guide (450 lines)
│   ├── COMPONENT_INDEX.md             ← Quick reference (250 lines)
│   ├── FINAL_SUMMARY.md               ← Project summary
│   ├── forms/                         ← 12 Form components
│   │   ├── _text_input.html.erb
│   │   ├── _textarea.html.erb
│   │   ├── _select.html.erb
│   │   ├── _checkbox.html.erb
│   │   ├── _radio_group.html.erb
│   │   ├── _switch.html.erb
│   │   ├── _file_upload.html.erb
│   │   ├── _slider.html.erb
│   │   ├── _date_picker.html.erb
│   │   ├── _search.html.erb
│   │   ├── _tag_input.html.erb
│   │   └── _form_group.html.erb
│   ├── ui/                            ← 37 UI components
│   │   ├── _button.html.erb
│   │   ├── _card.html.erb
│   │   ├── _accordion.html.erb
│   │   ├── _modal.html.erb
│   │   ├── _toast.html.erb
│   │   ├── _alert.html.erb
│   │   ├── _badge.html.erb
│   │   ├── _avatar.html.erb
│   │   ├── _progress_bar.html.erb
│   │   ├── _breadcrumbs.html.erb
│   │   ├── _pagination.html.erb
│   │   ├── _tabs.html.erb
│   │   ├── _steps.html.erb
│   │   ├── _dropdown.html.erb
│   │   ├── _tooltip.html.erb
│   │   ├── _skip_link.html.erb
│   │   ├── _spinner.html.erb
│   │   ├── _skeleton.html.erb
│   │   ├── _list.html.erb
│   │   ├── _description_list.html.erb
│   │   ├── _stat.html.erb
│   │   ├── _tag.html.erb
│   │   ├── _chip.html.erb
│   │   ├── _timeline.html.erb
│   │   ├── _kbd.html.erb
│   │   ├── _empty_state.html.erb
│   │   ├── _divider.html.erb
│   │   ├── _drawer.html.erb
│   │   ├── _collapsible.html.erb
│   │   ├── _stack.html.erb
│   │   ├── _grid.html.erb
│   │   ├── _icon_button.html.erb
│   │   ├── _button_group.html.erb
│   │   ├── _image.html.erb
│   │   ├── _icon.html.erb
│   │   ├── _status_indicator.html.erb
│   │   └── _verification_badge.html.erb
│   └── stimulus_controllers/          ← 15 Stimulus controllers
│       ├── accordion_controller.js
│       ├── modal_controller.js
│       ├── toast_controller.js
│       ├── switch_controller.js
│       ├── character_count_controller.js
│       ├── dismissible_controller.js
│       ├── file_upload_controller.js
│       ├── slider_controller.js
│       ├── search_controller.js
│       ├── tag_input_controller.js
│       ├── tabs_controller.js
│       ├── dropdown_controller.js
│       ├── tooltip_controller.js
│       ├── drawer_controller.js
│       └── collapsible_controller.js
│
├── prototype/                      ← React + Vite + Tailwind CSS v4
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Home.jsx           ✅ COMPLETED
│   │   │   ├── HowItWorks.jsx     ✅ COMPLETED
│   │   │   ├── Pricing.jsx        ✅ COMPLETED
│   │   │   ├── VIP.jsx            ✅ COMPLETED
│   │   │   ├── Safety.jsx         ✅ COMPLETED
│   │   │   ├── SuccessStories.jsx ✅ COMPLETED
│   │   │   ├── Contact.jsx        ✅ COMPLETED
│   │   │   ├── FAQ.jsx            ✅ COMPLETED
│   │   │   ├── Login.jsx          ✅ COMPLETED
│   │   │   ├── Signup.jsx         ✅ COMPLETED
│   │   │   │
│   │   │   ├── /legal
│   │   │   │   ├── Terms.jsx                ✅ COMPLETED
│   │   │   │   ├── Privacy.jsx              ✅ COMPLETED
│   │   │   │   ├── CommunityGuidelines.jsx  ✅ COMPLETED
│   │   │   │   └── Accessibility.jsx        ✅ COMPLETED
│   │   │   │
│   │   │   ├── /app (Authenticated User Pages)
│   │   │   │   ├── Dashboard.jsx       ✅ COMPLETED
│   │   │   │   ├── Discover.jsx        ✅ COMPLETED
│   │   │   │   ├── ProfileView.jsx     ✅ COMPLETED (EDT demo)
│   │   │   │   ├── Interests.jsx       ✅ COMPLETED (3-tab)
│   │   │   │   ├── Messages.jsx        ✅ COMPLETED
│   │   │   │   ├── Notifications.jsx   ✅ COMPLETED
│   │   │   │   ├── Settings.jsx        ⏳ PENDING
│   │   │   │   └── TierCompletion.jsx  ⏳ PENDING
│   │   │   │
│   │   │   └── /admin (Admin Dashboards)
│   │   │       ├── SuperAdminDashboard.jsx       ✅ COMPLETED
│   │   │       ├── ModeratorDashboard.jsx        ✅ COMPLETED
│   │   │       ├── VIPCoordinatorDashboard.jsx   ✅ COMPLETED
│   │   │       └── VIPExpertDashboard.jsx        ✅ COMPLETED
│   │   │
│   │   ├── components/
│   │   │   ├── /ui
│   │   │   │   ├── Button.jsx     ✅ COMPLETED
│   │   │   │   ├── Card.jsx       ✅ COMPLETED
│   │   │   │   └── Input.jsx      ✅ COMPLETED
│   │   │   │
│   │   │   └── /layout
│   │   │       ├── Layout.jsx     ✅ COMPLETED
│   │   │       ├── Header.jsx     ✅ COMPLETED
│   │   │       └── Footer.jsx     ✅ COMPLETED
│   │   │
│   │   └── App.jsx                ✅ COMPLETED (25 routes)
│   │
│   └── public/images/             ✅ COMPLETED (50+ assets)
│
└── CLAUDE.md                      ✅ THIS FILE
```

**Status:** 25/30 pages complete (83%)

---

# 5. Documentation Extraction Requirements

From `docs/`, Claude must extract and model:

## 5.1 Tier Engine (`tier_system.md` - MASTER REFERENCE)

- **Tier 1:** Basic (Name, Age, Location, Occupation)
- **Tier 2:** Lifestyle (Faith, Hobbies, Habits, Values)
- **Tier 3:** Family & Future (Marriage vision, Children, Relocation)
- **Tier 4:** Past & Personality (Relationship history, Deal-breakers)
- **Tier 5:** Verification (ID + Video KYC - VIP only)

**Mandatory completion rule:** Cannot share Tier 3 without completing Tier 2
**Subscription ceiling rule:** Free users stop at Tier 2, Premium at Tier 4
**EDT formula:** `min(yourCompleted, theirCompleted, youShared, theyShared)`
**Revocation symmetry:** If you revoke Tier 3, they lose your Tier 3 too
**Disclosure negotiation:** Request higher tier access (may be granted/denied)

## 5.2 Interaction Engine (`show_interest_flow.md`)

- **Show Interest requirement:** MUST send before viewing full profile
- **Cooldown rule:** 3-month cooldown if declined
- **Access matrix:**
  - Free: 5 Show Interest/month, basic profiles
  - Premium: Unlimited Show Interest, see who's interested
  - VIP: Expert sends introductions on your behalf
- **Messaging unlock logic:** Both parties must mutually accept
- **Detail request gating:** Can request higher tier (requires their consent)

## 5.3 Pricing Rules (`pricing_spec.md`)

**Currency rules:**
- ₦ (Naira) for Nigerian users (country: "NG")
- $ (Dollars) for non-Nigerian users
- **NEVER mix currencies in single UI**

**Subscription prices:**
- **Premium Monthly:** ₦18,000 / $18
- **Premium Quarterly:** ₦45,000 / $45 (save 17%)
- **VIP 3-Month:** ₦200,000+ / $200+
- **VIP 6-Month:** ₦350,000+ / $350+
- **VIP 12-Month:** ₦600,000+ / $600+

## 5.4 Admin RBAC (`admin_architecture.md`)

**Role Hierarchy:**
1. **Super Admin** - Full platform control
2. **Moderator** - Content safety (reports, photos, profiles)
3. **VIP Coordinator** - VIP lifecycle (applications, verification, assignments)
4. **VIP Expert** - Freelance matchmaker (ISOLATED to assigned clients only)
5. **Data Protection Officer** - GDPR/NDPR compliance
6. **Support Agent** - Customer support

**Critical Isolation Rule:**
VIP Experts (freelance contractors) can ONLY access assigned VIP clients.
NO search, NO browse, NO access to other users. Enforced at database, API, and UI layers.

## 5.5 VIP Workflow (`vip_coordination.md`)

1. Premium user completes Tier 4 → VIP application unlocked
2. Submit 18-question application → VIP Coordinator reviews
3. Application approved → Tier 5 unlocked
4. Upload ID + Video KYC → VIP Coordinator verifies
5. Payment (₦200K+ / $200+) → VIP status activated
6. VIP Coordinator assigns to best-fit expert
7. Expert conducts 60-90min onboarding session
8. Expert searches matches, creates introductions
9. Ongoing coaching and monthly check-ins
10. Success tracking and feedback

---

# 6. State Simulation Requirements

All logic must be simulated using:
- JavaScript state objects (no backend)
- No APIs, no databases
- Hardcoded mock data for demo

## 6.1 Global User Model (Simulated)

```js
const currentUser = {
  id: 'user_001',
  email: 'kwame@example.com',
  name: 'Kwame M.',
  subscription: 'premium', // free | premium | vip
  completedTier: 3, // 0-5
  country: 'NG', // Determines currency
  showInterestRemaining: null, // null = unlimited (Premium/VIP)
  createdAt: '2026-01-15',
};
```

## 6.2 Relationship Model

```js
const relationship = {
  userId: 'user_002',
  status: 'pending', // none | pending | accepted | declined | cooldown
  sharedTierByCurrentUser: 2,
  sharedTierByOtherUser: 2,
  requestedTierByCurrentUser: 3, // null if none
  cooldownUntil: null, // Date if declined
  conversationId: null, // Set when accepted
};
```

## 6.3 Effective Disclosure Tier Logic

```js
function calculateEDT(currentUser, otherUser, relationship) {
  return Math.min(
    currentUser.completedTier,
    otherUser.completedTier,
    relationship.sharedTierByCurrentUser,
    relationship.sharedTierByOtherUser
  );
}

// Example:
// Your completed: 3
// Their completed: 4
// You shared: 2
// They shared: 3
// EDT = min(3, 4, 2, 3) = 2
```

Must be recalculated dynamically whenever any value changes.

---

# 7. UI & UX Identity Rules

Claude must strictly follow:

✅ **Calm, professional layout** - NOT flashy dating app
✅ **Neutral tones** - Purple-deep (#4D0052), Coral (#F16A6F)
✅ **Professional typography** - Playfair Display (serif), Inter (sans)
✅ **Structured spacing** - Consistent Tailwind spacing scale
✅ **Clear locked states** - Gray overlay + lock icon + upgrade CTA
✅ **No gamification** - No swipe gestures, no hearts, no "hot" rankings
✅ **No playful emojis** - Serious, marriage-oriented tone
✅ **Trust-focused hierarchy** - Emphasize safety, verification, intent

This is **structured relationship infrastructure**, NOT entertainment.

---

# 8. Required Interface Coverage

## Public Pages (✅ 11/11 Complete)

✅ Homepage (`/`)
✅ How It Works (`/how-it-works`)
✅ Pricing (`/pricing`)
✅ VIP (`/vip`)
✅ Safety (`/safety`)
✅ Success Stories (`/success-stories`)
✅ Contact (`/contact`)
✅ FAQ (`/faq`)
✅ Login (`/login`)
✅ Signup (`/signup`)

## Legal Pages (✅ 4/4 Complete)

✅ Terms of Service (`/legal/terms`)
✅ Privacy Policy (`/legal/privacy`)
✅ Community Guidelines (`/legal/community-guidelines`)
✅ Accessibility Statement (`/legal/accessibility`)

## Authenticated User Pages (✅ 6/8 Complete)

✅ Dashboard (`/app/dashboard`)
✅ Discover (`/app/discover`)
✅ Profile View (`/app/profile/:id`)
✅ Interests (`/app/interests`)
✅ Messages (`/app/messages`)
✅ Notifications (`/app/notifications`)
⏳ Settings (`/app/settings`) - PENDING
⏳ Tier Completion (`/app/tier-completion`) - PENDING

## Admin Pages (✅ 4/4 Complete)

✅ Super Admin Dashboard (`/admin/super-admin`)
✅ Moderator Dashboard (`/admin/moderator`)
✅ VIP Coordinator Dashboard (`/admin/vip-coordinator`)
✅ VIP Expert Dashboard (`/admin/vip-expert`)

**Total:** 25/30 pages complete (83%)

---

# 9. Implementation Discipline

Before generating each page, Claude must:

1. **Read brain first** - Check `brain/state/` for current progress
2. **Identify its role in user flow** - Where does this fit in journey?
3. **Identify required state inputs** - What data does page need?
4. **Identify tier implications** - Does EDT affect visibility?
5. **Identify subscription gating** - Free/Premium/VIP differences?
6. **Identify warning requirements** - Tier awareness warnings needed?

**No blind layout generation allowed.**

After completing page, Claude must:

1. **Create/update brain implementation file** (`brain/XX-feature-name.md`)
2. **Document decisions made** - Why this approach?
3. **Document challenges and solutions** - What problems occurred?
4. **Link to actual code** - File paths + line numbers
5. **Document learnings** - Insights for future work
6. **Update `brain/state/completed.md`** - Mark as done
7. **Remove from `brain/state/in-progress.md`** - Clear in-progress list

---

# 10. Modals Required (Pending Implementation)

Prototype must include:

⏳ **Tier Awareness Warning** - Before sending Show Interest
⏳ **Request Details Modal** - Request higher tier access
⏳ **Upgrade Modal** - Free → Premium, Premium → VIP
⏳ **Revocation Confirmation** - Symmetric tier revocation warning
⏳ **VIP Warning (VIP → Free)** - "You cannot initiate with Free users"

All must follow documentation rules in `Technical Specifications/`.

---

# 11. Forbidden Simplifications

Claude must **NOT**:

❌ Remove cooldown logic (3-month Show Interest cooldown)
❌ Remove EDT logic (profile visibility must respect EDT)
❌ Bypass subscription ceilings (Free stops at Tier 2, Premium at Tier 4)
❌ Allow cold messaging (Show Interest + mutual accept required)
❌ Allow Premium → VIP initiation (VIP Coordinator assigns)
❌ Mix currency displays (₦ and $ in same UI)
❌ Create swipe UX (no gamification, no "hot or not")
❌ Weaken admin isolation (VIP Expert sees ONLY assigned clients)

**Trust logic is non-negotiable.**

---

# 12. Pre-Coding Checklist (Claude Must Follow)

Before writing code:

- [ ] **Read brain first** (MANDATORY)
  - [ ] `brain/state/completed.md` - What's built?
  - [ ] `brain/state/in-progress.md` - Current work?
  - [ ] `brain/state/planned.md` - What's next?
  - [ ] Relevant `brain/XX-feature-name.md` files
- [ ] Read relevant `docs/` files for feature
- [ ] Summarize key rules from documentation
- [ ] Confirm subscription matrix (Free/Premium/VIP)
- [ ] Confirm tier definitions (1-5)
- [ ] Confirm pricing (₦ for NG, $ for others)
- [ ] Confirm interaction gating (Show Interest first)
- [ ] Confirm state simulation model (no backend)
- [ ] Present implementation plan
- [ ] **Update `brain/state/in-progress.md`** - Mark as in-progress

Only after confirmation may coding begin.

After completing feature:

- [ ] Create/update `brain/XX-feature-name.md` implementation file
- [ ] Document decisions, challenges, solutions, learnings
- [ ] Link to actual code (file paths + line numbers)
- [ ] Update `brain/state/completed.md`
- [ ] Remove from `brain/state/in-progress.md`

---

# 13. Rails 8 Production Development

**CRITICAL: React prototype is NOT production code.**

Production app will be built with **Rails 8 + Hotwire** from scratch.

### Rails 8 Stack (Production):
- **Rails 8.1.2:** Ruby on Rails with Ruby 3.3+
- **PostgreSQL:** Database
- **Hotwire:** Turbo Drive + Turbo Frames + Turbo Streams + Stimulus
- **ViewComponents:** Reusable UI components
- **Tailwind CSS v4:** Same design tokens as prototype (with Propshaft asset pipeline)
- **Importmap:** JavaScript with ESM
- **ActiveRecord:** Business logic in models
- **CanCanCan:** Authorization (admin RBAC)
- **BCrypt:** Authentication (has_secure_password)
- **Solid Queue:** Background jobs (Rails 8 default)
- **Solid Cache:** Database-backed caching
- **Solid Cable:** WebSockets (Rails 8 default)
- **SimpleForm:** Form builder
- **Pagy:** Pagination
- **AASM:** State machines
- **Stripe:** Subscription payments

### Prototype Purpose:
✅ Visual reference for ERB views
✅ Business logic documentation (JS → Ruby)
✅ Design system specification (Tailwind tokens port directly)
✅ User flow validation
✅ Stakeholder demo

### When Building Prototype:
✅ Keep components modular and clean
✅ Document business logic clearly (will translate to Ruby)
✅ Use standard Tailwind classes (same in Rails)
✅ Build semantic HTML (easy to convert to ERB)

### When Building Rails 8 Production:
✅ Use Turbo Frames for partial page updates
✅ Use Stimulus for lightweight JavaScript
✅ Use ViewComponents for reusable UI
✅ Implement business logic in ActiveRecord models
✅ Use Pundit for authorization

**DO NOT:**
❌ Port React components to Rails
❌ Use React/Vue/Angular in production
❌ Copy JavaScript state management patterns
❌ Ignore Hotwire best practices

**DO:**
✅ Rebuild with Rails conventions (Hotwire + ViewComponents)
✅ Translate JS tier logic to Ruby models
✅ Use Turbo Streams for real-time updates
✅ Use Stimulus for interactivity
✅ Use Solid Queue for background jobs
✅ Use Solid Cache for caching
✅ Use Solid Cable for WebSockets
✅ Use CanCanCan for authorization

See `.agent/skills/rails-development/` for Rails 8 + Hotwire implementation patterns.

---

# 13.1 Rails Component Library (Production-Ready)

**Location:** `/rails_components/`
**Status:** ✅ 64 components complete (100%)
**Based on:** Component Gallery analysis of 95 design systems

### Component Inventory

**Forms (12 components):**
- Text Input, Textarea, Select, Checkbox, Radio Group
- Switch, File Upload, Slider, Date Picker
- Search, Tag Input, Form Group

**UI Components (37 components):**
- **Feedback:** Button, Alert, Toast, Modal, Tooltip, Spinner, Skeleton, Progress Bar, Empty State
- **Navigation:** Breadcrumbs, Pagination, Tabs, Steps, Dropdown, Skip Link
- **Data Display:** Badge, Avatar, List, Description List, Stat, Tag, Chip, Timeline, Kbd, Status Indicator, Verification Badge
- **Containers:** Card, Accordion, Divider, Drawer, Collapsible, Stack, Grid, Button Group
- **Media:** Icon, Image, Icon Button

**Stimulus Controllers (15 controllers):**
- accordion, modal, toast, switch, character_count
- dismissible, file_upload, slider, search, tag_input
- tabs, dropdown, tooltip, drawer, collapsible

### Usage in Rails 8 Production

**Basic Usage:**
```erb
<%# Button %>
<%= render 'ui/button', text: 'Sign Up', variant: 'primary', size: 'large' %>

<%# Card with tier lock %>
<%= render 'ui/card', locked: true, tier_required: 3 do %>
  <h3>Family Background</h3>
  <p>This information is locked until you complete Tier 3.</p>
<% end %>

<%# Progress bar for tier completion %>
<%= render 'ui/progress_bar',
  value: @user.tier_completion_percentage,
  label: 'Profile Completion',
  variant: 'premium'
%>
```

**With SimpleForm:**
```erb
<%# Text Input %>
<%= render 'forms/text_input',
  name: 'user[name]',
  label: 'Full Name',
  placeholder: 'Enter your full name',
  required: true,
  icon_left: 'lucide:user'
%>

<%# File Upload %>
<%= render 'forms/file_upload',
  name: 'user[avatar]',
  label: 'Profile Photo',
  accept: 'image/*',
  max_size: 10,
  preview: true
%>

<%# Switch %>
<%= render 'forms/switch',
  name: 'user[email_notifications]',
  label: 'Email Notifications',
  description: 'Receive updates about your matches',
  checked: true
%>
```

**Navigation:**
```erb
<%# Tabs (Interests page pattern) %>
<%= render 'ui/tabs',
  tabs: [
    { id: 'sent', label: 'Sent', count: 5 },
    { id: 'received', label: 'Received', count: 12 }
  ],
  active: 'sent'
do |tab_id| %>
  <%# Content for each tab %>
<% end %>

<%# Pagination %>
<%= render 'ui/pagination',
  current_page: @page,
  total_pages: @total_pages,
  url: '/app/discover'
%>

<%# Breadcrumbs %>
<%= render 'ui/breadcrumbs', items: [
  { label: 'Dashboard', href: '/app/dashboard' },
  { label: 'Profile', href: '/app/profile' },
  { label: 'Edit' }
] %>
```

**Feedback Components:**
```erb
<%# Alert Banner %>
<%= render 'ui/alert',
  title: 'Tier Ceiling Reached',
  variant: 'warning',
  dismissible: true,
  action_text: 'Upgrade to Premium',
  action_href: '/pricing'
do %>
  <p>You cannot complete Tier 3 with a Free subscription.</p>
<% end %>

<%# Toast (via Stimulus) %>
<script>
  const toastController = document.querySelector('[data-controller="toast"]')
  if (toastController) {
    toastController.toast.show({
      variant: 'success',
      message: 'Profile updated successfully!',
      duration: 5000
    })
  }
</script>

<%# Spinner %>
<%= render 'ui/spinner', size: 'large', text: 'Loading your matches...' %>
```

### Design System Compliance

ALL components follow JoyMatcher's design system:

**Colors:**
- Primary: `#4D0052` (Purple Deep)
- Accent: `#F16A6F` (Coral)
- Gradient: `from-[#4D0052] to-[#F16A6F]`
- Backgrounds: Purple-tinted HSLA (320 hue)
- Text: `hsla(320,50%,15%,1)` (Primary)
- Borders: `hsla(320,25%,85%,1)`

**Typography:**
- Font: Georgia serif (`font-serif`) - NO sans-serif except labels
- Line Height: 1.6 (editorial quality)
- Sizes: xs, sm, base, lg, xl, 2xl, 3xl, 4xl, 5xl

**Shadows (Purple-tinted):**
- Subtle: `0 2px 8px rgba(77,0,82,0.08)`
- Moderate: `0 4px 16px rgba(77,0,82,0.12)`
- Pronounced: `0 8px 24px rgba(77,0,82,0.16)`

**Accessibility (WCAG 2.1 AA):**
- ARIA labels on all interactive elements
- Keyboard navigation (Tab, Enter, ESC, Arrows)
- Focus visible (`focus:ring-2 focus:ring-[#4D0052]`)
- Screen reader support
- 44x44px minimum touch targets

### Installation

```bash
# Copy components to Rails app
cp -r rails_components/forms app/views/forms
cp -r rails_components/ui app/views/ui

# Copy Stimulus controllers
cp -r rails_components/stimulus_controllers/* app/javascript/controllers/
```

**Add Toast Container to Layout:**
```erb
<!-- app/views/layouts/application.html.erb -->
<!DOCTYPE html>
<html>
  <head>
    <!-- ... -->
  </head>
  <body>
    <%= render 'ui/skip_link' %>
    <%= render 'ui/toast' %>

    <%= yield %>
  </body>
</html>
```

### JoyMatcher-Specific Features

**Tier Lock Support:**
```erb
<%= render 'ui/card', locked: true, tier_required: 3 do %>
  <p>Family Background information (Tier 3)</p>
<% end %>
```

**Verification Badge:**
```erb
<%= render 'ui/verification_badge', tier: 5, type: 'id_verified' %>
<%= render 'ui/verification_badge', tier: 5, type: 'video_verified' %>
<%= render 'ui/verification_badge', type: 'premium' %>
<%= render 'ui/verification_badge', type: 'vip' %>
```

**Tier Progress:**
```erb
<%= render 'ui/progress_bar',
  value: @user.tier_completion_percentage,
  label: 'Profile Completion',
  variant: 'premium'
%>
```

**Status Indicators:**
```erb
<%= render 'ui/status_indicator', status: 'online' %>
<%= render 'ui/status_indicator', status: 'offline' %>
<%= render 'ui/status_indicator', status: 'busy' %>
<%= render 'ui/status_indicator', status: 'away' %>
```

### Documentation

- **README:** `/rails_components/README.md` (450 lines)
- **Component Index:** `/rails_components/COMPONENT_INDEX.md` (250 lines)
- **Final Summary:** `/rails_components/FINAL_SUMMARY.md`
- **Implementation Memory:** `/brain/component-library-implementation.md`
- **Design Audit:** `/brain/design-system-audit.md`

### Key Principles

✅ **Georgia serif font** - NEVER sans-serif except helper text
✅ **Purple-tinted shadows** - rgba(77,0,82,0.XX)
✅ **HSLA backgrounds** - 320 hue for all backgrounds
✅ **ARIA labels** - All interactive elements
✅ **Keyboard navigation** - Tab, Enter, ESC, Arrows
✅ **Focus visible** - Never `outline: none`
✅ **Screen reader support** - Semantic HTML + ARIA
✅ **44x44px touch targets** - Minimum size
✅ **WCAG 2.1 AA contrast** - 4.5:1 text, 3:1 interactive

### When Building Rails 8 Production

**DO:**
✅ Use these components as-is (no modification needed)
✅ Copy to `app/views/forms/` and `app/views/ui/`
✅ Copy Stimulus controllers to `app/javascript/controllers/`
✅ Reference in feature specifications
✅ Extend with JoyMatcher-specific logic (EDT, Show Interest, etc.)

**DON'T:**
❌ Modify core component styling (maintains consistency)
❌ Remove accessibility features
❌ Change font to sans-serif
❌ Remove ARIA labels or keyboard navigation
❌ Use React prototype components instead

---

# 14. Final Reminder

**This is NOT a dating app.**

This is:

✅ **Consent-driven** - Show Interest gates all interaction
✅ **Investment-filtered** - Subscription demonstrates seriousness
✅ **Reciprocity-enforced** - EDT ensures matching depth
✅ **Marriage-oriented** - Positioning as relationship infrastructure
✅ **Verification-aware** - Tier 5 for VIP trust
✅ **VIP-curated** - Expert matchmakers, not self-serve browsing

**Every line of code must respect that.**

---

## Documentation References

For complete specifications, see:

📚 **Core References:**
- `/docs/Global Context/tier_system.md` - Tier definitions (MASTER)
- `/docs/Global Context/edt_specification.md` - EDT calculation
- `/docs/Admin System/admin_architecture.md` - Admin RBAC
- `/docs/Safety & Compliance/anti_gravity_rules.md` - Exploitation prevention
- `/docs/Technical Specifications/show_interest_flow.md` - Interaction gating

📚 **Implementation Guides:**
- `/docs/Design System/design_system.md` - Complete design tokens
- `/docs/Feature Specifications/` - Screen-by-screen specs
- `/docs/Technical Specifications/data_models.md` - Database schema
- `/rails_components/README.md` - Rails component library (64 components)
- `/rails_components/COMPONENT_INDEX.md` - Quick component reference

📚 **Agent Skills (Google Antigravity):**
- `/.agent/skills/README.md` - All 11 skills overview
- `/.agent/skills/documentation-consultation/` - Read docs first (PREREQUISITE)
- `/.agent/skills/brain-update/` - Read/update brain (MANDATORY)
- `/.agent/skills/rails-development/` - Rails 8 + Hotwire patterns
- `/.agent/skills/edt-calculation/scripts/` - EDT calculator script
- `/.agent/skills/anti-gravity-checking/resources/` - Violation checklist
- `/.agent/skills/design-system-application/assets/` - Color palette

📚 **Status Tracking:**
- `/docs/DOCUMENTATION_INDEX.md` - All 70+ docs indexed
- `/prototype/PROTOTYPE_STATUS.md` - Current build status
- `/brain/README.md` - Implementation memory structure
- `/brain/state/` - Rails 8 development progress (completed/in-progress/planned)

---

**Version:** 2.2.0 (Updated Rails 8 stack: Solid Queue/Cache/Cable + CanCanCan)
**Maintained By:** Product & Engineering Teams
**Last Updated:** 2026-02-27
