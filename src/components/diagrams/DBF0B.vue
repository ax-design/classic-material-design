<script setup lang="ts">
interface Props {
    id: string;
}

const { id } = defineProps<Props>();
</script>

<style>
#inconsistent-surfaces-thickness {
    block-size: auto;
    aspect-ratio: 1 / 1;
}
</style>

<template>
    <picture :id="id" class="diagram">
        <img src="/material-design/whatismaterial-materialproperties-physicalproperties-thickness-02-no.png" />
    </picture>
</template>