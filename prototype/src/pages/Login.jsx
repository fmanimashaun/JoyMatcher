import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    // Clear error when user types
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormError(null);
    if (validateForm()) {
      // Simulate login - in real app would call API
      console.log('Login attempt:', formData);
      // For prototype, show error
      setFormError({
        title: 'Invalid Credentials',
        message: 'The email or password you entered is incorrect. Please try again.',
      });
    }
  };

  const handleForgotSubmit = (e) => {
    e.preventDefault();
    // Simulate password reset
    console.log('Password reset requested for:', resetEmail);
    setShowForgotModal(false);
    setResetEmail('');
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

      {/* Login Card */}
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg border border-jm-gray-200 px-8 py-10">
        {/* Header */}
        <header className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-jm-gray-900 mb-3">
            Sign In to JoyMatcher
          </h1>
          <p className="text-jm-gray-600">
            Welcome back! Sign in to continue your journey.
          </p>
        </header>

        {/* Login Form */}
        <form onSubmit={handleSubmit} noValidate>
          {/* Email Address */}
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-jm-gray-700 mb-2">
              Email Address
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
            {errors.email && (
              <p className="text-sm text-red-600 mt-1" role="alert">{errors.email}</p>
            )}
          </div>

          {/* Password */}
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-jm-gray-700 mb-2">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                autoComplete="current-password"
                required
                value={formData.password}
                onChange={handleChange}
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-jm-coral focus:border-transparent transition-all pr-12 ${
                  errors.password ? 'border-red-500' : 'border-jm-gray-300'
                }`}
                placeholder="Enter your password"
                aria-required="true"
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-jm-gray-600 hover:text-jm-gray-900 transition-colors"
                onClick={() => setShowPassword(!showPassword)}
                aria-label="Toggle password visibility"
              >
                {showPassword ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                )}
              </button>
            </div>
            {errors.password && (
              <p className="text-sm text-red-600 mt-1" role="alert">{errors.password}</p>
            )}
          </div>

          {/* Remember Me & Forgot Password */}
          <div className="flex items-center justify-between mb-6">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                id="rememberMe"
                name="rememberMe"
                checked={formData.rememberMe}
                onChange={handleChange}
                className="w-4 h-4 text-jm-coral border-jm-gray-300 rounded focus:ring-2 focus:ring-jm-coral"
              />
              <span className="text-sm text-jm-gray-700">Remember me</span>
            </label>

            <button
              type="button"
              className="text-sm text-jm-coral hover:underline font-medium"
              onClick={() => setShowForgotModal(true)}
            >
              Forgot password?
            </button>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-gradient-jm hover:bg-gradient-jm-hover text-white font-semibold px-6 py-3 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-jm-coral focus:ring-offset-2"
          >
            Sign In
          </button>

          {/* Form-level Error Display */}
          {formError && (
            <div className="mt-4 bg-red-50 border border-red-200 rounded-lg px-4 py-3" role="alert">
              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z" clipRule="evenodd" />
                </svg>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-red-900">{formError.title}</p>
                  <p className="text-sm text-red-700 mt-1">{formError.message}</p>
                </div>
              </div>
            </div>
          )}
        </form>

        {/* Alternative Actions */}
        <div className="mt-6 text-center">
          <p className="text-sm text-jm-gray-600">
            Don't have an account?{' '}
            <Link to="/signup" className="text-jm-coral hover:underline font-medium">
              Sign up
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

      {/* Forgot Password Modal */}
      {showForgotModal && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          role="dialog"
          aria-modal="true"
          aria-labelledby="forgotPasswordTitle"
        >
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 id="forgotPasswordTitle" className="text-2xl font-bold text-jm-gray-900">
                Reset Your Password
              </h2>
              <button
                type="button"
                className="text-jm-gray-600 hover:text-jm-gray-900"
                onClick={() => setShowForgotModal(false)}
                aria-label="Close modal"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <p className="text-jm-gray-700 mb-6">
              Enter your email address and we'll send you a link to reset your password.
            </p>

            <form onSubmit={handleForgotSubmit}>
              <div className="mb-4">
                <label htmlFor="reset-email" className="block text-sm font-medium text-jm-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="reset-email"
                  name="reset-email"
                  required
                  value={resetEmail}
                  onChange={(e) => setResetEmail(e.target.value)}
                  className="w-full px-4 py-3 border border-jm-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-jm-coral"
                  placeholder="you@example.com"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-jm hover:bg-gradient-jm-hover text-white font-semibold px-6 py-3 rounded-lg transition-all mb-3"
              >
                Send Reset Link
              </button>

              <button
                type="button"
                className="w-full text-jm-gray-700 hover:text-jm-gray-900 font-medium"
                onClick={() => setShowForgotModal(false)}
              >
                Back to Sign In
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
