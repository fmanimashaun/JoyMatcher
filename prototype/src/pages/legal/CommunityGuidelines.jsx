export default function CommunityGuidelines() {
  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-jm-purple-deep via-jm-purple-deep to-jm-coral text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <h1 className="font-serif text-4xl md:text-5xl font-bold">
            Community Guidelines
          </h1>
          <p className="font-sans text-lg opacity-90">
            Building a respectful, trust-based matchmaking community
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
                Our Community Values
              </h2>
              <p className="font-sans text-jm-gray-700 leading-relaxed mb-4">
                JoyMatcher is a trust-based matchmaking platform for marriage-minded professionals. Our community is built on
                mutual respect, honesty, and genuine intention. These guidelines ensure a safe, supportive environment for everyone.
              </p>
              <p className="font-sans text-jm-gray-700 leading-relaxed">
                By using JoyMatcher, you agree to follow these guidelines. Violations may result in warnings, temporary suspensions,
                or permanent bans, depending on severity.
              </p>
            </div>

            {/* Be Authentic */}
            <div className="mb-12 bg-jm-gray-50 p-6 rounded-lg">
              <h2 className="font-serif text-2xl font-bold text-jm-gray-900 mb-4 flex items-center gap-3">
                <span className="w-10 h-10 bg-jm-success rounded-full flex items-center justify-center text-white text-lg">1</span>
                Be Authentic
              </h2>
              <p className="font-sans text-jm-gray-700 leading-relaxed mb-4">
                Honesty is the foundation of meaningful connections.
              </p>
              <ul className="list-disc pl-6 space-y-2 font-sans text-jm-gray-700">
                <li><strong>Use your real identity:</strong> Your name, photos, and information should accurately represent who you are</li>
                <li><strong>Recent photos only:</strong> Profile photos should be recent (within the last 2 years) and clearly show your face</li>
                <li><strong>No impersonation:</strong> Do not pretend to be someone else or use another person's photos</li>
                <li><strong>Accurate information:</strong> Be truthful about your education, occupation, marital status, and other profile details</li>
                <li><strong>Clear intentions:</strong> Be honest about your relationship goals and marriage timeline</li>
              </ul>
            </div>

            {/* Be Respectful */}
            <div className="mb-12 bg-jm-gray-50 p-6 rounded-lg">
              <h2 className="font-serif text-2xl font-bold text-jm-gray-900 mb-4 flex items-center gap-3">
                <span className="w-10 h-10 bg-jm-success rounded-full flex items-center justify-center text-white text-lg">2</span>
                Be Respectful
              </h2>
              <p className="font-sans text-jm-gray-700 leading-relaxed mb-4">
                Treat every member with the dignity and respect you expect in return.
              </p>
              <ul className="list-disc pl-6 space-y-2 font-sans text-jm-gray-700">
                <li><strong>Courteous communication:</strong> Use polite, respectful language in all messages</li>
                <li><strong>Accept rejection gracefully:</strong> Not everyone will be interested, and that's okay. Accept "no" without pressure</li>
                <li><strong>No harassment:</strong> Do not send repeated messages after being declined or ignored</li>
                <li><strong>Respect boundaries:</strong> Respect privacy settings and tier disclosure choices</li>
                <li><strong>No discrimination:</strong> Do not demean, mock, or discriminate against others based on ethnicity, tribe, religion, or physical appearance</li>
              </ul>
            </div>

            {/* Be Serious */}
            <div className="mb-12 bg-jm-gray-50 p-6 rounded-lg">
              <h2 className="font-serif text-2xl font-bold text-jm-gray-900 mb-4 flex items-center gap-3">
                <span className="w-10 h-10 bg-jm-success rounded-full flex items-center justify-center text-white text-lg">3</span>
                Be Serious About Marriage
              </h2>
              <p className="font-sans text-jm-gray-700 leading-relaxed mb-4">
                JoyMatcher is for those genuinely seeking marriage.
              </p>
              <ul className="list-disc pl-6 space-y-2 font-sans text-jm-gray-700">
                <li><strong>Marriage-minded only:</strong> Only join if you are genuinely seeking a spouse, not casual dating</li>
                <li><strong>Single status required:</strong> You must be single and legally free to marry (not married, engaged, or in a committed relationship)</li>
                <li><strong>Transparent timeline:</strong> Be honest about when you hope to get married</li>
                <li><strong>Genuine engagement:</strong> Actively participate in conversations with serious intent</li>
              </ul>
            </div>

            {/* Be Safe */}
            <div className="mb-12 bg-jm-gray-50 p-6 rounded-lg">
              <h2 className="font-serif text-2xl font-bold text-jm-gray-900 mb-4 flex items-center gap-3">
                <span className="w-10 h-10 bg-jm-success rounded-full flex items-center justify-center text-white text-lg">4</span>
                Be Safe
              </h2>
              <p className="font-sans text-jm-gray-700 leading-relaxed mb-4">
                Protect yourself and others.
              </p>
              <ul className="list-disc pl-6 space-y-2 font-sans text-jm-gray-700">
                <li><strong>Protect personal information:</strong> Don't share sensitive details (home address, financial information) until you've built trust</li>
                <li><strong>Meet safely:</strong> For first meetings, choose public places and inform someone you trust</li>
                <li><strong>Report suspicious activity:</strong> If something feels wrong, report it immediately</li>
                <li><strong>No financial requests:</strong> Never send money to someone you've only met online</li>
              </ul>
            </div>

            {/* Prohibited Content */}
            <div className="mb-12">
              <h2 className="font-serif text-2xl font-bold text-jm-gray-900 mb-4">
                Prohibited Content & Behavior
              </h2>
              <p className="font-sans text-jm-gray-700 leading-relaxed mb-4">
                The following are strictly prohibited on JoyMatcher:
              </p>

              <h3 className="font-serif text-xl font-semibold text-jm-gray-900 mt-6 mb-3">
                Profile Content
              </h3>
              <ul className="list-disc pl-6 space-y-2 font-sans text-jm-gray-700">
                <li>Nudity, sexually explicit images, or suggestive content</li>
                <li>Photos with children (for privacy and safety reasons)</li>
                <li>Photos obscuring your face (sunglasses, masks, heavy filters)</li>
                <li>Group photos where you cannot be clearly identified</li>
                <li>Contact information in public profile fields (phone, email, social handles)</li>
              </ul>

              <h3 className="font-serif text-xl font-semibold text-jm-gray-900 mt-6 mb-3">
                Messaging Behavior
              </h3>
              <ul className="list-disc pl-6 space-y-2 font-sans text-jm-gray-700">
                <li>Sexually explicit messages or solicitations</li>
                <li>Abusive, threatening, or harassing language</li>
                <li>Spam, promotions, or commercial solicitations</li>
                <li>Requests for money, gifts, or financial assistance</li>
                <li>Sharing another user's private information</li>
              </ul>

              <h3 className="font-serif text-xl font-semibold text-jm-gray-900 mt-6 mb-3">
                Fraudulent Activity
              </h3>
              <ul className="list-disc pl-6 space-y-2 font-sans text-jm-gray-700">
                <li>Creating fake profiles or catfishing</li>
                <li>Romance scams or financial fraud</li>
                <li>Multiple accounts by the same person</li>
                <li>Misrepresenting marital status (being married while using the platform)</li>
              </ul>

              <h3 className="font-serif text-xl font-semibold text-jm-gray-900 mt-6 mb-3">
                Hate & Discrimination
              </h3>
              <ul className="list-disc pl-6 space-y-2 font-sans text-jm-gray-700">
                <li>Hate speech targeting ethnicity, tribe, religion, nationality, or gender</li>
                <li>Discriminatory language or derogatory stereotypes</li>
                <li>Promotion of violence or illegal activities</li>
              </ul>
            </div>

            {/* Enforcement */}
            <div className="mb-12">
              <h2 className="font-serif text-2xl font-bold text-jm-gray-900 mb-4">
                Enforcement
              </h2>
              <p className="font-sans text-jm-gray-700 leading-relaxed mb-4">
                We take violations seriously. Depending on severity, we may:
              </p>
              <ul className="list-disc pl-6 space-y-2 font-sans text-jm-gray-700">
                <li><strong>Issue a warning:</strong> First-time minor violations</li>
                <li><strong>Temporarily suspend:</strong> Repeated violations or moderate offenses</li>
                <li><strong>Permanently ban:</strong> Serious violations (fraud, harassment, hate speech)</li>
                <li><strong>Report to authorities:</strong> Illegal activity may be reported to law enforcement</li>
              </ul>
            </div>

            {/* Reporting */}
            <div className="mb-12">
              <h2 className="font-serif text-2xl font-bold text-jm-gray-900 mb-4">
                How to Report Violations
              </h2>
              <p className="font-sans text-jm-gray-700 leading-relaxed mb-4">
                If you encounter behavior that violates these guidelines:
              </p>
              <ul className="list-disc pl-6 space-y-2 font-sans text-jm-gray-700">
                <li><strong>In-app reporting:</strong> Use the "Report" button on profiles or in conversations</li>
                <li><strong>Email:</strong> Contact safety@joymatcher.com with details</li>
                <li><strong>Screenshots:</strong> Include screenshots if possible</li>
              </ul>
              <p className="font-sans text-jm-gray-700 leading-relaxed mt-4">
                All reports are reviewed by our Trust & Safety team. Reports are confidential—the reported user will not know who reported them.
              </p>
            </div>

            {/* Conclusion */}
            <div className="mb-12 bg-jm-purple-deep/5 p-6 rounded-lg">
              <h2 className="font-serif text-2xl font-bold text-jm-gray-900 mb-4">
                Our Commitment to You
              </h2>
              <p className="font-sans text-jm-gray-700 leading-relaxed">
                JoyMatcher is built on trust. We're committed to maintaining a safe, respectful, and supportive community where
                marriage-minded professionals can connect authentically. By following these guidelines, you help us create the
                environment where genuine love and lasting marriages can flourish.
              </p>
              <p className="font-sans text-jm-gray-700 leading-relaxed mt-4">
                Thank you for being part of the JoyMatcher community.
              </p>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}
