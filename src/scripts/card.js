const bindProductGallery = (node) => {
    if (!node) {
        return false;
    }

    let sliderThumbs = new Swiper(node.querySelector('.card-thumb .swiper'), {
        spaceBetween: 8,
        slidesPerView: 4,
        freeMode: true,
        watchSlidesProgress: true,

        breakpoints: {
            900: {
                direction: "vertical",
            }
        }
    })

    let sliderTop = new Swiper(node.querySelector('.card-slider .swiper'), {
        thumbs: {
            swiper: sliderThumbs,
        },
        pagination: {
            el: '.swiper-pagination',
            type: 'bullets',
        },
    });
};

document.addEventListener('DOMContentLoaded', function () {
    bindProductGallery(document.querySelector('.card__slider'), false);
})