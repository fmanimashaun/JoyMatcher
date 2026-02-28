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

## Rails Component Library

**Location:** `/rails_components/`
**Status:** 64 components complete (100%)

### Quick Usage

```erb
<%# Button %>
<%= render 'ui/button', text: 'Sign Up', variant: 'primary', size: 'large' %>

<%# Tier-Locked Card %>
<%= render 'ui/card', locked: true, tier_required: 3 do %>
  <h3>Family Background</h3>
  <p>This information is locked until you complete Tier 3.</p>
<% end %>

<%# Form Input %>
<%= render 'forms/text_input',
  name: 'user[name]',
  label: 'Full Name',
  placeholder: 'Enter your full name',
  required: true,
  icon_left: 'lucide:user'
%>

<%# Progress Bar %>
<%= render 'ui/progress_bar',
  value: @user.tier_completion_percentage,
  label: 'Profile Completion',
  variant: 'premium'
%>

<%# Toast Notification %>
<script>
  const toastController = document.querySelector('[data-controller="toast"]')
  toastController.toast.show({
    variant: 'success',
    message: 'Profile updated successfully!',
    duration: 5000
  })
</script>
```

### Component Categories

**Forms (12):** text_input, textarea, select, checkbox, radio_group, switch, file_upload, slider, date_picker, search, tag_input, form_group

**UI (37):** button, card, accordion, modal, toast, alert, badge, avatar, progress_bar, breadcrumbs, pagination, tabs, steps, dropdown, tooltip, skip_link, spinner, skeleton, list, description_list, stat, tag, chip, timeline, kbd, empty_state, divider, drawer, collapsible, stack, grid, icon_button, button_group, image, icon, status_indicator, verification_badge

**Stimulus (15):** accordion, modal, toast, switch, character_count, dismissible, file_upload, slider, search, tag_input, tabs, dropdown, tooltip, drawer, collapsible

### Documentation

- README: `/rails_components/README.md`
- Component Index: `/rails_components/COMPONENT_INDEX.md`
- Final Summary: `/rails_components/FINAL_SUMMARY.md`

## Locked State Pattern (React Prototype)

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
