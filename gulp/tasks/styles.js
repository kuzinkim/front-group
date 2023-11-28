const gulp         = require('gulp');
const gulpif       = require('gulp-if');
const rename       = require('gulp-rename');
const notify       = require('gulp-notify');
const plumber      = require('gulp-plumber');
const gulpSass     = require('gulp-sass');
const dartSass     = require('sass');
const sassGlob     = require('gulp-sass-glob');
const cleanCss     = require('gulp-clean-css');
// const sourcemaps   = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');
const gcmq         = require('gulp-group-css-media-queries');
const sass         = gulpSass(dartSass);

import settings from '../config';

const {paths} = settings;

const styles = (done) => {
  for (let i = 0; i < paths.styles.length; i++) {
    const appoint = paths.styles[i].appoint;
    const files = paths.styles[i].files;
    const dest = paths.styles[i].dest;

    gulp.src(files)
      .pipe(plumber({
        errorHandler: notify.onError('Error: Incorrect Style \n\n <%= error.message %>')
      }))
      // .pipe(gulpif(settings.mode === 'development', sourcemaps.init()))
      .pipe(sassGlob())
      .pipe(sass())
      .pipe(gcmq())
      .pipe(autoprefixer({
        overrideBrowserslist: settings.browsers,
        cascade: false
      }))
      .pipe(cleanCss({
        // format: 'keep-breaks',
        level: {
          2: {
            removeDuplicateRules: true
          }
        }
      }))
      .pipe(gulpif(appoint === 'pages', rename(function (path) {
        if (path.basename !== 'index') {
          path.dirname += '/' + path.basename;
        }
        path.basename = 'style';
      })))
      // .pipe(gulpif(settings.mode === 'development', sourcemaps.write('./')))
      .pipe(gulp.dest(dest))
      .pipe(plumber.stop());
  }
  done();
}

export default styles;