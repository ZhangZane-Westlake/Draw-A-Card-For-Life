export type CardCategory = "body" | "mind" | "creative" | "social" | "nature" | "reset";

export type CardRarity = "common" | "gentle" | "spark" | "rare";

export interface LifeCard {
  readonly id: string;
  readonly title: string;
  readonly prompt: string;
  readonly category: CardCategory;
  readonly rarity: CardRarity;
  readonly minutes: number;
  readonly palette: readonly [string, string, string];
  readonly pixel_art: readonly string[];
}

export interface CardCategoryOption {
  readonly id: CardCategory | "all";
  readonly label: string;
  readonly description: string;
}
