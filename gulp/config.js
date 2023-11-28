const PATHS = {
  src: './src/',
  build: './build/',
}

const sources = {
  scripts: PATHS.src + 'scripts',
  styles: PATHS.src + 'styles',
  static: PATHS.src + 'static',
}

export default {
  paths: {
    src: PATHS.src,
    build: PATHS.build,

    watch: sources,

    icons: {
      src: [
        sources.static + '/svg/*.svg',
      ],
      dist: [
        PATHS.build + 'icons/',
      ],
    },

    static: [
      [sources.static + '/fonts/**/*.*', PATHS.build + 'fonts/'],
      [sources.static + '/icons/**/*.*', PATHS.build + 'icons/'],

      ['./node_modules/normalize.css/normalize.css', PATHS.build + 'styles/vendors/'],
      ['./node_modules/swiper/swiper-bundle.min.css', PATHS.build + 'styles/vendors/'],

      ['./node_modules/swiper/swiper-bundle.min.js', PATHS.build + 'scripts/vendors/'],

      ['./node_modules/lozad/dist/lozad.min.js', PATHS.build + 'scripts/vendors/'],
      // ['./node_modules/axios/dist/axios.min.js', PATHS.build + 'scripts/vendors/'],
      //['./node_modules/just-validate/dist/just-validate.production.min.js', PATHS.build + 'scripts/vendors/'],
      // ['./node_modules/fslightbox/index.js', PATHS.build + 'scripts/vendors/'],
    ],

    styles: [
      {
        files: sources.styles + '/*.*',
        appoint: 'general',
        dest: PATHS.build + 'styles'
      },
      {
        files: sources.styles + '/pages/*.*',
        appoint: 'pages',
        dest: PATHS.build
      },
      {
        files: sources.styles + '/vendors/*.*',
        appoint: 'vendors',
        dest: PATHS.build + 'styles/vendors'
      }
    ],

    scripts: [
      {
        files: sources.scripts + '/*.*',
        appoint: 'general',
        dest: PATHS.build + 'scripts'
      },
      {
        files: sources.scripts + '/pages/*.*',
        appoint: 'pages',
        dest: PATHS.build
      },
      {
        files: sources.scripts + '/vendors/*.*',
        appoint: 'vendors',
        dest: PATHS.build + 'scripts/vendors'
      }
    ],
  },

  mode: 'production',

  browsers: ['> 0.1%'],
  // browsers: ['ie >= 10', 'ff >= 29', 'Opera >= 12', 'iOS >= 6', 'Chrome >= 28', 'Android >= 2'],
}