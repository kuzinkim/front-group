const bindProductGallery = (node) => {
    if (!node) {
        return false;
    }

    let sliderThumbs = new Swiper(node.querySelector('.card-thumb .swiper'), {
        loop: true,
        spaceBetween: 8,
        slidesPerView: 4,
        freeMode: true,
        watchSlidesProgress: true,

        breakpoints: {
            1500: {
                direction: "vertical",
            }
        }
    })

    let sliderTop = new Swiper(node.querySelector('.card-slider .swiper'), {
        thumbs: {
            swiper: sliderThumbs,
        },
    });
};

document.addEventListener('DOMContentLoaded', function () {
    bindProductGallery(document.querySelector('.card__slider'), false);
})