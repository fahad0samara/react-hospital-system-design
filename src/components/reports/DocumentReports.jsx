import React from 'react';
import { FiFile, FiDownload, FiUpload, FiTrash2, FiPieChart, FiBarChart2 } from 'react-icons/fi';

export const DocumentReports = ({ darkMode }) => {
  // Function to fetch document data from localStorage
  const getDocuments = () => {
    const savedDocuments = localStorage.getItem('hospitalDocuments');
    return savedDocuments ? JSON.parse(savedDocuments) : [];
  };

  const documents = getDocuments();

  const getDocumentStats = () => {
    const totalDocuments = documents.length;
    const byPriority = documents.reduce((acc, doc) => {
      acc[doc.priority] = (acc[doc.priority] || 0) + 1;
      return acc;
    }, {});
    const byType = documents.reduce((acc, doc) => {
      const type = doc.type.split('/')[1]?.toUpperCase() || doc.type;
      acc[type] = (acc[type] || 0) + 1;
      return acc;
    }, {});
    
    const totalSize = documents.reduce((acc, doc) => {
      const base64Length = doc.content?.length || 0;
      const sizeInBytes = (base64Length * 0.75);
      return acc + sizeInBytes;
    }, 0);

    return { totalDocuments, byPriority, byType, totalSize };
  };

  const stats = getDocumentStats();

  const formatSize = (bytes) => {
    if (bytes === 0) return '0 KB';
    const k = 1024;
    const sizes = ['KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
  };

  const StatCard = ({ title, value, icon: Icon, color }) => (
    <div className={`p-4 rounded-lg ${
      darkMode ? 'bg-gray-800' : 'bg-white'
    } shadow-sm`}>
      <div className="flex items-center gap-3">
        <div className={`p-2 rounded-lg ${color}`}>
          <Icon className={`h-5 w-5 ${darkMode ? 'text-white' : 'text-gray-700'}`} />
        </div>
        <div>
          <h3 className={`text-sm font-medium ${
            darkMode ? 'text-gray-400' : 'text-gray-500'
          }`}>{title}</h3>
          <p className={`text-lg font-semibold ${
            darkMode ? 'text-white' : 'text-gray-900'
          }`}>{value}</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className={`min-h-screen p-6 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="mb-6">
        <h1 className={`text-2xl font-bold ${
          darkMode ? 'text-white' : 'text-gray-900'
        }`}>
          Document Analytics
        </h1>
        <p className={`mt-1 ${
          darkMode ? 'text-gray-400' : 'text-gray-500'
        }`}>
          Overview of document management system
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard
          title="Total Documents"
          value={stats.totalDocuments}
          icon={FiFile}
          color={darkMode ? 'bg-blue-600' : 'bg-blue-100'}
        />
        <StatCard
          title="Storage Used"
          value={formatSize(stats.totalSize)}
          icon={FiDownload}
          color={darkMode ? 'bg-green-600' : 'bg-green-100'}
        />
        <StatCard
          title="Today's Uploads"
          value={documents.filter(doc => 
            new Date(doc.uploadDate).toDateString() === new Date().toDateString()
          ).length}
          icon={FiUpload}
          color={darkMode ? 'bg-purple-600' : 'bg-purple-100'}
        />
        <StatCard
          title="Document Types"
          value={Object.keys(stats.byType).length}
          icon={FiPieChart}
          color={darkMode ? 'bg-orange-600' : 'bg-orange-100'}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Priority Distribution */}
        <div className={`p-6 rounded-lg ${
          darkMode ? 'bg-gray-800' : 'bg-white'
        }`}>
          <h2 className={`text-lg font-semibold mb-4 ${
            darkMode ? 'text-white' : 'text-gray-900'
          }`}>
            Priority Distribution
          </h2>
          <div className="space-y-4">
            {Object.entries(stats.byPriority).map(([priority, count]) => (
              <div key={priority} className="space-y-2">
                <div className="flex justify-between">
                  <span className={`capitalize ${
                    darkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    {priority}
                  </span>
                  <span className={`font-medium ${
                    darkMode ? 'text-gray-300' : 'text-gray-900'
                  }`}>
                    {count}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                  <div
                    className={`h-2.5 rounded-full ${
                      priority === 'urgent' ? 'bg-red-600' :
                      priority === 'high' ? 'bg-orange-500' :
                      priority === 'normal' ? 'bg-blue-500' :
                      'bg-green-500'
                    }`}
                    style={{ width: `${(count / stats.totalDocuments) * 100}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* File Type Distribution */}
        <div className={`p-6 rounded-lg ${
          darkMode ? 'bg-gray-800' : 'bg-white'
        }`}>
          <h2 className={`text-lg font-semibold mb-4 ${
            darkMode ? 'text-white' : 'text-gray-900'
          }`}>
            File Type Distribution
          </h2>
          <div className="space-y-4">
            {Object.entries(stats.byType).map(([type, count]) => (
              <div key={type} className="space-y-2">
                <div className="flex justify-between">
                  <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
                    {type}
                  </span>
                  <span className={`font-medium ${
                    darkMode ? 'text-gray-300' : 'text-gray-900'
                  }`}>
                    {count}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                  <div
                    className="h-2.5 rounded-full bg-purple-600"
                    style={{ width: `${(count / stats.totalDocuments) * 100}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
