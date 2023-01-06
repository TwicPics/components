<svelte:options tag={null}/>
<script context="module" lang="ts">
import { getDataAttributeName, isWebComponents } from "./utils.js";
import { get_current_component } from "svelte/internal";
</script>
<script lang="ts">
if ( isWebComponents ) {
    get_current_component().setAttribute( getDataAttributeName( `view` ), `` );
}
</script>
{ #if isWebComponents }
<slot />
{ :else }
<div { ...{ [ getDataAttributeName( `view` ) ]: `` } } { ...$$restProps }>
    <slot />
</div>
{ /if }
