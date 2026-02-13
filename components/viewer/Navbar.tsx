
import React from 'react';

interface NavbarProps {
  scrolled: boolean;
  onCMSClick: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ scrolled, onCMSClick }) => {
  return (
    <nav className={`fixed top-0 w-full z-50 transition-colors duration-300 px-4 md:px-12 py-4 flex items-center justify-between ${scrolled ? 'bg-[#141414]' : 'bg-transparent bg-gradient-to-b from-black/70 to-transparent'}`}>
      <div className="flex items-center gap-8">
        <div className="text-[#E50914] text-2xl md:text-3xl font-bold tracking-tighter uppercase cursor-pointer">
          StreamPulse
        </div>
        <ul className="hidden md:flex items-center gap-5 text-sm font-medium text-gray-200">
          <li className="hover:text-white cursor-pointer transition">Home</li>
          <li className="hover:text-white cursor-pointer transition">TV Shows</li>
          <li className="hover:text-white cursor-pointer transition">Movies</li>
          <li className="hover:text-white cursor-pointer transition">New & Popular</li>
          <li className="hover:text-white cursor-pointer transition">My List</li>
        </ul>
      </div>

      <div className="flex items-center gap-6">
        <i className="fa-solid fa-magnifying-glass text-xl cursor-pointer hover:text-gray-400 transition"></i>
        <button 
          onClick={onCMSClick}
          className="flex items-center gap-2 text-sm bg-white/10 hover:bg-white/20 px-3 py-1 rounded transition border border-white/20"
        >
          <i className="fa-solid fa-gear"></i>
          <span className="hidden sm:inline">CMS Panel</span>
        </button>
        <div className="w-8 h-8 rounded bg-blue-600 overflow-hidden cursor-pointer">
          <img src="https://picsum.photos/id/64/100/100" alt="Avatar" />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
