# Todo アプリ

React + LocalStorageで構築した静的Todoアプリケーション

## 機能

- ✅ Todo の追加・編集・削除
- ✅ 完了/未完了の切り替え
- ✅ 優先度設定（高/中/低）
- ✅ フィルター機能（すべて/完了/未完了）
- ✅ タスク統計表示
- ✅ ダークモード対応（システム設定に自動追従）
- ✅ データはブラウザのLocalStorageに保存

## 技術スタック

- **フロントエンド**: React 18 + Vite
- **データ保存**: LocalStorage（ブラウザ内）
- **デプロイ**: 完全に静的なファイルとしてビルド可能

## 特徴

- ✅ **バックエンド不要** - 完全にクライアントサイドで動作
- ✅ **簡単デプロイ** - ビルドして任意のWebサーバーやホスティングサービスに配置可能
- ✅ **オフライン動作** - ネットワーク接続不要
- ⚠️ データはブラウザごとに独立して保存されます

## セットアップ

### 依存関係のインストール

```bash
cd frontend
npm install
```

または、ルートから：

```bash
npm run install:all
```

## 起動方法

### 開発サーバー起動

```bash
npm run dev
```

または、フロントエンドディレクトリから：

```bash
cd frontend
npm run dev
```

ブラウザで `http://localhost:5173` を開きます。

### 本番ビルド

```bash
npm run build
```

ビルド成果物は `frontend/dist/` に生成されます。

### ビルド確認

```bash
npm run preview
```

## 使い方

1. ブラウザで `http://localhost:5173` を開く
2. タスク名と優先度を入力して「追加」をクリック
3. タスクの編集、削除、完了マークができます
4. フィルターボタンでタスクを絞り込めます
5. データは自動的にブラウザに保存されます

## デプロイ方法

1. ビルドを実行：
   ```bash
   npm run build
   ```

2. `frontend/dist/` ディレクトリの内容を以下のサービスにデプロイ：
   - Netlify
   - Vercel
   - GitHub Pages
   - Cloudflare Pages
   - 任意の静的ホスティングサービス

## プロジェクト構造

```
todo/
├── frontend/         # React アプリケーション
│   └── src/
│       ├── App.jsx
│       ├── App.css   # ダークモード対応スタイル
│       ├── components/
│       │   ├── TodoForm.jsx
│       │   ├── TodoItem.jsx
│       │   ├── TodoList.jsx
│       │   └── FilterBar.jsx
│       └── api/
│           └── todoApi.js  # LocalStorage操作
├── backend/          # （未使用 - 削除可能）
└── package.json      # ルートスクリプト
```

## データ保存について

- データはブラウザの **LocalStorage** に保存されます
- ブラウザのキャッシュをクリアするとデータが消えます
- 異なるブラウザやデバイス間でデータは共有されません
- プライベートモードではデータが保持されません
