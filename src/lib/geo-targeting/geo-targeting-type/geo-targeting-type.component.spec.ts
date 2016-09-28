/* tslint:disable:no-unused-variable */

import { TestBed } from '@angular/core/testing';
import { GeoTargetingTypeComponent } from './geo-targeting-type.component';
import { LibModule } from '../../lib.module';

describe('Component: GeoTargetingType', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:   [LibModule],
      providers: []
    });
  });

  it('should create an instance', () => {
    let fixture = TestBed.createComponent(GeoTargetingTypeComponent);
    let app     = fixture.debugElement.componentInstance;
    expect(app)
      .toBeTruthy();
  });
});
