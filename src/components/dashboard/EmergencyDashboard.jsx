import React, { useEffect, useState } from 'react';
import { useEmergency } from '../../context/EmergencyContext';
import { FiAlertTriangle, FiClock, FiCheckCircle, FiUser, FiActivity, FiHeart, FiThermometer, FiBell, FiMessageSquare } from 'react-icons/fi';

const EmergencyDashboard = () => {
  const { activeEmergencies, updateEmergencyStatus, assignDoctor } = useEmergency();
  const [notifications, setNotifications] = useState([]);
  const [currentDoctor, setCurrentDoctor] = useState({
    id: 'DR001',
    name: 'Dr. John Doe',
    department: 'Emergency Medicine',
    role: 'Senior Doctor'
  });

  // Notification Badge Component
  const NotificationBadge = ({ count }) => (
    <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
      {count}
    </div>
  );

  // Top Navigation Bar
  const TopNavBar = () => (
    <div className="bg-white shadow-sm mb-6 p-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <h1 className="text-2xl font-bold text-gray-800">Emergency Response Center</h1>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <span className="text-sm text-gray-600">Online</span>
          </div>
        </div>
        <div className="flex items-center space-x-6">
          {/* Notifications */}
          <div className="relative cursor-pointer">
            <FiBell className="w-6 h-6 text-gray-600" />
            {notifications.length > 0 && <NotificationBadge count={notifications.length} />}
          </div>
          {/* Doctor Profile */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
              <span className="text-white font-medium">{currentDoctor.name.split(' ')[1][0]}</span>
            </div>
            <div>
              <div className="font-medium text-gray-800">{currentDoctor.name}</div>
              <div className="text-sm text-gray-500">{currentDoctor.department}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Emergency Stats
  const EmergencyStats = () => (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      <div className="bg-white rounded-lg shadow-sm p-4">
        <div className="text-sm text-gray-500 mb-1">Active Cases</div>
        <div className="text-2xl font-bold text-red-500">
          {activeEmergencies?.filter(e => e?.status === 'active')?.length || 0}
        </div>
      </div>
      <div className="bg-white rounded-lg shadow-sm p-4">
        <div className="text-sm text-gray-500 mb-1">Responded</div>
        <div className="text-2xl font-bold text-blue-500">
          {activeEmergencies?.filter(e => e?.status === 'responded')?.length || 0}
        </div>
      </div>
      <div className="bg-white rounded-lg shadow-sm p-4">
        <div className="text-sm text-gray-500 mb-1">Critical Cases</div>
        <div className="text-2xl font-bold text-orange-500">
          {activeEmergencies?.filter(e => e?.severityLevel === 'critical')?.length || 0}
        </div>
      </div>
      <div className="bg-white rounded-lg shadow-sm p-4">
        <div className="text-sm text-gray-500 mb-1">Average Response Time</div>
        <div className="text-2xl font-bold text-green-500">4.2m</div>
      </div>
    </div>
  );

  const getSeverityColor = (severity) => {
    const colors = {
      critical: 'bg-gradient-to-r from-red-600 to-red-700',
      high: 'bg-gradient-to-r from-red-500 to-red-600',
      medium: 'bg-gradient-to-r from-orange-500 to-orange-600',
      low: 'bg-gradient-to-r from-yellow-500 to-yellow-600'
    };
    return colors[severity?.toLowerCase()] || colors.medium;
  };

  const getStatusBadge = (status) => {
    const badges = {
      active: 'bg-red-500 text-white',
      responded: 'bg-blue-500 text-white',
      inProgress: 'bg-yellow-500 text-white',
      resolved: 'bg-green-500 text-white'
    };
    return badges[status] || badges.active;
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

  const handleRespond = (emergency) => {
    updateEmergencyStatus(emergency.caseId, 'responded');
    assignDoctor(emergency.caseId, currentDoctor);
    
    // Add notification for other doctors
    const newNotification = {
      id: Date.now(),
      message: `${currentDoctor.name} has responded to Case #${emergency.caseId.split('-')[1]}`,
      timestamp: new Date().toISOString(),
      type: 'response',
      emergency: emergency
    };
    setNotifications(prev => [newNotification, ...prev]);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <TopNavBar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <EmergencyStats />

        {/* Emergency Cases Grid */}
        {!activeEmergencies || activeEmergencies.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-xl shadow-sm">
            <FiCheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No Active Emergency Cases</h3>
            <p className="text-gray-500">All emergency cases have been resolved</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {activeEmergencies.map((emergency) => (
              <div
                key={emergency.caseId}
                className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-shadow"
              >
                {/* Emergency Header */}
                <div className={`${getSeverityColor(emergency.severityLevel)} p-4 text-white`}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <FiAlertTriangle className="w-5 h-5" />
                      <span className="font-semibold">
                        Case #{emergency.caseId?.split('-')[1] || 'NEW'}
                      </span>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusBadge(emergency.status)}`}>
                      {emergency.status?.toUpperCase() || 'ACTIVE'}
                    </span>
                  </div>
                  <div className="text-sm opacity-90">
                    <FiClock className="inline-block mr-1" /> 
                    Reported {calculateTimeElapsed(emergency.timestamp)}
                  </div>
                </div>

                {/* Assigned Doctor */}
                {emergency.assignedDoctor && (
                  <div className="px-4 py-2 bg-blue-50 border-b border-blue-100">
                    <div className="flex items-center space-x-2">
                      <FiUser className="w-4 h-4 text-blue-500" />
                      <span className="text-sm text-blue-700">
                        Assigned to: {emergency.assignedDoctor.name}
                      </span>
                    </div>
                  </div>
                )}

                {/* Patient Info */}
                <div className="p-4 border-b border-gray-100">
                  <div className="flex items-start space-x-3">
                    <FiUser className="w-5 h-5 text-gray-400 mt-1" />
                    <div>
                      <div className="font-medium text-gray-900">{emergency.patientName || 'Unknown Patient'}</div>
                      <div className="text-sm text-gray-500">Age: {emergency.age || 'N/A'}</div>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="p-4">
                  <div className="flex space-x-2">
                    {emergency.status === 'active' && (
                      <button
                        onClick={() => handleRespond(emergency)}
                        className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center space-x-2"
                      >
                        <FiMessageSquare className="w-4 h-4" />
                        <span>Respond Now</span>
                      </button>
                    )}
                    {emergency.status === 'responded' && emergency.assignedDoctor?.id === currentDoctor.id && (
                      <button
                        onClick={() => updateEmergencyStatus(emergency.caseId, 'resolved')}
                        className="flex-1 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                      >
                        Mark Resolved
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default EmergencyDashboard;
