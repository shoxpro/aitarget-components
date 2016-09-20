/* tslint:disable:no-unused-variable */

import { TestBed } from '@angular/core/testing';
import { LibModule } from '../../lib.module';
import { GeoTargetingInputComponent } from './geo-targeting-input.component';
import { GeoTargetingApiService } from '../geo-targeting-api/geo-targeting-api.service';
import { GeoTargetingInputService } from './geo-targeting-input.service';

describe('Component: GeoTargetingInput', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [LibModule],
      providers: [GeoTargetingApiService, GeoTargetingInputService]
    });
  });

  it('should create an instance', () => {
    let fixture = TestBed.createComponent(GeoTargetingInputComponent);
    let app     = fixture.debugElement.componentInstance;
    expect(app)
      .toBeTruthy();
  });
});
