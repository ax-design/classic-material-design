<script setup lang="ts">
interface Props {
    page: string;
    window?: "mobile" | "tablet" | "desktop";
    contentSet?: number;
}

import Diagram from "@document/Diagram.vue";
import Button from "@material/Button.vue";
import Icon from "@material/Icon.vue";
import Toolbar from "@material/Toolbar.vue";

const { page, window = "mobile", contentSet = 0 } = defineProps<Props>();

const content = [
    { expression: "​", result: "​" },
    { expression: "√ ( 1 + 3 )", result: "2" },
];
</script>

<style>
.diagram[data-application^="calculator"] {
    --primary-color: var(--cyan-500);
    --secondary-color: var(--teal-a400);

    & .status {
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
        display: grid;
        grid-auto-flow: row;
        grid-template-rows: auto calc(56px + 24px) calc(34px + 16px);
        justify-items: end;
        align-items: center;
        padding-block: 24px;
        background-color: light-dark(var(--medium-emphasis-surface-color), var(--grey-800));
        box-shadow: var(--shadow-z4);
        overflow: clip;
    }

    & .toolbar {
        justify-self: stretch;
        justify-content: space-between;
    }

    & .expression {
        --type-scale: display3;
        padding-inline-end: var(--keyline);
        font-weight: 300;
        line-height: 1;
    }

    & .result {
        --type-scale: display1;
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
        grid-template-areas: "delete" "divide" "multiply" "minus" "plus";
        background-color: light-dark(var(--grey-700), var(--grey-850));
        padding: 4px 12px;
    }

    & :is(.numeric, .operator) button {
        color: var(--primary-text-color);
        font-weight: 300;
    }

    & .advanced {
        --type-scale: title;
        --content-color-scheme: light;
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

    @container diagram (width >=520px) {
        & .display {
            grid-template-rows: auto calc(56px + 16px) calc(34px + 24px);
            padding-block-end: 16px;
        }

        & .panel {
            grid-template-columns: auto min-content auto;
        }

        & .operator {
            grid-template-columns: 1fr 1fr;
            grid-template-rows: repeat(4, 1fr);
            grid-template-areas: "divide delete" "multiply ." "minus ." "plus equal";
        }

        & .advanced {
            inline-size: unset;
        }
    }
}
</style>

<template>
    <Diagram variant="simulator" :application="`calculator:${page}`" :window="window">
        <div class="display">
            <Toolbar variant="app-bar" appearance="transparent">
                <Button>RAD</Button>
                <Button>
                    <Icon name="more_vert" />
                </Button>
            </Toolbar>
            <p class="expression">{{ content[contentSet].expression }}</p>
            <p class="result">{{ content[contentSet].result }}</p>
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
                <Button v-if="window === 'mobile'" style="grid-area: equal">=</Button>
            </div>
            <div class="operator">
                <Button style="grid-area: delete">
                    <Icon name="backspace" />
                </Button>
                <Button style="grid-area: divide">÷</Button>
                <Button style="grid-area: multiply">×</Button>
                <Button style="grid-area: minus">−</Button>
                <Button style="grid-area: plus">+</Button>
                <Button v-if="window != 'mobile'" style="grid-area: equal">=</Button>
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
