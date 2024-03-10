const bindContactsTabs = (node) => {
    if (!node) {
        return false;
    }

    const buttons = [...node.querySelectorAll('.contacts-page__toggle')];

    buttons.map((btn) => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();

            node.querySelector('.contacts-page__toggle_active')
            && node.querySelector('.contacts-page__toggle_active').classList.remove('contacts-page__toggle_active');

            btn.classList.add('contacts-page__toggle_active');

            node.querySelector('.contacts-page__content_active')
            && node.querySelector('.contacts-page__content_active').classList.remove('contacts-page__content_active');

            node.querySelector(btn.getAttribute('href')).classList.add('contacts-page__content_active');
        })
    })

    const subButtons = [...node.querySelectorAll('.contacts-content__subtabs-toggle')];

    subButtons.map((btn) => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();

            node.querySelector('.contacts-content__subtabs-toggle_active')
            && node.querySelector('.contacts-content__subtabs-toggle_active').classList.remove('contacts-content__subtabs-toggle_active');

            btn.classList.add('contacts-content__subtabs-toggle_active');

            node.querySelector('.contacts-content__subtabs-content_active')
            && node.querySelector('.contacts-content__subtabs-content_active').classList.remove('contacts-content__subtabs-content_active');

            node.querySelector(btn.getAttribute('href')).classList.add('contacts-content__subtabs-content_active');
        })
    })
}

const bindFeedbackForm = (formNode) => {
    if (!formNode) {
        return false;
    }

    for (const phoneInput of formNode.querySelectorAll('input[type="tel"]')) {
        if (!!Inputmask) {
            Inputmask({"mask": ['+7 999 999-99-99', '8 999 999-99-99'], showMaskOnHover: true,}).mask(phoneInput);
        }
    }

    const messageNode = formNode.querySelector('.form__item_text');
    const initialMessage = messageNode.innerHTML;

    formNode.addEventListener('submit', (e) => {
        e.preventDefault();

        fetch(formNode.getAttribute('action'), {
            method: "POST",
            body: new FormData(formNode),
        }).then((resp) => resp.json())
            .then(({success}) => {
                if (success) {

                    messageNode.innerHTML = 'Спасибо за ваш отзыв!';
                    formNode.querySelector('[type="submit"]').setAttribute('disabled', 'disabled')

                    setTimeout(() => {
                        messageNode.innerHTML = initialMessage;
                        Fancybox.close(true);
                        formNode.querySelector('[type="submit"]').removeAttribute('disabled')
                    }, 10000)

                    formNode.reset();
                } else {
                    messageNode.innerHTML = 'Не удалось отправить отзыв. Пожалуйста, попробуйте ещё раз.';

                    setTimeout(() => {
                        messageNode.innerHTML = initialMessage;
                    }, 15000)
                }
            }).catch(() => {
            messageNode.innerHTML = 'Не удалось отправить отзыв. Пожалуйста, попробуйте ещё раз.';

            setTimeout(() => {
                messageNode.innerHTML = initialMessage;
            }, 15000)
        })
    })


}

window.addEventListener('DOMContentLoaded', () => {
    bindContactsTabs(document.querySelector('.contacts-page'));

    Fancybox.bind('[data-fancybox]', {});

    for (const formNode of document.querySelectorAll('.form_feedback')) {
        bindFeedbackForm(formNode)
    }
})