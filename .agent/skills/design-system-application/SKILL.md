---
name: Design System Application
description: Apply JoyMatcher design system - calm professional aesthetic, NOT a dating app. Purple-deep primary, Coral secondary, Playfair Display + Inter, locked state patterns.
---

# Design System Application Skill

## Goal

Apply JoyMatcher design system consistently. Brand identity: trust-focused relationship infrastructure (NOT dating app).

## Brand Identity

- Calm, professional aesthetic
- Trust-focused visual hierarchy
- No gamification, no swipe gestures
- Marriage-oriented positioning

## Color Palette

```css
--jm-purple-deep: #4D0052;  /* Primary */
--jm-coral: #F16A6F;         /* Secondary */
--jm-gray-50: #F9FAFB;       /* Backgrounds */
--jm-gray-900: #111827;      /* Text */
--jm-success: #10B981;       /* Success */
```

## Typography

- **Headings:** Playfair Display (serif)
- **Body:** Inter (sans-serif)

## Locked State Pattern

```javascript
<div className="relative">
  <div className="opacity-50">{/* Content */}</div>
  <div className="absolute inset-0 flex items-center justify-center">
    <LockIcon />
    <p>Upgrade to Premium to unlock</p>
    <Button>Upgrade Now</Button>
  </div>
</div>
```

## Constraints

### MUST DO:
- ✅ Use brand colors
- ✅ Playfair Display + Inter
- ✅ Clear locked states

### MUST NOT DO:
- ❌ Dating app aesthetics
- ❌ Gamification (swipe, hearts)

## References

- Master: `docs/Design System/design_system.md`
