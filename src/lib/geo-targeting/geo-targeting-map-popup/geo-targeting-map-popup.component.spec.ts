/* tslint:disable:no-unused-variable */

import { TestBed } from '@angular/core/testing';
import { GeoTargetingMapPopupComponent } from './geo-targeting-map-popup.component';
import { GeoTargetingModule } from '../geo-targeting.module';
import { GeoTargetingSelectedService } from '../geo-targeting-selected/geo-targeting-selected.service.new';

describe('Component: GeoTargetingMapPopup', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:      [GeoTargetingModule],
      providers:    [{provide: GeoTargetingSelectedService, useValue: {}}],
      declarations: []
    });
  });

  it('should create an instance', () => {
    let fixture = TestBed.createComponent(GeoTargetingMapPopupComponent);
    let app     = fixture.debugElement.componentInstance;
    expect(app)
      .toBeTruthy();
  });
});
