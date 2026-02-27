import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import './index.css';

// Public Pages
import Home from './pages/Home';
import HowItWorks from './pages/HowItWorks';
import Pricing from './pages/Pricing';
import VIP from './pages/VIP';
import Safety from './pages/Safety';
import SuccessStories from './pages/SuccessStories';
import Contact from './pages/Contact';
import FAQ from './pages/FAQ';
import Login from './pages/Login';
import Signup from './pages/Signup';

// Legal Pages
import Terms from './pages/legal/Terms';
import Privacy from './pages/legal/Privacy';
import CommunityGuidelines from './pages/legal/CommunityGuidelines';
import Accessibility from './pages/legal/Accessibility';

// App Pages (Authenticated)
import Dashboard from './pages/app/Dashboard';
import Discover from './pages/app/Discover';
import ProfileView from './pages/app/ProfileView';
import Interests from './pages/app/Interests';
import Messages from './pages/app/Messages';
import Notifications from './pages/app/Notifications';

// Admin Pages
import SuperAdminDashboard from './pages/admin/SuperAdminDashboard';
import ModeratorDashboard from './pages/admin/ModeratorDashboard';
import VIPCoordinatorDashboard from './pages/admin/VIPCoordinatorDashboard';
import VIPExpertDashboard from './pages/admin/VIPExpertDashboard';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public pages with full layout */}
        <Route path="/" element={<Layout><Home /></Layout>} />
        <Route path="/how-it-works" element={<Layout><HowItWorks /></Layout>} />
        <Route path="/pricing" element={<Layout><Pricing /></Layout>} />
        <Route path="/vip" element={<Layout><VIP /></Layout>} />
        <Route path="/safety" element={<Layout><Safety /></Layout>} />
        <Route path="/success-stories" element={<Layout><SuccessStories /></Layout>} />
        <Route path="/contact" element={<Layout><Contact /></Layout>} />
        <Route path="/faq" element={<Layout><FAQ /></Layout>} />

        {/* Legal pages */}
        <Route path="/legal/terms" element={<Layout><Terms /></Layout>} />
        <Route path="/legal/privacy" element={<Layout><Privacy /></Layout>} />
        <Route path="/legal/community-guidelines" element={<Layout><CommunityGuidelines /></Layout>} />
        <Route path="/legal/accessibility" element={<Layout><Accessibility /></Layout>} />

        {/* Auth pages (minimal layout - no nav/footer) */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* App pages (authenticated, no public layout) */}
        <Route path="/app/dashboard" element={<Dashboard />} />
        <Route path="/app/discover" element={<Discover />} />
        <Route path="/app/profile/:id" element={<ProfileView />} />
        <Route path="/app/interests" element={<Interests />} />
        <Route path="/app/messages" element={<Messages />} />
        <Route path="/app/notifications" element={<Notifications />} />

        {/* Admin pages (role-based dashboards) */}
        <Route path="/admin/super-admin" element={<SuperAdminDashboard />} />
        <Route path="/admin/moderator" element={<ModeratorDashboard />} />
        <Route path="/admin/vip-coordinator" element={<VIPCoordinatorDashboard />} />
        <Route path="/admin/vip-expert" element={<VIPExpertDashboard />} />
      </Routes>
    </Router>
  );
}

export default App
