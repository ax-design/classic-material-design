<script setup lang="ts">
interface Props {
    id: string;
}

import { provide } from "vue";
import Calculator from "@applications/Calculator.vue";

const { id } = defineProps<Props>();
provide("id", id);
provide("animation", true);
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
        & .state-layer .background::after {
            animation-name: show-opacity-to, hide-opacity-to;
            animation-duration: 120ms, 480ms;
            animation-timing-function: linear;
            animation-fill-mode: forwards;
        }

        & .ripple {
            /* animation-name: expand-scale-to, hide-opacity-to;
            animation-duration: var(--ripple-scale-exit-duration), var(--ripple-opacity-exit-duration);
            animation-timing-function: var(--ripple-expand-easing), linear;
            animation-fill-mode: forwards; */
        }
    }
}

#color-overlap[data-playback] .expression::before {
    animation-name: expressionShow, visibleToHidden;
    animation-duration: 2s, 4s;
    animation-delay: 0.5s;
    animation-timing-function: step-end, linear;
    animation-fill-mode: forwards;
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

        & .state-layer .background::after {
            animation-delay: 0.5s, 0.62s;
        }

        & .ripple {
            animation-delay: 0.5s;
        }
    }

    & .numeric .button:nth-child(3) {
        --prepare: true;

        & .state-layer .background::after {
            animation-delay: 0.8s, 0.92s;
        }

        & .ripple {
            animation-delay: 0.8s;
        }
    }

    & .numeric .button:nth-child(5) {
        --prepare: true;

        & .state-layer .background::after {
            animation-delay: 2.1s, 2.22s;
        }

        & .ripple {
            animation-delay: 2.1s;
        }
    }

    & .numeric .button:nth-child(7) {
        --prepare: true;

        & .state-layer .background::after {
            animation-delay: 2.5s, 2.62s;
        }

        & .ripple {
            animation-delay: 2.5s;
        }
    }

    & .operator .button:nth-child(1) {
        --prepare: true;

        & .state-layer .background::after {
            animation-delay: 3.5s, 4.5s;
        }

        & .ripple {
            scale: calc(0 + var(--scale-progress));
            animation-duration: var(--ripple-scale-enter-duration), var(--ripple-opacity-exit-duration);
            animation-delay: 3.5s, 4.5s;
        }
    }

    & .operator .button:nth-child(5) {
        --prepare: true;

        & .state-layer .background::after {
            animation-delay: 1.5s, 1.62s;
        }

        & .ripple {
            animation-delay: 1.5s;
        }
    }
}

#color-overlap[data-playback] .result::before {
    animation-name: resultShow, visibleToHidden;
    animation-duration: 0.4s, 4s;
    animation-delay: 2.1s, 0.5s;
    animation-timing-function: step-end, linear;
    animation-fill-mode: forwards;
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
    animation-name: expand-scale-to, hide-opacity-to;
    animation-duration: 400ms;
    animation-delay: 4.1s, 4.5s;
    animation-timing-function: var(--deceleration-curve), linear;
    animation-fill-mode: forwards;
}
</style>

<template>
    <Calculator page="main" />
</template>
