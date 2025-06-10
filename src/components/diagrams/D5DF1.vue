<script setup lang="ts">
interface Props {
    id: string;
}

import Diagram from "@document/Diagram.vue";

const { id } = defineProps<Props>();
</script>

<style>
#motion-virtual-presence {
    background-color: #8e24aa;

    figure:has(&) {
        grid-column-start: max(1, calc(var(--content-columns) - 1));
        grid-column-end: var(--medium-content-span);
    }
}
</style>

<template>
    <Diagram :id="id" variant="video">
        <video loop>
            <source src="/material-design/whatismaterial-properties-physical-07-xhdpi-009.mp4" type="video/mp4" />
        </video>
    </Diagram>
</template>