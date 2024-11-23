import React from 'react';
import { FiUpload } from 'react-icons/fi';
import { allowedFileTypes } from './FileTypeConfig';

export const FileUploadModal = ({
  darkMode,
  isOpen,
  onClose,
  onFileSelect,
  onUpload,
  selectedFile,
  documentDescription,
  setDocumentDescription,
  documentPriority,
  setDocumentPriority,
  selectedTags,
  setSelectedTags
}) => {
  if (!isOpen) return null;

  const availableDocumentTags = [
    'Urgent Review', 'Follow-up Required', 'Pending Results', 
    'Critical', 'Routine', 'Confidential', 'Draft',
    'Final Report', 'Archived', 'Needs Signature'
  ];

  const handleTagSelect = (tag) => {
    setSelectedTags(prev => 
      prev.includes(tag)
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center">
        <div className="fixed inset-0 transition-opacity">
          <div className={`absolute inset-0 ${darkMode ? 'bg-gray-900' : 'bg-gray-500'} opacity-75`}></div>
        </div>

        <div className={`inline-block w-full max-w-2xl p-6 my-8 overflow-hidden text-left align-middle transition-all transform rounded-2xl shadow-xl ${
          darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'
        }`}>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-2xl font-bold">Upload Document</h3>
            <button
              onClick={onClose}
              className={`p-2 rounded-lg ${
                darkMode
                  ? 'hover:bg-gray-700 text-gray-400 hover:text-white'
                  : 'hover:bg-gray-100 text-gray-600 hover:text-gray-900'
              }`}
            >
              ×
            </button>
          </div>

          <div className="space-y-4">
            {/* File Input */}
            <div>
              <label className={`block mb-2 font-medium ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                Select File
              </label>
              <input
                type="file"
                onChange={onFileSelect}
                className={`w-full p-2 rounded-lg border ${
                  darkMode
                    ? 'bg-gray-700 border-gray-600 text-gray-200'
                    : 'bg-white border-gray-300 text-gray-700'
                }`}
                accept={Object.keys(allowedFileTypes).join(',')}
              />
            </div>

            {/* Description */}
            <div>
              <label className={`block mb-2 font-medium ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                Description
              </label>
              <textarea
                value={documentDescription}
                onChange={(e) => setDocumentDescription(e.target.value)}
                className={`w-full p-2 rounded-lg border ${
                  darkMode
                    ? 'bg-gray-700 border-gray-600 text-gray-200'
                    : 'bg-white border-gray-300 text-gray-700'
                }`}
                rows="3"
                placeholder="Enter document description..."
              />
            </div>

            {/* Priority */}
            <div>
              <label className={`block mb-2 font-medium ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                Priority
              </label>
              <select
                value={documentPriority}
                onChange={(e) => setDocumentPriority(e.target.value)}
                className={`w-full p-2 rounded-lg border ${
                  darkMode
                    ? 'bg-gray-700 border-gray-600 text-gray-200'
                    : 'bg-white border-gray-300 text-gray-700'
                }`}
              >
                <option value="high">High</option>
                <option value="normal">Normal</option>
                <option value="low">Low</option>
              </select>
            </div>

            {/* Tags */}
            <div>
              <label className={`block mb-2 font-medium ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                Tags
              </label>
              <div className="flex flex-wrap gap-2">
                {availableDocumentTags.map(tag => (
                  <button
                    key={tag}
                    onClick={() => handleTagSelect(tag)}
                    className={`px-3 py-1 rounded-lg text-sm ${
                      selectedTags.includes(tag)
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

            {/* Upload Button */}
            <div className="flex justify-end mt-6">
              <button
                onClick={onUpload}
                disabled={!selectedFile}
                className={`px-4 py-2 rounded-lg flex items-center gap-2 ${
                  selectedFile
                    ? darkMode
                      ? 'bg-blue-600 hover:bg-blue-700 text-white'
                      : 'bg-blue-500 hover:bg-blue-600 text-white'
                    : 'bg-gray-400 cursor-not-allowed text-white'
                }`}
              >
                <FiUpload className="h-5 w-5" />
                Upload Document
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
