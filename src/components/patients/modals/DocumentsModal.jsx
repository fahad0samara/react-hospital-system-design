import React, { useState } from 'react';
import { FiX, FiFile, FiDownload, FiTrash2 } from 'react-icons/fi';

const DocumentsModal = ({
  darkMode,
  patient,
  onClose,
  onUpload,
  onDelete,
  onDownload,
  availableDocumentTags = [
    'Lab Report',
    'Prescription',
    'X-Ray',
    'MRI',
    'CT Scan',
    'Insurance',
    'Consent Form',
    'Discharge Summary',
    'Follow-up',
    'Emergency'
  ]
}) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [documentType, setDocumentType] = useState('');
  const [documentDescription, setDocumentDescription] = useState('');
  const [documentDate, setDocumentDate] = useState('');
  const [documentPriority, setDocumentPriority] = useState('normal');
  const [selectedTags, setSelectedTags] = useState([]);

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleTagSelect = (tag) => {
    setSelectedTags(prev =>
      prev.includes(tag)
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const handleUpload = () => {
    if (!selectedFile || !documentType) return;

    const formData = {
      file: selectedFile,
      type: documentType,
      description: documentDescription,
      date: documentDate,
      priority: documentPriority,
      tags: selectedTags,
      patientId: patient.id
    };

    onUpload(formData);
    resetForm();
  };

  const resetForm = () => {
    setSelectedFile(null);
    setDocumentType('');
    setDocumentDescription('');
    setDocumentDate('');
    setDocumentPriority('normal');
    setSelectedTags([]);
    // Reset file input
    const fileInput = document.getElementById('file-upload');
    if (fileInput) fileInput.value = '';
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75" onClick={onClose}></div>

        <div className={`inline-block w-full max-w-5xl p-6 my-8 overflow-hidden text-left align-middle transition-all transform shadow-xl rounded-2xl ${
          darkMode ? 'bg-gray-800' : 'bg-white'
        }`}>
          <div className="flex justify-between items-center mb-6">
            <h3 className={`text-2xl font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Medical Documents
            </h3>
            <button
              onClick={onClose}
              className={`p-2 rounded-lg transition-colors ${
                darkMode
                  ? 'hover:bg-gray-700 text-gray-400 hover:text-white'
                  : 'hover:bg-gray-100 text-gray-500 hover:text-gray-700'
              }`}
            >
              <FiX size={20} />
            </button>
          </div>

          {/* Upload Section */}
          <div className="space-y-6">
            <div>
              <h3 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Upload New Document
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div>
                  <label className={`block text-sm font-medium mb-2 ${
                    darkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Document Type
                  </label>
                  <select 
                    value={documentType}
                    onChange={(e) => setDocumentType(e.target.value)}
                    className={`w-full px-3 py-2 rounded-lg border transition-colors duration-200 ${
                      darkMode
                        ? 'bg-gray-700 border-gray-600 text-white'
                        : 'bg-white border-gray-200 text-gray-700'
                    } focus:outline-none focus:ring-2 focus:ring-blue-500/50`}
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
                  <label className={`block text-sm font-medium mb-2 ${
                    darkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    File
                  </label>
                  <input
                    id="file-upload"
                    type="file"
                    onChange={handleFileSelect}
                    className={`w-full px-3 py-2 rounded-lg border transition-colors duration-200 ${
                      darkMode
                        ? 'bg-gray-700 border-gray-600 text-white'
                        : 'bg-white border-gray-200 text-gray-700'
                    } focus:outline-none focus:ring-2 focus:ring-blue-500/50`}
                    accept=".pdf,.jpg,.jpeg,.png,.doc,.docx,.dicom"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div>
                  <label className={`block text-sm font-medium mb-2 ${
                    darkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Document Date
                  </label>
                  <input
                    type="date"
                    value={documentDate}
                    onChange={(e) => setDocumentDate(e.target.value)}
                    className={`w-full px-3 py-2 rounded-lg border transition-colors duration-200 ${
                      darkMode
                        ? 'bg-gray-700 border-gray-600 text-white'
                        : 'bg-white border-gray-200 text-gray-700'
                    } focus:outline-none focus:ring-2 focus:ring-blue-500/50`}
                  />
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-2 ${
                    darkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Priority
                  </label>
                  <select
                    value={documentPriority}
                    onChange={(e) => setDocumentPriority(e.target.value)}
                    className={`w-full px-3 py-2 rounded-lg border transition-colors duration-200 ${
                      darkMode
                        ? 'bg-gray-700 border-gray-600 text-white'
                        : 'bg-white border-gray-200 text-gray-700'
                    } focus:outline-none focus:ring-2 focus:ring-blue-500/50`}
                  >
                    <option value="low">Low</option>
                    <option value="normal">Normal</option>
                    <option value="high">High</option>
                    <option value="urgent">Urgent</option>
                  </select>
                </div>
              </div>

              <div className="mt-4">
                <label className={`block text-sm font-medium mb-2 ${
                  darkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Tags
                </label>
                <div className="flex flex-wrap gap-2 p-2 border rounded-lg bg-white">
                  {availableDocumentTags.map(tag => (
                    <button
                      key={tag}
                      onClick={() => handleTagSelect(tag)}
                      className={`px-2 py-1 rounded-full text-sm ${
                        selectedTags.includes(tag)
                          ? 'bg-blue-100 text-blue-700 border border-blue-300'
                          : 'bg-gray-100 text-gray-700 border border-gray-300 hover:bg-gray-200'
                      }`}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-4">
                <label className={`block text-sm font-medium mb-2 ${
                  darkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Description
                </label>
                <textarea
                  value={documentDescription}
                  onChange={(e) => setDocumentDescription(e.target.value)}
                  rows="3"
                  className={`w-full px-3 py-2 rounded-lg border transition-colors duration-200 ${
                    darkMode
                      ? 'bg-gray-700 border-gray-600 text-white'
                      : 'bg-white border-gray-200 text-gray-700'
                  } focus:outline-none focus:ring-2 focus:ring-blue-500/50`}
                  placeholder="Enter document description..."
                />
              </div>

              <div className="mt-4 flex justify-end">
                <button
                  onClick={handleUpload}
                  disabled={!selectedFile || !documentType}
                  className={`px-4 py-2 rounded-lg ${
                    !selectedFile || !documentType
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : 'bg-blue-500 text-white hover:bg-blue-600'
                  }`}
                >
                  Upload Document
                </button>
              </div>
            </div>

            {/* Documents List */}
            <div className="mt-8">
              <h3 className={`text-lg font-semibold mb-4 ${
                darkMode ? 'text-white' : 'text-gray-900'
              }`}>
                Uploaded Documents
              </h3>
              <div className="space-y-4">
                {patient.documents && patient.documents.map((doc, index) => (
                  <div
                    key={index}
                    className={`p-4 rounded-lg border ${
                      darkMode
                        ? 'bg-gray-700/50 border-gray-600'
                        : 'bg-white border-gray-200'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className={`p-2 rounded-lg ${
                          darkMode ? 'bg-gray-600' : 'bg-gray-100'
                        }`}>
                          <FiFile className={darkMode ? 'text-gray-300' : 'text-gray-600'} />
                        </div>
                        <div>
                          <h4 className={`font-medium ${
                            darkMode ? 'text-white' : 'text-gray-900'
                          }`}>
                            {doc.name}
                          </h4>
                          <p className={`text-sm ${
                            darkMode ? 'text-gray-400' : 'text-gray-500'
                          }`}>
                            {doc.type} • {doc.date} • {doc.size}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => onDownload(doc)}
                          className={`p-2 rounded-lg transition-colors ${
                            darkMode
                              ? 'hover:bg-gray-600 text-gray-400 hover:text-white'
                              : 'hover:bg-gray-100 text-gray-500 hover:text-gray-700'
                          }`}
                        >
                          <FiDownload />
                        </button>
                        <button
                          onClick={() => onDelete(doc)}
                          className={`p-2 rounded-lg transition-colors ${
                            darkMode
                              ? 'hover:bg-gray-600 text-gray-400 hover:text-white'
                              : 'hover:bg-gray-100 text-gray-500 hover:text-gray-700'
                          }`}
                        >
                          <FiTrash2 />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentsModal;
