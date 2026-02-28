import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate form submission
    setShowSuccess(true);
    setFormData({ name: '', email: '', subject: '', message: '' });
    setTimeout(() => setShowSuccess(false), 5000);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-jm-purple-deep to-jm-coral py-20">
        <div className="max-w-5xl 2xl:max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-white drop-shadow-lg">
            Get in Touch
          </h1>
          <p className="font-sans text-lg text-white drop-shadow-md">
            We're here to help. Reach out anytime.
          </p>
        </div>
      </section>

      {/* Contact Methods Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {/* Email Support */}
            <div className="bg-jm-gray-100 rounded-lg p-8 text-center space-y-4">
              <div className="w-16 h-16 bg-jm-coral/10 rounded-full flex items-center justify-center mx-auto">
                <svg className="w-8 h-8 text-jm-coral" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="font-sans text-xl font-semibold text-jm-gray-900">Email Support</h3>
              <p className="font-sans text-sm text-jm-gray-600">
                Get help via email
              </p>
              <a href="mailto:support@joymatcher.com" className="text-jm-coral hover:text-jm-purple font-semibold text-sm block">
                support@joymatcher.com
              </a>
              <p className="text-xs text-jm-gray-500">Response within 24 hours</p>
            </div>

            {/* VIP Inquiries */}
            <div className="bg-jm-gray-100 rounded-lg p-8 text-center space-y-4">
              <div className="w-16 h-16 bg-jm-coral/10 rounded-full flex items-center justify-center mx-auto">
                <svg className="w-8 h-8 text-jm-coral" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
              </div>
              <h3 className="font-sans text-xl font-semibold text-jm-gray-900">VIP Inquiries</h3>
              <p className="font-sans text-sm text-jm-gray-600">
                Concierge service questions
              </p>
              <a href="mailto:vip@joymatcher.com" className="text-jm-coral hover:text-jm-purple font-semibold text-sm block">
                vip@joymatcher.com
              </a>
              <p className="text-xs text-jm-gray-500">Priority response</p>
            </div>

            {/* Safety & Trust */}
            <div className="bg-jm-gray-100 rounded-lg p-8 text-center space-y-4">
              <div className="w-16 h-16 bg-jm-coral/10 rounded-full flex items-center justify-center mx-auto">
                <svg className="w-8 h-8 text-jm-coral" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="font-sans text-xl font-semibold text-jm-gray-900">Safety & Trust</h3>
              <p className="font-sans text-sm text-jm-gray-600">
                Report concerns immediately
              </p>
              <a href="mailto:safety@joymatcher.com" className="text-jm-coral hover:text-jm-purple font-semibold text-sm block">
                safety@joymatcher.com
              </a>
              <p className="text-xs text-jm-gray-500">24/7 monitoring</p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-lg shadow-sm p-8 md:p-12 border border-jm-gray-200">
              <h2 className="font-serif text-2xl font-bold text-jm-gray-900 mb-6">Send Us a Message</h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name */}
                <div>
                  <label htmlFor="name" className="block font-sans text-sm font-semibold text-jm-gray-700 mb-2">
                    Your Name <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-jm-gray-300 focus:ring-2 focus:ring-jm-coral focus:border-transparent font-sans text-sm"
                    placeholder="Adaeze Okafor"
                  />
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block font-sans text-sm font-semibold text-jm-gray-700 mb-2">
                    Email Address <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-jm-gray-300 focus:ring-2 focus:ring-jm-coral focus:border-transparent font-sans text-sm"
                    placeholder="adaeze@example.com"
                  />
                </div>

                {/* Subject */}
                <div>
                  <label htmlFor="subject" className="block font-sans text-sm font-semibold text-jm-gray-700 mb-2">
                    Subject <span className="text-red-600">*</span>
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-jm-gray-300 focus:ring-2 focus:ring-jm-coral focus:border-transparent font-sans text-sm"
                  >
                    <option value="">Select a topic...</option>
                    <option value="general">General Inquiry</option>
                    <option value="technical">Technical Issue</option>
                    <option value="billing">Billing Question</option>
                    <option value="vip">VIP Membership</option>
                    <option value="safety">Safety Concern</option>
                    <option value="feedback">Feedback</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="message" className="block font-sans text-sm font-semibold text-jm-gray-700 mb-2">
                    Message <span className="text-red-600">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    required
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-jm-gray-300 focus:ring-2 focus:ring-jm-coral focus:border-transparent font-sans text-sm resize-none"
                    placeholder="Tell us how we can help..."
                  />
                </div>

                {/* Submit Button */}
                <div>
                  <button
                    type="submit"
                    className="w-full bg-jm-coral hover:bg-jm-purple text-white font-sans font-semibold text-base px-8 py-4 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg"
                  >
                    Send Message
                  </button>
                </div>

                {/* Success Message */}
                {showSuccess && (
                  <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg">
                    <p className="font-sans text-sm">
                      Thank you! Your message has been sent. We'll respond within 24 hours.
                    </p>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Quick Links */}
      <section className="py-16 bg-jm-gray-100">
        <div className="max-w-5xl 2xl:max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-serif text-2xl font-bold text-jm-gray-900 mb-4">
            Looking for Quick Answers?
          </h2>
          <p className="font-sans text-jm-gray-600 mb-8">
            Check our FAQ page for common questions.
          </p>
          <Link
            to="/faq"
            className="inline-block bg-jm-purple hover:bg-jm-purple-deep text-white font-sans font-semibold px-8 py-3 rounded-lg transition-all duration-200"
          >
            View FAQ
          </Link>
        </div>
      </section>
    </>
  );
}
