# JoyMatcher System Rules — Contract for Antigravity IDE

**Version:** 1.0.0
**Last Updated:** 2026-02-27
**Purpose:** Guide Antigravity IDE in building JoyMatcher with documentation-first approach

---

## ⚠️ CRITICAL: Read Documentation First

**Before generating ANY code, Antigravity must:**

1. **Read `/docs/` directory** (70+ specification files)
2. **Understand core principles:**
   - Trust-based matchmaking (NOT a dating app)
   - Progressive disclosure (5-tier system)
   - Consent-gated interaction (Show Interest required)
   - Investment filtering (subscription demonstrates seriousness)
   - Marriage-oriented positioning
3. **Never weaken trust rules for convenience**

---

## Technology Stack

### Prototype (Current - React)
- **Framework:** React 19.2.0 + Vite
- **Styling:** Tailwind CSS v4 (custom jm-* design tokens)
- **Routing:** React Router DOM
- **State:** Simulated (no backend)
- **Purpose:** UI/UX validation, user testing, design reference

**⚠️ React code is NOT production code** - for rapid prototyping only.

### Production (Building - Rails 8.1.2)
- **Framework:** Ruby on Rails 8.1.2
- **Ruby:** 3.3+
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
- **Countries/Holidays:** Countries, Holidays gems
- **Observability:** OpenTelemetry
- **Deployment:** Kamal

**We are building Rails 8 from scratch** - React prototype is documentation/visual reference only.
**Never port React code to Rails** - rebuild with Hotwire patterns (see `.agent/skills/rails-development/`).

---

## Documentation Structure

### 📁 Global Context (Read FIRST)
**Core system architecture:**
- `tier_system.md` - **MASTER REFERENCE** for 5-tier system
- `edt_specification.md` - EDT calculation formula
- `product_charter.md` - Mission and positioning
- `user_personas.md` - Target users (Chioma & Kwame)
- `user_journeys.md` - End-to-end flows
- `sitemap.md` - All 70+ pages mapped

### 📁 Admin System
**Role-based access control:**
- `admin_architecture.md` - Complete RBAC design
- `admin_roles_permissions.md` - Permission matrices
- `vip_expert_isolation.md` - Freelance expert data isolation
- `moderation_workflows.md` - Content moderation
- `vip_coordination.md` - VIP lifecycle management

### 📁 Safety & Compliance
**Security and legal requirements:**
- `safety_system.md` - Reporting and blocking
- `anti_gravity_rules.md` - Prevent system exploitation
- `content_moderation.md` - Photo/profile moderation
- `legal_compliance.md` - GDPR/NDPR compliance
- `terms_of_service.md` - Legal terms
- `privacy_policy.md` - Privacy compliance
- `community_guidelines.md` - User conduct

### 📁 Technical Specifications
**Implementation details:**
- `show_interest_flow.md` - Interaction gating logic
- `request_details_flow.md` - Tier negotiation
- `subscription_tier_ceiling.md` - Subscription limits
- `vip_application_workflow.md` - VIP screening
- `tier5_verification_procedure.md` - ID + Video KYC
- `data_models.md` - Database schema
- `rails_architecture.md` - Rails 8 structure

### 📁 Design System
**Visual standards:**
- `design_system.md` - Tailwind CSS v4 tokens
- `component_library.md` - Reusable components
- `typography_system.md` - Font scales
- `color_system.md` - Brand palette
- `spacing_system.md` - Layout grids
- `responsive_design.md` - Breakpoints
- `accessibility_patterns.md` - WCAG 2.1 AA

### 📁 Feature Specifications
**Screen-by-screen specs:**
- `User Screens/*.md` - 15+ user pages
- `Admin Screens/*.md` - 8+ admin dashboards

### 📁 Agent Skills (`.agent/skills/` - Google Antigravity Format)
**11 specialized skills for Antigravity IDE:**
1. **documentation-consultation/** - Read docs first (PREREQUISITE)
2. **brain-update/** - Read `/brain/` before implementing, update after (MANDATORY)
3. **tier-system-enforcement/** - Implement 5-tier system
4. **edt-calculation/** - Calculate EDT (includes scripts/)
5. **show-interest-gating/** - Enforce consent-based interaction
6. **subscription-tier-logic/** - Subscription-based features
7. **admin-rbac-verification/** - Role-based access control
8. **anti-gravity-checking/** - Prevent exploitation (includes resources/)
9. **rails-development/** - Build with Rails 8 + Hotwire
10. **design-system-application/** - Apply JoyMatcher design (includes assets/)
11. **vip-workflow-implementation/** - 10-step VIP lifecycle

Each skill has `SKILL.md` with YAML frontmatter + implementation instructions.

### 📁 Brain (`/brain/` - Implementation Memory)
**Living knowledge base for Rails 8 development:**
- `brain/README.md` - Brain structure and purpose
- `brain/state/completed.md` - ✅ Completed features
- `brain/state/in-progress.md` - 🔄 Current work
- `brain/state/planned.md` - ⏳ Roadmap (Phase 1-8)
- `brain/decisions/` - Architectural decisions
- `brain/learnings/` - Lessons learned
- `brain/XX-feature-name.md` - Implementation files

**MANDATORY: Agent must read brain before EVERY implementation and update after.**

### 📁 Marketing & Content
**Public content:**
- `testimonials_system.md` - Success stories
- `blog_architecture.md` - Blog platform
- `content_strategy.md` - Marketing voice

---

## Core System Rules

### 1. Progressive Disclosure Tier System

**5 Tiers:**
1. **Tier 1:** Basic (Name, Age, Location, Occupation)
2. **Tier 2:** Lifestyle (Faith, Hobbies, Values)
3. **Tier 3:** Family & Future (Marriage vision, Children)
4. **Tier 4:** Past & Personality (Relationship history, Deal-breakers)
5. **Tier 5:** Verification (ID + Video KYC - VIP only)

**Rules:**
- Must complete tiers sequentially (no skipping)
- Cannot share incomplete tiers
- Subscription ceiling: Free (Tier 2), Premium (Tier 4), VIP (Tier 5)
- Revocation is symmetric (if you revoke, they lose yours too)

### 2. Effective Disclosure Tier (EDT)

**Formula:**
```
EDT = min(
  yourCompletedTier,
  theirCompletedTier,
  yourSharedTier,
  theirSharedTier
)
```

**Enforcement:**
- EDT gates ALL profile visibility
- Locked tiers show gray overlay + lock icon + upgrade CTA
- Recalculated dynamically on any change

### 3. Show Interest Gating

**Rules:**
- MUST send Show Interest before messaging
- Both parties must mutually accept
- Free users: 5 Show Interest/month
- Premium/VIP: Unlimited Show Interest
- 3-month cooldown after decline
- Cannot bypass with new account (device fingerprinting)

### 4. Subscription Tiers

**Free:**
- Complete Tier 1-2 only
- 5 Show Interest/month
- Basic profile visibility
- No "see who's interested" feature

**Premium (₦18,000/month or $18/month):**
- Complete Tier 1-4
- Unlimited Show Interest
- See who's interested in you
- Advanced filters
- Message mutual matches

**VIP (₦200,000+ or $200+):**
- Complete Tier 1-5 (verification)
- Dedicated expert matchmaker
- No self-serve browsing (concierge only)
- 2-3 curated introductions/month
- Relationship coaching
- Priority access to verified members

**Currency Rules:**
- ₦ (Naira) for Nigerian users (country: "NG")
- $ (Dollars) for non-Nigerian users
- **NEVER mix currencies in single UI**

### 5. Admin Role-Based Access Control (RBAC)

**Role Hierarchy:**
1. **Super Admin** - Full platform control
2. **Moderator** - Content safety (reports, photos, profiles)
3. **VIP Coordinator** - VIP lifecycle (applications, verification, expert assignment)
4. **VIP Expert** - Freelance matchmaker (ISOLATED to assigned clients ONLY)
5. **Data Protection Officer** - GDPR/NDPR compliance
6. **Support Agent** - Customer support

**Critical Isolation Rule:**
VIP Experts (freelance contractors) can ONLY access assigned VIP clients.
- NO search, NO browse, NO access to unassigned users
- Enforced at database, API, and UI layers
- Zero exceptions (not even Super Admin can disable)
- Audit logs track all access attempts
- 3 violations = automatic suspension

### 6. VIP Workflow (10-Step Process)

1. Premium user completes Tier 4 → VIP application unlocked
2. Submit 18-question application → VIP Coordinator reviews
3. Application approved/rejected → Notification sent
4. If approved: Tier 5 unlocked
5. Upload ID + Video KYC → VIP Coordinator verifies
6. Verification approved → Payment unlocked
7. Payment (₦200K+/$200+) → VIP status activated
8. VIP Coordinator assigns to best-fit expert
9. Expert conducts 60-90min onboarding session
10. Expert searches matches, creates introductions, provides coaching

---

## Anti-Gravity Rules (Prevent Exploitation)

See `docs/Safety & Compliance/anti_gravity_rules.md` for full specifications.

**Key Enforcement Points:**

### No Shortcuts to Depth
- ❌ Cannot view Tier 3 without completing Tier 2
- ❌ Cannot request Tier 4 while only sharing Tier 1
- ❌ Cannot skip tiers or inflate tier progress

### No Cold Contact
- ❌ Cannot message without mutual Show Interest
- ❌ Cannot comment or like profiles
- ❌ Cannot share external contact info before EDT unlock

### No Subscription Ceiling Bypass
- ❌ Free users cannot complete Tier 3+
- ❌ Premium users cannot complete Tier 5 (VIP only)
- ❌ Downgrading doesn't erase completed tiers, but limits NEW sharing
- ❌ Multi-account detection and blocking

### No Spam or Harassment
- ❌ 3-month cooldown after Show Interest decline (enforced)
- ❌ Cannot create new account to re-contact blocked user
- ❌ Profile changes don't reset cooldown
- ❌ Device fingerprinting prevents evasion

### No VIP Privilege Abuse
- ❌ VIP users cannot self-serve browse (expert handles all)
- ❌ VIP cannot initiate with Free/Premium users (tier hierarchy)
- ❌ VIP Expert data isolation is absolute (zero exceptions)
- ❌ Experts cannot contact ex-clients outside platform

### Safety Enforcement
- ❌ Zero tolerance for harassment (3-strike ban)
- ❌ No fake profiles or catfishing (reverse image search)
- ❌ No commercial activity or MLM recruitment
- ❌ No data scraping or automated access

**Consequences Matrix:**
- First offense: Warning
- Second offense: 30-90 day suspension
- Third offense: Permanent ban + device block

---

## UI/UX Identity Rules

**Design Principles:**
✅ Calm, professional layout (NOT flashy dating app)
✅ Neutral tones (Purple-deep #4D0052, Coral #F16A6F)
✅ Professional typography (Playfair Display serif, Inter sans)
✅ Structured spacing (Tailwind scale)
✅ Clear locked states (gray overlay + lock + upgrade CTA)
✅ No gamification (no swipe, no hearts, no "hot" rankings)
✅ No playful emojis (serious, marriage-oriented tone)
✅ Trust-focused hierarchy (emphasize safety, verification, intent)

**This is structured relationship infrastructure, NOT entertainment.**

---

## Prototype Status (React)

### Completed Pages (25/30 - 83%)

**Public Pages (15/15):** ✅ Complete
- Homepage, How It Works, Pricing, VIP, Safety, Success Stories, Contact, FAQ
- Login, Signup
- Terms, Privacy, Community Guidelines, Accessibility

**Authenticated Pages (6/8):** ✅ Core Complete
- Dashboard, Discover, Profile View, Interests, Messages, Notifications
- ⏳ Pending: Settings, Tier Completion

**Admin Pages (4/4):** ✅ Complete
- Super Admin Dashboard, Moderator Dashboard
- VIP Coordinator Dashboard, VIP Expert Dashboard

### Pending Features
⏳ Tier completion workflows (multi-step forms)
⏳ Upgrade modals (Free → Premium, Premium → VIP)
⏳ Settings page (account, privacy, billing)
⏳ Tier awareness warning modal
⏳ Request details modal (reciprocal tier negotiation)
⏳ Revocation confirmation modal

---

## Coding Guidelines

### Before Writing ANY Code

1. **Read the brain (MANDATORY):**
   - `brain/state/completed.md` - What's already built?
   - `brain/state/in-progress.md` - What's being worked on?
   - `brain/state/planned.md` - What's next?
   - Relevant `brain/XX-feature-name.md` files

2. **Read relevant documentation:**
   - For tier logic: `tier_system.md`, `edt_specification.md`
   - For interactions: `show_interest_flow.md`, `request_details_flow.md`
   - For admin: `admin_architecture.md`, `vip_expert_isolation.md`
   - For UI: `design_system.md`, `component_library.md`

3. **Identify constraints:**
   - Does EDT affect visibility?
   - Is Show Interest required?
   - What subscription tier restrictions apply?
   - Are there anti-gravity rules to enforce?

4. **Plan implementation:**
   - What state does this page need?
   - What components can be reused?
   - What validation is required?
   - What error states exist?

5. **Update brain/state/in-progress.md** - Mark feature as in-progress before starting

### State Simulation (Prototype)

**User Model:**
```javascript
const currentUser = {
  id: 'user_001',
  email: 'user@example.com',
  name: 'User Name',
  subscription: 'premium', // free | premium | vip
  completedTier: 3, // 0-5
  country: 'NG', // Determines currency
  showInterestRemaining: null, // null = unlimited
};
```

**Relationship Model:**
```javascript
const relationship = {
  userId: 'user_002',
  status: 'accepted', // none | pending | accepted | declined | cooldown
  sharedTierByCurrentUser: 2,
  sharedTierByOtherUser: 3,
  requestedTierByCurrentUser: null,
  cooldownUntil: null, // Date if declined
  conversationId: 'conv_001',
};
```

**EDT Calculation:**
```javascript
function calculateEDT(currentUser, otherUser, relationship) {
  return Math.min(
    currentUser.completedTier,
    otherUser.completedTier,
    relationship.sharedTierByCurrentUser,
    relationship.sharedTierByOtherUser
  );
}
```

### Component Standards

**Use existing components:**
- `Button.jsx` - Primary, secondary, outline variants
- `Card.jsx` - Default, subtle, elevated variants
- `Input.jsx` - Text, email, password with validation

**Follow Tailwind tokens:**
- Colors: `jm-purple-deep`, `jm-coral`, `jm-gray-*`, `jm-success`
- Spacing: Tailwind default scale
- Typography: `font-serif` (Playfair), `font-sans` (Inter)
- Gradients: `bg-gradient-jm` (purple-deep → coral)

---

## Forbidden Actions

Antigravity must **NEVER**:

❌ Remove cooldown logic (3-month enforcement is critical)
❌ Remove EDT gating (profile visibility MUST respect EDT)
❌ Bypass subscription ceilings (Free stops at Tier 2, Premium at Tier 4)
❌ Allow cold messaging (Show Interest + mutual accept required)
❌ Allow Premium → VIP self-upgrade (VIP Coordinator assigns)
❌ Mix currency displays (₦ and $ in same UI)
❌ Create swipe UX (no gamification)
❌ Weaken admin isolation (VIP Expert sees ONLY assigned)
❌ Port React code to Rails (rebuild from scratch)
❌ Use complex React patterns (keep simple for Rails migration)

**Trust logic is non-negotiable.**

---

## Implementation Checklist

### For Each Page

- [ ] Read relevant docs for page functionality
- [ ] Identify role in user flow (where in journey?)
- [ ] Identify state requirements (what data needed?)
- [ ] Identify tier implications (does EDT affect this?)
- [ ] Identify subscription gating (Free/Premium/VIP differences?)
- [ ] Identify warning requirements (modals needed?)
- [ ] Implement with proper error states
- [ ] Test with different user states (Free, Premium, VIP)
- [ ] Ensure responsive design (mobile, tablet, desktop)
- [ ] Verify accessibility (WCAG 2.1 AA)

### After Completing Feature

- [ ] Create/update brain implementation file (`brain/XX-feature-name.md`)
- [ ] Document decisions made
- [ ] Document challenges and solutions
- [ ] Link to actual code (file paths + line numbers)
- [ ] Document what we learned
- [ ] Update `brain/state/completed.md`
- [ ] Remove from `brain/state/in-progress.md`

### For Rails Development

- [ ] Use semantic HTML (will port easily)
- [ ] Use Tailwind utilities (same tokens in Rails)
- [ ] Document business logic clearly (JS → Ruby)
- [ ] Keep components modular
- [ ] Think: "How will this work in ERB views?"

---

## Source of Truth Hierarchy

If conflicts occur:

1. **`/docs/` folder is authoritative** - Always defer to documentation
2. **Product philosophy overrides UI preference** - Trust > convenience
3. **Tier rules override UX convenience** - EDT is non-negotiable
4. **Consent rules override growth** - Show Interest required
5. **Admin isolation overrides convenience** - VIP Expert isolation absolute
6. **Anti-gravity rules override shortcuts** - No system exploitation

**Never weaken trust rules for simplicity.**

---

## Documentation References

**Quick Reference:**
- 📚 **Tier System:** `docs/Global Context/tier_system.md`
- 📚 **EDT Calculation:** `docs/Global Context/edt_specification.md`
- 📚 **Admin RBAC:** `docs/Admin System/admin_architecture.md`
- 📚 **Anti-Gravity:** `docs/Safety & Compliance/anti_gravity_rules.md`
- 📚 **Show Interest:** `docs/Technical Specifications/show_interest_flow.md`
- 📚 **Design System:** `docs/Design System/design_system.md`
- 📚 **Rails Development:** `.agent/skills/rails-development/SKILL.md` + `resources/`
- 📚 **Brain Update:** `.agent/skills/brain-update/SKILL.md` (MANDATORY)

**Status Tracking:**
- 📋 **Documentation Index:** `docs/DOCUMENTATION_INDEX.md` (all 70+ docs)
- 📋 **Prototype Status:** `prototype/PROTOTYPE_STATUS.md` (build progress)
- 📋 **Agent Skills:** `.agent/skills/README.md` (11 skills for Antigravity)
- 📋 **Brain (Implementation Memory):** `brain/README.md` + `brain/state/` (Rails progress)
- 📋 **System Contract (Claude):** `CLAUDE.md` (for Claude AI)
- 📋 **System Contract (Antigravity):** `RULES.md` (THIS FILE)

---

## Final Reminder

**JoyMatcher is NOT a dating app.**

This is:
✅ **Consent-driven** - Show Interest gates all interaction
✅ **Investment-filtered** - Subscription demonstrates seriousness
✅ **Reciprocity-enforced** - EDT ensures matching depth
✅ **Marriage-oriented** - Relationship infrastructure, not entertainment
✅ **Verification-aware** - Tier 5 for VIP trust
✅ **VIP-curated** - Expert matchmakers, not self-serve

**Every line of code must respect that.**

---

**Version:** 1.1.0 (Updated Rails 8 stack: Solid Queue/Cache/Cable + CanCanCan)
**Maintained By:** Product & Engineering Teams
**Last Updated:** 2026-02-27
**For:** Antigravity IDE
