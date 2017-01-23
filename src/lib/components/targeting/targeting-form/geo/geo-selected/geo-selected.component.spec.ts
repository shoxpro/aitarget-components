/* tslint:disable:no-unused-variable */
import { TestBed } from '@angular/core/testing';
import { GeoSelectedService } from './geo-selected.service';
import { GeoSelectedComponent } from './geo-selected.component';
import { GeoMapService } from '../geo-map/geo-map.service';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FullNamePipe } from '../full-name.pipe';
import { GeoSearchService } from '../geo-search/geo-search.service';
import { Store } from '@ngrx/store';

xdescribe('Component: GeoSelected', () => {
  beforeEach(() => {
    // noinspection ReservedWordAsName
    TestBed.configureTestingModule({
      imports:      [],
      declarations: [
        GeoSelectedComponent,
        FullNamePipe
      ],
      providers:    [
        {provide: Store, useValue: {let () { return; }}},
        {provide: GeoSelectedService, useValue: {}},
        {provide: GeoSearchService, useValue: {}},
        {provide: GeoMapService, useValue: {}}
      ],
      schemas:      [CUSTOM_ELEMENTS_SCHEMA]
    });
  });

  it('should create an instance', () => {
    let fixture = TestBed.createComponent(GeoSelectedComponent);
    let app     = fixture.debugElement.componentInstance;
    expect(app)
      .toBeTruthy();
  });
});
