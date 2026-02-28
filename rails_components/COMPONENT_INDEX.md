# JoyMatcher Component Index

**Quick Reference Guide for All 60+ Rails Components**

---

## ✅ Completed Components (9)

### Actions
1. **Button** (`ui/_button.html.erb`) - All variants, sizes, loading states
   ```erb
   <%= render 'ui/button', text: 'Sign Up', variant: 'primary', size: 'large' %>
   ```

### Containers
2. **Card** (`ui/_card.html.erb`) - Tier lock support, compound components
   ```erb
   <%= render 'ui/card', variant: 'elevated', locked: true, tier_required: 3 do %>
   ```

3. **Accordion** (`ui/_accordion.html.erb`) - WCAG compliant, keyboard nav
   ```erb
   <%= render 'ui/accordion', items: @faq_items, variant: 'bordered' %>
   ```

### Feedback
4. **Modal** (`ui/_modal.html.erb`) - Focus trap, ESC/backdrop close
   ```erb
   <%= render 'ui/modal', id: 'tier-warning', title: 'Tier Awareness' do %>
   ```

5. **Toast** (`ui/_toast.html.erb`) - Auto-dismiss, 4 variants
   ```erb
   <%# Via Stimulus controller %>
   toast.show({ variant: 'success', message: 'Saved!' })
   ```

6. **Alert** (`ui/_alert.html.erb`) - Info/success/warning/error banners
   ```erb
   <%= render 'ui/alert', title: 'Success', message: 'Updated!', variant: 'success' %>
   ```

### Data Display
7. **Badge** (`ui/_badge.html.erb`) - Status, verification, tier badges
   ```erb
   <%= render 'ui/badge', text: 'Verified', variant: 'success', icon: 'lucide:check-circle' %>
   ```

8. **Avatar** (`ui/_avatar.html.erb`) - Images, initials, status indicators
   ```erb
   <%= render 'ui/avatar', src: user.avatar_url, name: user.name, status: 'online' %>
   ```

9. **Progress Bar** (`ui/_progress_bar.html.erb`) - Tier completion, uploads
   ```erb
   <%= render 'ui/progress_bar', value: 75, label: 'Profile Completion', variant: 'premium' %>
   ```

---

## 🔄 High Priority (Next 11 - Week 1)

### Forms (6)
10. **Text Input** - Form text fields with validation
11. **Textarea** - Multi-line text input
12. **Select** - Dropdown selection
13. **Checkbox** - Single/multi selection
14. **Radio Group** - Mutually exclusive options
15. **Switch** - Toggle on/off

### Feedback (2)
16. **Tooltip** - Hover/focus information
17. **Spinner** - Loading indicator

### Containers (2)
18. **Tabs** - Tabbed content (see Interests page)
19. **Drawer** - Side panel

### Navigation (1)
20. **Breadcrumbs** - Navigation path

---

## ⏳ Medium Priority (21-40 - Week 2-3)

### Forms
21. File Upload
22. Date Picker
23. Time Picker
24. Slider
25. Range Slider
26. Combobox
27. Search
28. Tag Input

### Navigation
29. Pagination
30. Steps
31. Menu
32. Navbar
33. Sidebar

### Data Display
34. Table
35. List
36. Description List
37. Timeline
38. Stat
39. Tag
40. Chip

---

## 📅 Low Priority (41-60+ - Month 1-2)

### Containers
41. Panel
42. Collapsible
43. Container
44. Stack
45. Inline
46. Grid
47. Divider

### Actions
48. Icon Button
49. Button Group
50. Dropdown Menu
51. Context Menu
52. FAB
53. Split Button
54. Toggle Button
55. Link

### Media
56. Image
57. Carousel
58. Gallery
59. Video Player
60. Icon

### Status
61. Status Indicator
62. Label
63. Verification Badge (Custom)
64. Kbd (Keyboard key)

---

## Component Usage Patterns

### Tier-Specific Components

**Locked Content:**
```erb
<%= render 'ui/card', locked: true, tier_required: 3 do %>
  <p>Family background information...</p>
<% end %>
```

**Tier Badge:**
```erb
<%= render 'ui/badge', text: "Tier #{@user.completed_tier} Complete", variant: 'info' %>
```

**Tier Progress:**
```erb
<%= render 'ui/progress_bar',
  value: @user.tier_completion_percentage,
  label: 'Profile Completion',
  variant: 'premium'
%>
```

### Subscription-Specific Components

**Premium Badge:**
```erb
<%= render 'ui/badge', text: 'Premium', variant: 'premium' %>
```

**VIP Avatar:**
```erb
<%= render 'ui/avatar',
  src: @user.avatar_url,
  name: @user.name,
  variant: 'vip',
  badge: 'lucide:crown'
%>
```

**Upgrade Modal:**
```erb
<%= render 'ui/modal', id: 'upgrade-modal', title: 'Upgrade to Premium' do %>
  <%= render 'ui/alert',
    variant: 'warning',
    message: 'Unlock Tiers 3-4 with Premium membership.'
  %>
  <%= render 'ui/button', text: 'Upgrade Now', variant: 'primary', full_width: true %>
<% end %>
```

### Verification Components

**Verification Badge:**
```erb
<%= render 'ui/badge',
  text: 'ID Verified',
  variant: 'success',
  icon: 'lucide:shield-check'
%>
```

**Verified Avatar:**
```erb
<%= render 'ui/avatar',
  src: @user.avatar_url,
  name: @user.name,
  badge: 'lucide:check-circle'
%>
```

### Toast Notifications

**Success:**
```javascript
toast.show({
  variant: 'success',
  message: 'Profile updated successfully!',
  duration: 5000
})
```

**Error:**
```javascript
toast.show({
  variant: 'error',
  title: 'Upload Failed',
  message: 'Photo must be under 10MB.',
  duration: 0 // Manual dismiss
})
```

**Tier Warning:**
```javascript
toast.show({
  variant: 'warning',
  message: 'You cannot complete Tier 3 with Free subscription.',
  action_text: 'Upgrade',
  action_href: '/pricing'
})
```

---

## Design System Compliance Checklist

All components MUST follow these standards:

### ✅ Colors
- **Primary:** `#4D0052` (Purple Deep)
- **Accent:** `#F16A6F` (Coral)
- **Gradient:** `from-[#4D0052] to-[#F16A6F]`
- **Backgrounds:** Purple-tinted HSLA (320 hue)
- **Text Primary:** `hsla(320,50%,15%,1)`
- **Text Secondary:** `hsla(320,30%,35%,1)`
- **Borders:** `hsla(320,25%,85%,1)`

### ✅ Typography
- **Font:** Georgia serif (`font-serif`)
- **Line Height:** 1.6 (editorial quality)
- **Sizes:** xs(12px), sm(14px), base(16px), lg(18px), xl(20px), 2xl(24px), 3xl(30px)

### ✅ Spacing
- **Tight:** 12px
- **Compact:** 20px
- **Standard:** 32px
- **Relaxed:** 48px
- **Section:** 64px

### ✅ Shadows (Purple-tinted)
- **Subtle:** `0 2px 8px rgba(77,0,82,0.08)`
- **Moderate:** `0 4px 16px rgba(77,0,82,0.12)`
- **Pronounced:** `0 8px 24px rgba(77,0,82,0.16)`

### ✅ Accessibility
- ARIA labels on all interactive elements
- Keyboard navigation (Tab, Enter, ESC, Arrows)
- Focus visible (`focus:ring-2 focus:ring-[#4D0052]`)
- Screen reader support
- 44x44px minimum touch targets

---

## Next Steps

1. **Week 1:** Complete high-priority components (10-20)
2. **Week 2-3:** Implement medium-priority forms + navigation (21-40)
3. **Month 1-2:** Build remaining advanced components (41-60+)
4. **Ongoing:** Update CLAUDE.md, docs/, and agent skills with component references

---

**Last Updated:** 2026-02-28
**Maintained By:** Development Team
