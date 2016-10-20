/* tslint:disable:no-unused-variable */

import { TestBed } from '@angular/core/testing';
import { GeoTargetingMapComponent } from './geo-targeting-map.component';
import { GeoTargetingSelectedService } from '../geo-targeting-selected/geo-targeting-selected.service';
import { TranslateService, TranslatePipe } from 'ng2-translate/ng2-translate';
import { GeoTargetingService } from '../geo-targeting.service';
import { ComponentsHelperService } from '../../shared/services/components-helper.service';
import { GeoTargetingMapService } from './geo-targeting-map.service';
import { Component } from '@angular/core';

describe('Component: GeoTargetingMap', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:      [],
      declarations: [
        GeoTargetingMapComponent,
        GeoTargetingMapControlsComponent,
        TranslatePipe
      ],
      providers:    [
        {provide: GeoTargetingSelectedService, useValue: {}},
        {provide: TranslateService, useValue: {}},
        {provide: GeoTargetingService, useValue: {}},
        {provide: ComponentsHelperService, useValue: {setRootViewContainerRef: () => {}}},
        {provide: GeoTargetingMapService, useValue: {}},
      ]
    });
  });

  it('should create an instance', () => {
    let fixture = TestBed.createComponent(GeoTargetingMapComponent);
    let app     = fixture.debugElement.componentInstance;
    expect(app)
      .toBeTruthy();
  });
});

@Component({
  selector: 'geo-targeting-map-controls',
  template: '<div></div>'
})
export class GeoTargetingMapControlsComponent {
}
