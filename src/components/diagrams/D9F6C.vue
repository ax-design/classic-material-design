<script setup lang="ts">
interface Props {
    id: string;
}

const { id } = defineProps<Props>();
</script>

<style>
#consistent-surfaces-thickness {
    block-size: auto;
    aspect-ratio: 1 / 1;
}
</style>

<template>
    <picture :id="id" class="diagram">
        <img src="/material-design/whatismaterial-materialproperties-physicalproperties-thickness-01-yes.png" />
    </picture>
</template>