import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { routes } from './demo-detailed-targeting.routing';
import { DemoDetailedTargetingComponent } from './demo-detailed-targeting.component';
import { DetailedTargetingModule } from '../../lib/detailed-targeting/detailed-targeting.module';
import { AppSharedModule } from '../shared/index';

// noinspection JSUnusedGlobalSymbols
@NgModule({
  imports:      [
    AppSharedModule,
    DetailedTargetingModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    DemoDetailedTargetingComponent
  ]
})

export class DemoDetailedTargetingModule {
}

