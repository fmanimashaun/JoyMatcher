import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Signup() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    country: 'NG',
    tier: 'free',
    termsAgreement: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [passwordStrength, setPasswordStrength] = useState({ score: 0, text: '', color: '' });

  const pricing = {
    NG: { free: '₦0', premium: '₦18k', vip: '₦200k+' },
    INT: { free: '$0', premium: '$18', vip: '$500+' },
  };

  const isNigerian = formData.country === 'NG';
  const currentPricing = isNigerian ? pricing.NG : pricing.INT;

  const checkPasswordStrength = (password) => {
    let score = 0;
    if (password.length >= 8) score++;
    if (/[a-z]/.test(password)) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^a-zA-Z0-9]/.test(password)) score++;

    const strengths = [
      { text: 'Very Weak', color: 'bg-red-500' },
      { text: 'Weak', color: 'bg-orange-500' },
      { text: 'Fair', color: 'bg-yellow-500' },
      { text: 'Good', color: 'bg-lime-500' },
      { text: 'Strong', color: 'bg-green-500' },
    ];

    return {
      score,
      text: strengths[Math.min(score, 4)].text,
      color: strengths[Math.min(score, 4)].color,
    };
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;

    setFormData((prev) => ({
      ...prev,
      [name]: newValue,
    }));

    // Update password strength
    if (name === 'password') {
      setPasswordStrength(checkPasswordStrength(value));
    }

    // Clear error when user types
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    } else if (!/[A-Z]/.test(formData.password)) {
      newErrors.password = 'Password must contain at least one uppercase letter';
    } else if (!/[a-z]/.test(formData.password)) {
      newErrors.password = 'Password must contain at least one lowercase letter';
    } else if (!/[0-9]/.test(formData.password)) {
      newErrors.password = 'Password must contain at least one number';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (!formData.country) {
      newErrors.country = 'Please select your country';
    }

    if (!formData.termsAgreement) {
      newErrors.termsAgreement = 'You must agree to the Terms of Service and Privacy Policy';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Simulate signup - in real app would call API
      console.log('Signup attempt:', formData);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12 bg-jm-gray-50">
      {/* Back Button & Logo */}
      <div className="mb-8 text-center">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-jm-gray-600 hover:text-jm-gray-900 font-medium mb-4 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Home
        </Link>
        <div>
          <Link to="/" className="text-3xl font-bold bg-gradient-jm bg-clip-text text-transparent">
            JoyMatcher
          </Link>
        </div>
      </div>

      {/* Signup Card */}
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg border border-jm-gray-200 px-8 py-10">
        {/* Progress Indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-jm-gray-700">Step 1 of 3</span>
            <span className="text-sm text-jm-gray-600">Account Creation</span>
          </div>
          <div className="w-full bg-jm-gray-200 rounded-full h-2">
            <div className="bg-gradient-jm h-2 rounded-full transition-all duration-300" style={{ width: '33%' }}></div>
          </div>
        </div>

        {/* Header */}
        <header className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-jm-gray-900 mb-3">
            Create Your Account
          </h1>
          <p className="text-jm-gray-600">
            Join verified individuals seeking meaningful, marriage-oriented relationships.
          </p>
        </header>

        {/* Signup Form */}
        <form onSubmit={handleSubmit} noValidate>
          {/* Full Name */}
          <div className="mb-4">
            <label htmlFor="fullName" className="block text-sm font-medium text-jm-gray-700 mb-2">
              Full Name <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              required
              value={formData.fullName}
              onChange={handleChange}
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-jm-coral focus:border-transparent transition-all ${
                errors.fullName ? 'border-red-500' : 'border-jm-gray-300'
              }`}
              placeholder="Adebayo Johnson"
              aria-required="true"
            />
            <p className="text-sm text-jm-gray-600 mt-1">
              Use your real name. This builds trust with potential matches.
            </p>
            {errors.fullName && (
              <p className="text-sm text-red-600 mt-1" role="alert">{errors.fullName}</p>
            )}
          </div>

          {/* Email Address */}
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-jm-gray-700 mb-2">
              Email Address <span className="text-red-600">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              autoComplete="email"
              required
              value={formData.email}
              onChange={handleChange}
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-jm-coral focus:border-transparent transition-all ${
                errors.email ? 'border-red-500' : 'border-jm-gray-300'
              }`}
              placeholder="you@example.com"
              aria-required="true"
            />
            <p className="text-sm text-jm-gray-600 mt-1">
              We'll send you a verification link. Check your inbox.
            </p>
            {errors.email && (
              <p className="text-sm text-red-600 mt-1" role="alert">{errors.email}</p>
            )}
          </div>

          {/* Password */}
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-jm-gray-700 mb-2">
              Password <span className="text-red-600">*</span>
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                autoComplete="new-password"
                required
                value={formData.password}
                onChange={handleChange}
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-jm-coral focus:border-transparent transition-all pr-12 ${
                  errors.password ? 'border-red-500' : 'border-jm-gray-300'
                }`}
                placeholder="Create a strong password"
                aria-required="true"
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-jm-gray-600 hover:text-jm-gray-900"
                onClick={() => setShowPassword(!showPassword)}
                aria-label="Toggle password visibility"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </button>
            </div>
            {/* Password Strength Indicator */}
            {formData.password && (
              <div className="mt-2">
                <div className="flex items-center gap-2 mb-1">
                  <div className="flex-1 h-2 bg-jm-gray-200 rounded-full overflow-hidden">
                    <div
                      className={`h-full transition-all duration-300 ${passwordStrength.color}`}
                      style={{ width: `${(passwordStrength.score / 5) * 100}%` }}
                    />
                  </div>
                  <span className="text-xs font-medium text-jm-gray-600">{passwordStrength.text}</span>
                </div>
              </div>
            )}
            <p className="text-sm text-jm-gray-600 mt-1">
              At least 8 characters with 1 uppercase, 1 lowercase, and 1 number.
            </p>
            {errors.password && (
              <p className="text-sm text-red-600 mt-1" role="alert">{errors.password}</p>
            )}
          </div>

          {/* Confirm Password */}
          <div className="mb-4">
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-jm-gray-700 mb-2">
              Confirm Password <span className="text-red-600">*</span>
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              autoComplete="new-password"
              required
              value={formData.confirmPassword}
              onChange={handleChange}
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-jm-coral focus:border-transparent transition-all ${
                errors.confirmPassword ? 'border-red-500' : 'border-jm-gray-300'
              }`}
              placeholder="Confirm your password"
              aria-required="true"
            />
            {errors.confirmPassword && (
              <p className="text-sm text-red-600 mt-1" role="alert">{errors.confirmPassword}</p>
            )}
          </div>

          {/* Country */}
          <div className="mb-6">
            <label htmlFor="country" className="block text-sm font-medium text-jm-gray-700 mb-2">
              Country <span className="text-red-600">*</span>
            </label>
            <select
              id="country"
              name="country"
              required
              value={formData.country}
              onChange={handleChange}
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-jm-coral focus:border-transparent transition-all appearance-none bg-white ${
                errors.country ? 'border-red-500' : 'border-jm-gray-300'
              }`}
              style={{
                backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='%236B7280'%3e%3cpath fill-rule='evenodd' d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z' clip-rule='evenodd'/%3e%3c/svg%3e")`,
                backgroundPosition: 'right 0.75rem center',
                backgroundRepeat: 'no-repeat',
                backgroundSize: '1.25rem',
              }}
              aria-required="true"
            >
              <option value="">Select your country</option>
              <option value="NG">Nigeria</option>
              <option value="US">United States</option>
              <option value="GB">United Kingdom</option>
              <option value="CA">Canada</option>
              <option value="GH">Ghana</option>
              <option value="KE">Kenya</option>
              <option value="ZA">South Africa</option>
              <option value="OTHER">Other</option>
            </select>
            <p className="text-sm text-jm-gray-600 mt-1">
              Determines pricing currency and local features.
            </p>
            {errors.country && (
              <p className="text-sm text-red-600 mt-1" role="alert">{errors.country}</p>
            )}
          </div>

          {/* Subscription Tier Selection */}
          <fieldset className="mb-6">
            <legend className="text-sm font-semibold text-jm-gray-700 mb-3">Choose Your Membership</legend>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {/* Free Tier */}
              <label className="relative flex cursor-pointer">
                <input
                  type="radio"
                  name="tier"
                  value="free"
                  checked={formData.tier === 'free'}
                  onChange={handleChange}
                  className="sr-only peer"
                />
                <div className="flex-1 border-2 border-jm-gray-300 rounded-lg p-3 peer-checked:border-jm-coral peer-checked:bg-jm-coral/5 transition-all hover:border-jm-gray-400">
                  <p className="font-semibold text-jm-gray-900 text-sm mb-1">Free</p>
                  <p className="text-xs text-jm-gray-600 mb-2">Tier 2 access</p>
                  <p className="text-xl font-bold text-jm-gray-900">{currentPricing.free}</p>
                </div>
              </label>

              {/* Premium Tier */}
              <label className="relative flex cursor-pointer">
                <input
                  type="radio"
                  name="tier"
                  value="premium"
                  checked={formData.tier === 'premium'}
                  onChange={handleChange}
                  className="sr-only peer"
                />
                <div className="flex-1 border-2 border-jm-gray-300 rounded-lg p-3 peer-checked:border-jm-coral peer-checked:bg-jm-coral/5 transition-all hover:border-jm-gray-400 relative">
                  <span className="absolute -top-2 -right-2 bg-gradient-jm text-white text-xs font-semibold px-2 py-0.5 rounded-full">Popular</span>
                  <p className="font-semibold text-jm-gray-900 text-sm mb-1">Premium</p>
                  <p className="text-xs text-jm-gray-600 mb-2">Tier 4 access</p>
                  <p className="text-xl font-bold text-jm-gray-900">{currentPricing.premium}<span className="text-xs font-normal">/mo</span></p>
                </div>
              </label>

              {/* VIP Tier */}
              <label className="relative flex cursor-pointer">
                <input
                  type="radio"
                  name="tier"
                  value="vip"
                  checked={formData.tier === 'vip'}
                  onChange={handleChange}
                  className="sr-only peer"
                />
                <div className="flex-1 border-2 border-jm-gray-300 rounded-lg p-3 peer-checked:border-jm-coral peer-checked:bg-jm-coral/5 transition-all hover:border-jm-gray-400">
                  <p className="font-semibold text-jm-gray-900 text-sm mb-1">VIP</p>
                  <p className="text-xs text-jm-gray-600 mb-2">Tier 5 access</p>
                  <p className="text-xl font-bold text-jm-gray-900">{currentPricing.vip}<span className="text-xs font-normal">/mo</span></p>
                </div>
              </label>
            </div>
            <p className="text-sm text-jm-gray-600 mt-2">
              <Link to="/pricing" target="_blank" className="text-jm-coral hover:underline">
                View full pricing details
              </Link>
            </p>
          </fieldset>

          {/* Terms Agreement */}
          <div className="mb-6">
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                id="termsAgreement"
                name="termsAgreement"
                required
                checked={formData.termsAgreement}
                onChange={handleChange}
                className="mt-1 w-4 h-4 text-jm-coral border-jm-gray-300 rounded focus:ring-2 focus:ring-jm-coral"
                aria-required="true"
              />
              <span className="text-sm text-jm-gray-700">
                I agree to the{' '}
                <a href="/terms" target="_blank" className="text-jm-coral hover:underline">
                  Terms of Service
                </a>{' '}
                and{' '}
                <a href="/privacy" target="_blank" className="text-jm-coral hover:underline">
                  Privacy Policy
                </a>
                <span className="text-red-600"> *</span>
              </span>
            </label>
            {errors.termsAgreement && (
              <p className="text-sm text-red-600 mt-1" role="alert">{errors.termsAgreement}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-gradient-jm hover:bg-gradient-jm-hover text-white font-semibold px-6 py-3 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-jm-coral focus:ring-offset-2"
          >
            Create Account
          </button>
        </form>

        {/* Alternative Actions */}
        <div className="mt-6 text-center">
          <p className="text-sm text-jm-gray-600">
            Already have an account?{' '}
            <Link to="/login" className="text-jm-coral hover:underline font-medium">
              Sign in
            </Link>
          </p>
        </div>
      </div>

      {/* Footer Links */}
      <div className="mt-8 text-center">
        <p className="text-sm text-jm-gray-600">
          Questions?{' '}
          <Link to="/contact" className="text-jm-coral hover:underline">
            Contact support
          </Link>
        </p>
      </div>
    </div>
  );
}
