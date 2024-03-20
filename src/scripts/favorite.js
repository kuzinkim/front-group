//=require components/base/item-card.js

const clearFavs = () => {
    fetch(`/ajax/favorites.php?clear=Y`)
        .then((resp) => resp.json())
        .then((resp) => {
            if (resp.success) {
                window.location.reload();
            }
        })
}

const bindEmailForm = (formNode) => {

    if (!formNode) {
        return false;
    }

    const messageNode = formNode.querySelector('.form__text');
    const initialMessage = messageNode.innerHTML;

    showMessageModal('Список избранного отправлен на указанный Email.', '')

    formNode.addEventListener('submit', (e) => {
        e.preventDefault();
        formNode.querySelector('[type="submit"]').setAttribute('disabled', 'disabled')

        fetch(formNode.getAttribute('action'), {
            method: "POST",
            body: new FormData(formNode),
        }).then((resp) => resp.json())
            .then(({success}) => {
                if (success) {

                    formNode.reset();


                    setTimeout(() => {
                        formNode.querySelector('[type="submit"]').removeAttribute('disabled')
                    }, 10000)

                } else {
                    messageNode.innerHTML = 'Не удалось отправить список избранного, попробуйте ещё раз.';

                    setTimeout(() => {
                        messageNode.innerHTML = initialMessage;
                    }, 10000)
                }
            }).catch(() => {
            messageNode.innerHTML = 'Не удалось отправить список избранного, попробуйте ещё раз.';

            setTimeout(() => {
                messageNode.innerHTML = initialMessage;
            }, 10000)
        })
    })
}

window.addEventListener('DOMContentLoaded', () => {
    for (const cardItemNode of document.querySelectorAll('.item-card')) {
        bindItemCard(cardItemNode)
    }

    for (const clearFavBtn of document.querySelectorAll('.js-clear-favorite')) {
        clearFavBtn.addEventListener('click', clearFavs)
    }

    for (const emailForm of document.querySelectorAll('.form_send-email')) {
        bindEmailForm(emailForm);
    }
})