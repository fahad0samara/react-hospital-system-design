import React, { useState } from 'react';
import { useEmergency } from '../../context/EmergencyContext';
import { FiAlertTriangle, FiClock, FiCheckCircle, FiUser, FiActivity, FiHeart, FiThermometer, FiBell, FiMessageSquare } from 'react-icons/fi';

const AdminDashboard = () => {
  const { emergencyCases, activeEmergencies, doctors, assignDoctor } = useEmergency();
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  const getSeverityColor = (severity) => {
    const colors = {
      critical: 'bg-gradient-to-r from-red-600 to-red-700',
      high: 'bg-gradient-to-r from-red-500 to-red-600',
      medium: 'bg-gradient-to-r from-orange-500 to-orange-600',
      low: 'bg-gradient-to-r from-yellow-500 to-yellow-600'
    };
    return colors[severity?.toLowerCase()] || colors.medium;
  };

  const calculateTimeElapsed = (timestamp) => {
    if (!timestamp) return 'Just now';
    const now = new Date();
    const reportTime = new Date(timestamp);
    const diff = now - reportTime;
    const minutes = Math.floor(diff / 60000);
    return minutes < 60 
      ? `${minutes}m ago`
      : `${Math.floor(minutes / 60)}h ${minutes % 60}m ago`;
  };

  // Admin Header
  const AdminHeader = () => (
    <div className="bg-white shadow-sm mb-6 p-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <h1 className="text-2xl font-bold text-gray-800">Emergency Admin Center</h1>
          <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Administrator View</span>
        </div>
      </div>
    </div>
  );

  // Emergency Stats for Admin
  const AdminStats = () => (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      <div className="bg-white rounded-lg shadow-sm p-4">
        <div className="text-sm text-gray-500 mb-1">Total Cases</div>
        <div className="text-2xl font-bold text-gray-800">{emergencyCases.length}</div>
      </div>
      <div className="bg-white rounded-lg shadow-sm p-4">
        <div className="text-sm text-gray-500 mb-1">Unassigned Cases</div>
        <div className="text-2xl font-bold text-red-500">
          {activeEmergencies.filter(e => !e.assignedDoctor).length}
        </div>
      </div>
      <div className="bg-white rounded-lg shadow-sm p-4">
        <div className="text-sm text-gray-500 mb-1">Critical Cases</div>
        <div className="text-2xl font-bold text-orange-500">
          {activeEmergencies.filter(e => e.severityLevel === 'critical').length}
        </div>
      </div>
      <div className="bg-white rounded-lg shadow-sm p-4">
        <div className="text-sm text-gray-500 mb-1">Available Doctors</div>
        <div className="text-2xl font-bold text-green-500">{doctors.length}</div>
      </div>
    </div>
  );

  const handleAssignDoctor = (emergency, doctorId) => {
    const doctor = doctors.find(d => d.id === doctorId);
    if (doctor) {
      assignDoctor(emergency.caseId, doctor);
      setSelectedDoctor(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminHeader />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AdminStats />

        {/* Emergency Cases List */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="px-4 py-3 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-800">Emergency Cases</h2>
          </div>
          
          <div className="divide-y divide-gray-200">
            {activeEmergencies.map((emergency) => (
              <div key={emergency.caseId} className="p-4 hover:bg-gray-50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    {/* Severity Indicator */}
                    <div className={`w-2 h-12 rounded-full ${getSeverityColor(emergency.severityLevel)}`} />
                    
                    {/* Case Info */}
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="font-medium text-gray-900">
                          Case #{emergency.caseId?.split('-')[1]}
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium 
                          ${emergency.severityLevel === 'critical' ? 'bg-red-100 text-red-800' : 
                          emergency.severityLevel === 'high' ? 'bg-orange-100 text-orange-800' : 
                          'bg-yellow-100 text-yellow-800'}`}>
                          {emergency.severityLevel?.toUpperCase()}
                        </span>
                      </div>
                      <div className="text-sm text-gray-500 mt-1">
                        {emergency.patientName} • {emergency.condition}
                      </div>
                      <div className="text-xs text-gray-400 mt-1">
                        Reported {calculateTimeElapsed(emergency.timestamp)}
                      </div>
                    </div>
                  </div>

                  {/* Doctor Assignment */}
                  <div className="flex items-center space-x-4">
                    {emergency.assignedDoctor ? (
                      <div className="flex items-center space-x-2 px-3 py-2 bg-green-50 rounded-lg">
                        <FiUser className="w-4 h-4 text-green-500" />
                        <span className="text-sm text-green-700">
                          Assigned to: {emergency.assignedDoctor.name}
                        </span>
                      </div>
                    ) : (
                      <select
                        className="form-select rounded-lg border-gray-300 text-sm"
                        value={selectedDoctor || ''}
                        onChange={(e) => handleAssignDoctor(emergency, e.target.value)}
                      >
                        <option value="">Assign Doctor</option>
                        {doctors.map(doctor => (
                          <option key={doctor.id} value={doctor.id}>
                            {doctor.name} - {doctor.specialty.join(', ')}
                          </option>
                        ))}
                      </select>
                    )}
                  </div>
                </div>

                {/* Vital Signs */}
                {emergency.vitalSigns && (
                  <div className="mt-3 grid grid-cols-4 gap-4 text-sm text-gray-500">
                    <div className="flex items-center space-x-2">
                      <FiHeart className="w-4 h-4 text-red-500" />
                      <span>HR: {emergency.vitalSigns.heartRate || 'N/A'}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <FiThermometer className="w-4 h-4 text-orange-500" />
                      <span>Temp: {emergency.vitalSigns.temperature || 'N/A'}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <FiActivity className="w-4 h-4 text-blue-500" />
                      <span>BP: {emergency.vitalSigns.bloodPressure || 'N/A'}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <FiActivity className="w-4 h-4 text-purple-500" />
                      <span>O2: {emergency.vitalSigns.oxygenSaturation || 'N/A'}</span>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
