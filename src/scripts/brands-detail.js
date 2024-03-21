let navButton = document.querySelector('.brand-detail__button')
let brandNav = document.querySelector('.brand-nav')
let brandBg = document.querySelector('.brand-detail__bg')
let brandClose = document.querySelector('.brand-detail__close')
let categoryBtn = document.querySelector('.brand-detail__button')

const bindBrandsSlider = (node) => {
    if (!node) {
        return false;
    }

    const options = {
        breakpoints: {
            0: {
                slidesPerView: 1,
                spaceBetween: 10,
            },
            768: {
                slidesPerView: 2,
                spaceBetween: 20,
            },

            1199: {
                slidesPerView: 3,
                spaceBetween: 20,
            },
        }
    }

    return new Swiper(node, options);
}

window.addEventListener('DOMContentLoaded', () => {

    for (const slider of document.querySelectorAll('.brand-detail__img .swiper')) {
        bindBrandsSlider(slider);
    }

    if (window.matchMedia("(max-width: 767px)").matches) {
        collapseChildItems('.js-collapse-brand-text', {
            targetHeight: 150,
            buttonMore: 'Развернуть',
            buttonLess: 'Свернуть'
        });
    }

    navButton.addEventListener('click', function () {
        brandNav.classList.add('is-open')
        brandBg.classList.add('is-open')
    })

    brandBg.addEventListener('click', function () {
        brandNav.classList.remove('is-open')
        brandBg.classList.remove('is-open')
    })

    brandClose.addEventListener('click', function () {
        brandNav.classList.remove('is-open')
        brandBg.classList.remove('is-open')
    })

    let category = categoryBtn.getAttribute('data-category');

    if(category){
        categoryBtn.textContent = category
    }
})