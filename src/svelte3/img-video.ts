import type { Attributes as BaseAttributes } from "../_/types";
import Component from "./img-video.svelte";
import type { ComponentType, SvelteComponentTyped } from "svelte";

export interface Attributes extends BaseAttributes {
    class?: string,
}

export default Component as unknown as
    ( ( tagName: `img` | `video` ) => ComponentType < SvelteComponentTyped< Attributes > > );

