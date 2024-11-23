import React from 'react';
import { FiDownload, FiPlus, FiGrid, FiList } from 'react-icons/fi';

const PatientHeader = ({ darkMode, onExportPDF, onExportExcel, onAddClick, viewMode, onViewModeChange }) => {
  return (
    <div className="flex justify-between items-center">
      <h1 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
        Patients
      </h1>
      <div className="flex space-x-2">
        <div className={`flex rounded-lg overflow-hidden ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
          <button
            onClick={() => onViewModeChange('grid')}
            className={`px-3 py-2 ${
              viewMode === 'grid'
                ? 'bg-blue-500 text-white'
                : darkMode
                ? 'text-gray-300 hover:bg-gray-600'
                : 'text-gray-600 hover:bg-gray-200'
            }`}
            title="Grid View"
          >
            <FiGrid className="w-4 h-4" />
          </button>
          <button
            onClick={() => onViewModeChange('list')}
            className={`px-3 py-2 ${
              viewMode === 'list'
                ? 'bg-blue-500 text-white'
                : darkMode
                ? 'text-gray-300 hover:bg-gray-600'
                : 'text-gray-600 hover:bg-gray-200'
            }`}
            title="List View"
          >
            <FiList className="w-4 h-4" />
          </button>
        </div>
        <button
          onClick={onExportPDF}
          className={`px-3 py-2 rounded-lg ${
            darkMode ? 'bg-gray-700 hover:bg-gray-600 text-gray-300' : 'bg-gray-100 hover:bg-gray-200 text-gray-600'
          }`}
          title="Export to PDF"
        >
          <FiDownload className="w-4 h-4" />
        </button>
        <button
          onClick={onExportExcel}
          className={`px-3 py-2 rounded-lg ${
            darkMode ? 'bg-gray-700 hover:bg-gray-600 text-gray-300' : 'bg-gray-100 hover:bg-gray-200 text-gray-600'
          }`}
          title="Export to Excel"
        >
          <FiDownload className="w-4 h-4" />
        </button>
        <button
          onClick={onAddClick}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex items-center space-x-2"
          title="Add New Patient"
        >
          <FiPlus className="w-4 h-4" />
          <span>Add Patient</span>
        </button>
      </div>
    </div>
  );
};

export default PatientHeader;
