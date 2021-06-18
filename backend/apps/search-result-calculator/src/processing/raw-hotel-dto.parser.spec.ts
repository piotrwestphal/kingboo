import { RawHotelDtoParser } from './raw-hotel-dto.parser'
import { RawRoomDto } from '@kb/model'

describe('RawHotelDtoParser: ', () => {

  const parser: RawHotelDtoParser = new RawHotelDtoParser()

  describe('processDistrictName():', () => {
    it('should parse district name [1]', () => {
      // Prepare
      const test = 'Eixample,Barcelona – Show on map'

      // Verify
      expect(parser.parseDistrictName(test)).toBe('Eixample')
    })

    it('should parse district name [2]', () => {
      // Prepare
      const test = 'Upper West Side,New York City – Show on map'

      // Verify
      expect(parser.parseDistrictName(test)).toBe('Upper West Side')
    })

    it('should parse district name [3]', () => {
      // Prepare
      const test = 'Śródmieście,Gdynia – Show on map"'

      // Verify
      expect(parser.parseDistrictName(test)).toBe('Śródmieście')
    })

    it('should parse district name [4]', () => {
      // Prepare
      const test = 'Śródmieście, Pogórze, Slisko,Gdynia – Show on map'

      // Verify
      expect(parser.parseDistrictName(test)).toBe('Śródmieście Pogórze Slisko')
    })

    it('should parse district name [5]', () => {
      // Prepare
      const test = ' – Show on map'

      // Verify
      expect(parser.parseDistrictName(test)).toBeNull()
    })

    it('should parse district name [6]', () => {
      // Prepare
      const test = ''

      // Verify
      expect(parser.parseDistrictName(test)).toBeNull()
    })
  })

  describe('processCoords():', () => {
    it('should parse coords [1]', () => {
      // Prepare
      const test = '19.937436,50.059889'

      // Verify
      expect(parser.parseCoords(test)).toEqual({ lat: 50.059889, lon: 19.937436 })
    })

    it('should parse coords [2]', () => {
      // Prepare
      const test = '121.707012653278,31.1850818301733'

      // Verify
      expect(parser.parseCoords(test)).toEqual({ lat: 31.1850818301733, lon: 121.707012653278 })
    })
  })

  describe('parseRoomName():', () => {
    it('should parse room name [1]', () => {
      // Prepare
      const hotels: RawRoomDto[] = [
        {
          shortDescription: '1 × Basic Double Room',
        } as RawRoomDto,
        {
          shortDescription: '1 × Standard Quadruple Room',
        } as RawRoomDto
      ]

      // Verify
      expect(parser.parseRoomName(null, hotels))
        .toEqual('Basic Double Room, Standard Quadruple Room')
    })

    it('should parse room name [2]', () => {
      expect(parser.parseRoomName('1 × Basic Double Room', null))
        .toEqual('Basic Double Room')
    })

    it('should parse room name [3]', () => {
      expect(parser.parseRoomName(null, null)).toBeNull()
    })

    it('should parse room name [4]', () => {
      expect(parser.parseRoomName('1 × Apartment 4, First Floor, with Balcony', null))
        .toEqual('Apartment 4, First Floor, with Balcony')
    })

    it('should parse room name [5]', () => {
      expect(parser.parseRoomName('Apartment 4, First Floor, with Balcony', null))
        .toEqual('Apartment 4, First Floor, with Balcony')
    })
  })
})
