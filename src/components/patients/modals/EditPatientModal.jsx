import React, { useState } from 'react';
import { FiX, FiUser, FiPhone, FiMail, FiMapPin, FiCalendar, FiHeart } from 'react-icons/fi';

const EditPatientModal = ({ darkMode, patient, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    ...patient,
    dateOfBirth: patient.dateOfBirth || '',
    condition: patient.condition || '',
    emergencyContact: patient.emergencyContact || '',
    occupation: patient.occupation || '',
    allergies: patient.allergies || '',
    weight: patient.weight || '',
    height: patient.height || '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const inputClasses = `w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
    darkMode
      ? 'bg-gray-700 border-gray-600 text-white focus:ring-blue-500'
      : 'bg-white border-gray-300 text-gray-900 focus:ring-blue-400'
  }`;

  const labelClasses = `block text-sm font-medium mb-2 ${
    darkMode ? 'text-gray-300' : 'text-gray-700'
  }`;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75" onClick={onClose}></div>

        <div className={`inline-block w-full max-w-4xl p-6 my-8 overflow-hidden text-left align-middle transition-all transform shadow-xl rounded-2xl ${
          darkMode ? 'bg-gray-800' : 'bg-white'
        }`}>
          <div className="flex justify-between items-center mb-6">
            <h3 className={`text-2xl font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Edit Patient
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

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Information */}
            <div className="grid grid-cols-3 gap-6">
              <div>
                <label className={labelClasses}>
                  Full Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiUser className={darkMode ? 'text-gray-400' : 'text-gray-500'} />
                  </div>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className={`${inputClasses} pl-10`}
                    placeholder="John Doe"
                  />
                </div>
              </div>
              <div>
                <label className={labelClasses}>
                  Email
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiMail className={darkMode ? 'text-gray-400' : 'text-gray-500'} />
                  </div>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className={`${inputClasses} pl-10`}
                    placeholder="john@example.com"
                  />
                </div>
              </div>
              <div>
                <label className={labelClasses}>
                  Phone
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiPhone className={darkMode ? 'text-gray-400' : 'text-gray-500'} />
                  </div>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className={`${inputClasses} pl-10`}
                    placeholder="(123) 456-7890"
                  />
                </div>
              </div>
            </div>

            {/* Personal Information */}
            <div className="grid grid-cols-4 gap-6">
              <div>
                <label className={labelClasses}>
                  Date of Birth
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiCalendar className={darkMode ? 'text-gray-400' : 'text-gray-500'} />
                  </div>
                  <input
                    type="date"
                    name="dateOfBirth"
                    value={formData.dateOfBirth}
                    onChange={handleChange}
                    required
                    className={`${inputClasses} pl-10`}
                  />
                </div>
              </div>
              <div>
                <label className={labelClasses}>
                  Blood Group
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiHeart className={darkMode ? 'text-gray-400' : 'text-gray-500'} />
                  </div>
                  <select
                    name="bloodGroup"
                    value={formData.bloodGroup}
                    onChange={handleChange}
                    required
                    className={`${inputClasses} pl-10`}
                  >
                    <option value="">Select Blood Group</option>
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-">AB-</option>
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>
                  </select>
                </div>
              </div>
              <div>
                <label className={labelClasses}>
                  Weight (kg)
                </label>
                <input
                  type="number"
                  name="weight"
                  value={formData.weight}
                  onChange={handleChange}
                  className={inputClasses}
                  placeholder="70"
                  step="0.1"
                />
              </div>
              <div>
                <label className={labelClasses}>
                  Height (cm)
                </label>
                <input
                  type="number"
                  name="height"
                  value={formData.height}
                  onChange={handleChange}
                  className={inputClasses}
                  placeholder="175"
                />
              </div>
            </div>

            {/* Medical Information */}
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className={labelClasses}>
                  Medical Condition
                </label>
                <input
                  type="text"
                  name="condition"
                  value={formData.condition}
                  onChange={handleChange}
                  className={inputClasses}
                  placeholder="e.g., Hypertension, Diabetes"
                />
              </div>
              <div>
                <label className={labelClasses}>
                  Allergies
                </label>
                <input
                  type="text"
                  name="allergies"
                  value={formData.allergies}
                  onChange={handleChange}
                  className={inputClasses}
                  placeholder="e.g., Penicillin, Peanuts"
                />
              </div>
            </div>

            {/* Gender Selection */}
            <div>
              <label className={labelClasses}>
                Gender
              </label>
              <div className="flex space-x-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="gender"
                    value="male"
                    checked={formData.gender === 'male'}
                    onChange={handleChange}
                    className="mr-2 text-blue-500 focus:ring-blue-400"
                  />
                  <span className={darkMode ? 'text-gray-300' : 'text-gray-700'}>Male</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="gender"
                    value="female"
                    checked={formData.gender === 'female'}
                    onChange={handleChange}
                    className="mr-2 text-blue-500 focus:ring-blue-400"
                  />
                  <span className={darkMode ? 'text-gray-300' : 'text-gray-700'}>Female</span>
                </label>
              </div>
            </div>

            {/* Contact Information */}
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className={labelClasses}>
                  Emergency Contact
                </label>
                <input
                  type="tel"
                  name="emergencyContact"
                  value={formData.emergencyContact}
                  onChange={handleChange}
                  className={inputClasses}
                  placeholder="Emergency contact number"
                />
              </div>
              <div>
                <label className={labelClasses}>
                  Occupation
                </label>
                <input
                  type="text"
                  name="occupation"
                  value={formData.occupation}
                  onChange={handleChange}
                  className={inputClasses}
                  placeholder="e.g., Engineer, Teacher"
                />
              </div>
            </div>

            {/* Address */}
            <div>
              <label className={labelClasses}>
                Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiMapPin className={darkMode ? 'text-gray-400' : 'text-gray-500'} />
                </div>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                  rows="2"
                  className={`${inputClasses} pl-10`}
                  placeholder="Enter full address"
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={onClose}
                className={`px-4 py-2 rounded-lg ${
                  darkMode
                    ? 'bg-gray-700 hover:bg-gray-600 text-gray-300'
                    : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
                }`}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              >
                Update Patient
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditPatientModal;
