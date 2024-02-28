let initialHTML = null;

window.BRANDS_ADAPTIVE_4_COLUMNS = false;
window.BRANDS_ADAPTIVE_3_COLUMNS = false;
window.BRANDS_ADAPTIVE_LISTENERS_BINDED = false;

const bindCatalogBrandsAdaptive = (node) => {
    if (!node) {
        return false;
    }

    if (!initialHTML) {
        initialHTML = node.innerHTML;
    }

    const createDesktopColumns4 = () => {
        if (node.querySelector('.brands-sections-list__column')) {
            node.innerHTML = initialHTML;
            window.BRANDS_ADAPTIVE_LISTENERS_BINDED = false;
        }
        const column1 = document.createElement('div');
        column1.classList.add('brands-sections-list__column');
        const column2 = document.createElement('div');
        column2.classList.add('brands-sections-list__column');
        const column3 = document.createElement('div');
        column3.classList.add('brands-sections-list__column');
        const column4 = document.createElement('div');
        column4.classList.add('brands-sections-list__column');

        const items = [...node.querySelectorAll('.brands-sections-item')];

        node.append(column1);
        node.append(column2);
        node.append(column3);
        node.append(column4);

        items.map((item, index) => {
            if (index === 0) {
                column1.append(item);
                return true;
            }
            if (index < 4) {
                column2.append(item);
                return true;
            }
            if (index < 8) {
                column3.append(item);
                return true;
            }
            column4.append(item)
        })

    }

    const createDesktopColumns3 = () => {
        if (node.querySelector('.brands-sections-list__column')) {
            node.innerHTML = initialHTML;
            window.BRANDS_ADAPTIVE_LISTENERS_BINDED = false;
        }
        const column1 = document.createElement('div');
        column1.classList.add('brands-sections-list__column');
        const column2 = document.createElement('div');
        column2.classList.add('brands-sections-list__column');
        const column3 = document.createElement('div');
        column3.classList.add('brands-sections-list__column');

        const items = [...node.querySelectorAll('.brands-sections-item')];

        node.append(column1);
        node.append(column2);
        node.append(column3);

        items.map((item, index) => {
            if (index === 0) {
                column1.append(item);
                return true;
            }
            if (index < 4) {
                column2.append(item);
                return true;
            }
            if (index < 8) {
                column3.append(item);
                return true;
            }
            if (index === 8) {
                column1.append(item);
                return true;
            }
            if (index === 9) {
                column3.append(item);
                return true;
            }
            if (index === 10) {
                column2.append(item);
                return true;
            }

        })
    }

    const resetBlockHTML = () => {
        node.innerHTML = initialHTML;
        window.BRANDS_ADAPTIVE_4_COLUMNS = false;
        window.BRANDS_ADAPTIVE_3_COLUMNS = false;
        window.BRANDS_ADAPTIVE_LISTENERS_BINDED = false;
    }

    const bindTitlesAdaptive = () => {

        const titles = [...node.querySelectorAll('.brands-sections-item__top')];

        titles.map((title) => {
            title.addEventListener('click', (e) => {
                e.preventDefault();

                title.parentElement.classList.toggle('brands-sections-item_opened');
                document.body.classList.toggle('ovh');
            })
        })

        const closeBtns = [...node.querySelectorAll('.brands-sections-item__list-close')];

        closeBtns.map((btn) => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();

                const parentBrand = e.target.closest('.brands-sections-item_opened');

                if (parentBrand) {
                    parentBrand.classList.remove('brands-sections-item_opened');
                }

                document.body.classList.remove('ovh');
            })
        })

        const lists = [...node.querySelectorAll('.brands-sections-item__list')];

        lists.map((list) => {
            list.addEventListener('click', (e) => {
                const parentBrand = e.target.closest('.brands-sections-item_opened');
                if (e.target === list && parentBrand) {
                    parentBrand.classList.remove('brands-sections-item_opened');
                    document.body.classList.remove('ovh');
                }
            })
        })

        window.BRANDS_ADAPTIVE_LISTENERS_BINDED = true;
    }

    if (!window.BRANDS_ADAPTIVE_4_COLUMNS
        && window.matchMedia('(min-width: 1351px)').matches) {

        console.log(1500)

        createDesktopColumns4();

        window.BRANDS_ADAPTIVE_4_COLUMNS = true;
        window.BRANDS_ADAPTIVE_3_COLUMNS = false;

        return true;
    }

    if (!window.BRANDS_ADAPTIVE_3_COLUMNS
        && window.matchMedia('(min-width: 1001px) and (max-width: 1350px)').matches) {
        console.log(1200)
        createDesktopColumns3();

        window.BRANDS_ADAPTIVE_4_COLUMNS = false;
        window.BRANDS_ADAPTIVE_3_COLUMNS = true;

        return true;
    }

    if (!window.BRANDS_ADAPTIVE_LISTENERS_BINDED
        && window.matchMedia('(max-width: 1000px)').matches) {
        bindTitlesAdaptive();

        console.log('listeners bound')
    }

    if ((window.BRANDS_ADAPTIVE_4_COLUMNS || window.BRANDS_ADAPTIVE_3_COLUMNS)
        && window.matchMedia('(max-width: 1000px)').matches) {

        console.log(900)

        resetBlockHTML();
    }
}

window.addEventListener('DOMContentLoaded', () => {
    bindCatalogBrandsAdaptive(document.querySelector('.brands-sections-list'));
})

window.addEventListener('resize', () => {
    bindCatalogBrandsAdaptive(document.querySelector('.brands-sections-list'));
})