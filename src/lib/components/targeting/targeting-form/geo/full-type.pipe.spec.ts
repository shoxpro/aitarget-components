/* tslint:disable:no-unused-variable */
import { TestBed } from '@angular/core/testing';
import { FullTypePipe } from './full-type.pipe';
import { TranslateService } from 'ng2-translate/ng2-translate';

describe('Pipe: FullType', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:   [],
      providers: [{provide: TranslateService, useValue: {}}]
    });
  });

  it('create an instance', () => {
    let pipe = new FullTypePipe(TestBed.get(TranslateService));
    expect(pipe)
      .toBeTruthy();
  });
});
