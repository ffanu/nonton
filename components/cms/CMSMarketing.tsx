
import React, { useState } from 'react';
import { Movie } from '../../types';

interface CMSMarketingProps {
  movies: Movie[];
  onSetFeatured: (id: string) => void;
  marketingConfig: {
    heroTitle: string;
    heroSubtitle: string;
    ctaHeadline: string;
    ctaSubtext: string;
    announcement: string;
    showAnnouncement: boolean;
  };
  onUpdateConfig: (config: any) => void;
}

const DEFAULT_MARKETING = {
  heroTitle: 'Featured Now',
  heroSubtitle: 'StreamPulse Original',
  ctaHeadline: 'Ready to watch?',
  ctaSubtext: 'Enter your email to create or restart your membership and get notified about new movie releases.',
  announcement: 'Special Offer: Get 3 months of Premium for the price of 1!',
  showAnnouncement: false
};

const CMSMarketing: React.FC<CMSMarketingProps> = ({ 
  movies, 
  onSetFeatured, 
  marketingConfig, 
  onUpdateConfig 
}) => {
  const [localConfig, setLocalConfig] = useState(marketingConfig);
  const [previewDevice, setPreviewDevice] = useState<'desktop' | 'mobile'>('desktop');
  const featuredMovie = movies.find(m => m.featured) || movies[0];

  const handleSave = () => {
    onUpdateConfig(localConfig);
    alert('Marketing configuration published successfully!');
  };

  const handleReset = () => {
    if (confirm('Are you sure you want to reset all copy to factory defaults?')) {
      setLocalConfig(DEFAULT_MARKETING);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 md:space-y-12 animate-in fade-in duration-700">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">Hero & Marketing</h1>
          <p className="text-sm text-gray-400">Design the first impression for your viewers and manage promotional content.</p>
        </div>
        <div className="flex gap-2 md:gap-3">
          <button 
            onClick={handleReset}
            className="flex-1 md:flex-none bg-white/5 hover:bg-white/10 px-4 md:px-6 py-2.5 rounded-xl font-bold transition border border-white/10 text-xs md:text-sm"
          >
            Reset
          </button>
          <button 
            onClick={handleSave}
            className="flex-1 md:flex-none bg-[#E50914] hover:bg-red-700 px-6 md:px-8 py-2.5 rounded-xl font-bold transition shadow-lg shadow-red-500/20 text-xs md:text-sm"
          >
            Publish Changes
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Editor */}
        <div className="lg:col-span-2 space-y-6 md:space-y-8">
          {/* Hero Selection Section */}
          <section className="bg-[#141414] p-5 md:p-8 rounded-2xl md:rounded-3xl border border-white/5 space-y-6 md:space-y-8 shadow-sm">
            <div className="flex items-center justify-between">
               <div>
                 <h3 className="font-bold text-base md:text-lg flex items-center gap-2">
                   <i className="fa-solid fa-star text-yellow-500"></i>
                   Hero Spotlight
                 </h3>
                 <p className="text-[10px] md:text-xs text-gray-500 mt-1">Primary movie on the landing page.</p>
               </div>
               <span className="text-[9px] md:text-[10px] bg-green-500/10 text-green-500 px-2 md:px-3 py-1 md:py-1.5 rounded-full font-black uppercase border border-green-500/20">Live</span>
            </div>
            
            <div className="flex flex-col md:flex-row gap-4 md:gap-8 items-center bg-black/20 p-4 md:p-6 rounded-2xl border border-white/5">
               <div className="w-full md:w-1/2 aspect-video rounded-xl overflow-hidden border-2 md:border-4 border-[#E50914] shadow-2xl shadow-red-500/10 group relative">
                  <img src={featuredMovie.thumbnail} className="w-full h-full object-cover" alt="" />
                  <div className="absolute top-2 left-2 md:top-4 md:left-4 bg-[#E50914] px-2 py-0.5 md:px-3 md:py-1 rounded text-[8px] md:text-[10px] font-black uppercase">Active</div>
               </div>
               <div className="flex-1 space-y-2 md:space-y-3 w-full">
                  <div className="flex items-center gap-2">
                    <span className="text-[8px] md:text-[10px] bg-white/5 px-2 py-0.5 rounded text-gray-400 font-bold uppercase tracking-widest">{featuredMovie.category}</span>
                    <span className="text-[8px] md:text-[10px] border border-gray-700 px-1.5 py-0.5 rounded text-gray-500 font-bold uppercase">{featuredMovie.rating}</span>
                  </div>
                  <h4 className="text-xl md:text-2xl font-black truncate">{featuredMovie.title}</h4>
                  <p className="text-xs md:text-sm text-gray-400 leading-relaxed line-clamp-2 md:line-clamp-3">{featuredMovie.description}</p>
                  <div className="flex gap-4 pt-1">
                     <span className="text-[10px] md:text-xs text-gray-500"><i className="fa-solid fa-calendar mr-2"></i> {featuredMovie.year}</span>
                     <span className="text-[10px] md:text-xs text-gray-500"><i className="fa-solid fa-clock mr-2"></i> {featuredMovie.duration}</span>
                  </div>
               </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-[10px] md:text-xs font-bold text-gray-500 uppercase tracking-widest">Select New Hero</label>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 md:gap-4">
                {movies.filter(m => m.id !== featuredMovie.id).slice(0, 4).map(movie => (
                  <button 
                    key={movie.id}
                    onClick={() => onSetFeatured(movie.id)}
                    className="relative aspect-video rounded-lg md:rounded-xl overflow-hidden group border border-white/5 hover:border-[#E50914] transition-all duration-300"
                  >
                    <img src={movie.thumbnail} className="w-full h-full object-cover opacity-50 group-hover:opacity-100 transition" alt="" />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition bg-black/60 backdrop-blur-[1px]">
                       <div className="bg-[#E50914] w-6 h-6 md:w-8 md:h-8 rounded-full flex items-center justify-center shadow-lg">
                          <i className="fa-solid fa-thumbtack text-white text-[10px] md:text-xs"></i>
                       </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </section>

          {/* Landing Copy Editor Section */}
          <section className="bg-[#141414] p-5 md:p-8 rounded-2xl md:rounded-3xl border border-white/5 space-y-6 md:space-y-8">
             <h3 className="font-bold text-base md:text-lg flex items-center gap-2">
               <i className="fa-solid fa-pen-to-square text-blue-500"></i>
               Marketing Messaging
             </h3>
             
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                <div className="space-y-5 md:space-y-6">
                   <div className="space-y-2">
                      <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Main CTA Headline</label>
                      <input 
                        type="text" 
                        value={localConfig.ctaHeadline}
                        onChange={e => setLocalConfig({...localConfig, ctaHeadline: e.target.value})}
                        className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 md:py-3 text-sm focus:border-red-500 outline-none transition"
                      />
                   </div>
                   <div className="space-y-2">
                      <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">CTA Subtext</label>
                      <textarea 
                        rows={3}
                        value={localConfig.ctaSubtext}
                        onChange={e => setLocalConfig({...localConfig, ctaSubtext: e.target.value})}
                        className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 md:py-3 text-sm focus:border-red-500 outline-none transition resize-none leading-relaxed"
                      />
                   </div>
                </div>

                <div className="space-y-5 md:space-y-6">
                   <div className="space-y-4 bg-white/5 p-4 md:p-6 rounded-2xl border border-white/10">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                           <div className={`w-8 h-8 md:w-10 md:h-10 rounded-lg flex items-center justify-center ${localConfig.showAnnouncement ? 'bg-red-500/20 text-red-500' : 'bg-gray-500/10 text-gray-500'}`}>
                              <i className="fa-solid fa-bullhorn text-sm"></i>
                           </div>
                           <div>
                              <p className="text-[10px] md:text-xs font-bold">Banner</p>
                              <p className="text-[8px] md:text-[10px] text-gray-500">Site-wide promo</p>
                           </div>
                        </div>
                        <button 
                          onClick={() => setLocalConfig({...localConfig, showAnnouncement: !localConfig.showAnnouncement})}
                          className={`w-10 md:w-12 h-5 md:h-6 rounded-full relative transition-all duration-300 ${localConfig.showAnnouncement ? 'bg-[#E50914]' : 'bg-white/10'}`}
                        >
                          <div className={`absolute top-0.5 md:top-1 w-4 h-4 rounded-full bg-white shadow-sm transition-all duration-300 ${localConfig.showAnnouncement ? 'right-0.5 md:right-1' : 'left-0.5 md:left-1'}`}></div>
                        </button>
                      </div>
                      
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Message</label>
                        <input 
                          type="text" 
                          disabled={!localConfig.showAnnouncement}
                          value={localConfig.announcement}
                          onChange={e => setLocalConfig({...localConfig, announcement: e.target.value})}
                          className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 md:py-3 text-sm focus:border-red-500 outline-none transition disabled:opacity-30"
                        />
                      </div>
                   </div>
                </div>
             </div>
          </section>
        </div>

        {/* Right Column: Interactive Live Preview with Device Toggle */}
        <div className="space-y-4 md:space-y-6">
           <div className="flex items-center justify-between px-2">
             <label className="text-[10px] md:text-xs font-bold text-gray-500 uppercase tracking-widest">Live Preview</label>
             <div className="flex bg-white/5 p-1 rounded-lg border border-white/10">
                <button 
                  onClick={() => setPreviewDevice('desktop')}
                  className={`w-8 h-8 rounded flex items-center justify-center transition-all ${previewDevice === 'desktop' ? 'bg-[#E50914] text-white' : 'text-gray-500 hover:text-gray-300'}`}
                  title="Desktop View"
                >
                  <i className="fa-solid fa-desktop text-xs"></i>
                </button>
                <button 
                  onClick={() => setPreviewDevice('mobile')}
                  className={`w-8 h-8 rounded flex items-center justify-center transition-all ${previewDevice === 'mobile' ? 'bg-[#E50914] text-white' : 'text-gray-500 hover:text-gray-300'}`}
                  title="Mobile View"
                >
                  <i className="fa-solid fa-mobile-screen text-xs"></i>
                </button>
             </div>
           </div>
           
           <div className={`mx-auto transition-all duration-500 ease-in-out ${previewDevice === 'mobile' ? 'max-w-[280px]' : 'max-w-full'}`}>
              <div className={`bg-[#141414] overflow-hidden shadow-2xl sticky top-8 transition-all duration-500 ${previewDevice === 'mobile' ? 'rounded-[3rem] border-[8px] border-[#0a0a0a] ring-1 ring-white/10 h-[560px]' : 'rounded-2xl md:rounded-[2rem] border border-white/10'}`}>
                {/* Device specific chrome */}
                {previewDevice === 'desktop' ? (
                  <div className="bg-white/5 p-3 flex items-center gap-2 border-b border-white/5">
                     <div className="flex gap-1">
                        <div className="w-1.5 h-1.5 rounded-full bg-red-500/40"></div>
                        <div className="w-1.5 h-1.5 rounded-full bg-yellow-500/40"></div>
                        <div className="w-1.5 h-1.5 rounded-full bg-green-500/40"></div>
                     </div>
                     <div className="flex-1 bg-black/40 h-4 rounded-md flex items-center px-2 text-[6px] text-gray-600">streampulse.com</div>
                  </div>
                ) : (
                  <div className="h-6 w-full flex justify-center pt-2">
                    <div className="w-20 h-4 bg-[#0a0a0a] rounded-full"></div>
                  </div>
                )}
                
                <div className={`relative overflow-y-auto no-scrollbar ${previewDevice === 'mobile' ? 'h-full' : ''}`}>
                  {/* Announcement Bar Preview */}
                  {localConfig.showAnnouncement && (
                    <div className={`bg-[#E50914] text-white px-4 text-center font-bold animate-in slide-in-from-top duration-500 ${previewDevice === 'mobile' ? 'py-1 text-[7px]' : 'py-1.5 text-[9px]'}`}>
                      {localConfig.announcement}
                    </div>
                  )}
                  
                  {/* Mini Hero Preview */}
                  <div className={`relative ${previewDevice === 'mobile' ? 'aspect-[3/4]' : 'aspect-video'}`}>
                      <img src={featuredMovie.thumbnail} className="w-full h-full object-cover" alt="" />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-transparent to-transparent"></div>
                      <div className={`absolute left-4 right-4 space-y-2 ${previewDevice === 'mobile' ? 'bottom-4' : 'bottom-6'}`}>
                        <div className="flex items-center gap-1.5">
                            <div className="w-3 h-3 bg-[#E50914] rounded-sm flex items-center justify-center text-[5px] font-black">N</div>
                            <h5 className={`font-black text-white uppercase tracking-[0.1em] opacity-80 ${previewDevice === 'mobile' ? 'text-[6px]' : 'text-[8px]'}`}>Original</h5>
                        </div>
                        <h4 className={`font-black leading-tight drop-shadow-lg tracking-tighter ${previewDevice === 'mobile' ? 'text-lg' : 'text-2xl'}`}>{featuredMovie.title}</h4>
                        <div className="flex gap-2">
                            <div className={`bg-white rounded-sm ${previewDevice === 'mobile' ? 'w-10 h-3' : 'w-12 h-4'}`}></div>
                            <div className={`bg-white/20 rounded-sm ${previewDevice === 'mobile' ? 'w-10 h-3' : 'w-12 h-4'}`}></div>
                        </div>
                      </div>
                  </div>

                  {/* Subscription Section Preview */}
                  <div className={`bg-[#141414] text-center border-t border-white/5 ${previewDevice === 'mobile' ? 'p-6 space-y-4 pb-20' : 'p-10 space-y-5'}`}>
                      <h5 className={`font-black leading-tight tracking-tight ${previewDevice === 'mobile' ? 'text-sm px-2' : 'text-xl'}`}>{localConfig.ctaHeadline}</h5>
                      <p className={`text-gray-500 leading-relaxed line-clamp-2 ${previewDevice === 'mobile' ? 'text-[8px] px-1' : 'text-[10px] px-4'}`}>{localConfig.ctaSubtext}</p>
                      <div className={`mx-auto w-full ${previewDevice === 'mobile' ? 'flex flex-col gap-2 max-w-[180px]' : 'flex gap-2 max-w-[220px]'}`}>
                        <div className={`bg-black/40 border border-white/10 rounded-md ${previewDevice === 'mobile' ? 'h-7' : 'flex-1 h-9'}`}></div>
                        <div className={`bg-[#E50914] rounded-md shadow-lg shadow-red-500/10 ${previewDevice === 'mobile' ? 'h-7' : 'w-20 h-9'}`}></div>
                      </div>
                  </div>
                </div>
                
                {/* Device specific footer */}
                {previewDevice === 'mobile' && (
                  <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-24 h-1 bg-white/20 rounded-full"></div>
                )}
              </div>
           </div>
           
           <div className="p-4 md:p-6 bg-[#1c1c1c] rounded-2xl border border-dashed border-white/10 flex flex-col items-center text-center gap-3">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-white/5 rounded-full flex items-center justify-center text-gray-400">
                 <i className="fa-solid fa-wand-sparkles text-base md:text-lg"></i>
              </div>
              <div>
                <p className="text-xs font-bold">AI Copywriter</p>
                <p className="text-[9px] md:text-[10px] text-gray-500 mt-1">Generate high-converting headlines.</p>
              </div>
              <button className="text-[9px] md:text-[10px] font-black text-[#E50914] uppercase hover:underline">Coming Soon</button>
           </div>
        </div>
      </div>
    </div>
  );
};

export default CMSMarketing;
