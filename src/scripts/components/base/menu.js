let burg = document.querySelector('.js-burger');
let menu = document.querySelector('.js-header-menu');

function showMobileMenu () {
    if (!burg) return false

    burg.addEventListener('click', function(){
        menu.classList.add('show');
    })
}



document.addEventListener('click', (e) => {

    if(menu.classList.contains('show')){
        const withinBoundaries = e.composedPath().includes(menu);
        const withinBurg = e.composedPath().includes(burg);
    
        if (!withinBoundaries && !withinBurg) {
            menu.classList.remove('show');
        }
    }

    return false
})