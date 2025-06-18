<script setup lang="ts">
interface Props {
    id: string;
}

import { provide } from "vue";
import Diagram from "@document/Diagram.vue";

const { id } = defineProps<Props>();
provide("id", id);
</script>

<style>
#obstructed-input,
#input-pass-through {
    & .canvas {
        aspect-ratio: 1/1;
        flex-direction: column;
        justify-content: start;
        align-items: start;
        background-color: var(--medium-emphasis-surface-color);
    }

    & .top-bar {
        --surface-edge: bottom;
        position: relative;
        inline-size: 100%;
        block-size: 56px;
        background-color: var(--low-emphasis-surface-color);
        box-shadow: var(--shadow-z2);
    }

    & .flyout {
        --surface-edge: both;
        inset-block-start: 8px;
        inset-inline-end: 8px;
        position: absolute;
        inline-size: 168px;
        block-size: 256px;
        background-color: var(--high-emphasis-surface-color);
        border-radius: 2px;
        box-shadow: var(--shadow-z8);
    }

    & .hint {
        position: relative;
        inline-size: 100%;
        background-color: var(--states-base-color);
        opacity: 0.12;

        .surface & {
            inset-block-start: 152px;
            block-size: 48px;
        }
    }

    & .touch {
        position: absolute;
        inset-block-start: 184px;
        inset-inline-end: 168px;
        translate: 50% -50%;
    }
}

#input-pass-through .canvas>.hint {
    inset-block-start: 120px;
    block-size: 56px;
}
</style>

<template>
    <Diagram variant="illustration">
        <div class="top-bar surface"></div>
        <div v-if="id === 'input-pass-through'" class="hint"></div>
        <div class="flyout surface">
            <div class="hint"></div>
        </div>
        <div class="touch"></div>
    </Diagram>
    <slot />
</template>