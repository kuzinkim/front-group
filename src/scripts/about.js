const bindAboutAccordionItem = (item) => {
    if (!item) {
        return false;
    }

    item.addEventListener('click', (e) => {
        if (e.target.tagName !== 'UL' || ![...item.querySelectorAll('li:not(:first-child)')].includes(e.target)) {
            item.classList.toggle('about-block_open');
        }
    })
}

const bindAboutAccordionCountriesItem = (item) => {
    if (!item) {
        return false;
    }

    const list = item.querySelector('.about-countries__list');

    item.addEventListener('click', (e) => {
        if (!list.contains(e.target)) {
            item.classList.toggle('about-countries_open');
        }
    })
}

window.addEventListener('load', () => {
    for (const aboutItem of document.querySelectorAll('.about-block')) {
        bindAboutAccordionItem(aboutItem)
    }

    for (const aboutItemCountries of document.querySelectorAll('.about-countries')) {
        bindAboutAccordionCountriesItem(aboutItemCountries);
    }
})