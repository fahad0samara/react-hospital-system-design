import React, { useState, useMemo } from "react";
import { useTheme } from "../../../context/ThemeContext";
import { FiDownload, FiTrash2, FiEye, FiPieChart, FiArrowUp, FiArrowDown } from "react-icons/fi";
import FilePreview from "./FilePreview";

const DocumentList = ({ documents = [], onDelete, onViewReport }) => {
  const { darkMode } = useTheme();
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [sortConfig, setSortConfig] = useState({
    key: 'uploadDate',
    direction: 'desc'
  });

  const handleSort = (key) => {
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatFileSize = (bytes) => {
    if (!bytes) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getPriorityColor = (priority) => {
    const colors = {
      high: darkMode ? 'text-red-400' : 'text-red-600',
      medium: darkMode ? 'text-yellow-400' : 'text-yellow-600',
      low: darkMode ? 'text-green-400' : 'text-green-600'
    };
    return colors[priority] || '';
  };

  const sortedDocuments = useMemo(() => {
    if (!documents) return [];
    
    return [...documents].sort((a, b) => {
      let aValue = a[sortConfig.key];
      let bValue = b[sortConfig.key];

      if (sortConfig.key === 'size') {
        return sortConfig.direction === 'asc' ? aValue - bValue : bValue - aValue;
      }

      if (sortConfig.key === 'uploadDate') {
        return sortConfig.direction === 'asc' 
          ? new Date(aValue) - new Date(bValue)
          : new Date(bValue) - new Date(aValue);
      }

      if (!aValue) aValue = '';
      if (!bValue) bValue = '';

      return sortConfig.direction === 'asc'
        ? aValue.toString().localeCompare(bValue.toString())
        : bValue.toString().localeCompare(aValue.toString());
    });
  }, [documents, sortConfig]);

  const handleDownload = (doc) => {
    // Implement download logic here
    console.log('Downloading:', doc.name);
  };

  const renderSortIcon = (key) => {
    if (sortConfig.key !== key) return null;
    return sortConfig.direction === 'asc' ? <FiArrowUp className="w-4 h-4" /> : <FiArrowDown className="w-4 h-4" />;
  };

  if (documents.length === 0) {
    return (
      <div className={`mt-8 text-center p-8 rounded-lg ${
        darkMode ? 'bg-gray-800' : 'bg-white'
      }`}>
        <p className={`text-lg ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          No documents found. Upload some documents to get started!
        </p>
      </div>
    );
  }

  return (
    <div className="mt-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className={`text-lg font-medium ${
          darkMode ? 'text-white' : 'text-gray-900'
        }`}>
          Documents ({documents.length})
        </h2>
        <button
          onClick={onViewReport}
          className={`px-3 py-1.5 rounded-lg flex items-center gap-2 transition-colors ${
            darkMode
              ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          <FiPieChart className="w-4 h-4" />
          View Report
        </button>
      </div>

      <div className={`overflow-x-auto rounded-lg border ${
        darkMode ? 'border-gray-700' : 'border-gray-200'
      }`}>
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className={darkMode ? 'bg-gray-800' : 'bg-gray-50'}>
            <tr>
              <th
                scope="col"
                className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider cursor-pointer ${
                  darkMode ? 'text-gray-400' : 'text-gray-500'
                }`}
                onClick={() => handleSort('name')}
              >
                <div className="flex items-center gap-2">
                  Name
                  {renderSortIcon('name')}
                </div>
              </th>
              <th
                scope="col"
                className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider cursor-pointer ${
                  darkMode ? 'text-gray-400' : 'text-gray-500'
                }`}
                onClick={() => handleSort('uploadDate')}
              >
                <div className="flex items-center gap-2">
                  Upload Date
                  {renderSortIcon('uploadDate')}
                </div>
              </th>
              <th
                scope="col"
                className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider cursor-pointer ${
                  darkMode ? 'text-gray-400' : 'text-gray-500'
                }`}
                onClick={() => handleSort('size')}
              >
                <div className="flex items-center gap-2">
                  Size
                  {renderSortIcon('size')}
                </div>
              </th>
              <th
                scope="col"
                className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider cursor-pointer ${
                  darkMode ? 'text-gray-400' : 'text-gray-500'
                }`}
                onClick={() => handleSort('priority')}
              >
                <div className="flex items-center gap-2">
                  Priority
                  {renderSortIcon('priority')}
                </div>
              </th>
              <th
                scope="col"
                className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                  darkMode ? 'text-gray-400' : 'text-gray-500'
                }`}
              >
                Tags
              </th>
              <th
                scope="col"
                className={`px-6 py-3 text-right text-xs font-medium uppercase tracking-wider ${
                  darkMode ? 'text-gray-400' : 'text-gray-500'
                }`}
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody className={`divide-y ${
            darkMode ? 'divide-gray-700' : 'divide-gray-200'
          }`}>
            {sortedDocuments.map((doc) => (
              <tr
                key={doc.id}
                className={darkMode ? 'bg-gray-800' : 'bg-white'}
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className={`text-sm font-medium ${
                    darkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    {doc.name}
                  </div>
                  <div className={`text-sm ${
                    darkMode ? 'text-gray-400' : 'text-gray-500'
                  }`}>
                    {doc.type}
                  </div>
                </td>
                <td className={`px-6 py-4 whitespace-nowrap text-sm ${
                  darkMode ? 'text-gray-300' : 'text-gray-500'
                }`}>
                  {formatDate(doc.uploadDate)}
                </td>
                <td className={`px-6 py-4 whitespace-nowrap text-sm ${
                  darkMode ? 'text-gray-300' : 'text-gray-500'
                }`}>
                  {formatFileSize(doc.size)}
                </td>
                <td className={`px-6 py-4 whitespace-nowrap text-sm ${getPriorityColor(doc.priority)}`}>
                  {doc.priority.charAt(0).toUpperCase() + doc.priority.slice(1)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex flex-wrap gap-2">
                    {doc.tags && doc.tags.map((tag, index) => (
                      <span
                        key={index}
                        className={`px-2 py-1 text-xs rounded-full ${
                          darkMode
                            ? 'bg-gray-700 text-gray-300'
                            : 'bg-gray-100 text-gray-600'
                        }`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                  <div className="flex justify-end gap-3">
                    <button
                      onClick={() => setSelectedDocument(doc)}
                      className={`p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 ${
                        darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-700'
                      }`}
                    >
                      <FiEye className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleDownload(doc)}
                      className={`p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 ${
                        darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-700'
                      }`}
                    >
                      <FiDownload className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => onDelete(doc)}
                      className={`p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 ${
                        darkMode ? 'text-red-400 hover:text-red-300' : 'text-red-500 hover:text-red-700'
                      }`}
                    >
                      <FiTrash2 className="w-5 h-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedDocument && (
        <FilePreview
          document={selectedDocument}
          onClose={() => setSelectedDocument(null)}
          onDownload={handleDownload}
        />
      )}
    </div>
  );
};

export default DocumentList;
