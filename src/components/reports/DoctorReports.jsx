import React, { useState, useEffect } from 'react';
import Reports from '../quick-actions/Reports';
import { FiFileText, FiPieChart, FiUsers, FiCalendar, FiActivity, FiAlertCircle, FiPrinter, FiShare2, FiTrash2 } from 'react-icons/fi';

const DoctorReports = () => {
  const [isReportsModalOpen, setIsReportsModalOpen] = useState(false);
  const [statistics, setStatistics] = useState({
    totalReports: 0,
    pendingReports: 0,
    completedReports: 0,
    monthlyReports: 0
  });

  // Update statistics every 5 seconds to simulate real-time data
  useEffect(() => {
    const updateStatistics = () => {
      setStatistics({
        totalReports: Math.floor(Math.random() * 1000),
        pendingReports: Math.floor(Math.random() * 100),
        completedReports: Math.floor(Math.random() * 900),
        monthlyReports: Math.floor(Math.random() * 50)
      });
    };

    updateStatistics();
    const interval = setInterval(updateStatistics, 5000);

    return () => clearInterval(interval);
  }, []);



  


  return (
    <div className="min-h-screen bg-gray-50 p-6">
  
      <Reports 
        isOpen={isReportsModalOpen} 
        onClose={() => setIsReportsModalOpen(false)} 
      />
    </div>
  );
};

export default DoctorReports;
