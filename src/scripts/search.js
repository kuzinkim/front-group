const bindSearchTabs = (node) => {
    if (!node) {
        return false;
    }

    const buttons = [...node.querySelectorAll('.search-page__toggle')];

    buttons.map((btn) => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();

            node.querySelector('.search-page__toggle_active')
            && node.querySelector('.search-page__toggle_active').classList.remove('search-page__toggle_active');

            btn.classList.add('search-page__toggle_active');

            node.querySelector('.search-page__results_active')
            && node.querySelector('.search-page__results_active').classList.remove('search-page__results_active');

            node.querySelector(btn.getAttribute('href')).classList.add('search-page__results_active');
        })
    })
}

window.addEventListener('DOMContentLoaded', () => {
    bindSearchTabs(document.querySelector('.search-page'))
})