const bindCompareItemsSlider = (swiperNode, index) => {
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


        return new Swiper(clone.querySelector('.swiper'), {
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
        });

    }

    window[`COMPARE_ADAPTIVE_${index}`] = false;

    if (window.matchMedia('(max-width: 1000px)').matches) {
        const clonedSwiper = cloneSwiper(swiperNode.parentElement);

        createAdaptiveStickyHeader(swiperNode.parentElement.parentElement, swiperInitial, clonedSwiper);
    }

    window.addEventListener('resize', () => {
        if (!window[`COMPARE_ADAPTIVE_${index}`] && window.matchMedia('(max-width: 1000px)').matches) {
            const clonedSwiper = cloneSwiper(swiperNode.parentElement);
            createAdaptiveStickyHeader(swiperNode.parentElement.parentElement, swiperInitial, clonedSwiper);
            window[`COMPARE_ADAPTIVE_${index}`] = true;
        }

        if (window[`COMPARE_ADAPTIVE_${index}`] && window.matchMedia('(min-width: 1001px)').matches) {
            const clonedSwipers = [...document.querySelectorAll('.compare-section__items-slider_clone')];

            if (clonedSwipers.length) {
                clonedSwipers.map((swiper) => {
                    swiper.remove()
                })
            }

            const stickyHeaders = [...document.querySelectorAll('.mobile-sticky-header')];

            if (stickyHeaders.length) {
                stickyHeaders.map((header) => {
                    header.remove();
                })
            }

            window[`COMPARE_ADAPTIVE_${index}`] = false;
        }

    })
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
            toggle.scrollIntoView({behavior: "smooth"});
            target.classList.add('compare__section_active');
        })
    })
}

const createAdaptiveStickyHeader = (root, swiperInitial, clonedSwiper) => {

    const header = document.createElement('div');
    header.classList.add('mobile-sticky-header');
    const container = document.createElement('div');
    container.classList.add('container');
    header.append(container);


    const createSwiper = (controlFor, slides, initialSlide = 0) => {
        const swiperNode = document.createElement('div');
        swiperNode.classList.add('swiper');
        const swiperWrapper = document.createElement('div');
        swiperWrapper.classList.add('swiper-wrapper');
        const pagination = document.createElement('div');
        pagination.classList.add('mobile-sticky-header__pagination');
        swiperNode.append(pagination);
        const prevBtn = document.createElement('button');
        prevBtn.setAttribute('type', 'button');
        prevBtn.classList.add('mobile-sticky-header__control');
        prevBtn.classList.add('mobile-sticky-header__control_prev');
        swiperNode.append(prevBtn);
        const nextBtn = document.createElement('button');
        nextBtn.setAttribute('type', 'button');
        nextBtn.classList.add('mobile-sticky-header__control');
        nextBtn.classList.add('mobile-sticky-header__control_next');
        swiperNode.append(nextBtn);

        [...slides].map((slide) => {
            const slideNode = document.createElement('div');
            slideNode.classList.add('swiper-slide');
            slideNode.append(slide.querySelector('.compare-item__name').cloneNode(true));

            const btn = document.createElement('button');
            btn.classList.add('compare-item__to-cart');
            btn.setAttribute('type', 'button');
            btn.innerText = 'В корзину';

            slideNode.append(btn);

            swiperWrapper.append(slideNode);
        })

        swiperNode.append(swiperWrapper);

        container.append(swiperNode);

        new Swiper(swiperNode, {
            slidesPerView: 1,
            controller: {
                control: controlFor,
            },
            pagination: {
                el: pagination,
                type: "fraction",
            },
            initialSlide: initialSlide,
            navigation: {
                prevEl: prevBtn,
                nextEl: nextBtn,
            }
        })

    }

    createSwiper(swiperInitial, swiperInitial.el.querySelectorAll('.swiper-slide'), 0);
    createSwiper(clonedSwiper, swiperInitial.el.querySelectorAll('.swiper-slide'), 1);

    root.append(header);

    window.addEventListener('scroll', () => {
        const priceNode = document.querySelector('.compare__section_active .compare-item__char');
        const activeHeader = document.querySelector('.compare__section_active .mobile-sticky-header')

        if (window.matchMedia('(min-width: 1001px)').matches) {
            return false;
        }

        if (priceNode && activeHeader) {
            if (priceNode.getBoundingClientRect().top < 70 && !activeHeader.classList.contains('mobile-sticky-header_show')) {
                activeHeader.classList.add('mobile-sticky-header_show');
            } else if (priceNode.getBoundingClientRect().top >= 70) {
                activeHeader.classList.remove('mobile-sticky-header_show');
            }

        }
    })
}

window.addEventListener('DOMContentLoaded', () => {
    const swiperNodes = [...document.querySelectorAll('.compare-section__items-slider .swiper')];
    if (swiperNodes.length) {
        swiperNodes.map((swiperNode, index) => {
            bindCompareItemsSlider(swiperNode, index)
        })
    }

    bindCompareTabs(document.querySelector('.compare__toggles'));
})