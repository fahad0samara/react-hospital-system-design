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
  FiAlertCircle
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
      title: 'Emergency Cases',
      icon: <FiAlertCircle className="w-5 h-5" />,
      path: '/doctor/emergency'
    },
    {
      title: 'Documents',
      icon: <FiFileText className="w-5 h-5" />,
      path: '/doctor/documents'
    },
    {
      title: 'Messages',
      icon: <FiMessageSquare className="w-5 h-5" />,
      path: '/doctor/messages'
    },
    {
      title: 'Video Calls',
      icon: <FiVideo className="w-5 h-5" />,
      path: '/doctor/video-calls'
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
    }
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <div 
      className={`bg-white h-screen fixed left-0 top-0 shadow-sm border-r border-gray-200 transition-transform duration-300 ease-in-out z-20 ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
      style={{ width: '16rem' }}
    >
      <div className="flex flex-col h-full">
        {/* Logo */}
        <div className="p-4 border-b border-gray-200">
          <h1 className="text-xl font-bold text-gray-800">Doctor Portal</h1>
          <p className="text-sm text-gray-500 mt-1">Hospital Management</p>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-4">
          <div className="space-y-2">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center px-4 py-2.5 rounded-lg transition-colors ${
                  isActive(item.path)
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                {item.icon}
                <span className="ml-3 font-medium">{item.title}</span>
              </Link>
            ))}
          </div>
        </nav>

        {/* User Info */}
        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
              <span className="text-white font-medium">{user?.name?.charAt(0) || 'D'}</span>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-800">{user?.name || 'Dr. John Smith'}</p>
              <p className="text-xs text-gray-500">{user?.specialty || 'Emergency Medicine'}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorSidebar;
