# Draw A Card For Life

一款淡蓝色调的生活充能抽卡软件：在没有兴趣做事情、低精力的时候，为自己抽一张带像素配图的生活指引卡，例如吃一块巧克力、听一首摇滚乐、整理一个手掌大的桌面区域。

## 功能

- 120 张内置生活指引卡，抽卡时从本地指引库随机抽取。
- 6 种分类卡池：身体充电、心绪整理、灵感火花、温柔连接、自然呼吸、空间重启。
- 支持“全部能量”综合抽取，也可以选择指定分类抽取。
- 每张卡包含标题、行动指引、预计耗时、稀有度和像素配图。
- 稀有度分为微光、柔光、星火、月辉；不同级别会使用不同卡面光效、徽章、像素图尺寸和颜色层级。
- 每个稀有度包含多套像素图模板，同级别卡片会稳定轮换不同图案。
- 点击抽卡后会先播放洗牌/翻卡动画，再揭示结果。
- 图鉴记录已抽到/未抽到的卡，展示完成度，并支持一键清空重新收集。
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

需要本机安装 Rust 与 Tauri 依赖后执行。macOS 打包至少需要：

- Xcode Command Line Tools
- Rust toolchain（建议通过 rustup 安装）
- Cargo

```sh
bun install
bun run app:dev
```

## 打包 app 和 dmg

首次打包或 Tauri 版本调整后，先同步依赖锁文件：

```sh
bun install
```

然后执行：

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

## 像素配图与稀有度

像素图不是外部图片资源，而是在 `src/data/cards.ts` 里用字符串矩阵定义，再由 `PixelCard` 按格子渲染。当前每个稀有度都有多套矩阵模板，同级别卡片会按序号稳定轮换；级别差异通过卡面光效、像素格尺寸、阴影强度和分类调色板共同体现。

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
  src/storage.rs         # SQLite 持久化与清空图鉴命令
  tauri.conf.json        # macOS app/dmg 打包配置
```

## 验证状态

当前已验证：

```sh
bun run build
bunx tsc --noEmit
```

macOS Tauri 打包需要先安装 Rust/Cargo；未安装时 `bunx @tauri-apps/cli info` 会提示 `rustc` 与 `Cargo` 缺失。

## GitHub 同步消息

```text
feat: refine draw animation state, add varied pixel templates, and polish rarity UI
```
