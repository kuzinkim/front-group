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

    bindButtons(swiperNode)

    const cloneSwiper = (node) => {
        const clone = node.cloneNode(true);
        clone.classList.add('compare-section__items-slider_clone');

        bindButtons(clone);

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

const updateSizes = () => {
    const compareItems = [...document.querySelectorAll('.compare__section_active .compare-item')];
    const compareTitles = [...document.querySelectorAll('.compare__section_active .compare-title-column__row_char')];

    const rowSizes = [];

    compareItems.map((item) => {
        const rows = [...item.querySelectorAll('.compare-item__char')];
        rows.map((row, index) => {
            if (!rowSizes[index]) {
                rowSizes.push(Math.ceil(row.scrollHeight));
                return false;
            }
            if (rowSizes[index] < row.offsetHeight) {
                rowSizes[index] = Math.ceil(row.scrollHeight);
                return false;
            }
            return false;
        })
    })

    console.log(rowSizes)

    compareTitles.map((title, index) => {
        title.style.height = rowSizes[index] + 'px';
    })
    compareItems.map((item) => {
        const rows = [...item.querySelectorAll('.compare-item__char')];
        rows.map((row, index) => {
            row.style.height = rowSizes[index] + 'px';
        })
    })

    if (window.matchMedia('(max-width: 720px)').matches) {
        const activeTabBody = document.querySelector('.compare__section_active');
        const activeTabBodyTop = activeTabBody.getBoundingClientRect().top + window.scrollY;

        const firstItem = document.querySelector('.compare__section_active .compare-item');
        const rows = [...firstItem.querySelectorAll('.compare-item__char')];

        rows.map((row, index) => {
            const coord = row.getBoundingClientRect().top + window.scrollY - activeTabBodyTop;

            compareTitles[index].style.top = `${coord - 20}px`;
        })
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
            toggle.scrollIntoView({behavior: "smooth"});
            target.classList.add('compare__section_active');

            setTimeout(() => {updateSizes();}, 100)
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
            slideNode.setAttribute('data-item-id', slide.querySelector('.compare-item').getAttribute('data-item-id'))

            const btn = document.createElement('button');
            btn.classList.add('compare-item__to-cart');
            btn.setAttribute('type', 'button');
            btn.innerText = 'В корзину';

            btn.addEventListener('click', (e) => {
                e.preventDefault();
                addToCart(btn);
            })

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

const clearSection = (btn) => {

    if (!btn) {
        return false;
    }

    const id = btn.closest('.compare-section') && btn.closest('.compare-section').getAttribute('data-category-id');

    if (!id) {
        return false;
    }

    fetch(`/ajax/compare.php?section=${id}`)
        .then((resp) => resp.json())
        .then(({success}) => {
            if (success) {
                window.location.reload();
            } else {
                throw new Error('Серверная ошибка удаления.')
            }
        }).catch((e) => {
        console.warn(e.message)
    })
}

const clearAll = () => {
    fetch(`/ajax/compare.php?clear=Y`)
        .then((resp) => resp.json())
        .then(({success}) => {
            if (success) {
                window.location.reload();
            } else {
                throw new Error('Серверная ошибка очистки.')
            }
        }).catch((err) => {
        console.warn(err)
    })
}

const deleteCompareItem = (btn) => {
    if (!btn) {
        return false;
    }

    const id = btn.closest('.compare-item') && btn.closest('.compare-item').getAttribute('data-item-id');

    if (!id) {
        return false;
    }

    fetch(`/ajax/compare.php?id=${id}&delete=Y`)
        .then((resp) => resp.json())
        .then((resp) => {
            if (resp.success) {
                window.location.reload()
            } else {
                throw new Error('Серверная ошибка удаления товара из сравнения')
            }
        })
        .catch((err) => {
            console.log(err)
        })
}

const addToCart = (btn) => {
    if (!btn) {
        return false;
    }

    const id = btn.closest('.compare-item') && btn.closest('.compare-item').getAttribute('data-item-id')
    || btn.closest('.swiper-slide') && btn.closest('.swiper-slide').getAttribute('data-item-id');

    if (!id) {
        return false;
    }

    const headerBasketBtn = document.querySelector('.headerActions__btn_basket');

    let name = btn.getAttribute('data-name')
    let srcImg = btn.getAttribute('data-img')

    if (btn.classList.contains('compare-item__to-cart_in-cart')) {
        fetch(`/ajax/basket.php?id=${id}&delete=Y`)
            .then((resp) => resp.json())
            .then((resp) => {
                if (resp.success) {
                    btn.classList.remove('compare-item__to-cart_in-cart');
                    if (resp.count !== undefined && headerBasketBtn) {
                        if (!isNaN(resp.count)) {
                            headerBasketBtn.setAttribute('data-count', String(resp.count))
                        }
                    }
                    btn.innerText('В корзину')
                } else {
                    throw new Error('Серверная ошибка удаления товара из корзины')
                }
            })
            .catch((err) => {
                console.log(err)
            })
    } else {
        fetch(`/ajax/basket.php?id=${id}&count=1&json=1`)
            .then((resp) => resp.json())
            .then((resp) => {
                if (resp.success) {
                    btn.classList.add('compare-item__to-cart_in-cart');
                    Fancybox.show([{
                        src: `<div class="modal modal_white modal_card">
                        <div class="modal__body modal-card">
                            <div class="modal-card__title">Товар добавлен в корзину</div>
                            <div class="modal-card__inner">
                                <span class="modal-card__img">
                                    <img src="${srcImg}" alt="">
                                </span>
                                <span class="modal-card__name">"${name}"</span>
                                <div class="modal-card__wrapper">
                                    <div class="modal-card__actions">
                                        <a href="/cart" class="modal-card__btn modal-card__btn_cart">В корзину</a>
                                        <button type="button" class="modal-card__btn modal-card__btn_close" onclick="Fancybox.close()">В каталог</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>`, type: "html",
                    },]);
                    btn.innerText('В корзине');
                    if (resp.count !== undefined && headerBasketBtn) {
                        if (!isNaN(resp.count)) {
                            headerBasketBtn.setAttribute('data-count', String(resp.count))
                        }
                    }
                } else {
                    throw new Error('Серверная ошибка добавления товара в корзину')
                }
            })
            .catch((err) => {
                console.log(err)
            })
    }
}

const bindButtons = (root) => {
    for (const addToCartBtn of root.querySelectorAll('.compare-item__to-cart')) {
        addToCartBtn.addEventListener('click', (e) => {
            e.preventDefault();
            addToCart(addToCartBtn);
        })
    }

    for (const deleteItemBtn of root.querySelectorAll('.compare-item__del')) {
        deleteItemBtn.addEventListener('click', (e) => {
            e.preventDefault();
            deleteCompareItem(deleteItemBtn)
        })
    }
}

window.addEventListener('DOMContentLoaded', () => {
    const swiperNodes = [...document.querySelectorAll('.compare-section__items-slider .swiper')];
    if (swiperNodes.length) {
        swiperNodes.map((swiperNode, index) => {
            bindCompareItemsSlider(swiperNode, index)
        })
    }

    bindCompareTabs(document.querySelector('.compare__toggles'));

    for (const clearSectionBtn of document.querySelectorAll('.compare-section__remove-section')) {
        clearSectionBtn.addEventListener('click', (e) => {
            e.preventDefault();
            clearSection(clearSectionBtn)
        })
    }

    for (const clearAllBtn of document.querySelectorAll('.compare__clear')) {
        clearAllBtn.addEventListener('click', (e) => {
            e.preventDefault()
            clearAll();
        })
    }

    /*for (const deleteItemBtn of document.querySelectorAll('.compare-item__del')) {
        deleteItemBtn.addEventListener('click', (e) => {
            e.preventDefault();
            deleteCompareItem(deleteItemBtn)
        })
    }

    for (const addToCartBtn of document.querySelectorAll('.compare-section__items-slider:not(.compare-section__items-slider_clone) .compare-item__to-cart')) {
        addToCartBtn.addEventListener('click', (e) => {
            e.preventDefault();
            addToCart(addToCartBtn);
        })
    }*/

    updateSizes();
})

window.addEventListener('resize', updateSizes);