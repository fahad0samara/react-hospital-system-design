import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import DashboardCharts from '../components/DashboardCharts'
import UserProfile from '../components/UserProfile'
import { FiBell, FiCalendar, FiClock, FiUser, FiAlertCircle, FiSearch, FiPlus } from 'react-icons/fi'

export default function DoctorDashboard() {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedTab, setSelectedTab] = useState('overview')
  const [showNotifications, setShowNotifications] = useState(false)
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

  // Quick actions
  const quickActions = [
    { icon: <FiPlus className="w-5 h-5" />, label: 'New Appointment', color: 'blue', onClick: () => console.log('New Appointment clicked') },
    { icon: <FiUser className="w-5 h-5" />, label: 'Add Patient', color: 'green', onClick: () => console.log('Add Patient clicked') },
    { icon: <FiAlertCircle className="w-5 h-5" />, label: 'Emergency Case', color: 'red', onClick: () => console.log('Emergency clicked') },
    { icon: <FiClock className="w-5 h-5" />, label: 'Schedule Break', color: 'purple', onClick: () => console.log('Schedule Break clicked') },
  ]

  const handleQuickAction = (action) => {
    action.onClick();
  }

  const handleViewDetails = (appointment) => {
    console.log('Viewing details for:', appointment.name);
    // Add your view details logic here
  }

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

            {/* Quick Actions */}
            <div className="mb-8">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {quickActions.map((action, index) => (
                  <button
                    key={index}
                    onClick={() => handleQuickAction(action)}
                    className={`flex items-center justify-center space-x-2 p-4 rounded-xl bg-${action.color}-50 hover:bg-${action.color}-100 transition-colors duration-200 border border-${action.color}-200`}
                  >
                    <span className={`text-${action.color}-600`}>{action.icon}</span>
                    <span className={`text-${action.color}-700 font-medium`}>{action.label}</span>
                  </button>
                ))}
              </div>
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
                      className="pl-10 pr-4 py-2 rounded-lg bg-white shadow-sm border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm transition-all w-64"
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
                      Emergency: 'bg-red-50 border-red-200 text-red-700',
                      Scheduled: 'bg-blue-50 border-blue-200 text-blue-700',
                      'Follow-up': 'bg-green-50 border-green-200 text-green-700',
                      Consultation: 'bg-purple-50 border-purple-200 text-purple-700',
                    };
                    const type = appointment.appointmentType || 'Scheduled';
                    const colorClass = colors[type] || colors.Scheduled;

                    return (
                      <div
                        key={appointment.id}
                        className={`group relative overflow-hidden rounded-xl ${colorClass} p-4 transition-all hover:shadow-lg border`}
                      >
                        <div className="flex flex-col h-full min-h-[150px]">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <h3 className="font-semibold">{appointment.name}</h3>
                              <p className="text-sm opacity-75">{appointment.appointmentType}</p>
                            </div>
                            <span className="text-xs font-medium px-2 py-1 rounded-full bg-white/50">
                              {appointment.time}
                            </span>
                          </div>
                          <p className="text-sm mb-4">{appointment.reason}</p>
                          <div className="mt-auto flex justify-between items-center">
                            <span className="text-xs">Room {appointment.room}</span>
                            <button 
                              onClick={() => handleViewDetails(appointment)}
                              className="text-xs font-medium px-3 py-1 rounded-lg bg-white hover:bg-opacity-75 transition-colors"
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
      {/* Header with Navigation and User Profile */}
      <div className="flex justify-between items-center mb-8">
        <nav className="flex space-x-1 rounded-xl bg-white p-1 shadow-sm">
          {['overview', 'patients', 'analytics', 'tasks'].map((tab) => (
            <button
              key={tab}
              onClick={() => setSelectedTab(tab)}
              className={`${
                selectedTab === tab
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'text-gray-600 hover:bg-gray-100'
              } flex-1 rounded-lg py-2.5 px-6 text-sm font-medium transition-all duration-200`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </nav>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 text-gray-600 hover:text-blue-600 transition-colors rounded-lg hover:bg-gray-100"
            >
              <FiBell className="w-6 h-6" />
              {notifications.length > 0 && (
                <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
              )}
            </button>
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-lg z-50 overflow-hidden">
                <div className="p-4 border-b">
                  <h3 className="font-semibold text-gray-800">Notifications</h3>
                </div>
                <div className="max-h-96 overflow-y-auto">
                  {notifications.map((notification) => (
                    <div key={notification.id} className="p-4 hover:bg-gray-50 transition-colors border-b">
                      <div className="flex items-start space-x-3">
                        <span className={`p-2 rounded-full ${
                          notification.type === 'emergency' ? 'bg-red-100 text-red-600' :
                          notification.type === 'appointment' ? 'bg-blue-100 text-blue-600' :
                          'bg-green-100 text-green-600'
                        }`}>
                          {notification.type === 'emergency' ? <FiAlertCircle /> :
                           notification.type === 'appointment' ? <FiCalendar /> :
                           <FiBell />}
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
