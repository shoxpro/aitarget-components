import { defaultDetailedTargetingSpec } from '../targeting/targeting-spec-detailed.const';

export function cleanDetailedTargetingSpec (spec) {
  let updatedSpec = {};

  for (let property in spec) {
    if (spec.hasOwnProperty(property) &&
      (!defaultDetailedTargetingSpec[property] || spec[property].length)) {
      updatedSpec[property] = spec[property];
    }
  }

  return updatedSpec;
}
