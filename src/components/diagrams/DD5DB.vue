<script setup lang="ts">
interface Props {
    id: string;
}

const { id } = defineProps<Props>();
</script>

<style>
#material-is-metaphor {
    background-color: #b2dfdb;

    figure:has(&) {
        aspect-ratio: 1/1;
    }
}
</style>

<template>
    <picture :id="id" class="diagram">
        <img src="/material-design/material-is-metaphor.svg" />
    </picture>
</template>