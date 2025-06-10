<script setup lang="ts">
import { useHead, useSeoMeta } from "@unhead/vue";
import Article from "@document/Article.vue";
import Figure from "@document/Figure.vue";
import Figcaption from "@document/Figcaption.vue";
import Header from "@document/Header.vue";
import Paragraphs from "@document/Paragraphs.vue";
import Divider from "@material/Divider.vue";

import DA49F from "@diagrams/DA49F.vue";
import D5DF1 from "@diagrams/D5DF1.vue";
import D9F6C from "@diagrams/D9F6C.vue";
import DBF0B from "@diagrams/DBF0B.vue";
import DE42C from "@diagrams/DE42C.vue";
import D328D from "@diagrams/D328D.vue";
import D2F5A from "@diagrams/D2F5A.vue";
import D01EF from "@diagrams/D01EF.vue";
import DCC3D from "@diagrams/DCC3D.vue";
import DCD01 from "@diagrams/DCD01.vue";
import DA6D2 from "@diagrams/DA6D2.vue";
import DB6EA from "@diagrams/DB6EA.vue";

useSeoMeta({
    description: "在质感设计中，Material是虚拟世界的唯一物质。Material的性质类似现实世界的基本粒子，但Material可以凭空产生或消失。由Material组成的物体可以表现任意色彩或透明度，且可以自由地拆分与无缝拼合。由Material组成的层面类似现实世界的纸张，但不能扭曲、折叠、翻转。",
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
        <p>Material作为质感设计虚拟世界中的基本粒子具有固定的属性和运动规律，相较于现实世界的基本粒子又有其独特的性质和行为，进而决定了由Material组成的层面的表现。</p>
    </Header>

    <Article>
        <h3 id="physical-properties">形态与运动</h3>
        <Paragraphs>
            <p>Material是虚拟世界中的物质实体，因此多个Material不能同时占据相同的位置，由Material组成的层面也不能互相重叠或穿透。</p>
        </Paragraphs>

        <Figure>
            <DA49F id="physical-presence" />
            <Figcaption sign="do">
                <p>使用阴影区分实体层面。</p>
            </Figcaption>
        </Figure>

        <Figure>
            <DA49F id="virtual-presence" />
            <Figcaption sign="dont">
                <p>Material不能重叠。</p>
            </Figcaption>
        </Figure>

        <Figure>
            <D5DF1 id="motion-virtual-presence" />
            <Figcaption sign="dont">
                <p>Material不能互相穿透。</p>
            </Figcaption>
        </Figure>

        <Paragraphs>
            <p>由Material组成的层面类似于纸张，是一种平整、轻盈、高密度、质地均匀的固体，厚度固定为1dp。</p>
        </Paragraphs>

        <Figure>
            <D9F6C id="consistent-surfaces-thickness" />
            <Figcaption sign="do">
                <p>Material层面具有统一的厚度。</p>
            </Figcaption>
        </Figure>

        <Figure>
            <DBF0B id="inconsistent-surfaces-thickness" />
            <Figcaption sign="dont">
                <p>多种厚度的Material层面钳制界面元素的活动。</p>
            </Figcaption>
        </Figure>

        <Paragraphs>
            <p>外力作用不能透过Material，因此用户的操作不能穿过高层面作用于低层面。</p>
        </Paragraphs>

        <Figure>
            <DE42C id="obstructed-input" />
            <Figcaption sign="do">
                <p>用户操作仅作用于选中的或在作用范围最前端的层面。</p>
            </Figcaption>
        </Figure>

        <Figure>
            <DE42C id="input-pass-through" />
            <Figcaption sign="dont">
                <p>用户操作不能穿透Material层面。</p>
            </Figcaption>
        </Figure>

        <Paragraphs>
            <p>Material可以凭空产生和消失。因此Material层面可以在平面上自由变换形状与长、宽。</p>
        </Paragraphs>

        <Figure>
            <D328D id="magical-material" />
            <Figcaption>
                <p>Material层面的形状与尺寸由Material的有无决定。</p>
            </Figcaption>
        </Figure>

        <Paragraphs>
            <p>Material层面可以自由地拆分与无缝拼合。</p>
        </Paragraphs>

        <Figure>
            <D2F5A id="ideal-material" />
            <Figcaption>
                <p>Material之间的分割与连结干净利落。</p>
            </Figcaption>
        </Figure>

        <Paragraphs>
            <p>Material可以在三维空间内自由移动。但由于虚拟空间海拔高度有限，为了保证界面稳定性，Material层面只能平行于屏幕，不能扭曲、折叠、翻转。</p>
        </Paragraphs>

        <Figure>
            <D01EF id="free-movement" />
            <Figcaption sign="do">
                <p>同一Material层面中的Material只能处于同一海拔。</p>
            </Figcaption>
        </Figure>

        <Figure>
            <DCC3D id="screen-piercing" />
            <Figcaption sign="dont">
                <p>Material不能穿透大小有限的虚拟空间。</p>
            </Figcaption>
        </Figure>

    </Article>

    <Divider />

    <Article>
        <h3 id="appearance">外表</h3>
        <Paragraphs>
            <p>Material可以自由改变颜色，内容的显示和运动实质上是承载物——Material的颜色变化，因此由Material组成的层面可以显示任意内容——除了模拟阴影。</p>
        </Paragraphs>

        <Figure>
            <DCD01 id="material-display" />
            <Figcaption>
                <p>Material可以表现任意颜色。</p>
            </Figcaption>
        </Figure>

        <Figure>
            <DA6D2 id="no-approximated-shadows" />
            <Figcaption sign="dont">
                <p>实体层面的阴影不应通过视觉欺骗的方式实现。</p>
            </Figcaption>
        </Figure>

        <Paragraphs>
            <p>内容的运动可以在视觉上独立于Material，但内容的显示始终依赖于Material的存在。</p>
        </Paragraphs>

        <Figure>
            <DB6EA id="independent-content" />
            <Figcaption>
                <p>Material层面显示的内容并不被Material属性所影响。</p>
            </Figcaption>
        </Figure>

        <Paragraphs measure="medium">
            <p>Material层面可以表现一定程度的透明。但除过渡状态外，包含内容的Material承载层必须保持完全不透明。</p>
        </Paragraphs>
    </Article>
</template>