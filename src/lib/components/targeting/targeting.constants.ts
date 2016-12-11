import { TargetingFormState } from './targeting-form/targeting-form.reducer';
import { TargetingSpec } from './interfaces/targeting-spec.interface';

export function splitFormValue (formValue: TargetingFormState) {
  let formValues: Array<TargetingFormState> = [];
  let i                                     = 0;

  for (let key in formValue) {
    if (formValue.hasOwnProperty(key)) {
      let iGroup = formValue[key];

      if (i) {
        formValues = formValues.reduce((newAudiences, oGroup) => {
          return newAudiences.concat(
            iGroup.reduce((acc, el) => {
              return acc.concat([
                Object.assign({}, oGroup, {[key]: [el]})
              ]);
            }, [])
          );
        }, []);
      } else {
        formValues = iGroup.reduce((acc, el) => acc.concat([{[key]: [el]}]), []);
      }

      i++;
    }
  }

  return formValues;
}

export function getSpecFromFormValue (formValue: TargetingFormState): TargetingSpec {
  let spec: TargetingSpec = {};

  for (let key in formValue) {
    if (formValue.hasOwnProperty(key)) {
      spec = Object.assign(spec, formValue[key][0]);
    }
  }

  return spec;
}
