import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { fileURLToPath, URL } from "url";

export default defineConfig({
    base: "/classic-material-design/",
    build: {
        target: "esnext",
        assetsInlineLimit: 0,
    },
    plugins: [vue()],
    resolve: {
        alias: {
            "@public": fileURLToPath(new URL("./public", import.meta.url)),
            "@pages": fileURLToPath(new URL("./src/pages", import.meta.url)),
            "@scripts": fileURLToPath(new URL("./src/scripts", import.meta.url)),
            "@document": fileURLToPath(new URL("./src/components/document", import.meta.url)),
            "@material": fileURLToPath(new URL("./src/components/material", import.meta.url)),
            "@diagrams": fileURLToPath(new URL("./src/components/diagrams", import.meta.url)),
            "@applications": fileURLToPath(new URL("./src/components/applications", import.meta.url)),
        },
    },
});
