import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@hooks/useAuth';
import { FiLogOut, FiSettings, FiUser, FiMenu } from 'react-icons/fi';
import { useState } from 'react';

export const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <header className="bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 font-bold text-xl">
            <div className="w-8 h-8 bg-white rounded flex items-center justify-center text-blue-600 font-bold">
              E
            </div>
            <span>ERP-POS</span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex gap-8">
            <Link to="/" className="hover:text-blue-200 transition">
              Dashboard
            </Link>
            <Link to="/pos" className="hover:text-blue-200 transition">
              POS
            </Link>
            <Link to="/products" className="hover:text-blue-200 transition">
              Products
            </Link>
            <Link to="/inventory" className="hover:text-blue-200 transition">
              Inventory
            </Link>
            <Link to="/reports" className="hover:text-blue-200 transition">
              Reports
            </Link>
          </nav>

          {/* User Menu */}
          <div className="flex items-center gap-4">
            <div className="text-sm">
              <p className="font-semibold">{user?.firstName} {user?.lastName}</p>
              <p className="text-blue-200 text-xs">{user?.role}</p>
            </div>
            <div className="relative">
              <button
                onClick={() => setShowMenu(!showMenu)}
                className="p-2 hover:bg-blue-700 rounded-lg transition"
              >
                <FiMenu size={20} />
              </button>
              {showMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white text-gray-800 rounded-lg shadow-lg overflow-hidden z-50">
                  <Link
                    to="/settings"
                    className="block px-4 py-2 hover:bg-gray-100 transition flex items-center gap-2"
                  >
                    <FiSettings size={18} />
                    Settings
                  </Link>
                  <Link
                    to="/profile"
                    className="block px-4 py-2 hover:bg-gray-100 transition flex items-center gap-2"
                  >
                    <FiUser size={18} />
                    Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 hover:bg-red-100 transition flex items-center gap-2 text-red-600"
                  >
                    <FiLogOut size={18} />
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
