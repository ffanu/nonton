
import React, { useState, useMemo } from 'react';
import { AppView, CMSPage, Movie, Subscriber, AdConfig } from './types';
import { INITIAL_MOVIES } from './constants';
import ViewerLayout from './components/viewer/ViewerLayout';
import CMSLayout from './components/cms/CMSLayout';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<AppView>(AppView.VIEWER);
  const [currentCMSPage, setCurrentCMSPage] = useState<CMSPage>(CMSPage.DASHBOARD);
  const [movies, setMovies] = useState<Movie[]>(INITIAL_MOVIES);
  const [subscribers, setSubscribers] = useState<Subscriber[]>([
    { id: '1', email: 'demo@streampulse.com', subscribedAt: '2024-05-10', status: 'Active' }
  ]);

  // Ad Management State
  const [adConfig, setAdConfig] = useState<AdConfig>({
    zones: [
      { id: 'top_bar', name: 'Top Banner Bar', enabled: false, code: '', position: 'top' },
      { id: 'bottom_sticky', name: 'Sticky Bottom Footer', enabled: false, code: '', position: 'bottom' },
      { id: 'video_pause', name: 'In-Player Pause Ad', enabled: false, code: '', position: 'video-overlay' }
    ]
  });

  // Marketing Configuration State
  const [marketingConfig, setMarketingConfig] = useState({
    heroTitle: 'Featured Now',
    heroSubtitle: 'StreamPulse Original',
    ctaHeadline: 'Ready to watch?',
    ctaSubtext: 'Enter your email to create or restart your membership and get notified about new movie releases.',
    announcement: 'Special Offer: Get 3 months of Premium for the price of 1!',
    showAnnouncement: false
  });

  const [activeMovie, setActiveMovie] = useState<Movie | null>(null);

  const featuredMovie = useMemo(() => movies.find(m => m.featured) || movies[0], [movies]);

  const handleSetFeatured = (id: string) => {
    setMovies(prev => prev.map(m => ({
      ...m,
      featured: m.id === id
    })));
  };

  const handleAddMovie = (newMovie: Movie) => {
    setMovies(prev => [newMovie, ...prev]);
  };

  const handleDeleteMovie = (id: string) => {
    setMovies(prev => prev.filter(m => m.id !== id));
  };

  const handleSubscribe = (email: string) => {
    if (subscribers.find(s => s.email === email)) return;
    const newSub: Subscriber = {
      id: Date.now().toString(),
      email,
      subscribedAt: new Date().toISOString().split('T')[0],
      status: 'Active'
    };
    setSubscribers(prev => [newSub, ...prev]);
  };

  const handleUnsubscribe = (id: string) => {
    setSubscribers(prev => prev.map(s => s.id === id ? { ...s, status: 'Unsubscribed' } : s));
  };

  const handleToggleView = () => {
    setCurrentView(prev => prev === AppView.VIEWER ? AppView.CMS : AppView.VIEWER);
  };

  return (
    <div className="min-h-screen bg-[#141414] text-white">
      {currentView === AppView.VIEWER ? (
        <ViewerLayout
          movies={movies}
          featuredMovie={featuredMovie}
          onSwitchToCMS={handleToggleView}
          activeMovie={activeMovie}
          setActiveMovie={setActiveMovie}
          onSubscribe={handleSubscribe}
          marketingConfig={marketingConfig}
          adConfig={adConfig}
        />
      ) : (
        <CMSLayout
          movies={movies}
          subscribers={subscribers}
          onAddMovie={handleAddMovie}
          onDeleteMovie={handleDeleteMovie}
          onUnsubscribe={handleUnsubscribe}
          onSwitchToViewer={handleToggleView}
          currentPage={currentCMSPage}
          setCurrentPage={setCurrentCMSPage}
          handleSetFeatured={handleSetFeatured}
          marketingConfig={marketingConfig}
          setMarketingConfig={setMarketingConfig}
          adConfig={adConfig}
          setAdConfig={setAdConfig}
        />
      )}
    </div>
  );
};

export default App;
