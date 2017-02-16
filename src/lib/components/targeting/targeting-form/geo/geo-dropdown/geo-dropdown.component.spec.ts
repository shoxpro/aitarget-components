/* tslint:disable:no-unused-variable */
import { TestBed } from '@angular/core/testing';
import { GeoDropdownComponent } from './geo-dropdown.component';
import { FullTypePipe } from '../full-type.pipe';
import { FullNamePipe } from '../full-name.pipe';
import { GeoService } from '../geo.service';
import { TranslateService } from 'ng2-translate/src/translate.service';

describe('Component: GeoDropdown', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:      [],
      declarations: [GeoDropdownComponent,
        FullTypePipe, FullNamePipe],
      providers:    [
        {provide: GeoService, useValue: {}},
        {provide: TranslateService, useValue: {}},
      ]
    });
  });

  it('should create an instance', () => {
    let fixture = TestBed.createComponent(GeoDropdownComponent);
    let app     = fixture.debugElement.componentInstance;
    expect(app)
      .toBeTruthy();
  });
});
