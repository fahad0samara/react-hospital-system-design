import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from '../components/dashboard/Dashboard';
import Patients from '../components/patients/Patients';

const DoctorRoutes = () => {
  return (
    <Routes>
      <Route path="dashboard" element={<Dashboard />} />
      <Route path="patients" element={<Patients />} />
      {/* Redirect to dashboard by default */}
      <Route path="/" element={<Navigate to="dashboard" replace />} />
    </Routes>
  );
};

export default DoctorRoutes;
