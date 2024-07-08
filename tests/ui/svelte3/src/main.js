import { installTwicpics } from "@twicpics/components/svelte3";
import Sample from "./Sample.svelte";
import "@twicpics/components/style.css";
import "../../_/sample.css";
import config from '../../_/config';

installTwicpics( config );

export default new Sample( {
    "target": document.body,
} );
