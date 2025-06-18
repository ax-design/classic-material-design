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
#physical-presence,
#virtual-presence {
    & .canvas {
        aspect-ratio: 1/1;
        display: grid;
        place-items: center;
    }

    & .surface {
        --surface-edge: both;
        position: absolute;
        inline-size: 200px;
        aspect-ratio: 1/1;
        background-color: var(--high-emphasis-surface-color);
        border-radius: 2px;
    }

    & .surface:first-child {
        transform: translate(24px, 24px);
    }

    & .surface:last-child {
        transform: translate(-24px, -24px);
    }
}

#physical-presence {
    & .surface:first-child {
        box-shadow: var(--shadow-z2);
    }

    & .surface:last-child {
        box-shadow: var(--shadow-z8);
    }
}

#virtual-presence {
    & .canvas {
        filter: var(--drop-shadow-z2);
    }

    & .surface:last-child {
        &::before {
            content: "";
            inset: 0;
            position: absolute;
            outline: 1px solid var(--divider-color);
            outline-offset: -0.5px;
            clip-path: inset(48px -1px -1px 48px);
        }

        &::after {
            clip-path: polygon(0 0, 100% 0, 100% 48px, 48px 48px, 48px 100%, 0 100%, 0 48px);
        }
    }
}
</style>

<template>
    <Diagram variant="illustration">
        <div class="surface"></div>
        <div class="surface"></div>
    </Diagram>
    <slot />
</template>