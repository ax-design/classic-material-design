<script setup lang="ts">
interface Props {
    id: string;
}

import Diagram from "@document/Diagram.vue";

const { id } = defineProps<Props>();
</script>

<style>
#relative-static {
    block-size: 570px;

    figure:has(&) {
        grid-column-end: var(--medium-content-span);
    }

    & .canvas {
        display: grid;
        grid-auto-flow: row;
    }

    & .surface {
        --surface-edge: both;
        position: relative;
    }

    & .surfaces {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 8px;
        margin-block: var(--keyline);
        padding-inline: 8px;
        box-sizing: border-box;

        & > .surface {
            aspect-ratio: 1 / 1;
            background-color: var(--medium-emphasis-surface-color);
            box-shadow: var(--shadow-z2);
            border-radius: 2px;
        }
    }

    & .canvas > .surface:first-of-type {
        z-index: 4;
        position: sticky;
        block-size: var(--increment);
        background-color: var(--high-emphasis-surface-color);
        box-shadow: var(--shadow-z4);
    }

    & .canvas > .surface:last-of-type {
        inset-inline-end: var(--keyline);
        inset-block-end: var(--keyline);
        position: absolute;
        inline-size: 56px;
        aspect-ratio: 1 / 1;
        background-color: var(--blue-500);
        border-radius: 50%;
        box-shadow: var(--shadow-z6);
    }

    &[data-playback] {
        animation-duration: 5s;
    }

    &[data-playback] .surfaces {
        animation-name: surfacesMoveUp, clear-translate-to;
        animation-duration: 2s;
        animation-delay: 0.5s, 3s;
        animation-timing-function: var(--standard-curve);
        animation-fill-mode: forwards;
    }
}

@keyframes surfacesMoveUp {
    100% {
        translate: 0% -45%;
    }
}

@media (width < 920px) {
    #relative-static {
        block-size: 360px;

        & .surfaces {
            grid-template-columns: repeat(2, 1fr);
            padding-inline: 8px;

            & .surface:nth-of-type(n + 7) {
                display: none;
            }
        }
    }
}
</style>

<template>
    <Diagram :id="id" variant="illustration" :animation="true">
        <div class="surface"></div>
        <div class="surfaces">
            <div class="surface"></div>
            <div class="surface"></div>
            <div class="surface"></div>
            <div class="surface"></div>
            <div class="surface"></div>
            <div class="surface"></div>
            <div class="surface"></div>
            <div class="surface"></div>
            <div class="surface"></div>
            <div class="surface"></div>
            <div class="surface"></div>
            <div class="surface"></div>
            <div class="surface"></div>
            <div class="surface"></div>
            <div class="surface"></div>
            <div class="surface"></div>
        </div>
        <div class="surface"></div>
    </Diagram>
</template>
