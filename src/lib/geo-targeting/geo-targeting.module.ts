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
import { MdSliderModule } from '@angular/material/slider';
import { GeoTargetingLocationTypeComponent } from './geo-targeting-location-type/geo-targeting-location-type.component';
import { GeoTargetingMapControlsComponent } from './geo-targeting-map-controls/geo-targeting-map-controls.component';
import { GeoTargetingMapPopupComponent } from './geo-targeting-map-popup/geo-targeting-map-popup.component';
import { FullTypePipe } from './full-type.pipe';
import { FbTickComponent } from '../shared/components/tick.component';
import { FbArrowDropComponent } from '../shared/components/arrow-drop.component';
import { GeoTargetingTypeComponent } from './geo-targeting-type/geo-targeting-type.component';
import { FbDropdownListComponent } from '../shared/components/fb-dropdown-list/fb-dropdown-list.component';
import { GeoTargetingInfoIconComponent } from './geo-targeting-info/geo-targeting-info-icon';
import { GeoTargetingSearchComponent } from './geo-targeting-search/geo-targeting-search.component';
/* tslint:enable:max-line-length */

@NgModule({
  imports:      [
    CoreModule,
    MdSliderModule.forRoot()
  ],
  declarations: [
    GeoTargetingComponent,
    GeoTargetingSelectedComponent,
    GeoTargetingSearchComponent,
    GeoTargetingInputComponent,
    GeoTargetingDropdownComponent,
    GeoTargetingMapComponent,
    GeoTargetingInfoComponent,
    GeoTargetingPinComponent,
    GeoTargetingModeComponent,
    GeoTargetingRadiusComponent,
    GeoTargetingLocationTypeComponent,
    GeoTargetingMapControlsComponent,
    FullNamePipe,
    FullTypePipe,
    FbTickComponent,
    FbArrowDropComponent,
    GeoTargetingMapPopupComponent,
    GeoTargetingTypeComponent,
    FbDropdownListComponent,
    GeoTargetingInfoIconComponent
  ],
  exports:      [
    GeoTargetingComponent
  ]
})
export class GeoTargetingModule {
}
