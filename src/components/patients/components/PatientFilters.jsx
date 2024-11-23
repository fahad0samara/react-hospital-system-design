import React from 'react';
import { FiFilter } from 'react-icons/fi';

const PatientFilters = ({ 
  darkMode, 
  showFilters, 
  setShowFilters, 
  filters, 
  setFilters, 
  uniqueConditions 
}) => {
  return (
    <>
      <button
        onClick={() => setShowFilters(!showFilters)}
        className={`p-3 rounded-xl transition-colors ${
          showFilters
            ? darkMode
              ? 'bg-blue-600 text-white'
              : 'bg-blue-500 text-white'
            : darkMode
              ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
        }`}
        title="Filter"
      >
        <FiFilter size={20} />
      </button>

      {showFilters && (
        <div className={`p-4 rounded-xl shadow-sm border mb-6 transition-colors duration-200 ${
          darkMode
            ? 'bg-gray-800 border-gray-700'
            : 'bg-white border-gray-200'
        }`}>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className={`block text-sm font-medium mb-2 ${
                darkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Gender
              </label>
              <select
                value={filters.gender}
                onChange={(e) => setFilters(prev => ({ ...prev, gender: e.target.value }))}
                className={`w-full px-3 py-2 rounded-lg border transition-colors duration-200 ${
                  darkMode
                    ? 'bg-gray-700 border-gray-600 text-white'
                    : 'bg-white border-gray-200 text-gray-700'
                } focus:outline-none focus:ring-2 focus:ring-blue-500/50`}
              >
                <option value="">All</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div>
              <label className={`block text-sm font-medium mb-2 ${
                darkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Condition
              </label>
              <select
                value={filters.condition}
                onChange={(e) => setFilters(prev => ({ ...prev, condition: e.target.value }))}
                className={`w-full px-3 py-2 rounded-lg border transition-colors duration-200 ${
                  darkMode
                    ? 'bg-gray-700 border-gray-600 text-white'
                    : 'bg-white border-gray-200 text-gray-700'
                } focus:outline-none focus:ring-2 focus:ring-blue-500/50`}
              >
                <option value="">All</option>
                {uniqueConditions.map(condition => (
                  <option key={condition} value={condition}>{condition}</option>
                ))}
              </select>
            </div>
            <div>
              <label className={`block text-sm font-medium mb-2 ${
                darkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Age Range
              </label>
              <div className="flex items-center space-x-2">
                <input
                  type="number"
                  placeholder="Min"
                  value={filters.ageRange.min}
                  onChange={(e) => setFilters(prev => ({
                    ...prev,
                    ageRange: { ...prev.ageRange, min: e.target.value }
                  }))}
                  className={`w-full px-3 py-2 rounded-lg border transition-colors duration-200 ${
                    darkMode
                      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                      : 'bg-white border-gray-200 text-gray-700 placeholder-gray-500'
                  } focus:outline-none focus:ring-2 focus:ring-blue-500/50`}
                />
                <span className={darkMode ? 'text-gray-400' : 'text-gray-500'}>-</span>
                <input
                  type="number"
                  placeholder="Max"
                  value={filters.ageRange.max}
                  onChange={(e) => setFilters(prev => ({
                    ...prev,
                    ageRange: { ...prev.ageRange, max: e.target.value }
                  }))}
                  className={`w-full px-3 py-2 rounded-lg border transition-colors duration-200 ${
                    darkMode
                      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                      : 'bg-white border-gray-200 text-gray-700 placeholder-gray-500'
                  } focus:outline-none focus:ring-2 focus:ring-blue-500/50`}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PatientFilters;
