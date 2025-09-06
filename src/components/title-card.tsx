import { useState } from "react";
import { ComicText } from "./magicui/comic-text";
import { NeonGradientCard } from "./magicui/neon-gradient-card";
import { PresentOpening } from "./magicui/present-opening";

interface TitleCardProps {
  onOpen: () => void;
}

export function TitleCard({ onOpen }: TitleCardProps) {
  const [isOpening, setIsOpening] = useState(false);

  const handleOpen = () => {
    setIsOpening(true);
    // Add a small delay to let confetti play before revealing vouchers
    setTimeout(() => {
      onOpen();
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-2 sm:p-4">
      <NeonGradientCard
        className="w-full max-w-5xl mx-auto"
        neonColors={{
          firstColor: "#ff6b6b",
          secondColor: "#4ecdc4",
        }}
        borderSize={3}
        borderRadius={25}
      >
        <div className="text-center space-y-4 sm:space-y-6 lg:space-y-8 py-4 sm:py-8 lg:py-12 px-2 sm:px-4">
          {/* Birthday Title with Comic Text */}
          <div className="space-y-2 sm:space-y-3 lg:space-y-4">
            <ComicText
              fontSize={2.5}
              className="text-center text-2xl sm:text-3xl lg:text-4xl"
            >
              🎁 🎉
            </ComicText>
            <ComicText
              fontSize={1.8}
              className="text-center text-lg sm:text-xl lg:text-2xl"
            >
              für Sohn, Papa, Robert
            </ComicText>
            <ComicText
              fontSize={2.5}
              className="text-center text-2xl sm:text-3xl lg:text-4xl"
            >
              Alles Gute zum Geburtstag!
            </ComicText>
          </div>

          {/* Subtitle */}
          <div className="space-y-2 sm:space-y-3 lg:space-y-4">
            <p className="text-base sm:text-lg lg:text-xl font-medium">
              Drei besondere Erlebnisse warten auf dich!
            </p>
          </div>

          {/* Present Button with Confetti */}
          <div className="pt-2 sm:pt-3 lg:pt-4">
            <PresentOpening
              onClick={handleOpen}
              disabled={isOpening}
              isOpening={isOpening}
            />
          </div>

          {/* Birthday Math Joke */}
          <div className="space-y-1 sm:space-y-2 text-muted-foreground">
            <p className="text-sm sm:text-base lg:text-lg text-center font-medium">
              60 Jahre = 60 x 365,25 Tage = 21.915 Tage
            </p>
            <p className="text-sm sm:text-base lg:text-lg text-center font-medium">
              und sicherlich mehr als 21.915 Weissbier-Gläser!
            </p>
            <p className="text-sm sm:text-base lg:text-lg text-center font-medium">
              Prost auf viele weitere! 🍻
            </p>
          </div>

          {/* Decorative elements */}
          <div className="flex justify-center space-x-2 sm:space-x-3 lg:space-x-4 text-lg sm:text-xl lg:text-2xl">
            <span className="animate-bounce" style={{ animationDelay: "0ms" }}>
              🎈
            </span>
            <span
              className="animate-bounce"
              style={{ animationDelay: "150ms" }}
            >
              🎂
            </span>
            <span
              className="animate-bounce"
              style={{ animationDelay: "300ms" }}
            >
              🎊
            </span>
            <span
              className="animate-bounce"
              style={{ animationDelay: "450ms" }}
            >
              🎉
            </span>
            <span
              className="animate-bounce"
              style={{ animationDelay: "600ms" }}
            >
              🎈
            </span>
          </div>
        </div>
      </NeonGradientCard>
    </div>
  );
}
