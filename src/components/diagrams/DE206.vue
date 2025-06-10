<script setup lang="ts">
interface Props {
    id: string;
}

import Diagram from "@document/Diagram.vue";

const { id } = defineProps<Props>();
</script>

<style>
#key-light-shadow,
#ambient-light-shadow,
#combined-light-shadow {
    aspect-ratio: 1/1;

    & .canvas {
        display: grid;
        place-items: center;
    }

    & .surface {
        position: relative;
        inline-size: 168px;
        aspect-ratio: 1/1;
        background-color: var(--high-emphasis-surface-color);
        border-radius: 2px;
    }
}

#key-light-shadow {
    figure:has(&) {
        grid-column-start: 1;
    }

    & .surface {
        --surface-edge: both;
        box-shadow:
            0px 6px 10px 0px rgb(0 0 0 / 0.14),
            0px 1px 18px 0px rgb(0 0 0 / 0.12);
    }
}

#ambient-light-shadow .surface {
    box-shadow: 0px 3px 5px -1px rgb(0 0 0 / 0.2);

    &::after {
        display: none;
    }
}

#combined-light-shadow .surface {
    --surface-edge: both;
    box-shadow: var(--shadow-z6);
}
</style>

<template>
    <Diagram :id="id" variant="illustration">
        <div class="surface"></div>
    </Diagram>
</template>