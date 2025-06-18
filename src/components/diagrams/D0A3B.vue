<script setup lang="ts">
interface Props {
    id: string;
}

import { provide } from "vue";

const { id } = defineProps<Props>();
provide("id", id);
</script>

<style>
#motion-provides-meaning {
    figure:has(&) {
        aspect-ratio: 1/1;
    }

    & .canvas {
        background-color: #8e24aa;
    }
}
</style>

<template>
    <picture class="diagram" data-variant="illustration">
        <img src="/material-design/motion-provides-meaning.svg" />
    </picture>
</template>