
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { ANALYTICS_MOCK } from '../../constants';

interface CMSDashboardProps {
  moviesCount: number;
}

const CMSDashboard: React.FC<CMSDashboardProps> = ({ moviesCount }) => {
  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Platform Overview</h1>
          <p className="text-gray-400">Track your streaming performance and content health.</p>
        </div>
        <div className="flex gap-2">
          <button className="bg-white/5 hover:bg-white/10 px-4 py-2 rounded-lg text-sm border border-white/10 transition">Export PDF</button>
          <button className="bg-[#E50914] hover:bg-red-700 px-4 py-2 rounded-lg text-sm font-bold transition">Update Data</button>
        </div>
      </header>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Total Content', value: moviesCount, icon: 'fa-film', color: 'text-blue-500' },
          { label: 'Avg Watch Time', value: '42m', icon: 'fa-clock', color: 'text-green-500' },
          { label: 'Active Streams', value: '1,284', icon: 'fa-users', color: 'text-purple-500' },
          { label: 'Revenue Growth', value: '+12%', icon: 'fa-chart-line', color: 'text-red-500' }
        ].map((stat, i) => (
          <div key={i} className="bg-[#141414] p-6 rounded-2xl border border-white/5 hover:border-white/20 transition group">
            <div className="flex items-center justify-between mb-4">
              <div className={`w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center ${stat.color}`}>
                <i className={`fa-solid ${stat.icon} text-lg`}></i>
              </div>
              <span className="text-xs font-bold text-green-500 bg-green-500/10 px-2 py-1 rounded">Update</span>
            </div>
            <p className="text-gray-400 text-sm font-medium">{stat.label}</p>
            <h3 className="text-2xl font-bold mt-1">{stat.value}</h3>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-[#141414] p-8 rounded-2xl border border-white/5">
          <h3 className="text-lg font-bold mb-6">Weekly Viewership</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={ANALYTICS_MOCK}>
                <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                <XAxis dataKey="name" stroke="#666" fontSize={12} />
                <YAxis stroke="#666" fontSize={12} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#141414', border: '1px solid #333' }}
                  itemStyle={{ color: '#fff' }}
                />
                <Bar dataKey="views" fill="#E50914" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-[#141414] p-8 rounded-2xl border border-white/5">
          <h3 className="text-lg font-bold mb-6">User Retention (Hours)</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={ANALYTICS_MOCK}>
                <defs>
                  <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                <XAxis dataKey="name" stroke="#666" fontSize={12} />
                <YAxis stroke="#666" fontSize={12} />
                <Tooltip contentStyle={{ backgroundColor: '#141414', border: '1px solid #333' }} />
                <Area type="monotone" dataKey="watchTime" stroke="#8884d8" fillOpacity={1} fill="url(#colorPv)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CMSDashboard;
