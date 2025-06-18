<script setup lang="ts">
interface Props {
    id: string;
}

const { id } = defineProps<Props>();
</script>

<style>
#language {
    block-size: 360px;
    background-color: #1f4388;

    @media (width < 920px) {
        block-size: 480px;
    }

    figure:has(&) {
        grid-column-end: var(--medium-content-span);
    }
}
</style>

<template>
    <picture :id="id" class="diagram" data-variant="illustration">
        <source media="(max-width:920px)" srcset="/material-design/language-vertical.svg" />
        <img src="/material-design/language.svg" />
    </picture>
</template>
