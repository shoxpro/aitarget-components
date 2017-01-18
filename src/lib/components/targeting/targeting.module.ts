import { NgModule } from '@angular/core';
import { TargetingComponent } from './targeting.component';
import { TargetingFormComponent } from './targeting-form/targeting-form.component';
import { GeoModule } from './targeting-form/geo/geo.module';
import { TargetingFormAddComponent } from './targeting-form/targeting-form-add.comonent';
import { TargetingFormArrayComponent } from './targeting-form/targeting-form-array.component';
import { DetailedTargetingModule } from './targeting-form/detailed-targeting/detailed-targeting.module';
import { SharedModule } from '../../shared/shared.module';
import { CoreModule } from '../../core.module';
import { DynamicComponentModule } from 'ng-dynamic';
import { ControlSqueezeComponent } from '../../shared/components/control-squeeze.component';
import { TargetingAudiences } from './targeting-audiences/targeting-audiences.component';
import { AudienceComponent } from './audience/audience.component';
import { MdSliderModule } from '@angular/material';
import { GenderComponent } from './targeting-form/gender/gender';
import { AgeComponent } from './targeting-form/age/age.component';
import { LocalesModule } from './targeting-form/locales/locales.module';

@NgModule({
  imports:      [
    SharedModule,
    DetailedTargetingModule,
    GeoModule,
    LocalesModule,
    DynamicComponentModule.forRoot({
      imports: [GeoModule, CoreModule]
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
    GeoModule,
    DetailedTargetingModule
  ]
})
export class TargetingModule {
}
