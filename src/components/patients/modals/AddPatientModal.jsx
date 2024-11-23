import React, { useState } from 'react';
import { FiX, FiUser, FiPhone, FiMail, FiMapPin, FiCalendar, FiHeart, FiSave } from 'react-icons/fi';

const AddPatientModal = ({ darkMode, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    age: '',
    gender: 'male',
    bloodGroup: '',
    address: '',
    dateOfBirth: '',
    condition: '',
    emergencyContact: '',
    occupation: '',
    allergies: '',
    weight: '',
    height: '',
  });

  const [activeTab, setActiveTab] = useState('basic');

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
    setFormData({
      name: '',
      email: '',
      phone: '',
      age: '',
      gender: 'male',
      bloodGroup: '',
      address: '',
      dateOfBirth: '',
      condition: '',
      emergencyContact: '',
      occupation: '',
      allergies: '',
      weight: '',
      height: '',
    });
    onClose();
  };

  const modalClasses = darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900';
  const inputClasses = `w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 transition-colors duration-200 ${
    darkMode
      ? 'bg-gray-700 border-gray-600 text-white focus:ring-blue-500 hover:border-gray-500'
      : 'bg-white border-gray-300 text-gray-900 focus:ring-blue-400 hover:border-gray-400'
  }`;
  const labelClasses = `block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`;
  const tabClasses = (isActive) => `px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-200 ${
    isActive
      ? darkMode
        ? 'bg-blue-600 text-white'
        : 'bg-blue-500 text-white'
      : darkMode
        ? 'text-gray-300 hover:bg-gray-700'
        : 'text-gray-700 hover:bg-gray-100'
  }`;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75" onClick={onClose}></div>

        <div className={`inline-block w-full max-w-4xl p-6 my-8 overflow-hidden text-left align-middle transition-all transform shadow-xl rounded-2xl ${modalClasses}`}>
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-semibold flex items-center gap-2">
              <FiUser className="text-blue-500" />
              Add New Patient
            </h3>
            <button
              onClick={onClose}
              className={`p-2 rounded-full transition-colors duration-200 ${
                darkMode
                  ? 'hover:bg-gray-700 text-gray-300'
                  : 'hover:bg-gray-100 text-gray-600'
              }`}
            >
              <FiX className="w-5 h-5" />
            </button>
          </div>

          <div className="flex gap-4 mb-6">
            <button
              onClick={() => setActiveTab('basic')}
              className={tabClasses(activeTab === 'basic')}
            >
              Basic Information
            </button>
            <button
              onClick={() => setActiveTab('medical')}
              className={tabClasses(activeTab === 'medical')}
            >
              Medical Details
            </button>
            <button
              onClick={() => setActiveTab('contact')}
              className={tabClasses(activeTab === 'contact')}
            >
              Contact Information
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {activeTab === 'basic' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className={labelClasses}>
                    Full Name
                  </label>
                  <div className="relative">
                    <FiUser className="absolute left-3 top-3 text-gray-400" />
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className={`${inputClasses} pl-10`}
                      placeholder="Enter patient's full name"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="dateOfBirth" className={labelClasses}>
                    Date of Birth
                  </label>
                  <div className="relative">
                    <FiCalendar className="absolute left-3 top-3 text-gray-400" />
                    <input
                      type="date"
                      id="dateOfBirth"
                      name="dateOfBirth"
                      value={formData.dateOfBirth}
                      onChange={handleChange}
                      className={`${inputClasses} pl-10`}
                      required
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="gender" className={labelClasses}>
                    Gender
                  </label>
                  <select
                    id="gender"
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    className={inputClasses}
                    required
                  >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="bloodGroup" className={labelClasses}>
                    Blood Group
                  </label>
                  <select
                    id="bloodGroup"
                    name="bloodGroup"
                    value={formData.bloodGroup}
                    onChange={handleChange}
                    className={inputClasses}
                    required
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
            )}

            {activeTab === 'medical' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="condition" className={labelClasses}>
                    Medical Condition
                  </label>
                  <div className="relative">
                    <FiHeart className="absolute left-3 top-3 text-gray-400" />
                    <input
                      type="text"
                      id="condition"
                      name="condition"
                      value={formData.condition}
                      onChange={handleChange}
                      className={`${inputClasses} pl-10`}
                      placeholder="Enter medical condition"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="allergies" className={labelClasses}>
                    Allergies
                  </label>
                  <textarea
                    id="allergies"
                    name="allergies"
                    value={formData.allergies}
                    onChange={handleChange}
                    className={inputClasses}
                    placeholder="List any allergies"
                    rows="3"
                  />
                </div>

                <div>
                  <label htmlFor="weight" className={labelClasses}>
                    Weight (kg)
                  </label>
                  <input
                    type="number"
                    id="weight"
                    name="weight"
                    value={formData.weight}
                    onChange={handleChange}
                    className={inputClasses}
                    placeholder="Enter weight in kg"
                  />
                </div>

                <div>
                  <label htmlFor="height" className={labelClasses}>
                    Height (cm)
                  </label>
                  <input
                    type="number"
                    id="height"
                    name="height"
                    value={formData.height}
                    onChange={handleChange}
                    className={inputClasses}
                    placeholder="Enter height in cm"
                  />
                </div>
              </div>
            )}

            {activeTab === 'contact' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="email" className={labelClasses}>
                    Email Address
                  </label>
                  <div className="relative">
                    <FiMail className="absolute left-3 top-3 text-gray-400" />
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`${inputClasses} pl-10`}
                      placeholder="Enter email address"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="phone" className={labelClasses}>
                    Phone Number
                  </label>
                  <div className="relative">
                    <FiPhone className="absolute left-3 top-3 text-gray-400" />
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className={`${inputClasses} pl-10`}
                      placeholder="Enter phone number"
                      required
                    />
                  </div>
                </div>

                <div className="col-span-2">
                  <label htmlFor="address" className={labelClasses}>
                    Address
                  </label>
                  <div className="relative">
                    <FiMapPin className="absolute left-3 top-3 text-gray-400" />
                    <textarea
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      className={`${inputClasses} pl-10`}
                      placeholder="Enter full address"
                      rows="3"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="emergencyContact" className={labelClasses}>
                    Emergency Contact
                  </label>
                  <div className="relative">
                    <FiPhone className="absolute left-3 top-3 text-gray-400" />
                    <input
                      type="tel"
                      id="emergencyContact"
                      name="emergencyContact"
                      value={formData.emergencyContact}
                      onChange={handleChange}
                      className={`${inputClasses} pl-10`}
                      placeholder="Emergency contact number"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="occupation" className={labelClasses}>
                    Occupation
                  </label>
                  <input
                    type="text"
                    id="occupation"
                    name="occupation"
                    value={formData.occupation}
                    onChange={handleChange}
                    className={inputClasses}
                    placeholder="Enter occupation"
                  />
                </div>
              </div>
            )}

            <div className="flex justify-end gap-4 mt-8 pt-4 border-t border-gray-200 dark:border-gray-700">
              <button
                type="button"
                onClick={onClose}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-200 ${
                  darkMode
                    ? 'text-gray-300 hover:bg-gray-700'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition-colors duration-200 flex items-center gap-2"
              >
                <FiSave className="w-4 h-4" />
                Save Patient
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddPatientModal;
