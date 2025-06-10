<script setup lang="ts">
interface Props {
    type?: "container" | "link";
    lines: string;
}

import StateLayer from "./StateLayer.vue";

const { type = "container" } = defineProps<Props>();
</script>

<style>
@layer components {
    .tile {
        position: relative;
        display: grid;
        grid-auto-flow: column;
        align-items: center;
        padding-inline: var(--keyline);

        & .text {
            --type-scale: body1;

            & p:first-of-type {
                --type-scale: subheading;
                color: var(--primary-text-color);
            }

            & p:nth-of-type(2) {
                color: var(--secondary-text-color);
            }
        }

        &:not(:has(button:hover)):hover {
            --hovered: true;
        }
    }

    .tile[data-lines="1"] {
        block-size: 56px;
    }

    .tile[data-lines="2"] {
        block-size: 72px;
    }

    .tile[data-lines="3"] {
        block-size: 88px;
    }
}
</style>

<template>
    <li class="tile" :data-lines="lines">
        <slot v-if="type === 'link'" />
        <div v-else class="content">
            <slot />
        </div>
        <StateLayer />
    </li>
</template>