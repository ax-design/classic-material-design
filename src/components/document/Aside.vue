<script setup lang="ts">
import { computed } from "vue";
import { useRouter, useRoute } from "vue-router";
import { getRouteNameSegements } from "@scripts/utils";
import Divider from "@material/Divider.vue";
import Sheet from "@material/Sheet.vue";
import StateLayer from "@material/StateLayer.vue";
import Tile from "@material/Tile.vue";

const router = useRouter();
const routes = router.options.routes.slice(0, -1);
const currentRoute = getRouteNameSegements(useRoute().name as string);

const isCurrentPage = (page: string) => page === currentRoute.page;

const sitemap = computed(() => {
    const map = new Map<string, string[]>();

    routes.forEach((route) => {
        const routeName = route.name as string;
        const { chapter, page } = getRouteNameSegements(routeName);

        if (!map.has(chapter)) {
            map.set(chapter, []);
        }

        map.get(chapter)?.push(page);
    });

    return map;
});

const enableMap = computed(() => {
    const chapters = new Array<string>();
    const pages = new Array<string>();

    routes.forEach((route) => {
        if (route.props === false) return;
        const routeName = route.name as string;
        const { chapter, page } = getRouteNameSegements(routeName);

        if (!chapters.includes(chapter)) {
            chapters.push(chapter);
        }

        pages.push(page);
    });

    return { chapters, pages };
});
</script>

<style>
#cmd-drawer {
    z-index: 16;
    flex-shrink: 0;
    inline-size: 256px;
    user-select: none;

    & figure {
        flex-shrink: 0;
        block-size: var(--increment);
        display: flex;
        align-items: center;
        column-gap: var(--keyline);
        padding-inline: var(--keyline);

        & svg {
            inline-size: 1.5rem;

            & circle {
                fill: light-dark(#212121, #747474);
            }
        }
    }

    & figcaption {
        --type-scale: subheading;
        font-weight: 500;
        font-family: "Roboto Mono", monospace;
    }

    & details {
        overflow: clip;
        flex-shrink: 0;

        &::details-content {
            block-size: 0px;
            transition-property: block-size, content-visibility;
            transition-duration: 250ms;
            transition-timing-function: var(--standard-curve);
            transition-behavior: allow-discrete;
        }

        &[open]::details-content {
            block-size: auto;
            transition-duration: 300ms;
        }

        &:first-of-type {
            margin-block-start: 8px;
        }
    }

    & summary {
        --type-scale: body2;
        position: relative;
        block-size: 48px;
        display: flex;
        align-items: center;
        padding-inline: var(--keyline);
        cursor: pointer;

        &[inert] {
            color: var(--hint-text-color);
        }

        &:hover {
            --hovered: true;
        }
    }

    & li {
        --type-scale: if(style(--selected: true): body2);
        block-size: 36px;
        padding: 0px;

        &[inert] {
            color: var(--hint-text-color);
        }

        & :is(a, p) {
            block-size: stretch;
            display: flex;
            align-items: center;
            padding-inline-start: calc(2 * var(--keyline));
            font-size: 0.8125rem;
        }
    }
}
</style>

<template>
    <Sheet id="cmd-drawer" variant="drawer">
        <figure>
            <svg viewBox="0 0 24 24">
                <circle fill="#212121" cx="12" cy="12" r="12"></circle>
                <polygon fill="#BDBDBD" points="12,0 24,12 12,24 0,12" transform-origin="center" transform="rotate(45)"></polygon>
                <polygon fill="#FFFFFF" points="12,0 18,18 0,12" transform-origin="center" transform="rotate(45)"></polygon>
            </svg>
            <figcaption lang="en">MATERIAL DESIGN</figcaption>
        </figure>

        <Divider />

        <details v-for="[chapter, chapterContent] in sitemap" :open="chapter === currentRoute.chapter">
            <summary :inert="!enableMap.chapters.includes(chapter)">
                <div class="content">{{ chapter }}</div>
                <StateLayer />
            </summary>
            <ul v-if="enableMap.chapters.includes(chapter)">
                <Tile v-for="page in chapterContent"
                    type="link"
                    lines="1"
                    :style="isCurrentPage(page) ? { '--selected': 'true' } : undefined"
                    :inert="!enableMap.pages.includes(page)">
                    <a
                        v-if="enableMap.pages.includes(page)"
                        :href="router.resolve({ name: `${chapter}：${page}` }).href"
                        :aria-current="isCurrentPage(page) ? 'page' : undefined">{{ page }}</a>
                    <p v-else>{{ page }}</p>
                </Tile>
            </ul>
        </details>
    </Sheet>
</template>