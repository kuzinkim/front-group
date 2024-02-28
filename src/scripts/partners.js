const bindPartnersForm = (formNode) => {
    if (!formNode) {
        return false;
    }
    for (const phoneInput of formNode.querySelectorAll('input[type="tel"]')) {
        if (!!Inputmask) {
            Inputmask({"mask": ['+7 999 999-99-99', '8 999 999-99-99'], showMaskOnHover: true,}).mask(phoneInput);
        }
    }

    const messageNode = formNode.querySelector('.form__item_desc');
    const initialMessage = messageNode.innerHTML;

    formNode.addEventListener('submit', (e) => {
        e.preventDefault();

        fetch(formNode.getAttribute('action'), {
            method: "POST",
            body: new FormData(formNode),
        }).then((resp) => resp.json())
            .then(({success}) => {
                if (success) {

                    messageNode.innerHTML = 'Ваша заявка успешно отправлена. Мы свяжемся с вами в ближайшее время.';

                    setTimeout(() => {
                        messageNode.innerHTML = initialMessage;
                    }, 10000)

                    formNode.reset();
                } else {
                    messageNode.innerHTML = 'Не удалось отправить заявку. Попробуйте ещё раз, или свяжитесь с нами по телефону <a href="tel:+74959882028">+7(495) 988-20-28</a>.';

                    setTimeout(() => {
                        messageNode.innerHTML = initialMessage;
                    }, 15000)
                }
            }).catch(() => {
            messageNode.innerHTML = 'Не удалось отправить заявку. Попробуйте ещё раз, или свяжитесь с нами по телефону <a href="tel:+74959882028">+7(495) 988-20-28</a>.';

            setTimeout(() => {
                messageNode.innerHTML = initialMessage;
            }, 15000)
        })
    })

}

window.addEventListener('DOMContentLoaded', () => {
    bindPartnersForm(document.querySelector('.form_partners'))

    Fancybox.bind('[data-fancybox]', {});
})