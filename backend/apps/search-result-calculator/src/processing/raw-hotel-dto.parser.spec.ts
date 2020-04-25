import { RawHotelDtoParser } from './raw-hotel-dto.parser';

describe('SearchResultFormatter: ', () => {

  const formatter: RawHotelDtoParser = new RawHotelDtoParser();

  describe('processDistrictName():', () => {
    it('should parse district name [1]', () => {
      // Prepare
      const test = 'Eixample,Barcelona – Show on map';

      // Verify
      expect(formatter.parseDistrictName(test)).toBe('Eixample');
    });

    it('should parse district name [2]', () => {
      // Prepare
      const test = 'Upper West Side,New York City – Show on map';

      // Verify
      expect(formatter.parseDistrictName(test)).toBe('Upper West Side');
    });

    it('should parse district name [3]', () => {
      // Prepare
      const test = 'Śródmieście,Gdynia – Show on map"';

      // Verify
      expect(formatter.parseDistrictName(test)).toBe('Śródmieście');
    });

    it('should parse district name [4]', () => {
      // Prepare
      const test = 'Śródmieście, Pogórze, Slisko,Gdynia – Show on map';

      // Verify
      expect(formatter.parseDistrictName(test)).toBe('Śródmieście Pogórze Slisko');
    });

    it('should parse district name [5]', () => {
      // Prepare
      const test = ' – Show on map';

      // Verify
      expect(formatter.parseDistrictName(test)).toBeNull();
    });

    it('should parse district name [6]', () => {
      // Prepare
      const test = '';

      // Verify
      expect(formatter.parseDistrictName(test)).toBeNull();
    });
  });

  describe('processCoords():', () => {
    it('should parse coords [1]', () => {
      // Prepare
      const test = '19.937436,50.059889';

      // Verify
      expect(formatter.parseCoords(test)).toEqual({ lat: 50.059889, lon: 19.937436 });
    });

    it('should parse coords [2]', () => {
      // Prepare
      const test = '121.707012653278,31.1850818301733';

      // Verify
      expect(formatter.parseCoords(test)).toEqual({ lat: 31.1850818301733, lon: 121.707012653278 });
    });
  });
});
