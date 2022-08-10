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

document.querySelectorAll('[interact], button, footer>a').forEach((element) => {
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
