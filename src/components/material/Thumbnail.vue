<script setup lang="ts">
interface Props {
    variant: "normal" | "avatar";
    character?: string;
}

const { variant, character } = defineProps<Props>();
</script>

<style>
@layer components {
    .thumbnail {
        position: relative;
        inline-size: 40px;
        aspect-ratio: 1 / 1;
        display: inline-flex;
        justify-content: center;
        align-items: center;
        background-repeat: no-repeat;
        background-position: center;
        background-size: cover;
    }

    .thumbnail[data-variant="avatar"] {
        border-radius: 50%;
        outline: 1px solid var(--divider-color);
        outline-offset: -1px;

        &[data-character="ali-connors"] {
            background-size: 60px auto;
            background-position: -15px -13px;
            background-image: url("/avatars/ali-connors.png");
        }

        &[data-character="anthony-stevens"] {
            background-size: 48px;
            background-position: -2px -2px;
            background-image: url("/avatars/anthony-stevens.png");
        }

        &[data-character="britta-holt"] {
            background-size: auto 43px;
            background-position: -12px -1px;
            background-image: url("/avatars/britta-holt.png");
        }

        &[data-character="janet-perkins"] {
            background-size: auto 80px;
            background-position: -17px -22px;
            background-image: url("/avatars/janet-perkins.png");
        }

        &[data-character="jennifer-smith"] {
            background-size: 52px;
            background-position: -8px -7px;
            background-image: url("/avatars/jennifer-smith.png");
        }

        &[data-character="mary-johnson"] {
            background-size: auto 44px;
            background-position: bottom;
            background-image: url("/avatars/mary-johnson.png");
        }

        &[data-character="peter-carlsson"] {
            background-position: top;
            background-image: url("/avatars/peter-carlsson.png");
        }
    }
}
</style>

<template>
    <div class="thumbnail" :data-variant="variant" :data-character="character"></div>
</template>