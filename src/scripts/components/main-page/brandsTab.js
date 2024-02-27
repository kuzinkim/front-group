window.addEventListener('load', function(){
    let brandTabs = document.querySelectorAll('[data-brand-tab]')
    let brandContent = document.querySelectorAll('[data-brand-content]')
    let brandContentWrap = document.querySelector('.js-wrap-content')
    let brandBg = document.querySelector('.js-bg-content')
    let brandClose = document.querySelector('.js-close-content')

    function removeActiveClass() {
        brandTabs.forEach(function(tab){
            tab.classList.remove('is-active')
        })

        brandContent.forEach(function(conten){
            conten.classList.remove('is-active')
        })
    }

    function brandsTabToogle() {

        brandTabs.forEach(function(tab){
            let dataTab = tab.getAttribute('data-brand-tab')

            tab.addEventListener('click', function(e){
                e.preventDefault();
                removeActiveClass();
                this.classList.add('is-active')

                brandContent.forEach(function(content){
                    let dataContent = content.getAttribute('data-brand-content')

                    if(dataTab == dataContent){
                        content.classList.add('is-active');

                        if(window.matchMedia("(max-width: 495px)").matches){
                            collapseChildItems('[data-brand-content].is-active', {
                                targetHeight: 200,
                                buttonMore: 'Развернуть',
                                buttonLess: 'Свернуть'
                            });
                        }
                    }
                })

                if(window.matchMedia("(max-width: 1199px)").matches){
                    brandBg.classList.add('is-open')
                    brandContentWrap.classList.add('is-open')
                }
            })
        })
    }

    brandsTabToogle();

    brandBg.addEventListener('click', function(){
        brandBg.classList.remove('is-open')
        brandContentWrap.classList.remove('is-open')
    })

    brandClose.addEventListener('click', function(){
        brandBg.classList.remove('is-open')
        brandContentWrap.classList.remove('is-open')
    })

    if(window.matchMedia("(max-width: 495px)").matches){
        collapseChildItems('[data-brand-content]', {
            targetHeight: 200,
            buttonMore: 'Развернуть',
            buttonLess: 'Свернуть'
        });
        
    }
})
