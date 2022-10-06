<svelte:options tag={null}/>
<script context="module" lang="ts">
    import { computeViewAttributes } from "../_/compute";
</script>
<script lang="ts">
    $: viewAttributes = computeViewAttributes();
</script>
<div {...viewAttributes} {...$$restProps}>
    <slot />
</div>
