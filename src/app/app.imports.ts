import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, PreloadAllModules } from '@angular/router';
import { MaterialModule } from '@angular/material';
import { EffectsModule } from '@ngrx/effects';
import { RouterStoreModule } from '@ngrx/router-store';
import { routes } from './app.routing';
import { StoreDevToolsModule } from './features/store-devtools.module';
import { UserEffects } from './user/user.effects';
import { LibModule } from '../lib/lib.module';

export const APP_IMPORTS = [
  EffectsModule.run(UserEffects),
  MaterialModule.forRoot(),
  ReactiveFormsModule,
  RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules}),
  RouterStoreModule.connectRouter(),
  StoreDevToolsModule,
  LibModule
];

