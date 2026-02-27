import { Link } from 'react-router-dom';
import Button from '../components/common/Button';
import Card from '../components/common/Card';

export default function HowItWorks() {
  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-jm-purple-deep/5 via-white to-jm-coral/5 py-16 md:py-20">
        <div className="max-w-screen-xl 2xl:max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl 2xl:max-w-6xl mx-auto text-center space-y-6">
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-jm-gray-900 leading-tight">
              How JoyMatcher Works: Build Trust, One Tier at a Time
            </h1>
            <p className="font-sans text-lg md:text-xl text-jm-gray-700 leading-relaxed">
              Learn about our progressive tier system that lets you share information gradually, ensuring reciprocal transparency and genuine connections.
            </p>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-screen-xl 2xl:max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl 2xl:max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-jm-gray-900 mb-4">
                Why Progressive Disclosure?
              </h2>
              <p className="font-sans text-lg text-jm-gray-600">
                Traditional dating apps force you to reveal everything upfront. We believe trust should be earned, not assumed.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Problem Card */}
              <div className="bg-jm-error/5 border-l-4 border-jm-error rounded-r-lg p-6 space-y-3">
                <div className="flex items-center gap-2 text-jm-error">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd"/>
                  </svg>
                  <h3 className="font-serif text-xl font-semibold">The Old Way (Broken)</h3>
                </div>
                <ul className="space-y-2 font-sans text-sm text-jm-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-jm-error mt-0.5">x</span>
                    <span>All personal information visible to anyone</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-jm-error mt-0.5">x</span>
                    <span>No control over who sees what</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-jm-error mt-0.5">x</span>
                    <span>One-sided viewing (they see you, you don't see them)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-jm-error mt-0.5">x</span>
                    <span>Unsolicited messages from strangers</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-jm-error mt-0.5">x</span>
                    <span>Privacy concerns for professionals</span>
                  </li>
                </ul>
              </div>

              {/* Solution Card */}
              <div className="bg-jm-success/5 border-l-4 border-jm-success rounded-r-lg p-6 space-y-3">
                <div className="flex items-center gap-2 text-jm-success">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                  </svg>
                  <h3 className="font-serif text-xl font-semibold">The JoyMatcher Way</h3>
                </div>
                <ul className="space-y-2 font-sans text-sm text-jm-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-jm-success mt-0.5">&#10003;</span>
                    <span>Share information gradually as trust builds</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-jm-success mt-0.5">&#10003;</span>
                    <span>You control exactly what you reveal and when</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-jm-success mt-0.5">&#10003;</span>
                    <span>Reciprocal transparency (they share, you share)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-jm-success mt-0.5">&#10003;</span>
                    <span>No contact without mutual interest</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-jm-success mt-0.5">&#10003;</span>
                    <span>Complete privacy for professionals</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Core Principle Callout */}
            <div className="mt-12 bg-gradient-jm text-white rounded-xl p-8 text-center">
              <p className="font-serif text-2xl md:text-3xl font-semibold italic leading-relaxed">
                "Depth is earned. Access is matched. Seriousness is demonstrated, not claimed."
              </p>
              <p className="font-sans text-sm opacity-90 mt-4">
                — JoyMatcher Core Philosophy
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* The 5 Tiers Section */}
      <section className="py-16 md:py-24 bg-jm-gray-50">
        <div className="max-w-screen-xl 2xl:max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-jm-gray-900 mb-4">
              The 5 Tiers of Trust
            </h2>
            <p className="font-sans text-lg text-jm-gray-600 max-w-3xl mx-auto mb-8">
              Each tier unlocks deeper information. Complete a tier to request it from others. All-or-nothing—no partial completion allowed.
            </p>

            {/* Tier Progression Visual */}
            <div className="max-w-4xl mx-auto">
              <img src="/images/illustrations/tier-progression.svg" alt="5 Tiers of Progressive Disclosure" className="w-full" />
            </div>
          </div>

          <div className="space-y-8">
            {/* Tier 1 */}
            <article className="bg-white rounded-xl shadow-md border-2 border-jm-success p-8 space-y-6">
              <div className="flex items-start justify-between flex-wrap gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="bg-jm-success text-white font-bold px-4 py-2 rounded-full text-sm">
                      Tier 1
                    </span>
                    <h3 className="font-serif text-2xl md:text-3xl font-semibold text-jm-gray-900">
                      Identity & Intent
                    </h3>
                  </div>
                  <p className="font-sans text-base text-jm-gray-600">
                    Public information - Required for all users - Free, Premium, VIP
                  </p>
                </div>
                <span className="bg-jm-success/10 text-jm-success px-4 py-2 rounded-lg text-sm font-medium">
                  Public Visibility
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* What's Included */}
                <div className="space-y-3">
                  <h4 className="font-sans text-sm font-semibold text-jm-gray-700 uppercase tracking-wide">
                    What's Included
                  </h4>
                  <ul className="space-y-2">
                    {['Display Name & Age', 'Gender Identity', 'Location (City, Country)', 'Nationality', 'Faith/Belief Orientation', 'Relationship Intent', 'Primary Profile Photo', 'Liveness Check (verified)'].map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm text-jm-gray-700">
                        <svg className="w-4 h-4 text-jm-success flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                        </svg>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Purpose */}
                <div className="space-y-3">
                  <h4 className="font-sans text-sm font-semibold text-jm-gray-700 uppercase tracking-wide">
                    Purpose
                  </h4>
                  <p className="font-sans text-sm text-jm-gray-600 leading-relaxed">
                    Confirms you're a real person with clear relationship intentions. This information is public to help others find you. Includes basic liveness check to prevent fake profiles.
                  </p>
                </div>

                {/* Rules */}
                <div className="space-y-3">
                  <h4 className="font-sans text-sm font-semibold text-jm-gray-700 uppercase tracking-wide">
                    Rules
                  </h4>
                  <ul className="space-y-2 font-sans text-sm text-jm-gray-600">
                    <li className="flex items-start gap-2">
                      <span className="text-jm-purple font-bold mt-0.5">*</span>
                      <span>Mandatory for all users (Free, Premium, VIP)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-jm-purple font-bold mt-0.5">*</span>
                      <span>Public visibility (except VIP invisible profiles)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-jm-purple font-bold mt-0.5">*</span>
                      <span>All fields required (no optional data)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-jm-purple font-bold mt-0.5">*</span>
                      <span>Cannot proceed to Tier 2 until complete</span>
                    </li>
                  </ul>
                </div>
              </div>
            </article>

            {/* Tier 2 */}
            <article className="bg-white rounded-xl shadow-md border-2 border-jm-purple p-8 space-y-6">
              <div className="flex items-start justify-between flex-wrap gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="bg-jm-purple text-white font-bold px-4 py-2 rounded-full text-sm">
                      Tier 2
                    </span>
                    <h3 className="font-serif text-2xl md:text-3xl font-semibold text-jm-gray-900">
                      Lifestyle & Personal Background
                    </h3>
                  </div>
                  <p className="font-sans text-base text-jm-gray-600">
                    Request-based - Required for Premium eligibility - Free, Premium, VIP
                  </p>
                </div>
                <span className="bg-jm-purple/10 text-jm-purple px-4 py-2 rounded-lg text-sm font-medium">
                  Reciprocal Only
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-3">
                  <h4 className="font-sans text-sm font-semibold text-jm-gray-700 uppercase tracking-wide">
                    What's Included
                  </h4>
                  <ul className="space-y-2">
                    {['Height & Body Type', 'Education Level & Field', 'Employment Status', 'Occupation Category', 'Lifestyle Habits', 'Primary Languages'].map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm text-jm-gray-700">
                        <svg className="w-4 h-4 text-jm-success flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                        </svg>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-3">
                  <h4 className="font-sans text-sm font-semibold text-jm-gray-700 uppercase tracking-wide">
                    Purpose
                  </h4>
                  <p className="font-sans text-sm text-jm-gray-600 leading-relaxed">
                    Early practical compatibility screening. Helps identify lifestyle alignment before deeper investment.
                  </p>
                </div>

                <div className="space-y-3">
                  <h4 className="font-sans text-sm font-semibold text-jm-gray-700 uppercase tracking-wide">
                    Rules
                  </h4>
                  <ul className="space-y-2 font-sans text-sm text-jm-gray-600">
                    <li className="flex items-start gap-2">
                      <span className="text-jm-purple font-bold mt-0.5">*</span>
                      <span>Request-based visibility (not public)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-jm-purple font-bold mt-0.5">*</span>
                      <span>Reciprocal disclosure required</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-jm-purple font-bold mt-0.5">*</span>
                      <span>Must complete to unlock Premium eligibility</span>
                    </li>
                  </ul>
                </div>
              </div>
            </article>

            {/* Tier 3 */}
            <article className="bg-white rounded-xl shadow-md border-2 border-jm-coral p-8 space-y-6">
              <div className="flex items-start justify-between flex-wrap gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="bg-jm-coral text-white font-bold px-4 py-2 rounded-full text-sm">
                      Tier 3
                    </span>
                    <h3 className="font-serif text-2xl md:text-3xl font-semibold text-jm-gray-900">
                      Relationship History & Family Context
                    </h3>
                  </div>
                  <p className="font-sans text-base text-jm-gray-600">
                    Marriage readiness - Premium or VIP required
                  </p>
                </div>
                <span className="bg-jm-warning/20 text-jm-warning px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-1">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd"/>
                  </svg>
                  Premium Required
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-3">
                  <h4 className="font-sans text-sm font-semibold text-jm-gray-700 uppercase tracking-wide">
                    What's Included
                  </h4>
                  <ul className="space-y-2">
                    {['Marital History', 'Number of Children', 'Willingness to Have Children', 'Marriage Timeline Expectations', 'Family Involvement Expectations'].map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm text-jm-gray-700">
                        <svg className="w-4 h-4 text-jm-success flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                        </svg>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-3">
                  <h4 className="font-sans text-sm font-semibold text-jm-gray-700 uppercase tracking-wide">
                    Purpose
                  </h4>
                  <p className="font-sans text-sm text-jm-gray-600 leading-relaxed">
                    Determines marriage readiness and long-term life alignment. This is where serious users separate from casual browsers.
                  </p>
                </div>

                <div className="space-y-3">
                  <h4 className="font-sans text-sm font-semibold text-jm-gray-700 uppercase tracking-wide">
                    Rules
                  </h4>
                  <ul className="space-y-2 font-sans text-sm text-jm-gray-600">
                    <li className="flex items-start gap-2">
                      <span className="text-jm-purple font-bold mt-0.5">*</span>
                      <span>Premium or VIP subscription required</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-jm-purple font-bold mt-0.5">*</span>
                      <span>Free users cannot complete or view</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-jm-purple font-bold mt-0.5">*</span>
                      <span>All consent actions logged</span>
                    </li>
                  </ul>
                </div>
              </div>
            </article>

            {/* Tier 4 & 5 Summary */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Tier 4 */}
              <article className="bg-white rounded-xl shadow-md border-2 border-jm-warning p-6 space-y-4">
                <div className="flex items-center gap-3">
                  <span className="bg-jm-warning text-white font-bold px-3 py-1 rounded-full text-sm">Tier 4</span>
                  <h3 className="font-serif text-xl font-semibold text-jm-gray-900">Health & Compatibility</h3>
                </div>
                <p className="font-sans text-sm text-jm-gray-600">
                  Marriage-level health transparency. Includes genotype, blood group, and health-related lifestyle factors.
                </p>
                <span className="inline-block bg-jm-warning/10 text-jm-warning px-3 py-1 rounded-lg text-xs font-medium">
                  Premium Required
                </span>
              </article>

              {/* Tier 5 */}
              <article className="bg-gradient-to-br from-jm-purple-deep to-jm-coral rounded-xl shadow-lg p-6 space-y-4">
                <div className="flex items-center gap-3">
                  <span className="bg-white/20 text-white font-bold px-3 py-1 rounded-full text-sm drop-shadow-md">Tier 5</span>
                  <h3 className="font-serif text-xl font-semibold text-white drop-shadow-lg">Verified Identity</h3>
                </div>
                <p className="font-sans text-sm text-white drop-shadow-md">
                  Government ID verification, live video check, and manual KYC review. VIP members only.
                </p>
                <span className="inline-block bg-white text-jm-purple-deep px-3 py-1 rounded-lg text-xs font-semibold">
                  VIP Only
                </span>
              </article>
            </div>
          </div>
        </div>
      </section>

      {/* EDT Explanation Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-screen-xl 2xl:max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl 2xl:max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-jm-gray-900 mb-4">
                Understanding EDT: Effective Disclosure Tier
              </h2>
              <p className="font-sans text-lg text-jm-gray-600">
                EDT is the backbone of JoyMatcher. It ensures reciprocal transparency and prevents exploitation.
              </p>
            </div>

            {/* Formula Card with Visual */}
            <div className="bg-gradient-to-br from-jm-purple-deep to-jm-coral rounded-xl p-8 mb-12">
              <h3 className="font-serif text-2xl font-semibold mb-6 text-white drop-shadow-lg text-center">The Formula</h3>

              {/* Visual Diagram */}
              <div className="bg-white rounded-lg p-6 mb-6">
                <img src="/images/illustrations/edt-diagram.svg" alt="EDT Calculation Diagram" className="w-full max-w-2xl mx-auto" />
              </div>

              <div className="bg-white/10 rounded-lg p-6 font-mono text-base backdrop-blur-sm">
                <code className="text-white">
                  EDT = Math.min(<br/>
                  &nbsp;&nbsp;yourCompletedTier,<br/>
                  &nbsp;&nbsp;theirCompletedTier,<br/>
                  &nbsp;&nbsp;yourSharedTier,<br/>
                  &nbsp;&nbsp;theirSharedTier<br/>
                  )
                </code>
              </div>
              <p className="font-sans text-sm text-white drop-shadow-md mt-4 text-center">
                Translation: You both see only the lowest tier among these four values.
              </p>
            </div>

            {/* Why EDT Matters */}
            <div className="bg-jm-gray-50 rounded-xl p-8">
              <h3 className="font-serif text-2xl font-semibold text-jm-gray-900 mb-4">
                Why EDT Matters
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-jm-success flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                  </svg>
                  <div className="flex-1">
                    <p className="font-sans text-base font-semibold text-jm-gray-900 mb-1">
                      Prevents Exploitation
                    </p>
                    <p className="font-sans text-sm text-jm-gray-600">
                      No one can view your sensitive data without disclosing theirs first. Fair exchange enforced automatically.
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-jm-success flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                  </svg>
                  <div className="flex-1">
                    <p className="font-sans text-base font-semibold text-jm-gray-900 mb-1">
                      Encourages Completion
                    </p>
                    <p className="font-sans text-sm text-jm-gray-600">
                      Want to see Tier 3? Complete Tier 3. Want deeper connections? Do the work. No shortcuts.
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-jm-success flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                  </svg>
                  <div className="flex-1">
                    <p className="font-sans text-base font-semibold text-jm-gray-900 mb-1">
                      Respects Boundaries
                    </p>
                    <p className="font-sans text-sm text-jm-gray-600">
                      You can revoke access anytime. EDT instantly adjusts, protecting both parties equally.
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 md:py-24 bg-jm-gray-50">
        <div className="max-w-5xl 2xl:max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-jm-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-4">
            <details className="bg-white rounded-lg shadow-sm p-6 group">
              <summary className="font-sans text-base font-semibold text-jm-gray-900 cursor-pointer list-none flex items-center justify-between">
                What happens if I don't complete all tiers?
                <svg className="w-5 h-5 text-jm-gray-600 group-open:rotate-180 transition-transform" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"/>
                </svg>
              </summary>
              <p className="font-sans text-sm text-jm-gray-600 mt-4 leading-relaxed">
                You can use JoyMatcher at any tier level. Your completed tier determines what you can see from others and what subscription level you're eligible for.
              </p>
            </details>

            <details className="bg-white rounded-lg shadow-sm p-6 group">
              <summary className="font-sans text-base font-semibold text-jm-gray-900 cursor-pointer list-none flex items-center justify-between">
                Can I skip tiers?
                <svg className="w-5 h-5 text-jm-gray-600 group-open:rotate-180 transition-transform" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"/>
                </svg>
              </summary>
              <p className="font-sans text-sm text-jm-gray-600 mt-4 leading-relaxed">
                No. Tiers must be completed sequentially. You must finish Tier 1 before Tier 2, Tier 2 before Tier 3, and so on. This ensures the foundation of trust is built properly.
              </p>
            </details>

            <details className="bg-white rounded-lg shadow-sm p-6 group">
              <summary className="font-sans text-base font-semibold text-jm-gray-900 cursor-pointer list-none flex items-center justify-between">
                Can I revoke access to my information?
                <svg className="w-5 h-5 text-jm-gray-600 group-open:rotate-180 transition-transform" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"/>
                </svg>
              </summary>
              <p className="font-sans text-sm text-jm-gray-600 mt-4 leading-relaxed">
                Yes. You can revoke access at any time. When you do, the EDT recalculates immediately, and both parties' access adjusts symmetrically. Your privacy is always in your control.
              </p>
            </details>

            <details className="bg-white rounded-lg shadow-sm p-6 group">
              <summary className="font-sans text-base font-semibold text-jm-gray-900 cursor-pointer list-none flex items-center justify-between">
                What's the difference between completing a tier and sharing a tier?
                <svg className="w-5 h-5 text-jm-gray-600 group-open:rotate-180 transition-transform" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"/>
                </svg>
              </summary>
              <p className="font-sans text-sm text-jm-gray-600 mt-4 leading-relaxed">
                Completing a tier means filling out all the information for that tier. Sharing a tier means granting someone else permission to view that tier's information about you. You can complete all 5 tiers but choose to share only Tier 2 with someone.
              </p>
            </details>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-jm-purple-deep to-jm-coral">
        <div className="max-w-5xl 2xl:max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          <h2 className="font-serif text-3xl md:text-5xl font-bold leading-tight text-white drop-shadow-lg">
            Start Your Journey Today
          </h2>
          <p className="font-sans text-lg md:text-xl text-white max-w-2xl mx-auto drop-shadow-md">
            Join JoyMatcher and experience trust-based matchmaking designed for marriage-minded professionals.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/signup" className="bg-white hover:bg-white/90 text-jm-purple-deep font-sans font-semibold text-lg px-10 py-4 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl text-center">
              Create Free Account
            </Link>
            <Link to="/pricing" className="border-2 border-white hover:bg-white/10 text-white font-sans font-semibold text-lg px-10 py-4 rounded-lg transition-all duration-200 text-center">
              View Pricing
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
