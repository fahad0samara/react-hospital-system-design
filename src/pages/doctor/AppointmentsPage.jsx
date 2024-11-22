import { useState } from 'react'

export default function AppointmentsPage() {
  const [appointments] = useState([
    {
      id: 1,
      patientName: 'John Doe',
      date: '2024-03-20',
      time: '09:00 AM',
      type: 'General Checkup',
      status: 'Confirmed'
    },
    {
      id: 2,
      patientName: 'Jane Smith',
      date: '2024-03-20',
      time: '10:00 AM',
      type: 'Follow-up',
      status: 'Pending'
    },
    {
      id: 3,
      patientName: 'Robert Johnson',
      date: '2024-03-20',
      time: '11:00 AM',
      type: 'Consultation',
      status: 'Confirmed'
    }
  ])

  return (
    <div className="py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Appointments</h1>
        <button className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700">
          New Appointment
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <input
            type="date"
            className="border rounded-md px-3 py-2"
            placeholder="Filter by date"
          />
          <select className="border rounded-md px-3 py-2">
            <option value="">All Status</option>
            <option value="confirmed">Confirmed</option>
            <option value="pending">Pending</option>
            <option value="cancelled">Cancelled</option>
          </select>
          <select className="border rounded-md px-3 py-2">
            <option value="">All Types</option>
            <option value="checkup">General Checkup</option>
            <option value="followup">Follow-up</option>
            <option value="consultation">Consultation</option>
          </select>
          <input
            type="text"
            className="border rounded-md px-3 py-2"
            placeholder="Search patient name..."
          />
        </div>
      </div>

      {/* Appointments Table */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Patient
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date & Time
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Type
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {appointments.map((appointment) => (
              <tr key={appointment.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    {appointment.patientName}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {appointment.date}
                  </div>
                  <div className="text-sm text-gray-500">
                    {appointment.time}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{appointment.type}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      appointment.status === 'Confirmed'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}
                  >
                    {appointment.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button className="text-indigo-600 hover:text-indigo-900 mr-3">
                    Edit
                  </button>
                  <button className="text-red-600 hover:text-red-900">
                    Cancel
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
