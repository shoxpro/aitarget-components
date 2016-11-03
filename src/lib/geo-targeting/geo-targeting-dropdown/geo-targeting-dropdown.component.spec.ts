/* tslint:disable:no-unused-variable */

import { TestBed } from '@angular/core/testing';
import { GeoTargetingDropdownComponent } from './geo-targeting-dropdown.component';
import { FullTypePipe } from '../full-type.pipe';
import { FullNamePipe } from '../full-name.pipe';
import { GeoTargetingDropdownService } from './geo-targeting-dropdown.service';
import { GeoTargetingSelectedService } from '../geo-targeting-selected/geo-targeting-selected.service.new';
import { GeoTargetingModeService } from '../geo-targeting-mode/geo-targeting-mode.service';
import { GeoTargetingService } from '../geo-targeting.service';
import { TranslateService } from 'ng2-translate/ng2-translate';

describe('Component: GeoTargetingDropdown', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:      [],
      declarations: [GeoTargetingDropdownComponent,
        FullTypePipe, FullNamePipe],
      providers:    [
        {provide: GeoTargetingDropdownService, useValue: {}},
        {provide: GeoTargetingSelectedService, useValue: {}},
        {provide: GeoTargetingModeService, useValue: {}},
        {provide: GeoTargetingService, useValue: {}},
        {provide: TranslateService, useValue: {}},
      ]
    });
  });

  it('should create an instance', () => {
    let fixture = TestBed.createComponent(GeoTargetingDropdownComponent);
    let app     = fixture.debugElement.componentInstance;
    expect(app)
      .toBeTruthy();
  });
});
