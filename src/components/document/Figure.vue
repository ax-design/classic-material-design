<script setup lang="ts">

</script>

<style>
figure {
    container-name: figure;
    container-type: inline-size;

    article[data-direction="horizontal"] &:has(p) {
        margin-block-end: var(--keyline);
    }

    article[data-direction="vertical"] & {
        margin-block-end: 2.5em;
    }
}

@media (width < 392px) {
    figure {
        inline-size: calc(100vw - 2 * var(--keyline));
    }
}
</style>

<template>
    <figure>
        <slot />
    </figure>
</template>