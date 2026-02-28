# Accessibility Statement

**Version:** 1.0.0
**Effective Date:** 2026-02-26
**Last Updated:** 2026-02-26
**Compliance Target:** WCAG 2.1 Level AA

---

## Our Commitment to Accessibility

JoyMatcher is committed to ensuring digital accessibility for all users, including those with disabilities. We strive to continually improve the user experience for everyone and apply the relevant accessibility standards.

**We believe that everyone deserves the opportunity to find meaningful relationships, regardless of ability.**

---

## 1. Accessibility Standards

### 1.1 Conformance Status

JoyMatcher aims to conform to the **Web Content Accessibility Guidelines (WCAG) 2.1 Level AA** published by the World Wide Web Consortium (W3C).

**Conformance Levels:**
- **Level A:** Minimum accessibility (basic)
- **Level AA:** Mid-range accessibility (target standard)
- **Level AAA:** Highest accessibility (aspirational)

**Our Target:** WCAG 2.1 Level AA across all pages and features.

---

### 1.2 Applicable Laws & Standards

**International:**
- WCAG 2.1 (W3C)
- Section 508 (US Rehabilitation Act)
- EN 301 549 (EU standard)

**Nigeria:**
- Disability Act 2018 (requires accessible services)
- National Information Technology Development Agency (NITDA) guidelines

---

## 2. Accessibility Features

### 2.1 Keyboard Navigation

**All interactive elements are keyboard-accessible:**
- ✅ Tab key navigation (sequential focus order)
- ✅ Enter/Space key activation for buttons and links
- ✅ Arrow key navigation for dropdowns and menus
- ✅ Escape key to close modals and overlays
- ✅ Focus indicators (visible outlines on focused elements)
- ✅ Skip navigation links (skip to main content)

**Keyboard Shortcuts:**
| Shortcut | Action |
|----------|--------|
| `Tab` | Navigate forward through interactive elements |
| `Shift + Tab` | Navigate backward |
| `Enter` | Activate button or link |
| `Space` | Activate button or toggle checkbox |
| `Esc` | Close modal or dropdown |
| `Arrow Keys` | Navigate dropdown options |

---

### 2.2 Screen Reader Support

**Compatible with major screen readers:**
- JAWS (Windows)
- NVDA (Windows, free)
- VoiceOver (macOS, iOS)
- TalkBack (Android)
- Narrator (Windows)

**Screen reader optimizations:**
- ✅ Semantic HTML (proper heading hierarchy, lists, landmarks)
- ✅ ARIA labels for dynamic content
- ✅ ARIA live regions for notifications
- ✅ Alt text for all images (descriptive, not decorative)
- ✅ Accessible form labels (associated with inputs)
- ✅ Accessible error messages (announced to screen readers)
- ✅ Descriptive link text (no "click here")

---

### 2.3 Visual Accessibility

#### Color Contrast
**All text meets WCAG AA contrast ratios:**
- Normal text: Minimum 4.5:1 contrast ratio
- Large text (18pt+): Minimum 3:1 contrast ratio
- UI components: Minimum 3:1 contrast ratio

**Example:**
- Primary text (#1A1A1A) on white background (#FFFFFF) = 19.8:1 ✅
- Secondary text (#4A4A4A) on white background = 9.7:1 ✅
- Link color (#7A2D7F) on white background = 6.2:1 ✅

#### Color Independence
- ✅ Information is not conveyed by color alone
- ✅ Error states include text + icons (not just red color)
- ✅ Success indicators include text + icons (not just green color)
- ✅ Form validation uses text descriptions, not just colored borders

#### Text Resizing
- ✅ Text can be resized up to 200% without loss of functionality
- ✅ Responsive typography (uses rem units, not fixed pixels)
- ✅ Layout adapts to larger text sizes

#### Dark Mode (Planned)
- ⏳ High-contrast dark theme for users with light sensitivity
- ⏳ User-selectable in [Account Settings > Accessibility]

---

### 2.4 Cognitive Accessibility

#### Clear Language
- ✅ Plain language (avoid jargon, complex terminology)
- ✅ Consistent terminology (e.g., always "Show Interest," not "Express Interest" elsewhere)
- ✅ Clear instructions for tier completion
- ✅ Concise error messages

#### Predictable Behavior
- ✅ Consistent navigation across pages
- ✅ Predictable interaction patterns (buttons look like buttons)
- ✅ No unexpected pop-ups or page redirects
- ✅ Clear focus management (focus moves logically after actions)

#### Time-Based Content
- ✅ No time limits on forms or tier completion
- ✅ Session timeout warnings (5 minutes before logout)
- ✅ No auto-playing audio or video

#### Error Prevention & Recovery
- ✅ Confirmation prompts for destructive actions (delete account, revoke tier access)
- ✅ Clear error messages with suggested fixes
- ✅ Form validation before submission (catch errors early)

---

### 2.5 Motor Accessibility

#### Large Click Targets
- ✅ Minimum 44×44 pixel touch targets (WCAG Level AAA, we exceed AA)
- ✅ Adequate spacing between interactive elements (no accidental clicks)

#### No Precision Required
- ✅ No drag-and-drop interactions (accessible alternatives provided)
- ✅ No hover-only content (all content accessible via keyboard)

#### Voice Control Support
- ✅ Proper labeling for voice navigation (e.g., "Click 'Show Interest' button")

---

## 3. Accessible Features by Section

### 3.1 Public Pages

#### Homepage (/)
- ✅ Semantic heading hierarchy (H1 > H2 > H3)
- ✅ Skip navigation link
- ✅ Alt text for hero image
- ✅ Keyboard-navigable call-to-action buttons

#### How It Works (/how-it-works)
- ✅ Step-by-step tier explanation with clear labels
- ✅ Visual tier diagram with text alternative
- ✅ Accordion pattern for tier details (keyboard-accessible)

#### Pricing (/pricing)
- ✅ Accessible pricing table (screen reader compatible)
- ✅ Clear distinction between Free, Premium, VIP tiers
- ✅ "Recommended" labels for Premium tier
- ✅ Accessible currency toggle (₦ / $)

---

### 3.2 Authentication

#### Signup (/signup)
- ✅ Accessible form labels (associated with inputs)
- ✅ Real-time validation with ARIA live regions
- ✅ Password strength indicator (text + visual)
- ✅ Error messages announced to screen readers
- ✅ "Show Password" toggle (keyboard-accessible)

#### Login (/login)
- ✅ Accessible form labels
- ✅ "Forgot Password?" link clearly labeled
- ✅ Error messages (e.g., "Incorrect password") announced

---

### 3.3 User Application

#### Dashboard (/app/dashboard)
- ✅ Welcome message with user name (screen reader friendly)
- ✅ Tier progress widget with ARIA labels
- ✅ Accessible match cards (keyboard-navigable)
- ✅ Landmark regions (navigation, main, footer)

#### Discover (/app/discover)
- ✅ Accessible profile cards (keyboard focus)
- ✅ "Show Interest" button with descriptive labels
- ✅ Filter dropdowns with keyboard navigation
- ✅ Pagination with accessible "Next" / "Previous" buttons

#### Profile View (/app/profile/:id)
- ✅ Tier visibility clearly indicated (e.g., "Tier 3 data hidden. Request access?")
- ✅ "Show Interest" button status (enabled/disabled with explanation)
- ✅ Accessible photo gallery (keyboard navigation)
- ✅ Tier request modal with clear instructions

#### Messages (/app/messages)
- ✅ Accessible conversation list (keyboard-navigable)
- ✅ Unread message indicators (text + icon, not color alone)
- ✅ Message input field with label
- ✅ Send button (keyboard-accessible)
- ✅ Timestamp labels for screen readers

---

### 3.4 Modals & Overlays

#### Show Interest Modal
- ✅ Focus trap (Tab key stays within modal)
- ✅ Escape key closes modal
- ✅ Focus returns to trigger element after close
- ✅ Tier awareness warning clearly announced to screen readers

#### Request Details Modal
- ✅ Clear explanation of reciprocal tier sharing
- ✅ Accessible tier selection (checkboxes with labels)
- ✅ "Send Request" button with confirmation message

#### Upgrade Modal
- ✅ Accessible pricing comparison
- ✅ Clear benefits list (semantic HTML list)
- ✅ "Upgrade Now" button with clear action label

---

## 4. Known Accessibility Issues

### 4.1 Current Limitations (To Be Fixed)

**Photo Upload Drag-and-Drop (In Progress):**
- ⚠️ Drag-and-drop photo upload may not be fully keyboard-accessible
- **Workaround:** "Browse Files" button provides accessible alternative
- **Fix planned:** Phase 2 (Q2 2026)

**VIP Video Verification (In Progress):**
- ⚠️ Video recording interface may require manual review for screen reader users
- **Workaround:** VIP Coordinator can schedule phone call for alternative verification
- **Fix planned:** Phase 2 (Q2 2026)

**Charts & Visualizations (Admin Panel):**
- ⚠️ Some admin analytics charts may lack text alternatives
- **Impact:** Only affects admin users (not public-facing)
- **Fix planned:** Phase 3 (Q3 2026)

---

### 4.2 Third-Party Content

**Payment Processors (Paystack, Stripe):**
- Accessibility controlled by third parties
- We have verified their WCAG 2.1 AA conformance
- If you encounter issues, contact: accessibility@joymatcher.com

**Google Analytics (If Used):**
- Cookie consent banner is fully accessible
- Analytics tracking does not affect user-facing accessibility

---

## 5. Testing & Validation

### 5.1 Testing Methods

**Automated Testing:**
- ✅ Lighthouse accessibility audit (Chrome DevTools)
- ✅ axe DevTools (browser extension)
- ✅ WAVE accessibility checker
- ✅ Pa11y automated testing

**Manual Testing:**
- ✅ Keyboard-only navigation (no mouse)
- ✅ Screen reader testing (NVDA, VoiceOver)
- ✅ Color contrast verification (Contrast Checker tools)
- ✅ Text resizing (up to 200%)
- ✅ Zoom testing (up to 400%)

**User Testing:**
- ⏳ Testing with users with disabilities (planned for Q2 2026)
- ⏳ Feedback from accessibility consultants

---

### 5.2 Ongoing Monitoring

We conduct accessibility audits:
- **Quarterly:** Full WCAG audit of all pages
- **Before major releases:** Accessibility regression testing
- **After user reports:** Immediate issue investigation

---

## 6. Feedback & Assistance

### 6.1 Report Accessibility Issues

If you encounter accessibility barriers:

**Email:** accessibility@joymatcher.com

**Include:**
- Page or feature affected (e.g., "/app/discover", "Show Interest button")
- Your assistive technology (e.g., "JAWS 2024, Windows 11")
- Description of the issue
- Screenshots or screen recordings (optional)

**Response time:** Within 3 business days

---

### 6.2 Request Assistance

If you need help using JoyMatcher due to accessibility barriers:

**Email:** support@joymatcher.com
**Subject:** Accessibility Assistance Request

**We will provide:**
- Personal assistance to complete tasks
- Alternative formats for content (e.g., PDF profile export)
- Workarounds for known issues

---

### 6.3 Accessibility Complaints

If you believe we are not meeting accessibility standards:

**Email:** accessibility@joymatcher.com
**Subject:** Accessibility Complaint

**We will:**
1. Acknowledge receipt within 2 business days
2. Investigate the issue within 7 business days
3. Provide a remediation plan (if issue confirmed)
4. Implement fix within 30 days (priority) or 90 days (complex fixes)

---

## 7. Continuous Improvement

### 7.1 Accessibility Roadmap

**Phase 1 (Q1 2026) - WCAG 2.1 AA Baseline:**
- ✅ Keyboard navigation
- ✅ Screen reader support
- ✅ Color contrast compliance
- ✅ Semantic HTML

**Phase 2 (Q2 2026) - Enhancements:**
- ⏳ Dark mode / high-contrast theme
- ⏳ User testing with disability groups
- ⏳ Improved photo upload accessibility
- ⏳ Alternative VIP video verification

**Phase 3 (Q3 2026) - WCAG 2.1 AAA (Aspirational):**
- ⏳ Enhanced contrast options
- ⏳ Sign language videos (How It Works)
- ⏳ Simplified language mode
- ⏳ Voice navigation enhancements

---

### 7.2 Accessibility Team

**Accessibility Lead:** [Designated team member]
**Responsibilities:**
- Conduct quarterly audits
- Review user feedback
- Train development team on accessibility best practices
- Coordinate with external consultants

---

## 8. Training & Awareness

### 8.1 Team Training

All JoyMatcher team members receive:
- Accessibility fundamentals training (onboarding)
- WCAG 2.1 guidelines training (development team)
- Assistive technology demos (designers, product managers)
- Quarterly refresher training

---

### 8.2 External Resources

We follow guidance from:
- W3C Web Accessibility Initiative (WAI)
- WebAIM (Web Accessibility in Mind)
- Deque University
- A11y Project

---

## 9. Alternative Formats

### 9.1 Content in Alternative Formats

If you need content in alternative formats (e.g., large print, audio):

**Email:** accessibility@joymatcher.com

**Available formats:**
- PDF (accessible, tagged)
- Large print (18pt+ font)
- Plain text
- Audio recording (for long documents)

**Turnaround time:** 5 business days

---

## 10. Related Documentation

- [Privacy Policy](privacy_policy.md) - Data protection
- [Terms of Service](terms_of_service.md) - Legal agreement
- [Community Guidelines](community_guidelines.md) - Behavioral standards
- [Design System - Accessibility Patterns](../Design%20System/accessibility_patterns.md) - Technical implementation

---

## 11. Legal Notice (Nigeria Disability Act 2018)

JoyMatcher complies with the **Discrimination Against Persons with Disabilities (Prohibition) Act 2018**, which requires:
- Accessible digital services
- Reasonable accommodations for users with disabilities
- Non-discrimination in service provision

**Violations of accessibility rights may be reported to:**
- National Commission for Persons with Disabilities (NCPWD)
- Website: ncpwd.gov.ng
- Email: info@ncpwd.gov.ng

---

## 12. Contact Information

**Accessibility Inquiries:**
- Email: accessibility@joymatcher.com
- Response time: 3 business days

**General Support:**
- Email: support@joymatcher.com
- Response time: 24 hours

**Mailing Address:**
JoyMatcher Limited
[Insert Lagos, Nigeria address]

---

**Last Updated:** 2026-02-26
**Effective Date:** 2026-02-26
**Version:** 1.0.0

**Next Accessibility Audit:** 2026-05-26 (Quarterly)

---

**Document Owner:** Accessibility Lead
**Legal Review:** Legal Counsel
**Last Reviewed:** 2026-02-26
**Next Review:** 2026-05-26 (Quarterly)
