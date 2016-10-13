/* tslint:disable:no-unused-variable */

import { TestBed } from '@angular/core/testing';
import { GeoTargetingMapPopupComponent } from './geo-targeting-map-popup.component';

fdescribe('Component: GeoTargetingMapPopup', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:   [],
      providers: []
    });
  });

  it('should create an instance', () => {
    let fixture = TestBed.createComponent(GeoTargetingMapPopupComponent);
    let app     = fixture.debugElement.componentInstance;
    expect(app)
      .toBeTruthy();
  });
});
