# Draw A Card For Life

一款淡蓝色调的生活充能抽卡软件：在没有兴趣做事情、低精力的时候，为自己抽一张带像素配图的生活指引卡，例如吃一块巧克力、听一首摇滚乐、整理一个手掌大的桌面区域。

## 功能

- 120 张内置生活指引卡，抽卡时从本地指引库随机抽取。
- 6 种分类卡池：身体充电、心绪整理、灵感火花、温柔连接、自然呼吸、空间重启。
- 支持“全部能量”综合抽取，也可以选择指定分类抽取。
- 每张卡包含标题、行动指引、预计耗时、稀有度和像素配图。
- 图鉴记录已抽到/未抽到的卡，并展示完成度。
- 网页版可直接运行；macOS GUI 使用 Tauri 打包为 `.app` 和 `.dmg`。
- macOS App 图鉴保存到本机 SQLite；网页版回退使用浏览器 localStorage。

## 技术栈

- Bun
- React + TypeScript
- Tauri 2
- Rust + rusqlite bundled SQLite

## 运行网页版

```sh
bun install
bun run dev
```

打开终端显示的本地地址即可使用。默认服务入口是 `src/server.ts`，使用 `Bun.serve()`。

## 构建网页版

```sh
bun run build
```

构建产物输出到 `dist/`。

## 运行 macOS GUI

需要本机安装 Rust 与 Tauri 依赖后执行：

```sh
bun install
bun run app:dev
```

## 打包 app 和 dmg

```sh
bun run app:build
```

Tauri 会生成 macOS `.app` 与 `.dmg`。常见输出目录为：

```text
src-tauri/target/release/bundle/macos/
src-tauri/target/release/bundle/dmg/
```

## 图鉴数据保存

- macOS GUI：通过 Tauri command 写入应用数据目录下的 `collection.sqlite3`。
- Web：写入浏览器 localStorage key `draw-a-card-for-life:drawn-card-ids`。

SQLite 表结构：

```sql
CREATE TABLE IF NOT EXISTS drawn_cards (
  card_id TEXT PRIMARY KEY NOT NULL,
  drawn_count INTEGER NOT NULL DEFAULT 0,
  first_drawn_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  last_drawn_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);
```

## 项目结构

```text
src/
  App.tsx                # 主界面与抽卡状态
  DrawnCard.tsx          # 抽到的卡牌展示
  CollectionView.tsx     # 图鉴
  PixelCard.tsx          # 像素配图渲染
  cardLogic.ts           # 抽卡与标签逻辑
  storage.ts             # Tauri SQLite / Web localStorage 桥接
  data/cards.ts          # 120 张指引库
src-tauri/
  src/storage.rs         # SQLite 持久化命令
  tauri.conf.json        # macOS app/dmg 打包配置
```

## GitHub 同步消息

```text
feat: build life energy card drawing app with categorized guide library, pixel card UI, collection tracking, and Tauri SQLite persistence
```
