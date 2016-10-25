/* tslint:disable:no-unused-variable */

import { TestBed } from '@angular/core/testing';
import { GeoTargetingModeComponent } from './geo-targeting-mode.component';
import { Component, Input } from '@angular/core';
import { TranslateService } from 'ng2-translate/ng2-translate';
import { GeoTargetingModeService } from './geo-targeting-mode.service';

describe('Component: GeoTargetingMode', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:      [],
      declarations: [
        GeoTargetingModeComponent,
        GeoTargetingPinComponent,
        FbArrowDropComponent,
        GeoTargetingModeDropdownComponent
      ],
      providers:    [
        {provide: TranslateService, useValue: {}},
        {provide: GeoTargetingModeService, useValue: {}},
      ]
    });
  });

  it('should create an instance', () => {
    let fixture = TestBed.createComponent(GeoTargetingModeComponent);
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

@Component({
  selector: 'fb-arrow-drop',
  template: '<div></div>'
})
class FbArrowDropComponent {
  @Input() direction;
}

@Component({
  selector: 'geo-targeting-mode-dropdown',
  template: '<div></div>'
})
class GeoTargetingModeDropdownComponent {
  @Input() excluded;
}
