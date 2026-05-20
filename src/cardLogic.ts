import type { LifeCard } from "./types";

export interface DrawResult {
  readonly card: LifeCard;
  readonly poolSize: number;
}

/**
 * Draws one card from the selected pool using browser-grade randomness.
 */
export const draw_life_card = (cards: readonly LifeCard[]): DrawResult => {
  if (cards.length === 0) {
    throw new Error("Cannot draw from an empty card pool.");
  }

  const random_values = new Uint32Array(1);
  window.crypto.getRandomValues(random_values);
  const card_index = random_values[0] % cards.length;

  return {
    card: cards[card_index],
    poolSize: cards.length,
  };
};

/**
 * Converts category identifiers into readable labels for the interface.
 */
export const format_category_label = (category: LifeCard["category"]): string => {
  const labels: Record<LifeCard["category"], string> = {
    body: "身体充电",
    mind: "心绪整理",
    creative: "灵感火花",
    social: "温柔连接",
    nature: "自然呼吸",
    reset: "空间重启",
  };
  return labels[category];
};

/**
 * Converts rarity identifiers into short, readable card labels.
 */
export const format_rarity_label = (rarity: LifeCard["rarity"]): string => {
  const labels: Record<LifeCard["rarity"], string> = {
    common: "微光",
    gentle: "柔光",
    spark: "星火",
    rare: "月辉",
  };
  return labels[rarity];
};
