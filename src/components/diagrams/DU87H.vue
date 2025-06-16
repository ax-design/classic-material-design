<script setup lang="ts">
interface Props {
    id: string;
}

import Calendar from "@applications/Calendar.vue";

const { id } = defineProps<Props>();
</script>

<style>
#parallax {
    & .schedule {
        inset-block-start: -34%;
    }

    &[data-playback] {
        animation-duration: 6s;
    }

    &[data-playback] .schedule {
        animation-name: viewScroll1, viewScroll2, viewScroll3;
        animation-duration: 1.25s, 1.5s, 1.5s;
        animation-delay: 0.5s, 2.25s, 4.25s;
        animation-timing-function: var(--standard-curve);
        animation-fill-mode: forwards;
    }

    &[data-playback] .illustration img {
        animation-name: imageMove1, imageMove2, imageMove3;
        animation-duration: 1.25s, 1.5s, 1.5s;
        animation-delay: 0.5s, 2.25s, 4.25s;
        animation-timing-function: var(--standard-curve);
        animation-fill-mode: forwards;
    }
}

@keyframes viewScroll1 {
    100% {
        inset-block-start: -48%;
    }
}

@keyframes viewScroll2 {
    100% {
        inset-block-start: -2%;
    }
}

@keyframes viewScroll3 {
    100% {
        inset-block-start: -34%;
    }
}

@keyframes imageMove1 {
    100% {
        translate: 0% 7%;
    }
}

@keyframes imageMove2 {
    100% {
        translate: 0% -24%;
    }
}

@keyframes imageMove3 {
    100% {
        translate: 0% 0%;
    }
}
</style>

<template>
    <Calendar :id="id" page="schedule" :animation="true" />
</template>