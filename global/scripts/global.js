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
    <li>
        <span interact type-scale="body2" aria-disabled="true">动画效果</span>
        <ul>
            <li interact><a href="motion/material-motion.html">运动机理</a></li>
            <li interact><a href="motion/movement.html">移动</a></li>
            <li interact><a href="motion/transforming-material.html">转换</a></li>
            <li interact><a href="motion/choreography.html">编排</a></li>
            <li interact><a href="motion/responsive-interaction.html">作用反馈</a></li>
            <li interact><a href="motion/creative-customization.html">创意定制</a></li>
        </ul>
    </li>
    <li>
        <span interact type-scale="body2" aria-disabled="true">风格样式</span>
        <ul>
            <li interact><a href="style/color.html">颜色</a></li>
            <li interact><a href="style/icons.html">图标</a></li>
            <li interact><a href="style/imagery.html">图像</a></li>
            <li interact><a href="style/typography.html">字体排印</a></li>
            <li interact><a href="style/writing.html">书面用语</a></li>
            <li interact><a href="style/sound.html">声音</a></li>
        </ul>
    </li>
    <li>
        <span interact type-scale="body2" aria-disabled="true">布局</span>
        <ul>
            <li interact><a href="layout/principles.html">架构方法</a></li>
            <li interact><a href="layout/units-measurements.html">单位与度量方法</a></li>
            <li interact><a href="layout/spacing-methods.html">元素排布</a></li>
            <li interact><a href="layout/structure.html">界面结构</a></li>
            <li interact><a href="layout/responsive-ui.html">响应式界面</a></li>
            <li interact><a href="layout/density.html">元素密度</a></li>
        </ul>
    </li>
    <li>
        <span interact type-scale="body2" aria-disabled="true">组件</span>
        <ul>
            <li interact><a href="components/bottom-navigation.html">底部导航</a></li>
            <li interact><a href="components/buttons.html">按钮</a></li>
            <li interact><a href="components/buttons-floating-action-button.html">按钮：浮动操作按钮</a></li>
            <li interact><a href="components/cards.html">卡片</a></li>
            <li interact><a href="components/chips.html">多用标签</a></li>
            <li interact><a href="components/data-tables.html">数据表格</a></li>
            <li interact><a href="components/dividers.html">分隔线</a></li>
            <li interact><a href="components/dialogs.html">对话框</a></li>
            <li interact><a href="components/dialogs-pickers.html">对话框：选择器</a></li>
            <li interact><a href="components/lists.html">列表</a></li>
            <li interact><a href="components/menus.html">菜单</a></li>
            <li interact><a href="components/progress-indicators.html">进程指示器</a></li>
            <li interact><a href="components/selection-controls.html">选择控件</a></li>
            <li interact><a href="components/sheets-bottom.html">底部单页</a></li>
            <li interact><a href="components/sheets-side.html">侧边单页</a></li>
            <li interact><a href="components/sheets-navigation-drawer.html">侧边单页：导航抽屉</a></li>
            <li interact><a href="components/sliders.html">滑块</a></li>
            <li interact><a href="components/snackbars.html">条形通知</a></li>
            <li interact><a href="components/tabs.html">标签栏</a></li>
            <li interact><a href="components/text-fields.html">文本框</a></li>
            <li interact><a href="components/toolbars.html">工具栏</a></li>
            <li interact><a href="components/widgets.html">桌面小部件</a></li>
        </ul>
    </li>
    <li>
        <span interact type-scale="body2" aria-disabled="true">交互模式</span>
        <ul>
            <li interact><a href="patterns/confirmation-acknowledgement.html">确认与获知</a></li>
            <li interact><a href="patterns/data-display.html">数据展示</a></li>
            <li interact><a href="patterns/empty-states.html">空状态</a></li>
            <li interact><a href="patterns/errors.html">错误提示</a></li>
            <li interact><a href="patterns/fingerprint.html">指纹识别</a></li>
            <li interact><a href="patterns/gestures.html">手势</a></li>
            <li interact><a href="patterns/help-feedback.html">帮助与反馈</a></li>
            <li interact><a href="patterns/launch-screens.html">启动画面</a></li>
            <li interact><a href="patterns/navigation.html">导航</a></li>
            <li interact><a href="patterns/notifications.html">通知</a></li>
            <li interact><a href="patterns/offline-states.html">离线状态</a></li>
            <li interact><a href="patterns/permissions.html">权限</a></li>
            <li interact><a href="patterns/search.html">搜索</a></li>
            <li interact><a href="patterns/selection.html">选择</a></li>
            <li interact><a href="patterns/settings.html">设置</a></li>
            <li interact><a href="patterns/states.html">交互状态</a></li>
            <li interact><a href="patterns/swipe-to-refresh.html">下滑刷新</a></li>
        </ul>
    </li>
    <li>
        <span interact type-scale="body2" aria-disabled="true">可用性</span>
        <ul>
            <li interact><a href="usability/accessibility.html">无障碍</a></li>
            <li interact><a href="usability/bidirectionality.html">阅读方向</a></li>
        </ul>
    </li>
    <li>
        <span interact type-scale="body2" aria-disabled="true">发展与用户教育</span>
    </li>
    <li>
        <span interact type-scale="body2" aria-disabled="true">附录</span>
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
scrimElement.setAttribute('variant', 'fill');
CMDnavigationDrawer.after(scrimElement);

initialOpenedItem.querySelector('ul').style.setProperty('--rows', initialOpenedItem.querySelectorAll('li').length);

function closeDrawer(event) {
    if (event.composedPath().includes(CMDdrawerTrigger) || event.composedPath().includes(CMDnavigationDrawer)) {
        return
    } else {
        CMDnavigationDrawer.removeAttribute('enter');
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

const RIPPLE_EXPAND_EASING = 'cubic-bezier(0.17, 0.74, 0.4, 1)';
let rippleBackgroundExitHandler;
let pointerMoveHandler;
let pointerOutHandler;
let keyOutHandler;

function ifUnbounded(element) {
    if (element.classList.contains('button') && element.getAttribute('variant') == 'icon') {
        return true
    } else if (element.hasAttribute('unbounded')) {
        return true
    } else {
        return false
    }
}

function ifConstraint(element) {
    if (element.classList.contains('button') && element.getAttribute('variant') == 'icon') {
        return true
    } else {
        return false
    }
}

function addStatesOverlay(element) {
    const unbounded = ifUnbounded(element);
    const constrained = ifConstraint(element);

    const statesContainer = document.createElement('div');
    if (unbounded) {
        const longestLength = Math.max(element.getBoundingClientRect().width, element.getBoundingClientRect().height);
        statesContainer.style.inlineSize = constrained ? CSS.px(longestLength) : CSS.px(Math.hypot(longestLength, longestLength));
    }
    statesContainer.className = 'overlay';
    statesContainer.setAttribute('variant', 'states');
    element.appendChild(statesContainer);
}

function getAnimationProgress(object) {
    const fullDuration = object.effect.getTiming().duration;
    const delay = object.effect.getTiming().delay;
    const currentDuration = object.currentTime;
    return Math.max(currentDuration - delay, 0) / fullDuration
}

function getRippleOffset(event, width, height) {
    if (event.target != event.currentTarget) {
        return [event.offsetX + event.target.offsetLeft - width / 2, event.offsetY + event.target.offsetTop - height / 2]
    } else {
        return [event.offsetX - width / 2, event.offsetY - height / 2]
    }
}

function getClampedPosition(x, y, radius) {
    if (Math.hypot(x, y) > radius) {
        const angle = Math.atan2(y, x);
        return [Math.cos(angle) * radius, Math.sin(angle) * radius]
    } else {
        return [x, y]
    }
}

function rippleBackgroundExitAnimation(element, targetOpacity) {
    element.effect.setKeyframes([{ opacity: targetOpacity }, { opacity: 0 }]);
    element.effect.updateTiming({ duration: 480 });
    element.state = 'exit';
    element.currentTime = 0;
}

function rippleBackgroundEnter(element, input) {
    let backgroundAnimation = element.getAnimations({ subtree: true }).find(i => i.id == 'background');
    const unbounded = input.unbounded;
    const targetOpacity = input.opacity;

    if (backgroundAnimation == undefined) {
        backgroundAnimation = element.animate([{ opacity: 0 }, { opacity: targetOpacity }], {
            id: 'background',
            pseudoElement: '::before',
            duration: 600,
            easing: 'linear',
            fill: 'both'
        });
        backgroundAnimation.state = 'enter'
    } else {
        const progress = getAnimationProgress(backgroundAnimation);

        if (progress == 1) {
            backgroundAnimation.effect.setKeyframes([{ opacity: 0 }, { opacity: targetOpacity }]);
            backgroundAnimation.effect.updateTiming({ duration: 600 });
            backgroundAnimation.state = 'enter';
            backgroundAnimation.currentTime = 0;
        } else {
            const previousProgress = unbounded ? backgroundAnimation.previousProgress : 1;

            backgroundAnimation.effect.setKeyframes([{ opacity: 0 }, { opacity: targetOpacity }]);
            backgroundAnimation.effect.updateTiming({ duration: 600 });

            if (backgroundAnimation.state == 'enter') {
                backgroundAnimation.currentTime = progress * 600;
                backgroundAnimation.removeEventListener('finish', rippleBackgroundExitHandler, { once: true })
            } else {
                backgroundAnimation.currentTime = (1 - progress) * previousProgress * 600;
            }

            backgroundAnimation.state = 'enter';
        }
    }
}

function rippleBackgroundExit(element, input) {
    const backgroundAnimation = element.getAnimations({ subtree: true }).find(i => i.id == 'background');

    const unbounded = input.unbounded;
    const targetOpacity = input.opacity;
    const progress = getAnimationProgress(backgroundAnimation);

    if (unbounded) {
        backgroundAnimation.effect.setKeyframes([{ opacity: targetOpacity * progress }, { opacity: 0 }]);
        backgroundAnimation.effect.updateTiming({ duration: 480 });
        backgroundAnimation.state = 'exit';
        backgroundAnimation.currentTime = 0;
        backgroundAnimation.previousProgress = progress;
    } else {
        if (progress == 1) {
            backgroundAnimation.effect.setKeyframes([{ opacity: targetOpacity }, { opacity: 0 }]);
            backgroundAnimation.effect.updateTiming({ duration: 480 });
            backgroundAnimation.state = 'exit';
            backgroundAnimation.currentTime = 0;
        } else {
            backgroundAnimation.effect.updateTiming({ duration: 120 });
            backgroundAnimation.state = 'enter';
            backgroundAnimation.currentTime = progress * 120;

            rippleBackgroundExitHandler = rippleBackgroundExitAnimation.bind(null, backgroundAnimation, targetOpacity);
            backgroundAnimation.addEventListener('finish', rippleBackgroundExitHandler, { once: true })
        }
    }
}

function rippleForegroundEnter(element, input) {
    const rippleForegroundObject = document.createElement('div');
    rippleForegroundObject.className = 'ripple';
    element.appendChild(rippleForegroundObject);
    const lastRippleForeground = element.querySelector('div:last-child');

    const containerRadius = Math.hypot(input.width, input.height) / 2;
    const unbounded = input.unbounded;

    if (unbounded) {
        const targetOpacity = input.opacity;
        const radius = input.width / 2;
        const duration = 1000 * Math.sqrt(radius * 3 / 1024 * 3);

        lastRippleForeground.animate([
            { scale: 1 }
        ], {
            id: 'radius',
            duration: duration,
            delay: 80,
            easing: 'linear',
            fill: 'both'
        });

        if (input.key == undefined) {
            const offset = getClampedPosition(input.offset[0], input.offset[1], radius);

            lastRippleForeground.animate([
                { translate: `${CSS.px(offset[0])} ${CSS.px(offset[1])}` },
                { translate: CSS.px(0) }
            ], {
                id: 'move',
                duration: duration,
                delay: 80,
                easing: 'linear',
                fill: 'both'
            });
        }

        lastRippleForeground.animate([
            { opacity: targetOpacity }
        ], {
            id: 'opacity',
            duration: 120,
            easing: 'linear',
            fill: 'both'
        });
    } else {
        const rippleRadius = Math.min(containerRadius, 350) * 0.9 + containerRadius * Math.random() * 0.1;
        lastRippleForeground.style.inlineSize = CSS.px(rippleRadius * 2);
    }
}

function rippleForegroundMove(element, input) {
    const lastRippleForeground = element.querySelector('div:last-child');
    const moveAnimation = lastRippleForeground.getAnimations().find(i => i.id == 'move');

    const radius = input.width / 2;
    const offset = getClampedPosition(input.offset[0], input.offset[1], radius);

    moveAnimation.effect.setKeyframes([
        { translate: `${CSS.px(offset[0])} ${CSS.px(offset[1])}` },
        { translate: CSS.px(0) }
    ]);
}

function rippleForegroundExit(element, input) {
    const lastRippleForeground = element.querySelector('div:last-child');
    const unbounded = input.unbounded;
    const targetOpacity = input.opacity;

    if (unbounded) {
        const radiusAnimation = lastRippleForeground.getAnimations().find(i => i.id == 'radius');
        const progress = getAnimationProgress(radiusAnimation);
        const radius = input.width / 2;
        const radiusDuration = 1000 * Math.sqrt(radius * 3 * (1 - progress) / (1024 + 3400) * 3);

        radiusAnimation.effect.setKeyframes([
            { scale: 1 * progress },
            { scale: 1 }
        ]);
        radiusAnimation.effect.updateTiming({
            duration: radiusDuration,
            delay: 0,
            easing: RIPPLE_EXPAND_EASING
        });
        radiusAnimation.currentTime = 0;

        if (input.key == undefined) {
            const moveAnimation = lastRippleForeground.getAnimations().find(i => i.id == 'move');;
            const offset = getClampedPosition(input.offset[0], input.offset[1], radius);

            moveAnimation.effect.setKeyframes([
                { translate: `${CSS.px(offset[0] * (1 - progress))} ${CSS.px(offset[1] * (1 - progress))}` },
                { translate: CSS.px(0) }
            ]);
            moveAnimation.effect.updateTiming({
                duration: radiusDuration,
                delay: 0,
                easing: RIPPLE_EXPAND_EASING
            });
            moveAnimation.currentTime = 0;
        }

        const opacityAnimation = lastRippleForeground.getAnimations().find(i => i.id == 'opacity');
        const lastEndAnimation = radiusDuration > 1000 / 3 ? radiusAnimation : opacityAnimation

        if (opacityAnimation.playState == 'finished') {
            opacityAnimation.effect.setKeyframes([
                { opacity: targetOpacity },
                { opacity: 0 }
            ]);
            opacityAnimation.effect.updateTiming({ duration: 1000 / 3 });
            opacityAnimation.currentTime = 0;

            lastEndAnimation.addEventListener('finish', () => {
                lastRippleForeground.remove();
            });
        } else {
            opacityAnimation.addEventListener('finish', (event) => {
                event.target.effect.setKeyframes([
                    { opacity: targetOpacity },
                    { opacity: 0 }
                ]);
                event.target.effect.updateTiming({ duration: 1000 / 3 });
                event.target.currentTime = 0;

                lastEndAnimation.addEventListener('finish', () => {
                    lastRippleForeground.remove();
                });
            })
        }
    } else {
        lastRippleForeground.animate([
            { scale: 1 }
        ], {
            duration: 800,
            easing: RIPPLE_EXPAND_EASING,
            fill: 'both'
        });

        if (input.key == undefined) {
            lastRippleForeground.animate([
                { translate: `${CSS.px(input.offset[0])} ${CSS.px(input.offset[1])}` },
                { translate: `${CSS.px(input.offset[0] * 0.7)} ${CSS.px(input.offset[1] * 0.7)}` }
            ], {
                duration: 300,
                easing: RIPPLE_EXPAND_EASING,
                fill: 'both'
            });
        }

        let opacityExit = lastRippleForeground.animate([
            { opacity: targetOpacity },
            { opacity: 0 }
        ], {
            duration: 400,
            easing: 'linear',
            fill: 'both'
        });

        opacityExit.addEventListener('finish', () => {
            lastRippleForeground.remove();
        });
    }
}

function pointerMove(element, input) {
    input.offset = getRippleOffset(event, input.width, input.height);
    rippleForegroundMove(element, input);
}

function pointerOut(element, input) {
    element.removeEventListener('pointerup', pointerOutHandler);
    element.removeEventListener('pointerleave', pointerOutHandler);
    element.removeEventListener('pointermove', pointerMoveHandler);

    const overlayElement = element.querySelector('.overlay[variant="states"]');
    input.offset = getRippleOffset(event, input.width, input.height);

    rippleBackgroundExit(overlayElement, input)
    rippleForegroundExit(overlayElement, input)
}

function keyOut(element, input) {
    if (event.code != input.key) {
        return
    }

    const overlayElement = element.querySelector('.overlay[variant="states"]');
    rippleBackgroundExit(overlayElement, input)
    rippleForegroundExit(overlayElement, input)

    element.removeEventListener('keyup', keyOutHandler);
}

document.querySelectorAll('[interact], button, footer>a').forEach((element) => {
    addStatesOverlay(element);

    element.addEventListener('pointerdown', (event) => {
        const input = {};
        const overlayElement = element.querySelector('.overlay[variant="states"]');
        const unbounded = ifUnbounded(element);

        input.unbounded = unbounded;
        input.width = overlayElement.getBoundingClientRect().width;
        input.height = overlayElement.getBoundingClientRect().height;
        input.offset = getRippleOffset(event, input.width, input.height);
        input.opacity = getComputedStyle(element).getPropertyValue("--ripple-opacity");

        rippleBackgroundEnter(overlayElement, input);
        rippleForegroundEnter(overlayElement, input);

        if (unbounded) {
            pointerMoveHandler = pointerMove.bind(null, overlayElement, input);
            element.addEventListener('pointermove', pointerMoveHandler);
        }

        pointerOutHandler = pointerOut.bind(null, element, input);
        element.addEventListener('pointerup', pointerOutHandler);
        element.addEventListener('pointerleave', pointerOutHandler);
    });

    element.addEventListener('keydown', (event) => {
        const key = event.code;
        if (key !== 'Space' && key !== 'Enter' || event.repeat) {
            return
        }

        const input = {};
        const overlayElement = element.querySelector('.overlay[variant="states"]');
        const unbounded = ifUnbounded(element);

        input.key = key;
        input.unbounded = unbounded;
        input.width = overlayElement.getBoundingClientRect().width;
        input.height = overlayElement.getBoundingClientRect().height;
        input.opacity = getComputedStyle(element).getPropertyValue("--ripple-opacity");

        rippleBackgroundEnter(overlayElement, input);
        rippleForegroundEnter(overlayElement, input);

        keyOutHandler = keyOut.bind(null, element, input);
        element.addEventListener('keyup', keyOutHandler);
    });

});

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.simulator .overlay[variant="states"]').forEach((element) => {
        const parentElement = element.parentNode;
        const unbounded = ifUnbounded(parentElement);
        const constrained = ifConstraint(parentElement);
        const rippleForegroundObject = element.querySelector('.ripple');

        const containerWidth = element.getBoundingClientRect().width;
        const containerHeight = element.getBoundingClientRect().height;
        const longestLength = Math.max(containerWidth, containerHeight);
        const containerRadius = Math.hypot(containerWidth, containerHeight) / 2;

        if (unbounded) {
            const rippleRadius = constrained ? longestLength / 2 : containerRadius;
            const rippleRadiusEnterDuration = 1000 * Math.sqrt(rippleRadius * 3 / 1024 * 3);
            const rippleRadiusExitDuration = 1000 * Math.sqrt(rippleRadius * 3 / (1024 + 3400) * 3);

            element.style.inlineSize = constrained ? CSS.px(longestLength) : CSS.px(Math.hypot(longestLength, longestLength));
            rippleForegroundObject.style.setProperty('--enter-duration', CSS.ms(rippleRadiusEnterDuration));
            rippleForegroundObject.style.setProperty('--exit-duration', CSS.ms(rippleRadiusExitDuration));
        } else {
            const rippleRadius = Math.min(containerRadius, 350) * 0.9 + containerRadius * Math.random() * 0.1;
            rippleForegroundObject.style.inlineSize = CSS.px(rippleRadius * 2);
        }
    });
});
