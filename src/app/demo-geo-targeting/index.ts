import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DemoGeoTargetingComponent } from './demo-geo-targeting.component';
import { routes } from './demo-geo-targeting.routing';
import { GeoTargetingModule } from '../../lib/geo-targeting/geo-targeting.module';
import { AppSharedModule } from '../shared/index';
import { CoreModule } from '../../lib/core.module';

@NgModule({
  imports:      [
    CoreModule,
    CommonModule,
    GeoTargetingModule,
    AppSharedModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    DemoGeoTargetingComponent
  ]
})

export class DemoGeoTargetingModule {
}

