import { PriceParser } from './price.parser';

describe('PriceParser: ', () => {

  const priceParser: PriceParser = new PriceParser();

  describe('parse():', () => {

    it('should parse price [1]', () => {
      // Prepare
      const price = 'null';
      const tax = 'null';

      // Verify
      expect(priceParser.parse(price, tax)).toBeNull();
    });

    it('should parse price [2]', () => {
      // Prepare
      const price = 'null';
      const tax = '+1,121 zł taxes and charges';

      // Verify
      expect(priceParser.parse(price, tax)).toBeNull();
    });

    it('should parse price [3]', () => {
      // Prepare
      const price = '7,124 zł';
      const tax = 'null';

      // Verify
      expect(priceParser.parse(price, tax)).toBe(7124);
    });

    it('should parse price [4]', () => {
      // Prepare
      const price = '1,975 zł';
      const tax = 'includes taxes and charges';

      // Verify
      expect(priceParser.parse(price, tax)).toBe(1975);
    });

    it('should parse price [5]', () => {
      // Prepare
      const price = '10,881 zł';
      const tax = 'taxes and charges may vary';

      // Verify
      expect(priceParser.parse(price, tax)).toBe(10881);
    });

    it('should parse price [6]', () => {
      // Prepare
      const price = '\n\n2,761 zł\n\n';
      const tax = ' includes taxes and charges ';

      // Verify
      expect(priceParser.parse(price, tax)).toBe(2761);
    });

    it('should parse price [7]', () => {
      // Prepare
      const price = 'Price for 2 adults, 1 child for 4 nights: 1,805 zł';
      const tax = 'includes taxes and charges';

      // Verify
      expect(priceParser.parse(price, tax)).toBe(1805);
    });

    it('should parse price [8]', () => {
      // Prepare
      const price = 'Price for 2 adults, 4 children for 6 nights: 12,083 zł';
      const tax = 'includes taxes and charges';

      // Verify
      expect(priceParser.parse(price, tax)).toBe(12083);
    });

    it('should parse price [9]', () => {
      // Prepare
      const price = '13,565 zł';
      const tax = '+86 zł taxes and charges';

      // Verify
      expect(priceParser.parse(price, tax)).toBe(13651);
    });

    it('should parse price [10]', () => {
      // Prepare
      const price = '3,749 zł';
      const tax = '+1,098 zł taxes and charges';

      // Verify
      expect(priceParser.parse(price, tax)).toBe(4847);
    });

    it('should parse price [11]', () => {
      // Prepare
      const price = '\nPrice for 2 adults, 3 children\nfor 5 nights:\n17,038 zł\n';
      const tax = '+1,009 zł taxes and charges';

      // Verify
      expect(priceParser.parse(price, tax)).toBe(18047);
    });

    it('should parse price [12]', () => {
      // Prepare
      const price = null;
      const tax = '';

      // Verify
      expect(priceParser.parse(price, tax)).toBeNull();
    });

    it('should parse price [13]', () => {
      // Prepare
      const price = undefined;
      const tax = undefined;

      // Verify
      expect(priceParser.parse(price, tax)).toBeNull();
    });
  });
});
