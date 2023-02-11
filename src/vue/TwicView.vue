<script>
import { getDataAttributeName } from '../_/install';
export default {
    "computed": {
        "viewAttributes": () => ( {
            [ getDataAttributeName( `view` ) ]: ``,
        } ),
    },
};
</script>
<template>
    <div v-bind="viewAttributes">
        <slot />
    </div>
</template>
