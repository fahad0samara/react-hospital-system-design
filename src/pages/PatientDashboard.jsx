import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

export default function PatientDashboard() {
  const { user, isAuthenticated, userType } = useSelector((state) => state.auth)

  if (!isAuthenticated || userType !== 'patient') {
    return <Navigate to="/login" />
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="border-4 border-dashed border-gray-200 rounded-lg p-4">
            <h1 className="text-2xl font-semibold text-gray-900">Patient Dashboard</h1>
            <p className="mt-2 text-gray-600">Welcome, {user.email}</p>
            
            <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {/* Quick Actions */}
              <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="p-5">
                  <h3 className="text-lg font-medium text-gray-900">Book Appointment</h3>
                  <p className="mt-1 text-sm text-gray-500">Schedule a new appointment with a doctor</p>
                  <button className="mt-3 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700">
                    Book Now
                  </button>
                </div>
              </div>

              <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="p-5">
                  <h3 className="text-lg font-medium text-gray-900">Medical Records</h3>
                  <p className="mt-1 text-sm text-gray-500">View your medical history and reports</p>
                  <button className="mt-3 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700">
                    View Records
                  </button>
                </div>
              </div>

              <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="p-5">
                  <h3 className="text-lg font-medium text-gray-900">Prescriptions</h3>
                  <p className="mt-1 text-sm text-gray-500">Access your current prescriptions</p>
                  <button className="mt-3 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700">
                    View Prescriptions
                  </button>
                </div>
              </div>
            </div>

            {/* Upcoming Appointments */}
            <div className="mt-8">
              <h2 className="text-lg font-medium text-gray-900">Upcoming Appointments</h2>
              <div className="mt-4 bg-white shadow overflow-hidden sm:rounded-lg">
                <ul className="divide-y divide-gray-200">
                  <li className="px-4 py-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-900">Dr. Sarah Wilson</p>
                        <p className="text-sm text-gray-500">General Checkup</p>
                      </div>
                      <div className="text-sm text-gray-500">Tomorrow 10:00 AM</div>
                    </div>
                  </li>
                  <li className="px-4 py-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-900">Dr. Michael Brown</p>
                        <p className="text-sm text-gray-500">Dental Checkup</p>
                      </div>
                      <div className="text-sm text-gray-500">Next Week</div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            {/* Recent Prescriptions */}
            <div className="mt-8">
              <h2 className="text-lg font-medium text-gray-900">Recent Prescriptions</h2>
              <div className="mt-4 bg-white shadow overflow-hidden sm:rounded-lg">
                <ul className="divide-y divide-gray-200">
                  <li className="px-4 py-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-900">Amoxicillin</p>
                        <p className="text-sm text-gray-500">500mg - 3 times daily</p>
                      </div>
                      <div className="text-sm text-gray-500">5 days remaining</div>
                    </div>
                  </li>
                  <li className="px-4 py-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-900">Ibuprofen</p>
                        <p className="text-sm text-gray-500">200mg - As needed</p>
                      </div>
                      <div className="text-sm text-gray-500">2 days remaining</div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
