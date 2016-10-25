/* tslint:disable:no-unused-variable */

import { TestBed } from '@angular/core/testing';
import { GeoTargetingSelectedService } from './geo-targeting-selected.service';
import { GeoTargetingSelectedComponent } from './geo-targeting-selected.component';
import { GeoTargetingMapService } from '../geo-targeting-map/geo-targeting-map.service';
import { Input, Component, Output, EventEmitter } from '@angular/core';
import { FullNamePipe } from '../full-name.pipe';

describe('Component: GeoTargetingSelected', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:      [],
      declarations: [
        GeoTargetingSelectedComponent,
        GeoTargetingPinComponent,
        FbArrowDropComponent,
        GeoTargetingModeDropdownComponent,
        GeoTargetingRadiusComponent,
        FullNamePipe
      ],
      providers:    [
        {provide: GeoTargetingSelectedService, useValue: {}},
        {provide: GeoTargetingMapService, useValue: {}},
      ]
    });
  });

  it('should create an instance', () => {
    let fixture = TestBed.createComponent(GeoTargetingSelectedComponent);
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
  @Input('hasRemove') hasRemove: Boolean = false;
  @Input('excluded') excluded: Boolean   = false;

  @Output()
  toggle  = new EventEmitter();
  @Output()
  include = new EventEmitter();
  @Output()
  exclude = new EventEmitter();
  @Output()
  remove  = new EventEmitter();
}

@Component({
  selector: 'geo-targeting-radius',
  template: '<div></div>'
})
class GeoTargetingRadiusComponent {
  @Input() item;
}
