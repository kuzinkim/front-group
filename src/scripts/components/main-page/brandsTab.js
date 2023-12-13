let brandTabs = document.querySelectorAll('[data-brand-tab]')
let brandContent = document.querySelectorAll('[data-brand-content]')

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

                console.log(dataContent)

                if(dataTab == dataContent){
                    content.classList.add('is-active')
                }
            })
        })
    })
}

window.addEventListener('load', function(){
    brandsTabToogle();
})
