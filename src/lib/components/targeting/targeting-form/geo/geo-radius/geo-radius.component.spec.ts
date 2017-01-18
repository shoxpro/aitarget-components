/* tslint:disable:no-unused-variable */
import { TestBed } from '@angular/core/testing';
import { GeoRadiusComponent } from './geo-radius.component';
import { GeoSelectedService } from '../geo-selected/geo-selected.service';
import { TranslateService, TranslatePipe } from 'ng2-translate/ng2-translate';
import { GeoService } from '../geo.service';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AppendToDirective } from '../../../../../shared/directives/append-to.directive';
import { FormsModule } from '@angular/forms';
import { GeoIdService } from '../geo.id';

describe('Component: GeoRadius', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:      [FormsModule],
      declarations: [GeoRadiusComponent, TranslatePipe, AppendToDirective],
      providers:    [
        {provide: GeoSelectedService, useValue: {}},
        {provide: GeoIdService, useValue: {id$: {getValue () {}}}},
        {provide: GeoService, useValue: {}},
        {provide: TranslateService, useValue: {}},
      ],
      schemas:      [CUSTOM_ELEMENTS_SCHEMA]
    });
  });

  it('should create an instance', () => {
    let fixture = TestBed.createComponent(GeoRadiusComponent);
    let app     = fixture.debugElement.componentInstance;
    expect(app)
      .toBeTruthy();
  });
});
