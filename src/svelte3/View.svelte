<svelte:options tag={null}/>
<script context="module" lang="ts">
import { computeViewAttributes } from "../_/compute";
import { isBrowser, isWebComponents } from "../_/utils";
import { get_current_component, onMount } from "svelte/internal";
</script>
<script lang="ts">
const component = get_current_component();
const attributes = computeViewAttributes();
if ( isBrowser && isWebComponents ) {
    onMount( () => {
        const { mode, host} = component.shadowRoot;
        if ( mode === `closed` ) {
            throw new Error( `cannot use TwicPics components in closed ShadowRoot` );
        }
        Object.entries( attributes || [] ).forEach( ( [ name, value ] ) => {
            if ( host.hasAttribute( name ) ) {
                return;
            }
            host.setAttribute( name, value );
        } );
    } );
}
</script>
{ #if isWebComponents }
<slot />
{ :else }
<div { ...attributes } { ...$$restProps }>
    <slot />
</div>
{ /if }
