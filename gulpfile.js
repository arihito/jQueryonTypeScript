var gulp = require('gulp');var webpack = require('gulp-webpack');var webpackConfig = require('./webpack.config.js');var del = require('del');var TS_SRC = './ts/**/*.ts';var JS_DEST = './dist/js/';gulp.task('clean', function() {  del([JS_DEST]);});gulp.task('webpack', function() {  return gulp.src([TS_SRC])  .pipe(webpack(webpackConfig))  .pipe(gulp.dest(JS_DEST));});gulp.task('watch', function() {  gulp.watch(TS_SRC, ['webpack']);});gulp.task('default', ['webpack']);