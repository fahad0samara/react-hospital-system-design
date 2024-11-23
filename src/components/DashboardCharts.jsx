import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  ResponsiveContainer
} from 'recharts';

const getColors = (darkMode) => ({
  primary: darkMode ? '#60A5FA' : '#3B82F6', // blue
  success: darkMode ? '#34D399' : '#10B981', // green
  purple: darkMode ? '#A78BFA' : '#8B5CF6',
  warning: darkMode ? '#FBBF24' : '#F59E0B',
  danger: darkMode ? '#F87171' : '#EF4444',
  text: darkMode ? '#F3F4F6' : '#1F2937',
  subtext: darkMode ? '#9CA3AF' : '#4B5563',
  background: darkMode ? '#1F2937' : '#FFFFFF',
  grid: darkMode ? '#374151' : '#E5E7EB',
});

// Mock data for default values
const defaultData = {
  ageGroups: [
    { name: '0-17', value: 120 },
    { name: '18-24', value: 250 },
    { name: '25-34', value: 420 },
    { name: '35-44', value: 380 },
    { name: '45-54', value: 290 },
    { name: '55+', value: 340 }
  ],
  genderData: [
    { name: 'Male', value: 540 },
    { name: 'Female', value: 620 },
    { name: 'Other', value: 40 }
  ],
  patientTrends: {
    'Mon': 45,
    'Tue': 52,
    'Wed': 49,
    'Thu': 63,
    'Fri': 58,
    'Sat': 48,
    'Sun': 38
  },
  departmentPerformance: [
    { name: 'Emergency', value: 92 },
    { name: 'Surgery', value: 88 },
    { name: 'Pediatrics', value: 85 },
    { name: 'Cardiology', value: 90 },
    { name: 'Neurology', value: 87 }
  ]
};

const CustomTooltip = ({ active, payload, label, darkMode }) => {
  if (active && payload && payload.length) {
    const colors = getColors(darkMode);
    return (
      <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border p-2 rounded-lg shadow-lg`}>
        <p className={`text-sm font-medium ${darkMode ? 'text-gray-200' : 'text-gray-900'}`}>{label}</p>
        {payload.map((entry, index) => (
          <p key={index} className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            {`${entry.name}: ${entry.value}`}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const DashboardCharts = ({ 
  ageGroups = defaultData.ageGroups,
  genderData = defaultData.genderData,
  patientTrends = defaultData.patientTrends,
  departmentPerformance = defaultData.departmentPerformance,
  darkMode = false
}) => {
  const colors = getColors(darkMode);

  const chartProps = {
    style: {
      fontSize: '12px',
    }
  };

  const axisProps = {
    tick: { fill: colors.text },
    axisLine: { stroke: colors.grid },
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Patient Age Distribution */}
        <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-6 shadow-sm transition-colors duration-200`}>
          <h3 className={`text-lg font-semibold ${darkMode ? 'text-gray-100' : 'text-gray-800'} mb-4`}>
            Age Distribution
          </h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={ageGroups} {...chartProps}>
                <CartesianGrid strokeDasharray="3 3" stroke={colors.grid} />
                <XAxis dataKey="name" {...axisProps} />
                <YAxis {...axisProps} />
                <Tooltip content={<CustomTooltip darkMode={darkMode} />} />
                <Legend wrapperStyle={{ color: colors.text }} />
                <Bar dataKey="value" fill={colors.primary} name="Patients" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Gender Distribution */}
        <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-6 shadow-sm transition-colors duration-200`}>
          <h3 className={`text-lg font-semibold ${darkMode ? 'text-gray-100' : 'text-gray-800'} mb-4`}>
            Gender Distribution
          </h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart {...chartProps}>
                <Pie
                  data={genderData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {genderData.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={[colors.primary, colors.success, colors.purple][index % 3]} 
                    />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip darkMode={darkMode} />} />
                <Legend wrapperStyle={{ color: colors.text }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Patient Trends */}
        <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-6 shadow-sm transition-colors duration-200`}>
          <h3 className={`text-lg font-semibold ${darkMode ? 'text-gray-100' : 'text-gray-800'} mb-4`}>
            Weekly Patient Trends
          </h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart 
                data={Object.entries(patientTrends).map(([name, patients]) => ({ name, patients }))}
                {...chartProps}
              >
                <CartesianGrid strokeDasharray="3 3" stroke={colors.grid} />
                <XAxis dataKey="name" {...axisProps} />
                <YAxis {...axisProps} />
                <Tooltip content={<CustomTooltip darkMode={darkMode} />} />
                <Legend wrapperStyle={{ color: colors.text }} />
                <Line 
                  type="monotone" 
                  dataKey="patients" 
                  stroke={colors.primary} 
                  name="Daily Visits"
                  dot={{ fill: colors.primary }}
                  activeDot={{ r: 8, fill: colors.primary }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Department Performance */}
        <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-6 shadow-sm transition-colors duration-200`}>
          <h3 className={`text-lg font-semibold ${darkMode ? 'text-gray-100' : 'text-gray-800'} mb-4`}>
            Department Performance
          </h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={departmentPerformance} layout="vertical" {...chartProps}>
                <CartesianGrid strokeDasharray="3 3" stroke={colors.grid} />
                <XAxis type="number" {...axisProps} />
                <YAxis dataKey="name" type="category" {...axisProps} />
                <Tooltip content={<CustomTooltip darkMode={darkMode} />} />
                <Legend wrapperStyle={{ color: colors.text }} />
                <Bar dataKey="value" fill={colors.success} name="Performance Score" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardCharts;
