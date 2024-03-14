'use strict';

const projectOptions = {
  states: {},
  maskes: {},
  error: {
    default: 'Ошибка при отправке данных! Пожалуйста, попробуйте позже.',
    request: 'Ошибка при отправке данных! Пожалуйста, свяжитесь с нами по телефону <a class="customLink customLink_light" href="tel:88005112733"><nobr>8 (800) 511-27-33</nobr></a>'
  },
  onClick: [],
};


//=require components/base/menu.js
//=require components/base/search.js
//=require components/base/headerFixed.js
//=require components/base/breadcrumbs.js
//=require components/base/form.js
//=require components/base/footer.js
//=require helpers/trottle.js
//=require helpers/toggle-visibility.js

//=require components/load-images.js

//=require components/lazy-load-block.js


const initDefaultElements = function(e) {
  initImages(e);
}

const pageReady = function(e) {
  initLazyLoadBlock(e);
  initDefaultElements(e);
  showMobileMenu();
  breadcrumbs();

  Fancybox.bind('[data-fancybox]', {});
}

document.addEventListener("DOMContentLoaded", pageReady);


// перенесено сюда из-за бага привязки
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
            formNode.querySelector('[type="submit"]').setAttribute('disabled', 'disabled')

            messageNode.innerHTML = 'Ваша заявка успешно отправлена. Мы свяжемся с вами в ближайшее время.';

            setTimeout(() => {
              messageNode.innerHTML = initialMessage;
              formNode.querySelector('[type="submit"]').removeAttribute('disabled')
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
})