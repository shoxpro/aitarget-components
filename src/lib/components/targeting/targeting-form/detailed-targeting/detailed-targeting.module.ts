import { NgModule } from '@angular/core';
import { DetailedTargetingComponent } from './detailed-targeting.component';
import { SharedModule } from '../../../../shared/shared.module';
import { DetailedModule } from './detailed/detailed.module';
import { DetailedTargetingLegendComponent } from './detailed-targeting-legend.component';

@NgModule({
  imports:      [
    SharedModule,
    DetailedModule
  ],
  declarations: [
    DetailedTargetingComponent,
    DetailedTargetingLegendComponent
  ],
  exports:      [
    DetailedTargetingComponent
  ]
})
export class DetailedTargetingModule {
}
