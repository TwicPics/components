<template>
    <main>
        <MenuBar />
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
                    @stateChange="{handleStateChange}"
                />
                <span>ratio = {{ res.ratio }}</span>
            </div>
            <div class="item">
                <TwicImg
                    :src="res.imgSrc"
                    :focus="res.focus"
                    :ratio="res.ratio"
                    :mode="res.mode"
                    transition="zoom"
                />
                <span>ratio = {{ res.ratio }}, transition = "zoom"</span>
            </div>
            <div class="item">
                <TwicPicture
                    src="football.jpg"
                    sizes="
                      (max-width: 750px) 100vm,
                      (max-width: 1140px) 400px,
                      350px
                    "
                />
                <span>TwicPicture</span>
            </div>
        </div>
    </main>
</template>

<script>
import MenuBar from "../components/menuBar.vue";
import { getSampleImage } from "@twicpics/components-sample/fakeServer.js";
export default {
    "components": {
        MenuBar,
    },
    async asyncData( ) {
        const res = await getSampleImage();
        return {
            res,
        };
    },
    "methods": {
        handleStateChange( state ) {
            // eslint-disable-next-line no-console
            console.log( `Vue - TwicImg emits new state`, state );
        },
    },
};
</script>
