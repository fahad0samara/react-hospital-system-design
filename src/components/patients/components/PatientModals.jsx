import React from 'react';
import Modal from '../../shared/Modal';

const PatientModals = ({
  darkMode,
  selectedPatient,
  showViewModal,
  showMedicalHistoryModal,
  showAppointmentModal,
  handlePrintSingle,
  setShowViewModal,
  setShowMedicalHistoryModal,
  setShowAppointmentModal,
  setSelectedPatient,
}) => {
  return (
    <div>
      {/* View Modal */}
      <Modal
        isOpen={showViewModal}
        onClose={() => {
          setShowViewModal(false);
          setSelectedPatient(null);
        }}
        title="Patient Details"
        maxWidth="max-w-4xl"
      >
        <div className={`p-6 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
          {selectedPatient && (
            <div className="space-y-6">
              {/* Content here */}
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => handlePrintSingle(selectedPatient)}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    darkMode
                      ? 'bg-blue-500 text-white hover:bg-blue-600'
                      : 'bg-blue-500 text-white hover:bg-blue-600'
                  }`}
                >
                  Print Details
                </button>
                <button
                  onClick={() => {
                    setShowViewModal(false);
                    setSelectedPatient(null);
                  }}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    darkMode
                      ? 'bg-blue-500 text-white hover:bg-blue-600'
                      : 'bg-blue-500 text-white hover:bg-blue-600'
                  }`}
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </div>
      </Modal>

      {/* Medical History Modal */}
      <Modal
        isOpen={showMedicalHistoryModal}
        onClose={() => {
          setShowMedicalHistoryModal(false);
          setSelectedPatient(null);
        }}
        title="Medical History"
        maxWidth="max-w-4xl"
      >
        <div className={`p-6 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
          {selectedPatient && (
            <div className="space-y-6">
              {/* Medical History */}
              <div>
                <h3 className={`text-lg font-semibold mb-4 ${
                  darkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  Medical History
                </h3>
                {/* Add medical history form/content here */}
              </div>
              {/* Action Buttons */}
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => {
                    setShowMedicalHistoryModal(false);
                    setSelectedPatient(null);
                  }}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    darkMode
                      ? 'bg-blue-500 text-white hover:bg-blue-600'
                      : 'bg-blue-500 text-white hover:bg-blue-600'
                  }`}
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </div>
      </Modal>

      {/* Appointment Modal */}
      <Modal
        isOpen={showAppointmentModal}
        onClose={() => {
          setShowAppointmentModal(false);
          setSelectedPatient(null);
        }}
        title="Schedule Appointment"
        maxWidth="max-w-4xl"
      >
        <div className={`p-6 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
          {selectedPatient && (
            <div className="space-y-6">
              {/* Appointment Scheduling */}
              <div>
                <h3 className={`text-lg font-semibold ${
                  darkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  Schedule Appointment
                </h3>
                {/* Add appointment scheduling form here */}
              </div>
              {/* Action Buttons */}
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => {
                    setShowAppointmentModal(false);
                    setSelectedPatient(null);
                  }}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    darkMode
                      ? 'bg-blue-500 text-white hover:bg-blue-600'
                      : 'bg-blue-500 text-white hover:bg-blue-600'
                  }`}
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </div>
      </Modal>
    </div>
  );
};

export default PatientModals;
