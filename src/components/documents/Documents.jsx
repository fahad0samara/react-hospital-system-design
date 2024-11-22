import React, { useState, useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';

function formatFileSize(size) {
  const i = Math.floor(Math.log(size) / Math.log(1024));
  return (size / Math.pow(1024, i)).toFixed(2) * 1 + ' ' + ['B', 'KB', 'MB', 'GB', 'TB'][i];
}

const Documents = () => {
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

  const availableDocumentTags = [
    'Urgent Review', 'Follow-up Required', 'Pending Results', 
    'Critical', 'Routine', 'Confidential', 'Draft',
    'Final Report', 'Archived', 'Needs Signature'
  ];

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const handleFileUpload = () => {
    if (!selectedFile || !documentType) return;

    const newDocument = {
      id: Date.now(),
      name: selectedFile.name,
      type: documentType,
      description: documentDescription,
      uploadDate: new Date().toISOString(),
      documentDate: documentDate || new Date().toISOString(),
      priority: documentPriority || 'normal',
      size: selectedFile.size,
      url: URL.createObjectURL(selectedFile),
      uploadedBy: user.name || "Unknown",
      tags: selectedTags,
      status: 'active',
      version: 1,
      lastModified: new Date().toISOString()
    };

    const updatedFiles = [...uploadedFiles, newDocument];
    setUploadedFiles(updatedFiles);

    // Reset form
    setSelectedFile(null);
    setDocumentType('');
    setDocumentDescription('');
    setDocumentDate('');
    setDocumentPriority('normal');
    setSelectedTags([]);
    // Reset file input
    const fileInput = document.getElementById('file-upload');
    if (fileInput) fileInput.value = '';

    // Close modal after upload
    setIsModalOpen(false);
  };

  const handleTagSelect = (tag) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const filteredAndSortedDocuments = useMemo(() => {
    let docs = [...uploadedFiles];

    // Apply filters
    docs = docs.filter(file => {
      const matchesSearch = file.name.toLowerCase().includes(searchTermDocuments.toLowerCase()) ||
                          file.description.toLowerCase().includes(searchTermDocuments.toLowerCase());
      const matchesType = filterTypeDocuments === 'all' || file.type === filterTypeDocuments;
      const matchesPriority = filterPriority === 'all' || file.priority === filterPriority;
      return matchesSearch && matchesType && matchesPriority;
    });

    // Apply sorting
    docs.sort((a, b) => {
      let compareResult = 0;
      switch (sortBy) {
        case 'date':
          compareResult = new Date(b.documentDate) - new Date(a.documentDate);
          break;
        case 'name':
          compareResult = a.name.localeCompare(b.name);
          break;
        case 'type':
          compareResult = a.type.localeCompare(b.type);
          break;
        case 'size':
          compareResult = b.size - a.size;
          break;
        case 'priority':
          const priorityOrder = { urgent: 3, high: 2, normal: 1, low: 0 };
          compareResult = priorityOrder[b.priority] - priorityOrder[a.priority];
          break;
        default:
          compareResult = 0;
      }
      return sortOrder === 'asc' ? -compareResult : compareResult;
    });

    return docs;
  }, [uploadedFiles, searchTermDocuments, filterTypeDocuments, filterPriority, sortBy, sortOrder]);

  return (
    <div className="p-8 max-w-[1600px] mx-auto bg-white rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800">Medical Documents</h1>
        <div className="flex gap-4">
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-6 py-3 rounded-full bg-blue-500 hover:bg-blue-600 text-white font-semibold shadow-lg"
          >
            Upload Document
          </button>
        </div>
      </div>

      {/* Modal for Upload */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-gray-100 rounded-xl p-8 shadow-lg max-w-3xl w-full max-h-[85vh] overflow-y-auto mx-6 mt-10">
            <div className="flex justify-between items-center mb-6 border-b pb-4">
              <h3 className="text-2xl font-bold text-blue-700">Upload Document</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-500 hover:text-gray-700">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-lg font-medium text-gray-800 mb-2">Document Type</label>
                  <select 
                    value={documentType}
                    onChange={(e) => setDocumentType(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                  >
                    <option value="">Select Type</option>
                    <option value="Medical Report">Medical Report</option>
                    <option value="Lab Report">Lab Report</option>
                    <option value="X-Ray">X-Ray</option>
                    <option value="MRI Scan">MRI Scan</option>
                    <option value="CT Scan">CT Scan</option>
                    <option value="Ultrasound">Ultrasound</option>
                    <option value="ECG">ECG</option>
                    <option value="Prescription">Prescription</option>
                    <option value="Discharge Summary">Discharge Summary</option>
                    <option value="Surgical Report">Surgical Report</option>
                    <option value="Pathology Report">Pathology Report</option>
                    <option value="Vaccination Record">Vaccination Record</option>
                    <option value="Insurance Document">Insurance Document</option>
                    <option value="Consent Form">Consent Form</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-lg font-medium text-gray-800 mb-2">File</label>
                  <input
                    id="file-upload"
                    type="file"
                    onChange={handleFileSelect}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                    accept=".pdf,.jpg,.jpeg,.png,.doc,.docx,.dicom"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-lg font-medium text-gray-800 mb-2">Document Date</label>
                  <input
                    type="date"
                    value={documentDate}
                    onChange={(e) => setDocumentDate(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                  />
                </div>
                <div>
                  <label className="block text-lg font-medium text-gray-800 mb-2">Priority</label>
                  <select
                    value={documentPriority}
                    onChange={(e) => setDocumentPriority(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                  >
                    <option value="low">Low</option>
                    <option value="normal">Normal</option>
                    <option value="high">High</option>
                    <option value="urgent">Urgent</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-lg font-medium text-gray-800 mb-2">Tags</label>
                <div className="flex flex-wrap gap-3 p-3 border border-gray-300 rounded-lg bg-white">
                  {availableDocumentTags.map(tag => (
                    <button
                      key={tag}
                      onClick={() => handleTagSelect(tag)}
                      className={`px-3 py-2 rounded-full text-sm font-medium ${
                        selectedTags.includes(tag)
                          ? 'bg-blue-100 text-blue-800 border border-blue-300'
                          : 'bg-gray-100 text-gray-800 border border-gray-300 hover:bg-gray-200'
                      }`}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-lg font-medium text-gray-800 mb-2">Description</label>
                <textarea
                  value={documentDescription}
                  onChange={(e) => setDocumentDescription(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                  rows="3"
                  placeholder="Enter document description..."
                ></textarea>
              </div>
            </div>
            <div className="flex justify-end mt-6">
              <button
                onClick={handleFileUpload}
                disabled={!selectedFile || !documentType}
                className={`px-6 py-3 rounded-full text-white font-semibold ${
                  !selectedFile || !documentType
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-blue-500 hover:bg-blue-600 shadow-lg'
                }`}
              >
                Upload
              </button>
              <button
                onClick={() => setIsModalOpen(false)}
                className="ml-4 px-6 py-3 rounded-full bg-red-500 hover:bg-red-600 text-white font-semibold shadow-lg"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Documents List */}
      <div className="bg-white text-gray-800 rounded-lg p-8 shadow-md mt-8">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-semibold">Uploaded Documents</h3>
          <div className="flex gap-4">
            <div>
              <input
                type="text"
                placeholder="Search documents..."
                value={searchTermDocuments}
                onChange={(e) => setSearchTermDocuments(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm"
              />
            </div>
            <div>
              <select
                value={filterTypeDocuments}
                onChange={(e) => setFilterTypeDocuments(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm"
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
                className="px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm"
              >
                <option value="all">All Priorities</option>
                <option value="urgent">Urgent</option>
                <option value="high">High</option>
                <option value="normal">Normal</option>
                <option value="low">Low</option>
              </select>
            </div>
            <div className="flex items-center gap-3">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm"
              >
                <option value="date">Date</option>
                <option value="name">Name</option>
                <option value="type">Type</option>
                <option value="size">Size</option>
                <option value="priority">Priority</option>
              </select>
              <button
                onClick={() => setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc')}
                className="p-2 rounded-lg hover:bg-gray-200"
              >
                {sortOrder === 'asc' ? '↑' : '↓'}
              </button>
            </div>
          </div>
        </div>
        {filteredAndSortedDocuments.length === 0 ? (
          <div className="text-center py-10 text-gray-500">
            No documents found
          </div>
        ) : (
          <div className="space-y-6">
            {filteredAndSortedDocuments.map((file) => (
              <div
                key={file.id}
                className={`flex items-center justify-between p-5 bg-white rounded-lg shadow-md border-l-4 ${
                  file.priority === 'urgent' ? 'border-red-500' :
                  file.priority === 'high' ? 'border-orange-500' :
                  file.priority === 'normal' ? 'border-blue-500' :
                  'border-gray-500'
                }`}
              >
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900">{file.name}</h4>
                  <p className="text-sm text-gray-700">{file.description}</p>
                  <div className="flex flex-wrap items-center gap-3 mt-3">
                    <span className="px-3 py-1 bg-gray-100 rounded-full text-sm font-medium">{file.type}</span>
                    <span className="text-sm text-gray-600">•</span>
                    <span className="text-sm text-gray-600">{formatFileSize(file.size)}</span>
                    <span className="text-sm text-gray-600">•</span>
                    <span className="text-sm text-gray-600">
                      Document Date: {new Date(file.documentDate).toLocaleString()}
                    </span>
                    <span className="text-sm text-gray-600">•</span>
                    <span className="text-sm text-gray-600">
                      Uploaded: {new Date(file.uploadDate).toLocaleString()}
                    </span>
                    <span className="text-sm text-gray-600">•</span>
                    <span className="text-sm text-gray-600">By: {file.uploadedBy}</span>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      file.priority === 'urgent' ? 'bg-red-100 text-red-800' :
                      file.priority === 'high' ? 'bg-orange-100 text-orange-800' :
                      file.priority === 'normal' ? 'bg-blue-100 text-blue-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {file.priority ? file.priority.charAt(0).toUpperCase() + file.priority.slice(1) : 'Normal'}
                    </span>
                    {file.tags && file.tags.map(tag => (
                      <span key={tag} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                        {tag}
                      </span>
                    ))}
                    {file.version > 1 && (
                      <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                        v{file.version}
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <a
                    href={file.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 text-sm bg-blue-50 text-blue-700 hover:text-blue-800 rounded-lg hover:bg-blue-100 transition-colors font-medium"
                  >
                    View
                  </a>
                  <button
                    onClick={() => handlePrint(file.id)}
                    className="px-4 py-2 text-sm bg-blue-50 text-blue-700 hover:text-blue-800 rounded-lg hover:bg-blue-100 transition-colors font-medium"
                  >
                    Print
                  </button>
                  <button
                    onClick={() => handleDeleteDocument(file.id)}
                    className="px-4 py-2 text-sm bg-red-50 text-red-700 hover:text-red-800 rounded-lg hover:bg-red-100 transition-colors font-medium"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Documents;
