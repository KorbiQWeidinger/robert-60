import { useState, useRef, useEffect } from 'react';
import { Play, Pause, SkipBack, SkipForward, Shuffle, Repeat } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Song {
  id: number;
  title: string;
  file: string;
}

const songs: Song[] = [
  { id: 1, title: "Roberts Alpen Abenteuer", file: "/robert-60/Roberts Alpen_Abenteuer.mp3" },
  { id: 2, title: "Roberts Radl Odyssee", file: "/robert-60/Roberts Radl_Odyssee.mp3" },
  { id: 3, title: "Zürich mit Schokolade", file: "/robert-60/Zürich mit Schokolade.mp3" }
];

export function MusicPlayer() {
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isShuffled, setIsShuffled] = useState(false);
  const [isRepeating, setIsRepeating] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [shuffledOrder, setShuffledOrder] = useState<number[]>([]);
  
  const audioRef = useRef<HTMLAudioElement>(null);

  const currentSong = songs[currentSongIndex];

  // Initialize shuffled order
  useEffect(() => {
    if (isShuffled && shuffledOrder.length === 0) {
      const order = [...Array(songs.length).keys()].sort(() => Math.random() - 0.5);
      setShuffledOrder(order);
    }
  }, [isShuffled, shuffledOrder.length]);

  // Handle play/pause
  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  // Handle next song
  const nextSong = () => {
    let nextIndex;
    if (isShuffled && shuffledOrder.length > 0) {
      const currentShuffledIndex = shuffledOrder.indexOf(currentSongIndex);
      nextIndex = shuffledOrder[(currentShuffledIndex + 1) % shuffledOrder.length];
    } else {
      nextIndex = (currentSongIndex + 1) % songs.length;
    }
    setCurrentSongIndex(nextIndex);
  };

  // Handle previous song
  const previousSong = () => {
    let prevIndex;
    if (isShuffled && shuffledOrder.length > 0) {
      const currentShuffledIndex = shuffledOrder.indexOf(currentSongIndex);
      prevIndex = shuffledOrder[currentShuffledIndex === 0 ? shuffledOrder.length - 1 : currentShuffledIndex - 1];
    } else {
      prevIndex = currentSongIndex === 0 ? songs.length - 1 : currentSongIndex - 1;
    }
    setCurrentSongIndex(prevIndex);
  };

  // Handle shuffle toggle
  const toggleShuffle = () => {
    setIsShuffled(!isShuffled);
    if (!isShuffled) {
      // Create new shuffled order
      const order = [...Array(songs.length).keys()].sort(() => Math.random() - 0.5);
      setShuffledOrder(order);
    } else {
      setShuffledOrder([]);
    }
  };

  // Handle repeat toggle
  const toggleRepeat = () => {
    setIsRepeating(!isRepeating);
  };

  // Handle song end
  const handleSongEnd = () => {
    if (isRepeating) {
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
        audioRef.current.play();
      }
    } else {
      nextSong();
    }
  };

  // Handle time update
  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  // Handle loaded metadata
  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  // Format time
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  // Handle song change
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.load();
      if (isPlaying) {
        audioRef.current.play();
      }
    }
  }, [currentSongIndex]);

  return (
    <div className="bg-card border rounded-lg p-6 w-full max-w-md mx-auto shadow-lg">
      <audio
        ref={audioRef}
        src={currentSong.file}
        onEnded={handleSongEnd}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
      />
      
      {/* Song Info */}
      <div className="text-center mb-6">
        <h3 className="text-lg font-semibold mb-2">{currentSong.title}</h3>
        <div className="text-sm text-muted-foreground">
          {formatTime(currentTime)} / {formatTime(duration)}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-6">
        <div className="w-full bg-secondary rounded-full h-2">
          <div 
            className="bg-primary h-2 rounded-full transition-all duration-300"
            style={{ width: `${duration ? (currentTime / duration) * 100 : 0}%` }}
          />
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-4 mb-4">
        <Button
          variant={isShuffled ? "default" : "outline"}
          size="sm"
          onClick={toggleShuffle}
          className="p-2"
        >
          <Shuffle className="h-4 w-4" />
        </Button>
        
        <Button
          variant="outline"
          size="sm"
          onClick={previousSong}
          className="p-2"
        >
          <SkipBack className="h-4 w-4" />
        </Button>
        
        <Button
          onClick={togglePlayPause}
          className="p-3"
        >
          {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
        </Button>
        
        <Button
          variant="outline"
          size="sm"
          onClick={nextSong}
          className="p-2"
        >
          <SkipForward className="h-4 w-4" />
        </Button>
        
        <Button
          variant={isRepeating ? "default" : "outline"}
          size="sm"
          onClick={toggleRepeat}
          className="p-2"
        >
          <Repeat className="h-4 w-4" />
        </Button>
      </div>

      {/* Song List */}
      <div className="space-y-2">
        <h4 className="text-sm font-medium text-muted-foreground mb-2">Playlist</h4>
        {songs.map((song, index) => (
          <div
            key={song.id}
            className={`p-2 rounded cursor-pointer transition-colors ${
              index === currentSongIndex 
                ? 'bg-primary text-primary-foreground' 
                : 'hover:bg-secondary'
            }`}
            onClick={() => setCurrentSongIndex(index)}
          >
            <div className="text-sm font-medium">{song.title}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
