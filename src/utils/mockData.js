// Generate random data for the dashboard
const generateRandomData = () => {
  const currentDate = new Date();
  const patients = [];
  const appointmentTypes = ['Emergency', 'Scheduled', 'Follow-up', 'Consultation'];
  const conditions = ['Fever', 'Check-up', 'Surgery', 'Dental', 'Eye Care', 'Cardiology'];
  const names = ['John Doe', 'Jane Smith', 'Mike Johnson', 'Sarah Wilson', 'David Brown', 'Emma Davis'];
  
  // Generate 20 random patients
  for (let i = 0; i < 20; i++) {
    const randomDate = new Date(currentDate);
    randomDate.setDate(currentDate.getDate() + Math.floor(Math.random() * 7));
    
    patients.push({
      id: i + 1,
      name: names[Math.floor(Math.random() * names.length)],
      age: Math.floor(Math.random() * 70) + 10,
      gender: Math.random() > 0.5 ? 'Male' : 'Female',
      appointmentType: appointmentTypes[Math.floor(Math.random() * appointmentTypes.length)],
      condition: conditions[Math.floor(Math.random() * conditions.length)],
      status: Math.random() > 0.3 ? 'Scheduled' : 'Completed',
      room: Math.floor(Math.random() * 10) + 101,
      time: `${Math.floor(Math.random() * 12) + 1}:${Math.random() > 0.5 ? '30' : '00'} ${Math.random() > 0.5 ? 'AM' : 'PM'}`,
      lastVisit: randomDate.toISOString().split('T')[0],
      type: Math.random() > 0.8 ? 'Emergency' : 'Regular'
    });
  }

  // Generate daily visits data for the last 7 days
  const dailyVisits = {};
  for (let i = 6; i >= 0; i--) {
    const date = new Date(currentDate);
    date.setDate(currentDate.getDate() - i);
    const dateStr = date.toLocaleDateString('en-US', { weekday: 'short' });
    dailyVisits[dateStr] = Math.floor(Math.random() * 20) + 5;
  }

  // Generate department performance data
  const departmentPerformance = [
    { name: 'Cardiology', value: Math.floor(Math.random() * 100) },
    { name: 'Neurology', value: Math.floor(Math.random() * 100) },
    { name: 'Pediatrics', value: Math.floor(Math.random() * 100) },
    { name: 'Orthopedics', value: Math.floor(Math.random() * 100) },
    { name: 'Oncology', value: Math.floor(Math.random() * 100) }
  ];

  // Calculate age distribution
  const ageGroups = [
    { name: 'Under 18', value: 0 },
    { name: '18-30', value: 0 },
    { name: '31-50', value: 0 },
    { name: 'Over 50', value: 0 }
  ];

  patients.forEach(patient => {
    if (patient.age < 18) ageGroups[0].value++;
    else if (patient.age <= 30) ageGroups[1].value++;
    else if (patient.age <= 50) ageGroups[2].value++;
    else ageGroups[3].value++;
  });

  // Calculate gender distribution
  const genderData = [
    { name: 'Male', value: patients.filter(p => p.gender === 'Male').length },
    { name: 'Female', value: patients.filter(p => p.gender === 'Female').length }
  ];

  return {
    patients,
    dailyVisits,
    departmentPerformance,
    ageGroups,
    genderData
  };
};

export const refreshData = () => {
  return generateRandomData();
};

export const initialData = generateRandomData();
