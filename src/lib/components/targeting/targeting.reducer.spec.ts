import { TestBed } from '@angular/core/testing';
import { splittedTestFormValue } from './targeting.reducer.mocks';
import { splitFormValue, getSpecFromFormValue } from './targeting.constants';

describe(`TargetingReducer`, () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: []
    });
  });

  describe(`Function: splitFormValue`, () => {
    it(`should return array of form values`, () => {
      const formValue = {a: ['a1', 'a2', 'a3', 'a4'], g: ['g1', 'g2', 'g3'], d: ['d1', 'd2'], s: ['s1']};

      const formValues = splitFormValue(<any>formValue);

      expect(formValues)
        .toEqual(splittedTestFormValue, 'incorrect form value split');
    });
  });

  describe(`Function: getSpecFromFormValue`, () => {
    it(`should return spec from form value`, () => {
      const formValue = {
        a: [{
          c: 'c'
        }],
        g: [{
          n: 'n'
        }],
        d: [{
          p: 'p',
          n: 'override n'
        }],
        s: [{
          q: 'q',
          p: 'override p'
        }]
      };

      const spec = getSpecFromFormValue(<any>formValue);

      expect(spec)
        .toEqual({
          c: 'c',
          n: 'override n',
          p: 'override p',
          q: 'q'
        }, 'incorrect form value split');
    });
  });
});
