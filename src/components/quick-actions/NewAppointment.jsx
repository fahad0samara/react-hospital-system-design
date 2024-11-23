import React, { useState } from 'react';
import Modal from '../shared/Modal';
import { useTheme } from '../../context/ThemeContext';

const NewAppointment = ({ isOpen, onClose }) => {
  const { darkMode } = useTheme();
  const [formData, setFormData] = useState({
    patientName: '',
    appointmentType: '',
    date: '',
    time: '',
    duration: '',
    notes: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Appointment scheduled:', formData);
    onClose();
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const inputClasses = `w-full px-4 py-2.5 rounded-xl border focus:ring-2 focus:ring-green-500 focus:border-transparent shadow-sm transition-colors duration-200 ${
    darkMode
      ? 'bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400'
      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
  }`;

  const labelClasses = `block text-sm font-medium mb-1 ${
    darkMode ? 'text-gray-200' : 'text-gray-700'
  }`;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Schedule New Appointment" maxWidth="max-w-2xl">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className={labelClasses}>Patient Name</label>
          <input
            type="text"
            name="patientName"
            value={formData.patientName}
            onChange={handleChange}
            className={inputClasses}
            placeholder="Enter patient name"
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className={labelClasses}>Date</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className={inputClasses}
              required
            />
          </div>
          <div>
            <label className={labelClasses}>Time</label>
            <input
              type="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
              className={inputClasses}
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className={labelClasses}>Appointment Type</label>
            <select
              name="appointmentType"
              value={formData.appointmentType}
              onChange={handleChange}
              className={inputClasses}
              required
            >
              <option value="">Select Type</option>
              <option value="consultation">Consultation</option>
              <option value="followUp">Follow-up</option>
              <option value="checkup">Regular Check-up</option>
              <option value="emergency">Emergency</option>
              <option value="specialist">Specialist Consultation</option>
            </select>
          </div>
          <div>
            <label className={labelClasses}>Duration</label>
            <select
              name="duration"
              value={formData.duration}
              onChange={handleChange}
              className={inputClasses}
              required
            >
              <option value="">Select Duration</option>
              <option value="15">15 minutes</option>
              <option value="30">30 minutes</option>
              <option value="45">45 minutes</option>
              <option value="60">1 hour</option>
              <option value="90">1.5 hours</option>
            </select>
          </div>
        </div>

        <div>
          <label className={labelClasses}>Notes</label>
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            rows="3"
            className={inputClasses}
            placeholder="Add any additional notes or special instructions"
          ></textarea>
        </div>

        <div className="flex justify-end space-x-3 pt-4">
          <button
            type="button"
            onClick={onClose}
            className={`px-6 py-2.5 rounded-xl border font-medium transition-colors ${
              darkMode
                ? 'border-gray-600 text-gray-300 hover:bg-gray-700'
                : 'border-gray-300 text-gray-700 hover:bg-gray-50'
            }`}
          >
            Cancel
          </button>
          <button
            type="submit"
            className={`px-6 py-2.5 rounded-xl bg-gradient-to-r text-white font-medium shadow-md hover:shadow-lg ${
              darkMode
                ? 'from-green-600 to-green-700 hover:from-green-700 hover:to-green-800'
                : 'from-green-500 to-green-600 hover:from-green-600 hover:to-green-700'
            }`}
          >
            Schedule Appointment
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default NewAppointment;
