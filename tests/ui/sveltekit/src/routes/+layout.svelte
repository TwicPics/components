<script>
import { installTwicPics } from "@twicpics/components/sveltekit";
import "@twicpics/components/style.css";
installTwicPics( {
    "domain": `https://demo.twic.it`,
    "anticipation": 0.5,
    "step": 100,
} );
</script>
<slot></slot>
