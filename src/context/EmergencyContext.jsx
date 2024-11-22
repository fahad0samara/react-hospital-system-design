import React, { createContext, useContext, useState } from 'react';

const EmergencyContext = createContext();

// Sample doctors data (in a real app, this would come from a backend)
const doctors = [
  {
    id: 'DR001',
    name: 'Dr. John Doe',
    department: 'Emergency Medicine',
    role: 'Senior Doctor',
    specialty: ['Emergency Medicine', 'Trauma']
  },
  {
    id: 'DR002',
    name: 'Dr. Sarah Smith',
    department: 'Emergency Medicine',
    role: 'Emergency Physician',
    specialty: ['Emergency Medicine', 'Critical Care']
  },
  {
    id: 'DR003',
    name: 'Dr. Michael Chen',
    department: 'Emergency Medicine',
    role: 'Trauma Surgeon',
    specialty: ['Emergency Medicine', 'Surgery']
  }
];

export const EmergencyProvider = ({ children }) => {
  const [emergencyCases, setEmergencyCases] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [currentDoctor, setCurrentDoctor] = useState(doctors[0]); // Default to first doctor

  const addEmergencyCase = (emergencyData) => {
    if (!emergencyData) {
      console.error('No emergency data provided');
      return;
    }

    const newCase = {
      ...emergencyData,
      caseId: emergencyData.caseId || `ER-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
      status: emergencyData.status || 'active',
      timestamp: emergencyData.timestamp || new Date().toISOString(),
      responseTime: null,
      assignedDoctor: null,
      assignedStaff: [],
    };
    
    setEmergencyCases(prev => {
      const updated = [newCase, ...prev];
      console.log('Updated Emergency Cases:', updated);
      
      // Create notification for new case
      const notification = {
        id: Date.now(),
        type: 'new_case',
        message: `New emergency case reported: ${newCase.condition}`,
        timestamp: new Date().toISOString(),
        emergency: newCase
      };
      setNotifications(prev => [notification, ...prev]);
      
      return updated;
    });
  };

  const updateEmergencyStatus = (caseId, status, staffData = null) => {
    if (!caseId) {
      console.error('No case ID provided for status update');
      return;
    }

    setEmergencyCases(prev => prev.map(emergency => {
      if (emergency.caseId === caseId) {
        const updatedCase = {
          ...emergency,
          status,
          ...(staffData && { assignedStaff: [...emergency.assignedStaff, staffData] }),
          ...(status === 'responded' && { responseTime: new Date().toISOString() })
        };

        // Create notification for status update
        const notification = {
          id: Date.now(),
          type: 'status_update',
          message: `Case #${caseId.split('-')[1]} status updated to ${status}`,
          timestamp: new Date().toISOString(),
          emergency: updatedCase
        };
        setNotifications(prev => [notification, ...prev]);

        return updatedCase;
      }
      return emergency;
    }));
  };

  const assignDoctor = (caseId, doctor) => {
    if (!caseId || !doctor) {
      console.error('Missing case ID or doctor information');
      return;
    }

    setEmergencyCases(prev => prev.map(emergency => {
      if (emergency.caseId === caseId) {
        const updatedCase = {
          ...emergency,
          assignedDoctor: doctor,
          status: 'responded'
        };

        // Create notification for doctor assignment
        const notification = {
          id: Date.now(),
          type: 'doctor_assigned',
          message: `${doctor.name} assigned to case #${caseId.split('-')[1]}`,
          timestamp: new Date().toISOString(),
          emergency: updatedCase
        };
        setNotifications(prev => [notification, ...prev]);

        return updatedCase;
      }
      return emergency;
    }));
  };

  const getEmergencyById = (caseId) => {
    return emergencyCases.find(emergency => emergency.caseId === caseId);
  };

  const getActiveEmergenciesByPriority = () => {
    return emergencyCases
      .filter(emergency => emergency.status !== 'resolved')
      .sort((a, b) => {
        // Sort by priority (1 is highest)
        const priorityDiff = (a.priority || 999) - (b.priority || 999);
        if (priorityDiff !== 0) return priorityDiff;
        
        // If same priority, sort by timestamp (newest first)
        return new Date(b.timestamp) - new Date(a.timestamp);
      });
  };

  const switchDoctor = (doctorId) => {
    const doctor = doctors.find(d => d.id === doctorId);
    if (doctor) {
      setCurrentDoctor(doctor);
    }
  };

  const clearNotification = (notificationId) => {
    setNotifications(prev => prev.filter(n => n.id !== notificationId));
  };

  const contextValue = {
    emergencyCases,
    activeEmergencies: getActiveEmergenciesByPriority(),
    notifications,
    currentDoctor,
    doctors,
    addEmergencyCase,
    updateEmergencyStatus,
    assignDoctor,
    getEmergencyById,
    switchDoctor,
    clearNotification
  };

  return (
    <EmergencyContext.Provider value={contextValue}>
      {children}
    </EmergencyContext.Provider>
  );
};

export const useEmergency = () => {
  const context = useContext(EmergencyContext);
  if (!context) {
    throw new Error('useEmergency must be used within an EmergencyProvider');
  }
  return context;
};
