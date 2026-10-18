import { Star } from "lucide-react";
import { cn } from "@/utils";

interface RatingStarsProps {
  rating: number;
  max?: number;
  size?: "sm" | "md" | "lg";
  interactive?: boolean;
  onChange?: (rating: number) => void;
}

const sizeMap = {
  sm: "h-3 w-3",
  md: "h-5 w-5",
  lg: "h-7 w-7",
};

export function RatingStars({
  rating,
  max = 5,
  size = "md",
  interactive = false,
  onChange,
}: RatingStarsProps) {
  return (
    <div
      className="flex gap-0.5"
      role={interactive ? "radiogroup" : "img"}
      aria-label={`Valoración: ${rating} de ${max}`}
    >
      {Array.from({ length: max }, (_, i) => {
        const starValue = i + 1;
        const filled = starValue <= rating;
        const half = !filled && starValue - 0.5 <= rating;

        return (
          <button
            key={i}
            type={interactive ? "button" : undefined}
            disabled={!interactive}
            aria-label={
              interactive ? `${starValue} estrella${starValue > 1 ? "s" : ""}` : undefined
            }
            aria-checked={interactive ? starValue === Math.round(rating) : undefined}
            role={interactive ? "radio" : undefined}
            className={cn(
              "transition-colors",
              interactive && "cursor-pointer hover:scale-110",
              !interactive && "cursor-default",
            )}
            onClick={() => {
              if (interactive && onChange) {
                onChange(starValue);
              }
            }}
            onKeyDown={(e) => {
              if (interactive && onChange && (e.key === "Enter" || e.key === " ")) {
                e.preventDefault();
                onChange(starValue);
              }
            }}
          >
            <Star
              className={cn(
                sizeMap[size],
                filled && "fill-amber-500 text-amber-500",
                !filled && !half && "fill-muted text-muted",
                half && "fill-amber-500/50 text-amber-500/50",
              )}
            />
          </button>
        );
      })}
    </div>
  );
}
