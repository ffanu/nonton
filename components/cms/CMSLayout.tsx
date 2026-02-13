
import React from 'react';
import { CMSPage, Movie, Subscriber, AdConfig } from '../../types';
import CMSDashboard from './CMSDashboard';
import CMSMovies from './CMSMovies';
import CMSCategories from './CMSCategories';
import CMSUsers from './CMSUsers';
import CMSSubscriptions from './CMSSubscriptions';
import CMSMarketing from './CMSMarketing';
import CMSAdManager from './CMSAdManager';

interface CMSLayoutProps {
  movies: Movie[];
  subscribers: Subscriber[];
  onAddMovie: (m: Movie) => void;
  onDeleteMovie: (id: string) => void;
  onUnsubscribe: (id: string) => void;
  onSwitchToViewer: () => void;
  currentPage: CMSPage;
  setCurrentPage: (p: CMSPage) => void;
  handleSetFeatured: (id: string) => void;
  marketingConfig: any;
  setMarketingConfig: (config: any) => void;
  adConfig: AdConfig;
  setAdConfig: (config: AdConfig) => void;
}

const CMSLayout: React.FC<CMSLayoutProps> = ({ 
  movies, 
  subscribers,
  onAddMovie, 
  onDeleteMovie, 
  onUnsubscribe,
  onSwitchToViewer,
  currentPage,
  setCurrentPage,
  handleSetFeatured,
  marketingConfig,
  setMarketingConfig,
  adConfig,
  setAdConfig
}) => {
  const menuItems = [
    { id: CMSPage.DASHBOARD, label: 'Dashboard', icon: 'fa-chart-line' },
    { id: CMSPage.MOVIES, label: 'Movies', icon: 'fa-film' },
    { id: CMSPage.SERIES, label: 'TV Series', icon: 'fa-tv' },
    { id: CMSPage.CATEGORIES, label: 'Categories', icon: 'fa-list' },
    { id: CMSPage.SUBSCRIPTIONS, label: 'Newsletter', icon: 'fa-envelope-open-text' },
    { id: CMSPage.MARKETING, label: 'Marketing', icon: 'fa-bullhorn' },
    { id: CMSPage.AD_MANAGER, label: 'Ad Manager', icon: 'fa-rectangle-ad' },
    { id: CMSPage.USERS, label: 'User Management', icon: 'fa-users' },
  ];

  return (
    <div className="flex h-screen bg-[#0a0a0a] overflow-hidden">
      <aside className="w-64 border-r border-white/10 flex flex-col bg-[#141414] shrink-0">
        <div className="p-6">
          <div className="text-[#E50914] text-2xl font-black tracking-tighter uppercase mb-8 flex items-center gap-2">
            <div className="w-8 h-8 bg-[#E50914] rounded flex items-center justify-center text-white">
              <i className="fa-solid fa-play text-xs"></i>
            </div>
            StreamPulse
          </div>
          
          <nav className="space-y-1">
            {menuItems.map((item) => (
              <button 
                key={item.id}
                onClick={() => setCurrentPage(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition text-sm font-medium ${currentPage === item.id ? 'bg-[#E50914] text-white shadow-lg shadow-red-500/20' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
              >
                <i className={`fa-solid ${item.icon} w-5 text-center`}></i>
                {item.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="mt-auto p-6 space-y-4">
          <button 
            onClick={onSwitchToViewer}
            className="w-full flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition text-sm font-medium"
          >
            <i className="fa-solid fa-arrow-right-from-bracket w-5 text-center"></i>
            Exit to Viewer
          </button>
          <div className="pt-4 border-t border-white/10 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-red-600 to-orange-500 flex items-center justify-center font-bold shadow-lg">A</div>
            <div className="overflow-hidden">
              <p className="text-sm font-bold truncate">Admin User</p>
              <p className="text-xs text-gray-500">Super Admin</p>
            </div>
          </div>
        </div>
      </aside>

      <main className="flex-1 overflow-y-auto p-8 custom-scrollbar">
        {currentPage === CMSPage.DASHBOARD && <CMSDashboard moviesCount={movies.length} />}
        {currentPage === CMSPage.MOVIES && <CMSMovies movies={movies} onAddMovie={onAddMovie} onDeleteMovie={onDeleteMovie} />}
        {currentPage === CMSPage.CATEGORIES && <CMSCategories movies={movies} />}
        {currentPage === CMSPage.USERS && <CMSUsers />}
        {currentPage === CMSPage.SUBSCRIPTIONS && <CMSSubscriptions subscribers={subscribers} onUnsubscribe={onUnsubscribe} />}
        {currentPage === CMSPage.MARKETING && <CMSMarketing movies={movies} onSetFeatured={handleSetFeatured} marketingConfig={marketingConfig} onUpdateConfig={setMarketingConfig} />}
        {currentPage === CMSPage.AD_MANAGER && <CMSAdManager adConfig={adConfig} onUpdateAds={setAdConfig} />}
        
        {currentPage === CMSPage.SERIES && (
          <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
            <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center text-3xl text-gray-600">
               <i className="fa-solid fa-tv"></i>
            </div>
            <div>
              <h1 className="text-2xl font-bold">TV Series</h1>
              <p className="text-gray-400 mt-2 max-w-md">Series management is coming soon.</p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default CMSLayout;
