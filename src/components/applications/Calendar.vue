<script setup lang="ts">
interface Props {
    id: string;
    page: string;
    animation?: boolean;
}

import Diagram from "@document/Diagram.vue";
import Button from "@material/Button.vue";
import Icon from "@material/Icon.vue";
import Thumbnail from "@material/Thumbnail.vue";
import Toolbar from "@material/Toolbar.vue";

const { id, page, animation } = defineProps<Props>();
</script>

<style>
.diagram[data-application^="calendar"] {
    --secondary-color: var(--red-a200);
    --calendar-light-red: var(--google-red-alt-400);
    --calendar-teal: var(--teal-500);
    --calendar-light-teal: var(--teal-400);
    --calendar-light-green: var(--google-green-kennedy-300);
    --calendar-blue-grey: var(--blue-grey-300);
    --calendar-yellow: var(--google-yellow-alt-700);
    --calendar-deep-orange: var(--deep-orange-400);

    & .system .status {
        color-scheme: inherit;
    }

    & .application {
        display: flex;
        flex-direction: column;
    }

    & .toolbar {
        z-index: 4;
        padding-block-start: var(--status-bar-block-size);
        color: var(--secondary-text-color);
        background-color: var(--low-emphasis-surface-color);

        & .title {
            justify-content: start;
            margin-inline: 8px;

            & .icon {
                color: var(--secondary-text-color);
            }
        }
    }

    & .button[data-variant="floating"] {
        --surface-tint-color: var(--white-tint-color);
        --surface-shade-color: var(--brown-shade-color);
        --content-color-scheme: dark;
        position: fixed;
        inset-inline-end: var(--keyline);
        inset-block-end: calc(var(--navigation-bar-block-size) + var(--keyline));
    }

    & .schedule {
        position: relative;
        inline-size: 100%;
        display: flex;
        flex-direction: column;
    }

    & .illustration {
        position: relative;
        block-size: calc(3 * var(--increment));
        display: flex;
        overflow: clip;

        & img {
            inset-inline-start: 35%;
            position: relative;
            scale: 2;
        }

        & p {
            --type-scale: title;
            position: fixed;
            inset-inline-start: calc(16px + var(--increment));
            margin-block: var(--keyline);
            color: var(--primary-text-color);
        }
    }

    & .month {
        position: relative;
        display: flex;
        flex-direction: column;
        row-gap: var(--keyline);
        padding-inline: var(--keyline);
        padding-block: 24px;
        background-color: var(--medium-emphasis-surface-color);
    }

    & .events {
        position: relative;
        display: grid;
        grid-template-columns: 44px auto;
        row-gap: 8px;
        align-items: start;

        & .event {
            --content-color-scheme: dark;
            grid-column-start: 2;
            position: relative;
            display: flex;
            justify-content: space-between;
            padding-inline: 12px;
            color-scheme: var(--content-color-scheme, inherit);
            color: var(--primary-text-color);
            background-color: var(--teal-300);
            border-radius: 2px;
            box-sizing: border-box;

            &[data-size="regular"] {
                block-size: 32px;
                align-items: center;
            }

            &[data-size="medium"] {
                block-size: 56px;
                align-items: center;
            }

            &[data-size="large"] {
                block-size: 80px;
                align-items: center;
            }

            &[data-size="xlarge"] {
                block-size: 112px;
                align-items: end;
                padding-block: 12px;
            }

            & .text {
                --type-scale: body1;

                & p {
                    line-height: 1;
                }

                & p:nth-of-type(2) {
                    margin-block-start: 8px;
                }
            }

            & span {
                display: flex;
                flex-direction: column;
                white-space: nowrap;
                line-height: 1.25rem;
            }
        }

        & .events:has(div:nth-of-type(2)) .date {
            grid-row-end: span 2;
        }
    }

    & .date {
        grid-row: span 2;
        inset-block-start: calc(24px + var(--keyline) + var(--increment));
        position: sticky;
        color: var(--primary-text-color);

        & p {
            line-height: 1;
        }

        & p:first-of-type {
            --type-scale: title;
            font-weight: 400;
            margin-block-end: 4px;

            .date[data-today] & {
                color: var(--secondary-color);
            }
        }

        & p:last-of-type {
            color: var(--secondary-text-color);
        }
    }

    & .now {
        grid-column-start: 2;
        position: relative;
        block-size: 0px;
        display: flex;
        align-items: center;

        &::before {
            content: "";
            inline-size: 100%;
            block-size: 1px;
            padding-inline-start: 8px;
            margin-inline-start: -8px;
            background-color: var(--secondary-color);
        }

        &::after {
            content: "";
            inset-inline-start: -12px;
            position: absolute;
            inline-size: 8px;
            aspect-ratio: 1 / 1;
            background-color: var(--secondary-color);
            border-radius: 50%;
        }
    }
}

/*----------------------------------------------------------------------------*\
  选择日期
\*----------------------------------------------------------------------------*/
.simulator[calendar="select-date"] .toolbar {
    grid-template-rows: var(--increment) 1fr;
    box-shadow: var(--shadow-z8);
}

.simulator[calendar="select-date"] .date-pick {
    grid-column: 1 / 6;
    grid-row: 2;
    display: grid;
    grid-template-columns: repeat(7, 32px);
    grid-template-rows: repeat(6, 32px);
    justify-content: space-between;
    place-items: center;
    row-gap: 16px;
    padding-inline: 12px;
    padding-block: 8px 24px;
}

.simulator[calendar="select-date"] .date-pick span:nth-of-type(n + 8) {
    place-self: stretch;
    display: flex;
    justify-content: center;
    align-items: center;
    color: var(--primary-text-color);
    border-radius: 50%;
    box-sizing: border-box;
}

.simulator[calendar="select-date"] .date-pick span[class~="event"] {
    border: 1px solid var(--divider-color);
    border-radius: 50%;
}

.simulator[calendar="select-date"] .date-pick span[class~="today"] {
    background-color: var(--secondary-color);
    color: white;
}

.simulator[calendar="select-date"] .schedule {
    inset-block-start: 92px;
}

.simulator[calendar="select-date"] img {
    inset-inline-start: -25%;
}
</style>

<template>
    <Diagram :id="id" variant="simulator" :application="`calendar:${page}`" :animation="animation">
        <Toolbar variant="app-bar">
            <Button>
                <Icon name="menu"></Icon>
            </Button>
            <Button :class="['title']">
                <h1>八月</h1>
                <Icon name="arrow_drop_down"></Icon>
            </Button>

            <Button>
                <Icon name="search"></Icon>
            </Button>
            <Button>
                <Icon name="today"></Icon>
            </Button>
            <Button>
                <Icon name="more_vert"></Icon>
            </Button>
        </Toolbar>
        <div class="schedule">
            <div class="month">
                <div class="events">
                    <div class="date">
                        <p>25</p>
                        <p>周一</p>
                    </div>
                    <div class="event" data-size="medium" style="background-color: var(--calendar-yellow)">
                        <div class="text">
                            <p lang="en">Sam Blitzstein</p>
                            <p>生日</p>
                        </div>
                        <Thumbnail variant="avatar" style="background-image: url('/avatars/sam-blitzstein.jpg');" />
                    </div>
                    <div class="event" data-size="xlarge" style="background-color: var(--calendar-blue-grey)">
                        <div class="text">
                            <p>煮咖啡</p>
                            <p lang="en">13:00 - 13:30</p>
                        </div>
                    </div>
                </div>

                <div class="events">
                    <div class="date" data-today>
                        <p>26</p>
                        <p>周二</p>
                    </div>
                    <div class="event" data-size="medium" style="background-color: var(--calendar-teal)">
                        <div class="text">
                            <p>坐火车去那不勒斯</p>
                            <p lang="en">6:00</p>
                        </div>
                    </div>
                    <div class="now"></div>
                    <div class="event" data-size="medium" style="background-color: var(--calendar-teal)">
                        <div class="text">
                            <p>参观王宫</p>
                            <p lang="en">16:00</p>
                        </div>
                    </div>
                </div>
            </div>

            <div class="illustration">
                <img src="/calendar/bkg_09_september.jpg" />
                <p>九月</p>
            </div>

            <div class="month">
                <div class="events">
                    <div class="date">
                        <p>3</p>
                        <p>周三</p>
                    </div>
                    <div class="event" data-size="regular" style="background-color: var(--calendar-light-green)">
                        <div class="text">
                            <p>带Ella看兽医</p>
                        </div>
                    </div>
                    <div class="event" data-size="medium" style="background-color: var(--calendar-light-green)">
                        <div class="text">
                            <p>创意简报</p>
                            <p lang="en">9:00</p>
                        </div>
                    </div>
                    <div class="event" data-size="xlarge" style="background-color: var(--calendar-light-red)">
                        <div class="text">
                            <p>公园慢跑</p>
                            <p lang="en">9:30 - 10:30</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <Button variant="floating">
            <Icon name="add"></Icon>
        </Button>
        <div class="overlay" data-variant="status-bar"></div>
    </Diagram>
</template>
