/* tslint:disable:no-unused-variable */

import { TestBed } from '@angular/core/testing';
import { GeoTargetingComponent } from './geo-targeting.component';
import { LibModule } from '../lib.module';

describe('Component: GeoTargeting', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [LibModule]
    });
  });

  it('should create an instance', () => {
    let fixture = TestBed.createComponent(GeoTargetingComponent);
    let app     = fixture.debugElement.componentInstance;
    expect(app)
      .toBeTruthy();
  });
});
