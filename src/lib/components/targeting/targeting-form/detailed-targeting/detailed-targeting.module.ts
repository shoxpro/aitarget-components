import { NgModule } from '@angular/core';
import { DetailedTargetingComponent } from './detailed-targeting.component';
import { SharedModule } from '../../../../shared/shared.module';
import { DetailedModule } from './detailed/detailed.module';

@NgModule({
  imports:      [
    SharedModule,
    DetailedModule
  ],
  declarations: [
    DetailedTargetingComponent
  ],
  exports:      [
    DetailedTargetingComponent
  ]
})
export class DetailedTargetingModule {
}
