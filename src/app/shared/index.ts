import { NgModule } from '@angular/core';
import { SpecComponent } from './components/spec.component';
import { SharedModule } from '../../lib/shared/shared.module';
import { CommonModule } from '@angular/common';

@NgModule({
  imports:      [
    CommonModule,
    SharedModule
  ],
  declarations: [
    SpecComponent
  ],
  exports:      [
    SpecComponent,
    SharedModule
  ]
})
export class AppSharedModule {
}
