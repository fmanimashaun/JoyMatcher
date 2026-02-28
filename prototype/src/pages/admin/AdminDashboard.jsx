import { Link } from 'react-router-dom';

export default function AdminDashboard() {
  // Simulated admin stats
  const stats = {
    totalUsers: 2547,
    activeUsers: 1823,
    premiumUsers: 456,
    vipUsers: 34,
    pendingVerifications: 23,
    reportedProfiles: 7,
    successfulMatches: 187,
    revenue: {
      monthly: '₦8,245,000',
      quarterly: '₦23,180,000',
      annual: '₦94,560,000',
    },
  };

  const recentActivity = [
    { type: 'signup', user: 'Chidinma E.', action: 'New user registered', time: '5 min ago' },
    { type: 'upgrade', user: 'Emeka O.', action: 'Upgraded to Premium', time: '12 min ago' },
    { type: 'verification', user: 'Amara K.', action: 'Submitted Tier 5 verification', time: '1 hour ago' },
    { type: 'match', user: 'Folake & Tunde', action: 'Mutual interest accepted', time: '2 hours ago' },
    { type: 'report', user: 'Anonymous', action: 'Reported inappropriate content', time: '3 hours ago' },
  ];

  const tierDistribution = [
    { tier: 'Tier 1', count: 2547, percentage: 100 },
    { tier: 'Tier 2', count: 1923, percentage: 75 },
    { tier: 'Tier 3', count: 1245, percentage: 49 },
    { tier: 'Tier 4', count: 687, percentage: 27 },
    { tier: 'Tier 5', count: 234, percentage: 9 },
  ];

  return (
    <div className="min-h-screen bg-jm-gray-50">
      {/* Admin Header */}
      <header className="bg-jm-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <img src="/images/logo-transparent.svg" alt="JoyMatcher" className="w-8 h-8" />
              <div>
                <h1 className="font-serif text-xl font-bold">JoyMatcher Admin</h1>
                <p className="text-sm text-gray-400">Platform Management Console</p>
              </div>
            </div>

            <nav className="hidden md:flex items-center gap-6">
              <Link to="/admin/dashboard" className="font-sans text-white font-semibold">
                Dashboard
              </Link>
              <Link to="/admin/users" className="font-sans text-gray-300 hover:text-white transition-colors">
                Users
              </Link>
              <Link to="/admin/verifications" className="font-sans text-gray-300 hover:text-white transition-colors">
                Verifications
              </Link>
              <Link to="/admin/reports" className="font-sans text-gray-300 hover:text-white transition-colors">
                Reports
              </Link>
              <Link to="/admin/analytics" className="font-sans text-gray-300 hover:text-white transition-colors">
                Analytics
              </Link>
            </nav>

            <div className="flex items-center gap-4">
              <Link to="/" className="text-sm text-gray-300 hover:text-white">
                View Site
              </Link>
              <div className="w-10 h-10 bg-jm-coral rounded-full flex items-center justify-center font-semibold">
                A
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Overview Stats */}
        <div className="mb-8">
          <h2 className="font-serif text-2xl font-bold text-jm-gray-900 mb-6">Platform Overview</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Total Users */}
            <div className="bg-white rounded-xl border border-jm-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z"/>
                  </svg>
                </div>
                <span className="text-xs text-green-600 font-semibold">↑ 12%</span>
              </div>
              <h3 className="font-sans text-sm text-jm-gray-600 mb-1">Total Users</h3>
              <p className="font-serif text-3xl font-bold text-jm-gray-900">{stats.totalUsers.toLocaleString()}</p>
            </div>

            {/* Active Users */}
            <div className="bg-white rounded-xl border border-jm-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                  </svg>
                </div>
                <span className="text-xs text-green-600 font-semibold">↑ 8%</span>
              </div>
              <h3 className="font-sans text-sm text-jm-gray-600 mb-1">Active Users (30d)</h3>
              <p className="font-serif text-3xl font-bold text-jm-gray-900">{stats.activeUsers.toLocaleString()}</p>
            </div>

            {/* Premium Users */}
            <div className="bg-white rounded-xl border border-jm-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                  </svg>
                </div>
                <span className="text-xs text-green-600 font-semibold">↑ 15%</span>
              </div>
              <h3 className="font-sans text-sm text-jm-gray-600 mb-1">Premium Users</h3>
              <p className="font-serif text-3xl font-bold text-jm-gray-900">{stats.premiumUsers}</p>
            </div>

            {/* VIP Users */}
            <div className="bg-white rounded-xl border border-jm-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zM12 2a1 1 0 01.967.744L14.146 7.2 17.5 9.134a1 1 0 010 1.732l-3.354 1.935-1.18 4.455a1 1 0 01-1.933 0L9.854 12.8 6.5 10.866a1 1 0 010-1.732l3.354-1.935 1.18-4.455A1 1 0 0112 2z" clipRule="evenodd"/>
                  </svg>
                </div>
                <span className="text-xs text-green-600 font-semibold">↑ 22%</span>
              </div>
              <h3 className="font-sans text-sm text-jm-gray-600 mb-1">VIP Members</h3>
              <p className="font-serif text-3xl font-bold text-jm-gray-900">{stats.vipUsers}</p>
            </div>
          </div>
        </div>

        {/* Revenue & Metrics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Revenue Card */}
          <div className="bg-white rounded-xl border border-jm-gray-200 p-6">
            <h3 className="font-serif text-xl font-bold text-jm-gray-900 mb-6">Revenue</h3>
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-sans text-sm text-jm-gray-600">This Month</span>
                  <span className="font-sans text-lg font-bold text-jm-gray-900">{stats.revenue.monthly}</span>
                </div>
                <div className="h-2 bg-jm-gray-100 rounded-full overflow-hidden">
                  <div className="h-full w-3/4 bg-gradient-jm"></div>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-sans text-sm text-jm-gray-600">This Quarter</span>
                  <span className="font-sans text-lg font-bold text-jm-gray-900">{stats.revenue.quarterly}</span>
                </div>
                <div className="h-2 bg-jm-gray-100 rounded-full overflow-hidden">
                  <div className="h-full w-5/6 bg-gradient-jm"></div>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-sans text-sm text-jm-gray-600">Annual</span>
                  <span className="font-sans text-lg font-bold text-jm-gray-900">{stats.revenue.annual}</span>
                </div>
                <div className="h-2 bg-jm-gray-100 rounded-full overflow-hidden">
                  <div className="h-full w-full bg-gradient-jm"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Tier Distribution */}
          <div className="bg-white rounded-xl border border-jm-gray-200 p-6">
            <h3 className="font-serif text-xl font-bold text-jm-gray-900 mb-6">User Tier Distribution</h3>
            <div className="space-y-3">
              {tierDistribution.map((item) => (
                <div key={item.tier}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-sans text-sm font-medium text-jm-gray-700">{item.tier}</span>
                    <span className="font-sans text-sm text-jm-gray-600">
                      {item.count} ({item.percentage}%)
                    </span>
                  </div>
                  <div className="h-2 bg-jm-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-jm"
                      style={{ width: `${item.percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Action Items & Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Action Items */}
          <div className="bg-white rounded-xl border border-jm-gray-200 p-6">
            <h3 className="font-serif text-xl font-bold text-jm-gray-900 mb-6">Action Required</h3>
            <div className="space-y-4">
              <Link
                to="/admin/verifications"
                className="flex items-center justify-between p-4 bg-yellow-50 rounded-lg hover:bg-yellow-100 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-yellow-200 rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-yellow-800" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                    </svg>
                  </div>
                  <div>
                    <p className="font-sans text-sm font-semibold text-jm-gray-900">Pending Verifications</p>
                    <p className="font-sans text-xs text-jm-gray-600">{stats.pendingVerifications} users waiting</p>
                  </div>
                </div>
                <svg className="w-5 h-5 text-jm-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>

              <Link
                to="/admin/reports"
                className="flex items-center justify-between p-4 bg-red-50 rounded-lg hover:bg-red-100 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-red-200 rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-red-800" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M3 6a3 3 0 013-3h10a1 1 0 01.8 1.6L14.25 8l2.55 3.4A1 1 0 0116 13H6a1 1 0 00-1 1v3a1 1 0 11-2 0V6z" clipRule="evenodd"/>
                    </svg>
                  </div>
                  <div>
                    <p className="font-sans text-sm font-semibold text-jm-gray-900">Reported Content</p>
                    <p className="font-sans text-xs text-jm-gray-600">{stats.reportedProfiles} reports to review</p>
                  </div>
                </div>
                <svg className="w-5 h-5 text-jm-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>

              <div className="p-4 bg-green-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-200 rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-green-800" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd"/>
                    </svg>
                  </div>
                  <div>
                    <p className="font-sans text-sm font-semibold text-jm-gray-900">Successful Matches</p>
                    <p className="font-sans text-xs text-jm-gray-600">{stats.successfulMatches} this month</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-xl border border-jm-gray-200 p-6">
            <h3 className="font-serif text-xl font-bold text-jm-gray-900 mb-6">Recent Activity</h3>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start gap-3 pb-4 border-b border-jm-gray-100 last:border-0">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    activity.type === 'signup' ? 'bg-blue-100' :
                    activity.type === 'upgrade' ? 'bg-purple-100' :
                    activity.type === 'verification' ? 'bg-green-100' :
                    activity.type === 'match' ? 'bg-pink-100' :
                    'bg-red-100'
                  }`}>
                    <span className="text-xs">
                      {activity.type === 'signup' ? '👤' :
                       activity.type === 'upgrade' ? '⭐' :
                       activity.type === 'verification' ? '✓' :
                       activity.type === 'match' ? '💕' :
                       '⚠️'}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-sans text-sm font-semibold text-jm-gray-900">{activity.user}</p>
                    <p className="font-sans text-xs text-jm-gray-600">{activity.action}</p>
                    <p className="font-sans text-xs text-jm-gray-400 mt-1">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
