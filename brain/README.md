# JoyMatcher Brain - Implementation Knowledge Base

**Purpose:** Living documentation of Rails 8 implementation decisions, learnings, and evolution
**Status:** Active
**Last Updated:** 2026-02-27

---

## What is the Brain?

The **brain** folder is JoyMatcher's implementation memory. It documents:

✅ **What we've built** - Completed features and implementations
✅ **Decisions we made** - Why we chose specific approaches
✅ **Problems we solved** - Challenges encountered and solutions
✅ **Learnings captured** - Insights from each implementation
✅ **Current state** - Where we are in the build process
✅ **Next steps** - What's coming up

---

## Why We Need the Brain

### Problem Without Brain:
- Agent forgets previous decisions
- Repeats same mistakes
- No context on why code was written certain way
- Lost knowledge when moving between features
- No clear progression tracking

### Solution With Brain:
- ✅ Agent reads brain before implementing
- ✅ Consistent decision-making across features
- ✅ Learn from previous implementations
- ✅ Understand architectural evolution
- ✅ Track progression from start to finish

---

## Brain Structure

```
brain/
├── README.md                           ← You are here
├── 00-project-setup.md                 ← Initial Rails 8 setup
├── 01-authentication.md                ← Devise setup
├── 02-tier-system-models.md            ← User/Tier models
├── 03-edt-calculation.md               ← EDT implementation
├── 04-show-interest-flow.md            ← Show Interest feature
├── 05-subscription-logic.md            ← Stripe + subscriptions
├── 06-admin-rbac.md                    ← Pundit policies
├── 07-vip-workflow.md                  ← VIP features
├── 08-messaging-system.md              ← Turbo Streams messaging
├── 09-notifications.md                 ← Real-time notifications
├── 10-design-system-implementation.md  ← Tailwind + ViewComponents
├── decisions/                          ← Major architectural decisions
│   ├── why-hotwire-not-react.md
│   ├── pundit-vs-cancancan.md
│   ├── turbo-frames-strategy.md
│   └── viewcomponents-organization.md
├── learnings/                          ← Lessons learned
│   ├── turbo-frame-pitfalls.md
│   ├── stimulus-best-practices.md
│   ├── edt-performance-optimization.md
│   └── expert-isolation-implementation.md
└── state/                              ← Current state tracking
    ├── completed.md                    ← ✅ Done features
    ├── in-progress.md                  ← 🔄 Current work
    └── planned.md                      ← ⏳ Next features
```

---

## Documentation Format

Each implementation file follows this format:

```markdown
# Feature Name

**Status:** Completed | In Progress | Blocked
**Started:** YYYY-MM-DD
**Completed:** YYYY-MM-DD
**Developer:** [Name/Agent]

## Goal
What we're building and why

## Decisions Made
Key architectural decisions

## Implementation Details
How we built it (models, controllers, views)

## Challenges Faced
Problems encountered during implementation

## Solutions Applied
How we solved the problems

## Code References
- Model: `app/models/user.rb`
- Controller: `app/controllers/users_controller.rb`
- View: `app/views/users/show.html.erb`

## Tests Written
What we tested and how

## What We Learned
Insights for future implementations

## Next Steps
What needs to happen next
```

---

## Agent Requirements

### BEFORE any implementation:
1. **READ the brain** - Understand what's already built
2. **CHECK decisions/** - See if similar decisions were made
3. **REVIEW learnings/** - Don't repeat mistakes
4. **CHECK state/in-progress.md** - See what's being worked on

### AFTER every implementation:
1. **CREATE implementation doc** - Document what was built
2. **UPDATE state/completed.md** - Mark feature as done
3. **DOCUMENT learnings/** - Capture insights
4. **UPDATE decisions/** if new architectural decision was made

---

## Quick Start

### For First Implementation:
1. Create `00-project-setup.md`
2. Document Rails 8 initialization
3. Record gems installed, database setup, etc.
4. Create baseline in `state/completed.md`

### For Each New Feature:
1. Read relevant brain files
2. Create new implementation file (e.g., `02-tier-system-models.md`)
3. Document as you build
4. Update state files when done

---

## Examples

### Good Brain Entry:
```markdown
# 02 - Tier System Models

**Status:** Completed
**Started:** 2026-02-28
**Completed:** 2026-03-01

## Goal
Implement User tier completion tracking with subscription-based ceilings

## Decisions Made
- Used enum for subscription (free: 0, premium: 1, vip: 2)
- completed_tier as integer (0-5)
- Validation in model, not database constraint

## Implementation Details
Added to User model:
- `completed_tier` (integer, default: 0)
- `subscription` (enum)
- `max_completable_tier` method
- `can_complete_tier?(tier)` validation method

## Challenges Faced
Sequential completion validation needed to work with Turbo Forms

## Solutions Applied
Used Stimulus controller to disable tier buttons dynamically

## Code References
- Model: `app/models/user.rb:15-30`
- Concern: `app/models/concerns/tier_completable.rb`
- Stimulus: `app/javascript/controllers/tier_completion_controller.js`

## What We Learned
- ActiveRecord enums work great for subscription types
- Validation methods in models keep controllers thin
- Stimulus controllers can enforce client-side rules

## Next Steps
- Implement EDT calculation between users
- Build TierSharing model
```

---

## State Tracking

### state/completed.md
Lists all completed features with links to their brain docs

### state/in-progress.md
Current work items with status and blockers

### state/planned.md
Upcoming features in priority order

---

## Benefits

1. **Continuity** - Every implementation builds on previous knowledge
2. **Consistency** - Decisions documented = consistent approach
3. **Learning** - Don't repeat mistakes, build on wins
4. **Onboarding** - New developers/agents read brain to understand
5. **Debugging** - Know why code was written that way
6. **Evolution** - Track how architecture evolved over time

---

## Rules

### MUST DO:
- ✅ Read brain before implementing
- ✅ Update brain after implementing
- ✅ Document decisions clearly
- ✅ Capture learnings immediately
- ✅ Link to actual code

### MUST NOT DO:
- ❌ Skip brain update
- ❌ Document after the fact (do it while building)
- ❌ Write generic/vague entries
- ❌ Forget to update state files

---

**The brain grows with the product. The smarter the brain, the better the implementation.**

---

**Created:** 2026-02-27
**Maintained By:** Development Team + AI Agents
