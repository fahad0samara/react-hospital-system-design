import { Link, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'

export default function Sidebar() {
  const location = useLocation()
  const { userType } = useSelector((state) => state.auth)

  const doctorLinks = [
    { name: 'Dashboard', path: '/doctor-dashboard', icon: '📊' },
    { name: 'Appointments', path: '/doctor/appointments', icon: '📅' },
    { name: 'Patients', path: '/doctor/patients', icon: '👥' },
    { name: 'Quick Notes', path: '/doctor/notes', icon: '📝' },
    { name: 'Settings', path: '/doctor/settings', icon: '⚙️' }
  ]

  const patientLinks = [
    { name: 'Dashboard', path: '/patient-dashboard', icon: '📊' },
    { name: 'My Appointments', path: '/patient/appointments', icon: '📅' },
    { name: 'Medical Records', path: '/patient/records', icon: '📋' },
    { name: 'Profile', path: '/patient/profile', icon: '👤' }
  ]

  const links = userType === 'doctor' ? doctorLinks : patientLinks

  return (
    <div className="w-64 bg-white shadow-lg">
      <div className="h-full px-3 py-4 overflow-y-auto">
        <ul className="space-y-2">
          {links.map((link) => (
            <li key={link.path}>
              <Link
                to={link.path}
                className={`flex items-center p-2 text-base font-normal rounded-lg ${
                  location.pathname === link.path
                    ? 'bg-indigo-100 text-indigo-700'
                    : 'text-gray-900 hover:bg-gray-100'
                }`}
              >
                <span className="mr-3">{link.icon}</span>
                <span>{link.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
