import { CMDIcon } from './modules/icons.mjs';

/*导航抽屉*/
// 创建抽屉元素
const CMDnavigationDrawer = document.querySelector('body>.drawer');
const template = document.createElement('template');
template.innerHTML = `
<figure>
    <svg viewBox="0 0 24 24">
        <circle fill="#212121" cx="12" cy="12" r="12" />
        <polygon fill="#BDBDBD" points="12,0 24,12 12,24 0,12" transform-origin="center" transform="rotate(45)"/>
        <polygon fill="#FFFFFF" points="12,0 18,18 0,12" transform-origin="center" transform="rotate(45)"/>
    </svg>
    <figcaption type-scale="subheading" lang="en">MATERIAL DESIGN</figcaption>
</figure>
<hr class="divider" horizontal />
<ul>
    <li>
        <span interact type-scale="body2">基本原理</span>
        <ul>
            <li interact><a href="index.html">概述</a></li>
            <li interact><a href="material-design/environment.html">环境</a></li>
            <li interact><a href="material-design/material-properties.html">Material 属性</a></li>
            <li interact><a href="material-design/elevation-shadows.html">层级与阴影</a></li>
        </ul>
    </li>
</ul>
`
CMDnavigationDrawer.append(template.content);

// 指定抽屉展开项
const currentChapterMain = CMDnavigationDrawer.getAttribute('chapter').charAt(0);
const currentNavigationMain = document.querySelectorAll('body>.drawer>ul>li')[currentChapterMain - 1];
const currentChapterSub = CMDnavigationDrawer.getAttribute('chapter').charAt(2);
const currentNavigationSub = currentNavigationMain.querySelectorAll('li')[currentChapterSub - 1];

currentNavigationMain.setAttribute('open', '');
currentNavigationSub.setAttribute('activated', '');
currentNavigationSub.setAttribute('href', '#');

// 开关抽屉
const CMDdrawerTrigger = document.querySelector('#drawer-trigger');
const initialOpenedItem = currentNavigationMain;

const scrimElement = document.createElement('div');
scrimElement.classList.add('scrim');
scrimElement.setAttribute('fill', '');
CMDnavigationDrawer.after(scrimElement);

initialOpenedItem.querySelector('ul').style.setProperty('--rows', initialOpenedItem.querySelectorAll('li').length);

function closeDrawer(event) {
    if (event.composedPath().includes(CMDdrawerTrigger) || event.composedPath().includes(CMDnavigationDrawer)) {
        return
    } else {
        CMDnavigationDrawer.removeAttribute('enter');
        scrimElement.removeAttribute('show');
        document.removeEventListener('click', closeDrawer);
        CMDnavigationDrawer.addEventListener('transitionend', (event) => {
            if (event.currentTarget !== event.target || CMDnavigationDrawer.hasAttribute('enter')) {
                return
            }
            CMDnavigationDrawer.removeAttribute('open');
        });
    }
}

CMDdrawerTrigger.addEventListener('click', () => {
    CMDnavigationDrawer.setAttribute('open', '');
    CMDnavigationDrawer.setAttribute('enter', '');
    scrimElement.setAttribute('show', '');
    document.addEventListener('pointerdown', closeDrawer);
});


CMDnavigationDrawer.querySelectorAll('span').forEach((element) => {
    element.addEventListener('click', (event) => {
        const nextElement = element.nextElementSibling;
        nextElement.style.setProperty('--rows', nextElement.querySelectorAll('li').length);
        event.target.parentNode.toggleAttribute('open');
    });
});

window.onresize = () => {
    if (window.innerWidth >= 1576) {
        CMDnavigationDrawer.removeAttribute('open');
        CMDnavigationDrawer.removeAttribute('enter');
        scrimElement.removeAttribute('show');
    }
};

/*模拟器*/

let diagramAnimationPending;

document.querySelectorAll('[animated]').forEach((element) => {
    element.addEventListener('click', (event) => {
        if (element.querySelector('video')) {
            let target = element.querySelector('video');
            if (target.paused) {
                target.play();
            } else {
                target.pause();
            }
            element.toggleAttribute('play');
            return;
        }
        if (element.hasAttribute('play')) {
            element.removeAttribute('play');
            clearTimeout(diagramAnimationPending);
        } else {
            element.setAttribute('play', 'on');
        }
        element.addEventListener('animationend', diagramAnimationReset);
    });
});

function diagramAnimationReset(event) {
    if (event.target !== event.currentTarget) {
        return
    }
    let element = event.target;
    element.setAttribute('play', '');
    diagramAnimationPending = setTimeout(() => {
        element.setAttribute('play', 'on');
    }, 1000);
}

/*涟漪*/

document.querySelectorAll('*[interact], button,footer>a').forEach((element) => {
    const div = document.createElement('div');
    div.className = 'states-overlay';
    element.appendChild(div);

    element.addEventListener('pointerdown', () => {
        element.setAttribute('pressed', '');
        element.addEventListener('pointerleave', (event) => {
            event.currentTarget.removeAttribute('pressed');
        }, { once: true });
    });
    element.addEventListener('pointerup', (event) => {
        rippleForeground(element, event);
        element.removeAttribute('pressed');
    });
    element.addEventListener('keydown', (event) => {
        if (event.code !== 'Space' && event.code !== 'Enter' || event.repeat) {
            return;
        }
        rippleForeground(element, event);
    });
});

function rippleForeground(element, event) {
    let unboundedCondition = element.hasAttribute('unbounded') ? true : false;
    let rippleMoveParameter = unboundedCondition ? 0 : 0.7;

    const containerWidth = element.getBoundingClientRect().width;
    const containerHeight = element.getBoundingClientRect().height;
    const containerRadius = Math.hypot(containerWidth, containerHeight) / 2;

    const rippleForegroundObject = document.createElement('div');
    rippleForegroundObject.className = 'ripple';
    let nodes = element.querySelectorAll('.states-overlay');
    nodes[nodes.length - 1].appendChild(rippleForegroundObject);
    let lastRippleForeground = nodes[nodes.length - 1].querySelector('div:last-child');

    if (!unboundedCondition) {
        const rippleRadius = Math.min(containerRadius, 350) * 0.9 + containerRadius * Math.random() * 0.1;
        lastRippleForeground.attributeStyleMap.set('inline-size', CSS.px(rippleRadius * 2));
    }

    if (event.type !== 'keydown') {
        const rippleOffsetX = event.clientX - element.getBoundingClientRect().left - containerWidth / 2;
        const rippleOffsetY = event.clientY - element.getBoundingClientRect().top - containerHeight / 2;
        lastRippleForeground.animate([
            { translate: new CSSUnparsedValue([CSS.px(rippleOffsetX), ' ', CSS.px(rippleOffsetY)]) },
            { translate: new CSSUnparsedValue([CSS.px(rippleOffsetX * rippleMoveParameter), ' ', CSS.px(rippleOffsetY * rippleMoveParameter)]) }
        ], {
            duration: 300,
            easing: 'cubic-bezier(0.17, 0.74, 0.4, 1)',
            fill: 'both',
            composite: 'add'
        });
    }

    lastRippleForeground.addEventListener('animationend', () => {
        lastRippleForeground.remove();
    });

}
