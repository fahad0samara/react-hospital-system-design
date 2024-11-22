import React, { useState, useRef } from 'react';
import { useEmergency } from '../../context/EmergencyContext';
import { FiPrinter, FiDownload, FiFilter, FiCalendar, FiUser } from 'react-icons/fi';
import { useReactToPrint } from 'react-to-print';

const DoctorReports = () => {
  const { emergencyCases, doctors } = useEmergency();
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const [selectedDoctor, setSelectedDoctor] = useState('all');
  const componentRef = useRef();

  // Handle printing with custom styles
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    pageStyle: `
      @media print {
        @page {
          size: A4;
          margin: 20mm;
        }
        body {
          -webkit-print-color-adjust: exact;
          print-color-adjust: exact;
        }
      }
    `,
  });

  // Filter cases based on date range and doctor
  const filteredCases = emergencyCases.filter(emergency => {
    const caseDate = new Date(emergency.timestamp);
    const startDate = dateRange.start ? new Date(dateRange.start) : null;
    const endDate = dateRange.end ? new Date(dateRange.end) : null;

    const matchesDateRange = (!startDate || caseDate >= startDate) && 
                           (!endDate || caseDate <= endDate);
    const matchesDoctor = selectedDoctor === 'all' || 
                         (emergency.assignedDoctor && emergency.assignedDoctor.id === selectedDoctor);

    return matchesDateRange && matchesDoctor;
  });

  // Calculate doctor-specific statistics
  const doctorStats = doctors.reduce((stats, doctor) => {
    const doctorCases = filteredCases.filter(c => c.assignedDoctor?.id === doctor.id);
    stats[doctor.id] = {
      totalCases: doctorCases.length,
      critical: doctorCases.filter(c => c.severityLevel === 'critical').length,
      high: doctorCases.filter(c => c.severityLevel === 'high').length,
      medium: doctorCases.filter(c => c.severityLevel === 'medium').length,
      low: doctorCases.filter(c => c.severityLevel === 'low').length,
      resolved: doctorCases.filter(c => c.status === 'resolved').length,
    };
    return stats;
  }, {});

  // Export to CSV
  const exportToCSV = () => {
    const headers = ['Doctor', 'Case ID', 'Patient Name', 'Condition', 'Severity', 'Status', 'Date/Time'];
    const csvData = filteredCases.map(emergency => [
      emergency.assignedDoctor?.name || 'Unassigned',
      emergency.caseId,
      emergency.patientName,
      emergency.condition,
      emergency.severityLevel,
      emergency.status,
      new Date(emergency.timestamp).toLocaleString()
    ]);

    const csvContent = [headers, ...csvData]
      .map(row => row.join(','))
      .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `doctor-reports-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-800">Doctor Reports</h1>
            <div className="flex space-x-4">
              <button
                onClick={handlePrint}
                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                <FiPrinter className="mr-2" />
                Print Report
              </button>
              <button
                onClick={exportToCSV}
                className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                <FiDownload className="mr-2" />
                Export CSV
              </button>
            </div>
          </div>

          {/* Filters */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
              <input
                type="date"
                value={dateRange.start}
                onChange={(e) => setDateRange(prev => ({ ...prev, start: e.target.value }))}
                className="w-full rounded-lg border-gray-300"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
              <input
                type="date"
                value={dateRange.end}
                onChange={(e) => setDateRange(prev => ({ ...prev, end: e.target.value }))}
                className="w-full rounded-lg border-gray-300"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Select Doctor</label>
              <select
                value={selectedDoctor}
                onChange={(e) => setSelectedDoctor(e.target.value)}
                className="w-full rounded-lg border-gray-300"
              >
                <option value="all">All Doctors</option>
                {doctors.map(doctor => (
                  <option key={doctor.id} value={doctor.id}>
                    {doctor.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Printable Report Content */}
        <div ref={componentRef} className="bg-white rounded-lg shadow-sm p-6">
          {/* Doctor Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            {doctors.map(doctor => {
              const stats = doctorStats[doctor.id] || {};
              return (
                <div key={doctor.id} className="bg-white rounded-lg border p-4">
                  <div className="flex items-center space-x-3 mb-3">
                    <FiUser className="w-5 h-5 text-blue-500" />
                    <h3 className="font-medium text-gray-900">{doctor.name}</h3>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>Total Cases:</div>
                    <div className="font-medium">{stats.totalCases || 0}</div>
                    <div>Critical:</div>
                    <div className="font-medium text-red-600">{stats.critical || 0}</div>
                    <div>High Priority:</div>
                    <div className="font-medium text-orange-600">{stats.high || 0}</div>
                    <div>Resolved:</div>
                    <div className="font-medium text-green-600">{stats.resolved || 0}</div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Cases Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Doctor
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Case ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Patient
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Condition
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Severity
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date/Time
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredCases.map((emergency) => (
                  <tr key={emergency.caseId}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {emergency.assignedDoctor?.name || 'Unassigned'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {emergency.caseId}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {emergency.patientName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {emergency.condition}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full
                        ${emergency.severityLevel === 'critical' ? 'bg-red-100 text-red-800' :
                          emergency.severityLevel === 'high' ? 'bg-orange-100 text-orange-800' :
                          emergency.severityLevel === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-green-100 text-green-800'}`}>
                        {emergency.severityLevel}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full
                        ${emergency.status === 'active' ? 'bg-green-100 text-green-800' :
                          emergency.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-gray-100 text-gray-800'}`}>
                        {emergency.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(emergency.timestamp).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Report Footer */}
          <div className="mt-8 pt-8 border-t border-gray-200">
            <div className="text-sm text-gray-500">
              <p>Report generated on: {new Date().toLocaleString()}</p>
              <p>Total Records: {filteredCases.length}</p>
              <p>Doctor: {selectedDoctor === 'all' ? 'All Doctors' : doctors.find(d => d.id === selectedDoctor)?.name}</p>
              {dateRange.start && dateRange.end && (
                <p>Date Range: {dateRange.start} to {dateRange.end}</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorReports;
