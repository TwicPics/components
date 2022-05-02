<script setup>
import { getSampleImage } from "@twicpics/components-sample/fakeServer.js";
const res = await getSampleImage();
</script>
<template>
    <main>
        <Menu />
        <h1>Nuxt3 SSR test page</h1>
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
        </div>
    </main>
</template>

<script>
</script>
