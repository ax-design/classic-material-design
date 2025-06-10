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

        & span {
            --type-scale: body2;
            margin-inline: 4px;
            padding-block-start: 1px;
            line-height: 1;
        }
    }

    & .navigation {
        --navigation-button-inline-size: 80px;
        --navigation-bar-inline-padding: 40px;
        block-size: 48px;
        display: grid;
        grid-template-columns: repeat(3, var(--navigation-button-inline-size));
        grid-template-rows: 100%;
        grid-template-areas: "back home recent";
        justify-content: space-between;
        align-items: center;
        justify-items: center;
        padding-inline: var(--navigation-bar-inline-padding);
        color: rgb(255 255 255 / 0.9);

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
</style>

<template>
    <div class="system" inert>
        <div class="status">
            <span>12:30</span>
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