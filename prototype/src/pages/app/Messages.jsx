import { Link } from 'react-router-dom';
import { useState } from 'react';

export default function Messages() {
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [messageText, setMessageText] = useState('');

  // Simulated user state
  const currentUser = {
    name: 'Kwame M.',
    id: 'user_001',
  };

  // Simulated conversations
  const conversations = [
    {
      id: 1,
      matchUser: {
        name: 'Amara O.',
        id: 'user_78901',
        photo: '/images/profiles/women/woman-professional-corporate.png',
        age: 29,
        location: 'Lagos, Nigeria',
      },
      lastMessage: 'That sounds great! I\'d love to meet for coffee this weekend.',
      timestamp: '10 minutes ago',
      unreadCount: 2,
      status: 'active',
      messages: [
        {
          id: 1,
          sender: 'user_78901',
          text: 'Hi Kwame! Thanks for the Show Interest. I really enjoyed reading your profile.',
          timestamp: '2 hours ago',
        },
        {
          id: 2,
          sender: 'user_001',
          text: 'Thank you, Amara! I was drawn to your faith-centered approach to life and your career ambitions.',
          timestamp: '1 hour ago',
        },
        {
          id: 3,
          sender: 'user_78901',
          text: 'I appreciate that. I noticed we both value family and have similar views on marriage.',
          timestamp: '45 minutes ago',
        },
        {
          id: 4,
          sender: 'user_001',
          text: 'Absolutely! Would you be open to meeting for coffee sometime this week?',
          timestamp: '30 minutes ago',
        },
        {
          id: 5,
          sender: 'user_78901',
          text: 'That sounds great! I\'d love to meet for coffee this weekend.',
          timestamp: '10 minutes ago',
        },
      ],
    },
    {
      id: 2,
      matchUser: {
        name: 'Chidinma E.',
        id: 'user_78902',
        photo: '/images/profiles/women/woman-lawyer-business.png',
        age: 28,
        location: 'Abuja, Nigeria',
      },
      lastMessage: 'Thank you for your honesty. I appreciate you taking the time.',
      timestamp: '2 days ago',
      unreadCount: 0,
      status: 'active',
      messages: [
        {
          id: 1,
          sender: 'user_78902',
          text: 'Hi! I saw your profile and thought we might be a good match.',
          timestamp: '1 week ago',
        },
        {
          id: 2,
          sender: 'user_001',
          text: 'Hi Chidinma! Thanks for reaching out. I enjoyed learning about your work in law.',
          timestamp: '6 days ago',
        },
        {
          id: 3,
          sender: 'user_78902',
          text: 'After thinking it through, I realize we might be looking for different things. I wish you all the best!',
          timestamp: '3 days ago',
        },
        {
          id: 4,
          sender: 'user_001',
          text: 'Thank you for your honesty. I appreciate you taking the time.',
          timestamp: '2 days ago',
        },
      ],
    },
    {
      id: 3,
      matchUser: {
        name: 'Blessing I.',
        id: 'user_78903',
        photo: '/images/profiles/women/woman-entrepreneur-business.png',
        age: 30,
        location: 'Lagos, Nigeria',
      },
      lastMessage: 'Looking forward to our call tomorrow!',
      timestamp: '1 day ago',
      unreadCount: 1,
      status: 'active',
      messages: [
        {
          id: 1,
          sender: 'user_001',
          text: 'Hi Blessing! I loved your perspective on entrepreneurship and building a family business together.',
          timestamp: '5 days ago',
        },
        {
          id: 2,
          sender: 'user_78903',
          text: 'Thank you! I was impressed by your career journey and your commitment to faith.',
          timestamp: '4 days ago',
        },
        {
          id: 3,
          sender: 'user_001',
          text: 'Would you be open to a video call this week? I\'d love to learn more about your vision.',
          timestamp: '2 days ago',
        },
        {
          id: 4,
          sender: 'user_78903',
          text: 'Looking forward to our call tomorrow!',
          timestamp: '1 day ago',
        },
      ],
    },
  ];

  const selectedChat = conversations.find(c => c.id === selectedConversation);

  const handleSendMessage = () => {
    if (!messageText.trim()) return;

    // In real app, this would send to backend
    console.log('Sending message:', messageText);
    setMessageText('');
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
              <Link to="/app/messages" className="font-sans text-jm-coral font-semibold">
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
        <div className="mb-6">
          <h1 className="font-serif text-3xl font-bold text-jm-gray-900 mb-2">
            Messages
          </h1>
          <p className="font-sans text-jm-gray-600">
            {conversations.filter(c => c.unreadCount > 0).length} unread conversations
          </p>
        </div>

        {/* Messages Interface */}
        <div className="bg-white rounded-xl border border-jm-gray-200 overflow-hidden" style={{ height: 'calc(100vh - 280px)' }}>
          <div className="flex h-full">
            {/* Conversations List */}
            <div className="w-full md:w-1/3 border-r border-jm-gray-200 overflow-y-auto">
              <div className="p-4 border-b border-jm-gray-200">
                <input
                  type="text"
                  placeholder="Search conversations..."
                  className="w-full px-4 py-2 border border-jm-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-jm-coral text-sm"
                />
              </div>

              <div className="divide-y divide-jm-gray-200">
                {conversations.map((conversation) => (
                  <button
                    key={conversation.id}
                    onClick={() => setSelectedConversation(conversation.id)}
                    className={`w-full p-4 text-left hover:bg-jm-gray-50 transition-colors ${
                      selectedConversation === conversation.id ? 'bg-jm-coral/5' : ''
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="relative">
                        <img
                          src={conversation.matchUser.photo}
                          alt={conversation.matchUser.name}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                        {conversation.unreadCount > 0 && (
                          <span className="absolute -top-1 -right-1 w-5 h-5 bg-jm-coral text-white text-xs font-bold rounded-full flex items-center justify-center">
                            {conversation.unreadCount}
                          </span>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <h3 className="font-sans text-sm font-semibold text-jm-gray-900 truncate">
                            {conversation.matchUser.name}
                          </h3>
                          <span className="font-sans text-xs text-jm-gray-500 ml-2 flex-shrink-0">
                            {conversation.timestamp}
                          </span>
                        </div>
                        <p className={`font-sans text-sm truncate ${
                          conversation.unreadCount > 0 ? 'text-jm-gray-900 font-medium' : 'text-jm-gray-600'
                        }`}>
                          {conversation.lastMessage}
                        </p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Chat Window */}
            <div className="hidden md:flex md:w-2/3 flex-col">
              {selectedChat ? (
                <>
                  {/* Chat Header */}
                  <div className="p-4 border-b border-jm-gray-200 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <img
                        src={selectedChat.matchUser.photo}
                        alt={selectedChat.matchUser.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div>
                        <h3 className="font-sans text-sm font-semibold text-jm-gray-900">
                          {selectedChat.matchUser.name}
                        </h3>
                        <p className="font-sans text-xs text-jm-gray-600">
                          {selectedChat.matchUser.age} • {selectedChat.matchUser.location}
                        </p>
                      </div>
                    </div>
                    <Link
                      to={`/app/profile/${selectedChat.matchUser.id}`}
                      className="font-sans text-sm text-jm-coral hover:underline font-medium"
                    >
                      View Profile
                    </Link>
                  </div>

                  {/* Messages */}
                  <div className="flex-1 overflow-y-auto p-6 space-y-4">
                    {selectedChat.messages.map((message) => {
                      const isCurrentUser = message.sender === currentUser.id;
                      return (
                        <div
                          key={message.id}
                          className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'}`}
                        >
                          <div className={`max-w-md ${isCurrentUser ? 'order-2' : 'order-1'}`}>
                            <div
                              className={`rounded-2xl px-4 py-3 ${
                                isCurrentUser
                                  ? 'bg-gradient-jm text-white'
                                  : 'bg-jm-gray-100 text-jm-gray-900'
                              }`}
                            >
                              <p className="font-sans text-sm">{message.text}</p>
                            </div>
                            <p className={`font-sans text-xs text-jm-gray-500 mt-1 ${
                              isCurrentUser ? 'text-right' : 'text-left'
                            }`}>
                              {message.timestamp}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Message Input */}
                  <div className="p-4 border-t border-jm-gray-200">
                    <div className="flex gap-3">
                      <input
                        type="text"
                        value={messageText}
                        onChange={(e) => setMessageText(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                        placeholder="Type your message..."
                        className="flex-1 px-4 py-3 border border-jm-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-jm-coral"
                      />
                      <button
                        onClick={handleSendMessage}
                        className="bg-gradient-jm text-white font-sans font-semibold px-6 py-3 rounded-lg hover:opacity-90 transition-opacity"
                      >
                        Send
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex-1 flex items-center justify-center">
                  <div className="text-center">
                    <svg className="mx-auto h-12 w-12 text-jm-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                    <h3 className="font-sans text-lg font-semibold text-jm-gray-900 mb-2">
                      Select a conversation
                    </h3>
                    <p className="font-sans text-sm text-jm-gray-600">
                      Choose a conversation from the list to start messaging
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
