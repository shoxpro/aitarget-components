import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { routes } from './demo-targeting.routing';
import { DemoTargetingComponent } from './demo-targeting.component';
import { TargetingModule } from '../../lib/targeting/targeting.module';
import { AppSharedModule } from '../shared/index';

@NgModule({
  imports:      [
    CommonModule,
    TargetingModule,
    AppSharedModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    DemoTargetingComponent
  ]
})

export class DemoTargetingModule {
}

