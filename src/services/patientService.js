// Mock data for development
const mockPatients = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 234 567 890',
    status: 'Active',
    lastVisit: '2023-12-01',
    medicalHistory: 'Hypertension, Diabetes Type 2',
    insuranceProvider: 'Blue Cross',
    insuranceId: 'BC123456789',
    appointments: [
      {
        id: 'a1',
        date: '2024-01-15',
        time: '10:00 AM',
        type: 'Regular Checkup',
        doctor: 'Dr. Smith',
      },
    ],
    prescriptions: [
      {
        id: 'p1',
        medication: 'Metformin',
        dosage: '500mg',
        frequency: 'Twice daily',
        startDate: '2023-11-01',
        endDate: '2024-02-01',
      },
    ],
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    phone: '+1 345 678 901',
    status: 'Active',
    lastVisit: '2023-12-05',
    medicalHistory: 'Asthma',
    insuranceProvider: 'Aetna',
    insuranceId: 'AE987654321',
    appointments: [],
    prescriptions: [],
  },
  // Add more mock patients as needed
];

// Simulated API calls
export const fetchPatients = async () => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // In a real application, this would be an API call
  return mockPatients;
};

export const getPatientById = async (id) => {
  await new Promise(resolve => setTimeout(resolve, 500));
  return mockPatients.find(patient => patient.id === id);
};

export const createPatient = async (patientData) => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  const newPatient = {
    id: String(mockPatients.length + 1),
    ...patientData,
    appointments: [],
    prescriptions: [],
  };
  mockPatients.push(newPatient);
  return newPatient;
};

export const updatePatient = async (id, patientData) => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  const index = mockPatients.findIndex(patient => patient.id === id);
  if (index === -1) throw new Error('Patient not found');
  
  mockPatients[index] = {
    ...mockPatients[index],
    ...patientData,
  };
  return mockPatients[index];
};

export const deletePatient = async (id) => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  const index = mockPatients.findIndex(patient => patient.id === id);
  if (index === -1) throw new Error('Patient not found');
  
  mockPatients.splice(index, 1);
  return true;
};

export const addAppointment = async (patientId, appointmentData) => {
  await new Promise(resolve => setTimeout(resolve, 500));
  const patient = mockPatients.find(p => p.id === patientId);
  if (!patient) throw new Error('Patient not found');

  const newAppointment = {
    id: `a${patient.appointments.length + 1}`,
    ...appointmentData,
  };
  patient.appointments.push(newAppointment);
  return newAppointment;
};

export const addPrescription = async (patientId, prescriptionData) => {
  await new Promise(resolve => setTimeout(resolve, 500));
  const patient = mockPatients.find(p => p.id === patientId);
  if (!patient) throw new Error('Patient not found');

  const newPrescription = {
    id: `p${patient.prescriptions.length + 1}`,
    ...prescriptionData,
  };
  patient.prescriptions.push(newPrescription);
  return newPrescription;
};
