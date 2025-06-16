<script setup lang="ts">
interface Props {
    id: string;
    page: string;
    animation?: boolean;
}

import Diagram from "@document/Diagram.vue";
import Button from "@material/Button.vue";
import Divider from "@material/Divider.vue";
import Icon from "@material/Icon.vue";
import Scrim from "@material/Scrim.vue";
import Tile from "@material/Tile.vue";
import Toolbar from "@material/Toolbar.vue";

const { id, page, animation } = defineProps<Props>();
</script>

<style>
.diagram[data-application^="contacts"] {
    --primary-color: var(--indigo-500);
    --secondary-color: var(--pink-a200);
    --status-bar-background-color: rgb(0 0 0 / 0.5);

    & .application {
        display: grid;
        scroll-timeline-name: --rootScrollTimeline;
        grid-template-rows: calc(100cqi * 2 / 3 + var(--status-bar-block-size));
    }

    & .overlay[data-variant="status-bar"] {
        animation-name: contactsStatusBarColor;
    }

    & .toolbar {
        --content-color-scheme: dark;
        z-index: 4;
        anchor-name: --toolbar;
        block-size: calc(100cqi * 2 / 3);
        padding-block-start: var(--status-bar-block-size);
        box-shadow: var(--shadow-z0);

        & img {
            position: absolute;
            scale: calc(390 / 360);
            translate: 4px -28px;
        }

        & .title {
            --type-scale: display1;
            translate: 0px calc(160px);
        }

        & .scrim {
            block-size: calc(1.5 * var(--increment));
            margin-top: var(--status-bar-block-size);
        }
    }

    & .toolbar {
        animation-name: contactsAppBarSurfaceFlex;

        &::after {
            animation-name: show-opacity-from;
        }

        & .title {
            animation-name: contactsAppBarTextScale;
        }

        & :is(img, .scrim) {
            animation-name: hide-opacity-to;
        }
    }

    & .toolbar,
    & .toolbar::after,
    & .toolbar :is(.title, img, .scrim),
    & .overlay[data-variant="status-bar"] {
        animation-timeline: --rootScrollTimeline;
        animation-timing-function: linear;
        animation-range-end: calc(100cqi * 2 / 3 - var(--increment));
        animation-fill-mode: forwards;
    }

    & ul {
        padding: 8px 0;

        & li {
            grid-template-columns: 56px auto;
            grid-auto-flow: column;
            grid-auto-columns: 56px;

            & > .content > .icon {
                color: var(--primary-color);
            }

            & .text {
                grid-column-start: 2;
            }

            & button {
                grid-column-start: 3;
                justify-self: center;
            }
        }

        &:first-of-type {
            margin-block-start: calc(56px / 2);
        }

        &:last-of-type {
            margin-block-end: calc(2 * var(--keyline));
        }
    }

    & .divider {
        margin-inline-start: calc(56px + var(--keyline));
    }

    & .button[data-variant="floating"] {
        --surface-tint-color: var(--white-tint-color);
        --surface-shade-color: var(--brown-shade-color);
        --content-color-scheme: dark;
        z-index: 8;
        position-anchor: --toolbar;
        inset-inline-end: var(--keyline);
        inset-block-end: anchor(bottom);
        position: fixed;
        translate: 0% 50%;
    }
}

@keyframes contactsStatusBarColor {
    100% {
        background-color: var(--indigo-700);
    }
}

@keyframes contactsAppBarSurfaceFlex {
    100% {
        block-size: var(--increment);
        box-shadow: var(--shadow-z4);
    }
}

@keyframes contactsAppBarTextScale {
    100% {
        translate: 0px 0px;
        font-size: 1.25rem;
    }
}
</style>

<template>
    <Diagram :id="id" variant="simulator" :application="`contacts:${page}`" :animation="animation">
        <Toolbar variant="app-bar:prominent">
            <img src="/avatars/ali-connors.png" />
            <Scrim variant="gradient" anchor="top" />
            <Button>
                <Icon name="arrow_back" />
            </Button>
            <p class="title">Ali Connors</p>
            <Button>
                <Icon name="star_border" />
            </Button>
            <Button>
                <Icon name="more_vert" />
            </Button>
        </Toolbar>
        <ul>
            <Tile lines="2">
                <Icon name="call" />
                <div class="text">
                    <p>(650) 555–1234</p>
                    <p>手机</p>
                </div>
                <Button slot="trailing">
                    <Icon name="message" />
                </Button>
            </Tile>
            <Tile lines="2">
                <div class="text">
                    <p>(323) 555–6789</p>
                    <p>单位</p>
                </div>
                <Button slot="trailing">
                    <Icon name="message" />
                </Button>
            </Tile>
        </ul>
        <Divider />
        <ul>
            <Tile lines="2">
                <Icon name="mail" />
                <div class="text">
                    <p>aliconnors@example.com</p>
                    <p>个人</p>
                </div>
            </Tile>
            <Tile lines="2">
                <div class="text">
                    <p>ali_connors@example.com</p>
                    <p>工作</p>
                </div>
            </Tile>
        </ul>
        <Divider />
        <ul>
            <Tile lines="3">
                <Icon name="place" />
                <div class="text">
                    <p>2000 Main Street<br />San Francisco, CA 94112</p>
                    <p>住宅</p>
                </div>
            </Tile>
            <Tile lines="3">
                <div class="text">
                    <p>1600 Amphitheatre<br />Pkwy Mountain View, CA 94043</p>
                    <p>单位</p>
                </div>
            </Tile>
        </ul>
        <Button variant="floating">
            <Icon name="edit" />
        </Button>
        <div class="overlay" data-variant="status-bar"></div>
    </Diagram>
</template>
