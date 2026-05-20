export interface StorageBridge {
  loadDrawnCardIds(): Promise<Set<string>>;
  recordDrawnCard(cardId: string): Promise<Set<string>>;
  clearDrawnCardIds(): Promise<Set<string>>;
}

const storage_key = "draw-a-card-for-life:drawn-card-ids";

const is_tauri_runtime = (): boolean => typeof window !== "undefined" && "__TAURI_INTERNALS__" in window;

const load_local_card_ids = (): Set<string> => {
  const raw_value = window.localStorage.getItem(storage_key);
  if (!raw_value) {
    return new Set<string>();
  }

  const parsed_value: unknown = JSON.parse(raw_value);
  if (!Array.isArray(parsed_value)) {
    return new Set<string>();
  }

  return new Set(parsed_value.filter((item): item is string => typeof item === "string"));
};

const save_local_card_ids = (card_ids: Set<string>): void => {
  window.localStorage.setItem(storage_key, JSON.stringify([...card_ids]));
};

export const create_storage_bridge = (): StorageBridge => ({
  async loadDrawnCardIds(): Promise<Set<string>> {
    if (is_tauri_runtime()) {
      const { invoke } = await import("@tauri-apps/api/core");
      const card_ids = await invoke<string[]>("load_drawn_card_ids");
      return new Set(card_ids);
    }

    return load_local_card_ids();
  },

  async recordDrawnCard(cardId: string): Promise<Set<string>> {
    if (is_tauri_runtime()) {
      const { invoke } = await import("@tauri-apps/api/core");
      const card_ids = await invoke<string[]>("record_drawn_card", { cardId });
      return new Set(card_ids);
    }

    const card_ids = load_local_card_ids();
    card_ids.add(cardId);
    save_local_card_ids(card_ids);
    return card_ids;
  },

  async clearDrawnCardIds(): Promise<Set<string>> {
    if (is_tauri_runtime()) {
      const { invoke } = await import("@tauri-apps/api/core");
      const card_ids = await invoke<string[]>("clear_drawn_card_ids");
      return new Set(card_ids);
    }

    window.localStorage.removeItem(storage_key);
    return new Set<string>();
  },
});
