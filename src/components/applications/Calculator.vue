<script setup lang="ts">
interface Props {
    id: string;
    page: string;
    animation?: boolean;
}

import Diagram from "@document/Diagram.vue";
import Button from "@material/Button.vue";
import Icon from "@material/Icon.vue";
import Toolbar from "@material/Toolbar.vue";

const { id, page, animation } = defineProps<Props>();
</script>

<style>
.diagram[data-application^="calculator"] {
    --primary-color: var(--cyan-500);
    --secondary-color: var(--teal-a400);

    & .system .status {
        color-scheme: inherit;
    }

    & .application {
        display: flex;
        flex-direction: column;
    }

    & .display {
        --surface-edge: bottom;
        z-index: 4;
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: end;
        row-gap: 16px;
        padding-block: 24px;
        background-color: light-dark(var(--medium-emphasis-surface-color), var(--grey-800));
        box-shadow: var(--shadow-z4);
        overflow: clip;
    }

    & .toolbar {
        align-self: stretch;
        justify-content: space-between;
    }

    & .expression {
        --type-scale: display3;
        min-block-size: 1em;
        padding-inline-end: var(--keyline);
        font-weight: 300;
        line-height: 1;
    }

    & .result {
        --type-scale: display1;
        min-block-size: 1em;
        margin-block-start: 8px;
        padding-inline-end: var(--keyline);
        color: var(--hint-text-color);
        font-weight: 300;
        line-height: 1;
    }

    & .panel {
        flex-grow: 1;
        position: relative;
        display: grid;
        grid-template-columns: auto min-content var(--keyline);

        & button {
            --type-scale: inherit;
            --unbounded: true;
        }
    }

    & .numeric {
        --type-scale: display1;
        --content-color-scheme: dark;
        flex-grow: 1;
        display: grid;
        place-items: stretch;
        grid-template-columns: repeat(3, 1fr);
        grid-template-rows: repeat(4, 1fr);
        grid-template-areas: "seven eight nine" "four five six" "one two three" "dot zero equal";
        background-color: light-dark(var(--grey-800), var(--grey-900));
        padding: 4px 8px;
    }

    & .operator {
        --type-scale: headline;
        --content-color-scheme: dark;
        display: grid;
        place-items: stretch;
        grid-template-columns: 1fr;
        grid-template-rows: repeat(5, 1fr);
        background-color: light-dark(var(--grey-700), var(--grey-850));
        padding: 4px 12px;

        & button:last-of-type {
            display: none;
        }

        & button:nth-of-type(2) {
            /* anchor-name: --backspace; */
            grid-row-start: 1;
        }

        & button:is(:nth-of-type(4), :nth-of-type(5)) {
            grid-column-start: 1;
        }
    }

    & :is(.numeric, .operator) button {
        color: var(--primary-text-color);
        font-weight: 300;
    }

    & .advanced {
        --type-scale: title;
        align-items: center;
        justify-items: stretch;
        inline-size: calc(100cqi - var(--increment));
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        grid-template-rows: repeat(5, 1fr);
        padding: 4px 8px;
        box-sizing: border-box;
        background-color: var(--secondary-color);
        box-shadow: var(--shadow-z2);

        &:not([open]) {
            box-shadow: var(--shadow-z0);
        }

        & button {
            font-weight: 400;
        }
    }
}

@container simulator (width >=520px) {
    .diagram[data-application^="calculator"] {
        & .panel {
            padding-inline-end: 0px;
        }

        & .numeric .button:last-of-type {
            display: none;
        }

        & .operator {
            grid-template-columns: 1fr 1fr;
            grid-template-rows: repeat(4, 1fr);

            & button:nth-of-type(2) {
                grid-row-start: unset;
            }

            & button:last-of-type {
                display: inline-flex;
            }
        }

        & .advanced {
            inline-size: initial;
            block-size: initial;
            position: relative;
            padding-block-end: 4px;
            translate: 0px;
        }

        & .scrim {
            display: none;
        }
    }
}
</style>

<template>
    <Diagram :id="id" variant="simulator" :application="`calculator:${page}`" :animation="animation">
        <div class="display">
            <Toolbar variant="app-bar" appearance="transparent">
                <Button>RAD</Button>
                <Button>
                    <Icon name="more_vert" />
                </Button>
            </Toolbar>
            <p class="expression"></p>
            <p class="result"></p>
            <div class="clear-ripple"></div>
            <div class="overlay" data-variant="status-bar">
                <div class="clear-ripple"></div>
            </div>
        </div>
        <div class="panel">
            <div class="numeric">
                <Button style="grid-area: zero">0</Button>
                <Button style="grid-area: one">1</Button>
                <Button style="grid-area: two">2</Button>
                <Button style="grid-area: three">3</Button>
                <Button style="grid-area: four">4</Button>
                <Button style="grid-area: five">5</Button>
                <Button style="grid-area: six">6</Button>
                <Button style="grid-area: seven">7</Button>
                <Button style="grid-area: eight">8</Button>
                <Button style="grid-area: nine">9</Button>
                <Button style="grid-area: dot">.</Button>
                <Button style="grid-area: equal">=</Button>
            </div>
            <div class="operator">
                <Button>÷</Button>
                <Button>
                    <Icon name="backspace" />
                </Button>
                <Button>×</Button>
                <Button>−</Button>
                <Button>+</Button>
                <Button>=</Button>
            </div>
            <div class="advanced">
                <Button>INV</Button>
                <Button>DEG</Button>
                <Button>%</Button>
                <Button>sin</Button>
                <Button>cos</Button>
                <Button>tan</Button>
                <Button>ln</Button>
                <Button>log</Button>
                <Button>√</Button>
                <Button>π</Button>
                <Button>e</Button>
                <Button>^</Button>
                <Button>(</Button>
                <Button>)</Button>
                <Button>!</Button>
            </div>
        </div>
    </Diagram>
</template>
