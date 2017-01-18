import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DemoGeoComponent } from './demo-geo.component';
import { routes } from './demo-geo.routing';
import { GeoModule } from '../../lib/components/targeting/targeting-form/geo/geo.module';
import { AppSharedModule } from '../shared/index';

@NgModule({
  imports:      [
    AppSharedModule,
    GeoModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    DemoGeoComponent
  ]
})

export class DemoGeoModule {
}

