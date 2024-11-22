import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './app/store';
import Layout from './components/Layout';
import DoctorLayout from './components/doctor/DoctorLayout';
import { EmergencyProvider } from './context/EmergencyContext';
import DoctorDashboard from './components/dashboard/DoctorDashboard';
import AdminDashboard from './components/dashboard/AdminDashboard';
import EmergencyReports from './components/reports/EmergencyReports';
import DoctorReports from './components/reports/DoctorReports';
import Patients from './components/patients/Patients';
import Documents from './components/documents/Documents';
import { useSelector } from 'react-redux';

// Doctor Routes Component
const DoctorRoutes = () => (
  <DoctorLayout>
    <Routes>
      <Route path="dashboard" element={<DoctorDashboard />} />
      <Route path="emergency" element={<DoctorDashboard />} />
      <Route path="patients" element={<Patients />} />
      <Route path="documents" element={<Documents />} />
      <Route path="reports" element={<DoctorReports />} />
      <Route path="*" element={<Navigate to="dashboard" replace />} />
    </Routes>
  </DoctorLayout>
);

// Admin Routes Component
const AdminRoutes = () => (
  <Layout>
    <Routes>
      <Route path="/emergency" element={<AdminDashboard />} />
      <Route path="/reports" element={<EmergencyReports />} />
      <Route path="*" element={<Navigate to="/admin/emergency" replace />} />
    </Routes>
  </Layout>
);

function App() {
  const { userType } = useSelector((state) => state.auth) || { userType: 'doctor' };

  return (
    <Provider store={store}>
      <EmergencyProvider>
        <Router>
          <Routes>
            <Route path="/doctor/*" element={<DoctorRoutes />} />
            <Route path="/admin/*" element={<AdminRoutes />} />
            <Route path="/" element={<Navigate to="/doctor/dashboard" replace />} />
          </Routes>
        </Router>
      </EmergencyProvider>
    </Provider>
  );
}

export default App;
