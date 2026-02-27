import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Interests() {
  const [activeTab, setActiveTab] = useState('received'); // received | sent | mutual

  // Simulated data
  const receivedInterests = [
    {
      id: 1,
      name: 'Chidinma E.',
      age: 28,
      location: 'Lagos, Nigeria',
      profession: 'Lawyer',
      tier: 3,
      compatibility: 88,
      image: '/images/profiles/women/woman-lawyer-business.png',
      message: 'I appreciate your values and career ambitions. Would love to connect!',
      timeAgo: '2 hours ago',
    },
    {
      id: 2,
      name: 'Funmi A.',
      age: 30,
      location: 'Abuja, Nigeria',
      profession: 'Entrepreneur',
      tier: 4,
      compatibility: 85,
      image: '/images/profiles/women/woman-entrepreneur-business.png',
      message: 'Your profile caught my attention. Let\'s see if we\'re compatible!',
      timeAgo: '1 day ago',
    },
    {
      id: 3,
      name: 'Ngozi M.',
      age: 27,
      location: 'Port Harcourt, Nigeria',
      profession: 'Educator',
      tier: 3,
      compatibility: 81,
      image: '/images/profiles/women/woman-educator-teacher.png',
      message: 'Hello! I think we share similar family values.',
      timeAgo: '2 days ago',
    },
  ];

  const sentInterests = [
    {
      id: 4,
      name: 'Amara O.',
      age: 29,
      location: 'Lagos, Nigeria',
      profession: 'Corporate Professional',
      tier: 3,
      compatibility: 92,
      image: '/images/profiles/women/woman-professional-corporate.png',
      status: 'pending',
      timeAgo: '3 hours ago',
    },
    {
      id: 5,
      name: 'Kemi L.',
      age: 30,
      location: 'Lagos, Nigeria',
      profession: 'Entrepreneur',
      tier: 4,
      compatibility: 87,
      image: '/images/profiles/women/woman-entrepreneur-business.png',
      status: 'declined',
      timeAgo: '1 week ago',
    },
  ];

  const mutualInterests = [
    {
      id: 6,
      name: 'Folake A.',
      age: 28,
      location: 'London, UK',
      profession: 'Lawyer',
      tier: 3,
      compatibility: 85,
      image: '/images/profiles/women/woman-lawyer-business.png',
      lastMessage: 'Thanks for accepting! Looking forward to getting to know you.',
      timeAgo: '5 hours ago',
      unread: 2,
    },
    {
      id: 7,
      name: 'Ngozi M.',
      age: 27,
      location: 'Port Harcourt, Nigeria',
      profession: 'Educator',
      tier: 3,
      compatibility: 81,
      image: '/images/profiles/women/woman-educator-teacher.png',
      lastMessage: 'Great! When would be a good time to video chat?',
      timeAgo: '1 day ago',
      unread: 0,
    },
  ];

  return (
    <div className="min-h-screen bg-jm-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-jm-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link to="/app/dashboard" className="flex items-center gap-2">
              <img src="/images/logo-transparent.svg" alt="JoyMatcher" className="w-8 h-8" />
              <span className="font-serif text-xl font-bold bg-gradient-jm bg-clip-text text-transparent">
                JoyMatcher
              </span>
            </Link>

            <nav className="hidden md:flex items-center gap-6">
              <Link to="/app/dashboard" className="font-sans text-jm-gray-700 hover:text-jm-coral transition-colors">
                Dashboard
              </Link>
              <Link to="/app/discover" className="font-sans text-jm-gray-700 hover:text-jm-coral transition-colors">
                Discover
              </Link>
              <Link to="/app/interests" className="font-sans text-jm-coral font-semibold">
                Interests
              </Link>
              <Link to="/app/messages" className="font-sans text-jm-gray-700 hover:text-jm-coral transition-colors">
                Messages
              </Link>
            </nav>

            <Link to="/app/profile" className="w-10 h-10 rounded-full bg-gradient-to-br from-jm-purple-deep to-jm-coral flex items-center justify-center text-white font-semibold">
              K
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="font-serif text-3xl font-bold text-jm-gray-900 mb-2">
            Interests
          </h1>
          <p className="font-sans text-jm-gray-600">
            Manage your connection requests and interests
          </p>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl border border-jm-gray-200 mb-6 overflow-hidden">
          <div className="flex border-b border-jm-gray-200">
            <button
              onClick={() => setActiveTab('received')}
              className={`flex-1 px-6 py-4 font-sans font-semibold transition-colors ${
                activeTab === 'received'
                  ? 'text-jm-coral border-b-2 border-jm-coral bg-jm-coral/5'
                  : 'text-jm-gray-600 hover:text-jm-gray-900 hover:bg-jm-gray-50'
              }`}
            >
              Received ({receivedInterests.length})
            </button>
            <button
              onClick={() => setActiveTab('sent')}
              className={`flex-1 px-6 py-4 font-sans font-semibold transition-colors ${
                activeTab === 'sent'
                  ? 'text-jm-coral border-b-2 border-jm-coral bg-jm-coral/5'
                  : 'text-jm-gray-600 hover:text-jm-gray-900 hover:bg-jm-gray-50'
              }`}
            >
              Sent ({sentInterests.length})
            </button>
            <button
              onClick={() => setActiveTab('mutual')}
              className={`flex-1 px-6 py-4 font-sans font-semibold transition-colors ${
                activeTab === 'mutual'
                  ? 'text-jm-coral border-b-2 border-jm-coral bg-jm-coral/5'
                  : 'text-jm-gray-600 hover:text-jm-gray-900 hover:bg-jm-gray-50'
              }`}
            >
              Mutual ({mutualInterests.length})
            </button>
          </div>
        </div>

        {/* Received Interests */}
        {activeTab === 'received' && (
          <div className="space-y-4">
            {receivedInterests.map((interest) => (
              <div key={interest.id} className="bg-white rounded-xl border border-jm-gray-200 p-6 hover:shadow-lg transition-shadow">
                <div className="flex flex-col md:flex-row gap-6">
                  {/* Profile Image */}
                  <Link to={`/app/profile/${interest.id}`} className="flex-shrink-0">
                    <img
                      src={interest.image}
                      alt={interest.name}
                      className="w-24 h-24 rounded-xl object-cover border-2 border-jm-gray-200"
                    />
                  </Link>

                  {/* Profile Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <Link
                          to={`/app/profile/${interest.id}`}
                          className="font-serif text-xl font-bold text-jm-gray-900 hover:text-jm-coral transition-colors"
                        >
                          {interest.name}, {interest.age}
                        </Link>
                        <p className="font-sans text-sm text-jm-gray-600 mt-1">
                          {interest.profession} • {interest.location}
                        </p>
                      </div>
                      <span className="font-sans text-xs text-jm-gray-500">{interest.timeAgo}</span>
                    </div>

                    <div className="flex items-center gap-2 mb-3">
                      <span className="inline-block px-2 py-1 bg-jm-purple-deep/10 text-jm-purple-deep text-xs rounded-full font-semibold">
                        Tier {interest.tier}
                      </span>
                      <span className="inline-block px-2 py-1 bg-jm-success-light text-jm-success text-xs rounded-full font-semibold">
                        {interest.compatibility}% Match
                      </span>
                    </div>

                    <div className="bg-jm-gray-50 rounded-lg p-4 mb-4">
                      <p className="font-sans text-sm text-jm-gray-700 italic">
                        "{interest.message}"
                      </p>
                    </div>

                    <div className="flex gap-3">
                      <button className="flex-1 bg-gradient-jm text-white font-sans font-semibold px-6 py-2 rounded-lg hover:opacity-90 transition-opacity">
                        Accept
                      </button>
                      <button className="flex-1 bg-jm-gray-100 text-jm-gray-700 font-sans font-semibold px-6 py-2 rounded-lg hover:bg-jm-gray-200 transition-colors">
                        Decline
                      </button>
                      <Link
                        to={`/app/profile/${interest.id}`}
                        className="px-6 py-2 border-2 border-jm-gray-300 text-jm-gray-700 font-sans font-semibold rounded-lg hover:border-jm-coral hover:text-jm-coral transition-colors text-center"
                      >
                        View Profile
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {receivedInterests.length === 0 && (
              <div className="bg-white rounded-xl border border-jm-gray-200 p-12 text-center">
                <svg className="w-16 h-16 text-jm-gray-300 mx-auto mb-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd"/>
                </svg>
                <h3 className="font-serif text-xl font-bold text-jm-gray-900 mb-2">No Interests Yet</h3>
                <p className="font-sans text-sm text-jm-gray-600 mb-6">
                  Keep your profile updated and check back soon!
                </p>
                <Link
                  to="/app/discover"
                  className="inline-block bg-gradient-jm text-white font-sans font-semibold px-6 py-3 rounded-lg hover:opacity-90 transition-opacity"
                >
                  Discover Matches
                </Link>
              </div>
            )}
          </div>
        )}

        {/* Sent Interests */}
        {activeTab === 'sent' && (
          <div className="space-y-4">
            {sentInterests.map((interest) => (
              <div key={interest.id} className="bg-white rounded-xl border border-jm-gray-200 p-6">
                <div className="flex items-center gap-6">
                  {/* Profile Image */}
                  <Link to={`/app/profile/${interest.id}`}>
                    <img
                      src={interest.image}
                      alt={interest.name}
                      className="w-20 h-20 rounded-xl object-cover border-2 border-jm-gray-200"
                    />
                  </Link>

                  {/* Profile Info */}
                  <div className="flex-1 min-w-0">
                    <Link
                      to={`/app/profile/${interest.id}`}
                      className="font-serif text-xl font-bold text-jm-gray-900 hover:text-jm-coral transition-colors"
                    >
                      {interest.name}, {interest.age}
                    </Link>
                    <p className="font-sans text-sm text-jm-gray-600 mt-1 mb-3">
                      {interest.profession} • {interest.location}
                    </p>

                    <div className="flex items-center gap-2">
                      <span className="inline-block px-2 py-1 bg-jm-purple-deep/10 text-jm-purple-deep text-xs rounded-full font-semibold">
                        Tier {interest.tier}
                      </span>
                      <span className={`inline-block px-2 py-1 text-xs rounded-full font-semibold ${
                        interest.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        interest.status === 'declined' ? 'bg-red-100 text-red-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {interest.status === 'pending' ? 'Pending' : interest.status === 'declined' ? 'Declined' : 'Accepted'}
                      </span>
                      <span className="font-sans text-xs text-jm-gray-500">• {interest.timeAgo}</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    {interest.status === 'pending' && (
                      <button className="px-4 py-2 bg-jm-gray-100 text-jm-gray-700 font-sans font-medium rounded-lg hover:bg-jm-gray-200 transition-colors text-sm">
                        Withdraw
                      </button>
                    )}
                    <Link
                      to={`/app/profile/${interest.id}`}
                      className="px-4 py-2 border-2 border-jm-gray-300 text-jm-gray-700 font-sans font-medium rounded-lg hover:border-jm-coral hover:text-jm-coral transition-colors text-sm"
                    >
                      View Profile
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Mutual Interests */}
        {activeTab === 'mutual' && (
          <div className="space-y-4">
            {mutualInterests.map((interest) => (
              <Link
                key={interest.id}
                to="/app/messages"
                className="block bg-white rounded-xl border border-jm-gray-200 p-6 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-center gap-6">
                  {/* Profile Image */}
                  <div className="relative">
                    <img
                      src={interest.image}
                      alt={interest.name}
                      className="w-20 h-20 rounded-xl object-cover border-2 border-jm-success"
                    />
                    {interest.unread > 0 && (
                      <div className="absolute -top-2 -right-2 w-6 h-6 bg-jm-coral rounded-full flex items-center justify-center">
                        <span className="text-white text-xs font-bold">{interest.unread}</span>
                      </div>
                    )}
                  </div>

                  {/* Profile Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-serif text-xl font-bold text-jm-gray-900">
                        {interest.name}, {interest.age}
                      </h3>
                      <svg className="w-5 h-5 text-jm-success" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd"/>
                      </svg>
                    </div>
                    <p className="font-sans text-sm text-jm-gray-600 mb-3">
                      {interest.profession} • {interest.location}
                    </p>

                    <div className="bg-jm-gray-50 rounded-lg p-3">
                      <p className="font-sans text-sm text-jm-gray-700">
                        {interest.lastMessage}
                      </p>
                      <p className="font-sans text-xs text-jm-gray-500 mt-1">{interest.timeAgo}</p>
                    </div>
                  </div>

                  {/* Arrow */}
                  <svg className="w-6 h-6 text-jm-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </Link>
            ))}

            {mutualInterests.length === 0 && (
              <div className="bg-white rounded-xl border border-jm-gray-200 p-12 text-center">
                <svg className="w-16 h-16 text-jm-gray-300 mx-auto mb-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd"/>
                </svg>
                <h3 className="font-serif text-xl font-bold text-jm-gray-900 mb-2">No Mutual Interests Yet</h3>
                <p className="font-sans text-sm text-jm-gray-600 mb-6">
                  Accept interest requests or send Show Interest to start connecting!
                </p>
                <Link
                  to="/app/discover"
                  className="inline-block bg-gradient-jm text-white font-sans font-semibold px-6 py-3 rounded-lg hover:opacity-90 transition-opacity"
                >
                  Discover Matches
                </Link>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
