import { NgModule } from '@angular/core';
import { TargetingComponent } from './targeting.component';
import { TargetingFormComponent } from './targeting-form/targeting-form.component';
import { CoreModule } from '../core.module';
import { GeoTargetingModule } from '../geo-targeting/geo-targeting.module';
import { AppSharedModule } from '../../app/shared/index';
import { TargetingFormAddComponent } from './targeting-form/targeting-form-add.comonent';
import { TargetingFormArrayComponent } from './targeting-form/targeting-form-array.component';
import { DynamicComponentModule } from 'ng-dynamic';
import { DetailedTargetingModule } from '../detailed-targeting/detailed-targeting.module';

@NgModule({
  imports:      [
    CoreModule,
    AppSharedModule,
    DynamicComponentModule.forRoot({
      imports: [CoreModule, GeoTargetingModule, DetailedTargetingModule]
    }),
  ],
  declarations: [
    TargetingComponent,
    TargetingFormComponent,
    TargetingFormAddComponent,
    TargetingFormArrayComponent
  ],
  exports:      [
    TargetingComponent
  ]
})
export class TargetingModule {
}
