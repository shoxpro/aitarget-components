/* tslint:disable:no-unused-variable */

import { TestBed } from '@angular/core/testing';
import { LibModule } from '../../lib.module';
import { GeoTargetingMapComponent } from './geo-targeting-map.component';

describe('Component: GeoTargetingMap', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:   [LibModule],
      providers: []
    });
  });

  it('should create an instance', () => {
    let fixture = TestBed.createComponent(GeoTargetingMapComponent);
    let app     = fixture.debugElement.componentInstance;
    expect(app)
      .toBeTruthy();
  });
});
