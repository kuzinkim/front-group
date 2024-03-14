const bindCallbackForm  = (formNode) => {
    if (!formNode) {
      return false;
    }
    for (const phoneInput of formNode.querySelectorAll('input[type="tel"]')) {
      if (!!Inputmask) {
        Inputmask({"mask": ['+7 999 999-99-99', '8 999 999-99-99'], showMaskOnHover: true,}).mask(phoneInput);
      }
    }
  
    const messageNode = formNode.querySelector('.form__text');
    const modalTitle = formNode.querySelector('.modal__title');
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
            
              modalTitle.innerHTML = 'Спасибо'
              formNode.classList.add('sent')
  
              setTimeout(() => {
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
    bindCallbackForm(document.querySelector('.form_callcback'))
  })