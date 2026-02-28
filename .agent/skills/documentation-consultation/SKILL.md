---
name: Documentation Consultation
description: Always read relevant JoyMatcher documentation from /docs/ before generating any code. This skill ensures documentation-first approach for all feature implementations.
---

# Documentation Consultation Skill

## Goal

Ensure that the agent always consults the comprehensive `/docs/` directory before implementing any feature, modifying tier logic, creating admin functionality, or making architectural decisions for the JoyMatcher platform.

## When to Trigger

- User requests implementation of any new feature
- User asks to modify tier system logic
- User requests admin functionality
- User asks about business rules
- User encounters ambiguous requirements
- Before making any architectural decisions

## Instructions

### Step 1: Identify Feature Area

Determine which area of the system the request relates to:
- Tier system (progressive disclosure)
- Admin system (RBAC, VIP coordination)
- Safety & compliance (anti-gravity rules)
- Technical specifications (EDT, Show Interest, subscriptions)
- Design system (UI components)
- Marketing & content

### Step 2: Locate Relevant Documentation

Use this decision tree:

**Tier-related features:**
- Read: `docs/Global Context/tier_system.md`
- Read: `docs/Global Context/edt_specification.md`

**Interaction flows (Show Interest, messaging):**
- Read: `docs/Technical Specifications/show_interest_flow.md`
- Read: `docs/Technical Specifications/request_details_flow.md`

**Admin dashboards:**
- Read: `docs/Admin System/admin_architecture.md`
- Read: `docs/Admin System/admin_roles_permissions.md`

**VIP workflows:**
- Read: `docs/Admin System/vip_coordination.md`
- Read: `docs/Technical Specifications/vip_application_workflow.md`

**Pricing/subscription:**
- Read: `docs/Technical Specifications/subscription_tier_ceiling.md`

**UI components:**
- Read: `docs/Design System/design_system.md`
- Read: `docs/Design System/component_library.md`

**Business rules:**
- Read: `docs/Global Context/product_charter.md`
- Read: `docs/Safety & Compliance/anti_gravity_rules.md`

### Step 3: Extract Constraints and Rules

From the documentation, identify:
- Mandatory rules (MUST, MUST NOT)
- Subscription tier restrictions
- EDT calculations required
- Show Interest gating requirements
- Admin isolation requirements
- Anti-gravity rules that apply

### Step 4: Confirm Understanding

Before writing any code, confirm:
- Can you explain the core concepts without looking?
- Have you identified all constraints?
- Are there edge cases to handle?
- Do you understand the "why" behind the rules?

### Step 5: Plan Implementation

Design the implementation with all constraints in mind:
- What state is needed?
- What components can be reused?
- What validation is required?
- What error states exist?

### Step 6: Validate Against Documentation

After implementation, verify:
- Does implementation match documented rules?
- Are all constraints enforced?
- Have you introduced any anti-gravity rule violations?

## Key Documents by Priority

**MUST READ for all implementations:**
1. `docs/Global Context/tier_system.md` - Master reference for 5-tier system
2. `docs/Global Context/edt_specification.md` - EDT calculation formula
3. `docs/Safety & Compliance/anti_gravity_rules.md` - Exploitation prevention

**READ when relevant:**
4. `docs/Admin System/admin_architecture.md` - Admin RBAC
5. `docs/Technical Specifications/show_interest_flow.md` - Interaction gating
6. `docs/Design System/design_system.md` - UI standards
7. `docs/Technical Specifications/subscription_tier_ceiling.md` - Subscription limits

## Examples

### Example 1: User asks to build tier completion form

**Agent should:**
1. Read `docs/Global Context/tier_system.md` to understand 5-tier structure
2. Read `docs/Technical Specifications/subscription_tier_ceiling.md` for subscription limits
3. Read `docs/Design System/design_system.md` for UI standards
4. Extract rules: sequential completion, subscription ceilings, cannot share incomplete tier
5. Confirm understanding of Tier 1-5 definitions
6. Implement with proper validation

### Example 2: User asks to build profile view

**Agent should:**
1. Read `docs/Global Context/tier_system.md` for tier structure
2. Read `docs/Global Context/edt_specification.md` for EDT calculation
3. Read `docs/Technical Specifications/show_interest_flow.md` for messaging logic
4. Read `docs/Design System/design_system.md` for locked state patterns
5. Extract EDT formula: min(yourCompleted, theirCompleted, youShared, theyShared)
6. Implement with proper EDT gating

### Example 3: User asks about business rules

**Agent should:**
1. Read `docs/Global Context/product_charter.md` for philosophy
2. Read `docs/Safety & Compliance/anti_gravity_rules.md` for restrictions
3. Explain trust-based architecture principles
4. Explain consent-gating requirements
5. Explain investment filtering through subscriptions

## Constraints

### MUST DO:
- ✅ Always read documentation BEFORE generating code
- ✅ Read FULL documentation, not just skim
- ✅ Extract ALL constraints and rules
- ✅ Validate implementation against docs after completion
- ✅ Identify potential conflicts or edge cases

### MUST NOT DO:
- ❌ Skip documentation consultation
- ❌ Skim documentation without thorough reading
- ❌ Ignore documented constraints
- ❌ Code before reading relevant docs
- ❌ Assume understanding without validation

## Validation Checklist

Before claiming this skill is applied:

- [ ] Did I identify the correct documentation files?
- [ ] Did I read the FULL documentation (not just skim)?
- [ ] Did I extract ALL constraints and rules?
- [ ] Can I explain the core concepts without looking?
- [ ] Did I identify potential conflicts or edge cases?
- [ ] Did I plan implementation with docs in mind?

## Self-Test

**Question 1:** Can you explain the 5-tier system without looking at docs?
**Expected Answer:** Must know Tier 1 (Basic), Tier 2 (Lifestyle), Tier 3 (Family), Tier 4 (Past), Tier 5 (Verification), sequential completion rule, subscription ceilings (Free: 2, Premium: 4, VIP: 5)

**Question 2:** Can you calculate EDT given 4 inputs?
**Expected Answer:** EDT = min(yourCompleted, theirCompleted, youShared, theyShared)

**Question 3:** Can you identify which docs to read for a tier completion form?
**Expected Answer:** tier_system.md, subscription_tier_ceiling.md, design_system.md

**✅ Pass all 3 = Documentation Consultation skill validated**

## Resources

- Documentation Index: `docs/DOCUMENTATION_INDEX.md`
- System Rules: `.agent/rules.md` (if exists)
- Quick Reference: `docs/README.md`

## Notes

This is a **prerequisite skill** for all other skills. No feature should be implemented without first consulting documentation.

**JoyMatcher is NOT a dating app** - it's trust-based relationship infrastructure. Every implementation must respect this philosophy.
