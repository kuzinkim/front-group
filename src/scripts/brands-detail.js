//=require helpers/collapseText.js

let navButton = document.querySelector('.brand-detail__button')
let brandNav = document.querySelector('.brand-nav')
let brandBg = document.querySelector('.brand-detail__bg')
let brandClose = document.querySelector('.brand-detail__close')

window.addEventListener('DOMContentLoaded', () => {

    if(window.matchMedia("(max-width: 767px)").matches){
        collapseChildItems('.js-collapse-brand-text', {
            targetHeight: 150,
            buttonMore: 'Развернуть',
            buttonLess: 'Свернуть'
        });
    }

    navButton.addEventListener('click', function(){
        brandNav.classList.add('is-open')
        brandBg.classList.add('is-open')
    })

    brandBg.addEventListener('click', function(){
        brandNav.classList.remove('is-open')
        brandBg.classList.remove('is-open')
    })

    brandClose.addEventListener('click', function(){
        brandNav.classList.remove('is-open')
        brandBg.classList.remove('is-open')
    })

})