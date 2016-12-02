import { TestBed, inject } from '@angular/core/testing';
import { TargetingActions } from './targeting.actions';
import { targetingReducer } from './targeting.reducer';
import { splittedTestFormValue } from './targeting.reducer.mocks';
import { splitFormValue, getSpecFromFormValue } from './targeting.constants';
import { audienceInitial } from './audience/audience.reducer';

let deepFreeze = require('deep-freeze');

describe(`TargetingReducer`, () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        TargetingActions
      ]
    });
  });

  describe(`Function: splitFormValue`, () => {
    it(`should return array of form values`, () => {
      const formValue = {a: ['a1', 'a2', 'a3', 'a4'], g: ['g1', 'g2', 'g3'], d: ['d1', 'd2'], s: ['s1']};

      const formValues = splitFormValue(formValue);

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

      const spec = getSpecFromFormValue(formValue);

      expect(spec)
        .toEqual({
          c: 'c',
          n: 'override n',
          p: 'override p',
          q: 'q'
        }, 'incorrect form value split');
    });
  });

  describe(TargetingActions.SPLIT_FORM_VALUE, () => {
    it(`should split form value`, inject([TargetingActions],
      (targetingActions: TargetingActions) => {
        let state            = {
          audiences: [],
          formValue: {}
        };
        const inputFormValue = {
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

        deepFreeze(state);

        let newState = targetingReducer(state, targetingActions.splitFormValue(inputFormValue));

        expect(newState)
          .toEqual(Object.assign({}, state, {
            audiences: splitFormValue(inputFormValue)
                         .map((formValue) => {
                           let spec = getSpecFromFormValue(formValue);
                           return Object.assign({}, audienceInitial, {formValue, spec});
                         }),
            formValue: inputFormValue
          }));
      })
    );
  });
});
