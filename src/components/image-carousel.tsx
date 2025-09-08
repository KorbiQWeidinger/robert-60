import { useState, useEffect } from "react";

interface ImageCarouselProps {
  images: string[];
  autoPlayInterval?: number;
}

export function ImageCarousel({
  images,
  autoPlayInterval = 6000,
}: ImageCarouselProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, autoPlayInterval);

    return () => clearInterval(interval);
  }, [images.length, autoPlayInterval]);

  if (images.length === 0) {
    return (
      <div className="w-full h-full bg-gray-200 flex items-center justify-center rounded-[inherit]">
        <span className="text-gray-500">Keine Bilder verfügbar</span>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full overflow-hidden">
      {/* Blurred background image */}
      <img
        src={images[currentImageIndex]}
        alt={`Voucher Bild ${currentImageIndex + 1} Background`}
        className="absolute inset-0 w-full h-full object-cover blur-sm scale-110 transition-opacity duration-500"
        onError={(e) => {
          // Fallback for missing images
          const target = e.target as HTMLImageElement;
          target.src =
            "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjNmNGY2Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxOCIgZmlsbD0iIzk5YTNhZiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkJpbGQgY29taW5nIHNvb24uLi48L3RleHQ+PC9zdmc+";
        }}
      />

      {/* Main image - centered and contained */}
      <div className="absolute inset-0 flex items-center justify-center">
        <img
          src={images[currentImageIndex]}
          alt={`Voucher Bild ${currentImageIndex + 1}`}
          className="max-w-full max-h-full object-contain transition-opacity duration-500"
          onError={(e) => {
            // Fallback for missing images
            const target = e.target as HTMLImageElement;
            target.src =
              "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjNmNGY2Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxOCIgZmlsbD0iIzk5YTNhZiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkJpbGQgY29taW5nIHNvb24uLi48L3RleHQ+PC9zdmc+";
          }}
        />
      </div>
    </div>
  );
}
