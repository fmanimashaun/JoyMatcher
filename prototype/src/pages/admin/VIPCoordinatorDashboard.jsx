import { Link } from 'react-router-dom';
import { useState } from 'react';

export default function VIPCoordinatorDashboard() {
  const [activeTab, setActiveTab] = useState('applications'); // applications | verifications | assignments

  // Simulated coordinator state
  const currentCoordinator = {
    name: 'Ngozi M.',
    role: 'vipCoordinator',
    email: 'vip.coordinator@joymatcher.com',
  };

  // Simulated stats
  const stats = {
    activeVIPs: 47,
    pendingApplications: 3,
    pendingVerifications: 5,
    activeExperts: 7,
    thisMonthApproved: 6,
    thisMonthRejected: 2,
    averageVerificationTime: '36 hours',
  };

  // Simulated VIP applications queue
  const applications = [
    {
      id: 1,
      applicant: {
        name: 'Chidinma Okafor',
        userId: 78901,
        age: 31,
        location: 'Lagos, Nigeria',
        occupation: 'Product Manager, Fintech',
        education: 'MBA, London Business School',
      },
      subscription: 'Premium (8 months)',
      tierProgress: 'Tier 4 completed',
      submittedAt: '2 hours ago',
      applicationScore: 4.8,
      highlights: [
        'Clear marriage vision',
        'Thoughtful responses',
        'Realistic expectations',
        'Excellent profile quality',
      ],
    },
    {
      id: 2,
      applicant: {
        name: 'Emmanuel Adeyemi',
        userId: 78902,
        age: 34,
        location: 'Lagos, Nigeria',
        occupation: 'Software Engineer',
        education: 'BSc Computer Science, University of Lagos',
      },
      subscription: 'Premium (5 months)',
      tierProgress: 'Tier 4 completed',
      submittedAt: '1 day ago',
      applicationScore: 4.2,
      highlights: [
        'Serious intent',
        'Good communication',
        'Some vague responses',
        'Active on platform',
      ],
    },
    {
      id: 3,
      applicant: {
        name: 'Sarah Mitchell',
        userId: 78903,
        age: 29,
        location: 'London, UK',
        occupation: 'Financial Analyst',
        education: 'MSc Finance, Imperial College London',
      },
      subscription: 'Premium (3 months)',
      tierProgress: 'Tier 4 completed',
      submittedAt: '3 days ago',
      applicationScore: 3.5,
      highlights: [
        'Diaspora client',
        'Professional background',
        'Unrealistic expectations',
        'May need more clarity',
      ],
    },
  ];

  // Simulated verification queue
  const verifications = [
    {
      id: 1,
      vip: {
        name: 'Blessing Igwe',
        userId: 78904,
        age: 28,
        location: 'Abuja, Nigeria',
      },
      documentType: 'International Passport',
      videoKYC: 'Submitted',
      submittedAt: '6 hours ago',
      status: 'pending_review',
    },
    {
      id: 2,
      vip: {
        name: 'Olumide Kayode',
        userId: 78905,
        age: 36,
        location: 'Lagos, Nigeria',
      },
      documentType: 'Driver\'s License',
      videoKYC: 'Submitted',
      submittedAt: '1 day ago',
      status: 'pending_review',
    },
    {
      id: 3,
      vip: {
        name: 'Adaeze Nwankwo',
        userId: 78906,
        age: 32,
        location: 'Port Harcourt, Nigeria',
      },
      documentType: 'National ID',
      videoKYC: 'Not submitted',
      submittedAt: '2 days ago',
      status: 'awaiting_video',
    },
  ];

  // Simulated expert performance
  const experts = [
    {
      id: 'exp_003',
      name: 'Chiamaka Nwosu',
      activeClients: 3,
      capacity: 6,
      rating: 4.9,
      successRate: 74,
      introductionsThisMonth: 14,
      status: 'active',
    },
    {
      id: 'exp_001',
      name: 'Kemi Adeola',
      activeClients: 4,
      capacity: 6,
      rating: 4.8,
      successRate: 68,
      introductionsThisMonth: 18,
      status: 'active',
    },
    {
      id: 'exp_002',
      name: 'Tolu Bakare',
      activeClients: 6,
      capacity: 6,
      rating: 4.6,
      successRate: 62,
      introductionsThisMonth: 12,
      status: 'at_capacity',
    },
    {
      id: 'exp_007',
      name: 'Tunde Olusanya',
      activeClients: 2,
      capacity: 6,
      rating: 3.8,
      successRate: 33,
      introductionsThisMonth: 6,
      status: 'performance_review',
    },
  ];

  const getScoreColor = (score) => {
    if (score >= 4.5) return 'text-jm-success';
    if (score >= 3.5) return 'text-yellow-600';
    return 'text-orange-600';
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'active':
        return 'bg-jm-success-light text-jm-success';
      case 'at_capacity':
        return 'bg-yellow-100 text-yellow-800';
      case 'performance_review':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-jm-gray-100 text-jm-gray-700';
    }
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
                  VIP Coordination Dashboard
                </h1>
                <p className="font-sans text-sm text-jm-gray-600">VIP Coordinator</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-jm-purple-deep to-jm-coral flex items-center justify-center text-white font-semibold text-sm">
                {currentCoordinator.name.charAt(0)}
              </div>
              <span className="font-sans text-sm text-jm-gray-700">{currentCoordinator.name}</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* VIP Stats */}
        <div className="mb-8">
          <h2 className="font-serif text-2xl font-bold text-jm-gray-900 mb-4">
            VIP Overview
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-xl p-6 border border-jm-gray-200">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </div>
                <span className="font-serif text-3xl font-bold text-jm-gray-900">
                  {stats.activeVIPs}
                </span>
              </div>
              <h3 className="font-sans text-sm font-semibold text-jm-gray-900 mb-1">Active VIP Clients</h3>
              <p className="font-sans text-xs text-jm-gray-600">Currently assigned to experts</p>
            </div>

            <div className="bg-white rounded-xl p-6 border border-jm-gray-200">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-jm-coral/10 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-jm-coral" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                    <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="font-serif text-3xl font-bold text-jm-gray-900">
                  {stats.pendingApplications}
                </span>
              </div>
              <h3 className="font-sans text-sm font-semibold text-jm-gray-900 mb-1">Pending Applications</h3>
              <p className="font-sans text-xs text-jm-gray-600">Awaiting review</p>
            </div>

            <div className="bg-white rounded-xl p-6 border border-jm-gray-200">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-jm-success-light rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-jm-success" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <span className="font-serif text-3xl font-bold text-jm-gray-900">
                  {stats.pendingVerifications}
                </span>
              </div>
              <h3 className="font-sans text-sm font-semibold text-jm-gray-900 mb-1">Pending Verifications</h3>
              <p className="font-sans text-xs text-jm-gray-600">Tier 5 ID + Video KYC</p>
            </div>

            <div className="bg-white rounded-xl p-6 border border-jm-gray-200">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-jm-purple-deep/10 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-jm-purple-deep" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                  </svg>
                </div>
                <span className="font-serif text-3xl font-bold text-jm-gray-900">
                  {stats.activeExperts}
                </span>
              </div>
              <h3 className="font-sans text-sm font-semibold text-jm-gray-900 mb-1">Active Experts</h3>
              <p className="font-sans text-xs text-jm-gray-600">Freelance matchmakers</p>
            </div>
          </div>
        </div>

        {/* This Month Stats */}
        <div className="mb-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl p-6 border border-jm-gray-200">
            <h3 className="font-sans text-sm font-semibold text-jm-gray-900 mb-4">This Month</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-sans text-sm text-jm-gray-700">Applications Approved</span>
                <span className="font-sans text-lg font-bold text-jm-success">{stats.thisMonthApproved}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-sans text-sm text-jm-gray-700">Applications Rejected</span>
                <span className="font-sans text-lg font-bold text-orange-600">{stats.thisMonthRejected}</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 border border-jm-gray-200">
            <h3 className="font-sans text-sm font-semibold text-jm-gray-900 mb-4">Performance</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-sans text-sm text-jm-gray-700">Avg Verification Time</span>
                <span className="font-sans text-lg font-bold text-jm-gray-900">{stats.averageVerificationTime}</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 border border-jm-gray-200">
            <h3 className="font-sans text-sm font-semibold text-jm-gray-900 mb-4">Quick Actions</h3>
            <div className="space-y-2">
              <button className="w-full bg-gradient-jm text-white font-sans font-semibold px-4 py-2 rounded-lg hover:opacity-90 transition-opacity text-sm">
                Assign VIP to Expert
              </button>
              <button className="w-full bg-jm-gray-100 text-jm-gray-700 font-sans font-semibold px-4 py-2 rounded-lg hover:bg-jm-gray-200 transition-colors text-sm">
                View All VIPs
              </button>
            </div>
          </div>
        </div>

        {/* Coordination Tabs */}
        <div className="bg-white rounded-xl border border-jm-gray-200">
          {/* Tab Navigation */}
          <div className="border-b border-jm-gray-200">
            <nav className="flex">
              <button
                onClick={() => setActiveTab('applications')}
                className={`flex-1 px-6 py-4 font-sans text-sm font-semibold transition-colors ${
                  activeTab === 'applications'
                    ? 'text-jm-coral border-b-2 border-jm-coral'
                    : 'text-jm-gray-600 hover:text-jm-gray-900'
                }`}
              >
                Applications ({applications.length})
              </button>
              <button
                onClick={() => setActiveTab('verifications')}
                className={`flex-1 px-6 py-4 font-sans text-sm font-semibold transition-colors ${
                  activeTab === 'verifications'
                    ? 'text-jm-coral border-b-2 border-jm-coral'
                    : 'text-jm-gray-600 hover:text-jm-gray-900'
                }`}
              >
                Verifications ({verifications.length})
              </button>
              <button
                onClick={() => setActiveTab('assignments')}
                className={`flex-1 px-6 py-4 font-sans text-sm font-semibold transition-colors ${
                  activeTab === 'assignments'
                    ? 'text-jm-coral border-b-2 border-jm-coral'
                    : 'text-jm-gray-600 hover:text-jm-gray-900'
                }`}
              >
                Expert Management ({experts.length})
              </button>
            </nav>
          </div>

          {/* Applications Tab */}
          {activeTab === 'applications' && (
            <div className="divide-y divide-jm-gray-200">
              {applications.map((app) => (
                <div key={app.id} className="p-6">
                  <div className="flex items-start gap-6">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <h3 className="font-sans text-xl font-semibold text-jm-gray-900">
                          {app.applicant.name}
                        </h3>
                        <span className={`font-serif text-lg font-bold ${getScoreColor(app.applicationScore)}`}>
                          {app.applicationScore}/5.0
                        </span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <p className="font-sans text-sm text-jm-gray-600">
                            Age: {app.applicant.age} • {app.applicant.location}
                          </p>
                          <p className="font-sans text-sm text-jm-gray-600">
                            {app.applicant.occupation}
                          </p>
                          <p className="font-sans text-sm text-jm-gray-600">
                            {app.applicant.education}
                          </p>
                        </div>
                        <div>
                          <p className="font-sans text-sm text-jm-gray-600">
                            User ID: {app.applicant.userId}
                          </p>
                          <p className="font-sans text-sm text-jm-gray-600">
                            Subscription: {app.subscription}
                          </p>
                          <p className="font-sans text-sm text-jm-gray-600">
                            Tier: {app.tierProgress}
                          </p>
                        </div>
                      </div>

                      <div className="mb-4">
                        <p className="font-sans text-sm font-medium text-jm-gray-700 mb-2">Key Highlights:</p>
                        <div className="flex flex-wrap gap-2">
                          {app.highlights.map((highlight, index) => (
                            <span
                              key={index}
                              className="inline-block px-3 py-1 bg-jm-gray-100 text-jm-gray-700 text-xs rounded-full"
                            >
                              {highlight}
                            </span>
                          ))}
                        </div>
                      </div>

                      <p className="font-sans text-xs text-jm-gray-500 mb-4">
                        Submitted {app.submittedAt}
                      </p>

                      <div className="flex gap-3">
                        <button className="bg-jm-success text-white font-sans font-semibold px-6 py-2 rounded-lg hover:opacity-90 transition-opacity text-sm">
                          Approve Application
                        </button>
                        <button className="bg-red-600 text-white font-sans font-semibold px-6 py-2 rounded-lg hover:opacity-90 transition-opacity text-sm">
                          Reject Application
                        </button>
                        <button className="bg-jm-gray-100 text-jm-gray-700 font-sans font-semibold px-6 py-2 rounded-lg hover:bg-jm-gray-200 transition-colors text-sm">
                          View Full Application
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Verifications Tab */}
          {activeTab === 'verifications' && (
            <div className="divide-y divide-jm-gray-200">
              {verifications.map((verification) => (
                <div key={verification.id} className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-sans text-xl font-semibold text-jm-gray-900 mb-2">
                        {verification.vip.name}
                      </h3>
                      <p className="font-sans text-sm text-jm-gray-600 mb-1">
                        User ID: {verification.vip.userId}
                      </p>
                      <p className="font-sans text-sm text-jm-gray-600 mb-1">
                        {verification.vip.age} years old • {verification.vip.location}
                      </p>
                      <p className="font-sans text-sm text-jm-gray-600 mb-4">
                        Document: {verification.documentType}
                      </p>

                      <div className="flex items-center gap-4 mb-4">
                        <div className="flex items-center gap-2">
                          <span className={`w-3 h-3 rounded-full ${
                            verification.videoKYC === 'Submitted' ? 'bg-jm-success' : 'bg-yellow-500'
                          }`}></span>
                          <span className="font-sans text-sm text-jm-gray-700">
                            Video KYC: {verification.videoKYC}
                          </span>
                        </div>
                        <span className="text-jm-gray-400">•</span>
                        <span className="font-sans text-xs text-jm-gray-500">
                          Submitted {verification.submittedAt}
                        </span>
                      </div>

                      <div className="flex gap-3">
                        <button className="bg-gradient-jm text-white font-sans font-semibold px-6 py-2 rounded-lg hover:opacity-90 transition-opacity text-sm">
                          Review Documents
                        </button>
                        {verification.videoKYC === 'Submitted' && (
                          <button className="bg-jm-success text-white font-sans font-semibold px-6 py-2 rounded-lg hover:opacity-90 transition-opacity text-sm">
                            Approve Verification
                          </button>
                        )}
                        <button className="bg-red-600 text-white font-sans font-semibold px-6 py-2 rounded-lg hover:opacity-90 transition-opacity text-sm">
                          Reject Verification
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Expert Management Tab */}
          {activeTab === 'assignments' && (
            <div className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {experts.map((expert) => (
                  <div key={expert.id} className="bg-jm-gray-50 rounded-lg p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="font-sans text-lg font-semibold text-jm-gray-900 mb-1">
                          {expert.name}
                        </h3>
                        <p className="font-sans text-sm text-jm-gray-600">
                          Expert ID: {expert.id}
                        </p>
                      </div>
                      <span className={`text-xs font-semibold px-3 py-1 rounded-full ${getStatusBadge(expert.status)}`}>
                        {expert.status.replace('_', ' ').toUpperCase()}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <p className="font-sans text-xs text-jm-gray-600 mb-1">Active Clients</p>
                        <p className="font-sans text-xl font-bold text-jm-gray-900">
                          {expert.activeClients}/{expert.capacity}
                        </p>
                      </div>
                      <div>
                        <p className="font-sans text-xs text-jm-gray-600 mb-1">Rating</p>
                        <p className="font-sans text-xl font-bold text-jm-gray-900">
                          {expert.rating}/5.0
                        </p>
                      </div>
                      <div>
                        <p className="font-sans text-xs text-jm-gray-600 mb-1">Success Rate</p>
                        <p className="font-sans text-xl font-bold text-jm-gray-900">
                          {expert.successRate}%
                        </p>
                      </div>
                      <div>
                        <p className="font-sans text-xs text-jm-gray-600 mb-1">This Month</p>
                        <p className="font-sans text-xl font-bold text-jm-gray-900">
                          {expert.introductionsThisMonth} intros
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <button className="flex-1 bg-white text-jm-gray-700 font-sans font-medium px-4 py-2 rounded-lg hover:bg-jm-gray-100 transition-colors text-sm border border-jm-gray-200">
                        View Details
                      </button>
                      {expert.activeClients < expert.capacity && (
                        <button className="flex-1 bg-gradient-jm text-white font-sans font-semibold px-4 py-2 rounded-lg hover:opacity-90 transition-opacity text-sm">
                          Assign Client
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
