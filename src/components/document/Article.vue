<script setup lang="ts">
interface Props {
    direction?: "horizontal" | "vertical";
}

const { direction = "horizontal" } = defineProps<Props>();

</script>

<style>
article {
    grid-column: 2 / span var(--content-columns);
    display: grid;
    grid-template-columns: subgrid;
    gap: var(--content-column-gap);
    align-items: start;
    margin-block-end: var(--increment);

    & h3 {
        --type-scale: headline;
        color: var(--primary-color);
        grid-column: 1 / -1;
        scroll-margin-block-start: calc(2 * var(--increment));
    }
}
</style>

<template>
    <article :data-direction="direction">
        <slot />
    </article>
</template>