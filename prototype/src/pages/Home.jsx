import Button from '../components/common/Button';
import Card from '../components/common/Card';

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-jm-purple-deep/5 via-white to-jm-coral/5 py-16 md:py-24">
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Column: Text Content */}
            <div className="space-y-8 animate-fade-in">
              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-jm-text-primary leading-tight">
                Find Your Life Partner with Trust-Based Matchmaking
              </h1>
              <p className="font-sans text-lg md:text-xl text-jm-text-secondary leading-relaxed">
                Share information gradually, build trust intentionally, and find someone who's as serious about marriage as you are.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button to="/signup" size="large">
                  Get Started
                </Button>
                <Button to="/how-it-works" variant="secondary" size="large">
                  See How It Works
                </Button>
              </div>

              {/* Trust Indicators */}
              <div className="flex flex-wrap items-center gap-6 pt-4 text-sm text-jm-text-tertiary">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-jm-success flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                  </svg>
                  <span>ID Verification</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-jm-success flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd"/>
                  </svg>
                  <span>Privacy First</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-jm-success flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z"/>
                  </svg>
                  <span>Marriage-Minded</span>
                </div>
              </div>
            </div>

            {/* Right Column: Hero Image - App Interface Preview */}
            <div className="hidden lg:block">
              <div className="w-full h-auto animate-fade-in relative">
                {/* Phone Mockup Frame */}
                <div className="relative mx-auto w-72 xl:w-80">
                  {/* Phone Frame */}
                  <div className="bg-jm-gray-900 rounded-[3rem] p-3 shadow-2xl">
                    {/* Phone Screen */}
                    <div className="bg-white rounded-[2.5rem] overflow-hidden">
                      {/* Status Bar */}
                      <div className="bg-jm-purple-deep px-6 py-3 flex items-center justify-between">
                        <span className="text-white text-xs font-medium">9:41</span>
                        <div className="flex items-center gap-1">
                          <div className="w-4 h-3 border border-white rounded-sm">
                            <div className="w-3 h-2 bg-white rounded-sm m-[1px]"></div>
                          </div>
                        </div>
                      </div>

                      {/* App Header */}
                      <div className="bg-gradient-jm px-5 py-4">
                        <div className="flex items-center gap-2">
                          <img src="/images/logo-transparent.svg" alt="JoyMatcher" className="w-8 h-8" />
                          <span className="text-white font-semibold text-sm">JoyMatcher</span>
                        </div>
                      </div>

                      {/* Profile Card Preview */}
                      <div className="p-4 space-y-4">
                        {/* Match Card */}
                        <div className="bg-gradient-to-br from-jm-purple-deep/5 to-jm-coral/5 rounded-2xl p-4 border border-jm-gray-100">
                          <div className="flex items-start gap-3">
                            <div className="w-14 h-14 rounded-xl overflow-hidden flex-shrink-0 border-2 border-jm-coral/20">
                              <img
                                src="/images/profiles/women/woman-professional-corporate.png"
                                alt="Profile"
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="flex-grow">
                              <div className="flex items-center gap-1.5">
                                <span className="font-semibold text-jm-text-primary text-sm">Amara O.</span>
                                <span className="inline-block px-1.5 py-0.5 bg-jm-success-light text-jm-success text-[10px] rounded-full font-medium">Verified</span>
                              </div>
                              <p className="text-jm-text-tertiary text-xs mt-0.5">29 • Lagos • Christian</p>
                              <div className="flex items-center gap-1 mt-1.5">
                                <span className="inline-block px-2 py-0.5 bg-jm-purple-deep/10 text-jm-purple-deep text-[10px] rounded-full font-medium">Tier 3</span>
                                <span className="inline-block px-2 py-0.5 bg-jm-coral/10 text-jm-coral text-[10px] rounded-full font-medium">Premium</span>
                              </div>
                            </div>
                          </div>

                          {/* Compatibility */}
                          <div className="mt-3 pt-3 border-t border-jm-gray-200">
                            <div className="flex items-center justify-between text-[10px]">
                              <span className="text-jm-gray-500">Values Compatibility</span>
                              <span className="text-jm-success font-semibold">92%</span>
                            </div>
                            <div className="mt-1 h-1.5 bg-jm-gray-100 rounded-full overflow-hidden">
                              <div className="h-full w-[92%] bg-gradient-jm rounded-full"></div>
                            </div>
                          </div>
                        </div>

                        {/* Mutual Interest Badge */}
                        <div className="bg-jm-success-light rounded-xl p-3 flex items-center gap-3">
                          <div className="w-8 h-8 bg-jm-success rounded-full flex items-center justify-center flex-shrink-0">
                            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd"/>
                            </svg>
                          </div>
                          <div>
                            <p className="text-jm-success font-semibold text-xs">Mutual Interest!</p>
                            <p className="text-jm-text-tertiary text-[10px]">You can now message each other</p>
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-2">
                          <button className="flex-1 bg-jm-gray-100 text-jm-text-tertiary text-xs font-medium py-2.5 rounded-xl">
                            View Profile
                          </button>
                          <button className="flex-1 bg-gradient-jm text-white text-xs font-semibold py-2.5 rounded-xl flex items-center justify-center gap-1.5">
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                            </svg>
                            Message
                          </button>
                        </div>
                      </div>

                      {/* Bottom Nav */}
                      <div className="bg-white border-t border-jm-gray-100 px-4 py-3 flex items-center justify-around">
                        <div className="text-center">
                          <svg className="w-5 h-5 text-jm-gray-400 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                          </svg>
                        </div>
                        <div className="text-center">
                          <svg className="w-5 h-5 text-jm-purple-deep mx-auto" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z"/>
                          </svg>
                          <div className="w-1 h-1 bg-jm-purple-deep rounded-full mx-auto mt-0.5"></div>
                        </div>
                        <div className="text-center relative">
                          <svg className="w-5 h-5 text-jm-gray-400 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd"/>
                          </svg>
                          <div className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-jm-coral rounded-full"></div>
                        </div>
                        <div className="text-center">
                          <svg className="w-5 h-5 text-jm-gray-400 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Floating Elements */}
                  <div className="absolute -left-4 top-24 bg-white rounded-xl shadow-lg p-3 animate-float">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-jm-success rounded-full flex items-center justify-center">
                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                        </svg>
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-jm-text-primary">ID Verified</p>
                        <p className="text-[10px] text-jm-gray-500">Trusted profile</p>
                      </div>
                    </div>
                  </div>

                  <div className="absolute -right-4 bottom-32 bg-white rounded-xl shadow-lg p-3 animate-float" style={{animationDelay: '1s'}}>
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-jm-coral rounded-full flex items-center justify-center">
                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd"/>
                        </svg>
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-jm-text-primary">New Match!</p>
                        <p className="text-[10px] text-jm-gray-500">92% compatible</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          </div>
        </div>
      </section>

      {/* Value Propositions Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-jm-text-primary mb-4">
                Why JoyMatcher is Different
              </h2>
              <p className="font-sans text-lg text-jm-text-secondary max-w-2xl mx-auto">
                We're not a dating app. We're relationship infrastructure built on trust, reciprocity, and verified identity.
              </p>
            </div>

          <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
            {/* Feature 1 */}
            <Card variant="subtle" hover className="text-center space-y-4">
              <div className="w-16 h-16 bg-gradient-jm rounded-full flex items-center justify-center mx-auto">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                </svg>
              </div>
              <h3 className="font-serif text-xl font-semibold text-jm-text-primary">
                Share What You're Comfortable With
              </h3>
              <p className="font-sans text-base text-jm-text-secondary leading-relaxed">
                Our tier system lets you control what you share and when. No pressure to reveal everything upfront.
              </p>
            </Card>

            {/* Feature 2 */}
            <Card variant="subtle" hover className="text-center space-y-4">
              <div className="w-16 h-16 bg-gradient-jm rounded-full flex items-center justify-center mx-auto">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd"/>
                </svg>
              </div>
              <h3 className="font-serif text-xl font-semibold text-jm-text-primary">
                They Share, You Share
              </h3>
              <p className="font-sans text-base text-jm-text-secondary leading-relaxed">
                See details only if you've completed the same tier. Fair, balanced, and respectful.
              </p>
            </Card>

            {/* Feature 3 */}
            <Card variant="subtle" hover className="text-center space-y-4">
              <div className="w-16 h-16 bg-gradient-jm rounded-full flex items-center justify-center mx-auto">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd"/>
                </svg>
              </div>
              <h3 className="font-serif text-xl font-semibold text-jm-text-primary">
                Serious About Marriage
              </h3>
              <p className="font-sans text-base text-jm-text-secondary leading-relaxed">
                No casual dating. Our members are here for long-term commitment leading to marriage.
              </p>
            </Card>

            {/* Feature 4 - Added for 4-column grid */}
            <Card variant="subtle" hover className="text-center space-y-4">
              <div className="w-16 h-16 bg-gradient-jm rounded-full flex items-center justify-center mx-auto">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                </svg>
              </div>
              <h3 className="font-serif text-xl font-semibold text-jm-text-primary">
                Verified Identities
              </h3>
              <p className="font-sans text-base text-jm-text-secondary leading-relaxed">
                VIP members undergo full KYC verification. Know who you're connecting with.
              </p>
            </Card>
          </div>
          </div>
        </div>
      </section>

      {/* How It Works Preview Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-jm-purple-deep/5 via-white to-jm-coral/5">
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-jm-text-primary mb-4">
                How JoyMatcher Works
              </h2>
              <p className="font-sans text-lg text-jm-text-secondary max-w-2xl mx-auto">
                Five tiers of progressive disclosure. Share at your own pace. Build trust before depth.
              </p>
            </div>

          <div className="space-y-16 lg:space-y-20">
            {/* Step 1 - Tier 1 Form Preview */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              <div className="space-y-4">
                <span className="inline-block bg-gradient-jm text-white font-bold px-4 py-2 rounded-full text-sm">Step 1</span>
                <h3 className="font-serif text-2xl font-semibold text-jm-text-primary">
                  Complete Tier 1: Identity & Intent
                </h3>
                <p className="font-sans text-base text-jm-text-secondary leading-relaxed">
                  Share your basic information: name, age, location, faith, and relationship intent. This is public and helps others find you.
                </p>
              </div>
              <Card variant="elevated" className="p-0 overflow-hidden">
                {/* Tier 1 Form Mockup */}
                <div className="bg-white p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-full bg-gradient-jm flex items-center justify-center text-white font-bold">1</div>
                    <div>
                      <h4 className="font-sans text-sm font-semibold text-jm-text-primary">Identity & Intent</h4>
                      <p className="font-sans text-xs text-jm-gray-500">Basic information visible to all</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="block font-sans text-xs font-medium text-jm-text-tertiary mb-1">Display Name</label>
                      <div className="h-10 bg-jm-gray-100 rounded-lg border border-jm-gray-200 px-3 flex items-center">
                        <span className="text-jm-gray-400 text-sm">Chioma O.</span>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block font-sans text-xs font-medium text-jm-text-tertiary mb-1">Age</label>
                        <div className="h-10 bg-jm-gray-100 rounded-lg border border-jm-gray-200 px-3 flex items-center">
                          <span className="text-jm-gray-400 text-sm">32</span>
                        </div>
                      </div>
                      <div>
                        <label className="block font-sans text-xs font-medium text-jm-text-tertiary mb-1">Location</label>
                        <div className="h-10 bg-jm-gray-100 rounded-lg border border-jm-gray-200 px-3 flex items-center">
                          <span className="text-jm-gray-400 text-sm">Toronto, CA</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <label className="block font-sans text-xs font-medium text-jm-text-tertiary mb-1">Relationship Intent</label>
                      <div className="h-10 bg-jm-purple-deep/10 rounded-lg border border-jm-purple-deep/30 px-3 flex items-center">
                        <span className="text-jm-purple-deep text-sm font-medium">Marriage within 1-2 years</span>
                      </div>
                    </div>
                    <div className="pt-2">
                      <div className="h-10 bg-gradient-jm rounded-lg flex items-center justify-center">
                        <span className="text-white text-sm font-semibold">Save & Continue</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            {/* Step 2 - Discover Page Preview */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              <div className="space-y-4 lg:order-2">
                <span className="inline-block bg-gradient-jm text-white font-bold px-4 py-2 rounded-full text-sm">Step 2</span>
                <h3 className="font-serif text-2xl font-semibold text-jm-text-primary">
                  Browse Matches (Tier 1 Only)
                </h3>
                <p className="font-sans text-base text-jm-text-secondary leading-relaxed">
                  Discover other users who share your values. You'll only see Tier 1 information initially—respecting everyone's privacy.
                </p>
              </div>
              <Card variant="elevated" className="p-0 overflow-hidden lg:order-1">
                {/* Discover Page Mockup */}
                <div className="bg-jm-gray-50 p-4">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-sans text-sm font-semibold text-jm-text-primary">Discover</h4>
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-white border border-jm-gray-200 flex items-center justify-center">
                        <svg className="w-4 h-4 text-jm-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    {/* Profile Card 1 */}
                    <div className="bg-white rounded-xl p-3 shadow-sm">
                      <div className="w-full aspect-square bg-gradient-to-br from-jm-coral/20 to-jm-purple-deep/20 rounded-lg mb-2 flex items-center justify-center">
                        <svg className="w-12 h-12 text-jm-gray-300" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"/>
                        </svg>
                      </div>
                      <p className="font-sans text-xs font-semibold text-jm-text-primary">Kwame M., 35</p>
                      <p className="font-sans text-xs text-jm-gray-500">Lagos, NG</p>
                      <div className="flex items-center gap-1 mt-1">
                        <span className="inline-block px-2 py-0.5 bg-jm-purple-deep/10 text-jm-purple-deep text-xs rounded-full">Tier 1</span>
                      </div>
                    </div>
                    {/* Profile Card 2 */}
                    <div className="bg-white rounded-xl p-3 shadow-sm">
                      <div className="w-full aspect-square bg-gradient-to-br from-jm-purple-deep/20 to-jm-coral/20 rounded-lg mb-2 flex items-center justify-center">
                        <svg className="w-12 h-12 text-jm-gray-300" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"/>
                        </svg>
                      </div>
                      <p className="font-sans text-xs font-semibold text-jm-text-primary">Emeka A., 34</p>
                      <p className="font-sans text-xs text-jm-gray-500">London, UK</p>
                      <div className="flex items-center gap-1 mt-1">
                        <span className="inline-block px-2 py-0.5 bg-jm-coral/10 text-jm-coral text-xs rounded-full">Premium</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            {/* Step 3 - Show Interest Flow */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              <div className="space-y-4">
                <span className="inline-block bg-gradient-jm text-white font-bold px-4 py-2 rounded-full text-sm">Step 3</span>
                <h3 className="font-serif text-2xl font-semibold text-jm-text-primary">
                  Show Interest & Unlock Messaging
                </h3>
                <p className="font-sans text-base text-jm-text-secondary leading-relaxed">
                  Send a Show Interest request. If accepted, messaging unlocks. No unsolicited messages allowed.
                </p>
              </div>
              <Card variant="elevated" className="p-0 overflow-hidden">
                {/* Show Interest Flow Mockup */}
                <div className="bg-white p-6">
                  {/* Profile Header */}
                  <div className="flex items-start gap-4 mb-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-jm-coral/30 to-jm-purple-deep/30 rounded-xl flex items-center justify-center flex-shrink-0">
                      <svg className="w-8 h-8 text-jm-gray-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"/>
                      </svg>
                    </div>
                    <div className="flex-grow">
                      <div className="flex items-center gap-2">
                        <h4 className="font-sans text-base font-semibold text-jm-text-primary">Kwame M.</h4>
                        <span className="inline-block px-2 py-0.5 bg-jm-success-light text-jm-success text-xs rounded-full font-medium">Verified</span>
                      </div>
                      <p className="font-sans text-sm text-jm-text-tertiary">35 • Lagos, Nigeria • Christian</p>
                      <p className="font-sans text-xs text-jm-gray-500 mt-1">Marriage within 1-2 years</p>
                    </div>
                  </div>

                  {/* Interest Status */}
                  <div className="bg-jm-gray-50 rounded-xl p-4 mb-4">
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-sans text-xs font-medium text-jm-text-tertiary">Interest Status</span>
                      <span className="inline-flex items-center gap-1 text-jm-success text-xs font-medium">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                        </svg>
                        Mutual Interest
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex-grow h-2 bg-jm-gray-200 rounded-full overflow-hidden">
                        <div className="w-full h-full bg-gradient-jm rounded-full"></div>
                      </div>
                    </div>
                  </div>

                  {/* Messaging Unlocked */}
                  <div className="flex items-center gap-3">
                    <div className="flex-grow h-12 bg-gradient-jm rounded-xl flex items-center justify-center gap-2">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                      </svg>
                      <span className="text-white text-sm font-semibold">Start Conversation</span>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center mt-16">
            <Button to="/how-it-works" variant="secondary">
              Learn More About Tiers
            </Button>
          </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-jm-text-primary mb-4">
                Success Stories
              </h2>
              <p className="font-sans text-lg text-jm-text-secondary max-w-2xl mx-auto">
                Real couples who found love and marriage through JoyMatcher.
              </p>
            </div>

          <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {/* Testimonial 1 - Coffee Date */}
            <Card variant="subtle" className="space-y-4 overflow-hidden">
              <div className="relative w-full h-48 -mx-6 -mt-6 mb-4">
                <img
                  src="/images/success-stories/couple-coffee-date.png"
                  alt="Chidinma and Kwame"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="px-6 pb-6 space-y-4">
                <div>
                  <h4 className="font-serif text-lg font-semibold text-jm-text-primary">Chidinma & Kwame</h4>
                  <p className="font-sans text-sm text-jm-text-secondary">Lagos, Nigeria</p>
                </div>
                <p className="font-sans text-base text-jm-text-secondary leading-relaxed italic">
                  "We connected over shared values on Tier 3. By Tier 4, we knew we were compatible for marriage. Engaged after 8 months!"
                </p>
                <div className="flex items-center gap-2 text-sm text-jm-success font-medium">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                  </svg>
                  Engaged February 2026
                </div>
              </div>
            </Card>

            {/* Testimonial 2 - Traditional Wedding */}
            <Card variant="subtle" className="space-y-4 overflow-hidden">
              <div className="relative w-full h-48 -mx-6 -mt-6 mb-4">
                <img
                  src="/images/success-stories/couple-traditional-wedding.png"
                  alt="Dr. Amara and Emmanuel"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="px-6 pb-6 space-y-4">
                <div>
                  <h4 className="font-serif text-lg font-semibold text-jm-text-primary">Dr. Amara & Emmanuel</h4>
                  <p className="font-sans text-sm text-jm-text-secondary">VIP Members</p>
                </div>
                <p className="font-sans text-base text-jm-text-secondary leading-relaxed italic">
                  "The VIP concierge service saved me time. My matchmaker understood exactly what I needed. Found my husband in 6 months."
                </p>
                <div className="flex items-center gap-2 text-sm text-jm-success font-medium">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                  </svg>
                  Married December 2025
                </div>
              </div>
            </Card>

            {/* Testimonial 3 - Diaspora Success */}
            <Card variant="subtle" className="space-y-4 overflow-hidden">
              <div className="relative w-full h-48 -mx-6 -mt-6 mb-4">
                <img
                  src="/images/success-stories/couple-diaspora-toronto.png"
                  alt="Folake and Chidi"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="px-6 pb-6 space-y-4">
                <div>
                  <h4 className="font-serif text-lg font-semibold text-jm-text-primary">Folake & Chidi</h4>
                  <p className="font-sans text-sm text-jm-text-secondary">Toronto → Lagos</p>
                </div>
                <p className="font-sans text-base text-jm-text-secondary leading-relaxed italic">
                  "From Toronto to Lagos—JoyMatcher helped us navigate the distance. The tier system built trust before we even met."
                </p>
                <div className="flex items-center gap-2 text-sm text-jm-success font-medium">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                  </svg>
                  Engaged January 2026
                </div>
              </div>
            </Card>

            {/* Testimonial 4 - Rooftop Dinner */}
            <Card variant="subtle" className="space-y-4 overflow-hidden">
              <div className="relative w-full h-48 -mx-6 -mt-6 mb-4">
                <img
                  src="/images/success-stories/couple-rooftop-dinner.png"
                  alt="Adaeze and Tunde"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="px-6 pb-6 space-y-4">
                <div>
                  <h4 className="font-serif text-lg font-semibold text-jm-text-primary">Adaeze & Tunde</h4>
                  <p className="font-sans text-sm text-jm-text-secondary">London, UK</p>
                </div>
                <p className="font-sans text-base text-jm-text-secondary leading-relaxed italic">
                  "The progressive disclosure system let us take things at our own pace. We both appreciated the thoughtful approach to building trust."
                </p>
                <div className="flex items-center gap-2 text-sm text-jm-success font-medium">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                  </svg>
                  Married November 2025
                </div>
              </div>
            </Card>
          </div>

          {/* View All Link */}
          <div className="text-center mt-12">
            <Button to="/success-stories" variant="ghost">
              View All Success Stories →
            </Button>
          </div>
          </div>
        </div>
      </section>

      {/* Pricing Teaser Section */}
      <section className="py-16 md:py-24 bg-jm-gray-50">
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16">
          <div className="text-center mb-16">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-jm-text-primary mb-4">
              Choose Your Path
            </h2>
            <p className="font-sans text-lg text-jm-text-secondary max-w-2xl mx-auto">
              Start free. Upgrade when you're ready for deeper connections.
            </p>
          </div>

          <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
            {/* Free Tier */}
            <Card variant="default" className="space-y-6">
              <div>
                <h3 className="font-serif text-2xl font-semibold text-jm-text-primary mb-2">Free</h3>
                <p className="font-sans text-4xl font-bold text-jm-text-primary">₦0</p>
                <p className="font-sans text-sm text-jm-text-tertiary">Forever free</p>
              </div>
              <ul className="space-y-3">
                <li className="flex items-start gap-2 text-sm text-jm-text-secondary">
                  <svg className="w-5 h-5 text-jm-success flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                  </svg>
                  Complete Tier 1 & 2
                </li>
                <li className="flex items-start gap-2 text-sm text-jm-text-secondary">
                  <svg className="w-5 h-5 text-jm-success flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                  </svg>
                  Browse other Free users
                </li>
                <li className="flex items-start gap-2 text-sm text-jm-text-secondary">
                  <svg className="w-5 h-5 text-jm-success flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                  </svg>
                  Send Show Interest
                </li>
                <li className="flex items-start gap-2 text-sm text-jm-text-secondary">
                  <svg className="w-5 h-5 text-jm-success flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                  </svg>
                  Unlimited messaging
                </li>
              </ul>
              <Button to="/signup" variant="secondary" className="w-full">
                Get Started
              </Button>
            </Card>

            {/* Premium Tier */}
            <Card variant="gradient" className="space-y-6 relative transform md:scale-105">
              <div className="absolute top-0 right-0 bg-jm-coral text-white text-xs font-semibold px-3 py-1 rounded-bl-lg rounded-tr-xl">
                Most Popular
              </div>
              <div>
                <h3 className="font-serif text-2xl font-semibold text-white mb-2">Premium</h3>
                <p className="font-sans text-4xl font-bold text-white">₦18,000</p>
                <p className="font-sans text-sm text-white/80">per month</p>
              </div>
              <ul className="space-y-3">
                <li className="flex items-start gap-2 text-sm text-white">
                  <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                  </svg>
                  Everything in Free
                </li>
                <li className="flex items-start gap-2 text-sm text-white">
                  <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                  </svg>
                  Complete Tier 3 & 4
                </li>
                <li className="flex items-start gap-2 text-sm text-white">
                  <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                  </svg>
                  Request deeper details
                </li>
                <li className="flex items-start gap-2 text-sm text-white">
                  <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                  </svg>
                  Show Interest to Premium users
                </li>
              </ul>
              <button className="w-full bg-white hover:bg-jm-gray-100 text-jm-purple-deep font-sans font-semibold px-6 py-3 rounded-lg transition-all duration-200 shadow-md">
                Start Premium
              </button>
            </Card>

            {/* VIP Tier */}
            <Card variant="default" className="space-y-6">
              <div>
                <h3 className="font-serif text-2xl font-semibold text-jm-text-primary mb-2">VIP</h3>
                <p className="font-sans text-4xl font-bold text-jm-text-primary">₦200,000+</p>
                <p className="font-sans text-sm text-jm-text-tertiary">per month</p>
              </div>
              <ul className="space-y-3">
                <li className="flex items-start gap-2 text-sm text-jm-text-secondary">
                  <svg className="w-5 h-5 text-jm-success flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                  </svg>
                  Everything in Premium
                </li>
                <li className="flex items-start gap-2 text-sm text-jm-text-secondary">
                  <svg className="w-5 h-5 text-jm-success flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                  </svg>
                  Complete Tier 5 (KYC verified)
                </li>
                <li className="flex items-start gap-2 text-sm text-jm-text-secondary">
                  <svg className="w-5 h-5 text-jm-success flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                  </svg>
                  Personal matchmaker
                </li>
                <li className="flex items-start gap-2 text-sm text-jm-text-secondary">
                  <svg className="w-5 h-5 text-jm-success flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                  </svg>
                  Curated introductions
                </li>
              </ul>
              <Button to="/pricing" variant="secondary" className="w-full">
                Learn More
              </Button>
            </Card>
          </div>

          {/* Full Pricing Link */}
          <div className="text-center mt-12">
            <Button to="/pricing" variant="ghost">
              View Full Pricing Details →
            </Button>
          </div>
        </div>
      </section>

      {/* Trust & Safety Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-jm-text-primary mb-4">
                Your Safety is Our Priority
              </h2>
              <p className="font-sans text-lg text-jm-text-secondary max-w-2xl mx-auto">
                We take privacy, verification, and data protection seriously.
              </p>
            </div>

          <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
            <div className="text-center space-y-3 p-6 bg-jm-gray-50 rounded-2xl">
              <div className="w-16 h-16 bg-jm-success/10 rounded-full flex items-center justify-center mx-auto">
                <svg className="w-8 h-8 text-jm-success" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                </svg>
              </div>
              <h3 className="font-serif text-lg font-semibold text-jm-text-primary">ID Verification</h3>
              <p className="font-sans text-sm text-jm-text-secondary">
                VIP members complete government ID verification and live video checks.
              </p>
            </div>

            <div className="text-center space-y-3 p-6 bg-jm-gray-50 rounded-2xl">
              <div className="w-16 h-16 bg-jm-success/10 rounded-full flex items-center justify-center mx-auto">
                <svg className="w-8 h-8 text-jm-success" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd"/>
                </svg>
              </div>
              <h3 className="font-serif text-lg font-semibold text-jm-text-primary">Privacy First</h3>
              <p className="font-sans text-sm text-jm-text-secondary">
                You control what you share and with whom. Revoke access anytime.
              </p>
            </div>

            <div className="text-center space-y-3 p-6 bg-jm-gray-50 rounded-2xl">
              <div className="w-16 h-16 bg-jm-success/10 rounded-full flex items-center justify-center mx-auto">
                <svg className="w-8 h-8 text-jm-success" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                </svg>
              </div>
              <h3 className="font-serif text-lg font-semibold text-jm-text-primary">GDPR/NDPR Compliant</h3>
              <p className="font-sans text-sm text-jm-text-secondary">
                Full compliance with Nigerian and European data protection laws.
              </p>
            </div>

            <div className="text-center space-y-3 p-6 bg-jm-gray-50 rounded-2xl">
              <div className="w-16 h-16 bg-jm-success/10 rounded-full flex items-center justify-center mx-auto">
                <svg className="w-8 h-8 text-jm-success" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"/>
                </svg>
              </div>
              <h3 className="font-serif text-lg font-semibold text-jm-text-primary">Transparent Process</h3>
              <p className="font-sans text-sm text-jm-text-secondary">
                Clear tier system so you always know what information is being shared.
              </p>
            </div>
          </div>

          <div className="text-center mt-12">
            <Button to="/safety" variant="ghost">
              Learn More About Safety →
            </Button>
          </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-jm-purple-deep to-jm-coral">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          <h2 className="font-serif text-3xl md:text-5xl font-bold leading-tight text-white drop-shadow-lg">
            Ready to Find Your Life Partner?
          </h2>
          <p className="font-sans text-lg md:text-xl text-white max-w-3xl mx-auto drop-shadow-md">
            Join thousands of marriage-minded professionals who trust JoyMatcher to find meaningful, lasting relationships.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white hover:bg-white/90 text-jm-purple-deep font-sans font-semibold text-lg px-10 py-4 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl">
              Create Free Account
            </button>
            <button className="border-2 border-white text-white hover:bg-white/10 font-sans font-semibold text-lg px-10 py-4 rounded-lg transition-all duration-200">
              Learn More
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
