<script setup lang="ts">
interface Props {
    id: string;
}

import Contacts from "@applications/Contacts.vue";

const { id } = defineProps<Props>();
</script>

<template>
    <Contacts :id="id" page="detailed" />
</template>