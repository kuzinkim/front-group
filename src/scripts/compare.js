const bindCompareItemsSlider = (swiperNode) => {
    if (!swiperNode) {
        return false;
    }
    const prevBtn = swiperNode.parentElement.querySelector('.compare-section__control_prev');
    const nextBtn = swiperNode.parentElement.querySelector('.compare-section__control_next');
    const pagination = swiperNode.parentElement.querySelector('.compare-section__pagination');

    const swiperInitial = new Swiper(swiperNode, {
        navigation: {
            prevEl: prevBtn,
            nextEl: nextBtn,
        },
        pagination: {
            el: pagination,
            type: "fraction",
        },
        breakpoints: {
            1501: {
                slidesPerView: 5,
            },
            1251: {
                slidesPerView: 4,
            },
            1001: {
                slidesPerView: 3,
            },
            0: {
                slidesPerView: 1,
            }
        }
    })

    const cloneSwiper = (node) => {
        const clone = node.cloneNode(true);
        clone.classList.add('compare-section__items-slider_clone');

        node.after(clone);

        const prevBtn = clone.querySelector('.compare-section__control_prev');
        const nextBtn = clone.querySelector('.compare-section__control_next');
        const pagination = clone.querySelector('.compare-section__pagination');


        const clonedSwiper = new Swiper(clone.querySelector('.swiper'), {
            navigation: {
                prevEl: prevBtn,
                nextEl: nextBtn,
            },
            slidesPerView: 1,
            initialSlide: 1,
            pagination: {
                el: pagination,
                type: "fraction",
            },
        })
    }

    if (window.matchMedia('(max-width: 1000px)').matches) {
        cloneSwiper(swiperNode.parentElement)
    }
}

const bindCompareTabs = (node) => {
    if (!node) {
        return false;
    }

    const toggles = [...node.querySelectorAll('.compare__tab-button')];

    if (!toggles.length) {
        return false;
    }

    toggles.map((toggle) => {
        toggle.addEventListener('click', (e) => {
            e.preventDefault();

            const target = document.querySelector(toggle.getAttribute('href'));

            if (!target) {
                return false;
            }

            const activeBtn = node.querySelector('.compare__tab-button_active');
            const activeContent = document.querySelector('.compare__section_active');

            if (activeBtn) {
                activeBtn.classList.remove('compare__tab-button_active');
            }
            if (activeContent) {
                activeContent.classList.remove('compare__section_active');
            }

            toggle.classList.add('compare__tab-button_active');
            target.classList.add('compare__section_active');
        })
    })
}

window.addEventListener('DOMContentLoaded', () => {
    for (const swiperNode of document.querySelectorAll('.compare-section__items-slider .swiper')) {
        bindCompareItemsSlider(swiperNode)
    }

    bindCompareTabs(document.querySelector('.compare__toggles'));
})