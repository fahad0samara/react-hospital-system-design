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

const ToggleSwitch = ({ enabled, onChange }) => (
  <button
    onClick={() => onChange(!enabled)}
    className={`relative inline-flex h-7 w-14 items-center rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
      enabled ? 'bg-gradient-to-r from-blue-500 to-blue-600' : 'bg-gray-200'
    }`}
  >
    <span
      className={`inline-block h-5 w-5 transform rounded-full bg-white shadow-lg ring-0 transition-transform duration-300 ease-in-out ${
        enabled ? 'translate-x-8' : 'translate-x-1'
      }`}
    />
  </button>
);

const InputField = ({ label, icon: Icon, value, onChange, type = 'text' }) => (
  <div className="relative group">
    <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
    <div className="mt-1 relative rounded-lg shadow-sm">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Icon className="h-5 w-5 text-gray-400 group-hover:text-blue-500 transition-colors duration-200" />
      </div>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg 
          focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
          hover:border-blue-400 transition-all duration-200
          bg-white shadow-sm text-gray-900"
      />
    </div>
  </div>
);

const SettingsSection = ({ icon: Icon, title, description, children }) => (
  <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
    <div className="flex items-center space-x-4 mb-6">
      <div className="p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-md">
        <Icon className="w-6 h-6 text-white" />
      </div>
      <div>
        <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
        <p className="text-gray-500">{description}</p>
      </div>
    </div>
    <div className="space-y-6">
      {children}
    </div>
  </div>
);

const Settings = () => {
  const [darkMode, setDarkMode] = useState(false);
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

  useEffect(() => {
    // Load user preferences from localStorage or API
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setDarkMode(true);
    }
  }, []);

  useEffect(() => {
    // Save theme preference
    localStorage.setItem('theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  return (
    <div className={`min-h-screen bg-gradient-to-br ${darkMode ? 'from-gray-900 to-gray-800' : 'from-gray-50 to-white'} p-6 transition-colors duration-300`}>
      <div className="max-w-5xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mb-8 relative"
        >
          <h1 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent'}`}>
            Settings
          </h1>
          <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'} mt-2`}>Manage your account settings and preferences</p>
          
          {saveStatus && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`absolute right-0 top-0 px-4 py-2 rounded-lg flex items-center space-x-2 ${
                saveStatus === 'saved' ? 'bg-green-100 text-green-800' :
                saveStatus === 'saving' ? 'bg-blue-100 text-blue-800' :
                'bg-yellow-100 text-yellow-800'
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
              <label className="absolute bottom-0 right-0 bg-blue-500 p-2 rounded-full shadow-lg cursor-pointer group-hover:bg-blue-600 transition-colors duration-200">
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

          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
            <textarea
              value={formData.bio}
              onChange={(e) => handleInputChange('bio', e.target.value)}
              className="w-full h-32 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Tell us about yourself..."
            />
          </div>
        </SettingsSection>

        {/* Availability Settings */}
        <SettingsSection 
          icon={FiCalendar} 
          title="Availability" 
          description="Set your working days"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Object.entries(formData.availability).map(([day, isAvailable]) => (
              <div key={day} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <span className="capitalize">{day}</span>
                <ToggleSwitch 
                  enabled={isAvailable}
                  onChange={(enabled) => handleInputChange('availability', {
                    ...formData.availability,
                    [day]: enabled
                  })}
                />
              </div>
            ))}
          </div>
        </SettingsSection>

        {/* Notification Settings */}
        <SettingsSection 
          icon={FiBell} 
          title="Notification Settings" 
          description="Configure your notification preferences"
        >
          <div className="space-y-6">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <h3 className="font-medium text-gray-800">Email Notifications</h3>
                <p className="text-sm text-gray-500">Receive updates via email</p>
              </div>
              <ToggleSwitch 
                enabled={notifications.email}
                onChange={(enabled) => setNotifications(prev => ({ ...prev, email: enabled }))}
              />
            </div>
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <h3 className="font-medium text-gray-800">SMS Notifications</h3>
                <p className="text-sm text-gray-500">Receive updates via SMS</p>
              </div>
              <ToggleSwitch 
                enabled={notifications.sms}
                onChange={(enabled) => setNotifications(prev => ({ ...prev, sms: enabled }))}
              />
            </div>
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <h3 className="font-medium text-gray-800">Push Notifications</h3>
                <p className="text-sm text-gray-500">Receive push notifications</p>
              </div>
              <ToggleSwitch 
                enabled={notifications.push}
                onChange={(enabled) => setNotifications(prev => ({ ...prev, push: enabled }))}
              />
            </div>
          </div>
        </SettingsSection>

        {/* Security Settings */}
        <SettingsSection 
          icon={FiShield} 
          title="Security Settings" 
          description="Manage your account security"
        >
          <div className="space-y-4">
            <button 
              onClick={() => setShowPasswordModal(true)}
              className="w-full flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <div className="flex items-center space-x-3">
                <FiLock className="w-5 h-5 text-gray-400" />
                <div>
                  <h3 className="font-medium text-gray-800">Change Password</h3>
                  <p className="text-sm text-gray-500">Update your password</p>
                </div>
              </div>
              <FiChevronRight className="w-5 h-5 text-gray-400" />
            </button>

            <button className="w-full flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <div className="flex items-center space-x-3">
                <FiActivity className="w-5 h-5 text-gray-400" />
                <div>
                  <h3 className="font-medium text-gray-800">Login Activity</h3>
                  <p className="text-sm text-gray-500">View recent login activity</p>
                </div>
              </div>
              <FiChevronRight className="w-5 h-5 text-gray-400" />
            </button>
          </div>
        </SettingsSection>

        {/* Appearance Settings */}
        <SettingsSection 
          icon={FiLayout} 
          title="Appearance" 
          description="Customize the look and feel"
        >
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <h3 className="font-medium text-gray-800">Dark Mode</h3>
              <p className="text-sm text-gray-500">Enable dark mode theme</p>
            </div>
            <ToggleSwitch 
              enabled={darkMode}
              onChange={setDarkMode}
            />
          </div>
        </SettingsSection>

        {/* Save Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleSave}
          className="fixed bottom-8 right-8 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-3 rounded-lg shadow-lg flex items-center space-x-2 hover:from-blue-600 hover:to-blue-700 transition-all duration-200"
        >
          <FiSave className="w-5 h-5" />
          <span>Save Changes</span>
        </motion.button>

        {/* Password Change Modal */}
        {showPasswordModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.2 }}
              className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md m-4"
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-gray-800">Change Password</h3>
                <button 
                  onClick={() => setShowPasswordModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
                >
                  <FiX className="w-5 h-5 text-gray-500" />
                </button>
              </div>
              <div className="space-y-4">
                <InputField 
                  label="Current Password"
                  icon={FiLock}
                  type="password"
                  value=""
                  onChange={() => {}}
                />
                <InputField 
                  label="New Password"
                  icon={FiLock}
                  type="password"
                  value=""
                  onChange={() => {}}
                />
                <InputField 
                  label="Confirm Password"
                  icon={FiLock}
                  type="password"
                  value=""
                  onChange={() => {}}
                />
              </div>
              <div className="mt-6 flex justify-end space-x-3">
                <button 
                  onClick={() => setShowPasswordModal(false)}
                  className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                >
                  Cancel
                </button>
                <button className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 
                  text-white rounded-lg hover:from-blue-600 hover:to-blue-700 
                  transition-all duration-200 shadow-md hover:shadow-lg"
                >
                  Update Password
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Settings;
