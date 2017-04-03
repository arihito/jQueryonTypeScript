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

```syntax:TypeScript
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

## webpack.config.jsの設定

NODE_ENVの値がproductionであればjsファイルを圧縮し、それ以外であればエラーの行を出力

```syntax:JavaScript
'use strict';
var path = require('path');
var webpack = require('webpack');
var env = process.env.NODE_ENV;
let config = {
    entry: {
        app :'./ts/app.ts'
    },
    output: {
        filename: '[name].js'
    },
    resolve: {
        extensions:['', '.ts', '.webpack.js', '.web.js', '.js']
    },
    module: {
        loaders: [
            { test: /\.ts$/, loader: 'ts-loader' }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV' : JSON.stringify(env)
        }),
        new webpack.optimize.OccurrenceOrderPlugin()
    ]
};

if (env === 'production') {
    config.output.filename = '[name].min.js';
    config.plugins.push(new webpack.optimize.UglifyJsPlugin({
        compress: {
            warnings: false
        }
    }));
} else {
    config.devtool = 'source-map';
}

module.exports = config;
```

### gulpfile.jsの設定

初期化のためのファイル削除とwebpackで圧縮結合したファイルをdist/jsに移動するタスクを監視する

```syntax:JavaScript
var gulp = require('gulp');
var webpack = require('gulp-webpack');
var webpackConfig = require('./webpack.config.js');
var del = require('del');

var TS_SRC = './ts/**/*.ts';
var JS_DEST = './dist/js/';

gulp.task('clean', function() {
    del([JS_DEST]);
});

gulp.task('webpack', function () {
    return gulp.src([TS_SRC])
        .pipe(webpack(webpackConfig))
        .pipe(gulp.dest(JS_DEST));
});

gulp.task('watch', function () {
    gulp.watch(TS_SRC, ['webpack']);
});

gulp.task('default', ['webpack']);
```

### index.htmlのjsファイル読み込みと表示IDを設定

```syntax:html
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="utf-8">
    <title>TypeScriptのテスト</title>
    <script src="dist/js/app.js"></script>
</head>
<body>
<div id="name"></div>
</body>
</html>
```

## Webpackのバンドル実行

package.jsonファイルにクライアントスクリプトを追加

  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "wp": "webpack"
  },

```syntax:cli
npm run wp
```

> プロジェクトのルートにapp.jsとapp.js.mapが作成されれば成功

## gulpのタスク実行

```syntax:cli
gulp
```

> **gulpを実行しdistディレクトリが生成されその中にjs/app.jsが作成されれば成功
