import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'sonner';
<<<<<<< HEAD
import ErrorBoundary from './components/ErrorBoundary';
=======
import { AuthProvider } from '@/lib/AuthContext';
>>>>>>> 6256764 (connecting frontend with backend)
import Layout from './Layout/Layout';
import Home from './pages/Home';
import EducationalModules from './pages/EducationalModules';
import SurvivorSupport from './pages/SurvivorSupport';
import Dashboard from './pages/Dashboard';
import RealTimeDetection from './pages/RealTimeDetection';
import EmergencyResponse from './pages/EmergencyResponse';
import CommunityModeration from './pages/CommunityModeration';
import AnonymousSupport from './pages/AnonymousSupport';
import AnalyticsDashboard from './pages/AnalyticSupport';
import Settings from './pages/Settings';

export default function App() {
  return (
<<<<<<< HEAD
    <ErrorBoundary>
=======
    <AuthProvider>
>>>>>>> 6256764 (connecting frontend with backend)
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/education" element={<EducationalModules />} />
            <Route path="/support" element={<SurvivorSupport />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/detection" element={<RealTimeDetection />} />
            <Route path="/emergency" element={<EmergencyResponse />} />
            <Route path="/community" element={<CommunityModeration />} />
            <Route path="/anonymous-support" element={<AnonymousSupport />} />
            <Route path="/analytics" element={<AnalyticsDashboard />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </Layout>
        <Toaster richColors position="top-right" />
      </Router>
<<<<<<< HEAD
    </ErrorBoundary>
=======
    </AuthProvider>
>>>>>>> 6256764 (connecting frontend with backend)
  );
}