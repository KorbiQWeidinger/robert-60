import { useState, useRef } from "react";
import { RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Signature } from "@/components/ui/signature";
import { ImageCarousel } from "./image-carousel";
import { CompactMusicPlayer } from "./compact-music-player";
import { TitleCard } from "./title-card";
import { NeonGradientCard } from "./magicui/neon-gradient-card";
import { ConfettiRef } from "./magicui/confetti";
import { ComicText } from "./magicui/comic-text";
import { PresentOpening } from "./magicui/present-opening";
import { vouchers } from "@/data/vouchers";
import { useIsLargeScreen } from "@/hooks/useBreakpoint";

export function VoucherDisplay() {
  const [showVouchers, setShowVouchers] = useState(false);
  const [currentVoucherIndex, setCurrentVoucherIndex] = useState(0);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isLoadingNext, setIsLoadingNext] = useState(false);
  const confettiRef = useRef<ConfettiRef>(null);
  const isLargeScreen = useIsLargeScreen();

  const currentVoucher = vouchers[currentVoucherIndex];

  const handleOpenPresent = () => {
    setShowVouchers(true);
  };

  const nextVoucher = () => {
    setIsLoadingNext(true);

    // Add a small delay to show the opening animation
    setTimeout(() => {
      // Trigger confetti effect
      confettiRef.current?.fire({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });

      const nextIndex = (currentVoucherIndex + 1) % vouchers.length;
      setCurrentVoucherIndex(nextIndex);
      setCurrentSongIndex(0); // Reset song index when changing vouchers
      setIsFlipped(false); // Reset flip state when changing vouchers
      setIsLoadingNext(false);
    }, 1000);
  };

  const toggleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  // Show title card first, then vouchers after opening
  if (!showVouchers) {
    return <TitleCard onOpen={handleOpenPresent} />;
  }

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4 overflow-x-hidden">
      <div className="w-full max-w-4xl mx-auto">
        {/* Image Card with Neon Gradient Border */}
        <NeonGradientCard
          className="relative aspect-[3/4] sm:aspect-[3/2] lg:aspect-[4/3]"
          borderSize={3}
          borderRadius={16}
          neonColors={{
            firstColor: "#ff6b6b",
            secondColor: "#4ecdc4",
          }}
        >
          {/* Flip Button */}
          <Button
            variant="outline"
            size="sm"
            onClick={toggleFlip}
            className="absolute top-4 right-4 z-20 bg-background/80 backdrop-blur-sm cursor-pointer"
          >
            <RotateCcw className="h-4 w-4 sm:mr-2" />
            <span className="hidden sm:inline">Wenden</span>
          </Button>

          {/* Front Side - Image Carousel */}
          <div
            className={`absolute inset-0 transition-transform duration-700 ease-in-out ${
              isFlipped ? "rotate-y-180 opacity-0" : "rotate-y-0 opacity-100"
            }`}
            style={{ transformStyle: "preserve-3d" }}
          >
            <div className="w-full h-full rounded-[13px] overflow-hidden">
              <ImageCarousel images={currentVoucher.images} />
            </div>
          </div>

          {/* Back Side - Gift Details */}
          <div
            className={`absolute inset-0 transition-transform duration-700 ease-in-out ${
              isFlipped ? "rotate-y-0 opacity-100" : "rotate-y-180 opacity-0"
            }`}
            style={{ transformStyle: "preserve-3d" }}
          >
            <div className="w-full h-full bg-card rounded-[13px] overflow-y-auto overflow-x-hidden">
              <div className="min-h-full flex flex-col items-center justify-center p-6 sm:p-8 lg:p-12">
                <div className="w-full max-w-2xl mx-auto text-center space-y-6">
                  <div className="flex justify-center">
                    <ComicText
                      fontSize={isLargeScreen ? 2.2 : 1.6}
                      className="text-primary text-md sm:text-xl lg:text-2xl"
                    >
                      {`${currentVoucher.title}`}
                    </ComicText>
                  </div>

                  <div className="space-y-4 text-base sm:text-lg lg:text-xl">
                    <p className="font-medium">{currentVoucher.description}</p>

                    {currentVoucher.details && (
                      <div className="rounded-lg p-4 sm:p-6">
                        <p className="text-muted-foreground break-words">
                          {currentVoucher.details}
                        </p>
                      </div>
                    )}

                    {/* Signatures Section */}
                    {currentVoucher.signatures &&
                      currentVoucher.signatures.length > 0 && (
                        <div className="mt-8">
                          <h3 className="text-lg font-semibold mb-4 text-center">
                            Mit Liebe von
                          </h3>
                          <div className="flex flex-wrap justify-center gap-3 max-w-full">
                            {currentVoucher.signatures.map(
                              (signature, index) => (
                                <Signature
                                  key={index}
                                  name={signature}
                                  variant="accent"
                                  size="sm"
                                />
                              )
                            )}
                          </div>
                        </div>
                      )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </NeonGradientCard>

        {/* Bottom Section - Music Player and Next Button */}
        <div className="mt-8">
          {/* Music Player and Next Present Button */}
          <div className="sm:flex sm:flex-row flex-col justify-between items-center gap-6">
            {/* Music Player */}
            <div className="flex-1">
              {currentVoucher.songs.length > 0 && (
                <CompactMusicPlayer
                  key={`voucher-${currentVoucherIndex}-song-${currentSongIndex}`}
                  songs={currentVoucher.songs}
                  currentSongIndex={currentSongIndex}
                  setCurrentSongIndex={setCurrentSongIndex}
                />
              )}
            </div>

            {/* Next Present Button */}
            <div className="flex justify-center pt-10 sm:pt-0">
              <PresentOpening
                onClick={nextVoucher}
                disabled={isLoadingNext}
                isOpening={isLoadingNext}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
