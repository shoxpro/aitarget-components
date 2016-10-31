import { NgModule, enableProdMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DetailedTargetingModule } from './detailed-targeting/detailed-targeting.module';
import { TargetingSpecService } from './targeting/targeting-spec.service';
import { FbService } from './fb/fb.service';
import { environment } from '../environments/environment';
import { GeoTargetingModule } from './geo-targeting/geo-targeting.module';
import { StoreModule } from '@ngrx/store';
import { rootReducer } from '../app/reducers/index';

if (environment.production) {
  enableProdMode();
}

@NgModule({
  declarations: [],
  imports:      [
    BrowserModule,
    StoreModule.provideStore(rootReducer),
    DetailedTargetingModule,
    GeoTargetingModule
  ],
  providers:    [FbService, TargetingSpecService],
  exports:      [BrowserModule, DetailedTargetingModule, GeoTargetingModule]
})
export class LibModule {
}
