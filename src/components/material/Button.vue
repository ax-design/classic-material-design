<script setup lang="ts">
import StateLayer from "./StateLayer.vue";

interface Props {
    variant?: "floating" | "raised" | "flat";
}

const { variant = "flat" } = defineProps<Props>();
</script>

<template>
    <button
        class="button"
        :data-variant="variant"
        type="button">

        <div class="content">
            <slot />
        </div>
        <StateLayer />

    </button>
</template>

<style>
@layer components {
    .button {
        position: relative;
        font-family: inherit;
        text-decoration: none;
        color: var(--secondary-text-color);
        white-space: nowrap;
        display: inline-grid;
        grid-auto-flow: column;
        justify-content: center;
        place-items: center;
        border: none;
        color-scheme: var(--content-color-scheme, inherit);
        background-color: transparent;
        cursor: pointer;

        &[data-variant="flat"]:has(.content .icon:only-of-type) {
            --unbounded: true;
            padding: 12px;
        }

        &:not(:has(.content .icon:only-of-type)) {
            --type-scale: body2;
            --states-base-color: currentColor;
            min-inline-size: 64px;
            block-size: if(style(--unbounded: true): auto; else: 36px);
            padding: 0 8px;
            line-height: 1;
            border-radius: 2px;
            overflow: if(style(--unbounded: true): unset; else: clip);
        }

        &[data-variant="raised"] {
            --surface-edge: both;
            color: var(--primary-text-color);
            background-color: var(--secondary-color, var(--primary-color));
            box-shadow: var(--shadow-z2);
        }

        &[data-variant~="floating"] {
            --surface-edge: both;
            position: absolute;
            inline-size: 56px;
            aspect-ratio: 1/1;
            border-radius: 50%;
            color: var(--primary-text-color);
            background-color: var(--secondary-color, var(--high-emphasis-surface-color));
            box-shadow: var(--shadow-z8);
        }

        & :where(p, span, h1) {
            line-height: 1;
        }

        &:not(:disabled) {
            &:hover {
                --hovered: true;
            }
        }

        &:disabled {
            color: var(--hint-text-color);
        }
    }
}
</style>