export default function Accessibility() {
  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-jm-purple-deep via-jm-purple-deep to-jm-coral text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <h1 className="font-serif text-4xl md:text-5xl font-bold">
            Accessibility Statement
          </h1>
          <p className="font-sans text-lg opacity-90">
            Our commitment to inclusive design
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
                Our Commitment
              </h2>
              <p className="font-sans text-jm-gray-700 leading-relaxed mb-4">
                JoyMatcher is committed to ensuring digital accessibility for people of all abilities. We are continually improving
                the user experience for everyone and applying relevant accessibility standards.
              </p>
              <p className="font-sans text-jm-gray-700 leading-relaxed">
                We believe that everyone deserves the opportunity to find meaningful connections and love, regardless of ability.
                Our goal is to make JoyMatcher usable by the widest possible audience.
              </p>
            </div>

            {/* Standards */}
            <div className="mb-12">
              <h2 className="font-serif text-2xl font-bold text-jm-gray-900 mb-4">
                Accessibility Standards
              </h2>
              <p className="font-sans text-jm-gray-700 leading-relaxed mb-4">
                We aim to conform to the Web Content Accessibility Guidelines (WCAG) 2.1 Level AA standards. These guidelines explain
                how to make web content more accessible to people with a wide range of disabilities, including:
              </p>
              <ul className="list-disc pl-6 space-y-2 font-sans text-jm-gray-700">
                <li>Visual impairments</li>
                <li>Hearing impairments</li>
                <li>Motor disabilities</li>
                <li>Cognitive and learning disabilities</li>
              </ul>
            </div>

            {/* Features */}
            <div className="mb-12">
              <h2 className="font-serif text-2xl font-bold text-jm-gray-900 mb-4">
                Accessibility Features
              </h2>
              <p className="font-sans text-jm-gray-700 leading-relaxed mb-4">
                JoyMatcher includes the following accessibility features:
              </p>

              <h3 className="font-serif text-xl font-semibold text-jm-gray-900 mt-6 mb-3">
                Visual Accessibility
              </h3>
              <ul className="list-disc pl-6 space-y-2 font-sans text-jm-gray-700">
                <li><strong>High contrast mode support:</strong> Respects system-level high contrast settings</li>
                <li><strong>Scalable text:</strong> Text can be resized up to 200% without loss of functionality</li>
                <li><strong>Color independence:</strong> Information is not conveyed by color alone</li>
                <li><strong>Focus indicators:</strong> Visible focus states for keyboard navigation</li>
                <li><strong>Alt text:</strong> Descriptive alternative text for images</li>
              </ul>

              <h3 className="font-serif text-xl font-semibold text-jm-gray-900 mt-6 mb-3">
                Motor Accessibility
              </h3>
              <ul className="list-disc pl-6 space-y-2 font-sans text-jm-gray-700">
                <li><strong>Keyboard navigation:</strong> All functionality accessible via keyboard</li>
                <li><strong>Skip links:</strong> Skip to main content links for easier navigation</li>
                <li><strong>Large click targets:</strong> Interactive elements sized for easy clicking/tapping</li>
                <li><strong>No time limits:</strong> No arbitrary time limits on interactions</li>
              </ul>

              <h3 className="font-serif text-xl font-semibold text-jm-gray-900 mt-6 mb-3">
                Screen Reader Support
              </h3>
              <ul className="list-disc pl-6 space-y-2 font-sans text-jm-gray-700">
                <li><strong>Semantic HTML:</strong> Proper use of headings, lists, and landmarks</li>
                <li><strong>ARIA labels:</strong> Descriptive labels for interactive elements</li>
                <li><strong>Form labels:</strong> All form inputs have associated labels</li>
                <li><strong>Error identification:</strong> Form errors clearly identified and described</li>
              </ul>

              <h3 className="font-serif text-xl font-semibold text-jm-gray-900 mt-6 mb-3">
                Motion & Animation
              </h3>
              <ul className="list-disc pl-6 space-y-2 font-sans text-jm-gray-700">
                <li><strong>Reduced motion support:</strong> Respects prefers-reduced-motion setting</li>
                <li><strong>No auto-playing media:</strong> Videos and audio require user interaction</li>
                <li><strong>Pause controls:</strong> Animated content can be paused</li>
              </ul>
            </div>

            {/* Assistive Technologies */}
            <div className="mb-12">
              <h2 className="font-serif text-2xl font-bold text-jm-gray-900 mb-4">
                Assistive Technology Compatibility
              </h2>
              <p className="font-sans text-jm-gray-700 leading-relaxed mb-4">
                JoyMatcher is designed to be compatible with the following assistive technologies:
              </p>
              <ul className="list-disc pl-6 space-y-2 font-sans text-jm-gray-700">
                <li>Screen readers (NVDA, JAWS, VoiceOver, TalkBack)</li>
                <li>Screen magnification software</li>
                <li>Voice recognition software (Dragon NaturallySpeaking)</li>
                <li>Keyboard-only navigation</li>
                <li>Switch devices</li>
              </ul>
            </div>

            {/* Known Limitations */}
            <div className="mb-12">
              <h2 className="font-serif text-2xl font-bold text-jm-gray-900 mb-4">
                Known Limitations
              </h2>
              <p className="font-sans text-jm-gray-700 leading-relaxed mb-4">
                We are actively working to improve accessibility. Current known limitations include:
              </p>
              <ul className="list-disc pl-6 space-y-2 font-sans text-jm-gray-700">
                <li><strong>User-uploaded images:</strong> Alt text for user profile photos may be limited</li>
                <li><strong>Video content:</strong> Some promotional videos may not have full captions</li>
                <li><strong>Third-party content:</strong> Some embedded third-party tools may have accessibility limitations</li>
              </ul>
              <p className="font-sans text-jm-gray-700 leading-relaxed mt-4">
                We are committed to addressing these limitations and continually improving our accessibility.
              </p>
            </div>

            {/* Testing */}
            <div className="mb-12">
              <h2 className="font-serif text-2xl font-bold text-jm-gray-900 mb-4">
                Testing & Evaluation
              </h2>
              <p className="font-sans text-jm-gray-700 leading-relaxed mb-4">
                We regularly test JoyMatcher for accessibility using:
              </p>
              <ul className="list-disc pl-6 space-y-2 font-sans text-jm-gray-700">
                <li>Automated accessibility testing tools (axe, WAVE)</li>
                <li>Manual testing with screen readers</li>
                <li>Keyboard-only navigation testing</li>
                <li>User testing with people who have disabilities</li>
              </ul>
            </div>

            {/* Feedback */}
            <div className="mb-12 bg-jm-gray-50 p-6 rounded-lg">
              <h2 className="font-serif text-2xl font-bold text-jm-gray-900 mb-4">
                Feedback & Contact
              </h2>
              <p className="font-sans text-jm-gray-700 leading-relaxed mb-4">
                We welcome your feedback on the accessibility of JoyMatcher. If you encounter accessibility barriers or have
                suggestions for improvement, please contact us:
              </p>
              <ul className="list-none space-y-2 font-sans text-jm-gray-700">
                <li><strong>Email:</strong> accessibility@joymatcher.com</li>
                <li><strong>Phone:</strong> +234 800 JOYMATCHER (toll-free)</li>
                <li><strong>Response time:</strong> We aim to respond to accessibility feedback within 5 business days</li>
              </ul>
              <p className="font-sans text-jm-gray-700 leading-relaxed mt-4">
                When contacting us, please include:
              </p>
              <ul className="list-disc pl-6 space-y-2 font-sans text-jm-gray-700">
                <li>The page or feature where you encountered the issue</li>
                <li>The assistive technology you were using (if any)</li>
                <li>A description of the barrier you experienced</li>
              </ul>
            </div>

            {/* Alternative Access */}
            <div className="mb-12">
              <h2 className="font-serif text-2xl font-bold text-jm-gray-900 mb-4">
                Alternative Access
              </h2>
              <p className="font-sans text-jm-gray-700 leading-relaxed">
                If you experience difficulty accessing any content or features on JoyMatcher due to a disability, please contact
                our support team. We will work with you to provide the information or service you need through an alternative
                communication method that is accessible to you.
              </p>
            </div>

            {/* Continuous Improvement */}
            <div className="mb-12">
              <h2 className="font-serif text-2xl font-bold text-jm-gray-900 mb-4">
                Continuous Improvement
              </h2>
              <p className="font-sans text-jm-gray-700 leading-relaxed mb-4">
                Accessibility is an ongoing effort. We are committed to:
              </p>
              <ul className="list-disc pl-6 space-y-2 font-sans text-jm-gray-700">
                <li>Training our team on accessibility best practices</li>
                <li>Including accessibility in our design and development processes</li>
                <li>Regular audits and updates to improve accessibility</li>
                <li>Engaging with the disability community to understand their needs</li>
              </ul>
            </div>

            {/* Last Updated */}
            <div className="mb-12 text-center text-jm-gray-500">
              <p className="font-sans text-sm">
                This Accessibility Statement was last updated on February 27, 2026.
              </p>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}
