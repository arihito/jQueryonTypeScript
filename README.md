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

TypeScriptのコードをトランスパイル(jsに変換)する設定ファイルを作成

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
```

## tsファイルの作成

上記で設定したTypeScriptファイルを変換する。

### ts/config.tsの記述

Configというクラスを定義してENVという定数名にdevという名前空間を定義

**```syntax:TypeScript
'use strict'
namespace Config {
  export const ENV = "dev"
}
export default Config;
```

### ts/model.ts

名前空間のconfig.tsを読み込み開発用の設定でなければ人間クラスに定義した名前プロパティの名前を「さん」付けで返す

```syntax:json
'use strict'
import Config from './config';

namespace Model {
  export class Person {
    constructor(private name:string = 'dummy') {
    }
    public getName():string {
      if (Config.ENV != 'production') {
        return this.name;
      } else {
        return this.name + 'さん';
      }
    }
  }
}
export default Model;
```

### ts/app.ts

jQueryを読み込み固有名を指定したクラスからインスタンスを生成し名前をドキュメントに表示するメインとなる処理を記述する。

```syntax:TypeScript
'use strict'
import Model from './model';
import $ = require("jquery");
var user = new Model.Person("Mike");
$(() => {
  B
  $("name").html(user.getName());
});
```
