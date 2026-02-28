import { Link } from 'react-router-dom';
import { useState } from 'react';

export default function Notifications() {
  const [filter, setFilter] = useState('all'); // all | matches | messages | system

  // Simulated notifications
  const notifications = [
    {
      id: 1,
      type: 'match',
      icon: 'users',
      title: 'New Match',
      message: 'You and Amara O. have a 92% compatibility match!',
      timestamp: '10 minutes ago',
      read: false,
      actionLink: '/app/profile/78901',
      actionText: 'View Profile',
    },
    {
      id: 2,
      type: 'message',
      icon: 'message',
      title: 'New Message',
      message: 'Blessing I. sent you a message',
      timestamp: '1 hour ago',
      read: false,
      actionLink: '/app/messages',
      actionText: 'View Message',
    },
    {
      id: 3,
      type: 'interest',
      icon: 'heart',
      title: 'Show Interest Accepted',
      message: 'Chidinma E. accepted your Show Interest request',
      timestamp: '2 hours ago',
      read: false,
      actionLink: '/app/messages',
      actionText: 'Send Message',
    },
    {
      id: 4,
      type: 'system',
      icon: 'info',
      title: 'Profile Completion',
      message: 'Complete Tier 4 to unlock more features and connect with verified members',
      timestamp: '5 hours ago',
      read: true,
      actionLink: '/app/profile',
      actionText: 'Complete Profile',
    },
    {
      id: 5,
      type: 'interest',
      icon: 'heart',
      title: 'New Show Interest',
      message: 'Ngozi M. sent you a Show Interest request',
      timestamp: '1 day ago',
      read: true,
      actionLink: '/app/interests',
      actionText: 'View Request',
    },
    {
      id: 6,
      type: 'message',
      icon: 'message',
      title: 'New Message',
      message: 'Amara O. sent you a message',
      timestamp: '1 day ago',
      read: true,
      actionLink: '/app/messages',
      actionText: 'View Message',
    },
    {
      id: 7,
      type: 'match',
      icon: 'users',
      title: 'New Match',
      message: 'You and Kemi L. have a 87% compatibility match!',
      timestamp: '2 days ago',
      read: true,
      actionLink: '/app/profile/99887',
      actionText: 'View Profile',
    },
    {
      id: 8,
      type: 'system',
      icon: 'star',
      title: 'Premium Benefits',
      message: 'See who\'s interested in you! Upgrade to Premium to unlock this feature',
      timestamp: '3 days ago',
      read: true,
      actionLink: '/pricing',
      actionText: 'View Plans',
    },
    {
      id: 9,
      type: 'interest',
      icon: 'heart',
      title: 'Show Interest Declined',
      message: 'Your Show Interest to Folake A. was declined',
      timestamp: '1 week ago',
      read: true,
      actionLink: null,
      actionText: null,
    },
  ];

  const filteredNotifications = notifications.filter(notif => {
    if (filter === 'all') return true;
    if (filter === 'matches') return notif.type === 'match';
    if (filter === 'messages') return notif.type === 'message';
    if (filter === 'system') return notif.type === 'system' || notif.type === 'interest';
    return true;
  });

  const unreadCount = notifications.filter(n => !n.read).length;

  const getIcon = (iconType) => {
    switch (iconType) {
      case 'users':
        return (
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
          </svg>
        );
      case 'message':
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        );
      case 'heart':
        return (
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
          </svg>
        );
      case 'star':
        return (
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        );
      default:
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
    }
  };

  const getIconColor = (type) => {
    switch (type) {
      case 'match':
        return 'bg-jm-success-light text-jm-success';
      case 'message':
        return 'bg-jm-purple-deep/10 text-jm-purple-deep';
      case 'interest':
        return 'bg-jm-coral/10 text-jm-coral';
      default:
        return 'bg-jm-gray-100 text-jm-gray-600';
    }
  };

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
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="font-serif text-3xl font-bold text-jm-gray-900 mb-2">
            Notifications
          </h1>
          <p className="font-sans text-jm-gray-600">
            {unreadCount > 0 ? `${unreadCount} unread notifications` : 'All caught up!'}
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl border border-jm-gray-200 p-4 mb-6">
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-lg font-sans text-sm font-medium transition-colors ${
                filter === 'all'
                  ? 'bg-gradient-jm text-white'
                  : 'bg-jm-gray-100 text-jm-gray-700 hover:bg-jm-gray-200'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setFilter('matches')}
              className={`px-4 py-2 rounded-lg font-sans text-sm font-medium transition-colors ${
                filter === 'matches'
                  ? 'bg-gradient-jm text-white'
                  : 'bg-jm-gray-100 text-jm-gray-700 hover:bg-jm-gray-200'
              }`}
            >
              Matches
            </button>
            <button
              onClick={() => setFilter('messages')}
              className={`px-4 py-2 rounded-lg font-sans text-sm font-medium transition-colors ${
                filter === 'messages'
                  ? 'bg-gradient-jm text-white'
                  : 'bg-jm-gray-100 text-jm-gray-700 hover:bg-jm-gray-200'
              }`}
            >
              Messages
            </button>
            <button
              onClick={() => setFilter('system')}
              className={`px-4 py-2 rounded-lg font-sans text-sm font-medium transition-colors ${
                filter === 'system'
                  ? 'bg-gradient-jm text-white'
                  : 'bg-jm-gray-100 text-jm-gray-700 hover:bg-jm-gray-200'
              }`}
            >
              System & Interests
            </button>
          </div>
        </div>

        {/* Notifications List */}
        <div className="bg-white rounded-xl border border-jm-gray-200 divide-y divide-jm-gray-200">
          {filteredNotifications.length > 0 ? (
            filteredNotifications.map((notification) => (
              <div
                key={notification.id}
                className={`p-6 hover:bg-jm-gray-50 transition-colors ${
                  !notification.read ? 'bg-jm-coral/5' : ''
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${getIconColor(notification.type)}`}>
                    {getIcon(notification.icon)}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <h3 className="font-sans text-base font-semibold text-jm-gray-900">
                          {notification.title}
                        </h3>
                        {!notification.read && (
                          <span className="w-2 h-2 bg-jm-coral rounded-full"></span>
                        )}
                      </div>
                      <span className="font-sans text-xs text-jm-gray-500 ml-4 flex-shrink-0">
                        {notification.timestamp}
                      </span>
                    </div>

                    <p className="font-sans text-sm text-jm-gray-600 mb-3">
                      {notification.message}
                    </p>

                    {notification.actionLink && (
                      <Link
                        to={notification.actionLink}
                        className="inline-block bg-gradient-jm text-white font-sans font-semibold px-4 py-2 rounded-lg hover:opacity-90 transition-opacity text-sm"
                      >
                        {notification.actionText}
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="p-12 text-center">
              <svg className="mx-auto h-12 w-12 text-jm-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              <h3 className="font-sans text-lg font-semibold text-jm-gray-900 mb-2">
                No notifications
              </h3>
              <p className="font-sans text-sm text-jm-gray-600">
                You don't have any notifications in this category yet
              </p>
            </div>
          )}
        </div>

        {/* Mark All as Read */}
        {unreadCount > 0 && (
          <div className="mt-6 text-center">
            <button className="font-sans text-sm text-jm-coral hover:underline font-medium">
              Mark all as read
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
