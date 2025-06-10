<script setup lang="ts">
import { useHead, useSeoMeta } from "@unhead/vue";
import Article from "@document/Article.vue";
import Figure from "@document/Figure.vue";
import Figcaption from "@document/Figcaption.vue";
import Header from "@document/Header.vue";
import Paragraphs from "@document/Paragraphs.vue";
import Divider from "@material/Divider.vue";

import D8H68 from "@diagrams/D8H68.vue";
import DE206 from "@diagrams/DE206.vue";

useSeoMeta({
    description: "质感设计所创造的虚拟世界是一个明亮的三维空间。",
});

useHead({
    link: [
        {
            rel: "stylesheet",
            href: "https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@400;500&family=Roboto:wght@400;500&family=Roboto+Mono:wght@500&display=swap",
        },
    ],
});
</script>

<template>
    <Header>
        <p>质感设计参照现实世界，将屏幕喻为一个明亮的虚拟世界。由Material这一基本粒子构成的应用程序界面存在其中，并受到虚拟世界运行规律的约束。</p>
    </Header>

    <Article>
        <h3 id="space">空间</h3>
        <Paragraphs>
            <p>质感设计的虚拟世界是一个三维空间，这意味着其中每个物体都有X、Y、Z三个三维坐标属性。表示海拔高度的Z轴垂直于显示屏，以屏幕正面朝向方向为正方向，由Material所组成的层面均在空间中占据一定的位置。</p>
        </Paragraphs>

        <Figure>
            <D8H68 id="dimensions" />
            <Figcaption>
                <p>具备长、宽、高的三维空间。</p>
            </Figcaption>
        </Figure>

        <Paragraphs measure="medium">
            <p>为了使内容可见，虚拟世界需要光的介入。虚拟光源发出的光线被Material组成的层面所阻挡，投下阴影，进一步表现出层面的空间关系。从虚拟光源发出的直射光投射出定向的阴影，从空间边界平面反射的环境光投射出广泛、柔和的阴影。界面中的阴影由这两种阴影合成。</p>
        </Paragraphs>

        <Figure>
            <DE206 id="key-light-shadow" />
            <Figcaption>
                <p>直射光投射出的阴影。</p>
            </Figcaption>
        </Figure>

        <Figure>
            <DE206 id="ambient-light-shadow" />
            <Figcaption>
                <p>环境光投射出的阴影。</p>
            </Figcaption>
        </Figure>

        <Figure>
            <DE206 id="combined-light-shadow" />
            <Figcaption>
                <p>直射光与环境光共同投射出的阴影。</p>
            </Figcaption>
        </Figure>
    </Article>

    <Divider />

    <Article>
        <h3 id="space">物质</h3>
        <Paragraphs measure="medium">
            <p>在Material空间中，由Material构成的层面组成应用程序。但为了保证系统栏的可操作性并减少视觉冗余，系统栏以像素的概念被置入于Material空间之上的二维空间。</p>
        </Paragraphs>
    </Article>
</template>