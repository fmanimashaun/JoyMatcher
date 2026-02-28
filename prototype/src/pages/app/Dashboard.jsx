import { Link } from 'react-router-dom';

export default function Dashboard() {
  // Simulated user state
  const currentUser = {
    name: 'Kwame M.',
    completedTier: 3,
    subscription: 'premium', // free | premium | vip
    newMatches: 5,
    pendingInterests: 3,
    mutualInterests: 2,
  };

  const recentActivity = [
    {
      type: 'match',
      name: 'Amara O.',
      action: 'New match based on Tier 3 compatibility',
      time: '2 hours ago',
      image: '/images/profiles/women/woman-professional-corporate.png',
    },
    {
      type: 'interest',
      name: 'Chidinma E.',
      action: 'Sent you a Show Interest request',
      time: '5 hours ago',
      image: '/images/profiles/women/woman-lawyer-business.png',
    },
    {
      type: 'message',
      name: 'Emeka A.',
      action: 'Sent you a message',
      time: '1 day ago',
      image: '/images/profiles/women/woman-entrepreneur-business.png',
    },
  ];

  return (
    <div className="min-h-screen bg-jm-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-jm-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2">
              <img src="/images/logo-transparent.svg" alt="JoyMatcher" className="w-8 h-8" />
              <span className="font-serif text-xl font-bold bg-gradient-jm bg-clip-text text-transparent">
                JoyMatcher
              </span>
            </Link>

            <nav className="hidden md:flex items-center gap-6">
              <Link to="/app/discover" className="font-sans text-jm-gray-700 hover:text-jm-coral transition-colors">
                Discover
              </Link>
              <Link to="/app/interests" className="font-sans text-jm-gray-700 hover:text-jm-coral transition-colors">
                Interests
              </Link>
              <Link to="/app/messages" className="font-sans text-jm-gray-700 hover:text-jm-coral transition-colors">
                Messages
              </Link>
              <Link to="/app/profile" className="font-sans text-jm-gray-700 hover:text-jm-coral transition-colors">
                Profile
              </Link>
            </nav>

            <div className="flex items-center gap-4">
              {currentUser.subscription === 'free' && (
                <Link
                  to="/app/upgrade"
                  className="hidden sm:block bg-gradient-jm text-white font-sans font-semibold px-4 py-2 rounded-lg hover:opacity-90 transition-opacity text-sm"
                >
                  Upgrade to Premium
                </Link>
              )}
              <button className="w-10 h-10 rounded-full bg-gradient-to-br from-jm-purple-deep to-jm-coral flex items-center justify-center text-white font-semibold">
                {currentUser.name.charAt(0)}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="font-serif text-3xl font-bold text-jm-gray-900 mb-2">
            Welcome back, {currentUser.name.split(' ')[0]}!
          </h1>
          <p className="font-sans text-jm-gray-600">
            You've completed Tier {currentUser.completedTier} • {currentUser.subscription === 'premium' ? 'Premium' : currentUser.subscription === 'vip' ? 'VIP' : 'Free'} Member
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* New Matches */}
          <Link
            to="/app/discover"
            className="bg-white rounded-xl p-6 border border-jm-gray-200 hover:border-jm-coral transition-colors"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-jm-success-light rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-jm-success" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z"/>
                </svg>
              </div>
              <span className="font-serif text-3xl font-bold text-jm-gray-900">
                {currentUser.newMatches}
              </span>
            </div>
            <h3 className="font-sans text-sm font-semibold text-jm-gray-900 mb-1">New Matches</h3>
            <p className="font-sans text-xs text-jm-gray-600">View compatible profiles</p>
          </Link>

          {/* Pending Interests */}
          <Link
            to="/app/interests"
            className="bg-white rounded-xl p-6 border border-jm-gray-200 hover:border-jm-coral transition-colors"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-jm-coral/10 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-jm-coral" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd"/>
                </svg>
              </div>
              <span className="font-serif text-3xl font-bold text-jm-gray-900">
                {currentUser.pendingInterests}
              </span>
            </div>
            <h3 className="font-sans text-sm font-semibold text-jm-gray-900 mb-1">Pending Interests</h3>
            <p className="font-sans text-xs text-jm-gray-600">Respond to requests</p>
          </Link>

          {/* Mutual Interests */}
          <Link
            to="/app/messages"
            className="bg-white rounded-xl p-6 border border-jm-gray-200 hover:border-jm-coral transition-colors"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-jm-purple-deep/10 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-jm-purple-deep" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <span className="font-serif text-3xl font-bold text-jm-gray-900">
                {currentUser.mutualInterests}
              </span>
            </div>
            <h3 className="font-sans text-sm font-semibold text-jm-gray-900 mb-1">Active Conversations</h3>
            <p className="font-sans text-xs text-jm-gray-600">Continue chatting</p>
          </Link>

          {/* Profile Completion */}
          <Link
            to="/app/profile"
            className="bg-white rounded-xl p-6 border border-jm-gray-200 hover:border-jm-coral transition-colors"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-jm-gray-100 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-jm-gray-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"/>
                </svg>
              </div>
              <span className="font-sans text-xl font-bold text-jm-gray-900">
                Tier {currentUser.completedTier}
              </span>
            </div>
            <h3 className="font-sans text-sm font-semibold text-jm-gray-900 mb-1">Profile Progress</h3>
            <p className="font-sans text-xs text-jm-gray-600">Complete Tier 4</p>
          </Link>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-xl border border-jm-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-serif text-xl font-bold text-jm-gray-900">Recent Activity</h2>
            <Link
              to="/app/discover"
              className="font-sans text-sm text-jm-coral hover:underline font-medium"
            >
              View All
            </Link>
          </div>

          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div
                key={index}
                className="flex items-start gap-4 p-4 rounded-lg hover:bg-jm-gray-50 transition-colors"
              >
                <img
                  src={activity.image}
                  alt={activity.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-jm-gray-200"
                />
                <div className="flex-1 min-w-0">
                  <p className="font-sans text-sm text-jm-gray-900 font-semibold mb-1">
                    {activity.name}
                  </p>
                  <p className="font-sans text-sm text-jm-gray-600 mb-1">
                    {activity.action}
                  </p>
                  <p className="font-sans text-xs text-jm-gray-500">
                    {activity.time}
                  </p>
                </div>
                <button className="bg-gradient-jm text-white font-sans font-semibold px-4 py-2 rounded-lg hover:opacity-90 transition-opacity text-sm whitespace-nowrap">
                  {activity.type === 'match' ? 'View Profile' : activity.type === 'interest' ? 'Respond' : 'Reply'}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gradient-to-br from-jm-purple-deep to-jm-coral rounded-xl p-8 text-white">
            <h3 className="font-serif text-2xl font-bold mb-3 drop-shadow-lg">
              Complete Your Profile
            </h3>
            <p className="font-sans text-sm mb-6 drop-shadow-md">
              Unlock Tier 4 to share health and lifestyle information with compatible matches.
            </p>
            <Link
              to="/app/profile"
              className="inline-block bg-white text-jm-purple-deep font-sans font-semibold px-6 py-3 rounded-lg hover:bg-white/90 transition-colors"
            >
              Continue to Tier 4
            </Link>
          </div>

          {currentUser.subscription === 'free' && (
            <div className="bg-white border-2 border-jm-coral rounded-xl p-8">
              <h3 className="font-serif text-2xl font-bold text-jm-gray-900 mb-3">
                Upgrade to Premium
              </h3>
              <p className="font-sans text-sm text-jm-gray-600 mb-6">
                See who's interested in you, send unlimited Show Interest requests, and more.
              </p>
              <Link
                to="/app/upgrade"
                className="inline-block bg-gradient-jm text-white font-sans font-semibold px-6 py-3 rounded-lg hover:opacity-90 transition-opacity"
              >
                View Plans
              </Link>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
