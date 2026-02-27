# Planned Features

**Last Updated:** 2026-02-27

---

## Next Up (Priority Order)

### Phase 1: Rails Foundation
1. ⏳ **Rails 8 Project Setup**
   - Initialize Rails 8 app
   - Configure PostgreSQL
   - Setup Tailwind CSS v4
   - Install Hotwire (Turbo + Stimulus)
   - Configure Devise
   - Setup testing framework

2. ⏳ **User Model & Authentication**
   - Devise setup
   - User model with tier tracking
   - Basic authentication flows
   - Session management

3. ⏳ **Tier System Models**
   - User tier completion tracking
   - Subscription enum
   - Tier validation methods
   - TierSharing model

### Phase 2: Core Business Logic
4. ⏳ **EDT Calculation**
   - EDT calculation method
   - Profile visibility enforcement
   - Turbo Frame integration

5. ⏳ **Show Interest Flow**
   - ShowInterest model
   - Mutual acceptance logic
   - 3-month cooldown enforcement
   - Turbo Streams for real-time updates

6. ⏳ **Subscription Logic**
   - Stripe integration
   - Subscription tiers (Free/Premium/VIP)
   - Tier ceiling enforcement
   - Upgrade flows

### Phase 3: Admin System
7. ⏳ **Admin RBAC with Pundit**
   - Admin model
   - Pundit policies
   - Role-based dashboards
   - VIP Expert isolation

8. ⏳ **VIP Workflow**
   - VIP application system
   - Tier 5 verification
   - Expert assignment
   - VIP dashboard

### Phase 4: Communication
9. ⏳ **Messaging System**
   - Conversation model
   - Turbo Streams messaging
   - Real-time updates
   - Message notifications

10. ⏳ **Notifications**
    - Notification model
    - Real-time delivery
    - Notification center
    - Action Cable integration

### Phase 5: UI & Polish
11. ⏳ **ViewComponents Library**
    - Reusable UI components
    - Locked state component
    - Button variants
    - Card variants

12. ⏳ **Design System Implementation**
    - Tailwind config with jm-* tokens
    - Typography system
    - Responsive design
    - Accessibility (WCAG 2.1 AA)

---

## Future Phases

### Phase 6: Safety & Moderation
- Content moderation system
- Report/block functionality
- Anti-gravity rule enforcement
- Device fingerprinting

### Phase 7: Performance & Scale
- Caching strategy
- Database optimization
- Background jobs (Sidekiq)
- ActiveStorage for photos

### Phase 8: Deployment
- Production environment setup
- CI/CD pipeline
- Monitoring & logging
- Backup strategy

---

## Format

```markdown
## Feature Name

**Priority:** High | Medium | Low
**Estimated Effort:** Small | Medium | Large
**Dependencies:** [List features that must be done first]
**Brain File:** Will be `brain/XX-feature-name.md`

### Why This Feature
Business justification

### What Success Looks Like
Clear definition of done

### Technical Approach
High-level implementation strategy
```

---

**Rules:**
- Keep this list updated as priorities change
- Move items to `in-progress.md` when starting work
- Document why priorities shift (in decisions/)
