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

const showMessageModal = (text = 'В ближайшее время с Вами свяжется менеджер для уточнения всех деталей.', title = 'Спасибо', link = '/catalog', linkText = 'В каталог', subtitle) => {
  Fancybox.show([
    {
      src: `<div class="modal-thank">
<div class="modal-thank__title">${title}</div>
${subtitle ? `<div class="modal-thank__subtitle">${subtitle}</div>` : ``}
<div class="modal-thank__text">${text}</div>
<a class="modal-thank__link" href="${link}">${linkText}</a>
</div>`,
      type: "html",
    }])
}

const showAddItemModal = (title, itemData, link, linkText) => {
  Fancybox.show([
    {
      src: `
      <div class="modal modal_white modal_card">
          <div class="modal__body modal-card">
              <div class="modal-card__title">${title}</div>
              <div class="modal-card__inner">
                  <span class="modal-card__img">
                      <img src="${itemData.img ? itemData.img : '/local/templates/main/assets/svg/logo_small.svg'}" alt="">
                  </span>
                  ${itemData.link ? `<a href="${itemData.link}" class="modal-card__name">${itemData.name}</a>` : `<span class="modal-card__name">${itemData.name}</span>`}
                  <div class="modal-card__wrapper">
                      <div class="modal-card__prices">
                          <div class="modal-card__price"></div>
                          <div class="modal-card__price modal-card__price_old"></div>
                      </div>
                      <div class="modal-card__actions">
                          <a href="${link}" class="modal-card__btn modal-card__btn_cart">${linkText}</a>
                          <button type="button" class="modal-card__btn modal-card__btn_close" onclick="Fancybox.close()">В каталог</button>
                      </div>
                  </div>
              </div>
          </div>
      </div>
      `,
      type: "html",
    }])
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
    formNode.querySelector('[type="submit"]').setAttribute('disabled', 'disabled')
    fetch(formNode.getAttribute('action'), {
      method: "POST",
      body: new FormData(formNode),
    }).then((resp) => resp.json())
        .then(({success}) => {
          if (success) {

            showMessageModal('В ближайшее время с Вами свяжется менеджер для уточнения всех деталей.');
            formNode.reset();

            setTimeout(() => {
              formNode.querySelector('[type="submit"]').removeAttribute('disabled')
            }, 10000)

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