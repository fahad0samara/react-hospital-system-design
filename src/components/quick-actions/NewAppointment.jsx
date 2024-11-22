import React, { useState } from 'react';
import Modal from '../shared/Modal';

const NewAppointment = ({ isOpen, onClose }) => {
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

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Schedule New Appointment" maxWidth="max-w-2xl">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Patient Name</label>
          <input
            type="text"
            name="patientName"
            value={formData.patientName}
            onChange={handleChange}
            className="w-full px-4 py-2.5 bg-white rounded-xl border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent shadow-sm text-gray-900 placeholder-gray-400"
            placeholder="Enter patient name"
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="w-full px-4 py-2.5 bg-white rounded-xl border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent shadow-sm text-gray-900"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
            <input
              type="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
              className="w-full px-4 py-2.5 bg-white rounded-xl border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent shadow-sm text-gray-900"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Appointment Type</label>
            <select
              name="appointmentType"
              value={formData.appointmentType}
              onChange={handleChange}
              className="w-full px-4 py-2.5 bg-white rounded-xl border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent shadow-sm text-gray-900"
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
            <label className="block text-sm font-medium text-gray-700 mb-1">Duration</label>
            <select
              name="duration"
              value={formData.duration}
              onChange={handleChange}
              className="w-full px-4 py-2.5 bg-white rounded-xl border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent shadow-sm text-gray-900"
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
          <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            rows="3"
            className="w-full px-4 py-2.5 bg-white rounded-xl border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent shadow-sm text-gray-900 placeholder-gray-400"
            placeholder="Add any additional notes or special instructions"
          ></textarea>
        </div>

        <div className="flex justify-end space-x-3 pt-4">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors font-medium"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-green-600 to-green-700 text-white hover:from-green-700 hover:to-green-800 transition-colors font-medium shadow-md hover:shadow-lg"
          >
            Schedule Appointment
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default NewAppointment;
