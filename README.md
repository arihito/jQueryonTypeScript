# TypeScriptでjQueryを書くためにWebpackでバンドルしたGulpのタスクランナーでの環境構築

## package.jsonを生成

```syntax:cli
npm init -y
```

## ディレクトリ構築

```
dist
└── js
    └── app.js
node_modules
└── gulp-webpack
├── jquery
└── typings など
ts
├── app.ts
├── model.ts
└── config.ts
typings
├── globals
└── index.d.ts
gulpfile.js
index.html
package.json
tsconfig.json
typings.json
webpack.config.js
```

## モジュール(ユーザー全体)のインストール

```syntax:cli
npm i -g typescript typings gulp webpack
```

## ローカル(プロジェクトフォルダ内)にインストールい

```
npm i -D typescript gulp webpack gulp-webpack ts-loader jquery del
```

- gulp-webpack: gulp内でwebpackを使用
- ts-lader: webpack内でTypeScriptを使用


