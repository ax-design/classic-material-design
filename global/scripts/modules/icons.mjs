const namespace = 'http://www.w3.org/2000/svg';

function getLine(o, p1, p2) {
    p1 = [p1[0] - o[0], o[1] - p1[1]];
    p2 = [p2[0] - o[0], o[1] - p2[1]];

    const A = p2[1] - p1[1];
    const B = p1[0] - p2[0];
    const C = p2[0] * p1[1] - p1[0] * p2[1];
    const k = -A / B;
    const b = -C / B;

    return [A, B, C, k, b]
}

function getParallelLineDistance(o, p1, p2, p3, p4) {
    p1 = [p1[0] - o[0], o[1] - p1[1]];
    p2 = [p2[0] - o[0], o[1] - p2[1]];
    p3 = [p3[0] - o[0], o[1] - p3[1]];
    p4 = [p4[0] - o[0], o[1] - p4[1]];

    const A = p2[1] - p1[1];
    const B = p1[0] - p2[0];
    const C1 = p2[0] * p1[1] - p1[0] * p2[1];
    const C2 = p4[0] * p3[1] - p3[0] * p4[1];

    const d = Math.abs(C1 - C2) / Math.hypot(A, B);

    return d
}

function getCircle(o, p1, p2, p3) {
    p1 = [p1[0] - o[0], o[1] - p1[1]];
    p2 = [p2[0] - o[0], o[1] - p2[1]];
    p3 = [p3[0] - o[0], o[1] - p3[1]];

    const a = p1[0] - p2[0];
    const b = p1[1] - p2[1];
    const c = p1[0] - p3[0];
    const d = p1[1] - p3[1];
    const e = ((Math.pow(p1[0], 2) - Math.pow(p2[0], 2)) - (Math.pow(p2[1], 2) - Math.pow(p1[1], 2))) / 2;
    const f = ((Math.pow(p1[0], 2) - Math.pow(p3[0], 2)) - (Math.pow(p3[1], 2) - Math.pow(p1[1], 2))) / 2;

    const x = -(d * e - b * f) / (b * c - a * d);
    const y = -(a * f - c * e) / (b * c - a * d);
    const radius = Math.hypot(p1[0] - x, p1[1] - y);

    return [x + o[0], o[1] - y, radius]
}

function getLineLineIntersection(o, p1, p2, p3, p4) {
    p1 = [p1[0] - o[0], o[1] - p1[1]];
    p2 = [p2[0] - o[0], o[1] - p2[1]];
    p3 = [p3[0] - o[0], o[1] - p3[1]];
    p4 = [p4[0] - o[0], o[1] - p4[1]];

    const A1 = p2[1] - p1[1];
    const B1 = p1[0] - p2[0];
    const C1 = p2[0] * p1[1] - p1[0] * p2[1];
    const A2 = p4[1] - p3[1];
    const B2 = p3[0] - p4[0];
    const C2 = p4[0] * p3[1] - p3[0] * p4[1];

    const x = (B1 * C2 - B2 * C1) / (B2 * A1 - B1 * A2);
    const y = (A1 * C2 - C1 * A2) / (B1 * A2 - A1 * B2);

    return [x + o[0], o[1] - y]
}

function getCirclePointTangentPoint(o, c, r, p) {
    c = [c[0] - o[0], o[1] - c[1]];
    p = [p[0] - o[0], o[1] - p[1]];

    const b = Math.hypot(p[0] - c[0], p[1] - c[1]);
    const th = Math.acos(r / b);
    const d = Math.atan2(p[1] - c[1], p[0] - c[0]);

    const x1 = c[0] + r * Math.cos(d + th);
    const y1 = c[1] + r * Math.sin(d + th);
    const x2 = c[0] + r * Math.cos(d - th);
    const y2 = c[1] + r * Math.sin(d - th);

    return [[x1 + o[0], o[1] - y1], [x2 + o[0], o[1] - y2]]
}

function getCircleLineIntersection(o, r, p1, p2) {
    p1 = [p1[0] - o[0], o[1] - p1[1]];
    p2 = [p2[0] - o[0], o[1] - p2[1]];

    const dx = p2[0] - p1[0];
    const dy = p2[1] - p1[1];
    const dr = Math.hypot(dx, dy);
    const D = p1[0] * p2[1] - p2[0] * p1[1];
    const sdy = dy < 0 ? -1 : 1;

    const x1 = (D * dy + sdy * dx * Math.sqrt(Math.pow(r, 2) * Math.pow(dr, 2) - Math.pow(D, 2))) / Math.pow(dr, 2);
    const y1 = (-D * dx + Math.abs(dy) * Math.sqrt(Math.pow(r, 2) * Math.pow(dr, 2) - Math.pow(D, 2))) / Math.pow(dr, 2);
    const x2 = (D * dy - sdy * dx * Math.sqrt(Math.pow(r, 2) * Math.pow(dr, 2) - Math.pow(D, 2))) / Math.pow(dr, 2);
    const y2 = (-D * dx - Math.abs(dy) * Math.sqrt(Math.pow(r, 2) * Math.pow(dr, 2) - Math.pow(D, 2))) / Math.pow(dr, 2);

    return [[x1 + o[0], o[1] - y1], [x2 + o[0], o[1] - y2]]
}

function getCircleCircleIntersection(o, c1, c2, r1, r2) {
    c1 = [c1[0] - o[0], o[1] - c1[1]];
    c2 = [c2[0] - o[0], o[1] - c2[1]];

    const d = Math.hypot(c1[0] - c2[0], c1[1] - c2[1]);
    const l = (Math.pow(r1, 2) - Math.pow(r2, 2) + Math.pow(d, 2)) / (2 * d);
    const h = Math.sqrt(Math.pow(r1, 2) - Math.pow(l, 2));

    const x1 = l / d * (c2[0] - c1[0]) + h / d * (c2[1] - c1[1]) + c1[0];
    const y1 = l / d * (c2[1] - c1[1]) - h / d * (c2[0] - c1[0]) + c1[1];
    const x2 = l / d * (c2[0] - c1[0]) - h / d * (c2[1] - c1[1]) + c1[0];
    const y2 = l / d * (c2[1] - c1[1]) + h / d * (c2[0] - c1[0]) + c1[1];

    return [[x1 + o[0], o[1] - y1], [x2 + o[0], o[1] - y2]]
}

function getEllipseLineIntersection(o, a, b, p1, p2) {
    const lk = getLine(o, p1, p2)[3];
    const lb = getLine(o, p1, p2)[4];

    p1 = [p1[0] - o[0], o[1] - p1[1]];
    p2 = [p2[0] - o[0], o[1] - p2[1]];

    const A = Math.pow(b, 2) + Math.pow(a, 2) * Math.pow(lk, 2);
    const B = 2 * lk * Math.pow(a, 2) * lb;
    const C = Math.pow(a, 2) * Math.pow(lb, 2) - Math.pow(a, 2) * Math.pow(b, 2);

    const x1 = (-B + Math.sqrt(Math.pow(B, 2) - 4 * A * C)) / (2 * A);
    const y1 = lk * x1 + lb;
    const x2 = (-B - Math.sqrt(Math.pow(B, 2) - 4 * A * C)) / (2 * A);
    const y2 = lk * x2 + lb;

    return [[x1 + o[0], o[1] - y1], [x2 + o[0], o[1] - y2]]
}

function setIconProperties(element) {
    const iconElement = element.shadowRoot.querySelector('svg');
    const productName = element.getAttribute('product');
    let iconSize = element.getAttribute('size');

    if (productName != undefined) {
        iconSize = iconSize == undefined ? 192 : iconSize;
        iconElement.setAttribute('viewBox', '0 0 ' + iconSize + ' ' + iconSize);
        iconElement.setAttribute('color-interpolation-filters', 'sRGB');
        iconElement.setAttribute('aria-hidden', 'true');

        function setIconContent() {
            switch (productName) {
                case 'all_apps': {
                    return `
                    <style>
                        .hint {
                            fill: white;
                            opacity: 0.4;
                        }
                        .shade {
                            fill: #212121;
                            opacity: 0.1;
                        }
                    </style>
                    <defs>
                        <mask id="mask">
                            <circle fill="white" cx="96" cy="96" r="76"/>
                            <circle fill="black" cx="64" cy="78" r="8"/>
                            <circle fill="black" cx="96" cy="78" r="8"/>
                            <circle fill="black" cx="128" cy="78" r="8"/>
                            <circle fill="black" cx="64" cy="112" r="8"/>
                            <circle fill="black" cx="96" cy="112" r="8"/>
                            <circle fill="black" cx="128" cy="112" r="8"/>
                        </mask>
                        <radialGradient id="finish" cx="${96 - 76 * Math.cos(Math.PI / 4)}" cy="${96 - 76 * Math.sin(Math.PI / 4)}" r="${76 * 2}" gradientUnits="userSpaceOnUse">
                            <stop offset="0" stop-color="white" stop-opacity="0.1"/>
                            <stop offset="${1 / 3}" stop-color="white" stop-opacity="0.05"/>
                            <stop offset="1" stop-color="white" stop-opacity="0"/>
                        </radialGradient>
                    </defs>
                    <g>
                        <rect fill="#F5F5F5" width="100%" height="100%" mask="url(#mask)"/>
                        <path class="hint" d="M 20 96 A 76 76 0 0 1 172 96 A 76 75 0 0 0 20 96 Z"/>
                        <path class="shade" d="M 20 96 A 76 76 0 0 0 172 96 A 76 75 0 0 1 20 96 Z"/>
                    </g>
                    <g>
                        <path class="hint" d="M 56 78 A 8 8 0 0 0 72 78 A 8 7.5 0 0 1 56 78 Z"/>
                        <path class="shade" d="M 56 78 A 8 8 0 0 1 72 78 A 8 8.5 0 0 0 56 78 Z"/>
                        <path class="hint" d="M 88 78 A 8 8 0 0 0 104 78 A 8 7.5 0 0 1 88 78 Z"/>
                        <path class="shade" d="M 88 78 A 8 8 0 0 1 104 78 A 8 8.5 0 0 0 88 78 Z"/>
                        <path class="hint" d="M 120 78 A 8 8 0 0 0 136 78 A 8 7.5 0 0 1 120 78 Z"/>
                        <path class="shade" d="M 120 78 A 8 8 0 0 1 136 78 A 8 8.5 0 0 0 120 78 Z"/>
                        <path class="hint" d="M 56 112 A 8 8 0 0 0 72 112 A 8 7.5 0 0 1 56 112 Z"/>
                        <path class="shade" d="M 56 112 A 8 8 0 0 1 72 112 A 8 8.5 0 0 0 56 112 Z"/>
                        <path class="hint" d="M 88 112 A 8 8 0 0 0 104 112 A 8 7.5 0 0 1 88 112 Z"/>
                        <path class="shade" d="M 88 112 A 8 8 0 0 1 104 112 A 8 8.5 0 0 0 88 112 Z"/>
                        <path class="hint" d="M 120 112 A 8 8 0 0 0 136 112 A 8 7.5 0 0 1 120 112 Z"/>
                        <path class="shade" d="M 120 112 A 8 8 0 0 1 136 112 A 8 8.5 0 0 0 120 112 Z"/>
                    </g>
                    <rect fill="url(#finish)" width="100%" height="100%" mask="url(#mask)"/>
                `}
                case 'chrome': {
                    const outerRadius = 88;
                    const innerRadius = 40;
                    const A = [96 - innerRadius * Math.cos(Math.PI / 6), 96 + innerRadius * Math.sin(Math.PI / 6)];
                    const B = [96, 56];
                    const C = [96 + innerRadius * Math.cos(Math.PI / 6), 96 + innerRadius * Math.sin(Math.PI / 6)];
                    const assistA = [A[0] - A[1] * Math.tan(Math.PI / 6), 0];
                    const assistB = [192, B[1]];
                    const assistC = [C[0] + C[1] * Math.tan(Math.PI / 6), 0];
                    const D = getCircleLineIntersection([96, 96], 88, [assistA[0], assistA[1]], [A[0], A[1]])[0];
                    const E = getCircleLineIntersection([96, 96], 88, [B[0], B[1]], [assistB[0], assistB[1]])[0];
                    const F = getCircleLineIntersection([96, 96], 88, [assistC[0], assistC[1]], [C[0], C[1]])[1];
                    const assistL1 = Math.sqrt(Math.pow(outerRadius, 2) - Math.pow(innerRadius, 2));
                    const assistL2 = assistL1 * Math.tan(Math.PI / 12);
                    const G = [A[0] + assistL2 * Math.cos(Math.PI / 6), A[1] - assistL2 * Math.sin(Math.PI / 6)];
                    const H = [B[0], B[1] + (E[0] - B[0]) * Math.sin(Math.PI / 12)];
                    const I = [C[0] - assistL2 * Math.cos(Math.PI / 6), A[1] - assistL2 * Math.sin(Math.PI / 6)];
                    const a = getEllipseLineIntersection([96, 96], 88, 87, [assistA[0], assistA[1] + 1], [A[0], A[1] + 1])[1];
                    const b = getEllipseLineIntersection([96, 96], 88, 87, [B[0], B[1] - 1], [assistB[0], assistB[1] - 1])[0];
                    const c = getEllipseLineIntersection([96, 96], 88, 87, [assistC[0], assistC[1] + 1], [C[0], C[1] + 1])[1];
                    const assistL3 = Math.abs(getLine([96, 96], [F[0], F[1] + 1], [C[0], C[1] + 1])[4]) * Math.sin(Math.PI / 6);
                    const assistD = [assistL3 * Math.cos(Math.PI / 6), -assistL3 * Math.sin(Math.PI / 6)];
                    const ellipseVerticalRadiusB = Math.sqrt(Math.pow(innerRadius, 2) * Math.pow(assistD[1], 2) / (Math.pow(innerRadius, 2) - Math.pow(assistD[0], 2)));
                    const assistE = [-assistL3 * Math.cos(Math.PI / 6), -assistL3 * Math.sin(Math.PI / 6)];
                    const ellipseVerticalRadiusC = Math.sqrt(Math.pow(innerRadius + 1, 2) * Math.pow(assistE[0], 2) / (Math.pow(innerRadius + 1, 2) - Math.pow(assistD[1], 2)));
                    return `
                    <style>
                        .hint {
                            fill: white;
                            opacity: 0.2;
                        }
                        g:nth-of-type(1) .shade {
                            fill: #3E2723;
                            opacity: 0.2;
                        }
                        g:nth-of-type(2) .shade {
                            fill: #BF360C;
                            opacity: 0.2;
                        }
                        g:nth-of-type(3) .shade {
                            fill: #263238;
                            opacity: 0.2;
                        }
                    </style>
                    <defs>
                        <circle id="outline" cx="96" cy="96" r="${outerRadius}"/>
                        <path id="first-part" d="
                            M ${A[0]} ${A[1]}
                            L ${B[0]} ${B[1]}
                            L 192 56
                            L 192 0
                            L ${A[0] - A[1] * Math.tan(Math.PI / 6)} 0
                            Z
                        "/>
                        <path id="second-part" d="
                            M ${B[0]} ${B[1]}
                            L ${C[0]} ${C[1]}
                            L ${C[0] - (192 - C[1]) * Math.tan(Math.PI / 6)} 192
                            L 192 192
                            L 192 56
                            Z
                        "/>
                        <path id="third-part" d="
                            M ${C[0]} ${C[1]}
                            L ${A[0]} ${A[1]}
                            L ${A[0] - A[1] * Math.tan(Math.PI / 6)} 0
                            L 0 192
                            L ${C[0] - (192 - C[1]) * Math.tan(Math.PI / 6)} 192
                            Z
                        "/>
                        <clipPath id="outline-clip-path">
                            <use href="#outline"/>
                        </clipPath>
                        <clipPath id="second-part-clip-path">
                            <use href="#second-part"/>
                        </clipPath>
                        <clipPath id="third-part-clip-path">
                            <use href="#third-part"/>
                        </clipPath>
                        <linearGradient id="first-part-gradient" x1="${A[0]}" y1="${A[1]}" x2="${A[0] + 128 * Math.cos(Math.PI / 6)}" y2="${A[1] - 128 * Math.sin(Math.PI / 6)}" gradientUnits="userSpaceOnUse">
                            <stop offset="0" stop-color="#D93025" stop-opacity="1"></stop>
                            <stop offset="${1 / 3}" stop-color="#EA4335" stop-opacity="1"></stop>
                        </linearGradient>
                        <linearGradient id="second-part-gradient" x1="${B[0]}" y1="${B[1]}" x2="${B[0]}" y2="${B[1] + 128}" gradientUnits="userSpaceOnUse">
                            <stop offset="0" stop-color="#FBBC05" stop-opacity="1"></stop>
                            <stop offset="${1 / 3}" stop-color="#FCC934" stop-opacity="1"></stop>
                        </linearGradient>
                        <linearGradient id="third-part-gradient" x1="${C[0]}" y1="${C[1]}" x2="0" y2="${C[1] - 128 * Math.sin(Math.PI / 6)}" gradientUnits="userSpaceOnUse">
                            <stop offset="0" stop-color="#1E8E3E" stop-opacity="1"></stop>
                            <stop offset="${1 / 3}" stop-color="#34A853" stop-opacity="1"></stop>
                        </linearGradient>
                        <radialGradient id="first-long-shadow" cx="${D[0]}" cy="${D[1]}" r="${assistL1}" gradientUnits="userSpaceOnUse">
                            <stop offset="0" stop-color="#3E2723" stop-opacity="0.2"/>
                            <stop offset="${1 / 3}" stop-color="#3E2723" stop-opacity="0.1"/>
                            <stop offset="1" stop-color="#3E2723" stop-opacity="0"/>
                        </radialGradient>
                        <radialGradient id="second-long-shadow" cx="${B[0]}" cy="${B[1]}" r="${E[0] - B[0]}" gradientUnits="userSpaceOnUse">
                            <stop offset="0" stop-color="#BF360C" stop-opacity="0.2"/>
                            <stop offset="${1 / 3}" stop-color="#BF360C" stop-opacity="0.1"/>
                            <stop offset="1" stop-color="#BF360C" stop-opacity="0"/>
                        </radialGradient>
                        <radialGradient id="third-long-shadow" cx="${C[0]}" cy="${C[1]}" r="${assistL1}" gradientUnits="userSpaceOnUse">
                            <stop offset="0" stop-color="#263238" stop-opacity="0.2"/>
                            <stop offset="${1 / 3}" stop-color="#263238" stop-opacity="0.1"/>
                            <stop offset="1" stop-color="#263238" stop-opacity="0"/>
                        </radialGradient>
                        <radialGradient id="finish" cx="${96 - 88 * Math.cos(Math.PI / 4)}" cy="${96 - 88 * Math.sin(Math.PI / 4)}" r="${88 * 2}" gradientUnits="userSpaceOnUse">
                            <stop offset="0" stop-color="white" stop-opacity="0.1"/>
                            <stop offset="${1 / 3}" stop-color="white" stop-opacity="0.05"/>
                            <stop offset="1" stop-color="white" stop-opacity="0"/>
                        </radialGradient>
                    </defs>
                    <use fill="url(#first-part-gradient)" clip-path="url(#outline-clip-path)" href="#first-part"/>
                    <path fill="url(#first-long-shadow)" d="
                        M ${D[0]} ${D[1]}
                        L ${G[0]} ${G[1]}
                        L ${A[0]} ${A[1]}
                        Z
                    "/>
                    <g>
                        <path class="hint" d="
                            M ${E[0]} ${E[1]}
                            A ${outerRadius} ${outerRadius} 0 0 0 8 96
                            A ${outerRadius} ${outerRadius - 1} 0 0 1 ${b[0]} ${b[1]}
                            Z
                        "/>
                        <path class="shade" d="
                            M ${b[0]} ${b[1]}
                            H 96
                            A ${innerRadius} ${innerRadius + 1} 0 0 0 56 96
                            A ${innerRadius} ${innerRadius} 0 0 1 96 56
                            H ${E[0]}
                            Z
                        "/>
                        <path class="shade" d="
                            M 56 96
                            A ${innerRadius} ${innerRadius} 0 0 0 136 96
                            A ${innerRadius} ${innerRadius + 1} 0 0 1 56 96
                            Z
                        "/>
                    </g>
                    <use fill="url(#second-part-gradient)" clip-path="url(#outline-clip-path)" href="#second-part"/>
                    <path fill="url(#second-long-shadow)" d="
                        M ${E[0]} ${E[1]}
                        L ${H[0]} ${H[1]}
                        L ${B[0]} ${B[1]}
                        Z
                    "/>
                    <g clip-path="url(#second-part-clip-path)">
                        <path class="hint" d="
                            M 8 96
                            A ${outerRadius} ${outerRadius} 0 0 1 184 96
                            A ${outerRadius} ${outerRadius - 1} 0 0 0 8 96
                            Z
                        "/>
                        <path class="hint" d="
                            M ${F[0]} ${F[1]}
                            L ${C[0]} ${C[1]}
                            A ${innerRadius} ${innerRadius} 0 0 0 136 96
                            A ${innerRadius} ${ellipseVerticalRadiusB} 0 0 1 ${96 + assistD[0]} ${96 - assistD[1]}
                            L ${c[0]} ${c[1]}
                            Z
                        "/>
                        <path class="shade" d="
                            M 56 96
                            A ${innerRadius} ${innerRadius} 0 0 1 136 96
                            A ${innerRadius} ${innerRadius + 1} 0 0 0 56 96
                            Z
                        "/>
                        <path class="shade" d="
                            M ${F[0]} ${F[1]}
                            A ${outerRadius} ${outerRadius} 0 0 0 184 96
                            A ${outerRadius} ${outerRadius - 1} 0 0 1 ${c[0]} ${c[1]}
                            Z
                        "/>
                    </g>
                    <use fill="url(#third-part-gradient)" clip-path="url(#outline-clip-path)" href="#third-part"/>
                    <path fill="url(#third-long-shadow)" d="
                        M ${F[0]} ${F[1]}
                        L ${I[0]} ${I[1]}
                        L ${C[0]} ${C[1]}
                        Z
                    "/>
                    <g clip-path="url(#third-part-clip-path)">
                        <path class="hint" d="
                            M ${D[0]} ${D[1]}
                            A ${outerRadius} ${outerRadius} 0 0 0 8 96
                            A ${outerRadius} ${outerRadius - 1} 0 0 1 ${D[0]} ${D[1] + 1}
                            L ${96 + assistE[0]} ${96 - assistE[1]}
                            A ${ellipseVerticalRadiusC} ${innerRadius + 1} 0 0 0 96 137
                            A ${innerRadius} ${innerRadius + 1} 0 0 0 136 96
                            A ${innerRadius} ${innerRadius} 0 0 1 ${A[0]} ${A[1]}
                            Z
                        "/>
                        <path class="shade" d="
                            M 8 96
                            A ${outerRadius} ${outerRadius} 0 0 0 184 96
                            A ${outerRadius} ${outerRadius - 1} 0 0 1 8 96
                            Z
                        "/>
                    </g>
                    <circle fill="#F1F1F1" cx="96" cy="96" r="40"/>
                    <circle fill="#4285F4" cx="96" cy="96" r="32"/>
                    <use fill="url(#finish)" href="#outline"/>
                `}
                case 'dialer': {
                    const borderRaidus = 6;
                    const aRadius = 106;
                    const bRadius = 112;
                    const cRadius = 134;
                    const eRadius = 162;
                    const ratio = aRadius / bRadius;
                    const O = [174, 18];
                    const assistL1 = eRadius * Math.sin(Math.PI / 12) + borderRaidus;
                    const assistL2 = Math.sqrt(Math.pow(bRadius, 2) - Math.pow(assistL1, 2));
                    const assistP1 = [O[0] - assistL1 * Math.SQRT1_2, O[1] - assistL1 * Math.SQRT1_2];
                    const assistP2 = [assistP1[0] - assistL2 * Math.SQRT1_2, assistP1[1] + assistL2 * Math.SQRT1_2];
                    const assistP3 = [O[0] + assistL1 * Math.SQRT1_2, O[1] + assistL1 * Math.SQRT1_2];
                    const assistP4 = [assistP3[0] - assistL2 * Math.SQRT1_2, assistP3[1] + assistL2 * Math.SQRT1_2];
                    const Ba = [O[0] - (O[0] - assistP2[0]) * ratio, O[1] + (assistP2[1] - O[1]) * ratio];
                    const Bb = [assistP2[0] + borderRaidus * Math.SQRT1_2, assistP2[1] + borderRaidus * Math.SQRT1_2];
                    const Ea = [O[0] - eRadius * Math.cos(Math.PI / 6), O[1] + eRadius * Math.sin(Math.PI / 6)];
                    const Eb = [O[0] - eRadius * Math.sin(Math.PI / 6), O[1] + eRadius * Math.cos(Math.PI / 6)];
                    const Bc = [O[0] - (assistP2[1] - O[1]) * ratio, O[1] + (O[0] - assistP2[0]) * ratio];
                    const Bd = [assistP4[0] - borderRaidus * Math.SQRT1_2, assistP4[1] - borderRaidus * Math.SQRT1_2];
                    const gradientStart = [18 - borderRaidus * Math.cos(Math.PI / 4), 18 - borderRaidus * Math.cos(Math.PI / 4)];
                    const gradientEnd = [174 + borderRaidus * Math.cos(Math.PI / 4), 174 + borderRaidus * Math.cos(Math.PI / 4)];
                    const gradientRadius = Math.hypot((gradientEnd[0] - gradientStart[0]), (gradientEnd[1] - gradientStart[1]));
                    return `
                    <style>
                        .hint {
                            fill: white;
                            opacity: 0.2;
                        }
                        .shade {
                            fill: #263238;
                            opacity: 0.2;
                        }
                    </style>
                    <defs>
                        <path id="handle" d="
                            M 40 18
                            A ${cRadius} ${cRadius} 0 0 0 174 152
                            V 180
                            A ${eRadius} ${eRadius} 0 0 1 12 18
                            Z
                        "/>
                        <path id="speaker" d="
                            M ${Ea[0]} ${Ea[1]}
                            A ${eRadius} ${eRadius} 0 0 1 12 18
                            A ${borderRaidus} ${borderRaidus} 0 0 1 18 12
                            H 62
                            A ${borderRaidus} ${borderRaidus} 0 0 1 68 18
                            A ${aRadius} ${aRadius} 0 0 0 ${Ba[0]} ${Ba[1]}
                            A ${borderRaidus} ${borderRaidus} 0 0 1 ${Bb[0]} ${Bb[1]}
                            Z
                        "/>
                        <path id="microphone" d="
                            M ${Eb[0]} ${Eb[1]}
                            A ${eRadius} ${eRadius} 0 0 0 174 180
                            A ${borderRaidus} ${borderRaidus} 0 0 0 180 174
                            V 130
                            A ${borderRaidus} ${borderRaidus} 0 0 0 174 124
                            A ${aRadius} ${aRadius} 0 0 1 ${Bc[0]} ${Bc[1]}
                            A ${borderRaidus} ${borderRaidus} 0 0 0 ${Bd[0]} ${Bd[1]}
                            Z
                        "/>
                        <clipPath id="clip-path">
                            <use href="#handle"/>
                        </clipPath>
                        <mask id="mask">
                            <use fill="white" href="#handle"/>
                            <use fill="white" href="#speaker"/>
                            <use fill="white" href="#microphone"/>
                        </mask>
                        <filter id="shadow" filterUnits="userSpaceOnUse">
                            <feDropShadow dx="0" dy="1" stdDeviation="0.5" flood-color="#263238" flood-opacity="0.2"/>
                            <feDropShadow dx="0" dy="2" stdDeviation="1" flood-color="#263238" flood-opacity="0.14"/>
                            <feDropShadow dx="0" dy="1" stdDeviation="2.5" flood-color="#263238" flood-opacity="0.12"/>
                        </filter>
                        <radialGradient id="finish" cx="${gradientStart[0]}" cy="${gradientStart[1]}" r="${gradientRadius}" gradientUnits="userSpaceOnUse">
                            <stop offset="0" stop-color="white" stop-opacity="0.1"/>
                            <stop offset="${1 / 3}" stop-color="white" stop-opacity="0.05"/>
                            <stop offset="1" stop-color="white" stop-opacity="0"/>
                        </radialGradient>
                    </defs>
                    <g>
                        <use fill="#0288D1" href="#handle"/>
                        <path class="hint" d="
                            M 174 152
                            A ${cRadius} ${cRadius} 0 0 1 40 18
                            A ${cRadius} ${cRadius + 1} 0 0 0 174 153
                            Z
                        "/>
                        <path class="shade" d="
                            M 174 180
                            A ${eRadius} ${eRadius} 0 0 1 12 18
                            A ${eRadius} ${eRadius - 1} 0 0 0 174 179
                            Z
                        "/>
                    </g>
                    <g filter="url(#shadow)" clip-path="url(#clip-path)">
                        <use fill="#03A9F4" href="#speaker"/>
                        <use fill="#03A9F4" href="#microphone"/>
                    </g>
                    <g>
                        <use fill="#03A9F4" href="#speaker"/>
                        <path class="hint" d="
                            M 18 13
                            A ${borderRaidus} ${borderRaidus - 1} 0 0 0 12 18
                            A ${borderRaidus} ${borderRaidus} 0 0 1 18 12
                            H 62
                            A ${borderRaidus} ${borderRaidus} 0 0 1 68 18
                            A ${borderRaidus} ${borderRaidus - 1} 0 0 0 62 13
                            Z
                        "/>
                        <path class="shade" d="
                            M ${Ea[0]} ${Ea[1]}
                            A ${eRadius} ${eRadius} 0 0 1 12 18
                            A ${eRadius} ${eRadius - 1} 0 0 0 ${Ea[0]} ${Ea[1] - 1}
                            L ${Bb[0]} ${Bb[1] - 1}
                            A ${borderRaidus} ${borderRaidus} 0 0 0 ${Ba[0]} ${Ba[1]}
                            A ${borderRaidus} ${borderRaidus} 0 0 1 ${Bb[0]} ${Bb[1]}
                            Z
                        "/>
                        <use fill="#03A9F4" href="#microphone"/>
                        <path class="hint" d="
                            M ${Eb[0]} ${Eb[1]}
                            L ${Bd[0]} ${Bd[1]}
                            A ${borderRaidus} ${borderRaidus} 0 0 1 ${Bc[0]} ${Bc[1]}
                            A ${aRadius} ${aRadius} 0 0 0 174 124
                            A ${borderRaidus} ${borderRaidus} 0 0 1 180 130
                            A ${borderRaidus} ${borderRaidus - 1} 0 0 0 174 125
                            A ${aRadius} ${aRadius + 1} 0 0 1 ${Bc[0]} ${Bc[1] + 1}
                            A ${borderRaidus} ${borderRaidus} 0 0 0 ${Bd[0]} ${Bd[1] + 1}
                            L ${Eb[0] + 1} ${Eb[1]}
                            Z
                        "/>
                        <path class="shade" d="
                            M ${Eb[0]} ${Eb[1]}
                            A ${eRadius} ${eRadius} 0 0 0 174 180
                            A ${borderRaidus} ${borderRaidus} 0 0 0 180 174
                            A ${borderRaidus} ${borderRaidus - 1} 0 0 1 174 179
                            A ${eRadius} ${eRadius - 1} 0 0 1 ${Eb[0] + 1} ${Eb[1]}
                            Z
                        "/>
                    </g>
                    <rect fill="url(#finish)" width="100%" height="100%" mask="url(#mask)"/>
                `}
                case 'docs': {
                    const gradientStart = [124 - 12 * Math.cos(Math.PI / 4), 44 + 12 * Math.sin(Math.PI / 4)];
                    const gradientEnd = [160, 44 + 160 - gradientStart[0]];
                    return `
                    <style>
                        .hint {
                            fill: white;
                            opacity: 0.2;
                        }
                        .shade {
                            fill: #1A237E;
                            opacity: 0.2;
                        }
                    </style>
                    <defs>
                        <path id="outline" d="
                            M 112 8
                            L 160 56
                            V 172
                            a 12 12 0 0 1 -12 12
                            H 44
                            a 12 12 0 0 1 -12 -12
                            V 20
                            a 12 12 0 0 1 12 -12
                            Z
                        "/>
                        <clipPath id="clip-path">
                            <use href="#outline"/>
                        </clipPath>
                        <filter id="shadow" filterUnits="userSpaceOnUse">
                            <feDropShadow dx="0" dy="1" stdDeviation="2" flood-color="#1A237E" flood-opacity="0.2"/>
                            <feDropShadow dx="0" dy="4" stdDeviation="2.5" flood-color="#1A237E" flood-opacity="0.14"/>
                            <feDropShadow dx="0" dy="1" stdDeviation="5" flood-color="#1A237E" flood-opacity="0.12"/>
                        </filter>
                        <linearGradient id="long-shadow" x1="${gradientStart[0]}" y1="${gradientStart[1]}" x2="${gradientEnd[0]}" y2="${gradientEnd[1]}" gradientUnits="userSpaceOnUse">
                            <stop offset="0" stop-color="#1A237E" stop-opacity="0.2"></stop>
                            <stop offset="${1 / 3}" stop-color="#1A237E" stop-opacity="0.1"></stop>
                            <stop offset="1" stop-color="#1A237E" stop-opacity="0"></stop>
                        </linearGradient>
                        <radialGradient id="finish" cx="${44 - 12 * Math.cos(Math.PI / 4)}" cy="${20 - 12 * Math.sin(Math.PI / 4)}" r="${Math.hypot(148 - 44, 172 - 20) + 12 * 2}" gradientUnits="userSpaceOnUse">
                            <stop offset="0" stop-color="white" stop-opacity="0.1"/>
                            <stop offset="${1 / 3}" stop-color="white" stop-opacity="0.05"/>
                            <stop offset="1" stop-color="white" stop-opacity="0"/>
                        </radialGradient>
                    </defs>
                    <path fill="#4285f4" d="
                        M 112 8
                        L 128 40
                        L 160 56
                        V 172
                        a 12 12 0 0 1 -12 12
                        H 44
                        a 12 12 0 0 1 -12 -12
                        V 20
                        a 12 12 0 0 1 12 -12
                        Z
                    "/>
                    <rect fill="#EEEEEE" x="64" y="96" width="64" height="8"/>
                    <rect fill="#EEEEEE" x="64" y="112" width="64" height="8"/>
                    <rect fill="#EEEEEE" x="64" y="128" width="64" height="8"/>
                    <rect fill="#EEEEEE" x="64" y="144" width="48" height="8"/>
                    <path class="hint" d="
                        M 112 9
                        H 44
                        a 12 11 0 0 0 -12 11
                        a 12 12 0 0 1 12 -12
                        H 112
                        Z
                    "/>
                    <path class="shade" d="
                        M 44 183
                        a 12 11 0 0 1 -12 -11
                        a 12 12 0 0 0 12 12
                        H 148
                        a 12 12 0 0 0 12 -12
                        a 12 11 0 0 1 -12 11
                        Z
                    "/>
                    <polygon fill="url(#long-shadow)" points="
                        ${gradientStart[0]},${gradientStart[1]}
                        ${gradientEnd[0]},${gradientEnd[1]}
                        160,56
                    "/>
                    <g clip-path="url(#clip-path)">
                        <rect fill="#AECBFA" filter="url(#shadow)" x="112" y="-4" width="60" height="60" rx="12" ry="12"/>
                        <path class="shade" d="
                            M 124 55
                            a 12 11 0 0 1 -12 -11
                            a 12 12 0 0 0 12 12
                            H 160
                            v -1
                            Z
                        "/>
                    </g>
                    <use fill="url(#finish)" href="#outline"/>
                `}
                case 'gmail': {
                    const angle = Math.atan(52 / 76);
                    const A = [184, 32];
                    const B = [184, 44];
                    const C = [172 + 12 * Math.sin(angle), 44 + 12 * Math.cos(angle)];
                    const D = [96, C[1] + (C[0] - 96) * Math.tan(angle)];
                    const E = [20 - 12 * Math.sin(angle), 44 + 12 * Math.cos(angle)];
                    const F = [8, 44];
                    const G = [8, 32];
                    const H = getLineLineIntersection([96, 96], [28, 160], D, [164, 0], [164, 192]);
                    const I = [164, 192];
                    const J = [28, 192];
                    const K = [28, 160];
                    const L = getLineLineIntersection([96, 96], [28, 161], [D[0], D[1] - 1], [0, 159], [192, 159]);
                    const gradientStart = [20 - 12 * Math.cos(Math.PI / 4), 44 - 12 * Math.sin(Math.PI / 4)];
                    const gradientEnd = [172 + 12 * Math.cos(Math.PI / 4), 148 + 12 * Math.sin(Math.PI / 4)];
                    const gradientRadius = Math.hypot((gradientEnd[0] - gradientStart[0]), (gradientEnd[1] - gradientStart[1]));
                    return `
                    <style>
                        .hint {
                            fill: white;
                            opacity: 0.4;
                        }
                        path[class="hint"] {
                            opacity: 0.2;
                        }
                        .shade {
                            fill: #212121;
                            opacity: 0.1;
                        }
                        path[class="shade"] {
                            fill: #3E2723;
                            opacity: 0.2;
                        }
                    </style>
                    <defs>
                        <rect id="outline" x="8" y="32" width="176" height="128" rx="12" ry="12"/>
                        <clipPath id="outline-clip-path">
                            <use href="#outline"/>
                        </clipPath>
                        <filter id="shadow-z2" filterUnits="userSpaceOnUse">
                            <feDropShadow dx="0" dy="1" stdDeviation="0.5" flood-color="#212121" flood-opacity="0.2"/>
                            <feDropShadow dx="0" dy="2" stdDeviation="1" flood-color="#212121" flood-opacity="0.14"/>
                            <feDropShadow dx="0" dy="1" stdDeviation="2.5" flood-color="#212121" flood-opacity="0.12"/>
                        </filter>
                        <filter id="shadow-z4" filterUnits="userSpaceOnUse">
                            <feDropShadow dx="0" dy="1" stdDeviation="2" flood-color="#212121" flood-opacity="0.2"/>
                            <feDropShadow dx="0" dy="4" stdDeviation="2.5" flood-color="#212121" flood-opacity="0.14"/>
                            <feDropShadow dx="0" dy="1" stdDeviation="5" flood-color="#212121" flood-opacity="0.12"/>
                        </filter>
                        <linearGradient id="long-shadow" x1="${20 - 12 * Math.cos(Math.PI / 4)}" y1="${44 + 12 * Math.sin(Math.PI / 4)}" x2="${20 - 12 * Math.cos(Math.PI / 4) + (160 - (44 + 12 * Math.sin(Math.PI / 4)))}" y2="${160}" gradientUnits="userSpaceOnUse">
                            <stop offset="0" stop-color="#212121" stop-opacity="0.1"></stop>
                            <stop offset="${1 / 3}" stop-color="#212121" stop-opacity="0.05"></stop>
                            <stop offset="1" stop-color="#212121" stop-opacity="0"></stop>
                        </linearGradient>
                        <radialGradient id="finish" cx="${gradientStart[0]}" cy="${gradientStart[1]}" r="${gradientRadius}" gradientUnits="userSpaceOnUse">
                            <stop offset="0" stop-color="white" stop-opacity="0.1"/>
                            <stop offset="${1 / 3}" stop-color="white" stop-opacity="0.05"/>
                            <stop offset="1" stop-color="white" stop-opacity="0"/>
                        </radialGradient>
                    </defs>
                    <g clip-path="url(#outline-clip-path)">
                        <rect fill="#E0E0E0" x="20" y="44" width="152" height="116"/>
                        <rect fill="#EA4335" width="28" height="100%"/>
                        <rect class="shade" x="28" y="159" width="136" height="1"/>
                        <polygon fill="#EEEEEE" filter="url(#shadow-z2)" points="
                            ${H[0]},${H[1]}
                            ${I[0]},${I[1]}
                            ${J[0]},${J[1]}
                            ${K[0]},${K[1]}
                        "/>
                        <polygon class="hint" points="
                            ${L[0]},${L[1]}
                            28,160
                            ${H[0]},${H[1]}
                            ${H[0]},${H[1] + 1}
                        "/>
                        <polygon fill="url(#long-shadow)" points="
                            ${20 - 12 * Math.cos(Math.PI / 4)},${44 + 12 * Math.sin(Math.PI / 4)}
                            ${20 - 12 * Math.cos(Math.PI / 4) + 192},${44 + 12 * Math.sin(Math.PI / 4) + 192}
                            192,192
                            192,44
                            184,44
                        "/>
                        <rect fill="#EA4335" x="164" width="28" height="100%"/>
                        <path fill="#EA4335" filter="url(#shadow-z4)" d="
                            M ${A[0]} ${A[1]}
                            V ${B[1]}
                            A 12 12 0 0 1 ${C[0]} ${C[1]}
                            L ${D[0]} ${D[1]}
                            L ${E[0]} ${E[1]}
                            A 12 12 0 0 1 ${F[0]} ${F[1]}
                            V ${G[1]}
                            H 20
                            L 96 83
                            L 172 32
                            Z
                        "/>
                        <polygon fill="#EEEEEE" points="
                            172,0
                            172,32
                            96,84
                            20,32
                            20,0
                        "/>
                    </g>
                    <g>
                        <path class="hint" d="
                            M 20 33
                            A 12 11 0 0 0 8 44
                            A 12 12 0 0 1 20 32
                            L ${20 + 1 / Math.tan(angle)} 33
                            Z
                        "/>
                        <polygon class="hint" points="
                            20,32
                            172,32
                            ${172 - 1 / Math.tan(angle)},33
                            ${20 + 1 / Math.tan(angle)},33
                        "/>
                        <path class="hint" d="
                            M 172 32
                            A 12 12 0 0 1 184 44
                            A 12 11 0 0 0 172 33
                            L ${172 - 1 / Math.tan(angle)} 33
                            Z
                        "/>
                        <path class="shade" d="
                            M 28 159
                            H 20
                            A 12 11 0 0 1 8 148
                            A 12 12 0 0 0 20 160
                            H 28
                            Z
                        "/>
                        <polygon class="shade" points="
                            ${L[0]},${L[1]}
                            164,159
                            164,160
                            28,160
                        "/>
                        <path class="shade" d="
                            M 164 160
                            H 172
                            A 12 12 0 0 0 184 148
                            A 12 11 0 0 1 172 159
                            H 164
                            Z
                        "/>
                        <path class="shade" d="
                            M ${C[0]} ${C[1] - 1}
                            A 12 11 0 0 0 ${B[0]} ${B[1]}
                            A 12 12 0 0 1 ${C[0]} ${C[1]}
                            L ${D[0]} ${D[1]}
                            L ${E[0]} ${E[1]}
                            A 12 12 0 0 1 ${F[0]} ${F[1]}
                            A 12 11 0 0 0 ${E[0]} ${E[1] - 1}
                            L ${D[0]} ${D[1] - 1}
                            Z
                        "/>
                    </g>
                    <use fill="url(#finish)" href="#outline"/>
                `}
                case 'google': {
                    const A = getCircleLineIntersection([96, 96], 60, [92, 96], [96, 92])[0];
                    const B = [36, 96];
                    const C = [96, 156];
                    const D = getCircleLineIntersection([96, 98], 58, [96, 85], [97, 85])[0];
                    const E = [96, 85];
                    const F = [96, 108];
                    const G = getCircleLineIntersection([96, 98], 34, [96, 108], [97, 108])[0];
                    const H = [96, 132];
                    const I = [96, 60];
                    const J = getCircleLineIntersection([96, 94], 34, [92, 96], [96, 92])[0];
                    const p1 = [32, 60];
                    const p2 = [160, 160];
                    const p3 = [32, 132];
                    const p4 = [160, 32];
                    const K = getLineLineIntersection([96, 96], p1, p2, p3, p4);
                    return `
                    <style>
                        .hint {
                            fill: white;
                            opacity: 0.4;
                        }
                        .shade {
                            fill: #212121;
                            opacity: 0.1;
                        }
                    </style>
                    <defs>
                        <path id="logo" d="
                            M ${A[0]} ${A[1]}
                            A 60 60 0 0 0 ${B[0]} ${B[1]}
                            A 60 60 0 0 0 ${C[0]} ${C[1]}
                            A 58 58 0 0 0 ${D[0]} ${D[1]}
                            H ${E[0]}
                            V ${F[1]}
                            H ${G[0]}
                            A 34 34 0 0 1 ${H[0]} ${H[1]}
                            A 36 36 0 0 1 ${I[0]} ${I[1]}
                            A 34 34 0 0 1 ${J[0]} ${J[1]}
                            Z
                        "/>
                        <clipPath id="logo-clip-path">
                            <use href="#logo"/>
                        </clipPath>
                        <radialGradient id="finish" cx="${96 - 88 * Math.cos(Math.PI / 4)}" cy="${96 - 88 * Math.sin(Math.PI / 4)}" r="${88 * 2}" gradientUnits="userSpaceOnUse">
                            <stop offset="0" stop-color="white" stop-opacity="0.1"/>
                            <stop offset="${1 / 3}" stop-color="white" stop-opacity="0.05"/>
                            <stop offset="1" stop-color="white" stop-opacity="0"/>
                        </radialGradient>
                    </defs>
                    <circle fill="#F5F5F5" cx="96" cy="96" r="88"/>
                    <path class="hint" d="M 8 96 A 88 88 0 0 1 184 96 A 88 87 0 0 0 8 96 Z"/>
                    <path class="shade" d="M 8 96 A 88 88 0 0 0 184 96 A 88 87 0 0 1 8 96 Z"/>
                    <g clip-path="url(#logo-clip-path)">
                        <polygon fill="#EA4335" points="
                            32,32
                            32,60
                            ${K[0]},${K[1]}
                            96,76
                            160,76
                            160,32
                        "/>
                        <polygon fill="#34A853" points="
                            32,160
                            32,132
                            ${K[0]},${K[1]}
                            160,${K[1]}
                            160,160
                        "/>
                        <polygon fill="#FBBC05" points="
                            32,60
                            ${K[0]},${K[1]}
                            32,132
                        "/>
                        <polygon fill="#4285F4" points="
                            160,76
                            96,76
                            ${K[0]},${K[1]}
                            160,160
                        "/>
                    </g>
                    <circle fill="url(#finish)" cx="96" cy="96" r="88"/>
                `}
                case 'google_camera': {
                    const innerRadius = 16;
                    const A = [96, 96 - innerRadius];
                    const B = [96 + innerRadius * Math.cos(Math.PI / 6), 96 - innerRadius * Math.sin(Math.PI / 6)];
                    const C = [96 + innerRadius * Math.cos(Math.PI / 6), 96 + innerRadius * Math.sin(Math.PI / 6)];
                    const D = [96, 96 + innerRadius];
                    const E = [96 - innerRadius * Math.cos(Math.PI / 6), 96 + innerRadius * Math.sin(Math.PI / 6)];
                    const F = [96 - innerRadius * Math.cos(Math.PI / 6), 96 - innerRadius * Math.sin(Math.PI / 6)];
                    const G = [192, A[1]];
                    const H = [B[0] + (192 - B[1]) * Math.tan(Math.PI / 6), 192];
                    const I = [C[0] - (192 - C[1]) * Math.tan(Math.PI / 6), 192];
                    const J = [0, D[1]];
                    const K = [E[0] - E[1] * Math.tan(Math.PI / 6), 0];
                    const L = [F[0] + F[1] * Math.tan(Math.PI / 6), 0];
                    const M = [172 + 12 * Math.cos(Math.PI / 4), 148 + 12 * Math.sin(Math.PI / 4)];
                    const assistL1 = ((M[0] - 96) - (M[1] - 96)) / 2;
                    const N = [M[0] - assistL1, M[1] + assistL1];
                    const O = [96 + 52 * Math.cos(Math.PI / 4), 96 - 52 * Math.cos(Math.PI / 4)];
                    const P = [192, O[1] + (192 - O[0])];
                    const Q = [96 - 52 * Math.cos(Math.PI / 4), 96 + 52 * Math.cos(Math.PI / 4)];
                    const R = [Q[0] + (192 - Q[1]), 192];
                    const S = [26 - 6 * Math.cos(Math.PI / 4), 26 - 6 * Math.cos(Math.PI / 4)];
                    return `
                    <style>
                        .hint {
                            fill: white;
                            opacity: 0.4;
                        }
                        .shade {
                            fill: #212121;
                            opacity: 0.1;
                        }
                        g:nth-of-type(1) .hint {
                            opacity: 0.2;
                        }
                        g:nth-of-type(1) .shade {
                            opacity: 0.2;
                        }
                    </style>
                    <defs>
                        <rect id="shutter" x="20" y="20" width="32" height="32" rx="6" ry="6"/>
                        <rect id="body" x="8" y="32" width="176" height="128" rx="12" ry="12"/>
                        <circle id="lamp" cx="164" cy="52" r="8"/>
                        <circle id="lens" cx="96" cy="96" r="46"/>
                        <clipPath id="shutter-clip-path">
                            <use href="#shutter"/>
                        </clipPath>
                        <clipPath id="body-clip-path">
                            <use href="#body"/>
                        </clipPath>
                        <clipPath id="lens-clip-path">
                            <use href="#lens"/>
                        </clipPath>
                        <mask id="outline-mask">
                            <use fill="white" href="#shutter"/>
                            <use fill="white" href="#body"/>
                        </mask>
                        <filter id="shadow-z2" filterUnits="userSpaceOnUse">
                            <feDropShadow dx="0" dy="1" stdDeviation="0.5" flood-color="#212121" flood-opacity="0.2"/>
                            <feDropShadow dx="0" dy="2" stdDeviation="1" flood-color="#212121" flood-opacity="0.14"/>
                            <feDropShadow dx="0" dy="1" stdDeviation="2.5" flood-color="#212121" flood-opacity="0.12"/>
                        </filter>
                        <filter id="shadow-z4" filterUnits="userSpaceOnUse">
                            <feDropShadow dx="0" dy="1" stdDeviation="2" flood-color="#212121" flood-opacity="0.2"/>
                            <feDropShadow dx="0" dy="4" stdDeviation="2.5" flood-color="#212121" flood-opacity="0.14"/>
                            <feDropShadow dx="0" dy="1" stdDeviation="5" flood-color="#212121" flood-opacity="0.12"/>
                        </filter>
                        <linearGradient id="long-shadow" x1="96" y1="96" x2="${N[0]}" y2="${N[1]}" gradientUnits="userSpaceOnUse">
                            <stop offset="0" stop-color="#212121" stop-opacity="0.1"></stop>
                            <stop offset="${1 / 3}" stop-color="#212121" stop-opacity="0.05"></stop>
                            <stop offset="1" stop-color="#212121" stop-opacity="0"></stop>
                        </linearGradient>
                        <radialGradient id="finish" cx="${S[0]}" cy="${S[1]}" r="${Math.hypot(N[0] - S[0], N[1] - S[1])}" gradientUnits="userSpaceOnUse">
                            <stop offset="0" stop-color="white" stop-opacity="0.1"/>
                            <stop offset="${1 / 3}" stop-color="white" stop-opacity="0.05"/>
                            <stop offset="1" stop-color="white" stop-opacity="0"/>
                        </radialGradient>
                    </defs>
                    <g>
                        <use fill="#757575" href="#shutter"/>
                        <path class="hint" d="
                            M 26 21
                            A 6 5 0 0 0 20 26
                            A 6 6 0 0 1 26 20
                            H 46
                            A 6 6 0 0 1 52 26
                            A 6 5 0 0 0 46 21
                            Z
                        "/>
                        <use filter="url(#shadow-z2)" clip-path="url(#shutter-clip-path)" href="#body"/>
                    </g>
                    <g>
                        <use fill="#E0E0E0" href="#body"/>
                        <path class="hint" d="
                            M 20 33
                            A 12 11 0 0 0 8 44
                            A 12 12 0 0 1 20 32
                            H 172
                            A 12 12 0 0 1 184 44
                            A 12 11 0 0 0 172 33
                            Z
                        "/>
                        <path class="shade" d="
                            M 20 159
                            A 12 11 0 0 1 8 148
                            A 12 12 0 0 0 20 160
                            H 172
                            A 12 12 0 0 0 184 148
                            A 12 11 0 0 1 172 159
                            Z
                        "/>
                    </g>
                    <use fill="#757575" href="#lamp"/>
                    <polygon fill="url(#long-shadow)" clip-path="url(#body-clip-path)" points="
                        ${O[0]},${O[1]}
                        ${P[0]},${P[1]}
                        192,192
                        ${R[0]},${R[1]}
                        ${Q[0]},${Q[1]}
                    "/>
                    <g clip-path="url(#lens-clip-path)">
                        <polygon fill="#4285F4" points="
                            ${A[0]},${A[1]}
                            ${G[0]},${G[1]}
                            ${H[0]},${H[1]}
                            ${B[0]},${B[1]}
                        "/>
                        <polygon fill="#3F51B5" points="
                            ${B[0]},${B[1]}
                            ${H[0]},${H[1]}
                            ${I[0]},${I[1]}
                            ${C[0]},${C[1]}
                        "/>
                        <polygon fill="#EA4335" points="
                            ${C[0]},${C[1]}
                            ${I[0]},${I[1]}
                            ${J[0]},${J[1]}
                            ${D[0]},${D[1]}
                        "/>
                        <polygon fill="#FF6D00" points="
                            ${D[0]},${D[1]}
                            ${J[0]},${J[1]}
                            ${K[0]},${K[1]}
                            ${E[0]},${E[1]}
                        "/>
                        <polygon fill="#FF8F00" points="
                            ${E[0]},${E[1]}
                            ${K[0]},${K[1]}
                            ${L[0]},${L[1]}
                            ${F[0]},${F[1]}
                        "/>
                        <polygon fill="#FFBC00" points="
                            ${F[0]},${F[1]}
                            ${L[0]},${L[1]}
                            ${G[0]},${G[1]}
                            ${A[0]},${A[1]}
                        "/>
                    </g>
                    <g>
                        <use fill="none" stroke="#EEEEEE" stroke-width="12" filter="url(#shadow-z4)" href="#lens"/>
                        <path class="hint" d="
                            M 44 96
                            A 52 52 0 0 1 148 96
                            A 52 51 0 0 0 44 96
                            Z
                        "/>
                        <path class="hint" d="
                            M 56 96
                            A 40 40 0 0 0 136 96
                            A 40 41 0 0 1 56 96
                            Z
                        "/>
                        <path class="shade" d="
                            M 44 96
                            A 52 52 0 0 0 148 96
                            A 52 51 0 0 1 44 96
                            Z
                        "/>
                        <path class="shade" d="
                            M 56 96
                            A 40 40 0 0 1 136 96
                            A 40 41 0 0 0 56 96
                            Z
                        "/>
                    </g>
                    <circle fill="#EEEEEE" cx="96" cy="96" r="16"/>
                    <rect fill="url(#finish)" width="100%" height="100%" mask="url(#outline-mask)"/>
                `}
                case 'maps': {
                    return `
                    <style>
                        .hint {
                            fill: white;
                            opacity: 0.2;
                        }
                        .shade {
                            fill: #1A237E;
                            opacity: 0.2;
                        }
                        g:last-of-type .shade {
                            fill: #3E2723;
                        }
                    </style>
                    <defs>
                        <rect id="back" x="20" y="20" width="152" height="152" rx="12" ry="12"/>
                        <path id="front" d="
                            M 188 44
                            C 188 74.14 154.34 89.84 150.36 132.86
                            C 150.26 134.06 149.22 135 148 135
                            C 146.78 135 145.76 134.06 145.64 132.86
                            C 141.66 89.84 108 74.14 108 44
                            A 40 40 0 0 1 188 44
                            Z
                        "/>
                        <clipPath id="back-clip-path">
                            <use href="#back"/>
                        </clipPath>
                        <clipPath id="outline-clip-path">
                            <use href="#back"/>
                            <use href="#front"/>
                        </clipPath>
                        <filter id="shadow" filterUnits="userSpaceOnUse">
                            <feDropShadow dx="0" dy="1" stdDeviation="2" flood-color="#212121" flood-opacity="0.2"/>
                            <feDropShadow dx="0" dy="4" stdDeviation="2.5" flood-color="#212121" flood-opacity="0.14"/>
                            <feDropShadow dx="0" dy="1" stdDeviation="5" flood-color="#212121" flood-opacity="0.12"/>
                        </filter>
                        <radialGradient id="finish" cx="${32 - 12 * Math.cos(Math.PI / 4)}" cy="${32 - 12 * Math.sin(Math.PI / 4)}" r="${Math.hypot(160 - 32, 160 - 32) + 12 * 2}" gradientUnits="userSpaceOnUse">
                            <stop offset="0" stop-color="white" stop-opacity="0.1"/>
                            <stop offset="${1 / 3}" stop-color="white" stop-opacity="0.05"/>
                            <stop offset="1" stop-color="white" stop-opacity="0"/>
                        </radialGradient>
                    </defs>
                    <g clip-path="url(#back-clip-path)">
                        <polygon fill="#4285F4" points="
                            96,106
                            158,168
                            158,192
                            34,192
                            34,168
                        "/>
                        <polygon fill="#34A853" points="
                            0,0
                            160,0
                            160,24
                            24,160
                            0,160
                        "/>
                        <polygon fill="#D2D2D2" points="
                            192,34
                            192,160
                            168,160
                            104,96
                            184,34
                        "/>
                        <polygon fill="#EEEEEE" points="
                            108,96
                            188,176
                            162,176
                            94,108
                        "/>
                        <polygon fill="#FBBC05" points="
                            164,16
                            190,16
                            30,176
                            4,176
                        "/>
                        <path fill="#EEEEEE" d="
                            M 54 50
                            V 58.52
                            H 65.84
                            C 64.9 63.58 60.46 67.26 54 67.26
                            C 46.82 67.26 40.98 61.18 40.98 54.02
                            S 46.82 40.78 54 40.78
                            C 57.24 40.78 60.12 41.9 62.42 44.06
                            L 68.72 37.76
                            C 64.9 34.18 59.94 32 54 32
                            C 41.84 32 32 41.84 32 54
                            S 41.84 76 54 76
                            C 66.7 76 75.12 67.06 75.12 54.5
                            C 75.12 52.94 74.98 51.44 74.72 50
                            H 54
                            Z
                        "/>
                        <use fill="#EA4335" filter="url(#shadow)" href="#front"/>
                    </g>
                    <g>
                        <path class="hint" d="
                            M 32 21
                            a 12 11 0 0 0 -12 11
                            a 12 12 0 0 1 12 -12
                            H 160
                            a 12 12 0 0 1 12 12
                            a 12 11 0 0 0 -12 -11
                            Z
                        "/>
                        <path class="shade" d="
                            M 32 171
                            a 12 11 0 0 1 -12 -11
                            a 12 12 0 0 0 12 12
                            H 160
                            a 12 12 0 0 0 12 -12
                            a 12 11 0 0 1 -12 11
                            Z
                        "/>
                    </g>
                    <g>
                        <use fill="#EA4335" href="#front"/>
                        <circle fill="#A50E0E" cx="148" cy="44" r="14"/>
                        <path class="hint" d="M 108 44 a 40 40 0 0 1 80 0 a 40 39 0 0 0 -80 0 Z"/>
                        <path class="shade" d="M 188 44 C 188 74.14 154.34 89.84 150.36 132.86 C 150.26 134.06 149.22 135 148 135 C 146.78 135 145.76 134.06 145.64 132.86 C 141.66 89.84 108 74.14 108 44 C 108 73.14 141.66 88.84 145.64 131.86 C 145.76 133.06 146.78 134 148 134 C 149.22 134 150.26 133.06 150.36 131.86 C 154.34 88.84 188 73.14 188 44 Z"/>
                    </g>
                    <rect fill="url(#finish)" width="100%" height="100%" clip-path="url(#outline-clip-path)"/>
                `}
                case 'messenger': {
                    const borderRaidus = 12;
                    const A = [132 + borderRaidus * Math.cos(Math.PI / 4), 72 - borderRaidus * Math.sin(Math.PI / 4)];
                    const B = [156 + borderRaidus * Math.cos(Math.PI / 4), 124 + borderRaidus * Math.sin(Math.PI / 4)];
                    const assistL1 = B[0] - A[0];
                    const assistL2 = B[1] - A[1];
                    const C = [B[0] + (assistL2 - assistL1) / 2, B[1] - (assistL2 - assistL1) / 2];
                    const assistL3 = 2 / 37 * 20;
                    const gradientStart = [32, 32];
                    const gradientEnd = [132 + borderRaidus * Math.cos(Math.PI / 4), 168 + borderRaidus * Math.cos(Math.PI / 4)];
                    const gradientRadius = Math.hypot((gradientEnd[0] - gradientStart[0]), (gradientEnd[1] - gradientStart[1]));
                    return `
                    <style>
                        g:first-of-type .hint {
                            fill: white;
                            opacity: 0.4;
                        }
                        g:last-of-type .hint {
                            fill: white;
                            opacity: 0.2;
                        }
                        g:first-of-type .shade {
                            fill: #212121;
                            opacity: 0.1;
                        }
                        g:last-of-type .shade {
                            fill: #263238;
                            opacity: 0.1;
                        }
                        g:first-of-type rect {
                            fill: #9E9E9E;
                        }
                        g:last-of-type rect {
                            fill: #EEEEEE;
                        }
                    </style>
                    <defs>
                        <path id="back" d="
                            M 188 12
                            H 60
                            A ${borderRaidus} ${borderRaidus} 0 0 0 48 24
                            V 124
                            A ${borderRaidus} ${borderRaidus} 0 0 0 60 136
                            H 156
                            A ${borderRaidus} ${borderRaidus} 0 0 0 168 124
                            V 48
                            Z
                        "/>
                        <path id="front" d="
                            M 4 60
                            H 132
                            A ${borderRaidus} ${borderRaidus} 0 0 1 144 72
                            V 168
                            A ${borderRaidus} ${borderRaidus} 0 0 1 132 180
                            H 36
                            A ${borderRaidus} ${borderRaidus} 0 0 1 24 168
                            V 96
                            Z
                        "/>
                        <clipPath id="clip-path">
                            <use href="#back"/>
                        </clipPath>
                        <mask id="mask">
                            <use fill="white" href="#back"/>
                            <use fill="white" href="#front"/>
                        </mask>
                        <filter id="shadow" filterUnits="userSpaceOnUse">
                            <feDropShadow dx="0" dy="1" stdDeviation="2" flood-color="#212121" flood-opacity="0.2"/>
                            <feDropShadow dx="0" dy="4" stdDeviation="2.5" flood-color="#212121" flood-opacity="0.14"/>
                            <feDropShadow dx="0" dy="1" stdDeviation="5" flood-color="#212121" flood-opacity="0.12"/>
                        </filter>
                        <linearGradient id="long-shadow" x1="${A[0]}" y1="${A[1]}" x2="${C[0]}" y2="${C[1]}" gradientUnits="userSpaceOnUse">
                            <stop offset="0" stop-color="#212121" stop-opacity="0.1"></stop>
                            <stop offset="${1 / 3}" stop-color="#212121" stop-opacity="0.05"></stop>
                            <stop offset="1" stop-color="#212121" stop-opacity="0"></stop>
                        </linearGradient>
                        <radialGradient id="finish" cx="${gradientStart[0]}" cy="${gradientStart[1]}" r="${gradientRadius}" gradientUnits="userSpaceOnUse">
                            <stop offset="0" stop-color="white" stop-opacity="0.1"/>
                            <stop offset="${1 / 3}" stop-color="white" stop-opacity="0.05"/>
                            <stop offset="1" stop-color="white" stop-opacity="0"/>
                        </radialGradient>
                    </defs>
                    <g>
                        <use fill="#E0E0E0" href="#back"/>
                        <rect x="72" y="36" width="72" height="12"/>
                        <path fill="url(#long-shadow)" clip-path="url(#clip-path)" d="
                            M 144 72
                            A ${borderRaidus} ${borderRaidus} 0 0 0 ${A[0]} ${A[1]}
                            L 168 ${A[1] + (168 - A[0])}
                            V 136
                            H 144
                            Z
                        "/>
                        <path class="hint" d="
                            M 188 12
                            H 60
                            A ${borderRaidus} ${borderRaidus} 0 0 0 48 24
                            A ${borderRaidus} ${borderRaidus - 1} 0 0 1 60 13
                            L ${188 - assistL3} 13
                            Z
                        "/>
                        <path class="shade" d="
                            M 188 12
                            L ${188 - assistL3} 13
                            L 168 47
                            v 1
                            Z
                        "/>
                        <path class="shade" d="
                            M 156 135
                            A ${borderRaidus} ${borderRaidus - 1} 0 0 0 168 124
                            A ${borderRaidus} ${borderRaidus} 0 0 1 156 136
                            H 60
                            A ${borderRaidus} ${borderRaidus} 0 0 1 48 124
                            A ${borderRaidus} ${borderRaidus - 1} 0 0 0 60 135
                            Z
                        "/>
                    </g>
                    <g filter="url(#shadow)" clip-path="url(#clip-path)">
                        <use fill="#03A9F4" href="#front"/>
                    </g>
                    <g>
                        <use fill="#03A9F4" href="#front"/>
                        <rect x="48" y="88" width="72" height="12"/>
                        <rect x="48" y="112" width="72" height="12"/>
                        <rect x="48" y="136" width="48" height="12"/>
                        <path class="hint" d="
                            M 4 60
                            H 132
                            A ${borderRaidus} ${borderRaidus} 0 0 1 144 72
                            A ${borderRaidus} ${borderRaidus - 1} 0 0 0 132 61
                            L ${4 + assistL3} 61
                            Z
                        "/>
                        <path class="shade" d="
                            M 4 60
                            L ${4 + assistL3} 61
                            L 24 95
                            v 1
                            Z
                        "/>
                        <path class="shade" d="
                            M 132 179
                            A ${borderRaidus} ${borderRaidus - 1} 0 0 0 144 168
                            A ${borderRaidus} ${borderRaidus} 0 0 1 132 180
                            H 36
                            A ${borderRaidus} ${borderRaidus} 0 0 1 24 168
                            A ${borderRaidus} ${borderRaidus - 1} 0 0 0 36 179
                            Z
                        "/>
                    </g>
                    <rect fill="url(#finish)" width="100%" height="100%" mask="url(#mask)"/>
                `}
                case 'play_games': {
                    const A = [138, 36];
                    const B = [138, 120];
                    const C = [72, 120];
                    const assistL1 = Math.hypot(12, 12);
                    const assistA = [assistL1, 168 - assistL1];
                    const D = [assistA[0] + assistL1 * Math.cos(Math.PI / 4), assistA[1] + assistL1 * Math.sin(Math.PI / 4)];
                    const C1 = [54, 78];
                    const C2 = [assistA[0], assistA[1]];
                    const R1 = 42;
                    const R2 = assistL1;
                    const distance = Math.hypot(C1[0] - C2[0], C1[1] - C2[1]);
                    const heck = Math.sqrt(Math.pow(distance, 2) - Math.pow((R1 - R2), 2));
                    const gamma = Math.hypot(heck, R2);
                    const theta = Math.acos((Math.pow(R1, 2) + Math.pow(distance, 2) - Math.pow(gamma, 2)) / (2 * R1 * distance));
                    const angleA = theta + Math.atan((54 - assistA[0]) / (assistA[1] - 78)) - Math.PI / 2;
                    const E = [assistA[0] - assistL1 * Math.cos(angleA), assistA[1] - assistL1 * Math.sin(angleA)];
                    const F = [54 - 42 * Math.cos(angleA), 78 - 42 * Math.sin(angleA)];
                    const G = [54, 36];
                    const gradientRadius = Math.hypot((192 - assistL1) + assistL1 * Math.cos(Math.PI / 4) - (54 - 42 * Math.cos(Math.PI / 4)), 168 - assistL1 + assistL1 * Math.sin(Math.PI / 4) - (78 - 42 * Math.cos(Math.PI / 4)));
                    return `
                    <style>
                        .hint {
                            fill: white;
                            opacity: 0.2;
                        }
                        g:last-of-type .hint {
                            opacity: 0.4;
                        }
                        .shade {
                            fill: #263238;
                            opacity: 0.2;
                        }
                        g:last-of-type .shade {
                            fill: #212121;
                            opacity: 0.1;
                        }
                    </style>
                    <defs>
                        <path id="back" d="
                            M ${192 - F[0]} ${F[1]}
                            L ${192 - E[0]} ${E[1]}
                            A ${assistL1} ${assistL1} 0 0 1 ${192 - D[0]} ${D[1]}
                            L 132 132
                            H 59
                            L 95 96
                            Z
                        "/>
                        <path id="front" d="
                            M ${A[0]} ${A[1]}
                            A 42 42 0 0 1 ${B[0]} ${B[1]}
                            H ${C[0]}
                            L ${D[0]} ${D[1]}
                            A ${assistL1} ${assistL1} 0 0 1 ${E[0]} ${E[1]}
                            L ${F[0]} ${F[1]}
                            A 42 42 0 0 1 ${G[0]} ${G[1]}
                            Z
                        "/>
                        <path id="button-hint" class="hint" d="
                            M 132 62
                            A 6 6 0 0 1 144 62
                            A 6 5.5 0 0 0 132 62
                            Z
                        "/>
                        <path id="button-shade" class="shade" d="
                            M 132 62
                            A 6 6 0 0 0 144 62
                            A 6 5.5 0 0 1 132 62
                            Z
                        "/>
                        <polygon id="button-long-shadow-shape" fill="url(#button-long-shadow)" points="
                            ${138 + 6 * Math.cos(Math.PI / 4)},${62 - 6 * Math.cos(Math.PI / 4)}
                            ${154 + 6 * Math.cos(Math.PI / 4)},${78 - 6 * Math.cos(Math.PI / 4)}
                            ${154 - 6 * Math.cos(Math.PI / 4)},${78 + 6 * Math.cos(Math.PI / 4)}
                            ${138 - 6 * Math.cos(Math.PI / 4)},${62 + 6 * Math.cos(Math.PI / 4)}
                        "/>
                        <clipPath id="back-clip-path">
                            <use href="#back"/>
                        </clipPath>
                        <filter id="shadow-z1" filterUnits="userSpaceOnUse">
                            <feDropShadow dx="0" dy="1" stdDeviation="0.5" flood-color="#263238" flood-opacity="0.2"/>
                            <feDropShadow dx="0" dy="1" stdDeviation="0.5" flood-color="#263238" flood-opacity="0.14"/>
                            <feDropShadow dx="0" dy="1" stdDeviation="1.5" flood-color="#263238" flood-opacity="0.12"/>
                        </filter>
                        <filter id="shadow-z2" filterUnits="userSpaceOnUse">
                            <feDropShadow dx="0" dy="1" stdDeviation="0.5" flood-color="#263238" flood-opacity="0.2"/>
                            <feDropShadow dx="0" dy="2" stdDeviation="1" flood-color="#263238" flood-opacity="0.14"/>
                            <feDropShadow dx="0" dy="1" stdDeviation="2.5" flood-color="#263238" flood-opacity="0.12"/>
                        </filter>
                        <linearGradient id="stick-long-shadow" x1="32" y1="83" x2="65" y2="116" gradientUnits="userSpaceOnUse">
                            <stop offset="0" stop-color="#263238" stop-opacity="0.2"></stop>
                            <stop offset="${1 / 3}" stop-color="#263238" stop-opacity="0.1"></stop>
                            <stop offset="1" stop-color="#263238" stop-opacity="0"></stop>
                        </linearGradient>
                        <linearGradient id="button-long-shadow" x1="138" y1="62" x2="154" y2="78" gradientUnits="userSpaceOnUse">
                            <stop offset="0" stop-color="#263238" stop-opacity="0.2"></stop>
                            <stop offset="${1 / 3}" stop-color="#263238" stop-opacity="0.1"></stop>
                            <stop offset="1" stop-color="#263238" stop-opacity="0"></stop>
                        </linearGradient>
                        <radialGradient id="finish" cx="${54 - 42 * Math.cos(Math.PI / 4)}" cy="${78 - 42 * Math.sin(Math.PI / 4)}" r="${gradientRadius}" gradientUnits="userSpaceOnUse">
                            <stop offset="0" stop-color="white" stop-opacity="0.1"/>
                            <stop offset="${1 / 3}" stop-color="white" stop-opacity="0.05"/>
                            <stop offset="1" stop-color="white" stop-opacity="0"/>
                        </radialGradient>
                    </defs>
                    <use fill="#689F38" href="#back"/>
                    <g>
                        <path class="shade" d="
                            M ${192 - D[0]} ${D[1] - 1}
                            A ${assistL1} ${assistL1} 0 0 0 ${192 - assistA[0]} 167
                            A ${assistL1} ${assistL1 - 1} 0 0 0 192 ${assistA[1]}
                            A ${assistL1} ${assistL1} 0 0 1 ${192 - D[0]} ${D[1]}
                            L 132 132
                            H 59
                            V 131
                            H 132
                            Z
                        "/>
                    </g>
                    <use fill="#8BC34A" filter="url(#shadow-z2)" clip-path="url(#back-clip-path)" href="#front"/>
                    <use fill="#8BC34A" href="#front"/>
                    <g>
                        <path class="hint" d="
                            M 54 37
                            A 42 41 0 0 0 ${F[0]} ${F[1]}
                            A 42 42 0 0 1 54 36
                            H 138
                            A 42 42 0 0 1 180 78
                            A 42 41 0 0 0 138 37
                            Z
                        "/>
                        <path class="shade" d="
                            M ${D[0]} ${D[1] - 1}
                            A ${assistL1} ${assistL1} 0 0 1 ${assistA[0]} 167
                            A ${assistL1} ${assistL1 - 1} 0 0 1 0 ${assistA[1]}
                            A ${assistL1} ${assistL1} 0 0 0 ${D[0]} ${D[1]}
                            L ${C[0]} ${C[1]}
                            H 138
                            A 42 42 0 0 0 180 78
                            A 42 41 0 0 1 138 119
                            H 72
                            Z
                        "/>
                    </g>
                    <g>
                        <polygon fill="url(#stick-long-shadow)" points="
                            59,56
                            92,89
                            65,116
                            32,83
                            54,78
                        "/>
                        <use href="#button-long-shadow-shape"/>
                        <use x="16" y="16" href="#button-long-shadow-shape"/>
                        <use y="32" href="#button-long-shadow-shape"/>
                        <use x="-16" y="16" href="#button-long-shadow-shape"/>
                    </g>
                    <g filter="url(#shadow-z1)">
                        <rect fill="#EEEEEE" x="32" y="73" width="44" height="10"/>
                        <rect fill="#EEEEEE" x="49" y="56" width="10" height="44"/>
                        <circle fill="#EEEEEE" cx="138" cy="62" r="6"/>
                        <circle fill="#EEEEEE" cx="154" cy="78" r="6"/>
                        <circle fill="#EEEEEE" cx="138" cy="94" r="6"/>
                        <circle fill="#EEEEEE" cx="122" cy="78" r="6"/>
                    </g>
                    <g>
                        <rect class="hint" x="32" y="73" width="17" height="0.5"/>
                        <rect class="hint" x="49" y="56" width="10" height="0.5"/>
                        <rect class="hint" x="59" y="73" width="17" height="0.5"/>
                        <use href="#button-hint"/>
                        <use x="16" y="16" href="#button-hint"/>
                        <use y="32" href="#button-hint"/>
                        <use x="-16" y="16" href="#button-hint"/>
                        <rect class="shade" x="32" y="82.5" width="17" height="0.5"/>
                        <rect class="shade" x="49" y="99.5" width="10" height="0.5"/>
                        <rect class="shade" x="59" y="82.5" width="17" height="0.5"/>
                        <use href="#button-shade"/>
                        <use x="16" y="16" href="#button-shade"/>
                        <use y="32" href="#button-shade"/>
                        <use x="-16" y="16" href="#button-shade"/>
                    </g>
                    <path fill="url(#finish)" d="
                        M ${A[0]} ${A[1]}
                        A 42 42 0 0 1 ${192 - F[0]} ${F[1]}
                        L ${192 - E[0]} ${E[1]}
                        A ${assistL1} ${assistL1} 0 0 1 ${192 - D[0]} ${D[1]}
                        L 132 132
                        H 60
                        L ${D[0]} ${D[1]}
                        A ${assistL1} ${assistL1} 0 0 1 ${E[0]} ${E[1]}
                        L ${F[0]} ${F[1]}
                        A 42 42 0 0 1 ${G[0]} ${G[1]}
                        Z
                    "/>
                `}
                case 'play_movies': {
                    const gradientStart = [20 - 12 * Math.cos(Math.PI / 4), 44 - 12 * Math.sin(Math.PI / 4)];
                    const gradientEnd = [172 + 12 * Math.cos(Math.PI / 4), 148 + 12 * Math.sin(Math.PI / 4)];
                    const gradientRadius = Math.hypot((gradientEnd[0] - gradientStart[0]), (gradientEnd[1] - gradientStart[1]));
                    return `
                    <style>
                        .hint {
                            fill: white;
                            opacity: 0.2;
                        }
                        g:first-of-type .hint {
                            opacity: 0.05;
                        }
                        .shade {
                            fill: #3E2723;
                            opacity: 0.2;
                        }
                        g:first-of-type .shade {
                            opacity: 0.05;
                        }
                    </style>
                    <defs>
                        <rect id="hole" fill="black" width="14" height="14" rx="2" ry="2"/>
                        <path id="hole-hint" class="hint" d="
                            M 26 62
                            A 2 2 0 0 1 24 60
                            A 2 2.5 0 0 0 26 63
                            H 36
                            A 2 2.5 0 0 0 38 60
                            A 2 2 0 0 1 36 62
                            Z
                        "/>
                        <path id="hole-shade" class="shade" d="
                            M 26 48
                            A 2 2 0 0 0 24 50
                            A 2 2.5 0 0 1 26 47
                            H 36
                            A 2 2.5 0 0 1 38 50
                            A 2 2 0 0 0 36 48
                            Z
                        "/>
                        <mask id="mask">
                            <rect fill="white" x="8" y="32" width="176" height="128" rx="12" ry="12"/>
                            <use x="24" y="48" href="#hole"/>
                            <use x="24" y="76" href="#hole"/>
                            <use x="24" y="102" href="#hole"/>
                            <use x="24" y="130" href="#hole"/>
                            <use x="154" y="48" href="#hole"/>
                            <use x="154" y="76" href="#hole"/>
                            <use x="154" y="102" href="#hole"/>
                            <use x="154" y="130" href="#hole"/>
                        </mask>
                        <radialGradient id="finish" cx="${gradientStart[0]}" cy="${gradientStart[1]}" r="${gradientRadius}" gradientUnits="userSpaceOnUse">
                            <stop offset="0" stop-color="white" stop-opacity="0.1"/>
                            <stop offset="${1 / 3}" stop-color="white" stop-opacity="0.05"/>
                            <stop offset="1" stop-color="white" stop-opacity="0"/>
                        </radialGradient>
                    </defs>
                    <rect fill="#D93025" width="100%" height="51%" mask="url(#mask)"/>
                    <rect fill="#EA4335" y="50%" width="100%" height="50%" mask="url(#mask)"/>
                    <g>
                        <rect class="shade" x="8" y="95" width="176" height="1"/>
                        <rect class="hint" x="8" y="96" width="176" height="1"/>
                    </g>
                    <g>
                        <use x="0" y="0" href="#hole-hint"/>
                        <use x="0" y="28" href="#hole-hint"/>
                        <use x="0" y="54" href="#hole-hint"/>
                        <use x="0" y="82" href="#hole-hint"/>
                        <use x="130" y="0" href="#hole-hint"/>
                        <use x="130" y="28" href="#hole-hint"/>
                        <use x="130" y="54" href="#hole-hint"/>
                        <use x="130" y="82" href="#hole-hint"/>
                        <use x="0" y="0" href="#hole-shade"/>
                        <use x="0" y="28" href="#hole-shade"/>
                        <use x="0" y="54" href="#hole-shade"/>
                        <use x="0" y="82" href="#hole-shade"/>
                        <use x="130" y="0" href="#hole-shade"/>
                        <use x="130" y="28" href="#hole-shade"/>
                        <use x="130" y="54" href="#hole-shade"/>
                        <use x="130" y="82" href="#hole-shade"/>
                    </g>
                    <g>
                        <path class="hint" d="
                            M 20 33
                            A 12 11 0 0 0 8 44
                            A 12 12 0 0 1 20 32
                            H 172
                            A 12 12 0 0 1 184 44
                            A 12 11 0 0 0 172 33
                            Z
                        "/>
                        <path class="shade" d="
                            M 20 159
                            A 12 11 0 0 1 8 148
                            A 12 12 0 0 0 20 160
                            H 172
                            A 12 12 0 0 0 184 148
                            A 12 11 0 0 1 172 159
                            Z
                        "/>
                    </g>
                    <rect fill="url(#finish)" width="100%" height="100%" mask="url(#mask)"/>
                `}
                case 'play_music': {
                    const angleA = Math.atan(8 / 56);
                    const angleB = Math.atan2(22, 42) + Math.acos(10 / Math.hypot(42, 22));
                    const B = [96 - 88 * Math.cos(angleA), 96 + 88 * Math.sin(angleA)];
                    const A = [B[0] + (160 - B[1]) * Math.tan(angleA), 160];
                    const C = [96 + 88 * Math.cos(angleA), 96 + 88 * Math.sin(angleA)];
                    const D = [C[0] - (160 - C[1]) * Math.tan(angleA), 160];
                    const F = [96 + 76 * Math.cos(angleA), 96 + 76 * Math.sin(angleA)];
                    const E = [F[0] - (160 - F[1]) * Math.tan(angleA), 160];
                    const G = [96 - 76 * Math.cos(angleA), 96 + 76 * Math.sin(angleA)];
                    const H = [G[0] + (160 - G[1]) * Math.tan(angleA), 160];
                    const I = [54 + 10 * Math.cos(angleB), 118 - 10 * Math.sin(angleB)];
                    const J = [54 + 10 * Math.cos(angleA), 118 - 10 * Math.sin(angleA)];
                    const K = [62 + 10 * Math.cos(angleA), 174 - 10 * Math.sin(angleA)];
                    const L = [62, 184];
                    const angleC = Math.atan((I[1] - 96) / (96 - I[0]));
                    let p1 = [I[0] + 6 * Math.sin(angleC), I[1] + 6 * Math.cos(angleC)];
                    let p2 = [96 + 6 * Math.sin(angleC), 96 + 6 * Math.cos(angleC)];
                    let p3 = [G[0] + 6 * Math.cos(angleA), G[1] - 6 * Math.sin(angleA)];
                    let p4 = [H[0] + 6 * Math.cos(angleA), H[1] - 6 * Math.sin(angleA)];
                    let p5 = [54 - 10 * Math.cos(angleA), 118 + 10 * Math.sin(angleA)];
                    let p6 = [62 - 10 * Math.cos(angleA), 174 + 10 * Math.sin(angleA)];
                    const assistA = getLineLineIntersection([96, 96], p1, p2, p3, p4);
                    const assistB = getLineLineIntersection([96, 96], [0, 178], [192, 178], p3, p4);
                    const M = [assistB[0], 184];
                    const N = [assistB[0] - 6 * Math.cos(angleA), assistB[1] + 6 * Math.sin(angleA)];
                    const O = [assistA[0] - 6 * Math.cos(angleA), assistA[1] + 6 * Math.sin(angleA)];
                    const P = [assistA[0] + 6 * Math.cos(angleB), assistA[1] - 6 * Math.sin(angleB)];
                    const Q = getLineLineIntersection([96, 96], I, [96, 96], p5, p6);
                    const R = getLineLineIntersection([96, 96], [0, 184], [192, 184], p5, p6);
                    const T = [138 - 10 * Math.cos(angleB), 118 - 10 * Math.sin(angleB)];
                    const U = [138 - 10 * Math.cos(angleA), 118 - 10 * Math.sin(angleA)];
                    const V = [130 - 10 * Math.cos(angleA), 174 - 10 * Math.sin(angleA)];
                    const W = [130, 184];
                    p1 = [96 - 6 * Math.sin(angleC), 96 + 6 * Math.cos(angleC)];
                    p2 = [T[0] - 6 * Math.sin(angleC), T[1] + 6 * Math.cos(angleC)];
                    p3 = [E[0] - 6 * Math.cos(angleA), E[1] - 6 * Math.sin(angleA)];
                    p4 = [F[0] - 6 * Math.cos(angleA), F[1] - 6 * Math.sin(angleA)];
                    p5 = [130 + 10 * Math.cos(angleA), 174 + 10 * Math.sin(angleA)];
                    p6 = [138 + 10 * Math.cos(angleA), 118 + 10 * Math.sin(angleA)];
                    const assistC = getLineLineIntersection([96, 96], p1, p2, p3, p4);
                    const assistD = getLineLineIntersection([96, 96], [0, 178], [192, 178], p3, p4);
                    const X = [assistD[0], 184];
                    const Y = [assistD[0] + 6 * Math.cos(angleA), assistD[1] + 6 * Math.sin(angleA)];
                    const Z = [assistC[0] + 6 * Math.cos(angleA), assistC[1] + 6 * Math.sin(angleA)];
                    const AA = [assistC[0] - 6 * Math.cos(angleB), assistC[1] - 6 * Math.sin(angleB)];
                    const AB = getLineLineIntersection([96, 96], T, [96, 96], p5, p6);
                    const AC = getLineLineIntersection([96, 96], [0, 184], [192, 184], p5, p6);
                    const assistL1 = 60 / 66 * 6;
                    const assistL2 = Math.sqrt(Math.pow(60, 2) - Math.pow(assistL1, 2));
                    p1 = [assistC[0] + 6 * Math.cos(Math.PI / 4), assistC[1] - 6 * Math.sin(Math.PI / 4)];
                    p2 = [p1[0] + 1, p1[1] + 1];
                    p3 = D;
                    p4 = [p3[0] + 1, p3[1] - 1];
                    const assistE = getLineLineIntersection([96, 96], p1, p2, p3, p4);
                    const assistF = [96 - 88 * Math.cos(Math.PI / 4), 96 - 88 * Math.sin(Math.PI / 4)];
                    const assistG = [Y[0] - 6 + 6 * Math.cos(Math.PI / 4), Y[1] + 6 * Math.sin(Math.PI / 4)];
                    p1 = assistF;
                    p2 = [assistF[0] + 1, assistF[1] + 1];
                    p3 = assistG;
                    p4 = [assistG[0] + 1, assistG[1] - 1];
                    const assistH = getLineLineIntersection([96, 96], p1, p2, p3, p4);
                    const assistL3 = Math.sqrt(Math.pow(assistH[0] - assistF[0], 2) + Math.pow(assistH[1] - assistF[1], 2));
                    return `
                    <style>
                        .hint {
                            fill: white;
                            opacity: 0.2;
                        }
                        .shade {
                            fill: #BF360C;
                            opacity: 0.2;
                        }
                    </style>
                    <defs>
                        <path id="inner-ring" d="
                            M 14 96
                            A 82 82 0 0 1 178 96
                            H 162
                            A 6 6 0 0 1 ${96 + assistL2} ${96 - assistL1}
                            A 60 60 0 0 0 ${96 - assistL2} ${96 - assistL1}
                            A 6 6 0 0 1 30 96
                            Z
                        "/>
                        <path id="outer-ring" d="
                            M ${A[0]} ${A[1]}
                            L ${B[0]} ${B[1]}
                            A 82 82 0 0 1 8 96
                            A 82 82 0 0 1 184 96
                            A 82 82 0 0 1 ${C[0]} ${C[1]}
                            L ${D[0]} ${D[1]}
                            H ${E[0]}
                            L ${F[0]} ${F[1]}
                            A 76 76 0 0 0 172 96
                            A 76 76 0 0 0 20 96
                            A 76 76 0 0 0 ${G[0]} ${G[1]}
                            L ${H[0]} ${H[1]}
                            Z
                        "/>
                        <path id="full-left-ear" d="
                            M ${I[0]} ${I[1]}
                            A 10 10 0 0 1 ${J[0]} ${J[1]}
                            L ${K[0]} ${K[1]}
                            A 10 10 0 0 1 ${L[0]} ${L[1]}
                            L ${M[0]} ${M[1]}
                            A 6 6 0 0 1 ${N[0]} ${N[1]}
                            L ${O[0]} ${O[1]}
                            A 6 6 0 0 1 ${P[0]} ${P[1]}
                            Z
                        "/>
                        <path id="full-right-ear" d="
                            M ${T[0]} ${T[1]}
                            A 10 10 0 0 0 ${U[0]} ${U[1]}
                            L ${V[0]} ${V[1]}
                            A 10 10 0 0 0 ${W[0]} ${W[1]}
                            L ${X[0]} ${X[1]}
                            A 6 6 0 0 0 ${Y[0]} ${Y[1]}
                            L ${Z[0]} ${Z[1]}
                            A 6 6 0 0 0 ${AA[0]} ${AA[1]}
                            Z
                        "/>
                        <clipPath id="inner-ring-clip-path">
                            <use href="#inner-ring"/>
                        </clipPath>
                        <clipPath id="outer-ring-clip-path">
                            <use href="#outer-ring"/>
                        </clipPath>
                        <clipPath id="outline-clip-path">
                            <use href="#inner-ring"/>
                            <use href="#outer-ring"/>
                            <use href="#full-left-ear"/>
                            <use href="#full-right-ear"/>
                        </clipPath>
                        <filter id="shadow-z2" filterUnits="userSpaceOnUse">
                            <feDropShadow dx="0" dy="1" stdDeviation="0.5" flood-color="#BF360C" flood-opacity="0.2"/>
                            <feDropShadow dx="0" dy="2" stdDeviation="1" flood-color="#BF360C" flood-opacity="0.14"/>
                            <feDropShadow dx="0" dy="1" stdDeviation="2.5" flood-color="#BF360C" flood-opacity="0.12"/>
                        </filter>
                        <filter id="shadow-z4" filterUnits="userSpaceOnUse">
                            <feDropShadow dx="0" dy="1" stdDeviation="2" flood-color="#BF360C" flood-opacity="0.2"/>
                            <feDropShadow dx="0" dy="4" stdDeviation="2.5" flood-color="#BF360C" flood-opacity="0.14"/>
                            <feDropShadow dx="0" dy="1" stdDeviation="5" flood-color="#BF360C" flood-opacity="0.12"/>
                        </filter>
                        <linearGradient id="long-shadow" x1="${assistC[0] + 6 * Math.cos(Math.PI / 4)}" y1="${assistC[1] - 6 * Math.sin(Math.PI / 4)}" x2="${assistE[0]}" y2="${assistE[1]}" gradientUnits="userSpaceOnUse">
                            <stop offset="0" stop-color="#BF360C" stop-opacity="0.2"></stop>
                            <stop offset="${1 / 3}" stop-color="#BF360C" stop-opacity="0.1"></stop>
                            <stop offset="1" stop-color="#BF360C" stop-opacity="0"></stop>
                        </linearGradient>
                        <radialGradient id="finish" cx="${assistF[0]}" cy="${assistF[1]}" r="${assistL3}" gradientUnits="userSpaceOnUse">
                            <stop offset="0" stop-color="white" stop-opacity="0.1"/>
                            <stop offset="${1 / 3}" stop-color="white" stop-opacity="0.05"/>
                            <stop offset="1" stop-color="white" stop-opacity="0"/>
                        </radialGradient>
                    </defs>
                    <g>
                        <use fill="#FFB74D" href="#inner-ring"/>
                        <path class="shade" d="
                            M ${96 - assistL2} ${96 - assistL1}
                            A 60 61 0 0 1 ${96 + assistL2} ${96 - assistL1}
                            A 60 60 0 0 0 ${96 - assistL2} ${96 - assistL1}
                            Z
                        "/>
                        <path class="shade" d="
                            M 14 95
                            H ${96 - Math.sqrt(Math.pow(66, 2) - Math.pow(1, 2))}
                            A 6 5 0 0 0 ${96 - assistL2} ${96 - assistL1}
                            A 6 6 0 0 1 30 96
                            H 14
                            Z
                        "/>
                        <path class="shade" d="
                            M 178 95
                            H ${96 + Math.sqrt(Math.pow(66, 2) - Math.pow(1, 2))}
                            A 6 5 0 0 1 ${96 + assistL2} ${96 - assistL1}
                            A 6 6 0 0 0 162 96
                            H 178
                            Z
                        "/>
                        <use fill="#EF6C00" filter="url(#shadow-z2)" clip-path="url(#inner-ring-clip-path)" href="#outer-ring"/>
                    </g>
                    <g>
                        <use fill="#EF6C00" href="#outer-ring"/>
                        <path class="hint" d="
                            M 8 96
                            A 88 88 0 0 1 184 96
                            A 88 87 0 0 0 8 96
                            Z
                        "/>
                        <path class="shade" d="
                            M 20 96
                            A 76 77 0 0 1 172 96
                            A 76 76 0 0 0 20 96
                            Z
                        "/>
                    </g>
                    <g clip-path="url(#outer-ring-clip-path)">
                        <rect class="shade" y="159" width="100%" height="1"/>
                        <use fill="#F57C00" filter="url(#shadow-z4)" href="#full-left-ear"/>
                        <use fill="#F57C00" filter="url(#shadow-z4)" href="#full-right-ear"/>
                        <polygon fill="url(#long-shadow)" points="
                            ${assistC[0] + 6 * Math.cos(Math.PI / 4)},${assistC[1] - 6 * Math.sin(Math.PI / 4)}
                            ${assistE[0]},${assistE[1]}
                            192,160
                            ${E[0]},${E[1]}
                        "/>
                    </g>
                    <g>
                        <path fill="#F57C00" d="
                            M ${R[0]} ${R[1]}
                            L ${M[0]} ${M[1]}
                            A 6 6 0 0 1 ${N[0]} ${N[1]}
                            L ${O[0]} ${O[1]}
                            A 6 6 0 0 1 ${P[0]} ${P[1]}
                            L ${Q[0]} ${Q[1]}
                            H ${R[0]}
                            Z
                        "/>
                        <path fill="#FFB74D" d="
                            M ${I[0]} ${I[1]}
                            A 10 10 0 0 1 ${J[0]} ${J[1]}
                            L ${K[0]} ${K[1]}
                            A 10 10 0 0 1 ${L[0]} ${L[1]}
                            H ${R[0]}
                            L ${Q[0]} ${Q[1]}
                            Z
                        "/>
                        <path class="hint" d="
                            M ${assistA[0] + 5 * Math.cos(angleB)} ${assistA[1] - 5 * Math.sin(angleB)}
                            A 6 5.5 0 0 0 ${O[0]} ${O[1]}
                            A 6 6 0 0 1 ${P[0]} ${P[1]}
                            L ${I[0]} ${I[1]}
                            A 10 10 0 0 1 ${J[0]} ${J[1]}
                            A 10 9.5 0 0 0 ${54 + 9 * Math.cos(angleB)} ${118 - 9 * Math.sin(angleB)}
                            Z
                        "/>
                        <path class="shade" d="
                            M ${assistB[0] - 1 * Math.sin(angleA)} ${184 - 1 * Math.cos(angleA)}
                            A 6 5.5 0 0 1 ${N[0]} ${N[1]}
                            A 6 6 0 0 0 ${M[0]} ${M[1]}
                            L ${L[0]} ${L[1]}
                            A 10 10 0 0 0 ${K[0]} ${K[1]}
                            A 10 9.5 0 0 1 ${L[0]} ${L[1] - 1}
                            Z
                        "/>
                        <path fill="#F57C00" d="
                            M ${AC[0]} ${AC[1]}
                            L ${X[0]} ${X[1]}
                            A 6 6 0 0 0 ${Y[0]} ${Y[1]}
                            L ${Z[0]} ${Z[1]}
                            A 6 6 0 0 0 ${AA[0]} ${AA[1]}
                            L ${AB[0]} ${AB[1]}
                            H ${AC[0]}
                            Z
                        "/>
                        <path fill="#FFB74D" d="
                            M ${T[0]} ${T[1]}
                            A 10 10 0 0 0 ${U[0]} ${U[1]}
                            L ${V[0]} ${V[1]}
                            A 10 10 0 0 0 ${W[0]} ${W[1]}
                            H ${AC[0]}
                            L ${AB[0]} ${AB[1]}
                            Z
                        "/>
                        <path class="hint" d="
                            M ${assistC[0] - 5 * Math.cos(angleB)} ${assistC[1] - 5 * Math.sin(angleB)}
                            A 6 5.5 0 0 1 ${Z[0]} ${Z[1]}
                            A 6 6 0 0 0 ${AA[0]} ${AA[1]}
                            L ${T[0]} ${T[1]}
                            A 10 10 0 0 0 ${U[0]} ${U[1]}
                            A 10 9.5 0 0 1 ${138 - 9 * Math.cos(angleB)} ${118 - 9 * Math.sin(angleB)}
                            Z
                        "/>
                        <path class="shade" d="
                            M ${assistD[0] - 1 * Math.sin(angleA)} ${184 - 1 * Math.cos(angleA)}
                            A 6 5.5 0 0 0 ${Y[0]} ${Y[1]}
                            A 6 6 0 0 1 ${X[0]} ${X[1]}
                            L ${W[0]} ${W[1]}
                            A 10 10 0 0 1 ${V[0]} ${V[1]}
                            A 10 9.5 0 0 0 ${W[0]} ${W[1] - 1}
                            Z
                        "/>
                    </g>
                    <rect fill="url(#finish)" width="100%" height="100%" clip-path="url(#outline-clip-path)"/>
                `}
                case 'play_store': {
                    const angle = Math.atan(68 / 116);
                    const assistA = [16 + 8 * Math.sin(angle), 40 - 8 * Math.cos(angle)];
                    const assistB = [16 + 8 * Math.sin(angle), 176 + 8 * Math.cos(angle)];
                    const A = [8, assistA[1] - 12 * Math.tan(angle)];
                    const B = [132 + 8 * Math.sin(angle), 108 - 8 * Math.cos(angle)];
                    const C = [132 + 8 * Math.sin(angle), 108 + 8 * Math.cos(angle)];
                    const D = [8, assistB[1] + 12 * Math.tan(angle)];
                    const E = getLineLineIntersection([96, 96], assistA, B, [84, 108], [192, 0]);
                    const F = getLineLineIntersection([96, 96], C, assistB, [84, 108], [192, 216]);
                    return `
                    <style>
                        .hint {
                            fill: white;
                            opacity: 0.4;
                        }
                        g:first-of-type .hint {
                            fill: white;
                            opacity: 0.2;
                        }
                        .shade {
                            fill: #212121;
                            opacity: 0.1;
                        }
                        g:first-of-type .shade {
                            fill: #212121;
                            opacity: 0.1;
                        }
                    </style>
                    <defs>
                        <path id="bag" d="
                            M 8 44
                            H 184
                            V 160
                            A 12 12 0 0 1 172 172
                            H 20
                            A 12 12 0 0 1 8 160
                            Z
                        "/>
                        <polygon id="left-handle" points="
                            68,16
                            68,48
                            52,48
                            52,32
                        "/>
                        <polygon id="right-handle" points="
                            140,32
                            140,48
                            124,48
                            124,16
                        "/>
                        <rect id="back-handle" x="68" y="16" width="56" height="16"/>
                        <polygon id="back-handle" points="
                            68,16
                            124,16
                            140,32
                            52,32
                        "/>
                        <path id="play" d="
                            M ${A[0]} ${A[1]}
                            L ${B[0]} ${B[1]}
                            A 8 8 0 0 1 ${C[0]} ${C[1]}
                            L ${D[0]} ${D[1]}
                            Z
                        "/>
                        <clipPath id="back-clip-path">
                            <use href="#back-handle"/>
                        </clipPath>
                        <clipPath id="front-clip-path">
                            <use href="#right-handle"/>
                            <use href="#left-handle"/>
                            <use href="#bag"/>
                        </clipPath>
                        <clipPath id="outline-clip-path">
                            <use href="#back-handle"/>
                            <use href="#right-handle"/>
                            <use href="#left-handle"/>
                            <use href="#bag"/>
                        </clipPath>
                        <clipPath id="play-clip-path">
                            <use href="#play"/>
                        </clipPath>
                        <mask id="mask">
                            <use fill="white" href="#bag"/>
                        </mask>
                        <filter id="shadow" filterUnits="userSpaceOnUse">
                            <feDropShadow dx="0" dy="1" stdDeviation="0.5" flood-color="#212121" flood-opacity="0.2"/>
                            <feDropShadow dx="0" dy="2" stdDeviation="1" flood-color="#212121" flood-opacity="0.14"/>
                            <feDropShadow dx="0" dy="1" stdDeviation="2.5" flood-color="#212121" flood-opacity="0.12"/>
                        </filter>
                        <linearGradient id="long-shadow" x1="68" y1="16" x2="84" y2="32" gradientUnits="userSpaceOnUse">
                            <stop offset="0" stop-color="#212121" stop-opacity="0.2"></stop>
                            <stop offset="${1 / 3}" stop-color="#212121" stop-opacity="0.1"></stop>
                            <stop offset="1" stop-color="#212121" stop-opacity="0"></stop>
                        </linearGradient>
                        <linearGradient id="blue-gradient" x1="${16 - 8 * Math.cos(Math.PI / 4)}" y1="${176 + 8 * Math.cos(Math.PI / 4)}" x2="84" y2="108" gradientUnits="userSpaceOnUse">
                            <stop offset="0" stop-color="#00E3FF"></stop>
                            <stop offset="${20 / 70}" stop-color="#00DFFF"></stop>
                            <stop offset="${50 / 70}" stop-color="#00D2FF"></stop>
                            <stop offset="1" stop-color="#00BEFF"></stop>
                        </linearGradient>
                        <linearGradient id="green-gradient" x1="${16 - 8 * Math.sin(angle) + 12}" y1="${40 - 8 * Math.cos(angle) - 12}" x2="${16 - 8 * Math.sin(angle) + 12 + 28}" y2="${40 - 8 * Math.cos(angle) - 12 + 28}" gradientUnits="userSpaceOnUse">
                            <stop offset="0" stop-color="#15CF74"></stop>
                            <stop offset="0.6" stop-color="#06E775"></stop>
                            <stop offset="1" stop-color="#00F076"></stop>
                        </linearGradient>
                        <linearGradient id="red-gradient" x1="-52" y1="244" x2="84" y2="108" gradientUnits="userSpaceOnUse">
                            <stop offset="0" stop-color="#C31162"></stop>
                            <stop offset="1" stop-color="#FF3A44"></stop>
                        </linearGradient>
                        <linearGradient id="yellow-gradient" x1="8" y1="108" x2="140" y2="108" gradientUnits="userSpaceOnUse">
                            <stop offset="0.2" stop-color="#FFA500"></stop>
                            <stop offset="0.6" stop-color="#FFBD00"></stop>
                            <stop offset="1" stop-color="#FFE000"></stop>
                        </linearGradient>
                        <radialGradient id="finish" cx="26" cy="26" r="${Math.hypot(140, 140) + 12}" gradientUnits="userSpaceOnUse">
                            <stop offset="0" stop-color="white" stop-opacity="0.1"/>
                            <stop offset="${1 / 3}" stop-color="white" stop-opacity="0.05"/>
                            <stop offset="1" stop-color="white" stop-opacity="0"/>
                        </radialGradient>
                    </defs>
                    <g>
                        <use fill="#E0E0E0" href="#back-handle"/>
                        <rect class="hint" x="68" y="16" width="56" height="1"/>
                        <rect class="shade" x="68" y="31" width="56" height="1"/>
                        <polygon fill="url(#long-shadow)" points="
                            68,16
                            84,32
                            68,32
                        "/>
                    </g>
                    <g clip-path="url(#back-clip-path)" filter="url(#shadow)">
                        <use href="#right-handle"/>
                        <use href="#left-handle"/>
                    </g>
                    <g>
                        <use fill="#EEEEEE" href="#right-handle"/>
                        <use fill="#EEEEEE" href="#left-handle"/>
                        <path fill="#F5F5F5" d="
                            M 8 44
                            H 184
                            V 160
                            A 12 12 0 0 1 172 172
                            H 20
                            A 12 12 0 0 1 8 160
                            Z
                        "/>
                        <path fill="url(#blue-gradient)" d="
                            M 8 44
                            H 20
                            L 84 108
                            L 20 172
                            A 12 12 0 0 1 8 160
                            Z
                        "/>
                        <polygon fill="url(#red-gradient)" points="
                            ${assistA[0] + (44 - assistA[1]) / Math.tan(angle)},172
                            ${F[0]},${F[1]}
                            84,108
                            20,172
                        "/>
                        <polygon fill="url(#green-gradient)" points="
                            ${assistA[0] + (44 - assistA[1]) / Math.tan(angle)},44
                            ${E[0]},${E[1]}
                            84,108
                            20,44
                        "/>
                        <path fill="url(#yellow-gradient)" d="
                            M ${E[0]} ${E[1]}
                            L ${132 + 8 * Math.sin(angle)} ${108 - 8 * Math.cos(angle)}
                            A 8 8 0 0 1 ${132 + 8 * Math.sin(angle)} ${108 + 8 * Math.cos(angle)}
                            L ${F[0]} ${F[1]}
                            L 84 108
                            Z
                        "/>
                        <rect fill="rgb(0 0 0 / 0.0275)" x="8" y="44" width="176" height="64"/>
                        <rect class="hint" x="8" y="44" width="44" height="1"/>
                        <polygon class="hint" points="52,32 68,16 68,17 52,33"/>
                        <rect class="hint" x="68" y="44" width="56" height="1"/>
                        <polygon class="hint" points="124,16 140,32 140,33 124,17"/>
                        <rect class="hint" x="140" y="44" width="44" height="1"/>
                        <path class="shade" d="
                            M 20 171
                            A 12 11 0 0 1 8 160
                            A 12 12 0 0 0 20 172
                            H 172
                            A 12 12 0 0 0 184 160
                            A 12 11 0 0 1 172 171
                            Z
                        "/>
                    </g> 
                    <rect fill="url(#finish)" width="100%" height="100%" clip-path="url(#outline-clip-path)"/>
                `}
                case 'sheets': {
                    const gradientStart = [124 - 12 * Math.cos(Math.PI / 4), 44 + 12 * Math.sin(Math.PI / 4)];
                    const gradientEnd = [160, 44 + 160 - gradientStart[0]];
                    return `
                    <style>
                        .hint {
                            fill: white;
                            opacity: 0.2;
                        }
                        .shade {
                            fill: #263238;
                            opacity: 0.2;
                        }
                    </style>
                    <defs>
                        <path id="outline" d="
                            M 112 8
                            L 160 56
                            V 172
                            a 12 12 0 0 1 -12 12
                            H 44
                            a 12 12 0 0 1 -12 -12
                            V 20
                            a 12 12 0 0 1 12 -12
                            Z
                        "/>
                        <clipPath id="clip-path">
                            <use href="#outline"/>
                        </clipPath>
                        <mask id="grid">
                            <rect fill="white" x="64" y="94" width="64" height="58"/>
                            <rect fill="black" x="72" y="102" width="20" height="10"/>
                            <rect fill="black" x="72" y="118" width="20" height="10"/>
                            <rect fill="black" x="72" y="134" width="20" height="10"/>
                            <rect fill="black" x="100" y="102" width="20" height="10"/>
                            <rect fill="black" x="100" y="118" width="20" height="10"/>
                            <rect fill="black" x="100" y="134" width="20" height="10"/>
                        </mask>
                        <filter id="shadow" filterUnits="userSpaceOnUse">
                            <feDropShadow dx="0" dy="1" stdDeviation="2" flood-color="#263238" flood-opacity="0.2"/>
                            <feDropShadow dx="0" dy="4" stdDeviation="2.5" flood-color="#263238" flood-opacity="0.14"/>
                            <feDropShadow dx="0" dy="1" stdDeviation="5" flood-color="#263238" flood-opacity="0.12"/>
                        </filter>
                        <linearGradient id="long-shadow" x1="${gradientStart[0]}" y1="${gradientStart[1]}" x2="${gradientEnd[0]}" y2="${gradientEnd[1]}" gradientUnits="userSpaceOnUse">
                            <stop offset="0" stop-color="#263238" stop-opacity="0.2"></stop>
                            <stop offset="${1 / 3}" stop-color="#263238" stop-opacity="0.1"></stop>
                            <stop offset="1" stop-color="#263238" stop-opacity="0"></stop>
                        </linearGradient>
                        <radialGradient id="finish" cx="${44 - 12 * Math.cos(Math.PI / 4)}" cy="${20 - 12 * Math.sin(Math.PI / 4)}" r="${Math.hypot(148 - 44, 172 - 20) + 12 * 2}" gradientUnits="userSpaceOnUse">
                            <stop offset="0" stop-color="white" stop-opacity="0.1"/>
                            <stop offset="${1 / 3}" stop-color="white" stop-opacity="0.05"/>
                            <stop offset="1" stop-color="white" stop-opacity="0"/>
                        </radialGradient>
                    </defs>
                    <path fill="#34A853" d="
                        M 112 8
                        L 128 40
                        L 160 56
                        V 172
                        a 12 12 0 0 1 -12 12
                        H 44
                        a 12 12 0 0 1 -12 -12
                        V 20
                        a 12 12 0 0 1 12 -12
                        Z
                    "/>
                    <rect fill="#EEEEEE" width="100%" height="100%" mask="url(#grid)"/>
                    <path class="hint" d="
                        M 112 9
                        H 44
                        a 12 11 0 0 0 -12 11
                        a 12 12 0 0 1 12 -12
                        H 112
                        Z
                    "/>
                    <path class="shade" d="
                        M 44 183
                        a 12 11 0 0 1 -12 -11
                        a 12 12 0 0 0 12 12
                        H 148
                        a 12 12 0 0 0 12 -12
                        a 12 11 0 0 1 -12 11
                        Z
                    "/>
                    <polygon fill="url(#long-shadow)" points="
                        ${gradientStart[0]},${gradientStart[1]}
                        ${gradientEnd[0]},${gradientEnd[1]}
                        160,56
                    "/>
                    <g clip-path="url(#clip-path)">
                        <rect fill="#A8DAB5" filter="url(#shadow)" x="112" y="-4" width="60" height="60" rx="12" ry="12"/>
                        <path class="shade" d="
                            M 124 55
                            a 12 11 0 0 1 -12 -11
                            a 12 12 0 0 0 12 12
                            H 160
                            v -1
                            Z
                        "/>
                    </g>
                    <use fill="url(#finish)" href="#outline"/>
                `}
                case 'slides': {
                    const gradientStart = [124 - 12 * Math.cos(Math.PI / 4), 44 + 12 * Math.sin(Math.PI / 4)];
                    const gradientEnd = [160, 44 + 160 - gradientStart[0]];
                    return `
                    <style>
                        .hint {
                            fill: white;
                            opacity: 0.2;
                        }
                        .shade {
                            fill: #BF360C;
                            opacity: 0.2;
                        }
                    </style>
                    <defs>
                        <path id="outline" d="
                            M 112 8
                            L 160 56
                            V 172
                            a 12 12 0 0 1 -12 12
                            H 44
                            a 12 12 0 0 1 -12 -12
                            V 20
                            a 12 12 0 0 1 12 -12
                            Z
                        "/>
                        <clipPath id="clip-path">
                            <use href="#outline"/>
                        </clipPath>
                        <mask id="window">
                            <rect fill="white" x="64" y="88" width="64" height="64" rx="6" ry="6"/>
                            <rect fill="black" x="72" y="106" width="48" height="28"/>
                        </mask>
                        <filter id="shadow" filterUnits="userSpaceOnUse">
                            <feDropShadow dx="0" dy="1" stdDeviation="2" flood-color="#BF360C" flood-opacity="0.2"/>
                            <feDropShadow dx="0" dy="4" stdDeviation="2.5" flood-color="#BF360C" flood-opacity="0.14"/>
                            <feDropShadow dx="0" dy="1" stdDeviation="5" flood-color="#BF360C" flood-opacity="0.12"/>
                        </filter>
                        <linearGradient id="long-shadow" x1="${gradientStart[0]}" y1="${gradientStart[1]}" x2="${gradientEnd[0]}" y2="${gradientEnd[1]}" gradientUnits="userSpaceOnUse">
                            <stop offset="0" stop-color="#BF360C" stop-opacity="0.2"></stop>
                            <stop offset="${1 / 3}" stop-color="#BF360C" stop-opacity="0.1"></stop>
                            <stop offset="1" stop-color="#BF360C" stop-opacity="0"></stop>
                        </linearGradient>
                        <radialGradient id="finish" cx="${44 - 12 * Math.cos(Math.PI / 4)}" cy="${20 - 12 * Math.sin(Math.PI / 4)}" r="${Math.hypot(148 - 44, 172 - 20) + 12 * 2}" gradientUnits="userSpaceOnUse">
                            <stop offset="0" stop-color="white" stop-opacity="0.1"/>
                            <stop offset="${1 / 3}" stop-color="white" stop-opacity="0.05"/>
                            <stop offset="1" stop-color="white" stop-opacity="0"/>
                        </radialGradient>
                    </defs>
                    <path fill="#FBBC05" d="
                        M 112 8
                        L 128 40
                        L 160 56
                        V 172
                        a 12 12 0 0 1 -12 12
                        H 44
                        a 12 12 0 0 1 -12 -12
                        V 20
                        a 12 12 0 0 1 12 -12
                        Z
                    "/>
                    <rect fill="#EEEEEE" width="100%" height="100%" mask="url(#window)"/>
                    <path class="hint" d="
                        M 112 9
                        H 44
                        a 12 11 0 0 0 -12 11
                        a 12 12 0 0 1 12 -12
                        H 112
                        Z
                    "/>
                    <path class="shade" d="
                        M 44 183
                        a 12 11 0 0 1 -12 -11
                        a 12 12 0 0 0 12 12
                        H 148
                        a 12 12 0 0 0 12 -12
                        a 12 11 0 0 1 -12 11
                        Z
                    "/>
                    <polygon fill="url(#long-shadow)" points="
                        ${gradientStart[0]},${gradientStart[1]}
                        ${gradientEnd[0]},${gradientEnd[1]}
                        160,56
                    "/>
                    <g clip-path="url(#clip-path)">
                        <rect fill="#FDE293" filter="url(#shadow)" x="112" y="-4" width="60" height="60" rx="12" ry="12"/>
                        <path class="shade" d="
                            M 124 55
                            a 12 11 0 0 1 -12 -11
                            a 12 12 0 0 0 12 12
                            H 160
                            v -1
                            Z
                        "/>
                    </g>
                    <use fill="url(#finish)" href="#outline"/>
                `}
            }
        }

        iconElement.innerHTML = setIconContent();
        return
    }

    const iconName = element.getAttribute('name');
    const iconVariant = element.getAttribute('variant');

    function setIconWidth() {
        switch (iconName) {
            case 'chevron_left':
            case 'chevron_right':
            case 'more_vert':
                switch (iconSize) {
                    case 'small':
                        return 9
                    default:
                        return 12
                }
            default:
                switch (iconSize) {
                    case 'small':
                        return 18
                    case 'large':
                        return 36
                    default:
                        return 24
                }
        }
    }

    function setIconHeight() {
        switch (iconName) {
            case 'expand_less':
            case 'expand_more':
            case 'more_horiz':
                switch (iconSize) {
                    case 'small':
                        return 9
                    default:
                        return 12
                }
            default:
                switch (iconSize) {
                    case 'small':
                        return 18
                    case 'large':
                        return 36
                    default:
                        return 24
                }
        }
    }

    iconElement.setAttribute('viewBox', '0 0 ' + setIconWidth() + ' ' + setIconHeight());
    iconElement.setAttribute('fill', 'currentColor');
    iconElement.setAttribute('aria-hidden', 'true');

    function setIconContent() {
        switch (iconName) {
            case 'access_time': {
                const angle = Math.atan(6 / 10);
                const d = Math.abs((8 - 11) * 12.5 + (11 - 16) * 11.75 + (16 * 11 - 11 * 8)) / Math.hypot((8 - 11), (11 - 16));
                return `
                <circle fill="none" stroke="currentColor" stroke-width="2" cx="12" cy="12" r="9" />
                <path d="
                    M 12.5 7
                    V 12.25
                    L 17 ${12.25 + (17 - 12.5) * 6 / 10}
                    L ${17 - d * Math.sin(angle)} ${(12.25 + 4.5 * 6 / 10) + d * Math.cos(angle)}
                    L 11 13
                    V 7
                    Z
                "/>
            `}
            case 'add': {
                return `
                <defs>
                    <mask id="mask">
                        <rect fill="white" x="5" y="11" width="14" height="2"/>
                        <rect fill="white" x="11" y="5" width="2" height="14"/>
                    </mask>
                </defs>
                <rect width="100%" height="100%" mask="url(#mask)"/>
            `}
            case 'add_circle': {
                return `
                <defs>
                    <mask id="mask">
                        <circle fill="none" stroke="white" stroke-width="2" cx="12" cy="12" r="9" />
                        <rect fill="white" x="11" y="7" width="2" height="10"/>
                        <rect fill="white" x="7" y="11" width="10" height="2"/>
                    </mask>
                </defs>
                <rect width="100%" height="100%" mask="url(#mask)"/>
            `}
            case 'alarm': {
                const buttonAssistAngele = 50 / 180 * Math.PI;
                const buttonAssistPointA = [12 - 12 * Math.cos(buttonAssistAngele), 13 - 12 * Math.sin(buttonAssistAngele)];
                const buttonAssistPointB = [12 - 10 * Math.cos(buttonAssistAngele), 13 - 10 * Math.sin(buttonAssistAngele)];
                const buttonAssistDistance = (buttonAssistPointA[0] - 2) / Math.tan(buttonAssistAngele);
                const pointerAssistAngle = Math.atan(6 / 10);
                const pointerAssistDistance = Math.abs((8 - 11) * 12.5 + (11 - 16) * 11.75 + (16 * 11 - 11 * 8)) / Math.hypot((8 - 11), (11 - 16));
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
                <path d="M 12.5 8 V 13.25 L 16.5 ${13.25 + (16.5 - 12.5) * 6 / 10} L ${16.5 - pointerAssistDistance * Math.sin(pointerAssistAngle)} ${(13.25 + (16.5 - 12.5) * 6 / 10) + pointerAssistDistance * Math.cos(pointerAssistAngle)} L 11 14 V 8 Z"/>
            `}
            case 'arrow_back': {
                return `
                <defs>
                    <mask id="mask">
                        <g transform-origin="center" transform="rotate(-135)">
                            <polygon fill="white" points="12,4 20,12 12,20 4,12" transform-origin="center" transform="rotate(45)"/>
                            <g transform="translate(-2 2)">
                                <polygon fill="black" points="12,4 20,12 12,20 4,12" transform-origin="center" transform="rotate(45)"/>
                            </g>
                       </g>
                       <rect fill="white" x="4" y="11" width="15" height="2"/>
                    </mask>
                </defs>
                <rect width="100%" height="100%" mask="url(#mask)"/>
            `}
            case 'arrow_back_system': {
                const radius = 1.5;
                const borderWidth = 2;
                const A = [4 + radius, 12];
                const B = [20 - radius, A[1] - (18.5 - 5.5) * Math.tan(Math.PI / 6)]
                const C = [20 - radius, A[1] + (18.5 - 5.5) * Math.tan(Math.PI / 6)]
                return `
                <defs>
                    <mask id="mask">
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
                <rect width="100%" height="100%" mask="url(#mask)"/>
            `}
            case 'arrow_drop_down': {
                return `
                <polygon points="7,10 17,10 12,15"/>
            `}
            case 'arrow_drop_up': {
                return `
                <polygon points="7,14 12,9 17,14"/>
            `}
            case 'arrow_forward': {
                return `
                <defs>
                    <mask id="mask">
                        <g transform-origin="center" transform="rotate(45)">
                            <polygon fill="white" points="12,4 20,12 12,20 4,12" transform-origin="center" transform="rotate(45)"/>
                            <g transform="translate(-2 2)">
                                <polygon fill="black" points="12,4 20,12 12,20 4,12" transform-origin="center" transform="rotate(45)"/>
                            </g>
                       </g>
                       <rect fill="white" x="4" y="11" width="15" height="2"/>
                    </mask>
                </defs>
                <rect width="100%" height="100%" mask="url(#mask)"/>
            `}
            case 'backspace': {
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
                    <mask id="mask">
                        <path fill="white" d="
                            M ${A[0]} ${A[1]}
                            L ${B[0] - Math.cos(Math.PI - angle) * radius / Math.tan(angle / 2)} ${B[1] + Math.sin(Math.PI - angle) * radius / Math.tan(angle / 2)}
                            A ${radius} ${radius} 0 0 1 ${B[0] + radius / Math.tan(angle / 2)} ${B[1]}
                            L ${C[0] - radius} ${C[1]}
                            A ${radius} ${radius} 0 0 1 ${C[0]} ${C[1] + radius}
                            L ${D[0]} ${D[1] - radius}
                            A ${radius} ${radius} 0 0 1 ${D[0] - radius} ${D[1]}
                            L ${E[0] + radius / Math.tan(angle / 2)} ${E[1]}
                            A ${radius} ${radius} 0 0 1 ${E[0] - Math.cos(Math.PI - angle) * radius / Math.tan(angle / 2)} ${E[1] - Math.sin(Math.PI - angle) * radius / Math.tan(angle / 2)}
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
                <rect width="100%" height="100%" mask="url(#mask)"/>
            `}
            case 'basil_egg_free': {
                return `
                <path fill="#356859" clip-path="url(#left-clip-path)" d="M13.58473,7.94115c.25556,0,.46421,.04565,.62015,.13569,.34116,.19696,.62795,.73117,.76716,1.42899,.29832,1.49536-.11685,3.3542-1.00961,4.52037-.76419,.99822-2.28287,2.03074-3.50156,2.03074-.29207,0-.53935-.0608-.75599-.18587-1.11121-.64157-1.19793-3.00473-.53107-4.60959,.78965-1.90036,2.98003-3.32033,4.41092-3.32033m0-1.75c-2.2026,0-4.98854,1.89977-6.02696,4.39882-.88304,2.12511-.86721,5.5615,1.27211,6.79664,.50689,.29265,1.06159,.42033,1.63099,.42033,1.83376,0,3.8237-1.32264,4.89112-2.71697,2.05288-2.68157,1.9368-7.25337-.27211-8.52868-.43884-.25337-.94907-.37014-1.49515-.37014h0Z"/>
	            <line stroke="#FD5523" stroke-width="2" x1="12" y1="3" x2="12" y2="21" transform-origin="center" transform="rotate(120)"/>
	            <circle fill="none" stroke="#FD5523" stroke-width="2" cx="12" cy="12" r="9"/>
            `}
            case 'basil_expand_more': {
                return `
                <polyline fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round" stroke-linecap="round" points="5,12 12,15.5 19,12"/>
            `}
            case 'basil_gluten_free': {
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
            `}
            case 'battery_full_alt': {
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
            `}
            case 'brightness_6': {
                return `
                <defs>
                    <mask id="mask">
                        <rect x="4" y="4" width="16" height="16" fill="white"/>
                        <rect x="4" y="4" width="16" height="16" fill="white" transform="rotate(45)" transform-origin="center"/>
                        <path fill="black" d="
                            M 12 6
                            A 6 6 0 0 1 12 18
                            Z
                        "/>
                    </mask>
                </defs>
                <rect width="100%" height="100%" mask="url(#mask)"/>
            `}
            case 'bluetooth': {
                return `
                <defs>
                    <clipPath id="left-top-clip-path">
                        <polygon points="0,0 24,0 0,24"/>
                    </clipPath>
                    <clipPath id="left-bottom-clip-path">
                        <polygon points="24,24 0,0 0,24"/>
                    </clipPath>
                    <mask id="mask">
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
                <rect width="100%" height="100%" mask="url(#mask)"/>
            `}
            case 'call': {
                const borderRadius = 1;
                const outerRadius = 17;
                const innerRadius = 11.5;
                const assistA = [16, 0];
                const assistB = [assistA[0] + Math.cos(Math.PI / 4), assistA[1] + Math.sin(Math.PI / 4)];
                const assistC = [24, 8];
                const assistD = [assistC[0] - Math.cos(Math.PI / 4), assistC[1] - Math.sin(Math.PI / 4)];
                const assistL1 = Math.sqrt(Math.pow(innerRadius + 1, 2) - (Math.pow(4, 2) + Math.pow(4, 2)));
                const assistL2 = Math.sqrt(Math.pow(outerRadius - 2, 2) - Math.pow((Math.sqrt(Math.pow(4, 2) + Math.pow(4, 2)) - 1), 2));
                const O = [20, 4]
                const A = [7.5, 4];
                const B = [assistA[0] - assistL1 * Math.cos(Math.PI / 4), assistA[1] + assistL1 * Math.sin(Math.PI / 4)];
                const C = [assistC[0] - assistL1 * Math.cos(Math.PI / 4), assistC[1] + assistL1 * Math.sin(Math.PI / 4)];
                const D = [20, 16.5]
                const E = [20, 20]
                const F = [4, 4]
                return `
                <path d="
                    M ${A[0]} ${A[1] - borderRadius}
                    A ${borderRadius} ${borderRadius} 0 0 1 ${A[0] + borderRadius} ${A[1]}
                    A ${innerRadius} ${innerRadius} 0 0 0 ${O[0] - (O[0] - B[0]) * innerRadius / (innerRadius + borderRadius)} ${(B[1] - O[1]) * innerRadius / (innerRadius + borderRadius) + O[1]}
                    A ${borderRadius} ${borderRadius} 0 0 1 ${B[0] + borderRadius * Math.cos(Math.PI / 4)} ${B[1] + borderRadius * Math.sin(Math.PI / 4)}
                    L ${assistB[0] - Math.cos(Math.PI / 4) * assistL2} ${assistB[1] + Math.sin(Math.PI / 4) * assistL2}
                    A ${outerRadius - 2} ${outerRadius - 2} 0 0 0 ${assistD[0] - Math.cos(Math.PI / 4) * assistL2} ${assistD[1] + Math.sin(Math.PI / 4) * assistL2}
                    L ${C[0] - borderRadius * Math.cos(Math.PI / 4)} ${C[1] - borderRadius * Math.sin(Math.PI / 4)}
                    A ${borderRadius} ${borderRadius} 0 0 1 ${O[0] - (O[0] - C[0]) * innerRadius / (innerRadius + borderRadius)} ${(C[1] - O[1]) * innerRadius / (innerRadius + borderRadius) + O[1]}
                    A ${innerRadius} ${innerRadius} 0 0 0 ${D[0]} ${D[1] - borderRadius}
                    A ${borderRadius} ${borderRadius} 0 0 1 ${D[0] + borderRadius} ${D[1]}
                    L ${E[0] + borderRadius} ${E[1]}
                    A ${borderRadius} ${borderRadius} 0 0 1 ${E[0]} ${E[0] + borderRadius}
                    A ${outerRadius} ${outerRadius} 0 0 1 ${F[0] - borderRadius} ${F[1]}
                    A ${borderRadius} ${borderRadius} 0 0 1 ${F[1]} ${F[1] - borderRadius}
                    Z
                "/>
            `}
            case 'call_made': {
                return `
                <mask id="mask">
                    <line stroke="white" stroke-width="1.5" x1="6" y1="3.75" x2="15" y2="3.75"/>
                    <line stroke="white" stroke-width="1.5" x1="14.25" y1="3" x2="14.25" y2="12"/>
                    <line stroke="white" stroke-width="1.5" x1="14.5" y1="3.5" x2="3.75" y2="14.25"/>
                </mask>
                <rect width="100%" height="100%" mask="url(#mask)"/>
            `}
            case 'call_received': {
                return `
                <mask id="mask">
                    <line stroke="white" stroke-width="1.5" x1="3.75" y1="6" x2="3.75" y2="15"/>
                    <line stroke="white" stroke-width="1.5" x1="3" y1="14.25" x2="12" y2="14.25"/>
                    <line stroke="white" stroke-width="1.5" x1="14.5" y1="3.5" x2="3.75" y2="14.25"/>
                </mask>
                <rect width="100%" height="100%" mask="url(#mask)"/>
            `}
            case 'camera_alt': {
                return `
                <defs>
                    <mask id="mask">
                        <rect fill="white" x="2" y="4" width="20" height="16" rx="2" ry="2"/>
                        <polygon fill="white" points="9,2 15,2 17,4 7,4 "/>
                        <circle fill="none" stroke="black" stroke-width="2" cx="12" cy="12" r="4" />
                    </mask>
                </defs>
                <rect width="100%" height="100%" mask="url(#mask)"/>
            `}
            case 'check': {
                const strokeWidth = 2;
                const A = [9, 19];
                const B = [21, 7];
                const C = [B[0] - Math.sqrt(strokeWidth), B[1] - Math.sqrt(strokeWidth)]
                const D = [A[0], A[1] - Math.hypot(strokeWidth, strokeWidth)]
                const E = [D[0] - (D[1] - 12), 12]
                const F = [E[0] - Math.sqrt(strokeWidth), E[1] + Math.sqrt(strokeWidth)]
                return `
                <polygon points="
                    ${A[0]},${A[1]}
                    ${B[0]},${B[1]}
                    ${C[0]},${C[1]}
                    ${D[0]},${D[1]}
                    ${E[0]},${E[1]}
                    ${F[0]},${F[1]}
                "/>
            `}
            case 'check_box_outline_blank': {
                return `
                <defs>
                    <mask id="mask">
                        <rect fill="white" x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                        <rect fill="black" x="5" y="5" width="14" height="14"/>
                    </mask>
                </defs>
                <rect width="100%" height="100%" mask="url(#mask)"/>
            `}
            case 'chevron_left': {
                switch (iconSize) {
                    case 'small': {
                        return `
                        <polygon points="
                            1.5,9
                            6,4.5
                            ${6 + 1.5 * Math.cos(Math.PI / 4)},${4.5 + 1.5 * Math.sin(Math.PI / 4)}
                            ${1 + 2 * 1.5 * Math.cos(Math.PI / 4)},9
                            ${6 + 1.5 * Math.cos(Math.PI / 4)},${13.5 - 1.5 * Math.sin(Math.PI / 4)}
                            6,13.5
                        "/>
                    `}
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
                    `}
                }
            }
            case 'chevron_right': {
                return `
                <polygon points="
                    10,12
                    4,6
                    ${4 - 2 * Math.cos(Math.PI / 4)},${6 + 2 * Math.sin(Math.PI / 4)}
                    ${10 - 2 * 2 * Math.cos(Math.PI / 4)},12
                    ${4 - 2 * Math.cos(Math.PI / 4)},${18 - 2 * Math.sin(Math.PI / 4)}
                    4,18
                "/>
            `}
            case 'circle_home': {
                return `
                <circle fill="none" stroke="currentColor" stroke-width="2" cx="12" cy="12" r="8.25" />
            `}
            case 'close': {
                const offset = 12 - 5 - 1 * Math.sin(Math.PI / 4);
                return `
                <line stroke="currentColor" stroke-width="2" x1="${12 + offset}" y1="${12 - offset}" x2="${12 - offset}" y2="${12 + offset}"/>
                <line stroke="currentColor" stroke-width="2" x1="${12 - offset}" y1="${12 - offset}" x2="${12 + offset}" y2="${12 + offset}"/>
            `}
            case 'cloud_download': {
                return `
                <defs>
                    <mask id="mask">
                        <circle fill="white" cx="6" cy="14" r="6"/>
                        <circle fill="white" cx="12" cy="11.5" r="7.5"/>
                        <circle fill="white" cx="19" cy="15" r="5"/>
                        <rect fill="white" x="6" y="18" width="13" height="2"/>
                        <polygon fill="black" points="10,9 14,9 14,13 17,13 12,18 7,13 10,13"/>
                    </mask>
                </defs>
                <rect width="100%" height="100%" mask="url(#mask)"/>
            `}
            case 'dialpad': {
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
            `}
            case 'delete': {
                return `
                <defs>
                    <mask id="mask">
                        <rect fill="white" x="6" y="4" width="12" height="17" rx="2" ry="2"/>
                        <rect fill="black" width="100%" height="7"/>
                        <polygon fill="white" points="14.5,3 15.5,4 19,4 19,6 5,6 5,4 8.5,4 9.5,3"/>
                    </mask>
                </defs>
                <rect width="100%" height="100%" mask="url(#mask)"/>
            `}
            case 'drafts': {
                const B = getCirclePointTangentPoint([12, 12], [20, 8], 2, [12, 1])[1];
                const I = getCirclePointTangentPoint([12, 12], [4, 8], 2, [12, 1])[0];
                const J = getLineLineIntersection([12, 12], [B[0], B[1] + 2], [12, 3], [20, 8], [12, 13]);
                const K = getLineLineIntersection([12, 12], [I[0], I[1] + 2], [12, 3], [4, 8], [12, 13]);
                return `
                <defs>
                    <mask id="mask">
                        <path fill="white" d="
                            M 12 1
                            L ${B[0]} ${B[1]}
                            A 2 2 0 0 1 22 8
                            V 18
                            A 2 2 0 0 1 20 20
                            H 4
                            A 2 2 0 0 1 2 18
                            V 8
                            A 2 2 0 0 1 ${I[0]} ${I[1]}
                            Z
                        "/>
                        <polygon fill="black" points="
                            12,3
                            ${J[0]},${J[1]}
                            12,13
                            ${K[0]},${K[1]}
                        "/>
                    </mask>
                </defs>
                <rect width="100%" height="100%" mask="url(#mask)"/>
            `}
            case 'edit': {
                const radius = 1;
                return `
                <defs>
                    <mask id="mask">
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
                <rect width="100%" height="100%" mask="url(#mask)"/>
            `}
            case 'expand_less': {
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
            `}
            case 'expand_more': {
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
            `}
            case 'favorite': {
                return `
                <path d="M 12 21.35 l -1.45 -1.315 C 5.4 15.36 2 12.275 2 8.5 C 2 5.415 4.415 3 7.5 3 c 1.74 0 3.41 0.81 4.5 2.085 C 13.09 3.81 14.76 3 16.5 3 c 3.085 0 5.5 2.415 5.5 5.5 c 0 3.775 -3.4 6.86 -8.55 11.535 L 12 21.35 z"/>
            `}
            case 'favorite_border': {
                return `
                <path d="M 16.5 3 c -1.74 0 -3.41 0.81 -4.5 2.085 C 10.91 3.81 9.24 3 7.5 3 C 4.415 3 2 5.415 2 8.5 c 0 3.775 3.4 6.86 8.55 11.535 L 12 21.35 l 1.45 -1.315 C 18.6 15.36 22 12.275 22 8.5 c 0 -3.085 -2.415 -5.5 -5.5 -5.5 z m -4.395 15.555 l -0.105 0.095 l -0.105 -0.095 C 7.14 14.24 4 11.39 4 8.5 c 0 -1.995 1.505 -3.5 3.5 -3.5 c 1.54 0 3.04 0.995 3.565 2.36 h 1.865 C 13.46 5.995 14.96 5 16.5 5 c 1.995 0 3.5 1.505 3.5 3.5 c 0 2.89 -3.14 5.74 -7.895 10.055 z"/>
            `}
            case 'hourglass': {
                return `
                <defs>
                    <polygon id="body" points="5,4 19,4 5,20 19,20"/>
                    <clipPath id="clip-path">
                        <use href="#body"/>
                    </clipPath>
                    <mask id="mask">
                        <rect fill="white" x="4" y="12" width="16" height="7" clip-path="url(#clip-path)"/>
                        <use href="#body" fill="none" stroke="white" stroke-width="2" stroke-linejoin="round"/>
                    </mask>
                </defs>
                <rect width="100%" height="100%" mask="url(#mask)"/>
            `}
            case 'inbox': {
                return `
                <defs>
                    <mask id="mask">
                        <rect fill="white" x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                        <rect fill="black" x="5" y="5" width="14" height="10"/>
                        <circle fill="black" cx="12" cy="15" r="3"/>
                    </mask>
                </defs>
                <rect width="100%" height="100%" mask="url(#mask)"/>
            `}
            case 'info': {
                return `
                <defs>
                    <mask id="mask">
                        <circle fill="white" cx="12" cy="12" r="10"/>
                        <rect fill="black" x="11" y="7" width="2" height="2"/>
                        <rect fill="black" x="11" y="11" width="2" height="6"/>
                    </mask>
                </defs>
                <rect width="100%" height="100%" mask="url(#mask)"/>
            `}
            case 'language': {
                const assistCircle = getCircle([12, 12], [12, 4], [14.5, 12], [12, 20]);
                const assistAngele = Math.atan((12 - 4) / (12 - assistCircle[0]));
                const T1 = [12 - 1 * Math.cos(assistAngele), 4 - 1 * Math.sin(assistAngele)];
                const B1 = [12 - 1 * Math.cos(assistAngele), 20 + 1 * Math.sin(assistAngele)];
                const T2 = [12 + 1 * Math.cos(assistAngele), 4 - 1 * Math.sin(assistAngele)];
                const B2 = [12 + 1 * Math.cos(assistAngele), 20 + 1 * Math.sin(assistAngele)];
                return `
                <defs>
                    <mask id="mask">
                        <circle fill="none" stroke="white" stroke-width="2" cx="12" cy="12" r="9"/>
                        <path fill="none" stroke="white" stroke-width="2" d="
                            M ${T1[0]} ${T1[1]}
                            A ${assistCircle[2] + 1} ${assistCircle[2] + 1} 0 0 0 ${B1[0]} ${B1[1]}
                        "/>
                        <path fill="none" stroke="white" stroke-width="2" d="
                            M ${T2[0]} ${T2[1]}
                            A ${assistCircle[2] + 1} ${assistCircle[2] + 1} 0 0 1 ${B2[0]} ${B2[1]}
                        "/>
                        <rect fill="white" x="3.5" y="8" width="17" height="2"/>
                        <rect fill="white" x="3.5" y="14" width="17" height="2"/>
                    </mask>
                </defs>
                <rect width="100%" height="100%" mask="url(#mask)"/>
            `}
            case 'lock': {
                switch (iconSize) {
                    case 'small': {
                        return `
                        <defs>
                            <mask id="mask">
                                <rect fill="white" x="5" y="1" width="8" height="10" rx="4" ry="4"/>
                                <rect fill="black" x="6.5" y="2.5" width="5" height="7" rx="2.5" ry="2.5"/>
                                <rect fill="white" x="3" y="6" width="12" height="11" rx="1.5" ry="1.5"/>
                                <circle fill="black" cx="9" cy="11.5" r="1.75"/>
                            </mask>
                        </defs>
                        <rect width="100%" height="100%" mask="url(#mask)"/>
                    `}
                    default: {
                        return `
                        <defs>
                            <mask id="mask">
                                <rect fill="white" x="7" y="1" width="10" height="14" rx="5" ry="5"/>
                                <rect fill="black" x="9" y="3" width="6" height="10" rx="3" ry="3"/>
                                <rect fill="white" x="4" y="8" width="16" height="14" rx="2" ry="2"/>
                                <circle fill="black" cx="12" cy="15" r="2"/>
                            </mask>
                        </defs>
                        <rect width="100%" height="100%" mask="url(#mask)"/>
                    `}
                }
            }
            case 'mail': {
                return `
                <defs>
                    <mask id="mask">
                        <rect fill="white" x="2" y="4"  width="20" height="16" rx="2" ry="2"/>
                        <polygon fill="black" points="4,6 12,11 20,6 20,8 12,13 4,8"/>
                    </mask>
                </defs>
                <rect width="100%" height="100%" mask="url(#mask)"/>
            `}
            case 'menu': {
                return `
                <rect x="3" y="6" width="18" height="2"/>
                <rect x="3" y="11" width="18" height="2"/>
                <rect x="3" y="16" width="18" height="2"/>
            `}
            case 'message': {
                return `
                <defs>
                    <mask id="mask">
                        <rect fill="white" x="2" y="2" width="20" height="16" rx="2" ry="2"/>
                        <polygon fill="white" points="2,14 6,18 2,22"/>
                        <rect fill="black" x="6" y="6" width="12" height="2"/>
                        <rect fill="black" x="6" y="9" width="12" height="2"/>
                        <rect fill="black" x="6" y="12" width="12" height="2"/>
                    </mask>
                </defs>
                <rect width="100%" height="100%" mask="url(#mask)"/>
            `}
            case 'mic': {
                switch (iconVariant) {
                    case 'google': {
                        return `
                        <defs>
                            <mask id="mask">
                                <circle fill="none" cx="12" cy="11" r="6" stroke="white" stroke-width="2"/>
                                <rect fill="black" width="24" height="11"/>
                            </mask>
                        </defs>
                        <rect fill="#34A853" x="11" y="17" width="2" height="4"/>
                        <g mask="url(#mask)">
                            <rect fill="#EA4335" width="24" height="24"/>
                            <rect fill="#FBBC05" width="24" height="11" transform-origin="12 11" transform="rotate(-45)"/>
                        </g>
                        <rect fill="#4285F4" x="9" y="2" width="6" height="12" rx="3" ry="3"/>
                    `}
                    default: {
                        return `
                        <defs>
                            <mask id="mask">
                                <circle fill="none" cx="12" cy="11" r="6" stroke="white" stroke-width="2"/>
                                <rect fill="white" x="11" y="17" width="2" height="4"/>
                                <rect fill="black" width="24" height="11"/>
                            </mask>
                        </defs>
                        <rect width="100%" height="100%" mask="url(#mask)"/>
                        <rect x="9" y="2" width="6" height="12" rx="3" ry="3"/>
                    `}
                }
            }
            case 'more_horiz': {
                switch (iconSize) {
                    case 'small': {
                        return `
                        <circle cx="4.5" cy="4.5" r="1.5"/>
                        <circle cx="9" cy="4.5" r="1.5"/>
                        <circle cx="13.5" cy="4.5" r="1.5"/>
                    `}
                    default: {
                        return `
                        <circle cx="6" cy="6" r="2"/>
                        <circle cx="12" cy="6" r="2"/>
                        <circle cx="18" cy="6" r="2"/>
                    `}
                }
            }
            case 'more_vert': {
                switch (iconSize) {
                    case 'small': {
                        return `
                        <circle cx="4.5" cy="4.5" r="1.5"/>
                        <circle cx="4.5" cy="9" r="1.5"/>
                        <circle cx="4.5" cy="13.5" r="1.5"/>
                    `}
                    default: {
                        return `
                        <circle cx="6" cy="6" r="2"/>
                        <circle cx="6" cy="12" r="2"/>
                        <circle cx="6" cy="18" r="2"/>
                    `}
                }
            }
            case 'notifications': {
                return `
                <defs>
                    <mask id="mask">
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
                <rect width="100%" height="100%" mask="url(#mask)"/>
            `}
            case 'person_add': {
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
            `}
            case 'play_arrow': {
                return `
                <polygon points="8,5 19,12 8,19"/>
            `}
            case 'push_pin': {
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
            `}
            case 'reminder': {
                const assistAngeleA = Math.atan(1 / 2);
                const assistAngeleB = Math.atan(1 / 7);
                const assistAngeleC = Math.atan(5 / 24);
                const assistA = [18.5 - (21 - 14.25) * Math.tan(assistAngeleB), 21];
                const E = [14 + 2 * Math.sin(assistAngeleA), 12 - 2 * Math.cos(assistAngeleA)];
                const F = getCirclePointTangentPoint([12, 12], [18.5, 14.25], 2, E)[1];
                const G = [18.5 + 2 * Math.cos(assistAngeleB), 14.25 + 2 * Math.sin(assistAngeleB)];
                const H = [assistA[0] + 2 * Math.cos(assistAngeleB), assistA[1] + 2 * Math.sin(assistAngeleB)];
                const K = [10 - 2 * Math.cos(Math.PI / 4), 21 + 2 * Math.cos(Math.PI / 4)];
                const L = [2, K[1] - (K[0] - 2)];
                const M = [L[0] + 1.5 * Math.cos(Math.PI / 4), L[1] - 1.5 * Math.sin(Math.PI / 4)];
                const assistB = [L[0] + 1.5 * Math.SQRT2, L[1]];
                const N = [assistB[0] + 1.5 * Math.sin(assistAngeleC), assistB[1] - 1.5 * Math.cos(assistAngeleC)];
                const O = [9, N[1] + (9 - N[0]) * Math.tan(assistAngeleC)];
                return `
                <defs>
                    <mask id="mask">
                        <path fill="white" d="
                            M 9 3
                            A 2 2 0 0 1 13 3
                            V 10
                            H 14
                            A 2 2 0 0 1 ${E[0]} ${E[1]}
                            L ${F[0]} ${F[1]}
                            A 2 2 0 0 1 ${G[0]} ${G[1]}
                            L ${H[0]} ${H[1]}
                            A 2 2 0 0 1 ${assistA[0]} 23
                            H 10
                            A 2 2 0 0 1 ${K[0]} ${K[1]}
                            L ${L[0]} ${L[1]}
                            L ${M[0]} ${M[1]}
                            A 1.5 1.5 0 0 1 ${N[0]} ${N[1]}
                            L ${O[0]} ${O[1]}
                            Z
                        "/>
                        <path fill="none" stroke="white" stroke-width="1.25" d="
                            M 9.625 6
                            A 2.375 2.375 0 0 0 4.875 6
                            A 2.375 2.375 0 0 0 7.25 8.375
                            H 9.625
                            Z
                        "/>
                        <path fill="none" stroke="white" stroke-width="1.25" d="
                            M 12.375 6
                            A 2.375 2.375 0 0 1 17.125 6
                            A 2.375 2.375 0 0 1 14.75 8.375
                            H 12.375
                            Z
                        "/>
                    </mask>
                </defs>
                <rect width="100%" height="100%" mask="url(#mask)"/>
            `}
            case 'reply_all': {
                return `
                <defs>
                    <mask id="mask">
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
                <rect width="100%" height="100%" mask="url(#mask)"/>
            `}
            case 'report': {
                return `
                <defs>
                    <mask id="mask">
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
                <rect width="100%" height="100%" mask="url(#mask)"/>
            `}
            case 'search': {
                return `
                <defs>
                    <mask id="mask">
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
                <rect width="100%" height="100%" mask="url(#mask)"/>
            `}
            case 'send': {
                return `
                <polygon points="
                    2,3
                    23,12
                    2,21
                    2,14
                    17,12
                    2,10
                "/>
            `}
            case 'share': {
                const lineWidth = getParallelLineDistance([12, 12], [6, 11], [18, 4], [6, 13], [18, 6]);
                return `
                <defs>
                    <mask id="mask">
                        <line stroke="white" stroke-width="${lineWidth}" x1="6" y1="12" x2="18" y2="5"/>
                        <line stroke="white" stroke-width="${lineWidth}" x1="6" y1="12" x2="18" y2="19"/>
                        <circle fill="white" cx="18" cy="5" r="3"/>
                        <circle fill="white" cx="6" cy="12" r="3"/>
                        <circle fill="white" cx="18" cy="19" r="3"/>
                    </mask>
                </defs>
                <rect width="100%" height="100%" mask="url(#mask)"/>
            `}
            case 'shopping_cart': {
                const assistAngeleA = Math.atan(18 / 38);
                const assistAngeleB = Math.atan(Math.hypot(4.5, 6) / 1);
                const assistA = getCircleCircleIntersection([12, 12], [15.5, 11], [17.75, 8], 1, 3.75)[0];
                const assistL1 = assistA[0] - 15.5;
                const assistL2 = assistA[1] - 11;
                const assistB = getCirclePointTangentPoint([12, 12], [7, 15], 2, [12, 2])[0];
                const assistAngeleC = Math.atan((assistB[1] - 2) / (12 - assistB[0]));
                const A = [1, 2];
                const P = [3, 4];
                const C = [P[0] + 2 / Math.cos(assistAngeleA), 4]
                const B = [C[0] - 2 * Math.tan(assistAngeleA), 2];
                const D = [20, 4];
                const E = [20 + assistL1, 5 + assistL2];
                const F = [15.5 + 2 * assistL1, 11 + 2 * assistL2];
                const G = [15.5, 13];
                const H = [7 + 2 / Math.tan(assistAngeleC), 13];
                const I = [7 + (0.25 / Math.tan(assistAngeleC / 2)) * Math.cos(assistAngeleC), 15 - (0.25 / Math.tan(assistAngeleC / 2)) * Math.sin(assistAngeleC)];
                const J = [7 + 0.25 / Math.tan(assistAngeleC / 2), 15];
                const K = [19, 15];
                const L = [19, 17];
                const M = [7, 17];
                const N = [assistB[0], assistB[1]];
                const O = getLineLineIntersection([12, 12], P, [12, 23], N, [12, 2]);
                const Q = [1, 4];
                return `
                <path d="
                    M ${A[0]} ${A[1]}
                    H ${B[0]}
                    L ${C[0]} ${C[1]}
                    H ${D[0]}
                    A 1 1 0 0 1 ${E[0]} ${E[1]}
                    L ${F[0]} ${F[1]}
                    A 2 2 0 0 1 ${G[0]} ${G[1]}
                    H ${H[0]}
                    L ${I[0]} ${I[1]}
                    A 0.25 0.25 0 0 0 ${J[0]} ${J[1]}
                    H ${K[0]}
                    V ${L[1]}
                    H ${M[0]}
                    A 2 2 0 0 1 ${N[0]} ${N[1]}
                    L ${O[0]} ${O[1]}
                    L ${P[0]} ${P[1]}
                    H ${Q[0]}
                    Z
                "/>
                <circle cx="7" cy="20" r="2" />
                <circle cx="17" cy="20" r="2" />
            `}
            case 'signal_cellular_4_bar': {
                switch (iconSize) {
                    case 'small': {
                        return `
                        <polygon points="2,16 16,2 16,16"/>
                    `}
                    default: {
                        return `
                        <polygon points="2,22 22,2 22,22"/>
                    `}
                }
            }
            case 'signal_wifi_4_bar': {
                switch (iconSize) {
                    case 'small': {
                        return `
                        <path d="
                            M 9 16
                            L ${9 - Math.sqrt(Math.pow(14, 2) - Math.pow(Math.abs(16 - 5), 2))} 5
                            A 14 14 0 0 1 ${9 + Math.sqrt(Math.pow(14, 2) - Math.pow(Math.abs(16 - 5), 2))} 5
                            Z
                        "/>
                    `}
                    default: {
                        return `
                        <path d="
                            M 12 21.5
                            L ${12 - Math.sqrt(Math.pow(18.5, 2) - Math.pow(Math.abs(21.5 - 7), 2))} 7
                            A 18.5 18.5 0 0 1 ${12 + Math.sqrt(Math.pow(18.5, 2) - Math.pow(Math.abs(21.5 - 7), 2))} 7
                            Z
                        "/>
                    `}
                }
            }
            case 'square_recent': {
                return `
                <defs>
                    <mask id="mask">
                        <rect fill="white" x="3.75" y="3.75" width="16.5" height="16.5" rx="1.5" ry="1.5"/>
                        <rect fill="black" x="5.75" y="5.75" width="12.5" height="12.5"/>
                    </mask>
                </defs>
                <rect width="100%" height="100%" mask="url(#mask)"/>
            `}
            case 'star_border': {
                const Ox = 12;
                const Oy = 12.5;
                const borderWidth = 2;
                const outerOutwardRadius = 10.5;
                const outerInwardRadius = outerOutwardRadius * Math.sin(23 / 360 * 2 * Math.PI) / Math.sin((180 - (23 + 180 / 5)) / 360 * 2 * Math.PI);
                const innerOutwardRadius = 10.5 - borderWidth / Math.sin(23 / 360 * 2 * Math.PI);
                const innerInwardRadius = outerInwardRadius - borderWidth / Math.cos(((180 - (23 + 180 / 5)) - 90) / 360 * 2 * Math.PI);
                return `
                <defs>
                    <mask id="mask">
                        <polygon fill="white" points="
                            ${Ox},${Oy - outerOutwardRadius}
                            ${Ox + outerInwardRadius * Math.sin(Math.PI / 5)},${Oy - outerInwardRadius * Math.cos(Math.PI / 5)}
                            ${Ox + outerOutwardRadius * Math.sin(2 * Math.PI / 5)},${Oy - outerOutwardRadius * Math.cos(2 * Math.PI / 5)}
                            ${Ox + outerInwardRadius * Math.sin(2 * Math.PI / 5)},${Oy + outerInwardRadius * Math.cos(2 * Math.PI / 5)}
                            ${Ox + outerOutwardRadius * Math.sin(Math.PI / 5)},${Oy + outerOutwardRadius * Math.cos(Math.PI / 5)}
                            ${Ox},${Oy + outerInwardRadius}
                            ${Ox - outerOutwardRadius * Math.sin(Math.PI / 5)},${Oy + outerOutwardRadius * Math.cos(Math.PI / 5)}
                            ${Ox - outerInwardRadius * Math.sin(2 * Math.PI / 5)},${Oy + outerInwardRadius * Math.cos(2 * Math.PI / 5)}
                            ${Ox - outerOutwardRadius * Math.sin(2 * Math.PI / 5)},${Oy - outerOutwardRadius * Math.cos(2 * Math.PI / 5)}
                            ${Ox - outerInwardRadius * Math.sin(Math.PI / 5)},${Oy - outerInwardRadius * Math.cos(Math.PI / 5)}
                        "/>
                        <polygon fill="black" points="
                            ${Ox},${Oy - innerOutwardRadius}
                            ${Ox + innerInwardRadius * Math.sin(Math.PI / 5)},${Oy - innerInwardRadius * Math.cos(Math.PI / 5)}
                            ${Ox + innerOutwardRadius * Math.sin(2 * Math.PI / 5)},${Oy - innerOutwardRadius * Math.cos(2 * Math.PI / 5)}
                            ${Ox + innerInwardRadius * Math.sin(2 * Math.PI / 5)},${Oy + innerInwardRadius * Math.cos(2 * Math.PI / 5)}
                            ${Ox + innerOutwardRadius * Math.sin(Math.PI / 5)},${Oy + innerOutwardRadius * Math.cos(Math.PI / 5)}
                            ${Ox},${Oy + innerInwardRadius}
                            ${Ox - innerOutwardRadius * Math.sin(Math.PI / 5)},${Oy + innerOutwardRadius * Math.cos(Math.PI / 5)}
                            ${Ox - innerInwardRadius * Math.sin(2 * Math.PI / 5)},${Oy + innerInwardRadius * Math.cos(2 * Math.PI / 5)}
                            ${Ox - innerOutwardRadius * Math.sin(2 * Math.PI / 5)},${Oy - innerOutwardRadius * Math.cos(2 * Math.PI / 5)}
                            ${Ox - innerInwardRadius * Math.sin(Math.PI / 5)},${Oy - innerInwardRadius * Math.cos(Math.PI / 5)}
                        "/>
                    </mask>
                </defs>
                <rect width="100%" height="100%" mask="url(#mask)"/>
            `}
            case 'timer': {
                return `
                <defs>
                    <clipPath id="clip-path">
                        <circle cx="12" cy="13" r="11" />
                    </clipPath>
                    <mask id="mask">
                        <line clip-path="url(#clip-path)" stroke="white" stroke-width="2" x1="12" y1="13" x2="21" y2="4"/>
                        <circle fill="white" cx="12" cy="13" r="9" />
                        <circle fill="black" cx="12" cy="13" r="7"/>
                    </mask>
                </defs>
                <rect width="100%" height="100%" mask="url(#mask)"/>
                <rect width="6" height="2" x="9" y="1"/>
                <rect width="2" height="6" x="11" y="8"/>
            `}
            case 'today': {
                return `
                <defs>
                    <mask id="mask">
                        <rect fill="white" x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                        <rect fill="white" x="6" y="2" width="2" height="4"/>
                        <rect fill="white" x="16" y="2" width="2" height="4"/>
                        <rect fill="black" x="5" y="9" width="14" height="11"/>
                    </mask>
                </defs>
                <rect width="100%" height="100%" mask="url(#mask)"/>
                <rect x="7" y="11" width="5" height="5"/>
            `}
            case 'view_grid': {
                return `
                <rect x="3" y="4" width="8" height="7"/>
                <rect x="12" y="4" width="8" height="7"/>
                <rect x="3" y="12" width="8" height="7"/>
                <rect x="12" y="12" width="8" height="7"/>
            `}
            case 'view_module': {
                return `
                <rect x="4" y="5" width="5" height="6"/>
                <rect x="10" y="5" width="5" height="6"/>
                <rect x="16" y="5" width="5" height="6"/>
                <rect x="4" y="12" width="5" height="6"/>
                <rect x="10" y="12" width="5" height="6"/>
                <rect x="16" y="12" width="5" height="6"/>
            `}
            case 'visibility': {
                const topCircle = getCircle([12, 12], [1, 12], [12, 19.5], [23, 12]);
                const bottomCircle = getCircle([12, 12], [1, 12], [12, 4.5], [23, 12]);
                return `
                <defs>
                    <clipPath id="clip-path">
                        <circle cx="${topCircle[0]}" cy="${topCircle[1]}" r="${topCircle[2]}" />
                    </clipPath>
                    <mask id="mask">
                        <circle fill="white" cx="${bottomCircle[0]}" cy="${bottomCircle[1]}" r="${bottomCircle[2]}" clip-path="url(#clip-path)" />
                        <circle fill="black" cx="12" cy="12" r="5" />
                        <circle fill="white" cx="12" cy="12" r="3" />
                    </mask>
                </defs>
                <rect width="100%" height="100%" mask="url(#mask)"/>
            `}
            case 'voicemail': {
                return `
                <defs>
                    <mask id="mask">
                        <circle cx="4" cy="9" r="3.25" fill="none" stroke="white" stroke-width="1.5"/>
                        <circle cx="14" cy="9" r="3.25" fill="none" stroke="white" stroke-width="1.5"/>
                        <line stroke="white" stroke-width="1.5" x1="4" y1="12.25" x2="14" y2="12.25"/>
                    </mask>
                </defs>
                <rect width="100%" height="100%" mask="url(#mask)"/>
            `}
            case 'volume_up': {
                return `
                <defs>
                    <mask id="mask">
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
                <rect width="100%" height="100%" mask="url(#mask)"/>
            `}
            case 'warning': {
                switch (iconSize) {
                    case 'small': {
                        return `
                        <defs>
                            <mask id="mask">
                                <polygon fill="white" points="9,1 18,16.5 0,16.5"/>
                                <rect fill="black" x="8" y="7" width="2" height="4"/>
                                <rect fill="black" x="8" y="12" width="2" height="2"/>
                            </mask>
                        </defs>
                        <rect width="100%" height="100%" mask="url(#mask)"/>
                    `}
                    default: {
                        return `
                        <defs>
                            <mask id="mask">
                                <polygon fill="white" points="12,2 23,21 1,21"/>
                                <rect fill="black" x="11" y="10" width="2" height="4"/>
                                <rect fill="black" x="11" y="16" width="2" height="2"/>
                            </mask>
                        </defs>
                        <rect width="100%" height="100%" mask="url(#mask)"/>
                    `}
                }
            }
        }
    }

    iconElement.innerHTML = setIconContent();

}

export class CMDIcon extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        const svgElement = document.createElementNS(namespace, 'svg');
        this.shadowRoot.append(svgElement);
    }

    connectedCallback() {
        setIconProperties(this);
    }
}

customElements.define('cmd-icon', CMDIcon)
