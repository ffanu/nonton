
import React from 'react';
import { AdConfig, AdZone } from '../../types';

interface CMSAdManagerProps {
  adConfig: AdConfig;
  onUpdateAds: (config: AdConfig) => void;
}

const REVENUE_STRATEGY = [
  {
    format: 'Social Bar',
    tier: 'Extreme',
    ux: 'Minimal',
    suggestion: 'Best for bottom-right placement. Mimics notifications.',
    cpm: '$$$$$'
  },
  {
    format: 'Popunder',
    tier: 'Highest',
    ux: 'High',
    suggestion: 'Triggers on first click. Highest payout per user.',
    cpm: '$$$$$'
  },
  {
    format: 'Direct Link',
    tier: 'High',
    ux: 'None',
    suggestion: 'Attach to "Play" or "Download" buttons.',
    cpm: '$$$$'
  },
  {
    format: 'Native Banner',
    tier: 'Medium',
    ux: 'Minimal',
    suggestion: 'Place between "Trending" and "Action" rows.',
    cpm: '$$$'
  },
  {
    format: 'Display 728x90',
    tier: 'Low',
    ux: 'Medium',
    suggestion: 'Traditional banner for top or bottom bars.',
    cpm: '$$'
  }
];

const CMSAdManager: React.FC<CMSAdManagerProps> = ({ adConfig, onUpdateAds }) => {
  const handleToggle = (zoneId: string) => {
    const newZones = adConfig.zones.map(z => 
      z.id === zoneId ? { ...z, enabled: !z.enabled } : z
    );
    onUpdateAds({ ...adConfig, zones: newZones });
  };

  const handleCodeChange = (zoneId: string, code: string) => {
    const newZones = adConfig.zones.map(z => 
      z.id === zoneId ? { ...z, code } : z
    );
    onUpdateAds({ ...adConfig, zones: newZones });
  };

  return (
    <div className="max-w-6xl mx-auto space-y-10 animate-in fade-in duration-500">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Ad Placement & Revenue</h1>
          <p className="text-gray-400">Maximize your earnings with Adsterra while preserving viewer experience.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="bg-green-500/10 border border-green-500/20 px-4 py-2 rounded-xl">
             <span className="text-xs font-bold text-green-500 uppercase tracking-widest">Optimized for Adsterra</span>
          </div>
        </div>
      </header>

      {/* Revenue Strategy Guide Table */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 px-2">
           <i className="fa-solid fa-chart-line text-[#E50914]"></i>
           <h2 className="text-lg font-bold">Revenue Strategy Matrix</h2>
        </div>
        <div className="bg-[#141414] rounded-2xl border border-white/5 overflow-hidden shadow-xl">
          <table className="w-full text-left">
            <thead className="bg-white/5 border-b border-white/10">
              <tr>
                <th className="px-6 py-4 font-bold text-xs text-gray-500 uppercase tracking-wider">Ad Format</th>
                <th className="px-6 py-4 font-bold text-xs text-gray-500 uppercase tracking-wider">Revenue Tier</th>
                <th className="px-6 py-4 font-bold text-xs text-gray-500 uppercase tracking-wider">UX Impact</th>
                <th className="px-6 py-4 font-bold text-xs text-gray-500 uppercase tracking-wider">Strategic Suggestion</th>
                <th className="px-6 py-4 font-bold text-xs text-gray-500 uppercase tracking-wider text-right">CPM Est.</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {REVENUE_STRATEGY.map((item, idx) => (
                <tr key={idx} className="hover:bg-white/[0.02] transition">
                  <td className="px-6 py-4">
                    <span className="font-bold text-sm">{item.format}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`text-[10px] font-black px-2 py-0.5 rounded uppercase border ${
                      item.tier === 'Extreme' || item.tier === 'Highest' ? 'bg-red-500/10 text-red-500 border-red-500/20' : 
                      item.tier === 'High' ? 'bg-orange-500/10 text-orange-500 border-orange-500/20' :
                      'bg-blue-500/10 text-blue-500 border-blue-500/20'
                    }`}>
                      {item.tier}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`text-[10px] font-black px-2 py-0.5 rounded uppercase border ${
                      item.ux === 'Minimal' || item.ux === 'None' ? 'bg-green-500/10 text-green-500 border-green-500/20' : 
                      'bg-yellow-500/10 text-yellow-500 border-yellow-500/20'
                    }`}>
                      {item.ux}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-xs text-gray-400 max-w-xs">{item.suggestion}</p>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <span className="text-xs font-mono text-green-500 font-bold">{item.cpm}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Zone Management */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="flex items-center gap-2 px-2">
            <i className="fa-solid fa-toggle-on text-green-500"></i>
            <h2 className="text-lg font-bold">Active Placements</h2>
          </div>
          {adConfig.zones.map((zone) => (
            <div key={zone.id} className="bg-[#141414] p-6 rounded-2xl border border-white/5 space-y-4 hover:border-white/10 transition group">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${zone.enabled ? 'bg-[#E50914]/10 text-[#E50914]' : 'bg-white/5 text-gray-500'}`}>
                    <i className={`fa-solid ${zone.position === 'top' ? 'fa-window-maximize' : zone.position === 'video-overlay' ? 'fa-play-circle' : 'fa-window-minimize'}`}></i>
                  </div>
                  <div>
                    <h3 className="font-bold group-hover:text-[#E50914] transition-colors">{zone.name}</h3>
                    <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Zone ID: {zone.id}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`text-[9px] font-black uppercase ${zone.enabled ? 'text-green-500' : 'text-gray-600'}`}>
                    {zone.enabled ? 'Enabled' : 'Disabled'}
                  </span>
                  <button 
                    onClick={() => handleToggle(zone.id)}
                    className={`w-12 h-6 rounded-full relative transition-colors ${zone.enabled ? 'bg-green-500' : 'bg-white/10'}`}
                  >
                    <div className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow-sm transition-all ${zone.enabled ? 'right-1' : 'left-1'}`}></div>
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">HTML / Script Injection</label>
                  <span className="text-[9px] text-gray-600 font-mono">JS / IFRAME</span>
                </div>
                <textarea 
                  rows={4}
                  value={zone.code}
                  onChange={(e) => handleCodeChange(zone.id, e.target.value)}
                  placeholder="Paste Adsterra unit code (e.g., <script async src='...'></script>)"
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-xs font-mono focus:border-[#E50914] outline-none transition resize-none custom-scrollbar"
                />
              </div>
            </div>
          ))}
        </div>

        {/* Info Column */}
        <div className="space-y-6 lg:mt-11">
          <div className="bg-blue-500/5 border border-blue-500/10 p-8 rounded-3xl space-y-6">
            <h3 className="font-bold text-xl flex items-center gap-3">
              <i className="fa-solid fa-lightbulb text-blue-500"></i>
              Best Practices for Adsterra
            </h3>
            
            <div className="space-y-6">
               <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center shrink-0 text-blue-500">
                     <i className="fa-solid fa-1"></i>
                  </div>
                  <div>
                     <p className="font-bold text-sm">Use Social Bar for Mobile</p>
                     <p className="text-xs text-gray-400 mt-1 leading-relaxed">90% of your mobile revenue will come from Social Bar. It doesn't block content and looks native to the OS.</p>
                  </div>
               </div>
               
               <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center shrink-0 text-blue-500">
                     <i className="fa-solid fa-2"></i>
                  </div>
                  <div>
                     <p className="font-bold text-sm">Don't Overload</p>
                     <p className="text-xs text-gray-400 mt-1 leading-relaxed">Limit yourself to 3 ad units per page. Google search engines prioritize user experience; too many ads can hurt your SEO.</p>
                  </div>
               </div>

               <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center shrink-0 text-blue-500">
                     <i className="fa-solid fa-3"></i>
                  </div>
                  <div>
                     <p className="font-bold text-sm">Targeting & Niche</p>
                     <p className="text-xs text-gray-400 mt-1 leading-relaxed">Ensure your Adsterra profile is set to "Movies" category for the highest relevant CPMs in the streaming niche.</p>
                  </div>
               </div>
            </div>

            <button className="w-full bg-blue-500 hover:bg-blue-600 py-3 rounded-xl text-sm font-bold transition mt-4">
               Open Adsterra Dashboard
            </button>
          </div>

          <div className="bg-[#1c1c1c] p-8 rounded-3xl border border-white/5 space-y-6">
             <div className="flex items-center justify-between">
                <h4 className="font-bold">Monetization Pulse</h4>
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
             </div>
             <div className="space-y-4">
                <div className="flex justify-between items-end border-b border-white/5 pb-4">
                   <p className="text-xs text-gray-500">Est. Daily Earnings</p>
                   <p className="text-2xl font-black text-white">$242.40 <span className="text-[10px] text-green-500 ml-1 font-bold">+12%</span></p>
                </div>
                <div className="flex justify-between items-end border-b border-white/5 pb-4">
                   <p className="text-xs text-gray-500">Top Zone</p>
                   <p className="text-sm font-bold text-[#E50914]">Social Bar (Bottom)</p>
                </div>
                <div className="flex justify-between items-end">
                   <p className="text-xs text-gray-500">Average CPM</p>
                   <p className="text-sm font-bold text-white">$4.12</p>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CMSAdManager;
