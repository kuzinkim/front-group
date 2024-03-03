let headerSearch = document.querySelector('.header__search');
let headerSearchClose = document.querySelector('.header__search-close');
let headerSearchInput = document.querySelector('.searchForm__input');
let headerSearchResult = document.querySelector('.searchResult');
let searchBtn = document.querySelector('.headerActions__btn_search');
let page = document.querySelector('.page');
let body = document.querySelector('body');

window.addEventListener('load', function () {
    
    searchBtn.addEventListener('click', function(){

        if(menu.classList.contains('show')){
            menu.classList.remove('show');
            burg.classList.remove('is-open');
        }

        headerSearch.classList.add('is-open');
        page.classList.add('is-bg');
        body.classList.add('is-hidden')
    })

    headerSearchClose.addEventListener('click', function(){
        headerSearch.classList.remove('is-open');
        page.classList.remove('is-bg');
        body.classList.remove('is-hidden')
    })

    headerSearchInput.addEventListener('input', function(){
        if(headerSearchInput.value.length > 3){
            headerSearchResult.classList.add('is-open')
        }else{
            headerSearchResult.classList.remove('is-open')
        }
    })
})
