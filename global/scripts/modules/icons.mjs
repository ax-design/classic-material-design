const namespace = 'http://www.w3.org/2000/svg';

function setIconProperties(element) {
    const iconElement = element.shadowRoot.querySelector('svg');
    const iconName = element.getAttribute('name');
    const iconSize = element.getAttribute('size');

    function setIconWidth() {
        switch (iconName) {
            case 'more_vert':
                return 12;
            default:
                switch (iconSize) {
                    case 'small':
                        return 18;
                    case 'large':
                        return 36;
                    default:
                        return 24
                }
        }
    }

    function setIconHeight() {
        switch (iconSize) {
            case 'small':
                return 18;
            case 'large':
                return 36;
            default:
                return 24
        }
    }

    iconElement.setAttribute('viewBox', '0 0 ' + setIconWidth() + ' ' + setIconHeight());
    iconElement.setAttribute('fill', 'currentColor');
    iconElement.setAttribute('aria-hidden', 'true');

    function setIconContent() {
        switch (iconName) {
            case 'add': {
                return `
                <defs>
                    <mask id="mask">
                       <rect fill="white" x="5" y="11" width="14" height="2"/>
                       <rect fill="white" x="11" y="5" width="2" height="14"/>
                    </mask>
                </defs>
                <rect width="24" height="24" mask="url(#mask)"/>
            `;
            }
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
                <rect width="24" height="24" mask="url(#mask)"/>
            `;
            }
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
                <rect width="24" height="24" mask="url(#mask)"/>
            `;
            }
            case 'arrow_drop_down': {
                return `
                <polygon points="7,10 17,10 12,15"/>
            `;
            }
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
                <rect width="24" height="24" mask="url(#mask)"/>
            `;
            }
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
                <rect width="24" height="24" mask="url(#mask)"/>
            `;
            }
            case 'battery_full_alt': {
                return `
                <polygon points="7.5,2 10.5,2 10.5,3 13.5,3 13.5,16 4.5,16 4.5,3 7.5,3"/>
            `;
            }
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
            `;
            }
            case 'circle_home': {
                return `
                <circle fill="none" stroke="currentColor" stroke-width="2" cx="12" cy="12" r="8.25" />
            `;
            }
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
                <rect width="24" height="24" mask="url(#mask)"/>
            `;
            }
            case 'mail': {
                return `
                <defs>
                    <mask id="mask">
                        <rect fill="white" x="2" y="4"  width="20" height="16" rx="2" ry="2"/>
                        <polygon fill="black" points="4,6 12,11 20,6 20,8 12,13 4,8"/>
                    </mask>
                </defs>
                <rect width="24" height="24" mask="url(#mask)"/>
            `;
            }
            case 'menu': {
                return `
                <rect x="3" y="6" width="18" height="2"/>
                <rect x="3" y="11" width="18" height="2"/>
                <rect x="3" y="16" width="18" height="2"/>
            `;
            }
            case 'message': {
                return `
                <defs>
                    <mask id="mask">
                        <rect fill="white" x="2" y="2"  width="20" height="16" rx="2" ry="2"/>
                        <polygon fill="white" points="2,14 6,18 2,22"/>
                        <rect fill="black" x="6" y="6" width="12" height="2"/>
                        <rect fill="black" x="6" y="9" width="12" height="2"/>
                        <rect fill="black" x="6" y="12" width="12" height="2"/>
                    </mask>
                </defs>
                <rect width="24" height="24" mask="url(#mask)"/>
            `;
            }
            case 'more_vert': {
                return `
                <circle cx="6" cy="6" r="2"/>
                <circle cx="6" cy="12" r="2"/>
                <circle cx="6" cy="18" r="2"/>
            `;
            }
            case 'search': {
                return `
                <defs>
                    <mask id="mask">
                        <polygon fill="white" points="14,13.25 14.75,14 15.5,14 20.5,19 19,20.5 14,15.5 14,14.75 13.25,14"/>
                        <circle fill="white" cx="9.5" cy="9.5" r="6.5"/>
                        <circle fill="black" cx="9.5" cy="9.5" r="4.5"/>
                    </mask>
                </defs>
                <rect width="24" height="24" mask="url(#mask)"/>
            `;
            }
            case 'signal_cellular_4_bar': {
                return `
                <polygon points="2,16 16,2 16,16"/>
            `;
            }
            case 'signal_wifi_4_bar': {
                return `
                <path d="
                    M 9 16
                    L ${9 - Math.sqrt(Math.pow(14, 2) - Math.pow(Math.abs(16 - 5), 2))} 5
                    A 14 14 0 0 1 ${9 + Math.sqrt(Math.pow(14, 2) - Math.pow(Math.abs(16 - 5), 2))} 5
                    Z
                "/>
            `;
            }
            case 'square_recent': {
                return `
                <defs>
                    <mask id="mask">
                        <rect fill="white" x="3.75" y="3.75" width="16.5" height="16.5" rx="1.5" ry="1.5"/>
                        <rect fill="black" x="5.75" y="5.75" width="12.5" height="12.5"/>
                    </mask>
                </defs>
                <rect width="24" height="24" mask="url(#mask)"/>
            `;
            }
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
                <rect width="24" height="24" mask="url(#mask)"/>
            `;
            }
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
                <rect width="24" height="24" mask="url(#mask)"/>
                <rect x="7" y="11" width="5" height="5"/>
            `;
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
