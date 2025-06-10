<script setup lang="ts">
import { computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import Icon from "@material/Icon.vue";
import StateLayer from "@material/StateLayer.vue";

const route = useRoute();
const routes = useRouter().options.routes.slice(0, -1);
const router = useRouter();

const currentIndex = computed(() =>
    routes.findIndex(r => r.name === route.name)
);

const previousPage = computed(() => {
    let index = currentIndex.value - 1;
    while (index >= 0) {
        const prevRoute = routes[index];
        if (prevRoute.props !== false) {
            const theme = (prevRoute.alias as string || prevRoute.path).split("/")[1];
            return { name: prevRoute.name as string, theme: theme };
        }
        index--;
    }
    return undefined;
});

const nextPage = computed(() => {
    let index = currentIndex.value + 1;
    while (index < routes.length) {
        const nextRoute = routes[index];
        if (nextRoute.props !== false) {
            const theme = (nextRoute.alias as string || nextRoute.path).split("/")[1];
            return { name: nextRoute.name as string, theme: theme };
        }
        index++;
    }
    return undefined;
});



</script>

<style>
footer {
    grid-column: 1 / -1;
    position: relative;
    block-size: 96px;
    display: grid;
    grid-template-columns: 1fr;
    grid-auto-flow: column;
    grid-auto-columns: 1fr;
    user-select: none;

    & p {
        position: relative;
        background-color: var(--primary-color);

        &:hover {
            --hovered: true;
        }

        &:only-child a {
            padding-inline-end: 50%;
        }
    }

    & a {
        block-size: 100%;
        display: grid;
        grid-template-columns: 1fr calc((var(--content-unit-inline-size) * var(--content-columns) + var(--content-column-gap) * (var(--content-columns) - 1)) / 2);
        column-gap: var(--keyline);
        align-content: center;
        color-scheme: var(--content-color-scheme, inherit);
    }

    & span {
        grid-column-start: 2;

        &:first-of-type {
            --type-scale: subheading;
            color: var(--secondary-text-color);
        }

        &:last-of-type {
            --type-scale: title;
            color: var(--primary-text-color);
        }
    }

    & .icon {
        grid-row-start: 2;
        justify-self: end;
        margin-block-start: 2px;
        color: var(--primary-text-color);
    }
}

@media (width < 392px) {
    footer {
        grid-auto-columns: 3fr;
    }

    footer:has(p:nth-of-type(2)) p:first-of-type a span {
        opacity: 0;
        text-wrap: nowrap;
        overflow: hidden;
    }

    footer a {
        grid-template-columns: min-content auto;
        padding-inline: var(--keyline);
    }
}
</style>

<template>
    <footer>
        <p v-if="previousPage" :data-theme="previousPage.theme" style="direction: ltr;">
            <a :href="router.resolve({ name: previousPage.name }).href">
                <Icon name="arrow_back" />
                <span>上一节</span>
                <span>{{ previousPage.name.split("：")[1] }}</span>
            </a>
            <StateLayer />
        </p>

        <p v-if="nextPage" :data-theme="nextPage.theme" style="direction: rtl;">
            <a :href="router.resolve({ name: nextPage.name }).href">
                <Icon name="arrow_forward" />
                <span>下一节</span>
                <span>{{ nextPage.name.split("：")[1] }}</span>
            </a>
            <StateLayer />
        </p>
    </footer>
</template>