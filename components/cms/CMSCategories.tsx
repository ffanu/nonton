
import React from 'react';
import { Movie } from '../../types';

interface CMSCategoriesProps {
  movies: Movie[];
}

const CMSCategories: React.FC<CMSCategoriesProps> = ({ movies }) => {
  const categoryCounts = movies.reduce((acc, movie) => {
    acc[movie.category] = (acc[movie.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // Explicitly casting count to number to resolve TypeScript arithmetic operation errors
  const categories = Object.entries(categoryCounts).map(([name, count]) => ({
    name,
    count: count as number,
    id: name.toLowerCase()
  }));

  return (
    <div className="max-w-6xl mx-auto">
      <header className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">Category Management</h1>
          <p className="text-gray-400">Organize your content by genre and taxonomy.</p>
        </div>
        <button className="bg-[#E50914] hover:bg-red-700 px-6 py-2.5 rounded-lg font-bold flex items-center gap-2 transition">
          <i className="fa-solid fa-plus"></i>
          Create Category
        </button>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((cat) => (
          <div key={cat.id} className="bg-[#141414] p-6 rounded-2xl border border-white/5 hover:border-red-500/30 transition group">
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-xl text-[#E50914] group-hover:bg-[#E50914] group-hover:text-white transition-colors">
                <i className="fa-solid fa-tags"></i>
              </div>
              <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition">
                <button className="text-gray-400 hover:text-white"><i className="fa-solid fa-pen"></i></button>
                <button className="text-gray-400 hover:text-red-500"><i className="fa-solid fa-trash"></i></button>
              </div>
            </div>
            <h3 className="text-xl font-bold">{cat.name}</h3>
            <p className="text-gray-400 text-sm mt-1">{cat.count} Movies assigned</p>
            <div className="mt-6 h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
              <div 
                className="h-full bg-[#E50914]" 
                // Using Number() and checking for movies.length to ensure safe arithmetic operations
                style={{ width: `${movies.length > 0 ? Math.min((cat.count / movies.length) * 100 + 10, 100) : 0}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CMSCategories;
