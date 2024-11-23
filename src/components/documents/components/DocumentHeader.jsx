import React from 'react';
import { useTheme } from '../../../context/ThemeContext';
import { FiUpload, FiPieChart } from 'react-icons/fi';

const DocumentHeader = ({ onUploadClick, onReportClick }) => {
  const { darkMode } = useTheme();

  return (
    <div className="flex justify-between items-center">
      <h1 className={`text-2xl font-bold ${
        darkMode ? 'text-white' : 'text-gray-900'
      }`}>
        Documents
      </h1>
      <div className="flex gap-4">
        <button
          onClick={onReportClick}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
            darkMode
              ? 'bg-gray-800 hover:bg-gray-700 text-gray-200'
              : 'bg-white hover:bg-gray-50 text-gray-700'
          }`}
        >
          <FiPieChart className="w-5 h-5" />
          Analytics
        </button>
        <button
          onClick={onUploadClick}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
            darkMode
              ? 'bg-blue-600 hover:bg-blue-700 text-white'
              : 'bg-blue-500 hover:bg-blue-600 text-white'
          }`}
        >
          <FiUpload className="w-5 h-5" />
          Upload
        </button>
      </div>
    </div>
  );
};

export default DocumentHeader;
