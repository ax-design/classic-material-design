<script setup lang="ts">
interface Props {
    appearance?: "plain" | "outlined";
}

const { appearance = "plain" } = defineProps<Props>();
</script>

<style>
@layer components {
    .thumbnail {
        position: relative;
        inline-size: 40px;
        aspect-ratio: 1 / 1;
        object-fit: cover;
    }

    .thumbnail[data-appearance="outlined"] {
        color-scheme: initial;
        outline: 1px solid var(--divider-color);
        outline-offset: -1px;
    }
}
</style>

<template>
    <img class="thumbnail" :data-appearance="appearance" />
</template>
