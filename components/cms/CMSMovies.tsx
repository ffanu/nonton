
import React, { useState, useMemo } from 'react';
import { Movie } from '../../types';
import { generateMovieDescription } from '../../services/geminiService';

interface CMSMoviesProps {
  movies: Movie[];
  onAddMovie: (m: Movie) => void;
  onDeleteMovie: (id: string) => void;
}

const CMSMovies: React.FC<CMSMoviesProps> = ({ movies, onAddMovie, onDeleteMovie }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showNotificationToast, setShowNotificationToast] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const [newMovie, setNewMovie] = useState<Partial<Movie>>({
    title: '',
    description: '',
    videoUrl: '',
    trailerUrl: '',
    category: 'Action',
    duration: '',
    year: 2024,
    rating: 'PG-13',
    featured: false,
    trending: false
  });

  const filteredMovies = useMemo(() => {
    return movies.filter(movie => 
      movie.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [movies, searchQuery]);

  const handleGenerateAI = async () => {
    if (!newMovie.title) return alert('Please enter a title first');
    setIsGenerating(true);
    const desc = await generateMovieDescription(newMovie.title);
    setNewMovie(prev => ({ ...prev, description: desc }));
    setIsGenerating(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMovie.title || !newMovie.description) return;

    const finalVideoUrl = newMovie.videoUrl || 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4';

    const movieToAdd: Movie = {
      id: Date.now().toString(),
      title: newMovie.title || '',
      description: newMovie.description || '',
      thumbnail: `https://picsum.photos/id/${Math.floor(Math.random() * 50) + 20}/800/450`,
      videoUrl: finalVideoUrl,
      trailerUrl: newMovie.trailerUrl || '',
      category: newMovie.category || 'Action',
      duration: newMovie.duration || '1h 30m',
      year: newMovie.year || 2024,
      rating: newMovie.rating || 'PG-13',
      featured: !!newMovie.featured,
      trending: !!newMovie.trending
    };

    onAddMovie(movieToAdd);
    
    // Simulate Newsletter Blast
    setShowNotificationToast(true);
    setTimeout(() => setShowNotificationToast(false), 4000);

    // Reset state
    setNewMovie({ 
      title: '', 
      description: '', 
      videoUrl: '', 
      trailerUrl: '',
      duration: '', 
      category: 'Action', 
      year: 2024, 
      rating: 'PG-13', 
      featured: false, 
      trending: false 
    });
    setIsModalOpen(false);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Newsletter Blast Toast */}
      {showNotificationToast && (
        <div className="fixed top-8 right-8 z-[100] bg-[#1c1c1c] border border-red-500/50 p-4 rounded-2xl shadow-2xl flex items-center gap-4 animate-in slide-in-from-right-8 duration-500">
           <div className="w-10 h-10 rounded-full bg-red-500 flex items-center justify-center text-white animate-pulse">
              <i className="fa-solid fa-paper-plane"></i>
           </div>
           <div>
              <p className="text-sm font-bold">Newsletter Blast Sent!</p>
              <p className="text-xs text-gray-400">Notified all active subscribers about the new release.</p>
           </div>
        </div>
      )}

      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Movies Management</h1>
          <p className="text-gray-400">Manage your content catalog and release schedules.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <i className="fa-solid fa-magnifying-glass absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm"></i>
            <input 
              type="text" 
              placeholder="Search by title..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-white/5 border border-white/10 rounded-xl pl-10 pr-10 py-2.5 text-sm focus:outline-none focus:border-red-500 w-full md:w-64 transition-all"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition"
              >
                <i className="fa-solid fa-xmark"></i>
              </button>
            )}
          </div>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="bg-[#E50914] hover:bg-red-700 px-6 py-2.5 rounded-xl font-bold flex items-center gap-2 transition shadow-lg shadow-red-500/20 whitespace-nowrap"
          >
            <i className="fa-solid fa-plus"></i>
            Add Movie
          </button>
        </div>
      </header>

      <div className="bg-[#141414] rounded-2xl border border-white/5 overflow-hidden shadow-xl">
        <table className="w-full text-left">
          <thead className="bg-white/5 border-b border-white/10">
            <tr>
              <th className="px-6 py-4 font-bold text-xs text-gray-500 uppercase tracking-wider">Movie Info</th>
              <th className="px-6 py-4 font-bold text-xs text-gray-500 uppercase tracking-wider">Category</th>
              <th className="px-6 py-4 font-bold text-xs text-gray-500 uppercase tracking-wider">Year</th>
              <th className="px-6 py-4 font-bold text-xs text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-4 font-bold text-xs text-gray-500 uppercase tracking-wider text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {filteredMovies.length > 0 ? (
              filteredMovies.map(movie => (
                <tr key={movie.id} className="hover:bg-white/[0.02] transition group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <div className="relative w-24 h-14 rounded-lg overflow-hidden border border-white/10">
                        <img src={movie.thumbnail} className="w-full h-full object-cover" alt="" />
                      </div>
                      <div>
                        <p className="font-bold text-sm group-hover:text-red-500 transition-colors">{movie.title}</p>
                        <p className="text-xs text-gray-500 max-w-[200px] truncate">{movie.description}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-[10px] bg-white/5 px-2 py-1 rounded-md text-gray-300 border border-white/10 font-bold uppercase tracking-wider">{movie.category}</span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-400 font-mono">{movie.year}</td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      {movie.trending && (
                        <span className="flex items-center gap-1.5 text-[10px] font-black text-yellow-500 bg-yellow-500/10 px-2 py-0.5 rounded border border-yellow-500/20 uppercase">
                          <i className="fa-solid fa-fire text-[8px]"></i>
                          Trending
                        </span>
                      )}
                      {movie.featured && (
                        <span className="flex items-center gap-1.5 text-[10px] font-black text-blue-500 bg-blue-500/10 px-2 py-0.5 rounded border border-blue-500/20 uppercase">
                          <i className="fa-solid fa-star text-[8px]"></i>
                          Hero
                        </span>
                      )}
                      {!movie.trending && !movie.featured && (
                        <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Standard</span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex justify-end gap-2">
                      <button className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center text-gray-400 hover:text-white transition" title="Edit">
                        <i className="fa-solid fa-pen-to-square text-xs"></i>
                      </button>
                      <button 
                        onClick={() => onDeleteMovie(movie.id)}
                        className="w-8 h-8 rounded-lg bg-white/5 hover:bg-red-500/20 flex items-center justify-center text-gray-400 hover:text-red-500 transition"
                        title="Delete"
                      >
                        <i className="fa-solid fa-trash text-xs"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="px-6 py-20 text-center text-gray-500">
                  <div className="flex flex-col items-center gap-3">
                    <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center text-2xl opacity-20">
                      <i className="fa-solid fa-magnifying-glass"></i>
                    </div>
                    <p className="text-sm">No movies found matching "{searchQuery}"</p>
                    <button 
                      onClick={() => setSearchQuery('')}
                      className="text-red-500 text-xs font-bold hover:underline"
                    >
                      Clear Search
                    </button>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Add Movie Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-in fade-in duration-300">
          <div className="bg-[#1c1c1c] w-full max-w-xl rounded-3xl border border-white/10 overflow-hidden shadow-2xl animate-in zoom-in duration-300">
            <div className="p-6 border-b border-white/10 flex items-center justify-between bg-white/[0.02]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center text-red-500">
                  <i className="fa-solid fa-film"></i>
                </div>
                <div>
                  <h2 className="text-xl font-bold">New Content Release</h2>
                  <p className="text-xs text-gray-500">Add a new title to the StreamPulse library.</p>
                </div>
              </div>
              <button onClick={() => setIsModalOpen(false)} className="w-10 h-10 rounded-full hover:bg-white/10 flex items-center justify-center transition">
                <i className="fa-solid fa-xmark text-xl"></i>
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-5 max-h-[75vh] overflow-y-auto custom-scrollbar">
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Title</label>
                <div className="flex gap-2">
                  <input 
                    type="text" 
                    required
                    value={newMovie.title}
                    onChange={e => setNewMovie(prev => ({...prev, title: e.target.value}))}
                    className="flex-1 bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-red-500 transition"
                    placeholder="e.g. Inception"
                  />
                  <button 
                    type="button"
                    disabled={isGenerating}
                    onClick={handleGenerateAI}
                    className="bg-[#E50914]/10 hover:bg-[#E50914]/20 border border-red-500/20 px-4 py-3 rounded-xl text-xs font-bold text-red-500 transition flex items-center gap-2 whitespace-nowrap disabled:opacity-50"
                  >
                    <i className={`fa-solid fa-wand-magic-sparkles ${isGenerating ? 'animate-spin' : ''}`}></i>
                    AI Draft
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Video Stream URL</label>
                  <input 
                    type="text" 
                    value={newMovie.videoUrl}
                    onChange={e => setNewMovie(prev => ({...prev, videoUrl: e.target.value}))}
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-red-500 transition"
                    placeholder="https://.../video.m3u8"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Trailer Link</label>
                  <input 
                    type="text" 
                    value={newMovie.trailerUrl}
                    onChange={e => setNewMovie(prev => ({...prev, trailerUrl: e.target.value}))}
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-red-500 transition"
                    placeholder="Optional"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Run Time</label>
                  <input 
                    type="text" 
                    value={newMovie.duration}
                    onChange={e => setNewMovie(prev => ({...prev, duration: e.target.value}))}
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-red-500 transition"
                    placeholder="2h 15m"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Year</label>
                  <input 
                    type="number"
                    value={newMovie.year}
                    onChange={e => setNewMovie(prev => ({...prev, year: parseInt(e.target.value)}))}
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-red-500 transition"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Rating</label>
                  <select 
                    value={newMovie.rating}
                    onChange={e => setNewMovie(prev => ({...prev, rating: e.target.value}))}
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-red-500 transition"
                  >
                    <option value="G">G</option>
                    <option value="PG">PG</option>
                    <option value="PG-13">PG-13</option>
                    <option value="R">R</option>
                    <option value="NC-17">NC-17</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Synopsis</label>
                <textarea 
                  rows={3}
                  required
                  value={newMovie.description}
                  onChange={e => setNewMovie(prev => ({...prev, description: e.target.value}))}
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-red-500 transition resize-none leading-relaxed"
                  placeholder="The story follows..."
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Category</label>
                  <select 
                    value={newMovie.category}
                    onChange={e => setNewMovie(prev => ({...prev, category: e.target.value}))}
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-red-500 transition"
                  >
                    <option value="Action">Action</option>
                    <option value="Drama">Drama</option>
                    <option value="Sci-Fi">Sci-Fi</option>
                    <option value="Comedy">Comedy</option>
                    <option value="Documentary">Documentary</option>
                    <option value="Horror">Horror</option>
                  </select>
                </div>
                
                <div className="space-y-1.5 flex flex-col justify-end">
                   <div className="flex items-center gap-6 pb-2 px-2">
                    <label className="flex items-center gap-2 cursor-pointer group">
                      <input 
                        type="checkbox" 
                        id="trending-checkbox"
                        checked={newMovie.trending}
                        onChange={e => setNewMovie(prev => ({...prev, trending: e.target.checked}))}
                        className="w-5 h-5 rounded border-white/10 bg-white/5 text-[#E50914] focus:ring-red-500 accent-[#E50914]"
                      />
                      <span className="text-xs font-bold text-gray-400 group-hover:text-white transition uppercase">Trending</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer group">
                      <input 
                        type="checkbox" 
                        id="featured-checkbox"
                        checked={newMovie.featured}
                        onChange={e => setNewMovie(prev => ({...prev, featured: e.target.checked}))}
                        className="w-5 h-5 rounded border-white/10 bg-white/5 text-[#E50914] focus:ring-red-500 accent-[#E50914]"
                      />
                      <span className="text-xs font-bold text-gray-400 group-hover:text-white transition uppercase">Featured</span>
                    </label>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-white/10">
                <button 
                  type="submit"
                  className="w-full bg-[#E50914] hover:bg-red-700 py-4 rounded-2xl font-bold transition shadow-lg shadow-red-500/20 text-sm tracking-widest uppercase"
                >
                  Publish to Platform
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CMSMovies;
