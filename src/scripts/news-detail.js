
const bindNewsSlider = (node) => {
  if (!node) {
    return false;
  }

  const options = {
    slidesPerView: 4,

    breakpoints: {
        // when window width is >= 320px
        0: {
          slidesPerView: 2,
          spaceBetween: 10,
        },
        // when window width is >= 480px
        500: {
          slidesPerView: 3,
          spaceBetween: 20,
        },
        // when window width is >= 640px
        1000: {
          slidesPerView: 4,
          spaceBetween: 20,
        }
    }
  }

  return new Swiper(node, options);
}

// const bindNewsVerticalSlider = (node) => {
//   if (!node) {
//     return false;
//   }

//   const options = {
//     slidesPerView: 2,
//     direction: 'vertical',
//     mousewheel: {
//         releaseOnEdges: true,
//     },

//     breakpoints: {
//         // when window width is >= 320px
//         0: {
//           slidesPerView: 2,
//         },
//         // when window width is >= 480px
//         500: {
//           slidesPerView: 2,
//         },
//         // when window width is >= 640px
//         1000: {
//           slidesPerView: 2,
//         }
//     }
//   }

//   return new Swiper(node, options);
// }

window.addEventListener('load', () => {

  for (const slider of document.querySelectorAll('.news-detail__slider_horizontal .swiper')) {
    bindNewsSlider(slider);
  }

  // for (const slider of document.querySelectorAll('.news-detail__slider_vertical .swiper')) {
  //   bindNewsVerticalSlider(slider);
  // }
})