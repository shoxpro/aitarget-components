/* tslint:disable:max-line-length */
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { routes } from './demo-shared.routing.ts';
import { AppSharedModule } from '../shared/index';
import { DemoSharedComponent } from './demo-shared.component.ts';

/* tslint:enable:max-line-length */

// noinspection JSUnusedGlobalSymbolsP
@NgModule({
  imports:      [
    AppSharedModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    DemoSharedComponent
  ]
})

export class DemoSharedModule {}

