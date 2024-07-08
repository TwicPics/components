import { installTwicpics } from "@twicpics/components/svelte5";
import { mount } from 'svelte';
import Sample from "./Sample.svelte";
import "@twicpics/components/style.css";
import config from '../../_/config';
import "../../_/sample.css";

installTwicpics( config );

const app = mount( Sample, {
    "target": document.body,
} );

export default app;
