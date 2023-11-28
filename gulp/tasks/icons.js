const gulp    = require('gulp');
const notify  = require('gulp-notify');
const plumber = require('gulp-plumber');
const svgmin  = require('gulp-svgmin');
const cheerio = require('gulp-cheerio');
const sprite  = require('gulp-svg-sprite');

import settings from '../config';

const {paths} = settings;

const config = {
  mode: {
    symbol: {
      sprite: "../sprite.svg"
    }
  },
};

const icons = (done) => {
  gulp.src(paths.icons.src)
    .pipe(plumber({
      errorHandler: notify.onError('Error: Incorrect Lib CSS \n\n <%= error.message %>')
    }))
    .pipe(svgmin({
      js2svg: {
        pretty: true
      }
    }))
    .pipe(cheerio({
      run: function ($) {
        $('[xmlns]').removeAttr('xmlns');
        // $('[fill]').removeAttr('fill');
        // $('[stroke]').removeAttr('stroke');
        // $('[style]').removeAttr('style');
      },
      parserOptions: {xmlMode: true}
    }))
    .pipe(sprite(config))
    .pipe(plumber.stop())
    .pipe(gulp.dest(paths.icons.dist));

  done();
}

export default icons;