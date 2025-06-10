<style>
section {
    article[data-direction="horizontal"] & {
        grid-column: 1 / -1;
        display: grid;
        grid-template-columns: subgrid;
        gap: inherit;
        align-items: inherit;
    }

    article[data-direction="vertical"] & {
        display: flex;
        flex-direction: column;
        margin-block-end: var(--keyline);
    }

    article[data-direction="horizontal"] section+&,
    figure:not(:has(p))+& {
        margin-block-start: 40px;
    }
}
</style>

<template>
    <section>
        <slot />
    </section>
</template>