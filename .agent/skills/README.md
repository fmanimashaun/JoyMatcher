# JoyMatcher Agent Skills

**Total Skills:** 11
**Format:** Google Gemini Antigravity
**Last Updated:** 2026-02-27

---

## Overview

This directory contains agent skills for JoyMatcher in Google Antigravity format. Each skill folder has a `SKILL.md` file that the agent reads to determine when to trigger the skill.

## Skill List

### Mandatory Prerequisites (Always Trigger First)

1. **[documentation-consultation](./documentation-consultation/)** - Always read `/docs/` before coding
2. **[brain-update](./brain-update/)** - Read `/brain/` before implementing, update after

### Core Business Logic (Critical)

3. **[tier-system-enforcement](./tier-system-enforcement/)** - Implement 5-tier progressive disclosure
4. **[edt-calculation](./edt-calculation/)** - Calculate Effective Disclosure Tier
5. **[show-interest-gating](./show-interest-gating/)** - Enforce consent-based interaction
6. **[subscription-tier-logic](./subscription-tier-logic/)** - Subscription-based features

### Admin & Safety (Critical)

7. **[admin-rbac-verification](./admin-rbac-verification/)** - Role-based access control
8. **[anti-gravity-checking](./anti-gravity-checking/)** - Prevent system exploitation

### Development (High Priority)

9. **[rails-development](./rails-development/)** - Build with Rails 8 + Hotwire
10. **[design-system-application](./design-system-application/)** - Apply JoyMatcher design system
11. **[vip-workflow-implementation](./vip-workflow-implementation/)** - 10-step VIP lifecycle

---

## Skill Folder Structure

Each skill follows this structure:

```
<skill-name>/
├── SKILL.md          # MANDATORY: YAML frontmatter + Markdown instructions
├── scripts/          # OPTIONAL: Executable scripts
├── resources/        # OPTIONAL: Documentation, templates, examples
└── assets/           # OPTIONAL: Images, icons, logos
```

---

## SKILL.md Format

```markdown
---
name: Skill Name
description: Brief description for semantic matching (used by agent to decide when to trigger)
---

# Skill Name

## Goal
What this skill does

## When to Trigger
Scenarios that require this skill

## Instructions
Step-by-step implementation guide

## Constraints
MUST DO / MUST NOT DO rules

## References
Links to documentation
```

---

## How Skills are Triggered

The agent reads the `description` field in YAML frontmatter for semantic matching:

**Example:** User asks "build tier completion form"
→ Agent matches to `tier-system-enforcement` skill (description mentions "5-tier system")
→ Agent reads `SKILL.md` and follows instructions

---

## Skill Dependencies

```
01. documentation-consultation (PREREQUISITE FOR ALL)
    ↓
02. brain-update (MANDATORY BEFORE & AFTER ALL IMPLEMENTATIONS)
    ↓
├── 03. tier-system-enforcement
│   └── 04. edt-calculation
│       └── 05. show-interest-gating
│           └── 06. subscription-tier-logic
│
├── 07. admin-rbac-verification
│   └── 11. vip-workflow-implementation
│
├── 08. anti-gravity-checking (applies to ALL)
│
├── 09. rails-development
│
└── 10. design-system-application (applies to ALL UI)
```

---

## Quick Reference

| Task | Required Skills |
|------|----------------|
| Build tier feature | 01, 02, 03, 04 |
| Build interaction flow | 01, 02, 05, 06 |
| Build admin dashboard | 01, 02, 07 |
| Build VIP feature | 01, 02, 07, 11 |
| Prevent exploitation | 01, 02, 08 |
| Build UI component | 01, 02, 10 |
| Build Rails feature | 01, 02, 09 |

**Note:** Skills 01 (documentation-consultation) and 02 (brain-update) are MANDATORY for ALL tasks.

---

## Adding New Skills

1. Create folder: `.agent/skills/<skill-name>/`
2. Create `SKILL.md` with YAML frontmatter
3. Add description for semantic matching
4. Add scripts/resources/assets if needed
5. Update this README

---

## Testing Skills

To test if agent triggers skill correctly:

1. Ask question that matches skill description
2. Verify agent loads correct SKILL.md
3. Check if agent follows instructions
4. Validate against constraints

---

## Related Files

- **Main Configuration:** `.antigravity/` (deprecated - use `.agent/` instead)
- **Documentation:** `docs/` (70+ specification files)
- **Prototype:** `prototype/` (React - visual reference only)
- **Claude Contract:** `CLAUDE.md`
- **Rules:** `.agent/rules.md` (if exists)

---

**Project:** JoyMatcher
**Type:** Trust-based matchmaking platform
**Technology:** Rails 8 + Hotwire (Turbo + Stimulus)
**Prototype:** React 19.2.0 (documentation/visual reference only)
