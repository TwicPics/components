<script>
import { getDataAttributeName } from '../_/config';
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
