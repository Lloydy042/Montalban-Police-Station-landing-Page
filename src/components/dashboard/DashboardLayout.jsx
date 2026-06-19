import { useState, useEffect } from 'react';
import { Outlet, Navigate, useLocation } from 'react-router-dom';
import { Menu, Bell, Search } from 'lucide-react';
import Sidebar from './Sidebar';
import useAuthStore from '../../store/useAuthStore';

const pageTitles = {
  '/dashboard': 'Dashboard Overview',
  '/dashboard/reports': 'Incident Reports',
  '/dashboard/announcements': 'Announcements',
  '/dashboard/officers': 'Field Officers',
  '/dashboard/analytics': 'Analytics & Statistics',
};

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const location = useLocation();

  // Close sidebar on route change (mobile)
  useEffect(() => {
    setSidebarOpen(false);
  }, [location.pathname]);

  // ISO 27001 Clear Screen Session Timeout
  useEffect(() => {
    if (!isAuthenticated) return;

    let inactivityTimer;

    const resetTimer = () => {
      clearTimeout(inactivityTimer);
      inactivityTimer = setTimeout(() => {
        alert('Security Alert: You have been logged out due to 15 minutes of inactivity (ISO 27001 Clear Screen Policy).');
        logout();
      }, 15 * 60 * 1000); // 15 minutes
    };

    const events = ['mousemove', 'keydown', 'scroll', 'click'];
    events.forEach((event) => window.addEventListener(event, resetTimer, { passive: true }));

    resetTimer();

    return () => {
      clearTimeout(inactivityTimer);
      events.forEach((event) => window.removeEventListener(event, resetTimer));
    };
  }, [isAuthenticated, logout]);

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Determine page title — also handle sub-routes like /dashboard/reports/:id
  const pageTitle =
    pageTitles[location.pathname] ||
    (location.pathname.startsWith('/dashboard/reports/')
      ? 'Report Details'
      : 'Dashboard');

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main Content Area */}
      <div className="lg:ml-64 min-h-screen flex flex-col">
        {/* Top Bar */}
        <header className="sticky top-0 z-30 bg-white border-b border-gray-200">
          <div className="flex items-center justify-between px-4 sm:px-6 h-16">
            {/* Left: Hamburger + Title */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <Menu className="w-5 h-5" />
              </button>
              <div>
                <h1 className="text-lg font-bold text-gray-900">
                  {pageTitle}
                </h1>
                <p className="text-xs text-gray-500 hidden sm:block">
                  Montalban Police Station &bull; Rodriguez, Rizal
                </p>
              </div>
            </div>

            {/* Right: Search, Notifications, User */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Search (desktop only) */}
              <div className="hidden md:flex items-center bg-gray-50 border border-gray-200 rounded-lg px-3 py-1.5 gap-2">
                <Search className="w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="bg-transparent text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none w-40"
                />
              </div>

              {/* Notification Bell */}
              <button className="relative p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
              </button>

              {/* User Avatar / Name */}
              <div className="flex items-center gap-2 pl-2 sm:pl-3 border-l border-gray-200">
                <div className="w-8 h-8 bg-pnp-navy rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-bold">
                    {user?.name?.charAt(0) || 'A'}
                  </span>
                </div>
                <div className="hidden sm:block">
                  <p className="text-sm font-medium text-gray-900 leading-tight">
                    {user?.name || 'Admin'}
                  </p>
                  <p className="text-xs text-gray-500 capitalize leading-tight">
                    {user?.role?.replace(/_/g, ' ') || 'Admin'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 sm:p-6 bg-[#F3F4F6]">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
