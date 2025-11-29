import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Shield,
  AlertTriangle,
  Users,
  GraduationCap,
  Heart,
  BarChart3,
  Settings,
  X
} from 'lucide-react';

interface SidebarProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ open, setOpen }) => {
  const menuItems = [
    { path: '/', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/detection', icon: Shield, label: 'Real-time Detection' },
    { path: '/emergency', icon: AlertTriangle, label: 'Emergency Response' },
    { path: '/community', icon: Users, label: 'Community Moderation' },
    { path: '/education', icon: GraduationCap, label: 'Educational Modules' },
    { path: '/support', icon: Heart, label: 'Anonymous Support' },
    { path: '/analytics', icon: BarChart3, label: 'Analytics Dashboard' },
    { path: '/settings', icon: Settings, label: 'Settings' },
    { path: '/accordion-example', icon: GraduationCap, label: 'Help Accordion' },
    { path: '/accordion-admin', icon: Users, label: 'Accordion Admin' },
    { path: '/components-demo', icon: BarChart3, label: 'Component Demos' },
  ];

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      <div
        className={`
          fixed inset-y-0 left-0 z-30 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out
          ${open ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 md:static md:inset-0
        `}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-600 p-2 rounded-lg">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <span className="text-lg font-bold text-gray-900">SafeSpace</span>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="p-1 rounded-lg hover:bg-gray-100 md:hidden"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <nav className="flex-1 p-4 space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center space-x-3 px-3 py-3 rounded-lg transition-colors ${
                      isActive
                        ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`
                  }
                >
                  <Icon className="h-5 w-5" />
                  <span className="font-medium">{item.label}</span>
                </NavLink>
              );
            })}
          </nav>

          <div className="p-4 border-t border-gray-200">
            <div className="bg-red-50 border border-red-200 rounded-lg p-3">
              <div className="flex items-center space-x-2 text-red-700">
                <AlertTriangle className="h-4 w-4" />
                <span className="text-sm font-medium">Emergency Helpline</span>
              </div>
              <p className="text-xs text-red-600 mt-1">Call 911 for immediate help</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;