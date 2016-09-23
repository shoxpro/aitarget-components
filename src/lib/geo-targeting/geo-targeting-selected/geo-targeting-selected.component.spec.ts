/* tslint:disable:no-unused-variable */

import { TestBed } from '@angular/core/testing';
import { GeoTargetingSelectedService } from './geo-targeting-selected.service';
import { GeoTargetingSelectedComponent } from './geo-targeting-selected.component';
import { LibModule } from '../../lib.module';

describe('Component: GeoTargetingSelected', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:   [LibModule],
      providers: [GeoTargetingSelectedService]
    });
  });

  it('should create an instance', () => {
    let fixture = TestBed.createComponent(GeoTargetingSelectedComponent);
    let app     = fixture.debugElement.componentInstance;
    expect(app)
      .toBeTruthy();
  });
});