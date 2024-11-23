import React from 'react';
import { FiFile, FiFileText, FiDownload } from 'react-icons/fi';
import { getFileTypeInfo } from './FileTypeConfig';

export const FilePreview = ({ file, darkMode, onClose }) => {
  if (!file) return null;

  const renderPreview = () => {
    const fileType = file.type;
    const fileExtension = file.name.split('.').pop().toLowerCase();
    
    // Special handling for CSV files
    if (fileType === 'text/csv' || fileExtension === 'csv') {
      return (
        <div className={`p-4 rounded-lg shadow-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <FiFileText className="w-5 h-5 text-blue-500" />
              <h3 className={`font-medium ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                CSV Preview
              </h3>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => {
                  const blob = new Blob([file.content], { type: 'text/csv' });
                  const url = URL.createObjectURL(blob);
                  window.open(url, '_blank');
                }}
                className={`px-3 py-1 rounded-md text-sm ${
                  darkMode 
                    ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                    : 'bg-blue-500 hover:bg-blue-600 text-white'
                }`}
              >
                Open in New Tab
              </button>
              <button
                onClick={() => {
                  const blob = new Blob([file.content], { type: 'text/csv' });
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement('a');
                  a.href = url;
                  a.download = file.name;
                  a.click();
                  URL.revokeObjectURL(url);
                }}
                className={`px-3 py-1 rounded-md text-sm ${
                  darkMode 
                    ? 'bg-green-600 hover:bg-green-700 text-white' 
                    : 'bg-green-500 hover:bg-green-600 text-white'
                }`}
              >
                Download
              </button>
            </div>
          </div>
          <div className={`mt-4 p-4 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'} overflow-auto max-h-[60vh]`}>
            <table className="w-full">
              <tbody>
                {file.content.split('\n').map((row, rowIndex) => (
                  <tr key={rowIndex} className={`${
                    rowIndex === 0 
                      ? (darkMode ? 'bg-gray-700' : 'bg-gray-100') 
                      : ''
                  }`}>
                    {row.split(',').map((cell, cellIndex) => (
                      <td
                        key={cellIndex}
                        className={`px-4 py-2 ${
                          darkMode 
                            ? 'border-gray-700 text-gray-200' 
                            : 'border-gray-200 text-gray-700'
                        } ${
                          rowIndex === 0 
                            ? 'font-medium' 
                            : ''
                        }`}
                      >
                        {cell.trim()}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      );
    }

    // Handle other file types
    if (file.dataUrl) {
      switch (fileType) {
        case 'image/jpeg':
        case 'image/png':
        case 'image/gif':
          return (
            <div className="flex flex-col items-center">
              <img 
                src={file.dataUrl}
                alt={file.name} 
                className="max-w-full max-h-[70vh] object-contain rounded-lg shadow-lg"
              />
              <p className="mt-2 text-sm text-gray-500">Image Preview</p>
            </div>
          );

        case 'application/pdf':
          return (
            <div className="flex flex-col items-center">
              <iframe
                src={file.dataUrl}
                title={file.name}
                className="w-full h-[70vh] border-0 rounded-lg shadow-lg"
              />
              <p className="mt-2 text-sm text-gray-500">PDF Document</p>
            </div>
          );

        default:
          return (
            <div className={`p-6 rounded-lg shadow-lg text-center ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
              <FiFile className="w-16 h-16 mx-auto text-gray-500 mb-4" />
              <h3 className={`text-lg font-medium mb-2 ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                {file.type || 'Document'} Preview
              </h3>
              <button
                onClick={() => {
                  const link = document.createElement('a');
                  link.href = file.dataUrl;
                  link.download = file.name;
                  link.click();
                }}
                className={`px-4 py-2 rounded-md ${
                  darkMode 
                    ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                    : 'bg-blue-500 hover:bg-blue-600 text-white'
                }`}
              >
                Download File
              </button>
            </div>
          );
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center">
        <div className="fixed inset-0 transition-opacity" onClick={onClose}>
          <div className={`absolute inset-0 ${darkMode ? 'bg-gray-900' : 'bg-gray-500'} opacity-75`}></div>
        </div>

        <div className={`inline-block w-full max-w-4xl p-6 my-8 overflow-hidden text-left align-middle transition-all transform rounded-2xl shadow-xl ${
          darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'
        }`}>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              {React.createElement(getFileTypeInfo(file.type).icon, {
                className: `${getFileTypeInfo(file.type).color} h-6 w-6`
              })}
              {file.name}
            </h2>
            <div className="flex items-center gap-2">
              <button
                onClick={() => window.open(file.dataUrl, '_blank')}
                className={`p-2 rounded-lg ${
                  darkMode
                    ? 'bg-blue-600 hover:bg-blue-700 text-white'
                    : 'bg-blue-500 hover:bg-blue-600 text-white'
                }`}
              >
                <FiDownload className="h-5 w-5" />
              </button>
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
          </div>
          
          <div className="mt-4">
            {renderPreview()}
          </div>
        </div>
      </div>
    </div>
  );
};
