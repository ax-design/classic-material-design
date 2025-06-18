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
#system {
    figure:has(&) {
        grid-column-end: var(--medium-content-span);
    }

    & .canvas {
        height: 360px;
        display: flex;
        align-items: stretch;
        gap: 16px;
        padding: 60px;
        background-color: light-dark(var(--cyan-300), var(--grey-950));
    }

    & .surface {
        --surface-edge: both;
        position: relative;
        background-color: var(--medium-emphasis-surface-color);
        border-radius: 2px;
        box-shadow: var(--shadow-z2);

        &:nth-child(1) {
            inline-size: 24px;
        }

        &:nth-child(2) {
            inline-size: 48px;
        }

        &:nth-child(3) {
            inline-size: 80px;
        }

        &:nth-child(4) {
            inline-size: 136px;
        }

        &:nth-child(5) {
            flex-grow: 1;
        }
    }

    @media (width < 920px) {
        & .canvas {
            height: 480px;
            padding: 40px;
            writing-mode: vertical-lr;
        }

        & .surface {
            &:nth-child(4) {
                inline-size: auto;
                flex-grow: 1;
            }

            &:nth-child(5) {
                display: none;
            }
        }
    }
}
</style>

<template>
    <Diagram variant="illustration">
        <div class="surface"></div>
        <div class="surface"></div>
        <div class="surface"></div>
        <div class="surface"></div>
        <div class="surface"></div>
    </Diagram>
</template>