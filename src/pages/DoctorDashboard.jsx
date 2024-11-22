import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import DashboardCharts from '../components/DashboardCharts'
import UserProfile from '../components/UserProfile'
import Emergency from '../components/quick-actions/Emergency';
import Reports from '../components/quick-actions/Reports';
import AddPatient from '../components/quick-actions/AddPatient';
import NewAppointment from '../components/quick-actions/NewAppointment';
import VideoCall from '../components/quick-actions/VideoCall';
import Messages from '../components/quick-actions/Messages';
import { 
  FiBell, 
  FiCalendar, 
  FiClock, 
  FiUser, 
  FiAlertCircle, 
  FiSearch, 
  FiPlus, 
  FiUserPlus,
  FiClipboard,
  FiPhoneCall,
  FiMessageSquare,
  FiPlusCircle,
  FiFileText,
  FiVideo,
  FiAlertTriangle
} from 'react-icons/fi'

export default function DoctorDashboard() {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedTab, setSelectedTab] = useState('overview')
  const [showNotifications, setShowNotifications] = useState(false)
  const [showAddPatient, setShowAddPatient] = useState(false);
  const [showNewAppointment, setShowNewAppointment] = useState(false);
  const [showVideoCall, setShowVideoCall] = useState(false);
  const [showMessages, setShowMessages] = useState(false);
  const [showEmergency, setShowEmergency] = useState(false);
  const [showReports, setShowReports] = useState(false);
  const { patients, dailyVisits } = useSelector((state) => state.patients)

  // Mock notifications
  const [notifications] = useState([
    { id: 1, type: 'emergency', message: 'Emergency case: Patient John Doe needs immediate attention', time: '5m ago' },
    { id: 2, type: 'appointment', message: 'New appointment scheduled with Sarah Smith', time: '10m ago' },
    { id: 3, type: 'update', message: 'Lab results are ready for patient Mike Johnson', time: '1h ago' },
  ])

  const [user] = useState({
    name: 'Dr. John Smith',
    role: 'Senior Physician',
    avatar: 'https://ui-avatars.com/api/?name=John+Smith&background=0D8ABC&color=fff'
  })

  const [weather] = useState({
    temp: '24°C',
    condition: 'Sunny',
    humidity: '65%'
  })

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  // Calculate statistics
  const totalPatients = patients.length
  const todaysAppointments = patients.filter(p => p.lastVisit === currentTime.toISOString().split('T')[0])
  const remainingAppointments = patients.filter(p => p.status === 'Scheduled').length
  const averageWaitTime = 12
  const emergencyCases = patients.filter(p => p.type === 'Emergency').length

  const quickActions = [
    {
      label: 'Add Patient',
      icon: <FiUserPlus className="w-6 h-6" />,
      color: 'blue',
      action: () => {
        // Add new patient logic
        console.log('Adding new patient...');
        // You can add modal or navigation logic here
      }
    },
    {
      label: 'Schedule',
      icon: <FiCalendar className="w-6 h-6" />,
      color: 'green',
      action: () => {
        // Open scheduling interface
        console.log('Opening schedule...');
        setSelectedTab('appointments');
      }
    },
    {
      label: 'Start Call',
      icon: <FiVideo className="w-6 h-6" />,
      color: 'purple',
      action: () => {
        // Start video call logic
        console.log('Starting video call...');
        // Add video call initialization logic
      }
    },
    {
      label: 'Messages',
      icon: <FiMessageSquare className="w-6 h-6" />,
      color: 'red',
      action: () => {
        // Open messages
        console.log('Opening messages...');
        // Add messaging interface logic
      }
    },
    {
      label: 'New Appointment',
      icon: <FiPlusCircle className="w-6 h-6" />,
      color: 'blue',
      action: () => {
        // Create new appointment
        console.log('Creating new appointment...');
        // Add appointment creation logic
      }
    },
    {
      label: 'Emergency',
      icon: <FiAlertCircle className="w-6 h-6" />,
      color: 'red',
      action: () => {
        // Handle emergency
        console.log('Emergency protocol initiated...');
        // Add emergency handling logic
      }
    },
    {
      label: 'Reports',
      icon: <FiFileText className="w-6 h-6" />,
      color: 'green',
      action: () => {
        // View reports
        console.log('Opening reports...');
        setSelectedTab('analytics');
      }
    },
    {
      label: 'Consultations',
      icon: <FiClipboard className="w-6 h-6" />,
      color: 'purple',
      action: () => {
        // View consultations
        console.log('Opening consultations...');
        // Add consultation view logic
      }
    }
  ];

  const handleQuickAction = (action) => {
    action.action();
  };

  const renderTabContent = () => {
    switch (selectedTab) {
      case 'overview':
        return (
          <>
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              {[
                { 
                  title: 'Total Patients',
                  value: totalPatients,
                  trend: `↑ ${Math.round((totalPatients / 100) * 12)}%`,
                  color: 'blue',
                  icon: <FiUser className="w-6 h-6" />
                },
                { 
                  title: "Today's Appointments",
                  value: todaysAppointments.length,
                  trend: `${remainingAppointments} remaining`,
                  color: 'green',
                  icon: <FiCalendar className="w-6 h-6" />
                },
                { 
                  title: 'Emergency Cases',
                  value: emergencyCases,
                  trend: 'Requires attention',
                  color: 'red',
                  icon: <FiAlertCircle className="w-6 h-6" />
                },
                { 
                  title: 'Average Wait Time',
                  value: `${averageWaitTime}min`,
                  trend: '↓ 2min',
                  color: 'purple',
                  icon: <FiClock className="w-6 h-6" />
                }
              ].map((stat, index) => (
                <div key={index} className={`relative overflow-hidden rounded-2xl bg-${stat.color}-50 shadow-sm transition-all duration-300 hover:scale-105 hover:shadow-lg`}>
                  <div className="relative p-6">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-medium text-gray-800">{stat.title}</h3>
                      <span className={`text-${stat.color}-600`}>{stat.icon}</span>
                    </div>
                    <p className={`text-3xl font-bold text-${stat.color}-600 mt-2`}>{stat.value}</p>
                    <p className={`text-sm text-${stat.color}-500 mt-2`}>{stat.trend}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Appointments Section */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-semibold text-gray-800">Upcoming Appointments</h2>
                <div className="flex space-x-4">
                  <div className="relative">
                    <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search appointments..."
                      className="pl-10 pr-4 py-2.5 rounded-xl bg-white shadow-md border-none focus:ring-2 focus:ring-blue-500 text-sm transition-all duration-300 w-64 hover:shadow-lg focus:shadow-lg"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {patients
                  .filter(appointment => 
                    appointment.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    appointment.appointmentType?.toLowerCase().includes(searchTerm.toLowerCase())
                  )
                  .map((appointment) => {
                    const colors = {
                      Emergency: 'bg-gradient-to-br from-rose-100 to-rose-50 border-rose-200 text-rose-700 hover:from-rose-200 hover:to-rose-100',
                      Scheduled: 'bg-gradient-to-br from-blue-100 to-blue-50 border-blue-200 text-blue-700 hover:from-blue-200 hover:to-blue-100',
                      'Follow-up': 'bg-gradient-to-br from-emerald-100 to-emerald-50 border-emerald-200 text-emerald-700 hover:from-emerald-200 hover:to-emerald-100',
                      Consultation: 'bg-gradient-to-br from-purple-100 to-purple-50 border-purple-200 text-purple-700 hover:from-purple-200 hover:to-purple-100',
                    };
                    const type = appointment.appointmentType || 'Scheduled';
                    const colorClass = colors[type] || colors.Scheduled;

                    return (
                      <div
                        key={appointment.id}
                        className={`group relative overflow-hidden rounded-2xl ${colorClass} p-5 transition-all duration-300 hover:shadow-xl border transform hover:scale-102`}
                      >
                        <div className="flex flex-col h-full min-h-[150px]">
                          <div className="flex items-start justify-between mb-3">
                            <div>
                              <h3 className="font-semibold text-lg">{appointment.name}</h3>
                              <p className="text-sm opacity-90">{appointment.appointmentType}</p>
                            </div>
                            <span className="text-xs font-medium px-3 py-1.5 rounded-xl bg-white/70 backdrop-blur-sm shadow-sm group-hover:shadow-md transition-all duration-300">
                              {appointment.time}
                            </span>
                          </div>
                          <p className="text-sm mb-4">{appointment.reason}</p>
                          <div className="mt-auto flex justify-between items-center">
                            <span className="text-xs font-medium bg-white/50 px-2.5 py-1 rounded-lg">Room {appointment.room}</span>
                            <button 
                              onClick={() => console.log('Viewing details for:', appointment.name)}
                              className="text-xs font-medium px-4 py-1.5 rounded-xl bg-white/70 hover:bg-white shadow-sm hover:shadow-md backdrop-blur-sm transition-all duration-300 transform hover:scale-105"
                            >
                              View Details
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          </>
        );
      case 'patients':
        return (
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Patient Management</h2>
            <p className="text-gray-600">Patient list and management interface coming soon...</p>
          </div>
        );
      case 'analytics':
        return (
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <DashboardCharts ageGroups={[]} genderData={[]} patientTrends={[]} />
          </div>
        );
      case 'tasks':
        return (
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Task Management</h2>
            <p className="text-gray-600">Task management interface coming soon...</p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Quick Actions */}
      <div className="grid grid-cols-3 md:grid-cols-6 gap-4 mb-8">
        <button
          onClick={() => setShowAddPatient(true)}
          className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl shadow-sm hover:shadow-md transition-all duration-200 flex flex-col items-center justify-center space-y-3 group hover:scale-105"
        >
          <div className="p-3 bg-blue-500 rounded-xl text-white group-hover:scale-110 transition-transform duration-200">
            <FiUserPlus className="w-6 h-6" />
          </div>
          <span className="text-sm font-medium text-gray-800">Add Patient</span>
        </button>

        <button
          onClick={() => setShowNewAppointment(true)}
          className="p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-2xl shadow-sm hover:shadow-md transition-all duration-200 flex flex-col items-center justify-center space-y-3 group hover:scale-105"
        >
          <div className="p-3 bg-green-500 rounded-xl text-white group-hover:scale-110 transition-transform duration-200">
            <FiCalendar className="w-6 h-6" />
          </div>
          <span className="text-sm font-medium text-gray-800">New Appointment</span>
        </button>

        <button
          onClick={() => setShowVideoCall(true)}
          className="p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl shadow-sm hover:shadow-md transition-all duration-200 flex flex-col items-center justify-center space-y-3 group hover:scale-105"
        >
          <div className="p-3 bg-purple-500 rounded-xl text-white group-hover:scale-110 transition-transform duration-200">
            <FiVideo className="w-6 h-6" />
          </div>
          <span className="text-sm font-medium text-gray-800">Video Call</span>
        </button>

        <button
          onClick={() => setShowMessages(true)}
          className="p-6 bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-2xl shadow-sm hover:shadow-md transition-all duration-200 flex flex-col items-center justify-center space-y-3 group hover:scale-105"
        >
          <div className="p-3 bg-yellow-500 rounded-xl text-white group-hover:scale-110 transition-transform duration-200">
            <FiMessageSquare className="w-6 h-6" />
          </div>
          <span className="text-sm font-medium text-gray-800">Messages</span>
        </button>

        <button
          onClick={() => setShowEmergency(true)}
          className="p-6 bg-gradient-to-br from-red-50 to-red-100 rounded-2xl shadow-sm hover:shadow-md transition-all duration-200 flex flex-col items-center justify-center space-y-3 group hover:scale-105"
        >
          <div className="p-3 bg-red-500 rounded-xl text-white group-hover:scale-110 transition-transform duration-200">
            <FiAlertTriangle className="w-6 h-6" />
          </div>
          <span className="text-sm font-medium text-gray-800">Emergency</span>
        </button>

        <button
          onClick={() => setShowReports(true)}
          className="p-6 bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-2xl shadow-sm hover:shadow-md transition-all duration-200 flex flex-col items-center justify-center space-y-3 group hover:scale-105"
        >
          <div className="p-3 bg-indigo-500 rounded-xl text-white group-hover:scale-110 transition-transform duration-200">
            <FiFileText className="w-6 h-6" />
          </div>
          <span className="text-sm font-medium text-gray-800">Reports</span>
        </button>
      </div>

      {/* Quick Action Modals */}
      <AddPatient isOpen={showAddPatient} onClose={() => setShowAddPatient(false)} />
      <NewAppointment isOpen={showNewAppointment} onClose={() => setShowNewAppointment(false)} />
      <VideoCall isOpen={showVideoCall} onClose={() => setShowVideoCall(false)} />
      <Messages isOpen={showMessages} onClose={() => setShowMessages(false)} />
      <Emergency isOpen={showEmergency} onClose={() => setShowEmergency(false)} />
      <Reports isOpen={showReports} onClose={() => setShowReports(false)} />

      {/* Header with Navigation and User Profile */}
      <div className="flex justify-between items-center mb-8">
        <nav className="flex space-x-2 rounded-2xl bg-white/80 p-2 shadow-lg backdrop-blur-lg">
          {['overview', 'patients', 'analytics', 'tasks'].map((tab) => (
            <button
              key={tab}
              onClick={() => setSelectedTab(tab)}
              className={`${
                selectedTab === tab
                  ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg transform scale-105'
                  : 'text-gray-600 hover:bg-blue-50 hover:text-blue-600'
              } rounded-xl py-2.5 px-6 text-sm font-medium transition-all duration-300 ease-in-out hover:shadow-md hover:scale-105`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </nav>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2.5 text-gray-600 hover:text-blue-600 bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 ease-in-out hover:scale-105"
            >
              <FiBell className="w-6 h-6" />
              {notifications.length > 0 && (
                <span className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full border-2 border-white animate-pulse"></span>
              )}
            </button>
            {showNotifications && (
              <div className="absolute right-0 mt-3 w-80 bg-white rounded-2xl shadow-xl z-50 overflow-hidden transform transition-all duration-300 ease-in-out">
                <div className="p-4 border-b">
                  <h3 className="font-semibold text-gray-800">Notifications</h3>
                </div>
                <div className="max-h-96 overflow-y-auto">
                  {notifications.map((notification) => (
                    <div key={notification.id} className="p-4 hover:bg-blue-50 transition-colors duration-200 border-b">
                      <div className="flex items-start space-x-3">
                        <span className={`p-2 rounded-xl ${
                          notification.type === 'emergency' ? 'bg-red-100 text-red-600' :
                          notification.type === 'appointment' ? 'bg-blue-100 text-blue-600' :
                          'bg-green-100 text-green-600'
                        } transform transition-transform duration-200 hover:scale-110`}>
                          {notification.type === 'emergency' ? <FiAlertCircle className="w-5 h-5" /> :
                           notification.type === 'appointment' ? <FiCalendar className="w-5 h-5" /> :
                           <FiBell className="w-5 h-5" />}
                        </span>
                        <div>
                          <p className="text-sm text-gray-800">{notification.message}</p>
                          <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          <UserProfile user={user} />
        </div>
      </div>

      {/* Weather Widget */}
      <div className="mb-8 overflow-hidden rounded-xl bg-white shadow-sm">
        <div className="p-6">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-lg font-semibold text-gray-800">Today's Weather</h3>
              <p className="text-3xl font-bold text-blue-600">{weather.temp}</p>
              <p className="text-gray-600">{weather.condition} | Humidity: {weather.humidity}</p>
            </div>
            <div className="text-right">
              <div className="inline-flex items-center space-x-2 bg-blue-50 rounded-lg px-4 py-2">
                <span className="text-blue-600">🌡️</span>
                <span className="text-gray-700">Perfect for patient visits</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      {renderTabContent()}
    </div>
  )
}
