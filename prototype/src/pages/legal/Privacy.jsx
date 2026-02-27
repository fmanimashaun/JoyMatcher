export default function Privacy() {
  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-jm-purple-deep via-jm-purple-deep to-jm-coral text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <h1 className="font-serif text-4xl md:text-5xl font-bold">
            Privacy Policy
          </h1>
          <p className="font-sans text-lg opacity-90">
            Last Updated: February 27, 2026
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none">

            {/* Introduction */}
            <div className="mb-12">
              <h2 className="font-serif text-2xl font-bold text-jm-gray-900 mb-4">
                1. Introduction
              </h2>
              <p className="font-sans text-jm-gray-700 leading-relaxed mb-4">
                JoyMatcher ("we", "us", "our") is committed to protecting your privacy. This Privacy Policy explains how we collect,
                use, disclose, and safeguard your information when you use our matchmaking platform.
              </p>
              <p className="font-sans text-jm-gray-700 leading-relaxed">
                We comply with the Nigeria Data Protection Regulation (NDPR) and the General Data Protection Regulation (GDPR) for users in the European Union.
              </p>
            </div>

            {/* Information We Collect */}
            <div className="mb-12">
              <h2 className="font-serif text-2xl font-bold text-jm-gray-900 mb-4">
                2. Information We Collect
              </h2>

              <h3 className="font-serif text-xl font-semibold text-jm-gray-900 mt-6 mb-3">
                2.1 Information You Provide
              </h3>
              <p className="font-sans text-jm-gray-700 leading-relaxed mb-4">
                Through our tier system, you may provide:
              </p>
              <ul className="list-disc pl-6 space-y-2 font-sans text-jm-gray-700">
                <li><strong>Tier 1 (Identity & Intent):</strong> Name, age, gender, location, faith, relationship intent, photos</li>
                <li><strong>Tier 2 (Lifestyle):</strong> Education, occupation, income range, lifestyle preferences</li>
                <li><strong>Tier 3 (Relationship/Family):</strong> Family background, relationship history, marriage timeline</li>
                <li><strong>Tier 4 (Health/Compatibility):</strong> Health information including genotype, allergies, lifestyle habits</li>
                <li><strong>Tier 5 (KYC/Verification):</strong> Government ID, proof of address, video verification</li>
              </ul>

              <h3 className="font-serif text-xl font-semibold text-jm-gray-900 mt-6 mb-3">
                2.2 Automatically Collected Information
              </h3>
              <ul className="list-disc pl-6 space-y-2 font-sans text-jm-gray-700">
                <li>Device information (type, operating system, browser)</li>
                <li>IP address and approximate location</li>
                <li>Usage data (pages visited, time spent, features used)</li>
                <li>Cookies and similar tracking technologies</li>
              </ul>

              <h3 className="font-serif text-xl font-semibold text-jm-gray-900 mt-6 mb-3">
                2.3 Information from Third Parties
              </h3>
              <ul className="list-disc pl-6 space-y-2 font-sans text-jm-gray-700">
                <li>Payment processors (transaction confirmation, not full card details)</li>
                <li>Identity verification services (for Tier 5 KYC)</li>
                <li>Social login providers (if you sign in with Google, Apple, etc.)</li>
              </ul>
            </div>

            {/* How We Use Your Information */}
            <div className="mb-12">
              <h2 className="font-serif text-2xl font-bold text-jm-gray-900 mb-4">
                3. How We Use Your Information
              </h2>
              <p className="font-sans text-jm-gray-700 leading-relaxed mb-4">
                We use your information to:
              </p>
              <ul className="list-disc pl-6 space-y-2 font-sans text-jm-gray-700">
                <li>Provide and improve our matchmaking services</li>
                <li>Display your profile to other users based on tier permissions</li>
                <li>Process your subscription payments</li>
                <li>Verify your identity (for Tier 5 users)</li>
                <li>Communicate with you about your account, matches, and service updates</li>
                <li>Enforce our Terms of Service and Community Guidelines</li>
                <li>Protect against fraud, abuse, and illegal activity</li>
                <li>Analyze platform usage to improve user experience</li>
              </ul>
            </div>

            {/* The Tier System & Privacy */}
            <div className="mb-12">
              <h2 className="font-serif text-2xl font-bold text-jm-gray-900 mb-4">
                4. The Tier System & Privacy
              </h2>
              <p className="font-sans text-jm-gray-700 leading-relaxed mb-4">
                Our unique tier system gives you control over your privacy:
              </p>
              <ul className="list-disc pl-6 space-y-2 font-sans text-jm-gray-700">
                <li><strong>Reciprocal Disclosure:</strong> Other users can only see your information at tiers they have also completed</li>
                <li><strong>Selective Sharing:</strong> You can choose to share specific tier information with specific users</li>
                <li><strong>Revocation:</strong> You can revoke tier access at any time (this will also revoke your access to their information)</li>
                <li><strong>VIP Privacy:</strong> VIP profiles are hidden from general browsing and only visible through matchmaker introductions</li>
              </ul>
            </div>

            {/* Information Sharing */}
            <div className="mb-12">
              <h2 className="font-serif text-2xl font-bold text-jm-gray-900 mb-4">
                5. Information Sharing
              </h2>
              <p className="font-sans text-jm-gray-700 leading-relaxed mb-4">
                We share your information only in the following circumstances:
              </p>
              <ul className="list-disc pl-6 space-y-2 font-sans text-jm-gray-700">
                <li><strong>With Other Users:</strong> Based on tier permissions and your sharing preferences</li>
                <li><strong>Service Providers:</strong> Payment processors, hosting providers, verification services (bound by confidentiality agreements)</li>
                <li><strong>VIP Matchmakers:</strong> If you are a VIP member, your profile is shared with assigned matchmakers</li>
                <li><strong>Legal Requirements:</strong> When required by law, court order, or to protect our legal rights</li>
                <li><strong>Business Transfers:</strong> In connection with a merger, acquisition, or sale of assets</li>
              </ul>
              <p className="font-sans text-jm-gray-700 leading-relaxed mt-4">
                We do <strong>not</strong> sell your personal information to third parties.
              </p>
            </div>

            {/* Data Retention */}
            <div className="mb-12">
              <h2 className="font-serif text-2xl font-bold text-jm-gray-900 mb-4">
                6. Data Retention
              </h2>
              <p className="font-sans text-jm-gray-700 leading-relaxed mb-4">
                We retain your data as follows:
              </p>
              <ul className="list-disc pl-6 space-y-2 font-sans text-jm-gray-700">
                <li><strong>Active Accounts:</strong> Data retained while your account is active</li>
                <li><strong>Deleted Accounts:</strong> Profile removed immediately; backup data deleted within 90 days</li>
                <li><strong>Legal Requirements:</strong> Some data may be retained longer if required by law</li>
                <li><strong>Success Stories:</strong> Testimonials retained with consent until withdrawn</li>
              </ul>
            </div>

            {/* Your Rights */}
            <div className="mb-12">
              <h2 className="font-serif text-2xl font-bold text-jm-gray-900 mb-4">
                7. Your Rights
              </h2>
              <p className="font-sans text-jm-gray-700 leading-relaxed mb-4">
                Under NDPR and GDPR, you have the right to:
              </p>
              <ul className="list-disc pl-6 space-y-2 font-sans text-jm-gray-700">
                <li><strong>Access:</strong> Request a copy of your personal data</li>
                <li><strong>Rectification:</strong> Correct inaccurate or incomplete data</li>
                <li><strong>Erasure:</strong> Request deletion of your data ("right to be forgotten")</li>
                <li><strong>Portability:</strong> Receive your data in a machine-readable format</li>
                <li><strong>Restriction:</strong> Limit how we process your data</li>
                <li><strong>Objection:</strong> Object to certain processing activities</li>
                <li><strong>Withdraw Consent:</strong> Withdraw consent for processing based on consent</li>
              </ul>
              <p className="font-sans text-jm-gray-700 leading-relaxed mt-4">
                To exercise these rights, contact us at privacy@joymatcher.com.
              </p>
            </div>

            {/* Data Security */}
            <div className="mb-12">
              <h2 className="font-serif text-2xl font-bold text-jm-gray-900 mb-4">
                8. Data Security
              </h2>
              <p className="font-sans text-jm-gray-700 leading-relaxed mb-4">
                We implement industry-standard security measures:
              </p>
              <ul className="list-disc pl-6 space-y-2 font-sans text-jm-gray-700">
                <li>Encryption of data in transit (TLS/SSL) and at rest</li>
                <li>Secure authentication and access controls</li>
                <li>Regular security audits and vulnerability assessments</li>
                <li>Employee training on data protection</li>
                <li>Incident response procedures</li>
              </ul>
            </div>

            {/* International Transfers */}
            <div className="mb-12">
              <h2 className="font-serif text-2xl font-bold text-jm-gray-900 mb-4">
                9. International Data Transfers
              </h2>
              <p className="font-sans text-jm-gray-700 leading-relaxed">
                Your data may be transferred to and processed in countries outside Nigeria or the EU. We ensure appropriate safeguards
                are in place, including Standard Contractual Clauses approved by relevant authorities.
              </p>
            </div>

            {/* Cookies */}
            <div className="mb-12">
              <h2 className="font-serif text-2xl font-bold text-jm-gray-900 mb-4">
                10. Cookies & Tracking Technologies
              </h2>
              <p className="font-sans text-jm-gray-700 leading-relaxed mb-4">
                We use cookies and similar technologies for:
              </p>
              <ul className="list-disc pl-6 space-y-2 font-sans text-jm-gray-700">
                <li><strong>Essential:</strong> Login, security, basic functionality</li>
                <li><strong>Performance:</strong> Analytics and platform improvement</li>
                <li><strong>Functional:</strong> Preferences and personalization</li>
              </ul>
              <p className="font-sans text-jm-gray-700 leading-relaxed mt-4">
                You can manage cookie preferences through your browser settings.
              </p>
            </div>

            {/* Children's Privacy */}
            <div className="mb-12">
              <h2 className="font-serif text-2xl font-bold text-jm-gray-900 mb-4">
                11. Children's Privacy
              </h2>
              <p className="font-sans text-jm-gray-700 leading-relaxed">
                JoyMatcher is not intended for users under 21 years of age. We do not knowingly collect personal information from anyone under 21.
                If we learn we have collected such information, we will delete it immediately.
              </p>
            </div>

            {/* Changes to Policy */}
            <div className="mb-12">
              <h2 className="font-serif text-2xl font-bold text-jm-gray-900 mb-4">
                12. Changes to This Policy
              </h2>
              <p className="font-sans text-jm-gray-700 leading-relaxed">
                We may update this Privacy Policy from time to time. We will notify you of material changes by email or through the platform.
                The "Last Updated" date at the top of this policy indicates when it was last revised.
              </p>
            </div>

            {/* Contact */}
            <div className="mb-12">
              <h2 className="font-serif text-2xl font-bold text-jm-gray-900 mb-4">
                13. Contact Us
              </h2>
              <p className="font-sans text-jm-gray-700 leading-relaxed">
                For privacy-related inquiries:
              </p>
              <ul className="list-none mt-4 font-sans text-jm-gray-700">
                <li>Data Protection Officer: privacy@joymatcher.com</li>
                <li>General Inquiries: support@joymatcher.com</li>
                <li>Address: Lagos, Nigeria</li>
              </ul>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}
