use rusqlite::{params, Connection};
use std::fs;
use std::path::PathBuf;
use tauri::Manager;

fn database_path(app_handle: &tauri::AppHandle) -> Result<PathBuf, String> {
    let mut directory = app_handle
        .path()
        .app_data_dir()
        .map_err(|error| error.to_string())?;
    fs::create_dir_all(&directory).map_err(|error| error.to_string())?;
    directory.push("collection.sqlite3");
    Ok(directory)
}

fn open_database(app_handle: &tauri::AppHandle) -> Result<Connection, String> {
    let connection = Connection::open(database_path(app_handle)?).map_err(|error| error.to_string())?;
    connection
        .execute(
            "CREATE TABLE IF NOT EXISTS drawn_cards (
                card_id TEXT PRIMARY KEY NOT NULL,
                drawn_count INTEGER NOT NULL DEFAULT 0,
                first_drawn_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
                last_drawn_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
            )",
            [],
        )
        .map_err(|error| error.to_string())?;
    Ok(connection)
}

#[tauri::command]
pub fn load_drawn_card_ids(app_handle: tauri::AppHandle) -> Result<Vec<String>, String> {
    let connection = open_database(&app_handle)?;
    let mut statement = connection
        .prepare("SELECT card_id FROM drawn_cards ORDER BY first_drawn_at ASC")
        .map_err(|error| error.to_string())?;
    let rows = statement
        .query_map([], |row| row.get::<usize, String>(0))
        .map_err(|error| error.to_string())?;

    let mut card_ids = Vec::new();
    for row in rows {
        card_ids.push(row.map_err(|error| error.to_string())?);
    }
    Ok(card_ids)
}

#[tauri::command]
pub fn record_drawn_card(app_handle: tauri::AppHandle, card_id: String) -> Result<Vec<String>, String> {
    let connection = open_database(&app_handle)?;
    connection
        .execute(
            "INSERT INTO drawn_cards (card_id, drawn_count) VALUES (?1, 1)
             ON CONFLICT(card_id) DO UPDATE SET
                drawn_count = drawn_count + 1,
                last_drawn_at = CURRENT_TIMESTAMP",
            params![card_id],
        )
        .map_err(|error| error.to_string())?;
    load_drawn_card_ids(app_handle)
}

#[tauri::command]
pub fn clear_drawn_card_ids(app_handle: tauri::AppHandle) -> Result<Vec<String>, String> {
    let connection = open_database(&app_handle)?;
    connection
        .execute("DELETE FROM drawn_cards", [])
        .map_err(|error| error.to_string())?;
    Ok(Vec::new())
}
