<script setup lang="ts">
interface Props {
    id: string;
}

import { provide } from "vue";
import Diagram from "@document/Diagram.vue";

const { id } = defineProps<Props>();
provide("id", id);
provide("animation", true)
</script>

<style>
#free-movement {
    figure:has(&) {
        grid-column-end: var(--medium-content-span);
    }

    & .canvas {
        block-size: 480px;
        display: grid;
        place-items: center;
        filter: var(--drop-shadow-z2);
    }

    & .surface {
        position: relative;
        inline-size: 150px;
        aspect-ratio: 1/1;
        border-radius: 2px;
        background-color: var(--high-emphasis-surface-color);
        translate: -225px 100px;
    }

    &[data-playback] {
        animation-duration: 4s;

        & .canvas {
            will-change: filter;
            animation-name: freeMovement12, freeMovement22;
            animation-duration: 1s;
            animation-delay: 0.5s, 2.5s;
            animation-timing-function: var(--standard-curve);
            animation-fill-mode: forwards;
        }

        & .surface {
            animation-name: freeMovement11, freeMovement21;
            animation-duration: 1s;
            animation-delay: 0.5s, 2.5s;
            animation-timing-function: var(--standard-curve);
            animation-fill-mode: both;
        }
    }
}

@keyframes freeMovement12 {
    100% {
        filter: var(--drop-shadow-z8);
    }
}

@keyframes freeMovement22 {
    100% {
        filter: var(--drop-shadow-z2);
    }
}

@keyframes freeMovement11 {
    100% {
        translate: 225px -100px;
        rotate: -90deg;
    }
}

@keyframes freeMovement21 {
    100% {
        translate: -225px 100px;
        rotate: -180deg;
    }
}

@media (width < 920px) {
    #free-movement .surface {
        inline-size: 120px;
        translate: -75px 135px;
    }

    @keyframes freeMovement11 {
        100% {
            translate: 75px -135px;
            rotate: -90deg;
        }
    }

    @keyframes freeMovement21 {
        100% {
            translate: -75px 135px;
            rotate: 0deg;
        }
    }
}
</style>

<template>
    <Diagram variant="illustration">
        <div class="surface"></div>
    </Diagram>
</template>
