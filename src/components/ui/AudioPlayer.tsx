import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';

interface AudioPlayerProps {
  title: string;
  audioUrl: string;
  duration: string;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ title, audioUrl, duration }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => {
      setCurrentTime(audio.currentTime);
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
    };

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('ended', handleEnded);
    };
  }, []);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;
    
    audio.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const audio = audioRef.current;
    const progress = progressRef.current;
    if (!audio || !progress) return;

    const rect = progress.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    audio.currentTime = percent * audio.duration;
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const progress = audioRef.current && audioRef.current.duration
    ? (currentTime / audioRef.current.duration) * 100
    : 0;

  return (
    <div className="bg-slate-900 rounded-lg p-4 mb-4 text-white">
      <div className="mb-2 flex justify-between items-center">
        <h3 className="text-lg font-medium">{title}</h3>
        <span className="text-sm text-slate-400">{formatTime(currentTime)} / {duration}</span>
      </div>

      <div 
        className="h-2 bg-slate-700 rounded-full mb-4 cursor-pointer relative overflow-hidden"
        onClick={handleProgressClick}
        ref={progressRef}
      >
        <div 
          className="h-full bg-amber-500 transition-all duration-100"
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex space-x-4 items-center">
          <button 
            onClick={togglePlay}
            className="w-10 h-10 flex items-center justify-center bg-amber-500 rounded-full hover:bg-amber-600 transition-colors"
            aria-label={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? <Pause size={18} /> : <Play size={18} className="ml-1" />}
          </button>
          
          <button 
            onClick={toggleMute}
            className="text-slate-400 hover:text-white transition-colors"
            aria-label={isMuted ? "Unmute" : "Mute"}
          >
            {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
          </button>
        </div>
        
        <div className="hidden md:block">
          <div className="flex space-x-1">
            {Array.from({ length: 10 }).map((_, i) => (
              <div 
                key={i}
                className="w-1 bg-slate-700 rounded-full animate-pulse"
                style={{ 
                  height: `${Math.random() * 16 + 4}px`,
                  animationDelay: `${i * 0.1}s`,
                  animationDuration: `${Math.random() * 0.8 + 0.5}s`
                }}
              ></div>
            ))}
          </div>
        </div>
      </div>
      
      <audio ref={audioRef} src={audioUrl} preload="metadata"></audio>
    </div>
  );
};

export default AudioPlayer;