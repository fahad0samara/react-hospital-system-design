import AddPatientForm from '../components/AddPatientForm'
import PatientList from '../components/PatientList'

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <AddPatientForm />
      <PatientList />
    </div>
  )
}
