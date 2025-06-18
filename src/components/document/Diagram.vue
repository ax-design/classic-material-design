<script setup lang="ts">
interface Props {
    variant?: "illustration" | "simulator" | "video";
    application?: string;
    window?: "mobile" | "tablet" | "desktop";
    theme?: string;
}

import { useTemplateRef, ref, onMounted, provide, inject } from "vue";
import { getCSSAnimations } from "@scripts/utils";
import Icon from "@material/Icon.vue";
import System from "@applications/System.vue";

const { variant = "illustration", application, window, theme = "base" } = defineProps<Props>();

const id = inject<string>("id");
const animation = inject<boolean>("animation", false);
const isInProduction = import.meta.env.PROD;

provide("isIsolated", true);

const root = useTemplateRef("diagram");
const playback = ref<boolean>(false);

function diagramPlayerHandler() {
    const diagram = root.value!;
    const video = diagram.querySelector("video");

    if (video) {
        playback.value ? video.pause() : video.play();
    } else {
        getCSSAnimations(diagram).forEach((animation) => {
            if (animation.playState !== "finished") {
                playback.value ? animation.pause() : animation.play();
            }
        });
    }

    playback.value = !playback.value;
}

onMounted(() => {
    if (!animation || variant === "video") return;
    const diagram = root.value!;
    const animations = getCSSAnimations(diagram);
    animations[0]?.addEventListener(
        "finish",
        () => {
            animations.forEach((animation) => animation.play());
        },
        { passive: true }
    );
});
</script>

<style>
.diagram {
    position: relative;
    display: flow-root;
    outline: 1px solid light-dark(var(--divider-color), transparent);
    outline-offset: -1px;
    isolation: isolate;
    user-select: none;

    &:has(> video) {
        display: flex;
    }

    &:not(picture, :has(> video)) {
        background-color: light-dark(var(--grey-200), var(--grey-900));
        background-image: radial-gradient(circle at top left, rgb(0 0 0 / 0) calc(1 / 3 * 100%), light-dark(rgb(0 0 0 / 0.01), rgb(0 0 0 / 0.04)) calc(7 / 9 * 100%), light-dark(rgb(0 0 0 / 0.02), rgb(0 0 0 / 0.08)) 100%);
    }

    &[data-playback] {
        animation-name: timeline;
        animation-fill-mode: both;
        animation-timing-function: linear;
        animation-play-state: paused;

        & *:not(& > button) {
            animation-play-state: paused;

            &::after,
            &::before {
                animation-play-state: paused;
            }
        }
    }

    & > :where(.canvas, .device) {
        --increment: 56px;
        --keyline: 16px;
        z-index: -1;
        container-name: diagram;
        container-type: size;
        position: relative;
        inline-size: stretch;
        block-size: stretch;
        box-sizing: border-box;
        overflow: clip;

        [data-window="tablet"] & {
            --increment: 64px;
            --keyline: 24px;
        }
    }
}

.diagram > button {
    inset: 0;
    position: absolute;
    display: flex;
    place-content: center;
    place-items: center;
    padding: unset;
    color: white;
    background-color: rgb(0 0 0 / 0.4);
    border: none;
    cursor: pointer;
    transition-property: opacity;
    transition-duration: 200ms;
    transition-timing-function: linear;

    .diagram[data-playback="play"] & {
        opacity: 0;
        transition-duration: 150ms;
    }

    & .icon {
        --size: 4.5rem;
    }
}

.diagram > .device {
    --scale-ratio: min(calc((100vw - 32px) / var(--device-width)), 1);
    inline-size: var(--device-width);
    block-size: var(--device-height);
    display: flex;
    flex-direction: column;
    margin-block-end: calc(0px - (1 - var(--scale-ratio)) * var(--device-height));
    background-color: var(--medium-emphasis-surface-color);
    transform-origin: left top;
    scale: var(--scale-ratio);

    & .application {
        flex-grow: 1;
        position: relative;
        padding-block-end: var(--navigation-bar-block-size);
        color: var(--primary-text-color);
        background-color: var(--medium-emphasis-surface-color);
        overflow: auto;
        scrollbar-width: none;

        & * {
            scrollbar-width: inherit;
        }
    }

    [data-window="mobile"] & {
        --device-width: 360px;
        --device-height: 640px;
    }

    [data-window="tablet"] & {
        --device-width: 760px;
        --device-height: 570px;
    }
}

.diagram .sheet[popover] {
    display: block;
}

.user-input {
    z-index: 26;
    position: absolute;
    inline-size: 100%;
    block-size: 100%;
    display: grid;
    grid-template: 1fr / 1fr;
}

.touch {
    grid-area: 1 / 1 / 2 / 2;
    position: relative;
    display: grid;
    inline-size: 36px;
    block-size: 36px;
    grid-template: 1fr / 1fr;
    place-content: center;
    place-items: center;
    background-color: rgb(255 255 255 / 0.8);
    background-clip: content-box;
    border: 62px solid rgb(255 64 129 / 0.2);
    border-radius: 50%;

    &::after,
    &::before {
        content: "";
        grid-area: 1 / 1 / 2 / 2;
        inline-size: 100%;
        aspect-ratio: 1/1;
        border-radius: 50%;
    }

    &::after {
        border: 14px solid rgb(255 64 129 / 0.3);
    }

    &::before {
        border: 4px solid rgb(255 64 129 / 1);
    }
}

@keyframes touchIn {
    0% {
        inline-size: 56px;
        block-size: 56px;
        border-width: 0px;
        background-color: rgb(255 255 255 / 0);
        border-color: rgb(255 64 129 / 0);
    }
}

@keyframes touchOut {
    50% {
        border-color: rgb(255 64 129 / 0);
    }

    100% {
        inline-size: 56px;
        block-size: 56px;
        border-width: 0px;
        background-color: rgb(255 255 255 / 0);
        border-color: rgb(255 64 129 / 0);
    }
}
</style>

<template>
    <div :id="id" class="diagram" :data-variant="variant" :data-application="application" :data-window="window" :data-theme="theme" :data-playback="animation || variant === 'video' ? (playback ? 'play' : 'pause') : undefined" ref="diagram">
        <div v-if="variant === 'simulator'" class="device">
            <div class="application" :inert="isInProduction ? true : undefined">
                <slot />
                <div class="overlay" data-variant="navigation-bar"></div>
            </div>
            <System />
        </div>

        <slot v-else-if="variant === 'video'" />

        <div v-else class="canvas">
            <slot />
        </div>

        <button v-if="animation || variant === 'video'" type="button" @click.passive="diagramPlayerHandler">
            <Icon name="play_circle_filled" />
        </button>
    </div>
</template>
