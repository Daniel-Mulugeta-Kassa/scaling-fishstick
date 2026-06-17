import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  FiHome,
  FiShoppingCart,
  FiBox,
  FiTrendingUp,
  FiUsers,
  FiSettings,
  FiBarChart3,
} from 'react-icons/fi';

const menuItems = [
  { label: 'Dashboard', path: '/', icon: FiHome },
  { label: 'POS Terminal', path: '/pos', icon: FiShoppingCart },
  { label: 'Products', path: '/products', icon: FiBox },
  { label: 'Inventory', path: '/inventory', icon: FiTrendingUp },
  { label: 'Customers', path: '/customers', icon: FiUsers },
  { label: 'Reports', path: '/reports', icon: FiBarChart3 },
  { label: 'Settings', path: '/settings', icon: FiSettings },
];

export const Sidebar: React.FC = () => {
  const location = useLocation();

  return (
    <aside className="hidden md:flex flex-col w-64 bg-gray-900 text-white shadow-lg">
      <nav className="flex-1 px-4 py-8 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                isActive ? 'bg-blue-600 text-white' : 'text-gray-300 hover:bg-gray-800'
              }`}
            >
              <Icon size={20} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
};
