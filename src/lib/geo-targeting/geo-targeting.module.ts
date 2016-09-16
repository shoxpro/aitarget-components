/* tslint:disable:max-line-length */
import { NgModule } from '@angular/core';
import { CoreModule } from '../core.module';
import { GeoTargetingComponent } from './geo-targeting.component';
/* tslint:enable:max-line-length */

@NgModule({
  imports:      [
    CoreModule
  ],
  declarations: [
    GeoTargetingComponent
  ],
  exports:      [
    GeoTargetingComponent
  ]
})
export class GeoTargetingModule {
}
