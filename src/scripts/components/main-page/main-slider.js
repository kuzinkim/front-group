let mySwiper;

const bindMainSlider = (node) => {
  if (!node) {
    return false;
  }

  const options = {
    slidesPerView: 1,
    navigation: {
      prevEl: node.parentElement.querySelector('.slideContols__btn_prev'),
      nextEl: node.parentElement.querySelector('.slideContols__btn_next'),
    },
    autoplay: {
      delay: 3000,
    },
    loop: true
  }

  return new Swiper(node, options);
}

const bindPartnerSlider = (node) => {
  if (!node) {
    return false;
  }

  const options = {
    grabCursor: true,
    centeredSlides: true,
    autoplay: {
      delay: 1000,
    },
    loop: true,

    breakpoints: {
      // when window width is >= 320px
      0: {
        slidesPerView: 3,
      },
      // when window width is >= 480px
      495: {
        slidesPerView: 5,
      },
      // when window width is >= 640px
      1000: {
        slidesPerView: 7,
      }
    }
  }

  return new Swiper(node, options);
}

window.addEventListener('load', () => {

  for (const slider of document.querySelectorAll('.front-slider_main .swiper')) {
    bindMainSlider(slider);
  }

  for (const slider of document.querySelectorAll('.front-slider_partners .swiper')) {
    bindPartnerSlider(slider);
  }
})