
import View from "./View.svelte";
import type { ComponentType, SvelteComponentTyped } from "svelte";

export default View as unknown as
    ( () => ComponentType < SvelteComponentTyped > );
