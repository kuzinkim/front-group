const collapseChildItems = function (selector, setOptions) {
    if (!selector) {
        return false;
    }

    const blocks = document.querySelectorAll(selector + ':not(.collapseElement)');

    console.log(blocks)

    const options = {
        children: setOptions.children || '*',                   // html selector (string)
        targetHeight: setOptions.targetHeight || null,          // height block (number)
        targetCount: setOptions.targetCount || null,            // count childrens (number)
        reduceHeight: setOptions.reduceHeight || 0,             // value reduce height (number)
        buttonClass: setOptions.buttonClass || '',              // button (string)
        buttonMore: setOptions.buttonMore || 'Смотреть еще',    // button (string)
        buttonLess: setOptions.buttonLess || 'Скрыть',          // button (string)
    }

    if (!blocks[0]) return false;

    for (let i = 0; i < blocks.length; i++) {
        const block = blocks[i];
        if (options.targetHeight !== null) {
            initCollapseHeight(block);
            initEvents(block, 'height');
        } else if (options.targetCount !== null) {
            initCollapseItems(block);
            initEvents(block, 'count');
        }
    }

    function initCollapseHeight(block) {
        const blockHeight = block.offsetHeight;

        if (blockHeight > options.targetHeight) {
            htmlStructure(block, 'collapseElement_height');

            block.querySelector('[data-collapse-element-wrap]').style.height = options.targetHeight - options.reduceHeight + 'px';
        }
    }

    function initCollapseItems(block) {
        if (block.querySelectorAll(options.children).length > options.targetCount) {
            htmlStructure(block);

            const childrens = block.querySelectorAll(options.children); // !!! important after fn htmlStructure

            for (let i = 0; i < childrens.length; i++) {
                if (i + 1 > options.targetCount) {
                    childrens[i].classList.add('collapseElement__hidden');
                }
            }
        }
    }

    function htmlStructure(block, addClass) {
        block.classList.add('collapseElement', 'collapseElement_hide');
        addClass && block.classList.add(addClass);
        block.innerHTML = htmlContent(block);
    }

    function htmlContent(block) {
        const content = '<div class="collapseElement__content" data-collapse-element-content>' + block.innerHTML + '</div>';
        const button = '<button class="collapseElement__button ' + options.buttonClass + '" type="button" data-collapse-element-button><span>' + options.buttonMore + '</span><span>' + options.buttonLess + '</span></button>';
        const newContent = '<div class="collapseElement__wrap" data-collapse-element-wrap>' + content + '</div>' + button;

        return newContent;
    }

    function initEvents(block, action) {
        const button = block.querySelector('[data-collapse-element-button]');

        button && button.addEventListener('click', function (e) {
            e.preventDefault();
            if (block.classList.contains('collapseElement_hide')) {
                block.classList.remove('collapseElement_hide');
                if (action === 'height') {
                    const wrap = block.querySelector('[data-collapse-element-wrap]');
                    const contentHeight = block.querySelector('[data-collapse-element-content]').offsetHeight;
                    wrap.style.height = contentHeight + 'px';
                    setTimeout(function () {
                        wrap.style.height = 'auto';
                    }, 200);
                }
            } else {
                block.classList.add('collapseElement_hide');
                if (action === 'height') {
                    const wrap = block.querySelector('[data-collapse-element-wrap]');
                    const wrapHeight = wrap.offsetHeight;
                    wrap.style.height = wrapHeight + 'px';
                    setTimeout(function () {
                        wrap.style.height = options.targetHeight - options.reduceHeight + 'px';
                    }, 0)
                }
            }
        });
    }
}