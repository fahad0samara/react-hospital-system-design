import React, { useState } from 'react';
import DoctorSidebar from './DoctorSidebar';
import { FiMenu, FiMoon, FiSun } from 'react-icons/fi';
import { useTheme } from '../../context/ThemeContext';

const DoctorLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { darkMode, toggleDarkMode } = useTheme();

  return (
    <div className={`flex h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-100'} transition-colors duration-300`}>
      {/* Sidebar */}
      <DoctorSidebar isOpen={sidebarOpen} />

      {/* Main Content */}
      <div className={`flex-1 transition-all duration-300 ease-in-out ${sidebarOpen ? 'ml-64' : 'ml-0'}`}>
        {/* Top Bar */}
        <div className={`${darkMode ? 'bg-gray-800 shadow-gray-900' : 'bg-white'} shadow-sm h-16 flex items-center justify-between px-6 sticky top-0 z-10 transition-colors duration-300`}>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className={`p-2 rounded-lg ${
              darkMode 
                ? 'hover:bg-gray-700 text-gray-300' 
                : 'hover:bg-gray-100 text-gray-600'
            } transition-colors`}
          >
            <FiMenu className="w-6 h-6" />
          </button>

          <button
            onClick={toggleDarkMode}
            className={`p-2 rounded-lg ${
              darkMode 
                ? 'hover:bg-gray-700 text-gray-300' 
                : 'hover:bg-gray-100 text-gray-600'
            } transition-colors`}
          >
            {darkMode ? (
              <FiSun className="w-6 h-6" />
            ) : (
              <FiMoon className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Page Content */}
        <div className={`p-6 ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default DoctorLayout;
