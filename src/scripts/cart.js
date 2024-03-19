const bindAddressToggle = (radioNode, stockRadioNode, inputWrapperNode) => {
    if (!radioNode || !inputWrapperNode || !stockRadioNode) {
        return false;
    }

    const inputNode = inputWrapperNode.querySelector('input');

    if (!inputNode) {
        return false;
    }

    radioNode.addEventListener('change', (e) => {
        if (e.target.checked) {
            inputWrapperNode.classList.remove('form__item_hidden');
            inputNode.setAttribute('required', 'required');
        }
    })

    stockRadioNode.addEventListener('change', (e) => {
        if (e.target.checked) {
            inputWrapperNode.classList.add('form__item_hidden');
            inputNode.removeAttribute('required');
        }
    })
}

const bindItemCounter = (itemNode) => {
    if (!itemNode) {
        return false;
    }

    const input = itemNode.querySelector('.cart-table__item-count input');
    const incBtn = itemNode.querySelector('.cart-table__item-count button[data-action="increment"]');
    const decBtn = itemNode.querySelector('.cart-table__item-count button[data-action="decrement"]');

    if (!input || !incBtn || !decBtn) {
        return false;
    }

    const itemId = itemNode.getAttribute('data-item-id');

    const sendItemCount = (itemId, count) => {
        if (!itemId || !count) {
            return false;
        }

        const searchStr = `/ajax/basket.php?id=${itemId}&count=${count}&json=1`;

        fetch(searchStr, {})
    }

    incBtn.addEventListener('click', (e) => {
        e.preventDefault();

        const value = Number(input.value);

        if (isNaN(value)) {
            input.value = '1';
            return true;
        }

        input.value = String(value + 1);

        sendItemCount(itemId, input.value);

        countItemSumPrice(itemNode)
    })

    decBtn.addEventListener('click', (e) => {
        e.preventDefault();

        const value = Number(input.value);

        if (value === 1 || isNaN(value)) {
            input.value = '1';
            return true;
        }

        input.value = String(value - 1);

        sendItemCount(itemId, input.value);

        countItemSumPrice(itemNode)
    })
}

const calcOverall = () => {

    const sumNode = document.querySelector('.cart-table__summary-value');

    if (!sumNode) {
        return false;
    }

    const priceNodes = [...document.querySelectorAll('.cart-table__item-sum')];

    const prices = priceNodes.map((el) => Number(el.innerText.replace(/\D/g, '')))

    const sum = prices.reduce((acc, item) => {
        if (typeof item === "number") {
            return acc + item;
        }
        return acc;
    }, 0)

    sumNode.innerText = new Intl.NumberFormat('ru-RU', {
        style: 'currency',
        currency: 'RUB',
        maximumFractionDigits: 0
    }).format(
        sum,
    )

}

const countItemSumPrice = (itemNode, initial) => {
    if (!itemNode) {
        return false;
    }

    let sum = undefined;
    let price = undefined;
    let multiplier = undefined;

    const priceNode = itemNode.querySelector('.cart-table__item-price span');

    if (!priceNode) {
        sum = 'По запросу';
    } else {
        price = Number(priceNode.innerText.replace(/\D/g, ''));
    }

    if (!price || isNaN(price)) {
        sum = 'По запросу';
    }

    const countNode = itemNode.querySelector('.cart-table__item-count input');

    if (!countNode) {
        sum = 'По запросу';
    } else {
        multiplier = Number(countNode.value);
    }

    if (!multiplier || isNaN(multiplier)) {
        sum = 'По запросу';
    }

    if (!sum) {
        sum = new Intl.NumberFormat('ru-RU', {style: 'currency', currency: 'RUB', maximumFractionDigits: 0}).format(
            price * multiplier,
        )
    }

    const sumNode = itemNode.querySelector('.cart-table__item-sum');

    if (sumNode) {
        sumNode.innerText = sum;
    }

    if (!initial) {
        calcOverall();
    }
}

const checkEmpty = () => {
    //<div className="cart__empty">В корзине пусто. <a href="/catalog/">Перейти в каталог</a>.</div>

    const wrapper = document.querySelector('.cart__table-wrapper');

    if (!wrapper) {
        return false;
    }

    const items = document.querySelectorAll('.cart-table__item');

    if (!items.length) {
        wrapper.querySelector('.cart-table').style.display = 'none';
        const form = document.querySelector('.cart__form');
        if (form) {
            form.style.display = 'none';
        }
        const emptyNode = document.createElement('div');
        emptyNode.classList.add('cart__empty');
        emptyNode.innerHTML = 'В корзине пусто. <a href="/catalog/">Перейти в каталог</a>.';
        wrapper.append(emptyNode);
    }
}

const bindDeleteItem = (itemNode) => {
    if (!itemNode) {
        return false;
    }

    const btnDel = itemNode.querySelector('.cart-table__item-del');

    const itemId = itemNode.getAttribute('data-item-id');

    btnDel.addEventListener('click', (e) => {
        e.preventDefault();

        fetch(`/ajax/basket.php?id=${itemId}&delete=Y`, {})
            .then((resp) => resp.json())
            .then(({success}) => {
                if (success) {
                    itemNode.remove();
                    calcOverall();
                    checkEmpty();
                } else {
                    throw new Error()
                }
            }).catch((mess) => {

            Fancybox.show([
                {
                    src: `<div class="modal-cart-confirmation">
<div>Ошибка удаления товара из корзины. Вы можете оформить заказ и отредактировать его содержимое, когда наш менеджер свяжется с Вами.</div>
<div class="modal-cart-confirmation__buttons">
<a onclick="window.location.reload()">Обновить страницу</a>
<div class="is-close-btn" onclick="Fancybox.close()">Продолжить</div>
</div>
</div>`,
                    type: "html",
                }])

        })
    })
}

const clearCart = () => {
    for (const item of document.querySelectorAll('.cart-table__item')) {
        item.remove();
    }

    checkEmpty();
}

const bindCartItem = (itemNode) => {
    if (!itemNode) {
        return false;
    }

    countItemSumPrice(itemNode, true)

    bindItemCounter(itemNode);

    calcOverall();

    bindDeleteItem(itemNode);
}

const collectItemsData = () => {
    const items = [...document.querySelectorAll('.cart-table__item')];

    if (!items.length) {
        return []
    }

    return items.reduce((acc, item) => {

        const obj = {
            id: item.getAttribute('data-item-id'),
            name: item.querySelector('.cart-table__item-name').innerText,
            count: item.querySelector('.cart-table__item-count input').value,
        };

        return [...acc, obj];
    }, [])

}

const collectData = (formNode) => {

    const inputs = [...formNode.querySelectorAll('input:not([type="submit"])')];

    const data = inputs.reduce((acc, input) => {

        if (input.getAttribute('type') === 'radio') {
            if (input.checked) {
                return {
                    ...acc,
                    [input.getAttribute('name')]: input.value,
                }
            }

            return acc;
        }

        return {
            ...acc,
            [input.getAttribute('name')]: input.value,
        }
    }, {})

    return {
        ...data,

        items: collectItemsData(),
    }
}

const bindCartForm = (formNode) => {
    if (!formNode) {
        return false;
    }

    formNode.addEventListener('submit', (e) => {
        e.preventDefault();


        console.log(collectData(formNode))

        fetch(formNode.getAttribute('action'), {
            method: "POST",
            cache: "no-cache",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(collectData(formNode))
        })
            .then((resp) => resp.json())
            .then(({success, number, mail}) => {
                if (success) {
                    formNode.querySelector('[type="submit"]').setAttribute('disabled', 'disabled')
                    Fancybox.show([
                        {
                            src: `<div class="modal-cart-confirmation">
<div class="modal-cart-confirmation__text">Оформлен заказ №${number}. Детали заказа отправлены на электронную почту ${mail}. В ближайшее время наш менеджер свяжется с Вами.</div>
<div class="modal-cart-confirmation__buttons">
<a href="/catalog/">Перейти в каталог</a>
</div>
</div>`,
                            type: "html",
                        }]);
                    formNode.reset();
                    clearCart();

                    setTimeout(() => {
                        formNode.querySelector('[type="submit"]').removeAttribute('disabled')
                    }, 15000)

                } else {
                    throw new Error()
                }
            }).catch(() => {
            Fancybox.show([
                {
                    src: `<div class="modal-cart-confirmation">
<div class="modal-cart-confirmation__text">Произошла ошибка при оформлении заказа.<br>Попробуйте еще раз, или свяжитесь с нами по телефону <a href="tel:+74959882028">+7(495) 988-20-28</a></div>
<div class="modal-cart-confirmation__buttons">
<a onclick="window.location.reload()">Обновить страницу</a>
<div class="is-close-btn" onclick="Fancybox.close()">Продолжить</div>
</div>
</div>`,
                    type: "html",
                }])
        })
    })
}


window.addEventListener('DOMContentLoaded', () => {
    bindAddressToggle(
        document.querySelector('.js-address-radio'),
        document.querySelector('.js-stock-radio'),
        document.querySelector('.js-address-field'))

    for (const itemNode of document.querySelectorAll('.cart-table__item')) {
        bindCartItem(itemNode)
    }

    checkEmpty();

    bindCartForm(document.querySelector('.js-cart-form'))

    for (const phoneInput of document.querySelectorAll('input[type="tel"]')) {
        if (!!Inputmask) {
            Inputmask({"mask": ['+7 999 999-99-99', '8 999 999-99-99'], showMaskOnHover: false,}).mask(phoneInput);
        }
    }

})