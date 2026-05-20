pub mod storage;

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![
            storage::load_drawn_card_ids,
            storage::record_drawn_card
        ])
        .run(tauri::generate_context!())
        .expect("failed to run Draw A Card For Life");
}
