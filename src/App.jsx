import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './app/store'
import Login from './components/Login'
import Register from './components/Register'
import DoctorDashboard from './pages/DoctorDashboard'
import PatientDashboard from './pages/PatientDashboard'
import AppointmentsPage from './pages/doctor/AppointmentsPage'
import PatientsPage from './pages/doctor/PatientsPage'
import QuickNotes from './pages/QuickNotes'
import Sidebar from './components/Sidebar'
import { useSelector } from 'react-redux'
import { logout } from './features/authSlice'
import { useDispatch } from 'react-redux'
import React from 'react';
import { EmergencyProvider } from './context/EmergencyContext';
import EmergencyDashboard from './components/dashboard/EmergencyDashboard';
import AdminDashboard from './components/dashboard/AdminDashboard';

function Navigation() {
  const { isAuthenticated, user } = useSelector((state) => state.auth)
  const dispatch = useDispatch()

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="text-xl font-bold text-indigo-600">Hospital Management</span>
            </Link>
          </div>
          <div className="flex items-center">
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <span className="text-gray-700">Welcome, {user?.email}</span>
                <button
                  onClick={() => dispatch(logout())}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  to="/login"
                  className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

function Layout({ children }) {
  const { isAuthenticated } = useSelector((state) => state.auth)

  if (!isAuthenticated) {
    return children
  }

  return (
    <div className="flex h-[calc(100vh-4rem)]">
      <Sidebar />
      <div className="flex-1 overflow-auto p-8">
        {children}
      </div>
    </div>
  )
}

function App() {
  return (
    <Provider store={store}>
      <EmergencyProvider>
        <Router>
          <div className="min-h-screen bg-gray-50">
            <Navigation />
            <Layout>
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/doctor-dashboard" element={<DoctorDashboard />} />
                <Route path="/doctor/appointments" element={<AppointmentsPage />} />
                <Route path="/doctor/patients" element={<PatientsPage />} />
                <Route path="/doctor/notes" element={<QuickNotes />} />
                <Route path="/patient-dashboard" element={<PatientDashboard />} />
                <Route path="/emergency-dashboard" element={<EmergencyDashboard />} />
                <Route path="/admin/emergency" element={<AdminDashboard />} />
                <Route path="/doctor/emergency" element={<EmergencyDashboard />} />
                <Route path="/" element={<Navigate to="/admin/emergency" replace />} />
              </Routes>
            </Layout>
          </div>
        </Router>
      </EmergencyProvider>
    </Provider>
  )
}

export default App
