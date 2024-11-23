import React, { useState, useEffect, useMemo } from 'react';
import {
  FiSearch,
  FiUser,
  FiUsers,
  FiUserPlus,
  FiPhone,
  FiMail,
  FiCalendar,
  FiPlus,
  FiMapPin,
  FiGrid,
  FiList,
  FiEdit2,
  FiTrash2,
  FiDownload,
  FiPrinter,
  FiFilter,
  FiEye
} from 'react-icons/fi';
import { useTheme } from '../../context/ThemeContext';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { saveAs } from 'file-saver';



// Modals
import AddPatientModal from './modals/AddPatientModal';
import EditPatientModal from './modals/EditPatientModal';
import ViewPatientModal from './modals/ViewPatientModal';
import ConfirmDeleteModal from './modals/ConfirmDeleteModal';
import MedicalHistoryModal from './modals/MedicalHistoryModal';

// Initial patient data with enhanced medical information
const initialPatients = [];

// Hospital Information
const hospitalInfo = {
  name: "Medical Care Hospital",
  logo: "/hospital-logo.png", // Make sure to add your logo file
  address: "123 Healthcare Avenue, Medical District",
  city: "Medical City, MC 12345",
  phone: "+1 (555) 123-4567",
  email: "contact@medicalcare.com",
  website: "www.medicalcare.com",
  departments: [
    "Cardiology",
    "Neurology",
    "Orthopedics",
    "Pediatrics",
    "Internal Medicine",
  ],
};

// Sample doctors data
const doctors = [
  {
    id: 1,
    name: "Dr. Sarah Johnson",
    specialization: "Cardiologist",
    license: "MC12345",
    contact: "+1 (555) 111-2222",
  },
  {
    id: 2,
    name: "Dr. Michael Chen",
    specialization: "Neurologist",
    license: "MC12346",
    contact: "+1 (555) 111-3333",
  },
  // Add more doctors as needed
];

const Patients = () => {
  const { darkMode } = useTheme();
  const [searchTerm, setSearchTerm] = useState('');
  const [modals, setModals] = useState({
    add: false,
    edit: false,
    delete: false,
    view: false,
    medicalHistory: false,
    appointment: false,
    prescription: false,
    labResults: false,
    insurance: false,
    documents: false,
    filters: false
  });
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [filters, setFilters] = useState({
    gender: '',
    condition: '',
    ageRange: { min: '', max: '' }
  });
  const [patients, setPatients] = useState(() => {
    const savedPatients = localStorage.getItem('patients');
    return savedPatients ? JSON.parse(savedPatients) : initialPatients;
  });
  const [viewMode, setViewMode] = useState(() => {
    return localStorage.getItem('patientViewMode') || 'card';
  });

  const [sortBy, setSortBy] = useState('date');
  const [sortOrder, setSortOrder] = useState('desc');
  const [selectedTags, setSelectedTags] = useState([]);



  // Save patients to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('patients', JSON.stringify(patients));
  }, [patients]);

  // Save view mode to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('patientViewMode', viewMode);
  }, [viewMode]);

  const toggleModal = (modalName, value = null, patient = null) => {
    if (patient) {
      setSelectedPatient(patient);
    }
    setModals(prev => ({
      ...prev,
      [modalName]: value ?? !prev[modalName]
    }));
  };

  const handleAddClick = () => {
    toggleModal('add', true);
  };

  // Handle add patient
  const handleAddPatient = (newPatient) => {
    const patientWithId = {
      ...newPatient,
      id: patients.length + 1,
      registrationDate: new Date().toISOString().split('T')[0]
    };
    setPatients(prevPatients => [...prevPatients, patientWithId]);
    toggleModal('add', false);
  };



  const handleUpdatePatient = (updatedPatient) => {
    setPatients(prevPatients =>
      prevPatients.map(patient =>
        patient.id === updatedPatient.id ? updatedPatient : patient
      )
    );
    toggleModal('edit', false);
  };

  const handleConfirmDelete = () => {
    setPatients(prevPatients =>
      prevPatients.filter(patient => patient.id !== selectedPatient.id)
    );
    toggleModal('delete', false);
  };

  const handleViewDetails = (patient) => {
    toggleModal('view', true, patient);
  };

  const viewRenderers = {
    renderCardView: (patient) => (
      <div className={`p-6 rounded-lg shadow-md transition-all duration-200 hover:shadow-lg ${
        darkMode ? 'bg-gray-800 hover:bg-gray-750' : 'bg-white hover:bg-gray-50'
      }`}>
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center space-x-3">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
              darkMode ? 'bg-gray-700' : 'bg-blue-50'
            }`}>
              <FiUser className={`text-xl ${darkMode ? 'text-blue-400' : 'text-blue-500'}`} />
            </div>
            <div>
              <h3 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                {patient.name}
              </h3>
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                ID: {patient.id}
              </p>
            </div>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => toggleModal('view', true, patient)}
              className={`p-2 rounded-full transition-colors ${
                darkMode 
                  ? 'text-blue-400 hover:bg-gray-700' 
                  : 'text-blue-500 hover:bg-blue-50'
              }`}
              title="View Details"
            >
              <FiEye size={18} />
            </button>
            <button
              onClick={() => toggleModal('edit', true, patient)}
              className={`p-2 rounded-full transition-colors ${
                darkMode 
                  ? 'text-green-400 hover:bg-gray-700' 
                  : 'text-green-500 hover:bg-green-50'
              }`}
              title="Edit Patient"
            >
              <FiEdit2 size={18} />
            </button>
            <button
              onClick={() => toggleModal('delete', true, patient)}
              className={`p-2 rounded-full transition-colors ${
                darkMode 
                  ? 'text-red-400 hover:bg-gray-700' 
                  : 'text-red-500 hover:bg-red-50'
              }`}
              title="Delete Patient"
            >
              <FiTrash2 size={18} />
            </button>
          </div>
        </div>
        <div className={`space-y-3 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
          <div className="grid grid-cols-2 gap-4">
            <p className="flex items-center">
              <FiMail className="mr-2 flex-shrink-0" />
              <span className="truncate">{patient.email}</span>
            </p>
            <p className="flex items-center">
              <FiPhone className="mr-2 flex-shrink-0" />
              <span>{patient.phone}</span>
            </p>
          </div>
          <p className="flex items-center">
            <FiMapPin className="mr-2 flex-shrink-0" />
            <span className="truncate">{patient.address}</span>
          </p>
          <div className="grid grid-cols-3 gap-4 mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
            <div>
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Age</p>
              <p className="font-medium">{patient.age} years</p>
            </div>
            <div>
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Gender</p>
              <p className="font-medium">{patient.gender}</p>
            </div>
            <div>
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Blood Type</p>
              <p className="font-medium">{patient.bloodGroup}</p>
            </div>
          </div>
        </div>
      </div>
    ),

    renderListView: (patient) => (
      <div className={`p-4 border-b transition-colors ${
        darkMode ? 'border-gray-700 hover:bg-gray-750' : 'border-gray-200 hover:bg-gray-50'
      }`}>
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4 flex-1">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
              darkMode ? 'bg-gray-700' : 'bg-blue-50'
            }`}>
              <FiUser className={`text-lg ${darkMode ? 'text-blue-400' : 'text-blue-500'}`} />
            </div>
            <div className="min-w-0 flex-1">
              <h3 className={`text-lg font-semibold truncate ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                {patient.name}
              </h3>
              <div className={`mt-1 grid grid-cols-3 gap-4 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                <p className="flex items-center">
                  <FiMail className="mr-2 flex-shrink-0" />
                  <span className="truncate">{patient.email}</span>
                </p>
                <p className="flex items-center">
                  <FiPhone className="mr-2 flex-shrink-0" />
                  <span>{patient.phone}</span>
                </p>
                <p className="flex items-center">
                  <FiMapPin className="mr-2 flex-shrink-0" />
                  <span className="truncate">{patient.address}</span>
                </p>
              </div>
            </div>
          </div>
          <div className="flex space-x-2 ml-4">
            <button
              onClick={() => toggleModal('view', true, patient)}
              className={`p-2 rounded-full transition-colors ${
                darkMode 
                  ? 'text-blue-400 hover:bg-gray-700' 
                  : 'text-blue-500 hover:bg-blue-50'
              }`}
              title="View Details"
            >
              <FiEye size={18} />
            </button>
            <button
              onClick={() => toggleModal('edit', true, patient)}
              className={`p-2 rounded-full transition-colors ${
                darkMode 
                  ? 'text-green-400 hover:bg-gray-700' 
                  : 'text-green-500 hover:bg-green-50'
              }`}
              title="Edit Patient"
            >
              <FiEdit2 size={18} />
            </button>
            <button
              onClick={() => toggleModal('delete', true, patient)}
              className={`p-2 rounded-full transition-colors ${
                darkMode 
                  ? 'text-red-400 hover:bg-gray-700' 
                  : 'text-red-500 hover:bg-red-50'
              }`}
              title="Delete Patient"
            >
              <FiTrash2 size={18} />
            </button>
          </div>
        </div>
      </div>
    ),

    renderGridView: (patient) => (
      <div className={`p-6 rounded-lg shadow-md transition-all duration-200 hover:shadow-lg ${
        darkMode ? 'bg-gray-800 hover:bg-gray-750' : 'bg-white hover:bg-gray-50'
      }`}>
        <div className="flex flex-col items-center text-center mb-4">
          <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-3 ${
            darkMode ? 'bg-gray-700' : 'bg-blue-50'
          }`}>
            <FiUser className={`text-2xl ${darkMode ? 'text-blue-400' : 'text-blue-500'}`} />
          </div>
          <h3 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            {patient.name}
          </h3>
          <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            ID: {patient.id}
          </p>
        </div>
        
        <div className={`space-y-3 mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
          <p className="flex items-center justify-center">
            <FiMail className="mr-2" />
            <span className="truncate">{patient.email}</span>
          </p>
          <p className="flex items-center justify-center">
            <FiPhone className="mr-2" />
            <span>{patient.phone}</span>
          </p>
        </div>

        <div className="grid grid-cols-2 gap-2 mb-4">
          <div className={`text-center p-2 rounded ${
            darkMode ? 'bg-gray-700' : 'bg-gray-100'
          }`}>
            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Age</p>
            <p className="font-medium">{patient.age}</p>
          </div>
          <div className={`text-center p-2 rounded ${
            darkMode ? 'bg-gray-700' : 'bg-gray-100'
          }`}>
            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Blood</p>
            <p className="font-medium">{patient.bloodGroup}</p>
          </div>
        </div>

        <div className="flex justify-center space-x-2 pt-4 border-t border-gray-200 dark:border-gray-700">
          <button
            onClick={() => toggleModal('view', true, patient)}
            className={`p-2 rounded-full transition-colors ${
              darkMode 
                ? 'text-blue-400 hover:bg-gray-700' 
                : 'text-blue-500 hover:bg-blue-50'
            }`}
            title="View Details"
          >
            <FiEye size={18} />
          </button>
          <button
            onClick={() => toggleModal('edit', true, patient)}
            className={`p-2 rounded-full transition-colors ${
              darkMode 
                ? 'text-green-400 hover:bg-gray-700' 
                : 'text-green-500 hover:bg-green-50'
            }`}
            title="Edit Patient"
          >
            <FiEdit2 size={18} />
          </button>
          <button
            onClick={() => toggleModal('delete', true, patient)}
            className={`p-2 rounded-full transition-colors ${
              darkMode 
                ? 'text-red-400 hover:bg-gray-700' 
                : 'text-red-500 hover:bg-red-50'
            }`}
            title="Delete Patient"
          >
            <FiTrash2 size={18} />
          </button>
        </div>
      </div>
    )
  };

  // Filter and search functionality
  const filteredPatients = useMemo(() => {
    return patients.filter(patient => {
      // Search term filter
      const matchesSearch = !searchTerm
        ? true
        : Object.values(patient).some(
            value =>
              value &&
              value.toString().toLowerCase().includes(searchTerm.toLowerCase())
          );

      // Gender filter
      const matchesGender = !filters.gender
        ? true
        : patient.gender.toLowerCase() === filters.gender.toLowerCase();

      // Condition filter
      const matchesCondition = !filters.condition
        ? true
        : patient.condition.toLowerCase().includes(filters.condition.toLowerCase());

      // Age range filter
      const matchesAge =
        (!filters.ageRange.min || patient.age >= parseInt(filters.ageRange.min)) &&
        (!filters.ageRange.max || patient.age <= parseInt(filters.ageRange.max));

      return matchesSearch && matchesGender && matchesCondition && matchesAge;
    });
  }, [patients, searchTerm, filters]);

  // Sort functionality
  const sortedPatients = useMemo(() => {
    const sorted = [...filteredPatients];
    sorted.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return sortOrder === 'asc'
            ? a.name.localeCompare(b.name)
            : b.name.localeCompare(a.name);
        case 'age':
          return sortOrder === 'asc'
            ? a.age - b.age
            : b.age - a.age;
        case 'date':
          return sortOrder === 'asc'
            ? new Date(a.registrationDate) - new Date(b.registrationDate)
            : new Date(b.registrationDate) - new Date(a.registrationDate);
        default:
          return 0;
      }
    });
    return sorted;
  }, [filteredPatients, sortBy, sortOrder]);

  const handleSearch = (value) => {
    setSearchTerm(value);
  };

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const handleAgeRangeChange = (type, value) => {
    setFilters(prev => ({
      ...prev,
      ageRange: {
        ...prev.ageRange,
        [type]: value
      }
    }));
  };

  const handleSortChange = (newSortBy) => {
    if (newSortBy === sortBy) {
      setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(newSortBy);
      setSortOrder('asc');
    }
  };

  // Export functions
  const exportToPDF = () => {
    const doc = new jsPDF();
    
    // Add title
    doc.setFontSize(20);
    doc.text('Patient List', 14, 20);
    doc.setFontSize(10);
    doc.text(`Generated on ${new Date().toLocaleDateString()}`, 14, 30);

    // Define the columns
    const columns = [
      { header: 'ID', dataKey: 'id' },
      { header: 'Name', dataKey: 'name' },
      { header: 'Age', dataKey: 'age' },
      { header: 'Gender', dataKey: 'gender' },
      { header: 'Phone', dataKey: 'phone' },
      { header: 'Email', dataKey: 'email' },
      { header: 'Blood Group', dataKey: 'bloodGroup' }
    ];

    // Prepare the data
    const data = patients.map(patient => ({
      id: patient.id,
      name: patient.name,
      age: patient.age,
      gender: patient.gender,
      phone: patient.phone,
      email: patient.email,
      bloodGroup: patient.bloodGroup
    }));

    // Add the table
    doc.autoTable({
      columns: columns.map(col => ({
        header: col.header,
        dataKey: col.dataKey
      })),
      body: data,
      startY: 40,
      styles: {
        fontSize: 8,
        cellPadding: 2
      },
      headStyles: {
        fillColor: [66, 139, 202],
        textColor: 255
      },
      alternateRowStyles: {
        fillColor: [245, 245, 245]
      }
    });

    // Save the PDF
    doc.save('patient-list.pdf');
  };

  const exportToCSV = () => {
    // Prepare the data
    const data = patients.map(patient => ({
      ID: patient.id,
      Name: patient.name,
      Age: patient.age,
      Gender: patient.gender,
      Phone: patient.phone,
      Email: patient.email,
      'Blood Group': patient.bloodGroup,
      Address: patient.address,
      Condition: patient.condition,
      'Next Appointment': patient.nextAppointment,
      'Registration Date': patient.registrationDate
    }));

    // Convert to CSV
    const csvContent = [
      Object.keys(data[0]).join(','), // Headers
      ...data.map(row => Object.values(row).map(value => 
        typeof value === 'string' && value.includes(',') 
          ? `"${value}"` 
          : value
      ).join(','))
    ].join('\n');

    // Create blob and download
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    saveAs(blob, 'patient-list.csv');
  };

  const handlePrint = () => {
    const printContent = document.createElement('div');
    printContent.innerHTML = `
      <div style="padding: 20px;">
        <h1 style="text-align: center; margin-bottom: 20px;">Patient List</h1>
        <p style="text-align: right; margin-bottom: 30px;">Generated on ${new Date().toLocaleDateString()}</p>
        <table style="width: 100%; border-collapse: collapse;">
          <thead>
            <tr>
              <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">ID</th>
              <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Name</th>
              <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Age</th>
              <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Gender</th>
              <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Phone</th>
              <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Email</th>
              <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Blood Group</th>
            </tr>
          </thead>
          <tbody>
            ${patients.map(patient => `
              <tr>
                <td style="border: 1px solid #ddd; padding: 8px;">${patient.id}</td>
                <td style="border: 1px solid #ddd; padding: 8px;">${patient.name}</td>
                <td style="border: 1px solid #ddd; padding: 8px;">${patient.age}</td>
                <td style="border: 1px solid #ddd; padding: 8px;">${patient.gender}</td>
                <td style="border: 1px solid #ddd; padding: 8px;">${patient.phone}</td>
                <td style="border: 1px solid #ddd; padding: 8px;">${patient.email}</td>
                <td style="border: 1px solid #ddd; padding: 8px;">${patient.bloodGroup}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    `;

    const printWindow = window.open('', '_blank');
    printWindow.document.write(printContent.innerHTML);
    printWindow.document.close();
    printWindow.print();
  };

  return (
    <div className={`p-6 ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      {/* Header Section */}
      <div className="mb-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <FiUsers className="text-blue-500" size={32} />
            Patient Management
            <span className="ml-2 text-sm font-normal text-gray-500 dark:text-gray-400">
              ({patients.length} total)
            </span>
          </h1>

          <div className="flex flex-wrap items-center gap-3">
            {/* Export Buttons */}
            <div className="flex items-center gap-2">
              <button
                onClick={exportToPDF}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition-colors duration-200"
              >
                <FiDownload size={16} />
                PDF
              </button>
              <button
                onClick={exportToCSV}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-green-500 rounded-lg hover:bg-green-600 transition-colors duration-200"
              >
                <FiDownload size={16} />
                CSV
              </button>
              <button
                onClick={handlePrint}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-700"
              >
                <FiPrinter size={16} />
                Print
              </button>
            </div>

            {/* Add Patient Button */}
            <button
              onClick={handleAddClick}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition-colors duration-200 ml-2"
            >
              <FiUserPlus size={16} />
              Add Patient
            </button>
          </div>
        </div>

        {/* Search and Filter Section */}
        <div className="flex flex-col lg:flex-row lg:items-center gap-4">
          <div className="flex-1">
            <div className="relative">
              <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search patients by name, email, or phone..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`w-full pl-10 pr-4 py-2.5 rounded-lg border focus:outline-none focus:ring-2 transition-colors duration-200 ${
                  darkMode
                    ? 'bg-gray-800 border-gray-700 text-white focus:ring-blue-500'
                    : 'bg-white border-gray-300 text-gray-900 focus:ring-blue-400'
                }`}
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* View Toggle */}
            <div className={`flex items-center rounded-lg ${
              darkMode ? 'bg-gray-800' : 'bg-white border border-gray-200'
            }`}>
              <button
                onClick={() => setViewMode('grid')}
                className={`flex items-center gap-2 px-3 py-2 rounded-l-lg transition-colors duration-200 ${
                  viewMode === 'grid'
                    ? 'bg-blue-500 text-white'
                    : darkMode
                    ? 'text-gray-400 hover:text-white hover:bg-gray-700'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                <FiGrid size={16} />
                Grid
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`flex items-center gap-2 px-3 py-2 rounded-r-lg transition-colors duration-200 ${
                  viewMode === 'list'
                    ? 'bg-blue-500 text-white'
                    : darkMode
                    ? 'text-gray-400 hover:text-white hover:bg-gray-700'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                <FiList size={16} />
                List
              </button>
            </div>

            {/* Filter Toggle */}
            <button
              onClick={() => toggleModal('filters', true)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors duration-200 ${
                modals.filters
                  ? 'bg-blue-500 text-white'
                  : darkMode
                  ? 'bg-gray-800 text-gray-200 hover:bg-gray-700'
                  : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
              }`}
            >
              <FiFilter size={16} />
              Filters
              {(filters.gender || filters.condition || filters.ageRange.min || filters.ageRange.max) && (
                <span className="flex items-center justify-center w-5 h-5 ml-1 text-xs text-white bg-blue-600 rounded-full">
                  {Object.values(filters).filter(Boolean).length}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Filter Panel */}
        {modals.filters && (
          <div className={`mt-4 p-4 rounded-lg ${
            darkMode ? 'bg-gray-800' : 'bg-white border border-gray-200'
          }`}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Gender</label>
                <select
                  value={filters.gender}
                  onChange={(e) => handleFilterChange('gender', e.target.value)}
                  className={`w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-colors duration-200 ${
                    darkMode
                      ? 'bg-gray-700 border-gray-600 text-white focus:ring-blue-500'
                      : 'bg-white border-gray-300 text-gray-900 focus:ring-blue-400'
                  }`}
                >
                  <option value="">All Genders</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Condition</label>
                <input
                  type="text"
                  value={filters.condition}
                  onChange={(e) => handleFilterChange('condition', e.target.value)}
                  placeholder="Filter by condition"
                  className={`w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-colors duration-200 ${
                    darkMode
                      ? 'bg-gray-700 border-gray-600 text-white focus:ring-blue-500'
                      : 'bg-white border-gray-300 text-gray-900 focus:ring-blue-400'
                  }`}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Min Age</label>
                <input
                  type="number"
                  value={filters.ageRange.min}
                  onChange={(e) => handleAgeRangeChange('min', e.target.value)}
                  placeholder="Minimum age"
                  className={`w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-colors duration-200 ${
                    darkMode
                      ? 'bg-gray-700 border-gray-600 text-white focus:ring-blue-500'
                      : 'bg-white border-gray-300 text-gray-900 focus:ring-blue-400'
                  }`}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Max Age</label>
                <input
                  type="number"
                  value={filters.ageRange.max}
                  onChange={(e) => handleAgeRangeChange('max', e.target.value)}
                  placeholder="Maximum age"
                  className={`w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-colors duration-200 ${
                    darkMode
                      ? 'bg-gray-700 border-gray-600 text-white focus:ring-blue-500'
                      : 'bg-white border-gray-300 text-gray-900 focus:ring-blue-400'
                  }`}
                />
              </div>
            </div>
          </div>
        )}
      </div>

      <div className={`mt-6 ${
        viewMode === 'card' 
          ? 'space-y-6'
          : viewMode === 'grid' 
            ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
            : 'overflow-x-auto'
      }`}>
        {sortedPatients.map((patient) =>
          viewMode === 'card' ? (
            <div key={patient.id}>
              {viewRenderers.renderCardView(patient)}
            </div>
          ) : viewMode === 'list' ? (
            <div key={patient.id}>
              {viewRenderers.renderListView(patient)}
            </div>
          ) : viewMode === 'grid' ? (
            <div key={patient.id}>
              {viewRenderers.renderGridView(patient)}
            </div>
          ) : null
        )}
      </div>

      {/* Modals */}
      {modals.add && (
        <AddPatientModal
          darkMode={darkMode}
          onClose={() => toggleModal('add', false)}
          onSubmit={handleAddPatient}
        />
      )}

      {modals.edit && selectedPatient && (
        <EditPatientModal
          darkMode={darkMode}
          patient={selectedPatient}
          onClose={() => {
            toggleModal('edit', false);
            setSelectedPatient(null);
          }}
          onSubmit={handleUpdatePatient}
        />
      )}
      
      {modals.view && selectedPatient && (
        <ViewPatientModal
          darkMode={darkMode}
          patient={selectedPatient}
          onClose={() => {
            toggleModal('view', false);
            setSelectedPatient(null);
          }}
        />
      )}
      
      {/* Confirm Delete Modal */}
      {modals.delete && selectedPatient && (
        <ConfirmDeleteModal
          darkMode={darkMode}
          patient={selectedPatient}
          onClose={() => {
            toggleModal('delete', false);
            setSelectedPatient(null);
          }}
          onConfirm={handleConfirmDelete}
        />
      )}
    </div>
  );
}

export default Patients;
