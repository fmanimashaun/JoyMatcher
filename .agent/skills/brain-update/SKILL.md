---
name: Brain Update
description: MANDATORY - Read /brain/ before implementing, update /brain/ after implementing. Document decisions, learnings, and implementation details for Rails 8 development.
---

# Brain Update Skill

## Goal

Ensure agent always reads the `/brain/` knowledge base before implementing and updates it after completing features. The brain is JoyMatcher's implementation memory.

## When to Trigger

**ALWAYS trigger BEFORE and AFTER every implementation:**

### BEFORE Implementation (READ):
- Starting any new feature
- Modifying existing functionality
- Making architectural decisions
- Debugging issues

### AFTER Implementation (WRITE):
- Completing a feature
- Solving a problem
- Making a significant decision
- Learning something new

## Critical Understanding

**The brain grows with the product.**

- `/brain/` = Implementation memory
- Documents what we built, why, and how
- Captures decisions and learnings
- Tracks progression and state
- Prevents repeating mistakes
- Ensures continuity across implementations

---

## Instructions

### STEP 1: Read Brain BEFORE Implementing

```
1. Read `brain/README.md` for structure overview
2. Read `brain/state/completed.md` - What's already built?
3. Read `brain/state/in-progress.md` - What's being worked on?
4. Read `brain/state/planned.md` - What's next?
5. Read relevant implementation files (e.g., `brain/02-tier-system-models.md`)
6. Check `brain/decisions/` for similar architectural decisions
7. Review `brain/learnings/` to avoid repeating mistakes
```

**Why:** Understand context, avoid conflicts, learn from previous work

### STEP 2: Update State to In-Progress

```markdown
<!-- brain/state/in-progress.md -->
## Feature Name

**Status:** 🔄 In Progress
**Started:** 2026-02-28
**Assigned:** Agent
**Brain File:** `brain/03-edt-calculation.md` (will create)

### Current Step
Implementing EDT calculation in User model

### Blockers
None

### Next Actions
- Add calculate_edt method to User
- Write tests
- Update brain file when done
```

### STEP 3: Implement Feature

Build the feature while documenting as you go.

### STEP 4: Create/Update Brain Implementation File

```markdown
<!-- brain/03-edt-calculation.md -->
# 03 - EDT Calculation Implementation

**Status:** Completed
**Started:** 2026-02-28
**Completed:** 2026-02-28
**Developer:** Agent

## Goal
Implement EDT (Effective Disclosure Tier) calculation between users

## Decisions Made
- Implemented as instance method on User model
- Takes other_user and relationship as parameters
- Returns integer (0-5)
- Validation happens in relationship model

## Implementation Details

### User Model (`app/models/user.rb`)
```ruby
def calculate_edt(other_user, relationship)
  [
    completed_tier,
    other_user.completed_tier,
    relationship.shared_tier_by_current_user,
    relationship.shared_tier_by_other_user
  ].min
end
```

### Relationship Model (`app/models/relationship.rb`)
Added validations:
- shared_tier must be <= user's completed_tier
- shared_tier must be <= subscription ceiling

## Challenges Faced
- EDT must recalculate dynamically when tiers change
- Need to ensure symmetric revocation

## Solutions Applied
- Used ActiveRecord callbacks for recalculation
- Added symmetric_revoke method on Relationship model

## Code References
- Model: `app/models/user.rb:45-53`
- Model: `app/models/relationship.rb:15-30`
- Test: `spec/models/user_spec.rb:78-95`

## Tests Written
- EDT calculation with all 4 values
- EDT with tier changes
- Symmetric revocation
- Edge cases (nil values, 0 tier)

## What We Learned
- ActiveRecord min works great for EDT formula
- Callbacks can trigger unnecessary recalculations (watch performance)
- Stimulus controller needed for real-time UI updates

## Next Steps
- Implement profile view with EDT gating
- Add Turbo Frame for tier sections
- Build tier request/share UI
```

### STEP 5: Update State Files

#### Move to Completed
```markdown
<!-- brain/state/completed.md -->
- ✅ **EDT Calculation**
  - Brain file: `brain/03-edt-calculation.md`
  - Started: 2026-02-28
  - Completed: 2026-02-28
  - Developer: Agent
```

#### Remove from In-Progress
Delete the entry from `brain/state/in-progress.md`

### STEP 6: Document Learnings (If Significant)

```markdown
<!-- brain/learnings/edt-performance-optimization.md -->
# EDT Recalculation Performance

**Date:** 2026-02-28
**Context:** Implementing EDT calculation

## Problem
EDT recalculates on every tier change, causing N+1 queries

## Solution
Added caching with Rails.cache and cache invalidation on tier changes

## Code
```ruby
def calculate_edt(other_user, relationship)
  Rails.cache.fetch("edt_#{id}_#{other_user.id}", expires_in: 1.hour) do
    [completed_tier, other_user.completed_tier,
     relationship.shared_tier_by_current_user,
     relationship.shared_tier_by_other_user].min
  end
end
```

## Lesson
Always consider caching for frequently accessed calculations
```

### STEP 7: Document Decisions (If Architectural)

```markdown
<!-- brain/decisions/edt-calculation-location.md -->
# Decision: Where to Implement EDT Calculation

**Date:** 2026-02-28
**Decision Maker:** Agent + Team

## Context
EDT needs to be calculated between users and relationships

## Options Considered

### Option 1: User Model Method
**Pros:** Easy to call, clear ownership
**Cons:** Needs relationship as parameter

### Option 2: Relationship Model Method
**Pros:** Has access to all data
**Cons:** Less intuitive API

### Option 3: Service Object
**Pros:** Separation of concerns
**Cons:** Overkill for simple calculation

## Decision
**Chose Option 1: User Model Method**

## Rationale
- Most intuitive API: `current_user.calculate_edt(other_user, relationship)`
- Keeps business logic in models
- Easy to test
- Matches documentation

## Implementation
See `brain/03-edt-calculation.md`
```

---

## Examples

### Example 1: Starting Rails Project

**READ:**
- `brain/state/planned.md` - See Rails 8 setup is first priority

**UPDATE:**
1. Move "Rails 8 Project Setup" to `in-progress.md`
2. Create `brain/00-project-setup.md` and document as you work
3. When done, move to `completed.md`
4. Create decision doc if you chose specific gems/approaches

### Example 2: Implementing Tier System

**READ:**
- `brain/00-project-setup.md` - Understand current setup
- `brain/decisions/` - Check for relevant decisions
- `brain/learnings/` - Learn from previous work

**UPDATE:**
1. Create `brain/02-tier-system-models.md`
2. Document User model changes
3. Document subscription enum approach
4. Capture why you chose specific validations
5. Update `completed.md` when done

---

## Constraints

### MUST DO (MANDATORY):
- ✅ **Read brain before EVERY implementation**
- ✅ **Update state/in-progress.md when starting**
- ✅ **Create brain file during implementation** (not after)
- ✅ **Update state/completed.md when done**
- ✅ **Document decisions if architectural**
- ✅ **Document learnings if significant**
- ✅ **Link to actual code** (file paths + line numbers)

### MUST NOT DO:
- ❌ **Skip reading brain**
- ❌ **Implement without updating state**
- ❌ **Document after the fact** (do it while building)
- ❌ **Write vague/generic entries**
- ❌ **Forget to move items between state files**

---

## Validation Checklist

Before claiming a feature is complete:

- [ ] Did I read relevant brain files before starting?
- [ ] Did I update `state/in-progress.md` when starting?
- [ ] Did I create brain implementation file?
- [ ] Did I document decisions made?
- [ ] Did I capture learnings?
- [ ] Did I link to actual code?
- [ ] Did I update `state/completed.md`?
- [ ] Did I remove from `state/in-progress.md`?

**All checkboxes must be checked.**

---

## Self-Test

**Q1:** When should you read the brain?
**A:** BEFORE every implementation

**Q2:** When should you update the brain?
**A:** AFTER every implementation (and during for decisions/learnings)

**Q3:** What happens if you skip the brain?
**A:** Lost context, repeated mistakes, inconsistent decisions, broken continuity

**✅ Pass all 3 = Brain Update skill validated**

---

## Brain File Template

```markdown
# XX - Feature Name

**Status:** Completed | In Progress | Blocked
**Started:** YYYY-MM-DD
**Completed:** YYYY-MM-DD
**Developer:** [Name/Agent]

## Goal
What we're building and why

## Decisions Made
Key architectural decisions

## Implementation Details
How we built it (models, controllers, views, Stimulus controllers)

## Challenges Faced
Problems encountered during implementation

## Solutions Applied
How we solved the problems

## Code References
- Model: `app/models/user.rb:15-30`
- Controller: `app/controllers/users_controller.rb:10-25`
- View: `app/views/users/show.html.erb`
- Stimulus: `app/javascript/controllers/user_controller.js`

## Tests Written
What we tested and how

## What We Learned
Insights for future implementations

## Next Steps
What needs to happen next
```

---

## References

- Brain Overview: `/brain/README.md`
- State Tracking: `/brain/state/`
- Decisions: `/brain/decisions/`
- Learnings: `/brain/learnings/`

---

**The brain is mandatory. No implementation without brain update.**
