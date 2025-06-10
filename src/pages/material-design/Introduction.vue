<script setup lang="ts">
import { useHead, useSeoMeta } from "@unhead/vue";
import Article from "@document/Article.vue";
import Figure from "@document/Figure.vue";
import Header from "@document/Header.vue";
import Paragraphs from "@document/Paragraphs.vue";
import Section from "@document/Section.vue";
import Divider from "@material/Divider.vue";

import D3E91 from "@diagrams/D3E91.vue";
import D675E from "@diagrams/D675E.vue";
import DD5DB from "@diagrams/DD5DB.vue";
import DE9D4 from "@diagrams/DE9D4.vue";
import D0A3B from "@diagrams/D0A3B.vue";

useSeoMeta({
    description: "质感设计是以印刷工艺为基底的、以Material世界为特征的科学界面设计系统。质感设计通过模仿现实世界，创造真实的虚拟世界调动用户已有的认知经验，并充分利用电子媒介的可能性，释放界面运作、表现的想象力；质感设计还要求设计者清楚自己的设计意图，有意识地把握界面运作的全过程，以帮助使用不同电子设备的、处于不同身心状况的用户高效达成目标。",
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

<style>
main>svg {
    grid-column: 1 / -1;
    aspect-ratio: 16 / 9;
    background-color: light-dark(var(--yellow-500), var(--cyan-500));

    & rect {
        &:nth-child(1) {
            fill: light-dark(var(--yellow-800), var(--cyan-800));
        }

        &:nth-child(2) {
            fill: light-dark(var(--yellow-700), var(--cyan-700));
        }

        &:nth-child(3) {
            fill: light-dark(var(--yellow-600), var(--cyan-600));
        }

        &:nth-child(4) {
            fill: light-dark(var(--yellow-300), var(--cyan-300));
        }
    }

    & circle {
        fill: light-dark(var(--yellow-200), var(--cyan-200));
    }
}
</style>

<template>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1280 720">
        <rect fill="#F9A825" x="176" y="111" width="796" height="510"></rect>
        <rect fill="#FBC02D" x="580" y="239" width="524" height="382"></rect>
        <rect fill="#FDD835" x="476" y="341" width="496" height="280"></rect>
        <rect fill="#FFF176" x="389" y="407" width="122" height="214"></rect>
        <circle fill="#FFF59D" cx="972" cy="577" r="44"></circle>
    </svg>

    <Header>
        <p>遥想第一部智能手机诞生时，移动设备的体验处处受限：显示空间小、通信速度慢、功能特性少。但二十年间，你我的日常工具不断变得更加快捷、万能、易用。如今移动设备的硬件配置已不可同日而语，软件设计同样需要更新换代。</p>
        <p>因此我们挑战自我，为广大用户创造了崭新的界面设计系统⸺质感设计。质感设计不仅虚心汲取经典行业定则的丰富滋养，还致力发挥创新科学技术的强大潜力。我们相信设计系统是同源共流、顺理成章的，但绝不意味着静止和死板。随着我们及各界社区对质感设计理论和实践的探索，本文档将会不断更新完善。</p>
    </Header>

    <Article>
        <h3 id="goals">目标</h3>

        <Paragraphs>
            <p>我们希冀开创一门视觉语言，既能恪守优秀设计的经典定则，又能结合尖端科技的无尽可能。</p>
        </Paragraphs>

        <Figure>
            <D3E91 id="language" />
        </Figure>

        <Paragraphs>
            <p>我们希冀构建一种底层系统，在其基础之上打造跨越平台和设备尺寸的融合体验。虽然面向移动设备设计，但兼顾触摸、语音、鼠标、键盘等多种输入方式。</p>
        </Paragraphs>

        <Figure>
            <D675E id="system" />
        </Figure>
    </Article>

    <Divider />

    <Article direction="vertical">
        <h3 id="principles">原则</h3>

        <Section>
            <Figure>
                <DD5DB id="material-is-metaphor" />
            </Figure>

            <h4>借助Material反映真实</h4>
            <Paragraphs>
                <p>质感设计参照现实世界，将Material喻为科学设想空间的基本粒子、系统进行运动的物质载体，统一反映了虚拟世界的存在形式与运作机理。Material虽根植于现实质感、启迪于传统纸墨，却又融汇了前沿科技与奇思妙想。</p>
                <p>由Material所构成的层面和边沿提供了与现实相贯通的视觉暗示，熟悉的质地让用户可以快速地认知、理解界面。同时Material的可塑性使其得以超脱现实桎梏表现新性质，但又不反叛现实物理规律的真实。</p>
                <p>光照、层面、运动，这三者的基本原理是传达虚拟空间中物件活动情况、交互方式、存在状态、相互关系的关键。逼真的光影效果展示出物件之间的交合关系、划分出空间层次、凸显出运动中的物件。</p>
            </Paragraphs>
        </Section>

        <Section>
            <Figure>
                <DE9D4 id="bold-graphic-intentional" />
            </Figure>

            <h4>鲜明、形象、考虑周到</h4>
            <Paragraphs>
                <p>空间布局、网格系统、比例分配、字体排印、色彩搭配、图像使用——这些传统印刷品设计的基本要素指导着质感设计的视觉效果。在这些设计基础上下功夫，不但可以愉悦用户，还能构建出视觉层级、视觉意义以及视觉聚焦。精心挑选色彩、贴边图像，设置对比明显的字号和目量意营的留白，能够缔造出鲜明形象的用户界面，提供沉浸的用户体验。</p>
                <p>着重强调用户操作项有利于凸显核心功能，为用户提供使用指引。</p>
            </Paragraphs>
        </Section>

        <Section>
            <Figure>
                <D0A3B id="motion-provides-meaning" />
            </Figure>

            <h4>运动传递意义</h4>
            <Paragraphs>
                <p>质感设计尊重并强化用户作为输入源的主体地位，以用户的操作为界面变化的起点，进而改变设计的整体形态。</p>
                <p>所有界面物件的运动都处在同一环境中进行并相互影响。即使物件正在变形或重组，新状态的呈现也不应破坏用户体验的连续性。</p>
                <p>界面动画应当意义深厚、合情合理，为吸引用户注意及维持体验连续服务。界面给用户的反馈要清晰且巧妙，转场需连贯且高效。</p>
            </Paragraphs>
        </Section>
    </Article>
</template>