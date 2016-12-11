import { NgModule, enableProdMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { SdkService } from './shared/sdk/sdk.service';
import { environment } from '../environments/environment';
import { StoreModule } from '@ngrx/store';
import { rootReducer } from '../app/reducers/index';
import { SharedActions } from './shared/actions/index';
import { TargetingModule } from './components/targeting/targeting.module';

if (environment.production) {
  enableProdMode();
}

@NgModule({
  declarations: [],
  imports:      [
    BrowserModule,
    StoreModule.provideStore(rootReducer),
    TargetingModule
  ],
  providers:    [SdkService, SharedActions],
  exports:      [BrowserModule, TargetingModule]
})
export class LibModule {
}
