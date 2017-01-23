import { NgModule } from '@angular/core';
import { DetailedTargetingComponent } from './detailed-targeting.component';
import { SharedModule } from '../../../../shared/shared.module';
import { DetailedModule } from './detailed/detailed.module';
import { DetailedTargetingLegendComponent } from './detailed-targeting-legend.component';
import { DetailedTargetingControlsComponent } from './detailed-targeting-controls.component';
import { DetailedTargetingWrapperComponent } from './detailed-targeting-wrapper.component';

@NgModule({
  imports:      [
    SharedModule,
    DetailedModule
  ],
  declarations: [
    DetailedTargetingComponent,
    DetailedTargetingWrapperComponent,
    DetailedTargetingLegendComponent,
    DetailedTargetingControlsComponent
  ],
  exports:      [
    DetailedTargetingComponent,
    DetailedTargetingWrapperComponent
  ]
})
export class DetailedTargetingModule {
}
