window.addEventListener('scroll', function(){
    let body = document.querySelector('body')
    let header = document.querySelector('header');
    let firstScreenHeight = document.querySelector('.front-slider_main').offsetHeight;
    let headerHeight = header.offsetHeight;

    let sumOffset = headerHeight + firstScreenHeight

    if (window.pageYOffset > sumOffset) {
        header.classList.add("fixed");
        body.style.paddingTop = headerHeight + 'px'
      } else {
        header.classList.remove("fixed");
        body.style.paddingTop = ''
      }
})