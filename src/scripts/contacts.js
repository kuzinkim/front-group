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

window.addEventListener('DOMContentLoaded', () => {
    bindContactsTabs(document.querySelector('.contacts-page'));

    Fancybox.bind('[data-fancybox]', {});

    for (const phoneInput of document.querySelectorAll('input[type="tel"]')) {
        if (!!Inputmask) {
            Inputmask({"mask": ['+7 999 999-99-99', '8 999 999-99-99'], showMaskOnHover: true,}).mask(phoneInput);
        }
    }
})