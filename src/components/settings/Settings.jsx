import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiSettings, FiUser, FiLock, FiBell, FiGlobe, 
  FiMonitor, FiMoon, FiSun, FiSave, FiCamera,
  FiMail, FiPhone, FiMapPin, FiCalendar, FiClock,
  FiToggleLeft, FiToggleRight, FiCheck, FiX,
  FiChevronRight, FiActivity, FiShield, FiEdit,
  FiGrid, FiLayout, FiEye, FiUpload, FiAlertCircle
} from 'react-icons/fi';
import { useTheme } from '../../context/ThemeContext';

const ToggleSwitch = ({ enabled, onChange }) => {
  const { darkMode } = useTheme();
  return (
    <button
      onClick={() => onChange(!enabled)}
      className={`relative inline-flex h-7 w-14 items-center rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
        enabled 
          ? 'bg-gradient-to-r from-blue-500 to-blue-600' 
          : darkMode ? 'bg-gray-700' : 'bg-gray-200'
      }`}
    >
      <span
        className={`inline-block h-5 w-5 transform rounded-full bg-white shadow-lg ring-0 transition-transform duration-300 ease-in-out ${
          enabled ? 'translate-x-8' : 'translate-x-1'
        }`}
      />
    </button>
  );
};

const InputField = ({ label, icon: Icon, value, onChange, type = 'text' }) => {
  const { darkMode } = useTheme();
  return (
    <div className="relative group">
      <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-1`}>
        {label}
      </label>
      <div className="mt-1 relative rounded-lg shadow-sm">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Icon className={`h-5 w-5 ${darkMode ? 'text-gray-500' : 'text-gray-400'} group-hover:text-blue-500 transition-colors duration-200`} />
        </div>
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`block w-full pl-10 pr-3 py-2.5 border rounded-lg 
            focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
            hover:border-blue-400 transition-all duration-200
            ${darkMode 
              ? 'bg-gray-800 border-gray-700 text-gray-100' 
              : 'bg-white border-gray-300 text-gray-900'}`}
        />
      </div>
    </div>
  );
};

const SettingsSection = ({ icon: Icon, title, description, children }) => {
  const { darkMode } = useTheme();
  return (
    <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-xl shadow-sm border p-6 mb-6 transition-colors duration-200`}>
      <div className="flex items-center space-x-4 mb-6">
        <div className="p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-md">
          <Icon className="w-6 h-6 text-white" />
        </div>
        <div>
          <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>{title}</h2>
          <p className={`${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{description}</p>
        </div>
      </div>
      <div className="space-y-6">
        {children}
      </div>
    </div>
  );
};

const Settings = () => {
  const { darkMode, toggleDarkMode } = useTheme();
  const [notifications, setNotifications] = useState({
    email: true,
    sms: true,
    push: true,
    appointments: true,
    updates: false,
    reminders: true,
    reports: true
  });
  const [language, setLanguage] = useState('en');
  const [timeZone, setTimeZone] = useState('UTC');
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [saveStatus, setSaveStatus] = useState('');
  const [profileImage, setProfileImage] = useState(null);

  const [formData, setFormData] = useState({
    firstName: 'John',
    lastName: 'Smith',
    email: 'john.smith@hospital.com',
    phone: '+1 (555) 123-4567',
    specialty: 'Emergency Medicine',
    department: 'Emergency',
    address: '123 Medical Center Dr',
    city: 'San Francisco',
    state: 'CA',
    zip: '94143',
    bio: 'Experienced emergency medicine physician with over 10 years of practice.',
    languages: ['English', 'Spanish'],
    availability: {
      monday: true,
      tuesday: true,
      wednesday: true,
      thursday: true,
      friday: true,
      saturday: false,
      sunday: false
    }
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    setSaveStatus('unsaved');
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
        setSaveStatus('unsaved');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    setSaveStatus('saving');
    // Simulate API call
    setTimeout(() => {
      setSaveStatus('saved');
      setTimeout(() => setSaveStatus(''), 2000);
    }, 1000);
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-50'} p-6 transition-colors duration-300`}>
      <div className="max-w-5xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mb-8 relative"
        >
          <h1 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            Settings
          </h1>
          <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'} mt-2`}>
            Manage your account settings and preferences
          </p>
          
          {saveStatus && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`absolute right-0 top-0 px-4 py-2 rounded-lg flex items-center space-x-2 ${
                saveStatus === 'saved' 
                  ? darkMode ? 'bg-green-900 text-green-100' : 'bg-green-100 text-green-800'
                  : saveStatus === 'saving' 
                  ? darkMode ? 'bg-blue-900 text-blue-100' : 'bg-blue-100 text-blue-800'
                  : darkMode ? 'bg-yellow-900 text-yellow-100' : 'bg-yellow-100 text-yellow-800'
              }`}
            >
              {saveStatus === 'saved' && <FiCheck />}
              {saveStatus === 'saving' && <div className="animate-spin rounded-full h-4 w-4 border-2 border-b-transparent" />}
              {saveStatus === 'unsaved' && <FiAlertCircle />}
              <span className="text-sm font-medium">
                {saveStatus === 'saved' ? 'Changes saved' :
                 saveStatus === 'saving' ? 'Saving...' :
                 'Unsaved changes'}
              </span>
            </motion.div>
          )}
        </motion.div>

        {/* Profile Settings */}
        <SettingsSection 
          icon={FiUser} 
          title="Profile Settings" 
          description="Manage your personal information"
        >
          <div className="mb-6 flex items-center justify-center">
            <div className="relative group">
              <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-lg">
                <img 
                  src={profileImage || 'https://via.placeholder.com/200'} 
                  alt="Profile" 
                  className="w-full h-full object-cover"
                />
              </div>
              <label className="absolute bottom-0 right-0 bg-blue-500 p-2 rounded-full shadow-lg cursor-pointer hover:bg-blue-600 transition-colors duration-200">
                <FiCamera className="text-white w-5 h-5" />
                <input 
                  type="file" 
                  className="hidden" 
                  accept="image/*"
                  onChange={handleImageUpload}
                />
              </label>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputField
              label="First Name"
              icon={FiUser}
              value={formData.firstName}
              onChange={(value) => handleInputChange('firstName', value)}
            />
            <InputField
              label="Last Name"
              icon={FiUser}
              value={formData.lastName}
              onChange={(value) => handleInputChange('lastName', value)}
            />
            <InputField
              label="Email"
              icon={FiMail}
              value={formData.email}
              onChange={(value) => handleInputChange('email', value)}
              type="email"
            />
            <InputField
              label="Phone"
              icon={FiPhone}
              value={formData.phone}
              onChange={(value) => handleInputChange('phone', value)}
            />
            <InputField
              label="Specialty"
              icon={FiActivity}
              value={formData.specialty}
              onChange={(value) => handleInputChange('specialty', value)}
            />
            <InputField
              label="Department"
              icon={FiGrid}
              value={formData.department}
              onChange={(value) => handleInputChange('department', value)}
            />
          </div>
        </SettingsSection>

        {/* Appearance Settings */}
        <SettingsSection
          icon={FiMonitor}
          title="Appearance"
          description="Customize your interface preferences"
        >
          <div className={`flex items-center justify-between p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
            <div className="flex items-center space-x-4">
              {darkMode ? <FiMoon className="w-6 h-6 text-blue-400" /> : <FiSun className="w-6 h-6 text-yellow-400" />}
              <div>
                <h3 className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>Dark Mode</h3>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  {darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
                </p>
              </div>
            </div>
            <ToggleSwitch enabled={darkMode} onChange={toggleDarkMode} />
          </div>
        </SettingsSection>

        {/* Save Button */}
        <div className="flex justify-end mt-6">
          <button
            onClick={handleSave}
            disabled={saveStatus === 'saving'}
            className={`flex items-center space-x-2 px-6 py-3 rounded-lg shadow-lg 
              ${saveStatus === 'saving'
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700'
              } text-white font-medium transition-all duration-200`}
          >
            {saveStatus === 'saving' ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-2 border-b-transparent" />
                <span>Saving...</span>
              </>
            ) : (
              <>
                <FiSave className="w-5 h-5" />
                <span>Save Changes</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
