
// eslint-disable-next-line no-undef
import config from '../_/config';
export default defineNuxtConfig( {
    "modules": [ `@twicpics/components/nuxt3` ],
    "twicpics": config,
    "css": [
      '@/styles.css'
    ],
} );
