import { CMDIcon } from './modules/icons.mjs';

/*导航抽屉*/

// 开关抽屉
window.onresize = () => {
    if (window.innerWidth >= 1576) {
        drawer.hidePopover();
    }
};

/*模拟器*/

let diagramAnimationPending;

document.querySelectorAll('figure>[animated]').forEach((element) => {
    element.addEventListener('click', () => {
        if (element.querySelector('video')) {
            let target = element.querySelector('video');
            if (target.paused) {
                target.play();
            } else {
                target.pause();
            }
            element.toggleAttribute('play');
            return
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

/*状态遮罩*/

const interactiveElement = 'aside li, button, footer>a, summary';
const RIPPLE_EXPAND_EASING = 'cubic-bezier(0.17, 0.74, 0.4, 1)';

let rippleBackgroundExitHandler;
let pointerMoveHandler;
let pointerOutHandler;
let keyOutHandler;

function ifUnbounded(element) {
    if (element.classList.contains('button') && element.getAttribute('data-variant') == 'icon') {
        return true
    } else if (element.hasAttribute('unbounded')) {
        return true
    } else {
        return false
    }
}

function ifConstraint(element) {
    if (element.classList.contains('button') && element.getAttribute('data-variant') == 'icon') {
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
        const containerWidth = element.getBoundingClientRect().width;
        const containerHeight = element.getBoundingClientRect().height;
        const containerRadius = Math.hypot(containerWidth, containerHeight) / 2;
        const longestLength = Math.max(element.getBoundingClientRect().width, element.getBoundingClientRect().height);
        statesContainer.style.inlineSize = constrained ? CSS.px(longestLength) : CSS.px(containerRadius * 2);
    }
    statesContainer.className = 'overlay';
    statesContainer.setAttribute('data-variant', 'states');
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

    const overlayElement = element.querySelector('.overlay[data-variant="states"]');
    input.offset = getRippleOffset(event, input.width, input.height);

    rippleBackgroundExit(overlayElement, input)
    rippleForegroundExit(overlayElement, input)
}

function keyOut(element, input) {
    if (event.code != input.key) {
        return
    }

    const overlayElement = element.querySelector('.overlay[data-variant="states"]');
    rippleBackgroundExit(overlayElement, input)
    rippleForegroundExit(overlayElement, input)

    element.removeEventListener('keyup', keyOutHandler);
}

document.querySelectorAll(interactiveElement).forEach((element) => {
    addStatesOverlay(element);

    element.addEventListener('pointerdown', (event) => {
        const input = {};
        const overlayElement = element.querySelector('.overlay[data-variant="states"]');
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
        const overlayElement = element.querySelector('.overlay[data-variant="states"]');
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
    document.querySelectorAll('.simulator .overlay[data-variant="states"]').forEach((element) => {
        const parentElement = element.hasAttribute('standalone') ? element : element.parentNode;
        const unbounded = ifUnbounded(parentElement);
        const constrained = ifConstraint(parentElement);
        const rippleForegroundObject = element.querySelector('.ripple');
        if (rippleForegroundObject == undefined) {
            return
        }

        const containerWidth = parentElement.getBoundingClientRect().width;
        const containerHeight = parentElement.getBoundingClientRect().height;
        const longestLength = Math.max(containerWidth, containerHeight);
        const containerRadius = Math.hypot(containerWidth, containerHeight) / 2;

        if (unbounded) {
            const rippleRadius = constrained ? longestLength / 2 : containerRadius;
            const rippleRadiusEnterDuration = 1000 * Math.sqrt(rippleRadius * 3 / 1024 * 3);
            const rippleRadiusExitDuration = 1000 * Math.sqrt(rippleRadius * 3 / (1024 + 3400) * 3);

            element.style.inlineSize = constrained ? CSS.px(longestLength) : CSS.px(containerRadius * 2);
            rippleForegroundObject.style.setProperty('--enter-duration', CSS.ms(rippleRadiusEnterDuration));
            rippleForegroundObject.style.setProperty('--exit-duration', CSS.ms(rippleRadiusExitDuration));

        } else {
            const rippleRadius = Math.min(containerRadius, 350) * 0.9 + containerRadius * Math.random() * 0.1;
            rippleForegroundObject.style.inlineSize = CSS.px(rippleRadius * 2);
        }
    });
});
