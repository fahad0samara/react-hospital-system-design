import React from 'react';
import { FiX, FiAlertTriangle } from 'react-icons/fi';

const ConfirmDeleteModal = ({ darkMode, patient, onClose, onConfirm }) => {
  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75" onClick={onClose}></div>

        <div className={`inline-block w-full max-w-lg p-6 my-8 overflow-hidden text-left align-middle transition-all transform shadow-xl rounded-2xl ${
          darkMode ? 'bg-gray-800' : 'bg-white'
        }`}>
          <div className="flex justify-between items-center mb-6">
            <h3 className={`text-2xl font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Confirm Delete
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

          <div className="mb-6">
            <div className="flex items-center justify-center mb-4">
              <FiAlertTriangle className="text-red-500" size={48} />
            </div>
            <p className={`text-center mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Are you sure you want to delete the patient:
            </p>
            <p className={`text-center font-semibold text-lg ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              {patient.name}
            </p>
            <p className={`text-center mt-2 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              This action cannot be undone.
            </p>
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className={`px-4 py-2 rounded-lg ${
                darkMode
                  ? 'bg-gray-700 hover:bg-gray-600 text-gray-300'
                  : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
              }`}
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={onConfirm}
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
            >
              Delete Patient
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDeleteModal;
