import React from 'react';
import { useTheme } from '../../../context/ThemeContext';
import { FiDownload, FiX, FiFile } from 'react-icons/fi';
import fileTypeConfig from '../FileTypeConfig';

const FilePreview = ({ document, onClose, onDownload }) => {
  const { darkMode } = useTheme();

  if (!document) {
    return null;
  }

  const getFileIcon = () => {
    if (!document || !document.type) {
      return fileTypeConfig.default.icon || FiFile;
    }
    const fileType = document.type.toLowerCase();
    return (fileTypeConfig[fileType]?.icon || fileTypeConfig.default.icon || FiFile);
  };

  const formatFileSize = (bytes) => {
    if (!bytes) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Unknown Date';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getPriorityColor = () => {
    const colors = {
      high: darkMode ? 'text-red-400' : 'text-red-600',
      medium: darkMode ? 'text-yellow-400' : 'text-yellow-600',
      low: darkMode ? 'text-green-400' : 'text-green-600'
    };
    return colors[document.priority?.toLowerCase()] || (darkMode ? 'text-gray-400' : 'text-gray-600');
  };

  const isImage = document.type?.startsWith('image/');
  const Icon = getFileIcon();

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className={`relative w-full max-w-2xl rounded-lg shadow-xl ${
        darkMode ? 'bg-gray-800' : 'bg-white'
      }`}>
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className={`text-xl font-semibold ${
            darkMode ? 'text-white' : 'text-gray-900'
          }`}>
            Document Details
          </h2>
          <button
            onClick={onClose}
            className={`p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${
              darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <FiX className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Document Preview */}
          <div className={`mb-6 p-8 rounded-lg flex flex-col items-center justify-center ${
            darkMode ? 'bg-gray-700' : 'bg-gray-50'
          }`}>
            {isImage && document.content ? (
              <img
                src={document.content}
                alt={document.name}
                className="max-h-64 object-contain rounded"
              />
            ) : (
              <Icon className={`w-20 h-20 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`} />
            )}
            <h3 className={`mt-4 text-lg font-medium ${
              darkMode ? 'text-white' : 'text-gray-900'
            }`}>
              {document.name || 'Untitled Document'}
            </h3>
            <p className={`mt-1 text-sm ${
              darkMode ? 'text-gray-400' : 'text-gray-500'
            }`}>
              {formatFileSize(document.size)}
            </p>
          </div>

          {/* Document Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className={`font-medium mb-2 ${
                darkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                File Information
              </h4>
              <dl className="space-y-2">
                <div className="flex justify-between">
                  <dt className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Type</dt>
                  <dd className={darkMode ? 'text-white' : 'text-gray-900'}>
                    {document.type || 'Unknown Type'}
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Size</dt>
                  <dd className={darkMode ? 'text-white' : 'text-gray-900'}>
                    {formatFileSize(document.size)}
                  </dd>
                </div>
                {document.priority && (
                  <div className="flex justify-between">
                    <dt className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Priority</dt>
                    <dd className={getPriorityColor()}>
                      {document.priority.charAt(0).toUpperCase() + document.priority.slice(1)}
                    </dd>
                  </div>
                )}
              </dl>
            </div>

            <div>
              <h4 className={`font-medium mb-2 ${
                darkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Additional Details
              </h4>
              <dl className="space-y-2">
                <div className="flex justify-between">
                  <dt className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Uploaded</dt>
                  <dd className={darkMode ? 'text-white' : 'text-gray-900'}>
                    {formatDate(document.uploadDate)}
                  </dd>
                </div>
                {document.department && (
                  <div className="flex justify-between">
                    <dt className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Department</dt>
                    <dd className={darkMode ? 'text-white' : 'text-gray-900'}>
                      {document.department}
                    </dd>
                  </div>
                )}
              </dl>
            </div>
          </div>

          {/* Tags */}
          {document.tags && document.tags.length > 0 && (
            <div className="mt-6">
              <h4 className={`font-medium mb-2 ${
                darkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Tags
              </h4>
              <div className="flex flex-wrap gap-2">
                {document.tags.map((tag, index) => (
                  <span
                    key={index}
                    className={`px-3 py-1 rounded-full text-sm ${
                      darkMode
                        ? 'bg-gray-700 text-gray-300'
                        : 'bg-gray-100 text-gray-700'
                    }`}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Description */}
          {document.description && (
            <div className="mt-6">
              <h4 className={`font-medium mb-2 ${
                darkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Description
              </h4>
              <p className={`text-sm ${
                darkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>
                {document.description}
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 p-4 border-t border-gray-200 dark:border-gray-700">
          <button
            onClick={onClose}
            className={`px-4 py-2 rounded-lg transition-colors ${
              darkMode
                ? 'text-gray-300 hover:bg-gray-700'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            Close
          </button>
          <button
            onClick={() => onDownload(document)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
              darkMode
                ? 'bg-blue-600 text-white hover:bg-blue-700'
                : 'bg-blue-500 text-white hover:bg-blue-600'
            }`}
          >
            <FiDownload className="w-4 h-4" />
            Download
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilePreview;
