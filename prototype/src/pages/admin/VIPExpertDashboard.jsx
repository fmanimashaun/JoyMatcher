import { Link } from 'react-router-dom';
import { useState } from 'react';

export default function VIPExpertDashboard() {
  const [selectedClient, setSelectedClient] = useState(null);

  // Simulated VIP Expert state
  const currentExpert = {
    name: 'Chiamaka Nwosu',
    expertId: 'exp_003',
    email: 'chiamaka.nwosu@joymatcher.com',
    specialization: 'Christian professionals, Lagos',
  };

  // Simulated performance metrics
  const performance = {
    activeClients: 3,
    capacity: 6,
    rating: 4.9,
    successRate: 74,
    introductionsSent: 14,
    introductionsAccepted: 11,
    successfulMatches: 2,
    earnings: {
      thisMonth: 120000,
      total: 850000,
      currency: '₦',
    },
  };

  // CRITICAL: Only assigned clients are visible (data isolation)
  // This array would come from backend filtered by VIPAssignment
  const assignedClients = [
    {
      id: 78901,
      name: 'Chidinma Okafor',
      age: 31,
      location: 'Lagos, Nigeria',
      occupation: 'Product Manager',
      education: 'MBA, London Business School',
      vipTier: '3-Month',
      assignedAt: '3 days ago',
      lastActivity: '2 hours ago',
      sessionScheduled: 'Tomorrow, 10:00 AM',
      status: 'onboarding',
      photo: '/images/profiles/women/woman-professional-corporate.png',
      preferences: {
        ageRange: '32-38',
        location: 'Lagos',
        occupation: 'Professional',
        faith: 'Christian (non-denominational)',
        children: 'Wants 2-3 children',
        dealBreakers: 'No smokers, must want children',
      },
      notes: [
        {
          date: '2 days ago',
          content: 'Conducted onboarding session. Very clear on marriage vision. Values depth over surface attraction.',
        },
      ],
    },
    {
      id: 78902,
      name: 'Blessing Igwe',
      age: 28,
      location: 'Abuja, Nigeria',
      occupation: 'Lawyer',
      education: 'LLB, University of Nigeria',
      vipTier: '6-Month',
      assignedAt: '2 weeks ago',
      lastActivity: '1 day ago',
      sessionScheduled: null,
      status: 'active_matching',
      photo: '/images/profiles/women/woman-lawyer-business.png',
      preferences: {
        ageRange: '30-36',
        location: 'Abuja or Lagos',
        occupation: 'Professional (Law, Business, Finance)',
        faith: 'Christian (Catholic preferred)',
        children: 'Wants 3-4 children',
        dealBreakers: 'Must be practicing Catholic, no divorce history',
      },
      introductions: [
        { name: 'Emmanuel A.', status: 'accepted', date: '5 days ago' },
        { name: 'Tunde K.', status: 'declined', date: '1 week ago' },
      ],
      notes: [
        {
          date: '1 week ago',
          content: 'Presented 3 matches. She selected Emmanuel for introduction. Very selective, which is good.',
        },
        {
          date: '2 weeks ago',
          content: 'Onboarding complete. Faith is paramount. Looking for intellectual match.',
        },
      ],
    },
    {
      id: 78903,
      name: 'Adaeze Nwankwo',
      age: 32,
      location: 'Port Harcourt, Nigeria',
      occupation: 'Marketing Director',
      education: 'MSc Marketing, University of Lagos',
      vipTier: '3-Month',
      assignedAt: '1 month ago',
      lastActivity: '3 days ago',
      sessionScheduled: 'Next Monday, 2:00 PM',
      status: 'active_matching',
      photo: '/images/profiles/women/woman-entrepreneur-business.png',
      preferences: {
        ageRange: '33-40',
        location: 'Port Harcourt or Lagos',
        occupation: 'Entrepreneur or Senior Professional',
        faith: 'Christian (any denomination)',
        children: 'Wants 2 children',
        dealBreakers: 'Must be financially stable, no substance abuse',
      },
      introductions: [
        { name: 'Chidi M.', status: 'accepted', date: '3 weeks ago' },
        { name: 'Olumide K.', status: 'accepted', date: '2 weeks ago' },
      ],
      notes: [
        {
          date: '3 days ago',
          content: 'Check-in call. Both introductions going well. She\'s taking her time to get to know them.',
        },
        {
          date: '2 weeks ago',
          content: 'Introduced her to Olumide. Good match on paper, both ambitious professionals.',
        },
      ],
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'onboarding':
        return 'bg-yellow-100 text-yellow-800';
      case 'active_matching':
        return 'bg-jm-success-light text-jm-success';
      case 'introduction_made':
        return 'bg-jm-purple-deep/10 text-jm-purple-deep';
      default:
        return 'bg-jm-gray-100 text-jm-gray-700';
    }
  };

  const formatCurrency = (amount) => {
    return `${performance.earnings.currency}${amount.toLocaleString()}`;
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
                  VIP Expert Dashboard
                </h1>
                <p className="font-sans text-sm text-jm-gray-600">Freelance Matchmaker</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-jm-purple-deep to-jm-coral flex items-center justify-center text-white font-semibold text-sm">
                {currentExpert.name.charAt(0)}
              </div>
              <span className="font-sans text-sm text-jm-gray-700">{currentExpert.name}</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Performance Overview */}
        <div className="mb-8">
          <h2 className="font-serif text-2xl font-bold text-jm-gray-900 mb-4">
            Your Performance
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-xl p-6 border border-jm-gray-200">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-jm-purple-deep/10 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-jm-purple-deep" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                  </svg>
                </div>
                <span className="font-serif text-3xl font-bold text-jm-gray-900">
                  {performance.activeClients}/{performance.capacity}
                </span>
              </div>
              <h3 className="font-sans text-sm font-semibold text-jm-gray-900 mb-1">Active Clients</h3>
              <p className="font-sans text-xs text-jm-gray-600">Capacity available</p>
            </div>

            <div className="bg-white rounded-xl p-6 border border-jm-gray-200">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </div>
                <span className="font-serif text-3xl font-bold text-jm-gray-900">
                  {performance.rating}
                </span>
              </div>
              <h3 className="font-sans text-sm font-semibold text-jm-gray-900 mb-1">Client Rating</h3>
              <p className="font-sans text-xs text-jm-gray-600">Out of 5.0</p>
            </div>

            <div className="bg-white rounded-xl p-6 border border-jm-gray-200">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-jm-success-light rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-jm-success" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <span className="font-serif text-3xl font-bold text-jm-gray-900">
                  {performance.successRate}%
                </span>
              </div>
              <h3 className="font-sans text-sm font-semibold text-jm-gray-900 mb-1">Success Rate</h3>
              <p className="font-sans text-xs text-jm-gray-600">Introduction acceptance</p>
            </div>

            <div className="bg-white rounded-xl p-6 border border-jm-gray-200">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-jm-coral/10 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-jm-coral" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <span className="font-serif text-3xl font-bold text-jm-gray-900">
                  {formatCurrency(performance.earnings.thisMonth)}
                </span>
              </div>
              <h3 className="font-sans text-sm font-semibold text-jm-gray-900 mb-1">This Month</h3>
              <p className="font-sans text-xs text-jm-gray-600">
                {performance.successfulMatches} successful matches
              </p>
            </div>
          </div>
        </div>

        {/* This Month Stats */}
        <div className="mb-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl p-6 border border-jm-gray-200">
            <h3 className="font-sans text-sm font-semibold text-jm-gray-900 mb-4">This Month</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-sans text-sm text-jm-gray-700">Introductions Sent</span>
                <span className="font-sans text-lg font-bold text-jm-gray-900">{performance.introductionsSent}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-sans text-sm text-jm-gray-700">Accepted</span>
                <span className="font-sans text-lg font-bold text-jm-success">{performance.introductionsAccepted}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-sans text-sm text-jm-gray-700">Successful Matches</span>
                <span className="font-sans text-lg font-bold text-jm-success">{performance.successfulMatches}</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 border border-jm-gray-200">
            <h3 className="font-sans text-sm font-semibold text-jm-gray-900 mb-4">Earnings</h3>
            <div className="space-y-3">
              <div>
                <p className="font-sans text-xs text-jm-gray-600 mb-1">This Month</p>
                <p className="font-serif text-2xl font-bold text-jm-gray-900">
                  {formatCurrency(performance.earnings.thisMonth)}
                </p>
              </div>
              <div>
                <p className="font-sans text-xs text-jm-gray-600 mb-1">Total Earned</p>
                <p className="font-sans text-lg font-bold text-jm-gray-900">
                  {formatCurrency(performance.earnings.total)}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 border border-jm-gray-200">
            <h3 className="font-sans text-sm font-semibold text-jm-gray-900 mb-4">Specialization</h3>
            <p className="font-sans text-sm text-jm-gray-600 mb-4">
              {currentExpert.specialization}
            </p>
            <p className="font-sans text-xs text-jm-gray-500">
              Expert ID: {currentExpert.expertId}
            </p>
          </div>
        </div>

        {/* My Assigned Clients */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-serif text-2xl font-bold text-jm-gray-900">
              My Assigned Clients
            </h2>
            <p className="font-sans text-sm text-jm-gray-600">
              {assignedClients.length} active clients
            </p>
          </div>

          {/* IMPORTANT: No search/browse functionality */}
          {/* Expert can ONLY see their assigned clients */}
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-yellow-700">
                  <strong>Data Isolation:</strong> You can only access VIP clients assigned to you by the VIP Coordinator. You cannot search or view other platform users.
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {assignedClients.map((client) => (
              <div
                key={client.id}
                className="bg-white rounded-xl border border-jm-gray-200 overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => setSelectedClient(client)}
              >
                {/* Client Photo */}
                <div className="relative h-48">
                  <img
                    src={client.photo}
                    alt={client.name}
                    className="w-full h-full object-cover"
                  />
                  <span className={`absolute top-3 right-3 text-xs font-semibold px-2 py-1 rounded-full ${getStatusColor(client.status)}`}>
                    {client.status.replace('_', ' ').toUpperCase()}
                  </span>
                </div>

                {/* Client Info */}
                <div className="p-4">
                  <h3 className="font-serif text-xl font-bold text-jm-gray-900 mb-1">
                    {client.name}, {client.age}
                  </h3>
                  <p className="font-sans text-sm text-jm-gray-600 mb-2">
                    {client.location}
                  </p>
                  <p className="font-sans text-sm text-jm-gray-600 mb-4">
                    {client.occupation}
                  </p>

                  <div className="flex items-center justify-between mb-4 pb-4 border-b border-jm-gray-200">
                    <span className="font-sans text-xs text-jm-gray-600">VIP Tier:</span>
                    <span className="font-sans text-xs font-semibold text-jm-purple-deep">
                      {client.vipTier}
                    </span>
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center justify-between">
                      <span className="font-sans text-xs text-jm-gray-600">Assigned:</span>
                      <span className="font-sans text-xs text-jm-gray-900">{client.assignedAt}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-sans text-xs text-jm-gray-600">Last Active:</span>
                      <span className="font-sans text-xs text-jm-gray-900">{client.lastActivity}</span>
                    </div>
                    {client.sessionScheduled && (
                      <div className="flex items-center justify-between">
                        <span className="font-sans text-xs text-jm-gray-600">Next Session:</span>
                        <span className="font-sans text-xs font-semibold text-jm-coral">
                          {client.sessionScheduled}
                        </span>
                      </div>
                    )}
                  </div>

                  <button className="w-full bg-gradient-jm text-white font-sans font-semibold px-4 py-2 rounded-lg hover:opacity-90 transition-opacity text-sm">
                    View Full Profile
                  </button>
                </div>
              </div>
            ))}
          </div>

          {assignedClients.length === 0 && (
            <div className="bg-white rounded-xl border border-jm-gray-200 p-12 text-center">
              <svg className="mx-auto h-12 w-12 text-jm-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <h3 className="font-sans text-lg font-semibold text-jm-gray-900 mb-2">
                No Clients Assigned Yet
              </h3>
              <p className="font-sans text-sm text-jm-gray-600">
                Your VIP Coordinator will assign clients to you based on your specialization and capacity.
              </p>
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl border border-jm-gray-200 p-6">
          <h2 className="font-serif text-xl font-bold text-jm-gray-900 mb-4">
            Quick Actions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button className="p-4 bg-jm-gray-50 rounded-lg hover:bg-jm-gray-100 transition-colors text-left">
              <svg className="w-6 h-6 text-jm-coral mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <h3 className="font-sans text-sm font-semibold text-jm-gray-900 mb-1">
                Search Matches
              </h3>
              <p className="font-sans text-xs text-jm-gray-600">
                Browse platform users to find matches for your clients
              </p>
            </button>

            <button className="p-4 bg-jm-gray-50 rounded-lg hover:bg-jm-gray-100 transition-colors text-left">
              <svg className="w-6 h-6 text-jm-success mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="font-sans text-sm font-semibold text-jm-gray-900 mb-1">
                Create Introduction
              </h3>
              <p className="font-sans text-xs text-jm-gray-600">
                Propose an introduction between client and match
              </p>
            </button>

            <button className="p-4 bg-jm-gray-50 rounded-lg hover:bg-jm-gray-100 transition-colors text-left">
              <svg className="w-6 h-6 text-jm-purple-deep mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <h3 className="font-sans text-sm font-semibold text-jm-gray-900 mb-1">
                Schedule Session
              </h3>
              <p className="font-sans text-xs text-jm-gray-600">
                Book coaching or check-in sessions with clients
              </p>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
