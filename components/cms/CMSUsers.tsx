
import React from 'react';

const MOCK_USERS = [
  { id: '1', name: 'Alex Thompson', email: 'alex.t@example.com', plan: 'Premium', status: 'Active', avatar: 'https://i.pravatar.cc/150?u=1' },
  { id: '2', name: 'Sarah Chen', email: 'sarah.c@example.com', plan: 'Standard', status: 'Active', avatar: 'https://i.pravatar.cc/150?u=2' },
  { id: '3', name: 'Michael Ross', email: 'mike.r@example.com', plan: 'Basic', status: 'Inactive', avatar: 'https://i.pravatar.cc/150?u=3' },
  { id: '4', name: 'Emma Wilson', email: 'emma.w@example.com', plan: 'Premium', status: 'Active', avatar: 'https://i.pravatar.cc/150?u=4' },
];

const CMSUsers: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto">
      <header className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">User Management</h1>
          <p className="text-gray-400">View and manage subscriber profiles and billing status.</p>
        </div>
        <div className="flex gap-2">
          <div className="relative">
            <i className="fa-solid fa-magnifying-glass absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"></i>
            <input 
              type="text" 
              placeholder="Search users..." 
              className="bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:border-[#E50914] transition w-64"
            />
          </div>
        </div>
      </header>

      <div className="bg-[#141414] rounded-2xl border border-white/5 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-white/5 border-b border-white/10">
            <tr>
              <th className="px-6 py-4 font-bold text-sm text-gray-400">User</th>
              <th className="px-6 py-4 font-bold text-sm text-gray-400">Plan</th>
              <th className="px-6 py-4 font-bold text-sm text-gray-400">Status</th>
              <th className="px-6 py-4 font-bold text-sm text-gray-400">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {MOCK_USERS.map(user => (
              <tr key={user.id} className="hover:bg-white/[0.02] transition">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <img src={user.avatar} className="w-10 h-10 rounded-full border border-white/10" alt="" />
                    <div>
                      <p className="font-bold text-sm">{user.name}</p>
                      <p className="text-xs text-gray-500">{user.email}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={`text-xs px-2 py-1 rounded font-bold ${
                    user.plan === 'Premium' ? 'bg-purple-500/10 text-purple-400 border border-purple-500/20' : 
                    user.plan === 'Standard' ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' : 
                    'bg-gray-500/10 text-gray-400 border border-gray-500/20'
                  }`}>
                    {user.plan}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full ${user.status === 'Active' ? 'bg-green-500' : 'bg-gray-500'}`}></span>
                    <span className="text-sm">{user.status}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <button className="text-gray-400 hover:text-white transition bg-white/5 p-2 rounded-lg">
                    <i className="fa-solid fa-ellipsis"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CMSUsers;
