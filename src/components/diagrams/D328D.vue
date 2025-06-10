<script setup lang="ts">
interface Props {
    id: string;
}

import Diagram from "@document/Diagram.vue";

const { id } = defineProps<Props>();
</script>

<style>
#magical-material {
    block-size: 360px;

    figure:has(&) {
        grid-column-end: var(--medium-content-span);
    }

    & .canvas {
        display: grid;
        place-items: center;
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
            animation-name: magicalMaterial1, magicalMaterial2, magicalMaterial3, magicalMaterial4, toCollapse_size;
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
    <Diagram :id="id" variant="illustration" :animation="true">
        <div class="surface"></div>
    </Diagram>
</template>