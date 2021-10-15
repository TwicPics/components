import type { Attributes as BaseAttributes, OptionalString } from "../_/types";
import Component from "./factory.svelte";
import type { SvelteComponentTyped } from "svelte";

export interface Attributes extends BaseAttributes {
    class?: OptionalString,
}

export default Component as unknown as
    ( ( tagName: `img` | `video` ) => SvelteComponentTyped< Attributes, undefined, undefined > );
