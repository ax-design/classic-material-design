<script setup lang="ts">
interface Props {
    variant: "fill" | "gradient";
    anchor?: "top" | "bottom";
}

const { variant, anchor } = defineProps<Props>();
</script>

<style>
@layer components {
    .scrim {
        position: absolute;
        opacity: 0.4;
        pointer-events: none;

        &[data-variant="fill"] {
            inset: 0;
            background-color: black;
        }

        &[data-variant="gradient"] {
            inset-inline: 0;
            block-size: stretch;
            max-block-size: calc(3 * var(--increment));
            background: linear-gradient(rgb(0 0 0 / 1) 0%, rgb(0 0 0 / 0.5) calc(1 / 3 * 100%), rgb(0 0 0 / 0) 100%);

            &[data-anchor="top"] {
                inset-block-start: 0;
            }
        }
    }

    ::backdrop {
        background-color: rgb(0 0 0 / 0.4);
        pointer-events: none;
    }
}
</style>

<template>
    <div class="scrim" :data-variant="variant" :data-anchor="anchor"></div>
</template>