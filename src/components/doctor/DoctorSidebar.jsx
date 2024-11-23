import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
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
    if (item.submenu) {
      return (
        <div key={item.title} className="mb-2">
          <div className="flex items-center px-4 py-2.5 text-gray-600 rounded-lg bg-gray-50/50">
            {item.icon}
            <span className="ml-3 font-medium">{item.title}</span>
          </div>
          <div className="mt-2 ml-4 space-y-1">
            {item.submenu.map((subItem) => (
              <Link
                key={subItem.path}
                to={subItem.path}
                className={`flex items-center px-4 py-2 rounded-lg transition-all duration-200 group ${
                  isActive(subItem.path)
                    ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-md'
                    : 'text-gray-600 hover:bg-blue-50 hover:text-blue-600'
                }`}
              >
                <span className={`p-1 rounded-lg ${
                  isActive(subItem.path)
                    ? 'text-white'
                    : 'text-gray-500 group-hover:text-blue-500'
                }`}>
                  {subItem.icon}
                </span>
                <span className="ml-3 text-sm font-medium">{subItem.title}</span>
              </Link>
            ))}
          </div>
        </div>
      );
    }

    return (
      <Link
        key={item.path}
        to={item.path}
        className={`flex items-center px-4 py-3 rounded-lg transition-all duration-200 group ${
          isActive(item.path)
            ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-md'
            : 'text-gray-600 hover:bg-blue-50 hover:text-blue-600'
        }`}
      >
        <span className={`p-1 rounded-lg ${
          isActive(item.path)
            ? 'text-white'
            : 'text-gray-500 group-hover:text-blue-500'
        }`}>
          {item.icon}
        </span>
        <span className="ml-3 font-medium">{item.title}</span>
      </Link>
    );
  };

  return (
    <div 
      className={`bg-white h-screen fixed left-0 top-0 shadow-lg border-r border-gray-200 transition-transform duration-300 ease-in-out z-20 ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
      style={{ width: '16rem' }}
    >
      <div className="flex flex-col h-full">
        {/* Logo */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center shadow-md">
              <FiActivity className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-800">MediFlow</h1>
              <p className="text-sm text-gray-500">Doctor Portal</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-4">
          <div className="space-y-2">
            {menuItems.map(renderMenuItem)}
          </div>
        </nav>

        {/* User Info */}
        <div className="p-4 border-t border-gray-200 bg-gray-50">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center shadow-md">
                <span className="text-white font-medium text-lg">{user?.name?.charAt(0) || 'D'}</span>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-800">{user?.name || 'Dr. John Smith'}</p>
                <p className="text-xs text-gray-500">{user?.specialty || 'Emergency Medicine'}</p>
              </div>
            </div>
            <button 
              className="p-2 rounded-lg text-gray-500 hover:bg-red-50 hover:text-red-500 transition-colors"
              title="Logout"
            >
              <FiLogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorSidebar;
