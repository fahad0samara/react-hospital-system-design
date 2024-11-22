import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  patients: [
    {
      id: 1,
      name: 'John Doe',
      age: 45,
      gender: 'Male',
      phone: '+1 234-567-8900',
      lastVisit: '2024-03-15',
      condition: 'Hypertension',
      type: 'Regular',
      appointmentTime: '09:00 AM',
      appointmentType: 'Check-up',
      status: 'Completed'
    },
    {
      id: 2,
      name: 'Jane Smith',
      age: 32,
      gender: 'Female',
      phone: '+1 234-567-8901',
      lastVisit: '2024-03-18',
      condition: 'Diabetes',
      type: 'New',
      appointmentTime: '10:30 AM',
      appointmentType: 'Follow-up',
      status: 'In Progress'
    },
    {
      id: 3,
      name: 'Robert Johnson',
      age: 28,
      gender: 'Male',
      phone: '+1 234-567-8902',
      lastVisit: '2024-03-19',
      condition: 'Asthma',
      type: 'Emergency',
      appointmentTime: '02:00 PM',
      appointmentType: 'Consultation',
      status: 'Scheduled'
    },
    {
      id: 4,
      name: 'Emily Davis',
      age: 52,
      gender: 'Female',
      phone: '+1 234-567-8903',
      lastVisit: '2024-03-14',
      condition: 'Arthritis',
      type: 'Regular',
      appointmentTime: '11:00 AM',
      appointmentType: 'Follow-up',
      status: 'Scheduled'
    },
    {
      id: 5,
      name: 'Michael Wilson',
      age: 39,
      gender: 'Male',
      phone: '+1 234-567-8904',
      lastVisit: '2024-03-16',
      condition: 'Migraine',
      type: 'Regular',
      appointmentTime: '03:30 PM',
      appointmentType: 'Check-up',
      status: 'Scheduled'
    }
  ],
  dailyVisits: {
    'Mon': 4,
    'Tue': 6,
    'Wed': 8,
    'Thu': 5,
    'Fri': 7,
    'Sat': 3,
    'Sun': 2
  },
  notes: [
    { id: 1, text: 'Review lab results for Patient #123', completed: false },
    { id: 2, text: 'Follow up with Patient John regarding medication', completed: true },
    { id: 3, text: 'Prepare report for upcoming board meeting', completed: false }
  ],
  loading: false,
  error: null,
}

const patientSlice = createSlice({
  name: 'patient',
  initialState,
  reducers: {
    setPatients: (state, action) => {
      state.patients = action.payload
    },
    addPatient: (state, action) => {
      state.patients.push(action.payload)
    },
    updatePatient: (state, action) => {
      const index = state.patients.findIndex(p => p.id === action.payload.id)
      if (index !== -1) {
        state.patients[index] = action.payload
      }
    },
    deletePatient: (state, action) => {
      state.patients = state.patients.filter(p => p.id !== action.payload)
    },
    addNote: (state, action) => {
      state.notes.push(action.payload)
    },
    toggleNote: (state, action) => {
      const note = state.notes.find(n => n.id === action.payload)
      if (note) {
        note.completed = !note.completed
      }
    },
    updateDailyVisits: (state, action) => {
      state.dailyVisits = action.payload
    }
  }
})

export const { setPatients, addPatient, updatePatient, deletePatient, addNote, toggleNote, updateDailyVisits } = patientSlice.actions

export default patientSlice.reducer
