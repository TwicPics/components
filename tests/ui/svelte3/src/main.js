import { installTwicpics } from "@twicpics/components/svelte3";
import Sample from "./Sample.svelte";
import "@twicpics/components/style.css";
import config from '../../_/config';
import "../../_/sample.css";

installTwicpics( config );

export default new Sample( {
    "target": document.body,
} );
