import { Link } from 'react-router-dom';
import { useState } from 'react';

export default function ModeratorDashboard() {
  const [activeTab, setActiveTab] = useState('reports'); // reports | photos | profiles

  // Simulated moderator state
  const currentModerator = {
    name: 'Chidi K.',
    role: 'moderator',
    email: 'moderator@joymatcher.com',
  };

  // Simulated stats
  const stats = {
    reportsResolved: 18,
    photosReviewed: 67,
    suspensionsIssued: 3,
    warningsIssued: 8,
    averageResponseTime: '1.5 hours',
  };

  // Simulated reports queue
  const reports = [
    {
      id: 4821,
      type: 'Harassment',
      severity: 'HIGH',
      reporter: { name: 'Ngozi M.', id: 11223 },
      reported: { name: 'Emeka T.', id: 44556 },
      reason: 'Multiple unwanted messages after decline',
      evidence: '4 messages attached',
      submittedAt: '2 hours ago',
      status: 'pending',
    },
    {
      id: 4820,
      type: 'Inappropriate Content',
      severity: 'CRITICAL',
      reporter: { name: 'Amara O.', id: 78901 },
      reported: { name: 'John D.', id: 55667 },
      reason: 'Explicit content in messages',
      evidence: '2 messages flagged',
      submittedAt: '4 hours ago',
      status: 'pending',
    },
    {
      id: 4819,
      type: 'Fake Profile',
      severity: 'HIGH',
      reporter: { name: 'Tunde B.', id: 33445 },
      reported: { name: 'Jennifer W.', id: 55443 },
      reason: 'Suspected catfishing, stock photos',
      evidence: 'Reverse image search results',
      submittedAt: '6 hours ago',
      status: 'pending',
    },
    {
      id: 4818,
      type: 'Inappropriate Message',
      severity: 'MEDIUM',
      reporter: { name: 'Kemi L.', id: 99887 },
      reported: { name: 'David M.', id: 22334 },
      reason: 'Rude and disrespectful language',
      evidence: '1 message flagged',
      submittedAt: '1 day ago',
      status: 'pending',
    },
  ];

  // Simulated photo queue
  const photos = [
    {
      id: 1,
      user: { name: 'Amara O.', id: 12345 },
      photoType: 'Primary Profile Photo',
      uploadedAt: '2 hours ago',
      subscription: 'Premium',
      previousPhotos: { approved: 2, rejected: 0 },
      imageUrl: '/images/profiles/women/woman-professional-corporate.png',
    },
    {
      id: 2,
      user: { name: 'Emeka K.', id: 67890 },
      photoType: 'Secondary Photo',
      uploadedAt: '4 hours ago',
      subscription: 'Free',
      previousPhotos: { approved: 1, rejected: 1 },
      imageUrl: '/images/profiles/men/man-tech-professional.png',
    },
    {
      id: 3,
      user: { name: 'Chidinma A.', id: 54321 },
      photoType: 'Primary Profile Photo',
      uploadedAt: '5 hours ago',
      subscription: 'Premium',
      previousPhotos: { approved: 3, rejected: 0 },
      imageUrl: '/images/profiles/women/woman-entrepreneur-business.png',
    },
  ];

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'CRITICAL':
        return 'bg-red-100 text-red-800';
      case 'HIGH':
        return 'bg-orange-100 text-orange-800';
      case 'MEDIUM':
        return 'bg-yellow-100 text-yellow-800';
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
                  Moderation Dashboard
                </h1>
                <p className="font-sans text-sm text-jm-gray-600">Content Moderator</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-jm-purple-deep to-jm-coral flex items-center justify-center text-white font-semibold text-sm">
                {currentModerator.name.charAt(0)}
              </div>
              <span className="font-sans text-sm text-jm-gray-700">{currentModerator.name}</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Performance Stats */}
        <div className="mb-8">
          <h2 className="font-serif text-2xl font-bold text-jm-gray-900 mb-4">
            Your Stats Today
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            <div className="bg-white rounded-xl p-6 border border-jm-gray-200">
              <p className="font-serif text-3xl font-bold text-jm-gray-900 mb-1">
                {stats.reportsResolved}
              </p>
              <p className="font-sans text-sm text-jm-gray-600">Reports Resolved</p>
            </div>
            <div className="bg-white rounded-xl p-6 border border-jm-gray-200">
              <p className="font-serif text-3xl font-bold text-jm-gray-900 mb-1">
                {stats.photosReviewed}
              </p>
              <p className="font-sans text-sm text-jm-gray-600">Photos Reviewed</p>
            </div>
            <div className="bg-white rounded-xl p-6 border border-jm-gray-200">
              <p className="font-serif text-3xl font-bold text-jm-gray-900 mb-1">
                {stats.warningsIssued}
              </p>
              <p className="font-sans text-sm text-jm-gray-600">Warnings Issued</p>
            </div>
            <div className="bg-white rounded-xl p-6 border border-jm-gray-200">
              <p className="font-serif text-3xl font-bold text-jm-gray-900 mb-1">
                {stats.suspensionsIssued}
              </p>
              <p className="font-sans text-sm text-jm-gray-600">Suspensions</p>
            </div>
            <div className="bg-white rounded-xl p-6 border border-jm-gray-200">
              <p className="font-serif text-3xl font-bold text-jm-gray-900 mb-1">
                {stats.averageResponseTime}
              </p>
              <p className="font-sans text-sm text-jm-gray-600">Avg Response Time</p>
            </div>
          </div>
        </div>

        {/* Moderation Tabs */}
        <div className="bg-white rounded-xl border border-jm-gray-200">
          {/* Tab Navigation */}
          <div className="border-b border-jm-gray-200">
            <nav className="flex">
              <button
                onClick={() => setActiveTab('reports')}
                className={`flex-1 px-6 py-4 font-sans text-sm font-semibold transition-colors ${
                  activeTab === 'reports'
                    ? 'text-jm-coral border-b-2 border-jm-coral'
                    : 'text-jm-gray-600 hover:text-jm-gray-900'
                }`}
              >
                Reports Queue ({reports.length})
              </button>
              <button
                onClick={() => setActiveTab('photos')}
                className={`flex-1 px-6 py-4 font-sans text-sm font-semibold transition-colors ${
                  activeTab === 'photos'
                    ? 'text-jm-coral border-b-2 border-jm-coral'
                    : 'text-jm-gray-600 hover:text-jm-gray-900'
                }`}
              >
                Photo Moderation ({photos.length})
              </button>
              <button
                onClick={() => setActiveTab('profiles')}
                className={`flex-1 px-6 py-4 font-sans text-sm font-semibold transition-colors ${
                  activeTab === 'profiles'
                    ? 'text-jm-coral border-b-2 border-jm-coral'
                    : 'text-jm-gray-600 hover:text-jm-gray-900'
                }`}
              >
                Profile Reviews (8)
              </button>
            </nav>
          </div>

          {/* Reports Tab */}
          {activeTab === 'reports' && (
            <div className="divide-y divide-jm-gray-200">
              {reports.map((report) => (
                <div key={report.id} className="p-6 hover:bg-jm-gray-50 transition-colors">
                  <div className="flex items-start gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-sans text-lg font-semibold text-jm-gray-900">
                          Report #{report.id}
                        </h3>
                        <span className={`text-xs font-semibold px-2 py-1 rounded-full ${getSeverityColor(report.severity)}`}>
                          {report.severity}
                        </span>
                        <span className="text-xs font-semibold px-2 py-1 rounded-full bg-jm-purple-deep/10 text-jm-purple-deep">
                          {report.type}
                        </span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <p className="font-sans text-sm font-medium text-jm-gray-700 mb-1">Reporter:</p>
                          <p className="font-sans text-sm text-jm-gray-600">
                            {report.reporter.name} (ID: {report.reporter.id})
                          </p>
                        </div>
                        <div>
                          <p className="font-sans text-sm font-medium text-jm-gray-700 mb-1">Reported User:</p>
                          <p className="font-sans text-sm text-jm-gray-600">
                            {report.reported.name} (ID: {report.reported.id})
                          </p>
                        </div>
                      </div>

                      <div className="mb-4">
                        <p className="font-sans text-sm font-medium text-jm-gray-700 mb-1">Reason:</p>
                        <p className="font-sans text-sm text-jm-gray-900">{report.reason}</p>
                      </div>

                      <div className="flex items-center gap-3 mb-4">
                        <span className="font-sans text-xs text-jm-gray-500">{report.evidence}</span>
                        <span className="text-jm-gray-400">•</span>
                        <span className="font-sans text-xs text-jm-gray-500">Submitted {report.submittedAt}</span>
                      </div>

                      <div className="flex gap-3">
                        <button className="bg-gradient-jm text-white font-sans font-semibold px-6 py-2 rounded-lg hover:opacity-90 transition-opacity text-sm">
                          Review Report
                        </button>
                        <button className="bg-jm-gray-100 text-jm-gray-700 font-sans font-semibold px-6 py-2 rounded-lg hover:bg-jm-gray-200 transition-colors text-sm">
                          View User Profile
                        </button>
                        <button className="bg-red-100 text-red-700 font-sans font-semibold px-6 py-2 rounded-lg hover:bg-red-200 transition-colors text-sm">
                          Escalate to Super Admin
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Photos Tab */}
          {activeTab === 'photos' && (
            <div className="divide-y divide-jm-gray-200">
              {photos.map((photo) => (
                <div key={photo.id} className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Photo Preview */}
                    <div>
                      <div className="aspect-square bg-jm-gray-100 rounded-lg overflow-hidden mb-4">
                        <img
                          src={photo.imageUrl}
                          alt={photo.user.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <p className="font-sans text-sm text-jm-gray-600 text-center">
                        {photo.photoType}
                      </p>
                    </div>

                    {/* Photo Details */}
                    <div>
                      <div className="mb-4">
                        <h3 className="font-sans text-lg font-semibold text-jm-gray-900 mb-2">
                          {photo.user.name}
                        </h3>
                        <p className="font-sans text-sm text-jm-gray-600 mb-1">
                          User ID: {photo.user.id}
                        </p>
                        <p className="font-sans text-sm text-jm-gray-600 mb-1">
                          Subscription: {photo.subscription}
                        </p>
                        <p className="font-sans text-sm text-jm-gray-600">
                          Uploaded: {photo.uploadedAt}
                        </p>
                      </div>

                      <div className="mb-6 p-4 bg-jm-gray-50 rounded-lg">
                        <p className="font-sans text-sm font-medium text-jm-gray-700 mb-2">
                          Photo History:
                        </p>
                        <p className="font-sans text-sm text-jm-gray-600">
                          {photo.previousPhotos.approved} approved, {photo.previousPhotos.rejected} rejected
                        </p>
                      </div>

                      <div className="space-y-3">
                        <button className="w-full bg-jm-success text-white font-sans font-semibold px-6 py-3 rounded-lg hover:opacity-90 transition-opacity">
                          Approve Photo
                        </button>
                        <button className="w-full bg-red-600 text-white font-sans font-semibold px-6 py-3 rounded-lg hover:opacity-90 transition-opacity">
                          Reject Photo
                        </button>
                        <button className="w-full bg-yellow-500 text-white font-sans font-semibold px-6 py-3 rounded-lg hover:opacity-90 transition-opacity">
                          Request Re-upload
                        </button>
                      </div>

                      <div className="mt-4">
                        <label className="block font-sans text-sm font-medium text-jm-gray-700 mb-2">
                          Rejection Reason:
                        </label>
                        <select className="w-full px-3 py-2 border border-jm-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-jm-coral">
                          <option>Face not visible</option>
                          <option>Inappropriate content</option>
                          <option>Poor quality</option>
                          <option>Not a photo of user</option>
                          <option>Other</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Profiles Tab */}
          {activeTab === 'profiles' && (
            <div className="p-6">
              <p className="font-sans text-sm text-jm-gray-600 text-center py-12">
                Profile content reviews will appear here
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
