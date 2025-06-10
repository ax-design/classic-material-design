<script setup lang="ts">
interface Props {
    measure?: string;
}

const { measure } = defineProps<Props>();
</script>

<template>
    <div class="paragraphs" :data-measure="measure">
        <slot />
    </div>
</template>

<style>
.paragraphs {
    grid-column-start: 1;

    &[data-measure="medium"] {
        grid-column-end: var(--medium-content-span);
    }

    & ul {
        padding-inline-start: 2em;

        & li {
            list-style-type: disc;
        }
    }
}
</style>