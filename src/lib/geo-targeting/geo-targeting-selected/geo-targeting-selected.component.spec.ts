/* tslint:disable:no-unused-variable */

import { TestBed } from '@angular/core/testing';
import { GeoTargetingSelectedService } from './geo-targeting-selected.service';
import { GeoTargetingSelectedComponent } from './geo-targeting-selected.component';
import { GeoTargetingMapService } from '../geo-targeting-map/geo-targeting-map.service';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FullNamePipe } from '../full-name.pipe';
import { GeoTargetingSearchService } from '../geo-targeting-search/geo-targeting-search.service';
import { Store } from '@ngrx/store';

xdescribe('Component: GeoTargetingSelected', () => {
  beforeEach(() => {
    // noinspection ReservedWordAsName
    TestBed.configureTestingModule({
      imports:      [],
      declarations: [
        GeoTargetingSelectedComponent,
        FullNamePipe
      ],
      providers:    [
        {provide: Store, useValue: {let () {}}},
        {provide: GeoTargetingSelectedService, useValue: {}},
        {provide: GeoTargetingSearchService, useValue: {}},
        {provide: GeoTargetingMapService, useValue: {}}
      ],
      schemas:      [CUSTOM_ELEMENTS_SCHEMA]
    });
  });

  it('should create an instance', () => {
    let fixture = TestBed.createComponent(GeoTargetingSelectedComponent);
    let app     = fixture.debugElement.componentInstance;
    expect(app)
      .toBeTruthy();
  });
});
