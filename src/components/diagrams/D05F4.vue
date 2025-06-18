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
#relative-elevation {
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
        display: grid;
        place-items: center;
    }

    & .wrapper>.surface {
        position: relative;
        inline-size: 250px;
        block-size: 324px;
        border-radius: 2px;
        display: flex;
        flex-direction: column-reverse;
        align-items: end;
        background-color: var(--high-emphasis-surface-color);
        box-shadow: var(--shadow-z16);

        @media (width < 920px) {
            inline-size: 264px;
            block-size: 160px;
        }

        &>.surface {
            position: relative;
            inline-size: 80px;
            block-size: 36px;
            border-radius: 2px;
            margin: 16px;
            background-color: var(--blue-500);
            box-shadow: var(--shadow-z2);
        }
    }
}
</style>

<template>
    <Diagram variant="illustration">
        <div class="wrapper">
            <div class="surface">
                <div class="surface"></div>
            </div>
        </div>
        <picture>
            <source media="(max-width:920px)" srcset="/material-design/relative-elevation-vertical.svg" />
            <img src="/material-design/relative-elevation.svg" />
        </picture>
    </Diagram>
</template>