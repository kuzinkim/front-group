const gulp          = require('gulp');
const gulpif        = require('gulp-if');
const rename        = require('gulp-rename');
const notify        = require('gulp-notify');
const plumber       = require('gulp-plumber');
const uglify        = require('gulp-uglify-es').default;
// const babel         = require('gulp-babel');
const include       = require('gulp-include')
const sourcemaps    = require('gulp-sourcemaps');
// const concat        = require('gulp-concat');

import settings from '../config';

const {paths} = settings;

const scripts = (done) => {
  for (let i = 0; i < paths.scripts.length; i++) {
    const appoint = paths.scripts[i].appoint;
    const files = paths.scripts[i].files;
    const dest = paths.scripts[i].dest;

    if (settings.mode !== 'development' && false) {
      gulp.src(files)
      .pipe(plumber({
        errorHandler: notify.onError('Error: Incorrect Script \n\n <%= error.message %>')
      }))
      .pipe(include({
        extensions: 'js',
        hardFail: true,
        separateInputs: true,
        includePaths: [
          paths.src + 'scripts'
        ]
      }))
      .on('error', console.log)
      .pipe(gulpif(appoint === 'pages', rename(function (path) {
        if (path.basename !== 'index') {
          path.dirname += '/' + path.basename;
        }
        path.basename = 'script';
      })))
      .pipe(gulp.dest(dest))
      .pipe(plumber.stop());
    }

    gulp.src(files)
      .pipe(plumber({
        errorHandler: notify.onError('Error: Incorrect Script \n\n <%= error.message %>')
      }))
      .pipe(gulpif(settings.mode === 'development', sourcemaps.init()))
      .pipe(include({
        extensions: 'js',
        hardFail: true,
        separateInputs: true,
        includePaths: [
          paths.src + 'scripts'
        ]
      }))
      .on('error', console.log)
      // .pipe(babel(
      //   {
      //     presets: [
      //       "@babel/preset-env"
      //     ]
      //   }
      // ))
      // .pipe(concat('scripts.js'))
      .pipe(uglify({
        // compress: {
        // 	unused: false
        // },
        // toplevel: true,
        output: {
          comments: `/^!/`
        }
      }))
      .pipe(gulpif(appoint === 'pages', rename(function (path) {
        if (path.basename !== 'index') {
          path.dirname += '/' + path.basename;
        }
        path.basename = 'script';
      })))
      .pipe(rename({suffix: '.min'}))
      .pipe(gulpif(settings.mode === 'development', sourcemaps.write('./')))
      .pipe(gulp.dest(dest))
      .pipe(plumber.stop());
  }
  done();
}

export default scripts;