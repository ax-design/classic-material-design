<script setup lang="ts">
interface Props {
    id: string;
}

import { provide } from "vue";
import Contacts from "@applications/Contacts.vue";

const { id } = defineProps<Props>();
provide("id", id);
</script>

<template>
    <Contacts page="detailed" />
</template>