import { CycleStartFinder } from './cycle-start.finder'

describe('PriceParser: ', () => {

  const calculator = new CycleStartFinder()

  describe('calculate():', () => {

    it('should calculate check in days [1]', () => {
      // given
      const now = new Date(2020, 3, 21) // tuesday
      const cycleDaysInterval = 7 // every week
      const startCycleDayOfTheWeek = 1 // monday
      const beginSearchDaysBefore = 14

      // when
      const result = calculator.findStartDaysOfWeekCycles(now, cycleDaysInterval, startCycleDayOfTheWeek, beginSearchDaysBefore)

      // then
      const first = result[0]
      const second = result[1]
      expect(first.getFullYear() === 2020).toBeTruthy()
      expect(first.getMonth() === 3).toBeTruthy()
      expect(first.getDate() === 27).toBeTruthy()
      expect(second.getFullYear() === 2020).toBeTruthy()
      expect(second.getMonth() === 4).toBeTruthy()
      expect(second.getDate() === 4).toBeTruthy()
    })

    it('should calculate check in days [2]', () => {
      // given
      const now = new Date(2020, 3, 21) // tuesday
      const cycleDaysInterval = 7 // every week
      const startCycleDayOfTheWeek = 2 // tuesday
      const beginSearchDaysBefore = 21

      // when
      const result = calculator.findStartDaysOfWeekCycles(now, cycleDaysInterval, startCycleDayOfTheWeek, beginSearchDaysBefore)

      // then
      const first = result[0]
      const second = result[1]
      const third = result[2]
      expect(first.getFullYear() === 2020).toBeTruthy()
      expect(first.getMonth() === 3).toBeTruthy()
      expect(first.getDate() === 28).toBeTruthy()
      expect(second.getFullYear() === 2020).toBeTruthy()
      expect(second.getMonth() === 4).toBeTruthy()
      expect(second.getDate() === 5).toBeTruthy()
      expect(third.getFullYear() === 2020).toBeTruthy()
      expect(third.getMonth() === 4).toBeTruthy()
      expect(third.getDate() === 12).toBeTruthy()
    })
  })
})
