/* tslint:disable:no-unused-variable */

import { TestBed } from '@angular/core/testing';
import { GeoTargetingInputComponent } from './geo-targeting-input.component';
import { GeoTargetingSelectedService } from '../geo-targeting-selected/geo-targeting-selected.service.new';
import { FormsModule } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core';
import { GeoTargetingApiService } from '../geo-targeting-api/geo-targeting-api.service';
import { TranslateService, TranslatePipe } from 'ng2-translate/ng2-translate';
import { GeoTargetingService } from '../geo-targeting.service';
import { GeoTargetingInfoService } from '../geo-targeting-info/geo-targeting-info.service';
import { GeoTargetingDropdownService } from '../geo-targeting-dropdown/geo-targeting-dropdown.service';
import { GeoTargetingMapService } from '../geo-targeting-map/geo-targeting-map.service';
import { Store } from '@ngrx/store';
import { GeoTargetingSearchService } from '../geo-targeting-search/geo-targeting-search.service';
import { GeoTargetingModeService } from '../geo-targeting-mode/geo-targeting-mode.service';

describe('Component: GeoTargetingInput', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:      [FormsModule],
      declarations: [GeoTargetingInputComponent, GeoTargetingMapComponent, GeoTargetingModeComponent,
        TranslatePipe],
      schemas:      [CUSTOM_ELEMENTS_SCHEMA],
      providers:    [
        {provide: GeoTargetingApiService, useValue: {}},
        {provide: TranslateService, useValue: {}},
        {provide: GeoTargetingService, useValue: {}},
        {provide: GeoTargetingInfoService, useValue: {}},
        {provide: GeoTargetingDropdownService, useValue: {}},
        {provide: GeoTargetingSelectedService, useValue: {}},
        {provide: GeoTargetingMapService, useValue: {}},
        {provide: GeoTargetingSearchService, useValue: {}},
        {provide: GeoTargetingModeService, useValue: {}},
        {provide: Store, useValue: {}},
      ]
    });
  });

  it('should create an instance', () => {
    let fixture = TestBed.createComponent(GeoTargetingInputComponent);
    let app     = fixture.debugElement.componentInstance;
    expect(app)
      .toBeTruthy();
  });
});

@Component({
  selector: 'geo-targeting-mode',
  template: '<div></div>'
})
class GeoTargetingModeComponent {
}

@Component({
  selector: 'geo-targeting-map',
  template: '<div></div>'
})
class GeoTargetingMapComponent {
}
