<script>
import { computeViewAttributes } from '../_/compute';
export default {
    "computed": {
        dataAttributes() {
            return computeViewAttributes();
        },
    },
};
</script>
<template>
    <div v-bind="{ ...dataAttributes }">
        <slot />
    </div>
</template>
