'use strict';

const projectOptions = {
  states: {},
  maskes: {},
  error: {
    default: 'Ошибка при отправке данных! Пожалуйста, попробуйте позже.',
    request: 'Ошибка при отправке данных! Пожалуйста, свяжитесь с нами по телефону <a class="customLink customLink_light" href="tel:88005112733"><nobr>8 (800) 511-27-33</nobr></a>'
  },
  onClick: [],
};


//=require components/base/menu.js
//=require components/base/adapt.js
//=require components/base/search.js
//=require components/base/headerFixed.js
//=require components/base/breadcrumbs.js
//=require helpers/trottle.js
//=require helpers/toggle-visibility.js

//=require components/load-images.js

//=require components/lazy-load-block.js


const initDefaultElements = function(e) {
  initImages(e);
}

const pageReady = function(e) {
  initLazyLoadBlock(e);
  initDefaultElements(e);
  showMobileMenu();
  useDynamicAdapt();
  breadcrumbs();
}

document.addEventListener("DOMContentLoaded", pageReady);
