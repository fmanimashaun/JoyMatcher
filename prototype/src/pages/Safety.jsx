import { Link } from 'react-router-dom';
import Button from '../components/common/Button';
import Card from '../components/common/Card';

export default function Safety() {
  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-jm-purple-deep/5 via-white to-jm-coral/5 py-16 md:py-20">
        <div className="max-w-screen-xl 2xl:max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl 2xl:max-w-6xl mx-auto text-center space-y-6">
            <div className="w-20 h-20 bg-jm-success/10 rounded-full flex items-center justify-center mx-auto">
              <svg className="w-10 h-10 text-jm-success" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
              </svg>
            </div>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-jm-gray-900 leading-tight">
              Your Safety is Our Priority
            </h1>
            <p className="font-sans text-lg md:text-xl text-jm-gray-700 leading-relaxed">
              Privacy-first architecture, verified identities, and consent-driven interactions built into every feature.
            </p>
          </div>
        </div>
      </section>

      {/* Core Safety Principles Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-screen-xl 2xl:max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-jm-gray-900 mb-4">
              Core Safety Principles
            </h2>
            <p className="font-sans text-lg text-jm-gray-600 max-w-2xl mx-auto">
              Safety is not a feature—it's the foundation of everything we build.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: (
                  <svg className="w-8 h-8 text-jm-coral" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd"/>
                  </svg>
                ),
                title: 'Privacy by Design',
                description: 'Your data is encrypted at rest and in transit. You control what you share and with whom. Revoke access anytime.',
              },
              {
                icon: (
                  <svg className="w-8 h-8 text-jm-coral" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                  </svg>
                ),
                title: 'Consent-Driven',
                description: 'No unsolicited messages. No cold contact. Every interaction requires mutual consent through Show Interest.',
              },
              {
                icon: (
                  <svg className="w-8 h-8 text-jm-coral" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                  </svg>
                ),
                title: 'Verified Identities',
                description: 'Liveness checks for all users. Government ID verification for VIP members. Real people, verified presence.',
              },
            ].map((principle) => (
              <Card key={principle.title} variant="subtle" hover className="text-center space-y-4">
                <div className="w-16 h-16 bg-jm-coral/10 rounded-full flex items-center justify-center mx-auto">
                  {principle.icon}
                </div>
                <h3 className="font-serif text-xl font-semibold text-jm-gray-900">
                  {principle.title}
                </h3>
                <p className="font-sans text-sm text-jm-gray-600 leading-relaxed">
                  {principle.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Verification System Section */}
      <section className="py-16 md:py-24 bg-jm-gray-50">
        <div className="max-w-screen-xl 2xl:max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-jm-gray-900 mb-4">
              Multi-Layer Verification
            </h2>
            <p className="font-sans text-lg text-jm-gray-600 max-w-2xl mx-auto">
              We verify users at multiple levels to ensure authentic profiles.
            </p>
          </div>

          <div className="space-y-6 max-w-5xl 2xl:max-w-6xl mx-auto">
            {/* Level 1 */}
            <div className="bg-white rounded-xl shadow-sm p-6 flex items-start gap-6">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-jm-success text-white rounded-full flex items-center justify-center font-bold">
                  1
                </div>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="font-serif text-xl font-semibold text-jm-gray-900">Email Verification</h3>
                  <span className="bg-jm-success/10 text-jm-success px-2 py-0.5 rounded text-xs font-medium">All Users</span>
                </div>
                <p className="font-sans text-sm text-jm-gray-600">
                  Every account requires email verification. We confirm you have access to the email address you registered with.
                </p>
              </div>
            </div>

            {/* Level 2 */}
            <div className="bg-white rounded-xl shadow-sm p-6 flex items-start gap-6">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-jm-success text-white rounded-full flex items-center justify-center font-bold">
                  2
                </div>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="font-serif text-xl font-semibold text-jm-gray-900">Liveness Check</h3>
                  <span className="bg-jm-success/10 text-jm-success px-2 py-0.5 rounded text-xs font-medium">Tier 1</span>
                </div>
                <p className="font-sans text-sm text-jm-gray-600">
                  All Tier 1 users complete a liveness check during profile photo upload. This confirms you're a real person, not a bot or stolen photo.
                </p>
              </div>
            </div>

            {/* Level 3 */}
            <div className="bg-white rounded-xl shadow-sm p-6 flex items-start gap-6">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-gradient-jm text-white rounded-full flex items-center justify-center font-bold">
                  3
                </div>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="font-serif text-xl font-semibold text-jm-gray-900">Government ID + Live KYC</h3>
                  <span className="bg-jm-purple/10 text-jm-purple px-2 py-0.5 rounded text-xs font-medium">VIP Only</span>
                </div>
                <p className="font-sans text-sm text-jm-gray-600">
                  VIP members undergo full identity verification: government-issued ID upload, live video verification with randomized liveness challenges, face-matching between photo and video, and manual review by our team.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Privacy Features Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-screen-xl 2xl:max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-jm-gray-900 mb-4">
              Privacy Features
            </h2>
            <p className="font-sans text-lg text-jm-gray-600 max-w-2xl mx-auto">
              Your privacy is not a setting—it's the default.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl 2xl:max-w-6xl mx-auto">
            {[
              {
                title: 'One-to-One Disclosure',
                description: 'Information you share with one person is not visible to others. Each relationship has its own privacy scope.',
              },
              {
                title: 'Revocable Access',
                description: 'You can revoke access to your tier information at any time. EDT recalculates immediately, protecting both parties.',
              },
              {
                title: 'Consent Gates',
                description: 'No one can contact you without mutual interest via "Show Interest." No cold messages, no unsolicited outreach.',
              },
              {
                title: 'VIP Invisibility',
                description: 'VIP members can make their profiles completely invisible. Only expert-facilitated introductions—complete discretion.',
              },
              {
                title: 'No Data Selling',
                description: 'We never sell your data to third parties. Your information is used solely for matchmaking purposes.',
              },
              {
                title: 'GDPR/NDPR Compliant',
                description: 'Full compliance with Nigerian and European data protection laws. Your rights are protected by law.',
              },
            ].map((feature) => (
              <div key={feature.title} className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <svg className="w-6 h-6 text-jm-success" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                  </svg>
                </div>
                <div>
                  <h3 className="font-serif text-lg font-semibold text-jm-gray-900 mb-1">{feature.title}</h3>
                  <p className="font-sans text-sm text-jm-gray-600">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reporting & Blocking Section */}
      <section className="py-16 md:py-24 bg-jm-gray-50">
        <div className="max-w-screen-xl 2xl:max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl 2xl:max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-jm-gray-900 mb-4">
                Reporting & Blocking
              </h2>
              <p className="font-sans text-lg text-jm-gray-600">
                Tools to protect yourself and our community.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Block */}
              <div className="bg-white rounded-xl shadow-sm p-8 space-y-4">
                <div className="w-12 h-12 bg-jm-error/10 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-jm-error" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M13.477 14.89A6 6 0 015.11 6.524l8.367 8.368zm1.414-1.414L6.524 5.11a6 6 0 018.367 8.367zM18 10a8 8 0 11-16 0 8 8 0 0116 0z" clipRule="evenodd"/>
                  </svg>
                </div>
                <h3 className="font-serif text-xl font-semibold text-jm-gray-900">Block User</h3>
                <p className="font-sans text-sm text-jm-gray-600 leading-relaxed">
                  Go to the user's profile, click the three-dot menu, and select "Block User." Blocking is instant and bilateral—you both become invisible to each other. You can unblock later if needed.
                </p>
              </div>

              {/* Report */}
              <div className="bg-white rounded-xl shadow-sm p-8 space-y-4">
                <div className="w-12 h-12 bg-jm-warning/10 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-jm-warning" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd"/>
                  </svg>
                </div>
                <h3 className="font-serif text-xl font-semibold text-jm-gray-900">Report User</h3>
                <p className="font-sans text-sm text-jm-gray-600 leading-relaxed">
                  Click "Report" from the user's profile or message thread. Select the reason (harassment, fake profile, inappropriate content, spam, etc.) and provide details. Reports are reviewed within 24-48 hours.
                </p>
              </div>
            </div>

            {/* Zero Tolerance */}
            <div className="mt-8 bg-jm-error/5 border border-jm-error/20 rounded-xl p-6">
              <div className="flex items-start gap-4">
                <svg className="w-6 h-6 text-jm-error flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd"/>
                </svg>
                <div>
                  <h4 className="font-sans text-base font-semibold text-jm-error mb-1">Zero Tolerance Policy</h4>
                  <p className="font-sans text-sm text-jm-gray-700">
                    We have zero tolerance for harassment, hate speech, scams, and inappropriate behavior. Serious violations result in immediate suspension or permanent ban. No exceptions.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Data Protection Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-screen-xl 2xl:max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl 2xl:max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-jm-gray-900 mb-4">
                Your Data Rights
              </h2>
              <p className="font-sans text-lg text-jm-gray-600">
                You own your data. Here's what you can do with it.
              </p>
            </div>

            <div className="space-y-4">
              {[
                {
                  title: 'Right to Access',
                  description: 'Request a copy of all data we have about you at any time.',
                },
                {
                  title: 'Right to Rectification',
                  description: 'Correct any inaccurate information in your profile.',
                },
                {
                  title: 'Right to Erasure',
                  description: 'Delete your account and all associated data permanently.',
                },
                {
                  title: 'Right to Portability',
                  description: 'Export your data in a machine-readable format.',
                },
                {
                  title: 'Right to Object',
                  description: 'Opt out of certain data processing activities.',
                },
              ].map((right) => (
                <div key={right.title} className="bg-jm-gray-50 rounded-lg p-6 flex items-start gap-4">
                  <svg className="w-5 h-5 text-jm-success flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                  </svg>
                  <div>
                    <h3 className="font-sans text-base font-semibold text-jm-gray-900 mb-1">{right.title}</h3>
                    <p className="font-sans text-sm text-jm-gray-600">{right.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 text-center">
              <p className="font-sans text-sm text-jm-gray-600">
                To exercise any of these rights, contact us at{' '}
                <a href="mailto:privacy@joymatcher.com" className="text-jm-coral hover:underline">
                  privacy@joymatcher.com
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Safety Team Section */}
      <section className="py-16 md:py-24 bg-jm-gray-50">
        <div className="max-w-5xl 2xl:max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-16 h-16 bg-jm-coral/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-jm-coral" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
            </svg>
          </div>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-jm-gray-900 mb-4">
            Need to Report a Safety Concern?
          </h2>
          <p className="font-sans text-lg text-jm-gray-600 mb-8">
            Our Trust & Safety team monitors reports 24/7. For urgent concerns, contact us directly.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:safety@joymatcher.com"
              className="bg-jm-coral hover:bg-jm-purple text-white font-sans font-semibold px-8 py-3 rounded-lg transition-all duration-200 shadow-md"
            >
              Email Safety Team
            </a>
            <Link
              to="/contact"
              className="border-2 border-jm-gray-300 hover:border-jm-purple text-jm-gray-700 hover:text-jm-purple font-sans font-semibold px-8 py-3 rounded-lg transition-all duration-200"
            >
              General Contact
            </Link>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-jm-purple-deep to-jm-coral">
        <div className="max-w-5xl 2xl:max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          <h2 className="font-serif text-3xl md:text-5xl font-bold leading-tight text-white drop-shadow-lg">
            Safe Connections Start Here
          </h2>
          <p className="font-sans text-lg md:text-xl text-white max-w-2xl mx-auto drop-shadow-md">
            Join a community built on trust, verification, and mutual respect.
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
