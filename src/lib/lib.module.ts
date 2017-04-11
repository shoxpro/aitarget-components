/* tslint:disable:max-line-length */
import { enableProdMode, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { SdkService } from './shared/sdk/sdk.service';
import { environment } from '../environments/environment';
import { StoreModule } from '@ngrx/store';
import { rootReducer } from '../app/reducers/index';
import { SharedActions } from './shared/actions/index';
import { TargetingModule } from './components/targeting/targeting.module';
import { UpgradeModule } from '@angular/upgrade/src/aot/upgrade_module';
import { LocalizationComponent } from './shared/components/localization.component';
import { GeoWrapperComponent } from './components/targeting/targeting-form/geo/geo-wrapper.component';
import { DetailedTargetingWrapperComponent } from './components/targeting/targeting-form/detailed-targeting/detailed-targeting-wrapper.component';
import { FilteringModule } from './components/filtering/filtering.module';
import { FilteringComponent } from './components/filtering/filtering.component';
/* tslint:enable:max-line-length */

if (environment.production) {
  enableProdMode();
}

@NgModule({
  declarations:    [],
  imports:         [
    BrowserModule,
    UpgradeModule,
    StoreModule.provideStore(rootReducer),
    TargetingModule,
    FilteringModule
  ],
  providers:       [SdkService, SharedActions],
  entryComponents: [GeoWrapperComponent, DetailedTargetingWrapperComponent, LocalizationComponent, FilteringComponent],
  exports:         [BrowserModule, TargetingModule, FilteringModule]
})
export class LibModule {
  ngDoBootstrap () { return; }
}
