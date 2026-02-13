
import React, { useState, useEffect } from 'react';
import { Movie, AdConfig } from '../../types';
import Navbar from './Navbar';
import Hero from './Hero';
import MovieRow from './MovieRow';
import VideoPlayer from './VideoPlayer';

interface ViewerLayoutProps {
  movies: Movie[];
  featuredMovie: Movie;
  onSwitchToCMS: () => void;
  activeMovie: Movie | null;
  setActiveMovie: (m: Movie | null) => void;
  onSubscribe: (email: string) => void;
  marketingConfig: any;
  adConfig: AdConfig;
}

const AdContainer: React.FC<{ code: string; className?: string }> = ({ code, className }) => {
  if (!code) return null;
  return (
    <div className={className} dangerouslySetInnerHTML={{ __html: code }} />
  );
};

const ViewerLayout: React.FC<ViewerLayoutProps> = ({ 
  movies, 
  featuredMovie, 
  onSwitchToCMS, 
  activeMovie, 
  setActiveMovie,
  onSubscribe,
  marketingConfig,
  adConfig
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSubSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      onSubscribe(email);
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  const topAd = adConfig.zones.find(z => z.id === 'top_bar' && z.enabled);
  const bottomAd = adConfig.zones.find(z => z.id === 'bottom_sticky' && z.enabled);
  const videoAd = adConfig.zones.find(z => z.id === 'video_pause' && z.enabled);

  return (
    <div className="relative pb-20">
      {/* Top Ad Bar */}
      {topAd && (
        <div className="bg-black/80 flex justify-center py-1 overflow-hidden">
          <AdContainer code={topAd.code} />
        </div>
      )}

      {/* Site-wide Announcement Bar */}
      {marketingConfig.showAnnouncement && (
        <div className="bg-[#E50914] text-white py-2 px-4 text-sm text-center font-bold sticky top-0 z-[60] shadow-xl animate-in slide-in-from-top duration-500">
           <i className="fa-solid fa-bullhorn mr-2"></i>
           {marketingConfig.announcement}
        </div>
      )}

      <Navbar scrolled={scrolled} onCMSClick={onSwitchToCMS} />
      
      {activeMovie ? (
        <VideoPlayer 
          movie={activeMovie} 
          onClose={() => setActiveMovie(null)} 
          pauseAdCode={videoAd?.code}
        />
      ) : (
        <>
          <Hero movie={featuredMovie} onPlay={() => setActiveMovie(featuredMovie)} />
          
          <div className="relative z-10 -mt-24 md:-mt-48 space-y-16 px-4 md:px-12">
            <MovieRow title="Trending Now" movies={movies.filter(m => m.trending)} onSelect={setActiveMovie} />
            <MovieRow title="Action Packed" movies={movies.filter(m => m.category === 'Action')} onSelect={setActiveMovie} />
            <MovieRow title="Sci-Fi Adventures" movies={movies.filter(m => m.category === 'Sci-Fi')} onSelect={setActiveMovie} />
            <MovieRow title="Browse All" movies={movies} onSelect={setActiveMovie} />

            <section className="py-24 border-t border-white/5 text-center max-w-4xl mx-auto">
              <h3 className="text-3xl md:text-5xl font-black mb-6 tracking-tight">
                {marketingConfig.ctaHeadline}
              </h3>
              <p className="text-gray-400 text-lg md:text-xl mb-10 px-4">
                {marketingConfig.ctaSubtext}
              </p>
              
              {!subscribed ? (
                <form onSubmit={handleSubSubmit} className="flex flex-col md:flex-row gap-3 px-4 max-w-3xl mx-auto">
                  <input 
                    type="email" 
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email address" 
                    className="flex-1 bg-black/60 border border-white/20 rounded-lg px-6 py-5 text-lg focus:outline-none focus:border-red-600 transition"
                  />
                  <button 
                    type="submit"
                    className="bg-[#E50914] hover:bg-red-700 px-10 py-5 rounded-lg text-xl font-bold transition flex items-center justify-center gap-3"
                  >
                    Get Started
                    <i className="fa-solid fa-chevron-right text-sm"></i>
                  </button>
                </form>
              ) : (
                <div className="bg-green-500/10 border border-green-500/20 text-green-500 p-8 rounded-2xl animate-in zoom-in">
                   <h4 className="text-2xl font-bold">Awesome, You're on the list!</h4>
                </div>
              )}
            </section>
          </div>

          <footer className="mt-20 border-t border-white/5 pt-12 pb-20 px-4 md:px-12 text-gray-500">
             <div className="max-w-6xl mx-auto flex justify-between items-center">
                <div className="text-[#E50914] text-xl font-black uppercase">StreamPulse</div>
                <p className="text-xs">© 2024 StreamPulse Entertainment, Inc.</p>
             </div>
          </footer>
        </>
      )}

      {/* Sticky Bottom Ad */}
      {bottomAd && (
        <div className="fixed bottom-0 left-0 w-full z-[100] flex justify-center py-2 bg-[#141414]/90 backdrop-blur-md border-t border-white/10 overflow-hidden">
          <AdContainer code={bottomAd.code} />
        </div>
      )}
    </div>
  );
};

export default ViewerLayout;
