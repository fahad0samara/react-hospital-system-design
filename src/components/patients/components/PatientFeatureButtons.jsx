import React from 'react';

const PatientFeatureButtons = ({
  patient,
  darkMode,
  handleAddMedicalHistory,
  handleScheduleAppointment,
  handleAddPrescription,
  handleAddLabResults,
  handleUpdateInsurance,
  handleDocuments,
}) => {
  return (
    <div className="flex flex-wrap gap-2">
      <button
        onClick={() => handleAddMedicalHistory(patient)}
        className={`px-3 py-1 text-sm rounded-full transition-all duration-200 ${
          darkMode
            ? 'bg-gradient-to-r from-teal-600 to-emerald-600 text-white hover:from-teal-700 hover:to-emerald-700'
            : 'bg-gradient-to-r from-teal-500 to-emerald-500 text-white hover:from-teal-600 hover:to-emerald-600'
        }`}
      >
        Medical History
      </button>
      <button
        onClick={() => handleScheduleAppointment(patient)}
        className={`px-3 py-1 text-sm rounded-full transition-all duration-200 ${
          darkMode
            ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700'
            : 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white hover:from-blue-600 hover:to-indigo-600'
        }`}
      >
        Schedule
      </button>
      <button
        onClick={() => handleAddPrescription(patient)}
        className={`px-3 py-1 text-sm rounded-full transition-all duration-200 ${
          darkMode
            ? 'bg-gradient-to-r from-purple-600 to-violet-600 text-white hover:from-purple-700 hover:to-violet-700'
            : 'bg-gradient-to-r from-purple-500 to-violet-500 text-white hover:from-purple-600 hover:to-violet-600'
        }`}
      >
        Prescriptions
      </button>
      <button
        onClick={() => handleAddLabResults(patient)}
        className={`px-3 py-1 text-sm rounded-full transition-all duration-200 ${
          darkMode
            ? 'bg-gradient-to-r from-amber-600 to-orange-600 text-white hover:from-amber-700 hover:to-orange-700'
            : 'bg-gradient-to-r from-amber-500 to-orange-500 text-white hover:from-amber-600 hover:to-orange-600'
        }`}
      >
        Lab Results
      </button>
      <button
        onClick={() => handleUpdateInsurance(patient)}
        className={`px-3 py-1 text-sm rounded-full transition-all duration-200 ${
          darkMode
            ? 'bg-gradient-to-r from-rose-600 to-pink-600 text-white hover:from-rose-700 hover:to-pink-700'
            : 'bg-gradient-to-r from-rose-500 to-pink-500 text-white hover:from-rose-600 hover:to-pink-600'
        }`}
      >
        Insurance
      </button>
      <button
        onClick={() => handleDocuments(patient)}
        className={`px-3 py-1 text-sm rounded-full transition-all duration-200 ${
          darkMode
            ? 'bg-gradient-to-r from-emerald-600 to-green-600 text-white hover:from-emerald-700 hover:to-green-700'
            : 'bg-gradient-to-r from-emerald-500 to-green-500 text-white hover:from-emerald-600 hover:to-green-600'
        }`}
      >
        Documents
      </button>
    </div>
  );
};

export default PatientFeatureButtons;
