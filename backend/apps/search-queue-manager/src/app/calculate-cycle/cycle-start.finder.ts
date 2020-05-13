import { TimeHelper } from '@kb/util';

export class CycleStartFinder {

  findStartDaysOfWeekCycles(nowWithoutHours: Date,
                            cycleDaysInterval: number,
                            startCycleDayOfTheWeek: number,
                            beginSearchDaysBefore: number): Date[] {
    const currentDayOfTheWeek = nowWithoutHours.getDay();
    const nearestDayOfTheWeek = this.findNearestDayOfTheWeek(currentDayOfTheWeek, startCycleDayOfTheWeek);
    const nearestCycleStartDate = TimeHelper.addDays(nowWithoutHours, nearestDayOfTheWeek);

    const cyclesCount = Math.floor(beginSearchDaysBefore / cycleDaysInterval);
    const dates: Date[] = [nearestCycleStartDate];
    for (let i = 1; i < cyclesCount; i++) {
      const nextCycleStart = TimeHelper.addDays(nearestCycleStartDate, cycleDaysInterval * i);
      dates.push(nextCycleStart);
    }
    return dates;
  }

  private findNearestDayOfTheWeek(currentDay, dayOfTheWeek) {
    if (currentDay === dayOfTheWeek) {
      return 7;
    }
    if (currentDay < dayOfTheWeek) {
      return dayOfTheWeek - currentDay;
    }
    if (currentDay > dayOfTheWeek) {
      return (dayOfTheWeek + 7) - currentDay;
    }
  }
}
