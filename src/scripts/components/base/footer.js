let controls = document.querySelectorAll('[data-title]')

window.addEventListener('load', function () {

    if(controls[0]){
        controls.forEach((control) => {
            control.addEventListener('click', function(){
                control.classList.toggle('is-active')
            })
        });
    }
})