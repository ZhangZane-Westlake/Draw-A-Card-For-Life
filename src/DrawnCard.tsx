import type { LifeCard } from "./types";
import { format_category_label, format_rarity_label } from "./cardLogic";
import { PixelCard } from "./PixelCard";

interface DrawnCardProps {
  readonly card: LifeCard | null;
  readonly poolSize: number;
  readonly isDrawing: boolean;
  readonly onDraw: () => void;
}

/**
 * Displays the active drawn card and the primary draw action.
 */
export function DrawnCard({ card, poolSize, isDrawing, onDraw }: DrawnCardProps) {
  return (
    <section className="draw-stage" aria-label="抽卡舞台">
      <div className="stage-glow" />
      <div className={`card-display ${card ? `rarity-${card.rarity}` : ""} ${isDrawing ? "is-drawing" : ""}`}>
        {isDrawing ? (
          <div className="drawing-card" aria-live="polite">
            <div className="shuffle-stack">
              <span />
              <span />
              <span />
            </div>
            <h2>正在洗牌...</h2>
            <p>给生活一点点期待，卡片马上翻开。</p>
          </div>
        ) : card ? (
          <>
            <div className="card-visual">
              <PixelCard card={card} />
            </div>
            <div className="card-copy">
              <div className="card-kicker">
                <span>{format_category_label(card.category)}</span>
                <span className={`rarity-chip rarity-${card.rarity}`}>{format_rarity_label(card.rarity)}</span>
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
      <button className="draw-button" type="button" onClick={onDraw} disabled={isDrawing}>
        {isDrawing ? "洗牌中..." : "抽一张生活充能卡"}
      </button>
      <p className="pool-note">当前卡池：{poolSize} 张</p>
    </section>
  );
}
