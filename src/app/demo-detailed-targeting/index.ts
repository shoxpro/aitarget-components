import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { routes } from './demo-detailed-targeting.routing';
import { DemoDetailedTargetingComponent } from './demo-detailed-targeting.component';
import { DetailedTargetingModule } from '../../lib/detailed-targeting/detailed-targeting.module';
import { AppSharedModule } from '../shared/index';
import { CoreModule } from '../../lib/core.module';

// noinspection JSUnusedGlobalSymbols
@NgModule({
  imports:      [
    CoreModule,
    CommonModule,
    DetailedTargetingModule,
    AppSharedModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    DemoDetailedTargetingComponent
  ]
})

export class DemoDetailedTargetingModule {
}

