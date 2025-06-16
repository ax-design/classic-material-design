<script setup lang="ts">
type BaseVariant = "app-bar" | "float" | "toolbar";
type variantModifier = "prominent" | "dense" | "compact";

interface Props {
    variant?: BaseVariant | `${BaseVariant}:${variantModifier}`;
    appearance?: "filled" | "transparent";
}

const { variant, appearance = "filled" } = defineProps<Props>();
</script>

<style>
@layer components {
    .toolbar {
        flex-shrink: 0;
        position: relative;
        display: grid;
        padding-inline: calc(var(--keyline) - 12px);
        grid-template-rows: 48px;
        grid-auto-flow: column;
        grid-auto-columns: auto;
        justify-items: start;
        align-items: center;
        color: light-dark(var(--secondary-text-color), var(--primary-text-color));
        background-color: var(--medium-emphasis-surface-color);
        overflow: clip;

        &:has(.toolbar[data-variant="float"]) {
            grid-auto-flow: row;
            grid-auto-columns: unset;
            grid-template-rows: unset;
            padding-inline: 0;
        }

        &[data-appearance="transparent"] {
            background-color: transparent;
            overflow: unset;
        }

        &[data-variant^="app-bar"] {
            inset-block-start: 0;
            position: sticky;
            grid-template-rows: var(--increment);
            grid-auto-columns: auto;

            &[data-appearance="filled"] {
                --surface-edge: bottom;
                background-color: var(--primary-color, --low-emphasis-surface-color);
                box-shadow: var(--shadow-z4);

                &::after {
                    border-block-start: none;
                }
            }

            &[data-kind="prominent"] {
                align-self: start;

                &:not(:has(.toolbar[data-variant~="float"])) {
                    grid-template-columns: auto minmax(0px, 1fr);
                }
            }

            & .title {
                --type-scale: title;
                inline-size: stretch;
                margin-inline: 20px;
                line-height: 1;
                white-space: nowrap;
                text-overflow: ellipsis;
                color-scheme: var(--content-color-scheme, inherit);
                color: var(--primary-text-color);
                overflow: hidden;
            }
        }

        &[data-variant^="float"] {
            border-radius: 2px;
            box-shadow: var(--shadow-z2);

            & .input {
                margin-inline: 4px;
                color: var(--hint-text-color);
            }
        }

        & button {
            color: light-dark(var(--secondary-text-color), var(--primary-text-color));
        }
    }

    .toolbar[data-variant^="app-bar"]:has(button + .title),
    .toolbar[data-variant^="float"]:has(button + .input) {
        grid-template-columns: auto 1fr;
    }
}
</style>

<template>
    <div class="toolbar" :data-variant="variant" :data-appearance="appearance">
        <slot />
    </div>
</template>
