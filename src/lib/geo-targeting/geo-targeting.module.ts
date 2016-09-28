/* tslint:disable:max-line-length */
import { NgModule } from '@angular/core';
import { CoreModule } from '../core.module';
import { GeoTargetingComponent } from './geo-targeting.component';
import { GeoTargetingSelectedComponent } from './geo-targeting-selected/geo-targeting-selected.component';
import { GeoTargetingInputComponent } from './geo-targeting-input/geo-targeting-input.component';
import { GeoTargetingDropdownComponent } from './geo-targeting-dropdown/geo-targeting-dropdown.component';
import { GeoTargetingMapComponent } from './geo-targeting-map/geo-targeting-map.component';
import { FullNamePipe } from './full-name.pipe';
import { GeoTargetingInfoComponent } from './geo-targeting-info/geo-targeting-info.component';
import { GeoTargetingPinComponent } from './geo-targeting-pin/geo-targeting-pin.component';
import { GeoTargetingModeComponent } from './geo-targeting-mode/geo-targeting-mode.component';
import { GeoTargetingRadiusComponent } from './geo-targeting-radius/geo-targeting-radius.component';
import { AppendToBodyDirective } from '../shared/directives/append-to-body.directive';
import { ClickOutsideDirective } from '../shared/directives/click-outside.directive';
import { MdSliderModule } from '@angular2-material/slider';
import { FbTickComponent } from '../shared/components/tick.component';
/* tslint:enable:max-line-length */

@NgModule({
  imports:      [
    CoreModule,
    MdSliderModule.forRoot()
  ],
  declarations: [
    GeoTargetingComponent,
    GeoTargetingSelectedComponent,
    GeoTargetingInputComponent,
    GeoTargetingDropdownComponent,
    GeoTargetingMapComponent,
    GeoTargetingInfoComponent,
    GeoTargetingPinComponent,
    GeoTargetingModeComponent,
    GeoTargetingRadiusComponent,
    FullNamePipe,
    AppendToBodyDirective,
    ClickOutsideDirective,
    FbTickComponent
  ],
  exports:      [
    GeoTargetingComponent
  ]
})
export class GeoTargetingModule {
}
