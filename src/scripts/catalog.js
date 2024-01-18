const bindCardSlider = (sliderNode) => {
    if (!sliderNode || !sliderNode.classList.contains('swiper')) {
        return false;
    }

    if (!!Swiper) {
        return new Swiper(sliderNode, {
            pagination: {
                el: ".swiper-pagination",
                clickable: true,
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
            //todo: здесь вставить запрос на удаление из корзины
            fetch('/somepath/' + id)
                .then((resp) => resp.json())
                .then((resp) => {
                    if (resp.status === 'success') {
                        e.target.classList.remove('item-card__cart_in-cart')
                    } else {
                        throw new Error('Серверная ошибка удаления товара из корзины')
                    }
                })
                .catch((err) => {
                    console.log(err)
                })
        } else {
            //todo: здесь вставить запрос на добавление в корзину

            // todo перенести код фэнсибокс
            Fancybox.show([
                {
                    src: `<div class="modal-cart-confirmation">
<div>Товар <b>"${name}"</b> добавлен в корзину.</div>
<div class="modal-cart-confirmation__buttons">
<a href="/cart/">Перейти в корзину</a>
<div class="is-close-btn" onclick="Fancybox.close()">Продолжить покупки</div>
</div>
</div>`,
                    type: "html",
                },
            ]);
            fetch('/somepath/' + id)
                .then((resp) => resp.json())
                .then((resp) => {
                    if (resp.status === 'success') {
                        e.target.classList.add('item-card__cart_in-cart')
                        //todo перенести код фэнсибокс сюда
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
            slidesPerView: 8,
            spaceBetween: 20,
            breakpoints: {
                1730: {
                    slidesPerView: 8,
                },
                1560: {
                    slidesPerView: 7,
                },
                1360: {
                    slidesPerView: 6,
                },
                1100: {
                    slidesPerView: 5,
                },
                900: {
                    slidesPerView: 4,
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

})




