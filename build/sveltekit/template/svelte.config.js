import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/kit/vite';

/** @type {import('@sveltejs/kit').Config} */
const config = {
    // consult https://kit.svelte.dev/docs/integrations#preprocessors
    // for more information about preprocessors
    "preprocess": vitePreprocess(),

    "kit": {
        "adapter": adapter(),
    },
    "package": {},
};

export default config;
