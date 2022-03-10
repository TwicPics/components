<template>
    <main>
        <Menu />
        <h1>Nuxt2 SSR test page</h1>
        <h2>
            {{ res.focus ? `focus='auto',` : `` }} mode = {{ res.mode }}
        </h2>
        <div class="samples">
            <div class="item">
                <TwicImg
                    :src="res.imgSrc"
                    :focus="res.focus"
                    :ratio="res.ratio"
                    :mode="res.mode"
                />
                <span>ratio = {{ res.ratio }}</span>
            </div>
        </div>
    </main>
</template>

<script>
import Menu from "../components/menu.vue";
import { getSampleImage } from "@twicpics/components-sample/fakeServer.js";
export default {
    "components": {
        Menu,
    },
    async asyncData( ) {
        const res = await getSampleImage();
        return {
            res,
        };
    },
};
</script>
