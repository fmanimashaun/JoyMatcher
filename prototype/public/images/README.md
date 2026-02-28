# JoyMatcher Image Assets

## Directory Structure

```
images/
├── hero/                      # Hero section images for landing pages
├── couples/                   # Couple photos for success stories
├── profiles/                  # Individual profile photos
│   ├── women/                # Female profiles (4 images)
│   └── men/                  # Male profiles (4 images)
├── features/                  # Feature demonstration images
├── backgrounds/              # Background/cityscape images
├── vip/                      # VIP service imagery
├── success-stories/          # Home page testimonials (4 couples)
└── illustrations/            # Custom SVG illustrations

```

---

## Current Usage

### Home Page
- **Testimonials Section**: `/success-stories/` (4 couples - coffee date, traditional wedding, diaspora, rooftop dinner)
- **Phone Mockup**: `/profiles/women/woman-professional-corporate.png`

### Success Stories Page
- **12 different couples** with pagination (6 per page)
- Uses images from `/couples/`, `/hero/`, and `/features/`
- NO overlap with Home page testimonials

### VIP Page
- **VIP Concierge**: `/vip-concierge-professional.png`

### How It Works Page
- **EDT Diagram**: `/illustrations/edt-diagram.svg`
- **Tier Progression**: `/illustrations/tier-progression.svg`

---

## Available Assets

### Couples (Success Stories)
- `couple-art-gallery-formal.png` - Elegant art gallery date
- `couple-cultural-festival.png` - Cultural event
- `couple-lagos-romance.png` - Lagos romantic setting

### Hero Images
- `hero-couple-coffee-date.png` - Professional coffee date
- `hero-couple-art-gallery.png` - Cultural sophistication
- `hero-couple-outdoor-walk.png` - Casual outdoor walk

### Success Stories (Home Page Only)
- `couple-coffee-date.png`
- `couple-traditional-wedding.png`
- `couple-diaspora-toronto.png`
- `couple-rooftop-dinner.png`

### Profile Photos - Women (4)
- `woman-professional-corporate.png`
- `woman-lawyer-business.png`
- `woman-educator-teacher.png`
- `woman-entrepreneur-business.png`

### Profile Photos - Men (4)
- `man-tech-professional.png`
- `man-doctor-healthcare.png`
- `man-finance-analyst.png`
- `man-engineer-industrial.png`

### Features
- `feature-video-chat.png` - Split-screen video call

### VIP
- `vip-concierge-professional.png` - Professional matchmaker

### Custom Illustrations (SVG)
- `avatar-female-1.svg`, `avatar-female-2.svg`
- `avatar-male-1.svg`, `avatar-male-2.svg`
- `edt-diagram.svg` - EDT calculation visualization
- `tier-progression.svg` - 5 tiers visualization
- `vip-concierge.svg` - VIP service diagram
- `hero-couple.svg` - Abstract couple illustration
- `trust-icon.svg`, `reciprocity-icon.svg`, `marriage-icon.svg`, `verified-icon.svg`

---

## Image Strategy

### Differentiation
- **Home Page**: Shows 4 featured testimonials (coffee, wedding, diaspora, rooftop)
- **Success Stories Page**: Shows 12 DIFFERENT couples across 2 pages

### Future Additions
When adding more images:
1. Place couple photos in `/couples/`
2. Add to Success Stories page `allStories` array
3. Pagination will automatically adjust

### Profile Images
Use for:
- Discover page mockups
- Profile card demonstrations
- "How It Works" examples
- Feature showcases

---

## Notes
- All real photos maintain professional, marriage-minded aesthetic
- Custom SVG illustrations use brand gradient (purple #4D0052 to coral #F16A6F)
- Original assets cleaned up from `src/assets/others/`
