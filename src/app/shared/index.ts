import { NgModule } from '@angular/core';
import { CloseComponent } from '../../lib/shared/components/fba-close.component';
import { SpecComponent } from './components/spec.component';
import { SharedModule } from '../../lib/shared/shared.module';
import { CommonModule } from '@angular/common';

@NgModule({
  imports:      [
    CommonModule,
    SharedModule
  ],
  declarations: [
    SpecComponent,
    CloseComponent
  ],
  exports:      [
    SpecComponent,
    CloseComponent,
    SharedModule
  ]
})
export class AppSharedModule {
}
