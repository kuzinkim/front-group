const bindCardSlider = (sliderNode) => {
    if (!sliderNode || !sliderNode.classList.contains('swiper')) {
        return false;
    }

    if (!!Swiper) {
        return new Swiper(sliderNode, {
            pagination: {
                el: ".swiper-pagination", clickable: true,
            },
        })
    }
}

const bindLikeBtn = (btnNode, id) => {
    if (!btnNode || !id) {
        return false;
    }

    btnNode.addEventListener('click', (e) => {
        e.preventDefault();

        if (e.target.classList.contains('item-card__like_liked')) {
            //todo: здесь вставить запрос на удаление из лайков
            fetch('/somepath/' + id)
                .then((resp) => resp.json())
                .then((resp) => {
                    if (resp.status === 'success') {
                        e.target.classList.remove('item-card__like_liked')
                    } else {
                        throw new Error('Серверная ошибка удаления товара из понравившихся')
                    }
                })
                .catch((err) => {
                    console.log(err)
                })
        } else {
            //todo: здесь вставить запрос на добавление в лайки
            fetch('/somepath/' + id)
                .then((resp) => resp.json())
                .then((resp) => {
                    if (resp.status === 'success') {
                        e.target.classList.add('item-card__like_liked')
                    } else {
                        throw new Error('Серверная ошибка добавления товара в понравившиеся')
                    }
                })
                .catch((err) => {
                    console.log(err)
                })
        }
    })
}

const bindCompareBtn = (btnNode, id) => {
    if (!btnNode || !id) {
        return false;
    }

    btnNode.addEventListener('click', (e) => {
        e.preventDefault();

        if (e.target.classList.contains('item-card__compare_compared')) {
            //todo: здесь вставить запрос на удаление из сравнения
            fetch('/somepath/' + id)
                .then((resp) => resp.json())
                .then((resp) => {
                    if (resp.status === 'success') {
                        e.target.classList.remove('item-card__compare_compared')
                    } else {
                        throw new Error('Серверная ошибка удаления товара из сравнения')
                    }
                })
                .catch((err) => {
                    console.log(err)
                })
        } else {
            //todo: здесь вставить запрос на добавление в сравнение
            fetch('/somepath/' + id)
                .then((resp) => resp.json())
                .then((resp) => {
                    if (resp.status === 'success') {
                        e.target.classList.add('item-card__compare_compared')
                    } else {
                        throw new Error('Серверная ошибка добавления товара в сравнение')
                    }
                })
                .catch((err) => {
                    console.log(err)
                })
        }
    })
}

const bindCartBtn = (btnNode, id, name) => {
    if (!btnNode || !id) {
        return false;
    }

    btnNode.addEventListener('click', (e) => {
        e.preventDefault();

        if (e.target.classList.contains('item-card__cart_in-cart')) {

            fetch(`/ajax/basket.php?id=${id}&delete=Y`)
                .then((resp) => resp.json())
                .then((resp) => {
                    if (resp.success) {
                        e.target.classList.remove('item-card__cart_in-cart')
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
                        e.target.classList.add('item-card__cart_in-cart');
                        Fancybox.show([{
                            src: `<div class="modal-cart-confirmation">
<div>Товар <b>"${name}"</b> добавлен в корзину.</div>
<div class="modal-cart-confirmation__buttons">
<a href="/basket/">Перейти в корзину</a>
<div class="is-close-btn" onclick="Fancybox.close()">Продолжить покупки</div>
</div>
</div>`, type: "html",
                        },]);
                    } else {
                        throw new Error('Серверная ошибка добавления товара в корзину')
                    }
                })
                .catch((err) => {
                    console.log(err)
                })
        }
    })
}

const bindItemCard = (itemCardNode) => {
    if (!itemCardNode) {
        return false;
    }

    const itemId = itemCardNode.getAttribute('data-item-id');

    bindCardSlider(itemCardNode.querySelector('.swiper'));

    bindLikeBtn(itemCardNode.querySelector('.js-item-card-like'), itemId);

    bindCompareBtn(itemCardNode.querySelector('.js-item-card-compare'), itemId);

    const name = itemCardNode.querySelector('.item-card__name').innerText;

    for (const cartBtn of itemCardNode.querySelectorAll('.js-item-card-cart')) {
        bindCartBtn(cartBtn, itemId, name)
    }

}

const itemsSlider = (sliderNode) => {
    if (!sliderNode) {
        return false;
    }

    if (!!Swiper) {
        return new Swiper(sliderNode.querySelector('.swiper'), {
            slidesPerView: 8, spaceBetween: 20, breakpoints: {
                1730: {
                    slidesPerView: 8,
                }, 1560: {
                    slidesPerView: 7,
                }, 1360: {
                    slidesPerView: 6,
                }, 1100: {
                    slidesPerView: 5,
                }, 851: {
                    slidesPerView: 4,
                }, 641: {
                    slidesPerView: 3,
                }, 351: {
                    slidesPerView: 2,
                }, 0: {
                    slidesPerView: 1,
                }

            }
        })
    }
}

const bindPerPageSelect = (selectNode) => {
    if (!selectNode || !NiceSelect) {
        return false;
    }

    NiceSelect.bind(selectNode);
}

const bindSortSelect = (selectNode) => {
    if (!selectNode || !NiceSelect) {
        return false;
    }

    NiceSelect.bind(selectNode);

    selectNode.addEventListener('change', (e) => {
        const params = new URLSearchParams(window.location.search);

        params.set(e.target.getAttribute('name'), e.target.value);
        params.toString();

        localStorage.setItem('scrollToCatalog', '1');

        window.location = window.location.pathname + '?' + params.toString();
    })
}

const bindFilterShowButton = (filterNode) => {
    if (!filterNode) {
        return false;
    }

    const checkboxes = filterNode.querySelectorAll('.filter__checkbox');

    if (!checkboxes) {
        return false;
    }

    /*for (const checkbox of checkboxes) {
        if (checkbox.classList.contains('filter__checkbox_show')) {
            checkbox.setAttribute('data-default', '1');
        }
    }*/

    const showBtn = filterNode.querySelector('.filter__show-more');

    if (!showBtn) {
        return false;
    }

    const initialBtnText = showBtn.innerHTML;

    showBtn.addEventListener('click', (e) => {
        e.preventDefault();

        filterNode.classList.toggle('filter_show-all');

        showBtn.innerHTML.toLowerCase() === 'свернуть' ? showBtn.innerHTML = initialBtnText : showBtn.innerHTML = 'Свернуть';

    })
}

const scrollToCatalog = () => {
    const flag = localStorage.getItem('scrollToCatalog');
    const catalogNode = document.querySelector('.catalog-layout');

    if (flag && catalogNode) {
        catalogNode.scrollIntoView({behavior: 'smooth'});

        localStorage.removeItem('scrollToCatalog');
    }
}

const bindFilterPrice = (filterNode) => {
    if (!filterNode) {
        return false;
    }

    const sliderNode = filterNode.querySelector('.filter__price-slider');

    if (!sliderNode || !noUiSlider) {
        return false;
    }

    noUiSlider.create(sliderNode, {
        start: [Number(sliderNode.getAttribute('data-min')) || 0, Number(sliderNode.getAttribute('data-max')) || 500000],
        connect: true,
        step: 100,
        range: {
            'min': Number(sliderNode.getAttribute('data-min')) || 0,
            'max': Number(sliderNode.getAttribute('data-max')) || 500000,
        },
    });

    const inputMin = filterNode.querySelector('[name="price_from"]');
    const inputMax = filterNode.querySelector('[name="price_to"]');

    sliderNode.noUiSlider.on('update', function (values, handle) {

        const value = values[handle];

        if (handle) {
            inputMax.value = Math.round(value);
        } else {
            inputMin.value = Math.round(value);
        }
    });

    inputMin.addEventListener('change', function () {
        sliderNode.noUiSlider.set([this.value, null]);
    });

    inputMax.addEventListener('change', function () {
        sliderNode.noUiSlider.set([null, this.value]);
    });


}

const bindSectionsListAdaptive = (node) => {
    if (!node) {
        return false;
    }

    if (window.matchMedia('(max-width: 750px)').matches && window.ADAPTIVE_SUBSECTIONS_FLAG) {
        return false;
    }

    if (window.matchMedia('(min-width: 751px)').matches && !window.ADAPTIVE_SUBSECTIONS_FLAG) {
        return false;
    }

    if (window.matchMedia('(max-width: 750px)').matches && !window.ADAPTIVE_SUBSECTIONS_FLAG) {

        window.ADAPTIVE_SUBSECTIONS_FLAG = true;

        const select = document.createElement('div');
        select.classList.add('sections-list-select');

        const list = node.querySelector('ul');

        const activeEl = list.querySelector('.sections-list__item_active');


        if (!activeEl) {
            select.innerText = 'Выбрать раздел каталога';
        }

        if (activeEl) {
            select.append(activeEl.cloneNode(true));

            select.querySelector('a').addEventListener('click', (e) => {
                e.preventDefault();
            })
        }

        const btnClose = document.createElement('li');
        btnClose.setAttribute('type', 'button');
        btnClose.classList.add('sections-list__close-btn');

        list.append(btnClose)

        node.after(select);

        select.addEventListener('click', (e) => {
            node.classList.toggle('sections-list_opened');
        })

        node.addEventListener('click', (e) => {
            if (node === e.target || btnClose === e.target) {
                node.classList.remove('sections-list_opened');
            }
        })


    }

    if (window.matchMedia('(min-width: 751px)').matches && window.ADAPTIVE_SUBSECTIONS_FLAG) {
        window.ADAPTIVE_SUBSECTIONS_FLAG = false;

        document.querySelector('.sections-list-select') && document.querySelector('.sections-list-select').remove();
    }

}

const bindFiltersAdaptive = () => {
    const btn = document.querySelector('.sort__filters-adaptive');
    const sidebar = document.querySelector('.catalog-layout__sidebar');

    if (!sidebar && btn) {
        btn.style.display = 'none';
        return false;
    }

    if (!sidebar || !btn) {
        return false;
    }

    const closeSidebar = (e) => {
        if (!e) {
            sidebar.classList.remove('catalog-layout__sidebar_opened');
            document.removeEventListener('click', closeSidebar);
            return true;
        }
        if (e.target === btn) {
            return false;
        }
        if (e.target === sidebar || sidebar.contains(e.target)) {
            return false;
        }
        sidebar.classList.remove('catalog-layout__sidebar_opened');
        document.removeEventListener('click', closeSidebar);
    }

    btn.addEventListener('click', (e) => {
        e.preventDefault();
        if (!sidebar.classList.contains('catalog-layout__sidebar_opened')) {
            sidebar.classList.add('catalog-layout__sidebar_opened');
            document.addEventListener('click', closeSidebar);
        } else {
            closeSidebar();
        }
    })
    sidebar.querySelector('.catalog-layout__sidebar-close').addEventListener('click', (e) => {
        e.preventDefault();
        closeSidebar();
    })

    sidebar.querySelector('.filters__actions button').addEventListener('click', () => {
        closeSidebar()
    })
}

const bindFilterChange = (node) => {
    if (!node) {
        return false;
    }

    const inputs = [...node.querySelectorAll('input')];
    const btn = node.querySelector('.filters__actions button');

    inputs.map((input) => {
        input.addEventListener('change', () => {
            btn.style.visibility = 'visible';
            btn.style.opacity = '1';
        })
    })

    btn.addEventListener('click', (e) => {
        e.preventDefault();
        btn.style.visibility = 'hidden';
        btn.style.opacity = '0';
    })
}

window.addEventListener('DOMContentLoaded', () => {

    for (const cardItemNode of document.querySelectorAll('.item-card')) {
        bindItemCard(cardItemNode)
    }

    for (const itemsSliderNode of document.querySelectorAll('.items-slider')) {
        itemsSlider(itemsSliderNode)
    }

    for (const sliderNode of document.querySelectorAll('.sort__item select')) {
        bindSortSelect(sliderNode)
    }

    scrollToCatalog();

    for (const filterNode of document.querySelectorAll('.filter')) {
        bindFilterShowButton(filterNode)
    }

    for (const filterNode of document.querySelectorAll('.filter__price')) {
        bindFilterPrice(filterNode)
    }

    bindSectionsListAdaptive(document.querySelector('.sections-list'));

    bindFiltersAdaptive();

    bindFilterChange(document.querySelector('.filters'));
})

window.addEventListener('resize', () => {
    bindSectionsListAdaptive(document.querySelector('.sections-list'));
})




