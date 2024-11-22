import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import DashboardCharts from '../components/DashboardCharts'
import UserProfile from '../components/UserProfile'

export default function DoctorDashboard() {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedTab, setSelectedTab] = useState('overview')
  const { patients, dailyVisits } = useSelector((state) => state.patients)

  // Mock user data (replace with real data from auth state)
  const [user] = useState({
    name: 'Dr. John Smith',
    role: 'Senior Physician',
    avatar: 'https://ui-avatars.com/api/?name=John+Smith&background=0D8ABC&color=fff'
  })

  // Weather data (mock)
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

  // Age distribution data
  const ageGroups = patients.reduce((acc, patient) => {
    const age = patient.age
    if (age < 18) acc[0].value++
    else if (age < 30) acc[1].value++
    else if (age < 50) acc[2].value++
    else acc[3].value++
    return acc
  }, [
    { name: 'Under 18', value: 0 },
    { name: '18-30', value: 0 },
    { name: '31-50', value: 0 },
    { name: 'Over 50', value: 0 }
  ])

  // Gender distribution
  const genderData = patients.reduce((acc, patient) => {
    const gender = patient.gender
    const existingGender = acc.find(item => item.name === gender)
    if (existingGender) {
      existingGender.value++
    } else {
      acc.push({ name: gender, value: 1 })
    }
    return acc
  }, [])

  // Patient trends data
  const patientTrends = Object.entries(dailyVisits).map(([name, patients]) => ({
    name,
    patients
  }))

  // Upcoming appointments
  const upcomingAppointments = patients
    .filter(p => p.status === 'Scheduled')
    .slice(0, 5)

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-6">
      {/* Header with Navigation and User Profile */}
      <div className="flex justify-between items-center mb-8">
        <nav className="flex space-x-1 rounded-xl bg-white/30 p-1 backdrop-blur-lg">
          {['overview', 'patients', 'analytics', 'tasks'].map((tab) => (
            <button
              key={tab}
              onClick={() => setSelectedTab(tab)}
              className={`${
                selectedTab === tab
                  ? 'bg-white text-blue-600 shadow-lg'
                  : 'text-gray-600 hover:bg-white/50 hover:text-blue-600'
              } flex-1 rounded-lg py-2.5 px-6 text-sm font-medium transition-all duration-200`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </nav>
        <UserProfile user={user} />
      </div>

      {/* Weather Widget */}
      <div className="mb-8 overflow-hidden rounded-2xl bg-gradient-to-r from-blue-500/10 to-purple-500/10 backdrop-blur-lg">
        <div className="p-6">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-lg font-semibold text-gray-800">Today's Weather</h3>
              <p className="text-3xl font-bold text-blue-600">{weather.temp}</p>
              <p className="text-gray-600">{weather.condition} | Humidity: {weather.humidity}</p>
            </div>
            <div className="text-right">
              <div className="inline-flex items-center space-x-2 bg-white/50 rounded-lg px-4 py-2 backdrop-blur-sm">
                <span className="text-blue-600">🌡️</span>
                <span className="text-gray-700">Perfect for patient visits</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {[
          { 
            title: 'Total Patients',
            value: totalPatients,
            trend: `↑ ${Math.round((totalPatients / 100) * 12)}%`,
            color: 'blue',
            icon: '👥'
          },
          { 
            title: "Today's Appointments",
            value: todaysAppointments.length,
            trend: `${remainingAppointments} remaining`,
            color: 'green',
            icon: '📅'
          },
          { 
            title: 'Emergency Cases',
            value: emergencyCases,
            trend: 'Requires attention',
            color: 'red',
            icon: '🚨'
          },
          { 
            title: 'Average Wait Time',
            value: `${averageWaitTime}min`,
            trend: '↓ 2min',
            color: 'purple',
            icon: '⏱️'
          }
        ].map((stat, index) => (
          <div key={index} className="relative overflow-hidden rounded-2xl bg-white/30 backdrop-blur-lg transition-all duration-300 hover:scale-105 hover:shadow-lg">
            <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-transparent"></div>
            <div className="relative p-6">
              <div className="flex items-center space-x-2">
                <span className="text-xl">{stat.icon}</span>
                <h3 className="text-sm font-medium text-gray-600">{stat.title}</h3>
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
            <input
              type="text"
              placeholder="Search appointments..."
              className="px-4 py-2 rounded-lg bg-white/50 border-none focus:ring-2 focus:ring-blue-500 text-sm backdrop-blur-sm transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {upcomingAppointments
            .filter(appointment => 
              appointment.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
              appointment.appointmentType.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .map((appointment) => {
              const colors = {
                Emergency: 'from-red-100 to-red-50 border-red-200',
                Scheduled: 'from-blue-100 to-blue-50 border-blue-200',
                'Follow-up': 'from-green-100 to-green-50 border-green-200',
                Consultation: 'from-purple-100 to-purple-50 border-purple-200',
              };
              const type = appointment.appointmentType || 'Scheduled';
              const colorClass = colors[type] || colors.Scheduled;

              return (
                <div
                  key={appointment.id}
                  className={`group relative overflow-hidden rounded-xl bg-gradient-to-br ${colorClass} p-4 transition-all hover:shadow-lg border border-opacity-50`}
                >
                  <div className="flex flex-col h-full min-h-[150px]">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold text-gray-800">{appointment.name}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        appointment.status === 'Completed'
                          ? 'bg-green-200 text-green-800'
                          : appointment.status === 'In Progress'
                          ? 'bg-yellow-200 text-yellow-800'
                          : 'bg-blue-200 text-blue-800'
                      }`}>
                        {appointment.status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 flex-grow">{appointment.condition}</p>
                    <div className="flex items-center justify-between text-sm text-gray-600 mt-4">
                      <div className="flex items-center">
                        <span className="mr-2">🕒</span>
                        {appointment.appointmentTime}
                      </div>
                      <div className="flex items-center">
                        <span className="mr-2">📋</span>
                        {appointment.appointmentType}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>

      {/* Charts Section */}
      <DashboardCharts 
        ageGroups={ageGroups}
        genderData={genderData}
        patientTrends={patientTrends}
      />
    </div>
  )
}
