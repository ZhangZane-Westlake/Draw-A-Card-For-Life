import type { LifeCard } from "./types";

interface PixelCardProps {
  readonly card: LifeCard;
  readonly locked?: boolean;
}

const symbol_to_color = (symbol: string, card: LifeCard): string => {
  if (symbol === "e") {
    return card.palette[0];
  }
  if (symbol === "f") {
    return card.palette[1];
  }
  if (symbol === "c") {
    return card.palette[2];
  }
  return "transparent";
};

/**
 * Renders an in-app pixel illustration for a life card.
 */
export function PixelCard({ card, locked = false }: PixelCardProps) {
  return (
    <div className={`pixel-card ${locked ? "is-locked" : ""}`} aria-hidden="true">
      {card.pixel_art.flatMap((row, row_index) =>
        [...row].map((symbol, column_index) => (
          <span
            className="pixel-cell"
            key={`${row_index}-${column_index}`}
            style={{ backgroundColor: locked ? "rgba(86, 126, 158, 0.2)" : symbol_to_color(symbol, card) }}
          />
        )),
      )}
    </div>
  );
}
