import { NgModule } from '@angular/core';
import { TargetingComponent } from './targeting.component';
import { TargetingFormComponent } from './targeting-form/targeting-form.component';
import { GeoTargetingModule } from '../geo-targeting/geo-targeting.module';
import { TargetingFormAddComponent } from './targeting-form/targeting-form-add.comonent';
import { TargetingFormArrayComponent } from './targeting-form/targeting-form-array.component';
import { DetailedTargetingModule } from '../detailed-targeting/detailed-targeting.module';
import { SharedModule } from '../shared/shared.module';
import { CoreModule } from '../core.module';
import { DynamicComponentModule } from 'ng-dynamic';
import { ControlSqueezeComponent } from '../shared/components/control-squeeze.component';

@NgModule({
  imports:      [
    SharedModule,
    DetailedTargetingModule,
    GeoTargetingModule,
    DynamicComponentModule.forRoot({
      imports: [GeoTargetingModule, CoreModule]
    })
  ],
  declarations: [
    TargetingComponent,
    TargetingFormComponent,
    TargetingFormAddComponent,
    TargetingFormArrayComponent,
    ControlSqueezeComponent
  ],
  exports:      [
    TargetingComponent,
    GeoTargetingModule,
    DetailedTargetingModule
  ]
})
export class TargetingModule {
}
