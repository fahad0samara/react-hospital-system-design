import React from 'react';
import { FiEye, FiPrinter, FiEdit2, FiTrash2 } from 'react-icons/fi';

const PatientGrid = ({
  patient,
  darkMode,
  handleViewDetails,
  handlePrintSingle,
  handleEditPatient,
  handleDeleteClick,
  renderFeatureButtons,
}) => {
  return (
    <div
      key={patient.id}
      className={`rounded-xl ${
        darkMode 
          ? 'bg-gray-800 border border-gray-700'
          : 'bg-white border border-gray-200'
      } p-6 space-y-4`}
    >
      {/* Patient basic info */}
      <div className="flex items-start justify-between">
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
            <h3 className={`text-lg font-semibold ${
              darkMode ? 'text-white' : 'text-gray-900'
            }`}>
              {patient.name}
            </h3>
            <p className={`text-sm ${
              darkMode ? 'text-gray-400' : 'text-gray-600'
            }`}>
              ID: {patient.id}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => handleViewDetails(patient)}
            className={`p-2 rounded-lg transition-all duration-200 ${
              darkMode
                ? 'text-gray-400 hover:text-white hover:bg-gray-600'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
            }`}
            title="View Details"
          >
            <FiEye size={18} />
          </button>
          <button
            onClick={() => handlePrintSingle(patient)}
            className={`p-2 rounded-lg transition-all duration-200 ${
              darkMode
                ? 'text-gray-400 hover:text-white hover:bg-gray-600'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
            }`}
            title="Print Patient Details"
          >
            <FiPrinter size={18} />
          </button>
          <button
            onClick={() => handleEditPatient(patient)}
            className={`p-2 rounded-lg transition-all duration-200 ${
              darkMode
                ? 'text-gray-400 hover:text-white hover:bg-gray-600'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
            }`}
            title="Edit Patient"
          >
            <FiEdit2 size={18} />
          </button>
          <button
            onClick={() => handleDeleteClick(patient)}
            className={`p-2 rounded-lg transition-all duration-200 ${
              darkMode
                ? 'text-gray-400 hover:text-white hover:bg-gray-600'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
            }`}
            title="Delete Patient"
          >
            <FiTrash2 size={18} />
          </button>
        </div>
      </div>

      {/* Patient details */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className={`text-sm ${
            darkMode ? 'text-gray-400' : 'text-gray-600'
          }`}>
            Phone: {patient.phone}
          </p>
          <p className={`text-sm ${
            darkMode ? 'text-gray-400' : 'text-gray-600'
          }`}>
            Email: {patient.email}
          </p>
        </div>
        <div>
          <p className={`text-sm ${
            darkMode ? 'text-gray-400' : 'text-gray-600'
          }`}>
            Age: {patient.age}
          </p>
          <p className={`text-sm ${
            darkMode ? 'text-gray-400' : 'text-gray-600'
          }`}>
            Gender: {patient.gender}
          </p>
        </div>
      </div>

      {/* Feature buttons */}
      {renderFeatureButtons(patient)}
    </div>
  );
};

export default PatientGrid;
