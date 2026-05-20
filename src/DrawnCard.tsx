import type { LifeCard } from "./types";
import { format_category_label, format_rarity_label } from "./cardLogic";
import { PixelCard } from "./PixelCard";

interface DrawnCardProps {
  readonly card: LifeCard | null;
  readonly poolSize: number;
  readonly onDraw: () => void;
}

/**
 * Displays the active drawn card and the primary draw action.
 */
export function DrawnCard({ card, poolSize, onDraw }: DrawnCardProps) {
  return (
    <section className="draw-stage" aria-label="抽卡舞台">
      <div className="stage-glow" />
      <div className="card-display">
        {card ? (
          <>
            <div className="card-visual">
              <PixelCard card={card} />
            </div>
            <div className="card-copy">
              <div className="card-kicker">
                <span>{format_category_label(card.category)}</span>
                <span>{format_rarity_label(card.rarity)}</span>
                <span>{card.minutes} 分钟</span>
              </div>
              <h2>{card.title}</h2>
              <p>{card.prompt}</p>
            </div>
          </>
        ) : (
          <div className="empty-card">
            <div className="orbital-ring" />
            <h2>为低电量的自己抽一张卡</h2>
            <p>选择一个能量类别，或者从全部 120 张生活指引里随机抽取。</p>
          </div>
        )}
      </div>
      <button className="draw-button" type="button" onClick={onDraw}>
        抽一张生活充能卡
      </button>
      <p className="pool-note">当前卡池：{poolSize} 张</p>
    </section>
  );
}
