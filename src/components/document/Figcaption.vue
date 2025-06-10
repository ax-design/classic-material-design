<script setup lang="ts">
interface Props {
    sign?: "do" | "dont" | "caution";
}

import { computed } from "vue";

const { sign } = defineProps<Props>();

const text = computed(() => {
    switch (sign) {
        case "do":
            return "正确";
        case "dont":
            return "错误";
        case "caution":
            return "注意";
        default:
            return "？";
    }
});
</script>

<style>
main figcaption {
    display: flex;
    flex-direction: column;
    color: var(--secondary-text-color-alt);
    user-select: text;

    & :is(ul, ol) {
        margin-block-start: 3px;
    }

    &:not(:has(.sign)) :is(p, ul, ol):first-child {
        margin-block-start: 1em;
    }
}

.sign {
    --type-scale: body2;
    margin-block-start: 16px;
    padding-block-start: 1em;
    border-block-start: 16px solid;

    &[data-variant="do"] {
        border-color: var(--green-500);
        color: var(--green-800);
    }

    &[data-variant="dont"] {
        border-color: var(--red-700);
        color: var(--red-700);
    }

    &[data-variant="caution"] {
        border-color: var(--yellow-800);
        color: var(--yellow-900);
    }

    &+p {
        color: var(--primary-text-color);
    }

    @media (prefers-color-scheme: dark) {
        &[data-variant="do"] {
            color: var(--green-400);
        }

        &[data-variant="dont"] {
            color: var(--red-500);
        }
    }
}
</style>

<template>
    <figcaption>
        <p v-if="sign" class="sign" :data-variant="sign">{{ text }}</p>
        <slot />
    </figcaption>
</template>