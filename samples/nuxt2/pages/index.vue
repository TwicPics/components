<template>
    <main>
        <MenuBar />
        <Sample />
    </main>
</template>

<script>
import Sample from "@twicpics/components-sample/Sample.vue";
import MenuBar from "../components/menuBar.vue";
export default {
    "components": {
        Sample,
        MenuBar,
    },
};
</script>
