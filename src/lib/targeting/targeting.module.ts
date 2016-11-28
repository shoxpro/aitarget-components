import { NgModule } from '@angular/core';
import { TargetingComponent } from './targeting.component';
import { TargetingFormComponent } from './targeting-form/targeting-form.component';
import { CoreModule } from '../core.module';
import { GeoTargetingModule } from '../geo-targeting/geo-targeting.module';
import { AppSharedModule } from '../../app/shared/index';

@NgModule({
  imports:      [
    CoreModule,
    AppSharedModule,
    GeoTargetingModule
  ],
  declarations: [
    TargetingComponent,
    TargetingFormComponent
  ],
  exports:      [
    TargetingComponent
  ]
})
export class TargetingModule {
}
