import type { LifeCard } from "./types";
import { format_category_label, format_rarity_label } from "./cardLogic";
import { PixelCard } from "./PixelCard";

interface CollectionViewProps {
  readonly cards: readonly LifeCard[];
  readonly drawnCardIds: ReadonlySet<string>;
}

/**
 * Shows discovered and hidden cards in a local collection guidebook.
 */
export function CollectionView({ cards, drawnCardIds }: CollectionViewProps) {
  const discovered_count = cards.filter((card) => drawnCardIds.has(card.id)).length;
  const completion_rate = Math.round((discovered_count / cards.length) * 100);

  return (
    <section className="collection-panel" aria-label="生活卡图鉴">
      <div className="panel-heading">
        <div>
          <p className="eyebrow">Guidebook</p>
          <h2>生活卡图鉴</h2>
        </div>
        <div className="completion-badge">{completion_rate}%</div>
      </div>
      <div className="progress-track" aria-label={`图鉴完成度 ${completion_rate}%`}>
        <span style={{ width: `${completion_rate}%` }} />
      </div>
      <p className="collection-summary">
        已发现 {discovered_count} / {cards.length} 张。未抽到的卡会保留剪影，macOS App 会保存到 SQLite。
      </p>
      <div className="collection-grid">
        {cards.map((card) => {
          const is_drawn = drawnCardIds.has(card.id);
          return (
            <article className={`collection-card ${is_drawn ? "" : "is-hidden"}`} key={card.id}>
              <PixelCard card={card} locked={!is_drawn} />
              <div>
                <span>{is_drawn ? format_category_label(card.category) : "未知类别"}</span>
                <h3>{is_drawn ? card.title : "未发现卡牌"}</h3>
                <p>{is_drawn ? `${format_rarity_label(card.rarity)} · ${card.minutes} 分钟` : "继续抽卡来解锁这张指引。"}</p>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
