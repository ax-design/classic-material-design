<script setup lang="ts">
interface Props {
    type?: "container" | "link";
    lines: string;
    density?: "compact" | "normal";
}

import StateLayer from "./StateLayer.vue";

const { type = "container", density = "normal" } = defineProps<Props>();
</script>

<style>
@layer components {
    .tile {
        position: relative;
        display: grid;
        grid-auto-flow: column;
        align-items: center;
        padding-inline: var(--keyline);
        color-scheme: var(--content-color-scheme, inherit);

        &:has(div:last-of-type.switch) {
            padding-inline-end: calc(var(--keyline) - 8px);
        }

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

        &[data-density="compact"] {
            block-size: 48px;
        }
    }

    .tile[data-lines="2"] {
        block-size: 72px;

        &[data-density="compact"] {
            block-size: 64px;
        }
    }

    .tile[data-lines="3"] {
        block-size: 88px;

        &[data-density="compact"] {
            block-size: 80px;
        }
    }

    .subheader {
        block-size: 48px;
        align-content: center;
        padding-inline: var(--keyline);
        line-height: 1;
        white-space: nowrap;
        color: var(--secondary-text-color);
        overflow: hidden;
    }
}
</style>

<template>
    <li class="tile" :data-lines="lines" :data-density="density">
        <slot v-if="type === 'link'" />
        <div v-else class="content">
            <slot />
        </div>
        <StateLayer />
    </li>
</template>
