var smartgrid = require('smart-grid');

/* It's principal settings in smart grid project */

var settings = {
  outputStyle: 'scss',   /* less || scss || sass || styl */
  mobileFirst: false,    /* mobileFirst ? 'min-width' : 'max-width' */
  offset: '24px',        /* gutter width px || % || rem */
  columns: 12,           /* number of grid columns */
  container: {
    fields: '15px',      /* side fields */
    maxWidth: '1230px',  /* max-width оn very large screen */
  },
  breakPoints: {
    max1259: {
      width: '1259px',
    },
    max991: {
      width: '991px',
    },
    max767: {
      width: '767px',
    },
    max599: {
      width: '599px',
    },
    max479: {
      width: '479px',
    },
    max375: {
      width: '375px',
    }

    // start: max-width:    max - 1920px (1890px)
    //   xxl: max-width: 1919px - 1440px (1410px) 480px
    //    xl: max-width: 1439px - 1230px (1200px) 210px
    //     l: max-width: 1229px -  992px  (960px) 240px
    //     m: max-width:  991px -  768px  (740px) 220px
    //     s: max-width:  767px -  600px  (570px) 170px
    //    xs: max-width:  575px -  320px   (full) 250px

    // some_name: {
    // 	width: 'Npx',
    // 	fields: 'N(px|%|rem)',
    // 	offset: 'N(px|%|rem)'
    // }
  }
};

smartgrid('./src/styles/mixins', settings);

// После настройки файла, запустить его с помощью node.js - node smart-grid-config.js