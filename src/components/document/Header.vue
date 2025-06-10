<script setup lang="ts">
import { onMounted, nextTick, ref } from "vue";

interface tocItem {
    id: string;
    title: string;
}

const articles = ref<tocItem[]>([]);

onMounted(async () => {
    await nextTick();

    const articleNodes = document.querySelectorAll("article > h3");

    if (articleNodes.length === 0) {
        return;
    }

    articles.value = Array.from(articleNodes).map((node) => ({
        id: node.getAttribute("id")!,
        title: node.textContent!,
    }));
});
</script>

<style>
header {
    grid-column: 2 / span var(--content-columns);
    display: flex;
    flex-direction: column;

    & p {
        --type-scale: title;
        max-inline-size: 48ic;
        margin-block-end: var(--increment);
        font-weight: 400;
    }

    & video {
        margin-block-end: var(--content-column-gap);
    }

    @media (width >=1616px) {
        .toolbar+& {
            margin-block-start: 20px;
        }
    }
}

nav {
    margin-block: var(--keyline);
    padding-inline-start: 24px;
    color: var(--primary-color);
    border-inline-start: 4px solid;
    user-select: none;

    & h3 {
        padding-block-end: 1em;
        color: var(--secondary-text-color);
    }

    & a {
        --type-scale: title;
        font-weight: 400;
        line-height: 2em;
    }

    & a:is(:hover, :focus-visible) {
        text-decoration: underline;
        text-underline-offset: 0.2em;
    }
}
</style>

<template>
    <header>
        <h2>{{ ($route.name as string)?.split("：")[1] }}</h2>
        <slot></slot>
        <nav>
            <h3>索引</h3>
            <ul>
                <li v-for="article in articles">
                    <a :href="`#${article.id}`">{{ article.title }}</a>
                </li>
            </ul>
        </nav>
    </header>
</template>