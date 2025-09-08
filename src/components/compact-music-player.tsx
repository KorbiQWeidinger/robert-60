import { useRef, useState, useEffect } from "react";
import { Play, Pause, SkipBack, SkipForward } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NeonGradientCard } from "./magicui/neon-gradient-card";
import { Song } from "@/data/vouchers";

interface CompactMusicPlayerProps {
  songs: Song[];
  currentSongIndex: number;
  setCurrentSongIndex: (index: number) => void;
}

export function CompactMusicPlayer({
  songs,
  currentSongIndex,
  setCurrentSongIndex,
}: CompactMusicPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const currentSong = songs[currentSongIndex];
  const [isPlaying, setIsPlaying] = useState(true);

  // Handle play/pause
  const togglePlayPause = () => {
    setIsPlaying((prev) => !prev);
  };

  useEffect(() => {
    if (audioRef.current && isPlaying) {
      audioRef.current.play();
    } else if (audioRef.current && !isPlaying) {
      audioRef.current.pause();
    }
  }, [currentSongIndex, isPlaying]);

  // Handle next song
  const nextSong = () => {
    const nextIndex = (currentSongIndex + 1) % songs.length;
    setCurrentSongIndex(nextIndex);
  };

  // Handle previous song
  const previousSong = () => {
    const prevIndex =
      currentSongIndex === 0 ? songs.length - 1 : currentSongIndex - 1;
    setCurrentSongIndex(prevIndex);
  };

  // Handle song end
  const handleSongEnd = () => {
    nextSong();
  };

  if (!currentSong) {
    return null;
  }

  return (
    <NeonGradientCard
      className="w-full"
      borderSize={2}
      borderRadius={12}
      neonColors={{
        firstColor: "#ff6b6b",
        secondColor: "#4ecdc4",
      }}
    >
      <div className="flex-col sm:flex sm:flex-row items-center justify-center gap-2">
        <audio
          ref={audioRef}
          src={currentSong.file}
          onEnded={handleSongEnd}
          preload="auto"
        />

        {/* Song Title */}
        <div className="flex-1 text-center">
          <span className="text-sm font-medium truncate block">
            {currentSong.title}
          </span>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-2 pt-3 sm:pt-0">
          {songs.length > 1 && (
            <Button
              variant="outline"
              size="sm"
              onClick={previousSong}
              className="p-1 h-8 w-8 cursor-pointer"
            >
              <SkipBack className="h-3 w-3" />
            </Button>
          )}

          <Button
            onClick={togglePlayPause}
            className="p-1 h-8 w-8 cursor-pointer"
          >
            {isPlaying ? (
              <Pause className="h-3 w-3" />
            ) : (
              <Play className="h-3 w-3" />
            )}
          </Button>

          {songs.length > 1 && (
            <Button
              variant="outline"
              size="sm"
              onClick={nextSong}
              className="p-1 h-8 w-8 cursor-pointer"
            >
              <SkipForward className="h-3 w-3" />
            </Button>
          )}
        </div>
      </div>
    </NeonGradientCard>
  );
}
