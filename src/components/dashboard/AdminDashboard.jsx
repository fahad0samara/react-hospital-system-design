import React, { useState } from 'react';
import { useEmergency } from '../../context/EmergencyContext';
import { FiAlertTriangle, FiClock, FiUser, FiActivity, FiMessageSquare, FiCheckCircle } from 'react-icons/fi';

const AdminDashboard = () => {
  const { emergencyCases, activeEmergencies, doctors, assignDoctor } = useEmergency();
  const [selectedCase, setSelectedCase] = useState(null);
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  const getStatusBadge = (status) => {
    const badges = {
      pending: 'bg-yellow-100 text-yellow-800',
      active: 'bg-blue-100 text-blue-800',
      completed: 'bg-green-100 text-green-800'
    };
    return badges[status] || badges.pending;
  };

  const getSeverityColor = (severity) => {
    const colors = {
      critical: 'bg-red-500',
      high: 'bg-orange-500',
      medium: 'bg-yellow-500',
      low: 'bg-green-500'
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

  const handleAssignDoctor = (emergency, doctorId) => {
    const doctor = doctors.find(d => d.id === doctorId);
    if (doctor) {
      assignDoctor(emergency.caseId, doctor);
      setSelectedDoctor(null);
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Emergency Dashboard</h1>
        <p className="text-gray-500">Hospital Emergency Management System</p>
      </div>

      {/* Statistics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Cases</p>
              <p className="text-2xl font-bold text-blue-600">{emergencyCases.length}</p>
            </div>
            <FiActivity className="w-8 h-8 text-blue-500" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Active Cases</p>
              <p className="text-2xl font-bold text-red-600">{activeEmergencies.length}</p>
            </div>
            <FiAlertTriangle className="w-8 h-8 text-red-500" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Critical Cases</p>
              <p className="text-2xl font-bold text-orange-600">
                {activeEmergencies.filter(e => e.severityLevel === 'critical').length}
              </p>
            </div>
            <FiClock className="w-8 h-8 text-orange-500" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Avg Response Time</p>
              <p className="text-2xl font-bold text-green-600">4.2m</p>
            </div>
            <FiCheckCircle className="w-8 h-8 text-green-500" />
          </div>
        </div>
      </div>

      {/* Emergency Cases */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="px-4 py-3 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-800">Emergency Cases</h3>
        </div>

        <div className="divide-y divide-gray-200">
          {activeEmergencies.length === 0 ? (
            <div className="p-6 text-center">
              <FiCheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No Active Cases</h3>
              <p className="text-gray-500">All emergencies have been handled</p>
            </div>
          ) : (
            activeEmergencies.map((emergency) => (
              <div key={emergency.caseId} className="p-4 hover:bg-gray-50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className={`w-2 h-12 rounded-full ${getSeverityColor(emergency.severityLevel)}`} />
                    
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="font-medium text-gray-900">
                          Case #{emergency.caseId}
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          getStatusBadge(emergency.status)
                        }`}>
                          {emergency.status?.toUpperCase()}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500 mt-1">
                        {emergency.patientName} • {emergency.condition}
                      </p>
                      <p className="text-xs text-gray-400 mt-1">
                        Reported {calculateTimeElapsed(emergency.timestamp)}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
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
                    <button
                      onClick={() => setSelectedCase(emergency)}
                      className="px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors flex items-center space-x-2"
                    >
                      <FiMessageSquare className="w-4 h-4" />
                      <span>Details</span>
                    </button>
                  </div>
                </div>

                {emergency.vitalSigns && (
                  <div className="mt-3 grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm text-gray-500">
                    <div className="flex items-center space-x-2">
                      <FiActivity className="w-4 h-4 text-red-500" />
                      <span>HR: {emergency.vitalSigns.heartRate}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <FiActivity className="w-4 h-4 text-blue-500" />
                      <span>BP: {emergency.vitalSigns.bloodPressure}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <FiActivity className="w-4 h-4 text-yellow-500" />
                      <span>Temp: {emergency.vitalSigns.temperature}°C</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <FiActivity className="w-4 h-4 text-green-500" />
                      <span>O2: {emergency.vitalSigns.oxygenSaturation}%</span>
                    </div>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
