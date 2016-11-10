import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, PreloadAllModules } from '@angular/router';
import { MaterialModule } from '@angular/material';
import { RouterStoreModule } from '@ngrx/router-store';
import { routes } from './app.routing';
import { LibModule } from '../lib/lib.module';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

export const APP_IMPORTS = [
  MaterialModule.forRoot(),
  ReactiveFormsModule,
  RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules}),
  RouterStoreModule.connectRouter(),
  StoreDevtoolsModule.instrumentOnlyWithExtension(),
  LibModule,
];

