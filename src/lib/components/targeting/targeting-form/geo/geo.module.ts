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
import { TickComponent } from '../../../../shared/components/tick.component';
import { ArrowDropComponent } from '../../../../shared/components/arrow-drop.component';
import { GeoTypeComponent } from './geo-type/geo-type.component';
import { FbDropdownListComponent } from '../../../../shared/components/dropdown-list/dropdown-list.component';
import { GeoInfoIconComponent } from './geo-info/geo-info-icon';
import { GeoSearchComponent } from './geo-search/geo-search.component';
import { PreloaderDotsComponent } from '../../../../shared/components/preloader-dots.component';
import { SharedModule } from '../../../../shared/shared.module';
import { GeoWrapperComponent } from './geo-wrapper.component';
/* tslint:enable:max-line-length */

@NgModule({
  imports:      [
    SharedModule,
    MdSliderModule.forRoot()
  ],
  declarations: [
    GeoComponent,
    GeoWrapperComponent,
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
    TickComponent,
    ArrowDropComponent,
    GeoMapPopupComponent,
    GeoTypeComponent,
    FbDropdownListComponent,
    GeoInfoIconComponent,
    PreloaderDotsComponent
  ],
  exports:      [
    GeoComponent,
    GeoWrapperComponent,
    GeoPinComponent
  ]
})
export class GeoModule {
}
