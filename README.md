# TypeScriptでjQueryを書くためにWebpackでバンドルしたGulpのタスクランナーでの環境構築

[参考記事:Qiita](http://qiita.com/d-dai/items/af40f61a0d559081e2b5 "2016/7/04")

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

### フォルダ生成

typingsフォルダは後で自動生成

```syntax:cli
mkdir dist dist/js ts
```

### ファイル生成

```syntax:cli
touch dist/js/app.js ts/app.ts ts/model.ts ts/config.ts gulpfile.js index.html webpack.config.js
```

## モジュール(ユーザー全体)のインストール

```syntax:cli
npm i -g typescript typings gulp webpack
```

## ローカル(プロジェクトフォルダ内)にインストール

```
npm i -D typescript gulp webpack gulp-webpack ts-loader jquery del
```

- gulp-webpack: gulp内でwebpackを使用
- ts-lader: webpack内でTypeScriptを使用

## jQueryの型定義ファイルの設定

```syntax:cli
typings install dt~jquery --save --global
```

## tsconfig.jsonの生成

```syntax:cli
tsc --init
```

一部コードの変更
```syntax:json
{
  "compilerOptions": {
    ...
    "target": "es6",//使用するEcmaScriptのバージョンを指定
    "noImplicitAny": false,//any型の使用に厳格にエラーを出す
    ...
  },
  "files": [
    "ts/app.ts",
    "ts/model.ts",
    "ts/config.ts",
    "typings/index.d.ts"
  ],
  "node_modules": [
    ...
  ]
}
