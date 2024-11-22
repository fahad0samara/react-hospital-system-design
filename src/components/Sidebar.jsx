import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiHome, FiCalendar, FiUsers, FiFileText, FiAlertCircle, FiPrinter, FiChevronDown, FiChevronRight } from 'react-icons/fi';
import { useSelector } from 'react-redux';

const Sidebar = ({ isOpen }) => {
  const location = useLocation();
  const [expandedMenus, setExpandedMenus] = useState({});
  const { userType, user } = useSelector((state) => state.auth) || { userType: 'doctor' };

  const toggleSubmenu = (title) => {
    setExpandedMenus(prev => ({
      ...prev,
      [title]: !prev[title]
    }));
  };

  const isActive = (path) => location.pathname === path;

  const adminLinks = [
    {
      title: 'Emergency Dashboard',
      icon: <FiHome className="w-5 h-5" />,
      path: '/admin/emergency'
    },
    {
      title: 'Emergency Reports',
      icon: <FiPrinter className="w-5 h-5" />,
      path: '/admin/reports'
    }
  ];

  const doctorLinks = [
    {
      title: 'My Dashboard',
      icon: <FiHome className="w-5 h-5" />,
      path: '/doctor/dashboard'
    },
    {
      title: 'Emergency Cases',
      icon: <FiAlertCircle className="w-5 h-5" />,
      path: '/doctor/emergency'
    },
    {
      title: 'Reports',
      icon: <FiPrinter className="w-5 h-5" />,
      path: '/doctor/reports'
    }
  ];

  const menuItems = userType === 'admin' ? [
    {
      title: 'Admin',
      icon: <FiHome className="w-5 h-5" />,
      submenu: adminLinks
    }
  ] : [
    {
      title: 'Doctor',
      icon: <FiUsers className="w-5 h-5" />,
      submenu: doctorLinks
    }
  ];

  const renderMenuItem = (item) => {
    if (item.submenu) {
      return (
        <div key={item.title} className="mb-4">
          <button
            onClick={() => toggleSubmenu(item.title)}
            className="w-full flex items-center justify-between px-4 py-2.5 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
          >
            <div className="flex items-center">
              {item.icon}
              <span className="ml-3 font-medium">{item.title}</span>
            </div>
            {expandedMenus[item.title] ? (
              <FiChevronDown className="w-4 h-4" />
            ) : (
              <FiChevronRight className="w-4 h-4" />
            )}
          </button>
          {expandedMenus[item.title] && (
            <div className="mt-2 ml-4 space-y-1">
              {item.submenu.map((subItem) => (
                <Link
                  key={subItem.path}
                  to={subItem.path}
                  className={`block px-4 py-2 rounded-lg text-sm ${
                    isActive(subItem.path)
                      ? 'bg-blue-50 text-blue-600'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  {subItem.title}
                </Link>
              ))}
            </div>
          )}
        </div>
      );
    }

    return (
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
    );
  };

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
          <h1 className="text-xl font-bold text-gray-800">Hospital System</h1>
          <p className="text-sm text-gray-500 mt-1">Emergency Response</p>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-4">
          <div className="space-y-2">
            {menuItems.map(renderMenuItem)}
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

export default Sidebar;
