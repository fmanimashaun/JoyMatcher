import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';

export default function ProfileView() {
  const { id } = useParams();
  const [showInterestModal, setShowInterestModal] = useState(false);

  // Simulated current user
  const currentUser = {
    completedTier: 3,
    sharedTier: 3, // What tier they've chosen to share with this person
  };

  // Simulated profile data
  const profile = {
    id: 1,
    name: 'Amara O.',
    age: 29,
    location: 'Lagos, Nigeria',
    profession: 'Corporate Professional',
    completedTier: 4,
    sharedTier: 3, // What tier they've chosen to share
    subscription: 'Premium',
    verified: true,
    image: '/images/profiles/women/woman-professional-corporate.png',

    // EDT Calculation: min(3, 4, 3, 3) = 3
    effectiveDisclosureTier: 3,

    // Tier 1: Identity (always visible if EDT >= 1)
    tier1: {
      fullName: 'Amara Okonkwo',
      age: 29,
      gender: 'Female',
      location: 'Lagos, Nigeria',
      ethnicity: 'Igbo',
      religion: 'Christian (Catholic)',
    },

    // Tier 2: Lifestyle (visible if EDT >= 2)
    tier2: {
      education: 'MBA, Lagos Business School',
      profession: 'Corporate Strategy Manager',
      company: 'Multinational Corporation',
      income: '₦8M - ₦12M annually',
      lifestyle: 'Professional, balanced work-life',
      interests: ['Reading', 'Travel', 'Fitness', 'Cooking'],
    },

    // Tier 3: Family Background (visible if EDT >= 3)
    tier3: {
      familyValues: 'Traditional with modern outlook',
      parentsMaritalStatus: 'Married 35+ years',
      siblings: '2 siblings',
      familyRole: 'First daughter',
      expectations: 'Marriage within 1-2 years',
      childrenDesire: 'Yes, 2-3 children',
    },

    // Tier 4: Health & Medical (visible if EDT >= 4)
    tier4: {
      locked: true,
      message: 'Complete Tier 4 to unlock health information',
    },

    // Tier 5: Verified Identity (visible if EDT >= 5)
    tier5: {
      locked: true,
      message: 'Complete Tier 5 verification to see verified identity',
    },
  };

  return (
    <div className="min-h-screen bg-jm-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-jm-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link to="/app/discover" className="flex items-center gap-2 text-jm-gray-600 hover:text-jm-gray-900 transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Discover
            </Link>

            <Link to="/app/dashboard" className="flex items-center gap-2">
              <img src="/images/logo-transparent.svg" alt="JoyMatcher" className="w-8 h-8" />
              <span className="font-serif text-xl font-bold bg-gradient-jm bg-clip-text text-transparent">
                JoyMatcher
              </span>
            </Link>

            <Link to="/app/profile" className="w-10 h-10 rounded-full bg-gradient-to-br from-jm-purple-deep to-jm-coral flex items-center justify-center text-white font-semibold">
              K
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Profile Header */}
        <div className="bg-white rounded-xl border border-jm-gray-200 overflow-hidden mb-6">
          <div className="md:flex">
            {/* Profile Image */}
            <div className="md:w-2/5 relative">
              <img
                src={profile.image}
                alt={profile.name}
                className="w-full h-96 md:h-full object-cover"
              />
              {profile.verified && (
                <div className="absolute top-4 right-4 bg-jm-success text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                  </svg>
                  Verified
                </div>
              )}
            </div>

            {/* Profile Info */}
            <div className="md:w-3/5 p-8">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="font-serif text-3xl font-bold text-jm-gray-900 mb-2">
                    {profile.name}, {profile.age}
                  </h1>
                  <p className="font-sans text-lg text-jm-gray-600 mb-3">
                    {profile.profession}
                  </p>
                  <p className="font-sans text-sm text-jm-gray-500">
                    {profile.location}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 mb-6">
                <span className="inline-block px-3 py-1 bg-jm-purple-deep/10 text-jm-purple-deep text-sm rounded-full font-semibold">
                  Completed Tier {profile.completedTier}
                </span>
                <span className={`inline-block px-3 py-1 text-sm rounded-full font-semibold ${
                  profile.subscription === 'VIP' ? 'bg-yellow-100 text-yellow-800' :
                  profile.subscription === 'Premium' ? 'bg-jm-coral/10 text-jm-coral' :
                  'bg-jm-gray-100 text-jm-gray-600'
                }`}>
                  {profile.subscription}
                </span>
              </div>

              {/* EDT Display */}
              <div className="bg-gradient-to-br from-jm-purple-deep/10 to-jm-coral/10 rounded-lg p-6 mb-6">
                <div className="flex items-center gap-3 mb-3">
                  <svg className="w-6 h-6 text-jm-purple-deep" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"/>
                  </svg>
                  <h3 className="font-sans text-lg font-bold text-jm-gray-900">
                    Effective Disclosure Tier: {profile.effectiveDisclosureTier}
                  </h3>
                </div>
                <p className="font-sans text-sm text-jm-gray-700 mb-3">
                  You can see Tier {profile.effectiveDisclosureTier} information. This is calculated as:
                </p>
                <div className="bg-white/50 rounded-lg p-4 font-mono text-xs">
                  <code className="text-jm-gray-800">
                    EDT = min(<br/>
                    &nbsp;&nbsp;Your Completed: {currentUser.completedTier},<br/>
                    &nbsp;&nbsp;Their Completed: {profile.completedTier},<br/>
                    &nbsp;&nbsp;You Shared: {currentUser.sharedTier},<br/>
                    &nbsp;&nbsp;They Shared: {profile.sharedTier}<br/>
                    ) = {profile.effectiveDisclosureTier}
                  </code>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <button
                  onClick={() => setShowInterestModal(true)}
                  className="flex-1 bg-gradient-jm text-white font-sans font-semibold px-6 py-3 rounded-lg hover:opacity-90 transition-opacity"
                >
                  Show Interest
                </button>
                <button className="px-6 py-3 border-2 border-jm-gray-300 text-jm-gray-700 font-sans font-semibold rounded-lg hover:border-jm-coral hover:text-jm-coral transition-colors">
                  Request More Details
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Tiered Information */}
        <div className="space-y-6">
          {/* Tier 1: Identity */}
          <div className="bg-white rounded-xl border border-jm-gray-200 p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"/>
                </svg>
              </div>
              <div>
                <h2 className="font-serif text-xl font-bold text-jm-gray-900">Tier 1: Identity</h2>
                <p className="font-sans text-xs text-green-600 font-semibold">Unlocked</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="font-sans text-sm text-jm-gray-500 mb-1">Full Name</p>
                <p className="font-sans text-base text-jm-gray-900 font-semibold">{profile.tier1.fullName}</p>
              </div>
              <div>
                <p className="font-sans text-sm text-jm-gray-500 mb-1">Age</p>
                <p className="font-sans text-base text-jm-gray-900 font-semibold">{profile.tier1.age}</p>
              </div>
              <div>
                <p className="font-sans text-sm text-jm-gray-500 mb-1">Location</p>
                <p className="font-sans text-base text-jm-gray-900 font-semibold">{profile.tier1.location}</p>
              </div>
              <div>
                <p className="font-sans text-sm text-jm-gray-500 mb-1">Ethnicity</p>
                <p className="font-sans text-base text-jm-gray-900 font-semibold">{profile.tier1.ethnicity}</p>
              </div>
              <div>
                <p className="font-sans text-sm text-jm-gray-500 mb-1">Religion</p>
                <p className="font-sans text-base text-jm-gray-900 font-semibold">{profile.tier1.religion}</p>
              </div>
            </div>
          </div>

          {/* Tier 2: Lifestyle */}
          <div className="bg-white rounded-xl border border-jm-gray-200 p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z"/>
                </svg>
              </div>
              <div>
                <h2 className="font-serif text-xl font-bold text-jm-gray-900">Tier 2: Lifestyle & Career</h2>
                <p className="font-sans text-xs text-green-600 font-semibold">Unlocked</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="font-sans text-sm text-jm-gray-500 mb-1">Education</p>
                <p className="font-sans text-base text-jm-gray-900 font-semibold">{profile.tier2.education}</p>
              </div>
              <div>
                <p className="font-sans text-sm text-jm-gray-500 mb-1">Profession</p>
                <p className="font-sans text-base text-jm-gray-900 font-semibold">{profile.tier2.profession}</p>
              </div>
              <div>
                <p className="font-sans text-sm text-jm-gray-500 mb-1">Company</p>
                <p className="font-sans text-base text-jm-gray-900 font-semibold">{profile.tier2.company}</p>
              </div>
              <div>
                <p className="font-sans text-sm text-jm-gray-500 mb-1">Income Range</p>
                <p className="font-sans text-base text-jm-gray-900 font-semibold">{profile.tier2.income}</p>
              </div>
              <div className="md:col-span-2">
                <p className="font-sans text-sm text-jm-gray-500 mb-2">Interests</p>
                <div className="flex flex-wrap gap-2">
                  {profile.tier2.interests.map((interest, index) => (
                    <span key={index} className="inline-block px-3 py-1 bg-jm-gray-100 text-jm-gray-700 text-sm rounded-full">
                      {interest}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Tier 3: Family Background */}
          <div className="bg-white rounded-xl border border-jm-gray-200 p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z"/>
                </svg>
              </div>
              <div>
                <h2 className="font-serif text-xl font-bold text-jm-gray-900">Tier 3: Family & Values</h2>
                <p className="font-sans text-xs text-green-600 font-semibold">Unlocked</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="font-sans text-sm text-jm-gray-500 mb-1">Family Values</p>
                <p className="font-sans text-base text-jm-gray-900 font-semibold">{profile.tier3.familyValues}</p>
              </div>
              <div>
                <p className="font-sans text-sm text-jm-gray-500 mb-1">Parents' Marriage</p>
                <p className="font-sans text-base text-jm-gray-900 font-semibold">{profile.tier3.parentsMaritalStatus}</p>
              </div>
              <div>
                <p className="font-sans text-sm text-jm-gray-500 mb-1">Siblings</p>
                <p className="font-sans text-base text-jm-gray-900 font-semibold">{profile.tier3.siblings}</p>
              </div>
              <div>
                <p className="font-sans text-sm text-jm-gray-500 mb-1">Marriage Timeline</p>
                <p className="font-sans text-base text-jm-gray-900 font-semibold">{profile.tier3.expectations}</p>
              </div>
              <div>
                <p className="font-sans text-sm text-jm-gray-500 mb-1">Children</p>
                <p className="font-sans text-base text-jm-gray-900 font-semibold">{profile.tier3.childrenDesire}</p>
              </div>
            </div>
          </div>

          {/* Tier 4: Health - Locked */}
          <div className="bg-jm-gray-50 rounded-xl border-2 border-dashed border-jm-gray-300 p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-jm-gray-200 rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 text-jm-gray-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd"/>
                </svg>
              </div>
              <div>
                <h2 className="font-serif text-xl font-bold text-jm-gray-500">Tier 4: Health & Medical</h2>
                <p className="font-sans text-xs text-jm-gray-400 font-semibold">Locked</p>
              </div>
            </div>

            <div className="bg-white rounded-lg p-6 text-center">
              <svg className="w-12 h-12 text-jm-gray-300 mx-auto mb-3" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd"/>
              </svg>
              <p className="font-sans text-sm text-jm-gray-600 mb-4">
                {profile.tier4.message}
              </p>
              <Link
                to="/app/profile"
                className="inline-block bg-gradient-jm text-white font-sans font-semibold px-6 py-2 rounded-lg hover:opacity-90 transition-opacity text-sm"
              >
                Complete Tier 4
              </Link>
            </div>
          </div>

          {/* Tier 5: Verified Identity - Locked */}
          <div className="bg-jm-gray-50 rounded-xl border-2 border-dashed border-jm-gray-300 p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-jm-gray-200 rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 text-jm-gray-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd"/>
                </svg>
              </div>
              <div>
                <h2 className="font-serif text-xl font-bold text-jm-gray-500">Tier 5: Verified Identity</h2>
                <p className="font-sans text-xs text-jm-gray-400 font-semibold">Locked</p>
              </div>
            </div>

            <div className="bg-white rounded-lg p-6 text-center">
              <svg className="w-12 h-12 text-jm-gray-300 mx-auto mb-3" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
              </svg>
              <p className="font-sans text-sm text-jm-gray-600 mb-4">
                {profile.tier5.message}
              </p>
              <Link
                to="/app/profile"
                className="inline-block bg-gradient-jm text-white font-sans font-semibold px-6 py-2 rounded-lg hover:opacity-90 transition-opacity text-sm"
              >
                Complete Tier 5
              </Link>
            </div>
          </div>
        </div>
      </main>

      {/* Show Interest Modal */}
      {showInterestModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-8">
            <h2 className="font-serif text-2xl font-bold text-jm-gray-900 mb-4">
              Show Interest in {profile.name}?
            </h2>
            <p className="font-sans text-sm text-jm-gray-600 mb-6">
              This will send a notification to {profile.name}. If they accept, you'll both be able to message each other.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowInterestModal(false)}
                className="flex-1 bg-jm-gray-100 text-jm-gray-700 font-sans font-semibold px-6 py-3 rounded-lg hover:bg-jm-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => setShowInterestModal(false)}
                className="flex-1 bg-gradient-jm text-white font-sans font-semibold px-6 py-3 rounded-lg hover:opacity-90 transition-opacity"
              >
                Send Interest
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
