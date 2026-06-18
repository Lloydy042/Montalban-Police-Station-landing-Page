import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  FileText,
  Megaphone,
  Users,
  BarChart3,
  LogOut,
  Shield,
  X,
  ChevronRight,
} from 'lucide-react';
import useAuthStore from '../../store/useAuthStore';

const navItems = [
  {
    label: 'Dashboard',
    icon: LayoutDashboard,
    path: '/dashboard',
    end: true,
  },
  {
    label: 'Reports',
    icon: FileText,
    path: '/dashboard/reports',
  },
  {
    label: 'Announcements',
    icon: Megaphone,
    path: '/dashboard/announcements',
  },
  {
    label: 'Officers',
    icon: Users,
    path: '/dashboard/officers',
  },
  {
    label: 'Analytics',
    icon: BarChart3,
    path: '/dashboard/analytics',
  },
];

const Sidebar = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-50 h-full w-64 bg-pnp-navy flex flex-col transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-5 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-pnp-gold/15 border border-pnp-gold/50 rounded-lg flex items-center justify-center">
              <Shield className="w-5 h-5 text-pnp-gold" />
            </div>
            <div>
              <h1 className="text-white font-bold text-lg leading-tight tracking-tight">
                AGAPAY
              </h1>
              <p className="text-gray-400 text-[11px] font-medium uppercase tracking-wider">
                Admin Panel
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="lg:hidden text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          <p className="px-3 text-[10px] font-semibold text-gray-500 uppercase tracking-widest mb-2">
            Menu
          </p>
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.end}
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 group ${
                  isActive
                    ? 'bg-pnp-gold/15 text-pnp-gold'
                    : 'text-gray-300 hover:bg-white/5 hover:text-white'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <item.icon
                    className={`w-5 h-5 flex-shrink-0 ${
                      isActive ? 'text-pnp-gold' : 'text-gray-400 group-hover:text-white'
                    }`}
                  />
                  <span className="flex-1">{item.label}</span>
                  {isActive && (
                    <ChevronRight className="w-4 h-4 text-pnp-gold/60" />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* User Info + Logout */}
        <div className="px-3 pb-4 mt-auto">
          <div className="border-t border-white/10 pt-4">
            {/* User Info */}
            <div className="flex items-center gap-3 px-3 mb-3">
              <div className="w-9 h-9 bg-pnp-blue rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-white text-sm font-bold">
                  {user?.name?.charAt(0) || 'A'}
                </span>
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-white text-sm font-medium truncate">
                  {user?.name || 'Admin User'}
                </p>
                <p className="text-gray-400 text-xs truncate capitalize">
                  {user?.role?.replace(/_/g, ' ') || 'Administrator'}
                </p>
              </div>
            </div>

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-400 hover:bg-red-500/10 hover:text-red-400 transition-all duration-150 w-full"
            >
              <LogOut className="w-5 h-5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
