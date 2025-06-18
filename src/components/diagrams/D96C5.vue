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
#absolute-elevation {
    figure:has(&) {
        grid-column-end: var(--medium-content-span);
    }

    & picture {
        flex-basis: 100%;
    }

    & .canvas {
        block-size: 480px;
        display: flex;
        padding-inline: 20px;

        @media (width < 920px) {
            flex-direction: column;
            padding-inline: 0px;
        }
    }

    & .wrapper {
        flex-basis: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 24px;

        @media (width < 920px) {
            flex-direction: row;
        }
    }

    & .surface {
        position: relative;
        inline-size: 200px;
        block-size: 150px;
        border-radius: 2px;
        background-color: var(--high-emphasis-surface-color);

        @media (width < 920px) {
            inline-size: 120px;
            block-size: 120px;
        }

        &:first-of-type {
            box-shadow: var(--shadow-z8);
        }

        &:last-of-type {
            box-shadow: var(--shadow-z2);
        }
    }
}
</style>

<template>
    <Diagram variant="illustration">
        <div class="wrapper">
            <div class="surface"></div>
            <div class="surface"></div>
        </div>
        <picture>
            <source media="(max-width:920px)" srcset="/material-design/absolute-elevation-vertical.svg" />
            <img src="/material-design/absolute-elevation.svg" />
        </picture>
    </Diagram>
</template>
