class ActivityRepository {
  constructor(activityData) {
    this.data = activityData;
  }

  calculatePropAvgByDate(date, property) {
    const dataLog = this.data.filter(entry => entry.date === date);

    const propertyLog = dataLog.map(entry => entry[property]);
    const total = propertyLog.reduce((sum, num) => {
        return sum + num;
    });
    const propertyAvg = Math.round(total / dataLog.length);

    return propertyAvg;
  }
}

if (typeof module !== 'undefined') {
  module.exports = ActivityRepository;
}
