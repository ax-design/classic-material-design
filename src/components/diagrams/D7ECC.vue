<script setup lang="ts">
interface Props {
    id: string;
}

import Diagram from "@document/Diagram.vue";

const { id } = defineProps<Props>();
</script>

<style>
#motion-without-shadow,
#motion-different-shadow,
#motion-same-shadow {
    aspect-ratio: 1/1;
    animation-duration: 4s;

    & .canvas {
        display: grid;
        place-items: center;
    }

    & .surface {
        position: relative;
        inline-size: 125px;
        aspect-ratio: 1/1;
        border-radius: 2px;
        background-color: var(--high-emphasis-surface-color);

        [data-playback] & {
            animation-duration: 750ms;
            animation-delay: 0.5s, 2.5s;
            animation-timing-function: var(--standard-curve);
            animation-fill-mode: forwards;
        }
    }
}

figure:has(#motion-without-shadow) {
    grid-column-start: 1;
}

:is(#motion-different-shadow, #motion-same-shadow) .surface {
    --surface-edge: both;
    box-shadow: var(--shadow-z2);
}

:is(#motion-without-shadow, #motion-same-shadow)[data-playback] .surface {
    animation-name: surfaceExpand, surfaceShrink;
}

#motion-different-shadow[data-playback] .surface {
    animation-name: surfaceLift, surfaceDrop;
}

@keyframes surfaceExpand {
    100% {
        inline-size: 150px;
    }
}

@keyframes surfaceShrink {
    100% {
        inline-size: 125px;
    }
}

@keyframes surfaceLift {
    100% {
        inline-size: 150px;
        box-shadow: var(--shadow-z12);
    }
}

@keyframes surfaceDrop {
    100% {
        inline-size: 125px;
        box-shadow: var(--shadow-z2);
    }
}
</style>

<template>
    <Diagram :id="id" variant="illustration" :animation="true">
        <div class="surface"></div>
    </Diagram>
    <slot />
</template>