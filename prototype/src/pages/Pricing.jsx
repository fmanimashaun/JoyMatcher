import { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/common/Button';
import Card from '../components/common/Card';

export default function Pricing() {
  const [isNigerian, setIsNigerian] = useState(true);

  const pricing = {
    NG: {
      free: '₦0',
      premium: '₦18,000',
      premiumQuarterly: '₦45,000',
      vip: '₦200,000+',
    },
    INT: {
      free: '$0',
      premium: '$18',
      premiumQuarterly: '$45',
      vip: '$200+',
    },
  };

  const currentPricing = isNigerian ? pricing.NG : pricing.INT;

  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-jm-purple-deep/5 via-white to-jm-coral/5 py-16 md:py-20">
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16">
          <div className="max-w-5xl mx-auto text-center space-y-6">
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-jm-text-primary leading-tight">
              Invest in Your Future Marriage
            </h1>
            <p className="font-sans text-lg md:text-xl text-jm-text-secondary leading-relaxed">
              Pricing as a filter, not a promotion. Serious relationships require serious investment.
            </p>

            {/* Currency Toggle */}
            <div className="flex items-center justify-center gap-4 pt-4">
              <span className={`font-sans text-sm ${isNigerian ? 'text-jm-text-primary font-semibold' : 'text-jm-gray-500'}`}>
                Nigeria (NGN)
              </span>
              <button
                onClick={() => setIsNigerian(!isNigerian)}
                className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-jm-purple-deep ${
                  isNigerian ? 'bg-jm-purple-deep' : 'bg-jm-coral'
                }`}
                aria-label="Toggle currency"
              >
                <span
                  className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${
                    isNigerian ? 'translate-x-1' : 'translate-x-7'
                  }`}
                />
              </button>
              <span className={`font-sans text-sm ${!isNigerian ? 'text-jm-text-primary font-semibold' : 'text-jm-gray-500'}`}>
                International (USD)
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Cards Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Free Tier */}
            <Card variant="default" className="space-y-6 relative">
              <div>
                <h3 className="font-serif text-2xl font-semibold text-jm-text-primary mb-2">Free</h3>
                <p className="font-sans text-4xl font-bold text-jm-text-primary">{currentPricing.free}</p>
                <p className="font-sans text-sm text-jm-text-secondary">Forever free</p>
              </div>
              <p className="font-sans text-sm text-jm-text-secondary">
                Explore the platform, complete Tier 1-2, and connect with other Free users.
              </p>
              <ul className="space-y-3">
                {[
                  'Complete Tier 1 (Identity & Intent)',
                  'Complete Tier 2 (Lifestyle & Background)',
                  'Browse other Free users',
                  'Send Show Interest to Free users',
                  'Unlimited messaging (after mutual interest)',
                  'Basic profile visibility',
                ].map((feature) => (
                  <li key={feature} className="flex items-start gap-2 text-sm text-jm-text-secondary">
                    <svg className="w-5 h-5 text-jm-success flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
              <div className="space-y-3">
                <p className="font-sans text-xs text-jm-gray-500 italic">
                  Cannot view or interact with Premium/VIP users
                </p>
                <Button to="/signup" variant="secondary" className="w-full">
                  Get Started Free
                </Button>
              </div>
            </Card>

            {/* Premium Tier */}
            <Card variant="gradient" className="space-y-6 relative transform md:scale-105">
              <div className="absolute top-0 right-0 bg-white text-jm-purple-deep text-xs font-semibold px-3 py-1 rounded-bl-lg rounded-tr-xl">
                Most Popular
              </div>
              <div>
                <h3 className="font-serif text-2xl font-semibold text-white mb-2">Premium</h3>
                <p className="font-sans text-4xl font-bold text-white">{currentPricing.premium}</p>
                <p className="font-sans text-sm text-white/80">per month</p>
              </div>
              <p className="font-sans text-sm text-white/90">
                Unlock deeper connections with Tier 3-4 access and Premium user network.
              </p>
              <ul className="space-y-3">
                {[
                  'Everything in Free',
                  'Complete Tier 3 (Relationship & Family)',
                  'Complete Tier 4 (Health & Compatibility)',
                  'Request deeper details from matches',
                  'Send Show Interest to Premium users',
                  'Access Premium user pool',
                  'Advanced matching filters',
                ].map((feature) => (
                  <li key={feature} className="flex items-start gap-2 text-sm text-white">
                    <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
              <div className="space-y-3">
                <p className="font-sans text-xs text-white/70 italic">
                  Requires Tier 2 completion before upgrade
                </p>
                <button className="w-full bg-white hover:bg-jm-gray-100 text-jm-purple-deep font-sans font-semibold px-6 py-3 rounded-lg transition-all duration-200 shadow-md">
                  Start Premium
                </button>
              </div>
            </Card>

            {/* VIP Tier */}
            <Card variant="default" className="space-y-6 relative border-2 border-jm-purple-deep">
              <div className="absolute top-0 right-0 bg-jm-purple-deep text-white text-xs font-semibold px-3 py-1 rounded-bl-lg rounded-tr-xl">
                Concierge Service
              </div>
              <div>
                <h3 className="font-serif text-2xl font-semibold text-jm-text-primary mb-2">VIP</h3>
                <p className="font-sans text-4xl font-bold text-jm-text-primary">{currentPricing.vip}</p>
                <p className="font-sans text-sm text-jm-text-secondary">per month (application-based)</p>
              </div>
              <p className="font-sans text-sm text-jm-text-secondary">
                White-glove matchmaking with dedicated expert and curated introductions.
              </p>
              <ul className="space-y-3">
                {[
                  'Everything in Premium',
                  'Complete Tier 5 (KYC Verified Identity)',
                  'Personal matchmaking expert',
                  'Curated introductions from verified pool',
                  'Profile invisibility (optional)',
                  'One-to-one intake sessions',
                  'Expert-facilitated first conversations',
                  'Ongoing relationship support',
                ].map((feature) => (
                  <li key={feature} className="flex items-start gap-2 text-sm text-jm-text-secondary">
                    <svg className="w-5 h-5 text-jm-success flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
              <div className="space-y-3">
                <p className="font-sans text-xs text-jm-gray-500 italic">
                  Requires Tier 4 completion + application approval
                </p>
                <Button to="/vip" variant="secondary" className="w-full">
                  Learn About VIP
                </Button>
              </div>
            </Card>
          </div>

          {/* Quarterly Savings */}
          <div className="mt-12 max-w-2xl mx-auto text-center">
            <div className="bg-jm-gray-50 rounded-xl p-6">
              <h3 className="font-serif text-xl font-semibold text-jm-text-primary mb-2">
                Save with Quarterly Billing
              </h3>
              <p className="font-sans text-sm text-jm-text-secondary mb-4">
                Premium quarterly: <span className="font-semibold text-jm-text-primary">{currentPricing.premiumQuarterly}</span> (save 17%)
              </p>
              <p className="font-sans text-xs text-jm-gray-500 italic">
                Quiet annual discounts available for long-term members. No public promo codes or influencer partnerships.
              </p>
            </div>
          </div>
          </div>
        </div>
      </section>

      {/* Feature Comparison Table */}
      <section className="py-16 md:py-24 bg-jm-gray-50">
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-jm-text-primary mb-4">
                Feature Comparison
              </h2>
              <p className="font-sans text-lg text-jm-text-secondary">
                See exactly what's included at each tier level.
              </p>
            </div>

            <div className="overflow-x-auto">
            <table className="w-full bg-white rounded-xl shadow-md">
              <thead>
                <tr className="border-b border-jm-gray-200">
                  <th className="text-left p-4 font-sans text-sm font-semibold text-jm-text-secondary">Feature</th>
                  <th className="text-center p-4 font-sans text-sm font-semibold text-jm-text-secondary">Free</th>
                  <th className="text-center p-4 font-sans text-sm font-semibold text-jm-purple bg-jm-purple/5">Premium</th>
                  <th className="text-center p-4 font-sans text-sm font-semibold text-jm-text-secondary">VIP</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-jm-gray-100">
                {[
                  { feature: 'Tier 1-2 Access', free: true, premium: true, vip: true },
                  { feature: 'Tier 3-4 Access', free: false, premium: true, vip: true },
                  { feature: 'Tier 5 (KYC Verification)', free: false, premium: false, vip: true },
                  { feature: 'Browse Free Users', free: true, premium: true, vip: true },
                  { feature: 'Browse Premium Users', free: false, premium: true, vip: true },
                  { feature: 'Browse VIP Users', free: false, premium: false, vip: true },
                  { feature: 'Send Show Interest', free: 'Free only', premium: 'Premium+', vip: 'All users' },
                  { feature: 'Request Deeper Details', free: false, premium: true, vip: true },
                  { feature: 'Profile Invisibility', free: false, premium: false, vip: true },
                  { feature: 'Personal Matchmaker', free: false, premium: false, vip: true },
                  { feature: 'Curated Introductions', free: false, premium: false, vip: true },
                ].map((row, index) => (
                  <tr key={index} className="hover:bg-jm-gray-50">
                    <td className="p-4 font-sans text-sm text-jm-text-secondary">{row.feature}</td>
                    <td className="p-4 text-center">
                      {typeof row.free === 'boolean' ? (
                        row.free ? (
                          <svg className="w-5 h-5 text-jm-success mx-auto" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                          </svg>
                        ) : (
                          <svg className="w-5 h-5 text-jm-gray-300 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"/>
                          </svg>
                        )
                      ) : (
                        <span className="font-sans text-xs text-jm-text-secondary">{row.free}</span>
                      )}
                    </td>
                    <td className="p-4 text-center bg-jm-purple/5">
                      {typeof row.premium === 'boolean' ? (
                        row.premium ? (
                          <svg className="w-5 h-5 text-jm-success mx-auto" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                          </svg>
                        ) : (
                          <svg className="w-5 h-5 text-jm-gray-300 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"/>
                          </svg>
                        )
                      ) : (
                        <span className="font-sans text-xs text-jm-text-secondary">{row.premium}</span>
                      )}
                    </td>
                    <td className="p-4 text-center">
                      {typeof row.vip === 'boolean' ? (
                        row.vip ? (
                          <svg className="w-5 h-5 text-jm-success mx-auto" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                          </svg>
                        ) : (
                          <svg className="w-5 h-5 text-jm-gray-300 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"/>
                          </svg>
                        )
                      ) : (
                        <span className="font-sans text-xs text-jm-text-secondary">{row.vip}</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-jm-text-primary mb-4">
              Why We Don't Discount
            </h2>
            <p className="font-sans text-lg text-jm-text-secondary">
              Our pricing philosophy protects the quality of our community.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-jm-gray-50 rounded-xl p-8 space-y-4">
              <div className="w-12 h-12 bg-jm-coral/10 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-jm-coral" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                </svg>
              </div>
              <h3 className="font-serif text-xl font-semibold text-jm-text-primary">
                Price as a Filter
              </h3>
              <p className="font-sans text-sm text-jm-text-secondary leading-relaxed">
                Our pricing filters for seriousness. Casual users who aren't ready to invest in their relationship journey self-select out, leaving a more committed user base.
              </p>
            </div>

            <div className="bg-jm-gray-50 rounded-xl p-8 space-y-4">
              <div className="w-12 h-12 bg-jm-coral/10 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-jm-coral" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z"/>
                </svg>
              </div>
              <h3 className="font-serif text-xl font-semibold text-jm-text-primary">
                Community Protection
              </h3>
              <p className="font-sans text-sm text-jm-text-secondary leading-relaxed">
                No influencer codes, no flash sales, no FOMO tactics. This protects our members from the gamification that plagues other platforms.
              </p>
            </div>

            <div className="bg-jm-gray-50 rounded-xl p-8 space-y-4">
              <div className="w-12 h-12 bg-jm-coral/10 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-jm-coral" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                </svg>
              </div>
              <h3 className="font-serif text-xl font-semibold text-jm-text-primary">
                Value Alignment
              </h3>
              <p className="font-sans text-sm text-jm-text-secondary leading-relaxed">
                When you pay for Premium or VIP, you're signaling to potential matches that you take this seriously. It's a form of investment signaling.
              </p>
            </div>

            <div className="bg-jm-gray-50 rounded-xl p-8 space-y-4">
              <div className="w-12 h-12 bg-jm-coral/10 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-jm-coral" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd"/>
                </svg>
              </div>
              <h3 className="font-serif text-xl font-semibold text-jm-text-primary">
                Sustainability
              </h3>
              <p className="font-sans text-sm text-jm-text-secondary leading-relaxed">
                Fair pricing ensures we can sustain quality matchmaking services, invest in safety features, and pay expert matchmakers fairly.
              </p>
            </div>
          </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 md:py-24 bg-jm-gray-50">
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-jm-text-primary mb-4">
              Pricing FAQ
            </h2>
          </div>

          <div className="space-y-4">
            <details className="bg-white rounded-lg shadow-sm p-6 group">
              <summary className="font-sans text-base font-semibold text-jm-text-primary cursor-pointer list-none flex items-center justify-between">
                Can I cancel my subscription?
                <svg className="w-5 h-5 text-jm-text-secondary group-open:rotate-180 transition-transform" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"/>
                </svg>
              </summary>
              <p className="font-sans text-sm text-jm-text-secondary mt-4 leading-relaxed">
                Yes. You can cancel anytime from your Account Settings. Your access continues until the end of your billing period. No refunds for partial months.
              </p>
            </details>

            <details className="bg-white rounded-lg shadow-sm p-6 group">
              <summary className="font-sans text-base font-semibold text-jm-text-primary cursor-pointer list-none flex items-center justify-between">
                What payment methods do you accept?
                <svg className="w-5 h-5 text-jm-text-secondary group-open:rotate-180 transition-transform" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"/>
                </svg>
              </summary>
              <p className="font-sans text-sm text-jm-text-secondary mt-4 leading-relaxed">
                We accept Visa, Mastercard, debit cards, bank transfers (Nigeria), Paystack, and mobile money. International users can use Stripe-supported methods.
              </p>
            </details>

            <details className="bg-white rounded-lg shadow-sm p-6 group">
              <summary className="font-sans text-base font-semibold text-jm-text-primary cursor-pointer list-none flex items-center justify-between">
                What happens to my data if I downgrade from Premium to Free?
                <svg className="w-5 h-5 text-jm-text-secondary group-open:rotate-180 transition-transform" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"/>
                </svg>
              </summary>
              <p className="font-sans text-sm text-jm-text-secondary mt-4 leading-relaxed">
                Your Tier 3-4 data remains saved but becomes inaccessible to others. You lose ability to request deeper details. You can re-upgrade anytime without re-entering data.
              </p>
            </details>

            <details className="bg-white rounded-lg shadow-sm p-6 group">
              <summary className="font-sans text-base font-semibold text-jm-text-primary cursor-pointer list-none flex items-center justify-between">
                How do I upgrade from Premium to VIP?
                <svg className="w-5 h-5 text-jm-text-secondary group-open:rotate-180 transition-transform" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"/>
                </svg>
              </summary>
              <p className="font-sans text-sm text-jm-text-secondary mt-4 leading-relaxed">
                VIP is application-based. Complete Tier 4, fill out the intent screening questionnaire, undergo manual review, and complete Tier 5 verification. Not instant—approval required.
              </p>
            </details>
          </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-jm-purple-deep to-jm-coral">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          <h2 className="font-serif text-3xl md:text-5xl font-bold leading-tight text-white drop-shadow-lg">
            Ready to Invest in Your Future?
          </h2>
          <p className="font-sans text-lg md:text-xl text-white max-w-2xl mx-auto drop-shadow-md">
            Start free and upgrade when you're ready for deeper connections.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/signup" className="bg-white hover:bg-white/90 text-jm-purple-deep font-sans font-semibold text-lg px-10 py-4 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl text-center">
              Create Free Account
            </Link>
            <Link to="/how-it-works" className="border-2 border-white hover:bg-white/10 text-white font-sans font-semibold text-lg px-10 py-4 rounded-lg transition-all duration-200 text-center">
              Learn How It Works
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
