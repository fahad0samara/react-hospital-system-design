import React from 'react';
import { FiDownload, FiEye, FiTrash2, FiFilter } from 'react-icons/fi';
import { getFileTypeInfo } from './FileTypeConfig';

export const DocumentList = ({
  darkMode,
  documents,
  onPreview,
  onDelete,
  onDownload,
  sortConfig,
  setSortConfig,
  filterConfig,
  setFilterConfig
}) => {
  const handleSort = (key) => {
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const getSortIcon = (key) => {
    if (sortConfig.key !== key) return null;
    return sortConfig.direction === 'asc' ? '↑' : '↓';
  };

  const filteredAndSortedDocuments = React.useMemo(() => {
    let filtered = [...documents];

    // Apply filters
    if (filterConfig.priority) {
      filtered = filtered.filter(doc => doc.priority === filterConfig.priority);
    }
    if (filterConfig.type) {
      filtered = filtered.filter(doc => doc.type === filterConfig.type);
    }
    if (filterConfig.searchTerm) {
      const searchLower = filterConfig.searchTerm.toLowerCase();
      filtered = filtered.filter(doc =>
        doc.name.toLowerCase().includes(searchLower) ||
        doc.description.toLowerCase().includes(searchLower) ||
        doc.tags.some(tag => tag.toLowerCase().includes(searchLower))
      );
    }

    // Apply sorting
    return filtered.sort((a, b) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];
      
      if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });
  }, [documents, sortConfig, filterConfig]);

  return (
    <div>
      {/* Filter Controls */}
      <div className={`p-4 rounded-lg mb-4 ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-sm`}>
        <div className="flex flex-wrap gap-4 items-center">
          <div className="flex items-center gap-2">
            <FiFilter className={darkMode ? 'text-gray-400' : 'text-gray-600'} />
            <select
              value={filterConfig.priority}
              onChange={(e) => setFilterConfig(prev => ({ ...prev, priority: e.target.value }))}
              className={`rounded-lg px-3 py-1.5 ${
                darkMode
                  ? 'bg-gray-700 text-gray-200 border-gray-600'
                  : 'bg-white text-gray-700 border-gray-300'
              } border`}
            >
              <option value="">All Priorities</option>
              <option value="high">High</option>
              <option value="normal">Normal</option>
              <option value="low">Low</option>
            </select>
          </div>

          <input
            type="text"
            placeholder="Search documents..."
            value={filterConfig.searchTerm}
            onChange={(e) => setFilterConfig(prev => ({ ...prev, searchTerm: e.target.value }))}
            className={`rounded-lg px-3 py-1.5 ${
              darkMode
                ? 'bg-gray-700 text-gray-200 border-gray-600'
                : 'bg-white text-gray-700 border-gray-300'
            } border flex-grow`}
          />
        </div>
      </div>

      {/* Documents Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className={`${darkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
              <th
                onClick={() => handleSort('name')}
                className={`px-6 py-3 text-left cursor-pointer ${
                  darkMode ? 'text-gray-200' : 'text-gray-700'
                }`}
              >
                Name {getSortIcon('name')}
              </th>
              <th
                onClick={() => handleSort('type')}
                className={`px-6 py-3 text-left cursor-pointer ${
                  darkMode ? 'text-gray-200' : 'text-gray-700'
                }`}
              >
                Type {getSortIcon('type')}
              </th>
              <th
                onClick={() => handleSort('priority')}
                className={`px-6 py-3 text-left cursor-pointer ${
                  darkMode ? 'text-gray-200' : 'text-gray-700'
                }`}
              >
                Priority {getSortIcon('priority')}
              </th>
              <th className={`px-6 py-3 text-left ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                Tags
              </th>
              <th className={`px-6 py-3 text-right ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredAndSortedDocuments.map((doc) => {
              const fileTypeInfo = getFileTypeInfo(doc.type);
              return (
                <tr
                  key={doc.id}
                  className={`${
                    darkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-50'
                  } transition-colors`}
                >
                  <td className={`px-6 py-4 ${darkMode ? 'text-gray-200' : 'text-gray-900'}`}>
                    <div className="flex items-center gap-2">
                      {React.createElement(fileTypeInfo.icon, {
                        className: `${fileTypeInfo.color} h-5 w-5`
                      })}
                      <span className="truncate max-w-xs">{doc.name}</span>
                    </div>
                  </td>
                  <td className={`px-6 py-4 ${darkMode ? 'text-gray-200' : 'text-gray-900'}`}>
                    {fileTypeInfo.name}
                  </td>
                  <td className={`px-6 py-4`}>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      doc.priority === 'high'
                        ? 'bg-red-100 text-red-800'
                        : doc.priority === 'normal'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-gray-100 text-gray-800'
                    }`}>
                      {doc.priority.charAt(0).toUpperCase() + doc.priority.slice(1)}
                    </span>
                  </td>
                  <td className={`px-6 py-4`}>
                    <div className="flex flex-wrap gap-1">
                      {doc.tags.map((tag, index) => (
                        <span
                          key={index}
                          className={`px-2 py-0.5 rounded-full text-xs ${
                            darkMode
                              ? 'bg-gray-700 text-gray-300'
                              : 'bg-gray-100 text-gray-700'
                          }`}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right space-x-2">
                    <button
                      onClick={() => onPreview(doc)}
                      className={`p-1.5 rounded-lg ${
                        darkMode
                          ? 'hover:bg-gray-700 text-gray-400 hover:text-white'
                          : 'hover:bg-gray-100 text-gray-600 hover:text-gray-900'
                      }`}
                    >
                      <FiEye className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => onDownload(doc)}
                      className={`p-1.5 rounded-lg ${
                        darkMode
                          ? 'hover:bg-gray-700 text-gray-400 hover:text-white'
                          : 'hover:bg-gray-100 text-gray-600 hover:text-gray-900'
                      }`}
                    >
                      <FiDownload className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => onDelete(doc)}
                      className={`p-1.5 rounded-lg ${
                        darkMode
                          ? 'hover:bg-red-900 text-red-400 hover:text-red-100'
                          : 'hover:bg-red-100 text-red-600 hover:text-red-900'
                      }`}
                    >
                      <FiTrash2 className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
