/* tslint:disable:no-unused-variable */

import { TestBed, inject } from '@angular/core/testing';
import { GeoTargetingSelectedService } from './geo-targeting-selected.service';
import { countries, country } from '../geo-targeting-items.example';

describe('Service: GeoTargetingSelected', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GeoTargetingSelectedService]
    });
  });

  beforeEach(inject([GeoTargetingSelectedService], (service: GeoTargetingSelectedService) => {
    this.service = service;
  }));

  it('should ...', () => {
    expect(this.service)
      .toBeTruthy();
  });

  it('should have `get` api method', () => {
    expect(this.service.update)
      .toEqual(jasmine.any(Function));
  });

  it('should have `update` api method', () => {
    expect(this.service.update)
      .toEqual(jasmine.any(Function));
  });

  it('should `update` selected items', () => {
    expect(this.service.get())
      .toEqual([]);

    this.service.update(countries);

    expect(this.service.get())
      .toEqual(countries);
  });

  describe('`add` api method', () => {
    it('should have `add` api method', () => {
      expect(this.service.update)
        .toEqual(jasmine.any(Function));
    });

    xit('should add new country', () => {
      this.service.update(countries);
      this.service.add(country);

      let newCountriesList = countries.concat([country]);

      expect(this.service.get())
        .toEqual(newCountriesList);
    });

    it('should not add same country', () => {});

    it('should not add same country', () => {});
  });

  it('should have `remove` api method', () => {
    expect(this.service.remove)
      .toEqual(jasmine.any(Function));
  });

  it('should have `getSpec` api method', () => {
    expect(this.service.getSpec)
      .toEqual(jasmine.any(Function));
  });
});
