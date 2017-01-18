import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DemoGeoTargetingComponent } from './demo-geo-targeting.component';
import { routes } from './demo-geo-targeting.routing';
import { GeoTargetingModule } from '../../lib/components/targeting/targeting-form/geo-targeting/geo-targeting.module';
import { AppSharedModule } from '../shared/index';

@NgModule({
  imports:      [
    AppSharedModule,
    GeoTargetingModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    DemoGeoTargetingComponent
  ]
})

export class DemoGeoTargetingModule {
}

