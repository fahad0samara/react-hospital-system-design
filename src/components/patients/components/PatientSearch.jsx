import React from 'react';
import { FiSearch, FiGrid, FiList } from 'react-icons/fi';

const PatientSearch = ({ darkMode, searchQuery, onSearchChange, viewMode, onViewModeChange }) => {
  return (
    <div className="flex justify-between items-center">
      <div className="relative w-96">
        <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Search patients..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className={`w-full pl-10 pr-4 py-2 rounded-lg border ${
            darkMode
              ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-400'
              : 'bg-white border-gray-200 text-gray-900 placeholder-gray-500'
          }`}
        />
      </div>
      <div className="flex space-x-2">
        <button
          onClick={() => onViewModeChange('grid')}
          className={`p-2 rounded-lg transition-colors ${
            viewMode === 'grid'
              ? darkMode
                ? 'bg-gray-700 text-white'
                : 'bg-gray-100 text-gray-900'
              : darkMode
              ? 'text-gray-400 hover:text-white hover:bg-gray-700'
              : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100'
          }`}
          title="Grid View"
        >
          <FiGrid className="w-5 h-5" />
        </button>
        <button
          onClick={() => onViewModeChange('table')}
          className={`p-2 rounded-lg transition-colors ${
            viewMode === 'table'
              ? darkMode
                ? 'bg-gray-700 text-white'
                : 'bg-gray-100 text-gray-900'
              : darkMode
              ? 'text-gray-400 hover:text-white hover:bg-gray-700'
              : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100'
          }`}
          title="Table View"
        >
          <FiList className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default PatientSearch;
