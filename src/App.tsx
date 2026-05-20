import { useEffect, useMemo, useState } from "react";
import "./styles.css";
import { CollectionView } from "./CollectionView";
import { DrawnCard } from "./DrawnCard";
import { draw_life_card } from "./cardLogic";
import { life_cards, card_category_options } from "./data/cards";
import { create_storage_bridge } from "./storage";
import type { CardCategoryOption, LifeCard } from "./types";

const storage_bridge = create_storage_bridge();

/**
 * Runs the complete draw-card experience and local collection state.
 */
export function App() {
  const [selected_category, set_selected_category] = useState<CardCategoryOption["id"]>("all");
  const [drawn_card_ids, set_drawn_card_ids] = useState<Set<string>>(new Set<string>());
  const [active_card, set_active_card] = useState<LifeCard | null>(null);
  const [is_collection_open, set_is_collection_open] = useState(false);
  const [is_drawing, set_is_drawing] = useState(false);

  const card_pool = useMemo(() => {
    if (selected_category === "all") {
      return life_cards;
    }
    return life_cards.filter((card) => card.category === selected_category);
  }, [selected_category]);

  useEffect(() => {
    void storage_bridge.loadDrawnCardIds().then(set_drawn_card_ids);
  }, []);

  const handle_draw_card = (): void => {
    if (is_drawing) {
      return;
    }

    set_is_drawing(true);
    window.setTimeout(() => {
      const result = draw_life_card(card_pool);
      set_active_card(result.card);
      void storage_bridge.recordDrawnCard(result.card.id).then(set_drawn_card_ids);
      set_is_drawing(false);
    }, 900);
  };

  const handle_clear_collection = (): void => {
    void storage_bridge.clearDrawnCardIds().then(set_drawn_card_ids);
  };

  return (
    <main className="app-shell">
      <section className="hero-panel">
        <nav className="topbar" aria-label="应用导航">
          <div className="brand-mark">
            <span />
            <strong>Draw A Card For Life</strong>
          </div>
          <button className="ghost-button" type="button" onClick={() => set_is_collection_open((value) => !value)}>
            {is_collection_open ? "回到抽卡" : "打开图鉴"}
          </button>
        </nav>

        <div className="hero-copy">
          <p className="eyebrow">Low energy ritual</p>
          <h1>在没兴趣、低精力的时候，为生活抽一张温柔指引。</h1>
          <p>
            这里有 120 张生活充能卡，覆盖身体、心绪、创作、连接、自然与空间重启。每张卡都带有低门槛行动和像素配图。
          </p>
        </div>

        <div className="category-strip" aria-label="抽卡类别">
          {card_category_options.map((category) => (
            <button
              className={`category-pill ${selected_category === category.id ? "is-active" : ""}`}
              key={category.id}
              type="button"
              onClick={() => set_selected_category(category.id)}
            >
              <strong>{category.label}</strong>
              <span>{category.description}</span>
            </button>
          ))}
        </div>
      </section>

      {is_collection_open ? (
        <CollectionView cards={life_cards} drawnCardIds={drawn_card_ids} onClearCollection={handle_clear_collection} />
      ) : (
        <DrawnCard card={active_card} poolSize={card_pool.length} isDrawing={is_drawing} onDraw={handle_draw_card} />
      )}
    </main>
  );
}
