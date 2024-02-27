window.SECTIONS_ADAPTIVE_1001 = false;
window.SECTIONS_ADAPTIVE_701 = false;

let initialHTML = null;
let columns = null;
let items = null;

const bindSectionsAdaptive = (node, initialBlockHTML) => {
    if (!node) {
        return false;
    }

    if (!initialHTML) {
        initialHTML = initialBlockHTML ? initialBlockHTML : node.innerHTML;
    }

    if (!columns) {
        columns = [...node.querySelectorAll('.brands-sections-list__column')];
    }

    if (!items) {
        items = [...node.querySelectorAll('.brands-sections-item')];
    }

    const titleToggle = (e) => {
        e.preventDefault();
        e.target.closest('.brands-sections-item').classList.toggle('brands-sections-item_open');
    }

    if (!window.SECTIONS_ADAPTIVE_1001 && window.matchMedia('(max-width: 1350px) and (min-width: 1001px)').matches) {

        node.innerHTML = initialHTML;
        const actualColumns = [...node.querySelectorAll('.brands-sections-list__column')];
        const column4child = [...actualColumns[3].querySelectorAll('.brands-sections-item')];

        column4child.map((brandNode, index) => {
            if (index % 3 === 0) {
                actualColumns[0].append(brandNode);
                return true;
            }
            if ([1, 4, 7, 10, 13, 16].includes(index)) {
                actualColumns[1].append(brandNode);
                return true;
            }
            if ([2, 5, 8, 11, 14, 17].includes(index)) {
                actualColumns[2].append(brandNode);
                return true;
            }
        })

        window.SECTIONS_ADAPTIVE_1001 = true;
        window.SECTIONS_ADAPTIVE_701 = false;
    }

    if (window.SECTIONS_ADAPTIVE_1001 && window.matchMedia('(min-width: 1351px)').matches) {
        node.innerHTML = initialHTML;
        window.SECTIONS_ADAPTIVE_1001 = false;
        window.SECTIONS_ADAPTIVE_701 = false;
    }

    if (!window.SECTIONS_ADAPTIVE_701 && window.matchMedia('(max-width: 1000px) and (min-width: 701px)').matches) {
        node.innerHTML = initialHTML;

        const actualItems = [...node.querySelectorAll('.brands-sections-item')].map((item) => item.cloneNode(true));
        const half = Math.floor(actualItems.length / 2);
        const actualColumns = [...node.querySelectorAll('.brands-sections-list__column')];


        actualColumns.map((column) => {
            column.innerHTML = '';
        })


        actualItems.map((item, index) => {
            if (index <= half) {
                actualColumns[0].append(item);
            } else {
                actualColumns[1].append(item);
            }

            const title = item.querySelector('.brands-sections-item__top');

            if (title) {
                title.addEventListener('click', titleToggle)
            }
        })

        window.SECTIONS_ADAPTIVE_701 = true;
        window.SECTIONS_ADAPTIVE_1001 = false;
    }

    if ((window.SECTIONS_ADAPTIVE_1001 || window.SECTIONS_ADAPTIVE_701) && window.matchMedia('(max-width: 700px)').matches) {
        node.innerHTML = initialHTML;
        window.SECTIONS_ADAPTIVE_1001 = false;
        window.SECTIONS_ADAPTIVE_701 = false;

        const titles = [...node.querySelectorAll('.brands-sections-item__top')];

        titles.map((title) => {
            title.addEventListener('click', titleToggle)
        })
    }

    if (!initialBlockHTML && !window.SECTIONS_ADAPTIVE_1001 && !window.SECTIONS_ADAPTIVE_701 && window.matchMedia('(max-width: 700px)').matches) {
        const titles = [...node.querySelectorAll('.brands-sections-item__top')];

        titles.map((title) => {
            title.addEventListener('click', titleToggle)
        })
    }
}

window.addEventListener('DOMContentLoaded', () => {
    bindSectionsAdaptive(document.querySelector('.brands-sections-list'));
})

window.addEventListener('resize', () => {
    bindSectionsAdaptive(document.querySelector('.brands-sections-list'), initialHTML);
})