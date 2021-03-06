import { TopHotelsDto } from '../../../core/dto/top-hotels.dto'
import { SimpleHotelDto } from '../../../core/dto/simple-hotel.dto'
import HotelList from './HotelList'

const priceRateValue = (h: SimpleHotelDto) => `${Math.round(h.calculatedValues.priceRate)}`
const priceRateKey = 'Price rt'
const priceRateTooltip = 'Price rate [%]'
const priceValue = (h: SimpleHotelDto) => h.latestValues.price || 'N/A'
const priceKey = 'Price'
const priceTooltip = 'Price [zł]'
const rateValue = (h: SimpleHotelDto) => h.latestValues.rate || 'N/A'
const rateKey = 'Rate'
const rateTooltip = 'Rate [%]'
const distanceValue = (h: SimpleHotelDto) => h.latestValues.distanceFromCenterMeters || 'N/A'
const distanceKey = 'Center'
const distanceTooltip = 'Distance to the center [m]'

export const createHotelList = (topHotels: TopHotelsDto, item: keyof TopHotelsDto) => {
  switch (item) {
    case 'bestPriceRate':
      return <HotelList hotels={topHotels.bestPriceRate}
                        title='Best price rate'
                        primaryValue={priceRateValue}
                        primaryKey={priceRateKey}
                        primaryTooltip={priceRateTooltip}
                        secondaryValue={priceValue}
                        secondaryKey={priceKey}
                        secondaryTooltip={priceTooltip}
                        tertiaryValue={rateValue}
                        tertiaryKey={rateKey}
                        tertiaryTooltip={rateTooltip}/>
    case 'cheapest':
      return <HotelList hotels={topHotels.cheapest}
                        title='Cheapest'
                        primaryValue={priceValue}
                        primaryKey={priceKey}
                        primaryTooltip={priceTooltip}
                        secondaryValue={rateValue}
                        secondaryKey={rateKey}
                        secondaryTooltip={rateTooltip}
                        tertiaryValue={priceRateValue}
                        tertiaryKey={priceRateKey}
                        tertiaryTooltip={priceRateTooltip}/>
    case 'bestRate':
      return <HotelList hotels={topHotels.bestRate}
                        title='Best rate'
                        primaryValue={rateValue}
                        primaryKey={rateKey}
                        primaryTooltip={rateTooltip}
                        secondaryValue={priceValue}
                        secondaryKey={priceKey}
                        secondaryTooltip={priceTooltip}
                        tertiaryValue={priceRateValue}
                        tertiaryKey={priceRateKey}
                        tertiaryTooltip={priceRateTooltip}/>
    case 'bestLocation':
      return <HotelList hotels={topHotels.bestLocation}
                        title='Best location'
                        primaryValue={distanceValue}
                        primaryKey={distanceKey}
                        primaryTooltip={distanceTooltip}
                        secondaryValue={priceValue}
                        secondaryKey={priceKey}
                        secondaryTooltip={priceTooltip}
                        tertiaryValue={rateValue}
                        tertiaryKey={rateKey}
                        tertiaryTooltip={rateTooltip}/>
  }
}
