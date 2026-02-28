import { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/common/Button';

export default function SuccessStories() {
  const [currentPage, setCurrentPage] = useState(1);
  const storiesPerPage = 6;
  const allStories = [
    {
      names: 'Chioma & Emmanuel',
      location: 'Lagos, Nigeria',
      status: 'Married',
      date: 'December 2025',
      image: '/images/couples/couple-art-gallery-formal.png',
      story: '"I met my husband Emmanuel through JoyMatcher in February 2025. As a diaspora Nigerian living in Toronto, I struggled to find someone who understood my dual identity. JoyMatcher\'s tier system helped me feel safe sharing my values gradually. Emmanuel and I connected over our shared faith and desire for family. We got engaged in July and married in December. Thank you, JoyMatcher!"',
      author: 'Chioma, 32, Marketing Manager',
      gradient: 'from-jm-purple-deep to-jm-coral',
    },
    {
      names: 'Adaeze & Chidi',
      location: 'Abuja, Nigeria',
      status: 'Engaged',
      date: 'November 2025',
      image: '/images/hero/hero-couple-outdoor-walk.png',
      story: '"After years of disappointing dates on regular apps, JoyMatcher was refreshing. I appreciated how it filtered for serious people. Chidi and I matched in May 2025 and took time building trust through the tier system. By the time we met in person, we\'d already discussed our values, family backgrounds, and life goals. He proposed six months later. We\'re planning our traditional and white wedding for 2026!"',
      author: 'Adaeze, 29, Software Engineer',
      gradient: 'from-jm-coral to-jm-purple',
    },
    {
      names: 'Ngozi & Obinna',
      location: 'London, UK',
      status: 'In a Relationship',
      date: 'Since August 2025',
      image: '/images/couples/couple-cultural-festival.png',
      story: '"As a busy doctor in London, I had little time for dating. JoyMatcher\'s VIP service was worth every penny. My matchmaker understood exactly what I was looking for and introduced me to Obinna, who shares my Igbo heritage and Christian values. Six months in, and I\'ve never been happier. We\'re taking our time, but I know he\'s the one."',
      author: 'Ngozi, 35, Medical Doctor',
      gradient: 'from-jm-purple to-jm-coral',
    },
    {
      names: 'Yetunde & Tunde',
      location: 'Ibadan, Nigeria',
      status: 'Married',
      date: 'September 2025',
      image: '/images/couples/couple-lagos-romance.png',
      story: '"I was skeptical about online matchmaking, but JoyMatcher proved me wrong. The emphasis on marriage and family aligned with my traditional values. Tunde and I spent weeks chatting and video calling before meeting. Our families met soon after, and everything flowed naturally. We got married in a beautiful traditional ceremony in September. JoyMatcher gave us the foundation we needed."',
      author: 'Yetunde, 27, Teacher',
      gradient: 'from-jm-purple-deep to-jm-purple',
    },
    {
      names: 'Funmi & David',
      location: 'Accra, Ghana → Lagos',
      status: 'Engaged',
      date: 'January 2026',
      image: '/images/features/feature-video-chat.png',
      story: '"Long-distance relationships are hard, but JoyMatcher made it work. David and I connected through video dates and the tier system helped us build a foundation of trust before meeting. After 9 months of virtual dating, he flew to Lagos and proposed. We\'re planning our wedding for summer 2026!"',
      author: 'Funmi, 30, Lawyer',
      gradient: 'from-jm-coral to-jm-purple-deep',
    },
    {
      names: 'Kemi & Olu',
      location: 'Port Harcourt, Nigeria',
      status: 'Married',
      date: 'October 2025',
      image: '/images/hero/hero-couple-coffee-date.png',
      story: '"We both value family and faith deeply. The tier system let us verify our compatibility before getting emotionally invested. By Tier 4, we both knew this was it. Married within 7 months and couldn\'t be happier!"',
      author: 'Kemi, 28, Entrepreneur',
      gradient: 'from-jm-purple to-jm-coral',
    },
    {
      names: 'Amina & Ibrahim',
      location: 'Kano, Nigeria',
      status: 'Married',
      date: 'August 2025',
      image: '/images/couples/couple-art-gallery-formal.png',
      story: '"Finding someone who respects both our Muslim faith and modern values was crucial. JoyMatcher\'s careful vetting process connected us with like-minded individuals. Ibrahim and I are grateful for a platform that understands cultural nuances."',
      author: 'Amina, 31, University Lecturer',
      gradient: 'from-jm-purple-deep to-jm-coral',
    },
    {
      names: 'Blessing & Chukwu',
      location: 'Enugu, Nigeria',
      status: 'Engaged',
      date: 'December 2025',
      image: '/images/couples/couple-cultural-festival.png',
      story: '"We matched during the December holidays and immediately connected over our shared Igbo heritage and love for family. The progressive disclosure made it easy to be authentic without oversharing. Engaged after 6 months!"',
      author: 'Blessing, 26, Healthcare Administrator',
      gradient: 'from-jm-coral to-jm-purple',
    },
    {
      names: 'Grace & Michael',
      location: 'Houston, Texas → Lagos',
      status: 'Married',
      date: 'November 2025',
      image: '/images/hero/hero-couple-outdoor-walk.png',
      story: '"As a Nigerian-American, I wanted someone who understood both cultures. Michael, based in Lagos, was the perfect match. We took things slow through video dates and tier progression. Now I\'ve relocated back home and we\'re building our life together."',
      author: 'Grace, 33, Software Developer',
      gradient: 'from-jm-purple to-jm-coral',
    },
    {
      names: 'Titilayo & Seun',
      location: 'Ibadan, Nigeria',
      status: 'Engaged',
      date: 'February 2026',
      image: '/images/couples/couple-lagos-romance.png',
      story: '"We connected over our love for Yoruba culture and desire for a traditional marriage. The tier system helped us discuss important topics like finances and family expectations early on. Planning our engagement ceremony for April!"',
      author: 'Titilayo, 29, Fashion Designer',
      gradient: 'from-jm-purple-deep to-jm-purple',
    },
    {
      names: 'Aisha & Musa',
      location: 'Abuja, Nigeria',
      status: 'In a Relationship',
      date: 'Since September 2025',
      image: '/images/features/feature-video-chat.png',
      story: '"The VIP concierge service was a game-changer for my busy schedule as a government official. My matchmaker introduced me to Musa who shares my values and ambition. Five months in and our families have already met!"',
      author: 'Aisha, 34, Civil Servant',
      gradient: 'from-jm-coral to-jm-purple-deep',
    },
    {
      names: 'Nneka & Emeka',
      location: 'Owerri, Nigeria',
      status: 'Married',
      date: 'January 2026',
      image: '/images/couples/couple-art-gallery-formal.png',
      story: '"Traditional values with modern approach - that\'s what we loved about JoyMatcher. Our families were involved from the beginning, and the structured approach made everything smooth. Married in a beautiful traditional ceremony!"',
      author: 'Nneka, 27, Pharmacist',
      gradient: 'from-jm-purple to-jm-coral',
    },
  ];

  // Pagination logic
  const totalPages = Math.ceil(allStories.length / storiesPerPage);
  const indexOfLastStory = currentPage * storiesPerPage;
  const indexOfFirstStory = indexOfLastStory - storiesPerPage;
  const currentStories = allStories.slice(indexOfFirstStory, indexOfLastStory);

  const goToPage = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-jm-purple-deep to-jm-coral py-20 md:py-32">
        <div className="max-w-5xl 2xl:max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h1 className="font-serif text-4xl md:text-6xl font-bold leading-tight text-white drop-shadow-lg">
            Real Love, Real Stories
          </h1>
          <p className="font-sans text-lg md:text-xl text-white max-w-2xl mx-auto drop-shadow-md">
            Meet couples who found lasting love through trust-based matchmaking.
          </p>
        </div>
      </section>

      {/* Success Stories Count */}
      <section className="py-8 bg-jm-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-jm-gray-600 font-sans">
            Showing {indexOfFirstStory + 1}-{Math.min(indexOfLastStory, allStories.length)} of {allStories.length} success stories
          </p>
        </div>
      </section>

      {/* Success Stories Grid */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {currentStories.map((story, index) => (
            <div key={story.names} className="mb-16 bg-jm-gray-100 rounded-lg overflow-hidden">
              <div className={`md:flex ${story.reverse ? 'md:flex-row-reverse' : ''}`}>
                {/* Image Section */}
                <div className="md:w-1/3 relative h-64 md:h-auto">
                  <img
                    src={story.image}
                    alt={story.names}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end justify-center">
                    <div className="text-white text-center p-6">
                      <p className="font-serif text-2xl font-bold drop-shadow-lg">{story.names}</p>
                      <p className="font-sans text-sm opacity-90 drop-shadow-md">{story.location}</p>
                    </div>
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-8 md:w-2/3">
                  <div className="flex items-center space-x-2 mb-4">
                    <span className="px-3 py-1 bg-jm-coral/10 text-jm-coral rounded-full text-xs font-semibold">
                      {story.status}
                    </span>
                    <span className="text-jm-gray-500 text-sm">{story.date}</span>
                  </div>
                  <p className="font-sans text-jm-gray-700 leading-relaxed mb-4">
                    {story.story}
                  </p>
                  <p className="font-sans text-sm text-jm-gray-600 italic">
                    — {story.author}
                  </p>
                </div>
              </div>
            </div>
          ))}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-12 flex items-center justify-center gap-2">
              {/* Previous Button */}
              <button
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage === 1}
                className={`px-4 py-2 rounded-lg font-sans font-medium transition-all ${
                  currentPage === 1
                    ? 'bg-jm-gray-100 text-jm-gray-400 cursor-not-allowed'
                    : 'bg-white border-2 border-jm-gray-300 text-jm-gray-700 hover:border-jm-coral hover:text-jm-coral'
                }`}
              >
                ← Previous
              </button>

              {/* Page Numbers */}
              <div className="flex gap-2">
                {[...Array(totalPages)].map((_, index) => {
                  const pageNumber = index + 1;
                  return (
                    <button
                      key={pageNumber}
                      onClick={() => goToPage(pageNumber)}
                      className={`w-10 h-10 rounded-lg font-sans font-semibold transition-all ${
                        currentPage === pageNumber
                          ? 'bg-gradient-jm text-white'
                          : 'bg-white border-2 border-jm-gray-300 text-jm-gray-700 hover:border-jm-coral hover:text-jm-coral'
                      }`}
                    >
                      {pageNumber}
                    </button>
                  );
                })}
              </div>

              {/* Next Button */}
              <button
                onClick={() => goToPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`px-4 py-2 rounded-lg font-sans font-medium transition-all ${
                  currentPage === totalPages
                    ? 'bg-jm-gray-100 text-jm-gray-400 cursor-not-allowed'
                    : 'bg-white border-2 border-jm-gray-300 text-jm-gray-700 hover:border-jm-coral hover:text-jm-coral'
                }`}
              >
                Next →
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 md:py-24 bg-jm-gray-100">
        <div className="max-w-5xl 2xl:max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-jm-gray-900 mb-12">
            By the Numbers
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <p className="font-serif text-5xl font-bold text-jm-coral mb-2">500+</p>
              <p className="font-sans text-lg text-jm-gray-600">Successful Matches</p>
            </div>
            <div>
              <p className="font-serif text-5xl font-bold text-jm-coral mb-2">150+</p>
              <p className="font-sans text-lg text-jm-gray-600">Engagements</p>
            </div>
            <div>
              <p className="font-serif text-5xl font-bold text-jm-coral mb-2">85+</p>
              <p className="font-sans text-lg text-jm-gray-600">Marriages</p>
            </div>
          </div>
          <p className="font-sans text-sm text-jm-gray-500 mt-8 italic">
            *Statistics as of February 2026
          </p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-jm-purple-deep to-jm-coral">
        <div className="max-w-5xl 2xl:max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          <h2 className="font-serif text-3xl md:text-5xl font-bold leading-tight text-white drop-shadow-lg">
            Ready to Write Your Own Story?
          </h2>
          <p className="font-sans text-lg md:text-xl text-white max-w-2xl mx-auto drop-shadow-md">
            Join thousands of marriage-minded Nigerians finding lasting love.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/signup" className="bg-white hover:bg-white/90 text-jm-purple-deep font-sans font-semibold text-lg px-10 py-4 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl text-center">
              Create Free Account
            </Link>
            <Link to="/how-it-works" className="border-2 border-white hover:bg-white/10 text-white font-sans font-semibold text-lg px-10 py-4 rounded-lg transition-all duration-200 text-center">
              Learn More
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
