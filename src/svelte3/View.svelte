<svelte:options tag={null}/>
<script context="module" lang="ts">
import { computeViewAttributes } from "../_/compute";
import { isBrowser, isWebComponents } from "../_/utils";
import { get_current_component } from "svelte/internal";
</script>
<script lang="ts">
const component = get_current_component();
const attributes = computeViewAttributes();

$: {
    if ( isBrowser && isWebComponents && component && attributes ) {
        Object.entries( attributes || [] ).forEach( ( [ name, value ] ) => {
            if ( component.hasAttribute( name ) ) {
                return;
            }
            component.setAttribute( name, value );
        } )
    }
}
</script>
{ #if isWebComponents }
<slot />
{ :else }
<div { ...attributes } { ...$$restProps }>
    <slot />
</div>
{ /if }
