<script setup lang="ts">
interface Props {
    id: string;
}

const { id } = defineProps<Props>();
</script>

<style>
#dimensions {
    figure:has(&) {
        grid-column-end: var(--medium-content-span);
    }
}
</style>

<template>
    <picture :id="id" class="diagram" data-variant="illustration">
        <img src="/material-design/whatismaterial-environment-3d.png" />
    </picture>
</template>