import React, { useState, useEffect } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { FiUpload } from 'react-icons/fi';
import { FileUploadModal } from './FileUploadModal';
import { FilePreview } from './FilePreview';
import { DocumentList } from './DocumentList';
import { extensionMap } from './FileTypeConfig';

const Documents = () => {
  const { darkMode } = useTheme();
  const [documents, setDocuments] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [documentDescription, setDocumentDescription] = useState('');
  const [documentPriority, setDocumentPriority] = useState('normal');
  const [selectedTags, setSelectedTags] = useState([]);
  const [previewDocument, setPreviewDocument] = useState(null);
  const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'asc' });
  const [filterConfig, setFilterConfig] = useState({
    priority: '',
    type: '',
    searchTerm: ''
  });

  useEffect(() => {
    const savedDocuments = localStorage.getItem('hospitalDocuments');
    if (savedDocuments) {
      setDocuments(JSON.parse(savedDocuments));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('hospitalDocuments', JSON.stringify(documents));
  }, [documents]);

  const handleFileSelect = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const fileExtension = file.name.split('.').pop().toLowerCase();
    const mimeType = extensionMap[fileExtension] || file.type;

    const reader = new FileReader();
    reader.onload = async (e) => {
      setSelectedFile({
        file,
        content: e.target.result,
        type: mimeType,
        dataUrl: e.target.result
      });
    };

    if (mimeType === 'text/csv') {
      reader.readAsText(file);
    } else {
      reader.readAsDataURL(file);
    }
  };

  const handleFileUpload = () => {
    if (!selectedFile) return;

    const newDocument = {
      id: Date.now().toString(),
      name: selectedFile.file.name,
      type: selectedFile.type,
      description: documentDescription,
      priority: documentPriority,
      tags: selectedTags,
      content: selectedFile.content,
      dataUrl: selectedFile.dataUrl,
      uploadDate: new Date().toISOString()
    };

    setDocuments(prev => [...prev, newDocument]);
    setIsModalOpen(false);
    resetUploadForm();
  };

  const resetUploadForm = () => {
    setSelectedFile(null);
    setDocumentDescription('');
    setDocumentPriority('normal');
    setSelectedTags([]);
  };

  const handleDeleteDocument = (doc) => {
    if (window.confirm('Are you sure you want to delete this document?')) {
      setDocuments(prev => prev.filter(d => d.id !== doc.id));
    }
  };

  const handleDownloadDocument = (doc) => {
    const link = document.createElement('a');
    link.href = doc.dataUrl;
    link.download = doc.name;
    link.click();
  };

  return (
    <div className={`min-h-screen p-6 ${darkMode ? 'bg-gray-900' : 'bg-gray-100'}`}>
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
          Documents
        </h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className={`px-4 py-2 rounded-lg flex items-center gap-2 ${
            darkMode
              ? 'bg-blue-600 hover:bg-blue-700 text-white'
              : 'bg-blue-500 hover:bg-blue-600 text-white'
          }`}
        >
          <FiUpload className="h-5 w-5" />
          Upload Document
        </button>
      </div>

      {/* Document List */}
      <DocumentList
        darkMode={darkMode}
        documents={documents}
        onPreview={setPreviewDocument}
        onDelete={handleDeleteDocument}
        onDownload={handleDownloadDocument}
        sortConfig={sortConfig}
        setSortConfig={setSortConfig}
        filterConfig={filterConfig}
        setFilterConfig={setFilterConfig}
      />

      {/* Upload Modal */}
      <FileUploadModal
        darkMode={darkMode}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          resetUploadForm();
        }}
        onFileSelect={handleFileSelect}
        onUpload={handleFileUpload}
        selectedFile={selectedFile}
        documentDescription={documentDescription}
        setDocumentDescription={setDocumentDescription}
        documentPriority={documentPriority}
        setDocumentPriority={setDocumentPriority}
        selectedTags={selectedTags}
        setSelectedTags={setSelectedTags}
      />

      {/* Preview Modal */}
      {previewDocument && (
        <FilePreview
          file={previewDocument}
          darkMode={darkMode}
          onClose={() => setPreviewDocument(null)}
        />
      )}
    </div>
  );
};

export default Documents;
