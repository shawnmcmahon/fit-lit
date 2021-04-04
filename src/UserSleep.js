class UserSleep {
  constructor(user, dataset) {
    this.id = user.id;
    this.data = dataset.filter(entry => entry.userID === this.id);
  }

  calculatePropAvg(property) {
    const dailySum = this.data.map(entry => entry[property]);
    const totalSum = dailySum.reduce((sum, num) => {
      return sum + num;
    });
    const avgAmount = totalSum / dailySum.length;

    return parseFloat(avgAmount.toFixed(1));
  }

  retrievePropByDate(date, property) {
    const entry = this.data.find(entry => entry.date === date)
    return entry[property];
  }

  retrievePropByWeek(startDate, property) {
    const index = this.data.findIndex(entry => entry.date === startDate);
    const weekLog = this.data.slice(index, index + 7);
    const propertyLog = weekLog.map(entry => entry[property]);

    return propertyLog;
  }
}

if (typeof module !== 'undefined') {
  module.exports = UserSleep;
}