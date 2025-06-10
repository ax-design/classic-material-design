<script setup lang="ts">
interface Props {
    id: string;
}

import Diagram from "@document/Diagram.vue";

const { id } = defineProps<Props>();
</script>

<style>
#absolute-elevation {
    block-size: 480px;

    figure:has(&) {
        grid-column-end: var(--medium-content-span);
    }

    & picture {
        flex-basis: 100%;
    }

    & .canvas {
        display: flex;
        padding-inline: 20px;

        @media (width < 920px) {
            flex-direction: column;
            padding-inline: unset;
            padding-block-end: 40px;
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
    <Diagram :id="id" variant="illustration">
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