import { Link } from 'react-router-dom';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-jm-gray-900 text-white/75">
      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-8 mb-12">
          {/* Brand Column */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <img src="/images/logo-transparent.svg" alt="JoyMatcher Logo" className="h-10 w-auto" />
              <span className="font-serif text-xl font-bold text-white">
                JoyMatcher
              </span>
            </div>
            <p className="font-sans text-sm text-white/75">
              Trust-based matchmaking for marriage-minded professionals seeking authentic connections.
            </p>
            {/* Social Media Links */}
            <div className="flex items-center gap-4 pt-2">
              <a
                href="#"
                className="text-white/75 hover:text-white transition-colors duration-200"
                aria-label="Facebook"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a
                href="#"
                className="text-white/75 hover:text-white transition-colors duration-200"
                aria-label="Twitter"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
              </a>
              <a
                href="#"
                className="text-white/75 hover:text-white transition-colors duration-200"
                aria-label="Instagram"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Platform Column */}
          <div className="space-y-4">
            <h3 className="font-sans text-sm font-semibold text-white uppercase tracking-wide">
              Platform
            </h3>
            <ul className="space-y-2">
              <li>
                <Link to="/how-it-works" className="font-sans text-sm text-white/75 hover:text-white transition-colors block">
                  How It Works
                </Link>
              </li>
              <li>
                <Link to="/pricing" className="font-sans text-sm text-white/75 hover:text-white transition-colors block">
                  Pricing
                </Link>
              </li>
              <li>
                <Link to="/vip" className="font-sans text-sm text-white/75 hover:text-white transition-colors block">
                  VIP Service
                </Link>
              </li>
              <li>
                <Link to="/safety" className="font-sans text-sm text-white/75 hover:text-white transition-colors block">
                  Safety & Trust
                </Link>
              </li>
              <li>
                <Link to="/success-stories" className="font-sans text-sm text-white/75 hover:text-white transition-colors block">
                  Success Stories
                </Link>
              </li>
              <li>
                <Link to="/faq" className="font-sans text-sm text-white/75 hover:text-white transition-colors block">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal Column */}
          <div className="space-y-4">
            <h3 className="font-sans text-sm font-semibold text-white uppercase tracking-wide">
              Legal
            </h3>
            <ul className="space-y-2">
              <li>
                <Link to="/legal/terms" className="font-sans text-sm text-white/75 hover:text-white transition-colors block">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/legal/privacy" className="font-sans text-sm text-white/75 hover:text-white transition-colors block">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/legal/community-guidelines" className="font-sans text-sm text-white/75 hover:text-white transition-colors block">
                  Community Guidelines
                </Link>
              </li>
              <li>
                <Link to="/legal/accessibility" className="font-sans text-sm text-white/75 hover:text-white transition-colors block">
                  Accessibility
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Column */}
          <div className="space-y-4">
            <h3 className="font-sans text-sm font-semibold text-white uppercase tracking-wide">
              Contact
            </h3>
            <ul className="space-y-2">
              <li>
                <Link to="/contact" className="font-sans text-sm text-white/75 hover:text-white transition-colors block">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/faq" className="font-sans text-sm text-white/75 hover:text-white transition-colors block">
                  FAQ
                </Link>
              </li>
              <li>
                <a href="mailto:support@joymatcher.com" className="font-sans text-sm text-white/75 hover:text-white transition-colors block">
                  support@joymatcher.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-jm-gray-700">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Copyright */}
            <p className="font-sans text-sm text-white/60">
              &copy; {currentYear} JoyMatcher. All rights reserved.
            </p>

            {/* Language Selector */}
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"/>
              </svg>
              <select
                className="bg-transparent text-sm text-white/75 border-none focus:outline-none focus:ring-2 focus:ring-jm-coral cursor-pointer"
                aria-label="Select language"
              >
                <option value="en" className="bg-jm-gray-800 text-white">English</option>
                <option value="fr" className="bg-jm-gray-800 text-white">Français</option>
                <option value="es" className="bg-jm-gray-800 text-white">Español</option>
                <option value="pt" className="bg-jm-gray-800 text-white">Português</option>
              </select>
            </div>
          </div>

          {/* Disclaimer */}
          <div className="mt-6 pt-6 border-t border-jm-gray-700">
            <p className="font-sans text-xs text-white/60 text-center max-w-4xl mx-auto leading-relaxed">
              JoyMatcher is a trust-based matchmaking platform designed for marriage-minded professionals.
              All health and relationship information is self-declared and not medically or legally verified.
              Users are responsible for conducting their own due diligence. JoyMatcher is not a marriage agency
              and does not guarantee outcomes. By using this platform, you agree to our Terms of Service and Privacy Policy.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
