import { ReactiveFormsModule } from '@angular/forms';
import { PreloadAllModules, RouterModule } from '@angular/router';
import { MaterialModule } from '@angular/material';
import { RouterStoreModule } from '@ngrx/router-store';
import { routes } from './app.routing';
import { LibModule } from '../lib/lib.module';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AppSharedModule } from './shared/index';

export const APP_IMPORTS = [
  MaterialModule.forRoot(),
  ReactiveFormsModule,
  RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules}),
  RouterStoreModule.connectRouter(),
  StoreDevtoolsModule.instrumentOnlyWithExtension(),
  AppSharedModule,
  LibModule
];

