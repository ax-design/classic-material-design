<script setup lang="ts">
interface Props {
    direction?: "horizontal" | "vertical";
}

const { direction = "horizontal" } = defineProps<Props>();
</script>

<template>
    <hr class="divider" :data-direction="direction" />
</template>

<style>
@layer components {
    :root {
        --divider-color: light-dark(rgb(0 0 0 / 0.12), rgb(255 255 255 / 0.12));
    }

    .divider {
        inset-block-end: 1px;
        position: relative;
        block-size: 1px;
        box-sizing: border-box;
        margin-block-end: -1px;
        background-color: var(--divider-color);

        &[data-direction="vertical"] {
            writing-mode: vertical-lr;
        }
    }
}
</style>
