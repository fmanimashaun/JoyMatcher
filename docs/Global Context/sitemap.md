# Complete Application Sitemap

**Version:** 1.0.0
**Last Updated:** 2026-02-26
**Status:** Complete

---

## Overview

This document maps all pages, screens, and routes in the JoyMatcher platform. Total estimated pages: **70+**

---

## PUBLIC PAGES (No Authentication Required)

### Marketing & Information

```
/                                  # Landing/Home
├── /how-it-works                  # Tier system explanation, EDT demo
├── /pricing                       # Free/Premium/VIP comparison
├── /safety                        # Trust & Safety Center
├── /about                         # Mission, team, story
├── /success-stories               # Testimonials page
├── /success-stories/:id           # Individual success story
├── /blog                          # Blog homepage
├── /blog/:slug                    # Individual blog post
├── /blog/category/:category       # Blog category view
├── /faq                           # Frequently Asked Questions
└── /contact                       # Contact support form
```

### Legal & Compliance

```
/legal
├── /terms-of-service              # Terms & Conditions
├── /privacy-policy                # GDPR/NDPR compliant Privacy Policy
├── /cookie-policy                 # Cookie usage
├── /community-guidelines          # Behavioral standards
├── /data-protection               # Data handling practices
├── /right-to-deletion             # GDPR Article 17 / NDPR Section 26
├── /accessibility-statement       # WCAG 2.1 AA compliance
├── /vip-terms                     # VIP-specific terms
├── /testimonial-terms             # Consent terms for success stories
└── /dispute-resolution            # Conflict resolution process
```

### Authentication

```
/login                             # Sign in
/signup                            # Account creation
/forgot-password                   # Password recovery
/reset-password/:token             # Password reset form
/verify-email/:token               # Email verification landing
/unsubscribe/:token                # Email preference management
```

**Total Public Pages: 27**

---

## USER APPLICATION (Authenticated - User Login)

### Onboarding Flow

```
/onboarding
├── /onboarding/tier-1             # Identity & Intent (mandatory)
├── /onboarding/tier-2             # Lifestyle & Background
├── /onboarding/tier-3             # Relationship & Family (Premium required)
├── /onboarding/tier-4             # Health & Compatibility (Premium required)
└── /onboarding/tier-5             # Verified Identity KYC (VIP only, post-approval)
```

### Core Application

```
/app
├── /app/dashboard                 # Welcome hub, tier progress, matches summary
├── /app/discover                  # Browse matches (EDT-filtered profiles)
├── /app/profile/:id               # View other user's profile (EDT-aware)
├── /app/profile/me                # Own profile view
├── /app/profile/me/edit           # Edit own profile
├── /app/interests                 # Show Interest management
│   ├── /app/interests/sent        # Interests you sent
│   ├── /app/interests/received    # Interests you received
│   └── /app/interests/accepted    # Mutual interests
├── /app/messages                  # Conversations list
├── /app/messages/:id              # Specific conversation thread
├── /app/notifications             # Notification center
├── /app/settings                  # Account settings
└── /app/help                      # In-app help center
```

### Account & Data Management

```
/app/account
├── /app/account/tiers             # Tier completion dashboard
├── /app/account/subscription      # Manage subscription
├── /app/account/upgrade           # Upgrade flow (Free→Premium, Premium→VIP)
├── /app/account/disclosures       # Manage one-to-one tier sharing
├── /app/account/billing           # Payment history
├── /app/account/privacy           # Privacy settings
├── /app/account/security          # Security settings (2FA, password)
├── /app/account/blocked-users     # Blocked users list
├── /app/account/data-export       # Download my data (GDPR)
├── /app/account/delete-account    # Account deletion flow
└── /app/account/pause-account     # Temporary deactivation
```

### Safety Features

```
/app/safety
├── /app/safety/report             # Report user/content
├── /app/safety/report-success     # Report confirmation
└── /app/safety/blocked            # Manage blocked users
```

### Success & Exit Flows

```
/app/success
├── /app/success/found-match       # Found relationship outside platform
├── /app/success/marriage-intent   # Engaged/married
└── /app/success/feedback          # Exit survey with testimonial consent
```

### VIP-Specific (After VIP Approval)

```
/app/vip
├── /app/vip/application           # VIP application form (18 questions)
├── /app/vip/application-status    # Application review status
├── /app/vip/verification          # Tier 5 ID upload & video verification
├── /app/vip/intake                # Concierge onboarding questionnaire
├── /app/vip/introductions         # Curated matches from expert
├── /app/vip/sessions              # Expert consultation scheduling
└── /app/vip/settings              # VIP privacy settings (disable browsing)
```

**Total User Application Pages: 43**

---

## ADMIN PANEL (Authenticated - Admin Login)

### Admin Authentication & Dashboard

```
/admin
├── /admin/login                   # Admin authentication (separate from user login, 2FA)
└── /admin/dashboard               # Role-specific admin dashboard
```

### User Management (Super Admin, Moderators)

```
/admin/users
├── /admin/users                   # All users list (with filters)
├── /admin/users/:id               # User detail view
├── /admin/users/:id/edit          # Admin edit user profile
├── /admin/users/:id/tiers         # View user's tier completion
├── /admin/users/:id/activity      # Activity log
├── /admin/users/:id/reports       # Reports against this user
├── /admin/users/:id/suspend       # Suspend account
└── /admin/users/:id/ban           # Permanent ban
```

### VIP Management (VIP Coordinator)

```
/admin/vip
├── /admin/vip/applications        # Pending VIP applications queue
├── /admin/vip/applications/:id    # Review individual application
├── /admin/vip/verifications       # Tier 5 verification queue
├── /admin/vip/verifications/:id   # Review KYC documents
├── /admin/vip/active              # Active VIP users
├── /admin/vip/experts             # Manage freelance experts
├── /admin/vip/experts/:id         # Expert detail view
├── /admin/vip/assignments         # Assign VIPs to experts
└── /admin/vip/payments            # Process expert payments
```

### Content Moderation (Super Admin, Moderators)

```
/admin/moderation
├── /admin/reports                 # All reports queue
├── /admin/reports/:id             # Individual report review
├── /admin/reports/resolved        # Resolved reports archive
├── /admin/photos                  # Photo moderation queue
├── /admin/profiles                # Profile review queue
└── /admin/messages/flagged        # Flagged messages review
```

### Trust & Safety (Super Admin, Moderators)

```
/admin/safety
├── /admin/safety                  # Safety dashboard
├── /admin/safety/patterns         # Pattern detection (spam, harassment)
├── /admin/safety/blocked-pairs    # System-blocked relationships
├── /admin/safety/appeals          # Ban appeals
└── /admin/safety/fraud            # Fraud detection queue
```

### Data Management (Data Protection Officer)

```
/admin/data
├── /admin/data/deletion-requests  # Right-to-deletion queue
├── /admin/data/export-requests    # Data export requests
├── /admin/data/anonymization      # Anonymization status tracking
└── /admin/data/retention          # Data retention policies
```

### Content Publishing (Super Admin)

```
/admin/content
├── /admin/testimonials            # Testimonials approval queue
├── /admin/testimonials/:id        # Review individual testimonial
├── /admin/blog                    # Blog dashboard
├── /admin/blog/posts              # All blog posts list
├── /admin/blog/posts/new          # Create new blog post
└── /admin/blog/posts/:id/edit     # Edit blog post
```

### Analytics (Super Admin, Role-Based Access)

```
/admin/analytics
├── /admin/analytics               # Platform analytics overview
├── /admin/analytics/conversion    # Tier completion & upgrade rates
├── /admin/analytics/engagement    # User engagement metrics
├── /admin/analytics/revenue       # Revenue dashboard
└── /admin/analytics/success       # Success stories tracking
```

### System Settings (Super Admin)

```
/admin/settings
├── /admin/settings                # Platform settings
├── /admin/settings/pricing        # Pricing configuration
├── /admin/settings/features       # Feature flags
├── /admin/settings/email          # Email templates
├── /admin/settings/notifications  # Notification rules
└── /admin/settings/admins         # Admin user management
```

**Total Admin Panel Pages: 37**

---

## VIP EXPERT PORTAL (Authenticated - Expert Login - ISOLATED)

### VIP Expert Dashboard (Freelance Contractors)

```
/admin/vip-expert
├── /admin/vip-expert/dashboard    # Expert dashboard (assigned clients only)
├── /admin/vip-expert/clients      # My assigned VIP clients list
├── /admin/vip-expert/client/:id   # Client detail (if assigned to expert)
├── /admin/vip-expert/introductions # Create/manage introductions
├── /admin/vip-expert/sessions     # Schedule consultation sessions
├── /admin/vip-expert/performance  # My performance metrics
└── /admin/vip-expert/earnings     # Payment tracking (own earnings only)
```

**Total VIP Expert Pages: 7**

---

## MODALS & OVERLAYS (Not Separate Routes)

### User-Facing Modals

```
- Show Interest Confirmation Modal (with tier awareness warning)
- Request Details Modal (reciprocal tier negotiation)
- Accept/Decline Details Request Modal
- Revoke Access Confirmation Modal
- Upgrade Prompt Modal (contextual to tier ceiling)
- Tier Completion Progress Modal
- VIP Privacy Warning Modal (VIP→Free interaction)
- Subscription Change Confirmation Modal
- Account Deletion Confirmation Modal
- Photo Upload Modal (with cropping)
- Report User Modal
- Block User Confirmation Modal
```

### Admin-Facing Modals

```
- Admin Action Confirmation Modal (suspend, ban)
- VIP Application Review Modal
- Tier 5 Verification Review Modal
- Expert Assignment Modal
- Photo Approval/Rejection Modal
- Report Resolution Modal
- Testimonial Approval Modal
- Blog Post Preview Modal
```

**Total Modals: 20**

---

## ROUTE SUMMARY

| Section | Page Count |
|---------|-----------|
| Public Pages (Marketing, Legal, Auth) | 27 |
| User Application (Onboarding, Core App, VIP) | 43 |
| Admin Panel (Super Admin, Moderators, VIP Coordinator) | 37 |
| VIP Expert Portal (Isolated) | 7 |
| **Total Routes** | **114** |
| Modals & Overlays | 20 |
| **Grand Total** | **134 pages/screens** |

---

## ROUTE NAMING CONVENTIONS

### URL Structure Rules

1. **Lowercase with hyphens**
   - ✅ `/how-it-works`
   - ❌ `/howItWorks`, `/HowItWorks`

2. **RESTful patterns for resources**
   - List: `/admin/users`
   - Detail: `/admin/users/:id`
   - Action: `/admin/users/:id/suspend`

3. **Logical nesting (max 3 levels)**
   - ✅ `/app/vip/introductions`
   - ❌ `/app/vip/introductions/detail/view` (too deep)

4. **Semantic paths**
   - ✅ `/app/account/data-export`
   - ❌ `/app/gdpr-download`

5. **Admin routes prefixed**
   - All admin routes start with `/admin/`
   - Prevents route conflicts with user app

---

## NAVIGATION HIERARCHY

### User Application Navigation

**Top Navigation Bar:**
- Logo (links to `/app/dashboard`)
- Discover
- Interests
- Messages
- Account (dropdown)

**Account Dropdown:**
- My Profile
- Tier Progress
- Subscription
- Settings
- Help
- Log Out

### Admin Panel Navigation

**Sidebar (Role-Based):**

**Super Admin Sees:**
- Dashboard
- Users
- VIP Management
- Moderation
- Safety
- Data
- Content (Testimonials, Blog)
- Analytics
- Settings

**Moderator Sees:**
- Dashboard
- Moderation
- Reports
- Photos
- Profiles
- Safety Patterns

**VIP Coordinator Sees:**
- Dashboard
- VIP Applications
- Tier 5 Verifications
- Experts
- Assignments
- VIP Analytics

**VIP Expert Sees (Isolated):**
- Dashboard
- My Clients (assigned only)
- Introductions
- Sessions
- Performance
- Earnings

---

## BREADCRUMB PATTERNS

### User Application

```
Home > Discover
Home > Profile > John D.
Home > Account > Tier Progress
Home > VIP > Application
```

### Admin Panel

```
Admin > Users > User Detail > Edit
Admin > VIP > Applications > Review
Admin > Moderation > Reports > Report Detail
```

---

## FUTURE EXPANSION ROUTES (Planned)

### Phase 2 Features

```
/app/events                        # Virtual/in-person matchmaking events
/app/groups                        # Interest-based groups
/app/coaching                      # Relationship coaching resources
/admin/events                      # Event management
/admin/groups                      # Group moderation
```

### Phase 3 Features (Consideration)

```
/app/video-call                    # In-app video calling
/app/compatibility-quiz            # Interactive compatibility assessments
/admin/ai-moderation               # AI-powered moderation tools
```

---

## ROUTE ACCESS MATRIX

| Route Prefix | Free Users | Premium Users | VIP Users | Super Admin | Moderator | VIP Coordinator | VIP Expert |
|--------------|-----------|---------------|-----------|-------------|-----------|-----------------|------------|
| `/` (Public) | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| `/app/*` | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ |
| `/app/vip/*` | ❌ | ⚠️ Application only | ✅ | ❌ | ❌ | ❌ | ❌ |
| `/admin/*` | ❌ | ❌ | ❌ | ✅ | ⚠️ Limited | ⚠️ VIP only | ❌ |
| `/admin/vip-expert/*` | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ |

**Legend:**
- ✅ Full access
- ❌ No access
- ⚠️ Limited/conditional access

---

## ERROR PAGES

```
/404                               # Page not found
/403                               # Forbidden (insufficient permissions)
/500                               # Server error
/503                               # Maintenance mode
```

---

## REDIRECTS

### After Login

| User Type | Redirect To |
|-----------|-------------|
| First-time user (Tier 1 incomplete) | `/onboarding/tier-1` |
| Active user (Tier 1+ complete) | `/app/dashboard` |
| Admin | `/admin/dashboard` |
| VIP Expert | `/admin/vip-expert/dashboard` |

### After Logout

- All users → `/` (homepage)

### After Account Deletion

- User → `/` (homepage) with confirmation message

---

## MOBILE-SPECIFIC ROUTES (Future)

```
/m/                                # Mobile-optimized homepage
/m/app/*                           # Mobile app routes
```

(Note: Initial prototype is desktop-first web. Mobile routes planned for Phase 2.)

---

## Related Documentation

- [User Journeys](user_journeys.md) - Flow between pages
- [Feature Specifications](../Feature%20Specifications/) - Individual page specs
- [Admin Architecture](../Admin%20System/admin_architecture.md) - Admin routing logic

---

**Document Owner:** Product Lead & Engineering Lead
**Last Reviewed:** 2026-02-26
**Next Review:** 2026-05-26 (Quarterly)
