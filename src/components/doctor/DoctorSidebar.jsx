import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useTheme } from '../../context/ThemeContext';
import {
  FiHome,
  FiCalendar,
  FiUsers,
  FiMessageSquare,
  FiVideo,
  FiFileText,
  FiActivity,
  FiAlertCircle,
  FiSettings,
  FiUser,
  FiBell,
  FiLock,
  FiSliders,
  FiLogOut
} from 'react-icons/fi';

const DoctorSidebar = ({ isOpen }) => {
  const location = useLocation();
  const { user } = useSelector((state) => state.auth) || { user: {} };
  const { darkMode } = useTheme();

  const menuItems = [
    {
      title: 'Dashboard',
      icon: <FiHome className="w-5 h-5" />,
      path: '/doctor/dashboard'
    },
    {
      title: 'Patients',
      icon: <FiUsers className="w-5 h-5" />,
      path: '/doctor/patients'
    },
    {
      title: 'Documents',
      icon: <FiFileText className="w-5 h-5" />,
      path: '/doctor/documents'
    },
    {
      title: 'Reports',
      icon: <FiFileText className="w-5 h-5" />,
      path: '/doctor/reports'
    },
    {
      title: 'Analytics',
      icon: <FiActivity className="w-5 h-5" />,
      path: '/doctor/analytics'
    },
    {
      title: 'Settings',
      icon: <FiSettings className="w-5 h-5" />,
      path: '/doctor/settings'
    }
  ];

  const isActive = (path) => location.pathname === path;

  const renderMenuItem = (item) => {
    return (
      <Link
        key={item.path}
        to={item.path}
        className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors duration-200 group
          ${isActive(item.path)
            ? (darkMode
              ? 'bg-gray-700 text-white'
              : 'bg-blue-50 text-blue-600')
            : (darkMode
              ? 'text-gray-400 hover:bg-gray-700 hover:text-white'
              : 'text-gray-600 hover:bg-gray-50')
          }`}
      >
        {item.icon}
        <span>{item.title}</span>
      </Link>
    );
  };

  return (
    <div
      className={`fixed inset-y-0 left-0 z-30 w-64 transition-transform duration-300 ease-in-out transform 
      ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      ${darkMode ? 'bg-gray-800' : 'bg-white'} border-r ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}
    >
      {/* Profile Section */}
      <div className={`p-6 border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center text-white font-semibold">
            {user?.name?.charAt(0) || 'D'}
          </div>
          <div>
            <h3 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
              {user?.name || 'Dr. Smith'}
            </h3>
            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              {user?.specialty || 'Cardiologist'}
            </p>
          </div>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="p-4 space-y-2">
        {menuItems.map(renderMenuItem)}
      </nav>

      {/* Logout Button */}
      <div className={`absolute bottom-0 w-full p-4 border-t ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
        <button
          className={`flex items-center space-x-3 px-4 py-3 w-full rounded-lg transition-colors duration-200
            ${darkMode 
              ? 'text-gray-400 hover:bg-gray-700 hover:text-white' 
              : 'text-gray-600 hover:bg-gray-50'}`}
        >
          <FiLogOut className="w-5 h-5" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default DoctorSidebar;
