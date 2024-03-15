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

    const favHeaderBtn = document.querySelector('.headerActions__btn_favorites')

    btnNode.addEventListener('click', (e) => {
        e.preventDefault();

        if (e.target.classList.contains('item-card__like_liked')) {
            fetch(`/ajax/favorites.php?id=${id}&delete=Y`)
                .then((resp) => resp.json())
                .then((resp) => {
                    if (resp.success) {
                        e.target.classList.remove('item-card__like_liked');
                        if (resp.count !== undefined && favHeaderBtn) {
                            if (!isNaN(resp.count)) {
                                favHeaderBtn.setAttribute('data-count', String(resp.count))
                            }
                        }

                        const isFav = document.querySelector('.catalog_favorites')

                        if (isFav) {
                            const currentItem = e.target.closest('.catalog__item');

                            if (currentItem) {
                                currentItem.remove()
                            }
                        }

                    } else {
                        throw new Error('Серверная ошибка удаления товара из понравившихся')
                    }
                })
                .catch((err) => {
                    console.log(err)
                })
        } else {
            fetch(`/ajax/favorites.php?id=${id}`)
                .then((resp) => resp.json())
                .then((resp) => {
                    if (resp.success) {
                        e.target.classList.add('item-card__like_liked');
                        if (resp.count !== undefined && favHeaderBtn) {
                            if (!isNaN(resp.count)) {
                                favHeaderBtn.setAttribute('data-count', String(resp.count))
                            }
                        }
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

    const headerCompareBtn = document.querySelector('.headerActions__btn_compare');

    btnNode.addEventListener('click', (e) => {
        e.preventDefault();

        if (e.target.classList.contains('item-card__compare_compared')) {
            fetch(`/ajax/compare.php?id=${id}&delete=Y`)
                .then((resp) => resp.json())
                .then((resp) => {
                    if (resp.success) {
                        e.target.classList.remove('item-card__compare_compared')
                        if (resp.count !== undefined && headerCompareBtn && !isNaN(resp.count)) {
                            headerCompareBtn.setAttribute('data-count', String(resp.count))
                        }
                    } else {
                        throw new Error('Серверная ошибка удаления товара из сравнения')
                    }
                })
                .catch((err) => {
                    console.log(err)
                })
        } else {
            //todo: здесь вставить запрос на добавление в сравнение
            fetch(`/ajax/compare.php?id=${id}`)
                .then((resp) => resp.json())
                .then((resp) => {
                    if (resp.success) {
                        e.target.classList.add('item-card__compare_compared')
                        if (resp.count !== undefined && headerCompareBtn && !isNaN(resp.count)) {
                            headerCompareBtn.setAttribute('data-count', String(resp.count))
                        }
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

    const headerBasketBtn = document.querySelector('.headerActions__btn_basket');

    btnNode.addEventListener('click', (e) => {
        e.preventDefault();

        if (e.target.classList.contains('item-card__cart_in-cart')) {

            fetch(`/ajax/basket.php?id=${id}&delete=Y`)
                .then((resp) => resp.json())
                .then((resp) => {
                    if (resp.success) {
                        e.target.classList.remove('item-card__cart_in-cart');
                        if (resp.count !== undefined && headerBasketBtn) {
                            if (!isNaN(resp.count)) {
                                headerBasketBtn.setAttribute('data-count', String(resp.count))
                            }
                        }
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

    let name

    if(!itemCardNode.classList.contains('card')){
        name = itemCardNode.querySelector('.item-card__name').innerText;
    }else{
        name = document.querySelector('.page-title_card h1').innerText;
    }

    for (const cartBtn of itemCardNode.querySelectorAll('.js-item-card-cart')) {
        bindCartBtn(cartBtn, itemId, name)
    }

}