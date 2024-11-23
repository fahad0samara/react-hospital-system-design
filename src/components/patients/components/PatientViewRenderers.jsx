import React from 'react';
import { FiUser, FiCalendar, FiClock, FiFileText, FiEdit2, FiTrash2, FiDownload, FiPrinter, FiEye } from 'react-icons/fi';

const PatientViewRenderers = ({ darkMode, onViewDetails, onScheduleAppointment, onEdit, onDelete, onDownload, onPrint }) => {
  const renderCardView = (patient) => (
    <div className={`p-4 rounded-xl shadow-sm border transition-colors duration-200 ${
      darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
    }`}>
      <div className="flex items-center space-x-4">
        <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
          darkMode ? 'bg-gray-700' : 'bg-blue-50'
        }`}>
          <FiUser className={`text-xl ${darkMode ? 'text-blue-400' : 'text-blue-500'}`} />
        </div>
        <div>
          <h3 className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            {patient.name}
          </h3>
          <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            {patient.condition}
          </p>
        </div>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-2">
        <div className={`p-2 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
          <div className="flex items-center space-x-2">
            <FiCalendar className={darkMode ? 'text-gray-400' : 'text-gray-500'} />
            <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              {patient.nextAppointment}
            </span>
          </div>
        </div>
        <div className={`p-2 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
          <div className="flex items-center space-x-2">
            <FiClock className={darkMode ? 'text-gray-400' : 'text-gray-500'} />
            <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              {patient.lastVisit}
            </span>
          </div>
        </div>
      </div>
      {renderActionButtons(patient)}
      {renderFeatureButtons(patient)}
    </div>
  );

  const renderListView = (patient) => (
    <div className={`p-4 rounded-xl shadow-sm border transition-colors duration-200 ${
      darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
    }`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
            darkMode ? 'bg-gray-700' : 'bg-blue-50'
          }`}>
            <FiUser className={`text-lg ${darkMode ? 'text-blue-400' : 'text-blue-500'}`} />
          </div>
          <div>
            <h3 className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              {patient.name}
            </h3>
            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              {patient.condition}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <div className={`px-4 py-2 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
            <div className="flex items-center space-x-2">
              <FiCalendar className={darkMode ? 'text-gray-400' : 'text-gray-500'} />
              <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                {patient.nextAppointment}
              </span>
            </div>
          </div>
        </div>
        {renderActionButtons(patient)}
        {renderFeatureButtons(patient)}
      </div>
    </div>
  );

  const renderGridView = (patient) => (
    <div className={`p-4 rounded-xl shadow-sm border transition-colors duration-200 ${
      darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
    }`}>
      <div className="flex flex-col items-center text-center">
        <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-3 ${
          darkMode ? 'bg-gray-700' : 'bg-blue-50'
        }`}>
          <FiUser className={`text-2xl ${darkMode ? 'text-blue-400' : 'text-blue-500'}`} />
        </div>
        <h3 className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
          {patient.name}
        </h3>
        <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
          {patient.condition}
        </p>
        <div className="mt-4 w-full grid grid-cols-2 gap-2">
          <div className={`p-2 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
            <div className="flex items-center justify-center space-x-2">
              <FiCalendar className={darkMode ? 'text-gray-400' : 'text-gray-500'} />
              <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                {patient.nextAppointment}
              </span>
            </div>
          </div>
          <div className={`p-2 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
            <div className="flex items-center justify-center space-x-2">
              <FiClock className={darkMode ? 'text-gray-400' : 'text-gray-500'} />
              <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                {patient.lastVisit}
              </span>
            </div>
          </div>
        </div>
        {renderActionButtons(patient)}
        {renderFeatureButtons(patient)}
      </div>
    </div>
  );

  const renderActionButtons = (patient) => (
    <div className="mt-4 flex justify-end space-x-2">
      <button
        className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
          darkMode
            ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
        }`}
        onClick={() => onViewDetails(patient)}
      >
        <FiEye className="w-4 h-4" />
      </button>
      <button
        className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
          darkMode
            ? 'bg-blue-600 text-white hover:bg-blue-500'
            : 'bg-blue-500 text-white hover:bg-blue-600'
        }`}
        onClick={() => onScheduleAppointment(patient)}
      >
        <FiCalendar className="w-4 h-4" />
      </button>
    </div>
  );

  const renderFeatureButtons = (patient) => (
    <div className="mt-2 flex justify-end space-x-2">
      <button
        className={`p-1.5 rounded-lg transition-colors ${
          darkMode
            ? 'text-gray-400 hover:text-gray-300 hover:bg-gray-700'
            : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
        }`}
        onClick={() => onEdit(patient)}
      >
        <FiEdit2 className="w-4 h-4" />
      </button>
      <button
        className={`p-1.5 rounded-lg transition-colors ${
          darkMode
            ? 'text-gray-400 hover:text-gray-300 hover:bg-gray-700'
            : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
        }`}
        onClick={() => onDelete(patient)}
      >
        <FiTrash2 className="w-4 h-4" />
      </button>
      <button
        className={`p-1.5 rounded-lg transition-colors ${
          darkMode
            ? 'text-gray-400 hover:text-gray-300 hover:bg-gray-700'
            : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
        }`}
        onClick={() => onDownload(patient)}
      >
        <FiDownload className="w-4 h-4" />
      </button>
      <button
        className={`p-1.5 rounded-lg transition-colors ${
          darkMode
            ? 'text-gray-400 hover:text-gray-300 hover:bg-gray-700'
            : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
        }`}
        onClick={() => onPrint(patient)}
      >
        <FiPrinter className="w-4 h-4" />
      </button>
    </div>
  );

  return {
    renderCardView,
    renderListView,
    renderGridView,
    renderActionButtons,
    renderFeatureButtons
  };
};

export default PatientViewRenderers;
