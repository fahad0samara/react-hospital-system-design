import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './app/store';
import DoctorLayout from './components/doctor/DoctorLayout';
import { EmergencyProvider } from './context/EmergencyContext';
import DoctorDashboard from './components/dashboard/DoctorDashboard';
import DoctorReports from './components/reports/DoctorReports';
import Patients from './components/patients/Patients';
import Documents from './components/documents/Documents';
import Analytics from './components/analytics/Analytics';
import Settings from './components/settings/Settings';

// Doctor Routes Component
const DoctorRoutes = () => (
  <DoctorLayout>
    <Routes>
      <Route path="dashboard" element={<DoctorDashboard />} />
      <Route path="analytics" element={<Analytics />} />
      <Route path="patients" element={<Patients />} />
      <Route path="documents" element={<Documents />} />
      <Route path="reports" element={<DoctorReports />} />
      <Route path="settings" element={<Settings />} />
      <Route path="*" element={<Navigate to="dashboard" replace />} />
    </Routes>
  </DoctorLayout>
);



function App() {

  return (
    <Provider store={store}>
      <EmergencyProvider>
        <Router>
          <Routes>
            <Route path="/doctor/*" element={<DoctorRoutes />} />
            <Route path="/" element={<Navigate to="/doctor/dashboard" replace />} />
          </Routes>
        </Router>
      </EmergencyProvider>
    </Provider>
  );
}

export default App;
