
import React, { useEffect, useRef, useState } from 'react';
import { Movie } from '../../types';
import Hls from 'hls.js';

interface VideoPlayerProps {
  movie: Movie;
  onClose: () => void;
  pauseAdCode?: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ movie, onClose, pauseAdCode }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(true);
  const [showControls, setShowControls] = useState(true);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  
  // Ad-specific states
  const [adDismissed, setAdDismissed] = useState(false);
  const [adCountdown, setAdCountdown] = useState(5);
  const controlsTimeoutRef = useRef<number | null>(null);
  const adTimerRef = useRef<number | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let hls: Hls | null = null;
    const isHLS = movie.videoUrl.toLowerCase().includes('.m3u8');

    const handlePlay = () => {
      setIsPaused(false);
      setAdDismissed(false); // Reset for next pause
      setAdCountdown(5);
    };
    
    const handlePause = () => {
      setIsPaused(true);
      setAdDismissed(false);
      // Start countdown when paused
      if (adTimerRef.current) window.clearInterval(adTimerRef.current);
      adTimerRef.current = window.setInterval(() => {
        setAdCountdown(prev => {
          if (prev <= 1) {
            if (adTimerRef.current) window.clearInterval(adTimerRef.current);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    };

    const handleTimeUpdate = () => {
      const p = (video.currentTime / video.duration) * 100;
      setProgress(isNaN(p) ? 0 : p);
    };
    const handleLoadedMetadata = () => setDuration(video.duration);

    video.addEventListener('play', handlePlay);
    video.addEventListener('pause', handlePause);
    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('loadedmetadata', handleLoadedMetadata);

    if (isHLS) {
      if (Hls.isSupported()) {
        hls = new Hls();
        hls.loadSource(movie.videoUrl);
        hls.attachMedia(video);
        hls.on(Hls.Events.MANIFEST_PARSED, () => video.play());
      } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
        video.src = movie.videoUrl;
        video.play();
      }
    } else {
      video.src = movie.videoUrl;
    }

    return () => {
      if (hls) hls.destroy();
      if (adTimerRef.current) window.clearInterval(adTimerRef.current);
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('pause', handlePause);
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
    };
  }, [movie.videoUrl]);

  const handleMouseMove = () => {
    setShowControls(true);
    if (controlsTimeoutRef.current) window.clearTimeout(controlsTimeoutRef.current);
    controlsTimeoutRef.current = window.setTimeout(() => {
      if (!isPaused) setShowControls(false);
    }, 3000);
  };

  const togglePlay = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
      } else {
        videoRef.current.pause();
      }
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (videoRef.current) {
      const time = (parseFloat(e.target.value) / 100) * videoRef.current.duration;
      videoRef.current.currentTime = time;
      setProgress(parseFloat(e.target.value));
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = parseFloat(e.target.value);
    setVolume(v);
    if (videoRef.current) {
      videoRef.current.volume = v;
      videoRef.current.muted = v === 0;
      setIsMuted(v === 0);
    }
  };

  const toggleFullscreen = () => {
    if (!containerRef.current) return;

    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch(err => {
        console.error(`Error attempting to enable full-screen mode: ${err.message}`);
      });
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = Math.floor(seconds % 60);
    return `${h > 0 ? h + ':' : ''}${m < 10 && h > 0 ? '0' + m : m}:${s < 10 ? '0' + s : s}`;
  };

  return (
    <div 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="fixed inset-0 z-[100] bg-black flex flex-col group overflow-hidden"
    >
      {/* Top Bar Controls */}
      <div className={`absolute top-0 left-0 right-0 p-6 flex items-center justify-between bg-gradient-to-b from-black/90 to-transparent z-50 transition-opacity duration-500 ${showControls ? 'opacity-100' : 'opacity-0'}`}>
        <button onClick={onClose} className="flex items-center gap-3 hover:text-[#E50914] transition-all text-white group/back">
          <i className="fa-solid fa-arrow-left text-2xl group-hover/back:-translate-x-1 transition-transform"></i>
          <span className="text-xl font-bold tracking-tight">Back</span>
        </button>
        <div className="flex flex-col items-center text-center">
           <h2 className="text-lg font-black tracking-widest uppercase text-white/90 drop-shadow-md">{movie.title}</h2>
           <span className="text-[10px] font-bold text-gray-400">{movie.category} • {movie.year}</span>
        </div>
        <div className="w-20"></div>
      </div>

      <div className="flex-1 flex items-center justify-center relative bg-black cursor-pointer" onClick={togglePlay}>
        <video 
          ref={videoRef} 
          className="w-full h-full object-contain" 
          poster={movie.thumbnail} 
          playsInline
        />
        
        {/* Play/Pause Large Center Icon Overlay */}
        {isPaused && adDismissed && (
           <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
              <div className="w-24 h-24 rounded-full bg-black/40 border border-white/10 flex items-center justify-center text-white/80 backdrop-blur-sm animate-pulse">
                <i className="fa-solid fa-play text-4xl ml-2"></i>
              </div>
           </div>
        )}

        {/* Pause Ad Overlay with Countdown */}
        {isPaused && pauseAdCode && !adDismissed && (
          <div className="absolute inset-0 flex items-center justify-center z-40 animate-in fade-in zoom-in duration-300 pointer-events-none">
            <div className="bg-[#141414]/90 p-1 rounded-[2.5rem] border border-white/10 pointer-events-auto backdrop-blur-xl shadow-[0_0_50px_rgba(0,0,0,0.5)] max-w-sm w-full mx-4" onClick={(e) => e.stopPropagation()}>
              <div className="relative p-6">
                <div className="flex justify-between items-center mb-6">
                   <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-yellow-500 animate-pulse"></div>
                      <span className="text-[10px] text-gray-400 font-black uppercase tracking-[0.2em]">Promotion</span>
                   </div>
                   
                   {adCountdown > 0 ? (
                     <div className="flex items-center gap-2 bg-white/5 px-3 py-1 rounded-full border border-white/10">
                        <span className="text-[10px] font-bold text-white/60">Dismiss in</span>
                        <span className="text-xs font-black text-[#E50914] w-4 text-center">{adCountdown}</span>
                     </div>
                   ) : (
                     <button 
                      onClick={() => setAdDismissed(true)} 
                      className="text-white hover:text-[#E50914] bg-white/10 hover:bg-white/20 px-3 py-1 rounded-full border border-white/10 transition flex items-center gap-2 group/close"
                     >
                       <span className="text-[10px] font-black uppercase tracking-widest">Close Ad</span>
                       <i className="fa-solid fa-xmark text-xs group-hover/close:rotate-90 transition-transform"></i>
                     </button>
                   )}
                </div>
                
                <div className="bg-black/40 rounded-[1.5rem] overflow-hidden border border-white/5 aspect-video flex items-center justify-center">
                   <div className="w-full h-full" dangerouslySetInnerHTML={{ __html: pauseAdCode }} />
                </div>

                <div className="mt-6 flex flex-col items-center gap-2">
                   <button 
                     onClick={togglePlay}
                     className="w-full bg-white text-black py-3 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-white/90 transition shadow-lg"
                   >
                     Resume Movie
                   </button>
                   <p className="text-[10px] text-gray-500 font-medium">Continue watching {movie.title}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Custom Bottom Controls */}
      <div className={`absolute bottom-0 left-0 right-0 p-8 pt-20 bg-gradient-to-t from-black/95 via-black/70 to-transparent z-50 transition-opacity duration-500 ${showControls ? 'opacity-100' : 'opacity-0'}`}>
        
        {/* Progress Bar Container */}
        <div className="group/progress relative h-2 mb-8 cursor-pointer">
           <input 
             type="range"
             min="0"
             max="100"
             step="0.1"
             value={progress}
             onChange={handleSeek}
             onClick={(e) => e.stopPropagation()}
             className="absolute inset-0 w-full h-full opacity-0 z-10 cursor-pointer"
           />
           <div className="absolute inset-0 bg-white/10 rounded-full overflow-hidden">
              <div className="h-full bg-[#E50914] relative transition-all duration-100" style={{ width: `${progress}%` }}>
                 <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-[#E50914] shadow-lg shadow-red-500/50 scale-0 group-hover/progress:scale-100 transition-transform"></div>
              </div>
           </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-8">
            <button 
              onClick={(e) => { e.stopPropagation(); togglePlay(); }}
              className="text-white hover:text-[#E50914] transition-colors"
            >
              <i className={`fa-solid ${isPaused ? 'fa-play' : 'fa-pause'} text-2xl`}></i>
            </button>

            <div className="flex items-center gap-4 group/volume">
              <button 
                onClick={(e) => { e.stopPropagation(); toggleMute(); }}
                className="text-white hover:text-[#E50914] transition-colors"
              >
                <i className={`fa-solid ${isMuted || volume === 0 ? 'fa-volume-mute' : volume < 0.5 ? 'fa-volume-low' : 'fa-volume-high'} text-xl`}></i>
              </button>
              <div className="w-0 overflow-hidden group-hover/volume:w-24 transition-all duration-300">
                <input 
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={volume}
                  onChange={handleVolumeChange}
                  onClick={(e) => e.stopPropagation()}
                  className="w-24 h-1 bg-white/20 rounded-full accent-[#E50914] cursor-pointer"
                />
              </div>
            </div>

            <div className="text-sm font-bold font-mono tracking-tighter text-gray-300">
               {formatTime(videoRef.current?.currentTime || 0)} <span className="text-gray-600 mx-1">/</span> {formatTime(duration)}
            </div>
          </div>

          <div className="flex items-center gap-8">
             <button onClick={(e) => e.stopPropagation()} className="text-white/60 hover:text-white transition-colors">
                <i className="fa-solid fa-closed-captioning text-xl"></i>
             </button>
             
             <button 
               onClick={(e) => { e.stopPropagation(); toggleFullscreen(); }}
               className="text-white hover:text-[#E50914] transition-colors"
             >
               <i className={`fa-solid ${isFullscreen ? 'fa-compress' : 'fa-expand'} text-xl`}></i>
             </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
