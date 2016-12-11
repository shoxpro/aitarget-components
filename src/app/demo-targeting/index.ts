import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { routes } from './demo-targeting.routing';
import { DemoTargetingComponent } from './demo-targeting.component';
import { TargetingModule } from '../../lib/components/targeting/targeting.module';
import { AppSharedModule } from '../shared/index';

// noinspection JSUnusedGlobalSymbols
@NgModule({
  imports:      [
    AppSharedModule,
    TargetingModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    DemoTargetingComponent
  ]
})
export class DemoTargetingModule {
}

