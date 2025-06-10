<script setup lang="ts">
interface Props {
    id: string;
}

const { id } = defineProps<Props>();
</script>

<style>
#motion-provides-meaning {
    background-color: #8e24aa;

    figure:has(&) {
        aspect-ratio: 1/1;
    }
}
</style>

<template>
    <picture :id="id" class="diagram" data-variant="illustration">
        <img src="/material-design/motion-provides-meaning.svg" />
    </picture>
</template>