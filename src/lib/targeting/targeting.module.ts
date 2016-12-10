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
import { TargetingAudiences } from './targeting-audiences/targeting-audiences.component';
import { AudienceComponent } from './audience/audience.component';
import { MdSliderModule } from '@angular/material';
import { GenderComponent } from '../gender/gender';
import { AgeComponent } from '../age/age.component';
import { LocalesModule } from '../locales/locales.module';

@NgModule({
  imports:      [
    SharedModule,
    DetailedTargetingModule,
    GeoTargetingModule,
    LocalesModule,
    DynamicComponentModule.forRoot({
      imports: [GeoTargetingModule, CoreModule]
    }),
    MdSliderModule.forRoot()
  ],
  declarations: [
    TargetingComponent,
    TargetingFormComponent,
    TargetingFormAddComponent,
    TargetingFormArrayComponent,
    TargetingAudiences,
    ControlSqueezeComponent,
    AudienceComponent,
    GenderComponent,
    AgeComponent
  ],
  exports:      [
    TargetingComponent,
    GeoTargetingModule,
    DetailedTargetingModule
  ]
})
export class TargetingModule {
}
