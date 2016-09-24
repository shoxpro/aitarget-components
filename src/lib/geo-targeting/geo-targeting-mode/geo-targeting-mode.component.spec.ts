/* tslint:disable:no-unused-variable */

import { TestBed } from '@angular/core/testing';
import { LibModule } from '../../lib.module';
import { GeoTargetingModeService } from './geo-targeting-mode.service';
import { GeoTargetingModeComponent } from './geo-targeting-mode.component';

describe('Component: GeoTargetingMode', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:   [LibModule],
      providers: [GeoTargetingModeService]
    });
  });

  it('should create an instance', () => {
    let fixture = TestBed.createComponent(GeoTargetingModeComponent);
    let app     = fixture.debugElement.componentInstance;
    expect(app)
      .toBeTruthy();
  });
});
