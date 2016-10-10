/* tslint:disable:no-unused-variable */

import { TestBed } from '@angular/core/testing';
import { GeoTargetingMapControlsComponent } from './geo-targeting-map-controls.component';
import { LibModule } from '../../lib.module';

describe('Component: GeoTargetingMapControls', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:   [LibModule],
      providers: []
    });
  });

  it('should create an instance', () => {
    let fixture = TestBed.createComponent(GeoTargetingMapControlsComponent);
    let app     = fixture.debugElement.componentInstance;
    expect(app)
      .toBeTruthy();
  });
});
