import { detailedSpecInitial } from '../../../interfaces/targeting-spec-detailed.interface';

export function cleanDetailedSpec (spec) {
  let updatedSpec = {};

  for (let property in spec) {
    if (spec.hasOwnProperty(property) &&
      (!detailedSpecInitial[property] || spec[property].length)) {
      updatedSpec[property] = spec[property];
    }
  }

  return updatedSpec;
}
