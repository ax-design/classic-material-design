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
#magical-material {
    figure:has(&) {
        grid-column-end: var(--medium-content-span);
    }

    & .canvas {
        block-size: 360px;
        display: grid;
        place-items: center;

        @media (width < 920px) {
            block-size: auto;
            aspect-ratio: 1 / 1;
        }
    }

    & .surface {
        --surface-edge: both;
        position: relative;
        inline-size: 0cqb;
        block-size: 0cqb;
        border-radius: 50%;
        background-color: var(--high-emphasis-surface-color);
        box-shadow: var(--shadow-z2);
    }

    &[data-playback] {
        animation-duration: 5s;

        & .surface {
            animation-name: magicalMaterial1, magicalMaterial2, magicalMaterial3, magicalMaterial4, collapse-size-to;
            animation-duration: 300ms, 500ms, 500ms, 500ms, 250ms;
            animation-delay: 0.5s, 1.5s, 2.5s, 3.5s, 4.5s;
            animation-timing-function: var(--deceleration-curve), var(--standard-curve), var(--standard-curve), var(--standard-curve), var(--acceleration-curve);
            animation-fill-mode: forwards;
        }
    }
}

@keyframes magicalMaterial1 {
    100% {
        inline-size: 25cqb;
        block-size: 25cqb;
    }
}

@keyframes magicalMaterial2 {
    100% {
        inline-size: 40cqb;
        block-size: 40cqb;
        border-radius: 2px;
    }
}

@keyframes magicalMaterial3 {
    100% {
        inline-size: 60cqb;
    }
}

@keyframes magicalMaterial4 {
    100% {
        block-size: 60cqb;
    }
}
</style>

<template>
    <Diagram variant="illustration">
        <div class="surface"></div>
    </Diagram>
</template>