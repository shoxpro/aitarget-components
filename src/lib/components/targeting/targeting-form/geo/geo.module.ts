/* tslint:disable:max-line-length */
import { NgModule } from '@angular/core';
import { GeoComponent } from './geo.component';
import { GeoSelectedComponent } from './geo-selected/geo-selected.component';
import { GeoInputComponent } from './geo-input/geo-input.component';
import { GeoDropdownComponent } from './geo-dropdown/geo-dropdown.component';
import { GeoMapComponent } from './geo-map/geo-map.component';
import { FullNamePipe } from './full-name.pipe';
import { GeoInfoComponent } from './geo-info/geo-info.component';
import { GeoPinComponent } from './geo-pin/geo-pin.component';
import { GeoModeComponent } from './geo-mode/geo-mode.component';
import { GeoRadiusComponent } from './geo-radius/geo-radius.component';
import { MdSliderModule } from '@angular/material/slider';
import { GeoLocationTypeComponent } from './geo-location-type/geo-location-type.component';
import { GeoMapControlsComponent } from './geo-map-controls/geo-map-controls.component';
import { GeoMapPopupComponent } from './geo-map-popup/geo-map-popup.component';
import { FullTypePipe } from './full-type.pipe';
import { FbTickComponent } from '../../../../shared/components/fb-tick.component';
import { FbArrowDropComponent } from '../../../../shared/components/fb-arrow-drop.component';
import { GeoTypeComponent } from './geo-type/geo-type.component';
import { FbDropdownListComponent } from '../../../../shared/components/fb-dropdown-list/fb-dropdown-list.component';
import { GeoInfoIconComponent } from './geo-info/geo-info-icon';
import { GeoSearchComponent } from './geo-search/geo-search.component';
import { FbPreloaderDotsComponent } from '../../../../shared/components/fb-preloader-dots.component';
import { SharedModule } from '../../../../shared/shared.module';
/* tslint:enable:max-line-length */

@NgModule({
  imports:      [
    SharedModule,
    MdSliderModule.forRoot()
  ],
  declarations: [
    GeoComponent,
    GeoSelectedComponent,
    GeoSearchComponent,
    GeoInputComponent,
    GeoDropdownComponent,
    GeoMapComponent,
    GeoInfoComponent,
    GeoPinComponent,
    GeoModeComponent,
    GeoRadiusComponent,
    GeoLocationTypeComponent,
    GeoMapControlsComponent,
    FullNamePipe,
    FullTypePipe,
    FbTickComponent,
    FbArrowDropComponent,
    GeoMapPopupComponent,
    GeoTypeComponent,
    FbDropdownListComponent,
    GeoInfoIconComponent,
    FbPreloaderDotsComponent
  ],
  exports:      [
    GeoComponent,
    GeoPinComponent
  ]
})
export class GeoModule {
}
