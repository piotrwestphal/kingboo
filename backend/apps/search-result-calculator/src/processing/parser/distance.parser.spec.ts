import { DistanceParser } from './distance.parser';

describe('PriceParser: ', () => {

  const distanceParser: DistanceParser = new DistanceParser();

  it('should parse distance to meters [1]', () => {
    // Prepare
    const test = '150 m from centre';

    // Verify
    expect(distanceParser.parseDistance(test)).toBe(150);
  });

  it('should parse distance to meters [2]', () => {
    // Prepare
    const test = '1 km from centre';

    // Verify
    expect(distanceParser.parseDistance(test)).toBe(1000);
  });

  it('should parse distance to meters [3]', () => {
    // Prepare
    const test = '1.8 km from centre';

    // Verify
    expect(distanceParser.parseDistance(test)).toBe(1800);
  });

  it('should parse distance to meters [4]', () => {
    // Prepare
    const test = '12.9 km from centre';

    // Verify
    expect(distanceParser.parseDistance(test)).toBe(12900);
  });

  it('should parse distance to meters [5]', () => {
    // Prepare
    const test = '150 feet from centre';

    // Verify
    expect(distanceParser.parseDistance(test)).toBe(46);
  });

  it('should parse distance to meters [6]', () => {
    // Prepare
    const test = '2,450 feet from centre';

    // Verify
    expect(distanceParser.parseDistance(test)).toBe(747);
  });

  it('should parse distance to meters [7]', () => {
    // Prepare
    const test = '1 miles from centre';

    // Verify
    expect(distanceParser.parseDistance(test)).toBe(1609);
  });

  it('should parse distance to meters [8]', () => {
    // Prepare
    const test = '1.8 miles from centre';

    // Verify
    expect(distanceParser.parseDistance(test)).toBe(2897);
  });

  it('should parse distance to meters [9]', () => {
    // Prepare
    const test = '12.9 miles from centre';

    // Verify
    expect(distanceParser.parseDistance(test)).toBe(20761);
  });

  it('should parse distance to meters [10]', () => {
    // Prepare
    const test = undefined;

    // Verify
    expect(distanceParser.parseDistance(test)).toBeNull();
  });

  it('should parse distance to meters [11]', () => {
    // Prepare
    const test = '';

    // Verify
    expect(distanceParser.parseDistance(test)).toBeNull();
  });
});
