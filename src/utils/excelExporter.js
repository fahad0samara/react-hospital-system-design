import * as XLSX from 'xlsx';

export const exportToExcel = (patients) => {
  // Prepare the data
  const data = patients.map(patient => ({
    ID: patient.id,
    Name: patient.name,
    Email: patient.email,
    Phone: patient.phone,
    Status: patient.status,
    'Last Visit': patient.lastVisit || 'N/A',
    'Medical History': patient.medicalHistory || 'N/A',
    'Insurance Provider': patient.insuranceProvider || 'N/A',
    'Insurance ID': patient.insuranceId || 'N/A',
  }));

  // Create worksheet
  const ws = XLSX.utils.json_to_sheet(data);

  // Set column widths
  const colWidths = [
    { wch: 10 }, // ID
    { wch: 20 }, // Name
    { wch: 25 }, // Email
    { wch: 15 }, // Phone
    { wch: 12 }, // Status
    { wch: 15 }, // Last Visit
    { wch: 30 }, // Medical History
    { wch: 20 }, // Insurance Provider
    { wch: 15 }, // Insurance ID
  ];
  ws['!cols'] = colWidths;

  // Create workbook
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Patients');

  // Generate Excel file
  XLSX.writeFile(wb, 'patient-records.xlsx');
};
