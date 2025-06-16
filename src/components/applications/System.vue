<script setup lang="ts">
import Icon from "@material/Icon.vue";
</script>

<style>
.diagram[data-variant="simulator"] .system {
    z-index: -1;
    position: fixed;
    inline-size: 100%;
    block-size: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    pointer-events: none;

    & .status {
        block-size: var(--status-bar-block-size);
        direction: rtl;
        display: flex;
        align-items: center;
        padding: 0 4px;
        color-scheme: dark;
        color: var(--status-bar-color, light-dark(rgb(0 0 0 / 0.6), rgb(255 255 255 / 0.9)));

        & .icon[data-name="battery_full_alt"] {
            margin-inline-end: 2.5px;
        }

        & p {
            --type-scale: body2;
            margin-inline: 4px;
            padding-block-start: 1px;
            line-height: 1;
        }
    }

    & .navigation {
        block-size: 48px;
        display: grid;
        grid-template-columns: repeat(3, 80px);
        grid-template-rows: 100%;
        grid-template-areas: "back home recent";
        justify-content: space-between;
        place-items: center;
        padding-inline: 40px;
        color: rgb(255 255 255 / 0.9);

        @container diagram (width >=600px) {
            grid-template-columns: repeat(3, 162px);
            padding-inline: 40px;
            justify-content: center;
        }

        & .icon {
            filter: drop-shadow(0 1.5px 0.5px rgb(0 0 0 / 0.2)) drop-shadow(0 1px 1px rgb(0 0 0 / 0.14)) drop-shadow(0 1px 2.5px rgb(0 0 0 / 0.12));

            &[data-name="arrow_back_system"] {
                grid-area: back;
            }

            &[data-name="circle_home"] {
                grid-area: home;
            }

            &[data-name="square_recent"] {
                grid-area: recent;
            }
        }
    }
}

.overlay[data-variant="status-bar"] {
    z-index: 48;
    inset-block-start: 0;
    position: fixed;
    inline-size: 100%;
    block-size: var(--status-bar-block-size);
    background-color: var(--status-bar-background-color);
    overflow: clip;
}

.overlay[data-variant="navigation-bar"] {
    z-index: 48;
    inset-block-end: 0;
    position: fixed;
    inline-size: 100%;
    block-size: var(--navigation-bar-block-size);
    background-color: black;
    overflow: clip;

    &[data-appearance="translucent"] {
        opacity: 0.4;
    }
}

.navigation-ripple {
    visibility: hidden;
    inline-size: 135%;
    max-inline-size: 128px;
    block-size: 100%;
    background-color: white;
    border-radius: 24px;
    opacity: 0.2;
}

@keyframes navigationRippleEnter {
    0% {
        scale: 0 1;
    }

    100% {
        scale: 1 1;
    }
}
</style>

<template>
    <div class="system">
        <div class="status">
            <p>12:30</p>
            <Icon name="battery_full_alt" size="small" />
            <Icon name="signal_cellular_4_bar" size="small" />
            <Icon name="signal_wifi_4_bar" size="small" />
        </div>
        <div class="navigation">
            <Icon name="arrow_back_system" />
            <Icon name="circle_home" />
            <Icon name="square_recent" />
        </div>
    </div>
</template>
