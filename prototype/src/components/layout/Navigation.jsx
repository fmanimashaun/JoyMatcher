import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  const navLinkClass = (path) => {
    const baseClass = "font-sans text-sm font-medium transition-colors duration-200";
    return `${baseClass} ${
      isActive(path)
        ? "text-jm-purple-deep"
        : "text-jm-text-secondary hover:text-jm-purple-deep"
    }`;
  };

  return (
    <header className="bg-white border-b border-jm-border sticky top-0 z-40 shadow-jm-subtle">
      <nav className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16" aria-label="Main navigation">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-3 focus:outline-none focus:ring-2 focus:ring-jm-purple-deep rounded-md transition-transform duration-200 hover:scale-105"
            onClick={closeMobileMenu}
          >
            <img src="/images/logo-transparent.svg" alt="JoyMatcher Logo" className="h-10 w-auto" />
            <span className="font-serif text-xl font-bold text-jm-text-primary hidden sm:block">
              JoyMatcher
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <Link to="/how-it-works" className={navLinkClass('/how-it-works')}>
              How It Works
            </Link>
            <Link to="/pricing" className={navLinkClass('/pricing')}>
              Pricing
            </Link>
            <Link to="/vip" className={navLinkClass('/vip')}>
              VIP
            </Link>
            <Link to="/safety" className={navLinkClass('/safety')}>
              Safety
            </Link>
            <Link to="/success-stories" className={navLinkClass('/success-stories')}>
              Success Stories
            </Link>
            <Link to="/login" className={navLinkClass('/login')}>
              Log In
            </Link>
            <Link
              to="/signup"
              className="bg-gradient-jm hover:bg-gradient-jm-hover text-white font-sans font-semibold text-sm px-6 py-2 rounded-lg transition-all duration-200 shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-jm-coral focus:ring-offset-2 transform hover:scale-105"
            >
              Get Started
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={toggleMobileMenu}
            className="md:hidden p-2 rounded-md text-jm-gray-600 hover:text-jm-purple-deep hover:bg-jm-gray-100 focus:outline-none focus:ring-2 focus:ring-jm-purple-deep transition-colors duration-200"
            aria-label="Toggle menu"
            aria-expanded={isMobileMenuOpen}
          >
            {!isMobileMenuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-jm-gray-200 animate-slide-in">
            <div className="space-y-1">
              <Link
                to="/how-it-works"
                onClick={closeMobileMenu}
                className="block px-4 py-3 text-base text-jm-gray-700 hover:bg-jm-gray-50 rounded-md transition-colors"
              >
                How It Works
              </Link>
              <Link
                to="/pricing"
                onClick={closeMobileMenu}
                className="block px-4 py-3 text-base text-jm-gray-700 hover:bg-jm-gray-50 rounded-md transition-colors"
              >
                Pricing
              </Link>
              <Link
                to="/vip"
                onClick={closeMobileMenu}
                className="block px-4 py-3 text-base text-jm-gray-700 hover:bg-jm-gray-50 rounded-md transition-colors"
              >
                VIP
              </Link>
              <Link
                to="/safety"
                onClick={closeMobileMenu}
                className="block px-4 py-3 text-base text-jm-gray-700 hover:bg-jm-gray-50 rounded-md transition-colors"
              >
                Safety
              </Link>
              <Link
                to="/success-stories"
                onClick={closeMobileMenu}
                className="block px-4 py-3 text-base text-jm-gray-700 hover:bg-jm-gray-50 rounded-md transition-colors"
              >
                Success Stories
              </Link>
              <div className="border-t border-jm-gray-200 my-2"></div>
              <Link
                to="/login"
                onClick={closeMobileMenu}
                className="block px-4 py-3 text-base text-jm-gray-700 hover:bg-jm-gray-50 rounded-md transition-colors"
              >
                Log In
              </Link>
              <Link
                to="/signup"
                onClick={closeMobileMenu}
                className="block mx-4 px-4 py-3 text-center bg-gradient-jm text-white font-semibold rounded-lg transition-all hover:shadow-md"
              >
                Get Started
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
