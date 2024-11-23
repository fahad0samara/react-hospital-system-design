import React from 'react';
import { FiEye, FiCalendar, FiFileText, FiFolder } from 'react-icons/fi';

const PatientTable = ({
  patients,
  darkMode,
  handleViewDetails,
  handleScheduleAppointment,
  handleAddPrescription,
  handleAddMedicalHistory,
}) => {
  return (
    <div className={`overflow-x-auto rounded-xl border ${
      darkMode ? 'border-gray-700 bg-gray-800/50' : 'border-gray-200 bg-white'
    } shadow-lg`}>
      <table className="w-full">
        <thead>
          <tr className={darkMode ? 'bg-gray-800' : 'bg-gray-50'}>
            <th className={`px-6 py-3 text-left text-xs font-medium ${
              darkMode ? 'text-gray-400' : 'text-gray-500'
            } uppercase tracking-wider`}>
              Patient
            </th>
            <th className={`px-6 py-3 text-left text-xs font-medium ${
              darkMode ? 'text-gray-400' : 'text-gray-500'
            } uppercase tracking-wider`}>
              Contact
            </th>
            <th className={`px-6 py-3 text-left text-xs font-medium ${
              darkMode ? 'text-gray-400' : 'text-gray-500'
            } uppercase tracking-wider`}>
              Status
            </th>
            <th className={`px-6 py-3 text-right text-xs font-medium ${
              darkMode ? 'text-gray-400' : 'text-gray-500'
            } uppercase tracking-wider`}>
              Actions
            </th>
          </tr>
        </thead>
        <tbody className={`divide-y ${
          darkMode ? 'divide-gray-700' : 'divide-gray-200'
        }`}>
          {patients.map((patient) => (
            <tr
              key={patient.id}
              className={darkMode ? 'bg-gray-800/50' : 'bg-white'}
            >
              <td className="px-6 py-4">
                <div className="flex items-center space-x-3">
                  <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                    darkMode ? 'bg-gray-700' : 'bg-gray-100'
                  }`}>
                    <span className={`text-lg font-medium ${
                      darkMode ? 'text-gray-300' : 'text-gray-600'
                    }`}>
                      {patient.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className={`font-medium ${
                      darkMode ? 'text-white' : 'text-gray-900'
                    }`}>
                      {patient.name}
                    </p>
                    <p className={`text-sm ${
                      darkMode ? 'text-gray-400' : 'text-gray-500'
                    }`}>
                      ID: {patient.id}
                    </p>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4">
                <p className={`text-sm ${
                  darkMode ? 'text-gray-300' : 'text-gray-900'
                }`}>
                  {patient.phone}
                </p>
                <p className={`text-sm ${
                  darkMode ? 'text-gray-400' : 'text-gray-500'
                }`}>
                  {patient.email}
                </p>
              </td>
              <td className="px-6 py-4">
                <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ring-1 ring-inset ${
                  patient.status === 'Active'
                    ? darkMode 
                      ? 'bg-green-400/10 text-green-400 ring-green-400/30' 
                      : 'bg-green-50 text-green-700 ring-green-600/20'
                    : darkMode
                      ? 'bg-red-400/10 text-red-400 ring-red-400/30'
                      : 'bg-red-50 text-red-700 ring-red-600/20'
                }`}>
                  {patient.status}
                </span>
              </td>
              <td className="px-6 py-4">
                <div className="flex justify-end space-x-3">
                  <button
                    onClick={() => handleViewDetails(patient)}
                    className={`p-1.5 rounded-lg transition-colors ${
                      darkMode
                        ? 'text-gray-400 hover:text-white hover:bg-gray-600'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                    }`}
                    title="View Details"
                  >
                    <FiEye className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleScheduleAppointment(patient)}
                    className={`p-1.5 rounded-lg transition-colors ${
                      darkMode
                        ? 'text-gray-400 hover:text-white hover:bg-gray-600'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                    }`}
                    title="Schedule Appointment"
                  >
                    <FiCalendar className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleAddPrescription(patient)}
                    className={`p-1.5 rounded-lg transition-colors ${
                      darkMode
                        ? 'text-gray-400 hover:text-white hover:bg-gray-600'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                    }`}
                    title="Add Prescription"
                  >
                    <FiFileText className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleAddMedicalHistory(patient)}
                    className={`p-1.5 rounded-lg transition-colors ${
                      darkMode
                        ? 'text-gray-400 hover:text-white hover:bg-gray-600'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                    }`}
                    title="Medical History"
                  >
                    <FiFolder className="w-4 h-4" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PatientTable;
