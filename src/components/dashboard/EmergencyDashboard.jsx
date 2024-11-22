import React, { useState } from 'react';
import { useEmergency } from '../../context/EmergencyContext';
import { FiAlertTriangle, FiClock, FiCheckCircle, FiUser, FiActivity } from 'react-icons/fi';

const EmergencyDashboard = () => {
  const { emergencyCases, activeEmergencies } = useEmergency();
  const [selectedCase, setSelectedCase] = useState(null);

  const getSeverityColor = (severity) => {
    const colors = {
      critical: 'bg-red-600',
      high: 'bg-orange-500',
      medium: 'bg-yellow-500',
      low: 'bg-green-500'
    };
    return colors[severity?.toLowerCase()] || colors.medium;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm mb-6 p-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold text-gray-800">Emergency Dashboard</h1>
            <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Doctor View</span>
          </div>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Cases</p>
              <p className="text-2xl font-bold text-gray-800">{emergencyCases.length}</p>
            </div>
            <FiActivity className="w-8 h-8 text-blue-500" />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Active Cases</p>
              <p className="text-2xl font-bold text-orange-500">{activeEmergencies.length}</p>
            </div>
            <FiAlertTriangle className="w-8 h-8 text-orange-500" />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Critical Cases</p>
              <p className="text-2xl font-bold text-red-500">
                {activeEmergencies.filter(e => e.severityLevel === 'critical').length}
              </p>
            </div>
            <FiAlertTriangle className="w-8 h-8 text-red-500" />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Average Response Time</p>
              <p className="text-2xl font-bold text-green-500">4.2m</p>
            </div>
            <FiClock className="w-8 h-8 text-green-500" />
          </div>
        </div>
      </div>

      {/* Emergency Cases */}
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
                  </div>
                </div>

                {/* Status */}
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2 px-3 py-2 bg-blue-50 rounded-lg">
                    <FiUser className="w-4 h-4 text-blue-500" />
                    <span className="text-sm text-blue-700">
                      {emergency.assignedDoctor?.name || 'Unassigned'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Vital Signs */}
              {emergency.vitalSigns && (
                <div className="mt-3 grid grid-cols-4 gap-4 text-sm text-gray-500">
                  <div className="flex items-center space-x-2">
                    <FiActivity className="w-4 h-4 text-red-500" />
                    <span>HR: {emergency.vitalSigns.heartRate || 'N/A'}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <FiActivity className="w-4 h-4 text-orange-500" />
                    <span>BP: {emergency.vitalSigns.bloodPressure || 'N/A'}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <FiActivity className="w-4 h-4 text-yellow-500" />
                    <span>Temp: {emergency.vitalSigns.temperature || 'N/A'}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <FiActivity className="w-4 h-4 text-green-500" />
                    <span>O2: {emergency.vitalSigns.oxygenSaturation || 'N/A'}</span>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EmergencyDashboard;
