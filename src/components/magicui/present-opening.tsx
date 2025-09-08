import { useEffect, useRef } from "react";
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
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Fire confetti when the present dissolves
  useEffect(() => {
    if (isOpening) {
      const fireConfetti = async () => {
        try {
          if (buttonRef.current) {
            const rect = buttonRef.current.getBoundingClientRect();
            const x = (rect.left + rect.width / 2) / window.innerWidth;
            const y = (rect.top + rect.height / 2) / window.innerHeight;

            await confetti({
              particleCount: 100,
              spread: 70,
              origin: { x, y },
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
          }
        } catch (error) {
          console.error("Confetti error:", error);
        }
      };

      // Small delay to let the dissolving animation start
      setTimeout(fireConfetti, 200);
    }
  }, [isOpening]);

  // Periodic shaking animation
  useEffect(() => {
    if (!isOpening && !disabled) {
      const shakeInterval = setInterval(() => {
        if (buttonRef.current) {
          buttonRef.current.classList.add("animate-bounce");
          buttonRef.current.classList.add("gift-wiggle-strong");
          setTimeout(() => {
            if (buttonRef.current) {
              buttonRef.current.classList.remove("animate-bounce");
              buttonRef.current.classList.remove("gift-wiggle-strong");
            }
          }, 300);
        }
      }, 2000); // Shake more frequently

      return () => clearInterval(shakeInterval);
    }
  }, [isOpening, disabled]);

  return (
    <button
      ref={buttonRef}
      onClick={onClick}
      disabled={disabled}
      className={`px-2 relative inline-block cursor-pointer transition-all duration-300 transform hover:gift-wiggle-strong active:scale-95 disabled:cursor-not-allowed disabled:opacity-70 disabled:transform-none disabled:hover:gift-wiggle-none focus:outline-none gift-subtle-wiggle ${className}`}
    >
      <div
        className={`transition-all duration-1000 ${
          isOpening ? "opacity-0 scale-0" : "opacity-100 scale-100"
        }`}
      >
        <div className="text-center text-8xl transition-all duration-300 hover:scale-110">
          🎁
        </div>
      </div>
    </button>
  );
}
