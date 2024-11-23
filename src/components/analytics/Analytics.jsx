import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  FiActivity, FiUsers, FiCalendar, FiClock,
  FiTrendingUp, FiPieChart, FiBarChart2, FiArrowUp,
  FiArrowDown, FiAlertCircle, FiCheckCircle, FiDownload
} from 'react-icons/fi';
import {
  LineChart, Line, AreaChart, Area, BarChart, Bar,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell
} from 'recharts';
import { saveAs } from 'file-saver';
import { useTheme } from '../../context/ThemeContext';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

const StatCard = ({ title, value, icon: Icon, trend, trendValue, color }) => {
  const { darkMode } = useTheme();
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className={`${darkMode ? 'bg-gray-800' : 'bg-white'} p-6 rounded-xl shadow-md transition-colors duration-200`}
    >
      <div className="flex justify-between items-start">
        <div>
          <p className={`${darkMode ? 'text-gray-400' : 'text-gray-500'} text-sm`}>{title}</p>
          <h3 className={`text-2xl font-bold mt-1 ${darkMode ? 'text-white' : 'text-gray-800'}`}>{value}</h3>
          {trend && (
            <div className={`flex items-center mt-2 ${
              trend === 'up' ? 'text-green-500' : 'text-red-500'
            }`}>
              {trend === 'up' ? <FiArrowUp /> : <FiArrowDown />}
              <span className="ml-1 text-sm">{trendValue}%</span>
            </div>
          )}
        </div>
        <div className={`p-3 rounded-lg ${color}`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
    </motion.div>
  );
};

const Analytics = () => {
  const [timeRange, setTimeRange] = useState('week');
  const [loading, setLoading] = useState(true);
  const { darkMode } = useTheme();

  // Sample data - replace with real API data
  const patientData = [
    { name: 'Mon', value: 30 },
    { name: 'Tue', value: 45 },
    { name: 'Wed', value: 35 },
    { name: 'Thu', value: 50 },
    { name: 'Fri', value: 40 },
    { name: 'Sat', value: 25 },
    { name: 'Sun', value: 20 },
  ];

  const departmentData = [
    { name: 'Emergency', value: 400 },
    { name: 'Cardiology', value: 300 },
    { name: 'Pediatrics', value: 300 },
    { name: 'Neurology', value: 200 },
    { name: 'Orthopedics', value: 250 },
  ];

  const appointmentData = [
    { name: '9AM', scheduled: 4, completed: 3 },
    { name: '10AM', scheduled: 6, completed: 5 },
    { name: '11AM', scheduled: 5, completed: 4 },
    { name: '12PM', scheduled: 3, completed: 3 },
    { name: '2PM', scheduled: 4, completed: 4 },
    { name: '3PM', scheduled: 5, completed: 3 },
    { name: '4PM', scheduled: 4, completed: 2 },
  ];

  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const exportData = () => {
    const csvData = [
      ['Day', 'Patients'],
      ...patientData.map(row => [row.name, row.value])
    ];
    const csvContent = csvData.map(e => e.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    saveAs(blob, 'patient_data.csv');
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-50'} p-6 transition-colors duration-200`}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>Analytics Dashboard</h1>
            <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'} mt-2`}>Track your hospital performance metrics</p>
          </div>
          <button
            onClick={exportData}
            className="flex items-center space-x-2 bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600 transition"
          >
            <FiDownload className="w-5 h-5" />
            <span>Export CSV</span>
          </button>
        </div>

        {/* Time Range Selector */}
        <div className="mb-6 flex space-x-2">
          {['day', 'week', 'month', 'year'].map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                timeRange === range
                  ? 'bg-blue-500 text-white'
                  : darkMode 
                    ? 'bg-gray-800 text-gray-300 hover:bg-gray-700' 
                    : 'bg-white text-gray-600 hover:bg-gray-50'
              }`}
            >
              {range.charAt(0).toUpperCase() + range.slice(1)}
            </button>
          ))}
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total Patients"
            value="1,234"
            icon={FiUsers}
            trend="up"
            trendValue="12"
            color="bg-blue-500"
          />
          <StatCard
            title="Appointments Today"
            value="48"
            icon={FiCalendar}
            trend="up"
            trendValue="8"
            color="bg-green-500"
          />
          <StatCard
            title="Average Wait Time"
            value="14 min"
            icon={FiClock}
            trend="down"
            trendValue="5"
            color="bg-orange-500"
          />
          <StatCard
            title="Success Rate"
            value="96%"
            icon={FiActivity}
            trend="up"
            trendValue="2"
            color="bg-purple-500"
          />
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Patient Trends */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`${darkMode ? 'bg-gray-800' : 'bg-white'} p-6 rounded-xl shadow-md transition-colors duration-200`}
          >
            <h3 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>Patient Trends</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={patientData}>
                  <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? '#374151' : '#e5e7eb'} />
                  <XAxis 
                    dataKey="name" 
                    stroke={darkMode ? '#9CA3AF' : '#4B5563'}
                  />
                  <YAxis 
                    stroke={darkMode ? '#9CA3AF' : '#4B5563'}
                  />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: darkMode ? '#1F2937' : '#FFFFFF',
                      border: 'none',
                      borderRadius: '8px',
                      color: darkMode ? '#F3F4F6' : '#1F2937'
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="value"
                    stroke="#0088FE"
                    fill="#0088FE"
                    fillOpacity={darkMode ? 0.3 : 0.2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Department Distribution */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`${darkMode ? 'bg-gray-800' : 'bg-white'} p-6 rounded-xl shadow-md transition-colors duration-200`}
          >
            <h3 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>Department Distribution</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={departmentData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={120}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {departmentData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: darkMode ? '#1F2937' : '#FFFFFF',
                      border: 'none',
                      borderRadius: '8px',
                      color: darkMode ? '#F3F4F6' : '#1F2937'
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Appointment Statistics */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`${darkMode ? 'bg-gray-800' : 'bg-white'} p-6 rounded-xl shadow-md lg:col-span-2 transition-colors duration-200`}
          >
            <h3 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>Today's Appointments</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={appointmentData}>
                  <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? '#374151' : '#e5e7eb'} />
                  <XAxis 
                    dataKey="name" 
                    stroke={darkMode ? '#9CA3AF' : '#4B5563'}
                  />
                  <YAxis 
                    stroke={darkMode ? '#9CA3AF' : '#4B5563'}
                  />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: darkMode ? '#1F2937' : '#FFFFFF',
                      border: 'none',
                      borderRadius: '8px',
                      color: darkMode ? '#F3F4F6' : '#1F2937'
                    }}
                  />
                  <Bar dataKey="scheduled" fill="#0088FE" name="Scheduled" />
                  <Bar dataKey="completed" fill="#00C49F" name="Completed" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        </div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`${darkMode ? 'bg-gray-800' : 'bg-white'} p-6 rounded-xl shadow-md transition-colors duration-200`}
        >
          <h3 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>Recent Activity</h3>
          <div className="space-y-4">
            {[
              { icon: FiCheckCircle, color: 'text-green-500', text: 'Dr. Smith completed appointment with Patient #1234' },
              { icon: FiAlertCircle, color: 'text-orange-500', text: 'New emergency case registered in ER' },
              { icon: FiCalendar, color: 'text-blue-500', text: '5 new appointments scheduled for tomorrow' },
              { icon: FiActivity, color: 'text-purple-500', text: 'Monthly report generated for Department heads' },
            ].map((activity, index) => (
              <div key={index} className="flex items-center space-x-3">
                <activity.icon className={`w-5 h-5 ${activity.color}`} />
                <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{activity.text}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Analytics;
