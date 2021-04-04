// const HydrationEntry = require('./HydrationEntry');

if (typeof require !== 'undefined') {
  const HydrationEntry = require('./HydrationEntry');
}

class HydrationRepository {
  constructor(hydrationData) {
    this.data = hydrationData;
  }

  populateHydrationData(dataset) {
    this.hydrationData = dataset.map(entry => new HydrationEntry(entry));
  }

  calculateAvgDailyWater() {
    const dailyOunces = this.hydrationData.map(entry => entry.numOunces);
    const totalOunces = dailyOunces.reduce((sumOz, numOz) => {
      return sumOz + numOz;
    });
    const avgOunces = Math.round(totalOunces / this.hydrationData.length);

    return avgOunces;
  }

  retrieveNumOuncesByDate(id, date) {
    const userLog = this.hydrationData.filter(entry => entry.id === id);
    const entry = userLog.find(entry => entry.date === date)
    return entry.numOunces;
  }

  calculateAvgWeeklyWater(id, startDate) {
    const userLog = this.hydrationData.filter(entry => entry.id === id);
    const index = userLog.findIndex(entry => entry.date === startDate);
    const weekLog = userLog.slice(index, index + 7);
    const waterLog = weekLog.map(entry => entry.numOunces);
    const totalOunces = waterLog.reduce((sumOz, numOz) => {
      return sumOz + numOz;
    });
    const avgOunces = Math.round(totalOunces / 7);

    return avgOunces;
  }
}

if (typeof module !== 'undefined') {
  module.exports = HydrationRepository;
}