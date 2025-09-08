import { useState, useEffect } from "react";

interface MediaCarouselProps {
  media: string[];
  autoPlayInterval?: number;
}

// Helper function to determine if a file is a video
const isVideo = (url: string): boolean => {
  const videoExtensions = [".mp4", ".webm", ".ogg", ".mov", ".avi", ".mkv"];
  return videoExtensions.some((ext) => url.toLowerCase().includes(ext));
};

// Helper function to get thumbnail image path from video path
const getVideoThumbnail = (videoUrl: string): string => {
  // Replace video extension with image extension
  return videoUrl.replace(/\.(mp4|webm|ogg|mov|avi|mkv)$/i, ".png");
};

export function ImageCarousel({
  media,
  autoPlayInterval = 6000,
}: MediaCarouselProps) {
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);

  useEffect(() => {
    if (media.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentMediaIndex((prevIndex) => (prevIndex + 1) % media.length);
    }, autoPlayInterval);

    return () => clearInterval(interval);
  }, [media.length, autoPlayInterval]);

  if (media.length === 0) {
    return (
      <div className="w-full h-full bg-gray-200 flex items-center justify-center rounded-[inherit]">
        <span className="text-gray-500">Keine Medien verfügbar</span>
      </div>
    );
  }

  const currentMedia = media[currentMediaIndex];
  const isCurrentMediaVideo = isVideo(currentMedia);

  return (
    <div className="relative w-full h-full overflow-hidden">
      {/* Blurred background - for both images and videos */}
      {isCurrentMediaVideo ? (
        <img
          src={getVideoThumbnail(currentMedia)}
          alt={`Video thumbnail background`}
          className="absolute inset-0 w-full h-full object-cover blur-sm scale-110 transition-opacity duration-500"
          onError={(e) => {
            // Fallback for missing thumbnail images
            const target = e.target as HTMLImageElement;
            target.src =
              "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjNmNGY2Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxOCIgZmlsbD0iIzk5YTNhZiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkJpbGQgY29taW5nIHNvb24uLi48L3RleHQ+PC9zdmc+";
          }}
        />
      ) : (
        <img
          src={currentMedia}
          alt={`Voucher Medien ${currentMediaIndex + 1} Background`}
          className="absolute inset-0 w-full h-full object-cover blur-sm scale-110 transition-opacity duration-500"
          onError={(e) => {
            // Fallback for missing images
            const target = e.target as HTMLImageElement;
            target.src =
              "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjNmNGY2Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxOCIgZmlsbD0iIzk5YTNhZiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkJpbGQgY29taW5nIHNvb24uLi48L3RleHQ+PC9zdmc+";
          }}
        />
      )}

      {/* Main media - centered and contained */}
      <div className="absolute inset-0 flex items-center justify-center">
        {isCurrentMediaVideo ? (
          <video
            src={currentMedia}
            className="max-w-full max-h-full object-contain transition-opacity duration-500 cursor-pointer"
            autoPlay
            muted
            loop
            playsInline
            onLoadedMetadata={(e) => {
              const video = e.target as HTMLVideoElement;
              video.playbackRate = 0.75;
            }}
            onClick={(e) => {
              // Toggle play/pause on click/tap
              const video = e.target as HTMLVideoElement;
              if (video.paused) {
                video.play();
              } else {
                video.pause();
              }
            }}
            onError={(e) => {
              // Fallback for missing videos
              const target = e.target as HTMLVideoElement;
              target.style.display = "none";
              const fallbackDiv = document.createElement("div");
              fallbackDiv.className =
                "max-w-full max-h-full flex items-center justify-center bg-gray-200 rounded";
              fallbackDiv.innerHTML =
                '<span class="text-gray-500">Video nicht verfügbar</span>';
              target.parentNode?.appendChild(fallbackDiv);
            }}
          />
        ) : (
          <img
            src={currentMedia}
            alt={`Voucher Medien ${currentMediaIndex + 1}`}
            className="max-w-full max-h-full object-contain transition-opacity duration-500"
            onError={(e) => {
              // Fallback for missing images
              const target = e.target as HTMLImageElement;
              target.src =
                "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjNmNGY2Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxOCIgZmlsbD0iIzk5YTNhZiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkJpbGQgY29taW5nIHNvb24uLi48L3RleHQ+PC9zdmc+";
            }}
          />
        )}
      </div>
    </div>
  );
}
