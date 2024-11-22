import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
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
  FiEdit
} from 'react-icons/fi';

const DoctorDashboard = () => {
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
      <header className="bg-white border-b border-gray-200">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Left side - Name */}
            <div className="flex items-center space-x-8">
              <div>
                <h1 className="text-xl font-bold text-gray-900">Dr. Sarah Wilson</h1>
                <p className="text-sm text-gray-600">Cardiologist</p>
              </div>
              {/* Time and Weather */}
              <div className="hidden md:flex items-center space-x-6">
                <div className="flex items-center">
                  <FiClock className="w-5 h-5 text-yellow-500 mr-2" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">{currentTime.toLocaleTimeString()}</p>
                    <p className="text-xs text-gray-600">{currentTime.toLocaleDateString()}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <FiSun className="w-5 h-5 text-yellow-500 mr-2" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">{weather.temp}</p>
                    <p className="text-xs text-gray-600">{weather.condition}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right side - Notifications */}
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => setShowMessages(true)}
                className="relative p-2 text-gray-600 hover:text-yellow-500 transition-colors"
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
                className="relative p-2 text-gray-600 hover:text-yellow-500 transition-colors"
              >
                <FiBell className="w-6 h-6" />
                {notifications.filter(n => n.unread).length > 0 && (
                  <span className="absolute top-0 right-0 -mt-1 -mr-1 px-2 py-0.5 text-xs font-medium bg-yellow-500 text-white rounded-full">
                    {notifications.filter(n => n.unread).length}
                  </span>
                )}
              </button>
              <div className="h-8 w-8 rounded-full bg-yellow-100 flex items-center justify-center">
                <span className="text-sm font-medium text-yellow-800">SW</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 p-6 overflow-y-auto bg-gray-50">
        {/* Emergency Cases Alert - Moved to top */}
        <div className="mb-6">
          <div className="bg-gradient-to-r from-red-50 via-red-100 to-red-50 rounded-lg p-4 border-l-4 border-red-500 relative overflow-hidden">
            <div className="absolute top-0 right-0 mt-4 mr-4">
              <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold bg-red-500 text-white animate-pulse">
                <span className="mr-2 h-2 w-2 rounded-full bg-white animate-ping"></span>
                Active Cases: {patients?.filter(p => p.type === 'Emergency')?.length || 1}
              </span>
            </div>
            <div className="flex items-center mb-4">
              <div className="bg-red-100 rounded-full p-3 mr-4">
                <FiAlertCircle className="w-8 h-8 text-red-600 animate-pulse" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-red-700 mb-1">Emergency Cases</h2>
                <p className="text-red-600 text-sm">Immediate attention required</p>
              </div>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              {[
                { name: 'Robert Johnson', condition: 'Severe Asthma Attack', time: '10:07 AM', status: 'Critical' },
                { name: 'Mary Smith', condition: 'Head Trauma', time: '10:15 AM', status: 'Urgent' },
              ].map((patient, index) => (
                <div key={index} className="bg-white/80 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-gray-900">{patient.name}</h3>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      patient.status === 'Critical' 
                        ? 'bg-red-100 text-red-800 animate-pulse' 
                        : 'bg-orange-100 text-orange-800'
                    }`}>
                      {patient.status}
                    </span>
                  </div>
                  <p className="text-red-600 text-sm font-medium mb-1">{patient.condition}</p>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-xs text-gray-500">Since {patient.time}</span>
                    <button className="px-3 py-1 text-xs bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors">
                      Attend Now
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions Bar */}
        <div className="mb-6 bg-white rounded-lg shadow-md overflow-hidden">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4">
            {/* Add Patient */}
            <button 
              onClick={() => setShowAddPatient(true)}
              className="flex flex-col items-center justify-center p-4 bg-yellow-500 rounded-lg text-white hover:bg-yellow-600 transition-all group"
            >
              <div className="bg-white/20 rounded-full p-3 mb-2 group-hover:scale-110 transition-transform">
                <FiUserPlus className="w-6 h-6" />
              </div>
              <span className="text-sm font-semibold">Add Patient</span>
            </button>

            {/* New Appointment */}
            <button 
              onClick={() => setShowNewAppointment(true)}
              className="flex flex-col items-center justify-center p-4 bg-emerald-500 rounded-lg text-white hover:bg-emerald-600 transition-all group"
            >
              <div className="bg-white/20 rounded-full p-3 mb-2 group-hover:scale-110 transition-transform">
                <FiCalendar className="w-6 h-6" />
              </div>
              <span className="text-sm font-semibold">New Appointment</span>
            </button>

            {/* Video Call */}
            <button 
              onClick={() => setShowVideoCall(true)}
              className="flex flex-col items-center justify-center p-4 bg-purple-500 rounded-lg text-white hover:bg-purple-600 transition-all group"
            >
              <div className="bg-white/20 rounded-full p-3 mb-2 group-hover:scale-110 transition-transform">
                <FiVideo className="w-6 h-6" />
              </div>
              <span className="text-sm font-semibold">Video Call</span>
            </button>

            {/* Emergency Actions */}
            <button 
              onClick={() => setShowEmergency(true)}
              className="flex flex-col items-center justify-center p-4 bg-red-500 rounded-lg text-white hover:bg-red-600 transition-all group relative"
            >
              <div className="absolute -top-1 -right-1 w-3 h-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
              </div>
              <div className="bg-white/20 rounded-full p-3 mb-2 group-hover:scale-110 transition-transform">
                <FiAlertCircle className="w-6 h-6" />
              </div>
              <span className="text-sm font-semibold">Emergency</span>
            </button>
          </div>
        </div>

        {/* Main Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Today's Schedule */}
          <div className="bg-white rounded-lg shadow-sm p-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-gray-800 flex items-center">
                <FiCalendar className="w-5 h-5 text-yellow-500 mr-2" />
                Today's Schedule
              </h2>
              <span className="text-sm text-yellow-600">{new Date().toLocaleDateString()}</span>
            </div>
            <div className="space-y-3">
              {[
                { time: '10:00 AM', patient: 'Sarah Wilson', type: 'Check-up', status: 'Next' },
                { time: '11:30 AM', patient: 'Mike Brown', type: 'Follow-up', status: 'Scheduled' },
              ].map((appointment, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="bg-yellow-100 text-yellow-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">
                      {appointment.time}
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">{appointment.patient}</h3>
                      <p className="text-sm text-gray-600">{appointment.type}</p>
                    </div>
                  </div>
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    appointment.status === 'Next' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {appointment.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Lab Results */}
          <div className="bg-white rounded-lg shadow-sm p-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-gray-800 flex items-center">
                <FiFileText className="w-5 h-5 text-blue-500 mr-2" />
                Recent Lab Results
              </h2>
            </div>
            <div className="space-y-3">
              {[
                { patient: 'Emma Davis', test: 'Blood Test', status: 'Ready', date: '2023-06-15' },
                { patient: 'James Wilson', test: 'X-Ray', status: 'Processing', date: '2023-06-15' },
              ].map((result, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <h3 className="font-medium text-gray-900">{result.patient}</h3>
                    <p className="text-sm text-gray-600">{result.test}</p>
                    <p className="text-xs text-gray-500">{result.date}</p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      result.status === 'Ready' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                    }`}>
                      {result.status}
                    </span>
                    {result.status === 'Ready' && (
                      <button className="p-1 text-blue-600 hover:text-blue-700">
                        <FiDownload className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Notes */}
          <div className="bg-white rounded-lg shadow-sm p-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-gray-800 flex items-center">
                <FiEdit className="w-5 h-5 text-yellow-500 mr-2" />
                Quick Notes
              </h2>
              <button className="text-sm text-yellow-600 hover:text-yellow-700">Add Note</button>
            </div>
            <div className="space-y-3">
              {[
                { time: '9:45 AM', note: 'Follow up with Robert Johnson about asthma medication', priority: 'High' },
                { time: '9:30 AM', note: 'Check blood test results for Emma Davis', priority: 'Medium' },
              ].map((note, index) => (
                <div key={index} className="p-3 bg-yellow-50 rounded-lg border-l-4 border-yellow-400">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-gray-500">{note.time}</span>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      note.priority === 'High' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {note.priority}
                    </span>
                  </div>
                  <p className="text-sm text-gray-800">{note.note}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Modals */}
      <AddPatient isOpen={showAddPatient} onClose={() => setShowAddPatient(false)} />
      <NewAppointment isOpen={showNewAppointment} onClose={() => setShowNewAppointment(false)} />
      <VideoCall isOpen={showVideoCall} onClose={() => setShowVideoCall(false)} />
      <Messages isOpen={showMessages} onClose={() => setShowMessages(false)} />
      <Emergency isOpen={showEmergency} onClose={() => setShowEmergency(false)} />
      <Reports isOpen={showReports} onClose={() => setShowReports(false)} />
    </div>
  );
};

export default DoctorDashboard;
