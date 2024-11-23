import React from 'react';
import { FiX, FiCalendar, FiFileText, FiActivity } from 'react-icons/fi';

const MedicalHistoryModal = ({ darkMode, patient, onClose }) => {
  if (!patient) return null;

  const medicalHistory = [
    {
      date: '2023-12-01',
      condition: 'Regular Checkup',
      notes: 'Patient reported mild headaches. Prescribed pain medication.',
      doctor: 'Dr. Smith'
    },
    {
      date: '2023-11-15',
      condition: 'Flu Symptoms',
      notes: 'Fever and cough. Prescribed antibiotics and rest.',
      doctor: 'Dr. Johnson'
    },
    // Add more history items as needed
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75" onClick={onClose}></div>

        <div className={`inline-block w-full max-w-3xl p-6 my-8 overflow-hidden text-left align-middle transition-all transform shadow-xl rounded-2xl ${
          darkMode ? 'bg-gray-800' : 'bg-white'
        }`}>
          <div className="flex justify-between items-center mb-6">
            <h3 className={`text-2xl font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Medical History - {patient.name}
            </h3>
            <button
              onClick={onClose}
              className={`p-2 rounded-lg transition-colors ${
                darkMode
                  ? 'hover:bg-gray-700 text-gray-400 hover:text-white'
                  : 'hover:bg-gray-100 text-gray-500 hover:text-gray-700'
              }`}
            >
              <FiX size={20} />
            </button>
          </div>

          {/* Patient Summary */}
          <div className={`p-4 rounded-xl mb-6 ${darkMode ? 'bg-gray-700/50' : 'bg-gray-50'}`}>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Age</p>
                <p className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  {patient.age} years
                </p>
              </div>
              <div>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Blood Type</p>
                <p className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  {patient.bloodGroup}
                </p>
              </div>
              <div>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  Known Allergies
                </p>
                <p className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  None reported
                </p>
              </div>
            </div>
          </div>

          {/* Medical History Timeline */}
          <div className="space-y-4">
            {medicalHistory.map((record, index) => (
              <div
                key={index}
                className={`p-4 rounded-xl border ${
                  darkMode
                    ? 'bg-gray-800 border-gray-700'
                    : 'bg-white border-gray-200'
                }`}
              >
                <div className="flex items-start space-x-4">
                  <div className={`p-2 rounded-lg ${
                    darkMode ? 'bg-gray-700' : 'bg-gray-100'
                  }`}>
                    <FiActivity className={`w-5 h-5 ${
                      darkMode ? 'text-blue-400' : 'text-blue-500'
                    }`} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className={`font-medium ${
                        darkMode ? 'text-white' : 'text-gray-900'
                      }`}>
                        {record.condition}
                      </h4>
                      <div className="flex items-center space-x-2">
                        <FiCalendar className={darkMode ? 'text-gray-400' : 'text-gray-500'} />
                        <span className={`text-sm ${
                          darkMode ? 'text-gray-400' : 'text-gray-500'
                        }`}>
                          {record.date}
                        </span>
                      </div>
                    </div>
                    <p className={`mt-2 text-sm ${
                      darkMode ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      {record.notes}
                    </p>
                    <div className="mt-2 flex items-center space-x-2">
                      <FiFileText className={darkMode ? 'text-gray-400' : 'text-gray-500'} />
                      <span className={`text-sm ${
                        darkMode ? 'text-gray-400' : 'text-gray-500'
                      }`}>
                        Attending: {record.doctor}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MedicalHistoryModal;
