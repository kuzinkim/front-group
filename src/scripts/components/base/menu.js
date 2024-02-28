let burg = document.querySelector('.js-burger');
let menu = document.querySelector('.js-header-menu');
let searchButton = document.querySelector('.headerActions__btn_search');

function showMobileMenu () {
    if (!burg) return false

    burg.addEventListener('click', function(){

        if(burg.classList.contains('is-open')){
            burg.classList.remove('is-open');

            page.classList.remove('is-bg');
            body.classList.remove('is-hidden');
            menu.classList.remove('show');
        }else{
            burg.classList.add('is-open');
            menu.classList.add('show');

            page.classList.add('is-bg');
            body.classList.add('is-hidden')
        }
    })
}



document.addEventListener('click', (e) => {

    if(menu.classList.contains('show')){
        const withinBoundaries = e.composedPath().includes(menu);
        const withinBurg = e.composedPath().includes(burg);
        const withinSearch = e.composedPath().includes(searchButton);
        
        if (!withinBoundaries && !withinBurg && withinSearch) {
            menu.classList.remove('show');
            burg.classList.remove('is-open');
        }
    }

    return false
})