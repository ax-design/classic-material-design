<script setup lang="ts">

</script>

<style>
article[data-direction="horizontal"] figure:has(p) {
    margin-block-end: var(--keyline);
}

article[data-direction="vertical"] figure {
    margin-block-end: 2.5em;
}

figure[screen~="tablet"] {
    grid-column-end: var(--medium-content-span);
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