/* tslint:disable:no-unused-variable */

import { TestBed } from '@angular/core/testing';
import { GeoTargetingModeDropdownComponent } from './geo-targeting-mode-dropdown.component';
import { GeoTargetingModule } from '../geo-targeting.module';

describe('Component: GeoTargetingModeDropdown', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:      [GeoTargetingModule],
      providers:    [],
      declarations: []
    });
  });

  it('should create an instance', () => {
    let fixture = TestBed.createComponent(GeoTargetingModeDropdownComponent);
    let app     = fixture.debugElement.componentInstance;
    expect(app)
      .toBeTruthy();
  });
});
