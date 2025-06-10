<script setup lang="ts">
interface Props {
    id: string;
}

const { id } = defineProps<Props>();
</script>

<style>
#bold-graphic-intentional {
    background-color: #e91e63;

    figure:has(&) {
        aspect-ratio: 1/1;
    }
}
</style>

<template>
    <picture :id="id" class="diagram">
        <img src="/material-design/bold-graphic-intentional.svg" />
    </picture>
</template>