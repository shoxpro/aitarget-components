/* tslint:disable:no-unused-variable */
import { TestBed } from '@angular/core/testing';
import { GeoMapComponent } from './geo-map.component';
import { TranslateService } from 'ng2-translate/src/translate.service';
import { TranslatePipe } from 'ng2-translate/src/translate.pipe';
import { ComponentsHelperService } from '../../../../../shared/services/components-helper.service';
import { GeoMapService } from './geo-map.service';
import { Store } from '@ngrx/store';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

xdescribe('Component: GeoMap', () => {
  beforeEach(() => {
    // noinspection ReservedWordAsName
    TestBed.configureTestingModule({
      imports:      [],
      declarations: [
        GeoMapComponent,
        TranslatePipe
      ],
      providers:    [
        {provide: Store, useValue: {let () { return; }}},
        {provide: GeoMapService, useValue: {}},
        {provide: TranslateService, useValue: {instant () { return; }}},
        {provide: ComponentsHelperService, useValue: {setRootViewContainerRef () { return; }}},
      ],
      schemas:      [CUSTOM_ELEMENTS_SCHEMA]
    });
  });

  it('should create an instance', () => {
    let fixture = TestBed.createComponent(GeoMapComponent);
    let app     = fixture.debugElement.componentInstance;
    expect(app)
      .toBeTruthy();
  });
});
