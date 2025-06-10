<script setup lang="ts">
import { useHead, useSeoMeta } from "@unhead/vue";
import Article from "@document/Article.vue";
// import Figure from "@document/Figure.vue";
// import Figcaption from "@document/Figcaption.vue";
import Header from "@document/Header.vue";
// import Paragraphs from "@document/Paragraphs.vue";
import Divider from "@material/Divider.vue";

useSeoMeta({
    description: "永恒运动的Material世界运动规律与现实世界相仿。质感设计以用户熟悉的动画效果为用户提供掌握界面的指导，将用户的注意力聚焦在核心进程和要素上。设计者通过合理调整相对运动时长和速率变化，可以实现自然的界面变化过程。",
});

useHead({
    link: [
        {
            rel: "stylesheet",
            href: "https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@400..500&family=Roboto:wght@400;500&family=Roboto+Mono:wght@500&display=swap",
        },
    ],
});
</script>

<template>
    <Header>
        <p>物体的运动能够传递自身的体积、质量、形变自由度等信息，帮助用户了解与掌控界面。质感设计借助运动体现空间关系和界面功能，表达设计意图，带来如意、流畅的使用体验和美观的视觉体验。</p>
        <video controls poster="/motion/making_motion_meaningful_2x1.jpg">
            <source src="/motion/Material_Design_Motion.mp4">
            <track src="/motion/Material_Design_Motion.vtt" default>
        </video>
    </Header>

    <Article>
        <h3 id="usage">功能作用</h3>

    </Article>

    <Divider />

    <Article>
        <h3 id="speed">速率</h3>

    </Article>

    <Divider />

    <Article>
        <h3 id="duration">时长</h3>

    </Article>

</template>