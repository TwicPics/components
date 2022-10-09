<script>
import { getDataAttributeName } from '../_/install';
const viewAttributes = {
    [ getDataAttributeName( `view` ) ]: ``,
};
export default {
    "computed": {
        "viewAttributes": () => viewAttributes,
    },
};
</script>
<template>
    <div v-bind="viewAttributes">
        <slot />
    </div>
</template>
