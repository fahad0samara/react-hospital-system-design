import React, { useState, useEffect } from 'react';
import { FiSearch, FiUser, FiPhone, FiMail, FiCalendar, FiPlus, FiMapPin, FiGrid, FiList } from 'react-icons/fi';
import AddPatient from '../quick-actions/AddPatient';

const Patients = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddPatient, setShowAddPatient] = useState(false);
  const [patients, setPatients] = useState([]);
  const [viewMode, setViewMode] = useState(() => {
    return localStorage.getItem('patientViewMode') || 'card';
  });

  // Load patients from localStorage on component mount
  useEffect(() => {
    const savedPatients = localStorage.getItem('patients');
    if (savedPatients) {
      setPatients(JSON.parse(savedPatients));
    }
  }, []);

  // Save patients to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('patients', JSON.stringify(patients));
  }, [patients]);

  // Save view mode to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('patientViewMode', viewMode);
  }, [viewMode]);

  const handleAddPatient = (newPatient) => {
    setPatients(prevPatients => [...prevPatients, newPatient]);
  };

  const filteredPatients = patients.filter(patient =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.condition.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
            <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
              View Details
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderCardView = (patient) => (
    <div
      key={patient.id}
      className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center mb-2">
            <h3 className="text-xl font-semibold text-gray-800">
              {patient.name}
            </h3>
            <span className="ml-3 px-2 py-1 bg-gray-100 text-gray-600 rounded text-sm">
              {patient.gender}
            </span>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center text-gray-600">
              <FiUser className="mr-2" />
              <span>Age: {patient.age}</span>
            </div>
            <div className="flex items-center text-gray-600">
              <FiPhone className="mr-2" />
              <span>{patient.phone}</span>
            </div>
            <div className="flex items-center text-gray-600">
              <FiMail className="mr-2" />
              <span>{patient.email}</span>
            </div>
            <div className="flex items-center text-gray-600">
              <FiCalendar className="mr-2" />
              <span>Next Visit: {patient.nextAppointment}</span>
            </div>
            <div className="flex items-center text-gray-600 col-span-2">
              <FiMapPin className="mr-2" />
              <span>{patient.address}</span>
            </div>
          </div>
          <div className="mt-4">
            <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
              {patient.condition}
            </span>
          </div>
        </div>
        <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
          View Details
        </button>
      </div>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-8">
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

        {/* Search Bar */}
        <div className="relative mb-6">
          <input
            type="text"
            placeholder="Search patients by name or condition..."
            className="w-full px-4 py-2 pl-10 pr-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <FiSearch className="absolute left-3 top-3 text-gray-400" />
        </div>

        {/* Patient List */}
        <div className={`grid gap-4 ${viewMode === 'card' ? 'md:grid-cols-1' : 'grid-cols-1'}`}>
          {filteredPatients.map(patient => 
            viewMode === 'card' ? renderCardView(patient) : renderListView(patient)
          )}
          {filteredPatients.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              No patients found. Try adjusting your search or add a new patient.
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
    </div>
  );
};

export default Patients;
