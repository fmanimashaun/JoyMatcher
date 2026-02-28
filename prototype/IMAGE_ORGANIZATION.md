# JoyMatcher Image Asset Organization

## Directory Structure

```
public/images/
├── hero/                      # Large hero/banner images for landing sections
├── couples/                   # Couple photos for testimonials and success stories
├── profiles/                  # Individual profile photos
│   ├── women/                # Female profiles
│   └── men/                  # Male profiles
├── features/                  # Feature showcase and "How It Works" images
├── backgrounds/              # Background/cityscape images
└── vip/                      # VIP-specific imagery
```

---

## Image Categorization & Usage Guide

### 1. HERO IMAGES (`/images/hero/`)
**Purpose**: Large, high-impact images for hero sections on landing pages

| New Filename | Original | Use Case | Page |
|-------------|----------|----------|------|
| `hero-couple-coffee-date.png` | Hero-Couple-Coffee-Date | Homepage hero, Early dating stage | Home |
| `hero-couple-art-gallery.png` | Hero-Couple-Art-Gallery | Cultural sophistication, Premium tier | Home, Pricing |
| `hero-couple-outdoor-walk.png` | Hero-Couple-Outdoor-Walk | Casual connection, natural setting | Home, How It Works |
| `hero-couple-rooftop-dinner.png` | Hero-Couple-Rooftop-Dinner | Elegant date, Lagos skyline | Home, VIP |
| `hero-couple-lagos-romance.png` | Hero-Nigerian-Couple-Lagos | Local Nigerian focus | Home |
| `hero-traditional-wedding.png` | Hero-Nigerian-Traditional-We | Marriage outcome, cultural pride | Success Stories, Home |
| `hero-cultural-festival.png` | Hero-Couple-Cultural-Festiva | Shared values, cultural connection | How It Works |

---

### 2. SUCCESS STORIES / TESTIMONIALS (`/images/couples/`)
**Purpose**: Authentic couple photos showing relationship progression and outcomes

| New Filename | Stage | Use Case |
|-------------|-------|----------|
| `couple-coffee-professional.png` | Dating | Professional couple, early connection |
| `couple-rooftop-elegant.png` | Dating | Upscale date, serious courtship |
| `couple-art-gallery-formal.png` | Courtship | Cultural date, sophisticated |
| `couple-outdoor-casual.png` | Dating | Relaxed, natural connection |
| `couple-traditional-wedding.png` | Married | Cultural wedding, successful outcome |
| `couple-diaspora-toronto.png` | Engaged | Cross-border success, diaspora |

**Usage**: Home page testimonials, Success Stories page, About page

---

### 3. PROFILE PHOTOS - WOMEN (`/images/profiles/women/`)
**Purpose**: Individual profile photos for mockups, discover page, and demonstrations

#### Nigerian Women
| New Filename | Profession/Context | Use Case |
|-------------|-------------------|----------|
| `woman-professional-corporate.png` | Corporate Professional | Tier 2-3 profile example |
| `woman-lawyer-business.png` | Lawyer | Premium tier showcase |
| `woman-accountant-finance.png` | Accountant | Professional profile |
| `woman-educator-teacher.png` | Educator | Tier 3 example |
| `woman-entrepreneur-business.png` | Entrepreneur | Success story profile |
| `woman-pharmacist-healthcare.png` | Pharmacist | Healthcare professional |
| `woman-scientist-research.png` | Scientist | STEM professional |
| `woman-hr-manager.png` | HR Manager | Corporate professional |
| `woman-marketing-creative.png` | Marketing | Creative professional |
| `woman-traditional-attire.png` | Traditional | Cultural heritage showcase |
| `woman-modern-casual.png` | Modern Casual | Weekend/lifestyle photo |
| `woman-fusion-style.png` | Fusion Style | Contemporary Nigerian |
| `woman-coworking-space.png` | Tech/Startup | Modern workspace |
| `woman-weekend-casual.png` | Weekend Look | Casual tier 1 |

#### Diaspora Women
| New Filename | Location | Use Case |
|-------------|----------|----------|
| `woman-diaspora-toronto.png` | Toronto | Diaspora success story |
| `woman-diaspora-developer.png` | Tech/Remote | Remote work lifestyle |
| `woman-diaspora-remote-work.png` | Digital Nomad | Remote professional |

#### Ghanaian Women
| New Filename | Context | Use Case |
|-------------|---------|----------|
| `woman-ghanaian-professional.png` | Professional | Regional diversity |
| `woman-ghanaian-kente.png` | Traditional Kente | Cultural pride |

#### Kenyan Women
| New Filename | Context | Use Case |
|-------------|---------|----------|
| `woman-kenyan-finance.png` | Finance Professional | East African market |
| `woman-kenyan-traditional.png` | Traditional | Cultural representation |

---

### 4. PROFILE PHOTOS - MEN (`/images/profiles/men/`)
**Purpose**: Individual profile photos for mockups, discover page, and demonstrations

#### Nigerian Men
| New Filename | Profession/Context | Use Case |
|-------------|-------------------|----------|
| `man-tech-professional.png` | Tech Professional | Premium tier, Lagos tech scene |
| `man-doctor-healthcare.png` | Doctor | VIP tier, healthcare |
| `man-banker-finance.png` | Banker | Finance professional |
| `man-engineer-industrial.png` | Engineer | Engineering/tech |
| `man-finance-analyst.png` | Finance Analyst | Corporate professional |
| `man-chef-culinary.png` | Chef | Creative professional |
| `man-journalist-media.png` | Journalist | Media professional |
| `man-pilot-aviation.png` | Pilot | High-earning professional |
| `man-real-estate-developer.png` | Real Estate | Business owner |
| `man-professional-suit.png` | General Professional | Corporate setting |
| `man-traditional-agbada-1.png` | Traditional (Agbada) | Cultural showcase |
| `man-traditional-agbada-2.png` | Traditional (Agbada) | Cultural variety |
| `man-casual-weekend.png` | Casual | Lifestyle photo |

#### Diaspora Men
| New Filename | Location | Use Case |
|-------------|----------|----------|
| `man-diaspora-london.png` | London | UK diaspora |
| `man-diaspora-consultant.png` | Consultant | International professional |

#### Ghanaian Men
| New Filename | Context | Use Case |
|-------------|---------|----------|
| `man-ghanaian-architect.png` | Architect | West African professional |
| `man-ghanaian-it-professional.png` | IT Professional | Tech scene |
| `man-ghanaian-modern.png` | Modern Professional | Contemporary style |

---

### 5. FEATURE IMAGES (`/images/features/`)
**Purpose**: Demonstrate product features and user experience

| New Filename | Original | Use Case |
|-------------|----------|----------|
| `feature-video-chat.png` | Video-Chat-Communication | Virtual dates, remote connection feature |
| `feature-couple-coffee-date.png` | Hero-Couple-Coffee-Date | "First date success" feature |
| `feature-outdoor-walk.png` | Hero-Couple-Outdoor-Walk | "Build trust gradually" feature |

**Usage**: "How It Works" page, Features page, Product demonstrations

---

### 6. BACKGROUNDS (`/images/backgrounds/`)
**Purpose**: Hero section backgrounds, environmental context

| New Filename | Use Case |
|-------------|----------|
| `bg-lagos-cityscape-sunset.png` | Homepage hero background, Lagos focus |

---

### 7. VIP IMAGERY (`/images/vip/`)
**Purpose**: VIP service showcase and branding

| New Filename | Use Case |
|-------------|----------|
| `vip-concierge-professional.png` | VIP page, matchmaker representation |
| `vip-couple-elegant-dinner.png` | VIP service outcome example |
| `vip-couple-art-gallery.png` | VIP lifestyle representation |

---

## Implementation Strategy

### Phase 1: Organize Existing Usage
1. Keep current success stories (couples folder)
2. Keep VIP concierge image

### Phase 2: Profile Discovery Page
Use categorized profile images for:
- Discover page profile grid
- Phone mockup profile cards
- "Browse matches" demonstrations

### Phase 3: Feature Demonstrations
Use feature images for:
- "How It Works" step-by-step
- Video call capability showcase
- Progressive disclosure illustrations

### Phase 4: Hero Sections
Rotate hero images across pages:
- Homepage: Coffee date or outdoor walk
- Pricing: Art gallery (sophistication)
- VIP: Rooftop dinner (elegance)
- Success Stories: Traditional wedding

---

## Best Practices

1. **Context Matching**: Use formal attire photos for professional/VIP contexts, casual for approachable/free tier
2. **Cultural Representation**: Rotate Nigerian, Ghanaian, Kenyan, and diaspora imagery
3. **Gender Balance**: Ensure equal representation across all pages
4. **Professional Diversity**: Show variety of careers to appeal to broad audience
5. **Relationship Stages**: Show dating → courtship → engagement → marriage progression

---

## Notes
- All images maintain professional, marriage-minded aesthetic
- No casual dating imagery
- Focus on serious, intentional relationships
- Represent JoyMatcher's pan-African professional demographic
