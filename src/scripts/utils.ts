export function getRouteNameSegements(route: string) {
    const chapterName = route.split("：")[0];
    const pageName = route.split("：")[1];
    return { chapter: chapterName, page: pageName };
}

export function getCSSAnimations(node: HTMLElement) {
    return node.getAnimations({ subtree: true }).filter((animation) => animation instanceof CSSAnimation);
}
