import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useTheme } from '../../context/ThemeContext';
import DashboardCharts from '../DashboardCharts';
import AddPatient from '../quick-actions/AddPatient';
import NewAppointment from '../quick-actions/NewAppointment';
import VideoCall from '../quick-actions/VideoCall';
import Messages from '../quick-actions/Messages';
import Emergency from '../quick-actions/Emergency';
import Reports from '../quick-actions/Reports';
import {
  FiSearch,
  FiBell,
  FiCalendar,
  FiMessageSquare,
  FiUserPlus,
  FiVideo,
  FiFileText,
  FiAlertCircle,
  FiUsers,
  FiClock,
  FiSun,
  FiUser,
  FiSmile,
  FiDownload,
  FiMenu,
  FiX,
  FiEdit,
  FiHome,
  FiSettings,
  FiLogOut,
  FiMoon
} from 'react-icons/fi';

const DoctorDashboard = () => {
  const { darkMode } = useTheme();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [weather] = useState({ temp: '24°C', condition: 'Sunny' });
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddPatient, setShowAddPatient] = useState(false);
  const [showNewAppointment, setShowNewAppointment] = useState(false);
  const [showVideoCall, setShowVideoCall] = useState(false);
  const [showMessages, setShowMessages] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showEmergency, setShowEmergency] = useState(false);
  const [showReports, setShowReports] = useState(false);
  const [currentPage, setCurrentPage] = useState('dashboard');

  // Get patient data from Redux store
  const { patients } = useSelector((state) => state.patients || { patients: [] });
  const { user } = useSelector((state) => state.auth);

  // Mock notifications
  const notifications = [
    { id: 1, message: 'New appointment request from John Doe', time: '5 min ago', unread: true },
    { id: 2, message: 'Emergency case update: Patient #123', time: '10 min ago', unread: true },
    { id: 3, message: 'Lab results available for Sarah Smith', time: '1 hour ago', unread: false },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <header className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-b transition-colors duration-200`}>
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Left side - Name */}
            <div className="flex items-center space-x-8">
              <div>
                <h1 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Dr. Sarah Wilson</h1>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Cardiologist</p>
              </div>
              {/* Time and Weather */}
              <div className="hidden md:flex items-center space-x-6">
                <div className="flex items-center">
                  <FiClock className={`w-5 h-5 ${darkMode ? 'text-yellow-400' : 'text-yellow-500'} mr-2`} />
                  <div>
                    <p className={`text-sm font-medium ${darkMode ? 'text-gray-200' : 'text-gray-900'}`}>
                      {currentTime.toLocaleTimeString()}
                    </p>
                    <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      {currentTime.toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="flex items-center">
                  {darkMode ? (
                    <FiMoon className="w-5 h-5 text-blue-400 mr-2" />
                  ) : (
                    <FiSun className="w-5 h-5 text-yellow-500 mr-2" />
                  )}
                  <div>
                    <p className={`text-sm font-medium ${darkMode ? 'text-gray-200' : 'text-gray-900'}`}>
                      {weather.temp}
                    </p>
                    <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      {weather.condition}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right side - Notifications */}
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => setShowMessages(true)}
                className={`relative p-2 ${
                  darkMode 
                    ? 'text-gray-400 hover:text-yellow-400' 
                    : 'text-gray-600 hover:text-yellow-500'
                } transition-colors`}
              >
                <FiMessageSquare className="w-6 h-6" />
                {notifications.filter(n => n.unread).length > 0 && (
                  <span className="absolute top-0 right-0 -mt-1 -mr-1 px-2 py-0.5 text-xs font-medium bg-yellow-500 text-white rounded-full">
                    {notifications.filter(n => n.unread).length}
                  </span>
                )}
              </button>
              <button 
                onClick={() => setShowNotifications(true)}
                className={`relative p-2 ${
                  darkMode 
                    ? 'text-gray-400 hover:text-yellow-400' 
                    : 'text-gray-600 hover:text-yellow-500'
                } transition-colors`}
              >
                <FiBell className="w-6 h-6" />
                {notifications.filter(n => n.unread).length > 0 && (
                  <span className="absolute top-0 right-0 -mt-1 -mr-1 px-2 py-0.5 text-xs font-medium bg-yellow-500 text-white rounded-full">
                    {notifications.filter(n => n.unread).length}
                  </span>
                )}
              </button>
              <div className={`h-8 w-8 rounded-full ${
                darkMode ? 'bg-yellow-900 text-yellow-100' : 'bg-yellow-100 text-yellow-800'
              } flex items-center justify-center`}>
                <span className="text-sm font-medium">SW</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className={`flex-1 p-6 overflow-y-auto ${darkMode ? 'bg-gray-900' : 'bg-gray-50'} transition-colors duration-200`}>
        {/* Emergency Cases Alert */}
        <div className="mb-6">
          <div className={`${
            darkMode 
              ? 'bg-gradient-to-r from-red-900/50 via-red-800/50 to-red-900/50 border-red-700' 
              : 'bg-gradient-to-r from-red-50 via-red-100 to-red-50 border-red-500'
          } rounded-lg p-4 border-l-4 relative overflow-hidden transition-colors duration-200`}>
            <div className="absolute top-0 right-0 mt-4 mr-4">
              <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold bg-red-500 text-white animate-pulse">
                <span className="mr-2 h-2 w-2 rounded-full bg-white animate-ping"></span>
                Active Cases: {patients?.filter(p => p.type === 'Emergency')?.length || 1}
              </span>
            </div>
            <div className="flex items-center mb-4">
              <div className={`${darkMode ? 'bg-red-800' : 'bg-red-100'} rounded-full p-3 mr-4`}>
                <FiAlertCircle className={`w-8 h-8 ${darkMode ? 'text-red-400' : 'text-red-600'} animate-pulse`} />
              </div>
              <div>
                <h2 className={`text-xl font-bold ${darkMode ? 'text-red-400' : 'text-red-700'} mb-1`}>
                  Emergency Cases
                </h2>
                <p className={`${darkMode ? 'text-red-400' : 'text-red-600'} text-sm`}>
                  Immediate attention required
                </p>
              </div>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              {[
                { name: 'Robert Johnson', condition: 'Severe Asthma Attack', time: '10:07 AM', status: 'Critical' },
                { name: 'Mary Smith', condition: 'Head Trauma', time: '10:15 AM', status: 'Urgent' },
              ].map((patient, index) => (
                <div 
                  key={index} 
                  className={`${
                    darkMode 
                      ? 'bg-gray-800/80 hover:bg-gray-700/80' 
                      : 'bg-white/80 hover:shadow-md'
                  } p-4 rounded-lg shadow-sm transition-all`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className={`font-semibold ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                      {patient.name}
                    </h3>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      patient.status === 'Critical'
                        ? darkMode 
                          ? 'bg-red-900 text-red-100 animate-pulse' 
                          : 'bg-red-100 text-red-800 animate-pulse'
                        : darkMode
                          ? 'bg-orange-900 text-orange-100'
                          : 'bg-orange-100 text-orange-800'
                    }`}>
                      {patient.status}
                    </span>
                  </div>
                  <p className={`${darkMode ? 'text-red-400' : 'text-red-600'} text-sm font-medium mb-1`}>
                    {patient.condition}
                  </p>
                  <div className="flex justify-between items-center mt-2">
                    <span className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      Since {patient.time}
                    </span>
                    <button className={`px-3 py-1 text-xs ${
                      darkMode 
                        ? 'bg-red-600 hover:bg-red-700' 
                        : 'bg-red-500 hover:bg-red-600'
                    } text-white rounded-full transition-colors`}>
                      Attend Now
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions Bar */}
        <div className={`mb-6 ${
          darkMode ? 'bg-gray-800' : 'bg-white'
        } rounded-lg shadow-md overflow-hidden transition-colors duration-200`}>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4">
            {/* Add Patient */}
            <button 
              onClick={() => setShowAddPatient(true)}
              className={`flex flex-col items-center justify-center p-4 ${
                darkMode 
                  ? 'bg-yellow-600 hover:bg-yellow-700' 
                  : 'bg-yellow-500 hover:bg-yellow-600'
              } rounded-lg text-white transition-all group`}
            >
              <FiUserPlus className="w-6 h-6 mb-2" />
              <span className="text-sm font-medium">Add Patient</span>
            </button>

            {/* New Appointment */}
            <button 
              onClick={() => setShowNewAppointment(true)}
              className={`flex flex-col items-center justify-center p-4 ${
                darkMode 
                  ? 'bg-blue-600 hover:bg-blue-700' 
                  : 'bg-blue-500 hover:bg-blue-600'
              } rounded-lg text-white transition-all group`}
            >
              <FiCalendar className="w-6 h-6 mb-2" />
              <span className="text-sm font-medium">New Appointment</span>
            </button>

            {/* Video Call */}
            <button 
              onClick={() => setShowVideoCall(true)}
              className={`flex flex-col items-center justify-center p-4 ${
                darkMode 
                  ? 'bg-green-600 hover:bg-green-700' 
                  : 'bg-green-500 hover:bg-green-600'
              } rounded-lg text-white transition-all group`}
            >
              <FiVideo className="w-6 h-6 mb-2" />
              <span className="text-sm font-medium">Video Call</span>
            </button>

            {/* Reports */}
            <button 
              onClick={() => setShowReports(true)}
              className={`flex flex-col items-center justify-center p-4 ${
                darkMode 
                  ? 'bg-purple-600 hover:bg-purple-700' 
                  : 'bg-purple-500 hover:bg-purple-600'
              } rounded-lg text-white transition-all group`}
            >
              <FiFileText className="w-6 h-6 mb-2" />
              <span className="text-sm font-medium">Reports</span>
            </button>
          </div>
        </div>

        {/* Charts and Stats will be added here */}
        <DashboardCharts darkMode={darkMode} />
      </main>
    </div>
  );
};

export default DoctorDashboard;
