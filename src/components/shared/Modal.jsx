import React from 'react';
import { FiX } from 'react-icons/fi';
import { useTheme } from '../../context/ThemeContext';

const Modal = ({ isOpen, onClose, title, children, maxWidth = 'max-w-2xl' }) => {
  const { darkMode } = useTheme();
  
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 overflow-y-auto">
      <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl w-full ${maxWidth} shadow-xl max-h-[90vh] flex flex-col relative transform transition-all`}>
        {/* Header */}
        <div className={`p-6 border-b ${darkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white'} flex justify-between items-center sticky top-0 rounded-t-2xl z-10 transition-colors duration-200`}>
          <h2 className={`text-2xl font-semibold ${darkMode ? 'text-gray-100' : 'text-gray-800'}`}>{title}</h2>
          <button 
            onClick={onClose} 
            className={`p-2 ${darkMode ? 'hover:bg-gray-700 text-gray-400 hover:text-gray-200' : 'hover:bg-gray-100 text-gray-600 hover:text-gray-800'} rounded-full transition-colors`}
            aria-label="Close modal"
          >
            <FiX className="w-6 h-6" />
          </button>
        </div>

        {/* Content with scroll */}
        <div className={`flex-1 overflow-y-auto p-6 ${darkMode ? 'bg-gray-800' : 'bg-white'} transition-colors duration-200`}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
