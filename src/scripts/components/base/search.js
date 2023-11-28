let selectSearchToggle = document.querySelector('.js-select-search')
let selectSearchList = document.querySelector('.js-select-list')
let selectItem = document.querySelectorAll('.js-select-item')
let selectTitle = document.querySelector('.js-select-title')

let searchInput = document.querySelector('.js-search-input')
let searchResult = document.querySelector('.js-search-result')

window.addEventListener('load', function () {

    if (!searchInput) return false

    selectSearchToggle.addEventListener('click', function(){
        selectSearchList.classList.toggle('is-open')
    })

    searchInput.addEventListener('input', function(){

        if(this.value.length > 2){
            searchResult.classList.add('is-open')
        }else{
            searchResult.classList.remove('is-open')
        }
    })

    selectItem.forEach(function(item){
        item.addEventListener('click', function(){
            let text = this.textContent
            selectTitle.textContent = text
            selectSearchList.classList.remove('is-open')
        })
    })
})
