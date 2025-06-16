<script setup lang="ts">
import { useHead, useSeoMeta } from "@unhead/vue";
import Article from "@document/Article.vue";
import Figure from "@document/Figure.vue";
import Figcaption from "@document/Figcaption.vue";
import Header from "@document/Header.vue";
import Paragraphs from "@document/Paragraphs.vue";
import Section from "@document/Section.vue";
import Divider from "@material/Divider.vue";

import D96C5 from "@diagrams/D96C5.vue";
import D05F4 from "@diagrams/D05F4.vue";
import D7855 from "@diagrams/D7855.vue";
import D7ECC from "@diagrams/D7ECC.vue";
import D0873 from "@diagrams/D0873.vue";
import D6228 from "@diagrams/D6228.vue";
import D2FK9 from "@diagrams/D2FK9.vue";
import DU87H from "@diagrams/DU87H.vue";

useSeoMeta({
    description: "Material层面具有厚度，且统一为1dp。Material层面占据一定的独立空间，通常以阴影和覆盖关系传达自身的高度位置。",
});

useHead({
    link: [
        {
            rel: "stylesheet",
            href: "https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@400;500&family=Roboto:wght@300;400;500&family=Roboto+Mono:wght@500&display=swap",
        },
    ],
});
</script>

<template>
    <Header>
        <p>海拔高度是指层面之间在Z轴上的相对距离。每个应用程序都有一个承载层作为0dp的基准面来放置组件与内容。</p>
    </Header>

    <Article>
        <h3 id="elevation">海拔高度</h3>
        <Paragraphs measure="medium">
            <p>海拔高度是指层面之间在Z轴上的相对距离。每个应用程序都有一个承载层作为0dp的基准面来放置组件与内容。</p>
        </Paragraphs>

        <Section>
            <Paragraphs>
                <h4>度量</h4>
                <p>由于Material层面具有厚度，因此它们之间的海拔差是上表面之间的海拔差。海拔高度的单位与长、宽单位一致，均为dp（密度无关像素）。</p>
            </Paragraphs>

            <Figure>
                <D96C5 id="absolute-elevation" />
                <Figcaption>
                    <p>具备长、宽、高的三维空间。</p>
                </Figcaption>
            </Figure>

            <Paragraphs>
                <p>海拔高度是相对的，元素的海拔高度可以继承。</p>
            </Paragraphs>

            <Figure>
                <D05F4 id="relative-elevation" />
                <Figcaption>
                    <p>直射光投射出的阴影。</p>
                </Figcaption>
            </Figure>
        </Section>

        <Section>
            <Paragraphs>
                <h4>静息海拔</h4>
                <p>在质感设计中，所有组件都有各自的常态、默认海拔高度，也就是静息海拔。为了与界面布局和主体内容相适应，部分组件的静息海拔有多种选择。</p>
                <p>在不同种类的设备上组件的静息海拔可能会有所不同。比如电视的屏幕更厚，因此能展示更广的景深，其中组件的静息海拔就会更高。而为了适应桌面端的多窗口和鼠标输入环境，部分组件的静息海拔会有所降低。</p>
            </Paragraphs>

            <table style="grid-column-end: var(--medium-content-span)">
                <thead>
                    <tr>
                        <th scope="col">海拔（dp）</th>
                        <th scope="col">组件</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th>24</th>
                        <td>
                            <ul>
                                <li>对话框</li>
                            </ul>
                        </td>
                    </tr>
                    <tr>
                        <th>16</th>
                        <td>
                            <ul>
                                <li>单页（导航抽屉、底部单页、侧边单页等）</li>
                            </ul>
                        </td>
                    </tr>
                    <tr>
                        <th>9</th>
                        <td>
                            <ul>
                                <li>子菜单（每叠加一层子菜单其海拔增加1dp）</li>
                            </ul>
                        </td>
                    </tr>
                    <tr>
                        <th>8</th>
                        <td>
                            <ul>
                                <li>底部导航</li>
                                <li>菜单</li>
                            </ul>
                        </td>
                    </tr>
                    <tr>
                        <th>6</th>
                        <td>
                            <ul>
                                <li>浮动操作按钮</li>
                                <li>条形通知</li>
                            </ul>
                        </td>
                    </tr>
                    <tr>
                        <th>4</th>
                        <td>
                            <ul>
                                <li>应用栏</li>
                            </ul>
                        </td>
                    </tr>
                    <tr>
                        <th>3</th>
                        <td>
                            <ul>
                                <li>刷新指示器</li>
                            </ul>
                        </td>
                    </tr>
                    <tr>
                        <th>2</th>
                        <td>
                            <ul>
                                <li>卡片</li>
                                <li>悬浮按钮</li>
                                <li>搜索栏</li>
                            </ul>
                        </td>
                    </tr>
                    <tr>
                        <th>1</th>
                        <td>
                            <ul>
                                <li>开关</li>
                            </ul>
                        </td>
                    </tr>
                    <tr>
                        <th>0</th>
                        <td>
                            <ul>
                                <li>扁平按钮</li>
                                <li>工具栏（应用栏、搜索栏）</li>
                            </ul>
                        </td>
                    </tr>
                </tbody>
            </table>
        </Section>

        <Section>
            <Paragraphs>
                <h4>响应海拔与动态海拔差</h4>
                <p>部分组件会响应用户输入或系统事件而改变自身的海拔。其海拔的变化量即为固定的动态海拔差，以此确保同种组件在响应某种输入或事件时的海拔变化保持一致。</p>
                <p>一旦输入或事件中止、完成，组件应尽快回到静息海拔。</p>
            </Paragraphs>

            <table style="grid-column-end: var(--medium-content-span)">
                <thead>
                    <tr>
                        <th scope="col">海拔变化量（dp）</th>
                        <th scope="col">组件及状态</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th>+6</th>
                        <td>
                            <ul>
                                <li>浮动操作按钮（点按时）</li>
                                <li>卡片（点按时）</li>
                                <li>悬浮按钮（点按时）</li>
                            </ul>
                        </td>
                    </tr>
                    <tr>
                        <th>+4</th>
                        <td>
                            <ul>
                                <li>工具栏（滚动时解决层面冲突）</li>
                            </ul>
                        </td>
                    </tr>
                    <tr>
                        <th>+1</th>
                        <td>
                            <ul>
                                <li>搜索栏（滚动时解决层面冲突）</li>
                            </ul>
                        </td>
                    </tr>
                </tbody>
            </table>
            <Paragraphs>
                <p>具备响应海拔的组件在改变海拔时，有可能会被其他组件遮挡。要避免这些冲突，可以尝试改变组件的有无、位置或整个应用的布局。</p>
            </Paragraphs>
        </Section>
    </Article>

    <Divider />

    <Article>
        <h3 id="depicting-elevation">层叠表达</h3>
        <Section>
            <Paragraphs measure="medium">
                <h4>空间中的层次关系</h4>
                <p>Material层面海拔高度的差异导致阴影的差异。虚拟光源发射的光线受到固体Material层面的阻挡投下阴影，为界面层次结构和元素运动方向提供了重要的视觉线索，即使对于不具有覆盖关系的层面也能表达出它们的层级关系。此外，层面之间的明暗对比程度同样影响了层面层次的区分。</p>
            </Paragraphs>

            <Figure>
                <D7855 id="without-shadow" />
                <Figcaption sign="dont">
                    <p>由于缺少阴影的指示，无法断定层面之间是否相互分离。</p>
                </Figcaption>
            </Figure>

            <Figure>
                <D7855 id="similar-shadow" />
                <Figcaption sign="dont">
                    <p>元素层叠却具有相同的阴影。</p>
                </Figcaption>
            </Figure>

            <Figure>
                <D7855 id="distinguishable-shadow" />
                <Figcaption sign="do">
                    <p>根据具体层面层级，施加符合对应层级的阴影。</p>
                </Figcaption>
            </Figure>

            <Paragraphs measure="medium">
                <p>在运动中，阴影也为理解元素尺寸及海拔变化提供了正确指导。</p>
            </Paragraphs>

            <Figure>
                <D7ECC id="motion-without-shadow" />
                <Figcaption sign="dont">
                    <p>由于缺少阴影的指示，无法看出层面是在改变层级还只是在改变面积。</p>
                </Figcaption>
            </Figure>

            <Figure>
                <D7ECC id="motion-different-shadow" />
                <Figcaption sign="do">
                    <p>阴影的变化指示了层级的变化。</p>
                </Figcaption>
            </Figure>

            <Figure>
                <D7ECC id="motion-same-shadow" />
                <Figcaption sign="do">
                    <p>相同的阴影指示了不变的相对高度和变化的面积。</p>
                </Figcaption>
            </Figure>
        </Section>

        <Section>
            <Paragraphs>
                <h4>平面中的层次关系</h4>
                <p>在平面中，元素交织在一起时，它们各自的显示完整程度能体现想象的覆盖关系。但这种利用可见性的遮盖假象通常不能指示元素间的海拔高度差。</p>
                <p>Material的性质决定平面中元素的边缘仅能通过颜色的对比来显示。因此在平面中，交织元素的边缘需有足够的色彩对比度来帮助用户进行区分。</p>
            </Paragraphs>

            <Figure>
                <D0873 id="color-overlap" />
                <Figcaption>
                    <p>清除效果在平面中“遮盖”了运算式与结果。</p>
                </Figcaption>
            </Figure>

            <Figure>
                <D6228 id="text-overlap" />
                <Figcaption>
                    <p>同一平面中的文字与图标“遮盖”了图像。</p>
                </Figcaption>
            </Figure>

            <Paragraphs>
                <p>内容的运动方式也为符合预期地理解层次关系提供指导。</p>
            </Paragraphs>

            <Figure>
                <DU87H id="parallax" />
                <Figcaption>
                    <p>界面元素运动产生的视差提供纵深感。</p>
                </Figcaption>
            </Figure>
        </Section>
    </Article>

    <Divider />

    <Article id="object-relationships">
        <h3>部分与整体</h3>
        <Paragraphs>
            <p>除了视觉上的层次关系，各元素还具有组织上的层次关系，即相对的部分与整体关系。这种关系约束着元素的运动，决定元素之间运动共性的强弱，也决定着视觉上层次关系的处理方式。</p>
            <p>部分与整体的关系同时也是一种上下级关系，所有的元素都可以视为界面中的一个部分，而多个元素组成的整体又能是上一级整体的部分，一个整体的直接下属部分具有同级关系。</p>
            <p>部分可以继承整体的可变属性，如位置、旋转角度、大小或空间层级。</p>
        </Paragraphs>

        <Figure>
            <D2FK9 id="relative-static" />
            <Figcaption>
                <p>或独立或联合，或静止或运动，或远离或贴近，多个元素之间呈现出多种多样的相对关系。</p>
            </Figcaption>
        </Figure>
    </Article>
</template>
