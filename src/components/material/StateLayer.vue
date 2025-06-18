<script setup lang="ts">
import { onMounted, useTemplateRef, ref, inject } from "vue";

const RIPPLE_BOUNDED_MAX_RADIUS = 120;

const isIsolated = inject("isIsolated", false);

const component = ref<HTMLElement>();
const stateLayer = useTemplateRef("state-layer");
const backgroundAnimation = ref<Animation>();
const isPressing = ref(false);

function getVaildParent() {
    const parentElement = stateLayer.value!.parentElement!;

    if (parentElement?.className.includes("thumb")) {
        return parentElement.parentElement!;
    }

    return parentElement;
}

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

function clamp(value: number, min: number, max: number) {
    return Math.min(Math.max(value, min), max);
}

function getInputOffset(event?: PointerEvent | KeyboardEvent) {
    const containerDimensions = stateLayer.value!.querySelector(".background")!.getBoundingClientRect();
    const offset = { x: 0, y: 0 };

    if (event instanceof PointerEvent) {
        const pointerX = clamp(event.clientX, containerDimensions.left, containerDimensions.right) - containerDimensions.left;
        const pointerY = clamp(event.clientY, containerDimensions.top, containerDimensions.bottom) - containerDimensions.top;

        offset.x = pointerX - containerDimensions.width / 2;
        offset.y = pointerY - containerDimensions.height / 2;
    }

    return offset;
}

function createRippleForegound(event?: PointerEvent | KeyboardEvent, noEnter: boolean = false) {
    const foreground = document.createElement("div");
    foreground.className = "ripple";

    const offset = getInputOffset(event);

    foreground.attributeStyleMap.set("--offset-x", `${CSS.px(offset.x)}`);
    foreground.attributeStyleMap.set("--offset-y", `${CSS.px(offset.y)}`);

    noEnter && foreground.setAttribute("inert", "");

    return foreground;
}

function rippleForegroundEnter(container: HTMLElement, event: PointerEvent | KeyboardEvent, isUnbounded: boolean) {
    if (!isUnbounded) return;

    const foreground = createRippleForegound(event);
    container.appendChild(foreground);
}

function rippleForegroundExit(container: HTMLElement, event: PointerEvent | KeyboardEvent, isUnbounded: boolean) {
    let foreground;
    if (isUnbounded) {
        foreground = container.querySelector(".ripple:last-of-type") as HTMLElement;
        const pastProgress = getComputedStyle(foreground).getPropertyValue("--scale-progress");
        foreground.setAttribute("inert", "");
        foreground.attributeStyleMap.set("--past-progress", pastProgress);
    } else {
        foreground = createRippleForegound(event);
        const radius = RIPPLE_BOUNDED_MAX_RADIUS * 0.9 + RIPPLE_BOUNDED_MAX_RADIUS * Math.random() * 0.1;
        foreground.attributeStyleMap.set("--radius", `${CSS.px(radius)}`);
        container.appendChild(foreground);
    }

    const opacityAnimation = foreground.getAnimations().at(-1);
    opacityAnimation?.addEventListener(
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
    if (event instanceof PointerEvent && event.button != 0) return;
    if (event instanceof KeyboardEvent && !isValidKeyboardInput(event)) return;
    isPressing.value = true;
    const container = stateLayer.value!;
    const isUnbounded = getComputedStyle(container).getPropertyValue("--unbounded") === "true";
    rippleBackgroundEnter();
    rippleForegroundEnter(container, event, isUnbounded);
    isUnbounded && component.value!.addEventListener("pointermove", pointerMoveHandler, { passive: true });
}

function inputUpHandler(event: PointerEvent | KeyboardEvent) {
    event.stopPropagation();
    if (!isPressing.value) return;
    const container = stateLayer.value!;
    const isUnbounded = getComputedStyle(container).getPropertyValue("--unbounded") === "true";
    rippleBackgroundExit();
    rippleForegroundExit(container, event, isUnbounded);
    component.value!.removeEventListener("pointermove", pointerMoveHandler);
    isPressing.value = false;
}

function pointerMoveHandler(event: PointerEvent) {
    if (!isPressing.value) return;
    const container = stateLayer.value!;
    const foreground = container.querySelector(".ripple:last-of-type") as HTMLElement;
    const offset = getInputOffset(event);
    foreground.attributeStyleMap.set("--offset-x", `${CSS.px(offset.x)}`);
    foreground.attributeStyleMap.set("--offset-y", `${CSS.px(offset.y)}`);
}

function pointerLeaveHandler(event: PointerEvent) {
    event.stopPropagation();
    if (!isPressing.value) return;
    const container = stateLayer.value!;
    const isUnbounded = getComputedStyle(container).getPropertyValue("--unbounded") === "true";
    rippleBackgroundExit();
    rippleForegroundExit(container, event, isUnbounded);
    component.value!.removeEventListener("pointermove", pointerMoveHandler);
    isPressing.value = false;
}

onMounted(() => {
    const overlay = stateLayer.value!;
    component.value = getVaildParent();

    component.value.addEventListener("pointerdown", inputDownHandler, { passive: true });
    component.value.addEventListener("keydown", inputDownHandler, { passive: true });
    component.value.addEventListener("pointerup", inputUpHandler, { passive: true });
    component.value.addEventListener("keyup", inputUpHandler, { passive: true });
    component.value.addEventListener("pointerleave", pointerLeaveHandler, { passive: true });

    backgroundAnimation.value = overlay.querySelector(".background")!.animate([{ opacity: 1 }], {
        pseudoElement: "::after",
        duration: 600,
        easing: "linear",
        fill: "both",
    });
    backgroundAnimation.value.pause();

    isIsolated && getComputedStyle(component.value).getPropertyValue("--prepare") === "true" && overlay.appendChild(createRippleForegound(undefined, true));
});
</script>

<style>
@layer base {
    :root {
        --states-base-color: light-dark(black, white);
        --ripple-expand-easing: cubic-bezier(0.17, 0.74, 0.4, 1);
    }

    @property --scale-progress {
        syntax: "<number>";
        inherits: false;
        initial-value: 0;
    }

    @property --offset-progress {
        syntax: "<number>";
        inherits: false;
        initial-value: 0;
    }

    @function --ripple-opacity(--color) {
        result: if(style(--color: light-dark(black, white)): 0.06; else: 0.12);
    }

    @function --transform-progress(--progress) {
        result: calc(1 - pow(400, var(--progress) / -1.4));
    }

    .state-layer {
        container-type: size;
        position: absolute;
        inset: 0;
        display: grid;
        grid-template-columns: 1fr;
        grid-template-rows: 1fr;
        place-content: center;
        place-items: center;
        border-radius: inherit;
        overflow: clip;
        transition-duration: 120ms;
        transition-timing-function: linear;

        & .background {
            inline-size: stretch;
            block-size: stretch;
            position: relative;
            border-radius: inherit;
            transition-duration: inherit;
            transition-timing-function: inherit;

            &::before,
            &::after {
                content: "";
                position: absolute;
                inset: 0;
                border-radius: inherit;
                pointer-events: none;
            }

            &::before {
                background-color: var(--states-base-color);
                opacity: calc(var(--hovered-opacity, 0) + var(--focused-opacity, 0) + var(--selected-opacity, 0) + var(--dragged-opacity, 0));
                transition-property: background-color, opacity;
                transition-duration: 480ms;
                transition-timing-function: linear;
            }

            &::after {
                background-color: rgb(from var(--states-base-color) r g b / --ripple-opacity(var(--states-base-color)));
                opacity: 0;
                transition-property: background-color;
                transition-duration: inherit;
                transition-timing-function: inherit;
            }
        }

        @container style(--unbounded: true) {
            & {
                --radius: calc(hypot(100cqi, 100cqb) / 2);
                overflow: visible;
            }

            .toolbar & {
                --radius: calc(hypot(max(100cqi, 100cqb), max(100cqi, 100cqb)) / 2);
            }

            .switch .thumb & {
                --radius: 24px;
                z-index: -1;
            }

            & .background {
                inline-size: calc(var(--radius) * 2);
                block-size: auto;
                aspect-ratio: 1 / 1;
                border-radius: 50%;
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
            --selected-opacity: 0.08;
        }
    }

    .ripple {
        --constraint-scale: 1;
        --offset-drift: calc(1 - (0.3 * --transform-progress(var(--offset-progress))));
        position: absolute;
        inline-size: calc(var(--radius) * 2);
        block-size: auto;
        aspect-ratio: 1/1;
        background-color: rgb(from var(--states-base-color) r g b / --ripple-opacity(var(--states-base-color)));
        clip-path: circle(50%);
        scale: calc(0 + --transform-progress(var(--scale-progress)));
        translate:
            calc(var(--offset-x, 0px) * var(--constraint-scale) * var(--offset-drift))
            calc(var(--offset-y, 0px) * var(--constraint-scale) * var(--offset-drift));
        transition-property: background-color;
        transition-duration: inherit;
        transition-timing-function: inherit;
        animation-name: ripple-scale-progress, ripple-offset-progress, hide-opacity-to;
        animation-timing-function: linear;
        animation-duration: 800ms, 300ms, 400ms;
        animation-fill-mode: forwards;

        @container style(--unbounded: true) {
            & {
                --input-offset-radius: hypot(var(--offset-x, 0px), var(--offset-y, 0px));
                --constraint-scale: min(1, calc(var(--radius) / var(--input-offset-radius)));
                --offset-drift: calc(1 - var(--scale-progress));
                --ripple-scale-enter-duration: calc(1000ms * sqrt(var(--radius) / 1px * 3 / 1024));
                scale: calc(0 + var(--scale-progress));
                animation-name: ripple-scale-progress;
                animation-duration: var(--ripple-scale-enter-duration);
            }

            &[inert] {
                --past-progress: 0;
                --remain-progress: calc(1 - var(--past-progress));
                --offset-drift: calc(var(--remain-progress) - var(--remain-progress) * --transform-progress(var(--scale-progress)));
                --ripple-scale-exit-duration: calc(1000ms * sqrt(var(--remain-progress) * var(--radius) / 1px * 3 / (1024 + 3400)));
                --ripple-opacity-exit-duration: calc(1000ms / 3);
                scale: calc(var(--past-progress) + var(--remain-progress) * --transform-progress(var(--scale-progress)));
                animation-name: ripple-scale-progress-restart, hide-opacity-to;
                animation-duration: var(--ripple-scale-exit-duration), var(--ripple-opacity-exit-duration);
            }
        }
    }

    .switch .thumb .state-layer {
        transition-duration: inherit;
        transition-timing-function: inherit;

        & .background::before {
            transition-duration: 250ms, 480ms;
            transition-timing-function: var(--standard-curve), linear;
        }
    }
}

@keyframes ripple-scale-progress {
    to {
        --scale-progress: 1;
    }
}

@keyframes ripple-scale-progress-restart {
    from {
        --scale-progress: 0;
    }
    to {
        --scale-progress: 1;
    }
}

@keyframes ripple-offset-progress {
    to {
        --offset-progress: 1;
    }
}

@keyframes ripple-move-translate-to {
    to {
        translate: calc(var(--offset-x) * 0.7) calc(var(--offset-y) * 0.7);
    }
}
</style>

<template>
    <div class="state-layer" inert ref="state-layer">
        <div class="background"></div>
    </div>
</template>
