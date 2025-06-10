<script setup lang="ts">
import { onMounted, useTemplateRef, ref, inject } from "vue";

const RIPPLE_EXPAND_EASING = "cubic-bezier(0.17, 0.74, 0.4, 1)";

const isIsolated = inject("isIsolated", false);

const stateLayer = useTemplateRef("state-layer");
const backgroundAnimation = ref<Animation>();
const isPressing = ref(false);

const rippleBackgroundNormalExitHandler = () => {
    const animation = backgroundAnimation.value!;
    animation.playbackRate = -1.25;
    animation.play();
};

function rippleBackgroundEnter() {
    const animation = backgroundAnimation.value!;
    animation.removeEventListener("finish", rippleBackgroundNormalExitHandler);

    if (animation.playbackRate < 0 && animation.playState === "running") {
        animation.updatePlaybackRate(1);
    } else {
        animation.playbackRate = 1;
        animation.play();
    }
}

function rippleBackgroundExit() {
    const animation = backgroundAnimation.value!;

    if (animation.playbackRate <= 0) return;
    animation.removeEventListener("finish", rippleBackgroundNormalExitHandler);

    if (animation.playState === "finished") {
        rippleBackgroundNormalExitHandler();
    } else {
        animation.playbackRate = 5;
        if (animation.playState === "paused") {
            animation.play();
        }

        animation.addEventListener("finish", rippleBackgroundNormalExitHandler, { once: true, passive: true });
    }
}

function createRippleForegound() {
    const foreground = document.createElement("div");
    foreground.className = "ripple";
    return foreground;
}

function rippleForegroundExit(event: PointerEvent | KeyboardEvent) {
    const container = stateLayer.value!;
    const containerDimensions = container.getBoundingClientRect();
    const isUnbounded = getComputedStyle(container).getPropertyValue("--unbounded") === "true";

    const foreground = createRippleForegound();
    container.appendChild(foreground);

    let radius: number;
    if (isUnbounded) {
        radius = containerDimensions.width / 2;
    } else {
        const containerRadius = Math.hypot(containerDimensions.width, containerDimensions.height) / 2;
        const maxRadius = Math.min(containerRadius, 350);
        radius = maxRadius * 0.9 + maxRadius * Math.random() * 0.1;
        foreground.attributeStyleMap.set("--radius", `${CSS.px(radius)}`);
    }

    const rippleScaleDuration = isUnbounded ? 1000 * Math.sqrt(radius / 1024) : 800;

    foreground.animate([{ scale: 1 }], {
        duration: rippleScaleDuration,
        easing: RIPPLE_EXPAND_EASING,
        fill: "both",
    });

    if (event instanceof PointerEvent) {
        const offset = { x: 0, y: 0 };
        const pointerX = event.clientX - containerDimensions.left;
        const pointerY = event.clientY - containerDimensions.top;

        offset.x = pointerX - containerDimensions.width / 2;
        offset.y = pointerY - containerDimensions.height / 2;

        if (isUnbounded) {
            const distance = Math.hypot(offset.x, offset.y);
            if (distance > radius) {
                const scale = radius / distance;
                offset.x *= scale;
                offset.y *= scale;
            }
        }

        foreground.animate([{ translate: `${CSS.px(offset.x)} ${CSS.px(offset.y)}` }, { translate: isUnbounded ? `${CSS.px(0)}` : `${CSS.px(offset.x * 0.7)} ${CSS.px(offset.y * 0.7)}` }], {
            duration: isUnbounded ? rippleScaleDuration : 300,
            easing: RIPPLE_EXPAND_EASING,
            fill: "both",
        });
    }

    const opacityExit = foreground.animate([{ opacity: 0 }], {
        duration: isUnbounded ? 1000 / 3 : 400,
        easing: "linear",
        fill: "both",
    });

    opacityExit.addEventListener(
        "finish",
        () => {
            foreground.remove();
        },
        { once: true, passive: true }
    );
}

function isValidKeyboardInput(event: KeyboardEvent): boolean {
    const key = event.code;
    return !event.repeat && (key === "Space" || key === "Enter");
}

function inputDownHandler(event: PointerEvent | KeyboardEvent) {
    event.stopPropagation();
    // console.log(event.currentTarget, stateLayer.value?.parentElement);
    // if (event.currentTarget != stateLayer.value?.parentElement) return;
    if (event instanceof PointerEvent && event.button != 0) return;
    if (event instanceof KeyboardEvent && !isValidKeyboardInput(event)) return;
    isPressing.value = true;
    rippleBackgroundEnter();
}

function inputUpHandler(event: PointerEvent | KeyboardEvent) {
    event.stopPropagation();
    if (!isPressing.value) return;
    rippleBackgroundExit();
    rippleForegroundExit(event);
    isPressing.value = false;
}

function pointerLeaveHandler(event: PointerEvent | KeyboardEvent) {
    event.stopPropagation();
    if (!isPressing.value) return;
    rippleBackgroundExit();
    isPressing.value = false;
}

onMounted(() => {
    const overlay = stateLayer.value!;
    const component = overlay.parentElement!;

    component.addEventListener("pointerdown", inputDownHandler, { passive: true });
    component.addEventListener("keydown", inputDownHandler, { passive: true });
    component.addEventListener("pointerup", inputUpHandler, { passive: true });
    component.addEventListener("keyup", inputUpHandler, { passive: true });
    component.addEventListener("pointerleave", pointerLeaveHandler, { passive: true });

    backgroundAnimation.value = overlay.animate([{ opacity: 1 }], {
        pseudoElement: "::before",
        duration: 600,
        easing: "linear",
        fill: "both",
    });
    backgroundAnimation.value.pause();

    isIsolated && overlay.appendChild(createRippleForegound());
});
</script>

<style>
@layer base {
    :root {
        --states-base-color: light-dark(black, white);
    }

    .state-layer {
        z-index: 1;
        position: absolute;
        inset: 0;
        display: grid;
        place-items: center;
        border-radius: inherit;
        overflow: clip;

        &::before,
        &::after {
            content: "";
            grid-area: 1 / 1;
            inline-size: stretch;
            block-size: stretch;
            border-radius: inherit;
        }

        &::before {
            background-color: rgb(from currentColor r g b / 0.06);
            opacity: 0;
        }

        &::after {
            background-color: var(--states-base-color);
            opacity: calc(var(--hovered-opacity, 0) + var(--focused-opacity, 0) + var(--selected-opacity, 0) + var(--dragged-opacity, 0));
            transition-property: opacity;
            transition-duration: 480ms;
            transition-timing-function: linear;
        }

        @container style(--unbounded: true) {
            & {
                --radius: calc(hypot(100cqi, 100cqb) / 2);
                container-type: size;
                place-content: center;
                overflow: visible;
            }

            .toolbar & {
                --radius: calc(hypot(max(100cqi, 100cqb), max(100cqi, 100cqb)) / 2);
            }

            &::before,
            &::after {
                inline-size: calc(var(--radius) * 2);
                block-size: auto;
                aspect-ratio: 1 / 1;
                border-radius: 50%;
            }

            & .ripple {
                --exit-duration: calc(1000ms * sqrt(tan(atan2(var(--radius), 1px)) / 1024));
                inline-size: calc(var(--radius) * 2);
            }
        }

        @container style(--hovered: true) {
            & {
                --hovered-opacity: 0.04;
            }

            &::after {
                transition-duration: 120ms;
            }
        }

        @container style(--focused: true) {
            & {
                --focused-opacity: 0.12;
            }
        }

        @container style(--selected: true) {
            & {
                --selected-opacity: 0.08;
            }
        }
    }

    .ripple {
        position: absolute;
        inline-size: calc(var(--radius) * 2);
        block-size: auto;
        aspect-ratio: 1/1;
        background-color: rgb(from currentColor r g b / 0.06);
        clip-path: circle(50%);
        scale: 0;

        button[data-variant="text"] & {
            inline-size: calc(var(--radius) * 2 * 2);
        }
    }
}
</style>

<template>
    <div class="state-layer" inert ref="state-layer"></div>
</template>