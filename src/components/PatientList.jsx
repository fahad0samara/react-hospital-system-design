import { useSelector, useDispatch } from 'react-redux'
import { deletePatient } from '../features/patientSlice'

export default function PatientList() {
  const patients = useSelector((state) => state.patients.patients)
  const dispatch = useDispatch()

  const handleDelete = (id) => {
    dispatch(deletePatient(id))
  }

  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg">
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900">Patients List</h3>
      </div>
      <div className="border-t border-gray-200">
        <ul className="divide-y divide-gray-200">
          {patients.map((patient) => (
            <li key={patient.id} className="px-4 py-4 sm:px-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900">{patient.name}</p>
                    <p className="text-sm text-gray-500">{patient.email}</p>
                  </div>
                </div>
                <button
                  onClick={() => handleDelete(patient.id)}
                  className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
