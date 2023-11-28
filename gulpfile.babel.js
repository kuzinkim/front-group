const gulp = require('gulp');

import settings         from './gulp/config';
import clean            from './gulp/tasks/clean';
import icons            from './gulp/tasks/icons';
import styles           from './gulp/tasks/styles';
import scripts          from './gulp/tasks/scripts';
import staticFiles      from './gulp/tasks/static';

const { paths } = settings;

const watch = () => {
  gulp.watch(paths.icons.src, icons);
  gulp.watch(paths.static.map(item => item[0]), staticFiles);
  gulp.watch(paths.watch.scripts + '/**/*.*', scripts);
  gulp.watch(paths.watch.styles + '/**/*.*', styles);
};

const setDev = (done) => {
  settings.mode = 'development';
  done();
};

const setProd = (done) => {
  settings.mode = 'production';
  done();
};

gulp.task('build',
  gulp.series(
    clean,
    icons,
    staticFiles,
    gulp.parallel(
      styles,
      scripts,
    )
  )
);

gulp.task('dev',
  gulp.series(
    setDev,
    'build'
  )
);

gulp.task('prod',
  gulp.series(
    setProd,
    'build'
  )
);

gulp.task('default',
  gulp.series(
    'dev',
    watch
  )
);
