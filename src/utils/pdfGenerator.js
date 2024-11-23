import jsPDF from 'jspdf';
import 'jspdf-autotable';

export const generatePDF = (patients) => {
  const doc = new jsPDF();

  // Add title
  doc.setFontSize(18);
  doc.text('Patient Records', 14, 22);

  // Define the columns
  const columns = [
    { header: 'ID', dataKey: 'id' },
    { header: 'Name', dataKey: 'name' },
    { header: 'Email', dataKey: 'email' },
    { header: 'Phone', dataKey: 'phone' },
    { header: 'Status', dataKey: 'status' },
  ];

  // Prepare the data
  const data = patients.map(patient => ({
    id: patient.id,
    name: patient.name,
    email: patient.email,
    phone: patient.phone,
    status: patient.status,
  }));

  // Generate the table
  doc.autoTable({
    columns,
    body: data,
    startY: 30,
    theme: 'grid',
    styles: {
      fontSize: 10,
      cellPadding: 3,
      lineColor: [200, 200, 200],
      lineWidth: 0.1,
    },
    headStyles: {
      fillColor: [71, 85, 105],
      textColor: 255,
      fontSize: 11,
      fontStyle: 'bold',
    },
    alternateRowStyles: {
      fillColor: [245, 245, 245],
    },
  });

  // Add footer
  const pageCount = doc.internal.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(10);
    doc.text(
      `Page ${i} of ${pageCount}`,
      doc.internal.pageSize.width / 2,
      doc.internal.pageSize.height - 10,
      { align: 'center' }
    );
  }

  // Save the PDF
  doc.save('patient-records.pdf');
};
