import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DemoGeoTargetingComponent } from './demo-geo-targeting.component';
import { routes } from './demo-geo-targeting.routing';
import { GeoTargetingModule } from '../../lib/geo-targeting/geo-targeting.module';

@NgModule({
  imports:      [
    CommonModule,
    GeoTargetingModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    DemoGeoTargetingComponent
  ]
})

export class DemoGeoTargetingModule {
}

