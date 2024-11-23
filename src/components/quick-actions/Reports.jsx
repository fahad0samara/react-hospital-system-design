import React, { useState, useEffect } from 'react';
import {
  FiPlus,
  FiEye,
  FiTrash2,
  FiClock,
  FiPrinter,
  FiShare2,
  FiUser,
  FiActivity,
  FiHeart,
  FiFileText,
  FiGrid,
  FiList,
  FiCalendar,
  FiThermometer,
  FiDroplet,
  FiAlertCircle,
  FiClipboard,
  FiPackage,
  FiEdit3,
  FiFilter,
  FiSearch,
  FiRefreshCw,
  FiDownload,
  FiArchive,
  FiStar
} from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

const formatTimeAgo = (dateString) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffInMinutes = Math.floor((now - date) / (1000 * 60));

  if (diffInMinutes < 1) return 'Just now';
  if (diffInMinutes < 60) return `${diffInMinutes} minutes ago`;
  if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)} hours ago`;
  return `${Math.floor(diffInMinutes / 1440)} days ago`;
};

const Reports = () => {
  const [reports, setReports] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedReport, setSelectedReport] = useState(null);
  const [newReport, setNewReport] = useState({
    patientName: '',
    patientId: '',
    diagnosis: '',
    treatmentPlan: '',
    medications: '',
    additionalNotes: '',
    date: '',
    status: 'New',
    priority: 'Medium',
    appointmentDate: '',
    bloodType: '',
    allergies: '',
    symptoms: '',
    vitalSigns: {
      bloodPressure: '',
      heartRate: '',
      temperature: '',
      oxygenLevel: ''
    }
  });
  const [viewMode, setViewMode] = useState('card'); // 'card' or 'table'

  // Load reports from localStorage on component mount
  useEffect(() => {
    const storedReports = localStorage.getItem('medicalReports');
    if (storedReports) {
      setReports(JSON.parse(storedReports));
    }
  }, []);

  const handleGenerateReport = () => {
    if (!newReport.patientName || !newReport.diagnosis) {
      alert('Please fill in patient name and diagnosis');
      return;
    }

    const reportToAdd = {
      ...newReport,
      id: Date.now().toString(),
      date: new Date().toISOString(),
      status: 'New'
    };

    setReports(prevReports => [reportToAdd, ...prevReports]);
    localStorage.setItem('medicalReports', JSON.stringify([reportToAdd, ...reports]));

    // Reset form and close modal
    setNewReport({
      patientName: '',
      patientId: '',
      diagnosis: '',
      treatmentPlan: '',
      medications: '',
      additionalNotes: '',
      date: '',
      status: 'New',
      priority: 'Medium',
      appointmentDate: '',
      bloodType: '',
      allergies: '',
      symptoms: '',
      vitalSigns: {
        bloodPressure: '',
        heartRate: '',
        temperature: '',
        oxygenLevel: ''
      }
    });
    setIsModalOpen(false);
  };

  const handleDeleteReport = (id) => {
    const updatedReports = reports.filter(report => report.id !== id);
    setReports(updatedReports);
    localStorage.setItem('medicalReports', JSON.stringify(updatedReports));
  };

  const handleViewReport = (report) => {
    setSelectedReport(report);
    setIsViewModalOpen(true);
  };

  const formSections = [
    {
      title: "Patient Information",
      icon: FiUser,
      color: "blue",
      fields: [
        { name: "patientName", label: "Patient Name", required: true },
        { name: "patientId", label: "Patient ID" },
        { name: "bloodType", label: "Blood Type" },
        { name: "allergies", label: "Allergies" }
      ]
    },
    {
      title: "Medical Details",
      icon: FiActivity,
      color: "purple",
      fields: [
        { name: "diagnosis", label: "Diagnosis", required: true },
        { name: "symptoms", label: "Symptoms" },
        { name: "treatmentPlan", label: "Treatment Plan" },
        { name: "medications", label: "Medications" }
      ]
    },
    {
      title: "Vital Signs",
      icon: FiHeart,
      color: "red",
      fields: [
        { name: "vitalSigns.bloodPressure", label: "Blood Pressure" },
        { name: "vitalSigns.heartRate", label: "Heart Rate" },
        { name: "vitalSigns.temperature", label: "Temperature" },
        { name: "vitalSigns.oxygenLevel", label: "Oxygen Level" }
      ]
    }
  ];

  const renderReportForm = () => (
    <div className="space-y-6">
      {formSections.map((section) => (
        <div key={section.title} className="bg-gray-50 rounded-xl p-6">
          <div className="flex items-center mb-4">
            <span className={`p-2 rounded-lg bg-${section.color}-100 text-${section.color}-600`}>
              <section.icon className="w-5 h-5" />
            </span>
            <h3 className="ml-3 font-semibold text-gray-800">{section.title}</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {section.fields.map((field) => (
              <div key={field.name}>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {field.label}
                  {field.required && <span className="text-red-500 ml-1">*</span>}
                </label>
                <input
                  type="text"
                  value={field.name.includes('.') 
                    ? newReport.vitalSigns[field.name.split('.')[1]]
                    : newReport[field.name]
                  }
                  onChange={(e) => {
                    if (field.name.includes('.')) {
                      const [parent, child] = field.name.split('.');
                      setNewReport(prev => ({
                        ...prev,
                        [parent]: {
                          ...prev[parent],
                          [child]: e.target.value
                        }
                      }));
                    } else {
                      setNewReport(prev => ({
                        ...prev,
                        [field.name]: e.target.value
                      }));
                    }
                  }}
                  className="w-full px-4 py-2 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-colors bg-white hover:border-gray-300"
                  placeholder={`Enter ${field.label.toLowerCase()}`}
                />
              </div>
            ))}
          </div>
        </div>
      ))}

      <div className="bg-gray-50 rounded-xl p-6">
        <div className="flex items-center mb-4">
          <span className="p-2 rounded-lg bg-green-100 text-green-600">
            <FiFileText className="w-5 h-5" />
          </span>
          <h3 className="ml-3 font-semibold text-gray-800">Additional Information</h3>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Priority Level
            </label>
            <select
              value={newReport.priority}
              onChange={(e) => setNewReport(prev => ({ ...prev, priority: e.target.value }))}
              className="w-full px-4 py-2 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-colors bg-white"
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
              <option value="Urgent">Urgent</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Appointment Date
            </label>
            <input
              type="datetime-local"
              value={newReport.appointmentDate}
              onChange={(e) => setNewReport(prev => ({ ...prev, appointmentDate: e.target.value }))}
              className="w-full px-4 py-2 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-colors bg-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Additional Notes
            </label>
            <textarea
              value={newReport.additionalNotes}
              onChange={(e) => setNewReport(prev => ({ ...prev, additionalNotes: e.target.value }))}
              rows="4"
              className="w-full px-4 py-2 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-colors bg-white resize-none"
              placeholder="Enter any additional notes or observations"
            />
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto p-6">
        {/* Header Section */}


        {/* Quick Actions Section */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center text-gray-800">
            <FiPlus className="mr-2 text-blue-500" /> Quick Actions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <motion.div
              whileHover={{ scale: 1.02 }}
              onClick={() => setIsModalOpen(true)}
              className="p-6 rounded-xl bg-gradient-to-r from-blue-50 to-blue-100 hover:from-blue-100 hover:to-blue-200 cursor-pointer group transition-all"
            >
              <div className="flex items-center mb-2">
                <span className="p-2 rounded-lg bg-blue-500 text-white group-hover:bg-blue-600 transition-colors">
                  <FiPlus className="w-6 h-6" />
                </span>
                <h3 className="ml-3 font-semibold text-gray-800">Report Generation</h3>
              </div>
              <p className="text-gray-600 text-sm">Create new reports or access existing ones</p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              onClick={() => setIsViewModalOpen(true)}
              className="p-6 rounded-xl bg-gradient-to-r from-purple-50 to-purple-100 hover:from-purple-100 hover:to-purple-200 cursor-pointer group transition-all"
            >
              <div className="flex items-center mb-2">
                <span className="p-2 rounded-lg bg-purple-500 text-white group-hover:bg-purple-600 transition-colors">
                  <FiEye className="w-6 h-6" />
                </span>
                <h3 className="ml-3 font-semibold text-gray-800">View Reports</h3>
              </div>
              <p className="text-gray-600 text-sm">Access and manage existing reports</p>
            </motion.div>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-white p-6 rounded-xl shadow-md"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-gray-500 text-sm">Total Reports</h3>
              <span className="text-blue-500 bg-blue-100 p-2 rounded-lg">
                <FiClock className="w-5 h-5" />
              </span>
            </div>
            <p className="text-2xl font-bold mt-2">{reports.length}</p>
          </motion.div>
          
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-white p-6 rounded-xl shadow-md"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-gray-500 text-sm">New Reports</h3>
              <span className="text-green-500 bg-green-100 p-2 rounded-lg">
                <FiPlus className="w-5 h-5" />
              </span>
            </div>
            <p className="text-2xl font-bold mt-2">
              {reports.filter(r => r.status === 'New').length}
            </p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-white p-6 rounded-xl shadow-md"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-gray-500 text-sm">Recent Activity</h3>
              <span className="text-purple-500 bg-purple-100 p-2 rounded-lg">
                <FiEye className="w-5 h-5" />
              </span>
            </div>
            <p className="text-2xl font-bold mt-2">
              {reports.filter(r => {
                const date = new Date(r.date);
                const now = new Date();
                return (now - date) / (1000 * 60 * 60 * 24) <= 7;
              }).length}
            </p>
          </motion.div>
        </div>

        {/* Reports Section */}
        <div className="bg-gradient-to-br from-white to-blue-50 rounded-xl shadow-lg p-6 mb-6 border border-blue-100 relative overflow-hidden">
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full transform translate-x-32 -translate-y-32 opacity-20"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-purple-100 to-purple-200 rounded-full transform -translate-x-24 translate-y-24 opacity-20"></div>

          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 space-y-4 lg:space-y-0 relative">
            <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
              <h2 className="text-2xl font-bold flex items-center text-gray-800 bg-white px-4 py-2 rounded-lg shadow-sm relative group">
                <span className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-600 opacity-0 group-hover:opacity-100 rounded-lg transition-all duration-300"></span>
                <FiFileText className="mr-2 text-blue-500 group-hover:text-white relative z-10 transition-colors duration-300" />
                <span className="relative z-10 group-hover:text-white transition-colors duration-300">Medical Reports</span>
              </h2>
              <div className="flex items-center space-x-2 text-sm bg-green-50 px-3 py-1.5 rounded-full text-green-600 font-medium hover:bg-green-100 transition-colors duration-200 cursor-pointer group">
                <FiActivity className="text-green-500 group-hover:animate-pulse" />
                <span>{reports.length} Total Reports</span>
              </div>
            </div>
            
            <div className="flex flex-wrap items-center gap-3">
              {/* Search and Filter */}
              <div className="relative flex-grow sm:flex-grow-0 group">
                <input
                  type="text"
                  placeholder="Search reports..."
                  className="w-full sm:w-auto pl-9 pr-4 py-2.5 rounded-lg border border-blue-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all duration-200 bg-white shadow-sm group-hover:border-blue-400"
                />
                <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-400 group-hover:text-blue-500 transition-colors duration-200" />
              </div>
              
              <div className="flex items-center space-x-2">
                <button className="p-2.5 text-blue-600 hover:text-white bg-blue-50 hover:bg-blue-600 rounded-lg transition-all duration-200 shadow-sm border border-blue-100 hover:border-transparent hover:scale-105 hover:rotate-12">
                  <FiFilter className="w-5 h-5" />
                </button>
                
                <button className="p-2.5 text-blue-600 hover:text-white bg-blue-50 hover:bg-blue-600 rounded-lg transition-all duration-200 shadow-sm border border-blue-100 hover:border-transparent hover:scale-105 hover:-rotate-12">
                  <FiRefreshCw className="w-5 h-5" />
                </button>
              </div>

              {/* View Toggle */}
              <div className="flex items-center bg-gradient-to-r from-blue-100 to-blue-200 rounded-lg p-1.5 shadow-sm relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-500 opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                <button
                  onClick={() => setViewMode('card')}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 ${
                    viewMode === 'card'
                      ? 'bg-white text-blue-600 shadow-md transform scale-105'
                      : 'text-blue-600 hover:text-blue-800 hover:bg-white hover:bg-opacity-50'
                  }`}
                >
                  <div className="flex items-center">
                    <FiGrid className={`w-4 h-4 mr-2 ${viewMode === 'card' ? 'animate-bounce' : ''}`} />
                    Cards
                  </div>
                </button>
                <button
                  onClick={() => setViewMode('table')}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 ${
                    viewMode === 'table'
                      ? 'bg-white text-blue-600 shadow-md transform scale-105'
                      : 'text-blue-600 hover:text-blue-800 hover:bg-white hover:bg-opacity-50'
                  }`}
                >
                  <div className="flex items-center">
                    <FiList className={`w-4 h-4 mr-2 ${viewMode === 'table' ? 'animate-bounce' : ''}`} />
                    Table
                  </div>
                </button>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {/* Total Patients */}
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-5 flex items-center space-x-4 transform hover:scale-105 transition-all duration-300 shadow-sm hover:shadow-md border border-blue-100 group relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-200 to-blue-300 opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
              <div className="bg-white bg-opacity-80 rounded-full p-3 shadow-sm group-hover:rotate-12 transition-transform duration-300">
                <FiUser className="w-7 h-7 text-blue-600 group-hover:animate-bounce" />
              </div>
              <div className="relative">
                <p className="text-sm text-blue-600 font-medium group-hover:translate-x-2 transition-transform duration-300">Total Patients</p>
                <p className="text-3xl font-bold text-blue-700">{reports.length}</p>
              </div>
            </div>

            {/* Active Cases */}
            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-5 flex items-center space-x-4 transform hover:scale-105 transition-all duration-300 shadow-sm hover:shadow-md border border-green-100 group relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-green-200 to-green-300 opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
              <div className="bg-white bg-opacity-80 rounded-full p-3 shadow-sm group-hover:rotate-12 transition-transform duration-300">
                <FiActivity className="w-7 h-7 text-green-600 group-hover:animate-pulse" />
              </div>
              <div className="relative">
                <p className="text-sm text-green-600 font-medium group-hover:translate-x-2 transition-transform duration-300">Active Cases</p>
                <p className="text-3xl font-bold text-green-700">
                  {reports.filter(r => r.status === 'Active').length}
                </p>
              </div>
            </div>

            {/* Today's Reports */}
            <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-xl p-5 flex items-center space-x-4 transform hover:scale-105 transition-all duration-300 shadow-sm hover:shadow-md border border-yellow-100 group relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-200 to-yellow-300 opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
              <div className="bg-white bg-opacity-80 rounded-full p-3 shadow-sm group-hover:rotate-12 transition-transform duration-300">
                <FiCalendar className="w-7 h-7 text-yellow-600 group-hover:animate-bounce" />
              </div>
              <div className="relative">
                <p className="text-sm text-yellow-600 font-medium group-hover:translate-x-2 transition-transform duration-300">Today's Reports</p>
                <p className="text-3xl font-bold text-yellow-700">
                  {reports.filter(r => new Date(r.date).toDateString() === new Date().toDateString()).length}
                </p>
              </div>
            </div>

            {/* High Priority */}
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-5 flex items-center space-x-4 transform hover:scale-105 transition-all duration-300 shadow-sm hover:shadow-md border border-purple-100 group relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-200 to-purple-300 opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
              <div className="bg-white bg-opacity-80 rounded-full p-3 shadow-sm group-hover:rotate-12 transition-transform duration-300">
                <FiStar className="w-7 h-7 text-purple-600 group-hover:animate-spin" />
              </div>
              <div className="relative">
                <p className="text-sm text-purple-600 font-medium group-hover:translate-x-2 transition-transform duration-300">High Priority</p>
                <p className="text-3xl font-bold text-purple-700">
                  {reports.filter(r => r.priority === 'High' || r.priority === 'Urgent').length}
                </p>
              </div>
            </div>
          </div>

          {/* Reports Content */}
          <div className="space-y-4">
            {reports.length === 0 ? (
              <div className="text-center py-12">
                <FiFileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No Reports Found</h3>
                <p className="text-gray-500">Start by creating a new medical report.</p>
              </div>
            ) : viewMode === 'table' ? (
              // Table View
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        <div className="flex items-center space-x-1">
                          <FiUser className="w-4 h-4" />
                          <span>Patient</span>
                        </div>
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        <div className="flex items-center space-x-1">
                          <FiPackage className="w-4 h-4" />
                          <span>ID</span>
                        </div>
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        <div className="flex items-center space-x-1">
                          <FiAlertCircle className="w-4 h-4" />
                          <span>Priority</span>
                        </div>
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        <div className="flex items-center space-x-1">
                          <FiClipboard className="w-4 h-4" />
                          <span>Diagnosis</span>
                        </div>
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        <div className="flex items-center space-x-1">
                          <FiCalendar className="w-4 h-4" />
                          <span>Date</span>
                        </div>
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        <div className="flex items-center space-x-1">
                          <FiActivity className="w-4 h-4" />
                          <span>Actions</span>
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {reports.map((report) => (
                      <tr key={report.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{report.patientName}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500">{report.patientId}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            {
                              'Low': 'bg-gray-100 text-gray-800',
                              'Medium': 'bg-blue-100 text-blue-800',
                              'High': 'bg-orange-100 text-orange-800',
                              'Urgent': 'bg-red-100 text-red-800'
                            }[report.priority]
                          }`}>
                            {report.priority}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-900 max-w-xs truncate">
                            {report.diagnosis}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500">{formatTimeAgo(report.date)}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex space-x-2">
                            <button
                              onClick={() => window.print()}
                              className="text-gray-600 hover:text-blue-600"
                              title="Print Report"
                            >
                              <FiPrinter className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => {
                                navigator.clipboard.writeText(
                                  `Medical Report - ${report.patientName}\n` +
                                  `Patient ID: ${report.patientId}\n` +
                                  `Diagnosis: ${report.diagnosis}\n` +
                                  `Treatment Plan: ${report.treatmentPlan}\n` +
                                  `Medications: ${report.medications}\n` +
                                  `Notes: ${report.additionalNotes}`
                                );
                                alert('Report copied to clipboard!');
                              }}
                              className="text-gray-600 hover:text-green-600"
                              title="Share Report"
                            >
                              <FiShare2 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteReport(report.id)}
                              className="text-gray-600 hover:text-red-600"
                              title="Delete Report"
                            >
                              <FiTrash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              // Card View
              <div className="space-y-6">
                {reports.map((report) => (
                  <div
                    key={report.id}
                    className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-200"
                  >
                    {/* Report Header */}
                    <div className="p-6 border-b border-gray-100">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3">
                            <h3 className="text-xl font-semibold text-gray-900">{report.patientName}</h3>
                            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                              {
                                'Low': 'bg-gray-100 text-gray-800',
                                'Medium': 'bg-blue-100 text-blue-800',
                                'High': 'bg-orange-100 text-orange-800',
                                'Urgent': 'bg-red-100 text-red-800'
                              }[report.priority]
                            }`}>
                              {report.priority} Priority
                            </span>
                          </div>
                          <div className="mt-2 space-y-1">
                            <p className="text-gray-600 flex items-center">
                              <span className="font-medium mr-2">ID:</span> {report.patientId}
                            </p>
                            <p className="text-gray-500 text-sm flex items-center">
                              <FiClock className="w-4 h-4 mr-1" />
                              {formatTimeAgo(report.date)}
                            </p>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <button
                            onClick={() => window.print()}
                            className="p-2 text-gray-600 hover:text-blue-600 rounded-lg transition-colors"
                            title="Print Report"
                          >
                            <FiPrinter className="w-5 h-5" />
                          </button>
                          <button
                            onClick={() => {
                              navigator.clipboard.writeText(
                                `Medical Report - ${report.patientName}\n` +
                                `Patient ID: ${report.patientId}\n` +
                                `Diagnosis: ${report.diagnosis}\n` +
                                `Treatment Plan: ${report.treatmentPlan}\n` +
                                `Medications: ${report.medications}\n` +
                                `Notes: ${report.additionalNotes}`
                              );
                              alert('Report copied to clipboard!');
                            }}
                            className="p-2 text-gray-600 hover:text-green-600 rounded-lg transition-colors"
                            title="Share Report"
                          >
                            <FiShare2 className="w-5 h-5" />
                          </button>
                          <button
                            onClick={() => handleDeleteReport(report.id)}
                            className="p-2 text-gray-600 hover:text-red-600 rounded-lg transition-colors"
                            title="Delete Report"
                          >
                            <FiTrash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Report Content */}
                    <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Left Column */}
                      <div className="space-y-6">
                        {/* Diagnosis & Treatment */}
                        <div className="bg-blue-50 rounded-lg p-4">
                          <h4 className="font-medium text-blue-800 mb-3 flex items-center">
                            <FiClipboard className="w-4 h-4 mr-2" />
                            Diagnosis & Treatment
                          </h4>
                          <div className="space-y-4">
                            <div>
                              <p className="text-sm font-medium text-gray-600">Diagnosis</p>
                              <p className="mt-1 text-gray-800">{report.diagnosis || 'Not specified'}</p>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-600">Treatment Plan</p>
                              <p className="mt-1 text-gray-800">{report.treatmentPlan || 'Not specified'}</p>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-600">Medications</p>
                              <p className="mt-1 text-gray-800">{report.medications || 'None prescribed'}</p>
                            </div>
                          </div>
                        </div>

                        {/* Vital Signs */}
                        <div className="bg-purple-50 rounded-lg p-4">
                          <h4 className="font-medium text-purple-800 mb-3 flex items-center">
                            <FiActivity className="w-4 h-4 mr-2" />
                            Vital Signs
                          </h4>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <p className="text-sm font-medium text-gray-600">Blood Pressure</p>
                              <p className="mt-1 text-gray-800">{report.vitalSigns?.bloodPressure || 'Not recorded'}</p>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-600">Heart Rate</p>
                              <p className="mt-1 text-gray-800">{report.vitalSigns?.heartRate || 'Not recorded'}</p>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-600">Temperature</p>
                              <p className="mt-1 text-gray-800">{report.vitalSigns?.temperature || 'Not recorded'}</p>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-600">Oxygen Level</p>
                              <p className="mt-1 text-gray-800">{report.vitalSigns?.oxygenLevel || 'Not recorded'}</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Right Column */}
                      <div className="space-y-6">
                        {/* Patient Details */}
                        <div className="bg-green-50 rounded-lg p-4">
                          <h4 className="font-medium text-green-800 mb-3 flex items-center">
                            <FiUser className="w-4 h-4 mr-2" />
                            Patient Details
                          </h4>
                          <div className="space-y-4">
                            <div>
                              <p className="text-sm font-medium text-gray-600">Blood Type</p>
                              <p className="mt-1 text-gray-800">{report.bloodType || 'Not specified'}</p>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-600">Allergies</p>
                              <p className="mt-1 text-gray-800">{report.allergies || 'None reported'}</p>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-600">Next Appointment</p>
                              <p className="mt-1 text-gray-800">
                                {report.appointmentDate 
                                  ? new Date(report.appointmentDate).toLocaleString()
                                  : 'Not scheduled'}
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Additional Notes */}
                        <div className="bg-yellow-50 rounded-lg p-4">
                          <h4 className="font-medium text-yellow-800 mb-3 flex items-center">
                            <FiEdit3 className="w-4 h-4 mr-2" />
                            Additional Notes
                          </h4>
                          <p className="text-gray-800 whitespace-pre-wrap">
                            {report.additionalNotes || 'No additional notes'}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Recent Activity Section */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center text-gray-800">
            <FiClock className="mr-2 text-blue-500" /> Recent Activity
          </h2>
          <div className="space-y-4">
            {reports.length === 0 ? (
              <div className="text-center py-8">
                <div className="text-gray-400 mb-2">
                  <FiClock className="w-12 h-12 mx-auto" />
                </div>
                <p className="text-gray-500">No reports generated yet</p>
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="mt-4 text-blue-500 hover:text-blue-600"
                >
                  Generate your first report
                </button>
              </div>
            ) : (
              reports.slice(0, 5).map((report) => (
                <motion.div
                  key={report.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-gray-50 rounded-lg p-4 hover:shadow-md transition-all"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium text-gray-800">{report.patientName}</h3>
                      <p className="text-sm text-gray-500 mt-1">
                        {report.diagnosis}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs text-gray-400">
                        {formatTimeAgo(report.date)}
                      </span>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="text-blue-500 hover:text-blue-600"
                      >
                        <FiEye className="w-4 h-4" />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleDeleteReport(report.id)}
                        className="text-red-500 hover:text-red-600"
                      >
                        <FiTrash2 className="w-4 h-4" />
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </div>

        {/* All Reports Section */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">All Reports</h2>
          {reports.length === 0 ? (
            <div className="text-center py-8">
              <div className="text-gray-400 mb-2">
                <FiClock className="w-12 h-12 mx-auto" />
              </div>
              <p className="text-gray-500">No reports available</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {reports.map((report) => (
                <motion.div
                  key={report.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-gray-50 rounded-lg p-5 hover:bg-gray-100 transition-all"
                >
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-semibold text-gray-800">{report.patientName}</h3>
                      <p className="text-xs text-gray-500">ID: {report.patientId}</p>
                    </div>
                    <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-600">
                      {report.status}
                    </span>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Diagnosis:</span> {report.diagnosis}
                    </p>
                    {report.treatmentPlan && (
                      <p className="text-sm text-gray-600">
                        <span className="font-medium">Treatment:</span> {report.treatmentPlan}
                      </p>
                    )}
                    {report.medications && (
                      <p className="text-sm text-gray-600">
                        <span className="font-medium">Medications:</span> {report.medications}
                      </p>
                    )}
                  </div>
                  <div className="flex justify-between items-center mt-4 pt-3 border-t border-gray-200">
                    <span className="text-xs text-gray-400">{formatTimeAgo(report.date)}</span>
                    <div className="flex space-x-2">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="text-blue-500 hover:text-blue-600 p-1"
                      >
                        <FiEye className="w-4 h-4" />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleDeleteReport(report.id)}
                        className="text-red-500 hover:text-red-600 p-1"
                      >
                        <FiTrash2 className="w-4 h-4" />
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>

        {/* New Report Modal */}
        <AnimatePresence>
          {isModalOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 overflow-y-auto"
              style={{ margin: '0', minHeight: '100vh' }}
              onClick={() => setIsModalOpen(false)}
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.95, opacity: 0, y: 20 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-white rounded-2xl shadow-xl w-full max-w-4xl my-8 relative overflow-hidden"
              >
                <div className="max-h-[85vh] overflow-y-auto">
                  <div className="sticky top-0 bg-white z-10 px-8 py-6 border-b border-gray-100">
                    <button
                      onClick={() => setIsModalOpen(false)}
                      className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                    <h2 className="text-2xl font-bold text-gray-800">Generate Medical Report</h2>
                    <p className="text-gray-500 mt-1">Fill in the patient information below</p>
                  </div>

                  <div className="px-8 py-6">
                    {/* Report Form */}
                    {renderReportForm()}

                    {/* Action Buttons */}
                    <div className="sticky bottom-0 bg-white pt-6 pb-2 mt-8 border-t border-gray-100">
                      <div className="flex justify-end space-x-3">
                        <button
                          onClick={() => setIsModalOpen(false)}
                          className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={handleGenerateReport}
                          className="px-6 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all shadow-md hover:shadow-lg"
                        >
                          Generate Report
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* View Reports Modal */}
        <AnimatePresence>
          {isViewModalOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 overflow-y-auto"
              style={{ margin: '0', minHeight: '100vh' }}
              onClick={() => setIsViewModalOpen(false)}
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.95, opacity: 0, y: 20 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-white rounded-2xl shadow-xl w-full max-w-4xl my-8 relative overflow-hidden"
              >
                <div className="max-h-[85vh] overflow-y-auto">
                  <div className="sticky top-0 bg-white z-10 px-8 py-6 border-b border-gray-100">
                    <div className="flex justify-between items-center">
                      <h2 className="text-2xl font-bold text-gray-800">Medical Reports</h2>
                      <button
                        onClick={() => setIsViewModalOpen(false)}
                        className="p-2 hover:bg-gray-100 rounded-full"
                      >
                        <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  </div>

                  <div className="px-8 py-6">
                    {reports.length === 0 ? (
                      <div className="text-center py-12">
                        <FiFileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 mb-2">No Reports Found</h3>
                        <p className="text-gray-500">Start by creating a new medical report.</p>
                      </div>
                    ) : (
                      reports.map((report) => (
                        <div
                          key={report.id}
                          className="bg-gray-50 rounded-xl p-6 hover:shadow-md transition-all"
                        >
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="text-lg font-semibold text-gray-800">{report.patientName}</h3>
                              <p className="text-gray-600">Patient ID: {report.patientId}</p>
                              <p className="text-sm text-gray-500 mt-1">{formatTimeAgo(report.date)}</p>
                            </div>
                            <div className="flex space-x-3">
                              <button
                                onClick={() => window.print()}
                                className="p-2 text-gray-600 hover:text-blue-600 rounded-lg hover:bg-blue-50"
                                title="Print Report"
                              >
                                <FiPrinter className="w-5 h-5" />
                              </button>
                              <button
                                onClick={() => {
                                  navigator.clipboard.writeText(
                                    `Medical Report - ${report.patientName}\n` +
                                    `Patient ID: ${report.patientId}\n` +
                                    `Diagnosis: ${report.diagnosis}\n` +
                                    `Treatment Plan: ${report.treatmentPlan}\n` +
                                    `Medications: ${report.medications}\n` +
                                    `Notes: ${report.additionalNotes}`
                                  );
                                  alert('Report copied to clipboard!');
                                }}
                                className="p-2 text-gray-600 hover:text-green-600 rounded-lg hover:bg-green-50"
                                title="Share Report"
                              >
                                <FiShare2 className="w-5 h-5" />
                              </button>
                              <button
                                onClick={() => handleDeleteReport(report.id)}
                                className="p-2 text-gray-600 hover:text-red-600 rounded-lg hover:bg-red-50"
                                title="Delete Report"
                              >
                                <FiTrash2 className="w-5 h-5" />
                              </button>
                            </div>
                          </div>
                          <div className="mt-4 space-y-4">
                            {/* Patient Information */}
                            <div className="bg-blue-50 rounded-lg p-4">
                              <h4 className="font-medium text-blue-800 mb-2">Patient Information</h4>
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <p className="text-sm font-medium text-gray-600">Name</p>
                                  <p className="text-gray-800">{report.patientName}</p>
                                </div>
                                <div>
                                  <p className="text-sm font-medium text-gray-600">ID</p>
                                  <p className="text-gray-800">{report.patientId}</p>
                                </div>
                                <div>
                                  <p className="text-sm font-medium text-gray-600">Blood Type</p>
                                  <p className="text-gray-800">{report.bloodType || 'Not specified'}</p>
                                </div>
                                <div>
                                  <p className="text-sm font-medium text-gray-600">Allergies</p>
                                  <p className="text-gray-800">{report.allergies || 'None reported'}</p>
                                </div>
                              </div>
                            </div>

                            {/* Medical Details */}
                            <div className="bg-purple-50 rounded-lg p-4">
                              <h4 className="font-medium text-purple-800 mb-2">Medical Details</h4>
                              <div className="space-y-3">
                                <div>
                                  <p className="text-sm font-medium text-gray-600">Diagnosis</p>
                                  <p className="text-gray-800">{report.diagnosis}</p>
                                </div>
                                <div>
                                  <p className="text-sm font-medium text-gray-600">Symptoms</p>
                                  <p className="text-gray-800">{report.symptoms || 'Not specified'}</p>
                                </div>
                                <div>
                                  <p className="text-sm font-medium text-gray-600">Treatment Plan</p>
                                  <p className="text-gray-800">{report.treatmentPlan || 'Not specified'}</p>
                                </div>
                                <div>
                                  <p className="text-sm font-medium text-gray-600">Medications</p>
                                  <p className="text-gray-800">{report.medications || 'None prescribed'}</p>
                                </div>
                              </div>
                            </div>

                            {/* Vital Signs */}
                            <div className="bg-red-50 rounded-lg p-4">
                              <h4 className="font-medium text-red-800 mb-2">Vital Signs</h4>
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <p className="text-sm font-medium text-gray-600">Blood Pressure</p>
                                  <p className="text-gray-800">{report.vitalSigns?.bloodPressure || 'Not recorded'}</p>
                                </div>
                                <div>
                                  <p className="text-sm font-medium text-gray-600">Heart Rate</p>
                                  <p className="text-gray-800">{report.vitalSigns?.heartRate || 'Not recorded'}</p>
                                </div>
                                <div>
                                  <p className="text-sm font-medium text-gray-600">Temperature</p>
                                  <p className="text-gray-800">{report.vitalSigns?.temperature || 'Not recorded'}</p>
                                </div>
                                <div>
                                  <p className="text-sm font-medium text-gray-600">Oxygen Level</p>
                                  <p className="text-gray-800">{report.vitalSigns?.oxygenLevel || 'Not recorded'}</p>
                                </div>
                              </div>
                            </div>

                            {/* Additional Information */}
                            <div className="bg-green-50 rounded-lg p-4">
                              <h4 className="font-medium text-green-800 mb-2">Additional Information</h4>
                              <div className="space-y-3">
                                <div>
                                  <p className="text-sm font-medium text-gray-600">Priority Level</p>
                                  <span className={`inline-block px-2 py-1 rounded-full text-sm font-medium ${
                                    {
                                      'Low': 'bg-gray-100 text-gray-800',
                                      'Medium': 'bg-blue-100 text-blue-800',
                                      'High': 'bg-orange-100 text-orange-800',
                                      'Urgent': 'bg-red-100 text-red-800'
                                    }[report.priority]
                                  }`}>
                                    {report.priority}
                                  </span>
                                </div>
                                <div>
                                  <p className="text-sm font-medium text-gray-600">Appointment Date</p>
                                  <p className="text-gray-800">
                                    {report.appointmentDate 
                                      ? new Date(report.appointmentDate).toLocaleString()
                                      : 'Not scheduled'}
                                  </p>
                                </div>
                                <div>
                                  <p className="text-sm font-medium text-gray-600">Additional Notes</p>
                                  <p className="text-gray-800">{report.additionalNotes || 'No additional notes'}</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Reports;
