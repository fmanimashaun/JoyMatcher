import { Link } from 'react-router-dom';
import Button from '../components/common/Button';

export default function FAQ() {
  const faqSections = [
    {
      title: 'Getting Started',
      description: 'New to JoyMatcher? Start here to understand the basics.',
      questions: [
        {
          question: 'How do I sign up for JoyMatcher?',
          answer: 'Click "Sign Up" in the top navigation and provide your email address and basic information. You\'ll receive a verification email to confirm your account. Once verified, you\'ll be guided through completing Tier 1 (Identity & Intent), which is mandatory for all users. This includes your name, age, location, faith orientation, relationship intent, and a primary profile photo with liveness check.',
        },
        {
          question: 'What is profile setup like? How long does it take?',
          answer: 'Profile setup is done in tiers. Tier 1 takes approximately 10-15 minutes and includes basic identity information and a liveness-verified photo. You must complete Tier 1 to activate your account. Tier 2 (lifestyle details) takes another 10-15 minutes. Higher tiers (3-5) are optional and depend on your subscription level. You\'re not required to complete all tiers at once—you can return and complete them as you\'re ready to deepen connections.',
        },
        {
          question: 'How does JoyMatcher work differently from other dating apps?',
          answer: 'JoyMatcher is not a dating app—it\'s relationship infrastructure built for marriage-minded professionals. We use progressive disclosure (5 tiers) that lets you share information gradually. You control what you share and when. Reciprocal transparency is enforced: you can only view information you\'ve disclosed yourself. There\'s no swiping, no unsolicited messages, and no casual browsing. Every interaction requires mutual consent through "Show Interest" requests. This intentional friction filters for serious users.',
        },
        {
          question: 'Can I browse without completing my profile?',
          answer: 'You must complete Tier 1 (Identity & Intent) before you can browse or interact with other users. This ensures everyone on the platform is a verified, real person with clear relationship intentions. Once Tier 1 is complete, you can browse other users and see their Tier 1 information. To view deeper details (Tier 2+), you must complete those tiers yourself and receive explicit consent from the other user.',
        },
        {
          question: 'Who is JoyMatcher designed for?',
          answer: 'JoyMatcher is designed for marriage-minded working professionals who are serious about finding a life partner. Our platform particularly resonates with Nigerian and African diaspora communities navigating cross-cultural identities, but we serve all professionals who prioritize intentional commitment over casual dating. If you\'re looking for entertainment, swiping, or casual connections, this isn\'t the right platform. JoyMatcher is for those ready to invest time, transparency, and effort into finding marriage.',
        },
        {
          question: 'What happens after I create my account?',
          answer: 'After creating your account and completing Tier 1, your profile becomes visible to other users (unless you\'re a VIP member with invisible browsing enabled). You can browse matches, filter by location, profession, and interests, and send "Show Interest" requests to users you\'re drawn to. If they accept, messaging unlocks. As a Free user, you can complete Tier 2 and interact with other Free users. To access Premium users and complete Tiers 3-4, you\'ll need to upgrade your subscription.',
        },
      ],
    },
    {
      title: 'The Tier System',
      description: 'Understanding progressive disclosure and how tiers work.',
      questions: [
        {
          question: 'What is the 5-tier progressive disclosure system?',
          answer: 'The tier system allows you to share personal information gradually as trust builds. Each tier contains specific information: Tier 1 (Identity & Intent): Basic information—name, age, location, faith, relationship intent, photo (public). Tier 2 (Lifestyle): Education, career, physical attributes, lifestyle habits (request-based). Tier 3 (Relationship & Family): Marital history, children, family expectations (Premium required). Tier 4 (Health & Compatibility): Genotype, health disclosures, core non-negotiables (Premium required). Tier 5 (Verified Identity): Government ID verification, KYC (VIP only). All fields within a tier are mandatory—no partial completion allowed.',
        },
        {
          question: 'What is EDT (Effective Disclosure Tier) and how does it work?',
          answer: 'EDT is the backbone of JoyMatcher\'s reciprocal transparency system. It determines what information you and another user can see about each other. The formula is: EDT = Math.min(yourCompletedTier, theirCompletedTier, yourSharedTier, theirSharedTier). Translation: You both see only the lowest tier among these four values. This prevents exploitation—no one can view your sensitive data without disclosing theirs first. EDT recalculates instantly if anyone revokes access.',
        },
        {
          question: 'Can I skip tiers or complete them in a different order?',
          answer: 'No. Tiers must be completed sequentially. You must finish Tier 1 before accessing Tier 2, Tier 2 before Tier 3, and so on. This ensures that trust is built on a solid foundation. The system is designed intentionally to prevent shortcuts—depth requires investment.',
        },
        {
          question: 'How do I share tier information with someone?',
          answer: 'After mutual interest is established (via "Show Interest" acceptance), Premium and VIP users can use the "Request Details" feature. You select which tier you want from the other person and which tier you\'re willing to share in return. The other person reviews your request and can accept, share less/more, or decline. Once both parties agree, the system calculates the new EDT and makes the information visible. Free users cannot request details—only Premium and VIP users have this feature.',
        },
        {
          question: 'Can I revoke access to my tier information?',
          answer: 'Yes, absolutely. You can revoke access to your tier information at any time for any reason. When you revoke, the system immediately recalculates EDT and adjusts visibility symmetrically—both your view of them and their view of you are downgraded to the new EDT level. All revocations are logged for accountability. Your privacy and boundaries are always under your control.',
        },
        {
          question: 'What\'s the difference between completing a tier and sharing a tier?',
          answer: 'Completing a tier means filling out all the required information for that tier on your own profile. Sharing a tier means granting someone else permission to view that tier\'s information about you. These are separate actions. For example, you can complete all 5 tiers but choose to share only Tier 2 with someone you\'re just getting to know. Sharing is one-to-one, not global—what you share with one person doesn\'t automatically apply to others.',
        },
      ],
    },
    {
      title: 'Subscriptions & Pricing',
      description: 'Understanding Free, Premium, and VIP membership options.',
      questions: [
        {
          question: 'What are the differences between Free, Premium, and VIP memberships?',
          answer: 'Free (₦0/$0): Complete Tiers 1-2, browse other Free users, send Show Interest to Free users, unlimited messaging. Cannot request details from others. Premium (₦18,000/$18 monthly or ₦45,000/$45 quarterly): Everything in Free, plus complete Tiers 3-4, request deeper details from matches, send Show Interest to Premium users, access marriage-level compatibility features. VIP (₦200,000+/$500+ monthly, application-based): Everything in Premium, plus Tier 5 government ID verification, personal matchmaking expert, curated introductions, complete profile privacy (invisible browsing), one-to-one matchmaking sessions, send Show Interest to all users including VIPs.',
        },
        {
          question: 'How much does JoyMatcher cost?',
          answer: 'Pricing varies by location. For Nigerian users: Free: ₦0 (forever free), Premium: ₦18,000/month or ₦45,000/quarter, VIP: From ₦200,000/month (application-based). For non-Nigerian users: Free: $0 (forever free), Premium: $18/month or $45/quarter, VIP: From $500/month (application-based). Note: Pricing is a filter for seriousness, not a promotion. We do not offer public discounts or influencer codes.',
        },
        {
          question: 'How do I upgrade from Free to Premium or VIP?',
          answer: 'To upgrade to Premium: You must complete Tier 2 first. Once Tier 2 is complete, visit the Pricing page or click "Upgrade" from your dashboard, select Premium (monthly or quarterly), and complete payment. Premium access is activated immediately. To upgrade to VIP: You must complete Tier 4 first. VIP is application-based, not instant. Complete the 18-question intent screening questionnaire, undergo manual review by the VIP Coordinator, complete Tier 5 verification (government ID and live video KYC), and await approval. If approved, you\'ll be assigned a matchmaking expert and onboarded into the concierge service.',
        },
        {
          question: 'Can I cancel my subscription? Will I get a refund?',
          answer: 'Yes, you can cancel your subscription at any time from your Account Settings. Your access will continue until the end of your current billing period (monthly or quarterly). We do not provide refunds for partial months or quarters already paid. Once your subscription expires, your account reverts to Free tier limitations—you\'ll lose access to Tiers 3-4 data and the ability to request details from others. Data you\'ve already completed remains saved.',
        },
        {
          question: 'Do you offer discounts or promo codes?',
          answer: 'No. JoyMatcher does not offer public discounts, promo codes, or influencer partnerships. Our pricing is a filter for seriousness—it signals commitment and filters out casual users. The only savings available are quiet annual billing discounts for long-term members, which are not publicly advertised. This pricing philosophy protects the quality and seriousness of our community.',
        },
        {
          question: 'What payment methods do you accept?',
          answer: 'We accept major credit cards (Visa, Mastercard), debit cards, and local payment methods depending on your location. Nigerian users can pay via bank transfer, Paystack, or mobile money. International users can use Stripe-supported payment methods. All payments are processed securely through encrypted, PCI-compliant payment gateways. Your financial information is never stored on JoyMatcher\'s servers.',
        },
      ],
    },
    {
      title: 'Safety & Privacy',
      description: 'How we protect your data and keep the community safe.',
      questions: [
        {
          question: 'How does JoyMatcher protect my privacy?',
          answer: 'JoyMatcher is privacy-first by design: One-to-one disclosure: Information you share with one person is not visible to others. Revocable access: You can revoke access to your tiers at any time. Consent gates: No one can contact you without mutual interest via "Show Interest." VIP invisibility: VIP members can make profiles completely invisible. No data selling: We never sell your data to third parties. GDPR/NDPR compliant: Full compliance with Nigerian and European data protection laws.',
        },
        {
          question: 'How do I block or report someone?',
          answer: 'To block: Go to the user\'s profile, click the three-dot menu, and select "Block User." Blocking is instant and bilateral—you both become invisible to each other. You can unblock later if needed. To report: Click "Report" from the user\'s profile or message thread. Select the reason (harassment, fake profile, inappropriate content, spam, etc.) and provide details. Reports are reviewed by our Trust & Safety team within 24-48 hours. Serious violations result in immediate suspension or permanent ban. We have zero tolerance for harassment, hate speech, scams, and inappropriate behavior.',
        },
        {
          question: 'What is Tier 5 verification and why does it matter?',
          answer: 'Tier 5 is government ID verification with live video KYC (Know Your Customer) review. It\'s available only to VIP members. The process includes: Upload government-issued ID (national ID, passport, driver\'s license), complete live video verification with randomized liveness challenge, automated face-matching between photo and video, manual review by VIP Coordinator, sign truth & accountability declaration. Once verified, users receive a public "Verified Identity" badge visible to all users (though the actual ID documents remain private). This eliminates impersonation and fraud, signaling the highest level of trust and commitment.',
        },
        {
          question: 'Is my health information (Tier 4) kept private?',
          answer: 'Yes. Tier 4 health information is highly restricted and never publicly visible. It\'s only shared one-to-one with explicit consent. You must accept health disclaimers before accessing Tier 4, acknowledging that health data is self-declared and not medically verified, you will only view others\' Tier 4 if you complete and share your own, you will not share others\' health information without consent, the information is critical for marriage decisions (e.g., genotype compatibility). All Tier 4 sharing is logged. If someone shares your health information without consent, it\'s a serious violation resulting in permanent ban.',
        },
        {
          question: 'How do I delete my account and data?',
          answer: 'You have the right to delete your account and data at any time (GDPR Article 17 / NDPR Section 26). To delete: Go to Account Settings and select "Delete Account," confirm your decision and provide optional feedback, you\'ll enter a 30-day grace period where your account is deactivated but recoverable, after 30 days, all your data is permanently deleted (profile, messages, photos, tier data). Exception: Logs required for legal compliance, safety investigations, or fraud prevention may be retained in anonymized form for up to 7 years. Your identity is not attached to these logs.',
        },
        {
          question: 'What happens if someone declines my Show Interest?',
          answer: 'If someone declines your Show Interest request, you cannot send another request to them for 3 months (90 days). This cooldown period is automatic and system-enforced to prevent harassment. After 3 months, the cooldown resets and you may send Show Interest again. The recipient is not notified when the cooldown expires. This policy protects users from repeated unwanted contact and maintains a respectful community.',
        },
      ],
    },
    {
      title: 'VIP Membership',
      description: 'Exclusive concierge service and white-glove matchmaking.',
      questions: [
        {
          question: 'What is VIP membership and how is it different?',
          answer: 'VIP is not "Premium Plus"—it\'s a completely different service model. VIP is a white-glove concierge matchmaking service with: Personal matchmaking expert: Assigned professional who knows you deeply. Profile invisibility: Your profile is hidden from browsing; only expert-facilitated introductions. Curated introductions: Expert actively sources and vets matches from the verified Tier 4-5 pool. One-to-one intake sessions: Video call to understand preferences, values, deal-breakers, and relationship history. Tier 5 verification: Government ID and live video KYC for ultimate trust. Ongoing support: Relationship coaching, feedback, and facilitation throughout your journey. VIP is service, not browsing. You\'re not self-serving—you\'re being served.',
        },
        {
          question: 'How do I apply for VIP membership?',
          answer: 'VIP is application-based. Requirements: 1. Complete Tier 4: You must have all four tiers completed before applying. 2. Fill out intent screening: 18-question questionnaire about your marriage timeline, privacy needs, matchmaking preferences, and why you\'re applying for VIP. 3. Submit application: VIP Coordinator reviews your application for fit and commitment. 4. Complete Tier 5 verification: Upload government ID and complete live video KYC. 5. Manual approval: Trust & Safety team and VIP Coordinator review and decide within 24-48 hours. 6. Onboarding: If approved, you\'re assigned a matchmaking expert and scheduled for intake session. Not everyone is approved. VIP is selective to maintain quality and fit.',
        },
        {
          question: 'How much does VIP cost and what\'s included?',
          answer: 'VIP pricing starts at: Nigerian users: From ₦200,000/month. Non-Nigerian users: From $500/month. Pricing may vary based on service intensity and expert assignment. Included: Everything in Premium (Tiers 1-4 access), Tier 5 government ID verification, personal matchmaking expert (dedicated professional), profile invisibility (hidden from public browsing), curated introductions from verified Tier 4-5 pool, one-to-one intake and coaching sessions, expert-facilitated first conversations, ongoing relationship support.',
        },
        {
          question: 'Can I still browse if I\'m a VIP member?',
          answer: 'VIP members have the option to disable public browsing entirely, making their profile invisible. This is recommended for high-profile professionals who need complete discretion. Your matchmaking expert searches and vets matches on your behalf and delivers curated introductions. You do not browse—you receive. If you prefer to keep browsing enabled, you may do so, but the core VIP value is in expert curation, not self-service browsing. VIP is service, not browsing.',
        },
        {
          question: 'What qualifications do VIP matchmaking experts have?',
          answer: 'VIP matchmaking experts are vetted professionals with backgrounds in relationship coaching, psychology, or professional matchmaking. They undergo rigorous training on JoyMatcher\'s tier system, EDT logic, cultural sensitivity (especially for African diaspora clients), and client privacy protocols. Experts work as isolated freelancers with data access limited strictly to their assigned clients—they cannot view other VIP members\' data. All experts sign confidentiality agreements and are subject to regular audits by the VIP Coordinator.',
        },
      ],
    },
    {
      title: 'Technical Support',
      description: 'Help with technical issues, browsers, and mobile access.',
      questions: [
        {
          question: 'What browsers and devices are supported?',
          answer: 'JoyMatcher is a web-based platform accessible from any device with a modern browser. Supported browsers: Google Chrome (recommended), Mozilla Firefox, Safari (macOS and iOS), Microsoft Edge. Devices: Desktop, laptop, tablet, and mobile (iOS and Android). For the best experience, we recommend desktop or laptop for initial profile setup and mobile for on-the-go messaging. Camera access is required for liveness checks and video verification.',
        },
        {
          question: 'Is there a mobile app?',
          answer: 'Not yet. JoyMatcher is currently a web-based platform optimized for mobile browsers. You can access it from your phone\'s browser (Safari on iOS, Chrome on Android) and save it to your home screen as a web app for quick access. Native iOS and Android apps are planned for future release. Join our newsletter or follow us for updates on mobile app launches.',
        },
        {
          question: 'I\'m having trouble uploading my photo. What should I do?',
          answer: 'Photo upload issues are usually due to file size or format. Check the following: File format: Use JPG, PNG, or HEIC (iPhone). Avoid GIFs or PDFs. File size: Maximum 10MB per photo. Compress large images before uploading. Photo quality: Face must be clearly visible, not blurry, and well-lit. No sunglasses, hats, or face coverings. Liveness check: If the liveness check fails, try better lighting, remove accessories, and follow the prompts carefully ("Blink twice," "Turn head left"). If issues persist, contact support at support@joymatcher.com with a screenshot of the error.',
        },
        {
          question: 'How do I contact customer support?',
          answer: 'You can reach JoyMatcher support through: Email: support@joymatcher.com (24-48 hour response time). Contact form: Visit our Contact page. FAQ: Check this page first—many questions are answered here. For urgent safety concerns (harassment, threats), use the "Report" feature directly from the user\'s profile for immediate review by our Trust & Safety team.',
        },
      ],
    },
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-jm-purple-deep/5 via-white to-jm-coral/5 py-16 md:py-20">
        <div className="max-w-screen-xl 2xl:max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl 2xl:max-w-6xl mx-auto text-center space-y-6">
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-jm-gray-900 leading-tight">
              Frequently Asked Questions
            </h1>
            <p className="font-sans text-lg md:text-xl text-jm-gray-700 leading-relaxed">
              Everything you need to know about JoyMatcher's trust-based matchmaking platform.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Sections */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-5xl 2xl:max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {faqSections.map((section) => (
            <div key={section.title} className="mb-16">
              <div className="mb-8">
                <h2 className="font-serif text-3xl md:text-4xl font-bold text-jm-gray-900 mb-3">
                  {section.title}
                </h2>
                <p className="font-sans text-base text-jm-gray-600">
                  {section.description}
                </p>
              </div>

              <div className="space-y-4">
                {section.questions.map((item) => (
                  <details key={item.question} className="bg-white rounded-lg shadow-sm border border-jm-gray-200 p-6 group">
                    <summary className="font-sans text-base font-semibold text-jm-gray-900 cursor-pointer list-none flex items-center justify-between">
                      {item.question}
                      <svg className="w-5 h-5 text-jm-gray-600 group-open:rotate-180 transition-transform flex-shrink-0 ml-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"/>
                      </svg>
                    </summary>
                    <p className="font-sans text-sm text-jm-gray-600 mt-4 leading-relaxed">
                      {item.answer}
                    </p>
                  </details>
                ))}
              </div>
            </div>
          ))}

          {/* Still Have Questions CTA */}
          <div className="bg-gradient-jm rounded-xl p-8 md:p-12 text-center text-white">
            <h3 className="font-serif text-2xl md:text-3xl font-bold mb-4">
              Still Have Questions?
            </h3>
            <p className="font-sans text-base md:text-lg mb-8 opacity-90">
              Our support team is here to help. Reach out and we'll get back to you within 24-48 hours.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact" className="bg-white hover:bg-jm-gray-100 text-jm-purple font-sans font-semibold px-8 py-3 rounded-lg transition-all duration-200 shadow-md text-center">
                Contact Support
              </Link>
              <Link to="/how-it-works" className="border-2 border-white hover:bg-white/10 text-white font-sans font-semibold px-8 py-3 rounded-lg transition-all duration-200 text-center">
                Learn How It Works
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
