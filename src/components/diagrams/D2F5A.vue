<script setup lang="ts">
interface Props {
    id: string;
}

import { provide } from "vue";
import Diagram from "@document/Diagram.vue";

const { id } = defineProps<Props>();
provide("id", id);
provide("animation", true);
</script>

<style>
#ideal-material {
    figure:has(&) {
        grid-column-end: var(--medium-content-span);
    }

    & .canvas {
        block-size: 480px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        filter: var(--drop-shadow-z2);
    }

    & .surface {
        position: relative;
        inline-size: 250px;
        block-size: 125px;
        border-radius: 2px;
        background-color: var(--high-emphasis-surface-color);

        &:first-child {
            --surface-edge: both;
            inset-block-start: -50px;
        }

        &:last-child {
            --surface-edge: bottom;
            inset-block-end: -50px;

            &::after {
                border-block-start: none;
            }
        }
    }

    &[data-playback] {
        animation-duration: 5s;

        & .surface:first-child {
            animation-name: idealMaterial11, idealMaterial2, idealMaterial31;
            animation-duration: 0.75s, 0.6s, 0.6s;
            animation-delay: 0.5s, 2s, 3.5s;
            animation-timing-function: var(--standard-curve);
            animation-fill-mode: forwards;
        }

        & .surface:last-child {
            animation-name: idealMaterial12, idealMaterial2, idealMaterial32;
            animation-duration: 0.75s, 0.6s, 0.6s;
            animation-delay: 0.5s, 2s, 3.5s;
            animation-timing-function: var(--standard-curve);
            animation-fill-mode: forwards;
        }
    }
}

@keyframes idealMaterial11 {
    0% {
        inset-block-start: -50px;
    }

    100% {
        inset-block-start: 25px;
    }
}

@keyframes idealMaterial12 {
    0% {
        inset-block-end: -50px;
    }

    100% {
        inset-block-end: 25px;
    }
}

@keyframes idealMaterial2 {
    100% {
        block-size: 150px;
    }
}

@keyframes idealMaterial31 {
    100% {
        inset-block-start: -50px;
        block-size: 125px;
    }
}

@keyframes idealMaterial32 {
    100% {
        inset-block-end: -50px;
        block-size: 125px;
    }
}
</style>

<template>
    <Diagram variant="illustration">
        <div class="surface"></div>
        <div class="surface"></div>
    </Diagram>
</template>
