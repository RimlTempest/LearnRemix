# ♪ Welcome to Remix

- [Remix Docs](https://remix.run/docs)

## 開発

ターミナルから

```sh
yarn run dev
```

これにより、アプリが開発モードで起動し、ファイルの変更に応じてアセットが再構築されます。

## デプロイメント

まず、アプリをプロダクション用にビルドします。

```sh
yarn run build
```

次に、アプリをプロダクションモードで実行します。

次のようにします。

```sh
yarn start
```

あとは、デプロイ先のホストを決めるだけです。

### DIY

ノードアプリケーションのデプロイに慣れている方は、内蔵されているRemix app serverで本番環境に対応できます。

必ず `remix build` の出力をデプロイしてください。

- `build/`
- `public/build/`

### テンプレートの使用

```sh
npx create-remix@latest
```

を実行すると、ホスティングの選択肢がいくつかあります。  
再度実行して新しいプロジェクトを作成し、  
`app/`ディレクトリをターゲットサーバ用にあらかじめ設定された  
新しいプロジェクトにコピーすることができます。

```sh
cd ...
# 新しいプロジェクトを作成して、あらかじめ設定されたホストを選ぶ
npx create-remix@latest
cd my-new-remix-app
# 新しいプロジェクトのアプリを削除します(古いアプリは削除しません)
rm -rf app
# 自分のアプリをコピーする
cp -R ../my-old-remix-app/app app
```
