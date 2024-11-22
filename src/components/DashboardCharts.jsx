import React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  Legend
} from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const DashboardCharts = ({ ageGroups, genderData, patientTrends }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-6">
      {/* Patient Trends Chart */}
      <div className="col-span-full xl:col-span-2 rounded-2xl bg-white/30 backdrop-blur-lg p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Patient Trends</h2>
        <div className="h-[300px]">
          <ResponsiveContainer>
            <AreaChart data={patientTrends}>
              <defs>
                <linearGradient id="colorVisits" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0088FE" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#0088FE" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="name" stroke="#6B7280" />
              <YAxis stroke="#6B7280" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.8)',
                  borderRadius: '12px',
                  border: 'none',
                  backdropFilter: 'blur(8px)'
                }}
              />
              <Area 
                type="monotone" 
                dataKey="patients" 
                stroke="#0088FE" 
                fillOpacity={1} 
                fill="url(#colorVisits)" 
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Age Distribution */}
      <div className="rounded-2xl bg-white/30 backdrop-blur-lg p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Age Distribution</h2>
        <div className="h-[300px]">
          <ResponsiveContainer>
            <BarChart data={ageGroups}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="name" stroke="#6B7280" />
              <YAxis stroke="#6B7280" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.8)',
                  borderRadius: '12px',
                  border: 'none',
                  backdropFilter: 'blur(8px)'
                }}
              />
              <Bar dataKey="value" fill="rgba(59, 130, 246, 0.6)" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Gender Distribution */}
      <div className="rounded-2xl bg-white/30 backdrop-blur-lg p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Gender Distribution</h2>
        <div className="h-[300px]">
          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={genderData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {genderData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={`${COLORS[index % COLORS.length]}CC`} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.8)',
                  borderRadius: '12px',
                  border: 'none',
                  backdropFilter: 'blur(8px)'
                }}
              />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default DashboardCharts;
