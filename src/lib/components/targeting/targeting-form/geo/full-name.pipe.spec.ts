/* tslint:disable:no-unused-variable */
import { FullNamePipe } from './full-name.pipe';
import { country, countryGroup, region, city, zip, geoMarket, electoralDistrict } from './geo-items.example';

describe('Pipe: FullNamePipe', () => {
  it('create an instance', () => {
    let pipe = new FullNamePipe();
    expect(pipe)
      .toBeTruthy();
  });

  it('should return correct name for country', () => {
    let pipe = new FullNamePipe();
    expect(pipe.transform(country))
      .toBe('United Kingdom');
  });

  it('should return correct name for country group', () => {
    let pipe = new FullNamePipe();
    expect(pipe.transform(countryGroup))
      .toBe('Mercosur');
  });

  it('should return correct name for region', () => {
    let pipe = new FullNamePipe();
    expect(pipe.transform(region))
      .toBe('Alaska, United States');
  });

  it('should return correct name for city', () => {
    let pipe = new FullNamePipe();
    expect(pipe.transform(city))
      .toBe('Dublin, California, United States');
  });

  it('should return correct name for zip', () => {
    let pipe = new FullNamePipe();
    expect(pipe.transform(zip))
      .toBe('90028, California, United States');
  });

  it('should return correct name for geo market', () => {
    let pipe = new FullNamePipe();
    expect(pipe.transform(geoMarket))
      .toBe('New York, United States');
  });

  it('should return correct name for electoral district', () => {
    let pipe = new FullNamePipe();
    expect(pipe.transform(electoralDistrict))
      .toBe(`California's 14th District, California, United States`);
  });
});
