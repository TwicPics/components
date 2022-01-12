import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";

import { AppModule } from "./app/app.module";

platformBrowserDynamic().bootstrapModule( AppModule )
    // eslint-disable-next-line no-console
    .catch( ( err: unknown ) => console.error( err ) );
