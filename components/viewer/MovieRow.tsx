
import React, { useRef } from 'react';
import { Movie } from '../../types';

interface MovieRowProps {
  title: string;
  movies: Movie[];
  onSelect: (movie: Movie) => void;
}

const MovieRow: React.FC<MovieRowProps> = ({ title, movies, onSelect }) => {
  const rowRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (rowRef.current) {
      const { scrollLeft, clientWidth } = rowRef.current;
      const scrollTo = direction === 'left' ? scrollLeft - clientWidth : scrollLeft + clientWidth;
      rowRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  return (
    <div className="group">
      <h2 className="text-xl font-bold mb-4 px-2 group-hover:text-white transition">{title}</h2>
      
      <div className="relative">
        <button 
          onClick={() => scroll('left')}
          className="absolute left-0 top-0 bottom-0 z-20 w-12 bg-black/50 opacity-0 group-hover:opacity-100 transition flex items-center justify-center"
        >
          <i className="fa-solid fa-chevron-left text-2xl"></i>
        </button>

        <div 
          ref={rowRef}
          className="flex gap-2 overflow-x-auto no-scrollbar scroll-smooth"
        >
          {movies.map(movie => (
            <div 
              key={movie.id}
              onClick={() => onSelect(movie)}
              className="relative flex-none w-40 md:w-64 aspect-video rounded-md overflow-hidden cursor-pointer transform transition-all duration-300 hover:scale-110 hover:z-30 hover:shadow-2xl hover:shadow-black"
            >
              <img 
                src={movie.thumbnail} 
                alt={movie.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity flex flex-col justify-end p-3">
                <p className="text-sm font-bold truncate">{movie.title}</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-[10px] border border-white/50 px-1 rounded">{movie.rating}</span>
                  <span className="text-[10px]">{movie.category}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <button 
          onClick={() => scroll('right')}
          className="absolute right-0 top-0 bottom-0 z-20 w-12 bg-black/50 opacity-0 group-hover:opacity-100 transition flex items-center justify-center"
        >
          <i className="fa-solid fa-chevron-right text-2xl"></i>
        </button>
      </div>
    </div>
  );
};

export default MovieRow;
