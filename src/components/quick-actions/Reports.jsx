import React, { useState } from 'react';
import { FiX, FiDownload, FiPrinter, FiShare2, FiFileText } from 'react-icons/fi';

const Reports = ({ isOpen, onClose }) => {
  const [selectedReport, setSelectedReport] = useState(null);
  const [dateRange, setDateRange] = useState({ start: '', end: '' });

  // Mock data for demonstration
  const mockReports = [
    { id: 1, name: 'Patient Statistics', type: 'analytics', date: '2024-01-15', status: 'completed' },
    { id: 2, name: 'Treatment Summary', type: 'medical', date: '2024-01-14', status: 'completed' },
    { id: 3, name: 'Appointments Overview', type: 'schedule', date: '2024-01-13', status: 'completed' },
    { id: 4, name: 'Emergency Cases', type: 'emergency', date: '2024-01-12', status: 'completed' },
    { id: 5, name: 'Medication Records', type: 'medical', date: '2024-01-11', status: 'completed' },
  ];

  const handleGenerateReport = () => {
    console.log('Generating report with date range:', dateRange);
  };

  const handleDownload = (report) => {
    console.log('Downloading report:', report.name);
  };

  const handlePrint = (report) => {
    console.log('Printing report:', report.name);
  };

  const handleShare = (report) => {
    console.log('Sharing report:', report.name);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl w-full max-w-4xl h-[600px] shadow-xl flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-2xl font-semibold text-gray-800">Reports</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <FiX className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 flex">
          {/* Left Panel - Report List */}
          <div className="w-1/3 border-r border-gray-200 p-6 space-y-4 bg-gray-50">
            <div className="space-y-4">
              <h3 className="font-semibold text-gray-800 text-lg">Generate New Report</h3>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Start Date</label>
                <input
                  type="date"
                  value={dateRange.start}
                  onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-300 bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">End Date</label>
                <input
                  type="date"
                  value={dateRange.end}
                  onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-300 bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
                />
              </div>
              <button
                onClick={handleGenerateReport}
                className="w-full px-4 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-md hover:shadow-lg font-medium"
              >
                Generate Report
              </button>
            </div>

            <div className="border-t border-gray-200 pt-4">
              <h3 className="font-semibold text-gray-800 text-lg mb-4">Recent Reports</h3>
              <div className="space-y-2">
                {mockReports.map((report) => (
                  <button
                    key={report.id}
                    onClick={() => setSelectedReport(report)}
                    className={`w-full p-4 rounded-xl text-left transition-all duration-200 ${
                      selectedReport?.id === report.id
                        ? 'bg-white border-2 border-blue-500 shadow-md'
                        : 'bg-white border border-gray-200 hover:border-blue-300 hover:shadow-md'
                    }`}
                  >
                    <div className="font-medium text-gray-800">{report.name}</div>
                    <div className="text-sm text-gray-500 mt-1">{report.date}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Panel - Report Preview */}
          <div className="flex-1 p-6 bg-gray-50">
            {selectedReport ? (
              <div className="h-full flex flex-col">
                <div className="flex justify-between items-center mb-6 bg-white p-4 rounded-xl shadow-sm">
                  <h3 className="text-xl font-semibold text-gray-800">{selectedReport.name}</h3>
                  <div className="flex space-x-3">
                    <button
                      onClick={() => handleDownload(selectedReport)}
                      className="p-2.5 bg-blue-50 hover:bg-blue-100 rounded-xl transition-colors text-blue-600 hover:text-blue-700 flex items-center space-x-2"
                    >
                      <FiDownload className="w-5 h-5" />
                      <span className="text-sm font-medium">Download</span>
                    </button>
                    <button
                      onClick={() => handlePrint(selectedReport)}
                      className="p-2.5 bg-green-50 hover:bg-green-100 rounded-xl transition-colors text-green-600 hover:text-green-700 flex items-center space-x-2"
                    >
                      <FiPrinter className="w-5 h-5" />
                      <span className="text-sm font-medium">Print</span>
                    </button>
                    <button
                      onClick={() => handleShare(selectedReport)}
                      className="p-2.5 bg-purple-50 hover:bg-purple-100 rounded-xl transition-colors text-purple-600 hover:text-purple-700 flex items-center space-x-2"
                    >
                      <FiShare2 className="w-5 h-5" />
                      <span className="text-sm font-medium">Share</span>
                    </button>
                  </div>
                </div>

                {/* Report Preview Content */}
                <div className="flex-1 bg-white rounded-xl p-6 shadow-sm overflow-auto">
                  <div className="space-y-6">
                    <div className="border-b border-gray-100 pb-4">
                      <h4 className="text-lg font-semibold text-gray-800 mb-4">Report Details</h4>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <span className="text-sm font-medium text-gray-500">Generated on</span>
                          <p className="text-gray-800">{selectedReport.date}</p>
                        </div>
                        <div className="space-y-1">
                          <span className="text-sm font-medium text-gray-500">Type</span>
                          <p className="text-gray-800 capitalize">{selectedReport.type}</p>
                        </div>
                        <div className="space-y-1">
                          <span className="text-sm font-medium text-gray-500">Status</span>
                          <p className="text-green-600 capitalize font-medium">{selectedReport.status}</p>
                        </div>
                      </div>
                    </div>
                    
                    {/* Sample Report Content */}
                    <div className="space-y-4">
                      <h5 className="font-medium text-gray-800">Summary</h5>
                      <p className="text-gray-600">
                        This report provides a comprehensive overview of {selectedReport.type} data 
                        and analytics for the specified time period.
                      </p>
                      {/* Add more sample content here */}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="h-full flex items-center justify-center text-gray-500 bg-white rounded-xl">
                <div className="text-center">
                  <FiFileText className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                  <p>Select a report to preview</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;
