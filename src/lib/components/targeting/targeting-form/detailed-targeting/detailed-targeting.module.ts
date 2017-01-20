import { NgModule } from '@angular/core';
import { DetailedTargetingComponent } from './detailed-targeting.component';
import { SharedModule } from '../../../../shared/shared.module';
import { DetailedModule } from './detailed/detailed.module';
import { DetailedTargetingLegendComponent } from './detailed-targeting-legend.component';
import { DetailedTargetingControlsComponent } from './detailed-targeting-controls.component';

@NgModule({
  imports:      [
    SharedModule,
    DetailedModule
  ],
  declarations: [
    DetailedTargetingComponent,
    DetailedTargetingLegendComponent,
    DetailedTargetingControlsComponent
  ],
  exports:      [
    DetailedTargetingComponent
  ]
})
export class DetailedTargetingModule {
}
