import React from 'react';
import { useTheme } from '../../../context/ThemeContext';
import { FiSearch, FiX } from 'react-icons/fi';

const DocumentFilters = ({ filterConfig, setFilterConfig, availableTags = [] }) => {
  const { darkMode } = useTheme();

  const handleSearchChange = (e) => {
    setFilterConfig(prev => ({
      ...prev,
      searchTerm: e.target.value
    }));
  };

  const handlePriorityChange = (priority) => {
    setFilterConfig(prev => ({
      ...prev,
      priority
    }));
  };

  const handleTagToggle = (tag) => {
    setFilterConfig(prev => ({
      ...prev,
      tags: prev.tags.includes(tag)
        ? prev.tags.filter(t => t !== tag)
        : [...prev.tags, tag]
    }));
  };

  const handleDateChange = (field, value) => {
    setFilterConfig(prev => ({
      ...prev,
      dateRange: {
        ...prev.dateRange,
        [field]: value
      }
    }));
  };

  const clearFilters = () => {
    setFilterConfig({
      searchTerm: '',
      priority: 'all',
      tags: [],
      dateRange: {
        start: null,
        end: null
      }
    });
  };

  const hasActiveFilters = 
    filterConfig.searchTerm ||
    filterConfig.priority !== 'all' ||
    filterConfig.tags.length > 0 ||
    filterConfig.dateRange.start ||
    filterConfig.dateRange.end;

  return (
    <div className={`mt-6 p-4 rounded-lg ${
      darkMode ? 'bg-gray-800' : 'bg-white'
    }`}>
      {/* Search */}
      <div className="relative">
        <FiSearch className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 ${
          darkMode ? 'text-gray-400' : 'text-gray-500'
        }`} />
        <input
          type="text"
          placeholder="Search documents..."
          value={filterConfig.searchTerm}
          onChange={handleSearchChange}
          className={`w-full pl-10 pr-4 py-2 rounded-lg transition-colors ${
            darkMode
              ? 'bg-gray-700 text-white placeholder-gray-400 focus:bg-gray-600'
              : 'bg-gray-100 text-gray-900 placeholder-gray-500 focus:bg-gray-200'
          } focus:outline-none`}
        />
      </div>

      <div className="mt-4 flex flex-wrap gap-4">
        {/* Priority Filter */}
        <div className="flex items-center gap-2">
          <span className={darkMode ? 'text-gray-300' : 'text-gray-600'}>
            Priority:
          </span>
          {['all', 'high', 'medium', 'low'].map(priority => (
            <button
              key={priority}
              onClick={() => handlePriorityChange(priority)}
              className={`px-3 py-1 rounded-lg capitalize transition-colors ${
                filterConfig.priority === priority
                  ? darkMode
                    ? 'bg-blue-600 text-white'
                    : 'bg-blue-500 text-white'
                  : darkMode
                  ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {priority}
            </button>
          ))}
        </div>

        {/* Date Range Filter */}
        <div className="flex items-center gap-2">
          <span className={darkMode ? 'text-gray-300' : 'text-gray-600'}>
            Date:
          </span>
          <input
            type="date"
            value={filterConfig.dateRange.start || ''}
            onChange={(e) => handleDateChange('start', e.target.value)}
            className={`px-3 py-1 rounded-lg transition-colors ${
              darkMode
                ? 'bg-gray-700 text-white focus:bg-gray-600'
                : 'bg-gray-100 text-gray-900 focus:bg-gray-200'
            }`}
          />
          <span className={darkMode ? 'text-gray-300' : 'text-gray-600'}>to</span>
          <input
            type="date"
            value={filterConfig.dateRange.end || ''}
            onChange={(e) => handleDateChange('end', e.target.value)}
            className={`px-3 py-1 rounded-lg transition-colors ${
              darkMode
                ? 'bg-gray-700 text-white focus:bg-gray-600'
                : 'bg-gray-100 text-gray-900 focus:bg-gray-200'
            }`}
          />
        </div>

        {/* Clear Filters */}
        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className={`flex items-center gap-1 px-3 py-1 rounded-lg transition-colors ${
              darkMode
                ? 'bg-red-900 text-red-300 hover:bg-red-800'
                : 'bg-red-100 text-red-600 hover:bg-red-200'
            }`}
          >
            <FiX className="w-4 h-4" />
            Clear Filters
          </button>
        )}
      </div>

      {/* Tags */}
      {availableTags.length > 0 && (
        <div className="mt-4">
          <span className={`block mb-2 ${
            darkMode ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Tags:
          </span>
          <div className="flex flex-wrap gap-2">
            {availableTags.map(tag => (
              <button
                key={tag}
                onClick={() => handleTagToggle(tag)}
                className={`px-3 py-1 rounded-full text-sm transition-colors ${
                  filterConfig.tags.includes(tag)
                    ? darkMode
                      ? 'bg-blue-600 text-white'
                      : 'bg-blue-500 text-white'
                    : darkMode
                    ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DocumentFilters;
