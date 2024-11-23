import React, { useState, useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useTheme } from '../../context/ThemeContext';
import { FiUpload, FiDownload, FiTrash2, FiEye, FiSearch, FiFile, FiImage, FiFileText } from 'react-icons/fi';
import { SiMicrosoftexcel } from 'react-icons/si';
import { AiFillFilePdf } from 'react-icons/ai';

const Documents = () => {
  const { darkMode } = useTheme();
  const { user } = useSelector((state) => state.auth) || { user: {} };
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [documentType, setDocumentType] = useState('');
  const [documentDescription, setDocumentDescription] = useState('');
  const [documentDate, setDocumentDate] = useState('');
  const [documentPriority, setDocumentPriority] = useState('normal');
  const [searchTermDocuments, setSearchTermDocuments] = useState('');
  const [filterTypeDocuments, setFilterTypeDocuments] = useState('all');
  const [filterPriority, setFilterPriority] = useState('all');
  const [sortBy, setSortBy] = useState('date');
  const [sortOrder, setSortOrder] = useState('desc');
  const [selectedTags, setSelectedTags] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDocuments, setSelectedDocuments] = useState([]);
  const [previewDocument, setPreviewDocument] = useState(null);
  const [showPreviewModal, setShowPreviewModal] = useState(false);

  // Load documents from localStorage on component mount
  useEffect(() => {
    const loadDocuments = () => {
      try {
        const savedDocuments = localStorage.getItem('hospitalDocuments');
        if (savedDocuments) {
          const parsedDocs = JSON.parse(savedDocuments);
          console.log('Loaded documents:', parsedDocs); // Debug log
          setUploadedFiles(parsedDocs);
        }
      } catch (error) {
        console.error('Error loading documents:', error);
      }
    };

    loadDocuments();
  }, []);

  // Save documents to localStorage whenever they change
  useEffect(() => {
    const saveDocuments = () => {
      try {
        console.log('Saving documents:', uploadedFiles); // Debug log
        localStorage.setItem('hospitalDocuments', JSON.stringify(uploadedFiles));
      } catch (error) {
        console.error('Error saving documents:', error);
      }
    };

    if (uploadedFiles.length > 0) {
      saveDocuments();
    }
  }, [uploadedFiles]);

  const allowedFileTypes = {
    'application/pdf': {
      icon: AiFillFilePdf,
      color: 'text-red-500',
      name: 'PDF'
    },
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': {
      icon: SiMicrosoftexcel,
      color: 'text-green-600',
      name: 'Excel'
    },
    'application/vnd.ms-excel': {
      icon: SiMicrosoftexcel,
      color: 'text-green-600',
      name: 'Excel'
    },
    'text/csv': {
      icon: FiFileText,
      color: 'text-blue-500',
      name: 'CSV'
    },
    'image/jpeg': {
      icon: FiImage,
      color: 'text-purple-500',
      name: 'Image'
    },
    'image/png': {
      icon: FiImage,
      color: 'text-purple-500',
      name: 'Image'
    },
    'image/gif': {
      icon: FiImage,
      color: 'text-purple-500',
      name: 'Image'
    },
    'application/vnd.oasis.opendocument.text': {
      icon: FiFileText,
      color: 'text-blue-500',
      name: 'ODF'
    }
  };

  const availableDocumentTags = [
    'Urgent Review', 'Follow-up Required', 'Pending Results', 
    'Critical', 'Routine', 'Confidential', 'Draft',
    'Final Report', 'Archived', 'Needs Signature'
  ];

  const handleFileUpload = async () => {
    if (!selectedFile) return;

    try {
      // Create a base64 string of the file content
      const fileReader = new FileReader();
      
      fileReader.onload = async () => {
        const base64String = fileReader.result;
        
        const newDocument = {
          id: Date.now().toString(),
          name: selectedFile.name,
          type: documentType || selectedFile.type,
          size: selectedFile.size,
          uploadDate: new Date().toISOString(),
          description: documentDescription,
          priority: documentPriority,
          content: selectedFile.content || null,
          dataUrl: base64String,
          tags: selectedTags
        };

        console.log('Adding new document:', newDocument); // Debug log

        setUploadedFiles(prevFiles => {
          const newFiles = [...prevFiles, newDocument];
          localStorage.setItem('hospitalDocuments', JSON.stringify(newFiles));
          return newFiles;
        });

        // Reset form
        setSelectedFile(null);
        setDocumentDescription('');
        setDocumentPriority('normal');
        setSelectedTags([]);
        setIsModalOpen(false);

        // Clear the file input
        const fileInput = document.querySelector('input[type="file"]');
        if (fileInput) {
          fileInput.value = '';
        }
      };

      fileReader.readAsDataURL(selectedFile);
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('Error uploading file. Please try again.');
    }
  };

  const handleDeleteDocument = (documentId) => {
    try {
      setUploadedFiles(prevFiles => {
        const updatedFiles = prevFiles.filter(file => file.id !== documentId);
        localStorage.setItem('hospitalDocuments', JSON.stringify(updatedFiles));
        return updatedFiles;
      });
    } catch (error) {
      console.error('Error deleting document:', error);
      alert('Error deleting document. Please try again.');
    }
  };

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      const fileExtension = file.name.split('.').pop().toLowerCase();
      const fileType = file.type || '';

      const getFileType = () => {
        const extensionMap = {
          'csv': 'text/csv',
          'xlsx': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
          'xls': 'application/vnd.ms-excel',
          'pdf': 'application/pdf',
          'jpg': 'image/jpeg',
          'jpeg': 'image/jpeg',
          'png': 'image/png',
          'gif': 'image/gif',
          'odt': 'application/vnd.oasis.opendocument.text'
        };
        
        return extensionMap[fileExtension] || fileType;
      };

      const detectedType = getFileType();
      
      if (detectedType === 'text/csv') {
        const reader = new FileReader();
        reader.onload = (e) => {
          const content = e.target.result;
          setSelectedFile({
            ...file,
            type: detectedType,
            content: content
          });
          setDocumentType('CSV');
        };
        reader.readAsText(file);
      } else if (allowedFileTypes[detectedType]) {
        setSelectedFile(file);
        const fileTypeInfo = allowedFileTypes[detectedType];
        setDocumentType(fileTypeInfo.name);
      } else {
        alert('Unsupported file type. Please upload PDF, Excel, CSV, Image, or ODF files.');
        event.target.value = '';
      }
    }
  };

  const getFileTypeInfo = (fileType) => {
    return allowedFileTypes[fileType] || {
      icon: FiFile,
      color: 'text-gray-500',
      name: 'Unknown'
    };
  };

  const handleTagSelect = (tag) => {
    setSelectedTags(prev => 
      prev.includes(tag)
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const handleViewDocument = (file) => {
    window.open(file.url, '_blank');
  };

  const handlePrint = (fileId) => {
    const file = uploadedFiles.find(f => f.id === fileId);
    if (file && file.url) {
      const printWindow = window.open(file.url, '_blank');
      printWindow.onload = () => {
        printWindow.print();
      };
    }
  };

  const handleDocumentSelect = (fileId) => {
    setSelectedDocuments(prev => 
      prev.includes(fileId)
        ? prev.filter(id => id !== fileId)
        : [...prev, fileId]
    );
  };

  const handleBulkDelete = () => {
    if (window.confirm(`Are you sure you want to delete ${selectedDocuments.length} documents?`)) {
      setUploadedFiles(prev => {
        const newFiles = prev.filter(f => !selectedDocuments.includes(f.id));
        localStorage.setItem('hospitalDocuments', JSON.stringify(newFiles));
        return newFiles;
      });
      setSelectedDocuments([]);
    }
  };

  const handlePreview = (file) => {
    setPreviewDocument(file);
    setShowPreviewModal(true);
  };

  const PreviewModal = ({ file, onClose }) => {
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
                  {documentType || 'Document'} Preview
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

  const formatFileSize = (size) => {
    const i = Math.floor(Math.log(size) / Math.log(1024));
    return (size / Math.pow(1024, i)).toFixed(2) * 1 + ' ' + ['B', 'KB', 'MB', 'GB', 'TB'][i];
  };

  const filteredAndSortedDocuments = useMemo(() => {
    let docs = [...uploadedFiles];

    // Filter by search term
    if (searchTermDocuments) {
      docs = docs.filter(doc =>
        doc.name.toLowerCase().includes(searchTermDocuments.toLowerCase()) ||
        doc.description?.toLowerCase().includes(searchTermDocuments.toLowerCase()) ||
        doc.type?.toLowerCase().includes(searchTermDocuments.toLowerCase())
      );
    }

    // Filter by document type
    if (filterTypeDocuments !== 'all') {
      docs = docs.filter(doc => doc.type === filterTypeDocuments);
    }

    // Filter by priority
    if (filterPriority !== 'all') {
      docs = docs.filter(doc => doc.priority === filterPriority);
    }

    // Sort documents
    docs.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return sortOrder === 'asc' 
            ? a.name.localeCompare(b.name)
            : b.name.localeCompare(a.name);
        
        case 'type':
          return sortOrder === 'asc'
            ? (a.type || '').localeCompare(b.type || '')
            : (b.type || '').localeCompare(a.type || '');
        
        case 'size':
          return sortOrder === 'asc'
            ? a.size - b.size
            : b.size - a.size;
        
        case 'priority':
          const priorityOrder = { high: 3, normal: 2, low: 1 };
          return sortOrder === 'asc'
            ? priorityOrder[a.priority] - priorityOrder[b.priority]
            : priorityOrder[b.priority] - priorityOrder[a.priority];
        
        case 'date':
        default:
          return sortOrder === 'asc'
            ? new Date(a.uploadDate) - new Date(b.uploadDate)
            : new Date(b.uploadDate) - new Date(a.uploadDate);
      }
    });

    return docs;
  }, [uploadedFiles, searchTermDocuments, filterTypeDocuments, filterPriority, sortBy, sortOrder]);

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className={`p-8 max-w-[1600px] mx-auto ${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-lg`}>
        {/* Header Section */}
        <div className="flex justify-between items-center mb-8">
          <h1 className={`text-4xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
            Medical Documents
          </h1>
          <div className="flex gap-4">
            <button
              onClick={() => setIsModalOpen(true)}
              className={`px-6 py-3 rounded-full ${
                darkMode 
                  ? 'bg-blue-600 hover:bg-blue-700' 
                  : 'bg-blue-500 hover:bg-blue-600'
              } text-white font-semibold shadow-lg transition-colors`}
            >
              Upload Document
            </button>
          </div>
        </div>

        {/* Search and Filters Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="md:col-span-2">
            <input
              type="text"
              placeholder="Search documents..."
              value={searchTermDocuments}
              onChange={(e) => setSearchTermDocuments(e.target.value)}
              className={`w-full px-4 py-2 rounded-lg border ${
                darkMode 
                  ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                  : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
              } focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
            />
          </div>
          <div>
            <select
              value={filterTypeDocuments}
              onChange={(e) => setFilterTypeDocuments(e.target.value)}
              className={`w-full px-4 py-2 rounded-lg border ${
                darkMode 
                  ? 'bg-gray-700 border-gray-600 text-white' 
                  : 'bg-white border-gray-300 text-gray-900'
              } focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
            >
              <option value="all">All Types</option>
              <option value="Medical Report">Medical Reports</option>
              <option value="Lab Report">Lab Reports</option>
              <option value="X-Ray">X-Rays</option>
              <option value="MRI Scan">MRI Scans</option>
              <option value="Prescription">Prescriptions</option>
            </select>
          </div>
          <div>
            <select
              value={filterPriority}
              onChange={(e) => setFilterPriority(e.target.value)}
              className={`w-full px-4 py-2 rounded-lg border ${
                darkMode 
                  ? 'bg-gray-700 border-gray-600 text-white' 
                  : 'bg-white border-gray-300 text-gray-900'
              } focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
            >
              <option value="all">All Priorities</option>
              <option value="urgent">Urgent</option>
              <option value="high">High</option>
              <option value="normal">Normal</option>
              <option value="low">Low</option>
            </select>
          </div>
        </div>

        {/* Sorting controls */}
        <div className={`mb-4 flex flex-wrap gap-4 ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>
          <div className="flex items-center">
            <label htmlFor="sortBy" className="mr-2">Sort by:</label>
            <select
              id="sortBy"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className={`rounded-md border px-3 py-1.5 ${
                darkMode
                  ? 'bg-gray-700 border-gray-600 text-gray-200'
                  : 'bg-white border-gray-300 text-gray-700'
              }`}
            >
              <option value="date">Upload Date</option>
              <option value="name">File Name</option>
              <option value="type">File Type</option>
              <option value="size">File Size</option>
              <option value="priority">Priority</option>
            </select>
          </div>

          <div className="flex items-center">
            <label htmlFor="sortOrder" className="mr-2">Order:</label>
            <select
              id="sortOrder"
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className={`rounded-md border px-3 py-1.5 ${
                darkMode
                  ? 'bg-gray-700 border-gray-600 text-gray-200'
                  : 'bg-white border-gray-300 text-gray-700'
              }`}
            >
              <option value="desc">Descending</option>
              <option value="asc">Ascending</option>
            </select>
          </div>
        </div>

        {/* Document List */}
        <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-md`}>
          {filteredAndSortedDocuments.length === 0 ? (
            <div className={`text-center py-10 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              No documents found
            </div>
          ) : (
            <div className="space-y-4">
              {filteredAndSortedDocuments.map((file) => (
                <div
                  key={file.id}
                  className={`p-4 ${
                    darkMode 
                      ? 'bg-gray-700 hover:bg-gray-600' 
                      : 'bg-white hover:bg-gray-50'
                  } rounded-lg shadow-sm transition-colors`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h4 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                        {file.name}
                      </h4>
                      <p className={`text-sm mt-1 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        {file.description}
                      </p>
                      <div className="flex flex-wrap items-center gap-2 mt-2">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                          darkMode ? 'bg-gray-600 text-gray-200' : 'bg-gray-100 text-gray-800'
                        }`}>
                          {file.type}
                        </span>
                        <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                          •
                        </span>
                        <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                          {formatFileSize(file.size)}
                        </span>
                        <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                          •
                        </span>
                        <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                          {new Date(file.uploadDate).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleViewDocument(file)}
                        className={`p-2 rounded-lg ${
                          darkMode
                            ? 'hover:bg-gray-600 text-blue-400 hover:text-blue-300'
                            : 'hover:bg-gray-100 text-blue-600 hover:text-blue-700'
                        }`}
                      >
                        View
                      </button>
                      <button
                        onClick={() => handleDeleteDocument(file.id)}
                        className={`p-2 rounded-lg ${
                          darkMode
                            ? 'hover:bg-gray-600 text-red-400 hover:text-red-300'
                            : 'hover:bg-gray-100 text-red-600 hover:text-red-700'
                        }`}
                      >
                        Delete
                      </button>
                      <button
                        onClick={() => handlePreview(file)}
                        className={`p-2 rounded-lg ${
                          darkMode
                            ? 'hover:bg-gray-600 text-green-400 hover:text-green-300'
                            : 'hover:bg-gray-100 text-green-600 hover:text-green-700'
                        }`}
                      >
                        Preview
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Upload Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center">
            <div className="fixed inset-0 transition-opacity" onClick={() => setIsModalOpen(false)}>
              <div className={`absolute inset-0 ${darkMode ? 'bg-gray-900' : 'bg-gray-500'} opacity-75`}></div>
            </div>

            <div className={`inline-block w-full max-w-2xl p-6 my-8 overflow-hidden text-left align-middle transition-all transform rounded-2xl shadow-xl ${
              darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'
            }`}>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">Upload Document</h2>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className={`rounded-full p-2 ${
                    darkMode
                      ? 'hover:bg-gray-700 text-gray-400 hover:text-white'
                      : 'hover:bg-gray-100 text-gray-600 hover:text-gray-900'
                  }`}
                >
                  ×
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Document Type
                  </label>
                  <select
                    value={documentType}
                    onChange={(e) => setDocumentType(e.target.value)}
                    className={`mt-1 block w-full px-3 py-2 rounded-md ${
                      darkMode
                        ? 'bg-gray-700 border-gray-600 text-white'
                        : 'bg-white border-gray-300 text-gray-900'
                    } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  >
                    <option value="">Select Type</option>
                    <option value="Medical Report">Medical Report</option>
                    <option value="Lab Report">Lab Report</option>
                    <option value="X-Ray">X-Ray</option>
                    <option value="MRI Scan">MRI Scan</option>
                    <option value="Prescription">Prescription</option>
                  </select>
                </div>

                <div>
                  <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    File
                  </label>
                  <input
                    type="file"
                    onChange={handleFileSelect}
                    className={`mt-1 block w-full ${
                      darkMode
                        ? 'text-gray-300 file:bg-gray-700 file:text-white'
                        : 'text-gray-700 file:bg-gray-100 file:text-gray-900'
                    } file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold hover:file:bg-blue-500 hover:file:text-white`}
                  />
                </div>

                <div>
                  <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Description
                  </label>
                  <textarea
                    value={documentDescription}
                    onChange={(e) => setDocumentDescription(e.target.value)}
                    className={`mt-1 block w-full px-3 py-2 rounded-md ${
                      darkMode
                        ? 'bg-gray-700 border-gray-600 text-white'
                        : 'bg-white border-gray-300 text-gray-900'
                    } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    rows="3"
                  ></textarea>
                </div>

                <div className="flex justify-end gap-3 mt-6">
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className={`px-4 py-2 rounded-lg ${
                      darkMode
                        ? 'bg-gray-700 hover:bg-gray-600 text-white'
                        : 'bg-gray-100 hover:bg-gray-200 text-gray-900'
                    }`}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleFileUpload}
                    disabled={!selectedFile || !documentType}
                    className={`px-4 py-2 rounded-lg ${
                      !selectedFile || !documentType
                        ? 'bg-gray-400 cursor-not-allowed text-white'
                        : darkMode
                        ? 'bg-blue-600 hover:bg-blue-700 text-white'
                        : 'bg-blue-500 hover:bg-blue-600 text-white'
                    }`}
                  >
                    Upload
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {showPreviewModal && (
        <PreviewModal
          file={previewDocument}
          onClose={() => setShowPreviewModal(false)}
        />
      )}
    </div>
  );
};

export default Documents;
