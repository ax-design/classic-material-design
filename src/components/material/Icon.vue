<script setup lang="ts">
interface Props {
    name: string;
    size?: "small" | "medium" | "large";
    variant?: string;
}

import { computed } from "vue";

const { name, variant = "system", size = "medium" } = defineProps<Props>();

// class Point {
//     readonly x: number;
//     readonly y: number;

//     constructor(x: number, y: number, origin: Point = { x: 12, y: 12 }) {
//         this.x = x;
//         this.y = -y;
//     }
// }

// function getLineParams(p1: Point, p2: Point) {
//     const A = p2.y - p1.y;
//     const B = p1.x - p2.x;
//     const C = p2.x * p1.y - p1.x * p2.y;
//     const slope = -A / B;
//     const yIntercept = -C / B;

//     return { A, B, C, slope, yIntercept };
// }

// function getParallelLineDistance(o, p1, p2, p3, p4) {
//     p1 = [p1[0] - o[0], o[1] - p1[1]];
//     p2 = [p2[0] - o[0], o[1] - p2[1]];
//     p3 = [p3[0] - o[0], o[1] - p3[1]];
//     p4 = [p4[0] - o[0], o[1] - p4[1]];

//     const A = p2[1] - p1[1];
//     const B = p1[0] - p2[0];
//     const C1 = p2[0] * p1[1] - p1[0] * p2[1];
//     const C2 = p4[0] * p3[1] - p3[0] * p4[1];

//     const d = Math.abs(C1 - C2) / Math.hypot(A, B);

//     return d;
// }

// function getCircle(o, p1, p2, p3) {
//     p1 = [p1[0] - o[0], o[1] - p1[1]];
//     p2 = [p2[0] - o[0], o[1] - p2[1]];
//     p3 = [p3[0] - o[0], o[1] - p3[1]];

//     const a = p1[0] - p2[0];
//     const b = p1[1] - p2[1];
//     const c = p1[0] - p3[0];
//     const d = p1[1] - p3[1];
//     const e = ((Math.pow(p1[0], 2) - Math.pow(p2[0], 2)) - (Math.pow(p2[1], 2) - Math.pow(p1[1], 2))) / 2;
//     const f = ((Math.pow(p1[0], 2) - Math.pow(p3[0], 2)) - (Math.pow(p3[1], 2) - Math.pow(p1[1], 2))) / 2;

//     const x = -(d * e - b * f) / (b * c - a * d);
//     const y = -(a * f - c * e) / (b * c - a * d);
//     const radius = Math.hypot(p1[0] - x, p1[1] - y);

//     return [x + o[0], o[1] - y, radius];
// }

// function getLineLineIntersection(o, p1, p2, p3, p4) {
//     p1 = [p1[0] - o[0], o[1] - p1[1]];
//     p2 = [p2[0] - o[0], o[1] - p2[1]];
//     p3 = [p3[0] - o[0], o[1] - p3[1]];
//     p4 = [p4[0] - o[0], o[1] - p4[1]];

//     const A1 = p2[1] - p1[1];
//     const B1 = p1[0] - p2[0];
//     const C1 = p2[0] * p1[1] - p1[0] * p2[1];
//     const A2 = p4[1] - p3[1];
//     const B2 = p3[0] - p4[0];
//     const C2 = p4[0] * p3[1] - p3[0] * p4[1];

//     const x = (B1 * C2 - B2 * C1) / (B2 * A1 - B1 * A2);
//     const y = (A1 * C2 - C1 * A2) / (B1 * A2 - A1 * B2);

//     return [x + o[0], o[1] - y];
// }

// function getCirclePointTangentPoint(o, c, r, p) {
//     c = [c[0] - o[0], o[1] - c[1]];
//     p = [p[0] - o[0], o[1] - p[1]];

//     const b = Math.hypot(p[0] - c[0], p[1] - c[1]);
//     const th = Math.acos(r / b);
//     const d = Math.atan2(p[1] - c[1], p[0] - c[0]);

//     const x1 = c[0] + r * Math.cos(d + th);
//     const y1 = c[1] + r * Math.sin(d + th);
//     const x2 = c[0] + r * Math.cos(d - th);
//     const y2 = c[1] + r * Math.sin(d - th);

//     return [[x1 + o[0], o[1] - y1], [x2 + o[0], o[1] - y2]];
// }

// function getCircleLineIntersection(o, r, p1, p2) {
//     p1 = [p1[0] - o[0], o[1] - p1[1]];
//     p2 = [p2[0] - o[0], o[1] - p2[1]];

//     const dx = p2[0] - p1[0];
//     const dy = p2[1] - p1[1];
//     const dr = Math.hypot(dx, dy);
//     const D = p1[0] * p2[1] - p2[0] * p1[1];
//     const sdy = dy < 0 ? -1 : 1;

//     const x1 = (D * dy + sdy * dx * Math.sqrt(Math.pow(r, 2) * Math.pow(dr, 2) - Math.pow(D, 2))) / Math.pow(dr, 2);
//     const y1 = (-D * dx + Math.abs(dy) * Math.sqrt(Math.pow(r, 2) * Math.pow(dr, 2) - Math.pow(D, 2))) / Math.pow(dr, 2);
//     const x2 = (D * dy - sdy * dx * Math.sqrt(Math.pow(r, 2) * Math.pow(dr, 2) - Math.pow(D, 2))) / Math.pow(dr, 2);
//     const y2 = (-D * dx - Math.abs(dy) * Math.sqrt(Math.pow(r, 2) * Math.pow(dr, 2) - Math.pow(D, 2))) / Math.pow(dr, 2);

//     return [[x1 + o[0], o[1] - y1], [x2 + o[0], o[1] - y2]];
// }

// function getCircleCircleIntersection(o, c1, c2, r1, r2) {
//     c1 = [c1[0] - o[0], o[1] - c1[1]];
//     c2 = [c2[0] - o[0], o[1] - c2[1]];

//     const d = Math.hypot(c1[0] - c2[0], c1[1] - c2[1]);
//     const l = (Math.pow(r1, 2) - Math.pow(r2, 2) + Math.pow(d, 2)) / (2 * d);
//     const h = Math.sqrt(Math.pow(r1, 2) - Math.pow(l, 2));

//     const x1 = l / d * (c2[0] - c1[0]) + h / d * (c2[1] - c1[1]) + c1[0];
//     const y1 = l / d * (c2[1] - c1[1]) - h / d * (c2[0] - c1[0]) + c1[1];
//     const x2 = l / d * (c2[0] - c1[0]) - h / d * (c2[1] - c1[1]) + c1[0];
//     const y2 = l / d * (c2[1] - c1[1]) + h / d * (c2[0] - c1[0]) + c1[1];

//     return [[x1 + o[0], o[1] - y1], [x2 + o[0], o[1] - y2]];
// }

// function getEllipseLineIntersection(o, a, b, p1, p2) {
//     const lk = getLine(o, p1, p2)[3];
//     const lb = getLine(o, p1, p2)[4];

//     p1 = [p1[0] - o[0], o[1] - p1[1]];
//     p2 = [p2[0] - o[0], o[1] - p2[1]];

//     const A = Math.pow(b, 2) + Math.pow(a, 2) * Math.pow(lk, 2);
//     const B = 2 * lk * Math.pow(a, 2) * lb;
//     const C = Math.pow(a, 2) * Math.pow(lb, 2) - Math.pow(a, 2) * Math.pow(b, 2);

//     const x1 = (-B + Math.sqrt(Math.pow(B, 2) - 4 * A * C)) / (2 * A);
//     const y1 = lk * x1 + lb;
//     const x2 = (-B - Math.sqrt(Math.pow(B, 2) - 4 * A * C)) / (2 * A);
//     const y2 = lk * x2 + lb;

//     return [[x1 + o[0], o[1] - y1], [x2 + o[0], o[1] - y2]];
// }

const ICON_SIZES = {
    small: 18,
    medium: 24,
    large: 36,
} as const;

const VERTICAL_ICONS = ["chevron_left", "chevron_right", "more_vert"];
const HORIZONTAL_ICONS = ["expand_less", "expand_more", "more_horiz"];

const dimensions = computed(() => {
    const baseDimension = ICON_SIZES[size];

    if (VERTICAL_ICONS.includes(name)) {
        return { width: baseDimension / 2, height: baseDimension };
    } else if (name in HORIZONTAL_ICONS) {
        return { width: baseDimension, height: baseDimension / 2 };
    }

    return { width: baseDimension, height: baseDimension };
});

const viewBox = `0 0 ${dimensions.value.width} ${dimensions.value.height}`;
const ratio = dimensions.value.width / dimensions.value.height;

const getSystemIconContent = (name: string, size: string): string => {
    switch (name) {
        case "access_time": {
            const angle = Math.atan(6 / 10);
            const d = Math.abs((8 - 11) * 12.5 + (11 - 16) * 11.75 + (16 * 11 - 11 * 8)) / Math.hypot(8 - 11, 11 - 16);
            return `
                <circle fill="none" stroke="currentColor" stroke-width="2" cx="12" cy="12" r="9" />
                <path d="
                    M 12.5 7
                    V 12.25
                    L 17 ${12.25 + ((17 - 12.5) * 6) / 10}
                    L ${17 - d * Math.sin(angle)} ${12.25 + (4.5 * 6) / 10 + d * Math.cos(angle)}
                    L 11 13
                    V 7
                    Z
                "/>
            `;
        }
        case "add": {
            return `
                <defs>
                    <mask id="5c81cd66">
                        <rect fill="white" x="5" y="11" width="14" height="2"/>
                        <rect fill="white" x="11" y="5" width="2" height="14"/>
                    </mask>
                </defs>
                <rect width="100%" height="100%" mask="url(#5c81cd66)"/>
            `;
        }
        case "add_circle": {
            return `
                <defs>
                    <mask id="dcfb4c34">
                        <circle fill="none" stroke="white" stroke-width="2" cx="12" cy="12" r="9" />
                        <rect fill="white" x="11" y="7" width="2" height="10"/>
                        <rect fill="white" x="7" y="11" width="10" height="2"/>
                    </mask>
                </defs>
                <rect width="100%" height="100%" mask="url(#dcfb4c34)"/>
            `;
        }
        case "alarm": {
            const buttonAssistAngele = (50 / 180) * Math.PI;
            const buttonAssistPointA = [12 - 12 * Math.cos(buttonAssistAngele), 13 - 12 * Math.sin(buttonAssistAngele)];
            const buttonAssistPointB = [12 - 10 * Math.cos(buttonAssistAngele), 13 - 10 * Math.sin(buttonAssistAngele)];
            const buttonAssistDistance = (buttonAssistPointA[0] - 2) / Math.tan(buttonAssistAngele);
            const pointerAssistAngle = Math.atan(6 / 10);
            const pointerAssistDistance = Math.abs((8 - 11) * 12.5 + (11 - 16) * 11.75 + (16 * 11 - 11 * 8)) / Math.hypot(8 - 11, 11 - 16);
            return `
                <defs>
                    <polygon id="button" points="
                        ${2},${buttonAssistPointA[1] + buttonAssistDistance}
                        ${buttonAssistPointA[0] + (buttonAssistPointA[0] - 2)},${buttonAssistPointA[1] - buttonAssistDistance}
                        ${buttonAssistPointB[0] + (buttonAssistPointA[0] - 2)},${buttonAssistPointB[1] - buttonAssistDistance}
                        ${buttonAssistPointB[0] - (buttonAssistPointA[0] - 2)},${buttonAssistPointB[1] + buttonAssistDistance}
                    "/>
                </defs>
                <use href="#button"/>
                <use href="#button" transform-origin="center 13" transform="rotate(80)"/>
                <circle fill="none" stroke="currentColor" stroke-width="2" cx="12" cy="13" r="8" />
                <path d="M 12.5 8 V 13.25 L 16.5 ${13.25 + ((16.5 - 12.5) * 6) / 10} L ${16.5 - pointerAssistDistance * Math.sin(pointerAssistAngle)} ${13.25 + ((16.5 - 12.5) * 6) / 10 + pointerAssistDistance * Math.cos(pointerAssistAngle)} L 11 14 V 8 Z"/>
            `;
        }
        case "arrow_back": {
            return `
                <defs>
                    <mask id="65d3c9bc">
                        <g transform-origin="center" transform="rotate(-135)">
                            <polygon fill="white" points="12,4 20,12 12,20 4,12" transform-origin="center" transform="rotate(45)"/>
                            <g transform="translate(-2 2)">
                                <polygon fill="black" points="12,4 20,12 12,20 4,12" transform-origin="center" transform="rotate(45)"/>
                            </g>
                       </g>
                       <rect fill="white" x="4" y="11" width="15" height="2"/>
                    </mask>
                </defs>
                <rect width="100%" height="100%" mask="url(#65d3c9bc)"/>
            `;
        }
        case "arrow_back_system": {
            const radius = 1.5;
            const borderWidth = 2;
            const A = [4 + radius, 12];
            const B = [20 - radius, A[1] - (18.5 - 5.5) * Math.tan(Math.PI / 6)];
            const C = [20 - radius, A[1] + (18.5 - 5.5) * Math.tan(Math.PI / 6)];
            return `
                <defs>
                    <mask id="4b3b0d70">
                        <path fill="white" d="
                            M ${C[0] + radius} ${C[1]}
                            A ${radius} ${radius} 0 0 1 ${C[0] - radius * Math.sin(Math.PI / 6)} ${C[1] + radius * Math.cos(Math.PI / 6)}
                            L ${A[0] - radius * Math.sin(Math.PI / 6)} ${A[1] + radius * Math.cos(Math.PI / 6)}
                            A ${radius} ${radius} 0 0 1 ${A[0] - radius * Math.sin(Math.PI / 6)} ${A[1] - radius * Math.cos(Math.PI / 6)}
                            L ${B[0] - radius * Math.sin(Math.PI / 6)} ${B[1] - radius * Math.cos(Math.PI / 6)}
                            A ${radius} ${radius} 0 0 1 ${B[0] + radius} ${B[1]}
                            Z
                        "/>
                        <polygon fill="black" points="
                            ${A[0] + borderWidth * Math.cos(Math.PI / 3)} ${A[1]}
                            ${B[0] + radius - borderWidth} ${B[1] + (borderWidth - radius) * Math.tan(Math.PI / 3)}
                            ${C[0] + radius - borderWidth} ${C[1] - (borderWidth - radius) * Math.tan(Math.PI / 3)}
                        "/>
                    </mask>
                </defs>
                <rect width="100%" height="100%" mask="url(#4b3b0d70)"/>
            `;
        }
        case "arrow_drop_down": {
            return `
                <polygon points="7,10 17,10 12,15"/>
            `;
        }
        case "arrow_drop_up": {
            return `
                <polygon points="7,14 12,9 17,14"/>
            `;
        }
        case "arrow_forward": {
            return `
                <defs>
                    <mask id="09d5b399">
                        <g transform-origin="center" transform="rotate(45)">
                            <polygon fill="white" points="12,4 20,12 12,20 4,12" transform-origin="center" transform="rotate(45)"/>
                            <g transform="translate(-2 2)">
                                <polygon fill="black" points="12,4 20,12 12,20 4,12" transform-origin="center" transform="rotate(45)"/>
                            </g>
                       </g>
                       <rect fill="white" x="4" y="11" width="15" height="2"/>
                    </mask>
                </defs>
                <rect width="100%" height="100%" mask="url(#09d5b399)"/>
            `;
        }
        case "backspace": {
            const radius = 2;
            const A = [0, 12];
            const B = [6, 3];
            const C = [24, 3];
            const D = [24, 21];
            const E = [6, 21];
            const F = [9, 7];
            const G = [19, 7];
            const H = [19, 17];
            const I = [9, 17];
            const a = Math.pow(Math.pow(C[0] - B[0], 2) + Math.pow(C[1] - B[1], 2), 0.5);
            const c = Math.pow(Math.pow(A[0] - B[0], 2) + Math.pow(A[1] - B[1], 2), 0.5);
            const angle = Math.acos(((A[0] - B[0]) * (C[0] - B[0]) + (A[1] - B[1]) * (C[1] - B[1])) / (a * c));
            const assistL1 = 2 * Math.sin(Math.PI / 4);
            const assistL2 = (G[0] - F[0]) / 2 - assistL1;
            return `
                <defs>
                    <mask id="228bf65a">
                        <path fill="white" d="
                            M ${A[0]} ${A[1]}
                            L ${B[0] - (Math.cos(Math.PI - angle) * radius) / Math.tan(angle / 2)} ${B[1] + (Math.sin(Math.PI - angle) * radius) / Math.tan(angle / 2)}
                            A ${radius} ${radius} 0 0 1 ${B[0] + radius / Math.tan(angle / 2)} ${B[1]}
                            L ${C[0] - radius} ${C[1]}
                            A ${radius} ${radius} 0 0 1 ${C[0]} ${C[1] + radius}
                            L ${D[0]} ${D[1] - radius}
                            A ${radius} ${radius} 0 0 1 ${D[0] - radius} ${D[1]}
                            L ${E[0] + radius / Math.tan(angle / 2)} ${E[1]}
                            A ${radius} ${radius} 0 0 1 ${E[0] - (Math.cos(Math.PI - angle) * radius) / Math.tan(angle / 2)} ${E[1] - (Math.sin(Math.PI - angle) * radius) / Math.tan(angle / 2)}
                            Z
                        "/>
                        <polygon fill="black" points="
                            ${F[0]},${F[1] + assistL1}
                            ${F[0] + assistL1},${F[1]}
                            ${F[0] + (G[0] - F[0]) / 2},${F[1] + assistL2}
                            ${G[0] - assistL1},${G[1]}
                            ${G[0]},${G[1] + assistL1}
                            ${G[0] - assistL2},${G[1] + (H[1] - G[1]) / 2}
                            ${H[0]},${H[1] - assistL1}
                            ${H[0] - assistL1},${H[1]}
                            ${H[0] - (H[0] - I[0]) / 2},${H[1] - assistL2}
                            ${I[0] + assistL1},${I[1]}
                            ${I[0]},${I[1] - assistL1}
                            ${I[0] + assistL2},${I[1] - (I[1] - F[1]) / 2}
                        "/>
                    </mask>
                </defs>
                <rect width="100%" height="100%" mask="url(#228bf65a)"/>
            `;
        }
        case "basil_egg_free": {
            return `
                <path fill="#356859" clip-path="url(#left-clip-path)" d="M13.58473,7.94115c.25556,0,.46421,.04565,.62015,.13569,.34116,.19696,.62795,.73117,.76716,1.42899,.29832,1.49536-.11685,3.3542-1.00961,4.52037-.76419,.99822-2.28287,2.03074-3.50156,2.03074-.29207,0-.53935-.0608-.75599-.18587-1.11121-.64157-1.19793-3.00473-.53107-4.60959,.78965-1.90036,2.98003-3.32033,4.41092-3.32033m0-1.75c-2.2026,0-4.98854,1.89977-6.02696,4.39882-.88304,2.12511-.86721,5.5615,1.27211,6.79664,.50689,.29265,1.06159,.42033,1.63099,.42033,1.83376,0,3.8237-1.32264,4.89112-2.71697,2.05288-2.68157,1.9368-7.25337-.27211-8.52868-.43884-.25337-.94907-.37014-1.49515-.37014h0Z"/>
	            <line stroke="#FD5523" stroke-width="2" x1="12" y1="3" x2="12" y2="21" transform-origin="center" transform="rotate(120)"/>
	            <circle fill="none" stroke="#FD5523" stroke-width="2" cx="12" cy="12" r="9"/>
            `;
        }
        case "basil_expand_more": {
            return `
                <polyline fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round" stroke-linecap="round" points="5,12 12,15.5 19,12"/>
            `;
        }
        case "basil_gluten_free": {
            return `
                <defs>
                    <clipPath id="left-clip-path">
                        <rect width="12" height="24"/>
                    </clipPath>
                    <clipPath id="right-clip-path">
                        <rect x="12" width="12" height="24"/>
                    </clipPath>
                </defs>
                <path fill="#356859" clip-path="url(#left-clip-path)" d="M8.8470497,13.347085c0.6848202,0.1180458,1.3138351,0.4862852,1.7416878,1.0342798 c0.2872391,0.3678885,0.4702549,0.7977514,0.544714,1.2653522c-0.926096-0.1486015-1.4834557-0.7108355-1.7502737-1.0657825 C9.1038179,14.2093019,8.9232025,13.7875996,8.8470497,13.347085 M8.3703394,11.3061895 c-0.4499183,0.0000124-0.9101977,0.0623455-1.3703418,0.1938152c-0.8800321,3.0419922,1.3371043,6.1837187,4.6076121,6.1837187 c0.4462156,0,0.9121513-0.058506,1.3923874-0.1837196C13.8685274,14.0258837,11.3426418,11.3061075,8.3703394,11.3061895 L8.3703394,11.3061895z"/>
                <path fill="#356859" clip-path="url(#right-clip-path)" d="M15.1325169,13.3470974c-0.076169,0.4404573-0.2567997,0.8622494-0.5361261,1.2338371 c-0.2668371,0.3549728-0.8241053,0.9172363-1.7503185,1.0657902c0.0744438-0.4676065,0.2574501-0.8975172,0.5446692-1.2653799 C13.818593,13.8333673,14.4475908,13.4651423,15.1325169,13.3470974 M15.6092291,11.3061895 c-2.9723024,0-5.498188,2.7196941-4.6296577,6.1938143c0.4802361,0.1252136,0.9461718,0.1837196,1.3923874,0.1837196 c3.2705078,0,5.4876432-3.1417265,4.6076117-6.1837187C16.5194263,11.368535,16.0591469,11.3061895,15.6092291,11.3061895 L15.6092291,11.3061895z"/>
                <path fill="#356859" d="M8.6235676,7.6277809c0.6006918,0.0273294,1.1089859,0.256423,1.550602,0.6980495 c0.5119133,0.5119076,0.6749697,1.0815792,0.7022629,1.5463886c-0.6006918-0.0273294-1.1089859-0.256423-1.550602-0.6980495 C8.8139172,8.662262,8.6508608,8.0925903,8.6235676,7.6277809 M8.5,5.75C7.625,5.75,7,6,7,6s-1,2.5,1,4.5c1,1,2.125,1.25,3,1.25 s1.5-0.25,1.5-0.25s1-2.5-1-4.5C10.5,6,9.375,5.75,8.5,5.75L8.5,5.75z"/>
                <path fill="#356859" d="M15.375061,7.6278434c-0.0266609,0.4672885-0.1901388,1.0355792-0.7008915,1.5463262 c-0.4412708,0.4412813-0.9491529,0.6703634-1.5492306,0.6979866c0.0266609-0.467288,0.1901388-1.0355787,0.7008915-1.5463257 C14.2671013,7.8845491,14.7749834,7.655467,15.375061,7.6278434 M15.5,5.75c-0.875,0-2,0.25-3,1.25c-2,2-1,4.5-1,4.5 s0.625,0.25,1.5,0.25s2-0.25,3-1.25c2-2,1-4.5,1-4.5S16.375,5.75,15.5,5.75L15.5,5.75z"/>
                <rect fill="#356859" x="11" y="16.5" width="2" height="4.5"/>
	            <rect fill="#356859" x="10" y="11" width="4" height="2"/>
	            <line stroke="#FD5523" stroke-width="2" x1="12" y1="3" x2="12" y2="21" transform-origin="center" transform="rotate(120)"/>
	            <circle fill="none" stroke="#FD5523" stroke-width="2" cx="12" cy="12" r="9"/>
                <path fill="#356859" d="M12,3.4638717C12.2686777,3.802628,12.5,4.2980838,12.5,5 c0,0.7040305-0.2327261,1.2003646-0.4987745,1.5376725C11.7320538,6.1988802,11.5,5.7029276,11.5,5 C11.5,4.2980838,11.7313223,3.802628,12,3.4638717 M12,1c0,0-2.5,1-2.5,4S12,9,12,9s2.5-1,2.5-4S12,1,12,1L12,1z"/>
            `;
        }
        case "battery_full_alt": {
            return `
                <polygon points="
                    7.5,2
                    10.5,2
                    10.5,3
                    13.5,3
                    13.5,16
                    4.5,16
                    4.5,3
                    7.5,3
                "/>
            `;
        }
        case "brightness_6": {
            return `
                <defs>
                    <mask id="062eeacd">
                        <rect x="4" y="4" width="16" height="16" fill="white"/>
                        <rect x="4" y="4" width="16" height="16" fill="white" transform="rotate(45)" transform-origin="center"/>
                        <path fill="black" d="
                            M 12 6
                            A 6 6 0 0 1 12 18
                            Z
                        "/>
                    </mask>
                </defs>
                <rect width="100%" height="100%" mask="url(#062eeacd)"/>
            `;
        }
        case "bluetooth": {
            return `
                <defs>
                    <clipPath id="left-top-clip-path">
                        <polygon points="0,0 24,0 0,24"/>
                    </clipPath>
                    <clipPath id="left-bottom-clip-path">
                        <polygon points="24,24 0,0 0,24"/>
                    </clipPath>
                    <mask id="79e22862">
                        <polygon fill="none" stroke="white" stroke-width="4" clip-path="url(#left-top-clip-path)" points="10,0 24,0 24,14"/>
                        <polygon fill="none" stroke="white" stroke-width="4" clip-path="url(#left-bottom-clip-path)" points="10,24 24,24 24,10"/>
                        <polygon fill="none" stroke="white" stroke-width="2" points="28,-4 28,28 -4,28"/>
                        <polygon fill="none" stroke="white" stroke-width="2" points="-4,-4 28,28 28,-4"/>
                        <rect x="6" width="5" height="4" fill="black" />
                        <rect x="6" y="19" width="5" height="4" fill="black" />
                        <rect x="11" width="2" height="100%" fill="white" />
                        <polygon fill="black" points="10,0 24,0 24,14"/>
                        <polygon fill="black" points="10,24 24,24 24,10"/>
                        <polygon fill="black" stroke="black" stroke-width="2" points="10,0 0,0 0,10"/>
                        <polygon fill="black" stroke="black" stroke-width="2" points="10,24 0,24 0,14"/>
                        <rect width="100%" height="100%" fill="none" stroke="black" stroke-width="4" />
                    </mask>
                </defs>
                <rect width="100%" height="100%" mask="url(#79e22862)"/>
            `;
        }
        case "call": {
            const borderRadius = 1;
            const outerRadius = 17;
            const innerRadius = 11.5;
            const assistA = [16, 0];
            const assistB = [assistA[0] + Math.cos(Math.PI / 4), assistA[1] + Math.sin(Math.PI / 4)];
            const assistC = [24, 8];
            const assistD = [assistC[0] - Math.cos(Math.PI / 4), assistC[1] - Math.sin(Math.PI / 4)];
            const assistL1 = Math.sqrt(Math.pow(innerRadius + 1, 2) - (Math.pow(4, 2) + Math.pow(4, 2)));
            const assistL2 = Math.sqrt(Math.pow(outerRadius - 2, 2) - Math.pow(Math.sqrt(Math.pow(4, 2) + Math.pow(4, 2)) - 1, 2));
            const O = [20, 4];
            const A = [7.5, 4];
            const B = [assistA[0] - assistL1 * Math.cos(Math.PI / 4), assistA[1] + assistL1 * Math.sin(Math.PI / 4)];
            const C = [assistC[0] - assistL1 * Math.cos(Math.PI / 4), assistC[1] + assistL1 * Math.sin(Math.PI / 4)];
            const D = [20, 16.5];
            const E = [20, 20];
            const F = [4, 4];
            return `
                <path d="
                    M ${A[0]} ${A[1] - borderRadius}
                    A ${borderRadius} ${borderRadius} 0 0 1 ${A[0] + borderRadius} ${A[1]}
                    A ${innerRadius} ${innerRadius} 0 0 0 ${O[0] - ((O[0] - B[0]) * innerRadius) / (innerRadius + borderRadius)} ${((B[1] - O[1]) * innerRadius) / (innerRadius + borderRadius) + O[1]}
                    A ${borderRadius} ${borderRadius} 0 0 1 ${B[0] + borderRadius * Math.cos(Math.PI / 4)} ${B[1] + borderRadius * Math.sin(Math.PI / 4)}
                    L ${assistB[0] - Math.cos(Math.PI / 4) * assistL2} ${assistB[1] + Math.sin(Math.PI / 4) * assistL2}
                    A ${outerRadius - 2} ${outerRadius - 2} 0 0 0 ${assistD[0] - Math.cos(Math.PI / 4) * assistL2} ${assistD[1] + Math.sin(Math.PI / 4) * assistL2}
                    L ${C[0] - borderRadius * Math.cos(Math.PI / 4)} ${C[1] - borderRadius * Math.sin(Math.PI / 4)}
                    A ${borderRadius} ${borderRadius} 0 0 1 ${O[0] - ((O[0] - C[0]) * innerRadius) / (innerRadius + borderRadius)} ${((C[1] - O[1]) * innerRadius) / (innerRadius + borderRadius) + O[1]}
                    A ${innerRadius} ${innerRadius} 0 0 0 ${D[0]} ${D[1] - borderRadius}
                    A ${borderRadius} ${borderRadius} 0 0 1 ${D[0] + borderRadius} ${D[1]}
                    L ${E[0] + borderRadius} ${E[1]}
                    A ${borderRadius} ${borderRadius} 0 0 1 ${E[0]} ${E[0] + borderRadius}
                    A ${outerRadius} ${outerRadius} 0 0 1 ${F[0] - borderRadius} ${F[1]}
                    A ${borderRadius} ${borderRadius} 0 0 1 ${F[1]} ${F[1] - borderRadius}
                    Z
                "/>
            `;
        }
        case "call_made": {
            return `
                <mask id="3ca043e2">
                    <line stroke="white" stroke-width="1.5" x1="6" y1="3.75" x2="15" y2="3.75"/>
                    <line stroke="white" stroke-width="1.5" x1="14.25" y1="3" x2="14.25" y2="12"/>
                    <line stroke="white" stroke-width="1.5" x1="14.5" y1="3.5" x2="3.75" y2="14.25"/>
                </mask>
                <rect width="100%" height="100%" mask="url(#3ca043e2)"/>
            `;
        }
        case "call_received": {
            return `
                <mask id="50e177a0">
                    <line stroke="white" stroke-width="1.5" x1="3.75" y1="6" x2="3.75" y2="15"/>
                    <line stroke="white" stroke-width="1.5" x1="3" y1="14.25" x2="12" y2="14.25"/>
                    <line stroke="white" stroke-width="1.5" x1="14.5" y1="3.5" x2="3.75" y2="14.25"/>
                </mask>
                <rect width="100%" height="100%" mask="url(#50e177a0)"/>
            `;
        }
        case "camera_alt": {
            return `
                <defs>
                    <mask id="15761c88">
                        <rect fill="white" x="2" y="4" width="20" height="16" rx="2" ry="2"/>
                        <polygon fill="white" points="9,2 15,2 17,4 7,4 "/>
                        <circle fill="none" stroke="black" stroke-width="2" cx="12" cy="12" r="4" />
                    </mask>
                </defs>
                <rect width="100%" height="100%" mask="url(#15761c88)"/>
            `;
        }
        case "check": {
            const strokeWidth = 2;
            const A = [9, 19];
            const B = [21, 7];
            const C = [B[0] - Math.sqrt(strokeWidth), B[1] - Math.sqrt(strokeWidth)];
            const D = [A[0], A[1] - Math.hypot(strokeWidth, strokeWidth)];
            const E = [D[0] - (D[1] - 12), 12];
            const F = [E[0] - Math.sqrt(strokeWidth), E[1] + Math.sqrt(strokeWidth)];
            return `
                <polygon points="
                    ${A[0]},${A[1]}
                    ${B[0]},${B[1]}
                    ${C[0]},${C[1]}
                    ${D[0]},${D[1]}
                    ${E[0]},${E[1]}
                    ${F[0]},${F[1]}
                "/>
            `;
        }
        case "check_box_outline_blank": {
            return `
                <defs>
                    <mask id="50c64bbc">
                        <rect fill="white" x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                        <rect fill="black" x="5" y="5" width="14" height="14"/>
                    </mask>
                </defs>
                <rect width="100%" height="100%" mask="url(#50c64bbc)"/>
            `;
        }
        case "chevron_left": {
            switch (size) {
                case "small": {
                    return `
                        <polygon points="
                            1.5,9
                            6,4.5
                            ${6 + 1.5 * Math.cos(Math.PI / 4)},${4.5 + 1.5 * Math.sin(Math.PI / 4)}
                            ${1 + 2 * 1.5 * Math.cos(Math.PI / 4)},9
                            ${6 + 1.5 * Math.cos(Math.PI / 4)},${13.5 - 1.5 * Math.sin(Math.PI / 4)}
                            6,13.5
                        "/>
                    `;
                }
                default: {
                    return `
                        <polygon points="
                            2,12
                            8,6
                            ${8 + 2 * Math.cos(Math.PI / 4)},${6 + 2 * Math.sin(Math.PI / 4)}
                            ${2 + 2 * 2 * Math.cos(Math.PI / 4)},12
                            ${8 + 2 * Math.cos(Math.PI / 4)},${18 - 2 * Math.sin(Math.PI / 4)}
                            8,18
                        "/>
                    `;
                }
            }
        }
        case "chevron_right": {
            return `
                <polygon points="
                    10,12
                    4,6
                    ${4 - 2 * Math.cos(Math.PI / 4)},${6 + 2 * Math.sin(Math.PI / 4)}
                    ${10 - 2 * 2 * Math.cos(Math.PI / 4)},12
                    ${4 - 2 * Math.cos(Math.PI / 4)},${18 - 2 * Math.sin(Math.PI / 4)}
                    4,18
                "/>
            `;
        }
        case "circle_home": {
            return `
                <circle fill="none" stroke="currentColor" stroke-width="2" cx="12" cy="12" r="8.25" />
            `;
        }
        case "close": {
            const offset = 12 - 5 - 1 * Math.sin(Math.PI / 4);
            return `
                <line stroke="currentColor" stroke-width="2" x1="${12 + offset}" y1="${12 - offset}" x2="${12 - offset}" y2="${12 + offset}"/>
                <line stroke="currentColor" stroke-width="2" x1="${12 - offset}" y1="${12 - offset}" x2="${12 + offset}" y2="${12 + offset}"/>
            `;
        }
        case "cloud_download": {
            return `
                <defs>
                    <mask id="803e3c76">
                        <circle fill="white" cx="6" cy="14" r="6"/>
                        <circle fill="white" cx="12" cy="11.5" r="7.5"/>
                        <circle fill="white" cx="19" cy="15" r="5"/>
                        <rect fill="white" x="6" y="18" width="13" height="2"/>
                        <polygon fill="black" points="10,9 14,9 14,13 17,13 12,18 7,13 10,13"/>
                    </mask>
                </defs>
                <rect width="100%" height="100%" mask="url(#803e3c76)"/>
            `;
        }
        case "dialpad": {
            return `
                <circle cx="6" cy="3" r="2"/>
                <circle cx="12" cy="3" r="2"/>
                <circle cx="18" cy="3" r="2"/>
                <circle cx="6" cy="9" r="2"/>
                <circle cx="12" cy="9" r="2"/>
                <circle cx="18" cy="9" r="2"/>
                <circle cx="6" cy="15" r="2"/>
                <circle cx="12" cy="15" r="2"/>
                <circle cx="18" cy="15" r="2"/>
                <circle cx="12" cy="21" r="2"/>
            `;
        }
        case "delete": {
            return `
                <defs>
                    <mask id="1e4b20ff">
                        <rect fill="white" x="6" y="4" width="12" height="17" rx="2" ry="2"/>
                        <rect fill="black" width="100%" height="7"/>
                        <polygon fill="white" points="14.5,3 15.5,4 19,4 19,6 5,6 5,4 8.5,4 9.5,3"/>
                    </mask>
                </defs>
                <rect width="100%" height="100%" mask="url(#1e4b20ff)"/>
            `;
        }
        // case "drafts": {
        //     const B = getCirclePointTangentPoint([12, 12], [20, 8], 2, [12, 1])[1];
        //     const I = getCirclePointTangentPoint([12, 12], [4, 8], 2, [12, 1])[0];
        //     const J = getLineLineIntersection([12, 12], [B[0], B[1] + 2], [12, 3], [20, 8], [12, 13]);
        //     const K = getLineLineIntersection([12, 12], [I[0], I[1] + 2], [12, 3], [4, 8], [12, 13]);
        //     return `
        //         <defs>
        //             <mask id="dc50ee03">
        //                 <path fill="white" d="
        //                     M 12 1
        //                     L ${B[0]} ${B[1]}
        //                     A 2 2 0 0 1 22 8
        //                     V 18
        //                     A 2 2 0 0 1 20 20
        //                     H 4
        //                     A 2 2 0 0 1 2 18
        //                     V 8
        //                     A 2 2 0 0 1 ${I[0]} ${I[1]}
        //                     Z
        //                 "/>
        //                 <polygon fill="black" points="
        //                     12,3
        //                     ${J[0]},${J[1]}
        //                     12,13
        //                     ${K[0]},${K[1]}
        //                 "/>
        //             </mask>
        //         </defs>
        //         <rect width="100%" height="100%" mask="url(#dc50ee03)"/>
        //     `;
        // }
        case "edit": {
            const radius = 1;
            return `
                <defs>
                    <mask id="d739c7c3">
                        <path fill="white" d="
                            M 3 21
                            L 3 17.25
                            L ${16.25 + radius * Math.sin(Math.PI / 4)} ${4 - radius * Math.sin(Math.PI / 4)}
                            A ${radius} ${radius} 0 0 1 ${16.25 + radius * Math.sin(Math.PI / 4) + radius / Math.sin(Math.PI / 4)} ${4 - radius * Math.sin(Math.PI / 4)}
                            L ${20 + radius * Math.sin(Math.PI / 4)} ${7.75 - radius * Math.sin(Math.PI / 4) - radius / Math.sin(Math.PI / 4)}
                            A ${radius} ${radius} 0 0 1 ${20 + radius * Math.sin(Math.PI / 4)} ${7.75 - radius * Math.sin(Math.PI / 4)}
                            L 6.75 21
                            Z
                        "/>
                        <rect fill="black" x="5" y="7" width="24" height="1.5" transform-origin="17 7" transform="rotate(45)"/>
                    </mask>
                </defs>
                <rect width="100%" height="100%" mask="url(#d739c7c3)"/>
            `;
        }
        case "expand_less": {
            return `
                <path d="
                    M 6 8
                    L 12 2
                    L 18 8
                    L ${18 - 2 * Math.cos(Math.PI / 4)} ${8 + 2 * Math.sin(Math.PI / 4)}
                    L 12 ${2 + 2 * Math.SQRT2}
                    L ${6 + 2 * Math.cos(Math.PI / 4)} ${8 + 2 * Math.sin(Math.PI / 4)}
                    Z
                "/>
            `;
        }
        case "expand_more": {
            return `
                <path d="
                    M ${6 + 2 * Math.cos(Math.PI / 4)} ${4 - 2 * Math.sin(Math.PI / 4)}
                    L 12 ${10 - 2 * Math.SQRT2}
                    L ${18 - 2 * Math.cos(Math.PI / 4)} ${4 - 2 * Math.sin(Math.PI / 4)}
                    L 18 4
                    L 12 10
                    L 6 4
                    Z
                "/>
            `;
        }
        case "favorite": {
            return `
                <path d="M 12 21.35 l -1.45 -1.315 C 5.4 15.36 2 12.275 2 8.5 C 2 5.415 4.415 3 7.5 3 c 1.74 0 3.41 0.81 4.5 2.085 C 13.09 3.81 14.76 3 16.5 3 c 3.085 0 5.5 2.415 5.5 5.5 c 0 3.775 -3.4 6.86 -8.55 11.535 L 12 21.35 z"/>
            `;
        }
        case "favorite_border": {
            return `
                <path d="M 16.5 3 c -1.74 0 -3.41 0.81 -4.5 2.085 C 10.91 3.81 9.24 3 7.5 3 C 4.415 3 2 5.415 2 8.5 c 0 3.775 3.4 6.86 8.55 11.535 L 12 21.35 l 1.45 -1.315 C 18.6 15.36 22 12.275 22 8.5 c 0 -3.085 -2.415 -5.5 -5.5 -5.5 z m -4.395 15.555 l -0.105 0.095 l -0.105 -0.095 C 7.14 14.24 4 11.39 4 8.5 c 0 -1.995 1.505 -3.5 3.5 -3.5 c 1.54 0 3.04 0.995 3.565 2.36 h 1.865 C 13.46 5.995 14.96 5 16.5 5 c 1.995 0 3.5 1.505 3.5 3.5 c 0 2.89 -3.14 5.74 -7.895 10.055 z"/>
            `;
        }
        case "hourglass": {
            return `
                <defs>
                    <polygon id="body" points="5,4 19,4 5,20 19,20"/>
                    <clipPath id="clip-path">
                        <use href="#body"/>
                    </clipPath>
                    <mask id="747406c7">
                        <rect fill="white" x="4" y="12" width="16" height="7" clip-path="url(#clip-path)"/>
                        <use href="#body" fill="none" stroke="white" stroke-width="2" stroke-linejoin="round"/>
                    </mask>
                </defs>
                <rect width="100%" height="100%" mask="url(#747406c7)"/>
            `;
        }
        case "inbox": {
            return `
                <defs>
                    <mask id="ec12f26a">
                        <rect fill="white" x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                        <rect fill="black" x="5" y="5" width="14" height="10"/>
                        <circle fill="black" cx="12" cy="15" r="3"/>
                    </mask>
                </defs>
                <rect width="100%" height="100%" mask="url(#ec12f26a)"/>
            `;
        }
        case "info": {
            return `
                <defs>
                    <mask id="9f0b1e37">
                        <circle fill="white" cx="12" cy="12" r="10"/>
                        <rect fill="black" x="11" y="7" width="2" height="2"/>
                        <rect fill="black" x="11" y="11" width="2" height="6"/>
                    </mask>
                </defs>
                <rect width="100%" height="100%" mask="url(#9f0b1e37)"/>
            `;
        }
        // case "language": {
        //     const assistCircle = getCircle([12, 12], [12, 4], [14.5, 12], [12, 20]);
        //     const assistAngele = Math.atan((12 - 4) / (12 - assistCircle[0]));
        //     const T1 = [12 - 1 * Math.cos(assistAngele), 4 - 1 * Math.sin(assistAngele)];
        //     const B1 = [12 - 1 * Math.cos(assistAngele), 20 + 1 * Math.sin(assistAngele)];
        //     const T2 = [12 + 1 * Math.cos(assistAngele), 4 - 1 * Math.sin(assistAngele)];
        //     const B2 = [12 + 1 * Math.cos(assistAngele), 20 + 1 * Math.sin(assistAngele)];
        //     return `
        //         <defs>
        //             <mask id="be7e88a2">
        //                 <circle fill="none" stroke="white" stroke-width="2" cx="12" cy="12" r="9"/>
        //                 <path fill="none" stroke="white" stroke-width="2" d="
        //                     M ${T1[0]} ${T1[1]}
        //                     A ${assistCircle[2] + 1} ${assistCircle[2] + 1} 0 0 0 ${B1[0]} ${B1[1]}
        //                 "/>
        //                 <path fill="none" stroke="white" stroke-width="2" d="
        //                     M ${T2[0]} ${T2[1]}
        //                     A ${assistCircle[2] + 1} ${assistCircle[2] + 1} 0 0 1 ${B2[0]} ${B2[1]}
        //                 "/>
        //                 <rect fill="white" x="3.5" y="8" width="17" height="2"/>
        //                 <rect fill="white" x="3.5" y="14" width="17" height="2"/>
        //             </mask>
        //         </defs>
        //         <rect width="100%" height="100%" mask="url(#be7e88a2)"/>
        //     `;
        // }
        case "lock": {
            switch (size) {
                case "small": {
                    return `
                        <defs>
                            <mask id="439fd867">
                                <rect fill="white" x="5" y="1" width="8" height="10" rx="4" ry="4"/>
                                <rect fill="black" x="6.5" y="2.5" width="5" height="7" rx="2.5" ry="2.5"/>
                                <rect fill="white" x="3" y="6" width="12" height="11" rx="1.5" ry="1.5"/>
                                <circle fill="black" cx="9" cy="11.5" r="1.75"/>
                            </mask>
                        </defs>
                        <rect width="100%" height="100%" mask="url(#439fd867)"/>
                    `;
                }
                default: {
                    return `
                        <defs>
                            <mask id="00c35062">
                                <rect fill="white" x="7" y="1" width="10" height="14" rx="5" ry="5"/>
                                <rect fill="black" x="9" y="3" width="6" height="10" rx="3" ry="3"/>
                                <rect fill="white" x="4" y="8" width="16" height="14" rx="2" ry="2"/>
                                <circle fill="black" cx="12" cy="15" r="2"/>
                            </mask>
                        </defs>
                        <rect width="100%" height="100%" mask="url(#00c35062)"/>
                    `;
                }
            }
        }
        case "mail": {
            return `
                <defs>
                    <mask id="527f842d">
                        <rect fill="white" x="2" y="4"  width="20" height="16" rx="2" ry="2"/>
                        <polygon fill="black" points="4,6 12,11 20,6 20,8 12,13 4,8"/>
                    </mask>
                </defs>
                <rect width="100%" height="100%" mask="url(#527f842d)"/>
            `;
        }
        case "menu": {
            return `
                <rect x="3" y="6" width="18" height="2"/>
                <rect x="3" y="11" width="18" height="2"/>
                <rect x="3" y="16" width="18" height="2"/>
            `;
        }
        case "message": {
            return `
                <defs>
                    <mask id="1c82978c">
                        <rect fill="white" x="2" y="2" width="20" height="16" rx="2" ry="2"/>
                        <polygon fill="white" points="2,14 6,18 2,22"/>
                        <rect fill="black" x="6" y="6" width="12" height="2"/>
                        <rect fill="black" x="6" y="9" width="12" height="2"/>
                        <rect fill="black" x="6" y="12" width="12" height="2"/>
                    </mask>
                </defs>
                <rect width="100%" height="100%" mask="url(#1c82978c)"/>
            `;
        }
        case "mic": {
            switch (variant) {
                case "google": {
                    return `
                        <defs>
                            <mask id="63d1f75f">
                                <circle fill="none" cx="12" cy="11" r="6" stroke="white" stroke-width="2"/>
                                <rect fill="black" width="24" height="11"/>
                            </mask>
                        </defs>
                        <rect fill="#34A853" x="11" y="17" width="2" height="4"/>
                        <g mask="url(#63d1f75f)">
                            <rect fill="#EA4335" width="24" height="24"/>
                            <rect fill="#FBBC05" width="24" height="11" transform-origin="12 11" transform="rotate(-45)"/>
                        </g>
                        <rect fill="#4285F4" x="9" y="2" width="6" height="12" rx="3" ry="3"/>
                    `;
                }
                default: {
                    return `
                        <defs>
                            <mask id="4979b8df">
                                <circle fill="none" cx="12" cy="11" r="6" stroke="white" stroke-width="2"/>
                                <rect fill="white" x="11" y="17" width="2" height="4"/>
                                <rect fill="black" width="24" height="11"/>
                            </mask>
                        </defs>
                        <rect width="100%" height="100%" mask="url(#4979b8df)"/>
                        <rect x="9" y="2" width="6" height="12" rx="3" ry="3"/>
                    `;
                }
            }
        }
        case "more_horiz": {
            switch (size) {
                case "small": {
                    return `
                        <circle cx="4.5" cy="4.5" r="1.5"/>
                        <circle cx="9" cy="4.5" r="1.5"/>
                        <circle cx="13.5" cy="4.5" r="1.5"/>
                    `;
                }
                default: {
                    return `
                        <circle cx="6" cy="6" r="2"/>
                        <circle cx="12" cy="6" r="2"/>
                        <circle cx="18" cy="6" r="2"/>
                    `;
                }
            }
        }
        case "more_vert": {
            switch (size) {
                case "small": {
                    return `
                        <circle cx="4.5" cy="4.5" r="1.5"/>
                        <circle cx="4.5" cy="9" r="1.5"/>
                        <circle cx="4.5" cy="13.5" r="1.5"/>
                    `;
                }
                default: {
                    return `
                        <circle cx="6" cy="6" r="2"/>
                        <circle cx="6" cy="12" r="2"/>
                        <circle cx="6" cy="18" r="2"/>
                    `;
                }
            }
        }
        case "notifications": {
            return `
                <defs>
                    <mask id="4e63f2a2">
                        <rect fill="white" x="10" y="14" width="4" height="8" rx="2" ry="2"/>
                        <rect fill="black" y="19" width="100%" height="1"/>
                        <rect fill="white" x="10.5" y="2.5" width="3" height="6" rx="1.5" ry="1.5"/>
                        <path fill="white" d="
                            M 6 10.5
                            A 6 6 0 0 1 18 10.5
                            V 16
                            L 20 18
                            V 19
                            H 4
                            V 18
                            L 6 16
                            Z
                        "/>
                    </mask>
                </defs>
                <rect width="100%" height="100%" mask="url(#4e63f2a2)"/>
            `;
        }
        case "person_add": {
            const assistAngele = Math.atan(12 / 16);
            return `
                <rect x="4" y="7" width="2" height="8"/>
                <rect x="1" y="10" width="8" height="2"/>
                <path d="
                    M 7 20
                    V 18
                    A 2 2 0 0 1 ${9 - 2 * Math.sin(assistAngele)} ${18 - 2 * Math.cos(assistAngele)}
                    A 12 12 0 0 1 ${21 + 2 * Math.sin(assistAngele)} ${18 - 2 * Math.cos(assistAngele)}
                    A 2 2 0 0 1 23 18
                    V 20
                    Z
                "/>
                <circle cx="15" cy="8" r="4"/>
            `;
        }
        case "place": {
            return `
                <defs>
                    <mask id="1d4cd30e">
                        <path fill="white" d="
                            M 19 9
                            A 1 1 0 0 0 5 9
                            c 0 5.25 7 13 7 13
                            c 0 0 7 -7.75 7 -13
                            Z
                        "/>
                        <circle fill="black" cx="12" cy="9" r="2.5"/>
                    </mask>
                </defs>
                <rect width="100%" height="100%" mask="url(#1d4cd30e)"/>
            `;
        }
        case "play_arrow": {
            return `
                <polygon points="8,5 19,12 8,19"/>
            `;
        }
        case "play_circle_filled": {
            return `
                <defs>
                    <mask id="44f301a8">
                        <circle fill="white" cx="12" cy="12" r="10"/>
                        <polygon fill="black" points="10,7.5 16,12 10,16.5"/>
                    </mask>
                </defs>
                <rect width="100%" height="100%" mask="url(#44f301a8)"/>
            `;
        }
        case "push_pin": {
            return `
                <path d="
                    M 16 4
                    V 9
                    A 3 3 0 0 0 19 12
                    V 14
                    H 13
                    V 21
                    L 12 22
                    L 11 21
                    V 14
                    H 5
                    V 12
                    A 3 3 0 0 0 8 9
                    V 4
                    H 7
                    A 1 1 0 0 1 7 2
                    L 17 2
                    A 1 1 0 0 1 17 4
                    Z
                "/>
            `;
        }
        // case "reminder": {
        //     const assistAngeleA = Math.atan(1 / 2);
        //     const assistAngeleB = Math.atan(1 / 7);
        //     const assistAngeleC = Math.atan(5 / 24);
        //     const assistA = [18.5 - (21 - 14.25) * Math.tan(assistAngeleB), 21];
        //     const E = [14 + 2 * Math.sin(assistAngeleA), 12 - 2 * Math.cos(assistAngeleA)];
        //     const F = getCirclePointTangentPoint([12, 12], [18.5, 14.25], 2, E)[1];
        //     const G = [18.5 + 2 * Math.cos(assistAngeleB), 14.25 + 2 * Math.sin(assistAngeleB)];
        //     const H = [assistA[0] + 2 * Math.cos(assistAngeleB), assistA[1] + 2 * Math.sin(assistAngeleB)];
        //     const K = [10 - 2 * Math.cos(Math.PI / 4), 21 + 2 * Math.cos(Math.PI / 4)];
        //     const L = [2, K[1] - (K[0] - 2)];
        //     const M = [L[0] + 1.5 * Math.cos(Math.PI / 4), L[1] - 1.5 * Math.sin(Math.PI / 4)];
        //     const assistB = [L[0] + 1.5 * Math.SQRT2, L[1]];
        //     const N = [assistB[0] + 1.5 * Math.sin(assistAngeleC), assistB[1] - 1.5 * Math.cos(assistAngeleC)];
        //     const O = [9, N[1] + (9 - N[0]) * Math.tan(assistAngeleC)];
        //     return `
        //         <defs>
        //             <mask id="d3210bfa">
        //                 <path fill="white" d="
        //                     M 9 3
        //                     A 2 2 0 0 1 13 3
        //                     V 10
        //                     H 14
        //                     A 2 2 0 0 1 ${E[0]} ${E[1]}
        //                     L ${F[0]} ${F[1]}
        //                     A 2 2 0 0 1 ${G[0]} ${G[1]}
        //                     L ${H[0]} ${H[1]}
        //                     A 2 2 0 0 1 ${assistA[0]} 23
        //                     H 10
        //                     A 2 2 0 0 1 ${K[0]} ${K[1]}
        //                     L ${L[0]} ${L[1]}
        //                     L ${M[0]} ${M[1]}
        //                     A 1.5 1.5 0 0 1 ${N[0]} ${N[1]}
        //                     L ${O[0]} ${O[1]}
        //                     Z
        //                 "/>
        //                 <path fill="none" stroke="white" stroke-width="1.25" d="
        //                     M 9.625 6
        //                     A 2.375 2.375 0 0 0 4.875 6
        //                     A 2.375 2.375 0 0 0 7.25 8.375
        //                     H 9.625
        //                     Z
        //                 "/>
        //                 <path fill="none" stroke="white" stroke-width="1.25" d="
        //                     M 12.375 6
        //                     A 2.375 2.375 0 0 1 17.125 6
        //                     A 2.375 2.375 0 0 1 14.75 8.375
        //                     H 12.375
        //                     Z
        //                 "/>
        //             </mask>
        //         </defs>
        //         <rect width="100%" height="100%" mask="url(#d3210bfa)"/>
        //     `;
        // }
        case "reply_all": {
            return `
                <defs>
                    <mask id="97651719">
                        <polygon fill="white" points="7,5 7,8 3,12 7,16 7,19 0,12"/>
                        <path fill="white" d="
                            M 6 12
                            L 13 5
                            V 9
                            C 20 10 23 15 24 20
                            C 21.5 16.5 18 15 13 15
                            V 19
                            Z
                        "/>
                    </mask>
                </defs>
                <rect width="100%" height="100%" mask="url(#97651719)"/>
            `;
        }
        case "report": {
            return `
                <defs>
                    <mask id="b4cf766d">
                        <polygon fill="white" points="
                            ${12 - 9 * Math.tan(Math.PI / 8)},3
                            ${12 + 9 * Math.tan(Math.PI / 8)},3
                            21,${12 - 9 * Math.tan(Math.PI / 8)}
                            21,${12 + 9 * Math.tan(Math.PI / 8)}
                            ${12 + 9 * Math.tan(Math.PI / 8)},21
                            ${12 - 9 * Math.tan(Math.PI / 8)},21
                            3,${12 + 9 * Math.tan(Math.PI / 8)}
                            3,${12 - 9 * Math.tan(Math.PI / 8)}
                        "/>
                        <rect fill="black" x="11" y="7" width="2" height="6"/>
                        <circle fill="black" cx="12" cy="16" r="1.3"/>
                    </mask>
                </defs>
                <rect width="100%" height="100%" mask="url(#b4cf766d)"/>
            `;
        }
        case "search": {
            return `
                <defs>
                    <mask id="868bb988">
                        <polygon fill="white" points="
                            14,13.25
                            14.75,14
                            15.5,14
                            20.5,19
                            19,20.5
                            14,15.5
                            14,14.75
                            13.25,14
                        "/>
                        <circle fill="white" cx="9.5" cy="9.5" r="6.5"/>
                        <circle fill="black" cx="9.5" cy="9.5" r="4.5"/>
                    </mask>
                </defs>
                <rect width="100%" height="100%" mask="url(#868bb988)"/>
            `;
        }
        case "send": {
            return `
                <polygon points="
                    2,3
                    23,12
                    2,21
                    2,14
                    17,12
                    2,10
                "/>
            `;
        }
        // case "share": {
        //     const lineWidth = getParallelLineDistance([12, 12], [6, 11], [18, 4], [6, 13], [18, 6]);
        //     return `
        //         <defs>
        //             <mask id="c852238a">
        //                 <line stroke="white" stroke-width="${lineWidth}" x1="6" y1="12" x2="18" y2="5"/>
        //                 <line stroke="white" stroke-width="${lineWidth}" x1="6" y1="12" x2="18" y2="19"/>
        //                 <circle fill="white" cx="18" cy="5" r="3"/>
        //                 <circle fill="white" cx="6" cy="12" r="3"/>
        //                 <circle fill="white" cx="18" cy="19" r="3"/>
        //             </mask>
        //         </defs>
        //         <rect width="100%" height="100%" mask="url(#c852238a)"/>
        //     `;
        // }
        // case "shopping_cart": {
        //     const assistAngeleA = Math.atan(18 / 38);
        //     const assistAngeleB = Math.atan(Math.hypot(4.5, 6) / 1);
        //     const assistA = getCircleCircleIntersection([12, 12], [15.5, 11], [17.75, 8], 1, 3.75)[0];
        //     const assistL1 = assistA[0] - 15.5;
        //     const assistL2 = assistA[1] - 11;
        //     const assistB = getCirclePointTangentPoint([12, 12], [7, 15], 2, [12, 2])[0];
        //     const assistAngeleC = Math.atan((assistB[1] - 2) / (12 - assistB[0]));
        //     const A = [1, 2];
        //     const P = [3, 4];
        //     const C = [P[0] + 2 / Math.cos(assistAngeleA), 4];
        //     const B = [C[0] - 2 * Math.tan(assistAngeleA), 2];
        //     const D = [20, 4];
        //     const E = [20 + assistL1, 5 + assistL2];
        //     const F = [15.5 + 2 * assistL1, 11 + 2 * assistL2];
        //     const G = [15.5, 13];
        //     const H = [7 + 2 / Math.tan(assistAngeleC), 13];
        //     const I = [7 + (0.25 / Math.tan(assistAngeleC / 2)) * Math.cos(assistAngeleC), 15 - (0.25 / Math.tan(assistAngeleC / 2)) * Math.sin(assistAngeleC)];
        //     const J = [7 + 0.25 / Math.tan(assistAngeleC / 2), 15];
        //     const K = [19, 15];
        //     const L = [19, 17];
        //     const M = [7, 17];
        //     const N = [assistB[0], assistB[1]];
        //     const O = getLineLineIntersection([12, 12], P, [12, 23], N, [12, 2]);
        //     const Q = [1, 4];
        //     return `
        //         <path d="
        //             M ${A[0]} ${A[1]}
        //             H ${B[0]}
        //             L ${C[0]} ${C[1]}
        //             H ${D[0]}
        //             A 1 1 0 0 1 ${E[0]} ${E[1]}
        //             L ${F[0]} ${F[1]}
        //             A 2 2 0 0 1 ${G[0]} ${G[1]}
        //             H ${H[0]}
        //             L ${I[0]} ${I[1]}
        //             A 0.25 0.25 0 0 0 ${J[0]} ${J[1]}
        //             H ${K[0]}
        //             V ${L[1]}
        //             H ${M[0]}
        //             A 2 2 0 0 1 ${N[0]} ${N[1]}
        //             L ${O[0]} ${O[1]}
        //             L ${P[0]} ${P[1]}
        //             H ${Q[0]}
        //             Z
        //         "/>
        //         <circle cx="7" cy="20" r="2" />
        //         <circle cx="17" cy="20" r="2" />
        //     `;
        // }
        case "signal_cellular_4_bar": {
            switch (size) {
                case "small": {
                    return `
                        <polygon points="2,16 16,2 16,16"/>
                    `;
                }
                default: {
                    return `
                        <polygon points="2,22 22,2 22,22"/>
                    `;
                }
            }
        }
        case "signal_wifi_4_bar": {
            switch (size) {
                case "small": {
                    return `
                        <path d="
                            M 9 16
                            L ${9 - Math.sqrt(Math.pow(14, 2) - Math.pow(Math.abs(16 - 5), 2))} 5
                            A 14 14 0 0 1 ${9 + Math.sqrt(Math.pow(14, 2) - Math.pow(Math.abs(16 - 5), 2))} 5
                            Z
                        "/>
                    `;
                }
                default: {
                    return `
                        <path d="
                            M 12 21.5
                            L ${12 - Math.sqrt(Math.pow(18.5, 2) - Math.pow(Math.abs(21.5 - 7), 2))} 7
                            A 18.5 18.5 0 0 1 ${12 + Math.sqrt(Math.pow(18.5, 2) - Math.pow(Math.abs(21.5 - 7), 2))} 7
                            Z
                        "/>
                    `;
                }
            }
        }
        case "square_recent": {
            return `
                <defs>
                    <mask id="b90568bd">
                        <rect fill="white" x="3.75" y="3.75" width="16.5" height="16.5" rx="1.5" ry="1.5"/>
                        <rect fill="black" x="5.75" y="5.75" width="12.5" height="12.5"/>
                    </mask>
                </defs>
                <rect width="100%" height="100%" mask="url(#b90568bd)"/>
            `;
        }
        case "star_border": {
            const Ox = 12;
            const Oy = 12.5;
            const borderWidth = 2;
            const outerOutwardRadius = 10.5;
            const outerInwardRadius = (outerOutwardRadius * Math.sin((23 / 360) * 2 * Math.PI)) / Math.sin(((180 - (23 + 180 / 5)) / 360) * 2 * Math.PI);
            const innerOutwardRadius = 10.5 - borderWidth / Math.sin((23 / 360) * 2 * Math.PI);
            const innerInwardRadius = outerInwardRadius - borderWidth / Math.cos(((180 - (23 + 180 / 5) - 90) / 360) * 2 * Math.PI);
            return `
                <defs>
                    <mask id="d504a899">
                        <polygon fill="white" points="
                            ${Ox},${Oy - outerOutwardRadius}
                            ${Ox + outerInwardRadius * Math.sin(Math.PI / 5)},${Oy - outerInwardRadius * Math.cos(Math.PI / 5)}
                            ${Ox + outerOutwardRadius * Math.sin((2 * Math.PI) / 5)},${Oy - outerOutwardRadius * Math.cos((2 * Math.PI) / 5)}
                            ${Ox + outerInwardRadius * Math.sin((2 * Math.PI) / 5)},${Oy + outerInwardRadius * Math.cos((2 * Math.PI) / 5)}
                            ${Ox + outerOutwardRadius * Math.sin(Math.PI / 5)},${Oy + outerOutwardRadius * Math.cos(Math.PI / 5)}
                            ${Ox},${Oy + outerInwardRadius}
                            ${Ox - outerOutwardRadius * Math.sin(Math.PI / 5)},${Oy + outerOutwardRadius * Math.cos(Math.PI / 5)}
                            ${Ox - outerInwardRadius * Math.sin((2 * Math.PI) / 5)},${Oy + outerInwardRadius * Math.cos((2 * Math.PI) / 5)}
                            ${Ox - outerOutwardRadius * Math.sin((2 * Math.PI) / 5)},${Oy - outerOutwardRadius * Math.cos((2 * Math.PI) / 5)}
                            ${Ox - outerInwardRadius * Math.sin(Math.PI / 5)},${Oy - outerInwardRadius * Math.cos(Math.PI / 5)}
                        "/>
                        <polygon fill="black" points="
                            ${Ox},${Oy - innerOutwardRadius}
                            ${Ox + innerInwardRadius * Math.sin(Math.PI / 5)},${Oy - innerInwardRadius * Math.cos(Math.PI / 5)}
                            ${Ox + innerOutwardRadius * Math.sin((2 * Math.PI) / 5)},${Oy - innerOutwardRadius * Math.cos((2 * Math.PI) / 5)}
                            ${Ox + innerInwardRadius * Math.sin((2 * Math.PI) / 5)},${Oy + innerInwardRadius * Math.cos((2 * Math.PI) / 5)}
                            ${Ox + innerOutwardRadius * Math.sin(Math.PI / 5)},${Oy + innerOutwardRadius * Math.cos(Math.PI / 5)}
                            ${Ox},${Oy + innerInwardRadius}
                            ${Ox - innerOutwardRadius * Math.sin(Math.PI / 5)},${Oy + innerOutwardRadius * Math.cos(Math.PI / 5)}
                            ${Ox - innerInwardRadius * Math.sin((2 * Math.PI) / 5)},${Oy + innerInwardRadius * Math.cos((2 * Math.PI) / 5)}
                            ${Ox - innerOutwardRadius * Math.sin((2 * Math.PI) / 5)},${Oy - innerOutwardRadius * Math.cos((2 * Math.PI) / 5)}
                            ${Ox - innerInwardRadius * Math.sin(Math.PI / 5)},${Oy - innerInwardRadius * Math.cos(Math.PI / 5)}
                        "/>
                    </mask>
                </defs>
                <rect width="100%" height="100%" mask="url(#d504a899)"/>
            `;
        }
        case "timer": {
            return `
                <defs>
                    <clipPath id="clip-path">
                        <circle cx="12" cy="13" r="11" />
                    </clipPath>
                    <mask id="07f15423">
                        <line clip-path="url(#clip-path)" stroke="white" stroke-width="2" x1="12" y1="13" x2="21" y2="4"/>
                        <circle fill="white" cx="12" cy="13" r="9" />
                        <circle fill="black" cx="12" cy="13" r="7"/>
                    </mask>
                </defs>
                <rect width="100%" height="100%" mask="url(#07f15423)"/>
                <rect width="6" height="2" x="9" y="1"/>
                <rect width="2" height="6" x="11" y="8"/>
            `;
        }
        case "today": {
            return `
                <defs>
                    <mask id="47d1be79">
                        <rect fill="white" x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                        <rect fill="white" x="6" y="2" width="2" height="4"/>
                        <rect fill="white" x="16" y="2" width="2" height="4"/>
                        <rect fill="black" x="5" y="9" width="14" height="11"/>
                    </mask>
                </defs>
                <rect width="100%" height="100%" mask="url(#47d1be79)"/>
                <rect x="7" y="11" width="5" height="5"/>
            `;
        }
        case "view_grid": {
            return `
                <rect x="3" y="4" width="8" height="7"/>
                <rect x="12" y="4" width="8" height="7"/>
                <rect x="3" y="12" width="8" height="7"/>
                <rect x="12" y="12" width="8" height="7"/>
            `;
        }
        case "view_module": {
            return `
                <rect x="4" y="5" width="5" height="6"/>
                <rect x="10" y="5" width="5" height="6"/>
                <rect x="16" y="5" width="5" height="6"/>
                <rect x="4" y="12" width="5" height="6"/>
                <rect x="10" y="12" width="5" height="6"/>
                <rect x="16" y="12" width="5" height="6"/>
            `;
        }
        // case "visibility": {
        //     const topCircle = getCircle([12, 12], [1, 12], [12, 19.5], [23, 12]);
        //     const bottomCircle = getCircle([12, 12], [1, 12], [12, 4.5], [23, 12]);
        //     return `
        //         <defs>
        //             <clipPath id="clip-path">
        //                 <circle cx="${topCircle[0]}" cy="${topCircle[1]}" r="${topCircle[2]}" />
        //             </clipPath>
        //             <mask id="82aadf32">
        //                 <circle fill="white" cx="${bottomCircle[0]}" cy="${bottomCircle[1]}" r="${bottomCircle[2]}" clip-path="url(#clip-path)" />
        //                 <circle fill="black" cx="12" cy="12" r="5" />
        //                 <circle fill="white" cx="12" cy="12" r="3" />
        //             </mask>
        //         </defs>
        //         <rect width="100%" height="100%" mask="url(#82aadf32)"/>
        //     `;
        // }
        case "voicemail": {
            return `
                <defs>
                    <mask id="0cf469be">
                        <circle cx="4" cy="9" r="3.25" fill="none" stroke="white" stroke-width="1.5"/>
                        <circle cx="14" cy="9" r="3.25" fill="none" stroke="white" stroke-width="1.5"/>
                        <line stroke="white" stroke-width="1.5" x1="4" y1="12.25" x2="14" y2="12.25"/>
                    </mask>
                </defs>
                <rect width="100%" height="100%" mask="url(#0cf469be)"/>
            `;
        }
        case "volume_up": {
            return `
                <defs>
                    <mask id="ec007e98">
                        <circle cx="12" cy="12" r="8" fill="none" stroke="white" stroke-width="2"/>
                        <circle cx="12" cy="12" r="4.5" fill="white"/>
                        <rect fill="black" width="14" height="100%"/>
                        <polygon fill="white" points="
                            12,4
                            12,20
                            7,15
                            3,15
                            3,9
                            7,9
                        "/>
                    </mask>
                </defs>
                <rect width="100%" height="100%" mask="url(#ec007e98)"/>
            `;
        }
        case "warning": {
            switch (size) {
                case "small": {
                    return `
                        <defs>
                            <mask id="50314c01">
                                <polygon fill="white" points="9,1 18,16.5 0,16.5"/>
                                <rect fill="black" x="8" y="7" width="2" height="4"/>
                                <rect fill="black" x="8" y="12" width="2" height="2"/>
                            </mask>
                        </defs>
                        <rect width="100%" height="100%" mask="url(#50314c01)"/>
                    `;
                }
                default: {
                    return `
                        <defs>
                            <mask id="ec69b3d1">
                                <polygon fill="white" points="12,2 23,21 1,21"/>
                                <rect fill="black" x="11" y="10" width="2" height="4"/>
                                <rect fill="black" x="11" y="16" width="2" height="2"/>
                            </mask>
                        </defs>
                        <rect width="100%" height="100%" mask="url(#ec69b3d1)"/>
                    `;
                }
            }
        }

        default: {
            return `
                <rect width="100%" height="100%" fill="red"/>
            `;
        }
    }
};

const iconContent = variant === "system" ? getSystemIconContent(name, size) : undefined;
</script>

<style>
@layer base {
    .icon {
        --size: 1.5rem;

        &[data-axis="horizontal"] {
            inline-size: var(--size);
            block-size: auto;
        }

        &[data-axis="vertical"] {
            inline-size: auto;
            block-size: var(--size);
        }

        &[data-size="small"] {
            --size: 1.125rem;
        }

        &[data-size="large"] {
            --size: 2.25rem;
        }
    }
}
</style>

<template>
    <svg
        class="icon"
        :data-name="name"
        :data-size="size"
        :data-axis="ratio >= 1 ? 'horizontal' : 'vertical'"
        :viewBox="viewBox"
        fill="currentColor"
        v-html="iconContent"></svg>
</template>
