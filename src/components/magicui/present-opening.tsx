import { useEffect } from "react";
import { ComicText } from "./comic-text";
import confetti from "canvas-confetti";

interface PresentOpeningProps {
  isOpening?: boolean;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}

export function PresentOpening({
  isOpening = false,
  onClick,
  disabled = false,
  className = "",
}: PresentOpeningProps) {
  // Fire confetti when the present dissolves
  useEffect(() => {
    if (isOpening) {
      const fireConfetti = async () => {
        try {
          await confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 },
            colors: [
              "#ff6b6b",
              "#4ecdc4",
              "#45b7d1",
              "#96ceb4",
              "#feca57",
              "#ff9ff3",
              "#54a0ff",
            ],
            shapes: ["square", "circle"],
            scalar: 1.0,
            gravity: 1.0,
            drift: 0.05,
            ticks: 200,
            startVelocity: 30,
            decay: 0.9,
          });
        } catch (error) {
          console.error("Confetti error:", error);
        }
      };

      // Small delay to let the dissolving animation start
      setTimeout(fireConfetti, 200);
    }
  }, [isOpening]);

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`relative inline-block cursor-pointer transition-all duration-300 transform hover:gift-wiggle-strong active:scale-95 disabled:cursor-not-allowed disabled:opacity-70 disabled:transform-none disabled:hover:gift-wiggle-none focus:outline-none gift-subtle-wiggle ${className}`}
    >
      <div
        className={`transition-all duration-1000 ${
          isOpening ? "opacity-0 scale-0" : "opacity-100 scale-100"
        }`}
      >
        <ComicText
          fontSize={4}
          className="text-center hover:text-6xl transition-all duration-300"
        >
          🎁
        </ComicText>
      </div>
    </button>
  );
}
