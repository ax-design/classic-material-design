<script setup lang="ts">
interface Props {
    id?: string;
    variant?: string;
}

const { id, variant = "flat" } = defineProps<Props>();
</script>

<template>
    <aside :id class="sheet" :data-variant="variant" popover>
        <slot />
    </aside>
</template>

<style>
@layer components {
    .sheet {
        inset-block-start: 0;
        position: sticky;
        inline-size: calc(100% - var(--increment));
        max-inline-size: 320px;
        block-size: 100cqb;
        background-color: var(--high-emphasis-surface-color);
        box-shadow: var(--shadow-z16);
    }

    .sheet[data-variant="drawer"] {
        inset-block-start: 0;
        position: sticky;
        inline-size: calc(100% - var(--increment));
        max-inline-size: 320px;
        display: flex;
        flex-direction: column;
        background-color: var(--high-emphasis-surface-color);
        box-shadow: var(--shadow-z16);
        overflow: auto;
        overscroll-behavior: contain;

        & .header {
            position: relative;
            aspect-ratio: 16 / 9;
            flex-shrink: 0;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            padding-block-start: calc(var(--status-bar-block-size) + var(--keyline));
            padding-block-end: 8px;
            box-sizing: border-box;

            & .thumbnail[variant="avatar"] {
                inline-size: 64px;
                margin-inline: var(--keyline);
            }

            & .tile {
                block-size: 56px;
                grid-template-columns: 1fr min-content;
                padding-inline-end: calc(var(--keyline) - 12px);

                & .meta {
                    color: var(--primary-text-color);
                }
            }

            & .scrim {
                inset-block-end: 0;
                block-size: calc(var(--increment) + var(--keyline));
                rotate: 180deg;
            }
        }

        &>ul {
            margin-block: 8px;

            & li:not(.divider) {
                column-gap: var(--keyline);
                padding-inline: var(--keyline);
                color: var(--primary-text-color);
            }

            & li:has(> cmd-icon) {
                grid-template-columns: min-content 1fr;
            }

            & cmd-icon:first-of-type {
                margin-inline-end: 8px;
                color: var(--secondary-text-color);
            }
        }

        & li {
            --states-base-color: currentColor;
            color: if(style(--selected: true): var(--primary-color); else: var(--primary-text-color));
            line-height: 1;
        }
    }
}
</style>