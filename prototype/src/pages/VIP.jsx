import { Link } from 'react-router-dom';
import Button from '../components/common/Button';
import Card from '../components/common/Card';

export default function VIP() {
  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-jm-purple-deep to-jm-coral py-20 md:py-32">
        <div className="max-w-5xl 2xl:max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <span className="inline-block bg-white/20 text-white font-sans font-semibold px-4 py-2 rounded-full text-sm">
            White-Glove Matchmaking
          </span>
          <h1 className="font-serif text-4xl md:text-6xl font-bold leading-tight text-white drop-shadow-lg">
            VIP Concierge Service
          </h1>
          <p className="font-sans text-lg md:text-xl text-white max-w-2xl mx-auto drop-shadow-md">
            For high-achieving professionals who value time, discretion, and curated introductions.
          </p>
        </div>
      </section>

      {/* What is VIP Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-screen-xl 2xl:max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl 2xl:max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-jm-gray-900 mb-4">
                VIP is Not "Premium Plus"
              </h2>
              <p className="font-sans text-lg text-jm-gray-600 mb-8">
                It's a completely different service model designed for those who want matchmaking done for them, not by them.
              </p>

              {/* VIP Concierge Image */}
              <div className="max-w-md mx-auto mb-12">
                <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                  <img
                    src="/images/vip-concierge-professional.png"
                    alt="VIP Concierge Matchmaker"
                    className="w-full h-auto"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6">
                    <p className="text-white font-semibold text-lg drop-shadow-lg">Your Dedicated Matchmaking Expert</p>
                    <p className="text-white/90 text-sm drop-shadow-md">Professional, discreet, results-driven</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Self-Service Column */}
              <div className="bg-jm-gray-50 rounded-xl p-8 space-y-4">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-jm-gray-200 rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-jm-gray-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"/>
                    </svg>
                  </div>
                  <h3 className="font-serif text-xl font-semibold text-jm-gray-700">Free & Premium</h3>
                </div>
                <p className="font-sans text-sm text-jm-gray-600 mb-4">Self-service browsing</p>
                <ul className="space-y-2">
                  {['You browse profiles', 'You send Show Interest', 'You initiate conversations', 'You manage matches', 'You do the work'].map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-jm-gray-600">
                      <span className="text-jm-gray-400 mt-0.5">-</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* VIP Column */}
              <div className="bg-gradient-to-br from-jm-purple-deep to-jm-coral rounded-xl p-8 space-y-4">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zM12 2a1 1 0 01.967.744L14.146 7.2 17.5 9.134a1 1 0 010 1.732l-3.354 1.935-1.18 4.455a1 1 0 01-1.933 0L9.854 12.8 6.5 10.866a1 1 0 010-1.732l3.354-1.935 1.18-4.455A1 1 0 0112 2z" clipRule="evenodd"/>
                    </svg>
                  </div>
                  <h3 className="font-serif text-xl font-semibold text-white drop-shadow-lg">VIP Concierge</h3>
                </div>
                <p className="font-sans text-sm text-white drop-shadow-md mb-4">Expert-driven matchmaking</p>
                <ul className="space-y-2">
                  {['Expert searches for you', 'Expert vets candidates', 'Expert facilitates introductions', 'Expert coaches conversations', 'You receive, you don\'t browse'].map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-white drop-shadow-md">
                      <svg className="w-4 h-4 text-white flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What's Included Section */}
      <section className="py-16 md:py-24 bg-jm-gray-50">
        <div className="max-w-screen-xl 2xl:max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-jm-gray-900 mb-4">
              What's Included in VIP
            </h2>
            <p className="font-sans text-lg text-jm-gray-600 max-w-2xl mx-auto">
              A comprehensive matchmaking experience designed around your needs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: (
                  <svg className="w-8 h-8 text-jm-coral" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"/>
                  </svg>
                ),
                title: 'Personal Matchmaking Expert',
                description: 'A dedicated professional who knows you deeply—your values, preferences, deal-breakers, and relationship history.',
              },
              {
                icon: (
                  <svg className="w-8 h-8 text-jm-coral" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd"/>
                  </svg>
                ),
                title: 'Curated Introductions',
                description: 'Your expert searches the verified Tier 4-5 pool, vets candidates, and presents only the most promising matches.',
              },
              {
                icon: (
                  <svg className="w-8 h-8 text-jm-coral" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd"/>
                  </svg>
                ),
                title: 'Complete Profile Invisibility',
                description: 'Your profile is hidden from public browsing. Only expert-facilitated introductions—complete discretion for high-profile professionals.',
              },
              {
                icon: (
                  <svg className="w-8 h-8 text-jm-coral" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                  </svg>
                ),
                title: 'Tier 5 Verification',
                description: 'Government ID verification with live video KYC. The "Verified Identity" badge signals the highest level of trust and commitment.',
              },
              {
                icon: (
                  <svg className="w-8 h-8 text-jm-coral" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z"/>
                    <path d="M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h2a2 2 0 002-2V9a2 2 0 00-2-2h-1z"/>
                  </svg>
                ),
                title: 'One-to-One Intake Sessions',
                description: 'Video calls to understand your preferences, values, and relationship goals in depth before matchmaking begins.',
              },
              {
                icon: (
                  <svg className="w-8 h-8 text-jm-coral" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd"/>
                  </svg>
                ),
                title: 'Ongoing Relationship Support',
                description: 'Your expert provides coaching, feedback, and guidance throughout your journey—from first introduction to engagement.',
              },
            ].map((feature) => (
              <Card key={feature.title} variant="default" hover className="space-y-4">
                <div className="w-16 h-16 bg-jm-coral/10 rounded-full flex items-center justify-center">
                  {feature.icon}
                </div>
                <h3 className="font-serif text-xl font-semibold text-jm-gray-900">
                  {feature.title}
                </h3>
                <p className="font-sans text-sm text-jm-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Application Process Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-screen-xl 2xl:max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-jm-gray-900 mb-4">
              How to Apply for VIP
            </h2>
            <p className="font-sans text-lg text-jm-gray-600 max-w-2xl mx-auto">
              VIP is application-based—not everyone is approved. We select for commitment, not just payment.
            </p>
          </div>

          <div className="max-w-5xl 2xl:max-w-6xl mx-auto">
            <div className="space-y-8">
              {[
                {
                  step: '1',
                  title: 'Complete Tier 4',
                  description: 'You must have all four tiers completed before applying. This demonstrates investment and seriousness.',
                },
                {
                  step: '2',
                  title: 'Fill Out Intent Screening',
                  description: '18-question questionnaire about your marriage timeline, privacy needs, matchmaking preferences, and why you want VIP.',
                },
                {
                  step: '3',
                  title: 'VIP Coordinator Review',
                  description: 'Our VIP Coordinator reviews your application for fit, commitment level, and alignment with our values.',
                },
                {
                  step: '4',
                  title: 'Complete Tier 5 Verification',
                  description: 'Upload government ID and complete live video KYC. This is manual review, not automated.',
                },
                {
                  step: '5',
                  title: 'Approval & Onboarding',
                  description: 'If approved, you\'re assigned a matchmaking expert and scheduled for your intake session.',
                },
              ].map((item, index) => (
                <div key={item.step} className="flex gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-gradient-jm rounded-full flex items-center justify-center text-white font-serif font-bold text-xl">
                      {item.step}
                    </div>
                    {index < 4 && (
                      <div className="w-0.5 h-16 bg-jm-gray-200 mx-auto mt-2"></div>
                    )}
                  </div>
                  <div className="flex-1 pb-8">
                    <h3 className="font-serif text-xl font-semibold text-jm-gray-900 mb-2">
                      {item.title}
                    </h3>
                    <p className="font-sans text-sm text-jm-gray-600 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-16 md:py-24 bg-jm-gray-50">
        <div className="max-w-5xl 2xl:max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-jm-gray-900 mb-4">
              VIP Investment
            </h2>
            <p className="font-sans text-lg text-jm-gray-600">
              VIP is an investment in your future marriage, not a dating subscription.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl shadow-md p-8 space-y-4 border-2 border-jm-purple-deep">
              <h3 className="font-serif text-xl font-semibold text-jm-gray-900">Nigerian Users</h3>
              <p className="font-sans text-4xl font-bold text-jm-gray-900">
                From ₦200,000<span className="text-lg font-normal text-jm-gray-600">/month</span>
              </p>
              <p className="font-sans text-sm text-jm-gray-600">
                Pricing may vary based on service intensity and expert assignment.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-md p-8 space-y-4 border-2 border-jm-purple-deep">
              <h3 className="font-serif text-xl font-semibold text-jm-gray-900">Non-Nigerian Users</h3>
              <p className="font-sans text-4xl font-bold text-jm-gray-900">
                From $500<span className="text-lg font-normal text-jm-gray-600">/month</span>
              </p>
              <p className="font-sans text-sm text-jm-gray-600">
                Pricing may vary based on service intensity and expert assignment.
              </p>
            </div>
          </div>

          <div className="mt-8 bg-jm-warning/10 border border-jm-warning rounded-xl p-6">
            <div className="flex items-start gap-3">
              <svg className="w-6 h-6 text-jm-warning flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd"/>
              </svg>
              <div>
                <p className="font-sans text-sm font-semibold text-jm-warning mb-1">Important Notice</p>
                <p className="font-sans text-sm text-jm-gray-700">
                  VIP membership does not guarantee a match. It provides expert matchmaking services and access to verified candidates. Success depends on multiple factors including your preferences, location, and the current pool of VIP-tier candidates.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Expert Qualifications Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-5xl 2xl:max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-jm-gray-900 mb-4">
              Your Matchmaking Expert
            </h2>
            <p className="font-sans text-lg text-jm-gray-600">
              Vetted professionals with backgrounds in relationship coaching and matchmaking.
            </p>
          </div>

          <div className="bg-jm-gray-50 rounded-xl p-8 space-y-6">
            <h3 className="font-serif text-xl font-semibold text-jm-gray-900">Expert Qualifications</h3>
            <ul className="space-y-3">
              {[
                'Background in relationship coaching, psychology, or professional matchmaking',
                'Rigorous training on JoyMatcher\'s tier system and EDT logic',
                'Cultural sensitivity training (especially for African diaspora clients)',
                'Strict confidentiality agreements and regular audits',
                'Data access limited to assigned clients only',
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-jm-success flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                  </svg>
                  <span className="font-sans text-sm text-jm-gray-700">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 md:py-24 bg-jm-gray-50">
        <div className="max-w-5xl 2xl:max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-jm-gray-900 mb-4">
              VIP FAQ
            </h2>
          </div>

          <div className="space-y-4">
            <details className="bg-white rounded-lg shadow-sm p-6 group">
              <summary className="font-sans text-base font-semibold text-jm-gray-900 cursor-pointer list-none flex items-center justify-between">
                Can I still browse if I'm a VIP member?
                <svg className="w-5 h-5 text-jm-gray-600 group-open:rotate-180 transition-transform" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"/>
                </svg>
              </summary>
              <p className="font-sans text-sm text-jm-gray-600 mt-4 leading-relaxed">
                VIP members can disable public browsing entirely, making their profile invisible. This is recommended for discretion. You receive curated introductions from your expert rather than self-serve browsing.
              </p>
            </details>

            <details className="bg-white rounded-lg shadow-sm p-6 group">
              <summary className="font-sans text-base font-semibold text-jm-gray-900 cursor-pointer list-none flex items-center justify-between">
                How many introductions will I receive?
                <svg className="w-5 h-5 text-jm-gray-600 group-open:rotate-180 transition-transform" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"/>
                </svg>
              </summary>
              <p className="font-sans text-sm text-jm-gray-600 mt-4 leading-relaxed">
                Quality over quantity. Your expert presents 2-4 highly vetted candidates per month based on compatibility. We prioritize fit, not volume.
              </p>
            </details>

            <details className="bg-white rounded-lg shadow-sm p-6 group">
              <summary className="font-sans text-base font-semibold text-jm-gray-900 cursor-pointer list-none flex items-center justify-between">
                What if I don't like my matchmaking expert?
                <svg className="w-5 h-5 text-jm-gray-600 group-open:rotate-180 transition-transform" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"/>
                </svg>
              </summary>
              <p className="font-sans text-sm text-jm-gray-600 mt-4 leading-relaxed">
                You can request a different expert through the VIP Coordinator. We want you to feel comfortable with your matchmaker—fit matters.
              </p>
            </details>

            <details className="bg-white rounded-lg shadow-sm p-6 group">
              <summary className="font-sans text-base font-semibold text-jm-gray-900 cursor-pointer list-none flex items-center justify-between">
                Can Premium members initiate contact with VIP members?
                <svg className="w-5 h-5 text-jm-gray-600 group-open:rotate-180 transition-transform" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"/>
                </svg>
              </summary>
              <p className="font-sans text-sm text-jm-gray-600 mt-4 leading-relaxed">
                No. Premium users cannot send Show Interest to VIP members. Only VIPs can initiate contact with anyone. This protects VIP members from unsolicited outreach.
              </p>
            </details>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-jm-purple-deep to-jm-coral">
        <div className="max-w-5xl 2xl:max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          <h2 className="font-serif text-3xl md:text-5xl font-bold leading-tight text-white drop-shadow-lg">
            Ready for White-Glove Matchmaking?
          </h2>
          <p className="font-sans text-lg md:text-xl text-white max-w-2xl mx-auto drop-shadow-md">
            Complete your profile through Tier 4 to begin the VIP application process.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/signup" className="bg-white hover:bg-white/90 text-jm-purple-deep font-sans font-semibold text-lg px-10 py-4 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl text-center">
              Start Your Journey
            </Link>
            <Link to="/pricing" className="border-2 border-white hover:bg-white/10 text-white font-sans font-semibold text-lg px-10 py-4 rounded-lg transition-all duration-200 text-center">
              Compare Plans
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
