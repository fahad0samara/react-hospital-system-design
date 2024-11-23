import React, { useState } from 'react';
import { FiX, FiPlus, FiTrash2 } from 'react-icons/fi';

const PrescriptionModal = ({
  darkMode,
  patient,
  onClose,
  onSave,
  medications = [],
  frequencies = ['Once daily', 'Twice daily', 'Three times daily', 'Four times daily', 'Every 4 hours', 'Every 6 hours', 'Every 8 hours', 'As needed'],
  routes = ['Oral', 'Intravenous', 'Intramuscular', 'Subcutaneous', 'Topical', 'Inhalation', 'Sublingual']
}) => {
  const [prescriptionItems, setPrescriptionItems] = useState([]);
  const [instructions, setInstructions] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [refills, setRefills] = useState(0);

  const addPrescriptionItem = () => {
    setPrescriptionItems([
      ...prescriptionItems,
      {
        id: Date.now(),
        medication: '',
        dosage: '',
        frequency: '',
        route: '',
        duration: ''
      }
    ]);
  };

  const removePrescriptionItem = (id) => {
    setPrescriptionItems(prescriptionItems.filter(item => item.id !== id));
  };

  const updatePrescriptionItem = (id, field, value) => {
    setPrescriptionItems(prescriptionItems.map(item =>
      item.id === id ? { ...item, [field]: value } : item
    ));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const prescriptionData = {
      patientId: patient.id,
      items: prescriptionItems,
      instructions,
      startDate,
      endDate,
      refills,
      dateIssued: new Date().toISOString(),
      status: 'active'
    };

    onSave(prescriptionData);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75" onClick={onClose}></div>

        <div className={`inline-block w-full max-w-4xl p-6 my-8 overflow-hidden text-left align-middle transition-all transform shadow-xl rounded-2xl ${
          darkMode ? 'bg-gray-800' : 'bg-white'
        }`}>
          <div className="flex justify-between items-center mb-6">
            <h3 className={`text-2xl font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              New Prescription
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

          {/* Patient Info */}
          <div className={`p-4 rounded-lg mb-6 ${darkMode ? 'bg-gray-700/50' : 'bg-gray-50'}`}>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  Patient Name
                </p>
                <p className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  {patient.name}
                </p>
              </div>
              <div>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  Patient ID
                </p>
                <p className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  {patient.id}
                </p>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Prescription Items */}
            <div className="space-y-4">
              {prescriptionItems.map((item) => (
                <div
                  key={item.id}
                  className={`p-4 rounded-lg border ${
                    darkMode ? 'border-gray-700 bg-gray-700/30' : 'border-gray-200'
                  }`}
                >
                  <div className="grid grid-cols-6 gap-4">
                    <div className="col-span-2">
                      <label className={`block text-sm font-medium mb-2 ${
                        darkMode ? 'text-gray-300' : 'text-gray-700'
                      }`}>
                        Medication
                      </label>
                      <select
                        value={item.medication}
                        onChange={(e) => updatePrescriptionItem(item.id, 'medication', e.target.value)}
                        required
                        className={`w-full px-3 py-2 rounded-lg border transition-colors duration-200 ${
                          darkMode
                            ? 'bg-gray-700 border-gray-600 text-white'
                            : 'bg-white border-gray-200 text-gray-700'
                        } focus:outline-none focus:ring-2 focus:ring-blue-500/50`}
                      >
                        <option value="">Select Medication</option>
                        {medications.map(med => (
                          <option key={med.id} value={med.id}>
                            {med.name} ({med.strength})
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className={`block text-sm font-medium mb-2 ${
                        darkMode ? 'text-gray-300' : 'text-gray-700'
                      }`}>
                        Dosage
                      </label>
                      <input
                        type="text"
                        value={item.dosage}
                        onChange={(e) => updatePrescriptionItem(item.id, 'dosage', e.target.value)}
                        required
                        placeholder="e.g., 1 tablet"
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
                        Frequency
                      </label>
                      <select
                        value={item.frequency}
                        onChange={(e) => updatePrescriptionItem(item.id, 'frequency', e.target.value)}
                        required
                        className={`w-full px-3 py-2 rounded-lg border transition-colors duration-200 ${
                          darkMode
                            ? 'bg-gray-700 border-gray-600 text-white'
                            : 'bg-white border-gray-200 text-gray-700'
                        } focus:outline-none focus:ring-2 focus:ring-blue-500/50`}
                      >
                        <option value="">Select Frequency</option>
                        {frequencies.map(freq => (
                          <option key={freq} value={freq}>{freq}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className={`block text-sm font-medium mb-2 ${
                        darkMode ? 'text-gray-300' : 'text-gray-700'
                      }`}>
                        Route
                      </label>
                      <select
                        value={item.route}
                        onChange={(e) => updatePrescriptionItem(item.id, 'route', e.target.value)}
                        required
                        className={`w-full px-3 py-2 rounded-lg border transition-colors duration-200 ${
                          darkMode
                            ? 'bg-gray-700 border-gray-600 text-white'
                            : 'bg-white border-gray-200 text-gray-700'
                        } focus:outline-none focus:ring-2 focus:ring-blue-500/50`}
                      >
                        <option value="">Select Route</option>
                        {routes.map(route => (
                          <option key={route} value={route}>{route}</option>
                        ))}
                      </select>
                    </div>
                    <div className="flex items-end">
                      <button
                        type="button"
                        onClick={() => removePrescriptionItem(item.id)}
                        className={`p-2 rounded-lg transition-colors ${
                          darkMode
                            ? 'hover:bg-gray-600 text-gray-400 hover:text-white'
                            : 'hover:bg-gray-100 text-gray-500 hover:text-gray-700'
                        }`}
                      >
                        <FiTrash2 size={20} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              <button
                type="button"
                onClick={addPrescriptionItem}
                className={`w-full p-4 rounded-lg border-2 border-dashed transition-colors ${
                  darkMode
                    ? 'border-gray-700 hover:border-gray-600 text-gray-400'
                    : 'border-gray-300 hover:border-gray-400 text-gray-500'
                }`}
              >
                <div className="flex items-center justify-center space-x-2">
                  <FiPlus />
                  <span>Add Medication</span>
                </div>
              </button>
            </div>

            {/* Additional Details */}
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className={`block text-sm font-medium mb-2 ${
                  darkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Start Date
                </label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  required
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
                  End Date
                </label>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  required
                  className={`w-full px-3 py-2 rounded-lg border transition-colors duration-200 ${
                    darkMode
                      ? 'bg-gray-700 border-gray-600 text-white'
                      : 'bg-white border-gray-200 text-gray-700'
                  } focus:outline-none focus:ring-2 focus:ring-blue-500/50`}
                />
              </div>
            </div>

            <div>
              <label className={`block text-sm font-medium mb-2 ${
                darkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Special Instructions
              </label>
              <textarea
                value={instructions}
                onChange={(e) => setInstructions(e.target.value)}
                rows="3"
                className={`w-full px-3 py-2 rounded-lg border transition-colors duration-200 ${
                  darkMode
                    ? 'bg-gray-700 border-gray-600 text-white'
                    : 'bg-white border-gray-200 text-gray-700'
                } focus:outline-none focus:ring-2 focus:ring-blue-500/50`}
                placeholder="Add any special instructions or notes..."
              />
            </div>

            <div>
              <label className={`block text-sm font-medium mb-2 ${
                darkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Number of Refills
              </label>
              <input
                type="number"
                min="0"
                max="12"
                value={refills}
                onChange={(e) => setRefills(parseInt(e.target.value))}
                className={`w-32 px-3 py-2 rounded-lg border transition-colors duration-200 ${
                  darkMode
                    ? 'bg-gray-700 border-gray-600 text-white'
                    : 'bg-white border-gray-200 text-gray-700'
                } focus:outline-none focus:ring-2 focus:ring-blue-500/50`}
              />
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end space-x-3">
              <button
                type="button"
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
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              >
                Save Prescription
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PrescriptionModal;
