import React from 'react';
import { FiX, FiUser, FiPhone, FiMail, FiMapPin } from 'react-icons/fi';

const ViewPatientModal = ({ darkMode, patient, onClose }) => {
  if (!patient) return null;

  return (
    <div className={`fixed inset-0 z-50 overflow-y-auto`}>
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75" onClick={onClose}></div>

        <div className={`inline-block w-full max-w-2xl p-6 my-8 overflow-hidden text-left align-middle transition-all transform shadow-xl rounded-2xl ${
          darkMode ? 'bg-gray-800' : 'bg-white'
        }`}>
          <div className="flex justify-between items-center mb-6">
            <h3 className={`text-2xl font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Patient Details
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

          <div className="space-y-6">
            {/* Basic Info */}
            <div className="flex items-center space-x-4">
              <div className={`w-16 h-16 rounded-full flex items-center justify-center ${
                darkMode ? 'bg-gray-700' : 'bg-blue-50'
              }`}>
                <FiUser className={`text-2xl ${darkMode ? 'text-blue-400' : 'text-blue-500'}`} />
              </div>
              <div>
                <h4 className={`text-xl font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  {patient.name}
                </h4>
                <p className={`${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  ID: {patient.id}
                </p>
              </div>
            </div>

            {/* Contact Info */}
            <div className={`grid grid-cols-2 gap-6 p-4 rounded-xl ${
              darkMode ? 'bg-gray-700/50' : 'bg-gray-50'
            }`}>
              <div className="flex items-center space-x-3">
                <FiPhone className={darkMode ? 'text-gray-400' : 'text-gray-500'} />
                <div>
                  <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Phone</p>
                  <p className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    {patient.phone}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <FiMail className={darkMode ? 'text-gray-400' : 'text-gray-500'} />
                <div>
                  <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Email</p>
                  <p className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    {patient.email}
                  </p>
                </div>
              </div>
            </div>

            {/* Personal Info */}
            <div className="grid grid-cols-3 gap-6">
              <div>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Age</p>
                <p className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  {patient.age} years
                </p>
              </div>
              <div>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Gender</p>
                <p className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  {patient.gender}
                </p>
              </div>
              <div>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Blood Type</p>
                <p className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  {patient.bloodGroup}
                </p>
              </div>
            </div>

            {/* Address */}
            <div className={`p-4 rounded-xl ${darkMode ? 'bg-gray-700/50' : 'bg-gray-50'}`}>
              <div className="flex items-center space-x-3">
                <FiMapPin className={darkMode ? 'text-gray-400' : 'text-gray-500'} />
                <div>
                  <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Address</p>
                  <p className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    {patient.address}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewPatientModal;
