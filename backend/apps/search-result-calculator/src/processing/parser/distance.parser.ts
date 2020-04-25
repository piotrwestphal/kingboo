export class DistanceParser {

  public parseDistance(rawDistance: string): number | null {
    if (rawDistance && rawDistance.length > 0) {
      const splitRawDistance = rawDistance.split(' ') as [string, string | undefined];
      const valueWithValidSeparator = splitRawDistance[0].replace(/,/, '.');
      const unit = splitRawDistance[1];
      if (unit.includes('km')) {
        return parseFloat(valueWithValidSeparator) * 1000;
      }
      // feet to meters conversion
      if (unit.includes('feet')) {
        return valueWithValidSeparator.includes('.')
          ? Math.round(parseFloat(valueWithValidSeparator) * 1000 * 0.3048)
          : Math.round(parseFloat(valueWithValidSeparator) * 0.3048);
      }
      // miles to meters conversion
      if (unit.includes('miles')) {
        return Math.round(parseFloat(valueWithValidSeparator) * 1609.344);
      }
      // meters
      return this.validateMeters(valueWithValidSeparator);
    } else {
      return null;
    }
  }

  private validateMeters(value: string) {
    const parsedValue = parseInt(value, 0);
    return isFinite(parsedValue) ? parsedValue : null;
  }
}
