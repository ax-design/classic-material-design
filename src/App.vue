<script setup lang="ts">
import { computed } from "vue";
import { useSeoMeta } from "@unhead/vue";
import { useRoute, useRouter } from "vue-router";
import { getRouteNameSegements } from "@scripts/utils";
import Aside from "@document/Aside.vue";
import Footer from "@document/Footer.vue";
import Button from "@material/Button.vue";
import Divider from "@material/Divider.vue";
import Icon from "@material/Icon.vue";
import Toolbar from "@material/Toolbar.vue";
import "./styles/document.css";

const route = useRoute();
const routes = useRouter().options.routes.slice(0, -1);
const { chapter, page } = getRouteNameSegements(route.name as string);

useSeoMeta({
    title: `质感设计：${page}`,
    ogType: "article",
});

const isFirstPageInChapter = computed(() => {
    const currentIndex = routes.findIndex(r => r.name === route.name);
    return currentIndex === 0 || currentIndex > 0 && !(routes[currentIndex - 1].name as string).startsWith(chapter);
});

const theme = computed(() => {
    const currentPageEntry = routes.find(r => r.name === route.name);
    if (!currentPageEntry) {
        return "material-design";
    }
    const path = currentPageEntry.alias as string || currentPageEntry.path;
    return path.split("/")[1];
})

</script>

<template>
    <Aside :data-theme="theme"></Aside>
    <Divider direction="vertical" />
    <main :data-theme="theme">
        <Toolbar :variant="`app-bar${isFirstPageInChapter ? ':prominent' : ''}`">
            <Button commandfor="cmd-drawer" command="show-popover" aria-label="打开目录">
                <Icon name="menu" />
            </Button>
            <h1 class="title" v-if="route.path === '/' || !page">质感设计</h1>
            <h1 class="title" v-else-if="isFirstPageInChapter">{{ chapter }}</h1>
            <h1 class="title" v-else><span>{{ chapter }}</span><span>–</span>{{ page }}</h1>
            <Button disabled aria-label="搜索">
                <Icon name="search" />
            </Button>
        </Toolbar>
        <router-view />
        <Footer v-if="page"></Footer>
    </main>
</template>