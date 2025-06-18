<script setup lang="ts">
interface Props {
    id: string;
}

import { provide } from "vue";
import Diagram from "@document/Diagram.vue";

const { id } = defineProps<Props>();
provide("id", id);
</script>

<style>
figure:has(#motion-virtual-presence) {
    grid-column-start: max(1, calc(var(--content-columns) - 1));
    grid-column-end: var(--medium-content-span);
}
</style>

<template>
    <Diagram variant="video">
        <video width="720" height="360" loop>
            <source src="/material-design/whatismaterial-properties-physical-07-xhdpi-009.mp4" type="video/mp4" />
        </video>
    </Diagram>
</template>