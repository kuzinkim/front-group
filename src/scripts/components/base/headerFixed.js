function headerFixed() {
  let body = document.querySelector('body')
  let header = document.querySelector('header');
  let firstScreen = document.querySelector('.js-first-screen')

  let headerHeight = header.offsetHeight;

  if (firstScreen){
    let firstScreenHeight = firstScreen.offsetHeight;
    let sumOffset = headerHeight + firstScreenHeight

    if (window.pageYOffset > sumOffset) {
      header.classList.add("fixed");
      body.style.paddingTop = headerHeight + 'px'
    } else {
      header.classList.remove("fixed");
      body.style.paddingTop = ''
    }
  }else{
    if (window.pageYOffset > headerHeight) {
      header.classList.add("fixed");
      body.style.paddingTop = headerHeight + 'px'
    } else {
      header.classList.remove("fixed");
      body.style.paddingTop = ''
    }
  }
}

window.addEventListener('scroll', function () {
  headerFixed();
})