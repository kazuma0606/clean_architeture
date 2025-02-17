# TypeScriptによるクリーンアーキテクチャ入門

このリポジトリは、TypeScriptでクリーンアーキテクチャを実践するためのサンプルプロジェクトです。主要なディレクトリ構成は以下のとおりです。

## ディレクトリ構成

```
src/
├── dapter
    ├── controllers/
    ├── repositories/
    └── utils/
├── application
    ├── dtos/
    └── usecases/
├── domain
    ├── entities/
    ├── repositories/
    └── utils/
└── infrastructure/
    └── web/
        └── routers/
```

### src/adapter/

外部インターフェースとアプリケーションをつなぐ役割を持つ層です。具体的には、コントローラーやプレゼンターなど、ユーザーからの入力や外部システムとのやり取りを担当します。

### src/application/

ユースケースやアプリケーション固有のビジネスロジックを含む層です。この層では、ユーザーの操作やシステムのイベントに応じた具体的な処理を定義します。

### src/domain/

ビジネスルールやエンティティ、バリューオブジェクト、リポジトリのインターフェースなど、アプリケーションの中心的な部分を定義する層です。

### src/infrastructure/

データベースや外部APIとの通信、ファイル操作など、技術的な詳細や外部システムとの連携を担当する層です。

## セットアップ

1. リポジトリをクローンします。

   ```bash
   git clone https://github.com/kazuma0606/clean_architeture.git
   ```

2. ディレクトリに移動します。

   ```bash
   cd clean_architeture
   ```

3. 依存関係をインストールします。

   ```bash
   npm install
   ```

4. 環境変数を設定します。

## 実行方法

```bash
npm run dev
```

## ライセンス

MIT License

