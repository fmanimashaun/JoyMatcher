# Blog Architecture — Content Platform Specification

**Version:** 1.0.0
**Last Updated:** 2026-02-26
**Status:** Complete
**Document Owner:** Content Strategy Lead

---

## 1. Purpose & Vision

### 1.1 Why JoyMatcher Needs a Blog

The JoyMatcher blog serves multiple strategic purposes:

1. **Educational Hub**: Teach marriage-minded professionals how to build meaningful relationships
2. **SEO Authority**: Rank for keywords related to serious dating, marriage preparation, and diaspora relationships
3. **Trust Builder**: Demonstrate expertise, thoughtfulness, and commitment to user success
4. **Community Platform**: Share success stories, expert insights, and cultural content
5. **Premium Positioning**: Reinforce sophisticated, professional brand identity
6. **Acquisition Channel**: Drive organic traffic and convert readers to users

### 1.2 Content Philosophy

**We are NOT:**
- ❌ A casual dating advice blog
- ❌ Entertainment-focused ("10 Pickup Lines That Work!")
- ❌ Clickbait or sensationalist
- ❌ Generic relationship content

**We ARE:**
- ✅ Marriage-focused and intentional
- ✅ Culturally inclusive (especially African diaspora)
- ✅ Research-backed and expert-informed
- ✅ Professional and sophisticated
- ✅ Action-oriented and practical

**Tone:** Editorial, warm, authoritative—like a trusted advisor, not a tabloid.

---

## 2. Technical Platform Specification

### 2.1 Platform Requirements

**Recommended CMS:**
- **WordPress** (with Elementor or custom theme) — Mature, SEO-friendly, extensible
- **Webflow** — Design-focused, modern, no-code flexibility
- **Ghost** — Clean, minimalist, optimized for content
- **Custom Next.js/Contentful** — Full control, headless CMS, future-proof

**Must-Have Features:**
1. **SEO Optimization**
   - Customizable meta titles and descriptions
   - Schema markup for articles
   - Automatic sitemap generation
   - Canonical URL management
   - Social media preview images (Open Graph, Twitter Cards)

2. **Content Management**
   - Rich text editor with formatting options
   - Image optimization and lazy loading
   - Revision history and draft modes
   - Multi-author support with bylines
   - Category and tag taxonomy
   - Related articles suggestions

3. **User Experience**
   - Fast page load (Lighthouse score 90+)
   - Mobile-responsive design
   - Search functionality
   - Newsletter signup integration
   - Social sharing buttons
   - Reading time estimates
   - Comment system (optional, moderated)

4. **Analytics Integration**
   - Google Analytics 4
   - Google Search Console
   - Conversion tracking (sign-ups from blog)
   - Heatmaps (Hotjar or similar)

5. **Performance**
   - CDN delivery
   - Image compression and WebP support
   - Caching strategy
   - Core Web Vitals optimization

### 2.2 URL Structure

**Domain:** `blog.joymatcher.com` or `joymatcher.com/blog/`

**URL Format:** `joymatcher.com/blog/{category}/{post-slug}`

**Examples:**
- `joymatcher.com/blog/relationships/how-to-know-when-youre-ready-for-marriage`
- `joymatcher.com/blog/success-stories/chioma-and-kwame-toronto-lagos-love`
- `joymatcher.com/blog/diaspora-life/navigating-cross-border-relationships`

**Best Practices:**
- Lowercase only
- Hyphens (not underscores)
- Descriptive, keyword-rich slugs
- No dates in URL (evergreen content)
- Keep under 60 characters

### 2.3 Taxonomy Structure

**Primary Categories (Top-Level Navigation):**
1. Relationships & Marriage
2. Success Stories
3. Diaspora Life & Culture
4. Personal Growth
5. Platform Features & Updates

**Secondary Tags (Filtering):**
- Topics: Communication, Dating, Engagement, Wedding Planning, Family, Faith, Career
- Demographics: African Diaspora, Nigerian, Ghanaian, Kenyan, Cross-Cultural, Long-Distance
- Relationship Stage: Single, Dating, Engaged, Married
- Content Type: Guide, Interview, Story, Expert Advice, Research

**Tag Usage Guidelines:**
- Use 3-5 tags per post
- Be specific (not "Love" but "Long-Term Commitment")
- Consistent naming (e.g., always "African Diaspora," not "Diaspora Africans")

---

## 3. Content Categories & Strategy

### 3.1 Category 1: Relationships & Marriage

**Purpose:** Educational content on building serious, marriage-oriented relationships.

**Content Pillars:**
1. **Relationship Readiness**
   - "5 Signs You're Ready for Marriage"
   - "How to Define Your Non-Negotiables"
   - "What Marriage-Minded Actually Means"

2. **Communication & Compatibility**
   - "The Questions Every Couple Should Ask Before Marriage"
   - "How to Navigate Difficult Conversations Early"
   - "Building Trust Through Progressive Disclosure"

3. **Marriage Preparation**
   - "Financial Planning for Couples"
   - "Aligning on Family and Parenting Goals"
   - "Premarital Counseling: What to Expect"

4. **Faith & Values**
   - "Navigating Interfaith Relationships"
   - "The Role of Faith in Marriage"
   - "Shared Values: Why They Matter More Than Interests"

**SEO Keywords to Target:**
- "How to know if you're ready for marriage"
- "Marriage-minded dating advice"
- "Questions to ask before marriage"
- "Building trust in relationships"
- "Finding a life partner"

**Publishing Frequency:** 2-3 posts/month

### 3.2 Category 2: Success Stories

**Purpose:** Showcase real JoyMatcher couples to inspire and build trust.

**Content Types:**
1. **Engagement Announcements** (300-500 words)
   - Quick features with photos
   - Timeline and proposal story
   - Platform feature highlights

2. **In-Depth Couple Profiles** (1000-1500 words)
   - Long-form narratives
   - Background, match story, relationship development
   - Advice for others
   - Professional photography

3. **Video Testimonials** (Embedded with transcripts)
   - 2-3 minute interviews
   - Authentic, unscripted
   - B-roll of couple

4. **Wedding Features** (1500-2000 words)
   - Post-wedding updates
   - Photo galleries
   - Vendor credits (if applicable)
   - Advice on wedding planning

**SEO Keywords to Target:**
- "JoyMatcher success stories"
- "African diaspora couples"
- "Cross-border relationship success"
- "Long-distance relationship to marriage"
- "Marriage-minded dating success"

**Publishing Frequency:** 2-4 posts/month (depending on story availability)

### 3.3 Category 3: Diaspora Life & Culture

**Purpose:** Address unique challenges and celebrate cultural identity for African diaspora professionals.

**Content Pillars:**
1. **Cross-Border Relationships**
   - "How to Navigate Long-Distance with Intention"
   - "Relocation for Love: What to Consider"
   - "Managing Time Zones in Serious Relationships"
   - "Introducing Your Partner to Family Back Home"

2. **Cultural Identity**
   - "Maintaining Your Heritage While Living Abroad"
   - "Dating While Navigating Two Cultures"
   - "The Role of Family in African Relationships"
   - "Planning a Multicultural Wedding"

3. **Professional Life & Dating**
   - "Finding Love as a Busy Professional"
   - "How to Prioritize Relationships While Building a Career"
   - "Dating in [City]: A Guide for Diaspora Professionals" (Toronto, London, New York, etc.)

4. **Community & Connection**
   - "Finding Your Community in the Diaspora"
   - "Why Cultural Compatibility Matters"
   - "Staying Connected to Home"

**SEO Keywords to Target:**
- "Nigerian diaspora dating"
- "African diaspora relationships"
- "Cross-border dating advice"
- "Dating as a Nigerian in Toronto"
- "Maintaining culture while dating abroad"
- "Long-distance relationships Nigeria UK"

**Publishing Frequency:** 2-3 posts/month

### 3.4 Category 4: Personal Growth

**Purpose:** Support individual development alongside relationship building.

**Content Pillars:**
1. **Self-Awareness**
   - "Understanding Your Attachment Style"
   - "Healing from Past Relationships"
   - "Building Confidence as a Single Professional"

2. **Career & Relationships**
   - "Work-Life-Love Balance"
   - "How to Date with a Demanding Career"
   - "When to Prioritize Career vs. Relationships"

3. **Mental & Emotional Health**
   - "Managing Dating Fatigue"
   - "Setting Healthy Boundaries"
   - "Therapy and Relationships"

4. **Life Skills**
   - "Financial Independence Before Marriage"
   - "Building a Life You Love (While Single)"
   - "Self-Care for Marriage-Minded Singles"

**SEO Keywords to Target:**
- "Dating fatigue solutions"
- "Personal growth for relationships"
- "How to date with a busy career"
- "Building confidence while single"
- "Healing before dating again"

**Publishing Frequency:** 1-2 posts/month

### 3.5 Category 5: Platform Features & Updates

**Purpose:** Educate users on JoyMatcher features and share company news.

**Content Types:**
1. **Feature Explainers**
   - "How JoyMatcher's Tier System Works"
   - "Understanding Effective Disclosure Tier (EDT)"
   - "What Makes JoyMatcher Different"
   - "How VIP Concierge Service Works"

2. **User Guides**
   - "How to Create a Standout Profile"
   - "Making the Most of Your Premium Subscription"
   - "Tips for Completing Your Disclosure Tiers"

3. **Company Updates**
   - New feature launches
   - Expansion to new markets
   - Partnership announcements
   - Team spotlights

4. **Trust & Safety**
   - "How We Keep Your Data Safe"
   - "Our Verification Process Explained"
   - "Reporting and Blocking: How It Works"

**SEO Keywords to Target:**
- "How JoyMatcher works"
- "JoyMatcher review"
- "JoyMatcher vs [competitor]"
- "Best marriage-minded dating app"
- "Premium matchmaking service"

**Publishing Frequency:** 1-2 posts/month

---

## 4. Content Production Workflow

### 4.1 Editorial Calendar

**Planning Cycle:** Quarterly (with monthly adjustments)

**Process:**
1. **Quarter Planning (End of previous quarter)**
   - Content Strategy Lead reviews SEO data, user feedback, and success story pipeline
   - Identifies content gaps and opportunities
   - Proposes 30-40 post ideas for next quarter
   - Marketing team reviews and approves

2. **Monthly Scheduling (First week of month)**
   - Assign 10-12 posts to writers
   - Set deadlines (stagger throughout month)
   - Coordinate with design team for graphics

3. **Weekly Check-Ins**
   - Review progress on assigned posts
   - Adjust deadlines if needed
   - Flag blockers or resource needs

**Editorial Calendar Tool:** Airtable, Notion, or Google Sheets

**Sample Calendar Columns:**
- Post Title
- Category/Tags
- Author
- Target Keywords
- Status (Ideation / Drafting / Review / Approved / Scheduled / Published)
- Draft Due Date
- Publication Date
- Word Count
- Graphics Needed
- Notes

### 4.2 Content Creation Process

**Step 1: Ideation & Brief (1-2 days)**
- Content Strategy Lead creates brief:
  - Post title and slug
  - Target audience
  - Primary keyword and search intent
  - Key points to cover
  - Desired word count
  - Tone/style notes
  - Internal/external links
  - CTA (call-to-action)

**Step 2: Research & Outline (1-2 days)**
- Writer conducts research:
  - Competitor content analysis
  - Expert interviews (if applicable)
  - User surveys/feedback
  - Academic or industry research
- Writer submits outline for approval

**Step 3: Drafting (3-5 days)**
- Writer completes first draft
- Includes:
  - SEO-optimized title and meta description
  - Headers (H2, H3 structure)
  - Internal links (to other blog posts, website pages)
  - External links (credible sources)
  - Image placeholders with alt text
  - Call-to-action

**Step 4: Review & Edit (2-3 days)**
- Content Manager reviews for:
  - Brand voice consistency
  - Factual accuracy
  - SEO optimization
  - Readability (Hemingway score 8 or lower)
  - Grammar and style
- Provides feedback; writer revises

**Step 5: Design & Graphics (2-3 days)**
- Designer creates:
  - Featured image (1200x630px minimum)
  - In-article graphics (charts, infographics)
  - Social media graphics (see Social Media Guidelines)
- Writer approves visuals

**Step 6: Final Approval (1 day)**
- Content Strategy Lead final review
- Legal review (if needed for sensitive topics)
- Schedule publication

**Step 7: Publication & Promotion (1 day)**
- Publish post on blog
- Share on social media (all platforms)
- Include in next newsletter
- Update internal links from related posts
- Submit to Google Search Console

**Total Timeline:** 2-3 weeks per post (from brief to publication)

### 4.3 Content Quality Standards

**Writing Standards:**
- **Clarity**: Hemingway readability score 8 or lower
- **Length**:
  - Short posts: 800-1200 words
  - Standard posts: 1200-1800 words
  - Long-form: 1800-2500 words
  - Success stories: Varies (see Testimonials System doc)
- **Structure**:
  - Compelling introduction (hook, problem, solution)
  - Clear H2/H3 hierarchy
  - Short paragraphs (2-4 sentences)
  - Bullet points and lists for scannability
  - Conclusion with clear takeaway and CTA
- **Tone**: Warm, sophisticated, professional (see Content Strategy doc)
- **Citations**: Link to credible sources (academic research, reputable publications)
- **Examples**: Include real scenarios (with user consent if applicable)

**SEO Standards:**
- **Title Tag**: 50-60 characters, includes primary keyword
- **Meta Description**: 150-160 characters, compelling, includes keyword
- **Headers**: H1 (title), H2 (main sections), H3 (subsections)—include keywords naturally
- **Keyword Density**: 0.5-1.5% (natural, not stuffed)
- **Internal Links**: 3-5 per post (to related blog posts, website pages)
- **External Links**: 2-3 to authoritative sources
- **Images**: Optimized file size (<200KB), descriptive alt text
- **URL**: Keyword-rich, under 60 characters

**Visual Standards:**
- **Featured Image**: Professional, high-quality, brand-consistent
- **In-Article Images**: Every 300-400 words (break up text)
- **Graphics**: Match brand style guide (colors, fonts, tone)
- **Captions**: Descriptive, provide context

---

## 5. SEO Strategy

### 5.1 Keyword Research Process

**Tools:**
- Google Keyword Planner
- Ahrefs or SEMrush
- AnswerThePublic
- Google Trends
- Reddit/Quora (user questions)

**Process:**
1. **Identify Seed Keywords**
   - Marriage-minded dating
   - Serious relationships
   - Finding a life partner
   - African diaspora dating
   - Nigerian/Ghanaian/Kenyan singles
   - Cross-border relationships

2. **Expand Keyword Lists**
   - Long-tail variations ("How to find a serious relationship in Toronto")
   - Question keywords ("What are the signs you're ready for marriage?")
   - Comparison keywords ("JoyMatcher vs Tinder")
   - Location-based keywords ("Dating in Lagos for professionals")

3. **Assess Keyword Difficulty**
   - Prioritize low-to-medium difficulty (achievable ranking)
   - Mix of informational, navigational, and transactional intent
   - Target 100-1000+ monthly searches

4. **Map Keywords to Content**
   - Assign primary keyword to each post
   - Use secondary keywords in headers and body
   - Update editorial calendar

**Keyword Tracking:**
- Monitor rankings monthly (Google Search Console, Ahrefs)
- Adjust strategy based on performance
- Refresh underperforming content

### 5.2 On-Page SEO Checklist

**For Every Post:**
- [ ] Primary keyword in title tag (preferably at beginning)
- [ ] Primary keyword in meta description
- [ ] Primary keyword in URL
- [ ] Primary keyword in H1 (title)
- [ ] Primary keyword in at least one H2
- [ ] Secondary keywords in H2/H3 headers
- [ ] Keyword in first 100 words of post
- [ ] Keyword density 0.5-1.5%
- [ ] Internal links to 3-5 related posts/pages
- [ ] External links to 2-3 authoritative sources
- [ ] Alt text for all images (descriptive, includes keyword when natural)
- [ ] Optimized featured image (file name includes keyword)
- [ ] Schema markup (Article schema)
- [ ] Social media preview images (Open Graph, Twitter Card)
- [ ] Mobile-responsive layout
- [ ] Fast page load (<3 seconds)

### 5.3 Link Building Strategy

**Internal Linking:**
- Link to related blog posts within content
- Use descriptive anchor text (not "click here")
- Update older posts with links to new content
- Create content clusters (pillar posts + supporting posts)

**External Linking (Outbound):**
- Link to credible sources (research, expert articles)
- Enhances trust and authority
- Opens in same tab (keep users on site)

**Backlink Acquisition (Inbound):**
- **Guest Posting**: Write for reputable relationship/lifestyle blogs
- **PR & Media**: Pitch success stories to media outlets
- **Partnerships**: Collaborate with wedding vendors, relationship coaches
- **Community Engagement**: Share expertise in forums, Reddit, Quora
- **Social Amplification**: Promote on social media to drive shares

**Target Backlink Sources:**
- Relationship/marriage blogs
- African diaspora publications
- Wedding planning sites
- Professional networking platforms
- University career centers (for alumni)

### 5.4 Technical SEO Requirements

**Core Web Vitals:**
- Largest Contentful Paint (LCP): <2.5s
- First Input Delay (FID): <100ms
- Cumulative Layout Shift (CLS): <0.1

**Mobile Optimization:**
- Responsive design (mobile-first)
- Readable font size (16px minimum)
- Touch-friendly buttons (48x48px minimum)
- No horizontal scrolling

**Page Speed:**
- Compress images (WebP format)
- Minify CSS/JS
- Enable browser caching
- Use CDN for asset delivery
- Lazy load images below the fold

**Crawlability:**
- XML sitemap submitted to Google Search Console
- Robots.txt configured correctly
- No broken links (run monthly audits)
- Canonical tags on all pages
- HTTPS enabled

---

## 6. Content Management System (CMS) Setup

### 6.1 User Roles & Permissions

**Administrator:**
- Full access to all settings, content, and plugins
- Can publish/delete any content
- Can manage users and permissions

**Editor (Content Strategy Lead):**
- Can publish, edit, and delete all posts
- Can manage categories and tags
- Cannot access site settings or plugins

**Author (Writers):**
- Can create and edit own posts
- Cannot publish (must submit for review)
- Cannot delete published posts
- Can upload media

**Contributor (Guest Writers):**
- Can create and submit posts for review
- Cannot publish or upload media

**Subscriber (Newsletter Readers):**
- Read-only access
- Cannot create or edit content

### 6.2 Publishing Workflow

**Draft → Review → Approved → Scheduled → Published**

**Notifications:**
- Writer submits draft → Editor notified
- Editor approves → Writer notified
- Post scheduled → Team notified (Slack/email)
- Post published → Social media manager notified

### 6.3 Media Library Organization

**Folder Structure (if using WordPress or similar):**
- /blog/featured-images/
- /blog/in-article-graphics/
- /blog/success-stories/
- /blog/author-headshots/

**File Naming Convention:**
- `YYYY-MM-category-post-slug-image-type.jpg`
- Example: `2026-02-relationships-signs-youre-ready-featured.jpg`

**Image Optimization:**
- Compress before upload (TinyPNG, ShortPixel)
- Use WebP format (with JPEG fallback)
- Max file size: 200KB per image
- Dimensions: 1200x630px (featured images), 800px width (in-article)

---

## 7. Analytics & Performance Tracking

### 7.1 Key Metrics (Monthly Review)

**Traffic Metrics:**
- Total page views
- Unique visitors
- Top 10 posts by traffic
- Traffic sources (organic, social, direct, referral)
- Geographic distribution
- Device breakdown (mobile vs. desktop)

**Engagement Metrics:**
- Average time on page (goal: 3+ minutes)
- Bounce rate (goal: <60%)
- Pages per session (goal: 2+)
- Scroll depth (goal: 75%+)
- Social shares per post

**Conversion Metrics:**
- Newsletter signups from blog
- Sign-ups from blog (track with UTM parameters)
- Premium conversions influenced by blog
- CTA click-through rate

**SEO Metrics:**
- Keyword rankings (track top 20 keywords)
- Organic traffic growth month-over-month
- Backlinks acquired
- Domain authority (Moz, Ahrefs)
- Featured snippets won

### 7.2 Google Analytics 4 Setup

**Custom Events:**
- Newsletter signup (blog)
- Sign-up CTA click
- Social share button click
- Scroll to 50%, 75%, 100%
- Video play/complete (for testimonials)

**Custom Dimensions:**
- Post category
- Post author
- Post word count
- Post publish date

**Goals/Conversions:**
- Newsletter subscription
- Account creation (attributed to blog referral)
- Premium upgrade (attributed to blog referral)

### 7.3 Reporting Dashboard

**Tool:** Google Data Studio (or Looker Studio)

**Dashboard Sections:**
1. **Overview (30-day snapshot)**
   - Total traffic
   - New vs. returning visitors
   - Conversion rate
   - Top 5 posts

2. **Content Performance**
   - All posts ranked by traffic
   - Engagement metrics per post
   - Best-performing categories

3. **SEO Performance**
   - Organic traffic trend
   - Top keywords and rankings
   - Backlink growth

4. **Conversion Funnel**
   - Blog visitors → Newsletter signups → Account creation → Premium upgrade

5. **Audience Insights**
   - Demographics (age, gender, location)
   - Interests and behaviors
   - Device and browser usage

**Access:** Share with marketing team, monthly review in team meeting

---

## 8. Content Refresh & Maintenance

### 8.1 Content Audit (Quarterly)

**Process:**
1. Export all blog posts with traffic data
2. Categorize:
   - **High-performing** (top 20% traffic): Maintain, promote further
   - **Medium-performing** (middle 60%): Refresh and optimize
   - **Low-performing** (bottom 20%): Update, consolidate, or remove

**Refresh Criteria:**
- Post is >6 months old
- Information is outdated
- Keyword rankings have dropped
- Low engagement metrics
- Broken links or missing images

**Refresh Actions:**
- Update statistics and data
- Add new sections or examples
- Improve SEO (better title, headers, keywords)
- Add new internal links
- Refresh featured image
- Re-promote on social media

**Consolidation:**
- Merge similar low-traffic posts
- 301 redirect old URLs to consolidated post
- Improves site authority and user experience

**Deletion:**
- Remove posts that are irrelevant or off-brand
- 301 redirect to related post or homepage
- Only as last resort (prefer refreshing)

### 8.2 Evergreen vs. Timely Content

**Evergreen (70-80% of content):**
- Timeless topics that remain relevant
- "How to Know If You're Ready for Marriage"
- "Building Trust in Relationships"
- Refresh annually or as needed

**Timely (20-30% of content):**
- Seasonal or news-related
- "New Year Intentions for Marriage-Minded Singles"
- "Summer Wedding Planning Tips"
- Less long-term value; archive after 1 year

**Strategy:**
- Prioritize evergreen for SEO longevity
- Use timely content for seasonal traffic spikes
- Mark timely posts in CMS for future review

---

## 9. Integration with Marketing Ecosystem

### 9.1 Blog → Website Integration

**Navigation:**
- Prominent "Blog" link in main website navigation
- Footer link to blog
- Blog CTA on homepage ("Read Success Stories")

**Cross-Promotion:**
- Feature recent blog posts on homepage
- Link to relevant blog posts from app pages (e.g., "How It Works" page links to tier explainer)
- Use blog excerpts in email onboarding

### 9.2 Blog → Email Newsletter Integration

**Newsletter Structure:**
- Weekly or bi-weekly digest
- 3-4 featured blog posts (short summaries + "Read More" links)
- Success story highlight
- Platform update or tip

**Newsletter CTA:**
- Drive traffic back to blog
- Encourage social shares
- Prompt account creation or Premium upgrade

**Newsletter Tool Integration:**
- Mailchimp, ConvertKit, or Brevo
- Automatic RSS-to-email (optional)
- Segment by user type (prospects, Free users, Premium, VIP)

### 9.3 Blog → Social Media Integration

**Auto-Sharing:**
- New blog post published → Auto-share to all platforms (Buffer, Hootsuite)
- Customize copy per platform

**Social Media Calendar:**
- Share each blog post 3-4 times over 3 months (different angles, quotes)
- Repurpose blog content into:
  - Instagram carousels (key takeaways)
  - X/Twitter threads (main points)
  - LinkedIn articles (professional angle)
  - Pinterest pins (infographics)

**Engagement Strategy:**
- Respond to comments on social posts
- Encourage discussion ("What's your experience with this?")
- Share user-generated content related to blog topics

### 9.4 Blog → Paid Advertising

**Google Ads (Search):**
- Target high-intent keywords
- Direct to relevant blog posts (top-of-funnel)
- Retarget blog visitors with sign-up ads

**Social Media Ads:**
- Promote top-performing success stories
- Boost evergreen relationship advice posts
- A/B test headlines and images

**Content Syndication:**
- Partner with publications to republish blog posts
- Include canonical link to original
- Expand reach and build backlinks

---

## 10. Content Team Structure & Budget

### 10.1 Recommended Team

**Core Team:**
- **Content Strategy Lead** (1 FTE)
  - Oversees editorial calendar, SEO strategy, and team
  - Budget owner
  - Final approval on all content

- **Content Manager/Editor** (1 FTE)
  - Day-to-day content production management
  - Edits all posts
  - Manages writers and designers

- **Writers** (2-3 freelance or 1 FTE)
  - Produce 8-12 blog posts per month
  - Specialize in different categories

- **Designer** (0.5 FTE or freelance)
  - Create featured images and graphics
  - Video editing for testimonials

- **SEO Specialist** (0.5 FTE or consultant)
  - Keyword research and tracking
  - Technical SEO audits
  - Link building strategy

**Extended Team (as needed):**
- Subject Matter Experts (relationship coaches, therapists) - guest contributors
- Success story coordinators (see Testimonials System doc)
- Videographer (for testimonials and company updates)

### 10.2 Budget Allocation (Quarterly)

**Content Production:**
- Writers: $3,000-5,000 (freelance rates $200-400 per 1500-word post, 10-12 posts/month)
- Design: $1,000-2,000 (graphics, video editing)
- Photography: $500-1,000 (success story shoots)

**Tools & Software:**
- CMS hosting: $50-200/month
- SEO tools (Ahrefs, SEMrush): $100-200/month
- Design tools (Canva Pro, Adobe): $50-100/month
- Analytics/reporting: $50/month

**Promotion:**
- Paid social media: $1,000-3,000/month
- Google Ads: $500-1,500/month
- Content syndication: $500-1,000/month

**Total Quarterly Budget: $18,000-35,000**

(Adjust based on company size, growth stage, and content volume)

---

## 11. Launch Plan (First 90 Days)

### Phase 1: Setup (Days 1-30)

**Technical:**
- Choose and configure CMS platform
- Set up domain and hosting
- Install essential plugins (SEO, analytics, newsletter)
- Design blog layout (match brand style guide)
- Configure Google Analytics and Search Console
- Create user accounts and permissions

**Content:**
- Finalize editorial calendar (first 3 months, 30-40 posts)
- Conduct keyword research
- Create content briefs for first 10 posts
- Assign posts to writers
- Set up approval workflows

**Promotional:**
- Create social media templates
- Set up email newsletter integration
- Prepare launch announcement

### Phase 2: Content Production (Days 31-60)

**Content:**
- Write and publish first 10-15 posts (2-3 per week)
- Prioritize:
  - SEO cornerstone posts (high-volume keywords)
  - Success stories (if available)
  - Platform explainers

**Promotion:**
- Share blog posts on social media
- Include in email onboarding sequences
- Add blog links to website navigation

**SEO:**
- Submit sitemap to Google Search Console
- Build internal link structure
- Begin outreach for backlinks

### Phase 3: Optimization & Growth (Days 61-90)

**Analytics:**
- Review first 30 days of traffic data
- Identify top-performing content
- Adjust editorial calendar based on insights

**Content:**
- Publish 10-15 more posts
- Refresh underperforming posts
- Experiment with different formats (videos, infographics)

**Promotion:**
- Begin paid promotion of top posts
- Partner with guest contributors
- Launch email newsletter

**Iteration:**
- Team retro: What's working? What's not?
- Adjust strategy for Quarter 2

---

## 12. Best Practices & Pro Tips

### 12.1 Writing Best Practices

**Hook Readers Immediately:**
- Start with a relatable problem or question
- Example: "You've been on 15 first dates this year, and none led anywhere. Sound familiar?"

**Use the "Inverted Pyramid":**
- Most important information first
- Supporting details next
- Background/context last

**Write for Skimmers:**
- Short paragraphs (2-4 sentences)
- Bullet points and numbered lists
- Bolded key takeaways
- Descriptive headers

**Show, Don't Tell:**
- Use specific examples and anecdotes
- Quote real users (with consent)
- Include case studies and data

**End with a Clear CTA:**
- What should the reader do next?
- Examples: "Join JoyMatcher today," "Read more success stories," "Download our relationship readiness guide"

### 12.2 SEO Best Practices

**Target Long-Tail Keywords:**
- Less competition, higher intent
- "How to find a serious relationship in Toronto" vs. "dating"

**Optimize for Featured Snippets:**
- Answer questions directly
- Use clear definitions and lists
- Include "What is..." or "How to..." headers

**Update Old Content:**
- Refreshing content can boost rankings
- Add new data, examples, and internal links

**Build Topic Clusters:**
- Create a "pillar post" (comprehensive guide)
- Write 5-10 supporting posts linking to pillar
- Boosts authority on topic

**Monitor Competitors:**
- See what ranks for your target keywords
- Create better, more comprehensive content
- Find backlink opportunities

### 12.3 Engagement Best Practices

**Ask Questions:**
- Invite reader reflection
- Example: "What are your non-negotiables in a partner?"

**Use Visuals Generously:**
- Break up text every 300 words
- Use relevant, high-quality images
- Create custom infographics

**Make Content Shareable:**
- Include tweetable quotes
- Create shareable graphics (Instagram carousels)
- Add social sharing buttons

**Enable Comments (Optional):**
- Foster community discussion
- Moderate to prevent spam
- Respond to thoughtful comments

**Include Related Posts:**
- "You might also like..." section
- Keeps readers on site longer
- Increases pages per session

---

## Related Documentation

- [Content Strategy](content_strategy.md) - Brand voice and messaging framework
- [Social Media Guidelines](social_media_guidelines.md) - Platform-specific content standards
- [Testimonials System](testimonials_system.md) - Success story workflow
- [Success Metrics](success_metrics.md) - Analytics and KPIs

---

**Document Owner:** Content Strategy Lead
**Last Reviewed:** 2026-02-26
**Next Review:** 2026-05-26 (Quarterly)
