import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Discover() {
  const [filters, setFilters] = useState({
    ageMin: 25,
    ageMax: 40,
    location: 'all',
    tier: 'all',
  });

  // Simulated profile data
  const profiles = [
    {
      id: 1,
      name: 'Amara O.',
      age: 29,
      location: 'Lagos, Nigeria',
      profession: 'Corporate Professional',
      tier: 3,
      subscription: 'Premium',
      verified: true,
      compatibility: 92,
      image: '/images/profiles/women/woman-professional-corporate.png',
      interests: ['Family Values', 'Career', 'Travel'],
    },
    {
      id: 2,
      name: 'Chidi K.',
      age: 32,
      location: 'Abuja, Nigeria',
      profession: 'Tech Professional',
      tier: 4,
      subscription: 'Premium',
      verified: true,
      compatibility: 88,
      image: '/images/profiles/men/man-tech-professional.png',
      interests: ['Faith', 'Entrepreneurship', 'Fitness'],
    },
    {
      id: 3,
      name: 'Folake A.',
      age: 28,
      location: 'London, UK',
      profession: 'Lawyer',
      tier: 3,
      subscription: 'Premium',
      verified: true,
      compatibility: 85,
      image: '/images/profiles/women/woman-lawyer-business.png',
      interests: ['Traditional Values', 'Arts', 'Community'],
    },
    {
      id: 4,
      name: 'Dr. Emeka N.',
      age: 34,
      location: 'Lagos, Nigeria',
      profession: 'Medical Doctor',
      tier: 5,
      subscription: 'VIP',
      verified: true,
      compatibility: 94,
      image: '/images/profiles/men/man-doctor-healthcare.png',
      interests: ['Healthcare', 'Family', 'Philanthropy'],
    },
    {
      id: 5,
      name: 'Ngozi M.',
      age: 27,
      location: 'Port Harcourt, Nigeria',
      profession: 'Educator',
      tier: 3,
      subscription: 'Free',
      verified: false,
      compatibility: 81,
      image: '/images/profiles/women/woman-educator-teacher.png',
      interests: ['Education', 'Reading', 'Cooking'],
    },
    {
      id: 6,
      name: 'Tunde B.',
      age: 31,
      location: 'Abuja, Nigeria',
      profession: 'Finance Analyst',
      tier: 4,
      subscription: 'Premium',
      verified: true,
      compatibility: 89,
      image: '/images/profiles/men/man-finance-analyst.png',
      interests: ['Investments', 'Sports', 'Music'],
    },
    {
      id: 7,
      name: 'Kemi L.',
      age: 30,
      location: 'Lagos, Nigeria',
      profession: 'Entrepreneur',
      tier: 4,
      subscription: 'Premium',
      verified: true,
      compatibility: 87,
      image: '/images/profiles/women/woman-entrepreneur-business.png',
      interests: ['Business', 'Innovation', 'Fashion'],
    },
    {
      id: 8,
      name: 'Ibrahim A.',
      age: 33,
      location: 'Kano, Nigeria',
      profession: 'Engineer',
      tier: 3,
      subscription: 'Premium',
      verified: true,
      compatibility: 83,
      image: '/images/profiles/men/man-engineer-industrial.png',
      interests: ['Technology', 'Architecture', 'Travel'],
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
              <Link to="/app/discover" className="font-sans text-jm-coral font-semibold">
                Discover
              </Link>
              <Link to="/app/interests" className="font-sans text-jm-gray-700 hover:text-jm-coral transition-colors">
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
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="font-serif text-3xl font-bold text-jm-gray-900 mb-2">
            Discover Compatible Matches
          </h1>
          <p className="font-sans text-jm-gray-600">
            {profiles.length} profiles match your preferences
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl border border-jm-gray-200 p-6 mb-8">
          <div className="flex items-center gap-2 mb-4">
            <svg className="w-5 h-5 text-jm-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
            </svg>
            <h2 className="font-sans text-lg font-semibold text-jm-gray-900">Filters</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block font-sans text-sm font-medium text-jm-gray-700 mb-2">
                Age Range
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  value={filters.ageMin}
                  onChange={(e) => setFilters({...filters, ageMin: e.target.value})}
                  className="w-full px-3 py-2 border border-jm-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-jm-coral"
                  placeholder="Min"
                />
                <span className="text-jm-gray-500">-</span>
                <input
                  type="number"
                  value={filters.ageMax}
                  onChange={(e) => setFilters({...filters, ageMax: e.target.value})}
                  className="w-full px-3 py-2 border border-jm-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-jm-coral"
                  placeholder="Max"
                />
              </div>
            </div>

            <div>
              <label className="block font-sans text-sm font-medium text-jm-gray-700 mb-2">
                Location
              </label>
              <select
                value={filters.location}
                onChange={(e) => setFilters({...filters, location: e.target.value})}
                className="w-full px-3 py-2 border border-jm-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-jm-coral"
              >
                <option value="all">All Locations</option>
                <option value="lagos">Lagos</option>
                <option value="abuja">Abuja</option>
                <option value="portharcourt">Port Harcourt</option>
                <option value="diaspora">Diaspora</option>
              </select>
            </div>

            <div>
              <label className="block font-sans text-sm font-medium text-jm-gray-700 mb-2">
                Minimum Tier
              </label>
              <select
                value={filters.tier}
                onChange={(e) => setFilters({...filters, tier: e.target.value})}
                className="w-full px-3 py-2 border border-jm-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-jm-coral"
              >
                <option value="all">All Tiers</option>
                <option value="1">Tier 1+</option>
                <option value="2">Tier 2+</option>
                <option value="3">Tier 3+</option>
                <option value="4">Tier 4+</option>
                <option value="5">Tier 5</option>
              </select>
            </div>

            <div className="flex items-end">
              <button className="w-full bg-gradient-jm text-white font-sans font-semibold px-6 py-2 rounded-lg hover:opacity-90 transition-opacity">
                Apply Filters
              </button>
            </div>
          </div>
        </div>

        {/* Profiles Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {profiles.map((profile) => (
            <div
              key={profile.id}
              className="bg-white rounded-xl border border-jm-gray-200 overflow-hidden hover:shadow-lg transition-shadow"
            >
              {/* Profile Image */}
              <div className="relative h-64">
                <img
                  src={profile.image}
                  alt={profile.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 right-3 flex flex-col gap-2">
                  {profile.verified && (
                    <span className="bg-jm-success text-white text-xs font-semibold px-2 py-1 rounded-full flex items-center gap-1">
                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                      </svg>
                      Verified
                    </span>
                  )}
                  <span className="bg-white/90 backdrop-blur-sm text-jm-gray-900 text-xs font-semibold px-2 py-1 rounded-full">
                    {profile.compatibility}% Match
                  </span>
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                  <h3 className="font-serif text-xl font-bold text-white drop-shadow-lg">
                    {profile.name}, {profile.age}
                  </h3>
                  <p className="font-sans text-sm text-white/90 drop-shadow-md">
                    {profile.location}
                  </p>
                </div>
              </div>

              {/* Profile Info */}
              <div className="p-4">
                <p className="font-sans text-sm text-jm-gray-700 mb-3">
                  {profile.profession}
                </p>

                <div className="flex items-center gap-2 mb-4">
                  <span className="inline-block px-2 py-1 bg-jm-purple-deep/10 text-jm-purple-deep text-xs rounded-full font-medium">
                    Tier {profile.tier}
                  </span>
                  <span className={`inline-block px-2 py-1 text-xs rounded-full font-medium ${
                    profile.subscription === 'VIP' ? 'bg-yellow-100 text-yellow-800' :
                    profile.subscription === 'Premium' ? 'bg-jm-coral/10 text-jm-coral' :
                    'bg-jm-gray-100 text-jm-gray-600'
                  }`}>
                    {profile.subscription}
                  </span>
                </div>

                <div className="flex flex-wrap gap-1 mb-4">
                  {profile.interests.slice(0, 2).map((interest, index) => (
                    <span
                      key={index}
                      className="inline-block px-2 py-1 bg-jm-gray-100 text-jm-gray-600 text-xs rounded-full"
                    >
                      {interest}
                    </span>
                  ))}
                  {profile.interests.length > 2 && (
                    <span className="inline-block px-2 py-1 bg-jm-gray-100 text-jm-gray-600 text-xs rounded-full">
                      +{profile.interests.length - 2}
                    </span>
                  )}
                </div>

                <div className="flex gap-2">
                  <Link
                    to={`/app/profile/${profile.id}`}
                    className="flex-1 bg-jm-gray-100 text-jm-gray-700 font-sans font-medium px-4 py-2 rounded-lg hover:bg-jm-gray-200 transition-colors text-center text-sm"
                  >
                    View Profile
                  </Link>
                  <button className="flex-1 bg-gradient-jm text-white font-sans font-semibold px-4 py-2 rounded-lg hover:opacity-90 transition-opacity text-sm">
                    Show Interest
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
