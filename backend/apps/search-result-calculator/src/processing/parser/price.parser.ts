export class PriceParser {

    private readonly ROOM_DESCRIPTION_AND_PRICE_SEPARATOR = ':';

    // "1,975 zł|includes taxes and charges"
    // "13,565 zł|includes taxes and charges"
    // "7,124 zł|taxes and charges may vary"
    // "\n\n2,761 zł\n\n| includes taxes and charges "
    // "13,565 zł|+86 zł taxes and charges"
    // "3,749 zł|+107 zł taxes and charges"
    // "Price for 2 adults, 1 child for 4 nights: 1,805 zł|includes taxes and charges"
    // "Price for 2 adults, 4 children for 6 nights: 12,083 zł|includes taxes and charges"
    // "\nPrice for 2 adults, 3 children\nfor 5 nights:\n17,038 zł\n|+1,009 zł taxes and charges"
    parse(price: string, tax: string): number | null {
        if (!price || price === 'null') {
            return null;
        }

        const priceWithCurrency = price.includes(this.ROOM_DESCRIPTION_AND_PRICE_SEPARATOR)
            ? price.split(this.ROOM_DESCRIPTION_AND_PRICE_SEPARATOR)[1]
            : price;

        const processedPrice = this.extractDigits(priceWithCurrency);
        const processedTax = tax
            ? this.extractDigits(tax)
            : null;
        return processedTax
            ? processedPrice + processedTax
            : processedPrice;
    }

    private extractDigits(stringWithDigits: string): number | null {
        const digits = stringWithDigits.match(/\d+/g);
        const concatDigits = digits
            ? digits.reduce((prev, curr) => prev + curr)
            : null;
        return concatDigits
            ? parseInt(concatDigits, 10)
            : null;
    }
}
