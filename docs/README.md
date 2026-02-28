# JoyMatcher Documentation

Complete documentation for the JoyMatcher trust-based matchmaking platform.

## Documentation Structure

### 📁 Global Context
Core system architecture and foundational concepts:
- `product_charter.md` - Product positioning and mission
- `tier.md` - Complete tier system specification (MASTER REFERENCE)
- `persona_diaspora_professional.md` - Primary user persona (Chioma)
- `persona_home_based_professional.md` - Secondary user persona (Kwame)

### 📁 Feature Plan
Detailed feature specifications and user flows:
- `prd.md` - Product Requirements Document
- `user_flow.md` - Complete user journey maps
- `*_screen_plan.md` - Individual screen specifications

### 📁 Admin System
Administrative functionality and role-based access:
- `admin_architecture.md` - Complete admin system design
- `admin_roles_permissions.md` - Role definitions and access control
- `vip_expert_isolation.md` - Freelance expert data isolation
- `moderation_workflows.md` - Content and safety moderation
- `vip_coordination.md` - VIP management and assignment

### 📁 Safety & Compliance
Trust, safety, and legal compliance:
- `safety_system.md` - Reporting, blocking, and anti-harassment
- `content_moderation.md` - Photo and profile moderation
- `legal_compliance.md` - GDPR, NDPR, and regulatory requirements
- `data_management.md` - Data retention, anonymization, and deletion
- `accessibility.md` - WCAG 2.1 AA compliance standards

### 📁 Marketing & Content
Public-facing content and success stories:
- `testimonials_system.md` - Success story consent and management
- `blog_architecture.md` - Blog platform specifications
- `content_strategy.md` - Marketing content guidelines

### 📁 Technical Specifications
Implementation details and data models:
- `state_management.md` - JavaScript state models for prototype
- `edt_calculation.md` - Effective Disclosure Tier algorithm
- `api_specifications.md` - Future API endpoint definitions
- `database_schema.md` - Data model specifications

### 📁 Style Guide
Visual design and UI standards:
- `joymatcher_web.style-guide.md` - Complete style guide (EXISTING)

### 📁 Screen & Prototype
UI mockups and prototypes (HTML files will go here during implementation)

---

## How to Use This Documentation

### For Product & Planning:
1. Start with `Global Context/product_charter.md` for mission and positioning
2. Read `Global Context/tier.md` for the core system logic (MASTER REFERENCE)
3. Review `Feature Plan/prd.md` for complete feature list

### For Design & UX:
1. Review user personas in `Global Context/`
2. Study `Feature Plan/*_screen_plan.md` for screen layouts
3. Follow `Style Guide/joymatcher_web.style-guide.md` for visual standards
4. Reference `Safety & Compliance/accessibility.md` for inclusive design

### For Development:
1. Study `Global Context/tier.md` for business logic
2. Review `Technical Specifications/` for data models
3. Reference `Admin System/` for admin functionality
4. Follow `Safety & Compliance/` for security requirements

### For Content & Marketing:
1. Read `product_charter.md` for brand voice
2. Review `Marketing & Content/` for content systems
3. Study user personas for audience understanding

---

## Key Principles

### Trust-Based Architecture
- Depth requires matching depth (EDT enforcement)
- Consent gates every interaction (Show Interest required)
- Investment demonstrates seriousness (subscription-to-tier ceiling)
- Reciprocal transparency (one-to-one, revocable disclosure)

### Marriage-Focused Positioning
- NOT a dating app - relationship infrastructure
- Intentional friction protects quality
- VIP is service, not browsing
- Success = users leaving to get married

### Privacy & Safety First
- Zero tolerance for harassment and spam
- GDPR/NDPR compliant by design
- Data minimization and anonymization
- Right to deletion with grace periods

### Accessibility & Inclusion
- WCAG 2.1 AA compliance
- Cultural sensitivity (African diaspora focus)
- Multiple language support
- Keyboard navigation and screen reader support

---

## Documentation Maintenance

This documentation is the **single source of truth** for JoyMatcher.

### Update Procedures:
1. All changes must be documented before implementation
2. Breaking changes require review and approval
3. Keep `tier.md` as the authoritative reference for core logic
4. Update `CHANGELOG.md` for significant changes

### Version Control:
- Documentation follows semantic versioning
- Current version: 1.0.0 (Initial comprehensive spec)
- Last updated: 2026-02-26

---

## Contact

For questions about this documentation:
- Product: [Product Owner]
- Technical: [Tech Lead]
- Design: [Design Lead]
