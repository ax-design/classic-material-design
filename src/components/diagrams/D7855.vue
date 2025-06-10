<script setup lang="ts">
interface Props {
    id: string;
}

import Diagram from "@document/Diagram.vue";

const { id } = defineProps<Props>();
</script>

<style>
#without-shadow,
#similar-shadow,
#distinguishable-shadow {
    block-size: 240px;

    .canvas {
        background-color: light-dark(var(--grey-300), var(--grey-950));
    }

    & .top-bar {
        anchor-name: --top-bar;
        position: relative;
        block-size: 168px;
        background-color: var(--low-emphasis-surface-color);
    }

    & .surface {
        position-anchor: --top-bar;
        inset-block-start: calc(anchor(bottom) - 28px);
        inset-inline-end: calc(anchor(right) + var(--keyline));
        position: absolute;
        inline-size: 56px;
        aspect-ratio: 1 / 1;
        border-radius: 50%;
        background-color: var(--high-emphasis-surface-color);
    }
}

figure:has(#without-shadow) {
    grid-column-start: 1;
}

:is(#similar-shadow, #distinguishable-shadow) {
    .top-bar {
        --surface-edge: bottom;
    }

    .surface {
        --surface-edge: both;
    }
}

#similar-shadow .canvas div {
    box-shadow: var(--shadow-z2);
}

#distinguishable-shadow {
    .top-bar {
        box-shadow: var(--shadow-z2);
    }

    .surface {
        box-shadow: var(--shadow-z8);
    }
}
</style>

<template>
    <Diagram :id="id" variant="illustration">
        <div class="top-bar"></div>
        <div class="surface"></div>
    </Diagram>
</template>