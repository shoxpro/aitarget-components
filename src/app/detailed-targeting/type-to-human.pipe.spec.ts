/* tslint:disable:no-unused-variable */

import { beforeEachProviders, describe, expect, it } from '@angular/core/testing';
import { TypeToHumanPipe } from './type-to-human.pipe';

describe('Pipe: TypeToHuman', () => {
  it('create an instance', () => {
    let pipe = new TypeToHumanPipe();
    expect(pipe).toBeTruthy();
  });
});
