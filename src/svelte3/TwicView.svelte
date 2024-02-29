<svelte:options tag={null}/>
<script context="module" lang="ts">
import { getCurrentComponent, getDataAttributeName, isWebComponents } from "./_utils.js";
</script>
<script lang="ts">
if ( isWebComponents ) {
    getCurrentComponent().setAttribute( getDataAttributeName( `view` ), `` );
}
</script>
{ #if isWebComponents }
<slot />
{ :else }
<div { ...{ [ getDataAttributeName( `view` ) ]: `` } } { ...$$restProps }>
    <slot />
</div>
{ /if }
