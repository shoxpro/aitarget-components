/* tslint:disable:no-unused-variable */

import { TestBed } from '@angular/core/testing';
import { GeoTargetingMapControlsComponent } from './geo-targeting-map-controls.component';
import { GeoTargetingMapService } from '../geo-targeting-map/geo-targeting-map.service';
import { GeoTargetingModeService } from '../geo-targeting-mode/geo-targeting-mode.service';
import { Input, Component } from '@angular/core';
import { TranslatePipe, TranslateService } from 'ng2-translate/ng2-translate';

describe('Component: GeoTargetingMapControls', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:      [],
      declarations: [
        GeoTargetingMapControlsComponent,
        GeoTargetingPinComponent,
        TranslatePipe
      ],
      providers:    [
        {provide: TranslateService, useValue: {}},
        {provide: GeoTargetingMapService, useValue: {}},
        {provide: GeoTargetingModeService, useValue: {}}
      ]
    });
  });

  it('should create an instance', () => {
    let fixture = TestBed.createComponent(GeoTargetingMapControlsComponent);
    let app     = fixture.debugElement.componentInstance;
    expect(app)
      .toBeTruthy();
  });
});

@Component({
  selector: 'geo-targeting-pin',
  template: '<div></div>'
})
class GeoTargetingPinComponent {
  @Input() excluded;
}
