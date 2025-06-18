<script setup lang="ts">
interface Props {
    id: string;
}

import Diagram from "@document/Diagram.vue";

const { id } = defineProps<Props>();
</script>

<style>
figure:has(#material-display) {
    grid-column-end: var(--medium-content-span);
}
</style>

<template>
    <Diagram :id="id" variant="video">
        <video loop>
        <video width="720" height="360" loop>
            <source src="/material-design/whatismaterial-materialprop-physicalprop-inkdisplay-xhdpi-006.mp4" type="video/mp4" />
        </video>
    </Diagram>
</template>