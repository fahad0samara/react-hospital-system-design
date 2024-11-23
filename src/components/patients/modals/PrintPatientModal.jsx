import React from 'react';
import { FiX } from 'react-icons/fi';

const PrintPatientModal = ({ darkMode, patient, hospitalInfo, onClose }) => {
  if (!patient) return null;

  const handlePrint = () => {
    const printContent = document.getElementById('print-single-patient');
    const originalContent = document.body.innerHTML;
    
    document.body.innerHTML = printContent.innerHTML;
    window.print();
    document.body.innerHTML = originalContent;
    
    // Reattach event listeners by forcing a re-render
    window.location.reload();
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
              Print Patient Details
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

          <div id="print-single-patient">
            {/* Hospital Header */}
            <div className="border-b-2 border-gray-200 pb-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <img
                    src={hospitalInfo.logo}
                    alt="Hospital Logo"
                    className="w-16 h-16 object-contain"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='64' height='64' viewBox='0 0 24 16' fill='none' stroke='%234A5568' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2'/%3E%3C/svg%3E";
                    }}
                  />
                  <div>
                    <h1 className="text-2xl font-bold text-gray-800">{hospitalInfo.name}</h1>
                    <p className="text-gray-600">{hospitalInfo.address}</p>
                    <p className="text-gray-600">{hospitalInfo.city}</p>
                  </div>
                </div>
                <div className="text-right text-sm text-gray-600">
                  <p>Phone: {hospitalInfo.phone}</p>
                  <p>Email: {hospitalInfo.email}</p>
                  <p>Web: {hospitalInfo.website}</p>
                </div>
              </div>
            </div>

            {/* Patient Basic Info */}
            <div className="bg-white border border-gray-200 rounded-lg p-6 mt-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">Patient Information</h3>
              <div className="grid grid-cols-3 gap-6">
                <div>
                  <p className="text-sm font-medium text-gray-600">Full Name</p>
                  <p className="text-lg font-semibold">{patient.name}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Gender</p>
                  <p className="text-gray-700">{patient.gender}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Age</p>
                  <p className="text-gray-700">{patient.age} years</p>
                </div>
              </div>
            </div>

            {/* Vitals Information */}
            <div className="bg-white border border-gray-200 rounded-lg p-6 mt-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">Vital Signs</h3>
              <div className="grid grid-cols-4 gap-6">
                {patient.vitals && Object.entries(patient.vitals).map(([key, value]) => (
                  <div key={key} className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-sm font-medium text-gray-600">
                      {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                    </p>
                    <p className="font-medium text-gray-700">{value}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Current Medications */}
            <div className="bg-white border border-gray-200 rounded-lg p-6 mt-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">Current Medications</h3>
              <div className="grid grid-cols-1 gap-4">
                {patient.medications && patient.medications.map((med, index) => (
                  <div key={index} className="bg-gray-50 p-4 rounded-lg">
                    <div className="grid grid-cols-4 gap-4">
                      <div>
                        <p className="text-sm font-medium text-gray-600">Medication</p>
                        <p className="font-medium">{med.name}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-600">Dosage</p>
                        <p className="text-gray-700">{med.dosage}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-600">Frequency</p>
                        <p className="text-gray-700">{med.frequency}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-600">Duration</p>
                        <p className="text-gray-700">{med.startDate} to {med.endDate}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Medical History */}
            <div className="bg-white border border-gray-200 rounded-lg p-6 mt-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">Medical History</h3>
              <div className="space-y-4">
                {patient.medicalHistory && patient.medicalHistory.map((record, index) => (
                  <div key={index} className="bg-gray-50 p-4 rounded-lg">
                    <div className="grid grid-cols-4 gap-4">
                      <div>
                        <p className="text-sm font-medium text-gray-600">Date</p>
                        <p className="text-gray-700">{record.date}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-600">Diagnosis</p>
                        <p className="font-medium">{record.diagnosis}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-600">Treatment</p>
                        <p className="text-gray-700">{record.treatment}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-600">Notes</p>
                        <p className="text-gray-700">{record.notes}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className="mt-8 border-t-2 border-gray-200 pt-6">
              <div className="text-center text-sm text-gray-600">
                <p className="font-medium">{hospitalInfo.name}</p>
                <p>{hospitalInfo.address}, {hospitalInfo.city}</p>
                <p>Phone: {hospitalInfo.phone} | Email: {hospitalInfo.email}</p>
                <div className="mt-4 text-xs text-gray-500">
                  <p>This is a computer-generated document.</p>
                  <p>Generated on {new Date().toLocaleString()} | Document ID: {`PMR-${Math.random().toString(36).substr(2, 9)}`}</p>
                  <p>For any queries, please contact the hospital administration.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 flex justify-end space-x-3">
            <button
              onClick={onClose}
              className={`px-4 py-2 rounded-lg ${
                darkMode
                  ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Cancel
            </button>
            <button
              onClick={handlePrint}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              Print
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrintPatientModal;
