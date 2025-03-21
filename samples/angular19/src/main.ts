import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

bootstrapApplication( AppComponent, appConfig )
    // eslint-disable-next-line no-console
    .catch( err => console.error( err ) );
