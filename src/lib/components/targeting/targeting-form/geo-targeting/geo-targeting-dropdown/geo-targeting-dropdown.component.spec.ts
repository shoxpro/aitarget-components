/* tslint:disable:no-unused-variable */

import { TestBed } from '@angular/core/testing';
import { GeoTargetingDropdownComponent } from './geo-targeting-dropdown.component';
import { FullTypePipe } from '../full-type.pipe';
import { FullNamePipe } from '../full-name.pipe';
import { GeoTargetingService } from '../geo-targeting.service';
import { TranslateService } from 'ng2-translate';

describe('Component: GeoTargetingDropdown', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:      [],
      declarations: [GeoTargetingDropdownComponent,
        FullTypePipe, FullNamePipe],
      providers:    [
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
