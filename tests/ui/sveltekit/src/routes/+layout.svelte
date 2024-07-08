<script>
import { installTwicPics } from "@twicpics/components/sveltekit";
import "@twicpics/components/style.css";
import config from '../../../_/config';
import "../../../_/sample.css";

installTwicPics( config );

</script>
<slot></slot>
