import React, { useState, useEffect, useMemo } from 'react';
import { FiSearch, FiUser, FiPhone, FiMail, FiCalendar, FiPlus, FiMapPin, FiGrid, FiList, FiEdit2, FiTrash2, FiDownload, FiPrinter, FiFilter, FiEye } from 'react-icons/fi';
import AddPatient from '../quick-actions/AddPatient';
import EditPatient from '../quick-actions/EditPatient';
import Modal from '../shared/Modal';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { saveAs } from 'file-saver';

// Initial patient data with enhanced medical information
const initialPatients = [
  {
    id: 1,
    name: "John Doe",
    age: 35,
    gender: "Male",
    phone: "123-456-7890",
    email: "john@example.com",
    address: "123 Main St",
    condition: "Hypertension",
    nextAppointment: "2024-02-01",
    registrationDate: "2023-01-15",
    bloodGroup: "A+",
    assignedDoctor: 1, // References doctor's ID
    vitals: {
      bloodPressure: "120/80",
      temperature: "98.6°F",
      heartRate: "72 bpm",
      respiratoryRate: "16/min",
      weight: "70 kg",
      height: "175 cm",
      bmi: "22.9"
    },
    medications: [
      {
        name: "Lisinopril",
        dosage: "10mg",
        frequency: "Once daily",
        startDate: "2023-12-01",
        endDate: "2024-06-01"
      },
      {
        name: "Aspirin",
        dosage: "81mg",
        frequency: "Once daily",
        startDate: "2023-12-01",
        endDate: "2024-06-01"
      }
    ],
    allergies: ["Penicillin", "Peanuts"],
    medicalHistory: [
      {
        date: "2023-11-15",
        diagnosis: "Hypertension",
        treatment: "Prescribed Lisinopril",
        notes: "Patient reported occasional headaches"
      },
      {
        date: "2023-12-15",
        diagnosis: "Regular Checkup",
        treatment: "No changes in medication",
        notes: "Blood pressure under control"
      }
    ],
    labResults: [
      {
        date: "2023-12-01",
        test: "Complete Blood Count",
        result: "Normal",
        referenceRange: "Within normal limits"
      },
      {
        date: "2023-12-01",
        test: "Lipid Panel",
        result: "Slightly elevated cholesterol",
        referenceRange: "Total Cholesterol: <200 mg/dL"
      }
    ]
  },
  {
    id: 2,
    name: "Jane Smith",
    age: 28,
    gender: "Female",
    phone: "098-765-4321",
    email: "jane@example.com",
    address: "456 Oak St",
    condition: "Dental Care",
    nextAppointment: "2024-02-05",
    registrationDate: "2023-01-15",
    bloodGroup: "O-",
    assignedDoctor: 2, // References doctor's ID
    vitals: {
      bloodPressure: "110/70",
      temperature: "98.6°F",
      heartRate: "68 bpm",
      respiratoryRate: "14/min",
      weight: "55 kg",
      height: "160 cm",
      bmi: "21.5"
    },
    medications: [
      {
        name: "Ibuprofen",
        dosage: "400mg",
        frequency: "As needed",
        startDate: "2023-12-01",
        endDate: "2024-06-01"
      }
    ],
    allergies: ["Sulfa"],
    medicalHistory: [
      {
        date: "2023-11-15",
        diagnosis: "Dental Caries",
        treatment: "Filled cavity",
        notes: "Patient reported toothache"
      }
    ],
    labResults: [
      {
        date: "2023-12-01",
        test: "Dental X-ray",
        result: "Normal",
        referenceRange: "Within normal limits"
      }
    ]
  }
];

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
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddPatient, setShowAddPatient] = useState(false);
  const [showEditPatient, setShowEditPatient] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
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
  const [showPrintModal, setShowPrintModal] = useState(false);
  const [printData, setPrintData] = useState(null);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showMedicalHistoryModal, setShowMedicalHistoryModal] = useState(false);
  const [showAppointmentModal, setShowAppointmentModal] = useState(false);
  const [showPrescriptionModal, setShowPrescriptionModal] = useState(false);
  const [showLabResultsModal, setShowLabResultsModal] = useState(false);
  const [showInsuranceModal, setShowInsuranceModal] = useState(false);
  const [showDocumentsModal, setShowDocumentsModal] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [documentType, setDocumentType] = useState('');
  const [documentDescription, setDocumentDescription] = useState('');
  const [documentDate, setDocumentDate] = useState('');
  const [documentPriority, setDocumentPriority] = useState('normal');
  const [searchTermDocuments, setSearchTermDocuments] = useState('');
  const [filterTypeDocuments, setFilterTypeDocuments] = useState('all');
  const [filterPriority, setFilterPriority] = useState('all');
  const [sortBy, setSortBy] = useState('date');
  const [sortOrder, setSortOrder] = useState('desc');
  const [selectedTags, setSelectedTags] = useState([]);

  const availableDocumentTags = [
    'Urgent Review', 'Follow-up Required', 'Pending Results', 
    'Critical', 'Routine', 'Confidential', 'Draft',
    'Final Report', 'Archived', 'Needs Signature'
  ];

  // Save patients to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('patients', JSON.stringify(patients));
  }, [patients]);

  // Save view mode to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('patientViewMode', viewMode);
  }, [viewMode]);

  const handleAddPatient = (newPatient) => {
    const patientWithId = {
      ...newPatient,
      id: Date.now()
    };
    setPatients(prevPatients => [...prevPatients, patientWithId]);
  };

  const handleEditPatient = (updatedPatient) => {
    setPatients(prevPatients =>
      prevPatients.map(patient =>
        patient.id === updatedPatient.id ? updatedPatient : patient
      )
    );
    setShowEditPatient(false);
  };

  const handleDeletePatient = () => {
    if (selectedPatient) {
      setPatients(prevPatients =>
        prevPatients.filter(patient => patient.id !== selectedPatient.id)
      );
      setShowDeleteConfirm(false);
      setSelectedPatient(null);
    }
  };

  const openEditModal = (patient) => {
    setSelectedPatient(patient);
    setShowEditPatient(true);
  };

  const openDeleteModal = (patient) => {
    setSelectedPatient(patient);
    setShowDeleteConfirm(true);
  };

  const handlePrintSingle = (patient) => {
    setPrintData(patient);
    setShowPrintModal(true);
  };

  const printSinglePatient = () => {
    const printContent = document.getElementById('print-single-patient');
    const originalContent = document.body.innerHTML;
    
    document.body.innerHTML = printContent.innerHTML;
    window.print();
    document.body.innerHTML = originalContent;
    
    // Reattach event listeners by forcing a re-render
    window.location.reload();
  };

  const handleViewDetails = (patient) => {
    setSelectedPatient(patient);
    setShowViewModal(true);
  };

  const handleAddMedicalHistory = (patient) => {
    setSelectedPatient(patient);
    setShowMedicalHistoryModal(true);
  };

  const handleScheduleAppointment = (patient) => {
    setSelectedPatient(patient);
    setShowAppointmentModal(true);
  };

  const handleAddPrescription = (patient) => {
    setSelectedPatient(patient);
    setShowPrescriptionModal(true);
  };

  const handleAddLabResults = (patient) => {
    setSelectedPatient(patient);
    setShowLabResultsModal(true);
  };

  const handleUpdateInsurance = (patient) => {
    setSelectedPatient(patient);
    setShowInsuranceModal(true);
  };

  const handleDocuments = (patient) => {
    setSelectedPatient(patient);
    // Load patient's documents if they exist
    if (patient.documents) {
      setUploadedFiles(patient.documents);
    } else {
      setUploadedFiles([]);
    }
    setShowDocumentsModal(true);
  };

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const handleFileUpload = () => {
    if (!selectedFile || !documentType) return;

    const newDocument = {
      id: Date.now(),
      name: selectedFile.name,
      type: documentType,
      description: documentDescription,
      uploadDate: new Date().toISOString(),
      documentDate: documentDate || new Date().toISOString(),
      priority: documentPriority || 'normal',
      size: selectedFile.size,
      url: URL.createObjectURL(selectedFile),
      uploadedBy: "Dr. Smith", // Replace with actual doctor's name
      tags: selectedTags,
      status: 'active',
      version: 1,
      lastModified: new Date().toISOString()
    };

    const updatedFiles = [...uploadedFiles, newDocument];
    setUploadedFiles(updatedFiles);

    // Update patient's documents in the patients array
    const updatedPatients = patients.map(p => {
      if (p.id === selectedPatient.id) {
        return {
          ...p,
          documents: updatedFiles
        };
      }
      return p;
    });
    setPatients(updatedPatients);

    // Reset form
    setSelectedFile(null);
    setDocumentType('');
    setDocumentDescription('');
    setDocumentDate('');
    setDocumentPriority('normal');
    setSelectedTags([]);
    // Reset file input
    const fileInput = document.getElementById('file-upload');
    if (fileInput) fileInput.value = '';
  };

  const handleTagSelect = (tag) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const handleDeleteDocument = (documentId) => {
    const updatedFiles = uploadedFiles.filter(file => file.id !== documentId);
    setUploadedFiles(updatedFiles);

    // Update patient's documents in the patients array
    const updatedPatients = patients.map(p => {
      if (p.id === selectedPatient.id) {
        return {
          ...p,
          documents: updatedFiles
        };
      }
      return p;
    });
    setPatients(updatedPatients);
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  // Export to PDF
  const exportToPDF = () => {
    const doc = new jsPDF();
    
    // Add title
    doc.setFontSize(20);
    doc.text('Patient Records', 14, 22);
    
    // Define the columns
    const columns = [
      'Name',
      'Age',
      'Gender',
      'Phone',
      'Email',
      'Condition',
      'Next Appointment'
    ];
    
    // Prepare the data
    const data = filteredPatients.map(patient => [
      patient.name,
      patient.age,
      patient.gender,
      patient.phone,
      patient.email,
      patient.condition,
      patient.nextAppointment
    ]);
    
    // Add the table
    doc.autoTable({
      head: [columns],
      body: data,
      startY: 30,
      styles: { fontSize: 8 },
      headStyles: { fillColor: [41, 128, 185], textColor: 255 },
      alternateRowStyles: { fillColor: [245, 245, 245] }
    });
    
    // Save the PDF
    doc.save('patient-records.pdf');
  };

  // Export to CSV
  const exportToCSV = () => {
    const columns = ['Name,Age,Gender,Phone,Email,Address,Condition,Next Appointment\n'];
    const data = filteredPatients.map(patient => 
      `${patient.name},${patient.age},${patient.gender},${patient.phone},${patient.email},"${patient.address}",${patient.condition},${patient.nextAppointment}\n`
    );
    
    const csvContent = columns.concat(data).join('');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8' });
    saveAs(blob, 'patient-records.csv');
  };

  // Print function
  const handlePrint = () => {
    const printContent = document.getElementById('printable-content');
    const originalContent = document.body.innerHTML;
    
    document.body.innerHTML = printContent.innerHTML;
    window.print();
    document.body.innerHTML = originalContent;
    
    // Reattach event listeners by forcing a re-render
    window.location.reload();
  };

  // Apply filters
  const applyFilters = (patient) => {
    const matchesGender = !filters.gender || patient.gender === filters.gender;
    const matchesCondition = !filters.condition || patient.condition.toLowerCase().includes(filters.condition.toLowerCase());
    const matchesAge = (!filters.ageRange.min || patient.age >= parseInt(filters.ageRange.min)) &&
                      (!filters.ageRange.max || patient.age <= parseInt(filters.ageRange.max));
    
    return matchesGender && matchesCondition && matchesAge;
  };

  const filteredPatients = patients.filter(patient =>
    (patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
     patient.condition.toLowerCase().includes(searchTerm.toLowerCase())) &&
    applyFilters(patient)
  );

  // Get unique conditions for filter dropdown
  const uniqueConditions = [...new Set(patients.map(patient => patient.condition))];

  const filteredAndSortedDocuments = useMemo(() => {
    let docs = [...uploadedFiles];

    // Apply filters
    docs = docs.filter(file => {
      const matchesSearch = file.name.toLowerCase().includes(searchTermDocuments.toLowerCase()) ||
                          file.description.toLowerCase().includes(searchTermDocuments.toLowerCase());
      const matchesType = filterTypeDocuments === 'all' || file.type === filterTypeDocuments;
      const matchesPriority = filterPriority === 'all' || file.priority === filterPriority;
      return matchesSearch && matchesType && matchesPriority;
    });

    // Apply sorting
    docs.sort((a, b) => {
      let compareResult = 0;
      switch (sortBy) {
        case 'date':
          compareResult = new Date(b.documentDate) - new Date(a.documentDate);
          break;
        case 'name':
          compareResult = a.name.localeCompare(b.name);
          break;
        case 'type':
          compareResult = a.type.localeCompare(b.type);
          break;
        case 'size':
          compareResult = b.size - a.size;
          break;
        case 'priority':
          const priorityOrder = { urgent: 3, high: 2, normal: 1, low: 0 };
          compareResult = priorityOrder[b.priority] - priorityOrder[a.priority];
          break;
        default:
          compareResult = 0;
      }
      return sortOrder === 'asc' ? -compareResult : compareResult;
    });

    return docs;
  }, [uploadedFiles, searchTermDocuments, filterTypeDocuments, filterPriority, sortBy, sortOrder]);

  const renderListView = (patient) => (
    <div
      key={patient.id}
      className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4 flex-1">
          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
            <FiUser className="text-blue-500" />
          </div>
          <div className="flex-1">
            <div className="flex items-center">
              <h3 className="text-lg font-semibold text-gray-800">
                {patient.name}
              </h3>
              <span className="ml-3 px-2 py-0.5 bg-gray-100 text-gray-600 rounded text-sm">
                {patient.gender}
              </span>
            </div>
            <div className="text-gray-600 text-sm mt-1">
              {patient.condition}
            </div>
          </div>
          <div className="flex items-center space-x-8 text-gray-600">
            <div className="text-right">
              <div className="text-sm font-medium">Age</div>
              <div>{patient.age}</div>
            </div>
            <div className="text-right">
              <div className="text-sm font-medium">Next Visit</div>
              <div>{patient.nextAppointment}</div>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => handlePrintSingle(patient)}
                className="p-2 hover:bg-purple-50 text-purple-600 rounded-full transition-colors"
                title="Print Patient Details"
              >
                <FiPrinter size={18} />
              </button>
              <button
                onClick={() => handleViewDetails(patient)}
                className="p-2 hover:bg-emerald-50 text-emerald-600 rounded-full transition-colors"
                title="View Details"
              >
                <FiEye size={18} />
              </button>
              <button
                onClick={() => openEditModal(patient)}
                className="p-2 hover:bg-blue-50 text-blue-600 rounded-full transition-colors"
                title="Edit Patient"
              >
                <FiEdit2 size={18} />
              </button>
              <button
                onClick={() => openDeleteModal(patient)}
                className="p-2 hover:bg-red-50 text-red-600 rounded-full transition-colors"
                title="Delete Patient"
              >
                <FiTrash2 size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderCardView = (patient) => (
    <div
      key={patient.id}
      className="relative overflow-hidden bg-white/30 backdrop-blur-md border border-white/30 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
      style={{
        background: 'linear-gradient(145deg, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0.1) 100%)',
      }}
    >
      {/* Status Indicator */}
      <div className="absolute top-4 right-4 flex items-center space-x-2">
        <span className="flex h-3 w-3">
          <span className={`animate-ping absolute inline-flex h-3 w-3 rounded-full opacity-75 ${
            new Date(patient.nextAppointment) < new Date() ? 'bg-red-400' : 'bg-green-400'
          }`}></span>
          <span className={`relative inline-flex rounded-full h-3 w-3 ${
            new Date(patient.nextAppointment) < new Date() ? 'bg-red-500' : 'bg-green-500'
          }`}></span>
        </span>
      </div>

      {/* Patient Basic Info */}
      <div className="flex items-start space-x-4">
        <div className="h-12 w-12 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white text-lg font-semibold">
          {patient.name.split(' ').map(n => n[0]).join('')}
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-800 mb-1">{patient.name}</h3>
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <span>{patient.age} years</span>
            <span>•</span>
            <span>{patient.gender}</span>
            <span>•</span>
            <span className="text-blue-600">{patient.bloodGroup}</span>
          </div>
        </div>
      </div>

      {/* Medical Info */}
      <div className="mt-4 space-y-3">
        <div className="bg-white p-3 rounded-lg">
          <p className="text-sm font-medium text-gray-600">Condition</p>
          <p className="text-red-600 font-medium">{patient.condition}</p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="bg-white p-3 rounded-lg">
            <p className="text-sm font-medium text-gray-600">Next Appointment</p>
            <p className="text-blue-600">{new Date(patient.nextAppointment).toLocaleDateString()}</p>
          </div>
          <div className="bg-white p-3 rounded-lg">
            <p className="text-sm font-medium text-gray-600">Doctor</p>
            <p className="truncate">
              {doctors.find(d => d.id === patient.assignedDoctor)?.name || 'Not Assigned'}
            </p>
          </div>
        </div>

        {/* Vitals Summary */}
        <div className="grid grid-cols-3 gap-2">
          <div className="bg-white p-2 rounded-lg text-center">
            <p className="text-xs font-medium text-gray-600">BP</p>
            <p className="text-sm font-medium">{patient.vitals?.bloodPressure}</p>
          </div>
          <div className="bg-white p-2 rounded-lg text-center">
            <p className="text-xs font-medium text-gray-600">Temp</p>
            <p className="text-sm font-medium">{patient.vitals?.temperature}</p>
          </div>
          <div className="bg-white p-2 rounded-lg text-center">
            <p className="text-xs font-medium text-gray-600">Heart Rate</p>
            <p className="text-sm font-medium">{patient.vitals?.heartRate}</p>
          </div>
        </div>

        {/* Allergies */}
        {patient.allergies && patient.allergies.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {patient.allergies.map((allergy, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs"
              >
                {allergy}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="mt-4 pt-4 border-t border-gray-200/50 flex flex-wrap justify-between items-center gap-2">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => handleViewDetails(patient)}
            className="p-2 hover:bg-emerald-100/50 text-emerald-600 rounded-full transition-colors"
            title="View Details"
          >
            <FiEye size={18} />
          </button>
          <button
            onClick={() => handlePrintSingle(patient)}
            className="p-2 hover:bg-purple-100/50 text-purple-600 rounded-full transition-colors"
            title="Print Patient Details"
          >
            <FiPrinter size={18} />
          </button>
          <button
            onClick={() => openEditModal(patient)}
            className="p-2 hover:bg-blue-100/50 text-blue-600 rounded-full transition-colors"
            title="Edit Patient"
          >
            <FiEdit2 size={18} />
          </button>
          <button
            onClick={() => openDeleteModal(patient)}
            className="p-2 hover:bg-red-100/50 text-red-600 rounded-full transition-colors"
            title="Delete Patient"
          >
            <FiTrash2 size={18} />
          </button>
        </div>
        
        {/* Additional Feature Buttons */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => handleAddMedicalHistory(patient)}
            className="px-3 py-1 text-sm bg-gradient-to-r from-teal-500 to-emerald-500 text-white rounded-full hover:from-teal-600 hover:to-emerald-600 transition-all"
          >
            Medical History
          </button>
          <button
            onClick={() => handleScheduleAppointment(patient)}
            className="px-3 py-1 text-sm bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-full hover:from-blue-600 hover:to-indigo-600 transition-all"
          >
            Schedule
          </button>
          <button
            onClick={() => handleAddPrescription(patient)}
            className="px-3 py-1 text-sm bg-gradient-to-r from-purple-500 to-violet-500 text-white rounded-full hover:from-purple-600 hover:to-violet-600 transition-all"
          >
            Prescriptions
          </button>
          <button
            onClick={() => handleAddLabResults(patient)}
            className="px-3 py-1 text-sm bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-full hover:from-amber-600 hover:to-orange-600 transition-all"
          >
            Lab Results
          </button>
          <button
            onClick={() => handleUpdateInsurance(patient)}
            className="px-3 py-1 text-sm bg-gradient-to-r from-rose-500 to-pink-500 text-white rounded-full hover:from-rose-600 hover:to-pink-600 transition-all"
          >
            Insurance
          </button>
        </div>
        {/* Additional Feature Buttons Row 2 */}
        <div className="flex flex-wrap gap-2 mt-2 border-t border-gray-200/50 pt-2">
          <button
            onClick={() => handleDocuments(patient)}
            className="px-3 py-1 text-sm bg-gradient-to-r from-emerald-500 to-green-500 text-white rounded-full hover:from-emerald-600 hover:to-green-600 transition-all"
          >
            Documents
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="p-6 max-w-[1600px] mx-auto">
      <div className="mb-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-semibold text-gray-800">
              Patient Management
            </h1>
            <p className="text-gray-600 mt-1">
              Total Patients: {patients.length}
            </p>
          </div>
          <div className="flex items-center space-x-4">
            {/* Export & Print Buttons */}
            <div className="flex items-center space-x-2">
              <button
                onClick={exportToPDF}
                className="p-2 hover:bg-blue-50 text-blue-600 rounded-full transition-colors"
                title="Export to PDF"
              >
                <FiDownload size={20} />
              </button>
              <button
                onClick={exportToCSV}
                className="p-2 hover:bg-green-50 text-green-600 rounded-full transition-colors"
                title="Export to CSV"
              >
                <FiDownload size={20} />
              </button>
              <button
                onClick={handlePrint}
                className="p-2 hover:bg-purple-50 text-purple-600 rounded-full transition-colors"
                title="Print"
              >
                <FiPrinter size={20} />
              </button>
            </div>

            <div className="flex items-center bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setViewMode('card')}
                className={`p-2 rounded-md transition-colors ${
                  viewMode === 'card'
                    ? 'bg-white text-blue-500 shadow-sm'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <FiGrid size={20} />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-md transition-colors ${
                  viewMode === 'list'
                    ? 'bg-white text-blue-500 shadow-sm'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <FiList size={20} />
              </button>
            </div>
            <button
              onClick={() => setShowAddPatient(true)}
              className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              <FiPlus className="mr-2" />
              Add New Patient
            </button>
          </div>
        </div>

        {/* Search and Filter Bar */}
        <div className="flex items-center space-x-4 mb-6">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Search patients by name or condition..."
              className="w-full px-4 py-3 pl-12 pr-4 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-700"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <FiSearch className="absolute left-4 top-3.5 text-gray-400 text-lg" />
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`p-3 rounded-xl transition-colors ${
              showFilters
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
            title="Filter"
          >
            <FiFilter size={20} />
          </button>
        </div>

        {/* Filters Panel */}
        {showFilters && (
          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 mb-6">
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Gender
                </label>
                <select
                  value={filters.gender}
                  onChange={(e) => setFilters(prev => ({ ...prev, gender: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
                >
                  <option value="">All</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Condition
                </label>
                <select
                  value={filters.condition}
                  onChange={(e) => setFilters(prev => ({ ...prev, condition: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
                >
                  <option value="">All</option>
                  {uniqueConditions.map(condition => (
                    <option key={condition} value={condition}>{condition}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Age Range
                </label>
                <div className="flex items-center space-x-2">
                  <input
                    type="number"
                    placeholder="Min"
                    value={filters.ageRange.min}
                    onChange={(e) => setFilters(prev => ({
                      ...prev,
                      ageRange: { ...prev.ageRange, min: e.target.value }
                    }))}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-700"
                  />
                  <span className="text-gray-500">-</span>
                  <input
                    type="number"
                    placeholder="Max"
                    value={filters.ageRange.max}
                    onChange={(e) => setFilters(prev => ({
                      ...prev,
                      ageRange: { ...prev.ageRange, max: e.target.value }
                    }))}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-700"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Patient Grid */}
        <div className={`mt-6 ${
          viewMode === 'card' 
            ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
            : 'space-y-4'
        }`}>
          {filteredPatients.map((patient) =>
            viewMode === 'card' ? renderCardView(patient) : renderListView(patient)
          )}
          {filteredPatients.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              No patients found. Try adjusting your search or filters.
            </div>
          )}
        </div>
      </div>

      {/* Add Patient Modal */}
      <AddPatient
        isOpen={showAddPatient}
        onClose={() => setShowAddPatient(false)}
        onAddPatient={handleAddPatient}
      />

      {/* Edit Patient Modal */}
      {selectedPatient && (
        <EditPatient
          isOpen={showEditPatient}
          onClose={() => {
            setShowEditPatient(false);
            setSelectedPatient(null);
          }}
          onEditPatient={handleEditPatient}
          patient={selectedPatient}
        />
      )}

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={showDeleteConfirm}
        onClose={() => {
          setShowDeleteConfirm(false);
          setSelectedPatient(null);
        }}
        title="Delete Patient"
        maxWidth="max-w-md"
      >
        <div className="p-6">
          <p className="text-gray-700 mb-6">
            Are you sure you want to delete {selectedPatient?.name}? This action cannot be undone.
          </p>
          <div className="flex justify-end space-x-3">
            <button
              onClick={() => {
                setShowDeleteConfirm(false);
                setSelectedPatient(null);
              }}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleDeletePatient}
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
            >
              Delete
            </button>
          </div>
        </div>
      </Modal>

      {/* Print Single Patient Modal */}
      <Modal
        isOpen={showPrintModal}
        onClose={() => {
          setShowPrintModal(false);
          setPrintData(null);
        }}
        title="Print Patient Details"
        maxWidth="max-w-5xl"
      >
        <div className="p-6">
          <div id="print-single-patient" className="space-y-6">
            {/* Hospital Header */}
            <div className="border-b-2 border-gray-200 pb-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <img
                    src={hospitalInfo.logo}
                    alt="Hospital Logo"
                    className="w-16 h-16 object-contain"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='64' height='64' viewBox='0 0 24 16' fill='none' stroke='%234A5568' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2'/%3E%3C/svg%3E";
                    }}
                  />
                  <div>
                    <h1 className="text-2xl font-bold text-gray-800">{hospitalInfo.name}</h1>
                    <p className="text-gray-600">{hospitalInfo.address}</p>
                    <p className="text-gray-600">{hospitalInfo.city}</p>
                  </div>
                </div>
                <div className="text-right text-sm text-gray-600">
                  <p>Phone: {hospitalInfo.phone}</p>
                  <p>Email: {hospitalInfo.email}</p>
                  <p>Web: {hospitalInfo.website}</p>
                </div>
              </div>
            </div>

            {printData && (
              <>
                {/* Patient Basic Info */}
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">Patient Information</h3>
                  <div className="grid grid-cols-3 gap-6">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Full Name</p>
                      <p className="text-lg font-semibold">{printData.name}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-600">Gender</p>
                      <p className="text-gray-700">{printData.gender}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-600">Age</p>
                      <p className="text-gray-700">{printData.age} years</p>
                    </div>
                  </div>
                </div>

                {/* Vitals Information */}
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">Vital Signs</h3>
                  <div className="grid grid-cols-4 gap-6">
                    {printData.vitals && Object.entries(printData.vitals).map(([key, value]) => (
                      <div key={key} className="bg-gray-50 p-3 rounded-lg">
                        <p className="text-sm font-medium text-gray-600">{key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</p>
                        <p className="font-medium text-gray-700">{value}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Current Medications */}
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">Current Medications</h3>
                  <div className="grid grid-cols-1 gap-4">
                    {printData.medications && printData.medications.map((med, index) => (
                      <div key={index} className="bg-gray-50 p-4 rounded-lg">
                        <div className="grid grid-cols-4 gap-4">
                          <div>
                            <p className="text-sm font-medium text-gray-600">Medication</p>
                            <p className="font-medium">{med.name}</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-600">Dosage</p>
                            <p className="text-gray-700">{med.dosage}</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-600">Frequency</p>
                            <p className="text-gray-700">{med.frequency}</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-600">Duration</p>
                            <p className="text-gray-700">{med.startDate} to {med.endDate}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Allergies */}
                {printData.allergies && printData.allergies.length > 0 && (
                  <div className="bg-white border border-gray-200 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">Allergies</h3>
                    <div className="flex flex-wrap gap-2">
                      {printData.allergies.map((allergy, index) => (
                        <span key={index} className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm">
                          {allergy}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Medical History */}
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">Medical History</h3>
                  <div className="space-y-4">
                    {printData.medicalHistory && printData.medicalHistory.map((record, index) => (
                      <div key={index} className="bg-gray-50 p-4 rounded-lg">
                        <div className="grid grid-cols-4 gap-4">
                          <div>
                            <p className="text-sm font-medium text-gray-600">Date</p>
                            <p className="text-gray-700">{record.date}</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-600">Diagnosis</p>
                            <p className="font-medium">{record.diagnosis}</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-600">Treatment</p>
                            <p className="text-gray-700">{record.treatment}</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-600">Notes</p>
                            <p className="text-gray-700">{record.notes}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Lab Results */}
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">Laboratory Results</h3>
                  <div className="space-y-4">
                    {printData.labResults && printData.labResults.map((lab, index) => (
                      <div key={index} className="bg-gray-50 p-4 rounded-lg">
                        <div className="grid grid-cols-4 gap-4">
                          <div>
                            <p className="text-sm font-medium text-gray-600">Date</p>
                            <p className="text-gray-700">{lab.date}</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-600">Test</p>
                            <p className="font-medium">{lab.test}</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-600">Result</p>
                            <p className="text-gray-700">{lab.result}</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-600">Reference Range</p>
                            <p className="text-gray-700">{lab.referenceRange}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Footer */}
                <div className="mt-8 border-t-2 border-gray-200 pt-6">
                  <div className="text-center text-sm text-gray-600">
                    <p className="font-medium">{hospitalInfo.name}</p>
                    <p>{hospitalInfo.address}, {hospitalInfo.city}</p>
                    <p>Phone: {hospitalInfo.phone} | Email: {hospitalInfo.email}</p>
                    <div className="mt-4 text-xs text-gray-500">
                      <p>This is a computer-generated document.</p>
                      <p>Generated on {new Date().toLocaleString()} | Document ID: {`PMR-${Math.random().toString(36).substr(2, 9)}`}</p>
                      <p>For any queries, please contact the hospital administration.</p>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>

          <div className="mt-6 flex justify-end space-x-3">
            <button
              onClick={() => {
                setShowPrintModal(false);
                setPrintData(null);
              }}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={printSinglePatient}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              Print
            </button>
          </div>
        </div>
      </Modal>

      {/* View Patient Modal */}
      <Modal
        isOpen={showViewModal}
        onClose={() => {
          setShowViewModal(false);
          setSelectedPatient(null);
        }}
        title="Patient Details"
        maxWidth="max-w-4xl"
      >
        {selectedPatient && (
          <div className="p-6 space-y-6">
            {/* Basic Info */}
            <div className="bg-white/50 backdrop-blur-sm rounded-lg p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Basic Information</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Full Name</p>
                  <p className="font-medium">{selectedPatient.name}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Gender</p>
                  <p className="font-medium">{selectedPatient.gender}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Age</p>
                  <p className="font-medium">{selectedPatient.age} years</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Blood Group</p>
                  <p className="font-medium">{selectedPatient.bloodGroup}</p>
                </div>
              </div>
            </div>

            {/* Contact Info */}
            <div className="bg-white/50 backdrop-blur-sm rounded-lg p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Contact Information</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Phone</p>
                  <p className="font-medium">{selectedPatient.phone}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Email</p>
                  <p className="font-medium">{selectedPatient.email}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-sm text-gray-600">Address</p>
                  <p className="font-medium">{selectedPatient.address}</p>
                </div>
              </div>
            </div>

            {/* Medical Info */}
            <div className="bg-white/50 backdrop-blur-sm rounded-lg p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Medical Information</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Current Condition</p>
                  <p className="font-medium text-red-600">{selectedPatient.condition}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Next Appointment</p>
                  <p className="font-medium text-blue-600">{selectedPatient.nextAppointment}</p>
                </div>
              </div>

              {/* Vitals */}
              <div className="mt-4">
                <h4 className="font-medium text-gray-700 mb-2">Vital Signs</h4>
                <div className="grid grid-cols-3 gap-4">
                  {selectedPatient.vitals && Object.entries(selectedPatient.vitals).map(([key, value]) => (
                    <div key={key} className="bg-white/50 backdrop-blur-sm rounded-lg p-3">
                      <p className="text-sm text-gray-600">{key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</p>
                      <p className="font-medium text-gray-700">{value}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Allergies */}
              {selectedPatient.allergies && selectedPatient.allergies.length > 0 && (
                <div className="mt-4">
                  <h4 className="font-medium text-gray-700 mb-2">Allergies</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedPatient.allergies.map((allergy, index) => (
                      <span key={index} className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm">
                        {allergy}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => {
                  setShowViewModal(false);
                  setSelectedPatient(null);
                }}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                Close
              </button>
              <button
                onClick={() => handlePrintSingle(selectedPatient)}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              >
                Print Details
              </button>
            </div>
          </div>
        )}
      </Modal>

      {/* Medical History Modal */}
      <Modal
        isOpen={showMedicalHistoryModal}
        onClose={() => {
          setShowMedicalHistoryModal(false);
          setSelectedPatient(null);
        }}
        title="Medical History"
        maxWidth="max-w-4xl"
      >
        {selectedPatient && (
          <div className="p-6 space-y-6">
            <div className="bg-white/50 backdrop-blur-sm rounded-lg p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Medical History</h3>
              {/* Add medical history form/content here */}
            </div>
          </div>
        )}
      </Modal>

      {/* Appointment Modal */}
      <Modal
        isOpen={showAppointmentModal}
        onClose={() => {
          setShowAppointmentModal(false);
          setSelectedPatient(null);
        }}
        title="Schedule Appointment"
        maxWidth="max-w-4xl"
      >
        {selectedPatient && (
          <div className="p-6 space-y-6">
            <div className="bg-white/50 backdrop-blur-sm rounded-lg p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Schedule Appointment</h3>
              {/* Add appointment scheduling form here */}
            </div>
          </div>
        )}
      </Modal>

      {/* Prescription Modal */}
      <Modal
        isOpen={showPrescriptionModal}
        onClose={() => {
          setShowPrescriptionModal(false);
          setSelectedPatient(null);
        }}
        title="Prescriptions"
        maxWidth="max-w-4xl"
      >
        {selectedPatient && (
          <div className="p-6 space-y-6">
            <div className="bg-white/50 backdrop-blur-sm rounded-lg p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Prescriptions</h3>
              {/* Add prescription management form here */}
            </div>
          </div>
        )}
      </Modal>

      {/* Lab Results Modal */}
      <Modal
        isOpen={showLabResultsModal}
        onClose={() => {
          setShowLabResultsModal(false);
          setSelectedPatient(null);
        }}
        title="Lab Results"
        maxWidth="max-w-4xl"
      >
        {selectedPatient && (
          <div className="p-6 space-y-6">
            <div className="bg-white/50 backdrop-blur-sm rounded-lg p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Lab Results</h3>
              {/* Add lab results form/content here */}
            </div>
          </div>
        )}
      </Modal>

      {/* Insurance Modal */}
      <Modal
        isOpen={showInsuranceModal}
        onClose={() => {
          setShowInsuranceModal(false);
          setSelectedPatient(null);
        }}
        title="Insurance Information"
        maxWidth="max-w-4xl"
      >
        {selectedPatient && (
          <div className="p-6 space-y-6">
            <div className="bg-white/50 backdrop-blur-sm rounded-lg p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Insurance Information</h3>
              {/* Add insurance information form here */}
            </div>
          </div>
        )}
      </Modal>

      {/* Documents Modal */}
      <Modal
        isOpen={showDocumentsModal}
        onClose={() => {
          setShowDocumentsModal(false);
          setSelectedPatient(null);
          setSelectedFile(null);
          setDocumentType('');
          setDocumentDescription('');
          setDocumentDate('');
          setDocumentPriority('normal');
          setSelectedTags([]);
        }}
        title="Medical Documents"
        maxWidth="max-w-5xl"
      >
        {selectedPatient && (
          <div className="p-6 space-y-6">
            {/* Upload Section */}
            <div className="bg-white/50 backdrop-blur-sm rounded-lg p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Upload New Document</h3>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Document Type</label>
                    <select 
                      value={documentType}
                      onChange={(e) => setDocumentType(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm"
                    >
                      <option value="">Select Type</option>
                      <option value="Medical Report">Medical Report</option>
                      <option value="Lab Report">Lab Report</option>
                      <option value="X-Ray">X-Ray</option>
                      <option value="MRI Scan">MRI Scan</option>
                      <option value="CT Scan">CT Scan</option>
                      <option value="Ultrasound">Ultrasound</option>
                      <option value="ECG">ECG</option>
                      <option value="Prescription">Prescription</option>
                      <option value="Discharge Summary">Discharge Summary</option>
                      <option value="Surgical Report">Surgical Report</option>
                      <option value="Pathology Report">Pathology Report</option>
                      <option value="Vaccination Record">Vaccination Record</option>
                      <option value="Insurance Document">Insurance Document</option>
                      <option value="Consent Form">Consent Form</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">File</label>
                    <input
                      id="file-upload"
                      type="file"
                      onChange={handleFileSelect}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm"
                      accept=".pdf,.jpg,.jpeg,.png,.doc,.docx,.dicom"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Document Date</label>
                    <input
                      type="date"
                      value={documentDate}
                      onChange={(e) => setDocumentDate(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                    <select
                      value={documentPriority}
                      onChange={(e) => setDocumentPriority(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm"
                    >
                      <option value="low">Low</option>
                      <option value="normal">Normal</option>
                      <option value="high">High</option>
                      <option value="urgent">Urgent</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Tags</label>
                  <div className="flex flex-wrap gap-2 p-2 border border-gray-300 rounded-lg bg-white">
                    {availableDocumentTags.map(tag => (
                      <button
                        key={tag}
                        onClick={() => handleTagSelect(tag)}
                        className={`px-2 py-1 rounded-full text-sm ${
                          selectedTags.includes(tag)
                            ? 'bg-blue-100 text-blue-700 border border-blue-300'
                            : 'bg-gray-100 text-gray-700 border border-gray-300 hover:bg-gray-200'
                        }`}
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea
                    value={documentDescription}
                    onChange={(e) => setDocumentDescription(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm"
                    rows="2"
                    placeholder="Enter document description..."
                  ></textarea>
                </div>
                <div className="flex justify-end">
                  <button
                    onClick={handleFileUpload}
                    disabled={!selectedFile || !documentType}
                    className={`px-4 py-2 rounded-lg text-white ${
                      !selectedFile || !documentType
                        ? 'bg-gray-400 cursor-not-allowed'
                        : 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 shadow-md'
                    }`}
                  >
                    Upload Document
                  </button>
                </div>
              </div>
            </div>

            {/* Documents List */}
            <div className="bg-white/50 backdrop-blur-sm rounded-lg p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold text-gray-800">Uploaded Documents</h3>
                <div className="flex gap-4">
                  <div>
                    <input
                      type="text"
                      placeholder="Search documents..."
                      value={searchTermDocuments}
                      onChange={(e) => setSearchTermDocuments(e.target.value)}
                      className="px-3 py-1 border border-gray-300 rounded-lg bg-white text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm"
                    />
                  </div>
                  <div>
                    <select
                      value={filterTypeDocuments}
                      onChange={(e) => setFilterTypeDocuments(e.target.value)}
                      className="px-3 py-1 border border-gray-300 rounded-lg bg-white text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm"
                    >
                      <option value="all">All Types</option>
                      <option value="Medical Report">Medical Reports</option>
                      <option value="Lab Report">Lab Reports</option>
                      <option value="X-Ray">X-Rays</option>
                      <option value="MRI Scan">MRI Scans</option>
                      <option value="Prescription">Prescriptions</option>
                    </select>
                  </div>
                  <div>
                    <select
                      value={filterPriority}
                      onChange={(e) => setFilterPriority(e.target.value)}
                      className="px-3 py-1 border border-gray-300 rounded-lg bg-white text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm"
                    >
                      <option value="all">All Priorities</option>
                      <option value="urgent">Urgent</option>
                      <option value="high">High</option>
                      <option value="normal">Normal</option>
                      <option value="low">Low</option>
                    </select>
                  </div>
                  <div className="flex items-center gap-2">
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="px-3 py-1 border border-gray-300 rounded-lg bg-white text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm"
                    >
                      <option value="date">Date</option>
                      <option value="name">Name</option>
                      <option value="type">Type</option>
                      <option value="size">Size</option>
                      <option value="priority">Priority</option>
                    </select>
                    <button
                      onClick={() => setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc')}
                      className="p-1 rounded-lg hover:bg-gray-100"
                    >
                      {sortOrder === 'asc' ? '↑' : '↓'}
                    </button>
                  </div>
                </div>
              </div>
              {filteredAndSortedDocuments.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  No documents found
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredAndSortedDocuments.map((file) => (
                    <div
                      key={file.id}
                      className={`flex items-center justify-between p-4 bg-white rounded-lg shadow-sm border-l-4 ${
                        file.priority === 'urgent' ? 'border-red-500' :
                        file.priority === 'high' ? 'border-orange-500' :
                        file.priority === 'normal' ? 'border-blue-500' :
                        'border-gray-500'
                      }`}
                    >
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-800">{file.name}</h4>
                        <p className="text-sm text-gray-600">{file.description}</p>
                        <div className="flex flex-wrap items-center gap-2 mt-2">
                          <span className="px-2 py-1 bg-gray-100 rounded-full text-sm">{file.type}</span>
                          <span className="text-sm text-gray-500">•</span>
                          <span className="text-sm text-gray-500">{formatFileSize(file.size)}</span>
                          <span className="text-sm text-gray-500">•</span>
                          <span className="text-sm text-gray-500">
                            Document Date: {new Date(file.documentDate).toLocaleDateString()}
                          </span>
                          <span className="text-sm text-gray-500">•</span>
                          <span className="text-sm text-gray-500">
                            Uploaded: {new Date(file.uploadDate).toLocaleDateString()}
                          </span>
                          <span className="text-sm text-gray-500">•</span>
                          <span className="text-sm text-gray-500">By: {file.uploadedBy}</span>
                          <span className={`px-2 py-1 rounded-full text-sm ${
                            file.priority === 'urgent' ? 'bg-red-100 text-red-800' :
                            file.priority === 'high' ? 'bg-orange-100 text-orange-800' :
                            file.priority === 'normal' ? 'bg-blue-100 text-blue-800' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {file.priority ? file.priority.charAt(0).toUpperCase() + file.priority.slice(1) : 'Normal'}
                          </span>
                          {file.tags && file.tags.map(tag => (
                            <span key={tag} className="px-2 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">
                              {tag}
                            </span>
                          ))}
                          {file.version > 1 && (
                            <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                              v{file.version}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <a
                          href={file.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3 py-1 text-sm bg-blue-50 text-blue-600 hover:text-blue-700 rounded-lg hover:bg-blue-100 transition-colors"
                        >
                          View
                        </a>
                        <button
                          onClick={() => handleDeleteDocument(file.id)}
                          className="px-3 py-1 text-sm bg-red-50 text-red-600 hover:text-red-700 rounded-lg hover:bg-red-100 transition-colors"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Patients;
