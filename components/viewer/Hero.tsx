
import React from 'react';
import { Movie } from '../../types';

interface HeroProps {
  movie: Movie;
  onPlay: () => void;
}

const Hero: React.FC<HeroProps> = ({ movie, onPlay }) => {
  return (
    <div className="relative h-[70vh] md:h-[85vh] w-full overflow-hidden">
      {/* Background Image with Gradients */}
      <div className="absolute inset-0">
        <img 
          src={movie.thumbnail} 
          alt={movie.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#141414] via-transparent to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-transparent to-transparent"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-center px-4 md:px-12 max-w-2xl gap-4">
        <h1 className="text-4xl md:text-6xl font-black drop-shadow-xl">{movie.title}</h1>
        <div className="flex items-center gap-3 text-sm font-semibold">
          <span className="text-green-500">98% Match</span>
          <span className="text-gray-300">{movie.year}</span>
          <span className="border border-gray-400 px-1.5 py-0.5 text-xs rounded uppercase">{movie.rating}</span>
          <span className="text-gray-300">{movie.duration}</span>
        </div>
        <p className="text-base md:text-lg text-gray-200 drop-shadow-md line-clamp-3">
          {movie.description}
        </p>

        <div className="flex items-center gap-3 mt-4">
          <button 
            onClick={onPlay}
            className="flex items-center gap-2 bg-white text-black px-6 py-2.5 rounded hover:bg-white/80 transition font-bold"
          >
            <i className="fa-solid fa-play"></i>
            Play
          </button>
          <button className="flex items-center gap-2 bg-white/20 text-white px-6 py-2.5 rounded hover:bg-white/30 transition font-bold backdrop-blur-md">
            <i className="fa-solid fa-circle-info"></i>
            More Info
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
