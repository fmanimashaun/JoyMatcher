import { Link } from 'react-router-dom';
import { useState } from 'react';

export default function SuperAdminDashboard() {
  const [timeRange, setTimeRange] = useState('today'); // today | week | month

  // Simulated admin state
  const currentAdmin = {
    name: 'Admin User',
    role: 'superAdmin',
    email: 'admin@joymatcher.com',
  };

  // Simulated platform metrics
  const metrics = {
    totalUsers: 12847,
    activeUsers: 3421,
    freeUsers: 8934,
    premiumUsers: 3421,
    vipUsers: 492,
    newUsersToday: 87,
    revenue: {
      today: 1245000,
      week: 8750000,
      month: 32400000,
      currency: '₦',
    },
    moderation: {
      pendingReports: 12,
      pendingPhotos: 45,
      pendingVIPApplications: 3,
      pendingVerifications: 5,
    },
    engagement: {
      showInterestSent: 432,
      messagesExchanged: 2341,
      successfulMatches: 23,
    },
  };

  const recentActions = [
    {
      id: 1,
      action: 'User Suspended',
      admin: 'Moderator Chidi K.',
      target: 'Emeka T. (ID: 44556)',
      reason: 'Harassment',
      time: '15 minutes ago',
      severity: 'high',
    },
    {
      id: 2,
      action: 'VIP Approved',
      admin: 'VIP Coordinator Ngozi M.',
      target: 'Chidinma O. (ID: 78901)',
      reason: 'Application approved',
      time: '1 hour ago',
      severity: 'normal',
    },
    {
      id: 3,
      action: 'Expert Assigned',
      admin: 'VIP Coordinator Ngozi M.',
      target: 'Chidinma O. → Chiamaka N.',
      reason: 'New VIP assignment',
      time: '2 hours ago',
      severity: 'normal',
    },
    {
      id: 4,
      action: 'Photo Rejected',
      admin: 'Moderator Chidi K.',
      target: 'Multiple users',
      reason: '12 photos rejected',
      time: '3 hours ago',
      severity: 'low',
    },
    {
      id: 5,
      action: 'Security Alert',
      admin: 'System',
      target: 'Expert Tunde O. (exp_007)',
      reason: '3 isolation violations',
      time: '5 hours ago',
      severity: 'critical',
    },
  ];

  const adminTeam = [
    { role: 'Super Admin', count: 2, active: 2 },
    { role: 'Moderators', count: 5, active: 4 },
    { role: 'VIP Coordinators', count: 2, active: 2 },
    { role: 'VIP Experts', count: 8, active: 7 },
    { role: 'Support Agents', count: 4, active: 3 },
  ];

  const formatCurrency = (amount) => {
    return `${metrics.revenue.currency}${amount.toLocaleString()}`;
  };

  return (
    <div className="min-h-screen bg-jm-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-jm-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <img src="/images/logo-transparent.svg" alt="JoyMatcher" className="w-8 h-8" />
              <div>
                <h1 className="font-serif text-xl font-bold text-jm-gray-900">
                  Admin Dashboard
                </h1>
                <p className="font-sans text-sm text-jm-gray-600">Super Administrator</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                className="px-3 py-2 border border-jm-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-jm-coral"
              >
                <option value="today">Today</option>
                <option value="week">This Week</option>
                <option value="month">This Month</option>
              </select>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-jm-purple-deep to-jm-coral flex items-center justify-center text-white font-semibold text-sm">
                  {currentAdmin.name.charAt(0)}
                </div>
                <span className="font-sans text-sm text-jm-gray-700">{currentAdmin.name}</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Platform Metrics */}
        <div className="mb-8">
          <h2 className="font-serif text-2xl font-bold text-jm-gray-900 mb-4">
            Platform Overview
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Total Users */}
            <div className="bg-white rounded-xl p-6 border border-jm-gray-200">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-jm-purple-deep/10 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-jm-purple-deep" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                  </svg>
                </div>
                <span className="font-serif text-3xl font-bold text-jm-gray-900">
                  {metrics.totalUsers.toLocaleString()}
                </span>
              </div>
              <h3 className="font-sans text-sm font-semibold text-jm-gray-900 mb-1">Total Users</h3>
              <p className="font-sans text-xs text-jm-gray-600">
                +{metrics.newUsersToday} today
              </p>
            </div>

            {/* Active Users */}
            <div className="bg-white rounded-xl p-6 border border-jm-gray-200">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-jm-success-light rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-jm-success" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <span className="font-serif text-3xl font-bold text-jm-gray-900">
                  {metrics.activeUsers.toLocaleString()}
                </span>
              </div>
              <h3 className="font-sans text-sm font-semibold text-jm-gray-900 mb-1">Active Users</h3>
              <p className="font-sans text-xs text-jm-gray-600">
                {Math.round((metrics.activeUsers / metrics.totalUsers) * 100)}% of total
              </p>
            </div>

            {/* Revenue */}
            <div className="bg-white rounded-xl p-6 border border-jm-gray-200">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-jm-coral/10 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-jm-coral" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <span className="font-serif text-3xl font-bold text-jm-gray-900">
                  {formatCurrency(metrics.revenue[timeRange])}
                </span>
              </div>
              <h3 className="font-sans text-sm font-semibold text-jm-gray-900 mb-1">Revenue</h3>
              <p className="font-sans text-xs text-jm-gray-600">
                {timeRange === 'today' ? 'Today' : timeRange === 'week' ? 'This week' : 'This month'}
              </p>
            </div>

            {/* VIP Users */}
            <div className="bg-white rounded-xl p-6 border border-jm-gray-200">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </div>
                <span className="font-serif text-3xl font-bold text-jm-gray-900">
                  {metrics.vipUsers}
                </span>
              </div>
              <h3 className="font-sans text-sm font-semibold text-jm-gray-900 mb-1">VIP Members</h3>
              <p className="font-sans text-xs text-jm-gray-600">
                {Math.round((metrics.vipUsers / metrics.totalUsers) * 100)}% of total
              </p>
            </div>
          </div>
        </div>

        {/* User Breakdown */}
        <div className="mb-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl p-6 border border-jm-gray-200">
            <h3 className="font-sans text-sm font-semibold text-jm-gray-900 mb-4">User Breakdown</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-sans text-sm text-jm-gray-700">Free</span>
                <span className="font-sans text-sm font-semibold text-jm-gray-900">
                  {metrics.freeUsers.toLocaleString()}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-sans text-sm text-jm-gray-700">Premium</span>
                <span className="font-sans text-sm font-semibold text-jm-gray-900">
                  {metrics.premiumUsers.toLocaleString()}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-sans text-sm text-jm-gray-700">VIP</span>
                <span className="font-sans text-sm font-semibold text-jm-gray-900">
                  {metrics.vipUsers}
                </span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 border border-jm-gray-200">
            <h3 className="font-sans text-sm font-semibold text-jm-gray-900 mb-4">Moderation Queue</h3>
            <div className="space-y-3">
              <Link
                to="/admin/moderation/reports"
                className="flex items-center justify-between hover:bg-jm-gray-50 p-2 rounded transition-colors"
              >
                <span className="font-sans text-sm text-jm-gray-700">Pending Reports</span>
                <span className="bg-jm-coral text-white text-xs font-semibold px-2 py-1 rounded-full">
                  {metrics.moderation.pendingReports}
                </span>
              </Link>
              <Link
                to="/admin/moderation/photos"
                className="flex items-center justify-between hover:bg-jm-gray-50 p-2 rounded transition-colors"
              >
                <span className="font-sans text-sm text-jm-gray-700">Pending Photos</span>
                <span className="bg-yellow-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
                  {metrics.moderation.pendingPhotos}
                </span>
              </Link>
              <Link
                to="/admin/vip/applications"
                className="flex items-center justify-between hover:bg-jm-gray-50 p-2 rounded transition-colors"
              >
                <span className="font-sans text-sm text-jm-gray-700">VIP Applications</span>
                <span className="bg-jm-purple-deep text-white text-xs font-semibold px-2 py-1 rounded-full">
                  {metrics.moderation.pendingVIPApplications}
                </span>
              </Link>
              <Link
                to="/admin/vip/verifications"
                className="flex items-center justify-between hover:bg-jm-gray-50 p-2 rounded transition-colors"
              >
                <span className="font-sans text-sm text-jm-gray-700">Pending Verifications</span>
                <span className="bg-jm-success text-white text-xs font-semibold px-2 py-1 rounded-full">
                  {metrics.moderation.pendingVerifications}
                </span>
              </Link>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 border border-jm-gray-200">
            <h3 className="font-sans text-sm font-semibold text-jm-gray-900 mb-4">Today's Engagement</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-sans text-sm text-jm-gray-700">Show Interest Sent</span>
                <span className="font-sans text-sm font-semibold text-jm-gray-900">
                  {metrics.engagement.showInterestSent}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-sans text-sm text-jm-gray-700">Messages Exchanged</span>
                <span className="font-sans text-sm font-semibold text-jm-gray-900">
                  {metrics.engagement.messagesExchanged}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-sans text-sm text-jm-gray-700">Successful Matches</span>
                <span className="font-sans text-sm font-semibold text-jm-gray-900">
                  {metrics.engagement.successfulMatches}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Admin Actions */}
        <div className="mb-8">
          <div className="bg-white rounded-xl border border-jm-gray-200">
            <div className="p-6 border-b border-jm-gray-200">
              <h2 className="font-serif text-xl font-bold text-jm-gray-900">Recent Admin Actions</h2>
            </div>
            <div className="divide-y divide-jm-gray-200">
              {recentActions.map((action) => (
                <div key={action.id} className="p-4 hover:bg-jm-gray-50 transition-colors">
                  <div className="flex items-start gap-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                      action.severity === 'critical' ? 'bg-red-100' :
                      action.severity === 'high' ? 'bg-orange-100' :
                      action.severity === 'normal' ? 'bg-jm-success-light' :
                      'bg-jm-gray-100'
                    }`}>
                      <svg className={`w-5 h-5 ${
                        action.severity === 'critical' ? 'text-red-600' :
                        action.severity === 'high' ? 'text-orange-600' :
                        action.severity === 'normal' ? 'text-jm-success' :
                        'text-jm-gray-600'
                      }`} fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-sans text-sm font-semibold text-jm-gray-900 mb-1">
                        {action.action}
                      </p>
                      <p className="font-sans text-sm text-jm-gray-600 mb-1">
                        {action.target}
                      </p>
                      <p className="font-sans text-xs text-jm-gray-500 mb-1">
                        By: {action.admin}
                      </p>
                      <p className="font-sans text-xs text-jm-gray-500">
                        Reason: {action.reason}
                      </p>
                    </div>
                    <span className="font-sans text-xs text-jm-gray-500 whitespace-nowrap">
                      {action.time}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-4 border-t border-jm-gray-200 text-center">
              <Link
                to="/admin/audit-logs"
                className="font-sans text-sm text-jm-coral hover:underline font-medium"
              >
                View All Audit Logs
              </Link>
            </div>
          </div>
        </div>

        {/* Admin Team */}
        <div>
          <div className="bg-white rounded-xl border border-jm-gray-200">
            <div className="p-6 border-b border-jm-gray-200 flex items-center justify-between">
              <h2 className="font-serif text-xl font-bold text-jm-gray-900">Admin Team</h2>
              <Link
                to="/admin/settings/admins"
                className="font-sans text-sm text-jm-coral hover:underline font-medium"
              >
                Manage Admins
              </Link>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {adminTeam.map((team, index) => (
                  <div key={index} className="bg-jm-gray-50 rounded-lg p-4 text-center">
                    <p className="font-sans text-2xl font-bold text-jm-gray-900 mb-1">
                      {team.count}
                    </p>
                    <p className="font-sans text-sm font-semibold text-jm-gray-700 mb-1">
                      {team.role}
                    </p>
                    <p className="font-sans text-xs text-jm-gray-600">
                      {team.active} active now
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
