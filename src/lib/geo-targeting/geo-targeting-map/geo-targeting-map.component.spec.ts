/* tslint:disable:no-unused-variable */

import { TestBed } from '@angular/core/testing';
import { GeoTargetingMapComponent } from './geo-targeting-map.component';
import { TranslateService, TranslatePipe } from 'ng2-translate/ng2-translate';
import { ComponentsHelperService } from '../../shared/services/components-helper.service';
import { GeoTargetingMapService } from './geo-targeting-map.service';
import { Store } from '@ngrx/store';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

xdescribe('Component: GeoTargetingMap', () => {
  beforeEach(() => {
    // noinspection ReservedWordAsName
    TestBed.configureTestingModule({
      imports:      [],
      declarations: [
        GeoTargetingMapComponent,
        TranslatePipe
      ],
      providers:    [
        {provide: Store, useValue: {let () {}}},
        {provide: GeoTargetingMapService, useValue: {}},
        {provide: TranslateService, useValue: {instant () {}}},
        {provide: ComponentsHelperService, useValue: {setRootViewContainerRef () {}}},
      ],
      schemas:      [CUSTOM_ELEMENTS_SCHEMA]
    });
  });

  it('should create an instance', () => {
    let fixture = TestBed.createComponent(GeoTargetingMapComponent);
    let app     = fixture.debugElement.componentInstance;
    expect(app)
      .toBeTruthy();
  });
});
