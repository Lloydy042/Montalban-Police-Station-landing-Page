import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import DashboardLayout from './components/dashboard/DashboardLayout';
import DashboardHome from './pages/dashboard/DashboardHome';
import ReportsPage from './pages/dashboard/ReportsPage';
import ReportDetailPage from './pages/dashboard/ReportDetailPage';
import AnnouncementsPage from './pages/dashboard/AnnouncementsPage';
import OfficersPage from './pages/dashboard/OfficersPage';
import AnalyticsPage from './pages/dashboard/AnalyticsPage';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        
        {/* Dashboard Routes (Protected) */}
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<DashboardHome />} />
          <Route path="reports" element={<ReportsPage />} />
          <Route path="reports/:id" element={<ReportDetailPage />} />
          <Route path="announcements" element={<AnnouncementsPage />} />
          <Route path="officers" element={<OfficersPage />} />
          <Route path="analytics" element={<AnalyticsPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
