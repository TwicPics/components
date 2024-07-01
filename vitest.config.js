// vitest.config.js
import { defineConfig } from 'vitest/config';

export default defineConfig( {
    "test": {
        "environment": `jsdom`,
        "poolOptions": {
            "threads": {
                "maxThreads": 3,
                "minThreads": 1,
            },
        },
        "fileParallelism": true,
    },
} );
