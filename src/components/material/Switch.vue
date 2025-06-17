<script setup lang="ts">
interface Props {
    name: string;
    checked: boolean;
}

import StateLayer from "@material/StateLayer.vue";

const { name, checked = false } = defineProps<Props>();
</script>

<style>
@layer components {
    .switch {
        position: relative;
        inline-size: fit-content;
        display: flex;
        align-items: center;
        padding: 12px 8px;

        & input {
            inset: 0;
            display: block;
            position: absolute;
            opacity: 0;
            cursor: pointer;
        }

        & .track {
            inline-size: 34px;
            block-size: 14px;
            margin: 5px 3px;
            border-radius: 7px;
            background-color: rgb(0 0 0 / 0.38);
            transition-property: background-color, opacity;
            transition-duration: 250ms;
            transition-timing-function: var(--standard-curve);
        }

        & .thumb {
            --unbounded: true;
            --surface-edge: both;
            position: absolute;
            inline-size: 20px;
            block-size: auto;
            aspect-ratio: 1 / 1;
            border-radius: 50%;
            transition-property: translate, background-color;
            transition-duration: 250ms;
            transition-timing-function: var(--standard-curve);

            &::before {
                content: "";
                display: block;
                inline-size: stretch;
                block-size: stretch;
                border-radius: inherit;
                background-color: var(--grey-50);
                box-shadow: var(--shadow-z2);
                transition-property: background-color;
                transition-duration: inherit;
                transition-timing-function: inherit;
            }
        }

        &:has(input:checked) {
            --states-base-color: var(--primary-color);

            & .thumb {
                translate: 20px;

                &::before {
                    background-color: var(--primary-color);
                }
            }

            & .track {
                background-color: var(--primary-color);
                opacity: 0.5;
            }
        }

        &:hover .thumb {
            --hovered: true;
        }
    }
}
</style>

<template>
    <div class="switch">
        <div class="track"></div>
        <div class="thumb"><StateLayer></StateLayer></div>
        <input type="checkbox" :name="name" role="switch" :checked="checked" />
    </div>
</template>
