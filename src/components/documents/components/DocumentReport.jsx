import React from 'react';
import { useTheme } from '../../../context/ThemeContext';
import { FiArrowLeft } from 'react-icons/fi';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from 'chart.js';
import { Bar, Pie } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const DocumentReport = ({ documents, onBack }) => {
  const { darkMode } = useTheme();

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  // Calculate statistics
  const totalSize = documents.reduce((sum, doc) => sum + doc.size, 0);
  const totalDocuments = documents.length;
  
  // Monthly uploads data
  const monthlyUploads = documents.reduce((acc, doc) => {
    const month = new Date(doc.uploadDate).toLocaleString('default', { month: 'short' });
    acc[month] = (acc[month] || 0) + 1;
    return acc;
  }, {});

  // Priority distribution data
  const priorityDistribution = documents.reduce((acc, doc) => {
    acc[doc.priority] = (acc[doc.priority] || 0) + 1;
    return acc;
  }, {});

  // File type distribution data
  const fileTypeDistribution = documents.reduce((acc, doc) => {
    const type = doc.type.split('/')[1].toUpperCase();
    acc[type] = (acc[type] || 0) + 1;
    return acc;
  }, {});

  // Most used tags
  const tagCounts = documents.reduce((acc, doc) => {
    doc.tags.forEach(tag => {
      acc[tag] = (acc[tag] || 0) + 1;
    });
    return acc;
  }, {});

  const topTags = Object.entries(tagCounts)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5);

  // Chart configurations
  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: darkMode ? '#fff' : '#000'
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          color: darkMode ? '#fff' : '#000'
        },
        grid: {
          color: darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'
        }
      },
      x: {
        ticks: {
          color: darkMode ? '#fff' : '#000'
        },
        grid: {
          color: darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'
        }
      }
    }
  };

  const monthlyData = {
    labels: Object.keys(monthlyUploads),
    datasets: [
      {
        label: 'Monthly Uploads',
        data: Object.values(monthlyUploads),
        backgroundColor: darkMode ? 'rgba(59, 130, 246, 0.8)' : 'rgba(59, 130, 246, 0.5)',
        borderColor: '#3b82f6',
        borderWidth: 1
      }
    ]
  };

  const priorityData = {
    labels: Object.keys(priorityDistribution),
    datasets: [
      {
        data: Object.values(priorityDistribution),
        backgroundColor: [
          'rgba(239, 68, 68, 0.8)',
          'rgba(234, 179, 8, 0.8)',
          'rgba(34, 197, 94, 0.8)'
        ],
        borderColor: [
          'rgb(239, 68, 68)',
          'rgb(234, 179, 8)',
          'rgb(34, 197, 94)'
        ],
        borderWidth: 1
      }
    ]
  };

  return (
    <div className={`min-h-screen p-6 ${
      darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'
    }`}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={onBack}
            className={`p-2 rounded-lg transition-colors ${
              darkMode
                ? 'hover:bg-gray-800 text-gray-400 hover:text-white'
                : 'hover:bg-gray-100 text-gray-500 hover:text-gray-700'
            }`}
          >
            <FiArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-2xl font-bold">Document Analytics</h1>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className={`p-6 rounded-lg ${
            darkMode ? 'bg-gray-800' : 'bg-white'
          }`}>
            <h3 className={`text-lg font-medium mb-2 ${
              darkMode ? 'text-gray-300' : 'text-gray-700'
            }`}>
              Total Documents
            </h3>
            <p className="text-3xl font-bold">{totalDocuments}</p>
          </div>

          <div className={`p-6 rounded-lg ${
            darkMode ? 'bg-gray-800' : 'bg-white'
          }`}>
            <h3 className={`text-lg font-medium mb-2 ${
              darkMode ? 'text-gray-300' : 'text-gray-700'
            }`}>
              Total Storage Used
            </h3>
            <p className="text-3xl font-bold">{formatFileSize(totalSize)}</p>
          </div>

          <div className={`p-6 rounded-lg ${
            darkMode ? 'bg-gray-800' : 'bg-white'
          }`}>
            <h3 className={`text-lg font-medium mb-2 ${
              darkMode ? 'text-gray-300' : 'text-gray-700'
            }`}>
              Most Used Tags
            </h3>
            <div className="flex flex-wrap gap-2">
              {topTags.map(([tag, count]) => (
                <span
                  key={tag}
                  className={`px-2 py-1 text-sm rounded-full ${
                    darkMode
                      ? 'bg-gray-700 text-gray-300'
                      : 'bg-gray-100 text-gray-700'
                  }`}
                >
                  {tag} ({count})
                </span>
              ))}
            </div>
          </div>

          <div className={`p-6 rounded-lg ${
            darkMode ? 'bg-gray-800' : 'bg-white'
          }`}>
            <h3 className={`text-lg font-medium mb-2 ${
              darkMode ? 'text-gray-300' : 'text-gray-700'
            }`}>
              File Types
            </h3>
            <div className="space-y-2">
              {Object.entries(fileTypeDistribution).map(([type, count]) => (
                <div key={type} className="flex justify-between">
                  <span>{type}</span>
                  <span>{count}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className={`p-6 rounded-lg ${
            darkMode ? 'bg-gray-800' : 'bg-white'
          }`}>
            <h3 className={`text-lg font-medium mb-4 ${
              darkMode ? 'text-gray-300' : 'text-gray-700'
            }`}>
              Monthly Upload Trends
            </h3>
            <Bar options={chartOptions} data={monthlyData} />
          </div>

          <div className={`p-6 rounded-lg ${
            darkMode ? 'bg-gray-800' : 'bg-white'
          }`}>
            <h3 className={`text-lg font-medium mb-4 ${
              darkMode ? 'text-gray-300' : 'text-gray-700'
            }`}>
              Priority Distribution
            </h3>
            <Pie
              options={{
                ...chartOptions,
                plugins: {
                  ...chartOptions.plugins,
                  legend: {
                    ...chartOptions.plugins.legend,
                    position: 'bottom'
                  }
                }
              }}
              data={priorityData}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentReport;
