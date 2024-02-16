const breadcrumbs = () => {
    const selector = '.js-breadcrumbs';
    const breadcrumbs = document.querySelector(selector);

    if (!breadcrumbs) return;

    const list = breadcrumbs.querySelector('[data-list]');
    const inside = breadcrumbs.querySelector('[data-inside]');
    const items = list && list.querySelectorAll('[data-item]');
    const toggle = list && list.querySelector('[data-item="toggle"]');

    if (!items || !inside || !items[0]) {
        breadcrumbs.classList.add('all-hide');
        return;
    }

    const params = {};

    items.forEach(item => {
        const itemWidth = Math.ceil(item.getBoundingClientRect().width);
        const type = item.getAttribute('data-item');

        item.setAttribute('data-width', itemWidth);

        if (params[type] !== undefined) {
            params[type] += itemWidth;
        } else {
            params[type] = itemWidth;
        }
    });

    checkWidth();

    toggle && toggle.addEventListener('click', toggleInside);

    projectOptions.onClick.push(target => {
        !target.closest(selector) && toggleInside(null, 'hide');
    });

    window.addEventListener('resize', throttle(checkWidth, 150));

    function toggleInside(e, action) {
        if (inside.classList.contains('show') || action === 'hide') {
            toggleVisibility(inside, 'hide');
            inside.classList.remove('show');
        } else {
            toggleVisibility(inside, 'show');
            inside.classList.add('show');
        }
    }

    function checkWidth() {
        const listWidth = Math.ceil(list.getBoundingClientRect().width);

        let available = listWidth - params.main - params.current;
        let viewDots = false;

        if (available < params.link) {
            available -= params.dots;
            viewDots = true;
        }

        let viewLinks = 0;

        for (let i = items.length - 1; i >= 0; i--) {
            const item = items[i];
            const type = item.getAttribute('data-item');

            if (type === 'dots') {
                if (viewDots) {
                    item.classList.remove('hide');
                    inside.classList.remove('hide');
                } else {
                    item.classList.add('hide');
                    inside.classList.add('hide');
                }
            }

            if (type === 'link') {
                const index = item.getAttribute('data-index');
                const itemWidth = item.getAttribute('data-width');
                const clone = inside.querySelector('[data-item="' + index + '"]');

                if (itemWidth < available) {
                    viewLinks++;
                    available -= itemWidth;

                    item.classList.remove('hide');
                    if (clone) clone.classList.add('hide');
                } else {
                    item.classList.add('hide');
                    if (clone) clone.classList.remove('hide');
                }
            }
        }

        if (viewLinks < 1) {
            breadcrumbs.classList.add('all-hide');
        } else {
            breadcrumbs.classList.remove('all-hide');
        }
    }
}
