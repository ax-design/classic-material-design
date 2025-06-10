<script setup lang="ts">
interface Props {
    id: string;
}

import Calculator from "@applications/Calculator.vue";

const { id } = defineProps<Props>();
</script>

<style>
#color-overlap .clear-ripple {
    justify-self: start;
    inset-inline-end: 60px;
    inset-block-start: 273px;
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
}

#color-overlap .clear-ripple::before {
    content: "";
    position: absolute;
    inline-size: calc(405.6217px * 2);
    aspect-ratio: 1 / 1;
    background-color: var(--primary-color);
    border-radius: 50%;
    scale: 0;
}

#color-overlap .overlay .clear-ripple::before {
    background-color: var(--cyan-600);
}

#color-overlap :is(.expression, .result)::before {
    content: "";
}

#color-overlap[data-playback] {
    animation-duration: 5.5s;

    @container style(--prepare: true) {
        & .state-layer::before {
            animation-name: toOpaque, toTransparent;
            animation-duration: 120ms, 480ms;
            animation-timing-function: linear;
            animation-fill-mode: forwards;
        }

        & .ripple {
            animation-name: toExpand_scale, toOpaque, toTransparent;
            animation-duration: var(--exit-duration), 120ms, calc(1000ms / 3);
            animation-timing-function: var(--ripple-expand-curve), linear, linear;
            animation-fill-mode: both;
        }
    }
}

#color-overlap[data-playback] .expression::before {
    animation-name: expressionShow, visibleToHidden;
    animation-duration: 2s, 4s;
    animation-delay: 0.5s;
    animation-timing-function: step-end, linear;
    animation-fill-mode: forwards, forwards;
}

@keyframes expressionShow {
    0% {
        content: "1";
    }

    15% {
        content: "12";
    }

    50% {
        content: "12 +";
    }

    80% {
        content: "12 + 4";
    }

    100% {
        content: "12 + 46";
    }
}

#color-overlap {
    & .numeric .button:nth-child(2) {
        --prepare: true;

        & .state-layer::before {
            animation-delay: 0.5s, 0.62s;
        }

        & .ripple {
            animation-delay: 0.5s, 0.5s, 0.62s;
        }
    }

    & .numeric .button:nth-child(3) {
        --prepare: true;

        & .state-layer::before {
            animation-delay: 0.8s, 0.92s;
        }

        & .ripple {
            animation-delay: 0.8s, 0.8s, 0.92s;
        }
    }

    & .numeric .button:nth-child(5) {
        --prepare: true;

        & .state-layer::before {
            animation-delay: 2.1s, 2.22s;
        }

        & .ripple {
            animation-delay: 2.1s, 2.1s, 2.22s;
        }
    }

    & .numeric .button:nth-child(7) {
        --prepare: true;

        & .state-layer::before {
            animation-delay: 2.5s, 2.62s;
        }

        & .ripple {
            animation-delay: 2.5s, 2.5s, 2.62s;
        }
    }

    & .operator .button:nth-child(2) {
        --prepare: true;

        & .state-layer::before {
            animation-delay: 3.5s, 4.5s;
        }

        & .ripple {
            animation-delay: 3.58s, 3.5s, 4.5s;
        }
    }

    & .operator .button:nth-child(5) {
        --prepare: true;

        & .state-layer::before {
            animation-delay: 1.5s, 1.62s;
        }

        & .ripple {
            animation-delay: 1.5s, 1.5s, 1.62s;
        }
    }
}

#color-overlap[data-playback] .result::before {
    animation-name: resultShow, visibleToHidden;
    animation-duration: 0.4s, 4s;
    animation-delay: 2.1s, 0.5s;
    animation-timing-function: step-end, linear;
    animation-fill-mode: forwards, forwards;
}

@keyframes resultShow {
    0% {
        content: "16";
    }

    100% {
        content: "58";
    }
}

#color-overlap[data-playback] .clear-ripple::before {
    animation-name: toExpand_scale, toTransparent;
    animation-duration: 400ms;
    animation-delay: 4.1s, 4.5s;
    animation-timing-function: var(--deceleration-curve), linear;
    animation-fill-mode: forwards;
}
</style>

<template>
    <Calculator :id="id" page="main" :animation="true" />
</template>